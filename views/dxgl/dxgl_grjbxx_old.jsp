<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%--
  Created by IntelliJ IDEA.
  User: Edward
  Date: 2016/07/13
  Time: 14:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>个人基本信息管理</title>

    <link href="layouts/css/white/detail_page.css" rel="stylesheet">
    <link href="frame/css/extra.css" rel="stylesheet">
    <link href="frame/css/components.min.css" rel="stylesheet"
          type="text/css"/>
    <link href="frame/plugins/bootstrap-fileinput/bootstrap-fileinput.css"
          rel="stylesheet" type="text/css"/>
    <script src="frame/plugins/bootstrap-fileinput/bootstrap-fileinput-img.js"
            type="text/javascript"></script>
    <style type="text/css">
        .radio-container {
            padding-left: 8px;
        }

        .head-title {
            margin-top: 0px;
            margin-bottom: 0px;
            font-weight: bold;
            font-size: 20px;
            color: #000000;
        }

        .choose-date {
            background: url("layouts/img/control/img_rl.png") no-repeat scroll right center transparent;
            cursor: pointer;
        }

        .kv-avatar .file-preview-frame, .kv-avatar .file-preview-frame:hover {
            margin: 0;
            padding: 0;
            border: none;
            box-shadow: none;
            text-align: center;
        }

        .kv-avatar .file-input {
            display: table-cell;
            max-width: 220px;
        }

        .image-title {
            text-align: center;
        }
    </style>
    <link rel="stylesheet"
          href="frame/plugins/city-picker/css/city-picker.css">
    <script src="frame/plugins/city-picker/city-picker.data.js"></script>
    <script src="frame/plugins/city-picker/city-picker.js"></script>
</head>
<body>
<div class="container-fluid" style="padding-bottom: 15px">
    <div class="row">
        <div class="col-md-1 col-xs-1">
            <button class="btn btn-default btn-flat btn-sm" id="id_btn_print"
                    type="button">打印
            </button>
        </div>
        <div class="col-xs-offset-4 col-md-offset-9 col-lg-offset-10 ">
            <button class="btn btn-default btn-flat btn-sm col-md-offset-3"
                    id="id_btn_save" type="button">保存
            </button>
            <button class="btn btn-default btn-flat btn-sm" id="id_btn_exit"
                    type="button">退出
            </button>
        </div>
    </div>
</div>
<form class="form-horizontal" id="id_info"
      enctype="multipart/form-data" role="form">
    <div class="panel panel-default" style="padding: 15px">
        <div class="col-md-10 ">
            <div class="form-group" style="padding-bottom: 8px">
                <label class="control-label col-md-1">姓名:</label>
                <div class="col-md-2">
                    <input class="form-control input-sm" id="id_xm" type="text"
                           name="xm" title="姓名" maxlength="10">
                </div>
                <div class="col-md-2">
                    <select class="form-control input-sm" id="id_klx" name="klx"
                            title="卡类型"></select>
                </div>
                <%--<label class="control-label col-md-1" style="width: 0%; padding-left: 0;">:</label>--%>
                <div class="col-md-3">
                    <input class="form-control input-sm" id="id_zjhm" type="text"
                           name="zjhm" maxlength="60">
                </div>
                <div class="col-md-3 col-md-offset-1">
                    <button class="btn btn-default btn-flat btn-sm" id="id_btn_read"
                            type="button">读卡
                    </button>
                    <button class="btn btn-default btn-flat btn-sm" id="id_btn_query"
                            type="button">查询
                    </button>
                </div>
            </div>
            <div class="form-group" style="padding-bottom: 8px">
                <label class="control-label col-md-1">性别:</label>
                <div class="col-md-5 div_icheck" id="id_gender">
                    <%--<select class="form-control input-sm" id="gender" title="gender"></select>--%>
                </div>
                <label class="control-label col-md-2 col-md-offset-2">出生日期:</label>
                <div class="col-md-2">
                    <input class="form-control input-sm choose-date" id="id_csrq"
                           type="text" name="csrq" title="出生日期" readonly="readonly"
                           style="background-color: white">
                </div>

            </div>
            <div class="form-group" style="padding-bottom: 8px">

                <label class="control-label col-md-1">国籍:</label>
                <div class="col-md-2">
                    <select class="form-control input-sm" id="gjdm" name="gjmc"
                            title="国籍"></select>
                </div>
                <div class="col-md-2">
                    <select class="form-control input-sm" id="id_insurance_card"
                            name="card" title="card"></select>
                </div>
                <%--<label class="control-label col-md-1" style="width: 0%; padding-left: 0">:</label>--%>
                <div class="col-md-3">
                    <input class="form-control input-sm" id="id_insurance_card_value"
                           type="text" name="card_value" title="卡号">
                </div>

                <label class="control-label col-md-1 col-md-offset-1">职业:</label>
                <div class="col-md-2">
                    <select class="form-control input-sm" id="zydm" name="zymc"
                            title="职业"></select>
                </div>


            </div>
            <div class="form-group" style="padding-bottom: 8px">
                <label class="control-label col-md-1">民族:</label>
                <div class="col-md-2">
                    <select class="form-control input-sm" id="mzdm" name="mzmc"
                            title="民族"></select>
                </div>
                <label class="control-label col-md-2">联系电话:</label>
                <div class="col-md-3">
                    <input class="form-control input-sm" id="id_dhhm" type="tel"
                           name="dhhm" maxlength="15">
                </div>
                <label class="control-label col-md-1 col-md-offset-1">手机号码:</label>
                <div class="col-md-2">
                    <input class="form-control input-sm" type="tel" id="id_sjhm"
                           name="sjhm" maxlength="15">
                </div>
            </div>
            <div class="form-group" style="padding-bottom: 8px">
                <label class="control-label col-md-1">居住地址:</label>
                <div class="col-md-8">
                    <%--<input class="form-control input-sm" id="id_jzdxxdz" type="text" name="jzdxxdz"--%>
                    <%--onclick="selectCity('residence')">--%>
                    <div class="col-md-9 no-padding">
                        <input id="id_jzdxxdz" type="text" name="jzdxxdz" readonly
                               style="width: 99%">
                    </div>
                    <div class="col-md-3 no-padding">
                        <input id="id_jzds" name="jzds" type="text" maxlength="5"
                               style="width: 70%; height: 30px; border: 0px; border-bottom: 1px solid silver;">
                        <button class="btn btn-default btn-flat btn-sm"
                                id="id_jzdxxdz_copy" type="button">
                            <i class="fa fa-copy"></i>
                        </button>
                    </div>
                </div>
                <label class="control-label  col-md-1">居住邮编:</label>
                <div class="col-md-2">
                    <input class="form-control input-sm" id="id_jzdyzbm" type="text"
                           name="jzdyzbm" maxlength="6">
                </div>
            </div>
            <div class="form-group" style="padding-bottom: 8px">
                <label class="control-label col-md-1">户口地址:</label>
                <div class="col-md-8">
                    <%--<input class="form-control input-sm" type="text" id="id_hjdxxdz" name="hjdxxdz" title="户口地址"--%>
                    <%--onclick="selectCity('permanent')">--%>
                    <div class="col-md-9 no-padding">
                        <input type="text" id="id_hjdxxdz" name="hjdxxdz" title="户口地址"
                               readonly style="width: 99%;">
                    </div>
                    <div class="col-md-3 no-padding">
                        <input id="id_hjds" name="hjds" type="text" maxlength="5"
                               style="width: 70%; height: 30px; border: 0px; border-bottom: 1px solid silver;">
                        <button class="btn btn-default btn-flat btn-sm"
                                id="id_hjdxxdz_copy" type="button">
                            <i class="fa fa-copy"></i>
                        </button>
                    </div>
                </div>
                <label class="control-label  col-md-1">户口邮编:</label>
                <div class="col-md-2">
                    <input class="form-control input-sm" id="id_hjdyzbm" type="text"
                           name="hjdyzbm" maxlength="6">
                </div>
                <%--<label class="control-label col-md-1 col-md-offset-1">常住类型:</label>--%>
                <%--<div class="col-md-2">--%>
                <%--<select class="form-control input-sm" id="id_permanent_type" name="major" title="常住类型"></select>--%>
                <%--</div>--%>
            </div>
            <div class="form-group">
                <label class="control-label col-md-1" style="padding-left: 0px;">联系人关系:</label>
                <div class="col-md-2">
                    <select class="form-control input-sm" id="gxdm" name="gxmc"
                            title="联系人关系"></select>
                </div>
                <label class="control-label col-md-1" style="padding-left: 0px;">联系人姓名:</label>
                <div class="col-md-2">
                    <input class="form-control input-sm" type="text" id="id_lxr_xm"
                           name="lxrxm" title="联系人姓名" maxlength="10">
                </div>
                <label class="control-label col-md-1" style="padding-left: 0px;">联系人电话:</label>
                <div class="col-md-2">
                    <input class="form-control input-sm" id="id_lxr_dhhm" type="tel"
                           name="lxr_dhhm" maxlength="15">
                </div>
                <label class="control-label col-md-1" style="padding-left: 0px;">联系人手机:</label>
                <div class="col-md-2">
                    <input class="form-control input-sm" id="id_lxr_sjhm" type="tel"
                           name="lxr_sjhm" maxlength="15">
                </div>
            </div>

        </div>

        <div class="col-md-2 hidden-xs">
            <div class="form-group">
                <div class="fileinput fileinput-new" data-provides="fileinput">
                    <div class="fileinput-preview thumbnail" data-trigger="fileinput"
                         style="height: 220px; width: 160px;">
                        <img class="img-rounded carousel-inner img-responsive"
                             id="id_image" src="layouts/img/dialog/avator.jpg" alt=""/>
                    </div>
                    <div>
								<span class="btn btn-sm btn-default  btn-file"> <span
                                        class="fileinput-new"> 选择 </span> <span
                                        class="fileinput-exists"> 重选 </span> <input type="file"
                                                                                    name="image">

								</span> <a href="javascript:;" class="btn btn-sm red fileinput-exists"
                                           data-dismiss="fileinput">
                        <button class="btn btn-sm btn-default" type="button">删除</button>
                    </a>
                        <button class="btn btn-sm btn-default" type="button">拍照</button>

                    </div>
                </div>

            </div>

            <%--<div class="kv-avatar center-block" style="width:200px">--%>
            <%--<input id="avatar-2" name="avatar-2" type="file" class="file-loading">--%>
            <%--</div>--%>
            <%--<img class="img-rounded carousel-inner img-responsive" id="id_image" src="images/avator.jpg">--%>
            <%--<button class="btn btn-default btn-flat btn-sm col-md-offset-1" id="id_btn_shot" type="button">拍照--%>
            <%--</button>--%>
            <%--<button class="btn btn-default btn-flat btn-sm col-md-offset-3" id="id_btn_upload" type="button">上传--%>
            <%--</button>--%>

        </div>

        <div class="form-group" style="padding-bottom: 8px">
            <div class="col-md-10">
                <label class="control-label col-md-1">血型:</label>
                <div class="col-md-5 div_icheck" id="id_blood_type">
                    <%--<input class="form-control input-sm" type="text" name="major" title="major">--%>
                </div>
                <label class="control-label col-md-2">RH阴性:</label>
                <div class="col-md-4 div_icheck" id="id_RH_blood_type">
                    <%--<input class="form-control input-sm" type="text" name="major" title="major">--%>
                </div>
            </div>
        </div>
        <div class="form-group" style="padding-bottom: 8px">
            <label class="control-label col-md-1">文化程度:</label>
            <%--<input class="form-control input-sm" type="text" name="major" title="major">--%>
            <div class="col-md-10" id="id_education">
                <div class="col-md-3" style="padding-left: 0">
                    <select class="form-control input-sm" id="whcddm" name="whcdmc"
                            title="常住类型"></select>
                </div>
            </div>
        </div>
        <div class="form-group" style="padding-bottom: 8px">
            <label class="control-label col-md-1">婚姻状况:</label>
            <div class="col-md-10 div_icheck" id="id_marital_status">
                <%--<input class="form-control input-sm" type="text" name="major" title="major">--%>
            </div>
        </div>
        <div class="form-group" style="padding-bottom: 8px">
            <label class="control-label col-md-1">医疗支付:</label>
            <div class="col-md-10 div_icheck" id="id_insurance_type">
                <%--<input class="form-control input-sm" type="text" name="major" title="major">--%>
            </div>
        </div>
        <%--			<div class="form-group" style="padding-bottom: 8px">
                        <label class="control-label col-md-1 nopadding">医养管理等级:</label>
                        <div class="col-md-10">
                            <div class="col-md-3">
                                <p id="id_gldjmc" style="color: #434343;text-align: left;
                                font-size: 14px; margin-top: 8px;"></p>
                            </div>
                        </div>
                    </div>--%>
    </div>
</form>
<form class="form-horizontal" id="id_zp"
      enctype="multipart/form-data" role="form">

</form>
</body>
<script type="text/javascript">
    //基础数据
    var basicData = {};
    var ffff;
    var permanent = [{
        id: '01',
        text: '户籍'
    }, {
        id: '02',
        text: '久居'
    }];
    // 省市联动返回数据
    var local2Save;
    // 户籍地址
    var permanentAddress = '';
    // 居住地址
    var residentAddress = '';
    // 域内个人标识号
    var yngrbsh = '';

    var validateOption = {
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error label-warning', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        messages: {
            xm: {
                required: "姓名必填"
            },
            zjhm: {
                required: '证件号码必填'
            },
            csrq: {
                required: '出生日期必填'
            }
        },
        rules: {
            xm: {
                required: true
            },
            zjhm: {
                required: true,
                isIdCardNo: true
            },
            sjhm: {
                isPhone: true
            },
            dhhm: {
                isPhone: true
            },
            lxr_dhhm: {
                isPhone: true
            },
            lxr_sjhm: {
                isPhone: true
            },
            hjdyzbm: {
                isZipCode: true
            },
            jzdyzbm: {
                isZipCode: true
            },
            csrq: {
                required: true
            }

        },

        // highLight error inputs
        highlight: function (element) {
            // set error class to the control group
            $(element).addClass('has-error');
            //                    $(element).closest('.form-group').addClass('has-error');
        },

        invalidHandler: function (event, validator) {
            //display error alert on form submit
            $('.alert-danger', $('.form-horizontal')).show();
        },
        success: function (label) {
            label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            label.removeClass('help-block help-block-error label-warning');
        },
        submitHandler: function (form) {
            console.log('flag: ' + flag);
            var jzd = $('#id_jzdxxdz');
            var hjd = $('#id_hjdxxdz');
            jzd.val(jzd.val() + $('#id_jzds').val());
            hjd.val(hjd.val() + $('#id_hjds').val());
            simplifyAddress(jzd);
            simplifyAddress(hjd);
            var data = wn.fillWithForm("id_info");
            if (yngrbsh === '') {
                data += '&yngrbsh=' + guid();
                //    //数据来源 01：医养登记；02：民政导入
                data += '&sjly=' + '01';
            } else {
                data += '&yngrbsh=' + yngrbsh;
            }
            data += permanentAddress;
            data += residentAddress;
            var Url = "personal_info.do?action=save_data";
            if (flag == 'edit') {
                Url = "personal_info.do?action=update_data";
            }
            var formData = new FormData($('#id_zp')[0]);

            formData.append("file", document.getElementsByName("image")[0].files[0]);

            event.preventDefault();
            $.ajax({
                url: Url + '&' + data,
                type: "post",
                dataType: "json",
                contentType: false,
                processData: false,
                data: formData, //.get("image").result
                success: function (data) {
                    if (data[0].code == "T") {
                        wnform.toast(data[0].message);
                        dialog.close();
                    } else {
                        wnform.toast(data[0].message);
                    }
                }
            });
        }
    };

    var validator = $('#id_info').validate(validateOption);

    var t_begin;

    $(function () {
        initButtons();
        getDictData();
        $('#id_csrq').datepicker({
            autoclose: true,
            startView: 'decade',
            endDate: '0d'
        });

        $('#id_zjhm').on('blur', function () {
            var sfzhm = $('#id_zjhm').val();
            var getDateStr = '';
            var _y, _m, _d;
            if (sfzhm.length == 18) {
                getDateStr = sfzhm.substr(6, 8);
                _y = getDateStr.substr(0, 4);
                _m = getDateStr.substr(4, 2);
                _d = getDateStr.substr(6, 2);
                console.log(new Date(_y + ' ' + _m + ' ' + _d).format('yyyy-MM-dd'))
                $('#id_csrq').datepicker('update', new Date(_y + ' ' + _m + ' ' + _d).format('yyyy-MM-dd'));
            }
        });
    });

    function getDictData() {
        $.ajax({
            url: "personal_info.do?action=dict_data",
            type: "post",
            dataType: "json",
            data: {},
            beforeSend: function () {
                //                wn.showLoading();
            },
            success: function (res) {
                basicData = res;
                initSelector();
                initRadio();
                if (flag === 'add') {
                    setDefaultLocation();
                }
                if (flag === "edit") {

                    yngrbsh = editRow.yngrbsh;
                    getDetailInfo(yngrbsh);
                    t_begin = new Date();
                    if (editRow.gjdm == null || editRow.gjdm === '') {
                        editRow.gjdm = '156';
                    }
                    if (editRow.grzp) {
                        $("#id_image").prop('src', 'avatar/' + editRow.grzp);
                    }
                    console.log(editRow);
                    initForm(editRow);
                    console.log('消耗时间');
                    console.log((new Date()) - t_begin);
                    initAddress(editRow);
                }
            },
            complete: function () {
                //                wn.hiddenLoading();
            }

        });
    }

    function initSelector() {
        console.log(basicData.cards)
        $('#id_klx').select2({
            language: 'zh-CN',
            data: basicData.cards,
            allowClear: false,
            multiple: false,
            //            maximumSelectionLength: 12,
            //            minimumResultsForSearch: Infinity
        }).on("change", function (e) {
            var zjhm = $('#id_zjhm');
            console.log("change :" + e.target.value);
            if (e.target.value && e.target.value != '01') {
                $('#id_zjhm-error').hide();
                zjhm.rules("remove");
                zjhm.rules("add", {
                    required: true
                });
            } else {
                zjhm.rules("add", {
                    required: true,
                    isIdCardNo: true
                });
            }
        });

        $('#mzdm').select2({
            language: 'zh-CN',
            data: basicData.nation,
            allowClear: false,
            multiple: false,
            //            maximumSelectionLength: 12,
            //            minimumResultsForSearch: Infinity
        });

        $('#gxdm').select2({
            language: 'zh-CN',
            data: basicData.guardian,
            allowClear: false,
            multiple: false,
            //            maximumSelectionLength: 12,
            //            minimumResultsForSearch: Infinity
        });
        $('#id_insurance_card').select2({
            language: 'zh-CN',
            data: basicData.insuranceCards,
            allowClear: false,
            multiple: false,
            //            maximumSelectionLength: 12,
            //            minimumResultsForSearch: Infinity
        });

        $('#zydm').select2({
            language: 'zh-CN',
            data: basicData.major,
            allowClear: false,
            multiple: false,
            //            maximumSelectionLength: 12,
            //            minimumResultsForSearch: Infinity
        });
        $('#gjdm').select2({
            language: 'zh-CN',
            data: basicData.citizenship,
            allowClear: false,
            multiple: false,
            //            maximumSelectionLength: 12,
            //            minimumResultsForSearch: Infinity
        });
        //默认选中中国
        //        $('#gjdm').select2("val", "156"); //select2 3.5用法
        $('#gjdm').val("156").trigger("change");
        $('#id_permanent_type').select2({
            language: 'zh-CN',
            data: permanent,
            allowClear: false,
            multiple: false,
            //            maximumSelectionLength: 12,
            //            minimumResultsForSearch: Infinity
        });
        $('#gender').select2({
            language: 'zh-CN',
            data: basicData.gender,
            allowClear: false,
            multiple: false,
            //            maximumSelectionLength: 12,
            //            minimumResultsForSearch: Infinity
        });
        $('#whcddm').select2({
            language: 'zh-CN',
            data: basicData.education,
            allowClear: false,
            multiple: false,
            //            maximumSelectionLength: 12,
            //            minimumResultsForSearch: Infinity
        });
    }

    function initRadio() {
        t_begin = new Date();
        wn.createiRadioWidthByArray($("#id_gender"), basicData.gender, "xbdm",
                "xbmc", 3);

        wn.createiRadioWidthByArray($("#id_blood_type"), basicData.bloodType,
                "aboxxdm", "aboxxmc", 2);

        wn.createiRadioWidthByArray($("#id_RH_blood_type"),
                basicData.bloodRHType, "rhxxdm", "rhxxmc", 3);

        wn.createiRadioWidthByArray($("#id_marital_status"),
                basicData.maritalStatus, "hyzkdm", "hyzkmc", 1);

        wn.createiRadioWidthByArray($("#id_insurance_type"),
                basicData.insuranceType, "ylfyzffsdm", "ylfyzffsmc", 1);

        console.log('消耗时间');
        console.log((new Date()) - t_begin);
    }

    function initButtons() {
        $('#id_btn_print').bind('click', function () {
            doPrint();
        });
        $('#id_btn_add').bind('click', function () {
            doPrint();
        });
        $('#id_btn_save').bind('click', function () {
            doSave();
        });
        $('#id_btn_cancel').bind('click', function (t) {
            console.log(t);
            console.log(this);
        });
        $('#id_btn_exit').bind('click', function () {
            dialog.close();
        });
        $('#id_hjdxxdz_copy')
                .bind(
                        'click',
                        function () {
                            var address = $('#id_hjdxxdz').citypicker(
                                    'getAllVal');
                            $('#id_jzdxxdz').val('');
                            $('#id_jzdxxdz').citypicker('destroy');
                            $('#id_jzdxxdz')
                                    .citypicker(
                                            {
                                                province: address.province.name ? address.province.name
                                                        : '',
                                                city: address.city.name ? address.city.name
                                                        : '',
                                                district: address.district.name ? address.district.name
                                                        : '',
                                                town: address.town.name ? address.town.name
                                                        : '',
                                                village: address.village.name ? address.village.name
                                                        : '',
                                                committee: address.committee.name ? address.committee.name
                                                        : ''
                                            });
                            $('#id_jzds').val($('#id_hjds').val());

                        });
        $('#id_jzdxxdz_copy')
                .bind(
                        'click',
                        function () {
                            var address = $('#id_jzdxxdz').citypicker(
                                    'getAllVal');
                            $('#id_hjdxxdz').val('');
                            $('#id_hjdxxdz').citypicker('destroy');
                            $('#id_hjdxxdz')
                                    .citypicker(
                                            {
                                                province: address.province.name ? address.province.name
                                                        : '',
                                                city: address.city.name ? address.city.name
                                                        : '',
                                                district: address.district.name ? address.district.name
                                                        : '',
                                                town: address.town.name ? address.town.name
                                                        : '',
                                                village: address.village.name ? address.village.name
                                                        : '',
                                                committee: address.committee.name ? address.committee.name
                                                        : ''
                                            });
                            $('#id_hjds').val($('#id_jzds').val());
                        });
        $('#id_btn_upload').bind('click', function () {

        });
        $('#id_btn_shot').bind('click', function () {

        });
    }

    function initAddress(row) {
        var picker_jz = $('#id_jzdxxdz');
        var picker_hj = $('#id_hjdxxdz');
        if (row) {
            picker_hj.val('');
            picker_hj.citypicker('destroy');
            picker_hj.citypicker({
                province: row.hjdssmc,
                city: row.hjddsmc,
                district: row.hjdqxmc,
                town: row.hjdjdmc,
                village: row.hjdcmc,
                committee: row.hjdjdmc
            });
            picker_jz.val('');
            picker_jz.citypicker('destroy');
            picker_jz.citypicker({
                province: row.jzdssmc,
                city: row.jzddsmc,
                district: row.jzdqxmc,
                town: row.jzdjdmc,
                village: row.jzdcmc,
                committee: row.jzdjdmc
            });
        } else {
            picker_jz.citypicker();
            picker_hj.citypicker();
        }
    }

    function doPrint() {
        var bdhtml = window.document.body.innerHTML;
        var sprnstr = "<!--startprint-->";
        var eprnstr = "<!--endprint-->";
        var prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 17);
        prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));
        window.document.body.innerHTML = prnhtml;
        window.print();
    }

    function doSave() {
        if (permanentAddress === '' || residentAddress === '') {

            console.log('permanentAddress is empty');
            var fnPrepareAddress2Save = function (obj, type) {
                var str = "";
                $.each(obj, function (k, v) {
                    if (v.code) {
                        if (k === 'province') {
                            str += v.code ? ( '&' + type + 'ssbm' + '=' + v.code) : '';
                            str += v.name ? ('&' + type + 'ssmc' + '=' + encodeURIComponent(v.name)) : '';

                        } else if (k === 'city') {
                            str += v.code ? ('&' + type + 'dsbm' + '=' + v.code) : '';
                            str += v.name ? ('&' + type + 'dsmc' + '=' + encodeURIComponent(v.name)) : '';
                        } else if (k === 'district') {
                            str += v.code ? ('&' + type + 'qxbm' + '=' + v.code) : '';
                            str += v.name ? ('&' + type + 'qxmc' + '=' + encodeURIComponent(v.name)) : '';
                        } else if (k === 'town') {
                            str += v.code ? ('&' + type + 'jdbm' + '=' + v.code) : '';
                            str += v.name ? ('&' + type + 'jdmc' + '=' + encodeURIComponent(v.name)) : '';
                        } else if (k === 'village') {
                            str += v.code ? ('&' + type + 'cbm' + '=' + v.code) : '';
                            str += v.name ? ('&' + type + 'cmc' + '=' + encodeURIComponent(v.name)) : '';
                        } else if (k === 'committee') {
                            str += v.code ? ('&' + type + 'jwbm' + '=' + v.code) : '';
                            str += v.name ? ('&' + type + 'jwmc' + '=' + encodeURIComponent(v.name)) : '';
                        }
                    }
                });
                return str;
            };
            var picker_jz = $('#id_jzdxxdz');
            var picker_hj = $('#id_hjdxxdz');
            residentAddress = fnPrepareAddress2Save(picker_jz
                    .citypicker('getAllVal'), 'jzd');

            permanentAddress = fnPrepareAddress2Save(picker_hj
                    .citypicker('getAllVal'), 'hjd');
        }
        //        saveForm.init();
        $('#id_info').submit();
    }

    function guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r
                            : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
    }

    function setDefaultLocation() {
        $.ajax({
            url: "personal_info.do?action=get_default_location",
            type: "post",
            dataType: "text",
            data: {},
            beforeSend: function () {
                //                wn.showLoading();
            },
            success: function (res) {
                if ($.parseJSON(res).length > 0) {
                    var address = $.parseJSON(res)[0];
                    var picker_jz = $('#id_jzdxxdz');
                    var picker_hj = $('#id_hjdxxdz');
                    picker_jz.val('');
                    picker_hj.val('');
                    picker_jz.citypicker('destroy');
                    picker_hj.citypicker('destroy');
                    picker_jz.citypicker({
                        province: address.a1,
                        city: address.b1,
                        district: address.c1,
                        town: address.d1,
                        village: address.e1,
                        committee: address.f1
                    });
                    picker_hj.citypicker({
                        province: address.a1,
                        city: address.b1,
                        district: address.c1,
                        town: address.d1,
                        village: address.e1,
                        committee: address.f1
                    });
                }
            },
            complete: function () {
                //                wn.hiddenLoading();
            }

        });
    }

    function initForm(row) {

        $.each(row, function (k, v) {

            if (k == 'sjhm') {
                console.log('sjhm: ' + v);
                console.log($('#id_' + k));
            }
            var obj = $('#id_' + k);
            console.log(obj);
            if (obj.length > 0) {
                var type = obj.prop("type");
                if (type == 'text' || type == 'tel') {
                    obj.val(v);
                } else if (obj.is('p')) {
                    obj.text(v);
                } else if (type == undefined) {
                    var tagname = obj.get(0).tagName.toLowerCase();
                    if (tagname == "select") {
                        wn.select2Set(obj, v);
                    } else if (tagname == "textarea") {
                        obj.val(v);
                    } else if (tagname == 'span') {
                        if (v) {
                            obj.text(v);
                        }
                    }
                } else if (type == 'checkbox') {
                    if (obj.prop("name") == k) { // 普通单个checkbox，设id
                        if (obj.val() == v)
                            obj.prop("checked", "checked");
                        else
                            obj.prop("checked", false);
                    } else { // checkbox多选，id不等于name
                        wn.checkboxSet2(k, v);
                    }
                }

            } else {
                obj = $('#' + k);

                if (obj.length > 0) {
                    type = obj.attr("type");

                    if (type == undefined) {
                        tagname = obj.get(0).tagName.toLowerCase();
                        if (tagname == "select") {
                            obj.val(v).trigger('change');
                        } else if (tagname == "textarea") {
                            obj.val(v);
                        }
                    } else if (type == 'radio') {
                        k = k.replace('dm', 'mc');
                        $("input[value='" + v + "'][name='" + k + "']").prop(
                                "checked", "checked");
                        $("input[name='" + k + "']").iCheck({
                            checkboxClass: 'icheckbox_flat-wnred',
                            radioClass: 'iradio_flat-wnred',
                            increaseArea: '20%'
                        });
                    }
                }
            }
        });
    }

    function getDetailInfo(yngrbsh) {
        $.ajax({
            url: "personal_info.do?action=detail_info_query",
            type: "post",
            dataType: "json",
            data: {
                yngrbsh: yngrbsh
            },
            beforeSend: function () {
                //                wn.showLoading();
            },
            success: function (res) {
                if (res) {
                    var detail = res;
                    var contact = detail.contacts;
                    var cards = detail.cards;
//					var gldjmc = detail.gldjmc[0];
//					console.log(gldjmc);
//					var pgdjmc = gldjmc.pgdjmc;
//					var qydjmc = gldjmc.qydjmc;
//					if(pgdjmc){
//						$('#id_gldjmc').text(pgdjmc);
//					} else if (qydjmc) {
//						$('#id_gldjmc').text(qydjmc);
//					} else {
//						$('#id_gldjmc').text('未评估');
//					}
                    if (contact && contact.length > 0) {
                        initForm(contact[0]);
                        $('#gxdm').val(contact[0].gxdm).trigger('change');
                    }
                    if (cards) {
                        $.each(cards, function (index, value) {
                            if (value.kzbz === '1') {
                                $('#id_zjhm').val(value.kzhm);
                                $('#id_klx').val(value.kzlxdm)
                                        .trigger("change");
                            } else if (value.kzbz === '0') {
                                $('#id_insurance_card').val(value.kzlxdm)
                                        .trigger("change");
                                $('#id_insurance_card_value').val(value.kzhm);
                            }
                        })
                    }
                }

            },
            complete: function () {
                //                wn.hiddenLoading();
            }

        });
    }

    function simplifyAddress(obj) {
        obj.val(obj.val().replace(/[\/]/g, ''));
        $.each(['北京市北京市', '天津市天津市', '上海市上海市', '重庆市重庆市'], function (k, v) {
            obj.val(obj.val().replace(v, v.substring(0, v.length / 2)));
        });

    }
</script>
</html>