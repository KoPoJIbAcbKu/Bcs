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

    var NAMESPACE, tHeader, tMain, handler, defaultLayoutTemplates, InputFile, tClose, tfias, tsave;
    NAMESPACE = '.inputFile';

    handler = function ($el, event, callback, skipNS) {
        var ev = skipNS ? event : event.split(' ').join(NAMESPACE + ' ') + NAMESPACE;
        $el.off(ev).on(ev, callback);
    };

    tMain =
        '<div class="input-group">\n' +
        '  <span class="input-group-addon btn btn-material btn-sm"><i class="fa fa-upload"></i></span>\n' +
        '  <span class="form-control">Выберите файл</span>\n' +
        '</div>\n';

    defaultLayoutTemplates = {
        main: tMain
    };

    InputFile = function (element) {
        var self = this;
        self.$element = $(element);
        self._init();
    }

    InputFile.prototype = {
        constructor: InputFile,
        _init: function () {
            var self = this;
            self.$element.hide();
            self.$element.before(tMain);
        },
    };

    $.fn.inputfile = function () {
        this.each(function () {
            var self = $(this), data = self.data('inputFile');
            self.find('').empty();
            data = new InputFile(this);
            self.data('inputFile', data);

            $.fias = data;
            return this;
        });
    };

    $.fn.inputfile.Constructor = InputFile;

    $.fn.inputfile.open = function (view) {
        var self = this, $el = self.$element, t;
        self.view = view;
    }

    $(document).ready(function () {
        //if ($('#fias-modal').length == 0) {
        //    //$('.body-content > .main-block').append('<div id="fias-modal" class="modal-main"><div class="modal-table-block"><div class="modal-element" data-fias="mainfias"></div></div></div>');
        //}
        $('[data-input="file"]').inputfile();
    })
}))