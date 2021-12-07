import { useEffect } from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import './sass/HomeBanner.scss'

/**
*
* @author: 田源
* @date: 2021-08-03 16:48
* @description: 首页banner
*
*/
function HomeBanner({ banner = [], onChange }) {
  useEffect(() => {
    const mySwiper = new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      },
      on: {
        slideChangeTransitionStart: function () {
          if (banner[(this.activeIndex - 1) % banner.length]) {
            onChange(banner[(this.activeIndex - 1) % banner.length].color)
          }
        },
      },
    })
    return () => {
      mySwiper.destroy()
    }
  }, [banner, onChange])
  return (
    <div className="home-banner">
      <div className="banner">
        <div className="swiper-container" style={{ width: "100%", height: "100%" }}>
          <div className="swiper-wrapper">
            {banner.map((item, i) => {
              return (
                <div className="swiper-slide pointer" key={i} >
                  <a href={item.link} target="_blank" rel="noreferrer">
                    <img src={item.img_url} width="100%" height="400px" alt={item.title} />
                  </a>
                </div>
              )
            })}
          </div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      </div>
    </div>
  )
}

export default HomeBanner