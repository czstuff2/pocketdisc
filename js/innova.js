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
		.then(function(response) {return response.json();})
		.then(function(data) {
			innovaDiscs = data;	


		let appendManuTitle = "<span> (Innova)</span>";
		$('.header_title').append(appendManuTitle);
			
			//sort through all discs and save each discType into a saved variable
			for (let disc of data) {
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
			// add to elemenets
			updateDiscLists();
		});
};
// add disc to each list
function addDisc(disc, discList) {
	// start with li element and add discListItems class
	discList.push('<li class="discListItems" onClick="displayDisc(' + discNumber + ')">');
	// add disc Name
	discList.push(disc.discName);
	//add strong disc speed and wrap li
	discList.push('<strong class="speedList">' + disc.speed + '</strong></li>');



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

	//generate discContentStatsHolder 
	let arrayStats = [];
	arrayStats.push('<div class="discContentImgHolder"><img src="images/innova/' + currentDiscName.toLowerCase() + '-fp.jpg" alt=""></div>');
	arrayStats.push('<div class="discContentStatsHolder"><div class="topContainment">');
	arrayStats.push('<div class="borderContainer"><div>' + currentDisc.speed + '<span>Speed</span></div></div>');
	arrayStats.push('<div class="borderContainer"><div>' + currentDisc.glide + '<span>Glide</span></div></div></div>');
	arrayStats.push('<div class="bottomContainment">');
	arrayStats.push('<div class="borderContainer"><div>' + currentDisc.turn + '<span>Turn</span></div></div>');
	arrayStats.push('<div class="borderContainer"><div>' + currentDisc.fade + '<span>Fade</span></div></div></div>');
	$('.discContentContainer').append(arrayStats.join(''));	

	// generate discContentDetails
	let arrayDetails = [];
	arrayDetails.push('<div class="discDescription">' + currentDisc.description + '</div>');
	arrayDetails.push('<div class="discDescriptionStats">');
	arrayDetails.push('<div>Diameter: <strong>' + currentDisc.diameter + '</strong></div>');
	arrayDetails.push('<div>Rim Width: <strong>' + currentDisc.rimWidth + '</strong></div>');
	arrayDetails.push('<div>Available Plastics: <strong>' + currentDisc.plastics + '</strong></div></div>');
	$('.discContentDetails').append(arrayDetails.join(''));	 
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