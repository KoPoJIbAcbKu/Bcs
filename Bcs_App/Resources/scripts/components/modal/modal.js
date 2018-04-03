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

    var NAMESPACE, Modal, mm, Main, handler, defaultLayoutTemplates;
    NAMESPACE = '.dictionary';

    mm =
        '    <div class="modal-main">\n' +
        '        <div class="modal-table-block">\n' +
        '           <div class="modal-block">\n' +
        '           </div>\n' +
        '        </div>\n' +
        '    </div>';
    
    handler = function ($el, event, callback, skipNS) {
        var ev = skipNS ? event : event.split(' ').join(NAMESPACE + ' ') + NAMESPACE;
        $el.off(ev).on(ev, callback);
    };

    defaultLayoutTemplates = {
        elemets: Modal
    };

    Modal = function (element, options) {
        var self = this;
        self.el = $(element);
        self._init(options);
    }

    Modal.prototype = {
        constructor: Modal,
        open: function () {
            $('.body-content').addClass('open-modal');
        },
        close: function () {
            $('.body-content').removeClass('open-modal');
        },
        _init: function (options, e) {
            var self = this, el = self.el, t;
            if (options == 'open') {
                $.fn.smodal.open();
                el.addClass('active');
            } else if (options == 'close') {
                $.fn.smodal.close();
                el.removeClass('active');
            }            
        },
        destroy: function () {
            var self = this, $cont = self.$container;

            return self.$element;
        }
    }

    $.fn.smodal = function (option) {
        this.each(function () {
            var self = $(this), data = self.data('Modal');
            self.Main = Main;
            data = new Modal(this, option);
            self.data('Modal', data);
            return this;
        });
    };

    $.fn.smodal.open = function () {
        $('.body-content').addClass('open-modal');
    }

    $.fn.smodal.close = function () {
        $('.body-content').removeClass('open-modal');
    }

    $.fn.smodal.Constructor = Modal;
    $(document).ready(function () {
        Main = $('.modal-main');
        Main.click(function () {
            $.fn.smodal.close();
        })
    })
}));