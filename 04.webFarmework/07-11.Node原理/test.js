/**包管理所需技能 */

import fs from 'fs'
import path from 'path'
import { Package } from './package'  // 读取与回写文件 readFile \ writeFile，没用buffer是因为不是大文件场景、不是高并发场景
import Packages from './Packages'
//scan.ts
// function *walk(pattern : RegExp, dir : string, exclude : RegExp) : Generator<any> {

// 	const files = fs.readdirSync(dir)

// 	for(let i = 0; i < files.length; i++) {
// 		const file = files[i]
// 		const fullname = path.resolve(dir, file)
// 		if(fullname.match(exclude)) {
// 			continue
// 		}
// 		if(fullname.match(pattern)) {
// 			yield [file, dir]
// 		}
// 		if(fs.statSync(fullname).isDirectory()) {
// 			yield * walk(pattern, fullname, exclude)
// 		}
//   }
// }


// // scan.ts
// export function loadProjects() : Packages{
// 	const result = [...walk(/package\.json$/, path.resolve(__dirname, '../../'), /(node_modules|\.git)/)]
// 	return new Packages(result.map( ([file, dir]) => new Package(file, dir)))
// }

// const packages = getPackageJsons()
// packages[0].save()