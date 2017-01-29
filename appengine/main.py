from bottle import Bottle, template, response, request
from vendor.UniversalAnalytics import Tracker

bottle = Bottle()

# Note: We don't need to call run() since our application is embedded within
# the App Engine WSGI application server.

def tracking(request, response):
    tracker = Tracker.create('UA-66588706-2', use_post = True, client_id = request.get_cookie('_ga'), user_agent = request.environ.get('HTTP_USER_AGENT'))
    tracker.set('dimension3', request.get_cookie('_ga'))
    tracker.set('path', request.environ.get('PATH_INFO'))
    tracker.set('user-ip', request.remote_addr)
    tracker.set('dimension1', request.remote_addr)
    tracker.set('ua', request.environ.get('HTTP_USER_AGENT'))
    tracker.set('dimension2', request.environ.get('HTTP_USER_AGENT'))
    tracker.set('referrer', request.environ.get('HTTP_REFERER'))
    tracker.set('hostname', request.environ.get('APPLICATION_ID'))

    if request.environ.get('HTTP_ACCEPT_LANGUAGE') != None:
        language = request.environ.get('HTTP_ACCEPT_LANGUAGE').split(',')[0]
        tracker.set('ul', language)
    if request.get_cookie('_ga') is None:
        response.set_cookie('_ga', tracker.params.get('cid'))
    tracker.send('pageview')

@bottle.route('/')
def hello():
    """Return a friendly HTTP greeting."""
    tracking(request, response)
    return 'Hello World!'

@bottle.route('/plugin.js')
def plugin():
    response.content_type = 'text/javascript; charset=utf-8'
    ipaddress = request.remote_addr
    tracking(request, response)
    return template('views/plugin', ipaddress = ipaddress)

@bottle.route('/plugin.min.js')
def plugin():
    response.content_type = 'text/javascript; charset=utf-8'
    ipaddress = request.remote_addr
    tracking(request, response)
    return template('views/plugin-min', ipaddress = ipaddress)


@bottle.error(404)
def error_404(error):
    """Return a custom 404 error."""
    return 'Sorry, nothing at this URL.'
