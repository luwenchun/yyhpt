<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <style type="text/css">
        .list-btn-style {
            border-radius: 5px;
            margin-top: 5px;
        }

        .list-title {
            color: #FFFFFF;
        }

        .fwgl-list-font {
            font-size: 14px;
        }

        .list-panel-head {
            padding: 0px 15px 0px 15px;
            border-bottom: 0px;
            /* height:70px; */
        }

        .list-title-left-col {
            padding: 14px 0px 14px 0px;
            text-align: center;
        }

        .list-title-middel-col {
            padding: 0px 0px 0px 10px;
        }

        .list-title-right-col {
            padding-left: 0px;
            padding-right: 8px;
        }

        .list-panel-border {
            border: 1px solid #21b7c6;
        }

        .list-title-num {
            font-size: 16px;
        }

        .list-title {
            color: #FFFFFF;
        }

        .list-title-space {
            margin-top: 10px;
        }

        .panel-bg-turquoise {
            background-color: #21b7c6;
        }

        .list-title-turquoise {
            color: #21b7c6;
        }

        .list-title-statu {
            color: #898989;
        }

        .list-title-link {
            margin-top: 10px;
            display: block;
            text-decoration: underline;
        }

        .panel-bg-red {
            background-color: #EB6841;
        }

        .list-title-red {
            color: #EB6841;
        }

        .panel-bg-gray {
            background-color: #626262;
        }

        .list-panel-border-red {
            border: 1px solid #EB6841;
        }

        .list-title-gray {
            color: #626262;
        }

        #rqlbDiv label {
            font-weight: normal;
        }

        .list-btnDiv {
            padding-right: 15px;
        }

        #firstDiv a:hover, a:active, a:focus {
            color: #21b7c6;
            text-decoration: none;
        }

        #secondDiv a:hover, a:active, a:focus {
            color: #EB6841;
            text-decoration: none;
        }
    </style>
</head>
<body>
<div class="panel-body">
    <form id="jhglListForm" method="post" class="form-horizontal">

        <!-- /.row -->
        <div id="jhglListItem" class="row">
            <div class="col-lg-4 col-md-4">
                <div class="panel panel-border-turquoise">
                    <div class="panel-heading" style="padding: 0px 15px 0px 15px;border-bottom: 0px;height:70px;">
                        <div class="row" id="jhzdDiv">
                            <div class="col-xs-2 col-md-2 panel-bg-turquoise"
                                 style="padding: 14px 0px 14px 0px;text-align:center;">
                                <strong style="color:#FFFFFF">变更<br/>申请</strong>
                            </div>
                            <div class="col-xs-5 col-md-5" style="padding: 0px 0px 0px 10px;">
                                <div style="margin-top:10px">
                                    <strong id="dbgsqNum">0</strong>
                                </div>
                                <h5 style="margin-top: 10px;color:#808080;">
                                    待申请
                                </h5>
                            </div>
                            <div class="col-xs-5 col-md-5 text-right">
                                <div style="margin-top:10px"><img src="${basePath}/yyhpt/pages/img/jhgl-jhzd.png"/>
                                </div>
                                <h5 style="margin-top: 10px;" title="点击查看详情">
                                    <a id="dbgsqQuery" href="#">
                                        <strong style="color:#00CED1">查看详情>></strong>
                                    </a>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4">
                <div class="panel panel-border-red">
                    <div class="panel-heading" style="padding: 0px 15px 0px 15px;border-bottom: 0px;height:70px;">
                        <div class="row" id="jhshDiv">
                            <div class="col-xs-2 col-md-2 panel-bg-red"
                                 style="padding: 14px 0px 14px 0px;text-align:center;">
                                <strong style="color:#FFFFFF">变更<br/>审核</strong>
                            </div>
                            <div class="col-xs-5 col-md-5" style="padding: 0px 0px 0px 10px;">
                                <div style="margin-top:10px">
                                    <strong id="dbgshNum">0</strong>
                                </div>
                                <h5 style="margin-top: 10px;color:#d17637;">
                                    待审核
                                </h5>
                            </div>
                            <div class="col-xs-5 col-md-5 text-right">
                                <div style="margin-top:10px"><img src="${basePath}/yyhpt/pages/img/jhgl-jhsh.png"/>
                                </div>
                                <h5 style="margin-top: 10px;" title="点击查看详情">
                                    <a id="dbgshQuery" href="#">
                                        <strong>查看详情>></strong>
                                    </a>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4">
                <div class="panel panel-border-black">
                    <div class="panel-heading" style="padding: 0px 15px 0px 15px;border-bottom: 0px;height:70px;">
                        <div class="row" id="jhzxDiv">
                            <div class="col-xs-2 col-md-2 panel-bg-black"
                                 style="padding: 14px 0px 14px 0px;text-align:center;">
                                <strong style="color:#FFFFFF">变更<br/>记录</strong>
                            </div>
                            <div class="col-xs-5 col-md-5" style="padding: 0px 0px 0px 10px;">
                                <div style="margin-top:10px;color:#808080;">
                                    <strong id="dbgjlNum">0</strong>
                                </div>
                                <h5 style="margin-top:10px;color:#808080;">
                                    待变更
                                </h5>
                            </div>
                            <div class="col-xs-5 col-md-5 text-right">
                                <div style="margin-top:10px"><img src="${basePath}/yyhpt/pages/img/jhgl-jhzx.png"/>
                                </div>
                                <h5 style="margin-top: 10px;" title="点击查看详情">
                                    <a id="dbgjlQuery" href="#">
                                        <strong>查看详情>></strong>
                                    </a>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="rqlbDiv" class="panel panel-default">
            <div class="panel-heading" id="fwgl-title" style="font-size:16px;color:#434343;font-weight:bold;">
                <span class="glyphicon glyphicon-th"></span> 计划变更管理列表
            </div>

            <div class="form-group" style="margin:10px 0px 10px 0px;">
                <label class="col-md-1 control-label">姓名:</label>
                <div class="col-md-2">
                    <input type="text" class="form-control input-sm" id="xm" maxlength="15">
                </div>

                <label class="col-md-2 control-label">身份证号：</label>
                <div class="col-md-2">
                    <input type="text" class="form-control input-sm" id="sfzh" maxlength="18">
                </div>

                <div style="display: none">
                    <label class="col-md-1 control-label">登记人员：</label>
                    <div class="col-md-3">
                        <select class="form-control input-sm" name="djry" id="djry">

                        </select>
                    </div>
                </div>
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

<script src="${basePath}/yyhpt/pages/jhbggl/jhbgglList.js" type="text/javascript"></script>
<style type="text/css">
    #jhglListForm {
        font-size: 15px;
    }

    #jhglListItem a {
        text-decoration: underline;
    }

    #jhglList_btnDiv {
        padding-right: 15px;
    }

    .panel-border-turquoise {
        border-color: #00CED1;
    }

    .panel-bg-turquoise {
        background-color: #00CED1;
    }

    #jhzdDiv a {
        color: #00CED1;
    }

    #jhzdDiv strong {
        color: #00CED1;
    }

    .panel-border-red {
        border-color: #EB6841;
    }

    .panel-bg-red {
        background-color: #EB6841;
    }

    #jhshDiv a {
        color: #EB6841;
    }

    #jhshDiv strong {
        color: #EB6841;
    }

    .panel-border-black {
        border-color: #000000;
    }

    .panel-bg-black {
        background-color: #000000;
    }

    #jhzxDiv a {
        color: #000000;
    }

    #jhzxDiv strong {
        color: #000000;
    }

    #rqlbDiv label {
        font-weight: normal;
    }
</style>
</body>
</html>