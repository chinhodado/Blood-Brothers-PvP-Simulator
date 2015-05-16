/// <reference path="../SkillLogic.ts"/>

class BasePassiveSkillLogic extends SkillLogic {
    willBeExecuted(data: SkillLogicData): boolean {
        throw new Error("This is undefined for passive skills (except for extra turn passive)!");
    }

    execute(data: SkillLogicData) {
        throw new Error("There's nothing to execute for passive skills!");
    }

    getEffectRatio(executor: Card, comparator: Card, passiveSkill: Skill): number {
        throw new Error("Implement this!");
    }
}
