var dictData;
var fwpclist;
var selects = [];
var $table = $('#table');
var gotoFlag = "1";
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
						url : "yyhptjcwhfwbmx.do?action=list", // 获取数据的Servlet地址
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
						uniqueId : "FWBDM", // 每一行的唯一标识，一般为主键列
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
								XMDM : $("#qrymc").val(),
							};

							return param;
						},
						columns : [
								{
								     title : '服务包代码',
								     field : 'FWBDM'
								},
								{
								     title : '项目代码',
								     field : 'XMDM'
								},
								{
								     title : '项目名称',
								     field : 'XMMC'
								},
								{
								     title : '服务频次代码',
								     field : 'PCDM'
								},
								{
								     title : '费用单价',
								     field : 'FYDJ'
								},
								{
								     title : '数量',
								     field : 'SL'
								},
								{
								     title : '费用合计',
								     field : 'FYHJ'
								},
								{
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
		modelFunc(row, '修改服务包明细信息', 2);
	},
	'click .remove' : function(e, value, row, index) {
		deleteData(row, '确认要删除该记录吗?', 2);
	}
};

// 弹出方法
modelFunc = function(row, mtitle, mflag) {
	initDictData();
	BootstrapDialog.show({
		title : mtitle,
		size : BootstrapDialog.SIZE_WIDE,
		data : {
			'data1' : dialog_data
		},
		closable : true,
		closeByBackdrop : false,
		closeByKeyboard : false,
		message : $('<div></div>').load('yyhptjcwhfwbmx.do?action=add'),
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

			setHtml(arrayDatas);

			if (mflag == 2) {
				setTimeout(function() {
					setControlValue(row)
				}, 500);
			}
			$.ajax({
				url : 'yyhptjcwhywxmb.do?action=dists',
				type : 'GET',
				dataType : 'json',
				data : {

				}
			}).done(function(datas) {
				if (mflag == 2) // 修改
				{
					setTimeout(function() {
						setControlValue(row)
					}, 500);
				}
				setSjxmHtml(datas)
			}).fail(function() {
				console.log("error");
			}).always(function() {
				console.log("complete");
			});
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
		selObject.find("option[value='" + e + "']").attr("selected", true);
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
		console.log('key:' + id + ':' + 'value:' + value);
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
		console.log('key:' + this.YWXMDM + ':' + 'value:' + this.YWXMMC);
	})
	selObject.html(selectBody);
};

function setHtml(datas) {
	createSelectByArray($("#LBDM"), datas);
}
function setSjxmHtml(datas) {
	createSelectByYWXMArray($("#SJXMDM"), datas);
}

var tempYwxm;

// 修改弹出时赋值 table数据
function setControlValue(row) {
	console.log(row)
	wn.setformEdit(row);
	// 修改时，控制部分权限
	$("#YWXMDM").attr("disabled", true);
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
			console.log('rows:' + row.LSH)
			if (result) {
				var rows;
				if (mFlag == 2)
					rows = row.FWBDM;
				else {
					var objects = $.map($('#table').bootstrapTable(
							'getSelections'), function(row) {
						return row.FWBDM;
					});
					rows = objects.join();
				}
				$.ajax({
					url : "yyhptjcwhfwbmx.do?action=delete",
					type : "get",
					dataType : "json",
					data : {
						FWBDM : rows
					},
					success : function(data) {
						$table.bootstrapTable('refresh');
						/*if (data.code=="0"){
							$table.bootstrapTable('refresh');
							$.toaster({priority: 'success', title: '提示', message: "操作成功!"});
							//$('#table').bootstrapTable('refresh');
						}
						else{
							$.toaster({priority: 'danger', title: '提示', message: "操作失败!"});
						}*/
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
		modelFunc(null, '新增服务包明细信息', 1);
	});

	$("#more").bind("click", function() {
		MoreBind();
	});

	$('input, textarea').placeholder();
	initTable();

});

function initDictData() {
	$.ajax({
		url : 'yyhptjcwhywxmb.do?action=getDistData',
		type : 'GET',
		dataType : 'json',
	/* data : wn.distCodes([ '63-0001' ]) */
	}).done(function(datas) {
		arrayDatas = datas;
		console.log('arrayDatas.......' + arrayDatas);
		// getDists();
	}).fail(function() {
		console.log("error");
	}).always(function() {
		console.log("complete");
	});
}

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
