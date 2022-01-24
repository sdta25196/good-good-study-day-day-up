// const { add } = require('../src/a')


// test("测试", () => {
//   expect(add(2)).toBe(4)
// })
function fetchData(callback) {
  return setTimeout(() => {
    callback('peanut butter')
  }, 2000)
}
test('the data is peanut butter', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }
  fetchData(callback)
});
test.only('the data is peanut butter', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter111');
      done();
    } catch (error) {
      done(error);
    }
  }
  fetchData(callback)
});
