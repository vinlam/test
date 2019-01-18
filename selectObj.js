layui.define(["form", "jquery"], function(exports) {
	var form = layui.form,
		$ = layui.jquery,
		selectObject = {
			tNode: "province",
			pNode: "city",
			cNode: "area",
			data: null
		};

	selectObject.topNode = function(code) {
		var that = this;

		form.on('select(' + that.tNode + ')', function(proData) {
			var value = proData.value;
			//console.log($(this)+"--------"+$(this).index());
			if(value > 0) {
				var index = $(this).index() - 1;
				if(code && code[1] && code[2]) {
					that.parentNode(that.data[index].childs, code[1], code[2]);
					code = null;
				} else if(code && code[1]) {
					that.parentNode(that.data[index].childs, code[1]);
					code = null;
				} else {
					that.parentNode(that.data[index].childs, (that.data[index].childs)[0].code);
				}
			} else {
				var pHtml = '<option value="">请选择市</option>';
				$('select[name=' + that.pNode + ']').html(pHtml);
				$('select[name=' + that.pNode + ']').attr("disabled", "disabled");
				$('select[name=' + that.pNode + ']').siblings("div").addClass("layui-select-disabled");
				$('select[name=' + that.pNode + ']').next().find("input").addClass("layui-disabled");

				var cHtml = '<option value="">请选择县/区</option>';
				$('select[name=' + that.cNode + ']').html(cHtml);
				$('select[name=' + that.cNode + ']').attr("disabled", "disabled");
				$('select[name=' + that.cNode + ']').siblings("div").addClass("layui-select-disabled");
				$('select[name=' + that.cNode + ']').next().find("input").addClass("layui-disabled");

				form.render();
				//$("select[name=city]").next().find("dd.layui-select-tips").trigger('click');

			}
		});
		if(code && code[0]) {
			$('select[name=' + that.tNode + ']').next().find("dd[lay-value='" + code[0] + "']").trigger('click');
		}
		//$("select[name=province]").next().find('input').val('北京市');
		//$("select[name=province]").find("option[value='11']").attr("selected", true);
		//})
	}

	//加载市数据
	selectObject.parentNode = function(citys, code, areacode) {
		var pHtml = '<option value="">请选择市</option>',
			that = this;
		for(var i = 0; i < citys.length; i++) {
			pHtml += '<option value="' + citys[i].code + '">' + citys[i].name + '</option>';
		}
		$('select[name=' + that.pNode + ']').html(pHtml).removeAttr("disabled");
		form.render();
		form.on('select(' + that.pNode + ')', function(cityData) {
			var value = cityData.value;
			if(value > 0) {
				var index = $(this).index() - 1;
				if(areacode) {
					that.childNode(citys[index].childs, areacode);
					areacode = null;
				} else {
					that.childNode(citys[index].childs, (citys[index].childs)[0].code);
				}
			} else {
				var cHtml = '<option value="">请选择县/区</option>';
				$('select[name=' + that.cNode + ']').html(cHtml);
				$('select[name=' + that.cNode + ']').attr("disabled", "disabled");
				$('select[name=' + that.cNode + ']').siblings("div").addClass("layui-select-disabled");
				$('select[name=' + that.cNode + ']').next().find("input").addClass("layui-disabled");

				form.render();

			}
		});
		if(code != citys[0].code) { //$("select[name=province]").next().find("dd[lay-value='11']").trigger('click');
			$('select[name=' + that.pNode + ']').next().find("dd[lay-value='" + code + "']").trigger('click');
		} else {
			$('select[name=' + that.pNode + ']').next().find("dd[lay-value='" + citys[0].code + "']").trigger('click');
		}
	}

	//加载县/区数据
	selectObject.childNode = function(areas, code) {
		var that = this;
		var cHtml = '<option value="">请选择县/区</option>';
		for(var i = 0; i < areas.length; i++) {
			cHtml += '<option value="' + areas[i].code + '">' + areas[i].name + '</option>';
		}
		$('select[name=' + that.cNode + ']').html(cHtml).removeAttr("disabled");
		form.render();
		form.on('select(' + that.cNode + ')', function(areaData) {})
		if(code != areas[0].code) {
			$('select[name=' + that.cNode + ']').next().find("dd[lay-value='" + code + "']").trigger('click');
		} else {
			$('select[name=' + that.cNode + ']').next().find("dd[lay-value='" + areas[0].code + "']").trigger('click');
		}
	}

	selectObject.setdata = function(codearr) {
		this.topNode(codearr);
	}

	selectObject.init = function(codearr) {
		var tHtml = '',
			that = this;
		$.get("address.json", function(data) {
			that.data = data;
			for(var i = 0; i < data.length; i++) {
				tHtml += '<option value="' + data[i].code + '">' + data[i].name + '</option>';
			}
			//初始化省数据
			$('select[name=' + that.tNode + ']').append(tHtml);
			form.render();
			that.setdata(codearr);
		})

		//console.log(data)
	}

	selectObject.getSelect = function() {
		var selectObj = {},
			codearr = [],
			namearr = [];
		var listselect = document.querySelectorAll('.layui-this');
		$.each(listselect, function(i) {
			var target = listselect[i];
			if(target.getAttribute('lay-value') != "") {
				codearr.push(target.getAttribute('lay-value'));
				namearr.push(target.innerText);
			}
		});
		selectObj.code = codearr;
		selectObj.name = namearr;
		return selectObj;
	}

	//var address = new Address();
	//	exports("address", function() {
	//		//address.provinces();
	//		address.data([13, 1302, 130205]);
	//		//console.log(address.getSelect());
	//	});
	exports("selectObj", selectObject);
})