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
    <script src="yyhpt/pages/jhglhy/fwjhzdgrDetail.js" type="text/javascript"></script>
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
<div class="panel panel-default">
    <div class="panel-heading" style="height: 40px">
        <a data-toggle="collapse" data-parent="#accordion"
           href="#grxxcontent">
            <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
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

<div class="panel panel-default">
    <div class="panel-heading" style="background-color:white;">
        <div class="panel-body nopadding">
            <div class="col-md-3 col-xs-12" style="padding-left: 15px;">
                <label>评估结论：</label>&nbsp;&nbsp;<label id="pgjlnrgr"></label>
            </div>
            <div class="col-md-3" style="display: none">
                <label>套餐合计: </label><label style="font-weight:bold;" id="yxfwbhjjg"> 681.0</label>
            </div>
            <div class="col-md-3" style="display: none">
                <!--
                    <label>优惠券:</label><a href="#" id="a_Coupon" style="color:#FF0000;font-weight:bold;TEXT-DECORATION: underline">2张可用</a>
                -->
                <label>护理券抵扣: </label><label id="hlqye" style="font-weight:bold;"> -500.0</label>
                <span>(余额: <label id="hlqdkye" style="font-weight:bold;"> 500</label>)</span>
            </div>
            <div class="col-md-3" style="display: none">
                <label>应付金额: </label><label style="color:#FF0000;font-weight:bold;" id="yxfwbyfjg"> 681.0</label>
            </div>
        </div>
    </div>
</div>

<div id="fwbxz" class="panel panel-default">
    <div class="panel-heading">
        <a data-toggle="collapse" data-parent="#accordion"
           href="#fwbxzccontent">
            <h3 style="margin-top: 0px;margin-bottom: 0px;font-weight:bold;font-size:20px;color:#000000;">
                <span class="glyphicon glyphicon-th"></span> 已制定服务项目</h3>
        </a>
    </div>
    <div id="fwbxzccontent" class="panel-collapse collapse in">
        <div class="panel-body nopadding" style="margin-bottom: 6px;margin-right: 0;">
            <div id="toolbtn" class="pull-left">
                <button id="btn_jhzd_addfw" class="btn btn-default btn-sm" type='button' style='margin-top: 3px;'>
                    新增服务包
                </button>
                <button id="btn_jhzd_addxm" class="btn btn-default btn-sm" type='button' style='margin-top: 3px;'>新增项目
                </button>
                <button id="btn_jhzd_reset" class="btn btn-default btn-sm" type='button' style='margin-top: 3px;'>清空
                </button>
            </div>
            <div id="toolbtn_" class="pull-right">
                <button id="btn_jhzd_save" class="btn btn-default btn-sm" type='button' style='margin-top: 3px;'>保存
                </button>
                <button id="btn_jhzd_exit" class="btn btn-default btn-sm" type='button' style='margin-top: 3px;'>退出
                </button>
            </div>
        </div>

        <table id="table_fwjhzd" class="table-container"></table>

    </div>
</div>

</form>

</div>
</div>
</div>
</body>

</html>


