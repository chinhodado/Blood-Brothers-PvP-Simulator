class SkillLogicFactory {
    static getSkillLogic(skillFunc: number): SkillLogic {
        switch (skillFunc) {
            case ENUM.SkillFunc.BUFF:
                return new BuffSkillLogic();
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF:
                return new CasterBasedDebuffSkillLogic();
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
            case ENUM.SkillFunc.PROTECT_COUNTER:
                return new ProtectCounterSkillLogic();
            case ENUM.SkillFunc.COUNTER:
                return new CounterSkillLogic();
            case ENUM.SkillFunc.COUNTER_DISPELL:
                return new CounterDispellSkillLogic()
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
}

class BuffSkillLogic extends SkillLogic {

    willBeExecuted(data: SkillLogicData): boolean {
        var targets: Card[] = data.skill.range.getTargets(data.executor);
        return super.willBeExecuted(data) && targets && (targets.length > 0);
    }

    execute(data: SkillLogicData) {
        var skill = data.skill;
        var executor = data.executor;
        var targets: Card[] = skill.range.getTargets(executor);

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

        for (var i = 0; i < targets.length; i++) {
            for (var j = 0; j < statusToBuff.length; j++) {
                var target = targets[i];
                var statusType = statusToBuff[j];

                switch (statusType) {
                    case ENUM.StatusType.ATK:
                    case ENUM.StatusType.DEF:
                    case ENUM.StatusType.WIS:
                    case ENUM.StatusType.AGI:
                        var skillMod = skill.skillFuncArg1;

                        if (skill.skillFuncArg2 != ENUM.StatusType.ALL_STATUS) {
                            // do nothing - we already calculated the base stat earlier
                        }
                        else { // flat based on target's stat (Rally Cry)
                            basedOnStatType = ENUM.StatusType[statusType];
                            baseStat = target.getStat(basedOnStatType);
                        }

                        var buffAmount = Math.round(skillMod * baseStat);
                        break;
                    case ENUM.StatusType.ATTACK_RESISTANCE:
                    case ENUM.StatusType.MAGIC_RESISTANCE:
                    case ENUM.StatusType.BREATH_RESISTANCE:
                    case ENUM.StatusType.SKILL_PROBABILITY:
                    case ENUM.StatusType.WILL_ATTACK_AGAIN:
                    case ENUM.StatusType.ACTION_ON_DEATH:
                        var buffAmount = skill.skillFuncArg1;
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
                var description = target.name + "'s " + ENUM.StatusType[statusType] + " increased by " + buffAmount;
                
                this.logger.addMinorEvent({
                    executorId: executor.id, 
                    targetId: target.id, 
                    type: ENUM.MinorEventType.STATUS, 
                    status: {
                        type: statusType,
                        isAllUp: skill.skillFuncArg2 == ENUM.StatusType.ALL_STATUS
                    },
                    description: description, 
                    amount: buffAmount,
                    skillId: skill.id
                });
            }
        }
    }
}

class CasterBasedDebuffSkillLogic extends SkillLogic {
    execute(data: SkillLogicData) {
        var skill = data.skill;
        var executor = data.executor;
           
        var targets: Card[] = skill.range.getTargets(executor);
            
        for (var i = 0; i < targets.length; i++) {
            this.battleModel.processDebuff(executor, targets[i], skill);
        }
    }
}

class DispellSkillLogic extends SkillLogic {
    willBeExecuted(data: SkillLogicData): boolean {
        var targets = this.getValidTargets(data);
        return super.willBeExecuted(data) && (targets.length > 0);
    }

    getValidTargets(data: SkillLogicData): Card[] {
        var rangeTargets = data.skill.getTargets(data.executor);
        var validTargets = [];

        for (var i = 0; i < rangeTargets.length; i++) {
            if (rangeTargets[i].hasPositiveStatus()) {
                validTargets.push(rangeTargets[i]);
            }
        }

        return validTargets;
    }

    execute(data: SkillLogicData) {
        var targets = this.getValidTargets(data);

        for (var i = 0; i < targets.length; i++) {
            targets[i].clearAllPositiveStatus();

            var desc = targets[i].name + " is dispelled.";
            this.logger.addMinorEvent({
                executorId: data.executor.id,
                targetId: targets[i].id,
                type: ENUM.MinorEventType.STATUS,
                status: {
                    type: 0, //dummy
                    isDispelled: true,
                },
                description: desc,
                skillId: data.skill.id
            });
        }
    }
}

class AfflictionSkillLogic extends SkillLogic {
    execute(data: SkillLogicData) {
        var targets = data.skill.range.getTargets(data.executor);

        for (var i = 0; i < targets.length; i++) {
            this.battleModel.processAffliction(data.executor, targets[i], data.skill);
        }        
    }
}

class AttackSkillLogic extends SkillLogic {

    willBeExecuted(data: SkillLogicData): boolean {
        var targets = data.skill.getTargets(data.executor);
        return super.willBeExecuted(data) && targets && (targets.length > 0);
    }

    execute(data: SkillLogicData) {
        if (RangeFactory.isEnemyRandomRange(data.skill.skillRange)) {
            this.executeRandomAttackSkill(data);
        }
        else {
            this.executeAttackSkillWithRangeTargets(data);
        }
    }

    executeRandomAttackSkill (data: SkillLogicData) {
        var numTarget = (<EnemyRandomRange>data.skill.range).numTarget;
        
        for (var i = 0; i < numTarget && !data.executor.isDead; i++) {

            var targetCard = this.cardManager.getValidSingleTarget(this.battleModel.oppositePlayerMainCards);
    
            if (!targetCard) {
                // no valid target, miss a turn, continue to next card
                return;
            }
            
            // since we get a valid index with every iteration of the loop, there's no need
            // to check if the target is dead here
            this.processAttackAgainstSingleTarget(data.executor, targetCard, data.skill);
        }
    }

    /**
     * Execute an attack skill that has the targets obtained from its range
     */
    executeAttackSkillWithRangeTargets (data: SkillLogicData) {
        var skill = data.skill;
        var executor = data.executor;
        var targets: Card[] = skill.range.getTargets(executor);

        if (RangeFactory.isEnemyNearScaledRange(skill.skillRange)) {
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
            var targetsAttacked = {};

            var missed = false;
            if (data.executor.willMiss()) {
                missed = true;
            }

            for (var i = 0; i < targets.length; i++) { //<- note that there's no executor.isDead check here
                var targetCard = targets[i];

                // a target can be dead, for example from protecting another fam
                if (targetCard.isDead) {
                    continue;
                }

                var protectSkillActivated = false; //<- has any protect skill activated to protect the current target?
                var damageDealt: number;

                // if no reactive skill has been activated at all during this AoE, we can try to
                // protect this target, otherwise no protect can be activated to protect this target
                // also, if the target has already been attacked (i.e. it protected another card before), then
                // don't try to protect it
                if (!aoeReactiveSkillActivated && !targetsAttacked[targetCard.id]) {
                    var protectData = this.battleModel.processProtect(executor, targetCard, skill, targetsAttacked, scaledRatio)
                    protectSkillActivated = protectData.activated;
                    if (protectSkillActivated) {
                        aoeReactiveSkillActivated = true;
                    }
                }

                // if not protected, proceed with the attack as normal
                // also need to make sure the target is not already attacked
                if (!protectSkillActivated && !targetsAttacked[targetCard.id]) {
                    var defenseSkill = targetCard.getRandomDefenseSkill();

                    var wouldBeDamage = missed? 0 : this.battleModel.getWouldBeDamage(executor, targetCard, skill, {scaledRatio: scaledRatio});

                    var defenseData: SkillLogicData = {
                        executor: targetCard,
                        skill: defenseSkill,
                        attacker: executor,
                        wouldBeDamage: wouldBeDamage
                    }

                    if (!missed && skill.skillFunc == ENUM.SkillFunc.KILL) {
                        if (Math.random() <= skill.skillFuncArg2) { // probability check
                            var isKilled = true;
                        }
                    }

                    if (defenseSkill && 
                        defenseSkill.skillFunc == ENUM.SkillFunc.SURVIVE &&
                        defenseSkill.willBeExecuted(defenseData) && 
                        !aoeReactiveSkillActivated) 
                    {
                        defenseSkill.execute(defenseData);
                        wouldBeDamage = targetCard.getHP() - 1;
                        aoeReactiveSkillActivated = true;
                    }

                    this.battleModel.damageToTarget({
                        attacker: executor, 
                        target: targetCard, 
                        skill: skill,
                        damage: wouldBeDamage,
                        missed: missed,
                        isKilled: isKilled
                    });
                    targetsAttacked[targetCard.id] = true;
                    damageDealt = wouldBeDamage;

                    if (!missed && !targetCard.isDead) {
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
                    if (defenseSkill && defenseSkill.willBeExecuted(defenseData) && 
                        defenseSkill.skillFunc != ENUM.SkillFunc.SURVIVE && !aoeReactiveSkillActivated) 
                    {
                        defenseSkill.execute(defenseData);
                        aoeReactiveSkillActivated = true; 
                    }
                }
                else {
                    damageDealt = protectData.damage;
                }

                if (skill.skillFunc == ENUM.SkillFunc.DRAIN_ATTACK || skill.skillFunc == ENUM.SkillFunc.DRAIN_MAGIC) {
                    this.processHeal(executor, skill, damageDealt);
                }
            }
        }
        else {
            // skill makes contact, must be fork/sweeping etc., so just proceed as normal
            // i.e. multiple protection is possible
            
            for (var i = 0; i < targets.length && !executor.isDead; i++) {
                var targetCard = targets[i];

                // a target can be dead, for example from protecting another fam
                if (targetCard.isDead) {
                    continue;
                }

                this.processAttackAgainstSingleTarget(data.executor, targetCard, data.skill, scaledRatio);
            }
        }        
    }

    processAttackAgainstSingleTarget(executor: Card, target: Card, skill: Skill, scaledRatio?: number) {
        var protectData = this.battleModel.processProtect(executor, target, skill, null, scaledRatio);
        var damageDealt: number;

        // if not protected, proceed with the attack as normal
        if (!protectData.activated) {
            var missed = false;
            var wouldBeDamage = this.battleModel.getWouldBeDamage(executor, target, skill, {scaledRatio: scaledRatio});

            if (executor.willMiss()) {
                missed = true;
                wouldBeDamage = 0; 
            }

            var defenseSkill = target.getRandomDefenseSkill();
                
            var defenseData: SkillLogicData = {
                executor: target,
                skill: defenseSkill,
                attacker: executor,
                wouldBeDamage: wouldBeDamage
            }

            if (!missed && skill.skillFunc == ENUM.SkillFunc.KILL) {
                if (Math.random() <= skill.skillFuncArg2) { // probability check
                    var isKilled = true;
                }
            }

            if (defenseSkill && defenseSkill.skillFunc == ENUM.SkillFunc.SURVIVE && defenseSkill.willBeExecuted(defenseData)) {
                defenseSkill.execute(defenseData);
                wouldBeDamage = target.getHP() - 1;
            }

            this.battleModel.damageToTarget({
                attacker: executor, 
                target: target, 
                skill: skill,
                damage: wouldBeDamage,
                missed: missed,
                isKilled: isKilled
            });

            damageDealt = wouldBeDamage;

            if (!missed && !target.isDead) {
                if (Skill.isDebuffAttackSkill(skill.id)) {
                    if (Math.random() <= skill.skillFuncArg3) {
                        this.battleModel.processDebuff(executor, target, skill);
                    }
                }
                else if (skill.skillFunc === ENUM.SkillFunc.ATTACK || skill.skillFunc === ENUM.SkillFunc.MAGIC){
                    this.battleModel.processAffliction(executor, target, skill);
                }
            }

            if (defenseSkill && defenseSkill.willBeExecuted(defenseData) && defenseSkill.skillFunc != ENUM.SkillFunc.SURVIVE) {
                defenseSkill.execute(defenseData);    
            }
        }
        else {
            damageDealt = protectData.damage;
        }

        if (skill.skillFunc == ENUM.SkillFunc.DRAIN_ATTACK || skill.skillFunc == ENUM.SkillFunc.DRAIN_MAGIC) {
            this.processHeal(executor, skill, damageDealt);
        }
    }

    // for drain attack
    processHeal(executor: Card, skill: Skill, damageDealt: number) {
        var healRange = RangeFactory.getRange(skill.skillFuncArg4);
        var initialHealTargets = healRange.getTargets(executor);
        var healTargets = [];

        for (var i = 0; i < initialHealTargets.length; i++) {
            var tmpCard = initialHealTargets[i];
            if (!tmpCard.isFullHealth()) {
                healTargets.push(tmpCard);
            }
        }

        if (healTargets.length == 0) {
            return;
        }

        var healAmount = Math.floor((damageDealt * skill.skillFuncArg2) / healTargets.length);
        for (var i = 0; i < healTargets.length; i++) {
            this.battleModel.damageToTargetDirectly(healTargets[i], -1 * healAmount, " healing");
        }
    }
}

class ProtectSkillLogic extends SkillLogic {
    counter: boolean = false;

    willBeExecuted(data: SkillLogicData): boolean {
        var targets = data.skill.getTargets(data.executor);

        // a fam cannot protect itself, unless the skillRange is 21 (hard-coded here for now)
        if (this.cardManager.isSameCard(data.targetCard, data.executor) && data.skill.skillRange != 21) {
            return false;
        }

        return super.willBeExecuted(data) && this.cardManager.isCardInList(data.targetCard, targets);
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
            var desc = protector.name + " procs " + protectSkill.name + " to protect " + data.targetCard.name + ". ";
            this.logger.addMinorEvent({
                executorId: protector.id, 
                type: ENUM.MinorEventType.PROTECT,
                protect: {
                    protectedId: data.targetCard.id,
                    counter: this.counter,
                    counteredSkillId: attackSkill.id,
                    attackerId: data.attacker.id
                },
                description: desc,
                skillId: protectSkill.id
            });
        }

        var missed = data.attacker.willMiss();

        if (!missed && attackSkill.skillFunc == ENUM.SkillFunc.KILL) {
            if (Math.random() <= attackSkill.skillFuncArg2) { // probability check
                var isKilled = true;
            }
        }

        var wouldBeDamage = missed? 0 : this.battleModel.getWouldBeDamage(data.attacker, protector, attackSkill, {scaledRatio: data.scaledRatio});
        toReturn.damage = wouldBeDamage;
        this.battleModel.damageToTarget({
            attacker: data.attacker, 
            target: protector, 
            skill: attackSkill,
            damage: wouldBeDamage,
            missed: missed,
            isKilled: isKilled
        });

        if (!missed && !protector.isDead) {
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
        
        return toReturn;
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
            var counterMissed = protector.willMiss();

            var additionalDesc = protector.name + " counters " + data.attacker.name + "! ";
            this.battleModel.damageToTarget({
                attacker: protector, 
                target: data.attacker, 
                skill: data.skill, 
                additionalDescription: additionalDesc,
                missed: counterMissed
            });
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
        var missed = data.executor.willMiss();

        this.battleModel.damageToTarget({
            attacker: data.executor, 
            target: data.attacker, 
            skill: data.skill, 
            additionalDescription: data.executor.name + " counters " + data.attacker.name + "! ",
            missed: missed
        });
    }
}

class CounterDispellSkillLogic extends ProtectSkillLogic {
    willBeExecuted(data: SkillLogicData): boolean {
        var targets = this.getValidTargets(data);
        return super.willBeExecuted(data) && (targets.length > 0);
    }

    getValidTargets(data: SkillLogicData): Card[] {
        // nearly similar to DispellSkillLogic, but careful with the range
        var range = RangeFactory.getRange(data.skill.skillFuncArg3);
        var rangeTargets = range.getTargets(data.executor);
        var validTargets = [];

        for (var i = 0; i < rangeTargets.length; i++) {
            if (rangeTargets[i].hasPositiveStatus()) {
                validTargets.push(rangeTargets[i]);
            }
        }

        return validTargets;
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

        var targets = this.getValidTargets(data);

        for (var i = 0; i < targets.length; i++) {
            targets[i].clearAllPositiveStatus();

            var desc = targets[i].name + " is dispelled.";
            this.logger.addMinorEvent({
                executorId: data.executor.id,
                targetId: targets[i].id,
                type: ENUM.MinorEventType.STATUS,
                status: {
                    type: 0, //dummy
                    isDispelled: true,
                },
                description: desc,
                skillId: data.skill.id
            });
        }

        return toReturn;
    }
}

class DrainSkillLogic extends SkillLogic {

    willBeExecuted(data: SkillLogicData): boolean {
        var targets = this.getValidTargets(data);
        return super.willBeExecuted(data) && (targets.length > 0);
    }

    getValidTargets(data: SkillLogicData): Card[] {
        var rangeTargets = data.skill.getTargets(data.executor);
        var validTargets = [];

        for (var i = 0; i < rangeTargets.length; i++) {
            if (!rangeTargets[i].isFullHealth()) {
                validTargets.push(rangeTargets[i]);
            }
        }

        return validTargets;
    }

    execute(data: SkillLogicData) {

        var targets = this.getValidTargets(data);

        var desc = data.executor.name + " procs " + data.skill.name + ". ";
        this.logger.addMinorEvent({
            executorId: data.executor.id, 
            type: ENUM.MinorEventType.DESCRIPTION,
            description: desc,
            skillId: data.skill.id
        });

        // don't worry about length == 0, it would not have gotten into here anyway
        var eachTargetHealAmount = Math.floor(data.wouldBeDamage / targets.length);

        for (var i = 0; i < targets.length; i++) {
            this.battleModel.damageToTargetDirectly(targets[i], -1 * eachTargetHealAmount, " healing");
        }        
    }
}

class SurviveSkillLogic extends SkillLogic {
    willBeExecuted(data: SkillLogicData): boolean {
        var hpRatio = data.executor.getHPRatio();
        return super.willBeExecuted(data) && (hpRatio > data.skill.skillFuncArg1) && (data.wouldBeDamage >= data.executor.getHP());
    }

    execute(data: SkillLogicData) {
        var desc = data.executor.name + " procs " + data.skill.name + ". ";
        this.logger.addMinorEvent({
            executorId: data.executor.id, 
            type: ENUM.MinorEventType.DESCRIPTION,
            noProcEffect: true,
            description: desc,
            skillId: data.skill.id
        });
    }
}

class HealSkillLogic extends SkillLogic {
    execute(data: SkillLogicData) {
        var targets = data.skill.getTargets(data.executor);

        if (!targets || targets.length == 0) {
            return;
        }

        var baseHealAmount = getHealAmount(data.executor);

        var multiplier = data.skill.skillFuncArg1;
        var healAmount = Math.floor(multiplier * baseHealAmount);

        for (var i = 0; i < targets.length; i++) {

            // if the heal is not based on wis, recalculate the heal amount
            if (data.skill.skillFuncArg2 == 1) {
                healAmount = multiplier * targets[i].getOriginalHP();
            }

            this.battleModel.damageToTargetDirectly(targets[i], -1 * healAmount, " healing");
        }     
    }
}

class ReviveSkillLogic extends SkillLogic {
    willBeExecuted(data: SkillLogicData): boolean {
        var targets = data.skill.getTargets(data.executor);
        return super.willBeExecuted(data) && targets && (targets.length > 0);
    }

    execute(data: SkillLogicData) {

        var targets = data.skill.getTargets(data.executor);
        var hpRatio = data.skill.skillFuncArg1;

        for (var i = 0; i < targets.length; i++) {
            targets[i].revive(hpRatio);

            this.logger.addMinorEvent({
                executorId: data.executor.id,
                targetId: targets[i].id,
                type: ENUM.MinorEventType.REVIVE,
                reviveHPRatio: hpRatio,
                description: targets[i].name + " is revived with " + hpRatio * 100 + "% HP!",
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
    wouldBeDamage?: number; // the would-be damage, for defense
    scaledRatio?: number;
    attacker?: Card;    // for protect/counter
    attackSkill?: Skill // for protect/counter
    targetCard?: Card;  // for protect
    targetsAttacked?: any;  // for protect
    noProbCheck?: boolean; // for passing the prob check of proccing the skill, like for RandomSkillLogic
}