<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<link
        href="frame/plugins/bootstrap-fileinput/bootstrap-fileinput-mulitple.css"
        rel="stylesheet" type="text/css"/>
<style>

    .head-title {
        margin-top: 0px;
        margin-bottom: 0px;
        font-weight: bold;
        font-size: 20px;
        color: #000000;
    }

    /*小屏幕时lable的样式*/
    .control-label-new {
        padding-top: 6px;
        text-align: right;
        /*padding-left: 0px;*/
    }

    .block {
        text-align: center;
        margin: 8px 8px;
        padding: 9px 14px;
        background: #FFC4B4;
        border-radius: 3px;
    }

    .block:hover,
    .block-selected {
        color: #FFFFFF;
        background: #EC6841;
    }

    .block .arrow {
        content: " ";
        border-top-color: #999;
        border-top-color: rgba(0, 0, 0, .25);
        border-bottom-width: 0;
    }

    .block .arrow:after {
        content: " ";
    }

</style>
<!-- 个人基本信息开始-->
<jsp:include page="/yyhpt/views/common/grjbxxDetail.jsp"></jsp:include>
<!-- 个人基本信息结束 -->

<!-- 通道评估开始 -->
<form id="defaultForm" method="post" class="form-horizontal" enctype="multipart/form-data">
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#pgtd_content">
                <h3 class="head-title">
                    <span class="glyphicon glyphicon-th"></span> 评估通道
                </h3>
            </a>
        </div>
        <div id="pgtd_content" class="panel-collapse collapse in nopadding">
            <div class="form-horizontal form-bordered form-row-stripped nopadding">
                <div class="form-group nopadding" style="margin-top: 8px;">
                    <label class="col-md-2 control-label
								control-label-new">轮候机构意向：</label>
                    <div class="col-md-6">
                        <select class="form-control input-sm" id="lhyx"> </select>
                    </div>
                </div>
            </div>
            <div class="form-horizontal form-bordered form-row-stripped nopadding">
                <div class="form-group nopadding" style="margin-top: 8px;">

                    <div class="col-md-4">
                        <div class="block block-selected" id="A">
                            <div class="arrow"></div>
                            <div>特殊通道</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="block" id="B">
                            <div class="arrow"></div>
                            <div>优先通道</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="block" id="C">
                            <div class="arrow"></div>
                            <div>普通通道</div>
                        </div>
                    </div>
                </div>
                <div class="panel panel-default" style="margin: 8px 8px; background-color: #F7F7F7">
                    <div class="form-group nopadding">
                        <div id="tdlx_A_div" style="margin: 8px 6px;"></div>
                        <div id="tdlx_B_div" style="margin: 8px 12px; display: none"></div>

                    </div>
                    <div class="form-group nopadding" style="margin: 8px 12px">
                        <label class="col-md-1 col-sm-2 control-label">附件：</label>
                        <div id="fileDiv" class="col-md-10 col-sm-10" style="padding-top: 6px"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="panel panel-default" id="pgry" style="display: none">
        <div class="form-group nopadding" style="margin-top: 8px;">
            <div class="col-md-4 col-xs-12 del-list-row-space">
                <label class="col-md-6 col-xs-5 control-label
								control-label-new">评估人员：</label>
                <div class="col-md-6 col-xs-7"><p id="id_pgrxm" class="form-control-static"></p></div>

            </div>
            <div class="col-md-4 col-xs-12 del-list-row-space">
                <label class="col-md-6 col-xs-5 control-label
								control-label-new">评估日期：</label>
                <div class="col-md-6 col-xs-7"><p id="id_pgrq" class="form-control-static"></p></div>
            </div>
        </div>
    </div>
</form>
<script src="frame/plugins/bootstrap-fileinput/bootstrap-fileinput-mulitple.js" type="text/javascript"></script>
<script>
    $(function () {
        var row = $('#btn_query').data('row');

        var initButtons = function () {
            var $block = $('.block');
            $block.on('click', function () {
                $('.block').removeClass('block-selected');
                $(this).addClass('block-selected');
                $('input[name=dxlx]').iCheck('uncheck');
                if ($(this).prop('id') === 'A') {
                    $('#tdlx_A_div').show();
                    $('#tdlx_B_div').hide();
                } else if ($(this).prop('id') === 'B') {
                    $('#tdlx_A_div').show();
                    $('#tdlx_B_div').show();
                } else {
                    $('#tdlx_A_div').hide();
                    $('#tdlx_B_div').hide();
                }
            });
        };

        var initPersonInfo = function () {
            $('#XM').html(row.xm ? row.xm : '');
            $('#XBMC').html(row.xbmc ? row.xbmc : '');
            $('#CSRQ').html(jsGetAge(row.csrq) ? jsGetAge(row.csrq) : '');
            $('#YLFYZFFSMC').html(row.ylfyzffsmc ? row.ylfyzffsmc : '');
            $('#LXDH').html(row.sjhm ? row.sjhm : '');
            $('#LXDZ').html(row.jzdxxdz ? row.jzdxxdz : '');
        };

        var checkBlock = function (id) {
            $('#' + id).trigger('click');
        };


        var getDetail = function () {
            $.getJSON('yyhpt_lhdx.do?action=get_details',
                    {pglsh: row.pglsh},
                    function (res) {
                        $('#lhyx').val(res.yxjgdm).trigger('change');
                        checkBlock(res.tdlxdm);
                        $('input[name=dxlx]').prop('checked', false); //trigger之后会选中第一个checkbox，赋值之前先清掉
                        $.each(res.dxlxdm.split('/'), function (k, v) {
                            $('input[name=dxlx][value=' + v + ']').prop('checked', true);
                        });
                        wn.iCheckInit();
                        if (res.pgsj) {
                            $('#id_pgrxm').html(res.pgryxm ? res.pgryxm : '');
                            $('#id_pgrq').html(res.pgsj ? res.pgsj : '');
                            $('#pgry').show();
                        }
                        if (res.shzt === '1') {
                            $('#btn_save').hide();
                            $('.block').off('click');
                            $('#lhyx').prop('disabled', true);
                            $('input[name=dxlx]').prop('disabled', true);
                            displayFiles($('#fileDiv'), 'uploadfiles/LHDX', res.pglsh, res.fj);
                        } else {
                            $.fn.fileinput("show", "uploadfiles/LHDX", res.pglsh, res.fj, "fjdzDiv", "fileDiv");
                        }
                    }
            );
        };

        initButtons();

        initPersonInfo();

        $.when($.getJSON('common.do?action=get_dept', function (res) {
            $('#lhyx').select2({
                language: 'zh-CN',
                data: res,
                allowClear: false,
                multiple: false
            }).val('<%=session.getAttribute("jgbm")%>').trigger('change');
        }), $.getJSON('common.do?action=getDXLX', function (res) {
            wn.iCheckboxByArray($('#tdlx_A_div'), res.part1, 'dxlx', 'dxlx');
            wn.iCheckboxByArrayWithChanged($('#tdlx_B_div'), res.part2, 'dxlx', 'dxlx', '6', null);
            $('input[name=dxlx]').iCheck('uncheck');
        })).then(function () {
            if (row.pglsh) {
                getDetail();
            } else {
                $.fn.fileinput("show", "uploadfiles/LHDX", null, null, "fjdzDiv", "fileDiv");
            }
        });


    });

    var upload = function (data) {
        var formData = getFileData("#defaultForm");
        formData.append("pglsh", data.key);
        event.preventDefault();
        $.ajax({
            url: 'yyhpt_lhdx.do?action=upload',
            type: 'POST',
            data: formData,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (res) {
            },
            error: function () {
                wnform.toast('上传附件失败！');
            }
        });
    };

    var doSave = function () {
        var deferred = when.defer();
        var $selectedBlock = $('.block-selected');
        if ($selectedBlock.prop('id') === 'A' || $selectedBlock.prop('id') === 'B') {
            if ($('input[name=dxlx]:checked').size() <= 0) {
                deferred.reject('请选择特殊通道或优先通道原因!');
                return deferred.promise;
            }
            if ($.fn.fileinput("array").length <= 0) {
                deferred.reject('请上传证明材料!');
                return deferred.promise;
            }
        }
        var row = $('#btn_query').data('row');
        var v = {code: '', name: ''};
        var getDxlx = function () {
            var code = [], name = [];
            $.each($('input[name=dxlx]:checked'), function (k, v) {
                code.push($(v).prop('value'));
                name.push($(v).parent().parent().text().trim());
            });
            v.code = code.join('/');
            v.name = name.join(',');
            return v;
        };
        $.ajax({
            url: 'yyhpt_lhdx.do?action=do_save',
            type: "post",
            dataType: "json",
            data: {
                pglsh: row.pglsh,
                fplsh: row.fplsh,
                yngrbsh: row.yngrbsh,
                yxjgdm: $('#lhyx').val(),
                tdlxdm: $selectedBlock.prop('id'),
                dxlxdm: getDxlx().code,
                dxlxmc: getDxlx().name
            },
            success: function (data) {
                upload(data);
                deferred.resolve(data);
            }
        });
        return deferred.promise;
    };
</script>
