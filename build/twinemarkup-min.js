"use strict";function _toConsumableArray(e){if(Array.isArray(e)){for(var r=0,n=Array(e.length);r<e.length;r++)n[r]=e[r];return n}return Array.from(e)}var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};(function(){function e(){for(var e=0;e<arguments.length;e++)for(var r in arguments[e])this[r]=arguments[e][r]}function r(e,r){e.childAt=e.childAt||{};for(var n=r.start;n<r.end;n+=1)e.childAt[n]=r}function n(e,r,n,t){return!(e.canFollow&&!(e.canFollow.indexOf(n&&n.type)>-1)||e.cannotFollow&&(-1!==e.cannotFollow.indexOf(n&&n.type)||e.cannotFollow.indexOf("text")>-1&&t)||e.peek&&e.peek.toLowerCase()!==r.slice(0,e.peek.length).toLowerCase())}function t(e){for(var r=e.innerText,t=[],o=0,s=o,u=r.length,m=null;o<u;){for(var l=r.slice(o),g=(t.length?t[0]:e).innerMode,c=0,p=g.length;c<p;c+=1){var d=i[g[c]];if(n(d,l,m,s<o)&&d.pattern.test(l)){var h=d.pattern.exec(l),f=d.fn(h),y=!1,k=0;if(f.matches){for(;k<t.length;k+=1){var b=t[k].type;if(b in f.matches){y=!0;break}0===b.indexOf("verbatim")&&(b="verbatimOpener"),f.cannotCross&&f.cannotCross.indexOf(b)>-1&&(k=t.length-1)}if(k>=t.length&&!f.isFront)continue}s<o&&e.addChild({type:"text",text:r.slice(s,o),innerMode:g}),m=e.addChild(f),o+=m.text.length,s=o,y&&(a(e,m,t[k]),t=t.slice(k+1)),m.isFrontToken()&&t.unshift(m);break}}c===p&&(o+=1,null===m&&(m={type:"text"}))}for(s<o&&e.addChild({type:"text",text:r.slice(s,o),innerMode:(t.length?t[0]:e).innerMode});t.length>0;)t.shift().demote();return e}function a(e,n,t){var a=e.children.indexOf(n),o=e.children.indexOf(t);n.children=e.children.splice(o+1,a-(o+1)),n.children.forEach(function(e){r(n,e)}),n.type=n.matches[t.type],n.innerText="";for(var i=0,s=n.children.length;i<s;i++)n.innerText+=n.children[i].text;n.start=t.start,n.text=t.text+n.innerText+n.text,Object.keys(t).forEach(function(e){Object.hasOwnProperty.call(n,e)||(n[e]=t[e])}),n.isFront&&(n.isFront=!1),e.children.splice(o,1),r(e,n)}var o=void 0,i={};e.prototype={constructor:e,addChild:function(n){var a=this.lastChildEnd(),o=new e({start:a,end:n.text&&a+n.text.length,children:[]},n);return o.innerText&&t(o),this.children.push(o),r(this,o),o},lastChild:function(){return this.children?this.children[this.children.length-1]||null:null},lastChildEnd:function(){var e=this.lastChild();return e?e.end:this.start+Math.max(0,this.text.indexOf(this.innerText))},tokenAt:function(e){if(e<this.start||e>=this.end)return null;if(this.childAt)return this.childAt[e]&&this.childAt[e].tokenAt(e)||this;if(this.children.length)for(var r=0;r<this.children.length;r+=1){var n=this.children[r].tokenAt(e);if(n)return n}return this},pathAt:function(e){if(e<this.start||e>=this.end)return[];if(this.childAt)return(this.childAt[e]&&this.childAt[e].pathAt(e)||[]).concat(this);var r=[];if(this.children.length)for(var n=0;n<this.children.length;n+=1){var t=this.children[n].pathAt(e);if(t.length){r.concat(t);break}}return r.concat(this)},nearestTokenAt:function(e){return e<this.start||e>=this.end?null:this.children?this.children.reduce(function(r,n){return r||(e>=n.start&&e<n.end?n:null)},null):this},everyLeaf:function(e){return this.children&&0!==this.children.length?this.children.reduce(function(r,n){return n.everyLeaf(e)&&r},!0):!!e(this)},isWhitespace:function(){return this.everyLeaf(function(e){return"whitespace"===e.type||!e.text.trim()})},isFrontToken:function(){return this.isFront},isBackToken:function(){return"matches"in this},demote:function(){this.type="text"},error:function(e){this.type="error",this.message=e},toString:function(){var e=this.type+"("+this.start+"\u2192"+this.end+")";return this.children&&this.children.length>0&&(e+="["+this.children+"]"),e}},o={lex:function(r,n){return t(new e({type:"root",start:n||0,end:r.length,text:r,innerText:r,children:[],childAt:{},innerMode:o.modes.start}))},rules:i,modes:{}},"object"===("undefined"==typeof module?"undefined":_typeof(module))?module.exports=o:"function"==typeof define&&define.amd?define("lexer",[],function(){return o}):this&&this.loaded?(this.modules||(this.modules={}),this.modules.Lexer=o):this.TwineLexer=o}).call(eval("this")||("undefined"!=typeof global?global:window)),function(){function e(r){return r&&"object"===(void 0===r?"undefined":_typeof(r))?(Object.keys(r).forEach(function(n){r[n]=e(r[n])}),r):(r+"").replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}function r(e){return function(){return"("+e+Array.apply(0,arguments).join("|")+")"}}var n=void 0,t=r("?:"),a=r("?!"),o=r("?="),i="[ \\f\\t\\v\\u00a0\\u2000-\\u200a\\u2028\\u2029\\u202f\\u205f\\u3000]*",s=i.replace("*","+"),u="\\b",m="[\\w\\-\\u00c0-\\u00de\\u00df-\\u00ff\\u0150\\u0170\\u0151\\u0171\\uD800-\\uDFFF]",l=m.replace("\\-",""),g=t("\\n","$"),c="("+t("\\\\\\n\\\\?|\\n\\\\","[^\\n]")+"+)",p=i+"(\\*+)"+s+c+g,d=i+"((?:0\\.)+)"+s+c+g,h=i+"-{3,}"+i+g,f=i+"(#{1,6})"+i+c+g,y=i+"(==+>|<=+|=+><=+|<==+>)"+i+g,k=i+"(=+\\|+|\\|+=+|=+\\|+=+|\\|=+\\|)"+i+g,b={opener:"\\[\\[(?!\\[)",text:"("+function(){return"[^"+Array.apply(0,arguments).map(e).join("")+"]*"}("]")+")",rightSeparator:t("\\->","\\|"),leftSeparator:"<\\-",closer:"\\]\\]",legacySeparator:"\\|",legacyText:"("+t("[^\\|\\]]","\\]"+a("\\]"))+"+)"},N=l+"*"+l.replace("\\w","a-zA-Z")+l+"*",S="\\$("+N+")",C="'s"+s+"("+N+")",T="("+N+")"+s+"of"+u+a("it\\b"),v="'s"+s,x=t("it","time")+u,A="its"+s+"("+N+")",w="its"+s,O="("+N+")"+s+"of"+s+"it"+u,F="of\\b"+s+"it"+u,H={opener:"\\(",name:"("+t(m+"+",S)+")"+a("\\/"),closer:"\\)"},L=t("=<","=>","[gl]te?\\b","n?eq\\b","isnot\\b","are\\b","x\\b","isa\\b","or"+s+"a"+u),P={name:"[a-zA-Z][\\w\\-]*",attrs:"(?:\"[^\"]*\"|'[^']*'|[^'\">])*?"},B="\\|("+m+"+)(>|\\))",j="(<|\\()("+m+"+)\\|",M="_("+N+")"+u,I="\\b(\\d+(?:\\.\\d+)?(?:[eE][+\\-]?\\d+)?)"+a("m?s")+u;b.main=b.opener+t(b.text+b.rightSeparator,b.text.replace("*","*?")+b.leftSeparator)+b.text,n={upperLetter:"[A-Z\\u00c0-\\u00de\\u0150\\u0170]",lowerLetter:"[a-z0-9_\\-\\u00df-\\u00ff\\u0151\\u0171]",anyLetter:m,anyLetterStrict:l,whitespace:s,escapedLine:"\\\\\\n\\\\?|\\n\\\\",br:"\\n(?!\\\\)",commentFront:"\x3c!--",commentBack:"--\x3e",tag:"<\\/?"+P.name+P.attrs+">",tagPeek:"<",scriptStyleTag:"<("+t("script","style")+")"+P.attrs+">[^]*?<\\/\\1>",scriptStyleTagOpener:"<",url:"("+t("https?","mailto","javascript","ftp","data")+":\\/\\/[^\\s<]+[^<.,:;\"')\\]\\s])",bullet:"\\*",hr:h,heading:f,align:y,column:k,bulleted:p,numbered:d,strikeOpener:e("~~"),italicOpener:e("//"),boldOpener:e("''"),supOpener:e("^^"),strongFront:e("**"),strongBack:e("**"),emFront:e("*"),emBack:e("*"),verbatimOpener:"`+",collapsedFront:"{",collapsedBack:"}",hookAppendedFront:"\\[",hookPrependedFront:B+"\\]",hookFront:"\\{",hookBack:"\\}"+a(j),hookAppendedBack:"\\]"+j,passageLink:b.main+b.closer,passageLinkPeek:"[[",legacyLink:b.opener+b.legacyText+b.legacySeparator+b.legacyText+b.closer,legacyLinkPeek:"[[",simpleLink:b.opener+b.legacyText+b.closer,simpleLinkPeek:"[[",macroFront:H.opener+o(H.name),macroFrontPeek:"(",macroName:H.name,groupingFront:"\\("+a(H.name),groupingFrontPeek:"(",groupingBack:"\\)",twine1Macro:"<<[^>\\s]+\\s*(?:\\\\.|'(?:[^'\\\\]*\\\\.)*[^'\\\\]*'|\"(?:[^\"\\\\]*\\\\.)*[^\"\\\\]*\"|[^'\"\\\\>]|>(?!>))*>>",twine1MacroPeek:"<<",property:C,propertyPeek:"'s",belongingProperty:T,possessiveOperator:v,belongingOperator:"of\\b",belongingOperatorPeek:"of",itsOperator:w,itsOperatorPeek:"its",belongingItOperator:F,belongingItOperatorPeek:"of",variable:S,variablePeek:"$",tempVariable:M,tempVariablePeek:"_",hookRef:"\\?("+m+"+)\\b",hookRefPeek:"?",cssTime:"(\\d+\\.?\\d*|\\d*\\.?\\d+)(m?s)\\b",colour:t(t("Red","Orange","Yellow","Lime","Green","Cyan","Aqua","Blue","Navy","Purple","Fuchsia","Magenta","White","Gray","Grey","Black"),"#[\\dA-Fa-f]{3}(?:[\\dA-Fa-f]{3})?"),datatype:t("array","boolean","changer","colour","color","command","dm","datamap","ds","dataset","number","num","string","str"),number:I,boolean:t("true","false")+u,identifier:x,itsProperty:A,itsPropertyPeek:"its",belongingItProperty:O,escapedStringChar:"\\\\[^\\n]",singleStringOpener:"'",doubleStringOpener:'"',is:"==",isNot:"is"+s+"not"+a(s+"a"+u)+u,isA:"is"+s+"an?"+u,isNotA:"is"+s+"not"+s+"an?"+u,matches:"matches"+s,and:"and\\b",or:"or\\b",not:"not\\b",inequality:"((?:is(?:"+s+"not)?"+i+")*)("+t("<(?!=)","<=",">(?!=)",">=")+")",isIn:"is"+s+"in"+u,contains:"contains\\b",addition:e("+")+a("="),subtraction:e("-")+a("="),multiplication:e("*")+a("="),division:t("/","%")+a("="),comma:",",spread:"\\.\\.\\."+a("\\."),to:t("to\\b","="),into:"into\\b",making:"making\\b",where:"where\\b",when:"when\\b",via:"via\\b",with:"with\\b",each:"each\\b",augmentedAssign:t("\\+","\\-","\\*","\\/","%")+"=",bind:"bind\\b",incorrectOperator:L},"object"===("undefined"==typeof module?"undefined":_typeof(module))?module.exports=n:"function"==typeof define&&define.amd?define("patterns",[],function(){return n}):this&&this.loaded?(this.modules||(this.modules={}),this.modules.Patterns=n):this.Patterns=n}.call(eval("this")||("undefined"!=typeof global?global:window)),function(){function e(e){function r(e){return e=e||"innerText",function(r){var n=r.reduceRight(function(e,r,n){return e||(n?r:"")},""),t={};return t[e]=n,t}}function t(e,r){var n={};return n[e]=r,function(){return{isFront:!0,matches:n,cannotCross:["verbatimOpener"]}}}function a(e,r){return Object.keys(r).forEach(function(n){var t=r[n].fn;r[n].fn=function(r){var a=t(r);return a.text||(a.text=r[0]),a.type||(a.type=n),a.innerMode||(a.innerMode=e),a}}),r}var o=Object.bind(0,null),i=[],s=[],u=a(i,{hr:{fn:o},bulleted:{fn:function(e){return{depth:e[1].length,innerText:e[2]}}},numbered:{fn:function(e){return{depth:e[1].length/2,innerText:e[2]}}},heading:{fn:function(e){return{depth:e[1].length,innerText:e[2]}}},align:{fn:function(e){var r=void 0,n=e[1],t=n.indexOf("><");return~t?25===(r=Math.round(t/(n.length-2)*50))&&(r="center"):"<"===n[0]&&">"===n.slice(-1)?r="justify":n.indexOf(">")>-1?r="right":n.indexOf("<")>-1&&(r="left"),{align:r}}},column:{fn:function(e){var r=void 0,n=e[1],t=n.indexOf("|");return t&&t<n.length-1?r="center":"|"===n[0]&&"|"===n.slice(-1)?r="none":t===n.length-1?r="right":t||(r="left"),{column:r,width:/\|+/.exec(n)[0].length,marginLeft:/^=*/.exec(n)[0].length,marginRight:/=*$/.exec(n)[0].length}}}});Object.keys(u).forEach(function(e){u[e].canFollow=[null,"br","hr","bulleted","numbered","heading","align"],u[e].cannotFollow=["text"]});var m=a(i,{twine1Macro:{fn:function(){return{type:"error",message:"Harlowe macros use a different syntax to Twine 1 and SugarCube macros."}}},emBack:{fn:function(){return{matches:{emFront:"em"},cannotCross:["verbatimOpener"]}}},strongBack:{fn:function(){return{matches:{strongFront:"strong"},cannotCross:["verbatimOpener"]}}},strongFront:{fn:function(){return{isFront:!0}}},emFront:{fn:function(){return{isFront:!0}}},boldOpener:{fn:t("boldOpener","bold")},italicOpener:{fn:t("italicOpener","italic")},strikeOpener:{fn:t("strikeOpener","strike")},supOpener:{fn:t("supOpener","sup")},commentFront:{fn:function(){return{isFront:!0}}},commentBack:{fn:function(){return{matches:{commentFront:"comment"}}}},scriptStyleTag:{fn:o},tag:{fn:o},url:{fn:o},hookPrependedFront:{fn:function(e){return{name:e[1],hidden:")"===e[2],isFront:!0,tagPosition:"prepended"}}},hookFront:{fn:function(){return{isFront:!0}}},hookBack:{fn:function(){return{matches:{hookPrependedFront:"hook",hookFront:"hook"},cannotCross:["verbatimOpener"]}}},hookAppendedBack:{fn:function(e){return{name:e[2],hidden:"("===e[1],tagPosition:"appended",matches:{hookFront:"hook"},cannotCross:["verbatimOpener"]}}},verbatimOpener:{fn:function(e){var r=e[0].length,n={};return n["verbatim"+r]="verbatim",{type:"verbatim"+r,isFront:!0,matches:n}}},collapsedFront:{fn:function(){return{isFront:!0}}},collapsedBack:{fn:function(){return{matches:{collapsedFront:"collapsed"},cannotCross:["verbatimOpener"]}}},escapedLine:{fn:o},legacyLink:{fn:function(e){return{type:"twineLink",innerText:e[1],passage:e[2]}}},br:{fn:o}}),l=a(s,{macroFront:{fn:function(e){return{isFront:!0,name:e[1]}}},groupingBack:{fn:function(){return{matches:{groupingFront:"grouping",macroFront:"macro"},cannotCross:["singleStringOpener","doubleStringOpener"]}}},passageLink:{fn:function(e){var r=e[1]||"",n=e[2]||"",t=e[3]||"";return{type:"twineLink",innerText:n?t:r,passage:r?t:n}}},simpleLink:{fn:function(e){return{type:"twineLink",innerText:e[1]||"",passage:e[1]||""}}},variable:{fn:r("name")},tempVariable:{fn:r("name")}}),g=a(s,Object.assign({macroName:{canFollow:["macroFront"],fn:function(e){return e[2]?{isMethodCall:!0,innerText:e[2]}:{isMethodCall:!1}}},groupingFront:{fn:function(){return{isFront:!0}}},property:{fn:r("name"),canFollow:["variable","hookRef","property","tempVariable","colour","itsProperty","belongingItProperty","macro","grouping","string","boolean","number"]},possessiveOperator:{fn:o},itsProperty:{cannotFollow:["text"],fn:r("name")},itsOperator:{cannotFollow:["text"],fn:o},belongingItProperty:{cannotFollow:["text"],fn:r("name")},belongingItOperator:{cannotFollow:["text"],fn:o},belongingProperty:{cannotFollow:["text"],fn:r("name")},belongingOperator:{cannotFollow:["text"],fn:o},escapedStringChar:{fn:function(){return{type:"text"}}},singleStringOpener:{fn:function(){return{isFront:!0,matches:{singleStringOpener:"string"}}}},doubleStringOpener:{fn:function(){return{isFront:!0,matches:{doubleStringOpener:"string"}}}},hookRef:{fn:r("name")},cssTime:{fn:function(e){return{value:+e[1]*("s"===e[2].toLowerCase()?1e3:1)}}},datatype:{cannotFollow:["text"],fn:function(e){return{name:e[0].toLowerCase()}}},colour:{cannotFollow:["text"],fn:function(e){var r,n=e[0].toLowerCase(),t={red:"e61919",orange:"e68019",yellow:"e5e619",lime:"80e619",green:"19e619",cyan:"19e5e6",aqua:"19e5e6",blue:"197fe6",navy:"1919e6",purple:"7f19e6",fuchsia:"e619e5",magenta:"e619e5",white:"fff",black:"000",gray:"888",grey:"888"};return r=Object.hasOwnProperty.call(t,n)?"#"+t[n]:n,{colour:r}}},number:{fn:function(e){return{value:parseFloat(e[0])}}},addition:{fn:o},subtraction:{fn:o},multiplication:{fn:o},division:{fn:o},inequality:{fn:function(e){return{operator:e[2],negate:e[1].indexOf("not")>-1}}},augmentedAssign:{fn:function(e){return{operator:e[0][0]}}},identifier:{fn:r("name"),cannotFollow:["text"]},whitespace:{fn:o,cannotFollow:"text"},incorrectOperator:{fn:function(e){var r={"=>":">=","=<":"<=",gte:">=",lte:"<=",gt:">",lt:"<",eq:"is",isnot:"is not",neq:"is not",isa:"is a",are:"is",x:"*","or a":"or"}[e[0].toLowerCase().replace(/\s+/g," ")];return{type:"error",message:"Please say "+(r?"'"+r+"'":"something else")+" instead of '"+e[0]+"'.",explanation:"In the interests of readability, I want certain operators to be in a specific form."}},cannotFollow:"text"}},["boolean","is","to","into","where","when","via","with","making","each","and","or","not","isNot","contains","isIn","isA","isNotA","matches","bind"].reduce(function(e,r){return e[r]={fn:o,cannotFollow:["text"]},e},{}),["comma","spread","addition","subtraction","multiplication","division"].reduce(function(e,r){return e[r]={fn:o},e},{})));i.push.apply(i,_toConsumableArray(Object.keys(u)).concat(_toConsumableArray(Object.keys(l)),_toConsumableArray(Object.keys(m)))),s.push.apply(s,_toConsumableArray(Object.keys(l)).concat(_toConsumableArray(Object.keys(g))));var c=Object.assign({},u,m,l,g);return Object.keys(c).forEach(function(e){var r=n[e];c[e].pattern="string"!=typeof r?r:new RegExp("^(?:"+r+")","i"),n[e+"Peek"]&&(c[e].peek=n[e+"Peek"])}),Object.assign(e.rules,c),e.modes.start=e.modes.markup=i,e.modes.macro=s,e}function r(r){return Object.freeze({lex:e(r).lex,Patterns:n})}var n=void 0;Object.assign=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},"object"===("undefined"==typeof module?"undefined":_typeof(module))?(n=require("./patterns"),module.exports=r(require("./lexer"))):"function"==typeof define&&define.amd?define("markup",["lexer","patterns"],function(e,t){return n=t,r(e)}):this&&this.loaded&&this.modules?(n=this.modules.Patterns,this.modules.Markup=r(this.modules.Lexer)):(n=this.Patterns,this.TwineMarkup=r(this.TwineLexer))}.call(eval("this")||("undefined"!=typeof global?global:window)),function(){var e=function(e){return(e+"").toLowerCase().replace(/-|_/g,"")},r={"(display: String) -> HookCommand":{name:"display",sig:" String",returnType:"HookCommand",aka:[]},"(print: Any) -> HookCommand":{name:"print",sig:" Any",returnType:"HookCommand",aka:[]},"(go-to: String) -> HookCommand":{name:"go-to",sig:" String",returnType:"HookCommand",aka:[]},"(undo:) -> HookCommand":{name:"undo",sig:"",returnType:"HookCommand",aka:[]},"(cycling-link: Bind, ...String) -> Command":{name:"cycling-link",sig:" Bind, ...String",returnType:"Command",aka:[]},"(show: ...HookName) -> Command":{name:"show",sig:" ...HookName",returnType:"Command",aka:[]},"(stop:) -> Command":{name:"stop",sig:"",returnType:"Command",aka:[]},"(save-game: String, [String]) -> Boolean":{name:"save-game",sig:" String, [String]",returnType:"Boolean",aka:[]},"(load-game: String) -> Command":{name:"load-game",sig:" String",returnType:"Command",aka:[]},"(alert: String) -> Command":{name:"alert",sig:" String",returnType:"Command",aka:[]},"(prompt: String, String) -> String":{name:"prompt",sig:" String, String",returnType:"String",aka:[]},"(confirm: String) -> Boolean":{name:"confirm",sig:" String",returnType:"Boolean",aka:[]},"(open-url: String) -> Command":{name:"open-url",sig:" String",returnType:"Command",aka:[]},"(reload:) -> Command":{name:"reload",sig:"",returnType:"Command",aka:[]},"(goto-url: String) -> Command":{name:"goto-url",sig:" String",returnType:"Command",aka:[]},"(page-url:) -> String":{name:"page-url",sig:"",returnType:"String",aka:[]},"(set: ...VariableToValue) -> Instant":{name:"set",sig:" ...VariableToValue",returnType:"Instant",aka:[]},"(put: ...VariableToValue) -> Instant":{name:"put",sig:" ...VariableToValue",returnType:"Instant",aka:[]},"(move: ...VariableToValue) -> Instant":{name:"move",sig:" ...VariableToValue",returnType:"Instant",aka:[]},"(a: [...Any]) -> Array":{name:"a",sig:" [...Any]",returnType:"Array",aka:["array"]},"(range: Number, Number) -> Array":{name:"range",sig:" Number, Number",returnType:"Array",aka:[]},"(subarray: Array, Number, Number) -> Array":{name:"subarray",sig:" Array, Number, Number",returnType:"Array",aka:[]},"(reversed: [...Any]) -> Array":{name:"reversed",sig:" [...Any]",returnType:"Array",aka:[]},"(shuffled: Any, ...Any) -> Array":{name:"shuffled",sig:" Any, ...Any",returnType:"Array",aka:[]},"(sorted: Number or String, ...Number or String) -> Array":{name:"sorted",sig:" Number or String, ...Number or String",returnType:"Array",aka:[]},"(rotated: Number, [...Any]) -> Array":{name:"rotated",sig:" Number, [...Any]",returnType:"Array",aka:[]},"(repeated: Number, ...Any) -> Array":{name:"repeated",sig:" Number, ...Any",returnType:"Array",aka:[]},"(interlaced: Array, ...Array) -> Array":{name:"interlaced",sig:" Array, ...Array",returnType:"Array",aka:[]},"(altered: Lambda, ...Any) -> Array":{name:"altered",sig:" Lambda, ...Any",returnType:"Array",aka:[]},"(find: Lambda, ...Any) -> Array":{name:"find",sig:" Lambda, ...Any",returnType:"Array",aka:[]},"(all-pass: Lambda, ...Any) -> Boolean":{name:"all-pass",sig:" Lambda, ...Any",returnType:"Boolean",aka:[]},"(some-pass: Lambda, ...Any) -> Boolean":{name:"some-pass",sig:" Lambda, ...Any",returnType:"Boolean",aka:[]},"(none-pass: Lambda, ...Any) -> Boolean":{name:"none-pass",sig:" Lambda, ...Any",returnType:"Boolean",aka:[]},"(folded: Lambda, ...Any) -> Any":{name:"folded",sig:" Lambda, ...Any",returnType:"Any",aka:[]},"(datanames: Datamap) -> Array":{name:"datanames",sig:" Datamap",returnType:"Array",aka:[]},"(datavalues: Datamap) -> Array":{name:"datavalues",sig:" Datamap",returnType:"Array",aka:[]},"(dataentries: Datamap) -> Array":{name:"dataentries",sig:" Datamap",returnType:"Array",aka:[]},"(history:) -> Array":{name:"history",sig:"",returnType:"Array",aka:[]},"(passage: [String]) -> Datamap":{name:"passage",sig:" [String]",returnType:"Datamap",aka:[]},"(saved-games:) -> Datamap":{name:"saved-games",sig:"",returnType:"Datamap",aka:[]},"(dm: [...Any]) -> Datamap":{name:"dm",sig:" [...Any]",returnType:"Datamap",aka:["datamap"]},"(ds: [...Any]) -> Dataset":{name:"ds",sig:" [...Any]",returnType:"Dataset",aka:["dataset"]},"(count: Array or String, ...Any) -> Number":{name:"count",sig:" Array or String, ...Any",returnType:"Number",aka:[]},"(enchant: HookName or String, Changer) -> Command":{name:"enchant",sig:" HookName or String, Changer",returnType:"Command",aka:[]},"(replace: ...HookName or String) -> Changer":{name:"replace",sig:" ...HookName or String",returnType:"Changer",aka:[]},"(append: ...HookName or String) -> Changer":{name:"append",sig:" ...HookName or String",returnType:"Changer",aka:[]},"(prepend: ...HookName or String) -> Changer":{name:"prepend",sig:" ...HookName or String",returnType:"Changer",aka:[]},"(click: HookName or String) -> Changer":{name:"click",sig:" HookName or String",returnType:"Changer",aka:[]},"(mouseover: HookName or String) -> Changer":{name:"mouseover",sig:" HookName or String",returnType:"Changer",aka:[]},"(mouseout: HookName or String) -> Changer":{name:"mouseout",sig:" HookName or String",returnType:"Changer",aka:[]},"(click-replace: HookName or String) -> Changer":{name:"click-replace",sig:" HookName or String",returnType:"Changer",aka:[]},"(click-append: HookName or String) -> Changer":{name:"click-append",sig:" HookName or String",returnType:"Changer",aka:[]},"(click-prepend: HookName or String) -> Changer":{name:"click-prepend",sig:" HookName or String",returnType:"Changer",aka:[]},"(mouseover-replace: HookName or String) -> Changer":{name:"mouseover-replace",sig:" HookName or String",returnType:"Changer",aka:[]},"(mouseover-append: HookName or String) -> Changer":{name:"mouseover-append",sig:" HookName or String",returnType:"Changer",aka:[]},"(mouseover-prepend: HookName or String) -> Changer":{name:"mouseover-prepend",sig:" HookName or String",returnType:"Changer",aka:[]},"(mouseout-replace: HookName or String) -> Changer":{name:"mouseout-replace",sig:" HookName or String",returnType:"Changer",aka:[]},"(mouseout-append: HookName or String) -> Changer":{name:"mouseout-append",sig:" HookName or String",returnType:"Changer",aka:[]},"(mouseout-prepend: HookName or String) -> Changer":{name:"mouseout-prepend",sig:" HookName or String",returnType:"Changer",aka:[]},"(click-goto: HookName or String, String) -> HookCommand":{name:"click-goto",sig:" HookName or String, String",returnType:"HookCommand",aka:[]},"(mouseover-goto: HookName or String, String) -> HookCommand":{name:"mouseover-goto",sig:" HookName or String, String",returnType:"HookCommand",aka:[]},"(mouseout-goto: HookName or String, String) -> HookCommand":{name:"mouseout-goto",sig:" HookName or String, String",returnType:"HookCommand",aka:[]},"(link: String) -> Changer":{name:"link",sig:" String",returnType:"Changer",aka:["link-replace"]},"(link-reveal: String) -> Changer":{name:"link-reveal",sig:" String",returnType:"Changer",aka:[]},"(link-repeat: String) -> Changer":{name:"link-repeat",sig:" String",returnType:"Changer",aka:[]},"(link-goto: String, [String]) -> HookCommand":{name:"link-goto",sig:" String, [String]",returnType:"HookCommand",aka:[]},"(link-undo: String) -> HookCommand":{name:"link-undo",sig:" String",returnType:"HookCommand",aka:[]},"(link-reveal-goto: String, [String]) -> Changer":{name:"link-reveal-goto",sig:" String, [String]",returnType:"Changer",aka:[]},"(if: Boolean) -> Changer":{name:"if",sig:" Boolean",returnType:"Changer",aka:[]},"(unless: Boolean) -> Changer":{name:"unless",sig:" Boolean",returnType:"Changer",aka:[]},"(else-if: Boolean) -> Changer":{name:"else-if",sig:" Boolean",returnType:"Changer",aka:[]},"(else:) -> Changer":{name:"else",sig:"",returnType:"Changer",aka:[]},"(hidden:) -> Changer":{name:"hidden",sig:"",returnType:"Changer",aka:[]},"(live: [Number]) -> Changer":{name:"live",sig:" [Number]",returnType:"Changer",aka:[]},"(event: Lambda) -> Changer":{name:"event",sig:" Lambda",returnType:"Changer",aka:[]},"(hook: String) -> Changer":{name:"hook",sig:" String",returnType:"Changer",aka:[]},"(for: Lambda, ...Any) -> Changer":{name:"for",sig:" Lambda, ...Any",returnType:"Changer",aka:["loop"]},"(transition: String) -> Changer":{name:"transition",sig:" String",returnType:"Changer",aka:["t8n"]},"(transition-time: Number) -> Changer":{name:"transition-time",sig:" Number",returnType:"Changer",aka:["t8n-time"]},"(transition-depart: String) -> Changer":{name:"transition-depart",sig:" String",returnType:"Changer",aka:["t8n-depart"]},"(transition-arrive: String) -> Changer":{name:"transition-arrive",sig:" String",returnType:"Changer",aka:["t8n-arrive"]},"(font: String) -> Changer":{name:"font",sig:" String",returnType:"Changer",aka:[]},"(align: String) -> Changer":{name:"align",sig:" String",returnType:"Changer",aka:[]},"(text-colour: String or Colour) -> Changer":{name:"text-colour",sig:" String or Colour",returnType:"Changer",aka:["colour","text-color","color"]},"(text-rotate: Number) -> Changer":{name:"text-rotate",sig:" Number",returnType:"Changer",aka:[]},"(background: Colour or String) -> Changer":{name:"background",sig:" Colour or String",returnType:"Changer",aka:[]},"(text-style: String) -> Changer":{name:"text-style",sig:" String",returnType:"Changer",aka:[]},"(hover-style: Changer) -> Changer":{name:"hover-style",sig:" Changer",returnType:"Changer",aka:[]},"(css: String) -> Changer":{name:"css",sig:" String",returnType:"Changer",aka:[]},"(str: ...[Number or String or Boolean or Array]) -> String":{name:"str",sig:" ...[Number or String or Boolean or Array]",returnType:"String",aka:["string","text"]},"(substring: String, Number, Number) -> String":{name:"substring",sig:" String, Number, Number",returnType:"String",aka:[]},"(lowercase: String) -> String":{name:"lowercase",sig:" String",returnType:"String",aka:[]},"(uppercase: String) -> String":{name:"uppercase",sig:" String",returnType:"String",aka:[]},"(lowerfirst: String) -> String":{name:"lowerfirst",sig:" String",returnType:"String",aka:[]},"(upperfirst: String) -> String":{name:"upperfirst",sig:" String",returnType:"String",aka:[]},"(words: String) -> Array":{name:"words",sig:" String",returnType:"Array",aka:[]},"(str-repeated: Number, String) -> String":{name:"str-repeated",sig:" Number, String",returnType:"String",aka:["string-repeated"]},"(str-reversed: String) -> String":{name:"str-reversed",sig:" String",returnType:"String",aka:["string-reversed"]},"(num: String) -> Number":{name:"num",sig:" String",returnType:"Number",aka:["number"]},"(rgb: Number, Number, Number) -> Colour":{name:"rgb",sig:" Number, Number, Number",returnType:"Colour",aka:[]},"(rgba: Number, Number, Number, Number) -> Colour":{name:"rgba",sig:" Number, Number, Number, Number",returnType:"Colour",aka:[]},"(hsl: Number, Number, Number) -> Colour":{name:"hsl",sig:" Number, Number, Number",returnType:"Colour",aka:[]},"(hsla: Number, Number, Number, Number) -> Colour":{name:"hsla",sig:" Number, Number, Number, Number",returnType:"Colour",aka:[]},"(weekday:) -> String":{name:"weekday",sig:"",returnType:"String",aka:[]},"(monthday:) -> Number":{name:"monthday",sig:"",returnType:"Number",aka:[]},"(current-time:) -> String":{name:"current-time",sig:"",returnType:"String",aka:[]},"(current-date:) -> String":{name:"current-date",sig:"",returnType:"String",aka:[]},"(min: ...Number) -> Number":{name:"min",sig:" ...Number",returnType:"Number",aka:[]},"(max: ...Number) -> Number":{name:"max",sig:" ...Number",returnType:"Number",aka:[]},"(abs: Number) -> Number":{name:"abs",sig:" Number",returnType:"Number",aka:[]},"(sign: Number) -> Number":{name:"sign",sig:" Number",returnType:"Number",aka:[]},"(sin: Number) -> Number":{name:"sin",sig:" Number",returnType:"Number",aka:[]},"(cos: Number) -> Number":{name:"cos",sig:" Number",returnType:"Number",aka:[]},"(tan: Number) -> Number":{name:"tan",sig:" Number",returnType:"Number",aka:[]},"(floor: Number) -> Number":{name:"floor",sig:" Number",returnType:"Number",aka:[]},"(round: Number) -> Number":{name:"round",sig:" Number",returnType:"Number",aka:[]},"(ceil: Number) -> Number":{name:"ceil",sig:" Number",returnType:"Number",aka:[]},"(pow: Number, Number) -> Number":{name:"pow",sig:" Number, Number",returnType:"Number",aka:[]},"(exp: Number) -> Number":{name:"exp",sig:" Number",returnType:"Number",aka:[]},"(sqrt: Number) -> Number":{name:"sqrt",sig:" Number",returnType:"Number",aka:[]},"(log: Number) -> Number":{name:"log",sig:" Number",returnType:"Number",aka:[]},"(log10: Number) -> Number":{name:"log10",sig:" Number",returnType:"Number",aka:[]},"(log2: Number) -> Number":{name:"log2",sig:" Number",returnType:"Number",aka:[]},"(random: Number, [Number]) -> Number":{name:"random",sig:" Number, [Number]",returnType:"Number",aka:[]},"(either: ...Any) -> Any":{name:"either",sig:" ...Any",returnType:"Any",aka:[]}},n=r instanceof Object&&Object.keys(r).reduce(function(e,n){return e.concat.apply(e,[r[n].name].concat(_toConsumableArray(r[n].aka)))},[]).map(e),t=void 0;"function"==typeof define&&define.amd?define("markup",[],function(e){t=e.lex}):this&&this.loaded&&this.modules&&(t=this.modules.Markup.lex),window.CodeMirror&&CodeMirror.defineMode("harlowe-2",function(){function r(e,r){if(e.update){var n=e.from.line,t=r.split("\n").slice(0,e.from.line+1);return t[n]=t[n].slice(0,e.from.ch)+e.text[0],t=t.concat(e.text.slice(1)),e.update({line:0,ch:0},e.to,t),t.join("\n")}}function a(e){u.length&&(u.forEach(function(e){return e.clear()}),u=[]);var r=i.tokenAt(e.indexFromPos(e.getCursor()));if(r){if(u.push(e.markText(e.posFromIndex(r.start),e.posFromIndex(r.end),{className:"cm-harlowe-2-cursor"})),"variable"===r.type||"tempVariable"===r.type||"hookRef"===r.type||"hook"===r.type){var n="hook"===r.type?"hookRef":r.type;s[n].forEach(function(n){n!==r&&n.name===r.name&&u.push(e.markText(e.posFromIndex(n.start),e.posFromIndex(n.end),{className:"cm-harlowe-2-variableOccurrence"}))})}"hookRef"!==r.type&&"hook"!==r.type||s.hook.forEach(function(n){if(n!==r&&n.name===r.name){var t="appended"===n.tagPosition?n.end-n.name.length-1:n.start+1;u.push(e.markText(e.posFromIndex(t),e.posFromIndex(t+n.name.length),{className:"cm-harlowe-2-hookOccurrence"}))}})}}var o=void 0,i=void 0,s={variable:[],tempVariable:[],hook:[],hookRef:[],populate:function(){var e=this;this.variable=[],this.tempVariable=[],this.hook=[],this.hookRef=[];var r=function r(n){"variable"!==n.type&&"tempVariable"!==n.type&&"hook"!==n.type&&"hookRef"!==n.type||e[n.type].push(n),n.children.forEach(r)};i.children.forEach(r)}},u=[],m=function(){var e=o.doc;i=t(e.getValue()),s.populate(),e.on("beforeChange",function(n,t){r(t,e.getValue())}),e.on("change",function(){var r=e.getValue();i=t(r),s.populate()}),e.on("swapDoc",m),e.on("cursorActivity",a),m=null};return{startState:function(){return o||(o=CodeMirror.modes["harlowe-2"].cm,
o.setOption("placeholder",["Enter the body text of your passage here.","''Bold'', //italics//, ^^superscript^^, ~~strikethrough~~, and <p>HTML tags</p> are available.","To display special symbols without them being transformed, put them between `backticks`.","To link to another passage, write the link text and the passage name like this: [[link text->passage name]]\nor this: [[passage name<-link text]]\nor this: [[link text]].","Macros like (set:) and (display:) are the programming of your passage. If you've (set:) a $variable, you can just enter its name to print it out.","To make a 'hook', put [single square brackets] around text - or leave it empty [] - then put a macro like (if:), a $variable, or a |nametag> outside the front, |like>[so].","Hooks can be used for many things: showing text (if:) something happened, applying a (text-style:), making a place to (append:) text later on, and much more!","Consult the Harlowe documentation for more information."].join("\n\n")),o.setOption("lineNumbers",!0),o.setOption("lineNumberFormatter",function(){return"\u2022"})),{pos:0}},blankLine:function(e){e.pos++},token:function(r,t){m&&m();var a=i.pathAt(t.pos),o=a[0];if(!o)return t.pos++,r.next(),null;for(;o===o.tokenAt(t.pos)&&!r.eol();)t.pos++,r.next();r.eol()&&t.pos++;for(var s={},u="",l=0;l<a.length;l+=1){var g=a[l].type,c="harlowe-2-"+g;switch(s[c]=(s[c]||0)+1,s[c]>1&&(c+="-"+s[c]),g){case"macroName":-1===n.indexOf(e(a[l].text.slice(0,-1)))&&(c+=" harlowe-2-error")}u+=c+" "}return u}}});var a=document.querySelector("style#cm-harlowe-2");a||(a=document.createElement("style"),a.setAttribute("id","cm-harlowe-2"),document.head.appendChild(a)),a.innerHTML=function(){var e=function(e,r,n){return function(t){return"background-color: hsla("+e+","+r+"%,"+n+"%,"+t+");"}},r=e(40,100,50),n=e(220,100,50),t=function(r){return e(320,44,50)(r)+"color: #a84186;"};return{root:"box-sizing:border-box;","cursor:not([class^='cm-harlowe-2-text cm-harlowe-2-root'])":"border-bottom: 2px solid darkgray;",CodeMirror:"padding: 0 !important","CodeMirror-linenumber":"color: #ccc;","CodeMirror-gutters":"left: 0px !important;",hook:r(.05),"hook-2":r(.1),"hook-3":r(.15),"hook-4":r(.2),"hook-5":r(.25),"hook-6":r(.3),"hook-7":r(.35),"hook-8":r(.4),"^=hook , ^=hook-":"font-weight:bold;","error:not([class*='cm-harlowe-2-string'])":"color: firebrick !important; background-color: hsla(17, 100%, 74%, 0.74) !important;",macro:t(.05),"macro-2":t(.1),"macro-3":t(.15),"macro-4":t(.2),"macro-5":t(.25),"macro-6":t(.3),"macro-7":t(.35),"macro-8":t(.4),macroName:"font-style:italic;","^=macro ":"font-weight:bold;","bold, strong":"font-weight:bold;","italic, em":"font-style:italic;",sup:"vertical-align: super;font-size:0.8em;",strike:"text-decoration: line-through;",verbatim:"background-color: hsla(0,0%,50%,0.1);","^=bold, ^=strong, ^=italic, ^=em, ^=sup, ^=verbatim, ^=strike":"font-weight:100; color: hsla(0,0,0,0.5)","^=string":"font-style:italic; display:inline-block; transform: scaleX(-1);","string + ^=string":"transform: none;","^=collapsed":"font-weight:bold; color: hsl(201, 100%, 30%);",collapsed:n(.025),"collapsed.hook":n(.05),"collapsed.hook-2":n(.1),"collapsed.hook-3":n(.15),"collapsed.hook-4":n(.2),"collapsed.hook-5":n(.25),"collapsed.hook-6":n(.3),"collapsed.hook-7":n(.35),"collapsed.hook-8":n(.4),"twineLink:not(.text)":"color: #3333cc;",tag:"color: #4d4d9d;",boolean:"color: #626262;",string:"color: #008282;",number:"color: #A15000;",variable:"color: #0076b2;",tempVariable:"color: #1a6e97;",hookRef:"color: #007f54;","variableOccurrence, hookOccurrence":"background: #9fdfc9 !important;",where:"color: #007f00; font-style:italic;",via:"color: #007f00; font-style:italic;",with:"color: #007f00; font-style:italic;",making:"color: #007f00; font-style:italic;",each:"color: #007f00; font-style:italic;",heading:"font-weight:bold;",hr:"display:block; background-image: linear-gradient(0deg, transparent, transparent 45%, silver 45%, transparent 55%, transparent);",align:"display:block; color: hsl(14, 99%, 37%); background-color: hsla(14, 99%, 87%, 0.2);",column:"display:block; color: hsl(204, 99%, 37%); background-color: hsla(204, 99%, 87%, 0.2);",escapedLine:"font-weight:bold; color: hsl(51, 100%, 30%);","identifier, property, belongingProperty, itsProperty, belongingItProperty, belongingItOperator":"color: #0076b2;",toString:function(){var e=this;return Object.keys(this).reduce(function(r,n){var t;return"toString"===n?r:"CodeMirror"===n.slice(0,10)?r+"."+n+"{"+e[n]+"}":(t=n.split(", ").map(function e(r){return r.indexOf(".")>-1?r.split(/\./g).map(e).join(""):r.indexOf(" + ")>-1?r.split(/ \+ /g).map(e).join(" + "):0===r.indexOf("^=")?"[class^='cm-harlowe-2-"+r.slice(2)+"']":".cm-harlowe-2-"+r}),r+t.join(", ")+"{"+e[n]+"}")},"")}}+""}()}.call(eval("this"));
