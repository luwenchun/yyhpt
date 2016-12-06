var dictData;         //字典项
var dlRybm;          //登录人员编码
var ywPara = '0';       //业务参数（0 需求申请 1 调查评估 2 评估报告）
var rowPersonInfo = {};
var globalDialog = {};
var $table = $('#table');
var dialogModel;
var editRow;
var PGBGLAST = getLastZt(lcdata, "PGJGBG"); //评估报告前置
var PGSHLAST = getLastZt(lcdata, "PGSH"); //评估审核前置
var PGDCLAST = getLastZt(lcdata, "PGDC"); //评估调查前置
var dcwjBz;      //调查问卷表示
var askDemand;   //需求申请完成标志[0:未申请；!0:已申请]
var yngrbsh;
var sqlsh;

var sSqzt = "0";    //0 未申请 1 已申请
var sPgzt;    //0 未评估 1 已评估
var sPszt;    //0 未评审 1 已评审
var sBgzt;    //0 未报告 1 已报告

$(function () {
    //查询按钮事件
    $('#btn_query').on('click', function () {
        $('.list-title-space').parent().removeClass('block-select');
        GetRqNum();
        sSqzt = "";
        sPgzt = "";
        sPszt = "";
        sBgzt = "";
        //alert($("#djys").val());
        //ywPara = '';
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });

    $('#btn_export').on('click', function () {
        $table.tableExport({type: 'excel', escape: 'false'});
        return false;
    });

    //---------------------------------绑定数字事件begin---------------------------------
    $('#wsqNum').parent().parent().on('click', function () {
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        InitSearch();
        sSqzt = "0";
        sPgzt = "";
        sPszt = "";
        sBgzt = "";
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });

    $('#wpgNum').parent().parent().on('click', function () {
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        InitSearch();
        sSqzt = "1";
        sPgzt = "0";
        sPszt = "";
        sBgzt = "";
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });

    $('#wpsNum').parent().parent().on('click', function () {
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        InitSearch();
        sSqzt = "1";
        sPgzt = "1";
        sPszt = "0";
        sBgzt = "";
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });

    $('#wbgNum').parent().parent().on('click', function () {
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        InitSearch();
        sSqzt = "1";
        sPgzt = "";
        sPszt = "";
        sBgzt = "0";
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });

    $('#ybgNum').parent().parent().on('click', function () {
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        InitSearch();
        sSqzt = "1";
        sPgzt = "";
        sPszt = "";
        sBgzt = "1";
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });
    //---------------------------------绑定数字事件end---------------------------------

    getRylist();
    GetRqNum();
    initTable();
    wnform.addOnresize($table, tableStaus);
});

wnform.Onresize1 = function(table, toggle) {
    $(window).resize(function() {
        table.bootstrapTable('resetWidth');

        var toggle2 = jQuery(window).width() <= 600;
        if (toggle2 != toggle) {
            table.bootstrapTable("toggleView");
            toggle = toggle2;
        }
    });
}

function getRylist() {
    $.ajax({
        url: "common.do?action=getSysCzrylist",
        type: "post",
        dataType: "json",
        data: {
            //jsmc:'签约医生一览表'
        },
        success: function (data) {
            rylist = data.czrys;
            //初始化签约人员
            createSelectByCZRYArray($("#djys"), rylist);
            dlRybm = data.rybm;
            //alert(dlRybm);
        }
    });
}

function createSelectByCZRYArray(selObject, array, optionname) {

    var selectBody = "<option value=''>--请选择--</option>";

    if (optionname)
        selectBody = "<option value=''>" + optionname + "</option>";

    $.each(array, function () {
        selectBody += "<option value=" + this.rybm + ">" + this.ryxm
            + "</option>";
    });
    selObject.html(selectBody);
};

function initTable() {
    // 先销毁表格
    $('#table').bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $('#table')
        .bootstrapTable(
            {
                classes: 'table table-hover warning',
                method: "get", // 使用get请求到服务器获取数据
                url: "yyhptpggl.do?action=list", // 获取数据的Servlet地址
                contentType: "application/json",
                iconSize: 'sm',
                showHeader: true,
                striped: true, // 表格显示条纹
                pagination: true, // 启动分页
                pageSize: 10, // 每页显示的记录数
                pageNumber: 1, // 当前第几页
                pageList: [2], // 记录数可选列表
                search: false, // 是否启用查询
                showColumns: false, // 显示下拉框勾选要显示的列
                showRefresh: false, // 显示刷新按钮
                onlyInfoPagination: false,
                sidePagination: "server", // 表示服务端请求
                uniqueId: "YNGRBSH", // 每一行的唯一标识，一般为主键列
                clickToSelect: false, // 是否启用点击选中行
                showExport: true,
                exportDataType: "basic",
                minimumCountColumns: 2, // 最少允许的列数
                responseHandler: function (res) {
                    console.log(res);
                    dictData = res.dict;
                    return res;
                },
                queryParamsType: "undefined",
                showPaginationSwitch: false,
                queryParams: function queryParams(params) { // 设置查询参数

                    var param = {
                        currPage: params.pageNumber,
                        pageSize: params.pageSize,
                        xm: $("#xm").val().trim(),
                        sfzh: $("#sfzh").val(),
                        qyysbm: $("#djys").val(),
                        pgbgsj: PGBGLAST,
                        //ywPara: ywPara,
                        sqzt:sSqzt,
                        pgzt:sPgzt,
                        pszt:sPszt,
                        bgzt:sBgzt,                        
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
                        field: 'XM',
                        title: '&nbsp;&nbsp;&nbsp;姓名&nbsp;&nbsp;&nbsp;&nbsp;',
                        align: 'center'
                    },
                    {
                        field: 'NL',
                        title: '年龄',
                        align: 'center',
                        visible: false
                    },
                    {
                        field: 'SFZH',
                        title: '身份证号',
                        formatter: function (value, row, index) {
                            if (value) {
                                if (value.length == 18) {
                                    return value.substr(0, 3) + '*********' + value.substr(12, 6);
                                } else if (value.length == 15) {
                                    return value.substr(0, 3) + '******' + value.substr(9, 6);
                                } else {
                                    return value;
                                }
                            }
                        },
                        align: 'center',
                        visible: false
                    },
                    {
                        field: 'SJHM',
                        title: '联系电话',
                        align: 'center'
                    },
                    {
                        field: 'XQSQ',
                        title: '申请需求',
                        events: {
                            'click .pglbToSqxq': function (e, value, row, index) {
                                loadpgglxqsqDetail(row, '需求申请', value);
                            }
                        },
                        formatter: function (value, row, index) {
                            if (value == '0') {
                                return '<a class="pglbToSqxq" href="javascript:void(0)"  > <img src="layouts/img/table/icon_del.png"> 需求登记<a/>';
                            } else {
                                return '<a class="pglbToSqxq" href="javascript:void(0)"  > <img src="layouts/img/table/icon_select.png"> ' + value + '<a/>';
                            }
                        },
                        align: 'center'
                    },
                    {
                        field: 'PGDC',
                        title: '评估调查',
                        events: {
                            'click .pgglToPgdc': function (e, value, row, index) {

                                if (row.XQSQ && row.XQSQ != '0') {
                                    loadPgglPgdcDetail(row, '评估调查', value);
                                } else {
                                    wnform.toast('需先进行需求申请!');
                                }
                            }
                        },
                        formatter: function (value, row, index) {
                            if (value == '0') {
                                return '<a class="pgglToPgdc" href="javascript:void(0)"> <img src="layouts/img/table/icon_del.png"> 评估调查<a/>';
                            } else {
                                return '<a class="pgglToPgdc" href="javascript:void(0)"> <img src="layouts/img/table/icon_select.png"> ' + value + '<a/>';
                            }
                        },
                        align: 'center',
                        visible: PGDCLAST != ""
                    },
                    {
                        field: 'PGSH',
                        title: '评估审核',
                        events: {
                            'click .pglbToPgsh': function (e, value, row, index) {
                                if (row.PGDC && row.PGDC != '0') {
                                    loadpggljtpsDetail(row, '评估审核', value);
                                } else {
                                    wnform.toast('需先进行需求调查!');
                                }
                            }
                        },
                        formatter: function (value) {
                            if (value == '0') {
                                return '<a class="pglbToPgsh" href="javascript:void(0)"  > <img src="layouts/img/table/icon_del.png">审核<a/>';
                            } else {
                                return '<a class="pglbToPgsh" href="javascript:void(0)"  > <img src="layouts/img/table/icon_select.png"> ' + value + '<a/>';
                            }
                        },
                        align: 'center',
                        visible: PGSHLAST != ""
                    },
                    {
                        field: 'PGJGBG',
                        title: '评估报告',
                        events: {
                            'click .assess-report': function (e, value, row, index) {
                                if (row.PGSH && row.PGSH != '0') { //已评估审核
                                    assessReport(row, value);
                                }else{
                                    // wnform.toast('需先进行评估!');
                                    judgeHasData(row, value);
                                }
                            }
                        },
                        formatter: function (value) {
                            if (value === '0') {
                                return '<a class="assess-report" href="javascript:void(0)"  > <img src="layouts/img/table/icon_del.png">评估报告<a/>';
                            } else {
                                return '<a class="assess-report" href="javascript:void(0)"  > <img src="layouts/img/table/icon_select.png">' + value + '<a/>';
                            }
                        },
                        align: 'center'
                    },
                    {
                        field: 'JALX',
                        title: '状态',
                        align: 'center',
                        formatter: function (value){
                            switch (value) {
                                case '0':
                                    return '正常';
                                case '1':
                                    return '中止';
                                default:
                                    return '正常';
                            }
                        }
                    }],
                onLoadSuccess: function () { // 加载成功时执行

                },
                onLoadError: function () { // 加载失败时执行
                },
                onCheck: function (row) {
                    $("#remove").prop("disabled", false);
                },
                onUncheck: function (row) {
                }
            });
}


//初始化查询条件
function InitSearch() {
    $("#qyys").val(dlRybm);
    $("#xm").val("");
    $("#sfzh").val("");
}

function GetRqNum() {
    $.ajax({
        url: 'yyhptpggl.do?action=num',
        type: "get",
        dataType: "json",
        data: {},
        success: function (data) {
            var wsqNum = document.getElementById("wsqNum");
            var wpgNum = document.getElementById("wpgNum");
            var wpsNum = document.getElementById("wpsNum");
            var wbgNum = document.getElementById("wbgNum");
            var ybgNum = document.getElementById("ybgNum");
            if (data.rows.length == 0) {
                wsqNum.innerText = 0;
                wpgNum.innerText = 0;
                wpsNum.innerText = 0;
                wbgNum.innerText = 0;
                ybgNum.innerText = 0;
                return;
            }
            var zrs = data.rows[0].ZRS;//总人数
            var wsq = data.rows[0].WSQ;//未申请
            var wpg = data.rows[0].WPG;//未评估
            var wps = data.rows[0].WPS;//未评审
            var wbg = data.rows[0].WBG;//未报告
            var ybg = data.rows[0].YBG;//未报告

            wsqNum.innerText = wsq;
            wpgNum.innerText = wpg;
            wpsNum.innerText = wps;
            wbgNum.innerText = wbg;
            ybgNum.innerText = (ybg == undefined) ? 0 : ybg;


            displayNumberOfBlock($('#xqsqBlock'), $('#wsqNum'), $('#wsqNum'), wsq, wsq);
            displayNumberOfBlock($('#dcpgBlock'), $('#wpgNum'), $('#wpsNum'), wpg, wps);
            displayNumberOfBlock($('#pgbgBlock'), $('#wbgNum'), $('#ybgNum'), wbg, (ybg == undefined) ? 0 : ybg);

            $('.counter').counterUp();
        }
    });
}


/* 需求申请 */
function loadpgglxqsqDetail(row, title, value) {
    editRow = row;
    askDemand = row.XQSQ;
    yngrbsh = row.YNGRBSH;
    sqlsh = row.SQLSH;
    BootstrapDialog.show({
        title: '需求申请',
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/pggl/pgglXqsq.jsp'),
        buttons: [{
            label: '保存',
            id: 'xqsq_save',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                doSave(dialogItself);
                }
            },
            {
                label: '退出', cssClass: 'btn-default btn-sm',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }],
        onshow: function (dialogRef) {
            dialogModel = dialogRef;
        },
        onshown: function (dialogRef) {

        },
        onhide: function (dialogRef) {
        },
        onhidden: function (dialogRef) {
            GetRqNum();
            $table.bootstrapTable("refresh");
        }
    });
}

/* 评估调查 */
function loadPgglPgdcDetail(row, title, value) {
    editRow = row;
    if (row.SQXQ == '0') {
        wnform.toast('请先进行需求登记!');
        return false;
    } else {
        rowPersonInfo = row;
        //未进行需求调查 先进入调查问卷界面
        //20160828 row.PGDC改为根据DCWJBZ判断是否做了调查问卷（0 否 1是）做了问卷不算完成了评估调查，第二个表单界面做了才算
        if (row.DCWJBZ == '0') {
        	dcwjBz = "1";
            loadPgglPgdcwj(row, title, value);
        }
        //做过评估调查则直接进入调查表单界面
        else if (row.DCWJBZ == '1') {   //row.PGDC != '0' 20160828改为做了问卷则进入
            loadPgglPgdc(row, title, value);
        }
    }
}

/* 弹出评估调查问卷界面 */
function loadPgglPgdcwj(row, title, value) {
    editRow = row;
    BootstrapDialog.show({
        title: '需求调查问卷',
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/pggl/pgglPgdcDetail.jsp'),
        buttons: [
            {
                label: '保存',
                id: 'dcwj_save',
                cssClass: 'btn-default btn-sm',
                action: function (dialog) {
                    if (editRow.JALX == '1'){
                        wnform.toast('服务已中止，不能修改');
                        $('#dcwj_save').prop('disabled',true);
                    } else {
                        saveXqdc();
                    }
                }
            },
            {
                label: '退出',
                cssClass: 'btn-default btn-sm',
                action: function (dialog) {
                    dialog.close();
                }
            }],
        onshow: function (dialogRef) {

        },
        onshown: function (dialogRef) {
            dialogModel = dialogRef;
        },
        onhide: function (dialogRef) {
            GetRqNum();
            $table.bootstrapTable("refresh");

        },
        onhidden: function (dialogRef) {
        }
    });
}

/* 弹出评估调查表单界面 */
function loadPgglPgdc(row, title, value) {
    editRow = row;
    BootstrapDialog.show({
        title: '评估调查',
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/pggl/pgglPgdc.jsp'),
        buttons: [
            {
                label: '调查问卷',
                cssClass: 'btn-default btn-sm',
                action: function (dialog) {
                    dcwjBz = "0";
                    loadPgglPgdcwj(row, title, value);
                }
            },
            {
                label: '保存',
                id: 'pgdc_save',
                cssClass: 'btn-default btn-sm',
                action: function (dialog) {
                    //savePgdcDetail();
                    if (editRow.JALX=='1'){
                        wnform.toast('已中止服务，不能修改!');
                        $('#pgdc_save').prop('disabled',true);
                    } else if (editRow.PGSH && editRow.PGSH != '0') {
                        wnform.toast('已审核，不能修改!');
                        $('#pgdc_save').prop('disabled',true);
                    } else {
                        savePgdcMainForm.init(dialog);
                        $('#pgdcMainForm').submit();
                    }
                }
            },
            {
                label: '退出',
                id: 'xqsq_save',
                cssClass: 'btn-default btn-sm',
                action: function (dialog) {
                    dialog.close();
                }
            }],
        onshow: function (dialogRef) {

        },
        onshown: function (dialogRef) {
            dialogModel = dialogRef;
        },
        onhide: function (dialogRef) {
            GetRqNum();
            $table.bootstrapTable("refresh");
        },
        onhidden: function (dialogRef) {
        }
    });
}

/* 集体评审 */
function loadpggljtpsDetail(row, title, value) {
    console.log(row);
    editRow = row;
    BootstrapDialog.show({
        title: '需求集体评审',
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/pggl/pggl_jtps.jsp'),
        buttons: [{
            id: 'id_jtps_save',
            label: '保存',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                if (editRow.JALX == '1'){
                    wnform.toast('已中止服务,不能保存!')
                    $('#id_jtps_save').prop('disabled',true);
                } else if (editRow.PGJGBG != '0') {
                    wnform.toast('已评估报告,不能保存!')
                    $("#id_jtps_save").prop('disabled', true);
                    /*            $('#id_radio_container').find('input:radio').prop('disabled', true);*/
                } else {
                    doSave();
                }
            }
        },
            {
                label: '退出',
                cssClass: 'btn-default btn-sm',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }],
        onshow: function (dialogRef) {
            dialogModel = dialogRef;
        },
        onshown: function (dialogRef) {
/*            if (row.JALX == '1'){
                $('#id_jtps_save').prop('disabled',true);
            }
            if (row.PGJGBG != '0') {
                $("#id_jtps_save").prop('disabled', true);
                $('#id_radio_container').find('input:radio').prop('disabled', true);
            }*/
        },
        onhide: function (dialogRef) {
            GetRqNum();
            $table.bootstrapTable("refresh");
        }
    });
}

function judgeHasData(row, value, callbackFlag) {
    $.ajax({
        url: "yyhptpggl.do?action=get_assess_report",
        type: "post",
        dataType: "json",
        data: {
            sqlsh: row.SQLSH,
            yngrbsh: row.YNGRBSH
        },
        success: function (res) {
            if (res) {
                assessReport(row, value);
            } else {
                wnform.toast('需先进行评审!');
            }
        }
    });
}

/* 评估报告 */
function assessReport(row, value) {
    editRow = row;
    BootstrapDialog.show({
        title: '需求评估结果报告与告知',
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/pggl/pggl_assess_report.jsp'),
        buttons: [
            {
                label: '打印',
                cssClass: 'btn-default btn-sm',
                action: function (dialog) {

                }
            },
            {
                id: 'id_assess_report_save',
                label: '保存',
                cssClass: 'btn-default btn-sm',
                action: function (dialog) {
                    if (editRow.JALX == '1') {
                        wnform.toast('已中止服务，不能修改!');
                        $('#id_assess_report_save').prop('disabled', true);
                    } else {
                        doSave();
                    }
                }
            },
            {
                label: '退出',
                cssClass: 'btn-default btn-sm',
                action: function (dialog) {
                    dialog.close();
                }
            }],
        onshow: function (dialogRef) {
            console.log('评估报告onshow');
            globalDialog = dialogRef;
            rowPersonInfo = row;
        },
        onshown: function (dialogRef) {
        },
        onhide: function (dialogRef) {
            GetRqNum();
            $table.bootstrapTable("refresh");
        },
        onhidden: function (dialogRef) {
        }
    });
}

/*根据出生日期算出年龄*/
function jsGetAge(strBirthday){
    var returnAge;
    var strBirthdayArr=strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if(nowYear == birthYear){
        returnAge = 0;//同年 则为0岁
    }
    else{
        var ageDiff = nowYear - birthYear ; //年之差
        if(ageDiff > 0){
            if(nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay;//日之差
                if(dayDiff < 0)
                {
                    returnAge = ageDiff - 1;
                }
                else
                {
                    returnAge = ageDiff ;
                }
            }
            else
            {
                var monthDiff = nowMonth - birthMonth;//月之差
                if(monthDiff < 0)
                {
                    returnAge = ageDiff - 1;
                }
                else
                {
                    returnAge = ageDiff ;
                }
            }
        }
        else
        {
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
    }

    return returnAge;//返回周岁年龄

}
