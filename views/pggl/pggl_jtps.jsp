<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>


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
        padding-left: 0px;
    }

    /*重写样式*/
    .form-control-static {
        padding-top: 6px;
        padding-bottom: 6px;
    }

    .select-group {
        padding-bottom: 6px;
    }

    .list-row-space {
        margin-top: 3px;
        margin-bottom: 3px;
    }

    .del-list-row-space {
        height: 24px;
        line-height: 12px;
    }

    .form-control-new {
        display: block;
        color: #555;
        height: 30px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-color: #d2d6de;
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    }
</style>
<%--<script src="yyhpt/pages/pggl/pggl_jtps.js" type="text/javascript"></script>--%>


<form id="defaultForm" method="post" class="form-horizontal"
      style="font-size: 13px;">
    <!-- 个人基本信息开始-->
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#grxxcontent">
                <h3
                        style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                    <span class="glyphicon glyphicon-th"></span> 个人信息
                </h3>
            </a>
        </div>
        <div id="grxxcontent" class="panel-collapse collapse in nopadding">
            <div class="form-horizontal form-bordered form-row-stripped nopadding">
                <div class="form-group nopadding">
                    <div class="col-md-5 col-xs-12">
                        <label class="col-md-2 col-md-offset-1 col-xs-4 control-label
								control-label-new">姓名：</label>
                        <div class="col-md-3 col-xs-8">
                            <p id="hzxm" class="form-control-static"></p>
                        </div>
                    </div>
                    <div class="col-md-7 col-xs-12">
                        <label class="col-md-2 col-xs-4 control-label control-label-new">性别：</label>
                        <div class="col-md-4 col-xs-8">
                            <p id="xb" class="form-control-static"></p>
                        </div>
                        <label class="col-md-2 col-xs-4  control-label control-label-new">年龄：</label>
                        <div class="col-md-3 col-xs-8">
                            <p id="csrq" class="form-control-static"></p>
                        </div>
                    </div>
                </div>
                <div class="form-group nopadding">
                    <div class="col-md-5 col-xs-12">
                        <label class="col-md-3 col-xs-4 control-label control-label-new">居住地址：</label>
                        <div class="col-md-9 col-xs-8">
                            <p id="jzdz" class="form-control-static"></p>
                        </div>
                    </div>
                    <div class="col-md-7 col-xs-12">
                        <label class="col-md-2 col-xs-4 control-label control-label-new">联系电话：</label>
                        <div class="col-md-5 col-xs-8">
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
                <h3
                        style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                    <span class="glyphicon glyphicon-th"></span> 评估情况
                </h3>
            </a>

        </div>
        <div id="pgqkxxcontent"
             class="panel-collapse collapse in nopadding">
            <div class="form-horizontal form-bordered form-row-stripped ">

                <div class="form-group form-row-stripped">
                    <div class="col-xs-12 col-md-6">
                        <label class="col-md-4 col-xs-5 control-label
                                    control-label-new  del-list-row-space">申请评估类型：</label>
                        <div class="col-md-3 col-xs-7 del-list-row-space">
                            <p id="sqpglxdiv" class="form-control-static"></p>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-6">
                        <label class="col-md-4 col-xs-5 control-label control-label-new del-list-row-space">评估软件评定等级：</label>
                        <div class="col-md-4 col-xs-7">
                            <p id="rjpddjdiv" class="form-control-static del-list-row-space"></p>
                        </div>
                    </div>
                </div>
                <div class="form-group form-row-stripped">
                    <label class="control-label col-xs-5 col-md-2 control-label-new">集体评审评定等级：</label>
                    <div class="col-md-10 div_icheck col-xs-7" id="jtpddjdiv" style="text-align: left"></div>
                </div>
            </div>

        </div>
    </div>
    <!-- 评估情况结束 -->
    <!-- 集体评审信息开始 -->
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#jtpsxxcontent">
                <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                    <span class="glyphicon glyphicon-th"></span> 集体评审信息
                </h3>
            </a>
        </div>
        <div id="jtpsxxcontent" class="panel-collapse collapse in">
            <div class="form-horizontal form-bordered form-row-stripped">
                <div class="form-group">
                    <label class="control-label control-label-new col-md-2 col-xs-5 list-row-space">集体评审记录：</label>
                    <div class="col-md-7">
                        <div class="col-md-10 list-row-space nopadding">
                            <textarea class="form-control" id="jtpsjl" rows="2"></textarea>
                        </div>
                    </div>
                </div>
                <div class="form-group list-row-space">
                    <label class="control-label control-label-new col-md-2 col-xs-5"
                           id="id_radio_label">是否需要状态评估：</label>
                    <div class="col-md-2 div_icheck" id="id_radio_container"></div>
                    <div class="col-md-4" id="id_date_container">
                        <label class="control-label control-label-new col-md-5 col-xs-5"
                               id="id_sugg_date">期末评估时间：</label>
                        <div class="col-md-6 col-xs-7 input-group">
                            <input type="text" class="datetimepickers form-control input-sm choose-date input-group"
                                   id="datejyqmpgsj" name="qmpgsj" readonly
                                   title="期末评估时间必填"
                                   style="background-color: white"
                                   placeholder="选择时间">
                        </div>
                    </div>
                    <div class="col-md-4" id="id_zt_date" style="display:none;">
                        <label class="control-label control-label-new col-md-5">状态评估时间：</label>
                        <div class="col-md-6 col-xs-6 input-group">
                            <input type="text" class="datetimepickers form-control input-sm choose-date"
                                   id="datejyztpgsj" name="ztpgsj" readonly
                                   style="background-color: white"
                                   title="状态评估时间必填"
                                   placeholder="选择时间">
                        </div>
                    </div>
                </div>
                <div class="form-group list-row-space">
                    <label class="control-label col-md-2 col-xs-5  list-row-space">参加集体评审人员：</label>
                    <div class="col-md-6 nopadding">
                        <div class="col-md-4 select-group">
                            <select id="RYDM1" name="RYMC1" class="form-control list-row-space"
                                    data-placeholder="请选择"></select>
                        </div>
                        <div class="col-md-4 select-group">
                            <select id="RYDM2" name="RYMC2" class="form-control list-row-space"
                                    data-placeholder="请选择"></select>
                        </div>
                        <div class="col-md-4 select-group">
                            <select id="RYDM3" name="RYMC3" class="form-control list-row-space"
                                    data-placeholder="请选择"></select>
                        </div>
                    </div>
                    <div class="col-md-4 list-row-space">
                        <label class="control-label col-md-6 col-xs-5">集体评审时间：</label>
                        <div class="col-md-6 col-xs-6 input-group">
                            <input type="text" class="form-control input-sm choose-date" readonly
                                   id="datejtpssj" style="background-color: white"
                                   placeholder="选择时间">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 集体评审信息结束 -->
</form>

<script>
    var pglxdm = '';
    var rjpgdjdm = '';
    var array = [
        {
            id: '0',
            text: "否"
        }, {
            id: "1",
            text: "是"
        }];
    $('#defaultForm').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error label-warning', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "",  // validate all fields including form hidden input
        messages: {},
        rules: {
            qmpgsj: {required: true}
        },
        highlight: function (element) { // hightlight error inputs
            $(element).addClass('has-error');
        },

        invalidHandler: function (event, validator) { //display error alert on form submit
            $('.alert-danger', $('.form-horizontal')).show();
        },
        success: function (label) {
            label.closest('.form-group').removeClass('has-error'); // set success class to the control group
        },
        submitHandler: function (form) {
            var ztpg = $("input[name='ztpg']:checked").val();
            var Url = "yyhptpggl.do?action=insertJtps";
            $.ajax({
                url: Url,
                type: "post",
                dataType: "json",
                data: {
                    yngrbsh: editRow.YNGRBSH,
                    dcjllsh: editRow.DCJLLSH,
                    sqlsh: editRow.SQLSH,
                    jtpslsh: editRow.JTPSLSH,
                    sqgplx: pglxdm,//申请评估类型
                    rjpddj: rjpgdjdm,//软件评定等级
                    jtpddj: $("input[name='JTPDDJMC']:checked").val(),//集体评审等级
                    jtpsjlms: document.getElementById("jtpsjl").value,
                    xyztpgbz: ztpg,//状态评估
                    jyztpgrq: ztpg == '1' ? $("#datejyztpgsj").val() : '',//状态评估时间
                    jyqmpgrq: $("#datejyqmpgsj").val(),//期末评估时间
                    jtpsryqm: ($("#RYDM1").val() == "" ? "" : $("#RYDM1").val() + ",") + ($("#RYDM2").val() == "" ? "" : $("#RYDM2").val() + ",") + ($("#RYDM3").val() == "" ? "" : $("#RYDM3").val()),//参与人员
                    jtpsrq: $("#datejtpssj").val()
                },
                success: function (data) {
                    wnform.toast(data.message);
                    dialogModel.close();
                }
            });
        }
    });
    var changed = function (obj) {
        var strSelector = '#id_zt_date';
        if ($(obj).is(':checked')) {
            if ($(obj).val() == '1') {
                $('#datejyztpgsj').rules("add", {required: true});
                $(strSelector).show();
            }

        } else {
            $(strSelector).hide();
            $('#datejyztpgsj').rules("remove")
        }
    };

    $(function () {
        initForm();
        getDetailRylist();
        getDictionaryData();

    });

    function initForm() {
        $('.datetimepickers').datepicker({
            minView: "month",
            format: "yyyy-mm-dd",
            language: 'zh-CN',
            autoclose: true
        });
        $('#datejtpssj').datepicker({
            autoclose: true,
            endDate: '0d'
        }).datepicker('update', new Date().format('yyyy-MM-dd'));


        wn.iRadioByArrayWithChanged($('#id_radio_container'), array, '', 'ztpg', 5, changed, '0');
        $('#hzxm').html(editRow.XM);
        $('#xb').html(editRow.XB ? editRow.XB : '');
        $('#csrq').html(editRow.CSRQ ? jsGetAge(editRow.CSRQ) : '');
        $('#hzshfzhh').html(editRow.SFZH ? editRow.SFZH : '');
        $('#lxdh').html(editRow.LXDH ? editRow.LXDH : '');
        $('#jzdz').html(editRow.JZDZ ? editRow.JZDZ : '');

    }

    function getDetailRylist() {
        $.ajax({
            url: "common.do?action=getSysCzrylist",
            type: "post",
            dataType: "json",
            data: {
                //jsmc:'签约医生一览表'
            },
            success: function (data) {
                rylist = data.czrys;
                //初始化签约人员
                createSelectByCZRYArray($("#RYDM1"), rylist);
                createSelectByCZRYArray($("#RYDM2"), rylist);
                createSelectByCZRYArray($("#RYDM3"), rylist);
            }
        });
    }

    //取字典数据
    function getDictionaryData() {
        $.ajax({
            url: "yyhptpggl.do?action=DictionaryDatas",
            type: "get",
            dataType: "json",
            data: {},
            success: function (res) {
                wn.createiRadioWidthByArray($("#jtpddjdiv"), res, "JTPDDJ", "JTPDDJMC", 2);
                if (editRow.JTPSLSH) {
                    getDetails();
                } else {
                    getData4jtps();
                }
            }
        });
    }

    function getDetails(value) {
        $.ajax({
            url: "yyhptpggl.do?action=jtpsDictDatas",
            type: "post",
            dataType: "json",
            data: {
                yngrbsh: editRow.YNGRBSH,
                sqlsh: editRow.SQLSH
            },
            beforeSend: function () {
            },
            success: function (res) {
                pglxdm = res.PGLXDM;
                rjpgdjdm = res.PGDJBMCB;
                $('#sqpglxdiv').html(res.PGLXMC);
                $('#rjpddjdiv').html(res.PGDJMCCB);
                $("input[value='" + res.JTPSDJDM + "'][name='JTPDDJMC']").attr("checked", "checked");
                $("input[name='JTPDDJMC']").iCheck({
                    checkboxClass: 'icheckbox_flat-wnred',
                    radioClass: 'iradio_flat-wnred',
                    increaseArea: '20%'
                });
                wn.iRadioByArrayWithChanged($('#id_radio_container'), array, '', 'ztpg', 5, changed, res.XYZTPGBZ);
                if (res.XYZTPGBZ === '1') {
                    $('#id_zt_date').show();
                }
                document.getElementById('jtpsjl').innerText = res.JTPSJLMS;
                $("#datejyztpgsj").val(res.JYZTPGRQ);
                $("#datejyqmpgsj").val(res.JYQMPGRQ);
                $("#datejtpssj").val(res.JTPSRQ);
                if (res.JTPSRYQM.split(',')[0] != undefined)
                    $("#RYDM1").val(res.JTPSRYQM.split(',')[0]);
                if (res.JTPSRYQM.split(',')[1] != undefined)
                    $("#RYDM2").val(res.JTPSRYQM.split(',')[1]);
                if (res.JTPSRYQM.split(',')[2] != undefined)
                    $("#RYDM3").val(res.JTPSRYQM.split(',')[2]);
            },
            complete: function () {
            }

        });
    }

    function getData4jtps() {
        $.ajax({
            url: "yyhptpggl.do?action=get_data_for_jtps",
            type: "post",
            dataType: "json",
            data: {
                yngrbsh: editRow.YNGRBSH,
                sqlsh: editRow.SQLSH
            },
            beforeSend: function () {
            },
            success: function (res) {
                pglxdm = res.PGLXDM;
                rjpgdjdm = res.PGDJBMCB;
                $('#sqpglxdiv').html(res.PGLXMC);
                $('#rjpddjdiv').html(res.PGDJMCCB);
                if (res.PGDJBMCB) {
                    $('input[name=JTPDDJMC][value=' + res.PGDJBMCB + ']').iCheck('check');
                }
            },
            complete: function () {
            }

        });

    }

    function doSave() {
        if ($('#RYDM1').val() != '' && $('#RYDM2').val() != '') {
            if ($('#RYDM1').val() == $('#RYDM2').val()) {
                wnform.toast('调查员不能相同!');
                return;
            }
        }
        if ($('#RYDM1').val() != '' && $('#RYDM3').val() != '') {
            if ($('#RYDM1').val() == $('#RYDM3').val()) {
                wnform.toast('调查员不能相同!');
                return;
            }
        }
        if ($('#RYDM2').val() != '' && $('#RYDM3').val() != '') {
            if ($('#RYDM2').val() == $('#RYDM3').val()) {
                wnform.toast('调查员不能相同!');
                return;
            }
        }
        $('#defaultForm').submit();
    }
</script>

