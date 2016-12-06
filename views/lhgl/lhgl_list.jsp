<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%--
  Created by IntelliJ IDEA.
  User: Mr.wang
  Date: 2016/10/14
  Time: 21:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>轮候管理主页面</title>
    <link href="layouts/css/white/list_page.css" rel="stylesheet">
</head>
<body>
<div class="panel-body">
    <form id="lhglListForm" method="post" class="form-horizontal fwgl-list-font">
        <div id="lhlbDiv" class="panel panel-default">
            <div class="panel-heading" style="font-size:16px;color:#434343;font-weight:bold;">
                <span class="glyphicon glyphicon-th"></span> 轮候管理列表
            </div>
            <div class="form-group" style="margin:15px 0px 15px 0px;">
                <table id="table" class="table-container"></table>
            </div>
        </div>
    </form>
    <div id="toolbar"></div>
</div>
<script type="text/javascript">
    var lhglGlobalVar = {};
    lhglGlobalVar.$table = $('#table');
    lhglGlobalVar.editRow = '';

    $(function () {
        initTable();
        wnform.addOnresize(lhglGlobalVar.$table, tableStaus);
    });

    function initTable() {
        // 先销毁表格
        lhglGlobalVar.$table.bootstrapTable('destroy');
        // 初始化表格,动态从服务器加载数据
        lhglGlobalVar.$table.bootstrapTable(
                {
                    classes: 'table table-hover warning',
                    method: "get", // 使用get请求到服务器获取数据
                    url: "yyhpt_lhgl.do?action=list", // 获取数据的Servlet地址
                    contentType: "application/json",
                    iconSize: 'sm',
                    showHeader: true,
                    striped: true, // 表格显示条纹
                    pagination: true, // 启动分页
                    pageSize: 12, // 每页显示的记录数
                    pageNumber: 1, // 当前第几页
                    pageList: [2], // 记录数可选列表
                    search: false, // 是否启用查询
                    showColumns: false, // 显示下拉框勾选要显示的列
                    showRefresh: false, // 显示刷新按钮
                    onlyInfoPagination: false,
                    sidePagination: "server", // 表示服务端请求
                    uniqueId: "YNGRBSH", // 每一行的唯一标识，一般为主键列
                    clickToSelect: false, // 是否启用点击选中行
                    showExport: true,
                    exportDataType: "basic",
                    minimumCountColumns: 2, // 最少允许的列数
                    responseHandler: function (res) {
                        console.info(res);
                        return res;
                    },
                    queryParamsType: "undefined",
                    showPaginationSwitch: false,
                    queryParams: function queryParams(params) { // 设置查询参数
                        var param = {
                            currPage: params.pageNumber,
                            pageSize: params.pageSize,
                        };
                        return param;
                    },
                    columns: [
                        {
                            field: 'jgmc',
                            title: '机构',
                            halign: 'center',
                            align: 'left'
                        },
                        {
                            field: 'zcs',
                            title: '养老总床位',
                            align: 'center',
                            visible: true
                        },
                        {
                            field: 'kcs',
                            title: '空闲养老床位',
                            align: 'center',
                            visible: true
                        },
                        {
                            field: 'lhrs',
                            title: '轮候人数',
                            align: 'center'
                        },
                        {
                            field: 'fbrq',
                            title: '发布日期',
                            align: 'center'
                        },
                        {
                            field: 'lhap',
                            title: '轮候安排',
                            events: operateEvents,
                            formatter: function (value, row, index) {
                                return '<a class="lhglToLhap" href="javascript:void(0)"> <img src="layouts/img/table/icon_del.png"> 安排<a/>';
                            },
                            align: 'center'
                        },
                        {
                            field: 'lhry',
                            title: '轮候人员',
                            events: operateEvents,
                            formatter: function (value, row, index) {
                                return '<a class="lhglToLhry" href="javascript:void(0)"> <img src="layouts/img/table/icon_right.png"> 查看<a/>';
                            },
                            align: 'center'
                        }],
                    onLoadSuccess: function () { // 加载成功时执行
                    },
                    onLoadError: function () { // 加载失败时执行
                    },
                    onCheck: function (row) {

                    },
                    onUncheck: function (row) {
                    }
                });
    }
    window.operateEvents = {
        'click .lhglToLhap': function (e, value, row, index) {
            loadLhapDetail(row, '轮候安排', value);
        },
        'click .lhglToLhry': function (e, value, row, index) {
            loadLhryDetail(row, '轮候人员', value);
        }
    };

    /**
     * 轮候安排
     * @param row
     * @param mtitle
     * @param value
     */
    function loadLhapDetail(row, mtitle, value) {
        lhglGlobalVar.editRow = row;
        BootstrapDialog.show({
            title: mtitle,
            size: BootstrapDialog.SIZE_BIG,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt_lhgl.do?action=init_lhap'),
            buttons: [
                {
                    label: '保存',
                    id: 'lhap_save',
                    cssClass: 'btn-default btn-sm',
                },
                {
                    label: '退出',
                    cssClass: 'btn-default btn-sm',
                    action: function (dialog) {
                        dialog.close();
                    }
                }],
            onshow: function (dialogRef) {
            },
            onshown: function (dialogRef) {
            },
            onhide: function (dialogRef) {
                lhglGlobalVar.$table.bootstrapTable("refresh");
            },
            onhidden: function (dialogRef) {
            }
        });
    }

    /**
     * 轮候人员
     * @param row
     * @param mtitle
     * @param value
     */
    function loadLhryDetail(row, mtitle, value) {
        lhglGlobalVar.editRow = row;
        BootstrapDialog.show({
            title: mtitle,
            size: BootstrapDialog.SIZE_BIG,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt_lhgl.do?action=init_lhry'),
            buttons: [
                {
                    label: '退出',
                    cssClass: 'btn-default btn-sm',
                    action: function (dialog) {
                        dialog.close();
                    }
                }
            ],
            onshow: function (dialogRef) {
            },
            onshown: function (dialogRef) {
            },
            onhide: function (dialogRef) {
                lhglGlobalVar.$table.bootstrapTable("refresh");
            },
            onhidden: function (dialogRef) {
            }
        });
    }
</script>
</body>
</html>
