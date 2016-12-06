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
    <script>
        var rybm = '<%=session.getAttribute("rybm")%>';
    </script>
    <style type="text/css">
        .choose-date {
            background: white url("layouts/img/control/img_rl.png") no-repeat scroll right center;
            cursor: pointer;
        }

        .form-horizontal .form-group {
            margin-right: -15px;
            margin-left: 0px;
        }

        .row {
            margin-right: 15px;
            margin-left: -15px;
        }

        .list-space-row {
            margin: 0 0 7px 0;
        }

        /*小屏幕时lable的样式*/
        .control-label-new {
            padding-top: 6px;
            text-align: right;
            /*padding-left: 0px;*/
        }

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

    </style>
</head>
<body>
<div id="defaultForm" class="form-horizontal" style="font-size: 13px;">
    <!-- 个人基本信息开始-->
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#grjbxxcontent">
                <h3
                        style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
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
                    <p id="nl" class="control-label col-md-2 col-xs-9 nopadding"
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

    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion" href="#hlqsqcontent" id="collapse_click">
                <h3 class="head-title">
                    <span class="glyphicon glyphicon-th"></span> 护理券申请
                </h3>
            </a>
        </div>
        <div id="hlqsqcontent" class="panel-collapse collapse in nopadding">
            <div class="form-horizontal form-bordered form-row-stripped nopadding">
                <div class="form-group list-space-row" style="padding-left: 15px;margin-top: 10px;margin-bottom: 10px;">
                    <div class="col-md-12 col-xs-12 nopadding">
                        <input type="checkbox" class="rdZt" name="hlq" id="hlq" value="1">
                        <label class="control-label" style="font-size: large;color: #434343;">申请护理券补贴(50元/时/次)</label>
                    </div>
                </div>

                <div class="form-group list-space-row" style="padding-left: 15px;margin-top: 10px;margin-bottom: 10px;">

                    <div class="col-md-4 col-xs-12 nopadding" style="text-align:right;">
                        <label class="control-label nopadding col-md-6 col-xs-6">护理券有效开始时间：</label>
                        <div class="input-group col-md-6 col-xs-5"
                             data-date-format="yyyy-mm-dd" style="padding-left: 15px;">
                            <input type="text" class="form-control input-sm form-control choose-date"
                                   name="kssj" id="kssj" onblur="forComputeMoney(this)" title="护理券有效开始时间">
                        </div>
                    </div>

                    <div class="col-md-4 col-xs-12 nopadding" style="text-align:right;">
                        <label class="control-label nopadding col-md-6 col-xs-6">护理券有效结束时间：</label>
                        <div class="input-group col-md-6 col-xs-5"
                             data-date-format="yyyy-mm-dd" style="padding-left: 15px;">
                            <input type="text" class="form-control input-sm form-control choose-date"
                                   name="jssj" id="jssj" onblur="forComputeMoney(this)" title="护理券有效结束时间">
                        </div>
                    </div>
                </div>

                <div class="form-group list-space-row" style="padding-left: 15px;margin-top: 10px;margin-bottom: 10px;">

                    <div class="col-md-4 col-xs-12 nopadding" style="text-align:right;">
                        <label class="control-label nopadding col-md-3 col-xs-6">照护等级：</label>
                        <p id="zhdj" class="control-label col-md-7 col-xs-5 nopadding"
                           style="text-align: left;color: #434343;padding-left: 15px;"></p>
                    </div>

                    <div class="col-md-4 col-xs-12 nopadding" style="text-align:right;display: none;">
                        <label class="control-label nopadding col-md-6 col-xs-6">账户余额：</label>
                        <p id="zhye" class="col-md-6 col-xs-5 nopadding control-label"
                           style="text-align: left;color: #434343;padding-left: 15px;"></p>
                    </div>

                    <div class="col-md-4 col-xs-12 nopadding" style="text-align:right;">
                        <label class="control-label nopadding col-md-6 col-xs-6">账户预存金额：</label>
                        <p id="zhycje" class="col-md-6 col-xs-5 nopadding control-label"
                           style="text-align: left;color: #434343;padding-left: 15px;"></p>
                    </div>
                </div>

                <div class="form-group list-space-row" style="padding-left: 15px;margin-top: 10px;margin-bottom: 10px;">

                    <div class="col-md-4 col-xs-12 nopadding" style="text-align:right;">
                        <label class="control-label nopadding col-md-3 col-xs-6">操作人员：</label>
                        <p id="sqry" class="control-label col-md-7 col-xs-5 nopadding"
                           style="text-align: left;color: #434343;padding-left: 15px;">${ryxm}</p>
                    </div>

                    <div class="col-md-4 col-xs-12 nopadding" style="text-align:right;">
                        <label class="control-label nopadding col-md-6 col-xs-6">申请日期：</label>
                        <div class="input-group col-md-6 col-xs-5"
                             data-date-format="yyyy-mm-dd" style="padding-left: 15px;">
                            <input type="text" class="form-control input-sm form-control choose-date"
                                   name="sqrq" id="sqrq"  title="申请日期">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
<script src="frame/plugins/bootstrap-fileinput/bootstrap-fileinput-mulitple.js" type="text/javascript"></script>
<script src="frame/plugins/bootstrap_extra.js" type="text/javascript"></script>
<script src="yyhpt/pages/hlqgl/hlqsqDetail.js" type="text/javascript"></script>

</body>
</html>
