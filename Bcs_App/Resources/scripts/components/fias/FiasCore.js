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

    var NAMESPACE, tHeader, tMain, handler, defaultLayoutTemplates, Fias;
    NAMESPACE = '.fias';

    handler = function ($el, event, callback, skipNS) {
        var ev = skipNS ? event : event.split(' ').join(NAMESPACE + ' ') + NAMESPACE;
        $el.off(ev).on(ev, callback);
    };

    tMain =
        '<div class="textbox-group">\n' +
        '   <label class="place">Строка для поиска адреса</label>\n' +
        '       <select class="selectpicker fias-address-finder" data-fias="street" data-live-search="true" tabindex="-98" title="Введите текст"></select>\n' +
        '</div>\n';

    defaultLayoutTemplates = {
        main: tMain
    };

    Fias = function (element, region, area, city, urban, settlement, street, guid) {
        var self = this;
        self.$element = $(element);
        self._init(region, area, city, urban, settlement, street, guid);
    }

    Fias.prototype = {
        constructor: Fias,
        _init: function (region, area, city, urban, settlement, street, guid, e) {
            var self = this, $el = self.$element, t;
            self.el = $el;
            $el.guid = guid;
            $el.data = {};
            $el.selectData = {};
            $el.loadParams = {};
            $el.loadParams.region = region;
            $el.loadParams.area = area;
            $el.loadParams.city = city;
            $el.loadParams.urban = urban;
            $el.loadParams.settlement = settlement;
            $el.loadParams.street = street;
            $el.loadParams.guid = guid;

            $el.regionInput = $el.find('[data-fias="region_input"]');    

            $el.region = $el.find('[data-fias="region"]');            
            $el.area = $el.find('[data-fias="area"]');
            $el.city = $el.find('[data-fias="city"]');
            $el.urban = $el.find('[data-fias="urban"]');
            $el.settlement = $el.find('[data-fias="settlement"]');
            $el.street = $el.find('[data-fias="street"]');
            $el.fias = $el.find('[data-fias="fias"]');
            $el.index = $el.find('[data-fias="index"]');

            $el.house = $el.find('[data-fias="house"]');
            $el.building = $el.find('[data-fias="build"]');
            $el.housing = $el.find('[data-fias="housing"]');
            $el.flat = $el.find('[data-fias="flat"]');

            $el.close = $el.find('[data-fias="close"]');
            $el.open = $('[data-fias="open"]');
            $el.save = $('[data-fias="save"]');
            $el.lang = 'RU';
            $el.language = $('[data-fias="lang"]');
            $el.rus = $('[data-fias="lang"] span:first');
            $el.eng = $('[data-fias="lang"] span:last');
            $el.rus.click(function () {
                if ($el.lang != 'RU') {
                    $el.lang = 'RU';
                    self.changelang();
                    $el.language.find('span').removeClass('btn-material');
                    $el.rus.addClass('btn-material');
                }
            })
            $el.eng.click(function () {
                if ($el.lang != 'EN') {
                    $el.lang = 'EN';
                    self.changelang();
                    $el.language.find('span').removeClass('btn-material');
                    $el.eng.addClass('btn-material');
                }
            })

            $el.area.after('<div class="span-text"></div>');
            $el.areaspan = $el.area.parent().find('.span-text');
            $el.city.after('<div class="span-text"></div>');
            $el.cityspan = $el.city.parent().find('.span-text');
            $el.urban.after('<div class="span-text"></div>');
            $el.urbanspan = $el.urban.parent().find('.span-text');
            $el.settlement.after('<div class="span-text"></div>');
            $el.settlementspan = $el.settlement.parent().find('.span-text');
            $el.street.after('<div class="span-text"></div>');
            $el.streetspan = $el.street.parent().find('.span-text');

            $el.street.addClass('hide');
            $el.area.addClass('hide');
            $el.city.addClass('hide');
            $el.settlement.addClass('hide');
            $el.urban.addClass('hide');
            $el.save.click(function () {                
                document.getAddress = self.serializeObject();
                $('[name="region"]').val('');
                $('[name="city"]').val('');
		$('[name="street"]').val('');
                $('[name="house"]').val('');
                $('[name="flat"]').val('');
                self.saveView($el.selectData.f5);
                self.saveView($el.selectData.f4);
                self.saveView($el.selectData.f3);
                self.saveView($el.selectData.f2);
                self.saveView($el.selectData.f1);
		var house = $('#Address_AddressHouse').val();
		if ($('#Address_AddressBuilding').val() != '') house += " стр. " + $('#Address_AddressBuilding').val();
		if ($('#Address_AddressStruct').val() != '') house += " корп. " + $('#Address_AddressStruct').val();
                $('[name="house"]').val(house);
                $('[name="flat"]').val($('#Address_AddressFlat').val());
                $('[name="recieverIndex"]').val($el.index.val());
                $('#recieverAddressK').val(self.fullAddress());
                $('body').css('overflow', 'initial');
                $el.addClass('hide');
            })
            $el.fias.parent().parent().before(tMain);
            $el.stroke = $el.find('.fias-address-finder');

            $el.stroke.parent().find('.filter-option').addClass('hide');
            $el.stroke.parent().find('.filter-option').after('<span class="pull-left fias-full">Введите текст</span>');
            //$el.stroke.parent().addClass('hide');
            $el.close.click(function () {
                $('body').css('overflow', 'initial');
                $el.addClass('hide');
            })
            $el.open.click(function () {
                $('body').css('overflow', 'hidden');
                $el.removeClass('hide');
                setTimeout(function() { $('[data-id="Address_AddressRegion"]').click()}, 100);
            })

            $el.index.keyup(function (event) {
                console.log(event);
                if (event.keyCode == 13 && $(this).val().length == 6) {
                    $.ajax({
                        url: 'http://service.supersh.ru:1003/Fias/GetObjectFromIndex?text=' + $(this).val(),
                        success: function (data) {
                            if (data != null) {
                                $el.guid = data.f1.AOGUID;
                                $el.selectData = data;
                                $el.area.parent().parent().addClass('hide');
                                $el.city.parent().parent().addClass('hide');
                                $el.urban.parent().parent().addClass('hide');
                                $el.settlement.parent().parent().addClass('hide');
                                $el.street.parent().parent().addClass('hide');
                                $el.fias.val($el.guid);
                                self.openFinder();

                                $el.stroke.parent().find('ul').empty();
                                $el.stroke.empty();

                                self.fiasView($el.selectData.f1);
                                self.fiasView($el.selectData.f2);
                                self.fiasView($el.selectData.f3);
                                self.fiasView($el.selectData.f4);
                                self.fiasView($el.selectData.f5);
                                $el.regionInput.val($el.region.find('option:selected').text());

                                //$el.stroke.parent().find('.fias-full').text(self.fullAddress());
                            }
                        }
                    });
                }
            })
            
            $el.stroke
                .selectpicker({
                    liveSearch: true
                })
                .ajaxSelectPicker({
                    ajax: {
                        url: 'http://service.supersh.ru:1003/Fias/GetObjectFromFias',
                        data: function (args) {
                            var params = {
                                guid: $el.guid,
                                text: self.backtranliterate($el.stroke.parent().find('.bs-searchbox').children().val())
                            };
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
                                var addr = "";
                                if (single.f5 != null) {
                                    addr += single.f5.SHORTNAME + " " + single.f5.FORMALNAME + " ";
                                }
                                if (single.f4 != null) {
                                    addr += single.f4.SHORTNAME + " " + single.f4.FORMALNAME + " ";
                                }
                                if (single.f3 != null) {
                                    addr += single.f3.SHORTNAME + " " + single.f3.FORMALNAME + " ";
                                }
                                if (single.f2 != null) {
                                    addr += single.f2.SHORTNAME + " " + single.f2.FORMALNAME;
                                }
                                addr = self.tranliterate(addr);
                                items.push({
                                    'value': single.f1.AOGUID,
                                    'text': self.tranliterate(single.f1.SHORTNAME + " " + single.f1.FORMALNAME),
                                    'disabled': false,
                                    data: {
                                        subtext: addr
                                    }
                                });
                            }
                        }
                        return items;
                    },
                    preserveSelected: false
                });
            $el.stroke.on('hidden.bs.select', function (e) {
                if (this.value != "") {
                    for (var j = 0; j < $el.data.length; j++) {
                        if ($el.data[j].f1.AOGUID == this.value) {
                            $el.selectData = $el.data[j];
                            $el.guid = this.value;
                            break;
                        }
                    }
                    $el.area.parent().parent().addClass('hide');
                    $el.city.parent().parent().addClass('hide');
                    $el.urban.parent().parent().addClass('hide');
                    $el.settlement.parent().parent().addClass('hide');
                    $el.street.parent().parent().addClass('hide');
                    $el.fias.val($el.guid);

                    if ($el.selectData.count == 0) {
                        //$el.stroke.parent().parent().addClass('hide');
                    }
                    else self.openFinder();

                    $el.stroke.parent().find('ul').empty();
                    $el.stroke.empty();

                    if ($el.selectData.f1.INDEX != '' && $el.selectData.f1.INDEX != null) $el.index.val($el.selectData.f1.INDEX);
                    self.fiasView($el.selectData.f5);
                    self.fiasView($el.selectData.f4);
                    self.fiasView($el.selectData.f3);
                    self.fiasView($el.selectData.f2);
                    self.fiasView($el.selectData.f1);

                    $el.stroke.parent().find('.fias-full').text(self.fullAddress());
                }
            });
            $el.region.change(function (e) {
                if (this.value != "000") {
                    $el.guid = this.value;
                    $el.area.parent().parent().addClass('hide');
                    $el.city.parent().parent().addClass('hide');
                    $el.urban.parent().parent().addClass('hide');
                    $el.settlement.parent().parent().addClass('hide');
                    $el.street.parent().parent().addClass('hide');
                    $el.stroke.parent().parent().removeClass('hide');
                    $(this).parent().parent().find('input').first().val($(this.children[this.selectedIndex]).html());
                    $(this).parent().parent().parent().removeClass('alert-group');
                    self.openFinder();
                    $el.regionInput.val('');
                }
                else {
                    $el.guid = null;
                    $el.area.parent().parent().addClass('hide');
                    $el.city.parent().parent().addClass('hide');
                    $el.urban.parent().parent().addClass('hide');
                    $el.settlement.parent().parent().addClass('hide');
                    $el.street.parent().parent().addClass('hide');
                    $(this).parent().parent().find('input').first().val($(this.children[this.selectedIndex]).html());
                    $(this).parent().parent().parent().addClass('alert-group');
                    $el.regionInput.val($el.region.find('option:selected').text());
                    //$el.stroke.parent().parent().addClass('hide');
                }
            });

            $el.find('[data-fias]').parent().parent().find('.fa-close').click(function () {
                $el.stroke.parent().parent().removeClass('hide');
                switch ($(this).parent().find('input').attr('data-fias')) {
                    case "area":
                        $el.area.parent().parent().addClass('hide');
                        $el.area.val('');
                        $el.areaspan.text('');
                    case "city":
                        $el.city.parent().parent().addClass('hide');
                        $el.city.val('');
                        $el.cityspan.text('');
                    case "urban":
                        $el.urban.parent().parent().addClass('hide');
                        $el.urban.val('');
                        $el.urbanspan.text('');
                    case "settlement":
                        $el.settlement.parent().parent().addClass('hide');
                        $el.settlement.val('');
                        $el.settlementspan.text('');
                    case "street":
                        $el.street.parent().parent().addClass('hide');
                        $el.street.val('');
                        $el.streetspan.text('');
                }

                switch ($(this).parent().find('input').attr('data-fias')) {
                    case "area":
                        if ($el.selectData.f1 != null) {
                            while ($el.selectData.f1.AOLEVEL != 1) {
                                self.clearObject();
                            }
                        }
                        break;
                    case "city":
                        if ($el.selectData.f1 != null) {
                            while ($el.selectData.f1.AOLEVEL != 3 && $el.selectData.f1.AOLEVEL != 1) {
                                self.clearObject();
                            }
                        }
                        break;
                    case "urban":
                        if ($el.selectData.f1 != null) {
                            while ($el.selectData.f1.AOLEVEL != 3 && $el.selectData.f1.AOLEVEL != 1 && $el.selectData.f1.AOLEVEL != 2) {
                                self.clearObject();
                            }
                        }
                        break;
                    case "settlement":
                        if ($el.selectData.f1 != null) {
                            while ($el.selectData.f1.AOLEVEL != 3 && $el.selectData.f1.AOLEVEL != 1 && $el.selectData.f1.AOLEVEL != 2 && $el.selectData.f1.AOLEVEL != 4) {
                                self.clearObject();
                            }
                        }
                        break;
                    case "street":
                        if ($el.selectData.f1 != null) {
                            while ($el.selectData.f1.AOLEVEL != 3 && $el.selectData.f1.AOLEVEL != 1 && $el.selectData.f1.AOLEVEL != 2 && $el.selectData.f1.AOLEVEL != 4 && $el.selectData.f1.AOLEVEL != 5 && $el.selectData.f1.AOLEVEL != 90) {
                                self.clearObject();
                            }
                        }
                        break;
                }

                if ($el.selectData.f1 != null) {
                    $el.guid = $el.selectData.f1.AOGUID;
                }

                self.openFinder();

                if ($el.selectData.f1.INDEX != '' && $el.selectData.f1.INDEX != null) $el.index.val($el.selectData.f1.INDEX);
                self.fiasView($el.selectData.f5);
                self.fiasView($el.selectData.f4);
                self.fiasView($el.selectData.f3);
                self.fiasView($el.selectData.f2);
                self.fiasView($el.selectData.f1);
            });

            if (area == undefined || area == null || area == '') {
                $el.area.parent().parent().addClass('hide');
            }
            else {
                $el.areaspan.parent().parent().removeClass('hide');
                $el.areaspan.text(area);
            }
            if (city == undefined || city == null || city == '') {
                $el.city.parent().parent().addClass('hide');
            }
            else {
                $el.cityspan.parent().parent().removeClass('hide');
                $el.cityspan.text(city);
            }
            if (urban == undefined || urban == null || urban == '') {
                $el.urban.parent().parent().addClass('hide');
            }
            else {
                $el.urbanspan.parent().parent().removeClass('hide');
                $el.urbanspan.text(urban);
            }
            if (settlement == undefined || settlement == null || settlement == '') {
                $el.settlement.parent().parent().addClass('hide');
            }
            else {
                $el.settlementspan.parent().parent().removeClass('hide');
                $el.settlementspan.text(settlement);
            }
            if (street == undefined || street == null || street == '') {
                $el.street.parent().parent().addClass('hide');
            }
            else {
                $el.streetspan.parent().parent().removeClass('hide');
                $el.streetspan.text(street);
            }
        },
        changelang: function () {
            self = this;
            self.el.region.find('option').each(function (i, item) {
                if (self.el.lang == 'EN')
                    $(item).text(self.tranliterate($(item).text()));
                else
                    $(item).text(self.backtranliterate($(item).text()));
            })

            self.el.region.parent().find('[role="combobox"] li').each(function (i, item) {
                var elem = $(item).find('.text');
                if (self.el.lang == 'EN')
                    elem.text(self.tranliterate(elem.text()));
                else
                    elem.text(self.backtranliterate(elem.text()));
            })
            if (self.el.lang == 'EN') {
                self.el.areaspan.text(self.tranliterate(self.el.areaspan.text()));
                self.el.cityspan.text(self.tranliterate(self.el.cityspan.text()));
                self.el.urbanspan.text(self.tranliterate(self.el.urbanspan.text()));
                self.el.settlementspan.text(self.tranliterate(self.el.settlementspan.text()));
                self.el.streetspan.text(self.tranliterate(self.el.streetspan.text()));

                self.el.region.parent().parent().parent().find('label.place').text("Region");
                self.el.area.parent().parent().find('label.place').text("Area");
                self.el.city.parent().parent().find('label.place').text("City");
                self.el.urban.parent().parent().find('label.place').text("Urban area");
                self.el.settlement.parent().parent().find('label.place').text("Settlement");
                self.el.street.parent().parent().find('label.place').text("Street");
                self.el.index.parent().parent().find('label.place').text("Postal code");
 
            }
            else {
                self.el.areaspan.text(self.backtranliterate(self.el.areaspan.text()));
                self.el.cityspan.text(self.backtranliterate(self.el.cityspan.text()));
                self.el.urbanspan.text(self.backtranliterate(self.el.urbanspan.text()));
                self.el.settlementspan.text(self.backtranliterate(self.el.settlementspan.text()));
                self.el.streetspan.text(self.backtranliterate(self.el.streetspan.text()));

                self.el.region.parent().parent().parent().find('label.place').text("Регион");
                self.el.area.parent().parent().find('label.place').text("Район");
                self.el.city.parent().parent().find('label.place').text("Город");
                self.el.urban.parent().parent().find('label.place').text("Внутригородской район");
                self.el.settlement.parent().parent().find('label.place').text("Населённый пункт");
                self.el.street.parent().parent().find('label.place').text("Улица");
                self.el.index.parent().parent().find('label.place').text("Почтовый индекс");

                //Строка для поиска адреса
            }
            self.el.find('.selectpicker').selectpicker('refresh');
        },
        tranliterate: function (str) {
            self = this;
            if (self.el.lang == 'EN')
            str = str
                .replace(/Й/g, "Jj")
                .replace(/Щ/g, "Shh")
                .replace(/Х/g, "Kh")
                .replace(/Ё/g, "Jo")
                .replace(/Ъ/g, "\"")
                .replace(/Ь/g, "'")
                .replace(/Ж/g, "Zh")
                .replace(/Ч/g, "Ch")
                .replace(/Ш/g, "Sh")
                .replace(/Э/g, "Eh")
                .replace(/Ю/g, "Ju")
                .replace(/Я/g, "Ja")
                .replace(/А/g, "A")
                .replace(/Б/g, "B")
                .replace(/В/g, "V")
                .replace(/Г/g, "G")
                .replace(/Д/g, "D")
                .replace(/Е/g, "E")
                .replace(/З/g, "Z")
                .replace(/И/g, "I")
                .replace(/К/g, "K")
                .replace(/Л/g, "L")
                .replace(/М/g, "M")
                .replace(/Н/g, "N")
                .replace(/О/g, "O")
                .replace(/П/g, "P")
                .replace(/Р/g, "R")
                .replace(/С/g, "S")
                .replace(/Т/g, "T")
                .replace(/У/g, "U")
                .replace(/Ф/g, "F")
                .replace(/Ц/g, "C")
                .replace(/Ы/g, "Y")
                .replace(/й/g, "jj")
                .replace(/щ/g, "shh")
                .replace(/ъ/g, "\"")
                .replace(/ь/g, "'")
                .replace(/х/g, "kh")
                .replace(/ё/g, "jo")
                .replace(/ж/g, "zh")
                .replace(/ч/g, "ch")
                .replace(/ш/g, "sh")
                .replace(/э/g, "eh")
                .replace(/ю/g, "ju")
                .replace(/я/g, "ja")
                .replace(/а/g, "a")
                .replace(/б/g, "b")
                .replace(/в/g, "v")
                .replace(/г/g, "g")
                .replace(/д/g, "d")
                .replace(/е/g, "e")
                .replace(/з/g, "z")
                .replace(/и/g, "i")
                .replace(/к/g, "k")
                .replace(/л/g, "l")
                .replace(/м/g, "m")
                .replace(/н/g, "n")
                .replace(/о/g, "o")
                .replace(/п/g, "p")
                .replace(/р/g, "r")
                .replace(/с/g, "s")
                .replace(/т/g, "t")
                .replace(/у/g, "u")
                .replace(/ф/g, "f")
                .replace(/ц/g, "c")
                .replace(/ы/g, "y");
            return str;
        },
        backtranliterate: function (str) {
            self = this;
            str = str
                .replace(/Jj/g, "Й")
                .replace(/Shh/g, "Щ")
                .replace(/Kh/g, "Х")
                .replace(/Jo/g, "Ё")
                .replace(/Zh/g, "Ж")
                .replace(/Ch/g, "Ч")
                .replace(/Sh/g, "Ш")
                .replace(/Eh/g, "Э")
                .replace(/Ju/g, "Ю")
                .replace(/Ja/g, "Я")
                .replace(/A/g, "А")
                .replace(/B/g, "Б")
                .replace(/V/g, "В")
                .replace(/G/g, "Г")
                .replace(/D/g, "Д")
                .replace(/E/g, "Е")
                .replace(/Z/g, "З")
                .replace(/I/g, "И")
                .replace(/K/g, "К")
                .replace(/L/g, "Л")
                .replace(/M/g, "М")
                .replace(/N/g, "Н")
                .replace(/O/g, "О")
                .replace(/P/g, "П")
                .replace(/R/g, "Р")
                .replace(/S/g, "С")
                .replace(/T/g, "Т")
                .replace(/U/g, "У")
                .replace(/F/g, "Ф")
                .replace(/C/g, "Ц")
                .replace(/Y/g, "Ы")
                .replace(/jj/g, "й")
                .replace(/shh/g, "щ")
                .replace(/\"/g, "ъ")
                .replace(/'/g, "ь")
                .replace(/kh/g, "х")
                .replace(/jo/g, "ё")
                .replace(/zh/g, "ж")
                .replace(/ch/g, "ч")
                .replace(/sh/g, "ш")
                .replace(/eh/g, "э")
                .replace(/ju/g, "ю")
                .replace(/ja/g, "я")
                .replace(/a/g, "а")
                .replace(/b/g, "б")
                .replace(/v/g, "в")
                .replace(/g/g, "г")
                .replace(/d/g, "д")
                .replace(/e/g, "е")
                .replace(/z/g, "з")
                .replace(/i/g, "и")
                .replace(/k/g, "к")
                .replace(/l/g, "л")
                .replace(/m/g, "м")
                .replace(/n/g, "н")
                .replace(/o/g, "о")
                .replace(/p/g, "п")
                .replace(/r/g, "р")
                .replace(/s/g, "с")
                .replace(/t/g, "т")
                .replace(/u/g, "у")
                .replace(/f/g, "ф")
                .replace(/c/g, "ц")
                .replace(/y/g, "ы");
            return str;
        },
        openFinder: function () {
            var self = this;
            setTimeout(function () {
                if (!self.el.stroke.parent().hasClass('open')) { self.el.stroke.parent().find('button').trigger('click') }
            }, 100);
        },
        clearObject: function () {
            var self = this;
            self.el.selectData.f1 = null;
            self.el.selectData.f1 = self.el.selectData.f2;
            self.el.selectData.f2 = self.el.selectData.f3;
            self.el.selectData.f3 = self.el.selectData.f4;
            self.el.selectData.f4 = self.el.selectData.f5;
        },
        saveView: function (data) {
            var self = this;
            if (data != null) {
                switch (data.AOLEVEL) {
                    case 1:
                        $('[name="region"]').val(data.FORMALNAME + " " + data.SHORTNAME.replace('.', ''));
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        $('[name="city"]').val(data.FORMALNAME + " " + data.SHORTNAME.replace('.', ''));
                        break;
                    case 5:
                        $('[name="city"]').val(data.FORMALNAME + " " + data.SHORTNAME.replace('.', ''));
                        break;
                    case 6:
                        $('[name="city"]').val(data.FORMALNAME + " " + data.SHORTNAME.replace('.', ''));
                        break;
                    case 90:
                        $('[name="street"]').val(data.FORMALNAME + " " + data.SHORTNAME.replace('.', ''));
                        break;
                    case 7:
                        $('[name="street"]').val(data.FORMALNAME + " " + data.SHORTNAME.replace('.', ''));
                        break;
                    case 91:
                        $('[name="street"]').val(data.FORMALNAME + " " + data.SHORTNAME.replace('.', ''));
                        break;
                    default:
                        break;
                }
            }
        },
        fullAddress: function () {
            var self = this;
            if (self.el.selectData != null) {
                var str = '';
                if (self.el.selectData.f5 != null) str += ' ' + self.el.selectData.f5.SHORTNAME + " " + self.el.selectData.f5.FORMALNAME;
                if (self.el.selectData.f4 != null) str += ' ' + self.el.selectData.f4.SHORTNAME + " " + self.el.selectData.f4.FORMALNAME;
                if (self.el.selectData.f3 != null) str += ' ' + self.el.selectData.f3.SHORTNAME + " " + self.el.selectData.f3.FORMALNAME;
                if (self.el.selectData.f2 != null) str += ' ' + self.el.selectData.f2.SHORTNAME + " " + self.el.selectData.f2.FORMALNAME;
                if (self.el.selectData.f1 != null) str += ' ' + self.el.selectData.f1.SHORTNAME + " " + self.el.selectData.f1.FORMALNAME;

                if ($('#Address_AddressHouse').val() != '') str += ' д. ' + $('#Address_AddressHouse').val();
		if ($('#Address_AddressBuilding').val() != '') str += " стр. " + $('#Address_AddressBuilding').val();
		if ($('#Address_AddressStruct').val() != '') str += " корп. " + $('#Address_AddressStruct').val();
                if ($('#Address_AddressFlat').val() != '') str += ' кв. ' + $('#Address_AddressFlat').val();
                str = str.trim();
                return self.tranliterate(str);
            }
            return '';
        },
        Address: function () {
            var self = this;
            if (self.el.selectData != null) {
                var str = '';
                if (self.el.selectData.f5 != null) str += ' ' + self.el.selectData.f5.SHORTNAME + " " + self.el.selectData.f5.FORMALNAME;
                if (self.el.selectData.f4 != null) str += ' ' + self.el.selectData.f4.SHORTNAME + " " + self.el.selectData.f4.FORMALNAME;
                if (self.el.selectData.f3 != null) str += ' ' + self.el.selectData.f3.SHORTNAME + " " + self.el.selectData.f3.FORMALNAME;
                if (self.el.selectData.f2 != null) str += ' ' + self.el.selectData.f2.SHORTNAME + " " + self.el.selectData.f2.FORMALNAME;
                if (self.el.selectData.f1 != null) str += ' ' + self.el.selectData.f1.SHORTNAME + " " + self.el.selectData.f1.FORMALNAME;

                str = str.trim();
                return self.tranliterate(str);
            }
            return '';
        },
        fiasView: function (data) {
            var self = this;
            if (data != null) {
                switch (data.AOLEVEL) {
                    case 1:
                        self.el.region.val(data.AOGUID);
                        self.el.region.selectpicker('refresh');
                        break;
                    case 2:
                        break;
                    case 3:
                        self.el.area.parent().parent().removeClass('hide');
                        self.el.area.val(self.tranliterate(data.SHORTNAME + " " + data.FORMALNAME));
                        self.el.areaspan.text(self.tranliterate(data.SHORTNAME + " " + data.FORMALNAME));
                        break;
                    case 4:
                        self.el.city.parent().parent().removeClass('hide');
                        self.el.city.val(self.tranliterate(data.SHORTNAME + " " + data.FORMALNAME));
                        self.el.cityspan.text(self.tranliterate(data.SHORTNAME + " " + data.FORMALNAME));
                        break;
                    case 5:
                        self.el.urban.parent().parent().removeClass('hide');
                        self.el.urban.val(self.tranliterate(data.SHORTNAME + " " + data.FORMALNAME));
                        self.el.urbanspan.text(self.tranliterate(data.SHORTNAME + " " + data.FORMALNAME));
                        break;
                    case 6:
                        self.el.settlement.parent().parent().removeClass('hide');
                        self.el.settlement.val(self.tranliterate(data.SHORTNAME + " " + data.FORMALNAME));
                        self.el.settlementspan.text(self.tranliterate(data.SHORTNAME + " " + data.FORMALNAME));
                        break;
                    case 90:
                        self.el.settlement.parent().parent().removeClass('hide');
                        self.el.settlement.val(self.tranliterate(data.SHORTNAME + " " + data.FORMALNAME));
                        self.el.settlementspan.text(self.tranliterate(data.SHORTNAME + " " + data.FORMALNAME));
                        break;
                    case 7:
                        self.el.street.parent().parent().removeClass('hide');
                        self.el.street.val(self.tranliterate(data.SHORTNAME + " " + data.FORMALNAME));
                        self.el.streetspan.text(self.tranliterate(data.SHORTNAME + " " + data.FORMALNAME));
                        break;
                    case 91:
                        self.el.street.parent().parent().removeClass('hide');
                        self.el.street.val(self.tranliterate(data.SHORTNAME + " " + data.FORMALNAME));
                        self.el.streetspan.text(self.tranliterate(data.SHORTNAME + " " + data.FORMALNAME));
                        break;
                    default:
                        break;
                }
            }
        },
        destroy: function () {
            var self = this, $cont = self.$container;
            $cont.find('.file-drop-zone').off();
            self.$element.insertBefore($cont).off(NAMESPACE).removeData();
            $cont.off().remove();
            return self.$element;
        },
        serializeObject: function () {
            var self = $(this)[0];
            var resultData = {};
            resultData.area = self.el.area.val();
            resultData.city = self.el.city.val();
            resultData.urbanarea = self.el.urban.val();
            resultData.settlement = self.el.settlement.val();
            resultData.street = self.el.street.val();
            resultData.postalcode = self.el.index.val();

            resultData.house = self.el.house.val();
            resultData.housing = self.el.housing.val();
            resultData.building = self.el.building.val();
            resultData.flat = self.el.flat.val();

            resultData.address = self.Address();
            resultData.fulladdress = self.fullAddress();
            
            var obj = {};
            obj.f1 = self.el.selectData.f1;
            obj.f2 = self.el.selectData.f2;
            obj.f3 = self.el.selectData.f3;
            obj.f4 = self.el.selectData.f4;
            obj.f5 = self.el.selectData.f5;
            
            if (obj.f1 != null && obj.f1 != undefined) {
                var data = obj.f1;
                resultData.fiascode = data.AOGUID;
                while (data != null) {
                    switch (data.AOLEVEL) {
                        case 1:
                            resultData.region = (data.SHORTNAME + " " + data.FORMALNAME);
                            break;
                        case 2:
                            break;
                        case 3:
                            resultData.area = (data.SHORTNAME + " " + data.FORMALNAME);
                            break;
                        case 4:
                            resultData.city = (data.SHORTNAME + " " + data.FORMALNAME);
                            break;
                        case 5:
                            resultData.urbanarea = (data.SHORTNAME + " " + data.FORMALNAME);
                            break;
                        case 6:
                            resultData.settlement = (data.SHORTNAME + " " + data.FORMALNAME);
                            break;
                        case 90:
                            resultData.settlement = (data.SHORTNAME + " " + data.FORMALNAME);
                            break;
                        case 7:
                            resultData.street = (data.SHORTNAME + " " + data.FORMALNAME);
                            break;
                        case 91:
                            resultData.street = (data.SHORTNAME + " " + data.FORMALNAME);
                            break;
                        default:
                            break;
                    }
                    data = obj.f1;
                    obj.f1 = obj.f2;
                    obj.f2 = obj.f3;
                    obj.f3 = obj.f4;
                    obj.f4 = obj.f5;
                    obj.f5 = null;
                }
            }
            return resultData;
        }
    }

    $.fn.fias = function (region, area, city, urban, settlement, street, guid) {
        this.each(function () {
            var self = $(this), data = self.data('fias');
            self.find('').empty();
            data = new Fias(this, region, area, city, urban, settlement, street, guid);
            self.data('fias', data);
            return this;
        });
    };

    $.fn.fias.Constructor = Fias;

    $(document).ready(function () {
        $('[data-fias="mainfias"]').fias();
    })
}));