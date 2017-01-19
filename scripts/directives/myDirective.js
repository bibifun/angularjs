app.directive('wwCarouse',function (){
    return {
        restrict : 'A',
        link : function (scope,element,attr){
            console.log(element)
            changePhoto(element);
            function changePhoto(obj)
            {
                var _this  = this,
                    spImg  = obj.find(".spImg li"),
                    spTag  = obj.find(".spTag li"),
                    spText  = obj.find(".spText li"),
                    iNum   = 0,
                    timer  = null;

                //改变层级关系
                for(var i=0; i<spImg.length; i++)
                {
                    spImg.eq(i).css("z-index",(spImg.length-i));
                }

                timer=setInterval(function()
                {
                    iNum++;
                    if(iNum>=spImg.length)
                    {
                        iNum=0;
                    }
                    spImg.eq(iNum).stop().animate({"opacity":"1","z-index":"5"},{easing:"swing",duration:1000}).siblings("li").stop().animate({"opacity":"0","z-index":"1"},{easing:"swing",duration:1000});
                    spTag.eq(iNum).addClass("curr").siblings("li").removeClass("curr");
                    spText.eq(iNum).addClass("curr").siblings("li").removeClass("curr");
                },3000);

                obj.bind("mouseover",function()
                {
                    clearInterval(timer);
                });

                obj.bind("mouseout",function()
                {
                    timer=setInterval(function()
                    {
                        iNum++;
                        if(iNum>=spImg.length)
                        {
                            iNum=0;
                        }
                        spImg.eq(iNum).stop().animate({"opacity":"1","z-index":"5"},{easing:"swing",duration:500}).siblings("li").stop().animate({"opacity":"0","z-index":"1"},{easing:"swing",duration:500});
                        spTag.eq(iNum).addClass("curr").siblings("li").removeClass("curr");
                        spText.eq(iNum).addClass("curr").siblings("li").removeClass("curr");
                    },3000);
                });

                spTag.bind("mouseover",function()
                {
                    iNum=$(this).index();
                    spImg.eq(iNum).stop().animate({"opacity":"1","z-index":"5"},{easing:"swing",duration:500}).siblings("li").stop().animate({"opacity":"0","z-index":"1"},{easing:"swing",duration:500});
                    spTag.eq(iNum).addClass("curr").siblings("li").removeClass("curr");
                    spText.eq(iNum).addClass("curr").siblings("li").removeClass("curr");
                });
            }
        }
    }
})

app.directive('wwDrag',function (){
    return {
        restrict : 'A',
        link : function (scope,element,attr){


            var disX = 0;
            var disY = 0;
            //console.log(typeof attr.myDrag);
            attr.wwDrag = angular.equals(attr.wwDrag,'true');

            element.on('mousedown',function(ev){
                var This = this;
                disX = ev.pageX - $(this).offset().left;
                disY = ev.pageY - $(this).offset().top;

                if(attr.myDrag){
                    var $line = $('<div>');
                    $line.css({ width : $(this).outerWidth() , height : $(this).outerHeight() , position : 'absolute' , left : $(this).offset().left , top : $(this).offset().top , border : '1px gray dotted'});
                    $('body').append($line);
                }

                $(document).on('mousemove',function(ev){
                    if(attr.myDrag){
                        $line.css('left',ev.pageX - disX);
                        $line.css('top',ev.pageY - disY);
                    }
                    else{
                        $(This).css('left',ev.pageX - disX);
                        $(This).css('top',ev.pageY - disY);
                    }
                });
                $(document).on('mouseup',function(){
                    $(document).off();
                    if(attr.myDrag){
                        $(This).css('left',$line.offset().left);
                        $(This).css('top',$line.offset().top);
                        $line.remove();
                    }
                });
                return false;
            });

        }
    }
})

app.directive('preventScroll',function () {
    return {
        restrict : 'A',
        link : function (scope,element,attr) {
            element.on('mousemove',function () {
                //console.log(1)
                return false;
            })
        }
    }
})