var dictData; // 字典项
var dlRybm; // 登录人员编码
var ywPara; // 业务参数（0 签约情况：未签约 1 签约情况：已签约 2 结案情况）
var sDjzt = '';

var searchStr = location.search;
ywPara = searchStr.substr(searchStr.indexOf('&') + 8, 8);
if (ywPara == '=init')
    ywPara = '0';

var rylist;//登记人员
var $table = $('#table');
var djlsh;
var yngrbsh;			//域内个人标识号

var hlqsqDialog = '';//申请页面弹窗
var hlqshDialog = '';//审核页面弹窗
var hlqxgqyDialog = '';//修改启用页面弹窗
var hlqxgtyDialog = '';//修改停用页面弹窗

var current_Row = '';//当前row

//护理券状态[查询条件]
var fpztArray = [{id: '5', text: "已申请"},{id: '1', text: '待审核'},{id: '0', text: '已审核'}, {id: '2', text: '审核不通过'}, {id: '3', text: '已启用'}, {id: '4', text: '已停用'}];
var flagHlqzt='';//保存全部护理券状态查询条件

$table = $('#table');

var selects;//新增护理券人员选中列

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

$(function () {
    getXbInfoAndYblx();//获取性别和医保类别

    getRylist();//获取全部人员
    initTable();//加载table

    GetRqNum(); // 获取标题中的统计数目

    if (ywPara == '1') {
        $('.list-title-space').parent().removeClass('block-select');
        $('#wshNum').parent().parent().addClass('block-select');
    }

    initButtones();

    initHlqzt();
});

function initHlqzt() {
    $('#hlqzt').select2({
        language: 'zh-CN',
        placeholder: "请选择查询状态",
        multiple: true,
        data: fpztArray
    }).val(["5"]).trigger("change");
};

function initButtones() {
    // 新增按钮事件
    $('#btn_add').on('click', function () {
        addHlqsqApply();
    });

    // 查询按钮事件
    $('#btn_query').on('click', function () {
        $('#btn_add').css('display', 'none');
        ywPara = '';
        $('.list-title-space').parent().removeClass('block-select');
        // $table.bootstrapTable("selectPage", 1);
        // $table.bootstrapTable("refresh");
        initTable();
        return false;
    });

    // 导出事件
    $('#btn_export').on('click', function () {
        $table.tableExport({
            type: 'excel',
            escape: 'false'
        });
        return false;
    });
    /**
     * 绑定标题单击事件
     */
    $('#ysqNum').parent().parent().on('click', function () {
        $('#btn_add').css('display', 'block');
        $("#nl_select").val(null).trigger('change');
        $("#yble_select").val(null).trigger('change');
        $('.list-title-space').parent().removeClass('block-select');
        $(this).parent().addClass('block-select');
        ywPara = '0';
        // 初始化查询条件
        InitSearch();
        $table.bootstrapTable("selectPage", 1);
        initTable();
        $('#hlqzt').select2().val(["5"]).trigger("change");
        return false;
    });

    $('#wshNum').parent().parent().on('click', function () {
        $('#btn_add').css('display', 'none');
        $("#nl_select").val(null).trigger('change');
        $("#yble_select").val(null).trigger('change');
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        ywPara = '1';
        InitSearch();
        $table.bootstrapTable("selectPage", 1);
        initTable();
        $('#hlqzt').select2().val(["1"]).trigger("change");
        return false;
    });

    $('#yshNum').parent().parent().on('click', function () {
        $('#btn_add').css('display', 'none');
        $("#nl_select").val(null).trigger('change');
        $("#yble_select").val(null).trigger('change');
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        ywPara = '2';
        InitSearch();
        $table.bootstrapTable("selectPage", 1);
        initTable();
        $('#hlqzt').select2().val(["0"]).trigger("change");
        return false;
    });

    $('#yqyNum').parent().parent().on('click', function () {
        $('#btn_add').css('display', 'none');
        $("#nl_select").val(null).trigger('change');
        $("#yble_select").val(null).trigger('change');
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        ywPara = '3';
        InitSearch();
        $table.bootstrapTable("selectPage", 1);
        initTable();
        $('#hlqzt').select2().val(["3"]).trigger("change");
        return false;
    });

    $('#ytyNum').parent().parent().on('click', function () {
        $('#btn_add').css('display', 'none');
        $("#nl_select").val(null).trigger('change');
        $("#yble_select").val(null).trigger('change');
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        ywPara = '4';
        InitSearch();
        $table.bootstrapTable("selectPage", 1);
        initTable();
        $('#hlqzt').select2().val(["4"]).trigger("change");
        return false;

    });
}
function addHlqsqApply() {
    selects = '';
    BootstrapDialog.show({
        title: '护理券申请人员选择',
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/hlqgl/hlqglAdd.jsp'),
        buttons: [
            {
                label: '确定',
                cssClass: 'btn-default btn-sm',
                action: function (dialog) {
                    selects = $("#hlqApplyPersonInfoTable").bootstrapTable('getSelections');
                    dialog.close();
                }
            }, {
                label: '退出', cssClass: 'btn-default btn-sm',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }
        ],
        onshow: function (dialogRef) {
        },
        onshown: function (dialogRef) {
        },
        onhide: function (dialogRef) {
        },
        onhidden: function (dialogRef) {
            $("#hlqApplyPersonInfoTable").bootstrapTable("refresh");
            if (selects.length > 0) {
                BootstrapDialog.show({
                    title: '新增护理券申请',
                    size: BootstrapDialog.SIZE_WIDE,
                    closable: true,
                    draggable: true,
                    closeByBackdrop: false,
                    closeByKeyboard: false,
                    message: $('<div></div>').load('yyhpt/views/hlqgl/hlqsqDetail.jsp'),
                    buttons: [{
                        id: 'id_apply_save',
                        label: '保存',
                        cssClass: 'btn-default btn-sm',
                        action: function (dialog) {
                            doSaveHlqsq();
                            hlqsqDialog = dialog;
                        }
                    }, {
                        id: 'id_apply_exit',
                        label: '退出',
                        cssClass: 'btn-default btn-sm',
                        action: function (dialogItself) {
                            dialogItself.close();
                        }
                    }],
                    onshow: function (dialogRef) {
                        dialog = dialogRef;
                        if (selects.length > 0) {
                            selectedRow = selects[0];
                            current_Row = selects[0];
                            // setInitHlqsqInfo(selectedRow);
                        }
                    },
                    onshown: function (dialogRef) {
                        /*if (selects.length > 0) {
                         selectedRow = selects[0];
                         current_Row=selects[0];
                         // setInitHlqsqInfo(selectedRow);
                         }*/
                    },
                    onhide: function (dialogRef) {
                    },
                    onhidden: function (dialogRef) {
                        GetRqNum();
                        $('#table').bootstrapTable('refresh');
                    }
                });

            }
        }
    });
}

/*
 * 获取全部人员
 */
function getRylist() {
    $.ajax({
        url: "common.do?action=getSysCzrylist",
        type: "post",
        dataType: "json",
        data: {
            // jsmc:'签约医生一览表'
        },
        success: function (data) {
            rylist = data.czrys;
            // 初始化签约人员
            wn.createSelectByCZRYArray($("#djys"), rylist);
            dlRybm = data.rybm;
        }
    });
}

//获取查询参数
function getPara(params) {
    //查询状态条件
    flagHlqzt = '';

    if ($('#hlqzt').val()) {
        if ($('#hlqzt').val().length == 5) {
            flagHlqzt = '3';
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
        url: "yyhpt_hlqgl.do?action=getHlqlbInfo", // 获取数据的Servlet地址
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
                    xm: $("#xm").val().trim(),
                    sfzh: $("#sfzh").val(),
                    qyysbm: $("#djys").val(),
                    djzt: sDjzt,
                    ywPara: ywPara,
                    nlfw: $("#nl_select").find("option:selected").val(),
                    ylfyzffsdm: $("#yble_select").find("option:selected").val(),
                    hlqzt: $('#hlqzt').val(),
                    flagHlqzt:flagHlqzt
                }
                ;
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
                align: 'center',
                visible: true
            },
            {
                field: 'NL',
                title: '年龄',
                align: 'center',
                visible: true
            },
            {
                field: 'YLFYZFFSMC',
                title: '医保类型',
                align: 'center'
            },
            {
                field: 'GLDJMC',
                title: '照护等级',
                align: 'center'
            },
            {
                field: 'SQRQ',
                title: '申请时间',
                align: 'center',
                visible: ywPara == '0' || ywPara == '1' || ywPara == '2'
            },
            {
                field: 'QYTYRYSJ',
                title: '启用时间',
                align: 'center',
                visible: ywPara == '3' || ywPara == '4'
            },
            {
                field: 'JZDZ',
                title: '居住地址',
                halign: 'center',
                align: 'left'
            },
            {
                field: 'ZHYCJE',
                title: '账户预存金额',
                align: 'center',
                visible: ywPara == '2'
            },
            {
                field: 'ZHYE',
                title: '账户余额',
                align: 'center',
                visible: ywPara == '2'
            },
            {
                field: 'QYZT',
                title: '状态',
                formatter: function (value, row, index) {
                    switch (value) {
                        case '0':
                            return '已启用';
                        case '1':
                            return '已停用';
                        default :
                            if (row.SHZT == '0') {
                                return '已申请';
                            } else if (row.SHZT == '2') {
                                return '审核未通过';
                            } else {
                                return '';
                            }

                    }
                },
                align: 'center',
                visible: ywPara != '1'
            },
            {
                title: '查看详情',
                align: 'center',
                events: {
                    'click .hlqsq': function (e, value, row, index) {
                        loadHlqsqDetail(row, value, index);
                    }
                },
                formatter: function (value, row, index) {
                    return '<a class="hlqsq"  href="javascript:void(0)"><img src="layouts/img/table/icon_right.png">详情</a>';
                }
            },
            {
                field: 'CZ',
                title: '操作',
                align: 'center',
                events: {
                    'click .hlqsq': function (e, value, row, index) {
                        loadHlqsqDetail(row, value, index);
                    },
                    'click .hlqsh': function (e, value, row, index) {
                        loadHlqshDetail(row, value, index);
                    },
                    'click .hlqxgqy': function (e, value, row, index) {
                        loadHlqxgqyDetail(row, value, index);
                    },
                    'click .hlqxgty': function (e, value, row, index) {
                        loadHlqxgtyDetail(row, value, index);
                    }
                },
                formatter: function (value, row, index) {
                    switch (ywPara) {
                        case '1':
                            return '<a class="hlqsh"  href="javascript:void(0)"><img src="layouts/img/table/icon_add.png">审核</a>';
                            break;
                        case '2':
                            if (row.SHZT == '1') {
                                return '<a class="hlqsh"  href="javascript:void(0)"><img src="layouts/img/table/icon_select.png">通过</a>';
                            } else {
                                return '<a class="hlqsh"  href="javascript:void(0)"><img src="layouts/img/table/icon_disAgree.png">不通过</a>';
                            }
                            break;
                        case '3':
                            return '<a class="hlqxgqy"  href="javascript:void(0)"><img src="layouts/img/table/icon_edit_red.png">修改</a>';
                            break;
                        case '4':
                            return '<a class="hlqxgty"  href="javascript:void(0)"><img src="layouts/img/table/icon_edit_red.png">修改</a>';
                            break;
                    }
                },
                visible: ywPara != '0' && ywPara!=''
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

function loadHlqsqDetail(row, value, index) {
    BootstrapDialog.show({
        title: '新增护理券申请',
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/hlqgl/hlqsqDetail.jsp'),
        buttons: [{
            id: 'id_apply_exit',
            label: '退出',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],
        onshow: function (dialogRef) {
            dialog = dialogRef;
            current_Row = row;
        },
        onshown: function (dialogRef) {
            // current_Row=row;
            // setInitHlqsqInfo(current_Row);
        },
        onhide: function (dialogRef) {
        },
        onhidden: function (dialogRef) {
            GetRqNum();
            $('#table').bootstrapTable('refresh');
        }
    });
}

function loadHlqshDetail(row, value, index) {
    BootstrapDialog.show({
        title: '护理券审核',
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/hlqgl/hlqshDetail.jsp'),
        buttons: [{
            label: '告知书',
            id: 'see_informed_consent',
            cssClass: 'btn-default btn-sm',
            action: function (dialog) {
                if (row.SHZT == '0') {
                    wnform.toast('尚未审核，暂不能查看!');
                    $('#see_informed_consent').prop('disabled', true);
                } else {
                    showHlqgzs(row, value);
                }
            }
        }, {
            id: 'id_hlqsh_save',
            label: '保存',
            cssClass: 'btn-default btn-sm',
            action: function (dialog) {
                doSaveHlqsh();
                hlqshDialog = dialog;
            }
        }, {
            id: 'id_hlqsh_exit',
            label: '退出',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],
        onshow: function (dialogRef) {
            dialog = dialogRef;
        },
        onshown: function (dialogRef) {
            setHlqShInitInfo(row);
        },
        onhide: function (dialogRef) {
        },
        onhidden: function (dialogRef) {
            GetRqNum();
            $('#table').bootstrapTable('refresh');
        }
    });
}

function loadHlqxgqyDetail(row, value, index) {
    BootstrapDialog.show({
        title: '启用状态修改',
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/hlqgl/hlqxgDetail.jsp'),
        buttons: [{
            id: 'id_hlqsh_save',
            label: '保存',
            cssClass: 'btn-default btn-sm',
            action: function (dialog) {
                hlqxgqyDialog = dialog;
                doSaveHlqxg(hlqxgqyDialog);
            }
        }, {
            id: 'id_hlqsh_exit',
            label: '退出',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],
        onshow: function (dialogRef) {
            dialog = dialogRef;
        },
        onshown: function (dialogRef) {
            setHlqxgInitInfo(row, 'isQy');
        },
        onhide: function (dialogRef) {
        },
        onhidden: function (dialogRef) {
            GetRqNum();
            $('#table').bootstrapTable('refresh');
        }
    });
}

function loadHlqxgtyDetail(row, value, index) {
    BootstrapDialog.show({
        title: '停用状态修改',
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/hlqgl/hlqxgDetail.jsp'),
        buttons: [{
            id: 'id_hlqsh_save',
            label: '保存',
            cssClass: 'btn-default btn-sm',
            action: function (dialog) {
                hlqxgtyDialog = dialog;
                doSaveHlqxg(hlqxgtyDialog);
            }
        }, {
            id: 'id_hlqsh_exit',
            label: '退出',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],
        onshow: function (dialogRef) {
            dialog = dialogRef;
        },
        onshown: function (dialogRef) {
            setHlqxgInitInfo(row, 'isTy');
        },
        onhide: function (dialogRef) {
        },
        onhidden: function (dialogRef) {
            GetRqNum();
            $('#table').bootstrapTable('refresh');
        }
    });
}

// 初始化查询条件
function InitSearch() {
    $("#qyys").val(dlRybm);
    $("#xm").val("");
    $("#sfzh").val("");
    $('#hlqzt').select2().val(null).trigger("change");
    wn.iCheckInit();
}

function GetRqNum() {
    $.ajax({
        url: 'yyhpt_hlqgl.do?action=num',
        type: "get",
        dataType: "json",
        data: {},
        success: function (data) {
            if (data.rows.length > 0) {
                var datas = data.rows[0];
                displayNumberOfBlock($('#block1'), $('#ysqNum'), $('#ysqNum'), datas.YSQ, datas.YSQ);
                displayNumberOfBlock($('#block2'), $('#wshNum'), $('#yshNum'), datas.WSH, datas.YSH);
                displayNumberOfBlock($('#block3'), $('#yqyNum'), $('#ytyNum'), datas.YQY, datas.YTY);
                $('.counter').counterUp();
            }
        }
    });
}

var xblx;
var yblx;
function getXbInfoAndYblx() {
    $.ajax({
        url: 'yyhpt_hlqgl.do?action=getXbInfoAndYblx',
        type: "get",
        dataType: "json",
        data: {},
        success: function (data) {
            xblx = data.rows;
            yblx = data.yblx;
            // // 初始化机构
            var nlShuttle = [{'id': '1', 'text': '60-69岁(含69岁)'}, {'id': '2', 'text': '大于等于70岁'}];
            createSelectByCZRYArray($("#nl_select"), nlShuttle, '1');//选择年龄区间
            createSelectByCZRYArray($("#yble_select"), yblx, '2');
            $("#nl_select").select2({language: 'zh-CN'});
            $("#yble_select").select2({language: 'zh-CN'});
        }
    });

}

function createSelectByCZRYArray(selObject, array, index) {

    var selectBody = "<option value=''>--请选择--</option>";
    if (index == '1') {
        $.each(array, function () {
            selectBody += "<option value=" + this.id + "  name='nlShuttle'>" + this.text
                + "</option>";
        });
    } else {
        $.each(array, function () {
            selectBody += "<option value=" + this.id + "  name='yblx'>" + this.text
                + "</option>";
        });
    }
    selObject.html(selectBody);
}
