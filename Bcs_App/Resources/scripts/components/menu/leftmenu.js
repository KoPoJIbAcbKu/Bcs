
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
    $.fn.menu = {};
    
    $.fn.menu.open = function (view) {
        var self = this, $el = self.$element, t;
        self.view = view;
    }

    $(document).ready(function () {
        $.fn.menu = $('.left-menu');
        $.fn.menu.sub = null;
        $('.menu-data-block').prepend('<div class="swiper"></div>');
        
        $('.menu-data-block .swiper').on('swipe', function (event) {
            $.fn.menu.show();
        });
        $.fn.menu.show = function () {
            if ($.fn.menu.sub == null) {
                var div = document.createElement('div');
                $(div).addClass('submodal');
                $.fn.menu.after(div);
                $('.menu-data-block').css('filter', 'blur(2px)');
                $.fn.menu.sub = $(div);
                $.fn.menu.sub.click(function () { $.fn.menu.hide(); });
            }
            $.fn.menu.addClass('show');
        }
        $.fn.menu.hide = function () {
            if ($.fn.menu.sub != null) {
                $.fn.menu.sub.remove();
                $.fn.menu.sub = null;
            }
            $('.menu-data-block').css('filter', '');
            $.fn.menu.removeClass('show');
        }
    })
}));