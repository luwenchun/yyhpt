<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <style type="text/css">
        .choose-date {
            background: url("layouts/img/control/img_rl.png") no-repeat scroll right center transparent;
            cursor: pointer;
        }

        .input-text-body {
            border: 1px solid #ccc;
            outline: 0 !important;
            -webkit-appearance: none;
            color: #555;
            background-color: #fff;
            border-color: #d2d6de;
            box-shadow: none !important;
            transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        }

        .input-text-body:focus {
            border-color: #3c8dbc;
        }

        .head-title {
            margin-top: 0px;
            margin-bottom: 0px;
            font-weight: bold;
            font-size: 20px;
            color: #000000;
        }

        /*小屏幕时lable的样式*/
        .control-label-new {
            padding-top: 6px;
            text-align: right;
            padding-left: 0px;
        }

        /*重写样式*/
        .form-control-static {
            padding-top: 6px;
            padding-bottom: 6px;
        }
    </style>
    <%--<link href="layouts/css/white/detail_page.css" rel="stylesheet">--%>
</head>
<body>

<div class="panel-body" style="font-size:13px;padding:0px">
    <!-- 个人基本信息开始-->
    <jsp:include page="/yyhpt/views/common/grjbxxDetail.jsp"></jsp:include>
    <!-- 个人基本信息结束 -->
    <!-- 预约信息开始 -->
    <form id="defaultForm" method="post" class="form-horizontal">
        <div class="panel panel-default">
            <div class="panel-heading" style="height: 40px">
                <a data-toggle="collapse" data-parent="#accordion"
                   href="#yyxxcontent">
                    <h3
                            style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                        <span class="glyphicon glyphicon-th"></span> 预约信息
                    </h3>
                </a>
            </div>
            <div id="yyxxcontent" class="panel-collapse collapse in nopadding">
                <div class="form-horizontal form-bordered form-row-stripped nopadding">
                    <div class="form-group" style="margin-top: 8px;">
                        <label class="col-md-2 control-label">计划开始日期：</label>
                        <div class="col-md-2">
                            <%--<input type="text"
                                   class="input-sm form-control choose-date"
                                   id="ksrq" name="ksrq" disabled="disabled">--%>
                            <p id="ksrq" class="form-control-static"></p>
                        </div>

                        <label class="col-md-2 control-label">计划结束日期：</label>
                        <div class="col-md-2">
                            <%--<input type="text"
                                   class="form-control input-sm choose-date"
                                   id="jsrq" name="jsrq" disabled="disabled">--%>
                            <p id="jsrq" class="form-control-static"></p>
                        </div>

                        <label class="col-md-1 control-label">责任人：</label>
                        <div class="col-md-2">
                            <%--<input class="form-control input-sm"id="zrrbm" name="zrrxm"
                                   style="border: 0px;" disabled="disabled">--%>
                            <p id="zrrbm" class="form-control-static"></p>
                        </div>
                    </div>

                    <div class="form-group" style="margin-top: 5px;">
                        <label class="col-md-2 col-xs-12 control-label">预约服务日期：</label>
                        <div class="col-md-2 col-xs-6 input-required" style="padding-right: 0px;">
                            <input type="text" class="input-sm form-control choose-date"
                                   id="yyrq" name="yyrq" readonly="readonly" style="background-color: white;">
                        </div>
                        <div class="col-md-3 col-xs-6 input-required" style="padding-right: 20px;padding-left: 10px;">
                            <div class="col-md-5 col-xs-5 nopadding">
                                <input size="16" type="text" class="form-control form_datetime"
                                       value="" id="kssj" name="kssj" readonly
                                       style="cursor: pointer;background-color: white;">
                            </div>
                            <div class="col-md-2 col-xs-2 nopadding" style="text-align:center;padding-top:5px;">
                                <span>-</span>
                            </div>
                            <div class="col-md-5 col-xs-5 nopadding">
                                <input size="16" type="text" class="form-control form_datetime"
                                       value="" id="jssj" name="jssj" readonly
                                       style="cursor: pointer;background-color: white;">
                            </div>
                        </div>
                        <%--<div class="col-md-2 input-group input-group-sm date form_datetime" data-date=""
                             style="padding:0px 15px 0px 15px;float:left;margin-bottom:5px;">
                            <input type="text" class="form-control" id="KSSJ" name="KSSJ" value="" readonly >
                            <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                        </div>
                        <div class="col-md-2 input-group input-group-sm date form_datetime" data-date=""
                             style="padding:0px 15px 0px 15px;float:left;margin-bottom:5px;">
                            <input type="text" class="form-control" id="JSSJ" name="JSSJ" value="" readonly>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                        </div>--%>

                        <label class="col-md-2 control-label">预约服务人员：</label>
                        <div class="col-md-2">
                            <select class="form-control input-sm" id="fwrygh" name="fwryxm"></select>
                        </div>
                    </div>

                    <div class="form-group" style="margin-top: 5px;">
                        <label class="col-md-2 control-label">预约服务地点：</label>
                        <div id="yyfwddDiv" class="col-md-6" style="line-height: 30px; text-align: left;"></div>
                        <div class="col-md-4">
                            <input id="yyddqt" name="yyddqt" type="text" class="input-text-body input-sm"
                                   style="border: 0px;border-bottom: 1px solid silver;">
                        </div>

                        <div class="col-md-12 col-xs-12" style="display: block" id="dzInfo">
                            <label class="col-md-3 col-xs-4 control-label control-label-new" id="dz">居住地址:</label>
                            <div class="col-md-9">
                                <p id="dzDetail" class="form-control-static"></p>
                            </div>
                        </div>
                    </div>

                    <div class="form-group" style="margin-top: 5px;">
                        <label class="col-md-2 control-label">短信通知：</label>
                        <div class="col-md-4" style="line-height: 30px; text-align: left;">
                            <input id="dxtz" type="checkbox" checked>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 预约信息结束 -->
        </div>
    </form>
</div>
</body>
<script type="text/javascript">//1、住址；2、护理机构；3、社区服务中心；9、其他

var oldYyrq;     //修改前的预约日期
var oldYykssj;   //修改前的预约开始时间
var oldYyjssj;   //修改前的预约结束时间
var oldDxtzbz;   //修改前的短信通知标志

function getRylist() {
    $.ajax({
        url: "common.do?action=getSysCzrylist",
        type: "post",
        dataType: "json",
        data: {
            // jsmc:'签约医生一览表'
        },
        success: function (data) {
            var rylist = data.czrys;
            // 初始化签约人员
            wn.createSelectByCZRYArray($("#fwrygh"), rylist);
            $("#fwrygh").select2({language: 'zh-CN'});
            dlRybm = data.rybm;
            //设置select2的文本
            $('#fwrygh').val(dlRybm).trigger('change');
        }
    });
}
getRylist();

$(function () {
//	$("[name='dxtz']").bootstrapSwitch();

    $("#dzDetail").html(jzdz);

    getPageControl(fwyyFlag, yyddqt_show);
    getPageData(yylsh, rwdxlsh);
    //赋值基本信息
    var nl = '';
    if (row.CSRQ != null && row.CSRQ != '') {
        nl = jsGetAge(row.CSRQ);
    }
    wn.setformEdit(row);
    $('#CSRQ').text(nl);

    //初始化时间控件
    $('.form_datetime').datetimepicker({
        format: "hh:ii",
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: false,
        autoclose: true,
        todayHighlight: true,
        startView: 'day',   //日期时间选择器打开之后首先显示的视图
        maxView: 'day',      //日期时间选择器最高能展示的选择范围视图
        //minView:'day',
        showMeridian: false,  //是否为天和时间视图显示子午线
        pickerPosition: "bottom-left"
    });

    $('#kssj').on('change', function () {
        var kssj = $('#kssj').val();
        console.info($('#kssj').val())
        var _kssj = kssj.split(':');
        var _hour = _kssj[0];
        var _min = _kssj[1];
        if (parseInt(_hour)+1 == '24') {
            var _jssj = '00' + ':' + _min;
        } else {
            var _jssj = (parseInt(_hour) + 1) + ':' + _min;
        }
        parseInt(_hour+1).toString().length == 1 && (_jssj= '0'+_jssj);
        $('#jssj').val(_jssj);
    });
});

function dosave(t, editRow) {
    //已中止则设置按钮不可用(已做服务登记也不可用)
    if (sJalx == '1') {
        wnform.toast("已中止服务，不能修改!");
        $("#btn_Save").prop('disabled', true);
        return;
    }
    if (sfFwdj != '0') {
        wnform.toast("已服务登记，不能保存!");
        $("#btn_Save").prop('disabled', true);
        return;
    } else {
        saveFwyyForm.init(t, editRow);
        $('#defaultForm').submit();
    }
}

function getPageControl(fwyyFlag, yyddqt_show) {
    console.log('=====>');
    console.log(fwyyFlag);
    $('#yyrq').datepicker({
        autoclose: true,
        //todayBtn: "linked",
        todayHighlight: true,
        startDate: "-0d"   //从当天开始选
    });

    var yyfwdd = [/*{'id':'1','text':'住址'},*/
        {'id': '0', 'text': '居住地址'},
        {'id': '1', 'text': '户籍地址'},
        {'id': '2', 'text': '护理机构'},
        {'id': '3', 'text': '社区服务中心'},
        {'id': '9', 'text': '其他'}];

    if (fwyyFlag == '0') {//新增
        console.log('>>>>>>>>>>add')
        $('#yyddqt').hide();
        createiRadioByArrayBase($('#yyfwddDiv'), yyfwdd, 'yydddm', 'yyddmc', 0);
    } else {
        console.log('>>>>>>>>>>edit')
        console.log('yyddqt_show:' + yyddqt_show);

        createiRadioByArrayBase($('#yyfwddDiv'), yyfwdd, 'yydddm', 'yyddmc', fwyyFlag);
        $("input[name='yyddmc']").on('ifClicked', function (event) {
            if (event.target.value == "9") {
                $("#yyddqt").show();
            } else {
                $("#yyddqt").hide();
                $("#yyddqt").val("");
            }
        });
    }
//	wn.iCheckInit();
}

function createiRadioByArrayBase(selObject, array, fieldID, fieldName, iflag, split) {
    console.log('iflag:' + iflag);
    var selectBody = "";
    var i = 0;
    var chk = " checked";
    $.each(array, function () {
        if (i == 0) {
            chk = " checked";
        } else {
            chk = "";
        }
        selectBody += "<label class=\"control-content col-md-" + split
                + "   top: -1px !important;\" style=\"padding-left: 0;padding-right: 0;\" >"
                + " <input type=\"radio\" id=\"" + fieldID
                + "\"  name=\"" + fieldName + "\" value=\"" + this.id + "\""
                + "\"  title=\"" + this.text + "\""
                + chk + " \" > " + this.text + "</label>";
        i++;
    });
    selObject.html(selectBody);

    if (iflag == '0') {
        console.log("<-----show")
        selObject.iCheck({
            checkboxClass: 'icheckbox_flat-wnred',
            radioClass: 'iradio_flat-wnred',
            increaseArea: '20%'
        });
//	    $("input").on('ifChecked', function (event) {
//	    	console.log(event)
//	    	changed(this);
//	    });
    }

    $("input").on('ifChecked', function (event) {
        console.log(event)
        changed(this);
    });
}
function changed(obj) {
    console.log('changed');
    console.log(obj);
    if ($(obj).is(':checked') && $(obj).val() == 0) {
        $("#dzInfo").css('display', 'block');
        $("#dz").html('居住地址:');
        $("#dzDetail").html(jzdz);
    } else if ($(obj).is(':checked') && $(obj).val() == 1) {
        $("#dzInfo").css('display', 'block');
        $("#dz").html('户籍地址:');
        $("#dzDetail").html(hjdz);
    } else {
        $("#dzInfo").css('display', 'none');
        if ($(obj).is(':checked') && $(obj).val() == 9) {
            $('#yyddqt').show();
        } else {
            $('#yyddqt').hide();
        }
    }

}

function getPageData(yylsh, rwdxlsh) {
    $.ajax({
        url: "yyhptRwglFwgl.do?action=getPageData",
        type: "post",
        dataType: "json",
        data: {
            yylsh: yylsh,
            rwdxlsh: rwdxlsh
        },
        success: function (data) {
            var pageData = data.pageData;
            //没有预约数据
            if (pageData.length != 0) {
                initForm(pageData[0]);
                //设置select2的文本
                $('#fwrygh').val(pageData[0].fwrygh).trigger('change');
                var yyrq = pageData[0].yyrq;	 //预约服务日期
                var yyddqt = pageData[0].yyddqt; //预约地点其他

                jzdz = pageData[0].jzdxxdz;
                hjdz = pageData[0].hjdxxdz;

                if (pageData[0].yydddm == '0') {
                    $("#dz").html('居住地址:');
                    $("#dzDetail").html(pageData[0].jzdxxdz);
                } else if (pageData[0].yydddm == '1') {
                    $("#dz").html('户籍地址:');
                    $("#dzDetail").html(pageData[0].hjdxxdz);
                } else {
                    $("#dzInfo").css('display', 'none');

                    if (pageData[0].yydddm != '9') {
                        $('#yyddqt').hide();
                    } else {
                        yyddqt_show = yyddqt;
                    }
                }

                if (pageData[0].yydddm != '9') {
                    $('#yyddqt').hide();
                } else {
                    yyddqt_show = yyddqt;
                }


                $('#yyrq').val(yyrq);
                $('#kssj').val(pageData[0].kssj);
                $('#jssj').val(pageData[0].jssj);

                oldYyrq = yyrq;
                oldYykssj = pageData[0].kssj;
                oldYyjssj = pageData[0].jssj;

                $('#yyddqt').val(yyddqt);
                var dxtz = pageData[0].dxtz;
                oldDxtzbz = dxtz;
                if (dxtz == 1) {
                    document.getElementById("dxtz").checked = true;
                } else {
                    document.getElementById("dxtz").checked = false;
                }
            } else {
                oldDxtzbz = "1";
                $('#kssj').val('08:30');
//				$('#jssj').val('18:00');
                $('#jssj').val('09:30');
                var rwdxData = data.rwdxData[0];
                $('#yyrq').val(rwdxData.ksrq);
            }
            $("#dxtz").iCheck({
                checkboxClass: 'icheckbox_flat-wnred',
                radioClass: 'iradio_flat-wnred',
                increaseArea: '20%' // optional
            });
            var rwdxData = data.rwdxData[0];

            var ksrq = rwdxData.ksrq;//计划开始日期
            var jsrq = rwdxData.jsrq;//计划结束日期
            var zrrxm = rwdxData.zrrxm;//责任人姓名
            //console.log(rwdxData);
            $('#ksrq').text(ksrq);
            $('#jsrq').text(jsrq);
            $('#zrrbm').text(zrrxm);


        }
    });
}


function initForm(row) {
    $.each(row, function (k, v) {
        var obj = $('#id_' + k);
        if (obj.length > 0) {
            var type = obj.attr("type");
            if (type == 'text') {
                obj.val(v);
            } else if (obj.is('p')) {
                obj.text(v);
            } else if (type == undefined) {
                var tagname = obj.get(0).tagName.toLowerCase();
                if (tagname == "select" && v != null) {
                    //20160901 改为分多选赋值和单选赋值
                    if (v.indexOf(',') > 0) {
                        wn.select2Set($('#' + k), v);
                    } else {
                        obj.val(v);
                    }

                } else if (tagname == "textarea") {
                    obj.val(v);
                }
            } else if (type == 'checkbox') {
                if (obj.attr("name") == k) { // 普通单个checkbox，设id
                    if (obj.val() == v)
                        obj.attr("checked", "checked");
                    else
                        obj.attr("checked", false);
                } else { // checkbox多选，id不等于name
                    wn.checkboxSet2(k, v);
                }
            }

        } else {
            obj = $('#' + k);
            if (obj.length > 0) {
                type = obj.attr("type");
                if (type == undefined) {
                    var tagname = obj.get(0).tagName.toLowerCase();
                    if (tagname == "select" && v != null) {
                        //20160901 改为分多选赋值和单选赋值
                        if (v.indexOf(',') > 0) {
                            wn.select2Set($('#' + k), v);
                        } else {
                            obj.val(v);
                        }
                    } else if (tagname == "textarea") {
                        obj.val(v);
                    }
                } else if (type == 'radio') {
                    k = k.replace('dm', 'mc');
                    k = k.replace('jalx', 'jalxmc')
                    k = k.replace('shjg', 'shjgmc')
                    $("input[value='" + v + "'][name='" + k + "']").attr("checked", "checked");
                    $("input[name='" + k + "']").iCheck({
                        checkboxClass: 'icheckbox_flat-wnred',
                        radioClass: 'iradio_flat-wnred',
                        increaseArea: '20%'
                    });
                }
            }
        }
    });
}

var saveFwyyForm = function () {
    var submitData = function (t, editRow) {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

        var form1 = $('#defaultForm');

        form1.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",  // validate all fields including form hidden input
            messages: {
                yyrq: {
                    required: "预约日期必填"
                },
                sqrq: {
                    required: "申请日期必填"
                },
                jssj: {
                    compareStr: "必须大于开始时间段"
                }
            },
            rules: {
                yyrq: {
                    required: true
                },
                sqrq: {
                    required: true
                },
                jssj: {
                    compareStr: "#kssj"
                }
            },

            // highLight error inputs
            highlight: function (element) {
                // set error class to the control group
                $(element).closest('.input-required').addClass('has-error');
            },

            invalidHandler: function (event, validator) {
                //display error alert on form submit
                $('.alert-danger', $('.form-horizontal')).show();
            },
            success: function (label) {
                label
                        .closest('.input-required').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                var datas = wn.fillWithForm("defaultForm");

                var yngrbsh = editRow.YNGRBSH.toString();
                var rwdxlsh = editRow.RWDXLSH.toString();
                var yylsh = editRow.YYLSH.toString();

                var yyrq = $('#yyrq').val();
                var yykssj = $('#kssj').val();
                var yyjssj = $('#jssj').val();

                datas += '&yngrbsh=' + yngrbsh;
                datas += '&rwdxlsh=' + rwdxlsh;
                datas += '&yylsh=' + yylsh;
                datas += '&sjhm=' + $('#LXDH').text();

                console.log(datas);

                var dxtz = document.getElementById("dxtz");

                if (dxtz.checked) {
                    dxtz = 1;
                } else {
                    dxtz = 0;
                }

                //预约时间变化或者短信通知标志变化 则发送短信 0 不发送 1发送
                var sffsdx = "0";
                if (yyrq != oldYyrq || yykssj != oldYykssj || yyjssj != oldYyjssj || oldDxtzbz != dxtz) {
                    sffsdx = "1";
                }

                datas += '&dxtz=' + dxtz;
                datas += '&sffsdx=' + sffsdx;


                var params = datas.replace(/undefined/g, '');

                var Url = "yyhptRwglFwgl.do?action=saveFwyy";
                $.ajax({
                    url: Url,
                    type: "get",
                    dataType: "json",
                    data: params,
                    success: function (data) {
                        if (data.code == "T") {
                            $.toaster({priority: 'info', title: '提示', message: data.message});
                            t.close();
                            $table.bootstrapTable('refresh');
                        }
                        else {
                            $.toaster({priority: 'warning', title: '提示', message: data.message});
                            console.log(data.message)
                        }
                    }
                });
            }
        });
    };

    return {
        //main function to initiate the module
        init: function (t, editRow) {
            submitData(t, editRow);
        }
    };
}();

/*根据出生日期算出年龄*/
function jsGetAge(strBirthday){
    var returnAge;
    var strBirthdayArr=strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if(nowYear == birthYear){
        returnAge = 0;//同年 则为0岁
    }
    else{
        var ageDiff = nowYear - birthYear ; //年之差
        if(ageDiff > 0){
            if(nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay;//日之差
                if(dayDiff < 0)
                {
                    returnAge = ageDiff - 1;
                }
                else
                {
                    returnAge = ageDiff ;
                }
            }
            else
            {
                var monthDiff = nowMonth - birthMonth;//月之差
                if(monthDiff < 0)
                {
                    returnAge = ageDiff - 1;
                }
                else
                {
                    returnAge = ageDiff ;
                }
            }
        }
        else
        {
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
    }

    return returnAge;//返回周岁年龄

}

</script>
</html>