//初始化基本信息
function initJbxx() {
    $.ajax({
        url: "common.do?action=jbxx",
        type: "post",
        dataType: "json",
        data: {
            yngrbsh: sYngrbsh
        },
        success: function (data) {
            $('#XM').html(data.XM);
            $('#XBMC').html(data.XBMC ? data.XBMC : '');
            $('#CSRQ').html(jsGetAge(data.CSRQ) ? jsGetAge(data.CSRQ) : '');
            $('#YLFYZFFSMC').html(data.YLFYZFFSMC ? data.YLFYZFFSMC : '');
            $('#LXDH').html(data.SJHM ? data.SJHM : '');
            $('#LXDZ').html(data.JZDXXDZ ? data.JZDXXDZ : '');
        }
    });
}

function initButtons() {
    $('.ywdh-item-size').on('click', function () {
        $.each($('.ywdh-item-img'), function (k, v) {
            var src = $(v).prop('src');
            if (src.indexOf('hover') > 0) {
                src = src.substr(0, src.length - 10) + '.png';
                $(v).prop('src', src);
            }
        });
        checkBlock(this);
    }).hover(function () {
        var src = $(this).find('img').prop('src');
        if (src.indexOf('hover') <= 0) {
            src = src.substr(0, src.length - 4) + '_hover.png';
            $(this).find('img').prop('src', src);
        }
    }, function () {
        var src = $(this).find('img').prop('src');
        if ($(this).prop('class').indexOf('selected') <= 0) {
            src = src.substr(0, src.length - 10) + '.png';
            $(this).find('img').prop('src', src);
        }
    })
}

function checkBlock(selector) {
    $('.ywdh-item-size').removeClass('selected');
    $(selector).addClass('selected');
    var src = $(selector).find('img').prop('src');
    src = src.substr(0, src.length - 4) + '_hover.png';
    $(selector).find('img').prop('src', src);
}

$(function () {
    initButtons();
    initJbxx();
});