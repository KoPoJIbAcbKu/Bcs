$(document).ready(function () {
    $('#form').submit(function () {
        var serializedForm = $(this).serialize();
        $.ajax({
            url: '@Url.Action("CommentForm")',
            type: "POST",
            data: serializedForm,
            success: function (result) {

                alert("success " + result.UserName);
            },
            error: function (result) {
                alert("Failed");
            }
        });
        
        return false;
    })
})