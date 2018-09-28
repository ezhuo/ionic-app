import { Component, ElementRef, ViewChild, Injector ,ViewEncapsulation} from '@angular/core';
import { IndexControl } from '@core';
// import ECharts from 'echarts';

@Component({
    selector: 'page-echarts-demo',
    templateUrl: 'echarts-demo.html',
    encapsulation: ViewEncapsulation.None,
})
export class EchartsDemoPage extends IndexControl {
    @ViewChild('chart')
    chart: ElementRef;
    constructor(protected injector: Injector) {
        super(injector);
    }

    ionViewDidEnter() {
        this.initChart();
    }

    initChart() {
        /*
        const element = this.chart.nativeElement;
        element.style.width = document.body.clientWidth - 16 + 'px'; // 设置容器宽度
        const myChart = ECharts.init(element);
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)',
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: [
                    '直接访问',
                    '邮件营销',
                    '联盟广告',
                    '视频广告',
                    '搜索引擎',
                ],
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold',
                            },
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false,
                        },
                    },
                    data: [
                        { value: 335, name: '直接访问' },
                        { value: 310, name: '邮件营销' },
                        { value: 234, name: '联盟广告' },
                        { value: 135, name: '视频广告' },
                        { value: 1548, name: '搜索引擎' },
                    ],
                },
            ],
        });
        */
    }

    details(url) {
        this.ionSrv.app.openUrlByBrowser(url);
    }
}
