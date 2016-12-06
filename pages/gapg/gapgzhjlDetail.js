/*
function setGrInfo() {
    $("#hzxm").text(currow.XM);
    $("#xb  ").text(currow.XB);
    $("#csrq").text(currow.CSRQ);
    $("#ryrq").text(currow.RYRQ);
    $("#cyrq").text(currow.CYRQ);
}

$(function () {
    $("#czrq").html(getNowFormatDate());
    $("#xgrq").html(getNowFormatDate());

    $('#btn_EHR').bind('click',function () {
        alert(2);
    })
});
*/

function setGrInfo() {
    $('#grxx_xm').html(currow.XM);
    $('#grxx_xb').html(currow.XBMC ? currow.XBMC : '');
    $('#grxx_csrq').html(currow.CSRQ ? currow.CSRQ : '');
    $('#grxx_lxdh').html(currow.LXDH ? currow.LXDH : '');
    $('#grxx_ryrq').html(currow.RYRQ ? currow.RYRQ : '');
    $('#grxx_cyrq').html(currow.CYRQ ? currow.CYRQ : '');
}

$(function () {
    var row = $('#xmSearch').data('row');

    var initForm = function (currow) {
        $('#grxx_xm').html(currow.XM);
        $('#grxx_xb').html(currow.XBMC ? currow.XBMC : '');
        $('#grxx_csrq').html(currow.CSRQ ? currow.CSRQ : '');
        $('#grxx_lxdh').html(currow.LXDH ? currow.LXDH : '');
        $('#grxx_ryrq').html(currow.RYRQ ? currow.RYRQ : '');
        $('#grxx_cyrq').html(currow.CYRQ ? currow.CYRQ : '');
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
        if (name || date) {
            footer = '<div><label class="col-md-offset-1">' + title + '人员：</label><label>' + name + '</label><label class="col-md-offset-4">' + title + '日期：</label><label>' + date + '</label></div>';
        }
        return footer;
    };

    var createTabContent = function (data) {

        var $tabContent = $('#TabContent');
        $.each(data, function (k, v) {
            var text = v.XGZHJL ? v.XGZHJL : v.ZHJL ? v.ZHJL : '',
                content = '<div class="tab-pane fade in" id="' + v.KSDM + '"><textarea id="id_textarea_' + v.TDZHLSH + '" maxlength=2000 rows=5 style="width: 100%">' + text + '</textarea>';

            content += createFooter('修改', v.XGJLRYXM, v.XGJLSJ) + createFooter('记录', v.JLRYXM, v.JLSJ);
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


    // initForm(row);

    getDetialInfo()
        .then(createAllTabsAndContents)
        .then(activeTab);
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
        data: {'data': JSON.stringify(data)},
        success: function (res) {
            deferred.resolve(res);
        }
    });
    return deferred.promise;
};
