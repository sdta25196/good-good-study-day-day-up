type A = number | string
type B = number & string  // ts认为这是不可能发生的

type Pointx = { x: number }
type Pointy = { y: number }

type X = Pointx & Pointy //合并了Pointx与Pointy

const d: X = { x: 1, y: 2 }
console.log(d.y);

// type Flatterned<T> = T extends Array<infer T> ? T : T

// type D = Flatterned<Array<string>>
type Atom = number | string | boolean | bigint

type Nexted = Array<(Atom | Nexted)>

// type Nexted<T> = (T | (T | T[])[])[]

const o: Nexted = [1, 2, 3, [], 22, [], [[], [[[[[5]]]]]]]
console.log(o)
