layui.define(["form", "jquery"], function(exports) {
	var form = layui.form,
		$ = layui.jquery,
		MultilevelLinkage = function() {};

	MultilevelLinkage.prototype.provinces = function(code) {
		//加载省数据
		var proHtml = '',
			that = this;
		$.get("MultilevelLinkage.json", function(data) {
			for(var i = 0; i < data.length; i++) {
				proHtml += '<option value="' + data[i].code + '">' + data[i].name + '</option>';
			}
			//初始化省数据
			$("select[name=province]").append(proHtml);
			form.render();

			form.on('select(province)', function(proData) {
				//$("select[name=area]").html('<option value="">请选择县/区</option>');
				var value = proData.value;
				if(value > 0) {
					if(code && code[1] && code[2]) {
						that.citys(data[$(this).index() - 1].childs, code[1], code[2]);
						code = null;
					} else if(code && code[1]) {
						that.citys(data[$(this).index() - 1].childs, code[1]);
						code = null;
					} else {
						that.citys(data[$(this).index() - 1].childs, (data[$(this).index() - 1].childs)[0].code);
					}
				} else {
					$("select[name=city]").attr("disabled", "disabled");
					$("select[name=city]").siblings("div").addClass("layui-select-disabled");
					$("select[name=city]").next().find("input").addClass("layui-disabled");
					var cityHtml = '<option value="">请选择市</option>';
					$("select[name=city]").html(cityHtml);
					$("select[name=area]").attr("disabled", "disabled");
					$("select[name=area]").siblings("div").addClass("layui-select-disabled");
					$("select[name=area]").next().find("input").addClass("layui-disabled");
					var areaHtml = '<option value="">请选择县/区</option>';
					$("select[name=area]").html(areaHtml);
					form.render();
					//$("select[name=city]").next().find("dd.layui-select-tips").trigger('click');

				}
			});
			if(code && code[0]) {
				$("select[name=province]").next().find("dd[lay-value='" + code[0] + "']").trigger('click');
			}
			//$("select[name=province]").next().find('input').val('北京市');
			//$("select[name=province]").find("option[value='11']").attr("selected", true);
		})
	}

	//加载市数据
	MultilevelLinkage.prototype.citys = function(citys, code, areacode) {
		var cityHtml = '<option value="">请选择市</option>',
			that = this;
		for(var i = 0; i < citys.length; i++) {
			cityHtml += '<option value="' + citys[i].code + '">' + citys[i].name + '</option>';
		}
		$("select[name=city]").html(cityHtml).removeAttr("disabled");
		form.render();
		form.on('select(city)', function(cityData) {
			var value = cityData.value;
			if(value > 0) {
				if(areacode) {
					that.areas(citys[$(this).index() - 1].childs, areacode);
					areacode = null;
				} else {
					that.areas(citys[$(this).index() - 1].childs, (citys[$(this).index() - 1].childs)[0].code);
				}
				//that.areas(citys[$(this).index() - 1].childs);
			} else {
				$("select[name=area]").attr("disabled", "disabled");
				$("select[name=area]").siblings("div").addClass("layui-select-disabled");
				$("select[name=area]").next().find("input").addClass("layui-disabled");
				var areaHtml = '<option value="">请选择县/区</option>';
				$("select[name=area]").html(areaHtml);
				form.render();

			}
		});
		if(code != citys[0].code) { //$("select[name=province]").next().find("dd[lay-value='11']").trigger('click');
			$("select[name=city]").next().find("dd[lay-value='" + code + "']").trigger('click');
		} else {
			$("select[name=city]").next().find("dd[lay-value='" + citys[0].code + "']").trigger('click');
		}
	}

	//加载县/区数据
	MultilevelLinkage.prototype.areas = function(areas, code) {
		var areaHtml = '<option value="">请选择县/区</option>';
		for(var i = 0; i < areas.length; i++) {
			areaHtml += '<option value="' + areas[i].code + '">' + areas[i].name + '</option>';
		}
		$("select[name=area]").html(areaHtml).removeAttr("disabled");
		form.render();
		form.on('select(area)', function(areaData) {
		})
		if(code != areas[0].code) {
			$("select[name=area]").next().find("dd[lay-value='" + code + "']").trigger('click');
		} else {
			$("select[name=area]").next().find("dd[lay-value='" + areas[0].code + "']").trigger('click');
		}
	}

	MultilevelLinkage.prototype.data = function(codearr) {
		this.provinces(codearr);
	}
	
	MultilevelLinkage.prototype.getSelect = function(){
		var selectObj = {},
		codearr = [],
		namearr = [];
		var listselect = document.querySelectorAll('.layui-this');
		$.each(listselect, function(i) {
			var target = listselect[i];
			if(target.getAttribute('lay-value') != ""){
				codearr.push(target.getAttribute('lay-value'));
				namearr.push(target.innerText);
			}
		});
		selectObj.code = codearr;
		selectObj.name = namearr;
		return selectObj;
	}

	var MultilevelLinkage = new MultilevelLinkage();
//	exports("MultilevelLinkage", function() {
//		//MultilevelLinkage.provinces();
//		MultilevelLinkage.data([13, 1302, 130205]);
//		//console.log(MultilevelLinkage.getSelect());
//	});
	exports("MultilevelLinkage",MultilevelLinkage);
})