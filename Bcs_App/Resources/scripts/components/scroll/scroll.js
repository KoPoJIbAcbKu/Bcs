$(document).ready(function () {
    $('[vertical-scroll]').mousewheel(function (e, delta) {
        this.scrollLeft -= (delta * 40); e.preventDefault();
    });

    $('[horizontal-scroll]').mousewheel(function (e, delta) {
        this.scrollTop -= (delta * 40); e.preventDefault();
    });
});

function Addvertical() {
    $('#organizationState').mousewheel(function (e, delta) {
        this.scrollLeft -= (delta * 40); e.preventDefault();
    });
}