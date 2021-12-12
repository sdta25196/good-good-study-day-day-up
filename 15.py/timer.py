import threading

def t(c):
  print('hello',c)

timer = threading.Timer(3,t,args=(2,))
timer.start()


tup = (1,True,'22')

for x in tup:
    print(x)