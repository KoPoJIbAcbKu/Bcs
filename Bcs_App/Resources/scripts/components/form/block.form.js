$(document).ready(function () {
    $('#block-list a').click(function () {
        //var name = $(this).attr('href');
        //$('#block-forms').find('.block-element.item.active').removeClass('active');
        //$(name).addClass('active');        
        $('#block-forms').carousel($('#block-list a').index($(this)));
        $('#block-list a.active').removeClass('active');
        $(this).addClass('active');
        return false;
    })

    $('.datepicker').datepicker();
})