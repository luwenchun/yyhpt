<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html style="background-color: #f2f4f8;">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <link href="frame/plugins/bootstrap-fileinput/bootstrap-fileinput.css"
          rel="stylesheet" type="text/css"/>
    <style type="text/css">
        body {
            background-color: #f2f4f8;
        }

        .fileUpl {
            background: url("layouts/img/dialog/img_dir.png") no-repeat scroll right center;
            cursor: pointer;
        }

        a {
            cursor: pointer;
        }

        .my-file {
            cursor: pointer;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            filter: alpha(opacity=0);
        }
    </style>
</head>
<body>
<div class="panel" style="background-color: #f2f4f8">
    <div class="panel panel-body" style="padding: 15px;">
        <div class="" style="padding: 0 15px 0 15px;">
            <form id="dxglDxdrForm" method="post" enctype="multipart/form-data"
                  class="form-horizontal">
                <div id="rqlbDiv" class="form-group">
                    <div class="form-group">
                        <div class="col-md-4">
                            <div class="fileinput fileinput-new" data-provides="fileinput">
									<span class="btn btn-default btn-sm btn-file"> <span
                                            class="fileinput-new"> 选取文件 </span> <span
                                            class="fileinput-exists"> 重选 </span> <input type="file"
                                                                                        name="..." multiple=true>
									</span> <span class="fileinput-filename"> </span> &nbsp; <a
                                    href="javascript:;" class="close fileinput-exists"
                                    data-dismiss="fileinput"><img style="padding-top: 10px"
                                                                  src="layouts/img/control/img_close.png"/></a>
                            </div>
                        </div>

                        <label class=" col-md-2 control-label">导入年度：</label>
                        <div class="col-md-2">
                            <input id="input_drnd" class="col-md-8 input-xs from-control"
                                   style="border: 0px; border-bottom: 1px solid silver;" disabled="disabled">
                        </div>
                        <div class="pull-right" id="rwglList_btnDiv">
                            <button id="template" type="button"
                                    class="btn btn-default btn-sm">模板
                            </button>
                            <button id="import" type="button" class="btn btn-default btn-sm">导入
                            </button>
                            <button id="save" type="button" class="btn btn-default btn-sm">保存</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!-- 导入文件列表 开始-->
    <div id="content" class=""></div>

    <table id="table" class="table-container"></table>
</div>
<script src="frame/plugins/bootstrap-fileinput/bootstrap-fileinput.js"
        type="text/javascript"></script>

<script type="text/javascript">

    $(function () {
//        deleteNotSaved();
        getImpHistory();
        var myDate = new Date();
        var drnd = myDate.getFullYear();
        $('#input_drnd').val(drnd);
        initButtons();
    });


    function getImpHistory() {
        $.ajax({
            url: 'personal_info.do?action=getImpHistory',
            type: 'post',
            data: {},
            dataType: 'json',
            success: function (data) {
            	console.log(data);
                var history = data.rows;
                showHtml(history);
            }
        });
    }
    


    function readExcel() {
        var drnd = $('#input_drnd').val();
        if (drnd == 'undefined' || drnd == '') {
            $.toaster({
                priority: 'warning',
                title: '提示',
                message: '导入年度不能为空!'
            });
        } else {
            var formData = new FormData($('#dxglDxdrForm')[0]);
            console.log('formdata');
            console.log(formData);
            // 阻止默认的表单提交
            event.preventDefault();
            $.ajax({
                url: 'personal_info.do?action=upload' + '&drnd=' + drnd,
                type: 'POST',
                data: formData,
                dataType: 'json',
                contentType: false,
                processData: false,	
                beforeSend : function(xhr) {
        			wn.showLoading();
        		},
                success: function (result) {
        		    console.log(result);
                    var res = result.res;
                    var repeat = result.repeatInfos;
                    if (res.code == 'T') {
                        getImpHistory();
                        wnform.toast(res.message);
                    } else {
                        getImpHistory();
                        wnform.toast(res.message);
                    }
                },
                error: function (res) {
                    wnform.toast('导入失败!');
                },
        		complete : function(xhr) {
        			wn.hiddenLoading();
        		}
            });
        }
    }

    function saveDxdr() {
        var drnd = $('input_drnd').val();
        console.log('input_drnd===>' + drnd)
        console.log('save click')
        $.ajax({
            url: 'personal_info.do?action=saveDrdx',
            type: 'post',
            dataType: 'json',
            data: {drnd: drnd},
            success: function (res) {
                console.log('+++++++++++++++++++res++++++++++++++++++++++==');
                console.log(res);
                if (res.code == 'T') {
//                    getImpHistory();
                    wnform.toast(res.message);
                    dialog.close();
                } else {
                    wnform.toast(res.message);
                }
            },
            error: function () {
                console.log('error!')
            }
        });
    }

    function showHtml(obj) {
        console.log('===>showHtml:' + obj)
        var html = '';

        for (var i = 0; i < obj.length; i++) {
            html += '<div id="' + obj[i].RZLSH + '" class="panel panel-body" style="clear: both;"><div class="col-md-8"><div class="col-md-12">'
                    + '<div class="col-md-6"><label id="drwjmc" style="font-weight:bold;font-size:15px;" class="control-label">'
                    + obj[i].WJMC
                    + '</label></div><div class="col-md-1">'
                    + '<label id="drnd" style="font-weight:bold;font-size:15px;" class="control-label">'
                    + ((obj[i].DRND == null) ? "" : (obj[i].DRND))
                    + '</label></div></div> <div class="col-md-12">'
                    + '<div id="drsj" class="col-md-5" style="display: block;">'
                    + obj[i].XT_DJSJ
                    + '</div><div class="col-md-7">'
                    + '<label id="drzt" class="col-md-offset-8 col-md-4 control-label">'
                    + ((obj[i].SCZT == '0') ? "导入未保存" : "导入已保存") + '</label></div></div><div class="col-md-12">'
                    + '<div class="col-md-6" id="jgmc">'
                    + obj[i].XT_DJJGMC
                    + '</div><div class="col-md-4" id="czry">'
                    + obj[i].XT_DJRYXM
                    + '</div></div>'
                    + '</div><div class="col-md-1" style="float: left;"><div class="col-md-12"><div class="col-md-6"><p><img src="layouts/img/dialog/img_renqun.png">'
                    + '</p></div></div></div><div class="col-md-2 col-md-offset-1 row"><div class="col-md-12"><p><br></p></div>'
                    + '<div style="display: inline;"><div class="col-md-5"><a id="jlzs" onclick="seeDetails(\''
                    + obj[i].RZLSH
                    + '\')">'
                    + obj[i].JLS
                    + '</a></div><div class="col-md-7">'
                    + '<a id="delete" onclick="delRecords(\''
                    + obj[i].RZLSH
                    + '\')"">删除</a></div></div></div></div>';
        }
        $("#content").html(html);
    }

    function delRecords(rzlsh) {
        console.log(rzlsh)
        $
                .ajax({
                    url: 'personal_info.do?action=delRecords',
                    type: 'post',
                    dataType: 'json',
                    data: {
                    	rzlsh: rzlsh
                    },
                    success: function (data) {
                        if (data.code == 'T') {
                        	wnform.toast(data.message);
                            //document.getElementById('' + rzlsh + '').style.visibility = "hidden";
                            getImpHistory();
                        } else {
                        	wnform.toast(data.message);
                        }
                        console.log(data)
                    },
                    error: function () {
                        console.log('delRecords error');
                    }
                });
    }

    function seeDetails(rzlsh) {
        BootstrapDialog.show({
            title: '民政导入明细',
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,
            draggable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: $('<div></div>').load(
                    'yyhpt/views/dxgl/dxgl_mzdr_list.jsp'),
            buttons: [{
                label: '导出',
                cssClass: 'btn-default btn-sm',
                action: function (dialogItself) {

                }
            }, {
                label: '关闭',
                cssClass: 'btn-default btn-sm',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }],
            onshow: function (dialogRef) {

            },
            onshown: function (dialogRef) {
                initTable(dialogRef, rzlsh);
                
                //					seeDetails(fileName);
            },
            onhide: function (dialogRef) {
                // $(this).removeData("bs.modal");
            },
            onhidden: function (dialogRef) {
                // $(this).removeData("bs.modal");
            }
        });
    }

    function initButtons() {
        $('#import').bind('click', function () {
            readExcel();
        });

        $('#save').bind('click', function () {
            saveDxdr();
        });

    }

</script>

</body>

</html>