// 数组，ts中数组不建议使用[]创建
const A = new Array<String>()
A[0] = "2"


// implict 隐式
// explict 显示
function foo(x: any = 4) {
  console.log(x);
}
foo()

type Point = {
  x: number,
  y: number
}
const pt: Point = { x: 100, y: 100 }

pt.x = 10000 // Error

interface Po {
  x: number
  y: number
}
interface Po {
  x: number
  y: number
}


function test(val: number | "a") {
  console.log(val);
}
test("a")

function testNull(val: number | null) {
  if(val === null){

  }else{
    console.log(val.toString());
  }
  console.log(val!.toString()); // 强制证明这里就不是null
  // console.log(val.toString());  //error
}

enum E {
  X,
  Y,
  Z,
}

function f(obj: { X: number }) {
  return obj.X;
}

f(E)