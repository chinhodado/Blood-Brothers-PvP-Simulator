class PoisonAffliction extends Affliction {
    private static DEFAULT_PERCENT = 5; // default poison is 5% of HP every turn
    private static MAX_STACK_NUM = 2;   // maximum number that poison can stack
    private static MAX_DAMAGE = 99999;  // maximum poison damage is 99999 every turn

    percent: number;

    constructor() {
        super(ENUM.AfflictionType.POISON);
        this.percent = 0;
        this.finished = false;
    }

    canAttack(): boolean {
        return true;
    }

    update(card: Card): void {
        var damage: number = Math.floor(card.originalStats.hp * this.percent / 100);
        if (damage > PoisonAffliction.MAX_DAMAGE) {
            damage = PoisonAffliction.MAX_DAMAGE;
        }
        // damage the card
        BattleModel.getInstance().damageToTargetDirectly(card, damage, "poison");
    }

    add(option: AfflictOptParam): void {
        var percent = option.percent;
        if (!percent) {
            percent = PoisonAffliction.DEFAULT_PERCENT;
        }
        this.percent += percent;

        // there's a bug in here. Not my fault though
        var maxPercent = percent * PoisonAffliction.MAX_STACK_NUM;
        if (this.percent > maxPercent) {
            this.percent = maxPercent;
        }
    }
}
