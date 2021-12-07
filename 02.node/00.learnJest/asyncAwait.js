function promise(str){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log(str);
      resolve("1")
    },1000)
  })
}

exports.asyncAwait = async ()=>{
  await promise("async 1");
  await promise("async 2");
  await promise("async 3");
}