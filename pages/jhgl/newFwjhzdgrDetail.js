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
var fwb = [];
var fwbinfoAll = "";
var shzt = "";
var jalx = "";
var selectionSize = "";
var gldjdm = "";
var fwpcdm = "";
var fwpcmc = "";
// var jhfwpc = [];
var fwmc = "";
var fwmcjhwzd = '';
var jhlx = '';
var zpfj='';

var jhfwpc = [{'id': 'W1D', 'name': '每周1次'},{'id': 'W2D', 'name': '每周2次'},{'id': 'W3D', 'name': '每周3次'},
    {'id': 'W4D', 'name': '每周4次'},{'id': 'W5D', 'name': '每周5次'},{'id': 'W6D', 'name': '每周6次'},{'id': 'W7D', 'name': '每周7次'}];

wn.iCheckInit();
$(function () {
    $.ajax({
        url: 'yyhptjhgl.do?action=jhzdDetail',
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

    initButtons();
});

var changedWeek = function () {
    if ($('input[name=weekAll][value="8"]').is(':checked')) {
        $('input[name="week"]').iCheck('uncheck');
    } else {
        $('input[name="week"]').iCheck('check');
    }
}
$('input[name=weekAll][value="8"]').on('ifClicked', changedWeek);

function setJhzdGrForm(datas, row) {
    fwmc = row.FWPCDM;
    shzt = row.SHZT;
    jalx = row.JALX;
    jhlx = row.JHLX;
    djlsh = row.DJLSH;
    jhlsh = row.JHLSH;
    yngrbsh = row.YNGRBSH;
    jhjssj = row.JSRQ;
    zpfj=row.ZPFJ;
    if (jhlx == '临时计划') {
        $("#cqjh_fwsj").css("display", 'none');
        $("#jhzd_fwpc").css("display", 'none');
        $("#jhzd_fwpcmc").css("display", 'none');
        $("#lsjh_fwsj").css("display", 'block');
        $("#lsjh_fwsjvalue").css("display", 'block');
        $("#lsjh_fwsjvalue").html(row.KSRQ);
    }
    $("#hzxm").text((datas.grjbxx)[0].XM);

    if ($.trim(datas.grjbxx[0].LXDH) != '') {
        $("#lxdh").text(datas.grjbxx[0].LXDH);
    }

    if (shzt == '1' || jalx == '1' || jhlx == '临时计划') {
        // $("#btn_jhzd_save").prop("disabled", true);
        $("#btn_jhzd_addfw").prop("disabled", true);
        $("#btn_jhzd_addxm").prop("disabled", true);
        $("#btn_jhzd_reset").prop("disabled", true);
    }

    if (jhlsh) {
        $.fn.fileinput("show", "uploadfiles/JHGL", jhlsh, zpfj, "fjdzDiv", "fileDiv");
    } else {
        $.fn.fileinput("show", "uploadfiles/JHGL", null, null, "fjdzDiv", "fileDiv");
    }

    getData(djlsh, jhlsh, yngrbsh);

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

    // jhfwpc = datas.jhfwpc;
    arrayTolb($('#jhzdfwpc'), jhfwpc);

    if (fwmc == null) {
        fwmc = fwmcjhwzd;
    }

    $("#jhzdfwpc").val(fwmc).trigger('change');

    for (var i = 0; i < datas.jhzxsj.length; i++) {
        $('input[name="week"][value=' + datas.jhzxsj[i].WEEK + ']').iCheck('check');
    }
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
    switch (fwpcdm) {
        case 'W1D':
            selectionSize=1;
            break;
        case 'W2D':
            selectionSize=2;
            break;
        case 'W3D':
            selectionSize=3;
            break;
        case 'W4D':
            selectionSize=4;
            break;
        case 'W5D':
            selectionSize=5;
            break;
        case 'W6D':
            selectionSize=6;
            break;
        case 'W7D':
            selectionSize=7;
            break;
        default:
            selectionSize=1;
            break;
    }

    if (fwpcdm == "W7D") {
        $('input[name="week"]').iCheck('check');
        $('input[name="weekAll"]').iCheck('check');
    } else {
        $('input[name="week"]').iCheck('uncheck');
        $('input[name="weekAll"]').iCheck('uncheck');
    }
}

function getData(djlsh, jhlsh, yngrbsh) {
    $.ajax({
        url: 'yyhptjhgl.do?action=yzdxm',
        type: 'get',
        dataType: 'json',
        data: {
            djlsh: djlsh,
            jhlsh: jhlsh,
            yngrbsh: yngrbsh
        },
        success: function (data) {
            if (data.rows.length > 0) {
                $("#jhzdryxm").html(data.rows[0].ZDRYXM);
                $("#jhzdrq").html(data.rows[0].ZDRQ);
            } else {
                $("#jhzdrq").html(getNowFormatDate());
            }
            obj = data;
            fwb = data.fwb;
            initTable();
        }
    })
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
        height: obj.rows.length * 32 + 34 >= 200 ? 225 : obj.rows.length * 32 + 34,
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
                align: 'center'
            },
            {
                field: 'FWXMMC',
                title: '服务项目',
                align: 'left'
            },
            {
                field: 'CZ',
                title: '操作',
                align: 'center',
                events: {
                    'click .delete': function (e, value, row, index) {
                        deleteInfo(row, index);
                    }
                },
                formatter: function (value, row, index) {
                    return '<a class="delete"  href="javascript:void(0)"><img src="layouts/img/table/icon_deldata.png"> </a>';
                },
                // visible: shzt == '0' || shzt == null || shzt == ""
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

function deleteInfo(row, index) {
    console.log("deleteInfo");
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
                initTable();
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

function removeElement(array, index) {
    if (index >= 0 && index < array.length) {
        for (var i = index; i < array.length; i++) {
            array[i] = array[i + 1];
        }
        array.length = array.length - 1;
    }
    return array;

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
                message: $('<div></div>').load('yyhpt/views/jhgl/fwbAddInfo.jsp'),
                onshow: function (dialogRef) {
                },
                onshown: function (dialogRef) {
                    dialogg = dialogRef;
                },
                onhide: function (dialogRef) {
                },
                onhidden: function (dialogRef) {
                    initTable();
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
                message: $('<div></div>').load('yyhpt/views/jhgl/fwxmAdd.html'),
                onshow: function (dialogRef) {
                },
                onshown: function (dialogRef) {
                    dialog = dialogRef;
                },
                onhide: function (dialogRef) {
                },
                onhidden: function (dialogRef) {
                    initTable();
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
                            dialog.close();
                            initTable();
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

$(function () {
    $.ajax({
        url: 'yyhptjhgl.do?action=getFwbInfo',
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
        var fwxm = JSON.stringify(obj.rows).toLowerCase();
        var strFwb = JSON.stringify(fwb).toLowerCase();
        $("#btn_jhzd_save").prop("disabled", true);
        $.ajax({
            url: 'yyhptjhgl.do?action=saveJhglYzdxm',
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
                fwpcmc: fwpcmc
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
        url: 'yyhptjhgl.do?action=upload',
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

