<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>可变更计划选人</title>
    <link href="frame/css/extra.css" rel="stylesheet">
    <link href="frame/css/components.min.css" rel="stylesheet" type="text/css"/>
    <script src="yyhpt/pages/jhbggl/jhbgglAdd.js" type="text/javascript"></script>
</head>
<body>
<div class="panel-body" style="font-size: 13px;">
    <div class="form-group">
        <label class="col-md-1 control-label">姓名</label>
        <div class="col-md-3">
            <input type="text" class="form-control input-sm" id="id_name"
                   maxlength="15">
        </div>

        <%--<label class="col-md-2 control-label">身份证号</label>
        <div class="col-md-4">
            <input type="text" class="form-control input-sm" id="id_identity"
                   maxlength="18">
        </div>--%>
        <button id="id_btn_query" class="btn btn-default btn-sm pull-right" style="margin-bottom: 5px">查询</button>
    </div>
    <div class="form-group">
        <div class="form-group col-md-12 no-padding">
            <table id="jhbgApplyPersonInfoTable" class="table-container"></table>
        </div>
    </div>
</div>
</body>
</html>
