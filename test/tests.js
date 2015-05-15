function startTest() {
    afflictionTest();
}

function afflictionTest() {
    QUnit.test("Frozen can't attack", function (assert) {
        var afflict = AfflictionFactory.getAffliction(ENUM.AfflictionType.FROZEN);
        assert.equal(afflict.canAttack(), false, "Frozen can't attack");
        assert.equal(afflict.canUseSkill(), false, "Frozen can't use skill");

        afflict = AfflictionFactory.getAffliction(ENUM.AfflictionType.BLIND);
        assert.equal(afflict.canAttack(), true, "Blind can attack");
        assert.equal(afflict.canUseSkill(), true, "Blind can use skill");

        afflict = AfflictionFactory.getAffliction(ENUM.AfflictionType.BURN);
        assert.equal(afflict.canAttack(), true, "Burn can attack");
        assert.equal(afflict.canUseSkill(), true, "Burn can use skill");

        afflict = AfflictionFactory.getAffliction(ENUM.AfflictionType.DISABLE);
        assert.equal(afflict.canAttack(), false, "Disabled can't attack");
        assert.equal(afflict.canUseSkill(), false, "Disabled can't use skill");

        afflict = AfflictionFactory.getAffliction(ENUM.AfflictionType.PARALYSIS);
        assert.equal(afflict.canAttack(), false, "Paralyzed can't attack");
        assert.equal(afflict.canUseSkill(), false, "Paralyzed can't use skill");

        afflict = AfflictionFactory.getAffliction(ENUM.AfflictionType.POISON);
        assert.equal(afflict.canAttack(), true, "Poisoned can attack");
        assert.equal(afflict.canUseSkill(), true, "Poisoned can use skill");

        afflict = AfflictionFactory.getAffliction(ENUM.AfflictionType.SILENT);
        assert.equal(afflict.canAttack(), true, "Silent can attack");
        assert.equal(afflict.canUseSkill(), false, "Silent can't use skill");
    });
}
