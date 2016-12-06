<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
</head>
<body>
	<div class="panel-body">
		<form id="rwglListForm" method="post" class="form-horizontal">
			<!-- /.row -->
			<div id="rwglListItem" class="row">
				<div class="col-lg-4 col-md-4">
					<div class="panel panel-border-turquoise">
						<div class="panel-heading" style = "padding: 0px 15px 0px 15px;border-bottom: 0px;height:70px;">						
							<div class="row" id="fwdjDiv">
								<div class="col-xs-2 col-md-2 panel-bg-turquoise" 
									style = "padding: 14px 0px 14px 0px;text-align:center;">
										<strong style="color:#FFFFFF">我的<br/>任务</strong>
								</div>
								<div class="col-xs-5 col-md-5" style = "padding: 0px 0px 0px 10px;">
									<div style="margin-top:10px">
										<strong id = "qbrwNum">0</strong>
									</div>
									<h5 style="margin-top: 10px;color:#808080;">
										全部任务
									</h5>
								</div>
								<div class="col-xs-5 col-md-5 text-right">
									<div style="margin-top:10px"><img src="${basePath}/yyhpt/pages/img/jhgl-jhzd.png" /></div>
									<h5 style="margin-top: 10px;" title="点击查看详情">
										<a id="qbrwQuery" href="#">
											<strong style="color:#00CED1">查看详情>></strong>
										</a>
									</h5>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-4 col-md-4">
					<div class="panel panel-border-red">
						<div class="panel-heading" style = "padding: 0px 15px 0px 15px;border-bottom: 0px;height:70px;">						
							<div class="row" id="fwpjDiv">
								<div class="col-xs-2 col-md-2 panel-bg-red" 
									style = "padding: 14px 0px 14px 0px;text-align:center;">
										<strong style="color:#FFFFFF">到期<br/>任务</strong>
								</div>
								<div class="col-xs-5 col-md-5" style = "padding: 0px 0px 0px 10px;">
									<div style="margin-top:10px">
										<strong id = "dqrwNum">0</strong>
									</div>
									<h5 style="margin-top: 10px;color:#808080;">
										即将到期
									</h5>
								</div>
								<div class="col-xs-5 col-md-5 text-right">
									<div style="margin-top:10px"><img src="${basePath}/yyhpt/pages/img/jhgl-jhsh.png" /></div>
									<h5 style="margin-top: 10px;" title="点击查看详情">
										<a id="dqrwQuery" href="#">
											<strong>查看详情>></strong>
										</a>
									</h5>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-4 col-md-4">
					<div class="panel panel-border-black">
						<div class="panel-heading" style = "padding: 0px 15px 0px 15px;border-bottom: 0px;height:70px;">						
							<div class="row" id="fwhfDiv">
								<div class="col-xs-2 col-md-2 panel-bg-black" 
									style = "padding: 14px 0px 14px 0px;text-align:center;">
										<strong style="color:#FFFFFF">过期<br/>任务</strong>
								</div>
								<div class="col-xs-5 col-md-5" style = "padding: 0px 0px 0px 10px;">
									<div style="margin-top:10px;color:#808080;">
										<strong id = "ygqrwNum">0</strong>
									</div>
									<h5 style="margin-top: 10px;color:#808080;">
										已过期
									</h5>
								</div>
								<div class="col-xs-5 col-md-5 text-right">
									<div style="margin-top:10px"><img src="${basePath}/yyhpt/pages/img/jhgl-jhzx.png" /></div>
									<h5 style="margin-top: 10px;" title="点击查看详情">
										<a id="ygqrwQuery" href="#">
											<strong>查看详情>></strong>
										</a>
									</h5>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div id="rqlbDiv" class="panel panel-default">
				<div class="panel-heading">
					<h3 style="margin-top: 0px;margin-bottom: 0px;font-weight:bold;font-size:20px">
						<span class="glyphicon glyphicon-th"></span> 任务管理列表</h3>
				</div>
	
				<div class="form-group" style="margin:10px 0px 10px 0px;">
					<label class="col-md-1 control-label" >姓名:</label>
					<div class="col-md-2">
						<input type="text" class="form-control input-sm" id="xm" placeholder="" maxlength="15">
					</div>
		
					<label class="col-md-1 control-label" >身份证号：</label>
					<div class="col-md-2">
						<input type="text" class="form-control input-sm" id="sfzh" placeholder="" maxlength="18">
					</div>
		
					<label class="col-md-1 control-label" >责任人：</label>
					<div class="col-md-3">
						<select class="form-control input-sm" name="qyys" id="qyys">
		
						</select>
					</div>
					<div class="pull-right" id="rwglList_btnDiv">
						<button id="btn_query" class="btn btn-default btn-sm">
							查询
						</button>
						<button id="export" class="btn btn-default btn-sm" >
							导出
						</button>
						<button id="more" class="btn btn-default btn-sm" >
							更多
						</button>
					</div>
				</div>
				<table id="table" class="table-container"></table>
			</div>
		</form>
		<div id="toolbar"></div>
	</div>
	
	<script src="${basePath}/yyhpt/pages/rwgl/rwglList.js" type="text/javascript"></script>
	
	<style type="text/css">
		#rwglListForm{
			font-size: 15px;
		}
		#rwglListItem a {	    
		    text-decoration: underline;
		}
		#rwglList_btnDiv{
			padding-right:15px;
		}
		
		.panel-border-turquoise {
		    border-color: #00CED1;
		}
		.panel-bg-turquoise {
		    background-color: #00CED1;
		}	
		#fwdjDiv a{
			color: #00CED1;
		}
		#fwdjDiv strong{
			color: #00CED1;
		}
		
		.panel-border-red {
		    border-color: #EB6841;
		}
		.panel-bg-red {
		    background-color: #EB6841;
		}	
		#fwpjDiv a{
			color: #EB6841;
		}
		#fwpjDiv strong{
			color: #EB6841;
		}
		
		.panel-border-black {
		    border-color: #000000;
		}
		.panel-bg-black {
		    background-color: #000000;
		}	
		#fwhfDiv a{
			color: #000000;
		}
		#fwhfDiv strong{
			color: #000000;
		}
		#rqlbDiv label{
			font-weight:normal;
		}
	</style>
	
</body>
</html>