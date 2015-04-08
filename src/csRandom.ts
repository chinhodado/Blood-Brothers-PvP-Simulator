/**
 * A naive, partial port of C#'s Random class
 */
class CsRandom {
    // Private Constants
    static MBIG: number = 2147483647;
    static MSEED: number = 161803398;
    static MZ: number = 0;

    // Member Variables
    inext: number;
    inextp: number;
    seedArray: number[] = []; //new Array<number>[56];

    // may want to add a time-based-seed constructor
    constructor(seed: number) {
        var ii: number;
        var mj: number, mk: number;

        //Initialize our Seed array.
        //This algorithm comes from Numerical Recipes in C (2nd Ed.)
        var subtraction: number = (seed ===-2147483648) ? 2147483647 : Math.abs(seed);
        mj = CsRandom.MSEED - subtraction;
        this.seedArray[55] = mj;
        mk = 1;
        for (var i = 1; i < 55; i++) {  //Apparently the range [1..55] is special (Knuth) and so we're wasting the 0'th position.
            ii = (21 * i) % 55;
            this.seedArray[ii] = mk;
            mk = mj - mk;
            if (mk < 0) mk += CsRandom.MBIG;
            mj = this.seedArray[ii];
        }
        for (var k = 1; k < 5; k++) {
            for (i = 1; i < 56; i++) {
                this.seedArray[i] -= this.seedArray[1 + (i + 30) % 55];
                if (this.seedArray[i] < 0) this.seedArray[i] += CsRandom.MBIG;
            }
        }
        this.inext = 0;
        this.inextp = 21;
        seed = 1;
    }

    /*====================================Sample====================================
    **Action: Return a new random number [0..1) and reSeed the Seed array.
    **Returns: A double [0..1)
    **Arguments: None
    **Exceptions: None
    ==============================================================================*/
    private sample(): number {
        //Including this division at the end gives us significantly improved
        //random number distribution.
        return (this.internalSample() * (1.0 / CsRandom.MBIG));
    }

    private internalSample(): number {
        var retVal: number;
        var locINext: number = this.inext;
        var locINextp: number = this.inextp;

        if (++locINext >= 56) locINext = 1;
        if (++locINextp >= 56) locINextp = 1;

        retVal = this.seedArray[locINext] - this.seedArray[locINextp];

        if (retVal === CsRandom.MBIG) retVal--;
        if (retVal < 0) retVal += CsRandom.MBIG;

        this.seedArray[locINext] = retVal;

        this.inext = locINext;
        this.inextp = locINextp;

        return retVal;
    }

    /*=====================================Next=====================================
    **Returns: An int [0..Int32.MaxValue)
    **Arguments: None
    **Exceptions: None.
    ==============================================================================*/
    next(): number {
        return this.internalSample();
    }

    private getSampleForLargeRange(): number {
        // The distribution of double value returned by Sample
        // is not distributed well enough for a large range.
        // If we use Sample for a range [Int32.MinValue..Int32.MaxValue)
        // We will end up getting even numbers only.

        var result: number = this.internalSample();
        // Note we can't use addition here. The distribution will be bad if we do that.
        var negative: boolean = (this.internalSample() % 2 === 0) ? true : false;  // decide the sign based on second sample
        if (negative) {
            result = -result;
        }
        var d: number = result;
        d += (2147483647 - 1); // get a number in range [0 .. 2 * Int32MaxValue - 1)
        d /= 2 * 2147483647 - 1; //note: cast to (uint)?
        return d;
    }

    /*=====================================Next=====================================
    **Returns: An int [minvalue..maxvalue)
    **Arguments: minValue -- the least legal value for the Random number.
    **           maxValue -- One greater than the greatest legal return value.
    **Exceptions: None.
    ==============================================================================*/
    nextInRange(minValue: number, maxValue: number): number {
        if (minValue > maxValue) {
            throw new Error("max less than min");
        }

        // a lot of castings in here...
        var range: number = maxValue - minValue;
        if (range <= 2147483647) {
            return (Math.floor(this.sample() * range) + minValue);
        }
        else {
            return Math.floor(Math.floor(this.getSampleForLargeRange() * range) + minValue);
        }
    }

    /*=====================================Next=====================================
    **Returns: An int [0..maxValue)
    **Arguments: maxValue -- One more than the greatest legal return value.
    **Exceptions: None.
    ==============================================================================*/
    nextLessThan(maxValue: number) {
        if (maxValue < 0) {
            throw new Error("Max value less than 0");
        }
        return Math.floor(this.sample() * maxValue);
    }

    /*=====================================Next=====================================
    **Returns: A double [0..1)
    **Arguments: None
    **Exceptions: None
    ==============================================================================*/
    nextDouble(): number {
        return this.sample();
    }
}
