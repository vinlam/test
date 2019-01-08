/* 
Loading JavaScript Asynchronously 
loadScript.load(["a.js", "b.js"]); 
*/
var loadScript = (function() {
	var loadOne = function(url) {console.log('url: '+url);
		var dtd = $.Deferred();
		var node = document.createElement('script');
		node.type = "text/javascript";
		var onload = function() {
			dtd.resolve();
		};
		$(node).load(onload).bind('readystatechange', function() {
			if (node.readyState == 'loaded') {
				onload();
			}
		});
		document.getElementsByTagName('head')[0].appendChild(node);
		node.src = url;
		return dtd.promise();
	};
	var load = function(urls) {console.log('urls:'+urls);
		if (!$.isArray(urls)) {
			return load([urls]);
		}
		var ret = [];
		for (var i = 0; i < urls.length; i++) {
			ret[i] = loadOne(urls[i]);
		};
		return $.when.apply($, ret);
	}
	return {
		load: load
	};
})();