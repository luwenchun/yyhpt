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
    <script src="yyhpt/pages/jhglhy/fwjhshHYList.js" type="text/javascript"></script>
    <script src="yyhpt/pages/jhglhy/jhdetail_pub.js" type="text/javascript"></script>
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
    <div class="panel-body nopadding" style="padding-top: 10px;">
        <div class="form-group list-space-row" style="padding-left: 15px;">
            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label">姓名：</label>
            </div>

            <p id="hzxm" class="control-label col-md-1 col-xs-8 nopadding"
               style="text-align: left;color: #434343;"></p>
            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label">联系电话：</label>
            </div>
            <p id="lxdh" class="control-label col-md-2 col-xs-9 nopadding"
               style="color: #434343;margin-bottom: 6px;">&nbsp;</p>

            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label nopadding">制定人：</label>
            </div>
            <p id="jhzdryxm" class="control-label col-md-2 col-xs-9 nopadding"
               style="text-align: left;color: #434343;padding-left: 5px;"></p>
            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label nopadding">制定日期：</label>
            </div>
            <p id="jhzdrq" class="control-label col-md-3 col-xs-9 nopadding"
               style="text-align: left;color: #434343;"></p>
        </div>
        <div class="form-group list-space-row" id="cqjh_type" style="padding-left: 15px;display: block;">

            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label">评估结论：</label>
            </div>
            <p id="pgjlnrgr" class="nopadding col-md-1 col-xs-9 control-label"
               style="text-align: left;color: #434343;"></p>

            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label nopadding">服务频次：</label>
            </div>
            <p id="jhzdfwpc" class="col-md-2 col-xs-9 nopadding control-label"
               style="text-align: left;color: #434343;"></p>
            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label nopadding">服务时间：</label>
            </div>
            <p id="jhzdzxsj" class="col-md-6 col-xs-8 nopadding control-label"
               style="text-align: left;color: #434343;padding-left: 5px;"></p>
        </div>

        <div class="form-group list-space-row" style="padding-left: 15px;" id="fjDiv">
            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label">附件：</label>
            </div>

            <p id="fileDiv" class="control-label col-md-11 col-xs-8 nopadding"
               style="text-align: left;color: #434343;"></p>
        </div>

        <div class="form-group list-space-row" id="lsjh_type" style="padding-left: 15px;display: none;">

            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label">评估结论：</label>
            </div>
            <p id="pgjlnrgr_lsjh" class="nopadding col-md-1 col-xs-9 control-label"
               style="text-align: left;color: #434343;"></p>

            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label nopadding">服务时间：</label>
            </div>
            <p id="jhzdzxsj_lsjh" class="col-md-2 col-xs-9 nopadding control-label"
               style="text-align: left;color: #434343;"></p>

            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label">服务地址：</label>
            </div>
            <div class="warning col-md-6 input-group input-group-sm"
                 style="padding: 0px 15px 0px 0px; margin-bottom: 5px;">
                <input type="text" class="form-control input-sm" id="FWDZ"
                       name="FWDZ" maxlength="100" placeholder=""> <span
                    class="input-group-addon" style="border-width: 0px"> <img
                    style="cursor: pointer;" onclick="showDz();"
                    src="layouts/img/dialog/icon_address.png"/></span>
            </div>

        </div>
    </div>
</div>
<!-- 个人基本信息结束 -->
<div id="rqlbDiv" class="panel panel-default">
    <div class="panel-heading" style="display: none">
        <h3 style="margin-top: 0px;margin-bottom: 0px;font-weight:bold;font-size:20px">
            <span class="glyphicon glyphicon-th"></span> 服务项目审核</h3>
    </div>
    <div class="form-group" style="margin:10px 0px 0px 0px;">
        <div class="panel-body nopadding">

            <div class="col-md-9 col-xs-12 nopadding">
                <label class="checkbox col-md-2 col-xs-6 control-label" style="width: 100px;margin-left: 15px;">
                    <input type="radio" name="shzt" value="1" checked> 审核通过
                </label>
                <label class="checkbox col-md-2 col-xs-6 control-label" style="margin-top: 1px;">
                    <input type="radio" name="shzt" value="2" checked> 审核不通过
                </label>
                <div class="col-md-5 col-xs-12">
                    <input type="text" class="form-control input-sm" id="shsm" placeholder="" maxlength="50">
                </div>

                <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                    <label class="control-label" style="margin-top: 8px;">合计：</label>
                </div>
                <p id="money_sum" class="control-label col-md-1 col-xs-9 "
                   style="margin-top: 8px;text-align: left;color: #434343;padding-left: 5px;"></p>
            </div>
            <div class="col-md-3">
                <div class="pull-right" id="fjhshList_btnDiv">
                    <button id="jhsh_btn_add" type='button' value="disabled" class="btn btn-default btn-sm">
                        新增项目
                    </button>
                    <button id="btn_jhzd_addhc" class="btn btn-default btn-sm" type='button' value="disabled">
                        新增耗材
                    </button>
                    <button id="jhsh_btn_Submit" type='button' value="disabled" class="btn btn-default btn-sm">
                        保存
                    </button>
                    <button id="jhsh_btn_exit" type='button' class="btn btn-default btn-sm">
                        退出
                    </button>
                </div>
            </div>
            <div class="col-md-12 col-xs-12 nopadding" hidden="hidden">
                <div class="control-label">
                    <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label" style="margin-top: 8px;">项目：</label>
                    </div>
                    <p id="money_xmhj" class="control-label col-md-1 col-xs-9 "
                       style="margin-top: 8px;text-align: left;color: #434343;padding-left: 5px;"></p>

                    <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label" style="margin-top: 8px;">耗材：</label>
                    </div>
                    <p id="money_hchj" class="control-label col-md-1 col-xs-9 "
                       style="margin-top: 8px;text-align: left;color: #434343;padding-left: 5px;"></p>

                    <%-- <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                         <label class="control-label" style="margin-top: 8px;">合计：</label>
                     </div>
                     <p id="money_sum" class="control-label col-md-1 col-xs-9 "
                        style="margin-top: 8px;text-align: left;color: #434343;padding-left: 5px;"></p>--%>
                </div>
            </div>
        </div>


    </div>
    <%--<table id="table_fwjhsh" class="table-container"></table>--%>

    <div class="row" id="id_tables_container">
        <div class="col-md-6">
            <table id="table_fwjhsh" class="table-container"></table>
        </div>
        <div class="col-md-6">
            <table id="table_fwjhzd1" class="table-container"></table>
        </div>
    </div>

</div>

<script type="text/javascript">

    function showDz() {
        try {
            android.toShow();
        } catch (e) {
            wnform.toast('定位操作仅适用于移动端！');
        }
    }

    function SetFwDz(Dwdz) {
        try {
            $('#FWDZ').val(Dwdz);
        } catch (e) {
            wnform.toast('定位失败！');
        }

    }
</script>

</body>
</html>