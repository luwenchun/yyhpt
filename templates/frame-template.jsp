<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html manifest="yyhpt/templates/frame.manifest">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1,user-scalable=no">
<meta name="format-detection" content="telephone=no" />

<title></title>
<%-- <tiles:insertAttribute name="headInclude" /> --%>
<link rel="shortcut icon" href="${basePath}/images/favicon.ico">
</head>
<body>
	<%-- <tiles:insertAttribute name="topbar" /> --%>

	

		<!-- Main content -->
		<section class="content no-padding"
			id="ajax-content">
			<tiles:insertAttribute name="content" />
		</section>
		<!-- /.content -->
	

	<%-- <tiles:insertAttribute name="footInclude" /> --%>
</body>
</html>