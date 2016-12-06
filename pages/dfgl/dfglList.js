/**
 * Created by tw on 2016-10-22.
 */

var sDfzt = '';     //电访状态（0未电访 1已电访）

var dialogModel;    //弹出窗体
var rowPersonInfo;  //个人基本信息
var $table;         //bootstrapTable


/**
 * [initTable description] 初始化表格
 */
function initTable() {
    // 先销毁表格
    $('#table').bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $('#table')
        .bootstrapTable(
            {
                classes: 'table table-hover warning',
                method: "get", // 使用get请求到服务器获取数据
                url: "yyhpt_dfgl.do?action=list", // 获取数据的Servlet地址
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
                    //var dictData = res.dict;
                    return res;
                },
                queryParamsType: "undefined",
                showPaginationSwitch: false,
                queryParams: function queryParams(params) { // 设置查询参数
                    getPara(params);
                    var param = {
                        currPage: params.pageNumber,
                        pageSize: params.pageSize,
                        xm: $("#xmSearch").val(),
                        cyksrq: $("#cyksrq").val(),
                        cyjsrq: $("#cyjsrq").val(),
                        dfzt: sDfzt,
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
                        align: 'center',
                        width: 60,
                    },
                    {
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
                        align: 'center',
                    },
                    {
                        field: 'LXDH',
                        title: '联系电话',
                        align: 'center'
                    },
                    {
                        field: 'CYRQ',
                        title: '出院日期',
                        align: 'center',
                        width: 90,
                    },
                    {
                        field: 'DFCS',
                        title: '电访次数',
                        align: 'center',
                    },
                    {
                        title: '电访情况',
                        align: 'center',
                        events: {
                            //跳转电访清单界面
                            'click .listToDfqd': function (e, value, row, index) {
                                dfqdFunc(row, '电访清单');
                            }
                        },
                        formatter: function (value, row, index) {
                            return '<a class="listToDfqd" href="javascript:void(0)"><img src="layouts/img/table/icon_right.png"> 查看</a>';
                        },
                        //visible:false
                    }],
                onLoadSuccess: function () { // 加载成功时执行

                },
                onLoadError: function () { // 加载失败时执行

                },
                onCheck: function (row) {
                    $("#remove").attr("disabled", false);
                },
                onUncheck: function (row) {
                    // alert(row.id);
                }
            });
}


$(document).ready(function () {

    //icheck皮肤
    $('input[name="dfZt"]').iCheck({
        checkboxClass: 'icheckbox_flat-wnred',
        radioClass: 'iradio_flat-wnred',
        increaseArea: '20%'
    });

    //初始化日期标签
    $('.choose-date').datepicker({
        autoclose: true,
        todayBtn: "linked",
        todayHighlight: true,
        endDate: "-0d"   //不能大于当天
    });

    //初始化表格
    initTable();

    $table = $('#table');

    //手机上显示卡片模式
    wnform.addOnresize($table, tableStaus);

    //查询
    $('#btn_query').on('click', function () {
        var sCyksrq = $('#cyksrq').val();
        var sCyjsrq = $('#cyjsrq').val();
        if (sCyksrq != '' && sCyjsrq != '' && sCyjsrq < sCyksrq) {
            wnform.toast("出院结束日期不能小于开始日期!");
            return false;
        }

        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });

    //导出
    $('#btn_export').on('click', function () {
        $table.tableExport({type: 'excel', escape: 'false'});
        return false;
    });

    //更多
    $('#btn_more').on('click', function () {
        /*var bHidden = $("#more_search_div").is(":hidden");
        if (bHidden) {
            $('#more_search_div').css("display", "block");
        } else {
            $('#more_search_div').css("display", "none");
        }*/
        return false;
    });

});

//获取查询参数
function getPara(params) {
    //已电访、未电访都勾选或都未勾选都查询全部数据，只勾选一个则查询未电访或者已电访数据
    if ($('#wdfCk').prop("checked") && $('#ydfCk').prop("checked")) {
        sDfzt = '';
    } else if (!$('#wdfCk').prop("checked") && !$('#ydfCk').prop("checked")) {
        sDfzt = '';
    } else {
        //勾选未电访
        if ($('#wdfCk').prop("checked")) {
            sDfzt = '0';
        }

        //勾选已电访
        if ($('#ydfCk').prop("checked")) {
            sDfzt = '1';
        }
    }

    console.log("sDfzt:" + sDfzt);
}

//初始化查询条件
function InitSearch() {
    $("#xmSearch").val("");
    $("#cyksrq").val("");
    $("#cyjsrq").val("");
    $('#wdfCk').iCheck('uncheck');
    $('#ydfCk').iCheck('uncheck');
}

//弹出二级页面-电访清单
dfqdFunc = function (row, mtitle, mflag) {
    rowPersonInfo = row;
    yngrbsh=row.YNGRBSH;
    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_WIDE,
        cssClass: 'dialog-bg-color dialog-footer-space',
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt_dfgl.do?action=dfqdInit'),
        buttons: [{
            label: '保存',
            cssClass: 'btn-default btn-sm',
            id: 'btn_Save',
            action: function (dialogItself) {
                saveDfpg();
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

