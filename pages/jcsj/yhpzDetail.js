/*
 * Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
 */

/**
 * Created by gaozh on 2016/10/26 0026.
 */
var saveForm = function () {
    var submitData = function (t, mflag) {
        var form = $('#defaultForm');
        form.validate({
            errorElement: 'span',
            errorClass: 'help-clock help-clock-error',
            focusInvalid: false,
            ignore: '',
            messages: {
                YHCLDM: {
                    required: '优惠策略必填。'
                },
                YHCLMC: {
                    required: '优惠策略名称必填。'
                },
                KSRQ:{
                    required: '有效开始日期必填。'
                },
                JSRQ:{
                    required: '有效结束日期必填。'
                }
            },
            rules: {
                YHCLDM: {
                    required: true
                },
                YHCLMC: {
                    required: true
                },
                KSRQ:{
                    required: true
                },
                JSRQ:{
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
                var ksrq = $('#KSRQ').val();
                var jsrq = $('#JSRQ').val();
                if (ksrq != '' && jsrq != '' && jsrq < ksrq) {
                    wnform.toast('有效结束日期不可大于有效开始日期！');
                    return false;
                }
                var reg =/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
                if(!reg.test($('#YHZ').val())){
                    wnform.toast('优惠值请填写大于零的数字！');
                    $('#YHZ').focus();
                    return false;
                }
                var datas= wn.fillWithForm("defaultForm");
                datas = datas.replace("--请选择--","");
                datas = datas.replace("请选择","");
                var url = 'yyhpt_yhsz.do?action=insert';
                if (mflag == 2) {
                    url = 'yyhpt_yhsz.do?action=update'
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
            submitData(t, mflag);
        }
    };
}();


$(function () {
    if (flag == 2) {
        setControlValue(editRow);
    }
    $('.choose-date').datepicker({
        format: 'yyyy-mm-dd',
        weekStart: 1,
        autoclose: true,
        todayBtn: 'linked',
        language: 'zh-CN'
    }).on('changeDate', function (ev) {
    });
});
