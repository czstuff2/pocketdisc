let innovaDiscs;
// pull ul class elements for each discType
let driverList = document.querySelector('.shownDrivers');
let fairwayList = document.querySelector('.shownFairways');
let midList = document.querySelector('.shownMids');
let putterList = document.querySelector('.shownPutters');
// create arrays for each discType
let arrayDriver = []
let arrayFairway = []
let arrayMid = []
let arrayPutter = []
// # of iterations
let discNumber = 0;
let widthOfViewport = $(window).width();

let myRequest = new Request('https://thomasscottmiller.com/data/innova-discs.json');

$('#tabs').tabs();
discFetch();

// Fetch Innova Discs
function discFetch() {
	fetch(myRequest)
		.then( response => response.json())
		.then(sortDiscs);
};

// sort discs
function sortDiscs(discs) {
	innovaDiscs = discs;
	const appendManuTitle = document.createElement('span')
	appendManuTitle.innerHTML = " (Innova)";
	const headerTitle = document.querySelector('.header_title')
	headerTitle.append(appendManuTitle);
	for (let disc of discs) {
		// If the disc is a driver, save to own variable
		if (disc.speed >= 9) {
			addDisc(disc, arrayDriver);
		}
		// If the disc is a fairway driver
		else if (disc.speed >= 6) {
			addDisc(disc, arrayFairway);
		}
		// If the disc is a Mid-Range
		else if (disc.speed >= 4) {
			addDisc(disc, arrayMid);
		}
		// if the disc is a Putter 
		else {
		addDisc(disc, arrayPutter);	
		};	
	};
	// add to elements
	updateDiscLists();
};
// add disc to each list
function addDisc(disc, discList) {
	let htmlContent = `<li class="discListItems" onclick="displayDisc(${discNumber})">${disc.discName}
			<strong class="speedList">${disc.speed}</strong></li>`;
	discList.push(htmlContent);
	// htmlContent = '';
	discNumber++;
};

//add to page
function updateDiscLists() {
	driverList.innerHTML = arrayDriver.join('');
	fairwayList.innerHTML = arrayFairway.join('');
	midList.innerHTML = arrayMid.join('');
	putterList.innerHTML = arrayPutter.join('');
};

function displayDisc(discNumber) {
	if ($('#dialog').dialog("isOpen")) {
			$('#dialog').dialog("close");
	};
	if ($('discContentStatsHolder')) { 
		
		$('.discContentContainer').empty();
		$('.discContentDetails').empty();

	}
	let currentDisc = innovaDiscs[discNumber];
	let currentDiscName = currentDisc.discName;
	// Edit Disc Name 
	$('#dialog').dialog("option", "title", currentDiscName);


	let htmlContent = `<div class"discContentImgHolder">
			<img class="discImg" src="images/innova/${currentDiscName.toLowerCase()}-fp.jpg" alt=""></div>
			<div class="discContentStatsHolder"><div class="topContainment">
			<div class="borderContainer"><div>${currentDisc.speed}<span>Speed</span></div></div>
			<div class="borderContainer"><div>${currentDisc.glide}<span>Glide</span></div></div></div>
			<div class="bottomContainment">
			<div class="borderContainer"><div>${currentDisc.turn}<span>Turn</span></div></div>
			<div class="borderContainer"><div>${currentDisc.fade}<span>Fade</span></div></div></div>`;

	const discContentContainer = document.querySelector('.discContentContainer');
	discContentContainer.insertAdjacentHTML('beforeend', htmlContent);

	htmlContent = `<div class="discDescription">${currentDisc.description}</div>
		<div class="discDescriptionStats">
		<div>Diameter: <strong>${currentDisc.diameter}</strong></div>
		<div>Rim Width: <strong>${currentDisc.rimWidth}</strong></div>
		<div>Available Plastics: <strong>${currentDisc.plastics}</strong></div></div>`;

	const discContentDetailsContainer = document.querySelector('.discContentDetails');
	discContentDetailsContainer.insertAdjacentHTML('beforeend', htmlContent);

	$('#dialog').dialog( "open" );
	const dialogTitle = document.querySelector('.ui-icon-closethick');
	dialogTitle.setAttribute('tabindex', -1);
	dialogTitle.focus();
}; 

$('#dialog').dialog({
	autoOpen: false,
	// modal: true,
	buttons: [
		{
			text: "Close",
			click: function() {
				$( this ).dialog("close");
			}
		}
	]
});