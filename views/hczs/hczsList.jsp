<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%--
  Created by IntelliJ IDEA.
  User: Mr.wang
  Date: 2016/10/25
  Time: 15:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>耗材追溯</title>
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
                                <span class="list-title">领用<br/>管理</span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col block-text-align" id="block1">
                                <span class="list-title-space list-title-statu block-select">
                                    <div class="block-one block-select">
                                        <span class="list-title-space list-title-turquoise counter"
                                              id="leftNum">0</span>
                                        <span>已领用</span>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-4" id="secondDiv">
                <div class="panel list-panel-border-red ">
                    <div class="panel-heading list-panel-head">
                        <div class="row">
                            <div class="col-xs-2 col-md-2  panel-bg-red list-title-left-col">
                                <span class="list-title">使用<br/>记录</span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col block-text-align" id="block2">
                                <div class="block-one">
                                    <span class="list-title-space list-title-statu">
                                        <span class="list-title-red counter" id="middleNum">0</span> 已记录
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
                            <div class="col-xs-2 col-md-2  panel-box-three list-title-left-col">
                                <span class="list-title">回收<br/>管理</span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col block-text-align" id="block3">
                                <div class="block-one">
                                    <span class="list-title-space list-title-statu">
                                        <span class="list-title-statu counter" id="rightNum">0</span>
                                        <span> 已回收</span>
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
                <span class="glyphicon glyphicon-th"></span> <span id="list_table_title">领用管理列表</span>
            </div>

            <div class="form-group" style="margin:5px 0px 5px 0px;">
                <div class="col-md-4">
                    <label class="col-md-4 control-label" id="label_lyr">领用人：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control input-sm" id="lyr" placeholder="" maxlength="15">
                    </div>
                    <label class="col-md-4 control-label list-row-space">耗材名称：</label>
                    <div class="col-md-8 list-row-space">
                        <input type="text" class="form-control input-sm" id="hcmc" placeholder="" maxlength="15">
                    </div>
                </div>
                <div class="col-md-8">
                    <label class="col-md-2 control-label" id="label_lyrq">领用日期：</label>
                    <div class="col-md-3">
                        <input id="lyrqks" class="form-control input-sm choose-date" readonly
                               style="background-color: white;"/>
                    </div>
                    <label class="col-md-1 control-label">至</label>
                    <div class="col-md-3">
                        <input id="lyrqjs" class="form-control input-sm choose-date" readonly
                               style="background-color: white;"/>
                    </div>
                </div>

                <div class="pull-right list-btnDiv list-row-space">
                    <button id="btn_add" type="button" class="btn btn-default btn-sm">
                        新增
                    </button>
                    <button id="btn_query" class="btn btn-default btn-sm">
                        查询
                    </button>
                    <button id="export" type="button" class="btn btn-default btn-sm">
                        导出
                    </button>
                </div>
            </div>
            <table id="table" class="table-container"></table>
        </div>
    </form>
    <div id="toolbar"></div>
</div>
</body>
<script>
    var wholeVar = [];
    var hczsWhole = [];
    wholeVar.hczsFlag = 'reception';//领用
    wholeVar.ywParam = '0'; //默认为领用

    $(function () {
        initButtons();
        initListPage();
        GetRqNum();
        wnform.addOnresize($('#table'), tableStaus);
    })

    function initListPage() {
        switch (wholeVar.hczsFlag) {
            case 'reception':
                change2Reception();
                break;
            case 'recover' :
                change2Recover();
                break;
            case 'records' :
                change2Records();
        }
    }

    //初始化按钮
    function initButtons() {
        $table = $('#table');
        $('#btn_add').on('click', function () {
            console.info('btn-add click..');
            chooseSupplies();
            return false;
        });

        $('#export').on('click', function () {
            $('#table').tableExport({type: 'excel', escape: 'false'});
            return false;
        });

        // 查询按钮事件
        $('#btn_query').on('click', function () {
            ywParam = '';
            $('.list-title-space').parent().removeClass('block-select');
            $table.bootstrapTable("selectPage", 1);
            $table.bootstrapTable("refresh");
            return false;
        });

        $('#leftNum').parent().on('click', function () {
            $('.list-title-space').parent().removeClass('block-select');
            $('#leftNum').parent().addClass('block-select');
            InitSearch();
            change2Reception();
            $table.bootstrapTable("selectPage", 1);
            $table.bootstrapTable("refresh");
            return false;
        });
        $('#rightNum').parent().parent().on('click', function () {
            $('.list-title-space').parent().removeClass('block-select');
            $('#rightNum').parent().parent().addClass('block-select');
            InitSearch();
            change2Recover();
            $table.bootstrapTable("selectPage", 1);
            $table.bootstrapTable("refresh");
            return false;
        });
        $('#middleNum').parent().parent().on('click', function () {
            $('.list-title-space').parent().removeClass('block-select');
            $('#middleNum').parent().parent().addClass('block-select');
            InitSearch();
            change2Records();
            return false;
        });

        $('#lyrqks').datepicker({
            format: 'yyyy-mm-dd',
            weekStart: 1,
            autoclose: true,
            todayBtn: 'linked',
            language: 'zh-CN'
        })
        $('#lyrqjs').datepicker({
            format: 'yyyy-mm-dd',
            weekStart: 1,
            autoclose: true,
            todayBtn: 'linked',
            language: 'zh-CN'
        })
    }

    //初始化查询条件
    function InitSearch() {
        $("#lyr").val("");
        $("#hcmc").val("");
        $("#lyrqks").val("");
        $("#lyrqjs").val("");
    }

    //切换为领用列表
    function change2Reception() {
        $('#btn_add').show();
        wholeVar.hczsFlag = 'reception';//领用
        hczsWhole.url = 'yyhpt_hczs.do?action=list';
        $('#list_table_title').text("领用管理列表");
        $('#label_lyr').text("领用人：");
        $('#label_lyrq').text("领用日期：");
        wholeVar.ywParam = '0';         //用来区分[领用列表]和[回收列表]
        initTable();
        wnform.addOnresize($('#table'), tableStaus);
    }

    //切换为回收列表
    function change2Recover() {
        $('#btn_add').show();
        wholeVar.hczsFlag = 'recover';
        $('#list_table_title').text("回收管理列表");
        $('#label_lyr').text("回收人：");
        $('#label_lyrq').text("回收日期：");
        initHsTable();
        wnform.addOnresize($('#table'), tableStaus);
    }

    //切换为使用记录列表
    function change2Records() {
        $('#btn_add').hide();
        wholeVar.hczsFlag = 'records';//使用记录
        $('#list_table_title').text("使用记录列表");
        $('#label_lyr').text("使用人：");
        $('#label_lyrq').text("使用日期：");
        initSyTable();
        wnform.addOnresize($('#table'), tableStaus);
    }

    // 初始化领用列表
    function initTable() {
        var columns = [
            {
                title: '序号',
                formatter: function (value, row, index) {
                    return index + 1;
                },
                align: 'center'
            },
            {
                field: 'LYR',
                title: '领用人',
                align: 'center',
                valign:'middle'
            },
            {
                field: 'LYSJ',
                title: '领用时间',
                align: 'center',
                visible: true
            },
            {
                field: 'HCMC',
                title: '耗材名称',
                align: 'center',
                visible: true
            },
            {
                field: 'HCGG',
                title: '耗材规格',
                align: 'center'
            },
            {
                field: 'LYSL',
                title: '领用数量',
                align: 'center'
            }];
        var url = 'yyhpt_hczs.do?action=list';
        var queryParams = function queryParams(params) {
            var param = {
                currPage: params.pageNumber,
                pageSize: params.pageSize,
                lyr: $("#lyr").val().trim(),
                hcmc: $("#hcmc").val().trim(),
                lyrqks: $("#lyrqks").val(),
                lyrqjs: $("#lyrqjs").val(),
                ywParam: wholeVar.ywParam,
            };
            return param;
        }
        tabTemplate4Dynamic($('#table'), url, columns, queryParams);
    }

    // 初始化回收列表
    function initHsTable() {
        var columns = [
            {
                title: '序号',
                formatter: function (value, row, index) {
                    return index + 1;
                },
                align: 'center'
            },
            {
                field: 'LYR',
                title: '回收人',
                align: 'center',
                valign:'middle'
            },
            {
                field: 'LYSJ',
                title: '回收时间',
                align: 'center',
                visible: true
            },
            {
                field: 'HCMC',
                title: '耗材名称',
                align: 'center',
                visible: true
            },
            {
                field: 'HCGG',
                title: '耗材规格',
                align: 'center'
            },
            {
                field: 'LYSL',
                title: '入库数量',
                align: 'center'
            }];
        var url = 'yyhpt_hczs.do?action=list';
        wholeVar.ywParam = '1';         //用来区分[领用列表]和[回收列表]
        var queryParams = function queryParams(params) {
            var param = {
                currPage: params.pageNumber,
                pageSize: params.pageSize,
                lyr: $("#lyr").val().trim(),
                hcmc: $("#hcmc").val().trim(),
                lyrqks: $("#lyrqks").val(),
                lyrqjs: $("#lyrqjs").val(),
                ywParam: wholeVar.ywParam,
            };
            return param;
        }
        tabTemplate4Dynamic($('#table'), url, columns, queryParams);
    }

    // 初始化使用记录列表
    function initSyTable() {
        var columns = [
            {
                title: '序号',
                formatter: function (value, row, index) {
                    return index + 1;
                },
                align: 'center'
            },
            {
                field: 'RYXM',
                title: '使用人',
                align: 'center',
                valign:'middle'
            },
            {
                field: 'CZRQ',
                title: '使用日期',
                align: 'center',
                visible: true
            },
            {
                field: 'HCMC',
                title: '耗材名称',
                align: 'center',
                visible: true
            },
            {
                field: 'HCGG',
                title: '耗材规格',
                align: 'center'
            },
            {
                field: 'HCSL',
                title: '使用数量',
                align: 'center'
            },
            {
                title: '使用详情',
                align: 'center',
                events: operateEvents,
                formatter: function () {
                    return '<a class="toUseDetail" href="javascript:void(0)"> <img src="layouts/img/table/icon_right.png">' + '查看' + '</a>';
                }
            }
        ];
        var url = 'yyhpt_hczs.do?action=list_records';
        var queryParams = function queryParams(params) {
            var param = {
                currPage: params.pageNumber,
                pageSize: params.pageSize,
                lyr: $("#lyr").val().trim(),
                hcmc: $("#hcmc").val().trim(),
                lyrqks: $("#lyrqks").val(),
                lyrqjs: $("#lyrqjs").val()
            };
            return param;
        }

        tabTemplate4Dynamic($('#table'), url, columns, queryParams)
    }

    //该方法仅限本功能--耗材追溯[以本地数据初始化]
    var tabTemplate4Static = function ($table, data, columns) {
        $table.bootstrapTable('destroy');
        $table.bootstrapTable(
                {
                    classes: 'table table-hover warning',
                    method: "get", // 使用get请求到服务器获取数据
                    data: data,
                    contentType: "application/json",
                    iconSize: 'sm',
                    showHeader: true,
                    striped: true, // 表格显示条纹
                    pagination: false, // 启动分页
                    pageSize: 10, // 每页显示的记录数
                    pageNumber: 1, // 当前第几页
                    pageList: [2], // 记录数可选列表
                    search: false, // 是否启用查询
                    showColumns: false, // 显示下拉框勾选要显示的列
                    showRefresh: false, // 显示刷新按钮
                    onlyInfoPagination: false,
                    uniqueId: "LSH", // 每一行的唯一标识，一般为主键列
                    clickToSelect: false, // 是否启用点击选中行
                    showExport: true,
                    exportDataType: "basic",
                    minimumCountColumns: 2, // 最少允许的列数
                    responseHandler: function (res) {
                        console.log(res);
                        return res;
                    },
                    queryParamsType: "undefined",
                    showPaginationSwitch: false,
                    columns: columns,
                    onLoadSuccess: function (res) { // 加载成功时执行
                    },
                    onLoadError: function () { // 加载失败时执行
                    },
                    onCheck: function (row) {
                    },
                    onUncheck: function (row) {
                    }
                });
    }

    //该方法仅限本功能--耗材追溯[从服务端获取数据]
    var tabTemplate4Dynamic = function ($table, url, columns, queryParams) {
        $table.bootstrapTable('destroy');
        // 初始化表格,动态从服务器加载数据
        $table.bootstrapTable(
                {
                    classes: 'table table-hover warning',
                    method: "get", // 使用get请求到服务器获取数据
                    url: url, // 获取数据的Servlet地址
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
                    uniqueId: "LSH", // 每一行的唯一标识，一般为主键列
                    clickToSelect: false, // 是否启用点击选中行
                    showExport: true,
                    exportDataType: "basic",
                    minimumCountColumns: 2, // 最少允许的列数
                    responseHandler: function (res) {
                        return res;
                    },
                    queryParamsType: "undefined",
                    showPaginationSwitch: false,
                    queryParams: queryParams,              // 设置查询参数
                    columns: columns,
                    onLoadSuccess: function (res) { // 加载成功时执行
                        console.log('success')
                        wnform.MergeCell($table, res, 'LYR');

                    },
                    onLoadError: function () {  // 加载失败时执行
                    },
                    onCheck: function (row) {
                    },
                    onUncheck: function (row) {
                    }
                });
    }

    //使用详情
    function loadUseDetail(row, mtitle) {
        console.info(row)
        wholeVar.fwjllsh = row.FWJLLSH;
        BootstrapDialog.show({
            title: mtitle,
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt_hczs.do?action=toUseDetail'),
            buttons: [{
                label: '退出',
                id: 'exit_choose',
                cssClass: 'btn-default btn-sm',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }],
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

    //耗材选择页面
    function chooseSupplies() {
        BootstrapDialog.show({
            title: '耗材选择',
            size: BootstrapDialog.SIZE_NORMAL,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt_hczs.do?action=init_choose'),
            buttons: [
                {
                    label: '保存',
                    id: 'save_choose',
                    cssClass: 'btn-default btn-sm',
                    action: function (dialogItself) {
                        doSaveLy();
                    }
                },
                {
                    label: '退出',
                    id: 'exit_choose',
                    cssClass: 'btn-default btn-sm',
                    action: function (dialogItself) {
                        dialogItself.close();
                    }
                },
            ],
            onshow: function (dialogRef) {
            },
            onshown: function (dialogRef) {
                wholeVar._1stModal = dialogRef;
                dialog = dialogRef;
            },
            onhide: function (dialogRef) {

            },
            onhidden: function (dialogRef) {
//                GetRqNum();
                $('#table').bootstrapTable("refresh");
            }
        });
    }

    //获取各人群数目
    function GetRqNum() {
        $.ajax({
            url: 'yyhpt_hczs.do?action=num',
            type: "get",
            dataType: "json",
            data: {},
            success: function (data) {
                console.log('---RqNum---')
                console.log(data);

                displayNumberOfBlock($('#block1'), $('#leftNum'), $('#leftNum'), data.YLY, data.YLY);
                displayNumberOfBlock($('#block2'), $('#middleNum'), $('#middleNum'), data.YHS, data.YHS);
                displayNumberOfBlock($('#block3'), $('#rightNum'), $('#rightNum'), data.YJL, data.YJL);
                $('.counter').counterUp();
            }
        });
    }

    window.operateEvents = {
        'click .toUseDetail': function (e, value, row, index) {
            loadUseDetail(row, '查看详情');
        }
    };
</script>
</html>
