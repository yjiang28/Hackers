/**
 * Created by alexmadrzyk on 1/29/17.
 */

<!--=========== TITLE ===========-->
$(document).ready(function() {
    $(".title").lettering();
});

$(document).ready(function() {
    animation();
}, 1000);

function animation() {
    var title1 = new TimelineMax();
    title1.to(".button", 0, {visibility: 'hidden', opacity: 0})
    title1.staggerFromTo(".title span", 0.5,
        {ease: Back.easeOut.config(1.7), opacity: 0, bottom: -80},
        {ease: Back.easeOut.config(1.7), opacity: 1, bottom: 0}, 0.05);
    title1.to(".button", 0.2, {visibility: 'visible' ,opacity: 1})
}


<!--=========== LANGUAGE SCROLL ===========-->
(function ($) {
    function init() {
        mobiscroll.scroller('#test', {
            theme: "android-holo-light",
            // theme: "ios",
            display: "inline",
            lang: "en",
            wheels: [
                [{
                    label: 'First wheel',
                    data: ['French', 'Spanish', 'Polish', 'Chinese (Simplified)']
                }]
            ]
        });

        $('#test').css("display", "none");
    }
    init();

    $('#theme').trigger('change');
})(mobiscroll.$);