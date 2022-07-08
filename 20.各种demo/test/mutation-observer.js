let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords); // console.log(the changes)
});

// 观察除了特性之外的所有变动
observer.observe(elem, {
  childList: true, // 观察直接子节点
  subtree: true, // 及其更低的后代节点
  characterDataOldValue: true // 将旧的数据传递给回调
});

//observer.disconnect() —— 停止观察。

//当我们停止观察时，观察器可能尚未处理某些更改。在种情况下，我们使用：
//observer.takeRecords() —— 获取尚未处理的变动记录列表，表中记录的是已经发生，但回调暂未处理的变动。
