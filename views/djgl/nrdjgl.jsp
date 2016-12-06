<%@ page language="java" contentType="text/html; charset=UTF-8" %>
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
                    <div class="col-md-12" style="margin-left:10px;">
                        <div class="col-md-9 nopadding">
                            <label class="col-md-2 control-label nopadding list-row-space"
                                   style="text-align:right;">医养管理等级 :</label>
                            <div class="col-md-10 nopadding " style="line-height:30px;">
                                <div class="div_icheck" id="gldjdmdiv"></div>
                            </div>
                        </div>
                    </div>

                    <div class=" col-md-12">
                        <div class="col-md-4 nopadding">
                            <label class="col-md-5 col-xs-5 control-label list-row-space">护理服务机构：</label>
                            <div class="col-md-7 col-xs-7 input-group nopadding list-row-space">
                                <select class="form-control input-sm" id="fwjgdm" name="fwjgmc"
                                        onchange="deptChanged()">
                                </select>
                            </div>
                        </div>
                        <!-- <div class="col-md-4 nopadding">
                            <label class="col-md-5 col-xs-5 control-label nopadding list-row-space">服务团队：</label>
                            <div class="col-md-6 col-xs-7 nopadding list-row-space">
                                <select class="form-control input-sm" name="fwtdmc"
                                    id="fwtddm" >
                                </select>
                            </div>
                        </div> -->
                        <div class="col-md-4 nopadding ">
                            <label class="col-md-5 col-xs-5 control-label list-row-space label-space">护理人员：</label>
                            <div class="form-group" style="padding: 0px 15px 0px 0px">
                                <div class=" col-md-6 col-xs-7  nopadding list-row-space">
                                    <select class="form-control  input-sm col-md-12 input-text-body" name="hlyxm"
                                            id="hlygh">

                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=" col-md-12">
                        <div class="col-md-4 nopadding">
                            <label class="col-md-5 col-xs-5 control-label list-row-space">纳入年度：</label>
                            <div class="col-md-5 col-xs-7 input-group nopadding list-row-space">
                                <select class="form-control input-sm" name="nrnd" id="nrnd">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4 nopadding">
                            <label class="col-md-5 col-xs-5 control-label list-row-space">签约起始日期：</label>
                            <div class="input-group col-md-6 nopadding list-row-space">
                                <input type="text"
                                       class="input-sm form-control choose-date" id="ksrq"
                                       name="ksrq" readonly="readonly" style="background-color:white;">
                            </div>
                        </div>
                        <div class="col-md-4 nopadding">
                            <label class="col-md-5 col-xs-5 control-label list-row-space">签约结束日期：</label>
                            <div class="input-group col-md-6 nopadding list-row-space">
                                <input type="text" class="form-control input-sm choose-date input-bgc-white"
                                       id="jsrq"
                                       name="jsrq" readonly="readonly" style="background-color:white;">
                            </div>
                        </div>
                    </div>
                    <div class=" col-md-12" id="hlqclInfo" style="display: none;">
                        <%--   <div class="col-md-4 nopadding">
                               <label class="col-md-5 col-xs-5 control-label list-row-space">护理券金额：</label>
                               <div class="col-md-5 input-group  nopadding list-row-space">
                                   <input type="text" class="form-control input-sm" name="hlqje" id="hlqje"
                                          onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" maxlength="7">
                               </div>
                           </div>--%>
                        <div class="col-md-4 nopadding">
                            <label class="col-md-5 col-xs-5 control-label list-row-space">是否优惠：</label>
                            <div class="col-md-5 input-group  nopadding list-row-space">
                                <%--<input type="text" class="form-control input-sm" name="hlqje" id="hlqje"
                                       onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" maxlength="7">--%>
                                <label class="checkbox-inline" style="padding-left: 0px;">
                                    <input type="checkbox" class="rdZt" name="isYH" value="1">
                                </label>

                            </div>
                        </div>
                        <div class="col-md-4 nopadding">
                            <label class="col-md-5 col-xs-5 control-label list-row-space">有效起始日期：</label>
                            <div class="input-group col-md-6  nopadding list-row-space">
                                <input type="text"
                                       class="form-control input-sm choose-date input-bgc-white" id="yxqks"
                                       name="yxqks" readonly="readonly" style="background-color:white;">
                            </div>
                        </div>
                        <div class="col-md-4 nopadding">
                            <label class="col-md-5 col-xs-5 control-label list-row-space">有效结束日期：</label>
                            <div class="input-group col-md-6  form-group nopadding list-row-space">
                                <input type="text" class="form-control input-sm choose-date input-bgc-white"
                                       id="yxqjs"
                                       name="yxqjs" readonly="readonly" style="background-color:white;">
                            </div>
                        </div>

                        <div class="col-md-2 col-xs-6 nopadding">
                            <label class="control-label col-md-10 col-xs-10 list-row-space">说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明：</label>
                        </div>
                        <span class="col-xs-6 col-md-10"><label class="control-label list-row-space" id="yhsm" style="text-align: left;">无</label></span>

                    </div>
                </div>
            </div>
        </div>
    </div>
</form>

<script src="yyhpt/pages/djgl/nrdjglDetail.js" type="text/javascript"></script>
</body>
</html>