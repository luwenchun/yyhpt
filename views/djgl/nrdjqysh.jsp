<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<html>
<head>
    <title>Insert title here</title>
    <style type="text/css">
        .choose-date {
            background: url("layouts/img/control/img_rl.png") no-repeat scroll right center transparent;
            cursor: pointer;
        }

        .base-info-personal {
            text-align: left;
            color: #000000;
        }

        .list-space-row {
            margin: 0 0 7px 0;
        }

        .form-horizontal .form-group {
            margin-right: -15px;
            margin-left: 0px;
        }

        .list-row-space {
            margin: 3px 0 3px 0;
        }

        @media ( max-device-width: 480px) {
            .list-row-space {
                margin: 3px 0 0 0;
            }

            .label-space {
                margin: 8px 0 0 0;
            }
        }

        .control-label {
            text-align: right;
        }

        .input-text-body {
            border: 1px solid #ccc;
            outline: 0 !important;
            -webkit-appearance: none;
            color: #555;
            background-color: #fff;
            border-color: #d2d6de;
            box-shadow: none !important;
            transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        }

        .input-text-body:focus {
            border-color: #3c8dbc;
        }
    </style>

    <link href="layouts/css/white/detail_page.css" rel="stylesheet">
</head>
<body>

<!-- 个人基本信息开始-->
<jsp:include page="/yyhpt/views/common/grjbxxDetail.jsp"></jsp:include>
<!-- 个人基本信息结束 -->
<!-- 登记信息 -->
<form id="defaultForm" method="post" class="form-horizontal">
    <div class="panel-content">
        <div class="panel panel-default" id="nrdjPage">
            <div class="panel-heading" style="height: 40px">
                <a data-toggle="collapse" data-parent="#accordion"
                   href="#djxxcontent">
                    <h3
                            style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                        <span class="glyphicon glyphicon-th"></span> 签约信息
                    </h3>
                </a>
            </div>
            <div id="djxxcontent" class="panel-collapse collapse in nopadding"
                 style="margin: 10px 0 10px 0;">
                <div class="form-bordered form-row-stripped nopadding row">
                    <div class="col-md-12">
                        <div class="col-md-4 col-xs-12 nopadding">
                            <label class="col-md-5 col-xs-5 control-label nopadding list-row-space">医养管理等级：</label>
                            <p id="gldjdmdiv" class="control-label col-md-7 col-xs-7 nopadding list-row-space"
                               style="text-align: left;color: #434343;"></p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4 col-xs-12 nopadding">
                            <label class="col-md-5 col-xs-5 control-label nopadding list-row-space">护理服务机构：</label>
                            <p id="fwjgdm" class="control-label col-md-7 col-xs-7 nopadding list-row-space"
                               style="text-align: left;color: #434343;"></p>
                        </div>
                        <div class="col-md-4 col-xs-12 nopadding ">
                            <label class="col-md-5 col-xs-5 control-label list-row-space label-space">护理人员：</label>
                            <p id="hlygh" class="control-label col-md-7 col-xs-7 nopadding list-row-space"
                               style="text-align: left;color: #434343;"></p>
                        </div>
                    </div>
                    <div class=" col-md-12">
                        <div class="col-md-4 col-xs-12 nopadding">
                            <label class="col-md-5 col-xs-5 control-label list-row-space">纳入年度：</label>
                            <p id="nrnd" class="control-label col-md-7 col-xs-7 nopadding list-row-space"
                               style="text-align: left;color: #434343;"></p>
                        </div>
                        <div class="col-md-4 col-xs-12 nopadding">
                            <label class="col-md-5 col-xs-5 control-label list-row-space">服务起始日期：</label>
                            <p id="ksrq" class="control-label col-md-7 col-xs-7 nopadding list-row-space"
                               style="text-align: left;color: #434343;"></p>
                        </div>
                        <div class="col-md-4 col-xs-12 nopadding">
                            <label class="col-md-5 col-xs-5 control-label list-row-space">服务结束日期：</label>
                            <p id="jsrq" class="control-label col-md-7 col-xs-7 nopadding list-row-space"
                               style="text-align: left;color: #434343;"></p>
                        </div>
                    </div>
                    <div class=" col-md-12" id="isYh_qysh" style="display: none;">
                      <%--  <div class="col-md-4 col-xs-12 nopadding">
                            <label class="col-md-5 col-xs-5 control-label list-row-space">护理券金额：</label>
                            <p id="hlqje" class="control-label col-md-7 col-xs-7 nopadding list-row-space"
                               style="text-align: left;color: #434343;"></p>
                        </div>--%>

                        <div class="col-md-4 nopadding">
                            <label class="col-md-5 col-xs-5 control-label list-row-space">是否优惠：</label>
                            <p id="isYh" class="control-label col-md-7 col-xs-7 nopadding list-row-space"
                               style="text-align: left;color: #434343;"></p>
                        </div>

                        <div class="col-md-4 col-xs-12 nopadding">
                            <label class="col-md-5 col-xs-5 control-label list-row-space">有效起始日期：</label>
                            <p id="yxqks" class="control-label col-md-7 col-xs-7 nopadding list-row-space"
                               style="text-align: left;color: #434343;"></p>
                        </div>
                        <div class="col-md-4 col-xs-12 nopadding">
                            <label class="col-md-5 col-xs-5 control-label list-row-space">有效结束日期：</label>
                            <p id="yxqjs" class="control-label col-md-7 col-xs-7 nopadding list-row-space"
                               style="text-align: left;color: #434343;"></p>
                        </div>
                    </div>

                    <div class=" col-md-12">
                        <div class="col-md-4 col-xs-12 nopadding">
                            <label class="col-md-5 col-xs-5 control-label">审核：</label>
                            <div class="col-md-7">
                                <div class="div_icheck" id="id_review_result"></div>
                            </div>
                        </div>
                        <div class="col-md-4 col-xs-8 nopadding" id="shbtgyy_div" style="left: 20px;display: none">
                            <input class="form-control input-sm" id="shsm" name="shsm"
                                   style="border: 0px; border-bottom: 1px solid silver;">
                        </div>
                    </div>
                    <div class="col-md-12" style="margin-top: 5px;">
                        <div class="col-md-4 col-xs-12 nopadding">
                            <label class="col-md-5 col-xs-5 control-label">短信通知：</label>
                            <div class="col-md-7"style="line-height: 30px; text-align: left;">
                                <input id="dxtz" type="checkbox" checked>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>

<div class="panel panel-default">
    <div id="qyshrycontent" class="panel-collapse collapse in nopadding"
         style="margin: 10px 0 10px 0;">
        <div class="form-bordered form-row-stripped nopadding row">

            <div class="col-md-12">
                <div class="col-md-4 col-xs-12 nopadding">
                    <label class="col-md-5 col-xs-5 control-label nopadding list-row-space">审核人员：</label>
                    <p id="shry" class="control-label col-md-7 col-xs-7 nopadding list-row-space"
                       style="text-align: left;color: #434343;">${ryxm}</p>
                </div>
                <div class="col-md-4 col-xs-12 nopadding">
                    <label class="col-md-5 col-xs-5 control-label nopadding list-row-space">审核日期：</label>
                    <p id="shrq" class="control-label col-md-7 col-xs-7 nopadding list-row-space"
                       style="text-align: left;color: #434343;"></p>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="yyhpt/pages/djgl/nrdjqyshDetail.js" type="text/javascript"></script>
</body>
</html>