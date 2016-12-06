var saveForm = function() {
	// basic validation 1=新增 2=修改
	var submitData = function(t, mflag) {

		var form1 = $('#defaultForm');
		form1.validate({
			errorElement : 'span', // default input error message container
			errorClass : 'help-block help-block-error', // default input error
														// message class
			focusInvalid : false, // do not focus the last invalid input
			ignore : "", // validate all fields including form hidden input
			messages : {
				LSH : {
					required : "流水号必填."
				},
				CCGC : {
					required : "存储过程必填."
				},
			},
			rules : {
				LSH : {
					required : true
				},
				CCGC : {
					required : true
				},
			},

			highlight : function(element) { // hightlight error inputs
				$(element).closest('.form-group').addClass('has-error'); 
			},

			invalidHandler : function(event, validator) { 
				$('.alert-danger', $('.form-horizontal')).show();
			},

			success : function(label) {
				label.closest('.form-group').removeClass('has-error'); 
			},

			submitHandler : function(form) {
				var datas = wn.fillWithForm("defaultForm");
				datas = datas.replace("--请选择--", "");
				datas = datas.replace("请选择", "");
				if (!document.getElementById("QYBZ").checked) {
            		console.log('QYBZ unchecked');
            		datas +='&QYBZ='+'0';
				}
				var Url = "yyhptjcwhjkztscccgc.do?action=insert";

				if (mflag == 2)
					Url = "yyhptjcwhjkztscccgc.do?action=update";
				$.ajax({
					url : Url,
					type : "get",
					dataType : "json",
					data : datas,
					success : function(data) {
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
	}

	return {
		init : function(t, mflag) {
			submitData(t, mflag);
		}
	};
}();

$(function () {
	if (flag == 2) {
		console.log('this is saveProcedure...')
		setControlValue(editRow);
	}

});