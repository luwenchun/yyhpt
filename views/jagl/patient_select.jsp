<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%--
  Created by IntelliJ IDEA.
  User: Edward
  Date: 2016/08/24
  Time: 16:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>患者选择</title>
</head>
<body>
<div class="panel-body" style="font-size: 13px;">
    <div class="form-group">
        <label class="col-md-1 control-label">姓名</label>
        <div class="col-md-3">
            <input type="text" class="form-control input-sm" id="id_name"
                   maxlength="15">
        </div>

       <%-- <label class="col-md-2 control-label">身份证号</label>
        <div class="col-md-4">
            <input type="text" class="form-control input-sm" id="id_identity"
                   maxlength="18">
        </div>--%>
        <button id="id_btn_query" class="btn btn-default btn-sm pull-right" style="margin-bottom: 5px">查询</button>
    </div>

</div>

<div class="form-group">
    <div class="form-group col-md-12 no-padding">
        <table id="table_patient" class="table-container"></table>
    </div>
</div>
<br>

<script>
    var table_patient = $('#table_patient');
    $(function () {
        initButtons();
        initTable();
    });

    function initButtons() {
        $('#id_btn_query').on('click', function () {
            table_patient.bootstrapTable("selectPage", 1);
            table_patient.bootstrapTable("refresh");
        });
    }
    function initTable() {
        table_patient.bootstrapTable(
                {
                    classes: 'table table-hover warning',
                    method: "get", // 使用get请求到服务器获取数据
                    url: "yyhpt_jagl.do?action=select_person", // 获取数据的Servlet地址
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
                    uniqueId: "djlsh", // 每一行的唯一标识，一般为主键列
                    clickToSelect: true, // 是否启用点击选中行
                    showExport: true,
                    exportDataType: "basic",
                    minimumCountColumns: 2, // 最少允许的列数
                    responseHandler: function (res) {
                        dictData = res.dict;
                        return res;
                    },
                    queryParamsType: "undefined",
                    showPaginationSwitch: false,
                    queryParams: function queryParams(params) { // 设置查询参数
                        var param = {
                            currPage: params.pageNumber,
                            pageSize: params.pageSize,
                            xm: $("#id_name").val(),
                            sfzh: $("#id_identity").val()
                        };
                        return param;
                    },
                    columns: [
                        {
                            radio: true
                        },
                        {
                            field: 'xm',
                            title: '姓名',
                            align: 'center'
                        },
                        {
                            field: 'nl',
                            title: '年龄',
                            align: 'center',
                            visible: false
                        },
                        {
                            field: 'sfzh',
                            title: '身份证号',
                            formatter: function (value, row, index) {
                                if (value != undefined) {
                                    if (value.length == 18) {
                                        return value.substr(0, 3)
                                                + '*********'
                                                + value.substr(12, 6);
                                    } else if (value.length == 15) {
                                        return value.substr(0, 3)
                                                + '******'
                                                + value.substr(9, 6);
                                    } else {
                                        return value;
                                    }
                                }
                            },
                            align: 'center'
                        },
                        {
                            field: 'lxdh',
                            title: '联系电话',
                            align: 'center'
                        }
                    ],
                    onLoadSuccess: function (res) {
                        if (res.rows.length > 0) {
                            table_patient.bootstrapTable('check', 0);
                        }
                    },
                    onLoadError: function () {

                    },
                    onCheck: function (row) {
                    },
                    onUncheck: function (row) {
                    }
                });
    }
</script>
</body>
</html>
