var dictData;         //字典项
var dlRybm;          //登录人员编码
var ywPara = '1';       //业务参数（0 计划制定 1 计划审核 2 计划执行）
var $table = $('#table');
var dialoging = "";
var dialog = "";
var mainSelectedRow;
var selects ='';
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
    initButtons();
    initTable();
    wnform.addOnresize($table, tableStaus);
});

function initButtons() {
    //绑定新增事件
    $('#btn_add').on('click', function () {
        mainSelectedRow = null;
        addJhbgApply();
    });
    //查询按钮事件
    $('#btn_query').on('click', function () {
        ywPara = '1';
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });
}

function addJhbgApply() {
    selects='';
    BootstrapDialog.show({
        title: '',
        size: BootstrapDialog.SIZE_LARGE,
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/jhbggl/jhbgglAdd.jsp'),
        buttons: [
            {
                label: '确定',
                cssClass: 'btn-default btn-sm',
                action: function (dialog) {
                    selects = $("#jhbgApplyPersonInfoTable").bootstrapTable('getSelections');
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
            console.log('onshow');
        },
        onshown: function (dialogRef) {
            console.log('onshown');
        },
        onhide: function (dialogRef) {

        },
        onhidden: function (dialogRef) {
            $("#jhbgApplyPersonInfoTable").bootstrapTable("refresh");
            if(selects.length > 0){
                BootstrapDialog.show({
                    title: '变更申请',
                    size: BootstrapDialog.SIZE_WIDE,
                    closable: true,
                    draggable: true,
                    closeByBackdrop: false,
                    closeByKeyboard: false,
                    message: $('<div></div>').load('yyhpt/views/jhbggl/jhbgsqDetail.jsp'),
                    buttons: [{
                        id: 'id_apply_save',
                        label: '保存',
                        cssClass: 'btn-default btn-sm',
                        action: function (dialog) {
                            doSave_();
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
                    },
                    onshown: function (dialogRef) {
                        if (selects.length > 0) {
                            selectedRow = selects[0];
                            setGrForm(selectedRow);
                            showApplyInfo();
                        }
                    },
                    onhide: function (dialogRef) {
                    },
                    onhidden: function (dialogRef) {
                    }
                });
            }


        }
    });
}

function getRylist() {
    $.ajax({
        url: "common.do?action=getSysCzrylist",
        type: "post",
        dataType: "json",
        data: {},
        success: function (data) {
            rylist = data.czrys;
            // 初始化系统操作人员
            wn.createSelectByCZRYArray($("#djry"), rylist);
        }
    });
}

function initTable() {
    // 先销毁表格
    $('#table').bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $('#table').bootstrapTable({
        classes: 'table table-hover warning',
        method: "get", // 使用get请求到服务器获取数据
        url: "yyhptjhbggl.do?action=getJhbgLbInfo", // 获取数据的Servlet地址
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
            var param = {
                currPage: params.pageNumber,
                pageSize: params.pageSize,
                xm: $("#xm").val(),
                sfzh: $("#sfzh").val(),
                djrybm: $("#djry").val(),
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
            }, {
                field: 'XM',
                title: '姓名',
                align: 'center'
            },{
                field: 'XBMC',
                title: '性别',
                align: 'center'
            }, {
                field: 'NL',
                title: '年龄',
                align: 'center',
                visible: true
            }, {
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
            }, {
                field: 'LXDH',
                title: '联系电话',
                align: 'center'
            }, {
                field: 'JHLXS',
                title: '计划类型',
                align: 'center',
                visible: false
            }, {
                field: 'BGSQ',
                title: '变更申请',
                events: operateEvents,
                formatter: operateFormatter,
                align: 'center'
            }, {
                field: 'BGSH',
                title: '变更审核',
                events: operateEvents,
                formatter: function (value, row, index) {
                    var option = '（审核中）';
                    if (row.SHZT === '1') {
                        option = '（审核通过）';
                    } else {
                        option = '（审核不通过）';
                    }
                    if (value == '0') {
                        return '<a class="jhbglbToBgsh" href="javascript:void(0)"  > <img src="layouts/img/table/icon_del.png"> 变更审核<a/>';
                    } else {
                        if(option == '（审核不通过）'){
                            return '<a class="jhbglbToBgsh" href="javascript:void(0)"  > <img src="layouts/img/table/icon_disAgree.png"> ' + value + '<a/>';
                        }else{
                            return '<a class="jhbglbToBgsh" href="javascript:void(0)"  > <img src="layouts/img/table/icon_select.png"> ' + value + '<a/>';
                        }
                    }
                },
                align: 'center'
            }, {
                field: 'BGJL',
                title: '计划变更',
                events: operateEvents,
                formatter: function (value, row, index) {
                    if (value == '0') {
                        return '<a class="jhbglbToBgjl" href="javascript:void(0)"  > <img src="layouts/img/table/icon_del.png"> 计划变更<a/>';
                    } else {
                        return '<a class="jhbglbToBgjl" href="javascript:void(0)"  > <img src="layouts/img/table/icon_select.png"> ' + value + '<a/>';
                    }
                },
                align: 'center'
            }, {
                field: 'BGJLSQ',
                title: '记录申请',
                events: operateEvents,
                formatter: function (value, row, index) {
                    if (value == '0') {
                        return '<a class="jhbglbToBgjl" href="javascript:void(0)"  > <img src="layouts/img/table/icon_del.png"> 记录审核<a/>';
                    } else {
                        return '<a class="jhbglbToBgjl" href="javascript:void(0)"  > <img src="layouts/img/table/icon_select.png"> ' + value + '<a/>';
                    }
                },
                align: 'center',
                visible: false
            }, {
                field: 'BGJLSH',
                title: '计划审核',
                events: operateEvents,
                formatter: function (value, row, index) {
                    var option = '（审核中）';
                    if (row.JHBGJLSHZT === '1') {
                        option = '（审核通过）';
                    } else {
                        option = '（审核不通过）';
                    }
                    if (value == '0') {
                        return '<a class="jhbglbToBgjlsh" href="javascript:void(0)"  > <img src="layouts/img/table/icon_del.png"> 计划审核<a/>';
                    } else {
                        if(option == '（审核不通过）'){
                            return '<a class="jhbglbToBgjlsh" href="javascript:void(0)"  > <img src="layouts/img/table/icon_disAgree.png"> ' + value + '<a/>';
                        }else{
                            return '<a class="jhbglbToBgjlsh" href="javascript:void(0)"  > <img src="layouts/img/table/icon_select.png"> ' + value + '<a/>';
                        }
                    }
                },
                align: 'center'
            }, {
                field: 'BGJLZX',
                title: '计划执行',
                events: operateEvents,
                formatter: function (value, row, index) {
                    if (value == '0') {
                        return '<a class="jhbglbToBgjlzx" href="javascript:void(0)"  > <img src="layouts/img/table/icon_del.png"> 计划执行<a/>';
                    } else {
                        return '<a class="jhbglbToBgjlzx" href="javascript:void(0)"  > <img src="layouts/img/table/icon_select.png"> ' + value + '<a/>';
                    }
                },
                align: 'center'
            }, {
                field: 'CZ',
                title: '操作',
                align: 'center',
                events: {
                    'click .delete': function (e, value, row, index) {
                        deleteInfos(row, index);
                    }
                },
                formatter: function (value, row, index) {
                    return '<a class="delete"  href="javascript:void(0)"><img src="layouts/img/table/icon_deldata.png"></a>';
                }
            }, {
                field: 'JZDXXDZ',
                title: '居住地址',
                visible: false
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
    'click .jhbglbToBgsq': function (e, value, row, index) {
        mainSelectedRow = row;
        loadJhbgsqDetail(row, '计划变更申请', value);
    },
    'click .jhbglbToBgsh': function (e, value, row, index) {
        mainSelectedRow = row;
        loadJhbgshDetail(row, '计划变更审核', value);
    },
    'click .jhbglbToBgjl': function (e, value, row, index) {
        mainSelectedRow = row;
        loadJhbgjlDetail(row, '计划变更', value);
    },
    'click .jhbglbToBgjlsh': function (e, value, row, index) {
        mainSelectedRow = row;
        loadJhbgjlshDetail(row, '计划变更审核', value);
    },
    'click .jhbglbToBgjlzx': function (e, value, row, index) {
        mainSelectedRow = row;
        loadJhbgjlzxDetail(row, '计划变更执行', value);
    }
};

function operateFormatter(value, row, index) {
    if (value == '0') {
        return '<a class="jhbglbToBgsq" href="javascript:void(0)"  > <img src="layouts/img/table/icon_del.png"> 变更申请<a/>';
    } else {
        return '<a class="jhbglbToBgsq" href="javascript:void(0)"  > <img src="layouts/img/table/icon_select.png"> ' + value + '<a/>';
    }
}

function deleteInfos(row, index) {
    if (row.SHZT == '1') {
        wnform.toast('变更申请已经审核通过，不能删除!');
        return false;
    } else {
        BootstrapDialog.show({
            title: '提示信息',
            message: '是否删除？',
            buttons: [{
                label: '确定',
                action: function (dialog) {
                    $.ajax({
                        url: 'yyhptjhbggl.do?action=deletejhbgsq',
                        type: 'get',
                        dataType: 'json',
                        data: {
                            yngrbsh: row.YNGRBSH,
                            bgsqlsh: row.BGSQLSH
                        },
                        success: function (res) {
                            wnform.toast('删除成功!');
                            $table.bootstrapTable("refresh");
                            dialog.close();
                        }
                    });
                }
            }, {
                label: '取消',
                action: function (dialog) {
                    dialog.close();
                }
            }]
        });
    }
}

function InitSearch() {
    $("#djry").val("dlRybm");
    $("#xm").val("");
    $("#sfzh").val("");
}

function loadJhbgsqDetail(row, title, value) {
    if (row.JHLX == '2') {
        wnform.toast('临时计划不可变更!');
        return false;
    } else {
        BootstrapDialog.show({
            title: title,
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/jhbggl/jhbgsqDetail.jsp'),
            buttons: [{
                id: 'btn_save_jhbgsq',
                label: '保存',
                cssClass: 'btn-default btn-sm',
                action: function (dialogItself) {
                    saveForm.init(dialogItself, row.BGSQLSH, row.YNGRBSH, row.DJLSH, row.YJHLSH);

                    $('#defaultForm_').submit();
                }
            }, {
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
                $table.bootstrapTable("refresh");
            }

        });
    }
}

function loadJhbgshDetail(row, title, value) {
    if (row.BGSQLSH == '' || row.BGSQLSH.length == 0) {
        wnform.toast('请进行计划变更申请!');
        return false;
    } else {
        BootstrapDialog.show({
            title: title,
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/jhbggl/jhbgshDetail.jsp'),
            buttons: [{
                label: '保存',
                cssClass: 'btn-default btn-sm',
                id: 'btn_jhbgsh_save',
                action: function (dialogItself) {
                    saveForm.init(dialogItself, row.BGSQLSH, row.YNGRBSH, row.DJLSH, row.YJHLSH);
                    $('#defaultForm').submit();
                }
            }, {
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
                $table.bootstrapTable("refresh");
            }
        });
    }
}

function loadJhbgjlDetail(row, title, value) {
    if (row.BGSQLSH == '' || row.BGSQLSH.length == 0) {
        wnform.toast('请进行计划变更申请!');
        return false;
    } else if (row.SHZT != '1') {
        wnform.toast('请进行计划变更申请审核!');
        return false;
    } else {
        BootstrapDialog.show({
            title: title,
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/jhbggl/jhbgjlDetail.jsp'),
            onshow: function (dialogRef) {
            },
            onshown: function (dialogRef) {
                dialoging = dialogRef;
            },
            onhide: function (dialogRef) {
                $table.bootstrapTable("refresh");
            }
        });
    }
}

function loadJhbgjlshDetail(row, title, value) {
    if (row.BGJLLSH == '' || row.BGJLLSH.length == 0) {
        wnform.toast('请进行计划变更申请!');
        return false;
    } else if (row.SHZT != '1') {
        wnform.toast('请进行计划变更申请审核!');
        return false;
    } else {
        BootstrapDialog.show({
            title: title,
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/jhbggl/jhbgjlshDetail.jsp'),
            onshow: function (dialogRef) {
            },
            onshown: function (dialogRef) {
                dialogRefs = dialogRef;
            }
        });
    }
}

function loadJhbgjlzxDetail(row, title, value) {
    if (row.XJHLSH == '' || row.XJHLSH == null) {
        wnform.toast('请进行计划变更!');
        return false;
    } else if (row.JHBGJLSHZT != '1') {
        wnform.toast('请进行计划变更审核!');
        return false;
    } else {
        BootstrapDialog.show({
            title: '服务计划执行',
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/jhbggl/jhbgjlzxDetail.jsp'),
            onshow: function (dialogRef) {
            },
            onshown: function (dialogRef) {
                zxdialogRef = dialogRef;

                /* //绑定优惠券展示链接
                 $('#a_Coupon').on('click', function () {
                 modelFuncs_Coupon();
                 });*/
            },

            onhide: function (dialogRef) {
            },
            onhidden: function (dialogRef) {
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