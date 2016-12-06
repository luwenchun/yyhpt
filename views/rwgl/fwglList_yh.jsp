<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title></title>
    <link href="layouts/css/white/list_page.css" rel="stylesheet">
    <script src="frame/plugins/counterup/jquery.waypoints.min.js"></script>
    <script src="frame/plugins/counterup/jquery.counterup.js"></script>
</head>
<body>
<div class="panel-body">
    <form id="rwglListForm" method="post" class="form-horizontal fwgl-list-font">
        <!-- /.row -->
        <div id="rwglListItem" class="row">
            <div class="col-lg-4 col-md-4" id="firstDiv">
                <div class="panel list-panel-border">
                    <div class="panel-heading list-panel-head">
                        <div class="row" id="fwdjDiv">
                            <div class="col-xs-2 col-md-2 panel-bg-turquoise list-title-left-col">
                                <strong class="list-title">服务<br/>登记</strong>
                            </div>
                            <a href="#">
                                <div class="col-xs-10 col-md-10 list-title-middel-col" id="fwdjBlock">
                                    <span class="list-title-space list-title-statu highlight"
                                          style="padding-left: 35px;padding-right: 10px;">
                                        <strong id="fwdjWdjNum" class="list-title-turquoise counter"
                                                style="font-size: 44px;">0</strong>
                                        <span>未登记</span>
                                    </span>
                                    <span class="list-title-space list-title-statu">
                                        <strong id="fwdjYdjNum" class="list-title-num list-title-turquoise counter"
                                                style="font-size: 44px;">0</strong>
                                        <span>已登记</span>
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4" id="secondDiv">
                <div class="panel list-panel-border-red">
                    <div class="panel-heading list-panel-head">
                        <div class="row" id="fwpjDiv">
                            <div class="col-xs-2 col-md-2 panel-bg-red list-title-left-col">
                                <strong class="list-title">医护<br/>评价</strong>
                            </div>
                            <a href="#">
                                <div class="col-xs-10 col-md-10 list-title-middel-col" id="fwpjBlock">
                                    <span class="list-title-space list-title-statu"
                                          style="padding-left: 35px;padding-right: 10px;">
                                        <strong id="fwpjWpjNum" class="list-title-red counter"
                                                style="font-size: 44px;">0</strong>
                                        <span>未评价</span>
                                    </span>
                                        <span class="list-title-space list-title-statu">
                                        <strong id="fwpjYpjNum" class="list-title-num list-title-red counter"
                                                style="font-size: 44px;">0</strong>
                                        <span>已评价</span>
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4" id="thirdDiv">
                <div class="panel list-panel-border-gray">
                    <div class="panel-heading list-panel-head">
                        <div class="row" id="fwhfDiv">
                            <div class="col-xs-2 col-md-2 panel-bg-gray list-title-left-col">
                                <strong class="list-title">服务<br/>回访</strong>
                            </div>
                            <a href="#">
                                <div class="col-xs-10 col-md-10 list-title-middel-col" id="fwhfBlock">
                                    <span class="list-title-space list-title-statu"
                                          style="padding-left: 35px;padding-right: 10px;">
                                        <strong id="fwhfWhfNum" class="list-title-gray counter"
                                                style="font-size: 44px;">0</strong>
                                        <span>未回访</span>
                                    </span>
                                        <span class="list-title-space list-title-statu">
                                        <strong id="fwhfYhfNum" class="list-title-num list-title-gray counter"
                                                style="font-size: 44px;">0</strong>
                                        <span>已回访</span>
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="rqlbDiv" class="panel panel-default">
            <div class="panel-heading" id="fwgl-title" style="font-size:16px;color:#434343;font-weight:bold;">
                <span class="glyphicon glyphicon-th"></span> 服务管理列表
            </div>

            <div class="form-group" style="margin:5px 0px 5px 0px;">
                <label class="col-md-1 control-label">姓名：</label>
                <div class="col-md-2">
                    <input type="text" class="form-control input-sm" id="xmSearch" placeholder="" maxlength="15">
                </div>

                <%--<label class="col-md-2 control-label">身份证号：</label>
                <div class="col-md-3">
                    <input type="text" class="form-control input-sm" id="sfzh" placeholder="" maxlength="18">
                </div>--%>

                <div style="display: none">
                    <label class="col-md-1 control-label">责任人：</label>
                    <div class="col-md-2">
                        <select class="form-control input-sm" name="zrr" id="zrr">

                        </select>
                    </div>
                </div>
                <div class="pull-right list-btnDiv">
                    <button id="btn_query" class="btn btn-default btn-sm">
                        查询
                    </button>
                    <button id="export" class="btn btn-default btn-sm">
                        导出
                    </button>
                    <button id="more" class="btn btn-default btn-sm" style="display: none">
                        更多
                    </button>
                </div>
            </div>
            <div id="more_search_div" class="form-group" style="margin:0px 0px 5px 0px;display:none;">
                <label class="col-md-1 control-label">登记状态：</label>
                <div class="col-md-2">
                    <select class="form-control input-sm" name="djzt" id="djzt">
                        <option value="">--请选择--</option>
                        <option value="0">未登记</option>
                        <option value="1">已登记</option>
                    </select>
                </div>

                <label class="col-md-1 control-label">评价状态：</label>
                <div class="col-md-2">
                    <select class="form-control input-sm" name="pjzt" id="pjzt">
                        <option value="">--请选择--</option>
                        <option value="0">未评价</option>
                        <option value="1">已评价</option>
                    </select>
                </div>

                <label class="col-md-1 control-label">回访状态：</label>
                <div class="col-md-2">
                    <select class="form-control input-sm" name="hfzt" id="hfzt">
                        <option value="">--请选择--</option>
                        <option value="0">未回访</option>
                        <option value="1">已回访</option>
                    </select>
                </div>
                <!-- <div class="col-md-3">
                    <label style="padding-top: 5px;margin-right: 30px;"><input name="rdHfzt" type="radio" value="" checked/> 全部 </label>
                    <label style="margin-right: 30px;">
                        <input name="rdHfzt" type="radio" value="0" /> 未回访 </label>
                    <label><input name="rdHfzt" type="radio" value="1" /> 已回访 </label>
                </div> -->
            </div>
            <table id="table" class="table-container"></table>
        </div>
    </form>
    <div id="toolbar"></div>
</div>
<script src="${basePath}/yyhpt/pages/rwgl/fwglList_yh.js" type="text/javascript"></script>
</body>
</html>