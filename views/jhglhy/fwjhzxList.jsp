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
    <script src="yyhpt/pages/jhglhy/fwjhzxList.js" type="text/javascript"></script>
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
        <div class="form-group list-space-row" id="cqjh_type" style="padding-left: 15px;display: block;">

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

        <div class="form-group list-space-row" id="lsjh_type" style="padding-left: 15px;display: none;">

            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label">评估结论：</label>
            </div>
            <p id="pgjlnrgr_lsjh" class="nopadding col-md-1 col-xs-9 control-label"
               style="text-align: left;color: #434343;"></p>

            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label nopadding">服务时间：</label>
            </div>
            <p id="jhzdzxsj_lsjh" class="col-md-2 col-xs-9 nopadding control-label"
               style="text-align: left;color: #434343;"></p>

            <div class="col-md-1 col-xs-3" style="padding-left: 0px;padding-right: 0px;">
                <label class="control-label">服务地址：</label>
            </div>
            <p id="fwdz" class="col-md-5 col-xs-8 nopadding control-label"
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
                <div class="form-group col-md-6 ">
                    <label class="col-md-6 col-xs-4 control-label" style=" padding-left: 5px;">服务开始日期:</label>
                    <div class="col-md-6  col-xs-8" style="padding-right: 0px;padding-left: 5px;">
                        <input type="text" class="datetimepickers input-sm form-control choose-date" id="zxrq" name="zxrq">
                    </div>
                </div>
                <%--<div class="form-group col-md-7  col-xs-12"
                     style=" padding-right: 0px;padding-left: 5px; margin-left: 0px; margin-right: 0px;">
                    <label class="control-label col-md-2 col-xs-2"
                           style="padding-top: 7px;padding-right: 0px;padding-left: 0px;">状态:</label>
                    <div id="fwzt" class="col-md-10 col-xs-12"
                         style="padding-left: 20px;padding-right: 0px;margin-right: 0px;">
                        <label class="checkbox-inline" style="padding-top: 5px;padding-left: 0px;">
                            <input type="radio" class="rdZt" name="zt" id="ckQb" value="" checked="">全部
                        </label> <label class="checkbox-inline"
                                        style="padding-left: 0px;padding-top: 5px;margin-left: 2px;">
                        <input type="radio" class="rdZt" name="zt" id="ckWzx" value="0"
                               style="padding-top: 5px;margin-left: 0px;">未执行
                    </label> <label class="checkbox-inline" style="padding-top:5px;padding-left: 0px;margin-left: 2px;">
                        <input type="radio" class="rdZt" name="zt" id="ckYzx" value="1">已执行
                    </label>
                      &lt;%&ndash;  <label class="checkbox-inline" style="padding-left: 0px;padding-top: 5px;margin-left: 2px;">
                            <input type="radio" class="rdZt" name="zt" id="ckYtz" value="3">已停止
                        </label>&ndash;%&gt;
                    </div>
                </div>--%>
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
    <table id="table_fwjhzx" class="table-container nopadding">
    </table>
</div>

</body>

</html>