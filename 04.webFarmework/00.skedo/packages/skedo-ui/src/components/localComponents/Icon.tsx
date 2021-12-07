import * as Icons from '@ant-design/icons'
import { ComponentClass } from 'react'
import style from './component.module.scss'

interface IconProps {
	iconName : string
}

const Icon = ({iconName} : IconProps) => {
	const list : any = Icons
	const IconInstance : ComponentClass = list[iconName]
	// @ts-ignore
	return <IconInstance className={style.icon} />

}
export default Icon
