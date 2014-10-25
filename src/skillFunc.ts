class SkillLogicFactory {
    static getSkillLogic(skillFunc: number): SkillLogic {
        switch (skillFunc) {
            case ENUM.SkillFunc.BUFF:
                return new BuffSkillLogic();
            case ENUM.SkillFunc.DEBUFF:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF:
                return new DebuffSkillLogic();
            case ENUM.SkillFunc.ONHIT_DEBUFF:
                return new OnHitDebuffSkillLogic();
            case ENUM.SkillFunc.DISPELL:
                return new DispellSkillLogic();
            case ENUM.SkillFunc.AFFLICTION:
                return new AfflictionSkillLogic();
            case ENUM.SkillFunc.ATTACK:
            case ENUM.SkillFunc.MAGIC:
            case ENUM.SkillFunc.DEBUFFATTACK:
            case ENUM.SkillFunc.DEBUFFINDIRECT:
            case ENUM.SkillFunc.DRAIN_ATTACK:
            case ENUM.SkillFunc.DRAIN_MAGIC:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_ATTACK:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_MAGIC:
            case ENUM.SkillFunc.KILL:
                return new AttackSkillLogic();
            case ENUM.SkillFunc.PROTECT:
                return new ProtectSkillLogic();
            case ENUM.SkillFunc.EVADE:
                return new EvadeSkillLogic();
            case ENUM.SkillFunc.PROTECT_COUNTER:
                return new ProtectCounterSkillLogic();
            case ENUM.SkillFunc.PROTECT_REFLECT:
                return new ProtectReflectSkillLogic();
            case ENUM.SkillFunc.COUNTER:
            case ENUM.SkillFunc.COUNTER_INDIRECT:
                return new CounterSkillLogic();
            case ENUM.SkillFunc.COUNTER_DISPELL:
                return new CounterDispellSkillLogic();
            case ENUM.SkillFunc.CLEAR_DEBUFF:
                return new ClearDebuffSkillLogic();
            case ENUM.SkillFunc.DRAIN:
                return new DrainSkillLogic();
            case ENUM.SkillFunc.SURVIVE:
                return new SurviveSkillLogic();
            case ENUM.SkillFunc.HEAL:
                return new HealSkillLogic();
            case ENUM.SkillFunc.REVIVE:
                return new ReviveSkillLogic();
            case ENUM.SkillFunc.TURN_ORDER_CHANGE:
                return new TurnOrderChangeSkillLogic();
            case ENUM.SkillFunc.RANDOM:
                return new RandomSkillLogic();
            default:
                throw new Error("Invalid skillFunc or not implemented");
        }
    }
} 

class SkillLogic {

    battleModel: BattleModel;
    logger: BattleLogger;
    cardManager: CardManager;

    constructor() {
        this.battleModel = BattleModel.getInstance();
        this.logger = BattleLogger.getInstance();
        this.cardManager = CardManager.getInstance();
    }

    willBeExecuted(data: SkillLogicData): boolean {
        var deadCond = (data.skill.skillType === ENUM.SkillType.ACTION_ON_DEATH) ||
                       (!data.executor.isDead && data.skill.skillType !== ENUM.SkillType.ACTION_ON_DEATH);

        if (data.noProbCheck) {
            var probCond: boolean = true;
        }
        else {
            probCond = (Math.random() * 100) <= (data.skill.maxProbability + data.executor.status.skillProbability * 100 + 
                data.executor.bcAddedProb);
        }

        return (deadCond && 
            data.executor.canAttack() && // if cannot attack -> cannot use skill, so the same. If can attack, true, doesn't matter
            data.executor.canUseSkill() && 
            probCond);
    }

    execute(data: SkillLogicData) {
        throw new Error("Implement this");
    }

    clearAllCardsDamagePhaseData() {
        var allCards = this.cardManager.getAllCurrentMainCards();
        for (var i = 0; i < allCards.length; i++) {
            allCards[i].clearDamagePhaseData();
        }
    }
}

class BuffSkillLogic extends SkillLogic {

    willBeExecuted(data: SkillLogicData): boolean {
        var hasTarget = data.skill.range.hasValidTarget(data.executor);
        return super.willBeExecuted(data) && hasTarget;
    }

    execute(data: SkillLogicData) {
        var skill = data.skill;
        var executor = data.executor;
        skill.getReady(executor);

        // get a list of things to buff
        if (skill.skillFuncArg2 != ENUM.StatusType.ALL_STATUS) {
            var statusToBuff: ENUM.StatusType[] = [skill.skillFuncArg2];

            // for hp shield buff, arg3 is the ceiling 
            if (skill.skillFuncArg3 != 0 && skill.skillFuncArg2 != ENUM.StatusType.HP_SHIELD) {
                statusToBuff.push(skill.skillFuncArg3);
            }
        }
        else {
            statusToBuff = [ENUM.StatusType.ATK, ENUM.StatusType.DEF, ENUM.StatusType.WIS, ENUM.StatusType.AGI];
        }

        var basedOnStatType = ENUM.SkillCalcType[skill.skillCalcType];
        var baseStat = executor.getStat(basedOnStatType);

        var target: Card;
        while (target = skill.getTarget(executor)) {
            for (var j = 0; j < statusToBuff.length; j++) {
                var statusType = statusToBuff[j];

                switch (statusType) {
                    case ENUM.StatusType.ATK:
                    case ENUM.StatusType.DEF:
                    case ENUM.StatusType.WIS:
                    case ENUM.StatusType.AGI:
                        // if the range is "self and adjacent", according to Dena, the base stat will
                        // have to be recalculated
                        if (skill.skillRange == ENUM.SkillRange.SELF_BOTH_SIDES) {
                            baseStat = executor.getStat(basedOnStatType);
                        }
                        var skillMod = skill.skillFuncArg1;
                        var buffAmount = Math.round(skillMod * baseStat);
                        break;
                    case ENUM.StatusType.ATTACK_RESISTANCE:
                    case ENUM.StatusType.MAGIC_RESISTANCE:
                    case ENUM.StatusType.BREATH_RESISTANCE:
                    case ENUM.StatusType.SKILL_PROBABILITY:
                    case ENUM.StatusType.WILL_ATTACK_AGAIN:
                    case ENUM.StatusType.ACTION_ON_DEATH:
                        buffAmount = skill.skillFuncArg1;
                        break;
                    case ENUM.StatusType.HP_SHIELD:
                        skillMod = skill.skillFuncArg1;
                        buffAmount = Math.round(skillMod * baseStat);
                        var maxValue = ~~(target.getOriginalHP() * skill.skillFuncArg3);
                        break;
                    default :
                        throw new Error("Wrong status type or not implemented");
                }

                target.changeStatus(statusType, buffAmount, false, maxValue);
                
                this.logger.addMinorEvent({
                    executorId: executor.id, 
                    targetId: target.id, 
                    type: ENUM.MinorEventType.STATUS, 
                    status: {
                        type: statusType,
                        isAllUp: skill.skillFuncArg2 == ENUM.StatusType.ALL_STATUS
                    },
                    description: target.name + "'s " + ENUM.StatusType[statusType] + " increased by " + buffAmount, 
                    amount: buffAmount,
                    skillId: skill.id
                });
            }
        }
    }
}

class DebuffSkillLogic extends SkillLogic {
    execute(data: SkillLogicData) {
        var skill = data.skill;
        var executor = data.executor;
        skill.getReady(executor);
           
        var target: Card;
        while (target = skill.getTarget(executor)) {
            this.battleModel.processDebuff(executor, target, skill);
        }
    }
}

class ClearStatusSkillLogic extends SkillLogic {

    condFunc = (x: number) => true;
    isDispelled: boolean = false;

    willBeExecuted(data: SkillLogicData): boolean {
        var hasValidTarget = data.skill.range.hasValidTarget(data.executor, this.getCondFunc());
        return super.willBeExecuted(data) && hasValidTarget;
    }

    private getCondFunc() {
        return (card: Card): boolean => card.hasStatus(this.condFunc);
    }

    execute(data: SkillLogicData) {
        data.skill.getReady(data.executor);
        var target: Card;

        while (target = data.skill.getTarget(data.executor)) {
            target.clearAllStatus(this.condFunc);

            this.logger.addMinorEvent({
                executorId: data.executor.id,
                targetId: target.id,
                type: ENUM.MinorEventType.STATUS,
                status: {
                    type: 0, //dummy
                    isDispelled: this.isDispelled,
                    isClearDebuff: !this.isDispelled
                },
                description: target.name + (this.isDispelled? " is dispelled." : " is cleared of debuffs."),
                skillId: data.skill.id
            });
        }
    }
}

class DispellSkillLogic extends ClearStatusSkillLogic {
    constructor() {
        super();
        this.condFunc = (x: number) => x > 0;
        this.isDispelled = true;
    }
}

class ClearDebuffSkillLogic extends ClearStatusSkillLogic {
    constructor() {
        super();
        this.condFunc = (x: number) => x < 0;
        this.isDispelled = false;
    }
}

class AfflictionSkillLogic extends SkillLogic {
    execute(data: SkillLogicData) {
        data.skill.getReady(data.executor);

        var target: Card;
        while (target = data.skill.getTarget(data.executor)) {
            this.battleModel.processAffliction(data.executor, target, data.skill);
        }        
    }
}

class AttackSkillLogic extends SkillLogic {

    willBeExecuted(data: SkillLogicData): boolean {
        var hasTarget = data.skill.range.hasValidTarget(data.executor);
        return super.willBeExecuted(data) && hasTarget;
    }

    execute(data: SkillLogicData) {
        if (!RangeFactory.isEnemyRandomRange(data.skill.skillRange) && data.skill.isIndirectSkill()) {
            this.executeAoeAttack(data);
        }
        else {
            this.executeNonAoeAttack(data);
        }
    }

    /**
     * Execute a fork/sweeping/random attack
     * Multiple protection is possible
     */
    executeNonAoeAttack(data: SkillLogicData) {
        data.skill.getReady(data.executor);
        var target: Card;
        while ((target = data.skill.getTarget(data.executor)) && !data.executor.isDead) {
            this.processAttackAgainstSingleTarget(data.executor, target, data.skill);
        }
    }

    /**
     * Execute an AoE attack
     */
    executeAoeAttack(data: SkillLogicData) {
        var skill = data.skill;
        var executor = data.executor;
        skill.getReady(executor);
        
        // hacky, but kinda convenient
        var targets: Card[] = skill.range.targets;

        if (RangeFactory.isEnemyScaledRange(skill.skillRange)) {
            var scaledRatio = RangeFactory.getScaledRatio(skill.skillRange, targets.length);
        }

        if (skill.isIndirectSkill()) {
            // if the skill is indirect and of range type, it must be AoE, so only one reactive skill can be proc

            // NOTE: the algorithm used here for protection may not be correct, since it makes the 
            // proc rate not really what it should be. For example, if two cards, one can protect (A)
            // and one not (B), are hit by an AoE, B only has 35% chance of being protected, and not 70%,
            // since there's 50% that A will be hit first and therefore unable to protect later on when B
            // is the target (this is based on the assumption that a fam cannot be hit twice in an AoE)

            // shuffle the targets. This serves two purposes. First, we can iterate
            // through the array in a random manner. Second, since the order is not
            // simply left-to-right anymore, it reminds us that this is an AoE skill
            shuffle(targets);

            // assume only one reactive can be proc during an AoE skill. Is it true?
            var aoeReactiveSkillActivated = false; //<- has any reactive skill proc during this whole AoE?

            // keep track of targets attacked, to make sure a fam can only be attacked once. So if a fam has already been
            // attacked, it cannot protect another fam later on 
            var targetsAttacked: boolean[] = [];

            for (var i = 0; i < targets.length; i++) { //<- note that there's no executor.isDead check here
                var targetCard = targets[i];

                // a target can be dead, for example from protecting another fam
                if (targetCard.isDead) {
                    continue;
                }

                var protectSkillActivated = false; //<- has any protect skill activated to protect the current target?

                // if no reactive skill has been activated at all during this AoE, we can try to
                // protect this target, otherwise no protect can be activated to protect this target
                // also, if the target has already been attacked (i.e. it protected another card before), then
                // don't try to protect it
                if (!aoeReactiveSkillActivated && !targetsAttacked[targetCard.id]) {
                    var protectData = this.battleModel.processProtect(executor, targetCard, skill, targetsAttacked, scaledRatio);
                    protectSkillActivated = protectData.activated;
                    if (protectSkillActivated) {
                        aoeReactiveSkillActivated = true;
                    }
                }

                // if not protected, proceed with the attack as normal
                // also need to make sure the target is not already attacked
                if (!protectSkillActivated && !targetsAttacked[targetCard.id]) {
                    var defenseSkill = targetCard.getRandomDefenseSkill();

                    var defenseData: SkillLogicData = {
                        executor: targetCard,
                        skill: defenseSkill,
                        attacker: executor,
                    };

                    this.battleModel.processDamagePhase({
                        attacker: executor, 
                        target: targetCard, 
                        skill: skill,
                        scaledRatio: scaledRatio
                    });
                    targetsAttacked[targetCard.id] = true;

                    if (!executor.justMissed && !targetCard.justEvaded && !targetCard.isDead) {
                        if (Skill.isDebuffAttackSkill(skill.id)) {
                            if (Math.random() <= skill.skillFuncArg3) {
                                this.battleModel.processDebuff(executor, targetCard, skill);
                            }
                        }
                        else if (skill.skillFunc === ENUM.SkillFunc.ATTACK || skill.skillFunc === ENUM.SkillFunc.MAGIC) {
                            this.battleModel.processAffliction(executor, targetCard, skill);
                        }
                    }

                    // try to proc post-damage skills
                    if (defenseSkill && defenseSkill.willBeExecuted(defenseData) && !aoeReactiveSkillActivated) 
                    {
                        defenseSkill.execute(defenseData);
                        aoeReactiveSkillActivated = true; 
                    }
                }

                if (skill.skillFunc == ENUM.SkillFunc.DRAIN_ATTACK || skill.skillFunc == ENUM.SkillFunc.DRAIN_MAGIC) {
                    this.processDrainPhase(executor, skill);
                }

                this.clearAllCardsDamagePhaseData();
            }
        }
    }

    processAttackAgainstSingleTarget(executor: Card, target: Card, skill: Skill, scaledRatio?: number) {
        var protectData = this.battleModel.processProtect(executor, target, skill, null, scaledRatio);

        // if not protected, proceed with the attack as normal
        if (!protectData.activated) {
            var defenseSkill = target.getRandomDefenseSkill();
                
            var defenseData: SkillLogicData = {
                executor: target,
                skill: defenseSkill,
                attacker: executor,
            };

            this.battleModel.processDamagePhase({
                attacker: executor, 
                target: target, 
                skill: skill,
                scaledRatio: scaledRatio
            });

            if (!executor.justMissed && !target.justEvaded && !target.isDead) {
                if (Skill.isDebuffAttackSkill(skill.id)) {
                    if (Math.random() <= skill.skillFuncArg3) {
                        this.battleModel.processDebuff(executor, target, skill);
                    }
                }
                else if (skill.skillFunc === ENUM.SkillFunc.ATTACK || skill.skillFunc === ENUM.SkillFunc.MAGIC){
                    this.battleModel.processAffliction(executor, target, skill);
                }
            }

            if (defenseSkill && defenseSkill.willBeExecuted(defenseData)) {
                defenseSkill.execute(defenseData);    
            }
        }

        if (skill.skillFunc == ENUM.SkillFunc.DRAIN_ATTACK || skill.skillFunc == ENUM.SkillFunc.DRAIN_MAGIC) {
            this.processDrainPhase(executor, skill);
        }

        this.clearAllCardsDamagePhaseData();
    }

    /**
     * Process the drain phase for drain attacks
     */
    processDrainPhase(executor: Card, skill: Skill) {
        var healRange = RangeFactory.getRange(skill.skillFuncArg4);
        healRange.getReady(executor, (card: Card) => !card.isFullHealth());

        // hacky
        console.assert(!(healRange instanceof RandomRange), "can't do this with random ranges!");
        if (healRange.targets.length == 0) {
            return;
        }

        var healAmount = Math.floor((executor.lastBattleDamageDealt * skill.skillFuncArg2) / healRange.targets.length);
        var target: Card;
        while (target = healRange.getTarget(executor)) {
            this.battleModel.damageToTargetDirectly(target, -1 * healAmount, " healing");
        }
    }
}

class ProtectSkillLogic extends SkillLogic {
    counter: boolean = false;

    willBeExecuted(data: SkillLogicData): boolean {
        data.skill.getReady(data.executor);

        // a fam cannot protect itself, unless the skillRange is MYSELF
        if (this.cardManager.isSameCard(data.targetCard, data.executor) && data.skill.skillRange != ENUM.SkillRange.MYSELF) {
            return false;
        }

        console.assert(!(data.skill.range instanceof RandomRange), "can't do this with random ranges!");
        return super.willBeExecuted(data) && this.cardManager.isCardInList(data.targetCard, data.skill.range.targets);
    }

    execute(data: SkillLogicData) {
        return this.executeProtectPhase(data);
    }

    executeProtectPhase(data: SkillLogicData, noProtectLog?: boolean) {
        var protector = data.executor;
        var protectSkill = data.skill;
        var attackSkill = data.attackSkill;
        var toReturn: any = {};

        // first redirect the original attack to the protecting fam
        if (!noProtectLog) {
            this.logger.addMinorEvent({
                executorId: protector.id, 
                type: ENUM.MinorEventType.PROTECT,
                protect: {
                    protectedId: data.targetCard.id,
                    counter: this.counter,
                    counteredSkillId: attackSkill.id,
                    attackerId: data.attacker.id
                },
                description: protector.name + " procs " + protectSkill.name + " to protect " + data.targetCard.name + ". ",
                skillId: protectSkill.id
            });
        }

        if (protectSkill.skillFunc === ENUM.SkillFunc.PROTECT_REFLECT) {
            var dmgRatio = protectSkill.skillFuncArg5;
        }

        this.battleModel.processDamagePhase({
            attacker: data.attacker, 
            target: protector, 
            skill: attackSkill,
            scaledRatio: data.scaledRatio,
            dmgRatio: dmgRatio
        });

        if (protectSkill.skillFunc === ENUM.SkillFunc.PROTECT_REFLECT) {
            toReturn.dmgTaken = protector.lastBattleDamageTaken;
        }

        // note: don't need to check for justEvaded here
        if (!data.attacker.justMissed && !protector.isDead) {
            if (attackSkill.skillFunc === ENUM.SkillFunc.ATTACK || attackSkill.skillFunc === ENUM.SkillFunc.MAGIC) {
                this.battleModel.processAffliction(data.attacker, protector, attackSkill);
            }
            else if (Skill.isDebuffAttackSkill(attackSkill.id)) {
                if (Math.random() <= attackSkill.skillFuncArg3) {
                    this.battleModel.processDebuff(data.attacker, protector, attackSkill);
                }
            }
        }

        // update the targetsAttacked if necessary
        if (data.targetsAttacked) {
            data.targetsAttacked[protector.id] = true;
        }

        // clear the temp stuffs
        this.clearAllCardsDamagePhaseData();
        
        return toReturn;
    }
}

class EvadeSkillLogic extends SkillLogic {
    willBeExecuted(data: SkillLogicData): boolean {
        var skill = data.skill;
        skill.getReady(data.executor);

        // a fam cannot protect itself, unless the skillRange is MYSELF
        if (this.cardManager.isSameCard(data.targetCard, data.executor) && skill.skillRange != ENUM.SkillRange.MYSELF) {
            return false;
        }

        var canEvade = Skill.canProtectFromCalcType(skill.skillFuncArg2, data.attackSkill)
                    && Skill.canProtectFromAttackType(skill.skillFuncArg1, data.attackSkill);

        console.assert(!(skill.range instanceof RandomRange), "can't do this with random ranges!");
        return super.willBeExecuted(data) && this.cardManager.isCardInList(data.targetCard, skill.range.targets) && canEvade;
    }

    execute(data: SkillLogicData) {
        data.executor.justEvaded = true;

        this.logger.addMinorEvent({
            executorId: data.executor.id, 
            type: ENUM.MinorEventType.DESCRIPTION,
            noProcEffect: true,
            description: data.executor.name + " procs " + data.skill.name,
            skillId: data.skill.id
        });

        this.battleModel.processDamagePhase({
            attacker: data.attacker, 
            target: data.executor, 
            skill: data.attackSkill,
            scaledRatio: data.scaledRatio
        });

        // update the targetsAttacked if necessary
        if (data.targetsAttacked) {
            data.targetsAttacked[data.executor.id] = true;
        }

        // clear the temp stuffs
        this.clearAllCardsDamagePhaseData();

        return {};
    }
}

class ProtectCounterSkillLogic extends ProtectSkillLogic {
    constructor() {
        super();
        this.counter = true;
    }

    execute(data: SkillLogicData) {
        // protect phase
        var toReturn = this.executeProtectPhase(data);
        var protector = data.executor;

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

class ProtectReflectSkillLogic extends ProtectSkillLogic {
    static REFLECT_AFFLICTION_PROBABILITY = 0.2;

    willBeExecuted(data: SkillLogicData): boolean {
        var skill = data.skill;

        var canProtect = Skill.canProtectFromCalcType(skill.skillFuncArg2, data.attackSkill)
                    && Skill.canProtectFromAttackType(skill.skillFuncArg4, data.attackSkill);

        return super.willBeExecuted(data) && canProtect;
    }

    execute(data: SkillLogicData) {
        var toReturn = this.executeProtectPhase(data);

        if (data.executor.isDead || !data.executor.canUseSkill()) {
            return toReturn;
        }

        var range = RangeFactory.getRange(data.skill.skillFuncArg3);
        range.getReady(data.executor);
        var target: Card;

        // reflect animation is never AoE, so it is safe to do this
        while (target = range.getTarget(data.executor)) {
            this.battleModel.processDamagePhase({
                attacker: data.executor,
                target: target,
                skill: data.skill,
                scaledRatio: data.scaledRatio,
                oriAttacker: data.attacker,
                oriAtkSkill: data.attackSkill,
                oriDmg: toReturn.dmgTaken / data.skill.skillFuncArg5 //hacky
            });

            if (data.attackSkill.skillFunc === ENUM.SkillFunc.ATTACK || data.attackSkill.skillFunc === ENUM.SkillFunc.MAGIC) {
                this.battleModel.processAffliction(data.executor, target, data.attackSkill, ProtectReflectSkillLogic.REFLECT_AFFLICTION_PROBABILITY);
            }

            this.clearAllCardsDamagePhaseData();
        }

        return toReturn;
    }
}

class CounterSkillLogic extends SkillLogic {
    execute(data: SkillLogicData) {
        this.logger.addMinorEvent({
            executorId: data.executor.id, 
            type: ENUM.MinorEventType.DESCRIPTION,
            description: data.executor.name + " procs " + data.skill.name + ". ",
            skillId: data.skill.id
        });

        // counter phase
        this.battleModel.processDamagePhase({
            attacker: data.executor, 
            target: data.attacker, 
            skill: data.skill, 
            additionalDescription: data.executor.name + " counters " + data.attacker.name + "! ",
        });

        if (!data.executor.justMissed && !data.attacker.justEvaded && !data.attacker.isDead) {
            this.battleModel.processAffliction(data.executor, data.attacker, data.skill);
        }
    }
}

class CounterDispellSkillLogic extends ProtectSkillLogic {

    condFunc = (x: number) => x > 0;

    willBeExecuted(data: SkillLogicData): boolean {
        var range = RangeFactory.getRange(data.skill.skillFuncArg3);
        var hasValidtarget = range.hasValidTarget(data.executor, this.getCondFunc());
        return super.willBeExecuted(data) && hasValidtarget;
    }

    private getCondFunc() {
        return (card: Card): boolean => card.hasStatus(this.condFunc);
    }

    execute(data: SkillLogicData) {
        var toReturn = this.executeProtectPhase(data, true);

        if (data.executor.isDead || !data.executor.canUseSkill()) {
            return toReturn;
        }

        // now process the dispell
        this.logger.addMinorEvent({
            executorId: data.executor.id, 
            type: ENUM.MinorEventType.DESCRIPTION,
            description: data.executor.name + " procs " + data.skill.name,
            skillId: data.skill.id
        });

        var range = RangeFactory.getRange(data.skill.skillFuncArg3);
        range.getReady(data.executor, this.getCondFunc());
        var target: Card;

        while (target = range.getTarget(data.executor)) {
            target.clearAllStatus(this.condFunc);

            this.logger.addMinorEvent({
                executorId: data.executor.id,
                targetId: target.id,
                type: ENUM.MinorEventType.STATUS,
                status: {
                    type: 0, //dummy
                    isDispelled: true,
                },
                description: target.name + " is dispelled.",
                skillId: data.skill.id
            });
        }

        return toReturn;
    }
}

class OnHitDebuffSkillLogic extends SkillLogic {

    private static UNINITIALIZED_VALUE = -1234;
    private executionLeft: number = OnHitDebuffSkillLogic.UNINITIALIZED_VALUE;

    willBeExecuted(data: SkillLogicData): boolean {
        var hasTarget = data.skill.range.hasValidTarget(data.executor);

        // this should be done at construction time instead...
        if (this.executionLeft == OnHitDebuffSkillLogic.UNINITIALIZED_VALUE) {
            this.executionLeft = data.skill.skillFuncArg5;
        }

        if (this.executionLeft == 0) return false;

        var success = super.willBeExecuted(data) && hasTarget;

        if (success) {
            this.executionLeft--;
            return true;
        } else return false;
    }

    execute(data: SkillLogicData) {
        data.skill.getReady(data.executor);
        var target: Card;

        this.logger.addMinorEvent({
            executorId: data.executor.id, 
            type: ENUM.MinorEventType.DESCRIPTION,
            description: data.executor.name + " procs " + data.skill.name + ". ",
            skillId: data.skill.id
        });

        // debuff
        while (target = data.skill.getTarget(data.executor)) {
            this.battleModel.processDebuff(data.executor, target, data.skill);
        }        
    }
}

class DrainSkillLogic extends SkillLogic {

    willBeExecuted(data: SkillLogicData): boolean {
        var hasValidTarget = data.skill.range.hasValidTarget(data.executor, this.getCondFunc());
        return super.willBeExecuted(data) && hasValidTarget;
    }

    private getCondFunc() {
        return (card: Card): boolean => !card.isFullHealth();
    }

    execute(data: SkillLogicData) {
        var skill = data.skill;
        skill.range.getReady(data.executor, this.getCondFunc());
        var target: Card;

        this.logger.addMinorEvent({
            executorId: data.executor.id, 
            type: ENUM.MinorEventType.DESCRIPTION,
            description: data.executor.name + " procs " + skill.name + ". ",
            skillId: skill.id
        });

        // don't worry about length == 0, it would not have gotten into here anyway
        // TODO: very hacky, only works if the range is not a random range
        console.assert(!(skill.range instanceof RandomRange), "can't do this with random ranges!");
        var eachTargetHealAmount = Math.floor(data.executor.lastBattleDamageTaken / skill.range.targets.length);

        while (target = skill.getTarget(data.executor)) {
            this.battleModel.damageToTargetDirectly(target, -1 * eachTargetHealAmount, " healing");
        }        
    }
}

class SurviveSkillLogic extends SkillLogic {
    willBeExecuted(data: SkillLogicData): boolean {
        var hpRatio = data.executor.getHPRatio();
        return super.willBeExecuted(data) && (hpRatio > data.skill.skillFuncArg1) && (data.wouldBeDamage >= data.executor.getHP());
    }

    execute(data: SkillLogicData) {
        this.logger.addMinorEvent({
            executorId: data.executor.id, 
            type: ENUM.MinorEventType.DESCRIPTION,
            noProcEffect: true,
            description: data.executor.name + " procs " + data.skill.name + ". ",
            skillId: data.skill.id
        });
    }
}

class HealSkillLogic extends SkillLogic {
    willBeExecuted(data: SkillLogicData): boolean {
        var hasValidTarget = data.skill.range.hasValidTarget(data.executor, this.getCondFunc());
        return super.willBeExecuted(data) && hasValidTarget;
    }

    private getCondFunc() {
        return (card: Card): boolean => !card.isFullHealth();
    }

    execute(data: SkillLogicData) {
        data.skill.range.getReady(data.executor, this.getCondFunc());

        var baseHealAmount = getHealAmount(data.executor);

        var multiplier = data.skill.skillFuncArg1;
        var healAmount = Math.floor(multiplier * baseHealAmount);

        var target: Card;
        while (target = data.skill.getTarget(data.executor)) {

            // if the heal is not based on wis, recalculate the heal amount
            if (data.skill.skillFuncArg2 == 1) {
                healAmount = multiplier * target.getOriginalHP();
            }

            this.battleModel.damageToTargetDirectly(target, -1 * healAmount, " healing");
        }     
    }
}

class ReviveSkillLogic extends SkillLogic {
    willBeExecuted(data: SkillLogicData): boolean {
        var hasValidTarget = data.skill.range.hasValidTarget(data.executor);
        return super.willBeExecuted(data) && hasValidTarget;
    }

    execute(data: SkillLogicData) {
        data.skill.getReady(data.executor);
        var hpRatio = data.skill.skillFuncArg1;

        var target: Card;
        while (target = data.skill.getTarget(data.executor)) {
            target.revive(hpRatio);

            this.logger.addMinorEvent({
                executorId: data.executor.id,
                targetId: target.id,
                type: ENUM.MinorEventType.REVIVE,
                reviveHPRatio: hpRatio,
                description: target.name + " is revived with " + hpRatio * 100 + "% HP!",
                skillId: data.skill.id
            });
        }        
    }
}

class TurnOrderChangeSkillLogic extends SkillLogic {
    willBeExecuted(data: SkillLogicData): boolean {
        return super.willBeExecuted(data) && !this.battleModel.turnOrderChanged;
    }

    execute(data: SkillLogicData) {
        this.battleModel.turnOrderChanged = true;
        this.battleModel.turnOrderBase = data.skill.skillFuncArg1;
        this.battleModel.turnOrderChangeEffectiveTurns = data.skill.skillFuncArg2;
        
        this.logger.addMinorEvent({
                executorId: data.executor.id,
                type: ENUM.MinorEventType.BATTLE_DESCRIPTION,
                description: "Turn order is now based on " + ENUM.BattleTurnOrderType[data.skill.skillFuncArg1] + " for " + 
                    data.skill.skillFuncArg2 + " turn(s).",
                skillId: data.skill.id,
                battleDesc: "Turn Order Changed"
        });
    }
}

class RandomSkillLogic extends SkillLogic {
    execute(data: SkillLogicData) {
        var randSkillsId: number[] = SkillDatabase[data.skill.id].randSkills;
        shuffle(randSkillsId);
        data.noProbCheck = true;

        for (var i = 0; i < randSkillsId.length; i++) {
            var skill = new Skill(randSkillsId[i]);
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

interface SkillLogicData {
    executor: Card;
    skill?: Skill;
    wouldBeDamage?: number; // the would-be damage, for survive skills
    scaledRatio?: number;
    attacker?: Card;    // for protect/counter
    attackSkill?: Skill; // for protect/counter
    targetCard?: Card;  // for protect
    targetsAttacked?: boolean[];  // for protect
    noProbCheck?: boolean; // for passing the prob check of proccing the skill, like for RandomSkillLogic
}
