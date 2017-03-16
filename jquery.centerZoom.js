/**
centerZoom

Copyright (c) 2016 Kei Kataoka (sand a lot)

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
*/
(function($) {
	$.fn.centerZoom = function( options ) {
		var settings = $.extend( {
			'rate': 95,
			'resize_adjust': true,
			'fadein': true,
			'delay': 500,
			'display_time': 4000
		}, options);

		var calcSizeAndPosition = function( ele ) {
			var dest_w = $(ele).outerWidth();
			var dest_h = $(ele).outerHeight();
			var dest_r = dest_w / dest_h;

			var win_w = $(window).width();
			var win_h = $(window).height();
			var win_r = win_w / win_h;

			var zoom = 1;

			if( win_r > dest_r ) {
				zoom = win_h / dest_h;
			} else {
				zoom = win_w / dest_w;
			}

			var zoom_rate = zoom * settings.rate / 100;

			var dest_x = (win_w - dest_w * zoom_rate) / 2
			var dest_y = (win_h - dest_h * zoom_rate) / 2

			$(ele).css({
				'top': dest_y,
				'left': dest_x,
				'-ms-transform-origin': '0 0',
				'-ms-transform': 'scale( ' + zoom_rate + ' )',
				'transform-origin': '0 0',
				'transform': 'scale( ' + zoom_rate + ', ' + zoom_rate + ' )'
			});
		};

		var showPanel = function( ele ) {
			if( settings.fadein ) {
				$(ele).fadeIn();
			} else {
				$(ele).css( 'display', 'block' );
			}
		};

		var hidePanel = function( ele ) {
			if( settings.fadein ) {
				$(ele).fadeOut();
			} else {
				$(ele).css( 'display', 'none' );
			}
		};

		return this.each( function() {
			$(this).css({ 'position': 'absolute', 'display': 'none' });

			calcSizeAndPosition(this);

			setTimeout( showPanel, settings.delay, this );

			if( settings.resize_adjust )
				$(window).on( 'resize', this, calcSizeAndPosition );

			if( settings.display_time > 0 )
				setTimeout( hidePanel, settings.display_time, this );
		});
	};
})( jQuery );



