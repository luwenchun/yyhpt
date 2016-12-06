<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <link href="layouts/css/white/detail_page.css" rel="stylesheet">
    <link href="frame/css/extra.css" rel="stylesheet">
    <link href="frame/css/components.min.css" rel="stylesheet" type="text/css"/>
    <script src="yyhpt/pages/jhbggl/jhbgjlzxDetail.js" type="text/javascript"></script>
    <style type="text/css">
        .radio-container {
            padding-left: 8px;
        }

        .head-title {
            margin-top: 0px;
            margin-bottom: 0px;
            font-weight: bold;
            font-size: 20px;
            color: #000000;
        }

        .choose-date {
            background: url("layouts/img/control/img_rl.png") no-repeat scroll right center transparent;
            cursor: pointer;
        }
    </style>
</head>
<body>
<!-- 个人基本信息开始-->
<div class="panel panel-default">
    <div class="panel-body nopadding" style="padding-top: 10px;">
        <div class="form-group list-space-row"  style="padding-left: 15px;">

            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label">姓名：</label>
            </div>
            <p id="hzxm" class="control-label col-md-1 col-xs-8 nopadding"
               style="text-align: left;color: #434343;"></p>

            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label">联系电话：</label>
            </div>
            <p id="lxdh" class="control-label col-md-2 col-xs-9 nopadding"
               style="color: #434343;margin-bottom: 6px;">&nbsp;</p>

            <div class=" col-md-1 col-xs-3 nopadding" style="text-align:right;">

                <label class="control-label nopadding">执行人：</label>
            </div>
            <p id="jhzxryxm" class="control-label col-md-2 col-xs-9 nopadding"
               style="text-align: left;color: #434343;padding-left: 5px;">${ryxm}</p>

            <div class="col-md-1 col-xs-3 nopadding" style="text-align: right;">
                <label class="control-label nopadding">执行日期：</label>
            </div>
            <p id="jhzxrq" class="control-label col-md-3 col-xs-9 nopadding"
               style="text-align: left;color: #434343;"></p>

        </div>
        <div class="form-group list-space-row" style="padding-left: 15px;">

            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label">评估结论：</label>
            </div>
            <p id="pgjlnrgr" class="nopadding col-md-1 col-xs-9 control-label"
               style="text-align: left;color: #434343;"></p>

            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label nopadding">服务频次：</label>
            </div>
            <p id="jhzdfwpc" class="col-md-2 col-xs-9 nopadding control-label"
               style="text-align: left;color: #434343;"></p>
            <div class="col-md-1 col-xs-3" style="padding-left: 0px;padding-right: 0px;">
                <label class="control-label">服务时间：</label>
            </div>
            <p id="jhzdzxsj" class="col-md-5 col-xs-8 nopadding control-label"
               style="text-align: left;color: #434343;padding-left: 5px;"></p>
        </div>

    </div>

</div>

<div id="rqlbDiv" class="panel panel-default">
    <div class="panel-heading" style="display: none">
        <h3 style="margin-top: 0px;margin-bottom: 0px;font-weight:bold;font-size:20px">
            <span class="glyphicon glyphicon-th"></span> 服务包执行</h3>
    </div>
    <div class="form-group" style="margin:10px 0px 10px 8px">
        <div class="panel-body nopadding">
            <div class="col-md-8 col-xs-12 portlet-body form form-horizontal ">
                <div class="form-group col-md-5 ">
                    <label class="col-md-6 col-xs-4 control-label" style=" padding-left: 5px;">服务开始日期:</label>
                    <div class="col-md-6  col-xs-8" style="padding-right: 0px;padding-left: 5px;">
                        <input type="text" class=" input-sm form-control choose-date" id="zxrq" name="zxrq">
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-xs-12 pull-right" style="padding-left: 0px;padding-right: 0px;text-align: right">
                <%--<button id="add" type="button" class="btn btn-default btn-sm" style="display: none">新增</button>--%>
                <button id="run" type="button" value="disabled" class="btn btn-default btn-sm">执行</button>
                <button id="stop" type="button" value="disabled" class="btn btn-default btn-sm" style="display: none">
                    停止
                </button>
                <%--<button id="cacel" type="button" class="btn btn-default btn-sm" style="display: none">取消</button>--%>
                <button id="exit" type='button' class="btn btn-default btn-sm">退出</button>

            </div>
        </div>
    </div>

    <table id="table_fwjhbgjlzx" class="table-container nopadding">
    </table>
</div>

</body>

</html>
