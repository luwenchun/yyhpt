var $table = $('#lhbgApplyPersonInfoTable');
var xm = "";
var sfzh = "";
$(function () {
    getZcjgInfo();
    initButtons();
    initJhbgglTable();

});

//注册机构
function getZcjgInfo() {
    $.ajax({
        url: 'yyhpt_lhbg.do?action=getZcjgInfo',
        type: 'get',
        dataType: 'json',
        data: {},
        success: function (data) {
            var jglist = data.rows;
            // 初始化签约人员
            createSelectByCZRYArray($("#fwjgdm"), jglist);
            $("#fwjgdm").select2({language: 'zh-CN'});
        }
    })
}

function createSelectByCZRYArray(selObject, array) {

    var selectBody = "<option value=''>--请选择--</option>";

    $.each(array, function () {
        selectBody += "<option value=" + this.id + ">" + this.text
            + "</option>";
    });
    selObject.html(selectBody);
}

function initButtons() {
    //查询按钮事件
    $('#id_btn_query').on('click', function () {
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });
}

function initJhbgglTable() {
    // 先销毁表格
    $table.bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $table.bootstrapTable({
        classes: 'table table-hover warning',
        method: "get", // 使用get请求到服务器获取数据
        url: "yyhpt_lhbg.do?action=getLhbgApplyPersonInfo", // 获取数据的Servlet地址
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
                yxjgdm:$("#fwjgdm").find("option:selected").val()
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
            }, {
                radio: true,
            }, {
                field: 'XM',
                title: '姓名',
                align: 'center'
            }, {
                field: 'XB',
                title: '性别',
                align: 'center'
            }, {
                field: 'NL',
                title: '年龄',
                align: 'center',
                visible: true
            },  {
                field: 'HJDZ',
                title: '户籍地址',
            }, {
                field: 'JZDZ',
                title: '居住地址',
            }, {
                field: 'DLSJ',
                title: '队列时间',
                align: 'center'
            }, {
                field: 'ZPW',
                title: '总排位',
                cellStyle: function cellStyle(row, index) {
                    return {
                        classes: 'a',
                    };
                },
                align: 'center'
            }, {
                field: 'TDPW',
                title: '通道排位',
                cellStyle: function cellStyle(row, index) {
                    return {
                        classes: 'a',
                    };
                },
                align: 'center'
            }, {
                field: 'ZT',
                title: '状态',
                align: 'center'
            }],
        onLoadSuccess: function (data) { // 加载成功时执行
            console.log(data);
            if (data.rows.length > 0) {
                $table.bootstrapTable('check', 0);
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
