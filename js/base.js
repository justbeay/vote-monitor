$('#container').hide();
$('#vote-control').addClass('control-prepare').show();
$('#vote-timer').addClass('control-prepare').hide();
var voteState = 'prepare';
function startVote(){
	if(voteState == 'prepare'){
		console.log('vote start...');
		voteState = 'start';
		var voteControl = $('#vote-control');
		voteControl.find('img').attr('src', './images/pause_64.png');
		voteControl.removeClass('control-prepare').addClass('control-start').hide();
		$('#container').fadeIn(3000);
		$('#vote-timer').removeClass('timer-prepare').addClass('timer-start');
		voteControl.hover(function(){
			voteControl.fadeTo('fast', 0.7);
			voteControl.bind('click', function(){
				if(voteState == 'start'){
					stopChart();
					voteState = 'pause';
				}else if(voteState == 'pause'){
					startChart();
					voteState = 'start';
				}
			});
		}, function(){
			voteControl.fadeTo('fast', 0.01);
			voteControl.unbind('click');
		});
		$('#vote-timer').fadeIn(3000);
		startTimer();
		initChart();
	}
}
function startTimer(){
	var ts = (new Date()).getTime() + 1800*1000;
	$('#vote-timer').countdown({
		timestamp: ts,
		showDays: false,
		callback: function(d, h, m, s){
			if(d===0 && h===0 && m===0 && s===0){ // time reached
				if(voteState == 'start'){
					stopVote();
				}
			}
		}
	});
}
function stopVote(){
	voteState = 'stop';
	stopChart();
	console.log('vote stop...');
	$('#vote-control').unbind('click');
	$('#vote-control').find('img').attr('src', './images/stop_64.png');
}
