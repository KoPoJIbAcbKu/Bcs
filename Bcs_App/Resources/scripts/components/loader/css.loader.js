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
    var Loader;

	var loader = '	<div class="middle-content"><div class="vertical">\n' +
				 '		<div class="cssload-loader"><div class="cssload-inner cssload-one"></div><div class="cssload-inner cssload-two"></div><div class="cssload-inner cssload-three"></div></div></div>\n' +
				 '	</div>\n';

	Loader = function (element, options) {
		var self = this;
		self.$element = $(element);
		self._init(options);
	}

	Loader.prototype = {
		constructor: Loader,
		_init: function (options, e) {
		    var self = this, $el = self.$element;
		    if ($el.parent().children('[data-table-item="loader"]').length != 0) {
		        $el.parent().children('[data-table-item="loader"]').remove();
		    } else {
		        var div = document.createElement('div');
		        div.setAttribute('data-table-item', 'loader');
                $(div).addClass('filter-block');
		        $el.after(div);
		        $(div).append(loader);
		        $el.loader = $(div);
		    }
		},
	}

	$.fn.loader = function (option) {
		this.each(function () {
			var self = $(this), data = self.data('Loader');
			data = new Loader(this, option);
			self.data('Loader', data);
			return this;
		});
	};

	$.fn.loader.Constructor = Loader;

	$(document).ready(function () {
		$('[data-table]').loader();
	})
}));