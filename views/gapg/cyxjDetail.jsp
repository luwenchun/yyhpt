<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <link href="frame/css/extra.css" rel="stylesheet">
    <link href="frame/css/components.min.css" rel="stylesheet" type="text/css"/>
    <script src="yyhpt/pages/gapg/cyxjDetail.js" type="text/javascript"></script>
    <script>
        var rybm = '<%=session.getAttribute("rybm")%>';
    </script>
    <style type="text/css">
        .choose-date {
            background: white url("layouts/img/control/img_rl.png") no-repeat scroll right center;
            cursor: pointer;
        }

        .form-horizontal .form-group {
            margin-right: -15px;
            margin-left: 0px;
        }

        .row {
            margin-right: 15px;
            margin-left: -15px;
        }

        .list-row-space {
            margin: 3px 0 3px 0;
        }

        /*小屏幕时lable的样式*/
        .control-label-new {
            padding-top: 6px;
            text-align: right;
            /*padding-left: 0px;*/
        }
    </style>
</head>
<body>
<div id="defaultForm" class="form-horizontal" style="font-size: 13px;">
    <!-- 个人基本信息开始-->
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#grxxcontent" id="collapse1">
                <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                    <span class="glyphicon glyphicon-th"></span> 个人信息
                </h3>
            </a>
        </div>
        <div id="grxxcontent" class="form-horizontal panel-collapse collapse in" style="margin-bottom: 8px">
            <div class="form-group nopadding" style="margin-top: 6px">
                <div class="col-md-3">
                    <label class="control-label control-label-new col-md-6 col-xs-4">姓名：</label>
                    <div class="col-md-6">
                        <p id="xm" class="form-control-static"></p>
                    </div>
                </div>
                <div class="col-md-4 col-xs-12">
                    <label class="col-md-6 col-xs-4 control-label control-label-new">性别：</label>
                    <div class="col-md-6">
                        <p id="xb" class="form-control-static"></p>
                    </div>
                </div>
                <div class="col-md-5 col-xs-12">
                    <label class="col-md-6 col-xs-4  control-label control-label-new">出生日期：</label>
                    <div class="col-md-6">
                        <p id="csrq" class="form-control-static"></p>
                    </div>
                </div>
            </div>
            <div class="form-group nopadding">

                <div class="col-md-3">
                    <label class="control-label control-label-new col-md-6 col-xs-4">科室：</label>
                    <div class="col-md-6">
                        <p id="ks" class="form-control-static"></p>
                    </div>
                </div>
                <div class="col-md-4 col-xs-12">
                    <label class="col-md-6 col-xs-4 control-label control-label-new">入院时间：</label>
                    <div class="col-md-6">
                        <p id="rysj" class="form-control-static"></p>
                    </div>
                </div>
                <div class="col-md-5 col-xs-12">
                    <label class="col-md-6 col-xs-4  control-label control-label-new">出院时间：</label>
                    <div class="col-md-6">
                        <p id="cysj" class="form-control-static"></p>
                    </div>
                </div>

                <%--<div class="col-md-4 col-xs-12">
                    <label class="col-md-6 col-xs-4 control-label control-label-new">床号：</label>
                    <div class="col-md-6">
                        <p id="ch" class="form-control-static"></p>
                    </div>
                </div>
                <div class="col-md-4 col-xs-12">
                    <label class="col-md-6 col-xs-4  control-label control-label-new">住院号：</label>
                    <div class="col-md-6">
                        <p id="zyh" class="form-control-static"></p>
                    </div>
                </div>--%>

            </div>

          <%--  <div class="form-group nopadding">
                    <div class="col-md-4">
                        <label class="control-label control-label-new col-md-6 col-xs-4">入院时间：</label>
                        <div class="col-md-6">
                            <p id="rysj" class="form-control-static"></p>
                        </div>
                    </div>
                    <div class="col-md-4 col-xs-12">
                        <label class="col-md-6 col-xs-4 control-label control-label-new">出院时间：</label>
                        <div class="col-md-6">
                            <p id="cysj" class="form-control-static"></p>
                        </div>
                    </div>
            </div>--%>
        </div>
    </div>
    <!-- 个人基本信息结束 -->

    <!--门诊诊断 开始-->
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#mzzdcontent" id="collapse2">
                <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                    <span class="glyphicon glyphicon-th"></span> 门诊诊断
                </h3>
            </a>
        </div>
        <div id="mzzdcontent" class="form-horizontal panel-collapse collapse in" style="margin-bottom: 8px">
            <div class="form-group nopadding" style="margin-top: 6px">
                <div class="col-md-12">
                    <input type="text" class="form-control" id="id_mzzd" placeholder="">
                </div>
            </div>
        </div>
    </div>
    <!--门诊诊断 结束-->

    <!--入院诊断 开始-->
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#ryzdcontent" id="collapse3">
                <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                    <span class="glyphicon glyphicon-th"></span> 入院诊断
                </h3>
            </a>
        </div>
        <div id="ryzdcontent" class="form-horizontal panel-collapse collapse in" style="margin-bottom: 8px">
            <div class="form-group nopadding" style="margin-top: 6px">
                <div class="col-md-12">
                    <input type="text" class="form-control" id="id_ryzd" placeholder="">
                </div>
            </div>
        </div>
    </div>
    <!--入院诊断 结束-->

    <!--出院诊断 开始-->
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#cyzdcontent" id="collapse4">
                <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                    <span class="glyphicon glyphicon-th"></span> 出院诊断
                </h3>
            </a>
        </div>
        <div id="cyzdcontent" class="form-horizontal panel-collapse collapse in" style="margin-bottom: 8px">
            <div class="form-group nopadding" style="margin-top: 6px">
                <div class="col-md-12">
                    <input type="text" class="form-control" id="id_cyzd" placeholder="">
                </div>
            </div>
        </div>
    </div>
    <!--出院诊断 结束-->

    <!--入院时主要症状及体征 开始-->
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#ryzztzcontent" id="collapse5">
                <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                    <span class="glyphicon glyphicon-th"></span> 入院时主要症状及体征
                </h3>
            </a>
        </div>
        <div id="ryzztzcontent" class="form-horizontal panel-collapse collapse in" style="margin-bottom: 8px">
            <div class="form-group nopadding" style="margin-top: 6px">
                <div class="col-md-12">
                    <input type="text" class="form-control" id="id_ryzztz" placeholder="">
                </div>
            </div>
        </div>
    </div>
    <!--入院时主要症状及体征 结束-->


    <!--主要检查结果 开始-->
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#zyjcjgcontent" id="collapse6">
                <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                    <span class="glyphicon glyphicon-th"></span> 主要检查结果
                </h3>
            </a>
        </div>
        <div id="zyjcjgcontent" class="form-horizontal panel-collapse collapse in" style="margin-bottom: 8px">
            <div class="form-group nopadding" style="margin-top: 6px">
                <div class="col-md-12">
                    <input type="text" class="form-control" id="id_zyjcjg" placeholder="">
                </div>
            </div>
        </div>
    </div>
    <!--主要检查结果 结束-->

    <!--特殊检查 开始-->
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#tsjccontent" id="collapse7">
                <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                    <span class="glyphicon glyphicon-th"></span> 特殊检查
                </h3>
            </a>
        </div>
        <div id="tsjccontent" class="form-horizontal panel-collapse collapse in" style="margin-bottom: 8px">
            <div class="form-group nopadding" style="margin-top: 6px">
                <div class="col-md-12">
                    <input type="text" class="form-control" id="id_tsjc" placeholder="">
                </div>
            </div>
        </div>
    </div>
    <!--特殊检查 结束-->

    <!--病程与诊疗结果 开始-->
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#bczljgcontent" id="collapse8">
                <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                    <span class="glyphicon glyphicon-th"></span> 病程与诊疗结果
                </h3>
            </a>
        </div>
        <div id="bczljgcontent" class="form-horizontal panel-collapse collapse in" style="margin-bottom: 8px">
            <div class="form-group nopadding" style="margin-top: 6px">
                <div class="col-md-12">
                    <input type="text" class="form-control" id="id_bczljg" placeholder="">
                </div>
            </div>
        </div>
    </div>
    <!--病程与诊疗结果 结束-->

    <!--合并症 开始-->
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#hbzcontent" id="collapse9">
                <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                    <span class="glyphicon glyphicon-th"></span> 合并症
                </h3>
            </a>
        </div>
        <div id="hbzcontent" class="form-horizontal panel-collapse collapse in" style="margin-bottom: 8px">
            <div class="form-group nopadding" style="margin-top: 6px">
                <div class="col-md-12">
                    <input type="text" class="form-control" id="id_hbz" placeholder="">
                </div>
            </div>
        </div>
    </div>
    <!--合并症 结束-->


    <!--出院时情况 开始-->
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#cyqkcontent" id="collapse10">
                <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                    <span class="glyphicon glyphicon-th"></span> 出院时情况
                </h3>
            </a>
        </div>
        <div id="cyqkcontent" class="form-horizontal panel-collapse collapse in" style="margin-bottom: 8px">
            <div class="form-group nopadding" style="margin-top: 6px">
                <div class="col-md-12">
                    <input type="text" class="form-control" id="id_cyqk" placeholder="">
                </div>
            </div>
        </div>
    </div>
    <!--出院时情况 结束-->

    <!--出院医嘱 开始-->
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#cyyzcontent" id="collapse11">
                <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                    <span class="glyphicon glyphicon-th"></span> 出院医嘱
                </h3>
            </a>
        </div>
        <div id="cyyzcontent" class="form-horizontal panel-collapse collapse in" style="margin-bottom: 8px">
            <div class="form-group nopadding" style="margin-top: 6px">
                <div class="col-md-12">
                    <input type="text" class="form-control" id="id_cyyz" placeholder="">
                </div>
            </div>
        </div>
    </div>
    <!--出院医嘱 结束-->

    <!--治疗结果 开始-->
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#zljgcontent" id="collapse12">
                <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                    <span class="glyphicon glyphicon-th"></span> 治疗结果
                </h3>
            </a>
        </div>
        <div id="zljgcontent" class="form-horizontal panel-collapse collapse in" style="margin-bottom: 8px">
            <div class="form-group nopadding" style="margin-top: 6px">
                <div class="col-md-12">
                    <input type="text" class="form-control" id="id_zljg" placeholder="">
                </div>
            </div>
        </div>
    </div>
    <!--治疗结果 结束-->

</div>
</body>
