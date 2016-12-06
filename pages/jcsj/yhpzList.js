/*
 * Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
 */

/**
 * Created by Jerry on 2016/11/16 0016.
 */

var $table = $('#table');
var dictData;
var editRow = '';
var flag;
var mobileMode = false;

function initTable() {
    //先销毁表格
    $('#table').bootstrapTable('destroy');

    //初始化表格,动态从服务器加载数据
    $('#table').bootstrapTable({
        classes: 'table table-hover warning',
        method: 'get',
        url: 'yyhpt_yhsz.do?action=list',
        contentType: 'application/json',
        iconSize: 'sm',
        showHeader: true,
        striped: true,
        pagination: true,
        pageSize: 10,
        pageNumber: 1,
        pageList: [2],
        search: false,
        showColumns: false,
        showRefresh: false,
        onlyInfoPagination: false,
        sidePagination: 'server',
        uniqueId: 'DM',
        clickToSelect: true,
        minimunCountColumns: 2,
        responseHandler: function (res) {
            dictData = res;
            return res;
        },
        queryParamsType: "undefined",
        showPaginationSwitch: false,
        queryParams: function queryParams(params) {
            var param = {
                currPage: params.pageNumber,
                pageSize: params.pageSize,
                YHCLMC: $('#mc').val()
            };
            return param;
        },
        columns: [{
            title: '序号',
            formatter: function (value, row, index) {
                return index + 1;
            },
            align: 'center'
        }, {
            field: 'YHCLDM',
            title: '优惠策略代码',
            align: 'center'
        }, {
            field: 'YHCLMC',
            title: '优惠策略名称',
            align: 'center'
        }, {
            field: 'YHFSDM',
            title: '优惠方式',
            align: 'center',
            formatter: function (value, row, index) {
                if('1' == value){
                    return '百分比';
                } else if('2' == value){
                    return '固定值';
                }
                return '';
            }
        }, {
            field: 'YHZ',
            title: '优惠值',
            align: 'center'
        },{
            field: 'KSRQ',
            title: '有效开始日期',
            align: 'center'
        },{
            field: 'JSRQ',
            title: '有效结束日期',
            align: 'center'
        }, {
            title: '操作',
            align: 'center',
            width: '100px',
            events: operateEvents,
            formatter: operateFormatter
        }],
        onLoadSuccess: function () {

        },
        onLoadError: function () {

        },
        onCheck: function (row) {
            $("#remove").attr("disabled", false);
        }
    });
}

/**
 * 格式化操作栏绑定事件
 * @param value
 * @param row
 * @param index
 * @returns {string}
 */
function operateFormatter(value, row, index) {
    return [
        '<a class="edit" href="javascript:void(0)"  data-toggle="modal" disabled title="修改">',
        '<i class="glyphicon glyphicon-edit"></i>',
        '</a>&nbsp;&nbsp;&nbsp;&nbsp;',
        '<a class="remove" href="javascript:void(0)" title="删除">',
        '<i class="glyphicon glyphicon-remove"></i>', '</a>'].join('');
}

document.onkeydown = function (event) {
    var target, code, tag;
    if (!event) {
        event = window.event;
        target = event.srcElement;
        code = event.keyCode;
        if (code == 13) {
            tag = target.tagName;
            if (tag == "TEXTAREA") {
                return true;
            } else {
                return false;
            }
        }
    } else {
        target = event.target;
        code = event.keyCode;
        if (code == 13) {
            tag = target.tagName;
            if (tag == "INPUT") {
                return true;
            } else {
                return false;
            }
        }
    }
}

/**
 * 获取页面高度
 */
function getHeight() {
    return $(window).height() - 150;
}

/**
 * 初始化
 */
$(function () {
    $('#add').bind('click', function () {
        modelFunc(null, '新增优惠策略', 1);
    });

    initTable();

    $('#btn_query').on('click', function () {
        $('#table').bootstrapTable("refresh");
    });

});

modelFunc = function (row, mtitle, mflag) {
    editRow = row;
    flag = mflag;
    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_WIDE,
        data: {},
        closeable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt_yhsz.do?action=add'),
        buttons: [{
            label: '保存',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                saveForm.init(dialogItself, mflag);
                $('#defaultForm').submit();
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
        },
        onhide: function (dialogRef) {
            $(this).removeData("bs.modal");
        },
        onhidden: function (dialogRef) {
            $(this).removeData("bs.modal");
        }
    });
}

/**
 * [operateEvents description]
 *
 * @type {Object} 格式化操作栏绑定事件
 */
window.operateEvents = {
    'click .edit': function (e, value, row, index) {
        modelFunc(row, '修改优惠策略', 2);
    },
    'click .remove': function (e, value, row, index) {
        deleteData(row, '确认要删除该记录吗?', 2);
    }
};

//修改弹出时赋值 table数据
function setControlValue(row) {
    $("#YHCLDM").attr("disabled", true);
    wn.setformEdit(row);
}

function deleteData(row, title, flag) {
    BootstrapDialog.confirm({
        title: '提示信息',
        message: title,
        type: BootstrapDialog.TYPE_WARNING,
        closable: true,
        draggable: true,
        btnCancelLabel: '否',
        btnOKLabel: '是',
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: 'yyhpt_yhsz.do?action=update',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        YHCLDM: row.YHCLDM,
                        //逻辑删除 将记录状态改为1
                        XT_JLZT: '1'
                    },
                    success: function (data) {
                        if (data.code == "T") {
                            wnform.toast(data.message);
                            $table.bootstrapTable('refresh');
                        } else {
                            wnform.toast(data.message);
                        }
                    }
                });
            }
        }
    });
}

$(window).resize(function () {
    var table = $('#table');
    var b = jQuery(window).width();
    if (b <= 600) {
        if (!mobileMode) {
            table.bootstrapTable("toggleView");
            mobileMode = true;
        }
    }
    else {
        if (mobileMode) {
            table.bootstrapTable("toggleView");
            mobileMode = false;
        }
    }
});

setTimeout(function () {
    $table.bootstrapTable('resetView');
}, 200);