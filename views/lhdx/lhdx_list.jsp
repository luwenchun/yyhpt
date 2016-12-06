<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<link href="layouts/css/white/list_select2.css" rel="stylesheet">
<link href="layouts/css/white/list_page.css" rel="stylesheet">
<script src="frame/plugins/counterup/jquery.waypoints.min.js"></script>
<script src="frame/plugins/counterup/jquery.counterup.js"></script>
<div class="panel-body">
    <form method="post" class="form-horizontal list-font">
        <div class="row">
            <div class="col-lg-4 col-md-4" id="firstDiv">
                <div class="panel list-panel-border">
                    <div class="panel-heading list-panel-head">
                        <div class="row">
                            <div class="col-xs-2 col-md-2 panel-bg-turquoise list-title-left-col">
                                <span class="list-title">通道<br/>评估
                                </span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col" id="block1">
                                <div class="col-md-6 col-xs-6 block-half-left block-select">
                                    <span class="list-title-space list-title-statu"
                                    >
                                    <span id="id_not_evaluated" class="list-title-turquoise counter"
                                    >0</span>
                                    <span>待评估</span>
                                </span></div>
                                <div class="col-md-6 col-xs-6 block-half-right">
                                        <span class="list-title-space list-title-statu">
                                    <span id="id_evaluated" class="list-title-num list-title-turquoise counter"
                                    >0</span> <span>已评估</span>
                                </span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4">
                <div class="panel list-panel-border-green">
                    <div class="panel-heading list-panel-head">
                        <div class="row">
                            <div class="col-xs-2 col-md-2 panel-bg-green list-title-left-col">
                                <span class="list-title">评估<br/>审核</span>
                            </div>


                            <div class="col-xs-10 col-md-10 list-title-middel-col" id="block2">
                                <div class="col-md-6 col-xs-6 block-half-left">
                                   <span class="list-title-space list-title-statu"
                                   >
                                    <span id="id_not_reviewed" class="list-title-green counter"
                                    >0</span>
                                    <span>待审核</span>
                                </span></div>
                                <div class="col-md-6 col-xs-6 block-half-right">
                                        <span class="list-title-space list-title-statu">
                                    <span id="id_is_waiting" class="list-title-green counter"
                                    >0</span> <span>轮候中</span>
                                </span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4">
                <div class="panel list-panel-border-gray">
                    <div class="panel-heading list-panel-head">
                        <div class="row">
                            <div class="col-xs-2 col-md-2 panel-bg-gray list-title-left-col">
                                <span class="list-title">入住<br/>情况
                                </span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col" id="block3">
                                <div class="col-md-6 col-xs-6 block-half-left">
                                    <span class="list-title-space list-title-statu"
                                    >
                                    <span id="id_moved_in" class="list-title-statu counter"
                                    >0</span>
                                    <span>已入住</span>
                                </span></div>
                                <div class="col-md-6 col-xs-6 block-half-right">
                                        <span class="list-title-space list-title-statu">
                                    <span id="id_give_up" class="list-title-num list-title-statu counter"
                                    >0</span> <span>已放弃</span>
                                </span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading" style="font-size:16px;color:#434343;font-weight:bold;">
                <span class="glyphicon glyphicon-th"></span> 轮候对象列表
            </div>

            <div class="form-group" style="margin:5px 0 5px 0;">
                <label class="col-md-1 control-label">姓名:</label>
                <div class="col-md-2">
                    <input type="text" class="form-control input-sm" id="xm"
                           placeholder="" maxlength="15">
                </div>

                <div>
                    <label class="col-md-1 control-label">街镇：</label>
                    <div class="col-md-2">
                        <select class="form-control input-sm" name="street" id="street">
                            <option value="">---所有街镇---</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="col-md-1 control-label">状态：</label>
                    <div class="col-md-2">
                        <select id="lhzt" class="form-control input-sm"></select>
                    </div>
                </div>

                <div class="pull-right list-btnDiv" id="rwglList_btnDiv">
                    <button id="btn_query" class="btn btn-default btn-sm">
                        查询
                    </button>
                    <button id="export" class="btn btn-default btn-sm">
                        导出
                    </button>
                </div>
            </div>
            <table id="table" class="table-container"></table>
        </div>
    </form>
    <div id="toolbar"></div>
</div>
<script>
    //轮候状态
    var lhztArray = [{id: '7', text: "全部"}, {id: '0', text: '待评估'}, {id: '1', text: '已评估'},{id: '2', text: '待审核'},
        {id: '3', text: '审核不通过'},{id: '4', text: '轮候中'},{id: '5', text: '已入住'}, {id: '6', text: '已放弃'}];
    //查询状态条件
    var flagLhzt = '';
    $(function () {
        var $table = $('#table'),
                lcdm = ['01'], lhztdm = ['0', '1', '2'];

        var getStreet = function () {
            $.getJSON('common.do?action=get_street', function (res) {
                $('#street').select2({
                    language: 'zh-CN',
                    data: res.StreetList,
                    allowClear: false,
                    multiple: false
                }).val(res.currentStreet).trigger("change");
            })
        };

        var initLhzt=function () {
            $('#lhzt').select2({
                language: 'zh-CN',
                placeholder: "请选择查询状态",
                multiple: true,
                data: lhztArray
            }).val(["0"]).trigger("change")
                    .on('change', function () {
                        if($('#lhzt').val()){
                            if ($('#lhzt').val()[0] == '7') {
                                $('#lhzt').val(["0","1", "2", "3", "4", "5", "6"]).trigger("change");
                            }
                        }
                    });
        };

        var getBlockNumber = function () {
            $.getJSON('yyhpt_lhdx.do?action=get_block_number', function (res) {
                displayNumberOfBlock($('#block1'), $('#id_not_evaluated'), $('#id_evaluated'), res.one1, res.one2);
                displayNumberOfBlock($('#block2'), $('#id_not_reviewed'), $('#id_is_waiting'), res.two1, res.two2);
                displayNumberOfBlock($('#block3'), $('#id_moved_in'), $('#id_give_up'), res.three1, res.three2);
                $('.counter').counterUp();
            })
        };

        var evaluate = function () {
            BootstrapDialog.show({
                title: '通道评估',
                size: BootstrapDialog.SIZE_WIDE,
                closable: true,
                draggable: true,
                closeByBackdrop: false,
                closeByKeyboard: false,
                message: $('<div></div>').load('yyhpt/views/lhdx/lhdx_evaluate.jsp'),
                buttons: [
                    {
                        id: 'btn_save',
                        label: '保存',
                        cssClass: 'btn-default btn-sm',
                        action: function (dialog) {
                            try {
                                doSave()
                                        .then(function (data) {
                                            if (data.code == "T") {
                                                wnform.toast(data.message);
                                                dialog.close();
                                                $table.bootstrapTable("refresh");
                                                getBlockNumber();
                                            }
                                            else {
                                                wnform.toast(data.message);
                                            }
                                        }, function (error) {
                                            wnform.toast(error);
                                        })
                            } catch (e) {
                                console.log(e);
                            }


                        }
                    },
                    {
                        label: '退出',
                        cssClass: 'btn-default btn-sm',
                        action: function (dialog) {
                            dialog.close();
                        }
                    }
                ],
                onshow: function (dialogRef) {
                },
                onshown: function (dialogRef) {
                },
                onhide: function (dialogRef) {

                },
                onhidden: function (dialogRef) {
                }
            });
        };

        var showQueueInfo = function (data) {
            var html = '<h4 class="queue-info">总排位：<span>' + data.zpwh + '</span>号</h4><br><h4 class="queue-info">通道排位：<span>' + data.tdlxmc + data.tdlxdm + data.tdpwh + '</span>号</h4>';
            BootstrapDialog.show({
                title: '',
                size: BootstrapDialog.SIZE_SMALL,
                closable: true,
                draggable: true,
                closeByBackdrop: false,
                closeByKeyboard: false,
                message: html,
                buttons: [],
                onshow: function (dialogRef) {
                },
                onshown: function (dialogRef) {
                },
                onhide: function (dialogRef) {

                },
                onhidden: function (dialogRef) {
                }
            });
        };

        var review = function () {
            BootstrapDialog.show({
                title: '评估审核',
                size: BootstrapDialog.SIZE_WIDE,
                closable: true,
                draggable: true,
                closeByBackdrop: false,
                closeByKeyboard: false,
                message: $('<div></div>').load('yyhpt/views/lhdx/lhdx_evaluate_review.jsp'),
                buttons: [
                    {
                        id: 'btn_save',
                        label: '保存',
                        cssClass: 'btn-default btn-sm',
                        action: function (dialog) {
                            doSave()
                                    .then(function (res) {
                                        if (res.data.code == "T") {
                                            wnform.toast(res.data.message);
                                            dialog.close();
                                            $table.bootstrapTable("refresh");
                                            getBlockNumber();
                                            if (res.shzt === '1') {
                                                showQueueInfo(res);
                                            }
                                        }
                                        else {
                                            wnform.toast(res.data.message);
                                        }
                                    })
                        }
                    },
                    {
                        label: '退出',
                        cssClass: 'btn-default btn-sm',
                        action: function (dialog) {
                            dialog.close();
                        }
                    }
                ],
                onshow: function (dialogRef) {
                },
                onshown: function (dialogRef) {
                },
                onhide: function (dialogRef) {

                },
                onhidden: function (dialogRef) {
                }
            });
        };

        var getParams=function (params) {
            //查询状态条件
            flagLhzt = '';

            if ($('#lhzt').val()) {
                if ($('#lhzt').val().length == 7) {
                    flagLhzt = '3';
                }
            }
        };

        var initTable = function () {

            $table.bootstrapTable('destroy')
                    .bootstrapTable({
                        classes: 'table table-hover warning',
                        method: "get", // 使用get请求到服务器获取数据
                        url: "yyhpt_lhdx.do?action=get_list", // 获取数据的Servlet地址
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
                            getParams(params);
                            return {
                                currPage: params.pageNumber,
                                pageSize: params.pageSize,
                                xm: $("#xm").val().trim(),
                                jzdjdbm: $('#street').val(),
                                lcdm: JSON.stringify(lcdm),
                                lhztdm: JSON.stringify(lhztdm),
                                flagLhzt:flagLhzt,
                                lhzt:$('#lhzt').val()
                            };
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
                                align: 'center'
                            },
                            {
                                field: 'sqsj',
                                title: '申请时间',
                                align: 'center'
                            },
                            {
                                field: 'jzdxxdz',
                                title: '户籍地址'
                            },
                            {
                                field: 'jzdxxdz',
                                title: '居住地址'
                            },
                            {
                                field: 'tdlxdm',
                                title: '通道评估',
                                align: 'center',
                                formatter: function (value, row) {
                                    var name = '通道评估', classs = '';
                                    var dlxhInfo = '';
                                    dlxhInfo = (row.dlxh == null ? '' : row.dlxh);
                                    classs = row.tdpwh ? ' edit_info_blue' : classs;
                                    if (value) {

                                        if (value === 'A') {
                                            name = '特殊保障通道' + dlxhInfo;
                                        } else if (value === 'B') {
                                            name = '优先轮候通道' + dlxhInfo;
                                        } else {
                                            name = '普通轮候通道' + dlxhInfo;
                                        }

//                                        if (value === 'A') {
//                                            name = '特殊保障通道A' + (row.tdpwh ? ('(' + row.tdpwh + ')') : '');
//                                        } else if (value === 'B') {
//                                            name = '优先轮候通道B' + (row.tdpwh ? ('(' + row.tdpwh + ')') : '');
//                                        } else {
//                                            name = '普通轮候通道C' + (row.tdpwh ? ('(' + row.tdpwh + ')') : '');
//                                        }
                                        return '<a class="edit_info' + classs + '" href="javascript:void(0)"><img src="layouts/img/table/icon_select.png"> ' + name + '</a>';
                                    } else {
                                        return '<a class="edit_info' + classs + '" href="javascript:void(0)"><img src="layouts/img/table/icon_add.png"> ' + name + '</a>';
                                    }
                                },
                                events: {
                                    'click .edit_info': function (e, value, row, index) {
                                        $('#btn_query').data('row', row);
                                        evaluate();
                                    }
                                }
                            },
                            {
                                field: 'shzt',
                                title: '通道审核',
                                align: 'center',
                                events: {
                                    'click .edit_info': function (e, value, row, index) {
                                        $('#btn_query').data('row', row);
                                        review();
                                    }
                                },
                                formatter: function (value, row, index) {
                                    var name = '审核', classs = '';
                                    if (row.tdlxdm) {
                                        switch (value) {
                                            case '0':
                                                return '<a class="edit_info' + classs + '" href="javascript:void(0)"><img src="layouts/img/table/icon_add.png">' + name + '</a>';
                                            case '1':
                                                name = '总排位' + (row.zpwh ? ('(' + row.zpwh + ')') : '');
                                                classs = row.zpwh ? ' edit_info_blue' : classs;
                                                break;
                                            case '2':
                                                name = '审核不通过';
                                                break;
                                        }
                                        return '<a class="edit_info' + classs + '" href="javascript:void(0)"><img src="layouts/img/table/icon_select.png">' + name + '</a>';
                                    }
                                }
                            }
                        ]
                    });

            wnform.addOnresize($table, false);
        };

        var initButtons = function () {
            $('#id_not_evaluated').parent().parent().on('click', function () {
                $('#street').val(null).trigger('change');
                $('#lhzt').select2().val(null).trigger("change");
                $('#xm').val('');
                lcdm = ['01'];
                lhztdm = ['0', '1', '2'];
                $('.list-title-space').parent().removeClass('block-select');
                $(this).addClass('block-select');
                $table.bootstrapTable("selectPage", 1);
                $table.bootstrapTable("refresh");
                $('#lhzt').val(["0"]).trigger("change");
                return false;
            });
            $('#id_evaluated').parent().parent().on('click', function () {
                $('#street').val(null).trigger('change');
                $('#lhzt').select2().val(null).trigger("change");
                $('#xm').val('');
                lcdm = ['02', '03', '04', '05', '06', '07'];
                lhztdm = ['0', '1', '2'];
                $('.list-title-space').parent().removeClass('block-select');
                $(this).addClass('block-select');
                $table.bootstrapTable("selectPage", 1);
                $table.bootstrapTable("refresh");
                $('#lhzt').val(["1"]).trigger("change");
                return false;
            });
            $('#id_not_reviewed').parent().parent().on('click', function () {
                $('#street').val(null).trigger('change');
                $('#lhzt').select2().val(null).trigger("change");
                $('#xm').val('');
                lcdm = ['02'];
                lhztdm = ['0', '1', '2'];
                $('.list-title-space').parent().removeClass('block-select');
                $(this).addClass('block-select');
                $table.bootstrapTable("selectPage", 1);
                $table.bootstrapTable("refresh");
                $('#lhzt').val(["2"]).trigger("change");
                return false;
            });
            $('#id_is_waiting').parent().parent().on('click', function () {
                $('#street').val(null).trigger('change');
                $('#lhzt').select2().val(null).trigger("change");
                $('#xm').val('');
                lcdm = ['03', '05', '06', '07'];
                lhztdm = ['0'];
                $('.list-title-space').parent().removeClass('block-select');
                $(this).addClass('block-select');
                $table.bootstrapTable("selectPage", 1);
                $table.bootstrapTable("refresh");
                $('#lhzt').val(["4"]).trigger("change");
                return false;
            });
            $('#id_moved_in').parent().parent().on('click', function () {
                $('#street').val(null).trigger('change');
                $('#lhzt').select2().val(null).trigger("change");
                $('#xm').val('');
                lcdm = ['03', '05', '06', '07'];
                lhztdm = ['1'];
                $('.list-title-space').parent().removeClass('block-select');
                $(this).addClass('block-select');
                $table.bootstrapTable("selectPage", 1);
                $table.bootstrapTable("refresh");
                $('#lhzt').val(["5"]).trigger("change");
                return false;
            });
            $('#id_give_up').parent().parent().on('click', function () {
                $('#street').val(null).trigger('change');
                $('#lhzt').select2().val(null).trigger("change");
                $('#xm').val('');
                lcdm = ['03', '05', '06', '07'];
                lhztdm = ['2'];
                $('.list-title-space').parent().removeClass('block-select');
                $(this).addClass('block-select');
                $table.bootstrapTable("selectPage", 1);
                $table.bootstrapTable("refresh");
                $('#lhzt').val(["6"]).trigger("change");
                return false;
            });

            $('#export').on('click', function () {
                $table.tableExport({type: 'excel', escape: 'false'});
                return false;
            });

            $('#btn_query').on('click', function () {
                lcdm = ['01', '02', '03', '04', '05', '06', '07'];
                lhztdm = ['0', '1', '2'];
                $('.list-title-space').parent().removeClass('block-select');
                $table.bootstrapTable("selectPage", 1);
                $table.bootstrapTable("refresh");
                return false;
            });
        };

        getStreet();
        initLhzt();
        getBlockNumber();
        initTable();
        initButtons()
    })
</script>
