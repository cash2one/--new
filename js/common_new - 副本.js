
//console.log处理   
if (typeof console == "undefined") {
    this.console = { log: function (msg) { alert(msg); } };
};


//封装类
function $()
 {
    var obj = new Array();
    for (var i = 0, j = arguments.length; i < j; i++)
    {
        ele = arguments[i];
        if (typeof ele == 'object')
        return ele;
        if (typeof ele == 'string')
        ele = document.getElementById(ele) ? document.getElementById(ele) : document.getElementsByTagName(ele).length > 0 ? document.getElementsByTagName(ele) : false;
        if (j == 1)
        return ele;
        obj.push(ele);
    }
    return obj;
}
//判断是否冒泡
function doane(event) {
    e = event ? event: window.event;
    if (is_ie) {
        e.returnValue = false;
        e.cancelBubble = true;
    } else if (e) {
        e.stopPropagation();
        e.preventDefault();
    }
}
function doane_but_a(event) {
    e = event ? event: window.event;
    if (is_ie) {
        e.cancelBubble = true;
    } else if (e) {
        e.stopPropagation();
    }
}
function addNodes(o, O, d)
 {
    if (!O)
    return;
    d = parseInt(d);
    if (d < 0)
    {
        o.appendChild(O);
    }
    else if (d == 0)
    {
        if (o.childNodes.length != 0)
        o.insertBefore(O, o.firstChild);
        else
        o.appendChild(O);
    }
    else
    {
        if (o.childNodes.length - 1 < d)
        o.appendChild(O);
        else
        o.insertBefore(O, o.childNodes[d]);
    }
}
Object.extend = function(oFrom, oTo)
 {
    for (property in oFrom)
    {
        oTo[property] = oFrom[property];
    };
    return oTo;
};
var Events = new Object();
Events.addEvent = function(oTarget, sEventType, fnLister)
 {
    if (oTarget.addEventListener)
    {
        oTarget.addEventListener(sEventType, fnLister, false);
    }
    else if (oTarget.attachEvent)
    {
        oTarget.attachEvent("on" + sEventType, fnLister);
    }
    else
    {
        oTarget["on" + sEventType] = fnLister;
    };
};
Events.removeEvent = function(oTarget, sEventType, fnLister)
 {
    if (oTarget.removeEventListener)
    {
        oTarget.removeEventListener(sEventType, fnLister, false);
    }
    else if (oTarget.detachEvent)
    {
        oTarget.detachEvent("on" + sEventType, fnLister);
    }
    else
    {
        oTarget["on" + sEventType] = null;
    };
};
Events.formatEvent = function(oEvent){
    if (isIE && isWin){
        oEvent.charCode = (oEvent.type == "keypress") ? oEvent.keyCode: 0;
        oEvent.eventPhase = 2;
        oEvent.isChar = (oEvent.charCode > 0);
        oEvent.pageX = oEvent.cleintX + (document.body.scrollLeft || document.documentElement.scrollLeft);
        oEvent.pageY = oEvent.cleintY + (document.body.scrollTop || document.documentElement.scrollTop);
        oEvent.preventDefalt = function() {
            this.returnValue = false;
        };
        if (this.type == "mouseout")
        {
            oEvent.relatedTarget = oEvent.toElement;
        }
        else if (this.type == "mouseover")
        {
            oEvent.relatedTarget = oEvent.fromElement;
        };
        oEvent.target = oEvent.srcElement;
        oEvent.time = (new Date()).getTime();
    };
    return oEvent;
};
Events.getEvent = function()
 {
    if (window.event){
      return this.formatEvent(window.event);
    }else{
      return Event.getEvent.caller.arguments[0];
    };
};
function autoSize(obj, w, h)
 {
    var oIMG = new Image();
    oIMG.onload = function()
    {
        var oW = this.width;
        var oH = this.height;
        var tax = 1;
        if (oW > w || oH > h)
        tax = (oW / oH) > (w / h) ? (w / oW) : (h / oH);
        obj.style.marginLeft = (w - Math.floor(oW * tax)) / 2 + "px";
        obj.style.marginTop = (h - Math.floor(oH * tax)) / 2 + "px";
        obj.width = oW * tax;
        obj.height = oH * tax;
    };
    oIMG.src = obj.src;
};

/****************XSS过滤********************/
function stripscript(s)
 {
    var pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    //格式 RegExp("[在中间定义特殊过滤字符]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');

    }
    return rs;

};

/**********************************************/
function check_point(sValue)
 {
    var re = /^[\s0-9a-zA-Z\u0391-\uFFE5]+$/gi;
    if (!re.test(sValue))
    return false;
    else
    return true;
};
function show_error(sIdName)
 {
    if (sIdName)
    var oObj = $(sIdName);
    oObj.style.display = "block";
};
function hide_error(sIdName)
 {
    if (sIdName)
    var oObj = $(sIdName);
    oObj.style.display = "none";
};
function show_cat_err(sStr, sIdName)
 {
    var oObj = $(sIdName);
    show_error(sIdName);
    oObj.innerHTML = sStr;
};
jsPage = function(iNums, iPrePage, iCurpage, fnCallBack, sInnerId)
 {
    _this = this;
    this.iNums = Math.ceil(iNums);
    this.iPrePage = Math.ceil(iPrePage);
    this.iCurPage = Math.ceil(iCurpage);
    this.fnCallBack = fnCallBack;
    this.sInnerId = sInnerId;
    this.sPageDivClass = 'pages';
    this.sPrevClass = 'prev';
    this.sNextClass = 'next';
    this.sFirstClass = 'first';
    this.sLastClass = 'last';
    if (this.iNums <= this.iPrePage)
    {
        return false;
    };
    this.setPageDivClass = function(css)
    {
        this.sPageDivClass = css;
    };
    this.setPrevClass = function(css)
    {
        this.sPrevClass = css;
    };
    this.setNextClass = function(css)
    {
        this.sNextClass = css;
    };
    this.multi = function(i)
    {
        if (i)
        this.iCurPage = Math.ceil(i);
        var sHtmlPage = '';
        if (this.iNums < this.iPrePage)
        sHtmlPage = '';
        else
        {
            var iPages = Math.ceil(this.iNums / this.iPrePage);
            if (!this.iCurPage || this.iCurPage < 1)
            this.iCurPage = 1;
            if (this.iCurPage > iPages)
            this.iCurPage = iPages;
            var iFrom = 1;
            var iTo = 1;
            if (iPages < 10)
            {
                iFrom = 1;
                iTo = iPages;
            }
            else
            {
                iFrom = this.iCurPage - 4;
                iTo = iFrom + 10 - 1;
                if (iFrom < 1)
                {
                    iTo = this.iCurPage - iFrom + 1;
                    iFrom = 1;
                    if (iTo - iFrom < 10)
                    iTo = 10;
                }
                else if (iTo > iPages)
                {
                    iFrom = iPages - 10 + 1;
                    iTo = iPages;
                }
            };
            sHtmlPage = this.iCurPage - 4 > 1 && iPages > 10 ? '<a href="#" class="' + this.sFirstClass + '" onclick="_this.fnCallBack(1);_this.multi(1);return false;">1 ...</a>': '';
            sHtmlPage += this.iCurPage > 1 ? '<a href="void(0)" class="' + this.sPrevClass + '" onclick="_this.fnCallBack(' + (this.iCurPage - 1) + ');_this.multi(' + (this.iCurPage - 1) + ');return false;">&lsaquo;&lsaquo;</a>': '';
            for (var i = iFrom; i <= iTo; i++)
            {
                sHtmlPage += i == this.iCurPage ? '<strong>' + i + '</strong>': '<a href="#" onclick="_this.fnCallBack(' + i + ');_this.multi(' + i + ');return false;">' + i + '</a>';
            };
            sHtmlPage += this.iCurPage < iPages ? '<a href="#" class="' + this.sNextClass + '" onclick="_this.fnCallBack(' + (this.iCurPage + 1) + ');_this.multi(' + (this.iCurPage + 1) + ');return false;">&rsaquo;&rsaquo;</a>': '';
            sHtmlPage += iTo < iPages ? '<a href="#" class="' + this.sLastClass + '" onclick="_this.fnCallBack(' + iPages + ');_this.multi(' + iPages + ');return false;">... ' + iPages + '</a>': '';
            sHtmlPage = sHtmlPage ? '<div class="' + this.sPageDivClass + '"><em>&nbsp;' + this.iNums + '&nbsp;</em>' + sHtmlPage + '</div>': '';
        };
        if (this.sInnerId && document.getElementById(sInnerId))
        document.getElementById(sInnerId).innerHTML = sHtmlPage;
        else
        return sHtmlPage;
    };
};
function jsSelectItem(arr, itemValue, mod, selectName, attribute, echo, defaultValue)
 {
    if (!attribute)
    attribute = '';
    var js = '<select id="' + selectName + '" name="' + selectName + '" ' + attribute + '>';
    if (defaultValue)
    js += '<option>' + defaultValue + '</option>';
    if (arr)
    {
        if ('K-V' == mod)
        {
            for (var i in arr)
            {
                if (typeof arr[i] == 'function')
                continue;
                js += '<option  value="' + (parseInt(i)) + '"';
                if (parseInt(i) == itemValue)
                {
                    js += 'selected="selected"';
                }
                js += '>' + arr[i] + '</option>';
            }
        }
        else if ('V-V' == mod)
        {
            for (var i = 0, j = arr.length; i < j; i++)
            {
                js += '<option  value="' + arr[i] + '"';
                if (arr[i] == itemValue)
                {
                    js += 'selected="selected"';
                }
                if (selectName == "User_Shen")
                js += '>' + GP_EN[i] + '</option>';
                else
                js += '>' + arr[i] + '</option>';
            }
        }
    }
    js += '</select>';
    if (echo)
    document.write(js);
    else
    return js;
};
function in_array(value, arr)
 {
    if (!arr || arr.length == 0)
    return false;
    var flag = false;
    for (var i = 0, j = arr.length; i < j; i++)
    {
        if (arr[i] == value)
        flag = true;
    }
    return flag;
};
function middle(o)
 {
    if (!o)
    return false;
    o = $(o);
    o.style.position = 'absolute';
    if (o.offsetWidth == 0)
    o.offsetWidth = parseInt(o.style.width);
    if (o.offsetHeight == 0)
    o.offsetHeight = parseInt(o.style.height);
    var sClientWidth = document.body.clientWidth || document.documentElement.clientWidth;
    var sClientHeight = window.screen.height;
    var iLeft = (document.body.clientWidth / 2) - (o.offsetWidth / 2);
    var sScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var iTop = -80 + (sClientHeight / 2 + sScrollTop) - (o.offsetHeight / 2);
    iTop = iTop > 0 ? iTop: (sClientHeight / 2 + sScrollTop) - (oDialog.offsetHeight / 2);
    o.style.left = iLeft + 'px';
    o.style.top = iTop + 'px';
};
function insertScript(id, url) {
    var oScript = $(id);
    if (oScript)
    oScript.parentNode.removeChild(oScript);
    oScript = document.createElement('script');
    oScript.setAttribute('id', id);
    oScript.setAttribute('src', url);
    oScript.setAttribute('type', 'text/javascript');
    oScript.setAttribute('language', 'javascript');
    var header = $('head').item(0);
    header.appendChild(oScript);

};


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

//验证组件2
(function(){
    jq.fn.checkForm2 = function(settings){
        var defaults = {
            calssName:"add_wrong", //报错字符串的class
            content:[], //报错内容数组
            checkType:"text",//检测类型
            labl:'i',//错误提示的标签
            lablClass:'ico_error',//错误提示的标签的类名
            parCls: '',//错误提示所加父元素的标示
            callback: '',//检测成功后执行的函数
            info: [],
            displayNum: true,//单个提示
            parentTip: 'div',//单个提示范围
            blurChk: false,//blur时检测提示错误
            chkType: '',//检测类型，radio单独处理
            callback: false//验证成功后执行的函数，必须是全局变量
        };


        var settings = jq.extend({}, defaults, settings),
            cf = {};
        cf.fn = {};
        if(settings.info.length == 0 ) {
            return false;
        }  
        cf.fn.regType = [/\S/];//0:非空字符串

        jq(this).focus(function() {//获取焦点是移除错误
            removeWrongText2(jq(this), settings.parCls, settings);
        });
        if(settings.blurChk){//blur时检测提示错误
            jq(this).blur(function() {
                _check2(cf, settings, jq(this));
            });
        }else if(!settings.blurChk) {//提交时检测提示错误
            var g = _check2(cf, settings, jq(this));
            return g;
        }


        function _check2(cf, settings, blurObj) {
            var strTip = '<div class="'+settings.className+'"><'+settings.labl+' class="'+settings.lablClass+'"></'+settings.labl+'>',//错误提示字符串
                myVal = '',//待验证的value值
                info = '',//验证规则及提示对象
                chkFlag = true,//验证的状态
                reg = [];//验证规则数组
            if(settings.displayNum  && blurObj.parents(settings.parentTip).find('div.'+settings.className+'').length >= 1) {
               return;
            }
            //获取value
            if(settings.checkType =="text") {//text,textarea...
                myVal = blurObj.val();
            } else {//select
                myVal = blurObj.find('option:selected').attr('value');
            }
            //处理radio
            if(settings.chkType == 'radio' && blurObj.filter(':checked').length == 0) {
                strTip += ""+settings.info[0]['tip']+'</div>';
                addWrongText2(blurObj, settings.parCls, strTip, settings.checkType);  
                chkFlag = false;
            }

            for(var i = 0; i < settings.info.length; i++){
                info = jq.extend({}, {negate: false}, settings.info[i]);
                reg = [];
                if(!chkFlag) {//验证失败不做以后的验证
                    break;
                }
                if(info.reg && info.tip) {
                    //获取reg
                    for(var j = 0, len = info.reg.length;j < len;j++) {
                        if(typeof info.reg[j] == 'number') {
                            reg.push(cf.fn.regType[info.reg[j]]);
                        } else {
                            reg.push(info.reg[j]);
                        }
                    }

                    //验证
                    for(var k = 0;k < reg.length;k++) {
                        var regRslt = reg[k].test(myVal);
                        if(!regRslt && !info.negate) {//匹配不成功，添加错误提示
                            strTip += ""+info.tip+'</div>';
                            addWrongText2(blurObj, settings.parCls, strTip, settings.checkType);  
                            chkFlag = false;
                            break;  
                        } else if(regRslt && info.negate) {
                            strTip += ""+info.tip+'</div>';
                            addWrongText2(blurObj, settings.parCls, strTip, settings.checkType);  
                            chkFlag = false;
                            break;
                        }
                    }
                }

            }
            if(chkFlag) {
                if(settings.callback) {
                   chkFlag = settings.callback(); 
                }
                return chkFlag;//成功
            }
        }

        function checkWordLen2(maxLen, range, val) {
            var len = val.length;
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
        }


        function addWrongText2(obj, cls, str, chkType) {
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
        }


        function removeWrongText2(obj, cls, settings) {
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
})(jQuery);

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




//占位符处理
(function(jq) {
    jq.fn.placeholder = function(settings) {
        var defaults = {
            oLabel: 'em',
            derc: 'next',
            eType: 'keydown'
        };

        var settings = jq.fn.extend({}, defaults, settings);
        if(!(settings.derc == 'next'&&jq(this).next(settings.oLabel).is(':hidden') || settings.derc != 'next'&&jq(this).prev(settings.oLabel).is(':hidden'))) {//占位符隐藏时不清空
            jq(this).val('');
        } 
        
        jq(this).on(settings.eType + ' input', function() {
            var derc = settings.derc,
                labl = settings.oLabel;
            if(derc == 'next') {
                jq(this).next(labl).hide();
            } else {
                jq(this).prev(labl).hide();
            }
        });

        jq(this).on('blur', function() {
            var val = jq(this).val(),
                derc = settings.derc,
                labl = settings.oLabel;
            if(val == '') {
                if(derc == 'next') {
                    jq(this).next(labl).show();
                } else {
                    jq(this).prev(labl).show();
                }
            }
        });

        if(settings.derc == 'next') {
            jq(this).next(settings.oLabel).on('click', function() {
                jq(this).prev().focus();
            });
        } else {
            jq(this).prev(settings.oLabel).on('click', function() {
                jq(this).next().focus();
            });
        }
    };
})(jQuery);

/*
 *	type: 返回值是否加&（true: 不加&，反之加[默认]）
 *	unReEmpty：清空标志（true:不清空，反之清空[默认]）
 *	reblur：是否触发blur（true:不触发，反之触发[默认]）	
*/
//RSA加密处理
function rsaEncryptNameAndPhone(dataObj, type, unReEmpty, reblur) { 
	var type = type || false,
		date = new Date(),
		chenghu = '',
		phoneObj = dataObj.phoneObj,
		chenhuObj = dataObj.chenhuObj,
		phoneTmp = phoneObj.val(),
		rsadata, data;
	
	if(chenhuObj) {//有称呼
		chenghu = chenhuObj.val();
	}
    var str = 'chenghu='+chenghu+'&phone='+phoneTmp;    
    if(typeof RSAUtils !== 'undefined') {
        rsadata = RSAUtils.encryptfun(phoneObj.val()+','+chenghu+','+date.getTime()+','+Math.random());
        str = str+'&rsadata='+rsadata+'&rsastatus=1';
    }
	
	if(!unReEmpty) {//清空
		phoneObj.val('');
		chenhuObj && chenhuObj.val('');	
	}	
	if(!reblur) {//触发blur
		phoneObj.trigger('blur');
		chenhuObj && chenhuObj.trigger('blur');	
	}			

	if(type) {
		return str;	
	} else {
        return '&'+str;
	}
}








//HTML模板引擎
;(function(root){
    //模版语句块正则
    var tempTag = /<%([\s\S]*?)%>/;

    //最后将被eval解析的js字符串
    var temphtml_js = '';

    /**
     * [htmltemp 所有定义和使用的变量都只在selector所包含的范围内有效]
     * @param  {[string]} selector [必须,jquery选择器]
     * @param  {[string || json]} data     [可选,若传入第三个参数则该参数为字符串(第三个参数的变量名),否则为json数据]
     * @param  {[object]} dataArr  [可选,可被第三个参数接收的对象]
     * @return {[void]}   
     */
    function htmltemp(elem , data , dataArr){
        temphtml_js = '';
        //模版语法解析后的html字符串放在templateHtml里
        var templateHtml = "";
        if(typeof data === 'string'){
            if(dataArr){
                eval('var ' + data + '= dataArr;');
            }
        }else{
            parseData(data);
        }
        elem.jQuery ? parseTemp(elem.html()) : parseTemp(elem);
        eval(temphtml_js.replace(/\r|\n/g , ' '));
        return templateHtml;
    }

    //html代码解析
    function parseTemp(str){
        var pos = execTag(str);
        if(pos){
            var html = trim(str.substr(0 , pos.index)).replace(/'/g , '&apos;');
            if(html.length){
                temphtml_js += contactHtml() + html + endLine();
            }
            temphtml_js += getTempVal(pos[1]);
            str = str.substr(pos.index + pos[0].length);
            parseTemp(str);
        }else{
            temphtml_js += contactHtml() + str + endLine();
        }
    }

    //模版块匹配
    function execTag(str){
        return tempTag.exec(str);
    }

    //连接html代码
    function contactHtml(){
        return 'templateHtml +=\'';
    }

    //获取'{%= varName %}'里面的varName的值
    function getTempVal(str){
        str = parseJs(trim(str));
        if(str.charAt(0) === '='){
            return 'templateHtml +=' + str.substr(1) + ';';
        }
        return str;
    }

    //结束一行js代码
    function endLine(){
        return '\';';
    }

    //被格式化的'>'与'<'转化回来
    function parseJs(str){
        return str.replace(/&lt;/g , '<').replace(/&gt;/g , '>');
    }

    //将被引进的json数据定义为局部的变量
    function parseData(data){
        if(!data)return;
        for(var i in data){
            temphtml_js += 'var ' + i + '= "' + data[i] + '";';
        }
    }

    function trim( str ){
        return str.replace(/(^\s*)|(\s*$)/ , '');
    }

    root.htmltemp = htmltemp;
})(window);

