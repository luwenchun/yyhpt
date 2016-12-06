<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%--
  Created by IntelliJ IDEA.
  User: Mr.wang
  Date: 2016/9/27
  Time: 13:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <style type="text/css">
        .panel-heading-height {
            height: 35px;
        }

        .head-title {
            margin-top: 0px;
            margin-bottom: 0px;
            font-weight: bold;
            font-size: 16px;
            color: #000000;
        }

        .no-padding-right {
            padding-right: 0px;
            padding-left: 0px;
        }

        .label-margin-left-right {
            margin-left: 5px;
            margin-right: 5px;
        }
    </style>
</head>
<body>

<form id="sapgMainForm" method="post" class="form-horizontal" style="font-size: 13px;">
    <!-- 个人基本信息开始-->
    <div class="panel panel-default">
        <div class="panel-heading panel-heading-height">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#grxxcontent">
                <h3 class="head-title">
                    <span class="glyphicon glyphicon-th"></span> 个人信息
                </h3>
            </a>
        </div>
        <div id="grxxcontent" class="panel-collapse collapse in nopadding">
            <div class="form-horizontal form-bordered form-row-stripped nopadding">
                <div class="form-group nopadding">
                    <div class="col-md-4 col-xs-12">
                        <label class="col-md-3 col-xs-4 control-label control-label-new
                                    no-padding-right">姓名：</label>
                        <div class="col-md-3 no-padding-right">
                            <p id="grxx_xm" class="form-control-static"></p>
                        </div>

                        <label class="col-md-3 col-xs-4 control-label control-label-new
                                no-padding-right">性别：</label>
                        <div class="col-md-3 no-padding-right">
                            <p id="grxx_xb" class="form-control-static"></p>
                        </div>
                    </div>

                    <div class="col-md-6 col-xs-12">
                        <label class="col-md-2 col-xs-4 control-label control-label-new
                                no-padding-right">出生日期：</label>
                        <div class="col-md-4 no-padding-right">
                            <p id="grxx_csrq" class="form-control-static"></p>
                        </div>

                        <label class="col-md-2 col-xs-4 control-label control-label-new
                                no-padding-right">入院日期：</label>
                        <div class="col-md-4 no-padding-right">
                            <p id="grxx_ryrq" class="form-control-static"></p>
                        </div>
                        <%--<label class="col-md-2 col-xs-4 control-label control-label-new
                                no-padding-right">出院日期：</label>
                        <div class="col-md-2 no-padding-right">
                            <p id="grxx_cyrq" class="form-control-static"></p>
                        </div>--%>
                    </div>

                    <div class="col-md-2 col-xs-12" style="padding-top: 2px;text-align:center;">
                        <button id="btn_Cyxj" type="button" class="btn btn-default btn-sm">
                            调阅出院小结
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 个人基本信息结束 -->
    <!-- 转介照顾团队信息开始-->
    <div class="panel panel-default">
        <div class="panel-heading panel-heading-height">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#zjzgtdcontent">
                <h3 class="head-title">
                    <span class="glyphicon glyphicon-th"></span> 转介照顾团队
                </h3>
            </a>
        </div>
        <div id="zjzgtdcontent" class="panel-collapse collapse in nopadding">
            <div class="form-horizontal form-bordered form-row-stripped nopadding">
                <div class="form-group nopadding" style="margin-top: 8px;">
                    <div class="col-md-12 col-xs-12" id="icheck_zjzgtd" style="margin-left: 15px;margin-right: 15px;">

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 转介照顾团队信息结束-->
    <div class="panel panel-default">
        <div class="form-group nopadding" style="margin-top: 8px;">
            <div class="col-md-4 col-xs-12 del-list-row-space">
                <label class="col-md-4 col-xs-5 control-label
								control-label-new">操作人员：</label>
                <div class="col-md-8 col-xs-7"><p id="zjczrygh" name="zjczryxm" class="form-control-static"></p></div>

            </div>
            <div class="col-md-4 col-xs-12 del-list-row-space">
                <label class="col-md-4 col-xs-5 control-label
								control-label-new">操作日期：</label>
                <div class="col-md-8 col-xs-7"><p id="zjczsj" name="zjczsj" class="form-control-static"></p></div>
            </div>
        </div>
    </div>
</form>
<script type="text/javascript">
    var currInfo;

    $(function () {
        initJbxx();
        getPageInfo();

        //出院小结
        $('#btn_Cyxj').on('click', function () {

            var patid = rowPersonInfo.YNGRBSH;
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
    });

    //初始化基本信息
    function initJbxx() {
        console.log('initJbxx');
        console.log(rowPersonInfo);
        $('#grxx_xm').html(rowPersonInfo.XM);
        $('#grxx_xb').html(rowPersonInfo.XBMC ? rowPersonInfo.XBMC : '');
        $('#grxx_csrq').html(rowPersonInfo.CSRQ ? rowPersonInfo.CSRQ : '');
        $('#grxx_lxdh').html(rowPersonInfo.LXDH ? rowPersonInfo.LXDH : '');
        $('#grxx_ryrq').html(rowPersonInfo.RYRQ ? rowPersonInfo.RYRQ : '');
        $('#grxx_cyrq').html(rowPersonInfo.CYRQ ? rowPersonInfo.CYRQ : '');
    }
    ;

    function getPageInfo() {
        $.ajax({
            url: 'yyhpt_sagl.do?action=getPageInfo',
            type: 'post',
            dataType: 'json',
            data: {sapglsh: rowPersonInfo.SAPGLSH},
            success: function (res) {
                console.info('getPageInfo');
                console.log(res);
                if (res) {
                    initCheckBox(res.ksInfos);
                    initPage(res);
                }
                else
                    console.info('no data loading>>>');
            },
            error: function () {
                console.log('error');
            }
        });
    }

    function initCheckBox(res) {
        console.log('initCheckBox^^^')
        wn.createChkWidthByArray($('#icheck_zjzgtd'), res, 'ksmc', 'ksdm', '  label-margin-left-right');
//        wn.iCheckInit();
    }

    function initPage(res) {
        currInfo = res.currInfo;
        var zjInfo = res.zjInfo[0];

        var hasChecked = res.yxzKsList;
        var checker = $("input[name='ksmc']");
        checker.removeAttr("checked");      //取消默认选中

        console.log(hasChecked);

        if (sfzjFlag == '0') {                          //未转介
            $('#zjczrygh').text(currInfo.curr_ryxm);
            $('#zjczsj').text(currInfo.curr_date);
            wn.iCheckInit();
        } else {                                        //
            $('#zjczrygh').text(zjInfo.ZJCZRYXM);
            $('#zjczsj').text(zjInfo.ZJCZSJ);

            if(hasChecked){
                $.each(hasChecked, function (k, v) {
                    $("input[value='" + v.KSDM + "'][name='ksmc']").prop("checked", "checked");
                })
            }


            wn.iCheckInit();

//            if (hasChecked) {
//                console.log('this is hasChecked...');
//                checker.each(function () {                     //遍历所有checkbox，获取其值，判断在已选择科室的数组中是否存在，如存在，控制选中
//                    if ($.inArray(($(this).val()), hasChecked) >= 0) {
//                        $("input[value='" + $(this).val() + "'][name='ksmc']").prop("checked", "checked");
//                    }
//                })
//                wn.iCheckInit();                                        //控制选中之后，改变checkbox样式，否则，选中样式无变化
//            }
        }
    }


    //转介
    var doZjqkSave = function (t) {

        var checker = $("input[name='ksmc']");
        var selectCheckbox = '';

        console.log('checker.length-->' + checker.length);

        for (var i = 0; i < checker.length; i++) {
            if (checker[i].checked)                                  //取到对象数组后，检测它是不是被选中
                selectCheckbox += checker[i].value + ',';             //如果选中，将value添加到变量selectCheckbox中
        }
        console.log('selectCheckbox--->' + selectCheckbox);

        if (selectCheckbox) {
            $.ajax({
                url: 'yyhpt_sagl.do?action=insertZjInfo',
                type: "post",
                dataType: "json",
                data: {
                    sapglsh: rowPersonInfo.SAPGLSH,
                    jhpglsh: rowPersonInfo.JHPGLSH,
                    yngrbsh: rowPersonInfo.YNGRBSH,
                    zjczrygh: currInfo.curr_rygh,
                    zjczryxm: currInfo.curr_ryxm,
                    selectKsdm: selectCheckbox
                },
                success: function (res) {
                    console.log(res);
                    if (res.code == "T") {
                        wnform.toast(res.message);
                        t.close();
                        //刷新列表数据
                        $table.bootstrapTable('refresh');
                        //刷新块状标题数据
                        GetRqNum();
                    }
                    else {
                        wnform.toast(res.message);
                    }
                },
                error: function () {
                    console.log('error')
                }
            });
        } else {
            wnform.toast('未选择任何科室!');
        }
    }


</script>
</body>
</html>
