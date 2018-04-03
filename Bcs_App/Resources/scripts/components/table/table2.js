(function (factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) { // jshint ignore:line
        // AMD. Register as an anonymous module.
        define(['jquery'], factory); // jshint ignore:line
    } else { // noinspection JSUnresolvedVariable
        if (typeof module === 'object' && module.exports) { // jshint ignore:line
            // Node/CommonJS
            // noinspection JSUnresolvedVariable
            module.exports = factory(require('jquery')); // jshint ignore:line
        } else {
            // Browser globals
            factory(window.jQuery);
        }
    }
}(function ($) {
    "use strict";

    var NAMESPACE, headerT, theads, footerT, filterelement, dataT, filter_block, css_loader, tr, td, th, col,
        handler, defaultLayoutTemplates, T, footerTFilterButton;
    NAMESPACE = '.table';


    headerT =
        '<div class="header-table-div">\n' +
        '   <table class="table table-bordered header-table" style="border: none;">\n' +
        '       <colgroup>\n' +
        '           {colgroups}\n' +
        '       </colgroup>\n' +
        '       <thead>\n' +
        '           {theads}\n' +
        '       </thead>\n' +
        '   </table>\n' +
        '</div>\n';

    theads =
        '<tr>\n' +
        '   {theads_name}\n'
        '</tr>\n';

    footerT =
        '<div class="footer-table-div">\n' +
        '    <div class="input-group" style="float: right;">\n' +
        '        {filterbtn}' +
        '        <div class="subscribe" vertical-scroll>\n' +
        '           <div class="filter">\n' +
        '           </div>\n' +
        '        </div>\n' +
        '        <div class="addon" style="padding-left: 20px;">\n' +
        '           <div id="footer-table-info" class="input-group-addon dropup material-spoosh-btn">\n' +
        '            Записей: <span class="dropdown-toggle" data-table-item="ncount" data-toggle="dropdown">{now_count}</span> / <span data-table-item="count">{count}</span>\n' +
        '           </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n';

    footerTFilterButton =
        '        <div class="btn btn-material btn-sm material-spoosh-btn" style="margin-right: 10px;" data-action="filter"><i class="fa fa-filter"></i></div>\n';

    filterelement =
        '               <div class="filter-element">\n' +
        '                   <div class="btn btn-material btn-sm material-spoosh-btn" data-action="edit">{text}: {value} </div>\n' +
        '                   <span class="btn btn-material btn-subaction-left btn-subaction" data-action="trash"><i class="fa fa-trash-o"></i></span>' +
        '               </div>\n';

    dataT =
        '<div class="data-table clickable">\n' +
        '    <table id={id} class="table table-bordered table-hover" style="background:white">\n' +
        '        <colgroup>\n' +
        '           {colgroups}\n' +
        '        </colgroup>\n' +
        '        <tbody>\n' +
        '        </tbody>\n' +
        '    </table>\n' +
        '</div>\n';

    filter_block =
        '<div data-table-item="filterBlock" class="filter-block hide">\n' +
        '    <div class="filter-inputs-block">\n' +
        '    <div class="scrolling-content" style="padding-right: 10px; padding-left: 10px;height: 100%">\n' +
        '        <div class="block-element small-container" style="height: 100%">\n' +
        '        <div class="block header-container footer-container">\n' +
        '            <h5 class="head-text">Настройка фильтрации</h4>\n' +
        '            <div data-table-item="filterElementList" class="scrolling-content" style="overflow-y: scroll;">\n' +
        '               {filters}\n' +
        '            </div>\n' +
        '            <div class="footer-text">\n' +
        '                <div class="btn material-success-btn material-spoosh-btn btn-sm" style="margin-right: 10px;margin: auto;" data-action="append">Добавить фильтр <i class="fa fa-plus"></i></div>\n' +
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
        '                    <div class="btn material-submit-btn material-spoosh-btn btn-sm" style="margin-right: 10px;" data-action="trashall">Очистить <i class="fa fa-trash"></i></div>\n' +
        '                    <div class="btn material-success-btn material-spoosh-btn btn-sm" style="margin-right: 10px;" data-action="activate">Применить фильтр <i class="fa fa-close"></i></div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        </div>\n' +
        '    </div>\n';
        '    </div>\n' +
        '</div>\n';

    css_loader =
        '<div data-table-item="loader" class="filter-block">\n' +
        '	<div class="middle-content"><div class="vertical">\n' +
        '		<div class="cssload-loader"><div class="cssload-inner cssload-one"></div><div class="cssload-inner cssload-two"></div><div class="cssload-inner cssload-three"></div></div></div>\n' +
        '	</div>\n' +
        '</div>\n';

    tr = '<tr>{tds}</tr>';
    td = '<td{visible}>{data}</td>';
    th = '<th{visible} data-table-column="{code}">{name}</th>';
    col = '<col style="width: {width}">';

    var filterTypeList = {};
    filterTypeList.text = filterTypeList[0] =
        '       <select init="selectpicker" class="selectpicker" {dls}>\n' +
        '           <option data-content="Совпадает" value="0"></option>\n' +
        '           <option data-content="Содержит" value="1"></option>\n' +
        '           <option data-content="Начинается с" value="2"></option>\n' +
        '           <option data-content="Заканчивается на" value="3"></option>\n' +
        '       </select>\n';
    filterTypeList.date = filterTypeList[1] =
        '       <select init="selectpicker" class="selectpicker" {dls}>\n' +
        '           <option data-content="Больше" value="0"></option>\n' +
        '           <option data-content="Меньше" value="1"></option>\n' +
        '           <option data-content="Равно" value="2"></option>\n' +
        '       </select>\n';
    filterTypeList.number = filterTypeList[2] =
        '       <select init="selectpicker" class="selectpicker" {dls}>\n' +
        '           <option data-content="Больше" value="0"></option>\n' +
        '           <option data-content="Меньше" value="1"></option>\n' +
        '           <option data-content="Равно" value="2"></option>\n' +
        '       </select>\n';
    filterTypeList.list = filterTypeList[3] =
        '       <select init="selectpicker" class="selectpicker" {dls}>\n' +
        '           <option data-content="Равно" value="2"></option>\n' +
        '       </select>\n';

    var ParamsFilter =
        '<div data-table-item="filterElement" class="textbox-group element-list" style="display: table;">\n' +
        '<div class="main-element">\n' +
        '   <div class="col-sm-4">\n' +
        '    <div class="textbox-element" init="filterchange" data-filter-type="parametr">\n' +
        '       <select init="selectpicker" class="selectpicker" {dls}>\n' +
        '           {options}\n' +
        '       </select>\n' +
        '    </div>\n' +
        '   </div>\n' +
        '   <div class="col-sm-4">\n' +
        '    <div class="textbox-element" data-filter-type="type">\n' +
        '       {select}\n' +
        '    </div>\n' +
        '   </div>\n' +
        '   <div class="col-sm-4">\n' +
        '    <div class="textbox-element" data-filter-type="value">\n' +
        '       {input}\n' +
        '    </div>\n' +
        '   </div>\n' +
        '</div>\n' +
        '<div class="element">\n' +
        '   <div init="filterremove" class="btn material-submit-btn material-spoosh-btn btn-lt" data-action="remove"><i class="fa fa-trash"></i></div>\n' +
        '</div>\n' +
        '</div>\n';

    var option = '           <option data-content="{value}" value="{key}"></option>\n';


    handler = function ($el, event, callback, skipNS) {
        var ev = skipNS ? event : event.split(' ').join(NAMESPACE + ' ') + NAMESPACE;
        $el.off(ev).on(ev, callback);
    };

    defaultLayoutTemplates = {
        main: headerT,
        elemets: T
    };

    T = function (element, options) {
        var self = this;
        self.$element = $(element);
        self._init(options);
    }

    T.prototype = {
        constructor: T,
        _init: function (options, e) {
            var self = this, $el = self.$element, t;
            $el.loading = false;
            $el.options = {};
            $el.colgroups = '';
            $el.construct = '';
            $el.dataloader = { load: false, params: '', block: false };
            $el.filtering = false;
            $el.columns = {};
            $el.filter = {};
            self.count = 0;
            $el.options = options;
            self._appendLoader();
            $el.construct = $el.attr('data-table-construct');
            self._loadStruct();
            
        },
        _loadStruct: function () {
            var self = this, $el = self.$element, t;
            if ($el.construct != '') {
                $.ajax({
                    url: $el.construct,
                    dataType: "json",
                    success: function (data, textStatus) {
                        self._createStruct(data);
                    },
                    error: function () {
                        console.log('error');
                    }
                });
            }
            else {
                
            }
        },
        _createFilterParameterList: function () {
            var self = this, $el = self.$element, t;
            var options = '';
            var first = null;
            for (var item in $el.filter.List)
            {
                options += option
                .replace(new RegExp('{value}', 'g'), $el.filter.List[item].Name)
                .replace(new RegExp('{key}', 'g'), item);
                if (first == null) first = $el.filter.List[item];
            }
            var input = '';
            switch (first.Type)
            {
                case 0:
                    input = '<input class="text-box single-line" placeholder="Значение" type="text" value="">';
                    break;
                case 1:
                    input = '<input class="text-box single-line datepicker" placeholder="Значение" type="text" value="" data-provider="datepicker" data-date-format="dd.mm.yyyy">';
                    break;
                case 2:
                    input = '<input class="text-box single-line" placeholder="Значение" type="number" value="">';
                    break;
                case 3:
                    input = '<select init="selectpicker" class="selectpicker" {dls}>\n';
                    for (var item in first.Variables) {
                        input += option
                            .replace(new RegExp('{value}', 'g'), first.Variables[item])
                            .replace(new RegExp('{key}', 'g'), item);
                    }
                    input += '</select>\n';        
                    break;
            }

            $el.filter.parameterList = ParamsFilter
                .replace(new RegExp('{options}', 'g'), options)
                .replace(new RegExp('{select}', 'g'), filterTypeList[first.Type])
                .replace(new RegExp('{input}', 'g'), input);
        },
        _createStruct: function (data) {
            var self = this, $el = self.$element, t;
            $el.columns = data.Columns;
            $el.dataloader.url = data.DataConstruct;
            $el.filtering = data.Filtering;
            $el.filter.List = data.Filters;
            //$el.filter.parameterList = '';

            self._createColgroups();
            self._appendHead();
            self._appendData();
            self._appendFoot();
            if ($el.filtering) self._appendFilterBlock();
            self._loadData();
        },
        _appendFilterBlock: function () {
            var self = this, $el = self.$element, t;
            self._createFilterParameterList();
            $el.append(filter_block.replace(new RegExp('{filters}', 'g'), ''));
            $el.filter.Block = $el.find('[data-table-item="filterBlock"]');
            $el.filter.Block.subscribeList = $el.footer.find('.subscribe .filter');
            
            $el.filterbtn.click(function () {
                $el.find('[data-table-item="filterBlock"]').removeClass('hide');
            })
            $el.filter.Block.elements = [];
            //self._initSelectPickers();
            $el.filter.Block.find('[data-action="append"]').click(function () {
                self.appendFilterElement();
                //self._appendEventFilterElement();
            })
            $el.filter.Block.find('[data-action="close"]').click(function () {
                $el.filter.Block.addClass('hide');
            });

            $el.filter.Block.find('[data-action="trashall"]').click(function () {
                $el.filter.Block.find('[data-table-item="filterElementList"]').html('');
            });

            $el.filter.Block.find('[data-action="activate"]').click(function () {
                $el.filter.Block.addClass('hide');
                self._dataClear();
                self._loadData();
                //filterelement
            });

            //$el.filter.Block.find('[data-table-item="filterElement"] [data-filter-type="type"]').html();            
        },
        _appendEventFilterElement2: function () {
            var self = this, $el = self.$element, t;
            $el.filter.Block.find('[init="filterchange"][data-filter-type="parametr"] select').change(function () {
                console.log($(this).val());
            })
            $el.filter.Block.find('[init="filterremove"][data-action="remove"]').click(function () {
                $(this).parent().parent().remove();
            });
            $el.filter.Block.find('[init="filterremove"][data-action="remove"]').removeAttr('init');
            $el.filter.Block.find('[init="filterchange"][data-filter-type="parametr"] .selectpicker').on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
                var selected = $(e.currentTarget).val();
                var parent = $(this).parent().parent().parent().parent();

                var input = '';
                switch ($el.filter.List[selected].Type) {
                    case 0:
                        input = '<input class="text-box single-line" placeholder="Значение" type="text" value="">';
                        //input = '<input class="text-box single-line" placeholder="Значение" type="text" value="" data-dictionary="profession" data-dictionary-keys="name" data-dictionary-result-subtext="name" data-dictionary-result-text="id">';
                        break;
                    case 1:
                        input = '<input class="text-box single-line datepicker" placeholder="Значение" type="text" value="" data-provider="datepicker" data-date-format="dd.mm.yyyy">';
                        break;
                    case 2:
                        input = '<input class="text-box single-line" placeholder="Значение" type="number" value="">';
                        break;
                    case 3:
                        input = '<select init="selectpicker" class="selectpicker" {dls}>\n';
                        for (var item in $el.filter.List[selected].Variables) {
                            input += option
                                .replace(new RegExp('{value}', 'g'), $el.filter.List[selected].Variables[item])
                                .replace(new RegExp('{key}', 'g'), item);
                        }
                        input += '</select>\n';
                        break;
                }
                parent.find('[data-filter-type="value"]').html(input);
                parent.find('[data-filter-type="type"]').html(filterTypeList[$el.filter.List[selected].Type]);
                parent.find('[data-filter-type="value"] input').keyup(function () {
                    console.log($(this).val());
                })
                parent.find('[data-filter-type="value"] select').change(function () {
                    console.log($(this).val());
                })
                parent.find('[data-filter-type="type"] input').keyup(function () {
                    console.log($(this).val());
                })
                parent.find('[data-filter-type="type"] select').change(function () {
                    console.log($(this).val());
                })
                
                parent.find('[data-filter-type="type"] .selectpicker').selectpicker();
                parent.find('[data-filter-type="value"] .selectpicker').selectpicker();
                parent.find('[data-filter-type="value"] [data-dictionary]').dictionary();
                parent.find('[data-filter-type="value"] .selectpicker').selectpicker();
            });

            $el.filter.Block.find('[init="filterchange"][data-filter-type="parametr"]').removeAttr('init');
        },
        _appendEventFilterElement: function (object) {
            var self = this, $el = self.$element, t;


            object.view.find('[data-action="trash"]').click(function () {
                object.base.remove();
                object.view.remove();
                $el.filter.Block.elements.splice(object.base.attr('index'), 1);
                self._dataClear();
                self._loadData();
            });
            object.view.find('[data-action="edit"]').click(function () {
                console.log('Редактировать фильтр');
            });
            object.base.find('[data-action="remove"]').click(function () {
                object.base.remove();
                object.view.remove();
                $el.filter.Block.elements.splice(object.base.attr('index'), 1);
            });
            object.base.find('[data-filter-type="parametr"] .selectpicker').on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
                var selected = $(e.currentTarget).val();
                var parent = object.base;
                var input = '';
                switch ($el.filter.List[selected].Type) {
                    case 0:
                        input = '<input class="text-box single-line" placeholder="Значение" type="text" value="">';
                        //input = '<input class="text-box single-line" placeholder="Значение" type="text" value="" data-dictionary="profession" data-dictionary-keys="name" data-dictionary-result-subtext="name" data-dictionary-result-text="id">';
                        break;
                    case 1:
                        input = '<input class="text-box single-line datepicker" placeholder="Значение" type="text" value="" data-provider="datepicker" data-date-format="dd.mm.yyyy">';
                        break;
                    case 2:
                        input = '<input class="text-box single-line" placeholder="Значение" type="number" value="">';
                        break;
                    case 3:
                        input = '<select init="selectpicker" class="selectpicker" {dls}>\n';
                        for (var item in $el.filter.List[selected].Variables) {
                            input += option
                                .replace(new RegExp('{value}', 'g'), $el.filter.List[selected].Variables[item])
                                .replace(new RegExp('{key}', 'g'), item);
                        }
                        input += '</select>\n';
                        break;
                }
                parent.find('[data-filter-type="value"]').html(input);
                parent.find('[data-filter-type="type"]').html(filterTypeList[$el.filter.List[selected].Type]);
                parent.find('[data-filter-type="value"] input').keyup(function () {
                    self._updateFilterObject(object);
                })
                parent.find('[data-filter-type="value"] select').change(function () {
                    self._updateFilterObject(object);
                })
                parent.find('[data-filter-type="type"] select').change(function () {
                    self._updateFilterObject(object);
                })
                self._updateFilterObject(object);
                parent.find('[data-filter-type="type"] .selectpicker').selectpicker();
                parent.find('[data-filter-type="value"] .selectpicker').selectpicker();
                parent.find('[data-filter-type="value"] [data-dictionary]').dictionary();
                parent.find('[data-filter-type="value"] .selectpicker').selectpicker();
            });


            object.base.find('[data-filter-type="value"] input').keyup(function () {
                self._updateFilterObject(object);
            })
            object.base.find('[data-filter-type="value"] select').change(function () {
                self._updateFilterObject(object);
            })
            object.base.find('[data-filter-type="type"] select').change(function () {
                self._updateFilterObject(object);
            })
        },
        _updateFilterObject: function (object) {
            var self = this, $el = self.$element, t;
            var name = $el.filter.List[object.base.find('[data-filter-type="parametr"] select').val()].Name;
            var param = object.base.find('[data-filter-type="type"] select').val();
            var value = '';
            switch ($el.filter.List[object.base.find('[data-filter-type="parametr"] select').val()].Type)
            {
                case 0:
                    param = $(filterTypeList.text).find('[value="' + param + '"]').attr('data-content');
                    value = object.base.find('[data-filter-type="value"] input').val();
                    break;
                case 1:
                    param = $(filterTypeList.date).find('[value="' + param + '"]').attr('data-content');
                    value = object.base.find('[data-filter-type="value"] input').val();
                    break;
                case 2:
                    param = $(filterTypeList.number).find('[value="' + param + '"]').attr('data-content');
                    value = object.base.find('[data-filter-type="value"] input').val();
                    break;
                case 3:
                    param = $(filterTypeList.list).find('[value="' + param + '"]').attr('data-content');
                    value = object.base.find('[data-filter-type="value"] select').val();
                    break;                
            }
            if (value === undefined) value = '';
            object.view.find('[data-action="edit"]').text(name + ' ' + param + ' "' + value + '"');
        },
        appendFilterElement: function () {
            var self = this, $el = self.$element, t;
            $el.filter.Block.find('[data-table-item="filterElementList"]').append($el.filter.parameterList);
            var elem = $el.filter.Block.find('[data-table-item="filterElement"]').last();            
            $el.filter.Block.subscribeList.append(filterelement);
            var activeelem = $el.filter.Block.subscribeList.find('.filter-element').last();
            var object = { 'view': activeelem, 'base': elem };            
            $el.filter.Block.elements.push(object);
            object.base.attr('index', $el.filter.Block.elements.indexOf(object));
            console.log(object);
            self._appendEventFilterElement(object);
            self._initSelectPickers();
            self._updateFilterObject(object);
        },
        _initSelectPickers: function () {
            var self = this, $el = self.$element, t;
            $el.filter.Block.find('[init="selectpicker"]').selectpicker();
            $el.filter.Block.find('[init="selectpicker"]').removeAttr('init');
        },
        _appendLoader: function () {
            var self = this, $el = self.$element, t;
            $el.loading = true;
            $el.append(css_loader);
            $el.loader = $el.find('[data-table-item="loader"]');
        },
        _removeLoader: function () {
            var self = this, $el = self.$element, t;
            $el.loading = false;
            $el.loader.remove();
        },
        _createColgroups: function () {
            var self = this, $el = self.$element, t;
            var cols = '';
            $($el.columns).each(function (i, item) {
                if (item.Visible) cols += col.replace(new RegExp('{width}', 'g'), item.Width);
            })
            $el.colgroups = cols;
        },
        _appendHead: function () {
            var self = this, $el = self.$element, t;
            var theads_name = '';
            $($el.columns).each(function (i, item) {
                var visible = ' class="hide"';
                if (item.Visible) visible = '';
                theads_name += th.replace(new RegExp('{code}', 'g'), item.Code).replace(new RegExp('{visible}', 'g'), visible).replace(new RegExp('{name}', 'g'), item.Name);
            })
            $el.append(headerT
            .replace(new RegExp('{theads}', 'g'), theads.replace(new RegExp('{theads_name}', 'g'), theads_name))
            .replace(new RegExp('{colgroups}', 'g'), $el.colgroups));
            $el.header = $el.find('.header-table-div');
        },
        _appendFoot: function () {
            var self = this, $el = self.$element, t;
            var filtbtn = '';
            if ($el.filtering) filtbtn = footerTFilterButton;
            $el.append(footerT
            .replace(new RegExp('{now_count}', 'g'), 0)
            .replace(new RegExp('{count}', 'g'), 0)
            .replace(new RegExp('{filterbtn}', 'g'), filtbtn));
            $el.find('[vertical-scroll]').mousewheel(function (e, delta) { this.scrollLeft -= (delta * 40); e.preventDefault(); });

            $el.footer = $el.find('.footer-table-div');
            //$el.filter.Block.subscribeList = $el.footer.find('.subscribe .filter');
            $el.ncount = $el.find('.footer-table-div [data-table-item="ncount"]');
            $el.count = $el.find('.footer-table-div [data-table-item="count"]');
            $el.filterbtn = $el.find('.footer-table-div [data-action="filter"]');
        },
        _appendData: function () {
            var self = this, $el = self.$element, t;
            $el.append(dataT
            .replace(new RegExp('{colgroups}', 'g'), $el.colgroups));
            $el.datablock = $el.find('.data-table');

            $el.datablock.bind('touchmove', function (e) {
                if (this.scrollTop + this.offsetHeight == this.scrollHeight && !$el.dataloader.block)
                    self._loadData();
            })

            $el.datablock.bind('mousewheel', function (e) {
                if (e.originalEvent.wheelDelta / 120 > 0) {
                }
                else {
                    if (this.scrollTop + this.offsetHeight == this.scrollHeight && !$el.dataloader.block)
                        self._loadData();
                }
            });
        },
        _changeCountInElement: function () {
            return T;
        },
        _renderElement: function () {
            return T;
        },
        _loadData: function () {
            var self = this, $el = self.$element, t;
            self._dataPostParams();
            if ($el.dataloader.url != null && !$el.dataloader.load) {
                $el.dataloader.load = true;
                if (!$el.loading) self._appendLoader();
                $.ajax({
                    url: $el.dataloader.url + $el.dataloader.params,
                    dataType: "json",
                    data: $el.dataloader.post_params,
                    success: function (data, textStatus) {
                        self._dataAppend(data);
                        $el.dataloader.load = false;
                        if ($el.loading) self._removeLoader();
                    },
                    error: function () {
                        $el.dataloader.load = false;
                        if ($el.loading) self._removeLoader();
                    }
                });
            }
        },
        _dataPostParams: function () {
            var self = this, $el = self.$element, t;
            $el.dataloader.post_params = {};
            $el.dataloader.post_params.filters = [];
            $el.filter.Block.find('[data-table-item="filterElement"]').each(function (i, item) {
                var filtElem = {};
                filtElem.parametr = $(item).find('[data-filter-type="parametr"]').find('select').val();
                switch ($el.filter.List[filtElem.parametr].Type) {
                    case 0:
                        filtElem.value = $(item).find('[data-filter-type="value"]').find('input').val();
                        break;
                    case 1:
                        filtElem.value = $(item).find('[data-filter-type="value"]').find('input').val();
                        break;
                    case 2:
                        filtElem.value = $(item).find('[data-filter-type="value"]').find('input').val();
                        break;
                    case 3:
                        filtElem.value = $(item).find('[data-filter-type="value"]').find('select').val();
                        break;
                }                
                filtElem.type = $(item).find('[data-filter-type="type"]').find('select').val();
                $el.dataloader.post_params.filters.push(filtElem);
            })
        },
        _dataClear: function () {
            var self = this, $el = self.$element, t;
            $el.datablock.find('tbody').find('tr').remove();
            $el.ncount.text(0);
            $el.count.text(0);
            $el.dataloader.params = '';
            $el.dataloader.block = false;
        },
        _convertdata: function (value, type) {
            switch (type)
            {
                case 0:
                    return value;
                    break;
                case 1:
                    value = value.substr(6);
                    value = value.substr(0, value.length - 2);
                    var date = new Date(parseInt(value));
                    return date.toLocaleString('ru').split(',')[0];
                    break;
                case 2:
                    return value;
                    break;
                case 3:
                    return value;
                    break;
            }
        },
        _dataAppend: function (data) {
            var self = this, $el = self.$element, t;
            if (data.Rows.length < 20) $el.dataloader.block = true;
                        
            $(data.Rows).each(function (i, item) {
                var tds = '';
                $($el.columns).each(function (i, column) {
                    var value = item.Value[column.Code];
                    if (value == undefined) value = '';
                    if (!column.Visible) {                        
                        tds += td.replace(new RegExp('{visible}', 'g'), ' class="hide"').replace(new RegExp('{data}', 'g'), self._convertdata(value, column.Type));
                    }
                    else {
                        if (column.Icon != null) {
                            tds += td.replace(new RegExp('{visible}', 'g'), '').replace(new RegExp('{data}', 'g'),
                                '<img src="' + column.Icon.Url + '/' + self._convertdata(value, column.Type) + '.png' + '" >');
                        } else tds += td.replace(new RegExp('{visible}', 'g'), '').replace(new RegExp('{data}', 'g'), self._convertdata(value, column.Type));
                    }
                })

                //for (var key in item.Value) {
                //    if ($el.header.find('thead th[data-table-column="' + key + '"]').hasClass('hide')) tds += td.replace(new RegExp('{visible}', 'g'), ' class="hide"').replace(new RegExp('{data}', 'g'), item.Value[key]);
                //    else tds += td.replace(new RegExp('{visible}', 'g'), '').replace(new RegExp('{data}', 'g'), item.Value[key]);
                //}
                //if ($el.dataloader.url.indexOf('?') == -1)
                //    $el.dataloader.params = '?PK=' + item.Value[$el.header.find('thead th:first').attr('data-table-column')];
                //else
                //    $el.dataloader.params = '&PK=' + item.Value[$el.header.find('thead th:first').attr('data-table-column')];
                $el.datablock.find('tbody').append(tr.replace('{tds}', tds));
                $el.ncount.text($el.datablock.find('tbody tr').length - $el.datablock.find('tbody tr.hide').length);
                $el.count.text($el.datablock.find('tbody tr').length);
            });
            
            if ($el.dataloader.url.indexOf('?') == -1)
                $el.dataloader.params = '?count=' + $el.datablock.find('tbody tr').length;
            else
                $el.dataloader.params = '&count=' + $el.datablock.find('tbody tr').length;
        },
        addElement: function () {
            return T;
        },
        destroy: function () {
            var self = this, $cont = self.$container;
            $cont.find('.file-drop-zone').off();
            self.$element.insertBefore($cont).off(NAMESPACE).removeData();
            $cont.off().remove();
            return self.$element;
        }
    }

    $.fn.t = function (option) {
        this.each(function () {
            var self = $(this), data = self.data('T');
            data = new T(this, option);
            self.data('T', data);
            return this;
        });
    };

    $.fn.t.Constructor = T;

    $(document).ready(function () {
        $('[data-table]').t();
    })
}));