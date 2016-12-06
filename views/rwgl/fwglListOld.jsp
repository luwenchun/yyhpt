<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title></title>
    <link href="layouts/css/white/list_page.css" rel="stylesheet">
</head>
<body>
<div class="panel-body">
    <form id="rwglListForm" method="post" class="form-horizontal fwgl-list-font">
        <!-- /.row -->
        <div id="rwglListItem" class="row">
            <div class="col-lg-4 col-md-4" id="firstDiv">
                <div class="panel list-panel-border">
                    <div class="panel-heading list-panel-head">
                        <div class="row" id="fwdjDiv">
                            <div class="col-xs-2 col-md-2 panel-bg-turquoise list-title-left-col">
                                <strong class="list-title">服务<br/>登记</strong>
                            </div>
                            <div class="col-xs-5 col-md-5 list-title-middel-col">
                                <div class="list-title-space list-title-statu">
                                    <strong class="list-title-num list-title-turquoise" id="fwdjWdjNum">0</strong> 未登记
                                </div>
                                <div class="list-title-space list-title-statu">
                                    <strong class="list-title-num list-title-turquoise" id="fwdjYdjNum">0</strong> 已登记
                                </div>
                            </div>
                            <div class="col-xs-5 col-md-5 text-right list-title-right-col">
                                <div class="list-title-space">
                                    <img src="${basePath}/layouts/img/toolbar/list_icon_01.png"/>
                                </div>
                                <a class="list-title-link list-title-turquoise" id="fwdjQuery" href="#" title="点击查看详情">
                                    <strong>查看详情>></strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4" id="secondDiv">
                <div class="panel list-panel-border-red">
                    <div class="panel-heading list-panel-head">
                        <div class="row" id="fwpjDiv">
                            <div class="col-xs-2 col-md-2 panel-bg-red list-title-left-col">
                                <strong class="list-title">服务<br/>评价</strong>
                            </div>
                            <div class="col-xs-5 col-md-5 list-title-middel-col">
                                <div class="list-title-space list-title-statu">
                                    <strong class="list-title-num list-title-red" id="fwpjWpjNum">0</strong> 未评价
                                </div>
                                <div class="list-title-space list-title-statu">
                                    <strong class="list-title-num list-title-red" id="fwpjYpjNum">0</strong> 已评价
                                </div>
                            </div>
                            <div class="col-xs-5 col-md-5 text-right list-title-right-col">
                                <div class="list-title-space"><img src="${basePath}/layouts/img/toolbar/list_icon_02.png"/>
                                </div>
                                <a class="list-title-link list-title-red" id="fwpjQuery" href="#" title="点击查看详情">
                                    <strong>查看详情>></strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4" id="thirdDiv">
                <div class="panel list-panel-border-gray">
                    <div class="panel-heading list-panel-head">
                        <div class="row" id="fwhfDiv">
                            <div class="col-xs-2 col-md-2 panel-bg-gray list-title-left-col">
                                <strong class="list-title">服务<br/>回访</strong>
                            </div>
                            <div class="col-xs-5 col-md-5 list-title-middel-col">
                                <div class="list-title-space list-title-statu">
                                    <strong class="list-title-num list-title-gray" id="fwhfWhfNum">0</strong> 未回访
                                </div>
                                <div class="list-title-space list-title-statu">
                                    <strong class="list-title-num list-title-gray" id="fwhfYhfNum">0</strong> 已回访
                                </div>
                            </div>
                            <div class="col-xs-5 col-md-5 text-right list-title-right-col">
                                <div class="list-title-space"><img src="${basePath}/layouts/img/toolbar/list_icon_03.png"/>
                                </div>
                                <a class="list-title-link list-title-gray" id="fwhfQuery" href="#" title="点击查看详情">
                                    <strong>查看详情>></strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="rqlbDiv" class="panel panel-default">
            <div class="panel-heading" id="fwgl-title" style="font-size:16px;color:#434343;font-weight:bold;">
                <span class="glyphicon glyphicon-th"></span> 服务管理列表
            </div>

            <div class="form-group" style="margin:5px 0px 5px 0px;">
                <label class="col-md-1 control-label">姓名：</label>
                <div class="col-md-2">
                    <input type="text" class="form-control input-sm" id="xmSearch" placeholder="" maxlength="15">
                </div>

                <%--<label class="col-md-2 control-label">身份证号：</label>
                <div class="col-md-3">
                    <input type="text" class="form-control input-sm" id="sfzh" placeholder="" maxlength="18">
                </div>--%>

                <div style="display: none">
                    <label class="col-md-1 control-label">责任人：</label>
                    <div class="col-md-2">
                        <select class="form-control input-sm" name="zrr" id="zrr">

                        </select>
                    </div>
                </div>
                <div class="pull-right list-btnDiv">
                    <button id="btn_query" class="btn btn-default btn-sm">
                        查询
                    </button>
                    <button id="export" class="btn btn-default btn-sm">
                        导出
                    </button>
                    <button id="more" class="btn btn-default btn-sm" style="display: none">
                        更多
                    </button>
                </div>
            </div>
            <div id="more_search_div" class="form-group" style="margin:0px 0px 5px 0px;display:none;">
                <label class="col-md-1 control-label">登记状态：</label>
                <div class="col-md-2">
                    <select class="form-control input-sm" name="djzt" id="djzt">
                        <option value="">--请选择--</option>
                        <option value="0">未登记</option>
                        <option value="1">已登记</option>
                    </select>
                </div>

                <label class="col-md-1 control-label">评价状态：</label>
                <div class="col-md-2">
                    <select class="form-control input-sm" name="pjzt" id="pjzt">
                        <option value="">--请选择--</option>
                        <option value="0">未评价</option>
                        <option value="1">已评价</option>
                    </select>
                </div>

                <label class="col-md-1 control-label">回访状态：</label>
                <div class="col-md-2">
                    <select class="form-control input-sm" name="hfzt" id="hfzt">
                        <option value="">--请选择--</option>
                        <option value="0">未回访</option>
                        <option value="1">已回访</option>
                    </select>
                </div>
                <!-- <div class="col-md-3">
                    <label style="padding-top: 5px;margin-right: 30px;"><input name="rdHfzt" type="radio" value="" checked/> 全部 </label>
                    <label style="margin-right: 30px;">
                        <input name="rdHfzt" type="radio" value="0" /> 未回访 </label>
                    <label><input name="rdHfzt" type="radio" value="1" /> 已回访 </label>
                </div> -->
            </div>
            <table id="table" class="table-container"></table>
        </div>
    </form>
    <div id="toolbar"></div>
</div>
<script src="${basePath}/yyhpt/pages/rwgl/fwglList.js" type="text/javascript"></script>
</body>
</html>