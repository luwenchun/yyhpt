/*
 * Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
 */

/**
 * Created by tw on 2016-09-23.
 */
var sPgzt = '';   //评估状态（0未评估 1已评估）
var sZjzt = '';   //转介状态（0 未转介 1 已转介）
var sZhzt = '';   //团队照护（0 未记录 1 已记录）

var sSfsa = '';   //是否收案（1：收案，2：不收案）
var dialogModel;  //弹出窗体
var rowPersonInfo;
var $table;
var sfzjFlag = '0';         //未转介

var cyxjUrl = "";   //出院小结url地址
var showOrHide;

/*
 * 获取出院小结参数值
 */
function getCsz() {
    $.ajax({
        url: "common.do?action=getCsz",
        type: "post",
        dataType: "json",
        data: {
            csbm: 'YH_CYZB_CYXJURL'
        },
        success: function (data) {
            if (data == undefined) {
                wnform.toast('查询数据失败!');
            } else {
                cyxjUrl = data.MRZ;
            }
        }
    });
}
getCsz();

/*
 * 获取机构全部科室
 */
function getKslist() {
    $.ajax({
        url: "common.do?action=getKsxxList",
        type: "post",
        dataType: "json",
        success: function (data) {
            var kslist = data.ksList;
            //初始化科室
            wn.createSelectByArray($("#ksdm"), kslist);
            //格式化为带查询下拉框
            $("#ksdm").select2({language: 'zh-CN',});
            $("#bqdm").select2({language: 'zh-CN',});
        }
    });
}


/*
 * 获取机构全部病区
 */
function getBqlist() {
    $.ajax({
        url: "common.do?action=getBqxxList",
        type: "post",
        dataType: "json",
        success: function (data) {
            var bqlist = data.bqList;
            //初始化病区
            wn.createSelectByArray($("#bqdm"), bqlist);
            //格式化为带查询下拉框
            //$("#bqdm").select2({language: 'zh-CN'});
        }
    });
}


/**
 * [initTable description] 初始化表格
 */
function initTable() {
    // 先销毁表格
    $('#table').bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $('#table')
        .bootstrapTable(
            {
                classes: 'table table-hover warning',
                method: "get", // 使用get请求到服务器获取数据
                url: "yyhpt_sagl.do?action=list", // 获取数据的Servlet地址
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
                clickToSelect: true, // 是否启用点击选中行
                showExport: true,
                exportDataType: "basic",
                minimumCountColumns: 2, // 最少允许的列数
                responseHandler: function (res) {
                    var dictData = res.dict;
                    return res;
                },
                queryParamsType: "undefined",
                showPaginationSwitch: false,
                queryParams: function queryParams(params) { // 设置查询参数
                    getPara(params);
                    var param = {
                        currPage: params.pageNumber,
                        pageSize: params.pageSize,
                        xm: $("#xmSearch").val(),
                        scksrq: $("#scksrq").val(),
                        scjsrq: $("#scjsrq").val(),
                        pgzt: sPgzt,
                        zjzt: sZjzt,
                        zhzt: sZhzt,
                        sfsa: sSfsa,
                        ksdm: $("#ksdm").val(),
                        bqdm: $("#bqdm").val(),
                        sfcy: $("#sfcy").val(),
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
                        title: '姓名',
                        align: 'center',
                        width: 60,
                    },
                    {
                        field: 'LXDH',
                        title: '联系电话',
                        align: 'center'
                    },
                    {
                        field: 'SCRQ',
                        title: '筛查日期',
                        align: 'center',
                        width: 90,
                    },
                    {
                        field: 'CYPG',
                        title: '出院评估',
                        align: 'left',
                        //width:  500,
                    },
                    {
                        title: '个人信息',
                        align: 'center',
                        events: {
                            'click .edit_info': function (e, value, row, index) {
                                getPersonInfo('edit', row);
                            }
                        },
                        formatter: function (value, row, index) {
                            return '<a class="edit_info" href="javascript:void(0)"><img src="layouts/img/table/icon_right.png"> 详情</a>';
                        },
                        //visible:false
                    },
                    {
                        field: 'SAPGDIS',
                        title: '收案评估',
                        align: 'center',
                        events: operateEvents,
                        formatter: function (value, row, index) {
                            if (row.SFSA == '1') {
                                return '<a class="listToSapg" href="javascript:void(0)"><img src="layouts/img/table/icon_select.png"> 已收案 ' + value + '</a>';
                            } else if (row.SFSA == '2') {
                                return '<a class="listToSapg" href="javascript:void(0)"><img src="layouts/img/table/icon_deldata.png"> 不收案 ' + value + '</a>';
                            } else {
                                return '<a class="listToSapg" href="javascript:void(0)"><img src="layouts/img/table/icon_add.png"> 未评估</a>';
                            }
                        },
                        width: 105,
                    },
                    {
                        field: 'ZJQKDIS',
                        title: '转介情况',
                        events: operateEvents,
                        formatter: function (value, row, index) {
                            //未做转介
                            if (row.ZJQKDIS == '' || row.ZJQKDIS == null) {
                                //未收案，则图标为×号
                                if (row.SFSA == '2') {
                                    return '<a class="listToZjqk" href="javascript:void(0)"><img src="layouts/img/table/icon_deldata.png"> 未转介</a>';
                                } else { //已收案或未评估，则图标为+号
                                    return '<a class="listToZjqk" href="javascript:void(0)"><img src="layouts/img/table/icon_add.png"> 未转介</a>';
                                }
                            } else {
                                return '<a class="listToZjqk" href="javascript:void(0)"><img src="layouts/img/table/icon_select.png"> ' + value + '</a>';
                            }
                        },
                        align: 'center',
                        width: 105,
                    },
                    {
                        field: 'TDZHDIS',
                        title: '团队照护',
                        events: operateEvents,
                        formatter: function (value, row, index) {
                            //未做团队照护
                            if (row.TDZHDIS == '' || row.TDZHDIS == null) {
                                //未收案，则图标为×号
                                if (row.SFSA == '2') {
                                    return '<a class="listToTdzh" href="javascript:void(0)"><img src="layouts/img/table/icon_deldata.png"> 团队照护</a>';
                                } else { //已收案或未评估，则图标为+号
                                    return '<a class="listToTdzh" href="javascript:void(0)"><img src="layouts/img/table/icon_add.png"> 团队照护</a>';
                                }

                            } else {
                                return '<a class="listToTdzh" href="javascript:void(0)"><img src="layouts/img/table/icon_select.png"> ' + value + '</a>';
                            }
                        },
                        align: 'center',
                        width: 105,
                    }],
                onLoadSuccess: function () { // 加载成功时执行

                },
                onLoadError: function () { // 加载失败时执行

                },
                onCheck: function (row) {
                    $("#remove").attr("disabled", false);
                },
                onUncheck: function (row) {
                    // alert(row.id);
                }
            });
}

/**
 * [operateEvents description]
 *
 * @type {Object} 格式化操作栏绑定事件
 */
window.operateEvents = {
    'click .listToSapg': function (e, value, row, index) {
        //获取是否已转介（0 否 1是）
        if (row.ZJQKDIS != '' && row.ZJQKDIS != null) {
            sfzjFlag = "1";
        } else {
            sfzjFlag = "0";
        }
        sapgFunc(row, '收案评估');
    },

    'click .listToZjqk': function (e, value, row, index) {
        if (row.SFSA == '1') {
            zjqkFunc(row, '转介情况');
        } else if (row.SFSA == '2') {
            wnform.toast('未收案，不可进行转介!');
        } else {
            wnform.toast('请先进行收案评估!');
        }
    },

    'click .listToTdzh': function (e, value, row, index) {
        if (row.ZJQKDIS != '' && row.ZJQKDIS != null) {
            tdzhFunc(row, '团队照护');
        } else {
            wnform.toast('请先进行转介!');
        }
    }
};

var zjqkFunc = function (row, mTitle, mFlag) {
    rowPersonInfo = row;
    yngrbsh=row.YNGRBSH;
    if (row.ZJQKDIS != '' && row.ZJQKDIS != null)
        sfzjFlag = '1';
    else
        sfzjFlag = '0';

    BootstrapDialog.show({
        title: mTitle,
        size: BootstrapDialog.SIZE_WIDE,
        cssClass: 'dialog-bg-color dialog-footer-space',
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/sagl/sagl_zjqk.jsp'),
        buttons: [{
            label: '保存',
            cssClass: 'btn-default btn-sm',
            id: 'btn_Save',
            action: function (dialogItself) {
                doZjqkSave(dialogItself);
            }
        }, {
            label: '退出',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],
        onshow: function (dialogRef) {
            $('#xmSearch').data('row', row);
        },
        onshown: function (dialogRef) {
            dialogModel = dialogRef;
        },
        onhide: function (dialogRef) {
            $(this).removeData("bs.modal");
        },
        onhidden: function (dialogRef) {
            $(this).removeData("bs.modal");
        }
    });
};


$(document).ready(function () {
    //初始化病区和科室查询条件
    getKslist();
    getBqlist();

    //icheck皮肤
    $('input[name="pgZt"]').iCheck({
        checkboxClass: 'icheckbox_flat-wnred',
        radioClass: 'iradio_flat-wnred',
        increaseArea: '20%'
    });

    //初始化日期标签
    $('.choose-date').datepicker({
        autoclose: true,
        todayBtn: "linked",
        todayHighlight: true,
        //startDate: "-0d"   //从当天开始选
    });

    //默认查询未评估数据
    $('#wpgCk').iCheck('check');

    //获取标题中的人群数目
    GetRqNum();

    //初始化表格
    initTable();

    $table = $('#table');

    //手机上显示卡片模式
    wnform.addOnresize($table, tableStaus);

    //查询
    $('#btn_query').on('click', function () {
        var sScksrq = $('#scksrq').val();
        var sScjsrq = $('#scjsrq').val();
        if ($('#scksrq').val() != '' && $('#scjsrq').val() != '' && sScjsrq < sScksrq) {
            wnform.toast("筛查结束日期不能小于开始日期!");
            return false;
        }
        //点击查询时只按界面查询条件进行查询
        sSfsa = "";
        sZjzt = "";
        sZhzt = "";
        //点击查询时取消块状标题选择状态
        $('.list-title-space').parent().removeClass('block-select');
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });
    //更多
    $('#btn_more').on('click', function () {
        var bHidden = $("#more_search_div").is(":hidden");
        if (bHidden) {
            $('#more_search_div').css("display", "block");
        } else {
            $('#more_search_div').css("display", "none");
        }
        return false;
    });

    //---------------------------------绑定数字事件begin---------------------------------
    $('#wpgNum').parent().parent().on('click', function () {
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        InitSearch();
        $('#wpgCk').iCheck('check');
        sZjzt = "";
        sZhzt = "";
        sSfsa = '';
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });

    $('#ypgNum').parent().parent().on('click', function () {
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        InitSearch();
        $('#ypgCk').iCheck('check');
        sZjzt = "";
        sZhzt = "";
        sSfsa = '';
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });

    $('#wzjNum').parent().parent().on('click', function () {
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        InitSearch();
        $('#ypgCk').iCheck('check');
        sZjzt = "0";
        sZhzt = "";
        sSfsa = '1';     //已收案才能转介
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });

    $('#yzjNum').parent().parent().on('click', function () {
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        InitSearch();
        $('#ypgCk').iCheck('check');
        sZjzt = "1";
        sZhzt = "";
        sSfsa = '1';     //已收案才能转介
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });

    $('#wjlNum').parent().parent().on('click', function () {
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        InitSearch();
        $('#ypgCk').iCheck('check');
        sZjzt = "1";        ////已转介才能团队照护
        sZhzt = "0";
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });

    $('#yjlNum').parent().parent().on('click', function () {
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        InitSearch();
        $('#ypgCk').iCheck('check');
        sZjzt = "1";        //已转介才能团队照护
        sZhzt = "1";
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });
    //---------------------------------绑定数字事件end---------------------------------
    
});


//获取各人群数目
function GetRqNum() {
    $.ajax({
        url: 'yyhpt_sagl.do?action=num',
        type: "get",
        dataType: "json",
        data: {},
        success: function (data) {
            console.log(data);

            /*var ypgNum = document.getElementById("ypgNum");
            ypgNum.innerText = data.YPG;        //已评估

            var wpgNum = document.getElementById("wpgNum");
            wpgNum.innerText = data.WPG;        //未评估

            var yzjNum = document.getElementById("yzjNum");
            yzjNum.innerText = data.YZJ;        //已转介
            var wzjNum = document.getElementById("wzjNum");
            wzjNum.innerText = data.WZJ;        //未转介

            var yjlNum = document.getElementById("yjlNum");
            yjlNum.innerText = data.YJL;        //已记录

            var wjlNum = document.getElementById("wjlNum");
            wjlNum.innerText = data.WJL;        //未记录*/
            displayNumberOfBlock($('#block1'), $('#ypgNum'), $('#wpgNum'), data.YPG, data.WPG);
            displayNumberOfBlock($('#block2'), $('#yzjNum'), $('#wzjNum'), data.YZJ, data.WZJ);
            displayNumberOfBlock($('#block3'), $('#yjlNum'), $('#wjlNum'), data.YJL, data.WJL);
            $('.counter').counterUp();
        }
    });
}

//获取查询参数
function getPara(params) {
    //已评估、未评估都勾选或都未勾选都查询全部数据，只勾选一个则查询未评估或者已评估数据
    if ($('#wpgCk').prop("checked") && $('#ypgCk').prop("checked")) {
        sPgzt = '';
    } else if (!$('#wpgCk').prop("checked") && !$('#ypgCk').prop("checked")) {
        sPgzt = '';
    } else {
        //勾选未评估
        if ($('#wpgCk').prop("checked")) {
            sPgzt = '0';
        }

        //勾选已评估
        if ($('#ypgCk').prop("checked")) {
            sPgzt = '1';
        }
    }

    console.log("sPgzt:" + sPgzt);
}

//初始化查询条件
function InitSearch() {
    $("#xmSearch").val("");
    $("#scksrq").val("");
    $("#scjsrq").val("");
    $('#wpgCk').iCheck('uncheck');
    $('#ypgCk').iCheck('uncheck');
    $("#bqdm").val("");
    $("#ksdm").val("");
    //设置select2的文本
    $('#bqdm').val("").trigger('change');
    $('#ksdm').val("").trigger('change');
    $("#sfcy").val("");
}

//弹出二级页面-收案评估
sapgFunc = function (row, mtitle, mflag) {
    rowPersonInfo = row;
    yngrbsh=row.YNGRBSH;
    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_WIDE,
        cssClass: 'dialog-bg-color dialog-footer-space',
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt_sagl.do?action=sapgInit'),
        buttons: [{
            label: '保存',
            cssClass: 'btn-default btn-sm',
            id: 'btn_Save',
            action: function (dialogItself) {
                saveSapg();
            }
        }, {
            label: '退出',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],
        onshow: function (dialogRef) {

        },
        onshown: function (dialogRef) {
            dialogModel = dialogRef;
        },
        onhide: function (dialogRef) {
            $(this).removeData("bs.modal");
        },
        onhidden: function (dialogRef) {
            $(this).removeData("bs.modal");
        }
    });
};

var tdzhFunc = function (row, mTitle, mFlag) {
    yngrbsh=row.YNGRBSH;
    BootstrapDialog.show({
        title: mTitle,
        size: BootstrapDialog.SIZE_WIDE,
        cssClass: 'dialog-bg-color dialog-footer-space',
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/sagl/sagl_tdzh.jsp'),
        buttons: [{
            label: '保存',
            cssClass: 'btn-default btn-sm',
            id: 'btn_Save',
            action: function (dialogItself) {
                prepareData()
                    .then(doSave)
                    .then(function (res) {
                        wnform.toast(res.message);
                        if (res.code === "T") {
                            dialogItself.close();
                            //刷新列表数据
                            $table.bootstrapTable('refresh');
                            //刷新块状标题数据
                            GetRqNum();
                        } else {
                            console.warn(res.message);
                        }
                    });
            }
        }, {
            label: '退出',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],
        onshow: function (dialogRef) {
            $('#xmSearch').data('row', row)
                .data('src','收案管理');

        },
        onshown: function (dialogRef) {
            dialogModel = dialogRef;
        },
        onhide: function (dialogRef) {
            $(this).removeData("bs.modal");
        },
        onhidden: function (dialogRef) {
            $(this).removeData("bs.modal");
        }
    });
};

//跳转个人基本信息
function getPersonInfo(flag, row) {
    this.flag = flag;
    this.showOrHide = 'show';   //[show:显示打印/保存按钮；hide:隐藏打印/保存按钮]
    //this.yngrbsh = row.YNGRBSH;
    BootstrapDialog.show({
        title: '个人基本信息',
        size: BootstrapDialog.SIZE_BIG,
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('personal_info.do?yngrbsh=' + row.YNGRBSH),
        buttons: [],
        onshow: function (dialogRef) {
        },
        onshown: function (dialogRef) {
            dialog = dialogRef;
        },
        onhide: function (dialogRef) {

        },
        onhidden: function (dialogRef) {
            //GetRqNum();
            $('#table').bootstrapTable("refresh");
        }
    });

}