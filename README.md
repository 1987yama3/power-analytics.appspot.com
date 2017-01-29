# power-analytics.appspot.com

## Develop
### Environment
- Node.js
- Python2.7, Bottle Framework
- Google App Engine

### Install
```
$ git clone git@github.com:1987yama3/power-analytics.appspot.com.git
$ npm install -g gulp
$ npm install
```

### Build
```
$ gulp build
```

### Deploy
```
$ gulp deploy
```

## How to Use
```
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
 })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'INSERT TRACKING ID HERE', 'auto');
  ga('require', 'powerup');
  ga('powerup:dimensions', {
    'clientid': 1,
    'sessionid': 2,
    'timestamp': 3,
    'ipaddress': 4,
    'useragent': 5
  });
  ga('powerup:spamFilter', {
    'dimension': { 
      'index': 6, 
      'value': 'Referrer Spam Avoidance' 
    }
  });
  ga('powerup:source');
  ga('powerup:medium');
  ga('powerup:outbound');
  ga('powerup:tel');
  ga('powerup:youtube');
  ga('send', 'pageview');
</script>
<script type="text/javascript" async src="//power-analytics.appspot.com/plugin.min.js"></script>
```

