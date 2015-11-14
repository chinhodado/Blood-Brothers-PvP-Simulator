/// <reference path="CounterSkillLogic.ts"/>

class CounterDebuffSkillLogic extends CounterSkillLogic {
    execute(data: SkillLogicData) {
        // counter
        super.execute(data);

        // debuff
        var protector = data.executor;
        if (!protector.isDead && protector.canUseSkill() && !data.attacker.isDead && Math.random() <= data.skill.skillFuncArg3) {
            DebuffSkillLogic.processDebuff(protector, data.attacker, data.skill);
        }
    }
}
