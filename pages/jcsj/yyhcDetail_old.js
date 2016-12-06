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
                },
                DW: {
                    required: '单位必填。'
                },
                DJ: {
                    required: '单价必填。'
                }
            },
            rules: {
                DM: {
                    required: true
                },
                MC: {
                    required: true
                },
                DW: {
                    required: true
                },
                DJ: {
                    required: true
                }
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
                var reg =/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
                if(!reg.test($('#DJ').val())){
                    $.toaster({priority: 'warning', title: '提示', message: '单价请填写大于0的数字！'});
                    $('#DJ').focus();
                    return false;
                }
                var ggText = "";
                var iscontain = false;
                $('.ggtemp').each(function () {
                    if($(this).val() != null && trim($(this).val()) != ''){
                        if($(this).val().indexOf(",") >= 0){
                            $.toaster({priority: 'warning', title: '提示', message: '规格请勿包含","(英文逗号)!'});
                            $(this).focus();
                            iscontain = true;
                            return false;
                        } else {
                            ggText += $(this).val() + ",";
                        }
                    }
                });
                if(iscontain){
                    return false;
                }
                if (ggText.indexOf(",") >= 0) {
                    ggText = ggText.substring(0, ggText.length - 1);
                }
                $('input[name="GG"]').val(ggText);
                var datas = wn.fillWithForm('defaultForm');
                var url = 'yyhpt_yyhc.do?action=insert';
                if (mflag == 2) {
                    url = 'yyhpt_yyhc.do?action=update'
                }
                $.ajax({
                    url: url,
                    type: 'get',
                    dataType: 'json',
                    data: datas,
                    success: function (data) {
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
    ggformAppend();

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