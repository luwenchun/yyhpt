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
    <title>结案审核</title>
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
            <div class="col-md-4">
                <label class="control-label control-label-new col-md-5 col-xs-4">姓名：</label>
                <div class="control-label control-label-new  col-md-3" id="id_name" style="text-align:left;">
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
            <div class="col-md-4">
                <label class="control-label control-label-new col-md-5 col-xs-4 ">身份证号：</label>
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
<form id="id_review_form" method="post" class="form-horizontal">
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
                <label class="control-label col-md-2 col-xs-4">结案原因：</label>
                <div class="control-label col-md-10 col-xs-3" id="id_zzyy"
                     style="text-align:left;"></div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-2 col-xs-4">申请人员：</label>
                <div class="control-label col-md-3 col-xs-3" id="id_sqry"
                     style="text-align:left;"></div>
                <label class="control-label col-md-3 col-xs-9">申请日期：</label>
                <div class="col-md-2">
                    <input type="text" class="choose-date input-sm form-control "
                           name="apply_date" id="id_apply_date" title="申请日期" readonly="readonly">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">审核结果：</label>
                <div class="col-md-6">
                    <div class="div_icheck" id="id_review_result"></div>
                </div>
                <div class="col-md-3" id="id_shbtgyy_div" style="display: none">
                    <input id="id_shbtgyy" name="shbtgyy" type="text" maxlength="250" title="审核不通过原因必填"
                           style="width: 100%;height: 30px; border: 0px; border-bottom: 1px solid silver;">
                </div>
            </div>
            <div class="form-group" style="margin-top: 5px;">
                <label class="col-md-2 control-label">短信通知：</label>
                <div class="col-md-4"style="line-height: 30px; text-align: left;">
                    <input id="dxtz" type="checkbox" checked>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-2 col-xs-4">审核人员：</label>
                <div class="col-md-3">
                    <select class="form-control input-sm" id="shrgh" name="shrxm"></select>
                </div>
                <label class="control-label col-md-3 col-xs-4">审核日期：</label>
                <div class="col-md-2">
                    <input type="text" class="choose-date input-sm form-control "
                           name="review_date" id="id_review_date" title="审核日期" readonly="readonly"
                           style="background-color: white"></div>
            </div>


        </div>
    </div>
</form>
<!-- 申请信息结束 -->
<script>
    var oldShzt = ""; //修改前的审核状态

    var array = [{id: '1', text: '通过'}, {id: '0', text: '不通过'}];
    var changed = function (obj) {
        var strSelector = '#id_shbtgyy_div';
        if ($(obj).is(':checked')) {
            console.log($(obj).val());
            if ($(obj).val() == '0') {
                console.log($(strSelector));
                $('#id_shbtgyy').rules("add", {required: true});
                $(strSelector).show();
            }

        } else {
            $(strSelector).hide();
            $('#id_shbtgyy').rules("remove")
        }
    };
    $('#id_review_form').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error label-warning', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "",  // validate all fields including form hidden input
        messages: {},
        rules: {
            review_date: {required: true}
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
            var Url = "yyhpt_jagl.do?action=do_review";
            var shzt = $("input[name='isPassed']:checked").val();

            var newShzt = shzt === '0' ? '2' : shzt;
            //是否发送短信，0否 1是
            var sSffsdx = "0";
            //如果审核状态修改了且勾选了短信通知
            if(oldShzt != newShzt && document.getElementById("dxtz").checked == true){
                sSffsdx = "1";
            }
            $.ajax({
                url: Url,
                type: "post",
                dataType: "json",
                data: {
                    jalsh: mainSelectedRow.jalsh,
                    djlsh: mainSelectedRow.djlsh,
                    yngrbsh: mainSelectedRow.yngrbsh,
                    gldjdm: mainSelectedRow.gldjdm,
                    shrgh: $('#shrgh').val(),
                    shrxm: $('#shrgh').val() ? $("#shrgh").find("option:selected").text() : '',
                    shrq: $('#id_review_date').val(),
                    shzt: newShzt,
                    shbtgyy: shzt == '0' ? $('#id_shbtgyy').val() : '',
                    jayydm: mainSelectedRow.jayydm,
                    jayymc: mainSelectedRow.jayydm === '4' ? (mainSelectedRow.jayymc + '    ' + mainSelectedRow.jayysm) : mainSelectedRow.jayymc,
                    sffsdx:sSffsdx,
                    sjhm:$('#id_phone_number').text(),
                },
                success: function (data) {
                    console.log('success');
                    console.log(data);
                    if (data.code == "T") {
                        wnform.toast(data.message);
                        dialog.close();
                    }
                    else {
                        wnform.toast(data.message);
                        console.log(data.message)
                    }
                }
            });
        }
    });
    $(function () {
        initForm();
        getOperator();
    });

    function initForm() {

        $('#id_review_date').datepicker({
            autoclose: true,
            endDate: '0d'
        });
        //获取修改前审核状态
        oldShzt = mainSelectedRow.shzt;
        if (mainSelectedRow.shzt) {
            var shzt = mainSelectedRow.shzt === '2' ? '0' : mainSelectedRow.shzt;
            wn.iRadioByArrayWithChanged($('#id_review_result'), array, '', 'isPassed', 4, changed, shzt);
            if (mainSelectedRow.shzt === '2' || mainSelectedRow.shzt === '0') {
                $('#id_shbtgyy_div').show();
                $('#id_shbtgyy').rules("add", {required: true});

            }
        } else {
            wn.iRadioByArrayWithChanged($('#id_review_result'), array, '', 'isPassed', 4, changed, '1');
        }
        setPersonInfo(mainSelectedRow);
        setApplyInfo(mainSelectedRow);
        if (mainSelectedRow.shrq) {
            $('#id_review_date').val(mainSelectedRow.shrq);
        } else {
            $('#id_review_date').datepicker('update', new Date().format('yyyy-MM-dd'));
        }

    }

    function setPersonInfo(row) {
        console.log(row);
        $('#id_name').html(row.xm ? row.xm : '');
        $('#id_gender').html(row.xbmc ? row.xbmc : '');
        $('#id_identity_card').html(row.sfzh ? row.sfzh : '');
        $('#id_birthday').html(row.csrq ? jsGetAge(row.csrq) : '');
        $('#id_insurance_type').html(row.ylfyzffsmc ? row.ylfyzffsmc : '');
        $('#id_phone_number').html(row.lxdh ? row.lxdh : '');

    }

    function setApplyInfo(row) {
        $('#id_zzyy').html(row.jayydm === '4' ? (row.jayymc + '    ' + row.jayysm) : row.jayymc);
        $('#id_sqry').html(row.sqrxm);
        $('#id_apply_date').val(row.sqrq);
        $('#id_shbtgyy').val(row.shbtgyy);
    }

    function doSaveReview() {
        $('#id_review_form').submit();
    }

    function getOperator() {
        $.getJSON('common.do?action=getSysCzrylist', function (res) {
            wn.createSelectByCZRYArray($("#shrgh"), res.czrys);
            $("#shrgh").select2({language: 'zh-CN'});
            var rybm = '<%=session.getAttribute("rybm")%>';
            $('#shrgh').val(rybm).trigger("change");
            if (mainSelectedRow.shrgh) {
                $('#shrgh').val(mainSelectedRow.shrgh).trigger('change');
            }
        })
    }
</script>
</body>
</html>
