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
    <title>轮候安排列表</title>
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
                <div class="col-md-2" style="padding-top: 6px;">
                    <label><input id="currStreetCk" name="street" type="checkbox" value="0" checked/>本街镇 </label>
                    <label><input id="allStreetCk" name="street" type="checkbox" value="1"/>全区 </label>
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
            <%--<iframe id="" style="width: 100%; height: 100%">--%>
            <table id="lhapTable" class="table-container"></table>
            <%--</iframe>--%>
        </div>
    </form>
</div>
<script type="text/javascript">
    var globalParam = {};              //用于存放全局变量
    globalParam.$table = $('#lhapTable');
    var zhdjs = [];                     //照护等级[查询条件]

    $(function () {
        initSearchCase();
        initButtons();
        initLhapTable();
        wnform.addOnresize(globalParam.$table, tableStaus);
    });

    function initLhapTable() {
        // 先销毁表格
        globalParam.$table.bootstrapTable('destroy');
        // 初始化表格,动态从服务器加载数据
        globalParam.$table.bootstrapTable(
                {
                    classes: 'table table-hover warning',
                    method: "get", // 使用get请求到服务器获取数据
                    url: "yyhpt_lhgl.do?action=lhap_list", // 获取数据的Servlet地址
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
                    clickToSelect: true, // 是否启用点击选中行
                    showExport: true,
                    exportDataType: "basic",
                    minimumCountColumns: 2, // 最少允许的列数
                    responseHandler: function (res) {
                        console.info(res)
                        return res;
                    },
                    queryParamsType: "undefined",
                    showPaginationSwitch: false,
                    queryParams: function queryParams(params) { // 设置查询参数
                        getParam();
                        var param = {
                            currPage: params.pageNumber,
                            pageSize: params.pageSize,
                            zhdjs: zhdjs,
                            jbbs: globalParam.jbbs,
                            jgbm: globalParam.jgbm,
                            xm: globalParam.xm,
                            qybz: globalParam.qybz       //区域标志
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
                            checkbox: true,
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
        var qybz = '';

        var currStreetCk = $('#currStreetCk').prop("checked");
        var allStreetCk = $('#allStreetCk').prop("checked");

        if (currStreetCk && allStreetCk) {
            qybz = '';
            globalParam.jgbm = '';
        } else if (!currStreetCk && !allStreetCk) {
            globalParam.qybz = '';
            globalParam.jgbm = '';
        } else {
            if (currStreetCk) {                                             //本街镇
                qybz = '0';
                globalParam.jbbs = '';
                globalParam.jgbm = lhglGlobalVar.editRow.jgbm;
            } else if (allStreetCk) {                                       //全区
                qybz = '1';
                globalParam.jgbm = '';
            }
        }
        globalParam.xm = xm;
        globalParam.qybz = qybz;
        zhdjs = $('#zhdj').val();
    }

    function initButtons() {
        $('input[name="street"][type="checkbox"]').iCheck({
            checkboxClass: 'icheckbox_flat-wnred',
            radioClass: 'iradio_flat-wnred',
            increaseArea: '20%' // optional
        });

        $('#btn_query').click(function () {
            globalParam.$table.bootstrapTable("selectPage", 1);
            globalParam.$table.bootstrapTable("refresh");
            return false;
        });
        $('#lhap_save').click(function () {
            lhap_save();
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

    function lhap_save() {
        if (checkData) {
            doLhspSave();
        }
    }

    var checkData = function () {
        if (lhglGlobalVar.editRow.kcs <= 0) {
            wnform.toast("已无空余床位!");
            return false;
        }
        return true;
    }

    function doLhspSave() {
        var selectionsData = globalParam.$table.bootstrapTable('getSelections');
        if (selectionsData.length > 0) {
            $.ajax({
                url: 'yyhpt_lhgl.do?action=lhap_save',
                type: 'post',
                dataType: 'json',
                data: {selections: JSON.stringify(selectionsData)},
                success: function (data) {
                    wnform.toast(data.message);
                    globalParam.$table.bootstrapTable("refresh");
                },
                error: function () {
                    console.log('error!');
                },
                complete: function (data) {
                }
            });
        } else {
            wnform.toast('请选择安排人员!');
        }
    }

</script>
</body>
</html>
