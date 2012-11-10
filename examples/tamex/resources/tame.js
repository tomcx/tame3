/*
 * TAME [TwinCAT ADS Made Easy] V3.1
 * 
 * Copyright (c) 2009-2012 Thomas Schmidt; t.schmidt.p1 at freenet.de
 * 
 * Dual licensed under:
 *  MIT - http://www.opensource.org/licenses/mit-license
 *  GPLv3 - http://www.opensource.org/licenses/GPL-3.0
 * 
 */
var TAME={weekdShortNames:{ge:["So","Mo","Di","Mi","Do","Fr","Sa"],en:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},weekdLongNames:{ge:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],en:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},monthsShortNames:{ge:["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],en:["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sept","Oct","Nov","Dez"]},monthsLongNames:{ge:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],en:["January","February","March","April","May","June","July","August","September","October","November","December"]}};TAME.WebServiceClient=function(e){function l(ah){try{window.console.log(ah)}catch(ai){alert(ah)}}var V=this,m={M:16416,MX:16417,I:61472,IX:61473,Q:61488,QX:61489,Upload:61451,UploadInfo:61452,SumRd:61568,SumWr:61569,SumRdWr:61570},z={BOOL:1,BYTE:1,USINT:1,SINT:1,WORD:2,UINT:2,INT:2,INT16:2,INT1DP:2,DWORD:4,UDINT:4,DINT:4,TIME:4,TOD:4,DATE:4,DT:4,POINTER:4,REAL:4,LREAL:8,STRING:80,EndStruct:0},g=(typeof e.language==="string")?e.language:"ge",n=function(){var ah={},aj="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",ai;for(ai=0;ai<aj.length;ai++){ah[ai]=aj.charAt(ai)}return ah}(),q=function(){var ah={},aj="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",ai;for(ai=0;ai<aj.length;ai++){ah[aj.charAt(ai)]=ai}return ah}(),h=e.dataAlign4,B=[0],M={},i=false,a=0,v=0,f,c,K,ag;if(typeof e.serviceUrl==="string"){f=e.serviceUrl}else{l("TAME library error: Service URL is not a string!");return}if(typeof e.amsNetId==="string"){c=e.amsNetId}else{l("TAME library error: NetId is not a string!");return}if(e.amsPort===undefined){K="801"}else{if(typeof e.amsPort==="string"&&parseInt(e.amsPort,10)>=801&&parseInt(e.amsPort,10)<=804){K=e.amsPort}else{l("TAME library error: AMS Port Number ("+parseInt(e.amsPort,10)+") is no string or out of range!");return}}if(e.syncXmlHttp===true){ag=true;l('TAME library info: The "syncXmlHttp" parameter was set. Synchronous XMLHttpRequests are used by default.')}else{ag=false}this.dateNames={weekdShort:TAME.weekdShortNames[g],weekdLong:TAME.weekdLongNames[g],monthsShort:TAME.monthsShortNames[g],monthsLong:TAME.monthsLongNames[g]};this.maxStringLen=255;this.maxDropReq=10;this.useCheckBounds=true;function y(ah,ak,aj,am,ap){var al=[],ao=0,an=[],ai=0;if(typeof ah==="number"){al[0]=ah.toString(10)}else{if(typeof ah==="string"){al=ah.split(".")}else{l("TAME library error: Can't parse name of object/variable. Name is not a string or number!");l(ah);return}}if(aj===undefined){aj=window}ao=al.length-1;while(ai<ao){if(al[ai].charAt(al[ai].length-1)==="]"){an=al[ai].substring(0,al[ai].length-1).split("[");aj=aj[an[0]][an[1]]}else{if(aj[al[ai]]===undefined){aj[al[ai]]=[]}aj=aj[al[ai]]}ai++}if(al[ai].charAt(al[ai].length-1)==="]"){an=al[ai].substring(0,al[ai].length-1).split("[");aj=aj[an[0]];if(ak!==undefined){if(typeof am==="string"){ak=am+ak}if(typeof ap==="string"){ak=ak+ap}aj[an[1]]=ak}return aj[an[1]]}if(ak!==undefined){if(typeof am==="string"){ak=am+ak}if(typeof ap==="string"){ak=ak+ap}aj[al[ai]]=ak}return aj[al[ai]]}function ae(ah){if(ah===undefined){return false}if(!isNaN(ah)&&ah>0&&ah<=V.maxStringLen){return true}l("TAME library error: User defined string length not valid! length: "+ah);l("Max. string length: "+V.maxStringLen);return false}function x(ai){var ah;if(ai.addr){if(typeof ai.addr==="string"&&ai.addr.charAt(0)==="%"){if(ai.addr.charAt(2)==="X"){ah=m[ai.addr.substr(1,2)]}else{ah=m[ai.addr.substr(1,1)]}}else{l('TAME library error: Wrong address definition, should be a string and start with "%"!');l(ai);return}}else{if(ai.name){if(typeof ai.name==="string"){try{ah=M[ai.name].indexGroup}catch(aj){l("TAME library error: Can't get the IndexGroup for this request!");l("TAME library error: Please check the variable name.");l(aj);l(ai);return}}else{l("TAME library error: Varible name should be a string!");l(ai);return}}else{l("TAME library error: Neither a name nor an address for the variable/request defined!");l(ai);return}}if(isNaN(ah)){l("TAME library error: IndexGroup is not a number, check address or name definition of the variable/request!");l(ai)}return ah}function k(ai){var al,ah="",aj=[];if(ai.addr){if(typeof ai.addr==="string"&&ai.addr.charAt(0)==="%"){if(ai.addr.charAt(2)==="X"){ah=ai.addr.substr(3);aj=ah.split(".");al=parseInt(aj[0],10)*8+parseInt(aj[1],10)}else{al=parseInt(ai.addr.substr(3),10);if(typeof ai.addrOffset==="number"){al+=ai.addrOffset}}}else{l('TAME library error: Wrong address definition, should be a string and start with "%"!');l(ai);return}}else{if(ai.name){if(typeof ai.name==="string"){try{al=M[ai.name].indexOffset;if(typeof ai.addrOffset==="number"){al+=ai.addrOffset}}catch(ak){l("TAME library error: Can't get the IndexOffset for this request!");l("TAME library error: Please check the variable name.");l(ak);l(ai);return}}else{l("TAME library error: Varible name should be a string!");l(ai);return}}else{l("TAME library error: Neither a name nor an address for the variable/request defined!");l(ai);return}}if(isNaN(al)){l("TAME library error: IndexOffset is not a number, check address or name definition of the variable/request.");l(ai)}return al}function U(){var ai;if(window.XMLHttpRequest){ai=new window.XMLHttpRequest()}else{try{ai=new window.ActiveXObject("Msxml2.XMLHTTP")}catch(aj){try{ai=new window.ActiveXObject("Microsoft.XMLHTTP")}catch(ah){ai=null;l("TAME library error: Failed Creating XMLHttpRequest-Object!")}}}return ai}function u(ah){if(ah.reqDescr.debug){l(ah)}ah.send=function(){var ai,aj;if(typeof this.reqDescr.id==="number"&&B[this.reqDescr.id]>0){l("TAME library warning: Request dropped (last request with ID "+ah.reqDescr.id+" not finished!)");B[this.reqDescr.id]++;if(B[this.reqDescr.id]<=V.maxDropReq){return}B[this.reqDescr.id]=0}if(ah.sync===true){aj=false}else{if(this.reqDescr.sync===true){aj=false}else{if(this.reqDescr.sync===false){aj=true}else{if(ag===true){aj=false}else{aj=true}}}}this.xmlHttpReq=U();ai="<?xml version='1.0' encoding='utf-8'?>";ai+="<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' ";ai+="xmlns:xsd='http://www.w3.org/2001/XMLSchema' ";ai+="xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>";ai+="<soap:Body><q1:";ai+=this.method;ai+=" xmlns:q1='http://beckhoff.org/message/'><netId xsi:type='xsd:string'>";ai+=c;ai+="</netId><nPort xsi:type='xsd:int'>";ai+=K;ai+="</nPort><indexGroup xsi:type='xsd:unsignedInt'>";ai+=this.indexGroup;ai+="</indexGroup><indexOffset xsi:type='xsd:unsignedInt'>";ai+=this.indexOffset;ai+="</indexOffset>";if((this.method==="Read"||this.method==="ReadWrite")&&this.reqDescr.readLength>0){ai+="<cbRdLen xsi:type='xsd:int'>";ai+=this.reqDescr.readLength;ai+="</cbRdLen>"}if(this.pData&&this.pData.length>0){ai+="<pData xsi:type='xsd:base64Binary'>";ai+=this.pData;ai+="</pData>"}if(this.pwrData&&this.pwrData.length>0){ai+="<pwrData xsi:type='xsd:base64Binary'>";ai+=this.pwrData;ai+="</pwrData>"}ai+="</q1:";ai+=this.method;ai+="></soap:Body></soap:Envelope>";if(typeof this.xmlHttpReq==="object"){this.xmlHttpReq.open("POST",f,aj);this.xmlHttpReq.setRequestHeader("SOAPAction","http://beckhoff.org/action/TcAdsSync."+this.method);this.xmlHttpReq.setRequestHeader("Content-Type","text/xml; charset=utf-8");if(aj===true){this.xmlHttpReq.onreadystatechange=function(){if((ah.xmlHttpReq.readyState===4)&&(ah.xmlHttpReq.status===200)){V.parseResponse(ah)}};this.xmlHttpReq.send(ai)}else{this.xmlHttpReq.send(ai);V.parseResponse(ah)}if(typeof this.reqDescr.id==="number"){B[this.reqDescr.id]=1}}};return ah}function Q(ak,aj,ai,ah){var al;if(typeof ak.val==="string"){if(aj==="REAL"||aj==="LREAL"){al=parseFloat(ak.val)}else{al=parseInt(ak.val,10)}}else{if(typeof ak.val==="number"){al=ak.val}else{l("TAME library error: Wrong variable type for a numeric variable in write request!");l("TAME library error: Variable type should be number or string, but is "+typeof ak.val);l(ak);al=0}}if(isNaN(al)){al=0;l("TAME library error: Value of a numeric variable in write request is not a number.");l(ak)}if(V.useCheckBounds===true){if(aj==="LREAL"){if(!isFinite(al)){l("TAME library warning: Limit for LREAL value exceeded!");l("Upper limit: "+Number.MAX_VALUE);l("Lower limit: "+Number.MIN_VALUE);l("value: "+al);l(ak)}}else{if(aj==="REAL"){if(al>0){if(al<1.175495e-38){l("TAME library warning: Lower limit for positive REAL value exceeded!");l("limit: 1.175495e-38");l("value: "+al);l(ak);al=1.175495e-38}else{if(al>3.402823e+38){l("TAME library warning: Upper limit for positive REAL value exceeded!");l("limit: 3.402823e+38");l("value: "+al);l(ak);al=3.402823e+38}}}else{if(al<0){if(al>-1.175495e-38){l("TAME library warning: Upper limit for negative REAL value exceeded!");l("limit: -1.175495e-38");l("value: "+al);l(ak);al=-1.175495e-38}else{if(al<-3.402823e+38){l("TAME library warning: Lower limit for negative REAL value exceeded!");l("limit: -3.402823e+38");l("value: "+al);l(ak);al=-3.402823e+38}}}}}else{if(al<ai){l("TAME library warning: Lower limit for numeric value exceeded!");l("type: "+aj);l("limit: "+ai);l("value: "+al);l(ak);al=ai}else{if(al>ah){l("TAME library warning: Upper limit for numeric value exceeded!");l("type: "+aj);l("limit: "+ah);l("value: "+al);l(ak);al=ah}}}}}return al}function ad(ai){var ah=[];if(typeof ai.type==="string"){ah=ai.type.split(".");if(ah.length>2){ah[1]=ah.slice(1).join(".")}}else{if(i&&typeof ai.name==="string"){try{ah[0]=M[ai.name].type;if(ah[0]==="STRING"){ah[1]=M[ai.name].stringLength}else{if(typeof ai.format==="string"){ah[1]=ai.format}else{if(typeof ai.decPlaces==="number"){ah[1]=ai.decPlaces}else{if(typeof ai.dp==="number"){ah[1]=ai.dp}}}}}catch(aj){l("TAME library error: A problem occured while reading a data type from the symbol table!");l(aj);l(ai)}}else{l("TAME library error: Could not get the type of the item!");l(ai)}}return ah}function G(ah){if((ah>=97)&&(ah<=102)){return(ah-87)}if((ah>=65)&&(ah<=70)){return(ah-55)}if((ah>=48)&&(ah<=57)){return(ah-48)}return 0}function ab(al,ai){var ah=[],ak=al.toString(16),aj;while(ak.length<ai*2){ak="0"+ak}for(aj=0;aj<ai;aj++){ah[(ai-1)-aj]=((G(ak.charCodeAt(aj*2))*16)+G(ak.charCodeAt((aj*2)+1)))}return ah}function s(ai){var al=0,ao=0,am,ah,ak,an,aj;ah=Math.abs(ai);if(ai!==0){for(aj=128;aj>-127;aj--){ak=ah/Math.pow(2,aj);if(ak>=2){break}an=aj;am=ak}an+=127;am=am.toString(2);for(aj=2;aj<25;aj++){al<<=1;if(am.charAt(aj)==="1"){al+=1}}if(am.charAt(25)==="1"){al+=1}ao=an;ao<<=23;ao+=al;if(ai<0){ao+=2147483648}}return ao}function A(an){var aj=0,ap=0,ak={part1:0,part2:0},aq,am,ai,ah,ao,al;aq=Math.abs(an);if(an!==0){for(al=1024;al>=-1023;al--){am=aq/Math.pow(2,al);if(am>=2){break}ai=al;ao=am}ai+=1023;ao=ao.toString(2);for(al=2;al<22;al++){aj<<=1;if(ao.charAt(al)==="1"){aj+=1}}if(ao.charAt(al)==="1"){ah=true}al++;for(al;al<54;al++){ap<<=1;if(ao.charAt(al)==="1"){ap+=1}}ak.part1=ai;ak.part1<<=20;ak.part1+=aj;if(an<0){ak.part1+=2147483648}ak.part2=ap;if(ah===true){ak.part2+=2147483648}}return ak}function H(aj,ai){var ah;switch(ai){case"#d":case"#dd":ah=aj*86400000;break;case"#h":case"#hh":ah=aj*3600000;break;case"#m":case"#mm":ah=aj*60000;break;case"#s":case"#ss":ah=aj*1000;break;case"#ms":case"#msmsms":ah=aj;break;default:ah=aj;break}return ah}function p(an){var am=n,ak=0,ai="",al,aj,ah;while(ak<an.length){al=an[ak++];aj=an[ak++];ah=an[ak++];ai=ai+am[al>>2]+am[((al&3)<<4)|(aj>>4)]+(isNaN(aj)?"=":am[(((aj&15)<<2)|(ah>>6))])+((isNaN(aj)||isNaN(ah))?"=":am[ah&63])}return ai}function d(an,al,am,ak){var ap=[],ah,ao,ai,aj;if(an.val===undefined){switch(al){case"STRING":an.val="";break;case"DATE":case"DT":case"TOD":an.val=new Date();break;default:an.val=0;break}l("TAME library warning: Value of a variable in write request is not defined!");l(an)}switch(al){case"BOOL":if(an.val){ap[0]=1}else{ap[0]=0}break;case"BYTE":case"USINT":ah=Q(an,al,0,255);ap=ab(ah,ak);break;case"SINT":ah=Q(an,al,-128,127);if(ah<0){ah=ah+256}ap=ab(ah,ak);break;case"WORD":case"UINT":ah=Q(an,al,0,65535);ap=ab(ah,ak);break;case"INT":case"INT16":ah=Q(an,al,-32768,32767);if(ah<0){ah=ah+65536}ap=ab(ah,ak);break;case"INT1DP":an.val=Math.round(an.val*10);ah=Q(an,al,-32768,32767);if(ah<0){ah=ah+65536}ap=ab(ah,ak);break;case"DWORD":case"UDINT":ah=Q(an,al,0,4294967295);ap=ab(ah,ak);break;case"DINT":ah=Q(an,al,-2147483648,2147483647);if(ah<0){ah=ah+4294967296}ap=ab(ah,ak);break;case"REAL":ah=Q(an,al);ah=s(ah);ap=ab(ah,ak);break;case"LREAL":ah=Q(an,al);ah=A(ah);ap=ab(ah.part2,ak);ap=ap.concat(ab(ah.part1,ak));break;case"DATE":if(typeof an.val==="object"){an.val.setHours(0);an.val.setMinutes(0);an.val.setSeconds(0);ah=an.val.getTime()/1000-an.val.getTimezoneOffset()*60}else{l("TAME library error: Date is not an object!");l(an)}ap=ab(ah,ak);break;case"DT":if(typeof an.val==="object"){ah=an.val.getTime()/1000-an.val.getTimezoneOffset()*60}else{l("TAME library error: Date is not an object!");l(an)}ap=ab(ah,ak);break;case"TOD":if(typeof an.val==="object"){an.val.setYear(1970);an.val.setMonth(0);an.val.setDate(1);ah=an.val.getTime()-an.val.getTimezoneOffset()*60000}else{l("TAME library error: Date is not an object!");l(an)}ap=ab(ah,ak);break;case"STRING":ao=(am===undefined)?z.STRING:parseInt(am,10);if(ae(ao)){ai=ao<an.val.length?ao:an.val.length;for(aj=0;aj<ai;aj++){ap[aj]=an.val.charCodeAt(aj)}for(aj;aj<ao;aj++){ap[aj]=0}ap[aj]=0}break;case"TIME":ah=parseInt(an.val,10);ah=H(ah,am);if(ah<0){ah=0;l("TAME library warning: Lower limit for TIME variable exceeded!)");l("value: "+an.val+am);l(an)}else{if(ah>4294967295){ah=4294967295;l("TAME library warning: Upper limit for TIME variable exceeded!)");l("value: "+an.val+am);l(an)}}ap=ab(ah,ak);break;case"EndStruct":break;default:l("TAME library error: Unknown data type in write request : "+al);break}return ap}function t(ai){var ah=ai.toString(16);if((ah.length%2)!==0){ah="0"+ah}return ah}function j(ai,ah){ah=(isNaN(ah))?0:ah;var aj=ai.toString(10);while(aj.length<ah){aj="0"+aj}return aj}function af(an,am){var ah=am.split("#"),al=ah.length,ai="",ak,aj;for(aj=1;aj<al;aj++){switch(ah[aj]){case"D":ak=an.getDate();break;case"DD":ak=an.getDate();ak=j(ak,2);break;case"WD":ak=an.getDay();break;case"WKD":ak=V.dateNames.weekdShort[an.getDay()];break;case"WEEKDAY":ak=V.dateNames.weekdLong[an.getDay()];break;case"M":ak=an.getMonth()+1;break;case"MM":ak=an.getMonth()+1;ak=j(ak,2);break;case"MON":ak=V.dateNames.monthsShort[an.getMonth()];break;case"MONTH":ak=V.dateNames.monthsLong[an.getMonth()];break;case"YY":ak=an.getYear();while(ak>100){ak-=100}break;case"YYYY":ak=an.getFullYear();break;case"h":ak=an.getHours();break;case"hh":ak=an.getHours();ak=j(ak,2);break;case"m":ak=an.getMinutes();break;case"mm":ak=an.getMinutes();ak=j(ak,2);break;case"s":ak=an.getSeconds();break;case"ss":ak=an.getSeconds();ak=j(ak,2);break;case"ms":ak=an.getMilliseconds();break;case"msmsms":ak=an.getMilliseconds();ak=j(ak,3);break;default:ak=ah[aj];break}ai=ai+ak}return ai}function F(an,am){var ah=am.split("#"),al=ah.length,ai="",ak,aj;for(aj=1;aj<al;aj++){switch(ah[aj]){case"d":if(al<=2){ak=an/86400000}else{ak=Math.floor(an/86400000);an=an%86400000}break;case"dd":if(al<=2){ak=an/86400000}else{ak=Math.floor(an/86400000);an=an%86400000}ak=j(ak,2);break;case"h":if(al<=2){ak=an/3600000}else{ak=Math.floor(an/3600000);an=an%3600000}break;case"hh":if(al<=2){ak=an/3600000}else{ak=Math.floor(an/3600000);an=an%3600000}ak=j(ak,2);break;case"m":if(al<=2){ak=an/60000}else{ak=Math.floor(an/60000);an=an%60000}break;case"mm":if(al<=2){ak=an/60000}else{ak=Math.floor(an/60000);an=an%60000}ak=j(ak,2);break;case"s":if(al<=2){ak=an/1000}else{ak=Math.floor(an/1000);an=an%1000}break;case"ss":if(al<=2){ak=an/1000}else{ak=Math.floor(an/1000);an=an%1000}ak=j(ak,2);break;case"ms":ak=an;break;case"msmsms":ak=an;ak=j(ak,3);break;default:ak=ah[aj];break}ai=ai+ak}return ai}function P(ai){var ah=t(ai.charCodeAt(0));return parseInt(ah,16)}function ac(ah){var ai=P(ah);if(ai>127){ai=ai-256}return ai}function L(ai){var ah=t(ai.charCodeAt(1));ah+=t(ai.charCodeAt(0));return parseInt(ah,16)}function J(ah){var ai=L(ah);if(ai>32767){ai=ai-65536}return ai}function D(ai){var ah=t(ai.charCodeAt(3));ah+=t(ai.charCodeAt(2));ah+=t(ai.charCodeAt(1));ah+=t(ai.charCodeAt(0));return parseInt(ah,16)}function N(ah){var ai=D(ah);if(ai>2147483647){ai=ai-4294967296}return ai}function T(ah,aj){var ai=D(ah);if(aj===undefined){return ai}return(F(ai,aj))}function o(ah,aj){var ai=new Date(D(ah));ai=new Date(ai.getTime()+ai.getTimezoneOffset()*60000);if(aj===undefined){return ai}return(af(ai,aj))}function aa(ai,aj){var ah=new Date(D(ai)*1000);ah=new Date(ah.getTime()+ah.getTimezoneOffset()*60000);if(aj===undefined){return ah}return(af(ah,aj))}function r(aj){var al=1,an=0.5,ai=D(aj),ah,am,ak;if(ai===0){return 0}ah=((ai>>>31)===1)?"-":"+";ai<<=1;am=(ai>>>24)-127;ai<<=8;for(ak=1;ak<=23;ak++){al+=ai<0?an:0;ai<<=1;an/=2}return parseFloat(ah+(al*Math.pow(2,am)))}function C(aj){var ai=D(aj.substring(4,8)),am=D(aj.substring(0,4)),al=12,ak=1,ao=0.5,ah,an;if(ai===0&&am===0){return 0}ah=((ai>>>31)===1)?"-":"+";ai<<=1;an=(ai>>>21)-1023;ai<<=11;while(al<32){ak+=ai<0?ao:0;ai<<=1;ao/=2;al++}if((am>>>31)===1){ak+=ao;am<<=1;ao/=2}while(al<64){ak+=am<0?ao:0;am<<=1;ao/=2;al++}return parseFloat(ah+(ak*Math.pow(2,an)))}function Y(ah){return ah.split(String.fromCharCode(0))[0]}function O(ak){var al=q,an=0,ah="",am,aj,ai,ar,aq,ap,ao;ak=ak.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{ar=al[ak.charAt(an++)];aq=al[ak.charAt(an++)];ap=al[ak.charAt(an++)];ao=al[ak.charAt(an++)];am=(ar<<2)|(aq>>4);aj=((aq&15)<<4)|(ap>>2);ai=((ap&3)<<6)|ao;ah+=String.fromCharCode(am);if(ap!==64){ah+=String.fromCharCode(aj)}if(ao!==64){ah+=String.fromCharCode(ai)}}while(an<ak.length);return ah}function R(ai,ah,ak){var aj;switch(ah){case"BOOL":aj=(ai.charCodeAt(0)!="0");break;case"BYTE":case"USINT":aj=P(ai);break;case"SINT":aj=ac(ai);break;case"WORD":case"UINT":aj=L(ai);break;case"INT":case"INT16":aj=J(ai);break;case"INT1DP":aj=((J(ai))/10).toFixed(1);break;case"DWORD":case"UDINT":aj=D(ai);break;case"DINT":aj=N(ai);break;case"REAL":aj=r(ai);if(ak!==undefined){aj=aj.toFixed(parseInt(ak,10))}break;case"LREAL":aj=C(ai);if(ak!==undefined){aj=aj.toFixed(parseInt(ak,10))}break;case"STRING":aj=Y(ai);break;case"TOD":aj=o(ai,ak);break;case"TIME":aj=T(ai,ak);break;case"DT":case"DATE":aj=aa(ai,ak);break;case"EndStruct":break;default:l("TAME library error: Unknown data type at parsing read request: "+ah);break}return aj}function w(aA){var ah=aA.xmlHttpReq.responseXML.documentElement,ar=aA.reqDescr.items,ap=[],at=0,ax,aj,ak,az,an,av,ao,ay,ai,au,aq,al,am;try{aj=O(ah.getElementsByTagName("ppData")[0].firstChild.data);for(aq=0,al=ar.length;aq<al;aq++){ax=ar[aq];ap=ad(ax);ai=ap[0];au=ap[1];av=z[ai];switch(ai){case"STRING":if(au!==undefined){an=parseInt(au,10)}av=(ae(an)?an:av)+1;break;case"EndStruct":av=ax.val;break}ao=av<4?av:4;if(aA.reqDescr.seq!==true){am=k(aA.reqDescr);at=ax.addr-am}else{if(aA.reqDescr.dataAlign4===true&&ao>1&&ai!=="STRING"&&at>0){ay=at%ao;if(ay>0){at+=ao-ay}}}ak=aj.substr(at,av);az=R(ak,ai,au);if(ai!=="EndStruct"){y(ax.jvar,az,aA.reqDescr.dataObj,ax.prefix,ax.suffix)}if(aA.reqDescr.seq===true){at+=av}}}catch(aw){l("TAME library error: Parsing Failed:"+aw);l(ax);return}}function b(aH){var ah=aH.xmlHttpReq.responseXML.documentElement,au=aH.reqDescr.items,ar=[],ay=0,aj=0,aw=window,aE,al,am,aG,aA,ak,az,at,ap,an,av,ax,aq,aD,ao;function aC(){var aJ,aI;if(h===true&&ak!=="STRING"){aJ=aA<4?aA:4;if(aJ>1&&aj>0){aI=aj%aJ;if(aI>0){aj+=aJ-aI}}if(aJ>aD){aD=aJ}}}function ai(){var aJ,aI;if(ak==="STRING"){if(az!==undefined){aJ=parseInt(az,10)}else{if(typeof M[aE.name].stringLength==="number"){aJ=M[aE.name].stringLength}}aA=(ae(aJ)?aJ:aA)+1}aI=am.substr(aj,aA);aG=R(aI,ak,az);y(av,aG,aw,aE.prefix,aE.suffix);aj+=aA}function aF(){var aJ,aI,aN,aM,aK,aL;for(aL in aE.def){if(aE.def.hasOwnProperty(aL)){aI=aE.def[aL].split(".");if(aI[0]==="ARRAY"){aN=parseInt(aI[1],10);aM=aI.length-1;for(aJ=0;aJ<aN;aJ++){ak=aI[2];if(aI[aM]==="SP"){av=aL+aJ;if(aM>=4){az=aI.slice(3,-1).join(".")}}else{av=aL+"."+aJ;if(aM>=3){az=aI.slice(3).join(".")}}if(ax!==undefined){av=ax+"."+av}aA=z[ak];aC();ai()}}else{if(ax!==undefined){av=ax+"."+aL}else{av=aL}ak=aI[0];az=aI.slice(1).join(".");aA=z[ak];aC();ai()}}}if(h===true&&aD>1&&ak!=="STRING"){if(aD>4){aD=4}aK=aj%aD;if(aK>0){aj+=aD-aK}}}try{al=O(ah.getElementsByTagName("ppRdData")[0].firstChild.data);for(at=0,ap=au.length;at<ap;at++){am=al.substr(ay,4);an=R(am,"DWORD");if(an!==0){l("TAME library error: ADS sub command error while processing a SumReadRequest!");l("Error code: "+an);l(au[at])}ay+=4}for(at=0;at<ap;at++){aE=au[at];ar=ad(aE);ak=ar[0];az=ar[1];ao=M[aE.name].size;am=al.substr(ay,ao);switch(ak){case"ARRAY":aw=y(aE.jvar);aj=0;aq=M[aE.name].arrayLength;if(M[aE.name].arrayDataType==="USER"){for(ax=0;ax<aq;ax++){aF()}}else{ak=M[aE.name].arrayDataType;aA=z[ak];for(ax=0;ax<aq;ax++){av=ax;ai()}}break;case"USER":aw=y(aE.jvar);aj=0;aF();break;default:aG=R(am,ak,az);y(aE.jvar,aG,aw,aE.prefix,aE.suffix)}ay+=ao}}catch(aB){l("TAME library error: Parsing Failed:"+aB);l(aE);return}}function I(an,al,aj){var ai={},ak,ah;ah=z[al];if(typeof aj.name==="string"){aj.name=aj.name.toUpperCase()}switch(al){case"STRING":if(ae(aj.strlen)){al+="."+aj.strlen;ah=aj.strlen}else{if(i===true){try{ah=M[aj.name].stringLength;al+="."+ah}catch(am){l("TAME library error: A problem occured while reading the string length from the symbol table!");l(am)}}}ah++;break;case"TIME":case"TOD":case"DT":case"DATE":if(typeof aj.format==="string"){al+="."+aj.format}break;case"REAL":case"LREAL":if(typeof aj.decPlaces==="number"){al+="."+aj.decPlaces}else{if(typeof aj.dp==="number"){al+="."+aj.dp}}break}ai={addr:aj.addr,name:aj.name,id:aj.id,oc:aj.oc,ocd:aj.ocd,readLength:ah,debug:aj.debug,sync:aj.sync,seq:true,items:[{val:aj.val,jvar:aj.jvar,type:al,prefix:aj.prefix,suffix:aj.suffix}]};if(an==="Write"){V.writeReq(ai)}else{V.readReq(ai)}}function E(ak,al,aj){var am={},ay={},at,ai,aA=0,aB=0,az=0,aC,ah=[],aF,ao,ar=0,au,ap,aE=0,av=0,aH,aq,aG,aw;if(typeof aj.name==="string"){aj.name=aj.name.toUpperCase()}if(ak==="Write"&&typeof aj.val==="object"){ay=aj.val}else{if(typeof aj.jvar==="string"){ay=y(aj.jvar)}else{l("TAME library error: No data object for this "+ak+"-Request defined!")}}if(typeof aj.arrlen==="number"){at=aj.arrlen}else{if(i===true){try{at=M[aj.name].arrayLength}catch(aD){l("TAME library error: A proble occured while reading the array length from the symbol table!");l(aD)}}else{l("TAME library error: Can't get the array length for this request!")}}if(typeof aj.item==="number"&&!isNaN(aj.item)&&ak==="Write"){aG=true;if(aj.item<0||aj.item>at-1){l('TAME library error: Wrong value for "item"!');l("item: "+aj.item);l("Last array index: "+(at-1))}}function an(){var aI;if(typeof aj.def==="string"){aj.def=y(aj.def)}else{if(typeof aj.def!=="object"){l("TAME library error: No structure definition found!")}}for(aI in aj.def){if(aj.def.hasOwnProperty(aI)){ah=aj.def[aI].split(".");if(ah[0]==="ARRAY"){aF=parseInt(ah[1],10);ah.shift();ah.shift()}else{aF=1}for(aB=0;aB<aF;aB++){if(ah[0]==="STRING"){if(typeof ah[1]==="string"){au=parseInt(ah[1],10)}ap=(ae(au)?au:z[ah[0]])+1}else{ap=z[ah[0]]}if(h===true&&ap>1&&ah[0]!=="STRING"&&ar>0){aH=ar%ap;if(aH>0){ar+=ap-aH}}ar+=ap}if(h===true&&ap>aE&&ah[0]!=="STRING"){aE=ap}}}if(h===true&&aE>1&&ah[0]!=="STRING"){if(aE>4){aE=4}aH=ar%aE;if(aH>0){av=aE-aH;ar+=av}}if(aG){ai=ar*aj.item;at=1}am={addr:aj.addr,name:aj.name,addrOffset:ai,id:aj.id,oc:aj.oc,ocd:aj.ocd,debug:aj.debug,readLength:ar*at,seq:true,dataAlign4:h,dataObj:ay,sync:aj.sync,items:[]};for(aB=0;aB<at;aB++){for(aI in aj.def){if(aj.def.hasOwnProperty(aI)){ah=aj.def[aI].split(".");if(ah[0]==="ARRAY"){aF=parseInt(ah[1],10);ao=ah.length-1;for(az=0;az<aF;az++){if(ah[ao]==="SP"){am.items[aA]={jvar:aB+"."+aI+az};if(ao===4){am.items[aA].type=ah[2]+"."+ah[3]}else{am.items[aA].type=ah[2]}}else{am.items[aA]={jvar:aB+"."+aI+"."+az};if(ao===3){am.items[aA].type=ah[2]+"."+ah[3]}else{am.items[aA].type=ah[2]}}if(ak==="Write"){if(aG){if(ah[ao]==="SP"){am.items[aA].val=ay[aj.item][aI+az]}else{am.items[aA].val=ay[aj.item][aI][az]}}else{if(ah[ao]==="SP"){am.items[aA].val=ay[aB][aI+az]}else{am.items[aA].val=ay[aB][aI][az]}}}aA++}}else{am.items[aA]={jvar:aB+"."+aI,type:aj.def[aI]};if(ak==="Write"){if(aG){am.items[aA].val=ay[aj.item][aI]}else{am.items[aA].val=ay[aB][aI]}}aA++}}}if(h===true){am.items[aA]={type:"EndStruct",val:av};aA++}}}function ax(){aC=z[al];switch(al){case"STRING":if(ae(aj.strlen)){al+="."+aj.strlen;aC=aj.strlen}else{if(i===true){aC=M[aj.name].stringLength;al+="."+aC}}aC++;break;case"TIME":case"TOD":case"DT":case"DATE":if(typeof aj.format==="string"){al+="."+aj.format}break;case"REAL":case"LREAL":if(typeof aj.decPlaces==="number"){al+="."+aj.decPlaces}else{if(typeof aj.dp==="number"){al+="."+aj.dp}}break}if(aG){ai=aj.item*aC;at=1}am={addr:aj.addr,name:aj.name,addrOffset:ai,id:aj.id,oc:aj.oc,ocd:aj.ocd,readLength:aC*at,debug:aj.debug,seq:true,dataObj:ay,items:[]};for(aB=0;aB<at;aB++){am.items[aB]={jvar:aB,type:al};if(ak==="Write"){if(aG){am.items[aB].val=ay[aj.item]}else{am.items[aB].val=ay[aB]}}}}if(al==="STRUCT"){an()}else{ax()}if(ak==="Write"){V.writeReq(am)}else{V.readReq(am)}}function X(ah,ap){var am={},ai={},aq=[],ak=0,ao,aj,al,an;if(typeof ap.name==="string"){ap.name=ap.name.toUpperCase()}if(ah==="Write"&&typeof ap.val==="object"){ai=ap.val}else{if(typeof ap.jvar==="string"){ai=y(ap.jvar)}else{l("TAME library error: No data object for this "+ah+"-Request defined!")}}if(typeof ap.def==="string"){ap.def=y(ap.def)}else{if(typeof ap.def!=="object"){l("TAME library error: No structure defininition found!")}}am={addr:ap.addr,name:ap.name,id:ap.id,oc:ap.oc,ocd:ap.ocd,debug:ap.debug,seq:true,dataAlign4:h,dataObj:ai,sync:ap.sync,items:[]};for(al in ap.def){if(ap.def.hasOwnProperty(al)){aq=ap.def[al].split(".");if(aq[0]==="ARRAY"){aj=parseInt(aq[1],10);ao=aq.length-1;for(an=0;an<aj;an++){if(aq[ao]==="SP"){am.items[ak]={jvar:al+an};if(ao===4){am.items[ak].type=aq[2]+"."+aq[3]}else{am.items[ak].type=aq[2]}}else{am.items[ak]={jvar:al+"."+an};if(ao===3){am.items[ak].type=aq[2]+"."+aq[3]}else{am.items[ak].type=aq[2]}}if(ah==="Write"){if(aq[ao]==="SP"){am.items[ak].val=ai[al+an]}else{am.items[ak].val=ai[al][an]}}ak++}}else{am.items[ak]={jvar:al,type:ap.def[al]};if(ah==="Write"){am.items[ak].val=ai[al]}ak++}}}if(ah==="Write"){V.writeReq(am)}else{V.readReq(am)}}this.writeReq=function(ak){var am=ak.items,au={},ah=[],ap=[],ax=[],ao,at,aj,an,ai,av,aq,aw,al,ar;if(typeof ak.name==="string"){ak.name=ak.name.toUpperCase()}for(ar=0,aj=am.length;ar<aj;ar++){aw=am[ar];ap=ad(aw);ao=ap[0];at=ap[1];an=(z[ao]<4)?z[ao]:4;if(ak.dataAlign4===true&&an>1&&ao!=="STRING"&&ah.length>0){aq=ah.length%an;if(aq>0){av=an-aq;for(al=1;al<=av;al++){ah.push(0)}}}if(ao==="EndStruct"){for(al=1;al<=aw.val;al++){ah.push(0)}}else{ax=d(aw,ao,at,an);ah=ah.concat(ax)}}if(ah&&ah.length>0){ah=p(ah)}au={method:"Write",indexGroup:x(ak),indexOffset:k(ak),pData:ah,reqDescr:ak};u(au).send()};this.readReq=function(aj){var ar={},ak=aj.items,am=[],at,aq,al,ah,an,ao,au,ap,ai;if(typeof aj.name==="string"){aj.name=aj.name.toUpperCase()}if(typeof aj.readLength!=="number"){aj.readLength=0;for(ap=0,ah=ak.length;ap<ah;ap++){at=ak[ap];am=ad(at);al=am[0];aq=am[1];if(al==="STRING"){if(typeof aq==="string"){au=parseInt(aq,10)}ao=(ae(au)?au:z[al])+1}else{ao=z[al]}if(aj.seq===true){if(aj.dataAlign4===true&&ao>1&&al!=="STRING"&&aj.readLength>0){an=aj.readLength%ao;if(an>0){aj.readLength+=ao-an}}aj.readLength+=ao}else{ai=k(aj);aj.readLength=ao+at.addr-ai}}}ar={method:"Read",indexGroup:x(aj),indexOffset:k(aj),reqDescr:aj};u(ar).send()};this.sumReadReq=function(aj){var at={},am=aj.items,ap=[],av=[],aw=[],al=0,ai=am.length,ak={},ao,ar,au,aq,an,ah;aj.readLength=ai*4;for(aq=0;aq<ai;aq++){au=am[aq];if(typeof au.name==="string"){au.name=au.name.toUpperCase()}ap=ad(au);ao=ap[0];ar=ap[1];an=M[au.name].size;aj.readLength+=an;ak.val=x(au);aw=d(ak,"UDINT",ar,4);av=av.concat(aw);ak.val=k(au);aw=d(ak,"UDINT",ar,4);av=av.concat(aw);ak.val=an;aw=d(ak,"UDINT",ar,4);av=av.concat(aw)}if(av.length>0){ah=p(av)}at={method:"ReadWrite",indexGroup:m.SumRd,indexOffset:am.length,pwrData:ah,reqDescr:aj};u(at).send()};this.logSymbols=function(){l(M)};this.getSymbolsAsJSON=function(){var ai;if(typeof JSON!=="object"){l("TAME library error: No JSON parser found.")}else{try{ai=JSON.stringify(M);return ai}catch(ah){l("TAME library error: Could not convert the Symbol Table to JSON:"+ah)}}};this.setSymbolsFromJSON=function(ai){if(typeof JSON!=="object"){l("TAME library error: No JSON parser found.")}else{try{M=JSON.parse(ai)}catch(ah){l("TAME library error: Could not create the Symbol Table from JSON:"+ah);return}i=true;l("TAME library info: Symbol Table successfully created from JSON data.")}};this.parseResponse=function(am){var ai=am.xmlHttpReq.responseXML.documentElement,al,ah;if(typeof am.reqDescr.id==="number"){B[am.reqDescr.id]=0}try{ah=ai.getElementsByTagName("faultstring")[0].firstChild.data;try{al=ai.getElementsByTagName("errorcode")[0].firstChild.data}catch(ak){al="-"}l("TAME library error: Message from server:  "+ah+" ("+al+")");return}catch(aj){al=0}if(typeof ai.normalize==="function"){ai.normalize()}if(am.method==="Read"||am.method==="ReadWrite"){switch(am.indexGroup){case m.UploadInfo:S(am);break;case m.Upload:Z(am);break;case m.SumRd:b(am);break;default:w(am)}}if(typeof am.reqDescr.oc==="function"){if(typeof am.reqDescr.ocd==="number"){window.setTimeout(am.reqDescr.oc,am.reqDescr.ocd)}else{am.reqDescr.oc()}}};this.writeBool=function(ah){I("Write","BOOL",ah)};this.writeByte=function(ah){I("Write","BYTE",ah)};this.writeUsint=function(ah){I("Write","USINT",ah)};this.writeSint=function(ah){I("Write","SINT",ah)};this.writeWord=function(ah){I("Write","WORD",ah)};this.writeUint=function(ah){I("Write","UINT",ah)};this.writeInt=function(ah){I("Write","INT",ah)};this.writeInt1Dp=function(ah){I("Write","INT1DP",ah)};this.writeDword=function(ah){I("Write","DWORD",ah)};this.writeUdint=function(ah){I("Write","UDINT",ah)};this.writeDint=function(ah){I("Write","DINT",ah)};this.writeReal=function(ah){I("Write","REAL",ah)};this.writeLreal=function(ah){I("Write","LREAL",ah)};this.writeString=function(ah){I("Write","STRING",ah)};this.writeTime=function(ah){I("Write","TIME",ah)};this.writeTod=function(ah){I("Write","TOD",ah)};this.writeDate=function(ah){I("Write","DATE",ah)};this.writeDt=function(ah){I("Write","DT",ah)};this.readBool=function(ah){I("Read","BOOL",ah)};this.readByte=function(ah){I("Read","BYTE",ah)};this.readUsint=function(ah){I("Read","USINT",ah)};this.readSint=function(ah){I("Read","SINT",ah)};this.readWord=function(ah){I("Read","WORD",ah)};this.readUint=function(ah){I("Read","UINT",ah)};this.readInt=function(ah){I("Read","INT",ah)};this.readInt1Dp=function(ah){I("Read","INT1DP",ah)};this.readDword=function(ah){I("Read","DWORD",ah)};this.readUdint=function(ah){I("Read","UDINT",ah)};this.readDint=function(ah){I("Read","DINT",ah)};this.readReal=function(ah){I("Read","REAL",ah)};this.readLreal=function(ah){I("Read","LREAL",ah)};this.readString=function(ah){I("Read","STRING",ah)};this.readTime=function(ah){I("Read","TIME",ah)};this.readTod=function(ah){I("Read","TOD",ah)};this.readDate=function(ah){I("Read","DATE",ah)};this.readDt=function(ah){I("Read","DT",ah)};this.writeStruct=function(ah){X("Write",ah)};this.readStruct=function(ah){X("Read",ah)};this.writeArrayOfBool=function(ah){E("Write","BOOL",ah)};this.writeArrayOfByte=function(ah){E("Write","BYTE",ah)};this.writeArrayOfUsint=function(ah){E("Write","USINT",ah)};this.writeArrayOfSint=function(ah){E("Write","SINT",ah)};this.writeArrayOfWord=function(ah){E("Write","WORD",ah)};this.writeArrayOfUint=function(ah){E("Write","UINT",ah)};this.writeArrayOfInt=function(ah){E("Write","INT",ah)};this.writeArrayOfInt1Dp=function(ah){E("Write","INT1DP",ah)};this.writeArrayOfDword=function(ah){E("Write","DWORD",ah)};this.writeArrayOfUdint=function(ah){E("Write","UDINT",ah)};this.writeArrayOfDint=function(ah){E("Write","DINT",ah)};this.writeArrayOfReal=function(ah){E("Write","REAL",ah)};this.writeArrayOfLreal=function(ah){E("Write","LREAL",ah)};this.writeArrayOfString=function(ah){E("Write","STRING",ah)};this.writeArrayOfTime=function(ah){E("Write","TIME",ah)};this.writeArrayOfTod=function(ah){E("Write","TOD",ah)};this.writeArrayOfDate=function(ah){E("Write","DATE",ah)};this.writeArrayOfDt=function(ah){E("Write","DT",ah)};this.writeArrayOfStruct=function(ah){E("Write","STRUCT",ah)};this.readArrayOfBool=function(ah){E("Read","BOOL",ah)};this.readArrayOfByte=function(ah){E("Read","BYTE",ah)};this.readArrayOfUsint=function(ah){E("Read","USINT",ah)};this.readArrayOfSint=function(ah){E("Read","SINT",ah)};this.readArrayOfWord=function(ah){E("Read","WORD",ah)};this.readArrayOfUint=function(ah){E("Read","UINT",ah)};this.readArrayOfInt=function(ah){E("Read","INT",ah)};this.readArrayOfInt1Dp=function(ah){E("Read","INT1DP",ah)};this.readArrayOfDword=function(ah){E("Read","DWORD",ah)};this.readArrayOfUdint=function(ah){E("Read","UDINT",ah)};this.readArrayOfDint=function(ah){E("Read","DINT",ah)};this.readArrayOfReal=function(ah){E("Read","REAL",ah)};this.readArrayOfLreal=function(ah){E("Read","LREAL",ah)};this.readArrayOfString=function(ah){E("Read","STRING",ah)};this.readArrayOfTime=function(ah){E("Read","TIME",ah)};this.readArrayOfTod=function(ah){E("Read","TOD",ah)};this.readArrayOfDate=function(ah){E("Read","DATE",ah)};this.readArrayOfDt=function(ah){E("Read","DT",ah)};this.readArrayOfStruct=function(ah){E("Read","STRUCT",ah)};function W(){var ah={method:"Read",sync:true,indexGroup:m.UploadInfo,indexOffset:0,reqDescr:{readLength:8}};u(ah).send()}function S(am){var ah=am.xmlHttpReq.responseXML.documentElement,ai,an,ak,aj;try{ai=O(ah.getElementsByTagName("ppData")[0].firstChild.data);an=ai.substr(0,4);a=R(an,"DWORD");an=ai.substr(4,4);v=R(an,"DWORD")}catch(al){l("TAME library error: Parsing of UploadInfo failed:"+al);return}aj={method:"Read",sync:true,indexGroup:m.Upload,indexOffset:0,reqDescr:{readLength:v}};u(aj).send()}function Z(az){var ah=az.xmlHttpReq.responseXML.documentElement,aq=0,aw=4,at=8,ao=12,al=30,ak,am,ay,ap,ar,ai,ax,an,aj,av;try{ak=O(ah.getElementsByTagName("ppData")[0].firstChild.data);for(ap=0;ap<a;ap++){am=ak.substr(aq,4);ar=R(am,"DWORD");ai=ak.substring(aq+al,(aq+ar)).split(String.fromCharCode(0));M[ai[0]]={typeString:ai[1],indexGroup:R(ak.substr(aq+aw,4),"DWORD"),indexOffset:R(ak.substr(aq+at,4),"DWORD"),size:R(ak.substr(aq+ao,4),"DWORD")};ax=ai[1].split(" ");if(ax[0]==="ARRAY"){M[ai[0]].type=ax[0];an=ax[1].substring(1,ax[1].length-1);an=an.split("..");an=parseInt(an[1],10)-parseInt(an[0],10)+1;M[ai[0]].arrayLength=an;aj=ax[3].split("(");if(aj[1]!==undefined){aj[1]=aj[1].substr(0,aj[1].length-1);M[ai[0]].fullType=ax[0]+"."+an+"."+aj[0]+"."+aj[1];M[ai[0]].stringLength=parseInt(aj[1],10)}else{M[ai[0]].fullType=ax[0]+"."+an+"."+aj[0]}M[ai[0]].itemSize=M[ai[0]].size/an;M[ai[0]].arrayDataType="USER";for(av in z){if(z.hasOwnProperty(av)){if(aj[0]===av){M[ai[0]].arrayDataType=aj[0]}}}}else{aj=ax[0].split("(");if(aj[1]!==undefined){aj[1]=aj[1].substr(0,aj[1].length-1);M[ai[0]].fullType=aj[0]+"."+aj[1];M[ai[0]].stringLength=parseInt(aj[1],10)}else{M[ai[0]].fullType=aj[0]}M[ai[0]].type="USER";for(av in z){if(z.hasOwnProperty(av)){if(aj[0]===av){M[ai[0]].type=aj[0]}}}}aq+=ar}i=true;l("TAME library info: End of reading the UploadInfo.");l("TAME library info: Symbol table ready.")}catch(au){l("TAME library error: Parsing of uploaded symbol information failed:"+au);return}}if(e.dontFetchSymbols===true){l("TAME library info: Reading of the UploadInfo deactivated. Symbol Table could not be created.")}else{l("TAME library info: Start of reading the UploadInfo.");W()}};TAME.WebServiceClient.createClient=function(a){return new TAME.WebServiceClient(a)};