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
                       (!data.executor.isDead && data.skill.skillType !== ENUM.SkillType.ACTION_ON_DEATH)

        return (deadCond && 
            data.executor.canAttack() && // if cannot attack -> cannot use skill, so the same. If can attack, true, doesn't matter
            data.executor.canUseSkill() && 
            Math.random() * 100 < data.skill.maxProbability);
    }

    execute(data: SkillLogicData) {
        throw new Error("Implement this");
    }
}

class BuffSkillLogic extends SkillLogic {
    execute(data: SkillLogicData) {
        var skill = data.skill;
        var executor = data.executor;
        var targets: Card[] = skill.range.getTargets(executor);

        if (skill.skillFuncArg2 != ENUM.StatusType.ALL_STATUS) {
            var statusToBuff: ENUM.StatusType[] = [skill.skillFuncArg2];
            if (skill.skillFuncArg3 != 0) {
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
                    case ENUM.StatusType.ATK :
                    case ENUM.StatusType.DEF :
                    case ENUM.StatusType.WIS :
                    case ENUM.StatusType.AGI :
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
                    case ENUM.StatusType.ATTACK_RESISTANCE :
                    case ENUM.StatusType.MAGIC_RESISTANCE :
                    case ENUM.StatusType.BREATH_RESISTANCE :
                    case ENUM.StatusType.WILL_ATTACK_AGAIN:
                    case ENUM.StatusType.ACTION_ON_DEATH:
                        var buffAmount = skill.skillFuncArg1;
                        break;
                    default :
                        throw new Error("Wrong status type or not implemented");
                }
            
                target.changeStatus(statusType, buffAmount);
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

        for (var skillFuncArgNum = 2; skillFuncArgNum <= 5; skillFuncArgNum++) {
            var type: ENUM.StatusType = skill.getSkillFuncArg(skillFuncArgNum);
            if (type == 0) {
                continue;
            }
            switch (type) {
                case ENUM.StatusType.ATK :
                case ENUM.StatusType.DEF :
                case ENUM.StatusType.WIS :
                case ENUM.StatusType.AGI :
                    var basedOnStatType = ENUM.SkillCalcType[skill.skillCalcType];
                    var skillMod = skill.skillFuncArg1;
                    var buffAmount = Math.round(skillMod * getCasterBasedDebuffAmount(executor));
                    break;
                default :
                    throw new Error("Wrong status type for greatly debuff or not implemented");
            }
            
            var targets : Card[] = skill.range.getTargets(executor);
            
            for (var i = 0; i < targets.length; i++) {
                targets[i].changeStatus(type, buffAmount, true);
                var description = targets[i].name + "'s " + ENUM.StatusType[type] + " decreased by " + Math.abs(buffAmount);
                
                this.logger.addMinorEvent({
                    executorId: executor.id, 
                    targetId: targets[i].id, 
                    type: ENUM.MinorEventType.STATUS, 
                    status: {
                        type: type,
                        isNewLogic: true
                    },
                    description: description, 
                    amount: buffAmount,
                    skillId: skill.id
                });
            }
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

            var targetIndex = this.cardManager.getValidSingleTarget(this.battleModel.oppositePlayerCards);
    
            if (targetIndex == -1) {
                // no valid target, miss a turn, continue to next card
                return;
            }
            
            // since we get a valid index with every iteration of the loop, there's no need
            // to check if the target is dead here
            var targetCard = this.battleModel.oppositePlayerCards[targetIndex];
            var protectSkillActivated = this.battleModel.processProtect(data.executor, targetCard, data.skill, null);

            // if not protected, proceed with the attack as normal
            if (!protectSkillActivated) {
                var defenseSkill = targetCard.getRandomDefenseSkill();
                var wouldBeDamage = this.battleModel.getWouldBeDamage(data.executor, targetCard, data.skill);

                var defenseData: SkillLogicData = {
                    executor: targetCard,
                    skill: defenseSkill,
                    attacker:  data.executor,
                    wouldBeDamage: wouldBeDamage
                }

                if (defenseSkill && defenseSkill.skillFunc == ENUM.SkillFunc.SURVIVE &&
                     defenseSkill.willBeExecuted(defenseData)) {
                    defenseSkill.execute(defenseData);
                    wouldBeDamage = targetCard.getHP() - 1;
                }

                this.battleModel.damageToTarget({
                    attacker: data.executor, 
                    target: targetCard, 
                    skill: data.skill,
                    damage: wouldBeDamage
                });

                if (data.skill.skillFunc === ENUM.SkillFunc.DEBUFFATTACK || data.skill.skillFunc === ENUM.SkillFunc.DEBUFFINDIRECT) {
                    if (Math.random() <= data.skill.skillFuncArg3) {
                        this.battleModel.processDebuff(data.executor, targetCard, data.skill);
                    }
                }
                else {
                    this.battleModel.processAffliction(data.executor, targetCard, data.skill);
                }

                if (defenseSkill && defenseSkill.willBeExecuted(defenseData) && defenseSkill.skillFunc != ENUM.SkillFunc.SURVIVE) {
                    defenseSkill.execute(defenseData);    
                }
            }
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
                    protectSkillActivated = this.battleModel.processProtect(executor, targetCard, skill, targetsAttacked, scaledRatio);
                    if (protectSkillActivated) {
                        aoeReactiveSkillActivated = true;
                    }
                }

                // if not protected, proceed with the attack as normal
                // also need to make sure the target is not already attacked
                if (!protectSkillActivated && !targetsAttacked[targetCard.id]) {
                    var defenseSkill = targetCard.getRandomDefenseSkill();
                    var wouldBeDamage = this.battleModel.getWouldBeDamage(executor, targetCard, skill, {scaledRatio: scaledRatio});

                    var defenseData: SkillLogicData = {
                        executor: targetCard,
                        skill: defenseSkill,
                        attacker: executor,
                        wouldBeDamage: wouldBeDamage
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
                        damage: wouldBeDamage
                    });
                    targetsAttacked[targetCard.id] = true;

                    if (skill.skillFunc === ENUM.SkillFunc.DEBUFFATTACK || skill.skillFunc === ENUM.SkillFunc.DEBUFFINDIRECT) {
                        if (Math.random() <= skill.skillFuncArg3) {
                            this.battleModel.processDebuff(executor, targetCard, skill);
                        }
                    }
                    else {
                        this.battleModel.processAffliction(executor, targetCard, skill);
                    }

                    // try to proc post-damage skills
                    if (defenseSkill && defenseSkill.willBeExecuted(defenseData) && 
                        defenseSkill.skillFunc != ENUM.SkillFunc.SURVIVE && !aoeReactiveSkillActivated) 
                    {
                        defenseSkill.execute(defenseData);
                        aoeReactiveSkillActivated = true; 
                    }
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

                var protectSkillActivated = this.battleModel.processProtect(executor, targetCard, skill, null, scaledRatio);

                // if not protected, proceed with the attack as normal
                if (!protectSkillActivated) {
                    var defenseSkill = targetCard.getRandomDefenseSkill();
                    var wouldBeDamage = this.battleModel.getWouldBeDamage(executor, targetCard, skill, {scaledRatio: scaledRatio});

                    var defenseData: SkillLogicData = {
                        executor: targetCard,
                        skill: defenseSkill,
                        attacker:  executor,
                        wouldBeDamage: wouldBeDamage
                    }

                    if (defenseSkill && defenseSkill.skillFunc == ENUM.SkillFunc.SURVIVE &&
                        defenseSkill.willBeExecuted(defenseData)) {
                        defenseSkill.execute(defenseData);
                        wouldBeDamage = targetCard.getHP() - 1;
                    }

                    this.battleModel.damageToTarget({
                        attacker: executor, 
                        target: targetCard, 
                        skill: skill,
                        damage: wouldBeDamage
                    });

                    if (skill.skillFunc === ENUM.SkillFunc.DEBUFFATTACK || skill.skillFunc === ENUM.SkillFunc.DEBUFFINDIRECT) {
                        if (Math.random() <= skill.skillFuncArg3) {
                            this.battleModel.processDebuff(executor, targetCard, skill);
                        }
                    }
                    else {
                        this.battleModel.processAffliction(executor, targetCard, skill);
                    }

                    if (defenseSkill && defenseSkill.willBeExecuted(defenseData) && defenseSkill.skillFunc != ENUM.SkillFunc.SURVIVE) {
                        defenseSkill.execute(defenseData);    
                    }
                }
            }
        }        
    }
}

class ProtectSkillLogic extends SkillLogic {
    willBeExecuted(data: SkillLogicData): boolean {
        var targets = data.skill.getTargets(data.executor);

        // a fam cannot protect itself, unless the skillRange is 21 (hard-coded here for now)
        if (this.cardManager.isSameCard(data.targetCard, data.executor) && data.skill.skillRange != 21) {
            return false;
        }

        return super.willBeExecuted(data) && this.cardManager.isCardInList(data.targetCard, targets);
    }

    execute(data: SkillLogicData) {
        var protector = data.executor;
        var protectSkill = data.skill;
        var attackSkill = data.attackSkill;

        // first redirect the original attack to the protecting fam
        var desc = protector.name + " procs " + protectSkill.name + " to protect " +
            data.targetCard.name + ". ";
        this.logger.addMinorEvent({
            executorId: protector.id, 
            type: ENUM.MinorEventType.PROTECT,
            protect: {
                protectedId: data.targetCard.id,
                counteredSkillId: attackSkill.id,
                attackerId: data.attacker.id
            },
            description: desc,
            skillId: protectSkill.id
        });

        this.battleModel.damageToTarget({
            attacker: data.attacker, 
            target: protector, 
            skill: attackSkill,
            scaledRatio: data.scaledRatio
        });

        if (attackSkill.skillFunc === ENUM.SkillFunc.ATTACK || attackSkill.skillFunc === ENUM.SkillFunc.MAGIC) {
            this.battleModel.processAffliction(data.attacker, protector, attackSkill);
        }

        // update the targetsAttacked if necessary
        if (data.targetsAttacked) {
            data.targetsAttacked[protector.id] = true;
        }
    }
}

class ProtectCounterSkillLogic extends ProtectSkillLogic {
    execute(data: SkillLogicData) {
        var protector = data.executor;
        var protectSkill = data.skill;
        var attackSkill = data.attackSkill;

        // first redirect the original attack to the protecting fam
        var desc = protector.name + " procs " + protectSkill.name + " to protect " +
            data.targetCard.name + ". ";
        this.logger.addMinorEvent({
            executorId: protector.id, 
            type: ENUM.MinorEventType.PROTECT, 
            protect: {
                protectedId: data.targetCard.id,
                counter: true, // <- different from Protect
                counteredSkillId: attackSkill.id,
                attackerId: data.attacker.id
            },
            description: desc,
            skillId: protectSkill.id
        });

        this.battleModel.damageToTarget({
            attacker: data.attacker, 
            target: protector, 
            skill: attackSkill,
            scaledRatio: data.scaledRatio
        });

        if (attackSkill.skillFunc === ENUM.SkillFunc.ATTACK || attackSkill.skillFunc === ENUM.SkillFunc.MAGIC) {
            this.battleModel.processAffliction(data.attacker, protector, attackSkill);
        }

        // update the targetsAttacked if necessary
        if (data.targetsAttacked) {
            data.targetsAttacked[protector.id] = true;
        }

        // counter phase
        if (!protector.isDead) {
            var additionalDesc = protector.name + " counters " + data.attacker.name + "! ";
            this.battleModel.damageToTarget({
                attacker: protector, 
                target: data.attacker, 
                skill: protectSkill, 
                additionalDescription: additionalDesc
            });
        }
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
        var additionalDesc = data.executor.name + " counters " + data.attacker.name + "! ";
        this.battleModel.damageToTarget({
            attacker: data.executor, 
            target: data.attacker, 
            skill: data.skill, 
            additionalDescription: additionalDesc
        });
    }
}

class CounterDispellSkillLogic extends SkillLogic {
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
        var attackSkill = data.attackSkill;

        // first take the damage
        this.battleModel.damageToTarget({
            attacker: data.attacker, 
            target: data.executor, 
            skill: attackSkill,
            scaledRatio: data.scaledRatio
        });

        if (attackSkill.skillFunc === ENUM.SkillFunc.ATTACK || attackSkill.skillFunc === ENUM.SkillFunc.MAGIC) {
            this.battleModel.processAffliction(data.attacker, data.executor, attackSkill);
        }

        // update the targetsAttacked if necessary
        if (data.targetsAttacked) {
            data.targetsAttacked[data.executor.id] = true;
        }

        if (data.executor.isDead || !data.executor.canUseSkill()) {
            return;
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
        var baseHealAmount = getHealAmount(data.executor);

        var multiplier = data.skill.skillFuncArg1;
        var healAmount = Math.floor(multiplier * baseHealAmount);

        for (var i = 0; i < targets.length; i++) {
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

interface SkillLogicData {
    executor: Card;
    skill?: Skill;
    wouldBeDamage?: number; // the would-be damage, for defense
    scaledRatio?: number;
    attacker?: Card;    // for protect/counter
    attackSkill?: Skill // for protect/counter
    targetCard?: Card;  // for protect
    targetsAttacked?: any;  // for protect
}