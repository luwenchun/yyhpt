<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>结算记录</title>
    <style type="text/css">
        .radio-container {
            padding-left: 8px;
        }

        .head-title {
            margin-top: 0px;
            margin-bottom: 0px;
            font-weight: bold;
            font-size: 17px;
            color: #000000;
        }

        .choose-date {
            background: url("layouts/img/control/img_rl.png") no-repeat scroll right center transparent;
            cursor: pointer;
        }

        .title {
            /*font-weight: bold;*/
            /*font-size: 15px;*/
        }

        .title-value {
            font-weight: bold;
            /*font-size: 15px;*/
            color: #FF0000;
        }
    </style>
    <link href="layouts/css/white/list_page.css" rel="stylesheet">
</head>
<body>

<div class="panel-body">
    <form id="id_jsgl_list_form" method="post" class="form-horizontal">
        <div id="rqlbDiv" class="panel panel-default">
            <div class="panel-heading">
                <h3 style="margin-top: 0; margin-bottom: 0;color:#434343; font-weight: bold; font-size: 16px;font-family: 'Microsoft YaHei'">
                    <span class="glyphicon glyphicon-th"></span> 结算记录列表
                </h3>
            </div>

            <div class="form-group" style="margin: 5px 0 5px 0;">
                <label class="col-md-1 control-label" style="">姓名：</label>
                <div class="col-md-2">
                    <input type="text" class="form-control input-sm" id="xm"
                           placeholder="" maxlength="150">
                </div>
                <label class="col-md-1 control-label" style="">医保类别：</label>
                <div class="col-md-2">
                    <select type="text" class="form-control input-sm" id="yblb"
                            placeholder="" maxlength="150"></select>
                </div>
                <label class="col-md-1 control-label" style="">服务人员：</label>
                <div class="col-md-2">
                    <select type="text" class="form-control input-sm" id="fwry"
                            placeholder="" maxlength="150"></select>
                </div>
                <div class="pull-right list-btnDiv" id="rwglList_btnDiv">
                    <button id="btn_query" class="btn btn-default btn-sm">
                        查询
                    </button>
                    <button id="export" type="button" class="btn btn-default btn-sm">
                        导出
                    </button>
                </div>
            </div>
            <hr style="padding-bottom: 0;margin-top: 0; margin-bottom: 10px;">
            <div class="form-group col-md-12" style="margin-bottom: 5px">
                <div class="col-md-2 col-xs-12 nopadding" hidden>
                    <label class="title col-md-5 col-xs-5">服务次数：</label>
                    <span class="title-value col-md-7 col-xs-7"><span id="lab_fwcs">0</span>次</span>
                </div>
                <div class="col-md-2 col-xs-12">
                    <label class="title">总金额：</label>
                    <span class="title-value"><span id="lab_zje">0.00</span>元</span>
                </div>
                <div class="col-md-2 col-xs-12">
                    <label class="title">医保支付：</label>
                    <span class="title-value"><span id="lab_ybzf">0.00</span>元</span>
                </div>
                <div class="col-md-2 col-xs-12" id="div_hlq">
                    <label class="title">护理券抵扣：</label>
                    <span class="title-value"><span id="lab_hlqdk">0.00</span>元</span>
                </div>
                <div class="col-md-2 col-xs-12">
                    <label class="title">优惠金额：</label>
                    <span class="title-value"><span id="lab_yhje">0.00</span>元</span>
                </div>
                <div class="col-md-2 col-xs-12">
                    <label class="title">个人支付：</label>
                    <span class="title-value"><span id="lab_ssje">0.00</span>元</span>
                </div>
            </div>
            <table id="table" class="table-container"></table>
        </div>
    </form>
    <div id="toolbar"></div>
</div>
<script type="text/javascript">
    var $table = $('#table');
    var wholeVar = [];          //用于存放全局变量
    var wholeVar4Page = [];     //用于存放跨页面全局变量
    wholeVar.fwSum = 0;
    wholeVar.hlqdk = 0.00;
    wholeVar.ysje = 0.00;
    wholeVar.ybzf = 0.00;       //医保优惠
    wholeVar.yhje = 0.00;       //优惠金额----指的是根据优惠策略优惠的金额
    wholeVar.hjje = 0.00;       //合计金额，未优惠时金额
    $(function () {
        getRylist();
        gainDictDatas();
        initTable()
        initButtons();
    });

    //隐藏护理券
    function setHlqHide() {
        $('#div_hlq').hide();
        $table.bootstrapTable('hideColumn', 'HLQDK')
    }
    //显示护理券
    function setHlqShow() {
        $('#div_hlq').show();
        $table.bootstrapTable('showColumn', 'HLQDK')
    }
    //初始化显示
    function initShowVar() {
        wholeVar.fwSum = 0;         //服务次数
        wholeVar.hjje = 0.00;       //总金额，未优惠时金额
        wholeVar.ybzf = 0.00;       //医保支付
        wholeVar.hlqdk = 0.00;      //护理券抵扣
        wholeVar.ye = 0.00;         //护理券余额
        wholeVar.ysje = 0.00;       //应收金额
        wholeVar.yhje = 0.00;       //优惠金额----指的是根据优惠策略优惠的金额
    }
    function initTable(data) {
        // 先销毁表格
        $table.bootstrapTable('destroy');
        // 初始化表格,动态从服务器加载数据
        $table.bootstrapTable(
                {
                    classes: 'table table-hover warning',
                    method: "get", // 使用get请求到服务器获取数据
                    data: data,
                    height: typeof(data) == 'undefined' ? 66 : (data.length == 0 ? 66 : (data.length * 33 + 34 >= 330) ? 365 : data.length * 33 + 34),
                    contentType: "application/json",
                    iconSize: 'sm',
                    showHeader: true,
                    striped: true, // 表格显示条纹
                    search: false, // 是否启用查询
                    showColumns: false, // 显示下拉框勾选要显示的列
                    showRefresh: false, // 显示刷新按钮
                    onlyInfoPagination: false,
                    sidePagination: "client", // 表示服务端请求
                    uniqueId: "YBHLQRH", // 每一行的唯一标识，一般为主键列
                    clickToSelect: true, // 是否启用点击选中行
                    showExport: true,
                    exportDataType: "basic",
                    minimumCountColumns: 2, // 最少允许的列数
                    queryParamsType: "undefined",
                    showPaginationSwitch: false,
                    columns: [
                        {
                            title: '序号',
                            formatter: function (value, row, index) {
                                return index + 1;
                            },
                            align: 'center'
                        },
                        {
                            field: 'XM',
                            title: '姓名',
                            align: 'center'
                        }, {
                            field: 'YBLBMC',
                            title: '医保类型',
                            align: 'center'
                        },
                        {
                            field: 'FWRYXM',
                            title: '服务人员',
                            align: 'center'
                        },
                        {
                            field: 'HLRXZ',
                            title: '人员类别',
                            align: 'center',
                            formatter: function (value, row, index) {
                                switch (value) {
                                    case '91':
                                        return '健康护理员';
                                    case '92':
                                        return '医疗护理员';
                                    case '21':
                                        return '注册护士';
                                }
                            }
                        }, {
                            field: 'SJFWSC',
                            title: '服务时长',
                            align: 'center'
                        },
                        {
                            field: 'ZJE',
                            title: '总金额',
                            align: 'center',
                        },
                        {
                            field: 'YBYH',
                            title: '医保支付',
                            align: 'center',
                        },
                        {
                            field: 'HLQDK',
                            title: '护理券抵扣',
                            align: 'center',
                        },
                        {
                            field: 'YHJE',
                            title: '优惠金额',
                            align: 'center',
                        },
                        {
                            field: 'ZFJE',
                            title: '个人支付',
                            align: 'center'
                        },
                        {
                            title: '详情',
                            align: 'center',
                            width: '100px',
                            events: {
                                'click .edit_info': function (e, value, row, index) {
                                    lookFwDetail(value, row, index);
                                }
                            },
                            formatter: function (value, row, index) {
                                return '<a class="edit_info" href="javascript:void(0)"><img src="layouts/img/table/icon_right.png"> 详情</a>';
                            }
                        }],
                    onLoadSuccess: function () { // 加载成功时执行
                        $table.bootstrapTable('refresh');
                    },
                    onLoadError: function () { // 加载失败时执行
                    },
                    onCheck: function (row) {
                    },
                    onUncheck: function (row) {
                    },
                    onCheckAll: function (rows) {
                    },
                    onUncheckAll: function (rows) {
                    }
                })
        if (typeof (data) == 'undefined') {
            setHlqHide();
        } else {
            var show = false;
            $.each(data, function (k, v) {
                if (v.HLQDK != '0') {
                    show = true;
                }
                calcOnCheck(v);
            })
            show ? setHlqShow() : setHlqHide();

        }
    }

    function calcOnCheck(row) {
        wholeVar.hlqdk += parseFloat(row.HLQDK);
        wholeVar.fwSum = parseInt(wholeVar.fwSum) + 1;
        wholeVar.ysje += parseFloat(row.ZFJE);//个人支付
        wholeVar.ybzf += parseFloat(row.YBYH);//医保支付
        console.log(row.YBYH)
        wholeVar.yhje += parseFloat(row.YHJE);//优惠金额
        wholeVar.hjje += parseFloat(row.ZJE);//总金额
        showOnClick();
    }

    function showOnClick() {
        var $hlqdk = $('#lab_hlqdk');                                       //护理券抵扣
        var $hlqye = $('#lab_ye');                                          //护理券余额
        var $fwcs = $('#lab_fwcs');                                         //服务次数
        var $zje = $('#lab_zje');                                           //总金额
        var $ybzf = $('#lab_ybzf');                                         //医保支付
        var $ssje = $('#lab_ssje');                                         //实收金额，支付金额
        var $yhje = $('#lab_yhje');                                         //优惠金额
        $hlqdk.text(wholeVar.hlqdk);
        $hlqye.text(wholeVar.ye);
        $fwcs.text(wholeVar.fwSum);
        $zje.text(wholeVar.hjje);
        $ybzf.text(wholeVar.ybzf);
        $yhje.text(wholeVar.yhje);
        $ssje.text(wholeVar.ysje.toFixed(2));
    }

    function gainDictDatas() {
        $.ajax({
            url: 'yyhptjsgl.do?action=getDictDatas',
            type: 'post',
            dataType: 'json',
            data: {},
            success: function (res) {
                wn.createSelectByArray($('#yblb'), res.insurancetype);
                wn.createSelectByArray($('#fwry'), res.fwrylist);
                $('#yblb').select2({language: 'zh-CN'});
                $('#fwry').select2({language: 'zh-CN'});
            },
            error: function () {
            }
        })
    }

    //获取结算人员请求
    function gainAccountPer(queryParams) {
        $.ajax({
            url: 'yyhpt_jsjl.do?action=per_list',
            type: 'post',
            dataType: 'json',
            data: queryParams,
        }).done(function (data) {
            if (data != null ||data != undefined) {
                if (data.xzrylb.length == 1) {          //if 已结算人员只有一个就直接显示其结算记录信息
                    var params = {
                        yngrbsh: data.xzrylb[0].YNGRBSH,
                        fwrygh: $('#fwry').val(),
                    };
                    getJsjlList(params);
                } else if (data.xzrylb.length > 1 && data.xzrylb.length <= 10) {    //else 待结算人员有多个，显示带选择人员列表供选择
                    wholeVar.choosePerList = data.xzrylb;
                    chooseDetail();
                } else if (data.xzrylb.length > 10) {
                    var xm, yblbdm, fwrygh;
                    xm = $('#xm').val().trim();
                    yblbdm = $('#yblb').val();
                    fwrygh = $('#fwry').val();
                    if ((xm == '' || xm == null) && (yblbdm == '' || yblbdm == null) && (fwrygh == '' || fwrygh == null)) {
                        wnform.toast('当前记录较多，请至少选择一个查询条件');
                        return false;
                    }
                } else if (data.xzrylb.length < 1) {
                    initTable();
                    initShowVar();
                    showOnClick();
                }
            }
        })
    }

    //获取结算记录列表--条件查询
    function getJsjlList(queryParams) {
        $.ajax({
            url: 'yyhpt_jsjl.do?action=list',
            type: 'post',
            dataType: 'json',
            data: queryParams,
            success: function (data) {
                var jsgllb = data.jsgllb;
                console.log(jsgllb)
                jsgllb.length==0?wholeVar.ye = 0: wholeVar.ye = jsgllb[0].ZHYE;
                initTable(jsgllb);
                $table.bootstrapTable('checkAll');
            }
        })
    }
    //选择需要结算人员的界面；
    function chooseDetail(row, title, value) {
        BootstrapDialog.show({
            title: '选择人员',
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/jsjl/choosePerson.jsp'),
            buttons: [{
                label: '确认',
                id: 'btn_confirmSelections',
                cssClass: 'btn-default btn-sm',
                action: function (dialog) {
                    wholeVar.chooseDialog = dialog;
                }
            },
                {
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
        });
    }
    //查看服务记录详情
    function lookFwDetail(value, row, index) {
        wholeVar4Page.showOrHide = 'hide';
        wholeVar4Page.sRwdxlsh = row.RWDXLSH;
        BootstrapDialog.show({
            title: '服务记录详情',
            size: BootstrapDialog.SIZE_WIDE,
            cssClass: 'dialog-bg-color dialog-footer-space',
            closable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/rwgl/fwglFwdj.jsp'),
            buttons: [{
                label: '保存',
                cssClass: 'btn-default btn-sm fwglFwdjSaveBtn',
                action: function (dialogItself) {

                }
            }, {
                label: '取消',
                cssClass: 'btn-default btn-sm fwglFwdjExistBtn',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }],
            onshow: function (dialogRef) {

            },
            onshown: function (dialogRef) {
                dialogModel = dialogRef;
                wholeVar4Page.dialogModel = dialogRef;
            },
            onhide: function (dialogRef) {
                $(this).removeData("bs.modal");
            },
            onhidden: function (dialogRef) {
                $(this).removeData("bs.modal");
            }
        });
    }

    function initButtons() {
        $('#export').on('click', function () {
            $table.tableExport({type: 'excel', escape: 'false'});
            return false;
        });
        $('#btn_query').on('click', function () {
            var xm, yblbdm, fwrygh;
            xm = $('#xm').val().trim();
            yblbdm = $('#yblb').val();
            fwrygh = $('#fwry').val();
            var params = {
                xm: xm,
                yblbdm: yblbdm,
                yngrbsh: '',
                fwrygh: fwrygh,
            };
            gainAccountPer(params);
            return false;
        });
    }

    /**
     * 获取全部人员---加这个请求只是为了调用服务登记页面时要用到
     */
    function getRylist() {
        $.ajax({
            url: "common.do?action=getYhrylist", //getSysCzrylist改为获取医护人员中的护士（及本人）
            type: "post",
            dataType: "json",
            success: function (data) {
                wholeVar4Page.rylist = data.yhrys;
                //初始化签约人员
                //wn.createSelectByCZRYArray($("#zrr"), rylist);
                dlRybm = data.rybm;
                sDlryxm = data.ryxm;
                $("#zrr").val(dlRybm);
            }
        });
    }
</script>
</body>
</html>
