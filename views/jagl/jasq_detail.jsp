<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%--
  Created by IntelliJ IDEA.
  User: Edward
  Date: 2016/08/24
  Time: 15:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>结案申请</title>
    <style type="text/css">
        .choose-date {
            background: white url("layouts/img/control/img_rl.png") no-repeat scroll right center;
            cursor: pointer;
        }

        .form-horizontal .form-group {
            margin-right: -15px;
            margin-left: 0px;
        }

        .row {
            margin-right: 15px;
            margin-left: -15px;
        }

        .list-row-space {
            margin: 3px 0 3px 0;
        }

        /*小屏幕时lable的样式*/
        .control-label-new {
            padding-top: 6px;
            text-align: right;
            /*padding-left: 0px;*/
        }
    </style>
    <link href="layouts/css/white/detail_page.css" rel="stylesheet">
</head>
<body>
<!-- 个人基本信息开始-->
<div class="panel panel-default">
    <div class="panel-heading" style="height: 40px">
        <a data-toggle="collapse" data-parent="#accordion"
           href="#person_info_content">
            <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                <span class="glyphicon glyphicon-th"></span> 个人信息
            </h3>
        </a>
    </div>
    <div id="person_info_content" class="form-horizontal panel-collapse collapse in" style="margin-bottom: 8px">

        <div class="form-group nopadding" style="margin-top: 6px">
            <div class="col-md-5">
                <label class="control-label control-label-new col-md-4 col-xs-4">姓名：</label>
                <div class="col-md-8">
                    <div class="input-group  input-group-sm col-xs-8">
                        <input type="text" class="form-control" id="id_name_query" placeholder="" disabled>
                        <span class="input-group-btn">
						<button id="id_btn_name_query" class="btn btn-default btn-flat btn-sm " type="button">
                            <i class="fa fa-search"></i>
                        </button>
					</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-xs-12">
                <label class="col-md-6 col-xs-4 control-label control-label-new">性别：</label>
                <div class="col-md-6">
                    <p id="id_gender" class="form-control-static"></p>
                </div>
            </div>
            <div class="col-md-4 col-xs-12">
                <label class="col-md-6 col-xs-4  control-label control-label-new">年龄：</label>
                <div class="col-md-6">
                    <p id="id_birthday" class="form-control-static"></p>
                </div>

            </div>
        </div>
        <div class="form-group nopadding">
            <div class="col-md-5">
                <label class="control-label control-label-new col-md-4 col-xs-4 ">身份证号：</label>
                <div class="col-md-6 ">
                    <p id="id_identity_card" class="form-control-static"></p>
                </div>
            </div>
            <div class="col-md-3 col-xs-12">
                <label class="col-md-6 col-xs-4 control-label control-label-new">医保：</label>
                <div class="col-md-6">
                    <p id="id_insurance_type" class="form-control-static"></p>
                </div>
            </div>
            <div class="col-md-4">
                <label class="col-md-6 col-xs-4 control-label control-label-new">联系电话：</label>
                <div class="col-md-6">
                    <p id="id_phone_number" class="form-control-static"></p>
                </div>
            </div>
        </div>
        <div class="form-group ">
            <div class="col-md-2 col-xs-9">
                <button id="btn_EHR" class="btn btn-default btn-sm hidden"
                        style='margin-right: 20px; margin-top: 3px;'>调阅EHR明细
                </button>
            </div>
        </div>
    </div>
</div>
<!-- 个人基本信息结束 -->

<!-- 申请信息开始 -->
<form id="id_apply_form" method="post" class="form-horizontal" style="display: none">
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#id_apply_content">
                <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                    <span class="glyphicon glyphicon-th"></span> 申请信息
                </h3>
            </a>
        </div>
        <div id="id_apply_content" class="panel-collapse collapse in" style="margin-bottom: 8px">
            <br>
            <div class="form-group">
                <label class="col-md-2 control-label">结案原因：</label>
                <div class="col-md-7">
                    <div class="div_icheck" id="id_pause_reason"></div>
                </div>
                <div class="col-md-3" id="id_jayy" style="display: none">
                    <input id="id_jayysm" name="jayysm" type="text" maxlength="250"
                           style="width: 100%;height: 30px; border: 0px; border-bottom: 1px solid silver;">
                </div>
            </div>
            <br>
            <div class="form-group">
                <label class="control-label col-md-2 col-xs-4">申请人员：</label>
                <div class="col-md-3 ">
                    <select class="form-control input-sm" id="sqrgh" name="sqrxm"></select>
                </div>
                <label class="control-label col-md-3 col-xs-4">申请日期：</label>
                <div class="col-md-2">
                    <input type="text" class="choose-date input-sm form-control "
                           name="apply_date" id="id_apply_date" title="申请日期" readonly="readonly"
                           style="background-color: white"></div>
            </div>
        </div>
    </div>
</form>
<!-- 申请信息结束 -->
<script>
    var selectedRow = {};
    var changed = function (obj) {
        var strSelector = '#id_jayy';
        if ($(obj).is(':checked')) {
            if ($(obj).val() == '4') {
                $('#id_jayysm').rules("add", {required: true});
                $(strSelector).show();
            }

        } else {
            $(strSelector).hide();
            $('#id_jayysm').rules("remove")
        }
    };
    $('#id_apply_form').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error label-warning', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "",  // validate all fields including form hidden input
        messages: {
            apply_date: {
                required: "结案日期必填"
            }

        },
        rules: {
            apply_date: {
                required: true
            }
        },

        highlight: function (element) {
            $(element).addClass('has-error');
        },
        invalidHandler: function (event, validator) {
            $('.alert-danger', $('.form-horizontal')).show();
        },
        success: function (label) {
            label.closest('.form-group').removeClass('has-error'); // set success class to the control group
        },
        submitHandler: function (form) {
            var Url = "yyhpt_jagl.do?action=do_save";
            var jayydm = $("input[name='zzyymc']:checked").val();
            console.log('selectedRow.jalsh = ' + selectedRow.jalsh);
            $.ajax({
                url: Url,
                type: "post",
                dataType: "json",
                data: {
                    jalsh: selectedRow.jalsh ? selectedRow.jalsh : '',
                    djlsh: selectedRow.djlsh,
                    yngrbsh: selectedRow.yngrbsh,
                    gldjdm: selectedRow.gldjdm,
                    jayydm: jayydm,
                    jayysm: jayydm === '4' ? $('#id_jayysm').val() : '',
                    sqrgh: $('#sqrgh').val(),
                    sqrxm: $('#sqrgh').val() ? $("#sqrgh").find("option:selected").text() : '',
                    sqrq: $('#id_apply_date').val(),
                    shzt: '0'
                },
                success: function (data) {
                    if (data.code == "T") {
                        wnform.toast(data.message);
                        dialog.close();
                    }
                    else {
                        wnform.toast(data.message);
                    }
                }
            });
        }
    });
    $(function () {
        if (!mainSelectedRow) {
            $('#id_btn_name_query').on('click', function () {
                selectPatient();
            });
        } else {
            $('#id_btn_name_query').hide();
            $('#id_name_query').prop('disabled', true);
        }
        initForm();
        getDict();
        getOperator();
    });
    function initForm() {

        $('#id_apply_date').datepicker({
            autoclose: true,
            endDate: '0d'
        });
        if (mainSelectedRow) {
            console.log('mainSelectedRow=');
            console.log(mainSelectedRow);
            selectedRow.jalsh = mainSelectedRow.jalsh;
            selectedRow.djlsh = mainSelectedRow.djlsh;
            selectedRow.yngrbsh = mainSelectedRow.yngrbsh;
            selectedRow.gldjdm = mainSelectedRow.gldjdm;
            $('#id_apply_date').val(mainSelectedRow.sqrq);
            if (mainSelectedRow.jayydm === '4') {
                $('#id_jayy').show();
            }
            $('#id_jayysm').val(mainSelectedRow.jayysm);
            showApplyInfo();
            setPersonInfo(mainSelectedRow);
        } else {
            $('#id_apply_date').datepicker('update', new Date().format('yyyy-MM-dd'));
        }

    }
    function selectPatient() {
        BootstrapDialog.show({
            title: '',
            size: BootstrapDialog.SIZE_LARGE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/jagl/patient_select.jsp'),
            buttons: [
                {
                    label: '确定',
                    cssClass: 'btn-default btn-sm',
                    action: function (dialog) {
                        var selects = $("#table_patient").bootstrapTable('getSelections');
                        if (selects.length > 0) {
                            selectedRow = selects[0];
                            setPersonInfo(selectedRow);
                            showApplyInfo();
                        }
                        dialog.close();
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
                table.bootstrapTable("refresh");
            }
        });
    }
    function setPersonInfo(row) {
        $('#id_name_query').val(row.xm ? row.xm : '');
        $('#id_gender').html(row.xbmc ? row.xbmc : '');
        $('#id_identity_card').html(row.sfzh ? row.sfzh : '');
        $('#id_birthday').html(row.csrq ? jsGetAge(row.csrq) : '');
        $('#id_insurance_type').html(row.ylfyzffsmc ? row.ylfyzffsmc : '');
        $('#id_phone_number').html(row.lxdh ? row.lxdh : '');

    }
    function showApplyInfo() {
        $('#id_apply_form').show();
        $("#id_apply_save").show();
    }
    function getDict() {
        $.getJSON('yyhpt_jagl.do?action=get_dict', function (res) {
            wn.iRadioByArrayWithChanged($('#id_pause_reason'), res, 'zzyydm', 'zzyymc', 3, changed, '1');
            if (mainSelectedRow) {
                wn.iRadioByArrayWithChanged($('#id_pause_reason'), res, 'zzyydm', 'zzyymc', 3, changed, mainSelectedRow.jayydm);
            }
        })
    }
    function doSave() {
        $('#id_apply_form').submit();
    }
    function getOperator() {
        $.getJSON('common.do?action=getSysCzrylist', function (res) {
            wn.createSelectByCZRYArray($("#sqrgh"), res.czrys);
            $("#sqrgh").select2({language: 'zh-CN'});
            var rybm = '<%=session.getAttribute("rybm")%>';
            $('#sqrgh').val(rybm).trigger("change");
            if (mainSelectedRow) {
                $('#sqrgh').val(mainSelectedRow.sqrgh).trigger('change');
            }
        })
    }

</script>
</body>
</html>
