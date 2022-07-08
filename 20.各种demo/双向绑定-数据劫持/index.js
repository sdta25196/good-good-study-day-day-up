// 代码基于： https://github.com/SantiagoGdaR/js-two-way-binding
(function () {
  var elements = document.querySelectorAll('[data-tw-bind]');
  var scope = {};

  elements.forEach(function (element) {
    if (element.type === 'text') {
      var propToBind = element.getAttribute('data-tw-bind'); // 获取绑定的数据

      addScopeProp(propToBind); //把属性添加到scope里

      // 搞个键盘谈起事件监听
      element.onkeyup = function () {
        scope[propToBind] = element.value;
      }
    }

    function addScopeProp(prop) {
      if (!scope.hasOwnProperty(prop)) {
        var value;
        // 数据劫持
        Object.defineProperty(scope, prop, {
          set: function (newValue) {
            value = newValue;
            elements.forEach(function (element) {
              if (element.getAttribute('data-tw-bind') === prop) {
                if (element.type && (element.type === 'text')) {
                  element.value = newValue;
                } else if (!element.type) {
                  element.innerHTML = newValue;
                }
              }
            });
          },
          get: function () {
            return value;
          },
          enumerable: true
        });
      }
    }
  });

  changeNameByCode = function () {
    scope.name = 'Phodal HUNAG';

    setTimeout(function () {
      scope.name = 'hello, world'
    }, 1000);

  };
})();