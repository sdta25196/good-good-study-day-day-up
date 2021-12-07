import { useEffect } from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import './sass/NewsBanner.scss'
/**
*
* @author : 田源
* @date : 2021-08-12 15:56
* @description : 职教热点顶部banner
*
*/
function NewsBanner({ banner = [] }) {
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
    })
    return () => {
      mySwiper.destroy()
    }
  }, [banner])

  return (
    <div>
      <div className="news-banner">
        <div className="banner">
          <div className="swiper-container" style={{ width: "100%", height: "100%" }}>
            <div className="swiper-wrapper">
              {banner.map((item, i) => {
                return (
                  <div className="swiper-slide pointer" key={i}>
                    <a href={item.link} target="_blank" rel="noreferrer">
                      <img src={item.img_url} width="100%" height="400px" alt={item.title} />
                    </a>
                  </div>
                )
              })}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsBanner