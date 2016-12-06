<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link href="frame/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css" rel="stylesheet"/>
<link href="frame/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css" rel="stylesheet"/>
<link href="frame/plugins/select2/v3/select2.css" rel="stylesheet"/>
<link href="frame/plugins/select2/v3/select2-bootstrap.css" rel="stylesheet"/>
</head>
<body>

<form id="defaultForm" method="post" class="form-horizontal ">
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="form-group ">
                <div class="form-group col-md-5">
                    <label class="col-md-4 control-label"><span
                            class="required"> * </span>频次代码：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control  input-sm " maxlength="10"
                               name="PCDM" id="PCDM" placeholder="请输入频次代码"/>
                    </div>
                </div>
                <div class="form-group col-md-5">
                    <label class="col-md-4 control-label"><span
                            class="required"> * </span>频次名称：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control  input-sm " maxlength="100"
                               name="PCMC" id="PCMC" placeholder="请输入频次名称"/>
                    </div>
                </div>
                <div class="form-group col-md-2 col-md-push-1 col-xs-push-1">

                    <label class="checkbox"> <input type="checkbox" name="QYBZ"
                                                    id="QYBZ" value="1" checked="checked"/>启用标志
                    </label>
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
                <div class="form-group col-md-12">
                    <label class="col-md-2 control-label">执行单位：</label>
                    <div id="zxdwdiv" class="form-group col-md-10"></div>
                    <input type="text" class="form-control   input-sm hidden"
                           id="ZXDWMC" name="ZXDWMC" placeholder=""/>
                </div>
            </div>
            <hr style="margin-bottom: 10px">
            <div class="form-group">
                <div class="form-group col-md-12">
                    <label class="col-md-2 control-label"><span
                            class="required"> * </span>执行时间：</label>
                    <div class="col-md-2">
                        <input type="text" class="form-control  input-sm " maxlength="2"
                               name="DWCS" id="DWCS" placeholder=""/>
                    </div>
                    <div class="col-md-1 control-label" id="ZXDWMC2">年</div>
                    <div class="col-md-2">
                        <input type="text" class="form-control  input-sm " maxlength="2"
                               name="ZXCS" id="ZXCS" placeholder=""/>
                    </div>
                    <div class="col-md-3 control-label" id="id_note">次 (<strong
                            style="color: #e02222">注：执行时间非自然年月</strong>)
                    </div>

                </div>
            </div>
            <div class="form-group" style="margin-top: 10px;">
                <div class="form-group col-md-12">
                    <div class="col-md-offset-1 col-md-8 input-group" id="id_group_datetimepicker">
                        <input class="form-control select2 bootstrap-tagsinput" id="id_input_add" title="执行时间">
                    <span class="input-group-btn">
                        <button id="id_btn_remove" class="btn btn-default btn-flat" type="button">
                            <i class="fa fa-remove"></i>
                            </button>
                    </span>
                    <span class="input-group-btn">
						<button id="id_btn_add" class="btn btn-default btn-flat" type="button">
                            <i class="fa fa-calendar"></i>
                        </button>
					</span>
                    </div>
                </div>
            </div>


            <hr style="margin-bottom: 10px">
            <div class="form-group">
                <div class="form-group col-md-6">
                    <label class="col-md-4 control-label"><span class="required"> * </span>时间范围：</label>
                    <div class="col-md-5">
                        <input type="text" class="form-control  input-sm " maxlength="10"
                               name="SJFW" id="SJFW" placeholder="请输入天数"/>
                    </div>
                    <div class="col-md-2 control-label" id="id_sjfw_dw">天</div>
                </div>
            </div>
            <hr style="margin-bottom: 10px">
            <div class="form-group">
                <div class="form-group col-md-6">
                    <label class="col-md-4 control-label">备注：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control  input-sm " multiple="multiple"
                               name="BZ" id="BZ" placeholder="请输入备注"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>



<script src="frame/plugins/bootstrap-tagsinput/bootstrap-tagsinput.js" type="text/javascript"></script>
<script src="frame/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="frame/plugins/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js" type="text/javascript"
        charset="utf-8"></script>
<script src="frame/plugins/select2/v3/select2.js" type="text/javascript"></script>


<script src="frame/plugins/jquery-validation/js/jquery.validate.js"
        type="text/javascript"></script>
<script src="yyhpt/pages/jcsj/fwpcDetail.js" type="text/javascript"></script>
</body>
</html>