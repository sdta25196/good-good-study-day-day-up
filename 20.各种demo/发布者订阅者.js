// 气象站(发布者)
class WeatherData {
  constructor() {
    this.observerList = []; //所有的观察者
    this.temp; //温度
    this.humidity;//湿度
    this.pressure;//气压
  }

  // 注册观察者
  registerObserver(observer) {
    this.observerList.push(observer);
  }
  // 删除观察者
  removeObserver(observer) {
    var index = this.observerList.indexOf(observer);
    if (index >= 0) {
      this.observerList.splice(index, 1);
    }
  }
  // 当状态改变时，调用此方法通知所有观察者   
  notifyObserver() {
    this.observerList.forEach(e => {
      e.update(this.temp, this.humidity, this.pressure);
    })
  }
  // 修改气象站数据时，通知观察者
  setWeatherData(temp, humidity, pressure) {
    this.temp = temp;
    this.humidity = humidity;
    this.pressure = pressure;
    this.notifyObserver();
  }
}

// 显示板(订阅者)
class DispalyModul {
  constructor(weatherData) {
    this.temp; //温度
    this.humidity;//湿度
    this.pressure;//气压
    weatherData.registerObserver(this); //将订阅者注册到发布者上，当发布者进行发布信息时，即可实现订阅者收到信息
  }
  // 用来接收发布者消息
  update(temp, humidity, pressure) {
    this.temp = temp;
    this.humidity = humidity;
    this.pressure = pressure;
    this.dispaly();
  }
  dispaly() {
    console.log(`显示板显示：温度-${this.temp},湿度-${this.humidity},气压-${this.pressure}`)
  }
}
// Temp显示板(订阅者)
class DispalyTemp {
  constructor(weatherData) {
    this.temp; //温度
    this.humidity;//湿度
    this.pressure;//气压
    weatherData.registerObserver(this); //将订阅者注册到发布者上，当发布者进行发布信息时，即可实现订阅者收到信息
  }
  // 用来接收发布者消息
  update(temp, humidity, pressure) {
    this.temp = temp;
    this.humidity = humidity;
    this.pressure = pressure;
    this.dispaly();
  }
  dispaly() {
    console.log(`温度显示板：温度-${this.temp}`)
  }
}
// Humidity显示板(订阅者)
class DispalyHumidity {
  constructor(weatherData) {
    this.temp; //温度
    this.humidity;//湿度
    this.pressure;//气压
    weatherData.registerObserver(this); //将订阅者注册到发布者上，当发布者进行发布信息时，即可实现订阅者收到信息
  }
  // 用来接收发布者消息
  update(temp, humidity, pressure) {
    this.temp = temp;
    this.humidity = humidity;
    this.pressure = pressure;
    this.dispaly();
  }
  dispaly() {
    console.log(`湿度显示板：湿度-${this.humidity}`)
  }
}
// Pressure显示板(订阅者)
class DispalyPressure {
  constructor(weatherData) {
    this.temp; //温度
    this.humidity;//湿度
    this.pressure;//气压
    weatherData.registerObserver(this); //将订阅者注册到发布者上，当发布者进行发布信息时，即可实现订阅者收到信息
  }
  // 用来接收发布者消息
  update(temp, humidity, pressure) {
    this.temp = temp;
    this.humidity = humidity;
    this.pressure = pressure;
    this.dispaly();
  }
  dispaly() {
    console.log(`气压显示板：气压-${this.pressure}`)
  }
}

let subject = new WeatherData();
let observer = new DispalyModul(subject);
let observerTemp = new DispalyTemp(subject);
let observerHumidity = new DispalyHumidity(subject);
let observerPressure = new DispalyPressure(subject);

subject.setWeatherData(23.5, "45%", 750);
// 输出如下：
// 显示板显示：温度-23.5,湿度-45%,气压-750
// 温度显示板：温度-23.5
// 湿度显示板：湿度-45%
// 气压显示板：气压-750

subject.removeObserver(observerHumidity); //删除湿度显示板

subject.setWeatherData(31, "30%", 950);
    // 输出如下：
    // 显示板显示：温度-31,湿度-30%,气压-950
    // 温度显示板：温度-31
    // 气压显示板：气压-950