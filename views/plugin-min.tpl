(function(){function c(a){this.tracker=a}function f(a){try{return a.split("/")[2]}catch(b){return""}}function g(a){for(var b="",d=0;d<a;d++)b+="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(Math.floor(62*Math.random()));return b}function h(){var a=new Date;return[a.getFullYear(),("0"+(a.getMonth()+1)).slice(-2),("0"+a.getDate()).slice(-2)].join("/")+" "+[("0"+a.getHours()).slice(-2),("0"+a.getMinutes()).slice(-2),("0"+a.getSeconds()).slice(-2),("00"+a.getMilliseconds()).slice(-3)].join(":")}
c.prototype.dimensions=function(a){var b=this.tracker.get("clientId");"undefined"!==typeof a.clientid&&this.tracker.set("dimension"+a.clientid,b);"undefined"!==typeof a.sessionid&&this.tracker.set("dimension"+a.sessionid,b+"#"+g(8));"undefined"!==typeof a.timestamp&&this.tracker.set("dimension"+a.timestamp,h());"undefined"!==typeof a.ipaddress&&this.tracker.set("dimension"+a.ipaddress,"{{ipaddress}}");"undefined"!==typeof a.useragent&&this.tracker.set("dimension"+a.useragent,navigator.userAgent)};
c.prototype.spamFilter=function(a){for(var b=document.referrer,d=a.dimension.value,c="100dollars-seo.com semaltmedia.com videos-for-your-business.com buttons-for-website.com success-seo.com video--production.com".split(" "),e=0;e<c.length;e++)0<=b.indexOf(c[e])&&(d="Spam Traffic");this.tracker.set("dimension"+a.dimension.index,d)};c.prototype.source=function(){if(!(0<=location.search.indexOf("utm_source"))){var a=f(document.referrer),b=void 0;a.match(/t\.co/)&&(b="twitter.com");a.match(/(m\.|l\.|lm\.)?facebook\.com/)&&
(b="facebook.com");"search.yahoo.co.jp"==a&&(b="yahoo");b&&this.tracker.set("campaignSource",b)}};c.prototype.medium=function(){if(!(0<=location.search.indexOf("utm_medium"))){var a=f(document.referrer),b=void 0;0<=a.indexOf("mail.yahoo.co.jp")&&(b="email");0<=a.indexOf("mail.live.com")&&(b="email");0<=a.indexOf("mail.google.com")&&(b="email");0<=a.indexOf("alpha-mail.ne.jp")&&(b="email");"email.excite.co.jp"==a&&(b="email");"outlook.office365.com"==a&&(b="email");"mail.ocn.ne.jp"==a&&(b="email");
"webmail.sso.biglobe.ne.jp"==a&&(b="email");"webmail.so-net.ne.jp"==a&&(b="email");"eowebmail.eonet.jp"==a&&(b="email");"mail.auone-net.jp"==a&&(b="email");"mail.goo.jp"==a&&(b="email");"mail.commufa.jp"==a&&(b="email");"webmail.cyberhome.ne.jp"==a&&(b="email");a.match(/mail[0-9]+.bizmail[0-9]+.com/)&&(b="email");"search.yahoo.co.jp"==a&&(b="organic");a.match(/t.co/)&&(b="social");0<=a.indexOf("t.co")&&4==a.length&&(b="social");a.match(/(m.|l.|lm.)?facebook\.com/)&&(b="social");"reader.livedoor.com"==
a&&(b="rss");"feedly.com"==a&&(b="rss");"feeds.feedburner.com"==a&&(b="rss");b&&this.tracker.set("campaignMedium",b)}};(function(a,b){var c=window[window.GoogleAnalyticsObject||"ga"];c&&c("provide",a,b)})("powerup",c)})();
