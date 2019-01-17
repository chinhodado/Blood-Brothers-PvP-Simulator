class BurnAffliction extends Affliction {
    private static STACK_NUM = 3;
    damage = 0;
    values: number[] = [];

    constructor() {
        super(ENUM.AfflictionType.BURN);
    }

    canAttack(): boolean {
        return true;
    }

    update(card: Card): void {
        BattleModel.getInstance().damageToTargetDirectly(card, this.damage, "burn");
    }

    add(option: AfflictOptParam): void {
        // update the damage as the sum of the highest 3 values
        let arr = this.values;
        arr.push(option.damage);
        arr.sort((a, b) => b - a); // sort descending

        this.damage = 0;
        for (let i = 0; i < BurnAffliction.STACK_NUM; i++) {
            if (arr[i]) {
                this.damage += arr[i];
            }
        }
    }
}
