<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<div class="page-content">
	<div class="panel-body notopbottom">
		<form id="defaultForm2" method="post" class="form-horizontal"
			onclick="return false;" style="font-size: 13px;">
			<div style="margin-top: 5px;" class="panel-body toolbar">
				<div class="form-group">
					<div class="pull-left">
						<div class="input-group  input-group-sm" style="width: 230px">
							<input type="text" class="form-control input-sm" id="fwpcQuery"
								placeholder="服务频次名称"> <span class="input-group-btn">
								<button id="btn_query" class="btn btn-default btn-flat btn-sm "
									type="submit">
									<i class="fa fa-search"></i>
								</button>
							</span>
						</div>
					</div>
					<div class="pull-right ">
						<button id="add" type="button" class="btn btn-default btn-sm">新增服务频次</button>
					</div>
				</div>
			</div>
		</form>
	</div>
	<div class="full-height-content full-height-content-scrollable">
		<div class="full-height-content-body">
			<div class="panel-body fullhgtpanel">
				<table id="table" class="table-container"></table>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src='yyhpt/pages/jcsj/fwpcList.js'></script>

<script src="frame/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js" type="text/javascript"></script>
<script src="frame/plugins/bootstrap-tagsinput/bootstrap-tagsinput.js" type="text/javascript"></script>
<script src="frame/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="frame/plugins/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js" type="text/javascript"
        charset="utf-8"></script>
<script src="frame/plugins/select2/v3/select2.js" type="text/javascript"></script>
<script src="frame/plugins/select2/v3/select2_locale_zh-CN.js" type="text/javascript"></script>
</body>
<link href="frame/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css" rel="stylesheet"/>
<link href="frame/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css" rel="stylesheet"/>

<link href="frame/plugins/select2/v3/select2.css" rel="stylesheet"/>
<link href="frame/plugins/select2/v3/select2-bootstrap.css" rel="stylesheet"/>
</html>