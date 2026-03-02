// 统一的数据结构
const weeklyData = {
    '09-18': {
        totalInventory: 137531,
        inventory: {
            upstream: 34456,
            downstream: 59495,
            other: 43580
        },
        destocking: null, // 第一周没有环比数据
        totalProduction: null,
        production: {
            lithiumSpodumene: null,
            lithiumLepidolite: null,
            saltLake: null,
            recycling: null
        }
    },
    '09-25': {
        totalInventory: 136825,
        inventory: {
            upstream: 33492,
            downstream: 60893,
            other: 42440
        },
        destocking: 706, // 137531 - 136825
        totalProduction: null,
        production: {
            lithiumSpodumene: null,
            lithiumLepidolite: null,
            saltLake: null,
            recycling: null
        }
    },
    '10-10': {
        totalInventory: 134801,
        inventory: {
            upstream: 34747,
            downstream: 59765,
            other: 40290
        },
        destocking: 2024, // 136825 - 134801
        totalProduction: null,
        production: {
            lithiumSpodumene: null,
            lithiumLepidolite: null,
            saltLake: null,
            recycling: null
        }
    },
    '10-17': {
        totalInventory: 132658,
        inventory: {
            upstream: 34283,
            downstream: 57735,
            other: 40640
        },
        destocking: 2143, // 134801 - 132658
        totalProduction: null,
        production: {
            lithiumSpodumene: null,
            lithiumLepidolite: null,
            saltLake: null,
            recycling: null
        }
    },
    '10-24': {
        totalInventory: 130366,
        inventory: {
            upstream: 33681,
            downstream: 55275,
            other: 41410
        },
        destocking: 2292, // 132658 - 130366
        totalProduction: null,
        production: {
            lithiumSpodumene: null,
            lithiumLepidolite: null,
            saltLake: null,
            recycling: null
        }
    },
    '10-31': {
        totalInventory: 127358,
        inventory: {
            upstream: 32051,
            downstream: 53288,
            other: 42020
        },
        destocking: 3008,
        totalProduction: 21080,
        production: {
            lithiumSpodumene: 13124,
            lithiumLepidolite: 3011,
            saltLake: 3319,
            recycling: 2080
        }
    },
    '11-07': {
        totalInventory: 123953,
        inventory: {
            upstream: 30715,
            downstream: 52008,
            other: 41230
        },
        destocking: 3405,
        totalProduction: 21534,
        production: {
            lithiumSpodumene: 13354,
            lithiumLepidolite: 3081,
            saltLake: 3555,
            recycling: 2145
        }
    },
    '11-14': {
        totalInventory: 120472,
        inventory: {
            upstream: 28270,
            downstream: 48772,
            other: 43430
        },
        destocking: 3481,
        totalProduction: 21545,
        production: {
            lithiumSpodumene: 12904,
            lithiumLepidolite: 2941,
            saltLake: 3555,
            recycling: 2145
        }
    },
    '11-21': {
        totalInventory: 118420,
        inventory: {
            upstream: 26104,
            downstream: 44436,
            other: 47880
        },
        destocking: 2052,
        totalProduction: 22130,
        production: {
            lithiumSpodumene: 13344,
            lithiumLepidolite: 2971,
            saltLake: 3635,
            recycling: 2180
        }
    },
    '11-28': {
        totalInventory: 115968,
        inventory: {
            upstream: 24324,
            downstream: 41984,
            other: 49660
        },
        destocking: 2452,
        totalProduction: 21865,
        production: {
            lithiumSpodumene: 13364,
            lithiumLepidolite: 3021,
            saltLake: 3225,
            recycling: 2245
        }
    },
    '12-05': {
        totalInventory: 113602,
        inventory: {
            upstream: 20767,
            downstream: 43695,
            other: 49140
        },
        destocking: 2336,
        totalProduction: 21939,
        production: {
            lithiumSpodumene: 13484,
            lithiumLepidolite: 3076,
            saltLake: 3090,
            recycling: 2289
        }
    },
    '12-12': {
        totalInventory: 111469,
        inventory: {
            upstream: 19161,
            downstream: 42738,
            other: 49570
        },
        destocking: 2133,
        totalProduction: 21998,
        production: {
            lithiumSpodumene: 13744,
            lithiumLepidolite: 2876,
            saltLake: 3075,
            recycling: 2303
        }
    },
    // '12-17': {
    //     totalInventory: 111469,
    //     inventory: {
    //         upstream: 18090,
    //         downstream: 41586,
    //         other: 49570
    //     },
    //     destocking: 1044,
    //     totalProduction: 21998,
    //     production: {
    //         lithiumSpodumene: 13744,
    //         lithiumLepidolite: 2876,
    //         saltLake: 3075,
    //         recycling: 2303
    //     }
    // },
};

// 计算增长率函数
function calculateGrowthRate(current, previous) {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous * 100).toFixed(2);
}

// 提取数据数组用于图表
const dates = Object.keys(weeklyData);
const totalInventory = dates.map(d => weeklyData[d].totalInventory);
const upstreamInventory = dates.map(d => weeklyData[d].inventory.upstream);
const downstreamInventory = dates.map(d => weeklyData[d].inventory.downstream);
const otherInventory = dates.map(d => weeklyData[d].inventory.other);
const destocking = dates.map(d => weeklyData[d].destocking);
const totalProduction = dates.map(d => weeklyData[d].totalProduction);
const lithiumSpodumene = dates.map(d => weeklyData[d].production.lithiumSpodumene);
const lithiumLepidolite = dates.map(d => weeklyData[d].production.lithiumLepidolite);
const saltLake = dates.map(d => weeklyData[d].production.saltLake);
const recycling = dates.map(d => weeklyData[d].production.recycling);

// 计算各项增长率
function getGrowthRates(dateIndex) {
    if (dateIndex === 0) return null;

    const currentDate = dates[dateIndex];
    const previousDate = dates[dateIndex - 1];
    const current = weeklyData[currentDate];
    const previous = weeklyData[previousDate];

    return {
        production: {
            lithiumSpodumene: calculateGrowthRate(current.production.lithiumSpodumene, previous.production.lithiumSpodumene),
            lithiumLepidolite: calculateGrowthRate(current.production.lithiumLepidolite, previous.production.lithiumLepidolite),
            saltLake: calculateGrowthRate(current.production.saltLake, previous.production.saltLake),
            recycling: calculateGrowthRate(current.production.recycling, previous.production.recycling),
            total: calculateGrowthRate(current.totalProduction, previous.totalProduction)
        },
        inventory: {
            upstream: calculateGrowthRate(current.inventory.upstream, previous.inventory.upstream),
            downstream: calculateGrowthRate(current.inventory.downstream, previous.inventory.downstream),
            other: calculateGrowthRate(current.inventory.other, previous.inventory.other),
            total: calculateGrowthRate(current.totalInventory, previous.totalInventory)
        }
    };
}

// 图表1: 总库存趋势
const inventoryChart = echarts.init(document.getElementById('inventoryChart'));
inventoryChart.setOption({
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(50,50,50,0.9)',
        borderColor: '#333',
        textStyle: { color: '#fff' },
        formatter: function (params) {
            let result = params[0].name + '<br/>';
            params.forEach(item => {
                result += item.marker + item.seriesName + ': ' + item.value.toLocaleString() + '吨<br/>';
            });
            if (params[0].dataIndex > 0) {
                const change = totalInventory[params[0].dataIndex] - totalInventory[params[0].dataIndex - 1];
                result += '<span style="color:#ef4444">周度变化: ' + change.toLocaleString() + '吨</span>';
            }
            return result;
        }
    },
    legend: {
        data: ['总库存'],
        top: 10,
        textStyle: { fontSize: 14 }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
        type: 'category',
        data: dates,
        axisLabel: { fontSize: 12, color: '#666' },
        axisLine: { lineStyle: { color: '#ddd' } }
    },
    yAxis: {
        type: 'value',
        name: '库存量(吨)',
        axisLabel: {
            fontSize: 12,
            color: '#666',
            formatter: '{value}'
        },
        axisLine: { lineStyle: { color: '#ddd' } },
        splitLine: { lineStyle: { color: '#f0f0f0' } }
    },
    series: [{
        name: '总库存',
        type: 'line',
        data: totalInventory,
        smooth: true,
        lineStyle: { width: 3, color: '#667eea' },
        itemStyle: {
            color: '#667eea',
            borderWidth: 3,
            borderColor: '#fff'
        },
        areaStyle: {
            color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                    { offset: 0, color: 'rgba(102, 126, 234, 0.3)' },
                    { offset: 1, color: 'rgba(102, 126, 234, 0.05)' }
                ]
            }
        },
        label: {
            show: true,
            position: 'top',
            formatter: '{c}',
            fontSize: 12,
            color: '#667eea',
            fontWeight: 'bold'
        }
    }]
});

// 计算库存增长率数据
const inventoryGrowthRates = {
    upstream: dates.map((d, i) => {
        if (i === 0) return null;
        return parseFloat(getGrowthRates(i).inventory.upstream);
    }),
    downstream: dates.map((d, i) => {
        if (i === 0) return null;
        return parseFloat(getGrowthRates(i).inventory.downstream);
    }),
    other: dates.map((d, i) => {
        if (i === 0) return null;
        return parseFloat(getGrowthRates(i).inventory.other);
    }),
    total: dates.map((d, i) => {
        if (i === 0) return null;
        return parseFloat(getGrowthRates(i).inventory.total);
    })
};

// 图表2: 库存结构（双Y轴）
const stackedChart = echarts.init(document.getElementById('stackedChart'));
stackedChart.setOption({
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(50,50,50,0.9)',
        borderColor: '#333',
        textStyle: { color: '#fff' },
        axisPointer: { type: 'shadow' },
        formatter: function (params) {
            let result = '<div style="font-weight:bold;margin-bottom:8px;">' + params[0].name + '</div>';

            params.forEach(item => {
                if (item.seriesName.includes('增长率')) {
                    if (item.value !== null) {
                        const color = item.value >= 0 ? '#ef4444' : '#10b981';
                        result += item.marker + item.seriesName + ': <span style="color:' + color + '">' + item.value + '%</span><br/>';
                    }
                } else {
                    result += item.marker + item.seriesName + ': ' + item.value.toLocaleString() + '吨<br/>';
                }
            });

            return result;
        }
    },
    legend: {
        data: ['上游冶炼厂', '下游企业', '其他库存', '上游增长率', '下游增长率', '其他增长率'],
        top: 10,
        textStyle: { fontSize: 12 }
    },
    grid: { left: '5%', right: '8%', bottom: '3%', containLabel: true },
    xAxis: {
        type: 'category',
        data: dates,
        axisLabel: { fontSize: 12, color: '#666' }
    },
    yAxis: [
        {
            type: 'value',
            name: '库存量(吨)',
            position: 'left',
            axisLabel: {
                fontSize: 12,
                color: '#666',
                formatter: '{value}'
            },
            axisLine: { lineStyle: { color: '#667eea' } },
            splitLine: { lineStyle: { color: '#f0f0f0' } }
        },
        {
            type: 'value',
            name: '环比增长率(%)',
            position: 'right',
            axisLabel: {
                fontSize: 12,
                color: '#666',
                formatter: '{value}%'
            },
            axisLine: { lineStyle: { color: '#f59e0b' } },
            splitLine: { show: false }
        }
    ],
    series: [
        {
            name: '上游冶炼厂',
            type: 'bar',
            yAxisIndex: 0,
            stack: '总量',
            data: upstreamInventory,
            itemStyle: { color: '#667eea' },
            label: {
                show: true,
                position: 'inside',
                formatter: '{c}',
                fontSize: 11
            }
        },
        {
            name: '下游企业',
            type: 'bar',
            yAxisIndex: 0,
            stack: '总量',
            data: downstreamInventory,
            itemStyle: { color: '#764ba2' },
            label: {
                show: true,
                position: 'inside',
                formatter: '{c}',
                fontSize: 11
            }
        },
        {
            name: '其他库存',
            type: 'bar',
            yAxisIndex: 0,
            stack: '总量',
            data: otherInventory,
            itemStyle: { color: '#f093fb' },
            label: {
                show: true,
                position: 'inside',
                formatter: '{c}',
                fontSize: 11
            }
        },
        {
            name: '上游增长率',
            type: 'line',
            yAxisIndex: 1,
            data: inventoryGrowthRates.upstream,
            smooth: true,
            lineStyle: { width: 3, color: '#ef4444', type: 'solid' },
            itemStyle: { color: '#ef4444', borderWidth: 2, borderColor: '#fff' },
            symbol: 'circle',
            symbolSize: 8
        },
        {
            name: '下游增长率',
            type: 'line',
            yAxisIndex: 1,
            data: inventoryGrowthRates.downstream,
            smooth: true,
            lineStyle: { width: 3, color: '#f59e0b', type: 'solid' },
            itemStyle: { color: '#f59e0b', borderWidth: 2, borderColor: '#fff' },
            symbol: 'diamond',
            symbolSize: 8
        },
        {
            name: '其他增长率',
            type: 'line',
            yAxisIndex: 1,
            data: inventoryGrowthRates.other,
            smooth: true,
            lineStyle: { width: 3, color: '#10b981', type: 'solid' },
            itemStyle: { color: '#10b981', borderWidth: 2, borderColor: '#fff' },
            symbol: 'triangle',
            symbolSize: 8
        }
    ]
});

// 计算产能增长率数据
const productionDates = dates.filter(d => weeklyData[d].totalProduction !== null);
const productionGrowthRates = {
    lithiumSpodumene: productionDates.map((d, i) => {
        if (i === 0) return null;
        const currentDate = productionDates[i];
        const previousDate = productionDates[i - 1];
        return parseFloat(calculateGrowthRate(
            weeklyData[currentDate].production.lithiumSpodumene,
            weeklyData[previousDate].production.lithiumSpodumene
        ));
    }),
    lithiumLepidolite: productionDates.map((d, i) => {
        if (i === 0) return null;
        const currentDate = productionDates[i];
        const previousDate = productionDates[i - 1];
        return parseFloat(calculateGrowthRate(
            weeklyData[currentDate].production.lithiumLepidolite,
            weeklyData[previousDate].production.lithiumLepidolite
        ));
    }),
    saltLake: productionDates.map((d, i) => {
        if (i === 0) return null;
        const currentDate = productionDates[i];
        const previousDate = productionDates[i - 1];
        return parseFloat(calculateGrowthRate(
            weeklyData[currentDate].production.saltLake,
            weeklyData[previousDate].production.saltLake
        ));
    }),
    recycling: productionDates.map((d, i) => {
        if (i === 0) return null;
        const currentDate = productionDates[i];
        const previousDate = productionDates[i - 1];
        return parseFloat(calculateGrowthRate(
            weeklyData[currentDate].production.recycling,
            weeklyData[previousDate].production.recycling
        ));
    }),
    total: productionDates.map((d, i) => {
        if (i === 0) return null;
        const currentDate = productionDates[i];
        const previousDate = productionDates[i - 1];
        return parseFloat(calculateGrowthRate(
            weeklyData[currentDate].totalProduction,
            weeklyData[previousDate].totalProduction
        ));
    })
};

// 提取产能数据
const productionLithiumSpodumene = productionDates.map(d => weeklyData[d].production.lithiumSpodumene);
const productionLithiumLepidolite = productionDates.map(d => weeklyData[d].production.lithiumLepidolite);
const productionSaltLake = productionDates.map(d => weeklyData[d].production.saltLake);
const productionRecycling = productionDates.map(d => weeklyData[d].production.recycling);

// 图表3: 周度产能（双Y轴）
const productionChart = echarts.init(document.getElementById('productionChart'));
productionChart.setOption({
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(50,50,50,0.9)',
        borderColor: '#333',
        textStyle: { color: '#fff' },
        formatter: function (params) {
            let result = '<div style="font-weight:bold;margin-bottom:8px;">' + params[0].name + '</div>';

            params.forEach(item => {
                if (item.seriesName.includes('增长率')) {
                    if (item.value !== null) {
                        const color = item.value >= 0 ? '#10b981' : '#ef4444';
                        result += item.marker + item.seriesName + ': <span style="color:' + color + '">' + item.value + '%</span><br/>';
                    }
                } else {
                    result += item.marker + item.seriesName + ': ' + item.value.toLocaleString() + '吨<br/>';
                }
            });

            return result;
        }
    },
    legend: {
        data: ['锂辉石', '锂云母', '盐湖', '回收', '锂辉石增长率', '锂云母增长率', '盐湖增长率', '回收增长率'],
        top: 10,
        textStyle: { fontSize: 12 }
    },
    grid: { left: '5%', right: '8%', bottom: '3%', containLabel: true },
    xAxis: {
        type: 'category',
        data: productionDates,
        axisLabel: { fontSize: 12, color: '#666' }
    },
    yAxis: [
        {
            type: 'value',
            name: '产能(吨/周)',
            position: 'left',
            axisLabel: {
                fontSize: 12,
                color: '#666',
                formatter: '{value}'
            },
            axisLine: { lineStyle: { color: '#667eea' } },
            splitLine: { lineStyle: { color: '#f0f0f0' } }
        },
        {
            type: 'value',
            name: '环比增长率(%)',
            position: 'right',
            axisLabel: {
                fontSize: 12,
                color: '#666',
                formatter: '{value}%'
            },
            axisLine: { lineStyle: { color: '#f59e0b' } },
            splitLine: { show: false }
        }
    ],
    series: [
        {
            name: '锂辉石',
            type: 'bar',
            yAxisIndex: 0,
            data: productionLithiumSpodumene,
            itemStyle: { color: '#667eea' },
            barGap: '10%',
            barWidth: '12%'
        },
        {
            name: '锂云母',
            type: 'bar',
            yAxisIndex: 0,
            data: productionLithiumLepidolite,
            itemStyle: { color: '#764ba2' },
            barWidth: '12%'
        },
        {
            name: '盐湖',
            type: 'bar',
            yAxisIndex: 0,
            data: productionSaltLake,
            itemStyle: { color: '#f093fb' },
            barWidth: '12%'
        },
        {
            name: '回收',
            type: 'bar',
            yAxisIndex: 0,
            data: productionRecycling,
            itemStyle: { color: '#4facfe' },
            barWidth: '12%'
        },
        {
            name: '锂辉石增长率',
            type: 'line',
            yAxisIndex: 1,
            data: productionGrowthRates.lithiumSpodumene,
            smooth: true,
            lineStyle: { width: 3, color: '#ef4444', type: 'solid' },
            itemStyle: { color: '#ef4444', borderWidth: 2, borderColor: '#fff' },
            symbol: 'circle',
            symbolSize: 8
        },
        {
            name: '锂云母增长率',
            type: 'line',
            yAxisIndex: 1,
            data: productionGrowthRates.lithiumLepidolite,
            smooth: true,
            lineStyle: { width: 3, color: '#f59e0b', type: 'solid' },
            itemStyle: { color: '#f59e0b', borderWidth: 2, borderColor: '#fff' },
            symbol: 'diamond',
            symbolSize: 8
        },
        {
            name: '盐湖增长率',
            type: 'line',
            yAxisIndex: 1,
            data: productionGrowthRates.saltLake,
            smooth: true,
            lineStyle: { width: 3, color: '#10b981', type: 'solid' },
            itemStyle: { color: '#10b981', borderWidth: 2, borderColor: '#fff' },
            symbol: 'triangle',
            symbolSize: 8
        },
        {
            name: '回收增长率',
            type: 'line',
            yAxisIndex: 1,
            data: productionGrowthRates.recycling,
            smooth: true,
            lineStyle: { width: 3, color: '#8b5cf6', type: 'solid' },
            itemStyle: { color: '#8b5cf6', borderWidth: 2, borderColor: '#fff' },
            symbol: 'rect',
            symbolSize: 8
        }
    ]
});

// 图表4: 去库量对比
const destockingChart = echarts.init(document.getElementById('destockingChart'));
destockingChart.setOption({
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(50,50,50,0.9)',
        borderColor: '#333',
        textStyle: { color: '#fff' },
        formatter: function (params) {
            return params[0].name + '<br/>' +
                params[0].marker + '去库量: ' + params[0].value.toLocaleString() + '吨';
        }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
        type: 'category',
        data: dates.filter((d, i) => i > 0), // 去掉第一个日期（没有去库数据）
        axisLabel: { fontSize: 12, color: '#666' }
    },
    yAxis: {
        type: 'value',
        name: '去库量(吨)',
        axisLabel: { fontSize: 12, color: '#666' },
        splitLine: { lineStyle: { color: '#f0f0f0' } }
    },
    series: [{
        name: '周度去库量',
        type: 'bar',
        data: destocking.filter((d, i) => i > 0),
        itemStyle: {
            color: '#667eea'
        },
        label: {
            show: true,
            position: 'top',
            formatter: '{c}吨',
            fontSize: 13,
            fontWeight: 'bold',
            color: '#667eea'
        },
        barWidth: '40%'
    }]
});

// 图表5: 周度产能总量
const totalProductionChart = echarts.init(document.getElementById('totalProductionChart'));
const productionTotalData = productionDates.map(d => weeklyData[d].totalProduction);
totalProductionChart.setOption({
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(50,50,50,0.9)',
        borderColor: '#333',
        textStyle: { color: '#fff' },
        formatter: function (params) {
            let result = params[0].name + '<br/>' +
                params[0].marker + '总产能: ' + params[0].value.toLocaleString() + '吨';

            // 显示环比增长
            const dateIndex = productionDates.indexOf(params[0].name);
            if (dateIndex > 0) {
                const current = productionTotalData[dateIndex];
                const previous = productionTotalData[dateIndex - 1];
                const change = current - previous;
                const changeRate = ((change / previous) * 100).toFixed(2);
                const color = change >= 0 ? '#10b981' : '#ef4444';
                const symbol = change >= 0 ? '↑' : '↓';
                result += '<br/><span style="color:' + color + '">环比: ' + symbol + ' ' + Math.abs(change) + '吨 (' + changeRate + '%)</span>';
            }

            return result;
        }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
        type: 'category',
        data: productionDates,
        axisLabel: { fontSize: 12, color: '#666' }
    },
    yAxis: {
        type: 'value',
        name: '产能(吨/周)',
        axisLabel: { fontSize: 12, color: '#666' },
        splitLine: { lineStyle: { color: '#f0f0f0' } }
    },
    series: [{
        name: '周度产能总量',
        type: 'bar',
        data: productionTotalData,
        itemStyle: {
            color: '#10b981'
        },
        label: {
            show: true,
            position: 'top',
            formatter: '{c}吨',
            fontSize: 13,
            fontWeight: 'bold',
            color: '#10b981'
        },
        barWidth: '40%'
    }]
});

// 响应式调整
window.addEventListener('resize', () => {
    inventoryChart.resize();
    stackedChart.resize();
    productionChart.resize();
    destockingChart.resize();
    totalProductionChart.resize();
});