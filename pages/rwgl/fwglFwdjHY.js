/*
 * Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
 */

var fwgllb_data = $table.bootstrapTable('getData');  //获取列表的table数据
var fwryIds = [];   //服务人员id数组
var djlsh = '';
var mblx = '';  //护理记录类型
var mbnr = {hljlMbnr: '', jkzdMbnr: ''};
var fwxmmxTable = $('#fwxmmxTable');
var fwdjxmlb;
var fwjllsh = '';
var dialogAddXM = '';//服务登记新增项目弹框
var obj = [];
var fwdjWhole = [];     //存放全局变量
var showczBtn = false;
var xmhcrows = [];
var jhshztjl = '';
/**
 * [description] 初始化页面 事件注册
 */

$(function () {
    /*
     查找服务项目+耗材
     */
    getFwdjXmhclbData();
    // getFwdjHcInfo();

    $('#btn_Addfwxm').on('click', function () {
        getAddFwxm();
    });


    $('#btn_Save').on('click', function () {
        saveForm();
        return false;
    });

    $('#btn_Exist').on('click', function () {
        dialogModel.close();
        return false;
    });

    $('#btn_upload').on('click', function () {
        uploadFile();
        return false;
    });

    $('#btn_photo').on('click', function () {
        return false;
    });

});


/*
 服务项目+耗材查询  fwdjFwmxs
 */
function getFwdjXmhclbData() {
    $.ajax({
        url: 'yyhptRwglFwglhy.do?action=fwdjFwmxs',
        type: 'get',
        dataType: 'json',
        data: {
            currPage: 1,
            pageSize: 10,
            rwdxlsh: sRwdxlsh,
            yngrbsh: yngrbsh,
            fwjllsh: sFwjlsh
        },
        success: function (data) {
            obj = data;
            xmhcrows = obj.xmhcInfo;
            $.each(data.rows, function (k, v) {              // fx ? 不知道什么意思
                if (data.rows[k].FWJLLSH != '' || data.rows[k].FWJLLSH != null) {
                    fwjllsh = data.rows[k].FWJLLSH;
                }
            });
            initTables();
            $('#jlrq').html(getNowFormatDate());
        },
        error: function () {
            console.log('***!失败了')
        }
    });
}


/*
 装载tables  fx
 */
function initTables() {
    initXmmxTable();
    initTable1();
    setJhhj_money();
    bindAllcheck();
}

function getAddFwxm() {
    BootstrapDialog.show({
        title: '服务登记新增项目',
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/rwgl/fwdjxmAdd.jsp'),
        onshow: function (dialogRef) {
            dialogAddXM = dialogRef;
        },
        onshown: function (dialogRef) {
        },
        onhide: function (dialogRef) {
        },
        onhidden: function (dialogRef) {
            initTables();
        }
    });

}

/**
 * [initTable description] 初始化表格
 */
function fwgllbTable() {
    // 先销毁表格
    $('#fwgllbTable').bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $('#fwgllbTable').bootstrapTable({
        //height: $('#fwdjBodyDiv').height() - 30,
        classes: 'table table-hover warning',
        method: "get", // 使用get请求到服务器获取数据
        //url : "yyhptRwglFwglhy.do?action=fwdjFwgllb", // 获取数据的Servlet地址
        data: fwgllb_data,        //绑定主界面的任务对象数据
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
        uniqueId: "RWDXLSH", // 每一行的唯一标识，一般为主键列
        clickToSelect: true, // 是否启用点击选中行
        showExport: true,
        exportDataType: "basic",
        minimumCountColumns: 2, // 最少允许的列数
        singleSelect: true, //禁止多选
        responseHandler: function (res) {
            return res;
        },
        queryParamsType: "undefined",
        showPaginationSwitch: false,
        queryParams: function queryParams(params) { // 设置查询参数
            var param = {
                currPage: params.pageNumber,
                pageSize: params.pageSize,
                rwdxlsh: sRwdxlsh
            };
            return param;
        },
        columns: [
            {
                checkbox: true
            },
            {
                field: 'RYXX',
                title: '服务管理列表',
                align: 'center'
            }],
        onLoadSuccess: function () { // 加载成功时执行

        },
        onLoadError: function () { // 加载失败时执行

        },
        onCheck: function (row) {
            $("#remove").attr("disabled", false);
        },
        onUncheck: function (row) {

        },
        onClickRow: function (row) {
            //获取当前单击的行
            sRwdxlsh = row.RWDXLSH;

            //初始化表单
            initForm();
            //刷新服务项目明细列表
            fwxmmxTable.bootstrapTable('refresh');
        }
    });
};

/**
 *  初始化表格
 */
fwgllbTable();
setTimeout(function () {
    //fwgllbTable.bootstrapTable('check',3);
    fwgllbTable.bootstrapTable('checkBy', {field: "RWDXLSH", values: [sRwdxlsh]})
}, 500);

var fwgllbTable = $('#fwgllbTable');

//已终止则设置按钮不可用(add 20160906 已评价或已回访也不可修改）
// if(sJalx=='1'||sfFwpj!='0'||sfFwhf!='0'){
// 	$("#btn_Save").prop('disabled',true);
// }
/**
 * [initTable description] 初始化表格
 */
function initXmmxTable() {
    // 先销毁表格
    $('#fwxmmxTable').bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $('#fwxmmxTable').bootstrapTable({
        classes: 'table table-hover warning',
        // method: "get", // 使用get请求到服务器获取数据
        // url: "yyhptRwglFwglhy.do?action=fwdjFwxmmx", // 获取数据的Servlet地址
        data: obj.rows,
        height: obj.rows.length * 47 + 34 >= 282 ? 235 : obj.rows.length * 47 + 34,
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
        sidePagination: "client", // 表示服务端请求
        uniqueId: "FWMXLSH", // 每一行的唯一标识，一般为主键列
        clickToSelect: true, // 是否启用点击选中行
        showExport: true,
        exportDataType: "basic",
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
                rwdxlsh: sRwdxlsh,
            };
            return param;
        },
        columns: [
            {
                field: 'FWXMMC',
                title: '可选护理服务项目',
            },
            {
                field: 'FWRYGH',
                title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;执行人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
                align: 'center',
                width: '110px',
                formatter: function (value, row, index) {
                    //默认选择当前登录人员
                    if (value == undefined) {
                        value = dlRybm;
                    }
                    var id = "fwryEdit" + index;
                    fwryIds[index] = id;
                    var selectBody = "";//不可为空 "<option value=''>--请选择--</option>";
                    $.each(rylist, function () {
                        if (value == this.rybm) {
                            selectBody += "<option selected='selected' value=" + this.rybm + ">" + this.ryxm
                                + "</option>";
                        } else {
                            selectBody += "<option value=" + this.rybm + ">" + this.ryxm
                                + "</option>";
                        }
                    });
                    return '<select class="form-control input-sm" value=\"' + value + '\" id=\"' + id + '\" onBlur="setZxryRow(this,' + index + ');">' + selectBody + '</select>'
                    //return '<input type="text" class="form-control input-sm " value=\"'+value+'\" onBlur="setZxryRow(this,'+index+');">';
                }
            },
            {
                field: 'SJXZ',
                title: '确认',
                align: 'center',
                valign: 'middle',
                width: '95px',
                formatter: function (value, row, index) {
                    if (value == "1")
                        return '<input name="QR_' + index + '" type="checkbox" class="qrxm" checked />'; //id='ckSjxz' name='ckSjxz'
                    else
                        return '<input name="QR_' + index + '" type="checkbox" class="qrxm" />';
                }
            },
            {
                field: 'FWDJ',
                title: '单价(元)',
                align: 'center',
                valign: 'middle',
                width: '90px',
                formatter: function (value, row, index) {
                    if (value == undefined || value == 0) {
                        value = '';
                    }
                    return '<label id="DJ_' + index + '" class="control-label">' + value + ' </label>';
                }
            }, {
                field: 'FWSL',
                title: '数量(次)',
                align: 'center',
                valign: 'middle',
                width: '90px',
                formatter: function (value, row, index) {
                    if (value == undefined || value == 0) {
                        value = '1';
                    }
                    return '<input type="number" id="SL_' + index + '" class="form-control input-sm " value="' + value + '" ' +
                        'min="0" step="1" max="24" onBlur="setFwscRow(this,' + index + ');"/>';
                }
            },
            {
                field: 'FWHJ',
                title: '金额(元)',
                align: 'center',
                valign: 'middle',
                width: '90px',
                formatter: function (value, row, index) {
                    if (value == undefined || value == 0) {
                        value = '';
                    }
                    return '<label id="HJ_' + index + '" class="control-label">' + value + ' </label>';
                }
            },
            {
                field: 'FWSC',
                title: '服务时长',
                align: 'center',
                width: '90px',
                visible: false,
                formatter: function (value, row, index) {
                    if (value == undefined || value == 0) {
                        value = '';
                    }
                    return '<input type="number" class="form-control input-sm " value="' + value + '" min="0" step="0.1" max="24" onkeyup="checkNum(this)" onBlur="setFwscRow(this,' + index + ');"/>';
                }
            },
            {
                field: 'ZXJG',
                title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;执行结果&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
                align: 'center',
                visible: false,
                formatter: function (value, row, index) {
                    if (value == undefined) {
                        value = "";
                    }
                    return '<input type="text" class="form-control input-sm " value=\"' + value + '\" maxlength="50" onkeyup="formatStrForXml(this)" onBlur="setZxjgRow(this,' + index + ');">';
                }
            }],
        onLoadSuccess: function (data) { // 加载成功时执行
        },
        onLoadError: function () { // 加载失败时执行
        },
        onCheck: function (row) {
            $("#remove").attr("disabled", false);
        },
        onUncheck: function (row) {

        }
    });

    //setFwdj_money();
    bindAllcheck();
};

function bindAllcheck() {
    qrxm_checkbind();
    jhzd_checkbind();
}


function qrxm_checkbind() {
    //选中进行记录，未选中移除
    $(".qrxm").on('ifChecked', function (event) {
        var index = this.name.toString().split('_')[1];
        obj.rows[index].SJXZ = "1";
    });

    $(".qrxm").on('ifUnchecked', function (event) {
        var index = this.name.toString().split('_')[1];
        obj.rows[index].SJXZ = "0";
    });
}


function tablesobj() {
    return $("#fwxmmxTable");
}

//回写table的【实际选择项目】的值
function selectFwxm(objThis, i) {

    var ckStatu = "0";
    if (objThis.checked) {
        ckStatu = "1";
    }
    //勾选项目后将执行人编码和姓名赋值给实际的table数据（默认执行人时只是对应的input控件显示了当前登录人员，为赋值给实际的table数据）
    var fwxryxm = $('#fwryEdit' + i).find("option:selected").text();
    if (fwxryxm == '--请选择--') {
        fwxryxm = '';
    }
    if (ckStatu == "1") {
        fwxmmxTable.bootstrapTable('updateRow', {
            index: i,
            row: {
                SJXZ: ckStatu,
                FWRYGH: $('#fwryEdit' + i).val(),
                FWRYXM: fwxryxm,
            }
        });
    } else {
        fwxmmxTable.bootstrapTable('updateRow', {
            index: i,
            row: {
                SJXZ: ckStatu
            }
        });
    }
}
/*//回写table的【服务时长】的值
 function setFwscRow(objThis, i) {
 fwxmmxTable.bootstrapTable('updateRow', {
 index: i,
 row: {
 FWSC: objThis.value
 }
 });
 }*/
//检查输入的服务时长是否符合格式（数据库中3位整数1位小数）
function checkNum(objthis) {
    objthis.value = objthis.value.replace('-', '');
    var _value = parseFloat(objthis.value);
    if (_value > 24) {
        objthis.value = 24;
    } else {
        var sValue = _value.toString();
        //保留一位小数
        if (sValue.indexOf('.') > 0 && sValue.indexOf('.') + 1 != sValue.length) {
            objthis.value = _value.toFixed(1);
        }
    }
}
//回写table的【执行人员】的值
function setZxryRow(objthis, i) {
    //服务人员姓名为'--请选择--'时改为空
    var fwxryxm = $('#' + objthis.id).find("option:selected").text();
    if (fwxryxm == '--请选择--') {
        fwxryxm = '';
    }
    fwxmmxTable.bootstrapTable('updateRow', {
        index: i,
        row: {
            FWRYGH: $('#' + objthis.id).val(),
            FWRYXM: fwxryxm,
        }
    });
}
function formatStrForXml(objthis) {
    //处理特殊字符，否则存储中解析xml出错（在 XML 中仅有字符 "<"和"&" 是非法的）
    var sZxjg = objthis.value.replace("&", "").replace("<", "");
    objthis.value = sZxjg;
}
//回写table的【执行结果】的值
function setZxjgRow(objthis, i) {
    fwxmmxTable.bootstrapTable('updateRow', {
        index: i,
        row: {
            ZXJG: objthis.value
        }
    });
}

var QMFJ;
var fwjllshFor = '';
//获取服务记录信息，初始化界面
function initForm() {
    $.ajax({
        url: "yyhptRwglFwglhy.do?action=fwdjDetail",
        type: "post",
        dataType: "json",
        data: {
            rwdxlsh: sRwdxlsh,
        },
        beforeSend: function (xhr) {
            //wn.showLoading();
        },
        success: function (data) {
            if (data != undefined) {
                if (data.rwdxlsh == undefined)
                    wn.clearHandleForm(fwdjForm);
                //根据id与字段名相同赋值
                setTimeout(function () {
                    wn.setformEdit(data);
                    if ($('#FWJLLSH').val() == "") {
                        //服务地址默认家庭地址
                        if (data.JHFWDZ == "")
                            $('#FWDZ').val(data.JTDZ);
                        else
                            $('#FWDZ').val(data.JHFWDZ);
                    }
                    fwdjWhole.rygh = data.rygh;             //当前登录人员工号
                    fwdjWhole.ryxm = data.ryxm;             //当前登录人员姓名
                    fwdjWhole.sfjs = data.SFJS;
                    if (data != null) {
                        $('#zs').html(data.ZS);
                        $('#hljl').html(data.HLJL);
                        $('#jkzd').html(data.JKZD);
                    }

                    if (data.QM != null && data.QM != '') {
                        $('#qm').html(data.XM + '.' + data.QM.split('.')[1]);
                        QMFJ = data.QM;
                        fwjllshFor = data.FWJLLSH;
                    } else {
                        $('#id_qmwj').css('display', 'none');
                    }

                    //绑定附件地址
                    //	2、fx2
                    $.fn.fileinput("show", "uploadfiles/FWJL", data.FWJLLSH, data.FJDZ, "fjdzDiv", "fileDiv");
                }, 500);

            } else {
                wnform.toast('查询数据失败!');
            }
        },
        complete: function (xhr) {
            //wn.hiddenLoading();
        }
    });

    $('.form_datetime').datetimepicker({
        format: "yyyy-mm-dd hh:ii",
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: true,
        autoclose: true,
        todayHighlight: true,
        startView: 2,
        forceParse: 0,
        showMeridian: false,  //是否为天和时间视图显示子午线
        pickerPosition: "bottom-left"
    });
};
initForm();

function turnFor(a) {
    showFile("uploadfiles/FWJL", fwjllshFor, QMFJ);
}

var showFile = function (path, keyid, fieldName) {
    window.open(path + '/' + keyid + '/' + fieldName);
};

function saveForm() {
    if (fwdjWhole.sfjs == 1) {
        wnform.toast('已结算，不能修改!');
        $("#btn_Save").prop('disabled', true);
        return;
    }
    if (sJalx == '1') {
        wnform.toast('已中止服务，不能修改!');
        $("#btn_Save").prop('disabled', true);
        return;
    }

    if (sfFwpj != '0') {
        wnform.toast('服务已评价，不能修改!');
        $("#btn_Save").prop('disabled', true);
        return;
    }

    if (sfFwhf != '0') {
        wnform.toast('服务已回访，不能修改!');
        $("#btn_Save").prop('disabled', true);
        return;
    }

    var kssj = $('#KSSJ').val();
    var jssj = $('#JSSJ').val();

    if (kssj == undefined || kssj == '') {
        wnform.toast('开始时间不能为空!');
        return;
    }
    if (jssj == undefined || jssj == '') {
        wnform.toast('结束时间不能为空!');
        return;
    }

    if (kssj > jssj) {
        wnform.toast('开始时间不能大于结束时间!');
        return;
    }
    var _kssj, _jssj, diff_times, diff_hours;
    _kssj = kssj.replace(/-/g, "/");
    _jssj = jssj.replace(/-/g, "/");
    var date_kssj = new Date(_kssj);
    var date_jssj = new Date(_jssj);
    diff_times = date_jssj.getTime() - date_kssj.getTime();
    var hours = (diff_times / (3600 * 1000)).toFixed(2);


    var allRows = fwxmmxTable.bootstrapTable('getData');
    //是否已选择项目
    var bSfyxzxm;
    for (i = 0; i <= allRows.length - 1; i++) {
        allRows[i].FWSL = $('#SL_' + i).val();
        if (allRows[i].SJXZ == "1") {
            allRows[i].FWRYGH = fwdjWhole.rygh;
            allRows[i].FWRYXM = fwdjWhole.ryxm;
            bSfyxzxm = true;
            break;
        }
    }
    if (!bSfyxzxm) {
        wnform.toast('请选择护理服务项目!');
        return;
    }
    $.each(allRows, function (k, v) {
        allRows[k].FWDJ = parseFloat(allRows[k].FWDJ == null ? 0 : allRows[k].FWDJ);
        allRows[k].FWSL = parseInt($('#SL_' + k).val());
        allRows[k].FWHJ = parseFloat(allRows[k].FWHJ == null ? 0 : allRows[k].FWHJ);
    })

    var data = wn.fillWithForm("fwdjForm");
    data += '&FWXMMX=' + JSON.stringify(allRows);
    data += '&RWDXLSH=' + sRwdxlsh;
    data += '&FWRYGH=' + fwdjWhole.rygh;
    data += '&SJFWSC=' + hours;
    data += '&FWRYXM=' + fwdjWhole.ryxm;
    var fileNames = "";
    $(".exists-file").each(
        function () {
            fileNames += $('#' + this.id).text() + ',';
        }
    );
    data += '&FJDZ=' + fileNames;
    JSON.stringify(xmhcrows).toLowerCase();

    var xmhc = JSON.stringify(xmhcrows).toLowerCase();
    data += '&xmhc=' + xmhc;
    data += '&djlsh=' + djlsh;
    data += '&jhlsh=' + jhlsh;
    data += '&ZS=' + $('#zs').val();
    data += '&HLJL=' + $('#hljl').val();
    data += '&JKZD=' + $('#jkzd').val();
    // data += '&fwjllsh=' + fwjllsh;
    // data += '&rwdxlsh=' + rwdxlsh;
    data += '&JEHJ=' + $('#money_sum').text().replaceAll('元', '');
    data += '&HCJE=' + $('#money_hchj').text().replaceAll('元', '');
    data += '&XMJE=' + $('#money_xmhj').text().replaceAll('元', '');

    $.ajax({
        url: "yyhptRwglFwglhy.do?action=fwdjAdd",
        type: "post",
        dataType: "json",
        data: data,
        success: function (data) {
            if (data[0].code == "T") {
                $("#FWJLLSH").val(data[0].key);
                //上传附件
                uploadFile();
                wnform.toast('保存成功!');
                //刷新服务登记项目明细
                fwxmmxTable.bootstrapTable('refresh');
                //刷新列表数据
                $table.bootstrapTable('refresh');
                //刷新列表人群统计数据
                GetRqNum();
                dialogModel.close();
            }
            else {
                wnform.toast('保存失败!' + data[0].message);
            }
        }
    });
};

function uploadFile() {
    // 1、fx1
    var formData = getFileData("#fwdjForm");

    event.preventDefault();
    $.ajax({
        url: 'yyhptRwglFwglhy.do?action=upload',
        type: 'POST',
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (res) {
            if (res.STATUS == 'T') {
            } else {
                /*$.toaster({
                 priority : 'warning',
                 title : '提示',
                 message : res.message
                 });*/
            }
        },
        error: function () {
            wnform.toast('上传附件失败！');
        }
    });
}

//删除以上传的附件（页面删除）
function DeleteFile(id) {
    var objthis = document.getElementById(id);
    objthis.parentNode.removeChild(objthis);
}


/**
 * 获取表单form 拼接字符串
 */
wn.fillWithForm = function (formElement) {
    return wn.getParameterString(wn.handleForm(formElement));
};

/**
 * 获取参数拼接字符串 &a=xxx&b=xxxx&c=xxxxx
 */
wn.getParameterString = function (parameters) {
    var url = '';
    for (var i = 0; i < parameters.length; i++) {

        url += parameters[i][0] + '=' + encodeURIComponent(parameters[i][1]);
        if (i < parameters.length - 1) {
            url += '&';
        }
    }
    return url;
}

/**
 * 处理表单form 获取表单值
 */
wn.handleForm = function (formElement) {
    var parameters = [];
    var formObj;
    if ((typeof formElement) == 'string') {
        formObj = document.getElementById(formElement);
    } else {
        formObj = formElement;
    }
    var es = formObj.elements;
    var checkName = "";   //checkbox多选名称
    var checkValue = "";  //checkbox多选值
    var checkConName = ""; //checkbox控件对应字段值
    var checkConId = ""; //checkbox控件对应字段值
    for (var i = 0; i < es.length; i++) {
        if (es[i].name == null || es[i].name == "")
            continue;
        var tagName = es[i].tagName.toLowerCase();
        var type = es[i].type ? es[i].type.toLowerCase() : tagName;

        if (type == "submit" || type == "button") {
            continue;
        } else if (tagName == "input"
            && (type == "radio" || (type == "select" && (es[i].id == es[i].name) || es[i].id == undefined))) {

            if (es[i].checked) {
                //如果id和title不同时为空，返回&id=xx&name=xx
                if (es[i].id != undefined && es[i].id != null && es[i].id != ""
                    && es[i].title != undefined && es[i].title != null && es[i].title != "") {
                    parameters.push([es[i].id, es[i].value]);
                    parameters.push([es[i].name, es[i].title]);
                } else {
                    //否则只返回&name=xx
                    parameters.push([es[i].name, es[i].value]);
                }

            }
        } else if (tagName == "input" && (type == "checkbox")) {
            if (es[i].id != es[i].name) {

                if (checkConName != es[i].name && checkConId != es[i].id)    //不相同，放入
                {
                    if (checkConName != "") {

                        dddd = parameters;
                        /*   if (checkConName=="rqdm")
                         return;*/

                        parameters.push([checkConName, checkName]);
                        parameters.push([checkConId, checkValue]);
                    }

                    checkConName = es[i].name;
                    checkConId = es[i].id;

                    checkName = "";
                    checkValue = "";
                }
            }
            if (es[i].checked) {

                if (es[i].id != es[i].name) {
                    var names = null;
                    if (es[i].nextSibling != undefined) {
                        names = es[i].nextSibling.nodeValue;
                    }
                    if (names == null && es[i].parentNode.nextSibling != null)
                        names = es[i].parentNode.nextSibling.nodeValue;
                    checkName += names + ';';
                    checkValue += es[i].value + '/';
                }
                else             //id=name
                    parameters.push([es[i].id, es[i].value]);
            }
        } else if (tagName == "select") { // 多选拼接用；/隔开
            var selValue = "";
            var selText = "";
            for (var j = 0; j < es[i].options.length; j++) {
                if (es[i].options[j].selected) {
                    if ($('#' + es[i].id).attr('multiple') == undefined) { //单选
                        selValue = es[i].options[j].value;
                        if (es[i].id != es[i].name) {
                            selText = es[i].options[j].text;
                        }
                        break;
                    }
                    selValue += es[i].options[j].value + '/';
                    if (es[i].id != es[i].name) {
                        selText += es[i].options[j].text + ';';
                    }
                }
            }
            if (selText != ',--请选择--') {

                if (selValue != "") {
                    /*parameters.push([ es[i].id, selValue.substring(1) ]);
                     if (es[i].id != es[i].name) {
                     parameters.push([ es[i].name, selText.substring(1) ]);
                     }*/

                    parameters.push([es[i].id, selValue]);     //select控件不再截取
                    if (es[i].id != es[i].name) {
                        parameters.push([es[i].name, selText]);
                    }

                } else {
                    parameters.push([es[i].id, " "]);
                    if (es[i].id != es[i].name) {
                        parameters.push([es[i].name, " "]);
                    }
                }
            }

        } else {
            parameters.push([es[i].name, es[i].value]);
        }
    }
    try {
        if (checkValue != "") {
            if (checkConName != "") {
                parameters.push([checkConName, checkName]);
                parameters.push([checkConId, checkValue]);
            }
        }
    }
    catch (e) {
        alert(e.message);
        alert(e.description)
        alert(e.number)
        alert(e.name)
    }
    return parameters;
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

function clickHljl(a) {
    mblx = '1';
    BootstrapDialog.show({
        title: '选择护理记录模板',
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/rwgl/fwdjSelectMb.jsp'),
        onshow: function (dialogRef) {
        },
        onshown: function (dialogRef) {
            dialogg = dialogRef;
        },
        onhide: function (dialogRef) {
            if ($('#hljl').val()) {
                $('#hljl').html($('#hljl').val() + ";" + mbnr.hljlMbnr);
            } else {
                $('#hljl').html(mbnr.hljlMbnr);
            }

        },
        onhidden: function (dialogRef) {
            initXmmxTable();
            initTable1();
        }
    });
}

function clickJkzd(a) {
    mblx = '2';
    BootstrapDialog.show({
        title: '选择健康指导模板',
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/rwgl/fwdjSelectMb.jsp'),
        onshow: function (dialogRef) {
        },
        onshown: function (dialogRef) {
            dialogg = dialogRef;
        },
        onhide: function (dialogRef) {
            if ($('#jkzd').val()) {
                $('#jkzd').html($('#jkzd').val() + ";" + mbnr.jkzdMbnr);
            } else {
                $('#jkzd').html(mbnr.jkzdMbnr);
            }
            // $('#jkzd').html($('#jkzd').val()+"   "+mbnr.jkzdMbnr);
        },
        onhidden: function (dialogRef) {
            initXmmxTable();
            initTable1();
        }
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


/*
 //字符转换为UTF-8编码
 function EncodeUtf8(s1)
 {
 var s = escape(s1);
 var sa = s.split("%");
 var retV ="";
 if(sa[0] != "")
 {
 retV = sa[0];
 }
 for(var i = 1; i < sa.length; i ++)
 {
 if(sa[i].substring(0,1) == "u")
 {
 retV += Hex2Utf8(Str2Hex(sa[i].substring(1,5)));

 }
 else retV += "%" + sa[i];
 }

 return retV;
 }
 function Str2Hex(s)
 {
 var c = "";
 var n;
 var ss = "0123456789ABCDEF";
 var digS = "";
 for(var i = 0; i < s.length; i ++)
 {
 c = s.charAt(i);
 n = ss.indexOf(c);
 digS += Dec2Dig(eval(n));

 }
 //return value;
 return digS;
 }
 function Dec2Dig(n1)
 {
 var s = "";
 var n2 = 0;
 for(var i = 0; i < 4; i++)
 {
 n2 = Math.pow(2,3 - i);
 if(n1 >= n2)
 {
 s += '1';
 n1 = n1 - n2;
 }
 else
 s += '0';

 }
 return s;

 }
 function Dig2Dec(s)
 {
 var retV = 0;
 if(s.length == 4)
 {
 for(var i = 0; i < 4; i ++)
 {
 retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
 }
 return retV;
 }
 return -1;
 }
 function Hex2Utf8(s)
 {
 var retS = "";
 var tempS = "";
 var ss = "";
 if(s.length == 16)
 {
 tempS = "1110" + s.substring(0, 4);
 tempS += "10" + s.substring(4, 10);
 tempS += "10" + s.substring(10,16);
 var sss = "0123456789ABCDEF";
 for(var i = 0; i < 3; i ++)
 {
 retS += "%";
 ss = tempS.substring(i * 8, (eval(i)+1)*8);



 retS += sss.charAt(Dig2Dec(ss.substring(0,4)));
 retS += sss.charAt(Dig2Dec(ss.substring(4,8)));
 }
 return retS;
 }
 return "";
 }*/
