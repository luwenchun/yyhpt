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
    <title>新增优惠策略</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="layouts/css/white/list_page.css" rel="stylesheet">
    <script type="text/javascript" src="yyhpt/pages/jcsj/yhpzDetail.js"/>
    <script type="text/javascript" src="frame/plugins/jquery-validation/js/jquery.validate.js"/>
    <style type="text/css">
        hr {
            margin-top: 3px;
            margin-bottom: 5px;
            height: 1px;
            border: none;
            border-top: 1px solid #eee;
        }

    </style>
</head>
<body>
<form id="defaultForm" method="post" class="form-horizontal">
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="form-group">
                <div class="form-group col-md-5">
                    <label class="col-md-5 control-label">
                        <span class="required"> * </span>优惠策略代码：
                    </label>
                    <div class="col-md-7">
                        <input type="text" class="form-control input-sm" maxlength="10" name="YHCLDM" id="YHCLDM"
                               placeholder="请输入优惠策略代码"/>
                    </div>
                </div>

                <div class="form-group col-md-5">
                    <label class="col-md-5 control-label">
                        <span class="required"> * </span>优惠策略名称：
                    </label>
                    <div class="col-md-7">
                        <input type="text" class="form-control input-sm" maxlength="50" name="YHCLMC" id="YHCLMC"
                               placeholder="请输入优惠策略名称"/>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">优惠策略设置</h3>
        </div>

        <div class="panel-body">
                <div class="form-group">
                    <div class="form-group col-md-5">
                        <label class="col-md-5 control-label">
                            优惠方式：
                        </label>
                        <div class="col-md-7">
                            <select class="form-control input-sm" id="YHFSDM" name="YHFSDM">
                                <option value="1">百分比</option>
                                <option value="2">固定值</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group col-md-5">
                        <label class="col-md-5 control-label">
                            优惠值：
                        </label>
                        <div class="col-md-7">
                            <input type="text" class="form-control input-sm" maxlength="50" name="YHZ" id="YHZ"
                                   placeholder="请输入优惠值"/>
                        </div>
                    </div>
                </div>

                <hr style="margin-bottom: 10px;margin-top: 10px;">

                <div class="form-group">
                    <div class="form-group col-md-5">
                        <label class="col-md-5 control-label">
                            有效开始日期：
                        </label>
                        <div class="col-md-7" style="overflow: hidden">
                            <input type="text" class="input-sm form-control choose-date"
                                   id="KSRQ" name="KSRQ" readonly="readonly" style="float:left;background-color: white;">
                        </div>
                    </div>

                    <div class="form-group col-md-5">
                        <label class="col-md-5 control-label">
                            有效结束日期：
                        </label>
                        <div class="col-md-7" style="overflow: hidden">
                            <input type="text" class="input-sm form-control choose-date"
                                   id="JSRQ" name="JSRQ" readonly="readonly" style="float:left;background-color: white;">
                        </div>
                    </div>
                </div>
        </div>
    </div>

</form>
</body>
</html>
