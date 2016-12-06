<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <link href="layouts/css/white/list_page.css" rel="stylesheet">
    <script src="frame/plugins/counterup/jquery.waypoints.min.js"></script>
    <script src="frame/plugins/counterup/jquery.counterup.js"></script>
</head>
<body>
<div class="panel-body">
    <form id="pgglListForm" method="post" class="form-horizontal fwgl-list-font">
        <div id="pgglListItem" class="row">
            <div class="col-lg-4 col-md-4" id="firstDiv">
                <div class="panel list-panel-border">
                    <div class="panel-heading list-panel-head">
                        <div class="row" id="xqsqDiv">
                            <div class="col-xs-2 col-md-2 panel-bg-turquoise list-title-left-col">
                                <span class="list-title">需求<br/>申请</span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col" id="xqsqBlock">
                                <div class="block-one block-select">
                                        <span class="list-title-space list-title-statu">
                                        <span id="wsqNum" class="list-title-turquoise counter">0</span>
                                        <span>待申请</span>
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
                        <div class="row" id="dcpgDiv">
                            <div class="col-xs-2 col-md-2 panel-bg-red list-title-left-col">
                                <span class="list-title">调查<br/>评估</span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col" id="dcpgBlock">
                                <div class="col-md-6 col-xs-6 block-half-left">
                                        <span class="list-title-space list-title-statu">
                                        <span id="wpgNum" class="list-title-red counter"
                                        >0</span>
                                        <span>待评估</span>
                                    </span></div>
                                <div class="col-md-6 col-xs-6 block-half-right"> 
                                   <span class="list-title-space list-title-statu">
                                        <span id="wpsNum" class="list-title-red counter"
                                        >0</span>
                                        <span>待评审</span>
                                    </span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4" id="thirdDiv">
                <div class="panel panel-box-border-three">
                    <div class="panel-heading list-panel-head">
                        <div class="row" id="jhzxDiv">
                            <div class="col-xs-2 col-md-2 panel-box-three list-title-left-col">
                                <span class="list-title">评估<br/>报告</span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col" id="pgbgBlock">
                                <div class="col-md-6 col-xs-6 block-half-left">
                                    <span class="list-title-space list-title-statu">
                                        <span id="wbgNum" class="list-title-gray counter">0</span>
                                        <span>待报告</span>
                                    </span>
                                </div>
                                <div class="col-md-6 col-xs-6 block-half-right">
                                    <span class="list-title-space list-title-statu">
                                        <span id="ybgNum" class="list-title-gray counter">0</span>
                                        <span>已报告</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="rqlbDiv" class="panel panel-default">
            <div class="panel-heading" style="font-size:16px;color:#434343;font-weight:bold;">
                <span class="glyphicon glyphicon-th"></span> 评估管理列表
            </div>

            <div class="form-group" style="margin:5px 0px 5px 0px;">
                <label class="col-md-1 control-label">姓名:</label>
                <div class="col-md-2">
                    <input type="text" class="form-control input-sm" id="xm" maxlength="15">
                </div>

                <label class="col-md-2 control-label">身份证号：</label>
                <div class="col-md-3">
                    <input type="text" class="form-control input-sm" id="sfzh" maxlength="18">
                </div>

                <div style="display: none">
                    <label class="col-md-1 control-label">登记人员：</label>
                    <div class="col-md-2">
                        <select class="form-control input-sm" name="djys" id="djys">

                        </select>
                    </div>
                </div>
                <div class="pull-right list-btnDiv" id="jhglList_btnDiv">
                    <button id="btn_query" class="btn btn-default btn-sm">
                        查询
                    </button>
                    <button id="btn_export" class="btn btn-default btn-sm">
                        导出
                    </button>
                    <button id="btn_more" class="btn btn-default btn-sm" style="display: none">
                        更多
                    </button>
                </div>
            </div>
            <table id="table" class="table-container"></table>
        </div>
    </form>
    <div id="toolbar"></div>
</div>
<script type="text/javascript">
    var lcdata = <%=pageContext.getRequest().getAttribute("lcdata")%>;
</script>
<script src="${basePath}/yyhpt/pages/pggl/pgglList.js" type="text/javascript"></script>
</body>
</html>