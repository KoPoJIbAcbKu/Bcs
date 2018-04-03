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

    var NAMESPACE, T, finder, handler, defaultLayoutTemplates, Dictionary, listDictionary;
    NAMESPACE = '.dictionary';
    
    finder =
        '    <div class="block dictionary-container">\n' +
        '        <div class="dictionary-head">\n' +
        '            <h5 class="head-text">{name}</h5>\n' +
        '            <div class="textbox-group">\n' +
        '                <input class="form-control" type="text" placeholder="Введите текст" value="">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="state dictionary-data">\n' +
        '            {state}\n' +
        '        </div>\n' +
        '        <div class="textbox-group list"><div class="dictionary-data-container"><ul role="listbox" aria-expanded="true"></ul></div></div>\n' +
        '    </div>';

    var clearbtn =  '<div class="clear">\n' +
	                '   <span class="glyphicon glyphicon-remove"></span>\n' +
                    '</div>\n';

    listDictionary = [];

    handler = function ($el, event, callback, skipNS) {
        var ev = skipNS ? event : event.split(' ').join(NAMESPACE + ' ') + NAMESPACE;
        $el.off(ev).on(ev, callback);
    };

    defaultLayoutTemplates = {
        main: finder,
        elemets: Dictionary
    };

    Dictionary = function (element, options) {
        var self = this;
        self.el = $(element);
        self._init(options);
    }

    Dictionary.prototype = {
        constructor: Dictionary,
        _init: function (options, e) {
            var self = this, el = self.el, t;
            self.name = el.attr('data-dictionary');
            if (el.attr('data-dictionary-keys') !== undefined) self.keys = el.attr('data-dictionary-keys').split(',');
            else self.keys = null;
            if (el.attr('data-dictionary-filter') !== undefined) self.filters = JSON.parse(el.attr('data-dictionary-filter'));
            else self.filters = null;
            self.result = {};
            if (el.attr('data-dictionary-result-subtext') !== undefined) self.el.resultSub = el.attr('data-dictionary-result-subtext');
            else self.el.resultSub = null;
            if (el.attr('data-dictionary-view-result') !== undefined) self.el.resultView = el.attr('data-dictionary-view-result');
            else self.el.resultView = null;
            
            if (el.attr('data-dictionary-result-translate') !== undefined) self.el.resultTranslate = JSON.parse(el.attr('data-dictionary-result-translate'));

            self.resultparam = el.attr('data-dictionary-result-text');
            //<div class="span-text">пр-кт Индустриальный</div>

            var element = document.createElement(el[0].nodeName);
            $(element).attr('class', el.attr('class'));
            $(element).attr('style', el.attr('style'));            
            if (el.attr('placeholder') != '') {
                $(element).attr('placeholder', 'Нажмите на поле, чтобы выбрать значение из справочника');
            } else {
                $(element).attr('placeholder', el.attr('placeholder'));
            }
            el.before(element);
            $(element).before(clearbtn);
            $(element).css('padding-right', '30px');
            el.view = $(element);
            el.clear = el.parent().find('.clear');
            el.clear.addClass('hide');
            el.addClass('hide');
            el.view.focus(function () { self._construct() });
            el.clear.click(function () {
                self.el.val('');
                self.el.view.val('');
                self.params = {};
                self.result = {};
                return false;
            });            
            if (el.val() != '') {
                self.params = {
                    Id: self.name,
                    Take: 20,
                    Skip: 0
                };

                if (self.filters) { self.params.Filter = {}; self.params.Filter.List = self.filters; }
                self.params.Keys = [];
                self.params.Keys.push(self.resultparam);
                self.params.Value = [];
                self.params.Value.push(el.val());
                self._getInitValue();
                self.params = {};
            }
        },
        _construct: function () {
            if ($.fn.dictionary.list != undefined) {
                var self = this, el = self.el.view;
                if (self.dictionary === undefined)
                    $($.fn.dictionary.list).each(function (i, item) {
                        if (item.Name === self.name) {
                            self.dictionary = item;
                        }
                    })

                if (self.dictionary !== undefined) {
                    var div = document.createElement('div');
                    $(div).attr('class', "block-element");
                    $(div).addClass('dictionary-open');
                    
                    $(div).css('display', "none");
                    $('body').append(div);

                    $(div).append(finder.replace('{name}', self.dictionary.Description));
                    self.div = $(div);
                    var top = el.offset().top;
                    var left = el.offset().left;

                    self.list = self.div.find('.list');
                    self.state = self.div.find('.state');
                    var widthEL = el.outerWidth();
                    var widthDIV = self.div.outerWidth();
                    if (left + 450 > $(window).outerWidth()) left = left;// + (widthDIV - widthEL);
                    if (top + el.outerHeight() + 4 + 300 < $(window).outerHeight()) top = top + el.outerHeight() + 4;
                    else top = top - 300;
                    self.div.offset({ 'top': top, 'left': left });

                    //if (el[0].clientWidth > 400) {
                    //} else $(div).width('400');

                    $(div).width(el[0].clientWidth);                                      

                    self.input = self.div.find('input');
                    if (self.result.element == null) {
                        self.input.val(self.result.search);
                    } else {
                        self.input.val(self.result.search);
                        //self.input.val(self._constructData(self.keys, self.result.element));
                    }
                    
                    $(div).css('display', "");
                    self.input.focus();
                    self.input.keydown(function (e) {
                        if (e.keyCode === 9) {
                            e.preventDefault();
                            e.stopPropagation();
                            $(this).val($(this).val() + String.fromCharCode(9));
                        }
                    })

                    self.input.keyup(function () {
                        self._createParams();
                        self._getData();
                    });
                    self.params = {
                        Id: self.name,
                        Take: 20,
                        Skip: 0
                    };

                    if (self.filters) { self.params.Filter = {}; self.params.Filter.List = self.filters; }
                    if (self.keys) self.params.Keys = self.keys;

                    if (self.result.element == null) {
                        self._createRequest();
                    }
                    else {
                        //self.result.element

                        self._requestSuccess(self.result.list);
                    }

                    $(document).mousedown(function (e) {
                        var container = $(".dictionary-container");
                        if (e.target != container[0] && !container.has(e.target).length) {
                            self._close();
                        }
                    })
                    $(window).resize(function () {
                        var top = el.offset().top;
                        var left = el.offset().left;
                        var widthEL = el.outerWidth();
                        var widthDIV = self.div.outerWidth();
                        if (left + 450 > $(window).outerWidth()) left = left - (widthDIV - widthEL);
                        self.div.offset({ 'top': top + el.outerHeight(), 'left': left });
                    })

                }
            }
        },
        _createParams: function () {
            var self = this, el = self.el;
            var value = self.input.val();
            self.params.Value = [];
            self.result.search = value;
            $(value.split(String.fromCharCode(9))).each(function (i, item) {
                self.params.Value.push(item);
            })
            clearTimeout(self.requestDelayTimer);
            self.requestDelayTimer = setTimeout(function () {
                if (self.request) {
                    self.request.abort();
                }
                self._createRequest();
            }, 300);
        },
        _chekDictionary: function () {
            var self = this, el = self.el, t;
            name = el.attr('data-dictionary');
            $.ajax({
                url: 'https://supersh.ru:1006/Home/GetDictionary/' + name,
                dataType: "json",
                success: function (data, textStatus) {
                    self.Dictionary = data;
                    self._load();
                },
                error: function () {
                    console.log('error');
                }
            });
        },
        _getInitValue: function () {
            var self = this, el = self.el;
            var request = $.ajax({
                url: 'https://supersh.ru:1006/Home/GetDictElement',
                type: "POST",
                data: self.params,
                dataType: "json",
                success: function (data) {
                    if (data != undefined && data != null && data.length != 0) {
                        self.result.list = $(data);
                        self.result.element = data[0];
                        el.val(self.result.element[self.resultparam]);
                        el.view.val(self._getSubView());
                        self._translate();
                    }
                },
            });
        },
        _createRequest: function () {
            var self = this, el = self.el;
            var request = $.ajax({
                url: 'https://supersh.ru:1006/Home/GetDictElement',
                type: "POST",
                data: self.params,
                dataType: "json",
                success: function (data) {
                    self._requestSuccess(data);
                },
            });
            self.request = request;
            self.list.hide();
            self.state.show();
            self.state.text('Выполняется запрос');
        },
        _getData: function () {
            var self = this, el = self.el;
            
        },
        _requestSuccess: function (data) {
            var self = this, el = self.el;
            self.list.show();
            self.state.hide();
            //console.log(data);
            self.list.find('ul').empty();
            if (data == []) {
                self.list.hide();
                self.state.show();
                self.state.text('Ничего не найдено');
            }
            else {
                self.result.list = $(data);
                $(data).each(function (i, item) {
                    item.name = item.name.trim(' ');
                    if (item.name !== '' && item.name !== null && item.name !== undefined)
                        self.list.find('ul').append('<li><a data-id="' + i + '">' + self._getViewResult(item) + '</a></li>');
                })
                self.list.find('ul').find('a').click(function () {                    
                    self.result.element = self.result.list[$(this).attr('data-id')];
                    el.val(self.result.element[self.resultparam]);
                    el.view.val(self._getSubView());
                    self._translate();
                    self._close();
                    el.trigger('change');
                })
            }
        },
        _getViewResult: function (item) {
            var self = this, el = self.el;
            var result = '';
            if (self.el.resultView) {
                result = self.el.resultView;
                for (var key in item) {
                    result = result.replace('{' + key + '}', item[key]);
                }
            }
            else result = self._constructData(self.keys, item);
            return result;
        },
        _getSubView: function () {
            var self = this, el = self.el;
            var result = '';
            if (self.el.resultSub) {
                result = self.result.element[self.el.resultSub];
            }
            else { result = self._constructData(self.keys, self.result.element); }
            return result;
        },
        _constructData: function (keys, obj) {
            var result = "";
            $(keys).each(function (i, item) {
                result += obj[item] + " ";
            })            
            result = result.trim();
            return result;
        },
        _load: function () {
            var self = this, el = self.el, t;
            if (self.Dictionary != {}) {
                //self.el.hide();
                self.el.append(select.replace('{name}', self.Dictionary.Description));
                self.el.finder = self.el.find('.selectpicker');
                self.el.finder.selectpicker({
                    liveSearch: true
                }).ajaxSelectPicker({
                    ajax: {
                        url: 'https://supersh.ru:1006/Home/GetDictElement',
                        data: function (args) {
                            var params = {
                                Id: self.name,
                                Take: 20,
                                Skip: 0
                            };
                            var value = el.finder.parent().find('.bs-searchbox').children().val();
                            params.Value = [];
                            $(value.split('#')).each(function (i, item) {
                                params.Value.push(item);
                            })
                            if (el.frame.filter) { params.Filter = {}; params.Filter.List = el.frame.filter; }
                            if (el.frame.keys) params.Keys = el.frame.keys;
                            return params;
                        }
                    },
                    locale: {
                        statusInitialized: 'Начните вводить текст для поиска!',
                        emptyTitle: 'Введите текст',
                        errorText: 'Не удалось получить результаты.',
                        searchPlaceholder: 'Поиск...',
                        statusSearching: 'Обработка запроса...'
                    },
                    preprocessData: function (data) {
                        var items = [];
                        if (data) {
                            self.el.data = data;
                            for (var j = 0; j < data.length; j++) {
                                var single = data[j];
                                items.push({
                                    'value': single.id,
                                    'text': single[el.frame.result.text] + ' - ' + single[el.frame.result.subtext],
                                    'disabled': false
                                });
                            }
                        }
                        return items;
                    },
                    preserveSelected: false
                });
            }
        },
        _close: function () {
            var self = this, el = self.el;
            self.div.remove();
            $(document).unbind('mousedown');
            $(window).unbind('resize');
        },
        getResult: function () {
            var self = this, el = self.el;
            return self.result.element;
        },
        _translate: function () {
            var self = this, el = self.el, t;
            if (self.el.resultTranslate != undefined) {
                $(self.el.resultTranslate).each(function (i, item) {
                    $('[name="' + item.name + '"]').val(self.result.element[item.value]);
                    $('[name="' + item.name + '"]').closest('.textbox-group').removeClass('error');
                });
            }
        },
        destroy: function () {
            var self = this, $cont = self.$container;

            return self.$element;
        }
    }

    $.fn.dictionary = function (option) {
        this.each(function () {
            var self = $(this), data = self.data('Dictionary');
            data = new Dictionary(this, option);
            self.data('Dictionary', data);
            return this;
        });
    };

    $.fn.dictionary.Constructor = Dictionary;
    $.fn.dictionary.list = [];
    
    $.ajax({
        url: 'https://supersh.ru:1006/Home/GetDictionary',
        dataType: "json",
        success: function (data, textStatus) {
            $.fn.dictionary.list = data;
        },
        error: function () {
            console.log('error');
        }
    });

    $(document).ready(function () {
        $('[data-dictionary]').dictionary();
    })
}));