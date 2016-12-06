/*
 * Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
 */

/**
 * Created by gaozh on 2016/10/26 0026.
 */
var mousepverFlag = false;
var saveForm = function () {
    var submitData = function (t, mflag) {
        var form = $('#defaultForm');
        form.validate({
            errorElement: 'span',
            errorClass: 'help-clock help-clock-error',
            focusInvalid: false,
            ignore: '',
            messages: {
                DM: {
                    required: '耗材代码必填。'
                },
                MC: {
                    required: '耗材名称必填。'
                }
                // DW: {
                //     required: '单位必填。'
                // }

            },
            rules: {
                DM: {
                    required: true
                },
                MC: {
                    required: true
                }
                // DW: {
                //     required: true
                // },
            },
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            invalidHandler: function (event, validator) {
                $('.alert-danger', $('.form-horizontal')).show();
            },

            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
            },
            submitHandler: function (form) {
                // var ggText = "";
                // var iscontain = false;
                // $('.ggtemp').each(function () {
                //     if($(this).val() != null && trim($(this).val()) != ''){
                //         if($(this).val().indexOf(",") >= 0){
                //             $.toaster({priority: 'warning', title: '提示', message: '规格请勿包含","(英文逗号)!'});
                //             $(this).focus();
                //             iscontain = true;
                //             return false;
                //         } else {
                //             ggText += $(this).val() + ",";
                //         }
                //     }
                // });
                // if(iscontain){
                //     return false;
                // }
                // if (ggText.indexOf(",") >= 0) {
                //     ggText = ggText.substring(0, ggText.length - 1);
                // }

                // $('input[name="GG"]').val(ggText);
                var xhList = new Array();
                var xhdmList = new Array();
                var isNull = false;
                var isMcNull = false;
                var isContain = false;
                var isDjNull = false;
                var isNum = true;
                var reg =/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
                $('#xhTable tbody tr').each(function () {
                    var xh = new Object();
                    xh.XHDM = $(this).children('td').children('input[name="XHDM"]').val();
                    if(xh.XHDM == null || trim(xh.XHDM) == '') {
                        isNull = true;
                        $(this).children('td').children('input[name="XHDM"]').focus();
                        return false;
                    }
                    for (var i=0; i<xhdmList.length; i++) {
                        if (trim(xhdmList[i]) == trim(xh.XHDM)) {
                            isContain = true;
                            $(this).children('td').children('input[name="XHDM"]').focus();
                            return false;
                        }
                    }
                    xhdmList.push(xh.XHDM);
                    xh.DJ = $(this).children('td').children('input[name="DJ"]').val();
                    if(xh.DJ == null || trim(xh.DJ) == '') {
                        isDjNull = true;
                        $(this).children('td').children('input[name="DJ"]').focus();
                        return false;
                    }
                    if (!reg.test(trim(xh.DJ))) {
                        isNum = false;
                        $(this).children('td').children('input[name="DJ"]').focus();
                        return false;
                    }
                    xh.XHMC = $(this).children('td').children('input[name="XHMC"]').val();
                    if(xh.XHMC == null || trim(xh.XHMC) == '') {
                        isMcNull = true;
                        $(this).children('td').children('input[name="XHMC"]').focus();
                        return false;
                    }
                    xh.XHDW = $(this).children('td').children('input[name="XHDW"]').val();
                    xh.XHBZ = $(this).children('td').children('input[name="XHBZ"]').val();
                    xhList.push(xh);
                });
                if(isNull){
                    $.toaster({priority: 'warning', title: '提示', message: '型号代码不可为空！'});
                    return false;
                }
                if(isContain){
                    $.toaster({priority: 'warning', title: '提示', message: '型号代码不可重复！'});
                    return false;
                }
                if(isDjNull){
                    $.toaster({priority: 'warning', title: '提示', message: '单价不可为空！'});
                    return false;
                }
                if(isMcNull){
                    $.toaster({priority: 'warning', title: '提示', message: '型号名称不可为空！'});
                    return false;
                }
                if(!isNum){
                    $.toaster({priority: 'warning', title: '提示', message: '请输入大于0的数字！'});
                    return false;
                }
                // var datas = wn.fillWithForm('defaultForm');
                var DM = $('#DM').val();
                var MC = $('#MC').val();
                var DW = $('#DW').val();
                var BZ = $('#BZ').val();
                var yyhc = new Object();
                yyhc.DM = DM;
                yyhc.MC = MC;
                yyhc.DW = DW;
                yyhc.BZ = BZ;
                yyhc.XH = xhList;
                var yyhcList = new Array();
                yyhcList.push(yyhc);

                var url = 'yyhpt_yyhc.do?action=hcxhinsert';
                if (mflag == 2) {
                    url = 'yyhpt_yyhc.do?action=hcxhupdate'
                }
                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        yyhc: JSON.stringify(yyhcList)
                    },
                    success: function (data) {
                        console.log(data);
                        if (data.code == "T") {
                            wnform.toast(data.message);
                            t.close();
                            $table.bootstrapTable('refresh');
                        } else {
                            wnform.toast(data.message);
                        }
                    }
                });
            }
        });
    };

    return {
        init: function (t, mflag) {
            submitData(t, mflag)
        }
    };
}();

$('.plus').on('click', function () {
    //ggformAppend();

});

function ggformAppend() {
    // if($('#gg-0 div:eq(0)').is(':hidden')){
    //     $('#gg-0 div:eq(0)').show();
    //     $('#gg-0 input[type="text"]').focus();
    // }else {
        var maxNum = getMaxNum();
        var commaFlag = false;
        for(var i=0; i<= Number(maxNum);i++){
            var ggTemp = $('#gg-' + i + ' input[type="text"]').val();
            if(ggTemp != null){
                if (ggTemp.indexOf(",") >= 0) {
                    $.toaster({priority: 'warning', title: '提示', message: '规格请勿包含","(英文逗号)!'});
                    $('#gg-' + i + ' input[type="text"]').focus();
                    commaFlag = true;
                    return false;
                }
            }
        }
        if(commaFlag){
            return false;
        }
        $('#ggform').append(
            '<div class="form-group col-md-6  col-xs-12" id="gg-' + (Number(maxNum) + 1) + '" >' +
            '<div class="col-md-10  col-xs-10">' +
            '<input type="text" class="form-control input-sm ggtemp" maxlength="50" placeholder=""' +
            'style="border-left:0px;border-top:0px;border-right:0px;"/>' +
            '</div>' +
            '<div class="col-md-1" style="padding-top: 6px;">' +
            '<a class="remove2" href="javascript:void(0)" data-toggle="modal" onclick="remove(this)" disabled title="删除">' +
            '<i class="glyphicon glyphicon-remove"></i>' +
            '</a>' +
            '</div>' +
            '</div>'
        );
        $('#gg-' + (Number(maxNum) + 1) + ' input[type="text"]').focus();
    // }
}

$('.remove2').on('click', function () {
    $(this).parent().parent().remove();
});

function remove(obj) {
    $(obj).parent().parent().remove();
    var maxNum = getMaxNum();
    if(maxNum != null && maxNum != undefined){
        $('#gg-' + (Number(maxNum)) + ' input[type="text"]').focus();
    }
}

$(function () {
    initTable();
    initButtons();
    $('input[name="GG"]').hide();
    //$('#gg-0 div:eq(0)').hide();
    if (flag == 2) {
        setControlValue(editRow);
    }
})

function getMaxNum() {
    var maxNum = 0;
    $('#ggform').children('div').each(function () {
        var id = $(this).attr('id');
        if (id != null) {
            var ids = id.split("-");
            if (ids.length >= 2) {
                var num = ids[1];
                if(Number(num) > Number(maxNum)){
                    maxNum = num;
                }
            }
        }
    });
    return maxNum;
}

//删除左右两端的空格
function trim(str){
    var res = str.replace(/(^\s*)|(\s*$)/g, '');
    return res;
}


function initTable() {
    var xhData = [{"XHDM":"","XHMC":"","XHDW":"","DJ":"","XHBZ":""}];
    //先销毁表格
    $('#xhTable').bootstrapTable('destroy');

    $('#xhTable').bootstrapTable({
        data: xhData,
        classes: 'table table-hover warning',
        iconSize: 'sm',
        showHeader: true,
        //height: setTableHeight(selectYYhc),
        striped: true, // 表格显示条纹
        search: false, // 是否启用查询
        showColumns: false, // 显示下拉框勾选要显示的列
        showRefresh: false, // 显示刷新按钮
        onlyInfoPagination: false,
        uniqueId: "index", // 每一行的唯一标识，一般为主键列
        clickToSelect: true, // 是否启用点击选中行
        minimumCountColumns: 2, // 最少允许的列数
        editable:true,
        responseHandler: function (res) {
            dictData = res;
            return res;
        },
        queryParamsType: "undefined",
        showPaginationSwitch: false,
        columns: [{
            field: 'index',
            title: '序号',
            formatter: function (value, row, index) {
                return index + 1;
            },
            align: 'center',
            visible:false
        },{
            field: 'XHDM',
            title: '型号代码',
            align: 'center',
            valign:'middle',
            formatter:function(value,row,rowIndex){
                return '<input type="text" class="form-control input-sm" name="XHDM" style="width: 100%;display: inline">';
            }
        }, {
            field: 'XHMC',
            title: '型号名称',
            align: 'center',
            valign:'middle',
            formatter:function(value,row,rowIndex){
                return '<input type="text" class="form-control input-sm" name="XHMC" style="width: 100%;display: inline">';
            }
        }, {
            field: 'XHDW',
            title: '型号单位',
            align: 'center',
            valign:'middle',
            formatter:function(value,row,rowIndex){
                return '<input type="text" class="form-control input-sm" name="XHDW" style="width: 100%;display: inline">';
            }
        },{
            field: 'DJ',
            title: '单价',
            align: 'center',
            valign:'middle',
            formatter:function(value,row,rowIndex){
                return '<input type="text" class="form-control input-sm" name="DJ" style="width: 100%;display: inline">';
            }
        },{
            field: 'XHBZ',
            title: '备注',
            align: 'center',
            valign:'middle',
            formatter:function(value,row,rowIndex){
                return '<input type="text" class="form-control input-sm" name="XHBZ" style="width: 100%;display: inline">';
            }
        }, {
            title: '操作',
            align: 'center',
            width: '50px',
            events: operateEvents,
            valign:'middle',
            formatter: xhOperateFormatter
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

function xhOperateFormatter(value, row, index) {
    return [
        '<a class="xhremove" href="javascript:void(0)" title="删除">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</a>'].join('');
}

function initButtons() {
    $('#plus').on('click', function () {
        // var len = $('#xhTable').bootstrapTable('getData').length;
        // $('#xhTable').bootstrapTable('append',{"XHDM":"","XHMC":"","XHDW":"","DJ":"","XHBZ":""});
        $('#xhTable').append(appendXhTable(null));
        var trs = $('#xhTable tbody tr');
        $('#xhTable').bootstrapTable('resetView', {height: setTableHeight(trs)})
    });
}
