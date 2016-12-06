<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<c:set var="basePath" value="${pageContext.request.contextPath}"
	scope="request" />
<c:set var="staticPath" value="${pageContext.request.contextPath}"
	scope="request" />
<c:set var="staticVer" value="1.0" scope="request" />

<!-- 新 Bootstrap 核心 CSS 文件 -->

<link href="${basePath}/frame/plugins/bootstrap/dist/css/bootstrap.css"
	rel="stylesheet">

<link rel="stylesheet"
	href="${basePath}/frame/plugins/select2/select2.min.css">
<!-- Theme style -->
<link rel="stylesheet" href="${basePath}/frame/css/AdminLTE.css">
<link
	href="${basePath}/frame/plugins/font-awesome/css/font-awesome.min.css"
	rel="stylesheet" type="text/css">
<link rel="stylesheet" href="${basePath}/frame/css/skins/skin-white.css">
<%-- 
<link rel="stylesheet"
	href="${basePath}/frame/css/skins/_all-skins.min.css"> --%>
<link
	href="${basePath}/frame/plugins/bootstrap-datepicker/datepicker.css"
	rel="stylesheet" />
<link
	href="${basePath}/frame/plugins/bootstrap-table/bootstrap-table.css"
	rel="stylesheet" />
<link
	href="${basePath}/frame/plugins/bootstrap-dialog/bootstrap-dialog.min.css"
	rel="stylesheet" />
<link href="${basePath}/frame/css/bootstrap_extra.css"
	rel="stylesheet" />
<link href="${basePath}/frame/plugins/iCheck/all.css" rel="stylesheet" />
<link href="${basePath}/frame/css/extra.css" rel="stylesheet" />
<link rel="shortcut icon" href="${basePath}/frame/img/favicon.ico"
	type="image/x-icon" />
<link
	href="${basePath}/frame/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css"
	rel="stylesheet" />
<!-- <script type="text/javascript"
	src="frame/plugins/RecordLy/HZRecorder.js"></script> -->
<script src="${basePath}/frame/plugins/jquery/dist/jquery-1.9.1.js"></script>

<script
	src="${basePath}/frame/plugins/bootstrap/dist/js/bootstrap.min.js"></script>

<script
	src="${basePath}/frame/plugins/bootstrap-table/bootstrap-table.js"></script>
<script
	src="${basePath}/frame/plugins/bootstrap-table/bootstrap-table-zh-CN.js"></script>


<script src="${basePath}/layouts/scripts/app.js" type="text/javascript"></script>
<script
	src="${basePath}/frame/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"
	type="text/javascript"></script>

<script
	src="${basePath}/frame/plugins/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"
	type="text/javascript" charset="utf-8"></script>
<script type="text/javascript"
	src="http://api.map.baidu.com/api?v=1.5&ak=9f3caf0f96e461b6e78d6d5bf6c7a425"></script>


<script src="${basePath}/frame/scripts/wnform-extra.js"
	type="text/javascript"></script>

<!-- <script type="text/javascript">
	var back = $.cookie("isback");
	if (parseInt(back) >= 2)
		javascript: window.history.forward(1);
</script> -->


