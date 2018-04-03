$(document).ready(function () {
    var statuselements = [];
    $($('#columnsHeader tr').last().children()[$($('.statusbars').first()).parent().children().index($('.statusbars').first()) - 1]).find('option').each(function (i, item) {
        if (i > 0) statuselements.push({ name: $(item).attr('data-content'), value: $(item).val() });
    });

    $('.statusbars').each(function (i, item) {
        var indx = findStatus($(item).text());
        $(item).append('<div class="statusbar"></div>');
        for (var i = 0; i < statuselements.length; i++) {
            var classList = "";
            if (i < indx + 1) classList = "active";
            $(item).find('.statusbar').append('<a href="#" class="' + classList + '" style="width:' + 100 / statuselements.length + '%;"></a>');
        }
    });

    function findStatus(name) {
        for (var i = 0; i < statuselements.length; i++) {
            if (name == statuselements[i].name)
                return i;
        }
    }
})