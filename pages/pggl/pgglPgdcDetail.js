var sMblsh = "0001";             //模板流水号
var sMbnr;                       //模板内容
var fjDivId_Suffix = "_FjDiv";   //分级div的id后缀（命名：FLBH+后缀）
var fjmcName_Suffix = "_Fjmc";   //分级radio的name后缀（命名：FLBH+后缀）
var zfId_Suffix = "_Zfid";       //总分id的后缀（命名：FLBH+后缀）
var pgtmName_Suffix = "_DaName_";//评估题目radio的name中间部分（命名：FLBH+中间部分+PGBM）

$(function () {
	getMoudule();
});
/*
 * 获取模板数据
 */
function getMoudule() {
    $.ajax({
        url: "yyhptpggl.do?action=getXqdcMb",
        type: "post",
        dataType: "json",
        data: {
        	mblsh:sMblsh,
        	yngrbsh:rowPersonInfo.YNGRBSH,
			sqlsh:rowPersonInfo.SQLSH
        },
        success: function (data) {		        	
        	if(data == undefined){
        		wnform.toast('查询模板失败!');
        	}else{
        		//获取姓名
        		$('#pgdc_xm').text(rowPersonInfo.XM);        		
        		//模板信息
        		var mbxxObj = data.mbxx;
        		//绑定评估结果流水号
        		$('#PGDC_DCJLLSH').val(mbxxObj.DCJLLSH);
        		//初始化界面
        		initForm(mbxxObj);
        		if(mbxxObj.DCNR!=null && mbxxObj.DCNR!=''){
        			setValue(mbxxObj.DCNR);
        		}
        	}
        }
    });
}


//动态生成界面
function initForm(mbxxObj){
	//模板内容
	sMbnr = mbxxObj.MBNR;
	var mbnrObj = JSON.parse(mbxxObj.MBNR);
	//评估题目标题
	var pgtmObj;
	//题目内容信息
	var tmxxObj;
	//1.设置模板名称
	$('#pgdc_title').text(mbxxObj.MBMC);
	//调查分类
	var dcflHtml=''; 
	//调查信息
	var dcxxHtml='';
	//循环拼接模板内容
	for(i = 0;i<=mbnrObj.length-1;i++){	
		//循环拼接调查分类tab页（一级指标）
		dcflHtml += '<li><a id = "pgdc_Dcfl'+i
			+'" href="#dcxxContent'+i+'" name="'+mbnrObj[i].FLBH+'" data-toggle="tab" >'+mbnrObj[i].DCFL
			+'</a></li>';
		//循环拼接调查分类tab页内容
		dcxxHtml +='<div class="tab-pane fade" id="dcxxContent'+i+'">';
		//获取评估题目
		pgtmObj = mbnrObj[i].PGTM
		//循环拼接题目标题（二级指标）
		for(j = 0;j<=pgtmObj.length-1;j++){		
			dcxxHtml+='<div class="form-group"><div class="col-md-12">'
					+'<div class="col-sm-12 col-md-12"><p class="pgdc-third-title">'
					+'<span class="pgdc-second-title">'+pgtmObj[j].PGBM+' '+pgtmObj[j].ZBT
					+'</span>'+pgtmObj[j].FBT+'</p></div>'
			//---------------------------------------拼接题目内容begin---------------------------------------
			tmxxObj = pgtmObj[j].TMXX;		
			dcxxHtml += '<div class="col-sm-12 col-md-12" id="'+pgtmObj[j].PGBM+'">';
			//循环拼接题目内容
			for(m = 0;m<=tmxxObj.length-1;m++){
				dcxxHtml += '<label class="col-sm-12 col-md-12">';
				if(tmxxObj[m].XXDF!=''){
					dcxxHtml += '<input id="'+mbnrObj[i].FLBH+'_DaId_' +pgtmObj[j].PGBM 
						+'" name="'+mbnrObj[i].FLBH+pgtmName_Suffix+pgtmObj[j].PGBM
						+'" type="radio" onclick="getFlzf(this)" title="' + pgtmObj[j].PGBM +'" value="'+tmxxObj[m].XXDF+'" /> '
				     		+tmxxObj[m].XXDF+' 分，'+tmxxObj[m].XXBT+' </label>';
				}else{
					//题目小标题缩进两格（以(1)(2)开头）
					if(tmxxObj[m].XXBT.indexOf("(")>=0){
						dcxxHtml += '&nbsp;&nbsp;&nbsp;&nbsp;'+tmxxObj[m].XXBT+' </label>';
					}else{
						dcxxHtml += tmxxObj[m].XXBT+' </label>';
					}	        					
				}
			}
			dcxxHtml+='</div>'
			//---------------------------------------拼接题目内容end---------------------------------------
			dcxxHtml+='</div></div><hr/>';	
		}
		//---------------------------------------拼接总分/分级begin---------------------------------------
		//拼接总分
		if(mbnrObj[i].ZFXH!=''){
			dcxxHtml+='<div class="form-group"><div class="col-md-12">'
					 +'<div class="col-sm-12 col-md-12"><p class="pgdc-second-title">'
					 +mbnrObj[i].ZFXH+' '+mbnrObj[i].ZFBT+'：<u id="'+mbnrObj[i].FLBH+zfId_Suffix+'">'
					 +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u></p></div></div></div>';
		}
		//拼接分级
		dcxxHtml+='<div class="form-group"><div class="col-md-12">'
			+'<div class="col-sm-12 col-md-12"><p class="pgdc-second-title">'
			+mbnrObj[i].FLBH+' '+mbnrObj[i].DJMC
			+'</p></div>'
		//获取等级信息
		var djxxObj = mbnrObj[i].DJXX;		
		dcxxHtml += '<div class="col-sm-12 col-md-12" id="'+mbnrObj[i].FLBH+fjDivId_Suffix+'">';
		//循环拼接等级选项
		for(n = 0;n<=djxxObj.length-1;n++){
			dcxxHtml += '<label class="col-sm-12 col-md-12">';
			dcxxHtml += '<input id="' +mbnrObj[i].FLBH+'_Fjdm" name="'+mbnrObj[i].FLBH+fjmcName_Suffix
				+'" type="radio" title="' + mbnrObj[i].DJMC +'" value="'+djxxObj[n].DJJGBM+'" /> '
		     		+djxxObj[n].DJJGMC;
			if(djxxObj[n].DJZXF!=undefined){
				dcxxHtml+='<input id="'+mbnrObj[i].FLBH+'_Fjdm_Min'+djxxObj[n].DJJGBM+'"'
			     	+' type="text" value="'+djxxObj[n].DJZXF+'" class="hidden">'
			     	+'<input id="'+mbnrObj[i].FLBH+'_Fjdm_Max'+djxxObj[n].DJJGBM+'"'
			     	+' type="text" value="'+djxxObj[n].DJZDF+'" class="hidden">';
			}
			dcxxHtml += '</label>';
		}
		dcxxHtml+='</div></div></div>';
		//---------------------------------------拼接总分/分级end---------------------------------------
		
		dcxxHtml+='</div>';
	}
	//2.动态生成调查分类信息
	$('#pgdc_tabItem').html(dcflHtml);
	//设置第一li标签为活动状态
	$('#pgdc_tabItem').children().first().addClass("active");
	//设置第一个调查分类为活动状态
	//$('#pgdc_Dcfl0').addClass("active");
	$('#pgdc_Dcfl0').attr("aria-expanded",true);        		
	//3.动态生成调查题目信息
	$('#pgdc_tabContent').html(dcxxHtml);
	//设置第一个调查分类对应的内容为活动状态
	$('#dcxxContent0').addClass("in active");
}

//已做过调查，则动态赋值
function setValue(DCNR){
	var dcnrObj = JSON.parse(DCNR);
	//调查分类
	var dcfl;  
	//分类编号
	var flbh;
	//定级结果
	var djjg;
	//总分值
	var zfz;
	//评估结果
	var pgjg;
	//循环调查内容
	for(i = 0;i<=dcnrObj.length-1;i++){	
		dcfl = dcnrObj[i].DCFL;
		flbh = dcnrObj[i].FLBH;
		djjg = dcnrObj[i].DJJG;
		zfz = dcnrObj[i].ZFZ;
		pgjg = dcnrObj[i].PGJG;
		
		//获取总分标签的id，并赋值
		var zfId = flbh+zfId_Suffix;
		if(document.getElementById(zfId)!=undefined){
			document.getElementById(zfId).innerText =zfz;
		}
		//分级radio的name
		var rdFjmcName = flbh+fjmcName_Suffix;
		//根据name和value设置题目答案选中
		$('input[name="'+rdFjmcName+'"][value="'+djjg+'"]').attr('checked','checked');
		
		//评估题目-评估编码
		var pgbm;
		//评估题目-评估选项值
		var pgxxz;
		//评估题目radio的name
		var pgtmName;
		//循环评估结果
		for(j = 0;j<=pgjg.length-1;j++){	
			pgbm = pgjg[j].PGBM;
			pgxxz = pgjg[j].PGXXZ;
			//获取name
			pgtmName = flbh+pgtmName_Suffix+pgbm;
			//根据name和value设置题目答案选中
			$('input[name="'+pgtmName+'"][value="'+pgxxz+'"]').attr('checked','checked');
		}
	}
}

//计算各一级指标的总分
function getFlzf(rdObj){
	if(rdObj.checked){
		var zf=0;
		//根据_分割所选项目的id
		var rdIdArray = rdObj.id.split('_');
		var flbh = rdIdArray[0];
		//分类编号（FLBH）
		console.log('截取的FLBH:'+rdIdArray[0]);
		//循环已选择的radio
		$(":radio:checked").each(
			function(){
				//根据每个一级指标下所有二级指标下的所有选项的前缀相同，查找到目标radio组后求其相加的总分
				if(this.id.indexOf(flbh+'_DaId_')>=0){
					//console.log('相同一级指标下的二级指标的已选答案id:'+this.id);
					zf = zf + Number(this.value);
				}
			}
		);
		console.log('计算得到的总分:'+zf);
		/*var zfId = flbh+'_Zfid_';
		console.log('获取的总分标签id前缀：'+zfId);
			
		//遍历内容中的所有u标签，设置总分
		$("#pgdc_tabContent").find("u").each(function () {  
			console.log('遍历获取的总分标签id：'+$(this).attr("id"));
			//如果当前元素的id以zfId开头，则赋值总分值
			if ($(this).attr("id").indexOf(zfId)>=0) {   
				$(this).text(zf);	
            }
        });*/
		//获取总分标签的id，并赋值
		var zfId = flbh+zfId_Suffix;
		//$(zfId).text(zf);	    //id中.号无法识别
		if(document.getElementById(zfId)!=undefined){
			document.getElementById(zfId).innerText =zf;
		}
		
		//获取分级的div的Id
		var fjDivId = flbh+fjDivId_Suffix;
		//获取分级radio的Id和Name
		var rdFjmcId = flbh+'_Fjdm';
		var rdFjmcName = flbh+fjmcName_Suffix;
		//分级选项的最大值和最小值及对应标签id
		var min;
		var max;
		var minId;
		var maxId;
		
		//设置分级的选项
		var fjxmInputs = document.getElementById(fjDivId).getElementsByTagName('input');
		for (i = 0; i < fjxmInputs.length; i++) {
			// 循环分级div下所有选项radio
			if (fjxmInputs[i].id == rdFjmcId) {
				//根据命名规则获取最大值和最小值input的id
				minId = rdFjmcId+'_Min'+fjxmInputs[i].value;
				maxId = rdFjmcId+'_Max'+fjxmInputs[i].value;
				//如果没有最大值和最小值标签则跳出
				if(document.getElementById(minId)==undefined){
					break;
				}
				//注id中有.号jquery无法直接识别，需在.号前加两个\\,故通过JavaScript获取
				min = document.getElementById(minId).value;
				max = document.getElementById(maxId).value;
				//console.log(minId);
				//console.log(maxId);
				if (zf <= max && zf >= min) {
					fjxmInputs[i].checked=true;
					break;
					//$("input[name="+rdFjmcName+"][value="+fjxmInputs[i].value+"]").attr("checked",true);
				}
			}
		}
	}
}
//保存需求调查数据
function saveXqdc(){
	console.log(xqdcData);
	var xqdcData = getDataByForm();
	$.ajax({
        url: "yyhptpggl.do?action=saveXqdc",
        type: "post",
        dataType: "json",
        data: xqdcData,
        success: function (data) {
            if (data[0].code == "T") {
            	$("#PGDC_DCJLLSH").val(data[0].key);
				wnform.toast('保存成功!');
				dialogModel.close();
				//保存后不弹出表单界面
				if(dcwjBz!="0"){
					//弹出评估调查表单界面
					loadPgglPgdc(editRow);
				}else{
					getDcxx();
				}
            }
            else {
            	wnform.toast('保存失败!'+data[0].message);
            	/*$.toaster({
                    priority: 'warning',
                    title: '提示',
                    message: '保存失败!'+data[0].message
                });*/
            }
        }
   });
}

//获取form数据
function getDataByForm(){
	 var parameters = [];
	 parameters.push(['DCJLLSH', $('#PGDC_DCJLLSH').val()==undefined?"":$('#PGDC_DCJLLSH').val()]);
	 parameters.push(['MBLSH', sMblsh]);
	 parameters.push(['SQLSH', rowPersonInfo.SQLSH]);
	 parameters.push(['YNGRBSH', rowPersonInfo.YNGRBSH]);
	 //parameters.push(['MBNR', sMbnr]);
	 //parameters.push(['DCNR', getDcnrJson()]);
	 var sData = getParameterString(parameters);
	 //sData+='&MBNR='+sMbnr;
	 sData+='&DCNR='+getDcnrJson();
	 sData+='&PGDCBZ=0';
	 return sData;
}

//获取调查内容Json数据
function getDcnrJson(){
	var dcnrJson;   //调查内容json
	var flbh;       //分类编号
	var fjmcName;   //分级radio的name
	var djjg;       //等级结果
	var zfId;       //总分标签id
	var zf;         //总分
	var dcxxContentId; //调查信息内容id
	dcnrJson = '[';
	//遍历tab标题（即一级指标）
	$('#pgdc_tabItem a').each(function(index,element){
		//console.log(this.id);
		//获取分类编号
		flbh = this.name;
		//分级radio的name
		fjmcName = flbh+fjmcName_Suffix;
		//获取总分id
		zfId = flbh+zfId_Suffix;
		//获取调查信息内容div的id
		dcxxContentId = $('#'+this.id).attr("href");
		//console.log(dcxxContentId);
		//获取总分
		if(document.getElementById(zfId)!=undefined){
			zf = document.getElementById(zfId).innerText.trim();
		}else{
			zf = "";
		}
		//获取等级结果
		if($('input[name="'+fjmcName+'"]:checked ').val()!=undefined){
			djjg = $('input[name="'+fjmcName+'"]:checked ').val();
		}else{
			djjg="";
		}
		//拼接调查内容json
		dcnrJson +='{';
		dcnrJson +='"DCFL":"'+this.text+'",';
		dcnrJson +='"FLBH":"'+flbh+'",';
		dcnrJson +='"DJJG":"'+djjg+'",';
		dcnrJson +='"ZFZ":"'+zf+'",';
		dcnrJson +='"PGJG":[';
		$(dcxxContentId+' input:radio:checked').each(function(){
			//console.log(this.name);
			dcnrJson +='{';
			dcnrJson +='"PGBM":"'+this.title+'",';
			dcnrJson +='"PGXXZ":"'+this.value+'"';
			dcnrJson +='},';
		});
		//如果最后一个字符是,则去掉
		if(dcnrJson.substr(dcnrJson.length-1,1)==","){
			dcnrJson = dcnrJson.substring(0,dcnrJson.length-1);
		}
		dcnrJson +=']';
		dcnrJson +='},';
	});	
	//去掉最后一个,
	dcnrJson = dcnrJson.substring(0,dcnrJson.length-1) + ']';
	console.log(dcnrJson);	
	return dcnrJson;
}

function getParameterString(parameters) {
    var url = '';
    for (var i = 0; i < parameters.length; i++) {

        url += parameters[i][0] + '=' + encodeURIComponent(parameters[i][1]);
        if (i < parameters.length - 1) {
            url += '&';
        }
    }
    return url;
}

