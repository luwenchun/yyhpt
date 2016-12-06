<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <style type="text/css">
        .list-row-space {
            margin: 3px 0 3px 0;
        }

        .choose-date {
            background: url("layouts/img/control/img_rl.png") no-repeat scroll right center transparent;
            cursor: pointer;
        }

        .form-control.has-error {
            border-color: #dd4b39;
            box-shadow: none;
        }

        .cjrq-error {
            border-color: #dd4b39;
        }
    </style>
</head>
<body>
<form id="defaultForm" method="post" class="form-horizontal ">
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="form-group ">
                <label class="col-md-2 control-label">机构名称：</label>
                <div class="col-md-4">
                    <select class="form-control  input-sm " name="jgmc" id="jgmc"></select>
                </div>
            </div>
        </div>
    </div>

    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">床位占用信息设置</h3>
        </div>
        <div class="panel-body">
            <div class="form-group col-md-12 list-row-space">
                <label class="col-md-2 control-label">总床位：</label>
                <div class="col-md-2">
                    <input type="number" class="form-control input-sm" id="zcw" name="zcw" min="0">
                </div>
                <label class="col-md-2 control-label">采集日期：</label>
                <div class="col-md-3">
                    <input type="text" class="form-control input-sm choose-date" id="cjrq" name="cjrq" readonly>
                </div>
            </div>
            <div class="form-group col-md-12 list-row-space">
                <label class="col-md-2 control-label">实际开放总床位：</label>
                <div class="col-md-2">
                    <input type="number" class="form-control input-sm" id="kfsjzcw" name="kfsjzcw" min="0">
                </div>
                <label class="col-md-2 control-label">占用开放总床位：</label>
                <div class="col-md-2">
                    <input type="number" class="form-control input-sm" id="kfzyzcw" name="kfzyzcw" min="0">
                </div>
                <label class="col-md-2 control-label">空余开放总床位：</label>
                <div class="col-md-2">
                    <input type="number" class="form-control input-sm" id="kfkyzcw" name="kfkyzcw" min="0">
                </div>
            </div>
            <div class="form-group col-md-12 list-row-space">
                <label class="col-md-2 control-label nopadding">实际开放养老总床位：</label>
                <div class="col-md-2">
                    <input type="number" class="form-control input-sm" id="ylsjkfzcw" name="ylsjkfzcw" min="0">
                </div>
                <label class="col-md-2 control-label nopadding">占用开放养老总床位：</label>
                <div class="col-md-2">
                    <input type="number" class="form-control input-sm" id="ylzykfzcw" name="ylzykfzcw" min="0">
                </div>
                <label class="col-md-2 control-label nopadding">空余开放养老总床位：</label>
                <div class="col-md-2">
                    <input type="number" class="form-control input-sm" id="ylkyzcw" name="ylkyzcw" min="0">
                </div>
            </div>
        </div>
    </div>
</form>
<script>
    // basic validation 1=新增 2=修改
    $('#defaultForm').validate({
        errorElement: 'span', // default input error message container
        errorClass: 'help-block help-block-error', // default input error
                                                   // message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        messages: {
            cjrq: {required: "采集日期必填"},
        },
        rules: {
            zcw: {required: true},
            kfsjzcw: {required: true},
            kfzyzcw: {required: true},
            kfkyzcw: {required: true},
            ylsjkfzcw: {required: true},
            ylzykfzcw: {required: true},
            ylkyzcw: {required: true}
        },

        highlight: function (element) { // hightlight error inputs
            $(element).closest('.form-control').addClass('has-error');
        },

        invalidHandler: function (event, validator) {
            $('.alert-danger', $('.form-horizontal')).show();
        },

        success: function (label) {
            label.closest('.form-control').removeClass('has-error');
        },

        submitHandler: function () {
            var zcw = $('#zcw').val();                          //  总床位
            var kfsjzcw = $('#kfsjzcw').val();                  //实际开放总床位
            var kfzyzcw = $('#kfzyzcw').val();                  //占用开放总床位
            var kfkyzcw = $('#kfkyzcw').val();                  //空余开放总床位
            var ylsjkfzcw = $('#ylsjkfzcw').val();              //养老实际开放
            var ylzykfzcw = $('#ylzykfzcw').val();              //养老占用开放
            var ylkyzcw = $('#ylkyzcw').val();                  //养老空余

            if (parseInt(zcw) < parseInt(kfsjzcw) || parseInt(zcw) < parseInt(ylsjkfzcw)) {
                wnform.toast('开放床位数不能大于总床位数!')
                return false;
            }
            if (parseInt(kfsjzcw) < parseInt(kfzyzcw) || parseInt(ylsjkfzcw) < parseInt(ylzykfzcw)) {
                wnform.toast('占用床位数不能大于开放床位数!')
                return false;
            }
            if (parseInt(kfsjzcw) < parseInt(kfkyzcw) || parseInt(ylsjkfzcw) < parseInt(ylkyzcw)) {
                wnform.toast('空余床位数不能大于开放床位数!')
                return false;
            }if ((parseInt(kfzyzcw) + parseInt(kfkyzcw)) != parseInt(kfsjzcw) || parseInt(ylkyzcw) + parseInt(ylzykfzcw) != parseInt(ylsjkfzcw)) {
                wnform.toast('空余床位数与占用床位数之和与开放总床位不符!')
                return false;
            }



            var Url = "yyhpt_jgcwzyxx.do?action=insert", $add = $('#add'),
                    mflag = $add.data('flag'), dialog = $add.data('dialog');
            if (mflag == 2)
                Url = "yyhpt_jgcwzyxx.do?action=update";
            $.ajax({
                url: Url,
                type: "post",
                dataType: "json",
                data: {
                    jgbm: $('#jgmc').val(),
                    jgmc: $('#jgmc').text(),
                    zcw: $('#zcw').val(),
                    cjrq: $('#cjrq').val(),
                    kfsjzcw: $('#kfsjzcw').val(),
                    kfzyzcw: $('#kfzyzcw').val(),
                    kfkyzcw: $('#kfkyzcw').val(),
                    ylsjkfzcw: $('#ylsjkfzcw').val(),
                    ylzykfzcw: $('#ylzykfzcw').val(),
                    ylkyzcw: $('#ylkyzcw').val()
                },
                success: function (data) {
                    if (data.code === "T") {
                        wnform.toast(data.message);
                        dialog.close();
                        $table.bootstrapTable('refresh');
                    } else {
                        wnform.toast(data.message);
                    }
                }
            });
        }
    });
    $(function () {
        $('#cjrq').datepicker({
            format: 'yyyy-mm-dd',
            weekStart: 1,
            autoclose: true,
            todayBtn: 'linked',
            language: 'zh-CN'
        })
        $('#cjrq').val(new Date().format('yyyy-MM-dd'));
        getJgInfo();
    });

    function getJgInfo() {
        $.ajax({
            url: 'yyhpt_jgcwzyxx.do?action=getLoginJgInfo',
            dataType: 'json',
            type: 'post',
            data: {},
            success: function (res) {
                $('#jgmc').select2({
                    language: 'zh-CN',
                    data: res.list,
                    allowClear: false,
                    multiple: false
                }).val(res.currentDept.jgbm).trigger('change');

                if (flag == 2) {
                    wn.setformEdit(editRow);
                    $('#jgmc').val(editRow.jgbm).trigger('change');
                    $('#cjrq').attr('disabled', true);
                }
            }
        });
    }


</script>
</body>
</html>