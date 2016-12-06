<%--
  Created by IntelliJ IDEA.
  User: Mr.Wang
  Date: 2016/9/3
  Time: 22:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>养护管理等级编辑页面</title>
</head>
<body>
<form id="defaultForm" method="post" class="form-horizontal ">
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="form-group">
                <div class="form-group col-md-6">
                    <label class="col-md-4 control-label"><span
                            class="required"> * </span>养护等级代码：</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control  input-sm " maxlength="2"
                               name="gldjdm" id="gldjdm" placeholder="" />
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label class="col-md-4 control-label"><span
                            class="required"> * </span>养护等级名称：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control  input-sm " maxlength="50"
                               name="gldjmc" id="gldjmc" placeholder="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">服务频次设置</h3>
        </div>
        <div class="panel-body">
            <div class="form-group">
                <div class="form-group col-md-6">
                    <label class="col-md-4 control-label pull-left">频次名称：</label>
                    <div class="col-md-8">
                        <select id="pcdm" name="pcmc" class="form-control" maxlength="8" style="width: 100%;"></select>
                    </div>
                </div>
                <%--<div class="form-group col-md-6 hidden">
                    <label class="col-md-4 control-label">频次名称：</label>
                    <div class="col-md-8">
                        <select id="pcmc" name="pcmc" class="form-control" maxlength="15" style="width: 100%;"></select>
                    </div>
                </div>--%>
            </div>
        </div>
    </div>
</form>
<script>
    $(function () {
        getDicts();
    });

    function getDicts() {
        $.ajax({
            url: 'yyhpt_yhdjwh.do?action=getDict',
            type: 'post',
            dataType: 'json',
            data: {},
            success: function (data) {
                console.log(data.dict);
                wn.createSelectByArray($('#pcdm'), data.dict, '--请选择--');
            }
        });
    }
    
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
                    gldjdm : {
                        required : "管理等级代码必填."
                    },
                    gldjmc : {
                        required : "管理等级名称必填."
                    },
                    pcdm : {
                        required : "频次名称必选."
                    }
                },
                rules : {
                    gldjdm : {
                        required : true
                    },
                    gldjmc : {
                        required : true
                    },
                    pcdm : {
                        required : true
                    }
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
                    console.log('>>>>>>>>>>>>>>>>>>>>')
                    var datas = wn.fillWithForm("defaultForm");
                    console.log(datas);
                    var Url = "yyhpt_yhdjwh.do?action=insert";
                    if (mflag == 2)
                        Url = "yyhpt_yhdjwh.do?action=update";
                    $.ajax({
                        url : Url,
                        type : "post",
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
</script>
</body>
</html>
