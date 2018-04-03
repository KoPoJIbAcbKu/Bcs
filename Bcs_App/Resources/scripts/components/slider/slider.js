$(document).ready(function () {
    $('[data-slider-name]').each(function (i, item) {
        $(item).find('.item').removeClass('active');
        $(item).find('.item:first').addClass('active');
    })

    $('[data-slider-active]').click(function () {
        var sliderinfo = $(this).attr('data-slider-active');
        var slidername = sliderinfo.split('#')[0];
        var slideritem = sliderinfo.split('#')[1];


        //$('[data-slider-name="' + slidername + '"] .item').removeClass('active');
        //$('[data-slider-name="' + slidername + '"] [data-slider-item="' + slideritem + '"]').addClass('active');

        var elem = $('[data-slider-name="' + slidername + '"] [data-slider-item="' + slideritem + '"]');
        $('[data-slider-name="' + slidername + '"] .item.active').animate({ opacity: "hide" }, 1000, function () {
            $(this).removeClass('active')
            elem.animate({ opacity: "show" }, 1000, function () {
                $(this).addClass('active')
            });
        });
    })
})
