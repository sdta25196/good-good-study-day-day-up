var Y = function (h) {
  return (function (f) {
      return f(f);
  })(function (f) {
      return h(function (n) {
          return f(f)(n);
      });
  });
};

(n) => {
  if(n===0) {
    return  1
  }
  return n * fact1(n-1)
}

(Y(function (g) {
  return function (n) {
      if (n < 2) return 1;
      return n * g(n - 1);
  };
})(100))