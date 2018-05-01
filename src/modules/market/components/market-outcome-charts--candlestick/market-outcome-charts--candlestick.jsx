import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CustomPropTypes from 'utils/custom-prop-types'
import * as d3 from 'd3'
import { withFauxDOM } from 'react-faux-dom'

import { isEqual } from 'lodash'
import { createBigNumber } from 'utils/create-big-number'

import { compose, getOr, maxBy, minBy, pick, map } from 'lodash/fp'

import MarketOutcomeChartsHeaderCandlestick
  from 'modules/market/components/market-outcome-charts--header-candlestick/market-outcome-charts--header-candlestick'

import { BUY, SELL } from 'modules/transactions/constants/types'

import Styles
  from 'modules/market/components/market-outcome-charts--candlestick/market-outcome-charts--candlestick.styles'

class MarketOutcomeCandlestick extends Component {
  static propTypes = {
    candleTicksContainer: PropTypes.any,
    candleChartContainer: PropTypes.any,
    connectFauxDOM: PropTypes.func.isRequired,
    currentTimeInSeconds: PropTypes.number.isRequired,
    drawFauxDOM: PropTypes.func.isRequired,
    fixedPrecision: PropTypes.number.isRequired,
    hoveredPeriod: PropTypes.object.isRequired,
    hoveredPrice: PropTypes.any,
    isMobile: PropTypes.bool.isRequired,
    marketMax: CustomPropTypes.bigNumber,
    marketMin: CustomPropTypes.bigNumber,
    orderBookKeys: PropTypes.object.isRequired,
    outcomeName: PropTypes.string,
    priceTimeSeries: PropTypes.array.isRequired,
    selectedPeriod: PropTypes.number.isRequired,
    selectedRange: PropTypes.number.isRequired,
    sharedChartMargins: PropTypes.object.isRequired,
    updateChartHeaderHeight: PropTypes.func.isRequired,
    updateHoveredPeriod: PropTypes.func.isRequired,
    updateHoveredPrice: PropTypes.func.isRequired,
    updateSelectedPeriod: PropTypes.func.isRequired,
    updateSelectedRange: PropTypes.func.isRequired,
    updateSeletedOrderProperties: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      chartWidth: 0,
      yScale: null,
    }

    this.drawCandlestick = this.drawCandlestick.bind(this)
    this.drawCandlestickOnResize = this.drawCandlestickOnResize.bind(this)
  }

  componentDidMount() {
    const {
      fixedPrecision,
      orderBookKeys,
      sharedChartMargins,
      marketMin,
      marketMax,
    } = this.props

    const candleTicksContainer = this.props.connectFauxDOM('div', 'candleTicksContainer')
    const candleChartContainer = this.props.connectFauxDOM('div', 'candleChartContainer')
    d3.select(candleTicksContainer).append('svg')
    d3.select(candleChartContainer).append('svg')

    this.drawCandlestick({
      orderBookKeys,
      fixedPrecision,
      sharedChartMargins,
      marketMin,
      marketMax,
    })

    window.addEventListener('resize', this.drawCandlestickOnResize)
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      fixedPrecision,
      hoveredPrice,
      orderBookKeys,
      priceTimeSeries,
      sharedChartMargins,
      marketMin,
      marketMax,
    } = this.props

    if (
      !isEqual(priceTimeSeries, prevProps.priceTimeSeries) ||
      !isEqual(orderBookKeys, prevProps.orderBookKeys) ||
      !isEqual(sharedChartMargins, prevProps.sharedChartMargins) ||
      !marketMin.isEqualTo(prevProps.marketMin) ||
      !marketMax.isEqualTo(prevProps.marketMax) ||
      fixedPrecision !== prevProps.fixedPrecision
    ) {
      this.drawCandlestick({
        periodTimeSeries: priceTimeSeries,
        orderBookKeys,
        fixedPrecision,
        sharedChartMargins,
        marketMin,
        marketMax,
      })
    }

    // if (!isEqual(hoveredPrice, prevProps.hoveredPrice)) updateHoveredPriceCrosshair(hoveredPrice, this.state.yScale, this.state.chartWidth)

    if (!isEqual(prevProps.candleChartContainer, this.props.candleChartContainer)) {
      const elem = document.getElementById('candlestick_chart_container')

      elem.scrollTo(elem.scrollWidth, 0)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.drawCandlestickOnResize)
  }

  drawCandlestick({
    orderBookKeys,
    fixedPrecision,
    sharedChartMargins,
    marketMin,
    marketMax,
  }) {
    const {
      currentTimeInSeconds,
      priceTimeSeries,
      selectedPeriod,
      selectedRange,
      updateHoveredPeriod,
      updateHoveredPrice,
      updateSeletedOrderProperties,
    } = this.props

    if (this.drawContainer) {
      const drawParams = determineDrawParams({
        currentTimeInSeconds,
        drawContainer: this.drawContainer,
        fixedPrecision,
        marketMax,
        marketMin,
        orderBookKeys,
        priceTimeSeries,
        selectedPeriod,
        selectedRange,
        sharedChartMargins,
      })

      // Faux DOM
      //  Tick Element (Fixed)
      const candleTicksContainer = this.props.connectFauxDOM('div', 'candleTicksContainer')
      candleTicksContainer.setAttribute('class', `${Styles['MarketOutcomeCandlestick__ticks-container']}`)
      candleTicksContainer.setAttribute('key', 'candlestick_ticks_container')
      //  Chart Element (Scrollable)
      const candleChartContainer = this.props.connectFauxDOM('div', 'candleChartContainer')
      candleChartContainer.setAttribute('key', 'candlestick_chart_container')
      candleChartContainer.setAttribute('id', 'candlestick_chart_container')
      candleChartContainer.setAttribute('class', `${Styles['MarketOutcomeCandlestick__chart-container']}`)
      candleChartContainer.setAttribute('style', {
        width: `${drawParams.containerWidth - drawParams.chartDim.left}px`,
        left: drawParams.chartDim.left,
      })

      const candleTicks = d3.select(candleTicksContainer)
        .select('svg')
        .attr('width', drawParams.containerWidth)
        .attr('height', drawParams.containerHeight)
      const candleChart = d3.select(candleChartContainer)
        .select('svg')
        .attr('id', 'candlestick_chart')
        .attr('height', drawParams.containerHeight)
        .attr('width', drawParams.drawableWidth)

      drawTicks({
        orderBookKeys,
        candleTicks,
        drawParams,
        fixedPrecision,
      })

      drawCandles({
        periodTimeSeries: priceTimeSeries,
        candleChart,
        drawParams,
      })

      drawVolume({
        fixedPrecision,
        periodTimeSeries: priceTimeSeries,
        candleChart,
        drawParams,
      })

      drawXAxisLabels({
        periodTimeSeries: priceTimeSeries,
        candleChart,
        drawParams,
      })

      drawCrosshairs({
        candleTicks,
      })

      attachHoverClickHandlers({
        updateHoveredPeriod,
        updateHoveredPrice,
        periodTimeSeries: priceTimeSeries,
        fixedPrecision,
        candleChart,
        drawParams,
        updateSeletedOrderProperties,
      })

      // Set react components to state for render
      this.setState({
        yScale: drawParams.yScale,
        chartWidth: drawParams.containerWidth,
      })
    }
  }

  drawCandlestickOnResize() {
    const {
      fixedPrecision,
      orderBookKeys,
      sharedChartMargins,
    } = this.props
    this.drawCandlestick({
      orderBookKeys,
      fixedPrecision,
      sharedChartMargins,
    })
  }

  render() {
    const {
      outcomeName,
      hoveredPeriod,
      priceTimeSeries,
      fixedPrecision,
      updateSelectedPeriod,
      updateSelectedRange,
      updateChartHeaderHeight,
      isMobile,
      selectedPeriod,
      selectedRange,
    } = this.props

    return (
      <section className={Styles.MarketOutcomeCandlestick}>
        <MarketOutcomeChartsHeaderCandlestick
          outcomeName={outcomeName}
          isMobile={isMobile}
          volume={hoveredPeriod.volume}
          open={hoveredPeriod.open}
          high={hoveredPeriod.high}
          low={hoveredPeriod.low}
          close={hoveredPeriod.close}
          priceTimeSeries={priceTimeSeries}
          fixedPrecision={fixedPrecision}
          selectedPeriod={selectedPeriod}
          selectedRange={selectedRange}
          updateSelectedPeriod={updateSelectedPeriod}
          updateSelectedRange={updateSelectedRange}
          updateChartHeaderHeight={updateChartHeaderHeight}
        />
        <div
          ref={(drawContainer) => { this.drawContainer = drawContainer }}
          className={Styles.MarketOutcomeCandlestick__container}
        >
          {this.props.candleTicksContainer}
          {this.props.candleChartContainer}
        </div>
      </section>
    )
  }
}

function determineDrawParams({
  currentTimeInSeconds,
  drawContainer,
  fixedPrecision,
  marketMax,
  marketMin,
  orderBookKeys,
  priceTimeSeries,
  selectedPeriod,
  selectedRange,
  sharedChartMargins,
}) {
  // Dimensions/Positioning
  const chartDim = {
    ...sharedChartMargins,
    right: 0,
    left: 50,
    stick: 5,
    tickOffset: 10,
  }
  const candleDim = {
    width: 6,
    gap: 9,
  }

  const containerWidth = drawContainer.clientWidth
  const containerHeight = drawContainer.clientHeight

  // Domain
  //  X
  const xDomain = [
    new Date((currentTimeInSeconds - selectedRange) * 1000),
    new Date(currentTimeInSeconds * 1000),
  ]

  const drawableWidth = containerWidth

  const max = compose(
    getOr(marketMax.toNumber(), 'high'),
    maxBy('high'),
  )(priceTimeSeries)

  const min = compose(
    getOr(marketMin.toNumber(), 'low'),
    minBy('low'),
  )(priceTimeSeries)

  //  Y
  // Determine bounding diff
  // This scale is off because it's only looking at the order book rather than the price history + scaling around the midpoint
  const maxDiff = createBigNumber(orderBookKeys.mid.minus(max).toPrecision(15)).absoluteValue() // NOTE -- toPrecision to address an error when attempting to get the absolute value
  const minDiff = createBigNumber(orderBookKeys.mid.minus(min).toPrecision(15)).absoluteValue()
  let boundDiff = maxDiff.gt(minDiff) ? maxDiff : minDiff

  const yDomain = [
    max,
    min,
  ]

  boundDiff = boundDiff.toNumber()

  // Scale
  const xScale = d3.scaleTime()
    .domain(d3.extent(xDomain))
    .range([chartDim.left, drawableWidth - chartDim.left - chartDim.right])

  const yScale = d3.scaleLinear()
    .domain(d3.extent(yDomain))
    .range([chartDim.top, containerHeight - chartDim.bottom])

  return {
    containerWidth,
    containerHeight,
    drawableWidth,
    chartDim,
    candleDim,
    boundDiff,
    yDomain,
    xScale,
    yScale,
    marketMin,
    marketMax,
    orderBookKeys,
  }
}

function drawTicks({
  orderBookKeys,
  candleTicks,
  drawParams,
  fixedPrecision,
}) {

  // Y axis
  //  Bounds
  //    Top
  candleTicks.append('line')
    .attr('class', 'bounding-line')
    .attr('x1', 0)
    .attr('x2', drawParams.containerWidth)
    .attr('y1', 0)
    .attr('y2', 0)
  //    Bottom
  candleTicks.append('line')
    .attr('class', 'bounding-line')
    .attr('x1', 0)
    .attr('x2', drawParams.containerWidth)
    .attr('y1', drawParams.containerHeight - drawParams.chartDim.bottom)
    .attr('y2', drawParams.containerHeight - drawParams.chartDim.bottom)

  //  Midpoint
  //    Conditional Tick Line
  // candleTicks.append('line')
  //   .attr('class', 'tick-line tick-line--midpoint')
  //   .attr('x1', drawParams.chartDim.tickOffset)
  //   .attr('x2', drawParams.containerWidth)
  //   .attr('y1', () => drawParams.yScale(orderBookKeys.mid))
  //   .attr('y2', () => drawParams.yScale(orderBookKeys.mid))

  //    Label
  candleTicks.append('text')
    .attr('class', 'tick-value')
    .attr('x', 0)
    .attr('y', drawParams.yScale(orderBookKeys.mid))
    .attr('dx', 0)
    .attr('dy', drawParams.chartDim.tickOffset)
    .text(orderBookKeys.mid.toFixed(fixedPrecision))

  //  Ticks
  const offsetTicks = drawParams.yDomain.map((d, i) => { // Assumes yDomain is [max, min]
    if (i === 0) return d - (drawParams.boundDiff / 2)
    return d + (drawParams.boundDiff / 2)
  })

  const yTicks = candleTicks.append('g')
    .attr('id', 'depth_y_ticks')

  yTicks.selectAll('line')
    .data(offsetTicks)
    .enter()
    .append('line')
    .attr('class', 'tick-line')
    .attr('x1', 0)
    .attr('x2', drawParams.containerWidth)
    .attr('y1', d => drawParams.yScale(d))
    .attr('y2', d => drawParams.yScale(d))
  yTicks.selectAll('text')
    .data(offsetTicks)
    .enter()
    .append('text')
    .attr('class', 'tick-value')
    .attr('x', 0)
    .attr('y', d => drawParams.yScale(d))
    .attr('dx', 0)
    .attr('dy', drawParams.chartDim.tickOffset)
    .text(d => d.toFixed(fixedPrecision))
}

function drawCandles({
  periodTimeSeries,
  candleChart,
  drawParams,
}) {
  candleChart.selectAll('rect.candle')
    .data(periodTimeSeries)
    .enter().append('rect')
    .attr('x', d => drawParams.xScale(d.period))
    .attr('y', d => drawParams.yScale(d3.max([d.open, d.close])))
    .attr('height', d => drawParams.yScale(d3.min([d.open, d.close])) - drawParams.yScale(d3.max([d.open, d.close])))
    .attr('width', drawParams.candleDim.width)
    .attr('class', d => d.close > d.open ? 'up-period' : 'down-period') // eslint-disable-line no-confusing-arrow

  candleChart.selectAll('line.stem')
    .data(periodTimeSeries)
    .enter().append('line')
    .attr('class', 'stem')
    .attr('x1', d => drawParams.xScale(d.period) + (drawParams.candleDim.width / 2))
    .attr('x2', d => drawParams.xScale(d.period) + (drawParams.candleDim.width / 2))
    .attr('y1', d => drawParams.yScale(d.high))
    .attr('y2', d => drawParams.yScale(d.low))
    .attr('class', d => d.close > d.open ? 'up-period' : 'down-period') // eslint-disable-line no-confusing-arrow
}

function drawVolume(options) {
  const {
    periodTimeSeries,
    candleChart,
    drawParams,
  } = options

  const yVolumeDomain = periodTimeSeries.reduce((p, dataPoint) => [...p, dataPoint.volume], [])

  const yVolumeScale = d3.scaleLinear()
    .domain(d3.extent(yVolumeDomain))
    .range([drawParams.containerHeight - drawParams.chartDim.bottom, drawParams.chartDim.top + ((drawParams.containerHeight - drawParams.chartDim.bottom) * 0.66)])

  candleChart.selectAll('rect.volume')
    .data(periodTimeSeries)
    .enter().append('rect')
    .attr('x', d => drawParams.xScale(d.period))
    .attr('y', d => yVolumeScale(d.volume))
    .attr('height', d => drawParams.containerHeight - drawParams.chartDim.bottom - yVolumeScale(d.volume))
    .attr('width', () => drawParams.candleDim.width)
    .attr('class', 'period-volume')
}

function drawXAxisLabels({
  periodTimeSeries,
  candleChart,
  drawParams,
}) {
  candleChart.append('g')
    .attr('id', 'candlestick-x-axis')
    .attr('transform', `translate(0, ${drawParams.containerHeight - drawParams.chartDim.bottom})`)
    .call(d3.axisBottom(drawParams.xScale).ticks(periodTimeSeries.length / 3)) // TODO -- improve tick count
    .select('path').remove()
}

function drawCrosshairs({ candleTicks }) {
  candleTicks.append('text')
    .attr('id', 'hovered_candlestick_price_label')

  const crosshair = candleTicks.append('g')
    .attr('id', 'candlestick_crosshairs')
    .attr('class', 'line')
    .style('display', 'none')

  crosshair.append('line')
    .attr('id', 'candlestick_crosshairY')
    .attr('class', 'crosshair')
}

function attachHoverClickHandlers({
  updateHoveredPeriod,
  updateHoveredPrice,
  periodTimeSeries,
  fixedPrecision,
  candleChart,
  drawParams,
  updateSeletedOrderProperties,
}) {
  candleChart.append('rect')
    .attr('class', 'overlay')
    .attr('width', drawParams.drawableWidth)
    .attr('height', drawParams.containerHeight)
    .on('mousemove', () => updateHoveredPrice(drawParams.yScale.invert(d3.mouse(d3.select('#candlestick_chart').node())[1]).toFixed(fixedPrecision)))
    .on('mouseout', () => updateHoveredPrice(null))
    .on('click', () => {
      const mouse = d3.mouse(d3.select('#candlestick_chart').node())
      const orderPrice = drawParams.yScale.invert(mouse[1]).toFixed(fixedPrecision)

      if (
        orderPrice > drawParams.marketMin &&
        orderPrice < drawParams.marketMax
      ) {
        updateSeletedOrderProperties({
          selectedNav: orderPrice > drawParams.orderBookKeys.mid ? BUY : SELL,
          orderPrice,
        })
      }
    })

  candleChart.selectAll('rect.hover')
    .data(periodTimeSeries)
    .enter().append('rect')
    .attr('id', 'testing')
    .attr('x', d => drawParams.xScale(d.period) - (drawParams.candleDim.gap * 0.5))
    .attr('y', 0)
    .attr('height', drawParams.containerHeight - drawParams.chartDim.bottom)
    .attr('width', drawParams.candleDim.width + drawParams.candleDim.gap)
    .attr('class', 'period-hover')
    .on('mouseover', d => updateHoveredPeriod(d))
    .on('mousemove', () => updateHoveredPrice(drawParams.yScale.invert(d3.mouse(d3.select('#candlestick_chart').node())[1])))
    .on('mouseout', () => {
      updateHoveredPeriod({})
      updateHoveredPrice(null)
    })
}

function updateHoveredPriceCrosshair(hoveredPrice, yScale, chartWidth) {
  if (hoveredPrice == null) {
    d3.select('#candlestick_crosshairs').style('display', 'none')
    d3.select('#hovered_candlestick_price_label').text('')
  } else {
    d3.select('#candlestick_crosshairs').style('display', null)
    d3.select('#candlestick_crosshairY')
      .attr('x1', 0)
      .attr('y1', yScale(hoveredPrice))
      .attr('x2', chartWidth)
      .attr('y2', yScale(hoveredPrice))
    d3.select('#hovered_candlestick_price_label')
      .attr('x', 0)
      .attr('y', yScale(hoveredPrice) + 12)
      .text(hoveredPrice)
  }
}

export default withFauxDOM(MarketOutcomeCandlestick)
