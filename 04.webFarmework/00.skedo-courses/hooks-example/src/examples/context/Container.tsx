import { useContext } from 'react'
import User from './User'
import UserContext from './UserContext'

export default () => {

  const user = useContext(UserContext)

  return <UserContext.Provider value={user}>
    <div>
      <FooComponent />
    </div>
  </UserContext.Provider>
}

const FooComponent = () => {
  const context = useContext(UserContext)

  return <div>
    {context.name}
  </div>
}