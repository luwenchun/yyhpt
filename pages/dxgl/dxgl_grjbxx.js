var basicData = {};
var permanent = [{id: "01", text: "户籍"}, {id: "02", text: "久居"}];
var local2Save;
var permanentAddress = "";
var residentAddress = "";
var jzdzMrz = 0;
function getCsz() {
    $.ajax({
        url: "common.do?action=getCsz",
        type: "post",
        dataType: "json",
        data: {csbm: "JKGL_JBXX_JZDZ"},
        success: function (data) {
            if (data == undefined) {
                wnform.toast("查询数据失败!");
            } else {
                jzdzMrz = data.MRZ;
                if (jzdzMrz == 1) {
                    $("#jzxxdzContent").show();
                    $("#hjxxdzContent").show();
                    $("#jzdzContent").hide();
                    $("#hjdzContent").hide();
                    $('#labLxdh').text('本人电话:');
                    $('#labSjhm').text('联系人电话:');
                }
            }
        }
    });
}
getCsz();
var validateOption = {
    errorElement: "span",
    errorClass: "help-block help-block-error label-warning",
    focusInvalid: false,
    ignore: "",
    messages: {xm: {required: "姓名必填"}, zjhm: {required: "证件号码必填"}, csrq: {required: "出生日期必填"}},
    rules: {
        xm: {required: true},
        zjhm: {required: true, isIdCardNo: true},
        sjhm: {isPhone: true},
        dhhm: {isPhone: true},
        lxr_dhhm: {isPhone: true},
        lxr_sjhm: {isPhone: true},
        hjdyzbm: {isZipCode: true},
        jzdyzbm: {isZipCode: true},
        csrq: {required: true}
    },
    highlight: function (element) {
        $(element).addClass("has-error");
    },
    invalidHandler: function (event, validator) {
        $(".alert-danger", $(".form-horizontal")).show();
    },
    success: function (label) {
        label.closest(".form-group").removeClass("has-error");
        label.removeClass("help-block help-block-error label-warning");
    },
    submitHandler: function (form) {
        var jzd = $("#id_jzdxxdz");
        var hjd = $("#id_hjdxxdz");
        if (jzdzMrz == 1) {
            jzd.val($("#id_jzxxdz").val());
            hjd.val($("#id_hjxxdz").val());
        } else {
            jzd.val(jzd.val() + $("#id_jzds").val());
            hjd.val(hjd.val() + $("#id_hjds").val());
        }
        simplifyAddress(jzd);
        simplifyAddress(hjd);
        $('input[type=radio][name=ylfyzffsmc][value="99"]').prop("title", $("#id_ylfyzffsqt").val());
        var data = wn.fillWithForm("id_info");
        if (yngrbsh) {
            data += "&yngrbsh=" + yngrbsh;
        } else {
            data += "&yngrbsh=" + guid();
            data += "&sjly=01";
        }
        if ($('input[type=radio][name=ylfyzffsmc]:checked').val() == '99'&& $("#id_ylfyzffsqt").val() == '') {
            wnform.toast('请填写支付方式!');
            return false;
        }
        data += permanentAddress;
        data += residentAddress;
        var Url = "personal_info.do?action=save_data";
        if (flag == "edit") {
            Url = "personal_info.do?action=update_data";
        }
        var formData = new FormData($("#id_zp")[0]);
        formData.append("file", document.getElementsByName("image")[0].files[0]);
        event.preventDefault();
        $.ajax({
            url: Url + "&" + data,
            type: "post",
            dataType: "json",
            contentType: false,
            processData: false,
            data: formData,
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
var validator = $("#id_info").validate(validateOption);
var t_begin;
var editRow = "";
$(function () {
    showOrHide === "hide" && setSomeBtnHide();
    initButtons();
    $("#id_csrq").datepicker({autoclose: true, startView: "decade", endDate: "0d"});
    $("#id_zjhm").on("blur", function () {
        var sfzhm = $("#id_zjhm").val();
        var getDateStr = "";
        var _y, _m, _d;
        if (sfzhm.length == 18) {
            getDateStr = sfzhm.substr(6, 8);
            _y = getDateStr.substr(0, 4);
            _m = getDateStr.substr(4, 2);
            _d = getDateStr.substr(6, 2);
            $("#id_csrq").datepicker("update", new Date(_y + " " + _m + " " + _d).format("yyyy-MM-dd"));
        }
    });
    getPageInfoByID();
});
function setSomeBtnHide() {
    $("#id_btn_print").hide();
    $("#id_btn_save").hide();
    $("#div_rigBtn").removeClass();
    $("#div_rigBtn").addClass("pull-right");
}
function getDictData() {
    $.ajax({
        url: "personal_info.do?action=dict_data",
        type: "post",
        dataType: "json",
        data: {},
        beforeSend: function () {
        },
        success: function (res) {
            basicData = res;
            initSelector();
            initRadio();
            if (flag === "add") {
                setDefaultLocation();
                $('#id_ylfyzffsqt').hide();
            }
            if (flag === "edit") {
                t_begin = new Date();
                if (editRow.gjdm == null || editRow.gjdm === "") {
                    editRow.gjdm = "156";
                }
                if (editRow.grzp) {
                    $("#id_image").prop("src", "avatar/" + editRow.grzp);
                }

                if (editRow.ylfyzffsdm != "99") {
                    $("#id_ylfyzffsqt").hide();
                } else {
                    $("#id_ylfyzffsqt").show();
                    $("#id_ylfyzffsqt").val(editRow.ylfyzffsmc);
                }
                initForm(editRow);
                if (jzdzMrz == 1) {
                    $("#id_jzxxdz").val(editRow.jzdxxdz);
                    $("#id_hjxxdz").val(editRow.hjdxxdz);
                } else {
                    initAddress(editRow);
                }
            }
        },
        complete: function () {
        }
    });
}
function initSelector() {
    $("#id_klx").select2({
        language: "zh-CN",
        data: basicData.cards,
        allowClear: false,
        multiple: false,
    }).on("change", function (e) {
        var zjhm = $("#id_zjhm");
        if (e.target.value && e.target.value != "01") {
            $("#id_zjhm-error").hide();
        } else {
        }
    });
    $("#mzdm").select2({language: "zh-CN", data: basicData.nation, allowClear: false, multiple: false,});
    $("#gxdm").select2({language: "zh-CN", data: basicData.guardian, allowClear: false, multiple: false,});
    $("#id_insurance_card").select2({
        language: "zh-CN",
        data: basicData.insuranceCards,
        allowClear: false,
        multiple: false,
    });
    $("#gjdm").select2({language: "zh-CN", data: basicData.citizenship, allowClear: false, multiple: false,});
    $("#gjdm").val("156").trigger("change");
    $("#id_permanent_type").select2({language: "zh-CN", data: permanent, allowClear: false, multiple: false,});
    $("#gender").select2({language: "zh-CN", data: basicData.gender, allowClear: false, multiple: false,});
}
function initRadio() {
    t_begin = new Date();
    wn.createiRadioWidthByArray($("#id_gender"), basicData.gender, "xbdm", "xbmc", 3);
    wn.createiRadioWidthByArray($("#id_blood_type"), basicData.bloodType, "aboxxdm", "aboxxmc", 2);
    wn.createiRadioWidthByArray($("#id_RH_blood_type"), basicData.bloodRHType, "rhxxdm", "rhxxmc", 3);
    wn.createiRadioWidthByArray($("#id_marital_status"), basicData.maritalStatus, "hyzkdm", "hyzkmc", 1);
    createiRadioByArrayBase($("#id_insurance_type"), basicData.insuranceType, "ylfyzffsdm", "ylfyzffsmc", flag, "");
}
function createiRadioByArrayBase(selObject, array, fieldID, fieldName, iflag, split) {
    var selectBody = "";
    var i = 0;
    var chk = " checked";
    $.each(array, function () {
        if (i == 0) {
            chk = " checked";
        } else {
            chk = "";
        }
        selectBody += '<label class="control-content col-md-' + split + '   top: -1px !important;" style="padding-left: 0;padding-right: 0;" > <input type="radio" id="' + fieldID + '"  name="' + fieldName + '" value="' + this.id + '""  title="' + this.text + '"' + chk + ' " > ' + this.text + "</label>";
        i++;
    });
    selObject.html(selectBody);
    if (iflag == "add") {
        selObject.iCheck({checkboxClass: "icheckbox_flat-wnred", radioClass: "iradio_flat-wnred", increaseArea: "20%"});
    }
    $("input[name='ylfyzffsmc']").on("ifChecked", function (event) {
        changed(this);
    });
}
function changed(obj) {
    $("#id_ylfyzffsqt").css("display", "none");
    if ($(obj).is(":checked") && $(obj).val() == 99) {
        $("#id_ylfyzffsqt").show();
    } else {
        $("#id_ylfyzffsqt").hide();
    }
}
function initButtons() {
    $("#id_btn_print").bind("click", function () {
        doPrint();
    });
    $("#id_btn_add").bind("click", function () {
        doPrint();
    });
    $("#id_btn_save").bind("click", function () {
        doSave();
    });
    $("#id_btn_cancel").bind("click", function (t) {
    });
    $("#id_btn_exit").bind("click", function () {
        dialog.close();
    });
    $("#id_hjdxxdz_copy").bind("click", function () {
        var address = $("#id_hjdxxdz").citypicker("getAllVal");
        $("#id_jzdxxdz").val("");
        $("#id_jzdxxdz").citypicker("destroy");
        $("#id_jzdxxdz").citypicker({
            province: address.province.name ? address.province.name : "",
            city: address.city.name ? address.city.name : "",
            district: address.district.name ? address.district.name : "",
            town: address.town.name ? address.town.name : "",
            village: address.village.name ? address.village.name : "",
            committee: address.committee.name ? address.committee.name : ""
        });
        $("#id_jzds").val($("#id_hjds").val());
    });
    $("#id_jzdxxdz_copy").bind("click", function () {
        var address = $("#id_jzdxxdz").citypicker("getAllVal");
        $("#id_hjdxxdz").val("");
        $("#id_hjdxxdz").citypicker("destroy");
        $("#id_hjdxxdz").citypicker({
            province: address.province.name ? address.province.name : "",
            city: address.city.name ? address.city.name : "",
            district: address.district.name ? address.district.name : "",
            town: address.town.name ? address.town.name : "",
            village: address.village.name ? address.village.name : "",
            committee: address.committee.name ? address.committee.name : ""
        });
        $("#id_hjds").val($("#id_jzds").val());
    });
    $("#id_btn_upload").bind("click", function () {
    });
    $("#id_btn_shot").bind("click", function () {
    });
}
function initAddress(row) {
    var picker_jz = $("#id_jzdxxdz");
    var picker_hj = $("#id_hjdxxdz");
    if (row) {
        picker_hj.val("");
        picker_hj.citypicker("destroy");
        picker_hj.citypicker({
            province: row.hjdssmc,
            city: row.hjddsmc,
            district: row.hjdqxmc,
            town: row.hjdjdmc,
            village: row.hjdcmc,
            committee: row.hjdjdmc
        });
        picker_jz.val("");
        picker_jz.citypicker("destroy");
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
    if (permanentAddress === "" || residentAddress === "") {
        var fnPrepareAddress2Save = function (obj, type) {
            var str = "";
            $.each(obj, function (k, v) {
                if (v.code) {
                    if (k === "province") {
                        str += v.code ? ("&" + type + "ssbm=" + v.code) : "";
                        str += v.name ? ("&" + type + "ssmc=" + encodeURIComponent(v.name)) : "";
                    } else {
                        if (k === "city") {
                            str += v.code ? ("&" + type + "dsbm=" + v.code) : "";
                            str += v.name ? ("&" + type + "dsmc=" + encodeURIComponent(v.name)) : "";
                        } else {
                            if (k === "district") {
                                str += v.code ? ("&" + type + "qxbm=" + v.code) : "";
                                str += v.name ? ("&" + type + "qxmc=" + encodeURIComponent(v.name)) : "";
                            } else {
                                if (k === "town") {
                                    str += v.code ? ("&" + type + "jdbm=" + v.code) : "";
                                    str += v.name ? ("&" + type + "jdmc=" + encodeURIComponent(v.name)) : "";
                                } else {
                                    if (k === "village") {
                                        str += v.code ? ("&" + type + "cbm=" + v.code) : "";
                                        str += v.name ? ("&" + type + "cmc=" + encodeURIComponent(v.name)) : "";
                                    } else {
                                        if (k === "committee") {
                                            str += v.code ? ("&" + type + "jwbm=" + v.code) : "";
                                            str += v.name ? ("&" + type + "jwmc=" + encodeURIComponent(v.name)) : "";
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            return str;
        };
        var picker_jz = $("#id_jzdxxdz");
        var picker_hj = $("#id_hjdxxdz");
        residentAddress = fnPrepareAddress2Save(picker_jz.citypicker("getAllVal"), "jzd");
        permanentAddress = fnPrepareAddress2Save(picker_hj.citypicker("getAllVal"), "hjd");
    }
    $("#id_info").submit();
}
function guid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 3 | 8);
        return v.toString(16);
    });
}
function setDefaultLocation() {
    $.ajax({
        url: "common.do?action=get_default_location",
        type: "post",
        dataType: "json",
        data: {},
        beforeSend: function () {
        },
        success: function (res) {
            if (res) {
                var address = res[0];
                var picker_jz = $("#id_jzdxxdz");
                var picker_hj = $("#id_hjdxxdz");
                picker_jz.val("");
                picker_hj.val("");
                picker_jz.citypicker("destroy");
                picker_hj.citypicker("destroy");
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
        }
    });
}
function initForm(row) {
    $.each(row, function (k, v) {
        if (k == "sjhm") {
        }
        var obj = $("#id_" + k);
        if (obj.length > 0) {
            var type = obj.prop("type");
            if (type == "text" || type == "tel") {
                obj.val(v);
            } else {
                if (obj.is("p")) {
                    obj.text(v);
                } else {
                    if (type == undefined) {
                        var tagname = obj.get(0).tagName.toLowerCase();
                        if (tagname == "select") {
                            wn.select2Set(obj, v);
                        } else {
                            if (tagname == "textarea") {
                                obj.val(v);
                            } else {
                                if (tagname == "span") {
                                    if (v) {
                                        obj.text(v);
                                    }
                                }
                            }
                        }
                    } else {
                        if (type == "checkbox") {
                            if (obj.prop("name") == k) {
                                if (obj.val() == v) {
                                    obj.prop("checked", "checked");
                                } else {
                                    obj.prop("checked", false);
                                }
                            } else {
                                wn.checkboxSet2(k, v);
                            }
                        }
                    }
                }
            }
        } else {
            obj = $("#" + k);
            if (obj.length > 0) {
                type = obj.attr("type");
                if (type == undefined) {
                    tagname = obj.get(0).tagName.toLowerCase();
                    if (tagname == "select") {
                        obj.val(v).trigger("change");
                    } else {
                        if (tagname == "textarea") {
                            obj.val(v);
                        }
                    }
                } else {
                    if (type == "radio") {
                        k = k.replace("dm", "mc");
                        $("input[value='" + v + "'][name='" + k + "']").prop("checked", "checked");
                        $("input[name='" + k + "']").iCheck({
                            checkboxClass: "icheckbox_flat-wnred",
                            radioClass: "iradio_flat-wnred",
                            increaseArea: "20%"
                        });
                    }
                }
            }
        }
    });
}
function getPageInfoByID() {
    if (yngrbsh) {
        getDetailInfo(yngrbsh);
        $.ajax({
            url: "yyhpt_dxfp.do?action=getPageInfo",
            type: "post",
            dataType: "json",
            data: {yngrbsh: yngrbsh},
            beforeSend: function () {
            },
            success: function (res) {
                editRow = res.pageinfo;
                getDictData();
            },
            complete: function () {
            }
        });
    } else {
        getDictData();
    }
}
function getDetailInfo(yngrbsh) {
    if (yngrbsh) {
        $.ajax({
            url: "personal_info.do?action=detail_info_query",
            type: "post",
            dataType: "json",
            data: {yngrbsh: yngrbsh},
            beforeSend: function () {
            },
            success: function (res) {
                if (res) {
                    var detail = res;
                    var contact = detail.contacts;
                    var cards = detail.cards;
                    if (contact && contact.length > 0) {
                        initForm(contact[0]);
                        $("#gxdm").val(contact[0].gxdm).trigger("change");
                    }
                    if (cards) {
                        $.each(cards, function (index, value) {
                            if (value.kzbz === "1") {
                                $("#id_zjhm").val(value.kzhm);
                                $("#id_klx").val(value.kzlxdm).trigger("change");
                            } else {
                                if (value.kzbz === "0") {
                                    $("#id_insurance_card").val(value.kzlxdm).trigger("change");
                                    $("#id_insurance_card_value").val(value.kzhm);
                                }
                            }
                        });
                    }
                }
            },
            complete: function () {
            }
        });
    }
}
function simplifyAddress(obj) {
    obj.val(obj.val().replace(/[\/]/g, ""));
    $.each(["北京市北京市", "天津市天津市", "上海市上海市", "重庆市重庆市"], function (k, v) {
        obj.val(obj.val().replace(v, v.substring(0, v.length / 2)));
    });
}