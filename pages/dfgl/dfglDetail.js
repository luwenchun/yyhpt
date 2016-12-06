/**
 * Created by tw on 2016-10-23.
 */

var sMblsh = "0004";
var fjDivId_Suffix = "_Div"; //选项父级div的ID后缀（项目编号+后缀）
var sFirstMbnr;              //第一个tab页的电访模板内容
var dfjlList;                //电访记录列表
var sDlryxm;                 //登录人员姓名
var sOrigMbnr;               //初始模板内容
var flbh_Prefix = "";        //分类编号前缀

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

/*
 * 获取电访记录
 */
function getDfjls() {
    $.ajax({
        url: "yyhpt_dfgl.do?action=getDfjls",
        type: "post",
        dataType: "json",
        data: {
            yngrbsh: rowPersonInfo.YNGRBSH,
            gapglsh: rowPersonInfo.GAPGLSH,
            mblsh: sMblsh
        },
        success: function (data) {
            if (data == undefined) {
                wnform.toast('查询数据失败!');
            } else {
                //电访记录list
                dfjlList = data.dfjls;
                var dfmb = data.dfmb;
                //获取登录人员姓名
                sDlryxm = data.ryxm;
                if (dfmb == undefined || dfmb == null) {
                    wnform.toast('获取模板失败!');
                    return;
                }

                var sMbnr = dfmb.MBNR;    //模板内容
                sOrigMbnr = sMbnr;
                var itemIndex = 0;
                //没有电访数据
                if (dfjlList.length == 0) {
                    sFirstMbnr = sMbnr;
                    createItem(0, "新增电访", "");
                }

                for (var i = 0; i <= dfjlList.length - 1; i++) {
                    var dfjlObj = dfjlList[i];
                    var itemName = dfjlObj.DFRQ;   //tab标题名称
                    sMbnr = dfjlObj.MBNR;
                    var dfjllsh = dfjlObj.DFJLLSH;
                    //如果第一条数据的电访日期不是当天则添加新增电访tab页
                    if (i == 0 && itemName != wnform.getCurrYYYYMMDD()) {

                        sFirstMbnr = sMbnr;
                        //生成tabItem
                        createItem(0, "新增电访", "");
                        itemIndex++;
                    } else {
                        if (itemIndex == 0) {
                            //绑定电访记录流水号（绑定第一条记录，电访记录按DFRQ倒叙）
                            $('#DFJLLSH').val(dfjlObj.DFJLLSH);
                        }
                    }
                    //生成tabItem
                    createItem(itemIndex, itemName, dfjllsh);
                    itemIndex++;
                }
                /*
                 if (dfjlList.length == 0) {
                 sFirstMbnr = sMbnr;
                 initDfContent(0, "新增电访", null);
                 }

                 for (var i = 0; i <= dfjlList.length - 1; i++) {
                 var dfjlObj = dfjlList[i];
                 var itemName = dfjlObj.DFRQ;   //tab标题名称
                 var itemIndex = i + 1;
                 sMbnr = dfjlObj.MBNR;

                 //如果第一条数据的电访日期不是当天则添加新增电访tab页
                 if (i == 0 && itemName != wnform.getCurrYYYYMMDD()) {
                 sFirstMbnr = sMbnr;
                 initDfContent(0, "新增电访", null);
                 }else{
                 //绑定电访记录流水号（绑定第一条记录，电访记录按DFRQ倒叙）
                 $('#DFJLLSH').val(dfjlObj.DFJLLSH);
                 }
                 initDfContent(itemIndex, itemName, dfjlObj);
                 if (i == 0){
                 break;
                 }
                 }*/

                //监听tabitem点击事件
                $("#tabItem li a").on('click', function () {
                    //获取电访内容div的id
                    var dfContentId = $(this).attr("href").replace('#', '');
                    //如果不存在id 则跳出（点击【更多】时）
                    if (dfContentId == undefined || dfContentId == "") {
                        return;
                    }
                    var initFlag = "0";   //是否已生成电访内容 0 否 1是
                    if ($('div #' + dfContentId) != undefined && $('div #' + dfContentId).length != 0) {
                        initFlag = "1";
                    }
                    //获取id最右边的数字作为index
                    var itemIndex = dfContentId.slice(-1);

                    //第一个item的内容是可编辑的，使用原始flbh，其他item的电访内容flbh增加后缀，以区分id
                    if (itemIndex != 0) {
                        flbh_Prefix = itemIndex + '_';
                    }
                    //获取当前页的电访记录流水号
                    var dfjllsh = this.name;
                    //根据流水号找到该条电访记录
                    var dfjlObj;
                    //电访人员姓名
                    var dfryxm = "";
                    //电访日期
                    var dfrq = "";
                    //---------------------------生成当前电访内容页面begin-------------------
                    if (dfjllsh == undefined || dfjllsh == "") {
                        if (initFlag == 0) {
                            //生成tabContent
                            createTabContent(itemIndex, sOrigMbnr);
                        }
                        dfryxm = sDlryxm;
                        dfrq = wnform.getCurrYYYYMMDD();
                    } else {
                        for (var i = 0; i <= dfjlList.length - 1; i++) {
                            dfjlObj = dfjlList[i];
                            if (dfjlObj.DFJLLSH == dfjllsh) {
                                break;
                            }
                        }
                        if (initFlag == 0) {
                            //生成tabContent
                            createTabContent(itemIndex, dfjlObj.MBNR);
                        }

                        dfryxm = dfjlObj.DFRYXM;
                        dfrq = dfjlObj.DFRQ;
                    }
                    $('#dfryxm').text(dfryxm);
                    $('#dfrq').text(dfrq);

                    //---------------------------生成当前电访内容页面end-------------------
                    if (initFlag == 0) {
                        //绑定选项点击事件
                        $('input').on('ifChanged', function (event) {
                            var sId = event.target.id;
                            var sName = event.target.name;
                            var sType = event.target.type;
                            //如果所点击标签是checkbox，则根据状态判断隐藏或显示子项
                            if (sType == "checkbox") {
                                //选中则显示子项，否则隐藏
                                if ($(this).is(":checked")) {
                                    $('input[name="' + sId + '"]').each(function () {
                                        $(this).show();
                                    });
                                } else {
                                    $('input[name="' + sId + '"]').each(function () {
                                        $(this).hide();
                                    });
                                }
                            }//如果所点击标签是radio，则根据同组标签判断隐藏或显示该组的子项
                            else if (sType == "radio") {
                                $('input[name="' + sName + '"]').each(function () {
                                    var zxDivId = this.id + fjDivId_Suffix;
                                    //选中显示
                                    if ($(this).is(":checked")) {
                                        $('input[name="' + this.id + '"]').each(function () {
                                            if (this.type == "checkbox") {
                                                $('#' + zxDivId).show();
                                            } else {
                                                $(this).show();
                                            }
                                        });
                                    } else { //未选中隐藏
                                        $('input[name="' + this.id + '"]').each(function () {
                                            if (this.type == "checkbox") {
                                                $('#' + zxDivId).hide();
                                            } else {
                                                $(this).hide();
                                            }
                                        });
                                    }
                                });
                            }
                        });

                        if (dfjllsh != undefined && dfjllsh != "") {
                            //绑定电访内容的值
                            setContentValue(dfContentId, dfjlObj.PGNR);
                        }
                        //点击的不是第一个item则设置对应内容不可修改
                        if (itemIndex != 0) {
                            enabledAllElement(dfContentId);
                        }
                    }
                });

                //设置第一个tab为激活状态
                $("#tabItem li:first a").click();
            }
        }
    });
}

//动态生成电访tab页内容
function initDfContent(itemIndex, itemName, dfjlObj) {
    var sMbnr;
    var dfjllsh = "";
    if (dfjlObj == null) {
        sMbnr = sFirstMbnr;
    } else {
        sMbnr = dfjlObj.MBNR;
        dfjllsh = dfjlObj.DFJLLSH;     //电访记录流水号
    }

    //生成tabItem
    createItem(itemIndex, itemName, dfjllsh);
    //生成tabContent
    createTabContent(itemIndex, sMbnr);
}

//生成tabItem
function createItem(i, itemName, dfjllsh) {
    //var itemName = dfjlObj.DFRQ;
    /*if (sDfrq != wnform.getCurrYYYYMMDD()) {
     itemName = "新增电访";
     }else{
     itemName = dfjlObj.DFRQ;
     }*/
    var $tabItem = $('#tabItem');

    var liHtml = '<li>'
        + '<a id="' + "id_tab_Item" + i + '" href="' + "#dfContent" + i + '" name="' + dfjllsh + '" data-toggle="tab" aria-expanded="false">'
        + itemName
        + '</a>'
        + '</li>';
    if (i <= 3) {
        $tabItem.append(liHtml);
    }
    else if (i == 4) {
        tabItemHtml = '<li class="dropdown">'
            + '<a href="#" id="tabDrop" class="dropdown-toggle" data-toggle="dropdown"'
            + 'aria-expanded="false">更多<b class="caret"></b></a>'
            + '<ul class="dropdown-menu" id="id_dropdown" role="menu" aria-labelledby="tabDrop">'
            + liHtml;
        +'</ul>'
        + '</li>';
        $tabItem.append(tabItemHtml);
    } else {
        var $dropdownItem = $('#id_dropdown');
        $dropdownItem.append(liHtml);
    }
}

//生成tabContent-tab内容
function createTabContent(i, sMbnr) {
    var mbnrObj = JSON.parse(sMbnr);

    var sFlmc;   //分类名称
    var sFljc;   //分类简称
    var sFlbh;   //分类编号
    var dftmObj; //电访题目
    var sTabContentHtml;
    if (mbnrObj != undefined && mbnrObj.length > 0) {
        sFlbh = flbh_Prefix + mbnrObj[0].FLBH;
        //获取评估题目
        dftmObj = mbnrObj[0].DFTM;

        //tab内容父级标签
        var $tabContent = $('#tabContent');
        var contentId = "dfContent" + i;
        sTabContentHtml = '<div class="tab-pane fade" id="' + contentId + '" name="' + sFlbh + '"></div>';
        $tabContent.append(sTabContentHtml);
        //循环拼接电访题目
        for (var j = 0; j <= dftmObj.length - 1; j++) {
            var $dfContent = $('#' + contentId);
            var tmxxObj = dftmObj[j];
            createTmxx(sFlbh, tmxxObj, $dfContent);
        }
    }
    //增加icheck皮肤
    //wn.iCheckInit();
    //icheck皮肤
    $('#' + contentId + ' input').iCheck({
        checkboxClass: 'icheckbox_flat-wnred',
        radioClass: 'iradio_flat-wnred',
        increaseArea: '20%'
    });
}

//生成题目信息
function createTmxx(sFlbh, tmxxObj, $dfContent) {
    var sTmbm = tmxxObj.TMBM;        //题目编码
    sTmbm = flbh_Prefix + sTmbm;
    var sZbt = tmxxObj.ZBT;          //主标题
    var sTmlx = tmxxObj.TMLX;        //题目类型 1 radio 2 checkbox
    var sTmxxObj = tmxxObj.TMXX;     //题目选项
    var sType;

    if (sTmlx == "1") {
        sType = "radio";
    } else if (sTmlx == "2") {
        sType = "checkbox";
    }
    //拼接题目html
    var tmbmDivId = sTmbm + fjDivId_Suffix;
    var sHtml = '<div class="form-group">'
        + '<div class="col-md-12">'
        + '  <div class="col-sm-12 col-md-12">'
        + '    <label id="' + sTmbm + '" name="' + sFlbh + '" class="control-label col-sm-2 col-md-2 nopadding">' + sZbt + '：</label>'
        + '    <div id="' + tmbmDivId + '" class="col-sm-10 col-md-10">'
        + '    </div>'
        + '  </div>'
        + '</div>'
        + '</div>';
    //追加上级的尾部
    $dfContent.append(sHtml);

    //获取题目选项上级div
    var $tmbmDivId = $('#' + tmbmDivId);
    //循环追加题目选项信息
    for (var n = 0; n <= sTmxxObj.length - 1; n++) {
        var sXxbt = sTmxxObj[n].XXBT;       //选项标题
        var sXxbh = sTmxxObj[n].XXBH;       //选项编号
        sXxbh = flbh_Prefix + sXxbh;
        var sXxxxObj = sTmxxObj[n].XXXX;    //选项信息
        var tmxxHtml = '<label class="padding-top-5">'
            + '  <input id="' + sXxbh + '" name="' + sTmbm + '" type="' + sType + '" value="0" /> ' + sXxbt + '&nbsp;&nbsp;</label>';

        //如果选项信息有子选项，则拼接
        if (sXxxxObj != undefined && sXxxxObj != null) {
            //选项类型 1 radio 2 checkbox 3 input
            var sXxlx = sTmxxObj[n].XXLX;
            //项目类型为3时只有一个子项
            if (sXxlx == "3") {
                //子项编号
                var sZxbh = flbh_Prefix + sXxxxObj[0].ZXBH;
                var zxxxDivId = sXxbh + fjDivId_Suffix;
                tmxxHtml += '<div id="' + zxxxDivId + '" style="display:inline"> <input id="' + sZxbh + '" name="' + sXxbh + '" type="text" maxlength="100" style="display: none;"> </div>';
            } else {
                //子选项的父级div的id
                var sFjDivId = sXxbh + fjDivId_Suffix;
                //子选项的父级div
                var zxxHtml = '<div id="' + sFjDivId + '" class="col-sm-10 col-md-10 col-md-offset-2 col-sm-offset-2" style="display: none;"></div>';
                //拼接到选项上级div的后面
                $tmbmDivId.after(zxxHtml);

                createSubProject(sFjDivId, sXxbh, sXxlx, sXxxxObj);
            }
            //默认隐藏子选项信息
            //$('#'+sFjDivId).hide();
        }
        //追加题目信息html
        $tmbmDivId.append(tmxxHtml);
    }
}

/**
 * 生成子选项
 * @param sFjDivId 父级div的id
 * @param sXxbh    父级选项编号
 * @param sXxlx    选项类型
 * @param sXxxxObj 选项信息对象
 */
function createSubProject(sFjDivId, sXxbh, sXxlx, sXxxxObj) {
    var sType;

    if (sXxlx == "1") {
        sType = "radio";
    } else if (sXxlx == "2") {
        sType = "checkbox";
    }
    //获取题目选项上级div
    var $zxxxDivId = $('#' + sFjDivId);
    //循环追加题目子选项信息
    for (var n = 0; n <= sXxxxObj.length - 1; n++) {
        var sZxbh = sXxxxObj[n].ZXBH;       //子项编号
        sZxbh = flbh_Prefix + sZxbh;
        var sZxbt = sXxxxObj[n].ZXBT;       //子项标题
        var sZxqtObj = sXxxxObj[n].ZXQT;    //子项其他

        var zxxxHtml = '<label class="padding-top-5">'
            + '  <input id="' + sZxbh + '" name="' + sXxbh + '" type="' + sType + '" value="0" /> ' + sZxbt + '&nbsp;&nbsp;</label>';
        //如果子项其他不为空
        if (sZxqtObj != undefined && sZxqtObj != null) {
            var sZxqtbm = flbh_Prefix + sZxqtObj[0].QTBM;
            var zxqtDivId = sZxbh + fjDivId_Suffix;
            zxxxHtml += '<div id="' + zxqtDivId + '" style="display:inline"> <input id="' + sZxqtbm + '" name="' + sZxbh + '" type="text" maxlength="100" style="display: none;"></div>';
        }
        //追加子项信息html
        $zxxxDivId.append(zxxxHtml);
    }
}


$(document).ready(function () {
    //获取页面数据
    getDfjls();

});


//保存电访评估数据
function saveDfpg() {
    var dfpgData = getDataByForm();
    $.ajax({
        url: "yyhpt_dfgl.do?action=saveDfpg",
        type: "post",
        dataType: "json",
        data: dfpgData,
        success: function (data) {
            if (data[0].code == "T") {
                $("#DFJLLSH").val(data[0].key);
                wnform.toast('保存成功!');
                dialogModel.close();
                //刷新列表数据
                $table.bootstrapTable('refresh');
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
    parameters.push(['dfjllsh', $('#DFJLLSH').val() == undefined ? "" : $('#DFJLLSH').val()]);
    parameters.push(['gapglsh', rowPersonInfo.GAPGLSH]);
    parameters.push(['yngrbsh', rowPersonInfo.YNGRBSH]);

    parameters.push(['mbnr', sFirstMbnr]);

    parameters.push(['dfryxm', $('#dfryxm').text()]);

    var sData = getParameterString(parameters);
    sData += '&pgnr=' + getPgnrJson();
    return sData;
}

//获取评估内容Json数据
function getPgnrJson() {
    var pgnrJson = '[';   //评估内容json
    var flbh;             //分类编号

    var firstDfContentId = $("#tabContent div:first").prop("id");
    //获取分类编号
    flbh = $('div #' + firstDfContentId).attr('name');

    //拼接调查内容json
    pgnrJson += '{';
    pgnrJson += '"FLBH":"' + flbh + '",';
    //----------------------评估结果begin----------------------
    pgnrJson += '"PGJG":[';
    //获取所有题目信息
    var tmxxObj = $('div #' + firstDfContentId + ' label[name="' + flbh + '"]');
    if (tmxxObj.length > 0) {
        tmxxObj.each(function () {
            var sTmbm = this.id;
            var sTmDivId = sTmbm + fjDivId_Suffix;
            //已选择选项信息
            var checkedXxxxObj = $('div #' + sTmDivId + ' input[name="' + sTmbm + '"]:checked');
            //题目未选择答案则不拼接题目
            if (checkedXxxxObj.length > 0) {
                pgnrJson += '{';
                pgnrJson += '"TMBM":"' + sTmbm + '",';
                //----------------------选项信息begin----------------------
                pgnrJson += '"TMXX":[';
                //遍历选中选项以保存
                checkedXxxxObj.each(function () {
                    var sXxbh = this.id;
                    var sXxDivId = sXxbh + fjDivId_Suffix;
                    pgnrJson += '{';
                    pgnrJson += '"XXBH":"' + sXxbh + '",';
                    pgnrJson += '"SFXZ":"1",';
                    //已选择项目的子项信息
                    var zxxxObj = $('div #' + sXxDivId + ' input[name="' + sXxbh + '"]');
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
                                    var zxqtObj = $('input[name="' + sZxbh + '"]');
                                    //子项下级存在其他项，则拼接（按一个其他项拼接处理）
                                    if (zxqtObj.length > 0) {
                                        pgnrJson += '"ZXQT":[';
                                        zxqtObj.each(function () {
                                            pgnrJson += '{';
                                            pgnrJson += '"QTBM":"' + this.id + '",';
                                            pgnrJson += '"QTNR":"' + $(this).val() + '"';
                                            pgnrJson += '}';
                                        });
                                        pgnrJson += ']';
                                    }
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
                //----------------------选项信息end-------------------------
                pgnrJson += '},';
            }
        });
        //如果最后一个字符是,则去掉
        pgnrJson = delLastCharOfStr(pgnrJson);
    }
    pgnrJson += ']';
    //----------------------评估结果end----------------------
    pgnrJson += '}]';

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

//将参数数组转换为url参数格式
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

//已做过电访，则动态赋值
function setContentValue(dfContentId, PGNR) {
    var pgnrObj = JSON.parse(PGNR);
    //评估分类
    var pgfl;
    //分类编号
    var flbh;
    //评估结果
    var pgjg;

    if (pgnrObj != undefined && pgnrObj.length > 0) {
        flbh = flbh_Prefix + pgnrObj[0].FLBH;
        pgjg = pgnrObj[0].PGJG;

        //评估项目-题目编码
        var tmbm;
        //评估项目-题目明细
        var tmmxObj;
        //循环评估结果
        for (var j = 0; j <= pgjg.length - 1; j++) {

            tmbm = flbh_Prefix + pgjg[j].TMBM;
            tmmxObj = pgjg[j].TMXX;

            var xxbh;    //选项编号
            var sfxz;    //选项是否选中
            //循环评估题目明细
            for (var m = 0; m <= tmmxObj.length - 1; m++) {
                xxbh = flbh_Prefix + tmmxObj[m].XXBH;
                sfxz = tmmxObj[m].SFXZ;

                if (sfxz == "1") {
                    $('#' + xxbh).iCheck('check');
                }
                var xxxxObj = tmmxObj[m].XXXX;
                if (xxxxObj != undefined) {
                    //循环评估选项
                    var zxbh;      //子项编号
                    var zxsfxz;    //子项是否选中
                    for (var n = 0; n <= xxxxObj.length - 1; n++) {
                        zxbh = flbh_Prefix + xxxxObj[n].ZXBH;
                        zxsfxz = xxxxObj[n].SFXZ;
                        var zxType = $('#' + zxbh).prop('type');
                        if (zxType == "checkbox" || zxType == "radio") {
                            if (zxsfxz == "1") {
                                $('#' + zxbh).iCheck('check');
                            }
                        } else {
                            var sZxnr = xxxxObj[n].ZXNR;
                            $('#' + zxbh).val(sZxnr);
                        }

                        var zxqtObj = xxxxObj[n].ZXQT;
                        if (zxqtObj != undefined) {
                            for (var f = 0; f <= zxqtObj.length - 1; f++) {
                                var qtbm = flbh_Prefix + zxqtObj[f].QTBM;
                                var qtnr = zxqtObj[f].QTNR;
                                $('#' + qtbm).val(qtnr);
                            }
                        }
                    }
                }
            }
        }
    }
}

//设置div下所有标签不可用
function enabledAllElement(elementId) {
    //设置div下所有radio不可用
    $("div #" + elementId + " input[type='radio']").attr("disabled", true);
    $("div #" + elementId + " input[type='checkbox']").attr("disabled", true);
    $("div #" + elementId + " input[type='text']").attr("disabled", true);
}