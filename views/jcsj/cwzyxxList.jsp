<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
</head>
<body>
<div class="page-content">
    <div class="panel-body notopbottom">
        <form id="defaultForm2" method="post" class="form-horizontal"
              onclick="return false;" style="font-size: 13px;">
            <div class="panel-body toolbar" style="margin-top: 5px;">
                <div class="form-group">
                    <div class="pull-right">
                        <button id="add" type="button" class="btn btn-default btn-sm">新增床位信息</button>
                    </div>
                </div>
            </div>
        </form>

    </div>
    <div class="full-height-content full-height-content-scrollable">
        <div class="full-height-content-body">
            <div class="panel-body fullhgtpanel">
                <table id="table" class="table-container"></table>
            </div>
        </div>
    </div>
</div>
<script>
    var dictData;
    var $table = $('#table');
    var flag = 1;
    var editRow;
    function initTable() {
        $table.bootstrapTable('destroy')
                .bootstrapTable(
                        {
                            classes: 'table table-hover warning',
                            method: "get",
                            url: 'yyhpt_jgcwzyxx.do?action=list',
                            contentType: "json",
                            iconSize: 'sm',
                            showHeader: true,
                            striped: true,
                            pagination: true,
                            pageSize: 10,
                            pageNumber: 1,
                            pageList: [2],
                            search: false,
                            showColumns: false,
                            showRefresh: false,
                            onlyInfoPagination: false,
                            sidePagination: "server",
                            uniqueId: "LSH",
                            clickToSelect: true,
                            minimumCountColumns: 2,
                            responseHandler: function (res) {
                                console.log(res)
                                console.log('0000000000000000000000000000')
                                dictData = res;
                                return res;
                            },
                            queryParamsType: "undefined",
                            showPaginationSwitch: false,
                            queryParams: function queryParams(params) { // 设置查询参数
                                var param = {
                                    currPage: params.pageNumber,
                                    pageSize: params.pageSize,
                                    JGMC: $("#qrymc").val()
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
                                    title: '机构名称',
                                    field: 'jgmc'
                                },
                                {
                                    title: '采集日期',
                                    field: 'cjrq'
                                },
                                {
                                    title: '总床位',
                                    field: 'zcw'
                                },
                                {
                                    title: '实际开放总床位',
                                    field: 'kfsjzcw'
                                },
                                {
                                    title: '占用开放总床位',
                                    field: 'kfzyzcw',
                                },
                                {
                                    title: '空余开放总床位',
                                    field: 'kfkyzcw',
                                },
                                {
                                    title: '养老开放总床位',
                                    field: 'ylsjkfzcw',
                                },
                                {
                                    title: '养老占用总床位',
                                    field: 'ylzykfzcw',
                                },
                                {
                                    title: '空余养老总床位',
                                    field: 'ylkyzcw',
                                },
                                {
                                    field: 'operate',
                                    title: '操作',
                                    align: 'center',
                                    width: '100px',
                                    events: operateEvents,
                                    formatter: operateFormatter
                                }
                            ],
                            onLoadSuccess: function () {

                            },
                            onLoadError: function () {

                            },
                            onCheck: function (row) {
                                $("#remove").attr("disabled", false);
                            },
                            onUncheck: function (row) {
                                // alert(row.id);
                            }
                        });

        wnform.addOnresize($table, false);
    }

    function operateFormatter(value, row, index) {
//        if (row.cjrq === (new Date().format('yyyy-MM-dd'))) {
//        } else return '';
            return [
                '<a class="edit" href="javascript:void(0)"  data-toggle="modal" disabled title="修改">',
                '<i class="glyphicon glyphicon-edit"></i>',
                '</a>&nbsp;&nbsp;&nbsp;&nbsp;',
                '<a class="remove" href="javascript:void(0)" title="删除">',
                '<i class="glyphicon glyphicon-remove"></i>', '</a>'].join('');
    }
    window.operateEvents = {
        'click .edit': function (e, value, row, index) {
            modelFunc(row, '修改床位占用信息', 2);
        },
        'click .remove': function (e, value, row, index) {
            deleteData(row, '确认要删除该记录吗?', 2);
        }
    };

    //弹出方法
    modelFunc = function (row, mtitle, mflag) {
        flag = mflag;
        editRow = row;
        BootstrapDialog.show({
            title: mtitle,
            size: BootstrapDialog.SIZE_WIDE,
            data: {
                'data1': dialog_data
            },
            closable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt_jgcwzyxx.do?action=add'),
            buttons: [{
                label: '保存',
                cssClass: 'btn-default btn-sm',
                action: function (dialogItself) {
                    $('#defaultForm').submit();
                }
            }, {
                label: '取消',
                cssClass: 'btn-default btn-sm',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }],
            onshow: function (dialogRef) {
                $('#add').data('dialog', dialogRef)
                        .data('flag', mflag);
            },
            onshown: function (dialogRef) {
                console.log('this is onshown...')
            },
            onhide: function (dialogRef) {
                $(this).removeData("bs.modal");
            },
            onhidden: function (dialogRef) {
                $(this).removeData("bs.modal");
            }
        });
    };
    //删除消息、确认 1= 按钮多选删除 2=操作栏
    deleteData = function (row, mTitle, mFlag) {
        console.info(row);
        BootstrapDialog.confirm({
            title: '提示信息',
            message: mTitle,
            type: BootstrapDialog.TYPE_WARNING,
            closable: true,
            draggable: true,
            btnCancelLabel: '否',
            btnOKLabel: '是',
            callback: function (result) {
                if (result) {
                    var rows;
                    if (mFlag == 2)
                        rows = row.jgbm;
                    else {
                        var objects = $.map($('#table').bootstrapTable(
                                'getSelections'), function (row) {
                            return row.jgbm;
                        });
                        rows = objects.join();
                    }
                    $.ajax({
                        url: "yyhpt_jgcwzyxx.do?action=delete",
                        type: "get",
                        dataType: "json",
                        data: {
                            jgbm: rows,
                            cjrq: row.cjrq
                        },
                        success: function (data) {
                            if (data.code == "T") {
                                wnform.toast(data.message);
                                $table.bootstrapTable('refresh');
                            }
                            else {
                                wnform.toast(data.message);
                            }
                        }
                    });
                } else {
                    return;
                }
            }
        });
    };

    function dataFormatter(value, row, index) {
        return "";
    }

    /**
     * 获取页面高度
     *
     */
    function getHeight() {
        return $(window).height() - 150;
    }

    /**
     * [description] bootstrap-table 高度自适应
     */
    $(window).resize(function () {
        $table.bootstrapTable('resetWidth');

        var b = jQuery(window).width();

        if (b <= 600) {
            $table.bootstrapTable("toggleView");
        }
    });

    var dialog_data = 'Orange';
    /**
     * [description] 初始化页面 事件注册
     */
    $(function () {
        /**
         * [description] 绑定点击事件
         */
        $("#add").bind("click", function () {
            modelFunc(null, '新增床位占用信息', 1);
        });

        $("#more").bind("click", function () {
            MoreBind();
        });
        $('input, textarea').placeholder();
        initTable();

    });


    $('#remove').on('click', function () {
        /**
         * [selectedRows description] bootstrap-table 获取已选择的行数
         */
        var selectedRows = $('#table').bootstrapTable('getSelections');
        if (selectedRows.length == 0) {
            /**
             * [action description] bootstrap-dialog 提示信息
             */
            BootstrapDialog.show({
                title: '提示信息',
                message: '请选择要操作的数据!',
                buttons: [{
                    label: '确定',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });
            return;
        }
        deleteData(null, '确认要删除选中记录吗?', 1);
    });

    $(function () {

        $('#btn_query').on('click', function () {
            $table.bootstrapTable("refresh");
        });

        $('#mobile').on('click', function () {
            $table.bootstrapTable("toggleView");
        });
    });

    setTimeout(function () {
        $table.bootstrapTable('resetView');
    }, 200);


</script>
</body>
</html>