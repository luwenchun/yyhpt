var rylist;//登记人员
var djlsh = "";
var jhlsh = "";
var yngrbsh = "";
var mainSelectedRow;
var qyzt='';//是否启用停用
var qytysm='';//启用停用说明
var qytyrygh='';//人员工号（启用停用）
var qytyryxm='';//人员姓名（启用停用）
var qytyrysj='';
var tempFlag='';
wn.iCheckInit();

$(function () {
    getRylist1();
});


function setHlqxgInitInfo(row, flag) {

    /**
     * 初始化日期选择控件
     */
    $('.choose-date').datepicker({
        format: 'yyyy-mm-dd',
        weekStart: 0,
        startDate: row.SQRQ,  //从当天开始选
        autoclose: true,
        todayBtn: 'linked',
        language: 'zh-CN'
    }).on('changeDate', function (ev) {
    });

    tempFlag=flag;
    mainSelectedRow = row;

    if (flag == 'isTy') {
        $('#isQyHlq').css('display', 'block');
        $('#isTyHlq').css('display', 'none');
        $('input[name="hlqqy"]').iCheck('check');
        // $('#shbtgyy_qy').val(row.QYTYSM);
    } else {
        $('#isQyHlq').css('display', 'none');
        $('#isTyHlq').css('display', 'block');
        $('input[name="hlqty"]').iCheck('check');
        // $('#shbtgyy').val(row.QYTYSM);
    }

    setPersonInfomation(row);//个人信息赋值

    setHlqxgInfomation(row);//护理券修改信息赋值

}
//个人信息赋值
function setPersonInfomation(row) {
    $('#hzxm').html(row.XM);
    $('#xb').html(row.XBMC);
    $('#csrq').html(row.NL);
    $('#hzshfzhh').html(row.SFZH);
    $('#yblb').html(row.YLFYZFFSMC);
    $('#jzdz').html(row.JZDZ);
    $('#lxdh').html(row.LXDH);
}

//护理券修改信息赋值
function setHlqxgInfomation(row) {
 /*   if (row.QYTYRYSJ) {
        $('#tyrq').datepicker('update', row.QYTYRYSJ);
        $('#qyrq').datepicker('update', row.QYTYRYSJ);
        $('#czrq_qy').datepicker('update', row.QYTYRYSJ);
        $('#czrq').datepicker('update', row.QYTYRYSJ);
    } else {
        $('#tyrq').datepicker('update', new Date().format('yyyy-MM-dd'));
        $('#qyrq').datepicker('update', new Date().format('yyyy-MM-dd'));
        $('#czrq_qy').datepicker('update', new Date().format('yyyy-MM-dd'));
        $('#czrq').datepicker('update', new Date().format('yyyy-MM-dd'));
    }*/

    $('#tyrq').datepicker('update', new Date().format('yyyy-MM-dd'));
    $('#qyrq').datepicker('update', new Date().format('yyyy-MM-dd'));
    $('#czrq_qy').datepicker('update', new Date().format('yyyy-MM-dd'));
    $('#czrq').datepicker('update', new Date().format('yyyy-MM-dd'));
}

function getRylist1() {
    $.ajax({
        url: "common.do?action=getSysCzrylist",
        type: "post",
        dataType: "json",
        data: {},
        success: function (data) {
            rylist = data.czrys;
            wn.createSelectByCZRYArray($("#czry"), rylist);
            wn.createSelectByCZRYArray($("#czrgh"), rylist);
            $('#czry').val(rybm).trigger("change");
            $('#czrgh').val(rybm).trigger("change");
        }
    });
}

//保存审核结果
function doSaveHlqxg(flagForDialog) {
    if (tempFlag == 'isTy') {
        qyzt=$('input[name=hlqqy]:checked').val();
        qytysm=$('#shbtgyy_qy').val();
        qytyrygh=$("#czrgh").find("option:selected").val();
        qytyryxm=$("#czrgh").find("option:selected").text();
        qytyrysj=$('#czrq_qy').val();

    } else {
        qyzt=$('input[name=hlqty]:checked').val();
        qytysm=$('#shbtgyy').val();
        qytyrygh=$("#czry").find("option:selected").val();
        qytyryxm=$("#czry").find("option:selected").text();
        qytyrysj=$('#czrq').val();
    }

    $.ajax({
        url: "yyhpt_hlqgl.do?action=updateHlqgshInfo",
        type: "post",
        dataType: "json",
        data: {
            qyzt: qyzt,
            qytysm: qytysm,
            qytyrygh: qytyrygh,
            qytyryxm: qytyryxm,
            qytyrysj: qytyrysj,
            hlqsqlsh: mainSelectedRow.HLQSQLSH,
            yngrbsh: mainSelectedRow.YNGRBSH,
            yngrbsh: mainSelectedRow.YNGRBSH
        },
        success: function (result) {
            if (result.code == "T") {
                wnform.toast("保存成功");
                $('#table').bootstrapTable('refresh');
                flagForDialog.close();
            } else {
                wnform.toast("保存失败");
            }
        }
    });
};
