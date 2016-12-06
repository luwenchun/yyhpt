<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<link href="frame/css/extra.css" rel="stylesheet">
<style type="text/css">
.input-text-body {
	border: 1px solid #ccc;
	outline: 0 !important;
	-webkit-appearance: none;
	color: #555;
	background-color: #fff;
	border-color: #d2d6de;
	height: 30px;
	line-height: 15px;
	box-shadow: none !important;
	transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}

.input-text-body:focus {
	border-color: #3c8dbc;
}
#id_jzds{
	margin-top:5px;
	border: 0px;
	border-bottom: 1px solid #d2d6de;
}
#id_jzds:focus {
	border-color: #3c8dbc;
}
.control-label{
	font-size: 14px;
	COLOR: #737373;
}
.control-label-left {
	text-align: left;
	margin-left: 0px;
	font-size: 14px;
	COLOR: #434343;
	height: 28px;
	line-height: 32px;
}

.control-label-cent {
	padding-top: 6px;
	margin-bottom: 0;
	text-align: center;
	font-size: 14px;
	COLOR: #434343;

	/*line-height: 32px;*/
	/*height: 28px;*/
}
.control-label-rig {
	text-align: right;
	height: 28px;
	line-height: 32px;
	font-size: 14px;
	COLOR: #434343;
}
.control-content {
	padding-top: 6px;
	font-size: 14px;
	COLOR: #434343;
}

.choose-date {
	background: url("layouts/img/control/img_rl.png") no-repeat scroll right
		center transparent;
	cursor: pointer;
}
.list-row-space{
	margin-top: 3px;
	margin-bottom: 3px;
}
.nopadding-rig{
	padding-right:0px;
}
.nopadding-left{
	padding-left:0px;
}
.form-control-static {
	line-height: 30px;
	margin-bottom: 0;
}
.form-horizontal{
	margin: 0px 0px 0px 0px;
}
.form-row-margin-top{
	margin:5px 0px 0px 0px;
}
.input-group-reset{
	position: relative;
	display: table;
	border-collapse: separate;
	float: none;
}
.input-group-reset[class*="col-"] {
	float: none;
}
.error-alert-self-define{
	color: #dd4b39;
	border-color: #dd4b39;
}
.checkbox-inline{
	margin-top: 0;
	/* margin-left: 10px; */
}
.input-sm {
	border-radius: 0px;
}
.del-list-row-space {
	height: 24px;
	line-height: 12px;
}
.form-control-new{
	display: block;
	color: #555;
	height: 30px;
	background-color: #fff;
	border: 1px solid #ccc;
	border-color: #d2d6de;
	transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
</style>
<link rel="stylesheet" href="frame/plugins/city-picker/css/city-picker.css">
<script src="frame/plugins/city-picker/city-picker.data.js"></script>
<script src="frame/plugins/city-picker/city-picker.js"></script>
<script src="yyhpt/pages/pggl/pgglXqsq.js" type="text/javascript"></script>

<nav class="navbar navbar-default navbar-static" role="navigation">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse"
					data-target="#example-navbar-collapse">
				<span class="sr-only">切换导航</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
		</div>
		<div class="collapse navbar-collapse" id="example-navbar-collapse">
			<ul class="nav navbar-nav">
				<li class="active" id="href_goto_0"><a href="#gotoXqsq_0" data-toggle="tab" id="a_goXqsq_0">个人信息</a></li>
				<li id="href_goto_1"><a href="#gotoXqsq_1" data-toggle="tab" id="a_goXqsq_1">配偶情况</a></li>
				<li id="href_goto_2"><a href="#gotoXqsq_2" data-toggle="tab" id="a_goXqsq_2">居住情况</a></li>
				<li id="href_goto_3"><a href="#gotoXqsq_3" data-toggle="tab" id="a_goXqsq_3">申请信息</a></li>
			</ul>
		</div>
	</div>
</nav>
	<form id="defaultForm" method="post" class="tab-content" style="font-size: 13px;">
		<!-- 个人基本信息开始-->
		<div class="panel panel-default tab-pane fade in active" id="gotoXqsq_0">
			<div class="panel-heading" style="height: 40px">
				<a data-toggle="collapse" data-parent="#accordion"
					href="#grxxcontent">
					<h3
						style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
						<span class="glyphicon glyphicon-th"></span> 个人信息
					</h3>
				</a>
			</div>
			<div id="grxxcontent" class="panel-collapse collapse in nopadding">
				<div
					class="form-horizontal form-bordered form-row-stripped nopadding">

					<div class="form-group form-row-margin-top">
						<div class="col-md-4 col-xs-12 del-list-row-space">
							<label class="col-md-4 col-xs-3 control-label">姓名 :</label>
							<div class="col-md-6 col-md-offset-2 col-xs-9">
								<p id="id_xm" class="control-content" style="text-align:left;"></p>
							</div>
						</div>
						<div class="col-md-4 col-xs-12 del-list-row-space">
							<label class="col-md-4 col-xs-3 control-label">性别 :</label>
							<div class="col-md-5 col-xs-9">
								<p id="id_xb" class="control-content"></p>
							</div>
						</div>
						<div class="col-md-4 col-xs-12 del-list-row-space">
							<label class="col-md-4 col-xs-3  control-label">年龄 :</label>
							<div class="col-md-3 col-xs-9">
								<p id="id_nl" class="control-content"></p>
							</div>
						</div>
					</div>
					<div class="">
						<div class="col-md-6 nopadding">
							<select class="form-control-new input-sm col-md-3 col-xs-12 list-row-space" id="zlxdm"
								name="zlxdm" title="证件类型"></select>
							<%--onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"--%>
							<input class="form-control-new input-sm col-md-6 col-xs-12 col-md-offset-1 list-row-space input-text-body"
							   id="id_zhm" type="text" name="id_zhm" title="证件号码" maxlength="20" size="20">
						</div>
						<div class="col-md-6 nopadding">
							<select class="form-control-new input-sm col-md-3 col-xs-12 list-row-space"
								id="klxdm" name="klxdm" title="卡类型"></select>
							<input class="form-control-new input-sm col-md-6 col-xs-12 col-md-offset-1 list-row-space input-text-body"
								id="id_khm" type="text" name="id_khm" title="卡号" maxlength="20">
						</div>
					</div>

					<div class="form-group form-row-margin-top">
						<div class="col-md-2 col-xs-12">
							<label class="control-label col-md-10">婚姻状况 :</label>
						</div>
						<div class="col-md-10 col-xs-12 nopadding-left" style="padding-right: 15px; margin-left:-5px;" id="hyzkDiv"></div>
					</div>

					<div class="form-group form-row-margin-top">
						<div class="col-md-2">
							<label class="control-label col-md-10" style="padding-top: 10px;">现住址 :</label>
						</div>
						<div class="col-md-6 col-xs-12">
							<input class="input-sm col-md-12 col-xs-12" maxlength="100" id="jzdxxdz" type="text" name="jzdxxdz">
						</div>
						<div class="col-md-4">
							<input class="input-sm col-md-8 col-xs-10 input-text-body"
							style="" id="id_jzds" maxlength="10"
								type="text" name="id_jzds">
								<span class="input-group-btn col-md-1 col-xs-1 list-row-space">
								<button class="btn btn-default btn-flat btn-sm"
									id="id_xzz_copy" type="button"> <i class="fa fa-copy"></i>
								</button>
							</span>
						</div>
					</div>

					<div class="form-group form-row-margin-top">
						<div class="col-md-2">
							<label class="control-label col-md-10">收信住址:</label>
						</div>
						<div class="col-md-6 col-xs-12">
							<input class="input-sm col-md-12 col-xs-12 input-group-reset input-text-body"
							style="padding-left:5px; font-size: 13px;" maxlength="100"
								id="id_sxxxdz" type="text" name="id_sxxxdz">
						</div>
					</div>

					<div class="form-group form-row-margin-top">
						<div class="col-md-2">
							<label class="control-label col-md-10">电话号码:</label>
						</div>
						<div class="col-md-3 col-xs-12">
							<input class="form-control-new col-md-9 col-xs-12 input-group-reset input-text-body input-sm" maxlength="15" id="id_dhhm"
								type="text" name="id_dhhm">
						</div>
						<div class="col-md-3">
							<label class="control-label-cent col-xs-2 col-md-4 nopadding">邮编:</label>
							<div class="col-md-8 col-xs-12 nopadding">
								<input class="form-control input-sm col-md-9 col-xs-12"
									onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
									maxlength="6" id="id_jzdyzbm" type="text" name="id_jzdyzbm">
							</div>
						</div>
					</div>

					<div class="form-group form-row-margin-top">
						<div class="col-md-2">
							<label class="control-label col-md-10">收入情况:</label>
						</div>
						<div class="col-md-3">
							<div class="col-md-12 col-xs-12  nopadding">
								<label class="control-label-left col-md-5 col-xs-4 nopadding">个人养老金</label>
								<input
									onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
									maxlength="6" id="id_gryljsr"
									class="col-md-4 col-xs-6 input-text-body input-sm" type="text"
									name=id_gryljsr> <label
									class="col-md-3 col-xs-2 control-label-left nopadding">元/月</label>
							</div>
						</div>
						<div class="col-md-3">
								<label class="control-label-left col-md-4 col-xs-4 nopadding">其他收入</label>
							<div class="col-md-8 nopadding">
								<input
									onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
									maxlength="12" id="id_qtsr"
									class="col-md-8 col-xs-6 input-text-body input-sm nopadding"
									type="text" name="id_qtsr"> <label
									class="control-label-left col-md-4 col-xs-2 nopadding">元/月</label>
							</div>
						</div>
						<div class="col-md-4">
							<div class="col-md-12 col-xs-12 nopadding">
								<label class="control-label-left col-md-5 col-xs-4 nopadding">上年度民政补贴</label>
								<input
									onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
									maxlength="8" id="id_sndmzbtsr"
									class="col-md-3 col-xs-6 input-text-body input-sm nopadding"
									type="text" name="id_sndmzbtsr"> <label
									class="col-md-2 col-xs-2 control-label-left nopadding">元/年</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 个人信息结束 -->
		<!-- 配偶和亲属情况开始 -->
		<div class="panel panel-default tab-pane fade" id="gotoXqsq_1">
			<div class="panel-heading" style="height: 40px">
				<a data-toggle="collapse" data-parent="#accordion"
					href="#pgqkxxcontent">
					<h3
						style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
						<span class="glyphicon glyphicon-th"></span> 配偶和亲属情况
					</h3>
				</a>
			</div>
			<div id="pgqkxxcontent"
				class="panel-collapse collapse in nopadding">
				<div
					class="form-horizontal form-bordered form-row-stripped nopadding">


					<div class="form-group form-row-margin-top"
						style="margin-top: 5px; margin-bottom: 8px;">
						<div class="col-md-8">
							<div class="col-md-6 nopadding">
								<label class="col-md-4 col-xs-12 control-label">配偶情况
									:</label>
								<div class="col-md-7 col-xs-12 nopadding">
									<label
										class="col-md-4 col-xs-2 control-label-cent nopadding">姓名
									</label>
									<input id="id_poxm" class="input-text-body col-md-8 col-xs-12 input-sm"
										name="id_poxm" maxlength="25" type="text">
								</div>
							</div>
							<div class="col-md-5 nopadding">
								<label
									class="col-md-4 col-xs-2 control-label-cent nopadding">年龄
								</label>
								<input id="id_ponl" type="text" name="id_ponl" maxlength="3"
									class="input-text-body col-md-6 col-xs-12 input-sm">
							</div>
						</div>
					</div>

					<div class="form-group form-row-margin-top" style="margin-top: 5px; margin-bottom: 8px;">
						<div class="col-md-6">
							<select class="form-control-new input-sm col-md-3 col-xs-12 list-row-space" id="pozjlxdm"
								name="pozjlxdm" title="证件类型"></select>
							<input class="form-control-new input-sm col-md-6 col-md-offset-1 col-xs-12 list-row-space input-text-body" id="id_pozjhm" type="text"
								name="id_pozjhm" title="证件号码" maxlength="20" size="20">
						</div>
						<div class="col-md-6">
							<select class="form-control-new input-sm col-md-3 col-xs-12 list-row-space"
								id="poklxdm" name="poklxdm" title="卡类型"></select>
							<input class="form-control-new input-sm col-md-6 col-xs-12 col-md-offset-1 list-row-space input-text-body" id="id_pokh" type="text"
								name="id_pokh" title="卡号" maxlength="20">
						</div>
					</div>

					<div class="form-group form-row-margin-top" style="margin-top: 5px; margin-bottom: 8px;">
						<div class="col-md-8">
							<div class="col-md-6 nopadding">
								<label class="col-md-4 col-xs-12 control-label">法定监护人
									:</label>
								<div class="col-md-7 col-xs-12 nopadding">
									<label
										class="col-md-4 col-xs-2 control-label-cent nopadding">姓名
									</label> <input id="id_zyjhrxm"
										class="input-text-body col-md-8 col-xs-12 input-sm" name="id_zyjhrxm"
										maxlength="25" type="text">
								</div>
							</div>
							<div class="col-md-5 nopadding">
								<label
									class="col-md-4 col-xs-2 control-label-cent nopadding">电话
								</label>
								<input id="id_zyjhrdhhm" type="text" name="id_zyjhrdhhm"
									maxlength="15" class="input-text-body col-md-6 col-xs-12 input-sm nopadding">
							</div>
						</div>
						<div class="col-md-4 nopadding">
							<div class="col-md-12 col-xs-12">
								<label
									class="col-md-2 col-xs-3 control-label-cent nopadding">手机
								</label>
								<input id="id_zyjhrsjhm" type="text" name="id_zyjhrsjhm"
									maxlength="15" class="input-text-body input-sm col-md-7 col-xs-12">
							</div>
						</div>
					</div>

					<div class="form-group form-row-margin-top" style="margin-top: 5px; margin-bottom: 8px;">
						<div class="col-md-8">
							<div class="col-md-6 nopadding">
								<label class="col-md-4 col-xs-12 control-label">主要监护人
									:</label>
								<div class="col-md-7 col-xs-12 nopadding">
									<label
										class="col-md-4 col-xs-2 control-label-cent nopadding">姓名
									</label> <input id="id_zyzhrxm"
										class="input-text-body col-md-8 col-xs-12 input-sm" name="id_zyzhrxm"
										maxlength="25" type="text">
								</div>
							</div>
							<div class="col-md-5 nopadding">
								<label
									class="col-md-4 col-xs-2 control-label-cent nopadding">电话
								</label>
								<div class="col-md-6 nopadding">
									<input id="id_zyzhrdh" type="text" name="id_zyzhrdh"
										maxlength="15" class="input-text-body col-md-12 col-xs-12 input-sm nopadding">
								</div>
							</div>
						</div>
						<div class="col-md-4 nopadding">
							<div class="col-md-12 col-xs-12">
								<label
									class="col-md-2 col-xs-3 control-label-cent nopadding">手机
								</label>
								<input id="id_zyzhrsj" type="text" name="id_zyzhrsj"
									maxlength="15" class="input-text-body col-md-7 col-xs-12 input-sm">
							</div>
						</div>
					</div>

					<div class="form-group form-row-margin-top" style="margin-top: 5px; margin-bottom: 8px;">
						<div class="col-md-8">
							<div class="col-md-6 nopadding">
								<label class="control-label col-md-4">亲属情况 :</label>
								<div class="col-md-7 col-xs-12 nopadding">
									<label class="control-label-cent col-md-4 col-xs-3 nopadding list-row-space">子女</label>
									<input maxlength="2"
										onkeyup="this.value=this.value.replace(/\D/g,'')"
										id="id_znrs" type="text" name="id_znrs"
										class="col-md-7 col-xs-8 input-text-body input-sm list-row-space">
									<label class="col-md-1 col-xs-1 control-label-cent nopadding list-row-space">人，</label>
								</div>
							</div>
							<div class="col-md-5 nopadding">
								<label class="col-md-4 col-xs-3 control-label-cent nopadding list-row-space">兄弟姐妹</label>
								<input maxlength="2"
									onkeyup="this.value=this.value.replace(/\D/g,'')"
									id="id_xdjmrs" type="text" name="id_xdjmrs"
									class="col-md-6 col-xs-8 input-text-body input-sm nopadding list-row-space">
								<label class="control-label-cent col-md-2 col-xs-1 nopadding list-row-space">人，</label>
							</div>
						</div>
						<div class="col-md-4 nopadding">
							<div class="col-md-12 col-xs-12">
								<label class="control-label-cent col-md-2 col-xs-3 nopadding list-row-space">孙辈</label>
									<input maxlength="2"onkeyup="this.value=this.value.replace(/\D/g,'')" id="id_sbrs"
										type="text" name="id_sbrs"
										class="col-md-7 col-xs-8 input-text-body input-sm nopadding list-row-space">
									<label class="col-md-2 col-xs-1 control-label-left nopadding list-row-space">人</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 配偶和亲属情况结束 -->
		<!-- 居住情况开始 -->
		<div class="panel panel-default tab-pane fade" id="gotoXqsq_2">
			<div class="panel-heading" style="height: 40px">
				<a data-toggle="collapse" data-parent="#accordion"
					href="#jtpsxxcontent">
					<h3
						style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
						<span class="glyphicon glyphicon-th"></span> 居住情况
					</h3>
				</a>
			</div>
			<div id="jtpsxxcontent"
				class="panel-collapse collapse in nopadding">
				<div
					class="form-horizontal form-bordered form-row-stripped nopadding">
					<div class="form-group nopadding">
						<div class="col-md-2 list-row-space">
								<label class="col-md-10 col-xs-12 control-label">独居 :</label>
						</div>
						<div class="col-md-9 list-row-space">
							<div class="col-md-3 nopadding">
								<div class="col-md-10 col-xs-12 nopadding" id="djbzDiv"></div>
							</div>
								<label class="col-md-3 col-xs-12 control-label">同居人员情况:</label>
							<div class="col-md-3 nopadding list-row-space">
								<label
									class="col-md-6 col-xs-3 control-label-rig nopadding">总人数</label>
								<input maxlength="2"
									onkeyup="this.value=this.value.replace(/\D/g,'')"
									id="id_tjzrs" type="text" name="id_tjzrs"
									class="input-text-body col-md-4 col-xs-7 input-sm"> <label
									class="col-md-2 col-xs-1 control-label-left nopadding">人</label>
							</div>
						</div>
					</div>

					<div class="form-group nopadding"
						style="margin-top: 5px; margin-bottom: 8px;">
						<div class="col-md-2">
							<label class="control-label col-md-10 col-xs-12">亲属情况 :</label>
						</div>
						<div class="col-md-9">
							<div class="col-md-3 col-xs-12 nopadding">
								<label class="control-label-rig col-md-6 col-xs-3 nopadding">配偶，子女</label>
								<input maxlength="2"
									onkeyup="this.value=this.value.replace(/\D/g,'')"
									id="id_tjznrs" type="text" name="id_tjznrs"
									class="col-md-4 col-xs-7 input-text-body input-sm"> <label
									class="col-md-2 col-xs-1 control-label nopadding">人，</label>
							</div>
							<div class="col-md-3 col-xs-12 nopadding">
								<label class="control-label-rig col-md-6 col-xs-3 nopadding">兄弟姐妹</label>
								<input maxlength="2"
									onkeyup="this.value=this.value.replace(/\D/g,'')"
									id="id_tjxdjmrs" type="text" name="id_tjxdjmrs"
									class="col-md-4 col-xs-7 input-text-body input-sm nopadding">
								<label class="control-label col-md-2 col-xs-1 nopadding">人，</label>
							</div>
							<div class="col-md-3 col-xs-12 nopadding">
								<label class="control-label-rig col-md-6 col-xs-3 nopadding">孙辈</label>
								<input maxlength="2"
									onkeyup="this.value=this.value.replace(/\D/g,'')"
									id="id_tjsbrs" type="text" name="id_tjsbrs"
									class="col-md-4 col-xs-7 input-text-body input-sm nopadding">
								<label class="col-md-2 col-xs-1 control-label nopadding">人，</label>
							</div>
							<div class="col-md-3 col-xs-12 nopadding">
								<label class="control-label-rig col-md-6 col-xs-3 nopadding">雇佣人</label>
								<input maxlength="2"
									onkeyup="this.value=this.value.replace(/\D/g,'')"
									id="id_tjgyrs" type="text" name="id_tjgyrs"
									class="col-md-5 col-xs-7 input-text-body input-sm nopadding">
								<label class="col-md-1 col-xs-1 control-label nopadding">人</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 居住情况结束 -->
		<!-- 申请信息开始 -->
		<div class="panel panel-default tab-pane fade" id="gotoXqsq_3">
			<div class="panel-heading" style="height: 40px">
				<a data-toggle="collapse" data-parent="#accordion"
					href="#sqxxcontent">
					<h3
						style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
						<span class="glyphicon glyphicon-th"></span> 申请信息
					</h3>
				</a>
			</div>
			<div id="sqxxcontent"
				class="panel-collapse collapse in nopadding">
				<div
					class="form-horizontal form-bordered form-row-stripped nopadding">

					<div class="form-group nopadding" style="margin-top: 10px;">
						<div class="col-md-8">
							<div class="col-md-6 nopadding">
								<label class="col-md-4 col-xs-12 control-label">申请人 :</label>
								<div class="col-md-7 col-xs-12 nopadding list-row-space">
									<label class="col-md-4 col-xs-3 control-label-cent nopadding">姓名
									</label>
									<input id="id_sqrxm" class="input-text-body col-md-8 col-xs-9 input-sm" name="id_sqrxm"
										maxlength="25" type="text">
								</div>
							</div>
							<div class="col-md-4 nopadding list-row-space">
								<label
									class="col-md-3 col-xs-3 control-label-cent nopadding">电话
								</label>
								<input id="id_sqrdhhm" type="text" name="id_sqrdhhm"
									maxlength="15" class="input-text-body col-md-9 col-xs-9 input-sm">
							</div>
						</div>
						<div class="col-md-4 nopadding">
							<div class="col-md-10 col-xs-12 list-row-space">
								<label
									class="col-md-3 col-xs-3 control-label-cent nopadding">手机
								</label>
								<input id="id_sqrsjhm" type="text" name="id_sqrsjhm"
									maxlength="15" class="input-text-body col-md-8 col-xs-9 input-sm">
							</div>
						</div>
					</div>

					<div class="form-group nopadding">
						<div class="col-md-6">
							<select class="form-control-new input-sm col-md-3 col-xs-12 list-row-space" id="sqrzjlxdm"
								name="sqrzjlxdm" title="证件类型"></select>
							<input class="form-control-new input-sm col-md-5 col-md-offset-1 col-xs-12 from-group list-row-space input-text-body" id="id_sqrzjhm"
								type="text" name="id_sqrzjhm" title="证件号码" maxlength="20" size="20">
						</div>
						<div class="col-md-6">
							<select class="form-control-new input-sm col-md-3 col-xs-12 col-md-offset-1 list-row-space"
								id="sqrklxdm" name="sqrklxdm" title="卡类型"></select>
							<input class="form-control-new input-sm col-md-5 col-md-offset-1 col-xs-12  list-row-space input-text-body"
								id="id_sqrkh" type="text" name="id_sqrkh" title="卡号" maxlength="20">
						</div>
					</div>

					<div class="form-group nopadding list-row-space">
						<div class="col-md-12">
							<label class="control-label-left col-md-5 col-xs-12 nopadding" id="ylrgxLabel">如非本人申请，受委托人或监护人与老人关系</label>
							<div id="ylrgxDiv" class="col-md-12 col-xs-12"></div>
						</div>
					</div>

					<div class="form-group nopadding list-row-space">
						<div class="col-md-2">
							<label class="control-label col-md-10 col-xs-5">评估类型:</label>
						</div>
						<div class="col-md-10 col-xs-12" id="pglxDiv"></div>
					</div>

					<div class="form-group nopadding list-row-space">
						<div class="col-md-2">
							<label class="control-label col-md-10 col-xs-5">预约日期:</label>
						</div>
						<div class="col-md-3 col-xs-12">
							<input type="text" class="datetimepickers choose-date input-text-body input-sm col-xs-12"
								id="id_yyrq" name="id_yyrq" placeholder="选择时间" readonly="readonly">
						</div>
						<div class="col-md-2">
							<label class="col-md-10 control-label">时间段:</label>
						</div>
						<div class="col-md-5 col-xs-12" id="yysjdDiv"></div>
					</div>

					<div class="form-group nopadding list-row-space" id="fwxqDiv">
						<div class="col-md-2">
							<label class="control-label col-md-10 col-xs-5">服务需求:</label>
						</div>
						<div class="col-md-3 col-xs-12">
							<select class="form-control input-sm" id="id_xqdjdm" name="id_xqdjmc"></select>
							<%--<p class="control-label-left nopadding" id="id_xqdjmc">
							</p>--%>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 申请信息结束 -->
	</form>
