/// <reference path="SkillLogic.ts"/>

class RandomSkillLogic extends SkillLogic {
    execute(data: SkillLogicData) {
        let randSkillsId: number[] = SkillDatabase[data.skill.id].randSkills;
        shuffle(randSkillsId);
        data.noProbCheck = true;

        for (let i = 0; i < randSkillsId.length; i++) {
            let skill = new Skill(randSkillsId[i]);
            data.skill = skill;

            if (skill.willBeExecuted(data)) {
                this.logger.addMinorEvent({
                    executorId: data.executor.id,
                    type: ENUM.MinorEventType.DESCRIPTION,
                    description: data.executor.name + " procs " + data.skill.name + ". ",
                    skillId: data.skill.id
                });

                skill.execute(data);
                break;
            }
        }
    }
}
