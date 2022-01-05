function deepCopy(newObj, oldObj) {
  for (var k in oldObj) {
    let item = oldObj[k]
    if (item instanceof Array) {
      newObj[k] = []
      deepCopy(newObj[k], item)
    } else if (item instanceof Object) {
      newObj[k] = {}
      deepCopy(newObj[k], item)
    } else {
      newObj[k] = item
    }
  }
}