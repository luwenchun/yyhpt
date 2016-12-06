var rylist;//登记人员
var djlsh = "";
var jhlsh = "";
var yngrbsh = "";
var mainSelectedRow;

/* 0：审核中，1：通过，2：不通过*/
var array = [{id: '1', text: '通过'}, {id: '0', text: '不通过'}];
var changedSHresult = function (obj) {
    if ($(obj).is(':checked')) {
        if ($(obj).val() == '0') {
            $("#shbtgyy").css('display', 'block');
        }
    } else {
        $("#shbtgyy").css('display', 'none');
    }
};

$(function () {
    getRylist1();
});


function setHlqShInitInfo(row) {

    /**
     * 初始化日期选择控件
     */
    $('.choose-date').datepicker({
        format: 'yyyy-mm-dd',
        weekStart: 0,
        startDate: row.SHRQ,  //从当天开始选
        autoclose: true,
        todayBtn: 'linked',
        language: 'zh-CN'
    }).on('changeDate', function (ev) {
    });

    mainSelectedRow = row;
    setPersonInfomation(row);//个人信息赋值

    setHlqshInfomation(row);//护理券审核信息赋值

}
//个人信息赋值
function setPersonInfomation(row) {
    $('#hzxm').html(row.XM);
    $('#xb').html(row.XBMC);
    $('#nl').html(row.NL);
    $('#jzdz').html(row.JZDZ);
    $('#yblb').html(row.YLFYZFFSMC);
    $('#lxdh').html(row.LXDH);
}


function showHlqgzs(row, value) {
    BootstrapDialog.show({
        title: '护理券补贴告知书',
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        draggable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt_hlqgl.do?action=initHlqgzs'),
        onshow: function (dialogRef) {
        },
        onshown: function (dialogRef) {
            dialogModel = dialogRef;
        },
        onhide: function (dialogRef) {

        },
        onhidden: function (dialogRef) {
        }
    });
};

//护理券审核信息赋值
function setHlqshInfomation(row) {
    var shztFlag = row.SHZT;
    if (shztFlag == '2') {
        shztFlag === '2' ? '0' : shztFlag;
        wn.iRadioByArrayWithChanged($('#shjgdiv'), array, '', 'shzt', 6, changedSHresult, '0');

        if (shztFlag === '2') {
            $("#shbtgyy").css('display', 'block');
            $("#shbtgyy").val(row.SHBTGYY);
        }
    } else {
        wn.iRadioByArrayWithChanged($('#shjgdiv'), array, '', 'shzt', 6, changedSHresult, '1');
        if(shztFlag=='1'){
            $('#zhye_agree').css('display','block');
            if(row.ZHYE==null){
                $('#zhye').html('0' + '元'); //显示账户余额
            }else{
                $('#zhye').html(row.ZHYE + '元'); //显示账户余额
            }

        }
    }
    $('#kssj').html(row.YXQKS);
    $('#jssj').html(row.YXQJS);
    $('#sqrq').html(row.SQRQ);

    if (row.SHRQ && row.SHRQ !='1900-01-01') {
        $('#shrq').datepicker('update', row.SHRQ);
    } else {
        $('#shrq').datepicker('update', new Date().format('yyyy-MM-dd'));
    }

    $('#zhdj').html(row.GLDJMC);

    if(row.ZHYCJE==null){
        $('#zhycje').html('0' + '元');
    }else{
        $('#zhycje').html(row.ZHYCJE + '元');
    }

    if(row.SHRGH){
        $("#shrgh").val(row.SHRGH);
    }

}

function getRylist1() {
    $.ajax({
        url: "common.do?action=getSysCzrylist",
        type: "post",
        dataType: "json",
        data: {},
        success: function (data) {
            rylist = data.czrys;
            wn.createSelectByCZRYArray($("#shrgh"), rylist);
            $('#shrgh').val(rybm).trigger("change");
        }
    });
}

//保存审核结果
function doSaveHlqsh() {
    if (mainSelectedRow.SHZT == '1') {
        wnform.toast("审核已通过");
        return false;
    } else {
        $.ajax({
            url: "yyhpt_hlqgl.do?action=updateHlqgshInfo",
            type: "post",
            dataType: "json",
            data: {
                qyzt: $("input[name='shzt']:checked").val() === '0' ? '' : '0',
                shzt: $("input[name='shzt']:checked").val() === '0' ? '2' : $("input[name='shzt']:checked").val(),
                shrgh: $("#shrgh").find("option:selected").val(),
                shrxm: $("#shrgh").find("option:selected").text(),
                shrq: $('#shrq').val(),
                shbtgyy: $('#shbtgyy').val(),
                qytyrysj: $('#shrq').val(),
                hlqsqlsh: mainSelectedRow.HLQSQLSH,
                yngrbsh: mainSelectedRow.YNGRBSH,
                yngrbsh: mainSelectedRow.YNGRBSH
            },
            success: function (result) {
                if (result.code == "T") {
                    wnform.toast("保存成功");
                    $('#table').bootstrapTable('refresh');
                    hlqshDialog.close();
                } else {
                    wnform.toast("保存失败");
                }
            }
        });
    }

};
