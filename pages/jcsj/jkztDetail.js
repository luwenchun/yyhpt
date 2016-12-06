var saveForm = function () {
    // basic validation  1=新增 2=修改
    var submitData = function(t,flag) {
            var form1 = $('#defaultForm');
            form1.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",  // validate all fields including form hidden input
                messages: {
                	ZTDM: {
                         required: "主题编码必填."
                    },
                 	ZTMC: {
                         required: "主题名称必填."
                    }, 
                    NLDQ:{
                         digits: "只能输入整数"
                        
                    },
                    NLDZ:{
                         digits: "只能输入整数",
                         minLeft:"不能小于起始年龄"
                   }
                },
                rules: {
                    ZTDM: {
                        required: true
                    },
                    ZTMC: {
                        required: true
                    },
                    NLDQ:{
                        digits:true,
                        min:0
                       // ,maxRight:"#nldz"
                    },
                    NLDZ:{
                        digits:true,
                        min:0,
                        minLeft:"#NLDQ"
                    }
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
                	datas = datas.replace("--请选择--","");
                	datas = datas.replace("请选择","");
                	if (!document.getElementById("QYBZ").checked) {
                		console.log('QYBZ unchecked');
                		datas +='&QYBZ='+'0';
					}
                	var Url="yyhptjcwhjkztscb.do?action=insert";
                	if (flag==2)
                		Url="yyhptjcwhjkztscb.do?action=update";
                	 $.ajax({
						url : Url,
						type : "get",
						dataType : "json",
						data :datas, 					
						success : function(data) {
                            if (data.code=="T"){
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
        init: function (t,flag) {
        	submitData(t,flag);
        }
    };
}();
