var mobileMode = false;
var $table = $('#table');
var zxdw = {id: '', name: '', executeTime: []};
var dictData;
var editRow='';
var flag = 0;

window.operateEvents = {
    'click .edit': function (e, value, row, index) {
        modelFunc(row, '修改服务频次', 2);
    },
    'click .remove': function (e, value, row, index) {
        deleteData(row, '确认要删除该记录吗?', 2);
    }
};

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

$(function () {

//    initDictData();
    initTable();
    $('#btn_query').on('click', function () {
        $('#table').bootstrapTable("refresh");
    });

    $('#add').on('click', function () {
        //alert('add item');
        modelFunc(null, '新增服务频次', 1);
    });
    Date.prototype.mmdd = function () {
        var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = (this.getDate()).toString();
        return mm + '月' + dd + '日';
    };
    Date.prototype.hhii = function () {
        // var hh = this.getHours() + this.getTimezoneOffset() / 60;
        var hh = this.getHours().toString();
        var ii = this.getMinutes().toString();
        return hh + ':' + (ii[1] ? ii : "0" + ii[0]);
    };
});

function initTable() {
    var table = $('#table');
    // 先销毁表格
    table.bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    table.bootstrapTable(
        {
            classes: 'table table-hover warning',
            method: "get", // 使用get请求到服务器获取数据
            url: "yyhptjcwhfwpc.do?action=list", // 获取数据的Servlet地址
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
            uniqueId: "PCDM", // 每一行的唯一标识，一般为主键列
            clickToSelect: true, // 是否启用点击选中行
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
                    PCMC: $("#fwpcQuery").val()
                };
                return param;
            },
            columns: [
                {
                    title: '序号',
                    formatter: function (value, row, index) {
                        return index + 1;
                    },
                    align:'center'
                },
                {
                    field: 'PCDM',
                    title: '频次代码'

                },
                {
                    field: 'PCMC',
                    title: '频次名称'
                },
                {
                    field: 'ZXDWMC',
                    title: '执行单位'

                },
                {
                    field: 'ZXCS',
                    title: '执行次数'

                },
                {
                    field: 'SJFW',
                    title: '时间范围'

                },
                {
                	field: 'XT_XGSJ',
                	title: '更新时间'
                		
                },
                {
                    field: 'QYBZ',
                    title: '启用标志',
                    width: 30,
                    align: 'center',
                    formatter: function (value, row, index) {
                        if (value == "1")
                            return "<input name='qchcek' type='checkbox' checked onclick='return false'/>";
                        else
                            return "<input name='qchcek' type='checkbox' onclick='return false'/>";
                    }

                },
                {
                    title: '操作',
                    align: 'center',
                    width: '100px',
                    events: operateEvents,
                    formatter: operateFormatter
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

$(window).resize(function () {
    var table = $('#table');
    var b = jQuery(window).width();
    if (b <= 600) {
        if (!mobileMode) {
            table.bootstrapTable("toggleView");
            mobileMode = true;
            console.log(mobileMode);
        }
    }
    else {
        if (mobileMode) {
            table.bootstrapTable("toggleView");
            mobileMode = false;
            console.log(mobileMode);
        }
    }
});

/**
 * [operateEvents description]
 *
 * @type {Object} 格式化操作栏绑定事件
 */
window.operateEvents = {
    'click .edit': function (e, value, row, index) {
        modelFunc(row, '修改服务频次', 2);
    },
    'click .remove': function (e, value, row, index) {
        deleteData(row, '确认要删除该记录吗?', 2);
    }
};

//弹出方法
modelFunc = function (row, mtitle, mflag) {
	editRow = row;
	flag = mflag;
    BootstrapDialog.show({
        title: mtitle,
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: $('<div></div>').load('yyhptjcwhfwpc.do?action=add'),
        buttons: [{
            label: '保存',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                saveForm.init(dialogItself, mflag);
                $('#defaultForm').submit();
                getExecuteTime2Save();
            }
        }, {
            label: '取消',
            cssClass: 'btn-default btn-sm',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }],
        onshow: function (dialogRef) {
        },
        onshown: function (dialogRef) {
            
        },
        onhide: function (dialogRef) {
            $(this).removeData("bs.modal");
        },
        onhidden: function (dialogRef) {
            $(this).removeData("bs.modal");
        }
    });
};

//修改弹出时赋值 table数据
function setControlValue(row) {
    wn.setformEdit(row);
    // 修改时，控制部分权限
    $("#PCDM").attr("disabled", true);

    $('#ZXDWMC2')[0].innerHTML = $('#ZXDWMC')[0].value;
    console.log(row);
    zxdw.id = row.ZXDWDM;
    zxdw.name = row.ZXDWMC;
}
var zxdwArr = [{'id':'01','name':'年'},
	            {'id':'02','name':'季'},
	            {'id':'03','name':'月'},
	            {'id':'04','name':'周'},
	            {'id':'05','name':'天'},]
function setHtml(zxdwArr) {  //"zxdwmc",
//   wn.createRadioByArray($("#zxdwdiv"), datas['63-1001'], "zxdwdm", "setOnradio");
//01:年;02:季;03:月;04:周;05:天
	
	wn.createRadioByArray($("#zxdwdiv"), zxdwArr, "ZXDWDM", "setOnradio");

}

/*
 * 单选变化事件
 */
function setOnradio(obj) {
	var nm = obj.value
    $('#ZXDWMC2')[0].innerHTML = wn.getNameByDist(zxdwArr, obj.value);
    $('#ZXDWMC')[0].value = wn.getNameByDist(zxdwArr, obj.value);
    zxdw.id = obj.value;
    zxdw.name = wn.getNameByDist(zxdwArr, obj.value);
    addExecuteTime();
}

function operateFormatter(value, row, index) {
    return [
        '<a class="edit" href="javascript:void(0)"  data-toggle="modal" disabled title="修改">',
        '<i class="glyphicon glyphicon-edit"></i>',
        '</a>&nbsp;&nbsp;&nbsp;&nbsp;',
        '<a class="remove" href="javascript:void(0)" title="删除">',
        '<i class="glyphicon glyphicon-remove"></i>', '</a>'].join('');
}

modify = function (row, title, flag) {
    console.log('modify begin');
    alert('modify begin');
};

deleteData = function (row, title, flag) {
    console.log('delete begin');
    BootstrapDialog.confirm({
        title: '提示信息',
        message: title,
        type: BootstrapDialog.TYPE_WARNING,
        closable: true,
        draggable: true,
        btnCancelLabel: '否',
        btnOKLabel: '是',
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: "yyhptjcwhfwpc.do?action=delete",
                    type: "get",
                    dataType: "json",
                    data: {PCDM: row.PCDM},
                    success: function (data) {
                        if (data.code=="T"){
                            wnform.toast(data.message);
                            $table.bootstrapTable('refresh');
                        } else {
                            wnform.toast(data.message);
                        }
                    }
                });
            } else {

            }
        }
    });
};

function initControls() {

    var tooltip = $('#PCDM');
    tooltip.tooltip('destroy');
    $('#id_btn_add').on('click', function () {
        console.log('id_btn_add_time');
    });
    $('#id_btn_remove').on('click', function () {
        var selector = $('#id_input_add');
        var selectButton = $('#id_btn_add');
        if (zxdw.id == '04') {
            selector.select2("val", "");
        } else {
            selector.tagsinput('removeAll');
        }
    });

    $('#id_note').tooltip({title: '例：1月1日为居民纳入管理第一个月的第一天'});
}
function addExecuteTime() {

	console.log('addExecuteTime');
    var selector = $('#id_input_add');
    var selectButton = $('#id_btn_add');
    var sjfw = $('#id_sjfw_dw');
    selectButton.datetimepicker('remove');
    selectButton.unbind('click');
    selector.select2("val", "");
    selector.tagsinput('removeAll');
    selector.tagsinput('destroy');
    sjfw[0].innerHTML = '天';
    if (zxdw.id != '04') {
        selector.select2('destroy');
        selector.tagsinput({itemValue: "value", itemText: "text", freeInput: false});
        if (zxdw.id != '05') {
            selectButton.datetimepicker({
                // format: "dd MM yyyy - hh:ii",
                // todayBtn: true,
                // miniView: 'hour',
                language: 'zh-CN',
                startView: 'year',
                maxView: 'year',
                minView: 'month',
                autoclose: true,
                pickerPosition: "bottom-left"
            });
        }
        else {
            selectButton.datetimepicker({
                // format: "dd MM yyyy - hh:ii",
                // todayBtn: true,
                // miniView: 'hour',
                language: 'zh-CN',
                startView: 'hour',
                maxView: 'day',
                minView: 'hour',
                autoclose: true,
                pickerPosition: "bottom-left"
            });
            sjfw[0].innerHTML = '小时';
        }
        selectButton.datetimepicker()
            .on('changeDate', function (ev) {
                console.log('datetimepciker 将隐藏');
                console.log(ev.date.mmdd());
                if (zxdw.id !== '05') {
                    selector.tagsinput("add", {value: ev.date.mmdd(), text: ev.date.mmdd(), continent: zxdw.name})
                }
                else {
                    selector.tagsinput("add", {value: ev.date.hhii(), text: ev.date.hhii(), continent: zxdw.name})
                }
            });


    }

    //后期简化
    switch (zxdw.id) {
        case '01':

            break;
        case '02':

            break;
        case '03':

            break;
        case '04':
            selector.select();
            var week = [{id: '1', text: '星期一'}, {id: '2', text: '星期二'},
                {id: '3', text: '星期三'}, {id: '4', text: '星期四'},
                {id: '5', text: '星期五'}, {id: '6', text: '星期六'}, {id: '7', text: '星期日'}];
            selector.select2({
                language: 'zh-CN',
                data: week,
                allowClear: true,
                multiple: true,
                maximumSelectionLength: 12,
                minimumResultsForSearch: Infinity
            });
            selectButton.on('click', function () {
                selector.select2('open');
            });
            break;
        case '05':
            break;
        default:
            console.log('default');
            console.log(zxdw);
    }


}
function getExecuteTime2Save() {
    var selector = $('#id_input_add');
    var dataExecuteTime = [];
    var tmp = [];
    var pcdm = $('#PCDM')[0].value;
    var zxdwdm = zxdw.id;
    if (zxdw.id == '04') {
        tmp = selector.select2('data');
        for (var i = 0; i < tmp.length; ++i) {
            dataExecuteTime.push({
                LSH: guid(),
                PCDM: pcdm,
                ZXDWDM: zxdwdm,
                MONTH: '',
                DAY: '',
                WEEK: tmp[i].id,
                HOUR: ''
            });
        }
    } else if (zxdw.id == '05') {
        tmp = selector.tagsinput('items');
        for (var j = 0; j < tmp.length; ++j) {
            dataExecuteTime.push({
                LSH: guid(),
                PCDM: pcdm,
                ZXDWDM: zxdwdm,
                MONTH: '',
                DAY: '',
                WEEK: '',
                HOUR: tmp[j].text
            });
        }
    }
    else {
        tmp = selector.tagsinput('items');
        for (var k = 0; k < tmp.length; ++k) {
            var m = tmp[k].text.indexOf('日');
            var n = tmp[k].text.indexOf('月');
            dataExecuteTime.push({
                LSH: guid(),
                PCDM: pcdm,
                ZXDWDM: zxdwdm,
                MONTH: tmp[k].text.substring(0, n),
                DAY: tmp[k].text.substring(n + 1, m),
                WEEK: '',
                HOUR: ''
            });
        }
    }
    return dataExecuteTime;
}
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
function getDetails(row) {
    addExecuteTime();
    var selector = $('#id_input_add');
    $.ajax(
        {
            url: 'yyhptjcwhfwpc.do?action=details',
            type: 'GET',
            dataType: 'json',
            data: {PCDM: row.PCDM}
        }).done(function (data) {
        console.log('done');
        console.log(data);
        if (zxdw.id!='04') {
            for (var i = 0; i < data.length; ++i) {
                selector.tagsinput("add", {value: data[i], text: data[i], continent: zxdw.name})
                console.info(i)
            }
        }
        else{
            selector.select2('val',data)

        }
    }).fail(function () {
        console.log("error");
    }).always(function () {
        console.log("always complete");
    });

    var selector = $('#id_input_add');
    $.ajax(
        {
            url: 'yyhptjcwhfwpc.do?action=details',
            type: 'GET',
            dataType: 'json',
            data: {PCDM: row.PCDM},
            success:function (data) {
                if (zxdw.id!='04') {
                    for (var i = 0; i < data.length; ++i) {
                        selector.tagsinput("add", {value: data[i], text: data[i], continent: zxdw.name})
                    }
                } else{
                    selector.select2('val',data)
                }
            },
            error:function () {
                console.warn('error');
            },
            complete: function () {
                console.info('complete');
            }
        })



}