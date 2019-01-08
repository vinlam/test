;(function($) {
	// override：新的请求是否要覆盖之前的请求
	function AjaxQueue(override) {
		this.override = !!override;
	};
	AjaxQueue.prototype = {
		requests: new Array(),
		offer: function(options) {
			var _self = this;
			var xhrOptions = $.extend({}, options, {
				complete: function(jqXHR, textStatus) {
					// 支持complete是函数数组的情况
					if ($.isArray(options.complete)) {
						var funcs = options.complete;
						for (var i = 0, len = funcs.length; i < len; i++)
							funcs[i].call(this, jqXHR, textStatus);
					} else {
						if (options.complete)
							options.complete.call(this, jqXHR, textStatus);
					}
					// 处理结束，从队列中发出下一个ajax请求
					_self.poll();
				},
				beforeSend: function(jqXHR, settings) {
					if (options.beforeSend)
						var ret = options.beforeSend.call(this, jqXHR, settings);
					// 如果当前ajax请求因为某些原因被撤销了，那么去发下一个ajax请求
					if (ret === false) {
						_self.poll();
						return ret;
					}
				}
			});
			// 如果支持覆盖，那么调用replace
			if (this.override) {
				// console.log('go override');
				this.replace(xhrOptions);
				// 反之放入队列
			} else {
				// console.log('go queue');
				this.requests.push(xhrOptions);
				if (this.requests.length == 1) {
					$.ajax(xhrOptions);
				}
			}
		},
		// 撤销前一个请求，发送新的请求
		replace: function(xhrOptions) {
			var prevRet = this.peek();
			if (prevRet != null) {
				// jquery源码中可以看到此方法
				prevRet.abort();
			}
			this.requests.shift();
			this.requests.push($.ajax(xhrOptions));
		},
		// 轮询队列 发送下一个请求
		poll: function() {
			if (this.isEmpty()) {
				return null;
			}
			var processedRequest = this.requests.shift();
			var nextRequest = this.peek();
			if (nextRequest != null) {
				$.ajax(nextRequest);
			}
			return processedRequest;
		},
		// 返回队列头部的请求
		peek: function() {
			if (this.isEmpty()) {
				return null;
			}
			var nextRequest = this.requests[0];
			return nextRequest;
		},
		// 判断队列是否为空
		isEmpty: function() {
			return this.requests.length == 0;
		}
	};
	var queue = {};
	// 管理AjaxQueue的简单对象
	var AjaxManager = {
		// 创建新的ajaxQueue
		createQueue: function(name, override) {
			return queue[name] = new AjaxQueue(override);
		},
		// 清除对应name的ajaxQueue
		destroyQueue: function(name) {
			if (queue[name]) {
				queue[name] = null;
				delete queue[name];
			}
		},
		// 根据name得到对应的ajaxQueue
		getQueue: function(name) {
			return (queue[name] ? queue[name] : null);
		}
	};
	// 跟jQuery关联起来，给个简称，方便调用
	$.AM = AjaxManager;
})(jQuery);