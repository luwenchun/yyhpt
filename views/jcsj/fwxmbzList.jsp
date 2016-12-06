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
						<div class="input-group  input-group-sm" style="width: 200px;">
							<input type="text" class="form-control input-sm" id="qrymc"
								placeholder="服务项目标准"> <span class="input-group-btn">
								<button id="btn_query" class="btn btn-default btn-flat btn-sm "
									type="submit">
									<i class="fa fa-search"></i>
								</button>
							</span>
						</div>
					</div>

					<div class="pull-right ">
						<!-- <button type="button" id="btn_clear" class="btn btn-default btn-sm">重置</button>
                     -->
						<!--<button id="add" class="btn btn-danger btn-sm" >
                                                <i class="glyphicon glyphicon-add"></i> 新增
                                            </button>
                                            -->
						<!--button id="more" class="btn btn-default btn-sm">
                            <i class="fa fa-list"></i> 更多
                        </button>
                            <button id="goherf" class="btn btn-default btn-sm">
                            <i class="fa fa-list"></i> 跳转
                        </button-->
						<!--<button id="remove" class="btn btn-default btn-sm " disabled>-->
						<!--删除已选-->
						<!--</button>-->
						<button id="add" class="btn btn-default btn-sm">新增服务项目标准</button>
						<!--button id="ywxmadd" class="btn btn-default btn-sm" >选择业务项目</button-->
						<button id="mobile" class="btn btn-default btn-sm hidden">手机模式</button>
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
<script src="yyhpt/pages/jcsj/fwxmbzList.js" type="text/javascript"></script>
</body>
</html>