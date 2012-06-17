/*
 * TAME [TwinCAT ADS Made Easy] V3.0 beta
 * 
 * Copyright (c) 2009-2012 Thomas Schmidt; t.schmidt.p1 at freenet.de
 * 
 * Dual licensed under:
 *  MIT - http://www.opensource.org/licenses/mit-license
 *  GPLv3 - http://www.opensource.org/licenses/GPL-3.0
 * 
 */
var TAME={weekdShortNames:{ge:["So","Mo","Di","Mi","Do","Fr","Sa"],en:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},weekdLongNames:{ge:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],en:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},monthsShortNames:{ge:["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],en:["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sept","Oct","Nov","Dez"]},monthsLongNames:{ge:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],en:["January","February","March","April","May","June","July","August","September","October","November","December"]}};TAME.WebServiceClient=function(f){var W=this,m={M:16416,MX:16417,I:61472,IX:61473,Q:61488,QX:61489,Upload:61451,UploadInfo:61452,SumRd:61568,SumWr:61569,SumRdWr:61570},z={BOOL:1,BYTE:1,USINT:1,SINT:1,WORD:2,UINT:2,INT:2,INT16:2,INT1DP:2,DWORD:4,UDINT:4,DINT:4,TIME:4,TOD:4,DATE:4,DT:4,REAL:4,LREAL:8,STRING:80,EndStruct:0},h=(typeof f.language=="string")?f.language:"ge",n=function(){var e={},aj="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",ai;for(ai=0;ai<aj.length;ai++){e[ai]=aj.charAt(ai)}return e}(),q=function(){var e={},aj="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",ai;for(ai=0;ai<aj.length;ai++){e[aj.charAt(ai)]=ai}return e}(),i=f.dataAlign4,C=[0],N={},k=false,a=0,v=0,g,c,L;if(typeof f.serviceUrl=="string"){g=f.serviceUrl}else{try{console.log("TAME library error: Service URL is not a string!")}catch(ag){}return}if(typeof f.amsNetId=="string"){c=f.amsNetId}else{try{console.log("TAME library error: NetId is not a string!")}catch(ag){}return}if(f.amsPort===undefined){L="801"}else{if(typeof f.amsPort=="string"&&parseInt(f.amsPort,10)>=801&&parseInt(f.amsPort,10)<=804){L=f.amsPort}else{try{console.log("TAME library error: AMS Port Number ("+parseInt(f.amsPort,10)+") is no string or out of range!")}catch(ag){}return}}this.dateNames={weekdShort:TAME.weekdShortNames[h],weekdLong:TAME.weekdLongNames[h],monthsShort:TAME.monthsShortNames[h],monthsLong:TAME.monthsLongNames[h]};this.maxStringLen=255;this.maxDropReq=10;this.useCheckBounds=true;function H(e){if((e>=97)&&(e<=102)){return(e-87)}if((e>=65)&&(e<=70)){return(e-55)}if((e>=48)&&(e<=57)){return(e-48)}return 0}function ac(al,ai){var e=[],ak=al.toString(16);while(ak.length<ai*2){ak="0"+ak}for(var aj=0;aj<ai;aj++){e[(ai-1)-aj]=((H(ak.charCodeAt(aj*2))*16)+H(ak.charCodeAt((aj*2)+1)))}return e}function s(ai){var al=0,ao=0,am,e,ak,an;e=Math.abs(ai);if(ai!==0){for(var aj=128;aj>-127;aj--){ak=e/Math.pow(2,aj);if(ak>=2){break}an=aj;am=ak}an+=127;am=am.toString(2);for(aj=2;aj<25;aj++){al<<=1;if(am.charAt(aj)=="1"){al+=1}}if(am.charAt(25)=="1"){al+=1}ao=an;ao<<=23;ao+=al;if(ai<0){ao+=2147483648}}return ao}function B(an){var aj=0,ap=0,ak={part1:0,part2:0},aq,am,ai,e,ao;aq=Math.abs(an);if(an!==0){for(var al=1024;al>=-1023;al--){am=aq/Math.pow(2,al);if(am>=2){break}ai=al;ao=am}ai+=1023;ao=ao.toString(2);for(al=2;al<22;al++){aj<<=1;if(ao.charAt(al)=="1"){aj+=1}}if(ao.charAt(al)=="1"){e=true}al++;for(al;al<54;al++){ap<<=1;if(ao.charAt(al)=="1"){ap+=1}}ak.part1=ai;ak.part1<<=20;ak.part1+=aj;if(an<0){ak.part1+=2147483648}ak.part2=ap;if(e===true){ak.part2+=2147483648}}return ak}function I(aj,ai){var e;switch(ai){case"#d":case"#dd":e=aj*86400000;break;case"#h":case"#hh":e=aj*3600000;break;case"#m":case"#mm":e=aj*60000;break;case"#s":case"#ss":e=aj*1000;break;case"#ms":case"#msmsms":e=aj;break;default:e=aj;break}return e}function o(an){var am=n,ak=0,ai="",al,aj,e;while(ak<an.length){al=an[ak++];aj=an[ak++];e=an[ak++];ai=ai+am[al>>2]+am[((al&3)<<4)|(aj>>4)]+(isNaN(aj)?"=":am[(((aj&15)<<2)|(e>>6))])+((isNaN(aj)||isNaN(e))?"=":am[e&63])}return ai}function d(ap,an,ao,al){var ar=[],ai,aq,aj,ak;if(ap.val===undefined){switch(an){case"STRING":ap.val="";break;case"DATE":case"DT":case"TOD":ap.val=new Date();break;default:ap.val=0;break}try{console.log("TAME library warning: Value of a variable in write request is not defined!");console.log(ap)}catch(am){}}switch(an){case"BOOL":if(ap.val){ar[0]=1}else{ar[0]=0}break;case"BYTE":case"USINT":ai=R(ap,an,0,255);ar=ac(ai,al);break;case"SINT":ai=R(ap,an,-128,127);if(ai<0){ai=ai+256}ar=ac(ai,al);break;case"WORD":case"UINT":ai=R(ap,an,0,65535);ar=ac(ai,al);break;case"INT":case"INT16":ai=R(ap,an,-32768,32767);if(ai<0){ai=ai+65536}ar=ac(ai,al);break;case"INT1DP":ap.val=Math.round(ap.val*10);ai=R(ap,an,-32768,32767);if(ai<0){ai=ai+65536}ar=ac(ai,al);break;case"DWORD":case"UDINT":ai=R(ap,an,0,4294967295);ar=ac(ai,al);break;case"DINT":ai=R(ap,an,-2147483648,2147483647);if(ai<0){ai=ai+4294967296}ar=ac(ai,al);break;case"REAL":ai=R(ap,an);ai=s(ai);ar=ac(ai,al);break;case"LREAL":ai=R(ap,an);ai=B(ai);ar=ac(ai.part2,al);ar=ar.concat(ac(ai.part1,al));break;case"DATE":if(typeof ap.val=="object"){ap.val.setHours(0);ap.val.setMinutes(0);ap.val.setSeconds(0);ai=ap.val.getTime()/1000-ap.val.getTimezoneOffset()*60}else{try{console.log("TAME library error: Date is not an object!)");console.log(ap)}catch(am){}}ar=ac(ai,al);break;case"DT":if(typeof ap.val=="object"){ai=ap.val.getTime()/1000-ap.val.getTimezoneOffset()*60}else{try{console.log("TAME library error: Date is not an object!)");console.log(ap)}catch(am){}}ar=ac(ai,al);break;case"TOD":if(typeof ap.val=="object"){ap.val.setYear(1970);ap.val.setMonth(0);ap.val.setDate(1);ai=ap.val.getTime()-ap.val.getTimezoneOffset()*60000}else{try{console.log("TAME library error: Date is not an object!)");console.log(ap)}catch(am){}}ar=ac(ai,al);break;case"STRING":aq=(ao===undefined)?z.STRING:parseInt(ao,10);if(af(aq)){aj=aq<ap.val.length?aq:ap.val.length;for(ak=0;ak<aj;ak++){ar[ak]=ap.val.charCodeAt(ak)}for(ak;ak<aq;ak++){ar[ak]=0}ar[ak]=0}break;case"TIME":ai=ap.val*1;ai=I(ai,ao);if(ai<0){ai=0;try{console.log("TAME library warning: Lower limit for TIME variable exceeded!)");console.log("value: "+ap.val+ao);console.log(ap)}catch(am){}}else{if(ai>4294967295){ai=4294967295;try{console.log("TAME library warning: Upper limit for TIME variable exceeded!)");console.log("value: "+ap.val+ao);console.log(ap)}catch(am){}}}ar=ac(ai,al);break;case"EndStruct":break;default:try{console.log("TAME library error: Unknown data type in write request : "+an)}catch(am){}break}return ar}function Q(ai){var e=t(ai.charCodeAt(0));return parseInt(e,16)}function ae(e){var ai=Q(e);if(ai>127){ai=ai-256}return ai}function M(ai){var e=t(ai.charCodeAt(1));e+=t(ai.charCodeAt(0));return parseInt(e,16)}function K(e){var ai=M(e);if(ai>32767){ai=ai-65536}return ai}function E(ai){var e=t(ai.charCodeAt(3));e+=t(ai.charCodeAt(2));e+=t(ai.charCodeAt(1));e+=t(ai.charCodeAt(0));return parseInt(e,16)}function O(e){var ai=E(e);if(ai>2147483647){ai=ai-4294967296}return ai}function V(e,aj){var ai=E(e);if(aj===undefined){return ai}else{return(G(ai,aj))}}function p(e,aj){var ai=new Date(E(e));ai=new Date(ai.getTime()+ai.getTimezoneOffset()*60000);if(aj===undefined){return ai}else{return(ah(ai,aj))}}function ab(ai,aj){var e=new Date(E(ai)*1000);e=new Date(e.getTime()+e.getTimezoneOffset()*60000);if(aj===undefined){return e}else{return(ah(e,aj))}}function r(aj){var al=1,an=0.5,ai=E(aj),e,am;if(ai===0){return 0}e=((ai>>>31)==1)?"-":"+";ai<<=1;am=(ai>>>24)-127;ai<<=8;for(var ak=1;ak<=23;ak++){al+=ai<0?an:0;ai<<=1;an/=2}return parseFloat(e+(al*Math.pow(2,am)))}function D(aj){var ai=E(aj.substring(4,8)),am=E(aj.substring(0,4)),al=12,ak=1,ao=0.5,e,an;if(ai===0&&am===0){return 0}e=((ai>>>31)==1)?"-":"+";ai<<=1;an=(ai>>>21)-1023;ai<<=11;while(al<32){ak+=ai<0?ao:0;ai<<=1;ao/=2;al++}if((am>>>31)==1){ak+=ao;am<<=1;ao/=2}while(al<64){ak+=am<0?ao:0;am<<=1;ao/=2;al++}return parseFloat(e+(ak*Math.pow(2,an)))}function Z(e){return e.split(String.fromCharCode(0))[0]}function t(ai){var e=ai.toString(16);if((e.length%2)!==0){e="0"+e}return e}function j(ai,e){e=(isNaN(e))?0:e;var aj=ai.toString(10);while(aj.length<e){aj="0"+aj}return aj}function ah(an,am){var e=am.split("#"),al=e.length,ai="",ak;for(var aj=1;aj<al;aj++){switch(e[aj]){case"D":ak=an.getDate();break;case"DD":ak=an.getDate();ak=j(ak,2);break;case"WD":ak=an.getDay();break;case"WKD":ak=W.dateNames.weekdShort[an.getDay()];break;case"WEEKDAY":ak=W.dateNames.weekdLong[an.getDay()];break;case"M":ak=an.getMonth()+1;break;case"MM":ak=an.getMonth()+1;ak=j(ak,2);break;case"MON":ak=W.dateNames.monthsShort[an.getMonth()];break;case"MONTH":ak=W.dateNames.monthsLong[an.getMonth()];break;case"YY":ak=an.getYear();while(ak>100){ak-=100}break;case"YYYY":ak=an.getFullYear();break;case"h":ak=an.getHours();break;case"hh":ak=an.getHours();ak=j(ak,2);break;case"m":ak=an.getMinutes();break;case"mm":ak=an.getMinutes();ak=j(ak,2);break;case"s":ak=an.getSeconds();break;case"ss":ak=an.getSeconds();ak=j(ak,2);break;case"ms":ak=an.getMilliseconds();break;case"msmsms":ak=an.getMilliseconds();ak=j(ak,3);break;default:ak=e[aj];break}ai=ai+ak}return ai}function G(an,am){var e=am.split("#"),al=e.length,ai="",ak;for(var aj=1;aj<al;aj++){switch(e[aj]){case"d":if(al<=2){ak=an/86400000}else{ak=Math.floor(an/86400000);an=an%86400000}break;case"dd":if(al<=2){ak=an/86400000}else{ak=Math.floor(an/86400000);an=an%86400000}ak=j(ak,2);break;case"h":if(al<=2){ak=an/3600000}else{ak=Math.floor(an/3600000);an=an%3600000}break;case"hh":if(al<=2){ak=an/3600000}else{ak=Math.floor(an/3600000);an=an%3600000}ak=j(ak,2);break;case"m":if(al<=2){ak=an/60000}else{ak=Math.floor(an/60000);an=an%60000}break;case"mm":if(al<=2){ak=an/60000}else{ak=Math.floor(an/60000);an=an%60000}ak=j(ak,2);break;case"s":if(al<=2){ak=an/1000}else{ak=Math.floor(an/1000);an=an%1000}break;case"ss":if(al<=2){ak=an/1000}else{ak=Math.floor(an/1000);an=an%1000}ak=j(ak,2);break;case"ms":ak=an;break;case"msmsms":ak=an;ak=j(ak,3);break;default:ak=e[aj];break}ai=ai+ak}return ai}function P(ak){var al=q,an=0,e="",am,aj,ai,ar,aq,ap,ao;ak=ak.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{ar=al[ak.charAt(an++)];aq=al[ak.charAt(an++)];ap=al[ak.charAt(an++)];ao=al[ak.charAt(an++)];am=(ar<<2)|(aq>>4);aj=((aq&15)<<4)|(ap>>2);ai=((ap&3)<<6)|ao;e+=String.fromCharCode(am);if(ap!=64){e+=String.fromCharCode(aj)}if(ao!=64){e+=String.fromCharCode(ai)}}while(an<ak.length);return e}function S(aj,ai,am){var ak;switch(ai){case"BOOL":ak=(aj.charCodeAt(0)!="0");break;case"BYTE":case"USINT":ak=Q(aj);break;case"SINT":ak=ae(aj);break;case"WORD":case"UINT":ak=M(aj);break;case"INT":case"INT16":ak=K(aj);break;case"INT1DP":ak=((K(aj))/10).toFixed(1);break;case"DWORD":case"UDINT":ak=E(aj);break;case"DINT":ak=O(aj);break;case"REAL":ak=r(aj);if(typeof am=="string"){ak=ak.toFixed(parseInt(am,10))}break;case"LREAL":ak=D(aj);if(typeof am=="string"){ak=ak.toFixed(parseInt(am,10))}break;case"STRING":ak=Z(aj);break;case"TOD":ak=p(aj,am);break;case"TIME":ak=V(aj,am);break;case"DT":case"DATE":ak=ab(aj,am);break;case"EndStruct":break;default:try{console.log("TAME library error: Unknown data type at parsing read request: "+ai)}catch(al){}break}return ak}function w(aA){var ai=aA.xmlHttpReq.responseXML.documentElement,ar=aA.reqDescr.items,ap=[],at=0,ax,ak,al,az,an,av,ao,ay,aj,au,aq,am;try{ak=P(ai.getElementsByTagName("ppData")[0].firstChild.data);for(aq=0,am=ar.length;aq<am;aq++){ax=ar[aq];ap=ad(ax);aj=ap[0];au=ap[1];av=z[aj];switch(aj){case"STRING":if(typeof au=="string"){an=parseInt(au,10)}av=(af(an)?an:av)+1;break;case"EndStruct":av=ax.val;break}ao=av<4?av:4;if(aA.reqDescr.seq!==true){at=ax.addr-aA.reqDescr.addr}else{if(aA.reqDescr.dataAlign4===true&&ao>1&&aj!="STRING"&&at>0){ay=at%ao;if(ay>0){at+=ao-ay}}}al=ak.substr(at,av);az=S(al,aj,au);if(aj!=="EndStruct"){y(ax.jvar,az,aA.reqDescr.dataObj,ax.prefix,ax.suffix)}if(aA.reqDescr.seq===true){at+=av}}}catch(aw){try{console.log("TAME library error: Parsing Failed:"+aw);console.log(ax)}catch(aw){}return}}function b(ax){var al=ax.xmlHttpReq.responseXML.documentElement,ao=ax.reqDescr.items,at=[],aj=0,ay,an,ak,am,az,ap,ar,aw,av,ai,au;try{an=P(al.getElementsByTagName("ppRdData")[0].firstChild.data);for(av=0,ai=ao.length;av<ai;av++){ak=an.substr(aj,4);au=S(ak,"DWORD");if(au!==0){try{console.log("TAME library error: ADS sub command error while processing a SumReadRequest!");console.log("Error code: "+au);console.log(ao[av])}catch(aq){}}aj+=4}for(av=0;av<ai;av++){ay=ao[av];at=ad(ay);ar=at[0];aw=at[1];ap=z[ar];if(ar=="STRING"){if(typeof aw=="string"){az=parseInt(aw,10)}ap=(af(az)?az:ap)+1}ak=an.substr(aj,ap);am=S(ak,ar,aw);y(ay.jvar,am,ax.reqDescr.dataObj,ay.prefix,ay.suffix);aj+=ap}}catch(aq){try{console.log("TAME library error: Parsing Failed:"+aq);console.log(ay)}catch(aq){}return}}function y(ai,al,ak,an,ar){var am=[],aq=0,ap=[],aj=0;if(typeof ai=="number"){am[0]=ai.toString(10)}else{if(typeof ai=="string"){am=ai.split(".")}else{try{console.log("TAME library error: Can't parse name of object/variable. Name is not a string or number!");console.log(ai)}catch(ao){}return}}if(ak===undefined){ak=window}aq=am.length-1;while(aj<aq){if(am[aj].charAt(am[aj].length-1)=="]"){ap=am[aj].substring(0,am[aj].length-1).split("[");ak=ak[ap[0]][ap[1]]}else{if(ak[am[aj]]===undefined){ak[am[aj]]=[]}ak=ak[am[aj]]}aj++}if(am[aj].charAt(am[aj].length-1)=="]"){ap=am[aj].substring(0,am[aj].length-1).split("[");ak=ak[ap[0]];if(al!==undefined){if(typeof an=="string"){al=an+al}if(typeof ar=="string"){al=al+ar}ak[ap[1]]=al}return ak[ap[1]]}else{if(al!==undefined){if(typeof an=="string"){al=an+al}if(typeof ar=="string"){al=al+ar}ak[am[aj]]=al}return ak[am[aj]]}}function af(ai){if(ai===undefined){return false}else{if(!isNaN(ai)&&ai>0&&ai<=W.maxStringLen){return true}else{try{console.log("TAME library error: User defined string length not valid! length: "+ai);console.log("Max. string length: "+W.maxStringLen)}catch(aj){}return false}}}function x(aj){var ai;if(aj.addr){if(typeof aj.addr=="string"&&aj.addr.charAt(0)=="%"){if(aj.addr.charAt(2)=="X"){ai=m[aj.addr.substr(1,2)]}else{ai=m[aj.addr.substr(1,1)]}}else{try{console.log('TAME library error: Wrong address definition, should be a string and start with "%"!');console.log(aj)}catch(ak){}return}}else{if(aj.name){if(typeof aj.name=="string"){try{ai=N[aj.name].indexGroup}catch(ak){try{console.log("TAME library error: Can't get the IndexGroup for this request!");console.log("TAME library error: Please check the variable name.");console.log(ak);console.log(aj)}catch(ak){}return}}else{try{console.log("TAME library error: Varible name should be a string!");console.log(aj)}catch(ak){}return}}else{try{console.log("TAME library error: Neither a name nor an address for the variable/request defined!");console.log(aj)}catch(ak){}return}}if(isNaN(ai)){try{console.log("TAME library error: IndexGroup is not a number, check address or name definition of the variable/request!");console.log(aj)}catch(ak){}}return ai}function l(aj){var am,ai="",ak=[];if(aj.addr){if(typeof aj.addr=="string"&&aj.addr.charAt(0)=="%"){if(aj.addr.charAt(2)=="X"){ai=aj.addr.substr(3);ak=ai.split(".");am=ak[0]*8+ak[1]*1}else{am=parseInt(aj.addr.substr(3),10);if(typeof aj.addrOffset=="number"){am+=aj.addrOffset}}}else{try{console.log('TAME library error: Wrong address definition, should be a string and start with "%"!');console.log(aj)}catch(al){}return}}else{if(aj.name){if(typeof aj.name=="string"){try{am=N[aj.name].indexOffset;if(typeof aj.addrOffset=="number"){am+=aj.addrOffset}}catch(al){try{console.log("TAME library error: Can't get the IndexOffset for this request!");console.log("TAME library error: Please check the variable name.");console.log(al);console.log(aj)}catch(al){}return}}else{try{console.log("TAME library error: Varible name should be a string!");console.log(aj)}catch(al){}return}}else{try{console.log("TAME library error: Neither a name nor an address for the variable/request defined!");console.log(aj)}catch(al){}return}}if(isNaN(am)){try{console.log("TAME library error: IndexOffset is not a number, check address or name definition of the variable/request.");console.log(aj)}catch(al){}}return am}function U(){var ai;if(XMLHttpRequest){ai=new XMLHttpRequest()}else{try{ai=new ActiveXObject("Msxml2.XMLHTTP")}catch(aj){try{ai=new ActiveXObject("Microsoft.XMLHTTP")}catch(aj){ai=null;try{console.log("TAME library error: Failed Creating XMLHttpRequest-Object!")}catch(aj){}}}}return ai}function u(aj){if(aj.reqDescr.debug){try{console.log(aj)}catch(ai){}}aj.send=function(){var ak;if(typeof this.reqDescr.id=="number"&&C[this.reqDescr.id]>0){try{console.log("TAME library warning: Request dropped (last request with ID "+aj.reqDescr.id+" not finished!)")}catch(al){}C[this.reqDescr.id]++;if(C[this.reqDescr.id]<=W.maxDropReq){return}C[this.reqDescr.id]=0}this.xmlHttpReq=U();ak="<?xml version='1.0' encoding='utf-8'?>";ak+="<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' ";ak+="xmlns:xsd='http://www.w3.org/2001/XMLSchema' ";ak+="xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>";ak+="<soap:Body><q1:";ak+=this.method;ak+=" xmlns:q1='http://beckhoff.org/message/'><netId xsi:type='xsd:string'>";ak+=c;ak+="</netId><nPort xsi:type='xsd:int'>";ak+=L;ak+="</nPort><indexGroup xsi:type='xsd:unsignedInt'>";ak+=this.indexGroup;ak+="</indexGroup><indexOffset xsi:type='xsd:unsignedInt'>";ak+=this.indexOffset;ak+="</indexOffset>";if((this.method==="Read"||this.method==="ReadWrite")&&this.reqDescr.readLength>0){ak+="<cbRdLen xsi:type='xsd:int'>";ak+=this.reqDescr.readLength;ak+="</cbRdLen>"}if(this.pData&&this.pData.length>0){ak+="<pData xsi:type='xsd:base64Binary'>";ak+=this.pData;ak+="</pData>"}if(this.pwrData&&this.pwrData.length>0){ak+="<pwrData xsi:type='xsd:base64Binary'>";ak+=this.pwrData;ak+="</pwrData>"}ak+="</q1:";ak+=this.method;ak+="></soap:Body></soap:Envelope>";if(typeof this.xmlHttpReq=="object"){this.xmlHttpReq.open("POST",g,(aj.sync===true?false:true));this.xmlHttpReq.setRequestHeader("SOAPAction","http://beckhoff.org/action/TcAdsSync."+this.method);this.xmlHttpReq.setRequestHeader("Content-Type","text/xml; charset=utf-8");if(aj.sync===true){this.xmlHttpReq.send(ak);W.parseResponse(aj)}else{this.xmlHttpReq.onreadystatechange=function(){if((aj.xmlHttpReq.readyState==4)&&(aj.xmlHttpReq.status==200)){W.parseResponse(aj)}};this.xmlHttpReq.send(ak)}if(typeof this.reqDescr.id=="number"){C[this.reqDescr.id]=1}}};return aj}function R(al,ak,aj,ai){var an;if(typeof al.val=="string"){if(ak==="REAL"||ak==="LREAL"){an=parseFloat(al.val)}else{an=parseInt(al.val,10)}}else{if(typeof al.val=="number"){an=al.val}else{try{console.log("TAME library error: Wrong variable type for a numeric variable in write request!");console.log("TAME library error: Variable type should be number or string, but is "+typeof al.val);console.log(al)}catch(am){}an=0}}if(isNaN(an)){an=0;try{console.log("TAME library error: Value of a numeric variable in write request is not a number.");console.log(al)}catch(am){}}if(W.useCheckBounds===true){if(ak==="LREAL"){if(!isFinite(an)){try{console.log("TAME library warning: Limit for LREAL value exceeded!");console.log("Upper limit: "+Number.MAX_VALUE);console.log("Lower limit: "+Number.MIN_VALUE);console.log("value: "+an);console.log(al)}catch(am){}}}else{if(ak==="REAL"){if(an>0){if(an<1.175495e-38){try{console.log("TAME library warning: Lower limit for positive REAL value exceeded!");console.log("limit: 1.175495e-38");console.log("value: "+an);console.log(al)}catch(am){}an=1.175495e-38}else{if(an>3.402823e+38){try{console.log("TAME library warning: Upper limit for positive REAL value exceeded!");console.log("limit: 3.402823e+38");console.log("value: "+an);console.log(al)}catch(am){}an=3.402823e+38}}}else{if(an<0){if(an>-1.175495e-38){try{console.log("TAME library warning: Upper limit for negative REAL value exceeded!");console.log("limit: -1.175495e-38");console.log("value: "+an);console.log(al)}catch(am){}an=-1.175495e-38}else{if(an<-3.402823e+38){try{console.log("TAME library warning: Lower limit for negative REAL value exceeded!");console.log("limit: -3.402823e+38");console.log("value: "+an);console.log(al)}catch(am){}an=-3.402823e+38}}}}}else{if(an<aj){try{console.log("TAME library warning: Lower limit for numeric value exceeded!");console.log("type: "+ak);console.log("limit: "+aj);console.log("value: "+an);console.log(al)}catch(am){}an=aj}else{if(an>ai){try{console.log("TAME library warning: Upper limit for numeric value exceeded!");console.log("type: "+ak);console.log("limit: "+ai);console.log("value: "+an);console.log(al)}catch(am){}an=ai}}}}}return an}function ad(aj){var ai=[];if(typeof aj.type=="string"){ai=aj.type.split(".");if(ai.length>2){ai[1]=ai.slice(1).join(".")}}else{if(k&&typeof aj.name=="string"){try{ai=N[aj.name].type.split("(");if(ai[1]!==undefined){ai[1]=ai[1].substr(0,ai[1].length-1);aj.type=ai[0]+"."+ai[1];ai[1]=parseInt(ai[1],10)}else{aj.type=ai[0]}}catch(ak){try{console.log("TAME library error: A problem occured while reading a data type from the symbol table!");console.log(ak);console.log(aj)}catch(ak){}}}else{try{console.log("TAME library error: Could not get the type of the item!");console.log(aj)}catch(ak){}}}return ai}function J(ao,am,ak){var aj={},al,ai;ai=z[am];if(typeof ak.name=="string"){ak.name=ak.name.toUpperCase()}switch(am){case"STRING":if(af(ak.strlen)){am+="."+ak.strlen;ai=ak.strlen}else{if(k===true){try{ai=parseInt(N[ak.name].type.substring(7,N[ak.name].type.length-1),10);am+="."+ai}catch(an){try{console.log("TAME library error: A problem occured while reading the string length from the symbol table!");console.log(an)}catch(an){}}}}ai++;break;case"TIME":case"TOD":case"DT":case"DATE":if(typeof ak.format=="string"){am+="."+ak.format}break;case"REAL":case"LREAL":if(typeof ak.decPlaces=="number"){am+="."+ak.decPlaces}else{if(typeof ak.dp=="number"){am+="."+ak.dp}}break}aj={addr:ak.addr,name:ak.name,id:ak.id,oc:ak.oc,ocd:ak.ocd,readLength:ai,debug:ak.debug,seq:true,items:[{val:ak.val,jvar:ak.jvar,type:am,prefix:ak.prefix,suffix:ak.suffix}]};if(ao==="Write"){W.writeReq(aj)}else{W.readReq(aj)}}function F(al,am,ak){var an={},az={},au,aj,aB=0,aC=0,aA=0,aD,ai=[],aH,ap,at=0,av,aq,aG=0,aw=0,aJ,aF,ar,aI,ax;if(typeof ak.name=="string"){ak.name=ak.name.toUpperCase()}if(al==="Write"&&typeof ak.val=="object"){az=ak.val}else{if(typeof ak.jvar=="string"){az=y(ak.jvar)}else{try{console.log("TAME library error: No data object for this "+al+"-Request defined!")}catch(aE){}}}if(typeof ak.arrlen=="number"){au=ak.arrlen}else{if(k===true){try{ax=N[ak.name].type.split(" ");au=ax[1].substring(1,ax[1].length-1);au=au.split("..");au=parseInt(au[1],10)-parseInt(au[0],10)+1}catch(aE){try{console.log("TAME library error: A proble occured while reading the array length from the symbol table!");console.log(aE)}catch(aE){}}}else{try{console.log("TAME library error: Can't get the array length for this request!");console.log(aE)}catch(aE){}}}if(typeof ak.item=="number"&&!isNaN(ak.item)&&al==="Write"){aI=true;if(ak.item<0||ak.item>au-1){try{console.log('TAME library error: Wrong value for "item"!');console.log("item: "+ak.item);console.log("Last array index: "+(au-1))}catch(aE){}}}function ao(){if(typeof ak.def=="string"){ak.def=y(ak.def)}else{if(typeof ak.def!="object"){try{console.log("TAME library error: No structure definition found!")}catch(aK){}}}for(aF in ak.def){ai=ak.def[aF].split(".");if(ai[0]=="ARRAY"){aH=parseInt(ai[1],10);ai.shift();ai.shift()}else{aH=1}for(aC=0;aC<aH;aC++){if(ai[0]=="STRING"){if(typeof ai[1]=="string"){av=parseInt(ai[1],10)}aq=(af(av)?av:z[ai[0]])+1}else{aq=z[ai[0]]}if(i===true&&aq>1&&ai[0]!="STRING"&&at>0){aJ=at%aq;if(aJ>0){at+=aq-aJ}}at+=aq}if(i===true&&aq>aG&&ai[0]!="STRING"){aG=aq}}if(i===true&&aG>1&&ai[0]!="STRING"){if(aG>4){aG=4}aJ=at%aG;if(aJ>0){aw=aG-aJ;at+=aw}}if(aI){aj=at*ak.item;au=1}an={addr:ak.addr,name:ak.name,addrOffset:aj,id:ak.id,oc:ak.oc,ocd:ak.ocd,debug:ak.debug,readLength:at*au,seq:true,dataAlign4:i,dataObj:az,items:[]};for(aC=0;aC<au;aC++){for(aF in ak.def){ai=ak.def[aF].split(".");if(ai[0]=="ARRAY"){aH=parseInt(ai[1],10);ap=ai.length-1;for(aA=0;aA<aH;aA++){if(ai[ap]=="SP"){an.items[aB]={jvar:aC+"."+aF+aA};if(ap===4){an.items[aB].type=ai[2]+"."+ai[3]}else{an.items[aB].type=ai[2]}}else{an.items[aB]={jvar:aC+"."+aF+"."+aA};if(ap===3){an.items[aB].type=ai[2]+"."+ai[3]}else{an.items[aB].type=ai[2]}}if(al==="Write"){if(aI){if(ai[ap]=="SP"){an.items[aB].val=az[ak.item][aF+aA]}else{an.items[aB].val=az[ak.item][aF][aA]}}else{if(ai[ap]=="SP"){an.items[aB].val=az[aC][aF+aA]}else{an.items[aB].val=az[aC][aF][aA]}}}aB++}}else{an.items[aB]={jvar:aC+"."+aF,type:ak.def[aF]};if(al==="Write"){if(aI){an.items[aB].val=az[ak.item][aF]}else{an.items[aB].val=az[aC][aF]}}aB++}}if(i===true){an.items[aB]={type:"EndStruct",val:aw};aB++}}}function ay(){aD=z[am];switch(am){case"STRING":if(af(ak.strlen)){am+="."+ak.strlen;aD=ak.strlen}else{if(k===true){aD=parseInt(ax[3].substring(7,ax[3].length-1),10);am+="."+aD}}aD++;break;case"TIME":case"TOD":case"DT":case"DATE":if(typeof ak.format=="string"){am+="."+ak.format}break;case"REAL":case"LREAL":if(typeof ak.decPlaces=="number"){am+="."+ak.decPlaces}else{if(typeof ak.dp=="number"){am+="."+ak.dp}}break}if(aI){aj=ak.item*aD;au=1}an={addr:ak.addr,name:ak.name,addrOffset:aj,id:ak.id,oc:ak.oc,ocd:ak.ocd,readLength:aD*au,debug:ak.debug,seq:true,dataObj:az,items:[]};for(aC=0;aC<au;aC++){an.items[aC]={jvar:aC,type:am};if(al==="Write"){if(aI){an.items[aC].val=az[ak.item]}else{an.items[aC].val=az[aC]}}}}if(am==="STRUCT"){ao()}else{ay()}if(al==="Write"){W.writeReq(an)}else{W.readReq(an)}}function Y(ai,ar){var an={},aj={},at=[],al=0,ap,ak,am,ao;if(typeof ar.name=="string"){ar.name=ar.name.toUpperCase()}if(ai==="Write"&&typeof ar.val=="object"){aj=ar.val}else{if(typeof ar.jvar=="string"){aj=y(ar.jvar)}else{try{console.log("TAME library error: No data object for this "+ai+"-Request defined!")}catch(aq){}}}if(typeof ar.def=="string"){ar.def=y(ar.def)}else{if(typeof ar.def!="object"){try{console.log("TAME library error: No structure defininition found!")}catch(aq){}}}an={addr:ar.addr,name:ar.name,id:ar.id,oc:ar.oc,ocd:ar.ocd,debug:ar.debug,seq:true,dataAlign4:i,dataObj:aj,items:[]};for(am in ar.def){at=ar.def[am].split(".");if(at[0]=="ARRAY"){ak=parseInt(at[1],10);ap=at.length-1;for(ao=0;ao<ak;ao++){if(at[ap]=="SP"){an.items[al]={jvar:am+ao};if(ap===4){an.items[al].type=at[2]+"."+at[3]}else{an.items[al].type=at[2]}}else{an.items[al]={jvar:am+"."+ao};if(ap===3){an.items[al].type=at[2]+"."+at[3]}else{an.items[al].type=at[2]}}if(ai==="Write"){if(at[ap]=="SP"){an.items[al].val=aj[am+ao]}else{an.items[al].val=aj[am][ao]}}al++}}else{an.items[al]={jvar:am,type:ar.def[am]};if(ai==="Write"){an.items[al].val=aj[am]}al++}}if(ai==="Write"){W.writeReq(an)}else{W.readReq(an)}}this.writeReq=function(ak){var am=ak.items,au={},e=[],ap=[],ax=[],ao,at,aj,an,ai,av,aq,aw,al,ar;if(typeof ak.name=="string"){ak.name=ak.name.toUpperCase()}for(ar=0,aj=am.length;ar<aj;ar++){aw=am[ar];ap=ad(aw);ao=ap[0];at=ap[1];an=(z[ao]<4)?z[ao]:4;if(ak.dataAlign4===true&&an>1&&ao!="STRING"&&e.length>0){aq=e.length%an;if(aq>0){av=an-aq;for(al=1;al<=av;al++){e.push(0)}}}if(ao==="EndStruct"){for(al=1;al<=aw.val;al++){e.push(0)}}else{ax=d(aw,ao,at,an);e=e.concat(ax)}}if(e&&e.length>0){e=o(e)}au={method:"Write",indexGroup:x(ak),indexOffset:l(ak),pData:e,reqDescr:ak};u(au).send()};this.readReq=function(ai){var aq={},aj=ai.items,al=[],ar,ap,ak,e,am,an,at,ao;if(typeof ai.name=="string"){ai.name=ai.name.toUpperCase()}if(typeof ai.readLength!="number"){ai.readLength=0;for(ao=0,e=aj.length;ao<e;ao++){ar=aj[ao];al=ad(ar);ak=al[0];ap=al[1];if(ak=="STRING"){if(typeof ap=="string"){at=parseInt(ap,10)}an=(af(at)?at:z[ak])+1}else{an=z[ak]}if(ai.seq===true){if(ai.dataAlign4===true&&an>1&&ak!="STRING"&&ai.readLength>0){am=ai.readLength%an;if(am>0){ai.readLength+=an-am}}ai.readLength+=an}else{ai.readLength=an+ar.addr-ai.addr}}}aq={method:"Read",indexGroup:x(ai),indexOffset:l(ai),reqDescr:ai};u(aq).send()};this.sumReadReq=function(aj){var at={},am=aj.items,ap=[],av=[],aw=[],al=0,ai=am.length,ak={},ao,ar,au,aq,an,e;aj.readLength=ai*4;for(aq=0;aq<ai;aq++){au=am[aq];if(typeof au.name=="string"){au.name=au.name.toUpperCase()}ap=ad(au);ao=ap[0];ar=ap[1];switch(ao){case"TIME":case"TOD":case"DT":case"DATE":if(typeof au.format=="string"&&ar===undefined){au.type+="."+au.format}break;case"REAL":case"LREAL":if(typeof au.decPlaces=="number"&&ar===undefined){au.type+="."+au.decPlaces}else{if(typeof au.dp=="number"&&ar===undefined){au.type+="."+au.dp}}break}if(ao=="STRING"){an=(ar===undefined)?z.STRING:parseInt(ar,10);an++}else{an=z[ao]}aj.readLength+=an;ak.val=x(au);aw=d(ak,"UDINT",ar,4);av=av.concat(aw);ak.val=l(au);aw=d(ak,"UDINT",ar,4);av=av.concat(aw);ak.val=an;aw=d(ak,"UDINT",ar,4);av=av.concat(aw)}if(av.length>0){e=o(av)}at={method:"ReadWrite",indexGroup:m.SumRd,indexOffset:am.length,pwrData:e,reqDescr:aj};u(at).send()};this.logSymbols=function(){console.log(N)};this.writeBool=function(e){J("Write","BOOL",e)};this.writeByte=function(e){J("Write","BYTE",e)};this.writeUsint=function(e){J("Write","USINT",e)};this.writeSint=function(e){J("Write","SINT",e)};this.writeWord=function(e){J("Write","WORD",e)};this.writeUint=function(e){J("Write","UINT",e)};this.writeInt=function(e){J("Write","INT",e)};this.writeInt1Dp=function(e){J("Write","INT1DP",e)};this.writeDword=function(e){J("Write","DWORD",e)};this.writeUdint=function(e){J("Write","UDINT",e)};this.writeDint=function(e){J("Write","DINT",e)};this.writeReal=function(e){J("Write","REAL",e)};this.writeLreal=function(e){J("Write","LREAL",e)};this.writeString=function(e){J("Write","STRING",e)};this.writeTime=function(e){J("Write","TIME",e)};this.writeTod=function(e){J("Write","TOD",e)};this.writeDate=function(e){J("Write","DATE",e)};this.writeDt=function(e){J("Write","DT",e)};this.readBool=function(e){J("Read","BOOL",e)};this.readByte=function(e){J("Read","BYTE",e)};this.readUsint=function(e){J("Read","USINT",e)};this.readSint=function(e){J("Read","SINT",e)};this.readWord=function(e){J("Read","WORD",e)};this.readUint=function(e){J("Read","UINT",e)};this.readInt=function(e){J("Read","INT",e)};this.readInt1Dp=function(e){J("Read","INT1DP",e)};this.readDword=function(e){J("Read","DWORD",e)};this.readUdint=function(e){J("Read","UDINT",e)};this.readDint=function(e){J("Read","DINT",e)};this.readReal=function(e){J("Read","REAL",e)};this.readLreal=function(e){J("Read","LREAL",e)};this.readString=function(e){J("Read","STRING",e)};this.readTime=function(e){J("Read","TIME",e)};this.readTod=function(e){J("Read","TOD",e)};this.readDate=function(e){J("Read","DATE",e)};this.readDt=function(e){J("Read","DT",e)};this.writeStruct=function(e){Y("Write",e)};this.readStruct=function(e){Y("Read",e)};this.writeArrayOfBool=function(e){F("Write","BOOL",e)};this.writeArrayOfByte=function(e){F("Write","BYTE",e)};this.writeArrayOfUsint=function(e){F("Write","USINT",e)};this.writeArrayOfSint=function(e){F("Write","SINT",e)};this.writeArrayOfWord=function(e){F("Write","WORD",e)};this.writeArrayOfUint=function(e){F("Write","UINT",e)};this.writeArrayOfInt=function(e){F("Write","INT",e)};this.writeArrayOfInt1Dp=function(e){F("Write","INT1DP",e)};this.writeArrayOfDword=function(e){F("Write","DWORD",e)};this.writeArrayOfUdint=function(e){F("Write","UDINT",e)};this.writeArrayOfDint=function(e){F("Write","DINT",e)};this.writeArrayOfReal=function(e){F("Write","REAL",e)};this.writeArrayOfLreal=function(e){F("Write","LREAL",e)};this.writeArrayOfString=function(e){F("Write","STRING",e)};this.writeArrayOfTime=function(e){F("Write","TIME",e)};this.writeArrayOfTod=function(e){F("Write","TOD",e)};this.writeArrayOfDate=function(e){F("Write","DATE",e)};this.writeArrayOfDt=function(e){F("Write","DT",e)};this.writeArrayOfStruct=function(e){F("Write","STRUCT",e)};this.readArrayOfBool=function(e){F("Read","BOOL",e)};this.readArrayOfByte=function(e){F("Read","BYTE",e)};this.readArrayOfUsint=function(e){F("Read","USINT",e)};this.readArrayOfSint=function(e){F("Read","SINT",e)};this.readArrayOfWord=function(e){F("Read","WORD",e)};this.readArrayOfUint=function(e){F("Read","UINT",e)};this.readArrayOfInt=function(e){F("Read","INT",e)};this.readArrayOfInt1Dp=function(e){F("Read","INT1DP",e)};this.readArrayOfDword=function(e){F("Read","DWORD",e)};this.readArrayOfUdint=function(e){F("Read","UDINT",e)};this.readArrayOfDint=function(e){F("Read","DINT",e)};this.readArrayOfReal=function(e){F("Read","REAL",e)};this.readArrayOfLreal=function(e){F("Read","LREAL",e)};this.readArrayOfString=function(e){F("Read","STRING",e)};this.readArrayOfTime=function(e){F("Read","TIME",e)};this.readArrayOfTod=function(e){F("Read","TOD",e)};this.readArrayOfDate=function(e){F("Read","DATE",e)};this.readArrayOfDt=function(e){F("Read","DT",e)};this.readArrayOfStruct=function(e){F("Read","STRUCT",e)};this.parseResponse=function(am){var aj=am.xmlHttpReq.responseXML.documentElement,al,ai;if(typeof am.reqDescr.id=="number"){C[am.reqDescr.id]=0}try{ai=aj.getElementsByTagName("faultstring")[0].firstChild.data;try{al=aj.getElementsByTagName("errorcode")[0].firstChild.data}catch(ak){al="-"}try{console.log("TAME library error: Message from server:  "+ai+" ("+al+")")}catch(ak){}return}catch(ak){al=0}if(typeof aj.normalize=="function"){aj.normalize()}if(am.method==="Read"||am.method==="ReadWrite"){switch(am.indexGroup){case m.UploadInfo:T(am);break;case m.Upload:aa(am);break;case m.SumRd:b(am);break;default:w(am)}}if(typeof am.reqDescr.oc=="function"){if(typeof am.reqDescr.ocd=="number"){window.setTimeout(am.reqDescr.oc,am.reqDescr.ocd)}else{am.reqDescr.oc()}}};function X(){var e={method:"Read",sync:true,indexGroup:m.UploadInfo,indexOffset:0,reqDescr:{readLength:8}};u(e).send()}function T(an){var ai=an.xmlHttpReq.responseXML.documentElement,aj,ao,al,ak;try{aj=P(ai.getElementsByTagName("ppData")[0].firstChild.data);ao=aj.substr(0,4);a=S(ao,"DWORD");ao=aj.substr(4,4);v=S(ao,"DWORD")}catch(am){try{console.log("TAME library error: Parsing of UploadInfo failed:"+am)}catch(am){}return}ak={method:"Read",sync:true,indexGroup:m.Upload,indexOffset:0,reqDescr:{readLength:v}};u(ak).send()}function aa(aw){var am=aw.xmlHttpReq.responseXML.documentElement,ak=0,an=4,av=8,ai=12,ar=30,at,al,aq,aj,ap,ao;try{at=P(am.getElementsByTagName("ppData")[0].firstChild.data);for(aj=0;aj<a;aj++){al=at.substr(ak,4);ap=S(al,"DWORD");ao=at.substring(ak+ar,(ak+ap)).split(String.fromCharCode(0));N[ao[0]]={type:ao[1],indexGroup:S(at.substr(ak+an,4),"DWORD"),indexOffset:S(at.substr(ak+av,4),"DWORD"),size:S(at.substr(ak+ai,4),"DWORD")};ak+=ap}}catch(au){try{console.log("TAME library error: Parsing of uploaded symbol information failed:"+au)}catch(au){}return}}function A(){var al=U(),ao=[],ak,ai,an;al.open("GET",f.symFileUrl,false);al.setRequestHeader("Content-Type","text/xml");al.send(null);if(typeof DOMParser=="function"){try{ak=(new DOMParser()).parseFromString(al.responseText,"text/xml");an=ak.getElementsByTagName("Symbols")[0];ao=an.getElementsByTagName("Symbol");for(var aj=0;aj<ao.length;aj++){ai=ao[aj].getElementsByTagName("Name")[0].childNodes[0].nodeValue.toUpperCase();N[ai]={type:ao[aj].getElementsByTagName("Type")[0].childNodes[0].nodeValue.toUpperCase(),indexGroup:parseInt(ao[aj].getElementsByTagName("IGroup")[0].childNodes[0].nodeValue,10),indexOffset:parseInt(ao[aj].getElementsByTagName("IOffset")[0].childNodes[0].nodeValue,10),bitSize:parseInt(ao[aj].getElementsByTagName("BitSize")[0].childNodes[0].nodeValue,10)};N[ai].size=(N[ai].bitSize>=8)?N[ai].bitSize/8:N[ai].bitSize}}catch(am){try{console.log("TAME library error: An error occured while parsing the symbol file:");console.log(am)}catch(am){}}}else{try{console.log("TAME library error: Can't parse the symbol file cause your brower does not provide a DOMParser function.")}catch(am){}}}if(typeof f.symFileUrl=="string"){try{console.log("TAME library message: Start of reading the SymFile.")}catch(ag){}A();k=true;try{console.log("TAME library info: End of reading the SymFile.");console.log("TAME library info: Symbol table ready.")}catch(ag){}}else{if(f.useUploadInfo!==false){try{console.log("TAME library info: Start of reading the UploadInfo.")}catch(ag){}X();k=true;try{console.log("TAME library info: End of reading the UploadInfo.");console.log("TAME library info: Symbol table ready.")}catch(ag){}}}};TAME.WebServiceClient.createClient=function(a){return new TAME.WebServiceClient(a)};