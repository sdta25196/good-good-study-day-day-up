import React from 'react'
import echarts from 'echarts'
import { useEffect } from 'react'

/* eslint-disalbe */
function EEchart(props) {
  useEffect(() => {
    let mychart = echarts.init(document.querySelector('#main'))
    let charCloudOption = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {}
      }]
    }
    mychart.setOption(charCloudOption)
  }, [])
  return (
    <div>
      <div id="main" style={{ width: "600px", height: "400px" }}></div>
    </div>
  )
}

export default EEchart