<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%--
  Created by IntelliJ IDEA.
  User: tw
  Date: 2016-09-25
  Time: 22:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
    <style type="text/css">
        .panel-heading-height{
            height: 35px;
        }
        .head-title {
            margin-top: 0px;
            margin-bottom: 0px;
            font-weight: bold;
            font-size: 16px;
            color: #000000;
        }

        h3.head-title {
            font-family: "Microsoft YaHei" ! important;
        }

        /*小屏幕时lable的样式*/
        .control-label-new{
            padding-top:6px;
            text-align: right;
            padding-left:0px;
        }
        /*重写样式*/
        .form-control-static {
            padding-top: 6px;
            padding-bottom: 6px;
        }

        .no-padding-right{
            padding-right:0px;
            padding-left:0px;
        }
        /*每个分类的第一个问题*/
        .first-lable{
            padding-top:6px;
        }

        .lable-padding-right{
            padding-right: 4px;
        }

    </style>
</head>
<body>
    <form id="sapgMainForm" method="post" class="form-horizontal" style="font-size: 13px;">
        <!-- 个人基本信息开始-->
        <div id="jbxxContent" class="panel panel-default">
            <div class="panel-heading panel-heading-height">
                <a data-toggle="collapse" data-parent="#accordion"
                   href="#grxxcontent">
                    <h3 class="head-title">
                        <span class="glyphicon glyphicon-th"></span> 个人信息
                    </h3>
                </a>
            </div>
            <div id="grxxcontent" class="panel-collapse collapse in nopadding">
                <div class="form-horizontal form-bordered form-row-stripped nopadding">
                    <div class="form-group nopadding">
                        <div class="col-md-4 col-xs-12 no-padding-right">
                            <label class="col-md-3 col-xs-4 control-label control-label-new
                                    no-padding-right">姓名：</label>
                            <div class="col-md-3 no-padding-right">
                                <p id="grxx_xm" class="form-control-static"></p>
                            </div>

                            <label class="col-md-3 col-xs-4 control-label control-label-new
                                no-padding-right">性别：</label>
                            <div class="col-md-3 no-padding-right">
                                <p id="grxx_xb" class="form-control-static"></p>
                            </div>
                        </div>

                        <div class="col-md-6 col-xs-12">
                            <label class="col-md-2 col-xs-4 control-label control-label-new
                                no-padding-right">出生日期：</label>
                            <div class="col-md-4 no-padding-right">
                                <p id="grxx_csrq" class="form-control-static"></p>
                            </div>

                            <label class="col-md-2 col-xs-4 control-label control-label-new
                                no-padding-right">入院日期：</label>
                            <div class="col-md-4 no-padding-right">
                                <p id="grxx_ryrq" class="form-control-static"></p>
                            </div>
                            <%--<label class="col-md-2 col-xs-4 control-label control-label-new
                                no-padding-right">出院日期：</label>
                            <div class="col-md-2 no-padding-right">
                                <p id="grxx_cyrq" class="form-control-static"></p>
                            </div>--%>
                        </div>

                        <div class="col-md-2 col-xs-12" style="padding-top: 2px;text-align:center;">
                            <button id="btn_Cyxj" class="btn btn-default btn-sm">
                                调阅出院小结
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 个人基本信息结束 -->
        <%--评估内容--%>
        <div id="pgnrContent">

        </div>
        <%--<div class="panel panel-default">
            <div class="panel-heading panel-heading-height">
                <a data-toggle="collapse" data-parent="#accordion" href="#zhwtContent">
                    <h3 class="head-title">
                        <span class="glyphicon glyphicon-th"></span> 照护问题
                    </h3>
                </a>
            </div>
            <div class="panel-collapse collapse in nopadding" id="zhwtContent">
                <div class="form-group">
                    <div class="col-md-12">
                        <div class="col-sm-12 col-md-12">
                            <label class="first-lable"><input name="zhwt" type="checkbox" value="0" /> 1.视觉明显影响日常生活</label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-12">
                        <div class="col-sm-12 col-md-12">
                            <label><input name="zhwt" type="checkbox" value="0" /> 2.听觉明显影响日常生活</label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-12">
                        <div class="col-sm-12 col-md-12">
                            <label><input name="zhwt" type="checkbox" value="0" /> 3.出院后可能留有呼吸照护问题</label>
                        </div>
                        <div class="col-sm-12 col-md-12">
                            <div class="col-sm-12 col-md-12">
                                <label><input name="B.1.3" type="checkbox" value="0" /> 抽痰及胸腔物理治疗技巧&nbsp;&nbsp;</label>
                                <label><input name="B.1.3" type="checkbox" value="0" /> 使用吸入剂&nbsp;&nbsp;</label>
                                <label><input name="B.1.3" type="checkbox" value="0" /> 抽痰机&nbsp;&nbsp;</label>
                                <label><input name="B.1.3" type="checkbox" value="0" /> 制氧机&nbsp;&nbsp;</label>
                                <label><input name="B.1.3" type="checkbox" value="0" /> 氧气筒&nbsp;&nbsp;</label>
                                <label><input name="B.1.3" type="checkbox" value="0" /> 化痰机&nbsp;&nbsp;</label>
                                <label><input name="B.1.3" type="checkbox" value="0" /> 呼吸器设备及使用&nbsp;&nbsp;</label>
                                <label><input name="B.1.3" type="checkbox" value="0" /> 气切管留置照护&nbsp;&nbsp;</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading panel-heading-height">
                <a data-toggle="collapse" data-parent="#accordion" href="#jtysContent">
                    <h3 class="head-title">
                        <span class="glyphicon glyphicon-th"></span> 家庭因素
                    </h3>
                </a>

            </div>
            <div id="jtysContent" class="panel-collapse collapse in nopadding">


            </div>

        </div>

        <div class="panel panel-default">
            <div class="panel-heading panel-heading-height">
                <a data-toggle="collapse" data-parent="#accordion" href="#jjysContent">
                    <h3 class="head-title">
                        <span class="glyphicon glyphicon-th"></span> 经济因素
                    </h3>
                </a>

            </div>
            <div id="jjysContent" class="panel-collapse collapse in nopadding">


            </div>

        </div>--%>
        <div class="panel panel-default">
            <div class="form-group" style="margin:0px;"> <%--background-color:#E2E2E2--%>
                <div class="col-sm-12 col-md-6" style="padding-bottom: 6px;">
                    <label class="col-md-3 col-xs-4 control-label head-title ">是否收案：</label>
                    <div class="col-md-9">
                        <label class="control-label head-title"><input id="saRadio" name="sfsa" type="radio" value="1" /> 收案</label>
                        <label class="control-label head-title"><input id="bsaRadio" name="sfsa" type="radio" value="2" checked/> 不收案</label>
                    </div>
                </div>
            </div>
        </div>
        <div id="bsayyDiv" class="panel panel-default">
            <div class="panel-heading panel-heading-height">
                <a data-toggle="collapse" data-parent="#accordion" href="#bsayyContent">
                    <h3 class="head-title">
                        <span class="glyphicon glyphicon-th"></span> 不收案原因
                    </h3>
                </a>

            </div>
            <div id="bsayyContent" class="panel-collapse collapse in nopadding">
                <%--<div class="form-group">
                    <div class="col-md-12">
                        <div class="col-sm-12 col-md-12 first-lable">

                        </div>
                    </div>
                </div>--%>

            </div>

        </div>
        <div class="panel panel-default">
            <div class="form-group">
                <div class="col-sm-12 col-md-12">
                    <label class="col-md-2 col-xs-4 control-label ">收案人员：</label>
                    <div class="col-md-3 no-padding-right">
                        <p id="saryxm" class="form-control-static"></p>
                        <p id="sarygh" class="form-control-static" style="display: none;"></p>
                    </div>

                    <label class="col-md-2 col-xs-4 control-label ">收案日期：</label>
                    <div class="col-md-3 no-padding-right">
                        <p id="sarq" class="form-control-static"></p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 评估内容结束 -->
        <input type="text" class="form-control   input-sm hidden"
               id="SAPGLSH" name="SAPGLSH" placeholder="用于绑定收案评估流水号" />
    </form>

    <script src="yyhpt/pages/sagl/saglDetail.js" type="text/javascript"></script>
</body>
</html>
