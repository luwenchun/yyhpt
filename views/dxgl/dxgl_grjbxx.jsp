<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>个人基本信息管理</title>

    <link href="layouts/css/white/detail_page.css" rel="stylesheet">
    <link href="frame/plugins/bootstrap-fileinput/bootstrap-fileinput.css"
          rel="stylesheet" type="text/css"/>

    <style type="text/css">
        .radio-container {
            padding-left: 8px;
        }

        .head-title {
            margin-top: 0px;
            margin-bottom: 0px;
            font-weight: bold;
            font-size: 20px;
            color: #000000;
        }

        .choose-date {
            background: url("layouts/img/control/img_rl.png") no-repeat scroll right center transparent;
            cursor: pointer;
        }

        .kv-avatar .file-preview-frame, .kv-avatar .file-preview-frame:hover {
            margin: 0;
            padding: 0;
            border: none;
            box-shadow: none;
            text-align: center;
        }

        .kv-avatar .file-input {
            display: table-cell;
            max-width: 220px;
        }

        .image-title {
            text-align: center;
        }

        .list-row-space {
            margin-top: 4px;
            margin-bottom: 4px;
        }

        .card-number {
            text-transform: uppercase
        }
    </style>
    <link rel="stylesheet"
          href="frame/plugins/city-picker/css/city-picker.css">

</head>
<body>
<div class="container-fluid" style="padding-bottom: 15px">
    <div class="row">
        <div class="col-md-1 col-xs-1">
            <button class="btn btn-default btn-flat btn-sm" id="id_btn_print"
                    type="button">打印
            </button>
        </div>
        <div class="col-xs-offset-4 col-md-offset-9 col-lg-offset-10" id="div_rigBtn">
            <button class="btn btn-default btn-flat btn-sm col-md-offset-3"
                    id="id_btn_save" type="button">保存
            </button>
            <button class="btn btn-default btn-flat btn-sm" id="id_btn_exit"
                    type="button">退出
            </button>
        </div>
    </div>
</div>
<form class="form-horizontal" id="id_info"
      enctype="multipart/form-data" role="form">
    <div class="panel panel-default" style="padding: 15px">
        <div class="col-md-10 nopadding">
            <div class="form-group">
                <label class="control-label col-md-1">姓名:</label>
                <div class="col-md-2">
                    <input class="form-control input-sm list-row-space" id="id_xm" type="text"
                           name="xm" title="姓名" maxlength="10">
                </div>
                <div class="col-md-2 list-row-space">
                    <select class="form-control input-sm" id="id_klx" name="klx"
                            title="卡类型"></select>
                </div>
                <div class="col-md-3">
                    <input class="form-control input-sm list-row-space card-number" id="id_zjhm" type="text"
                           name="zjhm" maxlength="60">
                </div>
            </div>
            <div class="form-group list-row-space">
                <label class="control-label col-md-1">性别:</label>
                <div class="col-md-5 div_icheck" id="id_gender">
                </div>

                <label class="control-label col-md-1">出生日期:</label>
                <div class="col-md-2">
                    <input class="form-control input-sm choose-date" id="id_csrq"
                           type="text" name="csrq" title="出生日期" readonly="readonly"
                           style="background-color: white">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-1">民族:</label>
                <div class="col-md-2 list-row-space">
                    <select class="form-control input-sm" id="mzdm" name="mzmc"
                            title="民族"></select>
                </div>
                <label id="labLxdh" class="control-label col-md-1">联系电话:</label>
                <div class="col-md-2 list-row-space">
                    <input class="form-control input-sm nopadding" id="id_dhhm" type="tel"
                           name="dhhm" maxlength="15">
                </div>
                <label id="labSjhm" class="control-label col-md-1 nopadding">手机号码:</label>
                <div class="col-md-2 list-row-space">
                    <input class="form-control input-sm nopadding" type="tel" id="id_sjhm"
                           name="sjhm" maxlength="15">
                </div>
            </div>
            <div class="form-group">

                <label class="control-label col-md-1">国籍:</label>
                <div class="col-md-2 list-row-space">
                    <select class="form-control input-sm" id="gjdm" name="gjmc"
                            title="国籍"></select>
                </div>
                <div class="col-md-2 list-row-space">
                    <select class="form-control input-sm" id="id_insurance_card"
                            name="card" title="card"></select>
                </div>
                <div class="col-md-3">
                    <input class="form-control input-sm list-row-space card-number" id="id_insurance_card_value"
                           type="text" name="card_value" title="卡号">
                </div>
            </div>
            <div id="jzxxdzContent" class="form-group" style="display: none;">
                <label class="control-label col-md-1">居住地址:</label>
                <div class="col-md-7 list-row-space">
                    <input class="form-control input-sm" type="text" id="id_jzxxdz"
                           name="jzxxdz" title="居住地址" maxlength="100">
                </div>
            </div>
            <div id="hjxxdzContent" class="form-group" style="display: none;">
                <label class="control-label col-md-1">户籍地址:</label>
                <div class="col-md-7 list-row-space">
                    <input class="form-control input-sm" type="text" id="id_hjxxdz"
                           name="hjxxdz" title="户籍地址" maxlength="100">
                </div>
            </div>
            <div id="jzdzContent" class="form-group">
                <label class="control-label col-md-1">居住地址:</label>
                <div class="col-md-11">
                    <div class="col-md-8 no-padding list-row-space">
                        <input id="id_jzdxxdz" type="text" name="jzdxxdz" readonly style="width: 99%">
                    </div>
                    <div class="col-md-3 no-padding input-group list-row-space">
                        <input id="id_jzds" name="jzds" type="text"
                               style="height: 30px; border: 0px; border-bottom: 1px solid silver;"
                               class="col-md-9 col-xs-9 no-padding">
                        <button class="btn btn-default btn-flat btn-sm" id="id_jzdxxdz_copy" type="button"><i
                                class="fa fa-copy"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div id="hjdzContent" class="form-group">
                <label class="control-label col-md-1">户口地址:</label>
                <div class="col-md-11">
                    <div class="col-md-8 no-padding list-row-space">
                        <input class="col-md-12" type="text" id="id_hjdxxdz" name="hjdxxdz" readonly style="width: 99%">
                    </div>
                    <div class="col-md-3 no-padding list-row-space">
                        <input id="id_hjds" name="hjds" type="text"
                               style="height: 30px; border: 0px; border-bottom: 1px solid silver;"
                               class="col-md-9 col-xs-9 no-padding">
                        <button class="btn btn-default btn-flat btn-sm" id="id_hjdxxdz_copy" type="button"><i
                                class="fa fa-copy"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-1" style="padding-left: 0px;">联系人关系:</label>
                <div class="col-md-2 list-row-space">
                    <select class="form-control input-sm" id="gxdm" name="gxmc"
                            title="联系人关系"></select>
                </div>
                <label class="control-label col-md-1 col-md-offset-1 list-row-space"
                       style="padding-left: 0px;">联系人姓名:</label>
                <div class="col-md-2 list-row-space">
                    <input class="form-control input-sm" type="text" id="id_lxr_xm"
                           name="lxrxm" title="联系人姓名" maxlength="10">
                </div>
                <label class="control-label col-md-1 list-row-space" style="padding-left: 0px;">联系人手机:</label>
                <div class="col-md-2 list-row-space">
                    <input class="form-control input-sm nopadding" id="id_lxr_sjhm" type="tel"
                           name="lxr_sjhm" maxlength="15">
                </div>
            </div>
        </div>

        <div class="col-md-2 col-xs-middile">
            <div class="form-group">
                <div class="fileinput fileinput-new" data-provides="fileinput">
                    <div class="fileinput-preview thumbnail" data-trigger="fileinput"
                         style="height: 210px; width: 160px;">
                        <img class="img-rounded carousel-inner img-responsive"
                             id="id_image" src="layouts/img/dialog/avator.jpg" alt="" onerror="this.src='layouts/img/dialog/avator.jpg'"/>
                    </div>
                    <div>
								<span class="btn btn-sm btn-default  btn-file"> <span
                                        class="fileinput-new"><i class="glyphicon glyphicon-camera"></i></span> <span
                                        class="fileinput-exists"> 重选 </span> <input type="file"
                                                                                    name="image">

								</span> <a href="javascript:;" class="btn btn-sm red fileinput-exists"
                                           data-dismiss="fileinput">
                        <button class="btn btn-sm btn-default" type="button">删除</button>
                    </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-10 nopadding">
                <label class="control-label col-md-1">血型:</label>
                <div class="col-md-6 div_icheck" id="id_blood_type">
                </div>
                <label class="control-label col-md-1">RH阴性:</label>
                <div class="col-md-4 div_icheck" id="id_RH_blood_type">
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-1">婚姻状况:</label>
            <div class="col-md-11 div_icheck" id="id_marital_status">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-1">医疗支付:</label>
            <div class="col-md-5 div_icheck" id="id_insurance_type">
            </div>
            <div class="col-md-2">
                <input class="form-control input-sm" id="id_ylfyzffsqt" name="ylfyzffsqt"
                       maxlength="50" style="border: 0;border-bottom: 1px solid silver">
            </div>
        </div>
    </div>
</form>
<form class="form-horizontal" id="id_zp"
      enctype="multipart/form-data" role="form">

</form>
</body>
<script src="frame/plugins/city-picker/city-picker.data.js"></script>
<script src="frame/plugins/city-picker/city-picker.js"></script>
<script src="frame/plugins/bootstrap-fileinput/bootstrap-fileinput-img.js"></script>
<script>
    var yngrbsh = '<%=pageContext.getRequest().getAttribute("yngrbsh")%>';
</script>
<script src="yyhpt/pages/dxgl/dxgl_grjbxx.js"></script>
</html>