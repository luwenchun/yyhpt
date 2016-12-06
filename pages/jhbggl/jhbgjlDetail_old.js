var rylist;//登记人员
var djlsh = "";
var jhlsh = "";
var yngrbsh = "";
var ygldjdm = "";
//个人基本信息页面赋值
function bgjl_setGrForm(datas) {
    console.log("comehere");
    console.log(datas);
    console.log("comehere");
    $("#hzxm").text((datas.grjbxx)[0].XM);
    $("#xb").text((datas.grjbxx)[0].XB);
    $("#csrq").text((datas.grjbxx)[0].CSRQ);
    $("#hzshfzhh").text((datas.grjbxx)[0].SFZH);
    $("#jzdz").text(((datas.grjbxx)[0].JZDZ) == null ? '' : (datas.grjbxx)[0].JZDZ);
    $("#lxdh").text(((datas.grjbxx)[0].LXDH) == null ? '' : (datas.grjbxx)[0].LXDH);


    djlsh = datas.djlsh;
    jhlsh = datas.jhlsh;
    yngrbsh = datas.yngrbsh;

    var yydj = [];
    yydj = datas.yydj;
    if (datas.jhbgsqinfo[0].YGLDJDM == null) {
        $('#ygldjdmdiv').text(yydj[0].text);
    } else {
        for (var i = 0; i < yydj.length; i++) {
            var yyydjData = yydj[i];
            if (datas.jhbgsqinfo[0].YGLDJDM == yyydjData.id) {
                $('#ygldjdmdiv').text(yyydjData.text);
            }
        }
    }

    if (datas.jhbgsqinfo[0].SQGLDJDM == null) {
        $('#sqgldjdmdiv').text(yydj[0].text);
    } else {
        for (var i = 0; i < yydj.length; i++) {
            var sqyydjData = yydj[i];
            if (datas.jhbgsqinfo[0].SQGLDJDM == sqyydjData.id) {
                $('#sqgldjdmdiv').text(sqyydjData.text);
            }
        }
    }

    var bgyydmType = datas.jhbgsqinfo[0].BGYYDM;
    if (bgyydmType == "1") {
        $('#bgyydiv').text("等级变化");
    } else {
        $('#bgyydiv').text("个人需求");
        $("#bgyysm").test(datas.jhbgsqinfo[0].BGYYSM);
    }

    initTable();

}
//加载页面控件
function bgjl_loadControl(data) {
    // wn.createiRadioWidthByArray($('#ygldjdmdiv'), data.yydj, 'ygldjdm','ygldjmc',2);//原医养管理等级
    // wn.createiRadioWidthByArray($('#sqgldjdmdiv'), data.yydj, 'xgldjdm','xgldjmc',2);//申请医养管理等级
}

$(function () {

});

function initTable() {
    //先销毁表格
    $("#table_jhbgjl").bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $("#table_jhbgjl").bootstrapTable({
        classes: 'table table-hover warning',
        method: "get",
        url: "yyhptjhbggl.do?action=yzdxm", // 获取数据的Servlet地址
//        data: obj.rows,
        contentType: "application/json",
        iconSize: 'sm',
        showHeader: true,
        height: 200,
        striped: true, // 表格显示条纹
        pagination: false, // 启动分页
        pageSize: 10, // 每页显示的记录数
        pageNumber: 1, // 当前第几页
        pageList: [2], // 记录数可选列表
        search: false, // 是否启用查询
        showColumns: false, // 显示下拉框勾选要显示的列
        showRefresh: false, // 显示刷新按钮
        onlyInfoPagination: false,
        sidePagination: "server", // 表示服务端请求
        uniqueId: "JHMXLSH", // 每一行的唯一标识，一般为主键列
        clickToSelect: true, // 是否启用点击选中行
        showExport: true,
        exportDataType: "basic",
        minimumCountColumns: 2, // 最少允许的列数
        responseHandler: function (res) {
            dictData = res.dict;
            return res;
        },
        queryParamsType: "undefined",
        showPaginationSwitch: false,
        queryParams: function queryParams(params) { // 设置查询参数
            var param = {
                currPage: params.pageNumber,
                pageSize: params.pageSize,
                djlsh: djlsh,
                jhlsh: jhlsh,
                yngrbsh: yngrbsh
            };
            return param;
        },
        columns: [
            {
                title: '序号',
                formatter: function (value, row, index) {
                    return index + 1;
                },
                align: 'center'
            },

            {
                field: 'FWXMMC',
                title: '服务项目',
                align: 'left'
            },
            {
                field: 'FWPCMC',
                title: '服务频次',
                align: 'center'
            },
            {
                field: 'FWSL',
                title: '服务数量',
                align: 'center'
            },
            {
                field: 'FWHJ',
                title: '合计金额',
                align: 'center',
                visible: false
            },
            {
                field: 'ZDRQ',
                title: '制定日期',
                align: 'center'
            },
            {
                field: 'ZDRYXM',
                title: '制定人员',
                align: 'center'
            },
            {
                field: 'CZ',
                title: '操作',
                align: 'center',
                events: {
                    'click .delete': function (e, value, row, index) {
                        deleteInfo(row, index);
                    }
                },
                formatter: function (value, row, index) {
                    return '<a class="delete"  href="javascript:void(0)"><img src="yyhpt/pages/img/fwlb_icon_02.png"> </a>';
                }
            }],
        onLoadSuccess: function (data) { // 加载成功时执行
        },
        onLoadError: function () { // 加载失败时执行
        },
        onCheck: function (row) {
        },
        onUncheck: function (row) {
        }
    });
//    var tchj = 0.0;
//    if (obj == "") {
//        $("#yxfwbhjjg").html(tchj);
//        $("#yxfwbyfjg").html(tchj);
//    }
//    else if (obj.rows.length == 0) {
//        $("#yxfwbhjjg").html(tchj);
//        $("#yxfwbyfjg").html(tchj);
//    } else {
//        for (var i = 0; i < obj.rows.length; i++) {
//        	var fwhj=obj.rows[i].FWHJ;
//        	if(fwhj=""){
//        		fwhj="0.0";
//        	}
//            tchj += parseInt(obj.rows[i].FWHJ);
//        }
//        $("#yxfwbhjjg").html(tchj);
//
//        if(tchj>sHlqye){
//        	$("#yxfwbyfjg").html(tchj - sHlqye );
//        }else{
//        	$("#yxfwbyfjg").html(0.0);
//        }
//    }
}

function deleteInfo(row, index) {
    console.log("deleteInfo");
    BootstrapDialog.show({
        title: '提示信息',
        message: '是否删除？',
        buttons: [{
            label: '确定',
            action: function (dialog) {
                for (var i = 0; i < obj.rows.length; i++) {
                    if (obj.rows[i] == row) {
                        obj.rows = removeElement(obj.rows, i);//删除方法
                    }
                }
                initTable();
                dialog.close();
            }
        }, {
            label: '取消',
            action: function (dialog) {
                dialog.close();
            }
        }]
    });
}

function removeElement(array, index) {
    if (index >= 0 && index < array.length) {
        for (var i = index; i < array.length; i++) {
            array[i] = array[i + 1];
        }
        array.length = array.length - 1;
    }
    return array;

}

function initButtons() {
    //绑定保存按钮，点击后保存数据
    $("#btn_jhzd_save").bind("click", function () {
        if (arrCount(obj) == 0) {
            BootstrapDialog.show({
                title: '提示信息',
                message: '没有记录!',
                buttons: [{
                    label: '确定',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });
            return false;
        } else {
            doRepeat();
            doSave();
        }
    });

    //绑定新增服务包事件，点击后跳转新增服务包窗口
    $("#btn_jhzd_addfw").bind("click", function (dialog) {
        console.log(dialog);
        BootstrapDialog.show({
            title: '新增服务包',
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/jhgl/fwbAddInfo.jsp'),
            onshow: function (dialogRef) {
            },
            onshown: function (dialogRef) {
                dialogg = dialogRef;
            },
            onhide: function (dialogRef) {
            },
            onhidden: function (dialogRef) {
                initTable();
            }
        });
    });


    $("#btn_jhzd_addxm").bind("click", function () {
        BootstrapDialog.show({
            title: "新增项目",
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/jhgl/fwxmAdd.html'),
            onshow: function (dialogRef) {
            },
            onshown: function (dialogRef) {
                dialog = dialogRef;
            },
            onhide: function (dialogRef) {
            },
            onhidden: function (dialogRef) {
                initTable();
            }

        });

    });

//绑定清空事件，清空所有记录
    $("#btn_jhzd_reset").bind("click", function () {
        var objObj = obj;
        if (obj.rows.length == 0) {
            BootstrapDialog.show({
                title: '提示信息',
                message: '没有记录!',
                buttons: [{
                    label: '确定',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });
            return false;
        } else {
            BootstrapDialog.show({
                title: '提示信息',
                message: '是否要清空？',
                buttons: [{
                    label: '确定',
                    action: function (dialog) {
                        dialog.close();
                        var jhmxlsh = "";
                        for (var i = 0; i < obj.rows.length; i++) {
                            jhmxlsh += obj.rows[i].JHMXLSH + " ";
                        }
                        $.ajax({
                            url: 'yyhptjhgl.do?action=deleteJhglYzdxm',
                            type: 'post',
                            dataType: 'json',
                            data: {
                                djlsh: djlsh,
                                yngrbsh: yngrbsh,
                                jhmxlsh: jhmxlsh
                            },
                            success: function (data) {
                                $.toaster({priority: 'warning', title: '提示', message: '删除成功!'});
                            }
                        });
                        obj.rows = [];
                        fwb = [];
                        initTable();
                    }
                }, {
                    label: '取消',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });
        }
    });

//点击退出按钮，关闭当前窗口
    $("#btn_jhzd_exit").bind("click", function () {
        dialoging.close();
    });
}

function doRepeat() {
    if (arrCount(fwb)) {
        var fwbdmarr = [];
        for (var i = 0; i < arrCount(fwb); i++) {
            fwbdmarr[i] = fwb[i].FWBDM;
        }
        fwbdmarr = unique(fwbdmarr);
        fwb = [];
        for (var j = 0; j < arrCount(fwbdmarr); j++) {
            if (fwbdmarr[j] == "0000") {
                fwb.push({FWBDM: '0000', FWBMC: '服务包外项目'});
            } else {
                fwb.push(getFwb(fwbdmarr[j]));
            }
        }
    }
}

function doSave() {
    console.log('doSave');
    console.log(jhjssj);
    var fwxm = JSON.stringify(obj.rows).toLowerCase();
    var strFwb = JSON.stringify(fwb).toLowerCase();
    console.log(fwxm);
    $.ajax({
        url: 'yyhptjhgl.do?action=saveJhglYzdxm',
        type: 'post',
        dataType: 'json',
        data: {
            djlsh: djlsh,
            jhlsh: jhlsh,
            yngrbsh: yngrbsh,
            jhjssj: jhjssj,
            fwxm: fwxm,
            fwb: strFwb
        },
        success: function (data) {
            $.toaster({priority: 'warning', title: '提示', message: '保存成功!'});
            $('#table').bootstrapTable('refresh');//刷新计划管理列表
            GetRqNum();//刷新计划管理列表头部统计模块数据
            dialoging.close();
        }
    })
}


var gldjdms = new Array();//医养管理等级
var s = 0;
function bgjl_initForm(row) {
    gldjdms.length = 0;//清空数组
    $.each(row, function (k, v) {
        var obj = $('#' + k.toLowerCase());
        if (obj.length > 0) {
            type = obj.attr("type");
            if (type == 'text') {

            } else if (type == 'radio') {
                k = k.replace('DM', 'MC');
                k = k.replace('SHZT', 'SHZTS');
                $("input[value='" + v + "'][name='" + k.toLowerCase() + "']").attr("checked", "checked");
                $("input[name='" + k.toLowerCase() + "']").iCheck({
                    checkboxClass: 'icheckbox_flat-wnred',
                    radioClass: 'iradio_flat-wnred',
                    increaseArea: '20%'
                });
                if (k == "SQGLDJMC") {
                    gldjdms[s] = v;
                    s++;
                }
            }
        }

    });
}


//服务包展示
var sYngrbsh = '';
var sDjlsh = '';
var yxtcs;
var allfwtc;
function bgjl_loadJhzdFwbDatas(datas) {
    sYngrbsh = '';
    sDjlsh = '';
    yxtcs = '';
    allfwtc = '';
    //已选服务包数据
    yxtcs = datas.gryxfwbs;
    setYxfwbControl(yxtcs);

    //推荐及可选服务包数据
    allfwtc = datas.allfwbs;
    setKxfwbControl(allfwtc);
    sYngrbsh = datas.yngrbsh;
    sDjlsh = datas.djlsh;
    //$("#jhlsh").val(datas.gryxfwbs[0].JHLSH);//页面隐藏控件用于记录主键
}
//已选服务包页面赋值
var yxtcdms = new Array(); //已选套餐代码
var yxtcfwxmmcs = '';
var yxtcfwxmmcsArr = new Array();//已选套餐服务项目名称数组


function setYxfwbControl(data) {
    yxtcdms.length = 0;//清空数组
    yxtcfwxmmcs = '';  //清空已选套餐服务项目名称逗号串
    yxtcfwxmmcsArr.length = 0;//清空数组
    //已选服务包
    var i = 0;
    var hjje = 0;
    var html = '';
    $.each(data, function () {
        var syrqhtml; //适宜人群html展示
        var yxtctphtml; //已选套餐图片html展示
        if (this.SYRQ != undefined) {
            syrqhtml = "<strong>" + this.SYRQ + "</strong>";
        }
        else {
            syrqhtml = "<strong>" + '无' + "</strong>";
        }
        if (this.FWBZT == '2') {//已执行
            yxtctphtml = "<a href='#' onclick='deleteYxtcData(" + i + "," + this.FWBZT + ",\"" + this.FWBDM + "\")'><div style='margin-top:30px;' title='已执行'><img src='images/icons/icon_yyh_select.png' /></div></a>";
        }
        else if (this.FWBZT == '3') {//已停止
            yxtctphtml = "<a href='#' onclick='deleteYxtcData(" + i + "," + this.FWBZT + ",\"" + this.FWBDM + "\")'><div style='margin-top:30px;' title='已停止'><img src='images/icons/icon_yyh_stop.png' /></div></a>";
        }
        else {//未执行
            yxtctphtml = "<a href='#' onclick='deleteYxtcData(" + i + "," + this.FWBZT + ",\"" + this.FWBDM + "\")'><div style='margin-top:30px;' title='点击移除'><img src='images/icons/icon_yyh_del.png' /></div></a>";
        }

        html += " <div class='col-lg-3 col-md-3'> "
            + "	<div class='panel panel-border-turquoise'>"
            + "		<div class='panel-heading' style = 'padding: 0px 15px 0px 15px;border-bottom: 1px;background-color:#FFFFFF;'>"
            + "          <div class='row' id='jhzdDiv' style = 'border-style:solid; border-width:1px; border-color:#00CED1;'>"
            + "				<div  class='col-xs-4 col-md-4 panel-bg-turquoise' "
            + "					style = 'padding: 23px 5px 23px 5px;text-align:center;background-color: #00CED1;'>"
            + "						<a href='#' onclick='modelFunc_LookFwbmx(\"" + this.FWBDM + "\",\"查看[" + this.FWBMC + "]明细项目\"," + this.CXBZ + ",\"" + this.JHFWBLSH + "\")'><strong style='color:#FFFFFF' title='点击查看明细'>" + this.FWBMC + "</strong></a>"
            + "				</div>"
            + "				<div class='col-xs-5 col-md-5' style = 'padding: 0px 0px 0px 10px;background-color:#FFFFFF;'>"
            + "					<div style='margin-top:10px'>"
            + syrqhtml
            + "					</div>"
            + "					<h5 style='margin-top:10px;color:#00CED1;font-weight:bold;'>" + this.HJJG + "</h5>"
            + "				</div>"
            + "				<div class='col-xs-3 col-md-3 text-right' style='padding: 0px 10px 0px 0px;background-color:#FFFFFF;'>"
            + yxtctphtml
            + "				</div>"
            + "			</div>"
            + "		</div>"
            + "	</div>"
            + "</div>";
        yxtcdms[i] = this.FWBDM;
        hjje = hjje + Number(this.HJJG);
        yxtcfwxmmcs += this.FWXMMCS + ",";
        i++;
    });
    $("#gryxtcpanel").html(html);
    $("#yxtccount").html('已选服务包(' + i + '个)');
    yxtcfwxmmcsArr = (yxtcfwxmmcs.substring(0, yxtcfwxmmcs.length - 1)).split(","); //将已选套餐服务项目逗号串去掉末尾逗号后添加进数组
    var ary = yxtcfwxmmcsArr.sort();
    var yxtccffwxms = GetRepeatFwxmmc(ary);//已选套餐内重复的服务项目,用于前台提醒.
    if (yxtccffwxms.length != 0) {//现在只在套餐移动时提醒.不拦截
        BootstrapDialog.show({
            title: '提示信息',
            message: '已选服务包内存在重复服务项目:&nbsp;[' + yxtccffwxms + ']&nbsp;请注意!',
            buttons: [{
                label: '确定',
                action: function (dialog) {
                    dialog.close();
                }
            }]
        });
    }


}

//获取个人方案重复的服务项目
function GetRepeatFwxmmc(ary) {
    var cffwxmsAry = new Array();//重复的服务项目
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] == ary[i + 1]) {
            cffwxmsAry.push(ary[i]);
        }
    }
    var result = [], isRepeated;
    for (var k = 0; k < cffwxmsAry.length; k++) {
        isRepeated = false;
        for (var j = 0; j < result.length; j++) {
            if (cffwxmsAry[k] == result[j]) {
                isRepeated = true;
                break;
            }
        }
        if (!isRepeated) {
            result.push(cffwxmsAry[k]);
        }
    }
    return result;
}

function setKxfwbControl(data) {
    //推荐服务包及可选服务包
    var iFwtc = 0;
    var iTjtc = 0;
    var iKxtc = 0;
    var tjtchtml = '';
    var tjtchtml1 = '';
    var kxtchtml = '';
    var kxtchtml1 = '';

    $.each(data, function () {
        if (!contains(yxtcdms, this.FWBDM)) {
            if (!contains(gldjdms, this.GLDJDM)) {
                //可选服务包
                if (iKxtc <= 3) {
                    kxtchtml += " <div class='col-lg-3 col-md-3'> "
                        + "	<div class='panel panel-border-turquoise'>"
                        + "		<div class='panel-heading' style = 'padding: 0px 15px 0px 15px;border-bottom: 1px;background-color:#FFFFFF;'>"
                        + "          <div class='row' id='jhzdDiv' style = 'border-style:solid; border-width:1px; border-color:#00CED1;'>"
                        + "				<div  class='col-xs-4 col-md-4 panel-bg-turquoise' "
                        + "					style = 'padding: 23px 5px 23px 5px;text-align:center;background-color: #00CED1;'>"
                        + "						<a href='#' onclick='modelFunc_LookFwbmx(\"" + this.FWBDM + "\",\"查看[" + this.FWBMC + "]明细项目\"," + this.CXBZ + ")'><strong style='color:#FFFFFF' title='点击查看明细'>" + this.FWBMC + "</strong></a>"
                        + "				</div>"
                        + "				<div class='col-xs-5 col-md-5' style = 'padding: 0px 0px 0px 10px;background-color:#FFFFFF;'>"
                        + "					<div style='margin-top:10px'>"
                        + "						<strong>" + this.SYRQ + "</strong>"
                        + "					</div>"
                        + "					<h5 style='margin-top:10px;color:#00CED1;font-weight:bold;'>" + this.HJJG + "</h5>"
                        + "				</div>"
                        + "				<div class='col-xs-3 col-md-3 text-right' style='padding: 0px 10px 0px 0px;background-color:#FFFFFF;'>"
                        + "					<a href='#' onclick='addFwtcData(" + iFwtc + ")'><div style='margin-top:30px;' title='点击添加'><img src='images/icons/icon_yyh_add.png' /></div></a>"
                        + "				</div>"
                        + "			</div>"
                        + "		</div>"
                        + "	</div>"
                        + "</div>";
                }
                else {
                    kxtchtml1 += " <div class='col-lg-3 col-md-3'> "
                        + "	<div class='panel panel-border-turquoise'>"
                        + "		<div class='panel-heading' style = 'padding: 0px 15px 0px 15px;border-bottom: 1px;background-color:#FFFFFF;'>"
                        + "          <div class='row' id='jhzdDiv' style = 'border-style:solid; border-width:1px; border-color:#00CED1;'>"
                        + "				<div  class='col-xs-4 col-md-4 panel-bg-turquoise' "
                        + "					style = 'padding: 23px 5px 23px 5px;text-align:center;background-color: #00CED1;'>"
                        + "						<a href='#' onclick='modelFunc_LookFwbmx(\"" + this.FWBDM + "\",\"查看[" + this.FWBMC + "]明细项目\"," + this.CXBZ + ")'><strong style='color:#FFFFFF' title='点击查看明细'>" + this.FWBMC + "</strong></a>"
                        + "				</div>"
                        + "				<div class='col-xs-5 col-md-5' style = 'padding: 0px 0px 0px 10px;background-color:#FFFFFF;'>"
                        + "					<div style='margin-top:10px'>"
                        + "						<strong>" + this.SYRQ + "</strong>"
                        + "					</div>"
                        + "					<h5 style='margin-top:10px;color:#00CED1;font-weight:bold;'>" + this.HJJG + "</h5>"
                        + "				</div>"
                        + "				<div class='col-xs-3 col-md-3 text-right' style='padding: 0px 10px 0px 0px;background-color:#FFFFFF;'>"
                        + "					<a href='#' onclick='addFwtcData(" + iFwtc + ")'><div style='margin-top:30px;' title='点击添加'><img src='images/icons/icon_yyh_add.png' /></div></a>"
                        + "				</div>"
                        + "			</div>"
                        + "		</div>"
                        + "	</div>"
                        + "</div>";
                }
                iKxtc++;
            } else {
                //推荐服务包
                if (iTjtc <= 3) {
                    tjtchtml += " <div class='col-lg-3 col-md-3'> "
                        + "	<div class='panel panel-border-turquoise'>"
                        + "		<div class='panel-heading' style = 'padding: 0px 15px 0px 15px;border-bottom: 1px;background-color:#FFFFFF;'>"
                        + "          <div class='row' id='jhzdDiv' style = 'border-style:solid; border-width:1px; border-color:#00CED1;'>"
                        + "				<div  class='col-xs-4 col-md-4 panel-bg-turquoise' "
                        + "					style = 'padding: 23px 5px 23px 5px;text-align:center;background-color: #00CED1;'>"
                        + "						<a href='#' onclick='modelFunc_LookFwbmx(\"" + this.FWBDM + "\",\"查看[" + this.FWBMC + "]明细项目\"," + this.CXBZ + ")'><strong style='color:#FFFFFF' title='点击查看明细'>" + this.FWBMC + "</strong></a>"
                        + "				</div>"
                        + "				<div class='col-xs-5 col-md-5' style = 'padding: 0px 0px 0px 10px;background-color:#FFFFFF;'>"
                        + "					<div style='margin-top:10px'>"
                        + "						<strong>" + this.SYRQ + "</strong>"
                        + "					</div>"
                        + "					<h5 style='margin-top:10px;color:#00CED1;font-weight:bold;'>" + this.HJJG + "</h5>"
                        + "				</div>"
                        + "				<div class='col-xs-3 col-md-3 text-right' style='padding: 0px 10px 0px 0px;background-color:#FFFFFF;'>"
                        + "					<a href='#' onclick='addFwtcData(" + iFwtc + ")'><div style='margin-top:30px;' title='点击添加'><img src='images/icons/icon_yyh_add.png' /></div></a>"
                        + "				</div>"
                        + "			</div>"
                        + "		</div>"
                        + "	</div>"
                        + "</div>";
                } else {
                    tjtchtml1 += " <div class='col-lg-3 col-md-3'> "
                        + "	<div class='panel panel-border-turquoise'>"
                        + "		<div class='panel-heading' style = 'padding: 0px 15px 0px 15px;border-bottom: 1px;background-color:#FFFFFF;'>"
                        + "          <div class='row' id='jhzdDiv' style = 'border-style:solid; border-width:1px; border-color:#00CED1;'>"
                        + "				<div  class='col-xs-4 col-md-4 panel-bg-turquoise' "
                        + "					style = 'padding: 23px 5px 23px 5px;text-align:center;background-color: #00CED1;'>"
                        + "						<a href='#' onclick='modelFunc_LookFwbmx(\"" + this.FWBDM + "\",\"查看[" + this.FWBMC + "]明细项目\"," + this.CXBZ + ")'><strong style='color:#FFFFFF' title='点击查看明细'>" + this.FWBMC + "</strong></a>"
                        + "				</div>"
                        + "				<div class='col-xs-5 col-md-5' style = 'padding: 0px 0px 0px 10px;background-color:#FFFFFF;'>"
                        + "					<div style='margin-top:10px'>"
                        + "						<strong>" + this.SYRQ + "</strong>"
                        + "					</div>"
                        + "					<h5 style='margin-top:10px;color:#00CED1;font-weight:bold;'>" + this.HJJG + "</h5>"
                        + "				</div>"
                        + "				<div class='col-xs-3 col-md-3 text-right' style='padding: 0px 10px 0px 0px;background-color:#FFFFFF;'>"
                        + "					<a href='#' onclick='addFwtcData(" + iFwtc + ")'><div style='margin-top:30px;' title='点击添加'><img src='images/icons/icon_yyh_add.png' /></div></a>"
                        + "				</div>"
                        + "			</div>"
                        + "		</div>"
                        + "	</div>"
                        + "</div>";
                }
                iTjtc++;
            }
        }
        iFwtc++;

    });

    $("#grtjtcpanel").html(tjtchtml);
    $("#grtjtcpanels").html(tjtchtml1);
    $("#tjtccount").html('推荐服务包(' + iTjtc + '个)');

    $("#grkxtcpanel").html(kxtchtml);
    $("#grkxtcpanels").html(kxtchtml1);
    $("#kxtccount").html('可选服务包(' + iKxtc + '个)');


}

//通用方法-判断元素是否在数组内
function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}

//推荐服务包更多显示控制
$("#tjtcmore").bind("click", function () {
    MoretjtcBind();
});
var MoretjtcBind = function () {
    if ($('#grtjtcpanels').hasClass('hidden'))
        $('#grtjtcpanels').removeClass("hidden");
    else
        $('#grtjtcpanels').addClass("hidden");
};

//可选服务包更多显示控制
$("#kxtcmore").bind("click", function () {
    MorekxtcBind();
});
var MorekxtcBind = function () {
    if ($('#grkxtcpanels').hasClass('hidden'))
        $('#grkxtcpanels').removeClass("hidden");
    else
        $('#grkxtcpanels').addClass("hidden");
    return false;
};


//弹出方法(二级页面)服务包明细项目展示
function modelFunc_LookFwbmx(row, mtitle, mflag, sjhfwbdm) {
    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_WIDE,
        data: {
            'data1': 'Orange'
        },
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhpt/views/jhgl/fwbxmDetail.html'),
        buttons: [{
            label: '取消',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],
        onshow: function (dialogRef) {
        },
        onshown: function (dialogRef) {
            if (mflag == 2) {//展示基础服务包服务项目
                $.ajax({
                    url: 'yyhptjhgl.do?action=get_fwxm_details',
                    type: 'get',
                    dataType: 'json',
                    data: {fwbdm: row}

                }).done(function (datas) {
                    LoadContent(2, datas.jcfwbmx);

                }).fail(function () {
                    console.log("error");
                }).always(function () {
                    console.log("complete");
                });
            } else {//展示已选服务包服务项目
                $.ajax({
                    url: 'yyhptjhgl.do?action=get_YxfwbFwxm_Details',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        jhfwblsh: sjhfwbdm
                    }
                }).done(function (datas) {
                    LoadContent(1, datas.yxfwbmx);

                }).fail(function () {
                    console.log("error");
                }).always(function () {
                    console.log("complete");
                });
            }
        },
        onhide: function (dialogRef) {
            $(this).removeData("bs.modal");
        },
        onhidden: function (dialogRef) {
            $(this).removeData("bs.modal");
        }
    });
}
//服务包明细展示
function LoadContent(iFlag, countents) {
    var str = "";
    var strHtml = "";
    var fwxms = countents;
    if (fwxms != undefined && fwxms != null) {
        var k = fwxms.length;
        strHtml = "<div class='row'>";
        for (var i = 0; i < k; ++i) {
            strHtml += createFwxmHtml(i, fwxms[i]);
        }
        strHtml += "</div>";
    }
    $("#tcdetail").html(strHtml);
}
//已选服务包推荐服务包及可选服务包明细展示
function createFwxmHtml(index, jsonFwxm) {
    var strHtml;
    var fwpcHtml;
    var fwddHtml;
    if (index >= 0 && jsonFwxm != undefined && jsonFwxm != null) {
        if (jsonFwxm.FWPC != undefined) {
            fwpcHtml = "<span class='pull-right'>" + jsonFwxm.FWPC + "</span>";
        } else {
            fwpcHtml = "<span class='pull-right'></span>";
        }
        strHtml = "  <div id='id=id_" + jsonFwxm.XMDM + "' class='col-sm-4'>"
            + "      <div class='box box-green' style='background:#97FFFF; color:#FFFF'>"
            + "          <div class='box-header with-border border-green '>"
            + "                <h3 class='box-title'><strong>" + jsonFwxm.XMMC + "</strong></h3>"
            + fwpcHtml
            + "           </div>"
            + "           <div class='box-body'>"
            + "                <div id='id_hjjgDisplay_" + jsonFwxm.XMDM + "' class='col-sm-12'>"
            + "                     <strong><strong></strong><i class='fa fa-rmb'></i>" + jsonFwxm.FYDJ + " x " + jsonFwxm.SL + "次" + " = <i class='fa fa-rmb'></i>" + (jsonFwxm.FYDJ * jsonFwxm.SL).toFixed(1) + "</strong></p>"
            + "                </div>"
            + "           </div>"
            + "     </div>"
            + "   </div>";
    }
    return strHtml;
}

//已选服务包移动事件
function deleteYxtcData(rn, tczt, tcdm) {
    if (tcdm == '0000') {
        wnform.toast('服务包外服务项目,无法更改!');
        return false;
    } else if (tczt == '2') {
        wnform.toast('该服务包已执行,无法更改!');
        return false;
    } else if (tczt == '3') {
        wnform.toast('该服务包已停止,无法更改!');
        return false;
    } else {
        //删除已选套餐(临时记录)
        yxtcs.splice(rn, 1);
        setYxfwbControl(yxtcs);
        setKxfwbControl(allfwtc);
    }
}

//可选及推荐服务包移动事件
function addFwtcData(rn) {
    alert("111222111");
    //为个人添加套餐(临时记录)
    var obj = (allfwtc.splice(rn, 1));//[object Object]//获取套餐对象
    yxtcs.splice(0, 0, obj[0]);//将套餐对象添加到已选套餐
    allfwtc.splice(0, 0, obj[0]);//将删除的套餐对象添加回去
    alert(yxtcs);
    setYxfwbControl(yxtcs);
    setKxfwbControl(allfwtc);
}

//保存
var saveForm = function () {
    var submitData = function (t, bgsqlsh, yngrbsh, djlsh, yjhlsh) {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation
        var form1 = $('#defaultForm_');

        form1.validate({
            errorElement: 'span', // default input error message container
            errorClass: 'help-block help-block-error', // default input error
                                                       // message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "", // validate all fields including form hidden input
            messages: {},
            rules: {},

            // highLight error inputs
            highlight: function (element) {
                // set error class to the control group
                $(element).closest('.form-group').addClass('has-error');
            },

            invalidHandler: function (event, validator) {
                // display error alert on form submit
                $('.alert-danger', $('.form-horizontal')).show();
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
            },
            submitHandler: function (form) {
                var datas = wn.fillWithForm("defaultForm_");
                datas += '&yngrbsh=' + yngrbsh
                    + '&bgsqlsh=' + bgsqlsh
                    + '&bgjllsh=' + bgjllsh
                    + '&djlsh=' + djlsh
                    + '&yjhlsh=' + yjhlsh
                    + '&jhlsh=' + $("#jhlsh").val()
                    + '&fwbdms=' + yxtcdms.join()

                var datass = datas.replace(/undefined/, '');
                var Url = "yyhptjhbggl.do?action=saveJhbgjl";
                $.ajax({
                    url: Url,
                    type: "get",
                    dataType: "json",
                    data: datass,
//					{
//						datas : datass,
//						//jhlsh : $("#jhlsh").val(),
//						//fwbdms : yxtcdms.join()//数组中的所有元素以逗号分隔放入一个字符串
//					},
                    success: function (result) {
                        if (result.code == "T") {
                            $("#jhlsh").val(data[0].key); // 回传主键
                            alert("data[0].key=" + data[0].key);
                            $.toaster({
                                priority: 'info',
                                title: '提示',
                                message: result.message
                            });
                            t.close();
                            $table.bootstrapTable('refresh');
                        } else {
                            $.toaster({
                                priority: 'warning',
                                title: '提示',
                                message: result.message
                            });
                        }
                    }
                });
            }
        });
    };
    return {
        // main function to initiate the module
        init: function (t, bgsqlsh, yngrbsh, djlsh, yjhlsh) {
            submitData(t, bgsqlsh, yngrbsh, djlsh, yjhlsh);
        }
    };
}();

