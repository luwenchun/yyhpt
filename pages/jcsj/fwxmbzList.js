var dictData;
var fwpclist;
var selects = [];

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
                url: "yyhptjcwhfwxmbz.do?action=list", // 获取数据的Servlet地址
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
                uniqueId: "XMDM", // 每一行的唯一标识，一般为主键列
                clickToSelect: true, // 是否启用点击选中行
                minimumCountColumns: 2, // 最少允许的列数
                responseHandler: function (res) {
                    dictData = res;
                    return res;
                },
                queryParamsType: "undefined",
                showPaginationSwitch: false,
                queryParams: function queryParams(params) { // 设置查询参数
                    var param = {
                        currPage: params.pageNumber,
                        pageSize: params.pageSize,
                        XMDM : $("#qrymc").val(),
                    };
                    return param;
                },
                columns: [
                     {
                         checkbox: true
                     },
                    {
                        title: '序号',
                        formatter: function (value, row, index) {
                            return index + 1;
                        }
                    },
                   {
                        title : '发布日期',
                        field : 'FBRQ',
                        formatter : function(value, row, index) { var
    	                    time1 = new Date(value).format("yyyy-MM-dd");
    	                    return time1; 
    	             }
                   },
                   {
                        title : '服务标准',
                        field : 'BZMS'
                   },
                   {
                        title : '机构级别',
                        field : 'JGJBDM'
                   },
                   {
                        title : '重要程度',
                        field : 'ZYCDDM'
                   },
                   {
                        title : '人员资质',
                        field : 'YYZZDM'
                   },
                   {
                        title : '费用类别',
                        field : 'FYLBDM'
                   },
                   {
                        title : '服务时间说明',
                        field : 'FWSJSM'
                   },
                   {
                        title : '备注',
                        field : 'BZ'
                   },
                   {
                        title : '审核状态',
                        field : 'SHZT',
                        width: 30,
                        align: 'center',
                        formatter: function (value, row, index) {
                            if (value == "1")
                                return "<input name='qchcek' type='checkbox' checked onclick='return false'/>";
                            else
                                return "<input name='qchcek' type='checkbox' onclick='return false'/>";
                        }
                   },
                    {
                        field: 'operate',
                        title: '操作',
                        align: 'center',
                        width: '100px',
                        events: operateEvents,
                        formatter: operateFormatter
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
 * [operateFormatter description] 操作栏格式化
 */
function operateFormatter(value, row, index) {
    return [
        '<a class="edit" href="javascript:void(0)"  data-toggle="modal" disabled title="修改">',
        '<i class="glyphicon glyphicon-edit"></i>',
        '</a>&nbsp;&nbsp;&nbsp;&nbsp;',
        '<a class="remove" href="javascript:void(0)" title="删除">',
        '<i class="glyphicon glyphicon-remove"></i>', '</a>'].join('');
}

/**
 * [operateEvents description]
 *
 * @type {Object} 格式化操作栏绑定事件
 */
window.operateEvents = {
    'click .edit': function (e, value, row, index) {
        modelFunc(row, '修改服务项目标准', 2);
    },
    'click .remove': function (e, value, row, index) {
        deleteData(row, '确认要删除该记录吗?', 2);
    }
};

// 弹出方法
modelFunc = function (row, mtitle, mflag) {
    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_WIDE,
        data: {
            'data1': dialog_data
        },
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhptjcwhfwxmbz.do?action=add'),
        buttons: [{
            label: '保存',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                saveForm.init(dialogItself, mflag);
                $('#defaultForm').submit();
            }
        }, {
            label: '取消',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],
        onshow: function (dialogRef) {
        },
        onshown: function (dialogRef) {
        	
        	if (mflag == 2) // 修改
            {
                //等待0.5s后，再执行界面赋值的方法，保证方法createSelectByFWPCArray执行完后再调setControlValue方法，否则频次无法带出来
                setTimeout(function () {
                    setControlValue(row)
                }, 500);
                ;
            }
        	
           /* $.ajax({
                url: "jkglfwpc.do?action=lists",
                type: "get",
                dataType: "json",
                data: {},
                success: function (data) {
                    fwpclist = data.fwpcs;
                    // 服务频次
                    createSelectByFWPCArray($("#pcdm"), fwpclist);
                }
            });*/

           /* $.ajax(
                {
                    url: 'common.do?action=getDistData',
                    type: 'POST',
                    dataType: 'json',
                    data: wn.distCodes(['63-0301', '63-0302', '63-0303', '63-0304'])

                }).done(function (datas) {
                setHtml(datas);
                if (mflag == 2) // 修改
                {
                    //等待0.5s后，再执行界面赋值的方法，保证方法createSelectByFWPCArray执行完后再调setControlValue方法，否则频次无法带出来
                    setTimeout(function () {
                        setControlValue(row)
                    }, 500);
                    ;
                }
            }).fail(function () {
                console.log("error");
            }).always(function () {
                console.log("complete");
            });*/


        },
        onhide: function (dialogRef) {
            $(this).removeData("bs.modal");
        },
        onhidden: function (dialogRef) {
            $(this).removeData("bs.modal");
        }
    });
}

// 弹出方法
modelFunc2 = function (row, mtitle, mflag) {
    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_WIDE,
        data: {
            'data1': dialog_data
        },
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhptjcwhfwxmbz.do?action=ywxm'),

        onshow: function (dialogRef) {
        },
        onshown: function (dialogRef) {
            $.ajax({
                url: 'common.do?action=getDistData',
                type: 'get',
                dataType: 'json',
                data: wn.distCodes(['63-0301'])

            }).done(function (datas) {
                // wn.createSelectByArray($("#ccgcmx"), datas['116']);
                if (mflag == 2) // 修改
                    setControlValue(row);
            }).fail(function () {
                // alert("error");
                console.log("error");
            }).always(function () {
                console.log("complete");
            });
        },
        onhide: function (dialogRef) {
            $(this).removeData("bs.modal");
        },
        onhidden: function (dialogRef) {
            $(this).removeData("bs.modal");
        }
    });
}

function setHtml(datas) {
/*    wn.createRadioByArray($("#yljgjbdiv"), datas['63-0301'], "yljgjb");
    wn.createRadioByArray($("#zycddiv"), datas['63-0302'], "zycd");
    wn.createRadioByArray($("#yyzzdiv"), datas['63-0303'], "yyzz");
    wn.createRadioByArray($("#fylbdiv"), datas['63-0304'], "fylb");*/

}

var tempFwxm;

// 修改弹出时赋值 table数据
function setControlValue(row) {
    wn.setformEdit(row);
    // 修改时，控制部分权限
    $("#XMDM").attr("disabled", true);

    //select2Set($("#pcdm"), row.pcdm);

    if (row.zxfs == "1") {
        $("#JKFWMX").attr("disabled", false);
        $("#CCGCMX").attr("disabled", true);
        $("#CCGCMX").val("");
    } else {
        $("#JKFWMX").attr("disabled", true);
        $("#CCGCMX").attr("disabled", false);
        $("#JKFWMX").val("");
    }
}

select2Set = function (selObject, strings) {
    var values = strings.split(',');
    values.forEach(function (e) {
        selObject.find("option[value='" + e + "']").attr("selected", true);
    });
    if (values.length > 0)
        selObject.select2();
}

// 删除消息、确认 1= 按钮多选删除 2=操作栏
deleteData = function (row, mTitle, mFlag) {
    BootstrapDialog.confirm({
        title: '提示信息',
        message: mTitle,
        type: BootstrapDialog.TYPE_WARNING,
        closable: true,
        draggable: true,
        btnCancelLabel: '否',
        btnOKLabel: '是',
        callback: function (result) {
            if (result) {
                var rows;
                if (mFlag == 2)
                    rows = row.XMDM;
                else {
                    var objects = $.map($('#table').bootstrapTable(
                        'getSelections'), function (row) {
                        return row.XMDM;
                    });
                    rows = objects.join();
                }
                $.ajax({
                    url: "yyhptjcwhfwxmbz.do?action=delete",
                    type: "get",
                    dataType: "json",
                    data: {
                        XMDM: rows
                    },
                    success: function (data) {
                        $('#table').bootstrapTable('refresh');
                    }
                });
            } else {
                return;
            }
        }
    });
}

function dataFormatter(value, row, index) {
    return "";
}



var $table = $('#table');

/**
 * 获取页面高度
 *
 */
function getHeight() {
    return $(window).height() - 150;
}

/**
 * [description] bootstrap-table 高度自适应
 */
$(window).resize(function () {
    $table.bootstrapTable('resetWidth');

    var b = jQuery(window).width();

    if (b <= 600) {
        $table.bootstrapTable("toggleView");
    }
});

var dialog_data = 'Orange';
/**
 * [description] 初始化页面 事件注册
 */
$(function () {
    /**
     * [description] 绑定点击事件
     */
    $("#add").bind("click", function () {
        modelFunc(null, '新增服务项目标准', 1);
    });

    /*
     * $("#addywxm").bind("click", function() { selectModelFunc("选择业务项目", 2);
     * });
     */
    $("#more").bind("click", function () {
        MoreBind();
    });

    $('input, textarea').placeholder();
    
    initTable();

})

/**
 * [description] 绑定移除事件
 */
$('#remove').on('click', function () {
    /**
     * [selectedRows description] bootstrap-table 获取已选择的行数
     */
    var selectedRows = $('#table').bootstrapTable('getSelections');
    if (selectedRows.length == 0) {
        /**
         * [action description] bootstrap-dialog 提示信息
         */
        BootstrapDialog.show({
            title: '提示信息',
            message: '请选择要操作的数据!',
            buttons: [{
                label: '确定',
                action: function (dialog) {
                    dialog.close();
                }
            }]
        });
        return;
    }

    deleteData(null, '确认要删除选中记录吗?', 1);

});

$(function () {

    $('#btn_query').on('click', function () {
        $table.bootstrapTable("refresh");
    });

    $('#mobile').on('click', function () {
        $table.bootstrapTable("toggleView");
    });
});

var gotoFlag = "1";

setTimeout(function () {
    $table.bootstrapTable('resetView');
}, 200);

var QueryStr = function (data) {
    switch (data) {
        case 1:
            $('#qrymc').attr("placeholder", "服务项目");
            break;
        case 2:
            $('#qrymc').attr("placeholder", "业务项目");
            break;
        default:
            $('#qrymc').placeholder("服务项目");
    }
    return false;
}

// 选择业务项目（三级页面）
selectModelFunc = function (mtitle, mflag, index) {
    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_NORMAL,
        data: {
            'data1': dialog_data
        },
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhptjcwhywxm.do?action=ywxm'),
        buttons: [{
            label: '确定',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                selects = $("#tableYwxm").bootstrapTable('getSelections');

                if (selects.length > 0) {
                    $('#ywxmmc').val(selects[0].ywxmmc);
                    $('#ywxmdm').val(selects[0].ywxmdm);
                    dialogItself.close();
                }
            }
        }, {
            label: '取消',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],
        onshow: function (dialogRef) {

        },
        onshown: function (dialogRef) {
            var tableYwxm = $("#tableYwxm");
            // 先销毁表格
            tableYwxm.bootstrapTable('destroy');
            // 初始化表格,动态从服务器加载数据
            tableYwxm.bootstrapTable({
                classes: 'table table-hover warning',
                method: "get", // 使用get请求到服务器获取数据
                url: "yyhptjcwhfwxm.do?action=ywxmsSelect", // 获取数据的Servlet地址
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
                uniqueId: "XMDM", // 每一行的唯一标识，一般为主键列
                clickToSelect: true, // 是否启用点击选中行
                minimumCountColumns: 2, // 最少允许的列数
                responseHandler: function (res) {
                    dictData = res;
                    return res;
                },
                queryParamsType: "undefined",
                showPaginationSwitch: false,
                queryParams: function queryParams(params) { // 设置查询参数
                    var param = {
                        currPage: params.pageNumber,
                        pageSize: params.pageSize,
                    };
                    return param;
                },
                columns: [{
                    radio: true
                }, {
                    title: '序号',
                    formatter: function (value, row, index) {
                        return index + 1;
                    }
                }, {
                    field: 'ywxmdm',
                    title: '业务项目代码'

                }, {
                    field: 'ywxmmc',
                    title: '业务项目名称'

                }, {
                        field: 'sjxmmc',
                        title: '上级项目名称'

                    }],
                onLoadSuccess: function () { // 加载成功时执行
                    if (this.data.length > 0) {
                        tableYwxm.bootstrapTable('check', 0);
                    }
                },
                onLoadError: function () { // 加载失败时执行
                    alert("error");

                },
                onCheck: function (row) {
                    $("#remove").attr("disabled", false);
                },
                onUncheck: function (row) {
                    // alert(row.id);
                }
            });

            // 绑定搜索按钮事件
            $('#btn_queryYwxm').on('click', function () {
                $('#tableYwxm').bootstrapTable("refresh");
            });

        },
        onhide: function (dialogRef) {
            // $(this).removeData("bs.modal");
        },
        onhidden: function (dialogRef) {
            // $(this).removeData("bs.modal");
        }
    });
};

createSelectByFWPCArray = function (selObject, array, optionname) {
    var selectBody = "<option value=''>--请选择--</option>";
    if (optionname != undefined)
        selectBody = "<option value=''>" + optionname + "</option>";
    $.each(array, function () {
        selectBody += "<option value=" + this.pcdm + ">" + this.fwpc
            + "</option>";
    });
    selObject.html(selectBody);
}

var MoreBind = function () {
    if ($('#morelist').hasClass('hidden'))
        $('#morelist').removeClass("hidden");
    else
        $('#morelist').addClass("hidden");

    return false;
}