function CreateFilter() {
    var filters = $('.menu-data-block form').first().serialize();
    var url = '/Filter/CreateFilter';
    url += '?Identifier=' + $('.menu-data-block form').first().attr('action');
    url += '&Name=' + 'Фильтр';
    url += '&' + filters;//.replace(new RegExp('&', 'g'), ';amp');
    $.ajax({
        url: url,
        dataType: "json",
        success: function (data, textStatus) {
            console.log(data)
        },
        error: function () {
            console.log('error');
        }
    });
}

$(document).ready(function () {
    $('[data-filter-id]').click(function () {        
        document.location = $('.menu-data-block form').first().attr('action') + '?FilterId=' + $(this).attr('data-filter-id');
    });
})