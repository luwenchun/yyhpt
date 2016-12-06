<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>业务导航</title>
    <style type="text/css">
        /*分组高度*/
        .group-head {
            height: 40px;
        }

        /*分组标题格式*/
        .group-head-title {
            margin-top: 0px;
            margin-bottom: 0px;
            font-weight: bold;
            font-size: 20px;
            color: #000000;
        }

        .ywdh-item {
            height: 46px;
            text-align: center;
        }

        /*业务标题背景图-first*/
        .ywdh-item-backgroud-first {
            background: url('layouts/img/grywdh/img_8.png') no-repeat;
        }

        /*业务标题背景图-first-hover*/
        .ywdh-item-backgroud-first.selected,
        .ywdh-item-backgroud-first:hover {
            background: url('layouts/img/grywdh/img_8_hover.png') no-repeat;
        }

        /*业务标题背景图-middle*/
        .ywdh-item-backgroud-middle {
            background: url('layouts/img/grywdh/img_9.png') no-repeat;
        }

        /*业务标题背景图-middle-hover*/
        .ywdh-item-backgroud-middle.selected,
        .ywdh-item-backgroud-middle:hover {
            background: url('layouts/img/grywdh/img_9_hover.png') no-repeat;
        }

        /*业务标题背景图-end*/
        .ywdh-item-backgroud-end {
            background: url('layouts/img/grywdh/img_10.png') no-repeat;
        }

        /*业务标题背景图-end-hover*/
        .ywdh-item-backgroud-end.selected,
        .ywdh-item-backgroud-end:hover {
            background: url('layouts/img/grywdh/img_10_hover.png') no-repeat;
        }

        /*业务标题DIV大小*/
        .ywdh-item-size {
            height: 50px;
            width: 134px;
            cursor: pointer;
            color: black;
            -webkit-transition: color 0.3s;
            transition: color 0.3s;
        }

        .ywdh-item-size.selected,
        .ywdh-item-size:hover {
            color: white;
        }

        /*业务标题图标的位置*/
        .ywdh-item-img {
            margin-top: 12px;
        }

        /*业务标题内容样式*/
        .ywdh-item-text {
            padding-left: 0px;
            padding-right: 0px;
            height: 50px;
            line-height: 50px;
        }

        .ywdh-content-space {
            margin-top: 15px;
        }

        .ywdh-content-gray {
            height: 30px;
            background-color: #DCDCDC;
        }

        .ywdh-content-lightGray {
            height: 100px;
            background-color: #F5F5F5;
        }

        .ywdh-content {
            height: 160px;
            padding-left: 0px;
            padding-right: 0px;
        }

        .ywdh-content-icon {
            padding-top: 60px;
        }

        .ywdh-content-title {
            padding: 6px;
        }

        /*业务状态样式*/
        .ywdh-item-statu {
            padding-top: 6px;
            color: #38B14C;
            text-align: right;
        }

        .ywdh-content-row-space {
            padding: 0px 0px 6px 0px;
            margin: 0px;
        }

        .ywdh-content-row-num {
            text-align: center;
        }

        .ywdh-link {
            text-decoration: underline;
            color: #EC7C59;
        }

    </style>
</head>
<body>
<form id="ywdhForm" method="post" class="form-horizontal"
      onclick="return false;" style="font-size: 13px;">
    <div class="form-body dialog-form-body">
        <!-- 个人基本信息开始-->
        <jsp:include page="/yyhpt/views/common/grjbxxDetail.jsp"></jsp:include>
        <!-- 个人基本信息结束 -->

        <!-- 业务导航开始-->
        <div class="panel panel-default">
            <div class="panel-heading group-head">
                <a data-toggle="collapse" data-parent="#accordion" href="#ywdhContent">
                    <h3 class="group-head-title">
                        <span class="glyphicon glyphicon-th"></span> 业务导航
                    </h3>
                </a>
            </div>
            <div id="ywdhContent" class="panel-body">
                <div id="ywItem" class="row" style="margin:0px 15px 0px 0px">
                    <div class="col-md-2 col-md-offset-2 col-xs-6 ywdh-item">
                        <div id="pgglDiv" class="ywdh-item-size ywdh-item-backgroud-first">
                            <div class="col-md-4 col-xs-4"><img src="layouts/img/grywdh/img_1.png" class="ywdh-item-img"
                                                                alt=""></div>
                            <div class="col-md-6 col-xs-6 ywdh-item-text"><p>签约管理</p></div>
                        </div>
                    </div>
                    <div class="col-md-2 col-xs-6 ywdh-item">
                        <div id="qyglDiv" class="ywdh-item-size ywdh-item-backgroud-middle">
                            <div class="col-md-4 col-xs-4"><img src="layouts/img/grywdh/img_2.png" class="ywdh-item-img"
                                                                alt=""></div>
                            <div class="col-md-6 col-xs-6 ywdh-item-text"><p>计划管理</p></div>
                        </div>
                    </div>
                    <div class="col-md-2 col-xs-6 ywdh-item">
                        <div id="jhglDiv" class="ywdh-item-size ywdh-item-backgroud-middle">
                            <div class="col-md-4 col-xs-4"><img src="layouts/img/grywdh/img_3.png" class="ywdh-item-img"
                                                                alt=""></div>
                            <div class="col-md-6 col-xs-6 ywdh-item-text"><p>服务管理</p></div>
                        </div>
                    </div>
                    <div class="col-md-2 col-xs-6 ywdh-item">
                        <div id="jsglDiv" class="ywdh-item-size ywdh-item-backgroud-end">
                            <div class="col-md-4 col-xs-4"><img src="layouts/img/grywdh/img_4.png" class="ywdh-item-img"
                                                                alt=""></div>
                            <div class="col-md-6 col-xs-6 ywdh-item-text"><p>结算管理</p></div>
                        </div>
                    </div>
                </div>

                <div id="ywContent" class="row" style="margin:0px 15px 0px 30px">
                    <div class="col-md-12" id="id_pause" style="display: none">
                        <div class="col-md-4 col-xs-12 ywdh-content-space nopadding">
                            <div class="col-md-9 col-xs-9 ywdh-content">
                                <div class="ywdh-content-gray">
                                    <div class="col-md-7 col-sm-7 col-xs-7"><p class="ywdh-content-title">计划制定</p></div>
                                    <div class="col-md-5"><p class="ywdh-item-statu"></p></div>
                                </div>
                                <div class="ywdh-content-lightGray">
                                    <div class="col-md-12">
                                        <div class="col-md-2 ywdh-content-row-space">已选</div>
                                        <div class="col-md-2 ywdh-content-row-space ywdh-content-row-num">
                                            <a href="#" class="ywdh-link">3</a>
                                        </div>
                                        <div class="col-md-7 ywdh-content-row-space">个服务包</div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="col-md-2 ywdh-content-row-space"></div>
                                        <div class="col-md-2 ywdh-content-row-space ywdh-content-row-num">
                                            <a href="#" class="ywdh-link">73</a>
                                        </div>
                                        <div class="col-md-7 ywdh-content-row-space">个服务项目</div>
                                    </div>
                                </div>
                                <div class="ywdh-content-gray"></div>
                            </div>
                            <div class="col-md-3 ywdh-content-icon"><img src="layouts/img/grywdh/ywdh_icon_right.png"
                                                                         alt=""></div>
                        </div>
                        <div class="col-md-4 col-xs-12 ywdh-content-space nopadding">
                            <div class="col-md-9 col-xs-9 ywdh-content">
                                <div class="ywdh-content-gray">
                                    <div class="col-md-7 col-sm-7 col-xs-7"><p class="ywdh-content-title">计划审核</p></div>
                                    <div class="col-md-5"><p class="ywdh-item-statu">审核通过</p></div>
                                </div>
                                <div class="ywdh-content-lightGray">
                                    <div class="col-md-12">
                                        <div class="col-md-6 ywdh-content-row-space">新增服务项目</div>
                                        <div class="col-md-2 ywdh-content-row-space ywdh-content-row-num">
                                            <a href="#" class="ywdh-link">3</a>
                                        </div>
                                        <div class="col-md-3 ywdh-content-row-space">个</div>
                                    </div>
                                </div>
                                <div class="ywdh-content-gray"></div>
                            </div>
                            <div class="col-md-3 ywdh-content-icon"><img src="layouts/img/grywdh/ywdh_icon_right.png"
                                                                         alt=""></div>
                        </div>
                        <div class="col-md-4 col-xs-12 ywdh-content-space nopadding">
                            <div class="col-md-9 col-xs-9 ywdh-content">
                                <div class="ywdh-content-gray">
                                    <div class="col-md-7 col-sm-7 col-xs-7"><p class="ywdh-content-title">计划执行</p></div>
                                    <div class="col-md-5"><p class="ywdh-item-statu"></p></div>
                                </div>
                                <div class="ywdh-content-lightGray">
                                    <div class="col-md-12">
                                        <div class="col-md-3 ywdh-content-row-space">已执行</div>
                                        <div class="col-md-2 ywdh-content-row-space ywdh-content-row-num">
                                            <a href="#" class="ywdh-link">40</a>
                                        </div>
                                        <div class="col-md-7 ywdh-content-row-space">项</div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="col-md-3 ywdh-content-row-space">未执行</div>
                                        <div class="col-md-2 ywdh-content-row-space ywdh-content-row-num">
                                            <a href="#" class="ywdh-link">34</a>
                                        </div>
                                        <div class="col-md-7 ywdh-content-row-space">项</div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="col-md-3 ywdh-content-row-space">已停止</div>
                                        <div class="col-md-2 ywdh-content-row-space ywdh-content-row-num">
                                            <a href="#" class="ywdh-link">2</a>
                                        </div>
                                        <div class="col-md-7 ywdh-content-row-space">项</div>
                                    </div>
                                </div>
                                <div class="ywdh-content-gray"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-11 col-md-offset-1" id="id_sign" style="display: block">
                        <div class="col-md-4 col-xs-12 ywdh-content-space nopadding">
                            <div class="col-md-9 col-xs-9 ywdh-content">
                                <div class="ywdh-content-gray">
                                    <div class="col-md-7 col-sm-7 col-xs-7"><p class="ywdh-content-title">签约情况</p></div>
                                    <div class="col-md-5"><p class="ywdh-item-statu"></p></div>
                                </div>
                                <div class="ywdh-content-lightGray" style="text-align: center">
                                    <div class="col-md-12" style="text-align: left">未签约</div>
                                    <div class="col-md-12">
                                        <img src="layouts/img/grywdh/icon_签约情况_待签约.png" alt=""
                                             style="margin-right: 20px;margin-left: 15px;">
                                    </div>
                                </div>
                                <div class="ywdh-content-gray"></div>
                            </div>
                        </div>
                        <div class="col-md-4 col-xs-12 ywdh-content-space nopadding">
                            <div class="col-md-9 col-xs-9 ywdh-content">
                                <div class="ywdh-content-gray">
                                    <div class="col-md-7 col-sm-7 col-xs-7"><p class="ywdh-content-title">中止情况</p></div>
                                    <div class="col-md-5"><p class="ywdh-item-statu"></p></div>
                                </div>
                                <div class="ywdh-content-lightGray" style="text-align: center">
                                    <div class="col-md-12" style="text-align: left">正常</div>
                                    <div class="col-md-12"><img src="layouts/img/grywdh/icon_结算情况_中止.png" alt=""
                                                                style="margin-right: 20px;margin-left: 15px;"></div>
                                </div>
                                <div class="ywdh-content-gray"></div>
                            </div>
                        </div>
                        <div class="col-md-4 col-xs-12 ywdh-content-space nopadding">
                            <div class="col-md-9 col-xs-9 ywdh-content">
                                <div class="ywdh-content-gray">
                                    <div class="col-md-7 col-sm-7 col-xs-7"><p class="ywdh-content-title">结案情况</p></div>
                                    <div class="col-md-5"><p class="ywdh-item-statu"></p></div>
                                </div>
                                <div class="ywdh-content-lightGray" style="text-align: center">

                                    <div class="col-md-12" style="text-align: left">未结案</div>
                                    <div class="col-md-12">
                                        <img src="layouts/img/grywdh/icon_结算情况_停止.png" alt=""
                                             style="margin-right: 20px;margin-left: 15px;">
                                    </div>
                                </div>
                                <div class="ywdh-content-gray"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 业务导航结束 -->
    </div>
</form>
<script src="yyhpt/pages/grywdh/grywdh_details.js" type="text/javascript"></script>
</body>
</html>
