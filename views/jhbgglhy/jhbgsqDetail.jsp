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
    <script src="yyhpt/pages/jhbgglhy/jhbgsqDetail.js" type="text/javascript"></script>
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

        .list-row-space {
            margin: 3px 0 3px 0;
        }

        /*小屏幕时lable的样式*/
        .control-label-new {
            padding-top: 6px;
            text-align: right;
            /*padding-left: 0px;*/
        }
    </style>
</head>
<body>
<div id="defaultForm" class="form-horizontal" style="font-size: 13px;">
    <!-- 个人基本信息开始-->
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#grxxcontent" id="collapse1">
                <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                    <span class="glyphicon glyphicon-th"></span> 个人信息
                </h3>
            </a>
        </div>
        <div id="grxxcontent" class="form-horizontal panel-collapse collapse in" style="margin-bottom: 8px">
            <div class="form-group nopadding" style="margin-top: 6px">
                <div class="col-md-5">
                    <label class="control-label control-label-new col-md-4 col-xs-4">姓名：</label>
                    <div class="col-md-8">
                        <div class="input-group  input-group-sm col-md-12 col-xs-8">
                            <input type="text" class="form-control" id="id_name_query" placeholder="">
                            <span class="input-group-btn">
                                <button id="id_btn_name_query" class="btn btn-default btn-flat btn-sm " type="button" style="display: none">
                                    <i class="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-xs-12">
                    <label class="col-md-6 col-xs-4 control-label control-label-new">性别：</label>
                    <div class="col-md-6">
                        <p id="xb" class="form-control-static"></p>
                    </div>
                </div>
                <div class="col-md-4 col-xs-12">
                    <label class="col-md-6 col-xs-4  control-label control-label-new">出生日期：</label>
                    <div class="col-md-6">
                        <p id="csrq" class="form-control-static"></p>
                    </div>
                </div>
            </div>
            <div class="form-group nopadding">
                <%--<div class="col-md-5">
                    <label class="control-label control-label-new col-md-4 col-xs-4 ">身份证号：</label>
                    <div class="col-md-6 ">
                        <p id="hzshfzhh" class="form-control-static"></p>
                    </div>
                </div>--%>
                <div class="col-md-8 col-xs-12">
                    <label class="col-md-3 col-xs-5 control-label control-label-new" style="text-align:center;">居住地址：</label>
                    <div class="col-md-8" style="right: 26px;">
                        <p id="jzdz" class="form-control-static"></p>
                    </div>
                </div>


                <div class="col-md-4">
                    <label class="col-md-6 col-xs-4 control-label control-label-new" style="text-align: right;padding-left: 26px;">联系电话：</label>
                    <div class="col-md-6">
                        <p id="lxdh" class="form-control-static"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 个人基本信息结束 -->

    <div id="id_apply_form" method="post" class="form-horizontal" style="font-size: 13px;display: none">
        <div id="fwbxz" class="panel panel-default">
            <div class="panel-heading">
                <a data-toggle="collapse" data-parent="#accordion" href="#fwbxzccontent" id="collapse_click">
                    <h3 style="margin-top: 0px;margin-bottom: 0px;font-weight:bold;font-size:20px;color:#000000;">
                        <span class="glyphicon glyphicon-th"></span> 原计划内容</h3>
                </a>
            </div>
            <div  id="fwbxzccontent" class="panel-collapse collapse in nopadding" style="margin: 0px 0 0px 0;">
                <table id="table_jhbgsq" class="table-container"></table>
            </div>
        </div>

        <!-- 变更申请信息 -->
        <form id="defaultForm_" method="post" class="form-horizontal" style="font-size: 13px;">
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
                    <div id="jaxxcontent" class="panel-collapse collapse in nopadding" style="margin: 10px 0 10px 0;">
                        <div class="form-bordered form-row-stripped nopadding row">
                            <div class="col-md-12 col-xs-12" style="margin: 0px 0 10px 0;">
                                <label class="control-label col-md-2 col-xs-4" style="margin-bottom: 1px;margin-top: 5px;padding-top: 0px;">变更原因：</label>
                                <div class="col-md-4" id="bgyydiv" style='padding-top: 6px;color: #737373'>
                                </div>
                                <div class="col-md-4" id="bgyysmDiv" style="display: none">
                                    <input class="form-control input-sm" id="bgyysm" name="bgyysm"
                                           style="border: 0px; border-bottom: 1px solid silver;">
                                </div>
                            </div>
                            <div class="col-md-12 col-xs-12" style="margin: 0px 0 10px 0;">
                                <label class="control-label col-md-2 col-xs-6">原医养管理等级：</label>
                                <label id="ygldjdmdiv" class="control-label col-md-1 col-xs-4"
                                       style='padding-left: 0px;padding-right: 6px;left: 28px;'>
                                </label>
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
                                <label class="control-label col-md-2 col-xs-4">申请日期：</label>
                                <div class="input-group col-md-2 col-xs-10"
                                     data-date-format="yyyy-mm-dd" style="padding-left: 15px;">
                                    <input type="text" class="form-control input-sm form-control choose-date"
                                           name="sqrq" id="sqrq" title="申请日期">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 变更申请信息 -->
        </form>
    </div>
</div>
</body>
<script>
    $(function () {
        //Initialize Select2 Elements
        $(".select2").select2();
        wnform.NumberIn();
        wnform.IntegerIn();
    });

</script>
