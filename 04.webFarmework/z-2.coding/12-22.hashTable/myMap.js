

function Mymap() {  //构造函数

  this.init();

}

//初始化函数，创建桶（数组），每个位置都是一个对象，每个对象的属性上设置next属性，并且初始化为null。

Mymap.prototype.init = function () {

  this.tong = new Array(8);

  for (var i = 0; i < 8; i++) {

    this.tong[i] = new Object();

    this.tong[i].next = null;

  }

};

//添加数据。

Mymap.prototype.set = function (key, value) {

  var index = this.hash(key);        //获取到当前设置的key设置到那个位置上
  console.log(index);
  console.log(this.tong);
  var TempBucket = this.tong[index]; //获取当前位置的对象

  while (TempBucket.next) {          //遍历如果当前对象链接的下一个不为空

    if (TempBucket.next.key == key) {  //如果要设置的属性已经存在，覆盖其值。

      TempBucket.next.value = value;

      return;                          //return ,不在继续遍历

    } else {

      TempBucket = TempBucket.next;  //把指针指向下一个对象。        
    }



  }

  TempBucket.next = {  //对象的next是null ,添加对象。

    key: key,

    value: value,

    next: null

  }

};

//查询数据

Mymap.prototype.get = function (key) {

  var index = this.hash(key);

  var TempBucket = this.tong[index];

  while (TempBucket) {

    if (TempBucket.key == key) {

      return TempBucket.value;

    } else {

      TempBucket = TempBucket.next;

    }

  }

  return undefined;

}

//删除数据

Mymap.prototype.delete = function (key) {

  var index = this.hash(key);

  var TempBucket = this.tong[index];
  console.log(66, TempBucket)
  while (TempBucket) {

    if (TempBucket.next.key == key) {

      TempBucket.next = TempBucket.next.next;

      return true;

    } else {

      TempBucket = TempBucket.next;

    }

  }

}

//看当前属性是否存在

Mymap.prototype.has = function (key) {

  var index = this.hash(key);

  var TempBucket = this.tong[index];

  while (TempBucket) {

    if (TempBucket.key == key) {

      return true;

    } else {

      TempBucket = TempBucket.next;

    }

  }

  return false;

}

//清空这个map

Mymap.prototype.clear = function () {

  this.init();

}

//使设置的属性平均分配到每个位置上，使得不会某个链条过长。

Mymap.prototype.hash = function (key) {

  var index = 0;

  if (typeof key == "string") {

    for (var i = 0; i < 3; i++) {

      index = index + isNaN(key.charCodeAt(i)) ? 0 : key.charCodeAt(i);

    }

  }

  else if (typeof key == 'object') {

    index = 0;

  }

  else if (typeof key == 'number') {
    index = isNaN(key) ? 7 : key;
  } else {
    index = 1;
  }



  return index % 8;

}



var map = new Mymap();    //使用构造函数的方式实例化map


console.log(
  map.set('a', 'zwq'),
  // map.set({}, 'zwq111'),
  // map.set({}, 'zwq111'),
  // map.set({}, 'zwq111'),
  // map.set({}, 'zwq111'),
  // map.set({}, 'zwq111'),
  // map.set({}, 'zwq111'),

  map.delete('a'),

  map.has('a'),
);