angular.module("rgDemoApp",["radialgradient.module"])
	.controller("mainCtrl",function($scope){
		//the configured result is stored in rgConfigured
		$scope.viewFunc = function(){
			//execute this func after rgChooser is configured
			console.log("I am awake");
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
	})