var saveForm = function () {

    // basic validation  1=新增 2=修改
    var submitData = function (t, flag) {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

        var form1 = $('#defaultForm');
        form1.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",  // validate all fields including form hidden input
            messages: {
                PCDM: {
                    required: "频次代码必填."
                },
                PCMC: {
                    required: "频次名称必填."
                },
                SJFW: {
                    required: '时间范围必填.',
                    number : "请输入合法的数字",
                    min : "请输入大于0的数字"
                },
                DWCS: {
                	required: '执行单位必填.',
                    number : "请输入合法的数字",
                    min : "请输入大于0的数字"
                },
                ZXCS: {
                	required: '执行次数必填.',
                    number : "请输入合法的数字",
                    min : "请输入大于0的数字"
                },
                id_input_add:{
                    required:'必选.'
                }
                
            },
            rules: {
                PCDM: {
                    required: true
                },
                PCMC: {
                    required: true
                },
                SJFW: {
                    required: true
                },
                DWCS: {
                	required: true
                },
                ZXCS: {
                	required: true
                },
                id_input_add:{
                    required:true
                }
            },

            highlight: function (element) { // hightlight error inputs
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
                var dataDetails = getExecuteTime2Save();
                
                var data = wn.fillWithForm("defaultForm");
                data += '&details='+ JSON.stringify(dataDetails);
                console.log('data:'+data);
                if (!document.getElementById("QYBZ").checked) {
            		console.log('QYBZ unchecked');
            		datas +='&QYBZ='+'0';
				}
                if ($('#id_input_add').val()==''){
                    wnform.toast('执行时间必填!');
                } else {
                    var Url = "yyhptjcwhfwpc.do?action=insert";
                    if (flag == 2)
                        Url = "yyhptjcwhfwpc.do?action=update";
                    $.ajax({
                        url: Url,
                        type: "GET",
                        dataType: "json",
                        data: data,
                        success: function (data) {
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
            }
        });
    };
    return {
        //main function to initiate the module
        init: function (t, flag) {
            submitData(t, flag);
        }
    };
}();


var CheckData = function () {
    $("input[name='PCDM']").bind("click", function () {
        var check = $(this).val();
        if (check == 0) {
            $("#CCGCMX").attr("disabled", false);
            $("#JKFWMX").attr("disabled", true);
            $("#JKFWMX").val("");
        }
        else {
            $("#CCGCMX").attr("disabled", true);
            $("#JKFWMX").attr("disabled", false);
            $("#CCGCMX").val("");
        }
    });
};

jQuery(document).ready(function () {
	initControls();
    setHtml(zxdwArr);
    // 修改
    if (flag == 2) {
        setControlValue(editRow);
        getDetails(editRow);
    }
    else {
        $('#ZXDWMC')[0].value = "年";
        zxdw.id = '01';
        zxdw.name = '年';
        addExecuteTime();
    }
});