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
    <form id="dfglListForm" method="post" class="form-horizontal list-font">

        <div id="dflbDiv" class="panel panel-default">
            <div class="panel-heading" style="font-size:16px;color:#434343;font-weight:bold;">
                <span class="glyphicon glyphicon-th"></span> 电访列表
            </div>

            <div class="form-group" style="margin:5px 0px 5px 0px;">
                <label class="col-md-1 control-label">姓名：</label>
                <div class="col-md-2">
                    <input type="text" class="form-control input-sm" id="xmSearch" placeholder="" maxlength="15">
                </div>

                <label class="col-md-1 control-label nopadding-left">出院日期：</label>
                <div class="col-md-4" style="overflow:hidden">
                    <input type="text" class="input-sm form-control choose-date"
                           id="cyksrq" name="cyksrq" readonly="readonly" style="float:left;width:40%;background-color: white;">
                    <p class="list-search-p" style="float:left;width:20%;">至</p>
                    <input type="text" class="input-sm form-control choose-date"
                           id="cyjsrq" name="cyjsrq" readonly="readonly" style="float:left;width:40%;background-color: white;">
                </div>

                <div class="col-md-2" style="padding-top: 6px;">
                    <label><input id="wdfCk" name="dfZt" type="checkbox" value="0" />未电访 </label>
                    <label><input id="ydfCk" name="dfZt" type="checkbox" value="1" />已电访 </label>
                </div>

                <div class="pull-right list-btnDiv">
                    <button id="btn_query" class="btn btn-default btn-sm">
                        查询
                    </button>
                    <button id="btn_export" class="btn btn-default btn-sm">
                        导出
                    </button>
                    <button id="btn_more" class="btn btn-default btn-sm">
                        更多
                    </button>
                </div>
            </div>

            <table id="table" class="table-container"></table>
        </div>
    </form>
    <div id="toolbar"></div>
</div>
<script src="${basePath}/yyhpt/pages/dfgl/dfglList.js" type="text/javascript"></script>
</body>
</html>