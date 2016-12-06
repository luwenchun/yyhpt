<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1,user-scalable=no">
<meta name="format-detection" content="telephone=no" />

<title>医养结合工作平台</title>
	<script>
		document.title =app.title;
		</script>
<tiles:insertAttribute name="headInclude" />
<link rel="shortcut icon" href="${basePath}/images/favicon.ico">
</head>
<body>
	<%-- <tiles:insertAttribute name="topbar" /> --%>

	
		<!-- Content Header (Page header) -->
		<section class="content-header ">
			<ol class="breadcrumb">
				<li id="title_dh"><i class="fa fa-dashboard">&nbsp;</i>${pagename} &nbsp;</li>
			<!-- 	<li style="float: right;">
					<button type="button" id="frame_refresh"
						class="btn btn-app-sm btn-circle"
						style="background-color: transparent; height: 24px; padding: 1px;">
						<i class="fa fa-repeat "></i>
					</button> &nbsp; &nbsp;
					<button type="button" id="frame_full"
						class="btn btn-app-sm btn-circle"
						style="background-color: transparent; height: 24px; padding: 1px;">
						<i class="fa fa-arrows-alt "></i>
					</button> &nbsp;
				</li> -->
			</ol>
		</section>
		<!-- Main content -->
		<section class="content"
			style="padding-left: 0px; padding-right: 0px; padding-bottom: 0px"
			id="ajax-content">
			<tiles:insertAttribute name="content" />
		</section>
		<!-- /.content -->
	

	<tiles:insertAttribute name="footInclude" />
</body>
</html>