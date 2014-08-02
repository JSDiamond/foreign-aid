(function(){ "use strict";

	window.faid = function(selector){

		var self = window.faid,
		elmnt = $(selector),
		hashed = {
			years:["2009","2010","2011","2012","2013"],
			columns:["0","1","2"],
			focus: null,
			hash: window.location.hash.substr(1).split("/")
		};

		var init = function(){
			updateHash();
			location.hash = hashed.year+"/"+hashed.d1+"/"+hashed.d2+"/"+encodeURIComponent(hashed.focus);
			
			getData();

			$(window).on('hashchange', function() {
				updateHash();
				hashChanged();
			});
		}

		function getData(){
			$.getScript("js/data/aid_"+hashed.year+".js", function(data){
				self.year = hashed.year;
				self.aid = aid.filter(function(d){ return d[3]>=0 });
				buildSankeyData(self.aid,hashed.d1,hashed.d2);
			});
		}

		function updateHash(){
			hashed.hash = window.location.hash.substr(1).split("/");
			hashed.year = ( hashed.years.indexOf(hashed.hash[0])!=-1 )? hashed.hash[0] : "2009";
			hashed.d1 = ( hashed.columns.indexOf(hashed.hash[1])!=-1 )? hashed.hash[1] : "2";
			hashed.d2 = ( hashed.columns.indexOf(hashed.hash[2])!=-1 )? (hashed.hash[2]==hashed.d1)? "1" : hashed.hash[2] : "1";
			hashed.focus = decodeURIComponent(hashed.hash[3]) || "";
		}

		var nodeBuilder = function(input, dex1, dex2){
			var sandata = { nodes:[], links: [], lookup:{} };
			input.forEach(function(d,i){
				if(hashed.focus){ if(d[dex1]!=hashed.focus && d[dex2]!=hashed.focus) return }
				if(!sandata.lookup.hasOwnProperty(d[dex1])){
					sandata.lookup[d[dex1]] = sandata.nodes.length;
					sandata.nodes.push({"name":d[dex1]});
				}
				if(!sandata.lookup.hasOwnProperty(d[dex2])){
					sandata.lookup[d[dex2]] = sandata.nodes.length;
					sandata.nodes.push({"name":d[dex2]});
				}
			});
			return sandata
		}

		var buildSankeyData = function(input, dex1, dex2){
			var sandata = nodeBuilder(input, dex1, dex2);
			if(hashed.focus){
				hashed.focus = ( sandata.lookup.hasOwnProperty(hashed.focus) )? hashed.focus : "";
				location.hash = hashed.year+"/"+hashed.d1+"/"+hashed.d2+"/"+encodeURIComponent(hashed.focus);
				sandata = nodeBuilder(input, dex1, dex2);
			}
			var nested_data = d3.nest()
				.key(function(d) { return d[dex1]; })
				.key(function(d) { return d[dex2]; })
				.rollup(function(leaves) { return d3.sum(leaves, function(d) { return parseFloat(d[3]);}); })
				.entries(input);

			nested_data.forEach(function(d){
				var source_val = sandata.lookup[d.key];
				d.values.forEach(function(child){
					if(hashed.focus){ if(d.key!=hashed.focus && child.key!=hashed.focus) return }
					sandata.links.push({"source":source_val,"target":sandata.lookup[child.key],"value":child.values})//Math.floor(Math.random()*20)
				});
			});

			sandata.links.sort(function(a,b){return b.value-a.value;});
			delete sandata.lookup;

			renderSankey(sandata);
		}


		var renderSankey = function(data){
		  var margin = {top: 40, right: 30, bottom: 40, left: 30},
		      width = $(window).width() - margin.left - margin.right,
		      height = 2000 - margin.top - margin.bottom;

		  var formatNumber = d3.format(",.0f"),
		      format = function(d) { return "$"+formatNumber(d); },
		      color = d3.scale.category20();

		  var svg = d3.select("#viz").append("svg")
		      .attr("width", width + margin.left + margin.right)
		      .attr("height", height + margin.top + margin.bottom)
		    .append("g")
		      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		  var sankey = d3.sankey()
		      .nodeWidth(30)
		      .nodePadding(4)
		      .size([width, height]);

		  var path = sankey.link();

			sankey.nodes(data.nodes).links(data.links).layout(32);

			var link = svg.append("g").selectAll(".link")
			    .data(data.links)
			  .enter().append("path")
			    .attr("class", "link")
			    .attr("d", path)
			    .style("stroke-width", function(d) { return Math.max(1, d.dy); })
			    .sort(function(a, b) { return b.dy - a.dy; });

			link.append("title")
			    .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

			var node = svg.append("g").selectAll(".node")
			    .data(data.nodes)
			  .enter().append("g")
			    .attr("class", "node")
			    .attr("transform", function(d) { if(isNaN(d.y)){console.log(d);} return "translate(" + d.x + "," + d.y + ")"; })
			  .call(d3.behavior.drag()
			    .origin(function(d) { return d; })
			    .on("dragstart", function() { this.parentNode.appendChild(this); })
			    .on("drag", function(d){dragmove(d,height)}));

			node.append("rect")
			    .attr("height", function(d) { return d.dy; })
			    .attr("width", sankey.nodeWidth())
			    .style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
			    .style("stroke", function(d) { return d3.rgb(d.color).darker(0.2); })
			    .on('click', function(d){focusSankey(d.name);})
			  .append("title")
			    .text(function(d) { return d.name + "\n" + format(d.value); });

			node.append("text")
			    .attr("x", -6)
			    .attr("y", function(d) { return d.dy / 2; })
			    .attr("dy", ".35em")
			    .attr("text-anchor", "end")
			    .attr("transform", null)
			    .text(function(d) { return d.name; })
			  .filter(function(d) { return d.x < width / 2; })
			    .attr("x", 6 + sankey.nodeWidth())
			    .attr("text-anchor", "start");

			function dragmove(d,height) {
				d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
				sankey.relayout();
				link.attr("d", path);
			}
		}

		function focusSankey(d){
			hashed.focus = d;
			location.hash = hashed.year+"/"+hashed.d1+"/"+hashed.d2+"/"+encodeURIComponent(hashed.focus);
		}

		function hashChanged(){
			d3.select("#viz svg").remove();
			if(hashed.year!=self.year){
				getData();
			}else{
				buildSankeyData(self.aid,hashed.d1,hashed.d2);
			}
		}

		

		self.api = {
			getDateFormatted : function(){
				var date = new Date(),
					dateString = date.getUTCFullYear()+"/"+date.getUTCMonth()+"/"+date.getUTCDay()+"</br>"+date.getHours()+":"+date.getUTCMinutes()+":"+date.getUTCSeconds();
				return dateString
			}
		}

		init();
		return self.api;
	};
	
}( window || (window = {}) ) );


// d3.selection.prototype.moveToFront = function() {
// 		return this.each(function(){
// 		this.parentNode.appendChild(this);
// 	});
// };

