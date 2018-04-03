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
    var Graphic;

    var graphic = '<canvas></canvas>';

    Graphic = function (element, options) {
        var self = this;
        self.$element = $(element);
        self._init(options);
    }

    Graphic.prototype = {
        constructor: Graphic,
        _init: function (options, e) {
            var self = this, $el = self.$element;
            $el.empty();
            if ($el.attr('src')) {
                if ($el.attr('data-loader-selector'))
                    $($el.attr('data-loader-selector')).loader();
                $el.append(graphic);
                $el.graph = $el.find('canvas')
                $.ajax({
                    url: $el.attr('src'),//'/Admin/GetStatistic',
                    type: "POST",
                    dataType: 'json',
                    success: function (result) {
                        var myChart = new Chart($el.graph, {
                            type: 'line',
                            data: {
                                labels: result.label,
                                datasets: result.datasets,
                            },
                            options: {
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                }
                            }
                        });

                        if ($el.attr('data-loader-selector'))
                            $($el.attr('data-loader-selector')).loader();
                    },
                    error: function () { }
                });
            }
        },
    }

    $.fn.graphic = function (option) {
        this.each(function () {
            var self = $(this), data = self.data('Graphic');
            data = new Graphic(this, option);
            self.data('Graphic', data);
            return this;
        });
    };

    $.fn.graphic.Constructor = Graphic;

    $(document).ready(function () {
        $('.chart-container').graphic();
    })
}));