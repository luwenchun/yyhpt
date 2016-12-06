var objData = "";
var countData = "";
var allFwbInfo;
var idInfos = "";
var tjtchtml = "";
var fwbdm = "";
var objs = "";
var xmInfo = "";
var clickFwbdm = fwbdm;

$(function () {
    $.ajax({
        url: 'yyhptjhgl.do?action=getFwbInfo',
        type: 'get',
        dataType: 'json',
        data: null,
        success: function (data) {
            fwbinfoAll = data;
            allFwbInfo = data;
            for (var i = 0; i < data.rows.length; i++) {
                objs = data.rows[i];
                createHtml(objs);
            }
            // getData(data.rows[0].FWBDM);
            getData('');
        }
    })

    $("#sure").bind("click", function () {
        //获取所有的套餐包信息 objs
        for (var kk = 0; kk < allFwbInfo.rows.length; kk++) {
            var infoFwb = allFwbInfo.rows[kk].FWBDM;
            var str = "fwbInfoid" + infoFwb;
            if ($("#" + str).prop('class') == "bgddd_click") {
                var fwbdmarr = [];
                if (arrCount(fwb) > 0) {
                    for (var i = 0; i < arrCount(fwb); i++) {
                        fwbdmarr[i] = fwb[i].FWBDM;
                    }
                    fwbdmarr = unique(fwbdmarr);
                    fwb = [];
                    for (var j = 0; j < arrCount(fwbdmarr); j++) {
                        if (fwbdmarr[j] == "0000") {
                            fwb.push({'FWBDM': '0000', 'FWBMC': '服务包外项目'});
                        } else {
                            fwb.push(getFwb("fwbInfoid" + fwbdmarr[j]));
                        }
                    }
                } else {
                    fwb.push(getFwb(str));
                }
                idInfos += infoFwb + " ";
            }
        }
        if (idInfos == "") {
            BootstrapDialog.show({
                title: '提示信息',
                message: '请选择服务套餐!',
                buttons: [{
                    label: '确定',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });
        } else {
            //获取到所有已选中服务包数据  并push到父窗口
            $.ajax({
                url: 'yyhptjhgl.do?action=getSelectedFwbInfoDetail',
                type: 'get',
                dataType: 'json',
                data: {fwbdm: idInfos},
                success: function (data) {
                    var deleteData = [];
                    $.each(obj.rows, function (k, v) {
                        $.each(data.rows, function (index, value) {
                            if (v.FWXMDM == value.XMDM) {
                                deleteData.push(v);
                            }
                        })
                    });

                    if (deleteData.length > 0) {
                        BootstrapDialog.show({
                            title: '提示信息',
                            message: '有套餐包内项目，已经为您自动过滤重复套餐包项目!',
                            buttons: [{
                                label: '确定',
                                action: function (dialog) {
                                    dialog.close();
                                }
                            }]
                        });
                    }
                    $.each(deleteData, function (k, v) {
                            obj.rows.splice($.inArray(v, obj.rows), 1)
                        }
                    );
                    for (var i = 0; i < data.rows.length; i++) {
                        var row = data.rows[i];
                        obj.rows.push({
                            JHFWBLSH: "",
                            JHMXLSH: "",
                            FWXMDM: row.XMDM,
                            FWBDM: row.FWBDM,
                            FWBMC: row.FWBMC,
                            FWXMMC: row.XMMC,
                            FWPCDM: row.PCDM,
                            FWPCMC: row.PCMC,
                            FWSL: row.SL,
                            FWHJ: row.FYHJ,
                            ZDRQ: null,
                            ZDRYXM: null
                        });
                    }
                    dialogg.close();
                }
            });
        }
    });

    $("#id_canlce").bind("click", function () {
        dialogg.close();
    });
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

function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}

function getData(fwbdmXmInfo) {
    $.ajax({
        url: 'yyhptjhgl.do?action=getFwbInfoDetail',
        type: 'get',
        dataType: 'json',
        data: {
            fwbdm: fwbdmXmInfo
        },
        success: function (data) {
            countData = data;
            xmInfo = data.rows;
            initFwbInfoDetailTable(fwbdmXmInfo);
            if($('#fwbInfoDetailtable').find('tbody').find('tr').find('td').text()=='没有找到记录'){
                $('#fwbInfoDetailtable').find('tbody').find('tr').find('td').text('请勾选服务套餐包！');
            }
        }
    })
};

//生成服务包信息
function createHtml(objs) {
    $("#fwbAddInfopanel").html(createFwxmHtml(objs));
};

function createFwxmHtml(objs) {
    tjtchtml +=
        " <div class='col-md-4 col-xs-12' style='height: 88px;'> "
        + "  <div onclick='modelFunc_LookFwbmx(\"fwbInfoid" + objs.FWBDM + "\",\"" + objs.FWBMC + "\",\"" + objs.FWBDM + "\")' style='height: 56px;'>"
        + "	   <div  class='bgddd' id='fwbInfoid" + objs.FWBDM + "'> "
        + objs.FWBMC
        + "	   </div>"
        + "  </div>"
        + "</div>";
    return tjtchtml;

}

//1：第一次点击的时候，加载图片； 2：当点击已选中的套餐时，取消选中；
function click(fwbInfoid, fwbInfomc, fwbdm) {
    if ($("#" + fwbInfoid).prop('class') == "bgddd") {
        $("#" + fwbInfoid).removeClass('bgddd').addClass('bgddd_click');
        getData(fwbdm);
        fwb.push(getFwb(fwbInfoid));
    } else {
        $("#" + fwbInfoid).removeClass('bgddd_click').addClass('bgddd');
        removeFwb(fwbInfoid);

        for (var kk = 0; kk < allFwbInfo.rows.length; kk++) {
            var infoFwb = allFwbInfo.rows[kk].FWBDM;
            var str = "fwbInfoid" + infoFwb;
            if ($("#" + str).prop('class') == "bgddd_click") {
                getData(infoFwb);
            }else{
                getData('');
            }
        }
    }

}

function modelFunc_LookFwbmx(fwbInfoid, fwbInfomc, fwbdm) {
    clickFwbdm = fwbdm;
    click(fwbInfoid, fwbInfomc, fwbdm);
    // getData(fwbdm);
}

function initFwbInfoDetailTable(fwbdm) {
    // 先销毁表格
    $('#fwbInfoDetailtable').bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $('#fwbInfoDetailtable').bootstrapTable({
        classes: 'table table-hover warning',
        data: xmInfo,
        contentType: "application/json",
        iconSize: 'sm',
        height: 200,
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
        sidePagination: "server", // 表示服务端请求
        uniqueId: "XMDM", // 每一行的唯一标识，一般为主键列
        clickToSelect: false, // 是否启用点击选中行
        minimumCountColumns: 2, // 最少允许的列数
        responseHandler: function (res) {
            // dictData2 = res.dict;
            return res;
        },
        queryParamsType: "undefined",
        showPaginationSwitch: false,
        queryParams: function queryParams(params) { // 设置查询参数
            var param = {
                currPage: params.pageNumber,
                pageSize: params.pageSize,
                fwbdm: fwbdm
            };
            return param;
        },
        columns: [
            {
                field: 'XMMC',
                title: '服务项目',
                align: 'left'
            }, {
                field: 'PCMC',
                title: '服务频次',
                align: 'center',
                visible: false

            }, {
                field: 'SL',
                title: '服务数量',
                align: 'center',
                visible: false

            }, {
                field: 'FYHJ',
                title: '合计金额',
                align: 'center',
                visible: false
            }],
        onLoadSuccess: function (data) { // 加载成功时执行
            objData = data;
        },
        onLoadError: function () { // 加载失败时执行
        },
        onCheck: function (row) {
        },
        onUncheck: function (row) {
        }
    });
}

function getFwb(id) {
    id = id.replace('fwbInfoid', '');
    var obj;
    $.each(allFwbInfo.rows, function (k, v) {
        if (v.FWBDM === id) {
            obj = v;
            return false;
        }
    });
    return obj;
}

function removeFwb(id) {
    var tmp = [];
    var deleteObj = getFwb(id);
    $.each(fwb, function (k, v) {
        if (deleteObj.FWBDM != v.FWBDM) {
            tmp.push(v);
        }
    });
    fwb = tmp;
}




