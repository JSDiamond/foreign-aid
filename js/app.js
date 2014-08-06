(function(){ "use strict";

	window.faid = function(selector){
		var sectcat = {"Counter-Terrorism":"Peace and Security","Combating Weapons of Mass Destruction (WMD)":"Peace and Security","Stabilization Operations and Security Sector Reform":"Peace and Security","Counter-Narcotics":"Peace and Security","Transnational Crime":"Peace and Security","Conflict Mitigation and Reconciliation":"Peace and Security","Peace and Security - General":"Peace and Security","Rule of Law and Human Rights":"Democracy, Human Rights, and Governance","Good Governance":"Democracy, Human Rights, and Governance","Political Competition and Consensus-Building":"Democracy, Human Rights, and Governance","Civil Society":"Democracy, Human Rights, and Governance","Democracy, Human Rights, and Governance - General":"Democracy, Human Rights, and Governance","HIV/AIDS":"Health","Tuberculosis":"Health","Malaria":"Health","Pandemic Influenza and Other Emerging Threats (PIOET)":"Health","Other Public Health Threats":"Health","Maternal and Child Health":"Health","Family Planning and Reproductive Health":"Health","Water Supply and Sanitation":"Health","Nutrition":"Health","Health - General":"Health","Basic Education":"Education And Social Services","Higher Education":"Education And Social Services","Policies, Regulations, and Systems":"Education And Social Services","Social Services":"Education And Social Services","Social Assistance":"Education And Social Services","Education and Social Services - General":"Education And Social Services","Macroeconomic Foundation for Growth":"Economic Development","Trade and Investment":"Economic Development","Financial Sector":"Economic Development","Infrastructure":"Economic Development","Agriculture":"Economic Development","Private Sector Competitiveness":"Economic Development","Economic Opportunity":"Economic Development","Labor Policies and Markets":"Economic Development","Manufacturing":"Economic Development","Mining and Natural Resources":"Economic Development","Economic Development - General":"Economic Development","Environment":"Environment","Natural Resources and Biodiversity":"Environment","Clean Productive Environment":"Environment","Environment - General":"Environment","Protection, Assistance and Solutions":"Humanitarian Assistance","Disaster Readiness":"Humanitarian Assistance","Migration Management":"Humanitarian Assistance","Humanitarian Assistance - Generall":"Humanitarian Assistance","Direct Administrative Costs":"Program Management","Monitoring and Evaluation":"Program Management","International Contributions":"Multi-sector","Debt Relief":"Multi-sector"};
		var stops = ["Worldwide", "Bureau for Management (USAID)", "Bureau for Policy, Planning and Learning (USAID)", "International Organizations and Development Institutions (US Treasury) - African Development Bank (AfDB)", "International Organizations and Development Institutions (US Treasury) - African Development Fund (AfDF)", "International Organizations and Development Institutions (US Treasury) - Asian Development Bank (AsDB)", "International Organizations and Development Institutions (US Treasury) - Asian Development Fund (AsDF)", "International Organizations and Development Institutions (US Treasury) - Clean Technology Fund (CTF)", "International Organizations and Development Institutions (US Treasury) - European Bank for Reconstruction & Development (EBRD)", "International Organizations and Development Institutions (US Treasury) - Global Agriculture and Food Security Program (GAFSP)", "International Organizations and Development Institutions (US Treasury) - Global Environment Facility (GEF)", "International Organizations and Development Institutions (US Treasury) - Inter-American Development Bank (IDB and FSO)", "International Organizations and Development Institutions (US Treasury) - Inter-American Investment Corporation (IIC)", "International Organizations and Development Institutions (US Treasury) - International Bank for Reconstruction and Development (IBRD)", "International Organizations and Development Institutions (US Treasury) - International Development Association (IDA)", "International Organizations and Development Institutions (US Treasury) - International Fund for Agricultural Development (IFAD)", "International Organizations and Development Institutions (US Treasury) - Multilateral Investment Fund (MIF)", "International Organizations and Development Institutions (US Treasury) - North American Development Bank (NADBank)", "International Organizations and Development Institutions (US Treasury) - Strategic Climate Funds (SCF)", "Office of Innovation and Development Alliances (USAID)", "U.S. Department of the Treasury - Global", "U.S. Department of the Treasury - Office of Technical Assistance - World-Wide Office", "USAID Administrative Costs", "USAID Democracy, Conflict and Humanitarian Assistance", "USAID Economic Growth, Education and Environment", "USAID Global Health", "USAID Inspector General Operating Expense", "USAID Legislative and Public Affairs (LPA)", "USAID Office of Development Partners", "USAID Operating Expense", "USAID Regional Development Mission-Asia", "USAID West Africa Regional"];
		var self = window.faid,
		elmnt = $(selector),
		hashed = {
			years:["2009","2010","2011","2012","2013"],
			columns:["0","1","2"],
			focus: null,
			hash: window.location.hash.substr(1).split("/")
		};

		function randomRange(min,max){return Math.floor(Math.random()*(max-min)+min);}
		function randomColor(){return "rgb("+randomRange(20,50)+","+randomRange(100,180)+","+randomRange(230,180)+")";}
		function log(output){console.log(output);}

		function init(){
			updateHash();
			location.hash = hashed.year+"/"+hashed.d1+"/"+hashed.d2+"/"+encodeURIComponent(hashed.focus);
			
			for(var key in categories){
				var sects = categories[key].sectors.split("|");
				categories[key].color = randomColor();
				sects.forEach(function(d){
					sectcat[d] = key;
				});
			}

			getData();

			// $(window).on('hashchange', function() {
			// 	updateHash();
			// 	hashChanged();
			// });
		}

		function getData(){
			$.getScript("js/data/aid_"+hashed.year+".js", function(data){
				self.year = hashed.year;
				self.aid = aid.filter(function(d){ return d[3]>=0 });
				//buildSankeyData(self.aid,hashed.d1,hashed.d2);
				buildTreeData(self.aid,1,2);
			});
		}

		function buildTreeData(input,dex1,dex2){
			var sandata = { nodes:[], links: [], lookup:{} };
			var tree_array = d3.nest()
				.key(function(d) { return d[dex1]; })
				.key(function(d) { return d[dex2]; })
				.rollup(function(leaves) { return d3.sum(leaves, function(d) { return parseFloat(d[3]);}); })
				.entries(input);
			
			var tree_obj = {"name":"tree","children":[]};
			tree_array.forEach(function(d){
				if(stops.indexOf(d.key)!=-1) return;
				var kids = d.values.map(function(child){
					return {"name":child.key,"size":child.values} 
				}).sort(function(a,b){return b.size-a.size});
				tree_obj.children.push({"name":d.key,"children":kids});
			});
			log(tree_obj);
			circlePack(tree_obj);
			// nested_array.forEach(function(d){
			// 	var source_val = sandata.lookup[d.key];
			// 	d.values.forEach(function(child){
			// 		if(hashed.focus){ if(d.key!=hashed.focus && child.key!=hashed.focus) return }
			// 		if(stops.indexOf(d.key)!=-1 || stops.indexOf(child.key)!=-1) return;
			// 		sandata.links.push({"source":source_val,"target":sandata.lookup[child.key],"value":child.values})
			// 	});
			// });
		}

		function sortKey(array,key){
			array.sort(function(a,b){return b[key[0]][key[1]]-a[key[0]][key[1]]});
			return array;
		}

		function circlePack(root){
			var margin = 2;
			self.width = $(window).width();
			self.height = $(window).height();
			self.nodez = [];
			var diameter = Math.min.apply(null, [self.width,self.height]);

			var color = d3.scale.linear()
			    .domain([-1, 5])
			    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
			    .interpolate(d3.interpolateHcl);

			var pack = d3.layout.pack()
			    .padding(10)
			    .sort(function(a,b){return b.value-a.value})
			    .size([diameter - margin, diameter - margin])
			    .value(function(d) { return d.size; })

			var svg = d3.select("#viz").append("svg")
			    .attr("width", diameter)
			    .attr("height", diameter)
			  .append("g")
			    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

			  var focus = root,
			      nodes = pack.nodes(root),
			      view;

			  //var circle = [];
			  var gees = svg.selectAll("g")
			      .data(nodes)
			    .enter().append("g")
			    .attr("class", function(d) { 
			      	if( d.parent && d.children){
			      		renderNode(this,d);
					}else{
			     		d3.select(this).remove();
			     		return;
			     	}
			      	return d.parent ? d.children ? "g_node" : "g_node g_node--leaf" : "g_node g_node--root"; 
			      })
			   	.on("click", function(d) { if (focus !== d) zoom(d,diameter), d3.event.stopPropagation(); });

			  self.nodez = sortKey(self.nodez,['__data__','value']);
			  log(self.nodez);
			  // var circle = svg.selectAll("circle")
			  //     .data(nodes)
			  //   .enter().append("circle")
			  //     .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
			  //     .style("fill", function(d) { if(!d.children){d3.select(this).remove(); }; return d.children ? color(d.depth) : null; })
			  //     .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

			  var text = svg.selectAll("text")
			      .data(nodes)
			    .enter().append("text")
			      .attr("class", "label")
			      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
			      .style("display", function(d) { if(!d.children){d3.select(this).remove()}; return d.parent === root ? null : "none"; })
			      .text(function(d) { var textarray = d.name.split(" ").splice(0,3); return (textarray.length>=3)? textarray.join(" ")+"..." : textarray.join(" "); });
			  

			  //var circle = d3.selectAll('circle');
			  //var arcs = d3.selectAll('.arc')
			  var node = svg.selectAll(".g_node"); //.g_node,text
			  var texts = svg.selectAll("text");

			  d3.select("body")
			      //.style("background", color(-1))
			      .on("click", function() { zoom(root,diameter); });

			  zoomTo([root.x, root.y, root.r * 2 + margin]);
			  //log(gees[0][1])


			  Array(1).join("|,").split(",").forEach(function(d,i){
			  	var speed = 555;
			  	setTimeout(function(){
			  		zoom(self.nodez[i].__data__,20);
			  		setTimeout(function(){rotatePie(self.nodez[i],speed)}, 888);
			  	}, (i)*(speed+333)*(self.nodez[i].__data__.children.length));
			  	//setTimeout(function(){rotatePie(self.nodez[i],20)}, (i+1)+1400);
			  })

			  function rotatePie(_d,speed){
			  	var g = d3.select(_d),
			  		speed = speed || 222,
			  		trans = g.attr("transform");
			  	//_d.__data__.children.forEach(function(d,i){});
			  	_d.__data__.children.forEach(function(d,i){
			  		d3.select(d.arc).classed("blurred",true)
			  		setTimeout(function(){
			  			setTimeout(function(){d3.select(d.arc).classed("blurred",false)},speed*0.6);
			  			var middle = ( (d.startAngle*(180/Math.PI)) + ( (d.endAngle*(180/Math.PI))-(d.startAngle*(180/Math.PI)) ) *0.5 )*-1;
			  			g.transition().duration(speed).attr("transform", trans+" rotate("+middle+")")
			  		},(i)*speed);
			  	});
			  }

			  function renderNode(g,_d){
					// d3.select(g).selectAll("circle")
				 //      .data([d])
				 //    .enter().append("circle")
				 //      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
				 //      .attr("r", 10)
				 //      .style("fill", function(d) { if(!d.children){d3.select(this).remove(); }; return d.children ? color(d.depth) : null; })
				 //      .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });
					var radius = _d.r;
					var arc = d3.svg.arc()
					    .outerRadius( (_d.r<=2)? 2 : _d.r )
					    .innerRadius( (_d.r<=2)? 0.6  : (_d.r - _d.r*0.3)-1 );
					var pie = d3.layout.pie()
					    //.sort(null)
					    .value(function(d) { return d.size; });

				   var gg = d3.select(g).selectAll(".arc")
				      .data(pie(_d.children))
				    .enter().append("g")
				      .attr("class", "garc");

				  	gg.append("path")
				      .attr("d", arc)
				      .attr("class", "arc")
				      .attr("title", function(d,i){ 
				      	_d.children[i].endAngle = d.endAngle; 
				      	_d.children[i].startAngle = d.startAngle;
				      	_d.children[i].arc = this;
				      	return d.data.name
				      })
				      .style("fill", function(d){return ( categories.hasOwnProperty(sectcat[d.data.name]) )? categories[sectcat[d.data.name]].color : "black"; });

				    self.nodez.push(g); 
			  }

			  function zoom(d,diam) {
			  	console.log(d)
			    var focus0 = focus; focus = d;
			    var margin = (d.r<=2)? 10 : (d.r>=diam*0.1)? 0 : d.r;
			    var transition = d3.transition()
			        .duration(750) //d3.event.hasOwnProperty("altKey") ? 7500 :
			        .tween("zoom", function() {
			          var i = d3.interpolate(view, [focus.x, focus.y, focus.r * 2 + (margin*0.5)]);
			          return function(t) { zoomTo(i(t),focus0, focus); };
			        });

			    // transition.selectAll("text")
			    //   .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
			    //     .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
			    //     .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
			    //     .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
			  }

			  function zoomTo(v,focus0,focus) {
			    var k = diameter / v[2]; view = v;
			    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ") scale("+(k)+")"; });
			    texts.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ") scale("+(zoomScale(k))+")"; });
			    //circle.attr("r", function(d) { return d.r * k; });

			    // gees.attr("title", function(d){ 
			    // 	//if(focus!=d && focus0!=d){return;}
			    // 	var radius = d.r * k;
			    // 	var arc = d3.svg.arc().outerRadius(radius).innerRadius(radius - (radius*0.5));
			    // 	d3.select(this).selectAll('.arc').attr("d", arc)
			    // 	return "";
			    // });
			  }

			d3.select(self.frameElement).style("height", diameter + "px");			
		}

		var zoomScale = d3.scale.linear().domain([1, 10, 200]).range([1, 4, 0.4]);

		function updateHash(){
			hashed.hash = window.location.hash.substr(1).split("/");
			hashed.year = ( hashed.years.indexOf(hashed.hash[0])!=-1 )? hashed.hash[0] : "2009";
			hashed.d1 = ( hashed.columns.indexOf(hashed.hash[1])!=-1 )? hashed.hash[1] : "2";
			hashed.d2 = ( hashed.columns.indexOf(hashed.hash[2])!=-1 )? (hashed.hash[2]==hashed.d1)? "1" : hashed.hash[2] : "1";
			hashed.focus = decodeURIComponent(hashed.hash[3]) || "";
		}

		function focusViz(d){
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
			"getData": getData
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

