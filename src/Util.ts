/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitary (min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get an URL parameter
 */
function getURLParameter(name: string): string {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

/**
 * Shuffle an array. The argument array will be modified.
 */
function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length
        , temporaryValue
        , randomIndex
    ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
 * Get a random element from an array
 */
function getRandomElement<T>(myArray: T[]): T {
    return myArray[Math.floor(Math.random() * myArray.length)];
}

/**
 * Returns a maximum of 'num' unique elements (shuffles and returns first n)
 * Note: the argument array will be modified (its content will be shuffled)
 */
function getRandomUniqueElements<T>(arr: T[], num: number): T[] {
    let len = arr.length;
    while (len) {
        let a = Math.floor(Math.random() * len);
        let b = arr[--len];
        arr[len] = arr[a];
        arr[a] = b;
    }
    return arr.slice(0, num);
}

/**
 * Remove an element with the supplied index from an array.
 */
function removeElementAtIndex(array: any[], index: number): void {
    array.splice(index, 1);
}

/**
 * Get a random property of an object
 */
function pickRandomProperty(obj: {}): string {
    let keys = Object.keys(obj);
    return keys[keys.length * Math.random() << 0];
}

/**
 * Change a shortened link used in fam database to a thumbnail link
 * @param link     The shortened link
 * @param newWidth The width of the new image
 * @return The link to the new scaled image
 */
function getScaledFamiliarWikiaImageLink (link: string, fullName: string, newWidth: number): string {
    // first un-shorten the link
    // http://img2.wikia.nocookie.net/bloodbrothersgame/images/thumb/d/dd/
    let firstPart = `https://img${link.charAt(0)}.wikia.nocookie.net/bloodbrothersgame/images/thumb/${link.charAt(1)}/${link.substring(1)}/`;
    let urlName = fullName.replace(/,/g, "%2C").replace(/ /g, "_");
    let fileName = urlName + "_Figure.png";
    let newScaledLink = firstPart + fileName + "/" + newWidth + "px-" + fileName;

    return newScaledLink;
}

function getImageLink(link: string, fullName: string, newWidth: number) {
    // return getScaledFamiliarWikiaImageLink(link, fullName, newWidth);
    return getLocalImageLink(fullName);
}

function getLocalImageLink(fullName:string, root: string = "") {
    let urlName = fullName.replace(/, /g, "_")
                          .replace(/ /g, "_")
                          .replace(/'/g, "");
    let fileName = urlName + "_Figure.png";
    return root + "img/wikia/" + fileName;
}

function getSerializableObjectArray(array: any[]) {
    let toReturn = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] == null) {
            toReturn.push(null);
        }
        else {
            toReturn.push(array[i].getSerializableObject());
        }
    }
    return toReturn;
}

/**
 * Return true if the browser is Chrome
 */
function isChrome(): boolean {
    // please note, that IE11 now returns true for window.chrome
    var window: any = window;
    let isChromium = window.chrome,
        vendorName = window.navigator.vendor;
    if(isChromium !== null && vendorName === "Google Inc.") {
        // is Google chrome
        return true;
    } else {
        // not Google chrome
        return false;
    }
}

/**
 * Format a number with thousand separators
 */
function numberWithCommas(x: number): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}
