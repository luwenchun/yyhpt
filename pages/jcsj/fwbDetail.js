var rqlbdata;  //人群类别基础数据
//获取人群类别基本数据
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
                FWBDM: {
                    required: "服务包代码必填."
                },
                FWBMC: {
                    required: "服务包名称必填."
                }
            },
            rules: {
                FWBDM: {
                    required: true
                },
                FWBMC: {
                    required: true
                }
            },

            // highLight error inputs
            highlight: function (element) {
                // set error class to the control group
                $(element).closest('.form-group').addClass('has-error');
            },

            invalidHandler: function (event, validator) {
                //display error alert on form submit
                $('.alert-danger', $('.form-horizontal')).show();
            },
            success: function (label) {
                label
                    .closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                var datas = wn.fillWithForm("defaultForm");
                datas += '&fwxms=' + strFwxms;
                if (strFwxms == ''){
                    wnform.toast("无服务项目，请添加!");
                } else {
                console.log('----------------------------------------');
                if (!document.getElementById("QYBZ").checked) {
            		console.log('QYBZ unchecked');
            		datas +='&QYBZ=0';
				}
                var Url = "yyhptjcwhfwb.do?action=insert";
                if (flag == 2)
                    Url = "yyhptjcwhfwb.do?action=update";
                $.ajax({
                    url: Url,
                    type: "post",
                    dataType: "json",
                    data: datas,
                    success: function (data) {
                        console.log('<<<<<<<<<<<>>>>>>>>>>>>>>');
                        console.log(data);
                        upload(data);
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

/*
 * 人群类型选项 01，健康人群 02，亚健康 03，疾病 04 康复（目前为固定值）
 */
function setRqlx(flag, className) {
    var count = 1;
    var rqlb;
    $("button[name='btnrq']").each(function () {
        $(this).removeClass('btn-success btn-danger btn-warning btn-info');
        if ($(this).attr('id') == flag.id) {
            rqlb = '0' + count;
        }
        ++count;
    });
    $('#' + flag.id).addClass(className);
    wn.createRdoWidthByArray($("#jblzdiv"), rqlbdata[rqlb], "rqmc", 2);

}


function getDists() {
    if (rqlbdata == undefined || rqlbdata == null) {
        $.ajax({
            url: "jkglzkpggr.do?action=dists",
            type: "post",
            dataType: "json",
            data: {},
            success: function (data) {
                rqlbdata = data.rqfl;
            }
        });
    }
}

crowdSelectDialog = function () {
    BootstrapDialog.show({
        size: BootstrapDialog.SIZE_WIDE,
        title: '请选择人群分类',
        message: $('<div></div>').load('jkglfwtc.do?action=selectCrowd'),
        buttons: [{
            label: '确定',
            action: function (dialog) {
                //更新fwxms中的数据
                var selectRadios = $("input[type='radio'][name='rqmc']:checked");
                if (selectRadios.length > 0) {
                    var crowdName = selectRadios[0].nextSibling.nodeValue;
                    var crowdID = selectRadios[0].value;
                    $("#syrqmc").val(crowdName);
                    $("#syrqdm").val(crowdID);
                    console.log('crowdName=' + crowdName);
                    console.log('crowdID=' + crowdID);
                }

                dialog.close();
            }
        }],
        onshow: function () {
        },
        onshown:function(){
            $('#btnjk').on('click', function () {
                setRqlx(this, 'btn-success');
                return false;
            });
            $('#btnyjk').on('click', function () {
                setRqlx(this, 'btn-warning');
                return false;
            });
            $('#btnjb').on('click', function () {
                setRqlx(this, 'btn-danger');
                return false;
            });
            $('#btnkf').on('click', function () {
                setRqlx(this, 'btn-info');
                return false;
            });
            jQuery('#btnjk').click();
        },
        onLoadSuccess: function () { // 加载成功时执行
        },
        onLoadError: function () { // 加载失败时执行
            alert("error");
        }
    });
};
var upload = function upload(data) {
    var formData = getFileData("#defaultForm");
    formData.append("fwbdm", data.key);
    event.preventDefault();
    $.ajax({
        url: 'yyhptjcwhfwb.do?action=upload',
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