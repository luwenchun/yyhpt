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
                	YWXMDM: {
                         required: "业务项目代码必填."
                    },
                 	YWXMMC: {
                         required: "业务项目名称必填."
                    },
                },
                rules: {
                	YWXMDM: {
                        required: true
                    },
                    YWXMMC: {
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
                	datas = datas.replace("--请选择--","");
                	datas = datas.replace("请选择","");
                	var Url="yyhptjcwhywxmb.do?action=insert";
                	if (!document.getElementById("QYBZ").checked) {
                		datas +='&QYBZ='+'0';
					}
                	if (mflag==2)
                		Url="yyhptjcwhywxmb.do?action=update";
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
    }    

    return {
        init: function (t,mflag) {
        	submitData(t,mflag);
        }
    };
}();

$(function () {
    initDictData();
});
function initDictData() {
    $.ajax({
        url : 'yyhptjcwhywxmb.do?action=dists',
        type : 'GET',
        dataType : 'json',
        data : {}
    }).done(function(datas) {
    createSelectByYWXMArray($("#SJXMDM"), datas.dict);
    createSelectByArray($("#LBDM"), datas.typeName);
        if (flag == 2) {
            setControlValue(editRow);
        }
    }).fail(function() {
        console.log("error");
    }).always(function() {
        console.log("complete");
    });
}
