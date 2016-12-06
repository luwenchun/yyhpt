/*
 * Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
 */

var mbInfo = '';
var sapglsh = '';
var jhpglsh = '';
var yngrbsh = '';

//设置个人基本信息
function setGrInfo() {
    $('#grxx_xm').html(currow.XM);
    $('#grxx_xb').html(currow.XBMC ? currow.XBMC : '');
    $('#grxx_csrq').html(currow.CSRQ ? currow.CSRQ : '');
    $('#grxx_ryrq').html(currow.RYRQ ? currow.RYRQ : '');
    $('#grxx_cyrq').html(currow.CYRQ ? currow.CYRQ : '');
};
setGrInfo();

$(function () {
    //添加icheck皮肤
    wn.iCheckInit();
    
    yngrbsh = currow.YNGRBSH;
    sapglsh = currow.SAPGLSH;
    jhpglsh = currow.JHPGLSH;
    console.log(yngrbsh);
    console.log(sapglsh);
    console.log(jhpglsh);
    
    getMbInfo();
    
    //调阅出院小结
    $('#btn_Cyxj').bind('click', function () {

        var syxh = currow.JHPGLSH;
        var sUrl = cyxjUrl+"&jzlsh="+syxh;
        console.log(sUrl);
        window.open(sUrl);
    });

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
        url: 'yyhpt_gapg.do?action=getGapgDetail',
        type: 'get',
        dataType: 'json',
        data: {
            yngrbsh: currow.YNGRBSH,
            sapglsh: currow.SAPGLSH
        },
        success: function (data) {
            //隐藏医疗用具需求其他
            $("#fjxq").hide();
            if (data == undefined) {
                wnform.toast('查询模板失败!');
            } else {
                //初始化收案内容
                //initSapgHtml(data.detail.MBNR,data.detail.PGNR);

                //个案评估流水号
                var sGapglsh = data.detail.GAPGLSH;
                //绑定评估结果流水号
                $('#GAPGLSH').val(sGapglsh);

                //未做个案评估
                if(sGapglsh==null){
                    $("#pgrq").html(getNowFormatDate());
                    $("#pgryxm").html(data.ryxm);
                }else{
                    $("#pgrq").html(data.detail.PGSJ);
                    $("#pgryxm").html(data.detail.PGRYXM);
                }

                if (data.detail.GAXQDM == '2') {
                    $('#jjzh').iCheck('check');
                }else if (data.detail.GAXQDM == '1') {
                    $('#jgzh').iCheck('check');
                }else if (data.detail.GAXQDM == '3') {
                    $('#zry').iCheck('check');
                }else if (data.detail.GAXQDM == '4') {
                    $('#sqzh').iCheck('check');
                }else if (data.detail.GAXQDM == '5') {
                    $('#qt').iCheck('check');
                }

                //赋值辅具需求
                var sFjxq = data.detail.FJXQ;
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

                //勾选了其他则显示
                if ($('#12').is(':checked')) {
                    $("#fjxq").show();
                }else{
                    $("#fjxq").hide();
                }
            }
        }
    })
};

//初始化收案内容
function initSapgHtml(mbnr,pgnr){
    var mbnrObj = JSON.parse(mbnr);
    var pgnrObj = JSON.parse(pgnr);
    //评估分类
    var pgfl;
    //分类编号
    var flbh;
    //评估结果
    var pgjg;
    //收案评估内容html
    var sapgHtml="";
    //循环评估内容
    for (i = 0; i <= pgnrObj.length - 1; i++) {
        pgfl = pgnrObj[i].PGFL;
        flbh = pgnrObj[i].FLBH;
        pgjg = pgnrObj[i].PGJG;

        sapgHtml += '<div class="panel-collapse collapse in nopadding" >'
            + '   <div class="form-group">'
            + '    <div class="col-md-12">'
            + '        <div class="col-sm-12 col-md-12">'
            + '            <label class="content-title">'
            + pgfl
            + '            </label>'
            + '        </div>'
            + '    </div>'
            + '   </div>';

        //评估项目-评估编码
        var pgbm;
        //评估编码对应的项目标题
        var zbt = "";
        //评估项目-是否勾选
        var sfxz;
        //评估项目-项目明细
        var xmmxObj;
        //序号
        var iXh=1;
        //循环评估结果
        for (j = 0; j <= pgjg.length - 1; j++) {
            //拼接评估结果内容
            var pgjgText ="";

            pgbm = pgjg[j].PGBM;
            sfxz = pgjg[j].SFXZ;
            xmmxObj = pgjg[j].XMMX;
            //如果二级项目未选中 且没有三级项目，则跳出
            if (sfxz == "0" && xmmxObj.length==0){
                continue;
            }
            //照护问题以序号开头
            if(flbh=="A"){
                pgjgText = iXh+".";
            }
            iXh++;
            //通过pgbm从模板内容中获取项目标题
            zbt = getZbtByPgbm(mbnr,pgbm);
            if (sfxz == "1") {
                pgjgText += zbt;
                var xxbh;
                var xxbt;
                var xxSfxz;
                //循环评估项目明细
                for (m = 0; m <= xmmxObj.length - 1; m++) {
                    if(m==0&&flbh=="A") {
                        pgjgText += "(";
                    }
                    xxbh = xmmxObj[m].XXBH;
                    //通过xxbh从模板内容中获取项目标题
                    xxbt = getXxbtByPgbm(mbnr,pgbm,xxbh)
                    xxSfxz = xmmxObj[m].SFXZ;
                    if (xxSfxz == "1") {
                        pgjgText += xxbt+'、';
                    }
                    if(m==xmmxObj.length - 1){
                        //去掉最后一个、
                        pgjgText = pgjgText.substring(0, pgjgText.length - 1);
                        if(flbh=="A") {
                            pgjgText += ")";
                        }
                    }
                }
            }else{
                var xxbh;
                var xxSfxz;
                //循环评估项目明细
                for (m = 0; m <= xmmxObj.length - 1; m++) {
                    if(m==0&&flbh=="A") {
                        pgjgText += zbt+"(";
                    }
                    xxbh = xmmxObj[m].XXBH;
                    //通过xxbh从模板内容中获取项目标题
                    xxbt = getXxbtByPgbm(mbnr,pgbm,xxbh)
                    xxSfxz = xmmxObj[m].SFXZ;
                    if (xxSfxz == "1") {
                        pgjgText += xxbt+'、';
                    }
                    if(m==xmmxObj.length - 1){
                        //去掉最后一个、
                        pgjgText = pgjgText.substring(0, pgjgText.length - 1);
                        if(flbh=="A") {
                            pgjgText += ")";
                        }
                    }
                }
            }
            sapgHtml += '   <div class="form-group">'
                        + '    <div class="col-md-12">'
                        + '        <div class="col-sm-12 col-md-12">'
                        + '            <label class="first-lable ">'
                        + pgjgText
                        + '            </label>'
                        + '        </div>'
                        + '    </div>'
                        + '   </div>';
        }

        sapgHtml += '</div>';
        if(i != pgnrObj.length - 1){
            sapgHtml += '<hr class="hrmin"/>';
        }            
    }
    //拼接将动态生成的html
    $('#sapgContent').html(sapgHtml);
}

//通过pgbm从模板内容中获取项目标题
function getZbtByPgbm(mbnr,pgbm){
    var curFlbh = pgbm.substring(0,1);
    var mbnrObj = JSON.parse(mbnr);
    var sZbt = "";          //项目标题
    //1.循环拼接group（第一层）
    for (var i = 0; i <= mbnrObj.length - 1; i++) {
        if(sZbt!=""){
            break;
        }
        var sFlbh = mbnrObj[i].FLBH;
        if(sFlbh == curFlbh){
            //获取评估题目
            pgtmObj = mbnrObj[i].PGTM
            //2.循环拼接题目标题（第二层）
            for (var j = 0; j <= pgtmObj.length - 1; j++) {
                if(pgbm==pgtmObj[j].PGBM){
                    sZbt = pgtmObj[j].ZBT;
                    break;
                }
            }
        }
    }
    return sZbt;
}

//通过xxbh从模板内容中获取项目标题
function getXxbtByPgbm(mbnr,pgbm,xxbh){
    var curFlbh = pgbm.substring(0,1);
    var mbnrObj = JSON.parse(mbnr);
    var sXxbt = "";          //选项标题
    //1.循环拼接group（第一层）
    for (var i = 0; i <= mbnrObj.length - 1; i++) {
        if(sXxbt!=""){
            break;
        }
        var sFlbh = mbnrObj[i].FLBH;
        if(sFlbh == curFlbh){
            //获取评估题目
            pgtmObj = mbnrObj[i].PGTM
            //2.循环拼接题目标题（第二层）
            for (var j = 0; j <= pgtmObj.length - 1; j++) {
                if(sXxbt!=""){
                    break;
                }
                if(pgbm==pgtmObj[j].PGBM){
                    var sTmxxObj = pgtmObj[j].TMXX;
                    if (sTmxxObj != undefined && sTmxxObj != '') {
                        //3.循环拼接第三层（项目选项）
                        for (var m = 0; m <= sTmxxObj.length - 1; m++) {
                            sXxbh = sTmxxObj[m].XXBH;
                            if(sXxbh == xxbh){
                                sXxbt = sTmxxObj[m].XXBT;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    return sXxbt;
}

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
        pgnr: ""   //getDcnrJson()
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
