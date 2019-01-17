/// <reference path="ProtectCounterSkillLogic.ts"/>

class ProtectCounterDebuffSkillLogic extends ProtectCounterSkillLogic {
    execute(data: SkillLogicData) {
        // protect/counter phase
        let toReturn = super.execute(data);

        // debuff phase
        let protector = data.executor;
        if (!protector.isDead && protector.canUseSkill() && !data.attacker.isDead && Math.random() <= data.skill.skillFuncArg3) {
            DebuffSkillLogic.processDebuff(protector, data.attacker, data.skill);
        }

        return toReturn;
    }
}
