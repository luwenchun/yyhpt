function init() {
	/**
	 * 初始化
	 */
	$.ajax({
		url : 'yyhpttjfx.do?action=getDicts',
		type : 'post',
		dataType : 'json',
		data : { },
		success : function(datas){
			var xbdm = datas.xbdm;
			var zjlx = datas.zjlx;
			console.log('datas:'+JSON.stringify(datas))
//			if (!xbdm && typeof(xbdm) != 'undefined' && xbdm != 0) {
//				console.log('=====')
//						} else {
//				console.log('loading xbdm error!')
//			}
			var xbdmList = [{"id":"1","text":"男性"},{"id":"2","text":"女性"}]
			wn.createiRadioWidthByArray($("#xbdm"), xbdmList, "xbdm", "xbmc", 6);
			wn.iCheckInit();
			wn.createSelectByArray($('#zjlx'), zjlx,'--请选择证件类型--');
		}
	});
	
}
init();
//发送验证码
$('#sendyzm').bind('click', function(){
	
});

var saveForm = function () {
    var submitData = function() {
            var form1 = $('#defaultForm');
            form1.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",  // validate all fields including form hidden input
                messages: {
//                	sjh: {
//                         required: "必填."
//                    },
                },
                rules: {
//                    sjh: {
//                        required: true
//                    },
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
                	var datas= wn.fillWithForm("defaultForm");  
                	console.log('注册数据datas：'+datas);
                	var Url="yyhpttjfx.do?action=register";
                	 $.ajax({
						url : Url,
						type : "GET",
						dataType : "json",
						data :datas, 					
						success : function(data) {
							console.log('zhuce success!')
//							$.toaster({priority: 'success', title: '提示', message: "注册成功!"});
						}
					});
                }
            });
    }    
    return {
        init: function () {
        	submitData();
        }
    };
}();

function checkData() {
	if ($('#sjh').val()==""){
		$.toaster({priority: 'warning', title: '提示', message: "请输入手机号!"});
		return false;
	} else if ($('#sjh').val().length <11){
		$.toaster({priority: 'warning', title: '提示', message: "请输入正确的手机号码!"});
		return false;
	}
	
	if ($('#mm').val()==""){
		$.toaster({priority: 'warning', title: '提示', message: "密码为空!"});
		return false;
	}
	if ($('#mm').val() != $('#qrmm').val()) {
		$.toaster({priority: 'warning', title: '提示', message: "两次密码不一致!"});
		return false;
	}
	if ($('#xm').val()==""){
		$.toaster({priority: 'warning', title: '提示', message: "姓名为空!"});
		return false;
	}
	if ($('#csrq').val()==""){
		$.toaster({priority: 'warning', title: '提示', message: "请选择出生日期!"});
		return false;
	}
	if ($('#zjlx').val()==""){
		$.toaster({priority: 'warning', title: '提示', message: "请选择证件类型!"});
		return false;
	}
	if ($('#zjhm').val()==""){
		$.toaster({priority: 'warning', title: '提示', message: "请输入证件号码!"});
		return false;
	}
//	alert(document.getElementById("tyyhxy").checked);
//	alert($("#tyyhxy").attr("checked"));
	if (!(document.getElementById("tyyhxy").checked)) {
		$.toaster({priority: 'warning', title: '提示', message: "请同意协议书!"});
		return false;
	}
	return true;
}
$('#register').bind('click', function(){
	if (checkData()){
		saveForm.init();
		$('#defaultForm').submit();
		$.toaster({priority: 'info', title: '提示', message: "注册成功!"});
		console.log('success!')
	}
});
