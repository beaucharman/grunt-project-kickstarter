/*

	Main Scripts

------------------------------------------------	
  Description: 
	Version:     1.0
------------------------------------------------ */

/* Remove the .js class from the html tag is javascript is enabled
------------------------------------- */
document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '') + ' js ';

/* Avoid `console` errors in browsers that lack a console. [from boilerplate]
------------------------------------- */
(function() 
{
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});
  while (length--) 
  {
    method = methods[length];
    if (!console[method]) 
    {
      console[method] = noop;
    }
  }
}());
