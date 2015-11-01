<?php
//start session
session_start();
//session_destroy();
//just simple session reset on logout click
if($_GET["reset"]==1)
{
	session_destroy();
	header('Location: ./index.php');
}

// Include config file and twitter PHP Library by Abraham Williams (abraham@abrah.am)
include_once("config.php");
include_once("inc/twitteroauth.php");

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
    <meta property="og:title" content="Cricket Poker&trade;" />
    <meta property="og:site_name" content="TeemalGames: Cricket Poker&trade;"/>
    <meta property="og:url" content="http://cricketpoker.teemalgames.com" />
    <meta property="og:description" content="Play CricketPoker&trade; for Free! If you like poker but find it hard remembering which hand beats which, then CricketPoker™ is the game for you! Absolutely no previous experience is necessary to play this fun game with a cricket spin (pun intended). " />
	<meta property="fb:app_id" content="769911633136073" />
	<meta property="og:type" content="game" />
	<meta property="og:image"  content="http://cricketpoker.teemalgames.com/screenshots/cricketpoker.JPG" />
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />	
	<meta name="viewport"    content="width=device-width, initial-scale=1.0">
	<meta name="description" content="If you like poker but cannot be bothered to learn which hand beats which, then CricketPoker&trade; is the game for you! Absolutely no previous experience is necessary to play this fun game with a cricket spin (pun intended).">
	<meta name="author" content="Richard_Teemal@teemalgames.com">
	
	<title>CricketPoker&trade;</title>

	<link rel="shortcut icon" href="assets/images/favicon.png">
	<link rel="stylesheet" media="screen" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="assets/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/css/font-awesome.min.css">

	<!-- Custom styles for our template -->
	<link rel="stylesheet" href="assets/css/bootstrap-theme.css" media="screen" >
    <link rel="stylesheet" href="assets/css/bootstrap-social.css">
     <link rel="stylesheet" href="assets/css/jquery-ui.min.css">
    <!--<link rel="stylesheet" href="assets/css/jquery.ui.chatbox.css">-->
	<link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/cricketPoker.css">
    <script src="swfobject.js"></script>
	<script src="//platform.linkedin.com/in.js" type="text/javascript">
	api_key: 78zyeqdfkm9v2j
	lang: en_US
	onLoad: onLinkedInLoad
	
    </script>
    <script type="text/javascript">
	pageID = "flash";
	</script>
	<script type="text/javascript">var switchTo5x=true;</script>
<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
<script type="text/javascript" src="http://s.sharethis.com/loader.js"></script>


	<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
	<script src="assets/js/html5shiv.js"></script>
	<script src="assets/js/respond.min.js"></script>
	<![endif]-->

</head>

<body>
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '769911633136073',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>


<div id="cricketPokerBackgound">

	<!-- Fixed navbar -->
	<div id="head" class="navbar navbar-inverse navbar-static-top secondary" >
		<div class="container">
			<div class="navbar-header">
				<!-- Button for smallest screens -->
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
				<a class="navbar-brand" href="http://teemalgames.com/"><img src="assets/images/logo.png" alt="TeemalGames Logo"></a>
			</div>
			<div class="navbar-collapse collapse" style="top:50%;">
				<ul class="nav navbar-nav pull-right">
                                        <li  class="active"><a href="/">Featured Game</a></li>
					<li><a href="http://teemalgames.com/">Home</a></li>
					<li><a href="http://teemalgames.com/about.html">About</a></li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">Other Games <b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li class="active"><a href="#">Flash</a></li>                            	
							<li class="active"><a href="#">HTML Canvas</a></li>
                            <li class="active"><a href="#">Unity3D</a></li>
                            <li class="active"><a href="#">Mobile</a></li>
						</ul>
					</li>
					<li><a href="http://teemalgames.com/contact.php">Contact</a></li>
					<li><a class="btn"  id="login_Button_Nav" data-toggle="tooltip" title="Login to TeemalGames" data-placement="bottom">LOG IN</a></li>
                    <li><img class="profile-image img-circle" id="profilePic" src="assets/images/genericpic.jpg"></li>
				</ul>
			</div><!--/.nav-collapse -->
		</div>
	</div> 
    <br>
	<!-- /.navbar -->

	

	<!-- container -->
	
		<div class="container maincontent"> 

<div class="row">
          <div id="adsense" style ="margin-left:0px;"><script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            <!-- LeaderBoard -->
            <ins class="adsbygoogle"
                 style="display:inline-block;width:728px;height:90px"
                 data-ad-client="ca-pub-3296624733221595"
                 data-ad-slot="1357512666"></ins>
            <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
         </div>
</div>
             <ol class="breadcrumb">
				<li><a href="../">Home</a></li>
            	<br>
				<li class="active">CricketPoker<sup>TM</sup> Game Page</li>
			</ol> 
<div id = "twitterAuth">

</div>  
		<div class="row" id="flashRow"> 
        	<br>
			    
        	<div class="col-md-8" id="cricketPokerGame"><a href="http://www.adobe.com/go/getflashplayer"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player"></a>
        	</div>

             <div class="col-md-4 pull-right" id="twitterFeed">
<div class="row" id="Soc-buttons" style="margin-left:45%;" >
			  <div><a class="fb-like" style ="bottom:5px;"  data-href="http://cricketpoker.teemalgames.com" data-layout="button" data-share="true" data-action="like" a-show-faces="false"></a>
<a class="g-plusone" data-size="standard" data-href="http://cricketpoker.teemalgames.com" data-annotation="none"></a>			
<script type="IN/Share" data-url="http://cricketpoker.teemalgames.com" ></script></div>			
		</div>
             <a class="twitter-timeline" href="https://twitter.com/TeemalGames" data-widget-id="658993635204177920" data-chrome="nofooter">Tweets by @TeemalGames</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
         <a href="https://twitter.com/intent/tweet?screen_name=TeemalGames&text=%23cricketpoker" class="twitter-mention-button" data-size="large" data-related="TeemalGames">Tweet to MEEE @TeemalGames</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
			</div>
			<!-- /Article -->
        	</div>
            <br>
            <div class="row">
          <div id="adsense"><script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            <!-- LeaderBoard -->
            <ins class="adsbygoogle"
                 style="display:inline-block;width:728px;height:90px"
                 data-ad-client="ca-pub-3296624733221595"
                 data-ad-slot="1357512666"></ins>
            <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
         </div>
           
          </div> 
       </div>
       
  		
	<footer id="footer" class="top-space">

		<div class="footer1">
			<div class="container">
				<div class="row">
					
					<div class="col-md-3 widget">
						<h3 class="widget-title">Contact</h3>
						<div class="widget-body">
							
								<a href="mailto:#">webmaster@teemalgames.com</a><br>
								<br>
								32 Plumbago Circular, Chaguanas, Trinidad and Tobago.
						  </p>	
						</div>
					</div>
					
					<div class="col-md-offset-10  widget">
					  <h3 class="widget-title">Follow Us</h3>
					  <div class="widget-body">
							<p class="follow-me-icons">
                           
                            	<a href="https://twitter.com/TeemalGames" class="twitter-follow-button" data-show-count="true" data-size="small">Follow @TeemalGames</a>
								<div class="g-follow" data-annotation="bubble" data-height="20" data-href="//plus.google.com/u/0/100593637068605541617" data-rel="publisher"></div>
                            	<div>  <script type="IN/FollowCompany" data-id="10115877" data-counter="right"></script></div>
                                <div class="fb-follow" data-href="https://www.facebook.com/pages/Teemal-Games/1475524446075582" data-width="50" data-layout="button_count" data-show-faces="false"></div>
								
							</p>	
						</div>
					</div>
				</div> <!-- /row of widgets -->
			</div>
		</div>

		<div class="footer2">
			<div class="container">
				<div class="row">
					
					<div class="col-md-6 widget">
						<div class="widget-body">
						  <p class="simplenav"> <a href="">Home</a> | <a href="about.html">About</a> | <a href="flashgames.html"> Fan Page </a> | <a href="contact.php">Contact</a> | <strong><a onClick="triggerSignIn()" href="#">Sign up</a></strong></p>
						</div>
					</div>

					<div class="col-md-6 widget">
						<div class="widget-body">
							<p class="text-right">
								Copyright &copy; 2015, <a id="hidden" href="http://teemalgames.com/" rel="developer">TeemalGames.com</a> <a id="hidden" href="http://gettemplate.com/" rel="designer"></a> 
							</p>
						</div>
					</div>

				</div> <!-- /row of widgets -->
			</div>
		</div>

	</footer>
	<div id="myModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
           
                <button type="button" class="close" onClick="closeModal()" aria-hidden="true">&times;</button>
                <h2 class="modal-title">Login or Register<br> </h2>
                <h4>Choose a secure social account</h4>
            </div>
            <div class="modal-body">
                <p>
              <div id="socialSign">
      			<a class="btn btn-block btn-social btn-facebook" id="facebookSign" >
    			<i class="fa fa-facebook"></i >Facebook</a>

                        <a class="btn btn-block btn-social btn-twitter" id="twitterSign" href="process.php">
    			<i class="fa fa-twitter"></i >Twitter</a>
            
  				<a class="btn btn-block btn-social btn-google" id="googleSign">
    			<i class="fa fa-google-plus"></i>Google</a>
            
         		<a class="btn btn-block btn-social btn-linkedin" id="linkedInSign">
    			<i class="fa fa-linkedin"></i>LinkedIn</a>

             </div>	
              </p> 
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" onClick="closeModal()"  data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
	


<!-- JavaScript libs are placed at the end of the document so the pages load faster -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="https://apis.google.com/js/platform.js"></script>
	<script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
<script src="assets/js/headroom.min.js"></script>
	<script src="assets/js/jQuery.headroom.min.js"></script>
    <script src="assets/js/jquery.validate.min.js"></script>
    <script src="assets/js/jquery-ui.min.js"></script>
    <script type="text/javascript">stLight.options({publisher: "addbd293-2be9-423c-96be-bbbad249284b", doNotHash: false, doNotCopy: false, hashAddressBar: false});</script>
<script>
var options={ "publisher": "addbd293-2be9-423c-96be-bbbad249284b", "position": "left", "ad": { "visible": false, "openDelay": 5, "closeDelay": 0}, "chicklets": { "items": ["facebook", "twitter", "blogger", "linkedin", "buffer", "googleplus", "email", "sharethis"]}};
var st_hover_widget = new sharethis.widgets.hoverbuttons(options);
</script>
	<script src="assets/js/process.js"></script>
    <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-69153021-1', 'auto');
  ga('send', 'pageview');

</script>
<?php
if(isset($_SESSION['status']) && $_SESSION['status']=='verified') 
{	//Success, redirected back from process.php with varified status.
	//retrive variables
	$screenname 		= $_SESSION['request_vars']['screen_name'];
	$twitterid 			= $_SESSION['request_vars']['user_id'];
	$oauth_token 		= $_SESSION['request_vars']['oauth_token'];
	$oauth_token_secret = $_SESSION['request_vars']['oauth_token_secret'];
  	$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $oauth_token, $oauth_token_secret);
	$responseTwit = $connection->get('https://api.twitter.com/1.1/users/show.json?screen_name='.$screenname.'&user_id='.$twitterid);
echo '<script> setTwitterUser("'.$screenname.'","'.$responseTwit->profile_image_url.'");</script>';
}
?>
    </div>
</body>
</html>

