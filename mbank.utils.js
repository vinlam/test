/*
 * 1.弹框
 * 2.是否为空值
 * 3.是否为数字
 * 5.是否是手机号码
 * 6.是否是email地址
 * 7.获取男，女字符
 * 8.卡号，账号格式化
 * 9.金额大写
 * 10.金额格式化
 * 11.手机号遮盖4-8位
 * 12.遮盖地址里的阿拉伯数字
 * 13.去掉多余的0
 * 14.格式化金额字符串，如果为0.则返回0.00
 * 15.格式化字符串，添加逗号
 * 16.格式化字符串，删除逗号
 * 17.根据指定格式，格式化日期字符串
 * 18.格式化日期字符串转换成日期类型
 * 19.是否是货币
 * 21.格式化账号，使其格式为4444********6788;
 * 22.自定义弹框
 * 23.加法函数，用来得到精确的加法结果 
 * 24.减法函数，用来得到精确的减法结果 
 * 25.除法函数，用来得到精确的除法结果 
 * 26.乘法函数，用来得到精确的乘法结果 
 * 29.处理1-100的百分比
 * 30.根据指定的日期 和间隔天数的日期字符串 yyyymmdd
 */

/* JavaScript content from js/util.js in folder common */ 
(function($, undefined) {
	/**字符串左补0到指定位数
	 * @param {int} width
	 * @returns {string} 
	 */
	String.prototype.leftPadZero = function( width ) {
		var pad = width - this.length;
		if ( pad > 0 ){
			return ("0".times(pad) + this); 
		}else{
			return this;	
		}
	};
	/**连续count个当前字符串连接
	 * @param {int} count
	 * @returns {string} 
	 */
	String.prototype.times = function(count) {
    	return count < 1 ? '' : new Array(count + 1).join(this);
  	};
	/**将日期对象根据指定的格式格式化为字符串
	 * @param {string} format 日期格式
	 * @returns {string}
	 */
	Date.prototype.format = function( format ){
		if ( !format ){
			format = $.mbank.utils.DATE_FORMAT;
		}
		return format.replace(
			$.mbank.utils.REGEXP_DATE,
			function(str){
				switch ( str.toLowerCase() ){
					case 'yyyy': return this.getFullYear();
					case 'mm': return (this.getMonth() + 1).toString().leftPadZero(2);
					case 'dd': return this.getDate().toString().leftPadZero(2);
					case 'hh': return this.getHours().toString().leftPadZero(2);
					case 'mi': return this.getMinutes().toString().leftPadZero(2);
					case 'ss': return this.getSeconds().toString().leftPadZero(2);
					case 'ms': return this.getMilliseconds().toString().leftPadZero(3);
				}
			}.bind(this)
		);
	};
	
    $.mbank = $.mbank || {};
    $.mbank.utils = $.mbank.utils || {};
    
    $.extend( $.mbank.utils, {
		/*
		 * 常量
		 */
		REGEXP_MONEY : new RegExp(/^[0-9]*\.?[0-9]{0,2}$/),
		ACCOUNTNO_MIN : 10,			//账号最小长度
		ACCOUNTNO_MAX : 21, 		//账号最大长度
		CREDITACARDNO_MIN : 16,		//信用卡账号最小长度
		CREDITACARDNO_MAX : 16, 	//信用卡账号最大长度
		CURRENCY_MAX : 18,			//金额最大长度
		CURRENCY_NO_DOT : false,	//后台存储的金额是否没有小数点
	});
	
    $.extend($.mbank.utils, {
    	
		REGEXP_COMMA : new RegExp('\,',["g"]),
		REGEXP_DATE : new RegExp(/(yyyy|mm|dd|hh|mi|ss|ms)/gi),
		DATE_FORMAT : "yyyymmdd",
		DATE_FORMAT_DISPLAY : "yyyy年mm月dd日",
		DATE_FORMAT_SHORT : "yyyy-mm-dd",
        myAlert: function(text) {
            alert(text);
        },
        trim:function(str){
        	if(str != null){
        		return str.trim();	
        	}else{
        		return null;
        	}
        },
        isNoValue: function(str) {
            if (str == null || str == "") {
                return true;
            }
            return false;
        },
        checkNum: function(str) {
        	 var number = /^[0-9]+$/;
            return number.test(this.trim(str));
        },
        isIdValidStr: function(str) {
            var tel = /^[a-zA-Z0-9\_\-\(\)]+$/;
            return tel.test(this.trim(str));
        },
        isMobile: function(value) {
            var length = value.length;
            return length == 11 && /^[0-9]+$/.test(value);
        },
        isEmail: function(value) {
            var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return reg.test(this.trim(value));
        },
        
        /*@desc:获取男女字符
         * @par:M为男，F为女
         */
        getSexName: function(type) {
            var map = {
                "M": "男",
                "F": "女"
            };
            return map[type];
        },
        
        /* @desc：账号格式化
         * @par：
         * accountNo：预格式化的账号或卡号，
         * hide：hide参数为"hide"时，获取隐藏的账号
         * start，end，在hide为"hide"时，会读取start和end 参数，开始和结束隐藏字符*的位置，默认为倒数第8位到倒数第4位
         * @return：
         * 返回格式化后的字符串
         */
        formatAccountNo: function(accountNo, hide, start, end) {
            var formatStr = "";
            start = start || accountNo.length - 8;
            end = end || accountNo.length - 5;
            $.each(accountNo, function(index, element) {
                if (hide == "hide") {
                    if (index >= start && index <= end) {
                        element = "*";
                    }
                }
                if (index != 0 && index % 4 == 0) {
                    element = " " + element;
                }
                formatStr = formatStr + element;
            });
            return formatStr;
        },
        
        /* @desc：金额大写
         * @par：
         * num：预格式化的金额数字
         * @retur：
         * 返回对应金额的大写的字符串
         */
        numToChinese: function(num) {
            if (!/^\d*(\.\d*)?$/.test(num)) {
                $.mbank.myAlert("Number is wrong!");
                return "Number is wrong!";
            }
            var AA = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");
            var BB = new Array("", "拾", "佰", "仟", "萬", "億", "点", "");
            var a = ("" + num).replace(/(^0*)/g, "").split("."),
                k = 0,
                re = "";
            for (var i = a[0].length - 1; i >= 0; i--) {
                switch (k) {
                    case 0:
                        re = BB[7] + re;
                        break;
                    case 4:
                        if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
                            re = BB[4] + re;
                        break;
                    case 8:
                        re = BB[5] + re;
                        BB[7] = BB[5];
                        k = 0;
                        break;
                }
                if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
                if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
                k++;
            }
            if (a.length > 1) //加上小数部分(如果有小数部分)
            {
                re += BB[6];
                for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
            }
            return re;
        },
        
        /* @desc：金额格式化
         * @par：
         * money：将格式化的字符串，若money中有‘，’，返回去掉‘，’后的字符串，反之将以默认为3位格式化money字符串
         * size：分割字符串时，size可是设定位数，默认为3
         * @return：
         * 返回格式化后的字符串
         */
        moneyFormat: function(money, size) {
            var formatStr = "";
            if (money.indexOf(",") == -1) {
                var k = 0;
                var sp = size || 3;
                for (var i = money.length; i > 0; i--,k++) {
                    if ((k % sp == 0) && (k != 0)) {
                        formatStr = money[i - 1] + "," + formatStr;
                    } else formatStr = money[i - 1] + formatStr;
                }
                return formatStr;
            } else {
                $.each(money, function(index, element) {
                    if (element == ',' || element == ' ') {
                        return true;
                    }
                    formatStr = formatStr + element;
                });
                return formatStr;
            }
        },
        /*  @desc：手机号遮盖4-8位
         * @par：
         * accountNo：预格式化的手机号，
         * start，end， ，会读取start和end 参数，开始和结束隐藏字符*的位置，默认为倒数第8位到倒数第4位
         * @return：
         * 返回格式化后的字符串
         */
        formatPhoneNoHide: function(phoneNo,start, end) {
            var formatStr = "";
            start = start || phoneNo.length - 7;
            end = end || phoneNo.length - 3;
            $.each(phoneNo, function(index, element) {
                    if (index >= start && index <= end) {
                        element = "*";
                    }
                formatStr = formatStr + element;
            });
            return formatStr;
        },        
        /* @desc：遮盖地址里的阿拉伯数字
         * @par：
         * address：预格式化的地址，
         * @return：
         * 返回格式化后的字符串
         */
        formatAddress: function(address ) {
            var formatStr = "";
            $.each(address, function(index, element) {
                if (/^\d*(\.\d*)?$/.test(element)) {
                	 element = "*";
                }
                formatStr = formatStr + element;
            });
            return formatStr;
        },
        /*@desc:将小数保留小数位并四舍五入
         * @number 需要处理的数据
         * @digits 保留位数
         */
        preaseDoubleString:function(munber,digits){
        	if (munber == undefined) munber = '0';
			if (digits == undefined) digits = 2;
			
			if (typeof munber !== 'string') {
				munber = munber.toString();
			}
			
			munber = parseFloat(munber);
			munber = munber.toFixed(digits);
			return munber.toString();
        },
        /*  @desc：格式化金额字符串
         * @par：
         * cash：，
         * dot：，
         * digits：，
         * @return：
         * 返回格式化后的字符串
         */            
		prepareCashString: function( cash, dot, digits ) {
			if (cash == undefined) cash = '0';
			if (dot == undefined) dot = true;
			if (digits == undefined) digits = 2;
			
			if (typeof cash !== 'string') {
				cash = cash.toString();
			}
			cash = $.mbank.utils.removeComma(cash);
			
			//TODO检查是否金额
			// 处理包含正负符号的情况
			var prefix = cash.charAt(0);
			if ( prefix == "-" || prefix == "+" ){
				return prefix + $.mbank.utils.prepareCashString( cash.substr(1), dot, digits );
			}
			
			if (cash.indexOf('.') != -1) {
				dot = true;	//如果输入串本身包含小数点，则忽略dot参数的设置，认为是真实金额大小
			}
			var integerCash, decimalCash;
			if (!dot) {
				if (cash.length <= digits) {
					cash = cash.leftPadZero(digits+1);
				}
				integerCash = cash.substring(0, cash.length - digits);
				decimalCash = cash.substring(cash.length - digits);
			} 
			else {
				var dotPos = cash.indexOf('.');
				if (dotPos != -1) {
					integerCash = cash.substring(0, dotPos);
					decimalCash = cash.substring(dotPos + 1);
				} 
				else {
					integerCash = cash;
					decimalCash = '';
				}
				if (integerCash.length == 0)
					integerCash = '0';
				if (decimalCash.length < digits) {
					decimalCash += '0'.times(digits - decimalCash.length);
				} 
				else {
					decimalCash = decimalCash.substring(0, digits);		//TODO 考虑四舍五入
				}
			}
			
			//去掉头部多余的0
			while (integerCash.charAt(0) == '0' && integerCash.length>1) {
				integerCash = integerCash.substring(1);
			}
			cash = integerCash + '.' + decimalCash;
			
			return cash;
		},
        /* @desc：格式化，如果为0.则返回0.00
         * @par：
         * cash：，
         * dot：，
         * digits：
         * @return：
         * 返回格式化后的字符串
         */        
    	toCashWithCommaReturn0: function( cash, dot, digits ) {
    		if (cash != null && typeof cash !== "string") {
    			cash = cash.toString();
    		}
    		if(cash == '' || cash == null){
    			return '';
    		}
    		else {
    			var temp = $.mbank.utils.prepareCashString( cash, dot, digits );
    			
    			var dotPos = temp.indexOf('.');
    			var integerCash = temp.substring(0, dotPos);
    			var decimalCash = temp.substring(dotPos + 1);
    		
    			// 处理包含正负符号的情况
    			var prefix = integerCash.charAt(0);
    			if ( prefix == "-" || prefix == "+" ) {
    				temp = prefix + $.mbank.utils.addComma(integerCash.substring(1)) + '.' + decimalCash;
    			} 
    			else {
    				temp = $.mbank.utils.addComma(integerCash) + '.' + decimalCash;
    			}
    			return temp;
    		}
    	},
        /* @desc：格式化字符串，添加逗号
         * @par：
         * str：预格式化的字符串，
         * @return：
         * 返回格式化后的字符串
         */     	
		addComma: function(str) {
			if(str == null || $.trim(str) == ""){
				return "";
			}
			
			str = $.trim(str);
			
			if (str.length > 3) {
				var mod = str.length % 3;
				var output = (mod > 0 ? (str.substring(0,mod)) : '');
				for (var i=0 ; i < Math.floor(str.length / 3); i++) {
					if ((mod == 0) && (i == 0))
						output += str.substring(mod+ 3 * i, mod + 3 * i + 3);
					else
						output += ',' + str.substring(mod + 3 * i, mod + 3 * i + 3);
				}
				return (output);
			}
			else 
				return str;
		},
        /* @desc：格式化字符串，删除逗号
         * @par：
         * str：预格式化的字符串，
         * @return：
         * 返回格式化后的字符串
         */  
		removeComma: function(str){
			return str.replace($.mbank.utils.REGEXP_COMMA,'');
		},
        /*  @desc：格式化日期字符串
         * @par：
         * date：预格式化的日期字符串，
         * outFormat：要格式化成的格式
         * @return：
         * 返回格式化后的字符串
         */  		
		formatDate: function(date, outFormat ) {
			if(date == '' || date == null){
				return '';
			}
			else {
				var parsedDate = $.mbank.utils.parseDate( date, $.mbank.utils.DATE_FORMAT );
				if( outFormat && typeof outFormat === "string" ) {
					return parsedDate.format( outFormat );
				}
				else {
					return parsedDate.format( $.mbank.utils.DATE_FORMAT_SHORT );	
				}
			}
		},
		
		/*  @desc：格式化日期字符串
         * @par：
         * date：预格式化的日期字符串，
         * inFormat :输入的日期字符串的格式
         * outFormat：要格式化成的格式
         * @return：
         * 返回格式化后的字符串
         */  		
		formatDate2: function(date,inFormat,outFormat) {
			if(date == '' || date == null||inFormat =='' ||inFormat ==null || outFormat == '' || outFormat == null){
				return '';
			}
			
			var parsedDate = $.mbank.utils.parseDate(date,inFormat);
			return parsedDate.format(outFormat);	
			
		},
		
		/**  @desc：格式化日期字符串转换成日期类型
		 * @param dateString
		 * @param format
		 * @returns {Date}
		 */
		parseDate: function( dateString, format ){
			var year=2000,month=0,day=1,hour=0,minute=0,second=0;
			format = format ||  $.mbank.utils.DATE_FORMAT;
			var matchArray = format.match( $.mbank.utils.REGEXP_DATE );
			for (var i = 0; i < matchArray.length; i++ ) {
				var postion =format.indexOf( matchArray[i] );
				switch (matchArray[i]) {
					case "yyyy":{
						year = parseInt( dateString.substr(postion,4), 10 );
						break;
					}
					case "mm":{
						month = parseInt( dateString.substr(postion,2), 10 )-1;
						break;
					}
					case "dd":{
						day = parseInt( dateString.substr(postion,2), 10 );
						break;
					}
					case "hh":{
						hour = parseInt( dateString.substr(postion,2), 10 );
						break;
					}
					case "mi":{
						minute = parseInt( dateString.substr(postion,2), 10 );
						break;
					}
					case "ss":{
						second = parseInt( dateString.substr(postion,2), 10 );
						break;
					}
				}
			}
			return new Date(year,month,day,hour,minute,second);
		},

		/** 检查字符串是否为合法的金额
		* @param {string} s 字符串
		* @returns {boolean} 是否为合法金额
		*/
		isMoney: function(s) {
		    return ( $.mbank.utils.REGEXP_MONEY.test(s) );
		},
	
		/**格式化账号，使其格式为4444********6788 */
		dealAccountNoHide: function( cash, dot, digits ) {
			if (cash != null && typeof cash !== "string") {
				cash = cash.toString();
			}
			if(cash == '' || cash == null||cash==undefined){
				return '';
			}
			else {
				var temp;
				cash = $.trim(cash);
				if(cash.length>=12){
					temp = cash.substring(0,4)+"********"+cash.substring(cash.length-4,cash.length);
				}else{
					temp = cash;
				}
			}
			return temp;
		},

        /* 加法函数，用来得到精确的加法结果 
         * 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。 
         * 调用：accAdd(arg1,arg2) 
         * 返回值：arg1加上arg2的精确结果 
         */
		accAdd:function (arg1,arg2){
			var r1, r2, m;
			try {
				r1 = arg1.toString().split(".")[1].length
			} catch (e) {
				r1 = 0
			}
			try {
				r2 = arg2.toString().split(".")[1].length
			} catch (e) {
				r2 = 0
			}
			m = Math.pow(10, Math.max(r1, r2))
			return (arg1 * m + arg2 * m) / m
		},
		/*  减法函数，用来得到精确的减法结果
         * 说明：javascript的减法法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法法结果。 
         * 调用：accAdd(arg1,arg2) 
         * 返回值：arg1减上arg2的精确结果 
		*/
		 accSub:function(arg1,arg2){
		    var r1,r2,m,n;
		    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
		    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
		    m=Math.pow(10,Math.max(r1,r2));
		    //last modify by deeka
		    //动态控制精度长度
		    n=(r1>=r2)?r1:r2;
		    return ((arg1*m-arg2*m)/m).toFixed(n);
		},
		/* 除法函数，用来得到精确的除法结果 
		 * 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
		 * 返回值：arg1除以arg2的精确结果 
		 */
		accDiv:function(arg1,arg2){ 
			var t1=0,t2=0,r1,r2; 
			try{t1=arg1.toString().split(".")[1].length}catch(e){} 
			try{t2=arg2.toString().split(".")[1].length}catch(e){} 
			with(Math){ 
			r1=Number(arg1.toString().replace(".","")) 
			r2=Number(arg2.toString().replace(".","")) 
			return (r1/r2)*pow(10,t2-t1); 
			} 
		},
		/* 乘法函数，用来得到精确的乘法结果 
		 * 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。 
		 * 调用：accMul(arg1,arg2) 
		 * 返回值：arg1乘以arg2的精确结果 
		 */
		accMul:function(arg1,arg2){
			var m=0,s1=arg1.toString(),s2=arg2.toString(); 
			try{m+=s1.split(".")[1].length}catch(e){} 
			try{m+=s2.split(".")[1].length}catch(e){} 
			return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) ;
		},
		
		/** 处理1-100的百分比  */
		toPercentRate0: function (rate){//处理1-100的百分比
			if($.mbank.utils.isNoValue(rate) ){
				return '';
			}
			if ( parseFloat(rate) == 0 ) {
				return '';
			}
			var temp = parseFloat(rate);
			return temp+"%";
		},
		/** 根据指定的日期 和间隔天数的日期字符串 yyyymmdd
		 */
		countdisDate:function(dayCount,getSysDate){
			var sysDate = getSysDate;
			var year = sysDate.substring(0,4);  //年
			var month = sysDate.substring(4,6); //月
			var day = sysDate.substring(6,8);  //日
			var nowDate = new Date(year,month-1,day);
			//var sureMonth= nowDate.getMonth()-monthCount;   //当前日期减去业务需求月
			nowDate.setDate(nowDate.getDate()-dayCount);
			//nowDate.setMonth(sureMonth);
			var endMonth = nowDate.getMonth()+1+"";
			var endDay = nowDate.getDate()+"";
			if(endMonth.length==1){
				endMonth = "0"+endMonth;
			}
			if(endDay.length==1){
				endDay = "0"+endDay;
			}
			return nowDate.getFullYear()+""+endMonth+""+endDay;
		},
		/** 
		 * JS克隆对象
		 * @param  source   目标对象
		 * 返回值：结果对象
		 */
		deepCopy:function(source){
			var result={};
			for (var key in source) {
			      result[key] = typeof source[key]==='object'? $.mbank.utils.deepCopy(source[key]):source[key];
			} 
			return result;
		},
		/**判断某个html元素的显示状态*/
		isHidden:function(domId){
		    var rect = document.getElementById(domId).getBoundingClientRect();
		    return !!!(rect.bottom - rect.top);
		},
		 /** 
		 * 删除影像文件，删除前先判断是否还有未上传的
		 * @param  filePath  文件路径
		 * 返回值：结果对象
		 */
		deleteMedioFile:function(filePath){	
			if(filePath != null && filePath!=""){
				var  fileName;
				var param={};
				if (filePath.indexOf("/") > 0) //如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
					{
						fileName = filePath.substring(filePath.lastIndexOf("/") + 1, filePath.length);
					} else {
						fileName = filePath;
					}
				param.fileName = fileName;
				$.mbank.pajax("/common/queryMedioFileIsUpload.do",param,function(data){
				    if(data.ec=="0"){			    	
				    	if(data.isCanDelete){
				    		$.mbank.removeFileWithPath(('_doc/'+fileName));
				    	}			    	
					}else{
						$.mbank.myAlert("通信错误，请稍后再试！");
					}
				});
			}else{
				$.mbank.myAlert("文件路径不正确！");
			}
		},
		/*创建校验提示框*/
		createTipsDiv : function(){
			var tipsDiv = document.getElementById("_tipsDiv_1_");
			if (tipsDiv == null) {
				var borderColor = "#F7CE39";//边框色
				var backgroundColor = "#FFFFE0";//背景色
				var fontColor = "#333";//字体颜色
				var triangleSize = 6;//三角形的大小(单位是px)
				var tipsText = "";
				var tipsCssText = "border-radius: 5px;font-size: 15px;padding: 5px 10px;z-index: 999;position: absolute;";
				tipsCssText +=  "border: 1px solid " + borderColor + ";";
				tipsCssText +=  "background-color: " + backgroundColor + ";";
				tipsCssText +=  "color: " + fontColor + ";";
				tipsCssText +=  "top: -50px; left: 0px;";
				
				//提示文字DIV
				tipsDiv = document.createElement('div');
			    tipsDiv.id = '_tipsDiv_1_';
			    tipsDiv.style.cssText = tipsCssText;
			    tipsDiv.innerText = tipsText;
			    document.body.appendChild(tipsDiv);
			    
			    //居中DIV
				var centerDivCssText = "";
				centerDivCssText += "width: " + 2 * triangleSize + "px;";
				centerDivCssText += "margin-left: " + (-1 * triangleSize) + "px;";
				centerDivCssText += "height: " + triangleSize + "px;";
				centerDivCssText += "bottom: " + (-1 * triangleSize) + "px;";
				centerDivCssText += "left: 50%;overflow: hidden; position: absolute; text-indent: 0px;";
				
				var centerDiv = document.createElement('div');
			    centerDiv.style.cssText = centerDivCssText;
			    tipsDiv.appendChild(centerDiv);
			    
			    //三角DIV1
				var beforeCssText = "top:0px;border-style: solid dashed dashed;width: 0px;height: 0px;position: absolute;overflow: hidden;"
				beforeCssText += "border-width: " + triangleSize + "px;";
				beforeCssText += "border-color: " + borderColor + " transparent transparent;";
				
				var beforeDiv = document.createElement('div');
			    beforeDiv.style.cssText = beforeCssText;
			    centerDiv.appendChild(beforeDiv);
			    
			    //三角DIV2
			    var afterCssText = "top:-1px;border-style: solid dashed dashed;width: 0px;height: 0px;position: absolute;overflow: hidden;"
				afterCssText += "border-width: " + triangleSize + "px;";
				afterCssText += "border-color: " + backgroundColor + " transparent transparent;";
				
				var afterDiv = document.createElement('div');
			    afterDiv.style.cssText = afterCssText;
			    centerDiv.appendChild(afterDiv);
		   	}
			return tipsDiv;
		},
		/**
		 * !! 必须自定义属性checkType
		 * @param  domId 校验元素所在的div的id
		 * @param  checkAll 是否校验全部内容,为空时 只校验带有样式import的label元素对应的输入框或者下拉项。
		 * 页面使用示例： <label class="import">客户名称</label>
		 * <input id="custName" type="text" value="" checkType="text-2-10"/>
		 * 其中 checkType 的值以 - 分割，第一个值是校验类型，后续的参数是辅助校验参数，例如text的最小长度及最大长度
		 * 示例 ：var checkPass = $.mbank.utils.valid("addCust",false);
		 * */
		valid:function(domId,checkAll){
			var selectorStr = "div#" + domId + " label.import";
			if (checkAll) {
				selectorStr = "div#" + domId + " label";
			}
			var chkPass = true;
			var triangleSize = 6;//三角形的大小(单位是px)
			$(selectorStr).each(function(){
				var _this = $(this);
				var checkNull = _this.hasClass('import');//必填项校验非空
				//要求被校验的dom和label的dom层级一样或者更深
				var chkObj = _this.parent().next().find('input[checkType],textarea[checkType]').eq(0);//只考虑找到一个的情况
				var tipsText = null;//null代表校验通过
				if (chkObj.attr("id") != null) {
					//输入框
					var _val = chkObj.val().trim();
					if(chkObj[0].type=="number"&&chkObj[0].validity.valid==false){
						_val = 'a';//赋值让校验不通过而已(因为number类型H5校验失败时，value取到的是空值)
					}
					if (_val == "") {
						tipsText = (checkNull == true) ? "请输入" + _this.text() : null;
					}else{
						var chkType = chkObj.attr("checkType");
						chkType = chkType == null ? [""] : chkType.split('-');
						switch (chkType[0]) {
							case "text":
								{
									//正则表达式校验
								}
								break;
							case "number":
								{
									if (!$.mbank.utils.checkNum(_val)) {
										tipsText = "请输入数字";
									}
								}
								break;
							case "number1":
								{
									if (!$.mbank.utils.checkNum(_val) || parseInt(_val)<1) {
										tipsText = "数量必须是大于1的数字";
									}
								}
								break;
								
							case "email":
								{
									if (!$.mbank.utils.isEmail(_val)) {
										tipsText = "邮件格式不正确";
									}
								}
								break;
							case "float":
								{
									if (!new RegExp(/^\-?[0-9]*\.?[0-9]{0,6}$/).test(_val)) {
										tipsText = "格式不正确";
									}
								}
								break;
							case "phone":
								{	
									if (_val.length != 11) {
										tipsText = "号码长度不正确";
									}else if (!new RegExp("^1\\d{10}$").test(_val)) {
										tipsText = "号码格式不正确";
									}
								}
								break;
							default:
								break;
						}
					}
				} else {
					//下拉框
					chkObj = _this.parent().next().find('a[checkType]').eq(0);
					var _val = chkObj.text().trim();
					if (chkObj.attr("id") != null && (_val == "请选择" || _val=="")) {
						tipsText = "请选择" + _this.text();
					}
				}
				//弹出提示框
				if (tipsText != null) {
					chkPass = false;
					var tip = $.mbank.utils.createTipsDiv();
					tip.innerHTML = tipsText.replace(/\s/g,"") + tip.innerHTML.substring(tip.innerHTML.indexOf('<div'));
					tip.style.display = "block";
					var tipTop = chkObj.offset().top - tip.offsetHeight - triangleSize;
					tip.style.top = tipTop + "px";
					tip.style.left = (chkObj.offset().left + (chkObj.outerWidth() - tip.offsetWidth) / 2) + "px";
					document.getElementById(chkObj.attr('id')).addEventListener("tap", function() {
						tip.style.display = "none";
					}, false);
					if (tipTop < document.body.scrollTop) {
						document.body.scrollTop -= tipTop;
					}
					return false;
				}
			});
			return chkPass;
		},
		/**
		 * 计算两个整形数字符串相加的值,不支持负数
		 * */
		addInt: function(a, b) {
			var reg =  new RegExp("^[0-9]+$");
			if (a == null || b == null || !reg.test(a)|| !reg.test(b)) {
				return null;
			} else {
				a = a.toString();
				b = b.toString();
				var result = "";
				var forward = 0; //进位初始值必须为0
				var cnt = 100; //
				while (cnt > 0 && b.length > 0 && a.length > 0) {
					cnt--; //防止死循环而已
					var lastA = a.charAt(a.length - 1);
					a = a.substring(0, a.length - 1); //去掉最后一个字符
					var lastB = b.charAt(b.length - 1);
					b = b.substring(0, b.length - 1); //去掉最后一个字符
					var c = parseInt(lastA) + parseInt(lastB) + forward;
					if (c >= 10) {
						forward = 1; //进位1
						result = (c - 10).toString() + result;
					} else {
						forward = 0; //进位0
						result = c.toString() + result;
					}
				}
				var d = a + b; //a,b之中肯定有一个是空字符串,所以相加的结果就是其中一个
				if (forward == 0) {
					result = d + result;
				} else {
					if (d == "") {
						//a,b的长度一样
						result = forward.toString() + result;
					} else {
						//a,b的长度不一样
						var n = 100;
						while (n > 0 && d.length > 0) {
							n--; //防止死循环而已
							var lastD = d.charAt(d.length - 1);
							d = d.substring(0, d.length - 1); //
							var add = parseInt(lastD) + forward;
							if (add >= 10) {
								forward = 1; //加法进位数只会是1
								result = (add - 10).toString() + result;
							} else {
								forward = 0; //进位0
								result = add.toString() + result;
							}
						}
					}
				}
				if (forward == 1) {
					result = forward.toString() + result;
				}
				return result;
			}
		},
		/**
		 * 移除小数点后的无用0
		 */
		removeZero : function(str){
			if (typeof str !== 'string') {
				str = str.toString();
			}
			if(str.indexOf('.')>-1){
				var lastIndx = str.length-1;
				while (lastIndx > 0 && str.charAt(lastIndx)=='0'){
					str = str.substr(0,lastIndx);
					lastIndx--;
				}
				if(str.charAt(lastIndx)=='.'){
					str = str.substr(0,lastIndx);
				}
			}
			return str;
		},
		
		//获取协议内容
		getProtocol:function (protocolCode) {
			var reqData = {};
			reqData.protocolCode =protocolCode ;
			$.mbank.pajax("/protocol/getByCode.do", reqData, function(data) {
				if ('0' == data.ec) {
					$("#"+protocolCode).append(data.result.content);
					
					//var nDivHeight = $("#"+protocolCode).height();
					//alert(nDivHeight+"--"+$("#"+protocolCode)[0].scrollHeight + "=="+ $("#"+protocolCode)[0].clientHeight)
					if($("#"+protocolCode)[0].scrollHeight == $("#"+protocolCode)[0].clientHeight){
						$(".nextBtn").removeClass("nextBtn-default").addClass("nextBtn-primary");
					}
				} else {
					$.mbank.myAlert(data.em);
				}
			});
		},
		
		//获取理财协议内容
		getFinancialProtocol:function (protocolCode,productCode,investPeriod,prdType) {
			var reqData = {};
			reqData.protocolCode =protocolCode ;
			reqData.productCode = productCode;
			reqData.investPeriod = investPeriod;
			reqData.prdType = prdType;
			$.mbank.pajax("/protocol/getByCodeAndProductCode.do", reqData, function(data) {
				if ('0' == data.ec) {
					$("#financialProtocolId").append(data.result.content);
					if($("#financialProtocolId")[0].scrollHeight == $("#financialProtocolId")[0].clientHeight){
						$(".nextBtn").removeClass("nextBtn-default").addClass("nextBtn-primary");
					}
				} else {
					$.mbank.myAlert(data.em);
				}
			});
		},
		//签名成功更新签名状态
		/**
		 * @flowFlag 文件上传流水
		 * @pdfId 凭证ID
		 * @pdfCode 凭证模板编号  
		 */
		signNameSuccess:function (flowFlag,pdfID,pdfCode) {
			var reqData = {};
			reqData.flowFlag =flowFlag ;
			reqData.pdfId = pdfID;
			reqData.pdfCode = pdfCode;
			$.mbank.pajax("/common/updateSignStatus.do", reqData, function(data) {
				if ('0' == data.ec) {
				} else {
					$.mbank.myAlert(data.em);
				}
			});
		},
		/**
		 * @flowNo 业务流水号
		 * @pdfId 凭证ID
		 * @pdfCode 凭证模板编号  
		 */
		signNameAfterSuccess:function (flowNo,pdfID,pdfCode) {
			var reqData = {};
			reqData.flowNo =flowNo ;
			reqData.pdfId = pdfID;
			reqData.pdfCode = pdfCode;
			$.mbank.pajax("/common/updateSignAfterStatus.do", reqData, function(data) {
				if ('0' == data.ec) {
				} else {
					$.mbank.myAlert(data.em);
				}
			});
		},
		//签名成功更新签名状态
		/**
		 * @flowNo 业务流水号
		 * @pdfId 凭证ID
		 * @pdfCode 凭证模板编号  
		 * @tranDate 交易日期
		 */
		getSignNameAfterTemplate:function (bizType,flowNo,templateFlag) {		
			var reqData = {};
			reqData.flowNo =flowNo ;
			reqData.bizType = bizType;
			if(templateFlag != '' && typeof(templateFlag) != 'undefined'){//理财时传入参数判断类型
				 reqData.templateFlag = templateFlag;
		        }
			
			//----------下载模板开始-----------
			$.mbank.pajax("/signnameafter/getSignNameAfterTemplate.do",reqData,function(data) {
				if (data.ec == "0") {
					var pdfID = data.result.pdfID;
					var filestr = data.result.filestr;
					$.mbank.showWaiting("下载签名模板中...", {
						back : "none"
					});
					var url = serverPath + data.result.url;			
					var dtask = plus.downloader.createDownload( url, {method:"GET",filename:sign_pdf_url}, function ( d, status ) {
						$.mbank.closeWaiting();
						// 下载完成					
						if ( status == 200 ) {
							var filename = d.filename.replace("_","");
							var screenHeight = plus.screen.resolutionHeight * plus.screen.scale;
							var screenWidth = plus.screen.resolutionWidth * plus.screen.scale;
							var param = {};
							param.filename = filename;
							param.mPenColor = 0x333333;//手写画笔颜色
					        param.mPensize = 5;//手写画笔尺寸
					        param.mHandwrittingX = 0;//手写控件左上X坐标
					        param.mHandwrittingY = 300;//手写控件左上Y坐标
					        param.mHandwrittingWidth = parseInt(screenWidth - screenWidth * 0.1 *2);//手写控件宽度
					        param.mHandwrittingHeight = parseInt(screenHeight * 0.9);//手写控件高度
					        if(templateFlag != '' && typeof(templateFlag) != 'undefined'){//理财时传入参数开启抄录
					        	if(templateFlag!='Risk'){
						        	param.copyflag = true;
						        	param.cPenColor = 0x333333;//手写画笔颜色
							        param.cPensize = 5;//手写画笔尺寸
							        param.cHandwrittingX = 0;//手写控件左上X坐标
							        param.cHandwrittingY = 400;//手写控件左上Y坐标
							        param.cHandwrittingWidth = parseInt(screenWidth - screenWidth * 0.1 *2);//手写控件宽度
							        param.cHandwrittingHeight = parseInt(screenHeight * 0.75);//手写控件高度
					        	}
					        }
					        //alert(JSON.stringify(param));
							plus.pluginSign.signature(param,true,function(data2){
								var p = {};
								p.pdfID = pdfID;
								p.filestr = filestr;
								p.signPic = data2.bit;
								p.flowno = flowNo;
								//$.mbank.showTip(flowNo);
								if(templateFlag != '' && typeof(templateFlag) != 'undefined'){
									p.copyPic = data2.copybit;//抄录数据
								}
								var signActionUrl;
								var pcode;
								//提交签名信息
								//根据不同业务ID获取
								if(bizType == "0" ){//开卡
									signActionUrl = "/Signature/cardSignA.do";//签名请求类
									pcode ="p008";//模板编号
								}else if(bizType == "1"){//签约
									signActionUrl = "/Signature/cardSignA.do";//签名请求类
									pcode ="p008";//模板编号
								}else if(bizType == "3"){//客户信息修改
									signActionUrl = "/Signature/custInfoModifySign.do";//签名请求类
									pcode ="p009";//模板编号
								}else if(bizType == "4"){//理财购买
									signActionUrl = "/Signature/signFinancialSubmit.do";//签名请求类
									switch(templateFlag){
										case 'Fin':
											pcode ="p001";//模板编号
											break;
										case 'Fun':
											pcode ="p002";//模板编号
											break;
										case 'Golden':
											pcode ="p003";//模板编号
											break;
									}
								}else if(bizType == "6"){//理财风评
									signActionUrl = "/Signature/signRiskRating.do";//签名请求类
									pcode ="p010";
								}else if(bizType == "8"){//票据购买
									signActionUrl = "/Signature/signFinancialSubmit.do";//签名请求类
									pcode ="p006";//模板编号
								}else if(bizType == "9"){//开立客户号
									signActionUrl = "/Signature/cardSignA.do";//签名请求类
									pcode ="p008";//模板编号
								}else if(bizType == "10"){//理财签约
									signActionUrl = "/Signature/signFinancialContract.do";//签名请求类
									pcode ="p011";
								}else{
									$.mbank.myAlert("业务类型参数不正确");
									return;
								}								
								//-----------签名开始--------------
								$.mbank.pajax(signActionUrl,p,function(data3) {
									if(data3.ec == "0"){
										$.mbank.showWaiting("签名结果下载中...",{back:"none"});
															
										var downUrl = ""; 
//										if(downUrl.indexOf("http") > -1 ){
//											downUrl = data3.result.url;
//										}else{
//											downUrl = serverPath + data3.result.url;
//										}
										downUrl = cfcaServerPath + pdfID;
										
										//---------签名结果展示开始-----------
										plus.downloader.createDownload(downUrl, {
											method:"GET",
											filename:sign_pdf_url
										},function(d4, status) {
											$.mbank.closeWaiting();
											if (status == 200) {
												var filename = d4.filename.replace("_","");
												var p2 = {};
												p2.filename = filename;
												plus.pluginSign.signature(p2,false,function(data5){
													//删除pad上的模板
													$.mbank.removeFileFromDir(sign_pdf_url);
													$.mbank.openWindow('busiQuery.html','busiQueryView');
													$.mbank.pageFire('busiQueryView',"dataEvent",{'pid':$.mbank.currentPage().id});
													$.mbank.showTip("电子签名补签完成");
												},function(e){
													$.mbank.myAlert(e.message);
												});
											} else {
												$.mbank.myAlert("签名结果下载失败！");
											}
											
											$.mbank.utils.signNameAfterSuccess(flowNo,pdfID,pcode);		
										}).start(); 
										//--------签名结果展示结束------------
									
										
									}else if(data.ec == "1"){
										$.mbank.myAlert("签名结果提交展示：" + data.em);
									}
								},function(data) {
									$.mbank.myAlert("签名提交失败");
								});	
								//-----------签名结束--------------
							},function(e){
								$.mbank.myAlert(e.message)
							});
						} else {
							$.mbank.myAlert("PDF签名模板下载失败！" + status);
						}
					});
					dtask.start(); 
				} else if (data.ec == "1") {
					$.mbank.myAlert("请求出错" + data.em);
				}
			},
			//----------下载模板结束-----------
			function(data) {
				$.mbank.myAlert("获取签名文件失败，请重新尝试");
			});
		},//图片路径，图片id
		compressImg:function(path,imgId){
			var img = new Image();
			img.src = path;     
			img.onload = function () {      
				var that = this;
				//生成比例 
				var w = that.width,
				h = that.height,
				scale = w / h; //$.mbank.showTip(w);
				w = 200 || w;  //200  你想压缩到多大
				h = w / scale;
				//$.mbank.showTip("w:"+w);
				//生成canvas
				var canvas = document.createElement('canvas');

				var ctx = canvas.getContext('2d');

				$(canvas).attr({width : w, height : h});

				ctx.drawImage(that, 0, 0, w, h);

				var base64 = canvas.toDataURL('image/jpeg', 1 || 0.8 );   //1z 表示图片质量，越低越模糊。
				var pic = document.getElementById(imgId);    
				pic.src = base64;                   
			}
		},
		checkPwdLen:function(id){
			var target = document.getElementById(id);
			//alert(target.value.length);
			if(target.value.length < 6){
				$.mbank.showTip("密码长度少于6位，请重新输入！");
				return false;
			}
			return true;
		},
		//约束输入信息的字节数
		/**
		 * @objId 对象ID
		 * @valNum 字节数
		 */
		restrictLength:function(objId,valNum){
			var inputNum = $("#"+objId).val().replace(/[^\x00-\xff]/g, "**").length;
		    if (inputNum > valNum) {
		    	var str = $("#"+objId).val();
		    	$("#"+objId).val(str.substring(0,str.length-1));
		    }
		},
		//加载业务参数
		loadBusinessParam:function () {
			var reqData = {};
			$.mbank.pajax("/businessParam/loadBusinessParam.do", reqData, function(data) {
				if ('0' == data.ec) {
					var businessParamData = JSON.stringify(data.result);
					$.mbank.addStorageItem("businessParamData",businessParamData);
				} else {
					$.mbank.showTip(data.em);
				}
			});
		},
		//校验客户经理编号
		checkManagerNo:function (number,flag,clearObjId) {
			var result = false; 
			if(number != '' && number != null && number != undefined){
				$.mbank.pajax_sync("/purchase/checkClientManager.do",{"clientManager":number,"flag":flag},function(data){
					if(data.ec == '0'){
						result = true;
					}else{
						$.mbank.showTip(data.em);
						$("#"+clearObjId).val("");
					}
				})
			}
			return result;
		},
		//弹出提示框
		showDialog:function (title,cont,fn){
			var obj = document.createElement("div");
			obj.className = "market-alpha";
			obj.innerHTML = '<div class="market-dialog">'+
								'<div class="market-dialog-inner">'+
									'<h3 class="market-dialog-title">'+title+'</h3>'+
									'<div class="market-dialog-cont">'+cont+'</div>'+
								'</div>'+
								'<div class="market-dialog-buttons">'+
									'<span class="market-dialog-button" style="margin-left:33%;" id="market-dialog-close">取消</span>'+
									'<span class="market-dialog-button" style="margin-left:33%;" id="market-dialog-sure">确定</span>'+
								'</div>'+
							'</div>';
			document.body.appendChild(obj);
			$(obj).fadeIn();
			
			document.getElementById("market-dialog-sure").addEventListener("tap",function(){
				$(obj).hide();
				$(obj).remove();
				fn();
			});
			
			document.getElementById("market-dialog-close").addEventListener("tap",function(){
				$(obj).hide();
				$(obj).remove();
			})
		},
		//判断对象是否为空
		isEmptyObject:function(obj) {  
			var i;  
			for (i in obj)  
    			return true;  
			return false;  
		},
		//四舍五入保留n位小数（不够位数，则用0替补）
		keepDecimal:function(num,digits) {
			var result = parseFloat(num);
			if(isNaN(result)) {
				alert('传递参数错误，请检查！');
				return false;
			}
			if(isNaN(digits)){
				digits = 2;//默认保留两位
			}
			var a = Math.pow(10,digits);
			result = Math.round(num * a) / a;
			//result = Math.round(num * 100) * 0.01;
			//result = Math.round(num * 1000) * 0.001;//保留3位小数
			var s_x = result.toString();
			var pos_decimal = s_x.indexOf('.');
			if(pos_decimal < 0) {
				pos_decimal = s_x.length;
				s_x += '.';
			}
			while(s_x.length <= pos_decimal + digits) {
				s_x += '0';
			}
			return s_x;
		}
    });
})(jQuery)