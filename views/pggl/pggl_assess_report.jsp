<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%--
  Created by IntelliJ IDEA.
  User: Edward
  Date: 2016/07/27
  Time: 9:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>需求评估结果报告与告知</title>
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

        /*小屏幕时lable的样式*/
        .control-label-new {
            padding-top: 6px;
            text-align: right;
            /*padding-left: 0px;*/
        }

        /*重写样式*/
        .form-control-static {
            padding-top: 6px;
            padding-bottom: 6px;
        }

        .del-list-row-space {
            height: 30px;
            line-height: 15px;
        }
        .hr-min-height {
            margin-top:5px;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>

<form id="defaultForm" method="post" class="form-horizontal"
      style="font-size: 13px;">
    <!-- 个人基本信息开始-->
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#grxxcontent">
                <h3 class="head-title">
                    <span class="glyphicon glyphicon-th"></span> 个人信息
                </h3>
            </a>
        </div>
        <div id="grxxcontent" class="panel-collapse collapse in nopadding">
            <div class="form-horizontal form-bordered form-row-stripped nopadding">
                <div class="form-group nopadding">
                    <div class="col-md-5 col-xs-12">
                        <label class="col-md-2 col-md-offset-1 col-md-offset-1 col-xs-4 control-label
								control-label-new">姓名：</label>
                        <div class="col-md-3">
                            <p id="hzxm" class="form-control-static"></p>
                        </div>
                    </div>
                    <div class="col-md-7 col-xs-12">
                        <label class="col-md-3 col-xs-4 control-label control-label-new">性别：</label>
                        <div class="col-md-3">
                            <p id="xb" class="form-control-static"></p>
                        </div>
                        <label class="col-md-3 col-xs-4  control-label control-label-new">出生日期：</label>
                        <div class="col-md-3">
                            <p id="csrq" class="form-control-static"></p>
                        </div>
                    </div>
                </div>
                <div class="form-group nopadding">
                    <div class="col-md-5 col-xs-12">
                        <label class="col-md-3 col-xs-4 control-label control-label-new">居住地址：</label>
                        <div class="col-md-9">
                            <p id="jzdz" class="form-control-static"></p>
                        </div>
                    </div>
                    <div class="col-md-7 col-xs-12">
                        <label class="col-md-3 col-xs-4 control-label control-label-new">联系电话：</label>
                        <div class="col-md-5">
                            <p id="lxdh" class="form-control-static"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 个人基本信息结束 -->
    <!-- 评估情况开始 -->
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#pgqkxxcontent">
                <h3 class="head-title">
                    <span class="glyphicon glyphicon-th"></span> 评估情况
                </h3>
            </a>
        </div>
        <div id="pgqkxxcontent" class="panel-collapse collapse in nopadding">
            <div class="form-horizontal form-bordered form-row-stripped nopadding content-new">
                <div class="form-group nopadding" style="margin-top: 8px;">
                    <div class="col-md-4 col-xs-12 del-list-row-space">
                        <label class="col-md-6 col-xs-5 control-label
								control-label-new">组织评估单位：</label>
                        <div class="col-md-6 col-xs-7"><p id="id_zzpgjg" class="form-control-static"></p></div>

                    </div>
                    <div class="col-md-4 col-xs-12 del-list-row-space">
                        <label class="col-md-6 col-xs-5 control-label control-label-new">评估机构：</label>
                        <div class="col-md-6 col-xs-7"> <p id="id_pgjg" class="form-control-static"></p> </div>
                    </div>
                    <div class="col-md-4 col-xs-12 del-list-row-space">
                        <label class="control-label col-md-5 col-xs-5 control-label-new">受理日期：</label>
                        <div class="col-md-7 col-xs-7">
                            <p id="slrq" class="form-control-static"></p>
                        </div>
                    </div>
                </div>
                <div class="form-group nopadding">
                    <div class="col-md-4 col-xs-12 del-list-row-space">
                        <label class="col-md-6 col-xs-5 control-label control-label-new">评估调查员：</label>
                        <div class="col-md-6 col-xs-7 control-label" id="dcry" style="text-align:left"></div>
                    </div>
                    <div class="col-md-4 col-xs-12 del-list-row-space">
                        <label class="control-label col-md-6 col-xs-5 control-label-new">评估类型：</label>
                        <div class="col-md-6 col-xs-7">
                            <p id="id_sqpglxdiv" class="form-control-static"></p>
                        </div>
                    </div>
                    <div class="col-md-4 col-xs-12 del-list-row-space">
                        <label class="control-label col-md-5 col-xs-5 control-label-new">调查日期：</label>
                        <div class="col-md-7 col-xs-7">
                            <p id="wcdcrq" class="form-control-static"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group no-padding">
                <div class="col-md-4 col-xs-12 del-list-row-space">
                    <label class="control-label col-md-6 col-xs-5 control-label-new">评估软件评定：</label>
                    <div class="col-md-6 col-xs-7">
                        <p id="id_rjpddjdiv" class="form-control-static"></p>
                    </div>
                </div>
                <div class="col-md-4 col-xs-12 del-list-row-space">
                    <label class="control-label col-md-6 col-xs-5 control-label-new">集体评审评定：</label>
                    <div class="col-md-6 col-xs-7">
                        <p id="id_jtpddjdiv" class="form-control-static"></p>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-4 col-xs-12 del-list-row-space">
                    <div id="id_date_4" style="display: block">
                        <label class="control-label col-md-6 col-xs-5 control-label-new">期末评估时间：</label>
                        <div class="col-md-6 col-xs-7">
                            <p id="jyqmpgrq" class="form-control-static"></p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-xs-12 del-list-row-space">
                    <div id="id_date_3" style="display: block">
                        <label class="control-label col-md-6 col-xs-5 control-label-new">状态评估时间：</label>
                        <div class="col-md-6 col-xs-7">
                            <p id="jyztpgrq" class="form-control-static"></p></div>
                    </div>
                </div>
            </div>
            <hr class="hr-min-height">
            <div class="form-group">
                <label class="control-label col-md-3">确定护理需求等级：</label>
                <div id="id_qdhlxqdj" class="col-md-9 div_icheck">
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-3 nopadding">
                    <label class="control-label col-md-12">需要说明的情况：</label>
                    <div class="col-md-12 col-xs-4" style="text-align: right;">
                        <input id="gzbz" name="gzbz" type="checkbox">
                        <label class="control-label">短信通知</label>
                    </div>
                </div>
                <div class="col-md-7 col-xs-12">
                    <textarea id="qksm" name="qksm" rows="3" style="width: 100%; margin-top: 5px;"></textarea>
                </div>
            </div>

            <div class="form-group" style="display: none">
                <label class="control-label col-md-2 ">评估日期：</label>
                <div class="col-md-3">
                    <input class="form-control choose-date date-edit" id="pgrq" type="text" name="pgrq"
                           style="background-color: white" readonly="readonly">
                </div>
            </div>
        </div>

    </div>
    <!-- 评估情况结束 -->
</form>


</body>
<script type="text/javascript">
    var gzbzCheck = document.getElementById("gzbz");
    var report = {};
    var isNeedZTPG = '0';
    var zzpgjgdm = '';
    var pgjgdm = '';
    var gzbz = '0';
    $(function () {
        $('#hzxm').html(rowPersonInfo.XM);
        $('#xb').html(rowPersonInfo.XB ? rowPersonInfo.XB : '');
        $('#csrq').html(rowPersonInfo.CSRQ ? rowPersonInfo.CSRQ : '');
        $('#hzshfzhh').html(rowPersonInfo.SFZH ? rowPersonInfo.SFZH : '');
        $('#lxdh').html(rowPersonInfo.LXDH ? rowPersonInfo.LXDH : '');
        $('#jzdz').html(rowPersonInfo.JZDZ ? rowPersonInfo.JZDZ : '');
        $('.date-edit').datepicker({
            autoclose: true,
            endDate: '0d'
        });
        getDictionaryData();
    });

    function setDictionaryHtml(data) {
        wn.createiRadioWidthByArray($("#id_qdhlxqdj"), data, "qddjdm", "qddjmc", 2);
    }

    function getDictionaryData() {
        $.ajax({
            url: "yyhptpggl.do?action=DictionaryDatas",
            type: "post",
            dataType: "json",
            data: {},
            success: function (data) {
                setDictionaryHtml(data);
                getAssessReport();
            }
        });
    }

    function getAssessReport() {
        $.ajax({
            url: "yyhptpggl.do?action=get_assess_report",
            type: "post",
            dataType: "json",
            data: {
                sqlsh: rowPersonInfo.SQLSH,
                yngrbsh: rowPersonInfo.YNGRBSH
            },
            success: function (res) {
                report = res;
                isNeedZTPG = res.jypglxdm;
                zzpgjgdm = res.zzpgjgdm;
                pgjgdm = res.pgjgdm;
                if (!res.pgrq) {
                    res.pgrq = new Date().format('yyyy-MM-dd');
                }
                initControl(res);
                $('#gzbz').iCheck({
                    checkboxClass: 'icheckbox_flat-wnred',
                    radioClass: 'iradio_flat-wnred',
                    increaseArea: '20%'
                })
            }
        });
    }

    function initControl(row) {
        if (row.jypglxdm === '0') {
            $('#id_date_3').hide();
        }
        $('#dcry').html(row.dcy1xm + (row.dcy2xm ? ('、  ' + row.dcy2xm) : '') + (row.dcy3xm ? ('、  ' + row.dcy3xm) : ''));
        $('#id_sqpglxdiv').html(row.pglxmc ? row.pglxmc : '');
        $('#id_rjpddjdiv').html(row.rjpgdjmc ? row.rjpgdjmc : '');
        $('#id_jtpddjdiv').html(row.jtpsdjmc ? row.jtpsdjmc : '');
        $('#id_zzpgjg').html(row.zzpgjgmc ? row.zzpgjgmc : '');
        $('#id_pgjg').html(row.pgjgmc ? row.pgjgmc : '');
        $('#slrq').html(row.sqslrq ? row.sqslrq : '');
        $('#wcdcrq').html(row.wcdcrq ? row.wcdcrq : '');
        $('#jyqmpgrq').html(row.jyqmpgrq ? row.jyqmpgrq : '');
        $('#jyztpgrq').html(row.jyztpgrq ? row.jyztpgrq : '');
        $('#qksm').val(row.qksm ? row.qksm : '');
        if (row.gzbz==1) {
            gzbzCheck.checked = true;
        } else {
            gzbzCheck.checked = false;
        }

        if (row.qddjdm) {
            $("input[value='" + row.qddjdm + "'][name='qddjmc']").iCheck('check');
        }else{
            if(row.jtpsdjdm){
                $("input[value='" + row.jtpsdjdm + "'][name='qddjmc']").iCheck('check');
            }
        }
    }

    function doSave() {
        if ($('#gzbz').prop('checked')) {gzbz = '1';}
        else {gzbz = '0';}

        $.ajax({
            url: "yyhptpggl.do?action=dave_report",
            type: "post",
            dataType: "json",
            data: $.extend(report, {
                pjjglsh: rowPersonInfo.PJJGLSH,
                sqlsh: rowPersonInfo.SQLSH,
                jtpslsh: rowPersonInfo.JTPSLSH,
                dcjllsh: rowPersonInfo.DCJLLSH,
                yngrbsh: rowPersonInfo.YNGRBSH,
                qddjdm: $('input:radio[name=qddjmc]:checked').val(),
                qksm: $('#qksm').val(),
                pgrq: $('#pgrq').val(),
                jypglxdm: isNeedZTPG,
                jyztpgrq: $('#jyztpgrq').val(),
                jyqmpgrq: $('#jyqmpgrq').val(),
                zzpgjgdm: zzpgjgdm,
                pgjgdm: pgjgdm,
                gzbz: gzbz
            }),
            success: function (res) {
                wnform.toast(res.message);
                globalDialog.close();
            }
        });
    }
</script>
</html>
