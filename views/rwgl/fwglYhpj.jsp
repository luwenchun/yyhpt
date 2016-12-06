<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%--
  Created by IntelliJ IDEA.
  User: Mr.wang
  Date: 2016/10/20
  Time: 22:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>医护评价</title>
    <style type="text/css">
        .panel {
            border-radius: 0px;
        }
    </style>
    <link href="layouts/css/white/detail_page.css" rel="stylesheet">
    <link href="frame/plugins/bootstrap-star-rating-master/css/star-rating.css"
          media="all" rel="stylesheet" type="text/css"/>
    <script src="frame/plugins/bootstrap-star-rating-master/js/star-rating.js" type="text/javascript"></script>
</head>
<body>
<form id="fwpjForm" method="post" class="form-horizontal"
      onclick="return false;" style="font-size: 13px;">
    <div class="form-body dialog-form-body">
        <div class="form-group">
            <div class="col-md-12 control-title">
                <p id="FWPJTITLE"></p>
            </div>
        </div>
        <div class="form-group">
            <label class="col-md-2 control-label">服务时间：</label>
            <div class="col-md-4 ">
                <p id="FWSJ" class="control-static control-content"></p>
            </div>
            <label class="col-md-2 control-label">联系电话：</label>
            <div class="col-md-4 " style="padding-bottom: 2px;">
                <p id="LXDH" class="control-static control-content"></p>
            </div>
        </div>
        <div class="form-group">
            <label class="col-md-2 control-label">服务地址：</label>
            <div class="col-md-4 ">
                <p id="FWDZ" class="control-static control-content"></p>
            </div>
        </div>
        <div class="form-group">
            <label class="col-md-2  control-label">接触态度：</label>
            <div id="JCTDDIV" class="col-md-4 rating-stars-fwpf">

            </div>
            <label class="col-md-2  control-label">配合程度：</label>
            <div id="PHCDDIV" class="col-md-4 rating-stars-fwpf">

            </div>
        </div>
        <div class="form-group">
            <label class="col-md-2  control-label">总分：</label>
            <div class="col-md-4">
                <p class="control-static control-content">
                    <span id="ZF" name="ZF" style="font-size:18px;color:#00a65a;"></span> 分</p>
            </div>
        </div>
        <div class="form-group">
            <label class="col-md-2  control-label">评价：</label>
            <div class="col-md-10">
					<textarea class="form-control input-sm control-content" maxlength="250"
                              name="PY" id="PY"></textarea>
            </div>
        </div>
    </div>
    <div class="panel form-body dialog-form-body" style="margin-top: 10px;">
        <div class="form-group">
            <label class="col-md-2  control-label">评价日期：</label>
            <div class="col-md-4">
                <p id="PJRQ" class="control-static control-content"></p>
            </div>
            <label class="col-md-2  control-label">评价人员：</label>
            <div class="col-md-4">
                <p id="PJRYXM" class="control-static control-content"></p>
            </div>
        </div>
    </div>
    <input type="text" class="form-control   input-sm hidden"
           id="PJLSH" name="PJLSH" placeholder="用于绑定服务评价流水号" />
    <input type="text" class="form-control   input-sm hidden"
           id="FWJLLSH" name="FWJLLSH" placeholder="用于绑定服务记录流水号" />
    <input type="text" class="form-control   input-sm hidden"
           id="YNGRBSH" name="YNGRBSH" placeholder="用于绑定域内个人标识号" />
</form>
</body>
<script type="text/javascript">
    var nPhcdpf = 0;    //配合程度：1：很好，2：好，3：中，4：一般，5：差
    var nJctdpf = 0;    //接触态度1：很好，2：好，3：中，4：一般，5：差

    //获取服务记录信息，初始化界面
    function initFwpjForm() {
        //console.error(sRwdxlsh)
        $.ajax({
            url: "yyhptRwglFwgl.do?action=yhpjDetail",
            type: "post",
            dataType: "json",
            data: {
                rwdxlsh: sRwdxlsh,
            },
            beforeSend: function (xhr) {
                //wn.showLoading();
            },
            success: function (data) {
                if (data != undefined) {
                    console.table(data)
                    if (data.rwdxlsh == undefined)
                        wn.clearHandleForm(fwpjForm);
                    //动态加载星级评分标签
                    $('#JCTDDIV').html('<input id="JCTDPJDM" name="JCTDPJDM" type="number" value=\"' + data.JCTDPJDM + '\" class="rating" min=0 max=5 step=1 data-size="xs">');
                    $('#PHCDDIV').html('<input id="PHCDPJDM" name="PHCDPJDM" type="number" value=\"' + data.PHCDPJDM + '\" class="rating" min=0 max=5 step=1 data-size="xs">');
                    var $input = $('input.rating'), count = Object.keys($input).length;
                    if (count > 0) {
                        $input.rating();
                    }
                    //根据id与字段名相同赋值
                    setTimeout(function () {
                        wn.setformEdit(data);
                        setDefaultValue(data);
                    }, 500);
                } else {
                    $('#JCTDDIV').html('<input id="JCTDPJDM" name="JCTDPJDM" type="number" value=0 class="rating" min=0 max=5 step=1 data-size="xs">');
                    $('#PHCDDIV').html('<input id="PHCDPJDM" name="PHCDPJDM" type="number" value=0 class="rating" min=0 max=5 step=1 data-size="xs">');
                    var $input = $('input.rating'), count = Object.keys($input).length;
                    if (count > 0) {
                        $input.rating();
                    }
                    wnform.toast('查询数据失败!');
                }
            },
            complete: function (xhr) {
                //wn.hiddenLoading();
            }
        });
    }

    initFwpjForm();

    function setDefaultValue(data) {
        //var nowTime = new Date();
        var nowTime = new Date(data.PJRQ);
        var sPjrq = nowTime.getFullYear() + '年' + (nowTime.getMonth() + 1) + '月' + nowTime.getDate() + '日';
        $('#FWPJTITLE').text(sRwdxxm + '' + sPjrq + '服务情况');
        sPjrq = nowTime.getFullYear() + '-' + (nowTime.getMonth() + 1) + '-' + nowTime.getDate();
        //改为绑定赋值
        //$('#PJRQ').text(sPjrq);
        if ($('#PJRYXM').text() == '' || $('#PJRYXM').text() == null) {
            $('#PJRYXM').text(sDlryxm);
        }

    }
    ;

    function saveFwpjForm() {
        if ($("#FWJLLSH").val() == '' || $("#FWJLLSH").val() == undefined) {
            wnform.toast('请先进行服务登记!');
            return;
        }

        if (sJalx == '1') {
            wnform.toast('已中止服务，不能修改!');
            $("#btn_Save").prop('disabled', true);
            return;
        }

        //总分为0 则计算评分（弹出页面后没有进行任何操作时）
        if ($('#ZF').text() == '0') {
            caculatePf();
        }
        var data = wn.fillWithForm("fwpjForm");
        data += '&RWDXLSH=' + sRwdxlsh
        data += '&ZF=' + $('#ZF').text();
        data += '&PJLXDM=1';                    //评价类型 1:医护评价
        data += '&PHCDPF=' + nPhcdpf;           //配合程度
        data += '&JCTDPF=' + nJctdpf;           //接触态度
        $.ajax({
            url: "yyhptRwglFwgl.do?action=yhpjAdd",
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
                if (data[0].code == "T") {
                    $("#PJLSH").val(data[0].key);
                    wnform.toast('保存成功!');
                    //pjxmmxTable.bootstrapTable('refresh');
                    dialogModel.close();
                    //刷新列表数据
                    $table.bootstrapTable('refresh');
                    //刷新列表人群统计数据
                    GetRqNum();
                }
                else {
                    wnform.toast('保存失败!' + data[0].message);
                }
            }
        });
    }


    //计算评分
    function caculatePf() {
        if ($('#JCTDPJDM').val() == 5) {
            nJctdpf = 50;
        } else {
            console.info($('#JCTDPJDM').val());
            nJctdpf = 5 * $('#JCTDPJDM').val();
        }
        if ($('#PHCDPJDM').val() == 5) {
            nPhcdpf = 50;
        } else {
            console.info($('#PHCDPJDM').val());
            nPhcdpf = 5 * $('#PHCDPJDM').val();
        }
        console.log("1.服务态度评分：" + nJctdpf);
        console.log("2.配合程度评分：" + nPhcdpf);
        $('#ZF').text(nJctdpf + nPhcdpf);
    }

    /**
     * [description] 初始化页面 事件注册
     */

    $(function () {

        $('div.rating-stars-fwpf').click(function () {
            caculatePf();
        });
    });

</script>
</html>
