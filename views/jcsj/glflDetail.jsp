<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<form id="defaultForm" method="post" class="form-horizontal ">
	<div class="panel panel-default">
		<div class="panel-body">
			<div class="form-group ">
				<div class="form-group col-md-5">
					<label class="col-md-4 control-label"><span
						class="required"> * </span>项目代码：</label>
					<div class="col-md-8">
						<input type="text" class="form-control  input-sm " maxlength="20"
							name=RQDM id="RQDM" placeholder="" onkeyup="value=value.replace(/[^\d]/g,'')"/>
					</div>
				</div>
				<div class="form-group col-md-5">
					<label class="col-md-4 control-label"><span
						class="required"> * </span>项目名称：</label>
					<div class="col-md-8">
						<input type="text" class="form-control  input-sm " maxlength="50"
							name="RQMC" id="RQMC" placeholder="" />
					</div>
				</div>
				<div class="form-group col-md-2 col-md-push-1 col-xs-push-1">

					<label class="checkbox"> <input type="checkbox" name="QYBZ"
						id="QYBZ" value="1" checked="checked" />启用标志
					</label>
				</div>
			</div>
		</div>
	</div>

	<div class="panel panel-default">		
		<div class="panel-body">
			<div class="form-group col-md-6">
				<label class="col-md-4 control-label pull-left">类别名称：</label>
				<div class="col-md-8">
					<select id="YWLBDM" name="YWLBMC" class="form-control "
						data-placeholder="请选择" style="width: 100%;"></select>
				</div>
			</div>

			<div class="form-group col-md-6">
				<label class="col-md-4 control-label">管理等级：</label>
				<div class="col-md-8">
					<select id="RQLBDM" name="RQLBMC" class="form-control "
						data-placeholder="请选择" style="width: 100%;"></select>
				</div>
			</div>
		</div>
	</div>
	
	<div class="panel panel-default">		
		<div class="panel-body">
			<div class="form-group col-md-6">
				<label class="col-md-4 control-label pull-left">管理项目说明：</label>
				<div class="col-md-8">
					<input type="text" class="form-control  input-sm " maxlength="10"
							name=RQSM id="RQSM" placeholder="" />
				</div>
			</div>

			<div class="form-group col-md-6">
				<label class="col-md-4 control-label">业务查询语句：</label>
				<div class="col-md-8">
					<input type="text" class="form-control  input-sm " maxlength="10"
							name=YWCXYJ id="YWCXYJ" placeholder="" />
				</div>
			</div>
		</div>
	</div>
</form>
<script src="frame/plugins/jquery-validation/js/jquery.validate.js"
	type="text/javascript"></script>
<script src="yyhpt/pages/jcsj/glflDetail.js" type="text/javascript"></script>
</body>
</html>