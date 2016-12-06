var rylist;//登记人员
var djlsh = "";
var jhlsh = "";
var yngrbsh = "";
var ygldjdm = "";
var gldjdms = [];//医养管理等级
var s = 0;
var obj = "";
var fwb = [];
var fwbinfoAll;
var jhjssj = "";
var flag = "bgglrk";
var bgsqinfo = [];
var yjhlsh = "";
var bgsqlsh = "";
var shzt = "";
var fwpcdm = "";
var fwpcmc = "";
var gldjdm = "";
var selectionSize = "";
var jalx = '';
var fwmc = '';
var shztType = '';
var zpfj = '';
var jhshztjl = '';//用于统一耗材table加载时是否显示操作字段标识
var showczBtn = true;

var checkAllWeek = function () {
    $('input[name="week"]').iCheck('check');
};
var uncheckAllWeek = function () {
    $('input[name="week"]').iCheck('uncheck');
};

wn.iCheckInit();

$(function () {
    getData();//获取基本数据，绑定页面信息
    initButtons();//初始化按钮事件
    getFwbForJoinFwbInfo();//查询所有的服务包信息，用于保存时拼服务包信息
});

function getData() {
    $.ajax({
        url: 'yyhptjhbgglhy.do?action=jhbgjlDetail',
        type: 'get',
        dataType: 'json',
        data: {
            yngrbsh: mainSelectedRow.YNGRBSH,
            djlsh: mainSelectedRow.DJLSH,
            jhlsh: mainSelectedRow.XJHLSH,
            bgsqlsh: mainSelectedRow.BGSQLSH
        }
    }).done(function (datas) {
        //页面个人基本信息赋值
        bgjl_setGrForm(datas, mainSelectedRow);
    }).fail(function () {
    }).always(function () {
    });
}

function getFwbForJoinFwbInfo() {
    $.ajax({
        url: 'yyhptjhglhy.do?action=getFwbInfo',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            fwbinfoAll = data;
        }
    })
}

//个人基本信息页面赋值
function bgjl_setGrForm(datas, row) {

    getParamForUse(datas, row);

    $('input[name="weekAll"][value="8"]').on('ifChecked', checkAllWeek);
    $('input[name="weekAll"][value="8"]').on('ifUnchecked', uncheckAllWeek);

}

/*
 装载tables  fx
 */
function initTables() {
    initTable_();
    initTable1();
    setJhhj_money();
    $('input[name="weekAll"][value="8"]').on('ifChecked', checkAllWeek);
    $('input[name="weekAll"][value="8"]').on('ifUnchecked', uncheckAllWeek);
}

function bindAllcheck() {
    jhzd_checkbind();
}

function tablesobj() {
    return $("#table_jhbgjl");
}

function getParamForUse(datas, row) {
    fwmc = mainSelectedRow.FWPCDM;
    jalx = mainSelectedRow.JALX;

    djlsh = datas.djlsh;
    jhlsh = mainSelectedRow.XJHLSH;
    yngrbsh = datas.yngrbsh;
    bgsqinfo = datas.grjhbgsqxxs;
    yjhlsh = datas.grjhbgsqxxs[0].YJHLSH;
    bgsqlsh = mainSelectedRow.BGJLLSH;

    gldjdm = datas.grjhbgsqxxs[0].SQGLDJDM;

    $("#hzxm").text((datas.grjbxx)[0].XM);
    $("#xb").text((datas.grjbxx)[0].XB);
    if ((datas.grjbxx)[0].CSRQ == '1900-01-01') {
        $('#csrq').val('');
    } else {
        $("#csrq").text((datas.grjbxx)[0].CSRQ);
    }
    $("#hzshfzhh").text((datas.grjbxx)[0].SFZH);
    $("#jzdz").text(((datas.grjbxx)[0].JZDZ) == null ? '' : (datas.grjbxx)[0].JZDZ);

    if ($.trim(datas.grjbxx[0].LXDH) != '') {
        $("#lxdh").text(datas.grjbxx[0].LXDH);
    }

    var s = 0;
    var grjkzkpgs = datas.grjkzkpgs;

    $.each(grjkzkpgs, function () {
        gldjdms[s] = this.GLDJDM;
        s++;
        $("#pgjlnrgr").html(this.PGJL);
        $("#jhzdfwpc").html(this.PCMC);
    });

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

    zpfj = mainSelectedRow.ZPFJ;
    if (jhlsh) {
        $.fn.fileinput("show", "uploadfiles/JHGL", jhlsh, zpfj, "fjdzDiv", "fileDiv");
    } else {
        $.fn.fileinput("show", "uploadfiles/JHGL", null, null, "fjdzDiv", "fileDiv");
    }

    jhfwpc = datas.jhfwpc;
    arrayTolb($('#jhzdfwpc'), jhfwpc);

    var sqgldjdm = datas.grjhbgsqxxs[0].SQGLDJDM;

    if (fwmc == null) {
        if (sqgldjdm == '01') {
            fwmc = "W1D";
        } else if (sqgldjdm == '02') {
            fwmc = "W3D";
        } else if (sqgldjdm == '03' || sqgldjdm == '04') {
            fwmc = "W5D";
        } else if (sqgldjdm == '05' || sqgldjdm == '06') {
            fwmc = "W7D";
        } else {
            fwmc = "W1D";
        }
    }

    $("#jhzdfwpc").val(fwmc).trigger('change');

    if (jalx == '1') {
        // $("#btn_bgjl_save").prop("disabled", true);
        $("#btn_bgjl_addfw").prop("disabled", true);
        $("#btn_bgjl_addxm").prop("disabled", true);
        $("#btn_bgjl_reset").prop("disabled", true);
    }

    for (var i = 0; i < datas.jhzxsj.length; i++) {
        $('input[name="week"][value=' + datas.jhzxsj[i].WEEK + ']').iCheck('check');
    }

    getData_(djlsh, jhlsh, yngrbsh);

}


function getData_(djlsh, jhlsh, yngrbsh) {
    $.ajax({
        url: 'yyhptjhglhy.do?action=yzdxm',
        type: 'get',
        dataType: 'json',
        data: {
            currPage: 1,
            pageSize: 10,
            djlsh: djlsh,
            jhlsh: jhlsh,
            yngrbsh: yngrbsh
        },
        success: function (data) {
            if (data != null && data.rows.length > 0) {
                shztType = data.rows[0].SHZT;
                jhshztjl = shztType;
                if (data.rows[0].SHZT == '1') {
                    // $("#btn_bgjl_save").prop("disabled", true);
                    $("#btn_jhzd_addhc").prop("disabled", true);
                    $("#btn_bgjl_addfw").prop("disabled", true);
                    $("#btn_bgjl_addxm").prop("disabled", true);
                    $("#btn_bgjl_reset").prop("disabled", true);
                }
                $("#jhzdryxm").html(data.rows[0].ZDRYXM == null ? '' : data.rows[0].ZDRYXM);
                $("#jhzdrq").html(data.rows[0].ZDRQ == null ? '' : data.rows[0].ZDRQ);
            } else {
                $("#jhzdrq").html(getNowFormatDate());
            }
            obj = data;
            fwb = data.fwb;
            initTables();

        }
    })
}

function initTable_() {
    //先销毁表格
    $("#table_jhbgjl").bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $("#table_jhbgjl").bootstrapTable({
        classes: 'table table-hover warning',
        data: obj.rows,
        contentType: "application/json",
        iconSize: 'sm',
        showHeader: true,
        // height: obj.rows.length * 32 + 34 >= 200 ? 225 : obj.rows.length * 32 + 34,
        height: obj.rows.length * 47 + 34 >= 282 ? 235 : obj.rows.length * 47 + 34,
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
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'FWXMMC',
                title: '服务项目',
                align: 'left',
                valign: 'middle'
            },
            {
                field: 'FWDJ',
                title: '单价(元)',
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'FWSL',
                title: '数量(次)',
                align: 'center',
                formatter: function (value, row, index) {
                    // 适配数量
                    if (row.FWSL) {
                        value = row.FWSL;
                    }
                    var id = "isEdit" + index;
                    return '<input type="number"  onkeyup="checkNum(this)"  onBlur="setFwscRow(this,' + index + ');"  class="form-control  input-sm " text_aline="center" style="width: 60px" value=' + value + ' min=1  name="slEdit" id=\"' + id + '\" placeholder="数量"/ maxlength="3">';
                }
            },
            {
                field: 'FWHJ',
                title: '金额(元)',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    // 适配数量
                    var fwhj = '';
                    if (row.FWHJ == '0.0') {
                        fwhj = row.FWDJ * row.FWSL;
                    } else {
                        fwhj = row.FWHJ;
                    }
                    return fwhj;
                }
            },
            {
                field: 'CZ',
                title: '操作',
                valign: 'middle',
                align: 'center',
                events: {
                    'click .delete': function (e, value, row, index) {
                        deleteInfo(row, index);
                    }
                },
                formatter: function (value, row, index) {
                    return '<a class="delete"  href="javascript:void(0)"><img src="layouts/img/table/icon_deldata.png"> </a>';
                },
                visible: shzt != '1'
            }],
        onLoadSuccess: function (data) { // 加载成功时执行
        },
        onLoadError: function () { // 加载失败时执行
        },
        onCheck: function (row) {
        },
        onUncheck: function (row) {
        }
    });

}

function checkNum(obj) {
    var check = /^\d+(\.{0,1}\d+){0,1}$/;
    obj.value = obj.value.replace(!check, '');
}

function deleteInfo(row, index) {
    BootstrapDialog.show({
        title: '提示信息',
        message: '是否删除？',
        buttons: [{
            label: '确定',
            action: function (dialog) {
                for (var i = 0; i < obj.rows.length; i++) {
                    if (obj.rows[i] == row) {
                        obj.rows = removeElement(obj.rows, i);//删除方法
                    }
                }
                initTables();
                dialog.close();
            }
        }, {
            label: '取消',
            action: function (dialog) {
                dialog.close();
            }
        }]
    });
}

function initButtons() {
    //绑定保存按钮，点击后保存数据
    $("#btn_bgjl_save").bind("click", function () {
        if (jalx == '1') {
            wnform.toast('已中止服务，不能修改!');
            $("#btn_bgjl_save").prop("disabled", true);
            return false;
        }
        if (arrCount(obj.rows) == 0) {
            wnform.toast('请添加服务项目!');
            return false;
        } else {
            doRepeat();
            doSave();
        }
    });

    //绑定新增服务包事件，点击后跳转新增服务包窗口
    $("#btn_bgjl_addfw").bind("click", function (dialog) {
        BootstrapDialog.show({
            title: '新增服务包',
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/jhglhy/fwbAddInfo.jsp'),
            onshow: function (dialogRef) {
            },
            onshown: function (dialogRef) {
                dialogg = dialogRef;
            },
            onhide: function (dialogRef) {
            },
            onhidden: function (dialogRef) {
                initTables();
            }
        });
    });

    $("#btn_bgjl_addxm").bind("click", function () {
        BootstrapDialog.show({
            title: "新增项目",
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/jhglhy/fwxmAdd.html'),
            onshow: function (dialogRef) {
            },
            onshown: function (dialogRef) {
                dialog = dialogRef;
            },
            onhide: function (dialogRef) {
            },
            onhidden: function (dialogRef) {
                initTables();
            }
        });
    });

    //绑定清空事件，清空所有记录
    $("#btn_bgjl_reset").bind("click", function () {
        var objObj = obj;
        if (shzt == '1') {
            wnform.toast('计划已经审核，不能修改!');
            return false;
        } else {
            if (obj.rows.length == 0) {
                BootstrapDialog.show({
                    title: '提示信息',
                    message: '没有记录!',
                    buttons: [{
                        label: '确定',
                        action: function (dialog) {
                            dialog.close();
                        }
                    }]
                });
                return false;
            } else {
                BootstrapDialog.show({
                    title: '提示信息',
                    message: '是否要清空？',
                    buttons: [{
                        label: '确定',
                        action: function (dialog) {
                            $("#table_jhbgjl").bootstrapTable('removeAll');
                            // $("#table_fwjhzd1").bootstrapTable('removeAll');
                            obj.xmhcInfo = [];
                            dialog.close();
                            initTables();
                        }
                    }, {
                        label: '取消',
                        action: function (dialog) {
                            dialog.close();
                        }
                    }]
                });
            }
        }
    });

    //点击退出按钮，关闭当前窗口
    $("#btn_bgjl_exit").bind("click", function () {
        dialoging.close();
    });
}

function arrayTolb(selObject, array, optionname) {
    var selectBody;
    if (optionname != undefined)
        selectBody = "<option value=''>" + optionname + "</option>";
    $.each(array, function () {
        var name = this.name;
        if (name == "") {
            name = "未知";
        }
        selectBody += "<option value=" + this.id + ">" + name + "</option>";
    });
    selObject.html(selectBody);
}

function deptChanged() {
    fwpcdm = $("#jhzdfwpc").val();
    if (fwpcdm == "W3D") {
        selectionSize = 3;
    } else if (fwpcdm == "W5D") {
        selectionSize = 5;
    } else if (fwpcdm == "W7D") {
        selectionSize = 7;
    } else {
        selectionSize = 1;
    }

    if (fwpcdm == "W7D") {
        $('input[name="week"]').iCheck('check');
        $('input[name="weekAll"]').iCheck('check');
    } else {
        $('input[name="week"]').iCheck('uncheck');
        $('input[name="weekAll"]').iCheck('uncheck');
    }
}

function getFwb(id) {
    var objFwb;
    $.each(fwbinfoAll.rows, function (k, v) {
        if (v.FWBDM === id) {
            objFwb = v;
            return false;
        }
    });
    return objFwb;
}

function doRepeat() {
    if (arrCount(fwb)) {
        var fwbdmarr = [];
        for (var i = 0; i < arrCount(fwb); i++) {
            fwbdmarr[i] = fwb[i].FWBDM;
        }
        fwbdmarr = unique(fwbdmarr);
        fwb = [];
        for (var j = 0; j < arrCount(fwbdmarr); j++) {
            if (fwbdmarr[j] == "0000") {
                fwb.push({FWBDM: '0000', FWBMC: '服务包外项目'});
            } else {
                fwb.push(getFwb(fwbdmarr[j]));
            }
        }
    }
}

function doSave() {
    var jhzxTimes = "";
    $.each($('input[name=week]:checked'), function (k, v) {
        jhzxTimes += $(v).prop("value") + ',';
    });

    if ($('input[name=week]:checked').length != selectionSize) {
        wnform.toast('请选择' + selectionSize + '个执行时间!');
        return false;
    }
    fwpcmc = $("#jhzdfwpc").find("option:selected").text();
    fwpcdm = $("#jhzdfwpc").val();
    if (shztType == "1") {
        wnform.toast('计划已经审核，不能修改!');
        $("#btn_bgjl_save").prop("disabled", true);
        return false;
    } else if ($("#jhzdfwpc").val() == "") {
        wnform.toast('请选择服务频次!');
        return false;
    } else if (jhzxTimes == "") {
        wnform.toast('请选择执行时间!');
        return false;
    } else {

        $.each(obj.rows, function (k, v) {
            var numId = 'isEdit' + k;
            obj.rows[k].FWSL = $('input[type=number][id=' + numId + ']').val();
            obj.rows[k].FWHJ = $('input[type=number][id=' + numId + ']').val() * v.FWDJ;
        });

        var fwxm = JSON.stringify(obj.rows).toLowerCase();

        var xmhc = JSON.stringify(xmhcrows).toLowerCase();

        var strFwb = JSON.stringify(fwb).toLowerCase();
        $("#btn_bgjl_save").prop("disabled", true);

        $.ajax({
            url: 'yyhptjhglhy.do?action=saveJhglYzdxm',
            type: 'post',
            dataType: 'json',
            data: {
                bgsqlsh: bgsqlsh,
                djlsh: djlsh,
                jhlsh: jhlsh,
                yngrbsh: yngrbsh,
                jhjssj: jhjssj,
                fwxm: fwxm,
                fwb: strFwb,
                flag: flag,
                yjhlsh: yjhlsh,
                bgsqinfo: JSON.stringify(bgsqinfo).toLowerCase(),
                jhzxTimes: jhzxTimes,
                gldjdm: gldjdm,
                fwpcdm: fwpcdm,
                fwpcmc: fwpcmc,
                xmhc: xmhc,
                jhfwdz: '',
                // jhfwdz: $('#FWDZ').val(),
                jehj: parseFloat($('#money_sum').text().replaceAll('元', '')),
                hcje: parseFloat($('#money_hchj').text().replaceAll('元', '')),
                xmje: parseFloat($('#money_xmhj').text().replaceAll('元', ''))

            },
            success: function (data) {
                if (data[0].code == 'T') {
                    jhlsh = data[0].key;
                    upload(jhlsh);
                    $("#btn_bgjl_save").prop("disabled", false);
                    wnform.toast('保存成功!');
                } else {
                    wnform.toast('保存失败!');
                }
                $('#table').bootstrapTable('refresh');//刷新计划管理列表
            }
        })
    }
}

var upload = function upload(jhlsh) {
    var formData = getFileData("#defaultForm");
    formData.append("jhlsh", jhlsh);
    event.preventDefault();
    $.ajax({
        url: 'yyhptjhglhy.do?action=upload',
        type: 'POST',
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (res) {
        },
        error: function () {
            wnform.toast('上传附件失败！');
        }
    });
};

function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}

function removeElement(array, index) {
    if (index >= 0 && index < array.length) {
        for (var i = index; i < array.length; i++) {
            array[i] = array[i + 1];
        }
        array.length = array.length - 1;
    }
    return array;
}