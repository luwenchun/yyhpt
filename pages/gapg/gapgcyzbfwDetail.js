var mbInfo = '';
var cyzbhtml = "";
var ksbsInfohtml = '';
var sapglsh = '';
var jhpglsh = '';
var yngrbsh = '';
function setGrInfo() {
    $('#grxx_xm').html(currow.XM);
    $('#grxx_xb').html(currow.XBMC ? currow.XBMC : '');
    $('#grxx_csrq').html(currow.CSRQ ? currow.CSRQ : '');
    $('#grxx_ryrq').html(currow.RYRQ ? currow.RYRQ : '');
    $('#grxx_cyrq').html(currow.CYRQ ? currow.CYRQ : '');
};
setGrInfo();
$(function () {
    yngrbsh = currow.YNGRBSH;
    sapglsh = currow.SAPGLSH;
    jhpglsh = currow.JHPGLSH;
    console.log(yngrbsh);
    console.log(sapglsh);
    console.log(jhpglsh);
    $("#pgrq").html(getNowFormatDate());

    $('#btn_Cyxj').bind('click', function () {

        var syxh = currow.JHPGLSH;
        var sUrl = cyxjUrl+"&jzlsh="+syxh;
        console.log(sUrl);
        window.open(sUrl);
        /*BootstrapDialog.show({
            title: '出院小结',
            size: BootstrapDialog.SIZE_WIDE,
            cssClass: 'dialog-bg-color dialog-footer-space',
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/gapg/cyxjDetail.jsp'),
            buttons: [{
                label: '退出', cssClass: 'btn-default btn-sm',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }],
            onshow: function (dialogRef) {
            },
            onshown: function (dialogRef) {
            },

            onhide: function (dialogRef) {
            },
            onhidden: function (dialogRef) {
            }
        });*/


    });

    getMbInfo();

    $('input[name="zt"]').on('ifClicked', function (event) {
        if(event.target.value=="其他"){
            if($('#12').is(':checked')) {
                $("#fjxq").hide();
            }else{
                $("#fjxq").show();
            }
        }else{
            if($('#12').is(':checked')) {
                $("#fjxq").show();
            }else{
                $("#fjxq").hide();
            }
        }
    });
});

function getMbInfo() {
    $.ajax({
        url: 'yyhpt_gapg.do?action=getMbnr',
        type: 'get',
        dataType: 'json',
        data: {
            yngrbsh: currow.YNGRBSH,
            sapglsh: currow.SAPGLSH
        },
        success: function (data) {
            $("#fjxq").hide();
            if (data == undefined) {
                wnform.toast('查询模板失败!');
            } else {
                console.log(data);
                //绑定评估结果流水号
                $('#GAPGLSH').val(data.mbnr.GAPGLSH);
                if (data.mbnr.GAXQDM == '2') {
                    $('#jjzh').iCheck('check');
                } else if (data.mbnr.GAXQDM == '1') {
                    $('#jgzh').iCheck('check');
                }
                mbInfo = jQuery.parseJSON(data.mbnr.MBNR);
                createHtml(mbInfo);
                wn.iCheckInit();
                if (data.mbnr.PGNR != '' || data.mbnr.PGNR != null) {
                    //初始化赋值
                    setPgInfo(data.mbnr.PGNR);
                }
                //赋值辅具需求
                var sFjxq = data.mbnr.FJXQ;
                var fjxqs = sFjxq.split(';')
                for (var i = 0; i < fjxqs.length; i++) {
                    sFjxq = fjxqs[i];
                    if (sFjxq == '' || sFjxq == null) {
                        continue;
                    }
                    if (sFjxq.substr(0, 2) == '12') {
                        $('#' + sFjxq.substr(0, 2)).iCheck('check');
                        $('#fjxq').val(sFjxq.substr(3, sFjxq.length - 3));
                    } else {
                        $('#' + sFjxq).iCheck('check');
                    }
                }
                if ($('#12').is(':checked')) {
                    $("#fjxq").show();
                }else{
                    $("#fjxq").hide();
                }
            }
        }
    })
};

function createHtml(mbInfo) {
    $("#bodyPGInfopanel").html(initForm_gapg(mbInfo, '1'));
    $("#ksbsInfopanel").html(initForm_gapg(mbInfo, '2'));
};

function initForm_gapg(mbInfo, flag) {
    //mbInfo 模板内容
    console.log(mbInfo);
    if (flag == '1') {
        for (var i = 0; i < mbInfo[0].PGTM.length; i++) {
            if (mbInfo[0].PGTM[i].ZBT == '11.伤口:' || mbInfo[0].PGTM[i].ZBT == '12.营养饮食:') {
                cyzbhtml += "<div class='col-md-12 icheckDiv'  id='" + mbInfo[0].PGTM[i].PGBM + '.' + mbInfo[0].PGTM[i].TMXH + "'  style='padding-top: 5px;'>"
                    + "<div class='col-md-2 col-xs-3 nopadding' style='text-align:left;'><label class='control-label nopadding' id='" + mbInfo[0].PGTM[i].PGBM + "' value='" + mbInfo[0].PGTM[i].ZBT + "'>"
                    + mbInfo[0].PGTM[i].ZBT
                    + "</label></div>"
                    + "<div class='col-md-10 col-xs-12'><input class='input-sm col-md-12 col-xs-12' maxlength='100' id='id1_" + mbInfo[0].PGTM[i].TMXH + "' type='text' name='cysqk'></div></div>";
            } else {
                cyzbhtml += "<div class='col-md-12 icheckDiv' id='" + mbInfo[0].PGTM[i].PGBM + '.' + mbInfo[0].PGTM[i].TMXH + "'>"
                    + "<div class='col-md-2 col-xs-3 nopadding' style='text-align:left;'><label class='control-label nopadding' id='" + mbInfo[0].PGTM[i].PGBM + "'  value='" + mbInfo[0].PGTM[i].ZBT + "'>"
                    + mbInfo[0].PGTM[i].ZBT
                    + "</label></div>";
                for (var j = 0; j < mbInfo[0].PGTM[i].TMXX.length; j++) {
                    cyzbhtml += " <label class='checkbox-inline' style='padding-top: 5px;'> <input type='radio' name='" + mbInfo[0].PGTM[i].PGBM + "' id='stpg_" + mbInfo[0].PGTM[i].TMXH + "' value='" + mbInfo[0].PGTM[i].TMXX[j].XXBT + "'>"
                        + mbInfo[0].PGTM[i].TMXX[j].XXBT
                        + "</label>";
                }
                cyzbhtml += "</div>";
            }
        }
        return cyzbhtml;
    } else {
        for (var i = 0; i < mbInfo[1].PGTM.length; i++) {
            if (mbInfo[1].PGTM[i].ZBT == '科氏量表:') {
                ksbsInfohtml += "<div class='col-md-12 col-xs-3 nopadding'><label class='control-label nopadding' id='" + mbInfo[1].PGTM[i].PGBM + "' value='" + mbInfo[1].PGTM[i].ZBT + "'>"
                    + mbInfo[1].PGTM[i].ZBT
                    + "</label></div>";
                for (var j = 0; j < mbInfo[1].PGTM[i].TMXX.length; j++) {
                    ksbsInfohtml += "<div class='col-md-12 icheckKSBSDiv'  id='" + mbInfo[1].PGTM[i].PGBM + "'><label class='checkbox-inline' id='" + mbInfo[1].PGTM[i].PGBM + "' style='padding-top: 5px;'> <input type='radio' class='rdZt' name='" + mbInfo[1].PGTM[i].PGBM + "' id='kslb_" + mbInfo[1].PGTM[i].TMXH + "' value='" + mbInfo[1].PGTM[i].TMXX[j].XXBT + "'>"
                        + mbInfo[1].PGTM[i].TMXX[j].XXBT
                        + "</label></div>";
                }
                ksbsInfohtml += "<label class='control-label nopadding'>巴氏量表：</label><div class='row' id='id_tables_container'><div class='col-md-12' id='id_left' style='padding-left: 15px;padding-right: 15px;'><table border='2'><tr><th style='text-align: center;background-color: #f4f4f5'><div class='th-inner '>项目</div><div class='fht-cell'></div></th><th style='text-align: center;background-color: #f4f4f5'><div class='th-inner '>0分</div><div class='fht-cell'></div></th><th style='text-align: center;background-color: #f4f4f5'><div class='th-inner '>5分</div><div class='fht-cell'></div></th><th style='text-align: center;background-color: #f4f4f5'><div class='th-inner '>10分</div><div class='fht-cell'></div></th><th style='text-align: center;background-color: #f4f4f5'><div class='th-inner '>15分</div><div class='fht-cell'></div></th>";

            } else {
                var k = 0;

                ksbsInfohtml += "<tr><td style='text-align: center;'><div class='th-inner icheckBSDiv' style='width: 55px;'>"
                    + mbInfo[1].PGTM[i].ZBT
                    + "</div><div class='fht-cell'></div></td>";

                for (var j = 0; j < mbInfo[1].PGTM[i].TMXX.length; j++) {
                    if (mbInfo[1].PGTM[i].TMXX[j].XXBT != '') {
                        ksbsInfohtml += "<td style='text-align: left;'><div class='th-inner ' id='" + mbInfo[1].PGTM[i].PGBM + "'><input type='radio' class='rdZt' name='" + mbInfo[1].PGTM[i].PGBM + "' id='" + mbInfo[1].PGTM[i].PGBM + "' value='" + mbInfo[1].PGTM[i].TMXX[j].XXBT + "'>" + mbInfo[1].PGTM[i].TMXX[j].XXBT
                            + "</div><div class='fht-cell'></div></td>";
                    } else {
                        ksbsInfohtml += "<td style='text-align: left;'><div class='th-inner '>"
                            + "</div><div class='fht-cell'></div></td>";
                    }
                    k++;
                }
                ksbsInfohtml += "</tr>";

                if (k == mbInfo[1].PGTM[i].TMXX.length - 1) {
                    ksbsInfohtml += "</table></div></div>";
                }
            }
        }
        return ksbsInfohtml;
    }

};

function setPgInfo(pgnr) {
    //赋值
    var pgnrObj = JSON.parse(pgnr);
    //评估分类
    var pgfl;
    //分类编号
    var flbh;
    //评估题目
    var pgtm;
    //循环评估内容
    for (i = 0; i <= pgnrObj.length - 1; i++) {
        pgfl = pgnrObj[i].DCFL;
        flbh = pgnrObj[i].FLBH;
        pgtm = pgnrObj[i].PGTM;

        //评估项目-评估编码
        var pgbm;
        //评估项目-选项标题
        var xxbt;
        //循环评估结果
        for (j = 0; j <= pgtm.length - 1; j++) {
            pgbm = pgtm[j].PGBM;
            xxbt = pgtm[j].XXBT;
            //模板结构中没有标明项目是单选还是文本，只能通过项目编码进行判断赋值文本
            if (pgbm != 'B.1.11' && pgbm != 'B.1.12') {
                //根据id设置项目选中(注id中有.号jquery无法直接识别，需在.号前加两个\\,故通过JavaScript获取)
                //document.getElementById(pgbm).checked = true;
                $("input[name='" + pgbm + "'][value='" + xxbt + "']").iCheck('check');
            } else { //暂时写死（需要修改生成部分）

                if (pgbm == 'B.1.11') {
                    $('#id1_11').val(xxbt);
                } else if (pgbm == 'B.1.12') {
                    $('#id1_12').val(xxbt);
                }
            }
        }
    }
};

function dosaveData() {
    var array = [];
    var arrayObj = {
        gapglsh: $('#GAPGLSH').val() == undefined ? "" : $('#GAPGLSH').val(),
        sapglsh: sapglsh,
        jhpglsh: jhpglsh,
        yngrbsh: yngrbsh,
        mbnr: mbInfo,
        gaxqdm: $('input[name=jgzh]:checked').prop('value'),
        fjxq: getfjxqdata(),
        infofjxq: $('#fjxq').val(),
        pgnr: getDcnrJson()
    };
    array.push(arrayObj);

    $.ajax({
        url: 'yyhpt_gapg.do?action=saveGapgInfo',
        type: 'post',
        dataType: 'json',
        data: {
            'gapgdcData': JSON.stringify(array),
        },
        success: function (data) {
            if (data[0].code == "T") {
                dialoging.close();
                $('#gapgTable').bootstrapTable("refresh");
            }
            else {
                wnform.toast('保存失败!');
                dialoging.close();
            }
        }
    })
};

//获取调查内容Json数据
function getDcnrJson() {
    var datadcr = [];
    var dataksbs = [];

    var dataAll = [];

    var detail1 = {DCFL: '身体评估', FLBH: 'B.1', PGTM: []},
        detail2 = {DCFL: '科氏&巴氏量表', FLBH: 'B.2', PGTM: []};

    //拼json  评估内容

    $.each($('.icheckDiv'), function (k, v) {
        var PGBM = $(v).find('label').prop('id');
        if (PGBM == 'B.1.11') {
            var XXBT = $('#id1_11').val();

        } else if (PGBM == 'B.1.12') {
            var XXBT = $('#id1_12').val();
        } else {
            var XXBT = $(v).find('input:radio:checked').prop('value');
        }
        if (XXBT) {
            datadcr.push({PGBM: PGBM, XXBT: XXBT});
        }
    });

    detail1.PGTM = datadcr;

    var KSBSDiv = $('.icheckKSBSDiv');
    var PGBM = (KSBSDiv).find('label').prop('id');
    var XXBT = (KSBSDiv).find('input:radio:checked').prop('value');
    if (XXBT) {
        dataksbs.push({PGBM: PGBM, XXBT: XXBT});
    }

    $.each($('.th-inner'), function (k, v) {
        console.log(this);
        console.log($(this).prop('id'));
        // var PGBM = $(v).find('input:radio:checked').data("ID");
        var PGBM = $(this).prop('id');
        var XXBT = $(v).find('input:radio:checked').prop('value');
        if (PGBM && XXBT) {
            dataksbs.push({PGBM: PGBM, XXBT: XXBT});
        }
    });

    detail2.PGTM = dataksbs;
    dataAll.push(detail1);
    dataAll.push(detail2);

    console.log(dataAll);
    return dataAll;

};


function getfjxqdata() {
    var fjxq = '';
    var id;
    $('.fjxq').find('input:checked').each(function (k, v) {
        id = $(this).prop('id');
        if (id != 12) {
            fjxq += id + ';';
        } else {
            fjxq += id + ':' + $('#fjxq').val();
        }
    });
    return fjxq;
}
