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
                    <span class="glyphicon glyphicon-th"></span> 护理券审核
                </h3>
            </a>
        </div>
        <div id="hlqsqcontent" class="panel-collapse collapse in nopadding">
            <div class="form-horizontal form-bordered form-row-stripped nopadding">
                <%--<hr class="hrmin"/>--%>
                <div class="form-group list-space-row" style="padding-left: 15px;margin-top: 10px;margin-bottom: 10px;">
                    <div class="col-md-12 col-xs-12 nopadding" style="left: 4px;">
                        <label class="control-label" style="font-size: large;color: #434343;">申请护理券补贴(50元/时/次)</label>
                    </div>
                </div>

                <div class="form-group list-space-row" style="padding-left: 15px;margin-top: 10px;margin-bottom: 10px;">

                    <div class="col-md-4 col-xs-12 nopadding" style="text-align:right;">
                        <label class="control-label nopadding col-md-6 col-xs-6">护理券有效开始时间：</label>
                        <p id="kssj" class="control-label col-md-6 col-xs-5 nopadding"
                           style="text-align: left;color: #434343;"></p>
                    </div>

                    <div class="col-md-4 col-xs-12 nopadding" style="text-align:right;">
                        <label class="control-label nopadding col-md-6 col-xs-6">护理券有效结束时间：</label>
                        <p id="jssj" class="col-md-6 col-xs-5 nopadding control-label"
                           style="text-align: left;color: #434343;"></p>
                    </div>
                </div>

                <div class="form-group list-space-row" style="padding-left: 15px;margin-top: 10px;margin-bottom: 10px;">

                    <div class="col-md-4 col-xs-12 nopadding" style="text-align:right;">
                        <label class="control-label nopadding col-md-3 col-xs-6">照护等级：</label>
                        <p id="zhdj" class="control-label col-md-7 col-xs-5 nopadding"
                           style="text-align: left;color: #434343;"></p>
                    </div>

                    <div class="col-md-4 col-xs-12 nopadding" style="text-align:right;">
                        <label class="control-label nopadding col-md-6 col-xs-6">账户预存金额：</label>
                        <p id="zhycje" class="col-md-6 col-xs-5 nopadding control-label"
                           style="text-align: left;color: #434343;"></p>
                    </div>

                    <div class="col-md-4 col-xs-12 nopadding" id="zhye_agree" style="text-align:right;display: none;">
                        <label class="control-label nopadding col-md-6 col-xs-6">账户余额：</label>
                        <p id="zhye" class="col-md-6 col-xs-5 nopadding control-label"
                           style="text-align: left;color: #434343;"></p>
                    </div>


                </div>

                <div class="form-group list-space-row" style="padding-left: 15px;margin-top: 10px;margin-bottom: 10px;">

                    <div class="col-md-4 col-xs-12 nopadding" style="text-align:right;">
                        <label class="control-label nopadding col-md-3 col-xs-6">操作人员：</label>
                        <p id="sqry" class="control-label col-md-7 col-xs-5 nopadding"
                           style="text-align: left;color: #434343;">${ryxm}</p>
                    </div>

                    <div class="col-md-4 col-xs-12 nopadding" style="text-align:right;">
                        <label class="control-label nopadding col-md-6 col-xs-6">申请日期：</label>
                        <p id="sqrq" class="col-md-6 col-xs-5 nopadding control-label"
                           style="text-align: left;color: #434343;"></p>
                    </div>
                </div>

                <div class="form-group list-space-row" style="padding-left: 15px;margin-top: 10px;margin-bottom: 10px;">

                    <div class="col-md-1 col-xs-6 nopadding" style="text-align:right;">
                        <label class="control-label">审核结果：</label>
                    </div>
                    <div class="col-md-3" id="shjgdiv" style="color: #737373;margin-top: 5px;">
                    </div>
                    <div class="col-md-4">
                        <input class="form-control input-sm" id="shbtgyy" name="shbtgyy"
                               style="border: 0px; border-bottom: 1px solid silver;display: none;">
                    </div>
                </div>

                <div class="form-group list-space-row" style="padding-left: 15px;margin-top: 10px;margin-bottom: 10px;">

                    <div class="col-md-1 col-xs-6 nopadding" style="text-align:right;">
                        <label class="control-label">审核人员：</label>
                    </div>
                    <div class="col-md-3 col-xs-5">
                        <select id="shrgh" name="shrgh" class="form-control input-sm"></select>
                    </div>

                    <div class="col-md-2 col-xs-6 nopadding" style="text-align:right;">
                        <label class="control-label nopadding">审核日期：</label>
                    </div>
                    <div class="input-group col-md-2 col-xs-5"
                         data-date-format="yyyy-mm-dd" style="padding-left: 15px;">
                        <input type="text" class="form-control input-sm form-control choose-date"
                               name="shrq" id="shrq" title="申请日期">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="yyhpt/pages/hlqgl/hlqshDetail.js" type="text/javascript"></script>
</body>
</html>
