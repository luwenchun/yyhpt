var nFwxmpf = 0;    //服务项目评分（未完成一项扣5分，扣完为止，总分20）
var sFwsjpfdm = 0;  //服务时间评分代码（1：按计划，2：时间不足）
var nFwsjpf = 0;    //服务时间评分（每减少5分钟扣5分，扣完为止，总分20）
var nFwtdpf = 0;    //1：很好，2：好，3：中，4：一般，5：差（每档5分，很好30分，）--差5分，一般10分，中15分，好20分，很好30分
var nFwzlpf = 0;    //1：很好，2：好，3：中，4：一般，5：差（每档5分，很好30分，）--差5分，一般10分，中15分，好20分，很好30分

/**
 * [initTable description] 初始化表格
 */
function initPjxmmxTable() {
    // 先销毁表格
    $('#pjxmmxTable').bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $('#pjxmmxTable')
        .bootstrapTable(
            {
                //height: 239px, //$('#pjTableDiv').height(),  //设置table内容的高度（减去标题高度）
                classes: 'table table-hover warning',
                method: "get", // 使用get请求到服务器获取数据
                url: "yyhptRwglFwgl.do?action=fwpjFwxmmx", // 获取数据的Servlet地址
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
                sidePagination: "server", // 表示服务端请求
                uniqueId: "FWMXLSH", // 每一行的唯一标识，一般为主键列
                clickToSelect: true, // 是否启用点击选中行
                showExport: true,
                exportDataType: "basic",
                minimumCountColumns: 2, // 最少允许的列数
                responseHandler: function (res) {
                    //根据结果的行数获取table的高度，最大高度222px
                    var sTableHeight = res.rows.length * 32 + 34 >= 222 ? 225 : res.rows.length * 32 + 34;
                    console.log(sTableHeight);
                    //设置table高度，重新加载表格视图
                    $('#pjxmmxTable').bootstrapTable('resetView', {height: sTableHeight});
                    return res;
                },
                queryParamsType: "undefined",
                showPaginationSwitch: false,
                queryParams: function queryParams(params) { // 设置查询参数
                    var param = {
                        currPage: params.pageNumber,
                        pageSize: params.pageSize,
                        rwdxlsh: sRwdxlsh,
                    };
                    return param;
                },
                columns: [
                    {
                        field: 'FWXMMC',
                        title: '护理服务项目',
                    },
                    {
                        field: 'FWSC',
                        title: '服务时长',
                        align: 'center',
                        visible: fwscFlag
                    },
                    {
                        field: 'FWRYXM',
                        title: '执行人',
                        align: 'center',
                    },
                    {
                        field: 'QRBZ',
                        title: '服务确认',
                        align: 'center',
                        width: '95px',
                        formatter: function (value, row, index) {
                            if (value == "1")
                                return "<input type='checkbox' checked onclick='selectFwxm(this," + index + ");'/>"; //id='ckSjxz' name='ckSjxz'
                            else
                                return "<input type='checkbox' onclick='selectFwxm(this," + index + ");'/>";
                        }
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
};


var pjxmmxTable = $('#pjxmmxTable');

//已终止则设置按钮不可用
// if(sJalx=='1'){
// 	$("#btn_Save").prop('disabled',true);
// }

//回写table的【实际选择项目】的值
function selectFwxm(obj, i) {
    var ckStatu = "0";
    if (obj.checked) {
        ckStatu = "1";
    }
    pjxmmxTable.bootstrapTable('updateRow', {
        index: i,
        row: {
            QRBZ: ckStatu
        }
    });
    //设置未完成服务数和实际总服务时长
    setWwcfwsAndSjzfwsc();
    //计算评分
    caculatePf();
};
//设置未完成服务数和实际总服务时长
function setWwcfwsAndSjzfwsc(allRows) {
    var allRows = pjxmmxTable.bootstrapTable('getData');
    var iWwcfws = 0;
    var nSjzfwsc = 0;
    var i = 0;
    for (i = 0; i <= allRows.length - 1; i++) {
        if (allRows[i].QRBZ == "1") {
            iWwcfws = iWwcfws + 1;
            nSjzfwsc = nSjzfwsc + allRows[i].FWSC;
        }
    }
    $('#WWCXMS').text(allRows.length - iWwcfws);
    $('#SJFWSC').val(nSjzfwsc.toFixed(1));
};

//获取服务记录信息，初始化界面
function initFwpjForm() {
    $.ajax({
        url: "yyhptRwglFwgl.do?action=fwpjDetail",
        type: "post",
        dataType: "json",
        data: {
            rwdxlsh: sRwdxlsh,
        },
        beforeSend: function (xhr) {
            //wn.showLoading();
        },
        success: function (data) {
            if (data != undefined) {
                if (data.rwdxlsh == undefined)
                    wn.clearHandleForm(fwpjForm);
                //动态加载星级评分标签
                $('#FWTDDIV').html('<input id="FWTDPJDM" name="FWTDPJDM" type="number" value=\"' + data.FWTDPJDM + '\" class="rating" min=0 max=5 step=1 data-size="xs">');
                $('#FWZLDIV').html('<input id="FWZLPJDM" name="FWZLPJDM" type="number" value=\"' + data.FWZLPJDM + '\" class="rating" min=0 max=5 step=1 data-size="xs">');
                var $input = $('input.rating'), count = Object.keys($input).length;
                if (count > 0) {
                    $input.rating();
                }
                //根据id与字段名相同赋值
                setTimeout(function () {
                    wn.setformEdit(data);
                    setDefaultValue(data);
                }, 500);
            } else {
                $('#FWTDDIV').html('<input id="FWTDPJDM" name="FWTDPJDM" type="number" value=0 class="rating" min=0 max=5 step=1 data-size="xs">');
                $('#FWZLDIV').html('<input id="FWZLPJDM" name="FWZLPJDM" type="number" value=0 class="rating" min=0 max=5 step=1 data-size="xs">');
                var $input = $('input.rating'), count = Object.keys($input).length;
                if (count > 0) {
                    $input.rating();
                }
                wnform.toast('查询数据失败!');
            }
        },
        complete: function (xhr) {
            //wn.hiddenLoading();
        }
    });
};

initFwpjForm();

function setDefaultValue(data) {
    //var nowTime = new Date();
    var nowTime = new Date(data.PJRQ);
    var sPjrq = nowTime.getFullYear() + '年' + (nowTime.getMonth() + 1) + '月' + nowTime.getDate() + '日';
    $('#FWPJTITLE').text(sRwdxxm + '' + sPjrq + '服务评价');
    sPjrq = nowTime.getFullYear() + '-' + (nowTime.getMonth() + 1) + '-' + nowTime.getDate();
    //改为绑定赋值
    //$('#PJRQ').text(sPjrq);
    if ($('#PJRYXM').text() == '' || $('#PJRYXM').text() == null) {
        $('#PJRYXM').text(sDlryxm);
    }

};

function saveFwpjForm() {
    if ($("#FWJLLSH").val() == '' || $("#FWJLLSH").val() == undefined) {
        wnform.toast('请先进行服务登记!');
        return;
    }

    if (sJalx == '1') {
        wnform.toast('已中止服务，不能修改!');
        $("#btn_Save").prop('disabled', true);
        return;
    }

    //总分为0 则计算评分（弹出页面后没有进行任何操作时）
    if ($('#ZF').text() == '0' || sFwsjpfdm == 0) {
        caculatePf();
    }
    var data = wn.fillWithForm("fwpjForm");
    var allRows = pjxmmxTable.bootstrapTable('getData');
    data += '&FWXMMX=' + JSON.stringify(allRows);
    data += '&RWDXLSH=' + sRwdxlsh
    data += '&WWCXMS=' + $('#WWCXMS').text();
    data += '&ZF=' + $('#ZF').text();
    data += '&FWXMPF=' + nFwxmpf;
    data += '&FWSJPJDM=' + sFwsjpfdm;
    data += '&FWSJPF=' + nFwsjpf;
    data += '&FWZLPF=' + nFwzlpf;
    data += '&FWTDPF=' + nFwtdpf;
    data += '&PJLXDM=2';                    //评价类型 1:医护评价 2:服务评价
    $.ajax({
        url: "yyhptRwglFwgl.do?action=fwpjAdd",
        type: "post",
        dataType: "json",
        data: data,
        success: function (data) {
            if (data[0].code == "T") {
                $("#PJLSH").val(data[0].key);
                wnform.toast('保存成功!');
                //pjxmmxTable.bootstrapTable('refresh');
                dialogModel.close();
                //刷新列表数据
                $table.bootstrapTable('refresh');
                //刷新列表人群统计数据
                GetRqNum();
            }
            else {
                wnform.toast('保存失败!' + data[0].message);
            }
        }
    });
};

//检查输入的服务时长是否符合格式（数据库中3位整数1位小数）
function checkFwzscNum(obj) {
    var _value = parseFloat(obj.value);
    if (_value < 0) {
        obj.value = obj.value.replace('-', '');
    }
    if (_value > 24) {
        obj.value = 24;
    } else {
        var sValue = _value.toString();
        //wnform.toast('请输入0-24之间的数！');
        //保留一位小数
        if (sValue.indexOf('.') > 0 && sValue.indexOf('.') + 1 != sValue.length) {
            obj.value = _value.toFixed(1);
        }
    }
}

//计算评分
function caculatePf() {
    if ($("#FWJLLSH").val() == '' || $("#FWJLLSH").val() == undefined) {
        return;
    }
    //计算服务项目评分
    var wwcxms = $('#WWCXMS').text();    //未完成项目数
    var zxms = pjxmmxTable.bootstrapTable('getData').length; //总项目数
    //全部未完成则为0分
    if (wwcxms == zxms) {
        nFwxmpf = 0;
    } else {
        nFwxmpf = 20 - wwcxms * 5;
        if (nFwxmpf < 0) {
            nFwxmpf = 0;
        }
    }
    //计算服务时间评分
    var yfwsc = $('#YFWSC').text();
    var sjfwsc = $('#SJFWSC').val();

    if (yfwsc - sjfwsc <= 0) {
        sFwsjpfdm = 1;
        nFwsjpf = 20;
    } else {
        sFwsjpfdm = 2;
        console.log((yfwsc - sjfwsc));
        //需扣除的分数
        nFwsjpf = Math.round((yfwsc - sjfwsc) * 60);
        if (nFwsjpf > 20) {
            nFwsjpf = 0;
        } else {
            nFwsjpf = 20 - nFwsjpf;
        }
    }
    if ($('#FWTDPJDM').val() == 5) {
        nFwtdpf = 30;
    } else {
        nFwtdpf = 5 * $('#FWTDPJDM').val();
    }
    if ($('#FWZLPJDM').val() == 5) {
        nFwzlpf = 30;
    } else {
        nFwzlpf = 5 * $('#FWZLPJDM').val();
    }
    console.log("1.服务项目评分：" + nFwxmpf);
    console.log("2.服务时间评分：" + nFwsjpf);
    console.log("3.服务态度评分：" + nFwtdpf);
    console.log("4.服务质量评分：" + nFwzlpf);
    $('#ZF').text(nFwxmpf + nFwsjpf + nFwtdpf + nFwzlpf);
}

/**
 * [description] 初始化页面 事件注册
 */

$(function () {
    /**
     *  初始化表格
     */
    initPjxmmxTable();

    $('div.rating-stars-fwpf').click(function () {
        caculatePf();
    });
});
