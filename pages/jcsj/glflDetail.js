var saveForm = function () {
    // basic validation  1=新增 2=修改
    var submitData = function(t,mflag) {
            var form1 = $('#defaultForm');
            form1.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",  // validate all fields including form hidden input
                messages: {
                	RQDM: {
                         required: "项目代码必填."
                    },
                    RQMC: {
                         required: "项目名称必填."
                    },
                },
                rules: {
                	RQDM: {
                        required: true
                    },
                    RQMC: {
                        required: true
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
                	var datas= wn.fillWithForm("defaultForm");  
                	console.log('datas====>'+datas);
                	datas = datas.replace("--请选择--","");
                	datas = datas.replace("请选择","");
                	if (!document.getElementById("QYBZ").checked) {
                		console.log('QYBZ unchecked');
                		datas +='&QYBZ='+'0';
					}
                	var Url="yyhptjcwhglfl.do?action=insert";
                	//alert(datas);
                	if (mflag==2)
                		Url="yyhptjcwhglfl.do?action=update";
                	 $.ajax({
						url : Url,
						type : "get",
						dataType : "json",
						data :datas, 	
						success : function(data) {
                            if (data.code=="T"){
                                wnform.toast(data.message);
                                $table.bootstrapTable('refresh');
                                t.close();
                            } else {
                                wnform.toast(data.message);
                            }
						}
					});
                }
            });
    }
    return {
        init: function (t,mflag) {
        	submitData(t,mflag);
        }
    };
}();