var arr = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];
var turn = 0;
var winners = [];
var winarr = [];

$(function() {
	$('#new').submit(addNewItem);

	$('#turnName').html($('#player01').html());


	$('.div').click (function() {
		if (turn % 2 == 0) {
			classPlayer = 'playerLeft';
			$('#turnName').html($('#player02').html());
		} else if (turn % 2 == 1) {
			classPlayer = 'playerRight';
			ox = "x";
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

		if (winOrnot(coordinate, ox)[0] == true) {
			align = winOrnot(coordinate, ox)[1]+winOrnot(coordinate, ox)[2];
			if (align == "x0") {
				$('#a01, #a02, #a03').addClass('rrotate');
			} else if (align == 'x1') {
				$('#a04, #a05, #a06').addClass('rrotate');
			} else if (align == 'x2') {
				$('#a07, #a08, #a09').addClass('rrotate');				
			} else if (align == 'y0') {
				$('#a01, #a04, #a07').addClass('rrotate');				
			} else if (align == 'y1') {
				$('#a02, #a05, #a08').addClass('rrotate');
			} else if (align == 'y2') {
				$('#a03, #a06, #a09').addClass('rrotate');
			} else if (align == 'z1100') {
				$('#a01, #a05, #a09').addClass('rrotate');
			} else if (align == 'z2100') {
				$('#a03, #a05, #a07').addClass('rrotate');
			}
			delayTimeRotate2(this);

			if (classPlayer =="playerLeft") {
				winners.push("winnerLeft");
			} else if (classPlayer == "playerRight") {
				winners.push('winnerRight');
			}	
		}//end of winOrnot

		if (turn % 2 == 1) {
			if (winners.indexOf('winnerLeft') !== -1 && winners.indexOf('winnerRight') !== -1) {
				alert('Tie');
			} else if (winners.indexOf('winnerLeft') !== -1) {
				alert('Winner is Left');
			} else if (winners.indexOf('winnerRight') !== -1) {
				alert('Winner is winnerRight');
			}
		}

		turn += 1;
		$('#check').html(winarr);
	})//$('.div').click
	
});


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
		console.log(i, strx, stry)
		
		if (strx =='ooo'||strx=='xxx') {
			if (winarr.indexOf(winarrX) === -1) {
				winarr.push(winarrX);
				return [true, "x", i];
			}
		} 

		if (stry =='ooo'||stry =='xxx') {
				if(winarr.indexOf(winarrY) === -1) {
					winarr.push(winarrY);
					return [true, 'y', i];
				}			
		} 
	}

	strz1 = arr[0][0]+arr[1][1]+arr[2][2];
	strz2 = arr[0][2]+arr[1][1]+arr[2][0];
	if (strz1=='ooo'|| strz1=='xxx') {
		if (winarr.indexOf("z1") === -1) {
			winarr.push("z1");
			return [true, 'z1', 100];			
		}
	} else if (strz2=='ooo'||strz2=='xxx') {
		if (winarr.indexOf('z2') === -1) {
			winarr.push("z2");
			return [true, 'z2', 100]
		}
	}
	return false;
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




















