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
<script></script>

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

<script>

    $(function () {

        var row = $('#xmSearch').data('row');

        var initForm = function (rowPersonInfo) {
            $('#grxx_xm').html(rowPersonInfo.XM);
            $('#grxx_xb').html(rowPersonInfo.XBMC ? rowPersonInfo.XBMC : '');
            $('#grxx_csrq').html(rowPersonInfo.CSRQ ? rowPersonInfo.CSRQ : '');
            $('#grxx_lxdh').html(rowPersonInfo.LXDH ? rowPersonInfo.LXDH : '');
            $('#grxx_ryrq').html(rowPersonInfo.RYRQ ? rowPersonInfo.RYRQ : '');
            $('#grxx_cyrq').html(rowPersonInfo.CYRQ ? rowPersonInfo.CYRQ : '');
        };

        var getDetialInfo = function () {
            var deferred = when.defer();
            $.getJSON('yyhpt_sagl.do?action=getTDZHDetials', {sapglsh: row.SAPGLSH}, function (res) {
                deferred.resolve(res);
            });
            return deferred.promise;
        };

        var createATab = function (v, o) {
            var li = '<li class="tab" id="id_tab_' + v.KSDM + '"><a href="#' + v.KSDM + '"' + ' data-toggle="tab">' + v.KSMC + '</a></li>';
            o.append(li);
        };

        var create3Tabs = function (data) {
            var $tabs = $('#Tabs');
            $.each(data, function (k, v) {
                if (k >= 3) {
                    return false;
                }
                createATab(v, $tabs);
            })

        };

        var createDropdownTab = function (data) {
            var dropdown = '<li class="dropdown"> <a href="#" id="tabDrop" class="dropdown-toggle" data-toggle="dropdown">其他科室<b class="caret"></b> </a> <ul class="dropdown-menu" id="id_dropdown" role="menu" aria-labelledby="tabDrop"></ul> </li>';
            $('#Tabs').append(dropdown);
            var $dropdown = $('#id_dropdown');
            $.each(data, function (k, v) {
                if (k >= 3) {
                    createATab(v, $dropdown);
                }
            })
        };

        var createAllTabsAndContents = function (data) {
            create3Tabs(data);
            if (data.length > 3) {
                createDropdownTab(data);
            }
            createTabContent(data);
        };

        var createFooter = function (title, name, date) {
            var footer = '';
            if(name==null){
                name = "";
            }
            if(date==null){
                date = "";
            }
            //if (name || date) {
                footer = '<div><label class="col-md-offset-1">' + title + '人员：</label><label style="width:100px;">' + name + '</label><label class="col-md-offset-4">' + title + '日期：</label><label>' + date + '</label></div>';
            //}
            return footer;
        };

        var createTabContent = function (data) {

            var $tabContent = $('#TabContent');
            $.each(data, function (k, v) {
                var text = '';
                if ($('#xmSearch').data('src') === '收案管理') {
                    text = v.ZHJL ? v.ZHJL : '';
                } else {
                    text = v.XGZHJL ? v.XGZHJL : v.ZHJL ? v.ZHJL : '';
                }
                var content = '<div class="tab-pane fade in" id="' + v.KSDM + '"><textarea id="id_textarea_' + v.TDZHLSH + '" maxlength=2000 rows=5 style="width: 100%">' + text + '</textarea>';

                if($('#xmSearch').data('src') === '收案管理') {
                    content += createFooter('记录', v.JLRYXM, v.JLSJ);
                }else{
                    content += createFooter('记录', v.JLRYXM, v.JLSJ) + createFooter('修改', v.XGJLRYXM, v.XGJLSJ);
                }
                content += '</div>';

                $tabContent.append(content);
                $('#id_textarea_' + v.TDZHLSH).data('jlrygh', v.JLRYGH);
            })
        };

        var activeTab = function () {
            var tabs = $('.tab');
            if (tabs.length) {
                $(tabs[0]).find('a').trigger('click');
            }
        };


        initForm(row);

        getDetialInfo()
                .then(createAllTabsAndContents)
                .then(activeTab);

        $('#btn_Cyxj').bind('click', function () {

            //var patid = rowPersonInfo.YNGRBSH;
            var syxh = row.JHPGLSH;
            var sUrl = cyxjUrl+"&jzlsh="+syxh;
            console.log(sUrl);
            window.open(sUrl);

            /*BootstrapDialog.show({
                title: '出院小结',
                size: BootstrapDialog.SIZE_WIDE,
                cssClass: 'dialog-bg-color dialog-footer-space',
                closable: true,
                draggable: true,
                closeByBackdrop: false,
                closeByKeyboard: false,
                message: $('<div></div>').load('yyhpt/views/gapg/cyxjDetail.jsp'),
                buttons: [{
                    label: '退出', cssClass: 'btn-default btn-sm',
                    action: function (dialogItself) {
                        dialogItself.close();
                    }
                }],
                onshow: function (dialogRef) {
                },
                onshown: function (dialogRef) {
                },

                onhide: function (dialogRef) {
                },
                onhidden: function (dialogRef) {
                }
            });*/
        });
    });

    var prepareData = function () {
        var deferred = when.defer(),
                data = [], textarea = $('textarea');
        $.each(textarea, function (k, v) {
            var id = $(v).prop('id'),
                    tdzhlsh = id.substr('id_textarea_'.length, id.length),
                    zhjl = $(v).val(), jlrygh = $(v).data('jlrygh');
            data.push({tdzhlsh: tdzhlsh, zhjl: zhjl, jlrygh: jlrygh})
        });

        deferred.resolve(data);
        return deferred.promise;


    };

    var doSave = function (data) {
        var deferred = when.defer();
        $.ajax({
            url: 'yyhpt_sagl.do?action=saveZHJL',
            type: "post",
            dataType: "json",
            data: {
                'data': JSON.stringify(data),
                'src': $('#xmSearch').data('src')

            },
            success: function (res) {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    };

</script>