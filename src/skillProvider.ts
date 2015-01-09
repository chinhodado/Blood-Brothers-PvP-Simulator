class SkillProvider {
    static availableSkillsForSelect: number[] = null;

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
     * Return true if this skill should be available for user to select, or available to be randomly chosen
     */
    static isAvailableForSelect(skillId: number): boolean {
        var isAvailable = true;
        var skillInfo = SkillDatabase[skillId];

        if (skillInfo.isAutoAttack || skillId == 355 || skillId == 452) {
            isAvailable = false;
        }

        return isAvailable;
    }
}