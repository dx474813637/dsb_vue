export default function eChartsOptions(options) {
  let obj;
  options.dataList.colors = [
    "#409EFF",
    "#dc009f",
    "#b640ff",
    "#ff4040",
    "#2fc10a",
    "#737379",
  ];
  if (options.echartsType == "normal") {
    obj = eChartsOptionsNormal(options.dataList);
  }

  if (options.echartsType == "compare") {
    obj = eChartsOptionsCompare(options.dataList);
  }
  if(options.dataList.data.x.length * options.dataList.yName.length > 20 ) {
    obj.dataZoom =  [
      {
        show: true,
        height: 30,
        bottom: 0,

        start: 50,
        end: 100,
      },
      {
        type: "inside",
        show: true,
        height: 15,
        start: 1,
        end: 35,
      },
    ]

  }
  if( options.dataList.yName.length > 4) {
    
    obj.legend.top = '40'
  }
  // console.log(obj)
  return obj;
}

function eChartsOptionsNormal(options) {
  return {
    title: { text: `${options.main}${options.title}数据对比图` },

    legend: {
      data: options.yName,
      right: "20",
      top: "0",
      textStyle: {
        color: "#000",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#409EFF",
        },
        lineStyle: {
          color: "#409EFF",
        },
        label: {
          backgroundColor: "rgba(255,255,255,0.8)",
          extraCssText: "box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);",
          textStyle: {
            color: "#409EFF",
          },
        },
      },
      backgroundColor: "rgba(255,255,255,0.8)",
      extraCssText: "box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);",
      textStyle: {
        color: "#409EFF",
      },
    },
    xAxis: {
      type: "category",
      data: options.data.x,
      axisLine: {
        lineStyle: {
          color: "#eee",
          width: 1,
          type: "solid",
        },
      },
      axisLabel: {
        textStyle: {
          color: "#8798D6",
        },
        interval: 0,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: [
      {
        type: "value",
        axisLine: {
          show: false,
          lineStyle: {
            color: "#00c7ff",
            width: 1,
            type: "solid",
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#eee",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: "#409EFF",
          },
        },
        name: options.dw,
        nameTextStyle: {
          color: "#409EFF",
          align: "right",
        },
      },
    ],
    grid: {
      left: "3%",
      right: "3%",
      top: "80",
      bottom: "10%",
      containLabel: true,
    },
    series: [
      {
        name: options.yName[0],
        type: "line",
        data: options.data.y1,
        smooth: true,
        z: 2,
        label: {
          normal: {
            show: true,
            position: "top",
            color: "#409EFF",
          },
        },
        lineStyle: {
          normal: {
            width: 3,
            color: "#409EFF",
          },
        },
        itemStyle: {
          normal: {
            color: "#409EFF",
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {
              color: "rgba(64, 158, 255, 0.2)",
              // color: $echarts.graphic.LinearGradient(0, 1, 0, 0, [
              //   {
              //     offset: 0,
              //     color: "rgba(7,46,101,0.1)",
              //   },
              //   {
              //     offset: 1,
              //     color: "rgba(0,166,246,0.7)",
              //   },
              // ]),
            },
          },
        },
      },
    ],
  };
}

function eChartsOptionsCompare(options) {
  let arr = [];
  options.data.y1.forEach((ele, index) => {
    arr.push({
      name: options.yName[index],
      type: options.type,
      data: ele,
      smooth: true,
      z: 2,
      label: {
        normal: {
          show:
            options.main.length * options.data.x.length <= 25 ? true : false,
          position: "top",
          color: options.colors[index],
        },
      },
      lineStyle: {
        normal: {
          width: 3,
          color: options.colors[index],
        },
      },
      itemStyle: {
        normal: {
          color: options.colors[index],
          label: {
            show: true,
            position: "top",
          },
          barBorderRadius: [5, 5, 0, 0],
          // areaStyle: {
          //   color: "rgba(64, 158, 255, 0.2)",
          // },
        },
      },
    });
  });
  return {
    title: { text: `${options.main.join("/")}${options.title}数据对比图` },
    legend: {
      data: options.yName,
      right: "20",
      top: "0",
      textStyle: {
        color: "#333",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        crossStyle: {
          color: "#409EFF",
        },
        shadowStyle: {
          color: "rgba(150,150,150,0.1)",
        },
        lineStyle: {
          color: "#409EFF",
        },
        label: {
          backgroundColor: "rgba(255,255,255,0.95)",
          extraCssText: "box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);",
          textStyle: {
            color: "#409EFF",
          },
        },
      },
      backgroundColor: "rgba(255,255,255,0.95)",
      extraCssText: "box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);",
      textStyle: {
        color: "#409EFF",
      },
    },
    xAxis: {
      type: "category",
      data: options.data.x,
      axisLine: {
        lineStyle: {
          color: "#eee",
          width: 1,
          type: "solid",
        },
      },
      axisLabel: {
        textStyle: {
          color: "#8798D6",
        },
        interval: 0,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: [
      {
        type: "value",
        axisLine: {
          show: false,
          lineStyle: {
            color: "#00c7ff",
            width: 1,
            type: "solid",
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#eee",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: "#409EFF",
          },
        },
        name: options.dw,
        nameTextStyle: {
          color: "#409EFF",
          align: "right",
        },
      },
    ],
    grid: {
      left: "3%",
      right: "3%",
      top: "80",
      bottom: "10%",
      containLabel: true,
    },
    series: arr,
  };
}
