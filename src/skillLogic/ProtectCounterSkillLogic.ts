/// <reference path="ProtectSkillLogic.ts"/>

class ProtectCounterSkillLogic extends ProtectSkillLogic {
    constructor() {
        super();
        this.counter = true;
    }

    execute(data: SkillLogicData) {
        // protect phase
        let toReturn = this.executeProtectPhase(data);
        let protector = data.executor;

        // counter phase
        if (!protector.isDead && protector.canAttack() && !data.attacker.isDead) {
            this.battleModel.processDamagePhase({
                attacker: protector,
                target: data.attacker,
                skill: data.skill,
                additionalDescription: protector.name + " counters " + data.attacker.name + "! ",
            });
        }

        return toReturn;
    }
}
