angular.module('ng.service',[]).factory('userService', function($http,$q){
	var user={};
	var baseUrl = 'http://demoapptest.duapp.com';
	user.login = function() {
		//ng封装的ajax
		//保存外端用户操作数据的纯粹性，只返回后台提供的数据
		//获取不到ajax内部返回的变量或对象
		//1.全局变量，ajax是异步 所以不行
		//2.ajax改为同步，因为用户体验不好，如果数据比较大页面会卡死
		//尽量使用promise 或 发布订阅 或 监听变量
		//ng 对promise 进行了封装 提供了$q服务	
			//定义一个承诺对象
			var q = $q.defer();
			$http({
				method:'GET',
				url:baseUrl+'/users/login',
				params:{}
			}).then(function(succ){
					var data=succ.data;
					q.resolve(data)
			},
			function(err){
				var e = err.data;
				q.reject(e)
			})
			return  q.promise;
	}

	return user;
})