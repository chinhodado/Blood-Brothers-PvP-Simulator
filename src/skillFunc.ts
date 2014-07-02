class SkillLogicFactory {
    static getSkillLogic(skillFunc: number): SkillLogic {
        switch (skillFunc) {
            case ENUM.SkillFunc.BUFF:
                return new BuffSkillLogic();
            case ENUM.SkillFunc.AFFLICTION:
                return new AfflictionSkillLogic();
            case ENUM.SkillFunc.ATTACK:
            case ENUM.SkillFunc.MAGIC:
                return new AttackSkillLogic();
            case ENUM.SkillFunc.PROTECT:
                return new ProtectSkillLogic();
            case ENUM.SkillFunc.PROTECT_COUNTER:
                return new ProtectCounterSkillLogic();
            case ENUM.SkillFunc.COUNTER:
                return new CounterSkillLogic();
            default:
                throw new Error("Invalid skillFunc or not implemented");
        }
    }
} 

class SkillLogic {

    battleModel: BattleModel;
    logger: BattleLogger;
    cardManager: CardManager;

    constructor() {
        this.battleModel = BattleModel.getInstance();
        this.logger = BattleLogger.getInstance();
        this.cardManager = CardManager.getInstance();
    }

    willBeExecuted(data: SkillLogicData): boolean {
        return (!data.executor.isDead && 
            data.executor.canUseSkill() && 
            Math.random() * 100 < data.skill.maxProbability);
    }

    execute(data: SkillLogicData) {
    }
}

class BuffSkillLogic extends SkillLogic {

    constructor() {
        super();
    }

    execute(data: SkillLogicData) {
        var skill = data.skill;
        var executor = data.executor;

        for (var skillFuncArgNum = 2; skillFuncArgNum <= 5; skillFuncArgNum++) {
            if (skill.getSkillFuncArg(skillFuncArgNum) == 0) {
                continue;
            }
            switch (skill.getSkillFuncArg(skillFuncArgNum)) {
                case ENUM.StatusType.ATK :
                case ENUM.StatusType.DEF :
                case ENUM.StatusType.WIS :
                case ENUM.StatusType.AGI :
                    var basedOnStatType = ENUM.SkillCalcType[skill.skillCalcType];
                    var skillMod = skill.skillFuncArg1;
                    var buffAmount = Math.round(skillMod * executor.getStat(basedOnStatType));
                    break;
                case ENUM.StatusType.ATTACK_RESISTANCE :
                case ENUM.StatusType.MAGIC_RESISTANCE :
                case ENUM.StatusType.BREATH_RESISTANCE :
                    var buffAmount = skill.skillFuncArg1;
                    break;
                default :
                    throw new Error("Wrong status type or not implemented");
            }
            
            var thingToBuff = skill.getSkillFuncArg(skillFuncArgNum);        
            var targets : Card[] = skill.range.getTargets(executor);
            
            for (var i = 0; i < targets.length; i++) {
                targets[i].changeStatus(thingToBuff, buffAmount);
                var description = targets[i].name + "'s " + ENUM.StatusType[thingToBuff] + " increased by " + buffAmount;
                
                this.logger.addMinorEvent({
                    executorId: executor.id, 
                    targetId: targets[i].id, 
                    type: ENUM.MinorEventType.STATUS, 
                    status: {
                        type: thingToBuff,
                    },
                    description: description, 
                    amount: buffAmount,
                    skillId: skill.id
                });
            }
        }
    }
}

class AfflictionSkillLogic extends SkillLogic {
    execute(data: SkillLogicData) {
        var targets = data.skill.range.getTargets(data.executor);

        for (var i = 0; i < targets.length; i++) {
            this.battleModel.processAffliction(data.executor, targets[i], data.skill);
        }        
    }
}

class AttackSkillLogic extends SkillLogic {
    execute(data: SkillLogicData) {
        if (RangeFactory.isEnemyRandomRange(data.skill.skillRange)) {
            this.executeRandomAttackSkill(data);
        }
        else {
            this.executeAttackSkillWithRangeTargets(data);
        }
    }

    executeRandomAttackSkill (data: SkillLogicData) {
        var numTarget = (<EnemyRandomRange>data.skill.range).numTarget;
        
        for (var i = 0; i < numTarget && !data.executor.isDead; i++) {

            var targetIndex = this.cardManager.getValidSingleTarget(this.battleModel.oppositePlayerCards);
    
            if (targetIndex == -1) {
                // no valid target, miss a turn, continue to next card
                return;
            }
            
            // since we get a valid index with every iteration of the loop, there's no need
            // to check if the target is dead here
            var targetCard = this.battleModel.oppositePlayerCards[targetIndex];
            var protectSkillActivated = this.battleModel.processProtect(data.executor, targetCard, data.skill, null);

            // if not protected, proceed with the attack as normal
            if (!protectSkillActivated) {
                this.battleModel.damageToTarget(data.executor, targetCard, data.skill, null);

                var defenseData: SkillLogicData = {
                    executor: targetCard,
                    skill: targetCard.defenseSkill,
                    attacker:  data.executor
                }
                if (targetCard.defenseSkill && targetCard.defenseSkill.willBeExecuted(defenseData)) {
                    targetCard.defenseSkill.execute(defenseData);    
                }
            }
        }
    }

    /**
     * Execute an attack skill that has the targets obtained from its range
     */
    executeAttackSkillWithRangeTargets (data: SkillLogicData) {
        var skill = data.skill;
        var executor = data.executor;
        var targets : Card[] = skill.range.getTargets(executor);

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
            var targetsAttacked = {};

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
                    protectSkillActivated = this.battleModel.processProtect(executor, targetCard, skill, targetsAttacked);
                    if (protectSkillActivated) {
                        aoeReactiveSkillActivated = true;
                    }
                }

                // if not protected, proceed with the attack as normal
                // also need to make sure the target is not already attacked
                if (!protectSkillActivated && !targetsAttacked[targetCard.id]) {
                    this.battleModel.damageToTarget(executor, targetCard, skill, null);
                    targetsAttacked[targetCard.id] = true;

                    if (!aoeReactiveSkillActivated) {
                        // try to proc post-damage skills
                        var defenseData: SkillLogicData = {
                            executor: targetCard,
                            skill: targetCard.defenseSkill,
                            attacker:  data.executor
                        }
                        if (targetCard.defenseSkill && targetCard.defenseSkill.willBeExecuted(defenseData)) {
                            targetCard.defenseSkill.execute(defenseData);
                            aoeReactiveSkillActivated = true; 
                        }
                    }
                }
            }
        }
        else {
            // skill makes contact, must be fork/sweeping etc., so just proceed as normal
            // i.e. multiple protection is possible
            for (var i = 0; i < targets.length && !executor.isDead; i++) {
                var targetCard = targets[i];

                // a target can be dead, for example from protecting another fam
                if (targetCard.isDead) {
                    continue;
                }

                var protectSkillActivated = this.battleModel.processProtect(executor, targetCard, skill, null);

                // if not protected, proceed with the attack as normal
                if (!protectSkillActivated) {
                    this.battleModel.damageToTarget(executor, targetCard, skill, null);

                    var defenseData: SkillLogicData = {
                        executor: targetCard,
                        skill: targetCard.defenseSkill,
                        attacker:  data.executor
                    }
                    if (targetCard.defenseSkill && targetCard.defenseSkill.willBeExecuted(defenseData)) {
                        targetCard.defenseSkill.execute(defenseData);    
                    }
                }
            }
        }        
    }

}

class ProtectSkillLogic extends SkillLogic {
    execute(data: SkillLogicData) {
        var protector = data.executor;
        var protectSkill = data.skill;

        // first redirect the original attack to the protecting fam
        var desc = protector.name + " procs " + protectSkill.name + " to protect " +
            data.targetCard.name + ". ";
        this.logger.addMinorEvent({
            executorId: protector.id, 
            type: ENUM.MinorEventType.PROTECT,
            protect: {
                protectedId: data.targetCard.id,
                counteredSkillId: data.attackSkill.id
            },
            description: desc,
            skillId: protectSkill.id
        });
        this.battleModel.damageToTarget(data.attacker, protector, data.attackSkill, null);

        // update the targetsAttacked if necessary
        if (data.targetsAttacked) {
            data.targetsAttacked[protector.id] = true;
        }
    }
}

class ProtectCounterSkillLogic extends SkillLogic {
    execute(data: SkillLogicData) {
        var protector = data.executor;
        var protectSkill = data.skill;

        // first redirect the original attack to the protecting fam
        var desc = protector.name + " procs " + protectSkill.name + " to protect " +
            data.targetCard.name + ". ";
        this.logger.addMinorEvent({
            executorId: protector.id, 
            type: ENUM.MinorEventType.PROTECT, 
            protect: {
                protectedId: data.targetCard.id,
                counter: true,
                counteredSkillId: data.attackSkill.id
            },
            description: desc,
            skillId: protectSkill.id
        });
        this.battleModel.damageToTarget(data.attacker, protector, data.attackSkill, null);

        // update the targetsAttacked if necessary
        if (data.targetsAttacked) {
            data.targetsAttacked[protector.id] = true;
        }

        // counter phase
        if (!protector.isDead) {
            var additionalDesc = protector.name + " counters " + data.attacker.name + "! ";
            this.battleModel.damageToTarget(protector, data.attacker, protectSkill, additionalDesc);
        }
    }
}

class CounterSkillLogic extends SkillLogic {

    execute(data: SkillLogicData) {

        var desc = data.executor.name + " procs " + data.skill.name + ". ";
        this.logger.addMinorEvent({
            executorId: data.executor.id, 
            type: ENUM.MinorEventType.DESCRIPTION,
            description: desc,
            skillId: data.skill.id
        });

        // counter phase
        var additionalDesc = data.executor.name + " counters " + data.attacker.name + "! ";
        this.battleModel.damageToTarget(data.executor, data.attacker, data.skill, additionalDesc);
    }
}

interface SkillLogicData {
    executor: Card;
    skill?: Skill;
    attacker?: Card;    // for protect/counter
    attackSkill?: Skill // for protect/counter
    targetCard?: Card;  // for protect
    targetsAttacked?: any;  // for protect
}