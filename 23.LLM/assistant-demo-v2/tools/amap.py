""" 高德地图API

最终实现的功能是： 查询从起点origin到目的地destination的驾车的时间和距离，以便后续使用openai进行function call

具体步骤：
1. 通过调用 `搜索POI 2.0` API 获取起点和终点的经纬度及POI ID
2. 通过调用 `路径规划 2.0` API 获取起点和终点的驾车时间和距离

"""


import requests

# 高德地图API的key
key = '13a28686ab67431723702e7cfb56f9d2'


def get_poi_id(address):
    """ 通过调用 `搜索POI 2.0` API 获取起点和终点的经纬度及POI ID

    :param address: 起点或终点的地址
    :return: location, poi_id
    """
    # 构造请求参数
    params = {
        'key': key,
        'keywords': address,
    }

    # 发送请求
    response = requests.get('https://restapi.amap.com/v5/place/text?parameters', params=params)

    # 解析结果（经纬度及POI ID）
    location = response.json()['pois'][0]['location']
    poi_id = response.json()['pois'][0]['id']

    return location, poi_id


def get_distance_time(origin, destination):
    """ 获取驾驶距离和时间。
    通过调用 `路径规划 2.0` API 获取起点和终点的驾车时间和距离

    :param origin: 起点的地址
    :param destination: 终点的地址
    :return: 驾车时间(分钟)和距离(公里)
    """
    
    # 获取起点和终点的经纬度和POI ID
    origin_location, origin_id = get_poi_id(origin)
    destination_location, destination_id = get_poi_id(destination)

    # 构造请求参数
    params = {
        'key': key,
        'origin': origin_location,
        'destination': destination_location,
        'origin_id': origin_id,
        'destination_id': destination_id,
        'show_fields': 'cost',
    }

    # 发送请求
    response = requests.get('https://restapi.amap.com/v5/direction/driving?parameters', params=params)

    # 解析结果
    distance = response.json()['route']['paths'][0]['distance']
    time = response.json()['route']['paths'][0]['cost']['duration']

    return f'这段行程预计需要{round(int(time) / 60, 2)}分钟，距离{round(int(distance) / 1000, 2)}公里'


if __name__ == '__main__':
    origin = '厦门北站'
    destination = '厦门大学'

    distance, time = get_distance_time(origin, destination)
    print('驾车距离：', distance, '公里')
    print('驾车时间：', time, '分钟')
