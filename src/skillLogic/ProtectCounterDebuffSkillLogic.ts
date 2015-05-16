/// <reference path="ProtectCounterSkillLogic.ts"/>

class ProtectCounterDebuffSkillLogic extends ProtectCounterSkillLogic {
    execute(data: SkillLogicData) {
        // protect/counter phase
        var toReturn = super.execute(data);

        // debuff phase
        var protector = data.executor;
        if (!protector.isDead && protector.canUseSkill() && !data.attacker.isDead && Math.random() <= data.skill.skillFuncArg3) {
            this.battleModel.processDebuff(protector, data.attacker, data.skill);
        }

        return toReturn;
    }
}
