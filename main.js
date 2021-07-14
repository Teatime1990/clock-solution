function clockStructure() {
    //create the whole clock with scales
    var base = $("#clock");
    for (let i = 0; i < 60; i++) {
        let scale = document.createElement("span");
        if (i % 5 == 0) {
            scale.className = "hScale";
            let num = i / 5 == 0 ? 12 : i / 5;
            //hour scale
            scale.innerHTML = "<em>" + num + "</em>";
            scale.children[0].style.transform = "rotate(" + i * (-6) + "deg)";
        } else {
            scale.className = "mScale";
        }
        scale.style.transform = "rotate(" + i * 6 + "deg)";
        base.append(scale);
    }
}

function angleDiff(firstInput, secondInput) {
    let hand1 = firstInput % 360;
    let hand2 = secondInput % 360;
    let diff = Math.abs(hand1 - hand2);
    return Math.min(diff, 360 - diff);
}

function clock() {
    var hHand = $('.hour');
    var mHand = $('.minute');
    var sHand = $('.second');
    
    var hTimer = 0;
    var mTimer = 0;
    var sTimer = 0;

    var timer = setInterval(function () {
        sTimer++;
        if (sTimer >= 60) {
            mTimer++;
            sTimer = 0;
        }
        if (mTimer >= 60) {
            hTimer++;
            mTimer = 0;
        }
        if (hTimer == 12) {
            //final
            clearInterval(timer);
            $('.status').empty();
            $('.result').text('Game over. The three hands are never equidistant!');
        }

    let hDegree = (hTimer * 3600 + mTimer * 60 + sTimer) / (3600 * 12) * 360;
    let mDegree = (mTimer * 60 + sTimer) / 3600 * 360;
    let sDegree = 360 / 60 * sTimer;

    hHand.css("transform", "rotate(" + hDegree + "deg)");
    mHand.css("transform", "rotate(" + mDegree + "deg)");
    sHand.css("transform", "rotate(" + sDegree + "deg)");

    let hmDiff = angleDiff(hDegree, mDegree);
    let hsDiff = angleDiff(hDegree, sDegree);
    let smDiff = angleDiff(sDegree, mDegree);

    //dynamic update degrees
    $('.hour-min').html('Current degree between hour hand and minute hand is <b>' + hmDiff + ' °</b>');
    $('.hour-sec').html('Current degree between hour hand and second hand is <b>' + hsDiff + ' °</b>');
    $('.sec-min').html('Current degree between second hand and minute hand is <b>' + smDiff + ' °</b>');

        if (hmDiff === hsDiff && hmDiff === smDiff && smDiff === hsDiff && hTimer != 12) { //check
        $('.result').text('The three hands are equidistant!!');
        clearInterval(timer);
        return;
    } 

    }, 4); //minimum of HTML 5 is 4 ms
}

function init() {
    clockStructure();
    $('.clockStart').on('click', function() {
        $('.status').text('Game Started (Calculation will be finished in about 2.88 minutes): ');
        $('.clockStart').prop('disabled', true);
        clock();
    })
}

$(window).on('load', function() {
    init();
});