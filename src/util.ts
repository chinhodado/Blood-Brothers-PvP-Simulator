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
function shuffle(array : any[]) {
    var currentIndex = array.length
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
function getRandomElement(myArray: any) {
    return myArray[Math.floor(Math.random() * myArray.length)];
}

/**
 * Remove an element with the supplied index from an array.
 */
function removeElementAtIndex(array: any, index: number): void {
    array.splice(index, 1);
}

/**
 * Get a random property of an object
 */
function pickRandomProperty(obj: {}): string {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}

/**
 * Change a shortened link used in fam database to a thumbnail link
 * @param link The shortened link
 * @param newWidth The width of the new image
 * @return The link to the new scaled image
 */
function getScaledWikiaImageLink (link: string, newWidth: number): string {
    // first un-shorten the link
    link = link.replace("$1", ".wikia.nocookie.net");
    link = link.replace("$2", "bloodbrothersgame/images/thumb");

    var lastSlash: number = link.lastIndexOf("/");
    var originalName: string = link.substring(lastSlash + 1); // the original image name

    // the new scaled image new
    var newScaledName: string = newWidth + "px-" + originalName;

    // complete new link
    var newScaledLink: string = "http://" + link + "/" + newScaledName;
    return newScaledLink;
}

function getSerializableObjectArray(array: any[]) {
    var toReturn = [];
    for (var i = 0; i < array.length; i++) {
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
    var isChromium = window.chrome,
        vendorName = window.navigator.vendor;
    if(isChromium !== null && vendorName === "Google Inc.") {
        // is Google chrome
        return true;
    } else { 
        // not Google chrome
        return false;
    }
}