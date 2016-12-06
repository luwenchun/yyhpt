<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ page import="org.apache.commons.lang3.StringUtils" %>
<%
    String yljgdm = (String) session.getAttribute("jgbm");

    if (StringUtils.isEmpty(yljgdm)) {
        System.out.println("kkkkkkkkkkk");
        Cookie[] cookies=request.getCookies();
        String dlly="0";
        for(int i=0;i<cookies.length;i++) {    //用一个循环语句遍历刚才建立的Cookie对象数组
             if ("dlly".equals(cookies[i].getName())) {
                     dlly = cookies[i].getValue();
             }

         }

        System.out.println(dlly);

        if  ("0".equals(dlly))
            response.sendRedirect(request.getContextPath());
        if  ("1".equals(dlly))
            response.sendRedirect(request.getContextPath()+"/syspages/appwlogin.jsp");
        if  ("2".equals(dlly))
            response.sendRedirect(request.getContextPath()+"/syspages/apploginpad.jsp");
        //response.sendRedirect("");//相同的Request
        return;
    }
%>
<c:set var="jgbm" value="<%=yljgdm%>" scope="request"/>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no"/>
    <title></title>

    <tiles:insertAttribute name="headInclude"/>
    <script>
        document.title =app.title;
    </script>
</head>


<body class="hold-transition skin-white sidebar-mini fixed"
      data-spy="scroll" data-target="#scrollspy" style="padding-bottom: 0px">
<div class="wrapper" style="padding-bottom: 0px">
    <tiles:insertAttribute name="topbar"/>

    <aside class="main-sidebar ">
        <div class="sidebar" id="scrollspy">
            <!--搜索框 -->
            <section class="sidebar" style="height: auto;">
                <form action="#" method="get" class="sidebar-form hidden"></form>
                <ul class="sidebar-menu" id="leftMenu" style="font-size: 14px;">

                </ul>
            </section>
        </div>
    </aside>

    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header ">
            <ol class="breadcrumb" style="height:36px; background: #fff;">
                <li id="title_dh">
                    <!--  <i class="fa fa-dashboard">&nbsp;</i>&nbsp;<i class="fa fa-chevron-right"></i>&nbsp;&nbsp;<i
                        class="fa fa-chevron-right"></i>&nbsp; -->
                </li>
                <div style="float: right;">
                    <button type="button" id="frame_back" class="btn btn-app-sm btn-circle hidden"
                            style="background-color: transparent;height: 24px;padding: 1px;"><i
                            class="fa  fa-arrow-left "></i></button>
                    &nbsp; &nbsp;
                    <button type="button" id="frame_refresh" class="btn btn-app-sm btn-circle hidden"
                            style="background-color: transparent;height: 24px;padding: 1px;"><i
                            class="fa fa-repeat "></i></button>
                    &nbsp; &nbsp;
                    <button type="button" id="frame_bigger" class="btn btn-app-sm btn-circle"
                            style="background-color: transparent;height: 24px;padding: 1px;"><img
                            src="${basePath}/layouts/img/menu/icon_arrows.png"/></button>
                    &nbsp; &nbsp;
                    <button type="button" id="frame_full" class="btn btn-app-sm btn-circle"
                            style="background-color: transparent;height: 24px;padding: 1px;"><img
                            src="${basePath}/layouts/img/menu/icon_max.png"/></button>
                    &nbsp;
                </div>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content"
                 style="padding-left: 0px; padding-right: 0px; padding-bottom: 0px"
                 id="ajax-content">
            <tiles:insertAttribute name="content"/>
        </section>
        <!-- /.content -->
    </div>

</div>

<img id="progressImgage" class="progress" style="display:none" alt="" src="frame/img/ajax-loader.gif"/>
<div id="maskOfProgressImage" class="mask" style="display:none;z-index: 10000"></div>
<tiles:insertAttribute name="footer"/>

<tiles:insertAttribute name="footInclude"/>
</body>


<script type="text/javascript">
    //获取链接锚点
    var thFlg = location.hash.replace(/^#/, '');
    var fristPage = '';
    var base_64 = new Base64();
    var rootcddm = "01";
    //用于检索菜单的json菜单(暂不支持检索菜单)
    var thdata = [];
    if (thFlg.length > 0) {
        var str_t = base_64.decode(thFlg);
        var splits = str_t.split("_");
        var splitLength = splits.length;
    }

    /* if (splitLength > 1 && rootcddm != "" && (splits[splitLength - 1] != rootcddm)) {
     rootcddm = splits[splitLength - 1]; */
     
    var menuUrls = "${basePath}/getMenuList.do";
    /* 控制回车不重复弹出页面*/
    document.onkeydown = function (event) {
        var target, code, tag;
        if (!event) {
            event = window.event; //针对ie浏览器
            target = event.srcElement;
            code = event.keyCode;
            if (code == 13) {
                tag = target.tagName;
                if (tag == "TEXTAREA") {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        else {
            target = event.target; //针对遵循w3c标准的浏览器，如Firefox
            code = event.keyCode;
            if (code == 13) {
                tag = target.tagName;
                if (tag == "INPUT" || tag == "TEXTAREA") {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    };
    //alert(menuUrls);
    $.ajax({
        url: menuUrls,
        type: 'POST',
        dataType: 'json',
        async: false,
        data: {
            cddm: rootcddm
        }
    }).done(function (datas) {
        data = datas;
    }).fail(function () {
        console.log("error");
    }).always(function () {
        console.log("complete");
    });
    //}
    /*   } */
    var fadiv = 'fa-circle-o'
    $.each(data, function (index, val) {
        if (data[index].TBLJ == "" || data[index].TBLJ == "null")  //图标设置不为空
        {
            fadiv = '<i class="fa fa-circle-o"></i>'
        }
        else
            fadiv = "<img src='${basePath}/layouts/img/menu/" + data[index].TBLJ + "' />&nbsp;"

        var thli = $('<li class="treeview"><a href="javascript:void(0)">' + fadiv + '</i><span>'
                + data[index].CDMC
                + '</span><i class="fa fa-angle-left pull-right"></i></a></li><hr class="hrmin" />');

        if (data[index].childs.length > 0) {
            var ej = '<ul class="treeview-menu">  </ul>';
            var thej = $(ej).appendTo(thli);
            var chs = data[index].childs;
            $.each(chs, function (index2, val) {
                if (chs[index2].childs.length > 0) {
                    var tj = $('<li><a href="javascript:void(0)"><i class="fa fa-circle-o"></i>&nbsp;'
                            + chs[index2].CDMC
                            + '<i class="fa fa-angle-left pull-right"></i></a></li><hr class="hrmin" />')
                            .appendTo(thej);
                    var tjj = '<hr class="hrmin" /><ul class="treeview-menu">  </ul><hr class="hrmin" />';
                    var sanj = $(tjj).appendTo(tj);
                    var sanjs = chs[index2].childs;
                    $.each(sanjs, function (index3, val) {
                        var sj = $('<hr class="hrmin" /><li><a href="' + sanjs[index3].path + '"  id="' + index + '_' + index2 + '_' + index3 + '_' + rootcddm + '"  class="ajax-link"   first="' + data[index].CDMC + '" second="' + chs[index2].CDMC + '" three="' + sanjs[index3].CDMC + '" ><i class="fa fa-circle-o"></i>&nbsp;'
                                + sanjs[index3].CDMC
                                + '</a></li><hr class="hrmin" />').appendTo(sanj);
                        var child_data = {
                            "cdmc": sanjs[index3].CDMC,
                            "thurl": sanjs[index3].CDZD,
                            "cddm": sanjs[index3].CDDM,
                            "cdflg": index + '_' + index2 + '_' + index3 + '_' + rootcddm
                        };
                        thdata.push(child_data);
                    });
                } else {
                    var sj = $('<hr class="hrmin" /><li><a href="' + chs[index2].CDDZ + '"  id="' + index + '_' + index2 + '_' + rootcddm + '"   class="ajax-link"  first="' + data[index].CDMC + '" second="' + chs[index2].CDMC + '" ><i class="fa fa-circle-o"></i>&nbsp;'
                            + chs[index2].CDMC + '</a></li>').appendTo(thej);
                    var child_data = {
                        "cdmc": chs[index2].CDMC,
                        "thurl": chs[index2].CDDZ,
                        "cddm": chs[index2].CDDM,
                        "cdflg": index + '_' + index2 + '_' + rootcddm
                    };
                    thdata.push(child_data);
                }
            });
        }
        else {
            //alert(index+'<<<'+thFlg.length);

            if (index == 0 && thFlg.length == 0) {      //首页
                // window.location.href ="${basePath}/yyhptgzsy.do?action=init";
                fristPage = "${basePath}" + data[index].CDDZ + "#" + base_64.encode(index + '_' + rootcddm);
                // window.location.href ="${basePath}"+data[index].CDDZ + "#" + base_64.encode(index+'_' + rootcddm);
            }
            if (index == 0)
                fadiv = '<i class="fa fa-home"></i>'

            if (data[index].TBLJ == "" || data[index].TBLJ == "null")  //图标设置不为空
            {
                fadiv = '<i class="fa fa-circle-o"></i>'
            }
            else
                fadiv = "<img src='${basePath}/layouts/img/menu/" + data[index].TBLJ + "' />&nbsp;"

            //fa <img src='${basePath}/app/pages/img/menu_jhbg1.png' />
            //faflag="<img src='${basePath}/app/pages/img/menu_jhbg1.png' />"   //<i class="fa '+faflag+'"></i>
            thli = $('<li class="" ><a href=' + data[index].CDDZ + ' id="' + index + '_' + rootcddm + '" class="ajax-link" target=' + data[index].CDMC + ' first="' + data[index].CDMC + '">' + fadiv + '<span>' + data[index].CDMC + '</span></a></li><hr class="hrmin" />');
            var ej = '<ul class="treeview-menu">  </ul>';
            $(ej).appendTo(thli);
        }
        $(thli).appendTo('#leftMenu');
    });

    $('#leftMenu').on('click', 'a', function (e) {
        if ($(this).hasClass('ajax-link')) {
            e.preventDefault();
            var url = "${basePath}" + $(this).attr('href');

            var flgId = $(this).attr('id');
            // alert(url + "#" + base_64.encode(flgId));
            window.location.href = url + "#" + base_64.encode(flgId);
        }
    });

    if (thFlg.length > 0) {
        var str_t = base_64.decode(thFlg);
        try {
            if ($("#" + str_t)) {
                $("#" + str_t).parents("li").addClass("active");
                $("#" + str_t).parents("ul").css("display", "block");
                var bream = '&nbsp;&nbsp;<img src="${basePath}/layouts/img/menu/icon_where.png" />&nbsp;'
                        + $("#" + str_t).attr('first');
                if ($("#" + str_t).attr('second') != undefined)
                    bream += '&nbsp;<i class="fa fa-chevron-right"></i>&nbsp;'
                            + $("#" + str_t).attr('second')
                if ($("#" + str_t).attr('three') != undefined)
                    bream += '&nbsp;<i class="fa fa-chevron-right"></i>&nbsp;'
                            + $("#" + str_t).attr('three')
                $("#title_dh")
                        .html(bream);
            }
        } catch (e) {
            console.log(e);
        }
    }

    if (window.location.href.indexOf('toDoLogin.do') > 0 || window.location.href.indexOf('/index.do') > 0) {
        var thisObj = $("a[href$='" + fristPage + "']").first();
        if (thisObj) {
            thisObj.parents("li").addClass("active");
            thisObj.parents("ul").css("display", "block");

            if (thisObj.attr('first') != undefined) {
                $("#title_dh").html(
                        '<i class="fa fa-dashboard">&nbsp;</i>'
                        + thisObj.attr('first')
                        + '&nbsp;<i class="fa fa-chevron-right"></i>&nbsp;'
                        + thisObj.attr('second')
                        + '&nbsp;<i class="fa fa-chevron-right"></i>&nbsp;'
                        + thisObj.attr('three'));
            }
        }
        window.location.href = fristPage;


    }

    //若无锚点 类似直接跳转的情况判断
    var th_basePath = "${basePath}";
    if (thFlg.length == 0) {

        var currentUrl = window.location.href;


        currentUrl_block = currentUrl.substring(th_basePath.length);
        /* 	alert(currentUrl_block);
         if (window.location.href.indexOf('toDoLogin.do')>0)
         currentUrl_block= "yyhpt/yyhptdxgl.do?action=init#Ml8wMQ=="; */
        var url = '/' + currentUrl_block.substring(currentUrl_block.lastIndexOf('/') + 1, currentUrl_block.length);
        // var ddd="/yyhptdxgl.do?action=init";
        url = url.substring(0, url.indexOf('&'));

        var thisObj = $("a[href$='" + url + "']").first();
        if (thisObj) {
            thisObj.parents("li").addClass("active");
            thisObj.parents("ul").css("display", "block");

            if (thisObj.attr('first') != undefined) {
                var bream = '&nbsp;&nbsp;<img src="${basePath}/layouts/img/menu/icon_where.png" />&nbsp;'
                        + thisObj.attr('first');
                if (thisObj.attr('second') != undefined)
                    bream += '&nbsp;<i class="fa fa-chevron-right"></i>&nbsp;'
                            + thisObj.attr('second')
                if (thisObj.attr('three') != undefined)
                    bream += '&nbsp;<i class="fa fa-chevron-right"></i>&nbsp;'
                            + thisObj.attr('three')
                $("#title_dh")
                        .html(bream);

                /*    $("#title_dh").html(
                 '<i class="fa fa-dashboard">&nbsp;</i>'
                 + thisObj.attr('first')
                 + '&nbsp;<i class="fa fa-chevron-right"></i>&nbsp;'
                 + thisObj.attr('second')
                 + '&nbsp;<i class="fa fa-chevron-right"></i>&nbsp;'
                 + thisObj.attr('three')); */
            }
        }

        //window.location.href =currentUrl_block;

    }

    $("#frame_refresh").click(function (event) {
        window.location.reload();
    });

    $("#frame_back").click(function (event) {
        window.history.go(-1);
    });

    $("#frame_bigger").click(function (event) {
        if (cookie.get("winning_sider") == "1") {
            $("body").removeClass('sidebar-collapse');
            cookie.set("winning_sider", "0", 1800);
        } else {
            $("body").addClass('sidebar-collapse');
            cookie.set("winning_sider", "1", 1800);
        }

    });

    $("#frame_full").click(function (event) {
        fullScreen();
    });

    function fullScreen() {
        var el = document.documentElement;
        var rfs = el.requestFullScreen || el.webkitRequestFullScreen
                || el.mozRequestFullScreen || el.msRequestFullScreen;

        if (typeof rfs != "undefined" && rfs) {
            rfs.call(el);
        } else if (typeof window.ActiveXObject != "undefined") {
            // for Internet Explorer
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript != null) {
                wscript.SendKeys("{F11}");
            }
        }

    }

    $('.sidebar-toggle').on('click', function () {
        settoggle();
    });

    function settoggle() {
        if (cookie.get("winning_sider") == "1") {
            cookie.set("winning_sider", "0", 1800);
        } else {
            cookie.set("winning_sider", "1", 1800);
        }
    }

    $.fn.autoComplete = function (config) {
        //Add dropdown menu to parent div
        var list = $('<ul />').attr('class', 'dropdown-menu').attr('role',
                'listbox').attr('style',
                'overflow-x:hidden;top:32px;font-size:13px;width:100%;').attr(
                'id', 'cdjs');
        $(this).closest('div').append(list);
        $(this).keyup(
                function () {
                    //Character length needs to be higher or equal to min length
                    var searchValue = $(this).val().toLowerCase();
                    if (searchValue.length < config.minLength) {
                        return console.log('Not enough characters set');
                    }
                    var data = thdata;
                    //Get resultset bij query
                    //alert(data);
                    //Data is empty
                    list.empty();
                    if (!data.length) {
                        return list.append($('<li />').html(config.noResultText));
                    }
                    //Add records to dropdown
                    data.forEach(function (record) {
                        if (config.filter && record[config.label].toLowerCase().indexOf(searchValue) != -1
                                || !config.filter) {
                            listitem = $('<li />').append($('<a  thurl="'
                                    + record["thurl"]
                                    + '"  cdflg="'
                                    + record["cdflg"]
                                    + '"  onclick="menuSelect(this)" />')
                                    .attr(
                                            'role',
                                            'option')
                                    .html(
                                            record[config.label]));
                            list.append(listitem);
                            list.show();
                            listitem.click(function () {
                                config.onselect(record,
                                        listitem);
                                list.empty();
                                list.hide();
                            });
                        }
                    });
                    if (list.children().size() == 0) {
                        list.empty();
                        list.hide();
                    }

                });

    };

    function menuSelect(obj) {

        window.location.href = $(obj).attr("thurl") + "#"
                + base_64.encode($(obj).attr("cdflg"));
    }

    /*
     *菜单检索事件
     */
    $(document).ready(function () {
        $('input#autocomplete').autoComplete({
            //Min length of characters before autocomplete will be triggered
            minLength: 1,
            //Path to dataset. Path will be completed with '?query='
            label: 'cdmc',
            //If set to false, autocomplete does not filter the datasource for you
            filter: true,
            //String which will be displayed in autocomplete when there is no result
            noResultText: '未找到',
            //Callback when user clicks autocomplete item
            onselect: function (user) {
                $('input#autocomplete').val('');
            }
        });
    });
    /**
     * ie9文本框默认提示不显示问题修复
     */
    $(function () {
        // Invoke the plugin
        $('input, textarea').placeholder();
    });

    $("body").bind("click", function () {
        $("#cdjs").empty();
        $("#cdjs").hide();
        $('input#autocomplete').val("");
    });

    var loadimg = $('#progressImgage');
    var loadmask = $('#maskOfProgressImage');
</script>

</html>