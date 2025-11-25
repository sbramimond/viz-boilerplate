import * as echarts from 'echarts';
// 在Web Worker中定义global变量，ECharts需要这个
interface ExtendedSelf extends WindowOrWorkerGlobalScope {
    global: typeof globalThis;
}

declare let global: typeof globalThis;

if (typeof global === 'undefined') {
    (self as unknown as ExtendedSelf).global = self;
}

self.onmessage = async ({data: {canvas = null}}) => {
    if (!canvas) return;

    let chart = echarts.init(canvas, null, {
        devicePixelRatio: 2,
        width: canvas.width,
        height: canvas.height,
    });

    let option = {
        title: {
            text: '饼图程序调用高亮示例',
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: 335, name: '直接访问'},
                    {value: 310, name: '邮件营销'},
                    {value: 234, name: '联盟广告'},
                    {value: 135, name: '视频广告'},
                    {value: 1548, name: '搜索引擎'},
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    };

    chart.setOption(option);
};
