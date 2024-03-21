from dotenv import load_dotenv, find_dotenv
def loadenv():
  # 加载 .env 到环境变量
  _ = load_dotenv(find_dotenv())
