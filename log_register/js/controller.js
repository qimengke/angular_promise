angular.module('app',['ng.service']).controller('indexCtrl',function($scope,userService){
	userService.login().then(function(e) {
		console.info("返回数据",e)
	},function(err){
		console.info('失败');
	})
})