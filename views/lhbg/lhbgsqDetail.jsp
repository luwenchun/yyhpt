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
    <link href="frame/plugins/bootstrap-fileinput/bootstrap-fileinput-mulitple.css" rel="stylesheet" type="text/css" />
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

        .block {
            text-align: center;
            margin: 0 8px;
            padding: 9px 14px;
            background: #FFC4B4;
            border-radius: 3px;
        }

        .block:hover,
        .block-selected {
            color: #FFFFFF;
            background: #EC6841;
        }

        .block .arrow {
            content: " ";
            border-top-color: #999;
            border-top-color: rgba(0, 0, 0, .25);
            border-bottom-width: 0;
        }

        .block .arrow:after {
            content: " ";
        }
    </style>
</head>
<body>
<div id="defaultForm" class="form-horizontal" style="font-size: 13px;">
    <!-- 个人基本信息开始-->
    <jsp:include page="/yyhpt/views/common/grjbxxDetail.jsp"></jsp:include>
    <!-- 个人基本信息结束 -->

    <div id="id_apply_form" method="post" class="form-horizontal" style="font-size: 13px;">
        <div id="fwbxz" class="panel panel-default">
            <div class="panel-heading">
                <a data-toggle="collapse" data-parent="#accordion" href="#fwbxzccontent" id="collapse_click">
                    <h3 style="margin-top: 0px;margin-bottom: 0px;font-weight:bold;font-size:20px;color:#000000;">
                        <span class="glyphicon glyphicon-th"></span> 变更信息</h3>
                </a>
            </div>
            <div id="fwbxzccontent" class="panel-collapse collapse in nopadding" style="margin: 10px 0 10px 0;">
                <div class="form-bordered form-row-stripped nopadding row">
                    <div class="col-md-12 col-xs-12" style="margin: 10px 0 10px 0;">
                        <label class="control-label col-md-1 col-xs-4"
                               style="padding-left: 0px;left: 5px;">变更类型：</label>
                        <div class="col-md-3">
                            <div class="div_icheck" id="id_changeType"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- 通道变更 -->
        <form id="defaultForm_tdbg" method="post" class="form-horizontal" style="font-size: 13px;">
            <div class="panel-content" id="tdbg-theme">
                <div class="panel panel-default">
                    <div class="panel-heading" style="height: 40px">
                        <a data-toggle="collapse" data-parent="#accordion"
                           href="#tdbgcontent">
                            <h3
                                    style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                                <span class="glyphicon glyphicon-th"></span> 通道变更
                            </h3>
                        </a>
                    </div>
                    <div id="tdbgcontent" class="panel-collapse collapse in nopadding" style="margin: 10px 0 10px 0;">
                        <div class="form-bordered form-row-stripped nopadding row">
                            <div class="col-md-12 col-xs-12" style="margin: 0px 0 10px 0;">
                                <label class="control-label col-md-1 col-xs-4">原通道：</label>
                                <div class="col-md-4" id="ytd" style='padding-top: 6px;color: #737373'>
                                </div>
                            </div>
                            <div class="col-md-12 col-xs-12" style="margin: 0px 0 10px 0;">
                                <label class="control-label col-md-2 col-xs-6" style="text-align: left">轮候机构意向：</label>

                                <div class="col-md-8 ">
                                    <select class="form-control input-sm" id="fwjgdm" name="fwjgmc"></select>
                                </div>
                            </div>
                            <div class="col-md-12" style="margin: 0px 0 10px 0;">
                                <label class="control-label col-md-2 col-xs-12" style="text-align: left">新申请通道：</label>
                                <%--<div id="xsqtd" class="col-md-7" style='padding-top: 6px;color: #737373'></div>--%>
                            </div>

                            <div class="form-horizontal form-bordered form-row-stripped nopadding">
                                <div class="form-group nopadding" style="margin-top: 8px;margin: 0px 0 10px 0;">

                                    <div class="col-md-4">
                                        <div class="block block-selected" id="A">
                                            <div class="arrow"></div>
                                            <div>特殊通道</div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="block" id="B">
                                            <div class="arrow"></div>
                                            <div>优先通道</div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="block" id="C">
                                            <div class="arrow"></div>
                                            <div>普通通道</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default"
                                     style="margin: 0px 30px 0px 30px; background-color: #F7F7F7;">
                                    <div class="form-group nopadding">
                                        <div id="tdlx_A_div" style="margin: 8px 6px;"></div>
                                        <div id="tdlx_B_div" style="margin: 8px 12px; display: none"></div>

                                    </div>
                                    <div class="form-group nopadding" style="margin: 8px 12px">
                                        <label class="col-md-1 col-sm-2 control-label">附件：</label>
                                        <div id="fileDiv" class="col-md-10 col-sm-10"></div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <!-- 变更申请信息 -->
        </form>

        <!-- 放弃 -->
        <form id="defaultForm_fq" method="post" class="form-horizontal" style="font-size: 13px;display: none">
            <div class="panel-content" id="fq-theme">
                <div class="panel panel-default">
                    <div class="panel-heading" style="height: 40px">
                        <a data-toggle="collapse" data-parent="#accordion"
                           href="#fqcontent">
                            <h3
                                    style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                                <span class="glyphicon glyphicon-th"></span> 放弃
                            </h3>
                        </a>
                    </div>
                    <div id="fqcontent" class="panel-collapse collapse in nopadding" style="margin: 10px 0 10px 0;">
                        <div class="form-bordered form-row-stripped nopadding row">
                            <div class="col-md-12 col-xs-12" style="margin: 10px 0 10px 0;">
                                <label class="control-label col-md-1 col-xs-4" style="padding-left: 0px;left: 5px;">放弃原因：</label>
                                <div class="col-md-11">
                                    <div class="div_icheck" id="id_changeFqyy"></div>

                                    <div class="col-md-1 col-xs-8 nopadding">
                                        <input class="form-control input-sm" id="shsm" name="shsm"
                                               style="border: 0px; border-bottom: 1px solid silver;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 变更申请信息 -->
        </form>

        <div class="panel panel-default">
            <div id="qyshrycontent" class="panel-collapse collapse in nopadding"
                 style="margin: 10px 0 10px 0;">
                <div class="form-bordered form-row-stripped nopadding row">

                    <div class="col-md-12">
                        <div class="col-md-4 col-xs-12 nopadding">
                            <label class="col-md-4 col-xs-3 control-label nopadding list-row-space">申请人员：</label>
                            <p id="sqry" class="control-label col-md-7 col-xs-7 nopadding list-row-space"
                               style="text-align: left;color: #434343;">${ryxm}</p>
                        </div>
                        <div class="col-md-4 col-xs-12 nopadding">
                            <label class="col-md-5 col-xs-3 control-label nopadding list-row-space">申请日期：</label>
                            <p id="sqrq" class="control-label col-md-7 col-xs-7 nopadding list-row-space"
                               style="text-align: left;color: #434343;"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="frame/plugins/bootstrap-fileinput/bootstrap-fileinput-mulitple.js" type="text/javascript"></script>
<script src="frame/plugins/bootstrap_extra.js" type="text/javascript"></script>
<script src="yyhpt/pages/lhbg/lhbgsqDetail.js" type="text/javascript"></script>

</body>
</html>
