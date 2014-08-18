(function(){ "use strict";

	window.faid = function(selector){
		var sectcat = {"Counter-Terrorism":"Peace and Security","Counterterrorism":"Peace and Security","Combating Weapons of Mass Destruction (WMD)":"Peace and Security","Stabilization Operations and Security Sector Reform":"Peace and Security","Counter-Narcotics":"Peace and Security","Transnational Crime":"Peace and Security","Conflict Mitigation and Reconciliation":"Peace and Security","Peace and Security - General":"Peace and Security","Rule of Law and Human Rights":"Democracy, Human Rights, and Governance","Good Governance":"Democracy, Human Rights, and Governance","Political Competition and Consensus-Building":"Democracy, Human Rights, and Governance","Civil Society":"Democracy, Human Rights, and Governance","Democracy, Human Rights, and Governance - General":"Democracy, Human Rights, and Governance","HIV/AIDS":"Health","Tuberculosis":"Health","Malaria":"Health","Pandemic Influenza and Other Emerging Threats (PIOET)":"Health","Pandemic Influenza and Other Emerging Threats":"Health","Other Public Health Threats":"Health","Maternal and Child Health":"Health","Family Planning and Reproductive Health":"Health","Water Supply and Sanitation":"Health","Nutrition":"Health","Health - General":"Health","Basic Education":"Education And Social Services","Higher Education":"Education And Social Services","Policies, Regulations, and Systems":"Education And Social Services","Social Policies, Regulations, and Systems":"Education And Social Services","Social Services":"Education And Social Services","Social Assistance":"Education And Social Services","Education and Social Services - General":"Education And Social Services","Macroeconomic Foundation for Growth":"Economic Development","Trade and Investment":"Economic Development","Financial Sector":"Economic Development","Infrastructure":"Economic Development","Agriculture":"Economic Development","Private Sector Competitiveness":"Economic Development","Economic Opportunity":"Economic Development","Labor Policies and Markets":"Economic Development","Manufacturing":"Economic Development","Mining and Natural Resources":"Economic Development","Economic Development - General":"Economic Development","Environment":"Environment","Natural Resources and Biodiversity":"Environment","Clean Productive Environment":"Environment","Environment - General":"Environment","Protection, Assistance and Solutions":"Humanitarian Assistance","Disaster Readiness":"Humanitarian Assistance","Migration Management":"Humanitarian Assistance","Humanitarian Assistance - General":"Humanitarian Assistance","Direct Administrative Costs":"Program Management","Monitoring and Evaluation":"Program Management","International Contributions":"Multi-sector","Debt Relief":"Multi-sector","Multi-Sector - Unspecified":"Multi-sector"};
		var stops = ["Worldwide", "Bureau for Management (USAID)", "Bureau for Policy, Planning and Learning (USAID)", "International Organizations and Development Institutions (US Treasury) - African Development Bank (AfDB)", "International Organizations and Development Institutions (US Treasury) - African Development Fund (AfDF)", "International Organizations and Development Institutions (US Treasury) - Asian Development Bank (AsDB)", "International Organizations and Development Institutions (US Treasury) - Asian Development Fund (AsDF)", "International Organizations and Development Institutions (US Treasury) - Clean Technology Fund (CTF)", "International Organizations and Development Institutions (US Treasury) - European Bank for Reconstruction & Development (EBRD)", "International Organizations and Development Institutions (US Treasury) - Global Agriculture and Food Security Program (GAFSP)", "International Organizations and Development Institutions (US Treasury) - Global Environment Facility (GEF)", "International Organizations and Development Institutions (US Treasury) - Inter-American Development Bank (IDB and FSO)", "International Organizations and Development Institutions (US Treasury) - Inter-American Investment Corporation (IIC)", "International Organizations and Development Institutions (US Treasury) - International Bank for Reconstruction and Development (IBRD)", "International Organizations and Development Institutions (US Treasury) - International Development Association (IDA)", "International Organizations and Development Institutions (US Treasury) - International Fund for Agricultural Development (IFAD)", "International Organizations and Development Institutions (US Treasury) - Multilateral Investment Fund (MIF)", "International Organizations and Development Institutions (US Treasury) - North American Development Bank (NADBank)", "International Organizations and Development Institutions (US Treasury) - Strategic Climate Funds (SCF)", "Office of Innovation and Development Alliances (USAID)", "U.S. Department of the Treasury - Global", "U.S. Department of the Treasury - Office of Technical Assistance - World-Wide Office", "USAID Administrative Costs", "USAID Democracy, Conflict and Humanitarian Assistance", "USAID Economic Growth, Education and Environment", "USAID Global Health", "USAID Inspector General Operating Expense", "USAID Legislative and Public Affairs (LPA)", "USAID Office of Development Partners", "USAID Operating Expense", "USAID Regional Development Mission-Asia", "USAID West Africa Regional"];
		var recipients_regional = ["Iraq", "Iran", "Joint Europe and Eurasia Regional","State Africa Regional","State Near East Regional/Middle East Partnership Initiative","Argentina","Belize","Bolivia","Brazil","Chile","Colombia","Costa Rica","Dominican Republic","Ecuador","El Salvador","Guatemala","Haiti","Honduras","Jamaica","Mexico","Nicaragua","Panama","Paraguay","Peru","Uruguay","Albania","Armenia","Benin","Burkina Faso","Cabo Verde","Georgia","Ghana","Indonesia","Jordan","Lesotho","Liberia","Madagascar","Malawi","Mali","Moldova","Mongolia","Morocco","Mozambique","Namibia","Nepal","Niger","Philippines","Rwanda","Senegal","Tanzania","Tunisia","Zambia","Azerbaijan","Botswana","Bulgaria","Cambodia","Cameroon","Caribbean Region","China","Ethiopia","Fiji","Gambia, The","Guinea","Guyana","Kenya","Kyrgyz Republic","Macedonia","Mauritania","Micronesia","Romania","Samoa","Sierra Leone","South Africa","Suriname","Swaziland","Thailand","Togo","Tonga","Turkmenistan","Uganda","Ukraine","Vanuatu","Africa Region","Burundi","Chad","Djibouti","Nigeria","Somalia","Zimbabwe","Belarus","Central Asia Region","Eurasia Region","Kazakhstan","Montenegro","Russia","Tajikistan","Uzbekistan","Afghanistan","Angola","Asia Region","Bangladesh","Burma","Congo, Democratic Republic of","East Africa Region","East Asia Region","India","Pakistan","Sri Lanka","Sudan, Pre-2011 Election","West Africa Region","Algeria","Central African Republic","Central American Region","Congo, Republic of","Cote d'Ivoire","Eastern European Region","Near East Region","South Africa Region","South Sudan","Sudan","Syrian Arab Republic","Yemen","Bosnia and Herzegovina","Egypt","Serbia","Kosovo","West Bank and Gaza","Comoros","Cuba","Cyprus","Eritrea","Ireland","Israel","Latin America and Caribbean Region","Lebanon","Libya","South Pacific Region","Timor-Leste","Turkey","USAID Middle East Regional","Venezuela","Vietnam","Laos","Papua New Guinea","South America Region","Barbados and Eastern Caribbean","Bhutan","Guinea-Bissau","Hungary","Japan","Korea, North","Korea, South","Maldives","Marshall Islands","New Zealand","Palau","Solomon Islands","South Asia Region","United Arab Emirates","Central Africa Region Program for Environment","Czech Republic","Equatorial Guinea","Gabon","Greece","Mauritius","Sao Tome and Principe","Seychelles","Taiwan","Canada","United Kingdom","Austria","Bahamas, The","Barbadas","Belgium","Croatia","Denmark","Dominica","Estonia","Finland","France","Germany","Grenada","Italy","Latvia","Lithuania","Malaysia","Netherlands","Norway","Oman","Poland","Portugal","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Singapore","Slovak Republic","Slovenia","Spain","Sweden","Switzerland","Trinidad and Tobago","Tuvalu","State Western Hemisphere Regional","Joint Eurasia Regional","USAID Central Asia Regional","Asia Middle East Regional","USAID Africa Regional","USAID Caribbean Regional","USAID Central America Regional","USAID East Africa Regional","USAID Latin America and Caribbean Regional","Food Security (USAID)","USAID Central Africa Regional","USAID South America Regional","USAID Southern Africa Regional","Near East Regional","Office of Afghanistan and Pakistan Affairs (USAID)","Antigua and Barbuda","Iceland","U.S. Department of the Treasury - Latin America and Caribbean","U.S. Department of the Treasury - Vietnam, Cambodia, Asia Regional","Kiribati"];
		var regioncolor = {"Middle East":{color:""},"Africa":{color:""},"Europe":{color:""},"Central America":{color:""},"South America":{color:""},"Asia":{color:""},"North America":{color:""},"Oceania":{color:""},"Worldwide":{color:""},"Internal":{color:""}};
		var self = window.faid,
		elmnt = $(selector),
		hashed = {
			years:["2009","2010","2011","2012","2013"],
			columns:[1,2],
			focus: null,
			hash: window.location.hash.substr(1).split("/")
		};

		function randomRange(min,max){return Math.floor(Math.random()*(max-min)+min);}
		function randomColor(){return "rgb("+randomRange(140,240)+","+randomRange(140,240)+","+randomRange(140,240)+")";}
		function log(output){console.log(output);}

		function init(){
			updateHash();
			location.hash = hashed.year+"/"+hashed.columns[0]+"/"+hashed.columns[1]+"/"+encodeURIComponent(hashed.focus);
			$("#year_button .fyear").text(hashed.year)
			self.columns = hashed.columns;
			//assign colors and and sectors to categories
			for(var key in categories){
				var sects = categories[key].sectors.split("|");
				categories[key].color = d3.rgb(randomColor());
				sects.forEach(function(d){
					sectcat[d] = key;
				});
			}
			for(var k in regioncolor) regioncolor[k].color = d3.rgb(randomColor());

			setSize();
			getData(hashed.columns);
			$(window).on('hashchange', function() {
				updateHash();
				if(self.columns[0]!=hashed.columns[0] || self.year!=hashed.year){
					hashChanged();
				} else {
					if(hashed.focus){
						findNode();
					}
				}
				self.columns = hashed.columns;
			});
			$("#year_list li").on("click", function(){
				var year = $(this).text();
				$("#year_button .fyear").text(year);
				location.hash = year+"/"+hashed.columns[0]+"/"+hashed.columns[1]+"/"+encodeURIComponent(hashed.focus);
			})
		}

		function updateHash(){
			hashed.hash = window.location.hash.substr(1).split("/");
			hashed.year = ( hashed.years.indexOf(hashed.hash[0])!=-1 )? hashed.hash[0] : "2013";
			hashed.columns = ( hashed.hash[1]==1 || hashed.columns.indexOf( parseInt(hashed.hash[1]) )==-1 )? [1,2] : [2,1];
			hashed.focus = decodeURIComponent(hashed.hash[3]) || "";
			hashed.focus = (hashed.focus==undefined)? "" : hashed.focus;
			var bt = (hashed.columns[0]==1)? "region" : "sector";
			$("#faid_bintype").text(bt);
		}

		function hashChanged(){
			removeSVG();
			if(hashed.year!=self.year){
				getData(hashed.columns);
			}else{
				buildTreeData(self.aid,hashed.columns[0],hashed.columns[1]);
			}
		}

		function getData(cols){
			$.getScript("js/data/aid_"+hashed.year+".js", function(data){
				self.year = hashed.year;
				self.aid = aid.filter(function(d){ return d[3]>=0 });
				buildTreeData(self.aid,hashed.columns[0],hashed.columns[1]);
			});
		}

		function setSize(){
			// x = w.innerWidth || e.clientWidth || g.clientWidth;
			// y = w.innerHeight|| e.clientHeight|| g.clientHeight;
			self.margin = 2; self.wst = $(window).scrollTop();
			self.width = $(selector).width();
			self.height = $(window).height();
			//self.winSpan = [self.height*0.4, self.height-self.height*0.4];
			self.winHalf = self.height*0.5;
			self.ox = self.width*0.35;
			self.dx = self.width*0.7;
			self.rectW = self.width*0.04;
			self.innerbend = self.width*0.02;
			self.opad = 10; 
			self.pad = [20, 0];
		}

		function updateSize(){
			setSize();
			self.wst = $(window).scrollTop();
			self.originScale.domain([0, self.tree_obj.size]).range([2, (self.height*12)]);//-(self.tree_obj.children.length*self.opad)

			var scrollsize = self.originScale(self.tree_obj.size)*(1.15)+(self.opad*self.tree_obj.children.length-1);
			self.oy = self.height*0.1;
			self.height = scrollsize;

			d3.select(selector).style("height", self.height+"px");
			self.headroom = {top:elmnt.offset().top, bottom:elmnt.outerHeight()}
			self.oheight = self.originScale(self.tree_obj.size)+(self.opad*self.tree_obj.children.length-1);
			//self.scrollScale = d3.scale.linear().domain([self.headroom.top, $(document).height()-$(window).height()]).range([self.oy, scrollsize-self.oheight-self.oy]);

			self.scrollScale = d3.scale.linear().domain([(self.headroom.top), $(document).height()-$(window).height()]).range([self.oy, scrollsize-self.oheight-self.oy]);
			
			self.stretch = d3.scale.linear().domain([-2, self.oheight]).range([self.oy, scrollsize-self.oheight-self.oy]);

			if(self.svg){
				self.svg.attr("width", self.width).attr("height", self.height);
				self.orects.attr("width",self.rectW).attr("height",function(d){return self.originScale(d.size);})
				self.sections.forEach(function(d){
					d3.select(d.rlab).attr("transform", "translate("+( (self.width-self.dx-self.rectW)*0.5 )+",-42)")
					d3.select(d.rline)
						.datum([{x:(self.ox)*-0.8,y:-10},{x:self.width*0.575,y:-10}])
						.attr("d", self.line)
				})
				if(self.wst>self.headroom.top){
					positionStacks(self.wst);
				} else {
					positionStacks(self.headroom.top);
				}
			}
		}

		function indexOfObject(_a, _key, _val) {
			for (var i = 0; i < _a.length; i++) {
				if (_a[i][_key] == _val) {
					return i;
				}	
			}
			return null;
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
				//if(stops.indexOf(d.key)!=-1) return;
				var kids = d.values.map(function(child){
					return {"name":child.key,"size":child.values} 
				}).sort(function(a,b){return b.size-a.size});
				self.tree_obj.children.push({"name":d.key,"children":kids});
			});

			self.bins = {};
			self.bintype = (hashed.columns[0]==1)? regions : sectcat;
			self.tree_obj.children.forEach(function(d){
				//assign the total size of children
			  	d.size = d.children.reduce(function(a,b){return {size: a.size + b.size};}).size; 
			  	
			  	//GROUPSORT: make groups for each category bin
			  	if(self.bintype==regions){
			  		var bin = (self.bintype.hasOwnProperty(d.name))? self.bintype[d.name] : "Internal";
			  		if(bin=="Internal") self.bintype[d.name] = "Internal";
			  	} else {
			  		var bin = self.bintype[d.name]
			  	}
			  	if(self.bins.hasOwnProperty(bin)){
			  		self.bins[bin].children.push(d);
			  	}else{
			  		self.bins[bin]={children:[d], size:0, name:bin};
			  	}
			});
			self.binarray = [];
			for(var k in self.bins){
				self.bins[k].size = self.bins[k].children.reduce(function(a,b){return {size: a.size + b.size};}).size;
				self.bins[k].children.sort(function(a,b){return b.size-a.size});
				self.binarray.push(self.bins[k]);
			}
			self.binarray.sort(function(a,b){return b.size-a.size});
			if(self.bintype==regions){
				var world=indexOfObject(self.binarray,"name","Worldwide"),
					intern=indexOfObject(self.binarray,"name","Internal");
				// self.binarray.splice(world,1);
				// self.binarray.splice(intern,1);
				if(world!=null)self.binarray.push(self.binarray.splice(world,1)[0])
				if(intern!=null)self.binarray.push(self.binarray.splice(intern,1)[0])
			}
			self.tree_obj.children  = self.binarray.reduce(function(a, b){return {children: a.children.concat(b.children)} }).children;

			self.tree_obj["size"] = self.tree_obj.children.reduce(function(a,b){return {size: a.size + b.size};}).size; 

			$("#faid_amount").text( valueClean(self.tree_obj.size,1) );
			
			//this sort is only needed if group sorting is not used
			//self.tree_obj.children.sort(function(a,b){return b.size-a.size})
			
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
			self.startScale = d3.scale.linear().domain([0, 100]).range([0, 8]);
			self.endScale = d3.scale.linear().domain([0, 100]).range([2, 100]);
			self.parallaxScale = d3.scale.linear().domain([0, 100]).range([0, 100]);
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
				.interpolate('monotone');

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
			//$('body').on('click',function(){console.log("wst = "+self.wst)})
			self.orects = self.gees.append("rect")
				.attr("class", "orect")
				.attr("width",self.rectW)
				.attr("height",function(d){return self.originScale(d.size);})
				.attr("x",0)
				.attr("y",0)
				.attr("fill", function(d){return colorChoice(d).toString()})
				.on("click",function(d,i){
					focusViz(d.name);
					scrollToNode(d,i);
				});
			var regionlab = "";
			self.sections = [];
			self.line = d3.svg.line().x(function(d){return d.x;}).y(function(d){return d.y;});
			self.olabels = self.gees.append("text")
				.attr("class", "olabel")
				.attr("x",-4)
				.attr("y",function(d){return self.originScale(d.size)*0.5;})
				.text(function(d){
					var bin = self.bintype[d.name];
					if(bin!=regionlab){
						regionlab = bin;
						var parent = d3.select(this)[0][0].parentElement;
						var rlab = "";
						d3.select(parent).append("text")
							.attr("class", "regionlabel")
							.attr("x",0)
							.attr("y",20)
							.attr("transform", function(d){
								rlab = this;
								return "translate("+( (self.width-self.dx-self.rectW)*0.5 )+",-42)";
							})
							.append('svg:tspan')
							.attr('x', 0)//(self.ox*-0.9)
							.attr('dy', 5)
							.text(regionlab+" : "+valueClean(self.bins[regionlab].size,1));
							// .append('svg:tspan')
							// .attr('x', 0)
							// .attr('dy', 20)
							// .text(valueClean(self.bins[regionlab].size,1))
						d3.select(parent).append('path')
							.datum([{x:(self.ox)*-0.8,y:-10},{x:self.width*0.575,y:-10}])
							.attr("d", self.line)
							.attr("class", function(d){
								self.sections.push({"rlab":rlab, "rline":this});
								return "rline";
							});
					}
					return d.name
				});
			self.ovlabels = self.gees.append("text")
				.attr("class", "ovlabel")
				.attr("x",-4)
				.attr("y",function(d){return self.originScale(d.size)*0.5;})
				.attr("dy", -22)
				.text(function(d){return valueClean(d.size,1) });

			self.focusGroup = {
				value:[],
				varea:[],
				dgs:[],
				gs:[],
				gn:[],
				main: null
			}

			positionStacks(self.headroom.top);

			$(window).on("scroll", function(){
				self.wst = $(window).scrollTop();
				if(self.wst>self.headroom.top){
					positionStacks(self.wst);
				} else {
					self.wst = self.headroom.top;
					positionStacks(self.headroom.top);
				}
			});
			if(hashed.focus){
				findNode();
			}
		}

		function findNode(){
			self.tree_obj.children.forEach(function(d,i){
				if(d.name===hashed.focus){
					scrollToNode(d,i);
				}
			})
		}

		function colorChoice(d){
			var color = ( categories.hasOwnProperty(sectcat[d.name]) )? categories[sectcat[d.name]].color : ( regioncolor.hasOwnProperty(regions[d.name]) )? regioncolor[regions[d.name]].color : d3.rgb("rgb(200,200,200)");
			return color;
		}

		function scrollToNode(d,i){
			//var direct = (self.focusGroup.main<i)? $(document).height()-$(window).height() : 0;
			// for(var iter=0; iter<2200; iter++){
			// 	self.wst+=(1*direct);
			// 	$(window).scrollTop(self.wst);
			// 	console.log(i);
			// 	console.log(self.focusGroup.main);
			// }

			// while (self.focusGroup.main!=i){
			// 	self.wst+=(1*direct);
			// 	$(window).scrollTop(self.wst);
			// }

			// $("html, body").animate({ scrollTop: direct },2222,"swing");

			var origin = self.originScale(d.stack)+((i)*self.opad);
			var yoff = self.headroom.top+origin;//+self.oy;
			var strch = self.stretch(origin);//faid.scrollScale.invert( self.stretch(origin) )
			var region = (indexOfObject(self.binarray, "name", self.bintype[d.name])+1)*60;
			var centered = (yoff-self.winHalf)+(origin*0.0001)+self.oy+region;//-19+(origin*0.005));//(yoff-self.winHalf+(i*0.01));
			// console.log("origin = "+origin);
			// console.log("self.stretch = "+ self.stretch(origin));
			// console.log("centered = "+centered);
			//$(window).scrollTop(centered);
			$("html, body").stop().animate({ scrollTop: centered },1000,"swing",function(){positionStacks(centered);});
		}

		function blurTest(i,name){
			if(i!=self.focusGroup.main){
				if(!d3.select(self.gees[0][i]).classed("blurred")){d3.select(self.gees[0][i]).classed("blurred",true);}
			}else{ 
				if(d3.select(self.gees[0][i]).classed("blurred")){d3.select(self.gees[0][i]).classed("blurred",false);}
			}
		}

		function positionStacks(wst){
			var region = {name:"", height:0};
			self.gees.attr("transform", function(d,i){
				var bin = self.bintype[d.name];
				var sectioned = (bin!=region.name)? 60 : 0;
				region.height += sectioned;
				var yoffset = self.originScale(d.stack)+(i*self.opad)+self.oy+region.height;//+self.scrollScale(wst);
				d.yoffset = yoffset;
				region.name = bin;
				blurTest(i,d.name);
				return "translate("+self.ox+","+yoffset+")";
			});

			self.focusGroup.value.forEach(function(d,i){
				var bcr = d3.select(self.focusGroup.gs[i]).select(".orect")[0][0].getBoundingClientRect();
				var vH = vareaDimens(d,self.pad,0,0)[0].height;
				self.parallaxScale.domain([0,bcr.height]).range([0,vH]);
				var newData = vareaStack(d,self.pad,0, self.parallaxScale(self.winHalf-bcr.top)*-1 ); //(wst*-0.4+(yoff*10))
				self.focusGroup.varea[i].data(newData.links).attr("d", self.area);
				self.focusGroup.dgs[i].data(newData.drects).attr("transform", function(d,i){
					return "translate("+d.x+","+d.y1+")";
				});
			});

			if(self.wst < self.headroom.top && self.focusGroup.main!=0){
					 self.focusGroup.main=0;
			}

			self.gees[0].forEach(function(d,i){
				var bcr = d3.select(self.gees[0][i]).select(".orect")[0][0].getBoundingClientRect();
				if(self.focusGroup.main==0 && self.focusGroup.main==i && self.focusGroup.gn.indexOf(i)==-1){
					bindVarea(i);
				} else if(bcr.top-self.opad*0.5 <= self.winHalf && (bcr.top+bcr.height+self.opad*0.5) >= self.winHalf){
					if(self.focusGroup.gn.indexOf(i)==-1) bindVarea(i); self.focusGroup.main=i;
					// if(self.focusGroup.gn.indexOf(i-1)==-1 && self.gees[0][i-1]) bindVarea(i-1);
					// if(self.focusGroup.gn.indexOf(i+1)==-1 && self.gees[0][i+1]) bindVarea(i+1);
				} else {
					if(self.wst < self.headroom.top+self.oy*0.15 && i==0){
					}else if(i==self.focusGroup.gn[0]){removeVarea(i);}
				}

			});
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

			self.dgs = d3.select(self.gees[0][n]).selectAll("dg")
				.data(vareaData.drects).enter()
				.append("g").attr("class", "dg")
				.attr("transform", function(d){return "translate("+d.x+","+d.y1+")";})
				.on("click",function(d,i){
					hashed.columns = (hashed.columns[0]==1)? [2,1] : [1,2];
					focusViz(d.name);
				});

			self.drects = self.dgs.append("rect")
				.attr("class", 'drect')
				.attr("x", 0)//function(d){return d.x})
				.attr("y", 0)//function(d){return d.y1})
				.attr("width", self.rectW)
				.attr("height", function(d){return d.y0})
				//.attr("stroke", function(d){ return d.clr })
				.attr("fill", function(d){ return d.clr });//url(#linkgrad)
			self.dgs.append("text")
				.attr("class", 'dlabel')
				.attr("x", self.rectW+4)
				.attr("y", function(d){return d.y0*0.5})
				.text(function(d){return d.name});
			self.dgs.append("text")
				.attr("class", "dlabel dvlabel")
				.attr("x",-4)
				.attr("y",function(d){return d.y0*0.5})
				.text(function(d){return valueClean(d.size,1)});		

			self.focusGroup.value.push(self.values);
			self.focusGroup.varea.push(self.varea);
			self.focusGroup.dgs.push(self.dgs);
			self.focusGroup.gs.push(self.gees[0][n]);
			self.focusGroup.gn.push(n);
			positionStacks(self.wst);
		}

		function valueClean(val,decimal){
			if(val*0.000000001 > 1){
				return "$"+(val*0.000000001).toFixed(decimal)+"B";
			} else if(val*0.000001 > 1){
				return "$"+(val*0.000001).toFixed(decimal)+"M";
			} else if(val*0.001 > 1){//if(val*0.001 > 0)
				return "$"+(val*0.001).toFixed(decimal)+"K";
			} else {
				return "$"+(val).toFixed(decimal);	
			}
		}

		function removeVarea(n){
			var index = self.focusGroup.gn.indexOf(n);
			if(index == -1) return;
			self.focusGroup.varea[index].remove();
			self.focusGroup.dgs[index].remove();

			self.focusGroup.value.splice(index,1);
			self.focusGroup.varea.splice(index,1);
			self.focusGroup.dgs.splice(index,1);
			self.focusGroup.gs.splice(index,1);
			self.focusGroup.gn.splice(index,1);
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
				color = colorChoice(d),
				dat = [
					{x: self.rectW, y1: startone, y0: startzero, clr: color.brighter(0.1).toString() , name:d.name}, 
					{x: self.rectW+self.innerbend, y1: startone, y0: startzero}, 
					{x: self.width-self.dx-self.rectW-self.innerbend, y1: endone, y0: endzero}, 
					{x: self.width-self.dx-self.rectW, y1: endone, y0: endzero}
				];
				rectD.push({x: self.width-self.dx-self.rectW, y1: endone, y0: endzero-endone, clr: color.darker(0.1).toString(), name:d.name, size:d.val});
				_p1 = startzero+_pad[1]-2;
				_p0 = endzero+_pad[0];
				return dat;
			});
			return {links:_astack, drects:rectD};
		}

		function vareaDimens(_a, _pad, _p1, _p0){
				//_a.sort(function(a,b){return b-a});
				//self.startScale.domain([0, d3.max(_a)]);
				self.endScale.domain([0, d3.max(_a.map(function(d){return d.val;}))]); d3.max(_a);
				
				var stackH1 = 0, stackH0 = 0, ph1 = _p1, ph0 = _p0;
				_a.forEach(function(d){
					stackH1 = self.originScale(d.val)+ph1+_pad[1];
					ph1 = stackH1;
					stackH0 = self.endScale(d.val)+ph0+_pad[0];
					ph0 = stackH0;
					//console.log( Math.abs(ph1-ph0) ); //close to being straight?
				});
				ph0-=_pad[0];
				ph1-=_pad[1];

				return {0:{start:_p0, end:ph0, height:Math.ceil(ph0-_p0)}, 1:{start:_p1, end:ph1, height:Math.ceil(ph1-_p1)}};
		}

		function removeSVG(){
			self.svg.remove();
		}

		function focusViz(name){
			hashed.focus = name;
			location.hash = hashed.year+"/"+hashed.columns[0]+"/"+hashed.columns[1]+"/"+encodeURIComponent(hashed.focus);
		}

		self.api = {
			"getData": getData
		}

		init();
		return self.api;
	};
	
}( window || (window = {}) ) );