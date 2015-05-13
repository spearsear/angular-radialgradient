angular.module("rgDemoApp",["radialgradient.module"])
	.controller("mainCtrl",['$scope','$window',function($scope,$window){
		//the configured result is stored in rgConfigured
		$scope.viewFunc = function(){
			//execute this func after rgChooser is configured
			rg_eue_func();
		}
		$scope.d3 = $window.d3;
		$scope.rgConfigured = {"width":276,"height":276,"center":{"x":0.5036231884057971,"y":0.8623188405797102,"name":"center","ctrl_color":"orange"},"focal":{"x":0.4963768115942029,"y":0.009130434782608698,"name":"focal","ctrl_color":"pink"},"radius":0.15217391304347827,"transform":{"rotate":0,"translate":{"x":0,"y":0,"name":"translate","ctrl_color":"blue"},"scale":{"x":1,"y":1,"name":"scale","ctrl_color":"red"}},"opacity":0.8572463768115942,"stops":[{"offset":"0","color":"rgb(72,18,227)","opacity":0.8572463768115942},{"offset":"0.4","color":"rgb(18,48,153)","opacity":0.5143478260869565},{"offset":"0.9","color":"rgb(64,76,122)","opacity":0.0857246376811594},{"offset":"1","color":"rgb(37,56,122)","opacity":0}],"colors":[{"original":true,"color":"#4812e3"},{"original":false,"color":"#3b1ad1"},{"original":false,"color":"#2d21be"},{"original":false,"color":"#2029ac"},{"original":true,"color":"#123099"},{"original":false,"color":"#1b3693"},{"original":false,"color":"#243b8d"},{"original":false,"color":"#2e4186"},{"original":false,"color":"#374680"},{"original":true,"color":"#404c7a"},{"original":true,"color":"#25387a"}]};
		$scope.rgConfigured2 = {
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
			{shape:'rect',pos:{x:100,y:30,width:80,height:160}},
			{shape:'rect',pos:{x:200,y:30,width:320,height:640}}
		];
		//$scope.$watch('rgConfigured',function(newVal){
		//	rg_eue_func();
		//},true)


		var svg = d3.select('.demoDrawing').append('svg').attr("width",1000).attr("height",1000);

		//enter/update radialgradient and enter/update/exit stops according to rgConfigured all in one func
		var rg_eue_func = function(){
			var svg_defs, rg;
			var rgdata = [$scope.rgConfigured];
			if(svg.select('defs')[0][0]==null){
				svg_defs = svg.append('defs');
				rg = svg_defs.selectAll('radialGradient').data(rgdata);
			}else{
				svg_defs = svg.select('defs');
				//webkit select radialGradient bug workaround using a class name:  
				//http://stackoverflow.com/questions/18298318/unable-to-select-lineargradient-with-d3-js-in-chrome
				rg = svg_defs.selectAll('.rg').data(rgdata);
			}

			rg.enter()
				.append('radialGradient')
				.attr("id",function(d,i){
					return 'rg'+i;
				})
				.attr("class","rg");

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
				.attr("fy",function(d){
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

		var rotate_degree;
		var demo = function(){
			var rotate_degree_old = rotate_degree;
			if(!rotate_degree){
				rotate_degree = 90;
			}else{
				if(rotate_degree == 90 || rotate_degree == 180){
					rotate_degree = -90;
				}else{
					rotate_degree = 90;
				}
			}
			var shapes = svg.selectAll('rect')
				.data($scope.shapes)
				.enter()
				.append('rect')
				.attr("class","shape");

			svg.selectAll('rect').attr("x",function(d){
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
				.attr("fill","url(#rg0)");

			svg.selectAll('rect')
				.transition()
				.duration(2000)
				.attrTween("transform", function(d, i, a) {
    				var i = d3.interpolateNumber(rotate_degree_old, rotate_degree);
    				var rx = d.pos.x + d.pos.width/2,
    					ry = d.pos.y;
    				return function(t) {
    					var rotate = i(t);
    					rotate = isNaN(rotate)? 0 : rotate;
      					return "rotate(" + rotate + " " + rx + " " + ry + ")";
    				};
  				});
		}//end demo
		setInterval(demo,2000);
	}])