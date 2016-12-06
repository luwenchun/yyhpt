<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>团队维护</title>
    <link rel="stylesheet" href="frame/plugins/treegrid/css/jquery.treegrid.css">
    <script type="text/javascript" src="frame/plugins/treegrid/js/jquery.treegrid.js"></script>
    <script type="text/javascript" src="frame/plugins/treegrid/js/jquery.treegrid.bootstrap3.js"></script>
</head>
<body>
<div class="panel-body">
    <div class="panel panel-default">
        <div class="panel-heading" style="font-size:16px;color:#434343;font-weight:bold;">
            <span class="glyphicon glyphicon-th"></span> 团队维护
        </div>
        <div>
            <div class="row" style="margin:5px 0px 5px 0px;">
                <button class="btn btn-default btn-sm" id="id_btn_add" type="button">新增</button>
                <button class="btn btn-default btn-sm" id="id_btn_edit" type="button">修改</button>
                <button class="btn btn-default btn-sm" id="id_btn_del" type="button">删除</button>
                <button class="btn btn-default btn-sm" id="id_btn_refresh" type="button">刷新</button>
                <button class="btn btn-default btn-sm" id="id_btn_members" type="button">成员管理</button>
                <button class="btn btn-default btn-sm" id="id_btn_service_area" type="button">管辖范围</button>
                <button class="btn btn-default btn-sm" id="id_btn_close" type="button">关闭</button>
            </div>
            <div class="row" id="id_tables_container">
                <div class="col-md-4" id="id_left">
                    <table class="tree table table-hover warning" id="id_grid_tree" border="0">
                        <thead>
                        <tr>
                            <th style="text-align: center; " data-field="0" tabindex="0">
                                <div class="th-inner ">团队名称</div>
                                <div class="fht-cell"></div>
                            </th>
                            <th style="text-align: center; " data-field="xm" tabindex="0">
                                <div class="th-inner ">负责人</div>
                                <div class="fht-cell"></div>
                            </th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div class="col-md-8" id="id_right">
                    <div id="id_table_top"></div>
                    <div id="id_table_bottom"></div>
                </div>
            </div>
        </div>

    </div>
</div>
<script>
    $(function () {
        initTable();
    });
    function initTable() {
        var $tableTop = $('#id_table_top'), $tableBottom = $('#id_table_bottom'), $treeGrid = $('#id_grid_tree');
        $tableTop.bootstrapTable('destroy');
        $tableTop.bootstrapTable(
                {
                    classes: 'table table-hover warning',
                    method: "get", // 使用get请求到服务器获取数据
                    url: "yyhpt_zzgl.do?action=get_list", // 获取数据的Servlet地址
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
                            sfzh: $("#sfzh").val()
                        };
                        return param;
                    },
                    columns: [
                        {
                            title: '成员代码',
                            formatter: function (value, row, index) {
                                return index + 1;
                            },
                            align: 'center'
                        },
                        {
                            field: 'xm',
                            title: '成员姓名',
                            align: 'center'
                        },

                        {
                            field: 'lxdh',
                            title: '联系电话',
                            align: 'center'
                        },

                        {
                            field: 'sqrq',
                            title: '负责人',
                            align: 'center',
                        }, {
                            field: 'shrq',
                            title: '拥有资质',
                            align: 'center',
                        }, {
                            field: 'jcrq',
                            title: '所属团队',
                            align: 'center',
                        }
                    ],
                    onLoadSuccess: function () { // 加载成功时执行
                        wnform.addOnresize($tableTop, false);
                    },
                    onLoadError: function () { // 加载失败时执行
                    },
                    onCheck: function (row) {
                    },
                    onUncheck: function (row) {
                    }
                });

        /*
         $tableBottom.bootstrapTable('destroy');
         $tableBottom.bootstrapTable(
         {
         classes: 'table table-hover warning',
         method: "get", // 使用get请求到服务器获取数据
         url: "yyhpt_zzgl.do?action=get_list", // 获取数据的Servlet地址
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
         sfzh: $("#sfzh").val()
         };
         return param;
         },
         columns: [
         {
         title: '居委编码',
         formatter: function (value, row, index) {
         return index + 1;
         },
         align: 'center'
         },
         {
         field: 'xm',
         title: '居委名称',
         align: 'center'
         },

         {
         field: 'lxdh',
         title: '所属团队',
         align: 'center'
         }
         ],
         onLoadSuccess: function () { // 加载成功时执行
         wnform.addOnresize($tableBottom, false);
         },
         onLoadError: function () { // 加载失败时执行
         },
         onCheck: function (row) {
         },
         onUncheck: function (row) {
         }
         });
         */

        var res = [
            {
                "JGBM": "0123",
                "SJTDDM": null,
                "SJTDMC": null,
                "NF": "2016",
                "TDDM": "0",
                "TDMC": "安亭社区服务中心",
                "FZRBM": null,
                "FZRXM": "领导",
                "LXDH": null,
                "YYZZ": null,
                "GDBZ": null,
                "YSJDBZ": null
            },
            {
                "JGBM": "0123",
                "SJTDDM": "0",
                "SJTDMC": "安亭社区服务中心",
                "NF": "2016",
                "TDDM": "1",
                "TDMC": "许加明工作室",
                "FZRBM": null,
                "FZRXM": "许加明",
                "LXDH": null,
                "YYZZ": null,
                "GDBZ": null,
                "YSJDBZ": null
            },
            {
                "JGBM": "0123",
                "SJTDDM": "1",
                "SJTDMC": "安亭社区服务中心",
                "NF": "2016",
                "TDDM": "3",
                "TDMC": "尤诚刚工作室",
                "FZRBM": null,
                "FZRXM": "尤诚刚",
                "LXDH": null,
                "YYZZ": null,
                "GDBZ": null,
                "YSJDBZ": null
            },
            {
                "JGBM": "0123",
                "SJTDDM": "3",
                "SJTDMC": "安亭社区服务中心",
                "NF": "2016",
                "TDDM": "4",
                "TDMC": "钟伟工作室",
                "FZRBM": null,
                "FZRXM": "钟伟",
                "LXDH": null,
                "YYZZ": null,
                "GDBZ": null,
                "YSJDBZ": null
            }
        ];
        $.each(res, function (k, v) {
            var tr = '<tr class="treegrid-' + v.TDDM +
                    (v.SJTDDM ? (' treegrid-parent-' + v.SJTDDM) : '')
                    + '">' +
                    '<td>' + v.TDMC + '</td><td>' + v.FZRXM + '</td></tr>';
            $treeGrid.append(tr);
        });

        $treeGrid.treegrid({
            expanderExpandedClass: 'glyphicon glyphicon-minus',
            expanderCollapsedClass: 'glyphicon glyphicon-plus'
        }).treegrid('getRootNodes').on('change', function () {
            console.log(this);
        });


    }
</script>
</body>
</html>
