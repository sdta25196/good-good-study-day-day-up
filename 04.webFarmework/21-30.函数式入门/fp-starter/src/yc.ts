// Y 函数支持我们使用一个匿名函数进行递归，利用的是HOC

var Y = function (h) {
  return (function (f) {
    return f(f);
  })(function (f) {
    return h(function (n) {
      return f(f)(n);
    });
  });
};

(Y(function (g) {
  return function (n) {
    if (n < 2) return 1;
    return n * g(n - 1);
  };
})(100))