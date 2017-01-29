var baseService = function(baseUrl,name,$http,$q,mapping) {
	this.$http = $http;
	this.$q = $q; 
	this.name = name;
	this.baseUrl = baseUrl+'/'+name;
	this.mapping = mapping;
}

var base = {}

base.list = function(obj) {
	var that = this;
	var q = that.$q.defer();
	that.$http.get(this.baseUrl + "/list",{params:obj}).then(function(e) {
		e.data.data = base.columnToData(e.data.data,that.mapping[that.name]);
		q.resolve(e.data);
	});
	return q.promise;
}


base.dataToColumn = function(obj,mapping) {
	var result = {};
	for(var key in mapping) {
		var k = mapping[key];
		if(obj[key])
		result[k] = obj[key]
	}
	return result;
}


base.columnToData = function(obj,mapping) {
	// if(Object.prototype.toString.call(obj) == "[object Array]") {
	var arr  =[];
	for(var i=0;i<obj.length;i++) {
		var result = {};
		for(var key in mapping) {
			var k = mapping[key];
			result[key] = obj[i][k]
		}
		arr.push(result);
	}
	return arr;
}

base.save = function(obj) {
	if(obj.id) {
		return this.update(obj);
	} else {
		return this.insert(obj);
	}
}
/*

*/
base.insert = function(obj) {
	var that = this;
	// console.info("澧炲姞楠岃瘉",obj,this);
	obj = that.dataToColumn(obj,that.mapping[that.name]);
	var q = that.$q.defer();
	that.$http.post(this.baseUrl + "/save",obj).then(function(e) {
		q.resolve(e.data);
	});
	return q.promise;
}

base.update = function(obj) {
	var that = this;
	obj = that.dataToColumn(obj,that.mapping[that.name]);
	var q = that.$q.defer();
	that.$http.put(this.baseUrl + "/update",obj).then(function(e) {
		q.resolve(e.data);
	});
	return q.promise;
}
/*

*/
base.delete = function(obj) {
	var that = this;
	var q = that.$q.defer();
	that.$http.delete(this.baseUrl + "/delete/"+obj.id).then(function(e) {
		q.resolve(e.data);
	});
	return q.promise;
}
/*

*/
base.getById = function(obj) {
	var that = this;
	var q = that.$q.defer();
	that.$http.post(this.baseUrl + "/getById",obj).then(function(e) {
		q.resolve(e.data);
	});
	return q.promise;
}

baseService.prototype = base;