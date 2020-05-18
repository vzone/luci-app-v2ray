"use strict";"require form";"require fs";"require rpc";"require ui";var __awaiter=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(i,a){function u(t){try{o(r.next(t))}catch(t){a(t)}}function l(t){try{o(r.throw(t))}catch(t){a(t)}}function o(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(u,l)}o((r=r.apply(t,e||[])).next())}))},__generator=this&&this.__generator||function(t,e){var n,r,i,a,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function l(a){return function(l){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(i=2&a[0]?r.return:a[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,a[1])).done)return i;switch(r=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return u.label++,{value:a[1],done:!1};case 5:u.label++,r=a[1],a=[0];continue;case 7:a=u.ops.pop(),u.trys.pop();continue;default:if(!(i=u.trys,(i=i.length>0&&i[i.length-1])||6!==a[0]&&2!==a[0])){u=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){u.label=a[1];break}if(6===a[0]&&u.label<i[1]){u.label=i[1],i=a;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(a);break}i[2]&&u.ops.pop(),u.trys.pop();continue}a=e.call(t,u)}catch(t){a=[6,t],r=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}},callRunningStatus=rpc.declare({object:"luci.v2ray",method:"runningStatus",params:[],expect:{"":{code:1}}}),callCountList=rpc.declare({object:"luci.v2ray",method:"countList",params:["name"],expect:{"":{code:1,count:0}},filter:function(t){return 0===t.code?t.count:0}}),callFileMTime=rpc.declare({object:"file",method:"stat",params:["path"],expect:{"":{mtime:0}},filter:function(t){return t.mtime?new Date(1e3*t.mtime).toUTCString():"Unknown"}}),CUSTOMTextValue=form.TextValue.extend({__name__:"CUSTOM.TextValue",filepath:null,isjson:!1,required:!1,cfgvalue:function(){return this.filepath?L.resolveDefault(fs.read(this.filepath),""):this.super("cfgvalue",L.toArray(arguments))},write:function(t,e){if(!this.filepath)return this.super("write",L.toArray(arguments));var n=e.trim().replace(/\r\n/g,"\n")+"\n";return fs.write(this.filepath,n)},validate:function(t,e){if(this.required&&!e){var n=this.titleFn("title",t);return _("%s is required.").format(n)}if(this.isjson){var r=void 0;try{r=JSON.parse(e)}catch(t){if(!r||"object"!=typeof r)return _("Invalid JSON content.")}}return!0}}),CUSTOMListStatusValue=form.Value.extend({__name__:"CUSTOM.ListStatusValue",listtype:null,updatebtn:!1,btnstyle:"button",btntitle:null,onclick:null,renderWidget:function(t,e,n){var r=E("div"),i=n[0],a=n[1],u=[_("Total: %s").format('<span style="color: #ff8c00;margin: 0 5px;">'+i+"</span>"),_("Time: %s").format(a)];if(this.updatebtn){var l=this.titleFn("btntitle",t)||this.titleFn("title",t);u.push(E("button",{class:"cbi-button cbi-button-%s".format(this.btnstyle||"button"),click:ui.createHandlerFn(this,(function(t,e,n){return!!this.onclick&&this.onclick(n,t,e)}),t,this.listtype)},[l]))}return L.dom.content(r,u),r},cfgvalue:function(){return this.listtype||L.error("TypeError","List type is required"),Promise.all([callCountList(this.listtype),callFileMTime("/etc/v2ray/"+this.listtype+".txt")])},remove:function(){},write:function(){}}),CUSTOMRunningStatus=form.Value.extend({__name__:"CUSTOM.RunningStatus",pollStatus:function(){poll.add((function(){return __awaiter(this,void 0,void 0,(function(){var t;return __generator(this,(function(e){switch(e.label){case 0:return(t=document.getElementById("v2ray_status"))?[4,callRunningStatus()]:[2];case 1:return 0===e.sent().code?t.innerHTML=_("Running"):t.innerHTML=_("Not Running"),[2]}}))}))}),5)},renderWidget:function(){return this.pollStatus(),E("div",{id:"v2ray_status"},E("em",{},_("Collecting data...")))},remove:function(){},write:function(){}});return L.Class.extend({TextValue:CUSTOMTextValue,ListStatusValue:CUSTOMListStatusValue,RunningStatus:CUSTOMRunningStatus});