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

    var NAMESPACE, T, finder, handler, defaultLayoutTemplates, Dictionary;
    NAMESPACE = '.dictionary';


    finder =
        '<div class="textbox-group">\n' +
        '   <label class="place">{name}</label>\n {select}' +
        '</div>\n';

    var select =  '   <select class="selectpicker" data-live-search="true" tabindex="-98" title="{name}"></select>\n';


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
            el.frame = {};
            el.frame.result = {};
            var keys = el.attr('data-dictionary-keys');
            el.frame.keys = [];
            
            if (keys === undefined)
                el.frame.keys = null;
            else
                $(keys.split(',')).each(function (i, item) {
                    el.frame.keys.push(item);
                })           

            el.frame.result.subtext = el.attr('data-dictionary-result-subtext');
            el.frame.result.text = el.attr('data-dictionary-result-text');

            var filter = el.attr('data-dictionary-filter');
            if (filter != undefined) el.frame.filter = JSON.parse(filter);
            else el.frame.filter = null;

            self._chekDictionary();
        },
        _chekDictionary: function () {
            var self = this, el = self.el, t;
            name = el.attr('data-dictionary');
            $.ajax({
                url: 'http://supersh.ru:1003/Home/GetDictionary/' + name,
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
                        url: 'http://supersh.ru:1003/Home/GetDictElement',
                        data: function (args) {
                            var params = {
                                Id: self.Dictionary.Name,
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

    $(document).ready(function () {
        $('[data-dictionary]').dictionary();
    })
}));