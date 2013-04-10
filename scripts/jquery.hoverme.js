/*
 * 	HoverMe! Cool sliding boxes for jQuery
 *  
 *  By Vincent Mimoun-Prat / MarvinLabs (www.marvinlabs.com)
 *  Released under MIT License / GPL License
 * 
 *  Heavily based on the awesome Mosaic jQuery plugin: 
 *  	by Sam Dunn / One Mighty Roar (www.onemightyroar.com)
 *  	www.buildinternet.com/project/mosaic
 */

(function($){

    if(!$.mlabs){
        $.mlabs = new Object();
    };
    
    $.mlabs.hoverme = function(el, options){
    
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        
        // Add a reverse reference to the DOM object
        base.$el.data("mlabs.hoverme", base);
        
        base.init = function(){
            base.options = $.extend({},$.mlabs.hoverme.defaultOptions, options);            
            base.load_box();
        };
        
        // Preload Images
        base.load_box = function(){
        	// Hide until window loaded, then fade in
			if (base.options.preload){
				$(base.options.backdrop, base.el).hide();
				$(base.options.overlay, base.el).hide();

				$(window).load(function(){
					// IE transparency fade fix
					if ( $(base.options.overlay, base.el).css('opacity') == 0 ) {
						$(base.options.overlay, base.el).css('filter', 'alpha(opacity=0)');
					}

					$(base.options.overlay, base.el).fadeIn(200, function(){
						$(base.options.backdrop, base.el).fadeIn(200);
					});

					base.allow_hover();
				});
			} else {
				$(base.options.backdrop, base.el).show();
				$(base.options.overlay , base.el).show();
				base.allow_hover();
			}
			
			$(base.options.overlay, base.el).css('opacity', 0);
        };
        
        // Initialize hover animations
        base.allow_hover = function(){
			$(base.el).hover(function () {
	        	$(base.options.overlay, base.el).stop().fadeTo(base.options.speed, base.options.opacity);	        	
	        	$(base.options.caption, base.el).stop().animate({ 'top': '0' }, 0.5*base.options.speed);
	        }, function () {
	        	$(base.options.overlay, base.el).stop().fadeTo(base.options.speed, 0);
	        	$(base.options.caption, base.el).stop().animate({ 'top': '100%' }, 0.5*base.options.speed);
	      	});
        };
        
        // Make it go!
        base.init();
    };
    
    $.mlabs.hoverme.defaultOptions = {
        speed		: 250,
        opacity		: 1,
        overlay  	: '.hoverme-overlay',	// overlay
		backdrop 	: '.hoverme-backdrop',	// backdrop
		caption		: '.hoverme-caption',	// caption
		preload		: true
    };
    
    $.fn.hoverme = function(options){
        return this.each(function(){
            (new $.mlabs.hoverme(this, options));
        });
    };
    
})(jQuery);