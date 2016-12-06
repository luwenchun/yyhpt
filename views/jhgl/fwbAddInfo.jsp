<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script src="yyhpt/pages/jhgl/fwbAddInfo.js" type="text/javascript"></script>
<style>
    .bgddd {
        color: #FFFFFF;
        background-image: url("layouts/img/button/package.png");
        text-align: center;
        width: 218px;
        height: 69px;
        padding-top: 24px;
    }

    .bgddd_click {
        color: #FFFFFF;
        background-image: url("layouts/img/button/package_selected.png");
        text-align: center;
        width: 218px;
        height: 69px;
        padding-top: 24px;
    }

    .col-lg-3 {
        width: 16%;
    }
</style>

<div class="panel-body fullhgtpanel">
    <div class="form-group">
        <div class="pull-right ">
            <button id="sure" class="btn btn-default btn-sm" style='margin-top: 5px;'>确定</button>
            <button id="id_canlce" class="btn btn-default btn-sm" style='margin-top: 5px;margin-right:15px'>退出</button>
        </div>
    </div>
    <form id="defaultForm" method="post" class="form-horizontal"
          onclick="return false;" style="font-size: 13px;">
        <!--  服务套餐开始-->
        <div class="panel panel-default">
            <div class="panel-heading" style="height: 40px">
                <a data-toggle="collapse" data-parent="#accordion"
                   href="#tjtccontent">
                    <h3 style="margin-top: 0px;margin-bottom: 0px;font-weight:bold;font-size:20px;color:#000000;">
                        <span class="glyphicon glyphicon-th"></span>服务套餐</h3>
                </a>
            </div>

            <div id="tjtccontent">
                <div style='margin-top: 10px;'>
                    <div class="panel-body" id="fwbAddInfopanel">
                    </div>
                </div>
            </div>
        </div>
        <!-- 服务套餐结束 -->
        <div id="fwbxz" class="panel panel-default">
            <div class="panel-heading">
                <a data-toggle="collapse" data-parent="#accordion"
                   href="#fwbInfoDetailtable">
                    <h3 style="margin-top: 0px;margin-bottom: 0px;font-weight:bold;font-size:20px;color:#000000;">
                        <span class="glyphicon glyphicon-th"></span> 服务套餐项目明细</h3>
                </a>
            </div>
            <table id="fwbInfoDetailtable" class="table-container"></table>
        </div>
    </form>
</div>


