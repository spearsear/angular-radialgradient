angular.module("rgDemoApp",["radialgradient.module"])
	.controller("mainCtrl",function($scope){
		//the configured result is stored in rgConfigured
		$scope.viewFunc = function(){
			//execute this func after rgChooser is configured
			rg_eue_func();
		}
		$scope.rgConfigured = {
			width:276,
			height:276,
			center:{
				x:0.427536231884058,
				y:0.4927536231884058,
				name:"center",
				ctrl_color:"orange"
			},
			focal:{
				x:0.5362318840579711,
				y:0.42391304347826086,
				name:"focal",
				ctrl_color:"pink"
			},
			radius:0.5,
			transform:{
				rotate:0,
				translate:{
					x:0,
					y:0,
					name:"translate",
					ctrl_color:"blue"
				},
				scale:{
					x:1,
					y:1,
					name:"scale",
					ctrl_color:"red"
				}
			},
			opacity:0.6,
			stops:[
				{offset:"0",color:"rgb(209,46,46)",opacity:1},
				{offset:"1",color:"rgb(0,0,0)",opacity:0}
			],
			colors:[
				{original:true,color:"#d12e2e"},
				{original:false,color:"#bc2929"},
				{original:false,color:"#a72525"},
				{original:false,color:"#922020"},
				{original:false,color:"#7d1c1c"},
				{original:false,color:"#691717"},
				{original:false,color:"#541212"},
				{original:false,color:"#3f0e0e"},
				{original:false,color:"#2a0909"},
				{original:false,color:"#150505"},
				{original:true,color:"#000000"}
			]
		};
		$scope.shapes = [
			{shape:'rect',pos:{x:30,y:30,width:40,height:80}},
			{shape:'rect',pos:{x:80,y:30,width:40,height:80}},
			{shape:'rect',pos:{x:130,y:30,width:40,height:80}}
		];
		//$scope.$watch('rgConfigured',function(newVal){
		//	rg_eue_func();
		//},true)


		var svg = d3.select('.demoDrawing').select('svg');
		var rgdata = [$scope.rgConfigured];

		//make radialgradient according to rgConfigured
		//enter/update/exit in one func
		var rg_eue_func = function(){
			console.log("eue called.")
			var svg_defs;
			if(svg.select('defs')[0][0]==null){
				svg_defs = svg.append('defs');
			}else{
				svg_defs = svg.select('defs');
			}
			var rg = svg_defs.selectAll('radialGradient')
					.data(rgdata);
			//rg.exit().remove();
			rg.enter()
				.append('radialGradient')
				.attr("id",function(d,i){
					return 'rg'+(i+1);
				})
				.attr("gradientUnits","objectBoundingBox");
			rg.attr("cx",function(d){
					return d.center.x;
				})
				.attr("cy",function(d){
					return d.center.y;
				})
				.attr("r",function(d){
					return d.radius;
				})
				.attr("fx",function(d){
					return d.focal.x;
				})
				.attr("fx",function(d){
					return d.focal.y;
				})
				.attr("spreadMethod","pad")
				.attr("gradientTransform",function(d){
					return "rotate("+d.transform.rotate+","+d.center.x+","+d.center.y+") translate("+d.transform.translate.x+","+d.transform.translate.y+") scale("+d.transform.scale.x+","+d.transform.scale.y+")"
				});

			var rg_stops = rg.selectAll("stop")
				.data($scope.rgConfigured.stops);
			rg_stops.exit().remove();
			rg_stops.enter()
				.append("stop");
			rg_stops.attr("offset",function(d){
						return d.offset;
					})
					.attr("style",function(d){
						return "stop-color:"+d.color+";stop-opacity:"+d.opacity;
					});
		};

		//rg_eue_func();

		svg.selectAll('rect')
			.data($scope.shapes)
			.enter()
			.append('rect')
			.attr("x",function(d){
				return d.pos.x;
			})
			.attr("y",function(d){
				return d.pos.y;
			})
			.attr("width",function(d){
				return d.pos.width;
			})
			.attr("height",function(d){
				return d.pos.height;
			})
			.attr("fill","url(#rg1)");

	})