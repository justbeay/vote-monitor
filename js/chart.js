function VoteChart(){
	this.winnerInfos = new Array();
	this.voteTimer = null;
	this.chart = null;
	var refreshTime = 1200;
	this.options = {
		chart: {
			type: 'column',
			options3d: {
				enabled: true,
				alpha: 15,
				beta: 5,
				viewDistance: 25,
				depth: 40
			},
			marginTop: 80,
			marginRight: 45,
			backgroundColor: '#EEEEEE'
		},
		legend: {
			enabled: false
		},
		credits: {
			enabled: false
		},
		title: {
			text: "real vote information"
		},
		xAxis: {
		    categories: [],
		    labels: {
		    	useHTML: true,
		    	formatter: function(){
		    		var groupSize = 0, groupIndex = 0;
		    		// get index of this category
		    		for(var i=0; i<this.axis.categories.length; i++){
		    			if(this.axis.categories[i] == this.value){
		    				groupIndex = i;
		    				break;
		    			}
		    		}
		    		// get real size of this category
		    		for(var i=0; i<this.chart.options.series.length; i++){
		    			var data = this.chart.options.series[i].data;
		    			if(groupIndex <= data.length-1 && data[groupIndex] !== null && data[groupIndex].y !== null){
		    				groupSize++;
		    			}
		    		}
		    		// calculate distance to make this group label centered
		    		var distance = 5+21*(this.chart.series.length-groupSize);
		    		return '<div style="margin-left:-'+distance+'px">'+this.value+'</div>';
		    	}
		    }
		},
		yAxis: {
		    allowDecimals: false,
		    min: 0,
		    title: {
		        text: 'Number of votes'
		    },
		    ordinal: false,
		    max: 100
		},
		tooltip: {
			borderColor: '#C0C0C0',
			// headerFormat: '<b>{point.x}</b><br>',
			// pointFormat: '<span style="color:{point.color}">\u25CF</span> {point.name}: {point.y}<br>',
			useHTML: true,
			formatter: function(){
				var html = '<span style="font-weight:bold">'+this.x+'</span><br>';
				for(var i=0; i<this.points.length; i++){
					html += '<span style="color:'+this.points[i].point.graphic.color+'">\u25CF</span> ';
					// for winner in each group, making it looks more special than others
					html += this.points[i].point.winner ? '<span style="color:#FF0000">'+this.points[i].key+': '+this.points[i].y+'</span><br>'
								: '<span>'+this.points[i].key+': '+this.points[i].y+'</span><br>';
				}
				return html;
			},
			shared: true
		},
		plotOptions: {
			columns: {
				depth: 40,
			},
			series: {
				dataLabels: {
					enabled: true,
					useHTML: true,
					color: '#000000',
					// format: '<div ><img src="{./images/icon_'+this.x+'-'+this.key+'.png}" style="float:left;width:100%;width:64px; heigth:64px"/><div style="float:left;width:100%;margin-bottom:-10px;text-align:center">{y}</div></div>',
					formatter: function(){
						var html = null;
						if(this.y!==null){
							var id = this.x+'-'+this.key; // given it an unique id for the sake of winner's animation
							html =  '<div style="text-align:center"><div id="'+id+'">';
							html += '<div>'+this.y+'</div>'+
									'<div style="width:32px; height:32px; text-align:center;'+
									' background-image:url(\'./images/icon_'+this.x+'-'+this.key+'.png\');'+
									' background-position:-8px -8px"></div>';
							html += '</div><div>'+this.key+'</div></div>';
						}
						return html;
					},
					y: 20,
				}
			}
		},
		series: []
	};
	this.initChart = function(renderTo){
		var self = this;
		this.options.chart.renderTo = renderTo;
		this.refreshChart(null, true);
	}
	this.startChart = function(){
		console.log('start ...');
		if(this.voteTimer === null){
			var self = this;
			this.voteTimer = setInterval(function(){
				self.refreshChart();
			}, refreshTime);
			console.log('start chart...');
		}
	}
	this.stopChart = function(callback){
		if(this.voteTimer !== null){
			clearInterval(this.voteTimer);
			this.voteTimer = null;
			this.refreshChart(callback);
			console.log('stop chart...');
		}
	}
	this.refreshChart = function(callback, isFirst){
		var self = this;
		getVoteInfo(function(groups, series){
			if(isFirst){
				self.options.xAxis.categories = groups;
				self.options.series = series;
				self.chart = new Highcharts.Chart(self.options);
			}else{
				var isDataChanged = false;
				if(self.options.xAxis.categories != groups){
					isDataChanged = true;
				}
				for(var i=0; i<series.length; i++){
					if(self.options.series[i].data != series[i].data){
						self.chart.series[i].setData(series[i].data, false);
						isDataChanged = true;
					}
				}
				if(isDataChanged){
					self.chart.redraw();
					self.setWinnersAnimation(series, groups);
				}
			}
			if(typeof(callback) == "function"){
				callback(self.winnerInfos);
			}
		});
	}
	/* set animation for all winners */
	this.setWinnersAnimation = function(series, groups){
		// cancel all old winner's animation first
		while(this.winnerInfos.length > 0){
			clearInterval(this.winnerInfos.pop().timer);
		}
		// for new winners, set animation
		for(var i=0; i<groups.length; i++){
			for(var j=0; j<series.length; j++){
				if(series[j].data.length >= i+1){
					var voteInfo = series[j].data[i];
					if(voteInfo!==null && voteInfo.winner){
						var id = groups[i]+'-'+voteInfo.name;
						this.winnerInfos.push({
							timer: setBarAnimation(id),
							num: voteInfo.y,
							name: voteInfo.name,
							group: groups[i]
						});
					}
				}
			}
		}
	}
	/* set animation for the specified group member */
	function setBarAnimation(id){
		return setInterval(function(){
			// $('#'+id).toggle();
			$('#'+id).fadeTo(200, 0.0).fadeTo(200, 1.0);
		}, 400);
	}
	// get vote info from server
	function getVoteInfo(callback){
		$.getJSON('./data/queryVotes.php?t='+Math.random(), function(data){
		// $.getJSON('/vote/stuffs?t='+Math.random(), function(data){
			var groups = new Array();
			var series = new Array();
			for(group in data){
				groups.push(group);
				var maxVoteNum = 0;
				for(var j=0; j<data[group].length; j++){
					// get vote information
					var voteInfo = {};
					for(attr in data[group][j]){
						if(attr=='name') voteInfo['name'] = data[group][j][attr];
						else if(attr=='num') voteInfo['y'] = data[group][j][attr];
						//get max vote number of each group
						if(voteInfo['y'] > maxVoteNum) maxVoteNum = voteInfo['y'];
					}
					// put vote info into series
					if(series.length <= j){
						series.push({data: []});
					}
					for(var k=series[j].data.length; k<groups.length-1; k++){
						series[j].data.push(null);
					}
					series[j].data.push(voteInfo);
				}
				// put max vote number info into series
				for(var j=0; j<data[group].length; j++){
					series[j].data[series[j].data.length-1].winner = 
						maxVoteNum>0 && series[j].data[series[j].data.length-1].y>=maxVoteNum;
				}
			}
			if(typeof(callback) == "function"){
				callback(groups, series);
			}
		});
	}
}