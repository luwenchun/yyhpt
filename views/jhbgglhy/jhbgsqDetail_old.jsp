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
    <script src="yyhpt/pages/jhbggl/jhbgsqDetail.js" type="text/javascript"></script>
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
            background: url("app/pages/img/img_rl.png") no-repeat scroll right center transparent;
            cursor: pointer;
        }
    </style>
</head>
<body>
<form id="defaultForm" class="form-horizontal"
      style="font-size: 13px;">
    <!-- 个人基本信息开始-->
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#grxxcontent">
                <h3 class="head-title">
                    <span class="glyphicon glyphicon-th"></span> 个人信息
                </h3>
            </a>
        </div>
        <div id="grxxcontent" class="panel-collapse collapse in nopadding">
            <div class="form-horizontal form-bordered form-row-stripped nopadding">
                <div class="form-group list-space-row" style="padding-left: 15px;">
                    <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label">姓名：</label>
                    </div>
                    <p id="hzxm" class="control-label col-md-1 col-xs-8 nopadding"
                       style="text-align: left;color: #434343;"></p>
                    <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label">性别：</label>
                    </div>
                    <p id="xb" class="control-label col-md-1 col-xs-9 nopadding"
                       style="text-align: left;color: #434343;"></p>
                    <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label nopadding">出生日期：</label>
                    </div>
                    <p id="csrq" class="control-label col-md-2 col-xs-9 nopadding"
                       style="text-align: left;color: #434343;"></p>
                    <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label nopadding">身份证号：</label>
                    </div>
                    <p id="hzshfzhh" class="control-label col-md-3 col-xs-9 nopadding"
                       style="text-align: left;color: #434343;"></p>
                </div>
                <hr class="hrmin"/>
                <div class="form-group list-space-row" style="padding-left: 15px;">

                    <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label">居住地址：</label>
                    </div>
                    <p id="jzdz" class="nopadding col-md-3 col-xs-9 control-label"
                       style="text-align: left;color: #434343;"></p>

                    <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
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
    </div>
    <!-- 个人基本信息结束 -->

    <div id="fwbxz" class="panel panel-default">
        <div class="panel-heading">
            <a data-toggle="collapse" data-parent="#accordion" href="#fwbxzccontent">
                <h3 style="margin-top: 0px;margin-bottom: 0px;font-weight:bold;font-size:20px;color:#000000;">
                    <span class="glyphicon glyphicon-th"></span> 原计划内容</h3>
            </a>
        </div>
        <!-- 		<div id="fwbxzccontent" class="panel-collapse collapse in">
                    <div class="panel-body">
                        <div id="yxtc" class="panel panel-default">
                            <div class="panel-heading">
                                <a data-toggle="collapse" data-parent="#accordion"
                                    href="#yxtccontent">
                                    <h3 id="yxtccount" class="panel-title">已选服务包(0个)</h3>
                                </a>
                                <input type="text" class="form-control   input-sm hidden"
                                                        id="jhlsh" name="jhlsh" placeholder="计划流水号" />
                            </div>
                            <div id="yxtccontent" class="panel-collapse collapse in nopadding">
                                <div style='margin-top: 10px;' ">
                                    <div class="panel-body nopadding" id="gryxtcpanel">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
        <table id="table_jhbgsq" class="table-container"></table>

    </div>
    <form id="defaultForm" method="post" class="form-horizontal"
          style="font-size: 13px;">
        <!-- 变更申请信息 -->
        <div class="panel-content" id="table-theme">
            <div class="panel panel-default">
                <div class="panel-heading" style="height: 40px">
                    <a data-toggle="collapse" data-parent="#accordion"
                       href="#jaxxcontent">
                        <h3
                                style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                            <span class="glyphicon glyphicon-th"></span> 变更申请信息
                        </h3>
                    </a>
                </div>
                <div id="jaxxcontent" class="panel-collapse collapse in nopadding"
                     style="margin: 10px 0 10px 0;">
                    <div class="form-bordered form-row-stripped nopadding row">
                        <div class="col-md-12 col-xs-12" style="margin: 0px 0 10px 0;">
                            <label class="control-label col-md-2 col-xs-4">变更原因：</label>
                            <!--
                            <label class="checkbox col-md-1 control-label"> <input
                                type="radio" class="yyZt" name="zt" id="ckDjbg" value=""
                                checked>等级变更
                            </label>
                            <label class="checkbox col-md-1 control-label"> <input
                                type="radio" class="yyZt" name="zt" id="ckGrxq"
                                value="0">个人需求
                            </label>
                            -->
                            <div class="col-md-3" id="bgyydiv" style='padding-top: 6px;color: #737373'>
                            </div>
                            <div class="col-md-4">
                                <input class="form-control input-sm" id="bgyysm" name="bgyysm"
                                       style="border: 0px; border-bottom: 1px solid silver;">
                            </div>
                        </div>
                        <div class="col-md-12 col-xs-12" style="margin: 0px 0 10px 0;">
                            <label class="control-label col-md-2 col-xs-6">原医养管理等级：</label>
                            <label id="ygldjdmdiv" class="control-label col-md-1 col-xs-4"
                                   style='padding-left: 0px;padding-right: 6px;'>
                            </label>
                            <!-- <div id="ygldjdmdiv" class="col-md-7"></div> -->
                        </div>
                        <div class="col-md-12" style="margin: 0px 0 10px 0;">
                            <label class="control-label col-md-2 col-xs-12">申请管理等级：</label>
                            <div id="sqgldjdmdiv" class="col-md-7" style='padding-top: 6px;color: #737373'></div>
                        </div>
                        <div class="col-md-12" style="margin: 0px 0 10px 0;">
                            <label class="control-label col-md-2 col-xs-4">申请人员：</label>
                            <div class="col-md-2 col-xs-12">
                                <select id="sqrgh" name="sqrxm" class="form-control input-sm"></select>
                            </div>


                            <div class="col-md-8"></div>
                            <%--<div class="form-group">--%>
                            <label class="control-label col-md-2 col-xs-4">申请日期：</label>
                            <div class="input-group col-md-2 col-xs-10"
                                 data-date-format="yyyy-mm-dd" style="padding-left: 15px;">
                                <input type="text"
                                       class="form-control input-sm form-control choose-date"
                                       name="sqrq" id="sqrq" title="申请日期" readonly="readonly">
                            </div>
                            <%--</div>--%>
                        </div>
                        <%--
                        <div class="panel-body hidden nopadding" id="shpanel">
                            <div class="col-md-12" style="margin: 0px 0 10px 0;">
                                <label class="control-label col-md-2 col-xs-3">审核结果：</label>
                                <div  class="col-md-3" id="shjgdiv" >
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
                                <div class="col-md-1"></div>
                                <div class="form-group">
                                    <label class="control-label col-md-2 col-xs-12">审核日期：</label>
                                    <div class="input-group col-md-2 col-xs-12"
                                        data-date-format="yyyy-mm-dd">
                                        <input type="text"
                                            class="form-control input-sm form-control choose-date"
                                            name="shrq" id="shrq" title="审核日期" readonly="readonly">
                                    </div>
                                </div>
                            </div>
                        </div>--%>
                    </div>
                </div>
            </div>
        </div>
        <!-- 变更申请信息 -->

    </form>
    </div>
    </div>
    </div>
    </div>
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

