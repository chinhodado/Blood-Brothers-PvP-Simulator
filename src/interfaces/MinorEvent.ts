interface MinorEvent {
    executorId?: number;  // the card id of the executor
    targetId?: number;    // the card id of the target
    type: ENUM.MinorEventType;
    noProcEffect?: boolean; // specify true if don't want the proc effect to be displayed
    wardUsed?: ENUM.WardType;
    missed?: boolean;
    evaded?: boolean;
    isKilled?: boolean;
    affliction?: {
        type: ENUM.AfflictionType;
        percent?: number;
        isFinished?: boolean;
        duration?: number;
        missProb?: number;
    };
    status?: {
        type: ENUM.StatusType;
        isNewLogic?: boolean;
        isDispelled?: boolean;
        isClearDebuff?: boolean;
        isAllUp?: boolean; // Rally Cry
    };
    protect?: {
        protectedId: number;
        counter?: boolean;
        counteredSkillId: number;
        attackerId: number;
    };
    reserveSwitch?: {
        mainId: number;
        reserveId: number;
    };
    bcAddProb?: {
        targetId: number;
        isMain: boolean;
    };
    reviveHPRatio?: number; // for revive
    amount?: number;      // the amount changed (for HP/Status) or number of turns left (affliction)
    description?: string; // description of the event in plain text
    skillId?: number;     // the skill associated with this MinorEvent
    battleDesc?: string; // the text to display for BATTLE_DESCRIPTION
}
