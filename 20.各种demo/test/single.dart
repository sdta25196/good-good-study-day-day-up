main() {
  Manager manage = new Manager();
  Manager manage1 = new Manager();
  print(manage == manage1);
  Logger log = Logger("a");
  Logger log1 = Logger("a");
  print(log == log1);
}

class Manager {
  // 工厂模式
  factory Manager() => _getInstance();
  static Manager get instance => _getInstance();
  static Manager _instance;
  Manager._internal() {
    // 初始化
    print("初始化i");
  }
  static Manager _getInstance() {
    if (_instance == null) {
      _instance = new Manager._internal();
    }
    return _instance;
  }
}

class Logger {
  final String name;
  bool mute = false;

  // 从命名的 _ 可以知，
  // _cache 是私有属性。
  static final Map<String, Logger> _cache = <String, Logger>{};

  factory Logger(String name) {
    if (_cache.containsKey(name)) {
      return _cache[name];
    } else {
      final logger = Logger._internal(name);
      _cache[name] = logger;
      return logger;
    }
  }

  Logger._internal(this.name);

  void log(String msg) {
    if (!mute) print(msg);
  }
}
