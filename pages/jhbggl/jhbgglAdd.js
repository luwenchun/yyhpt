// var $table = $('#jhbgApplyPersonInfoTable');
var xm = "";
var sfzh = "";
$(function () {
    initButtons();
    initJhbgglTable();
});

function initButtons() {
    //查询按钮事件
    $('#id_btn_query').on('click', function () {
        $('#jhbgApplyPersonInfoTable').bootstrapTable("selectPage", 1);
        $('#jhbgApplyPersonInfoTable').bootstrapTable("refresh");
    });
}

function initJhbgglTable() {
    // 先销毁表格
    $('#jhbgApplyPersonInfoTable').bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $('#jhbgApplyPersonInfoTable').bootstrapTable({
        classes: 'table table-hover warning',
        method: "get", // 使用get请求到服务器获取数据
        url: "yyhptjhbggl.do?action=getJhbgApplyPersonInfo", // 获取数据的Servlet地址
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
                sfzh: $("#id_identity").val()
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
                field: 'SFZH',
                title: '身份证号',
                formatter: function (value, row, index) {
                    if (value != undefined) {
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
            }, {
                field: 'LXDH',
                title: '联系电话',
                align: 'center'
            }],
        onLoadSuccess: function (data) { // 加载成功时执行
            console.log(data);
            if (data.rows.length > 0) {
                $('#jhbgApplyPersonInfoTable').bootstrapTable('check', 0);
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