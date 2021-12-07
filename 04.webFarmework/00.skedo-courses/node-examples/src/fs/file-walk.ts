import {readdir, readdirSync, statSync} from 'fs'
import path from 'path'


function* walk(dir : string, pattern : RegExp) : Generator<string> {
  const files = readdirSync(dir)

  for(let file of files) {
    const fullpath = path.resolve(dir, file)

    const info = statSync(fullpath)
    if( info.isDirectory() ) {
      yield * walk(fullpath, pattern)
      continue
    }

    if( file.match(pattern) )  {
      yield fullpath 
    }
  }
}

[...walk(path.resolve(process.argv[2]), /\.ts$/)]
  .forEach(file => {
    console.log(file)
  })