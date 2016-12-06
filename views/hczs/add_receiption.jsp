<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%--
  Created by IntelliJ IDEA.
  User: Mr.wang
  Date: 2016/10/25
  Time: 17:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>新增领用</title>
</head>
<body>
<div class="panel-body">
    <div id="gwhzDiv" class="panel panel-default">
        <div class="panel-heading" id="list-title" style="font-size:16px;color:#434343;font-weight:bold;">
            <span class="glyphicon glyphicon-th"></span> <span id="addTitle">新增领用</span>
        </div>

        <form id="addLYForm" method="post" class="form-horizontal list-font">
            <div class="form-group" style="margin:5px 0px 5px 0px;">

            </div>
            <table id="addTable" class="table-container"></table>
        </form>
    </div>
</div>
</body>
<script>
    var getdata = [];
    var pageWhole = [];
    var $addTable = $('#addTable');
    $(function () {
        initAddPage();
    })

    function initAddPage() {
        switch (wholeVar.hczsFlag) {
            case 'reception':
                initAdd4Reception();
                break;
            case 'recover' :
                initAdd4Recover();
                break;
            case 'records' :
                initAdd4Records();
        }
    }

    function initAdd4Reception() {
        pageWhole.operateType = '1';                //保存为领用；操作类型代码
        $('#addTitle').text(wholeChoose.addtitle);
        getLyData();
    }

    function initAdd4Recover() {
        pageWhole.operateType = '2';                //保存为回收；操作类型代码
        $('#addTitle').text(wholeChoose.addtitle);
        getLyData();
    }

    function initAddHSTable() {
        $addTable.bootstrapTable('destroy');
        // 初始化表格,动态从服务器加载数据
        $addTable.bootstrapTable(
                {
                    classes: 'table table-hover warning',
                    method: "get", // 使用get请求到服务器获取数据
                    contentType: "application/json",
                    iconSize: 'sm',
                    data: getdata.lydata,
                    showHeader: true,
//                    height: obj.rows.length * 32 + 34 >= 200 ? 225 : obj.rows.length * 32 + 34,
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
                    uniqueId: "LSH", // 每一行的唯一标识，一般为主键列
                    clickToSelect: true, // 是否启用点击选中行
                    showExport: true,
                    exportDataType: "basic",
                    minimumCountColumns: 2, // 最少允许的列数
                    responseHandler: function (res) {
                        console.log(res);
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
                            field: 'LYR',
                            title: '回收人',
                            formatter: formatterLyr,
                            class: 'col-md-2',
                            align: 'center'
                        },
                        {
                            field: 'MC',
                            title: '耗材名称',
                            formatter: formatterHcmc,
                            class: 'col-md-3',
                            align: 'center'
                        },
                        {
                            field: 'GG',
                            title: '规格',
                            formatter: formatterGg,
                            class: 'col-md-4',
                            align: 'center'
                        },
                        {
                            field: 'LYSL',
                            title: '回收数量',
                            formatter: formatterLysl,
                            class: 'col-md-2',
                            align: 'center'
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
    /**
     * 获取领用人信息、耗材信息
     */
    function getLyData() {
        $.ajax({
            url: "yyhpt_hczs.do?action=getLyPageData",
            type: 'post',
            dataType: 'json',
            data: {},
            success: function (res) {
                console.info('////////////////////')
                console.log(res);
                console.warn('获取领用人信息、耗材信息')
                getdata.lydata = wholeVar.selectionsData;
                getdata.hcList = res.hcList;
                getdata.currRygh = res.currRygh;
                getdata.currRyxm = res.currRyxm;
                console.group('当前登录人信息')
                console.log(getdata.currRygh)
                console.log(getdata.currRyxm)
                console.groupEnd()
                getdata.lyrList = res.lyrList;
                pageWhole.rows = wholeVar.selectionsData;
                if (wholeVar.hczsFlag == 'reception') {
                    initAddLYTable();
                } else if (wholeVar.hczsFlag == 'recover') {
                    initAddHSTable();
                }
                wnform.addOnresize($addTable, tableStaus);
            },
            error: function () {
                console.log('error')
            }
        })

    }

    function initAddLYTable() {
        $addTable.bootstrapTable('destroy');
        // 初始化表格,动态从服务器加载数据
        $addTable.bootstrapTable(
                {
                    classes: 'table table-hover warning',
                    method: "get", // 使用get请求到服务器获取数据
                    contentType: "application/json",
                    iconSize: 'sm',
                    data: getdata.lydata,
                    showHeader: true,
//                    height: obj.rows.length * 32 + 34 >= 200 ? 225 : obj.rows.length * 32 + 34,
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
                    uniqueId: "LSH", // 每一行的唯一标识，一般为主键列
                    clickToSelect: true, // 是否启用点击选中行
                    showExport: true,
                    exportDataType: "basic",
                    minimumCountColumns: 2, // 最少允许的列数
                    responseHandler: function (res) {
                        console.log(res);
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
                            field: 'LYR',
                            title: '领用人',
                            formatter: formatterLyr,
                            class: 'col-md-2',
                            align: 'center'
                        },
                        {
                            field: 'MC',
                            title: '耗材名称',
                            formatter: formatterHcmc,
                            class: 'col-md-3',
                            align: 'center'
                        },
                        {
                            field: 'GG',
                            title: '规格',
                            formatter: formatterGg,
                            class: 'col-md-4',
                            align: 'center'
                        },
                        {
                            field: 'LYSL',
                            title: '领用数量',
                            formatter: formatterLysl,
                            class: 'col-md-2',
                            align: 'center'
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
    function formatterLyr(value, row, index) {
        var selectBody = '';
        $.each(getdata.lyrList, function () {
            if (this.XM == getdata.currRyxm) {
                selectBody += "<option selected='selected' value=" + this.GH + ">" + this.XM
                        + "</option>";
            } else {
                selectBody += "<option value=" + this.GH + ">" + this.XM
                        + "</option>";
            }
        });
        return '<select class="form-control input-sm" id="LYR_' + index + '\">' + selectBody + '</select>';
    }

    function formatterHcmc(value, row, index) {
        var selectBody = '';
        $.each(getdata.hcList, function () {
            if (value == this.MC) {
                selectBody += "<option selected='selected' value=" + this.DM + ">" + this.MC
                        + "</option>";
            } else {
                selectBody += "<option value=" + this.DM + ">" + this.MC
                        + "</option>";
            }
        });

        return '<select class="form-control input-sm" id="HCMC_' + index + '\">' + selectBody + '</select>';
    }

    function formatterGg(value, row, index) {
        var ggArr = value.split(',');
        var selectBody = '';
        $.each(ggArr, function (k, v) {
            var chk = '';
            if (k == 0) {
                chk = 'checked';
            }
            selectBody += "<label class=\"  \" style=\"padding-top:0px;padding-left:5px;vertical-align: text-bottom;padding-top:10px\">"
                    + " <input type=\"checkbox\"  "
                    + " name=\""
                    + "GG_"
                    + index
                    + "\" value=\""
                    + v
                    + "\""
                    + chk
                    + " > "
                    + v
                    + "</label>";
        });
        return selectBody;
    }

    function formatterLysl(value, row, index) {
        return '<input class="form-control input-sm" onkeyup=checkNum(this) type="number" min="1" maxlength="3" value="1" id="LYSL_' + index + '\"/>'
    }
    function checkNum(obj) {
        var check = /^\d+(\.{0,1}\d+){0,1}$/;
        obj.value = obj.value.replace(!check, '');
    }
    function doReceptionSave() {
        var dataIsLegal = true;          //默认为数据合法
        var getTabData = [];
        console.group('获取将要保存的数据')

        for (var i = 0; i < pageWhole.rows.length; i++) {           //本列表中行数
            var getRowData = {};
            var lyrId = $('#LYR_' + i).find("option:selected").val();
            var lyrName = $('#LYR_' + i).find("option:selected").text();
            var hcName = $('#HCMC_' + i).find("option:selected").text();
            var hcId = $('#HCMC_' + i).find("option:selected").val();
            var lyNum = $('#LYSL_' + i).val();

            var hcgg = '';  //处理耗材规格
            $.each($('input[name=GG_' + i +']:checked'), function (k, v) {
                console.group('耗材规格处理');
                console.info(k)
                console.info($('input[name=GG_' + i +']:checked').length)
                console.groupEnd();
                if (k == $('input[name=GG_' + i +']:checked').length - 1) {
                    hcgg += $(v).val();
                } else {
                    hcgg += $(v).val() + ',';
                }
            });
            getRowData.RYGH = lyrId;
            getRowData.RYXM = lyrName;
            getRowData.HCDM = hcId;
            getRowData.HCMC = hcName;
            getRowData.GG = hcgg;
            getRowData.SL = lyNum;
            if (getRowData.GG == '') {
                wnform.toast("请选择所需耗材规格!");
                dataIsLegal = false;
                return;
            }
            getTabData.push(getRowData);
        }
        if (wholeVar.hczsFlag == 'records') {

        } else {
            saveReception(dataIsLegal, getTabData);
        }
    }

    function saveReception(dataIsLegal, getTabData) {
        if (dataIsLegal) {
            console.log(getTabData);
            console.log(JSON.stringify(getTabData));
            console.groupEnd();
            $.ajax({
                url: 'yyhpt_hczs.do?action=saveReception',
                type: 'post',
                dataType: 'json',
                data: {
                    saveData: JSON.stringify(getTabData),
                    CZLXDM: pageWhole.operateType
                },
                success: function (res) {
                    console.log(res);
                    if (res.code == "T") {
                        wnform.toast(res.message);
                        wholeVar._2ndModal.close();
                        wholeVar._1stModal.close();
                    } else {
                        wnform.toast(res.message);
                    }
                },
                error: function () {
                    console.log('error!');
                }
            })
        }
    }


</script>
</html>
