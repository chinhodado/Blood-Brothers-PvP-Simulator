interface MajorEvent {
    description: string;
    turn?: number; // although optional, it will always be automatically added by BattleLogger
    executorId?: number;
    skillId?: number;
}
