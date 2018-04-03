$(document).ready(function () {
    //$('.multi-element').mouseenter(function () {
    //    $(this).append('<div class="btn-group">' +
    //      '<button type="button" class="btn btn-default">Левая</button>' +
    //      '<button type="button" class="btn btn-default">Средняя</button>' +
    //      '<button type="button" class="btn btn-default">Правая</button>' +
    //    '</div>');
    //})

    //$('.multi-element').mouseleave(function () {
    //    $(this).html('Выберите действие');
    //})

    $('.multi-element .fa-file-image-o').click(function () {
        $('#dru').append('<div class="textbox-group">' +
            '<label for="ActionMessages[0].Text">Название ошибки</label>'+
            '<div class="textbox-element">'+
                '<textarea cols="20" id="ActionMessages[0].Text" name="ActionMessages[0].Text" rows="2"></textarea>'+
            '</div>'+
        '</div>');
        $('#dru').scrollTop($('#dru').prop('scrollHeight'));
        
    })
})

$(document).ready(function () {
    $('.list-group-item').click(function () {
        $(this).toggleClass('active');
    });
})