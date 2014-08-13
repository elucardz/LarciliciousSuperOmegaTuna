(function(e){"use strict";function t(e,t){for(var n in t){if(t.hasOwnProperty(n)){e[n]=t[n]}}return e}function n(e,t){if(!e)return false;var n=e.target||e.srcElement||e||false;while(n&&n.id!=t){n=n.parentNode||false}return n!==false}function r(e,t,n,i){i=i||0;if(e.id.indexOf(t)>=0)return i;if(classie.has(e,n)){++i}return e.parentNode&&r(e.parentNode,t,n,i)}function i(){var e=true;return e}function s(e,t){if(classie.has(e,t)){return e}return e.parentNode&&s(e.parentNode,t)}function o(e,n,r){this.el=e;this.trigger=n;this.options=t(this.defaults,r);this.support=Modernizr.csstransforms3d;if(this.support){this._init()}}o.prototype={defaults:{type:"overlap",levelSpacing:40,backClass:"mp-back"},_init:function(){this.open=false;this.level=0;this.wrapper=document.getElementById("mp-pusher");this.levels=Array.prototype.slice.call(this.el.querySelectorAll("div.mp-level"));var e=this;this.levels.forEach(function(t,n){t.setAttribute("data-level",r(t,e.el.id,"mp-level"))});this.menuItems=Array.prototype.slice.call(this.el.querySelectorAll("li"));this.levelBack=Array.prototype.slice.call(this.el.querySelectorAll("."+this.options.backClass));this.eventtype=i()?"touchstart":"click";classie.add(this.el,"mp-"+this.options.type);this._initEvents()},_initEvents:function(){var e=this;var t=function(n){e._resetMenu();n.removeEventListener(e.eventtype,t)};this.trigger.addEventListener(this.eventtype,function(r){r.stopPropagation();r.preventDefault();if(e.open){e._resetMenu()}else{e._openMenu();document.addEventListener(e.eventtype,function(r){if(e.open&&!n(r.target,e.el.id)){t(this)}})}});this.menuItems.forEach(function(t,n){var r=t.querySelector("div.mp-level");if(r){t.querySelector("a").addEventListener(e.eventtype,function(n){n.preventDefault();var i=s(t,"mp-level").getAttribute("data-level");$(t).closest(".mp-level").removeClass("hasYScroll");if(e.level<=i){n.stopPropagation();classie.add(s(t,"mp-level"),"mp-level-overlay");e._openMenu(r)}})}else{var i=t.querySelector("a.gotoElement");if(i){t.querySelector("a").addEventListener(e.eventtype,function(t){t.preventDefault();e._resetMenu()})}}});this.levels.forEach(function(t,n){t.addEventListener(e.eventtype,function(n){n.stopPropagation();var r=t.getAttribute("data-level");if(e.level>r){e.level=r;e._closeMenu()}})});this.levelBack.forEach(function(t,n){t.addEventListener(e.eventtype,function(n){n.preventDefault();var r=s(t,"mp-level").getAttribute("data-level");if(e.level<=r){n.stopPropagation();e.level=s(t,"mp-level").getAttribute("data-level")-1;e.level===0?e._resetMenu():e._closeMenu()}})})},_openMenu:function(e){$("nav.navbar").css("transition",".5s");$(e).closest(".mp-level").addClass("hasYScroll");++this.level;var t=(this.level-1)*this.options.levelSpacing,n=this.options.type==="overlap"?-(this.el.offsetWidth+t):-this.el.offsetWidth;var r="translate3d("+n+"px,0,0)";transformElements(r);if(this.level===1){classie.add(this.wrapper,"mp-pushed");this.open=true;$(".mp-level[data-level=1]").addClass("hasYScroll")}classie.add(e||this.levels[0],"mp-level-open")},_resetMenu:function(){var e="translate3d(0,0,0)";transformElements(e);this.level=0;classie.remove(this.wrapper,"mp-pushed");this._toggleLevels();this.open=false;$("#bt-menu").addClass("bt-menu-close").removeClass("bt-menu-open")},_closeMenu:function(){var e=this.options.type==="overlap"?-(this.el.offsetWidth+(this.level-1)*this.options.levelSpacing):-this.el.offsetWidth;var t="translate3d("+e+"px,0,0)";transformElements(t);this._toggleLevels()},_toggleLevels:function(){for(var e=0,t=this.levels.length;e<t;++e){var n=this.levels[e];if(n.getAttribute("data-level")>=this.level+1){classie.remove(n,"mp-level-open");classie.remove(n,"mp-level-overlay")}else if(Number(n.getAttribute("data-level"))==this.level){classie.remove(n,"mp-level-overlay");$(n).addClass("hasYScroll")}}}};e.mlPushMenu=o})(window);transformElements=function(e){$("nav.navbar")[0].style.WebkitTransform=e;$("nav.navbar")[0].style.MozTransform=e;$("nav.navbar")[0].style.transform=e;$("#content")[0].style.WebkitTransform=e;$("#content")[0].style.MozTransform=e;$("#content")[0].style.transform=e;$("#mp-menu")[0].style.WebkitTransform=e;$("#mp-menu")[0].style.MozTransform=e;$("#mp-menu")[0].style.transform=e}