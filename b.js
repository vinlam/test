(function($, undefined) {
	$.mbank = $.mbank || {};
	$.extend($.mbank, {
		a: '123',
		send: function(method, param, succfun, errfun, flag) {
			//console.log(method);
			//console.log(JSON.stringify(this));
			//var obj = JSON.stringify(this);
			//console.log(JSON.parse(obj).a);
			//console.log($(this));
			console.log(this.a);
			console.log($.mbank.a);
		}
	})
})(jQuery)