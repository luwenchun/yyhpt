var rylist;//登记人员
var djlsh = "";
var jhlsh = "";
var yngrbsh = "";
var gldjdm = "";
var flag = "bgsh";
var jalx = '';
var yjhlsh = '';
//个人基本信息页面赋值
function setGrForm(datas, row) {
    jalx = row.JALX;
    xt_jlzt = row.XT_JLZT;
    $("#hzxm").text((datas.grjbxx)[0].XM);
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
    jhlsh = datas.jhlsh;
    yjhlsh = datas.grjhbgsqxxs[0].YJHLSH;
    yngrbsh = datas.yngrbsh;
    gldjdm = datas.grjhbgsqxxs[0].SQGLDJDM;

    if (jhlsh != null || jhlsh != "") {
        $("#btn_jhzd_save").prop("disabled", true);
    }

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

    if (datas.grjhbgsqxxs[0].SQGLDJDM == null) {
        $('#sqgldjdmdiv').text(yydj[0].text);
    } else {
        for (var i = 0; i < yydj.length; i++) {
            var sqyydjData = yydj[i];
            if (datas.grjhbgsqxxs[0].SQGLDJDM == sqyydjData.id) {
                $('#sqgldjdmdiv').text(sqyydjData.text);
            }
        }
    }

    $("#sqrgh").html(datas.grjhbgsqxxs[0].SQRXM == null ? '' : datas.grjhbgsqxxs[0].SQRXM);
    $("#sqrq").html(datas.grjhbgsqxxs[0].SQRQ == null ? '' : datas.grjhbgsqxxs[0].SQRQ);

    var bgyydmType = datas.grjhbgsqxxs[0].BGYYDM;
    if (bgyydmType == "1") {
        $('#bgyydiv').text("等级变化");
        $('#bgyysmDiv').css("display", 'none');
    } else {
        $('#bgyydiv').text("个人原因");
        $('#bgyysmDiv').css("display", 'block');
        $('#bgyysm').text(datas.grjhbgsqxxs[0].BGYYSM);
        $('#bgyysm').prop("disabled", true);
    }
    initTable();
}
//加载页面控件
function loadControl(data) {
    wn.createiRadioWidthByArray($('#shjgdiv'), data.shjg, 'shzt', 'shzts', 6);//审核结果
}

$(function () {
    getRylist1();

    if (mainSelectedRow.JALX == '1' || mainSelectedRow.BGJLLSH != '') {
        // $('#btn_jhbgsh_save').prop('disabled', true);
        $('#shrgh').prop('disabled', true);
        $('#shrq').prop('disabled', true);
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
        setGrForm(datas, mainSelectedRow);
        //加载计划服务包数据
        // loadJhbgYxfwbDatas(datas.gryxfwbs);
        //页面字典项及控件生成
        //getRylist1();
        loadControl(datas);
        //页面变更申请信息模块赋值
        initForm((datas.grjhbgsqxxs)[0]);

        var shgh = datas.grjhbgsqxxs[0].SHRGH;
        if (shgh) {
            $('#shrgh').val(shgh).trigger("change");
        }

    }).fail(function () {
        console.log("error");
    }).always(function () {
        console.log("complete");
    });

    /**
     * 初始化日期选择控件
     */
    $('.choose-date').datepicker({
        format: 'yyyy-mm-dd',
        weekStart: 1,
        autoclose: true,
        todayBtn: 'linked',
        endDate: '+1',
        language: 'zh-CN'
    }).on('changeDate', function (ev) {
        // var ksrq = ev.date.mmdd();
    });
    var myDate = new Date();
    // $("#sqrq").val(myDate.toLocaleDateString().replace('/', '-').replace('/', '-'));
});

function initTable() {
    //先销毁表格
    $("#table_jhbgsh").bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $("#table_jhbgsh").bootstrapTable({
        classes: 'table table-hover warning',
        method: "get",
        url: "yyhptjhbgglhy.do?action=yzdxm", // 获取数据的Servlet地址
        contentType: "application/json",
        iconSize: 'sm',
        showHeader: true,
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
            var sTableHeight = res.rows.length * 32 + 34 >= 200 ? 200 : res.rows.length * 32 + 34;
            $('#table_jhbgsh').bootstrapTable('resetView', {height: sTableHeight});
            return res;
        },
        queryParamsType: "undefined",
        showPaginationSwitch: false,
        queryParams: function queryParams(params) { // 设置查询参数
            var param = {
                djlsh: djlsh,
                jhlsh: yjhlsh,
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
            $('#collapse2').trigger('click');
            $('#collapse3').trigger('click');
        },
        onLoadError: function () { // 加载失败时执行
        },
        onCheck: function (row) {
        },
        onUncheck: function (row) {
        }
    });
}

function getRylist1() {
    $.ajax({
        url: "common.do?action=getSysCzrylist",
        type: "post",
        dataType: "json",
        data: {},
        success: function (data) {

            rylist = data.czrys;
            wn.createSelectByCZRYArray($("#shrgh"), rylist);
            $('#shrgh').val(rybm).trigger("change");
            // $('#shrq').prop('disabled', true);

        }
    });
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

var saveForm = function () {
    var submitData = function (t, bgsqlsh, yngrbsh, djlsh, yjhlsh) {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation
        var form1 = $('#defaultForm');

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
                    required: "审核日期不能为空"
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
                if (mainSelectedRow.BGJLLSH != '') {
                    wnform.toast('已进行计划变更!');
                    $("#btn_jhbgsh_save").prop("disabled", true);
                    return false;
                }
                if (jalx == '1') {
                    wnform.toast('已中止服务，不能修改!');
                    $("#btn_jhbgsh_save").prop("disabled", true);
                    return false;
                } else {
                    var datas = wn.fillWithForm("defaultForm");
                    datas += '&yngrbsh=' + yngrbsh
                        + '&bgsqlsh=' + bgsqlsh
                        + '&djlsh=' + djlsh
                        + '&yjhlsh=' + yjhlsh
                        + '&gldjdm=' + gldjdm
                        + '&flag=' + flag

                    var datass = datas.replace(/undefined/, '');
                    var Url = "yyhptjhbgglhy.do?action=jhshUpadateJhbgsq";
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
        // main function to initiate the module
        init: function (t, bgsqlsh, yngrbsh, djlsh, yjhlsh) {
            submitData(t, bgsqlsh, yngrbsh, djlsh, yjhlsh);
        }
    };
}();

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
    $("#bgyysm").val(row.BGYYSM);
    if (row.SQRQ != null) {
        $("#sqrq").val(row.SQRQ);
    }
    $("#shbtgyy").val(row.SHBTGYY);
    $("#shrq").val(row.SHRQ);
    if (row.SHRQ != null) {
        $("#shrq").val(row.SHRQ);
    } else {
        var shrq = getNowFormatDate();
        $("#shrq").val(shrq);
    }

    if (row.BGSQLSH.length != 0 && row.BGSQLSH != '') {
        $('#shpanel').removeClass("hidden");
    } else {
        $('#shpanel').addClass("hidden");
    }
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}