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
    <script src="yyhpt/pages/jhbggl/jhbgshDetail.js" type="text/javascript"></script>
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
    </style>
</head>
<body>
<!-- 个人基本信息开始-->
<jsp:include page="/yyhpt/views/common/grjbxxDetail.jsp"></jsp:include>
<!-- 个人基本信息结束 -->

<div id="fwbxz" class="panel panel-default">
    <div class="panel-heading">
        <a data-toggle="collapse" data-parent="#accordion" href="#fwbxzccontent" id="collapse3">
            <h3 style="margin-top: 0px;margin-bottom: 0px;font-weight:bold;font-size:20px;color:#000000;">
                <span class="glyphicon glyphicon-th"></span> 原计划内容</h3>
        </a>
    </div>
    <div id="fwbxzccontent" class="panel-collapse collapse in nopadding" style="margin: 0px 0 0px 0;;">
        <table id="table_jhbgsh" class="table-container"></table>
    </div>
</div>

<form id="defaultForm" method="post" class="form-horizontal" style="font-size: 13px;">
    <!-- 变更申请信息 -->
    <div class="panel-content" id="table-theme">
        <div class="panel panel-default">
            <div class="panel-heading" style="height: 40px">
                <a data-toggle="collapse" data-parent="#accordion" href="#jaxxcontent">
                    <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                        <span class="glyphicon glyphicon-th"></span> 变更申请信息
                    </h3>
                </a>
            </div>
            <div id="jaxxcontent" class="panel-collapse collapse in nopadding" style="margin: 10px 0 10px 0;">
                <div class="form-bordered form-row-stripped nopadding row">
              <%--      <div class="col-md-12 col-xs-12" style="margin: 0px 0 10px 0;">
                        <label class="control-label col-md-2 col-xs-6" style="padding-top: 0px;">变更原因：</label>
                        <label class="control-label col-md-3 col-xs-4" id="bgyydiv"
                               style='padding-top: 0px;padding-right: 10px;padding-left:5px;text-align:left;color: #737373'>
                        </label>
                        <div class="col-md-4 col-xs-12" style="padding-left: 15px;">
                            <label class="control-label col-md-12 col-xs-4" id="bgyysm" name="bgyysm"
                                   style='border-bottom: 1px solid silver;text-align:left;'>
                            </label>
                        </div>
                    </div>--%>

                    <div class="col-md-12" style="margin: 0px 0 10px 0;">
                        <label class="control-label col-md-2 col-xs-4">变更原因：</label>
                        <div class="col-md-3" id="bgyydiv" style="margin-top: 6px;padding-right: 10px;padding-left:5px;text-align:left;">
                        </div>
                        <div class="col-md-4" id="bgyysmDiv" style="display: none">
                            <input class="form-control input-sm" id="bgyysm" name="bgyysm"
                                   style="border: 0px; border-bottom: 1px solid silver;">
                        </div>
                    </div>

                    <div class="col-md-12 col-xs-12" style="margin: 0px 0 10px 0;">
                        <label class="control-label col-md-2 col-xs-6">原医养管理等级：</label>
                        <label id="ygldjdmdiv" class="control-label col-md-1 col-xs-4"
                               style='padding-left: 0px;padding-right: 10px;'>
                        </label>
                        <label class="control-label col-md-3 col-xs-6">申请管理等级：</label>
                        <label id="sqgldjdmdiv" class="control-label col-md-2 col-xs-4"
                               style='padding-left: 0px;padding-right: 10px;text-align: left;'>
                        </label>
                        <!-- <div id="ygldjdmdiv" class="col-md-7"></div> -->
                    </div>
                    <div class="col-md-12" style="margin: 0px 0 10px 0;">
                        <label class="control-label col-md-2 col-xs-6">申请人员：</label>
                        <label id="sqrgh" class="control-label col-md-2 col-xs-4"
                               style='padding-left: 0px;padding-right: 0px;text-align: left;left: 6px;'>
                        </label>
                        <label class="control-label col-md-2 col-xs-6">申请日期：</label>
                        <label id="sqrq" class="control-label col-md-2 col-xs-4"
                               style='padding-left: 0px;padding-right: 10px;text-align:left;'>
                        </label>
                    </div>
                    <div class="panel-body hidden nopadding" id="shpanel">
                        <div class="col-md-12" style="margin: 0px 0 10px 0;">
                            <label class="control-label col-md-2 col-xs-4">审核结果：</label>
                            <div class="col-md-3" id="shjgdiv" style="color: #737373;">
                            </div>
                            <div class="col-md-4">
                                <input class="form-control input-sm" id="shbtgyy" name="shbtgyy"
                                       style="border: 0px; border-bottom: 1px solid silver;">
                            </div>
                        </div>
                        <div class="col-md-12" style="margin: 0px 0 10px 0;">
                            <label class="control-label col-md-2 col-xs-12">审核人员：</label>
                            <div class="col-md-2 col-xs-12">
                                <select id="shrgh" name="shrxm" class="form-control input-sm"></select>
                            </div>
                            <div class="col-md-8"></div>
                            <div class="form-group" style="margin: 0px 0 10px 0;">
                                <label class="control-label col-md-2 col-xs-6">审核日期：</label>
                                <div class="input-group col-md-2 col-xs-10"
                                     data-date-format="yyyy-mm-dd" style="padding-left: 15px;">
                                    <input type="text" class="form-control input-sm form-control choose-date"
                                           name="shrq" id="shrq" title="审核日期">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 变更申请信息 -->
</form>

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

