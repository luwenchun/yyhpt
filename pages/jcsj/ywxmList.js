var dictData;
var $table = $('#table');
var flag = 1;
var editRow;
var arrayDatas;
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
						url : "yyhptjcwhywxmb.do?action=list", // 获取数据的Servlet地址
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
						uniqueId : "YWXMDM", // 每一行的唯一标识，一般为主键列
						clickToSelect : true, // 是否启用点击选中行
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
								YWXMMC : $("#qrymc").val(),
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
									title : '业务项目代码',
									field : 'YWXMDM'
								},
								{
									title : '业务项目名称',
									field : 'YWXMMC'
								},
								{
									title : '类别名称',
									field : 'LBMC'
								},
								{
									title : '上级项目名称',
									field : 'SJXMMC'
								},
								{
									title : '更新时间',
									field : 'XT_XGSJ'
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
							$("#remove").prop("disabled", false);
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
		modelFunc(row, '修改业务项目信息', 2);
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

// 弹出方法
modelFunc = function(row, mtitle, mflag) {
	flag = mflag;
	editRow = row;
	BootstrapDialog.show({
		title : mtitle,
		size : BootstrapDialog.SIZE_WIDE,
		data : {
			'data1' : dialog_data
		},
		closable : true,
		closeByBackdrop : false,
		closeByKeyboard : false,
		message : $('<div></div>').load('yyhptjcwhywxmb.do?action=add'),
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
		},
		onhide : function(dialogRef) {
			$(this).removeData("bs.modal");
		},
		onhidden : function(dialogRef) {
			$(this).removeData("bs.modal");
		}
	});
};
//下拉框选择默认值
select2Set = function(selObject, strings) {
	var values = strings;
	values.forEach(function(e) {
		selObject.find("option[value='" + e + "']").prop("selected", true);
	});
	if (values.length > 0)
		selObject.select2();
};
//类别
createSelectByArray = function(selObject, array, optionname) {
	var selectBody = "<option value=''>--请选择--</option>";
	if (optionname != undefined)
		selectBody = "<option value=''>" + optionname + "</option>";
	$.each(array, function(id, value) {
		if (value == "") {
			value = "未知";
		}
		selectBody += "<option value=" + id + ">" + value + "</option>";
	});
	selObject.html(selectBody);
}
//上级项目
createSelectByYWXMArray = function(selObject, array, optionname) {
	var selectBody = "<option value=''>--请选择--</option>";
	if (optionname != undefined)
		selectBody = "<option value=''>" + optionname + "</option>";
	$.each(array, function() {
		selectBody += "<option value=" + this.YWXMDM + ">" + this.YWXMMC
				+ "</option>";
	})
	selObject.html(selectBody);
};

var tempYwxm;

// 修改弹出时赋值 table数据
function setControlValue(row) {
	wn.setformEdit(row);
	// 修改时，控制部分权限
	$("#YWXMDM").prop("disabled", true);
}

// 删除消息、确认 1= 按钮多选删除 2=操作栏
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
			if (result) {
				var rows;
				if (mFlag == 2)
					rows = row.YWXMDM;
				else {
					var objects = $.map($('#table').bootstrapTable(
							'getSelections'), function(row) {
						return row.YWXMDM;
					});
					rows = objects.join();
				}
				$.ajax({
					url : "yyhptjcwhywxmb.do?action=delete",
					type : "get",
					dataType : "json",
					data : { YWXMDM : rows},
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
 * [description] 初始化页面 事件注册
 */
$(function() {
	/**
	 * [description] 绑定点击事件
	 */
	$("#add").bind("click", function() {
		modelFunc(null, '新增业务项目', 1);
	});

	$("#more").bind("click", function() {
		MoreBind();
	});

	$('input, textarea').placeholder();
	initTable();

});

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

$(function() {

	$('#btn_query').on('click', function() {
		$table.bootstrapTable("refresh");
	});

	$('#mobile').on('click', function() {
		$table.bootstrapTable("toggleView");
	});
});

setTimeout(function() {
	$table.bootstrapTable('resetView');
}, 200);
