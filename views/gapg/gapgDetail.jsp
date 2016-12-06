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
    <link href="layouts/css/white/detail_page.css" rel="stylesheet">
    <link href="frame/css/extra.css" rel="stylesheet">
    <link href="frame/css/components.min.css" rel="stylesheet" type="text/css"/>

    <link rel="stylesheet" href="frame/plugins/city-picker/css/city-picker.css">

    <style type="text/css">
        .head-title {
            margin-top: 0px;
            margin-bottom: 0px;
            font-weight: bold;
            font-size: 20px;
            color: #000000;
        }

        .panel-heading-height {
            height: 35px;
        }

        .head-title {
            margin-top: 0px;
            margin-bottom: 0px;
            font-weight: bold;
            font-size: 16px;
            color: #000000;
        }

        /*重写样式*/
        .form-control-static {
            padding-top: 6px;
            padding-bottom: 6px;
        }

        .no-padding-right {
            padding-right: 0px;
            padding-left: 0px;
        }

        .fjxq{
            padding-left: 0px;right: 55px;
        }

        .first-lable {
            padding-top: 6px;
        }

        .content-title {
            padding-top: 6px;
            margin-top: 0px;
            margin-bottom: 0px;
            font-weight: bold;
            font-size: 15px;
            color: #000000;
        }

    </style>
</head>
<body>
    <!-- 个人基本信息开始-->
    <div class="panel panel-default">
        <div class="panel-heading panel-heading-height">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#grxxcontent">
                <h3 class="head-title">
                    <span class="glyphicon glyphicon-th"></span> 个人信息
                </h3>
            </a>
        </div>
        <div id="grxxcontent" class="panel-collapse collapse in nopadding">
            <div class="form-horizontal form-bordered form-row-stripped nopadding">
                <div class="form-group nopadding">
                    <div class="col-md-4 col-xs-12">
                        <label class="col-md-3 col-xs-4 control-label control-label-new
                                        no-padding-right">姓名：</label>
                        <div class="col-md-3 no-padding-right">
                            <p id="grxx_xm" class="form-control-static"></p>
                        </div>

                        <label class="col-md-3 col-xs-4 control-label control-label-new
                                    no-padding-right">性别：</label>
                        <div class="col-md-3 no-padding-right">
                            <p id="grxx_xb" class="form-control-static"></p>
                        </div>
                    </div>

                    <div class="col-md-6 col-xs-12">
                        <label class="col-md-3 col-xs-4 control-label control-label-new
                                    no-padding-right">出生日期：</label>
                        <div class="col-md-3 no-padding-right">
                            <p id="grxx_csrq" class="form-control-static"></p>
                        </div>

                        <label class="col-md-3 col-xs-4 control-label control-label-new
                                    no-padding-right">入院日期：</label>
                        <div class="col-md-3 no-padding-right">
                            <p id="grxx_ryrq" class="form-control-static"></p>
                        </div>
                        <%--<label class="col-md-2 col-xs-4 control-label control-label-new
                                    no-padding-right">出院日期：</label>
                        <div class="col-md-2 no-padding-right">
                            <p id="grxx_cyrq" class="form-control-static"></p>
                        </div>--%>
                    </div>

                    <div class="col-md-2 col-xs-12" style="padding-top: 2px;text-align:center;">
                        <button id="btn_Cyxj" class="btn btn-default btn-sm">
                            调阅出院小结
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 个人基本信息结束 -->

    <form id="defaultForm_test1" method="post" class="form-horizontal" style="font-size: 13px;">
        <div class="panel panel-default" style="display: none;">
            <div class="panel-heading panel-heading-height">
                <a data-toggle="collapse" data-parent="#accordion"
                   href="#sapgContent">
                    <h3 class="head-title">
                        <span class="glyphicon glyphicon-th"></span> 收案评估内容
                    </h3>
                </a>
            </div>
            <div id="sapgContent" class="panel-collapse collapse in nopadding">
                <%--<div class="panel-collapse collapse in nopadding" id="ZHWTContent">
                    <div class="form-group">
                        <div class="col-md-12">
                            <div class="col-sm-12 col-md-12">
                                <label class="content-title">
                                    照护问题
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-12">
                            <div class="col-sm-12 col-md-12">
                                <label class="first-lable ">
                                    1.视觉明显影响日常生活
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-12">
                            <div class="col-sm-12 col-md-12">
                                <label class="first-lable ">
                                    2.出院后可能留有呼吸照护问题
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-12">
                            <div class="col-sm-12 col-md-12">
                                <label class="first-lable ">
                                    3.出院后可能留有营养照护问题（灌食设备及使用）
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="hrmin"/>--%>
            </div>
        </div>
    </form>

    <form id="defaultForm_test2" method="post" class="form-horizontal" style="font-size: 13px;">
        <div class="panel-content" id="table-theme-test2">
            <div class="panel panel-default">
                <div class="panel-heading" style="height: 40px">
                    <a data-toggle="collapse" data-parent="#accordion" href="#gaxqContent">
                        <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                            <span class="glyphicon glyphicon-th"></span>个案需求
                        </h3>
                    </a>
                </div>
                <div id="gaxqContent" class="panel-collapse collapse in nopadding" style="margin: 10px 0 10px 0;">
                    <div class="com-md-12">
                        <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                            <label class="control-label nopadding">护理需求：</label>
                        </div>
                        <label class="checkbox-inline" style="padding-top: 5px;padding-left: 15px;">
                            <input type="radio" class="rdZt" name="jgzh" id="jjzh" value="居家护理">居家护理
                        </label>
                        <label class="checkbox-inline" style="padding-top: 5px;padding-left: 15px;">
                            <input type="radio" class="rdZt" name="jgzh" id="zry" value="再入院">再入院
                        </label>
                        <label class="checkbox-inline" style="padding-top: 5px;padding-left: 15px;">
                            <input type="radio" class="rdZt" name="jgzh" id="jgzh" value="机构照护">机构照护
                        </label>
                        <label class="checkbox-inline" style="padding-top: 5px;padding-left: 15px;">
                            <input type="radio" class="rdZt" name="jgzh" id="sqzh" value="社区照护">社区照护
                        </label>
                        <label class="checkbox-inline" style="padding-top: 5px;padding-left: 15px;">
                            <input type="radio" class="rdZt" name="jgzh" id="qt" value="其他">其他
                        </label>
                    </div>
                    <div class="col-md-1 col-xs-3 nopadding" style="text-align:left;right: 70px;">
                        <label class="control-label nopadding">医疗用具：</label>
                    </div>
                    <label class="checkbox-inline fjxq">
                        <input type="checkbox" class="rdZt" name="zt" id="1" value="轮椅">轮椅
                    </label>
                    <label class="checkbox-inline fjxq">
                        <input type="checkbox" class="rdZt" name="zt" id="2" value="病床">病床
                    </label>
                    <label class="checkbox-inline fjxq" style="padding-left: 0px;">
                        <input type="checkbox" class="rdZt" name="zt" id="3" value="气垫床">气垫床
                    </label>
                    <label class="checkbox-inline fjxq">
                        <input type="checkbox" class="rdZt" name="zt" id="4" value="吸痰器">吸痰器
                    </label>
                    <label class="checkbox-inline fjxq">
                        <input type="checkbox" class="rdZt" name="zt" id="5" value="雾化机">雾化机
                    </label>
                    <label class="checkbox-inline fjxq">
                        <input type="checkbox" class="rdZt" name="zt" id="6" value="氧气机">氧气机
                    </label>
                    <label class="checkbox-inline fjxq">
                        <input type="checkbox" class="rdZt" name="zt" id="7" value="呼吸机">呼吸机
                    </label>
                    <label class="checkbox-inline fjxq">
                        <input type="checkbox" class="rdZt" name="zt" id="8" value="血压计">血压计
                    </label>
                    <label class="checkbox-inline fjxq">
                        <input type="checkbox" class="rdZt" name="zt" id="9" value="血糖仪">血糖仪
                    </label>
                    <label class="checkbox-inline fjxq">
                        <input type="checkbox" class="rdZt" name="zt" id="10" value="拐杖">拐杖
                    </label>
                    <label class="checkbox-inline fjxq">
                        <input type="checkbox" class="rdZt" name="zt" id="11" value="助行器">助行器
                    </label>
                    <label class="checkbox-inline fjxq" style="right: 68px;padding-left: 4px;">
                        <input type="checkbox" class="rdZt" name="zt" id="12" value="其他">其他
                    </label>
                    <input class="input-sm col-md-9 pull-right" maxlength="100" id="fjxq" type="text" name="fjxq"
                           style="right: 75px;">
                </div>
            </div>
        </div>
    </form>

    <div class="panel panel-default">
        <div class="panel-body nopadding" style="padding-top: 10px;">
            <div class="form-group list-space-row" style="padding-left: 15px;">
                <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                    <label class="control-label">评估人员：</label>
                </div>

                <p id="pgryxm" class="control-label col-md-2 col-xs-8 nopadding"
                   style="text-align: left;color: #434343;">${ryxm}</p>
                <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                    <label class="control-label nopadding">评估日期：</label>
                </div>
                <p id="pgrq" class="control-label col-md-3 col-xs-9 nopadding"
                   style="text-align: left;color: #434343;"></p>
            </div>
            <input type="text" class="form-control   input-sm hidden"
                   id="GAPGLSH" name="GAPGLSH" placeholder="用于绑定个案评估流水号" />
        </div>
    </div>
    <script src="frame/plugins/city-picker/city-picker.data.js"></script>
    <script src="frame/plugins/city-picker/city-picker.js"></script>

    <%--<script src="yyhpt/pages/jhbgglhy/saglsapgDetail.js" type="text/javascript"></script>--%>
    <script src="yyhpt/pages/gapg/gapgDetail.js" type="text/javascript"></script>
</body>
</html>

