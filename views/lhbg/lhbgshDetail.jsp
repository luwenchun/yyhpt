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
                        <p id="bglx" class="col-md-2 col-xs-9 nopadding control-label"
                           style="text-align: left;color: #434343;"></p>
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
                    <div id="tdbgcontent" class="panel-collapse collapse in">
                        <div class="form-horizontal form-bordered form-row-stripped">
                            <div class="form-group">
                                <label class="col-md-2 control-label
								control-label-new">原通道：</label>
                                <div class="col-md-6">
                                    <p class="form-control-static" id="ytd"></p>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-2 control-label
								control-label-new">轮候机构意向：</label>
                                <div class="col-md-10">
                                    <p class="form-control-static" id="lhjgyx"></p>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-2 control-label
								control-label-new">申请通道：</label>
                                <div class="col-md-6">
                                    <p class="form-control-static" id="xsqtd"></p>
                                </div>
                            </div>

                            <div class="form-group"  id="review">
                                <label class="col-md-2 control-label">审 核：</label>
                                <div class="col-md-6">
                                    <div class="div_icheck" id="changeShResult"></div>
                                </div>
                                <%--<div class="col-md-3" id="id_shbtgyy_div" style="display: none">--%>
                                    <%--<input id="id_shbtgyy" name="shbtgyy" type="text" maxlength="250" title="审核不通过原因必填"--%>
                                           <%--style="width: 100%;height: 30px; border: 0px; border-bottom: 1px solid silver;">--%>
                                <%--</div>--%>

                                <div class="col-md-3">
                                    <input class="form-control input-sm" id="shbtgyy" name="shbtgyy"
                                           style="border: 0px; border-bottom: 1px solid silver;display: none;">
                                </div>
                            </div>

                            <div class="form-group" id="fjDiv">
                                <label class="col-md-2 col-sm-2 control-label">附件：</label>
                                <div id="fileDiv" class="col-md-10 col-sm-10"></div>
                            </div>
                        </div>
                    </div>
                <%--    <div id="tdbgcontent" class="panel-collapse collapse in nopadding" style="margin: 10px 0 10px 0;">
                        <div class="form-bordered form-row-stripped nopadding row">
                            <div class="col-md-12 col-xs-12" style="margin: 0px 0 10px 0;">
                                <label class="control-label col-md-1 col-xs-4">原通道：</label>
                                <div class="col-md-2" id="ytd" style='padding-top: 6px;color: #737373'>
                                </div>
                                <label class="control-label col-md-2 col-xs-6" style="text-align: left">轮候机构意向：</label>
                                <label id="lhjgyx" class="control-label col-md-3 col-xs-4"
                                       style='padding-left: 0px;padding-right: 6px;text-align:left'>
                                </label>
                                <label class="control-label col-md-2 col-xs-12" style="text-align: left">新申请通道：</label>
                                <div id="xsqtd" class="col-md-2" style='padding-top: 6px;color: #737373'></div>
                            </div>
                            <div class="com-md-12 col-xs-12">
                                <label class="control-label col-md-1 col-xs-4">附件：</label>
                                <div class="col-md-4" id="fj" style='padding-top: 6px;color: #737373'>
                                </div>
                            </div>
                            <hr class="hrmin"/>
                            <div class="com-md-12 col-xs-12">
                                <div class="col-md-6">
                                    <label class="control-label col-md-2 col-xs-4" style="padding-left: 0px;padding-right: 10px;">审核：</label>
                                    <div class="col-md-6">
                                        <div class="div_icheck" id="changeShResult"></div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <input class="form-control input-sm" id="shbtgyy" name="shbtgyy"
                                           style="border: 0px; border-bottom: 1px solid silver;display: none;">
                                </div>
                            </div>
                        </div>
                    </div>--%>
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
                            <label class="col-md-4 col-xs-3 control-label nopadding list-row-space">审核人员：</label>
                            <p id="shry" class="control-label col-md-7 col-xs-7 nopadding list-row-space"
                               style="text-align: left;color: #434343;">${ryxm}</p>
                        </div>
                        <div class="col-md-4 col-xs-12 nopadding">
                            <label class="col-md-5 col-xs-3 control-label nopadding list-row-space">审核日期：</label>
                            <p id="shrq" class="control-label col-md-7 col-xs-7 nopadding list-row-space"
                               style="text-align: left;color: #434343;"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</div>
<script src="yyhpt/pages/lhbg/lhbgshDetail.js" type="text/javascript"></script>
</body>
<script>
    $(function () {
        //Initialize Select2 Elements
        $(".select2").select2();
        wnform.NumberIn();
        wnform.IntegerIn();
    });

</script>
</html>
