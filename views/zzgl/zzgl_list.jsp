<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%--
  Created by IntelliJ IDEA.
  User: Edward
  Date: 2016/08/24
  Time: 15:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>中止管理</title>
</head>
<body>
<div class="panel-body">
    <div class="panel panel-default">
        <div class="panel-heading" style="font-size:16px;color:#434343;font-weight:bold;">
            <span class="glyphicon glyphicon-th"></span> 中止管理列表
        </div>

        <div class="form-group" style="margin:5px 0px 5px 0px;">
            <label class="col-md-1 control-label" style="text-align: right;margin-top: 5px">姓名:</label>
            <div class="col-md-2">
                <input type="text" class="form-control input-sm" id="xm" placeholder=""
                       maxlength="15">
            </div>

            <%--<label class="col-md-2 col-sm-12  control-label" style="margin-top: 5px;text-align: right;">身份证号：</label>
            <div class="col-md-3">
                <input type="text" class="form-control input-sm" id="sfzh" placeholder=""
                       maxlength="18">
            </div>--%>

            <div style="display: none">
                <label class="col-md-1 control-label">登记人员：</label>
                <div class="col-md-2">
                    <select class="form-control input-sm" name="qyys" id="qyys">
                    </select>
                </div>
            </div>
            <div class="pull-right list-btnDiv" id="rwglList_btnDiv">
                <button id="btn_query" class="btn btn-default btn-sm">
                    查询
                </button>
                <button class="btn btn-default btn-sm" id="id_add" type="button">新增
                </button>
                <button id="export" class="btn btn-default btn-sm">
                    导出
                </button>
                <button id="more" class="btn btn-default btn-sm" style="display: none">
                    更多
                </button>
            </div>
        </div>
        <table id="table_main" class="table-container"></table>
    </div>
</div>
<script>
    var table = $('#table_main');
    var dialog;
    var mainSelectedRow;
    var selects = '';

    $(function () {

        initButtons();
        initTable();
    });

    function initButtons() {

        $('#id_add').on('click', function () {
            mainSelectedRow = null;
//            pauseApply();
            selectPauseApply();
        });

        $('#export').on('click', function () {
            table.tableExport({type: 'excel', escape: 'false'});
            return false;
        });

        $('#btn_query').on('click', function () {
            table.bootstrapTable("selectPage", 1);
            table.bootstrapTable("refresh");
            return false;
        });
    }
    function initTable() {
        table.bootstrapTable('destroy');
        table.bootstrapTable(
                {
                    classes: 'table table-hover warning',
                    method: "get", // 使用get请求到服务器获取数据
                    url: "yyhpt_zzgl.do?action=get_list", // 获取数据的Servlet地址
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
                    uniqueId: "sfzh", // 每一行的唯一标识，一般为主键列
                    clickToSelect: true, // 是否启用点击选中行
                    showExport: true,
                    exportDataType: "basic",
                    minimumCountColumns: 2, // 最少允许的列数
                    responseHandler: function (res) {
                        return res;
                    },
                    queryParamsType: "undefined",
                    showPaginationSwitch: false,
                    queryParams: function queryParams(params) { // 设置查询参数
                        var param = {
                            currPage: params.pageNumber,
                            pageSize: params.pageSize,
                            xm: $("#xm").val(),
                            sfzh: $("#sfzh").val()
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
                            field: 'xm',
                            title: '姓名',
                            align: 'center'
                        }, {
                            field: 'xbmc',
                            title: '性别',
                            align: 'center',
                            visible: true
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
                                        return value.substr(0, 3) + '*********' + value.substr(12, 6);
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
                            field: 'lxdh',
                            title: '联系电话',
                            align: 'center'
                        },
                        {
                            field: 'sqrq',
                            title: '中止申请',
                            align: 'center',
                            events: {
                                'click .edit_info': function (e, value, row, index) {
                                    mainSelectedRow = row;
                                    pauseApply();
                                }
                            },
                            formatter: function (value, row, index) {
                                if (value) {
                                    return '<a class="edit_info" href="javascript:void(0)"><img src="layouts/img/table/icon_select.png"> ' + value + '</a>';
                                }
                            }
                        }, {
                            field: 'shrq',
                            title: '中止审核',
                            align: 'center',
                            events: {
                                'click .info_review': function (e, value, row, index) {
                                    mainSelectedRow = row;
                                    pauseReview();
                                }
                            },
                            formatter: function (value, row, index) {
                                var option = '（审核中）';
                                if (row.shzt === '1') {
                                    option = '（审核通过）';
                                } else {
                                    option = '（审核不通过）';
                                }
                                if (value) {
                                    if(option == '（审核不通过）'){
                                        return '<a class="info_review" href="javascript:void(0)"  > <img src="layouts/img/table/icon_disAgree.png"> ' + value + '<a/>';
                                    }else{
                                        return '<a class="info_review" href="javascript:void(0)"><img src="layouts/img/table/icon_select.png"> ' + value + '</a>';
                                    }
                                } else {
                                    return '<a class="info_review" href="javascript:void(0)"  > <img src="layouts/img/table/icon_del.png"> 中止审核<a/>';
                                }
                            }
                        }, {
                            field: 'jcrq',
                            title: '解除中止',
                            align: 'center',
                            events: {
                                'click .rollback': function (e, value, row, index) {
                                    if (!value) {
                                        if (row.shzt === '1') {
                                            cancelPause(row);
                                        } else {
                                            wnform.toast('未审核或者审核未通过！');
                                        }
                                    } else {
                                        wnform.toast('已经解除中止！');
                                    }
                                }
                            },
                            formatter: function (value, row, index) {
                                if (value) {
                                    return '<a class="rollback" href="javascript:void(0)"><img src="layouts/img/table/icon_select.png"> ' + value + '</a>';
                                } else {
                                    return '<a class="rollback" href="javascript:void(0)"  > <img src="layouts/img/table/icon_del.png"> 解除中止<a/>';
                                }
                            }
                        }, {
                            title: '操作',
                            align: 'center',
                            events: {
                                'click .edit_info': function (e, value, row, index) {
                                    deleteApply(row);
                                }
                            },
                            formatter: function (value, row, index) {
                                if (row.shrq && row.shzt === '1') {
                                } else {
                                    return '<a class="edit_info" href="javascript:void(0)"><img src="layouts/img/table/icon_deldata.png"> 删除</a>';
                                }
                            }

                        }, {
                            field: 'jzdz',
                            title: '居住地址'
                        }
                    ],
                    onLoadSuccess: function () { // 加载成功时执行
                        wnform.addOnresize(table, false);
                    },
                    onLoadError: function () { // 加载失败时执行
                    },
                    onCheck: function (row) {
                    },
                    onUncheck: function (row) {
                    }
                });
    }

    function pauseApply() {
        BootstrapDialog.show({
            title: '中止申请',
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/zzgl/zzsq_detail.jsp'),
            buttons: [{
                id: 'id_apply_save',
                label: '保存',
                cssClass: 'btn-default btn-sm',
                action: function (dialog) {
                    doSave();
                }
            },
                {
                    label: '退出',
                    cssClass: 'btn-default btn-sm',
                    action: function (dialog) {
                        dialog.close();
                    }
                }],
            onshow: function (dialogRef) {
                dialog = dialogRef;
            },
            onshown: function (dialogRef) {
                /*新增时不显示保存按钮*/
                if ((mainSelectedRow == null )) {
                    $("#id_apply_save").hide();
                } else if (mainSelectedRow.shzt === '1') {
                    /*审核通过时不可以修改，审核不通过仍可以修改*/
                    $("#id_apply_save").hide();
                    $('#id_apply_date').prop('disabled', true);
                    $('#sqrgh').prop('disabled', true);
                    $('#id_pause_reason').find('input:radio').prop('disabled', true);
                }
                if (selects.length > 0) {
                    $("#id_apply_save").show();
                    selectedRow = selects[0];
                    setPersonInfo(selectedRow);
                    showApplyInfo();
                }

            },
            onhide: function (dialogRef) {

            },
            onhidden: function (dialogRef) {
                table.bootstrapTable("refresh");
            }
        });
    }

    function selectPauseApply() {
        selects = '';
        BootstrapDialog.show({
            title: '',
            size: BootstrapDialog.SIZE_LARGE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/zzgl/patient_select.jsp'),
            buttons: [
                {
                    label: '确定',
                    cssClass: 'btn-default btn-sm',
                    action: function (dialog) {
                        selects = $("#table_patient").bootstrapTable('getSelections');
                        dialog.close();
                    }
                }, {
                    label: '退出', cssClass: 'btn-default btn-sm',
                    action: function (dialogItself) {
                        dialogItself.close();
                    }
                }
            ],
            onshow: function (dialogRef) {
                console.log('onshow');
            },
            onshown: function (dialogRef) {
                console.log('onshown');
            },
            onhide: function (dialogRef) {

            },
            onhidden: function (dialogRef) {
                table.bootstrapTable("refresh");
                if (selects.length > 0) {
                    pauseApply();
                }
            }
        });
    }

    function pauseReview() {
        BootstrapDialog.show({
            title: '中止审核',
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/zzgl/zzsh_detail.jsp'),
            buttons: [{
                id: 'id_review_save',
                label: '保存',
                cssClass: 'btn-default btn-sm',
                action: function (dialog) {
                    doSaveReview();
                }
            }, {
                label: '退出',
                cssClass: 'btn-default btn-sm',
                action: function (dialog) {
                    dialog.close();
                }
            }],
            onshow: function (dialogRef) {
                dialog = dialogRef;
            },
            onshown: function (dialogRef) {

                if (mainSelectedRow.jcrq) {
                    $("#id_review_save").hide();
                    $('#id_review_result').find('input:radio').prop('disabled', true);
                    $('#shrgh').prop('disabled', true);
                    $('#id_review_date').prop('disabled', true)
                }
            },
            onhide: function (dialogRef) {

            },
            onhidden: function (dialogRef) {
                table.bootstrapTable("refresh");
            }
        });
    }

    function cancelPause(row) {
        var html = "确定要撤销中止吗？";
        BootstrapDialog.show({
            title: '提醒',
            size: BootstrapDialog.SIZE_SMALL,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: html,
            buttons: [
                {
//                id: 'id_review_save',
                    label: '确定',
                    cssClass: 'btn-default btn-sm',
                    action: function (dialog) {
                        $.ajax({
                            url: 'yyhpt_zzgl.do?action=cancelPause',
                            type: "post",
                            dataType: "json",
                            data: {
                                jalsh: row.jalsh,
                                djlsh: row.djlsh,
                                yngrbsh: row.yngrbsh
                            },
                            success: function (data) {
                                console.log('success');
                                console.log(data);
                                if (data.code == "T") {
                                    wnform.toast(data.message);
                                    dialog.close();
                                }
                                else {
                                    wnform.toast(data.message);
                                    console.log(data.message)
                                }
                            }
                        });
                    }
                }, {
                    label: '取消',
                    cssClass: 'btn-default btn-sm',
                    action: function (dialog) {
                        dialog.close();
                    }
                }],
            onshow: function (dialogRef) {
                dialog = dialogRef;
            },
            onshown: function (dialogRef) {

            },
            onhide: function (dialogRef) {

            },
            onhidden: function (dialogRef) {
                table.bootstrapTable("refresh");
            }
        });
    }

    function deleteApply(row) {

        $.getJSON('yyhpt_zzgl.do?action=do_delete', {jalsh: row.jalsh}, function (data) {
            wnform.toast(data.message);
            if (data.code === "T") {
                table.bootstrapTable("refresh");
            }
        })
    }

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
</body>
</html>
