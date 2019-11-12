<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
	<!--<script src="http://api.map.baidu.com/location/ip?v=2.0&ak=Ff72OypnReCylnDvy0OBuEHLRRumZGX8&ip="+returnCitySN["cip"]+"&coor=bd09ll"></script>-->
	<script src="js/common/jquery-1.12.4.js"></script>
	<script type="text/javascript">
		var ip = returnCitySN["cip"];
//		http://api.map.baidu.com/location/ip?v=2.0&ak=Ff72OypnReCylnDvy0OBuEHLRRumZGX8&ip=183.129.210.50&coor=bd09ll
		$.ajax({
			type: "get",
			data: {},
//			url: "http://api.map.baidu.com/location/ip?v=2.0&ak=Ff72OypnReCylnDvy0OBuEHLRRumZGX8&ip="+ip+"&coor=bd09ll",
			url: "http://api.map.baidu.com/location/ip?v=2.0&ak=RGl7YqMPBt1TWm4zNnFNO6wFkZleF2D0&ip="+ip+"&coor=bd09ll",
//			url: "http://ip.taobao.com/service/getIpInfo.php?ip=183.129.210.50",
			dataType: 'json',
			async: false,
			success: function(res) {
				alert(JSON.stringify(res));
			},
			error: function(xhrs) {
				alert(JSON.stringify(xhrs));
			}
		});
	</script>