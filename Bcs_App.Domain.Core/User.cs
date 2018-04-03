using System;
using System.ComponentModel.DataAnnotations;

namespace Bcs_App.Domain.Core
{
    public class User
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Необходимо ввести номер телефона")]
        [Display(Name = "Номер телефона")]
        [DataType(DataType.PhoneNumber)]
        [RegularExpression(@"^(?!\+.*\(.*\).*\-\-.*$)(?!\+.*\(.*\).*\-$)(\+[0-9]{1} \([0-9]{3}\) [0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2})$", ErrorMessage = "Некорректный формат номера телефона")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "Не указана электронная почта")]
        [Display(Name = "Адрес электронной почты")]
        [DataType(DataType.EmailAddress, ErrorMessage = "Некорректно указана почта")]
        public string Email { get; set; }

        [Display(Name = "Фамили Имя Отчество")]
        public string Fio { get; set; }

        [Required(ErrorMessage = "Выберите город из списка")]
        [Display(Name = "Город")]
        public long CityId { get; set; }
    }
}
