$(document).ready(function () {
    $('[vertical-scroll]').mousewheel(function (e, delta)
    {
        this.scrollLeft -= (delta * 40); e.preventDefault();
    });
});