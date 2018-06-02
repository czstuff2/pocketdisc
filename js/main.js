let innovaEl = $("#innova-entry");

innovaEl.on('click', function(e) {
	window.location.href = 'innova.html';
})

let discraftEl = $("#discraft-entry");;

discraftEl.on('click', function(e) {
	window.location.href = 'discraft.html';
})
let latitudeEl = $("#latitude-entry");;

latitudeEl.on('click', function(e) {
	window.location.href = 'latitude.html';
})

//
var admobid = {};

// TODO: replace the following ad units with your own
if( /(android)/i.test(navigator.userAgent) ) {
  admobid = { // for Android
    banner: 'ca-app-pub-7192547762981686~6419828144',
    interstitial: 'ca-app-pub-7192547762981686/5643848818',
    rewardvideo: 'ca-app-pub-3940256099942544/5224354917',
  };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
  admobid = { // for iOS
    banner: 'ca-app-pub-7192547762981686~6419828144',
    interstitial: 'ca-app-pub-7192547762981686/5643848818',
    rewardvideo: 'ca-app-pub-3940256099942544/1712485313',
  };
} else {
  admobid = { // for Windows Phone
    banner: 'ca-app-pub-7192547762981686~6419828144',
    interstitial: 'ca-app-pub-7192547762981686/5643848818',
    rewardvideo: '',
  };
}

function initApp() {
  if (! AdMob ) { alert( 'admob plugin not ready' ); return; }

  // this will create a banner on startup
  AdMob.createBanner( {
    adId: admobid.banner,
    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    isTesting: true, // TODO: remove this line when release
    overlap: true,
    offsetTopBar: false,
    bgColor: 'black'
  } );

  // this will load a full screen ad on startup
  AdMob.prepareInterstitial({
    adId: admobid.interstitial,
    isTesting: true, // TODO: remove this line when release
    autoShow: true
  });
}

if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    document.addEventListener('deviceready', initApp, false);
} else {
    initApp();
}