<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%--
  Created by IntelliJ IDEA.
  User: Mr.wang
  Date: 2016/10/25
  Time: 17:35
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>耗材选择</title>
</head>
<body>
<div class="panel-body">
    <form method="post" class="form-horizontal list-font">
        <div class="form-group" style="margin:5px 0px 5px 0px;">
            <div class="col-md-6 nopadding">
                <label class="col-md-4 control-label list-row-space">耗材名称：</label>
                <div class="col-md-8 list-row-space">
                    <input type="text" class="form-control input-sm" id="hcmcChoose" placeholder="" maxlength="15">
                </div>
            </div>
            <div class="pull-right list-btnDiv">
                <button id="btn_query_choose" class="btn btn-default btn-sm">
                    查询
                </button>
            </div>
        </div>
        <table id="chooseTable" class="table-container"></table>
    </form>
</div>
</body>
<script>
    $chooseTable = $('#chooseTable');
    var wholeChoose = [];
    $(function () {
        initButtons();
        initPageControl();
    });
    function initPageControl() {
        switch (wholeVar.hczsFlag) {
            case 'reception':
                init4Reception();
                break;
            case 'recover' :
                init4Recover();
                break;
            case 'records' :
                init4Records();
        }
    }

    function init4Reception() {
        wholeChoose.addtitle = '新增领用';
        initChooseLYTable();
        wnform.addOnresize($chooseTable, tableStaus);
    }

    function init4Recover() {
        wholeChoose.addtitle = '新增回收';
        initChooseLYTable();
        wnform.addOnresize($chooseTable, tableStaus);
    }

    function init4Records() {
        initChooseLYTable();
        wnform.addOnresize($chooseTable, tableStaus);
    }

    function doSaveLy() {
        console.log("-------doSaveLy-------")
        wholeVar.selectionsData = $chooseTable.bootstrapTable('getSelections');
        if (wholeVar.selectionsData.length == 0) {
            wnform.toast("请选择耗材！")
        } else {
            if (wholeVar.hczsFlag == 'records') {
                addUseRecordsDetail();
            } else {
                addReception();
            }
        }
    }

    function addUseRecordsDetail() {
        BootstrapDialog.show({
            title: '使用记录明细',
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load("yyhpt_hczs.do?action=toUseMxDetail"),
            buttons: [
                {
                    label: '保存',
                    id: 'save_reception',
                    cssClass: 'btn-default btn-sm',
                    action: function (dialogItself) {
                        doUseDetailSave();
                    }
                },
                {
                    label: '退出',
                    id: 'exit_reception',
                    cssClass: 'btn-default btn-sm',
                    action: function (dialogItself) {
                        dialogItself.close();
                    }
                },
            ],
            onshow: function (dialogRef) {
            },
            onshown: function (dialogRef) {
                dialog = dialogRef;
            },
            onhide: function (dialogRef) {

            },
            onhidden: function (dialogRef) {
                $chooseTable.bootstrapTable("refresh");
            }
        });
    }

    function initChooseLYTable() {
        $chooseTable.bootstrapTable('destroy');
        // 初始化表格,动态从服务器加载数据
        $chooseTable.bootstrapTable(
                {
                    classes: 'table table-hover warning',
                    method: "get", // 使用get请求到服务器获取数据
                    url: "yyhpt_hczs.do?action=list_choose", // 获取数据的Servlet地址
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
                    clickToSelect: true, // 是否启用点击选中行
                    showExport: true,
                    exportDataType: "basic",
                    minimumCountColumns: 2, // 最少允许的列数
                    responseHandler: function (res) {
                        console.info(res);
                        return res;
                    },
                    queryParamsType: "undefined",
                    showPaginationSwitch: false,
                    queryParams: function queryParams(params) { // 设置查询参数
                        var param = {
                            currPage: params.pageNumber,
                            pageSize: params.pageSize,
                            hcmcChoose: $("#hcmcChoose").val().trim()
                        };
                        return param;
                    },
                    columns: [
                        {
                            checkbox: true,
                            align: 'center'
                        },
                        {
                            title: '序号',
                            width: '100px',
                            formatter: function (value, row, index) {
                                return index + 1;
                            },
                            align: 'center'
                        },
                        {
                            field: 'MC',
                            title: '耗材名称',
                            align: 'center',
                            visible: true
                        }],
                    onLoadSuccess: function () { // 加载成功时执行
                    },
                    onLoadError: function () { // 加载失败时执行

                    },
                    onCheck: function (row) {
                    },
                    onUncheck: function (row) {
                    }
                });
    }

    function addReception() {
        BootstrapDialog.show({
            title: wholeChoose.addtitle,
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load("yyhpt_hczs.do?action=init_reception"),
            buttons: [
                {
                    label: '保存',
                    id: 'save_reception',
                    cssClass: 'btn-default btn-sm',
                    action: function (dialogItself) {
                        doReceptionSave();
                    }
                },
                {
                    label: '退出',
                    id: 'exit_reception',
                    cssClass: 'btn-default btn-sm',
                    action: function (dialogItself) {
                        dialogItself.close();
                    }
                },
            ],
            onshow: function (dialogRef) {
            },
            onshown: function (dialogRef) {
                wholeVar._2ndModal = dialogRef;
                dialog = dialogRef;
            },
            onhide: function (dialogRef) {

            },
            onhidden: function (dialogRef) {
                $chooseTable.bootstrapTable("refresh");
            }
        });
    }

    function initButtons() {
        $('#btn_query_choose').on('click', function () {
            $chooseTable.bootstrapTable("selectPage", 1);
            $chooseTable.bootstrapTable("refresh");
            return false;
        })
    }
</script>
</html>
