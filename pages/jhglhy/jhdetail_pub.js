var xmhcrows = [];


function checkNum(obj) {
    var check = /^\d+(\.{0,1}\d+){0,1}$/;
    obj.value = obj.value.replace(!check, '');
}


function setHcTable() {
    var money_hc = 0;
    $.each(xmhcrows, function (k, v) {
        if (v.JLLXDM == '1') {
            $('input[name=' + v.HCDM + '][value=' + v.HCDM + ']').prop('checked', true);
        }
        if (v.XZGG != null) {
            var xzggArray = v.XZGG.split(',');  //toUpperCase().

            for (var i = 0; i < xzggArray.length; i++) {
                $('input[name=' + v.HCDM + "_GG" + '][value=' + xzggArray[i] + ']').prop('checked', true);


            }
        }

        // if(xmhcrows[k].DJ){
        //     xm_money+=parseFloat(xmhcrows[k].DJ) * parseInt(xmhcrows[k].SL);
        // }

    });
    wn.iCheckInit();

    return money_hc;
}

/*
 计算项目、耗材合计值 fx
 */
function setJhhj_money() {
    var money_xm = 0;
    var money_hc = 0;
    $.each(obj.rows, function (k, v) {
        if (v.FWHJ == '0.0' || v.FWHJ == '') {

        } else {
            money_xm += parseFloat(v.FWHJ);
        }
    });
    $('#money_xmhj').html(money_xm + '元');

    $.each(xmhcrows, function (k, v) {
        if (v.JLLXDM == "1")
            money_hc += v.HCSL * v.HCDJ;
    });
    $('#money_hchj').html(money_hc + '元');

    $('#money_sum').html((money_xm + money_hc) + '元');
}

//绑定新增耗材事件
$("#btn_jhzd_addhc").bind("click", function (dialog) {
    if (obj.rows.length == 0) {
        wnform.toast('请先选择项目!');
        return false;
    } else {
        BootstrapDialog.show({
            title: '新增医用耗材',
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load('yyhpt/views/jhglhy/fwxmhcAdd.html'),
            onshow: function (dialogRef) {
            },
            onshown: function (dialogRef) {
                hcdialog = dialogRef;
            },
            onhide: function (dialogRef) {
            },
            onhidden: function (dialogRef) {
                // initTable1();
                initTables();
            }
        });
    }

});

/*
 耗材数量修改事件 fx
 */
function setFwhcRow(objThis, i) {
    xmhcrows[i]["HCSL"] = objThis.value;
    xmhcrows[i]["HCJE"] = objThis.value * xmhcrows[i]["HCDJ"];
    $("#table_fwjhzd1").bootstrapTable('updateRow', {
        index: i,
        row: {
            HCSL: objThis.value,
            HCJE: xmhcrows[i]["HCJE"]
        }
    });
    setJhhj_money();
    setHcTable();
    bindAllcheck();

}


function setFwscRow(objThis, i) {
    var xmtable = tablesobj();
    xmtable.bootstrapTable('updateRow', {
        index: i,
        row: {
            FWSL: objThis.value,
            FWHJ: objThis.value * obj.rows[i].FWDJ
        }
    });
    setJhhj_money();
    bindAllcheck();
    wn.iCheckInit();
}


/*
 绑定耗材选择控件事件  fx
 */

function jhzd_checkbind() {
    //选中进行记录，未选中移除
    $(".hcgg").on('ifChecked', function (event) {
        var checkGG = this.value;
        var checkDM = this.name;
        for (var i = 0; i < arrCount(xmhcrows); i++) {
            if (xmhcrows[i]["HCDM"] + "_GG" == checkDM) {          //处理选中值
                var xzggs = xmhcrows[i]["XZGG"].split(",");
                if (arrCount(xzggs) > 0) {
                    if (xzggs[0] == "")
                        xmhcrows[i]["XZGG"] = checkGG;
                    else {
                        xzggs.push(checkGG);
                        xmhcrows[i]["XZGG"] = xzggs.join(",");
                    }
                }

                $("input[value='" + xmhcrows[i]["HCDM"] + "'][name='" + xmhcrows[i]["HCDM"] + "']").iCheck('check');
                xmhcrows[i]["JLLXDM"] = "1";

                break;
            }

        }
    });

    $(".hcgg").on('ifUnchecked', function (event) {
        var checkGG = this.value;
        var checkDM = this.name;
        for (var i = 0; i < arrCount(xmhcrows); i++) {
            if (xmhcrows[i]["HCDM"] + "_GG" == checkDM) {          //处理取消值
                var xzggs = xmhcrows[i]["XZGG"].split(",");
                for (var k = 0; k < arrCount(xzggs); k++) {
                    if (xzggs[k] == checkGG)
                        xzggs.splice(k, 1);
                }
                if (xzggs.length == 0) {
                    $("input[value='" + xmhcrows[i]["HCDM"] + "'][name='" + xmhcrows[i]["HCDM"] + "']").iCheck('uncheck');
                    xmhcrows[i]["JLLXDM"] = "0";
                }
                xmhcrows[i]["XZGG"] = xzggs.join(",");
                break;
            }

        }
    });

    $(".hcxz").on('ifChecked', function (event) {
        var checkDM = this.name;
        for (var i = 0; i < arrCount(xmhcrows); i++) {
            if (xmhcrows[i]["HCDM"] == checkDM) {          //处理选中值
                xmhcrows[i]["JLLXDM"] = "1";
                setJhhj_money();
                break;
            }
        }
    });

    $(".hcxz").on('ifUnchecked', function (event) {
        var checkDM = this.name;
        for (var i = 0; i < arrCount(xmhcrows); i++) {
            if (xmhcrows[i]["HCDM"] == checkDM) {          //处理选中值
                xmhcrows[i]["JLLXDM"] = "0";
                setJhhj_money();
                break;
            }

        }
    });
}


/*
 这个函数的目的是什么？
 */
function initHcTable() {
    // 拼接耗材代码
    $.each(obj.xmhcInfo, function (k, v) {
        var xmhcObj = {
            HCDM: "",
            HCDW: "",
            GG: "",
            HCMC: '',
            SL: '',
            DJ: '',
            JLLXDM: '',
            HCSL: '',
            XZGG: '',
            HCGG: '',
            HCDJ: '',
            HCJE: ''
        };
        xmhcObj.HCDM = v.HCDM;
        xmhcObj.HCMC = v.HCMC;
        xmhcObj.HCDW = v.HCDW;
        xmhcObj.GG = v.GG;
        xmhcObj.HCMC = v.HCMC;
        xmhcObj.SL = v.SL;
        xmhcObj.DJ = v.DJ;
        xmhcObj.JLLXDM = v.JLLXDM;
        xmhcObj.HCSL = v.HCSL;
        xmhcObj.XZGG = v.XZGG;
        xmhcObj.HCGG = v.HCGG;
        xmhcObj.HCDJ = v.HCDJ;
        xmhcObj.HCJE = v.HCJE;

        if (v.HCDM != null) {
            xmhcrows.push(xmhcObj);
        }
    });
    if (arrCount(xmhcrows)) {
        var hcdmArray = [];
        for (var i = 0; i < arrCount(xmhcrows); i++) {
            hcdmArray[i] = xmhcrows[i].HCDM;
        }
        hcdmArray = unique(hcdmArray);
        xmhcrows = [];
        for (var i = 0; i < arrCount(hcdmArray); i++) {
            $.each(obj.xmhcInfo, function (k, v) {
                if (v.HCDM === hcdmArray[i]) {
                    xmhcrows.push(v);
                    return false;
                }
            });
        }
    }
}


function initTable1() {
    initHcTable();

    //先销毁表格
    $("#table_fwjhzd1").bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    $("#table_fwjhzd1").bootstrapTable({
        classes: 'table table-hover warning',
        data: xmhcrows,
        contentType: "application/json",
        iconSize: 'sm',
        showHeader: true,
        height: xmhcrows.length * 47 + 34 >= 282 ? 235 : xmhcrows.length * 47 + 34,
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
        uniqueId: "JHMXLSH", // 每一行的唯一标识，一般为主键列
        clickToSelect: true, // 是否启用点击选中行
        showExport: true,
        exportDataType: "basic",
        minimumCountColumns: 2, // 最少允许的列数
        responseHandler: function (res) {
            dictData = res.dict;
            return res;
        },
        queryParamsType: "undefined",
        showPaginationSwitch: false,
        queryParams: function queryParams(params) { // 设置查询参数
            var param = {
                currPage: params.pageNumber,
                pageSize: params.pageSize,
                djlsh: djlsh,
                jhlsh: jhlsh,
                yngrbsh: yngrbsh
            };
            return param;
        },
        columns: [
            {
                field: 'HCMC',
                title: '耗材',
                valign: 'middle',
                align: 'center',
                formatter: function (value, row, index) {
                    var hc = row.HCMC;
                    hc = "<lable><input type='checkbox'  class='hcxz' name=" + row.HCDM + " value=" + row.HCDM + ">" + row.HCMC + "</lable>";
                    return hc;
                }
            },
            {
                field: 'HCGG',
                title: '规格',
                align: 'center',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row, index) {
                    var nv = row.HCGG;
                    var ggArray = [];
                    ggArray = nv.split(",");
                    var a = '';
                    for (var i = 0; i < ggArray.length; i++) {
                        a += "<lable><input type=\"checkbox\" class='hcgg'  name='" + row.HCDM + "_GG" + "'  value='" + ggArray[i] + "'>" + ggArray[i] + "</lable>";
                    }
                    return a;
                }
            },
            {
                field: 'HCDJ',
                title: '单价(元)',
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'HCSL',
                title: '数量',
                align: 'center',
                valign: 'middle',
                width: '70px',
                formatter: function (value, row, index) {
                    // 适配数量
                    /*     if (row.HCSL) {
                     value = row.HCSL;
                     }*/
                    var id = "isEdit" + index;
                    return '<input type="number"  onkeyup="checkNum(this)"  onBlur="setFwhcRow(this,' + index + ');" class="form-control  input-sm " text_aline="center" value=' + value + ' min=1  name="slEdit" id=\"' + id + '\" placeholder="数量"/ maxlength="3">';
                }
            },
            {
                field: 'HCJE',
                title: '金额(元)',
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'CZ',
                title: '操作',
                align: 'center',
                valign: 'middle',
                visible: showczBtn && jhshztjl != '1',
                events: {
                    'click .deletehc': function (e, value, row, index) {
                        deleteHcInfo(row, index);
                    }
                },
                formatter: function (value, row, index) {
                    return '<a class="deletehc"  href="javascript:void(0)"><img src="layouts/img/table/icon_deldata.png"> </a>';
                },
            }],
        onLoadSuccess: function (data) { // 加载成功时执行
        },
        onLoadError: function () { // 加载失败时执行
        },
        onCheck: function (row) {
        },
        onUncheck: function (row) {
        }
    });

    setHcTable();
    bindAllcheck();

    //  $('#money_hchj').html(setHcTable() + '元');
    //  $('#money_sum').html(parseFloat($('#money_xmhj').html()) + parseFloat($('#money_hchj').html()) + '元');
}


function deleteHcInfo(row, index) {
    BootstrapDialog.show({
        title: '提示信息',
        message: '是否删除？',
        buttons: [{
            label: '确定',
            action: function (dialog) {
                for (var i = 0; i < obj.xmhcInfo.length; i++) {
                    if (obj.xmhcInfo[i] == row) {
                        obj.xmhcInfo = removeElement(obj.xmhcInfo, i);//删除方法
                    }
                }
                initTables();
                dialog.close();
            }
        }, {
            label: '取消',
            action: function (dialog) {
                dialog.close();
            }
        }]
    });
}


function deleteInfo(row, index) {
    BootstrapDialog.show({
        title: '提示信息',
        message: '是否删除？',
        buttons: [{
            label: '确定',
            action: function (dialog) {
                for (var i = 0; i < obj.rows.length; i++) {
                    if (obj.rows[i] == row) {
                        obj.rows = removeElement(obj.rows, i);//删除方法
                    }
                }
                initTables();
                dialog.close();
            }
        }, {
            label: '取消',
            action: function (dialog) {
                dialog.close();
            }
        }]
    });
}
