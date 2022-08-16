import Link from "next/link"
import Lay from "../../../components/lay"
function Score(props) {
  return (
    <>
      <Link href='/school/55/new'>
        点击去new
      </Link>
      <div>
        Score
      </div>
    </>
  )
}

export default Score

Score.getLayout = function getLayout(page) {
  return (
    <Lay>
      {page}
    </Lay>
  )
}