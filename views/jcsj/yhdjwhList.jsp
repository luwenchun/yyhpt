<%--
  Created by IntelliJ IDEA.
  User: Mr.Wang
  Date: 2016/9/3
  Time: 15:05
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>养护等级维护</title>
</head>
<body>
<div class="page-content">
    <div class="panel-body notopbottom">
        <form id="defaultForm2" method="post" class="form-horizontal"
              onclick="return false;" style="font-size: 13px;">
            <div class="panel-body toolbar" style="margin-top: 5px;">
                <div class="form-group">
                    <div class="pull-left hidden">
                        <div class="input-group  input-group-sm" style="width: 230px;">
                            <input type="text" class="form-control input-sm " id="qrymc"
                                   placeholder="养护等级"> <span class="input-group-btn">
								<button id="btn_query" class="btn btn-default btn-flat btn-sm "
                                        type="submit">
									<i class="fa fa-search"></i>
								</button>
							</span>
                        </div>
                    </div>
                    <div class="pull-right">
                        <button id="add" class="btn btn-default btn-sm">新增养护等级</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="full-height-content full-height-content-scrollable">
        <div class="full-height-content-body">
            <div class="panel-body fullhgtpanel">
                <table id="table" class="table-container">
                </table>
            </div>
        </div>
    </div>
</div>
<script>
var $table = $('#table');
var dialog_data = 'Orange';
    function  initTable() {
        $table.bootstrapTable('destroy');
        $table.bootstrapTable({
            classes: 'table table-hover warning',
            method: 'get',      //使用get请求到服务器获取数据
            url: 'yyhpt_yhdjwh.do?action=list',
            contentType: 'application/json',
            iconSize: 'sm',
            showHeader: true,
            striped: true,      //表格显示条纹
            pagination: true,   //启动分页
            pageSize: 10,       //每页显示的记录数
            pageNumber: 1,      //当前第几页
            pageList: [2],      //记录数可选列表
            search: false,      //是否启用查询
            showColumns: false, //显示下拉框勾选要显示的列
            showRefresh: false, //显示刷新按钮
            onlyInfoPagination: false,
            sidePagination: 'server', //表示服务端请求
            uniqueId: 'GLDJDM',       //每一行的唯一标识，一般为主键列
            clickToSelect: false,     //是否启用点击选中行
            showExport: true,
            exportDataType: 'basic',
            minimumCountColumns: 2,   //最少允许的列数
            responseHandler: function (res) {
                dictData = res;
                return res;
            },
            queryParamsType: 'undefined',
            showPaginationSwitch: false,
            queryParams: function queryParams(params) {//设置查询参数
                var param = {
                    currPage: params.pageNumber,
                    pageSize: params.pageSize,
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
                    field: 'gldjdm',
                    title: '养护管理等级代码',
                    align: 'center'
                },
                {
                    field: 'gldjmc',
                    title: '管理等级名称',
                    align: 'center'
                },
                {
                    field: 'pcdm',
                    title: '服务频次代码',
                    align: 'center'
                },
                {
                    field: 'pcmc',
                    title: '服务频次名称',
                    align: 'center'
                },
                {
                    field: 'operate',
                    title: '操作',
                    align: 'center',
                    width: '100px',
                    events: operateEvents,
                    formatter: operateFormatter
                }],
            onLoadSuccess: function () {    // 加载成功时执行
                
            },
            onLoadError: function () {      // 加载失败时执行
                
            },
            onCheck: function (row) {
                $('#remove').attr('disabled', false);
            },
            onUncheck: function (row) {

            }
        });
    }

    function operateFormatter(value, row, index) {
        return [
            '<a class="edit" href="javascript:void(0)"  data-toggle="modal" disabled title="修改">',
            '<i class="glyphicon glyphicon-edit"></i>',
            '</a>&nbsp;&nbsp;&nbsp;&nbsp;',
            '<a class="remove" href="javascript:void(0)" title="删除">',
            '<i class="glyphicon glyphicon-remove"></i>', '</a>' ].join('');
    }
    window.operateEvents = {
        'click .edit' : function (e, value, row, index) {
            modelFunc(row, '修改养护等级信息', 2);
        },
        'click .remove' : function (e, value, row, index) {
            deleteData(row, '确认要删除该记录吗?', 2);
        }
    };

    modelFunc = function (row, mtitle, mflag) {
        BootstrapDialog.show({
            title: mtitle,
            size: BootstrapDialog.SIZE_WIDE,
            data: {
                'data1': dialog_data,
            },
            closable : true,
            closeBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/jcsj/yhdjwhDetail.jsp'),
            buttons: [{
                label : '保存',
                cssClass : 'btn-default btn-sm',
                action : function (dialogItself) {
                    console.log('===================')
                    saveForm.init(dialogItself, mflag);
                    $('#defaultForm').submit();
                }
            }, {
                label:'取消',
                cssClass:'btn-default btn-sm',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }],
            onshow: function (dialogRef) {

            },
            onshown: function (dialogRef) {
                if (mflag == 2)
                    setControlValue(row);
            },
            onhide: function (dialogRef) {
                $(this).removeData("bs.modal");
            },
            onhidden: function (dialogRef) {
                $(this).removeData("bs.modal");
            }
        });
    }
    function setControlValue(row) {
        wn.setformEdit(row);
    }
    deleteData = function (row, mTitle, mFlag) {
        BootstrapDialog.confirm({
            title: '提示信息',
            message: mTitle,
            type: BootstrapDialog.TYPE_WARNING,
            closable: true,
            draggable : true,
            btnCancelLabel: '否',
            btnOKLabel: '是',
            callback: function (result) {
                $.ajax({
                    url: 'yyhpt_yhdjwh.do?action=delete',
                    type: 'get',
                    dataType: 'json',
                    data: {gldjdm: row.gldjdm},
                    success: function (data) {
                        if (data.code == 'T') {
                            wnform.toast(data.message);
                            $table.bootstrapTable('refresh');
                        } else {
                            wnform.toast(data.message);
                        }
                    }
                });
            }
        });
    }

    $(function () {
        $("#add").bind("click", function () {
            modelFunc(null, '新增养护等级信息', 1);
        });
        $('#btn_query').on('click', function() {
            $table.bootstrapTable("refresh");
        });
        initTable();
    });

    document.onkeydown = function (event) {
        var target, code, tag;
        if (!event) {
            event = window.event; //针对ie浏览器
            target = event.srcElement;
            code = event.keyCode;
            if (code == 13) {
                tag = target.tagName;
                if (tag == "TEXTAREA") {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        else {
            target = event.target; //针对遵循w3c标准的浏览器，如Firefox
            code = event.keyCode;
            if (code == 13) {
                tag = target.tagName;
                if (tag == "INPUT") {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    };
</script>
</body>
</html>
