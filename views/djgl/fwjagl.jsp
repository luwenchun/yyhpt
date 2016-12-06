<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<style type="text/css">
.choose-date {
	background: url("layouts/img/control/img_rl.png") no-repeat scroll right
		center transparent;
	cursor: pointer;
}

.head-title {
	margin-top: 0px;
	margin-bottom: 0px;
	font-weight: bold;
	font-size: 20px;
	color: #000000;
}

.base-info-personal {
	text-align: left;
	color: #000000;
}

.list-space-row {
	margin: 0 0 7px 0;
}

.form-horizontal .form-group {
	margin-right: -15px;
	margin-left: 0px;
}

.row {
	margin-right: 15px;
	margin-left: -15px;
}
#id_jasq {
	margin-right: -15px;
	margin-left: 15px;
}
#id_shjg {
	margin-right: -15px;
	margin-left: 15px;
}

.list-row-space {
	margin: 3px 0 3px 0;
}
</style>
<link href="layouts/css/white/detail_page.css" rel="stylesheet">
</head>
<body>
	<div class="panel-body">
		<!-- 个人基本信息开始-->
		<div class="panel panel-default">
			<div class="panel-heading" style="height: 40px">
				<a data-toggle="collapse" data-parent="#accordion"
					href="#grjbxxcontent">
					<h3
						style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
						<span class="glyphicon glyphicon-th"></span> 个人信息
					</h3>
				</a>
			</div>
			<div id="grjbxxcontent" class="panel-collapse collapse in nopadding">
				<div
					class="form-horizontal form-bordered form-row-stripped nopadding">
					<div class="form-group list-space-row">
						<div class="col-md-1 col-xs-3 nopadding"
							style="text-align: right;">
							<label class="control-label">姓名：</label>
						</div>
						<p id="XM" class="control-label col-md-1 col-xs-8 nopadding"
							style="text-align: left; color: #434343;"></p>

						<div class="col-md-1 col-xs-3 nopadding"
							style="text-align: right;">
							<label class="control-label">性别：</label>
						</div>
						<p id="XB" class="control-label col-md-1 col-xs-9 nopadding"
							style="text-align: left; color: #434343;"></p>

						<div class="col-md-1 col-xs-3 nopadding"
							style="text-align: right;">
							<label class="control-label nopadding">出生日期：</label>
						</div>
						<p id="CSRQ" class="control-label col-md-2 col-xs-9 nopadding"
							style="text-align: left; color: #434343;"></p>
						<div class="col-md-1 col-xs-3 nopadding"
							style="text-align: right;">
							<label class="control-label nopadding">身份证号：</label>
						</div>
						<p id="SFZH" class="control-label col-md-3 col-xs-9 nopadding"
							style="text-align: left; color: #434343;"></p>
					</div>
					<hr class="hrmin" />
					<div class="form-group list-space-row">
						<div class="col-md-1 col-xs-3 nopadding"
							style="text-align: right;">
							<label class="control-label">联系地址：</label>
						</div>
						<p id="LXDZ" class="nopadding col-md-4 col-xs-9 control-label"
							style="text-align: left; color: #434343;"></p>
						<div class="col-md-1 col-xs-3 nopadding"
							style="text-align: right;">
							<label class="control-label nopadding">医保类别：</label>
						</div>
						<p id="YLFYZFFSMC" class="col-md-1 col-xs-9 nopadding control-label"
							style="text-align: left; color: #434343;"></p>
						<div class="col-md-1 col-xs-3 nopadding"
							style="text-align: right;">
							<label class="control-label nopadding">联系电话：</label>
						</div>
						<p id="LXDH" class="col-md-2 col-xs-9 nopadding control-label"
							style="text-align: left; color: #434343;"></p>
						<div class="col-md-2 col-xs-9">
							<button id="btn_EHR" class="btn btn-default btn-sm hidden"
								style='margin-right: 20px; margin-top: 3px;'>调阅EHR明细</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 个人基本信息结束 -->

		<!-- 结案信息开始 -->
		<form id="defaultForm" method="post" class="form-horizontal">
			<div class="panel-content" id="table-theme">
				<div class="panel panel-default" id="fwjaPage">
					<div class="panel-heading" style="height: 40px">
						<a data-toggle="collapse" data-parent="#accordion"
							href="#jaxxcontent">
							<h3
								style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
								<span class="glyphicon glyphicon-th"></span> 结案信息
							</h3>
						</a>
					</div>
					<div id="jaxxcontent" class="panel-collapse collapse in nopadding">
						<div class="form-bordered form-row-stripped nopadding row">
							<div id="id_jasq" class="col-md-12">
								<div class="col-md-12">
									<div class="col-md-9 col-xs-12 nopadding">
										<label
											class="col-md-2 control-label nopadding list-row-space"
											style="text-align: center;">结案原因：</label>
										<div class="col-md-6 nopadding list-row-space">
											<div id="jayydmdiv" class="col-md-12 control-label nopadding"
												style="text-align: left"></div>
										</div>
										<div class="col-md-3 input-group nopadding list-row-space">
											<input class="form-control nopadding input-sm col-md-4"
												id="jayysm"
												style="height: 28px; border-width: 0px 0px 1px; border-bottom-style: solid; border-bottom-color: silver; display: block;">
										</div>
									</div>
								</div>
								<div class="col-md-12">
									<div class="col-md-9 nopadding">
										<label
											class="control-label col-md-2 col-xs-4 nopadding list-row-space"
											style="text-align: center;">结案类型：</label>
										<div
											class="col-md-5 col-xs-8 control-label nopadding list-row-space"
											id="jalxdiv" style="text-align: left"></div>
										<div class="form-group col-md-5 nopadding list-row-space">
											<label class="control-label col-md-4 col-xs-4 nopadding"
												style="text-align: center;">结案日期：</label>
											<div class="input-group col-md-5 col-xs-8 nopadding">
												<input type="text" class="form-control input-sm choose-date"
													name="jarq" id="jarq" title="结案日期" readonly="readonly"
													style="background-color: white;">
											</div>
										</div>
									</div>
									<div class="col-md-12 nopadding">
										<div class="col-md-9 nopadding">
											<label
												class="control-label col-md-2 col-xs-4 nopadding list-row-space"
												style="text-align: center;">申请人员：</label>
											<div class="col-md-3 col-xs-8 nopadding list-row-space">
												<select id="sqrgh" name="sqrxm"
													class="form-control input-sm"></select>
											</div>
											<div class="col-md-2 nopadding"></div>
											<div class="form-group col-md-5 nopadding">
												<label
													class="control-label col-md-4 col-xs-4 nopadding list-row-space"
													style="text-align: center;">申请日期：</label>
												<div
													class="input-group col-md-5 col-xs-8 nopadding list-row-space">
													<input type="text"
														class="form-control input-sm form-control choose-date"
														name="sqrq" id="sqrq" title="申请日期" readonly="readonly"
														style="background-color: white;">
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div id="id_shjg" class="col-md-12">
								<div class="col-md-12">
									<div class="col-md-9 nopadding">
										<label
											class="control-label col-md-2 col-xs-4 nopadding list-row-space"
											style="text-align: center;">审核结果：</label>
										<div
											class="col-md-5 col-xs-8 control-label nopadding list-row-space"
											style="text-align: left;" id="shjgdiv"></div>
										<div class="col-md-4 nopadding">
											<input class="form-control input-sm" id="shbtgyy"
												style="border: 0px; border-bottom: 1px solid silver;">
										</div>
									</div>
								</div>
								<div class="col-md-12">
									<div class="col-md-9 nopadding">
										<label
											class="control-label col-md-2 col-xs-4 nopadding list-row-space"
											style="text-align: center;">审核人员：</label>
										<div class="col-md-3 col-xs-8 nopadding list-row-space">
											<select id="shrgh" name="shrxm" class="form-control input-sm"></select>
										</div>
										<div class="col-md-2"></div>
										<div class="form-group col-md-5 nopadding">
											<label
												class="control-label col-md-4 col-xs-4 nopadding list-row-space"
												style="text-align: center;">审核日期：</label>
											<div class="input-group col-md-5 col-xs-8 list-row-space">
												<input type="text"
													class="form-control input-sm form-control choose-date"
													name="shrq" id="shrq" title="审核日期" readonly="readonly"
													style="background-color: white;">
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
		<!-- 结案信息结束 -->
	</div>
</body>
<script src="yyhpt/pages/djgl/fwjaglDetail.js" type="text/javascript"></script>
</html>