<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title></title>
    <link href="layouts/css/white/list_page.css" rel="stylesheet">
    <script src="frame/plugins/counterup/jquery.waypoints.min.js"></script>
    <script src="frame/plugins/counterup/jquery.counterup.js"></script>
</head>
<body>
<div class="panel-body">
    <form method="post" class="form-horizontal list-font">
        <!-- /.row -->
        <div class="row">
            <div class="col-lg-4 col-md-4" id="firstDiv">
                <div class="panel list-panel-border">
                    <div class="panel-heading list-panel-head">
                        <div class="row" id="fwdjDiv">
                            <div class="col-xs-2 col-md-2 panel-bg-turquoise list-title-left-col">
                                <strong class="list-title">收案<br/>评估</strong>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col" id="block1">
                                <div class="col-md-6 col-xs-6 block-half-left block-select">
                                    <span class="list-title-space list-title-statu">
                                        <span id="wpgNum" class="list-title-num list-title-turquoise counter">0</span>
                                        <span>未评估</span>
                                    </span>
                                </div>
                                <div class="col-md-6 col-xs-6 block-half-right">
                                    <span class="list-title-space list-title-statu">
                                        <span id="ypgNum" class="list-title-turquoise counter">0</span>
                                        <span>已评估</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4" id="secondDiv">
                <div class="panel list-panel-border-red">
                    <div class="panel-heading list-panel-head">
                        <div class="row" id="zjqkDiv">
                            <div class="col-xs-2 col-md-2 panel-bg-red list-title-left-col">
                                <strong class="list-title">转介<br/>情况</strong>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col" id="block2">
                                <div class="col-md-6 col-xs-6 block-half-left">
                                    <span class="list-title-space list-title-statu">
                                        <span id="wzjNum" class="list-title-green counter">0</span>
                                        <span>未转介</span>
                                    </span>
                                </div>
                                <div class="col-md-6 col-xs-6 block-half-right">
                                   <span class="list-title-space list-title-statu">
                                       <span id="yzjNum" class="list-title-green counter">0</span>
                                        <span>已转介</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4" id="thirdDiv">
                <div class="panel list-panel-border-gray">
                    <div class="panel-heading list-panel-head">
                        <div class="row" id="tdzhDiv">
                            <div class="col-xs-2 col-md-2 panel-bg-gray list-title-left-col">
                                <strong class="list-title">团队<br/>照护</strong>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col" id="block3">
                                <div class="col-md-6 col-xs-6 block-half-left">
                                    <span class="list-title-space list-title-statu">
                                        <span id="wjlNum" class="list-title-num list-title-statu counter">0</span>
                                        <span>未记录</span>
                                    </span>
                                </div>
                                <div class="col-md-6 col-xs-6 block-half-right">
                                    <span class="list-title-space list-title-statu">
                                        <span id="yjlNum" class="list-title-statu counter">0</span>
                                        <span>已记录</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="gwhzDiv" class="panel panel-default">
            <div class="panel-heading" id="list-title" style="font-size:16px;color:#434343;font-weight:bold;">
                <span class="glyphicon glyphicon-th"></span> 高危患者列表
            </div>

            <div class="form-group" style="margin:5px 0px 5px 0px;">
                <label class="col-md-1 control-label nopadding-left">姓名：</label>
                <div class="col-md-2">
                    <input type="text" class="form-control input-sm" id="xmSearch" placeholder="" maxlength="15">
                </div>

                <label class="col-md-1 control-label nopadding-left">筛查日期：</label>
                <div class="col-md-4" style="overflow:hidden">
                    <input type="text" class="input-sm form-control choose-date"
                           id="scksrq" name="scksrq" readonly="readonly" style="float:left;width:40%;background-color: white;">
                    <p class="list-search-p" style="float:left;width:20%;">至</p>
                    <input type="text" class="input-sm form-control choose-date"
                           id="scjsrq" name="scjsrq" readonly="readonly" style="float:left;width:40%;background-color: white;">
                </div>

                <div class="col-md-2" style="padding-top: 6px;">
                    <label><input id="wpgCk" name="pgZt" type="checkbox" value="0" />未评估 </label>
                    <label><input id="ypgCk" name="pgZt" type="checkbox" value="1" />已评估 </label>
                </div>


                <div class="pull-right list-btnDiv">
                    <button id="btn_query" class="btn btn-default btn-sm">
                        查询
                    </button>
                    <button id="btn_more" class="btn btn-default btn-sm">
                        更多
                    </button>
                </div>
            </div>
            <div id="more_search_div" class="form-group" style="margin:0px 0px 5px 0px;display:none;">
                <label class="col-md-1 control-label">是否出院：</label>
                <div class="col-md-2">
                    <select class="form-control input-sm" name="sfcy" id="sfcy">
                        <option value="">--请选择--</option>
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </div>

                <label class="col-md-1 control-label">病区：</label>
                <div class="col-md-2">
                    <select class="form-control input-sm" name="bqmc" id="bqdm" style="width: 100%">

                    </select>
                </div>

                <label class="col-md-1 control-label">科室：</label>
                <div class="col-md-2">
                    <select class="form-control input-sm" name="ksmc" id="ksdm" style="width: 100%">

                    </select>
                </div>

            </div>
            <table id="table" class="table-container"></table>
        </div>
    </form>
    <div id="toolbar"></div>
</div>
<script src="${basePath}/yyhpt/pages/sagl/saglList.js" type="text/javascript"></script>
</body>
</html>