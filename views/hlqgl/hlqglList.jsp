<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>护理券管理</title>
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
                                <span class="list-title">护理券<br/>申请
                                </span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col block-text-align" id="block1">
                                <span class="list-title-space list-title-statu">
                                    <div class="block-one block-select">
                                        <span class="list-title-space list-title-turquoise counter" id="ysqNum">0</span>
                                    <span>已申请</span>
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
                                <span class="list-title">护理券<br/>审核
                                </span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col block-text-align" id="block2">
                                <div class="col-md-6 col-xs-6 block-half-left">
                                   <span class="list-title-space list-title-statu">
                                    <span class="list-title-red counter" id="wshNum">0</span>
                                    <span>待审核</span>
                                </span>
                                </div>
                                <div class="col-md-6 col-xs-6 block-half-right">
                                   <span class="list-title-space list-title-statu">
                                    <span class="list-title-red counter" id="yshNum">0</span>
                                    <span>已审核</span>
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
                                <span class="list-title">启用<br/>情况
                                </span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col block-text-align" id="block3">
                                <div class="col-md-6 col-xs-6 block-half-left">
                                    <span class="list-title-space list-title-statu">
                                    <span class="list-title-space list-title-statu counter" id="yqyNum">0</span><span>已启用</span>
                                    </span>
                                </div>
                                <div class="col-md-6 col-xs-6 block-half-right">
                                    <span class="list-title-space list-title-statu">
                                    <span class="list-title-space list-title-statu counter" id="ytyNum">0</span><span>已停用</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="rqlbDiv" class="panel panel-default">
            <div class="panel-heading" id="fwgl-title" style="font-size:16px;color:#434343;font-weight:bold;">
                <span class="glyphicon glyphicon-th"></span> 护理券管理列表
            </div>

            <div class="form-group" style="margin:5px 0px 5px 0px;">
                <div class="col-md-4 nopadding">
                    <label class="col-md-4 control-label">姓名：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control input-sm" id="xm" placeholder="" maxlength="15">
                    </div>
                    <label class="col-md-4 control-label list-row-space">医保类型：</label>
                    <div class="col-md-8 list-row-space">
                        <select class="form-control input-sm" id="yble_select" name="yble_select">
                        </select>
                    </div>
                </div>
                <div class="col-md-4 nopadding">
                    <label class="col-md-4 control-label">年龄：</label>
                    <div class="col-md-8">
                        <select class="form-control input-sm" id="nl_select" name="nl_select">
                        </select>
                    </div>
                    <label class="col-md-4 control-label list-row-space">状态：</label>
                    <div class="col-md-8 list-row-space">
                        <select id="hlqzt" class="form-control input-sm"></select>
                    </div>
                </div>

                <div class="pull-right list-btnDiv">
                    <button id="export" type="button" class="btn btn-default btn-sm pull-right">
                        导出
                    </button>

                    <button id="btn_query" class="btn btn-default btn-sm pull-right">
                        查询
                    </button>
                    <button class="btn btn-default btn-sm pull-right" type="button" id="btn_add">
                        新增
                    </button>
                </div>
            </div>

            <table id="table" class="table-container"></table>
        </div>
    </form>
</div>
<div id="toolbar"></div>

<script src="yyhpt/pages/hlqgl/hlqglList.js" type="text/javascript"></script>
</body>
</html>