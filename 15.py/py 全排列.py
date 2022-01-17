# import itertools


# class Solution:
#     def permute(self, nums: list[int]) -> list[list[int]]:
#         return list(itertools.permutations(nums, 3))


# a = Solution()
# print(a.permute([1, 2, 3, 4]))


"""
方式二
"""


def Permutation(arr):
    res = []
    used = {}

    def dfs(path: list):
        if len(path) == 3:
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


print(Permutation([1, 2, 3, 4]))
