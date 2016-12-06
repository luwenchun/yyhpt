var rylist;//登记人员
var djlsh = "";
var jhlsh = "";
var yngrbsh = "";
var ygldjdm = "";
var flag = "bgsq";
var bgsqlsh = "";
var selectedRow = {};
var xt_jlzt = '';
var jalx = '';

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
    getZcjgInfo();
});

var jgmc = '';
var zcjg = '';
//注册机构
function getZcjgInfo() {
    $.ajax({
        url: 'yyhpt_lhbg.do?action=getZcjgInfo',
        type: 'get',
        dataType: 'json',
        data: {},
        success: function (data) {
            zcjg = data.rows;
            setShInitInfo(mainSelectedRow);
        }
    })
}

function getSQDXLXDM() {
    $.ajax({
        url: 'yyhpt_lhbg.do?action=getSQDXLXDM',
        type: 'get',
        dataType: 'json',
        data: {
            pglsh: pglsh,
            bgsqlsh: mainSelectedRow.BGSQLSH
        },
        success: function (data) {
            sqdxlxmc = data.rows[0].DXLXMC;
        }
    })
}

var zpwh;
var pglsh = '';
var fplsh = '';
var yngrbsh = '';
var tdpwh = '';
var dlxh = '';
var dllsh = '';
var tdlxdm = '';
var bglxdm = '';
var shztFlag = '';
var sqdxlxmc = '';
var dxlxmc = '';
var ytdlxdm = '';//原通道类型
var yxjgInfo = {YXJGDM: '', YYXJGDM: '', XT_DJJGDM: ''};
function setShInitInfo(row) {
    setPersonInfomation(row);//个人信息赋值

    getParamInfo(row);

    if (bglxdm == '1') {
        $('#bglx').html('通道变更');
        isFq='1';//弹框所需
    } else {
        $('#bglx').html('放弃');
    }
    $('#ytd').html(row.YTDLXDM);//原通道类型

    for (var i = 0; i < zcjg.length; i++) {
        if (zcjg[i].id == jgmc) {
            switch (bglxdm) {
                case '1':
                    if(dxlxmc){
                        $('#lhjgyx').html(zcjg[i].text + "(" + dxlxmc + ")");//意向机构
                    }else{
                        $('#lhjgyx').html(zcjg[i].text);//意向机构
                    }
                    $('#xsqtd').html(row.SQTDLXMC);
                    break;
                case '2':
                    $('#lhjgyx').html(zcjg[i].text);//意向机构
                    $('#xsqtd').html(row.YTDLXDM);
                    break;
                default:
                    $('#lhjgyx').html(zcjg[i].text);//意向机构
                    $('#xsqtd').html(row.SQTDLXMC);
            }

        }
    }

    if (shztFlag == '2') {
        shztFlag === '2' ? '0' : shztFlag;
        wn.iRadioByArrayWithChanged($('#changeShResult'), array, '', 'shzt', 6, changedSHresult, '0');

        if (shztFlag === '2') {
            $("#shbtgyy").css('display', 'block');
        }
    } else {
        wn.iRadioByArrayWithChanged($('#changeShResult'), array, '', 'shzt', 6, changedSHresult, '1');
    }

    $('#shrq').html(row.SHRQ == null ? getNowFormatDate() : row.SHRQ);

    if (row.SHRXM != null && row.SHRXM != '') {
        $('#shry').html(row.SHRXM);
    }
    getNewDlxh();
    displayFJInfomation();
}
//个人信息赋值
function setPersonInfomation(row) {
    $('#XM').html(row.XM ? row.XM : '');
    $('#XBMC').html(row.XB ? row.XB : '');
    $('#CSRQ').html(jsGetAge(row.CSRQ) ? jsGetAge(row.CSRQ) : '');
    $('#YLFYZFFSMC').html(row.YLFYZFFSMC ? row.YLFYZFFSMC : '');
    $('#LXDH').html(row.LXDH ? row.LXDH : '');
    $('#LXDZ').html(row.JZDZ ? row.JZDZ : '');
}
//从row中获取参数
function getParamInfo(row) {
    yxjgInfo.YXJGDM = row.YXJGDM; //已申请的意向机构
    yxjgInfo.YYXJGDM = row.YYXJGDM;//原意向机构
    yxjgInfo.XT_DJJGDM = row.XT_DJJGDM;
    zpwh = row.ZPW;
    pglsh = row.PGLSH;

    getSQDXLXDM();

    fplsh = row.FPLSH;
    yngrbsh = row.YNGRBSH;
    // tdpwh = row.TDPWH;
    dllsh = row.DLLSH;

    switch (row.YTDLXDM) {
        case '普通通道' :
            ytdlxdm = 'C';
            break;
        case '优先通道' :
            ytdlxdm = 'B';
            break;
        case '特殊通道' :
            ytdlxdm = 'A';
            break;
        default:
            ytdlxdm = 'C';
            break;
    }

    tdlxdm = row.SQTDLXDM;
    bglxdm = row.BGLXDM;
    dxlxmc = row.DXLXMC;
    jgmc = row.YXJGDM;
    shztFlag = row.SHZT;
}

function displayFJInfomation() {
    if (mainSelectedRow.FJ) {
        displayFiles($('#fileDiv'), 'uploadfiles/LHBGSQ', mainSelectedRow.BGSQLSH, mainSelectedRow.FJ);
    } else {
        $('#fjDiv').hide();
        $('#review').css('margin-bottom', 12);
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
            wn.createSelectByCZRYArray($("#sqrgh"), rylist);
            wn.createSelectByCZRYArray($("#shrgh"), rylist);
            $('#sqrgh').val(rybm).trigger("change");
        }
    });
}

function getNewDlxh() {
    $.ajax({
        url: "yyhpt_lhbg.do?action=getDlxhInfo",
        type: "post",
        dataType: "json",
        data: {
            tdlxdm: tdlxdm,
            zpwh: parseInt(zpwh),
            yxjgdm: yxjgInfo.YXJGDM
        },
        success: function (data) {
            if (yxjgInfo.YXJGDM == yxjgInfo.YYXJGDM) {
                if (ytdlxdm == 'A') {
                    if (data.dlxhInfo.length == 0) {
                        dlxh = tdlxdm + '0' + '-' + zpwh;
                        // dlxh = tdlxdm + '1';
                    } else {
                        var pDlxh = data.dlxhInfo[0].DLXH;
                        if (pDlxh.substr(0, pDlxh.indexOf("-")) == '') {
                            dlxh = pDlxh + '-' + zpwh;
                        } else {
                            dlxh = pDlxh.substr(0, pDlxh.indexOf("-")) + '-' + zpwh;
                        }
                    }
                } else if (ytdlxdm == 'B') {
                    if (tdlxdm == 'A') {
                        if (data.dlxhInfo.length == 0) {
                            // dlxh = tdlxdm + '0' + '-' + zpwh;
                            dlxh = tdlxdm + '1';
                        } else {
                            if (data.dlxhInfo.length == 0) {
                                dlxh = tdlxdm + '0' + '-' + zpwh;
                            } else {
                                var pDlxh = data.difJgDlxh[0].DLXH;
                                if (pDlxh.substr(0, pDlxh.indexOf("-")) == '') {
                                    dlxh = 'A' + (parseInt(pDlxh.substr(1)) + 1);
                                } else {
                                    dlxh = 'A' + (parseInt(pDlxh.substr(1, pDlxh.indexOf("-"))) + 1);
                                }
                            }
                        }
                    } else {
                        if (data.dlxhInfo.length == 0) {
                            dlxh = tdlxdm + '0' + '-' + zpwh;
                        } else {
                            var pDlxh = data.dlxhInfo[0].DLXH;
                            if (pDlxh.substr(0, pDlxh.indexOf("-")) == '') {
                                dlxh = pDlxh + '-' + zpwh;
                            } else {
                                dlxh = pDlxh.substr(0, pDlxh.indexOf("-")) + '-' + zpwh;
                            }
                        }
                    }
                } else {
                    if (data.dlxhInfo.length == 0) {
                        dlxh = tdlxdm + '1';
                    } else {
                        var pDlxh = data.difJgDlxh[0].DLXH;
                        if (pDlxh.substr(0, pDlxh.indexOf("-")) == '') {
                            dlxh = 'A' + (parseInt(pDlxh.substr(1)) + 1);
                        } else {
                            dlxh = 'A' + (parseInt(pDlxh.substr(1, pDlxh.indexOf("-"))) + 1);
                        }
                    }
                }
            } else {
                if (data.difJgDlxh.length == 0) {
                    dlxh = tdlxdm + "1";
                    zpwh = 1;
                } else {
                    var difzpwh = parseInt(data.difJgDlxh.ZPWH) + 1;
                    dlxh = tdlxdm + difzpwh;
                    if (data.maxZpwh[0].ZPWH) {
                        zpwh = parseInt(data.maxZpwh[0].ZPWH) + 1;
                    }
                }

            }
        }
    });
}

function doSaveLhbgsh() {
    isSuccess = '';
    dlxhInfo = dlxh;

    if (dlxh.substr(1, dlxh.indexOf("-")) == '') {
        tdpwh=dlxh.substr(1, dlxh.length);
    } else {
        tdpwh=dlxh.substr(1, dlxh.indexOf("-")-1);
    }

    if (shztFlag == '1') {
        wnform.toast('已审核通过！');
        $('#btn_jhbgsh_save').prop("disabled", true);
        return false;
    } else {
        if (yxjgInfo.YXJGDM != yxjgInfo.XT_DJJGDM) {
            wnform.toast('意向机构与审核机构不符！');
            $('#btn_jhbgsh_save').prop("disabled", true);
            return false;
        } else {
            lhbgshResult = $("input[name='shzt']:checked").val() === '0' ? '2' : $("input[name='shzt']:checked").val();
            isSaveFlag = '1';
            if (isshflag && mainSelectedRow.SHZT != '0') {
                wnform.toast('已发起新的变更，不允许操作!');
                $('#btn_jhbgsh_save').prop("disabled", true);
                return false;
            } else {
                var Url = "yyhpt_lhbg.do?action=updateLhbgshInfo";
                $.ajax({
                    url: Url,
                    type: "post",
                    dataType: "json",
                    data: {
                        shzt: $("input[name='shzt']:checked").val() === '0' ? '2' : $("input[name='shzt']:checked").val(),
                        shrxm: $("#shry").html(),
                        shrq: $('#shrq').html(),
                        shbtgyy: $('#shbtgyy').val(),
                        bgsqlsh: mainSelectedRow.BGSQLSH,
                        bglxdm: bglxdm,
                        yngrbsh: mainSelectedRow.YNGRBSH,
                        dllsh: mainSelectedRow.DLLSH,
                        tdlxdm: tdlxdm,
                        zpwh: parseInt(zpwh),
                        yxjgdm: jgmc,
                        pglsh: pglsh,
                        fplsh: fplsh,
                        yngrbsh: yngrbsh,
                        tdpwh: parseInt(tdpwh),
                        dlxh: dlxh,
                        dllsh: dllsh,
                        shztFlag: shztFlag
                    },
                    success: function (result) {
                        if (result.code == "T") {
                            isSuccess = '1';
                            wnform.toast("保存成功");
                            $('#lhbgglTable').bootstrapTable('refresh');
                            lhshDialog.close();
                        } else {
                            wnform.toast("保存失败");
                        }
                    }
                });
            }
        }
    }
};

var isshflag = false;
getGrbgjlInfo();
function getGrbgjlInfo() {
    $.ajax({
        url: "yyhpt_lhbg.do?action=getGrbgjlInfo",
        type: "post",
        dataType: "json",
        data: {
            yngrbsh: mainSelectedRow.YNGRBSH
        },
        success: function (result) {
            if (mainSelectedRow.BGSQLSH != result.lhbgjl[0].BGSQLSH) {
                isshflag = true;
            }
        }
    });
}