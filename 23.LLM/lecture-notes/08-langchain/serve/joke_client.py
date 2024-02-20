from langserve import RemoteRunnable

joke_chain = RemoteRunnable("http://localhost:8080/joke/")

joke_chain.invoke({"topic": "小明"})