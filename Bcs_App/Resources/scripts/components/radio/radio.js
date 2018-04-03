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
    var struct = '<div class="radio-block"></div>';

    var structElement = 
	    '<div {attr} class="radio-element">\n' +
	    '	<div class="ico"><span class="fa fa-{ico}"></span></div>\n' +
	    '	<div class="value" data-value="{value}">{text}</div>\n' +
	    '</div>';
    var cs = "col-sm-6";

    var radio;

    radio = function (element) {
        var self = this;
        self.$element = $(element);
        self._init();
    }

    radio.prototype = {
        constructor: radio,
        _init: function (e) {
            var self = this, $el = self.$element, t;
            $el.hide();
            $el.before(struct);
            self.block = $el.parent().find('.radio-block');
            
            $el.find('option').each(function (i, item) {
                var attr = '';
                if ($el.attr('data-slider-active')) attr = 'data-slider-active="' + $el.attr('data-slider-active') + '#' + $(item).val() + '"';
                self.block.append(structElement
                    .replace('{ico}', $(item).parent().attr('label'))
                    .replace('{attr}', attr)
                    .replace('{text}', $(item).text())
                    .replace('{value}', $(item).attr('value'))
                    );
            });
            
            if ($el.attr('data-radio-class')) {
                cs = $el.attr('data-radio-class');
            }

            self.block.find('.radio-element').addClass(cs);

            self.block.find('[data-value="' + $el.val() + '"]').parent().addClass('active');

            self.block.find('.radio-element').click(function () {
                if (!$(this).hasClass('active')) {
                    self.block.find('.active').removeClass('active');
                    $(this).addClass('active');
                    $el.val($(this).find('.value').attr('data-value'));
                }
                if ($(this).attr('data-slider-active')) {
                    var sliderinfo = $(this).attr('data-slider-active');
                    var slidername = sliderinfo.split('#')[0];
                    var slideritem = sliderinfo.split('#')[1];
                    $('[data-slider-name="' + slidername + '"] .item').removeClass('active');
                    $('[data-slider-name="' + slidername + '"] [data-slider-item="' + slideritem + '"]').addClass('active');
                }
            })
        },
    }
    
    $.fn.radio = function () {
        this.each(function () {
            var self = $(this), data = self.data('fiasview');
            self.find('').empty();
            data = new radio(this);
            self.data('radio', data);
            return this;
        });
    };

    $.fn.radio.Constructor = radio;



    $(document).ready(function () {
        $('[data-provider="radio"]').radio();
    })
}));