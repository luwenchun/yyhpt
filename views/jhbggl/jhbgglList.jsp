<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
</head>
<body>
<div class="panel-body">
    <div class="panel panel-default">
        <div class="panel-heading" style="font-size:16px;color:#434343;font-weight:bold;">
            <span class="glyphicon glyphicon-th"></span> 计划变更管理列表
        </div>
        <div class="form-group" style="margin:10px 0px 10px 0px;">
            <label class="col-md-1 control-label" style="text-align: right;margin-top: 5px">姓名:</label>
            <div class="col-md-2">
                <input type="text" class="form-control input-sm" id="xm"  placeholder=""
                      maxlength="15">
            </div>

           <%-- <label class="col-md-2 col-sm-12  control-label" style="margin-top: 5px;text-align: right;">身份证号：</label>
            <div class="col-md-3">
                <input type="text" class="form-control input-sm" id="sfzh"  placeholder=""
                       maxlength="18">
            </div>--%>

            <div style="display: none">
                <label class="col-md-1 control-label">登记人员：</label>
                <div class="col-md-2">
                    <select class="form-control input-sm" name="qyys" id="qyys">
                    </select>
                </div>
            </div>
            <div class="pull-right list-btnDiv" id="jhbgglList_btn">
                <button id="btn_query" class="btn btn-default btn-sm" style="margin-bottom: 5px;">
                    查询
                </button>
                <button class="btn btn-default btn-sm" id="btn_add" type="button" style="margin-bottom: 5px;">新增
                </button>
                <button id="export" class="btn btn-default btn-sm" style="display: none">
                    导出
                </button>
                <button id="more" class="btn btn-default btn-sm" style="display: none">
                    更多
                </button>
            </div>
        </div>
        <table id="table" class="table-container"></table>
    </div>
</div>

<script src="${basePath}/yyhpt/pages/jhbggl/jhbgglList.js" type="text/javascript"></script>
</body>
</html>