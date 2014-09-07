/**
 * This file contains functions used for displaying the familiar detail dialog
 */

function showCardDetailDialog(cardInfo) {
    currentCard = cardInfo;
    currentSkillIndex = 0;
    var elem = document.getElementById("card-detail-figure");
    var src = cardInfo.image;

    if (elem.src == src) {
        $("#card-detail-loading-figure").css("visibility", "hidden");
        $("#card-detail-figure").css("visibility", "visible");
    } else {
        elem.onload = function () {
            $("#card-detail-loading-figure").css("visibility", "hidden");
            $("#card-detail-figure").css("visibility", "visible");
        }
    }

    $("#card-detail-loading-figure").css("visibility", "visible");
    $("#card-detail-figure").css("visibility", "hidden");
    showDialog("card-detail-dialog");
    elem.src = cardInfo.image;

    // $("#card-detail-figure-rarity").removeClass();
    // $("#card-detail-figure-rarity").addClass(getRarityClassName(cardInfo.rarity, cardInfo.evolution, cardInfo.maxEvolution));
    $(".card-detail-name").text(unescape(cardInfo.name));
    updateSkillDisplay();
    $(".card-detail-default-action-name").text(unescape(cardInfo.standardAction.name));
    $(".card-detail-default-action-description").text(unescape(cardInfo.standardAction.comment));
    $(".card-detail-max-hp").text(cardInfo.hp);
    $(".card-detail-max-atk").text(cardInfo.atk);
    $(".card-detail-max-def").text(cardInfo.def);
    $(".card-detail-max-wis").text(cardInfo.wis);
    $(".card-detail-max-agi").text(cardInfo.agi);
    // $(".card-detail-growth-type").text(getGrowthName(cardInfo.growthType));
    // $(".card-detail-value").text(cardInfo.price);
    $(".card-detail-current-hp").text(cardInfo.hp + "/" + cardInfo.hp);
}

function showCardDetailDialogById(id) {
    var cardMan = CardManager.getInstance();
    var card = cardMan.getCardById(id);
    
    showCardDetailDialog(cardMan.getCardInfoForDialog(card));
}

function hideCardDetailDialog() {
    hideDialog("card-detail-dialog");
    $(".arrow-left").css("visibility", "hidden");
    $(".arrow-right").css("visibility", "hidden");
    $("#card-detail-loading-figure").css("visibility", "hidden");
    $("#card-detail-figure").css("visibility", "hidden");
}

function updateSkillDisplay() {
    $(".card-detail-skill-name").text(unescape(currentCard.skills[currentSkillIndex].name));
    $(".card-detail-skill-description").text(unescape(currentCard.skills[currentSkillIndex].comment));
    $(".arrow-left").css("visibility", "hidden");
    $(".arrow-right").css("visibility", "hidden");
    if (currentCard.skills[currentSkillIndex + 1] && currentCard.skills[currentSkillIndex + 1].name) {
        $(".arrow-right").css("visibility", "visible");
    }
    if (currentCard.skills[currentSkillIndex - 1] && currentCard.skills[currentSkillIndex - 1].name) {
        $(".arrow-left").css("visibility", "visible");
    }
    if (currentCard.skills[currentSkillIndex] && currentCard.skills[currentSkillIndex].name) {
        $(".card-detail-skill-proc").text(currentCard.skills[currentSkillIndex].maxProbability + "%");
    }
}

function showDialog(dialogId) {
    var target = document.getElementById(dialogId);
    target.style.visibility = 'visible';
    var bg = document.getElementById('dialogBack');
    bg.style.width = window.innerWidth + 'px';
    bg.style.visibility = 'visible';
    document.getElementById(dialogId).style.visibility = 'visible';
    return target;
}

function hideDialog(dialogId) {
    var bg = document.getElementById('dialogBack');
    bg.style.visibility = 'hidden';
    var target = document.getElementById(dialogId);
    target.style.visibility = 'hidden';
}

function getRarityClassName(rarity, evolution, maxEvolution) {
    var char_rarity;
    switch (rarity) {
        case 4:
            return "card-figure-rarity-ep-" + evolution + "-" + maxEvolution;
        case 5:
            return "card-figure-rarity-l-" + evolution + "-" + maxEvolution;
        default:
            return "";
    }
}

function getGrowthName(growthType) {
    switch (growthType) {
        case 2:
            return "Fast";
        case 1:
            return "Normal";
        case 3:
            return "Late Bloomer";
        default:
            return "???"
    }
}

function prevSkill() {
    currentSkillIndex--;
    updateSkillDisplay();
}

function nextSkill() {
    currentSkillIndex++;
    updateSkillDisplay();
}
