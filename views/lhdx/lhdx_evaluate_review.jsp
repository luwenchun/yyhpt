<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    .head-title {
        margin-top: 0px;
        margin-bottom: 0px;
        font-weight: bold;
        font-size: 20px;
        color: #000000;
    }

    .form-group {
        margin: 0 12px;
    }

    /*小屏幕时lable的样式*/
    .control-label-new {
        padding-top: 6px;
        text-align: right;
        /*padding-left: 0px;*/
    }

</style>
<!-- 个人基本信息开始-->
<jsp:include page="/yyhpt/views/common/grjbxxDetail.jsp"></jsp:include>
<!-- 个人基本信息结束 -->

<!-- 评估审核开始 -->
<form id="defaultForm" method="post" class="form-horizontal" enctype="multipart/form-data">
    <div class="panel panel-default">
        <div class="panel-heading" style="height: 40px">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#pgsh_content">
                <h3 class="head-title">
                    <span class="glyphicon glyphicon-th"></span> 评估审核
                </h3>
            </a>
        </div>
        <div id="pgsh_content" class="panel-collapse collapse in">
            <div class="form-horizontal form-bordered form-row-stripped">
                <div class="form-group">
                    <label class="col-md-2 control-label
								control-label-new">轮候机构意向：</label>
                    <div class="col-md-6">
                        <p class="form-control-static" id="lhyx"></p>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-md-2 control-label
								control-label-new">评估通道：</label>
                    <div class="col-md-6">
                        <p class="form-control-static" id="pgtd"></p>
                    </div>
                </div>

                <div class="form-group" id="review">
                    <label class="col-md-2 control-label">审 核：</label>
                    <div class="col-md-3">
                        <div class="div_icheck" id="id_review_result"></div>
                    </div>
                    <div class="col-md-3" id="id_shbtgyy_div" style="display: none">
                        <input id="id_shbtgyy" name="shbtgyy" type="text" maxlength="250" title="审核不通过原因必填"
                               style="width: 100%;height: 30px; border: 0px; border-bottom: 1px solid silver;">
                    </div>
                </div>

                <div class="form-group" id="files" style="margin-bottom: 12px">
                    <label class="col-md-2 col-sm-2 control-label">附件：</label>
                    <div id="fileDiv" class="col-md-10 col-sm-10" style="padding-top: 6px"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="panel panel-default" id="shry" style="display: none">
        <div class="form-group nopadding" style="margin-top: 8px;">
            <div class="col-md-4 col-xs-12 del-list-row-space">
                <label class="col-md-6 col-xs-5 control-label
								control-label-new">审核人员：</label>
                <div class="col-md-6 col-xs-7"><p id="id_shryxm" class="form-control-static"></p></div>

            </div>
            <div class="col-md-4 col-xs-12 del-list-row-space">
                <label class="col-md-6 col-xs-5 control-label
								control-label-new">审核日期：</label>
                <div class="col-md-6 col-xs-7"><p id="id_shrq" class="form-control-static"></p></div>
            </div>
        </div>
    </div>
</form>


<script>
    $(function () {
        var array = [{id: '1', text: '通过'}, {id: '2', text: '不通过'}];
        var changed = function (obj) {
            var strSelector = '#id_shbtgyy_div';
            if ($(obj).is(':checked')) {
                if ($(obj).val() == '2') {
                    $(strSelector).show();
                }

            } else {
                $(strSelector).hide();
            }
        };
        var row = $('#btn_query').data('row');
        var initPersonInfo = function () {
            $('#XM').html(row.xm ? row.xm : '');
            $('#XBMC').html(row.xbmc ? row.xbmc : '');
            $('#CSRQ').html(jsGetAge(row.csrq) ? jsGetAge(row.csrq) : '');
            $('#YLFYZFFSMC').html(row.ylfyzffsmc ? row.ylfyzffsmc : '');
            $('#LXDH').html(row.sjhm ? row.sjhm : '');
            $('#LXDZ').html(row.jzdxxdz ? row.jzdxxdz : '');
        };
        var getDetail = function () {
            $.getJSON('yyhpt_lhdx.do?action=get_details',
                    {pglsh: row.pglsh},
                    function (res) {
                        if (res.shzt === '2') {
                            $('#id_shbtgyy_div').show();
                            wn.iRadioByArrayWithChanged($('#id_review_result'), array, '', 'isPassed', 4, changed, res.shzt);
                            $('#id_shbtgyy').val(res.shbtgyy);
                        }
                        $('#lhyx').html(res.yxjgmc ? res.yxjgmc : '')
                                .data('yxjgdm', res.yxjgdm);
                        $('#pgtd').html((res.tdlxmc ? res.tdlxmc : '') + (res.dxlxmc ? ('(' + res.dxlxmc + ')') : ''))
                        if (res.shrq) {
                            $('#id_shryxm').html(res.shrxm);
                            $('#id_shrq').html(res.shrq);
                            $('#shry').show();
                        }
                        if (res.shzt === '1') {
                            $('#btn_save').hide();
                            $('input[type=radio][name=isPassed]').prop('disabled', true)
                        }

                        if (res.fj) {
                            displayFiles($('#fileDiv'), 'uploadfiles/LHDX', res.pglsh, res.fj);
                        } else {
                            $('#files').hide();
                            $('#review').css('margin-bottom', 12);
                        }
                    }
            );
        };

        wn.iRadioByArrayWithChanged($('#id_review_result'), array, '', 'isPassed', 4, changed, '1');
        initPersonInfo();
        getDetail();
    });

    var doSave = function () {
        var row = $('#btn_query').data('row');
        var shzt = $('input[name=isPassed]:checked').val();
        var yxjgdm = $('#lhyx').data('yxjgdm');
        var shbtgyy = $('#id_shbtgyy').val();
        if (yxjgdm != '<%=session.getAttribute("jgbm")%>') {
            wnform.toast("意向机构与审核机构不符！");
            return false;
        }

        if (shzt === '2') {
            if (shbtgyy === '') {
                wnform.toast('请输入不通过原因');
                return false;
            }
        }
        var deferred = when.defer();
        $.ajax({
            url: 'yyhpt_lhdx.do?action=save_review',
            type: "post",
            dataType: "json",
            data: {
                pglsh: row.pglsh,
                fplsh: row.fplsh,
                yxjgdm: yxjgdm,
                yngrbsh: row.yngrbsh,
                tdlxdm: row.tdlxdm,
                shzt: shzt,
                shbtgyy: shbtgyy
            },
            success: function (data) {
                deferred.resolve(data);
            }
        });
        return deferred.promise;
    }
</script>