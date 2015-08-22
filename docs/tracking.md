# トラッキング方法
## 概要
トラッキングは, サーバーサイドでGoogleアナリティクスに対してMeasurement Protocolを投げる方式で行う。
そのため, 取得できる情報は単純なトラフィックや利用しているサイト情報, ブラウザ情報など軽微なものとなる予定。

## 取得できる情報
- 呼び出されたスクリプト名
- 呼び出し元のIPアドレス
- ユーザーエジェント
- 呼び出し元ページのURL(リファラー)
- アプリケーションID
- ユーザーの言語

## マッピング

| No | 取得する項目 | Googleアナリティクスでの項目 |
|---:|:-----------|:---------|
| 1 | 呼び出されたスクリプト名 | pagepath |
| 2 | 呼び出し元のIPアドレス | user-ip, custom-dimension |
| 3 | ユーザーエージェント | useragent, custom-dimension |
| 4 | 呼び出し元ページのURL | referrer |
| 5 | アプリケーションID | hostname |
| 6 | ユーザーの言語 | language |

### ヘッダー情報
{
  'USER_IS_ADMIN': '0',
  'QUERY_STRING': '',
  'DEFAULT_VERSION_HOSTNAME': 'localhost:8080',
  'CURRENT_VERSION_ID': '1.632389169835116207',
  'wsgi.version': (1, 0),
  'wsgi.input': <cStringIO.StringI object at 0x10a33d828>,
  'wsgi.run_once': False,
  'DATACENTER': 'us1',
  'APPLICATION_ID': 'dev~power-analytics',
  'SERVER_PORT': '8080',
  'TZ': 'UTC',
  'SERVER_PROTOCOL': 'HTTP/1.1',
  'USER_EMAIL': '',
  'bottle.route': <GET '/plugin.js' <function plugin at 0x10a855230>>,
  'HTTP_USER_AGENT': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.125 Safari/537.36',
  'INSTANCE_ID': 'b62bed0d316a95cafaded81bab45dacdab01',
  'HTTP_ACCEPT': '*/*',
  'REQUEST_METHOD': 'GET',
  'HTTPS': 'off',
  'wsgi.multithread': True,
  'HTTP_X_APPENGINE_COUNTRY': 'ZZ',
  'USER_ID': '',
  'SCRIPT_NAME': '',
  'REQUEST_LOG_ID': 'd2ec0aa11025fe4b1dafacfa3d090492b6d59a5676ce4f4baca070975a6f8b2a4ed61b9f6cafe5bc6e',
  'SERVER_NAME': 'localhost',
  'HTTP_REFERER': 'http://10.211.55.7:3000/',
  'USER_ORGANIZATION': '',
  'HTTP_CACHE_CONTROL': 'max-age=0',
  'AUTH_DOMAIN': 'gmail.com',
  'HTTP_ACCEPT_LANGUAGE': 'ja,en-US;q=0.8,en;q=0.6',
  'HTTP_HOST': 'localhost:8080',
  'REQUEST_ID_HASH': 'EA4ADBB8',
  'route.handle': <GET '/plugin.js' <function plugin at 0x10a855230>>,
  'route.url_args': {},
  'REMOTE_ADDR': '::1',
  'bottle.app': <bottle.Bottle object at 0x10a871110>,
  'bottle.request': <LocalRequest: GET http://localhost:8080/plugin.js>,
  'wsgi.multiprocess': True,
  'USER_NICKNAME': '',
  'SERVER_SOFTWARE': 'Development/2.0',
  'CURRENT_MODULE_ID': 'default',
  'wsgi.url_scheme': 'http',
  'wsgi.errors': <google.appengine.api.logservice.logservice._LogsStreamBuffer object at 0x10a373c90>,
  'APPENGINE_RUNTIME': 'python27',
  'PATH_INFO': '/plugin.js',
  'PATH_TRANSLATED': '/Users/yamada/programing/power-analytics/main.py'
}
