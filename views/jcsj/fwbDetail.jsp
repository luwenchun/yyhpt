<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <link href="frame/plugins/bootstrap-fileinput/bootstrap-fileinput-mulitple.css" rel="stylesheet" type="text/css"/>
    <style type="text/css">
        .list-row-space {
            margin: 3px 0 3px 0;
        }
    </style>
</head>
<body>
<form id="defaultForm" method="post" class="form-horizontal ">
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="form-group col-md-12 list-row-space">
                <div class="form-group col-md-5">
                    <label class="col-md-5 control-label"><span class="required"> * </span>
                        <i class='fa fa-code'></i>&nbsp;服务包代码：
                    </label>
                    <div class="col-md-7 nopadding">
                        <input type="text" class="form-control  input-sm " maxlength="6"
                               name="FWBDM" id="FWBDM" placeholder=""/>
                    </div>
                </div>
                <div class="form-group col-md-5">
                    <label class="col-md-5 control-label"><span
                            class="required"> * </span><i class='fa fa-book'></i>&nbsp;服务包名称：</label>
                    <div class="col-md-7 nopadding">
                        <input type="text" class="form-control  input-sm " maxlength="100"
                               name="FWBMC" id="FWBMC" placeholder=""/>
                    </div>
                </div>
                <div class="form-group col-md-2 col-md-push-1 col-xs-push-1">
                    <label class="checkbox">
                        <input type="checkbox" name="QYBZ" id="QYBZ" value="1" checked="checked"/>&nbsp;启用标志
                    </label>
                </div>
            </div>

            <div class="form-group col-md-12 list-row-space">
                <div class="form-group col-md-5">
                    <label class="col-md-5 control-label"><i class='fa fa-rmb'></i>&nbsp;合计价格：</label>
                    <div class="col-md-7 nopadding">
                        <input type="number" class="form-control  input-sm " min=0
                               name="HJJG" id="HJJG" readonly="readonly" value="0"/>
                    </div>
                </div>
                <div class="form-group col-md-5">
                   <%-- <label class="col-md-4 control-label"><i class='fa fa-child'></i>&nbsp;服务包副标题：</label>
                    <div class="col-md-8">
                        <div class="input-group  input-group-sm ">
                            <input type="text" class="form-control input-sm"
                                   id="syrqmc" name="syrqmc" placeholder="" readonly>
                            <div id="btn_syrq" class="input-group-addon" style="border-left: 0">
                                <i class="fa fa-dropbox"></i>
                            </div>
                        </div>
                    </div>--%>
                       <label class="col-md-5 control-label"><i class='fa fa-book'></i>&nbsp;服务包副标题：</label>
                       <div class="col-md-7 nopadding">
                           <input type="text" class="form-control  input-sm " maxlength="100"
                                  name="FWBFBT" id="FWBFBT" placeholder=""/>
                       </div>
                </div>
            </div>
            <div class="form-group  col-md-12 list-row-space">
                <label class="col-md-2 control-label" style="padding-right: 8px;">附件：</label>
                <div class="col-md-7 nopadding">
                    <div id="fileDiv" class="col-md-10 col-sm-10"
                         style="padding-left: 0px;padding-right: 0px;">
                        &nbsp;
                        <div id="fjdzDiv" class="fileinput fileinput-new" data-provides="fileinput"><span
                                class="btn btn-default btn-sm btn-file">	<span
                                class="fileinput-new"> 选取文件 </span>	<span
                                class="fileinput-exists"></span>	<input type="file"
                                                                           name="fileInput"> </span>&nbsp;<span
                                id="fbt01" class="fileinput-filename"></span> &nbsp;<a href="javascript:;"
                                                                                       class="close fileinput-exists"
                                                                                       data-dismiss="fileinput"> <img
                                style="padding-top: 0px" src="./layouts/img/control/img_close.png"></a></div>
                    </div>
                </div>

            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-body" id="tccontent">
                <div class="row" id="AddAlertDiv">
                    <div id="myAddAlert" class="alert alert-default">
                        <h5>无服务项目，请添加服务项目！</h5>
                    </div>
                </div>
                <div id="tcdetail"></div>
            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-body">
                <div class="form-group ">
                    <label class="col-md-1 control-label">备注：</label>
                    <div class="col-md-11" id="notes">
                <textarea class="form-control  input-sm "
                          name="BZ" id="BZ" placeholder="" rows=1 maxlength="200"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
<script src="frame/plugins/jquery-validation/js/jquery.validate.js" type="text/javascript"></script>
<script src="frame/plugins/select2/v3/select2.js" type="text/javascript"></script>
<script src="frame/plugins/select2/v3/select2_locale_zh-CN.js" type="text/javascript"></script>
<script src="frame/plugins/bootstrap-fileinput/bootstrap-fileinput-mulitple.js" type="text/javascript"></script>
<script src="yyhpt/pages/jcsj/fwbDetail.js" type="text/javascript"></script>
</body>
</html>