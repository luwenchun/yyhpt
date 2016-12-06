<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>

<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <link href="layouts/css/white/detail_page.css" rel="stylesheet">
    <link href="frame/css/extra.css" rel="stylesheet">
    <link href="frame/css/components.min.css" rel="stylesheet" type="text/css"/>
    <script>
        var rybm = '<%=session.getAttribute("rybm")%>';
    </script>
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

        .hrmax {
            height: 1px;
            width: 100%;
            /*background:#00CCFF;*/
            overflow: hidden;
            align: center;
        }
    </style>
</head>
<body>
<div id="defaultForm" class="form-horizontal" style="font-size: 13px;">
    <!-- 个人基本信息开始-->
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion" href="#grxxcontent" id="collapse2">
                <h3 class="head-title">
                    <span class="glyphicon glyphicon-th"></span> 个人信息
                </h3>
            </a>
        </div>

        <div id="grjbxxcontent" class="panel-collapse collapse in nopadding">
            <div
                    class="form-horizontal form-bordered form-row-stripped nopadding">
                <div class="form-group list-space-row">
                    <div class="col-md-2 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label">姓名：</label>
                    </div>
                    <p id="hzxm" class="control-label col-md-2 col-xs-8 nopadding"
                       style="text-align: left;color: #434343;"></p>

                    <div class="col-md-2 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label">性别：</label>
                    </div>
                    <p id="xb" class="control-label col-md-2 col-xs-9 nopadding"
                       style="text-align: left;color: #434343;"></p>

                    <div class="col-md-2 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label nopadding">年龄：</label>
                    </div>
                    <p id="csrq" class="control-label col-md-2 col-xs-9 nopadding"
                       style="text-align: left;color: #434343;"></p>
                </div>
                <%--<hr class="hrmin"/>--%>
                <div class="form-group list-space-row">
                    <div class="col-md-2 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label">联系地址：</label>
                    </div>
                    <p id="jzdz" class="nopadding col-md-2 col-xs-9 control-label"
                       style="text-align: left;color: #434343;"></p>
                    <div class="col-md-2 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label nopadding">医保类别：</label>
                    </div>
                    <p id="yblb" class="col-md-2 col-xs-9 nopadding control-label"
                       style="text-align: left;color: #434343;"></p>
                    <div class="col-md-2 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label nopadding">联系电话：</label>
                    </div>
                    <p id="lxdh" class="col-md-2 col-xs-9 nopadding control-label"
                       style="text-align: left;color: #434343;"></p>
                    <div class="col-md-2 col-xs-9">
                        <button id="btn_EHR" class="btn btn-default btn-sm hidden"
                                style='margin-right: 20px; margin-top: 3px;'>调阅EHR明细
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 个人基本信息结束 -->

    <div class="panel panel-default" id="isTyHlq">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion" href="#hlqxgqycontent" id="collapse_click">
                <h3 class="head-title">
                    <span class="glyphicon glyphicon-th"></span> 启用状态修改
                </h3>
            </a>
        </div>
        <div id="hlqxgqycontent" class="panel-collapse collapse in nopadding">
            <div class="form-horizontal form-bordered form-row-stripped nopadding">
                <%--<hr class="hrmin"/>--%>
                <div class="form-group list-space-row" style="padding-left: 15px;margin-top: 10px;margin-bottom: 10px;">
                    <div class="col-md-12 col-xs-12 nopadding" style="left: 4px;">
                        <input type="checkbox" class="rdZt" name="hlqty" id="hlqty" value="1">
                        <label class="control-label" style="font-size: large;color: #434343;">是否确认停用</label>
                    </div>
                </div>

                <div class="form-group list-space-row" style="padding-left: 15px;margin-top: 10px;margin-bottom: 10px;">

                    <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label">停用日期：</label>
                    </div>
                    <div class="input-group col-md-2 col-xs-8"
                         data-date-format="yyyy-mm-dd" style="padding-left: 15px;">
                        <input type="text" class="form-control input-sm form-control choose-date"
                               name="tyrq" id="tyrq" title="停用日期">
                    </div>
                </div>

                <div class="form-group list-space-row" style="padding-left: 15px;margin-top: 10px;margin-bottom: 10px;">

                    <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label">停用原因：</label>
                    </div>
                    <div class="col-md-4  col-xs-8">
                        <input class="form-control input-sm" id="shbtgyy" name="shbtgyy">
                    </div>
                </div>

                <div class="form-group list-space-row" style="padding-left: 15px;margin-top: 10px;margin-bottom: 10px;">

                    <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label nopadding">操作人员：</label>
                    </div>
                    <div class="col-md-3 col-xs-8">
                        <select id="czry" name="czry" class="form-control input-sm"></select>
                    </div>

                    <div class="col-md-2 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label nopadding">操作日期：</label>
                    </div>
                    <div class="input-group col-md-2 col-xs-8"
                         data-date-format="yyyy-mm-dd" style="padding-left: 15px;">
                        <input type="text" class="form-control input-sm form-control choose-date"
                               name="czrq" id="czrq" title="操作日期">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="panel panel-default" id="isQyHlq">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion" href="#hlqxgtycontent" id="collapse_click1">
                <h3 class="head-title">
                    <span class="glyphicon glyphicon-th"></span> 停用状态修改
                </h3>
            </a>
        </div>
        <div id="hlqxgtycontent" class="panel-collapse collapse in nopadding">
            <div class="form-horizontal form-bordered form-row-stripped nopadding">
                <%--<hr class="hrmin"/>--%>
                <div class="form-group list-space-row" style="padding-left: 15px;margin-top: 10px;margin-bottom: 10px;">
                    <div class="col-md-12 col-xs-12 nopadding" style="left: 4px;">
                        <input type="checkbox" class="rdZt" name="hlqqy" id="hlqqy" value="0">
                        <label class="control-label" style="font-size: large;color: #434343;">是否确认启用</label>
                    </div>
                </div>

                <div class="form-group list-space-row" style="padding-left: 15px;margin-top: 10px;margin-bottom: 10px;">

                    <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label">启用日期：</label>
                    </div>
                    <div class="input-group col-md-2 col-xs-8"
                         data-date-format="yyyy-mm-dd" style="padding-left: 15px;">
                        <input type="text" class="form-control input-sm form-control choose-date"
                               name="qyrq" id="qyrq" title="启用日期">
                    </div>
                </div>

                <div class="form-group list-space-row" style="padding-left: 15px;margin-top: 10px;margin-bottom: 10px;">

                    <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label">启用原因：</label>
                    </div>
                    <div class="col-md-4 col-xs-8">
                        <input class="form-control input-sm" id="shbtgyy_qy" name="shbtgyy_qy">
                    </div>
                </div>

                <div class="form-group list-space-row" style="padding-left: 15px;margin-top: 10px;margin-bottom: 10px;">

                    <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label nopadding">操作人员：</label>
                    </div>
                    <div class="col-md-3 col-xs-8">
                        <select id="czrgh" name="czrgh" class="form-control input-sm"></select>
                    </div>

                    <div class="col-md-2 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label nopadding">操作日期：</label>
                    </div>
                    <div class="input-group col-md-2 col-xs-8"
                         data-date-format="yyyy-mm-dd" style="padding-left: 15px;">
                        <input type="text" class="form-control input-sm form-control choose-date"
                               name="czrq_qy" id="czrq_qy" title="操作日期">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="yyhpt/pages/hlqgl/hlqxgDetail.js" type="text/javascript"></script>
</body>
</html>
