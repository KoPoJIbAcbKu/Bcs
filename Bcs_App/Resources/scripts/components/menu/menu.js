$(window).load(function () {
    $('.data-table.clickable').find('tr').click(function (event) {
        if (event.target.localName == "td") {
            if (event.ctrlKey == true) {
                if ($(this).hasClass('success')) {
                    $(this).removeClass('success');
                }
                else {
                    $(this).addClass('success');
                }
            } else if (event.shiftKey == true) {
                var first = $('.data-table').find('.success').first();
                $('.data-table').find('.success').removeClass('success');
                if (first.length != 0) {
                    if ($(this).index() < first.index()) {
                        while ($(this).index() != first.index()) {
                            first.addClass('success');
                            first = first.prev();
                        }
                    }
                    else {
                        while ($(this).index() != first.index()) {
                            first.addClass('success');
                            first = first.next();
                        }
                    }
                }
                $(this).addClass('success');
            } else {
                if ($(this).hasClass('success')) $('.data-table').find('.success').removeClass('success');
                else {
                    $('.data-table').find('.success').removeClass('success');
                    $(this).addClass('success');
                }
            }
            ///Функция подсветки и активности методов
            if ($('.data-table').find('.success').length > 1) {
                $('.header-nav .multi').removeClass('hide');
                $('.header-nav .single').addClass('hide');
            }
            else if ($('.data-table').find('.success').length == 1) {
                $('.header-nav .multi').removeClass('hide');
                $('.header-nav .single').removeClass('hide');
            }
            else {
                $('.header-nav .multi').addClass('hide');
                $('.header-nav .single').addClass('hide');
            }
        }
    })

    $('.data-table.clickable').find('tr').mousedown(function (event) {
        if (event.shiftKey == true) clearSelection();
    })

    $('.single[data-index-param]').click(function () {
        var indx = $(this).attr('data-index-param');
        document.location = $(this).attr('href') + "/" + $($('.data-table').find('.success:first td')[indx]).text();
        return false;
    });
    
    $('.multi').click(function () {
        $('#peopleForm').append('<div id="hideInputs" class="hide"></div>');
        getListID();
        $('#hideInputs').append('<input name="method" value="' + $(this).attr('data-function') + '" />');
        submitForm();
    });
});

function getListID() {
    var elems = $('.data-table').find('.success');
    var listId = [];
    elems.each(function (i, item) {
        $('#hideInputs').append('<input name="keys[' + i + ']" value="' + $(item).children().first().text() + '" />');
    })
    return listId;
}

function clearSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else { // старый IE
        document.selection.empty();
    }
}