/*
 * Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
 */

/**
 * Created by tw on 2016-09-26.
 */
var sMblsh = "";
var dictObj;
var cyxjUrl = "";   //出院小结url地址
//初始化基本信息
function initJbxx() {
    $('#grxx_xm').html(rowPersonInfo.XM);
    $('#grxx_xb').html(rowPersonInfo.XBMC ? rowPersonInfo.XBMC : '');
    $('#grxx_csrq').html(rowPersonInfo.CSRQ ? rowPersonInfo.CSRQ : '');
    $('#grxx_lxdh').html(rowPersonInfo.LXDH ? rowPersonInfo.LXDH : '');
    $('#grxx_ryrq').html(rowPersonInfo.RYRQ ? rowPersonInfo.RYRQ : '');
    $('#grxx_cyrq').html(rowPersonInfo.CYRQ ? rowPersonInfo.CYRQ : '');
};
initJbxx();

//icheck皮肤
$('input[name="sfsa"]').iCheck({
    checkboxClass: 'icheckbox_flat-wnred',
    radioClass: 'iradio_flat-wnred',
    increaseArea: '20%'
});

/*
 * 获取出院小结参数值
 */
function getCsz() {
    $.ajax({
        url: "common.do?action=getCsz",
        type: "post",
        dataType: "json",
        data: {
            csbm: 'YH_CYZB_CYXJURL'
        },
        success: function (data) {
            if (data == undefined) {
                wnform.toast('查询数据失败!');
            } else {
                cyxjUrl = data.MRZ;
            }
        }
    });
}
getCsz();
/*
 * 获取模板数据
 */
function getMoudule() {
    $.ajax({
        url: "yyhpt_sagl.do?action=getSapgMb",
        type: "post",
        dataType: "json",
        data: {
            yngrbsh: rowPersonInfo.YNGRBSH,
            jhpglsh: rowPersonInfo.JHPGLSH
        },
        success: function (data) {
            if (data == undefined) {
                wnform.toast('查询模板失败!');
            } else {
                //获取不收案原因字典项
                dictObj = data.dict;
                //模板信息
                var mbxxObj = data.mbxx;
                //绑定评估结果流水号
                $('#SAPGLSH').val(mbxxObj.SAPGLSH);
                //没有收案记录(收案人员默认当前登录人员，收案日期默认当前日期)
                if (mbxxObj.SAPGLSH == undefined || mbxxObj.SAPGLSH == '') {
                    $('#saryxm').text(data.ryxm);
                    $('#sarygh').text(data.rybm);
                    sMblsh = mbxxObj.MBLSH;
                } else {
                    $('#saryxm').text(mbxxObj.SARYXM);
                    $('#sarygh').text(mbxxObj.SARYGH);
                }
                $('#sarq').text(mbxxObj.SARQ);
                if (mbxxObj.SFSA == "1") {
                    $('#saRadio').iCheck('check');
                    $("#bsayyDiv").hide();
                }
                
                //初始化界面
                initForm(mbxxObj);
                if (mbxxObj.PGNR != null && mbxxObj.PGNR != '') {
                    setValue(mbxxObj.PGNR);
                }

                //获取不收案原因
                var bsayys = mbxxObj.BSAYY.split(';');
                for(var i=0;i<bsayys.length;i++){
                    if(bsayys[i]!=""){
                        $('input[name="bsayy"][value="'+bsayys[i]+'"]').attr('checked',true);
                    }
                }
            }
        }
    });
}

//动态生成界面
function initForm(mbxxObj) {
    
    //模板内容
    sMbnr = mbxxObj.MBNR;
    var mbnrObj = JSON.parse(sMbnr);
    //评估题目标题
    var pgtmObj;

    //评估分类
    var pgflHtml = '';
    //评估分类
    var sPgfl = "";
    //评估简称
    var sFljc = "";
    //分类编号
    var sFlbh = "";

    //1.循环拼接group（第一层）
    for (i = 0; i <= mbnrObj.length - 1; i++) {
        sPgfl = mbnrObj[i].PGFL;
        sFljc = mbnrObj[i].FLJC;
        sFlbh = mbnrObj[i].FLBH;
        pgflHtml += '<div class="panel panel-default">'
            + '  <div class="panel-heading panel-heading-height">'
            + '   <a data-toggle="collapse" data-parent="#accordion" href="#' + sFljc + 'Content">'
            + '    <h3 id="' + sFlbh + '" class="head-title">'
            + '    <span class="glyphicon glyphicon-th"></span> ' + sPgfl
            + '</h3>'
            + '    </a>'
            + '   </div>'
            + '<div class="panel-collapse collapse in nopadding" id="' + sFljc + 'Content">';

        //获取评估题目
        pgtmObj = mbnrObj[i].PGTM
        var sPgbm = "";         //评估项目编码
        var sZbt = "";          //项目标题
        var sTmxh = "";         //项目序号
        var sTmxxObj = "";      //项目详细选项
        //2.循环拼接题目标题（第二层）
        for (j = 0; j <= pgtmObj.length - 1; j++) {
            sPgbm = pgtmObj[j].PGBM;
            sZbt = pgtmObj[j].ZBT;
            sTmxh = pgtmObj[j].TMXH;
            sTmxxObj = pgtmObj[j].TMXX;

            //主标题为空 则设置第二层隐藏
            var shidden = "";
            if (sZbt == undefined || sZbt == '') {
                shidden = "hidden";
            }
            pgflHtml += '<div class="form-group">'
                + '    <div class="col-md-12">'
                + '      <div class="col-sm-12 col-md-12">'
                + '      <label class="first-lable ' + shidden + '"><input id="' + sPgbm + '" name="' + sFljc + '" '
                + '          type="checkbox" value="0" /> ' + sTmxh + '.' + sZbt + '</label>'
                + '      </div>';

            if (sTmxxObj != undefined && sTmxxObj != '') {
                var sXxbh = "";       //选项编号
                var sXxbt = "";       //选项标题
                var sXxlx = "";       //选项下级项目类型
                var sXxxx = "";       //选项下级项目信息
                //主标题为空即没有第二层时 设置第三层的格式
                if (sZbt != undefined && sZbt != '') {
                    pgflHtml += '<div class="col-sm-12 col-md-12">';
                    pgflHtml += '<div class="col-sm-12 col-md-12">';
                } else {
                    pgflHtml += '<div class="col-sm-12 col-md-12 first-lable">';
                }
                //3.循环拼接第三层（项目选项）
                for (m = 0; m <= sTmxxObj.length - 1; m++) {
                    sXxbh = sTmxxObj[m].XXBH;
                    sXxbt = sTmxxObj[m].XXBT;
                    sXxlx = sTmxxObj[m].XXLX;
                    sXxxxObj = sTmxxObj[m].XXXX;
                    pgflHtml += '<label><input id="' + sXxbh + '" name="' + sPgbm + '" type="checkbox" value="0" /> ' + sXxbt + '&nbsp;&nbsp;</label>';
                    if (sXxxxObj != undefined) {
                        //4.循环拼接第四层（项目子项）
                        for (var n = 0; n <= sXxxxObj.length - 1; n++) {
                            var sZxbh = sXxxxObj[n].ZXBH;
                            if (sXxlx == "3") {
                                pgflHtml += '<input id="' + sZxbh + '" name="' + sXxbh + '" type="text" maxlength="100" style="display: none;">';
                            }
                        }
                    }
                }
                //主标题为空即没有第二层时 设置第三层的格式
                if (sZbt != undefined && sZbt != '') {
                    pgflHtml += '</div></div>';
                } else {
                    pgflHtml += '</div>';
                }

            }
            pgflHtml += '</div></div>';
        }
        pgflHtml += '</div></div>';
    }
    //拼接将动态生成的html
    $('#pgnrContent').html(pgflHtml);
    
    //---------------------------拼接不收案原因begin--------------------------------
    var sBsayyHtml = '<div class="form-group"> '
                +'<div class="col-md-12">'
                +'<div class="col-sm-12 col-md-12 first-lable">';
    var zdm;
    var zmc;
    var bsayyObj = dictObj.bsayy;
    for (i = 0; i <= bsayyObj.length - 1; i++) {
        zdm = bsayyObj[i].zdm;
        zmc = bsayyObj[i].zmc;
        sBsayyHtml +='<label class="lable-padding-right"><input name="bsayy" type="checkbox" value="'+zdm+'" /> '+zmc+'&nbsp;&nbsp;</label>';
    }
    sBsayyHtml +='</div></div></div>';
    $('#bsayyContent').html(sBsayyHtml);
    //---------------------------拼接不收案原因end--------------------------------

    $("#pgnrContent :checkbox").change(function(){
        var checkId = this.id;
        var checkName = this.name;
        var ckStatu = this.checked;
        //根据name获取父级id
        var obj = document.getElementById(checkName);
        //如果是答案，勾选了则将题目勾选
        if(obj!=undefined) {
            //答案选中则选中父级项目
            if (this.checked) {
                obj.checked = true;
            } else {
                /*var iCount = 0;
                $("input[name='" + checkName + "']").each(function () {
                    if (this.checked) {
                        iCount++;
                    }
                });
                if (iCount == 0) {
                    obj.checked = false;
                }*/
            }
        }

        //如果是题目取消勾选 则将答案取消勾选
        if (!this.checked) {
            $("input[name='" + checkId + "']").each(function () {
                if (this.checked) {
                    this.checked = false;
                }
            });
        }

        //如果选项有下级选项则勾选时显示，取消勾选时隐藏
        $('input[name="'+checkId+'"]').each(function () {
            //如果下级是文本输入框 则隐藏 
            if(this.type == "text"){
                if (ckStatu) {
                    $(this).show();
                }else{
                    $(this).hide();
                }
            }
        });
    })
}

$(document).ready(function () {

    getMoudule();

    //出院小结
    $('#btn_Cyxj').on('click', function () {
        //var patid = rowPersonInfo.YNGRBSH;
        var syxh = rowPersonInfo.JHPGLSH;
        var sUrl = cyxjUrl+"&jzlsh="+syxh;
        console.log(sUrl);
        window.open(sUrl);
        // return false;
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

    $('input[name="sfsa"]').on('ifClicked', function (event) {
        if(event.target.value=="1"){
            $("#bsayyDiv").hide();
        }else{
            $("#bsayyDiv").show();
        }
    });
});


//保存收案评估数据
function saveSapg() {
    if(sfzjFlag=="1"){
        wnform.toast('患者已转介，不可修改收案评估');
        return;
    }
    var sapgData = getDataByForm();
    $.ajax({
        url: "yyhpt_sagl.do?action=saveSapg",
        type: "post",
        dataType: "json",
        data: sapgData,
        success: function (data) {
            if (data[0].code == "T") {
                $("#SAPGLSH").val(data[0].key);
                wnform.toast('保存成功!');
                dialogModel.close();
                //刷新列表数据
                $table.bootstrapTable('refresh');
                //刷新块状标题数据
                GetRqNum();
            }
            else {
                wnform.toast('保存失败!' + data[0].message);
            }
        }
    });
}

//获取form数据
function getDataByForm() {
    var parameters = [];
    parameters.push(['SAPGLSH', $('#SAPGLSH').val() == undefined ? "" : $('#SAPGLSH').val()]);
    parameters.push(['JHPGLSH', rowPersonInfo.JHPGLSH]);
    parameters.push(['YNGRBSH', rowPersonInfo.YNGRBSH]);
    parameters.push(['MBLSH', sMblsh]);

    //获取选中的收案状态
    var sSfsa;
    $("input[name='sfsa']").each(function () {
        if (true == $(this).is(':checked')) {
            sSfsa = $(this).val();
        }
    });
    
    //如果收案状态为2（不收案）则获取不收案原因代码（多选）
    var sBsayy="";
    if(sSfsa=="2"){
        $("input[name='bsayy']:checked").each(function () {
            sBsayy += $(this).val()+';';
        });
    }
    parameters.push(['SFSA', sSfsa]);
    parameters.push(['BSAYY', sBsayy]);
    parameters.push(['SARYGH', $('#sarygh').text()]);
    parameters.push(['SARYXM', $('#saryxm').text()]);
    parameters.push(['SASJ', $('#sarq').text()]);

    var sData = getParameterString(parameters);
    sData += '&PGNR=' + getPgnrJson();
    return sData;
}

//获取评估内容Json数据
function getPgnrJson() {
    var pgnrJson = '[';   //评估内容json
    var flbh;             //分类编号
    var pgfl;
    var fljc;
    var pgjgObj;
    var pgflContentId;    //评估分类内容id

    //遍历第一层
    $('#pgnrContent h3').each(function (index, element) {
        //console.log(this.id);
        //debugger
        //获取分类编号
        flbh = this.id;
        //获取评估分类
        pgfl = $(this).text();

        //获取调查信息内容div的id
        pgflContentId = $(this).parent().attr("href").replace('#', '');
        //获取分类简称
        fljc = pgflContentId.replace('Content', '');

        //拼接调查内容json
        pgnrJson += '{';
        pgnrJson += '"PGFL":"' + pgfl + '",';
        pgnrJson += '"FLBH":"' + flbh + '",';
        pgnrJson += '"PGJG":[';
        $('#' + pgflContentId + ' input[name="' + fljc + '"]').each(function () {
            var sSfxz = "0";   //项目是否选中
            if (true == $(this).is(':checked')) {
                sSfxz = "1";
            }
            var sPgbm = this.id;
            pgnrJson += '{';
            pgnrJson += '"PGBM":"' + sPgbm + '",';
            pgnrJson += '"SFXZ":"' + sSfxz + '",';
            pgnrJson += '"XMMX":[';
            $('#' + pgflContentId + ' input[name="' + sPgbm + '"]:checked').each(function () {
                var sXxbh = this.id;
                pgnrJson += '{';
                pgnrJson += '"XXBH":"' + sXxbh + '",';
                pgnrJson += '"SFXZ":"1",';

                //已选择项目的子项信息
                var zxxxObj = $('#' + pgflContentId + ' input[name="' + sXxbh + '"]');
                //存在子项信息则拼接
                if (zxxxObj.length > 0) {
                    //----------------------子项信息begin----------------------
                    pgnrJson += '"XXXX":[';
                    zxxxObj.each(function () {
                        var sZxType = this.type;
                        //如果子项是checkbox或radio需要选中才拼接
                        if (sZxType == "checkbox" || sZxType == "radio") {
                            if (this.checked) {
                                var sZxbh = this.id;
                                pgnrJson += '{';
                                pgnrJson += '"ZXBH":"' + sZxbh + '",';
                                pgnrJson += '"SFXZ":"1",';
                                //如果最后一个字符是,则去掉
                                pgnrJson = delLastCharOfStr(pgnrJson);
                                pgnrJson += '},';
                            }
                        } else {
                            pgnrJson += '{';
                            pgnrJson += '"ZXBH":"' + this.id + '",';
                            pgnrJson += '"ZXNR":"' + $(this).val() + '"';
                            pgnrJson += '},';
                        }
                    });
                    //如果最后一个字符是,则去掉
                    pgnrJson = delLastCharOfStr(pgnrJson);
                    pgnrJson += ']';
                }
                //----------------------子项信息end-------------------------
                //如果最后一个字符是,则去掉
                pgnrJson = delLastCharOfStr(pgnrJson);
                pgnrJson += '},';
            });
            //如果最后一个字符是,则去掉
            pgnrJson = delLastCharOfStr(pgnrJson);
            pgnrJson += ']';
            pgnrJson += '},';
        });
        //如果最后一个字符是,则去掉
        pgnrJson = delLastCharOfStr(pgnrJson);
        pgnrJson += ']';
        pgnrJson += '},';
    });
    //如果最后一个字符是,则去掉
    pgnrJson = delLastCharOfStr(pgnrJson);
    pgnrJson += ']';
    console.log(pgnrJson);
    return pgnrJson;
}

//删除字符串最后一个字符（,）
function delLastCharOfStr(pgnrJson) {
    //如果最后一个字符是,则去掉
    if (pgnrJson.substr(pgnrJson.length - 1, 1) == ",") {
        pgnrJson = pgnrJson.substring(0, pgnrJson.length - 1);
    }
    return pgnrJson;
}

function getParameterString(parameters) {
    var url = '';
    for (var i = 0; i < parameters.length; i++) {

        url += parameters[i][0] + '=' + encodeURIComponent(parameters[i][1]);
        if (i < parameters.length - 1) {
            url += '&';
        }
    }
    return url;
}

//已做过收案，则动态赋值
function setValue(PGNR) {

    var pgnrObj = JSON.parse(PGNR);
    //评估分类
    var pgfl;
    //分类编号
    var flbh;
    //评估结果
    var pgjg;
    //循环评估内容
    for (i = 0; i <= pgnrObj.length - 1; i++) {
        pgfl = pgnrObj[i].PGFL;
        flbh = pgnrObj[i].FLBH;
        pgjg = pgnrObj[i].PGJG;

        //评估项目-评估编码
        var pgbm;
        //评估项目-是否勾选
        var sfxz;
        //评估项目-项目明细
        var xmmxObj;
        //循环评估结果
        for (j = 0; j <= pgjg.length - 1; j++) {
            pgbm = pgjg[j].PGBM;
            sfxz = pgjg[j].SFXZ;
            xmmxObj = pgjg[j].XMMX;
            if (sfxz == "1") {
                //根据id设置项目选中(注id中有.号jquery无法直接识别，需在.号前加两个\\,故通过JavaScript获取)
                document.getElementById(pgbm).checked = true;
            }

            var xxbh;
            var xxSfxz;
            var xxxxObj;    //选项的子项目信息
            //循环评估项目明细
            for (m = 0; m <= xmmxObj.length - 1; m++) {
                xxbh = xmmxObj[m].XXBH;
                xxSfxz = xmmxObj[m].SFXZ;
                if (xxSfxz == "1") {
                    //根据id设置项目选中(注id中有.号jquery无法直接识别，需在.号前加两个\\,故通过JavaScript获取)
                    document.getElementById(xxbh).checked = true;
                }
                //---------------------设置选项的子项的值
                xxxxObj = xmmxObj[m].XXXX;
                if (xxxxObj != undefined) {
                    var zxbh;      //子项编号
                    var zxsfxz;    //子项是否选中
                    for (var n = 0; n <= xxxxObj.length - 1; n++) {
                        zxbh = xxxxObj[n].ZXBH;
                        zxsfxz = xxxxObj[n].SFXZ;
                        var zxType = document.getElementById(zxbh).type;
                        if (zxType == "checkbox" || zxType == "radio") {
                            if (zxsfxz == "1") {
                                document.getElementById(zxbh).checked = true;
                            }
                        } else {
                            var sZxnr = xxxxObj[n].ZXNR;
                            //显示
                            document.getElementById(zxbh).style.display = "";
                            document.getElementById(zxbh).value = sZxnr;
                        }
                    }
                }
            }
        }
    }
}