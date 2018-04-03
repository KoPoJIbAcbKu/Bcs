$(function () {


    $('[data-toggle="popover"]').popover();

    $('[data-add-toggle="popover"]').popover();
    /*$('[data-vision="hover"]').hover(function () {
        $(this).popover('show');
        },
        function () {
        $(this).popover('hide');
    });

    $('[data-vision="show"]').popover('show');*/

    
});

$(window).load(function () {
    $(document).on('click', '#ChatPanel .dropdown-menu', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '#ReportPanel .dropdown-menu', function (e) {
        e.stopPropagation();
    });

    $('[data-toggle="tooltip"]').tooltip();

    $('.menu-toggle').click(function () {
        $('.left-menu').toggleClass('show');
    })
});

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value + ";";
    updatedCookie += "path=/";

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}