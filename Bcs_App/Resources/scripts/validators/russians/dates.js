function dateValidate() {
    var birth = $('[name="BirthDate"]');
    var DocFrom = $('[name="Document.Issued"]');

    

    if (!LessThen(birth, new Date())) {
        birth.closest(".textbox-group").addClass('error');
        birth.parent().find('.error-block').text('Дата рождения не может быть больше текущей даты.');
        ///Дата рождения не может быть больше текущей даты.
    }
    if (!BigThanOrEqual(birth, (new Date()).setYear(new Date().getYear() - 100))) {
        birth.closest(".textbox-group").addClass('error');
        birth.parent().find('.error-block').text('Нельзя быть таким старым.');
        ///Дата рождения не может быть менее чем текущая - 100 лет
        ///Нельзя быть таким старым
    }

    if (!LessThenOrEqual(DocFrom, new Date())) {
        DocFrom.closest(".textbox-group").addClass('error');
        DocFrom.parent().find('.error-block').text('Документ не может быть выдан в будущем.');
        ///Документ не может быть выдан в будущем
    }
    if (!BigThanOrEqual(DocFrom, birth)) {
        DocFrom.closest(".textbox-group").addClass('error');
        DocFrom.parent().find('.error-block').text('Документ не может быть выдан до рождения.');
        ///Документ не может быть выдан до рождения
    }
}
