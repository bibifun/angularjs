app.factory('myFactory', function () {   
    //定义参数对象
    var myObject = {};

    var _setter = function (data) {

       for(var attr in data){
       		myObject[attr] = data[attr];
       }  
    };

    var _getter = function () {
        return myObject;
    };

    return {
        setter: _setter,
        getter: _getter
    };
});

app.factory('HttpFactory',['$http',function ($http) {   

    var transFn = function(data) 
        {
            return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: transFn
        };

    var _getHttpData = function (agms){

    	var obj = {httpAdres : '', sid : '', aid : '', type : '',pageNo:''}

    	for(var attr in agms){
    		obj[attr] = agms[attr];
    	}

    	var p1 = $http.post('http://42.96.198.183/app/elife145/' + obj.httpAdres, {sid: obj.sid,aid : obj.aid,cityId:obj.cityId,cid : obj.cid,sortType : obj.sortType,pageNo : obj.pageNo}, postCfg) 
        	return p1;
    	};

    return {
        getHttpData : _getHttpData
    };

}]);