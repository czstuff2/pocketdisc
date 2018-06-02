let innovaDiscs, innovaDrivers, innovaFairway, innovaMid, innovaPutters;
// pull ul class elements for each discType
let driverList = $('.shownDrivers');
let fairwayList = $('.shownFairways');
let midList = $('.shownMids');
let putterList = $('.shownPutters');
// create arrays for each discType
let arrayDriver = [];
let arrayFairway = [];
let arrayMid = [];
let arrayPutter = [];
// # of iterations
let discNumber = 0;
let widthOfViewport = $(window).width();

let myRequest = new Request('http://fidhub.com/data/innova-discs.json');

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
	let appendManuTitle = "<span> (Innova)</span>";
	$('.header_title').append(appendManuTitle);
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
	// add to elements
	updateDiscLists();
	};
};
// add disc to each list
function addDisc(disc, discList) {
	let htmlContent = `<li class="discListItems" onclick="displayDisc(${discNumber})">${disc.discName}
			<strong class="speedList">${disc.speed}</strong></li>`;
	discList.push(htmlContent);
	discNumber++;
};

//add to page
function updateDiscLists() {
	driverList.append(arrayDriver.join(''));
	fairwayList.append(arrayFairway.join(''));
	midList.append(arrayMid.join(''));
	putterList.append(arrayPutter.join(''));
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