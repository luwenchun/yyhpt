<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>签约管理</title>
    <link href="layouts/css/white/list_page.css" rel="stylesheet">
    <link href="layouts/css/white/list_select2.css" rel="stylesheet">
    <script src="frame/plugins/counterup/jquery.waypoints.min.js"></script>
    <script src="frame/plugins/counterup/jquery.counterup.js"></script>
    <style type="text/css">
        .list-row-css {
            color: darkred;
        }

        .list-row-css:hover {
            color: darkcyan;
        }
    </style>
</head>
<body>
<div class="panel-body">
    <form id="djglListForm" method="post" class="form-horizontal list-font">
        <div id="djglListItem" class="row">
            <div class="col-lg-4 col-md-4" id="firstDiv">
                <div class="panel list-panel-border">
                    <div class="panel-heading list-panel-head">
                        <div class="row" id="nrdjDiv">
                            <div class="col-xs-2 col-md-2 panel-bg-turquoise list-title-left-col">
                                <span class="list-title">待<br/>签约
                                </span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col block-text-align" id="block1">
                                <span class="list-title-space list-title-statu">
                                    <div class="block-one block-select">
                                        <span class="list-title-space list-title-turquoise counter" id="wdjNum">0</span>
                                    <span>人</span>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4" id="secondDiv">
                <div class="panel list-panel-border-red">
                    <div class="panel-heading list-panel-head">
                        <div class="row" id="djqkDiv">
                            <div class="col-xs-2 col-md-2 panel-bg-red list-title-left-col">
                                <span class="list-title">待<br/>审核
                                </span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col block-text-align" id="block2">
                                <div class="block-one">
                                    <span class="list-title-space list-title-statu">
                                    <span class="list-title-space list-title-turquoise counter" id="wshNum">0</span>
                                    <span>人</span>
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4" id="thirdDiv">
                <div class="panel panel-box-border-three">
                    <div class="panel-heading list-panel-head">
                        <div class="row" id="jaqkDiv">
                            <div class="col-xs-2 col-md-2 panel-box-three list-title-left-col">
                                <span class="list-title">已<br/>签约
                                </span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col block-text-align" id="block3">
                                <div class="block-one">
                                    <span class="list-title-space list-title-statu">
                                    <span class="box-title-three counter" id="ydjNum">0</span>
                                    <span>人</span>
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="rqlbDiv" class="panel panel-default">
            <div class="panel-heading" style="font-size:16px;color:#434343;font-weight:bold;">
                <span class="glyphicon glyphicon-th"></span> 签约管理列表
            </div>

            <div class="form-group" style="margin:5px 0px 5px 0px;">
                <div class="col-md-4">
                    <label class="col-md-4 control-label">姓名:</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control input-sm" id="xm"
                               maxlength="15">
                    </div>
                    <label class="col-md-4 control-label list-row-space">状态：</label>
                    <div class="col-md-8 list-row-space">
                        <select id="zt" class="form-control input-sm"></select>
                    </div>
                </div>
                <div class="col-md-2" style="padding-top: 6px;">
                    <label><input id="zcCk" name="qygl" type="checkbox" value="0"/>正常 </label>
                    <label><input id="zzCk" name="qygl" type="checkbox" value="1"/>中止 </label>
                </div>

                <div style="display: none">
                    <label class="col-md-1 control-label">登记人员：</label>
                    <div class="col-md-2">
                        <select class="form-control input-sm" name="djys" id="djys">

                        </select>
                    </div>
                </div>

                <label class="col-md-1 control-label">医保类别：</label>
                <div class="col-md-2">
                    <select type="text" class="form-control input-sm" id="yblb"
                            placeholder="" maxlength="150"></select>
                </div>

                <div class="pull-right list-btnDiv" id="jhglList_btnDiv">
                    <button id="btn_query" class="btn btn-default btn-sm">查询
                    </button>
                    <button id="btn_export" class="btn btn-default btn-sm">
                        导出
                    </button>
                    <button id="btn_more" class="btn btn-default btn-sm hidden">更多
                    </button>
                </div>
            </div>
            <table id="table" class="table-container"></table>
        </div>
    </form>
</div>


<div id="toolbar"></div>
<script src="yyhpt/pages/djgl/djglList.js" type="text/javascript"></script>
</body>
</html>