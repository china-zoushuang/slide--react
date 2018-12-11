/*
 * 功能：banner swipe
 * 作者：zoushuang@xiaomi.com
 * 日期：2017/10/30
 *
 * 使用方法：
 * <Swipe>
 *  <a href=""></a>
 * </Swipe>
 */
import React, { PureComponent } from 'react'
import './index.less'

export default class SwipeComponent extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      startX: 0, // touch X 起点
      startTime: 0, // touch start time
      translateX: 0, // 偏移量
      translateStartX: 0, // 偏移量后的 touch X 的起点
      direct: 1, // 方向，从左往右为 -1，从右往左为 1
      transition: '', // 在 touchend 时候添加过渡， touchmove 去除过渡
      activeIndex: 0, // 当前项
      round: 0 // 全部图片都播放过的轮数
    }
  }
  componentDidMount () {
    this.autoPlay = setInterval(this.handleAutoPlay.bind(this), 3000)
  }
  // 获取 touch X 起点
  handleTouchStart (e) {
    clearInterval(this.autoPlay)
    this.setState({
      startX: e.touches[0].pageX,
      startTime: new Date().getTime(),
      translateStartX: e.touches[0].pageX - this.state.translateX,
      transition: ''
    })
  }
  // 拖 move
  handleTouchMove (e) {
    this.setState({
      translateX: e.changedTouches[0].pageX - this.state.translateStartX,
      direct: (e.changedTouches[0].pageX - this.state.startX) > 0 ? 1 : -1 // 从左往右为 -1，从右往左为 1
    })
  }
  // 获取 touch X 终点
  handleTouchEnd (e) {
    const speed = new Date().getTime() - this.state.startTime
    let translate
    if (speed < 200 && speed > 0) {
      translate = -this.state.direct * Math.floor(-this.state.direct * this.state.translateX / this.props.boxSize) * this.props.boxSize
    } else {
      translate = -this.state.direct * Math.round(-this.state.direct * this.state.translateX / this.props.boxSize) * this.props.boxSize
    }
    this.handlePlay(translate)
    this.autoPlay = setInterval(this.handleAutoPlay.bind(this), 3000)
  }
  // 轮播
  handlePlay (translate) {
    this.setState({
      round: Math.ceil(translate / (this.props.boxSize * this.props.children.length)),
      translateX: translate,
      transition: 'transform ease-out .3s',
      activeIndex: -(translate / this.props.boxSize) % this.props.children.length >= 0 ? -((translate / this.props.boxSize) % this.props.children.length) : (this.props.children.length - (translate / this.props.boxSize) % this.props.children.length)
    })
  }
  // 自动播放，从右往左
  handleAutoPlay () {
    const translate = this.state.translateX - this.props.boxSize
    this.handlePlay(translate)
  }
  handleGetLeft (index) {
    const propChild = this.props.children
    const length = propChild.length
    const active = this.state.activeIndex
    const round = this.state.round

    if (active === 0 && index === (length - 1)) {
      return index * this.props.boxSize - (1 + round) * length * this.props.boxSize
    } else if (active === (length - 1) && index === 0) {
      return index * this.props.boxSize + (1 - round) * length * this.props.boxSize
    } else {
      return index * this.props.boxSize - round * length * this.props.boxSize
    }
  }
  render () {
    const propChild = this.props.children
    return (
      <section
        className="swipe"
        onTouchStart={this.handleTouchStart.bind(this)}
        onTouchMove={this.handleTouchMove.bind(this)}
        onTouchEnd={this.handleTouchEnd.bind(this)}>
        <ul
          className="swipe__list"
          style={{
            transform: `translateX(${this.state.translateX}px)`,
            transition: this.state.transition
          }}>
          {
            propChild.map((item, index) => {
              return (
                <li
                  className="swipe-list-item"
                  style={{
                    left: this.handleGetLeft(index)
                  }}
                  key={ index }>
                  <a
                    className={ item.props.className }
                    style={ item.props.style }
                    href={ item.props.href }>
                  </a>
                </li>
              )
            })
          }
          {
            propChild.length < 3
              ? <div className="swipe-list-item__placeholder">
                <li
                  className="swipe-list-item"
                  style={{
                    left: this.handleGetLeft(0) + this.props.boxSize
                  }}>
                  <a
                    className={ propChild[1].props.className }
                    style={ propChild[1].props.style }
                    href={ propChild[1].props.href }>
                  </a>
                </li>
                <li
                  className="swipe-list-item"
                  style={{
                    left: this.handleGetLeft(1) - this.props.boxSize
                  }}>
                  <a
                    className={ propChild[0].props.className }
                    style={ propChild[0].props.style }
                    href={ propChild[0].props.href }>
                  </a>
                </li>
              </div>
              : ''
          }
        </ul>
        <div className="swipe__dotbox">
          {
            propChild.map((item, index) => {
              return (
                <span
                  className={ index === this.state.activeIndex ? 'swipe-dotbox__dot swipe-dotbox__dot--active' : 'swipe-dotbox__dot' }
                  key={ index }>
                </span>
              )
            })
          }
        </div>
      </section>
    )
  }
}
