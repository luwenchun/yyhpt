/*
 * Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
 */

var objData = "";
var testObjData = "";
var objXmInfo = "";

$(function () {
    $.ajax({
        url: 'yyhptRwglFwglhy.do?action=getFwdjAddFwxmlb',
        type: 'get',
        dataType: 'json',
        data: {jhlsh: jhlsh},
        success: function (data) {
            objXmInfo = data;


            initFwxmAddTable();
            if ($('#fwxmtable').find('tbody').find('tr').find('td').text() == '没有找到记录') {
                $('#fwxmtable').find('tbody').find('tr').find('td').text('服务包外项目已经添加完！');
            }
        }
    });

});

$(function () {
    $("#surehh").bind("click", function () {
        var rows = $('#fwxmtable').bootstrapTable('getSelections');
        if (rows == "" || rows.length == 0) {
            BootstrapDialog.show({
                title: '提示信息',
                message: '没有选择数据!',
                buttons: [{
                    label: '确定',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });
        } else {
            var xminfo = "";
            if (rows.length != 0) {
                for (var l = 0; l < rows.length; l++) {
                    var row = rows[l];
                    for (var n = 0; n < obj.rows.length; n++) {
                        if (obj.rows[n].FWXMDM == row.FWXMDM) {
                            obj.rows = removeElement(obj.rows, n);//删除方法
                            xminfo += row.FWXMDM + ",";
                        }
                    }
                }
            }
            var xminfos = [];
            xminfos = xminfo.split(",");
            xminfos = unique(xminfos);
            if (xminfos.length - 1 > 0) {
                BootstrapDialog.show({
                    title: '提示信息',
                    message: '有重复项目，已经为您自动过滤重复项目!',
                    buttons: [{
                        label: '确定',
                        action: function (dialog) {
                            dialog.close();
                        }
                    }]
                });
            }
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                obj.rows.push({
                    FWJLLSH: '',
                    FWMXLSH: '',
                    FWRYGH: '',
                    FWRYXM: '',
                    FWSC: '',
                    RWLSH: '',
                    SJXZ: '1',

                    FWXMDM: row.FWXMDM,
                    FWXMMC: row.FWXMMC,
                    FWDJ: row.FWDJ,
                    FWHJ: row.FWJE,
                    FWSL: row.FWSL,

                    YNGRBSH: yngrbsh,
                    ZXJG: ''
                });
            }

            dialogAddXM.close();
        }
    });

    $("#id_canlce").bind("click", function () {
        dialogAddXM.close();
    });
});

function initFwxmAddTable() {
    // 先销毁表格
    $('#fwxmtable').bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $('#fwxmtable').bootstrapTable({
        classes: 'table table-hover warning',
        data: objXmInfo.rows,
        contentType: "application/json",
        iconSize: 'sm',
        height: objXmInfo.rows.length * 32 + 34 >= 300 ? 325 : objXmInfo.rows.length * 32 + 115,
        showHeader: true,
        striped: true, // 表格显示条纹
        pagination: false, // 启动分页
        pageSize: 10, // 每页显示的记录数
        pageNumber: 1, // 当前第几页
        pageList: [2], // 记录数可选列表
        search: true, // 是否启用查询
        showColumns: false, // 显示下拉框勾选要显示的列
        showRefresh: false, // 显示刷新按钮
        onlyInfoPagination: false,
        searchAlign: 'left',
        sidePagination: "client", // 表示服务端请求
        uniqueId: "XMDM", // 每一行的唯一标识，一般为主键列
        clickToSelect: true, // 是否启用点击选中行
        minimumCountColumns: 2, // 最少允许的列数
        singleSelect: false,
        responseHandler: function (res) {
            //dictData2 = res.dict;
            return res;
        },
        queryParamsType: "undefined",
        showPaginationSwitch: false,
        queryParams: function queryParams(params) { // 设置查询参数
            var param = {
                currPage: params.pageNumber,
                pageSize: params.pageSize,
                xmmc: $("#xmmc").val()
            };
            return param;
        },
        columns: [
            {
                checkbox: true
            },
            {
                field: 'FWXMMC',
                title: '项目名称',
                align: 'left'
            },
            {
                field: 'FWDJ',
                title: '单价(元)',
                align: 'center',
                visible: true
            },
            {
                field: 'FWSL',
                title: '数量(次)',
                align: 'center',
                visible: false
            },
            {
                field: 'FWHJ',
                title: '金额(元)',
                align: 'center',
                visible: false
            }],
        onLoadSuccess: function (data) { // 加载成功时执行
            objData = data;
        },
        onLoadError: function () { // 加载失败时执行
        },
        onCheck: function (row) {
        },
        onUncheck: function (row) {
        },
        onDblClickRow: function (row) {
            var flag = false;
            if (obj.rows != 0) {
                for (var n = 0; n < obj.rows.length; n++) {
                    if (obj.rows[n].FWXMMC == row.FWXMMC) {
                        obj.rows = removeElement(obj.rows, n);//删除方法
                        flag = true;
                    }
                }
            }
            if (flag) {
                BootstrapDialog.show({
                    title: '提示信息',
                    message: '有重复项目，已经为您自动过滤重复项目!',
                    buttons: [{
                        label: '确定',
                        action: function (dialog) {
                            dialog.close();
                        }
                    }]
                });
            }
            obj.rows.push({
                FWJLLSH: '',
                FWMXLSH: '',
                FWRYGH: '',
                FWRYXM: '',
                FWSC: '',
                RWLSH: '',
                SJXZ: '1',

                FWXMDM: row.FWXMDM,
                FWXMMC: row.FWXMMC,
                FWDJ: row.FWDJ,
                FWJE: row.FWJE,
                FWSL: row.FWSL,

                YNGRBSH: yngrbsh,
                ZXJG: ''
            });
            dialogAddXM.close();
        }
    });
};



function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}


function removeElement(array, index) {
    if (index >= 0 && index < array.length) {
        for (var i = index; i < array.length; i++) {
            array[i] = array[i + 1];
        }
        array.length = array.length - 1;
    }
    return array;

}