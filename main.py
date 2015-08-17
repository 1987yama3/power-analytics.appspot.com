from bottle import Bottle, template, response, request

bottle = Bottle()

# Note: We don't need to call run() since our application is embedded within
# the App Engine WSGI application server.


@bottle.route('/')
def hello():
    """Return a friendly HTTP greeting."""
    return 'Hello World!'

@bottle.route('/plugin.js')
def plugin():
    response.content_type = 'text/javascript; charset=utf-8'
    ipaddress = request.remote_addr
    return template('views/plugin', ipaddress = ipaddress)

@bottle.route('/plugin.min.js')
def plugin():
    response.content_type = 'text/javascript; charset=utf-8'
    ipaddress = request.remote_addr
    return template('views/plugin-min', ipaddress = ipaddress)


@bottle.error(404)
def error_404(error):
    """Return a custom 404 error."""
    return 'Sorry, nothing at this URL.'
