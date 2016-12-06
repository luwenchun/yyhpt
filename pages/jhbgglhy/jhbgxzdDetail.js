var rylist;//登记人员
var djlsh = "";
var jhlsh = "";
var yngrbsh = "";
var ygldjdm = "";
var gldjdms = new Array();//医养管理等级
var s = 0;
var obj = "";
var fwb = [];
var fwbinfoAll = "";
var jhjssj = "";
var flag = "bgglrk";
var bgsqinfo = [];
var yjhlsh = "";
var bgsqlsh = "";
$(function () {
    initButtons();
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
//个人基本信息页面赋值
function bgjl_setGrForm(datas) {
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
    yngrbsh = datas.yngrbsh;
    bgsqinfo = datas.grjhbgsqxxs;
    yjhlsh = datas.yjhlsh;
    bgsqlsh = datas.bgsqlsh;


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
            obj = data;
            fwb = data.fwb;
            initTable_();
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
        height: 200,
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
                field: 'FWPCMC',
                title: '服务频次',
                align: 'center'
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
                align: 'center'
            },
            {
                field: 'ZDRYXM',
                title: '制定人员',
                align: 'center'
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
                    return '<a class="delete"  href="javascript:void(0)"><img src="yyhpt/pages/img/fwlb_icon_02.png"> </a>';
                }
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
                initTable_();
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
    $("#btn_bgjl_save").bind("click", function () {
        if (arrCount(obj) == 0) {
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
                initTable_();
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
                initTable_();
            }

        });

    });

//绑定清空事件，清空所有记录
    $("#btn_bgjl_reset").bind("click", function () {
        var objObj = obj;
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
                        dialog.close();
                        var jhmxlsh = "";
                        for (var i = 0; i < obj.rows.length; i++) {
                            jhmxlsh += obj.rows[i].JHMXLSH + " ";
                        }
                        $.ajax({
                            url: 'yyhptjhglhy.do?action=deleteJhglYzdxm',
                            type: 'post',
                            dataType: 'json',
                            data: {
                                djlsh: djlsh,
                                yngrbsh: yngrbsh,
                                jhmxlsh: jhmxlsh
                            },
                            success: function (data) {
                                $.toaster({priority: 'warning', title: '提示', message: '删除成功!'});
                            }
                        });
                        obj.rows = [];
                        fwb = [];
                        initTable_();
                    }
                }, {
                    label: '取消',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });
        }
    });

//点击退出按钮，关闭当前窗口
    $("#btn_bgjl_exit").bind("click", function () {
        dialoging.close();
    });
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
    var fwxm = JSON.stringify(obj.rows).toLowerCase();
    var strFwb = JSON.stringify(fwb).toLowerCase();
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
            flag: flag,
            yjhlsh: yjhlsh,
            bgsqinfo: JSON.stringify(bgsqinfo).toLowerCase(),
            jhzxTimes: '',
            gldjdm: '',
            fwpcdm: '',
            fwpcmc: ''
        },
        success: function (data) {
            wnform.toast('保存成功!');
            $('#table').bootstrapTable('refresh');//刷新计划管理列表
            dialoging.close();
        }
    })
}
