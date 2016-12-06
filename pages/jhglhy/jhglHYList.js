var dictData;         //字典项
var dlRybm;          //登录人员编码
var ywPara;       //业务参数（0 计划制定 1 计划审核 2 计划执行）
var currow;
var searchStr = location.search;//获取查询参数
ywPara = searchStr.substr(searchStr.indexOf('&') + 8, 8);//将获取的参数值传递给ywParam
if (ywPara == '=inithy')
    ywPara = '0';
var dialoging = "";
var dialogRefs = "";
var zxdialogRef = "";
var flag = "1";
var jhgljhlx = '';

//计划状态[查询条件]
var jhztArray = [{id: '5', text: "全部"}, {id: '0', text: '待制定'}, {id: '1', text: '待审核'}, {id: '2', text: '审核不通过'},
    {id: '3', text: '待执行'}, {id: '4', text: '已执行'}];
var flagjhzt = '';//保存全部计划状态查询条件

document.onkeydown = function (event) {
    var target, code, tag;
    if (!event) {
        event = window.event; //针对ie浏览器
        target = event.srcElement;
        code = event.keyCode;
        if (code == 13) {
            tag = target.tagName;
            if (tag == "TEXTAREA") {
                return true;
            }
            else {
                return false;
            }
        }
    }
    else {
        target = event.target; //针对遵循w3c标准的浏览器，如Firefox
        code = event.keyCode;
        if (code == 13) {
            tag = target.tagName;
            if (tag == "INPUT") {
                return true;
            }
            else {
                return false;
            }
        }
    }
};

function getRylist() {
    $.ajax({
        url: "sysdata.do?action=listByJsbm",
        type: "post",
        dataType: "json",
        data: {
            jsmc: '签约医生一览表'
        },
        success: function (data) {
            rylist = data.czrys;
            //初始化签约人员
            wn.createSelectByCZRYArray($("#qyys"), rylist);
            dlRybm = data.rybm;
        }
    });
}

function initJhztForQuery() {
    $('#jhzt').select2({
        language: 'zh-CN',
        placeholder: "请选择查询状态",
        multiple: true,
        data: jhztArray
    }).val(["0"]).trigger("change")
        .on('change', function () {
            if ($('#jhzt').val()) {
                if ($('#jhzt').val()[0] == '5') {
                    $('#jhzt').val(["0", "1", "2", "3", "4"]).trigger("change");
                }
            }
        });
}

function getParam(params) {
    //查询状态条件
    flagjhzt = '';

    if ($('#jhzt').val()) {
        if ($('#jhzt').val().length == 5) {
            flagjhzt = '3';
        }
    }
}

function initTable() {
    // 先销毁表格
    $('#table').bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $('#table').bootstrapTable({
        classes: 'table table-hover warning',
        method: "get", // 使用get请求到服务器获取数据
        url: "yyhptjhglhy.do?action=list", // 获取数据的Servlet地址
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
            dictData = res.dict;
            return res;
        },
        queryParamsType: "undefined",
        showPaginationSwitch: false,
        queryParams: function queryParams(params) { // 设置查询参数
            getParam(params);
            var param = {
                currPage: params.pageNumber,
                pageSize: params.pageSize,
                xm: $("#xm").val(),
                sfzh: $("#sfzh").val(),
                qyysbm: $("#qyys").val(),
                ywPara: ywPara,
                jhlx: jhgljhlx,
                flagjhzt: flagjhzt,
                jhzt: $('#jhzt').val()
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
                align: 'center'
            },
            {
                field: 'XBMC',
                title: '性别',
                align: 'center'
            },
            {
                field: 'NL',
                title: '年龄',
                align: 'center',
                visible: true
            },
            {
                field: 'SFZH',
                title: '身份证号',
                formatter: function (value, row, index) {
                    if (value != undefined) {
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
            }, {
                field: 'JHLX',
                title: '计划类型',
                align: 'center'
            },
            {
                field: 'JHZD',
                title: '计划制定',
                events: operateEvents,
                formatter: operateFormatter,
                align: 'center'
            },
            {
                field: 'JHSH',
                title: '计划审核',
                events: operateEvents,
                formatter: function (value, row, index) {
                    var option = '（审核中）';
                    if (row.SHZT === '1') {
                        option = '（审核通过）';
                    } else {
                        option = '（审核不通过）';
                    }
                    if (value == '0') {
                        return '<a class="jhlbToJhsh" href="javascript:void(0)"  > <img src="layouts/img/table/icon_del.png"> 计划审核<a/>';
                    } else {
                        if (option == '（审核不通过）') {
                            return '<a class="jhlbToJhsh" href="javascript:void(0)"  > <img src="layouts/img/table/icon_disAgree.png"> ' + value + '<a/>';
                        } else {
                            return '<a class="jhlbToJhsh" href="javascript:void(0)"  > <img src="layouts/img/table/icon_select.png"> ' + value + '<a/>';
                        }
                    }
                },
                align: 'center'
            },
            {
                field: 'SCRWDX',
                title: '计划执行',
                events: operateEvents,
                formatter: function (value, row, index) {
                    if (value == '0') {
                        return '<a class="jhlbToJhzx" href="javascript:void(0)"  > <img src="layouts/img/table/icon_del.png"> 计划执行<a/>';
                    } else {
                        return '<a class="jhlbToJhzx" href="javascript:void(0)"  > <img src="layouts/img/table/icon_select.png"> ' + value + '<a/>';
                    }
                },
                align: 'center'
            },
            {
                field: 'JALXZT',
                title: '状态',
                align: 'center'
            },
            {
                field: 'JZDXXDZ',
                title: '居住地址',
                visible: true
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
}

window.operateEvents = {
    'click .jhlbToJhzd': function (e, value, row, index) {
        loadfwjhzdDetail(row, '服务计划制定', value);
    },
    'click .jhlbToJhsh': function (e, value, row, index) {
        selectfwjhshList(row, '服务计划审核', value);
    },
    'click .jhlbToJhzx': function (e, value, row, index) {
        selectfwjhzxList(row, '服务计划执行', value);
    }
};

function operateFormatter(value, row, index) {
    if (value == '0') {
        return '<a class="jhlbToJhzd" href="javascript:void(0)"  > <img src="layouts/img/table/icon_del.png"> 计划制定<a/>';
    } else {
        return '<a class="jhlbToJhzd" href="javascript:void(0)"  > <img src="layouts/img/table/icon_select.png"> ' + value + '<a/>';
    }
}

//获取标题中的人群数目
GetRqNum();

initTable();

var $table = $('#table');

$(function () {
    isMenu = false;
    wnform.addOnresize($table, tableStaus);

    if (ywPara == '3') {
        $('.list-title-space').parent().removeClass('block-select');
        $('#jhzxYzxNum').parent().addClass('block-select');
    } else if (ywPara === '1') {
        $('.list-title-space').parent().removeClass('block-select');
        $('#jhshNum').parent().addClass('block-select');
    } else if (ywPara === '2') {
        $('.list-title-space').parent().removeClass('block-select');
        $('#jhzxWzxNum').parent().addClass('block-select');
    }

    //查询按钮事件
    $('#btn_query').on('click', function () {

        var jhlxType = '';
        jhlxType = $("#jhgljhlx").find("option:selected").val();
        if (jhlxType == '3' || jhlxType == '0') {
            jhgljhlx = '';
        } else {
            jhgljhlx = $("#jhgljhlx").find("option:selected").text();
        }

        ywPara = '';
        $('.list-title-space').parent().removeClass('block-select');
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });

    //导出事件
    $('#export').on('click', function () {
        $table.tableExport({type: 'excel', escape: 'false'});
        return false;
    });

    /**
     * 绑定标题单击事件
     */
    $('#jhzdNum').parent().on('click', function () {
        $("#jhgljhlx").val('3');
        jhgljhlx = '';
        ywPara = '0';
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        //初始化查询条件
        InitSearch();
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        $('#jhzt').select2().val(["0"]).trigger("change");
        // ywPara = '';
        return false;
    });

    $('#jhshNum').parent().on('click', function () {
        $("#jhgljhlx").val('3');
        jhgljhlx = '';
        ywPara = '1';
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        InitSearch();
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        $('#jhzt').select2().val(["1"]).trigger("change");
        return false;
    });

    $('#jhzxWzxNum').parent().on('click', function () {
        $("#jhgljhlx").val('3');
        jhgljhlx = '';
        ywPara = '2';
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        InitSearch();
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        $('#jhzt').select2().val(["3"]).trigger("change");
        return false;
    });

    $('#jhzxYzxNum').parent().on('click', function () {
        $("#jhgljhlx").val('3');
        jhgljhlx = '';
        ywPara = '3';
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        InitSearch();
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        $('#jhzt').select2().val(["4"]).trigger("change");
        return false;
    });

    initJhztForQuery();
});

//初始化查询条件
function InitSearch() {
    // $("#qyys").val(dlRybm);
    $("#xm").val("");
    $("#sfzh").val("");
    $('#jhzt').select2().val(null).trigger("change");
}

function GetRqNum() {
    $.ajax({
        url: 'yyhptjhglhy.do?action=num',
        type: "get",
        dataType: "json",
        data: {},
        success: function (data) {
            console.info(data);
            displayNumberOfBlock($('#block1'), $('#jhzdNum'), $('#jhzdNum'), data.WZD, data.WZD);
            displayNumberOfBlock($('#block2'), $('#jhshNum'), $('#jhshNum'), data.YZDWSH, data.YZDWSH);
            displayNumberOfBlock($('#block3'), $('#jhzxWzxNum'), $('#jhzxYzxNum'), data.WZX, data.YZX);
            $('.counter').counterUp();
        }
    });
}

/*
   计划制定弹出
 */
function loadfwjhzdDetail(row, title, value) {
    currow = row;
    BootstrapDialog.show({
        title: '服务计划制定',
        size: BootstrapDialog.SIZE_BIG,
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/jhglhy/newFwjhzdHYgrDetail.jsp'),
        onshow: function (dialogRef) {
            dialoging = dialogRef;
        },
        onshown: function (dialogRef) {
        },
        onhidden: function (dialogRef) {
            GetRqNum();
            initTable();
        }
    });
}

function selectfwjhshList(row, title, value) {
    currow = row;
    if (row.JHLSH == '' || row.JHLSH == null) {
        wnform.toast('请先进行计划制定!');
        return false;
    } else {
        BootstrapDialog.show({
            title: '服务计划审核',
            size: BootstrapDialog.SIZE_BIG,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/jhglhy/fwjhshHYList.jsp'),
            onshow: function (dialogRef) {
                dialogRefs = dialogRef;
            },
            onshown: function (dialogRef) {
            },
            onhide: function (dialogRef) {
            },
            onhidden: function (dialogRef) {
                $('#table').bootstrapTable('refresh');
            }
        });
    }
}

function selectfwjhzxList(row, title, value) {
    currow = row;
    if (row.JHLSH == '' || row.JHLSH == null) {
        wnform.toast('请进行计划制定!');
        return false;
    } else if (row.SHZT != '1') {
        wnform.toast('请进行计划审核!');
        return false;
    } else {
        BootstrapDialog.show({
            title: '服务计划执行',
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/jhglhy/fwjhzxList.jsp'),
            onshow: function (dialogRef) {
                zxdialogRef = dialogRef;
            },
            onshown: function (dialogRef) {
                /*     //绑定优惠券展示链接
                 $('#a_Coupon').on('click', function () {
                 modelFuncs_Coupon();
                 });*/
            },

            onhide: function (dialogRef) {
            },
            onhidden: function (dialogRef) {
                GetRqNum();
                initTable();
            }
        });
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

