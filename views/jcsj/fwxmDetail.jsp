<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <link href="frame/plugins/bootstrap-fileinput/bootstrap-fileinput-mulitple.css" rel="stylesheet" type="text/css"/>
    <style type="text/css">
        hr {
            margin-top: 3px;
            margin-bottom: 5px;
            height: 1px;
            border: none;
            border-top: 1px solid #eee;
        }
    </style>
</head>
<body>
<form id="defaultForm" method="post" class="form-horizontal ">
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="form-group ">
                <div class="form-group col-md-5">
                    <label class="col-md-4 control-label"><span
                            class="required"> * </span>项目代码：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control  input-sm " maxlength="10"
                               name="XMDM" id="XMDM" placeholder="请输入项目代码"/>
                    </div>
                </div>
                <div class="form-group col-md-5">
                    <label class="col-md-4 control-label"><span
                            class="required"> * </span>项目名称：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control  input-sm " maxlength="50"
                               name="XMMC" id="XMMC" placeholder="请输入项目名称"/>
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
            <h3 class="panel-title">服务项目设置</h3>
        </div>
        <div class="panel-body">
            <div class="form-group">
                <div class="form-group col-md-6">
                    <label class="col-md-4 control-label">业务项目：</label>
                    <div class="col-md-6">
                        <div class="input-group  input-group-sm" style="width: 230px">
                            <input type="text" class="form-control   input-sm hidden"
                                   id="YWXMDM" name="YWXMDM" placeholder="业务项目代码"/> <input
                                type="text" class="form-control input-sm" id="YWXMMC"
                                name="YWXMMC" placeholder="" readonly>
                            <!-- disabled -->
                            <span class="input-group-btn">
								<button id="addywxm" class="btn btn-default btn-flat btn-sm "
                                        type="button">
									<i class="fa fa-search"></i>
								</button>
							</span>
                        </div>
                    </div>
                </div>

                <div class="form-group col-md-6">
                    <label class="col-md-4 control-label">排序序号：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control  input-sm " maxlength="10"
                               name="PXXH" id="PXXH" placeholder="请输入排序序号"/>
                    </div>
                </div>
            </div>
            <!-- <div class="form-group col-md-6">
                    <label class="col-md-4 control-label"><span
                        class="required"> * </span>功能代码：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control  input-sm " maxlength="30"
                            name="GNDM" id="GNDM" placeholder="请输入功能代码" />
                    </div>
                </div>
            </div>-->
            <hr>
            <div class="form-group">
                <div class="form-group col-md-6">
                    <label class="col-md-4 control-label">机构级别：</label>
                    <div class="col-md-8">
                        <select id="JGJBDM" name="JGJBDM" class="form-control "
                                data-placeholder="请选择" style="width: 100%;"></select>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label class="col-md-4 control-label">重要程度：</label>
                    <div class="col-md-8">
                        <select id="ZYCDDM" name="ZYCDDM" class="form-control "
                                data-placeholder="请选择" style="width: 100%;"></select>
                    </div>
                    <!-- <div id="zycddiv" class="form-group col-md-10"></div> -->
                </div>
            </div>
            <hr>
            <div class="form-group">
                <div class="form-group col-md-12 nopadding">
                    <label class="col-md-2 control-label">人员资质：</label>
                    <div class="col-md-10 nopadding">
                        <!-- <select id="YYZZDM" name="YYZZDM" class="form-control "
                                data-placeholder="请选择" style="width: 100%;"></select>
                        </div> -->
                        <div id="yyzzdiv" class="form-group col-md-12"></div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="form-group">
                <div class="form-group col-md-12">
                    <label class="col-md-2 control-label">服务标准描述：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control  input-sm " maxlength="30"
                               name="BZMS" id="BZMS" placeholder="请输入服务标准描述"/>
                    </div>
                </div>
            </div>
            <hr>
            <div class="form-group">
                <div class="form-group col-md-6">
                    <label class="col-md-4 control-label">服务频次：</label>
                    <div class="col-md-8">
                        <!--input type="text" class="form-control   input-sm hidden"
                                id="fwpc" name="fwpc" placeholder="" /-->
                        <select id="PCDM" name="PCMC" class="form-control "
                                data-placeholder="请选择" style="width: 100%;"></select>
                    </div>
                </div>

                <div class="form-group col-md-6">
                    <label class="col-md-4 control-label">注意事项：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control  input-sm " maxlength="25"
                               name="ZYSX" id="ZYSX" placeholder="请输入注意事项"/>
                    </div>
                </div>
            </div>
            <hr>
            <div class="form-group">
                <div class="form-group col-md-6">
                    <label class="col-md-4 control-label">费用类别：</label>
                    <div id="fylbdiv" class="form-group col-md-8"></div>
                </div>

                <div class="form-group col-md-6">
                    <label class="col-md-4 control-label">收费项目代码：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control  input-sm " maxlength="25"
                               name="SFXMDM" id="SFXMDM" placeholder="请输入收费项目代码"/>
                    </div>
                </div>
            </div>
            <hr>
            <div class="form-group">
                <div class="form-group col-md-6">
                    <label class="col-md-4 control-label"><span
                            class="required"> * </span>是否需要医嘱：</label>
                    <div class="col-md-8">
                        <input type="checkbox" name="YZBZ" id="YZBZ" value="1"
                               checked="checked"/>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label class="col-md-4 control-label">备注：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control  input-sm " maxlength="5"
                               name="BZ" id="BZ" placeholder="请输入备注"/>
                    </div>
                </div>
            </div>
            <hr>
            <div class="form-group">
                <div class="form-group col-md-6">
                    <label class="col-md-4 control-label">服务最短时间：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control  input-sm " maxlength="5"
                               name="ZDSJ" id="ZDSJ" placeholder="请输入服务最短时间"/>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label class="col-md-4 control-label">服务最长时间：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control  input-sm " maxlength="5"
                               name="ZCSJ" id="ZCSJ" placeholder="请输入服务最长时间"/>
                    </div>
                </div>
            </div>
            <hr>
            <div class="form-group">
                <div class="form-group col-md-6">
                    <label class="col-md-4 control-label">服务内容说明：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control  input-sm " maxlength="127"
                               name="FWNRSM" id="FWNRSM" placeholder="请输入服务内容说明"/>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label class="col-md-4 control-label">服务时间说明：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control  input-sm " maxlength="5"
                               name="FWSJSM" id="FWSJSM" placeholder="请输入服务时间说明"/>
                    </div>
                </div>
            </div>
            <hr>
            <div class="form-group">
                <div class="form-group col-md-6">
                    <label class="col-md-4 control-label">项目副标题：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control  input-sm " maxlength="127"
                               name="XMFBT" id="XMFBT" placeholder="请输入项目副标题"/>
                    </div>
                </div>
            </div>

            <hr>
            <div class="form-group">
                <div class="form-group col-md-12">
                    <label class="col-md-2 control-label">附件：</label>
                    <%--<div id="fileDiv" class="col-md-10 col-sm-10"></div>--%>
                    <div id="fileDiv" class="col-md-10 col-sm-10"
                         style="padding-left: 8px;padding-right: 0px;margin-top: 5px;">
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

            <div class="form-group">
                <div class="form-group col-md-12">
                    <label class="col-md-2 control-label">耗材设置：</label>
                    <div id="yyhcdiv" style="display: none">
                        <table id="yyhclist" class="table"></table>
                    </div>
                    <div class="col-md-2" style="padding-top: 6px;">
                        <a id="plus" href="javascript:void(0)" data-toggle="modal" disabled title="增加">
                            <i class="glyphicon glyphicon-plus"></i>新增
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>

<form class="form-horizontal" id="id_zp"
      enctype="multipart/form-data" role="form">
</form>
<script src="frame/plugins/jquery-validation/js/jquery.validate.js"
        type="text/javascript"></script>
<script src="frame/plugins/select2/v3/select2.js" type="text/javascript"></script>
<script src="frame/plugins/select2/v3/select2_locale_zh-CN.js" type="text/javascript"></script>
<script src="frame/plugins/bootstrap-fileinput/bootstrap-fileinput-mulitple.js" type="text/javascript"></script>
<script src="yyhpt/pages/jcsj/fwxmDetail.js" type="text/javascript"></script>
</body>
</html>