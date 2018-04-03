$(document).ready(function () {
    $(".mobile-left").on("swiperight", function () {
        if (!$(this).hasClass('active')) $(this).addClass('active');
    });
    $(".mobile-left").on("swipeleft", function () {
        if ($(this).hasClass('active')) $(this).removeClass('active');
    });
})