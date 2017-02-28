/**
 * @packet site.setting;
 */
$.overrideModule("data",{_doRequest:function(e,o){$.ajax(e).scope(this).then(function(e){e.code&&"1"===e.code?o.resolve(e.data):e.code&&"2"===e.code?this.dispatchEvent("openPage",{url:"login"}):o.reject(e)},function(e){o.reject(e)})}});