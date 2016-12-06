<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%--
  Created by IntelliJ IDEA.
  User: gaozh
  Date: 2016/10/25 0025
  Time: 15:48
  To change this template use File | Settings | File Templates.
--%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>医用耗材</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
<div class="page-content">
    <div class="panel-body notopbottom">
        <form id="defaultForm2" method="post" class="form-horizontal" onclick="return false;" style="margin-top: 5px;">
            <div class="panel-body toolbar" style="font-size: 13px;">
                <div class="form-group">
                    <div class="pull-left">
                        <div class="input-group input-group-sm" style="width: 200px;">
                            <input type="text" class="form-control input-sm" id="mc" placeholder="耗材名称"/>
                            <span class="input-group-btn">
                                <button id="btn_query" class="btn btn-default btn-flat btn-sm" type="submit">
                                    <i class="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
                    </div>

                    <div class="pull-right">
                        <button id="add" type="button" class="btn btn-default btn-sm">新增医用耗材</button>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <div class="full-height-content full-height-content-scrollable">
        <div class="full-height-content-body">
            <div class="panel-body fullhgtpanel">
                <table id="table" class="table-container"></table>
            </div>
        </div>
    </div>
</div>

<script src="layouts/scripts/layout.js" type="text/javascript"></script>
<script src="yyhpt/pages/jcsj/yyhcList_old.js" type="text/javascript"></script>
</body>
</html>
