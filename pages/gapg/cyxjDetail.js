
$(function () {
    $.ajax({
        url: 'yyhpt_gapg.do?action=getCyxjbg',
        type: 'get',
        dataType: 'json',
        data: {
            patid: yngrbsh,
            // patid: '003A87E1-A31F-40A2-848B-0BF7DE2A6B0C'
        }
    }).done(function (datas) {
        console.log(datas);
        //页面个人基本信息赋值
        if(datas.cyxjbgInfo.length>0){
            setInfo(datas);
        }
    }).fail(function () {
        console.log("error");
    }).always(function () {
        console.log("complete");
    });

});

function setInfo(datas) {
    $('#xm').text(datas.cyxjbgInfo[0].XM);
    $('#xb').text(datas.cyxjbgInfo[0].XBMC);

    var age=2016-datas.cyxjbgInfo[0].CSRQ.substr(0,4);
    $('#csrq').text(age+'岁');

    $('#ks').text(datas.cyxjbgInfo[0].KSMC);
    // $('#zyh').text(datas.cyxjbgInfo[0].JZLSH);
    $('#rysj').text(datas.cyxjbgInfo[0].RYSJ);
    $('#cysj').text(datas.cyxjbgInfo[0].CYSJ);


    $('#id_mzzd').val(datas.cyxjbgInfo[0].MZZD);
    $('#id_ryzd').val(datas.cyxjbgInfo[0].RYZD);
    $('#id_cyzd').val(datas.cyxjbgInfo[0].CYZD);
    $('#id_ryzztz').val(datas.cyxjbgInfo[0].RYZZTZ);
    $('#id_zyjcjg').val(datas.cyxjbgInfo[0].JCHZ);
    $('#id_tsjc').val(datas.cyxjbgInfo[0].TSJC);
    $('#id_bczljg').val(datas.cyxjbgInfo[0].ZLGC);
    $('#id_hbz').val(datas.cyxjbgInfo[0].HBZ);
    $('#id_cyqk').val(datas.cyxjbgInfo[0].CYQK);
    $('#id_cyyz').val(datas.cyxjbgInfo[0].CYYZ);
    $('#id_zljg').val(datas.cyxjbgInfo[0].ZLJG);

}