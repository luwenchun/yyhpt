var jhlsh = '';
var yngrbsh = '';
var djlsh = '';
var jhshztjl = '';
var jhzt = '';
var jalx = '';
var jhlx = '';
var jhlxType = '';
var allData;
//临时计划执行日期设定值
var lsjhzxrq = '';
var shdialogRef = '';
var obj;
var newAddFwxm;
var jhmxlsh = '';
var fwbInfo = [];

var showczBtn=true;

$(function () {
    yngrbsh = currow.YNGRBSH;
    jhlsh = currow.JHLSH;
    djlsh = currow.DJLSH;
    // //表格加载
    getFwjhshListData(currow);

    //获取数据，绑定页面信息
    getDataForForm();

    //初始化按钮事件
    initButtons_jhsh();
});

function getDataForForm() {
    $.ajax({
        url: 'yyhptjhglhy.do?action=jhzdDetail',
        type: 'get',
        dataType: 'json',
        data: {
            yngrbsh: currow.YNGRBSH,
            djlsh: currow.DJLSH,
            jhlsh: currow.JHLSH
        }

    }).done(function (datas) {
        //页面个人基本信息赋值
        setJhshGrForm(datas, currow);
    }).fail(function () {
        console.log("error");
    }).always(function () {
        console.log("complete");
    });
}

function initButtons_jhsh() {
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
            wnform.toast('计划已经执行，不允许更改审核结果!');
            $("#jhsh_btn_Submit").prop("disabled", true);
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
var fwbinfoAll = '';
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


/*
 装载tables  fx
 */
function initTables(){
    initFwjhshTable();
    initTable1();
    setJhhj_money();
}

function tablesobj()
{
    return $("#table_fwjhsh");
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

function saveJhsh() {
    for (var i = 0; i < obj.rows.length; i++) {
        var fwbdm = obj.rows[i].FWBDM;
        var fwbmc = obj.rows[i].FWBMC;
        fwbInfo.push({FWBDM: fwbdm, FWBMC: fwbmc});
    }
    doRepeat();

    $.each(obj.rows, function (k, v) {
        var numId = 'isEdit' + k;
        obj.rows[k].FWSL = $('input[type=number][id=' + numId + ']').val();
        obj.rows[k].FWHJ = $('input[type=number][id=' + numId + ']').val() * v.FWDJ;
    });


    var xmhc = JSON.stringify(xmhcrows).toLowerCase();

    if(obj.rows.length==0){
        wnform.toast('请添加服务项目!');
        return false;
    }else{
        $.ajax({
            url: 'yyhptjhglhy.do?action=updateJhshZt',
            type: "post",
            dataType: "json",
            data: {
                yngrbsh: yngrbsh,
                jhlsh: jhlsh,
                shzt: $("input[name='shzt']:checked").val(),
                shsm: $('#shsm').val(),
                djlsh: djlsh,
                jhmxlsh: jhmxlsh,
                rows: JSON.stringify(obj.rows),
                fwbInfo: JSON.stringify(fwbInfo),
                xmhc: xmhc,
                jhfwdz:$('#FWDZ').val(),
                jehj: $('#money_sum').text().replaceAll('元',''),
                hcje:$('#money_hchj').text().replaceAll('元',''),
                xmje:$('#money_xmhj').text().replaceAll('元','')
            },
            success: function (data) {
                if (data[0].code == "T") {
                    wnform.toast('保存成功!');
                    $('#table_fwjhsh').bootstrapTable('refresh');
                    getFwjhshListData(currow);
                    $('#table').bootstrapTable('refresh');//刷新计划管理列表
                    if (jhlx == '临时计划' && $("input[name='shzt']:checked").val() == '1') {
                        var selectedRows = allData;

                        if (wnform.isEmpty(lsjhzxrq)) {
                            BootstrapDialog.show({
                                title: '提示信息',
                                message: '执行日期不能为空!',
                                buttons: [{
                                    label: '确定',
                                    action: function (dialog) {
                                        dialog.close();
                                    }
                                }]
                            });
                            return false;
                        }

                        runDatas('', '确认要执行所有的服务项目吗?', 2);
                        return false;
                    }else{
                        GetRqNum();//刷新计划管理列表头部统计模块数据
                    }
                }
                else
                    alert(data[0].message);
            }
        });
    }

}

function getFwjhshListData() {
    $.ajax({
        url: 'yyhptjhglhy.do?action=jhshList',
        type: 'get',
        dataType: 'json',
        data: {
            jhlsh: currow.JHLSH,
            djlsh: currow.DJLSH,
            yngrbsh:yngrbsh
        },
        success: function (data) {
            allData = data.rows;

            jhmxlsh = data.rows[0].JHMXLSH;

            jhfwblsh = data.rows[0].JHFWBLSH;

            if (data.rows[0] != undefined) {
                $('#shsm').val(data.rows[0].SHBTGYY);
                var i = data.rows[0].SHZTS;
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
            obj = data;
            initTables();
            wnform.MergeCell($('#table_fwjhsh'), obj, 'FWBMC');

        }
    })
}



function initFwjhshTable() {
// 先销毁表格
    $("#table_fwjhsh").bootstrapTable('destroy');
// 初始化表格,动态从服务器加载数据
    $("#table_fwjhsh").bootstrapTable({
        classes: 'table table-hover warning',
        // method: "get", // 使用get请求到服务器获取数据
        // url: "yyhptjhglhy.do?action=jhshList", // 获取数据的Servlet地址
        data: obj.rows,
        contentType: "application/json",
        iconSize: 'sm',
        // height: obj.rows.length * 32 + 34 >= 200 ? 225 : obj.rows.length * 32 + 34,
        height:obj.rows.length * 47 + 34 >= 282 ? 235 : obj.rows.length * 47 + 34,
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
                align: 'left',
                valign:'middle'
            },
            {
                field: 'FWPCMC',
                title: '服务频次',
                align: 'center',
                visible: false
            },
            {
                field: 'FWDJ',
                title: '单价(元)',
                align: 'center',
                visible: true,
                valign:'middle'
            },
            {
                field: 'FWSL',
                title: '数量(次)',
                align: 'center',
                valign:'middle',
                visible: true,
                formatter: function (value, row, index) {
                    // 适配数量
                    if(row.FWSL){
                        value=row.FWSL;
                    }
                    var id = "isEdit" + index;
                    return '<input type="number"  onkeyup="checkNum(this)"  onBlur="setFwscRow(this,' + index + ');" class="form-control  input-sm " text_aline="center" style="width: 60px" value=' + value + ' min=1  name="slEdit" id=\"' + id + '\" placeholder="数量"/ maxlength="3">';
                }
            },
            {
                field: 'FWHJ',
                title: '金额(元)',
                align: 'center',
                valign:'middle',
                visible: true
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
                valign:'middle',
                align: 'center',
                visible: false
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
                valign:'middle',
                events: {
                    'click .delete': function (e, value, row, index) {
                        deleteInfo(row, index);
                    }
                },
                formatter: function (value, row, index) {
                    return '<a class="delete"  href="javascript:void(0)"><img src="layouts/img/table/icon_deldata.png"> </a>';
                },
                visible: jhshztjl != '1'
            }],
        onLoadSuccess: function (data) { // 加载成功时执行
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

    wnform.MergeCell($('#table_fwjhsh'), obj, 'FWBMC');
}


function bindAllcheck(){
    jhzd_checkbind();
}


runDatas = function (row, mTitle, mFlag) {
    var rows = allData; //传入后台已过滤的服务项目(过滤掉已执行的服务项目)
    $.ajax({
        url: "yyhptjhglhy.do?action=jhzx_run",
        type: "post",
        dataType: "json",
        data: {
            rows: JSON.stringify(rows),
            zxrq: lsjhzxrq,
            jhlx: jhlxType
        },
        success: function (data) {
            //任务执行成功则同时将任务信息返回前台显示，失败则只返回失败信息
            //alert(data.FWXM);  //返回的任务信息
            if (data.STATUS == "F") {
                $.toaster({
                    priority: 'info',
                    title: '提示',
                    message: data.MSG
                });
            } else {
                GetRqNum();//刷新计划管理列表头部统计模块数据
                dialog_data = data.FWXM;  //获取返回的任务信息
                showRwxxModelFuncInfo('生成的任务信息');
                $('#jhsh_btn_Submit').css("disabled", true);
            }
        },
        complete: function (xhr) {
            wn.hiddenLoading();
        }
    });
};
//显示生成/停止的任务信息
showRwxxModelFuncInfo = function (mtitle) {
    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/jhglhy/jhzxShowRwxx.html'),
        buttons: [{
            label: '确定',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],
        onshow: function (dialogRef) {
        },
        onshown: function (dialogRef) {
            var tableRwxx = $("#tableRwxx");
            // 先销毁表格
            tableRwxx.bootstrapTable('destroy');
            // 初始化表格,动态从服务器加载数据
            tableRwxx.bootstrapTable({
                classes: 'table table-hover warning',
                method: "get",           //使用get请求到服务器获取数据
                /*data: dialog_data[0],        //绑定数据*/
                url: "yyhptjhglhy.do?action=getRwdxInfo", // 获取数据的Servlet地址
                contentType: "application/json",
                iconSize: 'sm',
                showHeader: true,
                striped: true,           // 表格显示条纹
                pagination: true,      // 启动分页
                pageSize: 10,           // 每页显示的记录数
                pageNumber: 1,        // 当前第几页
                pageList: [2],         // 记录数可选列表
                search: false,           // 是否启用查询
                showColumns: false, // 显示下拉框勾选要显示的列
                showRefresh: false,  // 显示刷新按钮
                onlyInfoPagination: false,
                sidePagination: "server", // 表示服务端请求
                uniqueId: "RWDXLSH", // 每一行的唯一标识，一般为主键列
                clickToSelect: true,       // 是否启用点击选中行
                minimumCountColumns: 2, // 最少允许的列数
                responseHandler: function (res) {
                    return res;
                },
                queryParamsType: "undefined",
                showPaginationSwitch: false,
                queryParams: function queryParams(params) { // 设置查询参数
                    var param = {
                        currPage: params.pageNumber,
                        pageSize: params.pageSize,
                        jhlsh: dialog_data[0].JHLSH
                    };
                    return param;
                },
                columns: [{
                    title: '序号',
                    formatter: function (value, row, index) {
                        return index + 1;
                    }
                }, {
                    field: 'XM',
                    title: '姓名'

                }, {
                    field: 'ZRRXM',
                    title: '责任人'
                }, {
                    field: 'KSRQ',
                    title: '开始日期'
                }, {
                    field: 'JSRQ',
                    title: '结束日期'
                }],
                onLoadSuccess: function () { // 加载成功时执行
                    $('#jhsh_btn_Submit').css("disabled", true);
                },
                onLoadError: function () { // 加载失败时执行
                    alert("error");
                },
                onCheck: function (row) {
                },
                onUncheck: function (row) {
                }
            });
        },
        onhide: function (dialogRef) {
        },
        onhidden: function (dialogRef) {
        }
    });
};

//计划审核-个人基本信息页面赋值
function setJhshGrForm(datas, row) {
    jalx = row.JALX;
    jhlx = row.JHLX;
    if (jhlx == '临时计划') {
        jhlxType = '2';
    } else {
        jhlxType = '1';
    }
    if (jalx == '1' || row.SCRWDX != '0') {
        // $("#jhsh_btn_Submit").prop("disabled", true);
        $("#jhsh_btn_add").prop("disabled", true);
        $("#btn_jhzd_addhc").prop("disabled", true);
    }

    $("#hzxm").text((datas.grjbxx)[0].XM);
    if ($.trim(datas.grjbxx[0].LXDH) != '') {
        $("#lxdh").text(datas.grjbxx[0].LXDH);
    }
    var jhzxtime = "";
    for (var i = 0; i < datas.jhzxsj.length; i++) {
        jhzxtime += getJhzxTime(datas.jhzxsj[i].WEEK);
    }

    if (jhlx == '临时计划') {
        $("#jhsh_btn_add").prop("disabled", true);
        $("#btn_jhzd_addhc").prop("disabled", true);
        $("#cqjh_type").css("display", 'none');
        $("#lsjh_type").css("display", 'block');
        $("#pgjlnrgr_lsjh").html(datas.grjkzkpgs[0].PGJL);
        $("#jhzdzxsj_lsjh").html(row.KSRQ);
        $('#FWDZ').val(row.JHFWDZ);
        lsjhzxrq = row.KSRQ;

    } else {
        $("#pgjlnrgr").html(datas.grjkzkpgs[0].PGJL);
        $("#jhzdfwpc").html(row.FWPCMC);
        $("#jhzdzxsj").html(jhzxtime);
    }
    if (row.ZPFJ) {
        displayFiles($('#fileDiv'), 'uploadfiles/JHGL', row.JHLSH, row.ZPFJ);
    } else {
        $('#fjDiv').hide();
        $('#cqjh_type').css('margin-bottom', 12);
    }
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
            a += '星期一';
    }
    return a;
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

// 新增服务项目弹出方法
modelFunc_JhshAdd = function (row, mtitle, mflag) {
    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/jhglhy/jhzxAdd.html'),
        onshow: function (dialogRef) {
        },
        onshown: function (dialogRef) {
            shdialogRef = dialogRef;
            // initFwxmTable(jhlsh);
            // getMjgFwxmData(jhlsh);
        },
        onhide: function (dialogRef) {
            $(this).removeData("bs.modal");
        },
        onhidden: function (dialogRef) {
            $(this).removeData("bs.modal");
            initTables();
        }
    });
};
