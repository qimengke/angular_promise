angular.module('app',['ng.service']).controller('indexCtrl',function($scope,userService){
	userService.register().then(function(e) {
		console.info("返回数据",e);
		location.href='home.html'
	},function(err){
		console.info('失败');
	})
})