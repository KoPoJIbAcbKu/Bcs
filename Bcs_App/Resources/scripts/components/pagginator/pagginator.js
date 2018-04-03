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

    var NAMESPACE, tMain, tLeft, tRight, tBtn, tMu, tSBtn, tDLeft, tDRight
        , Ftsfrom, ElementalList, defaultLayoutTemplates, tElementList, tElementListContainer, tMain2, tAddBtn, tSelectCost, handler,
        tSummury;
    NAMESPACE = '.paggingfrom';


    handler = function ($el, event, callback, skipNS) {
        var ev = skipNS ? event : event.split(' ').join(NAMESPACE + ' ') + NAMESPACE;
        $el.off(ev).on(ev, callback);
    };

    tMain ='<div class="btn-group pgn">\n' +
        '</div>\n';

    tDLeft =
        '<a id="pgn_BtnL" disabled="disabled" type="button" class="btn btn-default"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span></a>\n';

    tDRight =
        '<a id="pgn_BtnL" disabled="disabled" type="button" class="btn btn-default"><span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></a>\n';

    tLeft =
        '<a id="pgn_BtnL" type="button" class="btn btn-default"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span></a>\n';

    tRight =
        '<a id="pgn_BtnR" type="button" class="btn btn-default"><span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></a>\n';

    tMu =
        '<button type="button" disabled="disabled" class="btn btn-default"><span aria-hidden="true">...</span></button>\n';

    tBtn =
        '<button id="pgn_Btn{number}" type="button" class="btn btn-default"><span aria-hidden="true">{number}</span></button>\n';

    tSBtn =
        '<a id="pgn_Btn{number}" href="#" type="button" class="btn btn-material"><span aria-hidden="true">{number}</span></a>\n';
    
    defaultLayoutTemplates = {
        main: tMain
    };

    ElementalList = function (element, count, page, length) {
        var self = this;
        self.$element = $(element);
        self._init(count, page, length);
    }

    ElementalList.prototype = {
        constructor: ElementalList,
        _init: function (count, page, length, e) {
            var self = this, $el = self.$element, t;
            self.count = 0;
            
            self.$container = $el;

            var maxpage = ~~(length / count);
            if (length % count != 0) maxpage++;

            var refH = 4 - page;
            if (page > 4) {
                self.$container.append(tLeft);
                self.$container.append(tBtn.replace(new RegExp('{number}', 'g'), (1)));
                if (page > 5) self.$container.append(tMu);
                self.$container.append(tBtn.replace(new RegExp('{number}', 'g'), (page - 3)));
                self.$container.append(tBtn.replace(new RegExp('{number}', 'g'), (page - 2)));
                self.$container.append(tBtn.replace(new RegExp('{number}', 'g'), (page - 1)));
                self.$container.append(tSBtn.replace(new RegExp('{number}', 'g'), (page)));
                refH = 0;
            }
            else if (page == 4) {
                self.$container.append(tLeft);
                self.$container.append(tBtn.replace(new RegExp('{number}', 'g'), (page - 3)));
                self.$container.append(tBtn.replace(new RegExp('{number}', 'g'), (page - 2)));
                self.$container.append(tBtn.replace(new RegExp('{number}', 'g'), (page - 1)));
                self.$container.append(tSBtn.replace(new RegExp('{number}', 'g'), (page)));
                refH = 0;
            }
            else {
                if (page != 1)
                    self.$container.append(tLeft);
                else
                    self.$container.append(tDLeft);
                var x = 1;
                while (x < page) {
                    self.$container.append(tBtn.replace(new RegExp('{number}', 'g'), (x)));
                    x++;
                }
                self.$container.append(tSBtn.replace(new RegExp('{number}', 'g'), (x)));
            }
            refH += 3;
            if ((maxpage - page) > refH) {
                for (var i = 0; i < refH; i++) {
                    self.$container.append(tBtn.replace(new RegExp('{number}', 'g'), (page + i + 1)));
                }
                if ((maxpage - page) > (refH + 1)) self.$container.append(tMu);
                self.$container.append(tBtn.replace(new RegExp('{number}', 'g'), (maxpage)));
                self.$container.append(tRight);
            }
            else if (maxpage - page == refH) {
                for (var i = 0; i < refH; i++) {
                    self.$container.append(tBtn.replace(new RegExp('{number}', 'g'), (page + i + 1)));
                }
                self.$container.append(tRight);
            }
            else {
                var x = page + 1;
                while (x <= maxpage) {
                    self.$container.append(tBtn.replace(new RegExp('{number}', 'g'), (x)));
                    x++;
                }

                if (page != maxpage)
                    self.$container.append(tRight);
                else
                    self.$container.append(tDRight);
            }

            if (maxpage == 1) self.$container.addClass('hide');

            handler(self.$container.children('button'), 'click', function (e) {
                $("input[name$='Page']").attr('value', $(this).find('span').text());
                submitForm();
            });

            handler(self.$container.children('#pgn_BtnR'), 'click', function (e) {
                $("input[name$='Page']").attr('value', page + 1);
                submitForm();
            });

            handler(self.$container.children('#pgn_BtnL'), 'click', function (e) {
                $("input[name$='Page']").attr('value', page - 1);
                submitForm();
            });
        },
        _addElement: function (options) {
            var self = this;
            self.count++;
            if (options != null)
                self.$container.append(tElementList.replace(new RegExp('{number}', 'g'), self.count)
                    .replace(new RegExp('{numberl}', 'g'), (self.count - 1))
                    .replace(new RegExp('{count}', 'g'), options.count)
                    .replace(new RegExp('{weight}', 'g'), options.weight)
                    .replace(new RegExp('{cost}', 'g'), options.cost)
                    .replace(new RegExp('{id}', 'g'), options.id)
                    .replace(new RegExp('{summ}', 'g'), (parseFloat(options.cost) * parseInt(options.count)).toFixed(2))
                    .replace(new RegExp('{decriptionL}', 'g'), options.decriptionL != null ? options.decriptionL : '')
                    .replace(new RegExp('{decriptionK}', 'g'), options.decriptionK != null ? options.decriptionK : '')
                    .replace(new RegExp('{code}', 'g'), options.code != null ? options.code : ''));
            else
                self.$container.append(tElementList.replace(new RegExp('{number}', 'g'), self.count)
                    .replace(new RegExp('{numberl}', 'g'), (self.count - 1))
                    .replace(new RegExp('{count}', 'g'), 1)
                    .replace(new RegExp('{weight}', 'g'), '0.00')
                    .replace(new RegExp('{code}', 'g'), '')
                    .replace(new RegExp('{id}', 'g'), 0)
                    .replace(new RegExp('{cost}', 'g'), '0.00')
                    .replace(new RegExp('{summ}', 'g'), '0.00')
                    .replace(new RegExp('{decriptionL}', 'g'), '')
                    .replace(new RegExp('{decriptionK}', 'g'), ''));


            handler($(self.$container.children().last().find('input')[1]), 'change', function (e) {
                if (parseFloat($(this).val()) < 0) $(this).val(0);
                var a = parseFloat($(this).val());
                var b = parseInt($(this).parent().parent().parent().children().first().find('input').first().val());

                var sum = $(this).parent().parent().parent().children().last().prev().find('input').last();
                sum.val((a * b).toFixed(2));
                self.$sumcost.val((parseFloat(self.$sumcost.val()) - parseFloat(sum[0].defaultValue) + parseFloat(sum.val())).toFixed(2));
                sum[0].defaultValue = sum.val();
            });

            handler(self.$container.children().last().find('.close'), 'click', function (e) {
                var sum = $(this).parent().parent().children().last().find('input').last();

                var b = parseInt($(this).parent().find('.row').children().first().find('input').first().val());
                var sum = parseFloat($(this).parent().find('.row').children().last().prev().find('input').last().val());
                self.count--;
                self.$sumcount.val(parseInt(self.$sumcount.val()) - b);
                self.$sumcost.val(parseFloat(self.$sumcost.val()) - sum);
                var nextelem = $(this).parent().next();
                while (nextelem.length != 0) {
                    var number = parseInt(nextelem.children().first().text().replace('Товар №', ''));
                    nextelem.children().first().html('Товар №' + (number - 1))
                    nextelem.children().last().children().first().find('input').attr('name', 'products[' + (number - 2) + '].count');
                    nextelem.find('textarea').first().attr('name', 'products[' + (number - 2) + '].decriptionL');
                    nextelem.find('textarea').last().attr('name', 'products[' + (number - 2) + '].decriptionK');
                    nextelem.children().last().children().first().next().find('input').attr('name', 'products[' + (number - 2) + '].cost');
                    nextelem.children().last().children().last().attr('name', 'products[' + (number - 2) + '].id');
                    nextelem = nextelem.next();
                }
                $(this).parent().remove();
            });

            handler(self.$container.children().last().find('input').first(), 'change', function (e) {

                if ($(this).val() < '1') $(this).val(1);
                self.$sumcount.val(parseInt(self.$sumcount.val()) - parseInt(this.defaultValue) + parseInt($(this).val()));
                this.defaultValue = $(this).val();
                var sum = $(this).parent().parent().parent().children().last().prev().find('input').last();
                var a = parseInt($(this).val());
                var b = parseFloat($($(this).parent().parent().parent().children().find('input')[1]).val());
                sum.val((a * b).toFixed(2));
                self.$sumcost.val((parseFloat(self.$sumcost.val()) - parseFloat(sum[0].defaultValue) + parseFloat(sum.val())).toFixed(2));
                sum[0].defaultValue = sum.val();

                e.preventDefault;
            });
            if (options != undefined) {
                self.$sumcost.val((parseFloat(self.$sumcost.val()) + (parseInt(options.count) * parseFloat(options.cost))).toFixed(2));
                self.$sumcount.val(parseInt(self.$sumcount.val()) + options.count);
            }
            else
                self.$sumcount.val(parseInt(self.$sumcount.val()) + 1);
        },
        _changeCountInElement: function () {
            return tElementList;
        },
        _renderElement: function () {
            return tElementList;
        },
        addElement: function () {
            return tElementList;
        },
        destroy: function () {
            var self = this, $cont = self.$container;
            $cont.find('.file-drop-zone').off();
            self.$element.insertBefore($cont).off(NAMESPACE).removeData();
            $cont.off().remove();
            return self.$element;
        }
    }

    $.fn.elementList = function (count, page, length) {
        this.each(function () {
            var self = $(this), data = self.data('elementList');
            self.empty();
            data = new ElementalList(this, count, page, length);
            self.data('elementList', data);
            return this;
        });
    };

    $.fn.elementList.Constructor = ElementalList;

}));