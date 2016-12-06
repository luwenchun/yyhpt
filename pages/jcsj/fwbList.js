var dialog_data = 'Orange';
var dictData;
var tempFwxm = [];
var fwxms = [];
//用于保存
var strFwxms;
var selects = [];
var $table = $('#table');
var mobileMode = false;
var fwtcFwpc;
/**
 * [initTable description] 初始化表格
 */
function initTable() {
    var table = $('#table');
    // 先销毁表格
    table.bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    table.bootstrapTable(
        {
            classes: 'table table-hover warning',
            method: "get", // 使用get请求到服务器获取数据
            url: "yyhptjcwhfwb.do?action=list", // 获取数据的Servlet地址
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
            uniqueId: "FWBDM", // 每一行的唯一标识，一般为主键列
            clickToSelect: true, // 是否启用点击选中行
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
                    FWBMC: $("#tcmcQuery").val()
                };
                return param;
            },
            columns: [
				{
					title : '序号',
					formatter : function(value, row, index) {
						return index + 1;
					},
                    align : 'center'
				},
                {
                    field: 'FWBDM',
                    title: '服务包代码'

                },{
                    field: 'FWBMC',
                    title: '服务包名称'

                },
                {
                    field: 'XMSL',
                    title: '服务项目数量'

                },
                {
                    field: 'HJJG',
                    title: '合计价格'

                },
                 {
                    field: 'XT_XGSJ',
                    title: '更新日期',
                    align: 'center'
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
                    field: '',
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
        modelFunc(row, '修改服务包信息', 2);
    },
    'click .remove': function (e, value, row, index) {
        deleteData(row, '确认要删除该记录吗?', 2);
    }
};


// 弹出方法(二级页面)
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
        message: $('<div></div>').load('yyhptjcwhfwb.do?action=add'),
        buttons: [{
            label: '新增服务 ',
            cssClass: 'btn-default btn-sm pull-left',
            action: function (dialogItself) {
                // saveForm.init(dialogItself,mflag);
                // $('#defaultForm').submit();
                selectModelFunc("新增服务", 2);
                return false;
            }
        }, {
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
            //tempFwxm= [
            //        {xmdm: "0001", xmmc: "血糖检查", fwpc: "每月1次", fwdj: 12.50, sl: 12, fwdd: "服务地点"},
            //        {xmdm: "0002", xmmc: "眼底检查", fwpc: "每年1次", fwdj: 12.00, sl: 1, fwdd: "北京"},
            //        {xmdm: "0003", xmmc: "面对面服务", fwpc: "每年3次", fwdj: 12.11, sl: 3, fwdd: "上海"}];
        },
        onshown: function (dialogRef) {
            fwxms = [];
            tempFwxm = [];
            strFwxms = '';
            if (mflag == 2) {
                $.ajax({
                    url: 'yyhptjcwhfwb.do?action=getFwbmxDetails',//获取服务包明细
                    type: 'get',
                    dataType: 'json',
                    data: {FWBDM: row.FWBDM}

                }).done(function (datas) {
                    tempFwxm = datas.rows;
                    LoadContent(2);
                    setControlValue(row);

                }).fail(function () {
                    //alert("查询明细error");
                    console.log("error");
                }).always(function () {
                    console.log("complete");
                });
            }

            $('#btn_syrq').on('click', function () {
                crowdSelectDialog();
            });
        },
        onhide: function (dialogRef) {
            $(this).removeData("bs.modal");
            $('#table').bootstrapTable("refresh");
        },
        onhidden: function (dialogRef) {
            $(this).removeData("bs.modal");
        }
    });
};
//选择服务项目（三级页面）
selectModelFunc = function (mtitle) {
    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_NORMAL,
        // data: {
        //     'data1': dialog_data
        // },
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhptjcwhfwb.do?action=selectxm'),
        buttons: [{
            label: '确定',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                $('#detailForm').submit();
                selects = $("#tableFwxm").bootstrapTable('getSelections');
                for (var m = 0; m < fwxms.length; ++m) {
                    for (var j = 0; j < selects.length; ++j) {
                        if (fwxms[m].XMDM == selects[j].XMDM) {
                            BootstrapDialog.show({
                                title: '提示信息',
                                message: '【'+selects[j].XMMC + '】' + '已经存在！',
                                type: BootstrapDialog.TYPE_WARNING,
                                size: BootstrapDialog.SIZE_SMALL,
                                buttons: [{
                                    label: '确定',
                                    action: function (dialog) {
                                        dialog.close();
                                    }
                                }]
                            });
                            return;
                        }
                    }
                }
                for (var i = 0; i < selects.length; ++i) {
                    selects[i].SL = 1;
                    if (selects[i].SFXMDM != undefined && selects[i].SFXMDM != null && !('' == $.trim(selects[i].SFXMDM))) {
                        selects[i].FYDJ = selects[i].SFXMDM;
                    }
                    else {
                        selects[i].FYDJ = 0;
                    }
                    tempFwxm.push(selects[i]);
                }
                LoadContent(2);
                dialogItself.close();

                var obj=tempFwxm.fwxms;
                 /*var xyy={"fwmb":"0005","FWMC":"xxxx","FWDW":"xxxx"};
                 obj.push(xyy);
                 dialogItself.close();
                 LoadContent(2);*/
                //保存
            }
        },
            {
                label: '取消', cssClass: 'btn-default btn-sm',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }],
        onshow: function (dialogRef) {
            // alert('三级页面onshow');
        },
        onshown: function (dialogRef) {
            // alert('三级页面onshown');
            // 绑定搜索按钮事件
            $('#btn_fwxm_query').on('click', function () {
                $('#tableFwxm').bootstrapTable("refresh");
            });
            var tableFwxm = $("#tableFwxm");
            // 先销毁表格
            tableFwxm.bootstrapTable('destroy');
            // 初始化表格,动态从服务器加载数据
            tableFwxm.bootstrapTable(
                {
                    classes: 'table table-hover warning',
                    method: "get", // 使用get请求到服务器获取数据
                    url: "yyhptjcwhfwxm.do?action=list", // 获取数据的Servlet地址
                    contentType: "application/json",
                    iconSize: 'sm',
                    showHeader: true,
                    striped: false, // 表格显示条纹
                    pagination: true, // 启动分页
                    pageSize: 8, // 每页显示的记录数
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
                        dictData = res.dict;
                        return res;
                    },
                    queryParamsType: "undefined",
                    showPaginationSwitch: false,
                    queryParams: function queryParams(params) { // 设置查询参数
                        var param = {
                            currPage: params.pageNumber,
                            pageSize: params.pageSize,
                            XMMC: $("#fwxmmcQuery").val()
                        };
                        return param;
                    },
                    columns: [
                        {
                            checkbox: true
                        },
                        {
                            field: 'XMDM',
                            title: '项目代码'
                        },
                        {
                            field: 'XMMC',
                            title: '服务项目名称'

                        },
                        {
                            field: 'YWXMMC',
                            title: '业务项目'

                        },
                        {
                            field: 'PCMC',
                            title: '服务频次'

                        },
                        {
                            field: 'SFXMDM',
                            title: '项目单价'
                        }],
                    onLoadSuccess: function () { // 加载成功时执行
                    },
                    onLoadError: function () { // 加载失败时执行
                        alert("error");
                    },
                    onCheck: function (row) {
                        // $("#remove").attr("disabled", false);
                    },
                    onUncheck: function (row) {
                        // alert(row.id);
                    }
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


// 修改弹出时赋值 table数据
function setControlValue(row) {
	wn.setformEdit(row);
    if(row.TP){
        $.fn.fileinput("show", "uploadfiles/FWB", row.FWBDM, row.TP, "fjdzDiv", "fileDiv");
    }else{
        $.fn.fileinput("show", "uploadfiles/FWB", null, null, "fjdzDiv", "fileDiv");
    }
    $("#FWBFBT").val(row.FWBFBT);
    $("#FWBDM").attr("disabled", true);
//    inputTcdm.val(row.FWBDM);
//    $("#FWBDM").val(row.FWBDM);
//    $("#FWBMC").val(row.FWBMC);
//    $("#HJJG").val(row.HJJG);
//	console.log('弹出时row.HJJG：'+row.HJJG)
//    $("#BZ").val(row.BZ);
}

// 删除服务包、确认 1= 按钮多选删除 2=操作栏
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
                    rows = row.FWBDM;
                else {
                    var objects = $.map($('#table').bootstrapTable('getSelections'), function (row) {
                        return row.FWBDM;
                    });
                    rows = objects.join();
                }
                $.ajax({
                    url: "yyhptjcwhfwb.do?action=delete",
                    type: "get",
                    dataType: "json",
                    data: {FWBDM: rows},
                    success: function (data) {
                        if (data.code=="T"){
                            wnform.toast(data.message);
                            $table.bootstrapTable('refresh');
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
};

//删除套餐明细项目、确认 1= 按钮多选删除 2=操作栏
deleteXmData = function (index) {
    BootstrapDialog.confirm({
        title: '提示信息',
        message: "是否删除当前项目",
        type: BootstrapDialog.TYPE_WARNING,
        closable: true,
        draggable: true,
        btnCancelLabel: '否',
        btnOKLabel: '是',
        callback: function (result) {
            if (result) {
                //删除临时记录
                obj = fwxms;
                obj.splice(index, 1);
                LoadContent(2);
            } else {
                return;
            }
        }
    });
};

function dataFormatter(value, row, index) {
    return "";
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
            if (document.getElementById("fwxmmcQuery").focus()){
                $("#btn_fwxm_query").trigger("click");
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
            if (document.getElementById("fwxmmcQuery").focus()){
                $("#btn_fwxm_query").trigger("click");
            }
        }
    }
};

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
    var table = $('#table');
    var b = jQuery(window).width();
    if (b <= 600) {
        if (!mobileMode) {
            table.bootstrapTable("toggleView");
            mobileMode = true;
            console.log(mobileMode);
        }
    }
    else {
        if (mobileMode) {
            table.bootstrapTable("toggleView");
            mobileMode = false;
            console.log(mobileMode);
        }
    }
});


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

    deleteData(null, '确认要删除已选中记录吗?', 1);

});

/**
 * [description] 初始化页面 事件注册
 */

$(function () {
    // $('.datepicker').datepicker();
    $('#btn_query').on('click', function () {
        $('#table').bootstrapTable("refresh");
    });

    $('#mobile').on('click', function () {
        $table.bootstrapTable("toggleView");
    });

    $("#add").bind("click", function () {
        modelFunc(null, '新增服务包', 1);
    });

    $('input, textarea').placeholder();

    initTable();

    getDists();
});

setTimeout(function () {
    $table.bootstrapTable('resetView');
}, 200);

/**
 * 生成服务项目 iFlag=1 增加
 */
function LoadContent(iFlag) {
    //alert("LoadContent" + "  iFlag=" + iFlag);
    var str = "";
    var strHtml = "";
    if (iFlag == 1) {                     //新增
        $("#tcdetail").attr("hidden", true);
    }
    else {                                //生成串2修改
        fwxms = tempFwxm;
        //如果服务项目不为空，则不提示提醒信息
        //if (fwxms == undefined) {
        //    alert("undefined");
        //}
        if (fwxms != undefined && fwxms != null) {
            if (fwxms.length > 0) {
                $("#AddAlertDiv").attr("hidden", true);
                strFwxms = JSON.stringify(fwxms);
            }
            var k = fwxms.length;
            str = "<div class='row'>";
            strHtml = "<div class='row'>";

            for (var i = 0; i < k; ++i) {
                strHtml += createFwxmHtml(i, fwxms[i]);
            }
            str += "</div>";
            strHtml += "</div>";
        }
        $("#tcdetail").html(strHtml);
    }
    calcSum();
}
//生成服务项目
function createFwxmHtml(index, jsonFwxm) {
    var strHtml;
    if (index >= 0 && jsonFwxm != undefined && jsonFwxm != null) {
        strHtml = "  <div id='id=id_" + jsonFwxm.XMDM + "' class='col-sm-6'>"
            + "      <div class='box box-green'>"
            + "          <div class='box-header with-border border-green '>"
            + "                <h3 class='box-title'><strong>" + jsonFwxm.XMMC + "</strong></h3>"
            + "                <span class='pull-right'>" + jsonFwxm.PCMC + "</span>"
            + "           </div>"
            + "           <div class='box-body'>"
            + "                <div id='id_hjjgDisplay_" + jsonFwxm.XMDM + "' class='col-sm-7'>"
            + "                     <strong><strong></strong><i class='fa fa-rmb'></i>" + jsonFwxm.FYDJ + " x " 
            + 						jsonFwxm.SL + "次" + " = <i class='fa fa-rmb'></i>" 
            + 						(jsonFwxm.FYDJ * jsonFwxm.SL).toFixed(2) + "</strong></p>"
/*            + "                     <p><i class='fa fa-location-arrow'></i>" + jsonFwxm.FWDD + "</p>"*/
            + "                </div>"
            + "                <div class='col-sm-5'>"
            + "	                  <p>&nbsp;&nbsp;&nbsp;</p>"
            + "	                  <span class='pull-right'> <a href='javascript:modifyTimesOfService(\"" 
            + 						jsonFwxm.XMDM + '\",' + jsonFwxm.SL + ")' class='btn btn-green btn-sm'>"
            + "                      <i class='fa fa-edit'></i>编辑</a>"
            + "                      <a href='javascript:deleteXmData(\"" + index + "\")' class='btn  btn-sm'>"
            + "                      <i class='fa fa-trash'></i>删除</a>"
            + "	                  </span>"
            + "               </div>"
            + "           </div>"
            + "     </div>"
            + "   </div>";
    }
    return strHtml;
}

function calcSum() {
    var sum = 0;
    for (var k = 0; k < fwxms.length; ++k) {
        sum += fwxms[k].FYDJ * fwxms[k].SL
    }
    $("#HJJG").val(sum.toFixed(4));
}
/**
 * 编辑服务项目数量
 * @param XMDM 项目代码
 * @param SL 数量
 */

function modifyTimesOfService(XMDM, SL) {
    //获取要编辑的服务项目
    var fwxmEdit;
    for (var i = 0; i < fwxms.length; ++i) {
        if (fwxms[i].XMDM == XMDM) {
            fwxmEdit = fwxms[i];
            break;
        }
    }
    var messageString = '<label class="control-label">服务频次：</label>'
    	+'<select class="form-control select2 selector" id="id_fwpc" name="PCMC" title="服务频次" ></select>'
        + '<label class="control-label">服务数量：</label>'
        +'<input type="number" class="form-control  input-sm " MIN="1"  name="slEdit" id="slEdit" value= ' + SL + '  placeholder="数量"/>';

    BootstrapDialog.show({
        title: '编辑' + '【' + fwxmEdit.XMMC + '】',
        message: messageString,
        type: BootstrapDialog.TYPE_WARNING,
        size: BootstrapDialog.SIZE_SMALL,
        buttons: [{
            label: '确定',
            action: function (dialog) {
                //更新fwxms中的数据
                if (Math.round($("#slEdit").val()) <= 0) {
                    return;
                }
                fwxmEdit.SL = Math.round(jQuery("#slEdit").val());
                var fwpc = $('#id_fwpc').val();
                var fwpcmc = $('#id_fwpc').find("option:selected").text()
                fwxmEdit.PCDM = fwpc;
                fwxmEdit.PCMC = fwpcmc;
                //更新页面数据
                LoadContent(2);
                dialog.close();
            }
        }],
        onshown: function (dialogRef) {
            var selector = $('#id_fwpc');
            var selectData = [];
            for (var i = 0; i < fwtcFwpc.length; ++i) {
                selectData.push({id: fwtcFwpc[i].PCDM, name: fwtcFwpc[i].PCMC})
            }
            createSelectByArray($('#id_fwpc'), selectData);
            console.log(fwxmEdit.PCDM)
            
            $("#id_fwpc").find("option[value='"+ fwxmEdit.PCDM +"']").attr("selected",true);
            
            $('#id_fwpc').bind("change", function (e) {
            	console.log('change');
                for (var i = 0; i < fwtcFwpc.length; ++i) {
                    if (fwtcFwpc[i].PCDM == document.getElementById("id_fwpc").value) {
                        $("#slEdit").val(fwtcFwpc[i].ZXCS);
                        break;
                    }
                }
            })
            
           /* var selectData = [];
            for (var i = 0; i < fwtcFwpc.length; ++i) {
                selectData.push({id: fwtcFwpc[i].PCDM, text: fwtcFwpc[i].PCMC})
            }
            selector.select2({
                language: 'zh-CN',
                data: selectData,
                allowClear: true,
                multiple: false,
                maximumSelectionLength: 12,
                minimumResultsForSearch: Infinity
            });
            selector.select2("val", fwxmEdit.PCDM);
            selector.on("change", function (e) {
                for (var i = 0; i < fwtcFwpc.length; ++i) {
                    if (fwtcFwpc[i].PCDM == e.val) {
                        $("#slEdit").val(fwtcFwpc[i].ZXCS);
                        break;
                    }
                }
            })*/
        }
    });
}

createSelectByArray = function (selObject, array, optionname) {

    var selectBody = "";
    if (optionname != undefined)
        selectBody = "<option value=''>" + optionname + "</option>";
    $.each(array, function () {
        var name = this.name;
        if (name == "") {
            name = "未知";
        }
        selectBody += "<option value=" + this.id + ">" + name + "</option>";
    });
    selObject.html(selectBody);
}

function getDists() {
    $.ajax({
        url: "yyhptjcwhfwb.do?action=fwpclist",
        type: "get",
        dataType: "json",
        data: {},
        success: function (datas) {
            fwtcFwpc = datas.dict;
        }
    });
}