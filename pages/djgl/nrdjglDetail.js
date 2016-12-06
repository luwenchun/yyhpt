var isSave = 'false';
var yhcldm = '';
var isYh = '';
var saveForm = function () {
    var submitData = function (t, yngrbsh, sqlsh) {
        var form1 = $('#defaultForm');
        form1.validate({
            errorElement: 'span', // default input error message container
            errorClass: 'help-block help-block-error', // default input error
                                                       // message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "", // validate all fields including form hidden input
            messages: {
                ksrq: {
                    required: "开始日期必填"
                },
                fwjgdm: {
                    required: "服务机构必选"
                },
                jsrq: {
                    required: "结束日期必填",
                    minLeft: "不能小于起始日期"
                },
            },
            rules: {
                fwjgdm: {required: true},
                ksrq: {
                    required: true
                },
                jsrq: {
                    required: true,
                    minLeft: "#ksrq"
                },
            },
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
                isYh = $('input[name=isYH]:checked').val() == undefined ? '0' : $('input[name=isYH]:checked').val();
                var datas = wn.fillWithForm("defaultForm");
                datas += '&yngrbsh=' + yngrbsh + '&sqlsh=' + sqlsh;
                datas += '&bglsh=' + bglsh;
                datas += '&djlsh=' + djlsh;
                datas += '&isSave=' + isSave;
                datas += '&yhcldm=' + yhcldm;
                datas += '&isYh=' + isYh;
                datas += '&sjhm=' + $('#LXDH').text();
                datas += '&hlfwjg' + $('#fwjgdm').val();
                datas += '&fwqsrq' + $('#ksrq').val();
                datas += '&fwjsrq' + $('#jsrq').val(),
                datas = datas.replace('undefined', '');
                if ($('#hlqje').val() == '') {
                    datas = datas.replace('&hlqje=', '');
                }
                var Url = "yyhptqygl.do?action=saveNrdjgl";
                $.ajax({
                    url: Url,
                    type: "get",
                    dataType: "json",
                    data: datas,
                    success: function (data) {
                        if (data.code == "T") {
                            $('#see_informed_consent').prop('disabled', false);
                            wnform.toast(data.message);
                            isSave = 'true';
                            readAgree = '1';
                            $table.bootstrapTable('refresh');
                        } else {
                            wnform.toast(data.message);
                        }
                    }
                });
            }
        });
    };
    return {
        // main function to initiate the module
        init: function (t, yngrbsh, bglsh) {
            submitData(t, yngrbsh, bglsh);
        }
    };
}();
$(function () {
    $('#ksrq').datepicker('update', new Date().format('yyyy-MM-dd'));

    $('#yxqks').datepicker('update', new Date().format('yyyy-MM-dd'));

    var gaga = new Date(),
        _y = gaga.getFullYear(),
        _m = gaga.getMonth(),
        _d = gaga.getDate();

    var new_gaga = new Date(_y + 1, _m, _d - 1),
        new_y = new_gaga.getFullYear(),
        new_m = new_gaga.getMonth() + 1,
        new_d = new_gaga.getDate();
    $('#jsrq').datepicker('update', new_gaga.format('yyyy-MM-dd'));
    $('#yxqjs').datepicker('update', new_gaga.format('yyyy-MM-dd'));

    $('#ksrq').datepicker({
        format: 'yyyy-mm-dd',
        weekStart: 1,
        autoclose: true,
        todayBtn: 'linked',
        language: 'zh-CN'
    }).on('changeDate', function (ev) {
        _y = ev.date.getFullYear(),
            _m = ev.date.getMonth(),
            _d = ev.date.getDate();

        var new_gaga = new Date(_y + 1, _m, _d - 1),
            new_y = new_gaga.getFullYear(),
            new_m = new_gaga.getMonth() + 1,
            new_d = new_gaga.getDate();
        $('#jsrq').datepicker('update', new_gaga.format('yyyy-MM-dd'));
    });

    $('#yxqks').datepicker({
        format: 'yyyy-mm-dd',
        weekStart: 1,
        autoclose: true,
        todayBtn: 'linked',
        language: 'zh-CN'
    }).on('changeDate', function (ev) {
        _y = ev.date.getFullYear(),
            _m = ev.date.getMonth(),
            _d = ev.date.getDate();

        var new_gaga = new Date(_y + 1, _m, _d - 1),
            new_y = new_gaga.getFullYear(),
            new_m = new_gaga.getMonth() + 1,
            new_d = new_gaga.getDate();
        $('#yxqjs').datepicker('update', new_gaga.format('yyyy-MM-dd'));
    });
    $('#yxqjs').datepicker({
        format: 'yyyy-mm-dd',
        weekStart: 1,
        autoclose: true,
        todayBtn: 'linked',
        language: 'zh-CN'
    }).on('changeDate', function (ev) {
        _y = ev.date.getFullYear(),
            _m = ev.date.getMonth(),
            _d = ev.date.getDate();

        var new_gaga = new Date(_y + 1, _m, _d - 1),
            new_y = new_gaga.getFullYear(),
            new_m = new_gaga.getMonth() + 1,
            new_d = new_gaga.getDate();
        $('#yxqjs').datepicker('update', new_gaga.format('yyyy-MM-dd'));
    });

    getDictDatas();
});
//获取纳入签约数据
function getNrqyPageData() {
    $.ajax({
        url: 'yyhptqygl.do?action=getNrqyPageData',
        type: 'post',
        dataType: 'json',
        data: {
            djlsh: editRow.DJLSH,
            yngrbsh: editRow.YNGRBSH
        },
        success: function (result) {
            initNrqyDetail(result);
        }
    });
}
//获取页面控件数据
function getDictDatas() {
    $.ajax({
        url: 'yyhptqygl.do?action=getPageControl',
        type: 'post',
        dataType: 'json',
        data: {},
        success: function (data) {
            initButtons(data);
        }
    });
}
//初始化页面控件
function initButtons(result) {
    var yydj = result.yydj;
    var serviceTeam = result.teamInfo;
    var servicePeople = result.hlygList;
    var hlfwjg = result.hlfwjg;
    var nrnd = result.nrnd;
    var currJgInfo = result.currJgInfo;
    wn.createiRadioWidthByArray($('#gldjdmdiv'), yydj, 'gldjdm', 'gldjmc', 2);//医养管理等级
    wn.createSelectByArray($('#fwjgdm'), hlfwjg);//服务机构
    wn.createSelectByArray($('#nrnd'), nrnd);//纳入年度
    teamInfo = serviceTeam;
    peopleInfo = servicePeople;
    var nrnd = document.getElementById("nrnd");
    nrnd.options[1].selected = true;

    if (result.yhclLst.length > 0) {
        $('#hlqclInfo').css('display', 'block');
        $('input[name="isYH"]').iCheck('check');
        wn.iCheckInit();
        if (result.yhclLst[0].SM) {
            $('#yhsm').html(result.yhclLst[0].SM);
        }
    }

    var currJgbm = currJgInfo.currJgbm;
    $('#fwjgdm').val(currJgbm);
    initHlryInfo(currJgbm);

    //		initTeamInfo(fwjgdm4init, fwtddm);
    getNrqyPageData();
}

function initNrqyDetail(result) {
    if (result.yhclLst.length != 0) {
        yhcldm = result.yhclLst[0].YHCLDM;
    }

    if (result.yhryInfoLst.length != 0) {
        $('input[name="isYH"]').iCheck('check');
    } else {
        $('input[name="isYH"]').iCheck('uncheck');
    }
    var personalInfo = result.grxx[0];
    var hasJhzd = result.hasJhzd;//是否已有制定的计划

    if (hasJhzd != 0) {
        hasJhzdFlag = 1;
    } else {
        hasJhzdFlag = 0;
    }

    if (personalInfo != null) {
        bglsh = personalInfo.BGLSH;
        var nl = '';
        if (personalInfo.CSRQ != null && personalInfo.CSRQ != '') {
            nl = jsGetAge(personalInfo.CSRQ);
        }
        fillPageDatas(personalInfo); //填充个人信息
        $('#CSRQ').text(nl);
    }
    if (result.pageData.length != 0) {
        var pageData = result.pageData[0];
//		var fwtddm = pageData.fwtddm;
        var fwjgdm4init = pageData.fwjgdm;
        var hlygh = pageData.hlygh;
        djlsh = pageData.djlsh;

        initHlryInfo(fwjgdm4init, hlygh);
        fillPageDatas(pageData);

        /*   $('#hlqje').val(pageData.hlqje);
         var yxqks = $('#yxqks').val().replaceAll('-', '');
         var yxqjs = $('#yxqjs').val().replaceAll('-', '');
         if (yxqks == '19000101') {
         $('#yxqks').val('');
         }
         if (yxqjs == '19000101') {
         $('#yxqjs').val('');
         }*/
    }
    if (result.yhryInfoLst.length != 0) {
        fillPageDatas(result.yhryInfoLst[0]);
    }
}
//初始化护理人员
function initHlryInfo(bodiesParam, hlygh) {
    $.ajax({
        url: 'yyhptqygl.do?action=getHlygList',
        type: 'post',
        dataType: 'json',
        data: {fwjgdm: bodiesParam},
        success: function (data) {
            wn.createSelectByArray($('#hlygh'), data.hlygList);
            initSelector(data);
            if (hlygh != undefined || hlygh != null) {
//				 wn.select2Set($('#hlygh'), hlygh);
                $('#hlygh').val(hlygh).trigger('change')
            }
        }
    });
};

function initSelector(data) {
    $('#hlygh').select2({language: 'zh-CN'}).trigger('change');
};
function deptChanged() {
    var fwjgdm = $('#fwjgdm').val();
    bodiesChangedBase(fwjgdm);
};
function bodiesChangedBase(bodiesParam) {
    $.ajax({
        url: 'yyhptqygl.do?action=getHlygList',
        type: 'post',
        dataType: 'json',
        data: {fwjgdm: bodiesParam},
        success: function (data) {
            wn.createSelectByArray($('#hlygh'), data.hlygList);
            initSelector(data);
        }
    });
}