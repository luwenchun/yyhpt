/*
 * Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
 */
var dictData;         //字典项
var dlRybm;          //登录人员编码
var $table = $('#lhbgglTable');
var dialoging = "";
var dialog = "";
var mainSelectedRow;
var selects = '';
var lhshDialog = '';
var lhsqDialog = '';
var shzt = '';
var fqyyArray;
var lhbgshResult = '';
var isFq = '';
var isSaveFlag = '';
var isSuccess = '';
var dlxhInfo = '';
document.onkeydown = function (event) {
    var target, code, tag;
    if (!event) {
        event = window.event; //针对ie浏览器
        target = event.srcElement;
        code = event.keyCode;
        if (code == 13) {
            tag = target.tagName;
            if (tag == "TEXTAREA") {
                return true;
            }
            else {
                return false;
            }
        }
    }
    else {
        target = event.target; //针对遵循w3c标准的浏览器，如Firefox
        code = event.keyCode;
        if (code == 13) {
            tag = target.tagName;
            if (tag == "INPUT") {
                return true;
            }
            else {
                return false;
            }
        }
    }
};

$(function () {
    initButtons();
    initTable();
    getFqyyInfo();
    wnform.addOnresize($table, tableStaus);
});

function initButtons() {
    //绑定新增事件
    $('#btn_add').on('click', function () {
        addJhbgApply();
    });
    //查询按钮事件  ok
    $('#btn_query').on('click', function () {
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });

    //导出按钮事件     ok
    $('#export').on('click', function () {
        $table.tableExport({type: 'excel', escape: 'false'});
        return false;
    })
}

function addJhbgApply() {
    selects = '';
    BootstrapDialog.show({
        title: '轮候变更人员选择',
        size: BootstrapDialog.SIZE_BIG,
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/lhbg/lhbgglAdd.jsp'),
        buttons: [
            {
                label: '确定',
                cssClass: 'btn-default btn-sm',
                action: function (dialog) {
                    selects = $("#lhbgApplyPersonInfoTable").bootstrapTable('getSelections');
                    dialog.close();
                }
            }, {
                label: '退出', cssClass: 'btn-default btn-sm',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }
        ],
        onshow: function (dialogRef) {
        },
        onshown: function (dialogRef) {
        },
        onhide: function (dialogRef) {
        },
        onhidden: function (dialogRef) {
            $("#jhbgApplyPersonInfoTable").bootstrapTable("refresh");
            if (selects.length > 0) {
                BootstrapDialog.show({
                    title: '变更申请',
                    size: BootstrapDialog.SIZE_WIDE,
                    closable: true,
                    draggable: true,
                    closeByBackdrop: false,
                    closeByKeyboard: false,
                    message: $('<div></div>').load('yyhpt/views/lhbg/lhbgsqDetail.jsp'),
                    buttons: [{
                        id: 'id_apply_save',
                        label: '保存',
                        cssClass: 'btn-default btn-sm',
                        action: function (dialog) {
                            doSaveLhbgsq();
                            // dialog.close();
                            lhsqDialog = dialog;
                        }
                    }, {
                        id: 'id_apply_exit',
                        label: '退出',
                        cssClass: 'btn-default btn-sm',
                        action: function (dialogItself) {
                            dialogItself.close();
                        }
                    }],
                    onshow: function (dialogRef) {
                        dialog = dialogRef;

                    },
                    onshown: function (dialogRef) {
                        if (selects.length > 0) {
                            selectedRow = selects[0];
                            setInitInfo(selectedRow, 1);
                        }
                    },
                    onhide: function (dialogRef) {
                    },
                    onhidden: function (dialogRef) {
                    }
                });

            }
        }
    });
}

function getRylist() {
    $.ajax({
        url: "common.do?action=getSysCzrylist",
        type: "post",
        dataType: "json",
        data: {},
        success: function (data) {
            rylist = data.czrys;
            // 初始化系统操作人员
            wn.createSelectByCZRYArray($("#djry"), rylist);
        }
    });
}

function initTable() {
    // 先销毁表格
    $('#lhbgglTable').bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $('#lhbgglTable').bootstrapTable({
        classes: 'table table-hover warning',
        method: "get", // 使用get请求到服务器获取数据
        url: "yyhpt_lhbg.do?action=getLhbggllb", // 获取数据的Servlet地址
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
                xm: $("#xm").val(),
                sfzh: $("#sfzh").val(),
                djrybm: $("#djry").val()
            };
            return param;
        },
        columns: [
            {
                field: 'id',
                title: '序号',
                formatter: function (value, row, index) {
                    return index + 1;
                },
                align: 'center'
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
                align: 'center',
                visible: false
            }, {
                field: 'HJDZ',
                title: '户籍地址',
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
                field: 'BGLX',
                title: '变更类型',
                events: operateEvents,
                formatter: function (value, row, index) {
                    if (row.BGLXDM == '1') {
                        return '<a class="lhbglbToBglx" href="javascript:void(0)"  > <img src="layouts/img/table/icon_select.png">通道变更<a/>';
                    } else {
                        return '<a class="lhbglbToBglx" href="javascript:void(0)"  > <img src="layouts/img/table/icon_select.png">放弃变更<a/>';
                    }
                },
                align: 'center'
            }, {
                field: 'BGSH',
                title: '变更审核',
                events: operateEvents,
                formatter: function (value, row, index) {
                    var option = '（审核中）';
                    if (row.SHZT === '1') {
                        option = '审核通过';
                    } else if (row.SHZT === '2') {
                        option = '审核不通过';
                    } else {
                        option = '审核';
                    }
                    if (value == '0') {
                        return '<a class="lhbglbToBgsh" href="javascript:void(0)"  > <img src="layouts/img/table/icon_del.png">审核<a/>';
                    } else {
                        if (option == '审核不通过') {
                            return '<a class="lhbglbToBgsh" href="javascript:void(0)"  > <img src="layouts/img/table/icon_disAgree.png"> ' + option + '<a/>';
                        } else {
                            return '<a class="lhbglbToBgsh" href="javascript:void(0)"  > <img src="layouts/img/table/icon_select.png"> ' + value + '<a/>';
                        }
                    }
                },
                align: 'center'
            }, {
                field: 'CZ',
                title: '操作',
                align: 'center',
                events: {
                    'click .delete': function (e, value, row, index) {
                        deleteInfos(row, index);
                    }
                },
                formatter: function (value, row, index) {
                    shzt = row.SHZT;
                    if (shzt == '1' || shzt == '2') {
                        return '<a class="delete"  href="javascript:void(0)"></a>';
                    } else {
                        return '<a class="delete"  href="javascript:void(0)"><img src="layouts/img/table/icon_deldata.png"></a>';
                    }

                }
            }],
        onLoadSuccess: function (data) { // 加载成功时执行
            console.log(data);
        },
        onLoadError: function () { // 加载失败时执行
        },
        onCheck: function (row) {
            $("#remove").attr("disabled", false);
        },
        onUncheck: function (row) {
        }
    });
}

window.operateEvents = {
    'click .lhbglbToBglx': function (e, value, row, index) {
        mainSelectedRow = row;
        loadLhbglxDetail(row, '新增轮候变更', value);
    },
    'click .lhbglbToBgsh': function (e, value, row, index) {
        mainSelectedRow = row;
        loadJhbglxshDetail(row, '轮候变更审核', value);
    }
};

function deleteInfos(row, index) {
    if (row.SHZT == '1' || row.SHZT == '2') {
        wnform.toast('变更申请已经审核，不能删除!');
        return false;
    } else {
        BootstrapDialog.show({
            title: '提示信息',
            message: '是否删除？',
            buttons: [{
                label: '确定',
                action: function (dialog) {
                    $.ajax({
                        url: 'yyhpt_lhbg.do?action=deleteLhbgInfo',
                        type: 'get',
                        dataType: 'json',
                        data: {
                            yngrbsh: row.YNGRBSH,
                            bgsqlsh: row.BGSQLSH,
                            fplsh: row.FPLSH
                        },
                        success: function (res) {
                            $('#lhbgglTable').bootstrapTable("refresh");
                            wnform.toast('删除成功!');
                            dialog.close();
                        }
                    });
                }
            }, {
                label: '取消',
                action: function (dialog) {
                    dialog.close();
                }
            }]
        });
    }
}

function InitSearch() {
    $("#djry").val("dlRybm");
    $("#xm").val("");
    $("#sfzh").val("");
}

function loadLhbglxDetail(row, title, value) {
    if (row.JHLX == '2') {
        wnform.toast('临时计划不可变更!');
        return false;
    } else {
        BootstrapDialog.show({
            title: title,
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/lhbg/lhbgsqDetail.jsp'),
            buttons: [{
                id: 'btn_save_jhbgsq',
                label: '保存',
                cssClass: 'btn-default btn-sm',
                action: function (dialogItself) {
                    doSaveLhbgsq();
                    lhsqDialog = dialogItself;
                }
            }, {
                label: '退出', cssClass: 'btn-default btn-sm',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }],
            onshow: function (dialogRef) {
            },
            onshown: function (dialogRef) {
                setInitInfo(mainSelectedRow, 2);
            },
            onhide: function (dialogRef) {
                $table.bootstrapTable("refresh");
            }

        });
    }
}

function loadJhbglxshDetail(row, title, value) {
    if (row.BGSQLSH == ''/* || row.BGSQLSH.length == 0*/) {
        wnform.toast('请进行轮候变更申请!');
        return false;
    } else {
        BootstrapDialog.show({
            title: title,
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/lhbg/lhbgshDetail.jsp'),
            buttons: [{
                label: '保存',
                cssClass: 'btn-default btn-sm',
                id: 'btn_jhbgsh_save',
                action: function (dialogItself) {
                    doSaveLhbgsh();
                    lhshDialog = dialogItself;
                }
            }, {
                label: '退出', cssClass: 'btn-default btn-sm',
                action: function (dialogItself) {
                    isSuccess = '';
                    dialogItself.close();
                }
            }],
            onshow: function (dialogRef) {
            },
            onshown: function (dialogRef) {
                setShInitInfo(mainSelectedRow);
            },
            onhide: function (dialogRef) {
                $table.bootstrapTable("refresh");
                initTable();
                var tdmc = '';
                switch (dlxhInfo.substr(0, 1)) {
                    case 'A':
                        tdmc = '特殊通道' + dlxhInfo + '号';
                        break;
                    case 'B':
                        tdmc = '优先通道' + dlxhInfo + '号';
                        break;
                    case 'C':
                        tdmc = '普通通道' + dlxhInfo + '号';
                        break;
                }
                if (lhbgshResult == '1' && isSaveFlag == '1' && isSuccess == '1' && isFq == '1') {
                    var html = '<h4 class="queue-info">总排位：<span>' + row.ZPW + '</span>号</h4><br><h4 class="queue-info">通道排位：<span>' + tdmc + '</span></h4>';
                    BootstrapDialog.show({
                        title: '',
                        size: BootstrapDialog.SIZE_SMALL,
                        closable: true,
                        draggable: true,
                        closeByBackdrop: false,
                        closeByKeyboard: false,
                        message: html,
                        buttons: [],
                        onshow: function (dialogRef) {
                        },
                        onshown: function (dialogRef) {
                        },
                        onhide: function (dialogRef) {
                        },
                        onhidden: function (dialogRef) {
                        }
                    });
                }
            }
        });
    }
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

//放弃原因
function getFqyyInfo() {
    $.ajax({
        url: 'yyhpt_lhbg.do?action=getFqyyInfo',
        type: 'get',
        dataType: 'json',
        data: {},
        success: function (data) {
            fqyyArray = data.rows;
        }
    })
}