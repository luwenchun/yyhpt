<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title></title>

    <link href="layouts/css/white/detail_page.css" rel="stylesheet">
    <!-- <link href="frame/plugins/bootstrap-fileinput/bootstrap-fileinput.css"
        rel="stylesheet" type="text/css" /> -->
    <link
            href="frame/plugins/bootstrap-fileinput/bootstrap-fileinput-mulitple.css"
            rel="stylesheet" type="text/css"/>
    <script>
        var rybm = '<%=session.getAttribute("rybm")%>';
    </script>
    <style type="text/css">
        .fwglFwdjSaveBtn {
            display: none;
        }

        .fwglFwdjExistBtn {
            display: none;
        }

        .modal-footer {
            border-top: 0px solid #e5e5e5;
        }

        #fwgllbTable thead tr {
            background-color: #21B7C6;
            color: #ffffff;
        }

        @media ( max-width: 768px) {
            .control-label {
                text-align: left;
            }
        }

        /*    .textarea-input {
                padding-right: 20px;
                background: url("layouts/img/table/icon_del.png") no-repeat scroll right top transparent;
            }*/

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

        .head-title {
            margin-top: 0px;
            margin-bottom: 0px;
            font-weight: bold;
            font-size: 20px;
            color: #000000;
        }

        /*小屏幕时lable的样式*/
        .control-label-new {
            padding-top: 6px;
            text-align: right;
            padding-left: 0px;
        }

        /*重写样式*/
        .form-control-static {
            padding-top: 6px;
            padding-bottom: 6px;
        }

        .textarea-input {
            z-index: 1;
            position: absolute;
            /*right: 11px;*/
            /*top: 50%;*/
            margin-top: 2px;
            padding-right: 20px;
            height: 16px;
            width: 18px;
            background: #fff url("layouts/img/table/icon_del.png") no-repeat  scroll right;
            cursor: pointer;
            right: 21px;
        }


    </style>
</head>
<body>

<div class="panel-body" style="font-size:13px;padding:0px">
    <!-- 服务登记开始-->

    <form id="fwdjForm" method="post" class="form-horizontal">
        <div class="panel panel-default">
            <div class="panel-heading" style="height: 40px">
                <a data-toggle="collapse" data-parent="#accordion"
                   href="#fwdjcontent">
                    <h3
                            style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                        <span class="glyphicon glyphicon-th"></span> 服务登记
                    </h3>
                </a>
            </div>
            <div id="fwdjcontent" class="panel-collapse collapse in nopadding">
                <div class="form-horizontal form-bordered form-row-stripped nopadding">
                    <div class="col-lg-2 col-md-2"
                         style="border: 1px solid #21B7C6; height: 453px; background-color: white; padding-right: 0px; padding-left: 0px; overflow: auto; display: none;">
                        <table id="fwgllbTable" class="table-container"></table>
                    </div>
                    <div class="form-group" style="margin-top: 8px;">
                        <label class="col-md-2 col-sm-2 control-label">姓名：</label>
                        <div class="warning col-md-3 col-sm-10">
                            <p id="XM" class="form-control-static"></p>
                        </div>
                        <label class="col-md-2 col-sm-2 control-label">家庭住址：</label>
                        <div class="warning col-md-3 col-sm-10"
                             style="padding-bottom: 2px;">
                            <p id="JTDZ" class="form-control-static"></p>
                        </div>
                    </div>

                    <div class="form-group" style="margin-top: 5px;">
                        <label class="col-md-2 col-xs-5 col-sm-2 control-label">开始时间：</label>
                        <div
                                class="col-md-3 col-xs-12 col-sm-10 input-group input-group-sm date form_datetime"
                                data-date=""
                                style="padding: 0px 15px 0px 15px; float: left; margin-bottom: 5px;">
                            <input type="text" class="form-control" id="KSSJ" name="KSSJ"
                                   value="" readonly style="background-color: white;"> <span
                                class="input-group-addon"><span
                                class="glyphicon glyphicon-time"></span></span>
                        </div>
                        <label class="col-md-2 col-xs-5 col-sm-2 control-label">结束时间：</label>
                        <div
                                class="col-md-3 col-xs-12 col-sm-10 input-group input-group-sm date form_datetime"
                                style="padding: 0px 15px 0px 15px; float: left; margin-bottom: 5px;">
                            <input type="text" class="form-control" id="JSSJ" name="JSSJ"
                                   value="" readonly style="background-color: white;"> <span
                                class="input-group-addon"><span
                                class="glyphicon glyphicon-time"></span></span>
                        </div>
                    </div>

                    <div class="form-group" style="margin-top: 5px;">
                        <label class="col-md-2 col-sm-2 control-label">服务地址：</label>
                        <div class="warning col-md-8 input-group input-group-sm"
                             style="padding: 0px 15px 0px 15px; margin-bottom: 5px;">
                            <input type="text" class="form-control input-sm" id="FWDZ"
                                   name="FWDZ" maxlength="100" placeholder=""> <span
                                class="input-group-addon" style="border-width: 0px"> <img
                                style="cursor: pointer;" onclick="showDz();"
                                src="layouts/img/dialog/icon_address.png"/></span>
                        </div>
                    </div>
                    <div class="form-group" style="margin-top: 8px;display: block;" id="id_qmwj">
                        <label class="col-md-2 col-sm-2 control-label">签名文件：</label>
                        <div class="warning col-md-1 col-sm-10">
                            <a id='aaaa' onclick="turnFor(this)"><p id="qm" class="form-control-static"></p></a>
                        </div>
                    </div>
                    <div class="form-group" style="margin-top: 5px;">
                        <label class="col-md-2 col-sm-2 control-label">附件：</label>
                        <div id="fileDiv" class="col-md-10 col-sm-10">
                        </div>
                    </div>

                    <input type="text" class="form-control   input-sm hidden"
                           id="FWJLLSH" name="FWJLLSH" placeholder="用于绑定服务记录流水号"/> <input
                        type="text" class="form-control   input-sm hidden" id="YNGRBSH"
                        name="YNGRBSH" placeholder="用于绑定域内个人标识号"/>
                </div>
            </div>
        </div>
    </form>

    <form id="fwdjForm1" method="post" class="form-horizontal">
        <div class="panel panel-default">
            <div class="panel-heading" style="height: 40px;display: none;">
                <a data-toggle="collapse" data-parent="#accordion"
                   href="#yyxxcontent">
                    <h3
                            style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                        <span class="glyphicon glyphicon-th"></span> 服务小结
                    </h3>
                </a>
            </div>
            <div id="tablecontent" class="panel-collapse collapse in nopadding">
                <div class="form-horizontal form-bordered form-row-stripped nopadding">
                    <div class="panel-body nopadding" style="margin-bottom: 6px;margin-right: 0;">
                        <div class="control-label">
                            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                                <label class="control-label">项目：</label>
                            </div>
                            <p id="money_xmhj" class="control-label col-md-1 col-xs-9 "
                               style="text-align: left;color: #434343;padding-left: 5px;"></p>

                            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                                <label class="control-label">耗材：</label>
                            </div>
                            <p id="money_hchj" class="control-label col-md-1 col-xs-9 "
                               style="text-align: left;color: #434343;padding-left: 5px;"></p>

                            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                                <label class="control-label">合计：</label>
                            </div>
                            <p id="money_sum" class="control-label col-md-1 col-xs-9 "
                               style="text-align: left;color: #434343;padding-left: 5px;"></p>
                        </div>
                        <div id="toolbtn_" class="pull-right">
                            <button id="btn_Addfwxm" class="btn btn-default btn-sm" type="button" value="disabled" style="margin-top: 3px;">新增项目
                            </button>
                            <button id="btn_jhzd_addhc" class="btn btn-default btn-sm" type="button" value="disabled" style="margin-top: 3px;">新增耗材
                            </button>
                        </div>
                    </div>

                    <div class="form-group">
                        <%--<table id="fwxmmxTable" class="table-container"></table>--%>
                        <div class="col-md-7">
                            <table id="fwxmmxTable" class="table-container"></table>
                        </div>
                        <div class="col-md-5">
                            <table id="table_fwjhzd1" class="table-container"></table>
                        </div>

                    </div>
                </div>
            </div>
            <!-- 服务小结结束 -->
        </div>
    </form>

    <!-- 服务登记结束 -->
    <!-- 服务小结开始 -->
    <form id="defaultForm" method="post" class="form-horizontal">
        <div class="panel panel-default">
            <div class="panel-heading" style="height: 40px">
                <a data-toggle="collapse" data-parent="#accordion"
                   href="#yyxxcontent">
                    <h3
                            style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                        <span class="glyphicon glyphicon-th"></span> 服务小结
                    </h3>
                </a>
            </div>
            <div id="yyxxcontent" class="panel-collapse collapse in nopadding">
                <div class="form-horizontal form-bordered form-row-stripped nopadding">
                    <div class="form-group">
                        <label class="col-md-2  control-label">主诉：</label>
                        <div class="col-md-10" style="padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">
						<textarea class="form-control input-sm control-content" maxlength="250"
                                  name="zs" id="zs"></textarea>
                        </div>

                    </div>
                    <div class="form-group">
                        <label class="col-md-2  control-label">护理记录：</label>

                        <div class="col-md-10" style="padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">
                            <span class="textarea-input" onclick="clickHljl(this);"></span>
                            <textarea class="form-control input-sm control-content" maxlength="250"
                                      name="hljl" id="hljl"></textarea>
                        </div>

                        <%--  <div class="col-md-10" style="padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">

                              <textarea class="form-control input-sm control-content textarea-input" maxlength="250"
                                        name="hljl" id="hljl"></textarea>
                          </div>--%>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2  control-label">健康指导：</label>
                        <div class="col-md-10" style="padding-right: 20px;padding-bottom: 5px;padding-top: 5px;">
                            <span class="textarea-input" onclick="clickJkzd(this);"></span>
                            <textarea class="form-control input-sm control-content" maxlength="250"
                                      name="jkzd" id="jkzd"></textarea>
                        </div>
                    </div>

                </div>

            </div>
            <!-- 服务小结结束 -->
        </div>
    </form>

    <form id="fwdjForm2" method="post" class="form-horizontal">
        <div class="panel panel-default">
            <div class="panel-collapse collapse in nopadding">
                <div class="form-group" style="margin-top: 8px;margin-bottom: 8px;">
                    <label class="col-md-2  control-label">记录日期：</label>
                    <div class="col-md-3">
                        <p id="jlrq" class="control-static control-content"></p>
                    </div>
                    <label class="col-md-2  control-label">记录人员：</label>
                    <div class="col-md-3">
                        <p id="jlryxm" class="control-static control-content">${ryxm}</p>
                    </div>
                </div>
            </div>
        </div>
    </form>

    <div style="float: right; margin-top: 15px; padding-bottom: 5px;">
        <button id="btn_Save" class="btn btn-default btn-sm">保存</button>
        <button id="btn_Exist" class="btn btn-default btn-sm">退出</button>
    </div>
</div>


<script type="text/javascript">

    function showDz(){
        try{
            android.toShow();
        }catch(e){
            wnform.toast('定位操作仅适用于移动端！');
        }

    }

    function SetFwDz(Dwdz){
        try{
            $('#FWDZ').val(Dwdz);
        }catch(e){
            wnform.toast('定位失败！');
        }

    }
</script>
<script src="yyhpt/pages/rwgl/fwglFwdjHY.js" type="text/javascript"></script>
<script src="yyhpt/pages/jhglhy/jhdetail_pub.js" type="text/javascript"></script>
<%--<script src="frame/plugins/bootstrap-fileinput/bootstrap-fileinput.js" type="text/javascript"></script>--%>
<script
        src="frame/plugins/bootstrap-fileinput/bootstrap-fileinput-mulitple.js"
        type="text/javascript"></script>
</body>
</html>