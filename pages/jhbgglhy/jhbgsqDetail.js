var rylist;//登记人员
var djlsh = "";
var jhlsh = "";
var yngrbsh = "";
var ygldjdm = "";
var flag = "bgsq";
var bgsqlsh = "";
var selectedRow = {};
var xt_jlzt = '';
var jalx = '';
//个人基本信息页面赋值
var saveForm = function () {
    var submitData = function (t, bgsqlsh, yngrbsh, djlsh, yjhlsh) {
        var form1 = $('#defaultForm_');
        form1.validate({
            errorElement: 'span', // default input error message container
            errorClass: 'help-block help-block-error', // default input error
                                                       // message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "", // validate all fields including form hidden input
            messages: {
                sqrygh: {
                    required: "申请人必填"
                },
                sqrq: {
                    required: "申请日期必填"
                }
            },
            rules: {
                sqrygh: {
                    required: true
                },
                sqrq: {
                    required: true
                }
            },

            // highLight error inputs
            highlight: function (element) {
                // set error class to the control group
                $(element).closest('.form-group').addClass('has-error');
            },

            invalidHandler: function (event, validator) {
                // display error alert on form submit
                $('.alert-danger', $('.form-horizontal')).show();
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
            },
            submitHandler: function (form) {
                var datas = wn.fillWithForm("defaultForm_");
                datas += '&yngrbsh=' + yngrbsh
                    + '&bgsqlsh=' + bgsqlsh
                    + '&djlsh=' + djlsh
                    + '&yjhlsh=' + yjhlsh
                    + '&ygldjdm=' + ygldjdm
                    + '&flag=' + flag
                    + '&xt_jlzt=' + xt_jlzt;

                var datass = datas.replace(/undefined/, '');
                var flayType = true;
                if ($("input[name='bgyymc']:checked").val() == "1") {
                    if (ygldjdm == $("input[name='sqgldjmc']:checked").val()) {
                        flayType = true;
                    } else {
                        flayType = false;
                    }
                } else {
                    flayType = false;
                }
                if (mainSelectedRow.JALX == '1' || jalx == '1') {
                    wnform.toast('已中止服务，不能修改!');
                    $("#btn_save_jhbgsq").prop("disabled", true);
                    return false;
                }

                if (mainSelectedRow.BGSQLSH != "" && mainSelectedRow.SHZT == '0') {
                    wnform.toast('已发起变更申请!');
                    $("#btn_save_jhbgsq").prop("disabled", true);
                    return false;
                }

                if (mainSelectedRow.SHZT == '1') {
                    wnform.toast('变更申请已经审核通过!');
                    $("#btn_save_jhbgsq").prop("disabled", true);
                    return false;
                }
                if (flayType) {
                    wnform.toast('申请管理等级没有变化!');
                    return false;
                } else {
                    var Url = "yyhptjhbgglhy.do?action=saveJhbgsq";
                    $.ajax({
                        url: Url,
                        type: "post",
                        dataType: "json",
                        data: datass,
                        success: function (result) {
                            if (result.code == "T") {
                                $.toaster({
                                    priority: 'info',
                                    title: '提示',
                                    message: result.message
                                });
                                t.close();
                                $table.bootstrapTable('refresh');
                            } else {
                                $.toaster({
                                    priority: 'warning',
                                    title: '提示',
                                    message: result.message
                                });
                            }
                        }
                    });

                }
            }
        });
    };
    return {
        init: function (t, bgsqlsh, yngrbsh, djlsh, yjhlsh) {
            submitData(t, bgsqlsh, yngrbsh, djlsh, yjhlsh);
        }
    };
}();

$(function () {

    /**
     * 初始化日期选择控件
     */
    $('.choose-date').datepicker({
        format: 'yyyy-mm-dd',
        weekStart: 1,
        autoclose: true,
        todayBtn: 'linked',
        language: 'zh-CN',
        endDate: '+1'
    }).on('changeDate', function (ev) {
    });
    var myDate = new Date();
    $("#sqrq").val(myDate.toLocaleDateString().replace('/', '-').replace('/', '-'));

    getRylist1();

    if (mainSelectedRow == null) {
        $('#id_name_query').prop('disabled', true);
        $('#id_btn_name_query').on('click', function () {
            selectPersion();
        });
    } else {
        $('#id_btn_name_query').hide();
        $('#id_name_query').prop('disabled', true);
        showApplyInfo();
    }
    if (mainSelectedRow != null) {
        if (mainSelectedRow.JALX == '1' || (mainSelectedRow.BGSQLSH != "" && xt_jlzt == '0') || mainSelectedRow.SHZT == '1') {
            // $("#btn_save_jhbgsq").prop("disabled", true);
            $('#sqrgh').prop("disabled", true);
            $('#sqrq').prop("disabled", true);
        }
        $.ajax({
            url: 'yyhptjhbgglhy.do?action=jhbgsqDetail',
            type: 'get',
            dataType: 'json',
            data: {
                yngrbsh: mainSelectedRow.YNGRBSH,
                djlsh: mainSelectedRow.DJLSH,
                jhlsh: mainSelectedRow.YJHLSH,
                bgsqlsh: mainSelectedRow.BGSQLSH
            }
        }).done(function (datas) {
            //页面个人基本信息赋值
            setGrInfoForm(datas, mainSelectedRow);
            //getRylist1();
            loadControl(datas);
            //页面变更申请信息模块赋值
            initForm((datas.grjhbgsqxxs)[0]);

            var sqgh = datas.grjhbgsqxxs[0].SQRGH;
            if (sqgh) {
                $('#sqrgh').val(sqgh).trigger("change");
            }

        }).fail(function () {
            console.log("error");
        }).always(function () {
            console.log("complete");
        });
    }

});
//点击新增加载新的变更申请人员

function selectPersion() {
    BootstrapDialog.show({
        title: '',
        size: BootstrapDialog.SIZE_LARGE,
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/jhbgglhy/jhbgglAdd.jsp'),
        buttons: [
            {
                label: '确定',
                cssClass: 'btn-default btn-sm',
                action: function (dialog) {
                    var selectes = $("#jhbgApplyPersonInfoTable").bootstrapTable('getSelections');
                    if (selectes.length > 0) {
                        selectedRow = selectes[0];
                        setGrForm(selectedRow);
                        showApplyInfo();
                    }
                    dialog.close();
                }
            }, {
                label: '退出', cssClass: 'btn-default btn-sm',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }
        ],
        onshow: function (dialogRef) {
            console.log('onshow');
        },
        onshown: function (dialogRef) {
            console.log('onshown');
        },
        onhide: function (dialogRef) {

        },
        onhidden: function (dialogRef) {
            $("#jhbgApplyPersonInfoTable").bootstrapTable("refresh");
        }
    });
}

//点击新增后控制form 显示
function showApplyInfo() {
    $('#id_apply_form').show();
    $("#id_apply_save").show();
    $("#id_apply_exit").show();
}

function initButtons() {
    $("#id_btn_name_query").on("click", function () {
        BootstrapDialog.show({
            title: '变更申请人信息',
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/jhbgglhy/jhbgglAdd.jsp'),
            buttons: [{
                id: 'id_apply_save',
                label: '保存',
                cssClass: 'btn-default btn-sm',
                action: function (dialog) {
                    doSave();
                }
            }],
            onshow: function (dialogRef) {
                dialog = dialogRef;
            },
            onshown: function (dialogRef) {
                initJhbgglTable();
            },
            onhide: function (dialogRef) {

            },
            onhidden: function (dialogRef) {
                table.bootstrapTable("refresh");
            }
        });
    })
}

function setGrForm(row) {
    $('#id_name_query').val(row.XM ? row.XM : '');
    $("#xb").text(row.XBMC ? row.XBMC : '');
    if (row.CSRQ == '1900-01-01') {
        $('#csrq').val('');
    } else {
        $("#csrq").text(row.CSRQ ? row.CSRQ : '');
    }
    $("#hzshfzhh").text(row.SFZH ? row.SFZH : '');
    $("#jzdz").text(row.JZDXXDZ ? row.JZDXXDZ : '');
    $("#lxdh").text(row.LXDH ? row.LXDH : '');

    djlsh = row.DJLSH;
    jhlsh = row.JHLSH;
    yngrbsh = row.YNGRBSH;
    bgsqlsh = row.BGSQLSH;
    xt_jlzt = row.XT_JLZT;
    getYjkdjInfo();
    initTable();
}

function setGrInfoForm(datas, row) {
    jalx = row.JALX;

    $("#id_name_query").val((datas.grjbxx)[0].XM);
    $("#xb").text((datas.grjbxx)[0].XB);
    if ((datas.grjbxx)[0].CSRQ == '1900-01-01') {
        $('#csrq').val('');
    } else {
        $("#csrq").text((datas.grjbxx)[0].CSRQ);
    }
    $("#hzshfzhh").text((datas.grjbxx)[0].SFZH);
    $("#jzdz").text(((datas.grjbxx)[0].JZDZ) == null ? '' : (datas.grjbxx)[0].JZDZ);
    $("#lxdh").text(((datas.grjbxx)[0].LXDH) == null ? '' : (datas.grjbxx)[0].LXDH);


    djlsh = datas.djlsh;
    jhlsh = datas.grjhbgsqxxs[0].YJHLSH;
    yngrbsh = datas.yngrbsh;

    ygldjdm = datas.grjhbgsqxxs[0].YGLDJDM;
    var yydj = [];
    yydj = datas.yydj;

    if (datas.grjhbgsqxxs[0].YGLDJDM == null) {
        $('#ygldjdmdiv').text(yydj[0].text);
    } else {
        for (var i = 0; i < yydj.length; i++) {
            var yyydjData = yydj[i];

            if (datas.grjhbgsqxxs[0].YGLDJDM == yyydjData.id) {
                $('#ygldjdmdiv').text(yyydjData.text);
            }
        }
    }
}

function getYjkdjInfo() {
    $.ajax({
        url: 'yyhptjhbgglhy.do?action=jhbgsqDetail',
        type: 'get',
        dataType: 'json',
        data: {
            yngrbsh: yngrbsh,
            djlsh: djlsh,
            jhlsh: jhlsh,
            bgsqlsh: ''
        },
        success: function (data) {
            setChangeContent(data);
            loadControl(data);
        }
    })

}

function getRylist1() {
    $.ajax({
        url: "common.do?action=getSysCzrylist",
        type: "post",
        dataType: "json",
        data: {},
        success: function (data) {
            rylist = data.czrys;
            wn.createSelectByCZRYArray($("#sqrgh"), rylist);
            wn.createSelectByCZRYArray($("#shrgh"), rylist);
            $('#sqrgh').val(rybm).trigger("change");
            // $('#sqrq').prop("disabled", true);
        }
    });
}
//加载页面控件
function loadControl(data) {
    wn.addiRadioWidthByArray($('#sqgldjdmdiv'), data.yydj, 'sqgldjdm', 'sqgldjmc', 2);//申请医养管理等级
    createiRadioWidthByArray($('#bgyydiv'), data.bgyy, 'bgyydm', 'bgyymc', 5);//变更原因
    wn.createiRadioWidthByArray($('#shjgdiv'), data.shjg, 'shzt', 'shzts', 6);//审核结果

    initTable();
}

function createiRadioWidthByArray(selObject, array, fieldID, fieldName, split) {
    var selectBody = "";
    var i = 0;
    var chk = " checked";
    $.each(array, function () {
        if (i == 0) {
            chk = " checked";
        } else {
            chk = "";
        }
        //字段id不存在，则取zdm
        var id = this.id == undefined ? this.zdm : this.id;
        //字段text不存在，则取zmc
        var text = this.text == undefined ? this.zmc : this.text;
        selectBody += "<label class=\"control-content col-md-" + split
            + "     top: -1px!important;\" onclick=\"changed(this);\" style=\"padding-left: 0;padding-right: 0;\" >"
            + " <input type=\"radio\" id=\"" + fieldID
            + "\"  name=\"" + fieldName + "\" value=\"" + id + "\""
            + "\"  title=\"" + text + "\""
            + chk + " \" > " + text + "</label>";
        i++;
    });
    selObject.html(selectBody);
    selObject.iCheck({
        checkboxClass: 'icheckbox_flat-wnred',
        radioClass: 'iradio_flat-wnred',
        increaseArea: '20%'
    });
};

function changed(a) {
    if ($("input[name='bgyymc']:checked").val() == "1" || $("#bgyysm").val() != '') {
        $("#bgyysmDiv").css('display', 'block');
    } else {

        $("#bgyysmDiv").css('display', 'none');
        $("#bgyysm").val("");
    }
}

wn.addiRadioWidthByArray = function (selObject, array, fieldID, fieldName, split) {
    var selectBody = "";
    var i = 0;
    var chk = " checked";
    $.each(array, function () {
        if (i == 0) {
            chk = " checked";
        } else {
            chk = "";
        }
        //字段id不存在，则取zdm
        var id = this.id == undefined ? this.zdm : this.id;
        //字段text不存在，则取zmc
        var text = this.text == undefined ? this.zmc : this.text;
        selectBody += "<label class=\"control-content col-md-" + split
            + "  col-xs-6   top: -1px!important;\" style=\"padding-left: 0;padding-right: 0;\" >"
            + " <input type=\"radio\" id=\"" + fieldID
            + "\"  name=\"" + fieldName + "\" value=\"" + id + "\""
            + "\"  title=\"" + text + "\""
            + chk + " \" > " + text + "</label>";
        i++;
    });
    selObject.html(selectBody);
    selObject.iCheck({
        checkboxClass: 'icheckbox_flat-wnred',
        radioClass: 'iradio_flat-wnred',
        increaseArea: '20%'
    });
};

function initTable() {
    //先销毁表格
    $("#table_jhbgsq").bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $("#table_jhbgsq").bootstrapTable({
        classes: 'table table-hover warning',
        method: "get",
        url: "yyhptjhbgglhy.do?action=yzdxm", // 获取数据的Servlet地址
//        data: obj.rows,
        contentType: "application/json",
        iconSize: 'sm',
        showHeader: true,
        // height: 100,
        striped: true, // 表格显示条纹
        pagination: false, // 启动分页
        pageSize: 10, // 每页显示的记录数
        pageNumber: 1, // 当前第几页
        pageList: [2], // 记录数可选列表
        search: false, // 是否启用查询
        showColumns: false, // 显示下拉框勾选要显示的列
        showRefresh: false, // 显示刷新按钮
        onlyInfoPagination: false,
        sidePagination: "server", // 表示服务端请求
        uniqueId: "JHMXLSH", // 每一行的唯一标识，一般为主键列
        clickToSelect: true, // 是否启用点击选中行
        showExport: true,
        exportDataType: "basic",
        minimumCountColumns: 2, // 最少允许的列数
        responseHandler: function (res) {
            dictData = res.dict;
            var sTableHeight = res.rows.length * 31 + 34 >= 200 ? 225 : res.rows.length * 31 + 34;
            $('#table_jhbgsq').bootstrapTable('resetView', {height: sTableHeight});
            return res;
        },
        queryParamsType: "undefined",
        showPaginationSwitch: false,
        queryParams: function queryParams(params) { // 设置查询参数
            var param = {
                currPage: params.pageNumber,
                pageSize: params.pageSize,
                djlsh: djlsh,
                jhlsh: jhlsh,
                yngrbsh: yngrbsh
            };
            return param;
        },
        columns: [
            {
                title: '序号',
                formatter: function (value, row, index) {
                    return index + 1;
                },
                align: 'center'
            },

            {
                field: 'FWXMMC',
                title: '服务项目',
                align: 'left'
            },
            {
                field: 'FWPCMC',
                title: '服务频次',
                align: 'center',
                visible: false
            },
            {
                field: 'FWSL',
                title: '服务数量',
                align: 'center',
                visible: false
            },
            {
                field: 'FWHJ',
                title: '合计金额',
                align: 'center',
                visible: false
            },
            {
                field: 'ZDRQ',
                title: '制定日期',
                align: 'center',
                visible: false
            },
            {
                field: 'ZDRYXM',
                title: '制定人员',
                align: 'center',
                visible: false
            }],
        onLoadSuccess: function (data) { // 加载成功时执行
            $('#collapse_click').trigger('click');
            $('#collapse1').trigger('click');
        },
        onLoadError: function () { // 加载失败时执行
        },
        onCheck: function (row) {
        },
        onUncheck: function (row) {
        }
    });
}

function setChangeContent(datas) {
    ygldjdm = datas.Jkgldjdm[0].GLDJDM;
    var yydj = [];
    yydj = datas.yydj;
    if (ygldjdm == null) {
        $('#ygldjdmdiv').text(yydj[0].text);
    } else {
        for (var i = 0; i < yydj.length; i++) {
            var yyydjData = yydj[i];

            if (ygldjdm == yyydjData.id) {
                $('#ygldjdmdiv').text(yyydjData.text);
            }
        }
    }
}

function LoadContent(iFlag, countents) {
    var str = "";
    var strHtml = "";
    var fwxms = countents;
    if (fwxms != undefined && fwxms != null) {
        var k = fwxms.length;
        strHtml = "<div class='row'>";
        for (var i = 0; i < k; ++i) {
            strHtml += createFwxmHtml(i, fwxms[i]);
        }
        strHtml += "</div>";
    }
    $("#tcdetail").html(strHtml);
}

function createFwxmHtml(index, jsonFwxm) {
    var strHtml;
    var fwpcHtml;
    var fwddHtml;
    if (index >= 0 && jsonFwxm != undefined && jsonFwxm != null) {
        if (jsonFwxm.FWPC != undefined) {
            fwpcHtml = "<span class='pull-right'>" + jsonFwxm.FWPC + "</span>";
        } else {
            fwpcHtml = "<span class='pull-right'></span>";
        }
        strHtml = "  <div id='id=id_" + jsonFwxm.XMDM + "' class='col-sm-4'>"
            + "      <div class='box box-green' style='background:#97FFFF; color:#FFFF'>"
            + "          <div class='box-header with-border border-green '>"
            + "                <h3 class='box-title'><strong>" + jsonFwxm.XMMC + "</strong></h3>"
            + fwpcHtml
            + "           </div>"
            + "           <div class='box-body'>"
            + "                <div id='id_hjjgDisplay_" + jsonFwxm.XMDM + "' class='col-sm-12'>"
            + "                     <strong><strong></strong><i class='fa fa-rmb'></i>" + jsonFwxm.FYDJ + " x " + jsonFwxm.SL + "次" + " = <i class='fa fa-rmb'></i>" + (jsonFwxm.FYDJ * jsonFwxm.SL).toFixed(1) + "</strong></p>"
            + "                </div>"
            + "           </div>"
            + "     </div>"
            + "   </div>";
    }
    return strHtml;
}

function doSave_() {
    if (jalx == '1') {
        wnform.toast('计划已经中止，不能发起变更申请!');
        return false;
    } else {
        if (bgsqlsh != "" && xt_jlzt == '0') {
            wnform.toast('变更申请已经发起，不用重复申请!');
            return false;
        } else {
            var datas = wn.fillWithForm("defaultForm_");
            datas += '&yngrbsh=' + yngrbsh
                + '&bgsqlsh=' + (bgsqlsh ? bgsqlsh : encodeURIComponent('') )
                + '&djlsh=' + djlsh
                + '&yjhlsh=' + jhlsh
                + '&ygldjdm=' + ygldjdm
                + '&flag=' + flag
                + '&xt_jlzt=' + xt_jlzt;
            var datass = datas.replace(/undefined/, '');
            var flayType = true;
            if ($("input[name='bgyymc']:checked").val() == "1") {
                if (ygldjdm == $("input[name='sqgldjmc']:checked").val()) {
                    // wnform.toast('申请等级没有变化!');
                    flayType = true;
                } else {
                    flayType = false;
                }
            } else {
                flayType = false;
            }
            if (flayType) {
                wnform.toast('申请管理等级没有变化!');
                return false;
            } else {
                var Url = "yyhptjhbgglhy.do?action=saveJhbgsq";
                $.ajax({
                    url: Url,
                    type: "post",
                    dataType: "json",
                    data: datass,
                    success: function (result) {

                        if (result.code == "T") {
                            $.toaster({
                                priority: 'info',
                                title: '提示',
                                message: result.message
                            });
                            $('#table').bootstrapTable('refresh');
                            dialog.close();
                            // t.close();
                            // $table.bootstrapTable('refresh');
                        } else {
                            $.toaster({
                                priority: 'warning',
                                title: '提示',
                                message: result.message
                            });
                        }
                    }
                });

            }
        }





    }
};

function initForm(row) {
    $.each(row, function (k, v) {
        var obj = $('#' + k.toLowerCase());
        if (obj.length > 0) {
            type = obj.attr("type");
            if (type == 'text') {

            } else if (type == 'radio') {
                k = k.replace('DM', 'MC');
                k = k.replace('SHZT', 'SHZTS');
                $("input[value='" + v + "'][name='" + k.toLowerCase() + "']").attr("checked", "checked");
                $("input[name='" + k.toLowerCase() + "']").iCheck({
                    checkboxClass: 'icheckbox_flat-wnred',
                    radioClass: 'iradio_flat-wnred',
                    increaseArea: '20%'
                });
            } else if (type == undefined) {
            }
        }

    });
    var myDate = new Date();
    myDate.toLocaleDateString();
    if (row.BGYYSM != '') {
        $("#bgyysmDiv").css('display', 'block');
    }
    $("#bgyysm").val(row.BGYYSM);
    if (row.SQRQ != null) {
        $("#sqrq").val(row.SQRQ);
    }
    $("#shbtgyy").val(row.SHBTGYY);
    $("#shrq").val(row.SHRQ);
    if (row.BGSQLSH.length != 0 && row.BGSQLSH != '') {
        $('#shpanel').removeClass("hidden");
    } else {
        $('#shpanel').addClass("hidden");
    }
}