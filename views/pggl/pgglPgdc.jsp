<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>评估调查</title>
	<style type="text/css">
		.radio-container {
			padding-left: 8px;
		}

		.head-title {
			margin-top: 0px;
			margin-bottom: 0px;
			font-weight: bold;
			font-size: 20px;
			color: #000000;
		}

		.choose-date {
			background: url("layouts/img/control/img_rl.png") no-repeat scroll right center transparent;
			cursor: pointer;
		}
		/*小屏幕时lable的样式*/
		.control-label-new{
			padding-top:6px;
			text-align: right;
			padding-left:0px;
		}
		/*重写样式*/
		.form-control-static {
			padding-top: 6px;
			padding-bottom: 6px;
		}
	</style>
</head>
<body>
	<form id="pgdcMainForm" method="post" class="form-horizontal" style="font-size: 13px;">
		<!-- 个人基本信息开始-->
		<div class="panel panel-default">
			<div class="panel-heading" style="height: 40px">
				<a data-toggle="collapse" data-parent="#accordion"
				   href="#grxxcontent">
					<h3 class="head-title">
						<span class="glyphicon glyphicon-th"></span> 个人信息
					</h3>
				</a>
			</div>
			<div id="grxxcontent" class="panel-collapse collapse in nopadding">
				<div class="form-horizontal form-bordered form-row-stripped nopadding">
					<div class="form-group nopadding">
						<div class="col-md-6 col-xs-12">
							<label class="col-md-2 col-md-offset-1 col-md-offset-1 col-xs-4 control-label
								control-label-new">姓名：</label>
							<div class="col-md-3">
								<p id="grxx_xm" class="form-control-static"></p>
							</div>
							<label class="col-md-2 col-xs-4 control-label control-label-new">性别：</label>
							<div class="col-md-4">
								<p id="grxx_xb" class="form-control-static"></p>
							</div>
						</div>
						<div class="col-md-6 col-xs-12">
							<label class="col-md-2 col-xs-4  control-label control-label-new">出生日期：</label>
							<div class="col-md-3">
								<p id="grxx_csrq" class="form-control-static"></p>
							</div>
							<%--<label class="col-md-2 col-xs-4  control-label control-label-new">身份证号：</label>
							<div class="col-md-4 ">
								<p id="grxx_sfzh" class="form-control-static"></p>
							</div>--%>
						</div>
					</div>
					<div class="form-group nopadding">
						<div class="col-md-6 col-xs-12">
							<label class="col-md-3 col-xs-4 control-label control-label-new">居住地址：</label>
							<div class="col-md-9">
								<p id="grxx_jzdz" class="form-control-static"></p>
							</div>
						</div>
						<div class="col-md-6 col-xs-12">
							<label class="col-md-2 col-xs-4 control-label control-label-new">联系电话：</label>
							<div class="col-md-5">
								<p id="grxx_lxdh" class="form-control-static"></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 个人基本信息结束 -->
		<%--问卷情况--%>
		<div class="panel panel-default">
			<div class="panel-heading" style="height: 40px">
				<a data-toggle="collapse" data-parent="#accordion" href="#wjqkContent">
					<h3 class="head-title">
						<span class="glyphicon glyphicon-th"></span> 问卷结果
					</h3>
				</a>
			</div>
			<div class="panel-collapse collapse in nopadding" id="wjqkContent">
				<%--<div class="form-horizontal form-bordered form-row-stripped nopadding">
					<div class="form-group nopadding">
						<label class="col-md-2 col-xs-4 control-label">日常生活活动：</label>
						<div class="col-md-3">
							<p id="id_rcshhd" class="form-control-static"></p>
						</div>

						<label class="col-md-2 col-xs-4 control-label">精神状态：</label>
						<div class="col-md-3">
							<p id="id_jszt" class="form-control-static"></p>
						</div>
					</div>
					<div class="form-group nopadding">
						<label class="col-md-2 col-xs-4 control-label">感知觉与沟通：</label>
						<div class="col-md-3">
							<p id="id_gzjygt" class="form-control-static"></p>
						</div>

						<label class="col-md-2 col-xs-4 control-label">社会参与：</label>
						<div class="col-md-3">
							<p id="id_shcy" class="form-control-static"></p>
						</div>
					</div>
				</div>--%>

			</div>
		</div>
		<%--问卷情况结束--%>
		<!-- 评估情况开始 -->
		<div class="panel panel-default">
			<div class="panel-heading" style="height: 40px">
				<a data-toggle="collapse" data-parent="#accordion" href="#dcqkxxContent">
					<h3 class="head-title">
						<span class="glyphicon glyphicon-th"></span> 调查情况
					</h3>
				</a>

			</div>
			<div id="dcqkxxContent" class="panel-collapse collapse in nopadding">
				<div class="form-horizontal form-bordered form-row-stripped nopadding">
					<div class="form-group" style="margin-top: 5px;">
						<label class="control-label col-md-2">老年人能力初步等级：</label>
						<div class="col-md-9" id="lnrnlcbdjDiv" style="margin-top: 5px;"></div>
					</div>

					<div class="form-group" style="margin-top: 8px;">
						<label class="control-label col-md-2">调查员1：</label>
						<div class="col-md-2">
							<select class="form-control input-sm" name="DCY1XM" id="DCY1BH">

							</select>
						</div>

						<label class="control-label col-md-1" >调查员2：</label>
						<div class="col-md-2">
							<select class="form-control input-sm" name="DCY2XM" id="DCY2BH">

							</select>
						</div>

						<label class="control-label col-md-1" >调查员3：</label>
						<div class="col-md-2">
							<select class="form-control input-sm" name="DCY3XM" id="DCY3BH">

							</select>
						</div>
					</div>
					<div class="form-group" style="margin-top: 5px;">
						<label class="control-label col-md-2 ">调查日期：</label>
						<div class="col-md-3">
							<input class="form-control choose-date date-edit" id="DCRQ" type="text" name="DCRQ"
								   readonly="readonly" style="background-color: white;">
						</div>
					</div>
					<div class="form-group" style="margin-top: 5px;">
						<label class="control-label col-md-2 ">组织评估机构：</label>
						<div class="col-md-3">
							<select class="form-control input-sm" id="ZZPGJGDM" name="ZZPGJGMC" >
							</select>
						</div>
						<div class="col-md-4 col-md-offset-2 nopadding">
							<label class="control-label col-md-4 ">评估机构：</label>
							<div class="col-md-8">
								<select class="form-control input-sm" id="PGJGDM" name="PGJGMC" >
								</select>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-md-2 ">调查说明：</label>
						<div class="col-md-9 col-xs-12">
							<textarea class="col-md-12 col-xs-12" id="PGSM" name="PGSM" rows="3" style="margin-top: 5px; margin-bottom: 5px;"></textarea>
						</div>
					</div>
				</div>

			</div>

		</div>
		<!-- 评估情况结束 -->
		<input type="text" class="form-control   input-sm hidden"
				id="DCJLLSH" name="DCJLLSH" placeholder="用于绑定调查记录流水号" />
	</form>
	
<script src="yyhpt/pages/pggl/pgglPgdc.js" type="text/javascript"></script>
</body>
</html>