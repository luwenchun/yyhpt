var saveForm = function() {
	var submitData = function (t,yngrbsh,djlsh,gldjdm) {
        var form1 = $('#defaultForm');

        form1.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",  // validate all fields including form hidden input
            messages: {
                jarq: {
                    required: "结案日期必填"
                },
                sqrq: {
                    required: "申请日期必填"
                }
            },
            rules: {
                jarq: {
                    required: true
                },
                sqrq: {
                    required: true
                }
            },

            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            invalidHandler: function (event, validator) {
                $('.alert-danger', $('.form-horizontal')).show();
            },
            success: function (label) {
                label
                    .closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
            	jayysm = $('#jayysm').val();
            	shbtgyy = $('#shbtgyy').val();
                var datas = wn.fillWithForm("defaultForm");
                datas += '&yngrbsh='+yngrbsh;
                datas += '&flag='+jasqOrJash;
                	datas += '&djlsh='+djlsh;
                	datas += '&gldjdm='+gldjdm;
                	datas += '&jayysm='+jayysm;
                	datas += '&shbtgyy='+shbtgyy;
                	datas +='&shzt=1'
                
                var Url = "yyhptqygl.do?action=saveFwjagl";
                $.ajax({
                    url: Url,
                    type: "get",
                    dataType: "json",
                    data: datas,
                    success: function (data) {
						if (data.code=="T") {
							wnform.toast(data.message);
							t.close();
							$table.bootstrapTable('refresh');
						} else {
							wnform.toast(data.message);
						}
                    }
                });
            }
        });
    };

    return {
        //main function to initiate the module
        init: function (t,yngrbsh,djlsh,gldjdm) {
            submitData(t,yngrbsh,djlsh,gldjdm);
        }
    };
}();


$(function(){
	getFwjaPageData();
});

function getFwjaPageData(){
	$.ajax({
		url : 'yyhptqygl.do?action=getFwjaPageDatas',
		type : 'post',
		dataType : 'json',
		async:false,
		data : {
			'yngrbsh' : yngrbsh
		},
		success : function(result) {
			initFwjaDetail(result);
		}
	});
}
function initFwjaDetail(result){
	checkPageHideOrShow();//[结案申请页面][或是结案审核页面]
	var operator = result.operator;
	var colseReason = result.colseReason;
	
	var nrqyPageData = result.nrqyPageData[0];//获取用于保存的[登记流水号]、[管理等级代码]***
	djlsh = nrqyPageData.djlsh;
	gldjdm = nrqyPageData.gldjdm;
	
	if (result.grxx.length != 0) {
		var personalInfo = result.grxx[0];
		wn.setformEdit(personalInfo);
	}
	
	initPagewidget(operator, colseReason);
	
	if (result.pageData.length != 0) {
		var pageData = result.pageData[0];
		checkPageControl(pageData);
		fillPageDatas(pageData);
	} else {
		checkPageControl();
	}
	checkSetDisabled();//控制页面不可编辑放到最后
}

function initPagewidget(operator, colseReason){
	$('#jarq').datepicker({autoclose : true});
    $('#sqrq').datepicker({autoclose : true});
    $('#shrq').datepicker({autoclose : true});
    wn.createSelectByCZRYArray($("#sqrgh"), rylist);
	createiRadioByArrayBase($('#jayydmdiv'), colseReason, 'jayydm', 'jayymc', askAready,jayyChanged);
	
	var closeType = [ {'id' : '1','text' : '中止'}, {'id' : '2','text' : '终止'}, {'id' : '3','text' : '解除中止'} ];
	wn.createiRadioWidthByArray($('#jalxdiv'), closeType, 'jalx','jalxmc',4);
	
	if (checkJashOrJash()) {//结案审核
		wn.createSelectByCZRYArray($("#shrgh"), operator);
		var auditInstitutions = [ {'id' : '1','text' : '通过'}, {'id' : '2','text' : '不通过'} ];
		createiRadioByArrayBase($('#shjgdiv'), auditInstitutions, 'shjg','shjgmc', 0, shjgChanged, 6);
	}
}

function checkJashOrJash(){
	if (jasqOrJash == 1) {//结案申请
		return false;
	} else if (jasqOrJash == 2) {//结案审核
		return true;
	}
}
//结案申请时控制审核部分为不显示
function checkPageHideOrShow(){
	if(!checkJashOrJash()){//结案申请
		document.getElementById("id_shjg").style.display ='none';
	} 
}

function checkPageControl(fwjaxx){
	if (fwjaxx != undefined) {
		var jayydm = fwjaxx.jayydm;
		var shjg = fwjaxx.shjg;
		if (jayydm != '4') {
			$('#jayysm').hide();
		} else {
			$('#jayysm').val(fwjaxx.jayysm);
		}
		if (shjg != '2') {
			$('#shbtgyy').hide();
		} else {
			$('#shbtgyy').val(fwjaxx.shbtgyy);
		}
	} else {
		$('#jayysm').hide();
	}
	
};

function checkSetDisabled(){
	if (checkJashOrJash()) {//结案审核
		setJasqDisabled();
	}
	if(jashFlag==1){//已结案
		setJasqDisabled();
		setJashDisabled();
		$('#saveJasq').attr('disabled',true);
	}
}

//控制结案申请页面不可编辑
function setJasqDisabled(){
	document.getElementById("id_jasq").style.backgroundColor = '#eee';
	document.getElementById("id_jasq").style.cursor = 'not-allowed';
	document.getElementById("jayysm").disabled = 'disabled';
	document.getElementById("jalxdiv").style.backgroundColor = '#eee';
	document.getElementById("jarq").style.backgroundColor = '#eee';
	document.getElementById("sqrq").style.backgroundColor = '#eee';
	document.getElementById("jarq").disabled = 'disabled';
	document.getElementById("sqrgh").disabled = 'disabled';
	document.getElementById("sqrq").disabled = 'disabled';
	
	$("input[name='jayymc']").attr('disabled',true);
	$("input[name='jalxmc']").attr('disabled',true);
}
//控制结案审核页面不可编辑
function setJashDisabled(){
	$("#shrq").attr('disabled',true);
	$("#shrgh").attr('disabled',true);
	document.getElementById("id_shjg").style.backgroundColor = '#eee';
	document.getElementById("id_shjg").style.cursor = 'not-allowed';
	document.getElementById("shrq").style.backgroundColor = '#eee';
	document.getElementById("shbtgyy").style.backgroundColor = '#eee';
	document.getElementById("shrq").style.cursor = 'not-allowed';
	document.getElementById("shbtgyy").style.cursor = 'not-allowed';
	$("input[name='shjgmc']").attr('disabled',true);
}

function createiRadioByArrayBase(selObject, array, fieldID, fieldName, iflag, callback, split){
	var selectBody = "";
	var i = 0;
	var chk = " checked";
	$.each(array, function(){
		if (i == 0) {
			chk = " checked";
		} else {
			chk = "";
		}
		selectBody +="<label class=\"control-content col-md-" + split
			+ "   top: -1px !important;\" style=\"padding-left: 0;padding-right: 0;\" >"
			+ " <input type=\"radio\" id=\"" + fieldID
			+ "\"  name=\"" + fieldName + "\" value=\"" + this.id + "\""
			+ "\"  title=\"" + this.text + "\""
			+ chk + " \" > " + this.text + "</label>";
		i++;
	});
	selObject.html(selectBody);
	if (iflag == 0) {
		selObject.iCheck({
	        checkboxClass: 'icheckbox_flat-wnred',
	        radioClass: 'iradio_flat-wnred',
	        increaseArea: '20%'
	    });
	} 
	$("input").on('ifChecked', function (event) {
		callback(this);
	});
}
function jayyChanged(obj) {
	if ($(obj).is(':checked') && $(obj).val()==4) {
		$('#jayysm').show();
		jayysm = $('#jayysm').val();
		$('#jayysm').val(jayysm)
    } else {
		$('#jayysm').hide();
		$('#jayysm').val('');
    }
}
function shjgChanged(obj) {
	if ($(obj).is(':checked') && $(obj).val()==2) {
		$('#shbtgyy').show();
		shbtgyy = $('#shbtgyy').val();
		$('#shbtgyy').val(shbtgyy);
    } else {
		$('#shbtgyy').hide();
		$('#shbtgyy').val('');
    }
}

