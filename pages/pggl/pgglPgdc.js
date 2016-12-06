var fjId_Prefix = "dcqk_";     //分级id前缀
var dcxx_dicts;                //字典项
var sDcnrJson;

/*$(function () {
	if (editRow.JALX == '1'){
		$('#pgdc_save').prop('disabled',true);
	}
})*/

//初始化基本信息
function initJbxx(){
	$('#grxx_xm').html(rowPersonInfo.XM);
	$('#grxx_xb').html(rowPersonInfo.XB ? rowPersonInfo.XB : '');
	$('#grxx_csrq').html(rowPersonInfo.CSRQ ? rowPersonInfo.CSRQ : '');
	$('#grxx_sfzh').html(rowPersonInfo.SFZH ? rowPersonInfo.SFZH : '');
	$('#grxx_lxdh').html(rowPersonInfo.LXDH ? rowPersonInfo.LXDH : '');
	$('#grxx_jzdz').html(rowPersonInfo.JZDZ ? rowPersonInfo.JZDZ : '');
};
initJbxx();

/*
 * 获取机构全部人员
 */
function getRylist() {
	$.ajax({
		url : "common.do?action=getSysCzrylist",
		type : "post",
		dataType : "json",
		success : function(data) {
			rylist=data.czrys;
			//初始调查人员
			wn.createSelectByCZRYArray($("#DCY1BH"), rylist);
			wn.createSelectByCZRYArray($("#DCY2BH"), rylist);
			wn.createSelectByCZRYArray($("#DCY3BH"), rylist);
			
			$("#DCY1BH").select2({language: 'zh-CN'});
			$("#DCY2BH").select2({language: 'zh-CN'});
			$("#DCY3BH").select2({language: 'zh-CN'});
			
			/*$('#DCY1BH').select2({
	            language: 'zh-CN',
	            data: rylist,
	            allowClear: false,
	            multiple: false,
	        });
			$('#DCY2BH').select2({
	            language: 'zh-CN',
	            data: rylist,
	            allowClear: false,
	            multiple: false,
	        });
			$('#DCY3BH').select2({
	            language: 'zh-CN',
	            data: rylist,
	            allowClear: false,
	            multiple: false,
	        });*/
		}
	});
}
getRylist();

$(function () {
	//初始化日期控件
	$('.date-edit').datepicker({
		orientation: "left",
		autoclose: true,
		todayBtn: "linked",
		todayHighlight: true,
		startDate: "-0d"   //从当天开始选
	});
});

/*
 * 获取调查信息
 */
function getDcxx() {
	$.ajax({
		url : "yyhptpggl.do?action=getXqdcjl",
		type : "post",
		dataType: "json",
		data: {
			yngrbsh:rowPersonInfo.YNGRBSH,
			sqlsh:rowPersonInfo.SQLSH
		},
		success: function (data) {
			if(data == undefined){
				wnform.toast('查询调查记录失败!');
			}else{
				//调查记录
				var dcjlObj = data.dcjl;
				//字典项
				dcxx_dicts = data.dict;

				//绑定调查记录流水号
				//$('#DCJLLSH').val(dcjlObj.DCJLLSH);
				
				//根据模板内容生成指标分级标签
				initZbfjHtml(dcjlObj.MBNR);

				//已做过调查，赋值分级结果
				sDcnrJson = dcjlObj.DCNR;
				setFjValue(sDcnrJson);

				//动态生成老年人能力初步等级
				var ylhldjdmDict = JSON.stringify(dcxx_dicts.ylhldjdm);
				wn.createiRadioWidthByArray($("#lnrnlcbdjDiv"), JSON.parse(ylhldjdmDict), "PGDJBMCB", "PGDJMCCB", 2);
				
				//绑定机构
				var jgxx = data.jgxx;
				if (jgxx.size != 0) {
					wn.createSelectByArray($('#ZZPGJGDM'), jgxx);   //组织评估机构
					wn.createSelectByArray($('#PGJGDM'), jgxx);     //评估机构
					
					/*$('#ZZPGJGDM').select2({
			            language: 'zh-CN',
			            data: jgxx,
			            allowClear: false,
			            multiple: false,
			        });
					
					$('#PGJGDM').select2({
			            language: 'zh-CN',
			            data: jgxx,
			            allowClear: false,
			            multiple: false,
			        });*/
				}
				//根据id与字段名相同赋值
				setTimeout(function() {
					//界面赋值
					initForm(data.dcjl);
					//设置select2的文本
					$('#DCY1BH').val(data.dcjl.DCY1BH).trigger('change');
					$('#DCY2BH').val(data.dcjl.DCY2BH).trigger('change');
					$('#DCY3BH').val(data.dcjl.DCY3BH).trigger('change');
					
					//$('#ZZPGJGDM').val(data.dcjl.ZZPGJGDM).trigger('change');
					//$('#PGJGDM').val(data.dcjl.PGJGDM).trigger('change');
					
					//如果是新增（根据评估等级编码判断是新增调查界面数据），则默认当前登录机构
					if(data.dcjl.PGDJBMCB==null || data.dcjl.PGDJBMCB==""){
						$('#ZZPGJGDM').val(data.dljgdm);
						//$('#ZZPGJGDM').val(data.dljgdm).trigger('change');

						$('#PGJGDM').val(data.dljgdm);
						//$('#PGJGDM').val(data.dljgdm).trigger('change');
					}
					//调查日期为空，则默认当天
					if($('#DCRQ').val()==""){
						$('#DCRQ').val(new Date().format("yyyy-MM-dd"));
					}
				}, 500);
			}
		}
	});
}
getDcxx();

//根据模板内容生成指标分级标签
function initZbfjHtml(MBNR){
	if(MBNR==undefined||MBNR==''){
		return;
	}
	var mbnrObj = JSON.parse(MBNR);
	var wjqkHtml = '<div class="form-horizontal form-bordered form-row-stripped nopadding">';
	//一级指标名称
	var djmc;
	//一级指标分类标号
	var flbh;
	//循环拼接模板内容
	for(i = 0;i<=mbnrObj.length-1;i++){
		if(i%2==0){
			wjqkHtml += '<div class="form-group nopadding">';
		}
		//获取一级指标名称，去掉最后的“分级”
		djmc =  mbnrObj[i].DJMC.replace("分级","");
		flbh = mbnrObj[i].FLBH;
		wjqkHtml += '<label class="col-md-2 col-xs-5 control-label control-label-new">'+djmc+'：</label>';
		wjqkHtml += '<div class="col-md-3"><p id="'+fjId_Prefix+flbh+'" class="form-control-static"></p></div>';
		if((i+1)%2==0){
			wjqkHtml += '</div>';
		}
	}
	wjqkHtml+='</div>';
	//console.log(wjqkHtml);
	$('#wjqkContent').html(wjqkHtml);
}

//已做过调查，赋值分级结果
function setFjValue(DCNR){
	if(DCNR==undefined||DCNR==''){
		return;
	}
	var dcnrObj = JSON.parse(DCNR);
	//分类编号
	var flbh;
	//定级结果
	var djjg;

	//循环调查内容
	for(i = 0;i<=dcnrObj.length-1;i++){
		flbh = fjId_Prefix + dcnrObj[i].FLBH;
		djjg = dcnrObj[i].DJJG;
		if(document.getElementById(flbh)!=undefined){
			//暂时修改为不从字典中取，写死（一切为了演示）
			/*for(j = 0;j<=dcxx_dicts.ylhldjdm.length-1;j++){
				console.log('等级结果值：'+djjg);
				//console.log('字典项代码：'+dcxx_dicts.ylhldjdm[j].zdm);
				if(dcxx_dicts.ylhldjdm[j].zdm==djjg){
					document.getElementById(flbh).innerText = dcxx_dicts.ylhldjdm[j].zmc;
				}
			}*/
			
			var djmc = '';
			if(djjg!=''){
				if(djjg==0){
					djmc='能力完好';
				}else if(djjg==1){
					djmc='轻度受损';
				}else if(djjg==2){
					djmc='中度受损';
				}else if(djjg==3){
					djmc='重度受损';
				}
			}
			document.getElementById(flbh).innerText = djmc;
		}
	}
}

//保存评估调查数据
function savePgdcDetail(dialog){
	if($('#DCY1BH').val()!=''&&$('#DCY2BH').val()!=''){
		if($('#DCY1BH').val()==$('#DCY2BH').val()){
			wnform.toast('调查员不能相同!');
			return;
		}
	}
	if($('#DCY1BH').val()!=''&&$('#DCY3BH').val()!=''){
		if($('#DCY1BH').val()==$('#DCY3BH').val()){
			wnform.toast('调查员不能相同!');
			return;
		}
	}
	if($('#DCY2BH').val()!=''&&$('#DCY3BH').val()!=''){
		if($('#DCY2BH').val()==$('#DCY3BH').val()){
			wnform.toast('调查员不能相同!');
			return;
		}
	}

	var pgdcDataDetail = wn.fillWithForm("pgdcMainForm");
	pgdcDataDetail+='&DCNR='+sDcnrJson;
	pgdcDataDetail+='&PGDCBZ=1';
	$.ajax({
		url: "yyhptpggl.do?action=saveXqdc",
		type: "post",
		dataType: "json",
		data: pgdcDataDetail,
		success: function (data) {
			if (data[0].code == "T") {
				$("#DCJLLSH").val(data[0].key);
				wnform.toast('保存成功!');
				dialog.close();
			}
			else {
				wnform.toast('保存失败!'+data[0].message);
			}
		}
	});
}

//界面赋值
function initForm(row) {
	$.each(row, function (k, v) {
		var obj = $('#' + k);
		if (obj.length > 0) {
			var type = obj.attr("type");
			if (type == 'text') {
				obj.val(v);
			} else if (obj.is('p')) {
				obj.text(v);
			} else if (type == undefined) {
				var tagname = $('#' + k).get(0).tagName.toLowerCase();
				if (tagname == "select" && v != null) {
					//20160830 改为分多选赋值和单选赋值 
					if(v.indexOf(',')>0){
						wn.select2Set($('#' + k), v);
					}else{
						obj.val(v);
					}
					
				} else if (tagname == "textarea") {
					$('#' + k).val(v);
				}
			} else if (type == 'checkbox') {
				if (obj.attr("name") == k) { // 普通单个checkbox，设id
					if (obj.val() == v)
						obj.attr("checked", "checked");
					else
						obj.attr("checked", false);
				} else { // checkbox多选，id不等于name
					wn.checkboxSet2(k, v);
				}
			} else if (type == 'radio') {
				console.log(k);
				console.log(v);
				k = k.replace('BM', 'MC');
				$("input[value='" + v + "'][name='" + k + "']").attr("checked", "checked");
				$("input[name='" + k + "']").iCheck({
					checkboxClass: 'icheckbox_flat-wnred',
					radioClass: 'iradio_flat-wnred',
					increaseArea: '20%'
				});
			}
		}
	});
}

//form数据验证
var savePgdcMainForm = function() {
	var submitData = function(dialog) {
		var pgdcMainForm = $('#pgdcMainForm');
		pgdcMainForm.validate({
			errorElement : 'span', // default input error message container
			errorClass : 'help-block help-block-error', // default input error
														// message class
			focusInvalid : false, // do not focus the last invalid input
			ignore : "", // validate all fields including form hidden input
			messages : {
				DCRQ : {
					required : "调查日期必填"
				}
			},
			rules : {
				DCRQ : {
					required : true
				}
			},

			// highLight error inputs
			highlight : function(element) {
				// set error class to the control group
				$(element).closest('.form-group').addClass('has-error');
			},

			invalidHandler : function(event, validator) {
				// display error alert on form submit
				$('.alert-danger', $('.form-horizontal')).show();
			},
			success : function(label) {
				label.closest('.form-group').removeClass('has-error');
			},
			submitHandler : function(form) {
				//保存数据
				savePgdcDetail(dialog);
			}
		});
	};
	return {
		// main function to initiate the module
		init : function(dialog) {
			submitData(dialog);
		}
	};
}();