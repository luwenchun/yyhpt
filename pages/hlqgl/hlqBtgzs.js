
/*
 * 获取模板数据
 */
function getMoudule() {
    $.ajax({
        url: "yyhptpggl.do?action=getZxtysModule",
        type: "post",
        dataType: "json",
        data: {
            mbdm: "0002",
            yngrbsh: mainSelectedRow.yngrbsh
        },
        success: function (data) {
            if (data.printMb == null) {
                wnform.toast('查询模板为空!');
            } else {
                var mbnr = data.printMb.mbnr;
                $('.form-body').html(mbnr);

                //设置姓名
                $('#zqtys_xm').html(mainSelectedRow.XM);

                var isfhArray=[{id: '1', text: '符合'}, {id: '0', text: '不符合'}];

                //动态生成是否符合申请条件
                var strhtml = '';
                $.each(isfhArray, function (k, v) {
                    if(k==isfhArray.length-1){
                        strhtml += "<img id='dj_" + v.id + "' src='layouts/img/table/icon_wrong.png' />"
                            +"<span name='" + v.id + "'>"+v.text+"</span>";
                    }else{
                        strhtml += "<img id='dj_" + v.id + "' src='layouts/img/table/icon_wrong.png' />"
                            +"<span name='" + v.id + "'>"+v.text+"&nbsp;</span>";
                    }
                });

                $('#zqtys_isfh').html(strhtml);

                $('#zqtys_btMoney').html('50');

                //设置机构简称
                $('#zqtys_jgjc').html(data.jgmc);

                $('#zqtys_fwksrq').text(mainSelectedRow.SHRQ);


                //设置是否符合条件的值
                if (mainSelectedRow.SHZT == '1') {
                    $('#dj_1').prop('src', "layouts/img/table/icon_selected_agree.png");
                } else {
                    $('#dj_0').prop('src', "layouts/img/table/icon_selected_agree.png");
                }

            }
        }
    });
}
getMoudule();

$(function () {
    $('#btn_Print').on('click', function () {
        printDiv('zqtys_print');
        return false;
    });

    $('#btn_Exist').on('click', function () {
        dialogModel.close();
        return false;
    });
});

function printDiv(divId) {
    var iHeight = 600;
    var iWidth = 900;
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2; //获得窗口的垂直位置;
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; //获得窗口的水平位置;
    var fulls = "left=" + iLeft + ",screenX=" + iLeft + ",top=" + iTop + ",screenY=" + iTop + "," +
        "scrollbars=1,height=" + iHeight + ",width=" + iWidth;    //定义弹出窗口的参数
    console.log(fulls);
    var mywindow = window.open('', '', fulls);
    var printContents = document.getElementById(divId).innerHTML;
    var cssHtml = '<link href="layouts/css/white/print_page.css" rel="stylesheet">';
    mywindow.document.write('<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title></title>');
    mywindow.document.write(cssHtml);
    mywindow.document.write('</head><body >');
    mywindow.document.write(printContents);
    mywindow.document.write('<script>this.print()</script>></body></html>');
    // mywindow.close();
    return false;
}