var dictData;
var arrayDatas;
var rqlbdata;
var ccgcs;
var $table = $('#table');
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
		modelFunc(row, '修改主题信息', 2);
	},
	'click .remove' : function(e, value, row, index) {
		deleteData(row, '确认要删除该记录吗?', 2);
	}
};

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
						url : "yyhptjcwhjkztscb.do?action=list", // 获取数据的Servlet地址
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
						uniqueId : "ZTDM", // 每一行的唯一标识，一般为主键列
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
								ZTMC : $("#qrymc").val(),
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
									field : 'ZTDM',
									title : '筛查主题代码'
								},
								{
									field : 'ZTMC',
									title : '筛查主题名称'
								},
								{
									field : 'NLQJ',
									title : '年龄区间',
								},
								{
									field : 'XB',
									title : '性别',
									formatter : function(value, row, index) {
										if (value == '0'){return '不限';} else if (value == '1') {return '男';}else {return '女'}
									}
								},
								{
									field : 'JBZL',
									title : '疾病种类',
									formatter : formatJbzlToName
								},
								{
					        	     title : '更新时间',
					        	     field : 'XT_XGSJ'
					        	},
								{
									field : 'QYBZ',
									title : '启用标志',
									width : 30,
									align : 'center',
									formatter : function(value, row, index) {
										if (value == "1")
											return "<input name='qchcek' type='checkbox' class='noicheck' checked onclick='return false'/>";
										else
											return "<input name='qchcek' type='checkbox' class='noicheck' onclick='return false'/>";
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
							wn.iCheckInitForColor("orange");
						},
						onLoadError : function() { // 加载失败时执行

						},
						onCheck : function(row) {
							$("#remove").attr("disabled", false);
						},
						onUncheck : function(row) {
							// alert(row.id);
						}
					});
}

$(function() {
	$('#btn_query').on('click', function() {
		$table.bootstrapTable("refresh");
	});
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

var xbArr = [{'id':'0','name':'不限'},{'id':'1','name':'男'},{'id':'2','name':'女'}]
var jbzl = [{'id':'06','name':'肿瘤'},
	{'id':'07','name':'高血压易患'},
	{'id':'08','name':'糖尿病易患'},
	{'id':'09','name':'脑卒中易患'},
	{'id':'10','name':'肿瘤易患'},]

function formatJbzlToName(value, row ,index) {
	var transVal;
	$.each(jbzl, function (k, v) {
		if (v.id == value) {
			transVal = v.name;
		}
	});
	return transVal;
}

initTable();
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
		message : $('<div></div>').load('yyhptjcwhjkztscb.do?action=add'),
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
			initButtons();
			getDictsData(row,mflag);
		},
		onhide : function(dialogRef) {
			$(this).removeData("bs.modal");
		},
		onhidden : function(dialogRef) {
			$(this).removeData("bs.modal");
		}
	});
}

function getDictsData(row,mflag) {
	$.ajax({
			url : "yyhptjcwhjkztscccgc.do?action=dists",
			type : "get",
			dataType : "json",
			data : {},
			success : function(datas) {
				initPageControls(datas,row,mflag);
			}
	});
}

function initPageControls(datas,row,mflag){
	wn.createSelectByArray($("#CZGCMX"), datas.dict,"--请选择存储过程--");
	if (mflag == 2) {
		setControlValue(row);
	}
}

function initButtons(){
	wn.createRadioByArray($("#xbdiv"),xbArr, "XB");
	wn.createRdoWidthByArray($("#jbzldiv"), jbzl, "JBZL", 2);
}

//下拉框选择默认值
select2Set = function(selObject, strings) {
	var values = strings;
	values.forEach(function(e) {
		selObject.find("option[value='" + e + "']").attr("selected", true);
	});
};

var tempFwxm;

// 修改弹出时赋值 table数据
function setControlValue(row) {
	// 修改时，控制部分权限
	$("#ZTDM").attr("disabled", true);
	console.log('row:'+JSON.stringify(row))
	if (row.ZXFS == "2") {
		$("#JKFWMX").attr("disabled", false);
		$("#CZGCMX").attr("disabled", true);
		$("#JKFWMX").val("");
	} else {
		$("#JKFWMX").attr("disabled", true);
		$("#CZGCMX").attr("disabled", false);
		$("#CZGCMX").val("");
	}
	wn.setformEdit(row);
}

// 删除消息、确认 1= 按钮多选删除 2=操作栏
deleteData = function(row, mTitle, mFlag) {
	console.log('delete begin');
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
					rows = row.ZTDM;
				else {
					var objects = $.map($('#table').bootstrapTable(
							'getSelections'), function(row) {
						return row.ZTDM;
					});
					rows = objects.join();
				}
				$.ajax({
					url : "yyhptjcwhjkztscb.do?action=delete",
					type : "get",
					dataType : "json",
					data : {ZTDM : rows},
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
}


function dataFormatter(value, row, index) {
	return "";
}

/**
 * 获取页面盖度
 * 
 */
function getHeight() {
	return $(window).height() - 150;
}

/**
 * [description] bootstrap-table 高度自适应
 */
var toggle;

var dialog_data = 'Orange';
/**
 * [description] 初始化页面 事件注册
 */
$(function() {
	wnform.addOnresize($table,tableStaus);
	/**
	 * [description] 绑定点击事件
	 */
	$("#add").bind("click", function() {
		modelFunc(null, '新增主题信息', 1);
	});
	$('input, textarea').placeholder();
})
