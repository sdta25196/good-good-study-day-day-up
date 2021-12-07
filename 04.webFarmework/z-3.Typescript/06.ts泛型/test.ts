interface lw {
  length: number
}

function loggingIdentity<T extends lw>(arg: T): T {
  console.log(arg.length);
  return arg;
}

let a = loggingIdentity([])
console.log(a);


//keyof 增加泛型约束，这个可NB了
// 限制key 必须是type的key
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}


let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");

//getProperty(x, "m"); // Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.



class GenericNumber<T> {
  zeroValue: T

  constructor(v: T) {
    this.zeroValue = v
  }

  add(x: T, y: T) {
    // if (typeof x == "number" && typeof y == "number")
    // return x + y
  }
}