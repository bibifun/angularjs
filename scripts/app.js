var app = angular.module('myApp',['ngRoute','ngAnimate','ngResource','infinite-scroll','ngSanitize']);

app.config(['$routeProvider',function ($routeProvider) {
	$routeProvider
		.when('/groupon', {
			templateUrl : 'views/groupon.html',
			controller  : 'groupon'
		})
		.when('/grouponInfo/:aidNum', {
			templateUrl : 'views/grouponInfo.html',
			controller  : 'grouponInfo'
		})
		.when('/shopInfo', {
			templateUrl : 'views/shopInfo.html',
			controller  : 'shopInfo'
		})
		.when('/delAddressList', {
			templateUrl : 'views/deliveryAddres.html',
			controller  : 'grouponInfo'
		})
		.when('/grouponUserList', {
			templateUrl : 'views/grouponUserList.html',
			controller  : 'grouponInfo'
		})
		.when('/subOrder', {
			templateUrl : 'views/subOrder.html',
			controller  : 'subOrder'
		})
		.when('/detailInfo', {
			templateUrl : 'views/detailInfo.html',
			controller  : 'detailInfo'
		})
		.otherwise({
			templateUrl : 'views/hye.html',
			controller  : 'indexCtrl',
			redirectTo 	: 'hye'
		})
}])