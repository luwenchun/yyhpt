/*
 * Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
 */
var dialoging = '';
var currow = '';
var rowPersonInfo = '';
var dialogModel = '';
var sPgzt = '';   //评估状态（0未评估 1已评估）
var sSfsa = '';   //是否收案（1：收案，2：不收案）
var cyxjUrl = "";   //出院小结url地址

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

$(function () {
    getKslist();
    getBqlist();

    initGapgTable();

    $('.choose-date').datepicker({
        format: 'yyyy-mm-dd',
        weekStart: 1,
        autoclose: true,
        todayBtn: 'linked',
        language: 'zh-CN',
        endDate: '+1'
    }).on('changeDate', function (ev) {
    });

    $("#btn_query").bind('click', function () {
        $('#gapgTable').bootstrapTable("selectPage", 1);
        $('#gapgTable').bootstrapTable("refresh");
    });

    $('#btn_more').on('click', function () {
        var bHidden = $("#more_search_div").is(":hidden");
        if (bHidden) {
            $('#more_search_div').css("display", "block");
        } else {
            $('#more_search_div').css("display", "none");
        }
        return false;
    });
    wn.iCheckInit();
});

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

function initGapgTable() {
    // 先销毁表格
    $('#gapgTable').bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $('#gapgTable').bootstrapTable({
        classes: 'table table-hover warning',
        method: "get", // 使用get请求到服务器获取数据
        url: "yyhpt_gapg.do?action=list", // 获取数据的Servlet地址
        // url: "yyhptjhgl.do?action=list", // 获取数据的Servlet地址
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
        uniqueId: "GAPGLSH", // 每一行的唯一标识，一般为主键列
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
            getPara(params);
            var param = {
                currPage: params.pageNumber,
                pageSize: params.pageSize,
                xm: $("#xmSearch").val(),
                ksrq: $("#scksrq").val(),
                jsrq: $("#scjsrq").val(),
                sfsa: sSfsa,
                pgzt: sPgzt,
                bq: $("#bqdm").val(),
                ks: $("#ksdm").val()
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
                field: 'SFZH',
                title: '身份证号',
                formatter: function (value, row, index) {
                    if (value != undefined) {
                        if (value.length == 18) {
                            return value.substr(0, 3)
                                + '*********'
                                + value.substr(12, 6);
                        } else if (value.length == 15) {
                            return value.substr(0, 3)
                                + '******'
                                + value.substr(9, 6);
                        } else {
                            return value;
                        }
                    }
                },
                align: 'center'
            },
            {
                field: 'SJHM',
                title: '联系电话',
                align: 'center'
            },
            {
                field: 'SASJ',
                title: '收案日期',
                align: 'center'
            },
            {
                field: 'HLPG',
                title: '护理评估',
                events: operateEvents,
                formatter: function (value, row, index) {
                    if (value == '0') {
                        return '<a class="gapgToHlpg" href="javascript:void(0)"  > <img src="layouts/img/table/icon_del.png">未评估<a/>';
                    } else {
                        return '<a class="gapgToHlpg" href="javascript:void(0)"  > <img src="layouts/img/table/icon_select.png"> 已评估' + value + '<a/>';
                    }
                },
                align: 'center'
            },
            {
                field: 'TDZH',
                title: '团队照护',
                events: operateEvents,
                formatter: function (value, row, index) {
                    var html = '<a class="gapgToTdzhInfo" href="javascript:void(0)"  > <img src="layouts/img/table/icon_right.png"> 查看<a/>&nbsp;|&nbsp;';
                    if (row.XGBZ > 0) {
                        return html
                            + '<a class="gapgToTdzhEdit" href="javascript:void(0)"  > <img src="layouts/img/table/icon_select.png">修改<a/>';
                    }else{
                        return html
                            + '<a class="gapgToTdzhEdit" href="javascript:void(0)"  > <img src="layouts/img/table/icon_edit_red.png">修改<a/>';
                    }
                },
                align: 'center'
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
};

window.operateEvents = {
    'click .gapgToHlpg': function (e, value, row, index) {
        loadHlpgDetail(row, '出院准备服务-个案管理表', value);
    },
    'click .gapgToTdzhInfo': function (e, value, row, index) {
        selectTdzhDetail(row, '团队照护', 'readOnly');
    },
    'click .gapgToTdzhEdit': function (e, value, row, index) {
        selectTdzhDetail(row, '团队照护', '');
    }
};

function loadHlpgDetail(row, title, value) {
    currow = row;
    BootstrapDialog.show({
        title: '出院准备服务-个案管理表',
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/gapg/gapgDetail.jsp'),  //gapgcyzbfwDetail--gapgDetail
        buttons: [{
            label: '保存',
            cssClass: 'btn-default btn-sm',
            id: 'btn_jhbgsh_save',
            action: function (dialogItself) {
                dosaveData();
            }
        }, {
            label: '退出', cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],
        onshow: function (dialogRef) {
            dialoging = dialogRef;
            //       setGrInfo();
        },
        onshown: function (dialogRef) {
        },
        onhidden: function (dialogRef) {
            $('#gapgTable').bootstrapTable('refresh');
        }
    });
};

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

function selectTdzhDetail(row, title, mFlag) {
    yngrbsh=row.YNGRBSH;
    BootstrapDialog.show({
        title: title,
        size: BootstrapDialog.SIZE_WIDE,
        cssClass: 'dialog-bg-color dialog-footer-space',
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/sagl/sagl_tdzh.jsp'),
        buttons: [{
            label: '保存',
            cssClass: 'btn-default btn-sm',
            id: 'btn_tdzh_save',
            action: function (dialogItself) {
                prepareData()
                    .then(doSave)
                    .then(function (res) {
                        wnform.toast(res.message);
                        if (res.code === "T") {
                            dialogItself.close();
                        } else {
                            console.warn(res.message)
                        }
                    });
            }
        }, {
            label: '退出', cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],
        onshow: function (dialogRef) {
            $('#xmSearch').data('row', row)
                .data('src', '个案评估');
        },
        onshown: function (dialogRef) {
            dialogModel = dialogRef;
            if (mFlag === 'readOnly') {
                $('#btn_tdzh_save').prop('disabled', true);
                $('textarea').prop('readOnly', true);
            }
        },

        onhide: function (dialogRef) {
            $(this).removeData("bs.modal");
        },
        onhidden: function (dialogRef) {
            $(this).removeData("bs.modal");
            $('#gapgTable').bootstrapTable('refresh');
        }
    });
};

function selectBqChanged() {
    console.log('change');
    var bqType = '';
    bqType = $("#gapgbq").find("option:selected").val();
    if (bqType == '3' || bqType == '0') {
        bqType = '';
    } else {
        bqType = $("#gapgbq").find("option:selected").text();
        console.log(bqType);
    }

    if (bqType != '3') {
        $('#gapgTable').bootstrapTable("selectPage", 1);
        $('#gapgTable').bootstrapTable("refresh");
        return false;
    }
}

function selectKsChanged() {
    console.log('change');
    var ksType = '';
    ksType = $("#gapgks").find("option:selected").val();
    if (ksType == '3' || ksType == '0') {
        ksType = '';
    } else {
        ksType = $("#gapgks").find("option:selected").text();
        console.log(ksType);
    }

    if (ksType != '3') {
        $('#gapgTable').bootstrapTable("selectPage", 1);
        $('#gapgTable').bootstrapTable("refresh");
        return false;
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

