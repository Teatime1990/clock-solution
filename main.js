function angleDiff(firstInput, secondInput) {
    let hand1 = firstInput % 360;
    let hand2 = secondInput % 360;
    let diff = Math.abs(hand1 - hand2);
    return Math.min(diff, 360 - diff);
}

function clock() { 
    var hTimer = 0;
    var mTimer = 0;
    var sTimer = 0;

    for (var i = 0; i < 43200; i++) {
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
            console.log("The three hands are never equidistant!!");
            $('.result').text('The three hands are never equidistant!');
        }

        let hDegree = (hTimer * 3600 + mTimer * 60 + sTimer) / (3600 * 12) * 360;
        let mDegree = (mTimer * 60 + sTimer) / 3600 * 360;
        let sDegree = 360 / 60 * sTimer;

        let hmDiff = angleDiff(hDegree, mDegree);
        let hsDiff = angleDiff(hDegree, sDegree);
        let smDiff = angleDiff(sDegree, mDegree);

        if (hmDiff === hsDiff && hmDiff === smDiff && smDiff === hsDiff && hTimer != 12) { //check
            console.log("The three hands are equidistant!!");
            $('.result').text('The three hands are equidistant!');
            return;
        }
    } 
}

function init() {
    clock();
}

$(window).on('load', function () {
    init();
});
