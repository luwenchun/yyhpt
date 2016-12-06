<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>轮候安排列表</title>
    <link href="layouts/css/white/list_page.css" rel="stylesheet">
</head>
<body>
<div class="panel-body">
    <form id="lhryListForm" method="post" class="form-horizontal fwgl-list-font">
        <div id="lrlbDiv" class="panel panel-default">
            <div class="form-group" style="margin:5px 0px 5px 0px;">
                <label class="col-md-1 control-label">姓名:</label>
                <div class="col-md-3">
                    <input type="text" class="form-control input-sm" id="id_name"
                           maxlength="15">
                </div>
                <label class="control-label col-md-2" style="padding-left: 15px;text-align: right">机构名称：</label>
                <div class="col-md-4 ">
                    <select class="form-control input-sm" id="fwjgdm" name="fwjgmc"></select>
                </div>
                <button id="id_btn_query" class="btn btn-default btn-sm pull-right" style="margin-bottom: 5px">查询</button>

            </div>
            <table id="lhbgApplyPersonInfoTable" class="table-container"></table>
        </div>
    </form>
</div>
<script src="yyhpt/pages/lhbg/lhbgglAdd.js" type="text/javascript"></script>
</body>
</html>
