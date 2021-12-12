# print("Hello, World!")

# print ("你好，世界")

# # raw_input("按下 enter 键退出，其他任意键显示...\n")
# import sys;
# x = 'runoob'
# sys.stdout.write(x + '\n')

# counter = 100 # 赋值整型变量
# miles = 1000.0 # 浮点型
# name = "John" # 字符串
 
# print(counter)
# print(miles)
# print(name)


# num = 1
# while num < 11:
#   num += 1
#   if(num % 2):
#     print(num)
# print(2)


# import time  # 引入time模块
 
# ticks = time.time()
# print("当前时间戳为:", ticks)


# def d(str):
#   print(str)
#   return 999

# l = d(666) 
# print(l)

# f = lambda a,b: a + b

# print(f(2,3))


# l1 = [1,2,True,3,'sss',('a',2)]
# print(l1 * 3)
# print(l1)

# for x in l1[:]:
#   print(x)
  

# line = [1,2,3]
# print(type(str(line)))

# print(str(2.0))


# a = [['1','2'],'2']
# str1 = '2'
# for x in a: 
#   if(isinstance(x, list)):
#     str1 = str1 + ''.join(x)
#   else:
#     str1 = str1 + x

# print(str1)


# print(not 3>1)


# # help(list.index)

# # print([1,2,3].index(5))
# c = {'a':1}
# del c['a']
# try:
#   print(c['a'])
# except KeyError:
#   print(1)
# finally:
#   print('这句话，无论异常是否发生都会执行。')
  
# c = {'a':1}.keys()
# print(c)
# for x in c:
#   print(x)

#   print('{},{},{}'.format(1,2,3))

# class Dog:
#   pass

# a = Dog()
# ab = Dog()

# print(a == ab)

# print(type(a))

# def toLowerCase(str1:str):
#   str1 = str1.lower()
#   return str1

# print(toLowerCase('AASAS'))

# def reverseWords(s: str):
#     #Put you anwser here
#     a = list(s)
#     a.sort(reverse=True)
#     return ''.join(a)

# print(reverseWords('abc'))

def Permutation(arr):
    res = []
    used = {}
    def dfs(path:list):
        if len(path)==3:
            res.append(path[:])
            return 
        for x in arr:
          if(used.get(x, False)): 
              continue
          path.append(x)
          used[x] = True
          dfs(path)
          path.pop()
          del used[x]
    dfs([])
    return res

print(Permutation([1,2,3,4]))