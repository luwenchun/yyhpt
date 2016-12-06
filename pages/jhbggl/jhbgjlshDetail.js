var jhlsh = '';
var yngrbsh = '';
var djlsh = '';
var jhshztjl = '';
var jalx = '';
var jhzt = '';
var shdialogRef='';
var jhshfwxm;
var newAddFwxm;
var jhmxlsh='';
var fwbInfo=[];
var shzt='';
$(function () {
    yngrbsh = mainSelectedRow.YNGRBSH;
    jhlsh = mainSelectedRow.XJHLSH;
    djlsh = mainSelectedRow.DJLSH;

    //表格加载
    getFwjhshListData(mainSelectedRow);

    $.ajax({
        url: 'yyhptjhgl.do?action=jhzdDetail',
        type: 'get',
        dataType: 'json',
        data: {
            yngrbsh: mainSelectedRow.YNGRBSH,
            djlsh: mainSelectedRow.DJLSH,
            jhlsh: mainSelectedRow.XJHLSH
        }
    }).done(function (datas) {
        //页面个人基本信息赋值
        setJhshGrForm(datas, mainSelectedRow);
    }).fail(function () {
        console.log("error");
    }).always(function () {
        console.log("complete");
    });

    //新增按钮事件
    $('#jhsh_btn_add').on('click', function () {
        if (jhlsh == '' || jhlsh == null) {
            BootstrapDialog.show({
                title: '提示信息',
                message: '没有制定计划，无法新增服务项目!',
                buttons: [{
                    label: '确定',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });
            return false;
        }
        modelFunc_JhshAdd(null, '新增服务项目', 1);
        return false;
    });
    //执行按钮事件
    $('#jhsh_btn_Submit').on('click', function () {
        if (jhlsh == '' || jhlsh == null) {
            BootstrapDialog.show({
                title: '提示信息',
                message: '没有制定计划，无法审核!',
                buttons: [{
                    label: '确定',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });
            return false;
        }

        if (jalx == '1') {
            wnform.toast('已中止服务，不能修改!');
            $("#jhsh_btn_Submit").prop("disabled", true);
            return false;
        }
        if (jhzt != '0') {
            wnform.toast('计划已经执行，不能修改!');
            $("#jhsh_btn_Submit").prop("disabled", true);
            $("#jhsh_btn_add").prop("disabled", true);
            return false;
        } else {
            var jhshztIsChange = $("input[name=shzt]:checked").val();
            if (jhshztjl == jhshztIsChange) {
                wnform.toast('计划已审核!');
                return false;
            }
        }
        saveJhsh();
        return false;
    });

    $("#jhsh_btn_exit").bind("click", function () {
        dialogRefs.close();
    });
});

function saveJhsh() {
    for (var i = 0; i < jhshfwxm.rows.length; i++) {
        var fwbdm = jhshfwxm.rows[i].FWBDM;
        var fwbmc = jhshfwxm.rows[i].FWBMC;
        var jhfwblsh = jhshfwxm.rows[i].JHFWBLSH;
        // fwbInfo.push({FWBDM: fwbdm, FWBMC: fwbmc, JHFWBLSH: jhfwblsh});
        fwbInfo.push({FWBDM: fwbdm, FWBMC: fwbmc});
    }
    doRepeat();
    if(jhshfwxm.rows.length==0){
        wnform.toast('请添加服务项目!');
        return false;
    }else{
        $.ajax({
            url: 'yyhptjhgl.do?action=updateJhshZt',
            type: "post",
            dataType: "json",
            data: {
                yngrbsh: yngrbsh,
                jhlsh: jhlsh,
                shzt: $("input[name='shzt']:checked").val(),
                shsm: $('#shsm').val(),
                djlsh: djlsh,
                jhmxlsh: jhmxlsh,
                rows: JSON.stringify(jhshfwxm.rows),
                fwbInfo:JSON.stringify(fwbInfo)
            },
            success: function (data) {
                if (data[0].code == "T") {
                    wnform.toast('保存成功!');
                    $('#table_fwjhsh').bootstrapTable('refresh');
                    getFwjhshListData(mainSelectedRow);
                    $('#table').bootstrapTable('refresh');//刷新计划管理列表
                }
                else
                    alert(data[0].message);
            }
        });
    }

}

//计划审核-个人基本信息页面赋值
function setJhshGrForm(datas, row) {
    jalx = row.JALX;
    if (jalx == '1'|| jhzt != '0') {
        $("#jhsh_btn_add").prop("disabled", true);
    }
    $("#hzxm").text((datas.grjbxx)[0].XM);

    if($.trim(datas.grjbxx[0].LXDH)!=''){
        $("#lxdh").text(datas.grjbxx[0].LXDH);
    }

    $("#pgjlnrgr").html(datas.grjkzkpgs[0].PGJL);
    $("#jhzdfwpc").html(row.FWPCMC);
    var jhzxtime = "";
    for (var i = 0; i < datas.jhzxsj.length; i++) {
        jhzxtime += getJhzxTime(datas.jhzxsj[i].WEEK);
    }
    $("#jhzdzxsj").html(jhzxtime);

    if (row.ZPFJ) {
        displayFiles($('#fileDiv'), 'uploadfiles/JHGL', row.JHLSH, row.ZPFJ);
    } else {
        $('#fjDiv').hide();
        $('#cqjh_type').css('margin-bottom', 12);
    }
    $('input[name=shzt]').iCheck({
        checkboxClass: 'icheckbox_flat-wnred',
        radioClass: 'iradio_flat-wnred',
        increaseArea: '20%'
    })
}

function getJhzxTime(n) {
    var a = " ";
    switch (n) {
        case 1:
            a += '星期一';
            break;
        case 2:
            a += '星期二';
            break;
        case 3:
            a += '星期三';
            break;
        case 4:
            a += '星期四';
            break;
        case 5:
            a += '星期五';
            break;
        case 6:
            a += '星期六';
            break;
        case 7:
            a += '星期日';
            break;
        default:
            console.log("啥也没有");
            a += '星期一';
    }
    return a;
}

function getFwjhshListData(mainSelectedRow) {
    $.ajax({
        url: 'yyhptjhgl.do?action=jhshList',
        type: 'get',
        dataType: 'json',
        data: {
            jhlsh: mainSelectedRow.XJHLSH,
            djlsh: djlsh
        },
        success: function (data) {
            allData=data.rows;

            jhmxlsh= data.rows[0].JHMXLSH;

            jhfwblsh=data.rows[0].JHFWBLSH;

            if (data.rows[0] != undefined) {
                $('#shsm').val(data.rows[0].SHBTGYY);
                var i = data.rows[0].SHZTS;
                shzt=data.rows[0].SHZTS;
                if (i == 2) {
                    $("input[name=shzt]")[1].checked = true;
                } else {
                    $("input[name=shzt]")[0].checked = true;
                }
                jhshztjl = data.rows[0].SHZTS;
                jhzt = data.rows[0].JHZT;
            } else {
                $("input[name=shzt]")[0].checked = true;
            }
            $("#jhzdryxm").html(data.rows[0].ZDRYXM == null ? '' : data.rows[0].ZDRYXM);
            $("#jhzdrq").html(data.rows[0].ZDRQ == null ? '' : data.rows[0].ZDRQ);

            jhshfwxm=data;

            initFwjhshTable();
        }
    })
}

function initFwjhshTable() {
// 先销毁表格
    $("#table_fwjhsh").bootstrapTable('destroy');
// 初始化表格,动态从服务器加载数据
    $("#table_fwjhsh").bootstrapTable(
        {
            classes: 'table table-hover warning',
            // method: "get", // 使用get请求到服务器获取数据
            // url: "yyhptjhgl.do?action=jhshList", // 获取数据的Servlet地址
            data:jhshfwxm.rows,
            contentType: "application/json",
            iconSize: 'sm',
            height: jhshfwxm.rows.length * 32 + 34 >= 200 ? 225 : jhshfwxm.rows.length * 32 + 34,
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
                var sTableHeight = res.rows.length * 32 + 34 >= 200 ? 225 : res.rows.length * 32 + 34;
                $('#table_fwjhsh').bootstrapTable('resetView', {height: sTableHeight});
                return res;
            },
            queryParamsType: "undefined",
            showPaginationSwitch: false,
            queryParams: function queryParams(params) { // 设置查询参数
                var param = {
                    currPage: params.pageNumber,
                    pageSize: params.pageSize,
                    jhlsh: jhlsh,
                    djlsh: djlsh
                };
                return param;
            },
            columns: [
                {
                    field: 'FWBMC',
                    title: '&nbsp;&nbsp;&nbsp;服务包&nbsp;&nbsp;&nbsp;&nbsp;',
                    align: 'center',
                    valign: 'top'
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
                },
                {
                    field: 'SHZT',
                    title: '状态',
                    align: 'center'
                },
                {
                    field: 'SHRQ',
                    title: '审核日期',
                    align: 'center',
                    visible: false
                },
                {
                    field: 'SHRXM',
                    title: '审核人员',
                    align: 'center',
                    visible: false
                },
                {
                    field: 'CZ',
                    title: '操作',
                    align: 'center',
                    events: {
                        'click .delete': function (e, value, row, index) {
                            deletejhshInfo(row, index);
                        }
                    },
                    formatter: function (value, row, index) {
                        return '<a class="delete"  href="javascript:void(0)"><img src="layouts/img/table/icon_deldata.png"> </a>';
                    },
                    visible: jhshztjl!='1'
                }],
            onLoadSuccess: function (data) {
            },
            onLoadError: function () { // 加载失败时执行

            },
            onCheck: function (row) {
                //$("#remove").attr("disabled", false);
            },
            onUncheck: function (row) {
                // alert(row.id);
            }
        });

    wnform.MergeCell($('#table_fwjhsh'), jhshfwxm, 'FWBMC');
}

function deletejhshInfo(row, index) {
    console.log("deleteInfo");
    BootstrapDialog.show({
        title: '提示信息',
        message: '是否删除？',
        buttons: [{
            label: '确定',
            action: function (dialog) {
                for (var i = 0; i < jhshfwxm.rows.length; i++) {
                    if (jhshfwxm.rows[i] == row) {
                        jhshfwxm.rows = removeElement(jhshfwxm.rows, i);//删除方法
                    }
                }
                initFwjhshTable();
                dialog.close();
            }
        }, {
            label: '取消',
            action: function (dialog) {
                dialog.close();
            }
        }]
    });
};

// 新增服务项目弹出方法
modelFunc_JhshAdd = function (row, mtitle, mflag) {
    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/jhgl/jhzxAdd.html'),
        /*buttons: [{
            label: '保存',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                var rows = $('#fwxmtable').bootstrapTable('getSelections');
                for (var j = 0; j < rows.length; ++j) {
                    if (rows[j].SL < 1) {
                        BootstrapDialog.show({
                            title: '提示信息',
                            message: '所选服务项目的【数量】不可小于1！',
                            type: BootstrapDialog.TYPE_WARNING,
                            size: BootstrapDialog.SIZE_SMALL,
                            buttons: [{
                                label: '确定',
                                action: function (dialog) {
                                    dialog.close();
                                }
                            }]
                        });
                        return false;
                    }
                }

                if (rows.length == 0) {
                    BootstrapDialog.show({
                        title: '提示信息',
                        message: '请选择要保存的服务项目!',
                        buttons: [{
                            label: '确定',
                            action: function (dialog) {
                                dialog.close();
                            }
                        }]
                    });
                    return false;
                }
                $.ajax({
                    url: 'yyhptjhgl.do?action=insertJhzxFwxm',
                    type: "post",
                    dataType: "json",
                    data: {
                        yngrbsh: yngrbsh,
                        jhlsh: jhlsh,
                        rows: JSON.stringify(rows)
                    },
                    success: function (data) {
                        if (data[0].code == "T") {
                            dialogItself.close();
                        }
                        else
                            alert(data[0].message);

                        $('#table_fwjhsh').bootstrapTable('refresh');

                    }
                });
            }
        }, {
            label: '取消',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],*/
        onshow: function (dialogRef) {
        },
        onshown: function (dialogRef) {
            shdialogRef=dialogRef;
            // initFwxmTable(jhlsh);
            // getMjgFwxmData(jhlsh);
        },
        onhide: function (dialogRef) {
            $(this).removeData("bs.modal");
        },
        onhidden: function (dialogRef) {
            $(this).removeData("bs.modal");
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

};

function doRepeat() {
    if (arrCount(fwbInfo)) {
        var fwbdmarr = [];
        for (var i = 0; i < arrCount(fwbInfo); i++) {
            fwbdmarr[i] = fwbInfo[i].FWBDM;
        }
        fwbdmarr = unique(fwbdmarr);
        fwbInfo = [];
        for (var j = 0; j < arrCount(fwbdmarr); j++) {
            if (fwbdmarr[j] == "0000") {
                fwbInfo.push({FWBDM: '0000', FWBMC: '服务包外项目'});
            } else {
                fwbInfo.push(getFwb(fwbdmarr[j]));
            }
        }
    }
}
var fwbinfoAll='';
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

