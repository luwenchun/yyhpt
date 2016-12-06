<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title></title>

    <link href="layouts/css/white/detail_page.css" rel="stylesheet">
    <!-- <link href="frame/plugins/bootstrap-fileinput/bootstrap-fileinput.css"
        rel="stylesheet" type="text/css" /> -->
    <link
            href="frame/plugins/bootstrap-fileinput/bootstrap-fileinput-mulitple.css"
            rel="stylesheet" type="text/css"/>
    <style type="text/css">
        .fwglFwdjSaveBtn {
            display: none;
        }

        .fwglFwdjExistBtn {
            display: none;
        }

        .modal-footer {
            border-top: 0px solid #e5e5e5;
        }

        #fwgllbTable thead tr {
            background-color: #21B7C6;
            color: #ffffff;
        }

        .control-label-left {
            text-align: right;
            font-size: 14px;
            font-weight: bold;
        }

        input[type="checkbox"] {
            -webkit-appearance: none;
            display: inline-block;
            *display: inline;
            vertical-align: middle;
            margin: 0;
            padding: 0;
            width: 16px;
            height: 16px;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAQCAYAAADeWHeIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzQ0MzI5MzQ0RTQ4MTFFNkE5QzhGMEU2MjRFRTg2MzQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzQ0MzI5MzM0RTQ4MTFFNkE5QzhGMEU2MjRFRTg2MzQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNUQwNTI2QjRFNDgxMUU2OTA1NkM2ODg0MTlEMjc2NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNUQwNTI2QzRFNDgxMUU2OTA1NkM2ODg0MTlEMjc2NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Phb/p/UAAAP2SURBVHja7JlLaBNBGMdnN6V51BdW2nrwINSi1VqqGPVoq9UKPsCDgicPHhR8Vr3YooLiq7ZaRQQPHlQQUfABKhaqF99oqVaFWjzopQbTojWvYhL/E/+RYU3abEh3EfuHH/PY+fbLzM7OfDvR3vd87BZClAgTijs9vfpAX9nEc/UCaTfKpuxd8Z+933Vn2dmxVQJpN8qm7KFeUMa86d9P+wq//2tkydJlYlH1YtHf3yfrZ4CDoByMZ9vv4C1oAO/Zf9lvwf4nytQUsBms5D2k3oFb4Cz4zP7Lfgv2P1GmMvI/hDLyL3XsyOFEmgemCfMaq+T/SftwOOQqKiqOzJxVIQKBgKzbAlpBO2gEz9h2PtjEgdwKTqe553pwHrgN9eVkG9gILqext8W/DgayGMCBNPnhFFBmdTb2OfMfDodjlVVVori4RAwORnZw8FeBGnCNb8tn5mv4Vsk2O1Lcdx24xMG/CWqBRmpZ52abdSnsbfOvC+u0kJ2Qcgrr9cc/HrizsHCSNqtitggGg6WoagbLuVSm021Qx7alSn2R8lbJZXo1aFOut7GugeXLtEnKVv9WTYDt4CnoYjnf4of/l3+HwxHVdV1Eo9ETXHbvZnCfe2x7QqnbyXGU9odY1wT6SRPrDrGNTpukbPVvxQQ4A04xf9GwFAu7/Mfj8RAevtA0rRLlkybuJ9tWKuU1TPcn4ytQDyYQmT/Oa/sMNoL3ss1/LiZAbIhr7QxuBKPb2gxsrPIf474ot6NXJvy95ArmUZZwqefKfm7UNqYvDDYem/3nZAI4lQE+oNR/AiuYXwv2Kte0HE4Au/1n9OUs7FVa/7mYAC6mjVyGtvPbfDEIAi+4MoKdy9a/7HsIRMAcE/7myjiS95bqYepl2pLCppXpPINN0Gb/OZkAP5g+AQ7ut9PBBzAV3B/h2Z2Vf+z9bgSCArFAJyeNmYCyUylfN+zBexikfSMyv9vQ5rpib6v/XMYAC8BjMI5LjnwIj5QTrZFSVv4RADpisZjAJJBBUjU/sYZTHdvWK3XN/A11yjazSwnCdrFuLz/1YrRJylb/uZgA6n7qZZBylEHJZAv2N9P+8/Odwu//Gu9681p4PJ4efhbdUc4pUmkl2+xUl1DIx1O4ZBxyUwk2BfM3eC15YudTrtvqP89wrJrNUazRvpTLULb2lvh3uVx6Z0eHkEfBBQVjWgYHIyEO3gPx+9z8GV8QL49iFzE9l+J+V/hmXeCDSvUg5Z69AVxNca2F8Yjl/vO4V2bzZ0pS/6S9y+UO+3xfxNuuN4k/gzAB5MA+5IHJQW4lGvdR+WeMPE8f6s+Yq4xDMvozJoVs8a8hCBKj+n+ljw7B/61fAgwAFlec+twaaU8AAAAASUVORK5CYII=) no-repeat 0 0;
            border: none;
            cursor: pointer;
        }

        input[type="checkbox"]:checked {
            background-position: -15px 0;
        }

        input[type="checkbox"]:focus,
        input[type="checkbox"]:hover {

        }

        input[type="checkbox"][disabled] {
            background-position: -44px 0;
        }

        input[type="checkbox"][disabled]:checked {
            background-position: -66px 0;
        }

        @media ( max-width: 768px) {
            .control-label {
                text-align: left;
            }
        }
    </style>
</head>
<body>
<form id="fwdjForm" method="post" class="form-horizontal"
      style="font-size: 13px;" enctype="multipart/form-data">
    <div class="form-body">
        <div class="col-lg-2 col-md-2"
             style="border: 1px solid #21B7C6; height: 453px; background-color: white; padding-right: 0px; padding-left: 0px; overflow: auto; display: none;">
            <table id="fwgllbTable" class="table-container"></table>
        </div>
        <div class="col-lg-12 col-md-12" style="background-color: white;">
            <div class="form-group">
                <label class="col-md-2 col-sm-2 control-label">姓名：</label>
                <div class="warning col-md-4 col-sm-10">
                    <p id="XM" class="form-control-static"></p>
                </div>
                <label class="col-md-2 col-sm-2 control-label">家庭住址：</label>
                <div class="warning col-md-4 col-sm-10"
                     style="padding-bottom: 2px;">
                    <p id="JTDZ" class="form-control-static"></p>
                </div>
            </div>

            <div class="form-group">
                <label class="col-md-2 col-xs-5 col-sm-2 control-label">开始时间：</label>
                <div
                        class="col-md-4 col-xs-12 col-sm-10 input-group input-group-sm date form_datetime"
                        data-date=""
                        style="padding: 0px 15px 0px 15px; float: left; margin-bottom: 5px;">
                    <input type="text" class="form-control datetime" id="KSSJ" name="KSSJ"
                           value="" readonly style="background-color: white;"> <span
                        class="input-group-addon"><span
                        class="glyphicon glyphicon-time"></span></span>
                </div>
                <label class="col-md-2 col-xs-5 col-sm-2 control-label">结束时间：</label>
                <div
                        class="col-md-4 col-xs-12 col-sm-10 input-group input-group-sm date form_datetime"
                        style="padding: 0px 15px 0px 15px; float: left; margin-bottom: 5px;">
                    <input type="text" class="form-control datetime" id="JSSJ" name="JSSJ"
                           value="" readonly style="background-color: white;"> <span
                        class="input-group-addon"><span
                        class="glyphicon glyphicon-time"></span></span>
                </div>
            </div>

            <div class="form-group">
                <label class="col-md-2 col-sm-2 control-label">服务地址：</label>
                <div class="warning col-md-10 input-group input-group-sm"
                     style="padding: 0px 15px 0px 15px; margin-bottom: 5px;">
                    <input type="text" class="form-control input-sm" id="FWDZ"
                           name="FWDZ" maxlength="100" placeholder=""> <span
                        class="input-group-addon" style="border-width: 0px"> <img
                        style="cursor: pointer;" onclick="showDz();"
                        src="layouts/img/dialog/icon_address.png"/></span>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 col-sm-2 control-label">附件：</label>

                <div id="fileDiv" class="col-md-10 col-sm-10">

                    <%-- <div id="fjdzDiv" class="fileinput fileinput-new" data-provides="fileinput">
                        <span class="btn btn-default btn-sm btn-file">
                            <span id="xqfile1" class="fileinput-new"> 选取文件 </span>
                            <span class="fileinput-exists"> 重选 </span>
                            <input type="file" name="fileInput" > multiple=true
                        </span>
                        &nbsp;<span class="fileinput-filename"></span> &nbsp;
                        <a href="javascript:;" class="close fileinput-exists" data-dismiss="fileinput">
                            <img style="padding-top: 0px" src="layouts/img/control/img_close.png" />
                        </a>
                    </div> --%>
                </div>
            </div>

            <div class="form-group">
                <label class="col-md-2 col-sm-2 control-label" style="font-weight:bold">执行人：</label>
                <div class="warning col-md-4 col-sm-10">
                    <select class="form-control input-sm" id="fwrygh" name="fwryxm"></select>
                    <%--<p id="ryxm" class="form-control-static" style="font-weight:bold"></p>--%>
                </div>
            </div>

            <input type="text" class="form-control   input-sm hidden"
                   id="FWJLLSH" name="FWJLLSH" placeholder="用于绑定服务记录流水号"/> <input
                type="text" class="form-control   input-sm hidden" id="YNGRBSH"
                name="YNGRBSH" placeholder="用于绑定域内个人标识号"/>

            <div id="djTableDiv" style="height: 250px;margin-top: 10px;">
                <table id="fwxmmxTable" class="table-container"></table>
            </div>
            <div style="float: right; margin-top: 30px; padding-bottom: 5px;">
                <button id="btn_Save" class="btn btn-default btn-sm">保存</button>
                <button id="btn_Exist" class="btn btn-default btn-sm">退出</button>
            </div>
        </div>
    </div>
</form>
<script type="text/javascript">

    function showDz() {
        try {
            android.toShow();
        } catch (e) {
            wnform.toast('定位操作仅适用于移动端！');
        }

    }

    function SetFwDz(Dwdz) {
        try {
            $('#FWDZ').val(Dwdz);
        } catch (e) {
            wnform.toast('定位失败！');
        }

    }
</script>
<script src="yyhpt/pages/rwgl/fwglFwdj.js" type="text/javascript"></script>
<%--<script src="frame/plugins/bootstrap-fileinput/bootstrap-fileinput.js" type="text/javascript"></script>--%>
<script
        src="frame/plugins/bootstrap-fileinput/bootstrap-fileinput-mulitple.js"
        type="text/javascript"></script>
</body>
</html>