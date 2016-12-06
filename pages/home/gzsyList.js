var chartDatas;

//获取页面数据
var getPageDatas = function () {
    $.ajax({
        url: 'yyhptgzsy.do?action=getPageDatas',
        type: 'get',
        dataType: 'json',
        data: {},
        success: function (datas) {
            initPageControl(datas);
        }
    });
}

function initPageControl(datas) {
    var topDataCnt = datas.topDataCnt[0];
    /*对象管理*/
    var mzdr = topDataCnt.MZDR;
    var xdj = topDataCnt.XDJ;


    var jhglNum = datas.jhglNum;
    /*计划管理*/
    //WZD:0;WZX:0;YZDWSH:0;YZX:1
    var wzdJhgl = jhglNum.WZD;				//未制定计划
    var wzxJhgl = jhglNum.WZX;				//未执行
    var yzdwshJhgl = jhglNum.YZDWSH;		//已制定未审核
    var yzxJhgl = jhglNum.YZX;				//已执行

    var djglNum = datas.djglNum[0];
    /*登记管理*/
    console.info(djglNum);
    var wdjDjgl = djglNum.WDJ;				//未登记
    var wshDjgl = djglNum.WSH;              //未审核

    var fwglNum = datas.fwglNum;
    /*服务管理*/
    var wdjFwgl = fwglNum.WDJ;				//未服务登记

    var nowTime = datas.nowTime;			//当前时间
    var dxfpNum = datas.dxfpNum;
    var wfpjj = dxfpNum.WJJ, wfpjg = dxfpNum.WJG, yfpjj = dxfpNum.YJJ, yfpjg = dxfpNum.YJG
    displayNumberOfBlock($('#block1'), $('#mzdrNum'), $('#mzdrNum'), wfpjj + yfpjj, wfpjj + yfpjj);     //居家
    displayNumberOfBlock($('#block1'), $('#mzdrNum1'), $('#mzdrNum1'), wfpjg + yfpjg, wfpjg + yfpjg);   //机构
    displayNumberOfBlock($('#block2'), $('#xdjNum'), $('#xdjNum'), xdj, xdj);
    displayNumberOfBlock($('#block3'), $('#jhzxNum'), $('#jhzxNum'), yzxJhgl, yzxJhgl);
    $('.counter').counterUp();


    // wfpjj==0?($('#dfpjj').hide(),$('#dfpjj-hr').hide()):$('#dfpjjNum').text(wfpjj); 			//待分配（居家）
    // wfpjg==0?($('#dfpjg').hide(),$('#dfpjg-hr').hide()):$('#dfpjgNum').text(wfpjg); 			//待分配（机构）

    $('#dfpjjNum').text(wfpjj); 			//待分配（居家）
    $('#dfpjgNum').text(wfpjg);   			//待分配（机构）
    $('#dqydjNum').text(wdjDjgl);			//待签约登记
    $('#dqyshNum').text(wshDjgl);			//待签约审核
    $('#dzdjhNum').text(wzdJhgl);			//待制定计划
    $('#djhshNum').text(yzdwshJhgl);		//待计划审核
    $('#djhzxNum').text(wzxJhgl);			//待计划执行
    $('#dfwdjNum').text(wdjFwgl);			//待服务登记

    var nearestTime = datas.nearestTime;    //获取待处理工作时间
    console.table(nearestTime);
    var dfpjjTime, dfpjgTime, dqydjTime, dqyshTime, dzdjhTime, djhshTime, djhzxTime, dfwdjTime;
    dfpjjTime = nearestTime.DFPJJ;
    dfpjgTime = nearestTime.DFPJG;
    dqydjTime = nearestTime.DQYDJ;
    dqyshTime = nearestTime.DQYSH;
    dzdjhTime = nearestTime.DZDJH;
    djhshTime = nearestTime.DJHSH;
    djhzxTime = nearestTime.DJHZX;
    dfwdjTime = nearestTime.DFWDJ;

    $('#dfpjjTime').text(dfpjjTime);			//待分配（居家）时间
    $('#dfpjgTime').text(dfpjgTime);			//待分配（机构）时间
    $('#dqydjTime').text(dqydjTime);			//待签约登记时间
    $('#dqyshTime').text(dqyshTime);			//待签约审核时间
    $('#dzdjhTime').text(dzdjhTime);			//待制定计划时间
    $('#djhshTime').text(djhshTime);			//待计划审核时间
    $('#djhzxTime').text(djhzxTime);			//待计划执行时间
    $('#dfwdjTime').text(dfwdjTime);			//待服务登记时间
}

/**
 * 初始化上方按钮
 */
function initButtons() {
    //
    $('#mzdrQuery1').parent().parent().on('click', function () {                        //待机构护理
        $('.list-title-space').removeClass('highlight');
        $(this).addClass('highlight');
        window.location.href = ('yyhpt_dxfp.do?action=init&ywPara=1')
    });
    $('#mzdrQuery').parent().parent().on('click', function () {                        //待居家护理
        $('.list-title-space').removeClass('highlight');
        $(this).addClass('highlight');
        window.location.href = ('yyhpt_dxfp.do?action=init&ywPara=0')
    });

    $('#jhzxQuery').parent().parent().on('click', function () {                        //计划执行人数
        $('.list-title-space').removeClass('highlight');
        $(this).addClass('highlight');
        window.location.href = ('yyhptjhgl.do?action=init&ywPara=3')
    });

    $('#dfpjj').on('click', function () {							//待分配（居家）
        window.location.href = ('yyhpt_dxfp.do?action=init&ywPara=0')
    });
    $('#dfpjg').on('click', function () {							//待分配（机构）
        window.location.href = ('yyhpt_dxfp.do?action=init&ywPara=1')
    });
    $('#dqydj').on('click', function () {							//待签约登记
        window.location.href = ('yyhptqygl.do?action=init&ywPara=0')
    });
    $('#dqysh').on('click', function () {							//待签约审核
        window.location.href = ('yyhptqygl.do?action=init&ywPara=1')
    });
    $('#dzdjh').on('click', function () {							//待计划制定
        window.location.href = ('yyhptjhgl.do?action=init&ywPara=0');
    });
    $('#djhsh').on('click', function () {							//待计划审核
        window.location.href = ('yyhptjhgl.do?action=init&ywPara=1');
    });
    $('#djhzx').on('click', function () {							//待计划执行
        window.location.href = ('yyhptjhgl.do?action=init&ywPara=2');
    });
    $('#dfwdj').on('click', function () {							//待服务登记
        window.location.href = ('yyhptRwglFwgl.do?action=init&ywPara=0');
    });
}

var ChartsAmcharts = function () {
    $.ajax({
        url: 'yyhptgzsy.do?action=getChartDatas',
        type: 'get',
        dataType: 'json',
        async: false,
        data: {},
        success: function (datas) {
            chartDatas = datas.chartDatas;
        }
    });
    // 1.获取数据
    var initChartSample1 = function () {
        var chart = AmCharts
            .makeChart(
                "chart_1",
                {
                    "type": "serial",
                    "theme": "light",
                    "pathToImages": App.getGlobalPluginsPath()
                    + "amcharts/amcharts/images/",
                    "autoMargins": false,
                    "marginLeft": 50,
                    "marginRight": 18,
                    "marginTop": 30,
                    "marginBottom": 26,

                    "fontFamily": 'Open Sans',
                    "color": '#888',

                    "legend": {
                        "equalWidths": false,
                        "useGraphSettings": true,
                        "valueAlign": "center"
                    },
                    "dataProvider": chartDatas,// 查询到的数据
                    "valueAxes": [{
                        "axisAlpha": 0,
                        "text-align": 'center',
                        "position": "left"
                    }, {
                        "axisAlpha": 1,
                        "position": "right"
                    }],
                    "startDuration": 1,
                    "graphs": [
                        {
                            "alphaField": "alpha",
                            "balloonText": "<span style='font-size:13px;'>[[category]]应完成:<b>[[value]]</b>" + ' 次' + " [[additional]]</span>",
                            "dashLengthField": "dashLengthColumn",
                            "fillAlphas": 1,
                            "title": "应服务数量",
                            "type": "column",
                            "valueField": "income"
                        },
                        {
                            "balloonText": "<span style='font-size:13px;'> [[category]]实际完成 :<b>[[value]]</b>" + ' 次' + " [[additional]]</span>",
                            "bullet": "round",
                            "dashLengthField": "dashLengthLine",
                            "lineThickness": 3,
                            "bulletSize": 7,
                            "bulletBorderAlpha": 1,
                            "bulletColor": "#FFFFFF",
                            "useLineColorForBulletBorder": true,
                            "bulletBorderThickness": 3,
                            "fillAlphas": 0,
                            "lineAlpha": 1,
                            "title": "实际完成数量",
                            "valueField": "expenses"
                        }],
                    "categoryField": "month",
                    "categoryAxis": {
                        "gridPosition": "start",
                        "axisAlpha": 0,
                        "tickLength": 0
                    }
                });
        $('#chart_1').closest('.portlet').find('.fullscreen').click(function () {
            chart.invalidateSize();
        });
    }

    return {
        // main function to initiate the module
        init: function () {
            initChartSample1();
        }
    };
}();


jQuery(document).ready(function () {
    initButtons();
    getPageDatas();
    ChartsAmcharts.init();
});