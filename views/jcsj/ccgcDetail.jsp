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
						class="required"> * </span>流水号：</label>
					<div class="col-md-8">
						<input type="text" class="form-control  input-sm " maxlength="10"
							name="LSH" id="LSH" placeholder="" />
					</div>
				</div>
				<div class="form-group col-md-5">
					<label class="col-md-4 control-label"><span
						class="required"> * </span>存储过程：</label>
					<div class="col-md-8">
						<input type="text" class="form-control  input-sm " maxlength="50"
							name="CCGC" id="CCGC" placeholder="" />
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
		<div class="panel-heading">
			<h3 class="panel-title">存储过程设置</h3>
		</div>
		<div class="panel-body">
			<div class="form-group col-md-11">
				<label class="col-md-2 control-label">存储过程说明：</label>
				<div class="col-md-10">
					<textarea class="form-control " name="CCGCSM" id="CCGCSM" rows="3"
						placeholder="" maxlength="200"></textarea>
				</div>
			</div>
		</div>
	</div>
</form>
<script src="frame/plugins/jquery-validation/js/jquery.validate.js"
	type="text/javascript"></script>
<script src="yyhpt/pages/jcsj/ccgcDetail.js" type="text/javascript"></script>
</body>
</html>