var dictData;         //字典项
var dlRybm;          //登录人员编码
var ywPara = '0';       //业务参数（0 计划制定 1 计划审核 2 计划执行）
var $table = $('#table');
var dialoging = "";

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
    isMenu = false;
    // wnform.addOnresize($table,tableStaus);
    initButtons();
    getRylist();
});
function initButtons() {
    //查询按钮事件
    $('#btn_query').on('click', function () {
        ywPara = '';
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
    $('#dbgsqQuery').on('click', function () {
        ywPara = '0';
        //初始化查询条件
        InitSearch();
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        // ywPara = '';
        return false;
    });

    $('#dbgshQuery').on('click', function () {
        ywPara = '1';
        //初始化查询条件
        InitSearch();
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        // ywPara = '';
        return false;
    });

    $('#dbgjlQuery').on('click', function () {
        ywPara = '2';
        InitSearch();
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        // ywPara = '';
        return false;
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
    $('#table')
        .bootstrapTable(
            {
                classes: 'table table-hover warning',
                method: "get", // 使用get请求到服务器获取数据
                url: "yyhptjhbggl.do?action=list", // 获取数据的Servlet地址
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
                        ywPara: ywPara
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
                        align: 'center'
                    },
                    {
                        field: 'LXDH',
                        title: '联系电话',
                        align: 'center'
                    },
                    {
                        field: 'JHLXS',
                        title: '计划类型',
                        align: 'center',
                        visible: false
                    },
                    {
                        field: 'BGSQ',
                        title: '变更申请',
                        events: operateEvents,
                        formatter: operateFormatter,
                        align: 'center'
                    },
                    {
                        field: 'BGSH',
                        title: '变更审核',
                        events: operateEvents,
                        formatter: function (value, row, index) {
                            if (value == '0') {
                                return '<a class="jhbglbToBgsh" href="javascript:void(0)"  > <img src="yyhpt/pages/img/fwlb_icon_02.png"> 变更审核<a/>';
                            } else {
                                return '<a class="jhbglbToBgsh" href="javascript:void(0)"  > <img src="yyhpt/pages/img/fwlb_icon_01.png"> ' + value + '<a/>';
                            }
                        },
                        align: 'center'
                    },
                    {
                        field: 'BGJL',
                        title: '变更记录',
                        events: operateEvents,
                        formatter: function (value, row, index) {
                            if (value == '0') {
                                return '<a class="jhbglbToBgjl" href="javascript:void(0)"  > <img src="yyhpt/pages/img/fwlb_icon_02.png"> 变更记录<a/>';
                            } else {
                                return '<a class="jhbglbToBgjl" href="javascript:void(0)"  > <img src="yyhpt/pages/img/fwlb_icon_01.png"> ' + value + '<a/>';
                            }
                        },
                        align: 'center'
                    }, {
                        field: 'BGJLSH',
                        title: '记录审核',
                        events: operateEvents,
                        formatter: function (value, row, index) {
                            if (value == '0') {
                                return '<a class="jhbglbToBgjl" href="javascript:void(0)"  > <img src="yyhpt/pages/img/fwlb_icon_02.png"> 记录审核<a/>';
                            } else {
                                return '<a class="jhbglbToBgjl" href="javascript:void(0)"  > <img src="yyhpt/pages/img/fwlb_icon_01.png"> ' + value + '<a/>';
                            }
                        },
                        align: 'center',
                        visible: false
                    },

                    {
                        field: 'JZDXXDZ',
                        title: '居住地址',
                        visible: false
                    }],
                onLoadSuccess: function (data) { // 加载成功时执行
                    console.log(data);
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

window.operateEvents = {
    'click .jhbglbToBgsq': function (e, value, row, index) {
        loadJhbgsqDetail(row, '计划变更申请', value);
    },
    'click .jhbglbToBgsh': function (e, value, row, index) {
        loadJhbgshDetail(row, '计划变更审核', value);
    },
    'click .jhbglbToBgjl': function (e, value, row, index) {
        loadJhbgjlDetail(row, '计划变更记录', value);
    }
    // 'click .jhbglbToBgjl': function (e, value, row, index) {
    //     loadJhbgjlshDetail(row, '计划变更记录审核', value);
    // }
};

function operateFormatter(value, row, index) {
    if (value == '0') {
        return '<a class="jhbglbToBgsq" href="javascript:void(0)"  > <img src="yyhpt/pages/img/fwlb_icon_02.png"> 变更申请<a/>';
    } else {
        return '<a class="jhbglbToBgsq" href="javascript:void(0)"  > <img src="yyhpt/pages/img/fwlb_icon_01.png"> ' + value + '<a/>';
    }
}

GetRqNum();

initTable();

function InitSearch() {
    $("#djry").val("dlRybm");
    $("#xm").val("");
    $("#sfzh").val("");
}

function GetRqNum() {
    $.ajax({
        url: 'yyhptjhbggl.do?action=num',
        type: "get",
        dataType: "json",
        data: {},
        success: function (data) {
            console.log(data);
            var dbgsqNum = document.getElementById("dbgsqNum");
            dbgsqNum.innerText = data.WSQ;

            var dbgshNum = document.getElementById("dbgshNum");
            dbgshNum.innerText = data.YSQWSH;

            var dbgjlNum = document.getElementById("dbgjlNum");
            dbgjlNum.innerText = data.DBG;
        }
    });
}

function loadJhbgsqDetail(row, title, value) {
    if (row.JHLX == '2') {
        wnform.toast('临时计划不可变更!');
        return false;
    } else {
        BootstrapDialog.show({
            title: title,
            size: BootstrapDialog.SIZE_BIG,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/jhbggl/jhbgsqDetail.jsp'),
            buttons: [{
                label: '保存',
                cssClass: 'btn-default btn-sm',
                action: function (dialogItself) {
//					 if (checkFwDate() && checkHlqDate()) {

                    saveForm.init(dialogItself, row.BGSQLSH, row.YNGRBSH, row.DJLSH, row.YJHLSH);
                    $('#defaultForm').submit();
//					}
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
                $.ajax({
                    url: 'yyhptjhbggl.do?action=jhbgsqDetail',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        yngrbsh: row.YNGRBSH,
                        djlsh: row.DJLSH,
                        jhlsh: row.YJHLSH,
                        bgsqlsh: row.BGSQLSH
                    }
                }).done(function (datas) {
                    //页面个人基本信息赋值
                    setGrForm(datas);
                    //加载计划服务包数据
                    loadJhbgYxfwbDatas(datas.gryxfwbs);
                    //页面字典项及控件生成
                    //getRylist1();
                    loadControl(datas);
                    //页面变更申请信息模块赋值
                    initForm((datas.grjhbgsqxxs)[0]);
                }).fail(function () {
                    console.log("error");
                }).always(function () {
                    console.log("complete");
                });
            },
            onhide: function (dialogRef) {
                GetRqNum();
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
            size: BootstrapDialog.SIZE_BIG,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/jhbggl/jhbgshDetail.jsp'),
            buttons: [{
                label: '保存',
                cssClass: 'btn-default btn-sm',
                action: function (dialogItself) {
                    saveForm.init(dialogItself, row.BGSQLSH, row.YNGRBSH, row.DJLSH, row.YJHLSH);
                    $('#defaultForm').submit();
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
                $.ajax({
                    url: 'yyhptjhbggl.do?action=jhbgsqDetail',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        yngrbsh: row.YNGRBSH,
                        djlsh: row.DJLSH,
                        jhlsh: row.YJHLSH,
                        bgsqlsh: row.BGSQLSH
                    }
                }).done(function (datas) {
                    //页面个人基本信息赋值
                    setGrForm(datas);
                    //加载计划服务包数据
                    loadJhbgYxfwbDatas(datas.gryxfwbs);
                    //页面字典项及控件生成
                    //getRylist1();
                    loadControl(datas);
                    //页面变更申请信息模块赋值
                    initForm((datas.grjhbgsqxxs)[0]);
                }).fail(function () {
                    console.log("error");
                }).always(function () {
                    console.log("complete");
                });
            },
            onhide: function (dialogRef) {
                GetRqNum();
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
            size: BootstrapDialog.SIZE_BIG,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/jhbggl/jhbgjlDetail.jsp'),
// 			buttons: [{
// 				label: '保存',
// 				cssClass: 'btn-default btn-sm',
// 				action: function (dialogItself) {
// //					 if (checkFwDate() && checkHlqDate()) {
// 						 saveForm.init(dialogItself,row.BGSQLSH,row.YNGRBSH,row.DJLSH,row.YJHLSH);
// 						 $('#defaultForm').submit();
// //					}
// 				 }
// 			}, {
// 				 label: '退出', cssClass: 'btn-default btn-sm',
// 				 action: function (dialogItself) {
// 				 dialogItself.close();
// 				 }
// 			}],
            onshow: function (dialogRef) {
            },
            onshown: function (dialogRef) {
                dialoging = dialogRef;
                $.ajax({
                    url: 'yyhptjhbggl.do?action=jhbgjlDetail',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        yngrbsh: row.YNGRBSH,
                        djlsh: row.DJLSH,
                        yjhlsh: row.YJHLSH,
                        bgsqlsh: row.BGSQLSH
                    }
                }).done(function (datas) {
                    //页面个人基本信息赋值
                    bgjl_setGrForm(datas);
                    //页面字典项及控件生成
                    // bgjl_loadControl(datas);
                    //页面"医养管理等级变更"模块赋值
                    // bgjl_initForm((datas.grjhbgsqxxs)[0]);
                    //套餐页面赋值
                    // bgjl_loadJhzdFwbDatas(datas);
                }).fail(function () {
                    console.log("error");
                }).always(function () {
                    console.log("complete");
                });
            },
            onhide: function (dialogRef) {
                GetRqNum();
                $table.bootstrapTable("refresh");
            }
        });


    }

}
function loadJhbgjlshDetail(row, title, value) {
    if (row.BGSQLSH == '' || row.BGSQLSH.length == 0) {
        wnform.toast('请进行计划变更申请!');
        return false;
    } else if (row.SHZT != '1') {
        wnform.toast('请进行计划变更申请审核!');
        return false;
    } else {
        BootstrapDialog.show({
            title: title,
            size: BootstrapDialog.SIZE_BIG,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/jhbggl/jhbgjlDetail.jsp'),
// 			buttons: [{
// 				label: '保存',
// 				cssClass: 'btn-default btn-sm',
// 				action: function (dialogItself) {
// //					 if (checkFwDate() && checkHlqDate()) {
// 						 saveForm.init(dialogItself,row.BGSQLSH,row.YNGRBSH,row.DJLSH,row.YJHLSH);
// 						 $('#defaultForm').submit();
// //					}
// 				 }
// 			}, {
// 				 label: '退出', cssClass: 'btn-default btn-sm',
// 				 action: function (dialogItself) {
// 				 dialogItself.close();
// 				 }
// 			}],
            onshow: function (dialogRef) {
            },
            onshown: function (dialogRef) {
                dialoging = dialogRef;
                $.ajax({
                    url: 'yyhptjhbggl.do?action=jhbgjlDetail',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        yngrbsh: row.YNGRBSH,
                        djlsh: row.DJLSH,
                        yjhlsh: row.YJHLSH,
                        bgsqlsh: row.BGSQLSH
                    }
                }).done(function (datas) {
                    //页面个人基本信息赋值
                    bgjl_setGrForm(datas);
                    //页面字典项及控件生成
                    // bgjl_loadControl(datas);
                    //页面"医养管理等级变更"模块赋值
                    // bgjl_initForm((datas.grjhbgsqxxs)[0]);
                    //套餐页面赋值
                    // bgjl_loadJhzdFwbDatas(datas);
                }).fail(function () {
                    console.log("error");
                }).always(function () {
                    console.log("complete");
                });
            },
            onhide: function (dialogRef) {
                dialogRefss = dialogRef;
                GetRqNum();
                $table.bootstrapTable("refresh");
            }
        });


    }

}
