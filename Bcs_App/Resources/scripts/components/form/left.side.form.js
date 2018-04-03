function complexSumm(item) {
    var str = $(item).attr('data-complex');
    var list = str.split(';');
    for (var i = 0; i < list.length; i++) {
        var elems = list[i].split(',');
        var result = "";
        for (var j = 0; j < elems.length; j++) {
            if ($('[name="' + elems[j] + '"]').val() != "") result += " " + $('[name="' + elems[j] + '"]').val();
        }
        result = result.trim();
        if (result != "") {
            $(item).text(result);
            return;
        }
        $(item).text(result);
    }
}

$(document).ready(function () {
    $.each($('[data-complex]'), function (i, item) {
        var str = $(item).attr('data-complex');
        var list = str.split(';');
        for (var i = 0; i < list.length; i++) {
            var elems = list[i].split(',');
            for (var j = 0; j < elems.length; j++) {
                $('[name="' + elems[j] + '"]').change(function () {
                    complexSumm(item);
                })
            }
        }
        complexSumm(item);
    })
})