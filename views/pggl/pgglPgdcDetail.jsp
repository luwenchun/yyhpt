<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>评估调查问卷</title>

<style type="text/css">
	.pgdc-title{
		font-size:20px;
		text-align:center;
	}
	.pgdc-xm{
		font-size:16px;
		font-weight:bold;
	}
	.pgdc-top-space{
		padding-top: 8px;
	}
	.pgdc-second-title{
		font-size:16px;
		font-weight:bold;
	}
	.pgdc-third-title{
		font-size:15px;
	}
	.pgdc-input-noborder{
		border:0;
		border-bottom:1px solid #000000;
		font-weight:bold;
	}
	.pgdc-col-space{
    	padding-left: 30px;
		padding-right: 0px;
	}
</style>
</head>
<body>
	<form id="pgdcForm" method="post" class="form-horizontal" style="font-size: 13px;">
		<div class="form-body">
			<div class="pgdc-title">
				<strong id="pgdc_title">老年人能力评估表</strong>
			</div>
			<div class="form-group">	
				<p class="col-sm-3 col-md-3">姓名：<u class="pgdc-xm" id="pgdc_xm"></u></p>			
<!-- 				<label class="col-sm-2 col-md-1  control-label">姓名：</label>
				<div class="col-sm-3 col-md-2">
					<input type="text" class="form-control pgdc-input-noborder" id="pgdc_xm" maxlength="25">
				</div> -->
			</div>
			
			<div class="form-group">				
				<div id="pgdc_Content" class="panel-collapse collapse in">
					<!-- <div class="panel-body">
						<ul id="pgdc_tabItem" class="nav nav-tabs">
						   <li class="active">
						      <a id = "rcshhdItem" href="#rcshhdContent" data-toggle="tab">日常生活活动评估表</a>
						   </li>
						   <li><a id = "jsztItem" href="#jsztContent" data-toggle="tab">精神状态</a></li>
						   <li><a id = "gzjygtItem" href="#gzjygtContent" data-toggle="tab">感知觉与沟通</a></li>
						   <li><a id = "shcyItem" href="#shcyContent" data-toggle="tab">社会参与</a></li>
						</ul>
					</div> -->
					<nav class="navbar navbar-default navbar-static navbar-static-top" role="navigation">
						<div class="container-fluid">
							<div class="navbar-header">
								<button type="button" class="navbar-toggle" data-toggle="collapse"
										data-target="#example-navbar-collapse">
									<span class="sr-only">切换导航</span>
									<span class="icon-bar"></span>
									<span class="icon-bar"></span>
									<span class="icon-bar"></span>
								</button>
							</div>
							<div class="collapse navbar-collapse" id="example-navbar-collapse">
								<ul class="nav navbar-nav" id="pgdc_tabItem"></ul>
							</div>
						</div>
					</nav>
					<div id="pgdc_tabContent" class="tab-content">
					   
					</div>
				</div>
			</div>
			
			
		</div>
		<input type="text" class="form-control   input-sm hidden"
				id="PGDC_DCJLLSH" name="PGDC_DCJLLSH" placeholder="用于绑定调查记录流水号" />
	</form>
	
<script src="yyhpt/pages/pggl/pgglPgdcDetail.js" type="text/javascript"></script>
</body>
</html>