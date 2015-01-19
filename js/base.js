$('#container').hide();
var voteControl = $('#vote-control');
voteControl.addClass('control-prepare').css('opacity', '0.25').show()
	.find('img').hover(function(){
		voteControl.fadeTo('slow', 0.8);
	}, function(){
		voteControl.fadeTo('slow', 0.25);
	});
$('#vote-timer').addClass('timer-prepare').hide();
var voteState = 'prepare';
function startVote(){
	if(voteState == 'prepare'){
		console.log('vote start...');
		voteState = 'start';

		$('#curtain').find('.left').width('49%').animate({width:'0%'}, 10000);
		$('#curtain').find('.right').width('49%').animate({width:'0%'}, 10000);

		var voteControl = $('#vote-control');
		voteControl.removeClass('control-prepare').addClass('control-start').hide();
		voteControl.find('img').attr('src', './images/pause_64.png').hover(function(){
			voteControl.fadeTo('fast', 0.7);
			voteControl.bind('click', function(){
				if(voteState == 'start'){
					stopChart();
					voteState = 'pause';
					console.log('chart paused...');
				}else if(voteState == 'pause'){
					startChart();
					voteState = 'start';
					console.log('chart resumed...');
				}
			});
		}, function(){
			if(parseFloat(voteControl.css('opacity')) > 0.01){
				voteControl.fadeTo('fast', 0.01);
				voteControl.unbind('click');
			}
		});
		$('#container').fadeIn(3000);
		$('#vote-timer').removeClass('timer-prepare').addClass('timer-start').fadeIn(3000);
		startTimer();
		initChart();
	}
}
function startTimer(){
	var ts = (new Date()).getTime() + 10*1000;
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
	stopChart(function(winnerInfos){
		console.log('vote stop...');
		$('#vote-control').unbind('click');
		$('#vote-control').find('img').attr('src', './images/stop_64.png');
		$('#curtain').find('.left').width('49%').animate({width:'5.8%'}, 4000);
		$('#curtain').find('.right').width('49%').animate({width:'5.8%'}, 4000);

		// snowfall effect
		$('#stage').find('.snowfall').snowfall('clear');
		$('#stage').find('.snowfall').snowfall({
			image: './images/huaban.png',
			flakeCount: 30,
			minSize: 5,
			maxSize: 22
		});

		// show vote result
		voteResult = $('#vote-result');
		html = '<h1>Congratulations, vote winners are:</h1><ul>';
		for(var i=0; i<winnerInfos.length; i++){
			var winner = winnerInfos[i];
			var image_medal = './images/medal_'+winner.group+'.png';
			var image_person = './images/icon_'+winner.group+'-'+winner.name+'.png';
			html += '<li><div><img src="'+image_medal+'" height="32" />'+
					'<span>'+winner.group+'</span>: <img src="'+image_person+'" height="32"/>'+winner.name+'('+winner.num+')</div>'+
					'</li>';
		}
		html += '</ul>';
		voteResult.append(html);

		$('#vote-result').fadeTo(4000, 0.8);
	});
}
