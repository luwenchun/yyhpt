var saveForm = function () {
    // basic validation  1=新增 2=修改
    var submitData = function(t,flag) {
        // for more info visit the official plugin documentation: 
            // http://docs.jquery.com/Plugins/Validation

            var form1 = $('#defaultForm');
            form1.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",  // validate all fields including form hidden input
                messages: {
                	XMDM: {
                         required: "项目代码必填."
                    },
                 	XMMC: {
                         required: "项目名称必填."
                    },
                    SFXMDM : {
        				number : "请输入合法的数字",
        				min : "请输入大于0的数字"
        			},
        			GNDM: {
                        required: "功能代码必填."
                   },
                   BZMS: {
                	   required: "标准描述必填."
                   },
                },
                rules: {
                    XMDM: {
                        required: true
                    },
                    XMMC: {
                        required: true
                    },
                    SFXMDM : {
        				required : false,
        				number : true,
        				min : 0
        			},
        			GNDM: {
                        required: true
                    },
                    BZMS: {
                    	required:true
                    },
                },
                
                highlight: function(element) { // hightlight error inputs
                    $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                invalidHandler: function (event, validator) { //display error alert on form submit              
                	$('.alert-danger', $('.form-horizontal')).show();
                },
          

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },
                
                submitHandler: function (form) {
                    var yyhcList = getYycTableVal();
                    var datas= wn.fillWithForm("defaultForm");
                	datas = datas.replace("--请选择--","");
                	datas = datas.replace("请选择","");
                	if ($('#ZDSJ').val() == '') {
						datas = datas.replace('&ZDSJ=','');
					}
                	if ($('#ZCSJ').val() == '') {
                		datas = datas.replace('&ZCSJ=','');
                	}
                	if (!document.getElementById("QYBZ").checked) {
                		console.log('QYBZ unchecked');
                		datas +='&QYBZ='+'0';
					}
                	if (!document.getElementById("YZBZ").checked) {
                		console.log('YZBZ unchecked');
                		datas +='&YZBZ='+'0';
                	}
                	//修改项目耗材对照时需项目名称
                    datas += '&DZ_XMDM=' + $("#XMDM").val();
                    //待修改/增加的对照耗材列表
                    datas += '&YYHC=' + JSON.stringify(yyhcList);
                	var Url="yyhptjcwhfwxm.do?action=insertXmhcdz";
                	
                	if (flag==2)
                		Url="yyhptjcwhfwxm.do?action=updateXmhcdz";
                	 $.ajax({
						url : Url,
						type : "POST",
						dataType : "json",
						data :datas, 					
						success : function(data) {
							upload(data);
							if (data.code=="T"){
                                //insertOrUpdateXmhcdz(yyhcList, flag);
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
    }    
    return {
        //main function to initiate the module
        init: function (t,flag) {
        	submitData(t,flag);
        }
    };
}();

function getDictData(row,mflag){
	$.ajax({
        url: 'yyhptjcwhfwxm.do?action=dictData',
        type: 'post',
        dataType: 'json',
        data: {},
        success: function (data) {
            var fwpcList = data.fwpcList;
            createSelectByFWPCArray($("#PCDM"), fwpcList);
            initPageDatas(row,mflag);
        }
    });
}

function initPageDatas(row,mflag){
    if (mflag == '2') {
        setControlValue(row);
        $.ajax({
            url: 'yyhptjcwhfwxm.do?action=dists',
            type: 'post',
            dataType: 'json',
            data: {XMDM: row.XMDM},
            success: function (data) {
                var fwxmList = data.fwxmList;
                var fwxmbzList = data.fwxmbzList;
                if (fwxmList){
                	if(fwxmList[0].XMTP){
						$.fn.fileinput("show", "uploadfiles/FWXM", fwxmList[0].XMDM, fwxmList[0].XMTP, "fjdzDiv", "fileDiv");
					}else{
						$.fn.fileinput("show", "uploadfiles/FWXM", null, null, "fjdzDiv", "fileDiv");
					}
					$('#XMFBT').val(fwxmList[0].XMFBT);
                    setControlValue(fwxmList);
                }
                if (fwxmbzList){
                    setControlValue(fwxmbzList);
                }
            }
        });
    }
}


/**
 * [description] 初始化页面 事件注册
 */
$(function() {
	initButtons();
	getDictData(editRow, flag);
	/**
	 * [description] 绑定点击事件
	 */
	$("#addywxm").bind("click", function() {
		selectModelFunc("选择业务项目", 2);
	});

    $('#plus').bind("click", function () {
        selectYyhcFunc("选择医用耗材", flag);
    });
	
	$("#kfsbz").change( function() {

	    var chk = document.getElementById("kfsbz");
	    if(!chk.checked){
	    	$('#fssm').attr('readOnly',true);
	    	$('#fssm').val("");
	    }else{
	    	$('#fssm').attr('readOnly',false);
	    }

	});
	
	$("#kzcbz").change( function() {
	    var chk = document.getElementById("kzcbz");
	    if(!chk.checked){
	    	$('#zcsm').attr('readOnly',true);
	    	$('#zcsm').val("");
	    }else{
	    	$('#zcsm').attr('readOnly',false);
	    }
	});

})

var CheckData = function() {
	$("input[name='XMDM']").bind("click",function(){
		var check=$(this).val();
		if (check==0)
		{
		    $("#ccgcmx").attr("disabled",false);
		    $("#jkfwmx").attr("disabled",true);
		    $("#jkfwmx").val("");
		}
		else
		{
			$("#ccgcmx").attr("disabled",true);
		    $("#jkfwmx").attr("disabled",false);
		    $("#ccgcmx").val("");
		}
	});
}

jQuery(document).ready(function() {
	// saveForm.init(t);
	 CheckData();
});

var upload = function upload(data) {
	var formData = getFileData("#defaultForm");
	formData.append("xmdm", data.key);
	event.preventDefault();
	$.ajax({
		url: 'yyhptjcwhfwxm.do?action=upload',
		type: 'POST',
		data: formData,
		dataType: 'json',
		contentType: false,
		processData: false,
		success: function (res) {
		},
		error: function () {
			wnform.toast('上传附件失败！');
		}
	});
};