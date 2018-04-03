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
    
    var fiasView;




    fiasView = function (element) {
        var self = this;
        self.$element = $(element);
        self._init();
    }

    fiasView.prototype = {
        constructor: fiasView,
        _init: function (e) {
            var self = this, $el = self.$element, t;
            self.view = $el;
            self.openbtn = self.view.find('[data-fias-view-btn="open"]');
            self.openbtn.click(function () {
                $('#fias-modal').smodal('open');
                document.Fias.open(self);
            })
            self.view.find('[data-fias-view]').each(function (i, item) {
                var c = $(item).attr('data-fias-view').toLowerCase();
                self.view[c] = $(item);
                self.view[c].input = $(item).find('input');
                self.view[c].input.addClass('hide');
                self.view[c].value = self.view[c].input.val();
                self.view[c].input.after('<div class="form-control span-text">' + self.view[c].value + '</div>');
                if (self.view[c].value != null && self.view[c].value != '') self.view[c].removeClass('hide');
                else self.view[c].addClass('hide');
                self.view[c].span = $(item).find('.span-text');
            })
            self._full();
        },
        _full: function () {
            var self = this, $el = self.$element, t;
            self.full = '';
            for (var elem in self.view) {
                if (self.view[elem].input && self.view[elem].is(':visible')) {
                    self.full += self.view[elem].value + ' ';
                }
            }
        },
        update: function () {
            var self = this, $el = self.$element, t;
            if (self.address != undefined) {
                for (var c in self.address) {
                    if (self.view[c] != null && self.view[c] != undefined) {
                        self.view[c].input.val(self.address[c]);
                        if (self.view[c].input.attr('data-required') != undefined) self.view[c].input.closest(".textbox-group").removeClass('error');
                        self.view[c].span.text(self.address[c]);
                        self.view[c].value = self.view[c].input.val();
                        if (self.address[c] != "" && self.address[c] != null) {
                            self.view[c].removeClass('hide');
                        }
                        else self.view[c].addClass('hide');
                    }
                }
            }
        },
    }


    $.fn.fiasview = function () {
        this.each(function () {
            var self = $(this), data = self.data('fiasview');
            self.find('').empty();
            data = new fiasView(this);
            self.data('fiasview', data);
            return this;
        });
    };

    $.fn.fiasview.Constructor = fiasView;

    $(document).ready(function () {
        $('[data-fias-view=""]').fiasview();
    })
}))