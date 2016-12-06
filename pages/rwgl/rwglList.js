var dictData;         //字典项
var dlRybm;          //登录人员编码
var sfzd='1';         //是否制定（0 否 1 是）
var sfsh='1';          //是否审核（0 否 1 是）

/*
 * 获取全部人员
 */
function getRylist() {
	$.ajax({
		url : "sysdata.do?action=listByJsbm",
		type : "post",
		dataType : "json",
		data : {
			jsmc:'签约医生一览表'
		},
		success : function(data) {
			rylist=data.czrys;			
			//初始化签约人员
			wn.createSelectByCZRYArray($("#qyys"), rylist);			
			dlRybm = data.rybm;
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
						classes : 'table table-hover warning',
						method : "get", // 使用get请求到服务器获取数据
						url : "yyhptRwglGetRwlb.do?action=list", // 获取数据的Servlet地址
						contentType : "application/json",
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
						uniqueId : "grbjh", // 每一行的唯一标识，一般为主键列
						clickToSelect : true, // 是否启用点击选中行
						showExport: true,
						exportDataType: "basic",
						minimumCountColumns : 2, // 最少允许的列数
						responseHandler : function(res) {
							dictData = res.dict;
							return res;
						},
						queryParamsType : "undefined",
						showPaginationSwitch : false,
						queryParams : function queryParams(params) { // 设置查询参数
							getPara(params);
							var param = {
								currPage : params.pageNumber,
								pageSize : params.pageSize,
								xm : $("#xm").val(),
								sfzh : $("#sfzh").val(),
								qyysbm : $("#qyys").val(),	
								sfpg:sfzd,
								sfgl:sfsh
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
									field : 'rwmc',
									title : '任务名称',
									align : 'center'
								},
								{
									field : 'xb',
									title : '性别',
									align : 'center'
								},
								{
									field : 'nl',
									title : '年龄',
									align : 'center'
								},
								{
									field : 'sfzh',
									title : '身份证号',
									formatter : function(value, row, index) {
										if(value.length==18){
											return value.substr(0,3)+'*********'+value.substr(12,6);
										}else if(value.length==15){
											return value.substr(0,3)+'******'+value.substr(9,6);
										}else{
											return value;
										}
									},
									align : 'center'
								},
								{
									field : 'sjhm',
									title : '联系电话',
									align : 'center'
								},
								{
									field : 'dqrq',
									title : '到期日期',
									align : 'center'
								},
								{
									field : 'clzt',
									title : '任务状态',
									align : 'center'
								},
								{
									field : 'clryxm',
									title : '处理人',
									align : 'center'
								},
								{
									field : 'rwdj',
									title : '服务登记',
									align : 'center'
								},								
								{
									field : 'jzdz',
									title : '居住地址',
								}],
						onLoadSuccess : function() { // 加载成功时执行
							
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

/**
 * [operateEvents description]
 * 
 * @type {Object} 格式化操作栏绑定事件
 */
window.operateEvents = {
	'click .homeToJkpg' : function(e, value, row, index) {
		modelFunc(row, '健康状况评估');
	},

	'click .homtToJktc' : function(e, value, row, index) {
		fazdFunc(row,'健康方案制定');
	},
};

function operateFormatter(value, row, index) {
	//return '<a class="homeToJkpg" href="loginUpgrade.do?action=success#./jkglzkpggr.do?action=init"  >'+value+'<a/>';
	return '<a class="homeToJkpg" href="javascript:modelFunc('+row+')"  >'+value+'<a/>';
}

//跳转到健康评估界面
modelFunc = function(row, mtitle) {
	//首先ajax请求数据		
	LoadAjaxContent1('./jkglzkpggr.do?action=init',function(data) {		
		$('#ajax-content').html(data);		
		var grbjh=row.grbjh;
		 //fx 
		LoadAjaxContentGr(grbjh,mtitle);
		$('#icname').html('&nbsp;&nbsp;'+mtitle);
	});
};

//跳转到方案制定界面
fazdFunc = function(row, mtitle) {

	//首先ajax请求数据		
	LoadAjaxContent1('./jkglfazdgr.do?action=init',function(data) {		
		$('#ajax-content').html(data);		
		var grbjh=row.grbjh;
		setTimeout(function() {
			 //fx 
			LoadAjaxContentGr(grbjh,"");
			$('#icname').html('&nbsp;&nbsp;'+mtitle);
			}, 500);
		//LoadAjaxContentGr(grbjh,"");
		//$('#icname').html('&nbsp;&nbsp;'+mtitle);
	});
};

//获取标题中的人群数目
GetRqNum();
/**
 *  初始化表格
 */
initTable();

var $table = $('#table');

/**
 * 获取查询参数
 * 
 */
function getPara(params) {

		
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

$(function() {
	isMenu=false; 
	wnform.addOnresize($table,tableStaus);
	
	$('#btn_query').on('click', function() {
		$table.bootstrapTable("selectPage",1);
		$table.bootstrapTable("refresh");
		return false;
	});
	
	/**
	 * 绑定标题单击事件
	 */	
	$('#fwdjQuery').on('click', function() {
		sfzd = '1';
		sfsh = '1';
		//初始化查询条件
		InitSearch();
		$table.bootstrapTable("selectPage",1);
		$table.bootstrapTable("refresh");
        return false;
	});
	
	$('#fwpjQuery').on('click', function() {
		sfzd = '1';
		sfsh = '0';
		InitSearch();
		$table.bootstrapTable("selectPage",1);
		$table.bootstrapTable("refresh");
        return false;
	});
	
	$('#fwhfQuery').on('click', function() {
		sfzd = '0';
		sfsh = '';
		InitSearch();
		$table.bootstrapTable("selectPage",1);
		$table.bootstrapTable("refresh");
        return false;
	});	
	
	$('#export').on('click', function() {
		$table.tableExport({ type: 'excel', escape: 'false' });
		return false;
	});
});


setTimeout(function() {
	$table.bootstrapTable('resetView');
}, 200);

//初始化查询条件
function InitSearch(){
	if(sfzd==0){
		$("#qyys").val(dlRybm);
	}else{
		$("#qyys").val('');
	}
	$("#xm").val("");
	$("#sfzh").val("");
}

function GetRqNum(){
	$.ajax({
		url : 'jkglhome.do?action=getRqNum',
		type : "get",
		dataType : "json",
		data :{}, 					
		success : function(data) {
			var fwdjNum= document.getElementById("fwdjNum");
			fwdjNum.innerText = data.nums[0].jkglNum;
			
			var fwpjNum= document.getElementById("fwpjNum");
			fwpjNum.innerText = data.nums[0].ypgwglNum;

			var fwhfWhfNum= document.getElementById("fwhfWhfNum");
			fwhfWhfNum.innerText = data.nums[0].dpgNum;
			
			var fwhfYhfNum= document.getElementById("fwhfYhfNum");
			fwhfYhfNum.innerText = data.nums[0].ypgwglNum;
		}
	});
}





