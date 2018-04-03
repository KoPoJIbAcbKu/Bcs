var structForm = {};
$(document).ready(function () {
    $('.body-content > .main-block').append('<div id="pict-modal" class="modal-main"><div class="modal-table-block"><div class="modal-element scrolling-content" style="max-width:90%; max-height: 90%; padding:20px;"><img></div></div></div>');
    $('.vertical-scroll ul').append(
                        '<li>\n' +
                        '    <a href="#" class="btn btn-sm btn-material" disabled="disabled">\n' +
                        '        Ничего не найдено\n' +
                        '    </a>\n' +
                        '</li>\n');
    $('.left-menu').loader();

    $('#pict-modal').click(function () {
        $('#pict-modal').smodal('close');
    })
    $.ajax({
        url: 'http://print.supersh.ru:1003/App/GetStructForm/26b67b03-5bde-46e4-c032-b2d7e42325a2',
        type: "POST",
        dataType: 'json',
        success: function (result) {
            structForm = result;
            var params = {};
            params.Filter = {};
            params.Take = 10;
            params.Skip = 0;
            
            $(structForm).each(function (i, item) {
                $('.left-menu ul').append(
                    '<li class="list-group-item"><div class="textbox-group">\n' +
                    '    <label>' + item.Name + '</label>\n' +
                    '<div class="input-group input-group-sm" style="">\n' +
                    '    <input type="text" class="form-control" name="' + item.Id.replace(/-/g, '') + '" type="text" value="">\n' +
                    '    <span class="input-group-btn remove">\n' +
                    '        <span class="btn btn-material"><span class="glyphicon glyphicon-remove"></span></span>\n' +
                    '    </span>\n' +
                    '</div>\n' +
                    //'    <div class="textbox-element">\n' +
                    //'        <div class="control-element">\n' +
                    //'            <input class="form-control text-box single-line" name="' + item.Id.replace(/-/g, '') + '" type="text" value="">\n' +
                    //'        </div>\n' +
                    //'    </div>\n' +
                    '</div>\n' +
                    '</li>\n'
                    );
            })

            $('.left-menu ul .remove').click(function () {
                if ($(this).parent().find('input').val() != '') {
                    $(this).parent().find('input').val('');
                    $(this).parent().find('input').trigger('change');
                }
            })
            $('.left-menu').loader();

            $('.left-menu ul input').change(function () {
                params.Filter.List = {};
                $('.left-menu ul input').each(function (i, item) {
                    if ($(item).val() != '') {
                        params.Filter.List[$(item).attr('name')] = $(item).val();
                    }
                })
                get(params);
            })

            get(params);
        },
        error: function (err) {
            console.log(err.statusText);
        }
    });
})

function get(params) {
    $('.menu-data-block').loader();
    $.ajax({
        url: 'http://print.supersh.ru:1003/App/Find',
        type: "POST",
        dataType: 'json',
        data: params,
        success: function (result) {

            $('.menu-data-block').loader();
            $('#right').html('');
            $('.vertical-scroll ul').html('');
            $(result).each(function (i, item) {
                var str = '';
                var name = 'Элемент ' + i;
                var css = '';
                //if (item['0e3b14d2d8df4ec24b575b8e7a1e30cb'] == 'Юридическое лицо') {
                //    name = item['14d18ab2154e2377efb57dcd8e67a2e2'].substr(0, 100);
                //    css = '';
                //}
                //else {
                //    name = item['4c302b0a6dc55fc3129bab1244ad54c3'].substr(0, 100);
                //    css = 'material-submit-btn';
                //}
                

                if (i == 0) {
                    str = '<div class="item scrolling-content active" data-slider-item="' + i + '"> <div class="parent-block">\n' +
                              '    <div class="block block-element" id="' + item.id + '">\n' +
                              '        <h5 class="head-text">' + name + '</h5>\n' +
                              '        <div class="textbox-group"><div class="textbox-element"><div class="control-element"><span class="btn btn-sm btn-material">' + item.date + ' ' + item.time + '</span></div></div></div>\n' + 
                              '    </div>\n' +
                              '</div></div>\n';

                    $('.vertical-scroll ul').append(
                        '<li>\n' +
                        '    <a href="#" class="btn btn-sm ' + css + ' btn-material" data-slider-active="sites#' + i + '">\n' +
                        '        ' + name + '\n' +
                        '    </a>\n' +
                        '</li>\n');
                } else {
                    str = '<div class="item scrolling-content" data-slider-item="' + i + '"> <div class="parent-block">\n' +
                              '    <div class="block block-element" id="' + item.id + '">\n' +
                              '        <h5 class="head-text">' + name + '</h5>\n' +
                              '        <div class="textbox-group"><div class="textbox-element"><div class="control-element"><span class="btn btn-sm btn-material">' + item.date + ' ' + item.time + '</span></div></div></div>\n' +
                              '    </div>\n' +
                              '</div></div>\n';

                    $('.vertical-scroll ul').append(
                        '<li>\n' +
                        '    <a href="#" class="btn btn-sm btn-material ' + css + ' material-spoosh-btn" data-slider-active="sites#' + i + '">\n' +
                        '        ' + name + '\n' +
                        '    </a>\n' +
                        '</li>\n');
                }

                $('#right').append(str);
                $('.menu-toggle').parent().parent()

                $(structForm).each(function (i, obj) {
                    var subobj = obj.Id.replace(/-/g, '');
                    if (item[subobj]) {
                        if (item[subobj].indexOf('{') != -1) {
                            var object = JSON.parse(item[subobj]);
                            if (object.type == 'fias') {
                                $('[id="' + item.id + '"]').append(
                                    '<div class="textbox-group">\n' +
                                    '    <label>' + obj.Name + '</label>\n' +
                                    '    <div class="textbox-element">\n' +
                                    '        <div class="control-element">\n' +
                                    '            <div class="span-text">' + object.fulladdress + '</div>\n' +
                                    '        </div>\n' +
                                    '    </div>\n' +
                                    '</div>\n'
                                    );
                            } else {
                                for (var elem1 in object) {
                                    $('[id="' + item.id + '"]').append(
                                        '<div class="textbox-group">\n' +
                                        '    <label>' + obj.Description.split('|')[elem1] + '</label>\n' +
                                        '    <div class="textbox-element">\n' +
                                        '        <div class="control-element" style="border-radius: 2px;">\n' +
                                        '            <div class="wrap" vertical-scroll>\n' +
                                        '               <ul></ul>\n' +
                                        '            </div>\n' +
                                        '        </div>\n' +
                                        '    </div>\n' +
                                        '</div>\n'
                                        );

                                    for (var elem2 in object[elem1]) {
                                        $('[id="' + item.id + '"] .textbox-group').last().find('ul').append(
                                            '<li>\n' +
                                            '    <a href="#">\n' +
                                            '        <img src="http://print.supersh.ru:1003' + object[elem1][elem2] + '">\n' +
                                            '    </a>\n' +
                                            '</li>\n'
                                            );
                                    }
                                }

                                $('[id="' + item.id + '"] .textbox-group').find('[vertical-scroll]').mousewheel(function (e, delta) { this.scrollLeft -= (delta * 40); e.preventDefault(); });

                                $('[id="' + item.id + '"] .textbox-group a').click(function () {
                                    $('#pict-modal img').attr('src', $(this).find('img').attr('src'));
                                    $('#pict-modal').smodal('open');
                                })
                            }
                        } else {
                            $('[id="' + item.id + '"]').append(
                                '<div class="textbox-group">\n' +
                                '    <label>' + obj.Name + '</label>\n' +
                                '    <div class="textbox-element">\n' +
                                '        <div class="control-element">\n' +
                                '            <div class="span-text">' + item[subobj] + '</div>\n' +
                                '        </div>\n' +
                                '    </div>\n' +
                                '</div>\n'
                                );
                        }
                    }
                })
            })

            if (result.length == 0) {
                $('.vertical-scroll ul').append(
                        '<li>\n' +
                        '    <a href="#" class="btn btn-sm btn-material" disabled="disabled">\n' +
                        '        Ничего не найдено\n' +
                        '    </a>\n' +
                        '</li>\n');
            }

            $('[data-slider-active]').click(function () {
                var sliderinfo = $(this).attr('data-slider-active');
                var slidername = sliderinfo.split('#')[0];
                var slideritem = sliderinfo.split('#')[1];
                $('[data-slider-name="' + slidername + '"] .item').removeClass('active');
                $('[data-slider-name="' + slidername + '"] [data-slider-item="' + slideritem + '"]').addClass('active');


                $(this).parent().parent().find('a').addClass('material-spoosh-btn');
                $(this).removeClass('material-spoosh-btn')
            })
        },
        error: function (err) {
            console.log(err.statusText);
        }
    });
}