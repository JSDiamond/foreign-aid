(function(){ "use strict";

	window.varea = function(selector){

		var self = window.varea,
			elmnt = $(selector);

		function init(){
			renderVarea();
		}

function renderVarea(){
			var margin = {top: 3, right: 3, bottom: 3, left: 3},
				width = $(window).width() - margin.left - margin.right,
				height = $(window).height() - margin.top - margin.bottom;

			var startScale = d3.scale.linear().domain([0, 100]).range([0, 8]);
			var endScale = d3.scale.linear().domain([0, 100]).range([0, 100]);

			var line = d3.svg.line()
				.defined(function(d) { return String(d.y) != 'NaN'; })
				.x(function(d) {return d.x;})
				.y(function(d) {return (String(d.y) == 'NaN')? 0 : d.y;});
				// line.interpolate('cardinal');
			var area = d3.svg.area()
				.defined(function(d) { return String(d.y) != 'NaN'; })
				.x(function(d) { return d.x; })
				.y1(function(d) { return d.y1; })
				.y0(function(d) { return d.y0 })
				area.interpolate('basis');

			var svg = d3.select("#viz").append("svg")
				.attr("width", width)
				.attr("height", height)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			// Define the gradient
			var gradient = svg.append("svg:defs")
				.append("svg:linearGradient")
				.attr("id", "linkgrad")
				.attr("x1", "0%")
				.attr("y1", "0%")
				.attr("x2", "100%")
				.attr("y2", "0%")
				.attr("spreadMethod", "pad");
			gradient.append("svg:stop")
				.attr("offset", "0%")
				.attr("stop-color", "rgb(200,10,10)")
				.attr("stop-opacity", 0.1);
			gradient.append("svg:stop")
				.attr("offset", "100%")
				.attr("stop-color", "rgb(200,10,10)")
				.attr("stop-opacity", 0.8);

			//var values = [10,20,30,62,28,16,25,10,20,30,62,28,16,25,10,20,30,62,28];//
			var values = d3.range(160).map(function(d){return Math.random()*100;})
			var innermargin = width*0.08, midmargin = width*0.2, pad = [20, 1], prevY1 = 220, prevY0 = 0;

// var vareaStack = function() {
// 	var self = this;
// 	self.domain = function(domain){
// 		self.min = domain[0] || 0;
// 		self.max = domain[1] || 0;
// 		return self;
// 	}
// 	self.get = function(x){
// 		var sv;
// 		sv = (((self.b - self.a) * (x - self.min)) / (self.max - self.min)) + self.a;
// 		return sv;
// 	}
// 	return self;
// };

			function vareaDimens(_a, _pad, _p1, _p0){
				//_a.sort(function(a,b){return b-a});
				startScale.domain([0, d3.max(_a)]);
				endScale.domain([0, d3.max(_a)]);
				
				var stackH1 = 0, stackH0 = 0, ph1 = _p1, ph0 = _p0;
				_a.forEach(function(d){
					stackH1 = startScale(d)+ph1+_pad[1];
					ph1 = stackH1;
					stackH0 = endScale(d)+ph0+_pad[0];
					ph0 = stackH0;
					//console.log( Math.abs(ph1-ph0) ); //close to being straight?
				});
				ph0-=_pad[0];
				ph1-=_pad[1];

				return {0:{start:_p0, end:ph0, height:Math.ceil(ph0-_p0)}, 1:{start:_p1, end:ph1, height:Math.ceil(ph1-_p1)}};
			}


			function vareaStack(_a, _pad, _p1, _p0){
				//_a.sort(function(a,b){return b-a});
				startScale.domain([0, d3.max(_a)]);//d3.min(_a)
				endScale.domain([0, d3.max(_a)]);

				var _astack = _a.map(function(d,i){ 
					var startone = _p1,
					startzero = startScale(d)+_p1,
					endone = _p0,
					endzero = endScale(d)+_p0,
					dat = [
						{x: midmargin, y1: startone, y0: startzero}, 
						{x: midmargin+innermargin, y1: startone, y0: startzero}, 
						{x: width-midmargin-innermargin, y1: endone, y0: endzero}, 
						{x: width-midmargin, y1: endone, y0: endzero}
					];
					_p1 = startzero+_pad[1];
					_p0 = endzero+_pad[0];
					return dat;
				});
				return _astack;
			}

			var vareaData = vareaStack(values,pad,prevY1,prevY0);

			var vH = vareaDimens(values,pad,prevY1,prevY0);
			$("#scrollspace").append('<div class="spacer" style="height:'+vH[0].end+'px""><div>');
			$(window).on("scroll", function(){
				//console.log($(window).scrollTop());
				var wst = $(window).scrollTop();
				prevY0 = wst*-1;
				prevY1 = 220 + wst*-0.04;
				var newData = vareaStack(values,pad,prevY1,prevY0);
				vstack.data(newData).attr("d", area);
			});

			// console.log(d3.max(vareaData, function(d){ return d[3].y; }));
			// startScale.domain([d3.min(vareaData,function(d){return d[1].y;}), d3.max(vareaData, function(d){ return d[1].y; })])
			// endScale.domain([d3.min(vareaData,function(d){return d[3].y;}), d3.max(vareaData, function(d){ return d[3].y; })])

			var vstack =  svg.selectAll("varea").data(vareaData).enter().append("path")
				.attr("class", 'varea')
				.attr("d", area)
				.attr("fill", "url(#linkgrad)");

			var starttime = new Date().getTime();
			var interval = '';

			$('body').on("click", function(){
				if($('body').hasClass('stopped')){
					starttime = new Date().getTime();
					interval = setInterval(function(){
						values.forEach(function(d,i){
							//timed
							// var nowtime = new Date().getTime();
							// prevY1 = 400+Math.floor((nowtime - starttime)*-0.01);
							// prevY0 = 400+Math.floor((nowtime - starttime)*-0.8);

							//randomness
							// pad = [Math.floor(Math.random()*60), Math.floor(Math.random()*10)]
							prevY1 = Math.floor(Math.random()*500);
							prevY0 = Math.floor(Math.random()*100);
							values[i] = Math.floor(Math.random()*800);
						});
						var vH = vareaDimens(values,pad,prevY1,prevY0);
						prevY1 = vH[0].start + (vH[0].height*0.5) - (vH[1].height*0.5);
						var newData = vareaStack(values,pad,prevY1,prevY0);
						vstack.data(newData).transition().duration(777).attr("d", area);
						//vstack.data(newData).attr("d", area);
					},777);
					$('body').removeClass('stopped');
				} else {
					starttime = new Date().getTime();
					clearInterval(interval);
					$('body').addClass('stopped');
				}
			})
		}

		self.api = {
			"init": init
		}

		init();
		return self.api;
	};
	
}( window || (window = {}) ) );
