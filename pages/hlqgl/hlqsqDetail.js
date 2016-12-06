var rylist;//登记人员
var hlqSqInfoArray = [];
var hlqsqlsh;
var shzt = '';
var pcdm='';
var hlqSqInfoObj = {
    HLQSQLSH: '',
    DJLSH: '',
    YNGRBSH: '',
    CSRQ: '',//出生日期
    YLFYZFFSDM: '',//医疗费用支付方式代码
    YLFYZFFSMC: '',//医疗费用支付方式名称
    YXQKS: '',//护理券有效期开始
    YXQJS: '',//护理券有效期结束
    JALX: '',//结案类型
    SQRQ: '',//申请日期
    SHZT: '',//审核状态
    SHBTGYY: '',//审核不通过原因
    SHRGH: '',//审核人工号
    SHRXM: '',//审核人姓名
    SHRQ: '',
    QYZT: '',//启用状态
    QYTYSM: '',//说明（启用停用）
    QYTYRYGH: '',//人员工号（启用停用）
    QYTYRYXM: '',//人员姓名（启用停用）
    QYTYRYSJ: '', //时间（启用停用）
};

wn.iCheckInit();

$(function () {
    setInitHlqsqInfo(current_Row);


});

function setInitHlqsqInfo(row) {

    /**
     * 初始化日期选择控件
     */
    $('.choose-date').datepicker({
        format: 'yyyy-mm-dd',
        weekStart: 0,
        startDate: row.KSRQ,  //从当天开始选
        autoclose: true,
        todayBtn: 'linked',
        language: 'zh-CN'
    }).on('changeDate', function (ev) {
    });


    curentRow = row;
    shzt = row.SHZT;
    setPersonInfomation(row);//个人信息赋值
    $('input[name="hlq"]').iCheck('check');

    if (row.YXQKS == undefined) {
        if (row.KSRQ && row.KSRQ != '1900-01-01') {
            $('#kssj').datepicker('update', row.KSRQ);
        } else {
            $('#kssj').datepicker('update', new Date().format('yyyy-MM-dd'));
        }
    } else {
        if (row.YXQKS && row.YXQKS != '1900-01-01') {
            $('#kssj').datepicker('update', row.YXQKS);
        } else {
            $('#kssj').datepicker('update', new Date().format('yyyy-MM-dd'));
        }
    }

    if (row.YXQJS == undefined) {
        if (row.JSRQ && row.JSRQ != '1900-01-01') {
            $('#jssj').datepicker('update', row.JSRQ);
        } else {
            $('#jssj').datepicker('update', new Date().format('yyyy-MM-dd'));
        }
    } else {
        if (row.YXQJS && row.YXQJS != '1900-01-01') {
            $('#jssj').datepicker('update', row.YXQJS);
        } else {
            $('#jssj').datepicker('update', new Date().format('yyyy-MM-dd'));
        }
    }

    if (row.SQRQ && row.SQRQ != '1900-01-01') {
        $('#sqrq').datepicker('update', row.SQRQ);
    } else {
        $('#sqrq').datepicker('update', new Date().format('yyyy-MM-dd'));
    }

    pcdm=row.PCDM;

    $('#zhdj').html(row.GLDJMC);
    $('#zhye').html((row.ZHYE == null ? '0' : row.ZHYE)+'元');
    $('#zhycje').html((row.ZHYCJE == null ? row.PCDM.substr(1,1)*50* DateDiff($('#jssj').val(),$('#kssj').val()).Days/7 : row.ZHYCJE)+'元');

    getParam(row);//获取参数
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

function getParam(row) {
    hlqsqlsh = row.HLQSQLSH;
    hlqSqInfoObj.HLQSQLSH = row.HLQSQLSH;
    hlqSqInfoObj.DJLSH = row.DJLSH;
    hlqSqInfoObj.YNGRBSH = row.YNGRBSH;
    hlqSqInfoObj.CSRQ = row.CSRQ;
    hlqSqInfoObj.YLFYZFFSDM = row.YLFYZFFSDM;//医疗费用支付方式代码
    hlqSqInfoObj.YLFYZFFSMC = row.YLFYZFFSMC;//医疗费用支付方式名称
    hlqSqInfoObj.YXQKS = '';//护理券有效期开始
    hlqSqInfoObj.YXQJS = '';//护理券有效期结束
    hlqSqInfoObj.JALX = '0';//结案类型
    hlqSqInfoObj.SQRQ = row.SQRQ;//申请日期
    hlqSqInfoObj.SHZT = '0';//审核状态
    hlqSqInfoObj.SHBTGYY = '';//审核不通过原因
    hlqSqInfoObj.SHRGH = '';//审核人工号
    hlqSqInfoObj.SHRXM = '';//审核人姓名
    hlqSqInfoObj.SHRQ = '';//审核日期
    hlqSqInfoObj.QYZT = '0';//启用状态
    hlqSqInfoObj.QYTYSM = '';//说明（启用停用）
    hlqSqInfoObj.QYTYRYGH = '';//人员工号（启用停用）
    hlqSqInfoObj.QYTYRYXM = '';//人员姓名（启用停用）
    hlqSqInfoObj.QYTYRYSJ = ''; //时间（启用停用）

    hlqSqInfoObj.YXQKS = row.KSRQ;
    hlqSqInfoObj.YXQJS = row.JSRQ;

    hlqSqInfoArray.push(hlqSqInfoObj);
}

//护理券申请保存
function doSaveHlqsq() {
    if (shzt == '1') {
        wnform.toast("已审核通过");
        $('#id_apply_save').prop("disabled", true);
        return false;
    } else {
        hlqSqInfoArray[0].SQRQ = $('#sqrq').val();
        hlqSqInfoArray[0].YXQKS = $('#kssj').val();
        hlqSqInfoArray[0].YXQJS = $('#jssj').val();

        hlqSqInfoArray[0].ZHYCJE = (pcdm.substr(1,1)*50* (DateDiff($('#jssj').val(),$('#kssj').val()).Days/7).toFixed(0)).toFixed(0);
        hlqSqInfoArray[0].ZHYE = (pcdm.substr(1,1)*50* (DateDiff($('#jssj').val(),$('#kssj').val()).Days/7).toFixed(0)).toFixed(0);

        if ($('input[name=hlq]:checked').val() == '1') {
            $.ajax({
                url: 'yyhpt_hlqgl.do?action=saveHlqsqInfo',
                type: 'post',
                dataType: 'json',
                data: {
                    hlqSqInfo: JSON.stringify(hlqSqInfoArray).toLowerCase(),
                    hlqsqlsh: hlqsqlsh
                },
                success: function (res) {
                    if (res.code == "T") {
                        wnform.toast("保存成功");
                        $('#table').bootstrapTable('refresh');
                    } else {
                        wnform.toast("保存失败");
                        $('#table').bootstrapTable('refresh');
                    }

                    hlqsqDialog.close();
                }
            });
        } else {
            wnform.toast("请选择护理券");
            return false;
        }
    }
};

function forComputeMoney(a) {
    $('#zhycje').html((pcdm.substr(1,1)*50* (DateDiff($('#jssj').val(),$('#kssj').val()).Days/7).toFixed(0)).toFixed(0)+'元');
}

//取时间差  用于计算相差天数
function DateDiff(sDate1, sDate2){ //sDate1和sDate2是字符串 yyyy-MM-dd格式
    var aDate, oDate1, oDate2, iDays, ihours, iminutes, iseconds;
    aDate = sDate1.split("-");
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);//转换为MM-dd-yyyy格式
    aDate = sDate2.split("-");
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    var timeSpan = {};
    var TotalMilliseconds = Math.abs(oDate1 - oDate2);//相差的毫秒数
    timeSpan.Days = parseInt(TotalMilliseconds / 1000 / 60 / 60 /24);
    timeSpan.TotalHours = parseInt(TotalMilliseconds / 1000 / 60 / 60);
    timeSpan.Hours = timeSpan.TotalHours % 24;
    timeSpan.TotalMinutes = parseInt(TotalMilliseconds / 1000 / 60);
    timeSpan.Minutes = timeSpan.TotalMinutes % 60;
    timeSpan.TotalSeconds = parseInt(TotalMilliseconds / 1000);
    timeSpan.Seconds = timeSpan.TotalSeconds % 60;
    timeSpan.TotalMilliseconds = TotalMilliseconds;
    timeSpan.Milliseconds = TotalMilliseconds % 1000;
    return timeSpan;
}