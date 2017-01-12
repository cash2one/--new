
var companyData;


!function(jq){

  //表单效果
  jq('.form_line > input').val("");
  jq('.form_line > label').click(function(){
    jq(this).parent().find('input').focus().trigger('click');
  });
  jq('.form_line > input').on('keydown',function(){
    jq(this).parent().find('label').hide();
  });
  jq('.form_line > input').blur(function(){
    if(jq(this).val() == '') jq(this).parent().find('label').show();
  });



    //2015-3-3首页首屏改版 By windy
    //申请tab切换
    var sepcilText = jq('.sec_topr_form input:text');
    jq('ul.sec_topr_tab').on('click', 'li', function() {
        var leftArr = [31, 105, 178, 252],
            tip = jq('.sec_topr_form > .form_hd > p'),
            idx = jq(this).index() || 0;

        jq(this).addClass('on').siblings().removeClass('on');
        jq('i.index_ico_arrow').css('left', leftArr[idx] + 'px');
        tip.hide().eq(idx).show(); 
        sepcilText.eq(0).trigger('click').focus();  
    });
	
    //text border颜色处理
    
    sepcilText.on('click focus',function() {
        //jq(this).parents('.index_form').find('input:text').not(this).css('border-color', '#ddd');
        jq(this).css('border-color','#f25618');
    });

    sepcilText.eq(0).trigger('click').focus(); 
}(jQuery);


var yuyue_apply_agin=0;
//表单验证
function checkFromLine(obj){
  var a =  jq(obj).parent().find('.text[name="yourname"]').checkForm({className:"index_check",content:["称呼不可为空","称呼最多12个字符"],type:[1,2],reg:{len:12},checkFormType:obj, displayNum:true});
  var b =   jq(obj).parent().find('.text[name="yourphone"]').checkForm({className:"index_check",content:["手机号码不可以为空","请填写正确的手机号码"],type:[1,2], reg:0,checkFormType:obj, displayNum:true});
  var c = jq(obj).parent().find('.select_l[name=User_Shen]').checkForm({className:"index_check",content:["请选择您的所在地"],type:[1],checkFormType:obj, displayNum:true,checkType:"select"});
   if(c === 0) {
		var d = jq(obj).parent().find('.select_r[name=User_City]').checkForm({className:"index_check",content:["请选择您的所在地"],type:[1],checkFormType:obj, displayNum:true,checkType:"select"});   
   }
  if( a === 0 && b === 0 && c === 0 && d === 0){
      upLoadData(obj);
   }
  
}

function checkFromLine2(obj){
  var a =  jq(obj).parent().find('.text[name="yourname"]').checkForm({className:"index_check2",content:["称呼不可为空","称呼最多12个字符"],type:[1,2],reg:{len:12},checkFormType:obj, displayNum:true});
  var b =   jq(obj).parent().find('.text[name="yourphone"]').checkForm({className:"index_check2",content:["手机号码不可以为空","请填写正确的手机号码"],type:[1,2], reg:0,checkFormType:obj, displayNum:true});
  
}
//传输方法
function upLoadData(obj){
 
 /*********************************取值******************************************/
  var chenghu =  jq(obj).parent().find('.text[name="yourname"]').val();
  var phone   =  jq(obj).parent().find('.text[name="yourphone"]').val();
  var phonepre= phone;

  //新版电话号码加密  
  var encryptData = rsaEncryptNameAndPhone({phoneObj:jq(obj).parent().find('.text[name="yourphone"]'),chenhuObj:jq(obj).parent().find('.text[name="yourname"]')});

  // console.log(phonepre);
    //加密之后的号码
   //   phone   =RSAUtils.encryptfun(phone+','+Math.random());
  //var price   =  jq(obj).parent().find('#select').val();
  var price = '';
  var shen    =  jq(obj).parent().find('select[name="User_Shen"]').val();
  var city    =  jq(obj).parent().find('select[name="User_City"]').val();
  var ptag;
  var rsastr = 1;
  // if(jq(obj).parent().find('#select').length>0)
  // {
  //   clickStream.getCvParams('1_1_1_3');
  //   ptag='1_1_1_3';
  // }else
  // {
  //   clickStream.getCvParams('1_1_1_1');
  //   ptag='1_1_1_1';
  // }

  /********************************将表单的值清空************************************/


  //price = price?price:'';
  pro_sourceid = 3;
  pro_s_sourceid = 0
  forum_sourice = 14;
  operating_type = 1;
  device_src = 7;
  sourceid = 1;
  s_sourceid = 2;
  var url = "/zb/index.php";
  
  // var _data = "phone=" + phone + "&chenghu=" + chenghu + "&pro_sourceid=" + pro_sourceid + "&pro_s_sourceid=" + pro_s_sourceid + "&forum_sourice=" + forum_sourice + "&operating_type=" + operating_type +  "&device_src=" + device_src + "&sourceid=" + sourceid + "&s_sourceid=" + s_sourceid +"&ptag="+ptag +"&zxys="+price+"&shen="+shen +"&city="+city+"&rsastr=" + rsastr;
    
  var _data = "pro_sourceid=" + pro_sourceid + "&pro_s_sourceid=" + pro_s_sourceid + "&forum_sourice=" + forum_sourice + "&operating_type=" + operating_type +  "&device_src=" + device_src + "&sourceid=" + sourceid + "&s_sourceid=" + s_sourceid +"&ptag="+ptag +"&zxys="+price+"&shen="+shen +"&city="+city+encryptData;
  
/*******************************微信招标************************************/  
		  var weixin_code = ''; 
		  var start_qrcode_id = '';
		  jq.ajax({  
					async:true, 
					type:"GET",      
					dataType: 'jsonp',    
					url:"http://www.to8to.com/api/weixin/run.php",      
					data:{action:'createQrcode',cookie_id:'test',data:'createWxCode',type:1}, 
					success:function(res){ 
							if(res.code==0)
							{
								weixin_code = res.url;
								start_qrcode_id = res.qrcode_id;
/*******************************微信招标************************************/   						
						
						  jq.ajax({
							type: "POST",
							url: url,
							data: _data,
							beforeSend: function() {
							  var reg1 = /^((\(\d{2,3}\))|(\d{3}\-))?(13|15|17|18)\d{9}$/;
							  if (!reg1.test(phonepre)) {
								return false;
							  }
							  if (!chenghu || chenghu == "请填写您的姓名") {
								return false;
							  }
							  if (yuyue_apply_agin > 0) {
								return false;
							  } else {
								yuyue_apply_agin++;
							  }

							},
							success: function(result) {
							  var username=getCookie('username',true);
							  //清除客服弹窗
                popCustSrvWin&&popCustSrvWin.clear();
								
							  if (typeof(JSON) == "undefined") {
								var res = eval("(" + result + ")")
							  } else {
								var res = JSON.parse(result)
							  }
							 
							  if (res.status == 1) {
								   if (!res.tmpYid)
								  {
									overFive();
									yuyue_apply_agin = 0;
									return;
								  }
								  if(!username)
								  {	
									 var login = '</p><input type="button" value="登入" style="display:none" id="login_zb" onclick="zb_login('+res.tmpYid+','+res.phone+')">';
								  }
								  //更改部分，完善资料弹窗 2015-3-12 by windy
								  /*if(ptag == '1_1_1_78') {//验房不用完善资料
									    var successStr = zb_first_pop(weixin_code,res.tmpYid);
										jq('.window_box').windowBox({
										  width:560,
										  title:"提示",
										  wbcStr:successStr,
											closeFn:'stop_code_status'
										});
										zb_getwxstatus(start_qrcode_id,res.tmpYid);
								  } else {
									  indexSubZbStepOne(res,weixin_code);
								  }*/
								  indexSubZbStepOneNew(res,weixin_code);
								  /*var successStr = zb_first_pop(weixin_code,res.tmpYid);
									jq('.window_box').windowBox({
									  width:560,
									  title:"提示",
									  wbcStr:successStr,
								  		closeFn:'stop_code_status'
									});*/
									//indexSubZbStepOne(res,weixin_code);
									//End Modify
									//zb_getwxstatus(start_qrcode_id,res.tmpYid);
									yuyue_apply_agin = 0;
								return false;
							  }
							  else if(res.status == 5)
							  {
								 window_box_close();
								 indexYYFail(res.cityname);
								 yuyue_apply_agin = 0;
								 return false;
							  }
							  else
							  {
								var cityname = encodeURI(res.cityname);
								var tyid   = encodeURI(res.tmpid);
								showPopWin("http://www.to8to.com/zb/frame_global.php?msg="+cityname + "&tyid=" + tyid , 456, 254, null, true);
								yuyue_apply_agin = 0;
							  }
							  
							}                                                                                                                                                                                                                                                                                                 
						  })
/*******************************微信招标************************************/  						  
									}
						else
						{
							alert(res.msg); 
						} 
							 
					}              
			  });
/*******************************微信招标************************************/ }
//招标登入
function zb_login(tmpYid,phone)
{	
	window_box_close();
	setZero();		
	showPopWin('http://www.to8to.com/pop_login.php?tmpyid='+tmpYid+'&phone='+phone, 500, 426, null, false);
}


  
  function pop_parent_submit (tmpyid,phone){
	  alert(tmpyid+'-----'+phone);return false;
	/*
	var aidsval = [];
		jq.ajax({
		  url:'/xgt_get_userinfo.php?' + Math.random(),
		  success:function(data){
			  if(data.status == true ){
			  jq('#imgids').attr('aids',data.aids);
			}else if( data.status == false){
			  jq('#imgids').attr('aids','false');
			}
		  },
		  async:false,
		  dataType:'json'
		});
		return aidsval;
	  }
	  */
  }


//清除标记
function setZero(){
	userWriteDiary = 0;
	userClickCollect=0;
	userClickCollectDiary=0;
	userClickDeleteComment=0;
	userClickDeleteDiary_did = 0;
	userClickDeleteDiary_sid = 0;
	userCommentDiary = 0;
	replayI = 0;
	replayName = 0;
	replayCid = 0;
	userSendContent = 0 ;
}

//免费预约

function checkBookStylist() {
  jq('input[name="chenghu"]').checkForm({className:"fb_check",content:["称呼不可以为空"],type:[1]});
  jq('input[name="prephone"]').checkForm({className:"fb_check",content:["手机号码不可以为空","请填写正确的手机号码"],type:[1,2], reg:0});
}


function checkFreeBooking(obj){//免费申请预约验证
  obj = jq(obj).parent()[0];
  var nNameValue = jq('input[name="chenghu"]').checkForm({className:"fb_check",content:["称呼不可以为空"],type:[1],checkFormType:obj,displayNum:true});
  var nPhoneValue = jq('input[name="prephone"]').checkForm({className:"fb_check",content:["手机号码不可以为空","请填写正确的手机号码"],type:[1,2], reg:0,checkFormType:obj,displayNum:true})
  var sheng = jq('#User_Shenfree').checkForm({className:"fb_check",content:["请选择你的所在省份"],type:[1], reg:0,checkFormType:obj,checkType:"select",displayNum:true});
  if(sheng == 0) {
    var city = jq('#User_Cityfree').checkForm({className:"fb_check",content:["请选择你的所在地区"],type:[1], reg:0,checkFormType:obj,checkType:"select",displayNum:true});
  }

  if(nNameValue == 0 && nPhoneValue ==0 && sheng ==0 && city ==0){
	/*******************************微信招标************************************/  
			  var weixin_code = ''; 
			  var start_qrcode_id = '';
        var phonetemp =  jq('input[name="prephone"]').val();
     
        //电话加密
        var phone =  RSAUtils.encryptfun(phonetemp);   //电话号码加密
            jq('input[name="phone"]').val(phone);
            jq('input[name="prephone"]').val('');
			  jq.ajax({  
						async:true, 
						type:"GET",      
						dataType: 'jsonp',    
						url:"#",      
						data:{action:'createQrcode',cookie_id:'test',data:'createWxCode',type:1}, 
						success:function(res){ 
								if(res.code==0)
								{
                 
                  //RSAUtils.encryptfun()
									weixin_code = res.url;
									start_qrcode_id = res.qrcode_id;
	/*******************************微信招标************************************/ 
      jq.ajax({
        url: '#',
        type: 'post',
        dataType: 'json',
        data: jq("#yyForm").serialize(),
        beforeSend: function() {
          if (yuyue_apply_agin > 0) {
            return false
          } else {
            yuyue_apply_agin++
          }
        },
        /*success: function(data){
            window_box_close();
            if(data.status == 1){
                 indexYYSuccess();
            } else if(data.status == 5){
               indexYYFail(data.cityname);
            }
        },
        error: function(){
            window_box_close();
        }*/
		
		success: function(res) {
			  window_box_close();
			  if (res.status == 1) {
				   if (!res.tmpYid)
				  {
						overFive();
						yuyue_apply_agin = 0;
						return;
				  }
				  
				  //更改部分，完善资料弹窗 2015-3-12 by windy
				  /*var successStr = zb_first_pop(weixin_code,res.tmpYid);
					jq('.window_box').windowBox({
					  width:560,
					  title:"提示",
					  wbcStr:successStr,
						closeFn:'stop_code_status'
					});*/
					indexSubZbStepOneNew(res,weixin_code);
					//End Modify
					//zb_getwxstatus(start_qrcode_id,res.tmpYid);
				return false;
			  }
			  else if(res.status == 5)
			  {
				 window_box_close();
				 indexYYFail(res.cityname);
				 return false;
			  }
			  else
			  {
				var cityname = encodeURI(res.cityname);
				var tyid   = encodeURI(res.tmpid);
				showPopWin("#?msg="+cityname + "&tyid=" + tyid , 456, 254, null, true);
			  }
			  yuyue_apply_agin = 0
			}
	
	
     });
/*******************************微信招标************************************/  						  
									}
						else
						{
							alert(res.msg); 
						} 
							 
					}              
			  });
/*******************************微信招标************************************/ }

};















