class SkillProvider {
    static availableSkillsForSelect: number[] = null;
    static skillCategories = [ENUM.SkillCategory.OPENING, ENUM.SkillCategory.ACTIVE,
                              ENUM.SkillCategory.REACTIVE, ENUM.SkillCategory.ACTION_ON_DEATH];
    static openingSkillList:  number[] = null;
    static activeSkillList:   number[] = null;
    static reactiveSkillList: number[] = null;
    static onDeathSkillList:  number[] = null;

    /**
     * Return a list of ids of the skills available for selection
     */
    static getAvailableSkillsForSelect(): number[] {
        if (this.availableSkillsForSelect == null) {
            this.availableSkillsForSelect = [];
            for (var key in SkillDatabase) {
                if (this.isAvailableForSelect(key)) {
                    this.availableSkillsForSelect.push(key);
                }
            }
        }

        return this.availableSkillsForSelect;
    }

    /**
     * Return a list of ids of opening skills available for selection
     */
    static getAvailableOpeningSkillList(): number[] {
        if (this.openingSkillList == null) {
            this.openingSkillList = [];
            for (var key in SkillDatabase) {
                if (this.isAvailableForSelect(key) && SkillDatabase[key].type == ENUM.SkillType.OPENING) {
                    this.openingSkillList.push(key);
                }
            }
        }

        return this.openingSkillList;
    }

    /**
     * Return a list of ids of active skills available for selection
     */
    static getAvailableActiveSkillList(): number[] {
        if (this.activeSkillList == null) {
            this.activeSkillList = [];
            for (var key in SkillDatabase) {
                if (this.isAvailableForSelect(key) && SkillDatabase[key].type == ENUM.SkillType.ACTIVE) {
                    this.activeSkillList.push(key);
                }
            }
        }

        return this.activeSkillList;
    }

    /**
     * Return a list of ids of reactive skills available for selection
     */
    static getAvailableReactiveSkillList(): number[] {
        if (this.reactiveSkillList == null) {
            this.reactiveSkillList = [];
            for (var key in SkillDatabase) {
                if (this.isAvailableForSelect(key) && (SkillDatabase[key].type == ENUM.SkillType.DEFENSE ||
                    SkillDatabase[key].type == ENUM.SkillType.PROTECT || SkillDatabase[key].type == ENUM.SkillType.EVADE)) {
                    this.reactiveSkillList.push(key);
                }
            }
        }

        return this.reactiveSkillList;
    }

    /**
     * Return a list of ids of on-death skills available for selection
     */
    static getAvailableOnDeathSkillList(): number[] {
        if (this.onDeathSkillList == null) {
            this.onDeathSkillList = [];
            for (var key in SkillDatabase) {
                if (this.isAvailableForSelect(key) && SkillDatabase[key].type == ENUM.SkillType.ACTION_ON_DEATH) {
                    this.onDeathSkillList.push(key);
                }
            }
        }

        return this.onDeathSkillList;
    }

    /**
     * Return true if this skill should be available for user to select, or available to be randomly chosen
     */
    static isAvailableForSelect(skillId: number): boolean {
        return SkillDatabase[skillId].sac == 1;
    }
}