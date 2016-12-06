/*
 * Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
 */

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
var curentRow;

var checkBlock = function (id) {
    $('#' + id).trigger('click');
};

/* 0：通道变更，1：放弃*/
var array = [{id: '1', text: '通道变更'}, {id: '0', text: '放弃'}];
//切换变更类型
var changedType = function (obj) {
    if ($(obj).is(':checked')) {
        if ($(obj).val() == '0') {
            $("#defaultForm_fq").css('display', 'block');
            $("#defaultForm_tdbg").css('display', 'none');
        }
    } else {
        $("#defaultForm_fq").css('display', 'none');
        $("#defaultForm_tdbg").css('display', 'block');
    }
};
//切换放弃原因
var changedFqyy = function (obj) {
    if ($(obj).is(':checked')) {
        if ($(obj).val() == '4') {
            $("#shsm").css('display', 'block');
        }
    } else {
        $("#shsm").css('display', 'none');
    }
};

$(function () {
    var row = $('#btn_query').data('row');
    var initButtons = function () {
        var $block = $('.block');
        $block.on('click', function () {
            $('.block').removeClass('block-selected');
            $(this).addClass('block-selected');
            $('input[name=dxlx]').iCheck('uncheck');

            if ($(this).prop('id') === 'A') {
                $('#tdlx_A_div').show();
                $('#tdlx_B_div').hide();
            } else if ($(this).prop('id') === 'B') {
                $('#tdlx_A_div').show();
                $('#tdlx_B_div').show();
            } else {
                $('#tdlx_A_div').hide();
                $('#tdlx_B_div').hide();
            }
        });
    };

    var checkBlock = function (id) {
        $('#' + id).trigger('click');
    };
    initButtons();
    getDetailInfo(bgsqlsh, fj, sqtdlxdm, sqdxlxdm);
    wn.iCheckInit();

});

function getDetailInfo(bgsqlsh, fj, sqtdlxdm, sqdxlxdm) {
    $.when($.getJSON('common.do?action=get_dept', function (res) {
        $('#lhyx').select2({
            language: 'zh-CN',
            data: res,
            allowClear: false,
            multiple: false
        });
    }), $.getJSON('common.do?action=getDXLX', function (res) {
        wn.iCheckboxByArray($('#tdlx_A_div'), res.part1, 'dxlx', 'dxlx');
        wn.iCheckboxByArrayWithChanged($('#tdlx_B_div'), res.part2, 'dxlx', 'dxlx', '6', null);
    })).then(function () {
        if (bgsqlsh) {
            $.fn.fileinput("show", "uploadfiles/LHBGSQ", bgsqlsh, fj, "fjdzDiv", "fileDiv");
        } else {
            $.fn.fileinput("show", "uploadfiles/LHBGSQ", null, null, "fjdzDiv", "fileDiv");
        }
    });

}

var bgsqlsh = '';
var ytdlxdm = '';
var ydxlxdm = '';
var dllsh = '';
var ydlxh = '';
var shzt = '';
var zpwh = '';
var fj = '';
var bglxdm = '';
var fqyydm = '';
var sqsj = '';
var sqrxm = '';
var dxlxmc = '';
var sqdxlxdm = '';
var sqtdlxdm = '';
var yxjgdm_lhbg = '';
function setInitInfo(row, flag) {
    curentRow = row;
    setPersonInfomation(row);//个人信息赋值
    getParm(row, flag);//获取所需参数
    // setFqyyInfo();//放弃原因赋值
    getZcjgInfo(yxjgdm_lhbg);//注册机构赋值
    checkBlock(sqtdlxdm);//切换通道三种类型
    setDxlxInfo();//对象赋值
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

//获取所需参数
function getParm(row, flag) {
    if (flag == 2) {
        bgsqlsh = row.BGSQLSH;
        ydxlxdm = row.YDXLXDM;
        shzt = row.SHZT;
        bglxdm = row.BGLXDM;
        fqyydm = row.FQYYDM;
        sqsj = row.SQRQ;
        sqrxm = row.SQRXM;
        ytdlxdm = row.TDLXDM;
        $('#sqry').html(row.SQRXM);
        sqtdlxdm = row.SQTDLXDM.toUpperCase();
        dxlxmc = row.DXLXMC;
        sqdxlxdm = row.SQDXLXDM;
    } else {
        sqsj = getNowFormatDate();
        ytdlxdm = row.TDLXDM;
        ydxlxdm = row.DXLXDM;
    }
    $('input[name=dxlx]').prop('checked', false); //trigger之后会选中第一个checkbox，赋值之前先清掉
    ydlxh = row.DLXH;
    zpwh = row.ZPW;
    dllsh = row.DLLSH;
    fj = row.FJ;
    yxjgdm_lhbg = row.YXJGDM;

    $('#sqrq').html(sqsj);
    if (bgsqlsh != null && bgsqlsh != '' && shzt != '0') {
        $('#ytd').html(row.YTDLXDM);
    } else {
        $('#ytd').html(row.TDLX);
    }
}

//放弃原因赋值
function setBglxInfo() {
    if (bglxdm == '2') {
        bglxdm === '2' ? '0' : bglxdm;
        wn.iRadioByArrayWithChanged($('#id_changeType'), array, '', 'bglx', 6, changedType, '0');
        if (bglxdm === '2') {
            $("#defaultForm_fq").css('display', 'block');
            $("#defaultForm_tdbg").css('display', 'none');
        }
    } else {
        wn.iRadioByArrayWithChanged($('#id_changeType'), array, '', 'bglx', 6, changedType, '1');
    }
}

function setFqyyInfo() {
    if (fqyydm == '5') {
        wn.iRadioByArrayWithChanged($('#id_changeFqyy'), fqyyArray, '', 'fqyy', 2, changedFqyy, '5');
        if (bglxdm === '2') {
            $("#shsm").css('display', 'block');
            $("#shsm").html(row.FQYYSM);
        }
    } else if (fqyydm == '' || fqyydm == null) {
        wn.iRadioByArrayWithChanged($('#id_changeFqyy'), fqyyArray, '', 'fqyy', 2, changedFqyy, '1');
    } else {
        wn.iRadioByArrayWithChanged($('#id_changeFqyy'), fqyyArray, '', 'fqyy', 2, changedFqyy, fqyydm);
    }
}

function setDxlxInfo() {
    $.each(sqdxlxdm.split('/'), function (k, v) {
        $('input[name=dxlx][value=' + v + ']').prop('checked', true);
    });
    wn.iCheckInit();

    if (bgsqlsh) {
        $.fn.fileinput("show", "uploadfiles/LHBGSQ", bgsqlsh, fj, "fjdzDiv", "fileDiv");
    } else {
        $.fn.fileinput("show", "uploadfiles/LHBGSQ", null, null, "fjdzDiv", "fileDiv");
    }
}

var upload = function upload(data) {
    var formData = getFileData("#defaultForm");
    formData.append("bgsqlsh", data.key);
    event.preventDefault();
    $.ajax({
        url: 'yyhpt_lhbg.do?action=upload',
        type: 'POST',
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (res) {
        },
        error: function () {
            wnform.toast('上传附件失败！');
        }
    });
};

//变更申请
function doSaveLhbgsq() {
    if (shzt == '1') {
        wnform.toast("已审核通过");
        $('#btn_save_jhbgsq').prop("disabled", true);
        return false;
    } else {

        if ($("input[name='bglx']:checked").val() == '1') {
            saveTdbg();
        } else {
            saveFq();
        }
    }
};

function saveTdbg() {
    var deferred = when.defer();
    var row = $('#btn_query').data('row');
    var v = {code: '', name: ''};
    var getDxlx = function () {
        var code = [], name = [];
        $.each($('input[name=dxlx]:checked'), function (k, v) {
            code.push($(v).prop('value'))
            name.push($(v).parent().parent().text().trim());
        });
        v.code = code.join('/');
        v.name = name.join(',');
        return v;
    };
    if ($('.block-selected').prop('id') === 'A' || $('.block-selected').prop('id') === 'B') {
        if ($('input[name=dxlx]:checked').size() <= 0) {
            wnform.toast("请选择特殊通道或优先通道原因！");
            return false;
        }
        if ($.fn.fileinput("array").length <= 0) {
            wnform.toast("请上传证明材料！");
            return false;
        }
    }
    if ($('.block-selected').prop('id') == ytdlxdm) {
        wnform.toast("通道未改变");
        return false;
    } else {
        var Url = "yyhpt_lhbg.do?action=saveLhbgsqInfo";
        $.ajax({
            url: Url,
            type: "post",
            dataType: "json",
            data: {
                bgsqInfo: JSON.stringify(curentRow).toLowerCase(),
                bgsqlsh: bgsqlsh,
                bglxdm: $("input[name='bglx']:checked").val() === '0' ? '2' : $("input[name='bglx']:checked").val(),
                fqyydm: $("input[name='fqyy']:checked").val() == 'undefined' ? '' : $("input[name='fqyy']:checked").val(),
                fqyysm: $('#shsm').val(),
                ytdlxdm: ytdlxdm,
                ydxlxdm: ydxlxdm,
                sqtdlxdm: $('.block-selected').prop('id'),
                sqdxlxdm: getDxlx().code,
                ydlxh: ydlxh,
                fj: null,
                zpwh: zpwh,
                dxlxmc: getDxlx().name,
                sqyxjgdm: $("#fwjgdm").find("option:selected").val()
            },
            success: function (result) {
                upload(result);
                deferred.resolve(result);
                if (result.code == "T") {
                    wnform.toast("保存成功");
                    $('#lhbgglTable').bootstrapTable('refresh');
                    lhsqDialog.close();
                } else {
                    wnform.toast("保存失败");
                }
            }
        });
    }
}

function saveFq() {
    var deferred = when.defer();
    var row = $('#btn_query').data('row');
    var v = {code: '', name: ''};
    var getDxlx = function () {
        var code = [], name = [];
        $.each($('input[name=dxlx]:checked'), function (k, v) {
            code.push($(v).prop('value'))
            name.push($(v).parent().parent().text().trim());
        });
        v.code = code.join('/');
        v.name = name.join(',');
        return v;
    };
    var Url = "yyhpt_lhbg.do?action=saveLhbgsqInfo";
    $.ajax({
        url: Url,
        type: "post",
        dataType: "json",
        data: {
            bgsqInfo: JSON.stringify(curentRow).toLowerCase(),
            bgsqlsh: bgsqlsh,
            bglxdm: $("input[name='bglx']:checked").val() === '0' ? '2' : $("input[name='bglx']:checked").val(),
            fqyydm: $("input[name='fqyy']:checked").val() == 'undefined' ? '' : $("input[name='fqyy']:checked").val(),
            fqyysm: $('#shsm').val(),
            ytdlxdm: ytdlxdm,
            ydxlxdm: ydxlxdm,
            sqtdlxdm: $('.block-selected').prop('id'),
            sqdxlxdm: getDxlx().code,
            ydlxh: ydlxh,
            fj: null,
            zpwh: zpwh,
        },
        success: function (result) {
            upload(result);
            deferred.resolve(result);
            if (result.code == "T") {
                wnform.toast("保存成功");
                $('#lhbgglTable').bootstrapTable('refresh');
                lhsqDialog.close();
            } else {
                wnform.toast("保存失败");
            }
        }
    });
}

//注册机构赋值
var jglist;
function getZcjgInfo(yxjgdm_lhbg) {
    $.ajax({
        url: 'yyhpt_lhbg.do?action=getZcjgInfo',
        type: 'get',
        dataType: 'json',
        data: {},
        success: function (data) {
            jglist = data.rows;
            // 初始化机构
            createSelectByCZRYArray($("#fwjgdm"), jglist, yxjgdm_lhbg);
            $("#fwjgdm").select2({language: 'zh-CN'});


            setBglxInfo();

            setFqyyInfo();//放弃原因赋值
        }
    })
}

function createSelectByCZRYArray(selObject, array, yxjgdm_lhbg) {

    var selectBody = "";
    // var selectBody = "<option value=''>--请选择--</option>";
    $.each(array, function () {
        if (this.id == yxjgdm_lhbg) {
            selectBody += "<option value=" + this.id + " selected = 'selected' name='jgbm'>" + this.text
                + "</option>";
        } else {
            selectBody += "<option value=" + this.id + " name='jgbm'>" + this.text
                + "</option>";
        }

    });
    selObject.html(selectBody);
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