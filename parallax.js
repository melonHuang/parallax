// Parallax Scrolling 1.0 现通过背景fixed实现
// 块要设置data-parallax-ratio
(function() {
	var pluginName = 'parallax', 
		defaults = {
			
		}, 		
		ratioName = 'parallax-ratio', 
		requestAnimFrame = (
			window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(callback) {
				setTimeout(callback, 1000 / 60);
			}
		); 
		//transforms = ['transform', 'mozTransform', 'webkitTransform', 'msTransform', 'oTransform']; 
	
	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		
		this._defaults = defaults;
		this._name = pluginName;
		
		this.init();
	}
	
	Plugin.prototype = {
		init: function() {
			this._ratio = $(this.element).data(ratioName);
			this._startAnimationLoop();
			this.scrolling = false;
			$(window).scroll(function() {
				this.scrolling = true;
			});
		}, 
		_startAnimationLoop: function() {
			var self = this;
			this._animationLoop = function() {
				requestAnimFrame(self._animationLoop);
				self._repositionElements();
			};
			this._animationLoop();
		}, 
		_repositionElements: function() {
			//if(!this.scrolling) return;
			var $ele = $(this.element),
				startOffsetTop = window.innerHeight,	
				offsetTop = $ele.offset().top, 
				offsetY, 
				backgroundPositionY;
			if(offsetTop > startOffsetTop) {
				var clientTop = offsetTop - $(window).scrollTop();
				if(clientTop > startOffsetTop) return;
				offsetY = ($(window).scrollTop() - (offsetTop - startOffsetTop)) * this._ratio;
			}
			else {
				offsetY = $(window).scrollTop() * this._ratio;
			}
			backgroundPositionY = offsetTop > startOffsetTop ? startOffsetTop * this._ratio - offsetY : offsetTop * this._ratio - offsetY;
			$ele.css('background-position-y', backgroundPositionY + 'px');
			this.scrolling = false;
		}
	};
	
	// 注册为jquery插件
	$.fn[pluginName] = function(options) {
		//alert(this);
		var eles = this;
		eles.each(function() {
			if(!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});
	}
	
})($, window);