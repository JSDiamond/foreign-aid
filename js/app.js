(function(){ "use strict";

	window.faid = function(selector){
		var sectcat = {"Counter-Terrorism":"Peace and Security","Combating Weapons of Mass Destruction (WMD)":"Peace and Security","Stabilization Operations and Security Sector Reform":"Peace and Security","Counter-Narcotics":"Peace and Security","Transnational Crime":"Peace and Security","Conflict Mitigation and Reconciliation":"Peace and Security","Peace and Security - General":"Peace and Security","Rule of Law and Human Rights":"Democracy, Human Rights, and Governance","Good Governance":"Democracy, Human Rights, and Governance","Political Competition and Consensus-Building":"Democracy, Human Rights, and Governance","Civil Society":"Democracy, Human Rights, and Governance","Democracy, Human Rights, and Governance - General":"Democracy, Human Rights, and Governance","HIV/AIDS":"Health","Tuberculosis":"Health","Malaria":"Health","Pandemic Influenza and Other Emerging Threats (PIOET)":"Health","Other Public Health Threats":"Health","Maternal and Child Health":"Health","Family Planning and Reproductive Health":"Health","Water Supply and Sanitation":"Health","Nutrition":"Health","Health - General":"Health","Basic Education":"Education And Social Services","Higher Education":"Education And Social Services","Policies, Regulations, and Systems":"Education And Social Services","Social Services":"Education And Social Services","Social Assistance":"Education And Social Services","Education and Social Services - General":"Education And Social Services","Macroeconomic Foundation for Growth":"Economic Development","Trade and Investment":"Economic Development","Financial Sector":"Economic Development","Infrastructure":"Economic Development","Agriculture":"Economic Development","Private Sector Competitiveness":"Economic Development","Economic Opportunity":"Economic Development","Labor Policies and Markets":"Economic Development","Manufacturing":"Economic Development","Mining and Natural Resources":"Economic Development","Economic Development - General":"Economic Development","Environment":"Environment","Natural Resources and Biodiversity":"Environment","Clean Productive Environment":"Environment","Environment - General":"Environment","Protection, Assistance and Solutions":"Humanitarian Assistance","Disaster Readiness":"Humanitarian Assistance","Migration Management":"Humanitarian Assistance","Humanitarian Assistance - Generall":"Humanitarian Assistance","Direct Administrative Costs":"Program Management","Monitoring and Evaluation":"Program Management","International Contributions":"Multi-sector","Debt Relief":"Multi-sector"};
		var stops = ["Worldwide", "Bureau for Management (USAID)", "Bureau for Policy, Planning and Learning (USAID)", "International Organizations and Development Institutions (US Treasury) - African Development Bank (AfDB)", "International Organizations and Development Institutions (US Treasury) - African Development Fund (AfDF)", "International Organizations and Development Institutions (US Treasury) - Asian Development Bank (AsDB)", "International Organizations and Development Institutions (US Treasury) - Asian Development Fund (AsDF)", "International Organizations and Development Institutions (US Treasury) - Clean Technology Fund (CTF)", "International Organizations and Development Institutions (US Treasury) - European Bank for Reconstruction & Development (EBRD)", "International Organizations and Development Institutions (US Treasury) - Global Agriculture and Food Security Program (GAFSP)", "International Organizations and Development Institutions (US Treasury) - Global Environment Facility (GEF)", "International Organizations and Development Institutions (US Treasury) - Inter-American Development Bank (IDB and FSO)", "International Organizations and Development Institutions (US Treasury) - Inter-American Investment Corporation (IIC)", "International Organizations and Development Institutions (US Treasury) - International Bank for Reconstruction and Development (IBRD)", "International Organizations and Development Institutions (US Treasury) - International Development Association (IDA)", "International Organizations and Development Institutions (US Treasury) - International Fund for Agricultural Development (IFAD)", "International Organizations and Development Institutions (US Treasury) - Multilateral Investment Fund (MIF)", "International Organizations and Development Institutions (US Treasury) - North American Development Bank (NADBank)", "International Organizations and Development Institutions (US Treasury) - Strategic Climate Funds (SCF)", "Office of Innovation and Development Alliances (USAID)", "U.S. Department of the Treasury - Global", "U.S. Department of the Treasury - Office of Technical Assistance - World-Wide Office", "USAID Administrative Costs", "USAID Democracy, Conflict and Humanitarian Assistance", "USAID Economic Growth, Education and Environment", "USAID Global Health", "USAID Inspector General Operating Expense", "USAID Legislative and Public Affairs (LPA)", "USAID Office of Development Partners", "USAID Operating Expense", "USAID Regional Development Mission-Asia", "USAID West Africa Regional"];
		var recipients_regional = ["Iraq", "Iran", "Joint Europe and Eurasia Regional","State Africa Regional","State Near East Regional/Middle East Partnership Initiative","Argentina","Belize","Bolivia","Brazil","Chile","Colombia","Costa Rica","Dominican Republic","Ecuador","El Salvador","Guatemala","Haiti","Honduras","Jamaica","Mexico","Nicaragua","Panama","Paraguay","Peru","Uruguay","Albania","Armenia","Benin","Burkina Faso","Cabo Verde","Georgia","Ghana","Indonesia","Jordan","Lesotho","Liberia","Madagascar","Malawi","Mali","Moldova","Mongolia","Morocco","Mozambique","Namibia","Nepal","Niger","Philippines","Rwanda","Senegal","Tanzania","Tunisia","Zambia","Azerbaijan","Botswana","Bulgaria","Cambodia","Cameroon","Caribbean Region","China","Ethiopia","Fiji","Gambia, The","Guinea","Guyana","Kenya","Kyrgyz Republic","Macedonia","Mauritania","Micronesia","Romania","Samoa","Sierra Leone","South Africa","Suriname","Swaziland","Thailand","Togo","Tonga","Turkmenistan","Uganda","Ukraine","Vanuatu","Africa Region","Burundi","Chad","Djibouti","Nigeria","Somalia","Zimbabwe","Belarus","Central Asia Region","Eurasia Region","Kazakhstan","Montenegro","Russia","Tajikistan","Uzbekistan","Afghanistan","Angola","Asia Region","Bangladesh","Burma","Congo, Democratic Republic of","East Africa Region","East Asia Region","India","Pakistan","Sri Lanka","Sudan, Pre-2011 Election","West Africa Region","Algeria","Central African Republic","Central American Region","Congo, Republic of","Cote d'Ivoire","Eastern European Region","Near East Region","South Africa Region","South Sudan","Sudan","Syrian Arab Republic","Yemen","Bosnia and Herzegovina","Egypt","Serbia","Kosovo","West Bank and Gaza","Comoros","Cuba","Cyprus","Eritrea","Ireland","Israel","Latin America and Caribbean Region","Lebanon","Libya","South Pacific Region","Timor-Leste","Turkey","USAID Middle East Regional","Venezuela","Vietnam","Laos","Papua New Guinea","South America Region","Barbados and Eastern Caribbean","Bhutan","Guinea-Bissau","Hungary","Japan","Korea, North","Korea, South","Maldives","Marshall Islands","New Zealand","Palau","Solomon Islands","South Asia Region","United Arab Emirates","Central Africa Region Program for Environment","Czech Republic","Equatorial Guinea","Gabon","Greece","Mauritius","Sao Tome and Principe","Seychelles","Taiwan","Canada","United Kingdom","Austria","Bahamas, The","Barbadas","Belgium","Croatia","Denmark","Dominica","Estonia","Finland","France","Germany","Grenada","Italy","Latvia","Lithuania","Malaysia","Netherlands","Norway","Oman","Poland","Portugal","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Singapore","Slovak Republic","Slovenia","Spain","Sweden","Switzerland","Trinidad and Tobago","Tuvalu","State Western Hemisphere Regional","Joint Eurasia Regional","USAID Central Asia Regional","Asia Middle East Regional","USAID Africa Regional","USAID Caribbean Regional","USAID Central America Regional","USAID East Africa Regional","USAID Latin America and Caribbean Regional","Food Security (USAID)","USAID Central Africa Regional","USAID South America Regional","USAID Southern Africa Regional","Near East Regional","Office of Afghanistan and Pakistan Affairs (USAID)","Antigua and Barbuda","Iceland","U.S. Department of the Treasury - Latin America and Caribbean","U.S. Department of the Treasury - Vietnam, Cambodia, Asia Regional","Kiribati"];
		var self = window.faid,
		elmnt = $(selector),
		hashed = {
			years:["2009","2010","2011","2012","2013"],
			columns:["0","1","2"],
			focus: null,
			hash: window.location.hash.substr(1).split("/")
		};

		function randomRange(min,max){return Math.floor(Math.random()*(max-min)+min);}
		function randomColor(){return "rgb("+randomRange(180,240)+","+randomRange(180,240)+","+randomRange(180,240)+")";}
		function log(output){console.log(output);}

		function init(){
			updateHash();
			location.hash = hashed.year+"/"+hashed.d1+"/"+hashed.d2+"/"+encodeURIComponent(hashed.focus);
			
			//assign colors and and sectors to categories
			for(var key in categories){
				var sects = categories[key].sectors.split("|");
				categories[key].color = randomColor();
				sects.forEach(function(d){
					sectcat[d] = key;
				});
			}
			setSize();
			getData();

			// $(window).on('hashchange', function() {
			// 	updateHash();
			// 	hashChanged();
			// });
		}

		function setSize(){
			// x = w.innerWidth || e.clientWidth || g.clientWidth;
			// y = w.innerHeight|| e.clientHeight|| g.clientHeight;
			self.margin = 2; self.wst = $(window).scrollTop();
			self.width = $(window).width();
			self.height = $(window).height();
			self.ox = self.width*0.1;
			self.dx = self.width*0.5;
			self.rectW = self.width*0.06;
			self.innerbend = self.width*0.08;
			self.opad = 4; 
		}
		function updateSize(){
			setSize();
			self.wst = $(window).scrollTop();
			self.originScale.domain([0, self.tree_obj.size]).range([2, (self.height*1.5)]);//-(self.tree_obj.children.length*self.opad)
			//var scrollorigin = (self.height*0.7)*2+(self.originScale(self.tree_obj.size)+(self.opad*self.tree_obj.children.length));
			//var scrollmadness = self.tree_obj.size*0.00001;
			var scrollsize = self.originScale(self.tree_obj.size)*(self.height*0.08)+(self.opad*self.tree_obj.children.length);
			self.scrollScale = d3.scale.linear().domain([0, scrollsize]).range([0, self.originScale(self.tree_obj.size)+(self.opad*self.tree_obj.children.length)]);
			d3.select("#scrollspace").style("height", scrollsize+"px");

			if(self.svg){
				self.svg.attr("width", self.width).attr("height", self.height);

				self.wst = $(window).scrollTop();
				positionStacks();
			}
		}

		function getData(){
			$.getScript("js/data/aid_"+hashed.year+".js", function(data){
				self.year = hashed.year;
				self.aid = aid.filter(function(d){ return d[3]>=0 });
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
			
			self.tree_obj = {"name":"tree","children":[]};
			tree_array.forEach(function(d){
				if(stops.indexOf(d.key)!=-1) return;
				var kids = d.values.map(function(child){
					return {"name":child.key,"size":child.values} 
				}).sort(function(a,b){return b.size-a.size});
				self.tree_obj.children.push({"name":d.key,"children":kids});
			});
			self.tree_obj.children.forEach(function(d){
			  	d.size = d.children.reduce(function(a,b){return {size: a.size + b.size};}).size; 
			});
			self.tree_obj["size"] = self.tree_obj.children.reduce(function(a,b){return {size: a.size + b.size};}).size; 
			self.tree_obj.children.sort(function(a,b){return b.size-a.size})
			log(self.tree_obj);
			self.originScale = d3.scale.linear().domain([0, self.tree_obj.size]).range([2, (self.height*1.5)]);//-(self.tree_obj.children.length*self.opad)
			updateSize();

			$(window).on("resize", updateSize);

			renderLayout(self.tree_obj);
		}


		function sortKey(array,key){
			array.sort(function(a,b){return b[key[0]][key[1]]-a[key[0]][key[1]]});
			return array;
		}

		function renderLayout(root){
			self.nodez = [];

			self.startScale = d3.scale.linear().domain([0, 100]).range([0, 8]);
			self.endScale = d3.scale.linear().domain([0, 100]).range([2, 100]);
			var line = d3.svg.line()
				.defined(function(d) { return String(d.y) != 'NaN'; })
				.x(function(d) {return d.x;})
				.y(function(d) {return (String(d.y) == 'NaN')? 0 : d.y;});
				// line.interpolate('cardinal');
			self.area = d3.svg.area()
				.defined(function(d) { return String(d.y) != 'NaN'; })
				.x(function(d) { return d.x; })
				.y1(function(d) { return d.y1; })
				.y0(function(d) { return d.y0 })
				.interpolate('basis');

			// var color = d3.scale.linear()
			//     .domain([-1, 5])
			//     .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
			//     .interpolate(d3.interpolateHcl);

			self.svg = d3.select("#viz").append("svg")
			    .attr("width", self.width)
			    .attr("height", self.height); //self.originScale(root.size)+(root.children.length*self.opad)
			var g1 = self.svg.append("g");

			root.children.forEach(function(d,i){
				var offest = (i===0)? 0 : root.children[i-1].stack+root.children[i-1].size;
			  	d.stack = offest; 
			});

			self.gees = g1.selectAll("g")
				.data(root.children)
				.enter().append("g")
				.attr("class", function(d){ return d.parent ? d.children ? "g_node" : "g_node g_node--leaf" : "g_node g_node--root"; })

			self.orects = self.gees.append("rect")
				.attr("class", "orect")
				.attr("width",self.rectW)
				.attr("height",0)
				.attr("x",0)
				.attr("y",0);

			self.pad = [20, 0];
			self.valueGroup = [];
			self.vareaGroup = [];
			self.drectGroup = [];
			self.originFocus = 1;
			bindVarea(0);
			// bindVarea(3);
			// bindVarea(5);
			// bindVarea(10);
			// bindVarea(100);

			positionStacks();
			  // self.nodez = sortKey(self.nodez,['__data__','value']);
			  // var node = self.svg.selectAll(".g_node"); //.g_node,text
			function renderNode(g,_d){
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

			$(window).on("scroll", function(){
				//console.log($(window).scrollTop());
				self.wst = $(window).scrollTop();
				positionStacks();
				// prevY0 = wst*-1;
				// prevY1 = 220 + wst*-0.04;
				// var newData = vareaStack(values,pad,prevY1,prevY0); 
				// vstack.data(newData).attr("d", area);
			});
		}

		function positionStacks(){
			self.gees.attr("transform", function(d,i){
				//var yoffset = self.height*0.4+self.originScale(d.stack)+(i*self.opad)-(self.wst*0.04);
				var yoffset = self.originScale(d.stack)+(i*self.opad)+self.scrollScale(self.wst)*-1//-(self.wst*0.04);
				d.yoffset = yoffset;
				return "translate("+self.ox+","+yoffset+")";
			});
			self.orects.attr("width", self.rectW)
				.attr("height",function(d,i){ return self.originScale(d.size); });

			//log( self.scrollScale( self.gees[0][0].__data__.yoffset ) );

			self.valueGroup.forEach(function(d,i){
				var yoff = self.gees[0][i].__data__.yoffset;
				var newData = vareaStack(d,self.pad,0, 0 ); //(self.wst*-0.4+(yoff*10))
				self.vareaGroup[i].data(newData.links).attr("d", self.area);
				self.drectGroup[i].data(newData.drects).attr("x", function(d){return d.x})
					.attr("y", function(d){return d.y1})
					.attr("width", self.rectW)
					.attr("height", function(d){return d.y0});
			});

			// var first = [newData.links[0][0].y1, newData.links[0][3].y1];
			// var last = [newData.links[newData.links.length-1][0].y1, newData.links[newData.links.length-1][3].y1];
			// if(last[1]<=last[0]-40)console.log("self.originFocus + 1");
			// if(first[1]>=first[0]+40)console.log("self.originFocus - 1");
		}

		function bindVarea(n){
			var prevY1 = 0, prevY0 = 0;
			self.values = self.gees[0][n].__data__.children.map(function(d){ return {name:d.name, val:d.size}; });
			//log(self.values.reduce(function(a,b){return a+b;}));
			var vareaData = vareaStack(self.values,self.pad,prevY1,prevY0);
			self.varea = d3.select(self.gees[0][n]).selectAll("varea").data(vareaData.links).enter().append("path")
				.attr("class", 'varea')
				.attr("d", self.area)
				.attr("fill", function(d){ return d[0].clr });//url(#linkgrad)

			self.drects = d3.select(self.gees[0][n]).selectAll("Drect").data(vareaData.drects).enter().append("rect")
				.attr("class", 'drect')
				.attr("x", function(d){return d.x})
				.attr("y", function(d){return d.y1})
				.attr("width", self.rectW)
				.attr("height", function(d){return d.y0})
				//.attr("stroke", function(d){ return d.clr })
				.attr("fill", function(d){ return d.clr });//url(#linkgrad)
			self.valueGroup.push(self.values);
			self.vareaGroup.push(self.varea);
			self.drectGroup.push(self.drects);
		}

		function vareaDimens(_a, _pad, _p1, _p0){
				//_a.sort(function(a,b){return b-a});
				self.startScale.domain([0, d3.max(_a)]);
				self.endScale.domain([0, d3.max(_a)]);
				
				var stackH1 = 0, stackH0 = 0, ph1 = _p1, ph0 = _p0;
				_a.forEach(function(d){
					stackH1 = self.startScale(d)+ph1+_pad[1];
					ph1 = stackH1;
					stackH0 = self.endScale(d)+ph0+_pad[0];
					ph0 = stackH0;
					//console.log( Math.abs(ph1-ph0) ); //close to being straight?
				});
				ph0-=_pad[0];
				ph1-=_pad[1];

				return {0:{start:_p0, end:ph0, height:Math.ceil(ph0-_p0)}, 1:{start:_p1, end:ph1, height:Math.ceil(ph1-_p1)}};
		}


		function vareaStack(_a, _pad, _p1, _p0){
			//_a.sort(function(a,b){return b-a});
			//self.startScale.domain([0, d3.max(_a)]);//d3.min(_a)
			self.endScale.domain([0, d3.max(_a.map(function(d){return d.val;}))]); d3.max(_a);
			var rectD = []
			var _astack = _a.map(function(d,i){ 
				var startone = _p1,
				startzero = self.originScale(d.val)+_p1,
				endone = _p0,
				endzero = self.endScale(d.val)+_p0,
				color = ( categories.hasOwnProperty(sectcat[d.name]) )? categories[sectcat[d.name]].color : "black",
				dat = [
					{x: self.rectW, y1: startone, y0: startzero, clr: color, name:d.name}, 
					{x: self.rectW+self.innerbend, y1: startone, y0: startzero}, 
					{x: self.width-self.dx-self.rectW-self.innerbend, y1: endone, y0: endzero}, 
					{x: self.width-self.dx-self.rectW, y1: endone, y0: endzero}
				];
				rectD.push({x: self.width-self.dx-self.rectW, y1: endone, y0: endzero-endone, clr: color, name:d.name});
				_p1 = startzero+_pad[1]-2;
				_p0 = endzero+_pad[0];
				return dat;
			});
			return {links:_astack, drects:rectD};
		}

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

