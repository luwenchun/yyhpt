var shztFlag = '';
var oldShzt = ""; //修改前的审核状态

/* 0：审核中，1：审核通过，2：审核不通过 */
var array = [{id: '1', text: '通过'}, {id: '0', text: '不通过'}];
var changedResult = function (obj) {
    var strSelector = '#shbtgyy_div';
    if ($(obj).is(':checked')) {
        if ($(obj).val() == '0') {
            $("#shsm").css('display', 'block');
            $(strSelector).show();
        }
    } else {
        $(strSelector).hide();
        $("#shsm").css('display', 'none');
    }
};

$(function () {
    $('#dxtz').iCheck({
        checkboxClass: 'icheckbox_flat-wnred',
        radioClass: 'iradio_flat-wnred',
        increaseArea: '20%' // optional
    });
    getDictDatas();
});

//获取页面控件数据
function getDictDatas() {
    $.ajax({
        url: 'yyhptqygl.do?action=getQysh',
        type: 'post',
        dataType: 'json',
        data: {
            djlsh: editRow.DJLSH,
            yngrbsh: editRow.YNGRBSH
        },
        success: function (data) {
            setQyInfo(data);
        }
    });
}
//签约信息赋值
function setQyInfo(result) {
    if (result.qyshdata.length > 0) {
        var qyshdata = result.qyshdata[0];
        $('#gldjdmdiv').html(qyshdata.GLDJMC);
        $('#fwjgdm').html(qyshdata.FWJGMC);
        $('#hlygh').html(qyshdata.HLYXM);
        $('#nrnd').html(qyshdata.NRND);
        $('#ksrq').html(qyshdata.KSRQ);
        $('#jsrq').html(qyshdata.JSRQ);
        $('#hlqje').html(qyshdata.HLQJE == null ? '' : qyshdata.HLQJE);
        // $('#yxqks').html(qyshdata.YXQKS == '1900-01-01' ? '' : qyshdata.YXQKS);
        // $('#yxqjs').html(qyshdata.YXQJS == '1900-01-01' ? '' : qyshdata.YXQJS);
        var shzt = qyshdata.SHZT;
        shztFlag = shzt;
        //获取修改前的审核状态
        oldShzt = shzt;
        if (shzt == '2') {
            shzt === '2' ? '0' : shzt;
            wn.iRadioByArrayWithChanged($('#id_review_result'), array, '', 'shzt', 6, changedResult, '0');
            if (shzt === '2') {
                $('#shbtgyy_div').show();
                $("#shsm").css('display', 'block');
            }
        } else {
            wn.iRadioByArrayWithChanged($('#id_review_result'), array, '', 'shzt', 6, changedResult, '1');
        }

        $('#shrq').html(qyshdata.SHRQ == null ? getNowFormatDate() : qyshdata.SHRQ);

        if (qyshdata.SHRXM != null && qyshdata.SHRXM != '') {
            $('#shry').html(qyshdata.SHRXM);
        }
    }
    getNrqyPageData();
}
function getNrqyPageData() {
    $.ajax({
        url: 'yyhptqygl.do?action=getNrqyPageData',
        type: 'post',
        dataType: 'json',
        data: {
            djlsh: editRow.DJLSH,
            yngrbsh: editRow.YNGRBSH
        },
        success: function (result) {
            initNrqyDetail(result);
        }
    });
}

//填充个人信息
function initNrqyDetail(result) {
    var personalInfo = result.grxx[0];
    var hasJhzd = result.hasJhzd;//是否已有制定的计划

    if (hasJhzd != 0) {
        hasJhzdFlag = 1;
    } else {
        hasJhzdFlag = 0;
    }
    if (result.yhryInfoLst.length) {
        $('#isYh_qysh').css('display', 'block');
        $('#isYh').html('是');
        $('#yxqks').html(result.yhryInfoLst[0].KSRQ == '1900-01-01' ? '' : result.yhryInfoLst[0].KSRQ);
        $('#yxqjs').html(result.yhryInfoLst[0].JSRQ == '1900-01-01' ? '' : result.yhryInfoLst[0].JSRQ);
    }
    if (personalInfo != null) {
        bglsh = personalInfo.BGLSH;
        var nl = '';
        if (personalInfo.CSRQ != null && personalInfo.CSRQ != '') {
            nl = jsGetAge(personalInfo.CSRQ);
        }
        fillPageDatas(personalInfo); //填充个人信息
        $('#CSRQ').text(nl);
    }
}
var isSh = 'false';
//保存签约审核结果
function saveQyshResult() {
    var shrqChange = $('#shrq').text();
    if (shrqChange != getNowFormatDate()) {
        shrqChange = getNowFormatDate();
    }
    var sShzt = $("input[name='shzt']:checked").val() === '0' ? '2' : $("input[name='shzt']:checked").val();
    //是否发送短信，0否 1是
    var sSffsdx = "0";
    //如果审核状态修改了且勾选了短信通知
    if (oldShzt != sShzt && document.getElementById("dxtz").checked == true) {
        sSffsdx = "1";
    }
    $.ajax({
        url: 'yyhptqygl.do?action=updateNrdjsh',
        type: 'post',
        dataType: 'json',
        data: {
            djlsh: editRow.DJLSH,
            yngrbsh: editRow.YNGRBSH,
            shzt: sShzt,
            shbtgyy: $('#shsm').val(),
            shztFlag: shztFlag,
            shrq: shrqChange,
            isSh: isSh,
            sffsdx: sSffsdx,
            sjhm: $('#LXDH').text(),
            hlfwjg: $('#fwjgdm').text(),
            fwqsrq: $('#ksrq').text(),
            fwjsrq: $('#jsrq').text(),
        },
        success: function (data) {
            if (data[0].code == "T") {
                wnform.toast("保存成功");
                isSh = 'true';
                $table.bootstrapTable('refresh');
            } else {
                wnform.toast('保存失败');
            }
        }
    });
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}