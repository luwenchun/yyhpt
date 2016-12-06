<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<link href="css/detail_page.css" rel="stylesheet">
<link href="frame/plugins/bootstrap-fileinput/bootstrap-fileinput.css"
	rel="stylesheet" type="text/css" />
	
<style type="text/css">
	.fwglFwdjSaveBtn{
		display:none;
	}
	.fwglFwdjExistBtn{
		display:none;
	}
	.modal-footer {
	    border-top: 0px solid #e5e5e5;
	}
	#fwgllbTable thead tr {
		background-color: #21B7C6;
		color: #ffffff;
	}
	@media (max-width: 768px) {
	  .control-label {
	    text-align:left;
	  }
	}
</style>
</head>
<body>
	<form id="fwdjForm" method="post" class="form-horizontal"
			 style="font-size: 13px;" enctype="multipart/form-data">	
		<div class="form-body" >		
			<div class="col-lg-2 col-md-2" style="border:1px solid #21B7C6;height:453px;
				background-color: white;padding-right: 0px;padding-left: 0px;overflow:auto;display:none;">
				<table id="fwgllbTable" class="table-container"></table>			
			</div>
			<div class="col-lg-12 col-md-12" style="background-color: white;">
				<div class="form-group">
					<label class="col-md-2 col-sm-2 control-label">姓名：</label>
					<div class="warning col-md-4 col-sm-10">
						<p id="XM" class="form-control-static"></p>
					</div>
					<label class="col-md-2 col-sm-2 control-label">家庭住址：</label>
					<div class="warning col-md-4 col-sm-10" style="padding-bottom: 2px;">
						<p id="JTDZ" class="form-control-static"></p>
					</div>
				</div>
				
				<div class="form-group">
					<label class="col-md-2 col-xs-5 col-sm-2 control-label">开始时间：</label>
					<div class="col-md-4 col-xs-12 col-sm-10 input-group input-group-sm date form_datetime" data-date="" 
						style="padding:0px 15px 0px 15px;float:left;margin-bottom:5px;">
	                    <input type="text" class="form-control" id="KSSJ" name="KSSJ" value="" readonly>
						<span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
	                </div>
					<label class="col-md-2 col-xs-5 col-sm-2 control-label">结束时间：</label>
					<div class="col-md-4 col-xs-12 col-sm-10 input-group input-group-sm date form_datetime"
						style="padding:0px 15px 0px 15px;float:left;margin-bottom:5px;">
	                    <input type="text" class="form-control" id="JSSJ" name="JSSJ" value="" readonly>
						<span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
	                </div>
				</div>			
				
				<div class="form-group">
					<label class="col-md-2 col-sm-2 control-label">服务地址：</label>
					<div class="warning col-md-10 input-group input-group-sm" style="padding:0px 15px 0px 15px;
						margin-bottom:5px;">
						<input type="text" class="form-control input-sm" id="FWDZ" name="FWDZ" maxlength="100" placeholder="">
						<span class="input-group-addon" style="border-width:0px">
							<img style="cursor:pointer;" src="layouts/img/dialog/icon_address.png"/></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-md-2 col-sm-2 control-label">附件：</label>
					<div class="col-md-8 col-sm-8">
						<div id="fjdzDiv" class="fileinput fileinput-new" data-provides="fileinput">
							<span class="btn btn-default btn-sm btn-file"> <span
								class="fileinput-new"> 选取文件 </span> <span
								class="fileinput-exists"> 重选 </span> <input type="file"
								name="fileInput" > <%--multiple=true--%>
							</span> <span class="fileinput-filename"> </span> &nbsp; <a
								href="javascript:;" class="close fileinput-exists"
								data-dismiss="fileinput"><img style="padding-top: 5px"
								src="layouts/img/control/img_close.png" /></a>
						</div>
					</div>
					<div class="pull-right" style="padding-bottom: 2px;padding-right: 15px;">
						<!-- <button id="btn_choose" class="btn btn-default btn-sm">
							选择文件
						</button> -->						
						<button id="btn_photo" class="btn btn-default btn-sm">
							拍照
						</button>
						<!-- <button id="btn_upload" class="btn btn-default btn-sm" >
							上传
						</button> -->
					</div>
				</div>

				<input type="text" class="form-control   input-sm hidden"
							id="FWJLLSH" name="FWJLLSH" placeholder="用于绑定服务记录流水号" />
				<input type="text" class="form-control   input-sm hidden"
							id="YNGRBSH" name="YNGRBSH" placeholder="用于绑定域内个人标识号" />

				<div id="djTableDiv" style="height:250px;">
					<table id="fwxmmxTable" class="table-container"></table>
				</div>				
				<div style="float:right;margin-top:15px;padding-bottom:5px;" >
					<button id="btn_Save" class="btn btn-default btn-sm">
						保存
					</button>
					<button id="btn_Exist" class="btn btn-default btn-sm">
						退出
					</button>
				</div>
			</div>
		</div>
	</form>

<script type="text/javascript">
	var ddd;
	function showDz(){
		var geolocation = new BMap.Geolocation();
		var gc = new BMap.Geocoder();

		geolocation.getCurrentPosition( function(r) {   //定位结果对象会传递给r变量

					if(this.getStatus() == BMAP_STATUS_SUCCESS)
					{  //通过Geolocation类的getStatus()可以判断是否成功定位。
						var pt = r.point;
						gc.getLocation(pt, function(rs){
							var addComp = rs.addressComponents;
							ddd=addComp;
							var address=addComp.city + addComp.district + addComp.street + addComp.streetNumber;
							if (addComp.province!=addComp.city)
								address=addComp.province+address;
							wnform.toast('定位成功!');
							$('#FWDZ').val(address);
							// alert(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
						});
					}
					else
					{
						//关于状态码
						//BMAP_STATUS_SUCCESS   检索成功。对应数值“0”。
						//BMAP_STATUS_CITY_LIST 城市列表。对应数值“1”。
						//BMAP_STATUS_UNKNOWN_LOCATION  位置结果未知。对应数值“2”。
						//BMAP_STATUS_UNKNOWN_ROUTE 导航结果未知。对应数值“3”。
						//BMAP_STATUS_INVALID_KEY   非法密钥。对应数值“4”。
						//BMAP_STATUS_INVALID_REQUEST   非法请求。对应数值“5”。
						//BMAP_STATUS_PERMISSION_DENIED 没有权限。对应数值“6”。(自 1.1 新增)
						//BMAP_STATUS_SERVICE_UNAVAILABLE   服务不可用。对应数值“7”。(自 1.1 新增)
						//BMAP_STATUS_TIMEOUT   超时。对应数值“8”。(自 1.1 新增)
						switch( this.getStatus() )
						{
							case 2:
								alert( '位置结果未知 获取位置失败.' );
								break;
							case 3:
								alert( '导航结果未知 获取位置失败..' );
								break;
							case 4:
								alert( '非法密钥 获取位置失败.' );
								break;
							case 5:
								alert( '对不起,非法请求位置  获取位置失败.' );
								break;
							case 6:
								alert( '对不起,当前 没有权限 获取位置失败.' );
								break;
							case 7:
								alert( '对不起,服务不可用 获取位置失败.' );
								break;
							case 8:
								alert( '对不起,请求超时 获取位置失败.' );
								break;

						}
					}

				},
				{enableHighAccuracy: true}
		)
	}

	// H5方式，不准确

	function showDz1() {
		var options = {
			enableHighAccuracy : true,
			maximunAge : 1000,
			timeout : 5000
		};
		if (window.navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(successCallback,
					errorCallback, options);
		} else {
			alert("你的浏览器不支持定位!");
		}

		function successCallback(position) {
			var output = "";
			var lat = position.coords.latitude; //纬度
			var lon = position.coords.longitude; //经度
			output += "定位信息： . \r\n";
			output += " 纬度:" + position.coords.latitude + " ";
			output += " 经度:" + position.coords.longitude + " ";
			alert(output);
			//output += " Accuracy :" + position.coords.accuracy + " meters";
			if (position.coords.latitude) {
				output += " Accuracy :" + position.coords.altitudeAccuracy
						+ " meters";
			}
			if (position.coords.heading) {
				output += " Heading :" + position.coords.Heading
						+ " meters";
			}
			if (position.coords.speed) {
				output += " Speed :" + position.coords.Speed + " m/s";
			}
			output += " Time of Position " + position.timestamp + " m/s";

			// 根据坐标得到地址描述

			var tt;
			console.log(output);
			var point = new BMap.Point(lon, lat); // 创建坐标点
			var myGeo = new BMap.Geocoder();

			myGeo.getLocation(point, function(result) {
				tt = result.addressComponents;
				console.log(output);
				var city = result.addressComponents.city;
				city += result.addressComponents.district;
				city += result.addressComponents.street;
				alert(city);
				// $('body').html(city);
			});
		}
		function errorCallback(error) {
			switch (error.code) {
				case error.PERMISSION_DENIED:
					//alert("you have denied access to your position .");
					break;
				case error.POSITION_UNAVAILABLE:
					//alert("there was a problem getting yout position .");
					break;
				case error.TIMEOUT:
					//alert("超时");
					break;

			}
		}
	}
</script>
<script src="yyhpt/pages/rwgl/fwglFwdj.js" type="text/javascript"></script>
<script src="frame/plugins/bootstrap-fileinput/bootstrap-fileinput.js" type="text/javascript"></script>
	
</body>
</html>