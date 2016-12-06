<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
	<style type="text/css">
		.list-space-row{
			margin: 3px 0 3px 0;
		}
	</style>
</head>
<body>
<form id="defaultForm" method="post" class="form-horizontal ">
	<div class="page-content">
		<div class="full-height-content full-height-content-scrollable">
			<div class="full-height-content-body">
				<div class="panel panel-default">
					<div class="panel-body">
						<div class="form-group col-md-11 list-space-row">
							<label class="col-md-2 control-label"><span
								class="required"> * </span>主题名称：</label>
							<div class="col-md-9">
								<input type="text" class="form-control  input-sm "
									maxlength="30" name="ZTMC" id="ZTMC" placeholder="" />
							</div>
						</div>
						<div class="form-group col-md-11 list-space-row">
							<label class="col-md-2 control-label"><span
								class="required"> * </span>主题代码：</label>
							<div class="form-group col-md-8">
								<div class="col-md-8">
									<input type="text" class="form-control  input-sm "
										maxlength="8" name="ZTDM" id="ZTDM" placeholder="" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"/>
								</div>
								<div class="form-group col-md-4 col-md-push-1 col-xs-push-1">
									<label class="checkbox"> <input type="checkbox" class="noicheck"
										name="QYBZ" id="QYBZ" value="1" checked="checked" />启用标志
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">主题设置</h3>
					</div>
					<div class="panel-body">
						<div class="form-group col-md-11 list-space-row">
							<label class="col-md-2 control-label">性别：</label>
							<div class="col-md-9 nopadding">
								<div id="xbdiv" class="form-group col-md-10 nopadding"></div>
							</div>
						</div>
						<div class="form-group col-md-11 list-space-row">
							<label class="col-md-2 control-label">年龄段：</label>
							<div class=" col-md-6">
								<div class="form-group col-md-4">
									<input type="text" class="form-control input-sm col-md-2"
										name="NLDQ" id="NLDQ" placeholder="" maxlength="3" />
								</div>
								<label class="col-md-1 control-label ">至</label>
								<div class="form-group col-md-2"></div>
								<div class="form-group col-md-4">
									<input type="text" class="form-control input-sm col-md-2"
										name="NLDZ" id="NLDZ" placeholder="" maxlength="3" />
								</div>
							</div>
						</div>

						<div class="form-group col-md-11 list-space-row">
							<label class="col-md-2 control-label">主题说明：</label>
							<div class="col-md-9">
								<textarea class="form-control " name="ZTSM" id="ZTSM" rows="3"
									placeholder="" maxlength="200"></textarea>
							</div>
						</div>
					</div>
				</div>

				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">执行方式</h3>
					</div>
					<div class="panel-body">
						<label class="checkbox col-md-2 control-label"> <input
							type="radio" name="ZXFS" value="1" checked class="noicheck"> 存储过程
						</label>
						<div class="col-md-3">
							<select class="form-control input-sm" name="CZGC" id="CZGCMX">
							</select>
						</div>
						<label class="checkbox col-lg-2 col-md-2 control-label"> <input
							type="radio" name="ZXFS" value="2" class="noicheck"> 接口服务
						</label>
						<div class="col-lg-3 col-md-3">
							<input type="text" class="form-control input-sm" maxlength="100"
								name="JKFWMX" id="JKFWMX"/>
						</div>
					</div>
				</div>
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">疾病种类</h3>
					</div>
					<div class="panel-body">
						<div class="form-group">
							<div id="jbzldiv" class="col-md-11 nopadding col-md-offset-1"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>
<script src="frame/plugins/jquery-validation/js/jquery.validate.js"
	type="text/javascript"></script>
<script src="yyhpt/pages/jcsj/jkztDetail.js" type="text/javascript"></script>
</body>
</html>