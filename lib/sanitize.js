/**
 * Simple sanitization. It is not intended to sanitize 
 * malicious element values.
 *
 * character | escaped
 *      <       &lt;
 *      >       &gt;
 *      (       &#40;
 *      )       &#41;
 *      #       &#35;
 *      &       &amp;
 *      "       &quot;
 *      '       &apos;
 */
var chars =  {
	  '<': '&lt;'
	, '>': '&gt;'
	, '(': '&#40;'
	, ')': '&#41;'
	, '#': '&#35;'
	, '&': '&amp;'
	, '"': '&quot;'
	, "'": '&apos;'
}

module.exports = function (value) {
	if (typeof value !== 'string') {
		return value;
	}
	
	Object.keys(chars).forEach(function(key) {
		// not using the RegExp method, because in some cases I'm using 
		// characters that have a different meaning in RegExp usage. 
		// http://stackoverflow.com/questions/542232/in-javascript-how-can-i-perform-a-global-replace-on-string-with-a-variable-insi
		value = value.split(key).join(chars[key])
	});
	
	return value;
};