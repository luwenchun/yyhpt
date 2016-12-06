<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title></title>
    <link href="layouts/css/white/list_page.css" rel="stylesheet">
    <link href="layouts/css/white/list_select2.css" rel="stylesheet">
    <script src="frame/plugins/counterup/jquery.waypoints.min.js"></script>
    <script src="frame/plugins/counterup/jquery.counterup.js"></script>
</head>
<body>
<div class="panel-body">
    <form method="post" class="form-horizontal list-font">
        <div class="row">
            <div class="col-lg-4 col-md-4" id="firstDiv">
                <div class="panel list-panel-border">
                    <div class="panel-heading list-panel-head">
                        <div class="row">
                            <div class="col-xs-2 col-md-2 panel-bg-turquoise list-title-left-col">
                                <span class="list-title">待<br/>分配</span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col block-text-align" id="block1">
                                <span class="list-title-space list-title-statu block-select">
                                    <div class="block-one block-select">
                                        <span class="list-title-space list-title-turquoise counter"
                                              id="jjhlNum-left">0</span>
                                    <span>居家护理</span>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4" id="secondDiv">
                <div class="panel list-panel-border-red">
                    <div class="panel-heading list-panel-head">
                        <div class="row" id="dfpDiv">
                            <div class="col-xs-2 col-md-2 panel-bg-red list-title-left-col">
                                <span class="list-title">待<br/>分配</span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col block-text-align" id="block2">
                                <div class="block-one">
                                    <span class="list-title-space list-title-statu">
                                        <span class="list-title-red counter" id="jghlNum-left">0</span>
                                        <span> 机构护理</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-4" id="thirdDiv">
                <div class="panel panel-box-border-three">
                    <div class="panel-heading list-panel-head">
                        <div class="row">
                            <div class="col-xs-2 col-md-2 panel-box-three list-title-left-col">
                                <span class="list-title">已<br/>分配
                                </span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col block-text-align" id="block3">
                                <div class="col-md-6 col-xs-6 block-half-left">
                                    <span class="list-title-space list-title-statu">
                                        <span class="list-title-statu counter" id="jjhlNum-right">0</span> 居家护理
                                    </span>
                                </div>
                                <div class="col-md-6 col-xs-6 block-half-right">
                                    <span class="list-title-space list-title-statu">
                                        <span class="list-title-statu counter" id="jghlNum-right">0</span> 机构护理
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="gwhzDiv" class="panel panel-default">
            <div class="panel-heading" id="list-title" style="font-size:16px;color:#434343;font-weight:bold;">
                <span class="glyphicon glyphicon-th"></span> 对象分配列表
            </div>

            <div class="form-group" style="margin:5px 0px 5px 0px;">
                <div class="col-md-3 nopadding">
                    <label class="col-md-4 control-label">姓名：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control input-sm" id="xm" placeholder="" maxlength="15">
                    </div>
                    <label class="col-md-4 control-label list-row-space">街镇：</label>
                    <div class="col-md-8 list-row-space">
                        <select id="street" class="form-control input-sm">
                            <option value="">---所有街镇---</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4 nopadding">
                    <label class="col-md-4 control-label ">照护等级：</label>
                    <div class="col-md-8">
                        <select id="zhdj" class="form-control input-sm"></select>
                    </div>
                    <label class="col-md-4 control-label list-row-space">医保类别：</label>
                    <div class="col-md-8 list-row-space">
                        <select type="text" class="form-control input-sm" id="yblb"
                                placeholder="" maxlength="150"></select>
                    </div>
                </div>
                <div class="col-md-4" style="padding-top: 6px;">

                    <label class="col-md-4 control-label nopadding-left">状态：</label>
                    <div class="col-md-8">
                        <select id="fpzt" class="form-control input-sm"></select>
                    </div>
                </div>


                <div class="pull-right list-btnDiv">
                    <button id="btn_query" class="btn btn-default btn-sm">
                        查询
                    </button>
                    <button id="export" type="button" class="btn btn-default btn-sm">
                        导出
                    </button>
                    <button id="btn_more" class="btn btn-default btn-sm" style="display: none">
                        更多
                    </button>
                </div>
            </div>
            <table id="table" class="table-container"></table>
        </div>
    </form>
    <div id="toolbar"></div>
</div>
<script type="text/javascript">
    var ywParam;
    var searchStr = location.search;
    ywParam = searchStr.substr(searchStr.indexOf('&') + 8, 8);
    if (ywParam == '=init')
        ywParam = '0';

    $table = $('#table');
    var sDxfp = '';
    var editRow = '';
    var currRow = '';
    var mflag = '0';        //新增

    var djrydh = '';
    var djryxm = '';

    var zhdjs = [];         //照护等级[查询条件]

    var fpzts = []; //分配状态[查询条件]
    var flagFpzt = '';

    var street = '';

    // 域内个人标识号
    var yngrbsh = '';

    var showOrHide = '';    //[show:显示打印/保存按钮；hide:隐藏打印/保存按钮]

    //分配状态[查询条件]
    var fpztArray = [{id: '5', text: "全部"}, {id: '1', text: '（待分配）居家护理'}, {id: '2', text: '（待分配）机构护理'},
        {id: '3', text: '（已分配）居家护理'}, {id: '4', text: '（已分配）机构护理'}];

    $(function () {
        if (ywParam == '1') {
            $('.list-title-space').parent().removeClass('block-select');
            $('#jghlNum-left').parent().parent().addClass('block-select');
        }

        //icheck皮肤
        $('input[name="dxfp"]').iCheck({
            checkboxClass: 'icheckbox_flat-wnred',
            radioClass: 'iradio_flat-wnred',
            increaseArea: '20%'
        });
        initSearchCase();
        initInsuranceType();
        initStreet();

        initFpzt();
        //手机上显示卡片模式
        GetRqNum();
        initTable();
        wnform.addOnresize($table, tableStaus);

        $('#export').on('click', function () {
            $('#table').tableExport({type: 'excel', escape: 'false'});
            return false;
        });

        // 查询按钮事件
        $('#btn_query').on('click', function () {
            ywParam = '';
            $('.list-title-space').parent().removeClass('block-select');
            initTable();
//            $table.bootstrapTable("selectPage", 1);
//            $table.bootstrapTable("refresh");
            return false;
        });

        $('#jjhlNum-left').parent().parent().on('click', function () {
            $('.list-title-space').parent().removeClass('block-select');
            $('#jjhlNum-left').parent().addClass('block-select');
            ywParam = '0';
            InitSearch();
            initTable();
            $('#fpzt').val(["1"]).trigger("change");
//            $table.bootstrapTable("selectPage", 1);
//            $table.bootstrapTable("refresh");
//    		ywParam = '0';
            return false;
        });
        $('#jghlNum-left').parent().parent().on('click', function () {
            $('.list-title-space').parent().removeClass('block-select');
            $(this).addClass('block-select');
            ywParam = '1';
            InitSearch();
            initTable();
            $('#fpzt').val(["2"]).trigger("change");
//            $table.bootstrapTable("selectPage", 1);
//            $table.bootstrapTable("refresh");
//    		ywParam = '0';
            return false;
        });
        $('#jjhlNum-right').parent().parent().on('click', function () {
            $('.list-title-space').parent().removeClass('block-select');
            $(this).addClass('block-select');
            ywParam = '2';
            InitSearch();
            initTable();
            $('#fpzt').val(["3"]).trigger("change");
//            $table.bootstrapTable("selectPage", 1);
//            $table.bootstrapTable("refresh");
//            ywParam = '0';
            return false;
        });
        $('#jghlNum-right').parent().parent().on('click', function () {
            $('.list-title-space').parent().removeClass('block-select');
            $(this).addClass('block-select');
            ywParam = '3';
            InitSearch();
            initTable();
            $('#fpzt').val(["4"]).trigger("change");
//            $table.bootstrapTable("selectPage", 1);
//            $table.bootstrapTable("refresh");
//            ywParam = '0';
            return false;
        });

    });

    function initSearchCase() {
        $.ajax({
            url: 'common.do?action=getZhdj',
            dataType: 'json',
            type: 'post',
            data: {},
            success: function (data) {
                if (data) {
                    $('#zhdj').select2({
                        language: 'zh-CN',
                        placeholder: "请选择查询照护等级",
                        multiple: true,
                        data: data
                    });
                }
            }
        });
    }
    ;

    function initInsuranceType() {
        $.ajax({
            url: 'personal_info.do?action=getInsuranceType',
            dataType: 'json',
            type: 'post',
            data: {},
            success: function (data) {
                wn.createSelectByArray($('#yblb'), data.insuranceType);
                $('#yblb').select2({language: 'zh-CN'});
            }
        });
    }

    function initStreet() {
        $.ajax({
            url: 'common.do?action=get_street',
            dataType: 'json',
            type: 'get',
            data: {},
            success: function (data) {
                if (data) {
                    $('#street').select2({
                        language: 'zh-CN',
                        data: data.StreetList,
                        allowClear: false,
                        multiple: false,
                    }).val(data.currentStreet).trigger("change");
                }
            }
        });
    }
    ;


    function initFpzt() {
        $('#fpzt').select2({
            language: 'zh-CN',
            placeholder: "请选择查询状态",
            multiple: true,
            data: fpztArray
        }).val(["1"]).trigger("change")
                .on('change', function () {
                    if($('#fpzt').val()){
                        if ($('#fpzt').val()[0] == '5') {
                            $('#fpzt').val(["1", "2", "3", "4"]).trigger("change");
                        }
                    }
                });
    };

    function initTable() {
        // 先销毁表格
        $('#table').bootstrapTable('destroy');
        // 初始化表格,动态从服务器加载数据
        $('#table')
                .bootstrapTable(
                        {
                            classes: 'table table-hover warning',
                            method: "get", // 使用get请求到服务器获取数据
                            url: "yyhpt_dxfp.do?action=list", // 获取数据的Servlet地址
                            contentType: "application/json",
                            iconSize: 'sm',
                            showHeader: true,
                            striped: true, // 表格显示条纹
                            pagination: true, // 启动分页
                            pageSize: 10, // 每页显示的记录数
                            pageNumber: 1, // 当前第几页
                            pageList: [2], // 记录数可选列表
                            search: false, // 是否启用查询
                            showColumns: false, // 显示下拉框勾选要显示的列
                            showRefresh: false, // 显示刷新按钮
                            onlyInfoPagination: false,
                            sidePagination: "server", // 表示服务端请求
                            uniqueId: "sqlsh", // 每一行的唯一标识，一般为主键列
                            clickToSelect: false, // 是否启用点击选中行
                            showExport: true,
                            exportDataType: "basic",
                            minimumCountColumns: 2, // 最少允许的列数
                            responseHandler: function (res) {
                                djrygh = res.djrygh;
                                djryxm = res.djryxm;
                                return res;
                            },
                            queryParamsType: "undefined",
                            showPaginationSwitch: false,
                            queryParams: function queryParams(params) { // 设置查询参数
                                getPara(params);
                                var param = {
                                            currPage: params.pageNumber,
                                            pageSize: params.pageSize,
                                            xm: $("#xm").val().trim(),
                                            sfzh: $("#sfzh").val(),
                                            qyysbm: $("#djys").val(),
                                            dxfp: sDxfp,
                                            zhdjs: zhdjs,
                                            street: street,
                                            ywParam: ywParam,
                                            ylfyzffsdm: $('#yblb').val(),
                                            fpzts: JSON.stringify(fpzts).toLowerCase(),
                                            flagFpzt: flagFpzt
                                        }
                                        ;
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
                                    field: 'xm',
                                    title: '姓名',
                                    align: 'center'
                                },
                                {
                                    field: 'sfzh',
                                    title: '身份证号',
                                    visible: false,
                                    formatter: function (value, row, index) {
                                        if (value != undefined) {
                                            if (value.length == 18) {
                                                return value.substr(0, 3)
                                                        + '*********'
                                                        + value.substr(12, 6);
                                            } else if (value.length == 15) {
                                                return value.substr(0, 3)
                                                        + '******'
                                                        + value.substr(9, 6);
                                            } else {
                                                return value;
                                            }
                                        }
                                    },
                                    align: 'center'
                                },
                                {
                                    field: 'xb',
                                    title: '性别',
                                    align: 'center'
                                },
                                {
                                    field: 'nl',
                                    title: '年龄',
                                    align: 'center'
                                },
                                {
                                    field: 'sjhm',
                                    title: '联系电话',
                                    align: 'center'
                                },
                                {
                                    field: 'ylfyzffsmc',
                                    title: '医保类别',
                                    align: 'center'
                                },
                                {
                                    field: 'xq_sqsj',
                                    title: '申请时间',
                                    align: 'center'
                                },
                                {
                                    field: 'xq_xqdjdm',
                                    title: '需求类型',
                                    formatter: xqdjmcFormatter,
                                    align: 'center'
                                },
                                {
                                    field: 'pg_gldjmc',
                                    title: '照护等级',
                                    align: 'center'
                                },
                                {
                                    field: 'jgjc',
                                    title: '意向机构',
                                    align: 'center',
                                    visible: ywParam == '2' || ywParam == '3'
                                },
                                {
                                    field: '',
                                    title: '查看',
                                    align: 'center',
                                    events: operateEvents,
                                    formatter: function (value, row, index) {
                                        return '<a class="toLookDetail" href="javascript:void(0)"> <img src="layouts/img/table/icon_right.png">' + '详情' + '</a>';
                                    }
                                },
                                {
                                    field: 'fpqk',
                                    title: '分配情况',
                                    events: operateEvents,
                                    formatter: operateFormatter,
                                    align: 'center'
                                },
                                {
                                    field: 'jzdz',
                                    title: '居住地址',
                                    halign: 'center',
                                    align: 'left'
                                }],
                            onLoadSuccess: function () { // 加载成功时执行

                            },
                            onLoadError: function () { // 加载失败时执行

                            },
                            onCheck: function (row) {
                            },
                            onUncheck: function (row) {
                                // alert(row.id);
                            }
                        });
    }

    // 初始化查询条件
    function InitSearch() {
//        $("#qyys").val(dlRybm);
        $("#xm").val("");
        $("#zhdj").select2().val(null).trigger("change");
        $('#fpzt').select2().val(null).trigger("change");
        $("#sfzh").val("");
        $('[name = dxfp]:checkbox').attr('checked', false);
        $('#street').val('').trigger("change");
        wn.iCheckInit();
    }


    //获取查询参数
    function getPara(params) {
        //居家护理、机构护理都勾选或都未勾选都查询全部数据。
        if ($('#jjhlCk').prop("checked") && $('#jghlCk').prop("checked")) {
            sDxfp = '';
        } else if (!$('#jjhlCk').prop("checked") && !$('#jghlCk').prop("checked")) {
            sDxfp = '';
        } else {
            if ($('#jjhlCk').prop("checked")) {           //居家护理
                sDxfp = '0';
            } else if ($('#jghlCk').prop("checked")) {    //机构护理
                sDxfp = '1';
            } else {
                sDxfp = '1';
            }
        }
        zhdjs = $('#zhdj').val();
        street = $('#street').val();

        //查询状态条件
        fpzts = [];
        flagFpzt = '';

        if ($('#fpzt').val()) {
            if ($('#fpzt').val().length == 4) {
                flagFpzt = '3';
            } else {

                $.each($('#fpzt').val(), function (k, v) {
                    var fpdxObj = {fpzt: '', gaxqdm: '', flag: ''};
                    switch (v) {
                        case '1':
                            fpdxObj.fpzt = '0';
                            fpdxObj.gaxqdm = "";
                            fpdxObj.flag = "居家";
                            fpzts.push(fpdxObj);
                            break;
                        case '2':
                            fpdxObj.fpzt = '0';
                            fpdxObj.gaxqdm = "";
                            fpdxObj.flag = "机构";
                            fpzts.push(fpdxObj);
                            break;
                        case '3':
                            fpdxObj.fpzt = '1';
                            fpdxObj.gaxqdm = "2";
                            fpdxObj.flag = "居家";
                            fpzts.push(fpdxObj);
                            break;
                        case '4':
                            fpdxObj.fpzt = '1';
                            fpdxObj.gaxqdm = "1";
                            fpdxObj.flag = "机构";
                            fpzts.push(fpdxObj);

                            break;
                        default:
                            fpzts.push(fpdxObj);
                            break;
                    }
                })
            }
        }
    }

    //获取各人群数目
    function GetRqNum() {
        $.ajax({
            url: 'yyhpt_dxfp.do?action=num',
            type: "get",
            dataType: "json",
            data: {},
            success: function (data) {

                displayNumberOfBlock($('#block1'), $('#jjhlNum-left'), $('#jjhlNum-left'), data.WJJ, data.WJJ);
                displayNumberOfBlock($('#block2'), $('#jghlNum-left'), $('#jghlNum-left'), data.WJG, data.WJG);
                displayNumberOfBlock($('#block3'), $('#jjhlNum-right'), $('#jghlNum-right'), data.YJJ, data.YJG);
                $('.counter').counterUp();
            }
        });
    }

    /**
     * [ description]
     *
     * @type {Object} 格式化操作栏绑定事件
     */
    window.operateEvents = {
        'click .dxfpToFpqk': function (e, value, row, index) {
            loadDxfpDetail(row, '对象分配', value);
        },
        'click .toLookDetail': function (e, value, row, index) {
            loadGrxxDetail(row, '个人基本信息详情', 'show');
        }
    };

    function xqdjmcFormatter(value, row, index) {
//           分配结果（个案需求代码）         1：养老机构护理，2：居家护理，3：医院护理，4：社区护理

//                    1000031000	普惠制服务
//                    1000032000	社区服务
//                    1000033000	政府补贴居家养老服务
//                    1000034000	高龄医疗护理服务
//                    1000035000	养老机构服务
//                    1000036000	老年护理机构
//                    1000037000	无适用服务项目

        var gaxqdm = '';
        var gaxqmc = '';
        switch (value) {
            case '1000035000':
                gaxqdm = '1';
                gaxqmc = '机构护理';
                break;
            case '1':
                gaxqdm = '1';
                gaxqmc = '机构护理';
                break;
            case '1000036000':
                gaxqdm = '1';
                gaxqmc = '机构护理';
                break;
            case '1000033000':
                gaxqdm = '2';
                gaxqmc = '居家护理';
                break;
            case '2':
                gaxqdm = '2';
                gaxqmc = '居家护理';
                break;
            case '1000034000':
                gaxqdm = '2';
                gaxqmc = '居家护理';
                break;
            case '3':
                gaxqdm = '3';
                gaxqmc = '医院护理';
                break;
            case '1000032000':
                gaxqdm = '2';
                gaxqmc = '居家护理';
                break;
            case '4':
                gaxqdm = '4';
                gaxqmc = '社区护理';
                break;
            default:
                gaxqdm = '';
                gaxqmc = '';
                break;
        }
        return gaxqmc;
    }

    /**
     * @param value
     * @param row
     * @param index
     * @returns {String}
     */
    function operateFormatter(value, row, index) {
        if (row.fpzt == '0') {
            return '<a class="dxfpToFpqk" href="javascript:void(0)"> <img src="layouts/img/table/icon_del.png">审核中</a>';
        } else if (row.fpzt == '2') {
            return '<a class="dxfpToFpqk" href="javascript:void(0)"> <img src="layouts/img/table/icon_deldata.png">不通过</a>';
        } else if (row.fpzt == '1') {
            switch (row.gaxqdm) {
                case '1':
                    return '<a class="dxfpToFpqk" href="javascript:void(0)"> <img src="layouts/img/table/icon_select.png">' + '机构护理' + '</a>';
                    break;
                case '2':
                    return '<a class="dxfpToFpqk" href="javascript:void(0)"> <img src="layouts/img/table/icon_select.png">' + '居家护理' + '</a>';
                    break;
                case '3':
                    return '<a class="dxfpToFpqk" href="javascript:void(0)"> <img src="layouts/img/table/icon_select.png">' + '医院护理' + '</a>';
                    break;
                case '4':
                    return '<a class="dxfpToFpqk" href="javascript:void(0)"> <img src="layouts/img/table/icon_select.png">' + '社区护理' + '</a>';
                    break;
                default:
                    return '<a class="dxfpToFpqk" href="javascript:void(0)"> <img src="layouts/img/table/icon_select.png">' + '社区护理' + '</a>';
                    break;
            }
        } else {
            return '<a class="dxfpToFpqk" href="javascript:void(0)"> <img src="layouts/img/table/icon_del.png">' + '分配' + '</a>';
        }
    }

    function loadDxfpDetail(row, mtitle, value) {
        if (row.fpzt != '') mflag = '1';
        else mflag = '0';

        editRow = row;
        BootstrapDialog.show({
            title: mtitle,
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/dxfp/dxfpDetail.jsp'),
            buttons: [{
                label: '保存',
                id: 'saveDxfp',
                cssClass: 'btn-default btn-sm',
                action: function (dialogItself) {
                    if (editRow.jalx == '1') {
                        wnform.toast('已中止服务，不能修改!');
                        $('#saveDxfp').prop('disabled', true);
                    } else if (editRow.qybz != '0') {
                        wnform.toast('已签约登记，不能修改!');
                        $("#saveDxfp").prop('disabled', true);
                    } else {
                        doSave(dialogItself);
                    }
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
                GetRqNum();
                $('#table').bootstrapTable('refresh');
            }
        });

    }


    function loadGrxxDetail(row, title, showOrHide) {
        console.info(row)
        this.flag = 'edit';
        this.showOrHide = showOrHide;
        BootstrapDialog.show({
            title: title,
            size: BootstrapDialog.SIZE_BIG,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('personal_info.do?yngrbsh=' + row.yngrbsh),
            buttons: [],
            onshow: function (dialogRef) {
            },
            onshown: function (dialogRef) {
                dialog = dialogRef;
            },
            onhide: function (dialogRef) {

            },
            onhidden: function (dialogRef) {
                GetRqNum();
                $('#table').bootstrapTable("refresh");
            }
        });
    }

    /*根据出生日期算出年龄*/
    function jsGetAge(strBirthday) {
        var returnAge;
        var strBirthdayArr = strBirthday.split("-");
        var birthYear = strBirthdayArr[0];
        var birthMonth = strBirthdayArr[1];
        var birthDay = strBirthdayArr[2];

        d = new Date();
        var nowYear = d.getFullYear();
        var nowMonth = d.getMonth() + 1;
        var nowDay = d.getDate();

        if (nowYear == birthYear) {
            returnAge = 0;//同年 则为0岁
        }
        else {
            var ageDiff = nowYear - birthYear; //年之差
            if (ageDiff > 0) {
                if (nowMonth == birthMonth) {
                    var dayDiff = nowDay - birthDay;//日之差
                    if (dayDiff < 0) {
                        returnAge = ageDiff - 1;
                    }
                    else {
                        returnAge = ageDiff;
                    }
                }
                else {
                    var monthDiff = nowMonth - birthMonth;//月之差
                    if (monthDiff < 0) {
                        returnAge = ageDiff - 1;
                    }
                    else {
                        returnAge = ageDiff;
                    }
                }
            }
            else {
                returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
            }
        }

        return returnAge;//返回周岁年龄

    }

</script>
</body>
</html>