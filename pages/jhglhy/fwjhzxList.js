var jhlsh = '';
var yngrbsh = '';
var dialog_data = 'Orange';
var selectedRow = [];//定义计划执行明细项目数组.用于过滤已执行项目
var allData;
var currentZT = "";
var jalx = '';
var jhlx = '';
var jhlxType = '';
$(function () {
    //表格加载
    initFwjhzxTable(currow);

    $.ajax({
        url: 'yyhptjhglhy.do?action=jhzdDetail',
        type: 'get',
        dataType: 'json',
        data: {
            yngrbsh: currow.YNGRBSH,
            djlsh: currow.DJLSH,
            jhlsh: currow.JHLSH
        }
    }).done(function (datas) {
        //页面个人基本信息赋值
        setJhzxGrForm(datas, currow);
    }).fail(function () {
        console.log("error");
    }).always(function () {
        console.log("complete");
    });

    var myDate = new Date();
    // $("#zxrq").val(myDate.toLocaleDateString().replace('/', '-').replace('/', '-'));
    $('#zxrq').datepicker('update', new Date().format('yyyy-MM-dd'));
    //新增按钮事件
    $('#add').on('click', function () {
        if (jhlsh == '' || jhlsh == null) {
            BootstrapDialog.show({
                title: '提示信息',
                message: '没有制定计划，无法新增服务项目!',
                buttons: [{
                    label: '确定',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });
            return false;
        }
        modelFunc_JhzxAdd(null, '新增服务项目', 1);
        return false;
    });

    //执行按钮事件
    $('#run').on('click', function () {
        // var selectedRows = $('#table_fwjhzx').bootstrapTable('getSelections');
        var selectedRows = allData;

        if (jalx == '1') {
            wnform.toast('已中止服务，不能修改!');
            $("#run").prop("disabled", true);
            return false;
        }
        if (jhlx == '临时计划') {
            wnform.toast('临时计划，不能修改!');
            $("#run").prop("disabled", true);
            return false;
        }
        if (currentZT == '已执行') {
            wnform.toast('计划已经执行，没有未执行的服务项目!');
            $("#run").prop("disabled", true);
            return false;
        }
        if (currentZT == '终止') {
            wnform.toast('计划已经终止，不能继续执行!');
            $("#run").prop("disabled", true);
            return false;
        }
        if (selectedRows.length == 0) {
            BootstrapDialog.show({
                title: '提示信息',
                message: '请选择要执行的服务项目!',
                buttons: [{
                    label: '确定',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });
            return false;
        }
        selectedRow.length = 0;//清空计划执行明细项目数组
        for (var j = 0; j < selectedRows.length; ++j) {//已执行的项目过滤掉不传入后台.不执行.
            if (selectedRows[j].FWZTDM == '0') {
                selectedRow.push(selectedRows[j]);
            }
//			if (selectedRows[j].FWZTDM!='0') {
//                BootstrapDialog.show({
//                    title: '提示信息',
//                    message: '请选择未执行的服务项目！',
//                    type: BootstrapDialog.TYPE_WARNING,
//                    size: BootstrapDialog.SIZE_SMALL,
//                    buttons: [{
//                        label: '确定',
//                        action: function (dialog) {
//                            dialog.close();
//                        }
//                    }]
//                });
//                return false;
//            }
        }

        if (wnform.isEmpty($("#zxrq").val())) {
            BootstrapDialog.show({
                title: '提示信息',
                message: '执行日期不能为空!',
                buttons: [{
                    label: '确定',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });
            return false;
        }

        runData('', '确认要执行所有的服务项目吗?', 2);
        return false;
    });

    //取消按钮事件(删除未执行的新增服务项目)
    $("#cacel").bind("click", function () {
        // var selectedRows = $('#table_fwjhzx').bootstrapTable('getSelections');
        var selectedRows = allData;
        if (selectedRows.length == 0) {
            BootstrapDialog.show({
                title: '提示信息',
                message: '请选择要删除的服务项目!',
                buttons: [{
                    label: '确定',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });
            return false;
        } else {
            for (var j = 0; j < selectedRows.length; ++j) {
                if (selectedRows[j].FWBDM != '0000' || selectedRows[j].FWZTDM != '0') {
                    BootstrapDialog.show({
                        title: '提示信息',
                        message: '只能删除未执行的新增服务项目！',
                        type: BootstrapDialog.TYPE_WARNING,
                        size: BootstrapDialog.SIZE_SMALL,
                        buttons: [{
                            label: '确定',
                            action: function (dialog) {
                                dialog.close();
                            }
                        }]
                    });
                    return false;
                }
            }
        }

        deleteJhzxFwxmData('', '确认要删除所有记录吗?', 2);
        return false;
    });

    //服务项目状态切换事件
    $('.rdZt').on('click', function () {
        $("#table_fwjhzx").bootstrapTable("selectPage", 1);
        $("#table_fwjhzx").bootstrapTable("refresh");
    });
});

//计划执行-个人基本信息页面赋值
function setJhzxGrForm(datas, row) {
    jalx = row.JALX;
    jhlx = row.JHLX;

    var ksrq = row.KSRQ;

    /**
     * 初始化日期选择控件
     */
    $('.choose-date').datepicker({
        format: 'yyyy-mm-dd',
        weekStart: 0,
        // startDate: "-0d",  //从当天开始选
        autoclose: true,
        todayBtn: 'linked',
        language: 'zh-CN'
    }).on('changeDate', function (ev) {
        // var ksrq = ev.date.mmdd();
    });

    if (jhlx == '临时计划') {
        jhlxType = '2';
    } else {
        jhlxType = '1';
    }
    if (jalx == '1' || jhlx == '临时计划') {
        // $("#run").prop("disabled", true);
        $("#stop").prop("disabled", true);
    }

    $("#hzxm").text((datas.grjbxx)[0].XM);
    if ($.trim(datas.grjbxx[0].LXDH) != '') {
        $("#lxdh").text(datas.grjbxx[0].LXDH);
    }
    var jhzxtime = "";
    for (var i = 0; i < datas.jhzxsj.length; i++) {
        jhzxtime += getJhzxTime(datas.jhzxsj[i].WEEK);
    }

    if (jhlx == '临时计划') {
        $("#jhsh_btn_add").prop("disabled", true);
        $("#cqjh_type").css("display", 'none');
        $("#lsjh_type").css("display", 'block');
        $("#pgjlnrgr_lsjh").html(datas.grjkzkpgs[0].PGJL);
        $("#jhzdzxsj_lsjh").html(row.KSRQ);
        $('#fwdz').html(row.JHFWDZ);
    } else {
        $("#pgjlnrgr").html(datas.grjkzkpgs[0].PGJL);
        $("#jhzdfwpc").html(row.FWPCMC);
        $("#jhzdzxsj").html(jhzxtime);
    }

}

function getJhzxTime(n) {
    var a = " ";
    switch (n) {
        case 1:
            a += '星期一';
            break;
        case 2:
            a += '星期二';
            break;
        case 3:
            a += '星期三';
            break;
        case 4:
            a += '星期四';
            break;
        case 5:
            a += '星期五';
            break;
        case 6:
            a += '星期六';
            break;
        case 7:
            a += '星期日';
            break;
        default:
            console.log("啥也没有");
    }
    return a;
}

function initFwjhzxTable(row) {
    yngrbsh = '';
    yngrbsh = row.YNGRBSH;
    jhlsh = '';
    jhlsh = row.JHLSH;

// 先销毁表格
    $("#table_fwjhzx").bootstrapTable('destroy');
// 初始化表格,动态从服务器加载数据
    $("#table_fwjhzx").bootstrapTable({
        classes: 'table table-hover warning',
        method: "get", // 使用get请求到服务器获取数据
        url: "yyhptjhglhy.do?action=jhzxList", // 获取数据的Servlet地址
        contentType: "application/json",
        iconSize: 'sm',
        // height: 200,
        showHeader: true,
        striped: true, // 表格显示条纹
        pagination: false, // 启动分页
        pageSize: 10, // 每页显示的记录数
        pageNumber: 1, // 当前第几页
        pageList: [2], // 记录数可选列表
        search: false, // 是否启用查询
        showColumns: false, // 显示下拉框勾选要显示的列
        showRefresh: false, // 显示刷新按钮
        onlyInfoPagination: false,
        sidePagination: "server", // 表示服务端请求
        uniqueId: "JHMXLSH", // 每一行的唯一标识，一般为主键列
        clickToSelect: true, // 是否启用点击选中行
        showExport: true,
        exportDataType: "basic",
        minimumCountColumns: 2, // 最少允许的列数
        responseHandler: function (res) {
            dictData = res.dict;
            var sTableHeight = res.rows.length * 47 + 34 >= 282 ? 235 : res.rows.length * 47 + 34;
            $('#table_fwjhzx').bootstrapTable('resetView', {height: sTableHeight});
            return res;
        },
        queryParamsType: "undefined",
        showPaginationSwitch: false,
        queryParams: function queryParams(params) { // 设置查询参数
            var param = {
                currPage: params.pageNumber,
                pageSize: params.pageSize,
                fwzt: $("input[name='zt']:checked").val(),
                djlsh: row.DJLSH,
                jhlsh: jhlsh
            };
            return param;
        },
        columns: [
            {
                field: 'FWBMC',
                title: '&nbsp;&nbsp;&nbsp;服务包&nbsp;&nbsp;&nbsp;&nbsp;',
                align: 'center',
                valign: 'top'
            },
            {
                field: 'FWXMMC',
                title: '服务项目',
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
                visible: true
            },
            {
                field: 'FWHJ',
                title: '金额(元)',
                align: 'center',
                visible: true
            },
            {
                field: 'FWZT',
                title: '状态',
                align: 'center'
            }],
        onLoadSuccess: function (data) { // 加载成功时执行
            allData = data.rows;
            console.log('u=' + data);
            console.log(data);
            if (data.rows.length > 0) {
                currentZT = data.rows[0].FWZT;
            } else {
                currentZT = '';
            }
            $("#jhzxrq").html(getNowFormatDate());
            console.log('currentZT=' + currentZT);
            if (currentZT == '已制定') {

                $("#stop").prop("disabled", true);
                $("#run").prop("disabled", false);
            }
            if (currentZT == '已执行') {
                $("#jhzxryxm").html(data.rows[0].ZXRYXM);
                $("#jhzxrq").html(data.rows[0].ZXRQ);
                $("#stop").prop("disabled", false);
                // $("#run").prop("disabled", true);
            }
            if (currentZT == '终止') {
                $("#jhzxryxm").html(data.rows[0].ZXRYXM);
                $("#jhzxrq").html(data.rows[0].ZXRQ);
                $("#stop").prop("disabled", true);
                // $("#run").prop("disabled", true);
            }

            wnform.MergeCell($('#table_fwjhzx'), data, 'FWBMC');
        },
        onLoadError: function () { // 加载失败时执行

        },
        onCheck: function (row) {
        },
        onUncheck: function (row) {
        }
    });
}

function checkNum(obj) {
    var check = /^\d+(\.{0,1}\d+){0,1}$/;
    obj.value = obj.value.replace(!check, '');
}


// 新增服务项目弹出方法
modelFunc_JhzxAdd = function (row, mtitle, mflag) {
    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/jhglhy/jhzxAdd.html'),
        buttons: [{
            label: '保存',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                var rows = $('#fwxmtable').bootstrapTable('getSelections');
                for (var j = 0; j < rows.length; ++j) {
                    if (rows[j].SL < 1) {
                        BootstrapDialog.show({
                            title: '提示信息',
                            message: '所选服务项目的【数量】不可小于1！',
                            type: BootstrapDialog.TYPE_WARNING,
                            size: BootstrapDialog.SIZE_SMALL,
                            buttons: [{
                                label: '确定',
                                action: function (dialog) {
                                    dialog.close();
                                }
                            }]
                        });
                        return false;
                    }
                }

                if (rows.length == 0) {
                    BootstrapDialog.show({
                        title: '提示信息',
                        message: '请选择要保存的服务项目!',
                        buttons: [{
                            label: '确定',
                            action: function (dialog) {
                                dialog.close();
                            }
                        }]
                    });
                    return false;
                }
                $.ajax({
                    url: 'yyhptjhglhy.do?action=insertJhzxFwxm',
                    type: "post",
                    dataType: "json",
                    data: {
                        yngrbsh: yngrbsh,
                        jhlsh: jhlsh,
                        rows: JSON.stringify(rows)
                    },
                    success: function (data) {
                        if (data[0].code == "T") {
                            dialogItself.close();
                        }
                        else
                            alert(data[0].message);

                        $('#table_fwjhzx').bootstrapTable('refresh');
                    }
                });
            }
        }, {
            label: '取消',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],
        onshow: function (dialogRef) {
        },
        onshown: function (dialogRef) {
            initFwxmTable(jhlsh);
            // getMjgFwxmData(jhlsh);
        },
        onhide: function (dialogRef) {
            $(this).removeData("bs.modal");
        },
        onhidden: function (dialogRef) {
            $(this).removeData("bs.modal");
        }
    });
};

//删除未执行的新增服务项目
deleteJhzxFwxmData = function (row, mTitle, mFlag) {
    BootstrapDialog.confirm({
        title: '提示信息',
        message: mTitle,
        type: BootstrapDialog.TYPE_WARNING,
        closable: true,
        draggable: true,
        btnCancelLabel: '否',
        btnOKLabel: '是',
        callback: function (result) {
            if (result) {
                var jhmxlshs = '';
                var objects = $.map(allData, function (row) {
                    return row.JHMXLSH;
                });
                jhmxlshs = objects.join();
                $.ajax({
                    url: "yyhptjhglhy.do?action=deleteJhzxFwxm",
                    type: "post",
                    dataType: "json",
                    data: {
                        jhmxlshs: jhmxlshs
                    },
                    success: function (data) {
                        $('#table_fwjhzx').bootstrapTable("selectPage", 1);
                        $('#table_fwjhzx').bootstrapTable('refresh');
                    }
                });
            } else {
                return;
            }
        }
    });
};

runData = function (row, mTitle, mFlag) {
    console.log("jhlxType=");
    console.log(jhlxType);
    BootstrapDialog.confirm({
        title: '提示信息',
        message: mTitle,
        type: BootstrapDialog.TYPE_WARNING,
        closable: true,
        draggable: true,
        btnCancelLabel: '否',
        btnOKLabel: '是',
        callback: function (result) {//15801897101
            if (result) {
                //var rows = $('#table_fwjhzx').bootstrapTable('getSelections');
                var rows = allData; //传入后台已过滤的服务项目(过滤掉已执行的服务项目)
                $.ajax({
                    url: "yyhptjhglhy.do?action=jhzx_run",
                    type: "post",
                    dataType: "json",
                    data: {
                        rows: JSON.stringify(rows),
                        zxrq: $("#zxrq").val(),
                        jhlx: jhlxType
                    },
//					beforeSend: function(){
//						wn.showLoading();
//					},
                    success: function (data) {
                        //任务执行成功则同时将任务信息返回前台显示，失败则只返回失败信息
                        //alert(data.FWXM);  //返回的任务信息
                        if (data.STATUS == "F") {
                            $.toaster({
                                priority: 'info',
                                title: '提示',
                                message: data.MSG
                            });
                        } else {
                            // $("#run").prop("disabled", true);
                            dialog_data = data.FWXM;  //获取返回的任务信息
                            showRwxxModelFunc('生成的任务信息');
                        }
                        $('#table_fwjhzx').bootstrapTable("selectPage", 1);
                        $('#table_fwjhzx').bootstrapTable('refresh');
                        $('#table').bootstrapTable('refresh');//刷新计划管理列表
                        GetRqNum();//刷新计划管理列表头部统计模块数据
                    },
                    complete: function (xhr) {
                        wn.hiddenLoading();
                    }
                });
            } else {
                return;
            }
        }
    });
};

//显示生成/停止的任务信息
showRwxxModelFunc = function (mtitle) {
    var dialogData = dialog_data[0];
    console.log('dialogData=');
    console.log(dialogData.JHLSH);
    console.log(dialogData);
    console.log(dialog_data);
    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/jhglhy/jhzxShowRwxx.html'),
        buttons: [{
            label: '确定',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],
        onshow: function (dialogRef) {
        },
        onshown: function (dialogRef) {
            var tableRwxx = $("#tableRwxx");
            // 先销毁表格
            tableRwxx.bootstrapTable('destroy');
            // 初始化表格,动态从服务器加载数据
            tableRwxx.bootstrapTable({
                classes: 'table table-hover warning',
                method: "get",           //使用get请求到服务器获取数据
                // data: dialogData,        //绑定数据
                url: "yyhptjhglhy.do?action=getRwdxInfo", // 获取数据的Servlet地址
                contentType: "application/json",
                iconSize: 'sm',
                showHeader: true,
                striped: true,           // 表格显示条纹
                pagination: true,      // 启动分页
                pageSize: 10,           // 每页显示的记录数
                pageNumber: 1,        // 当前第几页
                pageList: [2],         // 记录数可选列表
                search: false,           // 是否启用查询
                showColumns: false, // 显示下拉框勾选要显示的列
                showRefresh: false,  // 显示刷新按钮
                onlyInfoPagination: false,
                sidePagination: "server", // 表示服务端请求
                uniqueId: "RWDXLSH", // 每一行的唯一标识，一般为主键列
                clickToSelect: true,       // 是否启用点击选中行
                minimumCountColumns: 2, // 最少允许的列数
                responseHandler: function (res) {
                    return res;
                },
                queryParamsType: "undefined",
                showPaginationSwitch: false,
//				queryParams : function queryParams(params) { // 设置查询参数
//                      return param;
//                  },
                queryParams: function queryParams(params) { // 设置查询参数
                    var param = {
                        currPage: params.pageNumber,
                        pageSize: params.pageSize,
                        jhlsh: dialog_data[0].JHLSH
                    };
                    return param;
                },
                columns: [{
                    title: '序号',
                    formatter: function (value, row, index) {
                        return index + 1;
                    }
                }, {
                    field: 'XM',
                    title: '姓名'

                }, {
                    field: 'ZRRXM',
                    title: '责任人'
                }, {
                    field: 'KSRQ',
                    title: '开始日期',
                }, {
                    field: 'JSRQ',
                    title: '结束日期'
                }],
                onLoadSuccess: function (data) { // 加载成功时执行
                    console.log('data***');
                    console.log(data);
                    $("#run").prop("disabled", true);
                },
                onLoadError: function () { // 加载失败时执行
                    alert("error");
                    $("#run").prop("disabled", false);
                },
                onCheck: function (row) {
                },
                onUncheck: function (row) {
                }
            });
        },
        onhide: function (dialogRef) {
        },
        onhidden: function (dialogRef) {
        }
    });
};

//停止按钮事件
$("#stop").bind("click", function () {
    // var selectedRows = $('#table_fwjhzx').bootstrapTable('getSelections');
    if (currentZT == '已制定') {
        wnform.toast('计划还没有执行，没有需要停止的服务项目!');
        return false;
    }
    var selectedRows = allData;
    if (currentZT == '终止') {
        wnform.toast('计划已经终止，没有未终止的服务项目!');
        return false;
    }
    if (selectedRows.length == 0) {
        BootstrapDialog.show({
            title: '提示信息',
            message: '请选择要停止的服务项目!',
            buttons: [{
                label: '确定',
                action: function (dialog) {
                    dialog.close();
                }
            }]
        });
        return false;
    }
    for (var j = 0; j < selectedRows.length; ++j) {
        if (selectedRows[j].FWZTDM != '1') {
            BootstrapDialog.show({
                title: '提示信息',
                message: '请选择已执行的服务项目！',
                type: BootstrapDialog.TYPE_WARNING,
                size: BootstrapDialog.SIZE_SMALL,
                buttons: [{
                    label: '确定',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });
            return false;
        }
    }
    stopData('', '确认要停止所有服务项目吗?', 2);
    return false;
});

$("#exit").bind("click", function () {
    zxdialogRef.close();
});

stopData = function (row, mTitle, mFlag) {
    BootstrapDialog.confirm({
        title: '提示信息',
        message: mTitle,
        type: BootstrapDialog.TYPE_WARNING,
        closable: true,
        draggable: true,
        btnCancelLabel: '否',
        btnOKLabel: '是',
        callback: function (result) {
            if (result) {
                // var rows = $('#table_fwjhzx').bootstrapTable('getSelections');
                var rows = allData;
                $.ajax({
                    url: "yyhptjhglhy.do?action=jhzxStop",
                    type: "post",
                    dataType: "json",
                    data: {
                        rows: JSON.stringify(rows)
                    },
                    success: function (data) {
                        if (data.STATUS == "F") {
                            $.toaster({
                                priority: 'info',
                                title: '提示',
                                message: data.MSG
                            });
                        }
                        if (data.STATUS == "T") {
                            $.toaster({
                                priority: 'info',
                                title: '提示',
                                message: data.MSG
                            });
                        }
                        $table.bootstrapTable("selectPage", 1);
                        $('#table_fwjhzx').bootstrapTable('refresh');
                    }
                });
            } else {
                return;
            }
        }
    });
};

