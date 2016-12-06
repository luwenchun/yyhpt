var dictData;
var fwpclist;
var selects = [];
var $table = $('#table');
var flag = 1;
var editRow;
function initTable(){
	$('#table').bootstrapTable(
			{
				classes : 'table table-hover warning',
				method : "get",
				url : 'yyhptjcwhjkztscccgc.do?action=list',
				contentType : "json",
				iconSize : 'sm',
				showHeader : true,
				striped : true,
				pagination : true,
				pageSize : 10,
				pageNumber : 1,
				pageList : [ 2 ],
				search : false,
				showColumns : false,
				showRefresh : false,
				onlyInfoPagination : false,
				sidePagination : "server",
				uniqueId : "LSH",
				clickToSelect : true,
				minimumCountColumns : 2,
				responseHandler : function(res) {
					dictData = res;
					return res;
				},
				queryParamsType : "undefined",
				showPaginationSwitch : false,
				queryParams : function queryParams(params) { // 设置查询参数
	                var param = {
					currPage: params.pageNumber,
	                pageSize: params.pageSize,
	                CCGC: $("#qrymc").val()
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
					        	     title : '流水号',
					        	     field : 'LSH'
					        	},
					        	{
					        	     title : '存储过程',
					        	     field : 'CCGC'
					        	},
					        	{
					        	     title : '存储过程说明',
					        	     field : 'CCGCSM'
					        	},
								{
									title : '启用标志',
									field : 'QYBZ',
									width : 30,
									align : 'center',
									formatter : function(value, row, index) {
										if (value == "1")
											return "<input name='qchcek' type='checkbox' class='noicheck' checked onclick='return false'/>";
										else
											return "<input name='qchcek' type='checkbox' class='noicheck' onclick='return false'/>";
									}
								},
				        	   {
									field : 'operate',
									title : '操作',
									align : 'center',
									width : '100px',
									events : operateEvents,
									formatter : operateFormatter
								}
				           ],
			    onLoadSuccess : function() {
			    	
			    },
			    onLoadError : function() {
			    	
			    },
			    onCheck : function(row) {
					$("#remove").attr("disabled", false);
				},
				onUncheck : function(row) {
					// alert(row.id);
				}
			});
}

function operateFormatter(value, row, index) {
	return [
			'<a class="edit" href="javascript:void(0)"  data-toggle="modal" disabled title="修改">',
			'<i class="glyphicon glyphicon-edit"></i>',
			'</a>&nbsp;&nbsp;&nbsp;&nbsp;',
			'<a class="remove" href="javascript:void(0)" title="删除">',
			'<i class="glyphicon glyphicon-remove"></i>', '</a>' ].join('');
}
window.operateEvents = {
		'click .edit' : function(e, value, row, index) {
			modelFunc(row, '修改存储过程信息', 2);
		},
		'click .remove' : function(e, value, row, index) {
			deleteData(row, '确认要删除该记录吗?', 2);
		}
};

//弹出方法
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
		message : $('<div></div>').load('yyhptjcwhjkztscccgc.do?action=add'),
		buttons : [ {
			label : '保存',
			cssClass : 'btn-default btn-sm',
			action : function(dialogItself) {
				saveForm.init(dialogItself, flag);
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
			console.log('this is onshow...')
		},
		onshown : function(dialogRef) {
			console.log('this is onshown...')
		},
		onhide : function(dialogRef) {
			$(this).removeData("bs.modal");
		},
		onhidden : function(dialogRef) {
			$(this).removeData("bs.modal");
		}
	});
};

function setControlValue(row) {
	wn.setformEdit(row);
	// 修改时，控制部分权限
	$("#LSH").attr("disabled", true);
}

//删除消息、确认 1= 按钮多选删除 2=操作栏
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
					rows = row.LSH;
				else {
					var objects = $.map($('#table').bootstrapTable(
							'getSelections'), function(row) {
						return row.YWXMDM;
					});
					rows = objects.join();
				}
				$.ajax({
					url : "yyhptjcwhjkztscccgc.do?action=delete",
					type : "get",
					dataType : "json",
					data : {
						LSH : rows
					},
					success : function(data) {
						if (data.code=="T"){
							wnform.toast(data.message);
							$table.bootstrapTable('refresh');
						}
						else{
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
		modelFunc(null, '新增存储过程信息', 1);
	});

	$("#more").bind("click", function() {
		MoreBind();
	});
	$('input, textarea').placeholder();
	initTable();

});

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

