<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <link href="layouts/css/white/detail_page.css" rel="stylesheet">
    <link href="frame/css/extra.css" rel="stylesheet">
    <link href="frame/plugins/bootstrap-fileinput/bootstrap-fileinput-mulitple.css" rel="stylesheet" type="text/css"/>
    <link href="frame/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css" rel="stylesheet"/>
    <link href="frame/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css" rel="stylesheet"/>
    <link href="frame/plugins/select2/v3/select2.css" rel="stylesheet"/>
    <link href="frame/plugins/select2/v3/select2-bootstrap.css" rel="stylesheet"/>
    <script src="yyhpt/pages/jhbgglhy/jhbgjlHYDetail.js" type="text/javascript"></script>
    <script src="yyhpt/pages/jhglhy/jhdetail_pub.js" type="text/javascript"></script>
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
<div class="panel panel-default" id="defaultForm">
    <div class="panel-body nopadding" style="padding-top: 10px;">
        <div class="form-group list-space-row" style="padding-left: 15px;">
            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label">姓名：</label>
            </div>

            <p id="hzxm" class="control-label col-md-1 col-xs-8 nopadding"
               style="text-align: left;color: #434343;"></p>
            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label">联系电话：</label>
            </div>
            <p id="lxdh" class="control-label col-md-2 col-xs-9 nopadding"
               style="text-align: left;color: #434343;">&nbsp;</p>

            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label nopadding">制定人：</label>
            </div>
            <p id="jhzdryxm" class="control-label col-md-2 col-xs-9 nopadding"
               style="text-align: left;color: #434343;padding-left: 5px;">${ryxm}</p>
            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label nopadding">制定日期：</label>
            </div>
            <p id="jhzdrq" class="control-label col-md-3 col-xs-9 nopadding"
               style="text-align: left;color: #434343;"></p>
        </div>
        <div class="form-group list-space-row" style="padding-left: 15px;">
            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label">评估结论：</label>
            </div>
            <p id="pgjlnrgr" class="nopadding col-md-3 col-xs-9  control-label"
               style="text-align: left;color: #434343;"></p>
            <label class="control-label col-md-2 col-xs-3" id="jhzd_fwpc"
                   style="display: block;padding-left: 0px;text-align: right">服务频次：</label>
            <div class="col-md-3 col-xs-9" id="jhzd_fwpcmc" style="display: block;bottom: 3px;padding-left: 6px;">
                <select class="form-control input-sm" id="jhzdfwpc" name="jhzdfwpc"
                        onchange="deptChanged()">
                </select>
            </div>
            <label class="control-label col-md-2 col-xs-4" id="lsjh_fwsj" style="display: none">服务时间：</label>
            <p id="lsjh_fwsjvalue" class="col-md-2 col-xs-9 nopadding control-label" style="display: none"></p>

        </div>

        <div class="col-md-12 col-xs-12" id="cqjh_fwsj" style="padding-left: 15px;display: block;padding-right: 0px;">
            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label">服务时间：</label>
            </div>

            <div class="col-md-10 col-xs-12 nopadding">
                <label class="checkbox-inline fjxq" style="padding-left: 0px;">
                    <input type="checkbox" class="rdZt" name="week" value="1">星期一
                </label>
                <label class="checkbox-inline fjxq" style="padding-left: 0px;">
                    <input type="checkbox" class="rdZt" name="week" value="2">星期二
                </label>
                <label class="checkbox-inline fjxq" style="padding-left: 0px;">
                    <input type="checkbox" class="rdZt" name="week" value="3">星期三
                </label>
                <label class="checkbox-inline fjxq" style="padding-left: 0px;">
                    <input type="checkbox" class="rdZt" name="week" value="4">星期四
                </label>
                <label class="checkbox-inline fjxq" style="padding-left: 0px;">
                    <input type="checkbox" class="rdZt" name="week" value="5">星期五
                </label>
                <label class="checkbox-inline fjxq" style="padding-left: 0px;">
                    <input type="checkbox" class="rdZt" name="week" value="6">星期六
                </label>
                <label class="checkbox-inline fjxq" style="padding-left: 0px;">
                    <input type="checkbox" class="rdZt" name="week" value="7">星期日
                </label>
                <label class="checkbox-inline fjxq" style="padding-left: 60px;">
                    <input type="checkbox" class="rdZt" name="weekAll" value="8">全选
                </label>
            </div>
        </div>
        <div class="col-md-12 col-xs-12" id="filesDiv">
            <div class="form-group nopadding">
                <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                    <label class="control-label">附件：</label>
                </div>
                <div id="fileDiv" class="col-md-10 col-sm-10" style="padding-left: 0px;padding-right: 0px;right: 6px;">&nbsp;
                    <div id="fjdzDiv" class="fileinput fileinput-new" data-provides="fileinput"><span
                            class="btn btn-default btn-sm btn-file">	<span
                            class="fileinput-new"> 选取文件 </span>	<span
                            class="fileinput-exists"></span>	<input type="file"
                                                                       name="fileInput"> </span>&nbsp;<span
                            id="fbt01" class="fileinput-filename"></span> &nbsp;<a href="javascript:;"
                                                                                   class="close fileinput-exists"
                                                                                   data-dismiss="fileinput"> <img
                            style="padding-top: 0px" src="./layouts/img/control/img_close.png"></a></div>
                </div>
            </div>

        </div>

    </div>
</div>

<!-- 个人基本信息结束 -->
<div id="fwbxz" class="panel panel-default">
    <div class="panel-heading" style="display: none">
        <a data-toggle="collapse" data-parent="#accordion" href="#fwbxzccontent">
            <h3 style="margin-top: 0px;margin-bottom: 0px;font-weight:bold;font-size:20px;color:#000000;">
                <span class="glyphicon glyphicon-th"></span>新计划制定</h3>
        </a>
    </div>
    <div id="fwbxzccontent" class="panel-collapse collapse in">
        <div class="panel-body nopadding" style="margin-bottom: 6px;margin-right: 0px;">
            <div id="toolbtn" class="pull-left">
                <button id="btn_bgjl_addfw" class="btn btn-default btn-sm" value="disabled" type='button'
                        style='margin-top: 3px;'>
                    新增服务包
                </button>
                <button id="btn_bgjl_addxm" class="btn btn-default btn-sm" value="disabled" type='button'
                        style='margin-top: 3px;'>新增项目
                </button>
                <button id="btn_jhzd_addhc" class="btn btn-default btn-sm" type='button' value="disabled"
                        style='margin-top: 3px;'>新增耗材
                </button>
                <button id="btn_bgjl_reset" class="btn btn-default btn-sm" value="disabled" type='button'
                        style='margin-top: 3px;'>清空
                </button>
            </div>

            <div class="control-label">
                <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                    <label class="control-label" style="margin-top: 8px;">项目：</label>
                </div>
                <p id="money_xmhj" class="control-label col-md-1 col-xs-9 "
                   style="margin-top: 8px;text-align: left;color: #434343;padding-left: 5px;"></p>

                <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                    <label class="control-label" style="margin-top: 8px;">耗材：</label>
                </div>
                <p id="money_hchj" class="control-label col-md-1 col-xs-9 "
                   style="margin-top: 8px;text-align: left;color: #434343;padding-left: 5px;"></p>

                <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                    <label class="control-label" style="margin-top: 8px;">合计：</label>
                </div>
                <p id="money_sum" class="control-label col-md-1 col-xs-9 "
                   style="margin-top: 8px;text-align: left;color: #434343;padding-left: 5px;"></p>
            </div>

            <div id="toolbtns" class="pull-right">
                <button id="btn_bgjl_save" class="btn btn-default btn-sm" value="disabled" type='button'
                        style='margin-top: 3px;'>保存
                </button>
                <button id="btn_bgjl_exit" class="btn btn-default btn-sm" type='button' style='margin-top: 3px;'>退出
                </button>
            </div>
        </div>

        <%--<table id="table_jhbgjl" class="table-container"></table>--%>

        <div class="row" id="id_tables_container">
            <div class="col-md-6">
                <table id="table_jhbgjl" class="table-container"></table>
            </div>
            <div class="col-md-6">
                <table id="table_fwjhzd1" class="table-container"></table>
            </div>
        </div>
    </div>
</div>
</div>
<script src="frame/plugins/bootstrap-fileinput/bootstrap-fileinput-mulitple.js" type="text/javascript"></script>
<script src="frame/plugins/bootstrap-tagsinput/bootstrap-tagsinput.js" type="text/javascript"></script>
<script src="frame/plugins/select2/v3/select2.js" type="text/javascript"></script>
<script src="frame/plugins/select2/v3/select2_locale_zh-CN.js" type="text/javascript"></script>
<script src="frame/plugins/jquery-validation/js/jquery.validate.js"
        type="text/javascript"></script>
</body>
</html>
