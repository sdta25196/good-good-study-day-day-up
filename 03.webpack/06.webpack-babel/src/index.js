// import '@babel/polyfill'
console.log("hello 06");
const a = new Promise((resolve,reject)=>{
  console.log(123);
  resolve("nb")
})
a.then((x)=>{
  console.log(123,x);
})