var mbData = '';
$(function () {
    getSelectMbInfoForTable();
    // initFwdjSelectMbtable();
    $("#id_sure").bind("click", function () {
        var rows = $('#fwdjSelectMbtable').bootstrapTable('getSelections');
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
            var selectMbInfo = '';
            $.each(rows, function (k, v) {
                if (k == rows.length - 1) {
                    selectMbInfo += v.MBNR;
                } else {
                    selectMbInfo += v.MBNR + ';';
                }
            });
            switch (mblx) {
                case '1':
                    mbnr.hljlMbnr = selectMbInfo;
                    break;
                case '2':
                    mbnr.jkzdMbnr = selectMbInfo;
                    break;
                default:
                    mbnr.hljlMbnr = selectMbInfo;
            }
            console.log(mbnr);
            dialogg.close();
        }
    });

    $("#id_canlce").bind("click", function () {
        dialogg.close();
    });
});

function getSelectMbInfoForTable() {
    $.ajax({
        url: 'yyhptRwglFwglhy.do?action=getSelectMbInfo',
        type: 'get',
        dataType: 'json',
        data: {mblx: mblx},
        success: function (data) {
            mbData = data;
            initFwdjSelectMbtable();
        }
    });
}

function initFwdjSelectMbtable() {
    // 先销毁表格
    $('#fwdjSelectMbtable').bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $('#fwdjSelectMbtable').bootstrapTable({
        classes: 'table table-hover warning',
        // method: "get", // 使用get请求到服务器获取数据
        // url: "yyhptRwglFwglhy.do?action=getSelectMbInfo", // 获取数据的Servlet地址
        data: mbData.rows,
        contentType: "application/json",
        iconSize: 'sm',
        height: mbData.rows.length * 32 + 34 >= 300 ? 325 : mbData.rows.length * 32 + 115,
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
        // sidePagination: "server", // 表示服务端请求
        sidePagination: "client", // 表示服务端请求
        uniqueId: "LSH", // 每一行的唯一标识，一般为主键列
        clickToSelect: true, // 是否启用点击选中行
        minimumCountColumns: 2, // 最少允许的列数
        singleSelect: false,
        responseHandler: function (res) {
            // var sTableHeight = res.rows.length * 47 + 34 >= 282 ? 235 : res.rows.length * 47 + 34;
            // $('#fwdjSelectMbtable').bootstrapTable('resetView', {height: sTableHeight});
            return res;
        },
        queryParamsType: "undefined",
        showPaginationSwitch: false,
        queryParams: function queryParams(params) { // 设置查询参数
            var param = {
                currPage: params.pageNumber,
                pageSize: params.pageSize,
                mblx: mblx
            };
            return param;
        },
        columns: [
            {
                checkbox: true
            },
            {
                field: 'MBNR',
                title: '模板内容',
                align: 'left'
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
            /*      var flag = false;
             if (obj.rows != 0) {
             for (var n = 0; n < obj.rows.length; n++) {
             if (obj.rows[n].FWXMMC == row.XMMC) {
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
             obj.rows.push(
             {
             FWXMDM: row.XMDM,
             FWBMC: "服务包外项目",
             FWBDM: "0000",
             FWXMMC: row.XMMC,
             FWPCDM: row.PCDM,
             FWPCMC: row.FWPC,
             FWSL: row.FWSL,
             FWHJ: row.FWHJ,
             ZDRQ: null,
             ZDRYXM: null
             });*/
            dialogg.close();
        }
    });
};





