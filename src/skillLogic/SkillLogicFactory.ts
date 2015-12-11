/// <reference path="AbsorbSkillLogic.ts"/>
/// <reference path="AfflictionSkillLogic.ts"/>
/// <reference path="AttackSkillLogic.ts"/>
/// <reference path="BuffSkillLogic.ts"/>
/// <reference path="ClearStatusSkillLogic.ts"/>
/// <reference path="CounterDebuffSkillLogic.ts"/>
/// <reference path="CounterDispellSkillLogic.ts"/>
/// <reference path="CounterDrainSkillLogic.ts"/>
/// <reference path="DebuffAfflictionSkillLogic.ts"/>
/// <reference path="DebuffSkillLogic.ts"/>
/// <reference path="DrainSkillLogic.ts"/>
/// <reference path="EvadeSkillLogic.ts"/>
/// <reference path="HealSkillLogic.ts"/>
/// <reference path="MultiBuffSkillLogic.ts"/>
/// <reference path="MultiDebuffSkillLogic.ts"/>
/// <reference path="OnHitBuffSkillLogic.ts"/>
/// <reference path="OnHitDebuffSkillLogic.ts"/>
/// <reference path="ProtectCounterSkillLogic.ts"/>
/// <reference path="ProtectCounterDebuffSkillLogic.ts"/>
/// <reference path="ProtectReflectSkillLogic.ts"/>
/// <reference path="RandomSkillLogic.ts"/>
/// <reference path="ReviveSkillLogic.ts"/>
/// <reference path="SurviveSkillLogic.ts"/>
/// <reference path="TurnOrderChangeSkillLogic.ts"/>
/// <reference path="passive/AfflictionPassiveSkillLogic.ts"/>
/// <reference path="passive/AfflictionProbabilityBuffPassiveSkillLogic.ts"/>
/// <reference path="passive/DamagePassiveSkillLogic.ts"/>
/// <reference path="passive/DefensePassiveSkillLogic.ts"/>
/// <reference path="passive/ExtraTurnPassiveSkillLogic.ts"/>

class SkillLogicFactory {
    static getSkillLogic(skillFunc: number): SkillLogic {
        switch (skillFunc) {
            case ENUM.SkillFunc.BUFF:
                return new BuffSkillLogic();
            case ENUM.SkillFunc.MULTI_BUFF:
                return new MultiBuffSkillLogic();
            case ENUM.SkillFunc.DEBUFF:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF:
                return new DebuffSkillLogic();
            case ENUM.SkillFunc.MULTI_DEBUFF:
                return new MultiDebuffSkillLogic();
            case ENUM.SkillFunc.DEBUFF_AFFLICTION:
                return new DebuffAfflictionSkillLogic();
            case ENUM.SkillFunc.ONHIT_BUFF:
                return new OnHitBuffSkillLogic();
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
            case ENUM.SkillFunc.ABSORB_ATTACK:
            case ENUM.SkillFunc.ABSORB_MAGIC:
                return new AttackSkillLogic();
            case ENUM.SkillFunc.PROTECT:
                return new ProtectSkillLogic();
            case ENUM.SkillFunc.EVADE:
                return new EvadeSkillLogic();
            case ENUM.SkillFunc.PROTECT_COUNTER:
                return new ProtectCounterSkillLogic();
            case ENUM.SkillFunc.PROTECT_COUNTER_DEBUFF:
                return new ProtectCounterDebuffSkillLogic();
            case ENUM.SkillFunc.PROTECT_REFLECT:
                return new ProtectReflectSkillLogic();
            case ENUM.SkillFunc.COUNTER:
            case ENUM.SkillFunc.COUNTER_INDIRECT:
                return new CounterSkillLogic();
            case ENUM.SkillFunc.COUNTER_DISPELL:
                return new CounterDispellSkillLogic();
            case ENUM.SkillFunc.COUNTER_DEBUFF:
            case ENUM.SkillFunc.COUNTER_DEBUFF_INDIRECT:
                return new CounterDebuffSkillLogic();
            case ENUM.SkillFunc.COUNTER_DRAIN:
            case ENUM.SkillFunc.COUNTER_DRAIN_INDIRECT:
                return new CounterDrainSkillLogic();
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
            case ENUM.SkillFunc.ABSORB:
                return new AbsorbSkillLogic();
            case ENUM.SkillFunc.DAMAGE_PASSIVE:
                return new DamagePassiveSkillLogic();
            case ENUM.SkillFunc.DEFENSE_PASSIVE:
                return new DefensePassiveSkillLogic();
            case ENUM.SkillFunc.AFFLICTION_PROB_BUFF_PASSIVE:
                return new AfflictionProbabilityBuffPassiveSkillLogic();
            case ENUM.SkillFunc.AFFLICTION_PASSIVE:
                return new AfflictionPassiveSkillLogic();
            case ENUM.SkillFunc.EXTRA_TURN_PASSIVE:
                return new ExtraTurnPassiveSkillLogic();
            default:
                throw new Error("Invalid skillFunc or not implemented");
        }
    }
}
