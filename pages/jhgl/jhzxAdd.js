var newobjXmInfo;
$(function () {
    $("#jhsh_sure").bind("click", function () {
        var rows = $('#fwxmtable').bootstrapTable('getSelections');
        newAddFwxm = rows;
        for (var j = 0; j < rows.length; ++j) {
            if (rows[j].SL < 1) {
                BootstrapDialog.show({
                    title: '提示信息',
                    message: '所选服务项目的【数量】不可小于1！',
                    type: BootstrapDialog.TYPE_WARNING,
                    size: BootstrapDialog.SIZE_SMALL,
                    buttons: [{
                        label: '确定',
                        action: function (dialog) {
                            dialog.close();
                        }
                    }]
                });
                return false;
            }
        }

        if (rows.length == 0) {
            BootstrapDialog.show({
                title: '提示信息',
                message: '请选择要保存的服务项目!',
                buttons: [{
                    label: '确定',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });
            return false;
        }

        var SHZT;
        if (jhshztjl == '0') {
            SHZT = '审核中';
        } else if (jhshztjl == '1') {
            SHZT = '审核通过';
        } else {
            SHZT = '审核不通过';
        }

        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            jhshfwxm.rows.push({
                JHMXLSH: '',
                JHFWBLSH: '',
                FWXMDM: row.XMDM,
                FWBMC: "服务包外项目",
                FWBDM: "0000",
                FWXMMC: row.XMMC,
                FWPCDM: row.PCDM,
                FWPCMC: row.FWPC,
                FWSL: row.SL,
                FWHJ: 0,
                JHZT: '0',
                // FWHJ: row.FWHJ,
                SHZT: SHZT,
                SHBTGYY: '',
                SHRQ: null,
                SHRXM: null,
                SHZTS: jhshztjl,
                ZDRQ: null,
                ZDRYXM: null
            });
        }

        fwbInfo.push({FWBDM: "0000", FWBMC: "服务包外项目"});

        shdialogRef.close();

        $('#table_fwjhsh').bootstrapTable('refresh');
        initFwjhshTable();
    });

    $("#id_canlce").bind("click", function () {
        shdialogRef.close();
    });

    $.ajax({
        url: 'yyhptjhgl.do?action=jhzxAddFwxmList',
        type: 'get',
        dataType: 'json',
        data: {
            currPage: 1,
            pageSize: 10,
            // xmmc: $('#xmmc').val(),
            jhlsh: jhlsh
        },
        success: function (data) {
            newobjXmInfo = data;

            var len=newobjXmInfo.rows.length;
            for (var i = 0; i < newobjXmInfo.rows.length; i++) {
                var objXmInfoSelect = newobjXmInfo.rows[i];
                for (var j = 0; j < jhshfwxm.rows.length; j++) {
                    if (objXmInfoSelect.XMDM == jhshfwxm.rows[j].FWXMDM) {
                        newobjXmInfo.rows = removeElement(newobjXmInfo.rows, i);//删除方法
                        i--;
                    }

                    if(newobjXmInfo.rows.length<len){
                        len--;
                        break;
                    }
                }
            }

            initFwxmTable(jhlsh);

            if ($('#fwxmtable').find('tbody').find('tr').find('td').text() == '没有找到记录') {
                $('#fwxmtable').find('tbody').find('tr').find('td').text('服务包外项目已经添加完！');
            }
        }
    });

});

/**
 * [initTable description] 初始化表格
 */
function initFwxmTable(jhlsh) {
    // 先销毁表格
    $('#fwxmtable').bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $('#fwxmtable')
        .bootstrapTable({
            classes: 'table table-hover warning',
            // method: "get", // 使用get请求到服务器获取数据
            // url: "yyhptjhgl.do?action=jhzxAddFwxmList",
            data: newobjXmInfo.rows,
            contentType: "application/json",
            iconSize: 'sm',
            height: newobjXmInfo.rows.length * 32 + 34 >= 300 ? 325 : newobjXmInfo.rows.length * 32 + 115,
            showHeader: true,
            striped: true, // 表格显示条纹
            pagination: false, // 启动分页
            pageSize: 10, // 每页显示的记录数
            pageNumber: 1, // 当前第几页
            pageList: [2], // 记录数可选列表
            search: true, // 是否启用查询
            showColumns: false, // 显示下拉框勾选要显示的列
            showRefresh: false, // 显示刷新按钮
            onlyInfoPagination: false,
            searchAlign: 'left',
            sidePagination: "client", // 表示服务端请求
            uniqueId: "XMDM", // 每一行的唯一标识，一般为主键列
            clickToSelect: true, // 是否启用点击选中行
            showExport: true,
            exportDataType: "basic",
            minimumCountColumns: 2, // 最少允许的列数
            responseHandler: function (res) {
                dictData = res.dict;
                // var sTableHeight = res.rows.length * 32 + 34 >= 200 ? 225 : res.rows.length * 32 + 34;
                // $('#fwxmtable').bootstrapTable('resetView', {height: sTableHeight});
                return res;
            },
            queryParamsType: "undefined",
            showPaginationSwitch: false,
            queryParams: function queryParams(params) { // 设置查询参数
                var param = {
                    currPage: params.pageNumber,
                    pageSize: params.pageSize,
                    xmmc: $('#xmmc').val(),
                    jhlsh: jhlsh,
                };
                return param;
            },
            columns: [
                {
                    checkbox: true
                },
                {
                    title: '序号',
                    formatter: function (value, row, index) {
                        return index + 1;
                    },
                    align: 'center',
                    visible: false
                },
                {
                    field: 'XMDM',
                    title: '项目代码',
                    align: 'center',
                    visible: false
                },
                {
                    field: 'XMMC',
                    title: '项目名称',
                    align: 'left'

                },
                {
                    field: 'FWPC',
                    title: '服务频次',
                    align: 'center',
                    visible: false
                },
                {
                    field: 'SL',
                    title: '数量',
                    width: '100px',
                    align: 'center',
                    formatter: function (value, row, index) {
                        var id = "isEdit" + index;
                        return '<input type="number" class="form-control  input-sm " value=' + value + ' min=1  name="slEdit" id=\"' + id + '\" placeholder="数量"/ maxlength="3" onBlur="setUpdateRow(this,' + index + ');">';
                    },
                    visible: false
                }],
            onLoadSuccess: function () { // 加载成功时执行

            },
            onLoadError: function () { // 加载失败时执行

            },
            onCheck: function (row) {
                $("#remove").attr("disabled", false);
            },
            onUncheck: function (row) {
                // alert(row.id);
            }
        });
}

function setUpdateRow(obj, i) {
    $('#fwxmtable').bootstrapTable('updateRow', {
        index: i,
        row: {
            SL: obj.value
        }
    });
}

//initFwxmTable();
var $fwxmtable = $('#fwxmtable');


function getHeight() {
    return $(window).height() - 150;
}

$(window).resize(function () {
    $fwxmtable.bootstrapTable('resetWidth');

    var b = jQuery(window).width();

    if (b <= 600) {
        $fwxmtable.bootstrapTable("toggleView");
    }
});

jQuery(document).ready(function () {
    // saveForm.init(t);

});

function removeElement(array, index) {
    if (index >= 0 && index < array.length) {
        for (var i = index; i < array.length; i++) {
            array[i] = array[i + 1];
        }
        array.length = array.length - 1;
    }
    return array;

}