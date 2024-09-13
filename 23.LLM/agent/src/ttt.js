const request = require('request')


let all_list = "https://mp.toutiao.com/api/feed/mp_provider/v1/?provider_type=mp_provider&aid=13&app_name=news_article&category=mp_all&channel=&stream_api_version=88&genre_type_switch=%7B%22repost%22%3A1%2C%22small_video%22%3A1%2C%22toutiao_graphic%22%3A1%2C%22weitoutiao%22%3A1%2C%22xigua_video%22%3A1%7D&device_platform=pc&platform_id=0&visited_uid=2623880180803079&offset=0&count=10&keyword=&client_extra_params=%7B%22category%22%3A%22mp_all%22%2C%22real_app_id%22%3A%221231%22%2C%22need_forward%22%3A%22true%22%2C%22offset_mode%22%3A%221%22%2C%22page_index%22%3A%221%22%2C%22status%22%3A%228%22%2C%22source%22%3A%220%22%7D&app_id=1231"

let a_list = "https://mp.toutiao.com/mp/agw/creator_center/draft_list?type=0&count=20&app_id=1231"


request({
  'method': 'GET',
  'url': all_list,
  'headers': {
    'Content-Type': 'application/json;charset=utf-8',
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "cookie": "tt_webid=7357988997996578340; _ga=GA1.1.508906892.1713165329; passport_csrf_token=4b4f516b8e9f91f08bde5deeb819a59a; passport_csrf_token_default=4b4f516b8e9f91f08bde5deeb819a59a; d_ticket=790431032a69ac59602cc6e6fb22a3c30ec98; n_mh=jWZhTL39wHlgBCSy4hAs8DHKk7p1Zz6NyL9ej3kfjbQ; sso_auth_status=a7892edb94f1a091ea8a82755794d7a7; sso_auth_status_ss=a7892edb94f1a091ea8a82755794d7a7; sso_uid_tt=b395b5b65c53e3dbc6359e95a8b3bfa9; sso_uid_tt_ss=b395b5b65c53e3dbc6359e95a8b3bfa9; toutiao_sso_user=ff7644d285426317d4dd18f03f8c9748; toutiao_sso_user_ss=ff7644d285426317d4dd18f03f8c9748; sid_ucp_sso_v1=1.0.0-KDAzMGNlNWJkZjEyNjY3MzNkMzhjODhkZDBjNDEzN2VmMzE4MTZlZmQKHgiHzPCw-8zUBBDm24q3BhgYIAww5sPtowY4AkDxBxoCaGwiIGZmNzY0NGQyODU0MjYzMTdkNGRkMThmMDNmOGM5NzQ4; ssid_ucp_sso_v1=1.0.0-KDAzMGNlNWJkZjEyNjY3MzNkMzhjODhkZDBjNDEzN2VmMzE4MTZlZmQKHgiHzPCw-8zUBBDm24q3BhgYIAww5sPtowY4AkDxBxoCaGwiIGZmNzY0NGQyODU0MjYzMTdkNGRkMThmMDNmOGM5NzQ4; passport_auth_status=ef09dc7dd9d698541873269f207c37d1%2C236839fae17eca1b59790d87fbd4bbe4; passport_auth_status_ss=ef09dc7dd9d698541873269f207c37d1%2C236839fae17eca1b59790d87fbd4bbe4; sid_guard=1de764dc1b1bfa0d5a02bf3457505c48%7C1726131686%7C5184002%7CMon%2C+11-Nov-2024+09%3A01%3A28+GMT; uid_tt=87eb934a9bbe112cbc7cf4884bb908c9; uid_tt_ss=87eb934a9bbe112cbc7cf4884bb908c9; sid_tt=1de764dc1b1bfa0d5a02bf3457505c48; sessionid=1de764dc1b1bfa0d5a02bf3457505c48; sessionid_ss=1de764dc1b1bfa0d5a02bf3457505c48; is_staff_user=false; sid_ucp_v1=1.0.0-KDZkZmY5YmFlZWNiNTE1MzNhMmU5MDQxZjJhMWYyMmNjMTE2ODM2MGUKGAiHzPCw-8zUBBDm24q3BhgYIAw4AkDxBxoCbGYiIDFkZTc2NGRjMWIxYmZhMGQ1YTAyYmYzNDU3NTA1YzQ4; ssid_ucp_v1=1.0.0-KDZkZmY5YmFlZWNiNTE1MzNhMmU5MDQxZjJhMWYyMmNjMTE2ODM2MGUKGAiHzPCw-8zUBBDm24q3BhgYIAw4AkDxBxoCbGYiIDFkZTc2NGRjMWIxYmZhMGQ1YTAyYmYzNDU3NTA1YzQ4; store-region=cn-sd; store-region-src=uid; odin_tt=d564707fe0334670f223d9bc70b46cb90eedd886d93121c45046631d812d16691e0918fcf599ae582823084ee7e9e318; gfkadpd=1231,25897; ttcid=522977f282244123b334747c9d2971cc22; ttwid=1%7CwaxFS8MimeGuqCFOoCUSATjmcnkDkhMyAjNC-vC3ox4%7C1726215234%7C0c001a4d3c41d46f08f040945115bc9523e5fe644a84b7f073a80c8536cb3a15; s_v_web_id=bcfd5fe4ca786ab0e43ce003b279b24c; csrf_session_id=9b03006e26d1b71136605ce1a84d82bd; _ga_QEHZPBE5HH=GS1.1.1726215089.6.1.1726215465.0.0.0; xigua_csrf_token=ZRyEmTbAHbCXqKl6vEpbPS7H; xg_p_tos_token=8a5758e1fcb1d8ac90e90bfcd093ca95; tt_scid=I1hGVM-Dsn7WePb2dBCjPiMn0VxfW.6DuEKk0Xc-4RveGPgJt7fS4tPQXlLRlkK307fa"
  },
}, function (error, response) {
  if (error) reject(error);
  let res = JSON.parse(response.body)
  console.log(res)
});
