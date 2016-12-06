var dictData;         //字典项
var dlRybm;           //登录人员编码
var ywPara;           //业务参数（0 服务登记 1 服务评价 2 服务回访）
var sJalx;            //结案类型（0 正常 1 中止 2 结案）

var sfFwdj;           //是否服务登记（0 否 1是）
var sfFwpj;           //是否服务评价（0 否 1是）
var sfFwhf;			  //是否服务回访（0 否 1是）

var searchStr = location.search;
ywPara = searchStr.substr(searchStr.indexOf('&') + 8, 8);

if (ywPara == '=init')
    ywPara = '0';

var dialogModel;      //弹出窗体
var sRwdxlsh;         //任务对象流水号
var zrrPara;          //责任人参数
var rylist;           //当前机构人员
var sRwdxxm;          //任务对象姓名
var sHfzt;            //回访状态
var sDlryxm;          //登录人员姓名
var yylsh;			  //预约流水号
var rwdxlsh;		  //任务对象流水号
var yngrbsh;		  //域内个人标识号
var row;
var editRow;
var yyddqt_show = '';	//存储预约地点其他
var fwyyFlag = '0';   //服务预约编辑标志[0：新增；1：修改]
var jzdz = '';//居住地址
var hjdz = '';//户籍地址

/*
 * 获取全部人员
 */
function getRylist() {
    $.ajax({
        url: "common.do?action=getYhrylist", //getSysCzrylist改为获取医护人员中的护士（及本人）
        type: "post",
        dataType: "json",
        success: function (data) {
            rylist = data.yhrys;
            //初始化签约人员
            //wn.createSelectByCZRYArray($("#zrr"), rylist);
            dlRybm = data.rybm;
            sDlryxm = data.ryxm;
            $("#zrr").val(dlRybm);
        }
    });
}
getRylist();

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
                url: "yyhptRwglFwgl.do?action=list", // 获取数据的Servlet地址
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
                uniqueId: "RWDXLSH", // 每一行的唯一标识，一般为主键列
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
                        sfzh: $("#sfzh").val(),
                        zrrbm: zrrPara,
                        ywPara: ywPara,
                        hfzt: $("#hfzt").val(),
                        djzt: $("#djzt").val(),
                        pjzt: $("#pjzt").val()
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
                    }, {
                        field: 'XBMC',
                        title: '性别',
                        align: 'center'
                    }, {
                        field: 'NL',
                        title: '年龄',
                        align: 'center'
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
                        field: 'LXDH',
                        title: '联系电话',
                        align: 'center'
                    },
                    {
                        field: 'QSRQ',
                        title: '起始日期',
                        align: 'center',
                        //width:100,
                    },
                    {
                        field: 'DQRQ',
                        title: '到期日期',
                        align: 'center',
                        //width:100,
                    },
                    {
                        field: 'FWYY',
                        title: '服务预约',
                        align: 'center',
                        events: operateEvents,
                        formatter: function (value, row, index) {
                            if (value == '0') {
                                return '<a class="fwlbToFwyy" href="javascript:void(0)"><img src="layouts/img/table/icon_del.png">服务预约</a>';
                            } else {
                                return '<a class="fwlbToFwyy" href="javascript:void(0)"><img src="layouts/img/table/icon_select.png">' + value + '</a>';
                            }
                        },
                        //width:115,
                    },
                    {
                        field: 'FWDJ',
                        title: '服务登记',
                        events: operateEvents,
                        formatter: operateFormatter,
                        align: 'center',
                        //width:115,
                    },
                    {
                        field: 'FWPJ',
                        title: '服务评价',
                        events: operateEvents,
                        formatter: function (value, row, index) {
                            if (value == '0') {
                                return '<a class="fwlbToFwpj" href="javascript:void(0)"><img src="layouts/img/table/icon_del.png">服务评价</a>';
                            } else {
                                return '<a class="fwlbToFwpj" href="javascript:void(0)"><img src="layouts/img/table/icon_select.png">' + value + '</a>';
                            }
                        },
                        align: 'center',
                        //width:115,
                    },
                    {
                        field: 'FWHF',
                        title: '服务回访',
                        events: operateEvents,
                        formatter: function (value, row, index) {
                            if (value == '0') {
                                return '<a class="fwlbToFwhf" href="javascript:void(0)"><img src="layouts/img/table/icon_del.png">服务回访<a/>';
                            } else {
                                return '<a class="fwlbToFwhf" href="javascript:void(0)"><img src="layouts/img/table/icon_select.png">' + value + '<a/>';
                            }
                        },
                        align: 'center',
                        //width:115,
                    }, {
                        field: 'JZDZ',
                        title: '居住地址'
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

/**
 * [operateEvents description]
 *
 * @type {Object} 格式化操作栏绑定事件
 */
window.operateEvents = {
    'click .fwlbToFwdj': function (e, value, row, index) {
        modelFunc(row, '服务登记');
    },

    'click .fwlbToFwpj': function (e, value, row, index) {
        if (row.FWDJ != '0') {
            FwpjFunc(row, '服务评价');
        } else {
            wnform.toast('请先进行服务登记!');
        }
    },

    'click .fwlbToFwhf': function (e, value, row, index) {
        if (row.FWDJ != '0') {
            FwhfFunc(row, '服务回访');
        } else {
            wnform.toast('请先进行服务登记!');
        }
    },
    'click .fwlbToFwyy': function (e, value, row, index) {
        console.log('value:' + value);
        FwyyFunc(row, '服务预约', value);
    }
};

function operateFormatter(value, row, index) {
    //return '<a class="homeToJkpg" href="loginUpgrade.do?action=success#./jkglzkpggr.do?action=init"  >'+value+'<a/>';

    if (value == '0') {
        return '<a class="fwlbToFwdj" href="javascript:void(0)"><img src="layouts/img/table/icon_del.png">服务登记</a>';
    } else {
        return '<a class="fwlbToFwdj" href="javascript:void(0)"><img src="layouts/img/table/icon_select.png">' + value + '</a>';
    }
}

//弹出二级页面-服务登记
modelFunc = function (row, mtitle, mflag) {
    sRwdxlsh = row.RWDXLSH;
    sJalx = row.JALX;
    //获取是否已做服务评价或服务回访
    sfFwpj = row.FWPJ;
    sfFwhf = row.FWHF;
    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_WIDE,
        cssClass: 'dialog-bg-color dialog-footer-space',
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/rwgl/fwglFwdjHY.jsp'),
        buttons: [{
            label: '保存',
            cssClass: 'btn-default btn-sm fwglFwdjSaveBtn',
            action: function (dialogItself) {

            }
        }, {
            label: '取消',
            cssClass: 'btn-default btn-sm fwglFwdjExistBtn',
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

var fwscFlag = false;

//弹出二级页面-服务评价
FwpjFunc = function (row, mtitle, mflag) {
    sRwdxlsh = row.RWDXLSH;
    sRwdxxm = row.XM;
    //结案类型是中止 则设置按钮不可用
    sJalx = row.JALX;
    sfFwpj = row.FWPJ;
    sfFwhf = row.FWHF;
    console.log('row*****');
    console.log(row);

    getFwsc();

    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_WIDE,
        cssClass: 'dialog-bg-color dialog-footer-space',
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhptRwglFwgl.do?action=fwpjInit'),
        buttons: [{
            label: '保存',
            id: 'btn_Save',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                saveFwpjForm();
            }
        }, {
            label: '退出',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                fwscFlag = false;
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

function getFwsc() {
    $.ajax({
        url: "yyhptRwglFwgl.do?action=fwpjFwxmmx",
        type: "post",
        dataType: "json",
        data: {rwdxlsh: sRwdxlsh},
        success: function (data) {
            console.log('data');
            console.log(data);
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    if (fwscFlag == true) {
                        break;
                    }
                    if (data.rows[i].FWSC == 0) {
                        fwscFlag = false;
                    } else {
                        fwscFlag = true;
                    }
                }
            }
        }
    });
}

//弹出二级页面-服务回访
FwhfFunc = function (row, mtitle, mflag) {
    sRwdxlsh = row.RWDXLSH;
    sRwdxxm = row.XM;
    //结案类型是中止 则设置按钮不可用
    sJalx = row.JALX;

    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_WIDE,
        cssClass: 'dialog-bg-color dialog-footer-space',
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhptRwglFwgl.do?action=fwhfInit'),
        buttons: [{
            label: '保存',
            cssClass: 'btn-default btn-sm',
            id: 'btn_Save',
            action: function (dialogItself) {
                saveFwhfForm();
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

//弹出二级页面-服务预约
FwyyFunc = function (row, mtitle, value) {
    sRwdxlsh = row.RWDXLSH;
    sRwdxxm = row.XM;

    //结案类型是中止 则设置按钮不可用
    sJalx = row.JALX;
    //获取是否已做服务登记
    sfFwdj = row.FWDJ;

    this.row = row;

    yngrbsh = row.YNGRBSH.toString();
    rwdxlsh = row.RWDXLSH.toString();
    yylsh = row.YYLSH.toString();

    editRow = row;

    jzdz = row.JZDZ;
    hjdz = row.HJDXXDZ;

    fwyyFlag = value;
    console.log('FwyyFunc===value:' + value)
    console.log(fwyyFlag)

    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_WIDE,
        cssClass: 'dialog-bg-color dialog-footer-space',
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/rwgl/fwglFwyy.jsp'),
        buttons: [{
            label: '保存',
            cssClass: 'btn-default btn-sm',
            id: 'btn_Save',
            action: function (dialogItself) {
                dosave(dialogItself, editRow);

                /*				 saveFwyyForm.init(dialogItself,editRow);
                 $('#defaultForm').submit();*/
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
//获取标题中的人群数目
GetRqNum();
/**
 *  初始化表格
 */
initTable();

var $table = $('#table');

//手机上显示卡片模式
wnform.addOnresize($table, tableStaus);


/**
 * 获取查询参数
 *
 */
function getPara(params) {
    if ($("#zrr").val() == null) {
        zrrPara = "DLRYBM";
    } else {
        zrrPara = $("#zrr").val();
    }

    //sHfzt = $('#more_search_div input[name="rdHfzt"]:checked').val();

    /*if(ywPara=='2'){
     sHfzt = $('#more_search_div input[name="rdHfzt"]:checked').val();
     }else{
     sHfzt = '';
     }*/
}

/**
 * 获取页面高度
 *
 */
function getHeight() {
    return $(window).height() - 150;
}

/**
 * [description] 初始化页面 事件注册
 */
$(function () {
    //wnform.addOnresize($table,tableStaus);
    //查询
    $('#btn_query').on('click', function () {
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });
    //更多
    $('#more').on('click', function () {
        var bHidden = $("#more_search_div").is(":hidden");
        //if(ywPara=='2'){
        if (bHidden) {
            $('#more_search_div').css("display", "block");
        } else {
            $('#more_search_div').css("display", "none");
        }
        //}
        return false;
    });

    /**
     * 绑定标题单击事件
     */
    $('#fwdjQuery').on('click', function () {
        ywPara = '0';
        //初始化查询条件
        InitSearch();
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });

    $('#fwpjQuery').on('click', function () {
        ywPara = '1';
        InitSearch();
        //查询是否评价都是在已登记基础上
        $("#djzt").val("1");
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });

    $('#fwhfQuery').on('click', function () {
        ywPara = '2';
        InitSearch();
        //查询是否回访都是在已登记基础上
        $("#djzt").val("1");
        $table.bootstrapTable("selectPage", 1);
        $table.bootstrapTable("refresh");
        return false;
    });

    //导出
    $('#export').on('click', function () {
        $table.tableExport({type: 'excel', escape: 'false'});
        return false;
    });
});


setTimeout(function () {
    $table.bootstrapTable('resetView');
}, 200);

//初始化查询条件
function InitSearch() {
    $("#zrr").val(dlRybm);
    $("#xmSearch").val("");
    $("#sfzh").val("");
    //$("#more_search_div input[name=rdHfzt]")[0].checked=true;
    $('#more_search_div').css("display", "none");
    $("#djzt").val("");
    $("#pjzt").val("");
    $("#hfzt").val("");
}

function GetRqNum() {
    $.ajax({
        url: 'yyhptRwglFwgl.do?action=num',
        type: "get",
        dataType: "json",
        data: {},
        success: function (data) {
            console.log(data);


            var fwdjWdjNum = document.getElementById("fwdjWdjNum");
            fwdjWdjNum.innerText = data.WDJ;//未登记

            var fwdjYdjNum = document.getElementById("fwdjYdjNum");
            fwdjYdjNum.innerText = data.YDJ;//已登记

            var fwpjWpjNum = document.getElementById("fwpjWpjNum");
            fwpjWpjNum.innerText = data.WPJ;//未评价
            var fwpjYpjNum = document.getElementById("fwpjYpjNum");
            fwpjYpjNum.innerText = data.YPJ;//已评价

            var fwhfWhfNum = document.getElementById("fwhfWhfNum");
            fwhfWhfNum.innerText = data.WHF;//未回访

            var fwhfYhfNum = document.getElementById("fwhfYhfNum");
            fwhfYhfNum.innerText = data.YHF;//已回访
        }
    });
}





