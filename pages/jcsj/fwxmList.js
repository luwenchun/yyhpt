var dictsetData;
var $table = $('#table');
var fwpclist;
var selects = [];
var editRow = '';
var flag = 0;
var selectYYhc = new Array();
var xmdm;
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
                url: "yyhptjcwhfwxm.do?action=list", // 获取数据的Servlet地址
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
                        XMMC: $("#qrymc").val(),
                    };
                    return param;
                },
                columns: [
					{
						title : '序号',
						formatter : function(value, row, index) {
							return index + 1;
						}
					},
                    {
                        field: 'XMMC',
                        title: '服务项目名称'

                    },
                    {
                        field: 'XMDM',
                        title: '项目代码',
                    },
                    {
                        field: 'YWXMMC',
                        title: '业务项目',
                    },
                    {
                        field: 'PCMC',
                        title: '服务频次',
                    },
                    {
                        field: "XT_XGSJ",
                        title: '更新时间',
	                    /*formatter : function(value, row, index) {
	                    var time1 = value.substr(0 ,10) 
	                    return time1; 
	                    }*/
                    },
                    {
                        field: 'QYBZ',
                        title: '启用标志',
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

/**
 * [operateEvents description]
 *
 * @type {Object} 格式化操作栏绑定事件
 */
window.operateEvents = {
    'click .edit': function (e, value, row, index) {
        modelFunc(row, '修改服务项目', 2);
    },
    'click .remove': function (e, value, row, index) {
        deleteData(row, '确认要删除该记录吗?', 2);
    },
    'click .xmhcdzremove': function (e, value, row, index) {
        $('#yyhclist').bootstrapTable('removeByUniqueId',row.DM);
        var tabledata = $('#yyhclist').bootstrapTable('getData');
        $('#yyhclist').bootstrapTable('resetView', {height: setTableHeight(tabledata)})
    }
};

function initButtons() {
		var jgjb = [{'id':'01','name':'一级医院'},
		            {'id':'02','name':'二级医院'},
		            {'id':'03','name':'三级医院'}]
		wn.createSelectByArray($('#JGJBDM'),jgjb);
		
		var zycd = [{'id':'01','name':'非常重要'},
		            {'id':'02','name':'重要'},
		            {'id':'03','name':'一般'},
		            {'id':'04','name':'不重要'}]
		wn.createSelectByArray($('#ZYCDDM'),zycd);
		var ryzzdm = [{'id':'1','name':'家庭医生'},
		              {'id':'2','name':'公卫医生'},
		              {'id':'3','name':'护士'},
		              {'id':'4','name':'乡村医生'},
		              {'id':'5','name':'助理'},
		              {'id':'6','name':'外包工作者'},
		              ]
		wn.createChkWidthByArray($("#yyzzdiv"), ryzzdm, "YYZZMC", "YYZZDM", "2");
		var arr = [{'id':'0','name':'收费'},{'id':'1','name':'不收费'}];
		wn.createRadioByArray($("#fylbdiv"), arr, "FYLB");
	}

// 弹出方法
modelFunc = function (row, mtitle, mflag) {
    editRow = row;
    flag = mflag;
    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_WIDE,
        data: {
            'data1': dialog_data
        },
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhptjcwhfwxm.do?action=add'),
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
            //修改时初始化项目耗材对照表格
            initXmhcdzTable(flag);
        },
        onhide: function (dialogRef) {
            $(this).removeData("bs.modal");
            selectYYhc = [];
        },
        onhidden: function (dialogRef) {
            $(this).removeData("bs.modal");
        }
    });
}


// 弹出方法
modelFunc2 = function (row, mtitle, mflag) {
	editRow = row;
    flag = mflag;
    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_WIDE,
        data: {
            'data1': dialog_data
        },
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhptjcwhfwxm.do?action=ywxm'),

        onshow: function (dialogRef) {
        },
        onshown: function (dialogRef) {
        },
        onhide: function (dialogRef) {
            $(this).removeData("bs.modal");
        },
        onhidden: function (dialogRef) {
            $(this).removeData("bs.modal");
        }
    });
}

var tempFwxm;

// 修改弹出时赋值 table数据
function setControlValue(row) {
    setformEdit(row);
    // 修改时，控制部分权限
    $("#XMDM").attr("disabled", true);
    //select2Set($("#pcdm"), row.pcdm);
}

setformEdit = function (objects) {
    $.each(objects, function (k, v) {
        if ($('#' + k).length > 0) { // 如果存在控件
            var type = $('#' + k).attr("type");
            if (type == 'text') // text框
            {
                $('#' + k).val(v);
            } else if ($('#' + k).is('p')){
            	$('#' + k).text(v);
            }else if ($('#' + k).is('span')){
            	$('#' + k).html(v);
            } else if (type == undefined) {
                var tagname = $('#' + k).get(0).tagName.toLowerCase();
                if (v != undefined && v != null && v != '' && v != 'null') {
                	if (tagname == "select") {
                		wn.select2Set($('#' + k), v);
                	} else if (tagname == "textarea") {
                		$('#' + k).val(v);
                	}
				}
            } else if (type == 'checkbox') {
                if ($('#' + k).attr("name") == k) { // 普通单个checkbox，设id
                    if ($('#' + k).val() == v)
                        $('#' + k).attr("checked", "checked");
                    else
                        $('#' + k).attr("checked", false);
                } else { // checkbox多选，id不等于name
                    // alert(k+';'+v);
                	if (v != undefined && v != null && v != '' && v != 'null') {
                		wn.checkboxSet2(k, v);
                	}
                }
            }

        } else {
            /*
             * $("input[name='"+k+"']").each(function() { alert('3333333'+k); //
             * alert($(this).val()); if ($(this).val() == v) {
             * $(this).attr("checked", "checked"); return false; } });
             */

            wn.checkboxSet(k, v); // 检查未设id的checkbox，注意不设id
        }
    });
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
                    url: "yyhptjcwhfwxm.do?action=delete",
                    type: "get",
                    dataType: "json",
                    data: {
                        XMDM: rows
                    },
                    success: function (data) {
                        if (data.code=="T"){
                            wnform.toast(data.message);
                            $('#table').bootstrapTable('refresh');
                        } else {
                            wnform.toast(data.message);
                        }
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
        modelFunc(null, '新增服务项目信息', 1);
    });

    
     $("#addywxm").bind("click", function() { selectModelFunc("选择业务项目", 2);
    });
     
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
    Math.power;
    
    if (Math.power == null) {
            // 此判断非常重要，如果Math.power 已经在别的地方定义过了，再次这样重新定义，会导致循环引用，从而引发
            // Uncaught RangeError: Maximum call stack size exceeded 错误
        Math.power = Math.pow;
     
        Math.pow = function(x, y) {
            if(x != 0) {
                return Math.pow(x, y);
            } else {
                return 0;
            }
        }
    }
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
        message: $('<div></div>').load('yyhptjcwhfwxm.do?action=ywxm'),
        buttons: [{
            label: '确定',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                selects = $("#tableYwxm").bootstrapTable('getSelections');
                if (selects.length > 0) {
                    $('#YWXMMC').val(selects[0].YWXMMC);
                    $('#YWXMDM').val(selects[0].YWXMDM);
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
                        YWXMMC: $("#ywxmmcQuery").val()
                    };
                    return param;
                },
                columns: [
                    {
                        radio: true
                    },
                    {
                        title: '序号',
                        formatter: function (value, row, index) {
                            return index + 1},
                        align : "center"
                    },
                    {
                        field: 'YWXMDM',
                        title: '业务项目代码'
                    },
                    {
                        field: 'YWXMMC',
                        title: '业务项目名称'
                    },
                    {
                        field: 'SJXMMC',
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

//选择医用耗材(三级页面)
selectYyhcFunc = function (mtitle, mflag, index) {
    var yyhcList =getYycTableVal();
    if(yyhcList != null && yyhcList.length > 0){
        for(var i=0; i<yyhcList.length; i++){
            var obj = new Object();
            obj.DM = yyhcList[i].HCDM;
            obj.MC = yyhcList[i].HCMC;
            obj.DW = yyhcList[i].HCDW;
            selectYYhc.push(obj);
        }
    }
    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_NORMAL,
        data: {},
        closable: true,
        draggable: true,
        closeByBackDrop: false,
        closeByKeyBoard: false,
        message: $('<div></div>').load('yyhpt_xmhcdz.do?action=xmhcdz'),
        buttons: [{
            label: '确定',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                fillXmdzhcTable();
                dialogItself.close();
            }
        },{
            label: '取消',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],
        onshow: function (dialogRef) {

        },
        onshown: function (dislogRef) {
            // 先销毁表格
            $('#yyhctable').bootstrapTable('destroy');

            // 初始化表格,动态从服务器加载数据
            $('#yyhctable').bootstrapTable(
                {
                    classes: 'table table-hover warning',
                    method: "get", // 使用get请求到服务器获取数据
                    url: "yyhpt_yyhc.do?action=list", // 获取数据的Servlet地址
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
                    uniqueId: "DM", // 每一行的唯一标识，一般为主键列
                    clickToSelect: true, // 是否启用点击选中行
                    minimumCountColumns: 2, // 最少允许的列数
                    responseHandler: function (res) {
                        dictData = res;
                        return res;
                    },
                    queryParamsType: "undefined",
                    showPaginationSwitch: false,
                    queryParams: function queryParams(params) {
                        var param = {
                            currPage: params.pageNumber,
                            pageSize: params.pageSize,
                            MC: $('#mcQuery').val()
                        };
                        return param;
                    },
                    columns:[
                        {
                            checkbox: true
                        }/*,{
                            title: "序号",
                            formatter: function (value, row, index) {
                                return index + 1;
                            },
                            align: "center"
                        }*/,{
                            field: 'MC',
                            title: '耗材名称'
                        }, {
                            field: 'DM',
                            title: '耗材代码'
                        }, {
                            field: 'DW',
                            title: '单位'
                        }, /*{
                            field: 'GG',
                            title: '规格'
                        }, */{
                            field: 'BZ',
                            title: '备注'
                        }
                    ],
                    onLoadSuccess: function () {
                        if(selectYYhc != null && selectYYhc.length > 0 && this.data.length > 0){
                            var datas = this.data;
                            for(var i=0;i<datas.length;i++) {
                                var dm = datas[i].DM;
                                for (var j = 0; j < selectYYhc.length; j++) {
                                    if(selectYYhc[j].DM == dm){
                                        $('#yyhctable').bootstrapTable('check',i);
                                        break;
                                    }
                                }
                            }
                        }
                    },
                    onLoadError: function () {

                    },
                    onCheck: function (row) {
                        if(selectYYhc != null && selectYYhc.length > 0){
                            var contain = false;
                            for(var i=0;i<selectYYhc.length;i++){
                                if(row.DM == selectYYhc[i].DM) {
                                    contain = true;
                                    break;
                                }
                            }
                            if(!contain){
                                selectYYhc.push(row);
                            }
                        }else if(selectYYhc.length == 0){
                            selectYYhc.push(row);
                        }
                    },
                    onUncheck: function (row) {
                        if(selectYYhc != null && selectYYhc.length > 0){
                            for(var i=0; i<selectYYhc.length; i++){
                                var yyhc = selectYYhc[i];
                                if(yyhc.DM != null && yyhc.DM !="null" && yyhc.DM == row.DM){
                                    selectYYhc.remove(i);
                                }
                            }
                        }
                    },
                    onCheckAll: function (rows) {
                        if(rows != null && rows.length > 0 && selectYYhc != null){
                            for(var i=0;i<rows.length;i++){
                                var contain = false;
                                for(var j=0;j<selectYYhc.length;j++){
                                    if(rows[i].DM == selectYYhc[j].DM) {
                                        contain = true;
                                        break;
                                    }
                                }
                                if(!contain){
                                    selectYYhc.push(rows[i]);
                                }
                            }
                        }
                    },
                    onUncheckAll: function (rows) {
                        if(rows != null && rows.length > 0 && selectYYhc != null && selectYYhc.length > 0){
                            for(var i=0;i<rows.length;i++){
                                for(var j=0;j<selectYYhc.length;j++){
                                    if(rows[i].DM == selectYYhc[j].DM) {
                                        selectYYhc.remove(j);
                                        break;
                                    }
                                }
                            }
                        }
                    },
                    onPageChange: function (num, size) {

                    }

                }
            );
            // 绑定搜索按钮事件
            $('#btn_queryYyhc').on('click', function () {
                $('#yyhctable').bootstrapTable("refresh");
            });

        },
        onhide: function (dialogRef) {
            // $(this).removeData("bs.modal");
            selectYYhc = [];
        },
        onhidden: function (dialogRef) {
            // $(this).removeData("bs.modal");
        }
    });
}

createSelectByFWPCArray = function (selObject, array, optionname) {
    var selectBody = "<option value=''>--请选择--</option>";
    if (optionname != undefined)
        selectBody = "<option value=''>" + optionname + "</option>";
    $.each(array, function () {
        selectBody += "<option value=" + this.PCDM + ">" + this.PCMC
            + "</option>";
    });
    selObject.html(selectBody);
}

function dataFormatter(value, row, index) {
	return "";
}

var MoreBind = function () {
    if ($('#morelist').hasClass('hidden'))
        $('#morelist').removeClass("hidden");
    else
        $('#morelist').addClass("hidden");

    return false;
}

Array.prototype.remove=function(dx)
{
    if(isNaN(dx)||dx>this.length){return false;}
    for(var i=0,n=0;i<this.length;i++)
    {
        if(this[i]!=this[dx])
        {
            this[n++]=this[i]
        }
    }
    this.length-=1
}

//从弹出的耗材列表窗口获得数据 并附加在项目耗材对照表格后
fillXmdzhcTable = function () {
    if(selectYYhc != null && selectYYhc.length > 0){
        if($('#yyhcdiv').is(':hidden')){
            $('#yyhcdiv').show();
            $('#yyhcdiv').addClass('col-md-8');
        }
        $('#yyhclist').bootstrapTable('destroy');

        $('#yyhclist').bootstrapTable({
            data: selectYYhc,
            classes: 'table table-hover warning',
            iconSize: 'sm',
            showHeader: true,
            height: setTableHeight(selectYYhc),
            striped: true, // 表格显示条纹
            search: false, // 是否启用查询
            showColumns: false, // 显示下拉框勾选要显示的列
            showRefresh: false, // 显示刷新按钮
            onlyInfoPagination: false,
            uniqueId: "DM", // 每一行的唯一标识，一般为主键列
            clickToSelect: true, // 是否启用点击选中行
            minimumCountColumns: 2, // 最少允许的列数
            queryParamsType: "undefined",
            columns:[
                {
                    title: "序号",
                    formatter: function (value, row, index) {
                        return index + 1;
                    },
                    align: "center"
                },{
                    field: 'MC',
                    title: '耗材名称'
                }, {
                    field: 'DM',
                    title: '耗材代码'
                }, {
                    field: 'DW',
                    title: '单位'
                },/* {
                    field: 'GG',
                    title: '规格'
                }, */{
                 field: 'BZ',
                 title: '备注'
                 },{
                    title: '操作',
                    align: 'center',
                    width: '50px',
                    events: operateEvents,
                    formatter: xmhcdzOperateFormatter
                }
            ]
        });
        selectYYhc = [];
    } else if(selectYYhc.length <= 0) {
        $('#yyhclist').bootstrapTable('removeAll');
        $('#yyhclist').bootstrapTable('resetView', {'height': setTableHeight(selectYYhc)});
    }
}

//增加项目耗材对照
function insertOrUpdateXmhcdz(data, flag) {
    if(data != null && data != '') {
        var yyhc = JSON.stringify(data);
        var url = "yyhpt_xmhcdz.do?action=insert";
        if(flag == 2){
            url = "yyhpt_xmhcdz.do?action=update";
        }
        $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            data: {
                YYHC : yyhc,
                XMDM : $('#XMDM').val()
            },
            success: function (val) {
                if (val.code == "T") {
                   // wnform.toast(data.message);
                } else {
                    wnform.toast(val.message);
                }
            }
        });
    }
}

//修改操作时更新项目耗材对照
initXmhcdzTable = function (flag) {
    if(flag == 2){
        $.ajax({
            url: 'yyhpt_xmhcdz.do?action=list',
            type: 'POST',
            dataType: 'json',
            data: {
                XMDM: $('#XMDM').val()
            },
            success: function (data) {
                if(data != null && data.rows != null){
                    selectYYhc = data.rows;
                    fillXmdzhcTable();
                }else{
                    wnform.toast('获取项目耗材对照失败!');
                    return;
                }
            }
        })
    }
}


/**
 * [operateFormatter description] 操作栏格式化
 */
function xmhcdzOperateFormatter(value, row, index) {
    return [
        '<a class="xmhcdzremove" href="javascript:void(0)" title="删除">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</a>'].join('');
}

//获取耗材表格数据
function getYycTableVal() {
    var xmdm = $('#XMDM').val();
    var xmmc = $('#XMMC').val();
    var yyhcList = [];
    var tabledata = $('#yyhclist').bootstrapTable('getData');
    for (var i=0; i<tabledata.length;i++){
        if(tabledata[i] ==null || tabledata[i].DM == null || tabledata[i].DM == 'null'){
            break;
        }
        var yyhc = new Object();
        yyhc.HCMC = tabledata[i].MC;
        yyhc.HCDM = tabledata[i].DM;
        yyhc.HCDW = tabledata[i].DW;
        yyhc.XMMC = xmmc;
        yyhc.XMDM = xmdm;
        yyhcList.push(yyhc);
    }
    return yyhcList;
}

//表格高度固定
function setTableHeight(array) {
    return array.length * 31 + 34 >= 125 ? 129 : array.length * 31 + 34;
}
