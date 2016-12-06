<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <link href="${basePath}/layouts/css/white/list_page.css" rel="stylesheet">
    <script src="frame/plugins/counterup/jquery.waypoints.min.js"></script>
    <script src="frame/plugins/counterup/jquery.counterup.js"></script>
    <style type="text/css">
        .divtxclick {
            padding-top: 1px;
            height: 50px;
            cursor: pointer;
        }

        #firstDiv,#firstDiv1,#secondDiv {
            cursor: pointer;
        }

        .right-title-padding {
            padding-top: 4px;
        }

        #chart_title {
            height: 30px;
            text-align: center;
            line-height: 60px;
            font-size: 20px;
        }
        .chart svg{
            left: 32%;
        }
    </style>
</head>
<body>
<div class="panel-body">
    <form id="jhglListForm" method="post" class="form-horizontal fwgl-list-font">
        <div id="rwglListItem" class="row">
            <div class="col-lg-4 col-md-4" id="firstDiv">
                <div class="panel list-panel-border">
                    <div class="panel-heading list-panel-head">
                        <div class="row">
                            <div class="col-xs-2 col-md-2 panel-bg-turquoise list-title-left-col">
                                <span class="list-title">民政<br/>来源</span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col block-text-align" id="block1">
                                <span id="mzdrQuery" class="list-title-space list-title-statu">
                                    <span class="list-title-turquoise counter"
                                            style="font-size: 44px;" id="mzdrNum">0</span>
                                    <span>人/居家护理</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-4" id="firstDiv1">
                <div class="panel list-panel-border-red">
                    <div class="panel-heading list-panel-head">
                        <div class="row">
                            <div class="col-xs-2 col-md-2 panel-bg-red list-title-left-col">
                                <span class="list-title">民政<br/>来源</span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col block-text-align" id="block11">
                                <span id="mzdrQuery1" class="list-title-space list-title-statu">
                                    <span class="list-title-red counter"
                                          style="font-size: 44px;" id="mzdrNum1">0</span>
                                    <span>人/机构护理</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-4" id="secondDiv">
                <div class="panel panel-box-border-three">
                    <div class="panel-heading list-panel-head">
                        <div class="row" id="fwpjDiv">
                            <div class="col-xs-2 col-md-2 panel-box-three list-title-left-col">
                                <span class="list-title">执行<br/>数</span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col block-text-align" id="block2"
                                 style="text-align: center">
                                <span id="jhzxQuery" class="list-title-space list-title-statu">
                                    <span class="list-title-statu counter" id="jhzxNum"
                                            style="font-size: 44px;">0</span>
                                    <span>人</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <%--<div class="col-lg-4 col-md-4" id="thirdDiv">
                <div class="panel panel-box-border-three">
                    <div class="panel-heading list-panel-head">
                        <div class="row" id="fwhfDiv">
                            <div class="col-xs-2 col-md-2 panel-box-three list-title-left-col">
                                <span class="list-title">其他<br/>来源
                                </span>
                            </div>
                            <div class="col-xs-10 col-md-10 list-title-middel-col block-text-align" id="block3"
                                 style="text-align: center">
                                <span id="xdjQuery" class="list-title-space list-title-statu">
                                    <span class="list-title-statu counter" id="xdjNum"
                                            style="font-size: 44px;">0</span>
                                    <span>人</span>
                                </span>

                            </div>

                        </div>
                    </div>
                </div>
            </div>--%>
        </div>
        <div class="row">
            <div class="col-lg-12 col-md-12">
                <div id="rqlbDiv" class="panel panel-default">
                    <div class="panel-heading content_title">
                        <span class="glyphicon glyphicon-th"></span> 护理计划数量统计
                    </div>
                    <div id="chart_title"><%= session.getAttribute("jgjc")%>护理计划数量统计(人次)</div>
                    <div id="chart_1" class="chart" style="height: 380px;"></div>
                </div>
            </div>

            <div class="col-lg-4 col-md-4" hidden>
                <div class="panel panel-default " style="background-color: white;">
                    <div class="panel-heading content_title">
                        <span class="glyphicon glyphicon-th"></span> 待处理工作
                    </div>

                    <div class="panel-body divtxclick" id="dfpjj">
                        <div class="col-xs-7 col-md-7 " style="font-size: 14px">
                            <div class="right-title-padding">待分配（居家）</div>
                            <div>
                                <img src="${basePath}/layouts/img/control/img_rl.png"/><span
                                    id="dfpjjTime">2016-08-25</span>
                            </div>
                        </div>
                        <div class="col-xs-5 col-md-5 text-right" style="padding: 15px">
                            <div class="col-xs-6 col-md-6">
                                <span id="dfpjjNum">0</span>
                            </div>
                            <div class="col-xs-6 col-md-6">
                                <img src="${basePath}/layouts/img/control/img_go.png"/>
                            </div>
                        </div>
                    </div>
                    <hr class="hrmin" id="dfpjj-hr"/>

                    <div class="panel-body divtxclick" id="dfpjg">
                        <div class="col-xs-7 col-md-7 " style="font-size: 14px">
                            <div class="right-title-padding">待分配（机构）</div>
                            <div>
                                <img src="${basePath}/layouts/img/control/img_rl.png"/><span
                                    id="dfpjgTime">2016-08-25</span>
                            </div>
                        </div>
                        <div class="col-xs-5 col-md-5 text-right" style="padding: 15px">
                            <div class="col-xs-6 col-md-6">
                                <span id="dfpjgNum">0</span>
                            </div>
                            <div class="col-xs-6 col-md-6">
                                <img src="${basePath}/layouts/img/control/img_go.png"/>
                            </div>
                        </div>
                    </div>
                    <hr class="hrmin" id="dfpjg-hr"/>

                    <div class="panel-body divtxclick" id="dqydj">
                        <div class="col-xs-7 col-md-7 " style="font-size: 14px">
                            <div class="right-title-padding">待签约登记</div>
                            <div>
                                <img src="${basePath}/layouts/img/control/img_rl.png"/><span
                                    id="dqydjTime">2016-08-25</span>
                            </div>
                        </div>
                        <div class="col-xs-5 col-md-5 text-right" style="padding: 15px">
                            <div class="col-xs-6 col-md-6">
                                <span id="dqydjNum">0</span>
                            </div>
                            <div class="col-xs-6 col-md-6">
                                <img src="${basePath}/layouts/img/control/img_go.png"/>
                            </div>
                        </div>
                    </div>
                    <hr class="hrmin" id="dqydj-hr"/>

                    <div class="panel-body divtxclick" id="dqysh">
                        <div class="col-xs-7 col-md-7 " style="font-size: 14px">
                            <div class="right-title-padding">待签约审核</div>
                            <div>
                                <img src="${basePath}/layouts/img/control/img_rl.png"/><span
                                    id="dqyshTime">2016-08-25</span>
                            </div>
                        </div>
                        <div class="col-xs-5 col-md-5 text-right" style="padding: 15px">
                            <div class="col-xs-6 col-md-6">
                                <span id="dqyshNum">0</span>
                            </div>
                            <div class="col-xs-6 col-md-6">
                                <img src="${basePath}/layouts/img/control/img_go.png"/>
                            </div>
                        </div>
                    </div>
                    <hr class="hrmin" id="dqysh-hr"/>

                    <div class="panel-body divtxclick" id="dzdjh">
                        <div class="col-xs-7 col-md-7 " style="font-size: 14px">
                            <div class="right-title-padding">待制定计划</div>
                            <div>
                                <img src="${basePath}/layouts/img/control/img_rl.png"/><span
                                    id="dzdjhTime">2016-08-25</span>
                            </div>
                        </div>
                        <div class="col-xs-5 col-md-5 text-right" style="padding: 15px">
                            <div class="col-xs-6 col-md-6">
                                <span id="dzdjhNum">0</span>
                            </div>
                            <div class="col-xs-6 col-md-6">
                                <img src="${basePath}/layouts/img/control/img_go.png"/>
                            </div>
                        </div>
                    </div>
                    <hr class="hrmin" id="dzdjh-hr"/>

                    <div class="panel-body divtxclick" id="djhsh">
                        <div class="col-xs-7 col-md-7 " style="font-size: 14px">
                            <div class="right-title-padding">待计划审核</div>
                            <div>
                                <img src="${basePath}/layouts/img/control/img_rl.png"/><span
                                    id="djhshTime">2016-08-25</span>
                            </div>
                        </div>
                        <div class="col-xs-5 col-md-5 text-right" style="padding: 15px">
                            <div class="col-xs-6 col-md-6">
                                <span id="djhshNum">0</span>
                            </div>
                            <div class="col-xs-6 col-md-6">
                                <img src="${basePath}/layouts/img/control/img_go.png"/>
                            </div>
                        </div>
                    </div>

                    <hr class="hrmin"/>

                    <div class="panel-body divtxclick" id="djhzx">
                        <div class="col-xs-7 col-md-7 " style="font-size: 14px">
                            <div class="right-title-padding">待计划执行</div>
                            <div>
                                <img src="${basePath}/layouts/img/control/img_rl.png"/><span
                                    id="djhzxTime">2016-08-25</span>
                            </div>
                        </div>
                        <div class="col-xs-5 col-md-5 text-right" style="padding: 15px">
                            <div class="col-xs-6 col-md-6">
                                <span id="djhzxNum">0</span>
                            </div>
                            <div class="col-xs-6 col-md-6">
                                <img src="${basePath}/layouts/img/control/img_go.png"/>
                            </div>
                        </div>
                    </div>

                    <hr class="hrmin" id="djhzx-hr"/>

                    <div class="panel-body divtxclick" id="dfwdj">
                        <div class="col-xs-7 col-md-7 " style="font-size: 14px">
                            <div class="right-title-padding">待服务登记</div>
                            <div>
                                <img src="${basePath}/layouts/img/control/img_rl.png"/><span
                                    id="dfwdjTime">2016-08-25</span>
                            </div>
                        </div>
                        <div class="col-xs-5 col-md-5 text-right" style="padding: 15px">
                            <div class="col-xs-6 col-md-6">
                                <span id="dfwdjNum">0</span>
                            </div>
                            <div class="col-xs-6 col-md-6">
                                <img src="${basePath}/layouts/img/control/img_go.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <div id="toolbar"></div>
</div>

<script src="frame/plugins/amcharts/amcharts/amcharts.js"
        type="text/javascript"></script>
<script src="frame/plugins/amcharts/amcharts/serial.js"
        type="text/javascript"></script>
<script src="frame/plugins/amcharts/amcharts/pie.js"
        type="text/javascript"></script>
<script src="frame/plugins/amcharts/amcharts/radar.js"
        type="text/javascript"></script>
<script src="frame/plugins/amcharts/amcharts/themes/light.js"
        type="text/javascript"></script>
<script src="frame/plugins/amcharts/amcharts/themes/patterns.js"
        type="text/javascript"></script>
<script src="frame/plugins/amcharts/amcharts/themes/chalk.js"
        type="text/javascript"></script>
<script src="frame/plugins/amcharts/ammap/ammap.js"
        type="text/javascript"></script>
<script src="frame/plugins/amcharts/ammap/maps/js/worldLow.js"
        type="text/javascript"></script>
<script src="frame/plugins/amcharts/amstockcharts/amstock.js"
        type="text/javascript"></script>

<script src="${basePath}/yyhpt/pages/home/gzsyList.js" type="text/javascript"></script>
</body>
</html>