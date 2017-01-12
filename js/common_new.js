





//验证组件
!function(){
    jq.fn.checkForm = function(settings){
        settings=jq.extend({},jq.checkForm.defaults,settings);
        if( settings.type.length == 0 ) {
            return false;
        }  
        var cf = {};
        cf.fn = {};
        cf.fn.regType = [/^13[0-9]{1}[0-9]{8}$|14[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|18[0-9]{1}[0-9]{8}$|17[0-9]{1}[0-9]{8}$/, /^([0-9]+)$/,/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,/^([0-9.]+)$/,/^[0-9]{5,}$/,/^((0\d{2,3})(-)?)?(\d{7,8})(-(\d{3,}))?$|^13[0-9]{1}[0-9]{8}$|14[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|18[0-9]{1}[0-9]{8}$|17[0-9]{1}[0-9]{8}$/,/^[1-9]\d{0,7}(\.\d{1,2})?$/,/^[1-9][0-9]{0,3}$/,/^\d{1,4}(\.\d{1})?$/,/^(([1-9]\d{0,6})|0)(\.\d{1})?$/,/^[A-Za-z0-9]{8,20}$/,/^((0\d{2,3})(-)?)?(\d{7,8})(-(\d{3,}))?$/,/^[a-z0-9]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i,/^[a-zA-Z0-9_\u4e00-\u9fa5]{4,20}$/,/^\d{1,9}(\.\d{1,2})?$/];//0:手机。1：纯数字。2：EMAIL。3：数字加.。4：QQ号。5:手机或固话。6.价格。7.面积（<=10000）8.预算（0.1万-9999.9万）。9.清单价格（0.1元-999.9万）。10.字母数字(8-20)。11.固定电话。12.邮件地址。13.中英文，数字及_。14.费用金额（可以为0）
        cf.fn.obj = this;
        cf.fn.str = '';
        cf.fn.count = 0;
        cf.fn.obj.focus(function(){
            cf.fn.str = '';
            jq.fn.prototype.removeWrongText(jq(this), settings.parCls, settings);
        });
        if(!settings.checkFormType){
            cf.fn.obj.blur(function() {
                jq.fn.prototype._check(cf,settings,jq(this));
            });
        }else if(settings.checkFormType && settings.checkType == "text"){
            var g = jq.fn.prototype._check(cf,settings,jq(this));
            return g;
        }else if(settings.checkFormType && settings.checkType == "select"){
            var g = jq.fn.prototype._check(cf,settings,jq(this));
            return g;
        }
    };
    jq.fn.prototype = {
        _check:function(cf,settings,blurObj){
            cf.fn.str = '';
            cf.fn.str += '<div class="'+settings.className+'"><'+settings.labl+' class="'+settings.lablClass+'"></'+settings.labl+'>';
            blurObj.find('div.'+settings.className+'').remove();
            blurObjVal = jq.trim(blurObj.val());
            var cfPos = [];
            if(settings.displayNum  && jq(settings.checkFormType).parent().find('div.'+settings.className+'').length == 1) {
               return;
            }
            for(var i = 0; i < settings.type.length ; i++){
                if(settings.type[i] == 1 && settings.checkType =="text" && settings.content[0] != "" && (blurObjVal == "" || blurObj[0].type == "select-one" && blurObjVal == "0")){
                    cf.fn.str += ''+settings.content[0]+'</div>';
                    jq.fn.prototype.addWrongText(blurObj, settings.parCls, cf.fn.str, settings.checkType);
                    cf.fn.count = 1;

                } else if(settings.type[i] == 2 && settings.checkType =="text" && blurObjVal !=""){
                    var result = false;
                    if(typeof settings.reg == "object" && !settings.moreReg) {
                        result = jq.fn.prototype.checkWordLen(settings.reg.len, settings.reg.range, blurObjVal); 
                    }else if(typeof settings.reg == "number" && !(blurObj.val().match(cf.fn.regType[settings.reg]) == null)){
                        result = true;  
                    }else if(typeof settings.reg == "object" && settings.moreReg ){
                        var moreRegResult = false;
                        for(var i =0; i< settings.reg.length; i++){
                            
                            if(blurObj.val().match(cf.fn.regType[settings.reg[''+i+'']]) != null){
                                moreRegResult = true;
                            }
                        }
                        if(moreRegResult == true){
                            result = true;
                        }

                    } 

                    if(!result) {
                        cf.fn.str += ""+settings.content[1]+'</div>';
                        jq.fn.prototype.addWrongText(blurObj, settings.parCls, cf.fn.str, settings.checkType);  
                        cf.fn.count = 1;    
                    }
                }else if(settings.type[i] == 1 && settings.checkType == "select" && blurObj.find('option:selected').attr('value') == ""){
                    cf.fn.str += ""+settings.content[0]+'</div>';
                    jq.fn.prototype.addWrongText(blurObj, settings.parCls, cf.fn.str, settings.checkType);
                    cf.fn.count = 1;
                };
            };
            if(cf.fn.count != 1) {
                 return 0;
            }
        },
        checkWordLen:function(maxLen, range, val) {
            var len;
            /*if(null == val.match(/[\u4e00-\u9fa5]/g)) {
                len = val.length;   
            } else if(null == val.match(/[^\u4e00-\u9fa5]/g)) {
                len = val.length * 2;   
            } else {
                len = val.match(/[^\u4e00-\u9fa5]/g).length + val.match(/[\u4e00-\u9fa5]/g).length * 2;     
            }*/ 
            len = val.length;
            if(!range) {
                if(maxLen < len) {
                    return false;   
                }   
            } else {
                if(len > range.dmax || len < range.dmin) {
                    return false;   
                }   
            }
                
            return true;
        },
        addWrongText: function(obj, cls, str, chkType) {
            if(!cls) { //未传class
                obj.parent().addClass('height_auto');
                obj.parent().append(str);
            } else {
                obj.parents(cls).addClass('height_auto');
                obj.parents(cls).append(str);
            }

            if(chkType != 'select') {
                obj.css('border-color','#ff6767');
            }
        },
        removeWrongText: function(obj, cls, settings) {
            if(!cls) { //未传class
                obj.parent().removeClass('height_auto');
                obj.parent().find('div.'+settings.className+'').remove();
            } else {
                obj.parents(cls).removeClass('height_auto');
                obj.parents(cls).find('div.'+settings.className+'').remove();
            }
            obj.css('border-color','#ccc');
        }
    };
    // 默认值
    jq.checkForm={defaults:{
        calssName:"checkFormDefault", //报错字符串的class
        content:[], //报错内容数组
        type:[], //报错类型，1为空，2其他错
        reg:"", //报错类型2时候的正则表达式
        moreReg:false,
        checkType:"text",//检测类型
        labl:'em',//错误提示的标签
        lablClass:'ico_tip_warn_s',//错误提示的标签的类名
        parCls: ''//错误提示所加父元素的标示
    }}; 
}(jQuery);



//判断是否安装Flash插件
function IsFlashEnabled() {
   var obj = checkBrowser(),
       re = false;
   if(obj.name == "msie" && obj.version == 6) {
       try{
            //IE
            var swf1 = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
       }catch(e){
           try{
                //FireFox,Chrome
                var swf2=navigator.plugins["Shockwave Flash"];
                if(swf2==undefined){
                    re = true;
                };
            }catch(ee){
               re = true;
            }
        };
  };
  return re;//false启用 true未启用
} 

jq(function() {
    jq("body").on("focus","input[type=text],input[type=password],textarea",function() {
        if (!jq(this).hasClass('outcontrol')) {
            jq(this).css("border-color","#96d5b9");
        }
    });
    jq("body").on("blur","input[type=text],input[type=password],textarea,select",function() {
        if (!jq(this).hasClass('outcontrolblur')) {
            jq(this).css("border-color","#ddd");
        }
    });
});














