<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<link href="layouts/css/white/list_page.css" rel="stylesheet">
</head>
<body>
	<div class="panel-body">
		<form id="grywdhListForm" method="post" class="form-horizontal fwgl-list-font">
			
			<div id="listDiv" class="panel panel-default">
				<div class="panel-heading" id="grywdh_title" style="font-size:16px;
					 color:#434343;font-weight:bold;">
						<span class="glyphicon glyphicon-th"></span> 个人业务导航列表
				</div>
	
				<div class="form-group" style="margin:5px 0px 5px 0px;">
					<label class="col-md-1 control-label" >姓名：</label>
					<div class="col-md-2">
						<input type="text" class="form-control input-sm" id="xmSearch" placeholder="" maxlength="15">
					</div>
		
					<label class="col-md-1 control-label" >身份证号：</label>
					<div class="col-md-2">
						<input type="text" class="form-control input-sm" id="sfzhSearch" placeholder="" maxlength="18">
					</div>

					<div class="pull-right list-btnDiv" style="margin-top:5px">
						<button id="btn_query" class="btn btn-default btn-sm">
							查询
						</button>
					</div>
				</div>

				<table id="table" class="table-container"></table>
			</div>
		</form>
		<div id="toolbar"></div>
	</div>
	
<script src="${basePath}/yyhpt/pages/grywdh/grywdh_list.js" type="text/javascript"></script>
	
</body>
</html>