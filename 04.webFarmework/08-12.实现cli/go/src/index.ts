#!/usr/bin/env node

import chalk from "chalk"
import parse from "yargs-parser"
import Project from "./project"

const argv = parse(process.argv)

const cmd = argv._[2]
if (!cmd) {
  console.log(chalk.red("输入命令行"));
  process.exit(-1)
}

// 根据命令行进行不同的操作，模板项目的话，只用create即可
async function run() {
  switch (cmd) {
    case "create":
      // 创建流程
      await Project.create()
      break;
    case "dev":
      // 执行流程
      const porject = new Project()
      const port = argv.port || 3000
      porject.devServer(port)
      porject.watch()
      break;
  }
}

run()