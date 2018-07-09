(function(t){function e(e){for(var n,a,r=e[0],l=e[1],c=e[2],u=0,p=[];u<r.length;u++)a=r[u],s[a]&&p.push(s[a][0]),s[a]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);d&&d(e);while(p.length)p.shift()();return o.push.apply(o,c||[]),i()}function i(){for(var t,e=0;e<o.length;e++){for(var i=o[e],n=!0,r=1;r<i.length;r++){var l=i[r];0!==s[l]&&(n=!1)}n&&(o.splice(e--,1),t=a(a.s=i[0]))}return t}var n={},s={1:0},o=[];function a(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=t,a.c=n,a.d=function(t,e,i){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(i,n,function(e){return t[e]}.bind(null,n));return i},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var d=l;o.push([3,0]),i()})({3:function(t,e,i){t.exports=i("Vtdi")},EDI0:function(t,e,i){},EYdo:function(t,e,i){"use strict";var n=i("yM+8"),s=i.n(n);s.a},Vtdi:function(t,e,i){"use strict";i.r(e);i("VRzm");var n=i("Kw5r"),s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container",attrs:{id:"app"}},[t._m(0),i("TodoList",{staticClass:"todo-list"})],1)},o=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"p-1 has-background-primary"},[i("h1",{staticClass:"title has-text-centered"},[t._v("Vue Tasks")])])}],a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"inputArea"},[i("div",{staticClass:"group"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.newTask.title,expression:"newTask.title"}],staticClass:"inputArea-input",attrs:{required:"",type:"text"},domProps:{value:t.newTask.title},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.addTask(e):null},input:function(e){e.target.composing||t.$set(t.newTask,"title",e.target.value)}}}),i("span",{staticClass:"highlight"}),i("span",{staticClass:"bar"}),i("label",{staticClass:"inputArea-label"},[t._v("Add a new task")])])]),t._l(t.tasks,function(e,n){return i("div",{key:e.id,staticClass:"taskList px-1 py-1"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.completed,expression:"task.completed"}],staticClass:"toggle",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.completed)?t._i(e.completed,null)>-1:e.completed},on:{change:function(i){var n=e.completed,s=i.target,o=!!s.checked;if(Array.isArray(n)){var a=null,r=t._i(n,a);s.checked?r<0&&t.$set(e,"completed",n.concat([a])):r>-1&&t.$set(e,"completed",n.slice(0,r).concat(n.slice(r+1)))}else t.$set(e,"completed",o)}}}),i("div",{staticClass:"taskList-content"},[i("div",{class:{completed:e.completed}},[e.titleEditing?i("input",{directives:[{name:"model",rawName:"v-model",value:e.title,expression:"task.title"},{name:"focus",rawName:"v-focus"}],staticClass:"edit-title",attrs:{type:"text"},domProps:{value:e.title},on:{blur:function(i){t.doneTitleEdit(e)},keyup:[function(i){if(!("button"in i)&&t._k(i.keyCode,"enter",13,i.key,"Enter"))return null;t.doneTitleEdit(e)},function(i){if(!("button"in i)&&t._k(i.keyCode,"esc",27,i.key,"Escape"))return null;t.cancelTitleEdit(e)}],input:function(i){i.target.composing||t.$set(e,"title",i.target.value)}}}):i("label",{staticClass:"view-title",on:{click:function(i){t.editTitle(e)}}},[t._v(t._s(e.title))])]),i("div",{class:{completed:e.completed}},[e.descriptionEditing?i("input",{directives:[{name:"model",rawName:"v-model",value:e.description,expression:"task.description"},{name:"focus",rawName:"v-focus"}],staticClass:"edit-description",attrs:{type:"text"},domProps:{value:e.description},on:{blur:function(i){t.doneDescriptionEdit(e)},keyup:[function(i){if(!("button"in i)&&t._k(i.keyCode,"enter",13,i.key,"Enter"))return null;t.doneDescriptionEdit(e)},function(i){if(!("button"in i)&&t._k(i.keyCode,"esc",27,i.key,"Escape"))return null;t.cancelDescriptionEdit(e)}],input:function(i){i.target.composing||t.$set(e,"description",i.target.value)}}}):i("label",{staticClass:"view-description",on:{click:function(i){t.editDescription(e)}}},[t._v(t._s(e.description))])])]),i("div",{staticClass:"modal",class:{"is-active":e.taskEditing}},[i("div",{staticClass:"modal-background"}),i("div",{staticClass:"modal-content"},[i("div",{staticClass:"edit-task"},[i("div",{staticClass:"field"},[i("div",{staticClass:"control"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.title,expression:"task.title"}],staticClass:"input",attrs:{type:"text",placeholder:"Title"},domProps:{value:e.title},on:{input:function(i){i.target.composing||t.$set(e,"title",i.target.value)}}})]),t.titleError?i("p",{staticClass:"help is-danger"},[t._v("Title required")]):t._e()]),i("div",{staticClass:"field"},[i("div",{staticClass:"control"},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:e.description,expression:"task.description"}],staticClass:"textarea",attrs:{placeholder:"Description"},domProps:{value:e.description},on:{input:function(i){i.target.composing||t.$set(e,"description",i.target.value)}}})])]),i("div",{staticClass:"field"},[i("div",{staticClass:"control"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.date,expression:"task.date"}],staticClass:"input",attrs:{required:"",type:"date",placeholder:"Date"},domProps:{value:e.date},on:{input:function(i){i.target.composing||t.$set(e,"date",i.target.value)}}})]),t.dateError?i("p",{staticClass:"help is-danger"},[t._v("Date required")]):t._e()]),i("div",{staticClass:"field"},[i("button",{staticClass:"button is-primary",on:{click:function(i){t.doneTaskEdit(e)}}},[t._v("Submit")])])])]),i("button",{staticClass:"modal-close is-large",attrs:{"aria-label":"close"},on:{click:function(i){t.cancelTaskEdit(e)}}})]),i("font-awesome-icon",{staticClass:"edit-icon",attrs:{icon:"edit",type:"button","aria-label":"edit"},on:{click:function(i){t.editTask(e)}}}),i("font-awesome-icon",{staticClass:"delete-icon",attrs:{icon:"times",type:"button","aria-label":"delete"},on:{click:function(e){t.deleteTask(n)}}})],1)})],2)},r=[],l={name:"TodoList",data:function(){return{formVisible:!1,newTask:{title:"",desciption:"",date:"",completed:!1,titleEditing:!1,descriptionEditing:!1},tasks:[{title:"Meeting w. E. You",description:"Discuss about the future of Vue.js.",date:"2018-09-13",completed:!1,titleEditing:!1,descriptionEditing:!1,taskEditing:!1},{title:"Book Flight",description:"Book flight with Etihad Airways to Paris.",date:"2018-09-10",completed:!1,titleEditing:!1,descriptionEditing:!1,taskEditing:!1},{title:"Haircut",description:"",date:"2018-09-11",completed:!1,titleEditing:!1,descriptionEditing:!1,taskEditing:!1},{title:"Bike Ride",description:"Plan the best route.",date:"2018-09-12",completed:!1,titleEditing:!1,descriptionEditing:!1,taskEditing:!1},{title:"Email to M. Zuckerberg",description:"",date:"2018-09-14",completed:!1,titleEditing:!1,descriptionEditing:!1,taskEditing:!1}],titleError:!1,dateError:!1,beforeEditTitle:"",beforeEditDescription:"",beforeEditDate:""}},directives:{focus:{inserted:function(t){t.focus()}}},methods:{addTask:function(){this.newTask.title&&(this.tasks.push(this.newTask),this.newTask={title:"",desciption:"",date:"",completed:!1,titleEditing:!1,descriptionEditing:!1})},deleteTask:function(t){var e=this;swal({title:"Delete this task?",text:"This will permanently remove it!",icon:"warning",buttons:!0,dangerMode:!0}).then(function(i){i?(e.tasks.splice(t,1),swal("Task has been deleted!",{icon:"success"})):swal("Task is safe!")})},editTitle:function(t){this.beforeEditTitle=t.title,t.titleEditing=!0},editDescription:function(t){this.beforeEditDescription=t.description,t.descriptionEditing=!0},editTask:function(t){this.beforeEditTitle=t.title,this.beforeEditDescription=t.description,this.beforeEditDate=t.date,t.taskEditing=!0},doneTitleEdit:function(t){t.title||(t.title=this.beforeEditTitle),t.titleEditing=!1},doneDescriptionEdit:function(t){t.descriptionEditing=!1},doneTaskEdit:function(t){return t.title&&t.date?(this.titleError=!1,this.dateError=!1,void(t.taskEditing=!1)):t.title||t.date?t.title?(this.dateError=!0,void(this.newTask.date="")):(this.titleError=!0,void(this.newTask.title="")):(this.titleError=!0,this.newTask.title="",this.dateError=!0,void(this.newTask.date=""))},cancelTitleEdit:function(t){t.title=this.beforeEditTitle,t.titleEditing=!1},cancelDescriptionEdit:function(t){t.description=this.beforeEditDescription,t.descriptionEditing=!1},cancelTaskEdit:function(t){t.title=this.beforeEditTitle,t.description=this.beforeEditDescription,t.date=this.beforeEditDate,t.taskEditing=!1}}},c=l,d=(i("EYdo"),i("KHd+")),u=Object(d["a"])(c,a,r,!1,null,"3bcf05da",null),p=u.exports,f={name:"app",components:{TodoList:p}},m=f,v=(i("ZL7j"),Object(d["a"])(m,s,o,!1,null,null,null)),k=v.exports,g=i("lIOY");Object(g["a"])("".concat("","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},cached:function(){console.log("Content has been cached for offline use.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}});i("60Zk");var E=i("7O5W"),h=i("wHSu"),b=i("elWB");i("GUC0");E["library"].add(h["a"]),E["library"].add(h["b"]),n["a"].component("font-awesome-icon",b["FontAwesomeIcon"]),n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(k)}}).$mount("#app")},ZL7j:function(t,e,i){"use strict";var n=i("EDI0"),s=i.n(n);s.a},"yM+8":function(t,e,i){}});
//# sourceMappingURL=app.fe46ab4a.js.map