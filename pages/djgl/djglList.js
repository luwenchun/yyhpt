var dictData; // 字典项
var dlRybm; // 登录人员编码
var ywPara; // 业务参数（0 签约情况：未签约 1 签约情况：已签约 2 结案情况）
var sDjzt = '';

var searchStr = location.search;
ywPara = searchStr.substr(searchStr.indexOf('&') + 8, 8);
if (ywPara == '=init')
    ywPara = '0';

var sqlsh;	//需求评估报告流水号
var rylist;//登记人员
var $table = $('#table');
var teamInfo;			//服务团队
var peopleInfo;			//护理员工
var djlsh;
var gldjdm;
var askAready = 0;
var jasqOrJash = 0;		//是结案申请1或结案审核2
var hasJhzdFlag = 0;	//是否已有制定的计划
var jashFlag = 0;		//结案审核标志
var yngrbsh;			//域内个人标识号
var editRow;
var jayysm = '';		//结案原因说明
var shbtgyy = '';		//审核不通过原因
var qyzts = [];         //签约状态

var readAgree = '0';
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
                url: "yyhptqygl.do?action=list", // 获取数据的Servlet地址
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
//                    changeRowStyle(res);
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
                        ylfyzffsdm: $('#yblb').val(),
                        zt: JSON.stringify(qyzts).toLowerCase(),
                    };
                    return param;
                },
                // rowStyle:function (row, index) {
                //     var defClasses="";
                //     if (row.JALX==1){
                //         defClasses = 'danger';
                //         return { classes: defClasses }
                //     } else {
                //         return {};
                //     }
                // },
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
                        align: 'center',
                        visible: false
                    },
                    {
                        field: 'LXDH',
                        title: '联系电话',
                        align: 'center'
                    },
                    {
                        field: 'YLFYZFFSMC',
                        title: '医保类别',
                        align: 'center'
                    },
                    {
                        field: 'QYDJ',
                        title: '签约情况',
                        events: operateEvents,
                        formatter: operateFormatter,
                        align: 'center'
                    },
                    {
                        field: 'QYSH',
                        title: '签约审核',
                        events: operateEvents,
                        formatter: function (value, row, index) {
                            var option = '（审核中）';
                            if (row.SHZT === '1') {
                                option = '（审核通过）';
                            } else {
                                option = '（审核不通过）';
                            }
                            if (value == '0') {
                                return '<a class="qyshToNrdj" href="javascript:void(0)"  > <img src="layouts/img/table/icon_del.png"> 签约审核<a/>';
                            } else {
                                if (option == '（审核不通过）') {
                                    return '<a class="qyshToNrdj" href="javascript:void(0)"  > <img src="layouts/img/table/icon_disAgree.png"> ' + value + '<a/>';
                                } else {
                                    return '<a class="qyshToNrdj" href="javascript:void(0)"  > <img src="layouts/img/table/icon_select.png"> ' + value + '<a/>';
                                }
                            }
                        },
                        align: 'center'
                    },
                    {
                        field: 'HLRY',
                        title: '护理人员',
                        align: 'center'
                    },
                    {
                        field: 'JALX',
                        title: '状态',
                        formatter: function (value, row, index) {
                            switch (value) {
                                case '0':
                                    return '正常';
                                case '1':
                                    return '中止';
                                default :
                                    return '正常';
                            }
                        },
                        align: 'center'
                    },
                    {
                        field: 'JZDZ',
                        title: '居住地址',
                        halign: 'center',
                        align: 'left'
                    }],
                onLoadSuccess: function () { // 加载成功时执行
                },
                onLoadError: function () { // 加载失败时执行

                },
                onCheck: function (row) {
                },
                onUncheck: function (row) {
                    // alert(row.id);
                }
            });
}

/**
 * [ description]
 *
 * @type {Object} 格式化操作栏绑定事件
 */
window.operateEvents = {
    'click .djglToNrdj': function (e, value, row, index) {
        loadNrdjDetail(row, '纳入签约管理', value);
    },
    'click .qyshToNrdj': function (e, value, row, index) {
        loadNrdjQyshDetail(row, '纳入签约审核', value);
    }
};
/**
 * @param value
 * @param row
 * @param index
 * @returns {String}
 */
function operateFormatter(value, row, index) {
    if (value == '0') {//0 未登记
        return '<a class="djglToNrdj" href="javascript:void(0)"> <img src="layouts/img/table/icon_del.png"> 纳入签约<a/>';
    } else {
        return '<a class="djglToNrdj" href="javascript:void(0)"> <img src="layouts/img/table/icon_select.png">' + value + '<a/>';
    }
}
/////============纳入登记管理开始
/**
 * 纳入登记
 * @param row
 * @param title
 * @param value
 * @returns {Boolean}
 */
function loadNrdjDetail(row, title, value) {
    this.yngrbsh = row.YNGRBSH
    this.sqlsh = row.SQLSH
    this.editRow = row;
    if (readAgree == '0') {
        readAgree = editRow.QYDJ;
    }
    BootstrapDialog.show({
        title: '纳入签约管理',
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/djgl/nrdjgl.jsp'),
        buttons: [{
            label: '查看知情同意书',
            id: 'see_informed_consent',
            cssClass: 'btn-default btn-sm',
            action: function (dialog) {
                if (readAgree == '0') {
                    wnform.toast('尚未签约，暂不能查看!');
                    $('#see_informed_consent').prop('disabled', true);
                } else {
                    showHlfwZqtys(row, value);
                }
            }
        }, {
            label: '保存',
            id: 'saveNrdj',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {

                if (checkFwDate() && checkHlqDate()) {
                    if (editRow.JALX == '1') {
                        wnform.toast('已中止服务，不能修改!');
                        $('#saveNrdj').prop('disabled', true);
                    } else if (hasJhzdFlag == 1) {                                        //增加页面控制[已经制定计划]、[已中止]均不可编辑
                        wnform.toast('已制定计划，不能修改!');
                        $("#saveNrdj").prop('disabled', true);
                    } else if (editRow.SHZT == '1' || editRow.SHZT == '2') {
                        wnform.toast('签约已审核，不能修改!');
                        $("#saveNrdj").prop('disabled', true);
                    } else {
                        saveForm.init(dialogItself, yngrbsh, sqlsh);
                        $('#defaultForm').submit();
                    }
                }
            }
        },
            {
                label: '退出', cssClass: 'btn-default btn-sm',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }],
        onshow: function (dialogRef) {
        },
        onshown: function (dialogRef) {
        },
        onhide: function (dialogRef) {
        },
        onhidden: function (dialogRef) {
            GetRqNum();
            // initTable();
            $('#table').bootstrapTable('refresh');
        }
    });
}

function loadNrdjQyshDetail(row, title, value) {
    this.yngrbsh = row.YNGRBSH;
    this.sqlsh = row.SQLSH;
    this.editRow = row;
    if (row.DJLSH == null || row.DJLSH == '') {
        wnform.toast('尚未纳入签约，不能审核!');
        return false;
    } else {
        BootstrapDialog.show({
            title: title,
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/djgl/nrdjqysh.jsp'),
            buttons: [{
                label: '查看知情同意书',
                id: 'see_informed_consent',
                cssClass: 'btn-default btn-sm',
                action: function (dialog) {
                    if (editRow.QYDJ == '0') {
                        wnform.toast('尚未签约，暂不能查看!');
                        $('#see_informed_consent').prop('disabled', true);
                    } else {
                        showHlfwZqtys(row, value);
                    }
                }
            }, {
                label: '保存',
                id: 'saveNrdj',
                cssClass: 'btn-default btn-sm',
                action: function (dialogItself) {
                    if (editRow.JALX == '1') {
                        wnform.toast('已中止服务，不能修改!');
                        $('#saveNrdj').prop('disabled', true);
                    } else if (hasJhzdFlag == 1) {                                        //增加页面控制[已经制定计划]、[已中止]均不可编辑
                        wnform.toast('已制定计划，不能修改!');
                        $("#saveNrdj").prop('disabled', true);
                    } else if (editRow.djlsh != null) {
                        wnform.toast('请先进行签约!');
                        return false;
                    } else {
                        saveQyshResult(row);
                    }
                }
            },
                {
                    label: '退出', cssClass: 'btn-default btn-sm',
                    action: function (dialogItself) {
                        dialogItself.close();
                    }
                }],
            onshow: function (dialogRef) {
            },
            onshown: function (dialogRef) {
            },
            onhide: function (dialogRef) {
            },
            onhidden: function (dialogRef) {
                GetRqNum();
                // initTable();
                $('#table').bootstrapTable('refresh');
            }
        });
    }

}

function showHlfwZqtys(row, value) {
    BootstrapDialog.show({
        title: '护理服务知情同意书',
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhptpggl.do?action=initZqtys'),
        buttons: [
            /*{
             label: '打印',
             action: function (dialog) {
             printDiv('zqtys_print');
             }
             },
             {
             label: '退出',
             action: function (dialog) {
             dialog.close();
             }
             }*/
        ],
        onshow: function (dialogRef) {
        },
        onshown: function (dialogRef) {
            dialogModel = dialogRef;
        },
        onhide: function (dialogRef) {

        },
        onhidden: function (dialogRef) {
        }
    });
};
///////////========纳入签约管理结束


/**
 * 初始化表格
 */
$table = $('#table')
/**
 * 获取页面高度
 */
function getHeight() {
    return $(window).height() - 150;
}
/**
 * [description] 初始化页面 事件注册
 */
$(function () {
    wn.iCheckInit();
    getRylist();
    initTable();
    // 获取标题中的人群数目
    GetRqNum();
    initInsuranceType();
    isMenu = false;
    wnform.addOnresize($table, tableStaus);

    if (ywPara == '1') {
        $('.list-title-space').parent().removeClass('block-select');
        $('#wshNum').parent().parent().addClass('block-select');
    }

    // 查询按钮事件
    $('#btn_query').on('click', function () {
        ywPara = '';
        $('.list-title-space').parent().removeClass('block-select');
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
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
    $('#wdjNum').parent().parent().on('click', function () {
        $('.list-title-space').parent().removeClass('block-select');
        $(this).parent().addClass('block-select');
        ztSelect2Change('2');
        ywPara = '0';
        // 初始化查询条件
        InitSearch();
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
//		ywPara = '';
        return false;
    });

    $('#wshNum').parent().parent().on('click', function () {
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        ztSelect2Change('3');
        ywPara = '1';
        InitSearch();
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
//		ywPara = '';
        return false;
    });

    $('#ydjNum').parent().parent().on('click', function () {
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        ztSelect2Change('5');
        ywPara = '2';
        InitSearch();
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
//		ywPara = '';
        return false;
    });

    $('#yzzNum').parent().parent().on('click', function () {
        $('.list-title-space').parent().removeClass('block-select');
        $(this).addClass('block-select');
        ywPara = '4';
        InitSearch();
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
//		ywPara = '';
        return false;
    });

    var ztArr = [{'id': '1', 'text': '全部'}, {'id': '2', 'text': '待签约'}, {'id': '3', 'text': '待审核'}, {
        'id': '4',
        'text': '审核不通过'
    }, {'id': '5', 'text': '已签约'}]

    $('#zt').select2({
        language: 'zh-CN',
        multiple: true,
        data: ztArr
    }).val('2').trigger('change').on('change', function () {
        if ($('#zt').val()) {
            if ($('#zt').val()[0] == '1') {
                $('#zt').val(["2", "3", "4", "5"]).trigger("change");
            }
        }
    });
});

function ztSelect2Change(id) {
    $('#zt').val(id).trigger('change');
}

setTimeout(function () {
    $table.bootstrapTable('resetView');
}, 200);

// 初始化查询条件
function InitSearch() {
    $("#qyys").val(dlRybm);
    $("#xm").val("");
    $("#sfzh").val("");
    $('[name = qygl]:checkbox').attr('checked', false);
    wn.iCheckInit();
}

function GetRqNum() {
    $.ajax({
        url: 'yyhptqygl.do?action=num',
        type: "get",
        dataType: "json",
        data: {},
        success: function (data) {
            var datas = data.rows[0];
            displayNumberOfBlock($('#block1'), $('#wdjNum'), $('#wdjNum'), datas.WDJ, datas.WDJ);
            displayNumberOfBlock($('#block2'), $('#wshNum'), $('#ydjNum'), datas.WSH, datas.YSH);
            displayNumberOfBlock($('#block3'), $('#yzzNum'), $('#yzzNum'), datas.YZJ, datas.YZJ);
            $('.counter').counterUp();
        }
    });
}

function checkFwDate() {
//	delRecords(\''+ obj[i].WJDM+ '\')"
    var ksrq = document.getElementById('ksrq').value;
    var jsrq = document.getElementById('jsrq').value;
    var ksrqv = ksrq.replace("-", '').replace("-", '');
    var jsrqv = jsrq.replace("-", '').replace("-", '');
    if (ksrqv > jsrqv) {
        wnform.toast('服务起始日期大于服务结束日期!');
        return false;
    }
    return true;
}

//获取查询参数
function getPara(params) {
    //正常、中止都勾选或都未勾选都查询全部数据。
    if ($('#zcCk').prop("checked") && $('#zzCk').prop("checked")) {
        sDjzt = '';
    } else if (!$('#zcCk').prop("checked") && !$('#zzCk').prop("checked")) {
        sDjzt = '';
    } else {
        if ($('#zcCk').prop("checked")) {           //正常
            sDjzt = '0';
        } else if ($('#zzCk').prop("checked")) {    //中止
            sDjzt = '1';
        } else {
            sDjzt = '1';
        }
    }
    qyzts = $('#zt').val();
    console.log(qyzts);
    console.log(ywPara)
}

function checkHlqDate() {
//	delRecords(\''+ obj[i].WJDM+ '\')"
    var ksrq = document.getElementById('yxqks').value;
    var jsrq = document.getElementById('yxqjs').value;
    var ksrqv = ksrq.split("-");
    var jsrqv = jsrq.split("-");
    if (ksrqv > jsrqv) {
        wnform.toast('有效起始日期大于有效结束日期!');
        return false;
    }
    var fwjgdmShow = $('#fwjgdm').val();
    if (fwjgdmShow == '') {
        wnform.toast('请选择[护理服务机构]');
        return false;
    } else {
        return true;
    }
}

function fillPageDatas(row) {
    $.each(row, function (k, v) {
        var obj = $('#' + k);
        if (obj.length > 0) {
            var type = obj.attr('type');
            if (type == 'text') {
                if (v != null) {
                    obj.val(v);
                }
            } else if (obj.is('p')) {
                if (v != null) {
                    obj.text(v);
                }
            } else if (type == undefined) {
                var tagname = obj.get(0).tagName.toLowerCase();
                if (tagname == 'select') {
                    if (v != null || v != undefined) {
                        wn.select2Set(obj, v);
                    }
                } else if (tagname == 'textarea') {
                    obj.val(v);
                }
            } else if (type == 'checkbox') {
                if (obj.attr('name') == k) {//普通耽搁checkbox，设id
                    if (obj.val() == v) {
                        obj.prop("checked", "checked");
                    } else {
                        obj.prop("checked", false);
                    }
                } else {// checkbox多选，id不等于name
                    wn.checkboxSet2(k, v);
                }
            } else if (tagname == 'select') {
                obj.val(v).trigger('change');
            } else if (type == 'textarea') {
                obj.val(v);
            } else if (type == 'radio') {
                k = k.replace('dm', 'mc')
                k = k.replace('jalx', 'jalxmc')
                k = k.replace('shjg', 'shjgmc')
                $("input[value='" + v + "'][name='" + k + "']").prop('checked', 'checked');
                $("input[name='" + k + "']").iCheck({
                    checkboxClass: 'icheckbox_flat-wnred',
                    radioClass: 'iradio_flat-wnred',
                    increaseArea: '20%'
                });
            }
        }
    })

}

//获取医保类型
function initInsuranceType() {
    $.ajax({
        url: 'personal_info.do?action=getInsuranceType',
        dataType: 'json',
        type: 'post',
        data: {},
        success: function (data) {
            wn.createSelectByArray($('#yblb'), data.insuranceType);
            $('#yblb').select2({language: 'zh-CN'});
        }
    });
}

/*根据出生日期算出年龄*/
function jsGetAge(strBirthday) {
    var returnAge;
    var strBirthdayArr = strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if (nowYear == birthYear) {
        returnAge = 0;//同年 则为0岁
    }
    else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay;//日之差
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1;
                }
                else {
                    returnAge = ageDiff;
                }
            }
            else {
                var monthDiff = nowMonth - birthMonth;//月之差
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1;
                }
                else {
                    returnAge = ageDiff;
                }
            }
        }
        else {
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
    }

    return returnAge;//返回周岁年龄

}
