/** jQuery plugin to show Gravatar
* @link http://plugins.jquery.com/project/gravatarimg
* @author Jakub Vrana, http://www.vrana.cz/
* @license http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0
*/

/** Set 'src' attribute to Gravatar's avatar
* @param string
* @param [string] appended to generated URL, e.g. '.jpg?s=80'
* @param [boolean] whether to use HTTPS
* @returns jQuery
*/
jQuery.fn.gravatarImg = function (email, params, secure) {
	return this.attr('src', (secure ? 'https://secure' : 'http://www') + '.gravatar.com/avatar/' + (!email ? '' : jQuery.md5(email.replace(/^\s+|\s+$/g, '').toLowerCase()) + params));
};

$.extend({
	gravatarSrc: function(email, params) {
		return 'http://www.gravatar.com/avatar/' + (!email ? '' : jQuery.md5(email.replace(/^\s+|\s+$/g, '').toLowerCase()) + params);
	}
});