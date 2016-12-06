var dictData;
var $table = $('#table');
var gotoFlag = "1";
var arrayDatas;
var ywlbData='01';

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
						classes : 'table table-hover warning',
						method : "get", // 使用get请求到服务器获取数据
						url : "yyhptjcwhglfl.do?action=list", // 获取数据的Servlet地址
						contentType : "json",
						iconSize : 'sm',
						showHeader : true,
						striped : true, // 表格显示条纹
						pagination : true, // 启动分页
						pageSize : 10, // 每页显示的记录数
						pageNumber : 1, // 当前第几页
						pageList : [ 2 ], // 记录数可选列表
						search : false, // 是否启用查询
						showColumns : false, // 显示下拉框勾选要显示的列
						showRefresh : false, // 显示刷新按钮
						onlyInfoPagination : false,
						sidePagination : "server", // 表示服务端请求
						uniqueId : "RQDM", // 每一行的唯一标识，一般为主键列
						clickToSelect : false, // 是否启用点击选中行
						minimumCountColumns : 2, // 最少允许的列数
						responseHandler : function(res) {
							dictData = res;
							return res;
						},
						queryParamsType : "undefined",
						showPaginationSwitch : false,
						queryParams : function queryParams(params) { // 设置查询参数
							var param = {
								currPage : params.pageNumber,
								pageSize : params.pageSize,
								RQMC : $("#qrymc").val(),
							};
							return param;
						},
						columns : [
								{
									title : '序号',
									formatter : function(value, row, index) {
										return index + 1;
									},
									align : 'center'
								},
								{
									title : '管理项目代码',
									field : 'RQDM'
								},
								{
									title : '管理项目名称',
									field : 'RQMC'
								},
								{
									title : '管理等级代码',
									field : 'RQLBDM'
								},
								{
									title : '管理等级名称',
									field : 'RQLBMC'
								},
								{
									title : '管理项目说明',
									field : 'RQSM'
								},
								{
									title : '业务类别代码',
									field : 'YWLBDM'
								},
								{
									title : '业务查询语句',
									field : 'YWCXYJ'
								},
								{
									title : '启用标志',
									field : 'QYBZ',
									width : 30,
									align : 'center',
									formatter : function(value, row, index) {
									if (value == "1")
										return "<input name='qchcek' type='checkbox' checked onclick='return false'/>";
									else
										return "<input name='qchcek' type='checkbox' onclick='return false'/>";
									}
								}, {
									field : 'operate',
									title : '操作',
									align : 'center',
									width : '100px',
									events : operateEvents,
									formatter : operateFormatter
								} ],
						onLoadSuccess : function() { // 加载成功时执行

						},
						onLoadError : function() { // 加载失败时执行

						},
						onCheck : function(row) {
							$("#remove").attr("disabled", false);
						},
						onUncheck : function(row) {

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
			'<i class="glyphicon glyphicon-remove"></i>', '</a>' ].join('');
}

/**
 * [operateEvents description]
 * 
 * @type {Object} 格式化操作栏绑定事件
 */
window.operateEvents = {
	'click .edit' : function(e, value, row, index) {
		modelFunc(row, '修改管理分类', 2);
	},
	'click .remove' : function(e, value, row, index) {
		deleteData(row, '确认要删除该记录吗?', 2);
	}
};

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

$(function() {

	$('#btn_query').on('click', function() {
		$table.bootstrapTable("refresh");
	});

	$('#mobile').on('click', function() {
		$table.bootstrapTable("toggleView");
	});
});
// 弹出方法
modelFunc = function(row, mtitle, mflag) {
	BootstrapDialog.show({
		title : mtitle,
		size : BootstrapDialog.SIZE_WIDE,
		data : {
			'data1' : dialog_data
		},
		closable : true,
		closeByBackdrop : false,
		closeByKeyboard : false,
		message : $('<div></div>').load('yyhptjcwhglfl.do?action=add'),
		buttons : [ {
			label : '保存',
			cssClass : 'btn-default btn-sm',
			action : function(dialogItself) {
				saveForm.init(dialogItself, mflag);
				$('#defaultForm').submit();
			}
		}, {
			label : '取消',
			cssClass : 'btn-default btn-sm',
			action : function(dialogItself) {
				dialogItself.close();
			}
		} ],
		onshow : function(dialogRef) {
		},
		onshown : function(dialogRef) {
			initPage(row,mflag);
		},
		onhide : function(dialogRef) {
			$(this).removeData("bs.modal");
		},
		onhidden : function(dialogRef) {
			$(this).removeData("bs.modal");
		}
	});
};

// 管理登记=01（健康管理）【00:所有人群;01:健康人群;02:亚健康人群;03:疾病人群;04:康复人群】
// 管理登记=02（医养护）【01=照护一级，02=照护二级，03=照护三级，04=照护四级，05=照护五级，06=照护六级】
var gldjArr1 = [{id : '00',name : '所有人群'},{id : '01',name : '健康人群'},{id : '02',name : '亚健康人群'},
	{id : '03',name : '疾病人群'},{id : '04',name : '康复人群'}];
var gldjArr2 = [{id : '01',name : '照护一级'},{id : '02',name : '照护二级'},{id : '03',name : '照护三级'},
	{id : '04',name : '照护四级'},{id : '05',name : '照护五级'},{id : '06',name : '照护六级'}]
var ywlbdm = [{id : '01',name : '健康管理'},{id : '02',name : '医养护'}]

function manageLevel(){
	wn.createSelectByArray($("#YWLBDM"),ywlbdm);
	wn.createSelectByArray($("#RQLBDM"),gldjArr1);
	var $ywlbdm = $("#YWLBDM");
	$ywlbdm.change(function(){
	var ywlbdm = $ywlbdm.val();
		if (ywlbdm == '01') {
			wn.createSelectByArray($("#RQLBDM"),gldjArr1);
		} else{
			wn.createSelectByArray($("#RQLBDM"),gldjArr2);
		}
	});
}

function initPage(row,mflag){
	manageLevel();

	if(mflag == 2){
		console.log('----->')
		setControlValue(row);
		var gldjdmTemp = row.RQLBDM;

		if ($("#YWLBDM").val() == '01') {
			wn.createSelectByArray($("#RQLBDM"),gldjArr1);
		} else if ($("#YWLBDM").val() == '02') {
			wn.createSelectByArray($("#RQLBDM"),gldjArr2);
		}
		$("#RQLBDM").val(gldjdmTemp);
	}

};

$(function() {
	$("#add").bind("click", function() {
		modelFunc(null, '新增管理分类', 1);
	});

	$("#more").bind("click", function() {
		MoreBind();
	});
	$('input, textarea').placeholder();
	initTable();
});

function setControlValue(row) {
	wn.setformEdit(row);
	$("#RQDM").attr("disabled", true);
}

deleteData = function(row, mTitle, mFlag) {
	BootstrapDialog.confirm({
		title : '提示信息',
		message : mTitle,
		type : BootstrapDialog.TYPE_WARNING,
		closable : true,
		draggable : true,
		btnCancelLabel : '否',
		btnOKLabel : '是',
		callback : function(result) {
			console.log('rows:' + row.RQDM)
			if (result) {
				var rows;
				if (mFlag == 2)
					rows = row.RQDM;
				else {
					var objects = $.map($('#table').bootstrapTable(
							'getSelections'), function(row) {
						return row.RQDM;
					});
					rows = objects.join();
				}
				$.ajax({
					url : "yyhptjcwhglfl.do?action=delete",
					type : "get",
					dataType : "json",
					data : {
						RQDM : rows
					},
					success : function(data) {
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
$(window).resize(function() {
	$table.bootstrapTable('resetWidth');

	var b = jQuery(window).width();

	if (b <= 600) {
		$table.bootstrapTable("toggleView");
	}
});

var dialog_data = 'Orange';
/**
 * [description] 绑定移除事件
 */
$('#remove').on('click', function() {
	/**
	 * [selectedRows description] bootstrap-table 获取已选择的行数
	 */
	var selectedRows = $('#table').bootstrapTable('getSelections');
	if (selectedRows.length == 0) {
		/**
		 * [action description] bootstrap-dialog 提示信息
		 */
		BootstrapDialog.show({
			title : '提示信息',
			message : '请选择要操作的数据!',
			buttons : [ {
				label : '确定',
				action : function(dialog) {
					dialog.close();
				}
			} ]
		});
		return;
	}
	deleteData(null, '确认要删除选中记录吗?', 1);
});

setTimeout(function() {
	$table.bootstrapTable('resetView');
}, 200);
