var FBInfo = {
accesstoken:null,
email:null,
firstname:null,	
lastname:null,
displayName:null,
friends:null
}
jQuery(document).ready(function($) {
	
	$(".headroom").headroom({
		"tolerance": 20,
		"offset": 50,
		"classes": {
			"initial": "animated",
			"pinned": "slideDown",
			"unpinned": "slideUp"
		}
	})
	$.ajaxSetup({ cache: true });
  	$.getScript('//connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId: '593715034101742',
      version: 'v2.4' // or v2.0, v2.1, v2.0
    });     
    //$('#facebookSign').removeAttr('disabled');
    //FB.getLoginStatus(updateStatusCallback);
  }); 	

});
window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
 
  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
 
  return t;
}
(document, "script", "twitter-wjs"));

