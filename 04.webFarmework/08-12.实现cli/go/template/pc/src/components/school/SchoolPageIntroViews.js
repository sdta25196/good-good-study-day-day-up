import { useEffect } from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import { Space } from '../common'
import './sass/SchoolPageIntroView.scss'

/**
*
* @author : 田源
* @date : 2021-08-10 10:57
* @description : 学校落地页简介-校园风光
*
*/
function SchoolPageIntroViews({ banner = [] }) {
  useEffect(() => {
    if (!banner.length) return
    const galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      loop: banner.length > 4,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    const galleryTop = new Swiper('.gallery-top', {
      autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
      },
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: galleryThumbs
      }
    });
    return () => {
      galleryThumbs.destroy()
      galleryTop.destroy()
    }
  }, [banner])

  if (!banner.length) {
    return <div></div>
  }

  return (
    <>
      <Space height="50px" />
      <div className='viewsBox'>
        <div className='title'>
          校园风光
        </div>
        <div className="swiper-container gallery-top">
          <div className="swiper-wrapper">
            {banner.map((item, i) => {
              return <div className="swiper-slide" key={i}>
                <img src={item.url} width="763px" height="435px" alt="职教网" />
              </div>
            })}
          </div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
        <Space height='10px' />
        <div className="swiper-container gallery-thumbs">
          <div className={`swiper-wrapper ${banner.length === 2 ? "l2" : ""} ${banner.length === 3 ? "l3" : ""}`}>
            {banner.map((item, i) => {
              return <div className="swiper-slide swiper-no-swiping" key={i + 10}>
                <img src={item.url} width="185px" height="103px" alt="职教网" />
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default SchoolPageIntroViews