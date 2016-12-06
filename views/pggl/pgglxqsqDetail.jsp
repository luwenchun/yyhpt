<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<link href="frame/css/extra.css" rel="stylesheet">
<link href="frame/css/components.min.css" rel="stylesheet"
	type="text/css" />
<style type="text/css">
.input-text-body {
	border: 1px solid #ccc;
	outline: 0 !important;
	-webkit-appearance: none;
	color: #555;
	background-color: #fff;
	border-color: #d2d6de;
	box-shadow: none !important;
	transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}

.input-text-body:focus {
	border-color: #3c8dbc;
}

.control-label-left {
	text-align: left;
	margin-left: 0px;
	height: 28px;
	line-height: 30px;
}

.control-label-cent {
	text-align: center; height : 28px;
	line-height: 28px;
	height: 28px;
}

.choose-date {
	background: url("layouts/img/control/img_rl.png") no-repeat scroll right
		center transparent;
	cursor: pointer;
}
</style>
<link rel="stylesheet" href="frame/plugins/city-picker/css/city-picker.css">
<script src="frame/plugins/city-picker/city-picker.data.js"></script>
<script src="frame/plugins/city-picker/city-picker.js"></script>
<script src="yyhpt/pages/pggl/pgglxqsqDetail.js" type="text/javascript"></script>

<div class="page-content">
	<div class="full-height-content full-height-content-scrollable">
		<div class="full-height-content-body">
			<div class="panel-body fullhgtpanel">
				<form id="defaultForm" method="post" class="form-horizontal"
					style="font-size: 13px;">
					<!-- 个人基本信息开始-->
					<div class="panel panel-default">
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

								<div class="form-group nopadding"
									style="margin-top: 5px; margin-bottom: 8px;">
									<div class="col-md-6 nopadding">
										<div class="col-md-6">
											<label class="col-md-6 col-xs-3 control-label">姓名 :</label>
											<div class="col-md-6 col-xs-9">
												<p id="id_xm" class="form-control-static"></p>
											</div>
										</div>
										<div class="col-md-6">
											<label class="col-md-4 col-xs-3 control-label">性别 :</label>
											<div class="col-md-8 col-xs-9 ">
												<p id="id_xb" class="form-control-static"></p>
											</div>
										</div>
									</div>
									<div class="col-md-6">
										<label class="col-md-4 col-xs-3  control-label">年龄 :</label>
										<div class="col-md-8 col-xs-9 ">
											<p id="id_nl" class="form-control-static"></p>
										</div>
									</div>
								</div>

								<div class="form-group nopadding"
									style="margin-top: 5px; margin-bottom: 8px;">
									<div class="col-md-6">
										<div class="col-md-4 col-xs-11">
											<select class="form-control input-sm" id="zlxdm"
												name="zlxdm" title="证件类型"></select>
										</div>
										<label class="control-label col-md-1 col-xs-1"
											style="width: 0%; padding-left: 0;">:</label>
										<div class="col-md-6 col-xs-11">
											<input class="form-control input-sm" id="id_zhm" type="text"
												name="id_zhm" title="证件号码" maxlength="120" size="20">
										</div>
									</div>
									<div class="col-md-6 col-xs-12">
										<div class="col-md-4 col-xs-11">
											<select class="form-control input-sm"
												id="klxdm" name="klxdm"
												title="卡类型"></select>
										</div>
										<label class="control-label col-md-1 col-xs-1"
											style="width: 0%; padding-left: 0;">:</label>
										<div class="col-md-6 col-xs-11">
											<input class="form-control input-sm"
												id="id_khm" type="text"
												name="id_khm" title="卡号">
										</div>
									</div>
								</div>

								<div class="form-group nopadding"
									style="margin-top: 5px; margin-bottom: 8px;">
									<div class="col-md-2 col-xs-12">
										<label class="control-label col-md-10">婚姻状况 :</label>
									</div>
									<div class="col-md-10 col-xs-12" id="hyzkDiv"></div>
								</div>

								<div class="form-group nopadding"
									style="margin-top: 5px; margin-bottom: 8px;">
									<div class="col-md-2">
										<label class="control-label col-md-10">现住址 :</label>
									</div>
									<div class="col-md-6 nopadding">
										<div class="col-md-11 nopadding">
											<input class="input-text-body input-sm col-md-12 nopadding"
												id="id_jzdxxdz" type="text" name="id_jzdxxdz"> 
										</div>
										<label class="control-label col-md-1" style="text-align: center;">-</label>
									</div>
									<div class="col-md-4 nopadding">
										<input class="input-text-body input-sm col-md-8" id="id_jzds"
											type="text" name="id_jzds"> <span
											class="input-group-btn col-md-1">
											<button class="btn btn-default btn-flat btn-sm"
												id="id_xzz_copy" type="button">
												<i class="fa fa-copy"></i>
											</button>
										</span>
									</div>
								</div>

								<div class="form-group nopadding"
									style="margin-top: 5px; margin-bottom: 8px;">
									<div class="col-md-2">
										<label class="control-label col-md-10">收信住址:</label>
									</div>
									<div class="col-md-6 nopadding">
										<div class="col-md-11 nopadding">
											<input class="input-sm col-md-12 input-text-body"
											style="padding-left:5px; font-size: 13px;"
												id="id_sxxxdz" type="text" name="id_sxxxdz"> 
										</div>
									</div>
								</div>

								<div class="form-group nopadding"
									style="margin-top: 5px; margin-bottom: 8px;">
									<div class="col-md-2">
										<label class="control-label col-md-10 nopadding">电话号码:</label>
									</div>
									<div class="col-md-3 nopadding">
										<div class="col-md-9 nopadding">
											<input class="form-control input-sm" maxlength="11" id="id_dhhm"
												type="text" name="id_dhhm">
										</div>
									</div>
									<div class="col-md-4 nopadding">
										<div class="col-md-12">
											<label class="control-label col-md-3">邮编:</label>
											<div class="col-md-7">
												<input class="form-control input-sm"
													onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
													maxlength="6" id="id_jzdyzbm" type="text" name="id_jzdyzbm">
											</div>
										</div>
									</div>
								</div>

								<div class="form-group nopadding"
									style="margin-top: 5px; margin-bottom: 8px;">
									<div class="col-md-2">
										<label class="control-label col-md-10">收入情况:</label>
									</div>
									<div class="col-md-9 nopadding">
										<div class="col-md-4 nopadding">
											<label class="control-label-left col-md-5 nopadding">个人养老金</label>
											<input
												onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
												maxlength="8" id="id_gryljsr"
												class="col-md-4 input-text-body input-sm" type="text"
												name=id_gryljsr> <label
												class="col-md-3 control-label-left nopadding">元/月</label>
										</div>
										<div class="col-md-4 nopadding">
											<label class="control-label-cent col-md-5 nopadding">其他收入</label>
											<input
												onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
												maxlength="15" id="id_qtsr"
												class="col-md-4 input-text-body input-sm nopadding"
												type="text" name="id_qtsr"> <label
												class="control-label-left col-md-3 nopadding">元/月</label>
										</div>
										<div class="col-md-4 nopadding">
											<label class="control-label-cent col-md-6 nopadding">上年度民政补贴</label>
											<input
												onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
												maxlength="10" id="id_sndmzbtsr"
												class="col-md-4 input-text-body input-sm nopadding"
												type="text" name="id_sndmzbtsr"> <label
												class="col-md-2 control-label-left nopadding">元/年</label>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- 配偶和亲属情况开始 -->
						<div class="panel panel-default">
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


									<div class="form-group nopadding"
										style="margin-top: 5px; margin-bottom: 8px;">
										<div class="col-md-8">
											<div class="col-md-6 nopadding">
												<label class="col-md-4 col-xs-3 control-label">配偶情况
													:</label>
												<div class="col-md-7 col-xs-9">
													<label
														class="col-md-4 col-xs-3 control-label-cent nopadding">姓名
													</label> <input id="id_poxm" class="input-text-body col-md-8 input-sm"
														name="id_poxm" maxlength="25" type="text">
												</div>
											</div>
											<div class="col-md-4 nopadding">
												<div class="col-md-12 col-xs-9 col-md-offset-2">
													<label
														class="col-md-3 col-xs-3 control-label-cent nopadding">年龄
													</label> <input id="id_ponl" type="text" name="id_ponl" maxlength="20"
														class="input-text-body col-md-7 input-sm">
												</div>
											</div>
										</div>
									</div>

									<div class="form-group nopadding"
										style="margin-top: 5px; margin-bottom: 8px;">
										<div class="col-md-6">
											<div class="col-md-4">
												<select class="form-control input-sm" id="pozjlxdm"
													name="pozjlxdm" title="证件类型"></select>
											</div>
											<label class="control-label col-md-1"
												style="width: 0%; padding-left: 0;">:</label>
											<div class="col-md-6">
												<input class="form-control input-sm" id="id_pozjhm" type="text"
													name="id_pozjhm" title="证件号码" maxlength="120" size="20">
											</div>
										</div>
										<div class="col-md-6">
											<div class="col-md-4">
												<select class="form-control input-sm"
													id="poklxdm" name="poklxdm"
													title="卡类型"></select>
											</div>
											<label class="control-label col-md-1"
												style="width: 0%; padding-left: 0;">:</label>
											<div class="col-md-6">
												<input class="form-control input-sm" id="id_pokh" type="text"
													name="id_pokh" title="卡号">
											</div>
										</div>
									</div>

									<div class="form-group nopadding"
										style="margin-top: 5px; margin-bottom: 8px;">
										<div class="col-md-8">
											<div class="col-md-6 nopadding">
												<label class="col-md-4 col-xs-3 control-label">法定监护人
													:</label>
												<div class="col-md-7 col-xs-9">
													<label
														class="col-md-4 col-xs-3 control-label-cent nopadding">姓名
													</label> <input id="id_zyjhrxm"
														class="input-text-body col-md-8 input-sm" name="id_zyjhrxm"
														maxlength="25" type="text">
												</div>
											</div>
											<div class="col-md-4 nopadding">
												<div class="col-md-12 col-xs-9 col-md-offset-2">
													<label
														class="col-md-3 col-xs-3 control-label-cent nopadding">电话
													</label> <input id="id_zyjhrdhhm" type="text" name="id_zyjhrdhhm"
														maxlength="20" class="input-text-body col-md-9 input-sm">
												</div>
											</div>
										</div>
										<div class="col-md-4 nopadding">
											<div class="col-md-10 col-xs-9">
												<label
													class="col-md-3 col-xs-3 control-label-cent nopadding">手机
												</label> <input id="id_zyjhrsjhm" type="text" name="id_zyjhrsjhm"
													maxlength="20" class="input-text-body col-md-7 input-sm">
											</div>
										</div>
									</div>

									<div class="form-group nopadding"
										style="margin-top: 5px; margin-bottom: 8px;">
										<div class="col-md-8">
											<div class="col-md-6 nopadding">
												<label class="col-md-4 col-xs-3 control-label">主要监护人
													:</label>
												<div class="col-md-7 col-xs-9">
													<label
														class="col-md-4 col-xs-3 control-label-cent nopadding">姓名
													</label> <input id="id_zyzhrxm"
														class="input-text-body col-md-8 input-sm" name="id_zyzhrxm"
														maxlength="25" type="text">
												</div>
											</div>
											<div class="col-md-4 nopadding">
												<div class="col-md-12 col-xs-9 col-md-offset-2">
													<label
														class="col-md-3 col-xs-3 control-label-cent nopadding">电话
													</label> <input id="id_zyzhrdh" type="text" name="id_zyzhrdh"
														maxlength="20" class="input-text-body col-md-9 input-sm">
												</div>
											</div>
										</div>
										<div class="col-md-4 nopadding">
											<div class="col-md-10 col-xs-9">
												<label
													class="col-md-3 col-xs-3 control-label-cent nopadding">手机
												</label> <input id="id_zyzhrsj" type="text" name="id_zyzhrsj"
													maxlength="20" class="input-text-body col-md-7 input-sm">
											</div>
										</div>
									</div>

									<div class="form-group nopadding"
										style="margin-top: 5px; margin-bottom: 8px;">
										<div class="col-md-8">
											<div class="col-md-6 nopadding">
												<label class="control-label col-md-4">亲属情况 :</label>
												<div class="col-md-7 col-xs-9">
													<label class="control-label-cent col-md-4 nopadding">子女</label>
													<input maxlength="2"
														onkeyup="this.value=this.value.replace(/\D/g,'')"
														id="id_znrs" type="text" name="id_znrs"
														class="col-md-5 input-text-body input-sm"> <label
														class="col-md-2 control-label-cent nopadding">人，</label>
												</div>
											</div>
											<div class="col-md-3 nopadding">
												<label class="control-label-cent col-md-5 nopadding">兄弟姐妹</label>
												<input maxlength="2"
													onkeyup="this.value=this.value.replace(/\D/g,'')"
													id="id_xdjmrs" type="text" name="id_xdjmrs"
													class="col-md-5 input-text-body input-sm nopadding">
												<label class="control-label-cent col-md-2 nopadding">人，</label>
											</div>
											<div class="col-md-3 nopadding">
												<label class="control-label-cent col-md-5 nopadding">孙辈</label>
												<input maxlength="2"
													onkeyup="this.value=this.value.replace(/\D/g,'')" id="id_sbrs"
													type="text" name="id_sbrs"
													class="col-md-5 input-text-body input-sm nopadding">
												<label class="col-md-2 control-label-cent nopadding">人</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- 配偶和亲属情况结束 -->
						<!-- 居住情况开始 -->
						<div class="panel panel-default">
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
									<div class="form-group nopadding"
										style="margin-top: 5px; margin-bottom: 8px;">
										<div class="col-md-2">
												<label class="col-md-10 col-xs-3 control-label">独居 :</label>
										</div>
										<div class="col-md-8 nopadding">
											<div class="col-md-4 nopadding">
												<div class="col-md-10 col-xs-9 nopadding" id="djbzDiv"></div>
											</div>
											<div class="col-md-5 nopadding">
												<label class="col-md-5 col-xs-3 control-label nopadding">同居人员情况:</label>
												<label
													class="col-md-3 col-xs-3 control-label-cent nopadding">总人数</label>
												<input maxlength="2"
													onkeyup="this.value=this.value.replace(/\D/g,'')"
													id="id_tjzrs" type="text" name="id_tjzrs"
													class="input-text-body col-md-3 input-sm"> <label
													class="col-md-1 col-xs-3 control-label nopadding">人</label>
											</div>
										</div>
									</div>

									<div class="form-group nopadding"
										style="margin-top: 5px; margin-bottom: 8px;">
										<div class="col-md-2">
											<label class="control-label col-md-10">亲属情况 :</label>
										</div>
										<div class="col-md-9">
											<div class="col-md-3 col-xs-12 nopadding">
												<label class="control-label-cent col-md-6 nopadding">配偶，子女</label>
												<input maxlength="2"
													onkeyup="this.value=this.value.replace(/\D/g,'')"
													id="id_tjznrs" type="text" name="id_tjznrs"
													class="col-md-4 input-text-body input-sm"> <label
													class="col-md-2 control-label nopadding">人，</label>
											</div>
											<div class="col-md-3 col-xs-12 nopadding">
												<label class="control-label-cent col-md-6 nopadding">兄弟姐妹</label>
												<input maxlength="2"
													onkeyup="this.value=this.value.replace(/\D/g,'')"
													id="id_tjxdjmrs" type="text" name="id_tjxdjmrs"
													class="col-md-4 input-text-body input-sm nopadding">
												<label class="control-label col-md-2 nopadding">人，</label>
											</div>
											<div class="col-md-3 col-xs-12 nopadding">
												<label class="control-label-cent col-md-6 nopadding">孙辈</label>
												<input maxlength="2"
													onkeyup="this.value=this.value.replace(/\D/g,'')"
													id="id_tjsbrs" type="text" name="id_tjsbrs"
													class="col-md-4 input-text-body input-sm nopadding">
												<label class="col-md-2 control-label nopadding">人，</label>
											</div>
											<div class="col-md-3 col-xs-12 nopadding">
												<label class="control-label-cent col-md-6 nopadding">雇佣人</label>
												<input maxlength="2"
													onkeyup="this.value=this.value.replace(/\D/g,'')"
													id="id_tjgyrs" type="text" name="id_tjgyrs"
													class="col-md-4 input-text-body input-sm nopadding">
												<label class="col-md-2 control-label nopadding">人</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- 居住情况结束 -->
						<!-- 申请信息开始 -->
						<div class="panel panel-default">
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

									<div class="form-group nopadding"
										style="margin-top: 5px; margin-bottom: 8px;">
										<div class="col-md-8">
											<div class="col-md-6 nopadding">
												<label class="col-md-4 col-xs-3 control-label">申请人 :</label>
												<div class="col-md-7 col-xs-9">
													<label
														class="col-md-4 col-xs-3 control-label-cent nopadding">姓名
													</label> <input id="id_sqrxm"
														class="input-text-body col-md-8 input-sm" name="id_sqrxm"
														maxlength="25" type="text">
												</div>
											</div>
											<div class="col-md-4 nopadding">
												<div class="col-md-12 col-xs-9 col-md-offset-2">
													<label
														class="col-md-3 col-xs-3 control-label-cent nopadding">电话
													</label> <input id="id_sqrdhhm" type="text" name="id_sqrdhhm"
														maxlength="20" class="input-text-body col-md-9 input-sm">
												</div>
											</div>
										</div>
										<div class="col-md-4 nopadding">
											<div class="col-md-10 col-xs-9">
												<label
													class="col-md-3 col-xs-3 control-label-cent nopadding">手机
												</label> <input id="id_sqrsjhm" type="text" name="id_sqrsjhm"
													maxlength="20" class="input-text-body col-md-7 input-sm">
											</div>
										</div>
									</div>

									<div class="form-group nopadding"
										style="margin-top: 5px; margin-bottom: 8px;">
										<div class="col-md-6">
											<div class="col-md-4">
												<select class="form-control input-sm" id="sqrzjlxdm"
													name="sqrzjlxdm" title="证件类型"></select>
											</div>
											<label class="control-label col-md-1"
												style="width: 0%; padding-left: 0;">:</label>
											<div class="col-md-6">
												<input class="form-control input-sm" id="id_sqrzjhm"
													type="text" name="id_sqrzjhm" title="证件号码"
													maxlength="120" size="20">
											</div>
										</div>
										<div class="col-md-6">
											<div class="col-md-4">
												<select class="form-control input-sm"
													id="sqrklxdm" name="sqrklxdm"
													title="卡类型"></select>
											</div>
											<label class="control-label col-md-1"
												style="width: 0%; padding-left: 0;">:</label>
											<div class="col-md-6">
												<input class="form-control input-sm"
													id="id_sqrkh" type="text"
													name="id_sqrkh" title="卡号">
											</div>
										</div>
									</div>

									<div class="form-group nopadding"
										style="margin-left: 5px; margin-top: 5px; margin-bottom: 8px;">
										<div class="col-md-12">
											<label class="control-label">如非本人申请，受委托人或监护人与老人关系</label>
										</div>
										<div id="ylrgxDiv" class="col-md-12"></div>
									</div>

									<div class="form-group nopadding"
										style="margin-top: 5px; margin-bottom: 8px;">
										<div class="col-md-2">
											<label class="control-label col-md-10">评估类型:</label>
										</div>
										<div class="col-md-10 nopadding" id="pglxDiv"></div>
									</div>

									<div class="form-group nopadding"
										style="margin-top: 5px; margin-bottom: 8px;">
										<div class="col-md-2">
											<label class="control-label col-md-10">预约日期:</label>
										</div>
										<div class="col-md-2">
											<input type="text"
												class="datetimepickers choose-date input-text-body input-sm"
												id="id_yyrq" name="id_yyrq" placeholder="选择时间"
												readonly="readonly">
										</div>
										<label class="col-md-2 control-label">时间段:</label>
										<div class="col-md-4" id="yysjdDiv"></div>
									</div>
								</div>
							</div>
						</div>
						<!-- 申请信息结束 -->
					</div>
				</form>
			</div>
		</div>
	</div>
</div>