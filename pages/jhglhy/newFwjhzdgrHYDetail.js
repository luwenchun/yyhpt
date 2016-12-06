var djlsh = "";
var jhlsh = "";
var yngrbsh = "";
var jhjssj = "";
var obj = [];
//计划制定-个人基本信息页面赋值
var gldjdms = [];//评估结论管理等级
//套餐合计  护理券抵扣  余额  应付金额 赋值
var sHlqye = 0.0;
var dialogg = "";
//绑定新增项目事件，点击后跳转新增项目窗口
var dialog = "";
var hcdialog = "";
var fwb = [];
var fwbinfoAll = "";
var jhshztjl='';
var shzt = "";
var jalx = "";
var selectionSize = "";
var gldjdm = "";
var fwpcdm = "";
var fwpcmc = "";
var jhfwpc = [];
var fwmc = "";
var fwmcjhwzd = '';
var jhlx = '';
var zpfj = '';
var showczBtn=true;

var checkAllWeek = function () {

    $('input[name="week"]').iCheck('check');
};
var uncheckAllWeek = function () {

    $('input[name="week"]').iCheck('uncheck');
};

wn.iCheckInit();


$(function () {
    getJhzdFormInfo();
    initButtons();
});

function getJhzdFormInfo() {
    $.ajax({
        url: 'yyhptjhglhy.do?action=jhzdDetail',
        type: 'get',
        dataType: 'json',
        data: {
            yngrbsh: currow.YNGRBSH,
            djlsh: currow.DJLSH,
            jhlsh: currow.JHLSH,
            jhsh: currow.JHSH
        }
    }).done(function (datas) {
        //页面个人基本信息赋值
        setJhzdGrForm(datas, currow);

        //页面评估结论赋值
        setGrjkzkpgjlControl(datas);
    }).fail(function () {
        console.log("error");
    }).always(function () {
        console.log("complete");
    });
}

function setJhzdGrForm(datas, row) {
    getParamForUse(row);

    $('input[name="weekAll"][value="8"]').on('ifChecked', checkAllWeek);
    $('input[name="weekAll"][value="8"]').on('ifUnchecked', uncheckAllWeek);

    $("#hzxm").text((datas.grjbxx)[0].XM);

    if ($.trim(datas.grjbxx[0].LXDH) != '') {
        $("#lxdh").text(datas.grjbxx[0].LXDH);
    }
}

function setGrjkzkpgjlControl(datas) {
    gldjdms.length = 0;//清空数组
    //评估结论
    var grjkzkpg = datas.grjkzkpgs;
    var s = 0;
    $.each(grjkzkpg, function () {
        gldjdms[s] = this.GLDJDM;
        s++;
        $("#pgjlnrgr").html(this.PGJL);
        $("#jhzdfwpc").html(this.PCMC);
        gldjdm = this.GLDJDM;
        fwmcjhwzd = this.PCDM;
    });

    if (s == 0) {
        $("#pgjlnrgr").html('0.0');
        $("#jhzdfwpc").html('0.0');
        gldjdm = '0.0';
    }
    jhfwpc = datas.jhfwpc;
    arrayTolb($('#jhzdfwpc'), jhfwpc);

    if (fwmc == null) {
        fwmc = fwmcjhwzd;
    }

    $("#jhzdfwpc").val(fwmc).trigger('change');

    for (var i = 0; i < datas.jhzxsj.length; i++) {
        $('input[name="week"][value=' + datas.jhzxsj[i].WEEK + ']').iCheck('check');
    }
}

function initTable() {
    //先销毁表格
    $("#table_fwjhzd").bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $("#table_fwjhzd").bootstrapTable({
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
                valign:'middle'
            },
            {
                field: 'FWXMMC',
                title: '服务项目',
                align: 'left',
                valign:'middle'
            },
            {
                field: 'FWDJ',
                title: '单价(元)',
                align: 'center',
                valign:'middle'
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
                valign:'middle',
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
                valign:'middle',
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

/*
 装载tables  fx
 */
function initTables(){
    initTable();
    initTable1();
    setJhhj_money();
    $('input[name="weekAll"][value="8"]').on('ifChecked', checkAllWeek);
    $('input[name="weekAll"][value="8"]').on('ifUnchecked', uncheckAllWeek);
}

function bindAllcheck(){
    jhzd_checkbind();
}

function tablesobj(){
    return $("#table_fwjhzd");
}

//获取参数供页面使用
function getParamForUse(row) {
    fwmc = row.FWPCDM;
    shzt = row.SHZT;
    jhshztjl=shzt;
    jalx = row.JALX;
    jhlx = row.JHLX;
    djlsh = row.DJLSH;
    jhlsh = row.JHLSH;
    yngrbsh = row.YNGRBSH;
    jhjssj = row.JSRQ;
    zpfj = row.ZPFJ;
    if (jhlx == '临时计划') {
        $("#cqjh_fwsj").css("display", 'none');
        $("#jhzd_fwpc").css("display", 'none');
        $("#jhzd_fwpcmc").css("display", 'none');
        $("#lsjh_fwsj").css("display", 'block');
        $("#lsjh_fwsjvalue").css("display", 'block');
        $("#lsjh_fwsjvalue").html(row.KSRQ);
        $('#fwdz_lsjh').css("display", 'block');
        $("#FWDZ").val(row.JHFWDZ);
    }

    if (shzt == '1' || jalx == '1' || jhlx == '临时计划') {
        // $("#btn_jhzd_save").prop("disabled", true);
        $("#btn_jhzd_addfw").prop("disabled", true);
        $("#btn_jhzd_addxm").prop("disabled", true);
        $("#btn_jhzd_addhc").prop("disabled", true);
        $("#btn_jhzd_reset").prop("disabled", true);
    }

    if (jhlsh) {
        $.fn.fileinput("show", "uploadfiles/JHGL", jhlsh, zpfj, "fjdzDiv", "fileDiv");
    } else {
        $.fn.fileinput("show", "uploadfiles/JHGL", null, null, "fjdzDiv", "fileDiv");
    }

    getData(djlsh, jhlsh, yngrbsh);
}

function getData(djlsh, jhlsh, yngrbsh) {
    $.ajax({
        url: 'yyhptjhglhy.do?action=yzdxm',
        type: 'get',
        dataType: 'json',
        data: {
            djlsh: djlsh,
            jhlsh: jhlsh,
            yngrbsh: yngrbsh
        },
        success: function (data) {
            if (data.rows.length > 0) {
                $("#jhzdrq").html(data.rows[0].ZDRQ);
            } else {
                $("#jhzdrq").html(getNowFormatDate());
            }
            obj = data;
            fwb = data.fwb;

            initTables();
        }
    })
}

function initButtons() {
    //绑定保存按钮，点击后保存数据
    $("#btn_jhzd_save").bind("click", function () {
        if (jalx == '1') {
            wnform.toast('已中止服务，不能修改!');
            $("#btn_jhzd_save").prop("disabled", true);
            return false;
        } else if (jhlx == '临时计划') {
            wnform.toast('临时计划，不能修改!');
            $("#btn_jhzd_save").prop("disabled", true);
            return false;
        } else {
            if (shzt == "1") {
                wnform.toast('计划已经审核，不能修改!');
                $("#btn_jhzd_save").prop("disabled", true);
                return false;
            } else {
                if (arrCount(obj.rows) == 0) {
                    wnform.toast('请添加服务项目!');
                    return false;
                } else {
                    doRepeat();
                    doSave();
                }
            }
        }
    });

    //绑定新增服务包事件，点击后跳转新增服务包窗口
    $("#btn_jhzd_addfw").bind("click", function (dialog) {
        if (shzt == "1") {
            wnform.toast('计划已经审核，不能修改!');
            return false;
        } else {
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

        }
    });

    $("#btn_jhzd_addxm").bind("click", function () {
        if (shzt == "1") {
            wnform.toast('计划已经审核，不能修改!');
            return false;
        } else {
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

        }

    });

    //绑定清空事件，清空所有记录
    $("#btn_jhzd_reset").bind("click", function () {
        if (shzt == "1") {
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
                            $("#table_fwjhzd").bootstrapTable('removeAll');
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
    $("#btn_jhzd_exit").bind("click", function () {
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

function removeElement(array, index) {
    if (index >= 0 && index < array.length) {
        for (var i = index; i < array.length; i++) {
            array[i] = array[i + 1];
        }
        array.length = array.length - 1;
    }
    return array;

}

$(function () {
    $.ajax({
        url: 'yyhptjhglhy.do?action=getFwbInfo',
        type: 'get',
        dataType: 'json',
        data: null,
        success: function (data) {
            fwbinfoAll = data;
        }
    })
});

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
    if ($('input[name=week]:checked').length != selectionSize) {
        wnform.toast('请选择' + selectionSize + '个执行时间!');
        return false;
    }
    $.each($('input[name=week]:checked'), function (k, v) {
        jhzxTimes += $(v).prop("value") + ',';
    });

    fwpcmc = $("#jhzdfwpc").find("option:selected").text();
    fwpcdm = $("#jhzdfwpc").val();
    if (shzt == "1") {
        wnform.toast('计划已经审核，不能修改!');
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
            obj.rows[k]. FWHJ= $('input[type=number][id=' + numId + ']').val() * v.FWDJ;
        });
        var fwxm = JSON.stringify(obj.rows).toLowerCase();

        var xmhc = JSON.stringify(xmhcrows).toLowerCase();

        var strFwb = JSON.stringify(fwb).toLowerCase();

        $("#btn_jhzd_save").prop("disabled", true);
        $.ajax({
            url: 'yyhptjhglhy.do?action=saveJhglYzdxm',
            type: 'post',
            dataType: 'json',
            data: {
                djlsh: djlsh,
                jhlsh: jhlsh,
                yngrbsh: yngrbsh,
                jhjssj: jhjssj,
                fwxm: fwxm,
                fwb: strFwb,
                flag: "jhglrk",
                yjhlsh: "",
                bgsqinfo: "",
                jhzxTimes: jhzxTimes,
                gldjdm: gldjdm,
                fwpcdm: fwpcdm,
                fwpcmc: fwpcmc,
                xmhc: xmhc,
                jhfwdz: $('#FWDZ').val(),
                jehj: $('#money_sum').text().replaceAll('元',''),
                hcje:$('#money_hchj').text().replaceAll('元',''),
                xmje:$('#money_xmhj').text().replaceAll('元','')
            },
            success: function (data) {
                if (data[0].code == 'T') {
                    jhlsh = data[0].key;
                    upload(jhlsh);
                    $("#btn_jhzd_save").prop("disabled", false);
                    wnform.toast('保存成功!');
                } else {
                    wnform.toast('保存失败!');
                }
                $('#table').bootstrapTable('refresh');//刷新计划管理列表

                GetRqNum();//刷新计划管理列表头部统计模块数据
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

