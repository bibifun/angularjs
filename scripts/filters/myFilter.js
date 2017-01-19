app.filter('stateFil',function(){
		return function(str,num){
			// console.log(str);		
			var type = '';
			if(str == "1"){
				type = "预定中";
			}else if(str == "3"){
				type = "预定结束";
			}
			return type;
		}
});
app.filter('classColorBg',function(){
		return function(str,num){
			// console.log(str);		
			var className = '';
			if(str == "1"){
				className = "bgGreen";
			}else if(str == "3"){
				className = "bgOpc";
			}
			return className;
		}
});
app.filter('shopStar',function(){
		return function(str,num){
			// console.log(str);		
			var starStr = '';
			if(str == "5"){
				starStr = '<img src="img/starPicShow.png"><img src="img/starPicShow.png"><img src="img/starPicShow.png"><img src="img/starPicShow.png"><img src="img/starPicShow.png">'
			}else if(str == "3"){
				starStr = '<img src="img/starPicShow.png"><img src="img/starPicShow.png"><img src="img/starPicShow.png"><img src="img/starPicShow.png"><img src="img/starPic.png">';
			}else if(str == "3"){
				starStr = '<img src="img/starPicShow.png"><img src="img/starPicShow.png"><img src="img/starPicShow.png"><img src="img/starPic.png"><img src="img/starPic.png">';
			}else if(str == "3"){
				starStr = '<img src="img/starPicShow.png"><img src="img/starPicShow.png"><img src="img/starPic.png"><img src="img/starPic.png"><img src="img/starPic.png">';
			}else if(str == "3"){
				starStr = '<img src="img/starPicShow.png"><img src="img/starPic.png"><img src="img/starPic.png"><img src="img/starPic.png"><img src="img/starPic.png">';
			}else if(str == "3"){
				starStr = '<img src="img/starPic.png"><img src="img/starPic.png"><img src="img/starPic.png"><img src="img/starPic.png"><img src="img/starPic.png">';
			}
			return starStr;
		}
});
