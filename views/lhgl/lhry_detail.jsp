<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%--
  Created by IntelliJ IDEA.
  User: Mr.wang
  Date: 2016/10/14
  Time: 21:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>轮候人员</title>
    <link href="layouts/css/white/list_page.css" rel="stylesheet">
    <link href="layouts/css/white/list_select2.css" rel="stylesheet">
</head>
<body>
<div class="panel-body">
    <form id="lhryListForm" method="post" class="form-horizontal fwgl-list-font">
        <div id="lrlbDiv" class="panel panel-default">
            <div class="form-group" style="margin:5px 0px 5px 0px;">
                <label class="col-md-1 control-label">姓名:</label>
                <div class="col-md-2">
                    <input type="text" class="form-control input-sm" id="xm"
                           maxlength="15">
                </div>
                <label class="col-md-2 control-label">照护等级：</label>
                <div class="col-md-3">
                    <select id="zhdj" class="form-control input-sm"></select>
                </div>
                <div class="col-md-3" style="padding-top: 6px;">
                    <label><input id="waitingCk" name="lhzt" type="checkbox" value="0" checked/>轮候中 </label>
                    <label><input id="checkInCk" name="lhzt" type="checkbox" value="1" checked/>已入住 </label>
                </div>

                <div style="display: none">
                    <label class="col-md-1 control-label">登记人员：</label>
                    <div class="col-md-2">
                        <select class="form-control input-sm" name="djys" id="djys">

                        </select>
                    </div>
                </div>
                <div class="pull-right list-btnDiv" id="jhglList_btnDiv">
                    <button id="btn_query" class="btn btn-default btn-sm">查询
                    </button>
                </div>
            </div>
            <table id="lhryTable" class="table-container"></table>
        </div>
    </form>
</div>
<script type="text/javascript">
    var globalParam = {};                                   //用于存放全局变量
    globalParam.$table = $('#lhryTable');
    var zhdjs = [];                                         //照护等级[查询条件]

    $(function () {
        initSearchCase();
        initButtons()
        initLhryTable();
        wnform.addOnresize(globalParam.$table, tableStaus);
        wn.iCheckInit();
    });

    function initLhryTable() {
        // 先销毁表格
        globalParam.$table.bootstrapTable('destroy');
        // 初始化表格,动态从服务器加载数据
        globalParam.$table.bootstrapTable(
                {
                    classes: 'table table-hover warning',
                    method: "get", // 使用get请求到服务器获取数据
                    url: "yyhpt_lhgl.do?action=lhry_list", // 获取数据的Servlet地址
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
                        getParam(params);
                        var param = {
                            currPage: params.pageNumber,
                            pageSize: params.pageSize,
                            zhdjs: zhdjs,
                            jbbs: globalParam.jbbs,
                            jgbm: globalParam.jgbm,
                            xm: globalParam.xm,
                            lhzt: globalParam.lhzt,             //轮候状态
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
                        },
                        {
                            field: 'xb',
                            title: '性别',
                            align: 'center'
                        },
                        {
                            field: 'nl',
                            title: '年龄',
                            align: 'center'
                        },
                        {
                            field: 'zhdj',
                            title: '照护等级',
                            align: 'center'
                        },
                        {
                            field: 'hjdz',
                            title: '户籍地址',
                            halign: 'center',
                            align: 'left'
                        },
                        {
                            field: 'jzdz',
                            title: '居住地址',
                            halign: 'center',
                            align: 'left'
                        },
                        {
                            field: 'dlsj',
                            title: '队列时间',
                            align: 'center'
                        },
                        {
                            field: 'zpw',
                            title: '总排位',
                            cellStyle: function (row, index) {
                                return {
                                    classes: 'rank-show-css',
                                };
                            },
                            align: 'center'
                        },
                        {
                            field: 'dlxh',
                            title: '通道排位',
                            cellStyle: function (row, index) {
                                return {
                                    classes: 'rank-show-css',
                                };
                            },
                            formatter: function (value, row, index) {
                                switch (row.tdlx) {
                                    case 'a':
                                        return '特殊通道' + value.toUpperCase() + '号';
                                    case 'b':
                                        return '优先通道' + value.toUpperCase() + '号';
                                    case 'c':
                                        return '普通通道' + value.toUpperCase()+ '号';
                                }
                            },
                            align: 'center'
                        },
                        {
                            field: 'lhzt',
                            title: '状态',
                            formatter: function (value, row, index) {
                                switch (value) {
                                    case '0':
                                        return '轮候中';
                                    case '1':
                                        return '已入住';
                                }

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

    function getParam() {
        var xm = $('#xm').val().trim();
        var lhzt = '';

        var waitingCk = $('#waitingCk').prop("checked");
        var checkInCk = $('#checkInCk').prop("checked");

        if (waitingCk && checkInCk) {
            lhzt = '';
        } else if (!waitingCk && !checkInCk) {
            lhzt = '';
        } else {
            if (waitingCk) {                                              //轮候中
                lhzt = '0';
            } else if (checkInCk) {                                       //已入住
                lhzt = '1';
            } else {
                lhzt = '1';
            }
        }

        globalParam.xm = xm;
        globalParam.lhzt = lhzt;
        globalParam.jgbm = lhglGlobalVar.editRow.jgbm;
        globalParam.jbbs = lhglGlobalVar.editRow.jbbs;
        zhdjs = $('#zhdj').val();
    }
    function initButtons() {
        $('#btn_query').click(function () {
            globalParam.$table.bootstrapTable("selectPage", 1);
            globalParam.$table.bootstrapTable("refresh");
            return false;
        });
    }

    function initSearchCase() {
        $.ajax({
            url: 'common.do?action=getZhdj',
            dataType: 'json',
            type: 'post',
            data: {},
            success: function (data) {
                if (data) {
                    $('#zhdj').select2({
                        language: 'zh-CN',
                        placeholder: "请选择查询照护等级",
                        multiple: true,
                        data: data
                    });
                }
            }
        });
    }
</script>
</body>
</html>
