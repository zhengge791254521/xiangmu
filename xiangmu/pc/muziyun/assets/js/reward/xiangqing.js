

	
				

require.config({
            paths: {
                echarts: 'http://echarts.baidu.com/build/dist'
            }
			
        });
		
	require(
        [
            'echarts',
            'echarts/chart/pie'
        ],function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('xiangqing'));
            var option = {
    title : {
        text: '本月酬金比例',
        subtext: '单位：元',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        data:['4G流量','号卡销售','手机销售','宽带销售','话费充值']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: false},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: false, 
                type: ['pie', 'funnel'],
                option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'left',
                        max: 1548
                    }
                }
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'访问来源',
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:2000, name:'4G流量'},
                {value:5000, name:'号卡销售'},
                {value:3500, name:'手机销售'},
                {value:1000, name:'宽带销售'},
                {value:2030, name:'话费充值'}
            ]
        }
    ]
};


            // 为echarts对象加载数据 
            myChart.setOption(option); 
			window.onresize = myChart.resize;
        }
    );
	
	