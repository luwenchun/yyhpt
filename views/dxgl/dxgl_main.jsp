<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%--
  Created by IntelliJ IDEA.
  User: Edward
  Date: 2016/07/13
  Time: 14:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>对象管理</title>
    <link href="layouts/css/white/list_select2.css" rel="stylesheet">
    <link href="${basePath}/layouts/css/white/list_page.css" rel="stylesheet">
</head>
<body>

<div class="panel-body">
    <form id="rwglListForm" method="post" class="form-horizontal fwgl-list-font">
        <div id="rwglListItem" class="row hidden"
             style="display:<%=pageContext.getRequest().getAttribute("StyleOfTop2Box")%>">
            <div class="col-lg-4 col-md-4" id="firstDiv">
                <div class="panel list-panel-border">
                    <div class="panel-heading list-panel-head">
                        <div class="row" id="fwpjDiv">
                            <div class="col-xs-2 col-md-2  panel-bg-turquoise list-title-left-col">
                                <strong class="list-title">民政<br/>来源</strong>
                            </div>
                            <div class="col-xs-5 col-md-5 list-title-middel-col" style="padding-left: 15px">
                                <div class="list-title-space list-title-statu" style="margin-top: 40px">
                                    <strong id="id_import" class="list-title-num list-title-turquoise">0</strong> 人
                                </div>
                                <button type="button" class="no-border list-btn-style panel-bg-turquoise"
                                        onclick="addNewObject()" hidden>
                                    <div class="list-title">新导入</div>
                                </button>
                            </div>
                            <div class="col-xs-5 col-md-5 text-right list-title-right-col">
                                <div class="list-title-space">
                                    <img src="${basePath}/layouts/img/toolbar/list_icon_01.png"/>
                                </div>
                                <a class="list-title-link list-title-turquoise" id="id_import_details" href="#"
                                   title="点击查看详情">
                                    <strong>查看详情>></strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4" id="secondDiv">
                <div class="panel list-panel-border-red">
                    <div class="panel-heading list-panel-head">
                        <div class="row" id="fwdjDiv">
                            <div class="col-xs-2 col-md-2 panel-bg-red list-title-left-col">
                                <strong class="list-title">其他<br/>来源
                                </strong>
                            </div>
                            <div class="col-xs-5 col-md-5 list-title-middel-col" style="padding-left: 15px">
                                <div class="list-title-space list-title-statu">
                                    <strong id="id_register" class="list-title-num list-title-red">0</strong> 人
                                </div>
                                <button type="button" class="no-border list-btn-style panel-bg-red"
                                        onclick="getPersonInfo('add')">
                                    <div class="list-title">新登记</div>
                                </button>
                            </div>
                            <div class="col-xs-5 col-md-5 text-right list-title-right-col">
                                <div class="list-title-space">
                                    <img src="${basePath}/layouts/img/toolbar/list_icon_04.png"/>
                                </div>
                                <a id="id_add_detail" href="#" class="list-title-link list-title-red"
                                   title="点击查看详情">
                                    <strong>查看详情>></strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="rqlbDiv" class="panel panel-default">
            <div class="panel-heading" id="fwgl-title" style="font-size:16px;color:#434343;font-weight:bold;">
                <span class="glyphicon glyphicon-th"></span> 对象管理列表
            </div>

            <div class="form-group" style="margin:5px 0px 5px 0px;">
                <%
                    if ("none".equals(pageContext.getRequest().getAttribute("StyleOfTop2Box"))) {
                %>
                <div class="col-md-3 nopadding">
                    <label class="col-md-4 control-label">姓名：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control input-sm" id="xm"
                               placeholder="" maxlength="15">
                    </div>
                    <label class="col-md-4 control-label list-row-space">状态：</label>
                    <div class="col-md-8 list-row-space">
                        <select id="zt" class="form-control input-sm"></select>
                    </div>
                </div>
                <%
                } else if ("block".equals(pageContext.getRequest().getAttribute("StyleOfTop2Box"))) {
                %>
                <div class="col-md-3 nopadding">
                    <label class="col-md-4 control-label">姓名：</label>
                    <div class="col-md-8">
                        <input type="text" class="form-control input-sm" id="xm" placeholder="" maxlength="15">
                    </div>
                    <label class="col-md-4 control-label list-row-space">医保类别：</label>
                    <div class="col-md-8 list-row-space">
                        <select type="text" class="form-control input-sm" id="yblb"
                                placeholder="" maxlength="150"></select>
                    </div>
                </div>
                <%
                    }
                %>
                <div class="col-md-4 nopadding">
                    <label class="col-md-4 control-label">照护等级：</label>
                    <div class="col-md-8">
                        <select id="zhdj" class="form-control input-sm"></select>
                    </div>
                    <%
                        if ("block".equals(pageContext.getRequest().getAttribute("StyleOfTop2Box"))) {
                    %>
                    <label class="col-md-4 control-label list-row-space">状态：</label>
                    <div class="col-md-8 list-row-space">
                        <select id="zt" class="form-control input-sm"></select>
                    </div>
                    <%
                        }
                    %>
                </div>

                <div style="display: none">
                    <label class="col-md-1 control-label">登记人员：</label>
                    <div class="col-md-2">
                        <select class="form-control input-sm" name="qyys" id="qyys">
                        </select>
                    </div>
                </div>
                <div style="display:<%=pageContext.getRequest().getAttribute("StyleOfTop2Box")%>">
                    <label class="col-md-1 control-label">街镇：</label>
                    <div class="col-md-2">
                        <select class="form-control input-sm" name="street" id="street">
                            <option value="">---所有街镇---</option>
                        </select>
                    </div>
                </div>

                <%
                    if ("none".equals(pageContext.getRequest().getAttribute("StyleOfTop2Box"))) {
                %>
                <label class="col-md-1 control-label">医保类别：</label>
                <div class="col-md-2">
                    <select type="text" class="form-control input-sm" id="yblb"
                            placeholder="" maxlength="150"></select>
                </div>
                <%
                    }
                %>

                <div class="pull-right list-btnDiv" id="rwglList_btnDiv">
                    <button id="btn_query" class="btn btn-default btn-sm">
                        查询
                    </button>
                    <button id="btn_add" type="button" class="btn btn-default btn-sm">
                        新增
                    </button>
                    <button id="export" type="button" class="btn btn-default btn-sm">
                        导出
                    </button>
                    <button id="more" class="btn btn-default btn-sm" style="display: none">
                        更多
                    </button>
                </div>
            </div>
            <table id="table" class="table-container"></table>
        </div>
    </form>
    <div id="toolbar"></div>
</div>
</body>
<script type="text/javascript">

    var dlRybm;          //登录人员编码
    var sjly = '<%=pageContext.getRequest().getAttribute("sjly")%>';//数据来源 01：医养登记；02：民政导入
    if (sjly == 'null')
        sjly = '02';
    var table = $('#table');
    var dialog;
    var currEnvir;

    var showOrHide = '';    //[show:显示打印/保存按钮；隐藏打印/保存按钮]
    // 新增或者修改状态，默认为新增（弹出页面用到）
    var flag = 'add';
    // 编辑的行(弹出页面用到)
    $(function () {

        getStreet();
        initButtons();
        getOperator();
        initSearchCase();
        initInsuranceType();
        GetRqNum();
    });
    //获取照护等级字典项
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

    function initButtons() {
        $('#id_add_detail').on('click', function () {
            sjly = '01';
            InitSearch();
            table.bootstrapTable("selectPage", 1);
            table.bootstrapTable("refresh");
            return false;
        });

        $('#id_import_details').on('click', function () {
            sjly = '02';
            InitSearch();
            table.bootstrapTable("selectPage", 1);
            table.bootstrapTable("refresh");
            return false;
        });

        $('#export').on('click', function () {
            table.tableExport({type: 'excel', escape: 'false'});
            return false;
        });

        $('#btn_add').on('click', function () {
            getPersonInfo('add');
            return false;
        });

        $('#btn_query').on('click', function () {
            sjly = '';
            table.bootstrapTable("selectPage", 1);
            table.bootstrapTable("refresh");
            return false;
        });

    }

    function initTable() {
        // 先销毁表格
        table.bootstrapTable('destroy')
                .bootstrapTable(
                        {
                            classes: 'table table-hover warning',
                            method: "get", // 使用get请求到服务器获取数据
                            url: "personal_info.do?action=info_query", // 获取数据的Servlet地址
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
                            uniqueId: "yngrbsh", // 每一行的唯一标识，一般为主键列
                            clickToSelect: true, // 是否启用点击选中行
                            showExport: true,
                            exportDataType: "basic",
                            minimumCountColumns: 2, // 最少允许的列数
                            responseHandler: function (res) {
                                return res;
                            },
                            queryParamsType: "undefined",
                            showPaginationSwitch: false,
                            queryParams: function queryParams(params) {
                                if ($('#rwglListItem').css('display') != 'none') {
                                    return {
                                        currPage: params.pageNumber,
                                        pageSize: params.pageSize,
                                        sjly: sjly,
                                        xm: $("#xm").val().trim(),
                                        sfzh: $("#sfzh").val(),
                                        zhdjs: $('#zhdj').val(),
                                        qyysbm: $("#qyys").val(),
                                        jzdjdbm: $('#street').val(),
                                        ylfyzffsdm: $('#yblb').val(),
                                        zt: $('#zt').val()
                                    };
                                } else {
                                    return {
                                        currPage: params.pageNumber,
                                        pageSize: params.pageSize,
                                        xm: $("#xm").val().trim(),
                                        sfzh: $("#sfzh").val(),
                                        zhdjs: $('#zhdj').val(),
                                        qyysbm: $("#qyys").val(),
                                        jzdjdbm: $('#street').val(),
                                        ylfyzffsdm: $('#yblb').val(),
                                        zt: $('#zt').val()
                                    };
                                }
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
                                    field: 'xbmc',
                                    title: '性别',
                                    align: 'center'
                                },
                                {
                                    field: 'nl',
                                    title: '年龄',
                                    align: 'center',
                                    visible: true
                                },
                                {
                                    field: 'sfzh',
                                    title: '身份证号',
                                    formatter: function (value, row, index) {
                                        if (value) {
                                            if (value.length == 18) {
                                                return (value.substr(0, 3) + '*********' + value.substr(12, 6)).toUpperCase();
                                            } else if (value.length == 15) {
                                                return value.substr(0, 3) + '******' + value.substr(9, 6);
                                            } else {
                                                return value;
                                            }
                                        }
                                    },
                                    align: 'center',
                                    visible: false
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
                                    field: 'xt_djsj',
                                    title: '登记时间',
                                    align: 'center'
                                },
                                {
                                    field: 'sjly',
                                    title: '信息来源',
                                    align: 'center',
                                    formatter: function (value) {
                                        console.log(currEnvir)
                                        if (currEnvir) {
                                            if (value == '03') {
                                                return '筛查';
                                            } else {
                                                return '其他';
                                            }
                                        } else {
                                            if (value == '01') {
                                                return '其他';

                                            } else if (value == '02') {
                                                return '民政';
                                            }
                                        }
                                    }
                                }, {
                                    field: 'yygldjmc',
                                    title: '照护等级',
                                    align: 'center'
                                },
                                {
                                    title: '查看详情',
                                    align: 'center',
                                    events: {
                                        'click .edit_info': function (e, value, row, index) {
                                            getPersonInfo('edit', row, 'show');
                                        }
                                    },
                                    formatter: function (value, row, index) {
                                        return '<a class="edit_info" href="javascript:void(0)"><img src="layouts/img/table/icon_right.png"> 详情</a>';
                                    }
                                },
                                {
                                    field: 'jzdxxdz',
                                    title: '居住地址',
                                    halign: 'center',
                                    align: 'left'
                                }],
                            onLoadSuccess: function () { // 加载成功时执行
                            },
                            onLoadError: function () { // 加载失败时执行

                            },
                            onCheck: function (row) {
                                $("#remove").attr("disabled", false);
                            },
                            onUncheck: function (row) {
                            }
                        });
    }

    // 初始化查询条件
    function InitSearch() {
//        $("#qyys").val(dlRybm);
        $("#xm").val("");
        $("#zhdj").select2().val(null).trigger("change");
        $("#sfzh").val("");
        $('#street').val('').trigger('change');
    }

    function GetRqNum() {
        $.ajax({
            url: 'personal_info.do?action=get_src_count',
            type: "get",
            dataType: "json",
            data: {},
            success: function (data) {
                $('#id_register')[0].innerText = data.xdj;
                $('#id_import')[0].innerText = data.mzdr;
            }
        });
    }

    function getOperator() {
        $.ajax({
            url: 'personal_info.do?action=get_operator',
            type: "get",
            dataType: "json",
            data: {},
            success: function (res) {
                wn.createSelectByCZRYArray($("#qyys"), res);
                dlRybm = res.rybm;
            }
        });
    }

    function getPersonInfo(flag, row, showOrHide) {
        this.flag = flag;
        console.log(row);
        if (row === undefined) {
            row = {};
            row.yngrbsh = '';
        }
        this.showOrHide = showOrHide;
        BootstrapDialog.show({
            title: '个人基本信息管理',
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
                getOperator();
                table.bootstrapTable("refresh");
            }
        });
    }

    function deleteNotSaved() {
        $.ajax({
            url: 'personal_info.do?action=deleteNotSaved',
            type: 'post',
            data: {},
            dataType: 'json',
            success: function (data) {
                console.log('deleteNotSaved');
            }
        });
    }

    function addNewObject() {
        BootstrapDialog.show({
            title: '对象导入',
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('addNewObj.do'),
            buttons: [],
            onshow: function (dialogRef) {
                deleteNotSaved();
            },
            onshown: function (dialogRef) {
                dialog = dialogRef;
            },
            onhide: function (dialogRef) {
            },
            onhidden: function (dialogRef) {
                GetRqNum();
                table.bootstrapTable("refresh");
            }
        })
    }

    function getStreet() {
        $.getJSON('common.do?action=get_street', function (res) {
            $('#street').select2({
                language: 'zh-CN',
                data: res.StreetList,
                allowClear: false,
                multiple: false
            }).val(res.currentStreet).trigger("change");
            currEnvir = res.currEnvironment;
            initTable();
            wnform.addOnresize($('#table'), tableStaus);

            var ztArr_jd = [{'id': '1', 'text': '全部'}, {'id': '2', 'text': '民政'}, {'id': '3', 'text': '其他'}];
            var ztArr_hy = [{'id': '1', 'text': '全部'}, {'id': '2', 'text': '筛查'}, {'id': '3', 'text': '其他'}];
            var ztArr;
            if (currEnvir) {
                ztArr = ztArr_hy;
            } else {
                ztArr = ztArr_jd;
            }
            $('#zt').select2({
                language: 'zh-CN',
                multiple: false,
                data: ztArr
            }).val('1').trigger('change');
        })
    }
</script>
</html>
