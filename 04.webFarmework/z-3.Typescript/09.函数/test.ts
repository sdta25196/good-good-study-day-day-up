class S {
  constructor(num: number) {
    console.log(num);
  }
}

type SomeConstructor = {
  new(s: number): S
}

const fun = (struct: SomeConstructor) => {
  new struct(3)
}

fun(S)

function f<T>(arr:T[]){
  return arr[0]
}
const c = f<number>([1,2,3])