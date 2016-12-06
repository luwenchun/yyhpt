<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%--
  Created by IntelliJ IDEA.
  User: Edward
  Date: 2016/08/02
  Time: 14:25
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>结算管理</title>
    <style type="text/css">
        .aaa {
            width: 100%;
            height: 416px;
        }

        .img {
            width: 100%;
            height: 100%;
            min-width: 247px;
            min-height: 186px;
        }
    </style>
</head>
<body>
<div class="panel-body">
    <form id="id_jsgl_list_form" method="post" class="form-horizontal aaa">
        <div id="rqlbDiv" class="panel panel-default">
            <img class="img" id="1" onclick="clickImg(this)" src="layouts/img/menu/icon_jsgl_lst.png">
        </div>
    </form>
</div>

<script type="text/javascript">
    function clickImg(a) {
        BootstrapDialog.show({
            title: '服务项目明细',
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/jsgl/jsgl_fwxmmx.jsp'),
            buttons: [
                {
                    label: '退出', cssClass: 'btn-default btn-sm',
                    action: function (dialogItself) {
                        dialogItself.close();
                    }
                }],
            onshow: function (dialogRef) {
                dialoging = dialogRef;
            },
            onshown: function (dialogRef) {
            },
            onhidden: function (dialogRef) {
            }
        });
    }
</script>
</body>

</html>
<%--<html>
<head>
    <title>结算管理</title>
    <style type="text/css">
        .radio-container {
            padding-left: 8px;
        }

        .head-title {
            margin-top: 0px;
            margin-bottom: 0px;
            font-weight: bold;
            font-size: 17px;
            color: #000000;
        }

        .choose-date {
            background: url("layouts/img/control/img_rl.png") no-repeat scroll right center transparent;
            cursor: pointer;
        }

        .title {
            /*font-weight: bold;*/
            /*font-size: 15px;*/
        }

        .title-value {
            /*font-weight: bold;*/
            /*font-size: 15px;*/
            color: #FF0000;
        }
    </style>
</head>
<body>

<div class="panel-body">
    <form id="id_jsgl_list_form" method="post" class="form-horizontal">
        <div id="rqlbDiv" class="panel panel-default">
            <div class="panel-heading">
                <h3 style="margin-top: 0; margin-bottom: 0;color:#434343; font-weight: bold; font-size: 16px;font-family: 'Microsoft YaHei'">
                    <span class="glyphicon glyphicon-th"></span> 结算管理列表
                </h3>
            </div>

            <div class="form-group" style="margin: 5px 0 5px 0;">
                <button class="btn btn-default btn-sm pull-left" id="id_add" type="button" style="margin-bottom: 5px;">新增
                </button>
                <label class="col-md-offset-1 col-md-1 control-label" style="">姓名:</label>
                <div class="col-md-2">
                    <input type="text" class="form-control input-sm" id="xm"
                           placeholder="" maxlength="15">
                </div>

              &lt;%&ndash;  <label class="col-md-2 control-label" style="text-align: right;">身份证号：</label>
                <div class="col-md-3">
                    <input type="text" class="form-control input-sm" id="sfzh"
                           placeholder="" maxlength="18">
                </div>&ndash;%&gt;

                <div style="display: none">
                    <label class="col-md-1 control-label">登记人员：</label>
                    <div class="col-md-2">
                        <select class="form-control input-sm" name="qyys" id="qyys">
                        </select>
                    </div>
                </div>
                <div class="pull-right list-btnDiv" id="rwglList_btnDiv">
                    <button id="btn_query" class="btn btn-default btn-sm">
                        查询
                    </button>
                    <button id="export" class="btn btn-default btn-sm">
                        导出
                    </button>
                    <button id="more" class="btn btn-default btn-sm" style="display: none">
                        更多
                    </button>
                </div>
            </div>
            <hr style="padding-bottom: 0; margin-top: -5px;">
            <div>
                <div class="col-md-11">
                    <div class="col-md-5">
                        <div class="title col-md-4">服务次数：</div>
                        <div class="title-value col-md-2">4次</div>
                        <div class="title col-md-3">总金额：</div>
                        <div class="title-value col-md-3">320.00元</div>
                    </div>

                    <div class="col-md-4">
                        <div class="title col-md-5">护理券抵扣：</div>
                        <div class="title-value col-md-7">280.00元（余额220元）</div>
                    </div>
                    <div class="col-md-3">
                        <div class="title col-md-7">实收金额：</div>
                        <div class="title-value col-md-5">40.00元</div>
                    </div>
                </div>
                <div class="col-md-1" style="margin-bottom: 8px">
                    <button class="btn btn-default btn-sm" type="button">结算</button>
                </div>
            </div>
            <table id="table" class="table-container"></table>
        </div>
    </form>
    <div id="toolbar"></div>
</div>
<script type="text/javascript">
    var table = $('#table');
    $(function () {

        initButtons();
        initTable();
    });

    function initButtons() {

        $('#export').on('click', function () {
            table.tableExport({type: 'excel', escape: 'false'});
            return false;
        });

        $('#btn_query').on('click', function () {
            table.bootstrapTable("selectPage", 1);
            table.bootstrapTable("refresh");
            return false;
        });
    }

    function initTable() {
        // 先销毁表格
        table.bootstrapTable('destroy');
        // 初始化表格,动态从服务器加载数据
        table.bootstrapTable(
                {
                    classes: 'table table-hover warning',
                    method: "get", // 使用get请求到服务器获取数据
                    url: "personal_info.do?action=info_query", // 获取数据的Servlet地址
                    contentType: "application/json",
                    iconSize: 'sm',
                    showHeader: true,
                    striped: true, // 表格显示条纹
                    pagination: true, // 启动分页
                    pageSize: 10, // 每页显示的记录数
                    pageNumber: 1, // 当前第几页
                    pageList: [2], // 记录数可选列表
                    search: false, // 是否启用查询
                    showColumns: false, // 显示下拉框勾选要显示的列
                    showRefresh: false, // 显示刷新按钮
                    onlyInfoPagination: false,
                    sidePagination: "server", // 表示服务端请求
                    uniqueId: "sfzh", // 每一行的唯一标识，一般为主键列
                    clickToSelect: true, // 是否启用点击选中行
                    showExport: true,
                    exportDataType: "basic",
                    minimumCountColumns: 2, // 最少允许的列数
                    responseHandler: function (res) {
                        return res;
                    },
                    queryParamsType: "undefined",
                    showPaginationSwitch: false,
                    queryParams: function queryParams(params) { // 设置查询参数
                        var param = {
                            currPage: params.pageNumber,
                            pageSize: params.pageSize,
                            xm: $("#xm").val(),
                            sfzh: $("#sfzh").val(),
                            qyysbm: $("#qyys").val()
                        };
                        return param;
                    },
                    columns: [
                        {
                            title: '序号',
                            formatter: function (value, row, index) {
                                return index + 1;
                            },
                            align: 'center'
                        },
                        {
                            field: 'xm',
                            title: '姓名',
                            align: 'center'
                        },{
                            field: 'xbmc',
                            title: '性别',
                            align: 'center'
                        },
                        {
                            field: 'nl',
                            title: '年龄',
                            align: 'center'
                        },
                        {
                            field: 'sfzh',
                            title: '身份证号',
                            formatter: function (value, row, index) {
                                if (value != undefined && value != null) {
                                    if (value.length == 18) {
                                        return value.substr(0, 3) + '*********' + value.substr(12, 6);
                                    } else if (value.length == 15) {
                                        return value.substr(0, 3) + '******' + value.substr(9, 6);
                                    } else {
                                        return value;
                                    }
                                }
                            },
                            align: 'center'
                        },
                        {
                            field: 'sjhm',
                            title: '联系电话',
                            align: 'center'
                        },
                        {
                            field: 'xt_djsj',
                            title: '登记时间',
                            align: 'center'
                        },
                        {
                            field: 'sjly',
                            title: '信息来源',
                            align: 'center',
                            formatter: function (value) {
                                if (value != undefined && value != null) {
                                    if (value == '01') {
                                        return '登记';

                                    } else if (value == '02') {
                                        return '导入';
                                    } else {
                                        return '筛查'
                                    }
                                }
                            }
                        },
                        {
                            title: '查看详情',
                            align: 'center',
                            events: {
                                'click .edit_info': function (e, value, row, index) {
                                    getPersonInfo('edit', row);
                                }
                            },
                            formatter: function (value, row, index) {
                                return '<a class="edit_info" href="javascript:void(0)"><img src="layouts/img/table/icon_right.png"> 详情</a>';
                            }
                        },
                        {
                            field: 'jzdxxdz',
                            title: '居住地址'
                        }],
                    onLoadSuccess: function () { // 加载成功时执行
                        wnform.addOnresize(table, false);
                    },
                    onLoadError: function () { // 加载失败时执行

                    },
                    onCheck: function (row) {
                        $("#remove").attr("disabled", false);
                    },
                    onUncheck: function (row) {
                    }
                });
    }
</script>
</body>
</html>--%>
