(this["webpackJsonpworkout-app-react"]=this["webpackJsonpworkout-app-react"]||[]).push([[0],{34:function(e,t,a){e.exports=a(78)},39:function(e,t,a){},41:function(e,t,a){},63:function(e,t,a){},64:function(e,t,a){},65:function(e,t,a){},66:function(e,t,a){},67:function(e,t,a){},68:function(e,t,a){},69:function(e,t,a){},70:function(e,t,a){},71:function(e,t,a){},72:function(e,t,a){},73:function(e,t,a){},74:function(e,t,a){},75:function(e,t,a){},76:function(e,t,a){},77:function(e,t,a){},78:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(28),i=a.n(c),l=(a(39),a(40),a(41),a(12)),o=a(14),s=a.n(o),u=a(29),m=a.n(u),d=a(5),f=function(){var e=Object(n.useState)(!1),t=Object(l.a)(e,2),a=t[0],c=t[1];console.log("Login");var i={signInFlow:"popup",signInOptions:[s.a.auth.GoogleAuthProvider.PROVIDER_ID,s.a.auth.EmailAuthProvider.PROVIDER_ID],callbacks:{signInSuccess:function(){return c(!0),!1}}};return r.a.createElement(r.a.Fragment,null,a?r.a.createElement(d.a,{to:"/home"}):r.a.createElement(m.a,{uiConfig:i,firebaseAuth:s.a.auth()}))},p=(a(63),function(){return console.log("LoadingIndicator"),r.a.createElement("div",{className:"root"},r.a.createElement("div",{className:"root__div"}))}),g=(a(64),a(65),a(7)),E=(a(66),function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"navigation"},r.a.createElement("ul",{className:"navigation__ul"},r.a.createElement("li",{className:"navigation__li"},r.a.createElement(g.b,{to:"/trainings",className:"navigation__a"},"Treningi")),r.a.createElement("li",{className:"navigation__li"},r.a.createElement(g.b,{to:"/statistics",className:"navigation__a"},"Statystyki")),r.a.createElement("li",{className:"navigation__li"},r.a.createElement(g.b,{to:"/measurement",className:"navigation__a"},"Pomiary")))))}),h=function(){var e=Object(n.useContext)(w).currentUser;Object(n.useEffect)((function(){}),[]);return r.a.createElement("header",{className:"header"},r.a.createElement("h1",{className:"header__logo"},r.a.createElement(g.b,{to:"/",className:"header__link"},"TO DO WORKOUT")),e?r.a.createElement(r.a.Fragment,null,r.a.createElement(E,null),r.a.createElement("button",{className:"header__link",onClick:function(){s.a.auth().signOut().then((function(){}),(function(e){}))}},"Wyloguj si\u0119")):r.a.createElement(g.b,{className:"header__link",to:"/login"},"Zaloguj si\u0119"))},v=a(33),b=function(e){var t=e.component,a=Object(v.a)(e,["component"]),c=Object(n.useContext)(w).currentUser;return r.a.createElement(d.b,Object.assign({},a,{render:function(e){return c?r.a.createElement(t,e):r.a.createElement(d.a,{to:"/"})}}))},_=a(17),x=(a(67),function(e){var t=e.formFields,a=t.fields,n=t.button,c=e.handleSubmit;return r.a.createElement(_.b,{onSubmit:c},(function(e){return r.a.createElement("form",{onSubmit:e.handleSubmit,className:"form"},a.map((function(e){return r.a.createElement(_.a,{key:e.name,name:e.name,validate:e.validate,defaultValue:e.initialValue,parse:e.parse},(function(t){var a=t.input,n=t.meta;return r.a.createElement("div",{className:"form__wrapper"},r.a.createElement("label",null,e.text),"textarea"===e.component?r.a.createElement("textarea",Object.assign({className:"form__textarea"},a,{type:"text",placeholder:"Description"})):r.a.createElement("input",Object.assign({className:"form__input"},a,{type:e.type?e.type:"text",step:e.step?e.step:void 0,min:e.min?e.min:void 0,placeholder:e.placeholder})),n.error&&n.touched&&r.a.createElement("span",{className:"form__span"},n.error))}))})),r.a.createElement("button",{variant:n.variant,type:n.type,className:"form__button"},n.text))}))}),N=(a(68),function(e){var t=e.onClick,a=e.children;return r.a.createElement("button",{onClick:t,className:"button"},a)}),j=(a(69),a(32)),O=function(){var e=Object(d.g)();return r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:"arrow__span",onClick:function(){e.goBack()}},r.a.createElement(j.a,null)))},w=Object(n.createContext)({}),y=function(e){var t=e.children,a=e.fire,c=Object(n.useState)(null),i=Object(l.a)(c,2),o=i[0],s=i[1],u=Object(n.useState)(!0),m=Object(l.a)(u,2),d=m[0],f=m[1];return Object(n.useEffect)((function(){a.auth().onAuthStateChanged((function(e){(s(e),f(!1),e)&&a.database().ref("users/").child(e.uid).once("value",(function(t){var n,r;null!==t.val()||(n=e.uid,r=e.email,a.database().ref("users/"+n).set({email:r}))}))}))}),[a]),d?r.a.createElement(p,null):r.a.createElement(w.Provider,{value:{currentUser:o}},t)},k=function(){var e=Object(n.useContext)(w).currentUser;return r.a.createElement(r.a.Fragment,null,e?r.a.createElement("div",null,"Witaj zalogowany"):r.a.createElement("div",null,"Zaloguj si\u0119"))},S=function(){var e=Object(n.useContext)(w).currentUser;return console.log("currentUser w HOME:",e),r.a.createElement(r.a.Fragment,null,r.a.createElement("ul",null,"Ostatnie treningi",r.a.createElement("li",null),r.a.createElement("li",null),r.a.createElement("li",null)))},C=s.a.initializeApp({apiKey:"AIzaSyAkx7U5xHRytqTxEvWcAeBafAnn0RxvCGE",authDomain:"workout-app-react.firebaseapp.com",databaseURL:"https://workout-app-react.firebaseio.com",projectId:"workout-app-react",storageBucket:"workout-app-react.appspot.com",messagingSenderId:"525427559623",appId:"1:525427559623:web:086662897279ef7ca942e2",measurementId:"G-LRVXXWQ6R2"}),F=(a(70),function(e){var t=e.trainings,a=Object(d.g)();return r.a.createElement("div",{className:"list"},r.a.createElement("h2",{className:"list__h2"},"Ostatnie treningi"),r.a.createElement("ul",{className:"list__ul"},t&&t.map((function(e){var t=e.date.replace(/T/g," ");return r.a.createElement("li",{onClick:function(){return function(e){a.push("/trainings/".concat(e.id))}(e)},key:e.date,className:"list__li"},r.a.createElement("p",{className:"list__p"},e.trainingName),r.a.createElement("p",{className:"list__p"},t))})).reverse()))}),z=function(e){return function(t){return t?void 0:e}},D=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return function(e){return t.reduce((function(t,a){return t||a(e)}),void 0)}},R=function(){var e=Object(d.g)(),t=Object(n.useContext)(w).currentUser,a=Object(n.useState)(),c=Object(l.a)(a,2),i=c[0],o=c[1],s=new Date,u="".concat(s.getFullYear(),"-").concat(s.getMonth()+1,"-").concat(s.getDate()>9?s.getDate():"0"+s.getDate(),"T").concat(s.getHours()>9?s.getHours():"0"+s.getHours(),":").concat(s.getMinutes()>9?s.getMinutes():"0"+s.getMinutes()),m={fields:[{name:"date",validate:D(z("To pole jest wymagane!")),initialValue:u,text:"Data treningu",placeholder:"Data treningu",type:"datetime-local"},{name:"trainingName",validate:D(z("To pole jest wymagane!")),initialValue:void 0,text:"Nazwa treningu",placeholder:"Nazwa treningu"}],button:{type:"submit",text:"Dodaj trening"}},f=function(e){var t=[];e.forEach((function(e){var a=e.val();t.push(a)})),o(t)};return Object(n.useEffect)((function(){if(t){var e=C.database().ref("users/"+t.uid+"/trainings").orderByChild("date");return e.on("value",f),function(){e.off("value",f)}}}),[t]),r.a.createElement(r.a.Fragment,null,r.a.createElement(x,{formFields:m,handleSubmit:function(a){var n=a.date.replace(/-/g,"").replace(/T/g,"").replace(/:/g,"");t&&(!function(e,t,a,n){C.database().ref("users/"+e+"/trainings/"+t).set({id:t,date:a,trainingName:n})}(t.uid,n,a.date,a.trainingName),e.push("/trainings/".concat(n)))}}),i&&r.a.createElement(F,{trainings:i}))},T=(a(71),function(e){var t=e.exercises,a=e.id,n=Object(d.g)();return r.a.createElement("ul",{className:"training-exercise-list__ul"},t.map((function(e){return r.a.createElement("li",{onClick:function(){return function(e,t){n.push({pathname:"/trainings/".concat(a,"/").concat(e),state:{exerciseName:t}})}(e.key,e.name)},key:e.key,className:"training-exercise-list__exercise"},e.name)})).reverse())}),U=(a(72),function(e){var t=e.match,a=Object(d.g)(),c=t.params.id,i=Object(n.useContext)(w).currentUser,o={fields:[{name:"exerciseName",validate:D(z("To pole jest wymagane!")),initialValue:void 0,text:"Nowe \u0107wiczenie",placeholder:"Nowe \u0107wiczenie"}],button:{type:"submit",text:"Dodaj \u0107wiczenie"}},s=Object(n.useState)(),u=Object(l.a)(s,2),m=u[0],f=u[1],p=Object(n.useState)(),g=Object(l.a)(p,2),E=g[0],h=g[1],v=function(e){f(e.val().trainingName)},b=function(e){var t=[];e.forEach((function(e){var a=e.val().name,n=e.key;t.push({name:a,key:n})})),h(t)};return Object(n.useEffect)((function(){if(i){var e=C.database().ref("users/".concat(i.uid,"/trainings/").concat(c));return e.once("value").then(v),e.child("exercises").on("value",b),function(){e.off("value",v),e.child("exercises").off("value",b)}}}),[i,c]),r.a.createElement("div",{className:"training"},r.a.createElement(O,null),r.a.createElement(N,{onClick:function(){i&&(C.database().ref("users/".concat(i.uid,"/trainings/").concat(c)).remove(),a.goBack())}},"Usu\u0144 trening"),r.a.createElement("h2",{className:"exercise__h2"},m),r.a.createElement(x,{formFields:o,handleSubmit:function(e){i&&C.database().ref("users/".concat(i.uid,"/trainings/").concat(c)).child("exercises").push().set({name:e.exerciseName})}}),E&&r.a.createElement(T,{exercises:E,id:c}))}),V=(a(73),a(74),function(e){var t=e.handleAddSeries;return r.a.createElement("div",{onClick:t,className:"exercise__line"},r.a.createElement("div",{className:"exercise__check"},"+"))}),I=(a(75),function(e){var t=e.index,a=e.handleRemoveSeries;return r.a.createElement("div",{className:"remove-series"},r.a.createElement("button",{onClick:function(){return a(t)},type:"button",className:"remove-series__button"},"Usu\u0144 seri\u0119"))}),A=(a(76),function(e){var t=e.index;return r.a.createElement(r.a.Fragment,null,t%2===0&&r.a.createElement("p",{className:"seriesNumber"},"Seria ",t/2+1))}),M=function(e){var t=e.formFields,a=t.fields,n=t.button,c=e.handleSubmit,i=e.setFormFields,l=function(){a.push({name:"exerciseWeight".concat(o()),validate:D(z("To pole jest wymagane!")),initialValue:void 0,text:"Ci\u0119\u017car",placeholder:"Ci\u0119\u017car"},{name:"exerciseRepeat".concat(o()),validate:D(z("To pole jest wymagane!")),initialValue:void 0,text:"Liczba powt\xf3rze\u0144",placeholder:"Liczba powt\xf3rze\u0144"}),i({fields:a,button:n})},o=function(){return Math.random().toString(36).substr(2,9)+Math.random().toString(36).substr(2,9)},s=function(e){a.splice(e-1,2),i({fields:a,button:n})};return r.a.createElement(_.b,{onSubmit:c},(function(e){return r.a.createElement("form",{onSubmit:e.handleSubmit,className:"form"},a.map((function(e,t){return r.a.createElement(_.a,{key:e.name,name:e.name,validate:e.validate,defaultValue:e.initialValue,parse:e.parse},(function(a){var n=a.input,c=a.meta;return r.a.createElement(r.a.Fragment,null,r.a.createElement(A,{index:t}),r.a.createElement("div",{className:"form__wrapper"},r.a.createElement("label",null,e.text),r.a.createElement("input",Object.assign({className:"form__input"},n,{type:"number",step:"1",min:"0",placeholder:e.placeholder})),c.error&&c.touched&&r.a.createElement("span",{className:"form__span"},c.error)),t%2===1&&r.a.createElement(I,{index:t,handleRemoveSeries:s}))}))})),r.a.createElement(V,{handleAddSeries:l}),r.a.createElement("button",{className:"form__button"},n.text))}))},W=(a(77),function(e){var t=Object(d.g)(),a=Object(n.useContext)(w).currentUser,c=t.location.state.exerciseName,i=e.match.url.replace("/trainings/","").replace("/"+e.match.params.id,""),o=Object(n.useState)({fields:[{name:"exerciseWeight",validate:D(z("To pole jest wymagane!")),initialValue:void 0,text:"Ci\u0119\u017car",placeholder:"Ci\u0119\u017car"},{name:"exerciseRepeat",validate:D(z("To pole jest wymagane!")),initialValue:void 0,text:"Liczba powt\xf3rze\u0144",placeholder:"Liczba powt\xf3rze\u0144"}],button:{type:"submit",text:"Zapisz"}}),s=Object(l.a)(o,2),u=s[0],m=s[1];return Object(n.useEffect)((function(){a&&C.database().ref("users/".concat(a.uid,"/trainings/").concat(i,"/exercises/").concat(e.match.params.id,"/series")).on("value",(function(e){if(e){var t=[];e.forEach((function(e){t.push({name:"".concat(t.length%2===0?"exerciseWeight":"exerciseRepeat").concat(Math.random().toString(36).substr(2,9)+Math.random().toString(36).substr(2,9)),validate:D(z("To pole jest wymagane!")),initialValue:e.val(),text:"Ci\u0119\u017car",placeholder:"Ci\u0119\u017car"})})),t.length>0&&m({fields:t,button:{type:"submit",text:"Zapisz"}})}}))}),[a,i,e.match.params.id]),r.a.createElement("div",{className:"exercise"},r.a.createElement(O,null),r.a.createElement(N,{onClick:function(){a&&(C.database().ref("users/".concat(a.uid,"/trainings/").concat(i,"/exercises/").concat(e.match.params.id)).remove(),t.goBack())}},"Usu\u0144 \u0107wiczenie"),r.a.createElement("h2",{className:"exercise__h2"},c),r.a.createElement(M,{formFields:u,setFormFields:m,handleSubmit:function(t){var n=[];if(u.fields.forEach((function(e){n.push(t[e.name])})),a){var r="users/".concat(a.uid,"/trainings/").concat(i,"/exercises/").concat(e.match.params.id);C.database().ref(r).child("series").set(n)}}}))}),B=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(r.a.Suspense,{fallback:r.a.createElement(p,null)},r.a.createElement(y,{fire:C},r.a.createElement("div",{className:"app__wrapper"},r.a.createElement(g.a,null,r.a.createElement(h,null),r.a.createElement(d.d,null,r.a.createElement(d.b,{path:"/login"},r.a.createElement(f,null)),r.a.createElement(b,{path:"/home",exact:!1,component:S}),r.a.createElement(b,{path:"/trainings",component:R,exact:!0}),r.a.createElement(b,{path:"/trainings/:id",component:U,exact:!0}),r.a.createElement(b,{path:"/trainings/:id/:id",component:W,exact:!0}),r.a.createElement(b,{path:"/statistics",exact:!1,component:S}),r.a.createElement(b,{path:"/measurement",exact:!1,component:S}),r.a.createElement(d.b,{path:"/",exact:!0},r.a.createElement(k,null))))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(B,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[34,1,2]]]);
//# sourceMappingURL=main.49df9e1b.chunk.js.map