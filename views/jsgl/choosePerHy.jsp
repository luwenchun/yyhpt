<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%--
  Created by IntelliJ IDEA.
  User: Mr.wang
  Date: 2016/11/3
  Time: 18:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>选择人员--合一</title>
</head>
<body>
<div class="panel-body">
    <div id="rqlbDiv" class="panel panel-default">
        <table id="chooseTab" class="table-container"></table>
    </div>
</div>
</body>
<script>
    var $chooseTable = $('#chooseTab');
    $(function () {
        initChooseTable(wholeVar.choosePerList);
        initChooseButtons();
    })
    function initChooseButtons() {
        $('#btn_confirmSelections').click(function () {
            wholeVar.selectionsData = $chooseTable.bootstrapTable('getSelections');
            wholeVar.chooseDialog.close();
            var chooseParams = {
                xm: $('#xm').val().trim(),
                yblbdm: $('#yblb').val(),
                yngrbsh: (wholeVar.selectionsData == undefined) ? '' : wholeVar.selectionsData[0].YNGRBSH,
                fwrygh: $('#fwry').val(),
                jszt: wholeVar.sJszt
            };
            getJsglList(chooseParams);
        })
    }


    function initChooseTable(datas) {
        // 先销毁表格
        $chooseTable.bootstrapTable('destroy');
        // 初始化表格,动态从服务器加载数据
        $chooseTable.bootstrapTable(
                {
                    classes: 'table table-hover warning',
                    method: "get", // 使用get请求到服务器获取数据
                    data: datas,
//                    height: 365,
                    height: typeof(data) == 'undefined' ? 66 : (data.length * 33 + 34 >= 330 ? 365 : data.length * 33 + 34),
                    contentType: "application/json",
                    iconSize: 'sm',
                    showHeader: true,
                    striped: true, // 表格显示条纹
                    search: false, // 是否启用查询
                    searchAlign: 'left',
                    showColumns: false, // 显示下拉框勾选要显示的列
                    showRefresh: false, // 显示刷新按钮
                    strictSearch: true,
                    searchOnEnterKey: true,
                    onlyInfoPagination: false,
                    sidePagination: "client", // 表示服务端请求
                    uniqueId: "XM", // 每一行的唯一标识，一般为主键列
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
                        var param = {};
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
                            title: '选择',
                            radio: true,

                        },
                        {
                            field: 'XM',
                            title: '姓名',
                            align: 'center'
                        }, {
                            field: 'YBLBMC',
                            title: '医保类型',
                            align: 'center'
                        },
                        {
                            field: 'SJHM',
                            title: '联系电话',
                            align: 'center'
                        },
                        {
                            field: 'JZDXXDZ',
                            title: '居住地址',
                            align: 'center'
                        }],
                    onLoadSuccess: function () { // 加载成功时执行
                    },
                    onLoadError: function () { // 加载失败时执行

                    },
                    onClickRow: function () {
                        initShowVar();
                        showOnClick();
                    },
                    onCheck: function (row) {
                    },
                    onUncheck: function (row) {
                    },
                    onCheckAll: function (rows) {
                    },
                    onUncheckAll: function (rows) {
                    }
                });
    }
</script>
</html>
