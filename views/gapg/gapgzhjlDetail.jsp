<%--<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
&lt;%&ndash;
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  &ndash;%&gt;

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <link href="layouts/css/white/detail_page.css" rel="stylesheet">
    <link href="frame/css/extra.css" rel="stylesheet">
    <link href="frame/css/components.min.css" rel="stylesheet" type="text/css"/>
    <script src="yyhpt/pages/gapg/gapgzhjlDetail.js" type="text/javascript"></script>
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
    </style>
</head>
<body>
<!-- 个人基本信息开始-->
<div class="panel panel-default">
    <div class="panel-heading" style="height: 40px">
        <a data-toggle="collapse" data-parent="#accordion" href="#grxxcontent" id="collapse2">
            <h3 class="head-title">
                <span class="glyphicon glyphicon-th"></span> 个人信息
            </h3>
        </a>
    </div>
    <div id="grxxcontent" class="panel-collapse collapse in nopadding">
        <div class="form-horizontal form-bordered form-row-stripped nopadding">
            <div class="form-group list-space-row" style="padding-left: 15px;">
                <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                    <label class="control-label">姓名：</label>
                </div>
                <p id="hzxm" class="control-label col-md-1 col-xs-8 nopadding"
                   style="text-align: left;color: #434343;"></p>
                <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                    <label class="control-label">性别：</label>
                </div>
                <p id="xb" class="control-label col-md-1 col-xs-9 nopadding"
                   style="text-align: left;color: #434343;"></p>
                <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                    <label class="control-label nopadding">出生日期：</label>
                </div>
                <p id="csrq" class="control-label col-md-1 col-xs-9 nopadding"
                   style="text-align: left;color: #434343;"></p>

                <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                    <label class="control-label nopadding">入院日期：</label>
                </div>
                <p id="ryrq" class="control-label col-md-1 col-xs-9 nopadding"
                   style="text-align: left;color: #434343;"></p>

                <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                    <label class="control-label nopadding">出院日期：</label>
                </div>
                <p id="cyrq" class="control-label col-md-1 col-xs-9 nopadding"
                   style="text-align: left;color: #434343;"></p>

                <div class="col-md-2 col-xs-9">
                    <button id="btn_EHR" class="btn btn-default btn-sm"
                            style='margin-right: 20px; margin-top: 3px;'>调阅出院小结
                    </button>
                </div>

            </div>
        </div>
    </div>
</div>
<!-- 个人基本信息结束 -->

<form id="defaultForm" method="post" class="form-horizontal" style="font-size: 13px;">
    <!-- 变更申请信息 -->
    <div class="panel-content" id="table-theme">
        <div class="panel panel-default">
            <div class="panel-heading" style="height: 40px">
                <a data-toggle="collapse" data-parent="#accordion" href="#jaxxcontent">
                    <h3 style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                        <span class="glyphicon glyphicon-th"></span> 跨团队照护记录
                    </h3>
                </a>
            </div>

            <nav class="navbar navbar-default navbar-static" role="navigation">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse"
                                data-target="#example-navbar-collapse">
                            <span class="sr-only">切换导航</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                    </div>
                    <div class="collapse navbar-collapse" id="example-navbar-collapse">
                        <ul class="nav navbar-nav">
                            <li class="active" id="href_goto_0" onmouseover="mouseleaf(this.id)"><a href="#gotoXqsq_0" data-toggle="tab" id="a_goXqsq_0">药剂科</a>
                            </li>
                            <li id="href_goto_2" onmouseover="mouseleaf(this.id)"><a href="#gotoXqsq_1" data-toggle="tab" id="a_goXqsq_2">营养室</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <form id="defaultForm-test" method="post" class="tab-content" style="font-size: 13px;display: block">
                <div class="panel panel-default tab-pane fade in active" id="gotoXqsq_0">
                    <div class="form-horizontal form-bordered form-row-stripped nopadding">
                        <p>1:你好, </p>
                        <p>2:上海! </p>
                        <p>3:你好, </p>
                        <p>4:合肥！ </p>
                    </div>
                </div>
                <div class="panel panel-default tab-pane fade" id="gotoXqsq_1" style="display: none">
                    <div id="pgqkxxcontent" class="panel-collapse collapse in nopadding">
                        <div class="form-horizontal form-bordered form-row-stripped nopadding">
                            <p>1:你好, </p>
                            <p>2:西安! </p>
                            <p>3:你好, </p>
                            <p>4:世界！ </p>
                        </div>
                    </div>
                </div>

                <div class="panel panel-default">
                    <div class="panel-body nopadding" style="padding-top: 10px;">
                        <div class="form-group list-space-row" style="padding-left: 15px;">
                            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                                <label class="control-label">记录人员：</label>
                            </div>

                            <p id="czry" class="control-label col-md-2 col-xs-8 nopadding"
                               style="text-align: left;color: #434343;">${ryxm}</p>
                            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                                <label class="control-label nopadding">记录日期：</label>
                            </div>
                            <p id="czrq" class="control-label col-md-3 col-xs-9 nopadding"
                               style="text-align: left;color: #434343;"></p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</form>


<div class="panel panel-default">
    <div class="panel-body nopadding" style="padding-top: 10px;">
        <div class="form-group list-space-row" style="padding-left: 15px;">
            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label">修改人员：</label>
            </div>

            <p id="xgry" class="control-label col-md-2 col-xs-8 nopadding"
               style="text-align: left;color: #434343;">${ryxm}</p>
            <div class="col-md-1 col-xs-3 nopadding" style="text-align:right;">
                <label class="control-label nopadding">修改日期：</label>
            </div>
            <p id="xgrq" class="control-label col-md-3 col-xs-9 nopadding"
               style="text-align: left;color: #434343;"></p>
        </div>
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
        console.log(a);
        var selectedId='#'+a;
        var selectDivid= $(selectedId).find('a').attr("href");  //要展示的div


        var selectLiID= '#'+$(selectedId).find('a').attr("id");//获取要展示的页签
        $(selectLiID).tab('show');
        if(selectDivid=='#gotoXqsq_0'){
            $('#gotoXqsq_0').css('display','block');
            $('#gotoXqsq_1').css('display','none');
        }else{
            $('#gotoXqsq_0').css('display','none');
            $('#gotoXqsq_1').css('display','block');
        }

    }

</script>
</html>



<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<link href="layouts/css/white/detail_page.css" rel="stylesheet">
<style type="text/css">
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
</style>
<script></script>--%>
<script src="yyhpt/pages/gapg/gapgzhjlDetail.js" type="text/javascript"></script>
<div class="panel panel-default">
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
                    <div class="col-md-3 col-xs-12">
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

                    <div class="col-md-7 col-xs-12">
                        <label class="col-md-2 col-xs-4 control-label control-label-new
                                no-padding-right">出生日期：</label>
                        <div class="col-md-2 no-padding-right">
                            <p id="grxx_csrq" class="form-control-static"></p>
                        </div>

                        <label class="col-md-2 col-xs-4 control-label control-label-new
                                no-padding-right">入院日期：</label>
                        <div class="col-md-2 no-padding-right">
                            <p id="grxx_ryrq" class="form-control-static"></p>
                        </div>
                        <label class="col-md-2 col-xs-4 control-label control-label-new
                                no-padding-right">出院日期：</label>
                        <div class="col-md-2 no-padding-right">
                            <p id="grxx_cyrq" class="form-control-static"></p>
                        </div>
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

    <div class="panel-heading" style="height: 40px">
        <a data-toggle="collapse" data-parent="#accordion"
           href="#id_ktdzh">
            <h3 class="head-title">
                <span class="glyphicon glyphicon-th"></span> 跨团队照护
            </h3>
        </a>
    </div>

    <div id="id_ktdzh" class="form-horizontal panel-collapse collapse in" style="margin-bottom: 8px">
        <ul id="Tabs" class="nav nav-tabs"></ul>
        <div id="TabContent" class="tab-content"></div>
    </div>
</div>


