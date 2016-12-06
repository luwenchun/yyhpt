<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%--
  Created by IntelliJ IDEA.
  User: gaozh
  Date: 2016/10/26 0026
  Time: 9:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>新增医用耗材</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <script type="text/javascript" src="yyhpt/pages/jcsj/yyhcDetail.js"/>
    <script type="text/javascript" src="frame/plugins/jquery-validation/js/jquery.validate.js"/>
    <style type="text/css">
        .list-row-space {
            margin: 3px 0 3px 0;
        }

    </style>
</head>
<body>
<form id="defaultForm" method="post" class="form-horizontal">
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="form-group">
                <div class="form-group col-md-5">
                    <label class="col-md-4 control-label">
                        <span class="required"> * </span>耗材代码：
                    </label>
                    <div class="col-md-8">
                        <input type="text" class="form-control input-sm" maxlength="10" name="DM" id="DM"
                               placeholder="请输入耗材代码"/>
                    </div>
                </div>

                <div class="form-group col-md-5">
                    <label class="col-md-4 control-label">
                        <span class="required"> * </span>耗材名称：
                    </label>
                    <div class="col-md-8">
                        <input type="text" class="form-control input-sm" maxlength="50" name="MC" id="MC"
                               placeholder="请输入耗材名称"/>
                    </div>
                </div>

                <div class="form-group col-md-5 list-row-space">
                    <label class="col-md-4 control-label">
                        <%--<span class="required"> * </span>--%>单位：
                    </label>
                    <div class="col-md-8">
                        <input type="text" class="form-control input-sm" maxlength="30" name="DW" id="DW"
                               placeholder="请输入单位"/>
                    </div>
                </div>

                <%--<div class="form-group col-md-5 list-row-space">
                    <label class="col-md-4 control-label">
                        <span class="required"> * </span>单价：
                    </label>
                    <div class="col-md-8">
                        <input type="text" class="form-control input-sm" maxlength="50" name="DJ" id="DJ"
                               placeholder="请输入耗材单价"/>
                    </div>
                </div>--%>
            </div>
        </div>
    </div>

    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">耗材规格设置</h3>
        </div>

        <div class="panel-body">
            <%--<hr style="margin-bottom: 10px">--%>
                <div class="form-group">
                    <div class="form-group col-md-12">
                        <label class="col-md-1 control-label">规格：</label>
                        <div id="xhdiv" class="col-md-10">
                            <table id="xhTable" class="table"></table>
                        </div>
                        <div class="col-md-1" style="padding-top: 6px;">
                            <a id="plus" href="javascript:void(0)" data-toggle="modal" disabled title="增加">
                                <i class="glyphicon glyphicon-plus"></i>新增
                            </a>
                        </div>
                    </div>
                </div>
        </div>
    </div>

    <div class="panel panel-default">
        <div class="panel-body">
            <div class="form-group">
                <label class="col-md-1 control-label">备注：</label>
                <div class="col-md-11" id="notes">
                    <textarea class="form-control input-sm" name="BZ" id="BZ" placeholder="" rows=1
                              maxlegth="200"></textarea>
                </div>
            </div>
        </div>
    </div>
</form>
</body>
</html>
