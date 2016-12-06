/*
 * Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
 */
var xm = "";
var sfzh = "";
$(function () {
    createSelectLb();
    initButtons();
    initHlqglTable();
});

function createSelectLb() {
    var nlShuttle = [{'id': '1', 'text': '60-69岁(含69岁)'}, {'id': '2', 'text': '大于等于70岁'}];
    createSelectByCZRYArray($("#nlfw_select"), nlShuttle, '1');//选择年龄区间

    // createSelectByCZRYArray($("#xbmc_select"), xblx, '1');
    createSelectByCZRYArray($("#yblb_select"), yblx, '2');
    // $("#xbmc_select").select2({language: 'zh-CN'});
    $("#nlfw_select").select2({language: 'zh-CN'});
    $("#yblb_select").select2({language: 'zh-CN'});
}

function initButtons() {
    //查询按钮事件
    $('#id_btn_query').on('click', function () {
        $('#hlqApplyPersonInfoTable').bootstrapTable("selectPage", 1);
        $('#hlqApplyPersonInfoTable').bootstrapTable("refresh");
    });
}

function initHlqglTable() {
    // 先销毁表格
    $('#hlqApplyPersonInfoTable').bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $('#hlqApplyPersonInfoTable').bootstrapTable({
        classes: 'table table-hover warning',
        method: "get", // 使用get请求到服务器获取数据
        url: "yyhpt_hlqgl.do?action=getHlqApplyPersonInfo", // 获取数据的Servlet地址
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
                sfzh: $("#id_identity").val(),
                nlfw: $("#nlfw_select").find("option:selected").val(),
                ylfyzffsdm: $("#yblb_select").find("option:selected").val()
            };
            return param;
        },
        columns: [
            {
                radio: true
            }, {
                title: '序号',
                formatter: function (value, row, index) {
                    return index + 1;
                },
                align: 'center'
            }, {
                field: 'XM',
                title: '&nbsp;&nbsp;&nbsp;姓名&nbsp;&nbsp;&nbsp;&nbsp;',
                align: 'center'
            }, {
                field: 'XBMC',
                title: '性别',
                align: 'center',
                visible: true
            },
            {
                field: 'NL',
                title: '年龄',
                align: 'center',
                visible: true
            },
            {
                field: 'GLDJMC',
                title: '照护等级',
                align: 'center'
            },
            {
                field: 'YLFYZFFSMC',
                title: '医保类型',
                align: 'center'
            },
            {
                field: 'LXDH',
                title: '联系电话',
                align: 'center',
                visible:false
            },
            {
                field: 'JZDZ',
                title: '居住地址',
                halign: 'center',
                align: 'left'
            }],
        onLoadSuccess: function (data) { // 加载成功时执行
            if (data.rows.length > 0) {
                $('#hlqApplyPersonInfoTable').bootstrapTable('check', 0);
            }
        },
        onLoadError: function () { // 加载失败时执行
        },
        onCheck: function (row) {
        },
        onUncheck: function (row) {
        }
    });
}