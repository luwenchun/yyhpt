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
			<div class="panel-body toolbar" style="margin-top: 5px;">
				<div class="form-group">
					<div class="pull-left">
						<div class="input-group  input-group-sm" style="width: 200px;">
							<input type="text" class="form-control input-sm" id="qrymc"
								placeholder="服务项目名称"> <span class="input-group-btn">
								<button id="btn_query" class="btn btn-default btn-flat btn-sm "
									type="submit">
									<i class="fa fa-search"></i>
								</button>
							</span>
						</div>
					</div>

					<div class="pull-right">
						<button id="add" type="button" class="btn btn-default btn-sm">新增服务项目</button>
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
<script src="layouts/scripts/layout.js" type="text/javascript"></script>
<script src="yyhpt/pages/jcsj/fwxmList.js" type="text/javascript"></script>
</body>
</html>