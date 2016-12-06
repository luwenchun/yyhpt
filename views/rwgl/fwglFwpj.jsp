<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<link href="layouts/css/white/detail_page.css" rel="stylesheet">
<link href="frame/plugins/bootstrap-star-rating-master/css/star-rating.css" 
	media="all" rel="stylesheet" type="text/css"/>
<script src="frame/plugins/bootstrap-star-rating-master/js/star-rating.js" type="text/javascript"></script>
</head>
<body>
	<form id="fwpjForm" method="post" class="form-horizontal"
		 onclick="return false;" style="font-size: 13px;">
		<div class="form-body dialog-form-body">
			<div class="form-group">				
				<div class="col-md-12 control-title">
					<p id="FWPJTITLE"></p>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 control-label">服务时间：</label>
				<div class="col-md-4 ">
					<p id="FWSJ" class="control-static control-content"></p>
				</div>
				<label class="col-md-2 control-label">联系电话：</label>
				<div class="col-md-4 " style="padding-bottom: 2px;">
					<p id="LXDH" class="control-static control-content"></p>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2 control-label">服务地址：</label>
				<div class="col-md-4 ">
					<p id="FWDZ" class="control-static control-content"></p>
				</div>
			</div>			
			<div id = "pjTableDiv" style="margin-top: 5px;">
				<table id="pjxmmxTable" class="table-container"></table>
			</div>			
			<div class="form-group">
				<label class="col-md-2 control-label">未完成服务数量：</label>
				<div class="col-md-4">
					<p id="WWCXMS" class="control-static control-content"></p>
				</div>
			</div>	
			<div class="form-group" style="display: none">
			<%--	<label class="col-md-2 control-label">应服务总时长：</label>
				<div class="col-md-4">
					<p class="control-static control-content"><span id="YFWSC"></span> 小时</p>
				</div>--%>
				<label class="col-md-2 control-label">实际服务总时长：</label>
				<div class="col-md-3">
					<input type="number" class="form-control input-sm control-content numvalue" id="SJFWSC" min=0 step="0.1" max="24"
						style="width: 80%;float:left;" name="SJFWSC" placeholder="" onkeyup="checkFwzscNum(this)" onchange=caculatePf()>
					<p class="control-static control-content" style="padding-top: 4px;">小时</p>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2  control-label">服务态度：</label>
				<div id="FWTDDIV" class="col-md-4 rating-stars-fwpf">
					
				</div>
				<label class="col-md-2  control-label">服务质量：</label>
				<div id="FWZLDIV" class="col-md-4 rating-stars-fwpf">
					
				</div>
			</div>	
			<div class="form-group">
				<label class="col-md-2  control-label">总分：</label>
				<div class="col-md-4">
					<p class="control-static control-content">
						<span id="ZF" name="ZF" style="font-size:18px;color:#00a65a;"></span> 分</p>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2  control-label">投诉与建议：</label>
				<div class="col-md-10">
					<textarea class="form-control input-sm control-content" maxlength="250"
						name="TSJY" id="TSJY"></textarea>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-2  control-label">评价日期：</label>
				<div class="col-md-4">
					<p id="PJRQ" class="control-static control-content"></p>
				</div>
				<label class="col-md-2  control-label">评价人员：</label>
				<div class="col-md-4">
					<p id="PJRYXM" class="control-static control-content"></p>
				</div>
			</div>			
			<input type="text" class="form-control   input-sm hidden"
						id="PJLSH" name="PJLSH" placeholder="用于绑定服务评价流水号" />
			<input type="text" class="form-control   input-sm hidden"
						id="FWJLLSH" name="FWJLLSH" placeholder="用于绑定服务记录流水号" />
			<input type="text" class="form-control   input-sm hidden"
								id="YNGRBSH" name="YNGRBSH" placeholder="用于绑定域内个人标识号" />
	</div>
	</form>
		

<script src="yyhpt/pages/rwgl/fwglFwpj.js" type="text/javascript"></script>

</body>
</html>