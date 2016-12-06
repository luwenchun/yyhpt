var selectForm;
//选择的业务项目
var selectedServiceItem;
function initTable() {
    var table = $('#ywxmtable');
    // 先销毁表格
    table.bootstrapTable('destroy');
    // 初始化表格,动态从服务器加载数据
    table.bootstrapTable(
        {
            classes: 'table table-hover warning',
            method: "get", // 使用get请求到服务器获取数据
            url: "yyhptjcwhfwxm.do?action=ywxmsSelect", // 获取数据的Servlet地址
            contentType: "application/json",
            iconSize: 'sm',
            showHeader: true,
            striped: true, // 表格显示条纹
            pagination: false, // 启动分页
            pageSize: 1000, // 每页显示的记录数
            pageNumber: 1, // 当前第几页
            pageList: [2], // 记录数可选列表
            search: false, // 是否启用查询
            showColumns: false, // 显示下拉框勾选要显示的列
            showRefresh: false, // 显示刷新按钮
            onlyInfoPagination: false,
            sidePagination: "server", // 表示服务端请求
            uniqueId: "YWXMMC", // 每一行的唯一标识，一般为主键列
            clickToSelect: true, // 是否启用点击选中行
            minimumCountColumns: 2, // 最少允许的列数
            responseHandler: function (res) {
                dictData = res;
                return res;
            },
            queryParamsType: "undefined",
            showPaginationSwitch: false,
            queryParams: function queryParams(params) { // 设置查询参数
                var param = {
                    currPage: params.pageNumber,
                    pageSize: params.pageSize,
                    YWXMMC: $("#ywxmmcQuery").val()
                };
                return param;
            },
            columns: [
                {
                    title: '序号',
                    formatter: function (value, row, index) {
                        return index + 1;
                    }
                },
                {
                    field: 'YWXMDM',
                    title: '业务项目代码'

                },
                {
                    field: 'YWXMMC',
                    title: '业务项目名称'
                }],
            onLoadSuccess: function () { // 加载成功时执行
            	console.log("dictData:"+dictData)
            },
            onLoadError: function () { // 加载失败时执行
            	alert("failed!")
            },
            onCheck: function (row) {
                $("#remove").attr("disabled", false);
            },
            onUncheck: function (row) {
                // alert(row.id);
            }
        });
}
selectForm = function () {

    // basic validation  1=新增 2=修改
    var submitSelect = function (t, flag) {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

        var form1 = $('#detailForm');

        form1.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",  // validate all fields including form hidden input
            messages: {},
            rules: {},

            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            invalidHandler: function (event, validator) { //display error alert on form submit
                $('.alert-danger', $('.form-horizontal')).show();
            },


            success: function (label) {
                label
                    .closest('.form-group').removeClass('has-error'); // set success class to the control group
            },

            submitHandler: function (form) {
                var obj = tempFwxm.fwxms;
                var xyy = {"ywxmdm": "0005", "ywxmmc": "xxxx"};
                obj.push(xyy);
                t.close();
                LoadContent(2);
            }
        });
    };


    return {
        //main function to initiate the module
        init: function (t, flag) {
            submitSelect(t, flag);

        }

    };

}();


jQuery(document).ready(function () {
	initTable();
	if (flag == 2) {// 修改
        setControlValue(editRow);
    }
     saveForm.init(t);
});