var dialogModel;      //弹出窗体
var sYngrbsh;		  //域内个人标识号
var $table = $('#table');


function initTable() {
    // 先销毁表格
    $table.bootstrapTable('destroy').bootstrapTable(
        {
            classes: 'table table-hover warning',
            method: "get", // 使用get请求到服务器获取数据
            url: "yyhptGrywdh.do?action=list", // 获取数据的Servlet地址
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
            uniqueId: "RWDXLSH", // 每一行的唯一标识，一般为主键列
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
                    xm: $("#xmSearch").val(),
                    sfzh: $("#sfzhSearch").val()
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
                    field: 'XM',
                    title: '姓名',
                    align: 'center'
                },
                {
                    field: 'NL',
                    title: '年龄',
                    align: 'center'
                },
                {
                    field: 'SJHM',
                    title: '联系电话',
                    align: 'center'
                },
                {
                    field: 'YLFYZFFSMC',
                    title: '医保类别',
                    align: 'center'
                },
                {
                    field: 'GLZTMC',
                    title: '待办业务',
                    align: 'center'
                },
                {
                    field: 'SQRQ',
                    title: '申请日期',
                    align: 'center'
                },
                {
                    field: 'JZDZ',
                    title: '居住地址'
                }, {
                    field: 'CZ',
                    title: '操作',
                    align: 'center',
                    events: {
                        'click .listToDetaile': function (e, value, row, index) {
                            modelFunc(row, '');
                        }
                    },
                    formatter: function (value, row, index) {
                        return '<a class="listToDetaile" href="javascript:void(0)"><img src="layouts/img/table/icon_right.png"> 进入导航</a>';
                    },
                },],
            onLoadSuccess: function () { // 加载成功时执行

            },
            onLoadError: function () { // 加载失败时执行

            },
            onCheck: function (row) {
            },
            onUncheck: function (row) {
            }
        });

    wnform.addOnresize($table, false);
}


//弹出二级页面
modelFunc = function (row, mtitle, mflag) {
    sYngrbsh = row.YNGRBSH;
    BootstrapDialog.show({
        title: '业务导航',
        size: BootstrapDialog.SIZE_WIDE,
        cssClass: 'dialog-bg-color dialog-footer-space',
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhptGrywdh.do?action=details'),
        buttons: [{
            label: '保存',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {

            }
        }, {
            label: '退出',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],
        onshow: function (dialogRef) {

        },
        onshown: function (dialogRef) {
            dialogModel = dialogRef;
        },
        onhide: function (dialogRef) {
            $(this).removeData("bs.modal");
        },
        onhidden: function (dialogRef) {
            $(this).removeData("bs.modal");
        }
    });
};


$(function () {

    initButtons();

    initTable();
});


//初始化查询条件
function InitSearch() {
    $("#zrrSearch").val(dlRybm);
    $("#xmSearch").val("");
    $("#sfzhSearch").val("");
    //$('#more_search_div').css("display","none");
}


function initButtons() {
    $('#btn_query').on('click', function () {
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });
    //更多
    $('#more').on('click', function () {
        /*var bHidden = $("#more_search_div").is(":hidden");
         if(bHidden){
         $('#more_search_div').css("display","block");
         }else{
         $('#more_search_div').css("display","none");
         }*/
        return false;
    });

    //导出
    /*$('#export').on('click', function() {
     $table.tableExport({ type: 'excel', escape: 'false' });
     return false;
     });*/
}






