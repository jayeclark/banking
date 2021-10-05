(this.webpackJsonpbanking=this.webpackJsonpbanking||[]).push([[0],{19:function(e){e.exports=JSON.parse('{"pages":{"home":{"nav-button":"Home","nav-tool-tip":"Return to Home","nav-route":"/","header":"Welcome to Bad Bank of America","card":{"cardMsg":"See how Bad Bank of America\xae banking solutions and Bad Merrill Edge\xae Investment services can help make your personal financial life easier."},"id":"home-page","valueIfNotLoggedIn":"","valueIfNoData":""},"createAccount":{"nav-button":"Create Account","nav-tool-tip":"Create an Account","nav-route":"/create-account/","header":"Create a New Account","card":{"cardMsg":"Enter your name, email, and password and click submit to create a new account!"},"id":"create-account-page","valueIfNotLoggedIn":"","valueIfNoData":""},"deposit":{"nav-button":"Deposit","nav-tool-tip":"Deposit to Your Account","nav-route":"/deposit/","header":"Make a Deposit","card":{"cardMsg":"Enter an amount and click submit to make a deposit to your account!","balanceMsg":"Current Balance: $"},"id":"deposit-page","valueIfNotLoggedIn":"You must be logged in to deposit.","valueIfNoData":""},"withdraw":{"nav-button":"Withdraw","nav-tool-tip":"Withdraw from Your Account","nav-route":"/withdraw/","header":"Make a Withdrawal","card":{"cardMsg":"Enter an amount and click the button to make a withdrawal from your account!","balanceMsg":"Current Balance: $"},"id":"withdraw-page","valueIfNotLoggedIn":"You must be logged in and have a positive balance in order to request a withdrawal!","valueIfNoData":"You must have a positive balance amount in order to make a withdrawal from your account!"},"allData":{"nav-button":"All Data","nav-tool-tip":"View All Transaction Data","nav-route":"/all-data/","header":"Recent Transactions","card":{"cardMsg":"","cardCols":["Date","Description","Credit","Debit","Balance"]},"id":"all-data-page","valueIfNotLoggedIn":"You must be logged in to see recent transaction data.","valueIfNoData":"No data available to display."}},"forms":{"createAccount":{"formSubmission":{"buttons":[{"type":"submit","name":"submit","display":"Create Account","altDisplay":"Add Another Account","className":"btn btn-primary","dependency":false}],"success":"Your account has been created and you have automatically been logged in. You may now make deposits and withdrawals.","failure":"An account is already associated with that email! Please use a different one.","idRoot":"create-account","typeOfAction":"Account created","displayAlt":"accountCreated"},"formFields":[{"name":"name","display":"Name","type":"text","validation":[{"functionName":"hasInput","error":"Please enter your name"},{"functionName":"hasInput","args":[{"name":"len","value":4}],"error":"Name must be 4 or more characters long"}]},{"name":"email","display":"Email","type":"text","validation":[{"functionName":"hasInput","error":"Please enter your email address"},{"functionName":"emailFormat","error":"Please enter a valid email address"}]},{"name":"password","display":"Password","type":"password","validation":[{"functionName":"hasInput","args":[{"name":"len","value":4}],"error":"Must be 8 characters or longer"},{"functionName":"passwordFormat","error":"Must include letter, number & special character."}]}],"valueIfNotLoggedIn":"","valueIfNoData":""},"deposit":{"formSubmission":{"buttons":[{"type":"submit","name":"submit","display":"Deposit","className":"btn btn-primary","dependency":false}],"success":"Your deposit has been recorded!","failure":"We were unable to make a deposit. Please try again later.","idRoot":"deposit-form","typeOfAction":"Deposit to account"},"formFields":[{"name":"deposit","display":"Amount ($)","type":"text","validation":[{"functionName":"hasInput","error":"Please enter an amount to deposit"},{"functionName":"isPositive","error":"Please enter a positive amount to deposit"},{"functionName":"isNumber","error":"Please enter a valid number, with no currency symbol"},{"functionName":"hasTwoSigFigs","error":"Please only enter 2 decimal points"}]}],"valueIfNotLoggedIn":"You must be logged in to deposit.","valueIfNoData":""},"withdraw":{"formSubmission":{"buttons":[{"type":"submit","name":"submit","display":"Withdraw","className":"btn btn-primary","dependency":false}],"success":"Your withdrawal has been recorded!","failure":"We were unable to make a withdrawal. Please try again later.","idRoot":"withdraw-form","typeOfAction":"Withdrawal from account"},"formFields":[{"name":"withdraw","display":"Amount ($)","type":"text","validation":[{"functionName":"hasInput","error":"Please enter an amount to withdraw"},{"functionName":"isPositive","error":"Please enter a positive amount to withdraw"},{"functionName":"isNumber","error":"Please enter a valid number, with no currency symbol"},{"functionName":"hasTwoSigFigs","error":"Please only enter 2 decimal points"},{"functionName":"isLessThanBalance","args":[{"name":"balance","value":""}],"error":"Overdraw alert: Amount is more than your available balance"}]}],"valueIfNotLoggedIn":"You must be logged in and have a positive balance in order to request a withdrawal!","valueIfNoData":"You must have a positive balance amount in order to make a withdrawal from your account!"}},"components":{"footer":{"links":["Locations","Contact Us","Accessible Banking","Careers","Privacy","Security","Sitemap"]}},"general":{"successTitle":"Success","failureTitle":"Error","signIn":"Sign In","signOut":"Sign Out"}}')},28:function(e){e.exports=JSON.parse("{}")},29:function(e){e.exports=JSON.parse("{}")},30:function(e){e.exports=JSON.parse("{}")},31:function(e){e.exports=JSON.parse('{"pages":{"home":{"nav-button":"Inicio","nav-tool-tip":"Volver a Inicio","nav-route":"/","header":"Bienvenido a Bad Bank of America","card":{"cardMsg":"Vea c\xf3mo las soluciones bancarias de Bad Bank of America\xae y los servicios de Bad Merrill Edge\xae Investment pueden ayudarle a facilitar su vida financiera personal."},"id":"home-page","valueIfNotLoggedIn":"","valueIfNoData":""},"createAccount":{"nav-button":"Crear Cuenta","nav-tool-tip":"Crear una Cuenta","nav-route":"/create-account/","header":"Crear una Cuenta Nueva","card":{"cardMsg":"\xa1Ingrese su nombre, correo electr\xf3nico y contrase\xf1a y haga clic en enviar para crear una nueva cuenta!"},"id":"create-account-page","valueIfNotLoggedIn":"","valueIfNoData":""},"deposit":{"nav-button":"Depositar","nav-tool-tip":"Deposite en su Cuenta","nav-route":"/deposit/","header":"Hacer un Dep\xf3sito","card":{"cardMsg":"\xa1Ingrese una cantidad y haga clic en enviar para realizar un dep\xf3sito en su cuenta!","balanceMsg":"Saldo Corriente: $"},"id":"deposit-page","valueIfNotLoggedIn":"Debes iniciar sesi\xf3n para depositar.","valueIfNoData":""},"withdraw":{"nav-button":"Retirar","nav-tool-tip":"Retirar de su Cuenta","nav-route":"/withdraw/","header":"Hace un Retiro","card":{"cardMsg":"Ingrese una cantidad y haz clic el bot\xf3n para realizar un retiro de su cuenta.","balanceMsg":"Saldo Corriente: $"},"id":"withdraw-page","valueIfNotLoggedIn":"Debes iniciar sesi\xf3n y tener un saldo positivo para solicitar un retiro.","valueIfNoData":"Debes tener un saldo positivo para poder hacer un retiro de su cuenta."},"allData":{"nav-button":"Todos los Datos","nav-tool-tip":"Ver todos los Datos de Transacciones","nav-route":"/all-data/","header":"Transacciones Recientes","card":{"cardMsg":"","cardCols":["Fecha","Descripci\xf3n","Cr\xe9dito","D\xe9bito","Saldo"]},"id":"all-data-page","valueIfNotLoggedIn":"No hay datos disponibles para mostrar.","valueIfNoData":"Debes iniciar sesi\xf3n para ver las transacciones recientes."}},"forms":{"createAccount":{"formSubmission":{"buttons":[{"type":"submit","name":"submit","display":"Crear Cuenta","altDisplay":"Agregar Otra Cuenta","className":"btn btn-primary","dependency":false}],"success":"Se ha creado su cuenta y ha iniciado sesi\xf3n autom\xe1ticamente. Ahora puede realizar dep\xf3sitos y retiros.","failure":"\xa1Ya hay una cuenta asociada a ese correo electr\xf3nico! Utilice una diferente.","idRoot":"create-account","typeOfAction":"Cuenta creada","displayAlt":"accountCreated"},"formFields":[{"name":"name","display":"Nombre","type":"text","validation":[{"functionName":"hasInput","error":"Ingresa tu nombre"},{"functionName":"hasInput","args":[{"name":"len","value":4}],"error":"El nombre debe tener 4 o m\xe1s caracteres"}]},{"name":"email","display":"Correo Electronico","type":"text","validation":[{"functionName":"hasInput","error":"Ingresa tu direcci\xf3n de correo electr\xf3nico"},{"functionName":"emailFormat","error":"Ingresa una direcci\xf3n de correo electr\xf3nico v\xe1lida"}]},{"name":"password","display":"Contrase\xf1a","type":"password","validation":[{"functionName":"hasInput","args":[{"name":"len","value":4}],"error":"Debe tener 8 caracteres o m\xe1s"},{"functionName":"passwordFormat","error":"Debe incluir letra, n\xfamero y car\xe1cter especial"}]}],"valueIfNotLoggedIn":"","valueIfNoData":""},"deposit":{"formSubmission":{"buttons":[{"type":"submit","name":"submit","display":"Dep\xf3sito","className":"btn btn-primary","dependency":false}],"success":"\xa1Su dep\xf3sito ha sido registrado!","failure":"No pudimos realizar un dep\xf3sito. Vuelva a intentarlo m\xe1s tarde.","idRoot":"deposit-form","typeOfAction":"Formulario de dep\xf3sito"},"formFields":[{"name":"deposit","display":"Amount ($)","type":"text","validation":[{"functionName":"hasInput","error":"Ingresa una cantidad para depositar"},{"functionName":"isPositive","error":"Ingresa una cantidad positiva para depositar"},{"functionName":"isNumber","error":"Ingresa un n\xfamero v\xe1lido, sin s\xedmbolo de moneda"},{"functionName":"hasTwoSigFigs","error":"Ingresa solo 2 puntos decimales"}]}],"valueIfNotLoggedIn":"Debes iniciar sesi\xf3n para depositar.","valueIfNoData":""},"withdraw":{"formSubmission":{"buttons":[{"type":"submit","name":"submit","display":"Retirar","className":"btn btn-primary","dependency":false}],"success":"Su retiro ha sido registrado.","failure":"No pudimos hacer un retiro. Por favor, int\xe9ntelo de nuevo m\xe1s tarde.","idRoot":"withdraw-form-","typeOfAction":"Retiro de la cuenta"},"formFields":[{"name":"withdraw","display":"Cantidad ($)","type":"text","validation":[{"functionName":"hasInput","error":"Ingrese una cantidad para retirar"},{"functionName":"isPositive","error":"Ingrese una cantidad positiva para retirar"},{"functionName":"isNumber","error":"Ingrese un n\xfamero v\xe1lido, sin s\xedmbolo de moneda"},{"functionName":"hasTwoSigFigs","error":"Ingrese solo 2 puntos decimales"},{"functionName":"isLessThanBalance","args":[{"name":"balance","value":""}],"error":"Alerta de sobregiro: la cantidad es mayor que su saldo disponible"}]}],"valueIfNotLoggedIn":"\xa1Debes iniciar sesi\xf3n y tener un saldo positivo para solicitar un retiro!","valueIfNoData":"\xa1Debe tener un saldo positivo para poder hacer un retiro de su cuenta!"}},"components":{"footer":{"links":["Locations","Contact Us","Accessible Banking","Careers","Privacy","Security","Sitemap"]}},"general":{"successTitle":"\xc9xito","failureTitle":"Error","signIn":"Iniciar Sesi\xf3n","signOut":"Desconectar"}}')},42:function(e,a,t){},43:function(e,a,t){},44:function(e,a,t){},48:function(e,a,t){},49:function(e,a,t){},51:function(e,a,t){},54:function(e,a,t){},58:function(e,a,t){},59:function(e,a,t){},60:function(e,a,t){"use strict";t.r(a);var n=t(1),r=t.n(n),i=t(27),s=t.n(i),o=(t(42),t(23)),c=t(10),l=(t(43),t(44),t(15)),d=t(3),u=t.p+"static/media/heroimage.99862984.jpeg",m=t(0);var b=function(e){var a=e.image,t=e.header,n=e.content,r=e.form,i=e.className,s=e.id;return Object(m.jsxs)("div",{id:s||null,className:i?"card "+i:"card",children:[a?Object(m.jsx)("img",{alt:"",src:a,width:"100%",className:"card-img-top"}):null,t?Object(m.jsx)("div",{className:"card-header",children:Object(m.jsx)("h4",{children:t})}):null,Object(m.jsxs)("div",{className:"card-body",children:[n||null,r||null]})]})},p=Object(n.createContext)({language:"en"}),g=t(19),f=t(28),h=t(29),j=t(30),v=t(31),x={en:g,fr:f,it:h,de:j,es:v};var O=function(){var e=u,a=Object(n.useContext)(p).language,t=x[a].pages.home,r=t.header,i=t.card.cardMsg,s=t.id,o=Object(m.jsx)("p",{children:i});return Object(m.jsx)(b,{id:s,image:e,header:r,content:o})},N=Object(n.createContext)({users:[]}),y=Object(n.createContext)({form:"formik"}),w=Object(n.createContext)(null),I=t(32),C=t(37),A=(t(48),t(49),t.p+"static/media/closeButton.47dd7fbc.svg");var k=function(e){var a=e.title,t=e.text,n=e.type,r=e.handleClick,i=a?Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("div",{className:"close-button",children:Object(m.jsx)("div",{className:"close-x",onClick:function(e){return r()},children:Object(m.jsx)("img",{src:A,alt:"",height:"20px",style:{margin:"-10px 0px"}})})}),Object(m.jsxs)("div",{style:{padding:"30px"},children:[Object(m.jsx)("h4",{children:a}),t]})]}):Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("div",{className:"close-button",children:Object(m.jsx)("div",{className:"close-x",onClick:function(e){return r()},children:Object(m.jsx)("img",{src:A,alt:"",height:"20px",style:{margin:"-10px 0px"}})})}),Object(m.jsx)("div",{style:{padding:"30px"},children:t})]});return Object(m.jsx)("div",{className:"notification-container",children:Object(m.jsx)(b,{className:"success"===n?"notification-card green":"error"===n?"notification-card red":"notification-card",content:i,style:{padding:"50px",fontWeight:"500"}})})};var S=function(e){var a=e.formFields,t=e.formSubmission,r=g.general,i=r.successTitle,s=r.failureTitle,l=t.buttons,d=t.success,u=t.failure,b=t.idRoot,p=t.submitHelper,f={},h={idRoot:null,closed:!1},j=Object(n.useState)(!1),v=Object(c.a)(j,2),x=v[0],O=v[1],N={title:i,type:"success",text:d};for(var y in a){f[a[y].name]=""}var w=Object(C.a)({initialValues:f,onSubmit:function(e){var n=p(e);if(h.closed=!1,"failure"===n)N.type="error",N.title=s,N.text=u,O(!0);else{t.accountCreated=!0;var r=t.buttons.filter((function(e){return e.type="submit"}))[0],o=document.getElementById(b+"-"+r.name);r.hasOwnProperty("altDisplay")&&(o.innerHTML=r.altDisplay),N.type="success",N.title=i,N.text=d,O(!0)}for(var c in a){document.getElementById(a[c].name).value="",e[a[c].name]=""}setTimeout((function(){!1===h.closed&&h.idRoot===b&&O(!1)}),5e3)},validate:function(e){var t={};for(var n in a){var r,i=a[n],s=i.validation,c=Object(I.a)(s);try{for(c.s();!(r=c.n()).done;){var l=r.value,d=l.function,u=l.error,m=e[i.name];if(l.hasOwnProperty("args")){var b=l.args.reduce((function(e,a){return e.push(a.value),e}),[]);(b.length>1&&!1===d.apply(void 0,[m].concat(Object(o.a)(b)))||1===b.length&&!1===d(m,b[0]))&&(t[i.name]=u)}else!1===d(m)&&(t[i.name]=u)}}catch(p){c.e(p)}finally{c.f()}}return t}});return Object(m.jsxs)("form",{id:b,className:"form-formik",onSubmit:w.handleSubmit,children:[!0===x?Object(m.jsx)(k,{title:N.title,type:N.type,text:N.text,handleClick:function(){!1===h.closed&&O(!1),h.closed=!0,h.idRoot=b}}):null,a.map((function(e,a){return Object(m.jsxs)("div",{className:"input-container",children:[Object(m.jsx)("div",{className:"field-name",children:Object(m.jsx)("b",{children:e.display})}),Object(m.jsxs)("div",{className:"input-lockup",children:[Object(m.jsx)("input",{type:e.type,autoComplete:"off",id:e.name,name:e.name,onChange:w.handleChange,value:w.values[e.name],className:w.errors[e.name]&&w.values[e.name]?"input-visible-error":w.errors[e.name]?"input-error":w.values[e.name]?"input-visible-noerror":"input-noerror"}),w.errors[e.name]?Object(m.jsx)("div",{id:b+"-"+e.name+"Error",className:"error",children:w.errors[e.name]}):null]})]},a)})),Object(m.jsxs)("div",{className:"buttons",children:[Object(m.jsx)("div",{className:"button-buffer"}),l.map((function(e,a){return Object(m.jsx)("div",{className:"button-container",children:Object(m.jsx)("button",{id:b+"-"+e.name,className:Object.values(w.errors).every((function(e){return""===e}))&&Object.values(w.values).some((function(e){return""!==e}))?e.className:e.className+" disabled",type:e.type,children:e.dependency&&e.dependency()?e.altDisplay:e.display})},a)}))]})]})};var D=function(e){return e.formFields,e.formSubmission,Object(m.jsx)("div",{children:"React Final Form Goes Here"})};var F=function(e){return e.formFields,e.formSubmission,Object(m.jsx)("div",{children:"React Hook Form Goes Here"})};var M=function(e,a,t){var n;switch(e){default:n=Object(m.jsx)(S,{formFields:a,formSubmission:t});break;case"reactFinal":n=Object(m.jsx)(D,{formFields:a,formSubmission:t});break;case"reactHook":n=Object(m.jsx)(F,{formFields:a,formSubmission:t})}return n},B={hasInput:function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.length>a},isPositive:function(e){return-1===e.toString().search(/^-/)},isNumber:function(e){return e.toString().search(/^(\d{1,3}){0,1}(,\d\d\d){0,}((\.)((\d){0,2})){0,1}$/)>-1},hasTwoSigFigs:function(e){return-1===e.toString().search(/\.(\d){3,}/)},isLessThanBalance:function(e,a){return Number(e.replaceAll(",",""))<=a||-1===e.toString().search(/^(\d{1,3}){0,1}(,\d\d\d){0,}((\.)((\d){0,2})){0,1}$/)},emailFormat:function(e){return new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,"i").test(e)},passwordFormat:function(e){return new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{0,}$/,"i").test(e)}},L=B,P=function(e,a){var t=e.users;return null!==a?t.filter((function(e){return e.number===a}))[0]:t.length>0?t[0]:null};function H(e,a){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};e.forEach((function(n,r){n.validation.forEach((function(n,i){if(!n.hasOwnProperty("function")||!n.function){var s=n.functionName;n.function=a[s]}n.hasOwnProperty("args")&&n.args.forEach((function(a,n){t.hasOwnProperty(a.name)&&(e[r].validation[i].args[n].value=t[a.name])}))}))}))}var E=function(){var e=Object(n.useContext)(N),a=e.users,t=e.addUser,r=function(e){return e.length},i=Object(n.useContext)(w).logIn,s=Object(n.useContext)(y).form,o=Object(n.useContext)(p).language,c=x[o],l=c.pages.createAccount,d=l.header,u=l.card.cardMsg,g=l.id,f=c.forms.createAccount,h=f.formSubmission,j=f.formFields,v=Object(m.jsx)("p",{style:{padding:"20px 40px"},children:u});H(j,L),h.submitHelper=function(e){var n={name:e.name,email:e.email,password:e.password,transactions:[],balance:0,number:r(a)+1};return a.filter((function(a){return a.email===e.email})).length>0?"failure":(t(n),i(n.number),"success")};var O=M(s,j,h);return Object(m.jsx)(b,{id:g,header:d,content:v,form:O})},T=t(22);var V=function(){var e=Object(n.useContext)(N),a=Object(n.useContext)(w).loggedInUser,t=a?P(e,a).balance:0,r=Object(n.useState)(t),i=Object(c.a)(r,2),s=i[0],o=i[1],l=Object(n.useContext)(y).form,d=Object(n.useContext)(p).language,u=x[d],g=u.pages.deposit,f=g.header,h=g.card,j=h.cardMsg,v=h.balanceMsg,O=g.id,I=g.valueIfNotLoggedIn,C=u.forms.deposit,A=C.formSubmission,k=C.formFields,S=Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("p",{style:{padding:"20px 40px"},children:j}),Object(m.jsxs)("h4",{style:{textAlign:"right",padding:"0px 40px"},children:[v,s.toFixed(2)]})]});H(k,L),A.submitHelper=function(t){if(null===a)return"failure";var n=s+Number(t.deposit.replace(",",""));return isNaN(n)?"failure":(o(n),P(e,a).balance=n,P(e,a).transactions.push({time:Object(T.now)(),credit:Number(t.deposit.replace(",","")),debit:null,description:A.typeOfAction,newBalance:s+Number(Number(t.deposit.replace(",","")).toFixed(2))}),"success")};var D=M(l,k,A);return Object(m.jsx)(m.Fragment,{children:a?Object(m.jsx)(b,{id:O,header:f,content:S,form:D}):Object(m.jsx)(b,{id:O,header:f,content:I,form:""})})};var R=function(){var e=Object(n.useContext)(N),a=Object(n.useContext)(w).loggedInUser,t=a?P(e,a).balance:0,r=Object(n.useState)(t),i=Object(c.a)(r,2),s=i[0],o=i[1],l=Object(n.useContext)(y).form,d=Object(n.useContext)(p).language,u=x[d],g=u.pages.withdraw,f=g.header,h=g.card,j=h.cardMsg,v=h.balanceMsg,O=g.id,I=g.valueIfNoData,C=g.valueIfNotLoggedIn,A=u.forms.withdraw,k=A.formSubmission,S=A.formFields,D=Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("p",{style:{padding:"20px 40px"},children:j}),Object(m.jsxs)("h4",{style:{textAlign:"right",padding:"0px 40px"},children:[v,s.toFixed(2)]})]});H(S,L,{balance:s}),k.submitHelper=function(t){if(""===a)return"failure";var n=s-Number(t.withdraw.replace(",",""));return isNaN(n)?"failure":(o(n),P(e,a).balance=n,P(e,a).transactions.push({time:Object(T.now)(),credit:null,debit:Number(t.withdraw.replace(",","")),description:k.typeOfAction,newBalance:s-Number(Number(t.withdraw.replace(",","")).toFixed(2))}),"success")};var F=M(l,S,k);return Object(m.jsx)(m.Fragment,{children:""!==a&&s>0?Object(m.jsx)(b,{id:O,header:f,content:D,form:F}):""!==a?Object(m.jsx)(b,{id:O,header:f,content:Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("p",{children:I}),Object(m.jsxs)("h4",{children:[v,s.toFixed(2)]})]}),form:""}):Object(m.jsx)(b,{id:O,header:f,content:Object(m.jsx)("p",{children:C}),form:""})})};t(51);function $(e){var a=e.data,t=new Date(a.time);return Object(m.jsxs)("div",{className:"data-grid-row",children:[Object(m.jsx)("div",{className:"align-left",children:t.toLocaleDateString()}),Object(m.jsx)("div",{className:"data-grid-description align-left",children:a.description}),null!==a.credit?Object(m.jsxs)("div",{className:"align-right",children:["$",a.credit.toFixed(2)]}):Object(m.jsx)("div",{}),null!==a.debit?Object(m.jsxs)("div",{className:"align-right",children:["-$",a.debit.toFixed(2)]}):Object(m.jsx)("div",{}),Object(m.jsxs)("div",{className:"align-right",children:["$",a.newBalance.toFixed(2)]})]})}var Y=function(){var e=Object(n.useContext)(N),a=Object(n.useContext)(w).loggedInUser,t=Object(n.useContext)(p).language,r=x[t],i=P(e,a)?P(e,a).transactions:[],s=r.pages.allData,o=s.header,c=s.card.cardCols,l=s.id,d=s.valueIfNoData,u=s.valueIfNotLoggedIn,g=Object(m.jsxs)("div",{className:"data-grid-header-row",children:[Object(m.jsx)("div",{className:"align-left",children:Object(m.jsx)("b",{children:c[0]})}),Object(m.jsx)("div",{className:"data-grid-description align-left",children:Object(m.jsx)("b",{children:c[1]})}),Object(m.jsx)("div",{className:"align-right",children:Object(m.jsx)("b",{children:c[2]})}),Object(m.jsx)("div",{className:"align-right",children:Object(m.jsx)("b",{children:c[3]})}),Object(m.jsx)("div",{className:"align-right",children:Object(m.jsx)("b",{children:c[4]})})]}),f=Object(m.jsxs)("div",{className:"data-grid",children:[g,i.reverse().map((function(e,a){return Object(m.jsx)($,{data:e},a)}))]});return Object(m.jsx)(m.Fragment,{children:""!==a&&i.length>0?Object(m.jsx)(b,{id:l,header:o,content:f,form:""}):""!==a?Object(m.jsx)(b,{id:l,header:o,content:u||f,form:""}):Object(m.jsx)(b,{id:l,header:o,content:d||f,form:""})})},U=t(35);t(54);var _=function(){var e=Object(n.useContext)(p).language,a=x[e],t=Object.keys(a.pages).map((function(e){var t=a.pages[e];return{pageKey:e,id:t.id.replace("-page","-link"),dataFor:t.id.replace("-page","-link-tooltip"),toolTip:t["nav-tool-tip"],navButton:t["nav-button"],navRoute:t["nav-route"]}})),r=window.location.hash,i={home:"#/"===r?" active":"",createAccount:"#/create-account/"===r?" active":"",deposit:"#/deposit/"===r?" active":"",withdraw:"#/withdraw/"===r?" active":"",allData:"#/all-data/"===r?" active":""};return Object(m.jsxs)("nav",{className:"navbar navbar-expand-sm navbar-dark responsive-nav",style:{backgroundColor:"#c41230",fontWeight:"500"},children:[Object(m.jsxs)("div",{className:"container-fluid",style:{justifyContent:"left"},children:[Object(m.jsx)("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent2","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(m.jsx)("span",{className:"navbar-toggler-icon"})}),Object(m.jsx)("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent2",children:Object(m.jsx)("ul",{id:"app-navigation",className:"navbar-nav me-auto mb-2 mb-lg-0 justify-content-center",style:{boxSizing:"border-box",marginTop:"4px",width:"100%"},children:t.map((function(e,a){return Object(m.jsx)("li",{id:e.id,style:{padding:"0px 20px"},onClick:function(e){return function(e){var a=e.currentTarget.getElementsByClassName("nav-link")[0];Array.from(document.getElementsByClassName("active")).forEach((function(e){return e.classList.remove("active")})),a.classList.add("active")}(e)},className:"nav-item","data-for":e.dataFor,"data-iscapture":"true","data-tip":e.toolTip,children:Object(m.jsx)(l.b,{to:e.navRoute,className:"nav-link"+i[e.pageKey],children:e.navButton})},a)}))})})]}),t.map((function(e,a){return Object(m.jsx)(U.a,{id:e.dataFor,place:"bottom",type:"dark",effect:"solid",multiline:!0},a)}))]})},W=t.p+"static/media/logo.3d10f139.svg";t(58);var z=function(){var e=Object(n.useContext)(N),a=Object(n.useContext)(w),t=a.loggedInUser,r=a.logIn,i=a.logOut,s=Object(n.useContext)(p),o=s.language,c=s.changeLanguage,d=x[o].general,u=d.signOut,b=d.signIn;return Object(m.jsxs)("div",{style:{padding:"10px",fontSize:"0.8rem",height:"auto",margin:"auto 0px",display:"flex",flexWrap:"nowrap",alignItems:"center"},children:[""!==t?Object(m.jsx)("div",{className:"login-name",children:function(e,a){return e.users.filter((function(e){return e.number===a}))[0]}(e,t).name}):null,Object(m.jsx)("div",{className:"login-link",onClick:""!==t?function(){""!==t&&i()}:e.users.length>0?function(){if(""===t&&e.users.length>0){var a=e.users[e.users.length-1].number;r(a)}else console.log("error!! no user exists to log in")}:function(){var e=document.getElementById("create-account-link").getElementsByClassName("nav-link")[0];Array.from(document.getElementsByClassName("active")).forEach((function(e){return e.classList.remove("active")})),e.classList.add("active")},children:""!==t?u:e.users.length>0?b:Object(m.jsx)(l.b,{style:{textDecoration:"none",color:"black",fontSize:"inherit"},to:"/create-account/",children:b})}),Object(m.jsx)("div",{className:"language-toggle-container",children:Object(m.jsxs)("select",{id:"language-toggler",className:"language-toggle",defaultValue:o,onChange:function(e){var a=document.getElementById("language-toggler"),t=a.options[a.selectedIndex].value;o!==t&&c(t)},tabIndex:"0",children:[Object(m.jsx)("option",{value:"en",children:"English"}),Object(m.jsx)("option",{value:"es",children:"Spanish"})]})})]})};t(59);var Z=function(){var e=Object(n.useContext)(p).language,a=x[e].components.footer.links;return Object(m.jsxs)("div",{className:"footer-container",children:[Object(m.jsx)("div",{className:"footer-links",children:a.map((function(e,a){return 0===a?Object(m.jsx)("div",{className:"fake-link",children:e}):Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("div",{className:"divider"}),Object(m.jsx)("div",{className:"fake-link",children:e})]})}))}),Object(m.jsx)("div",{className:"footer-social",children:Object(m.jsx)("div",{id:"globalSocialModule",children:Object(m.jsxs)("div",{class:"social",children:[Object(m.jsx)("h5",{class:"social-header",children:"Connect with us"}),Object(m.jsx)("a",{href:"#globalSocialModule",id:"social_follow_facebook_link",class:"social-network",children:Object(m.jsx)("svg",{focusable:"false",xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 30 30",children:Object(m.jsxs)("g",{children:[Object(m.jsx)("path",{d:"M28.345,0H1.656A1.656,1.656,0,0,0,0,1.656V28.344A1.655,1.655,0,0,0,1.656,30H28.345A1.655,1.655,0,0,0,30,28.344V1.656A1.656,1.656,0,0,0,28.345,0",fill:"#fff"}),Object(m.jsx)("path",{d:"M24.6,18.383l0.584-4.527H20.7V10.965c0-1.311.364-2.205,2.244-2.205h2.4V4.709a32.181,32.181,0,0,0-3.492-.178c-3.457,0-5.824,2.109-5.824,5.984v3.34H12.115v4.527h3.908V30H20.7V18.383h3.9Z",fill:"#012169"})]})})}),Object(m.jsx)("a",{href:"#globalSocialModule",id:"social_follow_instagram_link",class:"social-network",children:Object(m.jsx)("svg",{focusable:"false",xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 30 30",children:Object(m.jsx)("path",{d:"M26.539,12.69H23.927a9.23,9.23,0,1,1-17.854,0H3.461v12.7a1.154,1.154,0,0,0,1.154,1.152H25.384a1.154,1.154,0,0,0,1.155-1.152V12.69Zm0-8.075a1.153,1.153,0,0,0-1.155-1.153H21.923A1.153,1.153,0,0,0,20.77,4.614V8.076A1.154,1.154,0,0,0,21.923,9.23h3.461a1.154,1.154,0,0,0,1.155-1.153V4.614ZM15,9.23A5.77,5.77,0,1,0,20.77,15,5.769,5.769,0,0,0,15,9.23M26.539,30H3.461A3.462,3.462,0,0,1,0,26.537V3.461A3.461,3.461,0,0,1,3.461,0H26.539A3.461,3.461,0,0,1,30,3.461V26.537A3.462,3.462,0,0,1,26.539,30",fill:"#fff","fill-rule":"evenodd"})})}),Object(m.jsx)("a",{href:"#globalSocialModule",id:"social_follow_linkedin_link",class:"social-network",children:Object(m.jsx)("svg",{focusable:"false",xmlns:"http://www.w3.org/2000/svg",width:"30.001",height:"30",viewBox:"0 0 30.001 30",children:Object(m.jsxs)("g",{children:[Object(m.jsx)("path",{d:"M27.781,0H2.215A2.188,2.188,0,0,0,0,2.16V27.836A2.191,2.191,0,0,0,2.215,30H27.781A2.2,2.2,0,0,0,30,27.836V2.16A2.192,2.192,0,0,0,27.781,0Z",fill:"#fff"}),Object(m.jsx)("path",{d:"M4.448,11.246H8.9V25.563H4.448V11.246ZM6.674,4.129a2.58,2.58,0,1,1-2.58,2.58,2.58,2.58,0,0,1,2.58-2.58",fill:"#012169"}),Object(m.jsx)("path",{d:"M11.689,11.246h4.268V13.2h0.06a4.681,4.681,0,0,1,4.21-2.311c4.506,0,5.338,2.965,5.338,6.82v7.852H21.118V18.6c0-1.658-.031-3.795-2.314-3.795-2.314,0-2.669,1.809-2.669,3.676v7.082H11.689V11.246Z",fill:"#012169"})]})})}),Object(m.jsx)("a",{href:"#globalSocialModule",id:"social_follow_twitter_link",class:"social-network",children:Object(m.jsx)("svg",{focusable:"false",xmlns:"http://www.w3.org/2000/svg",width:"36.914",height:"30",viewBox:"0 0 36.914 30",children:Object(m.jsx)("path",{d:"M36.914,3.551a15.169,15.169,0,0,1-4.35,1.193A7.6,7.6,0,0,0,35.9.553a15.187,15.187,0,0,1-4.811,1.838A7.582,7.582,0,0,0,18.18,9.3,21.5,21.5,0,0,1,2.57,1.387,7.579,7.579,0,0,0,4.914,11.5a7.542,7.542,0,0,1-3.432-.946v0.095A7.577,7.577,0,0,0,7.559,18.07a7.621,7.621,0,0,1-3.422.131,7.587,7.587,0,0,0,7.076,5.26,15.194,15.194,0,0,1-9.4,3.241A15.57,15.57,0,0,1,0,26.6,21.439,21.439,0,0,0,11.609,30c13.93,0,21.549-11.541,21.549-21.549q0-.492-0.023-0.981A15.394,15.394,0,0,0,36.914,3.551Z",fill:"#fff"})})})]})})}),Object(m.jsxs)("div",{className:"footer-copyright",children:[Object(m.jsx)("p",{class:"legal-text",children:"Bad Bank of America, N.A. Member FDIC."}),Object(m.jsxs)("p",{class:"legal-text",children:["\xa9\xa0",Object(m.jsx)("span",{id:"dynamic-copyright-year-update",children:"2021"}),"\xa0Bad Bank of America Corporation. ",Object(m.jsx)("span",{children:"All rights reserved."})]})]})]})};var J=function(){var e=Object(n.useState)(""),a=Object(c.a)(e,2),t=a[0],r=a[1],i=Object(n.useState)("en"),s=Object(c.a)(i,2),u=s[0],b=s[1],g=Object(n.useState)([]),f=Object(c.a)(g,2),h=f[0],j=f[1];return Object(m.jsx)(m.Fragment,{children:Object(m.jsx)(l.a,{children:Object(m.jsx)(N.Provider,{value:{users:h,addUser:function(e){var a=Object(o.a)(h);a.push(e),j(a)}},children:Object(m.jsx)(w.Provider,{value:{loggedInUser:t,logOut:function(){r("")},logIn:function(e){r(e)}},children:Object(m.jsx)(p.Provider,{value:{language:u,changeLanguage:function(e){b(e)}},children:Object(m.jsxs)("div",{className:"App",children:[Object(m.jsx)("div",{className:"brand-div",children:Object(m.jsx)("img",{alt:"",src:W,className:"brand-image"})}),Object(m.jsx)("div",{className:"login-widget",children:Object(m.jsx)(z,{loggedInUser:t,setLoggedInUser:r})}),Object(m.jsx)(_,{}),Object(m.jsx)("div",{className:"container",style:{padding:"20px"},children:Object(m.jsxs)(y.Provider,{value:{form:"formik"},children:[Object(m.jsx)(d.a,{path:"/",exact:!0,component:O}),Object(m.jsx)(d.a,{path:"/create-account/",exact:!0,component:E}),Object(m.jsx)(d.a,{path:"/deposit/",exact:!0,component:V}),Object(m.jsx)(d.a,{path:"/withdraw/",exact:!0,component:R}),Object(m.jsx)(d.a,{path:"/all-data/",exact:!0,component:Y})]})}),Object(m.jsx)(Z,{})]})})})})})})},q=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,63)).then((function(a){var t=a.getCLS,n=a.getFID,r=a.getFCP,i=a.getLCP,s=a.getTTFB;t(e),n(e),r(e),i(e),s(e)}))};s.a.render(Object(m.jsx)(r.a.StrictMode,{children:Object(m.jsx)(J,{})}),document.getElementById("root")),q()}},[[60,1,2]]]);
//# sourceMappingURL=main.d7f646bc.chunk.js.map