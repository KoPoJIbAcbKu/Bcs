$(document).ready(function () {
    $('#columnsHeader thead tr td').each(function (x, main) {
        $(main).find('input').keyup(function () {
            $('#organizations tr').removeClass('hide');
            $('#columnsHeader thead tr td').each(function (i, item) {
                if ($(item).find('input').length != 0) {
                    var str = $(item).find('input').val().toLowerCase();
                    if (str != '') {
                        $('#organizations tr').each(function (j, tr) {
                            if (~$($(tr).find('td')[i + 1]).text().toLowerCase().indexOf(str)) {

                            }
                            else {
                                $(tr).addClass('hide');
                            }
                        })
                    }
                }
            })
            $('#footer-table-info .dropdown-toggle').text($('#organizations tr:visible').length);
            return false;
        })
        $(main).find('.remove').click(function () {
            $(this).parent().find('input').val('');
            $('#organizations tr').removeClass('hide');
            $('#columnsHeader thead tr td').each(function (i, item) {
                if ($(item).find('input').length != 0) {
                    var str = $(item).find('input').val().toLowerCase();
                    if (str != '') {
                        $('#organizations tr').each(function (j, tr) {
                            if (~$($(tr).find('td')[i + 1]).text().toLowerCase().indexOf(str)) {

                            }
                            else {
                                $(tr).addClass('hide');
                            }
                        })
                    }
                }
            })
            $('#footer-table-info .dropdown-toggle').text($('#organizations tr:visible').length);
            return false;
        })        
    })
})