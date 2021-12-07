import {createContext} from 'react'
import User from './User'

const UserContext = createContext(new User())

export default UserContext

