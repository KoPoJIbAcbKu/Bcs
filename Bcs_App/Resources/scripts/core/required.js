$(document).ready(function () {
    $('[data-submit="form"]').submit(function (e) {
        $(this).find('.textbox-group.error').removeClass('error');
        $(this).find('[data-required]').each(function (i, item) {
            if ($(item).val() == undefined || $(item).val() == '' || $(item).val() == null) {
                $(item).closest(".textbox-group").addClass('error');
                $(item).parent().find('.error-block').text('Поле обязательно для заполнения.');
            }
        })
        dateValidate();
        if ($(this).find('.textbox-group.error').length != 0) {
            $(this).find('.textbox-group.error').first().closest('.scrolling-content').animate({ scrollTop: $(this).find('.textbox-group.error').first().offset().top }, 500)
            e.stopPropagation();
            return false;
        } else {
            $('[data-loader="Form"]').loader();
        }
    })
})