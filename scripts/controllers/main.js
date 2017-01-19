app.run(['$rootScope',function ($rootScope) {
    $rootScope.data = [];
}])

app.controller('indexCtrl',['$scope','$http','$rootScope','$location',function($scope,$http,$rootScope,$location){
    $scope.$location = $location;
}])

app.controller('groupon',['$scope','$http','$location','myFactory','HttpFactory',function($scope,$http,$location,myFactory,HttpFactory){

    $scope.$location = $location;
    $scope.grouponData = [];
    $scope.filConA = false;
    $scope.filConB = false;
    $scope.cityList = [];
    $scope.getActivty = [];
    $scope.filShowNum = -1;
    $scope.pageNo = 0;
    $scope.filterName = {city:'区域',Activty :'类别',general : '综合排序'};
    $scope.grouponInfoData = {};
    $scope.filCity = '';
    $scope.filActivty = '';
    $scope.filGeneral = '';
    $scope.lodPic = false;


    // 下拉加载更多
    $scope.loadMore = function() {

        if ( $scope.pageNo > $scope.allPageNum) {
            return;
        }else{
            $scope.lodPic = true;
            $scope.pageNo++;
        }


        HttpFactory.getHttpData({httpAdres : 'restaurantList',cityId: $scope.filCity,cid : $scope.filActivty, sortType : $scope.filGeneral,pageNo:$scope.pageNo}).success(function (data) {
            $scope.lodPic = false;
            $scope.allPageNum = Math.ceil(data.totalCount/10);

            for(var i = 0; i< data.restaurantList.length; i++){
                $scope.grouponData.push( data.restaurantList[i])
            }
        })
    };

    // 条件筛选
    $scope.cityFilter = function (filObj) {
        $scope.filConA = false;
        $scope.filConB = false;
        $scope.filConC = false;

        if (filObj.filCity || filObj.filCity == '') {
            $scope.filCity = filObj.filCity;
            $scope.filterName.city =filObj.filCityName;
        }
        if (filObj.filActivty || filObj.filActivty == '') {
            $scope.filActivty = filObj.filActivty;
            $scope.filterName.Activty =filObj.filActivtyName;
        }
        if (filObj.filGeneral || filObj.filGeneral == '') {
            $scope.filGeneral = filObj.filGeneral;
            $scope.filterName.general =filObj.filGeneralName;
        }

        HttpFactory.getHttpData({httpAdres : 'restaurantList',cityId: $scope.filCity,cid : $scope.filActivty, sortType : $scope.filGeneral}).success(function (data) {
            $scope.grouponData = data.restaurantList;
        })
    }

    $scope.showFil = function (a) {
        if (a == 1 && $scope.filConA == false) {
            $scope.filConA = true;

        }else{
                $scope.filConA = false;
            };

        if (a == 2 && $scope.filConB == false) {
            $scope.filConB = true;

        }else{
                $scope.filConB = false;
            };

        if (a == 3 && $scope.filConC == false) {
            $scope.filConC = true;

        }else{
                $scope.filConC = false;
            };
    }

    // 条件筛选子类的显示隐藏
    $scope.filShow = function ($index){
        $scope.filShowNum = $index;
    };

    // 获取条件筛选区域的数据
    HttpFactory.getHttpData({httpAdres : 'cityinfolist'}).success(function (data) {
        $scope.cityList = data.stateList;
    })

    // 获取条件筛选综合排序的数据
    HttpFactory.getHttpData({httpAdres : 'getInfoCateList',type :'1'}).success(function (data) {
        $scope.getActivty = data.cateList;
    })

    $scope.grouponInfoAid = function (aid,sid) {
        var str = 'grouponInfo/' + aid;
        myFactory.setter({grouAid : aid , grouSid : sid})
        $location.path(str);
    }

}])

app.controller('grouponInfo',['$scope','$http','$location','$routeParams','myFactory','HttpFactory',function($scope,$http,$location,$routeParams,myFactory,HttpFactory){

    $scope.$location = $location;
    $scope.grouponInfoData = {};
    $scope.activityUserList = {};
    $scope.grouAid =  myFactory.getter().grouAid;
    $scope.grouSid =  myFactory.getter().grouSid;
    $scope.shopList = [];
    $scope.shopDetails = {};
    $scope.goodsList = [];
    $scope.comes = 0;
    $scope.addressList = [];
    $scope.addressStet = myFactory.getter().Addressindex || 0;

    // 为每一件商品增加 num 属性 初始化为0
    HttpFactory.getHttpData({httpAdres : 'destineList',aid :$scope.grouAid}).success(function (data) {
        $scope.grouponInfoData = data;
        $scope.addressList = data.multipleAddress;
        myFactory.setter({addressList : data.multipleAddress});
        //console.log($scope.addressList)
        for (var i = 0; i < $scope.grouponInfoData.productList.length; i++) {
            $scope.grouponInfoData.productList[i].num = 0;
        };
        $scope.goodsList = $scope.grouponInfoData.productList;
    })

    // 预定人员列表
    HttpFactory.getHttpData({httpAdres : 'activityUserList',aid :$scope.grouAid}).success(function (data) {
        $scope.activityUserList = data;
    })

    // 店铺详情
    HttpFactory.getHttpData({httpAdres : 'shopDetails',sid :$scope.grouSid}).success(function (data) {
        $scope.shopDetails = data.shopInfo;
        myFactory.setter({shopDetails : data.shopInfo});
    })

    // 立即抢购 跳转到提交订单页面
    $scope.placeOrder = function (argument) {
        if ($scope.comes == 0) {
            return;
        };
        $scope.shopList = [];
        //http://域名/subOrder
        for (var i = 0; i < $scope.goodsList.length; i++) {
            if ($scope.goodsList[i].num !=0) {
                var obj = {};
                obj.pid = $scope.goodsList[i].pid;
                obj.num = $scope.goodsList[i].num;
                obj.price = $scope.goodsList[i].price;
                obj.pName = $scope.goodsList[i].pName
                obj.sku = "0";
                $scope.shopList.push(obj);
            };
        };
        myFactory.setter({shopList : $scope.shopList});
        myFactory.setter({goodsComes : $scope.comes});
        $location.path('subOrder');
    }
    // 商品数量增加
    $scope.addGoods = function (shopindex) {
        $scope.goodsList[shopindex].num ++;
        $scope.comes += Number($scope.goodsList[shopindex].price);
    }
    // 商品数量减少
    $scope.decrease = function (shopindex) {
        if ( $scope.goodsList[shopindex].num == 0) {
             $scope.goodsList[shopindex].num = 0;
        }else{
            $scope.goodsList[shopindex].num --;
            $scope.comes -= Number($scope.goodsList[shopindex].price);
        }
    }

    // 选择地址
    $scope.chooseAddress = function (Addressindex) {
        $scope.addressStet = Addressindex;
        myFactory.setter({Addressindex : Addressindex});
    }

}]);

app.controller('shopInfo',['$scope','$http','myFactory','HttpFactory',function ($scope,$http,myFactory,HttpFactory) {


    $scope.shopDetails = myFactory.getter().shopDetails;


}]);

app.controller('subOrder',['$scope','$http','$location','myFactory','HttpFactory',function ($scope,$http,$location,myFactory,HttpFactory) {
    $scope.$location = $location;
    $scope.remarkText = '';
    $scope.shopList = myFactory.getter().shopList;
    $scope.addressStet = myFactory.getter().Addressindex || 0;
    $scope.addressList = myFactory.getter().addressList;
    $scope.shopDetails = myFactory.getter().shopDetails;
    $scope.goodsComes = myFactory.getter().goodsComes;
    $scope.grouAid =  myFactory.getter().grouAid;
    $scope.multipleAddress = [];
    $scope.subOrder = function () {
        var oAddress = $scope.addressList[$scope.addressStet];
        $scope.multipleAddress.push(oAddress)
        HttpFactory.getHttpData({httpAdres : 'subOrder', aid :$scope.grouAid, productList : $scope.shopList, remark:$scope.remarkText,multipleAddress : $scope.multipleAddress}).success(function (data) {
            console.log(data)
            alert(data)
        })
    }
}])