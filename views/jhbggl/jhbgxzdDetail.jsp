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
    <script src="yyhpt/pages/jhbggl/jhbgjlDetail.js" type="text/javascript"></script>
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
<form id="defaultForm_" class="form-horizontal" style="font-size: 13px;">
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
    <!-- 个人基本信息结束 -->
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
                        <div class="col-md-12" style="margin: 0px 0 10px 0;">
                            <label class="control-label col-md-2 col-xs-6">原医养管理等级：</label>
                            <label id="ygldjdmdiv" class="control-label col-md-1 col-xs-6"
                                   style='padding-left: 0px;padding-right: 10px;'>
                            </label>
                            <!-- <div id="ygldjdmdiv" class="col-md-7"></div> -->
                            <label class="control-label col-md-2 col-xs-6">申请管理等级：</label>
                            <label id="sqgldjdmdiv" class="control-label col-md-1 col-xs-6"
                                   style='padding-left: 0px;padding-right: 10px;'></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </form>

    <div id="fwbxz" class="panel panel-default">
        <div class="panel-heading">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#fwbxzccontent">
                <h3 style="margin-top: 0px;margin-bottom: 0px;font-weight:bold;font-size:20px;color:#000000;">
                    <span class="glyphicon glyphicon-th"></span>新计划制定</h3>
            </a>
        </div>
        <div id="fwbxzccontent" class="panel-collapse collapse in">
            <div class="panel-body nopadding" style="margin-bottom: 6px;margin-right: 0px;">
                <div id="toolbtn" class="pull-left">
                    <button id="btn_bgjl_addfw" class="btn btn-default btn-sm" type='button' style='margin-top: 3px;'>
                        新增服务包
                    </button>
                    <button id="btn_bgjl_addxm" class="btn btn-default btn-sm" type='button' style='margin-top: 3px;'>
                        新增项目
                    </button>
                    <button id="btn_bgjl_reset" class="btn btn-default btn-sm" type='button' style='margin-top: 3px;'>
                        清空
                    </button>
                </div>
                <div id="toolbtns" class="pull-right">
                    <button id="btn_bgjl_save" class="btn btn-default btn-sm" type='button' style='margin-top: 3px;'>
                        保存
                    </button>
                    <button id="btn_bgjl_exit" class="btn btn-default btn-sm" type='button' style='margin-top: 3px;'>
                        退出
                    </button>
                </div>
            </div>

            <table id="table_jhbgjl" class="table-container"></table>

        </div>

    </div>
</form>
</body>
</html>

<script>
    $(function () {
        $(".select2").select2();
        wnform.NumberIn();
        wnform.IntegerIn();
    });
</script>

