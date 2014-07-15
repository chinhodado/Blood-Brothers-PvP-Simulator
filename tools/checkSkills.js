function checkSkill() {
    console.log("Checking skill database...");

    // Make a hashtable from the source data
    //
    // The source (converted from the Excel sheet) should be an array of objects like this:
    // { "ID": 2, "Name": "Strength of Blades", "Description": "Raise ATK ", "skillType": 1, "skillFunc": 1, 
    // "skillCalcType": 0, "skillFuncArg1": 0.5, "skillFuncArg2": 1, "skillFuncArg3": 0, "skillFuncArg4": 0, 
    // "skillFuncArg5": 0, "skillRange": 3, "baseProbability": 13, "maxProbability": 70 },
    //
    // Name that array "source"

    var src = {}
    for (var i = 0; i < source.length; i++) {
        src[source[i].ID] = {
            name: source[i].Name,
            desc: source[i].Description,
            type: source[i].skillType,
            func: source[i].skillFunc,
            calc: source[i].skillCalcType,
            arg1: source[i].skillFuncArg1,
            arg2: source[i].skillFuncArg2,
            arg3: source[i].skillFuncArg3,
            arg4: source[i].skillFuncArg4,
            arg5: source[i].skillFuncArg5,
            range: source[i].skillRange,
            prob: source[i].maxProbability
        }
    }

    for (var key in SkillDatabase) {
        if (SkillDatabase.hasOwnProperty(key)) {

            if (!src[key]) {
                console.log("Not found: " + key + " - " + SkillDatabase[key].name);
            }
            else {
                var dbS = SkillDatabase[key];
                var sheetS = src[key];

                if (dbS.name != sheetS.name || dbS.type != sheetS.type ||
                    dbS.func != sheetS.func || dbS.calc != sheetS.calc ||
                    dbS.range != sheetS.range || dbS.prob != sheetS.prob ||

                    (dbS.arg1 && sheetS.arg1 && dbS.arg1 !== sheetS.arg1) ||
                    (!dbS.arg1 && sheetS.arg1) || (dbS.arg1 && !sheetS.arg1) ||

                    (dbS.arg2 && sheetS.arg2 && dbS.arg2 !== sheetS.arg2) ||
                    (!dbS.arg2 && sheetS.arg2) || (dbS.arg2 && !sheetS.arg2) ||

                    (dbS.arg3 && sheetS.arg3 && dbS.arg3 !== sheetS.arg3) ||
                    (!dbS.arg3 && sheetS.arg3) || (dbS.arg3 && !sheetS.arg3) ||

                    (dbS.arg4 && sheetS.arg4 && dbS.arg4 !== sheetS.arg4) ||
                    (!dbS.arg4 && sheetS.arg4) || (dbS.arg4 && !sheetS.arg4) ||

                    (dbS.arg5 && sheetS.arg5 && dbS.arg5 !== sheetS.arg5) ||
                    (!dbS.arg5 && sheetS.arg5) || (dbS.arg5 && !sheetS.arg5)
                ) {
                    console.log("Conflict: " + dbS.name);
                }
            }
        }
    }
}

checkSkill();