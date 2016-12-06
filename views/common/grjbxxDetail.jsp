<%--
  ~ Copyright (c) 2016. Winning Health Technology Group Co.,Ltd. All Rights Reserved
  --%>

<%--
  Created by IntelliJ IDEA.
  User: Mr.Wang
  Date: 2016/11/23
  Time: 17:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<!-- 个人基本信息开始-->
<div class="panel panel-default">
    <div class="panel-heading" style="height: 40px">
        <a data-toggle="collapse" data-parent="#accordion"
           href="#grjbxxcontent">
            <h3
                    style="margin-top: 0px; margin-bottom: 0px; font-weight: bold; font-size: 20px; color: #000000;">
                <span class="glyphicon glyphicon-th"></span> 个人信息
            </h3>
        </a>
    </div>
    <div id="grjbxxcontent" class="panel-collapse collapse in nopadding">
        <div
                class="form-horizontal form-bordered form-row-stripped nopadding">
            <div class="form-group list-space-row">
                <div class="col-md-2 col-xs-3 nopadding" style="text-align:right;">
                    <label class="control-label">姓名：</label>
                </div>
                <p id="XM" class="control-label col-md-2 col-xs-8 nopadding"
                   style="text-align: left;color: #434343;"></p>

                <div class="col-md-2 col-xs-3 nopadding" style="text-align:right;">
                    <label class="control-label">性别：</label>
                </div>
                <p id="XBMC" class="control-label col-md-2 col-xs-9 nopadding"
                   style="text-align: left;color: #434343;"></p>

                <div class="col-md-2 col-xs-3 nopadding" style="text-align:right;">
                    <label class="control-label nopadding">年龄：</label>
                </div>
                <p id="CSRQ" class="control-label col-md-2 col-xs-9 nopadding"
                   style="text-align: left;color: #434343;"></p>
            </div>
            <%--<hr class="hrmin"/>--%>
            <div class="form-group list-space-row">
                <div class="col-md-2 col-xs-3 nopadding" style="text-align:right;">
                    <label class="control-label">联系地址：</label>
                </div>
                <p id="LXDZ" class="nopadding col-md-2 col-xs-9 control-label"
                   style="text-align: left;color: #434343;"></p>
                <div class="col-md-2 col-xs-3 nopadding" style="text-align:right;">
                    <label class="control-label nopadding">医保类别：</label>
                </div>
                <p id="YLFYZFFSMC" class="col-md-2 col-xs-9 nopadding control-label"
                   style="text-align: left;color: #434343;"></p>
                <div class="col-md-2 col-xs-3 nopadding" style="text-align:right;">
                    <label class="control-label nopadding">联系电话：</label>
                </div>
                <p id="LXDH" class="col-md-2 col-xs-9 nopadding control-label"
                   style="text-align: left;color: #434343;"></p>
                <div class="col-md-2 col-xs-9">
                    <button id="btn_EHR" class="btn btn-default btn-sm hidden"
                            style='margin-right: 20px; margin-top: 3px;'>调阅EHR明细
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    /*根据出生日期算出年龄*/
    function jsGetAge(strBirthday){
        var returnAge;
        var strBirthdayArr=strBirthday.split("-");
        var birthYear = strBirthdayArr[0];
        var birthMonth = strBirthdayArr[1];
        var birthDay = strBirthdayArr[2];

        d = new Date();
        var nowYear = d.getFullYear();
        var nowMonth = d.getMonth() + 1;
        var nowDay = d.getDate();

        if(nowYear == birthYear){
            returnAge = 0;//同年 则为0岁
        }
        else{
            var ageDiff = nowYear - birthYear ; //年之差
            if(ageDiff > 0){
                if(nowMonth == birthMonth) {
                    var dayDiff = nowDay - birthDay;//日之差
                    if(dayDiff < 0)
                    {
                        returnAge = ageDiff - 1;
                    }
                    else
                    {
                        returnAge = ageDiff ;
                    }
                }
                else
                {
                    var monthDiff = nowMonth - birthMonth;//月之差
                    if(monthDiff < 0)
                    {
                        returnAge = ageDiff - 1;
                    }
                    else
                    {
                        returnAge = ageDiff ;
                    }
                }
            }
            else
            {
                returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
            }
        }

        return returnAge;//返回周岁年龄

    }
</script>
<!-- 个人基本信息结束 -->
</body>
</html>
