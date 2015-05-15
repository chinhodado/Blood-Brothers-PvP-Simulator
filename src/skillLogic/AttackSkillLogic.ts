/// <reference path="SkillLogic.ts"/>

class AttackSkillLogic extends SkillLogic {
    willBeExecuted(data: SkillLogicData): boolean {
        var hasTarget = data.skill.range.hasValidTarget(data.executor);
        return super.willBeExecuted(data) && hasTarget;
    }

    execute(data: SkillLogicData) {
        var skill = data.skill;
        skill.getReady(data.executor);

        // hacky, but kinda convenient.
        var targets: Card[] = skill.range.targets;
        if (RangeFactory.isEnemyScaledRange(skill.skillRange)) {
            data.scaledRatio = RangeFactory.getScaledRatio(skill.skillRange, targets.length);
        }

        if (!RangeFactory.isEnemyRandomRange(data.skill.skillRange) && data.skill.isIndirectSkill()) {
            this.executeAoeAttack(data, targets);
        }
        else {
            this.executeNonAoeAttack(data);
        }
    }

    /**
     * Execute a fork/sweeping/random attack
     * Multiple protection is possible
     */
    executeNonAoeAttack(data: SkillLogicData): void {
        var target: Card;
        var attackCount = 0; // for varying skills
        while ((target = data.skill.getTarget(data.executor)) && !data.executor.isDead && data.executor.canAttack()) {
            if (RangeFactory.isEnemyVaryingRange(data.skill.skillRange)) {
                var varyingRatio = RangeFactory.getVaryingRatio(data.skill.skillRange, attackCount);
            }
            this.processAttackAgainstSingleTarget(data.executor, target, data.skill, data.scaledRatio, varyingRatio);
            attackCount++;
        }
    }

    /**
     * Execute an AoE attack
     */
    executeAoeAttack(data: SkillLogicData, targets: Card[]): void {
        var skill = data.skill;
        var executor = data.executor;

        if (skill.isIndirectSkill()) {
            // if the skill is indirect and of range type, it must be AoE, so only one reactive skill can be proc

            // NOTE: the algorithm used here for protection may not be correct, since it makes the
            // proc rate not really what it should be. For example, if two cards, one can protect (A)
            // and one not (B), are hit by an AoE, B only has 35% chance of being protected, and not 70%,
            // since there's 50% that A will be hit first and therefore unable to protect later on when B
            // is the target (this is based on the assumption that a fam cannot be hit twice in an AoE)

            // shuffle the targets. This serves two purposes. First, we can iterate
            // through the array in a random manner. Second, since the order is not
            // simply left-to-right anymore, it reminds us that this is an AoE skill
            shuffle(targets);

            // assume only one reactive can be proc during an AoE skill. Is it true?
            var aoeReactiveSkillActivated = false; //<- has any reactive skill proc during this whole AoE?

            // keep track of targets attacked, to make sure a fam can only be attacked once. So if a fam has already been
            // attacked, it cannot protect another fam later on
            var targetsAttacked: boolean[] = [];

            for (var i = 0; i < targets.length; i++) { //<- note that there's no executor.isDead check here
                var targetCard = targets[i];

                // a target can be dead, for example from protecting another fam
                if (targetCard.isDead) {
                    continue;
                }

                var protectSkillActivated = false; //<- has any protect skill activated to protect the current target?

                // if no reactive skill has been activated at all during this AoE, we can try to
                // protect this target, otherwise no protect can be activated to protect this target
                // also, if the target has already been attacked (i.e. it protected another card before), then
                // don't try to protect it
                if (!aoeReactiveSkillActivated && !targetsAttacked[targetCard.id]) {
                    var protectData = this.battleModel.processProtect(executor, targetCard, skill, targetsAttacked, data.scaledRatio);
                    protectSkillActivated = protectData.activated;
                    if (protectSkillActivated) {
                        aoeReactiveSkillActivated = true;
                    }
                }

                // if not protected, proceed with the attack as normal
                // also need to make sure the target is not already attacked
                if (!protectSkillActivated && !targetsAttacked[targetCard.id]) {
                    var defenseSkill = targetCard.getRandomDefenseSkill();

                    var defenseData: SkillLogicData = {
                        executor: targetCard,
                        skill: defenseSkill,
                        attacker: executor,
                    };

                    this.battleModel.processDamagePhase({
                        attacker: executor,
                        target: targetCard,
                        skill: skill,
                        scaledRatio: data.scaledRatio
                    });
                    targetsAttacked[targetCard.id] = true;

                    if (!executor.justMissed && !targetCard.justEvaded && !targetCard.isDead) {
                        if (Skill.isDebuffAttackSkill(skill.id)) {
                            if (Math.random() <= skill.skillFuncArg3) {
                                this.battleModel.processDebuff(executor, targetCard, skill);
                            }
                        }
                        else if (skill.skillFunc === ENUM.SkillFunc.ATTACK || skill.skillFunc === ENUM.SkillFunc.MAGIC) {
                            this.battleModel.processAffliction(executor, targetCard, skill);
                        }
                    }

                    // try to proc post-damage skills
                    if (defenseSkill && defenseSkill.willBeExecuted(defenseData) && !aoeReactiveSkillActivated) {
                        defenseSkill.execute(defenseData);
                        aoeReactiveSkillActivated = true;
                    }
                }

                if (skill.skillFunc === ENUM.SkillFunc.DRAIN_ATTACK || skill.skillFunc === ENUM.SkillFunc.DRAIN_MAGIC) {
                    this.processDrainPhase(executor, skill);
                }

                this.clearAllCardsDamagePhaseData();
            }
        }
    }

    processAttackAgainstSingleTarget(executor: Card, target: Card, skill: Skill, scaledRatio: number, varyingRatio?: number) {
        var protectData = this.battleModel.processProtect(executor, target, skill, null, scaledRatio, varyingRatio);

        // if not protected, proceed with the attack as normal
        if (!protectData.activated) {
            var defenseSkill = target.getRandomDefenseSkill();

            var defenseData: SkillLogicData = {
                executor: target,
                skill: defenseSkill,
                attacker: executor,
            };

            this.battleModel.processDamagePhase({
                attacker: executor,
                target: target,
                skill: skill,
                scaledRatio: scaledRatio,
                varyingRatio: varyingRatio
            });

            if (!executor.justMissed && !target.justEvaded && !target.isDead) {
                if (Skill.isDebuffAttackSkill(skill.id)) {
                    if (Math.random() <= skill.skillFuncArg3) {
                        this.battleModel.processDebuff(executor, target, skill);
                    }
                }
                else if (skill.skillFunc === ENUM.SkillFunc.ATTACK || skill.skillFunc === ENUM.SkillFunc.MAGIC) {
                    this.battleModel.processAffliction(executor, target, skill);
                }
            }

            if (defenseSkill && defenseSkill.willBeExecuted(defenseData)) {
                defenseSkill.execute(defenseData);
            }
        }

        if (skill.skillFunc === ENUM.SkillFunc.DRAIN_ATTACK || skill.skillFunc === ENUM.SkillFunc.DRAIN_MAGIC) {
            this.processDrainPhase(executor, skill);
        }

        this.clearAllCardsDamagePhaseData();
    }

    /**
     * Process the drain phase for drain attacks
     */
    processDrainPhase(executor: Card, skill: Skill) {
        var healRange = RangeFactory.getRange(skill.skillFuncArg4);
        healRange.getReady(executor,(card: Card) => !card.isFullHealth());

        // hacky
        console.assert(!(healRange instanceof RandomRange), "can't do this with random ranges!");
        if (healRange.targets.length === 0) {
            return;
        }

        var healAmount = Math.floor((executor.lastBattleDamageDealt * skill.skillFuncArg2) / healRange.targets.length);
        var target: Card;
        while (target = healRange.getTarget(executor)) {
            this.battleModel.damageToTargetDirectly(target, -1 * healAmount, " healing");
        }
    }
}
