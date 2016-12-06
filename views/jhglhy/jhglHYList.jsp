<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <link href="${basePath}/layouts/css/white/list_page.css" rel="stylesheet">
    <link href="layouts/css/white/list_select2.css" rel="stylesheet">
    <script src="frame/plugins/counterup/jquery.waypoints.min.js"></script>
    <script src="frame/plugins/counterup/jquery.counterup.js"></script>
    <script src="frame/scripts/wnform-control.js" type="text/javascript"></script>
</head>
<body>
<div class="panel-body">
    <form id="jhglListForm" method="post" class="form-horizontal list-font">
        <div class="row">
            <div class="col-lg-4 col-md-4" id="firstDiv">
                <div class="panel list-panel-border">
                    <div class="panel-heading list-panel-head">
                        <div class="row">
                            <div class="col-xs-2 col-md-2 panel-bg-turquoise list-title-left-col">
                                <span class="list-title">计划<br/>制定</span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col block-text-align" id="block1">
                                <span id="jhzdQuery" class="list-title-statu">
                                    <div class="block-one block-select">
                                        <span class="list-title-space list-title-turquoise counter"
                                              id="jhzdNum">0</span>
                                         <span>待制定</span>
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
                        <div class="row" id="dfpDiv">
                            <div class="col-xs-2 col-md-2 panel-bg-red list-title-left-col">
                                <span class="list-title">计划<br/>审核</span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col block-text-align" id="block2">
                                <span id="jhshQuery" class="list-title-statu">
                                    <div class="block-one">
                                        <span class="list-title-space list-title-red counter" id="jhshNum">0</span>
                                        待审核
                                    </div>
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4" id="thirdDiv">
                <div class="panel panel-box-border-three">
                    <div class="panel-heading list-panel-head">
                        <div class="row">
                            <div class="col-xs-2 col-md-2 panel-box-three list-title-left-col">
                                <span class="list-title">计划<br/>执行
                                </span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col block-text-align" id="block3">
                                <div class="col-md-6 col-xs-6 block-half-left">
                                    <span class="list-title-space list-title-statu counter" id="jhzxWzxNum">0</span> 待执行
                                </div>
                                <div class="col-md-6 col-xs-6 block-half-right">
                                    <span class="list-title-space list-title-statu counter" id="jhzxYzxNum">0</span> 已执行
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="rqlbDiv" class="panel panel-default">
            <div class="panel-heading" id="fwgl-title" style="font-size:16px;color:#434343;font-weight:bold;">
                <span class="glyphicon glyphicon-th"></span> 计划管理列表
            </div>

            <div class="form-group" style="margin:5px 0px 5px 0px;">
                <label class="col-md-1 control-label">姓名:</label>
                <div class="col-md-2">
                    <input type="text" class="form-control input-sm" id="xm" maxlength="15">
                </div>

                <%--<label class="col-md-1 control-label">身份证号：</label>
                <div class="col-md-3">
                    <input type="text" class="form-control input-sm" id="sfzh" maxlength="18">
                </div>--%>
                <label class="control-label col-md-1" style="padding-left: 15px;">计划类型：</label>
                <div class="col-md-2 ">
                    <select class="form-control input-sm" id="jhgljhlx" name="jhgljhlx">
                        <option value="3">--请选择--</option>
                        　　
                        <option value="0">全部</option>

                        　　
                        <option value="1">长期计划</option>

                        　　
                        <option value="2">临时计划</option>
                    </select>
                </div>

                <label class="col-md-1 control-label">状态：</label>
                <div class="col-md-2">
                    <select id="jhzt" class="form-control input-sm"></select>
                </div>
                <%--  <div style="display: none">
                      <label class="col-md-1 control-label">签约人员：</label>
                      <div class="col-md-3">
                          <select class="form-control input-sm" name="qyys" id="qyys">
                          </select>
                      </div>
                  </div>--%>
                <div class="pull-right" id="jhglList_btnDiv">
                    <button id="btn_query" class="btn btn-default btn-sm">
                        查询
                    </button>
                    <button id="export" class="btn btn-default btn-sm">
                        导出
                    </button>
                </div>
            </div>
            <table id="table" class="table-container"></table>
        </div>
    </form>
    <div id="toolbar"></div>
</div>
<script src="${basePath}/yyhpt/pages/jhglhy/jhglHYList.js" type="text/javascript"></script>
</body>
</html>