/// <reference path="SkillLogic.ts"/>

class ProtectSkillLogic extends SkillLogic {
    counter: boolean = false;

    willBeExecuted(data: SkillLogicData): boolean {
        data.skill.getReady(data.executor);

        // a fam cannot protect itself, unless the skillRange is MYSELF
        if (this.cardManager.isSameCard(data.targetCard, data.executor) && data.skill.skillRange !== ENUM.SkillRange.MYSELF) {
            return false;
        }

        assert(!(data.skill.range instanceof RandomRange), "can't do this with random ranges!");
        return super.willBeExecuted(data) && this.cardManager.isCardInList(data.targetCard, data.skill.range.targets);
    }

    execute(data: SkillLogicData) {
        return this.executeProtectPhase(data);
    }

    executeProtectPhase(data: SkillLogicData, noProtectLog?: boolean) {
        var protector = data.executor;
        var protectSkill = data.skill;
        var attackSkill = data.attackSkill;
        var toReturn: any = {};

        // first redirect the original attack to the protecting fam
        if (!noProtectLog) {
            this.logger.addMinorEvent({
                executorId: protector.id,
                type: ENUM.MinorEventType.PROTECT,
                protect: {
                    protectedId: data.targetCard.id,
                    counter: this.counter,
                    counteredSkillId: attackSkill.id,
                    attackerId: data.attacker.id
                },
                description: protector.name + " procs " + protectSkill.name + " to protect " + data.targetCard.name + ". ",
                skillId: protectSkill.id
            });
        }

        if (protectSkill.skillFunc === ENUM.SkillFunc.PROTECT_REFLECT) {
            var dmgRatio = protectSkill.skillFuncArg5;
        }

        this.battleModel.processDamagePhase({
            attacker: data.attacker,
            target: protector,
            skill: attackSkill,
            scaledRatio: data.scaledRatio,
            varyingRatio: data.varyingRatio,
            dmgRatio: dmgRatio
        });

        if (protectSkill.skillFunc === ENUM.SkillFunc.PROTECT_REFLECT) {
            toReturn.dmgTaken = protector.lastBattleDamageTaken;
        }

        // note: don't need to check for justEvaded here
        if (!data.attacker.justMissed && !protector.isDead) {
            if (attackSkill.skillFunc === ENUM.SkillFunc.ATTACK || attackSkill.skillFunc === ENUM.SkillFunc.MAGIC) {
                this.battleModel.processAffliction(data.attacker, protector, attackSkill);
            }
            else if (Skill.isDebuffAttackSkill(attackSkill.id)) {
                if (Math.random() <= attackSkill.skillFuncArg3) {
                    DebuffSkillLogic.processDebuff(data.attacker, protector, attackSkill);
                }
            }
        }

        // update the targetsAttacked if necessary
        if (data.targetsAttacked) {
            data.targetsAttacked[protector.id] = true;
        }

        // clear the temp stuffs
        this.clearAllCardsDamagePhaseData();

        return toReturn;
    }
}
