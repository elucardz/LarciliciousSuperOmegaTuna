/**
 * mlpushmenu.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;( function( window ) {
	
	'use strict';

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	// taken from https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
	function hasParent( e, id ) {
		if (!e) return false;
		var el = e.target||e.srcElement||e||false;
		while (el && el.id != id) {
			el = el.parentNode||false;
		}
		return (el!==false);
	}

	// returns the depth of the element "e" relative to element with id=id
	// for this calculation only parents with classname = waypoint are considered
	function getLevelDepth( e, id, waypoint, cnt ) {
		cnt = cnt || 0;
		if ( e.id.indexOf( id ) >= 0 ) return cnt;
		if( classie.has( e, waypoint ) ) {
			++cnt;
		}
		return e.parentNode && getLevelDepth( e.parentNode, id, waypoint, cnt );
	}

	// http://coveroverflow.com/a/11381730/989439
	function mobilecheck() {
		var check = true;
		return check;
	}

	// returns the closest element to 'e' that has class "classname"
	function closest( e, classname ) {
		if( classie.has( e, classname ) ) {
			return e;
		}
		return e.parentNode && closest( e.parentNode, classname );
	}

	function mlPushMenu( el, trigger, options ) {	
		this.el = el;
		this.trigger = trigger;
		this.options = extend( this.defaults, options );
		// support 3d transforms
		this.support = Modernizr.csstransforms3d;
		if( this.support ) {
			this._init();
		}
	}

	mlPushMenu.prototype = {
		defaults : {
			// overlap: there will be a gap between open levels
			// cover: the open levels will be on top of any previous open level
			type : 'overlap', // overlap || cover
			// space between each overlaped level
			levelSpacing : 40,
			// classname for the element (if any) that when clicked closes the current level
			backClass : 'mp-back'
		},
		_init : function() {
			// if menu is open or not
			this.open = false;
			// level depth
			this.level = 0;
			// the moving wrapper
			this.wrapper = document.getElementById( 'mp-pusher' );
			// the mp-level elements
			this.levels = Array.prototype.slice.call( this.el.querySelectorAll( 'div.mp-level' ) );
			// save the depth of each of these mp-level elements
			var self = this;
			this.levels.forEach( function( el, i ) { el.setAttribute( 'data-level', getLevelDepth( el, self.el.id, 'mp-level' ) ); } );
			// the menu items
			this.menuItems = Array.prototype.slice.call( this.el.querySelectorAll( 'li' ) );
			// if type == "cover" these will serve as hooks to move back to the previous level
			this.levelBack = Array.prototype.slice.call( this.el.querySelectorAll( '.' + this.options.backClass ) );
			// event type (if mobile use touch events)
			this.eventtype = mobilecheck() ? 'touchstart' : 'click';
			// add the class mp-overlap or mp-cover to the main element depending on options.type
			classie.add( this.el, 'mp-' + this.options.type );
			// initialize / bind the necessary events
			this._initEvents();
		},
		_initEvents : function() {
			var self = this;

			// the menu should close if clicking somewhere on the body
			var bodyClickFn = function( el ) {
				self._resetMenu();
				el.removeEventListener( self.eventtype, bodyClickFn );
			};

			// open (or close) the menu
			this.trigger.addEventListener( this.eventtype, function( ev ) {
				ev.stopPropagation();
				ev.preventDefault();
				if( self.open ) {
					self._resetMenu();
				}
				else {
					self._openMenu();
					// the menu should close if clicking somewhere on the body (excluding clicks on the menu)
					document.addEventListener( self.eventtype, function( ev ) {
						if( self.open && !hasParent( ev.target, self.el.id ) ) {
							bodyClickFn( this );
						}
					} );
				}
			} );

			// opening a sub level menu
			this.menuItems.forEach( function( el, i ) {
				// check if it has a sub level
				var subLevel = el.querySelector( 'div.mp-level' );
				if( subLevel ) {
					el.querySelector( 'a' ).addEventListener( self.eventtype, function( ev ) {
						ev.preventDefault();
						var level = closest( el, 'mp-level' ).getAttribute( 'data-level' );
						$(el).closest('.mp-level').removeClass('hasYScroll');
						if( self.level <= level ) {
							ev.stopPropagation();
							classie.add( closest( el, 'mp-level' ), 'mp-level-overlay' );
							self._openMenu( subLevel );
						}
					} );
				}
				else
				{
					var divLink = el.querySelector('a.gotoElement');
					if(divLink)
					{
						el.querySelector( 'a' ).addEventListener( self.eventtype, function( ev ) {
							ev.preventDefault();
							self._resetMenu();
						} );
					}
				}
			} );

			// closing the sub levels :
			// by clicking on the visible part of the level element
			this.levels.forEach( function( el, i ) {
				el.addEventListener( self.eventtype, function( ev ) {
					ev.stopPropagation();
					var level = el.getAttribute( 'data-level' );
					if( self.level > level ) {
						self.level = level;
						self._closeMenu();
					}
				} );
			} );

			// by clicking on a specific element
			this.levelBack.forEach( function( el, i ) {
				el.addEventListener( self.eventtype, function( ev ) {
					ev.preventDefault();
					var level = closest( el, 'mp-level' ).getAttribute( 'data-level' );
					if( self.level <= level ) {
						ev.stopPropagation();
						self.level = closest( el, 'mp-level' ).getAttribute( 'data-level' ) - 1;
						self.level === 0 ? self._resetMenu() : self._closeMenu();
					}
				} );
			} );	
		},
		_openMenu : function( subLevel ) {
			$('nav.navbar').css('transition','.5s');
			$(subLevel).closest('.mp-level').addClass('hasYScroll');
			// increment level depth
			++this.level;

			// move the main wrapper
			var levelFactor = ( this.level - 1 ) * this.options.levelSpacing,
				translateVal = this.options.type === 'overlap' ? -(this.el.offsetWidth + levelFactor) : -(this.el.offsetWidth);
			var transformValue = 'translate3d(' + translateVal + 'px,0,0)' ;
			transformElements(transformValue);
			// add class mp-pushed to main wrapper if opening the first time
			if( this.level === 1 ) {
				classie.add( this.wrapper, 'mp-pushed' );
				this.open = true;
				$('.mp-level[data-level=1]').addClass('hasYScroll');
			}
			// add class mp-level-open to the opening level element
			classie.add( subLevel || this.levels[0], 'mp-level-open' );
		},
		// close the menu
		_resetMenu : function() {
			var transformValue = 'translate3d(0,0,0)' ;
			transformElements(transformValue);
			this.level = 0;
			// remove class mp-pushed from main wrapper
			classie.remove( this.wrapper, 'mp-pushed' );
			this._toggleLevels();
			this.open = false;
			$("#bt-menu").addClass('bt-menu-close').removeClass('bt-menu-open');
		},
		// close sub menus
		_closeMenu : function() {
			var translateVal = this.options.type === 'overlap' ? -(this.el.offsetWidth + ( this.level - 1 ) * this.options.levelSpacing) : -(this.el.offsetWidth);
			var transformValue = 'translate3d(' + translateVal + 'px,0,0)' ;
			transformElements(transformValue);
			this._toggleLevels();
		},
		// translate the el
		// removes classes mp-level-open from closing levels
		_toggleLevels : function() {
			for( var i = 0, len = this.levels.length; i < len; ++i ) {
				var levelEl = this.levels[i];
				if( levelEl.getAttribute( 'data-level' ) >= this.level + 1 ) {
					classie.remove( levelEl, 'mp-level-open' );
					classie.remove( levelEl, 'mp-level-overlay' );
				}
				else if( Number( levelEl.getAttribute( 'data-level' ) ) == this.level ) {
					classie.remove( levelEl, 'mp-level-overlay' );
					$(levelEl).addClass('hasYScroll');
				}
			}
		}
	}

	// add to global namespace
	window.mlPushMenu = mlPushMenu;

} )( window );

transformElements = function(transformValue)
{
	$('nav.navbar')[0].style.WebkitTransform = transformValue;
	$('nav.navbar')[0].style.MozTransform = transformValue;
	$('nav.navbar')[0].style.transform = transformValue;
	$('#content')[0].style.WebkitTransform = transformValue;
	$('#content')[0].style.MozTransform = transformValue;
	$('#content')[0].style.transform = transformValue;
	$('#mp-menu')[0].style.WebkitTransform = transformValue;
	$('#mp-menu')[0].style.MozTransform = transformValue;
	$('#mp-menu')[0].style.transform = transformValue;
}