import Link from "next/link"
import Lay from "../../../components/lay"


function New(props) {
  return (
    <>
      <Link href='/school/55/score'>
        点击去score
      </Link>
      <div>
        New
      </div>
    </>
  )
}

export default New

New.getLayout = function getLayout(page) {
  return (
    <Lay>
      {page}
    </Lay>
  )
}