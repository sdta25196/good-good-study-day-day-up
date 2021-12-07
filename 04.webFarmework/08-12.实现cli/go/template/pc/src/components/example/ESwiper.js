
import { useEffect } from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

/* eslint-disalbe */
function ESwiper(props) {
  useEffect(() => {
    const mySwiper = new Swiper('.swiper-container', {
      autoplay: true,//可选选项，自动滑动
    })
    return () => {
      mySwiper.destroy()
    }
  }, [])
  return (
    <div>
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">slider1</div>
          <div className="swiper-slide">slider2</div>
          <div className="swiper-slide">slider3</div>
        </div>
      </div>
    </div>
  )
}

export default ESwiper
