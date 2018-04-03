$(window).load(function () {
    $("#columnsHeader").find('.datepicker').datepicker({
        autoclose: true
    });

    $("#ReportPanel").find('.datepicker').datepicker({
        autoclose: true
    });

    $(".footer-table-div").find('.datepicker').datepicker({
        autoclose: true
    });

    $('.change').change(function () {
        submitClearForm();
    })

    $('#columnsHeader .remove').click(function () {
        if ($(this).parent().find('.change').val('') != '') {
            $(this).parent().find('.change').val('');
            submitClearForm();
        }
    });

    $('#footer-table-info a').click(function () {
        var href = $('#peopleForm').attr('action');
        var listroute = href.split('/');
        var listparam = listroute[3].split('?');
        listparam[0] = $(this).html();
        href = '';

        listroute[3] = listparam[0];
        if (listparam.length > 1)
            listroute[3] += '?' + listparam[1];
        for (var i = 1; i < listroute.length; i++) {
            href += '/' + listroute[i];
        }
        $('#peopleForm').attr('action', href);
        submitClearForm();
        return false;
    });

    $('#columnsHeader .sortable').click(function () {
        switch ($(this).parent().find('input').val()) {
            case "1":
                $(this).parent().find('input').val("2");
                break;
            case "2":
                $(this).parent().find('input').val("3");
                break;
            case "3":
                $(this).parent().find('input').val("1");
                break;
            default:
                $(this).parent().find('input').val("1");
                break;
        }
        submitForm();
        return false;
    });
});

function submitForm() {
    $('.main-block').loader();
    $('#peopleForm').submit();
    $('.main-block').loader();
}

function submitClearForm() {
    $('.main-block').loader();
    $("input[name$='Page']").attr('value', 1);
    $('#peopleForm').submit();
    $('.main-block').loader();
}