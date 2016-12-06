<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%--
  Created by IntelliJ IDEA.
  User: Mr.wang
  Date: 2016/9/26
  Time: 10:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <style type="text/css">
        body {
            background-color: ThreeDHighlight;
        }

        .head-title {
            margin-top: 0px;
            margin-bottom: 0px;
            font-weight: bold;
            font-size: 20px;
            color: #000000;
        }

        /*小屏幕时lable的样式*/
        .control-label-new {
            padding-top: 6px;
            text-align: right;
            /*padding-left: 0px;*/
        }

        .control-label {
            COLOR: #737373;
        }

        .no-padding-right {
            padding-right: 0px;
        }
    </style>
</head>
<body>
<!-- 个人基本信息开始-->
<jsp:include page="/yyhpt/views/common/grjbxxDetail.jsp"></jsp:include>
<!-- 个人基本信息结束 -->
<!-- 分配情况开始 -->
<form id="defaultForm" method="post" class="form-horizontal">
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#fpqkcontent">
                <h3 class="head-title">
                    <span class="glyphicon glyphicon-th"></span> 分配情况
                </h3>
            </a>
        </div>
        <div id="fpqkcontent" class="panel-collapse collapse in nopadding">
            <div class="form-horizontal form-bordered form-row-stripped nopadding">
                <div class="form-group nopadding" style="margin-top: 8px;">
                    <div class="col-md-4 col-xs-12 del-list-row-space">
                        <label class="col-md-6 col-xs-5 control-label
								control-label-new">医养管理等级：</label>
                        <div class="col-md-6 col-xs-7"><p id="id_yygldj" name="qddjdm" class="form-control-static"></p>
                        </div>

                    </div>
                    <div class="col-md-4 col-xs-12 del-list-row-space">
                        <label class="col-md-6 col-xs-5 control-label control-label-new">申请需求类型：</label>
                        <div class="col-md-6 col-xs-7"><p id="id_xqdjmc" name="xqdjdm" class="form-control-static"></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-horizontal form-bordered form-row-stripped nopadding">
                <div class="form-group nopadding" style="margin-top: 8px;">
                    <label class="col-md-2 col-xs-5 control-label control-label-new">意向机构：</label>
                    <div class="col-md-8 col-xs-12 del-list-row-space">
                        <select class="form-control input-sm" id="fwjgdm" name="fwjgmc"></select>
                    </div>
                </div>
            </div>

            <div class="form-horizontal form-bordered form-row-stripped nopadding">
                <div class="form-group nopadding" style="margin-top: 8px;">
                    <label class="col-md-2 col-xs-5 control-label control-label-new">分配结果：</label>
                    <div class="col-md-3 col-xs-12 del-list-row-space">
                        <div class="col-md-12 col-xs-7 no-padding"><p id="id_fpjg" class="form-control-static"></p>
                        </div>
                    </div>
                    <div class="col-md-6 col-xs-12 del-list-row-space">
                        <input type="text" id="fpbtgyy" name="fpbtgyy" class="form-control">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="form-group nopadding" style="margin-top: 8px;">
            <div class="col-md-4 col-xs-12 del-list-row-space">
                <label class="col-md-6 col-xs-5 control-label
								control-label-new">分配人员：</label>
                <div class="col-md-6 col-xs-7"><p id="id_fprxm" name="fprgh" class="form-control-static"></p></div>

            </div>
            <div class="col-md-4 col-xs-12 del-list-row-space">
                <label class="col-md-6 col-xs-5 control-label
								control-label-new">分配日期：</label>
                <div class="col-md-6 col-xs-7"><p id="id_fprq" name="fprq" class="form-control-static"></p></div>
            </div>
        </div>
    </div>
    </div>
</form>
<script type="text/javascript">
    var yxjgObj={id:'',text:''};
    $(function () {
        if(editRow.yxjgdm){
            var yxjgdm=editRow.yxjgdm.toUpperCase();

            yxjgObj.id=yxjgdm;
            yxjgObj.text=editRow.jgmc;
        }else{
            var yxjgdm='';
        }

        document.getElementById('XM').innerHTML = editRow.xm == null ? '' : editRow.xm;
        document.getElementById('XBMC').innerHTML = editRow.xb == null ? '' : editRow.xb;
        document.getElementById('CSRQ').innerHTML = editRow.csrq == null ? '' : jsGetAge(editRow.csrq);
        document.getElementById('YLFYZFFSMC').innerHTML = editRow.csrq == null ? '' : editRow.ylfyzffsmc;
        document.getElementById('LXDZ').innerHTML = editRow.jzdz == null ? '' : editRow.jzdz;
        document.getElementById('LXDH').innerHTML = editRow.sjhm == null ? '' : editRow.sjhm;

        var fpjg = [{id: '1', name: '同意申请'}, {id: '2', name: '不同意'}];

        createiRdoWidthByArray($('#id_fpjg'), fpjg, 'fpzt', '6 nopadding');

        if (mflag == '0') {
            document.getElementById('id_yygldj').innerHTML = editRow.pg_gldjmc == null ? '' : editRow.pg_gldjmc;
            document.getElementById('id_xqdjmc').innerHTML = editRow.xq_xqdjdm == null ? '' : xqdjmcFormatter(editRow.xq_xqdjdm);
            document.getElementById('id_fprxm').innerHTML = djryxm;
            document.getElementById('id_fprq').innerHTML = editRow.curr_date;
        } else {
            document.getElementById('id_yygldj').innerHTML = editRow.qddjmc == null ? '' : editRow.qddjmc;
            document.getElementById('id_xqdjmc').innerHTML = editRow.gaxqdm == null ? '' : xqdjmcTrans(editRow.gaxqdm);
            document.getElementById('id_fprxm').innerHTML = editRow.fprxm == null ? '' : editRow.fprxm;
            document.getElementById('id_fprq').innerHTML = editRow.fprq == null ? '' : editRow.fprq;
            var $selector = $("input[value='" + editRow.fpzt + "'][name=fpzt]");
            $selector.prop('checked', 'checked');
            wn.iCheckInit();
            $('#fpbtgyy').val(editRow.fpbtgyy);
        }

        if ($("input[name=fpzt]:checked").val() != '2') $('#fpbtgyy').hide();
        else $('#fpbtgyy').show();

        $('#id_fpjg').on('ifClicked', function (event) {
            var fpjg_val = event.target.value;
            if (fpjg_val === '2')
                $('#fpbtgyy').show();
            else
                $('#fpbtgyy').hide();
        });

        getYxjgInfo(yxjgdm);
    });

    function getYxjgInfo(yxjgdm) {
        $.ajax({
            url: 'yyhpt_dxfp.do?action=getZcjgInfo',
            type: 'get',
            dataType: 'json',
            data: {},
            success: function (data) {
                var jglist = data.rows;
                // 初始化机构
                if(yxjgdm!='' && yxjgdm!=jglist[0].id){
                    jglist.push(yxjgObj);
                }
                createSelectByCZRYArray($("#fwjgdm"), jglist,yxjgdm);
                $("#fwjgdm").select2({language: 'zh-CN'});
            }
        })
    }

    function createSelectByCZRYArray(selObject, array, yxjgdm) {

        var selectBody = "";
        // var selectBody = "<option value=''>--请选择--</option>";
        $.each(array, function () {
            if (this.id == yxjgdm) {
                selectBody += "<option value=" + this.id + " selected = 'selected' name='jgbm'>" + this.text
                        + "</option>";
            } else {
                selectBody += "<option value=" + this.id + " name='jgbm'>" + this.text
                        + "</option>";
            }
        });
        selObject.html(selectBody);
    }

    function xqdjmcTrans(value) {                       //将分配结果代码转换成名称
        var gaxqmc = '';
        switch (value) {
            case '1':
                gaxqmc = '机构护理';
                break;
            case '2':
                gaxqmc = '居家护理';
                break;
            case '3':
                gaxqmc = '医院护理';
                break;
            case '4':
                gaxqmc = '居家护理';
                break;
            default:
                gaxqdm = '';
                gaxqmc = '';
                break;
        }
        return gaxqmc;
    }

    function xqdjmcTrans4Save(value) {

        var gaxqdm = '';
//        var gaxqmc = '';
        switch (value) {
            case '1000035000':
                gaxqdm = '1';
                break;
            case '1000036000':
                gaxqdm = '1';
                break;
            case '1':
                gaxqdm = '1';
//                gaxqmc = '机构护理';
                break;
            case '1000033000':
                gaxqdm = '2';
                break;
            case '2':
                gaxqdm = '2';
//                gaxqmc = '居家护理';
                break;
            case '1000034000':
                gaxqdm = '3';
                break;
            case '3':
                gaxqdm = '3';
//                gaxqmc = '医院护理';
                break;
            case '1000032000':
                gaxqdm = '4';
                break;
            case '4':
                gaxqdm = '4';
//                gaxqmc = '社区护理';
                break;
            default:
                gaxqdm = '';
//                gaxqmc = '';
                break;
        }
        return gaxqdm;
    }


    function createiRdoWidthByArray(selObject, array, fieldName, split) {
        var selectBody = "";
        var i = 0;
        var chk = " checked";
        $.each(array, function () {
            if (i == 1) {
                chk = " checked";
            } else {
                chk = "";
            }
            // alert(fieldName+''); //id=\"tnbyh\"
            selectBody += "<label class=\" col-md-" + split
                    + "     top: -1px!important;\">"
                    + " <input type=\"radio\" id=\"" + fieldName + this.id
                    + "\"  name=\"" + fieldName + "\" value=\"" + this.id + "\""
                    + chk + " \"> " + this.name + "</label>";
            i++;
        });
        selObject.html(selectBody);
        selObject.iCheck({
            checkboxClass: 'icheckbox_flat-wnred',
            radioClass: 'iradio_flat-wnred',
            increaseArea: '20%'
        });
    }

    function doSave(t) {
        var fpzt = $("input[name='fpzt']:checked").val();
        var fpbtgyy = $("#fpbtgyy").val();
        if (editRow.fpzt == '1') {
            wnform.toast('已分配通过，不能保存!');
            $('#saveDxfp').attr('disabled', true);
            return false;
        } else {
            if (fpzt == '2' && fpbtgyy == '') {
                wnform.toast('请输入不通过原因');
            } else {
                saveDxfpForm.init(t);
                $('#defaultForm').submit();
            }
        }
    }

    var saveDxfpForm = function () {
        var submitData = function (t) {
            var form1 = $('#defaultForm');

            form1.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",  // validate all fields including form hidden input
                messages: {
                    id_xqdjmc: {
                        required: "需求等级名称不能为空"
                    },
                    sqrq: {
                        required: "申请日期必填"
                    },
                },
                rules: {
                    id_xqdjmc: {
                        required: true
                    },
                    sqrq: {
                        required: true
                    },
                },
                highlight: function (element) {
                    $(element).closest('.input-required').addClass('has-error');
                },

                invalidHandler: function (event, validator) {
                    $('.alert-danger', $('.form-horizontal')).show();
                },
                success: function (label) {
                    label
                            .closest('.input-required').removeClass('has-error'); // set success class to the control group
                },
                submitHandler: function (form) {
                    var yxjgdm = $('#fwjgdm').val();
                    var fpzt = $("input[name='fpzt']:checked").val();
                    var fpbtgyy = '';
                    if (fpzt == '1') {
                        fpbtgyy = '';
                    } else {
                        fpbtgyy = $("#fpbtgyy").val();
                    }
                    var datas;

                    if (mflag == '0') {
                        datas = $.extend({fplsh: editRow.fplsh},
                                {yngrbsh: editRow.yngrbsh},
                                {sqlsh: editRow.sqlsh},
                                //                          {gapglsh: editRow.gapglsh},
                                {gapglsh: editRow.ga_gapglsh},
                                {xqdjdm: editRow.xq_xqdjdm},
                                {xqdjmc: editRow.xq_xqdjmc},
                                {gaxqdm: xqdjmcTrans4Save(editRow.xq_xqdjdm)},               //分配结果
                                {gldjdm: editRow.pg_gldjdm},
                                {qddjdm: editRow.pg_gldjdm},
                                {sqsj: editRow.xq_sqsj},
                                {fprgh: djrygh},
                                {fprxm: djryxm},
                                {fprq: editRow.curr_date},
                                {fpzt: fpzt},
                                {fpbtgyy: fpbtgyy},
                                {yxjgdm:yxjgdm}
                        );
                    } else {
                        datas = $.extend({fplsh: editRow.fplsh},
                                {yngrbsh: editRow.yngrbsh},
                                {sqlsh: editRow.sqlsh},
                                //                          {gapglsh: editRow.gapglsh},

                                {gapglsh: editRow.gapglsh},
                                {xqdjdm: editRow.xqdjdm},
                                {xqdjmc: editRow.xqdjmc},
                                {gaxqdm: editRow.gaxqdm},
                                {gldjdm: editRow.pg_gldjdm},
                                {qddjdm: editRow.gldjdm},
                                {sqsj: editRow.xq_sqsj},
                                {fprgh: editRow.fprgh},
                                {fprxm: editRow.fprxm},
                                {fprq: editRow.fprq},
                                {fpzt: fpzt},
                                {fpbtgyy: fpbtgyy},
                                {yxjgdm:yxjgdm})
                    }

                    var Url = "yyhpt_dxfp.do?action=insert";
                    if (mflag == '1')
                        Url = "yyhpt_dxfp.do?action=update";
                    $.ajax({
                        url: Url,
                        type: "post",
                        dataType: "json",
                        data: datas,
                        success: function (data) {
                            if (data.code == "T") {
                                editRow.fplsh=data.key;
                                wnform.toast(data.message);
                                t.close();
                            } else {
                                wnform.toast(data.message);
                                $('#saveDxfp').attr('disabled', true);
                            }
                        }
                    });
                }
            });
        };

        return {
            //main function to initiate the module
            init: function (t) {
                submitData(t);
            }
        };
    }();
</script>
</body>
</html>
