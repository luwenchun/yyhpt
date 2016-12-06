var fwgllb_data = $table.bootstrapTable('getData');  //获取列表的table数据   
var fwryIds = [];   //服务人员id数组
var fwdjWhole = [];     //存放全局变量
/**
 * [initTable description] 初始化表格
 */
function fwgllbTable() {
    // 先销毁表格
    $('#fwgllbTable').bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $('#fwgllbTable')
        .bootstrapTable(
            {
                //height: $('#fwdjBodyDiv').height() - 30,
                classes: 'table table-hover warning',
                method: "get", // 使用get请求到服务器获取数据
                //url : "yyhptRwglFwgl.do?action=fwdjFwgllb", // 获取数据的Servlet地址
                data: fwgllb_data,        //绑定主界面的任务对象数据
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
                uniqueId: "RWDXLSH", // 每一行的唯一标识，一般为主键列
                clickToSelect: true, // 是否启用点击选中行
                showExport: true,
                exportDataType: "basic",
                minimumCountColumns: 2, // 最少允许的列数
                singleSelect: true, //禁止多选
                responseHandler: function (res) {
                    return res;
                },
                queryParamsType: "undefined",
                showPaginationSwitch: false,
                queryParams: function queryParams(params) { // 设置查询参数
                    var param = {
                        currPage: params.pageNumber,
                        pageSize: params.pageSize,
                        rwdxlsh: wholeVar4Page.sRwdxlsh
                    };
                    return param;
                },
                columns: [
                    {
                        checkbox: true
                    },
                    {
                        field: 'RYXX',
                        title: '服务管理列表',
                        align: 'center'
                    }],
                onLoadSuccess: function () { // 加载成功时执行

                },
                onLoadError: function () { // 加载失败时执行

                },
                onCheck: function (row) {
                    $("#remove").attr("disabled", false);
                },
                onUncheck: function (row) {

                },
                onClickRow: function (row) {
                    console.log('onClickRow');
                    //获取当前单击的行
                    sRwdxlsh = row.RWDXLSH;
                    wholeVar4Page.sRwdxlsh = row.RWDXLSH;
                    //初始化表单
                    initForm();
                    //刷新服务项目明细列表
                    fwxmmxTable.bootstrapTable('refresh');
                }
            });
};

/**
 *  初始化表格
 */
fwgllbTable();
setTimeout(function () {
    //fwgllbTable.bootstrapTable('check',3);
    fwgllbTable.bootstrapTable('checkBy', {field: "RWDXLSH", values: [wholeVar4Page.sRwdxlsh]})
}, 500);

var fwgllbTable = $('#fwgllbTable');

//已终止则设置按钮不可用(add 20160906 已评价或已回访也不可修改）
// if(sJalx=='1'||sfFwpj!='0'||sfFwhf!='0'){
// 	$("#btn_Save").prop('disabled',true);
// }
/**
 * [initTable description] 初始化表格
 */
function initXmmxTable() {
    // 先销毁表格
    $('#fwxmmxTable').bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $('#fwxmmxTable')
        .bootstrapTable(
            {
                height: $('#djTableDiv').height(),  //设置table内容的高度
                classes: 'table table-hover warning',
                method: "get", // 使用get请求到服务器获取数据
                url: "yyhptRwglFwgl.do?action=fwdjFwxmmx", // 获取数据的Servlet地址
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

                    return res;
                },
                queryParamsType: "undefined",
                showPaginationSwitch: false,
                queryParams: function queryParams(params) { // 设置查询参数
                    var param = {
                        currPage: params.pageNumber,
                        pageSize: params.pageSize,
                        rwdxlsh: wholeVar4Page.sRwdxlsh,
                    };
                    return param;
                },
                columns: [
                    {
                        field: 'FWXMMC',
                        title: '可选护理服务项目',
                    },
                    {
                        field: 'SJXZ',
                        title: '确认',
                        align: 'center',
                        width: '95px',
                        formatter: function (value, row, index) {
                            if (value == "1")
                                return "<input type='checkbox' checked onclick='selectFwxm(this," + index + ");'/>"; //id='ckSjxz' name='ckSjxz'
                            else
                                return "<input type='checkbox' onclick='selectFwxm(this," + index + ");'/>";
                        }
                    },
                    {
                        field: 'FWRYGH',
                        title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;执行人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
                        align: 'center',
                        width: '110px',
                        visible: false,
                        formatter: function (value, row, index) {
                            //默认选择当前登录人员
                            if (value == undefined) {
                                value = dlRybm;
                            }
                            var id = "fwryEdit" + index;
                            fwryIds[index] = id;
                            var selectBody = "";//不可为空 "<option value=''>--请选择--</option>";
                            $.each(wholeVar4Page.rylist, function () {
                                if (value == this.rybm) {
                                    selectBody += "<option selected='selected' value=" + this.rybm + ">" + this.ryxm
                                        + "</option>";
                                } else {
                                    selectBody += "<option value=" + this.rybm + ">" + this.ryxm
                                        + "</option>";
                                }
                            });
                            return '<select class="form-control input-sm" value=\"' + value + '\" id=\"' + id + '\" onBlur="setZxryRow(this,' + index + ');">' + selectBody + '</select>'
                            //return '<input type="text" class="form-control input-sm " value=\"'+value+'\" onBlur="setZxryRow(this,'+index+');">';
                        }
                    },
                    {
                        field: 'FWSC',
                        title: '服务时长',
                        align: 'center',
                        width: '90px',
                        visible: false,
                        formatter: function (value, row, index) {
                            if (value == undefined || value == 0) {
                                //value = 0;
                                value = '';
                            }
                            //var id="fwscEdit"+index;
                            return '<input type="number" class="form-control input-sm " value="' + value + '" min="0" step="0.1" max="24" onkeyup="checkNum(this)" onBlur="setFwscRow(this,' + index + ');"/>';
                        }
                    },
                    {
                        field: 'ZXJG',
                        title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;执行结果&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
                        align: 'center',
                        formatter: function (value, row, index) {
                            if (value == undefined) {
                                value = "";
                            }
                            return '<input type="text" class="form-control input-sm " value=\"' + value + '\" maxlength="50" onkeyup="formatStrForXml(this)" onBlur="setZxjgRow(this,' + index + ');">';
                        }
                    }],
                onLoadSuccess: function () { // 加载成功时执行
                    /*alert(1);
                     for(var i=0;i<fwryIds.length;i++){
                     $("#"+fwryIds[i]).select2({language: 'zh-CN'});
                     }	*/
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
//回写table的【实际选择项目】的值
function selectFwxm(obj, i) {
    var ckStatu = "0";
    if (obj.checked) {
        ckStatu = "1";
    }
    //勾选项目后将执行人编码和姓名赋值给实际的table数据（默认执行人时只是对应的input控件显示了当前登录人员，为赋值给实际的table数据）
    var fwxryxm = $('#fwryEdit' + i).find("option:selected").text();
    if (fwxryxm == '--请选择--') {
        fwxryxm = '';
    }
    console.log('勾选服务项目：' + fwxryxm);
    console.log('勾选服务项目：' + $('#fwryEdit' + i).val());
    if (ckStatu == "1") {
        fwxmmxTable.bootstrapTable('updateRow', {
            index: i,
            row: {
                SJXZ: ckStatu,
                FWRYGH: $('#fwryEdit' + i).val(),
                FWRYXM: fwxryxm,
            }
        });
    } else {
        fwxmmxTable.bootstrapTable('updateRow', {
            index: i,
            row: {
                SJXZ: ckStatu
            }
        });
    }
}
//回写table的【服务时长】的值
function setFwscRow(obj, i) {
    fwxmmxTable.bootstrapTable('updateRow', {
        index: i,
        row: {
            FWSC: obj.value
        }
    });
}
//检查输入的服务时长是否符合格式（数据库中3位整数1位小数）
function checkNum(obj) {
    //obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
    //obj.value = obj.value.replace(/^\d{0,7}(\.\d{0,2})?$/g,'');
    /*obj.value = obj.value.replace('+','');
     obj.value = obj.value.replace('-','');*/
    obj.value = obj.value.replace('-', '');
    var _value = parseFloat(obj.value);
    /*if(_value<0){
     obj.value = obj.value.replace('-','');
     }*/
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
    /*var reg = /^\d{0,2}(\.\d{0,1})?$/g;
     if (!reg.test(_value)) {
     wnform.toast('请输入0-99.9之间的数！');
     obj.value = 0;
     } */
}
//回写table的【执行人员】的值
function setZxryRow(obj, i) {
    //服务人员姓名为'--请选择--'时改为空
    var fwxryxm = $('#' + obj.id).find("option:selected").text();
    if (fwxryxm == '--请选择--') {
        fwxryxm = '';
    }
    fwxmmxTable.bootstrapTable('updateRow', {
        index: i,
        row: {
            FWRYGH: $('#' + obj.id).val(),
            FWRYXM: fwxryxm,
        }
    });
}
function formatStrForXml(obj) {
    //处理特殊字符，否则存储中解析xml出错（在 XML 中仅有字符 "<"和"&" 是非法的）
    var sZxjg = obj.value.replace("&", "").replace("<", "");
    obj.value = sZxjg;
}
//回写table的【执行结果】的值
function setZxjgRow(obj, i) {
    fwxmmxTable.bootstrapTable('updateRow', {
        index: i,
        row: {
            ZXJG: obj.value
        }
    });
}

/**
 *  初始化表格
 */
initXmmxTable();

var fwxmmxTable = $('#fwxmmxTable');

/**
 * [description] 初始化页面 事件注册
 */

function setSaveShowOrHide() {
    if (wholeVar4Page.showOrHide == 'hide') {
        $('#btn_Save').hide();
    } else if (wholeVar4Page.showOrHide == 'show') {
        $('#btn_Save').show();
    }
}

$(function () {
    //wnform.addOnresize($table,tableStaus);
    setSaveShowOrHide()

    $('#btn_Save').on('click', function () {
        saveForm();
        return false;
    });

    $('#btn_Exist').on('click', function () {
        wholeVar4Page.dialogModel.close();
        return false;
        //$table.bootstrapTable('refresh');
    });

    $('#btn_upload').on('click', function () {
        uploadFile();
        return false;
    });

    $('#btn_photo').on('click', function () {
        return false;
    });

    $('.datetime').on('change', function () {
        var re = /^[0-9]*[1-9][0-9]*$/;
        var $this = $(this), start = $('#KSSJ').val(), end = $this.val(),
            dateStart = new Date(start), dateEnd = new Date(end);
        var timeOffset = (dateEnd - dateStart) / 1000 / 60 / 60;
        if (!re.test(timeOffset.toString())) {
            $this.tooltip({title: '服务时长请选择整数倍的小时时长，作为费用结算依据', placement: 'bottom'});
            $this.tooltip('show');
        } else {
            $('.datetime').tooltip('destroy');
        }
    })

});

//获取服务记录信息，初始化界面
function initForm() {
    $.ajax({
        url: "yyhptRwglFwgl.do?action=fwdjDetail",
        type: "post",
        dataType: "json",
        data: {
            rwdxlsh: wholeVar4Page.sRwdxlsh,
        },
        beforeSend: function (xhr) {
            //wn.showLoading();
        },
        success: function (data) {
            if (data != undefined) {

                if (data.rwdxlsh == undefined)
                    wn.clearHandleForm(fwdjForm);

                //根据id与字段名相同赋值
                setTimeout(function () {
                    wn.setformEdit(data);
                    var fwrylb = data.fwrylb;

                    fwdjWhole.rygh = data.rygh;             //当前登录人员工号
                    fwdjWhole.ryxm = data.ryxm;             //当前登录人员姓名
                    fwdjWhole.sfjs = data.SFJS;

                    if (fwrylb) {
                        wn.createSelectByArray($('#fwrygh'), fwrylb);
                    }
                    $('#fwrygh').select2().trigger('change');
                    //已登记时默认选中登记的服务人员工号，未登记时默认选中当前登录人
                    if (data.FWRYGH != null || data.FWRYXM != null) {
                        $('#fwrygh').val(data.FWRYGH).trigger('change');
                    } else {
                        $('#fwrygh').val(fwdjWhole.rygh).trigger('change');
                    }

                    if ($('#FWJLLSH').val() == "") {
                        //服务地址默认家庭地址
                        $('#FWDZ').val(data.JTDZ);
                    }
                    //绑定附件地址
                    console.log(data.FJDZ);
                    //	2、fx2
                    $.fn.fileinput("show", "uploadfiles/FWJL", data.FWJLLSH, data.FJDZ, "fjdzDiv", "fileDiv");

                }, 500);

            } else {
                wnform.toast('查询数据失败!');
            }
        },
        complete: function (xhr) {
            //wn.hiddenLoading();
        }
    });

    $('.form_datetime').datetimepicker({
        format: "yyyy-mm-dd hh:ii",
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: true,
        autoclose: true,
        todayHighlight: true,
        startView: 2,
        forceParse: 0,
        showMeridian: false,  //是否为天和时间视图显示子午线
        pickerPosition: "bottom-left"
    });


};
initForm();


function saveForm() {
    if (fwdjWhole.sfjs == 1) {
        wnform.toast('已结算，不能修改!');
        $("#btn_Save").prop('disabled', true);
        return;
    }
    if (sJalx == '1') {
        wnform.toast('已中止服务，不能修改!');
        $("#btn_Save").prop('disabled', true);
        return;
    }

    if (sfFwpj != '0') {
        wnform.toast('服务已评价，不能修改!');
        $("#btn_Save").prop('disabled', true);
        return;
    }

    if (sfFwhf != '0') {
        wnform.toast('服务已回访，不能修改!');
        $("#btn_Save").prop('disabled', true);
        return;
    }

    if ($("#fwrygh").val() == '') {
        wnform.toast('请选择服务人员!');
        return;
    }

    var kssj = $('#KSSJ').val();
    var jssj = $('#JSSJ').val();

    if (kssj == undefined || kssj == '') {
        wnform.toast('开始时间不能为空!');
        return;
    }
    if (jssj == undefined || jssj == '') {
        wnform.toast('结束时间不能为空!');
        return;
    }

    if (kssj > jssj) {
        wnform.toast('开始时间不能大于结束时间!');
        return;
    }
    var _kssj, _jssj, diff_times, diff_hours;
    _kssj = kssj.replace(/-/g, "/");
    _jssj = jssj.replace(/-/g, "/");
    var date_kssj = new Date(_kssj);
    var date_jssj = new Date(_jssj);
    diff_times = date_jssj.getTime() - date_kssj.getTime();
    var hours = (diff_times / (3600 * 1000)).toFixed(2);
    console.groupEnd();


    var fwrygh, fwryxm;
    fwrygh = $('#fwrygh').val();
    fwryxm = $('#fwrygh option:selected').text();

    var allRows = fwxmmxTable.bootstrapTable('getData');
    //是否已选择项目
    var bSfyxzxm;
    for (i = 0; i <= allRows.length - 1; i++) {
        if (allRows[i].SJXZ == "1") {
            allRows[i].FWRYGH = fwrygh;
            allRows[i].FWRYXM = fwryxm;
            // allRows[i].FWSC = hours;
            bSfyxzxm = true;
        }
    }

    if (!bSfyxzxm) {
        wnform.toast('请选择护理服务项目!');
        return;
    }

    var data = wn.fillWithForm("fwdjForm");
    data += '&FWXMMX=' + JSON.stringify(allRows);
    data += '&RWDXLSH=' + wholeVar4Page.sRwdxlsh;
    var fileNames = "";
    $(".exists-file").each(
        function () {
            fileNames += $('#' + this.id).text() + ',';
        }
    );

    data += '&FJDZ=' + fileNames;
    data += '&FWRYGH=' + fwrygh;
    data += '&FWRYXM=' + fwryxm;
    data += '&SJFWSC=' + hours;
    data += '&hcje=0';
    $.ajax({
        url: "yyhptRwglFwgl.do?action=fwdjAdd",
        type: "post",
        dataType: "json",
        data: data,
        success: function (data) {
            if (data[0].code == "T") {
                $("#FWJLLSH").val(data[0].key);
                //上传附件
                uploadFile();
                wnform.toast('保存成功!');
                //刷新服务登记项目明细
                fwxmmxTable.bootstrapTable('refresh');
                //刷新列表数据
                $table.bootstrapTable('refresh');
                //刷新列表人群统计数据
                GetRqNum();
                wholeVar4Page.dialogModel.close();
            }
            else {
                wnform.toast('保存失败!' + data[0].message);
            }
        }
    });
};

function uploadFile() {
    // 1、fx1
    var formData = getFileData("#fwdjForm");

    event.preventDefault();
    $.ajax({
        url: 'yyhptRwglFwgl.do?action=upload',
        type: 'POST',
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (res) {
            if (res.STATUS == 'T') {
                //console.log(res.filePath[0]);
                console.log(res.filePath);
            } else {
                /*$.toaster({
                 priority : 'warning',
                 title : '提示',
                 message : res.message
                 });*/
            }
        },
        error: function () {
            wnform.toast('上传附件失败！');
        }
    });
}

//删除以上传的附件（页面删除）
function DeleteFile(id) {
    var obj = document.getElementById(id);
    obj.parentNode.removeChild(obj);
}



