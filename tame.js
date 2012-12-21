/*
 * TAME [TwinCAT ADS Made Easy] V3.2 beta
 * 
 * Copyright (c) 2009-2012 Thomas Schmidt; t.schmidt.p1 at freenet.de
 * 
 * Dual licensed under:
 *  MIT - http://www.opensource.org/licenses/mit-license
 *  GPLv3 - http://www.opensource.org/licenses/GPL-3.0
 * 
 */
var TAME={weekdShortNames:{ge:["So","Mo","Di","Mi","Do","Fr","Sa"],en:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},weekdLongNames:{ge:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],en:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},monthsShortNames:{ge:["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],en:["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sept","Oct","Nov","Dez"]},monthsLongNames:{ge:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],en:["January","February","March","April","May","June","July","August","September","October","November","December"]}};TAME.WebServiceClient=function(e){function l(ai){try{window.console.log(ai)}catch(aj){alert(ai)}}var W=this,m={M:16416,MX:16417,I:61472,IX:61473,Q:61488,QX:61489,Upload:61451,UploadInfo:61452,SumRd:61568,SumWr:61569,SumRdWr:61570},z={BOOL:1,BYTE:1,USINT:1,SINT:1,WORD:2,UINT:2,INT:2,INT16:2,INT1DP:2,DWORD:4,UDINT:4,DINT:4,TIME:4,TOD:4,DATE:4,DT:4,POINTER:4,REAL:4,LREAL:8,STRING:80,EndStruct:0},g=(typeof e.language==="string")?e.language:"ge",n=function(){var ai={},ak="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",aj;for(aj=0;aj<ak.length;aj++){ai[aj]=ak.charAt(aj)}return ai}(),q=function(){var ai={},ak="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",aj;for(aj=0;aj<ak.length;aj++){ai[ak.charAt(aj)]=aj}return ai}(),h=e.dataAlign4,C=[0],N={},j=false,a=0,v=0,f,c,L,ah;if(typeof e.serviceUrl==="string"){f=e.serviceUrl}else{l("TAME library error: Service URL is not a string!");return}if(typeof e.amsNetId==="string"){c=e.amsNetId}else{l("TAME library error: NetId is not a string!");return}if(e.amsPort===undefined){L="801"}else{if(typeof e.amsPort==="string"&&parseInt(e.amsPort,10)>=801&&parseInt(e.amsPort,10)<=804){L=e.amsPort}else{l("TAME library error: AMS Port Number ("+parseInt(e.amsPort,10)+") is no string or out of range!");return}}if(e.syncXmlHttp===true){ah=true;l('TAME library info: The "syncXmlHttp" parameter was set. Synchronous XMLHttpRequests are used by default.')}else{ah=false}this.dateNames={weekdShort:TAME.weekdShortNames[g],weekdLong:TAME.weekdLongNames[g],monthsShort:TAME.monthsShortNames[g],monthsLong:TAME.monthsLongNames[g]};this.maxStringLen=255;this.maxDropReq=10;this.useCheckBounds=true;function y(ai,al,ak,an,aq){var am=[],ap=0,ao=[],aj=0;if(typeof ai==="number"){am[0]=ai.toString(10)}else{if(typeof ai==="string"){am=ai.split(".")}else{l("TAME library error: Can't parse name of object/variable. Name is not a string or number!");l(ai);return}}if(ak===undefined){ak=window}ap=am.length-1;while(aj<ap){if(am[aj].charAt(am[aj].length-1)==="]"){ao=am[aj].substring(0,am[aj].length-1).split("[");ak=ak[ao[0]][ao[1]]}else{if(ak[am[aj]]===undefined){ak[am[aj]]=[]}ak=ak[am[aj]]}aj++}if(am[aj].charAt(am[aj].length-1)==="]"){ao=am[aj].substring(0,am[aj].length-1).split("[");ak=ak[ao[0]];if(al!==undefined){if(typeof an==="string"){al=an+al}if(typeof aq==="string"){al=al+aq}ak[ao[1]]=al}return ak[ao[1]]}if(al!==undefined){if(typeof an==="string"){al=an+al}if(typeof aq==="string"){al=al+aq}ak[am[aj]]=al}return ak[am[aj]]}function af(ai){if(ai===undefined){return false}if(!isNaN(ai)&&ai>0&&ai<=W.maxStringLen){return true}l("TAME library error: User defined string length not valid! length: "+ai);l("Max. string length: "+W.maxStringLen);return false}function x(aj){var ai;if(aj.addr){if(typeof aj.addr==="string"&&aj.addr.charAt(0)==="%"){if(aj.addr.charAt(2)==="X"){ai=m[aj.addr.substr(1,2)]}else{ai=m[aj.addr.substr(1,1)]}}else{l('TAME library error: Wrong address definition, should be a string and start with "%"!');l(aj);return}}else{if(aj.name){if(typeof aj.name==="string"){try{ai=N[aj.name].indexGroup}catch(ak){l("TAME library error: Can't get the IndexGroup for this request!");l("TAME library error: Please check the variable name.");l(ak);l(aj);return}}else{l("TAME library error: Varible name should be a string!");l(aj);return}}else{l("TAME library error: Neither a name nor an address for the variable/request defined!");l(aj);return}}if(isNaN(ai)){l("TAME library error: IndexGroup is not a number, check address or name definition of the variable/request!");l(aj)}return ai}function k(aj){var am,ai="",ak=[];if(aj.addr){if(typeof aj.addr==="string"&&aj.addr.charAt(0)==="%"){if(aj.addr.charAt(2)==="X"){ai=aj.addr.substr(3);ak=ai.split(".");am=parseInt(ak[0],10)*8+parseInt(ak[1],10)}else{am=parseInt(aj.addr.substr(3),10);if(typeof aj.addrOffset==="number"){am+=aj.addrOffset}}}else{l('TAME library error: Wrong address definition, should be a string and start with "%"!');l(aj);return}}else{if(aj.name){if(typeof aj.name==="string"){try{am=N[aj.name].indexOffset;if(typeof aj.addrOffset==="number"){am+=aj.addrOffset}}catch(al){l("TAME library error: Can't get the IndexOffset for this request!");l("TAME library error: Please check the variable name.");l(al);l(aj);return}}else{l("TAME library error: Varible name should be a string!");l(aj);return}}else{l("TAME library error: Neither a name nor an address for the variable/request defined!");l(aj);return}}if(isNaN(am)){l("TAME library error: IndexOffset is not a number, check address or name definition of the variable/request.");l(aj)}return am}function V(){var aj;if(window.XMLHttpRequest){aj=new window.XMLHttpRequest()}else{try{aj=new window.ActiveXObject("Msxml2.XMLHTTP")}catch(ak){try{aj=new window.ActiveXObject("Microsoft.XMLHTTP")}catch(ai){aj=null;l("TAME library error: Failed Creating XMLHttpRequest-Object!")}}}return aj}function u(ai){if(ai.reqDescr.debug){l(ai)}ai.send=function(){var aj,ak;if(typeof this.reqDescr.id==="number"&&C[this.reqDescr.id]>0){l("TAME library warning: Request dropped (last request with ID "+ai.reqDescr.id+" not finished!)");C[this.reqDescr.id]++;if(C[this.reqDescr.id]<=W.maxDropReq){return}C[this.reqDescr.id]=0}if(ai.sync===true){ak=false}else{if(this.reqDescr.sync===true){ak=false}else{if(this.reqDescr.sync===false){ak=true}else{if(ah===true){ak=false}else{ak=true}}}}this.xmlHttpReq=V();aj="<?xml version='1.0' encoding='utf-8'?>";aj+="<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' ";aj+="xmlns:xsd='http://www.w3.org/2001/XMLSchema' ";aj+="xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>";aj+="<soap:Body><q1:";aj+=this.method;aj+=" xmlns:q1='http://beckhoff.org/message/'><netId xsi:type='xsd:string'>";aj+=c;aj+="</netId><nPort xsi:type='xsd:int'>";aj+=L;aj+="</nPort><indexGroup xsi:type='xsd:unsignedInt'>";aj+=this.indexGroup;aj+="</indexGroup><indexOffset xsi:type='xsd:unsignedInt'>";aj+=this.indexOffset;aj+="</indexOffset>";if((this.method==="Read"||this.method==="ReadWrite")&&this.reqDescr.readLength>0){aj+="<cbRdLen xsi:type='xsd:int'>";aj+=this.reqDescr.readLength;aj+="</cbRdLen>"}if(this.pData&&this.pData.length>0){aj+="<pData xsi:type='xsd:base64Binary'>";aj+=this.pData;aj+="</pData>"}if(this.pwrData&&this.pwrData.length>0){aj+="<pwrData xsi:type='xsd:base64Binary'>";aj+=this.pwrData;aj+="</pwrData>"}aj+="</q1:";aj+=this.method;aj+="></soap:Body></soap:Envelope>";if(typeof this.xmlHttpReq==="object"){this.xmlHttpReq.open("POST",f,ak);this.xmlHttpReq.setRequestHeader("SOAPAction","http://beckhoff.org/action/TcAdsSync."+this.method);this.xmlHttpReq.setRequestHeader("Content-Type","text/xml; charset=utf-8");if(ak===true){this.xmlHttpReq.onreadystatechange=function(){if((ai.xmlHttpReq.readyState===4)&&(ai.xmlHttpReq.status===200)){W.parseResponse(ai)}};this.xmlHttpReq.send(aj)}else{this.xmlHttpReq.send(aj);W.parseResponse(ai)}if(typeof this.reqDescr.id==="number"){C[this.reqDescr.id]=1}}};return ai}function R(al,ak,aj,ai){var am;if(typeof al.val==="string"){if(ak==="REAL"||ak==="LREAL"){am=parseFloat(al.val)}else{am=parseInt(al.val,10)}}else{if(typeof al.val==="number"){am=al.val}else{l("TAME library error: Wrong variable type for a numeric variable in write request!");l("TAME library error: Variable type should be number or string, but is "+typeof al.val);l(al);am=0}}if(isNaN(am)){am=0;l("TAME library error: Value of a numeric variable in write request is not a number.");l(al)}if(W.useCheckBounds===true){if(ak==="LREAL"){if(!isFinite(am)){l("TAME library warning: Limit for LREAL value exceeded!");l("Upper limit: "+Number.MAX_VALUE);l("Lower limit: "+Number.MIN_VALUE);l("value: "+am);l(al)}}else{if(ak==="REAL"){if(am>0){if(am<1.175495e-38){l("TAME library warning: Lower limit for positive REAL value exceeded!");l("limit: 1.175495e-38");l("value: "+am);l(al);am=1.175495e-38}else{if(am>3.402823e+38){l("TAME library warning: Upper limit for positive REAL value exceeded!");l("limit: 3.402823e+38");l("value: "+am);l(al);am=3.402823e+38}}}else{if(am<0){if(am>-1.175495e-38){l("TAME library warning: Upper limit for negative REAL value exceeded!");l("limit: -1.175495e-38");l("value: "+am);l(al);am=-1.175495e-38}else{if(am<-3.402823e+38){l("TAME library warning: Lower limit for negative REAL value exceeded!");l("limit: -3.402823e+38");l("value: "+am);l(al);am=-3.402823e+38}}}}}else{if(am<aj){l("TAME library warning: Lower limit for numeric value exceeded!");l("type: "+ak);l("limit: "+aj);l("value: "+am);l(al);am=aj}else{if(am>ai){l("TAME library warning: Upper limit for numeric value exceeded!");l("type: "+ak);l("limit: "+ai);l("value: "+am);l(al);am=ai}}}}}return am}function ae(aj){var ai=[];if(typeof aj.type==="string"){ai=aj.type.split(".");if(ai.length>2){ai[1]=ai.slice(1).join(".")}}else{if(j&&typeof aj.name==="string"){try{ai[0]=N[aj.name].type;if(ai[0]==="STRING"){ai[1]=N[aj.name].stringLength}else{if(typeof aj.format==="string"){ai[1]=aj.format}else{if(typeof aj.decPlaces==="number"){ai[1]=aj.decPlaces}else{if(typeof aj.dp==="number"){ai[1]=aj.dp}}}}}catch(ak){l("TAME library error: A problem occured while reading a data type from the symbol table!");l(ak);l(aj)}}else{l("TAME library error: Could not get the type of the item!");l(aj)}}return ai}function H(ai){if((ai>=97)&&(ai<=102)){return(ai-87)}if((ai>=65)&&(ai<=70)){return(ai-55)}if((ai>=48)&&(ai<=57)){return(ai-48)}return 0}function ac(am,aj){var ai=[],al=am.toString(16),ak;while(al.length<aj*2){al="0"+al}for(ak=0;ak<aj;ak++){ai[(aj-1)-ak]=((H(al.charCodeAt(ak*2))*16)+H(al.charCodeAt((ak*2)+1)))}return ai}function s(aj){var am=0,ap=0,an,ai,al,ao,ak;ai=Math.abs(aj);if(aj!==0){for(ak=128;ak>-127;ak--){al=ai/Math.pow(2,ak);if(al>=2){break}ao=ak;an=al}ao+=127;an=an.toString(2);for(ak=2;ak<25;ak++){am<<=1;if(an.charAt(ak)==="1"){am+=1}}if(an.charAt(25)==="1"){am+=1}ap=ao;ap<<=23;ap+=am;if(aj<0){ap+=2147483648}}return ap}function B(ao){var ak=0,aq=0,al={part1:0,part2:0},ar,an,aj,ai,ap,am;ar=Math.abs(ao);if(ao!==0){for(am=1024;am>=-1023;am--){an=ar/Math.pow(2,am);if(an>=2){break}aj=am;ap=an}aj+=1023;ap=ap.toString(2);for(am=2;am<22;am++){ak<<=1;if(ap.charAt(am)==="1"){ak+=1}}if(ap.charAt(am)==="1"){ai=true}am++;for(am;am<54;am++){aq<<=1;if(ap.charAt(am)==="1"){aq+=1}}al.part1=aj;al.part1<<=20;al.part1+=ak;if(ao<0){al.part1+=2147483648}al.part2=aq;if(ai===true){al.part2+=2147483648}}return al}function I(ak,aj){var ai;switch(aj){case"#d":case"#dd":ai=ak*86400000;break;case"#h":case"#hh":ai=ak*3600000;break;case"#m":case"#mm":ai=ak*60000;break;case"#s":case"#ss":ai=ak*1000;break;case"#ms":case"#msmsms":ai=ak;break;default:ai=ak;break}return ai}function A(ap,ar){var ai=ar.split("#"),ao=ai.length,aq=/:|\.|-|_/,ak=0,aj=0,am,al,an,at;for(al=1;al<ao;al++){if(aq.test(ai[al])===true){at=true}}if(at!==true){l("TAME library error: No splitter for TOD string found!");l("String: "+ap);l("Format: "+ar);return 0}an=ap.split(aq);for(al=1;al<ao;al++){switch(ai[al]){case"h":case"hh":am=parseInt(an[aj],10)*3600000;aj++;break;case"m":case"mm":am=parseInt(an[aj],10)*60000;aj++;break;case"s":case"ss":am=parseInt(an[aj],10)*1000;aj++;break;case"ms":case"msmsms":am=parseInt(an[aj],10);aj++;break;default:am=0}ak+=am}return ak}function p(ao){var an=n,al=0,aj="",am,ak,ai;while(al<ao.length){am=ao[al++];ak=ao[al++];ai=ao[al++];aj=aj+an[am>>2]+an[((am&3)<<4)|(ak>>4)]+(isNaN(ak)?"=":an[(((ak&15)<<2)|(ai>>6))])+((isNaN(ak)||isNaN(ai))?"=":an[ai&63])}return aj}function d(ao,am,an,al){var aq=[],ai,ap,aj,ak;if(ao.val===undefined){switch(am){case"STRING":ao.val="";break;case"DATE":case"DT":case"TOD":ao.val=new Date();break;default:ao.val=0;break}l("TAME library warning: Value of a variable in write request is not defined!");l(ao)}switch(am){case"BOOL":if(ao.val){aq[0]=1}else{aq[0]=0}break;case"BYTE":case"USINT":ai=R(ao,am,0,255);aq=ac(ai,al);break;case"SINT":ai=R(ao,am,-128,127);if(ai<0){ai=ai+256}aq=ac(ai,al);break;case"WORD":case"UINT":ai=R(ao,am,0,65535);aq=ac(ai,al);break;case"INT":case"INT16":ai=R(ao,am,-32768,32767);if(ai<0){ai=ai+65536}aq=ac(ai,al);break;case"INT1DP":ao.val=Math.round(ao.val*10);ai=R(ao,am,-32768,32767);if(ai<0){ai=ai+65536}aq=ac(ai,al);break;case"DWORD":case"UDINT":ai=R(ao,am,0,4294967295);aq=ac(ai,al);break;case"DINT":ai=R(ao,am,-2147483648,2147483647);if(ai<0){ai=ai+4294967296}aq=ac(ai,al);break;case"REAL":ai=R(ao,am);ai=s(ai);aq=ac(ai,al);break;case"LREAL":ai=R(ao,am);ai=B(ai);aq=ac(ai.part2,al);aq=aq.concat(ac(ai.part1,al));break;case"DATE":if(typeof ao.val==="object"){ao.val.setHours(0);ao.val.setMinutes(0);ao.val.setSeconds(0);ai=ao.val.getTime()/1000-ao.val.getTimezoneOffset()*60}else{l("TAME library error: Date is not an object!");l(ao)}aq=ac(ai,al);break;case"DT":if(typeof ao.val==="object"){ai=ao.val.getTime()/1000-ao.val.getTimezoneOffset()*60}else{l("TAME library error: Date is not an object!");l(ao)}aq=ac(ai,al);break;case"TOD":if(typeof ao.val==="object"){ao.val.setYear(1970);ao.val.setMonth(0);ao.val.setDate(1);ai=ao.val.getTime()-ao.val.getTimezoneOffset()*60000}else{if(typeof ao.val==="string"){if(an===""||an===undefined){an="#hh#:#mm";l("TAME library error: No format given for TOD string! Using default #hh#:#mm.");l(ao)}ai=A(ao.val,an)}else{l("TAME library error: Time of day is wether a date object nor a string!");l(ao)}}aq=ac(ai,al);break;case"STRING":ap=(an===undefined)?z.STRING:parseInt(an,10);if(af(ap)){aj=ap<ao.val.length?ap:ao.val.length;for(ak=0;ak<aj;ak++){aq[ak]=ao.val.charCodeAt(ak)}for(ak;ak<ap;ak++){aq[ak]=0}aq[ak]=0}break;case"TIME":ai=parseInt(ao.val,10);ai=I(ai,an);if(ai<0){ai=0;l("TAME library warning: Lower limit for TIME variable exceeded!)");l("value: "+ao.val+an);l(ao)}else{if(ai>4294967295){ai=4294967295;l("TAME library warning: Upper limit for TIME variable exceeded!)");l("value: "+ao.val+an);l(ao)}}aq=ac(ai,al);break;case"EndStruct":break;default:l("TAME library error: Unknown data type in write request : "+am);break}return aq}function t(aj){var ai=aj.toString(16);if((ai.length%2)!==0){ai="0"+ai}return ai}function i(aj,ai){ai=(isNaN(ai))?0:ai;var ak=aj.toString(10);while(ak.length<ai){ak="0"+ak}return ak}function ag(ao,an){var ai=an.split("#"),am=ai.length,aj="",al,ak;for(ak=1;ak<am;ak++){switch(ai[ak]){case"D":al=ao.getDate();break;case"DD":al=ao.getDate();al=i(al,2);break;case"WD":al=ao.getDay();break;case"WKD":al=W.dateNames.weekdShort[ao.getDay()];break;case"WEEKDAY":al=W.dateNames.weekdLong[ao.getDay()];break;case"M":al=ao.getMonth()+1;break;case"MM":al=ao.getMonth()+1;al=i(al,2);break;case"MON":al=W.dateNames.monthsShort[ao.getMonth()];break;case"MONTH":al=W.dateNames.monthsLong[ao.getMonth()];break;case"YY":al=ao.getYear();while(al>100){al-=100}break;case"YYYY":al=ao.getFullYear();break;case"h":al=ao.getHours();break;case"hh":al=ao.getHours();al=i(al,2);break;case"m":al=ao.getMinutes();break;case"mm":al=ao.getMinutes();al=i(al,2);break;case"s":al=ao.getSeconds();break;case"ss":al=ao.getSeconds();al=i(al,2);break;case"ms":al=ao.getMilliseconds();break;case"msmsms":al=ao.getMilliseconds();al=i(al,3);break;default:al=ai[ak];break}aj=aj+al}return aj}function G(ao,an){var ai=an.split("#"),am=ai.length,aj="",al,ak;for(ak=1;ak<am;ak++){switch(ai[ak]){case"d":if(am<=2){al=ao/86400000}else{al=Math.floor(ao/86400000);ao=ao%86400000}break;case"dd":if(am<=2){al=ao/86400000}else{al=Math.floor(ao/86400000);ao=ao%86400000}al=i(al,2);break;case"h":if(am<=2){al=ao/3600000}else{al=Math.floor(ao/3600000);ao=ao%3600000}break;case"hh":if(am<=2){al=ao/3600000}else{al=Math.floor(ao/3600000);ao=ao%3600000}al=i(al,2);break;case"m":if(am<=2){al=ao/60000}else{al=Math.floor(ao/60000);ao=ao%60000}break;case"mm":if(am<=2){al=ao/60000}else{al=Math.floor(ao/60000);ao=ao%60000}al=i(al,2);break;case"s":if(am<=2){al=ao/1000}else{al=Math.floor(ao/1000);ao=ao%1000}break;case"ss":if(am<=2){al=ao/1000}else{al=Math.floor(ao/1000);ao=ao%1000}al=i(al,2);break;case"ms":al=ao;break;case"msmsms":al=ao;al=i(al,3);break;default:al=ai[ak];break}aj=aj+al}return aj}function Q(aj){var ai=t(aj.charCodeAt(0));return parseInt(ai,16)}function ad(ai){var aj=Q(ai);if(aj>127){aj=aj-256}return aj}function M(aj){var ai=t(aj.charCodeAt(1));ai+=t(aj.charCodeAt(0));return parseInt(ai,16)}function K(ai){var aj=M(ai);if(aj>32767){aj=aj-65536}return aj}function E(aj){var ai=t(aj.charCodeAt(3));ai+=t(aj.charCodeAt(2));ai+=t(aj.charCodeAt(1));ai+=t(aj.charCodeAt(0));return parseInt(ai,16)}function O(ai){var aj=E(ai);if(aj>2147483647){aj=aj-4294967296}return aj}function U(ai,ak){var aj=E(ai);if(ak===undefined){return aj}return(G(aj,ak))}function o(ai,ak){var aj=new Date(E(ai));aj=new Date(aj.getTime()+aj.getTimezoneOffset()*60000);if(ak===undefined){return aj}return(ag(aj,ak))}function ab(aj,ak){var ai=new Date(E(aj)*1000);ai=new Date(ai.getTime()+ai.getTimezoneOffset()*60000);if(ak===undefined){return ai}return(ag(ai,ak))}function r(ak){var am=1,ao=0.5,aj=E(ak),ai,an,al;if(aj===0){return 0}ai=((aj>>>31)===1)?"-":"+";aj<<=1;an=(aj>>>24)-127;aj<<=8;for(al=1;al<=23;al++){am+=aj<0?ao:0;aj<<=1;ao/=2}return parseFloat(ai+(am*Math.pow(2,an)))}function D(ak){var aj=E(ak.substring(4,8)),an=E(ak.substring(0,4)),am=12,al=1,ap=0.5,ai,ao;if(aj===0&&an===0){return 0}ai=((aj>>>31)===1)?"-":"+";aj<<=1;ao=(aj>>>21)-1023;aj<<=11;while(am<32){al+=aj<0?ap:0;aj<<=1;ap/=2;am++}if((an>>>31)===1){al+=ap;an<<=1;ap/=2}while(am<64){al+=an<0?ap:0;an<<=1;ap/=2;am++}return parseFloat(ai+(al*Math.pow(2,ao)))}function Z(ai){return ai.split(String.fromCharCode(0))[0]}function P(al){var am=q,ao=0,ai="",an,ak,aj,at,ar,aq,ap;al=al.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{at=am[al.charAt(ao++)];ar=am[al.charAt(ao++)];aq=am[al.charAt(ao++)];ap=am[al.charAt(ao++)];an=(at<<2)|(ar>>4);ak=((ar&15)<<4)|(aq>>2);aj=((aq&3)<<6)|ap;ai+=String.fromCharCode(an);if(aq!==64){ai+=String.fromCharCode(ak)}if(ap!==64){ai+=String.fromCharCode(aj)}}while(ao<al.length);return ai}function S(aj,ai,al){var ak;switch(ai){case"BOOL":ak=(aj.charCodeAt(0)!="0");break;case"BYTE":case"USINT":ak=Q(aj);break;case"SINT":ak=ad(aj);break;case"WORD":case"UINT":ak=M(aj);break;case"INT":case"INT16":ak=K(aj);break;case"INT1DP":ak=((K(aj))/10).toFixed(1);break;case"DWORD":case"UDINT":ak=E(aj);break;case"DINT":ak=O(aj);break;case"REAL":ak=r(aj);if(al!==undefined){ak=ak.toFixed(parseInt(al,10))}break;case"LREAL":ak=D(aj);if(al!==undefined){ak=ak.toFixed(parseInt(al,10))}break;case"STRING":ak=Z(aj);break;case"TOD":ak=o(aj,al);break;case"TIME":ak=U(aj,al);break;case"DT":case"DATE":ak=ab(aj,al);break;case"EndStruct":break;default:l("TAME library error: Unknown data type at parsing read request: "+ai);break}return ak}function w(aB){var ai=aB.xmlHttpReq.responseXML.documentElement,at=aB.reqDescr.items,aq=[],au=0,ay,ak,al,aA,ao,aw,ap,az,aj,av,ar,am,an;try{ak=P(ai.getElementsByTagName("ppData")[0].firstChild.data);for(ar=0,am=at.length;ar<am;ar++){ay=at[ar];aq=ae(ay);aj=aq[0];av=aq[1];aw=z[aj];switch(aj){case"STRING":if(av!==undefined){ao=parseInt(av,10)}aw=(af(ao)?ao:aw)+1;break;case"EndStruct":aw=ay.val;break}ap=aw<4?aw:4;if(aB.reqDescr.seq!==true){an=k(aB.reqDescr);au=ay.addr-an}else{if(aB.reqDescr.dataAlign4===true&&ap>1&&aj!=="STRING"&&au>0){az=au%ap;if(az>0){au+=ap-az}}}al=ak.substr(au,aw);aA=S(al,aj,av);if(aj!=="EndStruct"){y(ay.jvar,aA,aB.reqDescr.dataObj,ay.prefix,ay.suffix)}if(aB.reqDescr.seq===true){au+=aw}}}catch(ax){l("TAME library error: Parsing of Read Request failed:"+ax);l(ay);return}}function b(aI){var ai=aI.xmlHttpReq.responseXML.documentElement,av=aI.reqDescr.items,at=[],az=0,ak=0,ax=window,aF,am,an,aH,aB,al,aA,au,aq,ao,aw,ay,ar,aE,ap;function aD(){var aK,aJ;if(h===true&&al!=="STRING"){aK=aB<4?aB:4;if(aK>1&&ak>0){aJ=ak%aK;if(aJ>0){ak+=aK-aJ}}if(aK>aE){aE=aK}}}function aj(){var aK,aJ;if(al==="STRING"){if(aA!==undefined){aK=parseInt(aA,10)}else{if(typeof N[aF.name].stringLength==="number"){aK=N[aF.name].stringLength}}aB=(af(aK)?aK:aB)+1}aJ=an.substr(ak,aB);aH=S(aJ,al,aA);y(aw,aH,ax,aF.prefix,aF.suffix);ak+=aB}function aG(){var aK,aJ,aO,aN,aL,aM;for(aM in aF.def){if(aF.def.hasOwnProperty(aM)){aJ=aF.def[aM].split(".");if(aJ[0]==="ARRAY"){aO=parseInt(aJ[1],10);aN=aJ.length-1;for(aK=0;aK<aO;aK++){al=aJ[2];if(aJ[aN]==="SP"){aw=aM+aK;if(aN>=4){aA=aJ.slice(3,-1).join(".")}}else{aw=aM+"."+aK;if(aN>=3){aA=aJ.slice(3).join(".")}}if(ay!==undefined){aw=ay+"."+aw}aB=z[al];aD();aj()}}else{if(ay!==undefined){aw=ay+"."+aM}else{aw=aM}al=aJ[0];aA=aJ.slice(1).join(".");aB=z[al];aD();aj()}}}if(h===true&&aE>1&&al!=="STRING"){if(aE>4){aE=4}aL=ak%aE;if(aL>0){ak+=aE-aL}}}try{am=P(ai.getElementsByTagName("ppRdData")[0].firstChild.data);for(au=0,aq=av.length;au<aq;au++){an=am.substr(az,4);ao=S(an,"DWORD");if(ao!==0){l("TAME library error: ADS sub command error while processing a SumReadRequest!");l("Error code: "+ao);l(av[au])}az+=4}for(au=0;au<aq;au++){aF=av[au];at=ae(aF);al=at[0];aA=at[1];ap=N[aF.name].size;an=am.substr(az,ap);switch(al){case"ARRAY":ax=y(aF.jvar);ak=0;ar=N[aF.name].arrayLength;if(N[aF.name].arrayDataType==="USER"){for(ay=0;ay<ar;ay++){aG()}}else{al=N[aF.name].arrayDataType;aB=z[al];for(ay=0;ay<ar;ay++){aw=ay;aj()}}break;case"USER":ax=y(aF.jvar);ak=0;aG();break;default:ax=window;aH=S(an,al,aA);y(aF.jvar,aH,ax,aF.prefix,aF.suffix)}az+=ap}}catch(aC){l("TAME library error: Parsing of SumReadRequest failed:"+aC);l(aF);return}}function J(ao,am,ak){var aj={},al,ai;ai=z[am];if(typeof ak.name==="string"){ak.name=ak.name.toUpperCase()}switch(am){case"STRING":if(af(ak.strlen)){am+="."+ak.strlen;ai=ak.strlen}else{if(j===true){try{ai=N[ak.name].stringLength;am+="."+ai}catch(an){l("TAME library error: A problem occured while reading the string length from the symbol table!");l(an)}}}ai++;break;case"TIME":case"TOD":case"DT":case"DATE":if(typeof ak.format==="string"){am+="."+ak.format}break;case"REAL":case"LREAL":if(typeof ak.decPlaces==="number"){am+="."+ak.decPlaces}else{if(typeof ak.dp==="number"){am+="."+ak.dp}}break}aj={addr:ak.addr,name:ak.name,id:ak.id,oc:ak.oc,ocd:ak.ocd,readLength:ai,debug:ak.debug,sync:ak.sync,seq:true,items:[{val:ak.val,jvar:ak.jvar,type:am,prefix:ak.prefix,suffix:ak.suffix}]};if(ao==="Write"){W.writeReq(aj)}else{W.readReq(aj)}}function F(al,am,ak){var an={},az={},au,aj,aB=0,aC=0,aA=0,aD,ai=[],aG,ap,at=0,av,aq,aF=0,aw=0,aI,ar,aH,ax;if(typeof ak.name==="string"){ak.name=ak.name.toUpperCase()}if(al==="Write"&&typeof ak.val==="object"){az=ak.val}else{if(typeof ak.jvar==="string"){az=y(ak.jvar)}else{l("TAME library error: No data object for this "+al+"-Request defined!")}}if(typeof ak.arrlen==="number"){au=ak.arrlen}else{if(j===true){try{au=N[ak.name].arrayLength}catch(aE){l("TAME library error: A proble occured while reading the array length from the symbol table!");l(aE)}}else{l("TAME library error: Can't get the array length for this request!")}}if(typeof ak.item==="number"&&!isNaN(ak.item)&&al==="Write"){aH=true;if(ak.item<0||ak.item>au-1){l('TAME library error: Wrong value for "item"!');l("item: "+ak.item);l("Last array index: "+(au-1))}}function ao(){var aJ;if(typeof ak.def==="string"){ak.def=y(ak.def)}else{if(typeof ak.def!=="object"){l("TAME library error: No structure definition found!")}}for(aJ in ak.def){if(ak.def.hasOwnProperty(aJ)){ai=ak.def[aJ].split(".");if(ai[0]==="ARRAY"){aG=parseInt(ai[1],10);ai.shift();ai.shift()}else{aG=1}for(aC=0;aC<aG;aC++){if(ai[0]==="STRING"){if(typeof ai[1]==="string"){av=parseInt(ai[1],10)}aq=(af(av)?av:z[ai[0]])+1}else{aq=z[ai[0]]}if(h===true&&aq>1&&ai[0]!=="STRING"&&at>0){aI=at%aq;if(aI>0){at+=aq-aI}}at+=aq}if(h===true&&aq>aF&&ai[0]!=="STRING"){aF=aq}}}if(h===true&&aF>1&&ai[0]!=="STRING"){if(aF>4){aF=4}aI=at%aF;if(aI>0){aw=aF-aI;at+=aw}}if(aH){aj=at*ak.item;au=1}an={addr:ak.addr,name:ak.name,addrOffset:aj,id:ak.id,oc:ak.oc,ocd:ak.ocd,debug:ak.debug,readLength:at*au,seq:true,dataAlign4:h,dataObj:az,sync:ak.sync,items:[]};for(aC=0;aC<au;aC++){for(aJ in ak.def){if(ak.def.hasOwnProperty(aJ)){ai=ak.def[aJ].split(".");if(ai[0]==="ARRAY"){aG=parseInt(ai[1],10);ap=ai.length-1;for(aA=0;aA<aG;aA++){if(ai[ap]==="SP"){an.items[aB]={jvar:aC+"."+aJ+aA};if(ap===4){an.items[aB].type=ai[2]+"."+ai[3]}else{an.items[aB].type=ai[2]}}else{an.items[aB]={jvar:aC+"."+aJ+"."+aA};if(ap===3){an.items[aB].type=ai[2]+"."+ai[3]}else{an.items[aB].type=ai[2]}}if(al==="Write"){if(aH){if(ai[ap]==="SP"){an.items[aB].val=az[ak.item][aJ+aA]}else{an.items[aB].val=az[ak.item][aJ][aA]}}else{if(ai[ap]==="SP"){an.items[aB].val=az[aC][aJ+aA]}else{an.items[aB].val=az[aC][aJ][aA]}}}aB++}}else{an.items[aB]={jvar:aC+"."+aJ,type:ak.def[aJ]};if(al==="Write"){if(aH){an.items[aB].val=az[ak.item][aJ]}else{an.items[aB].val=az[aC][aJ]}}aB++}}}if(h===true){an.items[aB]={type:"EndStruct",val:aw};aB++}}}function ay(){aD=z[am];switch(am){case"STRING":if(af(ak.strlen)){am+="."+ak.strlen;aD=ak.strlen}else{if(j===true){aD=N[ak.name].stringLength;am+="."+aD}}aD++;break;case"TIME":case"TOD":case"DT":case"DATE":if(typeof ak.format==="string"){am+="."+ak.format}break;case"REAL":case"LREAL":if(typeof ak.decPlaces==="number"){am+="."+ak.decPlaces}else{if(typeof ak.dp==="number"){am+="."+ak.dp}}break}if(aH){aj=ak.item*aD;au=1}an={addr:ak.addr,name:ak.name,addrOffset:aj,id:ak.id,oc:ak.oc,ocd:ak.ocd,readLength:aD*au,debug:ak.debug,seq:true,dataObj:az,items:[]};for(aC=0;aC<au;aC++){an.items[aC]={jvar:aC,type:am};if(al==="Write"){if(aH){an.items[aC].val=az[ak.item]}else{an.items[aC].val=az[aC]}}}}if(am==="STRUCT"){ao()}else{ay()}if(al==="Write"){W.writeReq(an)}else{W.readReq(an)}}function Y(ai,aq){var an={},aj={},ar=[],al=0,ap,ak,am,ao;if(typeof aq.name==="string"){aq.name=aq.name.toUpperCase()}if(ai==="Write"&&typeof aq.val==="object"){aj=aq.val}else{if(typeof aq.jvar==="string"){aj=y(aq.jvar)}else{l("TAME library error: No data object for this "+ai+"-Request defined!")}}if(typeof aq.def==="string"){aq.def=y(aq.def)}else{if(typeof aq.def!=="object"){l("TAME library error: No structure defininition found!")}}an={addr:aq.addr,name:aq.name,id:aq.id,oc:aq.oc,ocd:aq.ocd,debug:aq.debug,seq:true,dataAlign4:h,dataObj:aj,sync:aq.sync,items:[]};for(am in aq.def){if(aq.def.hasOwnProperty(am)){ar=aq.def[am].split(".");if(ar[0]==="ARRAY"){ak=parseInt(ar[1],10);ap=ar.length-1;for(ao=0;ao<ak;ao++){if(ar[ap]==="SP"){an.items[al]={jvar:am+ao};if(ap===4){an.items[al].type=ar[2]+"."+ar[3]}else{an.items[al].type=ar[2]}}else{an.items[al]={jvar:am+"."+ao};if(ap===3){an.items[al].type=ar[2]+"."+ar[3]}else{an.items[al].type=ar[2]}}if(ai==="Write"){if(ar[ap]==="SP"){an.items[al].val=aj[am+ao]}else{an.items[al].val=aj[am][ao]}}al++}}else{an.items[al]={jvar:am,type:aq.def[am]};if(ai==="Write"){an.items[al].val=aj[am]}al++}}}if(ai==="Write"){W.writeReq(an)}else{W.readReq(an)}}this.writeReq=function(al){var an=al.items,av={},ai=[],aq=[],ay=[],ap,au,ak,ao,aj,aw,ar,ax,am,at;if(typeof al.name==="string"){al.name=al.name.toUpperCase()}for(at=0,ak=an.length;at<ak;at++){ax=an[at];aq=ae(ax);ap=aq[0];au=aq[1];ao=(z[ap]<4)?z[ap]:4;if(al.dataAlign4===true&&ao>1&&ap!=="STRING"&&ai.length>0){ar=ai.length%ao;if(ar>0){aw=ao-ar;for(am=1;am<=aw;am++){ai.push(0)}}}if(ap==="EndStruct"){for(am=1;am<=ax.val;am++){ai.push(0)}}else{ay=d(ax,ap,au,ao);ai=ai.concat(ay)}}if(ai&&ai.length>0){ai=p(ai)}av={method:"Write",indexGroup:x(al),indexOffset:k(al),pData:ai,reqDescr:al};u(av).send()};this.readReq=function(ak){var at={},al=ak.items,an=[],au,ar,am,ai,ao,ap,av,aq,aj;if(typeof ak.name==="string"){ak.name=ak.name.toUpperCase()}if(typeof ak.readLength!=="number"){ak.readLength=0;for(aq=0,ai=al.length;aq<ai;aq++){au=al[aq];an=ae(au);am=an[0];ar=an[1];if(am==="STRING"){if(typeof ar==="string"){av=parseInt(ar,10)}ap=(af(av)?av:z[am])+1}else{ap=z[am]}if(ak.seq===true){if(ak.dataAlign4===true&&ap>1&&am!=="STRING"&&ak.readLength>0){ao=ak.readLength%ap;if(ao>0){ak.readLength+=ap-ao}}ak.readLength+=ap}else{aj=k(ak);ak.readLength=ap+au.addr-aj}}}at={method:"Read",indexGroup:x(ak),indexOffset:k(ak),reqDescr:ak};u(at).send()};this.sumReadReq=function(ak){var au={},an=ak.items,aq=[],aw=[],ax=[],am=0,aj=an.length,al={},ap,at,av,ar,ao,ai;ak.readLength=aj*4;for(ar=0;ar<aj;ar++){av=an[ar];if(typeof av.name==="string"){av.name=av.name.toUpperCase()}aq=ae(av);ap=aq[0];at=aq[1];ao=N[av.name].size;ak.readLength+=ao;al.val=x(av);ax=d(al,"UDINT",at,4);aw=aw.concat(ax);al.val=k(av);ax=d(al,"UDINT",at,4);aw=aw.concat(ax);al.val=ao;ax=d(al,"UDINT",at,4);aw=aw.concat(ax)}if(aw.length>0){ai=p(aw)}au={method:"ReadWrite",indexGroup:m.SumRd,indexOffset:an.length,pwrData:ai,reqDescr:ak};u(au).send()};this.logSymbols=function(){l(N)};this.getSymbolsAsJSON=function(){var aj;if(typeof JSON!=="object"){l("TAME library error: No JSON parser found.")}else{try{aj=JSON.stringify(N);return aj}catch(ai){l("TAME library error: Could not convert the Symbol Table to JSON:"+ai)}}};this.setSymbolsFromJSON=function(aj){if(typeof JSON!=="object"){l("TAME library error: No JSON parser found.")}else{try{N=JSON.parse(aj)}catch(ai){l("TAME library error: Could not create the Symbol Table from JSON:"+ai);return}j=true;l("TAME library info: Symbol Table successfully created from JSON data.")}};this.parseResponse=function(an){var aj=an.xmlHttpReq.responseXML.documentElement,am,ai;if(typeof an.reqDescr.id==="number"){C[an.reqDescr.id]=0}try{ai=aj.getElementsByTagName("faultstring")[0].firstChild.data;try{am=aj.getElementsByTagName("errorcode")[0].firstChild.data}catch(al){am="-"}l("TAME library error: Message from server:  "+ai+" ("+am+")");return}catch(ak){am=0}if(typeof aj.normalize==="function"){aj.normalize()}if(an.method==="Read"||an.method==="ReadWrite"){switch(an.indexGroup){case m.UploadInfo:T(an);break;case m.Upload:aa(an);break;case m.SumRd:b(an);break;default:w(an)}}if(typeof an.reqDescr.oc==="function"){if(typeof an.reqDescr.ocd==="number"){window.setTimeout(an.reqDescr.oc,an.reqDescr.ocd)}else{an.reqDescr.oc()}}};this.writeBool=function(ai){J("Write","BOOL",ai)};this.writeByte=function(ai){J("Write","BYTE",ai)};this.writeUsint=function(ai){J("Write","USINT",ai)};this.writeSint=function(ai){J("Write","SINT",ai)};this.writeWord=function(ai){J("Write","WORD",ai)};this.writeUint=function(ai){J("Write","UINT",ai)};this.writeInt=function(ai){J("Write","INT",ai)};this.writeInt1Dp=function(ai){J("Write","INT1DP",ai)};this.writeDword=function(ai){J("Write","DWORD",ai)};this.writeUdint=function(ai){J("Write","UDINT",ai)};this.writeDint=function(ai){J("Write","DINT",ai)};this.writeReal=function(ai){J("Write","REAL",ai)};this.writeLreal=function(ai){J("Write","LREAL",ai)};this.writeString=function(ai){J("Write","STRING",ai)};this.writeTime=function(ai){J("Write","TIME",ai)};this.writeTod=function(ai){J("Write","TOD",ai)};this.writeDate=function(ai){J("Write","DATE",ai)};this.writeDt=function(ai){J("Write","DT",ai)};this.readBool=function(ai){J("Read","BOOL",ai)};this.readByte=function(ai){J("Read","BYTE",ai)};this.readUsint=function(ai){J("Read","USINT",ai)};this.readSint=function(ai){J("Read","SINT",ai)};this.readWord=function(ai){J("Read","WORD",ai)};this.readUint=function(ai){J("Read","UINT",ai)};this.readInt=function(ai){J("Read","INT",ai)};this.readInt1Dp=function(ai){J("Read","INT1DP",ai)};this.readDword=function(ai){J("Read","DWORD",ai)};this.readUdint=function(ai){J("Read","UDINT",ai)};this.readDint=function(ai){J("Read","DINT",ai)};this.readReal=function(ai){J("Read","REAL",ai)};this.readLreal=function(ai){J("Read","LREAL",ai)};this.readString=function(ai){J("Read","STRING",ai)};this.readTime=function(ai){J("Read","TIME",ai)};this.readTod=function(ai){J("Read","TOD",ai)};this.readDate=function(ai){J("Read","DATE",ai)};this.readDt=function(ai){J("Read","DT",ai)};this.writeStruct=function(ai){Y("Write",ai)};this.readStruct=function(ai){Y("Read",ai)};this.writeArrayOfBool=function(ai){F("Write","BOOL",ai)};this.writeArrayOfByte=function(ai){F("Write","BYTE",ai)};this.writeArrayOfUsint=function(ai){F("Write","USINT",ai)};this.writeArrayOfSint=function(ai){F("Write","SINT",ai)};this.writeArrayOfWord=function(ai){F("Write","WORD",ai)};this.writeArrayOfUint=function(ai){F("Write","UINT",ai)};this.writeArrayOfInt=function(ai){F("Write","INT",ai)};this.writeArrayOfInt1Dp=function(ai){F("Write","INT1DP",ai)};this.writeArrayOfDword=function(ai){F("Write","DWORD",ai)};this.writeArrayOfUdint=function(ai){F("Write","UDINT",ai)};this.writeArrayOfDint=function(ai){F("Write","DINT",ai)};this.writeArrayOfReal=function(ai){F("Write","REAL",ai)};this.writeArrayOfLreal=function(ai){F("Write","LREAL",ai)};this.writeArrayOfString=function(ai){F("Write","STRING",ai)};this.writeArrayOfTime=function(ai){F("Write","TIME",ai)};this.writeArrayOfTod=function(ai){F("Write","TOD",ai)};this.writeArrayOfDate=function(ai){F("Write","DATE",ai)};this.writeArrayOfDt=function(ai){F("Write","DT",ai)};this.writeArrayOfStruct=function(ai){F("Write","STRUCT",ai)};this.readArrayOfBool=function(ai){F("Read","BOOL",ai)};this.readArrayOfByte=function(ai){F("Read","BYTE",ai)};this.readArrayOfUsint=function(ai){F("Read","USINT",ai)};this.readArrayOfSint=function(ai){F("Read","SINT",ai)};this.readArrayOfWord=function(ai){F("Read","WORD",ai)};this.readArrayOfUint=function(ai){F("Read","UINT",ai)};this.readArrayOfInt=function(ai){F("Read","INT",ai)};this.readArrayOfInt1Dp=function(ai){F("Read","INT1DP",ai)};this.readArrayOfDword=function(ai){F("Read","DWORD",ai)};this.readArrayOfUdint=function(ai){F("Read","UDINT",ai)};this.readArrayOfDint=function(ai){F("Read","DINT",ai)};this.readArrayOfReal=function(ai){F("Read","REAL",ai)};this.readArrayOfLreal=function(ai){F("Read","LREAL",ai)};this.readArrayOfString=function(ai){F("Read","STRING",ai)};this.readArrayOfTime=function(ai){F("Read","TIME",ai)};this.readArrayOfTod=function(ai){F("Read","TOD",ai)};this.readArrayOfDate=function(ai){F("Read","DATE",ai)};this.readArrayOfDt=function(ai){F("Read","DT",ai)};this.readArrayOfStruct=function(ai){F("Read","STRUCT",ai)};function X(){var ai={method:"Read",sync:true,indexGroup:m.UploadInfo,indexOffset:0,reqDescr:{readLength:8}};u(ai).send()}function T(an){var ai=an.xmlHttpReq.responseXML.documentElement,aj,ao,al,ak;try{aj=P(ai.getElementsByTagName("ppData")[0].firstChild.data);ao=aj.substr(0,4);a=S(ao,"DWORD");ao=aj.substr(4,4);v=S(ao,"DWORD")}catch(am){l("TAME library error: Parsing of UploadInfo failed:"+am);return}ak={method:"Read",sync:true,indexGroup:m.Upload,indexOffset:0,reqDescr:{readLength:v}};u(ak).send()}function aa(aA){var ai=aA.xmlHttpReq.responseXML.documentElement,ar=0,ax=4,au=8,ap=12,am=30,al,an,az,aq,at,aj,ay,ao,ak,aw;try{al=P(ai.getElementsByTagName("ppData")[0].firstChild.data);for(aq=0;aq<a;aq++){an=al.substr(ar,4);at=S(an,"DWORD");aj=al.substring(ar+am,(ar+at)).split(String.fromCharCode(0));N[aj[0]]={typeString:aj[1],indexGroup:S(al.substr(ar+ax,4),"DWORD"),indexOffset:S(al.substr(ar+au,4),"DWORD"),size:S(al.substr(ar+ap,4),"DWORD")};ay=aj[1].split(" ");if(ay[0]==="ARRAY"){N[aj[0]].type=ay[0];ao=ay[1].substring(1,ay[1].length-1);ao=ao.split("..");ao=parseInt(ao[1],10)-parseInt(ao[0],10)+1;N[aj[0]].arrayLength=ao;ak=ay[3].split("(");if(ak[1]!==undefined){ak[1]=ak[1].substr(0,ak[1].length-1);N[aj[0]].fullType=ay[0]+"."+ao+"."+ak[0]+"."+ak[1];N[aj[0]].stringLength=parseInt(ak[1],10)}else{N[aj[0]].fullType=ay[0]+"."+ao+"."+ak[0]}N[aj[0]].itemSize=N[aj[0]].size/ao;N[aj[0]].arrayDataType="USER";for(aw in z){if(z.hasOwnProperty(aw)){if(ak[0]===aw){N[aj[0]].arrayDataType=ak[0]}}}}else{ak=ay[0].split("(");if(ak[1]!==undefined){ak[1]=ak[1].substr(0,ak[1].length-1);N[aj[0]].fullType=ak[0]+"."+ak[1];N[aj[0]].stringLength=parseInt(ak[1],10)}else{N[aj[0]].fullType=ak[0]}N[aj[0]].type="USER";for(aw in z){if(z.hasOwnProperty(aw)){if(ak[0]===aw){N[aj[0]].type=ak[0]}}}}ar+=at}j=true;l("TAME library info: End of reading the UploadInfo.");l("TAME library info: Symbol table ready.")}catch(av){l("TAME library error: Parsing of uploaded symbol information failed:"+av);return}}if(e.dontFetchSymbols===true){l("TAME library info: Reading of the UploadInfo deactivated. Symbol Table could not be created.")}else{l("TAME library info: Start of reading the UploadInfo.");X()}};TAME.WebServiceClient.createClient=function(a){return new TAME.WebServiceClient(a)};