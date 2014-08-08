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

			var startScale = d3.scale.linear().domain([0, 100]).range([0, 10]);
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

			var values = [10,20,30,62,28,16,25];//
			var innermargin = width*0.08, midmargin = width*0.2, pad = [40, 2], prevY1 = 220, prevY0 = 30;

			function vareaStack(_a, _pad, _p1, _p0){
				_a.sort(function(a,b){return b-a});
				startScale.domain([0, d3.max(_a)]);//d3.min(_a)
				endScale.domain([0, d3.max(_a)]);
				
				var ph1 = _p1, ph0 = _p0;
				var stackH1 = 0, stackH0 = 0;
				_a.forEach(function(d){
					stackH0 = endScale(d)+ph0+_pad[0];
					ph0 = stackH0;
				});
				_a.forEach(function(d){
					stackH1 = endScale(d)+ph1+_pad[1];
					ph1 = stackH1;
				});

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
				return { stack: _astack, heights:[stackH0, stackH1] };
			}

			var vareaData = vareaStack(values,pad,prevY1,prevY0);

			//console.log(d3.max(vareaData, function(d){ return d[3].y; }));
			// startScale.domain([d3.min(vareaData,function(d){return d[1].y;}), d3.max(vareaData, function(d){ return d[1].y; })])
			// endScale.domain([d3.min(vareaData,function(d){return d[3].y;}), d3.max(vareaData, function(d){ return d[3].y; })])

			var vstack =  svg.selectAll("varea").data(vareaData.stack).enter().append("path")
				.attr("class", 'varea')
				.attr("d", area);

			var start = new Date().getTime();
			setInterval(function(){
				values.forEach(function(d,i){
					values[i] = Math.floor(Math.random()*60);
					var now = new Date().getTime();
					// prevY1 = Math.floor((new Date().getTime() - start)*0.04);
					// prevY0 = Math.floor((new Date().getTime() - start)*-0.01);
					//pad = [Math.floor(Math.random()*60), Math.floor(Math.random()*10)]
					prevY1 = Math.floor(Math.random()*500);
					prevY0 = Math.floor(Math.random()*100);
				});
				//prevY1 = prevY0 + (newData.heights[0]*0.5) - newData.heights[1];
				var newData = vareaStack(values,pad,prevY1,prevY0);
				vstack.data(newData.stack).transition().duration(777).attr("d", area);
			},999);

		}

		self.api = {
			"init": init
		}

		init();
		return self.api;
	};
	
}( window || (window = {}) ) );
