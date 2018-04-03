



$(document).ready(function () {
    var headerT =
        '<div class="header-table-div">\n' +
        '   <table class="table table-bordered header-table" style="border: none;">\n' +
        '       <colgroup>\n'+
        '           {colgroups}\n'+
        '       </colgroup>\n' +
        '       <thead>\n' +
        '           {theads}\n' +
        '       </thead>\n' +
        '   </table>\n' +
        '</div>\n';

    var theads = 
        '<tr>\n'+
        '   {theads_name}\n'
        '</tr>\n';

    var footerT = 
        '<div class="footer-table-div">\n' +
        '    <div class="input-group" style="float: right;">\n' +
        '        <div class="btn btn-material btn-sm material-spoosh-btn" style="margin-right: 10px;" data-action="filter"><i class="fa fa-filter"></i></div>\n' +
        '        <div class="subscribe" vertical-scroll>\n' +
        '           <div class="filter">\n' +
        '           </div>\n' +
        '        </div>\n' +
        '        <div class="addon" style="padding-left: 20px;">\n' +
        '           <div id="footer-table-info" class="input-group-addon dropup material-spoosh-btn">\n' +
        '            Записей: <span class="dropdown-toggle" data-toggle="dropdown">{now_count}</span> / {count}\n' +
        '           </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n';

    var filterelement =        
        '               <div class="filter-element">\n' +
        '                   <div class="btn btn-material btn-sm material-spoosh-btn">{text}: {value} </div>\n' +
        '                   <span class="btn btn-material btn-subaction-left btn-subaction material-spoosh-btn" data-action="trash"><i class="fa fa-trash-o"></i></span>' +
        '               </div>\n';

    var dataT = 
        '<div class="data-table clickable">\n' +
        '    <table id={id} class="table table-bordered table-hover" style="background:white">\n' +
        '        <colgroup>\n' +
        '           {colgroups}\n' +
        '        </colgroup>\n' +
        '        <tbody>\n' +
        '        </tbody>\n' +
        '    </table>\n' +
        '</div>\n';

    var filter_block =
        '<div class="filter-block hide">\n' +
        '    <div class="filter-inputs-block">\n' +
        '    <div class="scrolling-content" style="padding-right: 10px; padding-left: 10px;">\n' +
        '        <div class="block">\n' +
        '            <div class="col-sm-6">\n' +
        '                <div class="textbox-group">\n' +
        '                    <label for="Name">Название ошибки</label>\n' +
        '                    <div class="textbox-element">\n' +
        '                        <input class="text-box single-line" id="Name" name="Name" type="text">\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="col-sm-6">\n' +
        '                <div class="textbox-group">\n' +
        '                    <label for="Name">Название ошибки</label>\n' +
        '                    <div class="textbox-element">\n' +
        '                        <input class="text-box single-line" id="Name" name="Name" type="text">\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="col-sm-6">\n' +
        '                <div class="textbox-group">\n' +
        '                    <label for="Name">Название ошибки</label>\n' +
        '                    <div class="textbox-element">\n' +
        '                        <input class="text-box single-line" id="Name" name="Name" type="text">\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="col-sm-6">\n' +
        '                <div class="textbox-group">\n' +
        '                    <label for="Name">Название ошибки</label>\n' +
        '                    <div class="textbox-element">\n' +
        '                        <input class="text-box single-line" id="Name" name="Name" type="text">\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="footer-table-div" style=" width: 100%;">\n' +
        '            <div class="input-group" style="float: right;">\n' +
        '                <div class="btn material-btn material-spoosh-btn btn-sm" style="margin-right: 10px;" data-action="close"><i class="fa fa-close"></i></div>\n' +
        '                <div class="subscribe">\n' +
        '                    <div class="filter">\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="addon" style="padding-left: 20px;">\n' +
        '                    <div class="btn material-success-btn material-spoosh-btn btn-sm" style="margin-right: 10px;" data-action="trashall">Очистить <i class="fa fa-trash"></i></div>\n' +
        '                    <div class="btn material-submit-btn material-spoosh-btn btn-sm" style="margin-right: 10px;" data-action="activate">Применить фильтр <i class="fa fa-close"></i></div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n';
        '    </div>\n' +
        '</div>\n';

    var css_loader = 
        '<div class="filter-block">\n' +
        '	<div class="middle-content"><div class="vertical">\n' +
        '		<div class="cssload-loader"><div class="cssload-inner cssload-one"></div><div class="cssload-inner cssload-two"></div><div class="cssload-inner cssload-three"></div></div></div>\n' +
        '	</div>\n' +
        '</div>\n';

    var tr = '<tr>{tds}</tr>';
    var td = '<td{visible}>{data}</td>';
    var th = '<th{visible}>{name}</th>';
    var col = '<col style="width: {width}">';
    
    function createTable(id) {
        var theads_name = th.replace(new RegExp('{visible}', 'g'), ' class="hide"').replace(new RegExp('{name}', 'g'), 'ID');
        theads_name += th.replace(new RegExp('{visible}', 'g'), '').replace(new RegExp('{name}', 'g'), 'Код');
        theads_name += th.replace(new RegExp('{visible}', 'g'), '').replace(new RegExp('{name}', 'g'), 'Название');
        theads_name += th.replace(new RegExp('{visible}', 'g'), '').replace(new RegExp('{name}', 'g'), 'Описание');
        var cols = col.replace(new RegExp('{width}', 'g'), '33%');
        cols += col.replace(new RegExp('{width}', 'g'), '33%');
        cols += col.replace(new RegExp('{width}', 'g'), '33%');
        //var result = headerT.replace(new RegExp('{theads}', 'g'), theads.replace(new RegExp('{theads_name}', 'g'), theads_name)).replace(new RegExp('{colgroups}', 'g'), cols);
        $('[data-table="' + id + '"]').html(
            headerT
            .replace(new RegExp('{theads}', 'g'), theads.replace(new RegExp('{theads_name}', 'g'), theads_name))
            .replace(new RegExp('{colgroups}', 'g'), cols)
            +
            dataT
            .replace(new RegExp('{colgroups}', 'g'), cols)
            .replace(new RegExp('{id}', 'g'), id)
            +
            footerT
            .replace(new RegExp('{now_count}', 'g'), 0)
            .replace(new RegExp('{count}', 'g'), 10)
            +
            filter_block);

        $('[data-table="' + id + '"]' + ' [vertical-scroll]').mousewheel(function (e, delta) { this.scrollLeft -= (delta * 40); e.preventDefault(); });

        $('[data-table="' + id + '"] [data-action="close"]').click(function () {
            $(this).parent().parent().parent().parent().parent().addClass('hide');
        })

        $('[data-table="' + id + '"] [data-action="activate"]').click(function () {
            $(this).parent().parent().parent().parent().parent().parent().parent().find('.filter-block').addClass('hide');
            $(this).parent().parent().parent().parent().parent().parent().parent().append(css_loader);
            $(this).parent().parent().parent().parent().parent().parent().parent().find('.filter-block:last').click(function () { $(this).remove(); });
        })

        $('[data-action="filter"]').click(function () {
            $(this).parent().parent().parent().find('.filter-block').removeClass('hide');
            //var obj = $(this).parent().find('.filter');
            //addFilterElement(obj);
        })
    }

    function addDataTR(id) {
        var tds = getTd(' class="hide"', '1');
        tds += getTd('', 'Данные');
        tds += getTd('', 'Данные');
        tds += getTd('', 'Данные');
        $('#' + id + ' tbody').append(tr.replace(new RegExp('{tds}', 'g'), tds));
    }

    function addFilterElement(obj) {
        obj.append(filterelement);

        obj.find('[data-action="trash"]:last').click(function () {
            $(this).parent().remove();
        })
    }

    function getTd(visible, data) {
        return td.replace(new RegExp('{visible}', 'g'), visible).replace(new RegExp('{data}', 'g'), data);
    }
})