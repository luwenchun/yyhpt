<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>

<script language="JavaScript">
    function tuichu() {
        if (confirm("退出系统,请确定!")) {
            var browserName = navigator.appName;
            if (browserName == "Netscape") {
                window.open('', '_self', '');
                window.close();
            } else {
                window.close();
            }
        }
    }

    //注销系统
    function zhuxiao() {
        BootstrapDialog.confirm({
            title: '提示信息',
            message: '是否确认退出本系统？',
            type: BootstrapDialog.TYPE_PRIMARY,
            closable: true,
            draggable: true,
            btnCancelLabel: '否',
            btnOKLabel: '是',
            callback: function (result) {
                if (result) {
                    var dlly =${sessionScope.dlly};
                    if (dlly == "0") {
                        window.open('${basePath}', '_self');
                    }
                    if (dlly == "1")  //手机
                    {
                        window.open('${basePath}/syspages/appwlogin.jsp', '_self');
                    }
                    if (dlly == "2")  //pad
                    {
                        window.open('${basePath}/syspages/apploginpad.jsp', '_self');
                    }
                } else {
                    return;
                }
            }
        });


        //alert(dlly);  // javascript:window.open('${basePath}','_self');
    }
</script>

<header class="main-header" style="padding-bottom: 0px">
    <!-- Logo -->
    <a href="#" class="logo"> <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><img
                src="./layouts/img/app/logo-short.png"/></span> <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><img src="./layouts/img/app/logo.png"
                                   style="margin-left: -17px;"/></span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top " role="navigation">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas"
           role="button"> <span class="sr-only">Toggle navigation</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu ">
            <ul class="nav navbar-nav ">
                <li>
                    <div style="float: right; vertical-align: middle; margin-top: 10px;">
                        <a href="#" style="color: #ffffff; padding-right: 10px;"> <i
                                class="glyphicon user_info fa-fw"
                                style="width: 33px; vertical-align: middle;"></i>&nbsp;<font
                                style="font-size: 12px; vertical-align: middle;">${ryxm }，您好</font>
                        </a>
                        <%--   <a  href="javascript:jcsz(1612);" data-toggle="tooltip" data-placement="bottom" title="基础设置" style="color: #ffffff;padding-right: 10px;text-decoration:none;">
                            <i class="glyphicon glyphicon-cog fa-fw" style="vertical-align: middle"></i>
                        </a>
                        <a  href="javascript:showMenus();" data-toggle="tooltip" data-placement="bottom"  title="全部菜单" style="color: #ffffff;padding-right: 10px;text-decoration:none;">
                            <i id="qbcd" class="fa   fa-list  fa-fw" style="vertical-align: middle;padding-top: 3px"></i>
                        </a>
                        <a  href="javascript:window.open('<%=basePath %>/jsp/main.jsp','_self');" data-toggle="tooltip" data-placement="bottom"  title="首页" style="color: #ffffff;padding-right: 10px;text-decoration:none;">
                            <i class="glyphicon  glyphicon-home  fa-fw" style="vertical-align: middle"></i>
                        </a> --%>
                        <a href="javascript:zhuxiao();"
                           data-toggle="tooltip" data-placement="bottom" title="注销"
                           style="color: #ffffff; padding-right: 10px; text-decoration: none;">
                            <i class="glyphicon glyphicon-log-out fa-fw"
                               style="vertical-align: middle"></i>
                        </a>
                        <!-- <a href="javascript:tuichu();"
                            data-toggle="tooltip" data-placement="bottom" title="退出"
                            style="color: #ffffff; padding-right: 10px; text-decoration: none;">
                            <i class="glyphicon glyphicon-remove fa-fw"
                            style="vertical-align: middle"></i>
                        </a> -->&nbsp;&nbsp;
                    </div>
                </li>
                <!--    <li>
                    <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
                 </li> -->
            </ul>
        </div>
    </nav>
</header>


