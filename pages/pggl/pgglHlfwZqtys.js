/*
 * 获取模板数据
 */
function getMoudule() {
    $.ajax({
        url: "yyhptpggl.do?action=getZxtysModule",
        type: "post",
        dataType: "json",
        data: {
            mbdm: "0001",
            yngrbsh: yngrbsh,
        },
        success: function (data) {
            console.log('----->data');
            console.log(data);
            if (data.printMb == null) {
                wnform.toast('查询模板为空!');
            } else {
                var mbnr = data.printMb.mbnr;
                $('.form-body').html(mbnr);
                //设置姓名
                $('#zqtys_xm').html(editRow.XM);
                //设置机构简称
                $('span[name="zqtys_jgjc"]').html(data.jgmc);

                //动态生成管理等级
                var strhtml = '';
                $.each(data.gldjmc, function (k, v) {
                    if(k==data.gldjmc.length-1){
                        strhtml += "<img id='dj_" + v.NLPGDJDM + "' src='layouts/img/table/icon_wrong.png' />"
                            +"<span name='" + v.NLPGDJDM + "'>"+v.NLPGDJMC+"</span>";
                    }else{
                        strhtml += "<img id='dj_" + v.NLPGDJDM + "' src='layouts/img/table/icon_wrong.png' />"
                            +"<span name='" + v.NLPGDJDM + "'>"+v.NLPGDJMC+"&nbsp;</span>";
                    }
                });

                $('span[name="zqtys_nlpgdjmc"]').html(strhtml);

                //动态生成服务频次
                var pcHtml='';
                $.each(data.djfwpc, function (k, v) {
                    if(k==data.djfwpc.length-1){
                        pcHtml += "<img id='pc_" + v.NLPGDJDM + "' src='layouts/img/table/icon_wrong.png' />"
                            +"<span name='" + v.NLPGDJDM + "'>"+v.PCMC+"</span>";
                    }else{
                        pcHtml += "<img id='pc_" + v.NLPGDJDM + "' src='layouts/img/table/icon_wrong.png' />"
                            +"<span name='" + v.NLPGDJDM + "'>"+v.PCMC+"&nbsp;</span>";
                    }
                });

                $('span[name="zqtys_djfwpc"]').html(pcHtml);

                //设置需求护理等级的值  &&  设置服务频次的值
                if (data.print.NLPGDJMC != '' && data.print.NLPGDJMC != null) {
                    if (data.print.NLPGDJDM == '0') {
                        $('#dj_1').prop('src', "layouts/img/table/icon_selected_agree.png");
                        $('#pc_0').prop('src', "layouts/img/table/icon_selected_agree.png");
                    } else if (data.print.NLPGDJDM == '1') {
                        $('#dj_1').prop('src', "layouts/img/table/icon_selected_agree.png");
                        $('#pc_1').prop('src', "layouts/img/table/icon_selected_agree.png");
                    } else if (data.print.NLPGDJDM == '2') {
                        $('#dj_2').prop('src', "layouts/img/table/icon_selected_agree.png");
                        $('#pc_2').prop('src', "layouts/img/table/icon_selected_agree.png");
                    } else {
                        $('#dj_3').prop('src', "layouts/img/table/icon_selected_agree.png");
                        $('#pc_3').prop('src', "layouts/img/table/icon_selected_agree.png");
                    }
                }

                if (data.print.LXDH != '' && data.print.LXDH != null) {
                    $("#zqtys_lxdh").html(data.print.LXDH);
                } else {
                    $("#zqtys_lxdh").html('XXXXXXXX');
                }

                //设置服务开始日期
                if (data.print.FWKSRQ != '' && data.print.FWKSRQ != null) {
                    $('#zqtys_fwksrq').html(data.print.FWKSRQ);
                } else {
                    $('#zqtys_fwksrq').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
                }
                //设置服务时段
                if (data.print.FWSD != '' && data.print.FWSD != null) {
                    $('#zqtys_fwsd').html(data.print.FWSD);
                } else {
                    $('#zqtys_fwsd').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
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