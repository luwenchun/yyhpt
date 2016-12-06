/*
 * Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
 */

/**
 * Created by gaozh on 2016/10/25 0025.
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
        url: 'yyhpt_yyhc.do?action=list',
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
                MC: $('#mc').val()
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
            field: 'DM',
            title: '耗材代码'
        }, {
            field: 'MC',
            title: '耗材名称'
        }, {
            field: 'DW',
            title: '单位'
        }, /*{
            field: 'GG',
            title: '规格'
        },*/ {
            field: 'BZ',
            title: '备注'
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
        modelFunc(null, '新增医用耗材', 1);
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
        message: $('<div></div>').load('yyhpt_yyhc.do?action=add'),
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
            getyyhcXh(flag);
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
        modelFunc(row, '修改医用耗材', 2);
    },
    'click .remove': function (e, value, row, index) {
        deleteData(row, '确认要删除该记录吗?', 2);
    },
    'click .xhremove': function (e, value, row, index) {
        removeTr(row, 0);
    }
};

//修改弹出时赋值 table数据
function setControlValue(row) {
    //wn.setformEdit(row);
    $("#DM").val(row.DM);
    $("#DW").val(row.DW);
    $("#MC").val(row.MC);
    $("#BZ").val(row.BZ);
    $("#DM").attr("disabled", true);
    // var gg = row.GG;
    // if (gg != null && gg != undefined) {
    //     var ggs = gg.split(',');
    //     for (var i = 0; i < ggs.length; i++) {
    //         if (i > 0) {
    //             ggformAppend();
    //         }
    //         $('#gg-' + i + ' .ggtemp').val(ggs[i]);
    //     }
    // }
    // $('#GG').val('');
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
                    url: 'yyhpt_yyhc.do?action=hcxhupdate',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        DM: row.DM,
                        //逻辑删除 将记录状态改为1
                        JLZT: '1'
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


//表格高度固定
function setTableHeight(array) {
    return array.length * 31 + 60 >= 165 ? 168 : array.length * 31 + 60;
}

function getyyhcXh(flag) {
    $('#xhTable').bootstrapTable('removeAll');
    var norecord = $('#xhTable tbody tr.no-records-found');
    if(norecord != null && norecord != undefined){
        $('#xhTable tbody tr.no-records-found').remove();
    }

    if(flag == 2){
        $.ajax({
            url: 'yyhpt_yyhc.do?action=xhlist',
            type: 'POST',
            dataType: 'json',
            data: {
                DM: $('#DM').val()
            },
            success: function (data) {
                if(data != null && data.rows != null){
                    for (var i=0; i<data.rows.length; i++){
                        $('#xhTable').append(appendXhTable(i));
                        var row = data.rows[i];
                        $('#xhTable tbody tr[data-index='+i+']').children('td').children('input[name="XHDM"]').val(row.XHDM);
                        $('#xhTable tbody tr[data-index='+i+']').children('td').children('input[name="XHMC"]').val(row.XHMC);
                        $('#xhTable tbody tr[data-index='+i+']').children('td').children('input[name="XHDW"]').val(row.XHDW);
                        $('#xhTable tbody tr[data-index='+i+']').children('td').children('input[name="DJ"]').val(row.DJ);
                        $('#xhTable tbody tr[data-index='+i+']').children('td').children('input[name="XHBZ"]').val(row.BZ);
                    }
                    $('#xhTable').bootstrapTable('resetView', {height: setTableHeight(data.rows)});
                }else{
                    wnform.toast('获取耗材型号列表失败!');
                    return;
                }
            }
        })
    }
}

function removeTr(obj, index) {
    if(index != 0){
        var dataIndex = $(obj).parent().parent().attr('data-index');
        $('#xhTable tr[data-index='+ dataIndex +']').remove();
    } else {
        $('#xhTable tr[data-index="0"]').remove();
    }
    var trs = $('#xhTable tbody tr');
    $('#xhTable').bootstrapTable('resetView', {height: setTableHeight(trs)});
}

function appendXhTable(index) {
    if(index == null || index == undefined){
        index = Number(getMaxIndexNum()) + 1;
    }
    return '<tr data-index="'+ index +'">'+
        '<td style="text-align: center; vertical-align: middle; ">'+
        '<input type="text" class="form-control input-sm" name="XHDM" style="width: 100%;display: inline">'+
        '</td><td style="text-align: center; vertical-align: middle; ">'+
        '<input type="text" class="form-control input-sm" name="XHMC" style="width: 100%;display: inline">'+
        '</td><td style="text-align: center; vertical-align: middle; ">'+
        '<input type="text" class="form-control input-sm" name="XHDW" style="width: 100%;display: inline">'+
        '</td><td style="text-align: center; vertical-align: middle; ">'+
        '<input type="text" class="form-control input-sm" name="DJ" style="width: 100%;display: inline">'+
        '</td><td style="text-align: center; vertical-align: middle; ">'+
        '<input type="text" class="form-control input-sm" name="XHBZ" style="width: 100%;display: inline">'+
        '</td><td style="text-align: center; vertical-align: middle; width: 50px; ">'+
        '<a class="xhremove" href="javascript:void(0)" onclick="removeTr(this, 1)" title="删除"><i class="glyphicon glyphicon-remove"></i></a>'+
        '</td></tr>';
}

function getMaxIndexNum() {
    var maxIndex = 0;
    $('#xhTable tbody tr').each(function () {
        var index = Number($(this).attr('data-index'));
        if(index > maxIndex) {
            maxIndex = index;
        }
    });
    return maxIndex;
}
