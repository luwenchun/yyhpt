<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <link href="layouts/css/white/list_page.css" rel="stylesheet">
    <style type="text/css">
        .choose-date {
            background: url("layouts/img/control/img_rl.png") no-repeat scroll right
            center transparent;
            cursor: pointer;
        }

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
    <form id="gapgListForm" method="post" onSubmit = "return false;" class="form-horizontal">
        <%--<div id="rqlbDiv" class="panel panel-default">
            <div class="panel-heading" id="fwgl-title" style="font-size:16px;color:#434343;font-weight:bold;">
                <span class="glyphicon glyphicon-th"></span>收案患者列表
            </div>

            <div class="form-group" style="margin:5px 0px 5px 0px;">
                <label class="col-md-1 control-label nopadding-left">姓名：</label>
                <div class="col-md-2">
                    <input type="text" class="form-control input-sm" id="xmSearch" placeholder="" maxlength="15">
                </div>

                <label class="col-md-1 control-label nopadding-left">筛查日期：</label>
                <div class="col-md-4" style="overflow:hidden">
                    <input type="text" class="input-sm form-control choose-date"
                           id="scksrq" name="scksrq" readonly="readonly" style="float:left;width:40%;background-color: white;">
                    <p class="list-search-p" style="float:left;width:20%;">至</p>
                    <input type="text" class="input-sm form-control choose-date"
                           id="scjsrq" name="scjsrq" readonly="readonly" style="float:left;width:40%;background-color: white;">
                </div>

                <div class="col-md-2" style="padding-top: 6px;">
                    <label><input id="wpgCk" name="pgZt" type="checkbox" value="0" />未评估 </label>
                    <label><input id="ypgCk" name="pgZt" type="checkbox" value="1" />已评估 </label>
                </div>


                <div class="pull-right list-btnDiv">
                    <button id="btn_query" class="btn btn-default btn-sm">
                        查询
                    </button>
                    <button id="btn_more" class="btn btn-default btn-sm">
                        更多
                    </button>
                </div>
            </div>
          &lt;%&ndash;  <div class="form-group" style="margin:5px 0px 5px 0px;">
                <label class="col-md-1 control-label">姓名:</label>
                <div class="col-md-1" style="left: 0px;width: 130px;">
                    <input type="text" class="form-control input-sm" id="xm" maxlength="15">
                </div>

                <label class="col-md-1 control-label" style="padding-left: 0px;">收案日期:</label>
                <div class="col-md-2" data-date-format="yyyy-mm-dd">
                    <input type="text" class="form-control input-sm form-control choose-date" id="ksrq" maxlength="18"  title="收案日期">
                </div>
                <label class="col-md-1 control-label" style="text-align: left;padding-left: 0px;">至:</label>
                <div class="col-md-2" style="right: 50px;" data-date-format="yyyy-mm-dd">
                    <input type="text" class="form-control input-sm form-control choose-date" id="jsrq" maxlength="18"  title="收案日期">
                </div>

                <label class="checkbox-inline" style="padding-top: 5px;padding-left: 0px;right: 40px;">
                    <input type="checkbox" class="rdZt" name="zt" id="wpg" value="" checked="">未评估
                </label>
                <label class="checkbox-inline" style="padding-top: 5px;padding-left: 0px;right: 30px;">
                    <input type="checkbox" class="rdZt" name="zt" id="ypg" value="" checked="">已评估
                </label>

                <div class="pull-right" id="jhglList_btnDiv">
                    <button id="btn_query" class="btn btn-default btn-sm">
                        查询
                    </button>
                    <button id="more" class="btn btn-default btn-sm">
                        更多
                    </button>
                </div>

                <div id="more_search_div" class="form-group" style="margin:0px 0px 5px 0px;display:none;">
                    <label class="col-md-1 control-label">病区：</label>
                    <div class="col-md-2">
                        <select class="form-control input-sm" name="bqmc" id="bqdm">

                        </select>
                    </div>

                    <label class="col-md-1 control-label">科室：</label>
                    <div class="col-md-2">
                        <select class="form-control input-sm" name="ksmc" id="ksdm">

                        </select>
                    </div>
                </div>
&lt;%&ndash;                <div class="form-group col-md-12" id="gapg_bqks" style="margin:5px 0px 5px 0px;display: none">
                    <label class="control-label col-md-1" style="text-align: center;padding-left: 30px;">病区:</label>
                    <div class="col-md-2 " style="padding-left: 3px;padding-right: 32px;">
                        <select class="form-control input-sm" id="gapgbq" name="gapgbq" onchange="selectBqChanged()">
                        </select>
                    </div>
                    <label class="control-label col-md-1" style="padding-left: 0px;right: 60px;">科室:</label>
                    <div class="col-md-2 " style="right: 55px;padding-right: 10px;padding-left: 10px;">
                        <select class="form-control input-sm" id="gapgks" name="gapgks" onchange="selectKsChanged()">
                        </select>
                    </div>
                </div>&ndash;%&gt;
            </div>&ndash;%&gt;
            <table id="gapgTable" class="table-container"></table>
        </div>--%>

        <div id="rqlbDiv" class="panel panel-default">
            <div class="panel-heading" id="list-title" style="font-size:16px;color:#434343;font-weight:bold;">
                <span class="glyphicon glyphicon-th"></span> 收案患者列表
            </div>

            <div class="form-group" style="margin:5px 0px 5px 0px;">
                <label class="col-md-1 control-label nopadding-left">姓名：</label>
                <div class="col-md-2">
                    <input type="text" class="form-control input-sm" id="xmSearch" placeholder="" maxlength="15">
                </div>

                <label class="col-md-1 control-label nopadding-left">收案日期：</label>
                <div class="col-md-4" style="overflow:hidden">
                    <input type="text" class="input-sm form-control choose-date"
                           id="scksrq" name="scksrq" readonly="readonly" style="float:left;width:40%;background-color: white;">
                    <p class="list-search-p" style="float:left;width:20%;">至</p>
                    <%--<p class="list-search-p" style="float:left;width:20%;">至</p>--%>
                    <input type="text" class="input-sm form-control choose-date"
                           id="scjsrq" name="scjsrq" readonly="readonly" style="float:left;width:40%;background-color: white;">
                </div>

                <div class="col-md-2" style="padding-top: 6px;">
                    <label><input id="wpgCk" name="pgZt" type="checkbox" value="0" />未评估 </label>
                    <label><input id="ypgCk" name="pgZt" type="checkbox" value="1" />已评估 </label>
                </div>


                <div class="pull-right list-btnDiv">
                    <button id="btn_query" class="btn btn-default btn-sm">
                        查询
                    </button>
                    <button id="btn_more" class="btn btn-default btn-sm">
                        更多
                    </button>
                </div>
            </div>
            <div id="more_search_div" class="form-group" style="margin:0px 0px 5px 0px;display:none;">
                <label class="col-md-1 control-label">病区：</label>
                <div class="col-md-2">
                    <select class="form-control input-sm" name="bqmc" id="bqdm" style="width: 100%">

                    </select>
                </div>

                <label class="col-md-1 control-label">科室：</label>
                <div class="col-md-2">
                    <select class="form-control input-sm" name="ksmc" id="ksdm" style="width: 100%">

                    </select>
                </div>
            </div>
            <table id="gapgTable" class="table-container"></table>
        </div>
    </form>
    <div id="toolbar"></div>
</div>

<script src="yyhpt/pages/gapg/gapgList.js" type="text/javascript"></script>
<style type="text/css">
    #gapgListForm {
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

    #rqlbDiv label {
        font-weight: normal;
    }
</style>
</body>
</html>