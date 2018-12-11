import React, { PureComponent } from 'react'
import Swipe from '../component/common/Swipe'
export default class App extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const bannerData = [
      {
        'target': {
          'url': 'http://www.baidu.com',
          'title': 'title',
          'stat': 'ins_home_banner_4501',
          'loginRequired': false
        },
        'image': 'https://ts.market.mi-img.com/thumbnail/webp/w1242q80/Finance/0d0b9040e5d3a489a14d1db066d8a9a8cc03ab11d'
      },
      {
        'target': {
          'url': 'http://staging.mifi.pt.xiaomi.com/insurance/car.html?source=p0&from=test#/newcar/16',
          'title': '1',
          'stat': 'ins_home_banner_4500',
          'loginRequired': false
        },
        'image': 'https://ts.market.mi-img.com/thumbnail/webp/w1242q80/Finance/02a9c40aa1350dbb905d411a5f11b49757a4184a2'
      }
    ]
    return (
      <section>
        <div className="banner">
          {
            bannerData.length > 1
              ? <Swipe boxSize={document.documentElement.clientWidth}>
                {
                  bannerData.map((item, index) => {
                    return (
                      <a
                        className="banner__item"
                        style={ {background: `url(${item.image}) no-repeat center center / 100%`} }
                        key={ index }
                        href={ item.target ? item.target.url : null } >
                      </a>
                    )
                  })
                }
              </Swipe>
              : <a
                className="banner__item"
                href={ bannerData[0].target.url }
                style={ {background: `url(${bannerData[0].image}) no-repeat center center / 100%`} }>
              </a>
          }
        </div>
      </section>
    )
  }
}
