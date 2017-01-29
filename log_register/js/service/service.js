var appService = angular.module('ng.service',[])
appService.factory('userService',function($http,$q) {
	var userService = {};
	var mapping = {
		user:{
			id:'u_id',
			uname:'u_name',
			upass:'u_pass',
			phone:'u_phone',
			email:'u_email',
			age:'u_age',
			sex:'u_sex',
			identity:'u_identity',
			imgphoto:'u_imgphoto',
			address:'u_address'
		}
	}

	userService.login = function(obj) {
		var q = $q.defer();
		$http.get('/users/login',{params:obj}).then(function(e) {
			q.resolve(e.data);
		});
		return q.promise;
	}

	//u_id,u_name,u_pass,u_phone,u_email,u_age,u_sex,u_identity,u_imgphoto,u_address
	userService.save = function(obj) {
		var q = $q.defer();
		$http.post('/users/save',obj).then(function(e) {
			q.resolve(e.data);
		});
		return q.promise;
	}

	userService.list = function(obj) {
		var q = $q.defer();
		$http.get('/users/list',obj).then(function(e) {
			q.resolve(e.data);
		});
		return q.promise;
	}

	userService.update = function(obj) {
		var q = $q.defer();
		$http.put('/users/update',obj).then(function(e) {
			q.resolve(e.data);
		});
		return q.promise;
	}
	return userService;
});

appService.factory('roleService', function($http,$q){
	// baseService = function(baseUrl,name,$http,$q,mapping)
	var baseUrl = 'http://localhost:18080';
	var name = 'role';
	var mapping = {
		role:{
			id:'r_id',
			name:'r_name'
		}
	}
	var role = new baseService(baseUrl,name,$http,$q,mapping);

	return role;
})

appService.factory('powerService', function($http,$q){
	// baseService = function(baseUrl,name,$http,$q,mapping)
	var baseUrl = 'http://localhost:18080';
	var name = 'power';
	var mapping = {
		power:{
			id:'p_id',
			name:'p_name',
			url:'p_url',
			content:'p_content'
		}
	}
	var power = new baseService(baseUrl,name,$http,$q,mapping);

	return power;
})



appService.factory('sizeService', function($http,$q){
	// baseService = function(baseUrl,name,$http,$q,mapping)
	var baseUrl = 'http://localhost:18080';
	var name = 'size';
	var mapping = {
		size:{
			id:'s_id',
			name:'s_name',
			content:'s_content'
		}
	}
	var size = new baseService(baseUrl,name,$http,$q,mapping);

	return size;
})

appService.factory('typeService', function($http,$q){
	// baseService = function(baseUrl,name,$http,$q,mapping)
	var baseUrl = 'http://localhost:18080';
	var name = 'type';
	var mapping = {
		type:{
			id:'t_id',
			name:'t_name',
			parent:'t_parent',
			content:'t_content'
		}
	}
	var type = new baseService(baseUrl,name,$http,$q,mapping);



	type.getChild = function(obj) {
		if(!obj) {
			obj = {}
		}
		var id = angular.copy(obj.id);
		var that = this;
		var q = that.$q.defer();
		that.$http.get(this.baseUrl + "/getByParentId",{params:{id:id}}).then(function(e) {
			e.data.data = base.columnToData(e.data.data,that.mapping[that.name]);
			q.resolve(e.data);
		});
		return q.promise;
	}
	return type;
})

appService.factory('colorService', function($http,$q){
	// baseService = function(baseUrl,name,$http,$q,mapping)
	var baseUrl = 'http://localhost:18080';
	var name = 'color';
	var mapping = {
		color:{
			id:'c_id',
			name:'c_name'
		}
	}
	var type = new baseService(baseUrl,name,$http,$q,mapping);
	
	return type;
})



appService.factory('mallService', function($http,$q){
	// baseService = function(baseUrl,name,$http,$q,mapping)
	var baseUrl = 'http://localhost:18080';
	var name = 'mall';
	var mapping = {
		mall:{
			id:'m_id',
			name:'m_name',
			content:'m_content',
			detail:'m_detail',
			spec:'m_spec',
			service:'m_service',
			access:'m_assess'

			//param.m_name,param.m_content,param.m_detail,param.m_spec,param.m_service,param.m_assesscc
		}
	}
	var mall = new baseService(baseUrl,name,$http,$q,mapping);
	
	return mall;
})