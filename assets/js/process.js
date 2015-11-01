var userInfo = {
	resourceProvider:null,
	accesstoken:null,
	id:null,
	name: null,
	email:null,
	first_name:null,
	last_name:null,
	gender:null,
	app_id:null,
	timezone:null,
	picURL:null,
	link:null	

}

var googleUser = {};
	var nameGood,emailGood,messageGood;
	var Message = {
		name: null,
		email:null,
		phone:null,
		message:null
	}
	var signedIn = false;
	var flashLoaded=false;
  	var fields = ['id','name','first_name','middle_name','last_name','gender','locale','languages','link','third_party_id','installed','timezone','updated_time','verified','age_range','bio','birthday','cover','currency','devices','education','email','hometown','interested_in','location','political','payment_pricepoints','favorite_athletes','favorite_teams','picture','quotes','relationship_status','religion','significant_other','video_upload_limits', 'website','work'].join(',');
	var isFB = false;
	var isGoogle = false;
	var isTwitter = false;
	var isGoogle = false;
	//var appID = '593715034101742'; 
	var appID = '769911633136073';
  	var remembering;
  	var xmlhttp;
  	var referer='none';
	var isEdge;
function setName(name){
	var image = new Image();
	image.src = sessionStorage.avatar;
	image.onload = function() {	
   	 $("#profilePic").attr("src",sessionStorage.avatar);
	 delete image;
	};	
	$('#login_Button_Nav').html(name);
	$('#login_Button_Nav').attr("data-toggle","tooltip");
	$('#login_Button_Nav').attr("title","Logout");
	$('#login_Button_Nav').attr("data-placement","bottom");
	signedIn = true;	
	$('.navbar-toggle').trigger('click');
	
}
function setPageID(page){
	console.log("pageID set from HTML");
	pageID = page;
}
function setTwitterUser(screenname,avatar){
console.log("TWITTER SIGNED IN CORRECTLY");
    $("#myModal").modal('hide');
signedIn = true;
	userInfo.name = screenname;
	userInfo.email = 'default@twitter.com';
	userInfo.picURL =avatar;
	console.log(avatar);
	//userInfo.id = data.id;
	userInfo.resourceProvider = "Twitter";
	setName("Signed in: " +screenname);
	sessionStorage.setItem("user",screenname) ;
	sessionStorage.setItem("email","default@twitter.com") ;
	sessionStorage.setItem("avatar",avatar) ;
	serverCall('loginUser&userInfo='+JSON.stringify(userInfo)+'&picUrl='+avatar+'&link='+avatar,'loginUser');
	
	setTimeout(createGame,1000);
}
function consoleMessage(string){
	console.log("Message is: "+string);
}
function logout(){	
	if(signedIn)
	{
		$('#login_Button_Nav').html("LOG IN");
		$('#login_Button_Nav').attr("data-toggle","tooltip");
		$('#login_Button_Nav').attr("title","Login to TeemalGames");
		$('#login_Button_Nav').attr("data-placement","bottom");
		serverCall("logoutUser&email="+sessionStorage.email,"logoutUser");
		sessionStorage.user = "GUEST";
		sessionStorage.setItem("email","default@teemalgames.com");
		sessionStorage.setItem("avatar","assets/images/genericpic.jpg");
		$("#profilePic").attr("src","assets/images/genericpic.jpg");
		signedIn = false;
 $.post("../logout.php",{},
    function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
if(pageID=="flash"){
createGame();
}
    });
	}	
	
}
function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // IE 12 => return version number
	    isEdge=true;
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);	  
    }// other browser
    return false;
}
function onSuccess(data) {		
	$("#myModal").modal('hide');
	userInfo.name = data.firstName+" "+data.lastName;
	userInfo.first_name =  data.firstName;
	userInfo.last_name = data.lastName;
	userInfo.email = data.emailAddress;
	userInfo.picURL =data.pictureUrl;
	userInfo.link = data.publicProfileUrl;
	console.log(data.pictureUrl);
	userInfo.id = data.id;
	userInfo.resourceProvider = "LinkedIn";
	setName("Signed in: " +userInfo.name);
	sessionStorage.setItem("user",userInfo.name) ;
	sessionStorage.setItem("email",userInfo.email) ;
	sessionStorage.setItem("avatar",userInfo.picURL) ;
	serverCall('loginUser&userInfo='+JSON.stringify(userInfo)+'&picUrl='+data.pictureUrl+'&link='+data.publicProfileUrl,'loginUser');
	
	setTimeout(createGame,1000);
}

function onLinkedInLoad() {
        IN.Event.on(IN, "auth", getProfileData);
    }
	function liAuth(){
  	   IN.User.authorize(function(){
       getProfileData();
	   
   });
}
// Use the API call wrapper to request the member's basic profile data
function getProfileData() {
   IN.API.Raw("/people/~:(id,first-name,last-name,industry,email-address,picture-url,public-profile-url)").result(onSuccess).error(onError);
}

function onError(error) {
    console.log(error);
}

function triggerSignIn(){
	$('#login_Button_Nav').trigger('click');
}
//FACEBOOK FUNCTIONS
function Login() {
FB.login(
function(response) 
{
  if (response.status === 'connected') {
    userInfo.accesstoken = response.authResponse.accessToken;
	processDetails() 
  } else if (response.status === 'not_authorized') {
   console.log('The person is logged into Facebook, but not your app')
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
  }

},{scope: 'public_profile,email,user_friends'}
);
}
function processDetails() {
    FB.api('/me', {fields: fields}, function(details) {
	  userInfo.resourceProvider = "facebook";
      userInfo.app_id = appID;
	  userInfo.email = details.email;
	  userInfo.first_name = details.first_name;
	  userInfo.last_name = details.last_name;
	  userInfo.name = details.name;
	  userInfo.id = details.id;
	  userInfo.gender = details.gender;
	  userInfo.link = details.link;
	  userInfo.timezone = details.timezone;
	  userInfo.picURL="http://graph.facebook.com/"+userInfo.id+"/picture";
	  isFB = true;
	  signedIn = true;
	  sessionStorage.setItem("user",userInfo.name);
	  sessionStorage.setItem("email",userInfo.email) ;
	  sessionStorage.setItem("avatar",userInfo.picURL) ;
      setName("Signed in: " +userInfo.name);
	  $("#myModal").modal('hide');
	  serverCall('loginUser&userInfo='+JSON.stringify(userInfo),'loginUser');
    });
  }
//LINKED IN FUNCTIONS
function callbackFunction(user){
	console.log('user name = '+user.name);
}
	
  $('#facebookSign').click(function(e){
		e.preventDefault();
		//console.log("LOGGING IN HERE");
		Login();
	});

  $('#gpfn').focus(function(e){$(this).attr("value","")});
  $('#gpp2').focus(function(e){$(this).attr("value","")});
  $('#gpp').focus(function(e){$(this).attr("value","")});
  $('#gpln').focus(function(e){$(this).attr("value","")});
  $('#rememberMe').click(function(e)
	{
		if(!remembering){remembering=true;}
		else{remembering=false;}
	});
//FLASH-GAME.HTML STUFF	
function removeGame(){
	console.log("REMOVING GAME");
		swfobject.removeSWF("cricketPoker");
		flashLoaded=false;
}
$('#twitterSign').click(function(e){e.preventDefault();	closeModal();LoginTwitter();});
$('#yahooSign').click(function(e){e.preventDefault();	closeModal();LoginYahoo();});
function LoginTwitter(){
 console.log("LOGGING IN HERE WITH TWITTER");
window.location="process.php";

}
function LoginYahoo(){
 console.log("LOGGING IN HERE WITH YAHOO");
window.location="yprocess.php";

}
function createGame()
{
	removeGame();
  if(!flashLoaded){
  var c = document.getElementById("cricketPokerGame");
  if (!c) {
	var d = document.createElement("div");
	d.setAttribute("id", "cricketPokerGame");
	document.getElementById("flashRow").appendChild(d);
}
	console.log("CREATING Flash Movie...");
	var flashvars = {};
	flashvars.name = sessionStorage.user;
	flashvars.avatar = sessionStorage.avatar;	
	flashvars.playerID = sessionStorage.email;
	var params = {};
	params.play = "true";
	params.menu = "false";
	params.scale = "noscale";
	params.salign = "tl";
	params.wmode = "gpu";
	params.devicefont = "false";
	params.swliveconnect = "true";
	params.allowfullscreen = "true";
	params.allowscriptaccess = "sameDomain";
	var attributes = {};
	attributes.id = "cricketPoker";
	attributes.name = "flashContent";
	attributes.styleclass = "flashContent";
	attributes.align = "left";
	// ,,function(e){$("body").attr("style","background: #000 url(assets/images/cricketpokerback.jpg) center center repeat-y;-moz-background-size: cover;background-size: cover;"); console.log("Style adjusted")};
	swfobject.embedSWF("cricketPoker.swf", "cricketPokerGame", "680", "680", "18.0.0", "expressInstall.swf", flashvars, params, attributes);
		}
	}
	// Check if a new cache is available on page load.
window.addEventListener('load', function(e) {

  window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      // Browser downloaded a new app cache.
      // Swap it in and reload the page to get the new hotness.
      window.applicationCache.swapCache();
      if (confirm('A new version of this site is available. Load it?')) {
        window.location.reload();
      }
    } else {
      // Manifest didn't changed. Nothing new to server.
    }
  }, false);

}, false);
function getJsonFromUrl() {
  var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}
$(document).ready(function(e) {
	var urlStringJSON =  getJsonFromUrl();
        if(urlStringJSON.oauth_token!=null||urlStringJSON.oauth_token!=undefined){}
	detectIE();
	if (window.sessionStorage)
	{
		var user = sessionStorage.user;
		var avatar =  sessionStorage.avatar;
		console.log("Now loaded and user is "+ user);
		if(user=='null'||typeof user == 'undefined'||user=='Guest'||user=='GUEST'||avatar=='null'||typeof avatar == 'undefined')
		{
			sessionStorage.user = "GUEST";
			sessionStorage.avatar = "assets/images/genericpic.jpg";
			$('#login_Button_Nav').html("LOG IN");
			$('#login_Button_Nav').attr("data-toggle","tooltip");
			$('#login_Button_Nav').attr("title","Login to TeemalGames");
			$('#login_Button_Nav').attr("data-placement","bottom");
			$("#profilePic").attr("src","assets/images/genericpic.jpg");
			signedIn = false;
		}
		else
		{
			setName("Signed in: " +user);
		 	signedIn = true;
		}
	}
	else
	{
		//console.log("SESSION STORAGE IS NOT SUPPORTED");
	}
	if(pageID=="flash"){
		
		if(!signedIn){
			$("#myModal").modal('show')
		}
		else
		{
			createGame();
		}
		/*$("#chatbox").chatbox({id : "chat_div",
                                  title : "Live Comments",
                                  user : sessionStorage.user,
                                  offset: 200,
                                  messageSent: function(id, user, msg){
                                       console.log("DOM " + user+ " just typed in " + msg);
                                  }});
          // to insert a message
          $("#chatbox").chatbox("option", "boxManager").addMsg("Type a message", "Barrr!");*/
		}
	
	scrollToBottom();
	$("#playbtn").click(function(e){
		e.preventDefault();
		window.location="cricketpoker_game.html?#flashContent";
	});
	
	//Contact.html STUFF
	$("#contactForm").validate();
    $("#messageBtn").click(function(event)
	{
		//console.log("This fired");
		var captcha_challenge = $('#recaptcha_challenge_field').val();		
		var captcha_response;
      	event.preventDefault();
	    if($('#recaptcha_response_field').val().length>1)
		{
			captcha_response = $('#recaptcha_response_field').val();
	 	}
		 else{
		 	alert("You're not a robot are you? Fill in the captcha and prove it.");
		 	return;
		 }
	  	 if($('#Phone').val().length>1)
		 {
			Message.phone=$('#Phone').val()
	 	}
     	if($('#Name').val().length>1)
		{
			Message.name=$('#Name').val()
			nameGood = true;
		}
	 	else
		{
		 alert('Please provide your name.');
		 $('#Name').focus();
		 return;
	 	}
	 	var emailraw = $('#Email').val();
	 	emailGood = emailraw.search('.com');
	 	if($('#Email').val().length>1&&emailGood>-1){
			Message.email=$('#Email').val()
	 	}
	 	else
	 	{
		 alert('Please provide a Valid Email Address.');
		 $('#Email').focus();
		  return;
	 	}
		if($('#Message').val().length>40)
		{
			var messageRaw =$('#Message').val();
			messageRaw.toLowerCase()
			if(messageRaw.search('fuck')==-1&&messageRaw.search('cunt')==-1&&messageRaw.search('asshole')==-1)
			{
				Message.message = messageRaw;
				messageGood=true;
			}
			else
			{
		 		alert('The use of Profanity is prohibitted.');
		 		$('#Message').focus();
			 	return;
	 		}
	 	}
	 
	 	else
		{
		 	alert('Your Message Should be At Least 50 Characters Long');
		 	$('#Message').focus();
		  	return;
	 	}
	 if(emailGood&&nameGood&&messageGood)serverCall("contactMessage&contactMessage="+JSON.stringify(Message)+"&recaptcha_challenge_field="+captcha_challenge+"&recaptcha_response_field="+captcha_response,"contactMessage");
    });
	
	
	if(isEdge){
		$('#myModal .modal-body').html('<p><div id="socialSign"><a class="btn btn-block btn-social btn-facebook" id="facebookSign"><i class="fa fa-facebook"></i >Facebook</a><a class="btn btn-block btn-social btn-linkedin" id="linkedInSign"><i class="fa fa-linkedin"></i>LinkedIn</a></div></p> ');
	}
	$('#login_Button_Nav').click(function(){if(!signedIn){$("#myModal").modal('show');}else{logout();}});
	//LINKEDIN STUFF
	$('#linkedInSign').click(function(){liAuth();});	
	//FACEBOOK STUFF	
  	(function(d, s, id) {
 	var js, fjs = d.getElementsByTagName(s)[0];
 	if (d.getElementById(id)) return;
  	js = d.createElement(s); js.id = id;
  	js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId="+appID;
  	fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));	
	
  	//TWITTER STUFF
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
 	//GOOGLE STUFF
	//GOOGLE FUNCTINOS
var startApp =function() 
	{ 
		gapi.load('auth2', function()
		{
			// Retrieve the singleton for the GoogleAuth library and set up the client.
      		auth2 = gapi.auth2.init({
       		//client_id: '208524627886-9q9ek6450chbi5mf8jfa08ofvtjjavjd.apps.googleusercontent.com',
			//client_id: '645301586724-rehutmeog2brik34tm2le9s4608rbpf7.apps.googleusercontent.com',
                client_id:'931886107381-pusu04f2v66e9abkun9e83qpus104guv.apps.googleusercontent.com',
       		cookiepolicy: 'single_host_origin'
       		// Request scopes in addition to 'profile' and 'email'
       		//scope: 'additional_scope'
      });
	if(!isEdge){attachSignin(document.getElementById('googleSign'));}
    });
  };
	
  function attachSignin(element) {
    //console.log(element.id);
    auth2.attachClickHandler(element, {},
        function(googleUser) {
			var user = googleUser.getBasicProfile().getName();
			setName("Signed in: " +user);
			$("#myModal").modal('hide');
			isGoogle = true;
			userInfo.resourceProvider = "google";
			userInfo.name = googleUser.getBasicProfile().getName();
			var nameArr =  userInfo.name.split(" ");
			userInfo.first_name = nameArr[0];
			userInfo.last_name = nameArr[1];
			userInfo.email= googleUser.getBasicProfile().getEmail();
			userInfo.picUrl=  googleUser.getBasicProfile().getImageUrl();
			sessionStorage.setItem("user",user) ;
			sessionStorage.setItem("email",userInfo.email) ;
			sessionStorage.setItem("avatar",userInfo.picUrl) ;
			console.log("AVATAR= "+sessionStorage.avatar);
			serverCall('loginUser&userInfo='+JSON.stringify(userInfo),'loginUser');
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }	
	startApp();
//endOf DOCUMENT READY 
});

function closeModal(){		
	$("#myModal").modal('hide');
	if(userInfo.name===null){
		alert("Warning: Your Game data will NOT be saved until you log in");
	}
	if(pageID=="flash"){
		createGame();
	}
}

function scrollToBottom() {
	//console.log("scrolling to flashcontent");
   $('#flashContent').scrollTop(50);
}
//MAIN SERVER COMMUNICATION 
function serverCall(code,type,ref)
{
	//console.log(code);
	this.referer = ref;
	if (window.XMLHttpRequest)
  	{// code for IE7+, Firefox, Chrome, Opera, Safari
		//alert('Chrome');
  		xmlhttp=new XMLHttpRequest();
  	}
	else
  	{// code for IE6, IE5
		//alert('Internet Explorer');
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
	xmlhttp.onreadystatechange=function()
  	{	
  	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
  	  {//onsole.log(xmlhttp.responseText);
		var resp = jQuery.parseJSON(xmlhttp.responseText)	
		//console.log(resp);
	  	switch (type)
		{
			case 'checkEmail':	
			if(resp.isOK==true){
				if(isFB){serverCall('addUser&userInfo='+JSON.stringify(userInfo),'addUser')};
				if(isGoogle){serverCall('addUser&userInfo='+JSON.stringify(userInfo),'addUser')};
			}
			else
			{
				if(resp.reason=="EMAIL_EXISTS"){
					//console.log(resp.reason);
					if(isFB){serverCall('loginUser&userInfo='+JSON.stringify(userInfo),'loginUser')};
					if(isGoogle){serverCall('loginUser&userInfo='+JSON.stringify(userInfo),'loginUser')};
				}
			}
			break;
			case 'addUser':
			if(resp.success==true)
			{
				console.log("USER ADDED SUCCESSFULLY");
				//window.location = "/"
			}
			else
			{
				console.log(resp.reason);
			}
			break;
			case 'loginUser':
			if(resp.success==true)
			{
				console.log("USER LOGGED IN SUCCESSFULLY");
				//window.location = "/";
			}
			else
			{
				console.log(resp.reason);
			}
			break;
			case 'contactMessage':
			if(resp.success==true)
			{
				$('#cmDiag').modal('show');
				$('#contactForm')[0].reset();
				//window.location = "/";
			}
			else
			{
				console.log(resp.reason);
			}
			break;
		}
	  }
	}
	switch(type)
	{
		case 'checkStatus':
		//$.mobile.loading('show',{text: 'checking Status...'});
		break;
		case 'eventStats':
		//$.mobile.loading('show',{text: 'loading Stats...'});
		break;
		default:
		break;
	}
	console.dir("?gameCode="+encodeURI(code))
	//$.mobile.loading('show');
	//xmlhttp.open("GET","http://teemalgames.com/_junk.php?gameCode="+encodeURI(code),true);
	if(type=="contactMessage")
	{
		xmlhttp.open("POST","http://teemalgames.com/_junk.php?gameCode="+encodeURI(code),true);
		console.log("sending mail to remote host");	
	}else
	{
		xmlhttp.open("GET","../_junk.php?gameCode="+encodeURI(code),true);
	}
	xmlhttp.send();
	//$.post('configure.php',{"requestCode" : code, "bc" : bc , 
}

