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
    <link href="layouts/css/white/detail_page.css" rel="stylesheet">
    <link href="frame/css/extra.css" rel="stylesheet">
    <link href="frame/css/components.min.css" rel="stylesheet" type="text/css"/>

    <link rel="stylesheet" href="frame/plugins/city-picker/css/city-picker.css">
    <script src="frame/plugins/city-picker/city-picker.data.js"></script>
    <script src="frame/plugins/city-picker/city-picker.js"></script>

    <%--<script src="yyhpt/pages/jhbgglhy/saglsapgDetail.js" type="text/javascript"></script>--%>
    <script src="yyhpt/pages/gapg/gapgcyzbfwDetail.js" type="text/javascript"></script>
    <style type="text/css">
        .radio-container {
            padding-left: 8px;
        }

        .head-title {
            margin-top: 0px;
            margin-bottom: 0px;
            font-weight: bold;
            font-size: 20px;
            color: #000000;
        }

        .choose-date {
            background: url("layouts/img/control/img_rl.png") no-repeat scroll right center transparent;
            cursor: pointer;
        }

        .panel-heading-height {
            height: 35px;
        }

        .head-title {
            margin-top: 0px;
            margin-bottom: 0px;
            font-weight: bold;
            font-size: 16px;
            color: #000000;
        }

        /*小屏幕时lable的样式*/
        .control-label-new {
            padding-top: 6px;
            text-align: right;
            padding-left: 0px;
        }

        /*重写样式*/
        .form-control-static {
            padding-top: 6px;
            padding-bottom: 6px;
        }

        .no-padding-right {
            padding-right: 0px;
            padding-left: 0px;
        }

        .fjxq{
            padding-left: 0px;right: 55px;
        }

    </style>
</head>
<body>
<!-- 个人基本信息开始-->
<div class="panel panel-default">
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
                <div class="col-md-4 col-xs-12">
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
                    <label class="col-md-3 col-xs-4 control-label control-label-new
                                no-padding-right">出生日期：</label>
                    <div class="col-md-3 no-padding-right">
                        <p id="grxx_csrq" class="form-control-static"></p>
                    </div>

                    <label class="col-md-3 col-xs-4 control-label control-label-new
                                no-padding-right">入院日期：</label>
                    <div class="col-md-3 no-padding-right">
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

<form id="defaultForm_test1" method="post" class="form-horizontal" style="font-size: 13px;">
    <div class="panel-content" id="table-theme-test1">
        <div class="panel panel-default">
            <div class="panel-heading" style="height: 40px">
                <a data-toggle="collapse" data-parent="#accordion" href="#jaxxcontent-test1">
                    <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                        <span class="glyphicon glyphicon-th"></span>护理评估
                    </h3>
                </a>
            </div>

           <%--             <nav class="navbar navbar-default navbar-static navbar-static-top" role="navigation">
                            <div class="container-fluid">
                                <div class="navbar-header">
                                    <button type="button" class="navbar-toggle" data-toggle="collapse"
                                            data-target="#example-navbar-collapse">
                                        <span class="sr-only">切换导航</span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                    </button>
                                </div>
                                <div class="collapse navbar-collapse" id="example-navbar-collapse">
                                    <ul class="nav navbar-nav" id="pgdc_tabItem"></ul>
                                </div>
                            </div>
                        </nav>
                        <div id="pgdc_tabContent" class="tab-content">

                        </div>--%>
            <nav class="navbar navbar-default navbar-static" role="navigation">
                <ul class="nav navbar-nav">
                    <li class="active" id="href_goto_0" onmouseover="mouseleaf(this.id)">
                        <a href="#gotoXqsq_0" data-toggle="tab" id="a_goXqsq_0">身体评估</a>
                    </li>
                    <li id="href_goto_1" onmouseover="mouseleaf(this.id)">
                        <a href="#gotoXqsq_1" data-toggle="tab" id="a_goXqsq_1">科氏&巴氏量表</a></li>
                </ul>
            </nav>

            <form id="defaultForm-test" method="post" class="tab-content" style="font-size: 13px;">

                <div class="panel panel-default tab-pane fade in active" id="gotoXqsq_0">
                    <div id="jaxxcontent-test1" class="panel-collapse collapse in nopadding"
                         style="margin: 10px 0 10px 0;">
                        <%-- <div id="jaxxcontent-test1" class="panel-collapse collapse in nopadding" style="margin: 10px 0 10px 0;">
      &lt;%&ndash;                       <div class="col-md-12">
                                 <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                                     <label class="control-label nopadding">1:意识：</label>
                                 </div>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="qx" value="">清醒
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="hm" value="">昏迷
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="ss" value="">嗜睡
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="lnszz" value="">老年失智症(痴呆)
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="qtqk" value="">其他
                                 </label>
                             </div>

                             <div class="col-md-12">
                                 <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                                     <label class="control-label nopadding">2:呼吸：</label>
                                 </div>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="zc" value="">正常
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="dzhx" value="">端坐呼吸
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 24px;">
                                     <input type="radio" class="rdZt" name="zt" id="zkhx" value="">张口呼吸
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 24px;">
                                     <input type="radio" class="rdZt" name="zt" id="qq" value="">气切
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="qtzk" value="">其他
                                 </label>
                             </div>

                             <div class="col-md-12">
                                 <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                                     <label class="control-label nopadding">3:视力：</label>
                                 </div>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="slzc" value="">正常
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="slqx" value="">缺陷
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="slfzw" value="">辅助物
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 38px;">
                                     <input type="radio" class="rdZt" name="zt" id="slqtzk" value="">其他
                                 </label>
                             </div>

                             <div class="col-md-12">
                                 <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                                     <label class="control-label nopadding">4:听力：</label>
                                 </div>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="tlzc" value="">正常
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="tlqx" value="">缺陷
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="tlfzw" value="">辅助物
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 38px;">
                                     <input type="radio" class="rdZt" name="zt" id="tlqtzk" value="">其他
                                 </label>
                             </div>

                             <div class="col-md-12">
                                 <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                                     <label class="control-label nopadding">5:语言：</label>
                                 </div>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="yyzc" value="">正常
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="yyqx" value="">缺陷
                                 </label>
                             </div>

                             <div class="col-md-12">
                                 <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                                     <label class="control-label nopadding">6:排尿：</label>
                                 </div>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="pnzc" value="">正常
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="pnpn" value="">频尿
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="pnsj" value="">失禁
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="jxdn" value="">间歇导尿
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="pgdn" value="">膀胱导尿
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="dglz" value="">导管留滞
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 25px;">
                                     <input type="radio" class="rdZt" name="zt" id="pnsn" value="">少尿
                                 </label>
                             </div>

                             <div class="col-md-12">
                                 <div class="col-md-2 col-xs-3 nopadding" style="text-align:left;padding-left: 15px;">
                                     <label class="control-label nopadding">7:排便形态：</label>
                                 </div>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 0px;right: 20px;">
                                     <input type="radio" class="rdZt" name="zt" id="pbxtzc" value="">正常
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 30px;">
                                     <input type="radio" class="rdZt" name="zt" id="pbxtbm" value="">便秘
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="pbxtfx" value="">腹泻
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="pbxthz" value="">红疹
                                 </label>
                             </div>

                             <div class="col-md-12">
                                 <div class="col-md-2 col-xs-3 nopadding" style="text-align:left;padding-left: 15px;">
                                     <label class="control-label nopadding">8:排便途径：</label>
                                 </div>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 0px;right: 20px;">
                                     <input type="radio" class="rdZt" name="zt" id="pbtjgm" value="">肛门
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 30px;">
                                     <input type="radio" class="rdZt" name="zt" id="pbtjzk" value="">造口(
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="pbtjhc" value="">回肠
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="pbtjkc" value="">空肠
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="pbtjjc" value="">结肠)
                                 </label>
                             </div>

                             <div class="col-md-12">
                                 <div class="col-md-2 col-xs-3 nopadding" style="text-align:left;padding-left: 15px;">
                                     <label class="control-label nopadding">9:排便辅助方式：</label>
                                 </div>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 82px;">
                                     <input type="radio" class="rdZt" name="zt" id="pbfzfs1" value="">软便剂、塞剂、灌肠
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="pbfzfs2" value="">粪嵌塞处理
                                 </label>
                             </div>

                             <div class="col-md-12">
                                 <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                                     <label class="control-label nopadding">10:皮肤：</label>
                                 </div>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="pfwz" value="">完整
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="pfbwz" value="">不完整
                                 </label>
                             </div>

                             <div class="col-md-12">
                                 <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                                     <label class="control-label nopadding">11:伤口：</label>
                                 </div>
                                 <div class="col-md-10 col-xs-12">
                                     <input class="input-sm col-md-12 col-xs-12" maxlength="100" id="sk" type="text" name="cysqk">
                                 </div>
                             </div>

                             <div class="col-md-12" style="margin-top: 5px">
                                 <div class="col-md-2 col-xs-3 nopadding" style="text-align:left;padding-left: 8px;">
                                     <label class="control-label nopadding">12:营养饮食：</label>
                                 </div>
                                 <div class="col-md-10 col-xs-12" style=" right: 45px;">
                                     <input class="input-sm col-md-12 col-xs-12" maxlength="100" id="yyys" type="text" name="cysqk">
                                 </div>
                             </div>

                             <div class="col-md-12">
                                 <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                                     <label class="control-label nopadding">13:体重：</label>
                                 </div>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="tzgz" value="">过重
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="tzzc" value="">正常
                                 </label>
                                 <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                     <input type="radio" class="rdZt" name="zt" id="tzgq" value="">过轻
                                 </label>
                             </div>

                             &lt;%&ndash;<div class="col-md-12">&ndash;%&gt;
                             <div class="col-md-2 col-xs-3 nopadding" style="text-align:left;padding-left: 23px;">
                                 <label class="control-label nopadding">14:进食方法：</label>
                             </div>
                             <label class="checkbox-inline" style="padding-top: 5px;padding-left: 0px;right: 10px;left: -10;left: -10;">
                                 <input type="radio" class="rdZt" name="zt" id="jsffyk" value="">由口
                             </label>
                             <label class="checkbox-inline" style="padding-top: 5px;padding-left: 40px;right: 0px;">
                                 <input type="radio" class="rdZt" name="zt" id="jsffgg" value="">管灌
                             </label>
                             <label class="checkbox-inline" style="padding-top: 5px;padding-left: 50px;">
                                 <input type="radio" class="rdZt" name="zt" id="jsffjmyy" value="">静脉营养
                             </label>
                             &lt;%&ndash;</div>&ndash;%&gt;
     &ndash;%&gt;

                         </div>--%>

                        <div class="panel-body" id="bodyPGInfopanel">
                        </div>
                    </div>
                </div>

                <div class="panel panel-default tab-pane fade" id="gotoXqsq_1" style="display: none;">

                    <div class="panel-collapse collapse in nopadding" style="margin: 10px 0 10px 0;">

                        <div class="panel-body" id="ksbsInfopanel">
                        </div>
                        <%--<div  class="form-horizontal form-bordered form-row-stripped nopadding">

                            <div class="col-md-12">
                                <div class="col-md-2 col-xs-3 nopadding" style="text-align:left;padding-left: 8px;">
                                    <label class="control-label nopadding">科氏量表：</label>
                                </div>
                                <label class="checkbox-inline" style="padding-top: 5px;padding-left: 0px;right: 20px;">
                                    <input type="radio" class="rdZt" name="zt" id="kslb1" value="">完全独立生活，没有任何限制（0级）
                                </label>
                                <label class="checkbox-inline" style="padding-top: 5px;padding-left: 0px;right: 30px;">
                                    <input type="radio" class="rdZt" name="zt" id="kslb2" value="">能步行，可从事轻度工作，如操持家务、上班等，但无法从事重度活动（1级）
                                </label>
                                <label class="checkbox-inline" style="padding-top: 5px;padding-left: 110px;">
                                    <input type="radio" class="rdZt" name="zt" id="kslb3" value="">能步行及大部分自我照顾，50%以上的清醒时间不需受限在床铺或椅子上（2级）
                                </label>
                                <label class="checkbox-inline" style="padding-top: 5px;padding-left: 110px;">
                                    <input type="radio" class="rdZt" name="zt" id="kslb4" value="">自我照顾方面有所限制，50%以上的清醒时间需受限在床铺或椅子上（3级）
                                </label>
                                <label class="checkbox-inline" style="padding-top: 5px;padding-left: 110px;">
                                    <input type="radio" class="rdZt" name="zt" id="kslb5" value="">无自我照顾能力且完全限制在床铺或椅子上（4级）
                                </label>
                            </div>

                            <label class="control-label nopadding" style="margin-left: 25px;">巴氏量表：</label>
                            <div class="row" id="id_tables_container">
                                <div class="col-md-12" id="id_left" style="padding-left: 40px;padding-right: 25px;">
                                    <table border="2">
                                        &lt;%&ndash;<thead>&ndash;%&gt;
                                        <tr>
                                            <th style="text-align: center;background-color: #f4f4f5">
                                                <div class="th-inner ">项目</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th style="text-align: center;background-color: #f4f4f5">
                                                <div class="th-inner ">0分</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th style="text-align: center;background-color: #f4f4f5">
                                                <div class="th-inner ">5分</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th style="text-align: center;background-color: #f4f4f5">
                                                <div class="th-inner ">10分</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th style="text-align: center;background-color: #f4f4f5">
                                                <div class="th-inner ">15分</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                        </tr>

                                        <tr>
                                            <td style="text-align: center;">
                                                <div class="th-inner ">进食</div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="js" value="">完全依赖，无法自行取食
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="js1" value="">需要一些协助
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="js2" value="">食物置桌前餐盒，可自行进食，若需···
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner "></div>
                                                <div class="fht-cell"></div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="text-align: center;">
                                                <div class="th-inner ">移位</div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="yw1" value="">完全依赖
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="yw2" value="">可自行坐起，但离床仍需要帮忙
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="yw3" value="">在上述移位过程中，仍需一点点协助···
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="yw4" value="">可自行坐起，安全地移位至椅子···
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="text-align: center;">
                                                <div class="th-inner ">个人卫生</div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner "></div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="grws1" value="">可自行洗手、洗脸、刷牙、梳头、刮胡子
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner "></div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner "></div>
                                                <div class="fht-cell"></div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="text-align: center;">
                                                <div class="th-inner ">如厕</div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="rc1" value="">完全依赖
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="rc2" value="">协助整理衣物或使用卫生纸，可自行取放···
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="rc3" value="">可自行上下马桶不会弄脏衣裤并能穿···
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner "></div>
                                                <div class="fht-cell"></div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="text-align: center;">
                                                <div class="th-inner ">沐浴</div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="my1" value="">在协助下完成
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="my2" value="">病人能自行完成
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner "></div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="my3" value="">不协助走50米以上，可用辅助器
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="text-align: center;">
                                                <div class="th-inner ">步行</div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="bx1" value="">无法行走或操纵轮椅
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="bx2" value="">不能行走，但能独立操纵轮椅，并可推行···
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="bx3" value="">需要协助扶持走50米以上，无法自行取食
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner "></div>
                                                <div class="fht-cell"></div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="text-align: center;">
                                                <div class="th-inner ">上下楼梯</div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="sxlt1" value="">无法上下楼
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="sxlt2" value="">需要别人给予帮助或监督
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="sxlt3" value="">安全上下楼，可用扶手、拐杖
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner "></div>
                                                <div class="fht-cell"></div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="text-align: center;">
                                                <div class="th-inner ">穿脱衣袜</div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="ctyw1" value="">完全依赖
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="ctyw2" value="">需要协助但自己可以完成一半以上
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="ctyw3" value="">能自行穿脱衣裤和鞋袜
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner "></div>
                                                <div class="fht-cell"></div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="text-align: center;">
                                                <div class="th-inner ">大便控制</div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="dbkz1" value="">依赖别人协助处理
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="dbkz2" value="">偶尔失控，需协助使用栓剂
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="dbkz3" value="">不会失禁，便秘时可自用栓剂、甘油球
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner "></div>
                                                <div class="fht-cell"></div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="text-align: center;">
                                                <div class="th-inner ">小便控制</div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="xbkz1" value="">依赖别人协助处理
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="xbkz2" value="">偶尔失禁，需别人协助使用尿布
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner ">
                                                    <input type="radio" class="rdZt" name="zt" id="xbkz3" value="">不会失禁，脊髓损伤者能自行使用尿袋
                                                </div>
                                                <div class="fht-cell"></div>
                                            </td>
                                            <td style="text-align: left;">
                                                <div class="th-inner "></div>
                                                <div class="fht-cell"></div>
                                            </td>
                                        </tr>

                                        &lt;%&ndash;</thead>&ndash;%&gt;
                                    </table>
                                </div>
                            </div>
                        </div>--%>
                    </div>
                </div>

            </form>


        </div>


    </div>
</form>

<form id="defaultForm_test2" method="post" class="form-horizontal" style="font-size: 13px;">
    <div class="panel-content" id="table-theme-test2">
        <div class="panel panel-default">
            <div class="panel-heading" style="height: 40px">
                <a data-toggle="collapse" data-parent="#accordion" href="#jaxxcontent-test2">
                    <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                        <span class="glyphicon glyphicon-th"></span>个案需求
                    </h3>
                </a>
            </div>
            <div id="jaxxcontent-test2" class="panel-collapse collapse in nopadding" style="margin: 10px 0 10px 0;">
                <div class="com-md-12">
                    <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                        <label class="control-label nopadding">护理需求：</label>
                    </div>
                    <label class="checkbox-inline" style="padding-top: 5px;padding-left: 15px;">
                        <input type="radio" class="rdZt" name="jgzh" id="jgzh" value="养老机构照护">机构照护
                    </label>
                    <label class="checkbox-inline" style="padding-top: 5px;padding-left: 15px;">
                        <input type="radio" class="rdZt" name="jgzh" id="jjzh" value="居家/社区照护">居家/社区照护
                    </label>
                </div>
                <div class="col-md-1 col-xs-3 nopadding" style="text-align:left;right: 70px;">
                    <label class="control-label nopadding">医疗用具：</label>
                </div>
                <label class="checkbox-inline fjxq">
                    <input type="checkbox" class="rdZt" name="zt" id="1" value="轮椅">轮椅
                </label>
                <label class="checkbox-inline fjxq">
                    <input type="checkbox" class="rdZt" name="zt" id="2" value="病床">病床
                </label>
                <label class="checkbox-inline fjxq" style="padding-left: 0px;">
                    <input type="checkbox" class="rdZt" name="zt" id="3" value="气垫床">气垫床
                </label>
                <label class="checkbox-inline fjxq">
                    <input type="checkbox" class="rdZt" name="zt" id="4" value="吸痰器">吸痰器
                </label>
                <label class="checkbox-inline fjxq">
                    <input type="checkbox" class="rdZt" name="zt" id="5" value="雾化机">雾化机
                </label>
                <label class="checkbox-inline fjxq">
                    <input type="checkbox" class="rdZt" name="zt" id="6" value="氧气机">氧气机
                </label>
                <label class="checkbox-inline fjxq">
                    <input type="checkbox" class="rdZt" name="zt" id="7" value="呼吸机">呼吸机
                </label>
                <label class="checkbox-inline fjxq">
                    <input type="checkbox" class="rdZt" name="zt" id="8" value="血压计">血压计
                </label>
                <label class="checkbox-inline fjxq">
                    <input type="checkbox" class="rdZt" name="zt" id="9" value="血糖仪">血糖仪
                </label>
                <label class="checkbox-inline fjxq">
                    <input type="checkbox" class="rdZt" name="zt" id="10" value="拐杖">拐杖
                </label>
                <label class="checkbox-inline fjxq">
                    <input type="checkbox" class="rdZt" name="zt" id="11" value="助行器">助行器
                </label>
                <label class="checkbox-inline fjxq" style="right: 68px;padding-left: 4px;">
                    <input type="checkbox" class="rdZt" name="zt" id="12" value="其他">其他
                </label>
                <input class="input-sm col-md-9 pull-right" maxlength="100" id="fjxq" type="text" name="fjxq"
                       style="right: 75px;">
            </div>
        </div>
    </div>
</form>

<div class="panel panel-default">
    <div class="panel-body nopadding" style="padding-top: 10px;">
        <div class="form-group list-space-row" style="padding-left: 15px;">
            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label">评估人员：</label>
            </div>

            <p id="czry" class="control-label col-md-2 col-xs-8 nopadding"
               style="text-align: left;color: #434343;">${ryxm}</p>
            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label nopadding">评估日期：</label>
            </div>
            <p id="pgrq" class="control-label col-md-3 col-xs-9 nopadding"
               style="text-align: left;color: #434343;"></p>
        </div>
        <input type="text" class="form-control   input-sm hidden"
               id="GAPGLSH" name="GAPGLSH" placeholder="用于绑定个案评估流水号" />
    </div>
</div>

</body>
<script>
    $(function () {
        //Initialize Select2 Elements
        $(".select2").select2();
        wnform.NumberIn();
        wnform.IntegerIn();
    });

    function mouseleaf(a) {
        var selectedId = '#' + a;
        var selectDivid = $(selectedId).find('a').attr("href");  //要展示的div
        var selectLiID = '#' + $(selectedId).find('a').attr("id");//获取要展示的页签
        $(selectLiID).tab('show');
        if (selectDivid == '#gotoXqsq_0') {
            $('#gotoXqsq_0').css('display', 'block');
//            $('#a_goXqsq_1').css('color','#00a2ff');
            $('#gotoXqsq_1').css('display', 'none');
        } else {
            $('#gotoXqsq_0').css('display', 'none');
//            $('#a_goXqsq_0').css('color','#00a2ff');
            $('#gotoXqsq_1').css('display', 'block');
        }

    }

</script>
</html>

