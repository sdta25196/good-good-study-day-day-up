// 一百万个随机数，他就是不冲突，哎，就是玩，PC端当独立用户
let a = new Set()

for (let i = 0; i < 1000000; i++) {
  a.add(Math.random())
}
console.log(a.size)


localStorage['aa'] = 'sssssss' //直接这样存localStorage就行

简单的指标去分析复杂的事情