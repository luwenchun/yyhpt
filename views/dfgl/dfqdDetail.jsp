<%--
  Created by IntelliJ IDEA.
  User: tw
  Date: 2016-10-22
  Time: 17:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>电访清单</title>

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
        /*radio、check的内边距*/
        .padding-top-5{
            padding-top:5px;
        }
        /*设置input边框样式*/
        #dfContent input{
            border:1px solid #ccc;
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

                        <div class="col-md-8 col-xs-12">
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
                    </div>
                </div>
            </div>
        </div>
        <!-- 个人基本信息结束 -->
        <%--电访内容--%>
        <div class="panel panel-default">
            <div id="dfContent" class="panel-collapse collapse in">
                <nav class="navbar navbar-default navbar-static navbar-static-top" style="margin-bottom: 0px;" role="navigation">
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
                            <ul class="nav navbar-nav" id="tabItem">
                                <%--<li class="">
                                    <a id="id_tab_Item0" href="#dfContent0" name="B.1" data-toggle="tab" aria-expanded="false">
                                        新增电访
                                    </a>
                                </li>
                                <li class="">
                                    <a id="id_tab_Item1" href="#dfContent1" name="B.2" data-toggle="tab" aria-expanded="false">
                                        2016-10-20
                                    </a>
                                </li>
                                <li class="dropdown">
                                    <a href="#" id="tabDrop" class="dropdown-toggle" data-toggle="dropdown"
                                       aria-expanded="false">
                                        更多
                                        <b class="caret"></b>
                                    </a>
                                    <ul class="dropdown-menu" id="id_dropdown" role="menu" aria-labelledby="tabDrop">
                                        <li class="tab" id="id_tab_Item3">
                                            <a href="#dfContent2" data-toggle="tab" aria-expanded="false">
                                                2016-09-1
                                            </a>
                                        </li>
                                    </ul>
                                </li>--%>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div id="tabContent" class="tab-content">
                    <%--<div class="tab-pane fade active in" id="dfContent0">
                        <div class="form-group">
                            <div class="col-md-12">
                                <div class="col-sm-12 col-md-12">
                                    <label id="A_1" class="control-label col-sm-2 col-md-2 nopadding">
                                        正确用药：
                                    </label>
                                    <div id="A_1_Div" class="col-sm-10 col-md-10">
                                        <label class="padding-top-5">
                                            <input id="A_1_1" name="A_1" type="radio" value="0">
                                            有&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_1_2" name="A_1" type="radio" value="0">
                                            无&nbsp;&nbsp;
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-12">
                                <div class="col-sm-12 col-md-12">
                                    <label id="A_2" class="control-label col-sm-2 col-md-2 nopadding">
                                        康复/运动：
                                    </label>
                                    <div id="A_2_Div" class="col-sm-10 col-md-10">
                                        <label class="padding-top-5">
                                            <input id="A_2_1" name="A_2" type="radio" value="0">
                                            有&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_2_2" name="A_2" type="radio" value="0">
                                            无&nbsp;&nbsp;
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-12">
                                <div class="col-sm-12 col-md-12">
                                    <label id="A_3" class="control-label col-sm-2 col-md-2 nopadding">
                                        正确饮食：
                                    </label>
                                    <div id="A_3_Div" class="col-sm-10 col-md-10">
                                        <label class="padding-top-5">
                                            <input id="A_3_1" name="A_3" type="radio" value="0">
                                            有&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_3_2" name="A_3" type="radio" value="0">
                                            无&nbsp;&nbsp;
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-12">
                                <div class="col-sm-12 col-md-12">
                                    <label id="A_4" class="control-label col-sm-2 col-md-2 nopadding">
                                        是否独居：
                                    </label>
                                    <div id="A_4_Div" class="col-sm-10 col-md-10">
                                        <label class="padding-top-5">
                                            <input id="A_4_1" name="A_4" type="radio" value="0">
                                            是&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_4_2" name="A_4" type="radio" value="0">
                                            否&nbsp;&nbsp;
                                        </label>
                                    </div>
                                    <div id="A_4_2_Div" class="col-sm-10 col-md-10 col-md-offset-2 col-sm-offset-2"
                                    style="display: none;">
                                        <label class="padding-top-5">
                                            <input id="A_4_2_1" name="A_4_2" type="checkbox" value="0">
                                            夫妻同住&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_4_2_2" name="A_4_2" type="checkbox" value="0">
                                            子女同住&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_4_2_3" name="A_4_2" type="checkbox" value="0">
                                            父母同住&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_4_2_4" name="A_4_2" type="checkbox" value="0">
                                            子女轮流&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_4_2_5" name="A_4_2" type="checkbox" value="0">
                                            外佣&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_4_2_6" name="A_4_2" type="checkbox" value="0">
                                            其他&nbsp;&nbsp;
                                        </label>
                                        <input id="A_4_2_6_1" name="A_4_2_6" type="text" style="display: none;">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-12">
                                <div class="col-sm-12 col-md-12">
                                    <label id="A_5" class="control-label col-sm-2 col-md-2 nopadding">
                                        用物储备：
                                    </label>
                                    <div id="A_5_Div" class="col-sm-10 col-md-10">
                                        <label class="padding-top-5">
                                            <input id="A_5_1" name="A_5" type="checkbox" value="0">
                                            轮椅&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_5_2" name="A_5" type="checkbox" value="0">
                                            病床&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_5_3" name="A_5" type="checkbox" value="0">
                                            气垫床&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_5_4" name="A_5" type="checkbox" value="0">
                                            吸痰器&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_5_5" name="A_5" type="checkbox" value="0">
                                            雾化机&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_5_6" name="A_5" type="checkbox" value="0">
                                            氧气机&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_5_7" name="A_5" type="checkbox" value="0">
                                            其他&nbsp;&nbsp;
                                        </label>
                                        <input id="A_5_7_1" name="A_5_7" type="text" style="display: none;">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-12">
                                <div class="col-sm-12 col-md-12">
                                    <label id="A_6" class="control-label col-sm-2 col-md-2 nopadding">
                                        定期回诊：
                                    </label>
                                    <div id="A_6_Div" class="col-sm-10 col-md-10">
                                        <label class="padding-top-5">
                                            <input id="A_6_1" name="A_6" type="radio" value="0">
                                            有（家医回诊）&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_6_2" name="A_6" type="radio" value="0">
                                            有（自行回诊）&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_6_3" name="A_6" type="radio" value="0">
                                            无&nbsp;&nbsp;
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-12">
                                <div class="col-sm-12 col-md-12">
                                    <label id="A_7" class="control-label col-sm-2 col-md-2 nopadding">
                                        居家安排：
                                    </label>
                                    <div id="A_7_Div" class="col-sm-10 col-md-10">
                                        <label class="padding-top-5">
                                            <input id="A_7_1" name="A_7" type="radio" value="0">
                                            无变动&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_7_2" name="A_7" type="radio" value="0">
                                            已更换&nbsp;&nbsp;
                                        </label>
                                        <input id="A_7_2_1" name="A_7_2" type="text" style="display: none;">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-12">
                                <div class="col-sm-12 col-md-12">
                                    <label id="A_8" class="control-label col-sm-2 col-md-2 nopadding">
                                        照顾者：
                                    </label>
                                    <div id="A_8_Div" class="col-sm-10 col-md-10">
                                        <label class="padding-top-5">
                                            <input id="A_8_1" name="A_8" type="radio" value="0">
                                            无变动&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_8_2" name="A_8" type="radio" value="0">
                                            已更换&nbsp;&nbsp;
                                        </label>
                                        <input id="A_7_2_1" name="A_8_2" type="text" style="display: none;">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-12">
                                <div class="col-sm-12 col-md-12">
                                    <label id="A_9" class="control-label col-sm-2 col-md-2 nopadding">
                                        访视情况：
                                    </label>
                                    <div id="A_9_Div" class="col-sm-10 col-md-10">
                                        <label class="padding-top-5">
                                            <input id="A_9_1" name="A_9" type="radio" value="0">
                                            电访&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_9_2" name="A_9" type="radio" value="0">
                                            家访&nbsp;&nbsp;
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-12">
                                <div class="col-sm-12 col-md-12">
                                    <label id="A_10" class="control-label col-sm-2 col-md-2 nopadding">
                                        接受访问者：
                                    </label>
                                    <div id="A_10_Div" class="col-sm-10 col-md-10">
                                        <label class="padding-top-5">
                                            <input id="A_10_1" name="A_10" type="radio" value="0">
                                            本人&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_10_2" name="A_10" type="radio" value="0">
                                            家属&nbsp;&nbsp;
                                        </label>
                                        <input id="A_7_2_1" name="A_10_2" type="text" style="display: none;">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-12">
                                <div class="col-sm-12 col-md-12">
                                    <label id="A_11" class="control-label col-sm-2 col-md-2 nopadding">
                                        访视记录：
                                    </label>
                                    <div id="A_11_Div" class="col-sm-10 col-md-10">
                                        <label class="padding-top-5">
                                            <input id="A_11_1" name="A_11" type="radio" value="0">
                                            无照护问题&nbsp;&nbsp;
                                        </label>
                                        <label class="padding-top-5">
                                            <input id="A_11_2" name="A_11" type="radio" value="0">
                                            有&nbsp;&nbsp;
                                        </label>
                                        <input id="A_7_2_1" name="A_11_2" type="text" style="display: none;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>--%>
                    <%--<div class="tab-pane fade" id="dfContent1">
                        <div class="form-group">
                            <div class="col-md-12">
                                2
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="dfContent2">
                        <div class="form-group">
                            <div class="col-md-12">
                                3
                            </div>
                        </div>
                    </div>--%>
                </div>
            </div>
        </div>

        <div class="panel panel-default">
            <div class="form-group">
                <div class="col-md-12">
                    <div class="col-sm-12 col-md-12">
                        <label class="col-md-2 col-xs-6 control-label ">电访人员：</label>
                        <div class="col-md-3 col-xs-6 no-padding-right">
                            <p id="dfryxm" class="form-control-static"></p>
                        </div>

                        <label class="col-md-2 col-xs-6 control-label ">电访日期：</label>
                        <div class="col-md-3 col-xs-6 no-padding-right">
                            <p id="dfrq" class="form-control-static"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 电访内容结束 -->
        <input type="text" class="form-control   input-sm hidden"
               id="DFJLLSH" name="DFJLLSH" placeholder="用于绑定电访记录估流水号" />
    </form>

    <script src="yyhpt/pages/dfgl/dfglDetail.js" type="text/javascript"></script>
</body>
</html>
