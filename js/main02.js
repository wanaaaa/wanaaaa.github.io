var arr = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];
var turn = 0;
var winarr = [];
var rrotate = '';
var theWinner = "";
var winLeft = 0;
var winRight = 0;


$(function() {
	$('#scoreZero').click(function() {
		scoreZero();
		$('#test').html(turn,winLeft, winRight);
	});
	console.log('after zero');
	$('#new').submit(addNewItem);

	$('#turnName').html($('#player01').html());


	$('.div').click (function() {
		if (turn % 2 == 0) {
			classPlayer = 'playerLeft';
			$('#turnName').html($('#player02').html());
		} else if (turn % 2 == 1) {
			classPlayer = 'playerRight';
			$('#turnName').html($('#player01').html());		
		};

		if (!$(this).hasClass('playerLeft') && !$(this).hasClass('playerRight')) {
			$(this).addClass(classPlayer);
		};

		$(this).addClass('rotate');
		delayTimeRotate(this);

		coordinate = $(this).attr('id');
		if (classPlayer == "playerLeft") {
			ox = "o";
		} else if (classPlayer == 'playerRight') {
			ox = "x";			
		}

		winOrnot(coordinate, ox);
		if (winarr.length > 0) {
			finalWinnerRotate();			
		}

		if ( turn % 2 == 1) {
			if (winarr.length == 2) {
				theWinner = "tie";
				theWinnerIs(theWinner);
				theSlideUp();
			} else if (winarr.length == 1) {
				if (winarr[0][1] == 'ooo') {
					theWinner = $('#player01').html();
					winLeft += 1;
					$('#leftWinNumber').html('Number of win: ' + winLeft);					
				} else if (winarr[0][1] = 'xxx') {
					theWinner = $('#player02').html();
					winRight += 1;					
					$('#rightWinNumber').html('Number of win: ' + winRight);
				};
				theWinnerIs(theWinner);
				theSlideUp();
			};		
		};
	
		turn += 1;
	})//$('.div').click
	
});
///////////////////////////////////////////////////////
function scoreZero() {
	arr = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];
	turn = 0;
	winarr = [];
	rrotate = '';
	theWinner = "";
	winLeft = 0;
	winRight = 0;
	$('#leftWinNumber').html('Number of win: ' + winLeft);
	$('#leftWinNumber').html('Number of win: ' + winRight);
}

function theSlideUp() {
	setTimeout (function() {
		$("#slide").slideUp('slow');
		$('#playBoard').toggleClass('hide');
		$('.div').removeClass('playerLeft').removeClass('playerRight');
	}, 2000);	
	arr = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];
	turn = -1;
	winarr = [];
}

function theWinnerIs(name) {
	$('#playBoard').toggleClass('hide');
	if (name == "tie") {
		$('#slide').html('<h3>The game is Tie</3>');
	} else {
		$('#slide').html('<h3>The winner is '+name+'</h3>')		
	}
	$('#slide').slideDown('slow');
}

function finalWinnerRotate() {
	for (var rr = 0; rr < winarr.length; rr ++) {
		if (winarr[rr][0] == 'x0') {
			rrotate = '#a01, #a02, #a03';
		} else if (winarr[rr][0] == 'x1') {
			rrotate = '#a04, #a05, #a06'
		} else if (winarr[rr][0] == 'x2') {
			rrotate = '#a07, #a08, #a09'
		} else if (winarr[rr][0] == 'y0') {
			rrotate = '#a1, #a04, #a07'
		} else if (winarr[rr][0] == 'y1') {
			rrotate = '#a02, #a05, #a08'
		} else if (winarr[rr][0] == 'y2') {
			rrotate = '#a03, #a06, #a09'
		} else if (winarr[rr][0] == 'z1') {
			rrotate = '#a01, #a05, #a09'
		} else if (winarr[rr][0] == 'z2') {
			rrotate = '#a03, #a05, #a07'
		} 		
		$(rrotate).addClass('rrotate');
	}

} //finalWinnerRotate end

function removeRepeat(arr) {
	newarr = [];
	for (var ii = 0; ii < arr.length; ii += 1) {
		if (newarr.indexOf(arr[ii]) == -1) {
			newarr.push(arr[ii]);
		};
	};
	return newarr;
}

function delayTimeRotate() {
	setTimeout (function() {
		$('.div').removeClass('rotate');
	}, 500);
}

function delayTimeRotate2() {
	setTimeout (function() {
		$('.div').removeClass('rrotate');
	}, 2000);
}

function winOrnot(xy, ox) {
	winarr = [];
	if (xy == "a01") {
		arr[0][0] = ox;
	} else if (xy == "a02") {
		arr[0][1] = ox;
	} else if (xy == 'a03') {
		arr[0][2] = ox;
	} else if (xy == 'a04') {
		arr[1][0] = ox;
	} else if (xy == 'a05') {
		arr[1][1] = ox;
	} else if (xy == 'a06') {
		arr[1][2] = ox;
	} else if (xy == 'a07') {
		arr[2][0] = ox;
	} else if (xy == 'a08') {
		arr[2][1] = ox;
	} else if (xy == 'a09') {
		arr[2][2] = ox;
	}; 

	for (var i = 0; i < 3; i ++) {
		strx = arr[i][0]+arr[i][1]+arr[i][2];
		stry = arr[0][i]+arr[1][i]+arr[2][i];
		winarrX = ['x'+ i];
		winarrY = ['y'+ i];
		
		if (strx =='ooo'||strx=='xxx') {
			winarr.push([winarrX, strx]);
		} 
		if (stry =='ooo'||stry =='xxx') {
			winarr.push([winarrY, stry]);	
		} 
	}

	strz1 = arr[0][0]+arr[1][1]+arr[2][2];
	strz2 = arr[0][2]+arr[1][1]+arr[2][0];
	if (strz1=='ooo'|| strz1=='xxx') {
		winarr.push(["z1", strz1]);		
	}
	if (strz2=='ooo'||strz2=='xxx') {
		winarr.push(["z2", strz2]);
	}

	winarr = removeRepeat(winarr);
}

function saveItem(event) {
	event.preventDefault();
	var itemText = $(this).children('input').val();
	var listItem = $(this).parent();
	newEditedHTML = '<span class="item">' + itemText + '</span><a class="edit">Edit</a><a class="remove">Remove</a>';
	listItem.html(newEditedHTML);
}

function addNewItem(event) {
	event.preventDefault();	
	var newItem = $('#newItem').val();
	if ($('#player01').html() == "") {
		$('#player01').html(newItem);
	} else {
		$('#player02').html(newItem);
	};

	if ($('#turnName').html() == "") {
		$('#turnName').html(newItem);
	}

	// $('#newItem').val('');
}





















