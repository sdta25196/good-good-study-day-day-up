import _404 from '../assets/images/404.png'

export default function NotFind() {
  return (
    <div style={{ textAlign: 'center', paddingTop: '150px' }}>
      <img src={_404} alt="页面不见了" width='700px' height='450px' />
    </div>
  )
}