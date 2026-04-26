function Gu(n,e){for(var t=0;t<e.length;t++){const s=e[t];if(typeof s!="string"&&!Array.isArray(s)){for(const a in s)if(a!=="default"&&!(a in n)){const r=Object.getOwnPropertyDescriptor(s,a);r&&Object.defineProperty(n,a,r.get?r:{enumerable:!0,get:()=>s[a]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=t(a);fetch(a.href,r)}})();function Xu(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Co={exports:{}},da={},Eo={exports:{}},R={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rs=Symbol.for("react.element"),Ju=Symbol.for("react.portal"),Zu=Symbol.for("react.fragment"),np=Symbol.for("react.strict_mode"),ep=Symbol.for("react.profiler"),tp=Symbol.for("react.provider"),sp=Symbol.for("react.context"),ap=Symbol.for("react.forward_ref"),rp=Symbol.for("react.suspense"),lp=Symbol.for("react.memo"),ip=Symbol.for("react.lazy"),si=Symbol.iterator;function op(n){return n===null||typeof n!="object"?null:(n=si&&n[si]||n["@@iterator"],typeof n=="function"?n:null)}var Po={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},To=Object.assign,Lo={};function dt(n,e,t){this.props=n,this.context=e,this.refs=Lo,this.updater=t||Po}dt.prototype.isReactComponent={};dt.prototype.setState=function(n,e){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,n,e,"setState")};dt.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function Oo(){}Oo.prototype=dt.prototype;function tl(n,e,t){this.props=n,this.context=e,this.refs=Lo,this.updater=t||Po}var sl=tl.prototype=new Oo;sl.constructor=tl;To(sl,dt.prototype);sl.isPureReactComponent=!0;var ai=Array.isArray,No=Object.prototype.hasOwnProperty,al={current:null},zo={key:!0,ref:!0,__self:!0,__source:!0};function Ro(n,e,t){var s,a={},r=null,l=null;if(e!=null)for(s in e.ref!==void 0&&(l=e.ref),e.key!==void 0&&(r=""+e.key),e)No.call(e,s)&&!zo.hasOwnProperty(s)&&(a[s]=e[s]);var i=arguments.length-2;if(i===1)a.children=t;else if(1<i){for(var o=Array(i),c=0;c<i;c++)o[c]=arguments[c+2];a.children=o}if(n&&n.defaultProps)for(s in i=n.defaultProps,i)a[s]===void 0&&(a[s]=i[s]);return{$$typeof:rs,type:n,key:r,ref:l,props:a,_owner:al.current}}function cp(n,e){return{$$typeof:rs,type:n.type,key:e,ref:n.ref,props:n.props,_owner:n._owner}}function rl(n){return typeof n=="object"&&n!==null&&n.$$typeof===rs}function up(n){var e={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,function(t){return e[t]})}var ri=/\/+/g;function Ra(n,e){return typeof n=="object"&&n!==null&&n.key!=null?up(""+n.key):e.toString(36)}function Os(n,e,t,s,a){var r=typeof n;(r==="undefined"||r==="boolean")&&(n=null);var l=!1;if(n===null)l=!0;else switch(r){case"string":case"number":l=!0;break;case"object":switch(n.$$typeof){case rs:case Ju:l=!0}}if(l)return l=n,a=a(l),n=s===""?"."+Ra(l,0):s,ai(a)?(t="",n!=null&&(t=n.replace(ri,"$&/")+"/"),Os(a,e,t,"",function(c){return c})):a!=null&&(rl(a)&&(a=cp(a,t+(!a.key||l&&l.key===a.key?"":(""+a.key).replace(ri,"$&/")+"/")+n)),e.push(a)),1;if(l=0,s=s===""?".":s+":",ai(n))for(var i=0;i<n.length;i++){r=n[i];var o=s+Ra(r,i);l+=Os(r,e,t,o,a)}else if(o=op(n),typeof o=="function")for(n=o.call(n),i=0;!(r=n.next()).done;)r=r.value,o=s+Ra(r,i++),l+=Os(r,e,t,o,a);else if(r==="object")throw e=String(n),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return l}function ds(n,e,t){if(n==null)return n;var s=[],a=0;return Os(n,s,"","",function(r){return e.call(t,r,a++)}),s}function pp(n){if(n._status===-1){var e=n._result;e=e(),e.then(function(t){(n._status===0||n._status===-1)&&(n._status=1,n._result=t)},function(t){(n._status===0||n._status===-1)&&(n._status=2,n._result=t)}),n._status===-1&&(n._status=0,n._result=e)}if(n._status===1)return n._result.default;throw n._result}var un={current:null},Ns={transition:null},dp={ReactCurrentDispatcher:un,ReactCurrentBatchConfig:Ns,ReactCurrentOwner:al};function jo(){throw Error("act(...) is not supported in production builds of React.")}R.Children={map:ds,forEach:function(n,e,t){ds(n,function(){e.apply(this,arguments)},t)},count:function(n){var e=0;return ds(n,function(){e++}),e},toArray:function(n){return ds(n,function(e){return e})||[]},only:function(n){if(!rl(n))throw Error("React.Children.only expected to receive a single React element child.");return n}};R.Component=dt;R.Fragment=Zu;R.Profiler=ep;R.PureComponent=tl;R.StrictMode=np;R.Suspense=rp;R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=dp;R.act=jo;R.cloneElement=function(n,e,t){if(n==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+n+".");var s=To({},n.props),a=n.key,r=n.ref,l=n._owner;if(e!=null){if(e.ref!==void 0&&(r=e.ref,l=al.current),e.key!==void 0&&(a=""+e.key),n.type&&n.type.defaultProps)var i=n.type.defaultProps;for(o in e)No.call(e,o)&&!zo.hasOwnProperty(o)&&(s[o]=e[o]===void 0&&i!==void 0?i[o]:e[o])}var o=arguments.length-2;if(o===1)s.children=t;else if(1<o){i=Array(o);for(var c=0;c<o;c++)i[c]=arguments[c+2];s.children=i}return{$$typeof:rs,type:n.type,key:a,ref:r,props:s,_owner:l}};R.createContext=function(n){return n={$$typeof:sp,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},n.Provider={$$typeof:tp,_context:n},n.Consumer=n};R.createElement=Ro;R.createFactory=function(n){var e=Ro.bind(null,n);return e.type=n,e};R.createRef=function(){return{current:null}};R.forwardRef=function(n){return{$$typeof:ap,render:n}};R.isValidElement=rl;R.lazy=function(n){return{$$typeof:ip,_payload:{_status:-1,_result:n},_init:pp}};R.memo=function(n,e){return{$$typeof:lp,type:n,compare:e===void 0?null:e}};R.startTransition=function(n){var e=Ns.transition;Ns.transition={};try{n()}finally{Ns.transition=e}};R.unstable_act=jo;R.useCallback=function(n,e){return un.current.useCallback(n,e)};R.useContext=function(n){return un.current.useContext(n)};R.useDebugValue=function(){};R.useDeferredValue=function(n){return un.current.useDeferredValue(n)};R.useEffect=function(n,e){return un.current.useEffect(n,e)};R.useId=function(){return un.current.useId()};R.useImperativeHandle=function(n,e,t){return un.current.useImperativeHandle(n,e,t)};R.useInsertionEffect=function(n,e){return un.current.useInsertionEffect(n,e)};R.useLayoutEffect=function(n,e){return un.current.useLayoutEffect(n,e)};R.useMemo=function(n,e){return un.current.useMemo(n,e)};R.useReducer=function(n,e,t){return un.current.useReducer(n,e,t)};R.useRef=function(n){return un.current.useRef(n)};R.useState=function(n){return un.current.useState(n)};R.useSyncExternalStore=function(n,e,t){return un.current.useSyncExternalStore(n,e,t)};R.useTransition=function(){return un.current.useTransition()};R.version="18.3.1";Eo.exports=R;var x=Eo.exports;const fp=Xu(x),hp=Gu({__proto__:null,default:fp},[x]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mp=x,vp=Symbol.for("react.element"),yp=Symbol.for("react.fragment"),gp=Object.prototype.hasOwnProperty,wp=mp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,kp={key:!0,ref:!0,__self:!0,__source:!0};function Io(n,e,t){var s,a={},r=null,l=null;t!==void 0&&(r=""+t),e.key!==void 0&&(r=""+e.key),e.ref!==void 0&&(l=e.ref);for(s in e)gp.call(e,s)&&!kp.hasOwnProperty(s)&&(a[s]=e[s]);if(n&&n.defaultProps)for(s in e=n.defaultProps,e)a[s]===void 0&&(a[s]=e[s]);return{$$typeof:vp,type:n,key:r,ref:l,props:a,_owner:wp.current}}da.Fragment=yp;da.jsx=Io;da.jsxs=Io;Co.exports=da;var O=Co.exports,Mo={exports:{}},xn={},Do={exports:{}},bo={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(n){function e(E,N){var z=E.length;E.push(N);n:for(;0<z;){var V=z-1>>>1,X=E[V];if(0<a(X,N))E[V]=N,E[z]=X,z=V;else break n}}function t(E){return E.length===0?null:E[0]}function s(E){if(E.length===0)return null;var N=E[0],z=E.pop();if(z!==N){E[0]=z;n:for(var V=0,X=E.length,us=X>>>1;V<us;){var _e=2*(V+1)-1,za=E[_e],Ce=_e+1,ps=E[Ce];if(0>a(za,z))Ce<X&&0>a(ps,za)?(E[V]=ps,E[Ce]=z,V=Ce):(E[V]=za,E[_e]=z,V=_e);else if(Ce<X&&0>a(ps,z))E[V]=ps,E[Ce]=z,V=Ce;else break n}}return N}function a(E,N){var z=E.sortIndex-N.sortIndex;return z!==0?z:E.id-N.id}if(typeof performance=="object"&&typeof performance.now=="function"){var r=performance;n.unstable_now=function(){return r.now()}}else{var l=Date,i=l.now();n.unstable_now=function(){return l.now()-i}}var o=[],c=[],m=1,d=null,h=3,y=!1,w=!1,g=!1,_=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function f(E){for(var N=t(c);N!==null;){if(N.callback===null)s(c);else if(N.startTime<=E)s(c),N.sortIndex=N.expirationTime,e(o,N);else break;N=t(c)}}function v(E){if(g=!1,f(E),!w)if(t(o)!==null)w=!0,Oa(S);else{var N=t(c);N!==null&&Na(v,N.startTime-E)}}function S(E,N){w=!1,g&&(g=!1,p(L),L=-1),y=!0;var z=h;try{for(f(N),d=t(o);d!==null&&(!(d.expirationTime>N)||E&&!On());){var V=d.callback;if(typeof V=="function"){d.callback=null,h=d.priorityLevel;var X=V(d.expirationTime<=N);N=n.unstable_now(),typeof X=="function"?d.callback=X:d===t(o)&&s(o),f(N)}else s(o);d=t(o)}if(d!==null)var us=!0;else{var _e=t(c);_e!==null&&Na(v,_e.startTime-N),us=!1}return us}finally{d=null,h=z,y=!1}}var P=!1,T=null,L=-1,$=5,j=-1;function On(){return!(n.unstable_now()-j<$)}function yt(){if(T!==null){var E=n.unstable_now();j=E;var N=!0;try{N=T(!0,E)}finally{N?gt():(P=!1,T=null)}}else P=!1}var gt;if(typeof u=="function")gt=function(){u(yt)};else if(typeof MessageChannel<"u"){var ti=new MessageChannel,Yu=ti.port2;ti.port1.onmessage=yt,gt=function(){Yu.postMessage(null)}}else gt=function(){_(yt,0)};function Oa(E){T=E,P||(P=!0,gt())}function Na(E,N){L=_(function(){E(n.unstable_now())},N)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(E){E.callback=null},n.unstable_continueExecution=function(){w||y||(w=!0,Oa(S))},n.unstable_forceFrameRate=function(E){0>E||125<E?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):$=0<E?Math.floor(1e3/E):5},n.unstable_getCurrentPriorityLevel=function(){return h},n.unstable_getFirstCallbackNode=function(){return t(o)},n.unstable_next=function(E){switch(h){case 1:case 2:case 3:var N=3;break;default:N=h}var z=h;h=N;try{return E()}finally{h=z}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(E,N){switch(E){case 1:case 2:case 3:case 4:case 5:break;default:E=3}var z=h;h=E;try{return N()}finally{h=z}},n.unstable_scheduleCallback=function(E,N,z){var V=n.unstable_now();switch(typeof z=="object"&&z!==null?(z=z.delay,z=typeof z=="number"&&0<z?V+z:V):z=V,E){case 1:var X=-1;break;case 2:X=250;break;case 5:X=1073741823;break;case 4:X=1e4;break;default:X=5e3}return X=z+X,E={id:m++,callback:N,priorityLevel:E,startTime:z,expirationTime:X,sortIndex:-1},z>V?(E.sortIndex=z,e(c,E),t(o)===null&&E===t(c)&&(g?(p(L),L=-1):g=!0,Na(v,z-V))):(E.sortIndex=X,e(o,E),w||y||(w=!0,Oa(S))),E},n.unstable_shouldYield=On,n.unstable_wrapCallback=function(E){var N=h;return function(){var z=h;h=N;try{return E.apply(this,arguments)}finally{h=z}}}})(bo);Do.exports=bo;var xp=Do.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sp=x,kn=xp;function k(n){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+n,t=1;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Fo=new Set,At={};function Fe(n,e){rt(n,e),rt(n+"Capture",e)}function rt(n,e){for(At[n]=e,n=0;n<e.length;n++)Fo.add(e[n])}var qn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ir=Object.prototype.hasOwnProperty,_p=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,li={},ii={};function Cp(n){return ir.call(ii,n)?!0:ir.call(li,n)?!1:_p.test(n)?ii[n]=!0:(li[n]=!0,!1)}function Ep(n,e,t,s){if(t!==null&&t.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return s?!1:t!==null?!t.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function Pp(n,e,t,s){if(e===null||typeof e>"u"||Ep(n,e,t,s))return!0;if(s)return!1;if(t!==null)switch(t.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function pn(n,e,t,s,a,r,l){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=s,this.attributeNamespace=a,this.mustUseProperty=t,this.propertyName=n,this.type=e,this.sanitizeURL=r,this.removeEmptyString=l}var tn={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){tn[n]=new pn(n,0,!1,n,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var e=n[0];tn[e]=new pn(e,1,!1,n[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(n){tn[n]=new pn(n,2,!1,n.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){tn[n]=new pn(n,2,!1,n,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){tn[n]=new pn(n,3,!1,n.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(n){tn[n]=new pn(n,3,!0,n,null,!1,!1)});["capture","download"].forEach(function(n){tn[n]=new pn(n,4,!1,n,null,!1,!1)});["cols","rows","size","span"].forEach(function(n){tn[n]=new pn(n,6,!1,n,null,!1,!1)});["rowSpan","start"].forEach(function(n){tn[n]=new pn(n,5,!1,n.toLowerCase(),null,!1,!1)});var ll=/[\-:]([a-z])/g;function il(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var e=n.replace(ll,il);tn[e]=new pn(e,1,!1,n,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var e=n.replace(ll,il);tn[e]=new pn(e,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(n){var e=n.replace(ll,il);tn[e]=new pn(e,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(n){tn[n]=new pn(n,1,!1,n.toLowerCase(),null,!1,!1)});tn.xlinkHref=new pn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(n){tn[n]=new pn(n,1,!1,n.toLowerCase(),null,!0,!0)});function ol(n,e,t,s){var a=tn.hasOwnProperty(e)?tn[e]:null;(a!==null?a.type!==0:s||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Pp(e,t,a,s)&&(t=null),s||a===null?Cp(e)&&(t===null?n.removeAttribute(e):n.setAttribute(e,""+t)):a.mustUseProperty?n[a.propertyName]=t===null?a.type===3?!1:"":t:(e=a.attributeName,s=a.attributeNamespace,t===null?n.removeAttribute(e):(a=a.type,t=a===3||a===4&&t===!0?"":""+t,s?n.setAttributeNS(s,e,t):n.setAttribute(e,t))))}var Xn=Sp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,fs=Symbol.for("react.element"),Be=Symbol.for("react.portal"),We=Symbol.for("react.fragment"),cl=Symbol.for("react.strict_mode"),or=Symbol.for("react.profiler"),Uo=Symbol.for("react.provider"),Ao=Symbol.for("react.context"),ul=Symbol.for("react.forward_ref"),cr=Symbol.for("react.suspense"),ur=Symbol.for("react.suspense_list"),pl=Symbol.for("react.memo"),ne=Symbol.for("react.lazy"),Bo=Symbol.for("react.offscreen"),oi=Symbol.iterator;function wt(n){return n===null||typeof n!="object"?null:(n=oi&&n[oi]||n["@@iterator"],typeof n=="function"?n:null)}var W=Object.assign,ja;function Tt(n){if(ja===void 0)try{throw Error()}catch(t){var e=t.stack.trim().match(/\n( *(at )?)/);ja=e&&e[1]||""}return`
`+ja+n}var Ia=!1;function Ma(n,e){if(!n||Ia)return"";Ia=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var s=c}Reflect.construct(n,[],e)}else{try{e.call()}catch(c){s=c}n.call(e.prototype)}else{try{throw Error()}catch(c){s=c}n()}}catch(c){if(c&&s&&typeof c.stack=="string"){for(var a=c.stack.split(`
`),r=s.stack.split(`
`),l=a.length-1,i=r.length-1;1<=l&&0<=i&&a[l]!==r[i];)i--;for(;1<=l&&0<=i;l--,i--)if(a[l]!==r[i]){if(l!==1||i!==1)do if(l--,i--,0>i||a[l]!==r[i]){var o=`
`+a[l].replace(" at new "," at ");return n.displayName&&o.includes("<anonymous>")&&(o=o.replace("<anonymous>",n.displayName)),o}while(1<=l&&0<=i);break}}}finally{Ia=!1,Error.prepareStackTrace=t}return(n=n?n.displayName||n.name:"")?Tt(n):""}function Tp(n){switch(n.tag){case 5:return Tt(n.type);case 16:return Tt("Lazy");case 13:return Tt("Suspense");case 19:return Tt("SuspenseList");case 0:case 2:case 15:return n=Ma(n.type,!1),n;case 11:return n=Ma(n.type.render,!1),n;case 1:return n=Ma(n.type,!0),n;default:return""}}function pr(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case We:return"Fragment";case Be:return"Portal";case or:return"Profiler";case cl:return"StrictMode";case cr:return"Suspense";case ur:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case Ao:return(n.displayName||"Context")+".Consumer";case Uo:return(n._context.displayName||"Context")+".Provider";case ul:var e=n.render;return n=n.displayName,n||(n=e.displayName||e.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case pl:return e=n.displayName||null,e!==null?e:pr(n.type)||"Memo";case ne:e=n._payload,n=n._init;try{return pr(n(e))}catch{}}return null}function Lp(n){var e=n.type;switch(n.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=e.render,n=n.displayName||n.name||"",e.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return pr(e);case 8:return e===cl?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function ve(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function Wo(n){var e=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Op(n){var e=Wo(n)?"checked":"value",t=Object.getOwnPropertyDescriptor(n.constructor.prototype,e),s=""+n[e];if(!n.hasOwnProperty(e)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var a=t.get,r=t.set;return Object.defineProperty(n,e,{configurable:!0,get:function(){return a.call(this)},set:function(l){s=""+l,r.call(this,l)}}),Object.defineProperty(n,e,{enumerable:t.enumerable}),{getValue:function(){return s},setValue:function(l){s=""+l},stopTracking:function(){n._valueTracker=null,delete n[e]}}}}function hs(n){n._valueTracker||(n._valueTracker=Op(n))}function Ho(n){if(!n)return!1;var e=n._valueTracker;if(!e)return!0;var t=e.getValue(),s="";return n&&(s=Wo(n)?n.checked?"true":"false":n.value),n=s,n!==t?(e.setValue(n),!0):!1}function Bs(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function dr(n,e){var t=e.checked;return W({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??n._wrapperState.initialChecked})}function ci(n,e){var t=e.defaultValue==null?"":e.defaultValue,s=e.checked!=null?e.checked:e.defaultChecked;t=ve(e.value!=null?e.value:t),n._wrapperState={initialChecked:s,initialValue:t,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function $o(n,e){e=e.checked,e!=null&&ol(n,"checked",e,!1)}function fr(n,e){$o(n,e);var t=ve(e.value),s=e.type;if(t!=null)s==="number"?(t===0&&n.value===""||n.value!=t)&&(n.value=""+t):n.value!==""+t&&(n.value=""+t);else if(s==="submit"||s==="reset"){n.removeAttribute("value");return}e.hasOwnProperty("value")?hr(n,e.type,t):e.hasOwnProperty("defaultValue")&&hr(n,e.type,ve(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(n.defaultChecked=!!e.defaultChecked)}function ui(n,e,t){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var s=e.type;if(!(s!=="submit"&&s!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+n._wrapperState.initialValue,t||e===n.value||(n.value=e),n.defaultValue=e}t=n.name,t!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,t!==""&&(n.name=t)}function hr(n,e,t){(e!=="number"||Bs(n.ownerDocument)!==n)&&(t==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+t&&(n.defaultValue=""+t))}var Lt=Array.isArray;function Ze(n,e,t,s){if(n=n.options,e){e={};for(var a=0;a<t.length;a++)e["$"+t[a]]=!0;for(t=0;t<n.length;t++)a=e.hasOwnProperty("$"+n[t].value),n[t].selected!==a&&(n[t].selected=a),a&&s&&(n[t].defaultSelected=!0)}else{for(t=""+ve(t),e=null,a=0;a<n.length;a++){if(n[a].value===t){n[a].selected=!0,s&&(n[a].defaultSelected=!0);return}e!==null||n[a].disabled||(e=n[a])}e!==null&&(e.selected=!0)}}function mr(n,e){if(e.dangerouslySetInnerHTML!=null)throw Error(k(91));return W({},e,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function pi(n,e){var t=e.value;if(t==null){if(t=e.children,e=e.defaultValue,t!=null){if(e!=null)throw Error(k(92));if(Lt(t)){if(1<t.length)throw Error(k(93));t=t[0]}e=t}e==null&&(e=""),t=e}n._wrapperState={initialValue:ve(t)}}function Vo(n,e){var t=ve(e.value),s=ve(e.defaultValue);t!=null&&(t=""+t,t!==n.value&&(n.value=t),e.defaultValue==null&&n.defaultValue!==t&&(n.defaultValue=t)),s!=null&&(n.defaultValue=""+s)}function di(n){var e=n.textContent;e===n._wrapperState.initialValue&&e!==""&&e!==null&&(n.value=e)}function Qo(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function vr(n,e){return n==null||n==="http://www.w3.org/1999/xhtml"?Qo(e):n==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var ms,qo=function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,t,s,a){MSApp.execUnsafeLocalFunction(function(){return n(e,t,s,a)})}:n}(function(n,e){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=e;else{for(ms=ms||document.createElement("div"),ms.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=ms.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;e.firstChild;)n.appendChild(e.firstChild)}});function Bt(n,e){if(e){var t=n.firstChild;if(t&&t===n.lastChild&&t.nodeType===3){t.nodeValue=e;return}}n.textContent=e}var zt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Np=["Webkit","ms","Moz","O"];Object.keys(zt).forEach(function(n){Np.forEach(function(e){e=e+n.charAt(0).toUpperCase()+n.substring(1),zt[e]=zt[n]})});function Ko(n,e,t){return e==null||typeof e=="boolean"||e===""?"":t||typeof e!="number"||e===0||zt.hasOwnProperty(n)&&zt[n]?(""+e).trim():e+"px"}function Yo(n,e){n=n.style;for(var t in e)if(e.hasOwnProperty(t)){var s=t.indexOf("--")===0,a=Ko(t,e[t],s);t==="float"&&(t="cssFloat"),s?n.setProperty(t,a):n[t]=a}}var zp=W({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function yr(n,e){if(e){if(zp[n]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(k(137,n));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(k(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(k(61))}if(e.style!=null&&typeof e.style!="object")throw Error(k(62))}}function gr(n,e){if(n.indexOf("-")===-1)return typeof e.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var wr=null;function dl(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var kr=null,nt=null,et=null;function fi(n){if(n=os(n)){if(typeof kr!="function")throw Error(k(280));var e=n.stateNode;e&&(e=ya(e),kr(n.stateNode,n.type,e))}}function Go(n){nt?et?et.push(n):et=[n]:nt=n}function Xo(){if(nt){var n=nt,e=et;if(et=nt=null,fi(n),e)for(n=0;n<e.length;n++)fi(e[n])}}function Jo(n,e){return n(e)}function Zo(){}var Da=!1;function nc(n,e,t){if(Da)return n(e,t);Da=!0;try{return Jo(n,e,t)}finally{Da=!1,(nt!==null||et!==null)&&(Zo(),Xo())}}function Wt(n,e){var t=n.stateNode;if(t===null)return null;var s=ya(t);if(s===null)return null;t=s[e];n:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(n=n.type,s=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!s;break n;default:n=!1}if(n)return null;if(t&&typeof t!="function")throw Error(k(231,e,typeof t));return t}var xr=!1;if(qn)try{var kt={};Object.defineProperty(kt,"passive",{get:function(){xr=!0}}),window.addEventListener("test",kt,kt),window.removeEventListener("test",kt,kt)}catch{xr=!1}function Rp(n,e,t,s,a,r,l,i,o){var c=Array.prototype.slice.call(arguments,3);try{e.apply(t,c)}catch(m){this.onError(m)}}var Rt=!1,Ws=null,Hs=!1,Sr=null,jp={onError:function(n){Rt=!0,Ws=n}};function Ip(n,e,t,s,a,r,l,i,o){Rt=!1,Ws=null,Rp.apply(jp,arguments)}function Mp(n,e,t,s,a,r,l,i,o){if(Ip.apply(this,arguments),Rt){if(Rt){var c=Ws;Rt=!1,Ws=null}else throw Error(k(198));Hs||(Hs=!0,Sr=c)}}function Ue(n){var e=n,t=n;if(n.alternate)for(;e.return;)e=e.return;else{n=e;do e=n,e.flags&4098&&(t=e.return),n=e.return;while(n)}return e.tag===3?t:null}function ec(n){if(n.tag===13){var e=n.memoizedState;if(e===null&&(n=n.alternate,n!==null&&(e=n.memoizedState)),e!==null)return e.dehydrated}return null}function hi(n){if(Ue(n)!==n)throw Error(k(188))}function Dp(n){var e=n.alternate;if(!e){if(e=Ue(n),e===null)throw Error(k(188));return e!==n?null:n}for(var t=n,s=e;;){var a=t.return;if(a===null)break;var r=a.alternate;if(r===null){if(s=a.return,s!==null){t=s;continue}break}if(a.child===r.child){for(r=a.child;r;){if(r===t)return hi(a),n;if(r===s)return hi(a),e;r=r.sibling}throw Error(k(188))}if(t.return!==s.return)t=a,s=r;else{for(var l=!1,i=a.child;i;){if(i===t){l=!0,t=a,s=r;break}if(i===s){l=!0,s=a,t=r;break}i=i.sibling}if(!l){for(i=r.child;i;){if(i===t){l=!0,t=r,s=a;break}if(i===s){l=!0,s=r,t=a;break}i=i.sibling}if(!l)throw Error(k(189))}}if(t.alternate!==s)throw Error(k(190))}if(t.tag!==3)throw Error(k(188));return t.stateNode.current===t?n:e}function tc(n){return n=Dp(n),n!==null?sc(n):null}function sc(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var e=sc(n);if(e!==null)return e;n=n.sibling}return null}var ac=kn.unstable_scheduleCallback,mi=kn.unstable_cancelCallback,bp=kn.unstable_shouldYield,Fp=kn.unstable_requestPaint,Q=kn.unstable_now,Up=kn.unstable_getCurrentPriorityLevel,fl=kn.unstable_ImmediatePriority,rc=kn.unstable_UserBlockingPriority,$s=kn.unstable_NormalPriority,Ap=kn.unstable_LowPriority,lc=kn.unstable_IdlePriority,fa=null,An=null;function Bp(n){if(An&&typeof An.onCommitFiberRoot=="function")try{An.onCommitFiberRoot(fa,n,void 0,(n.current.flags&128)===128)}catch{}}var In=Math.clz32?Math.clz32:$p,Wp=Math.log,Hp=Math.LN2;function $p(n){return n>>>=0,n===0?32:31-(Wp(n)/Hp|0)|0}var vs=64,ys=4194304;function Ot(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function Vs(n,e){var t=n.pendingLanes;if(t===0)return 0;var s=0,a=n.suspendedLanes,r=n.pingedLanes,l=t&268435455;if(l!==0){var i=l&~a;i!==0?s=Ot(i):(r&=l,r!==0&&(s=Ot(r)))}else l=t&~a,l!==0?s=Ot(l):r!==0&&(s=Ot(r));if(s===0)return 0;if(e!==0&&e!==s&&!(e&a)&&(a=s&-s,r=e&-e,a>=r||a===16&&(r&4194240)!==0))return e;if(s&4&&(s|=t&16),e=n.entangledLanes,e!==0)for(n=n.entanglements,e&=s;0<e;)t=31-In(e),a=1<<t,s|=n[t],e&=~a;return s}function Vp(n,e){switch(n){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Qp(n,e){for(var t=n.suspendedLanes,s=n.pingedLanes,a=n.expirationTimes,r=n.pendingLanes;0<r;){var l=31-In(r),i=1<<l,o=a[l];o===-1?(!(i&t)||i&s)&&(a[l]=Vp(i,e)):o<=e&&(n.expiredLanes|=i),r&=~i}}function _r(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function ic(){var n=vs;return vs<<=1,!(vs&4194240)&&(vs=64),n}function ba(n){for(var e=[],t=0;31>t;t++)e.push(n);return e}function ls(n,e,t){n.pendingLanes|=e,e!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,e=31-In(e),n[e]=t}function qp(n,e){var t=n.pendingLanes&~e;n.pendingLanes=e,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=e,n.mutableReadLanes&=e,n.entangledLanes&=e,e=n.entanglements;var s=n.eventTimes;for(n=n.expirationTimes;0<t;){var a=31-In(t),r=1<<a;e[a]=0,s[a]=-1,n[a]=-1,t&=~r}}function hl(n,e){var t=n.entangledLanes|=e;for(n=n.entanglements;t;){var s=31-In(t),a=1<<s;a&e|n[s]&e&&(n[s]|=e),t&=~a}}var M=0;function oc(n){return n&=-n,1<n?4<n?n&268435455?16:536870912:4:1}var cc,ml,uc,pc,dc,Cr=!1,gs=[],ie=null,oe=null,ce=null,Ht=new Map,$t=new Map,te=[],Kp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function vi(n,e){switch(n){case"focusin":case"focusout":ie=null;break;case"dragenter":case"dragleave":oe=null;break;case"mouseover":case"mouseout":ce=null;break;case"pointerover":case"pointerout":Ht.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":$t.delete(e.pointerId)}}function xt(n,e,t,s,a,r){return n===null||n.nativeEvent!==r?(n={blockedOn:e,domEventName:t,eventSystemFlags:s,nativeEvent:r,targetContainers:[a]},e!==null&&(e=os(e),e!==null&&ml(e)),n):(n.eventSystemFlags|=s,e=n.targetContainers,a!==null&&e.indexOf(a)===-1&&e.push(a),n)}function Yp(n,e,t,s,a){switch(e){case"focusin":return ie=xt(ie,n,e,t,s,a),!0;case"dragenter":return oe=xt(oe,n,e,t,s,a),!0;case"mouseover":return ce=xt(ce,n,e,t,s,a),!0;case"pointerover":var r=a.pointerId;return Ht.set(r,xt(Ht.get(r)||null,n,e,t,s,a)),!0;case"gotpointercapture":return r=a.pointerId,$t.set(r,xt($t.get(r)||null,n,e,t,s,a)),!0}return!1}function fc(n){var e=Le(n.target);if(e!==null){var t=Ue(e);if(t!==null){if(e=t.tag,e===13){if(e=ec(t),e!==null){n.blockedOn=e,dc(n.priority,function(){uc(t)});return}}else if(e===3&&t.stateNode.current.memoizedState.isDehydrated){n.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}n.blockedOn=null}function zs(n){if(n.blockedOn!==null)return!1;for(var e=n.targetContainers;0<e.length;){var t=Er(n.domEventName,n.eventSystemFlags,e[0],n.nativeEvent);if(t===null){t=n.nativeEvent;var s=new t.constructor(t.type,t);wr=s,t.target.dispatchEvent(s),wr=null}else return e=os(t),e!==null&&ml(e),n.blockedOn=t,!1;e.shift()}return!0}function yi(n,e,t){zs(n)&&t.delete(e)}function Gp(){Cr=!1,ie!==null&&zs(ie)&&(ie=null),oe!==null&&zs(oe)&&(oe=null),ce!==null&&zs(ce)&&(ce=null),Ht.forEach(yi),$t.forEach(yi)}function St(n,e){n.blockedOn===e&&(n.blockedOn=null,Cr||(Cr=!0,kn.unstable_scheduleCallback(kn.unstable_NormalPriority,Gp)))}function Vt(n){function e(a){return St(a,n)}if(0<gs.length){St(gs[0],n);for(var t=1;t<gs.length;t++){var s=gs[t];s.blockedOn===n&&(s.blockedOn=null)}}for(ie!==null&&St(ie,n),oe!==null&&St(oe,n),ce!==null&&St(ce,n),Ht.forEach(e),$t.forEach(e),t=0;t<te.length;t++)s=te[t],s.blockedOn===n&&(s.blockedOn=null);for(;0<te.length&&(t=te[0],t.blockedOn===null);)fc(t),t.blockedOn===null&&te.shift()}var tt=Xn.ReactCurrentBatchConfig,Qs=!0;function Xp(n,e,t,s){var a=M,r=tt.transition;tt.transition=null;try{M=1,vl(n,e,t,s)}finally{M=a,tt.transition=r}}function Jp(n,e,t,s){var a=M,r=tt.transition;tt.transition=null;try{M=4,vl(n,e,t,s)}finally{M=a,tt.transition=r}}function vl(n,e,t,s){if(Qs){var a=Er(n,e,t,s);if(a===null)qa(n,e,s,qs,t),vi(n,s);else if(Yp(a,n,e,t,s))s.stopPropagation();else if(vi(n,s),e&4&&-1<Kp.indexOf(n)){for(;a!==null;){var r=os(a);if(r!==null&&cc(r),r=Er(n,e,t,s),r===null&&qa(n,e,s,qs,t),r===a)break;a=r}a!==null&&s.stopPropagation()}else qa(n,e,s,null,t)}}var qs=null;function Er(n,e,t,s){if(qs=null,n=dl(s),n=Le(n),n!==null)if(e=Ue(n),e===null)n=null;else if(t=e.tag,t===13){if(n=ec(e),n!==null)return n;n=null}else if(t===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;n=null}else e!==n&&(n=null);return qs=n,null}function hc(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Up()){case fl:return 1;case rc:return 4;case $s:case Ap:return 16;case lc:return 536870912;default:return 16}default:return 16}}var ae=null,yl=null,Rs=null;function mc(){if(Rs)return Rs;var n,e=yl,t=e.length,s,a="value"in ae?ae.value:ae.textContent,r=a.length;for(n=0;n<t&&e[n]===a[n];n++);var l=t-n;for(s=1;s<=l&&e[t-s]===a[r-s];s++);return Rs=a.slice(n,1<s?1-s:void 0)}function js(n){var e=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&e===13&&(n=13)):n=e,n===10&&(n=13),32<=n||n===13?n:0}function ws(){return!0}function gi(){return!1}function Sn(n){function e(t,s,a,r,l){this._reactName=t,this._targetInst=a,this.type=s,this.nativeEvent=r,this.target=l,this.currentTarget=null;for(var i in n)n.hasOwnProperty(i)&&(t=n[i],this[i]=t?t(r):r[i]);return this.isDefaultPrevented=(r.defaultPrevented!=null?r.defaultPrevented:r.returnValue===!1)?ws:gi,this.isPropagationStopped=gi,this}return W(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=ws)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=ws)},persist:function(){},isPersistent:ws}),e}var ft={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},gl=Sn(ft),is=W({},ft,{view:0,detail:0}),Zp=Sn(is),Fa,Ua,_t,ha=W({},is,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:wl,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==_t&&(_t&&n.type==="mousemove"?(Fa=n.screenX-_t.screenX,Ua=n.screenY-_t.screenY):Ua=Fa=0,_t=n),Fa)},movementY:function(n){return"movementY"in n?n.movementY:Ua}}),wi=Sn(ha),nd=W({},ha,{dataTransfer:0}),ed=Sn(nd),td=W({},is,{relatedTarget:0}),Aa=Sn(td),sd=W({},ft,{animationName:0,elapsedTime:0,pseudoElement:0}),ad=Sn(sd),rd=W({},ft,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),ld=Sn(rd),id=W({},ft,{data:0}),ki=Sn(id),od={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},cd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ud={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function pd(n){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(n):(n=ud[n])?!!e[n]:!1}function wl(){return pd}var dd=W({},is,{key:function(n){if(n.key){var e=od[n.key]||n.key;if(e!=="Unidentified")return e}return n.type==="keypress"?(n=js(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?cd[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:wl,charCode:function(n){return n.type==="keypress"?js(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?js(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),fd=Sn(dd),hd=W({},ha,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),xi=Sn(hd),md=W({},is,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:wl}),vd=Sn(md),yd=W({},ft,{propertyName:0,elapsedTime:0,pseudoElement:0}),gd=Sn(yd),wd=W({},ha,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),kd=Sn(wd),xd=[9,13,27,32],kl=qn&&"CompositionEvent"in window,jt=null;qn&&"documentMode"in document&&(jt=document.documentMode);var Sd=qn&&"TextEvent"in window&&!jt,vc=qn&&(!kl||jt&&8<jt&&11>=jt),Si=" ",_i=!1;function yc(n,e){switch(n){case"keyup":return xd.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function gc(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var He=!1;function _d(n,e){switch(n){case"compositionend":return gc(e);case"keypress":return e.which!==32?null:(_i=!0,Si);case"textInput":return n=e.data,n===Si&&_i?null:n;default:return null}}function Cd(n,e){if(He)return n==="compositionend"||!kl&&yc(n,e)?(n=mc(),Rs=yl=ae=null,He=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return vc&&e.locale!=="ko"?null:e.data;default:return null}}var Ed={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ci(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e==="input"?!!Ed[n.type]:e==="textarea"}function wc(n,e,t,s){Go(s),e=Ks(e,"onChange"),0<e.length&&(t=new gl("onChange","change",null,t,s),n.push({event:t,listeners:e}))}var It=null,Qt=null;function Pd(n){Nc(n,0)}function ma(n){var e=Qe(n);if(Ho(e))return n}function Td(n,e){if(n==="change")return e}var kc=!1;if(qn){var Ba;if(qn){var Wa="oninput"in document;if(!Wa){var Ei=document.createElement("div");Ei.setAttribute("oninput","return;"),Wa=typeof Ei.oninput=="function"}Ba=Wa}else Ba=!1;kc=Ba&&(!document.documentMode||9<document.documentMode)}function Pi(){It&&(It.detachEvent("onpropertychange",xc),Qt=It=null)}function xc(n){if(n.propertyName==="value"&&ma(Qt)){var e=[];wc(e,Qt,n,dl(n)),nc(Pd,e)}}function Ld(n,e,t){n==="focusin"?(Pi(),It=e,Qt=t,It.attachEvent("onpropertychange",xc)):n==="focusout"&&Pi()}function Od(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return ma(Qt)}function Nd(n,e){if(n==="click")return ma(e)}function zd(n,e){if(n==="input"||n==="change")return ma(e)}function Rd(n,e){return n===e&&(n!==0||1/n===1/e)||n!==n&&e!==e}var Dn=typeof Object.is=="function"?Object.is:Rd;function qt(n,e){if(Dn(n,e))return!0;if(typeof n!="object"||n===null||typeof e!="object"||e===null)return!1;var t=Object.keys(n),s=Object.keys(e);if(t.length!==s.length)return!1;for(s=0;s<t.length;s++){var a=t[s];if(!ir.call(e,a)||!Dn(n[a],e[a]))return!1}return!0}function Ti(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Li(n,e){var t=Ti(n);n=0;for(var s;t;){if(t.nodeType===3){if(s=n+t.textContent.length,n<=e&&s>=e)return{node:t,offset:e-n};n=s}n:{for(;t;){if(t.nextSibling){t=t.nextSibling;break n}t=t.parentNode}t=void 0}t=Ti(t)}}function Sc(n,e){return n&&e?n===e?!0:n&&n.nodeType===3?!1:e&&e.nodeType===3?Sc(n,e.parentNode):"contains"in n?n.contains(e):n.compareDocumentPosition?!!(n.compareDocumentPosition(e)&16):!1:!1}function _c(){for(var n=window,e=Bs();e instanceof n.HTMLIFrameElement;){try{var t=typeof e.contentWindow.location.href=="string"}catch{t=!1}if(t)n=e.contentWindow;else break;e=Bs(n.document)}return e}function xl(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e&&(e==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||e==="textarea"||n.contentEditable==="true")}function jd(n){var e=_c(),t=n.focusedElem,s=n.selectionRange;if(e!==t&&t&&t.ownerDocument&&Sc(t.ownerDocument.documentElement,t)){if(s!==null&&xl(t)){if(e=s.start,n=s.end,n===void 0&&(n=e),"selectionStart"in t)t.selectionStart=e,t.selectionEnd=Math.min(n,t.value.length);else if(n=(e=t.ownerDocument||document)&&e.defaultView||window,n.getSelection){n=n.getSelection();var a=t.textContent.length,r=Math.min(s.start,a);s=s.end===void 0?r:Math.min(s.end,a),!n.extend&&r>s&&(a=s,s=r,r=a),a=Li(t,r);var l=Li(t,s);a&&l&&(n.rangeCount!==1||n.anchorNode!==a.node||n.anchorOffset!==a.offset||n.focusNode!==l.node||n.focusOffset!==l.offset)&&(e=e.createRange(),e.setStart(a.node,a.offset),n.removeAllRanges(),r>s?(n.addRange(e),n.extend(l.node,l.offset)):(e.setEnd(l.node,l.offset),n.addRange(e)))}}for(e=[],n=t;n=n.parentNode;)n.nodeType===1&&e.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<e.length;t++)n=e[t],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var Id=qn&&"documentMode"in document&&11>=document.documentMode,$e=null,Pr=null,Mt=null,Tr=!1;function Oi(n,e,t){var s=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Tr||$e==null||$e!==Bs(s)||(s=$e,"selectionStart"in s&&xl(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),Mt&&qt(Mt,s)||(Mt=s,s=Ks(Pr,"onSelect"),0<s.length&&(e=new gl("onSelect","select",null,e,t),n.push({event:e,listeners:s}),e.target=$e)))}function ks(n,e){var t={};return t[n.toLowerCase()]=e.toLowerCase(),t["Webkit"+n]="webkit"+e,t["Moz"+n]="moz"+e,t}var Ve={animationend:ks("Animation","AnimationEnd"),animationiteration:ks("Animation","AnimationIteration"),animationstart:ks("Animation","AnimationStart"),transitionend:ks("Transition","TransitionEnd")},Ha={},Cc={};qn&&(Cc=document.createElement("div").style,"AnimationEvent"in window||(delete Ve.animationend.animation,delete Ve.animationiteration.animation,delete Ve.animationstart.animation),"TransitionEvent"in window||delete Ve.transitionend.transition);function va(n){if(Ha[n])return Ha[n];if(!Ve[n])return n;var e=Ve[n],t;for(t in e)if(e.hasOwnProperty(t)&&t in Cc)return Ha[n]=e[t];return n}var Ec=va("animationend"),Pc=va("animationiteration"),Tc=va("animationstart"),Lc=va("transitionend"),Oc=new Map,Ni="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ge(n,e){Oc.set(n,e),Fe(e,[n])}for(var $a=0;$a<Ni.length;$a++){var Va=Ni[$a],Md=Va.toLowerCase(),Dd=Va[0].toUpperCase()+Va.slice(1);ge(Md,"on"+Dd)}ge(Ec,"onAnimationEnd");ge(Pc,"onAnimationIteration");ge(Tc,"onAnimationStart");ge("dblclick","onDoubleClick");ge("focusin","onFocus");ge("focusout","onBlur");ge(Lc,"onTransitionEnd");rt("onMouseEnter",["mouseout","mouseover"]);rt("onMouseLeave",["mouseout","mouseover"]);rt("onPointerEnter",["pointerout","pointerover"]);rt("onPointerLeave",["pointerout","pointerover"]);Fe("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Fe("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Fe("onBeforeInput",["compositionend","keypress","textInput","paste"]);Fe("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Fe("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Fe("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Nt="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),bd=new Set("cancel close invalid load scroll toggle".split(" ").concat(Nt));function zi(n,e,t){var s=n.type||"unknown-event";n.currentTarget=t,Mp(s,e,void 0,n),n.currentTarget=null}function Nc(n,e){e=(e&4)!==0;for(var t=0;t<n.length;t++){var s=n[t],a=s.event;s=s.listeners;n:{var r=void 0;if(e)for(var l=s.length-1;0<=l;l--){var i=s[l],o=i.instance,c=i.currentTarget;if(i=i.listener,o!==r&&a.isPropagationStopped())break n;zi(a,i,c),r=o}else for(l=0;l<s.length;l++){if(i=s[l],o=i.instance,c=i.currentTarget,i=i.listener,o!==r&&a.isPropagationStopped())break n;zi(a,i,c),r=o}}}if(Hs)throw n=Sr,Hs=!1,Sr=null,n}function b(n,e){var t=e[Rr];t===void 0&&(t=e[Rr]=new Set);var s=n+"__bubble";t.has(s)||(zc(e,n,2,!1),t.add(s))}function Qa(n,e,t){var s=0;e&&(s|=4),zc(t,n,s,e)}var xs="_reactListening"+Math.random().toString(36).slice(2);function Kt(n){if(!n[xs]){n[xs]=!0,Fo.forEach(function(t){t!=="selectionchange"&&(bd.has(t)||Qa(t,!1,n),Qa(t,!0,n))});var e=n.nodeType===9?n:n.ownerDocument;e===null||e[xs]||(e[xs]=!0,Qa("selectionchange",!1,e))}}function zc(n,e,t,s){switch(hc(e)){case 1:var a=Xp;break;case 4:a=Jp;break;default:a=vl}t=a.bind(null,e,t,n),a=void 0,!xr||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(a=!0),s?a!==void 0?n.addEventListener(e,t,{capture:!0,passive:a}):n.addEventListener(e,t,!0):a!==void 0?n.addEventListener(e,t,{passive:a}):n.addEventListener(e,t,!1)}function qa(n,e,t,s,a){var r=s;if(!(e&1)&&!(e&2)&&s!==null)n:for(;;){if(s===null)return;var l=s.tag;if(l===3||l===4){var i=s.stateNode.containerInfo;if(i===a||i.nodeType===8&&i.parentNode===a)break;if(l===4)for(l=s.return;l!==null;){var o=l.tag;if((o===3||o===4)&&(o=l.stateNode.containerInfo,o===a||o.nodeType===8&&o.parentNode===a))return;l=l.return}for(;i!==null;){if(l=Le(i),l===null)return;if(o=l.tag,o===5||o===6){s=r=l;continue n}i=i.parentNode}}s=s.return}nc(function(){var c=r,m=dl(t),d=[];n:{var h=Oc.get(n);if(h!==void 0){var y=gl,w=n;switch(n){case"keypress":if(js(t)===0)break n;case"keydown":case"keyup":y=fd;break;case"focusin":w="focus",y=Aa;break;case"focusout":w="blur",y=Aa;break;case"beforeblur":case"afterblur":y=Aa;break;case"click":if(t.button===2)break n;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=wi;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=ed;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=vd;break;case Ec:case Pc:case Tc:y=ad;break;case Lc:y=gd;break;case"scroll":y=Zp;break;case"wheel":y=kd;break;case"copy":case"cut":case"paste":y=ld;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=xi}var g=(e&4)!==0,_=!g&&n==="scroll",p=g?h!==null?h+"Capture":null:h;g=[];for(var u=c,f;u!==null;){f=u;var v=f.stateNode;if(f.tag===5&&v!==null&&(f=v,p!==null&&(v=Wt(u,p),v!=null&&g.push(Yt(u,v,f)))),_)break;u=u.return}0<g.length&&(h=new y(h,w,null,t,m),d.push({event:h,listeners:g}))}}if(!(e&7)){n:{if(h=n==="mouseover"||n==="pointerover",y=n==="mouseout"||n==="pointerout",h&&t!==wr&&(w=t.relatedTarget||t.fromElement)&&(Le(w)||w[Kn]))break n;if((y||h)&&(h=m.window===m?m:(h=m.ownerDocument)?h.defaultView||h.parentWindow:window,y?(w=t.relatedTarget||t.toElement,y=c,w=w?Le(w):null,w!==null&&(_=Ue(w),w!==_||w.tag!==5&&w.tag!==6)&&(w=null)):(y=null,w=c),y!==w)){if(g=wi,v="onMouseLeave",p="onMouseEnter",u="mouse",(n==="pointerout"||n==="pointerover")&&(g=xi,v="onPointerLeave",p="onPointerEnter",u="pointer"),_=y==null?h:Qe(y),f=w==null?h:Qe(w),h=new g(v,u+"leave",y,t,m),h.target=_,h.relatedTarget=f,v=null,Le(m)===c&&(g=new g(p,u+"enter",w,t,m),g.target=f,g.relatedTarget=_,v=g),_=v,y&&w)e:{for(g=y,p=w,u=0,f=g;f;f=Ae(f))u++;for(f=0,v=p;v;v=Ae(v))f++;for(;0<u-f;)g=Ae(g),u--;for(;0<f-u;)p=Ae(p),f--;for(;u--;){if(g===p||p!==null&&g===p.alternate)break e;g=Ae(g),p=Ae(p)}g=null}else g=null;y!==null&&Ri(d,h,y,g,!1),w!==null&&_!==null&&Ri(d,_,w,g,!0)}}n:{if(h=c?Qe(c):window,y=h.nodeName&&h.nodeName.toLowerCase(),y==="select"||y==="input"&&h.type==="file")var S=Td;else if(Ci(h))if(kc)S=zd;else{S=Od;var P=Ld}else(y=h.nodeName)&&y.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(S=Nd);if(S&&(S=S(n,c))){wc(d,S,t,m);break n}P&&P(n,h,c),n==="focusout"&&(P=h._wrapperState)&&P.controlled&&h.type==="number"&&hr(h,"number",h.value)}switch(P=c?Qe(c):window,n){case"focusin":(Ci(P)||P.contentEditable==="true")&&($e=P,Pr=c,Mt=null);break;case"focusout":Mt=Pr=$e=null;break;case"mousedown":Tr=!0;break;case"contextmenu":case"mouseup":case"dragend":Tr=!1,Oi(d,t,m);break;case"selectionchange":if(Id)break;case"keydown":case"keyup":Oi(d,t,m)}var T;if(kl)n:{switch(n){case"compositionstart":var L="onCompositionStart";break n;case"compositionend":L="onCompositionEnd";break n;case"compositionupdate":L="onCompositionUpdate";break n}L=void 0}else He?yc(n,t)&&(L="onCompositionEnd"):n==="keydown"&&t.keyCode===229&&(L="onCompositionStart");L&&(vc&&t.locale!=="ko"&&(He||L!=="onCompositionStart"?L==="onCompositionEnd"&&He&&(T=mc()):(ae=m,yl="value"in ae?ae.value:ae.textContent,He=!0)),P=Ks(c,L),0<P.length&&(L=new ki(L,n,null,t,m),d.push({event:L,listeners:P}),T?L.data=T:(T=gc(t),T!==null&&(L.data=T)))),(T=Sd?_d(n,t):Cd(n,t))&&(c=Ks(c,"onBeforeInput"),0<c.length&&(m=new ki("onBeforeInput","beforeinput",null,t,m),d.push({event:m,listeners:c}),m.data=T))}Nc(d,e)})}function Yt(n,e,t){return{instance:n,listener:e,currentTarget:t}}function Ks(n,e){for(var t=e+"Capture",s=[];n!==null;){var a=n,r=a.stateNode;a.tag===5&&r!==null&&(a=r,r=Wt(n,t),r!=null&&s.unshift(Yt(n,r,a)),r=Wt(n,e),r!=null&&s.push(Yt(n,r,a))),n=n.return}return s}function Ae(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function Ri(n,e,t,s,a){for(var r=e._reactName,l=[];t!==null&&t!==s;){var i=t,o=i.alternate,c=i.stateNode;if(o!==null&&o===s)break;i.tag===5&&c!==null&&(i=c,a?(o=Wt(t,r),o!=null&&l.unshift(Yt(t,o,i))):a||(o=Wt(t,r),o!=null&&l.push(Yt(t,o,i)))),t=t.return}l.length!==0&&n.push({event:e,listeners:l})}var Fd=/\r\n?/g,Ud=/\u0000|\uFFFD/g;function ji(n){return(typeof n=="string"?n:""+n).replace(Fd,`
`).replace(Ud,"")}function Ss(n,e,t){if(e=ji(e),ji(n)!==e&&t)throw Error(k(425))}function Ys(){}var Lr=null,Or=null;function Nr(n,e){return n==="textarea"||n==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var zr=typeof setTimeout=="function"?setTimeout:void 0,Ad=typeof clearTimeout=="function"?clearTimeout:void 0,Ii=typeof Promise=="function"?Promise:void 0,Bd=typeof queueMicrotask=="function"?queueMicrotask:typeof Ii<"u"?function(n){return Ii.resolve(null).then(n).catch(Wd)}:zr;function Wd(n){setTimeout(function(){throw n})}function Ka(n,e){var t=e,s=0;do{var a=t.nextSibling;if(n.removeChild(t),a&&a.nodeType===8)if(t=a.data,t==="/$"){if(s===0){n.removeChild(a),Vt(e);return}s--}else t!=="$"&&t!=="$?"&&t!=="$!"||s++;t=a}while(t);Vt(e)}function ue(n){for(;n!=null;n=n.nextSibling){var e=n.nodeType;if(e===1||e===3)break;if(e===8){if(e=n.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return n}function Mi(n){n=n.previousSibling;for(var e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="$"||t==="$!"||t==="$?"){if(e===0)return n;e--}else t==="/$"&&e++}n=n.previousSibling}return null}var ht=Math.random().toString(36).slice(2),Un="__reactFiber$"+ht,Gt="__reactProps$"+ht,Kn="__reactContainer$"+ht,Rr="__reactEvents$"+ht,Hd="__reactListeners$"+ht,$d="__reactHandles$"+ht;function Le(n){var e=n[Un];if(e)return e;for(var t=n.parentNode;t;){if(e=t[Kn]||t[Un]){if(t=e.alternate,e.child!==null||t!==null&&t.child!==null)for(n=Mi(n);n!==null;){if(t=n[Un])return t;n=Mi(n)}return e}n=t,t=n.parentNode}return null}function os(n){return n=n[Un]||n[Kn],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function Qe(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(k(33))}function ya(n){return n[Gt]||null}var jr=[],qe=-1;function we(n){return{current:n}}function F(n){0>qe||(n.current=jr[qe],jr[qe]=null,qe--)}function D(n,e){qe++,jr[qe]=n.current,n.current=e}var ye={},ln=we(ye),hn=we(!1),je=ye;function lt(n,e){var t=n.type.contextTypes;if(!t)return ye;var s=n.stateNode;if(s&&s.__reactInternalMemoizedUnmaskedChildContext===e)return s.__reactInternalMemoizedMaskedChildContext;var a={},r;for(r in t)a[r]=e[r];return s&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=e,n.__reactInternalMemoizedMaskedChildContext=a),a}function mn(n){return n=n.childContextTypes,n!=null}function Gs(){F(hn),F(ln)}function Di(n,e,t){if(ln.current!==ye)throw Error(k(168));D(ln,e),D(hn,t)}function Rc(n,e,t){var s=n.stateNode;if(e=e.childContextTypes,typeof s.getChildContext!="function")return t;s=s.getChildContext();for(var a in s)if(!(a in e))throw Error(k(108,Lp(n)||"Unknown",a));return W({},t,s)}function Xs(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||ye,je=ln.current,D(ln,n),D(hn,hn.current),!0}function bi(n,e,t){var s=n.stateNode;if(!s)throw Error(k(169));t?(n=Rc(n,e,je),s.__reactInternalMemoizedMergedChildContext=n,F(hn),F(ln),D(ln,n)):F(hn),D(hn,t)}var Hn=null,ga=!1,Ya=!1;function jc(n){Hn===null?Hn=[n]:Hn.push(n)}function Vd(n){ga=!0,jc(n)}function ke(){if(!Ya&&Hn!==null){Ya=!0;var n=0,e=M;try{var t=Hn;for(M=1;n<t.length;n++){var s=t[n];do s=s(!0);while(s!==null)}Hn=null,ga=!1}catch(a){throw Hn!==null&&(Hn=Hn.slice(n+1)),ac(fl,ke),a}finally{M=e,Ya=!1}}return null}var Ke=[],Ye=0,Js=null,Zs=0,_n=[],Cn=0,Ie=null,$n=1,Vn="";function Ee(n,e){Ke[Ye++]=Zs,Ke[Ye++]=Js,Js=n,Zs=e}function Ic(n,e,t){_n[Cn++]=$n,_n[Cn++]=Vn,_n[Cn++]=Ie,Ie=n;var s=$n;n=Vn;var a=32-In(s)-1;s&=~(1<<a),t+=1;var r=32-In(e)+a;if(30<r){var l=a-a%5;r=(s&(1<<l)-1).toString(32),s>>=l,a-=l,$n=1<<32-In(e)+a|t<<a|s,Vn=r+n}else $n=1<<r|t<<a|s,Vn=n}function Sl(n){n.return!==null&&(Ee(n,1),Ic(n,1,0))}function _l(n){for(;n===Js;)Js=Ke[--Ye],Ke[Ye]=null,Zs=Ke[--Ye],Ke[Ye]=null;for(;n===Ie;)Ie=_n[--Cn],_n[Cn]=null,Vn=_n[--Cn],_n[Cn]=null,$n=_n[--Cn],_n[Cn]=null}var wn=null,gn=null,U=!1,jn=null;function Mc(n,e){var t=En(5,null,null,0);t.elementType="DELETED",t.stateNode=e,t.return=n,e=n.deletions,e===null?(n.deletions=[t],n.flags|=16):e.push(t)}function Fi(n,e){switch(n.tag){case 5:var t=n.type;return e=e.nodeType!==1||t.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(n.stateNode=e,wn=n,gn=ue(e.firstChild),!0):!1;case 6:return e=n.pendingProps===""||e.nodeType!==3?null:e,e!==null?(n.stateNode=e,wn=n,gn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(t=Ie!==null?{id:$n,overflow:Vn}:null,n.memoizedState={dehydrated:e,treeContext:t,retryLane:1073741824},t=En(18,null,null,0),t.stateNode=e,t.return=n,n.child=t,wn=n,gn=null,!0):!1;default:return!1}}function Ir(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Mr(n){if(U){var e=gn;if(e){var t=e;if(!Fi(n,e)){if(Ir(n))throw Error(k(418));e=ue(t.nextSibling);var s=wn;e&&Fi(n,e)?Mc(s,t):(n.flags=n.flags&-4097|2,U=!1,wn=n)}}else{if(Ir(n))throw Error(k(418));n.flags=n.flags&-4097|2,U=!1,wn=n}}}function Ui(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;wn=n}function _s(n){if(n!==wn)return!1;if(!U)return Ui(n),U=!0,!1;var e;if((e=n.tag!==3)&&!(e=n.tag!==5)&&(e=n.type,e=e!=="head"&&e!=="body"&&!Nr(n.type,n.memoizedProps)),e&&(e=gn)){if(Ir(n))throw Dc(),Error(k(418));for(;e;)Mc(n,e),e=ue(e.nextSibling)}if(Ui(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(k(317));n:{for(n=n.nextSibling,e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="/$"){if(e===0){gn=ue(n.nextSibling);break n}e--}else t!=="$"&&t!=="$!"&&t!=="$?"||e++}n=n.nextSibling}gn=null}}else gn=wn?ue(n.stateNode.nextSibling):null;return!0}function Dc(){for(var n=gn;n;)n=ue(n.nextSibling)}function it(){gn=wn=null,U=!1}function Cl(n){jn===null?jn=[n]:jn.push(n)}var Qd=Xn.ReactCurrentBatchConfig;function Ct(n,e,t){if(n=t.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(k(309));var s=t.stateNode}if(!s)throw Error(k(147,n));var a=s,r=""+n;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===r?e.ref:(e=function(l){var i=a.refs;l===null?delete i[r]:i[r]=l},e._stringRef=r,e)}if(typeof n!="string")throw Error(k(284));if(!t._owner)throw Error(k(290,n))}return n}function Cs(n,e){throw n=Object.prototype.toString.call(e),Error(k(31,n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n))}function Ai(n){var e=n._init;return e(n._payload)}function bc(n){function e(p,u){if(n){var f=p.deletions;f===null?(p.deletions=[u],p.flags|=16):f.push(u)}}function t(p,u){if(!n)return null;for(;u!==null;)e(p,u),u=u.sibling;return null}function s(p,u){for(p=new Map;u!==null;)u.key!==null?p.set(u.key,u):p.set(u.index,u),u=u.sibling;return p}function a(p,u){return p=he(p,u),p.index=0,p.sibling=null,p}function r(p,u,f){return p.index=f,n?(f=p.alternate,f!==null?(f=f.index,f<u?(p.flags|=2,u):f):(p.flags|=2,u)):(p.flags|=1048576,u)}function l(p){return n&&p.alternate===null&&(p.flags|=2),p}function i(p,u,f,v){return u===null||u.tag!==6?(u=tr(f,p.mode,v),u.return=p,u):(u=a(u,f),u.return=p,u)}function o(p,u,f,v){var S=f.type;return S===We?m(p,u,f.props.children,v,f.key):u!==null&&(u.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===ne&&Ai(S)===u.type)?(v=a(u,f.props),v.ref=Ct(p,u,f),v.return=p,v):(v=As(f.type,f.key,f.props,null,p.mode,v),v.ref=Ct(p,u,f),v.return=p,v)}function c(p,u,f,v){return u===null||u.tag!==4||u.stateNode.containerInfo!==f.containerInfo||u.stateNode.implementation!==f.implementation?(u=sr(f,p.mode,v),u.return=p,u):(u=a(u,f.children||[]),u.return=p,u)}function m(p,u,f,v,S){return u===null||u.tag!==7?(u=Re(f,p.mode,v,S),u.return=p,u):(u=a(u,f),u.return=p,u)}function d(p,u,f){if(typeof u=="string"&&u!==""||typeof u=="number")return u=tr(""+u,p.mode,f),u.return=p,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case fs:return f=As(u.type,u.key,u.props,null,p.mode,f),f.ref=Ct(p,null,u),f.return=p,f;case Be:return u=sr(u,p.mode,f),u.return=p,u;case ne:var v=u._init;return d(p,v(u._payload),f)}if(Lt(u)||wt(u))return u=Re(u,p.mode,f,null),u.return=p,u;Cs(p,u)}return null}function h(p,u,f,v){var S=u!==null?u.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return S!==null?null:i(p,u,""+f,v);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case fs:return f.key===S?o(p,u,f,v):null;case Be:return f.key===S?c(p,u,f,v):null;case ne:return S=f._init,h(p,u,S(f._payload),v)}if(Lt(f)||wt(f))return S!==null?null:m(p,u,f,v,null);Cs(p,f)}return null}function y(p,u,f,v,S){if(typeof v=="string"&&v!==""||typeof v=="number")return p=p.get(f)||null,i(u,p,""+v,S);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case fs:return p=p.get(v.key===null?f:v.key)||null,o(u,p,v,S);case Be:return p=p.get(v.key===null?f:v.key)||null,c(u,p,v,S);case ne:var P=v._init;return y(p,u,f,P(v._payload),S)}if(Lt(v)||wt(v))return p=p.get(f)||null,m(u,p,v,S,null);Cs(u,v)}return null}function w(p,u,f,v){for(var S=null,P=null,T=u,L=u=0,$=null;T!==null&&L<f.length;L++){T.index>L?($=T,T=null):$=T.sibling;var j=h(p,T,f[L],v);if(j===null){T===null&&(T=$);break}n&&T&&j.alternate===null&&e(p,T),u=r(j,u,L),P===null?S=j:P.sibling=j,P=j,T=$}if(L===f.length)return t(p,T),U&&Ee(p,L),S;if(T===null){for(;L<f.length;L++)T=d(p,f[L],v),T!==null&&(u=r(T,u,L),P===null?S=T:P.sibling=T,P=T);return U&&Ee(p,L),S}for(T=s(p,T);L<f.length;L++)$=y(T,p,L,f[L],v),$!==null&&(n&&$.alternate!==null&&T.delete($.key===null?L:$.key),u=r($,u,L),P===null?S=$:P.sibling=$,P=$);return n&&T.forEach(function(On){return e(p,On)}),U&&Ee(p,L),S}function g(p,u,f,v){var S=wt(f);if(typeof S!="function")throw Error(k(150));if(f=S.call(f),f==null)throw Error(k(151));for(var P=S=null,T=u,L=u=0,$=null,j=f.next();T!==null&&!j.done;L++,j=f.next()){T.index>L?($=T,T=null):$=T.sibling;var On=h(p,T,j.value,v);if(On===null){T===null&&(T=$);break}n&&T&&On.alternate===null&&e(p,T),u=r(On,u,L),P===null?S=On:P.sibling=On,P=On,T=$}if(j.done)return t(p,T),U&&Ee(p,L),S;if(T===null){for(;!j.done;L++,j=f.next())j=d(p,j.value,v),j!==null&&(u=r(j,u,L),P===null?S=j:P.sibling=j,P=j);return U&&Ee(p,L),S}for(T=s(p,T);!j.done;L++,j=f.next())j=y(T,p,L,j.value,v),j!==null&&(n&&j.alternate!==null&&T.delete(j.key===null?L:j.key),u=r(j,u,L),P===null?S=j:P.sibling=j,P=j);return n&&T.forEach(function(yt){return e(p,yt)}),U&&Ee(p,L),S}function _(p,u,f,v){if(typeof f=="object"&&f!==null&&f.type===We&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case fs:n:{for(var S=f.key,P=u;P!==null;){if(P.key===S){if(S=f.type,S===We){if(P.tag===7){t(p,P.sibling),u=a(P,f.props.children),u.return=p,p=u;break n}}else if(P.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===ne&&Ai(S)===P.type){t(p,P.sibling),u=a(P,f.props),u.ref=Ct(p,P,f),u.return=p,p=u;break n}t(p,P);break}else e(p,P);P=P.sibling}f.type===We?(u=Re(f.props.children,p.mode,v,f.key),u.return=p,p=u):(v=As(f.type,f.key,f.props,null,p.mode,v),v.ref=Ct(p,u,f),v.return=p,p=v)}return l(p);case Be:n:{for(P=f.key;u!==null;){if(u.key===P)if(u.tag===4&&u.stateNode.containerInfo===f.containerInfo&&u.stateNode.implementation===f.implementation){t(p,u.sibling),u=a(u,f.children||[]),u.return=p,p=u;break n}else{t(p,u);break}else e(p,u);u=u.sibling}u=sr(f,p.mode,v),u.return=p,p=u}return l(p);case ne:return P=f._init,_(p,u,P(f._payload),v)}if(Lt(f))return w(p,u,f,v);if(wt(f))return g(p,u,f,v);Cs(p,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,u!==null&&u.tag===6?(t(p,u.sibling),u=a(u,f),u.return=p,p=u):(t(p,u),u=tr(f,p.mode,v),u.return=p,p=u),l(p)):t(p,u)}return _}var ot=bc(!0),Fc=bc(!1),na=we(null),ea=null,Ge=null,El=null;function Pl(){El=Ge=ea=null}function Tl(n){var e=na.current;F(na),n._currentValue=e}function Dr(n,e,t){for(;n!==null;){var s=n.alternate;if((n.childLanes&e)!==e?(n.childLanes|=e,s!==null&&(s.childLanes|=e)):s!==null&&(s.childLanes&e)!==e&&(s.childLanes|=e),n===t)break;n=n.return}}function st(n,e){ea=n,El=Ge=null,n=n.dependencies,n!==null&&n.firstContext!==null&&(n.lanes&e&&(fn=!0),n.firstContext=null)}function Tn(n){var e=n._currentValue;if(El!==n)if(n={context:n,memoizedValue:e,next:null},Ge===null){if(ea===null)throw Error(k(308));Ge=n,ea.dependencies={lanes:0,firstContext:n}}else Ge=Ge.next=n;return e}var Oe=null;function Ll(n){Oe===null?Oe=[n]:Oe.push(n)}function Uc(n,e,t,s){var a=e.interleaved;return a===null?(t.next=t,Ll(e)):(t.next=a.next,a.next=t),e.interleaved=t,Yn(n,s)}function Yn(n,e){n.lanes|=e;var t=n.alternate;for(t!==null&&(t.lanes|=e),t=n,n=n.return;n!==null;)n.childLanes|=e,t=n.alternate,t!==null&&(t.childLanes|=e),t=n,n=n.return;return t.tag===3?t.stateNode:null}var ee=!1;function Ol(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Ac(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Qn(n,e){return{eventTime:n,lane:e,tag:0,payload:null,callback:null,next:null}}function pe(n,e,t){var s=n.updateQueue;if(s===null)return null;if(s=s.shared,I&2){var a=s.pending;return a===null?e.next=e:(e.next=a.next,a.next=e),s.pending=e,Yn(n,t)}return a=s.interleaved,a===null?(e.next=e,Ll(s)):(e.next=a.next,a.next=e),s.interleaved=e,Yn(n,t)}function Is(n,e,t){if(e=e.updateQueue,e!==null&&(e=e.shared,(t&4194240)!==0)){var s=e.lanes;s&=n.pendingLanes,t|=s,e.lanes=t,hl(n,t)}}function Bi(n,e){var t=n.updateQueue,s=n.alternate;if(s!==null&&(s=s.updateQueue,t===s)){var a=null,r=null;if(t=t.firstBaseUpdate,t!==null){do{var l={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};r===null?a=r=l:r=r.next=l,t=t.next}while(t!==null);r===null?a=r=e:r=r.next=e}else a=r=e;t={baseState:s.baseState,firstBaseUpdate:a,lastBaseUpdate:r,shared:s.shared,effects:s.effects},n.updateQueue=t;return}n=t.lastBaseUpdate,n===null?t.firstBaseUpdate=e:n.next=e,t.lastBaseUpdate=e}function ta(n,e,t,s){var a=n.updateQueue;ee=!1;var r=a.firstBaseUpdate,l=a.lastBaseUpdate,i=a.shared.pending;if(i!==null){a.shared.pending=null;var o=i,c=o.next;o.next=null,l===null?r=c:l.next=c,l=o;var m=n.alternate;m!==null&&(m=m.updateQueue,i=m.lastBaseUpdate,i!==l&&(i===null?m.firstBaseUpdate=c:i.next=c,m.lastBaseUpdate=o))}if(r!==null){var d=a.baseState;l=0,m=c=o=null,i=r;do{var h=i.lane,y=i.eventTime;if((s&h)===h){m!==null&&(m=m.next={eventTime:y,lane:0,tag:i.tag,payload:i.payload,callback:i.callback,next:null});n:{var w=n,g=i;switch(h=e,y=t,g.tag){case 1:if(w=g.payload,typeof w=="function"){d=w.call(y,d,h);break n}d=w;break n;case 3:w.flags=w.flags&-65537|128;case 0:if(w=g.payload,h=typeof w=="function"?w.call(y,d,h):w,h==null)break n;d=W({},d,h);break n;case 2:ee=!0}}i.callback!==null&&i.lane!==0&&(n.flags|=64,h=a.effects,h===null?a.effects=[i]:h.push(i))}else y={eventTime:y,lane:h,tag:i.tag,payload:i.payload,callback:i.callback,next:null},m===null?(c=m=y,o=d):m=m.next=y,l|=h;if(i=i.next,i===null){if(i=a.shared.pending,i===null)break;h=i,i=h.next,h.next=null,a.lastBaseUpdate=h,a.shared.pending=null}}while(!0);if(m===null&&(o=d),a.baseState=o,a.firstBaseUpdate=c,a.lastBaseUpdate=m,e=a.shared.interleaved,e!==null){a=e;do l|=a.lane,a=a.next;while(a!==e)}else r===null&&(a.shared.lanes=0);De|=l,n.lanes=l,n.memoizedState=d}}function Wi(n,e,t){if(n=e.effects,e.effects=null,n!==null)for(e=0;e<n.length;e++){var s=n[e],a=s.callback;if(a!==null){if(s.callback=null,s=t,typeof a!="function")throw Error(k(191,a));a.call(s)}}}var cs={},Bn=we(cs),Xt=we(cs),Jt=we(cs);function Ne(n){if(n===cs)throw Error(k(174));return n}function Nl(n,e){switch(D(Jt,e),D(Xt,n),D(Bn,cs),n=e.nodeType,n){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:vr(null,"");break;default:n=n===8?e.parentNode:e,e=n.namespaceURI||null,n=n.tagName,e=vr(e,n)}F(Bn),D(Bn,e)}function ct(){F(Bn),F(Xt),F(Jt)}function Bc(n){Ne(Jt.current);var e=Ne(Bn.current),t=vr(e,n.type);e!==t&&(D(Xt,n),D(Bn,t))}function zl(n){Xt.current===n&&(F(Bn),F(Xt))}var A=we(0);function sa(n){for(var e=n;e!==null;){if(e.tag===13){var t=e.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Ga=[];function Rl(){for(var n=0;n<Ga.length;n++)Ga[n]._workInProgressVersionPrimary=null;Ga.length=0}var Ms=Xn.ReactCurrentDispatcher,Xa=Xn.ReactCurrentBatchConfig,Me=0,B=null,Y=null,J=null,aa=!1,Dt=!1,Zt=0,qd=0;function sn(){throw Error(k(321))}function jl(n,e){if(e===null)return!1;for(var t=0;t<e.length&&t<n.length;t++)if(!Dn(n[t],e[t]))return!1;return!0}function Il(n,e,t,s,a,r){if(Me=r,B=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Ms.current=n===null||n.memoizedState===null?Xd:Jd,n=t(s,a),Dt){r=0;do{if(Dt=!1,Zt=0,25<=r)throw Error(k(301));r+=1,J=Y=null,e.updateQueue=null,Ms.current=Zd,n=t(s,a)}while(Dt)}if(Ms.current=ra,e=Y!==null&&Y.next!==null,Me=0,J=Y=B=null,aa=!1,e)throw Error(k(300));return n}function Ml(){var n=Zt!==0;return Zt=0,n}function Fn(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return J===null?B.memoizedState=J=n:J=J.next=n,J}function Ln(){if(Y===null){var n=B.alternate;n=n!==null?n.memoizedState:null}else n=Y.next;var e=J===null?B.memoizedState:J.next;if(e!==null)J=e,Y=n;else{if(n===null)throw Error(k(310));Y=n,n={memoizedState:Y.memoizedState,baseState:Y.baseState,baseQueue:Y.baseQueue,queue:Y.queue,next:null},J===null?B.memoizedState=J=n:J=J.next=n}return J}function ns(n,e){return typeof e=="function"?e(n):e}function Ja(n){var e=Ln(),t=e.queue;if(t===null)throw Error(k(311));t.lastRenderedReducer=n;var s=Y,a=s.baseQueue,r=t.pending;if(r!==null){if(a!==null){var l=a.next;a.next=r.next,r.next=l}s.baseQueue=a=r,t.pending=null}if(a!==null){r=a.next,s=s.baseState;var i=l=null,o=null,c=r;do{var m=c.lane;if((Me&m)===m)o!==null&&(o=o.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),s=c.hasEagerState?c.eagerState:n(s,c.action);else{var d={lane:m,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};o===null?(i=o=d,l=s):o=o.next=d,B.lanes|=m,De|=m}c=c.next}while(c!==null&&c!==r);o===null?l=s:o.next=i,Dn(s,e.memoizedState)||(fn=!0),e.memoizedState=s,e.baseState=l,e.baseQueue=o,t.lastRenderedState=s}if(n=t.interleaved,n!==null){a=n;do r=a.lane,B.lanes|=r,De|=r,a=a.next;while(a!==n)}else a===null&&(t.lanes=0);return[e.memoizedState,t.dispatch]}function Za(n){var e=Ln(),t=e.queue;if(t===null)throw Error(k(311));t.lastRenderedReducer=n;var s=t.dispatch,a=t.pending,r=e.memoizedState;if(a!==null){t.pending=null;var l=a=a.next;do r=n(r,l.action),l=l.next;while(l!==a);Dn(r,e.memoizedState)||(fn=!0),e.memoizedState=r,e.baseQueue===null&&(e.baseState=r),t.lastRenderedState=r}return[r,s]}function Wc(){}function Hc(n,e){var t=B,s=Ln(),a=e(),r=!Dn(s.memoizedState,a);if(r&&(s.memoizedState=a,fn=!0),s=s.queue,Dl(Qc.bind(null,t,s,n),[n]),s.getSnapshot!==e||r||J!==null&&J.memoizedState.tag&1){if(t.flags|=2048,es(9,Vc.bind(null,t,s,a,e),void 0,null),Z===null)throw Error(k(349));Me&30||$c(t,e,a)}return a}function $c(n,e,t){n.flags|=16384,n={getSnapshot:e,value:t},e=B.updateQueue,e===null?(e={lastEffect:null,stores:null},B.updateQueue=e,e.stores=[n]):(t=e.stores,t===null?e.stores=[n]:t.push(n))}function Vc(n,e,t,s){e.value=t,e.getSnapshot=s,qc(e)&&Kc(n)}function Qc(n,e,t){return t(function(){qc(e)&&Kc(n)})}function qc(n){var e=n.getSnapshot;n=n.value;try{var t=e();return!Dn(n,t)}catch{return!0}}function Kc(n){var e=Yn(n,1);e!==null&&Mn(e,n,1,-1)}function Hi(n){var e=Fn();return typeof n=="function"&&(n=n()),e.memoizedState=e.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ns,lastRenderedState:n},e.queue=n,n=n.dispatch=Gd.bind(null,B,n),[e.memoizedState,n]}function es(n,e,t,s){return n={tag:n,create:e,destroy:t,deps:s,next:null},e=B.updateQueue,e===null?(e={lastEffect:null,stores:null},B.updateQueue=e,e.lastEffect=n.next=n):(t=e.lastEffect,t===null?e.lastEffect=n.next=n:(s=t.next,t.next=n,n.next=s,e.lastEffect=n)),n}function Yc(){return Ln().memoizedState}function Ds(n,e,t,s){var a=Fn();B.flags|=n,a.memoizedState=es(1|e,t,void 0,s===void 0?null:s)}function wa(n,e,t,s){var a=Ln();s=s===void 0?null:s;var r=void 0;if(Y!==null){var l=Y.memoizedState;if(r=l.destroy,s!==null&&jl(s,l.deps)){a.memoizedState=es(e,t,r,s);return}}B.flags|=n,a.memoizedState=es(1|e,t,r,s)}function $i(n,e){return Ds(8390656,8,n,e)}function Dl(n,e){return wa(2048,8,n,e)}function Gc(n,e){return wa(4,2,n,e)}function Xc(n,e){return wa(4,4,n,e)}function Jc(n,e){if(typeof e=="function")return n=n(),e(n),function(){e(null)};if(e!=null)return n=n(),e.current=n,function(){e.current=null}}function Zc(n,e,t){return t=t!=null?t.concat([n]):null,wa(4,4,Jc.bind(null,e,n),t)}function bl(){}function nu(n,e){var t=Ln();e=e===void 0?null:e;var s=t.memoizedState;return s!==null&&e!==null&&jl(e,s[1])?s[0]:(t.memoizedState=[n,e],n)}function eu(n,e){var t=Ln();e=e===void 0?null:e;var s=t.memoizedState;return s!==null&&e!==null&&jl(e,s[1])?s[0]:(n=n(),t.memoizedState=[n,e],n)}function tu(n,e,t){return Me&21?(Dn(t,e)||(t=ic(),B.lanes|=t,De|=t,n.baseState=!0),e):(n.baseState&&(n.baseState=!1,fn=!0),n.memoizedState=t)}function Kd(n,e){var t=M;M=t!==0&&4>t?t:4,n(!0);var s=Xa.transition;Xa.transition={};try{n(!1),e()}finally{M=t,Xa.transition=s}}function su(){return Ln().memoizedState}function Yd(n,e,t){var s=fe(n);if(t={lane:s,action:t,hasEagerState:!1,eagerState:null,next:null},au(n))ru(e,t);else if(t=Uc(n,e,t,s),t!==null){var a=cn();Mn(t,n,s,a),lu(t,e,s)}}function Gd(n,e,t){var s=fe(n),a={lane:s,action:t,hasEagerState:!1,eagerState:null,next:null};if(au(n))ru(e,a);else{var r=n.alternate;if(n.lanes===0&&(r===null||r.lanes===0)&&(r=e.lastRenderedReducer,r!==null))try{var l=e.lastRenderedState,i=r(l,t);if(a.hasEagerState=!0,a.eagerState=i,Dn(i,l)){var o=e.interleaved;o===null?(a.next=a,Ll(e)):(a.next=o.next,o.next=a),e.interleaved=a;return}}catch{}finally{}t=Uc(n,e,a,s),t!==null&&(a=cn(),Mn(t,n,s,a),lu(t,e,s))}}function au(n){var e=n.alternate;return n===B||e!==null&&e===B}function ru(n,e){Dt=aa=!0;var t=n.pending;t===null?e.next=e:(e.next=t.next,t.next=e),n.pending=e}function lu(n,e,t){if(t&4194240){var s=e.lanes;s&=n.pendingLanes,t|=s,e.lanes=t,hl(n,t)}}var ra={readContext:Tn,useCallback:sn,useContext:sn,useEffect:sn,useImperativeHandle:sn,useInsertionEffect:sn,useLayoutEffect:sn,useMemo:sn,useReducer:sn,useRef:sn,useState:sn,useDebugValue:sn,useDeferredValue:sn,useTransition:sn,useMutableSource:sn,useSyncExternalStore:sn,useId:sn,unstable_isNewReconciler:!1},Xd={readContext:Tn,useCallback:function(n,e){return Fn().memoizedState=[n,e===void 0?null:e],n},useContext:Tn,useEffect:$i,useImperativeHandle:function(n,e,t){return t=t!=null?t.concat([n]):null,Ds(4194308,4,Jc.bind(null,e,n),t)},useLayoutEffect:function(n,e){return Ds(4194308,4,n,e)},useInsertionEffect:function(n,e){return Ds(4,2,n,e)},useMemo:function(n,e){var t=Fn();return e=e===void 0?null:e,n=n(),t.memoizedState=[n,e],n},useReducer:function(n,e,t){var s=Fn();return e=t!==void 0?t(e):e,s.memoizedState=s.baseState=e,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:e},s.queue=n,n=n.dispatch=Yd.bind(null,B,n),[s.memoizedState,n]},useRef:function(n){var e=Fn();return n={current:n},e.memoizedState=n},useState:Hi,useDebugValue:bl,useDeferredValue:function(n){return Fn().memoizedState=n},useTransition:function(){var n=Hi(!1),e=n[0];return n=Kd.bind(null,n[1]),Fn().memoizedState=n,[e,n]},useMutableSource:function(){},useSyncExternalStore:function(n,e,t){var s=B,a=Fn();if(U){if(t===void 0)throw Error(k(407));t=t()}else{if(t=e(),Z===null)throw Error(k(349));Me&30||$c(s,e,t)}a.memoizedState=t;var r={value:t,getSnapshot:e};return a.queue=r,$i(Qc.bind(null,s,r,n),[n]),s.flags|=2048,es(9,Vc.bind(null,s,r,t,e),void 0,null),t},useId:function(){var n=Fn(),e=Z.identifierPrefix;if(U){var t=Vn,s=$n;t=(s&~(1<<32-In(s)-1)).toString(32)+t,e=":"+e+"R"+t,t=Zt++,0<t&&(e+="H"+t.toString(32)),e+=":"}else t=qd++,e=":"+e+"r"+t.toString(32)+":";return n.memoizedState=e},unstable_isNewReconciler:!1},Jd={readContext:Tn,useCallback:nu,useContext:Tn,useEffect:Dl,useImperativeHandle:Zc,useInsertionEffect:Gc,useLayoutEffect:Xc,useMemo:eu,useReducer:Ja,useRef:Yc,useState:function(){return Ja(ns)},useDebugValue:bl,useDeferredValue:function(n){var e=Ln();return tu(e,Y.memoizedState,n)},useTransition:function(){var n=Ja(ns)[0],e=Ln().memoizedState;return[n,e]},useMutableSource:Wc,useSyncExternalStore:Hc,useId:su,unstable_isNewReconciler:!1},Zd={readContext:Tn,useCallback:nu,useContext:Tn,useEffect:Dl,useImperativeHandle:Zc,useInsertionEffect:Gc,useLayoutEffect:Xc,useMemo:eu,useReducer:Za,useRef:Yc,useState:function(){return Za(ns)},useDebugValue:bl,useDeferredValue:function(n){var e=Ln();return Y===null?e.memoizedState=n:tu(e,Y.memoizedState,n)},useTransition:function(){var n=Za(ns)[0],e=Ln().memoizedState;return[n,e]},useMutableSource:Wc,useSyncExternalStore:Hc,useId:su,unstable_isNewReconciler:!1};function zn(n,e){if(n&&n.defaultProps){e=W({},e),n=n.defaultProps;for(var t in n)e[t]===void 0&&(e[t]=n[t]);return e}return e}function br(n,e,t,s){e=n.memoizedState,t=t(s,e),t=t==null?e:W({},e,t),n.memoizedState=t,n.lanes===0&&(n.updateQueue.baseState=t)}var ka={isMounted:function(n){return(n=n._reactInternals)?Ue(n)===n:!1},enqueueSetState:function(n,e,t){n=n._reactInternals;var s=cn(),a=fe(n),r=Qn(s,a);r.payload=e,t!=null&&(r.callback=t),e=pe(n,r,a),e!==null&&(Mn(e,n,a,s),Is(e,n,a))},enqueueReplaceState:function(n,e,t){n=n._reactInternals;var s=cn(),a=fe(n),r=Qn(s,a);r.tag=1,r.payload=e,t!=null&&(r.callback=t),e=pe(n,r,a),e!==null&&(Mn(e,n,a,s),Is(e,n,a))},enqueueForceUpdate:function(n,e){n=n._reactInternals;var t=cn(),s=fe(n),a=Qn(t,s);a.tag=2,e!=null&&(a.callback=e),e=pe(n,a,s),e!==null&&(Mn(e,n,s,t),Is(e,n,s))}};function Vi(n,e,t,s,a,r,l){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(s,r,l):e.prototype&&e.prototype.isPureReactComponent?!qt(t,s)||!qt(a,r):!0}function iu(n,e,t){var s=!1,a=ye,r=e.contextType;return typeof r=="object"&&r!==null?r=Tn(r):(a=mn(e)?je:ln.current,s=e.contextTypes,r=(s=s!=null)?lt(n,a):ye),e=new e(t,r),n.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=ka,n.stateNode=e,e._reactInternals=n,s&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=a,n.__reactInternalMemoizedMaskedChildContext=r),e}function Qi(n,e,t,s){n=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(t,s),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(t,s),e.state!==n&&ka.enqueueReplaceState(e,e.state,null)}function Fr(n,e,t,s){var a=n.stateNode;a.props=t,a.state=n.memoizedState,a.refs={},Ol(n);var r=e.contextType;typeof r=="object"&&r!==null?a.context=Tn(r):(r=mn(e)?je:ln.current,a.context=lt(n,r)),a.state=n.memoizedState,r=e.getDerivedStateFromProps,typeof r=="function"&&(br(n,e,r,t),a.state=n.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(e=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),e!==a.state&&ka.enqueueReplaceState(a,a.state,null),ta(n,t,a,s),a.state=n.memoizedState),typeof a.componentDidMount=="function"&&(n.flags|=4194308)}function ut(n,e){try{var t="",s=e;do t+=Tp(s),s=s.return;while(s);var a=t}catch(r){a=`
Error generating stack: `+r.message+`
`+r.stack}return{value:n,source:e,stack:a,digest:null}}function nr(n,e,t){return{value:n,source:null,stack:t??null,digest:e??null}}function Ur(n,e){try{console.error(e.value)}catch(t){setTimeout(function(){throw t})}}var nf=typeof WeakMap=="function"?WeakMap:Map;function ou(n,e,t){t=Qn(-1,t),t.tag=3,t.payload={element:null};var s=e.value;return t.callback=function(){ia||(ia=!0,Yr=s),Ur(n,e)},t}function cu(n,e,t){t=Qn(-1,t),t.tag=3;var s=n.type.getDerivedStateFromError;if(typeof s=="function"){var a=e.value;t.payload=function(){return s(a)},t.callback=function(){Ur(n,e)}}var r=n.stateNode;return r!==null&&typeof r.componentDidCatch=="function"&&(t.callback=function(){Ur(n,e),typeof s!="function"&&(de===null?de=new Set([this]):de.add(this));var l=e.stack;this.componentDidCatch(e.value,{componentStack:l!==null?l:""})}),t}function qi(n,e,t){var s=n.pingCache;if(s===null){s=n.pingCache=new nf;var a=new Set;s.set(e,a)}else a=s.get(e),a===void 0&&(a=new Set,s.set(e,a));a.has(t)||(a.add(t),n=mf.bind(null,n,e,t),e.then(n,n))}function Ki(n){do{var e;if((e=n.tag===13)&&(e=n.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return n;n=n.return}while(n!==null);return null}function Yi(n,e,t,s,a){return n.mode&1?(n.flags|=65536,n.lanes=a,n):(n===e?n.flags|=65536:(n.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(e=Qn(-1,1),e.tag=2,pe(t,e,1))),t.lanes|=1),n)}var ef=Xn.ReactCurrentOwner,fn=!1;function on(n,e,t,s){e.child=n===null?Fc(e,null,t,s):ot(e,n.child,t,s)}function Gi(n,e,t,s,a){t=t.render;var r=e.ref;return st(e,a),s=Il(n,e,t,s,r,a),t=Ml(),n!==null&&!fn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~a,Gn(n,e,a)):(U&&t&&Sl(e),e.flags|=1,on(n,e,s,a),e.child)}function Xi(n,e,t,s,a){if(n===null){var r=t.type;return typeof r=="function"&&!Vl(r)&&r.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(e.tag=15,e.type=r,uu(n,e,r,s,a)):(n=As(t.type,null,s,e,e.mode,a),n.ref=e.ref,n.return=e,e.child=n)}if(r=n.child,!(n.lanes&a)){var l=r.memoizedProps;if(t=t.compare,t=t!==null?t:qt,t(l,s)&&n.ref===e.ref)return Gn(n,e,a)}return e.flags|=1,n=he(r,s),n.ref=e.ref,n.return=e,e.child=n}function uu(n,e,t,s,a){if(n!==null){var r=n.memoizedProps;if(qt(r,s)&&n.ref===e.ref)if(fn=!1,e.pendingProps=s=r,(n.lanes&a)!==0)n.flags&131072&&(fn=!0);else return e.lanes=n.lanes,Gn(n,e,a)}return Ar(n,e,t,s,a)}function pu(n,e,t){var s=e.pendingProps,a=s.children,r=n!==null?n.memoizedState:null;if(s.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},D(Je,yn),yn|=t;else{if(!(t&1073741824))return n=r!==null?r.baseLanes|t:t,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:n,cachePool:null,transitions:null},e.updateQueue=null,D(Je,yn),yn|=n,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},s=r!==null?r.baseLanes:t,D(Je,yn),yn|=s}else r!==null?(s=r.baseLanes|t,e.memoizedState=null):s=t,D(Je,yn),yn|=s;return on(n,e,a,t),e.child}function du(n,e){var t=e.ref;(n===null&&t!==null||n!==null&&n.ref!==t)&&(e.flags|=512,e.flags|=2097152)}function Ar(n,e,t,s,a){var r=mn(t)?je:ln.current;return r=lt(e,r),st(e,a),t=Il(n,e,t,s,r,a),s=Ml(),n!==null&&!fn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~a,Gn(n,e,a)):(U&&s&&Sl(e),e.flags|=1,on(n,e,t,a),e.child)}function Ji(n,e,t,s,a){if(mn(t)){var r=!0;Xs(e)}else r=!1;if(st(e,a),e.stateNode===null)bs(n,e),iu(e,t,s),Fr(e,t,s,a),s=!0;else if(n===null){var l=e.stateNode,i=e.memoizedProps;l.props=i;var o=l.context,c=t.contextType;typeof c=="object"&&c!==null?c=Tn(c):(c=mn(t)?je:ln.current,c=lt(e,c));var m=t.getDerivedStateFromProps,d=typeof m=="function"||typeof l.getSnapshotBeforeUpdate=="function";d||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i!==s||o!==c)&&Qi(e,l,s,c),ee=!1;var h=e.memoizedState;l.state=h,ta(e,s,l,a),o=e.memoizedState,i!==s||h!==o||hn.current||ee?(typeof m=="function"&&(br(e,t,m,s),o=e.memoizedState),(i=ee||Vi(e,t,i,s,h,o,c))?(d||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(e.flags|=4194308)):(typeof l.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=s,e.memoizedState=o),l.props=s,l.state=o,l.context=c,s=i):(typeof l.componentDidMount=="function"&&(e.flags|=4194308),s=!1)}else{l=e.stateNode,Ac(n,e),i=e.memoizedProps,c=e.type===e.elementType?i:zn(e.type,i),l.props=c,d=e.pendingProps,h=l.context,o=t.contextType,typeof o=="object"&&o!==null?o=Tn(o):(o=mn(t)?je:ln.current,o=lt(e,o));var y=t.getDerivedStateFromProps;(m=typeof y=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i!==d||h!==o)&&Qi(e,l,s,o),ee=!1,h=e.memoizedState,l.state=h,ta(e,s,l,a);var w=e.memoizedState;i!==d||h!==w||hn.current||ee?(typeof y=="function"&&(br(e,t,y,s),w=e.memoizedState),(c=ee||Vi(e,t,c,s,h,w,o)||!1)?(m||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(s,w,o),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(s,w,o)),typeof l.componentDidUpdate=="function"&&(e.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof l.componentDidUpdate!="function"||i===n.memoizedProps&&h===n.memoizedState||(e.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===n.memoizedProps&&h===n.memoizedState||(e.flags|=1024),e.memoizedProps=s,e.memoizedState=w),l.props=s,l.state=w,l.context=o,s=c):(typeof l.componentDidUpdate!="function"||i===n.memoizedProps&&h===n.memoizedState||(e.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===n.memoizedProps&&h===n.memoizedState||(e.flags|=1024),s=!1)}return Br(n,e,t,s,r,a)}function Br(n,e,t,s,a,r){du(n,e);var l=(e.flags&128)!==0;if(!s&&!l)return a&&bi(e,t,!1),Gn(n,e,r);s=e.stateNode,ef.current=e;var i=l&&typeof t.getDerivedStateFromError!="function"?null:s.render();return e.flags|=1,n!==null&&l?(e.child=ot(e,n.child,null,r),e.child=ot(e,null,i,r)):on(n,e,i,r),e.memoizedState=s.state,a&&bi(e,t,!0),e.child}function fu(n){var e=n.stateNode;e.pendingContext?Di(n,e.pendingContext,e.pendingContext!==e.context):e.context&&Di(n,e.context,!1),Nl(n,e.containerInfo)}function Zi(n,e,t,s,a){return it(),Cl(a),e.flags|=256,on(n,e,t,s),e.child}var Wr={dehydrated:null,treeContext:null,retryLane:0};function Hr(n){return{baseLanes:n,cachePool:null,transitions:null}}function hu(n,e,t){var s=e.pendingProps,a=A.current,r=!1,l=(e.flags&128)!==0,i;if((i=l)||(i=n!==null&&n.memoizedState===null?!1:(a&2)!==0),i?(r=!0,e.flags&=-129):(n===null||n.memoizedState!==null)&&(a|=1),D(A,a&1),n===null)return Mr(e),n=e.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?(e.mode&1?n.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(l=s.children,n=s.fallback,r?(s=e.mode,r=e.child,l={mode:"hidden",children:l},!(s&1)&&r!==null?(r.childLanes=0,r.pendingProps=l):r=_a(l,s,0,null),n=Re(n,s,t,null),r.return=e,n.return=e,r.sibling=n,e.child=r,e.child.memoizedState=Hr(t),e.memoizedState=Wr,n):Fl(e,l));if(a=n.memoizedState,a!==null&&(i=a.dehydrated,i!==null))return tf(n,e,l,s,i,a,t);if(r){r=s.fallback,l=e.mode,a=n.child,i=a.sibling;var o={mode:"hidden",children:s.children};return!(l&1)&&e.child!==a?(s=e.child,s.childLanes=0,s.pendingProps=o,e.deletions=null):(s=he(a,o),s.subtreeFlags=a.subtreeFlags&14680064),i!==null?r=he(i,r):(r=Re(r,l,t,null),r.flags|=2),r.return=e,s.return=e,s.sibling=r,e.child=s,s=r,r=e.child,l=n.child.memoizedState,l=l===null?Hr(t):{baseLanes:l.baseLanes|t,cachePool:null,transitions:l.transitions},r.memoizedState=l,r.childLanes=n.childLanes&~t,e.memoizedState=Wr,s}return r=n.child,n=r.sibling,s=he(r,{mode:"visible",children:s.children}),!(e.mode&1)&&(s.lanes=t),s.return=e,s.sibling=null,n!==null&&(t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)),e.child=s,e.memoizedState=null,s}function Fl(n,e){return e=_a({mode:"visible",children:e},n.mode,0,null),e.return=n,n.child=e}function Es(n,e,t,s){return s!==null&&Cl(s),ot(e,n.child,null,t),n=Fl(e,e.pendingProps.children),n.flags|=2,e.memoizedState=null,n}function tf(n,e,t,s,a,r,l){if(t)return e.flags&256?(e.flags&=-257,s=nr(Error(k(422))),Es(n,e,l,s)):e.memoizedState!==null?(e.child=n.child,e.flags|=128,null):(r=s.fallback,a=e.mode,s=_a({mode:"visible",children:s.children},a,0,null),r=Re(r,a,l,null),r.flags|=2,s.return=e,r.return=e,s.sibling=r,e.child=s,e.mode&1&&ot(e,n.child,null,l),e.child.memoizedState=Hr(l),e.memoizedState=Wr,r);if(!(e.mode&1))return Es(n,e,l,null);if(a.data==="$!"){if(s=a.nextSibling&&a.nextSibling.dataset,s)var i=s.dgst;return s=i,r=Error(k(419)),s=nr(r,s,void 0),Es(n,e,l,s)}if(i=(l&n.childLanes)!==0,fn||i){if(s=Z,s!==null){switch(l&-l){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=a&(s.suspendedLanes|l)?0:a,a!==0&&a!==r.retryLane&&(r.retryLane=a,Yn(n,a),Mn(s,n,a,-1))}return $l(),s=nr(Error(k(421))),Es(n,e,l,s)}return a.data==="$?"?(e.flags|=128,e.child=n.child,e=vf.bind(null,n),a._reactRetry=e,null):(n=r.treeContext,gn=ue(a.nextSibling),wn=e,U=!0,jn=null,n!==null&&(_n[Cn++]=$n,_n[Cn++]=Vn,_n[Cn++]=Ie,$n=n.id,Vn=n.overflow,Ie=e),e=Fl(e,s.children),e.flags|=4096,e)}function no(n,e,t){n.lanes|=e;var s=n.alternate;s!==null&&(s.lanes|=e),Dr(n.return,e,t)}function er(n,e,t,s,a){var r=n.memoizedState;r===null?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:s,tail:t,tailMode:a}:(r.isBackwards=e,r.rendering=null,r.renderingStartTime=0,r.last=s,r.tail=t,r.tailMode=a)}function mu(n,e,t){var s=e.pendingProps,a=s.revealOrder,r=s.tail;if(on(n,e,s.children,t),s=A.current,s&2)s=s&1|2,e.flags|=128;else{if(n!==null&&n.flags&128)n:for(n=e.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&no(n,t,e);else if(n.tag===19)no(n,t,e);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break n;for(;n.sibling===null;){if(n.return===null||n.return===e)break n;n=n.return}n.sibling.return=n.return,n=n.sibling}s&=1}if(D(A,s),!(e.mode&1))e.memoizedState=null;else switch(a){case"forwards":for(t=e.child,a=null;t!==null;)n=t.alternate,n!==null&&sa(n)===null&&(a=t),t=t.sibling;t=a,t===null?(a=e.child,e.child=null):(a=t.sibling,t.sibling=null),er(e,!1,a,t,r);break;case"backwards":for(t=null,a=e.child,e.child=null;a!==null;){if(n=a.alternate,n!==null&&sa(n)===null){e.child=a;break}n=a.sibling,a.sibling=t,t=a,a=n}er(e,!0,t,null,r);break;case"together":er(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function bs(n,e){!(e.mode&1)&&n!==null&&(n.alternate=null,e.alternate=null,e.flags|=2)}function Gn(n,e,t){if(n!==null&&(e.dependencies=n.dependencies),De|=e.lanes,!(t&e.childLanes))return null;if(n!==null&&e.child!==n.child)throw Error(k(153));if(e.child!==null){for(n=e.child,t=he(n,n.pendingProps),e.child=t,t.return=e;n.sibling!==null;)n=n.sibling,t=t.sibling=he(n,n.pendingProps),t.return=e;t.sibling=null}return e.child}function sf(n,e,t){switch(e.tag){case 3:fu(e),it();break;case 5:Bc(e);break;case 1:mn(e.type)&&Xs(e);break;case 4:Nl(e,e.stateNode.containerInfo);break;case 10:var s=e.type._context,a=e.memoizedProps.value;D(na,s._currentValue),s._currentValue=a;break;case 13:if(s=e.memoizedState,s!==null)return s.dehydrated!==null?(D(A,A.current&1),e.flags|=128,null):t&e.child.childLanes?hu(n,e,t):(D(A,A.current&1),n=Gn(n,e,t),n!==null?n.sibling:null);D(A,A.current&1);break;case 19:if(s=(t&e.childLanes)!==0,n.flags&128){if(s)return mu(n,e,t);e.flags|=128}if(a=e.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),D(A,A.current),s)break;return null;case 22:case 23:return e.lanes=0,pu(n,e,t)}return Gn(n,e,t)}var vu,$r,yu,gu;vu=function(n,e){for(var t=e.child;t!==null;){if(t.tag===5||t.tag===6)n.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};$r=function(){};yu=function(n,e,t,s){var a=n.memoizedProps;if(a!==s){n=e.stateNode,Ne(Bn.current);var r=null;switch(t){case"input":a=dr(n,a),s=dr(n,s),r=[];break;case"select":a=W({},a,{value:void 0}),s=W({},s,{value:void 0}),r=[];break;case"textarea":a=mr(n,a),s=mr(n,s),r=[];break;default:typeof a.onClick!="function"&&typeof s.onClick=="function"&&(n.onclick=Ys)}yr(t,s);var l;t=null;for(c in a)if(!s.hasOwnProperty(c)&&a.hasOwnProperty(c)&&a[c]!=null)if(c==="style"){var i=a[c];for(l in i)i.hasOwnProperty(l)&&(t||(t={}),t[l]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(At.hasOwnProperty(c)?r||(r=[]):(r=r||[]).push(c,null));for(c in s){var o=s[c];if(i=a!=null?a[c]:void 0,s.hasOwnProperty(c)&&o!==i&&(o!=null||i!=null))if(c==="style")if(i){for(l in i)!i.hasOwnProperty(l)||o&&o.hasOwnProperty(l)||(t||(t={}),t[l]="");for(l in o)o.hasOwnProperty(l)&&i[l]!==o[l]&&(t||(t={}),t[l]=o[l])}else t||(r||(r=[]),r.push(c,t)),t=o;else c==="dangerouslySetInnerHTML"?(o=o?o.__html:void 0,i=i?i.__html:void 0,o!=null&&i!==o&&(r=r||[]).push(c,o)):c==="children"?typeof o!="string"&&typeof o!="number"||(r=r||[]).push(c,""+o):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(At.hasOwnProperty(c)?(o!=null&&c==="onScroll"&&b("scroll",n),r||i===o||(r=[])):(r=r||[]).push(c,o))}t&&(r=r||[]).push("style",t);var c=r;(e.updateQueue=c)&&(e.flags|=4)}};gu=function(n,e,t,s){t!==s&&(e.flags|=4)};function Et(n,e){if(!U)switch(n.tailMode){case"hidden":e=n.tail;for(var t=null;e!==null;)e.alternate!==null&&(t=e),e=e.sibling;t===null?n.tail=null:t.sibling=null;break;case"collapsed":t=n.tail;for(var s=null;t!==null;)t.alternate!==null&&(s=t),t=t.sibling;s===null?e||n.tail===null?n.tail=null:n.tail.sibling=null:s.sibling=null}}function an(n){var e=n.alternate!==null&&n.alternate.child===n.child,t=0,s=0;if(e)for(var a=n.child;a!==null;)t|=a.lanes|a.childLanes,s|=a.subtreeFlags&14680064,s|=a.flags&14680064,a.return=n,a=a.sibling;else for(a=n.child;a!==null;)t|=a.lanes|a.childLanes,s|=a.subtreeFlags,s|=a.flags,a.return=n,a=a.sibling;return n.subtreeFlags|=s,n.childLanes=t,e}function af(n,e,t){var s=e.pendingProps;switch(_l(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return an(e),null;case 1:return mn(e.type)&&Gs(),an(e),null;case 3:return s=e.stateNode,ct(),F(hn),F(ln),Rl(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(n===null||n.child===null)&&(_s(e)?e.flags|=4:n===null||n.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,jn!==null&&(Jr(jn),jn=null))),$r(n,e),an(e),null;case 5:zl(e);var a=Ne(Jt.current);if(t=e.type,n!==null&&e.stateNode!=null)yu(n,e,t,s,a),n.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!s){if(e.stateNode===null)throw Error(k(166));return an(e),null}if(n=Ne(Bn.current),_s(e)){s=e.stateNode,t=e.type;var r=e.memoizedProps;switch(s[Un]=e,s[Gt]=r,n=(e.mode&1)!==0,t){case"dialog":b("cancel",s),b("close",s);break;case"iframe":case"object":case"embed":b("load",s);break;case"video":case"audio":for(a=0;a<Nt.length;a++)b(Nt[a],s);break;case"source":b("error",s);break;case"img":case"image":case"link":b("error",s),b("load",s);break;case"details":b("toggle",s);break;case"input":ci(s,r),b("invalid",s);break;case"select":s._wrapperState={wasMultiple:!!r.multiple},b("invalid",s);break;case"textarea":pi(s,r),b("invalid",s)}yr(t,r),a=null;for(var l in r)if(r.hasOwnProperty(l)){var i=r[l];l==="children"?typeof i=="string"?s.textContent!==i&&(r.suppressHydrationWarning!==!0&&Ss(s.textContent,i,n),a=["children",i]):typeof i=="number"&&s.textContent!==""+i&&(r.suppressHydrationWarning!==!0&&Ss(s.textContent,i,n),a=["children",""+i]):At.hasOwnProperty(l)&&i!=null&&l==="onScroll"&&b("scroll",s)}switch(t){case"input":hs(s),ui(s,r,!0);break;case"textarea":hs(s),di(s);break;case"select":case"option":break;default:typeof r.onClick=="function"&&(s.onclick=Ys)}s=a,e.updateQueue=s,s!==null&&(e.flags|=4)}else{l=a.nodeType===9?a:a.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=Qo(t)),n==="http://www.w3.org/1999/xhtml"?t==="script"?(n=l.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof s.is=="string"?n=l.createElement(t,{is:s.is}):(n=l.createElement(t),t==="select"&&(l=n,s.multiple?l.multiple=!0:s.size&&(l.size=s.size))):n=l.createElementNS(n,t),n[Un]=e,n[Gt]=s,vu(n,e,!1,!1),e.stateNode=n;n:{switch(l=gr(t,s),t){case"dialog":b("cancel",n),b("close",n),a=s;break;case"iframe":case"object":case"embed":b("load",n),a=s;break;case"video":case"audio":for(a=0;a<Nt.length;a++)b(Nt[a],n);a=s;break;case"source":b("error",n),a=s;break;case"img":case"image":case"link":b("error",n),b("load",n),a=s;break;case"details":b("toggle",n),a=s;break;case"input":ci(n,s),a=dr(n,s),b("invalid",n);break;case"option":a=s;break;case"select":n._wrapperState={wasMultiple:!!s.multiple},a=W({},s,{value:void 0}),b("invalid",n);break;case"textarea":pi(n,s),a=mr(n,s),b("invalid",n);break;default:a=s}yr(t,a),i=a;for(r in i)if(i.hasOwnProperty(r)){var o=i[r];r==="style"?Yo(n,o):r==="dangerouslySetInnerHTML"?(o=o?o.__html:void 0,o!=null&&qo(n,o)):r==="children"?typeof o=="string"?(t!=="textarea"||o!=="")&&Bt(n,o):typeof o=="number"&&Bt(n,""+o):r!=="suppressContentEditableWarning"&&r!=="suppressHydrationWarning"&&r!=="autoFocus"&&(At.hasOwnProperty(r)?o!=null&&r==="onScroll"&&b("scroll",n):o!=null&&ol(n,r,o,l))}switch(t){case"input":hs(n),ui(n,s,!1);break;case"textarea":hs(n),di(n);break;case"option":s.value!=null&&n.setAttribute("value",""+ve(s.value));break;case"select":n.multiple=!!s.multiple,r=s.value,r!=null?Ze(n,!!s.multiple,r,!1):s.defaultValue!=null&&Ze(n,!!s.multiple,s.defaultValue,!0);break;default:typeof a.onClick=="function"&&(n.onclick=Ys)}switch(t){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break n;case"img":s=!0;break n;default:s=!1}}s&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return an(e),null;case 6:if(n&&e.stateNode!=null)gu(n,e,n.memoizedProps,s);else{if(typeof s!="string"&&e.stateNode===null)throw Error(k(166));if(t=Ne(Jt.current),Ne(Bn.current),_s(e)){if(s=e.stateNode,t=e.memoizedProps,s[Un]=e,(r=s.nodeValue!==t)&&(n=wn,n!==null))switch(n.tag){case 3:Ss(s.nodeValue,t,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Ss(s.nodeValue,t,(n.mode&1)!==0)}r&&(e.flags|=4)}else s=(t.nodeType===9?t:t.ownerDocument).createTextNode(s),s[Un]=e,e.stateNode=s}return an(e),null;case 13:if(F(A),s=e.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(U&&gn!==null&&e.mode&1&&!(e.flags&128))Dc(),it(),e.flags|=98560,r=!1;else if(r=_s(e),s!==null&&s.dehydrated!==null){if(n===null){if(!r)throw Error(k(318));if(r=e.memoizedState,r=r!==null?r.dehydrated:null,!r)throw Error(k(317));r[Un]=e}else it(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;an(e),r=!1}else jn!==null&&(Jr(jn),jn=null),r=!0;if(!r)return e.flags&65536?e:null}return e.flags&128?(e.lanes=t,e):(s=s!==null,s!==(n!==null&&n.memoizedState!==null)&&s&&(e.child.flags|=8192,e.mode&1&&(n===null||A.current&1?G===0&&(G=3):$l())),e.updateQueue!==null&&(e.flags|=4),an(e),null);case 4:return ct(),$r(n,e),n===null&&Kt(e.stateNode.containerInfo),an(e),null;case 10:return Tl(e.type._context),an(e),null;case 17:return mn(e.type)&&Gs(),an(e),null;case 19:if(F(A),r=e.memoizedState,r===null)return an(e),null;if(s=(e.flags&128)!==0,l=r.rendering,l===null)if(s)Et(r,!1);else{if(G!==0||n!==null&&n.flags&128)for(n=e.child;n!==null;){if(l=sa(n),l!==null){for(e.flags|=128,Et(r,!1),s=l.updateQueue,s!==null&&(e.updateQueue=s,e.flags|=4),e.subtreeFlags=0,s=t,t=e.child;t!==null;)r=t,n=s,r.flags&=14680066,l=r.alternate,l===null?(r.childLanes=0,r.lanes=n,r.child=null,r.subtreeFlags=0,r.memoizedProps=null,r.memoizedState=null,r.updateQueue=null,r.dependencies=null,r.stateNode=null):(r.childLanes=l.childLanes,r.lanes=l.lanes,r.child=l.child,r.subtreeFlags=0,r.deletions=null,r.memoizedProps=l.memoizedProps,r.memoizedState=l.memoizedState,r.updateQueue=l.updateQueue,r.type=l.type,n=l.dependencies,r.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t=t.sibling;return D(A,A.current&1|2),e.child}n=n.sibling}r.tail!==null&&Q()>pt&&(e.flags|=128,s=!0,Et(r,!1),e.lanes=4194304)}else{if(!s)if(n=sa(l),n!==null){if(e.flags|=128,s=!0,t=n.updateQueue,t!==null&&(e.updateQueue=t,e.flags|=4),Et(r,!0),r.tail===null&&r.tailMode==="hidden"&&!l.alternate&&!U)return an(e),null}else 2*Q()-r.renderingStartTime>pt&&t!==1073741824&&(e.flags|=128,s=!0,Et(r,!1),e.lanes=4194304);r.isBackwards?(l.sibling=e.child,e.child=l):(t=r.last,t!==null?t.sibling=l:e.child=l,r.last=l)}return r.tail!==null?(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Q(),e.sibling=null,t=A.current,D(A,s?t&1|2:t&1),e):(an(e),null);case 22:case 23:return Hl(),s=e.memoizedState!==null,n!==null&&n.memoizedState!==null!==s&&(e.flags|=8192),s&&e.mode&1?yn&1073741824&&(an(e),e.subtreeFlags&6&&(e.flags|=8192)):an(e),null;case 24:return null;case 25:return null}throw Error(k(156,e.tag))}function rf(n,e){switch(_l(e),e.tag){case 1:return mn(e.type)&&Gs(),n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 3:return ct(),F(hn),F(ln),Rl(),n=e.flags,n&65536&&!(n&128)?(e.flags=n&-65537|128,e):null;case 5:return zl(e),null;case 13:if(F(A),n=e.memoizedState,n!==null&&n.dehydrated!==null){if(e.alternate===null)throw Error(k(340));it()}return n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 19:return F(A),null;case 4:return ct(),null;case 10:return Tl(e.type._context),null;case 22:case 23:return Hl(),null;case 24:return null;default:return null}}var Ps=!1,rn=!1,lf=typeof WeakSet=="function"?WeakSet:Set,C=null;function Xe(n,e){var t=n.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(s){H(n,e,s)}else t.current=null}function Vr(n,e,t){try{t()}catch(s){H(n,e,s)}}var eo=!1;function of(n,e){if(Lr=Qs,n=_c(),xl(n)){if("selectionStart"in n)var t={start:n.selectionStart,end:n.selectionEnd};else n:{t=(t=n.ownerDocument)&&t.defaultView||window;var s=t.getSelection&&t.getSelection();if(s&&s.rangeCount!==0){t=s.anchorNode;var a=s.anchorOffset,r=s.focusNode;s=s.focusOffset;try{t.nodeType,r.nodeType}catch{t=null;break n}var l=0,i=-1,o=-1,c=0,m=0,d=n,h=null;e:for(;;){for(var y;d!==t||a!==0&&d.nodeType!==3||(i=l+a),d!==r||s!==0&&d.nodeType!==3||(o=l+s),d.nodeType===3&&(l+=d.nodeValue.length),(y=d.firstChild)!==null;)h=d,d=y;for(;;){if(d===n)break e;if(h===t&&++c===a&&(i=l),h===r&&++m===s&&(o=l),(y=d.nextSibling)!==null)break;d=h,h=d.parentNode}d=y}t=i===-1||o===-1?null:{start:i,end:o}}else t=null}t=t||{start:0,end:0}}else t=null;for(Or={focusedElem:n,selectionRange:t},Qs=!1,C=e;C!==null;)if(e=C,n=e.child,(e.subtreeFlags&1028)!==0&&n!==null)n.return=e,C=n;else for(;C!==null;){e=C;try{var w=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var g=w.memoizedProps,_=w.memoizedState,p=e.stateNode,u=p.getSnapshotBeforeUpdate(e.elementType===e.type?g:zn(e.type,g),_);p.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var f=e.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(k(163))}}catch(v){H(e,e.return,v)}if(n=e.sibling,n!==null){n.return=e.return,C=n;break}C=e.return}return w=eo,eo=!1,w}function bt(n,e,t){var s=e.updateQueue;if(s=s!==null?s.lastEffect:null,s!==null){var a=s=s.next;do{if((a.tag&n)===n){var r=a.destroy;a.destroy=void 0,r!==void 0&&Vr(e,t,r)}a=a.next}while(a!==s)}}function xa(n,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var t=e=e.next;do{if((t.tag&n)===n){var s=t.create;t.destroy=s()}t=t.next}while(t!==e)}}function Qr(n){var e=n.ref;if(e!==null){var t=n.stateNode;switch(n.tag){case 5:n=t;break;default:n=t}typeof e=="function"?e(n):e.current=n}}function wu(n){var e=n.alternate;e!==null&&(n.alternate=null,wu(e)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(e=n.stateNode,e!==null&&(delete e[Un],delete e[Gt],delete e[Rr],delete e[Hd],delete e[$d])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function ku(n){return n.tag===5||n.tag===3||n.tag===4}function to(n){n:for(;;){for(;n.sibling===null;){if(n.return===null||ku(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue n;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function qr(n,e,t){var s=n.tag;if(s===5||s===6)n=n.stateNode,e?t.nodeType===8?t.parentNode.insertBefore(n,e):t.insertBefore(n,e):(t.nodeType===8?(e=t.parentNode,e.insertBefore(n,t)):(e=t,e.appendChild(n)),t=t._reactRootContainer,t!=null||e.onclick!==null||(e.onclick=Ys));else if(s!==4&&(n=n.child,n!==null))for(qr(n,e,t),n=n.sibling;n!==null;)qr(n,e,t),n=n.sibling}function Kr(n,e,t){var s=n.tag;if(s===5||s===6)n=n.stateNode,e?t.insertBefore(n,e):t.appendChild(n);else if(s!==4&&(n=n.child,n!==null))for(Kr(n,e,t),n=n.sibling;n!==null;)Kr(n,e,t),n=n.sibling}var nn=null,Rn=!1;function Zn(n,e,t){for(t=t.child;t!==null;)xu(n,e,t),t=t.sibling}function xu(n,e,t){if(An&&typeof An.onCommitFiberUnmount=="function")try{An.onCommitFiberUnmount(fa,t)}catch{}switch(t.tag){case 5:rn||Xe(t,e);case 6:var s=nn,a=Rn;nn=null,Zn(n,e,t),nn=s,Rn=a,nn!==null&&(Rn?(n=nn,t=t.stateNode,n.nodeType===8?n.parentNode.removeChild(t):n.removeChild(t)):nn.removeChild(t.stateNode));break;case 18:nn!==null&&(Rn?(n=nn,t=t.stateNode,n.nodeType===8?Ka(n.parentNode,t):n.nodeType===1&&Ka(n,t),Vt(n)):Ka(nn,t.stateNode));break;case 4:s=nn,a=Rn,nn=t.stateNode.containerInfo,Rn=!0,Zn(n,e,t),nn=s,Rn=a;break;case 0:case 11:case 14:case 15:if(!rn&&(s=t.updateQueue,s!==null&&(s=s.lastEffect,s!==null))){a=s=s.next;do{var r=a,l=r.destroy;r=r.tag,l!==void 0&&(r&2||r&4)&&Vr(t,e,l),a=a.next}while(a!==s)}Zn(n,e,t);break;case 1:if(!rn&&(Xe(t,e),s=t.stateNode,typeof s.componentWillUnmount=="function"))try{s.props=t.memoizedProps,s.state=t.memoizedState,s.componentWillUnmount()}catch(i){H(t,e,i)}Zn(n,e,t);break;case 21:Zn(n,e,t);break;case 22:t.mode&1?(rn=(s=rn)||t.memoizedState!==null,Zn(n,e,t),rn=s):Zn(n,e,t);break;default:Zn(n,e,t)}}function so(n){var e=n.updateQueue;if(e!==null){n.updateQueue=null;var t=n.stateNode;t===null&&(t=n.stateNode=new lf),e.forEach(function(s){var a=yf.bind(null,n,s);t.has(s)||(t.add(s),s.then(a,a))})}}function Nn(n,e){var t=e.deletions;if(t!==null)for(var s=0;s<t.length;s++){var a=t[s];try{var r=n,l=e,i=l;n:for(;i!==null;){switch(i.tag){case 5:nn=i.stateNode,Rn=!1;break n;case 3:nn=i.stateNode.containerInfo,Rn=!0;break n;case 4:nn=i.stateNode.containerInfo,Rn=!0;break n}i=i.return}if(nn===null)throw Error(k(160));xu(r,l,a),nn=null,Rn=!1;var o=a.alternate;o!==null&&(o.return=null),a.return=null}catch(c){H(a,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Su(e,n),e=e.sibling}function Su(n,e){var t=n.alternate,s=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(Nn(e,n),bn(n),s&4){try{bt(3,n,n.return),xa(3,n)}catch(g){H(n,n.return,g)}try{bt(5,n,n.return)}catch(g){H(n,n.return,g)}}break;case 1:Nn(e,n),bn(n),s&512&&t!==null&&Xe(t,t.return);break;case 5:if(Nn(e,n),bn(n),s&512&&t!==null&&Xe(t,t.return),n.flags&32){var a=n.stateNode;try{Bt(a,"")}catch(g){H(n,n.return,g)}}if(s&4&&(a=n.stateNode,a!=null)){var r=n.memoizedProps,l=t!==null?t.memoizedProps:r,i=n.type,o=n.updateQueue;if(n.updateQueue=null,o!==null)try{i==="input"&&r.type==="radio"&&r.name!=null&&$o(a,r),gr(i,l);var c=gr(i,r);for(l=0;l<o.length;l+=2){var m=o[l],d=o[l+1];m==="style"?Yo(a,d):m==="dangerouslySetInnerHTML"?qo(a,d):m==="children"?Bt(a,d):ol(a,m,d,c)}switch(i){case"input":fr(a,r);break;case"textarea":Vo(a,r);break;case"select":var h=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!r.multiple;var y=r.value;y!=null?Ze(a,!!r.multiple,y,!1):h!==!!r.multiple&&(r.defaultValue!=null?Ze(a,!!r.multiple,r.defaultValue,!0):Ze(a,!!r.multiple,r.multiple?[]:"",!1))}a[Gt]=r}catch(g){H(n,n.return,g)}}break;case 6:if(Nn(e,n),bn(n),s&4){if(n.stateNode===null)throw Error(k(162));a=n.stateNode,r=n.memoizedProps;try{a.nodeValue=r}catch(g){H(n,n.return,g)}}break;case 3:if(Nn(e,n),bn(n),s&4&&t!==null&&t.memoizedState.isDehydrated)try{Vt(e.containerInfo)}catch(g){H(n,n.return,g)}break;case 4:Nn(e,n),bn(n);break;case 13:Nn(e,n),bn(n),a=n.child,a.flags&8192&&(r=a.memoizedState!==null,a.stateNode.isHidden=r,!r||a.alternate!==null&&a.alternate.memoizedState!==null||(Bl=Q())),s&4&&so(n);break;case 22:if(m=t!==null&&t.memoizedState!==null,n.mode&1?(rn=(c=rn)||m,Nn(e,n),rn=c):Nn(e,n),bn(n),s&8192){if(c=n.memoizedState!==null,(n.stateNode.isHidden=c)&&!m&&n.mode&1)for(C=n,m=n.child;m!==null;){for(d=C=m;C!==null;){switch(h=C,y=h.child,h.tag){case 0:case 11:case 14:case 15:bt(4,h,h.return);break;case 1:Xe(h,h.return);var w=h.stateNode;if(typeof w.componentWillUnmount=="function"){s=h,t=h.return;try{e=s,w.props=e.memoizedProps,w.state=e.memoizedState,w.componentWillUnmount()}catch(g){H(s,t,g)}}break;case 5:Xe(h,h.return);break;case 22:if(h.memoizedState!==null){ro(d);continue}}y!==null?(y.return=h,C=y):ro(d)}m=m.sibling}n:for(m=null,d=n;;){if(d.tag===5){if(m===null){m=d;try{a=d.stateNode,c?(r=a.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none"):(i=d.stateNode,o=d.memoizedProps.style,l=o!=null&&o.hasOwnProperty("display")?o.display:null,i.style.display=Ko("display",l))}catch(g){H(n,n.return,g)}}}else if(d.tag===6){if(m===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(g){H(n,n.return,g)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===n)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===n)break n;for(;d.sibling===null;){if(d.return===null||d.return===n)break n;m===d&&(m=null),d=d.return}m===d&&(m=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:Nn(e,n),bn(n),s&4&&so(n);break;case 21:break;default:Nn(e,n),bn(n)}}function bn(n){var e=n.flags;if(e&2){try{n:{for(var t=n.return;t!==null;){if(ku(t)){var s=t;break n}t=t.return}throw Error(k(160))}switch(s.tag){case 5:var a=s.stateNode;s.flags&32&&(Bt(a,""),s.flags&=-33);var r=to(n);Kr(n,r,a);break;case 3:case 4:var l=s.stateNode.containerInfo,i=to(n);qr(n,i,l);break;default:throw Error(k(161))}}catch(o){H(n,n.return,o)}n.flags&=-3}e&4096&&(n.flags&=-4097)}function cf(n,e,t){C=n,_u(n)}function _u(n,e,t){for(var s=(n.mode&1)!==0;C!==null;){var a=C,r=a.child;if(a.tag===22&&s){var l=a.memoizedState!==null||Ps;if(!l){var i=a.alternate,o=i!==null&&i.memoizedState!==null||rn;i=Ps;var c=rn;if(Ps=l,(rn=o)&&!c)for(C=a;C!==null;)l=C,o=l.child,l.tag===22&&l.memoizedState!==null?lo(a):o!==null?(o.return=l,C=o):lo(a);for(;r!==null;)C=r,_u(r),r=r.sibling;C=a,Ps=i,rn=c}ao(n)}else a.subtreeFlags&8772&&r!==null?(r.return=a,C=r):ao(n)}}function ao(n){for(;C!==null;){var e=C;if(e.flags&8772){var t=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:rn||xa(5,e);break;case 1:var s=e.stateNode;if(e.flags&4&&!rn)if(t===null)s.componentDidMount();else{var a=e.elementType===e.type?t.memoizedProps:zn(e.type,t.memoizedProps);s.componentDidUpdate(a,t.memoizedState,s.__reactInternalSnapshotBeforeUpdate)}var r=e.updateQueue;r!==null&&Wi(e,r,s);break;case 3:var l=e.updateQueue;if(l!==null){if(t=null,e.child!==null)switch(e.child.tag){case 5:t=e.child.stateNode;break;case 1:t=e.child.stateNode}Wi(e,l,t)}break;case 5:var i=e.stateNode;if(t===null&&e.flags&4){t=i;var o=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":o.autoFocus&&t.focus();break;case"img":o.src&&(t.src=o.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var m=c.memoizedState;if(m!==null){var d=m.dehydrated;d!==null&&Vt(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(k(163))}rn||e.flags&512&&Qr(e)}catch(h){H(e,e.return,h)}}if(e===n){C=null;break}if(t=e.sibling,t!==null){t.return=e.return,C=t;break}C=e.return}}function ro(n){for(;C!==null;){var e=C;if(e===n){C=null;break}var t=e.sibling;if(t!==null){t.return=e.return,C=t;break}C=e.return}}function lo(n){for(;C!==null;){var e=C;try{switch(e.tag){case 0:case 11:case 15:var t=e.return;try{xa(4,e)}catch(o){H(e,t,o)}break;case 1:var s=e.stateNode;if(typeof s.componentDidMount=="function"){var a=e.return;try{s.componentDidMount()}catch(o){H(e,a,o)}}var r=e.return;try{Qr(e)}catch(o){H(e,r,o)}break;case 5:var l=e.return;try{Qr(e)}catch(o){H(e,l,o)}}}catch(o){H(e,e.return,o)}if(e===n){C=null;break}var i=e.sibling;if(i!==null){i.return=e.return,C=i;break}C=e.return}}var uf=Math.ceil,la=Xn.ReactCurrentDispatcher,Ul=Xn.ReactCurrentOwner,Pn=Xn.ReactCurrentBatchConfig,I=0,Z=null,K=null,en=0,yn=0,Je=we(0),G=0,ts=null,De=0,Sa=0,Al=0,Ft=null,dn=null,Bl=0,pt=1/0,Wn=null,ia=!1,Yr=null,de=null,Ts=!1,re=null,oa=0,Ut=0,Gr=null,Fs=-1,Us=0;function cn(){return I&6?Q():Fs!==-1?Fs:Fs=Q()}function fe(n){return n.mode&1?I&2&&en!==0?en&-en:Qd.transition!==null?(Us===0&&(Us=ic()),Us):(n=M,n!==0||(n=window.event,n=n===void 0?16:hc(n.type)),n):1}function Mn(n,e,t,s){if(50<Ut)throw Ut=0,Gr=null,Error(k(185));ls(n,t,s),(!(I&2)||n!==Z)&&(n===Z&&(!(I&2)&&(Sa|=t),G===4&&se(n,en)),vn(n,s),t===1&&I===0&&!(e.mode&1)&&(pt=Q()+500,ga&&ke()))}function vn(n,e){var t=n.callbackNode;Qp(n,e);var s=Vs(n,n===Z?en:0);if(s===0)t!==null&&mi(t),n.callbackNode=null,n.callbackPriority=0;else if(e=s&-s,n.callbackPriority!==e){if(t!=null&&mi(t),e===1)n.tag===0?Vd(io.bind(null,n)):jc(io.bind(null,n)),Bd(function(){!(I&6)&&ke()}),t=null;else{switch(oc(s)){case 1:t=fl;break;case 4:t=rc;break;case 16:t=$s;break;case 536870912:t=lc;break;default:t=$s}t=zu(t,Cu.bind(null,n))}n.callbackPriority=e,n.callbackNode=t}}function Cu(n,e){if(Fs=-1,Us=0,I&6)throw Error(k(327));var t=n.callbackNode;if(at()&&n.callbackNode!==t)return null;var s=Vs(n,n===Z?en:0);if(s===0)return null;if(s&30||s&n.expiredLanes||e)e=ca(n,s);else{e=s;var a=I;I|=2;var r=Pu();(Z!==n||en!==e)&&(Wn=null,pt=Q()+500,ze(n,e));do try{ff();break}catch(i){Eu(n,i)}while(!0);Pl(),la.current=r,I=a,K!==null?e=0:(Z=null,en=0,e=G)}if(e!==0){if(e===2&&(a=_r(n),a!==0&&(s=a,e=Xr(n,a))),e===1)throw t=ts,ze(n,0),se(n,s),vn(n,Q()),t;if(e===6)se(n,s);else{if(a=n.current.alternate,!(s&30)&&!pf(a)&&(e=ca(n,s),e===2&&(r=_r(n),r!==0&&(s=r,e=Xr(n,r))),e===1))throw t=ts,ze(n,0),se(n,s),vn(n,Q()),t;switch(n.finishedWork=a,n.finishedLanes=s,e){case 0:case 1:throw Error(k(345));case 2:Pe(n,dn,Wn);break;case 3:if(se(n,s),(s&130023424)===s&&(e=Bl+500-Q(),10<e)){if(Vs(n,0)!==0)break;if(a=n.suspendedLanes,(a&s)!==s){cn(),n.pingedLanes|=n.suspendedLanes&a;break}n.timeoutHandle=zr(Pe.bind(null,n,dn,Wn),e);break}Pe(n,dn,Wn);break;case 4:if(se(n,s),(s&4194240)===s)break;for(e=n.eventTimes,a=-1;0<s;){var l=31-In(s);r=1<<l,l=e[l],l>a&&(a=l),s&=~r}if(s=a,s=Q()-s,s=(120>s?120:480>s?480:1080>s?1080:1920>s?1920:3e3>s?3e3:4320>s?4320:1960*uf(s/1960))-s,10<s){n.timeoutHandle=zr(Pe.bind(null,n,dn,Wn),s);break}Pe(n,dn,Wn);break;case 5:Pe(n,dn,Wn);break;default:throw Error(k(329))}}}return vn(n,Q()),n.callbackNode===t?Cu.bind(null,n):null}function Xr(n,e){var t=Ft;return n.current.memoizedState.isDehydrated&&(ze(n,e).flags|=256),n=ca(n,e),n!==2&&(e=dn,dn=t,e!==null&&Jr(e)),n}function Jr(n){dn===null?dn=n:dn.push.apply(dn,n)}function pf(n){for(var e=n;;){if(e.flags&16384){var t=e.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var s=0;s<t.length;s++){var a=t[s],r=a.getSnapshot;a=a.value;try{if(!Dn(r(),a))return!1}catch{return!1}}}if(t=e.child,e.subtreeFlags&16384&&t!==null)t.return=e,e=t;else{if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function se(n,e){for(e&=~Al,e&=~Sa,n.suspendedLanes|=e,n.pingedLanes&=~e,n=n.expirationTimes;0<e;){var t=31-In(e),s=1<<t;n[t]=-1,e&=~s}}function io(n){if(I&6)throw Error(k(327));at();var e=Vs(n,0);if(!(e&1))return vn(n,Q()),null;var t=ca(n,e);if(n.tag!==0&&t===2){var s=_r(n);s!==0&&(e=s,t=Xr(n,s))}if(t===1)throw t=ts,ze(n,0),se(n,e),vn(n,Q()),t;if(t===6)throw Error(k(345));return n.finishedWork=n.current.alternate,n.finishedLanes=e,Pe(n,dn,Wn),vn(n,Q()),null}function Wl(n,e){var t=I;I|=1;try{return n(e)}finally{I=t,I===0&&(pt=Q()+500,ga&&ke())}}function be(n){re!==null&&re.tag===0&&!(I&6)&&at();var e=I;I|=1;var t=Pn.transition,s=M;try{if(Pn.transition=null,M=1,n)return n()}finally{M=s,Pn.transition=t,I=e,!(I&6)&&ke()}}function Hl(){yn=Je.current,F(Je)}function ze(n,e){n.finishedWork=null,n.finishedLanes=0;var t=n.timeoutHandle;if(t!==-1&&(n.timeoutHandle=-1,Ad(t)),K!==null)for(t=K.return;t!==null;){var s=t;switch(_l(s),s.tag){case 1:s=s.type.childContextTypes,s!=null&&Gs();break;case 3:ct(),F(hn),F(ln),Rl();break;case 5:zl(s);break;case 4:ct();break;case 13:F(A);break;case 19:F(A);break;case 10:Tl(s.type._context);break;case 22:case 23:Hl()}t=t.return}if(Z=n,K=n=he(n.current,null),en=yn=e,G=0,ts=null,Al=Sa=De=0,dn=Ft=null,Oe!==null){for(e=0;e<Oe.length;e++)if(t=Oe[e],s=t.interleaved,s!==null){t.interleaved=null;var a=s.next,r=t.pending;if(r!==null){var l=r.next;r.next=a,s.next=l}t.pending=s}Oe=null}return n}function Eu(n,e){do{var t=K;try{if(Pl(),Ms.current=ra,aa){for(var s=B.memoizedState;s!==null;){var a=s.queue;a!==null&&(a.pending=null),s=s.next}aa=!1}if(Me=0,J=Y=B=null,Dt=!1,Zt=0,Ul.current=null,t===null||t.return===null){G=1,ts=e,K=null;break}n:{var r=n,l=t.return,i=t,o=e;if(e=en,i.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){var c=o,m=i,d=m.tag;if(!(m.mode&1)&&(d===0||d===11||d===15)){var h=m.alternate;h?(m.updateQueue=h.updateQueue,m.memoizedState=h.memoizedState,m.lanes=h.lanes):(m.updateQueue=null,m.memoizedState=null)}var y=Ki(l);if(y!==null){y.flags&=-257,Yi(y,l,i,r,e),y.mode&1&&qi(r,c,e),e=y,o=c;var w=e.updateQueue;if(w===null){var g=new Set;g.add(o),e.updateQueue=g}else w.add(o);break n}else{if(!(e&1)){qi(r,c,e),$l();break n}o=Error(k(426))}}else if(U&&i.mode&1){var _=Ki(l);if(_!==null){!(_.flags&65536)&&(_.flags|=256),Yi(_,l,i,r,e),Cl(ut(o,i));break n}}r=o=ut(o,i),G!==4&&(G=2),Ft===null?Ft=[r]:Ft.push(r),r=l;do{switch(r.tag){case 3:r.flags|=65536,e&=-e,r.lanes|=e;var p=ou(r,o,e);Bi(r,p);break n;case 1:i=o;var u=r.type,f=r.stateNode;if(!(r.flags&128)&&(typeof u.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(de===null||!de.has(f)))){r.flags|=65536,e&=-e,r.lanes|=e;var v=cu(r,i,e);Bi(r,v);break n}}r=r.return}while(r!==null)}Lu(t)}catch(S){e=S,K===t&&t!==null&&(K=t=t.return);continue}break}while(!0)}function Pu(){var n=la.current;return la.current=ra,n===null?ra:n}function $l(){(G===0||G===3||G===2)&&(G=4),Z===null||!(De&268435455)&&!(Sa&268435455)||se(Z,en)}function ca(n,e){var t=I;I|=2;var s=Pu();(Z!==n||en!==e)&&(Wn=null,ze(n,e));do try{df();break}catch(a){Eu(n,a)}while(!0);if(Pl(),I=t,la.current=s,K!==null)throw Error(k(261));return Z=null,en=0,G}function df(){for(;K!==null;)Tu(K)}function ff(){for(;K!==null&&!bp();)Tu(K)}function Tu(n){var e=Nu(n.alternate,n,yn);n.memoizedProps=n.pendingProps,e===null?Lu(n):K=e,Ul.current=null}function Lu(n){var e=n;do{var t=e.alternate;if(n=e.return,e.flags&32768){if(t=rf(t,e),t!==null){t.flags&=32767,K=t;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{G=6,K=null;return}}else if(t=af(t,e,yn),t!==null){K=t;return}if(e=e.sibling,e!==null){K=e;return}K=e=n}while(e!==null);G===0&&(G=5)}function Pe(n,e,t){var s=M,a=Pn.transition;try{Pn.transition=null,M=1,hf(n,e,t,s)}finally{Pn.transition=a,M=s}return null}function hf(n,e,t,s){do at();while(re!==null);if(I&6)throw Error(k(327));t=n.finishedWork;var a=n.finishedLanes;if(t===null)return null;if(n.finishedWork=null,n.finishedLanes=0,t===n.current)throw Error(k(177));n.callbackNode=null,n.callbackPriority=0;var r=t.lanes|t.childLanes;if(qp(n,r),n===Z&&(K=Z=null,en=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||Ts||(Ts=!0,zu($s,function(){return at(),null})),r=(t.flags&15990)!==0,t.subtreeFlags&15990||r){r=Pn.transition,Pn.transition=null;var l=M;M=1;var i=I;I|=4,Ul.current=null,of(n,t),Su(t,n),jd(Or),Qs=!!Lr,Or=Lr=null,n.current=t,cf(t),Fp(),I=i,M=l,Pn.transition=r}else n.current=t;if(Ts&&(Ts=!1,re=n,oa=a),r=n.pendingLanes,r===0&&(de=null),Bp(t.stateNode),vn(n,Q()),e!==null)for(s=n.onRecoverableError,t=0;t<e.length;t++)a=e[t],s(a.value,{componentStack:a.stack,digest:a.digest});if(ia)throw ia=!1,n=Yr,Yr=null,n;return oa&1&&n.tag!==0&&at(),r=n.pendingLanes,r&1?n===Gr?Ut++:(Ut=0,Gr=n):Ut=0,ke(),null}function at(){if(re!==null){var n=oc(oa),e=Pn.transition,t=M;try{if(Pn.transition=null,M=16>n?16:n,re===null)var s=!1;else{if(n=re,re=null,oa=0,I&6)throw Error(k(331));var a=I;for(I|=4,C=n.current;C!==null;){var r=C,l=r.child;if(C.flags&16){var i=r.deletions;if(i!==null){for(var o=0;o<i.length;o++){var c=i[o];for(C=c;C!==null;){var m=C;switch(m.tag){case 0:case 11:case 15:bt(8,m,r)}var d=m.child;if(d!==null)d.return=m,C=d;else for(;C!==null;){m=C;var h=m.sibling,y=m.return;if(wu(m),m===c){C=null;break}if(h!==null){h.return=y,C=h;break}C=y}}}var w=r.alternate;if(w!==null){var g=w.child;if(g!==null){w.child=null;do{var _=g.sibling;g.sibling=null,g=_}while(g!==null)}}C=r}}if(r.subtreeFlags&2064&&l!==null)l.return=r,C=l;else n:for(;C!==null;){if(r=C,r.flags&2048)switch(r.tag){case 0:case 11:case 15:bt(9,r,r.return)}var p=r.sibling;if(p!==null){p.return=r.return,C=p;break n}C=r.return}}var u=n.current;for(C=u;C!==null;){l=C;var f=l.child;if(l.subtreeFlags&2064&&f!==null)f.return=l,C=f;else n:for(l=u;C!==null;){if(i=C,i.flags&2048)try{switch(i.tag){case 0:case 11:case 15:xa(9,i)}}catch(S){H(i,i.return,S)}if(i===l){C=null;break n}var v=i.sibling;if(v!==null){v.return=i.return,C=v;break n}C=i.return}}if(I=a,ke(),An&&typeof An.onPostCommitFiberRoot=="function")try{An.onPostCommitFiberRoot(fa,n)}catch{}s=!0}return s}finally{M=t,Pn.transition=e}}return!1}function oo(n,e,t){e=ut(t,e),e=ou(n,e,1),n=pe(n,e,1),e=cn(),n!==null&&(ls(n,1,e),vn(n,e))}function H(n,e,t){if(n.tag===3)oo(n,n,t);else for(;e!==null;){if(e.tag===3){oo(e,n,t);break}else if(e.tag===1){var s=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(de===null||!de.has(s))){n=ut(t,n),n=cu(e,n,1),e=pe(e,n,1),n=cn(),e!==null&&(ls(e,1,n),vn(e,n));break}}e=e.return}}function mf(n,e,t){var s=n.pingCache;s!==null&&s.delete(e),e=cn(),n.pingedLanes|=n.suspendedLanes&t,Z===n&&(en&t)===t&&(G===4||G===3&&(en&130023424)===en&&500>Q()-Bl?ze(n,0):Al|=t),vn(n,e)}function Ou(n,e){e===0&&(n.mode&1?(e=ys,ys<<=1,!(ys&130023424)&&(ys=4194304)):e=1);var t=cn();n=Yn(n,e),n!==null&&(ls(n,e,t),vn(n,t))}function vf(n){var e=n.memoizedState,t=0;e!==null&&(t=e.retryLane),Ou(n,t)}function yf(n,e){var t=0;switch(n.tag){case 13:var s=n.stateNode,a=n.memoizedState;a!==null&&(t=a.retryLane);break;case 19:s=n.stateNode;break;default:throw Error(k(314))}s!==null&&s.delete(e),Ou(n,t)}var Nu;Nu=function(n,e,t){if(n!==null)if(n.memoizedProps!==e.pendingProps||hn.current)fn=!0;else{if(!(n.lanes&t)&&!(e.flags&128))return fn=!1,sf(n,e,t);fn=!!(n.flags&131072)}else fn=!1,U&&e.flags&1048576&&Ic(e,Zs,e.index);switch(e.lanes=0,e.tag){case 2:var s=e.type;bs(n,e),n=e.pendingProps;var a=lt(e,ln.current);st(e,t),a=Il(null,e,s,n,a,t);var r=Ml();return e.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,mn(s)?(r=!0,Xs(e)):r=!1,e.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,Ol(e),a.updater=ka,e.stateNode=a,a._reactInternals=e,Fr(e,s,n,t),e=Br(null,e,s,!0,r,t)):(e.tag=0,U&&r&&Sl(e),on(null,e,a,t),e=e.child),e;case 16:s=e.elementType;n:{switch(bs(n,e),n=e.pendingProps,a=s._init,s=a(s._payload),e.type=s,a=e.tag=wf(s),n=zn(s,n),a){case 0:e=Ar(null,e,s,n,t);break n;case 1:e=Ji(null,e,s,n,t);break n;case 11:e=Gi(null,e,s,n,t);break n;case 14:e=Xi(null,e,s,zn(s.type,n),t);break n}throw Error(k(306,s,""))}return e;case 0:return s=e.type,a=e.pendingProps,a=e.elementType===s?a:zn(s,a),Ar(n,e,s,a,t);case 1:return s=e.type,a=e.pendingProps,a=e.elementType===s?a:zn(s,a),Ji(n,e,s,a,t);case 3:n:{if(fu(e),n===null)throw Error(k(387));s=e.pendingProps,r=e.memoizedState,a=r.element,Ac(n,e),ta(e,s,null,t);var l=e.memoizedState;if(s=l.element,r.isDehydrated)if(r={element:s,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},e.updateQueue.baseState=r,e.memoizedState=r,e.flags&256){a=ut(Error(k(423)),e),e=Zi(n,e,s,t,a);break n}else if(s!==a){a=ut(Error(k(424)),e),e=Zi(n,e,s,t,a);break n}else for(gn=ue(e.stateNode.containerInfo.firstChild),wn=e,U=!0,jn=null,t=Fc(e,null,s,t),e.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(it(),s===a){e=Gn(n,e,t);break n}on(n,e,s,t)}e=e.child}return e;case 5:return Bc(e),n===null&&Mr(e),s=e.type,a=e.pendingProps,r=n!==null?n.memoizedProps:null,l=a.children,Nr(s,a)?l=null:r!==null&&Nr(s,r)&&(e.flags|=32),du(n,e),on(n,e,l,t),e.child;case 6:return n===null&&Mr(e),null;case 13:return hu(n,e,t);case 4:return Nl(e,e.stateNode.containerInfo),s=e.pendingProps,n===null?e.child=ot(e,null,s,t):on(n,e,s,t),e.child;case 11:return s=e.type,a=e.pendingProps,a=e.elementType===s?a:zn(s,a),Gi(n,e,s,a,t);case 7:return on(n,e,e.pendingProps,t),e.child;case 8:return on(n,e,e.pendingProps.children,t),e.child;case 12:return on(n,e,e.pendingProps.children,t),e.child;case 10:n:{if(s=e.type._context,a=e.pendingProps,r=e.memoizedProps,l=a.value,D(na,s._currentValue),s._currentValue=l,r!==null)if(Dn(r.value,l)){if(r.children===a.children&&!hn.current){e=Gn(n,e,t);break n}}else for(r=e.child,r!==null&&(r.return=e);r!==null;){var i=r.dependencies;if(i!==null){l=r.child;for(var o=i.firstContext;o!==null;){if(o.context===s){if(r.tag===1){o=Qn(-1,t&-t),o.tag=2;var c=r.updateQueue;if(c!==null){c=c.shared;var m=c.pending;m===null?o.next=o:(o.next=m.next,m.next=o),c.pending=o}}r.lanes|=t,o=r.alternate,o!==null&&(o.lanes|=t),Dr(r.return,t,e),i.lanes|=t;break}o=o.next}}else if(r.tag===10)l=r.type===e.type?null:r.child;else if(r.tag===18){if(l=r.return,l===null)throw Error(k(341));l.lanes|=t,i=l.alternate,i!==null&&(i.lanes|=t),Dr(l,t,e),l=r.sibling}else l=r.child;if(l!==null)l.return=r;else for(l=r;l!==null;){if(l===e){l=null;break}if(r=l.sibling,r!==null){r.return=l.return,l=r;break}l=l.return}r=l}on(n,e,a.children,t),e=e.child}return e;case 9:return a=e.type,s=e.pendingProps.children,st(e,t),a=Tn(a),s=s(a),e.flags|=1,on(n,e,s,t),e.child;case 14:return s=e.type,a=zn(s,e.pendingProps),a=zn(s.type,a),Xi(n,e,s,a,t);case 15:return uu(n,e,e.type,e.pendingProps,t);case 17:return s=e.type,a=e.pendingProps,a=e.elementType===s?a:zn(s,a),bs(n,e),e.tag=1,mn(s)?(n=!0,Xs(e)):n=!1,st(e,t),iu(e,s,a),Fr(e,s,a,t),Br(null,e,s,!0,n,t);case 19:return mu(n,e,t);case 22:return pu(n,e,t)}throw Error(k(156,e.tag))};function zu(n,e){return ac(n,e)}function gf(n,e,t,s){this.tag=n,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function En(n,e,t,s){return new gf(n,e,t,s)}function Vl(n){return n=n.prototype,!(!n||!n.isReactComponent)}function wf(n){if(typeof n=="function")return Vl(n)?1:0;if(n!=null){if(n=n.$$typeof,n===ul)return 11;if(n===pl)return 14}return 2}function he(n,e){var t=n.alternate;return t===null?(t=En(n.tag,e,n.key,n.mode),t.elementType=n.elementType,t.type=n.type,t.stateNode=n.stateNode,t.alternate=n,n.alternate=t):(t.pendingProps=e,t.type=n.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=n.flags&14680064,t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},t.sibling=n.sibling,t.index=n.index,t.ref=n.ref,t}function As(n,e,t,s,a,r){var l=2;if(s=n,typeof n=="function")Vl(n)&&(l=1);else if(typeof n=="string")l=5;else n:switch(n){case We:return Re(t.children,a,r,e);case cl:l=8,a|=8;break;case or:return n=En(12,t,e,a|2),n.elementType=or,n.lanes=r,n;case cr:return n=En(13,t,e,a),n.elementType=cr,n.lanes=r,n;case ur:return n=En(19,t,e,a),n.elementType=ur,n.lanes=r,n;case Bo:return _a(t,a,r,e);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case Uo:l=10;break n;case Ao:l=9;break n;case ul:l=11;break n;case pl:l=14;break n;case ne:l=16,s=null;break n}throw Error(k(130,n==null?n:typeof n,""))}return e=En(l,t,e,a),e.elementType=n,e.type=s,e.lanes=r,e}function Re(n,e,t,s){return n=En(7,n,s,e),n.lanes=t,n}function _a(n,e,t,s){return n=En(22,n,s,e),n.elementType=Bo,n.lanes=t,n.stateNode={isHidden:!1},n}function tr(n,e,t){return n=En(6,n,null,e),n.lanes=t,n}function sr(n,e,t){return e=En(4,n.children!==null?n.children:[],n.key,e),e.lanes=t,e.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},e}function kf(n,e,t,s,a){this.tag=e,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ba(0),this.expirationTimes=ba(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ba(0),this.identifierPrefix=s,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function Ql(n,e,t,s,a,r,l,i,o){return n=new kf(n,e,t,i,o),e===1?(e=1,r===!0&&(e|=8)):e=0,r=En(3,null,null,e),n.current=r,r.stateNode=n,r.memoizedState={element:s,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ol(r),n}function xf(n,e,t){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Be,key:s==null?null:""+s,children:n,containerInfo:e,implementation:t}}function Ru(n){if(!n)return ye;n=n._reactInternals;n:{if(Ue(n)!==n||n.tag!==1)throw Error(k(170));var e=n;do{switch(e.tag){case 3:e=e.stateNode.context;break n;case 1:if(mn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break n}}e=e.return}while(e!==null);throw Error(k(171))}if(n.tag===1){var t=n.type;if(mn(t))return Rc(n,t,e)}return e}function ju(n,e,t,s,a,r,l,i,o){return n=Ql(t,s,!0,n,a,r,l,i,o),n.context=Ru(null),t=n.current,s=cn(),a=fe(t),r=Qn(s,a),r.callback=e??null,pe(t,r,a),n.current.lanes=a,ls(n,a,s),vn(n,s),n}function Ca(n,e,t,s){var a=e.current,r=cn(),l=fe(a);return t=Ru(t),e.context===null?e.context=t:e.pendingContext=t,e=Qn(r,l),e.payload={element:n},s=s===void 0?null:s,s!==null&&(e.callback=s),n=pe(a,e,l),n!==null&&(Mn(n,a,l,r),Is(n,a,l)),l}function ua(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function co(n,e){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var t=n.retryLane;n.retryLane=t!==0&&t<e?t:e}}function ql(n,e){co(n,e),(n=n.alternate)&&co(n,e)}function Sf(){return null}var Iu=typeof reportError=="function"?reportError:function(n){console.error(n)};function Kl(n){this._internalRoot=n}Ea.prototype.render=Kl.prototype.render=function(n){var e=this._internalRoot;if(e===null)throw Error(k(409));Ca(n,e,null,null)};Ea.prototype.unmount=Kl.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var e=n.containerInfo;be(function(){Ca(null,n,null,null)}),e[Kn]=null}};function Ea(n){this._internalRoot=n}Ea.prototype.unstable_scheduleHydration=function(n){if(n){var e=pc();n={blockedOn:null,target:n,priority:e};for(var t=0;t<te.length&&e!==0&&e<te[t].priority;t++);te.splice(t,0,n),t===0&&fc(n)}};function Yl(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function Pa(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function uo(){}function _f(n,e,t,s,a){if(a){if(typeof s=="function"){var r=s;s=function(){var c=ua(l);r.call(c)}}var l=ju(e,s,n,0,null,!1,!1,"",uo);return n._reactRootContainer=l,n[Kn]=l.current,Kt(n.nodeType===8?n.parentNode:n),be(),l}for(;a=n.lastChild;)n.removeChild(a);if(typeof s=="function"){var i=s;s=function(){var c=ua(o);i.call(c)}}var o=Ql(n,0,!1,null,null,!1,!1,"",uo);return n._reactRootContainer=o,n[Kn]=o.current,Kt(n.nodeType===8?n.parentNode:n),be(function(){Ca(e,o,t,s)}),o}function Ta(n,e,t,s,a){var r=t._reactRootContainer;if(r){var l=r;if(typeof a=="function"){var i=a;a=function(){var o=ua(l);i.call(o)}}Ca(e,l,n,a)}else l=_f(t,e,n,a,s);return ua(l)}cc=function(n){switch(n.tag){case 3:var e=n.stateNode;if(e.current.memoizedState.isDehydrated){var t=Ot(e.pendingLanes);t!==0&&(hl(e,t|1),vn(e,Q()),!(I&6)&&(pt=Q()+500,ke()))}break;case 13:be(function(){var s=Yn(n,1);if(s!==null){var a=cn();Mn(s,n,1,a)}}),ql(n,1)}};ml=function(n){if(n.tag===13){var e=Yn(n,134217728);if(e!==null){var t=cn();Mn(e,n,134217728,t)}ql(n,134217728)}};uc=function(n){if(n.tag===13){var e=fe(n),t=Yn(n,e);if(t!==null){var s=cn();Mn(t,n,e,s)}ql(n,e)}};pc=function(){return M};dc=function(n,e){var t=M;try{return M=n,e()}finally{M=t}};kr=function(n,e,t){switch(e){case"input":if(fr(n,t),e=t.name,t.type==="radio"&&e!=null){for(t=n;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<t.length;e++){var s=t[e];if(s!==n&&s.form===n.form){var a=ya(s);if(!a)throw Error(k(90));Ho(s),fr(s,a)}}}break;case"textarea":Vo(n,t);break;case"select":e=t.value,e!=null&&Ze(n,!!t.multiple,e,!1)}};Jo=Wl;Zo=be;var Cf={usingClientEntryPoint:!1,Events:[os,Qe,ya,Go,Xo,Wl]},Pt={findFiberByHostInstance:Le,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Ef={bundleType:Pt.bundleType,version:Pt.version,rendererPackageName:Pt.rendererPackageName,rendererConfig:Pt.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Xn.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=tc(n),n===null?null:n.stateNode},findFiberByHostInstance:Pt.findFiberByHostInstance||Sf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ls=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ls.isDisabled&&Ls.supportsFiber)try{fa=Ls.inject(Ef),An=Ls}catch{}}xn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Cf;xn.createPortal=function(n,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Yl(e))throw Error(k(200));return xf(n,e,null,t)};xn.createRoot=function(n,e){if(!Yl(n))throw Error(k(299));var t=!1,s="",a=Iu;return e!=null&&(e.unstable_strictMode===!0&&(t=!0),e.identifierPrefix!==void 0&&(s=e.identifierPrefix),e.onRecoverableError!==void 0&&(a=e.onRecoverableError)),e=Ql(n,1,!1,null,null,t,!1,s,a),n[Kn]=e.current,Kt(n.nodeType===8?n.parentNode:n),new Kl(e)};xn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var e=n._reactInternals;if(e===void 0)throw typeof n.render=="function"?Error(k(188)):(n=Object.keys(n).join(","),Error(k(268,n)));return n=tc(e),n=n===null?null:n.stateNode,n};xn.flushSync=function(n){return be(n)};xn.hydrate=function(n,e,t){if(!Pa(e))throw Error(k(200));return Ta(null,n,e,!0,t)};xn.hydrateRoot=function(n,e,t){if(!Yl(n))throw Error(k(405));var s=t!=null&&t.hydratedSources||null,a=!1,r="",l=Iu;if(t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),e=ju(e,null,n,1,t??null,a,!1,r,l),n[Kn]=e.current,Kt(n),s)for(n=0;n<s.length;n++)t=s[n],a=t._getVersion,a=a(t._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,a]:e.mutableSourceEagerHydrationData.push(t,a);return new Ea(e)};xn.render=function(n,e,t){if(!Pa(e))throw Error(k(200));return Ta(null,n,e,!1,t)};xn.unmountComponentAtNode=function(n){if(!Pa(n))throw Error(k(40));return n._reactRootContainer?(be(function(){Ta(null,null,n,!1,function(){n._reactRootContainer=null,n[Kn]=null})}),!0):!1};xn.unstable_batchedUpdates=Wl;xn.unstable_renderSubtreeIntoContainer=function(n,e,t,s){if(!Pa(t))throw Error(k(200));if(n==null||n._reactInternals===void 0)throw Error(k(38));return Ta(n,e,t,!1,s)};xn.version="18.3.1-next-f1338f8080-20240426";function Mu(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Mu)}catch(n){console.error(n)}}Mu(),Mo.exports=xn;var Pf=Mo.exports,Du,po=Pf;Du=po.createRoot,po.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ss(){return ss=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(n[s]=t[s])}return n},ss.apply(this,arguments)}var le;(function(n){n.Pop="POP",n.Push="PUSH",n.Replace="REPLACE"})(le||(le={}));const fo="popstate";function Tf(n){n===void 0&&(n={});function e(s,a){let{pathname:r,search:l,hash:i}=s.location;return Zr("",{pathname:r,search:l,hash:i},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function t(s,a){return typeof a=="string"?a:pa(a)}return Of(e,t,null,n)}function q(n,e){if(n===!1||n===null||typeof n>"u")throw new Error(e)}function Gl(n,e){if(!n){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function Lf(){return Math.random().toString(36).substr(2,8)}function ho(n,e){return{usr:n.state,key:n.key,idx:e}}function Zr(n,e,t,s){return t===void 0&&(t=null),ss({pathname:typeof n=="string"?n:n.pathname,search:"",hash:""},typeof e=="string"?mt(e):e,{state:t,key:e&&e.key||s||Lf()})}function pa(n){let{pathname:e="/",search:t="",hash:s=""}=n;return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),s&&s!=="#"&&(e+=s.charAt(0)==="#"?s:"#"+s),e}function mt(n){let e={};if(n){let t=n.indexOf("#");t>=0&&(e.hash=n.substr(t),n=n.substr(0,t));let s=n.indexOf("?");s>=0&&(e.search=n.substr(s),n=n.substr(0,s)),n&&(e.pathname=n)}return e}function Of(n,e,t,s){s===void 0&&(s={});let{window:a=document.defaultView,v5Compat:r=!1}=s,l=a.history,i=le.Pop,o=null,c=m();c==null&&(c=0,l.replaceState(ss({},l.state,{idx:c}),""));function m(){return(l.state||{idx:null}).idx}function d(){i=le.Pop;let _=m(),p=_==null?null:_-c;c=_,o&&o({action:i,location:g.location,delta:p})}function h(_,p){i=le.Push;let u=Zr(g.location,_,p);c=m()+1;let f=ho(u,c),v=g.createHref(u);try{l.pushState(f,"",v)}catch(S){if(S instanceof DOMException&&S.name==="DataCloneError")throw S;a.location.assign(v)}r&&o&&o({action:i,location:g.location,delta:1})}function y(_,p){i=le.Replace;let u=Zr(g.location,_,p);c=m();let f=ho(u,c),v=g.createHref(u);l.replaceState(f,"",v),r&&o&&o({action:i,location:g.location,delta:0})}function w(_){let p=a.location.origin!=="null"?a.location.origin:a.location.href,u=typeof _=="string"?_:pa(_);return u=u.replace(/ $/,"%20"),q(p,"No window.location.(origin|href) available to create URL for href: "+u),new URL(u,p)}let g={get action(){return i},get location(){return n(a,l)},listen(_){if(o)throw new Error("A history only accepts one active listener");return a.addEventListener(fo,d),o=_,()=>{a.removeEventListener(fo,d),o=null}},createHref(_){return e(a,_)},createURL:w,encodeLocation(_){let p=w(_);return{pathname:p.pathname,search:p.search,hash:p.hash}},push:h,replace:y,go(_){return l.go(_)}};return g}var mo;(function(n){n.data="data",n.deferred="deferred",n.redirect="redirect",n.error="error"})(mo||(mo={}));function Nf(n,e,t){return t===void 0&&(t="/"),zf(n,e,t)}function zf(n,e,t,s){let a=typeof e=="string"?mt(e):e,r=Xl(a.pathname||"/",t);if(r==null)return null;let l=bu(n);Rf(l);let i=null;for(let o=0;i==null&&o<l.length;++o){let c=$f(r);i=Bf(l[o],c)}return i}function bu(n,e,t,s){e===void 0&&(e=[]),t===void 0&&(t=[]),s===void 0&&(s="");let a=(r,l,i)=>{let o={relativePath:i===void 0?r.path||"":i,caseSensitive:r.caseSensitive===!0,childrenIndex:l,route:r};o.relativePath.startsWith("/")&&(q(o.relativePath.startsWith(s),'Absolute route path "'+o.relativePath+'" nested under path '+('"'+s+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),o.relativePath=o.relativePath.slice(s.length));let c=me([s,o.relativePath]),m=t.concat(o);r.children&&r.children.length>0&&(q(r.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),bu(r.children,e,m,c)),!(r.path==null&&!r.index)&&e.push({path:c,score:Uf(c,r.index),routesMeta:m})};return n.forEach((r,l)=>{var i;if(r.path===""||!((i=r.path)!=null&&i.includes("?")))a(r,l);else for(let o of Fu(r.path))a(r,l,o)}),e}function Fu(n){let e=n.split("/");if(e.length===0)return[];let[t,...s]=e,a=t.endsWith("?"),r=t.replace(/\?$/,"");if(s.length===0)return a?[r,""]:[r];let l=Fu(s.join("/")),i=[];return i.push(...l.map(o=>o===""?r:[r,o].join("/"))),a&&i.push(...l),i.map(o=>n.startsWith("/")&&o===""?"/":o)}function Rf(n){n.sort((e,t)=>e.score!==t.score?t.score-e.score:Af(e.routesMeta.map(s=>s.childrenIndex),t.routesMeta.map(s=>s.childrenIndex)))}const jf=/^:[\w-]+$/,If=3,Mf=2,Df=1,bf=10,Ff=-2,vo=n=>n==="*";function Uf(n,e){let t=n.split("/"),s=t.length;return t.some(vo)&&(s+=Ff),e&&(s+=Mf),t.filter(a=>!vo(a)).reduce((a,r)=>a+(jf.test(r)?If:r===""?Df:bf),s)}function Af(n,e){return n.length===e.length&&n.slice(0,-1).every((s,a)=>s===e[a])?n[n.length-1]-e[e.length-1]:0}function Bf(n,e,t){let{routesMeta:s}=n,a={},r="/",l=[];for(let i=0;i<s.length;++i){let o=s[i],c=i===s.length-1,m=r==="/"?e:e.slice(r.length)||"/",d=Wf({path:o.relativePath,caseSensitive:o.caseSensitive,end:c},m),h=o.route;if(!d)return null;Object.assign(a,d.params),l.push({params:a,pathname:me([r,d.pathname]),pathnameBase:Yf(me([r,d.pathnameBase])),route:h}),d.pathnameBase!=="/"&&(r=me([r,d.pathnameBase]))}return l}function Wf(n,e){typeof n=="string"&&(n={path:n,caseSensitive:!1,end:!0});let[t,s]=Hf(n.path,n.caseSensitive,n.end),a=e.match(t);if(!a)return null;let r=a[0],l=r.replace(/(.)\/+$/,"$1"),i=a.slice(1);return{params:s.reduce((c,m,d)=>{let{paramName:h,isOptional:y}=m;if(h==="*"){let g=i[d]||"";l=r.slice(0,r.length-g.length).replace(/(.)\/+$/,"$1")}const w=i[d];return y&&!w?c[h]=void 0:c[h]=(w||"").replace(/%2F/g,"/"),c},{}),pathname:r,pathnameBase:l,pattern:n}}function Hf(n,e,t){e===void 0&&(e=!1),t===void 0&&(t=!0),Gl(n==="*"||!n.endsWith("*")||n.endsWith("/*"),'Route path "'+n+'" will be treated as if it were '+('"'+n.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+n.replace(/\*$/,"/*")+'".'));let s=[],a="^"+n.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(l,i,o)=>(s.push({paramName:i,isOptional:o!=null}),o?"/?([^\\/]+)?":"/([^\\/]+)"));return n.endsWith("*")?(s.push({paramName:"*"}),a+=n==="*"||n==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):t?a+="\\/*$":n!==""&&n!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,e?void 0:"i"),s]}function $f(n){try{return n.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Gl(!1,'The URL path "'+n+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),n}}function Xl(n,e){if(e==="/")return n;if(!n.toLowerCase().startsWith(e.toLowerCase()))return null;let t=e.endsWith("/")?e.length-1:e.length,s=n.charAt(t);return s&&s!=="/"?null:n.slice(t)||"/"}const Vf=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Qf=n=>Vf.test(n);function qf(n,e){e===void 0&&(e="/");let{pathname:t,search:s="",hash:a=""}=typeof n=="string"?mt(n):n,r;if(t)if(Qf(t))r=t;else{if(t.includes("//")){let l=t;t=t.replace(/\/\/+/g,"/"),Gl(!1,"Pathnames cannot have embedded double slashes - normalizing "+(l+" -> "+t))}t.startsWith("/")?r=yo(t.substring(1),"/"):r=yo(t,e)}else r=e;return{pathname:r,search:Gf(s),hash:Xf(a)}}function yo(n,e){let t=e.replace(/\/+$/,"").split("/");return n.split("/").forEach(a=>{a===".."?t.length>1&&t.pop():a!=="."&&t.push(a)}),t.length>1?t.join("/"):"/"}function ar(n,e,t,s){return"Cannot include a '"+n+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(s)+"].  Please separate it out to the ")+("`to."+t+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Kf(n){return n.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Jl(n,e){let t=Kf(n);return e?t.map((s,a)=>a===t.length-1?s.pathname:s.pathnameBase):t.map(s=>s.pathnameBase)}function Zl(n,e,t,s){s===void 0&&(s=!1);let a;typeof n=="string"?a=mt(n):(a=ss({},n),q(!a.pathname||!a.pathname.includes("?"),ar("?","pathname","search",a)),q(!a.pathname||!a.pathname.includes("#"),ar("#","pathname","hash",a)),q(!a.search||!a.search.includes("#"),ar("#","search","hash",a)));let r=n===""||a.pathname==="",l=r?"/":a.pathname,i;if(l==null)i=t;else{let d=e.length-1;if(!s&&l.startsWith("..")){let h=l.split("/");for(;h[0]==="..";)h.shift(),d-=1;a.pathname=h.join("/")}i=d>=0?e[d]:"/"}let o=qf(a,i),c=l&&l!=="/"&&l.endsWith("/"),m=(r||l===".")&&t.endsWith("/");return!o.pathname.endsWith("/")&&(c||m)&&(o.pathname+="/"),o}const me=n=>n.join("/").replace(/\/\/+/g,"/"),Yf=n=>n.replace(/\/+$/,"").replace(/^\/*/,"/"),Gf=n=>!n||n==="?"?"":n.startsWith("?")?n:"?"+n,Xf=n=>!n||n==="#"?"":n.startsWith("#")?n:"#"+n;function Jf(n){return n!=null&&typeof n.status=="number"&&typeof n.statusText=="string"&&typeof n.internal=="boolean"&&"data"in n}const Uu=["post","put","patch","delete"];new Set(Uu);const Zf=["get",...Uu];new Set(Zf);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function as(){return as=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(n[s]=t[s])}return n},as.apply(this,arguments)}const ni=x.createContext(null),nh=x.createContext(null),xe=x.createContext(null),La=x.createContext(null),Jn=x.createContext({outlet:null,matches:[],isDataRoute:!1}),Au=x.createContext(null);function eh(n,e){let{relative:t}=e===void 0?{}:e;vt()||q(!1);let{basename:s,navigator:a}=x.useContext(xe),{hash:r,pathname:l,search:i}=Wu(n,{relative:t}),o=l;return s!=="/"&&(o=l==="/"?s:me([s,l])),a.createHref({pathname:o,search:i,hash:r})}function vt(){return x.useContext(La)!=null}function Se(){return vt()||q(!1),x.useContext(La).location}function Bu(n){x.useContext(xe).static||x.useLayoutEffect(n)}function ei(){let{isDataRoute:n}=x.useContext(Jn);return n?vh():th()}function th(){vt()||q(!1);let n=x.useContext(ni),{basename:e,future:t,navigator:s}=x.useContext(xe),{matches:a}=x.useContext(Jn),{pathname:r}=Se(),l=JSON.stringify(Jl(a,t.v7_relativeSplatPath)),i=x.useRef(!1);return Bu(()=>{i.current=!0}),x.useCallback(function(c,m){if(m===void 0&&(m={}),!i.current)return;if(typeof c=="number"){s.go(c);return}let d=Zl(c,JSON.parse(l),r,m.relative==="path");n==null&&e!=="/"&&(d.pathname=d.pathname==="/"?e:me([e,d.pathname])),(m.replace?s.replace:s.push)(d,m.state,m)},[e,s,l,r,n])}const sh=x.createContext(null);function ah(n){let e=x.useContext(Jn).outlet;return e&&x.createElement(sh.Provider,{value:n},e)}function Wu(n,e){let{relative:t}=e===void 0?{}:e,{future:s}=x.useContext(xe),{matches:a}=x.useContext(Jn),{pathname:r}=Se(),l=JSON.stringify(Jl(a,s.v7_relativeSplatPath));return x.useMemo(()=>Zl(n,JSON.parse(l),r,t==="path"),[n,l,r,t])}function rh(n,e){return lh(n,e)}function lh(n,e,t,s){vt()||q(!1);let{navigator:a}=x.useContext(xe),{matches:r}=x.useContext(Jn),l=r[r.length-1],i=l?l.params:{};l&&l.pathname;let o=l?l.pathnameBase:"/";l&&l.route;let c=Se(),m;if(e){var d;let _=typeof e=="string"?mt(e):e;o==="/"||(d=_.pathname)!=null&&d.startsWith(o)||q(!1),m=_}else m=c;let h=m.pathname||"/",y=h;if(o!=="/"){let _=o.replace(/^\//,"").split("/");y="/"+h.replace(/^\//,"").split("/").slice(_.length).join("/")}let w=Nf(n,{pathname:y}),g=ph(w&&w.map(_=>Object.assign({},_,{params:Object.assign({},i,_.params),pathname:me([o,a.encodeLocation?a.encodeLocation(_.pathname).pathname:_.pathname]),pathnameBase:_.pathnameBase==="/"?o:me([o,a.encodeLocation?a.encodeLocation(_.pathnameBase).pathname:_.pathnameBase])})),r,t,s);return e&&g?x.createElement(La.Provider,{value:{location:as({pathname:"/",search:"",hash:"",state:null,key:"default"},m),navigationType:le.Pop}},g):g}function ih(){let n=mh(),e=Jf(n)?n.status+" "+n.statusText:n instanceof Error?n.message:JSON.stringify(n),t=n instanceof Error?n.stack:null,a={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return x.createElement(x.Fragment,null,x.createElement("h2",null,"Unexpected Application Error!"),x.createElement("h3",{style:{fontStyle:"italic"}},e),t?x.createElement("pre",{style:a},t):null,null)}const oh=x.createElement(ih,null);class ch extends x.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?x.createElement(Jn.Provider,{value:this.props.routeContext},x.createElement(Au.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function uh(n){let{routeContext:e,match:t,children:s}=n,a=x.useContext(ni);return a&&a.static&&a.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=t.route.id),x.createElement(Jn.Provider,{value:e},s)}function ph(n,e,t,s){var a;if(e===void 0&&(e=[]),t===void 0&&(t=null),s===void 0&&(s=null),n==null){var r;if(!t)return null;if(t.errors)n=t.matches;else if((r=s)!=null&&r.v7_partialHydration&&e.length===0&&!t.initialized&&t.matches.length>0)n=t.matches;else return null}let l=n,i=(a=t)==null?void 0:a.errors;if(i!=null){let m=l.findIndex(d=>d.route.id&&(i==null?void 0:i[d.route.id])!==void 0);m>=0||q(!1),l=l.slice(0,Math.min(l.length,m+1))}let o=!1,c=-1;if(t&&s&&s.v7_partialHydration)for(let m=0;m<l.length;m++){let d=l[m];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(c=m),d.route.id){let{loaderData:h,errors:y}=t,w=d.route.loader&&h[d.route.id]===void 0&&(!y||y[d.route.id]===void 0);if(d.route.lazy||w){o=!0,c>=0?l=l.slice(0,c+1):l=[l[0]];break}}}return l.reduceRight((m,d,h)=>{let y,w=!1,g=null,_=null;t&&(y=i&&d.route.id?i[d.route.id]:void 0,g=d.route.errorElement||oh,o&&(c<0&&h===0?(yh("route-fallback"),w=!0,_=null):c===h&&(w=!0,_=d.route.hydrateFallbackElement||null)));let p=e.concat(l.slice(0,h+1)),u=()=>{let f;return y?f=g:w?f=_:d.route.Component?f=x.createElement(d.route.Component,null):d.route.element?f=d.route.element:f=m,x.createElement(uh,{match:d,routeContext:{outlet:m,matches:p,isDataRoute:t!=null},children:f})};return t&&(d.route.ErrorBoundary||d.route.errorElement||h===0)?x.createElement(ch,{location:t.location,revalidation:t.revalidation,component:g,error:y,children:u(),routeContext:{outlet:null,matches:p,isDataRoute:!0}}):u()},null)}var Hu=function(n){return n.UseBlocker="useBlocker",n.UseRevalidator="useRevalidator",n.UseNavigateStable="useNavigate",n}(Hu||{}),$u=function(n){return n.UseBlocker="useBlocker",n.UseLoaderData="useLoaderData",n.UseActionData="useActionData",n.UseRouteError="useRouteError",n.UseNavigation="useNavigation",n.UseRouteLoaderData="useRouteLoaderData",n.UseMatches="useMatches",n.UseRevalidator="useRevalidator",n.UseNavigateStable="useNavigate",n.UseRouteId="useRouteId",n}($u||{});function dh(n){let e=x.useContext(ni);return e||q(!1),e}function fh(n){let e=x.useContext(nh);return e||q(!1),e}function hh(n){let e=x.useContext(Jn);return e||q(!1),e}function Vu(n){let e=hh(),t=e.matches[e.matches.length-1];return t.route.id||q(!1),t.route.id}function mh(){var n;let e=x.useContext(Au),t=fh(),s=Vu();return e!==void 0?e:(n=t.errors)==null?void 0:n[s]}function vh(){let{router:n}=dh(Hu.UseNavigateStable),e=Vu($u.UseNavigateStable),t=x.useRef(!1);return Bu(()=>{t.current=!0}),x.useCallback(function(a,r){r===void 0&&(r={}),t.current&&(typeof a=="number"?n.navigate(a):n.navigate(a,as({fromRouteId:e},r)))},[n,e])}const go={};function yh(n,e,t){go[n]||(go[n]=!0)}function gh(n,e){n==null||n.v7_startTransition,n==null||n.v7_relativeSplatPath}function rr(n){let{to:e,replace:t,state:s,relative:a}=n;vt()||q(!1);let{future:r,static:l}=x.useContext(xe),{matches:i}=x.useContext(Jn),{pathname:o}=Se(),c=ei(),m=Zl(e,Jl(i,r.v7_relativeSplatPath),o,a==="path"),d=JSON.stringify(m);return x.useEffect(()=>c(JSON.parse(d),{replace:t,state:s,relative:a}),[c,d,a,t,s]),null}function wh(n){return ah(n.context)}function Te(n){q(!1)}function kh(n){let{basename:e="/",children:t=null,location:s,navigationType:a=le.Pop,navigator:r,static:l=!1,future:i}=n;vt()&&q(!1);let o=e.replace(/^\/*/,"/"),c=x.useMemo(()=>({basename:o,navigator:r,static:l,future:as({v7_relativeSplatPath:!1},i)}),[o,i,r,l]);typeof s=="string"&&(s=mt(s));let{pathname:m="/",search:d="",hash:h="",state:y=null,key:w="default"}=s,g=x.useMemo(()=>{let _=Xl(m,o);return _==null?null:{location:{pathname:_,search:d,hash:h,state:y,key:w},navigationType:a}},[o,m,d,h,y,w,a]);return g==null?null:x.createElement(xe.Provider,{value:c},x.createElement(La.Provider,{children:t,value:g}))}function xh(n){let{children:e,location:t}=n;return rh(nl(e),t)}new Promise(()=>{});function nl(n,e){e===void 0&&(e=[]);let t=[];return x.Children.forEach(n,(s,a)=>{if(!x.isValidElement(s))return;let r=[...e,a];if(s.type===x.Fragment){t.push.apply(t,nl(s.props.children,r));return}s.type!==Te&&q(!1),!s.props.index||!s.props.children||q(!1);let l={id:s.props.id||r.join("-"),caseSensitive:s.props.caseSensitive,element:s.props.element,Component:s.props.Component,index:s.props.index,path:s.props.path,loader:s.props.loader,action:s.props.action,errorElement:s.props.errorElement,ErrorBoundary:s.props.ErrorBoundary,hasErrorBoundary:s.props.ErrorBoundary!=null||s.props.errorElement!=null,shouldRevalidate:s.props.shouldRevalidate,handle:s.props.handle,lazy:s.props.lazy};s.props.children&&(l.children=nl(s.props.children,r)),t.push(l)}),t}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function el(){return el=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(n[s]=t[s])}return n},el.apply(this,arguments)}function Sh(n,e){if(n==null)return{};var t={},s=Object.keys(n),a,r;for(r=0;r<s.length;r++)a=s[r],!(e.indexOf(a)>=0)&&(t[a]=n[a]);return t}function _h(n){return!!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)}function Ch(n,e){return n.button===0&&(!e||e==="_self")&&!_h(n)}const Eh=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Ph="6";try{window.__reactRouterVersion=Ph}catch{}const Th="startTransition",wo=hp[Th];function Lh(n){let{basename:e,children:t,future:s,window:a}=n,r=x.useRef();r.current==null&&(r.current=Tf({window:a,v5Compat:!0}));let l=r.current,[i,o]=x.useState({action:l.action,location:l.location}),{v7_startTransition:c}=s||{},m=x.useCallback(d=>{c&&wo?wo(()=>o(d)):o(d)},[o,c]);return x.useLayoutEffect(()=>l.listen(m),[l,m]),x.useEffect(()=>gh(s),[s]),x.createElement(kh,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:l,future:s})}const Oh=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Nh=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Qu=x.forwardRef(function(e,t){let{onClick:s,relative:a,reloadDocument:r,replace:l,state:i,target:o,to:c,preventScrollReset:m,viewTransition:d}=e,h=Sh(e,Eh),{basename:y}=x.useContext(xe),w,g=!1;if(typeof c=="string"&&Nh.test(c)&&(w=c,Oh))try{let f=new URL(window.location.href),v=c.startsWith("//")?new URL(f.protocol+c):new URL(c),S=Xl(v.pathname,y);v.origin===f.origin&&S!=null?c=S+v.search+v.hash:g=!0}catch{}let _=eh(c,{relative:a}),p=zh(c,{replace:l,state:i,target:o,preventScrollReset:m,relative:a,viewTransition:d});function u(f){s&&s(f),f.defaultPrevented||p(f)}return x.createElement("a",el({},h,{href:w||_,onClick:g||r?s:u,ref:t,target:o}))});var ko;(function(n){n.UseScrollRestoration="useScrollRestoration",n.UseSubmit="useSubmit",n.UseSubmitFetcher="useSubmitFetcher",n.UseFetcher="useFetcher",n.useViewTransitionState="useViewTransitionState"})(ko||(ko={}));var xo;(function(n){n.UseFetcher="useFetcher",n.UseFetchers="useFetchers",n.UseScrollRestoration="useScrollRestoration"})(xo||(xo={}));function zh(n,e){let{target:t,replace:s,state:a,preventScrollReset:r,relative:l,viewTransition:i}=e===void 0?{}:e,o=ei(),c=Se(),m=Wu(n,{relative:l});return x.useCallback(d=>{if(Ch(d,t)){d.preventDefault();let h=s!==void 0?s:pa(c)===pa(m);o(n,{replace:h,state:a,preventScrollReset:r,relative:l,viewTransition:i})}},[c,o,m,s,a,t,n,r,l,i])}const Rh=[{label:"Start here",links:[{num:"·",label:"Home",path:"/"},{num:"·",label:"Cheat Sheet",path:"/cheatsheet"}]},{label:"Concepts",links:[{num:"1.",label:"Currying",path:"/concepts/currying"},{num:"2.",label:"Abstractions",path:"/concepts/abstractions"},{num:"3.",label:"Pattern Matching",path:"/concepts/pattern-matching"},{num:"4.",label:"Higher-Order Functions",path:"/concepts/higher-order"},{num:"5.",label:"Tail Recursion",path:"/concepts/tail-recursion"},{num:"6.",label:"Iteration",path:"/concepts/iteration"}]},{label:"Exercises",links:[{num:"E1.",label:"Bank Account",path:"/exercises/bank"},{num:"E2.",label:"Playlist",path:"/exercises/playlist"},{num:"E3.",label:"Search",path:"/exercises/search"}]}],jh=[{label:"Home",path:"/"},{label:"Cheat Sheet",path:"/cheatsheet"},{label:"Concepts",path:"/concepts/currying",matchPrefix:"/concepts/"},{label:"Playground",path:"/playground"}];function So({to:n,active:e,fromPlayground:t,className:s,children:a}){const r=n.startsWith("/playground")||t,l=[s,e?"active":""].filter(Boolean).join(" ");return r?O.jsx("a",{href:n,className:l||void 0,children:a}):O.jsx(Qu,{to:n,className:l||void 0,children:a})}function qu({onMenuClick:n}){const{pathname:e}=Se(),t=a=>a.matchPrefix?e.startsWith(a.matchPrefix):a.path==="/"?e==="/"||e==="/index.html":e===a.path||e===a.path+".html",s=e==="/playground"||e==="/playground.html";return O.jsxs("div",{className:"topbar",children:[O.jsxs(So,{to:"/",fromPlayground:s,className:"site-name",children:[O.jsx("img",{src:"/flaticon.png",alt:"",style:{height:24,width:24,display:"inline-block",verticalAlign:"middle",marginRight:8,position:"relative",top:-1,flexShrink:0}}),"o",O.jsx("span",{children:"Caml"}),"Case"]}),O.jsx("nav",{className:"topbar-nav",children:jh.map(a=>O.jsx(So,{to:a.path,active:t(a),fromPlayground:s,children:a.label},a.label))}),O.jsx("button",{className:"menu-btn",onClick:n,children:"☰"})]})}function Ih({open:n,onClose:e}){const{pathname:t}=Se(),s=a=>a==="/"?t==="/"||t==="/index.html":t===a||t===a+".html";return O.jsx("aside",{className:`sidebar${n?" open":""}`,id:"sidebar",children:O.jsx("nav",{children:Rh.map(a=>O.jsxs("div",{className:"nav-group",children:[O.jsx("span",{className:"nav-label",children:a.label}),a.links.map(r=>O.jsxs(Qu,{to:r.path,className:`nav-link${s(r.path)?" active":""}`,onClick:e,children:[O.jsx("span",{className:"nav-num",children:r.num}),r.label]},r.path))]},a.label))})})}function Mh(){const[n,e]=x.useState(!1),{pathname:t}=Se();return x.useEffect(()=>{e(!1),window.scrollTo(0,0)},[t]),O.jsxs(O.Fragment,{children:[O.jsx("div",{className:`overlay${n?" open":""}`,id:"overlay",onClick:()=>e(!1)}),O.jsx(qu,{onMenuClick:()=>e(s=>!s)}),O.jsxs("div",{className:"layout",children:[O.jsx(Ih,{open:n,onClose:()=>e(!1)}),O.jsx("div",{className:"main",children:O.jsx(wh,{})})]})]})}function Ku({title:n,description:e}){return x.useEffect(()=>{if(document.title=n,e){let t=document.querySelector('meta[name="description"]');t||(t=document.createElement("meta"),t.name="description",document.head.appendChild(t)),t.content=e}},[n,e]),null}function Dh({html:n,title:e,description:t}){const s=x.useRef(null),a=ei();return x.useEffect(()=>{const r=s.current;if(!r)return;const l=c=>{const d=c.target.closest("a");if(!d)return;const h=d.getAttribute("href");if(h&&d.target!=="_blank"&&!(/^[a-z]+:/i.test(h)||h.startsWith("//")||h.startsWith("#"))&&!(c.metaKey||c.ctrlKey||c.shiftKey||c.button!==0)){if(c.preventDefault(),h.startsWith("/playground")){window.location.assign(h);return}a(h)}},i=c=>{const d=c.target.closest(".sol-toggle");if(!d)return;d.classList.toggle("open");const h=d.nextElementSibling;h&&h.classList.contains("sol-body")&&h.classList.toggle("open")},o=c=>{var g;const d=c.target.closest(".copy-btn");if(!d)return;const h=d.closest(".code-block"),y=h==null?void 0:h.querySelector("pre");if(!y)return;const w=y.textContent??"";(g=navigator.clipboard)==null||g.writeText(w).then(()=>{const _=d.textContent;d.textContent="copied",setTimeout(()=>{d.textContent=_},1200)}).catch(()=>{})};return r.addEventListener("click",l),r.addEventListener("click",i),r.addEventListener("click",o),()=>{r.removeEventListener("click",l),r.removeEventListener("click",i),r.removeEventListener("click",o)}},[n,a]),O.jsxs(O.Fragment,{children:[O.jsx(Ku,{title:e,description:t}),O.jsx("div",{ref:s,dangerouslySetInnerHTML:{__html:n}})]})}const bh=`<div class="pg-bar" id="pg-bar">\r
  <span class="pg-ex-badge" id="pg-ex-badge" style="display:none;"></span>\r
  <button class="pg-icon-btn" onclick="downloadCode()" title="Download .ml">\r
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>\r
  </button>\r
  <input type="file" id="ml-upload" accept=".ml,.txt" style="display:none">\r
  <button class="pg-icon-btn" onclick="document.getElementById('ml-upload').click()" title="Upload .ml">\r
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>\r
  </button>\r
  <button class="pg-icon-btn" id="pg-share-btn" onclick="shareCode()" title="Share via link">\r
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>\r
  </button>\r
  <button class="pg-icon-btn" onclick="openSettings()" title="Settings">\r
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>\r
  </button>\r
  <button class="run-btn" id="run-btn" onclick="runCode()" style="margin-left:auto;">Run</button>\r
</div>\r
\r
<div class="pg-body" id="pg-body">\r
  <div class="pg-left-panel">\r
    <div class="pg-tab-bar" id="pg-tab-bar"></div>\r
    <span id="editor-label" style="display:none">scratch.ml</span>\r
    <div class="pg-editor-panel">\r
      <textarea class="pg-editor" id="pg-editor" spellcheck="false">(* Write your OCaml here *)\r
\r
let () =\r
  Printf.printf "Hello, OCaml!\\n"\r
</textarea>\r
    </div>\r
    <div class="pg-info-panel" id="pg-info-panel">\r
      <div class="pg-info-header" onclick="toggleInfoPanel()">\r
        <span>Types &amp; Signatures</span>\r
        <span class="pg-info-arrow">&#9660;</span>\r
      </div>\r
      <pre class="pg-info-content" id="pg-info-content"><span class="pg-info-empty">Run your code to see types.</span></pre>\r
    </div>\r
  </div>\r
\r
  <div class="pg-right-panel">\r
    <div class="pg-tasks-panel">\r
      <div class="pg-tasks-header">Tasks</div>\r
      <div id="pg-tasks"></div>\r
    </div>\r
    <div class="pg-log-panel">\r
      <div class="pg-log-header">Output</div>\r
      <pre class="pg-log" id="pg-log"><span class="pg-log-empty">Run your code to see output.</span></pre>\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- Settings modal -->\r
<div class="pg-settings-overlay" id="pg-settings-overlay" onclick="closeSettingsOverlay(event)">\r
  <div class="pg-settings-panel">\r
    <div class="pg-settings-header">\r
      <span>Settings</span>\r
      <button class="pg-settings-close" onclick="closeSettings()">×</button>\r
    </div>\r
    <div class="pg-settings-body">\r
      <div class="pg-setting-row">\r
        <span class="pg-setting-label">Dark mode</span>\r
        <button class="pg-toggle" id="settings-theme-btn" onclick="toggleTheme()">Off</button>\r
      </div>\r
      <div class="pg-setting-row">\r
        <span class="pg-setting-label">Autocomplete</span>\r
        <button class="pg-toggle pg-toggle-on" id="settings-autocomplete-btn" onclick="toggleAutocomplete()">On</button>\r
      </div>\r
      <div class="pg-settings-divider"></div>\r
      <div class="pg-setting-row">\r
        <span class="pg-setting-label">Editor zoom</span>\r
        <div class="pg-zoom-btns">\r
          <button class="pg-zoom-btn" onclick="editorZoom(-1)">−</button>\r
          <span class="pg-zoom-val" id="editor-zoom-val">13px</span>\r
          <button class="pg-zoom-btn" onclick="editorZoom(+1)">+</button>\r
        </div>\r
      </div>\r
      <div class="pg-setting-row">\r
        <span class="pg-setting-label">Output zoom</span>\r
        <div class="pg-zoom-btns">\r
          <button class="pg-zoom-btn" onclick="consoleZoom(-1)">−</button>\r
          <span class="pg-zoom-val" id="console-zoom-val">13px</span>\r
          <button class="pg-zoom-btn" onclick="consoleZoom(+1)">+</button>\r
        </div>\r
      </div>\r
      <div class="pg-settings-divider"></div>\r
      <div class="pg-settings-section-title">Keyboard Shortcuts</div>\r
      <div class="pg-shortcut-row"><span>Run code</span><kbd>Ctrl+Enter</kbd></div>\r
      <div class="pg-shortcut-row"><span>Prettify</span><kbd>Shift+Alt+F</kbd></div>\r
      <div class="pg-shortcut-row"><span>Toggle comment</span><kbd>Ctrl+/</kbd></div>\r
      <div class="pg-shortcut-row"><span>Duplicate line</span><kbd>Alt+Shift+D</kbd></div>\r
      <div class="pg-shortcut-row"><span>Move line up</span><kbd>Alt+↑</kbd></div>\r
      <div class="pg-shortcut-row"><span>Move line down</span><kbd>Alt+↓</kbd></div>\r
      <div class="pg-shortcut-row"><span>Autocomplete</span><kbd>Ctrl+Space</kbd></div>\r
      <div class="pg-shortcut-row"><span>Find</span><kbd>Ctrl+F</kbd></div>\r
      <div class="pg-shortcut-row"><span>Replace</span><kbd>Ctrl+H</kbd></div>\r
      <div class="pg-settings-divider"></div>\r
      <button class="pg-reset-btn" onclick="resetOCaml()">\r
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg>\r
        Reset OCaml Interpreter\r
      </button>\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- Hidden elements required by the OCaml runtime -->\r
<div id="toplevel-container" style="position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;">\r
  <pre id="output"></pre>\r
  <div>\r
    <div id="sharp" class="sharp"></div>\r
    <textarea id="userinput" autocorrect="off" autocapitalize="none">Loading ...</textarea>\r
  </div>\r
</div>\r
<canvas id="test-canvas" style="position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;display:block;"></canvas>\r`,Fh=["/playground/js/codemirror/codemirror.js","/playground/js/codemirror/closebrackets.js","/playground/js/codemirror/matchbrackets.min.js","/playground/js/codemirror/mllike.js","/playground/js/codemirror/searchcursor.js","/playground/js/codemirror/dialog.js","/playground/js/codemirror/search.js","/playground/js/codemirror/show-hint.js"],lr="/playground/js/playground-main.js";function Uh(n){return new Promise((e,t)=>{if(document.querySelector(`script[data-pg-src="${n}"]`)){e();return}const a=document.createElement("script");a.src=n,a.async=!1,a.dataset.pgSrc=n,a.onload=()=>e(),a.onerror=()=>t(new Error(`Failed to load ${n}`)),document.body.appendChild(a)})}function Ah(){const n=x.useRef(null);return x.useEffect(()=>{document.documentElement.setAttribute("data-pg-theme","light");let e=!1;return(async()=>{for(const a of Fh)if(await Uh(a),e)return;const t=document.querySelector(`script[data-pg-src="${lr}"]`);t&&t.remove();const s=document.createElement("script");s.src=lr+"?t="+Date.now(),s.async=!1,s.dataset.pgSrc=lr,document.body.appendChild(s)})().catch(t=>console.error("[playground] load error:",t)),()=>{e=!0}},[]),O.jsxs(O.Fragment,{children:[O.jsx(Ku,{title:"Playground | oCamlCase"}),O.jsx(qu,{onMenuClick:()=>{}}),O.jsx("div",{ref:n,dangerouslySetInnerHTML:{__html:bh}})]})}const Bh=`<div class="home-hero">\r
      <!-- Official OCaml logo -->\r
      <a href="https://ocaml.org" target="_blank" rel="noopener" style="display:inline-block; margin-bottom:24px;">\r
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/ff/OCaml_Logo.svg"\r
             alt="OCaml logo" style="height:52px; width:auto; display:block;">\r
      </a>\r
      <h1>Learn OCaml<br>by example.</h1>\r
      <p>A practical guide to OCaml covering functional patterns, type system features, and coding exercises. Written for programmers who want to understand the language, not just copy it.</p>\r
    </div>\r
\r
    <div class="home-toc">\r
      <div class="toc-section">\r
        <div class="toc-section-head">\r
          <span class="toc-section-title">Reference</span>\r
        </div>\r
        <div class="toc-items">\r
          <a href="/cheatsheet" class="toc-item">\r
            <span class="toc-num">·</span>\r
            Cheat Sheet\r
            <span class="toc-desc">Syntax quick-reference: bindings, types, functions, modules</span>\r
          </a>\r
        </div>\r
      </div>\r
\r
      <div class="toc-section">\r
        <div class="toc-section-head">\r
          <span class="toc-section-title">Concepts</span>\r
          <span class="toc-section-count">6 topics</span>\r
        </div>\r
        <div class="toc-items">\r
          <a href="/concepts/currying" class="toc-item">\r
            <span class="toc-num">1.</span>\r
            Currying\r
            <span class="toc-desc">Partial application and multi-arg functions</span>\r
          </a>\r
          <a href="/concepts/abstractions" class="toc-item">\r
            <span class="toc-num">2.</span>\r
            Abstractions\r
            <span class="toc-desc">Hiding complexity behind clean interfaces</span>\r
          </a>\r
          <a href="/concepts/pattern-matching" class="toc-item">\r
            <span class="toc-num">3.</span>\r
            Pattern Matching\r
            <span class="toc-desc">Destructuring values with match expressions</span>\r
          </a>\r
          <a href="/concepts/higher-order" class="toc-item">\r
            <span class="toc-num">4.</span>\r
            Higher-Order Functions\r
            <span class="toc-desc">map, filter, fold and functions as values</span>\r
          </a>\r
          <a href="/concepts/tail-recursion" class="toc-item">\r
            <span class="toc-num">5.</span>\r
            Tail Recursion\r
            <span class="toc-desc">Writing stack-safe recursive functions</span>\r
          </a>\r
          <a href="/concepts/iteration" class="toc-item">\r
            <span class="toc-num">6.</span>\r
            Iteration\r
            <span class="toc-desc">Loops, folds, and iterative patterns</span>\r
          </a>\r
        </div>\r
      </div>\r
\r
      <div class="toc-section">\r
        <div class="toc-section-head">\r
          <span class="toc-section-title">Exercises</span>\r
          <span class="toc-section-count">3 challenges</span>\r
        </div>\r
        <div class="toc-items">\r
          <a href="/exercises/bank" class="toc-item">\r
            <span class="toc-num">E1.</span>\r
            Bank Account\r
            <span class="toc-diff">medium</span>\r
            <span class="toc-desc">Variant types, records, fold</span>\r
          </a>\r
          <a href="/exercises/playlist" class="toc-item">\r
            <span class="toc-num">E2.</span>\r
            Playlist\r
            <span class="toc-diff">easy</span>\r
            <span class="toc-desc">List operations, pattern matching</span>\r
          </a>\r
          <a href="/exercises/search" class="toc-item">\r
            <span class="toc-num">E3.</span>\r
            Search\r
            <span class="toc-diff">hard</span>\r
            <span class="toc-desc">Definite and indefinite iteration, searching with predicates</span>\r
          </a>\r
        </div>\r
      </div>\r
    </div>`,Wh=`<div class="article" style="max-width:1060px;">\r
      <div class="page-header">\r
        <div class="page-label">Reference</div>\r
        <h1 class="page-title">OCaml Cheat Sheet</h1>\r
        <p class="page-intro">Common syntax for OCaml 5.x. Not exhaustive. Each card shows the most useful forms.</p>\r
      </div>\r
\r
      <!-- Bindings -->\r
      <div class="cheat-section">\r
        <h2>Bindings</h2>\r
        <div class="cheat-grid">\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">let binding</div>\r
<pre><span class="kw">let</span> x = <span class="num">42</span>\r
<span class="kw">let</span> name = <span class="str">"Alice"</span>\r
<span class="kw">let</span> pi : <span class="ty">float</span> = <span class="num">3.14159</span>\r
<span class="cmt">(* immutable by default *)</span></pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">let … in (local scope)</div>\r
<pre><span class="kw">let</span> result =\r
  <span class="kw">let</span> a = <span class="num">10</span> <span class="kw">in</span>\r
  <span class="kw">let</span> b = <span class="num">20</span> <span class="kw">in</span>\r
  a + b    <span class="cmt">(* 30 *)</span></pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">mutable ref</div>\r
<pre><span class="kw">let</span> n = <span class="fn">ref</span> <span class="num">0</span>\r
n := !n + <span class="num">1</span>\r
<span class="ty">Printf</span>.<span class="fn">printf</span> <span class="str">"%d\\n"</span> !n  <span class="cmt">(* 1 *)</span></pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">destructuring</div>\r
<pre><span class="kw">let</span> (a, b)       = (<span class="num">1</span>, <span class="num">2</span>)\r
<span class="kw">let</span> { name; age } = person\r
<span class="kw">let</span> x :: rest    = [<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>]</pre>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Types -->\r
      <div class="cheat-section">\r
        <h2>Types</h2>\r
        <div class="cheat-grid">\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">type alias</div>\r
<pre><span class="kw">type</span> <span class="ty">name</span>     = <span class="ty">string</span>\r
<span class="kw">type</span> <span class="ty">point</span>    = <span class="ty">float</span> * <span class="ty">float</span>\r
<span class="kw">type</span> <span class="ty">'a pair</span> = <span class="ty">'a</span> * <span class="ty">'a</span></pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">record type</div>\r
<pre><span class="kw">type</span> <span class="ty">person</span> = {\r
  name  : <span class="ty">string</span>;\r
  age   : <span class="ty">int</span>;\r
  mutable score : <span class="ty">int</span>;\r
}\r
<span class="kw">let</span> p2 = { p <span class="kw">with</span> age = <span class="num">31</span> }</pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">variant (ADT)</div>\r
<pre><span class="kw">type</span> <span class="ty">shape</span> =\r
  | <span class="ty">Circle</span>    <span class="kw">of</span> <span class="ty">float</span>\r
  | <span class="ty">Rect</span>      <span class="kw">of</span> <span class="ty">float</span> * <span class="ty">float</span>\r
  | <span class="ty">Point</span>\r
<span class="kw">let</span> s = <span class="ty">Circle</span> <span class="num">5.0</span></pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">option</div>\r
<pre><span class="kw">let</span> <span class="fn">safe_div</span> a b =\r
  <span class="kw">if</span> b = <span class="num">0</span> <span class="kw">then</span> <span class="ty">None</span>\r
  <span class="kw">else</span> <span class="ty">Some</span> (a / b)\r
<span class="cmt">(* int -> int -> int option *)</span></pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">result</div>\r
<pre><span class="kw">let</span> <span class="fn">parse</span> s =\r
  <span class="kw">match</span> <span class="fn">int_of_string_opt</span> s <span class="kw">with</span>\r
  | <span class="ty">Some</span> n -> <span class="ty">Ok</span> n\r
  | <span class="ty">None</span>   -> <span class="ty">Error</span> <span class="str">"not a number"</span></pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">recursive type</div>\r
<pre><span class="kw">type</span> <span class="ty">'a tree</span> =\r
  | <span class="ty">Leaf</span>\r
  | <span class="ty">Node</span> <span class="kw">of</span> <span class="ty">'a</span> * <span class="ty">'a tree</span> * <span class="ty">'a tree</span></pre>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Functions -->\r
      <div class="cheat-section">\r
        <h2>Functions</h2>\r
        <div class="cheat-grid">\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">defining functions</div>\r
<pre><span class="kw">let</span> <span class="fn">square</span> x  = x * x\r
<span class="kw">let</span> <span class="fn">add</span> x y   = x + y\r
<span class="kw">let</span> <span class="fn">sq</span>        = <span class="kw">fun</span> x -> x * x</pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">recursive</div>\r
<pre><span class="kw">let</span> <span class="kw">rec</span> <span class="fn">fact</span> n =\r
  <span class="kw">if</span> n <= <span class="num">1</span> <span class="kw">then</span> <span class="num">1</span>\r
  <span class="kw">else</span> n * <span class="fn">fact</span> (n - <span class="num">1</span>)\r
<span class="fn">fact</span> <span class="num">5</span>  <span class="cmt">(* 120 *)</span></pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">labeled &amp; optional args</div>\r
<pre><span class="kw">let</span> <span class="fn">greet</span> ?(title=<span class="str">""</span>) ~name =\r
  <span class="kw">if</span> title = <span class="str">""</span> <span class="kw">then</span> name\r
  <span class="kw">else</span> title ^ <span class="str">" "</span> ^ name\r
<span class="fn">greet</span> ~title:<span class="str">"Dr."</span> ~name:<span class="str">"Lee"</span></pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">pipe operator |&gt;</div>\r
<pre>[<span class="num">1</span>;<span class="num">2</span>;<span class="num">3</span>;<span class="num">4</span>;<span class="num">5</span>]\r
|> <span class="ty">List</span>.<span class="fn">filter</span> (<span class="kw">fun</span> x -> x <span class="kw">mod</span> <span class="num">2</span> = <span class="num">0</span>)\r
|> <span class="ty">List</span>.<span class="fn">map</span>    (<span class="kw">fun</span> x -> x * x)\r
|> <span class="ty">List</span>.<span class="fn">fold_left</span> (+) <span class="num">0</span>  <span class="cmt">(* 20 *)</span></pre>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Pattern matching -->\r
      <div class="cheat-section">\r
        <h2>Pattern Matching</h2>\r
        <div class="cheat-grid">\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">match expression</div>\r
<pre><span class="kw">match</span> x <span class="kw">with</span>\r
| <span class="num">0</span>           -> <span class="str">"zero"</span>\r
| n <span class="kw">when</span> n < <span class="num">0</span> -> <span class="str">"negative"</span>\r
| _           -> <span class="str">"positive"</span></pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">matching variants</div>\r
<pre><span class="kw">let</span> <span class="fn">area</span> = <span class="kw">function</span>\r
  | <span class="ty">Circle</span> r     -> <span class="ty">Float</span>.<span class="fn">pi</span> *. r *. r\r
  | <span class="ty">Rect</span> (w, h)  -> w *. h\r
  | <span class="ty">Point</span>        -> <span class="num">0.0</span></pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">matching lists</div>\r
<pre><span class="kw">let</span> <span class="kw">rec</span> <span class="fn">sum</span> = <span class="kw">function</span>\r
  | []      -> <span class="num">0</span>\r
  | x :: xs -> x + <span class="fn">sum</span> xs\r
<span class="fn">sum</span> [<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>]  <span class="cmt">(* 6 *)</span></pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">nested patterns</div>\r
<pre><span class="kw">match</span> pair <span class="kw">with</span>\r
| (<span class="ty">Some</span> x, <span class="ty">Some</span> y) -> x + y\r
| (<span class="ty">Some</span> x, <span class="ty">None</span>)   -> x\r
| (<span class="ty">None</span>,   _)      -> <span class="num">0</span></pre>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Lists -->\r
      <div class="cheat-section">\r
        <h2>Lists &amp; Collections</h2>\r
        <div class="cheat-grid">\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">list basics</div>\r
<pre><span class="kw">let</span> xs = [<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>]\r
<span class="num">0</span> :: xs           <span class="cmt">(* [0;1;2;3] *)</span>\r
xs @ [<span class="num">4</span>; <span class="num">5</span>]      <span class="cmt">(* [1;2;3;4;5] *)</span>\r
<span class="ty">List</span>.<span class="fn">length</span> xs    <span class="cmt">(* 3 *)</span></pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">map / filter / fold</div>\r
<pre><span class="ty">List</span>.<span class="fn">map</span>    (<span class="kw">fun</span> x -> x*<span class="num">2</span>) xs\r
<span class="cmt">(* [2; 4; 6] *)</span>\r
<span class="ty">List</span>.<span class="fn">filter</span> (<span class="kw">fun</span> x -> x > <span class="num">1</span>) xs\r
<span class="cmt">(* [2; 3] *)</span>\r
<span class="ty">List</span>.<span class="fn">fold_left</span> (+) <span class="num">0</span> xs  <span class="cmt">(* 6 *)</span></pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">arrays</div>\r
<pre><span class="kw">let</span> a = [| <span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span> |]\r
a.(<span class="num">0</span>)           <span class="cmt">(* 1, read *)</span>\r
a.(<span class="num">0</span>) <- <span class="num">99</span>     <span class="cmt">(* mutate *)</span>\r
<span class="ty">Array</span>.<span class="fn">map</span> (<span class="kw">fun</span> x -> x+<span class="num">1</span>) a</pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">Hashtbl</div>\r
<pre><span class="kw">let</span> t = <span class="ty">Hashtbl</span>.<span class="fn">create</span> <span class="num">16</span>\r
<span class="ty">Hashtbl</span>.<span class="fn">add</span>    t <span class="str">"k"</span> <span class="num">42</span>\r
<span class="ty">Hashtbl</span>.<span class="fn">find</span>   t <span class="str">"k"</span>   <span class="cmt">(* 42 *)</span>\r
<span class="ty">Hashtbl</span>.<span class="fn">remove</span> t <span class="str">"k"</span></pre>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Modules -->\r
      <div class="cheat-section">\r
        <h2>Modules</h2>\r
        <div class="cheat-grid">\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">defining a module</div>\r
<pre><span class="kw">module</span> <span class="ty">Stack</span> = <span class="kw">struct</span>\r
  <span class="kw">type</span> <span class="ty">'a t</span> = <span class="ty">'a list</span>\r
  <span class="kw">let</span> <span class="fn">empty</span>    = []\r
  <span class="kw">let</span> <span class="fn">push</span> x s = x :: s\r
<span class="kw">end</span></pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">signature</div>\r
<pre><span class="kw">module type</span> <span class="ty">S</span> = <span class="kw">sig</span>\r
  <span class="kw">type</span> <span class="ty">'a t</span>\r
  <span class="kw">val</span> <span class="fn">empty</span> : <span class="ty">'a t</span>\r
  <span class="kw">val</span> <span class="fn">push</span>  : <span class="ty">'a -> 'a t -> 'a t</span>\r
<span class="kw">end</span></pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">local open (preferred)</div>\r
<pre><span class="kw">let</span> result =\r
  <span class="ty">List</span>.(<span class="fn">map</span> (<span class="kw">fun</span> x -> x+<span class="num">1</span>)\r
         [<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>])\r
<span class="cmt">(* avoids polluting scope *)</span></pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">functor</div>\r
<pre><span class="kw">module</span> <span class="ty">StringMap</span> =\r
  <span class="ty">Map</span>.<span class="fn">Make</span>(<span class="ty">String</span>)\r
\r
<span class="kw">let</span> m =\r
  <span class="ty">StringMap</span>.<span class="fn">add</span> <span class="str">"k"</span> <span class="num">1</span>\r
    <span class="ty">StringMap</span>.<span class="fn">empty</span></pre>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- I/O -->\r
      <div class="cheat-section">\r
        <h2>I/O &amp; Misc</h2>\r
        <div class="cheat-grid">\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">printing</div>\r
<pre><span class="fn">print_endline</span> <span class="str">"hello"</span>\r
<span class="ty">Printf</span>.<span class="fn">printf</span> <span class="str">"%s = %d\\n"</span> <span class="str">"x"</span> <span class="num">42</span>\r
<span class="kw">let</span> s = <span class="ty">Printf</span>.<span class="fn">sprintf</span> <span class="str">"n=%d"</span> <span class="num">5</span></pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">exceptions</div>\r
<pre><span class="kw">exception</span> <span class="ty">Bad</span> <span class="kw">of</span> <span class="ty">string</span>\r
<span class="kw">raise</span> (<span class="ty">Bad</span> <span class="str">"oops"</span>)\r
\r
<span class="kw">try</span> <span class="fn">risky</span> () <span class="kw">with</span>\r
| <span class="ty">Bad</span> msg -> <span class="fn">print_endline</span> msg</pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">strings</div>\r
<pre><span class="str">"hello"</span> ^ <span class="str">" world"</span>\r
<span class="ty">String</span>.<span class="fn">length</span> <span class="str">"hi"</span>       <span class="cmt">(* 2 *)</span>\r
<span class="ty">String</span>.<span class="fn">sub</span> s <span class="num">0</span> <span class="num">5</span>\r
<span class="ty">String</span>.<span class="fn">split_on_char</span> <span class="str">' '</span> s</pre>\r
          </div>\r
          <div class="cheat-cell">\r
            <div class="cheat-cell-head">control flow</div>\r
<pre><span class="kw">if</span> x > <span class="num">0</span> <span class="kw">then</span> <span class="str">"pos"</span> <span class="kw">else</span> <span class="str">"other"</span>\r
\r
<span class="kw">for</span> i = <span class="num">0</span> <span class="kw">to</span> <span class="num">9</span> <span class="kw">do</span>\r
  <span class="fn">print_int</span> i <span class="kw">done</span>\r
\r
<span class="kw">while</span> !n > <span class="num">0</span> <span class="kw">do</span>\r
  n := !n - <span class="num">1</span> <span class="kw">done</span></pre>\r
          </div>\r
        </div>\r
      </div>\r
\r
    </div>`,Hh=`<div class="article">\r
      <div class="page-header">\r
        <div class="page-label">Concept 1 of 6</div>\r
        <h1 class="page-title">Currying</h1>\r
        <p class="page-intro">Every function in OCaml takes exactly one argument. Multi-parameter syntax is shorthand for a chain of single-argument functions, and this has practical consequences.</p>\r
      </div>\r
\r
      <h2>What is currying?</h2>\r
      <p>When you write <code>let add x y = x + y</code>, OCaml sees it as <code>fun x -> fun y -> x + y</code>. The multi-argument syntax is sugar. This style of representing multi-argument functions as nested single-argument functions is called <em>currying</em>, after mathematician Haskell Curry.</p>\r
      <p>The practical consequence: you can call a function with fewer arguments than it expects, and you'll get back a new function waiting for the rest.</p>\r
\r
      <div class="two-col lean">\r
        <div>\r
          <div class="callout callout-key">\r
            <div class="callout-title">Key insight</div>\r
            <p>A curried function of <em>n</em> arguments is a chain of <em>n</em> single-argument functions, each closing over the previous argument.</p>\r
          </div>\r
          <p>The type signature makes this visible. <code>add</code> has type <code>int -> int -> int</code>, which associates right: <code>int -> (int -> int)</code>. It takes an <code>int</code> and returns a function from <code>int</code> to <code>int</code>.</p>\r
        </div>\r
        <div class="sticky">\r
          <div class="code-block">\r
            <div class="code-top">\r
              <span class="code-fname">add.ml</span>\r
              <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
            </div>\r
<pre><span class="cmt">(* These two definitions are identical *)</span>\r
<span class="kw">let</span> <span class="fn">add</span> x y = x + y\r
<span class="kw">let</span> <span class="fn">add</span> = <span class="kw">fun</span> x -> <span class="kw">fun</span> y -> x + y\r
\r
<span class="cmt">(* Type: int -> int -> int\r
         i.e. int -> (int -> int) *)</span>\r
\r
<span class="kw">let</span> result   = <span class="fn">add</span> <span class="num">3</span> <span class="num">4</span>     <span class="cmt">(* 7 *)</span>\r
<span class="kw">let</span> <span class="fn">add_five</span> = <span class="fn">add</span> <span class="num">5</span>       <span class="cmt">(* int -> int *)</span>\r
<span class="kw">let</span> result   = <span class="fn">add_five</span> <span class="num">10</span>  <span class="cmt">(* 15 *)</span></pre>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <h2>Partial application</h2>\r
      <p>Supplying fewer arguments than a function expects returns a new, more specific function. This is <em>partial application</em>, and it is the main reason currying is useful in practice.</p>\r
      <p>In most languages, creating a specialized version of a function requires a wrapper or a factory. In OCaml, you just call the function with some of its arguments.</p>\r
\r
      <div class="two-col lean">\r
        <div>\r
          <p>Here, <code>multiply_by</code> is a general multiplier. Partially applying it with <code>2</code> gives us <code>double</code>, a real named function we can reuse anywhere. We can then pass it directly to <code>List.map</code> without any wrapping.</p>\r
          <div class="callout callout-tip">\r
            <div class="callout-title">Good practice</div>\r
            <p>When writing higher-order functions, design the argument order so the most-varied argument comes last. This makes partial application natural.</p>\r
          </div>\r
        </div>\r
        <div class="sticky">\r
          <div class="code-block">\r
            <div class="code-top">\r
              <span class="code-fname">partial.ml</span>\r
              <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
            </div>\r
<pre><span class="kw">let</span> <span class="fn">multiply_by</span> factor x = factor * x\r
<span class="cmt">(* multiply_by : int -> int -> int *)</span>\r
\r
<span class="kw">let</span> <span class="fn">double</span>    = <span class="fn">multiply_by</span> <span class="num">2</span>\r
<span class="kw">let</span> <span class="fn">times_ten</span> = <span class="fn">multiply_by</span> <span class="num">10</span>\r
\r
<span class="fn">double</span> <span class="num">7</span>      <span class="cmt">(* 14 *)</span>\r
<span class="fn">times_ten</span> <span class="num">3</span>  <span class="cmt">(* 30 *)</span>\r
\r
<span class="cmt">(* No wrapper needed, pass directly *)</span>\r
<span class="ty">List</span>.<span class="fn">map</span> <span class="fn">double</span> [<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>; <span class="num">4</span>; <span class="num">5</span>]\r
<span class="cmt">(* [2; 4; 6; 8; 10] *)</span></pre>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <h2>Labeled arguments</h2>\r
      <p>OCaml supports labeled arguments with <code>~label:</code> syntax. Labels make the argument order explicit at the call site, and allow arguments to be supplied in any order, which changes how partial application works.</p>\r
\r
      <div class="two-col lean">\r
        <div>\r
          <p>With labels, you can fix any argument regardless of position. Here we fix <code>~sep</code> first to create specialized join functions, but we could equally fix the list argument and vary the separator.</p>\r
          <div class="callout callout-warn">\r
            <div class="callout-title">Watch out</div>\r
            <p>Labeled partial application is order-independent only if the remaining arguments have distinct labels (or the last argument is unlabeled). Mixing labeled and unlabeled can surprise you.</p>\r
          </div>\r
        </div>\r
        <div class="sticky">\r
          <div class="code-block">\r
            <div class="code-top">\r
              <span class="code-fname">labeled.ml</span>\r
              <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
            </div>\r
<pre><span class="kw">let</span> <span class="fn">join</span> ~<span class="fn">sep</span> words =\r
  <span class="ty">String</span>.<span class="fn">concat</span> sep words\r
\r
<span class="cmt">(* Fix sep, vary the list *)</span>\r
<span class="kw">let</span> <span class="fn">csv</span>      = <span class="fn">join</span> ~sep:<span class="str">","</span>\r
<span class="kw">let</span> <span class="fn">sentence</span> = <span class="fn">join</span> ~sep:<span class="str">" "</span>\r
\r
<span class="fn">csv</span>      [<span class="str">"alice"</span>; <span class="str">"bob"</span>; <span class="str">"carol"</span>]\r
<span class="cmt">(* "alice,bob,carol" *)</span>\r
\r
<span class="fn">sentence</span> [<span class="str">"the"</span>; <span class="str">"quick"</span>; <span class="str">"fox"</span>]\r
<span class="cmt">(* "the quick fox" *)</span></pre>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <h2>The pipe operator and composition</h2>\r
      <p>Currying works naturally with the <code>|&gt;</code> pipe operator. The pipe passes a value left-to-right through a sequence of functions, most of which are partially applied. The result reads like a data pipeline: each step is one transformation.</p>\r
      <p>You can also define a compose operator <code>%</code> for when you want to build a reusable pipeline without an initial value.</p>\r
\r
      <div class="code-block inline">\r
        <div class="code-top">\r
          <span class="code-fname">compose.ml</span>\r
          <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
        </div>\r
<pre><span class="cmt">(* Right-to-left compose *)</span>\r
<span class="kw">let</span> (<span class="fn">%</span>) f g x = f (g x)\r
\r
<span class="kw">let</span> <span class="fn">trim_upper</span> =\r
  <span class="ty">String</span>.<span class="fn">uppercase_ascii</span> % <span class="ty">String</span>.<span class="fn">trim</span>\r
\r
<span class="fn">trim_upper</span> <span class="str">"  hello  "</span>   <span class="cmt">(* "HELLO" *)</span>\r
\r
<span class="cmt">(* Left-to-right with |> *)</span>\r
<span class="str">"  hello world  "</span>\r
|> <span class="ty">String</span>.<span class="fn">trim</span>\r
|> <span class="ty">String</span>.<span class="fn">uppercase_ascii</span>\r
|> <span class="ty">String</span>.<span class="fn">split_on_char</span> <span class="str">' '</span>\r
<span class="cmt">(* ["HELLO"; "WORLD"] *)</span></pre>\r
      </div>\r
\r
      <div class="page-footer">\r
        <a href="/">← Home</a>\r
        <a href="/concepts/abstractions">Next: Abstractions →</a>\r
      </div>\r
    </div>`,$h=`<div class="article">\r
      <div class="page-header">\r
        <div class="page-label">Concept 2 of 6</div>\r
        <h1 class="page-title">Abstractions</h1>\r
        <p class="page-intro">An abstraction is a function without a name. OCaml uses the <code>fun</code> keyword to create them, and they are ordinary values just like integers or strings.</p>\r
      </div>\r
\r
      <h2>Anonymous functions</h2>\r
      <p>In most languages, creating a function requires giving it a name. OCaml lets you write a function as an expression anywhere a value is expected. The syntax is <code>fun &lt;arg&gt; -&gt; &lt;expr&gt;</code>, and the result has a function type.</p>\r
      <p>Other languages call these lambdas or anonymous functions. In OCaml, the formal term is <em>abstraction</em>, because the expression abstracts over the argument: the argument is left open, and the body is the computation to run once it is supplied.</p>\r
\r
      <div class="two-col lean">\r
        <div>\r
          <p>The type of <code>fun x -&gt; x * x</code> is <code>int -&gt; int</code>. It takes an integer and returns an integer. No name is needed, and the function can be used immediately. You can also apply it on the spot by wrapping it in parentheses and passing an argument.</p>\r
          <div class="callout callout-key">\r
            <div class="callout-title">Key point</div>\r
            <p>An abstraction produces a value of a function type. It is not a statement or a declaration. It is an expression that evaluates to a function.</p>\r
          </div>\r
        </div>\r
        <div class="sticky">\r
          <div class="code-block">\r
            <div class="code-top">\r
              <span class="code-fname">anon.ml</span>\r
              <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
            </div>\r
<pre><span class="cmt">(* A function with no name *)</span>\r
<span class="kw">let</span> _ = <span class="kw">fun</span> x -> x * x\r
<span class="cmt">(* type: int -> int *)</span>\r
\r
<span class="cmt">(* Define it and apply it immediately *)</span>\r
<span class="kw">let</span> _ = (<span class="kw">fun</span> x -> x * x) <span class="num">7</span>\r
<span class="cmt">(* = 49 *)</span>\r
\r
<span class="cmt">(* Bind it to a name if you want to reuse it *)</span>\r
<span class="kw">let</span> <span class="fn">square</span> = <span class="kw">fun</span> x -> x * x</pre>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <h2>Tuple arguments</h2>\r
      <p>An abstraction takes exactly one argument, but that argument can be a tuple. Tuple destructuring happens right in the argument position, so the function body can use the components directly by name.</p>\r
      <p>This looks like multiple arguments, but it is not. The function takes one pair and unpacks it. The distinction matters for currying: a function taking a tuple cannot be partially applied in the same way as a curried function.</p>\r
\r
      <div class="two-col lean">\r
        <div>\r
          <p>Contrast <code>fun x y -&gt; x * y</code> (two curried arguments, type <code>int -&gt; int -&gt; int</code>) with <code>fun (x, y) -&gt; x * y</code> (one tuple argument, type <code>int * int -&gt; int</code>). The difference is visible in the types.</p>\r
        </div>\r
        <div class="sticky">\r
          <div class="code-block">\r
            <div class="code-top">\r
              <span class="code-fname">tuple_arg.ml</span>\r
              <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
            </div>\r
<pre><span class="cmt">(* Tuple argument *)</span>\r
<span class="kw">let</span> _ = <span class="kw">fun</span> (x, y) -> x * y\r
<span class="cmt">(* type: int * int -> int *)</span>\r
\r
<span class="cmt">(* Apply with a tuple *)</span>\r
<span class="kw">let</span> _ = (<span class="kw">fun</span> (x, y) -> x * y) (<span class="num">6</span>, <span class="num">7</span>)\r
<span class="cmt">(* = 42 *)</span>\r
\r
<span class="cmt">(* Curried version, two separate args *)</span>\r
<span class="kw">let</span> _ = <span class="kw">fun</span> x y -> x * y\r
<span class="cmt">(* type: int -> int -> int *)</span></pre>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <h2>The connection to let bindings</h2>\r
      <p>When you write <code>let square x = x * x</code>, OCaml treats it as exactly the same thing as <code>let square = fun x -&gt; x * x</code>. The multi-argument <code>let</code> form is syntactic sugar. Under the hood, a named function is just an abstraction bound to a name.</p>\r
      <p>This means there is nothing special about named functions. They are ordinary values of function types, stored in the environment like any other binding. The <code>fun</code> form makes this explicit.</p>\r
\r
      <div class="code-block inline">\r
        <div class="code-top">\r
          <span class="code-fname">let_vs_fun.ml</span>\r
          <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
        </div>\r
<pre><span class="cmt">(* These two definitions are completely equivalent *)</span>\r
<span class="kw">let</span> <span class="fn">square</span> x = x * x\r
<span class="kw">let</span> <span class="fn">square'</span> = <span class="kw">fun</span> x -> x * x\r
\r
<span class="cmt">(* The let form is sugar. The fun form is the underlying representation.\r
   OCaml sees both as binding a function value to a name. *)</span>\r
\r
<span class="cmt">(* Same for multiple arguments *)</span>\r
<span class="kw">let</span> <span class="fn">add</span> x y = x + y\r
<span class="kw">let</span> <span class="fn">add'</span> = <span class="kw">fun</span> x -> <span class="kw">fun</span> y -> x + y</pre>\r
      </div>\r
\r
      <h2>Why first-class functions matter</h2>\r
      <p>Because abstractions are ordinary values, you can pass a function as an argument to another function, return a function from a function, and store functions in data structures. This is what it means for functions to be <em>first-class</em>.</p>\r
      <p>Abstractions are the building block that makes all of this natural. You can produce a function on the fly, right at the call site, without first giving it a name and a top-level binding. Higher-order functions like <code>List.map</code> and <code>List.filter</code> rely entirely on this ability.</p>\r
\r
      <div class="code-block inline">\r
        <div class="code-top">\r
          <span class="code-fname">first_class.ml</span>\r
          <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
        </div>\r
<pre><span class="cmt">(* Pass a function as an argument, defined inline *)</span>\r
<span class="ty">List</span>.<span class="fn">map</span> (<span class="kw">fun</span> x -> x * <span class="num">2</span>) [<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>]\r
<span class="cmt">(* [2; 4; 6] *)</span>\r
\r
<span class="ty">List</span>.<span class="fn">filter</span> (<span class="kw">fun</span> x -> x > <span class="num">2</span>) [<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>; <span class="num">4</span>]\r
<span class="cmt">(* [3; 4] *)</span>\r
\r
<span class="cmt">(* Return a function from a function *)</span>\r
<span class="kw">let</span> <span class="fn">multiplier</span> factor = <span class="kw">fun</span> x -> x * factor\r
<span class="kw">let</span> <span class="fn">double</span> = <span class="fn">multiplier</span> <span class="num">2</span>\r
<span class="cmt">(* double : int -> int *)</span></pre>\r
      </div>\r
\r
      <div class="callout callout-tip">\r
        <div class="callout-title">Good practice</div>\r
        <p>Use inline abstractions for short, single-use transformations. Give a function a name with <code>let</code> only when you need to reuse it or when the logic is complex enough that a name improves readability.</p>\r
      </div>\r
\r
      <div class="page-footer">\r
        <a href="/concepts/currying">← Currying</a>\r
        <a href="/concepts/pattern-matching">Next: Pattern Matching →</a>\r
      </div>\r
    </div>`,Vh=`<div class="article">\r
      <div class="page-header">\r
        <div class="page-label">Concept 3 of 6</div>\r
        <h1 class="page-title">Pattern Matching</h1>\r
        <p class="page-intro">Pattern matching is how OCaml inspects and destructures values. It is more than a switch statement: the compiler verifies that every possible case is handled, eliminating a whole class of bugs at compile time.</p>\r
      </div>\r
\r
      <h2>The match expression</h2>\r
      <p>A <code>match</code> expression compares a value against a sequence of patterns and evaluates the branch of the first one that fits. Patterns can match specific values, bind names, or use a wildcard to catch anything that did not match earlier cases.</p>\r
      <p>Every branch must return the same type. If you forget a case, the compiler warns you. If you add an impossible case that can never be reached, the compiler tells you that too.</p>\r
\r
      <div class="two-col lean">\r
        <div>\r
          <p>The underscore <code>_</code> is the wildcard pattern. It matches any value and discards it. A branch using <code>_</code> is typically placed last to catch everything not covered by specific patterns above it.</p>\r
          <div class="callout callout-key">\r
            <div class="callout-title">Key point</div>\r
            <p>OCaml checks that your patterns are <em>exhaustive</em>, meaning all possible values are covered. A non-exhaustive match is a compile-time warning, not a silent runtime failure.</p>\r
          </div>\r
        </div>\r
        <div class="sticky">\r
          <div class="code-block">\r
            <div class="code-top">\r
              <span class="code-fname">match.ml</span>\r
              <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
            </div>\r
<pre><span class="kw">let</span> <span class="fn">describe</span> n =\r
  <span class="kw">match</span> n <span class="kw">with</span>\r
  | <span class="num">0</span> -> <span class="str">"zero"</span>\r
  | <span class="num">1</span> -> <span class="str">"one"</span>\r
  | _ -> <span class="str">"many"</span>\r
\r
<span class="cmt">(* Bind the matched value to a name *)</span>\r
<span class="kw">let</span> <span class="fn">double_or_zero</span> n =\r
  <span class="kw">match</span> n <span class="kw">with</span>\r
  | <span class="num">0</span> -> <span class="num">0</span>\r
  | x -> x * <span class="num">2</span>\r
\r
<span class="cmt">(* Match on lists *)</span>\r
<span class="kw">let</span> <span class="kw">rec</span> <span class="fn">sum</span> = <span class="kw">function</span>\r
  | []      -> <span class="num">0</span>\r
  | x :: xs -> x + <span class="fn">sum</span> xs</pre>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <h2>The function keyword</h2>\r
      <p>Writing <code>match</code> requires naming the value you want to inspect. When a function's whole purpose is to immediately match its last argument, you can use the <code>function</code> keyword as shorthand. It combines <code>fun x -&gt; match x with</code> into a single form.</p>\r
      <p>The two definitions below are identical in behavior. The <code>function</code> form is more concise when the matching is the main logic, and it is idiomatic OCaml for recursive functions over lists.</p>\r
\r
      <div class="code-block inline">\r
        <div class="code-top">\r
          <span class="code-fname">function_kw.ml</span>\r
          <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
        </div>\r
<pre><span class="cmt">(* Long form *)</span>\r
<span class="kw">let</span> <span class="fn">describe</span> n =\r
  <span class="kw">match</span> n <span class="kw">with</span>\r
  | <span class="num">0</span> -> <span class="str">"zero"</span>\r
  | <span class="num">1</span> -> <span class="str">"one"</span>\r
  | _ -> <span class="str">"many"</span>\r
\r
<span class="cmt">(* Shorthand using function keyword, same result *)</span>\r
<span class="kw">let</span> <span class="fn">describe</span> = <span class="kw">function</span>\r
  | <span class="num">0</span> -> <span class="str">"zero"</span>\r
  | <span class="num">1</span> -> <span class="str">"one"</span>\r
  | _ -> <span class="str">"many"</span></pre>\r
      </div>\r
\r
      <h2>Variant types and exhaustiveness</h2>\r
      <p>Variant types (also called algebraic data types or sum types) let you define a type as one of several named forms. Pattern matching on a variant is where exhaustiveness really pays off: when you add a new variant, every match expression that covers that type will get a compiler warning until the new case is handled.</p>\r
      <p>This makes refactoring safe. You cannot forget to update a function when the data model changes.</p>\r
\r
      <div class="two-col lean">\r
        <div>\r
          <p>Each variant constructor can carry data. The <code>Circle</code> variant carries a radius, and <code>Rectangle</code> carries width and height. Pattern matching unpacks that data in the same step as the branch selection.</p>\r
          <div class="callout callout-tip">\r
            <div class="callout-title">Good practice</div>\r
            <p>Avoid the wildcard <code>_</code> when matching variants. Matching each constructor explicitly means adding a new variant will produce a compiler warning instead of silently falling through to a default case.</p>\r
          </div>\r
        </div>\r
        <div class="sticky">\r
          <div class="code-block">\r
            <div class="code-top">\r
              <span class="code-fname">variants.ml</span>\r
              <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
            </div>\r
<pre><span class="kw">type</span> <span class="ty">shape</span> =\r
  | <span class="ty">Circle</span>    <span class="kw">of</span> <span class="ty">float</span>\r
  | <span class="ty">Rectangle</span> <span class="kw">of</span> <span class="ty">float</span> * <span class="ty">float</span>\r
  | <span class="ty">Triangle</span>  <span class="kw">of</span> <span class="ty">float</span> * <span class="ty">float</span>\r
\r
<span class="kw">let</span> <span class="fn">area</span> = <span class="kw">function</span>\r
  | <span class="ty">Circle</span> r         -> <span class="num">3.14</span> *. r *. r\r
  | <span class="ty">Rectangle</span> (w, h) -> w *. h\r
  | <span class="ty">Triangle</span>  (b, h) -> <span class="num">0.5</span> *. b *. h\r
\r
<span class="cmt">(* If you add a new variant here, area will\r
   get a compile-time warning until updated. *)</span></pre>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <h2>Guards</h2>\r
      <p>A guard is an extra condition attached to a pattern with the <code>when</code> keyword. The branch only fires if both the pattern matches and the guard evaluates to <code>true</code>. Guards let you add arbitrary boolean conditions to a case without nesting an <code>if</code> expression inside the branch.</p>\r
\r
      <div class="code-block inline">\r
        <div class="code-top">\r
          <span class="code-fname">guards.ml</span>\r
          <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
        </div>\r
<pre><span class="kw">let</span> <span class="fn">classify</span> x =\r
  <span class="kw">match</span> x <span class="kw">with</span>\r
  | <span class="num">0</span>            -> <span class="str">"zero"</span>\r
  | n <span class="kw">when</span> n < <span class="num">0</span> -> <span class="str">"negative"</span>\r
  | n <span class="kw">when</span> n > <span class="num">100</span> -> <span class="str">"large"</span>\r
  | _            -> <span class="str">"positive"</span>\r
\r
<span class="cmt">(* Guards work on any pattern, not just literals *)</span>\r
<span class="kw">let</span> <span class="fn">safe_head</span> = <span class="kw">function</span>\r
  | [] -> <span class="ty">None</span>\r
  | x :: _ <span class="kw">when</span> x > <span class="num">0</span> -> <span class="ty">Some</span> x\r
  | _ -> <span class="ty">None</span></pre>\r
      </div>\r
\r
      <h2>Nested patterns</h2>\r
      <p>Patterns can be nested to any depth. You can match on the structure of a tuple whose elements are themselves option values, or on a list whose head is a specific variant. The compiler still verifies that all combinations are covered.</p>\r
\r
      <div class="code-block inline">\r
        <div class="code-top">\r
          <span class="code-fname">nested.ml</span>\r
          <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
        </div>\r
<pre><span class="cmt">(* Match on a pair of option values *)</span>\r
<span class="kw">let</span> <span class="fn">both</span> pair =\r
  <span class="kw">match</span> pair <span class="kw">with</span>\r
  | (<span class="ty">Some</span> x, <span class="ty">Some</span> y) -> <span class="ty">Some</span> (x + y)\r
  | (<span class="ty">Some</span> x, <span class="ty">None</span>)   -> <span class="ty">Some</span> x\r
  | (<span class="ty">None</span>,   <span class="ty">Some</span> y) -> <span class="ty">Some</span> y\r
  | (<span class="ty">None</span>,   <span class="ty">None</span>)   -> <span class="ty">None</span>\r
\r
<span class="cmt">(* Match on specific list shapes *)</span>\r
<span class="kw">let</span> <span class="fn">first_two</span> = <span class="kw">function</span>\r
  | x :: y :: _ -> <span class="ty">Some</span> (x, y)\r
  | _           -> <span class="ty">None</span></pre>\r
      </div>\r
\r
      <div class="callout callout-warn">\r
        <div class="callout-title">Watch out</div>\r
        <p>Patterns are checked top to bottom and the first match wins. An earlier pattern can shadow a later one. If you place <code>_</code> before specific cases, those cases will never be reached and the compiler will warn you.</p>\r
      </div>\r
\r
      <div class="page-footer">\r
        <a href="/concepts/abstractions">← Abstractions</a>\r
        <a href="/concepts/higher-order">Next: Higher-Order Functions →</a>\r
      </div>\r
    </div>`,Qh=`<div class="article">\r
      <div class="page-header">\r
        <div class="page-label">Concept 4 of 6</div>\r
        <h1 class="page-title">Higher-Order Functions</h1>\r
        <p class="page-intro">A higher-order function is one that takes another function as an argument or returns one as a result. In OCaml this is entirely natural, because functions are ordinary values with types just like integers or strings.</p>\r
      </div>\r
\r
      <h2>Functions as values</h2>\r
      <p>Every function in OCaml has a type. The type of a function that takes an <code>int</code> and returns an <code>int</code> is <code>int -&gt; int</code>. A function that takes such a function and applies it is a higher-order function, with type <code>(int -&gt; int) -&gt; int -&gt; int</code>.</p>\r
      <p>This is not a special mechanism. It follows directly from functions being values. You can store a function in a variable, pass it as an argument, and return it just like any other value.</p>\r
\r
      <div class="two-col lean">\r
        <div>\r
          <p>The function <code>apply</code> takes any function <code>f</code> and a value <code>x</code>, and returns <code>f x</code>. Its type is <code>('a -&gt; 'b) -&gt; 'a -&gt; 'b</code>. The type variables <code>'a</code> and <code>'b</code> mean it works for any types, so the same <code>apply</code> works whether <code>f</code> is a string function or an integer function.</p>\r
        </div>\r
        <div class="sticky">\r
          <div class="code-block">\r
            <div class="code-top">\r
              <span class="code-fname">apply.ml</span>\r
              <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
            </div>\r
<pre><span class="kw">let</span> <span class="fn">apply</span> f x = f x\r
<span class="cmt">(* val apply : ('a -> 'b) -> 'a -> 'b *)</span>\r
\r
<span class="kw">let</span> <span class="fn">square</span> x = x * x\r
\r
<span class="fn">apply</span> <span class="fn">square</span> <span class="num">5</span>              <span class="cmt">(* 25 *)</span>\r
<span class="fn">apply</span> (<span class="kw">fun</span> x -> x * <span class="num">3</span>) <span class="num">5</span>   <span class="cmt">(* 15 *)</span>\r
<span class="fn">apply</span> <span class="ty">String</span>.<span class="fn">length</span> <span class="str">"hello"</span> <span class="cmt">(* 5 *)</span></pre>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <h2>map: transforming every element</h2>\r
      <p><code>List.map</code> takes a function and a list, and returns a new list where every element has been transformed by that function. The input list and output list always have the same length. The original list is not modified.</p>\r
      <p>The type is <code>('a -&gt; 'b) -&gt; 'a list -&gt; 'b list</code>. The function can change the type of each element, for example turning a list of integers into a list of strings.</p>\r
\r
      <div class="code-block inline">\r
        <div class="code-top">\r
          <span class="code-fname">map.ml</span>\r
          <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
        </div>\r
<pre><span class="kw">let</span> nums = [<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>; <span class="num">4</span>; <span class="num">5</span>]\r
\r
<span class="ty">List</span>.<span class="fn">map</span> (<span class="kw">fun</span> x -> x * <span class="num">2</span>) nums\r
<span class="cmt">(* [2; 4; 6; 8; 10] *)</span>\r
\r
<span class="ty">List</span>.<span class="fn">map</span> (<span class="kw">fun</span> x -> x * x) nums\r
<span class="cmt">(* [1; 4; 9; 16; 25] *)</span>\r
\r
<span class="ty">List</span>.<span class="fn">map</span> <span class="ty">string_of_int</span> nums\r
<span class="cmt">(* ["1"; "2"; "3"; "4"; "5"] *)</span></pre>\r
      </div>\r
\r
      <h2>filter: selecting elements</h2>\r
      <p><code>List.filter</code> takes a predicate function and a list, and returns a new list containing only the elements for which the predicate returns <code>true</code>. The output list can be shorter than the input, but each element in the output appears in the same order as in the input.</p>\r
\r
      <div class="code-block inline">\r
        <div class="code-top">\r
          <span class="code-fname">filter.ml</span>\r
          <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
        </div>\r
<pre><span class="kw">let</span> nums = [<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>; <span class="num">4</span>; <span class="num">5</span>; <span class="num">6</span>]\r
\r
<span class="ty">List</span>.<span class="fn">filter</span> (<span class="kw">fun</span> x -> x <span class="kw">mod</span> <span class="num">2</span> = <span class="num">0</span>) nums\r
<span class="cmt">(* [2; 4; 6] *)</span>\r
\r
<span class="ty">List</span>.<span class="fn">filter</span> (<span class="kw">fun</span> x -> x > <span class="num">3</span>) nums\r
<span class="cmt">(* [4; 5; 6] *)</span>\r
\r
<span class="cmt">(* Partial application makes filters reusable *)</span>\r
<span class="kw">let</span> <span class="fn">positives</span> = <span class="ty">List</span>.<span class="fn">filter</span> (<span class="kw">fun</span> x -> x > <span class="num">0</span>)\r
<span class="fn">positives</span> [-<span class="num">1</span>; <span class="num">2</span>; -<span class="num">3</span>; <span class="num">4</span>]  <span class="cmt">(* [2; 4] *)</span></pre>\r
      </div>\r
\r
      <h2>fold_left: reducing a list to a value</h2>\r
      <p><code>List.fold_left</code> walks a list from left to right, carrying an accumulator through each step. You provide the starting value for the accumulator and the function to combine the accumulator with each element. At the end, you get the final accumulated result.</p>\r
      <p>The type is <code>('a -&gt; 'b -&gt; 'a) -&gt; 'a -&gt; 'b list -&gt; 'a</code>. The accumulator starts as <code>'a</code>, each element is <code>'b</code>, and the combination function produces the next <code>'a</code>. Summing a list of integers is the simplest example, but fold can compute anything that can be expressed as a running accumulation.</p>\r
\r
      <div class="two-col lean">\r
        <div>\r
          <p>Both <code>map</code> and <code>filter</code> can be expressed in terms of <code>fold_left</code>. Fold is the most fundamental of the three. Map and filter are specialized folds that happen to be common enough to deserve their own names.</p>\r
          <div class="callout callout-key">\r
            <div class="callout-title">Key insight</div>\r
            <p>When you find yourself writing a recursive function that carries an accumulator and walks a list, it is almost certainly a fold in disguise.</p>\r
          </div>\r
        </div>\r
        <div class="sticky">\r
          <div class="code-block">\r
            <div class="code-top">\r
              <span class="code-fname">fold.ml</span>\r
              <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
            </div>\r
<pre><span class="kw">let</span> nums = [<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>; <span class="num">4</span>; <span class="num">5</span>]\r
\r
<span class="cmt">(* Sum *)</span>\r
<span class="ty">List</span>.<span class="fn">fold_left</span> (+) <span class="num">0</span> nums  <span class="cmt">(* 15 *)</span>\r
\r
<span class="cmt">(* Product *)</span>\r
<span class="ty">List</span>.<span class="fn">fold_left</span> ( *) <span class="num">1</span> nums  <span class="cmt">(* 120 *)</span>\r
\r
<span class="cmt">(* Maximum *)</span>\r
<span class="ty">List</span>.<span class="fn">fold_left</span> <span class="fn">max</span> <span class="ty">Int</span>.<span class="fn">min_int</span> nums  <span class="cmt">(* 5 *)</span>\r
\r
<span class="cmt">(* Build a new list, equivalent to map *)</span>\r
<span class="ty">List</span>.<span class="fn">fold_left</span>\r
  (<span class="kw">fun</span> acc x -> acc @ [x * <span class="num">2</span>]) [] nums\r
<span class="cmt">(* [2; 4; 6; 8; 10] *)</span></pre>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <h2>Chaining with the pipe operator</h2>\r
      <p>The <code>|&gt;</code> operator passes a value from left to right through a sequence of functions. It reads naturally as a pipeline: start with data, then transform it step by step. Each step is often a partially applied higher-order function.</p>\r
\r
      <div class="code-block inline">\r
        <div class="code-top">\r
          <span class="code-fname">pipe.ml</span>\r
          <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
        </div>\r
<pre><span class="cmt">(* Without pipe, read inside-out *)</span>\r
<span class="ty">List</span>.<span class="fn">fold_left</span> (+) <span class="num">0</span>\r
  (<span class="ty">List</span>.<span class="fn">map</span> (<span class="kw">fun</span> x -> x * x)\r
    (<span class="ty">List</span>.<span class="fn">filter</span> (<span class="kw">fun</span> x -> x <span class="kw">mod</span> <span class="num">2</span> = <span class="num">0</span>) [<span class="num">1</span>;<span class="num">2</span>;<span class="num">3</span>;<span class="num">4</span>;<span class="num">5</span>]))\r
\r
<span class="cmt">(* With pipe, read top to bottom *)</span>\r
[<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>; <span class="num">4</span>; <span class="num">5</span>]\r
|> <span class="ty">List</span>.<span class="fn">filter</span> (<span class="kw">fun</span> x -> x <span class="kw">mod</span> <span class="num">2</span> = <span class="num">0</span>)  <span class="cmt">(* [2; 4] *)</span>\r
|> <span class="ty">List</span>.<span class="fn">map</span>    (<span class="kw">fun</span> x -> x * x)          <span class="cmt">(* [4; 16] *)</span>\r
|> <span class="ty">List</span>.<span class="fn">fold_left</span> (+) <span class="num">0</span>                  <span class="cmt">(* 20 *)</span></pre>\r
      </div>\r
\r
      <h2>The dependency injection parallel</h2>\r
      <p>In object-oriented programming, dependency injection is the practice of passing a dependency (an object, a service, a strategy) into a class rather than hardcoding it. The class does not decide what behavior to use. It receives that behavior from outside, which makes it testable and composable.</p>\r
      <p>Higher-order functions are the same idea applied to functions. Instead of hardcoding a behavior inside a function, you accept that behavior as an argument. The caller decides what to do; the function decides how to iterate, fold, or transform. The principle is identical. Only the medium is different: objects in OOP, functions in OCaml.</p>\r
\r
      <div class="code-block inline">\r
        <div class="code-top">\r
          <span class="code-fname">di_parallel.ml</span>\r
          <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
        </div>\r
<pre><span class="cmt">(* The behavior is injected as a function argument *)</span>\r
<span class="kw">let</span> <span class="fn">transform_all</span> f items =\r
  <span class="ty">List</span>.<span class="fn">map</span> f items\r
\r
<span class="cmt">(* The caller decides what transformation to apply *)</span>\r
<span class="fn">transform_all</span> (<span class="kw">fun</span> x -> x * <span class="num">2</span>) [<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>]\r
<span class="fn">transform_all</span> <span class="ty">String</span>.<span class="fn">uppercase_ascii</span> [<span class="str">"a"</span>; <span class="str">"b"</span>]\r
\r
<span class="cmt">(* transform_all does not care what f does.\r
   It only knows how to apply f to each element.\r
   The behavior (what to do) comes from outside. *)</span></pre>\r
      </div>\r
\r
      <div class="page-footer">\r
        <a href="/concepts/pattern-matching">← Pattern Matching</a>\r
        <a href="/concepts/tail-recursion">Next: Tail Recursion →</a>\r
      </div>\r
    </div>`,qh=`<div class="article">\r
      <div class="page-header">\r
        <div class="page-label">Concept 5 of 6</div>\r
        <h1 class="page-title">Tail Recursion</h1>\r
        <p class="page-intro">OCaml has no built-in for or while loop. Repetition is expressed through recursion. Tail recursion is the technique that makes deeply recursive functions safe to run without overflowing the call stack.</p>\r
      </div>\r
\r
      <h2>How recursion uses memory</h2>\r
      <p>Every function call pushes a new frame onto the call stack. When a recursive function calls itself, it adds another frame on top of the previous one. If the recursion goes deep enough, the stack runs out of space and the program crashes with a stack overflow.</p>\r
      <p>Consider <code>factorial</code>. When computing <code>factorial 5</code>, the function calls <code>factorial 4</code>, which calls <code>factorial 3</code>, and so on. Each call waits for the one beneath it to finish, then multiplies the result by <code>n</code>. All those pending multiplications are sitting on the stack at once.</p>\r
\r
      <div class="two-col lean">\r
        <div>\r
          <p>The key observation is that <code>factorial</code> cannot return until its recursive call returns, because it still has work to do: multiplying <code>n</code> by the result. This pending work is what keeps the stack frame alive. The recursion is not in tail position because the last operation is the multiplication, not the recursive call itself.</p>\r
        </div>\r
        <div class="sticky">\r
          <div class="code-block">\r
            <div class="code-top">\r
              <span class="code-fname">factorial.ml</span>\r
              <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
            </div>\r
<pre><span class="kw">let</span> <span class="kw">rec</span> <span class="fn">factorial</span> (n : <span class="ty">int</span>) : <span class="ty">int</span> =\r
  <span class="kw">if</span> n = <span class="num">0</span> <span class="kw">then</span> <span class="num">1</span>\r
  <span class="kw">else</span> n * <span class="fn">factorial</span> (n - <span class="num">1</span>)\r
\r
<span class="cmt">(* factorial 5 evaluates as:\r
   5 * factorial 4\r
   5 * (4 * factorial 3)\r
   5 * (4 * (3 * factorial 2))\r
   5 * (4 * (3 * (2 * factorial 1)))\r
   5 * (4 * (3 * (2 * 1)))\r
   Each pending multiplication stays on the stack. *)</span></pre>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <h2>What makes a call tail-recursive</h2>\r
      <p>A recursive call is in <em>tail position</em> if it is the very last thing the function does. No further computation happens after the call returns. The result of the recursive call is returned directly, with nothing piled on top of it.</p>\r
      <p><code>countdown</code> is tail recursive. When it calls <code>countdown (n - 1)</code>, that is the final operation. There is nothing left to do after the call comes back, so the current stack frame is no longer needed.</p>\r
\r
      <div class="two-col lean">\r
        <div>\r
          <div class="callout callout-key">\r
            <div class="callout-title">Practical rule</div>\r
            <p>If you return the result of a recursive call without doing anything else to it, the call is in tail position. If you wrap the result in another operation, it is not.</p>\r
          </div>\r
          <p>The difference between <code>n * factorial (n-1)</code> and <code>countdown (n-1)</code> is that the first wraps the result in a multiplication. The second returns the result directly. That distinction is everything.</p>\r
        </div>\r
        <div class="sticky">\r
          <div class="code-block">\r
            <div class="code-top">\r
              <span class="code-fname">countdown.ml</span>\r
              <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
            </div>\r
<pre><span class="kw">let</span> <span class="kw">rec</span> <span class="fn">countdown</span> (n : <span class="ty">int</span>) : <span class="ty">unit</span> =\r
  <span class="kw">if</span> n = <span class="num">0</span> <span class="kw">then</span> <span class="fn">print_endline</span> <span class="str">"done"</span>\r
  <span class="kw">else</span> <span class="fn">countdown</span> (n - <span class="num">1</span>)\r
\r
<span class="cmt">(* countdown (n-1) is the last thing this function does.\r
   Nothing happens after it returns.\r
   The recursive call is in tail position. *)</span>\r
\r
<span class="cmt">(* compare with factorial:\r
   n * factorial (n-1)\r
   The multiplication happens AFTER the call.\r
   The call is NOT in tail position. *)</span></pre>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <h2>Tail call optimization</h2>\r
      <p>When a recursive call is in tail position, the OCaml compiler can optimize it into a jump rather than a new stack frame. Because there is nothing left to do in the current frame, it can be reused for the next call. This means a tail-recursive function runs in constant stack space regardless of how deep the recursion goes.</p>\r
      <p><code>countdown 1_000_000</code> will run fine if <code>countdown</code> is tail recursive. The same depth with a non-tail-recursive function would crash.</p>\r
\r
      <h2>The accumulator pattern</h2>\r
      <p>Many functions that are not naturally tail recursive can be made tail recursive by introducing an accumulator: an extra argument that carries the growing result through each call. Instead of building the result on the way back up the call stack, you build it on the way down.</p>\r
\r
      <div class="two-col lean">\r
        <div>\r
          <p>The trick is to pass the work-in-progress result as an argument. When the base case is reached, you return the accumulator instead of starting a chain of pending computations. The call to <code>helper</code> is always in tail position because it simply passes the updated accumulator forward.</p>\r
          <div class="callout callout-tip">\r
            <div class="callout-title">Good practice</div>\r
            <p>Name the inner helper <code>aux</code> or <code>loop</code>, and expose a clean interface by wrapping it in an outer function that supplies the initial accumulator value.</p>\r
          </div>\r
        </div>\r
        <div class="sticky">\r
          <div class="code-block">\r
            <div class="code-top">\r
              <span class="code-fname">acc_factorial.ml</span>\r
              <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
            </div>\r
<pre><span class="cmt">(* Tail-recursive factorial using an accumulator *)</span>\r
<span class="kw">let</span> <span class="fn">factorial</span> n =\r
  <span class="kw">let</span> <span class="kw">rec</span> <span class="fn">loop</span> acc k =\r
    <span class="kw">if</span> k = <span class="num">0</span> <span class="kw">then</span> acc\r
    <span class="kw">else</span> <span class="fn">loop</span> (acc * k) (k - <span class="num">1</span>)\r
  <span class="kw">in</span>\r
  <span class="fn">loop</span> <span class="num">1</span> n\r
\r
<span class="cmt">(* factorial 5:\r
   loop 1  5  ->\r
   loop 5  4  ->\r
   loop 20 3  ->\r
   loop 60 2  ->\r
   loop 120 1 ->\r
   loop 120 0 -> 120\r
   Stack stays flat throughout. *)</span></pre>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <h2>Divergence: hanging vs crashing</h2>\r
      <p>Tail recursion does not make a function correct. It only protects the stack. A tail-recursive function without a base case will still run forever, but it will hang instead of crashing. That distinction is worth understanding.</p>\r
      <p>A non-tail-recursive function without a base case grows the stack on every call and eventually crashes with a stack overflow. A tail-recursive one without a base case loops forever at a flat stack depth. Both diverge, but only one takes the program down with it.</p>\r
\r
      <div class="code-block inline">\r
        <div class="code-top">\r
          <span class="code-fname">diverge.ml</span>\r
          <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
        </div>\r
<pre><span class="cmt">(* Tail recursive: loops forever, stack stays flat *)</span>\r
<span class="kw">let</span> <span class="kw">rec</span> <span class="fn">p</span> (x : <span class="ty">int</span>) : <span class="ty">int</span> = <span class="fn">p</span> x\r
\r
<span class="cmt">(* Not tail recursive: grows stack, eventually crashes *)</span>\r
<span class="kw">let</span> <span class="kw">rec</span> <span class="fn">q</span> (x : <span class="ty">int</span>) : <span class="ty">int</span> = <span class="num">0</span> + <span class="fn">q</span> x\r
\r
<span class="cmt">(* Correctness requires a base case.\r
   Tail recursion only addresses stack safety, not termination. *)</span></pre>\r
      </div>\r
\r
      <div class="callout callout-warn">\r
        <div class="callout-title">Two separate concerns</div>\r
        <p>A base case ensures termination (correctness). A tail call ensures constant stack usage (efficiency). You need both. A tail-recursive function with no base case is efficient and wrong. A non-tail-recursive function with a base case is correct and potentially unsafe for large inputs.</p>\r
      </div>\r
\r
      <div class="page-footer">\r
        <a href="/concepts/higher-order">← Higher-Order Functions</a>\r
        <a href="/concepts/iteration">Next: Iteration →</a>\r
      </div>\r
    </div>`,Kh=`<div class="article">\r
      <div class="page-header">\r
        <div class="page-label">Concept 6 of 6</div>\r
        <h1 class="page-title">Iteration</h1>\r
        <p class="page-intro">OCaml has no built-in loop construct. Instead, repetition is modeled with two recursive patterns: one for when you know how many steps to take, and one for when you need to keep going until a condition is met.</p>\r
      </div>\r
\r
      <h2>Two kinds of repetition</h2>\r
      <p>In languages with loops, you typically choose between <code>for</code> (known count) and <code>while</code> (condition-based). In OCaml, the same distinction exists but is expressed through two higher-order functions: <code>iter</code> for a fixed number of applications, and <code>first</code> for searching until a predicate holds.</p>\r
      <p>Both are tail recursive, so neither will overflow the stack. The key difference is that <code>iter</code> always terminates, because the count decrements to zero, while <code>first</code> may diverge if the predicate never becomes true.</p>\r
\r
      <h2>Definite iteration: iter</h2>\r
      <p><code>iter f n start</code> applies <code>f</code> exactly <code>n</code> times to <code>start</code>, chaining the output of each call as the input to the next. When <code>n</code> reaches zero, the accumulated value is returned. The number of steps is decided before the computation begins.</p>\r
\r
      <div class="two-col lean">\r
        <div>\r
          <p>Because each call passes the result of <code>f start</code> forward, <code>iter</code> is tail recursive. The stack frame is reused on every step, so it can safely run for any number of iterations.</p>\r
          <p>Partial application makes <code>iter</code> very flexible. You can fix <code>f</code> in advance to create a specialized repeater, leaving <code>n</code> and <code>start</code> open for the caller to supply.</p>\r
        </div>\r
        <div class="sticky">\r
          <div class="code-block">\r
            <div class="code-top">\r
              <span class="code-fname">iter.ml</span>\r
              <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
            </div>\r
<pre><span class="kw">let</span> <span class="kw">rec</span> <span class="fn">iter</span> (f : <span class="ty">int</span> -> <span class="ty">int</span>) (n : <span class="ty">int</span>) (start : <span class="ty">int</span>) =\r
  <span class="kw">if</span> n < <span class="num">1</span> <span class="kw">then</span> start\r
  <span class="kw">else</span> <span class="fn">iter</span> f (n - <span class="num">1</span>) (f start)\r
\r
<span class="cmt">(* iter (fun a -> a * 2) 3 1\r
   step 1: 1  -> 2\r
   step 2: 2  -> 4\r
   step 3: 4  -> 8\r
   result: 8 *)</span>\r
\r
<span class="cmt">(* Raise x to the power n *)</span>\r
<span class="kw">let</span> <span class="fn">power</span> x n = <span class="fn">iter</span> (<span class="kw">fun</span> a -> a * x) n <span class="num">1</span>\r
\r
<span class="fn">power</span> <span class="num">2</span> <span class="num">10</span>  <span class="cmt">(* 1024 *)</span></pre>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <h2>Indefinite iteration: first</h2>\r
      <p><code>first pred start</code> increments <code>start</code> by one on each step until <code>pred start</code> returns <code>true</code>, then returns that value. The number of steps is not known in advance; it depends entirely on when the predicate first holds.</p>\r
\r
      <div class="two-col lean">\r
        <div>\r
          <p>Like <code>iter</code>, <code>first</code> is tail recursive. But unlike <code>iter</code>, it can diverge: if <code>pred</code> is never true, the function runs forever. This is the OCaml equivalent of a <code>while</code> loop that never exits.</p>\r
          <div class="callout callout-warn">\r
            <div class="callout-title">Watch out</div>\r
            <p>Always verify that the predicate will eventually be satisfied for any valid input. A predicate that can never become true turns <code>first</code> into an infinite loop.</p>\r
          </div>\r
        </div>\r
        <div class="sticky">\r
          <div class="code-block">\r
            <div class="code-top">\r
              <span class="code-fname">first.ml</span>\r
              <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
            </div>\r
<pre><span class="kw">let</span> <span class="kw">rec</span> <span class="fn">first</span> (pred : <span class="ty">int</span> -> <span class="ty">bool</span>) (start : <span class="ty">int</span>) =\r
  <span class="kw">if</span> pred start <span class="kw">then</span> start\r
  <span class="kw">else</span> <span class="fn">first</span> pred (start + <span class="num">1</span>)\r
\r
<span class="cmt">(* first (fun k -> k * k > 15) 1\r
   k=1: 1  > 15? no\r
   k=2: 4  > 15? no\r
   k=3: 9  > 15? no\r
   k=4: 16 > 15? yes -> return 4 *)</span>\r
\r
<span class="cmt">(* Natural square root: first k where k^2 exceeds n,\r
   then step back by one *)</span>\r
<span class="kw">let</span> <span class="fn">sqrt</span> x = (<span class="fn">first</span> (<span class="kw">fun</span> k -> k * k > x) <span class="num">1</span>) - <span class="num">1</span>\r
\r
<span class="fn">sqrt</span> <span class="num">8</span>   <span class="cmt">(* 2, since floor(sqrt(8)) = 2 *)</span>\r
<span class="fn">sqrt</span> <span class="num">25</span>  <span class="cmt">(* 5 *)</span></pre>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <h2>Building from iter and first</h2>\r
      <p>Because both functions take a step function or predicate as an argument, they combine well with partial application. You can define domain-specific iteration patterns by fixing the function argument and leaving the count or starting point open.</p>\r
\r
      <div class="code-block inline">\r
        <div class="code-top">\r
          <span class="code-fname">derived.ml</span>\r
          <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
        </div>\r
<pre><span class="cmt">(* Double a number n times *)</span>\r
<span class="kw">let</span> <span class="fn">double_n_times</span> = <span class="fn">iter</span> (<span class="kw">fun</span> x -> x * <span class="num">2</span>)\r
<span class="fn">double_n_times</span> <span class="num">4</span> <span class="num">1</span>   <span class="cmt">(* 16 *)</span>\r
\r
<span class="cmt">(* Increment by a fixed step n times *)</span>\r
<span class="kw">let</span> <span class="fn">count_by</span> step = <span class="fn">iter</span> (<span class="kw">fun</span> x -> x + step)\r
<span class="kw">let</span> <span class="fn">count_by_3</span> = <span class="fn">count_by</span> <span class="num">3</span>\r
<span class="fn">count_by_3</span> <span class="num">5</span> <span class="num">0</span>   <span class="cmt">(* 15 *)</span>\r
\r
<span class="cmt">(* Find the first multiple of n at or above start *)</span>\r
<span class="kw">let</span> <span class="fn">first_multiple_of</span> n =\r
  <span class="fn">first</span> (<span class="kw">fun</span> x -> x <span class="kw">mod</span> n = <span class="num">0</span>)\r
<span class="fn">first_multiple_of</span> <span class="num">7</span> <span class="num">50</span>  <span class="cmt">(* 56 *)</span></pre>\r
      </div>\r
\r
      <div class="callout callout-key">\r
        <div class="callout-title">Key insight</div>\r
        <p><code>iter</code> and <code>first</code> are not built into OCaml. They are ordinary functions you define. The same is true of the looping patterns in the standard library. Once you understand how to build them, you can design your own iteration abstractions for any domain.</p>\r
      </div>\r
\r
      <div class="page-footer">\r
        <a href="/concepts/tail-recursion">← Tail Recursion</a>\r
        <a href="/exercises/bank">Next: Bank Account →</a>\r
      </div>\r
    </div>`,Yh=`<div class="article">\r
      <div class="page-header">\r
        <div class="page-label">Exercise E1 · Medium</div>\r
        <h1 class="page-title">Bank Account</h1>\r
        <p class="page-intro">Model a simple bank account using OCaml's type system. Practice variant types, immutable record updates, and list folds to track a full transaction history.</p>\r
      </div>\r
\r
      <!-- Prompt -->\r
      <div class="exercise-box">\r
        <div class="exercise-head">\r
          <div class="exercise-meta">\r
            <div class="exercise-label">The challenge</div>\r
            <div class="exercise-title">Design a bank account model</div>\r
          </div>\r
          <span class="diff diff-medium">Medium</span>\r
        </div>\r
        <div class="exercise-body">\r
          <p class="exercise-desc">Support deposits, withdrawals, and balance queries. The account should keep a complete history of all transactions, and balances should be computed from history rather than stored directly.</p>\r
          <ul class="req-list">\r
            <li><span class="req-n">01</span>Define a <code>transaction</code> variant type with <code>Deposit of float</code> and <code>Withdrawal of float</code> constructors.</li>\r
            <li><span class="req-n">02</span>Define an <code>account</code> record with fields <code>owner : string</code> and <code>history : transaction list</code>.</li>\r
            <li><span class="req-n">03</span>Write <code>deposit</code> and <code>withdraw</code>. Each must return a <strong>new</strong> account value (immutable update via <code>{ acct with … }</code>).</li>\r
            <li><span class="req-n">04</span>Write <code>balance</code> to compute the current balance by folding over <code>history</code>.</li>\r
            <li><span class="req-n">05</span>Write <code>statement</code> to return a <code>(string * float) list</code> with one entry per transaction, oldest first.</li>\r
          </ul>\r
        </div>\r
      </div>\r
\r
      <!-- Starter + hints -->\r
      <div class="two-col lean">\r
        <div>\r
          <h2>Starter code</h2>\r
          <div class="code-block">\r
            <div class="code-top">\r
              <span class="code-fname">bank.ml</span>\r
              <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
            </div>\r
<pre><span class="kw">type</span> <span class="ty">transaction</span> =\r
  | <span class="ty">Deposit</span>    <span class="kw">of</span> <span class="ty">float</span>\r
  | <span class="ty">Withdrawal</span> <span class="kw">of</span> <span class="ty">float</span>\r
\r
<span class="kw">type</span> <span class="ty">account</span> = {\r
  owner   : <span class="ty">string</span>;\r
  history : <span class="ty">transaction list</span>;\r
}\r
\r
<span class="kw">let</span> <span class="fn">create</span> owner =\r
  { owner; history = [] }\r
\r
<span class="kw">let</span> <span class="fn">deposit</span> amount acct =\r
  <span class="cmt">(* TODO *)</span>\r
\r
<span class="kw">let</span> <span class="fn">withdraw</span> amount acct =\r
  <span class="cmt">(* TODO *)</span>\r
\r
<span class="kw">let</span> <span class="fn">balance</span> acct =\r
  <span class="cmt">(* TODO: fold over acct.history *)</span>\r
  <span class="num">0.0</span>\r
\r
<span class="kw">let</span> <span class="fn">statement</span> acct =\r
  <span class="cmt">(* TODO *)</span>\r
  []</pre>\r
          </div>\r
        </div>\r
        <div>\r
          <h2>Hints</h2>\r
          <p>For <code>deposit</code> and <code>withdraw</code>, use the record update syntax <code>{ acct with history = … }</code>. Prepend new transactions to the front of the list. This is O(1).</p>\r
          <p>In <code>balance</code>, <code>List.fold_left</code> is the right tool. Start from <code>0.0</code> and adjust the accumulator on each transaction. Pattern match on the variant to know whether to add or subtract.</p>\r
          <p>In <code>statement</code>, call <code>List.rev acct.history</code> first to get chronological order, then <code>List.map</code> each transaction to a label–amount tuple.</p>\r
          <div class="callout callout-key">\r
            <div class="callout-title">Key insight</div>\r
            <p>The current balance is never stored. It is always derived from history. This makes past balances recomputable, which matters for auditing.</p>\r
          </div>\r
          <div class="callout callout-tip">\r
            <div class="callout-title">Compiler tip</div>\r
            <p>If your <code>match</code> is missing a case, OCaml will warn you. Use that as a safety net, since warnings here are likely bugs.</p>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Playground link -->\r
      <div class="pg-link-wrap">\r
        <a href="/playground?exercise=bank" class="pg-link-btn">Try in Playground →</a>\r
      </div>\r
\r
      <!-- Solution -->\r
      <div class="sol-toggle" id="sol-toggle" onclick="toggleSolution()">\r
        <span class="sol-icon" id="sol-icon">+</span>\r
        Show solution\r
        <span class="sol-hint">try it yourself first</span>\r
      </div>\r
\r
      <div class="sol-body" id="sol-body">\r
        <div class="two-col lean">\r
          <div>\r
            <div class="code-block">\r
              <div class="code-top">\r
                <span class="code-fname">bank_solution.ml</span>\r
                <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
              </div>\r
<pre><span class="kw">type</span> <span class="ty">transaction</span> =\r
  | <span class="ty">Deposit</span>    <span class="kw">of</span> <span class="ty">float</span>\r
  | <span class="ty">Withdrawal</span> <span class="kw">of</span> <span class="ty">float</span>\r
\r
<span class="kw">type</span> <span class="ty">account</span> = {\r
  owner   : <span class="ty">string</span>;\r
  history : <span class="ty">transaction list</span>;\r
}\r
\r
<span class="kw">let</span> <span class="fn">create</span> owner =\r
  { owner; history = [] }\r
\r
<span class="kw">let</span> <span class="fn">deposit</span> amount acct =\r
  { acct <span class="kw">with</span>\r
    history = <span class="ty">Deposit</span> amount :: acct.history }\r
\r
<span class="kw">let</span> <span class="fn">withdraw</span> amount acct =\r
  { acct <span class="kw">with</span>\r
    history = <span class="ty">Withdrawal</span> amount :: acct.history }\r
\r
<span class="kw">let</span> <span class="fn">balance</span> acct =\r
  <span class="ty">List</span>.<span class="fn">fold_left</span>\r
    (<span class="kw">fun</span> acc tx ->\r
      <span class="kw">match</span> tx <span class="kw">with</span>\r
      | <span class="ty">Deposit</span> a    -> acc +. a\r
      | <span class="ty">Withdrawal</span> a -> acc -. a)\r
    <span class="num">0.0</span> acct.history\r
\r
<span class="kw">let</span> <span class="fn">statement</span> acct =\r
  acct.history\r
  |> <span class="ty">List</span>.<span class="fn">rev</span>\r
  |> <span class="ty">List</span>.<span class="fn">map</span> (<span class="kw">fun</span> tx ->\r
    <span class="kw">match</span> tx <span class="kw">with</span>\r
    | <span class="ty">Deposit</span> a    -> (<span class="str">"Deposit"</span>,    a)\r
    | <span class="ty">Withdrawal</span> a -> (<span class="str">"Withdrawal"</span>, a))\r
\r
<span class="cmt">(* Usage *)</span>\r
<span class="kw">let</span> () =\r
  <span class="kw">let</span> acct =\r
    <span class="fn">create</span> <span class="str">"Alice"</span>\r
    |> <span class="fn">deposit</span>  <span class="num">500.0</span>\r
    |> <span class="fn">deposit</span>  <span class="num">250.0</span>\r
    |> <span class="fn">withdraw</span> <span class="num">100.0</span>\r
  <span class="kw">in</span>\r
  <span class="ty">Printf</span>.<span class="fn">printf</span> <span class="str">"Balance: %.2f\\n"</span>\r
    (<span class="fn">balance</span> acct)\r
  <span class="cmt">(* Balance: 650.00 *)</span></pre>\r
            </div>\r
          </div>\r
          <div>\r
            <h2>Walkthrough</h2>\r
            <p><strong>Immutability.</strong> Each call to <code>deposit</code> or <code>withdraw</code> returns a new <code>account</code> record with a transaction prepended to the history. The original is untouched. We use the pipe operator to chain updates cleanly.</p>\r
            <p><strong>fold_left.</strong> We start at <code>0.0</code> and walk the history list. For each entry, we add the amount on <code>Deposit</code> and subtract it on <code>Withdrawal</code>. Pattern matching on the variant is exhaustive and the compiler verifies this.</p>\r
            <p><strong>statement.</strong> Since we prepend transactions (newest first), <code>List.rev</code> puts them in chronological order. Then <code>List.map</code> converts each to a printable tuple.</p>\r
            <p>Notice <code>deposit</code> and <code>withdraw</code> are structurally identical: both prepend a constructor to <code>history</code>. An advanced refactor could unify them into a single <code>apply : transaction -> account -> account</code>.</p>\r
\r
            <h2>Going further</h2>\r
            <p>Once the basic model works:</p>\r
            <ul>\r
              <li>Guard <code>withdraw</code> against overdrafts by returning <code>Ok account</code> or <code>Error "Insufficient funds"</code> using the <code>result</code> type.</li>\r
              <li>Write <code>balance_at : int -> account -> float</code> that returns the balance after the first <em>n</em> transactions.</li>\r
              <li>Add a <code>Transfer of float * account</code> variant that atomically moves funds between two accounts.</li>\r
            </ul>\r
            <div class="code-block" style="margin-top:16px;">\r
              <div class="code-top">\r
                <span class="code-fname">extension.ml</span>\r
                <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
              </div>\r
<pre><span class="cmt">(* Safe withdrawal *)</span>\r
<span class="kw">let</span> <span class="fn">withdraw_safe</span> amount acct =\r
  <span class="kw">if</span> <span class="fn">balance</span> acct < amount <span class="kw">then</span>\r
    <span class="ty">Error</span> <span class="str">"Insufficient funds"</span>\r
  <span class="kw">else</span>\r
    <span class="ty">Ok</span> { acct <span class="kw">with</span>\r
      history = <span class="ty">Withdrawal</span> amount\r
                :: acct.history }\r
\r
<span class="cmt">(* Balance after n transactions *)</span>\r
<span class="kw">let</span> <span class="fn">balance_at</span> n acct =\r
  acct.history\r
  |> <span class="ty">List</span>.<span class="fn">rev</span>\r
  |> <span class="ty">List</span>.<span class="fn">filteri</span> (<span class="kw">fun</span> i _ -> i < n)\r
  |> <span class="ty">List</span>.<span class="fn">fold_left</span>\r
      (<span class="kw">fun</span> acc tx ->\r
        <span class="kw">match</span> tx <span class="kw">with</span>\r
        | <span class="ty">Deposit</span> a    -> acc +. a\r
        | <span class="ty">Withdrawal</span> a -> acc -. a)\r
      <span class="num">0.0</span></pre>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="page-footer">\r
        <a href="/concepts/currying">← Currying</a>\r
        <a href="/exercises/playlist">Next: Playlist →</a>\r
      </div>\r
    </div>`,Gh=`<div class="article">\r
      <div class="page-header">\r
        <div class="page-label">Exercise E2 · Easy</div>\r
        <h1 class="page-title">Playlist</h1>\r
        <p class="page-intro">Model a music playlist using tuples and a variant type for genre. You will practice tuple destructuring, list operations, and higher-order functions to filter, format, and summarize a collection of tracks.</p>\r
      </div>\r
\r
      <!-- Prompt -->\r
      <div class="exercise-box">\r
        <div class="exercise-head">\r
          <div class="exercise-meta">\r
            <div class="exercise-label">The challenge</div>\r
            <div class="exercise-title">Build a playlist with filters and formatters</div>\r
          </div>\r
          <span class="diff diff-easy">Easy</span>\r
        </div>\r
        <div class="exercise-body">\r
          <p class="exercise-desc">A track is a tuple of title, artist, duration in seconds, and genre. Build a library of functions that work with a list of such tracks: compute total duration, filter by genre or artist, extract titles, and format tracks for display.</p>\r
          <ul class="req-list">\r
            <li><span class="req-n">01</span>Define a <code>genre</code> variant type with <code>Rock</code>, <code>Jazz</code>, <code>Classical</code>, and <code>Pop</code> constructors.</li>\r
            <li><span class="req-n">02</span>Create at least 5 track tuples of type <code>string * string * int * genre</code> and collect them in a list.</li>\r
            <li><span class="req-n">03</span>Write <code>duration</code> that takes a track and returns its duration in seconds.</li>\r
            <li><span class="req-n">04</span>Write <code>total_duration</code> that takes a track list and returns the sum of all durations using recursion.</li>\r
            <li><span class="req-n">05</span>Write <code>filter_by_genre</code> and <code>filter_by_artist</code> using <code>List.filter</code>.</li>\r
            <li><span class="req-n">06</span>Write <code>track_titles</code> using <code>List.map</code> to extract just the title from each track.</li>\r
            <li><span class="req-n">07</span>Write <code>long_tracks</code> that returns only tracks longer than a given threshold in seconds.</li>\r
            <li><span class="req-n">08</span>Write <code>format_track</code> that returns a formatted string, for example <code>"Bohemian Rhapsody by Queen (5:54)"</code>.</li>\r
          </ul>\r
        </div>\r
      </div>\r
\r
      <!-- Starter + hints -->\r
      <div class="two-col lean">\r
        <div>\r
          <h2>Starter code</h2>\r
          <div class="code-block">\r
            <div class="code-top">\r
              <span class="code-fname">playlist.ml</span>\r
              <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
            </div>\r
<pre><span class="kw">type</span> <span class="ty">genre</span> = <span class="ty">Rock</span> | <span class="ty">Jazz</span> | <span class="ty">Classical</span> | <span class="ty">Pop</span>\r
\r
<span class="cmt">(* A track: (title, artist, duration_sec, genre) *)</span>\r
<span class="kw">let</span> track1 = (<span class="str">"Bohemian Rhapsody"</span>, <span class="str">"Queen"</span>, <span class="num">354</span>, <span class="ty">Rock</span>)\r
<span class="kw">let</span> track2 = (<span class="str">"So What"</span>, <span class="str">"Miles Davis"</span>, <span class="num">562</span>, <span class="ty">Jazz</span>)\r
<span class="cmt">(* add more tracks... *)</span>\r
\r
<span class="kw">let</span> playlist = [track1; track2 <span class="cmt">(* ... *)</span>]\r
\r
<span class="kw">let</span> <span class="fn">duration</span> track =\r
  <span class="cmt">(* TODO: extract the third element *)</span>\r
  <span class="num">0</span>\r
\r
<span class="kw">let</span> <span class="kw">rec</span> <span class="fn">total_duration</span> = <span class="kw">function</span>\r
  | [] -> <span class="num">0</span>\r
  | track :: rest -> <span class="cmt">(* TODO *)</span> <span class="num">0</span>\r
\r
<span class="kw">let</span> <span class="fn">filter_by_genre</span> g tracks =\r
  <span class="ty">List</span>.<span class="fn">filter</span> (<span class="kw">fun</span> _ -> <span class="cmt">(* TODO *)</span> <span class="kw">false</span>) tracks\r
\r
<span class="kw">let</span> <span class="fn">track_titles</span> tracks =\r
  <span class="ty">List</span>.<span class="fn">map</span> (<span class="kw">fun</span> _ -> <span class="cmt">(* TODO *)</span> <span class="str">""</span>) tracks\r
\r
<span class="kw">let</span> <span class="fn">format_track</span> (title, artist, d, _) =\r
  <span class="cmt">(* TODO: use Printf.sprintf\r
     minutes = d / 60, seconds = d mod 60 *)</span>\r
  <span class="str">""</span></pre>\r
          </div>\r
        </div>\r
        <div>\r
          <h2>Hints</h2>\r
          <p>For <code>duration</code>, use a wildcard pattern to destructure the tuple: <code>let duration (_, _, d, _) = d</code>. The same approach works in any function that only needs certain fields.</p>\r
          <p>For <code>filter_by_genre</code>, the lambda needs to extract the fourth element and compare it to <code>g</code>. Notice that <code>filter_by_artist</code> follows the exact same pattern, just extracting the second element instead. This repetition hints that partial application is at work: both functions are specializations of a more general filtering idea.</p>\r
          <p>For <code>format_track</code>, use <code>Printf.sprintf "%s by %s (%d:%02d)"</code>. The <code>%02d</code> format pads the seconds with a leading zero when needed.</p>\r
          <div class="callout callout-key">\r
            <div class="callout-title">Notice the pattern</div>\r
            <p><code>filter_by_genre</code> and <code>filter_by_artist</code> are structurally identical. The only thing that changes is which field is compared and to what. This is the same idea as partial application: parameterize the behavior instead of duplicating it.</p>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Playground link -->\r
      <div class="pg-link-wrap">\r
        <a href="/playground?exercise=playlist" class="pg-link-btn">Try in Playground →</a>\r
      </div>\r
\r
      <!-- Solution -->\r
      <div class="sol-toggle" id="sol-toggle" onclick="toggleSolution()">\r
        <span class="sol-icon" id="sol-icon">+</span>\r
        Show solution\r
        <span class="sol-hint">try it yourself first</span>\r
      </div>\r
\r
      <div class="sol-body" id="sol-body">\r
        <div class="two-col lean">\r
          <div>\r
            <div class="code-block">\r
              <div class="code-top">\r
                <span class="code-fname">playlist_solution.ml</span>\r
                <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
              </div>\r
<pre><span class="kw">type</span> <span class="ty">genre</span> = <span class="ty">Rock</span> | <span class="ty">Jazz</span> | <span class="ty">Classical</span> | <span class="ty">Pop</span>\r
\r
<span class="kw">let</span> track1 = (<span class="str">"Bohemian Rhapsody"</span>, <span class="str">"Queen"</span>,           <span class="num">354</span>, <span class="ty">Rock</span>)\r
<span class="kw">let</span> track2 = (<span class="str">"So What"</span>,           <span class="str">"Miles Davis"</span>,     <span class="num">562</span>, <span class="ty">Jazz</span>)\r
<span class="kw">let</span> track3 = (<span class="str">"Moonlight Sonata"</span>,  <span class="str">"Beethoven"</span>,       <span class="num">375</span>, <span class="ty">Classical</span>)\r
<span class="kw">let</span> track4 = (<span class="str">"Billie Jean"</span>,       <span class="str">"Michael Jackson"</span>, <span class="num">294</span>, <span class="ty">Pop</span>)\r
<span class="kw">let</span> track5 = (<span class="str">"Comfortably Numb"</span>,  <span class="str">"Pink Floyd"</span>,      <span class="num">382</span>, <span class="ty">Rock</span>)\r
\r
<span class="kw">let</span> playlist = [track1; track2; track3; track4; track5]\r
\r
<span class="kw">let</span> <span class="fn">duration</span> (_, _, d, _) = d\r
\r
<span class="kw">let</span> <span class="kw">rec</span> <span class="fn">total_duration</span> = <span class="kw">function</span>\r
  | [] -> <span class="num">0</span>\r
  | track :: rest -> <span class="fn">duration</span> track + <span class="fn">total_duration</span> rest\r
\r
<span class="kw">let</span> <span class="fn">filter_by_genre</span> g tracks =\r
  <span class="ty">List</span>.<span class="fn">filter</span> (<span class="kw">fun</span> (_, _, _, tg) -> tg = g) tracks\r
\r
<span class="kw">let</span> <span class="fn">filter_by_artist</span> artist tracks =\r
  <span class="ty">List</span>.<span class="fn">filter</span> (<span class="kw">fun</span> (_, a, _, _) -> a = artist) tracks\r
\r
<span class="kw">let</span> <span class="fn">track_titles</span> tracks =\r
  <span class="ty">List</span>.<span class="fn">map</span> (<span class="kw">fun</span> (title, _, _, _) -> title) tracks\r
\r
<span class="kw">let</span> <span class="fn">long_tracks</span> min_sec tracks =\r
  <span class="ty">List</span>.<span class="fn">filter</span> (<span class="kw">fun</span> track -> <span class="fn">duration</span> track > min_sec) tracks\r
\r
<span class="kw">let</span> <span class="fn">format_track</span> (title, artist, d, _) =\r
  <span class="ty">Printf</span>.<span class="fn">sprintf</span> <span class="str">"%s by %s (%d:%02d)"</span>\r
    title artist (d / <span class="num">60</span>) (d <span class="kw">mod</span> <span class="num">60</span>)\r
\r
<span class="kw">let</span> <span class="fn">print_playlist</span> tracks =\r
  <span class="ty">List</span>.<span class="fn">iter</span> (<span class="kw">fun</span> t -> <span class="fn">print_endline</span> (<span class="fn">format_track</span> t)) tracks\r
\r
<span class="kw">let</span> () =\r
  <span class="ty">Printf</span>.<span class="fn">printf</span> <span class="str">"Total: %d:%02d\\n"</span>\r
    (<span class="fn">total_duration</span> playlist / <span class="num">60</span>)\r
    (<span class="fn">total_duration</span> playlist <span class="kw">mod</span> <span class="num">60</span>);\r
  <span class="fn">print_endline</span> <span class="str">"Rock tracks:"</span>;\r
  <span class="fn">print_playlist</span> (<span class="fn">filter_by_genre</span> <span class="ty">Rock</span> playlist);\r
  <span class="fn">print_endline</span> <span class="str">"Long tracks (5+ min):"</span>;\r
  <span class="fn">print_playlist</span> (<span class="fn">long_tracks</span> <span class="num">300</span> playlist)</pre>\r
            </div>\r
          </div>\r
          <div>\r
            <h2>Walkthrough</h2>\r
            <p><strong>Tuple destructuring.</strong> The wildcard pattern <code>(_, _, d, _)</code> unpacks only what is needed and discards the rest. This is the idiomatic way to access fields in a tuple: no index syntax and no boilerplate.</p>\r
            <p><strong>filter_by_genre vs filter_by_artist.</strong> Both are one-liners that differ only in which field they compare. This similarity is intentional. In a real codebase you might abstract them into a single <code>filter_by_field</code> function that accepts a field extractor, but naming them explicitly is clearer here.</p>\r
            <p><strong>format_track.</strong> The <code>%02d</code> format specifier pads the value with a leading zero so that 5 minutes and 4 seconds prints as <code>5:04</code> instead of <code>5:4</code>. This is the same as the C printf format, which OCaml inherits.</p>\r
            <p><strong>print_playlist.</strong> <code>List.iter</code> applies a function to every element for its side effects. Unlike <code>List.map</code>, it returns <code>unit</code>. Using it here keeps the printing logic separate from the formatting logic.</p>\r
\r
            <h2>Going further</h2>\r
            <p>Once the basic version works, try these extensions:</p>\r
            <ul>\r
              <li>Write <code>sort_by_duration</code> using <code>List.sort</code> with a custom comparator.</li>\r
              <li>Group tracks by genre into a list of <code>(genre * track list)</code> pairs.</li>\r
              <li>Write <code>shuffle</code> using <code>List.sort</code> with <code>Random.int</code> as the comparator.</li>\r
            </ul>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="page-footer">\r
        <a href="/exercises/bank">← Bank Account</a>\r
        <a href="/exercises/search">Next: Search →</a>\r
      </div>\r
    </div>`,Xh=`<div class="article">\r
      <div class="page-header">\r
        <div class="page-label">Exercise E3 · Hard</div>\r
        <h1 class="page-title">Iteration and Search</h1>\r
        <p class="page-intro">Implement the two fundamental iteration patterns from scratch, then use partial application to build a family of specialized utilities on top of them. This exercise ties together currying, higher-order functions, and tail recursion.</p>\r
      </div>\r
\r
      <!-- Prompt -->\r
      <div class="exercise-box">\r
        <div class="exercise-head">\r
          <div class="exercise-meta">\r
            <div class="exercise-label">The challenge</div>\r
            <div class="exercise-title">Build iter and first, then derive everything else</div>\r
          </div>\r
          <span class="diff diff-hard">Hard</span>\r
        </div>\r
        <div class="exercise-body">\r
          <p class="exercise-desc">Start by implementing the two core iteration functions. Then use them as building blocks to solve concrete problems. The goal is to get comfortable using partial application to specialize a general function into a specific one.</p>\r
          <ul class="req-list">\r
            <li><span class="req-n">01</span>Implement <code>iter f n start</code>: applies <code>f</code> exactly <code>n</code> times to <code>start</code>. Must be tail recursive.</li>\r
            <li><span class="req-n">02</span>Use <code>iter</code> to define <code>double_n_times</code>: doubles a number exactly <code>n</code> times. Use partial application.</li>\r
            <li><span class="req-n">03</span>Use <code>iter</code> to define <code>add_step</code> and <code>count_by_3</code>: add a fixed amount <code>n</code> times.</li>\r
            <li><span class="req-n">04</span>Implement <code>first pred start</code>: returns the smallest integer at or above <code>start</code> for which <code>pred</code> holds.</li>\r
            <li><span class="req-n">05</span>Use <code>first</code> to define <code>first_divisible_by n start</code>.</li>\r
            <li><span class="req-n">06</span>Use <code>first</code> to define <code>first_perfect_square start</code>. A number <code>x</code> is a perfect square if <code>floor(sqrt(x))^2 = x</code>.</li>\r
            <li><span class="req-n">07</span>Use <code>first</code> to define <code>natural_sqrt n</code>: compute <code>floor(sqrt(n))</code> without using any floating-point square root.</li>\r
          </ul>\r
        </div>\r
      </div>\r
\r
      <!-- Starter + hints -->\r
      <div class="two-col lean">\r
        <div>\r
          <h2>Starter code</h2>\r
          <div class="code-block">\r
            <div class="code-top">\r
              <span class="code-fname">search.ml</span>\r
              <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
            </div>\r
<pre><span class="cmt">(* Definite iteration *)</span>\r
<span class="kw">let</span> <span class="kw">rec</span> <span class="fn">iter</span> (f : <span class="ty">int</span> -> <span class="ty">int</span>) (n : <span class="ty">int</span>) (start : <span class="ty">int</span>) =\r
  <span class="cmt">(* TODO *)</span>\r
  start\r
\r
<span class="kw">let</span> <span class="fn">double_n_times</span> n =\r
  <span class="cmt">(* TODO: partial application of iter *)</span>\r
  <span class="fn">iter</span> (<span class="kw">fun</span> x -> x) n\r
\r
<span class="kw">let</span> <span class="fn">add_step</span> step =\r
  <span class="cmt">(* TODO: partial application of iter *)</span>\r
  <span class="fn">iter</span> (<span class="kw">fun</span> x -> x) step\r
\r
<span class="kw">let</span> <span class="fn">count_by_3</span> =\r
  <span class="cmt">(* TODO: partial application of add_step *)</span>\r
  <span class="fn">add_step</span> <span class="num">0</span>\r
\r
<span class="cmt">(* Indefinite iteration *)</span>\r
<span class="kw">let</span> <span class="kw">rec</span> <span class="fn">first</span> (pred : <span class="ty">int</span> -> <span class="ty">bool</span>) (start : <span class="ty">int</span>) =\r
  <span class="cmt">(* TODO *)</span>\r
  start\r
\r
<span class="kw">let</span> <span class="fn">first_divisible_by</span> n start =\r
  <span class="cmt">(* TODO *)</span>\r
  <span class="num">0</span>\r
\r
<span class="kw">let</span> <span class="fn">first_perfect_square</span> start =\r
  <span class="cmt">(* TODO: use int_of_float (sqrt (float_of_int x)) *)</span>\r
  <span class="num">0</span>\r
\r
<span class="kw">let</span> <span class="fn">natural_sqrt</span> n =\r
  <span class="cmt">(* TODO: use first to find the first k where k*k > n *)</span>\r
  <span class="num">0</span></pre>\r
          </div>\r
        </div>\r
        <div>\r
          <h2>Hints</h2>\r
          <p>For <code>iter</code>, the base case is when <code>n &lt; 1</code>: return <code>start</code> as is. For the recursive case, call <code>iter</code> again with <code>n - 1</code> and <code>f start</code> as the new starting value. This keeps the recursion in tail position.</p>\r
          <p>For <code>double_n_times</code>, notice that <code>iter (fun x -&gt; x * 2)</code> is a function of type <code>int -&gt; int -&gt; int</code>. Supplying just <code>iter (fun x -&gt; x * 2)</code> gives you a function that still expects <code>n</code> and <code>start</code>. That is exactly <code>double_n_times</code>.</p>\r
          <p>For <code>natural_sqrt</code>, use <code>first</code> to find the first <code>k</code> where <code>k * k &gt; n</code>, starting from <code>1</code>. Then subtract 1 from the result.</p>\r
          <div class="callout callout-key">\r
            <div class="callout-title">Key insight</div>\r
            <p>Every derived function is just <code>iter</code> or <code>first</code> with one or more arguments already fixed. Recognize this pattern and the implementations become one-liners.</p>\r
          </div>\r
          <div class="callout callout-warn">\r
            <div class="callout-title">Watch out</div>\r
            <p><code>first_perfect_square</code> uses OCaml's built-in <code>sqrt</code> to check whether a number is a perfect square, but <code>natural_sqrt</code> must not. The whole point of <code>natural_sqrt</code> is to compute the integer square root using only integer arithmetic through <code>first</code>.</p>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Playground link -->\r
      <div class="pg-link-wrap">\r
        <a href="/playground?exercise=search" class="pg-link-btn">Try in Playground →</a>\r
      </div>\r
\r
      <!-- Solution -->\r
      <div class="sol-toggle" id="sol-toggle" onclick="toggleSolution()">\r
        <span class="sol-icon" id="sol-icon">+</span>\r
        Show solution\r
        <span class="sol-hint">try it yourself first</span>\r
      </div>\r
\r
      <div class="sol-body" id="sol-body">\r
        <div class="two-col lean">\r
          <div>\r
            <div class="code-block">\r
              <div class="code-top">\r
                <span class="code-fname">search_solution.ml</span>\r
                <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
              </div>\r
<pre><span class="cmt">(* Definite iteration *)</span>\r
<span class="kw">let</span> <span class="kw">rec</span> <span class="fn">iter</span> (f : <span class="ty">int</span> -> <span class="ty">int</span>) (n : <span class="ty">int</span>) (start : <span class="ty">int</span>) =\r
  <span class="kw">if</span> n < <span class="num">1</span> <span class="kw">then</span> start\r
  <span class="kw">else</span> <span class="fn">iter</span> f (n - <span class="num">1</span>) (f start)\r
\r
<span class="kw">let</span> <span class="fn">double_n_times</span> = <span class="fn">iter</span> (<span class="kw">fun</span> x -> x * <span class="num">2</span>)\r
<span class="cmt">(* double_n_times : int -> int -> int *)</span>\r
\r
<span class="kw">let</span> <span class="fn">add_step</span> step = <span class="fn">iter</span> (<span class="kw">fun</span> x -> x + step)\r
<span class="kw">let</span> <span class="fn">count_by_3</span> = <span class="fn">add_step</span> <span class="num">3</span>\r
\r
<span class="cmt">(* Indefinite iteration *)</span>\r
<span class="kw">let</span> <span class="kw">rec</span> <span class="fn">first</span> (pred : <span class="ty">int</span> -> <span class="ty">bool</span>) (start : <span class="ty">int</span>) =\r
  <span class="kw">if</span> pred start <span class="kw">then</span> start\r
  <span class="kw">else</span> <span class="fn">first</span> pred (start + <span class="num">1</span>)\r
\r
<span class="kw">let</span> <span class="fn">first_divisible_by</span> n =\r
  <span class="fn">first</span> (<span class="kw">fun</span> x -> x <span class="kw">mod</span> n = <span class="num">0</span>)\r
\r
<span class="kw">let</span> <span class="fn">first_perfect_square</span> start =\r
  <span class="kw">let</span> <span class="fn">is_square</span> x =\r
    <span class="kw">let</span> s = <span class="fn">int_of_float</span> (<span class="fn">sqrt</span> (<span class="fn">float_of_int</span> x)) <span class="kw">in</span>\r
    s * s = x\r
  <span class="kw">in</span>\r
  <span class="fn">first</span> <span class="fn">is_square</span> start\r
\r
<span class="kw">let</span> <span class="fn">natural_sqrt</span> n =\r
  (<span class="fn">first</span> (<span class="kw">fun</span> k -> k * k > n) <span class="num">1</span>) - <span class="num">1</span>\r
\r
<span class="kw">let</span> () =\r
  <span class="ty">Printf</span>.<span class="fn">printf</span> <span class="str">"1 doubled 4 times: %d\\n"</span>\r
    (<span class="fn">double_n_times</span> <span class="num">4</span> <span class="num">1</span>);\r
  <span class="ty">Printf</span>.<span class="fn">printf</span> <span class="str">"count_by_3, 5 steps from 0: %d\\n"</span>\r
    (<span class="fn">count_by_3</span> <span class="num">5</span> <span class="num">0</span>);\r
  <span class="ty">Printf</span>.<span class="fn">printf</span> <span class="str">"First multiple of 7 from 50: %d\\n"</span>\r
    (<span class="fn">first_divisible_by</span> <span class="num">7</span> <span class="num">50</span>);\r
  <span class="ty">Printf</span>.<span class="fn">printf</span> <span class="str">"First perfect square from 20: %d\\n"</span>\r
    (<span class="fn">first_perfect_square</span> <span class="num">20</span>);\r
  <span class="ty">Printf</span>.<span class="fn">printf</span> <span class="str">"floor(sqrt(50)): %d\\n"</span>\r
    (<span class="fn">natural_sqrt</span> <span class="num">50</span>)</pre>\r
            </div>\r
          </div>\r
          <div>\r
            <h2>Walkthrough</h2>\r
            <p><strong>iter.</strong> The function simply decrements <code>n</code> and applies <code>f</code> to <code>start</code> on each recursive call. Both updated values are passed forward as arguments, so there is nothing pending after the recursive call. This makes it tail recursive.</p>\r
            <p><strong>double_n_times.</strong> Supplying <code>iter (fun x -&gt; x * 2)</code> produces a function waiting for <code>n</code> and <code>start</code>. That is exactly the type of <code>double_n_times</code>. No wrapper function is needed.</p>\r
            <p><strong>add_step and count_by_3.</strong> <code>add_step</code> takes <code>step</code> and returns a partially applied <code>iter</code>. Then <code>count_by_3</code> partially applies <code>add_step</code> with <code>3</code>, giving a function of type <code>int -&gt; int -&gt; int</code>. Two levels of partial application, both one-liners.</p>\r
            <p><strong>natural_sqrt.</strong> The key insight is that the first <code>k</code> where <code>k * k &gt; n</code> overshoots by exactly one step. Subtracting 1 gives the floor of the square root. No floating-point arithmetic involved.</p>\r
\r
            <h2>Going further</h2>\r
            <p>Once everything works, try these extensions:</p>\r
            <ul>\r
              <li>Generalize <code>iter</code> to work with any type, not just <code>int</code>. What does the signature look like?</li>\r
              <li>Write <code>iterate_until f pred start</code> that applies <code>f</code> repeatedly until <code>pred</code> holds, similar to <code>first</code> but with a custom step function.</li>\r
              <li>Use <code>iter</code> to implement the Fibonacci sequence: <code>fib n</code> via a pair accumulator <code>(a, b)</code> where each step becomes <code>(b, a + b)</code>.</li>\r
            </ul>\r
            <div class="code-block" style="margin-top:16px;">\r
              <div class="code-top">\r
                <span class="code-fname">extension.ml</span>\r
                <button class="copy-btn" onclick="copyCode(this)">copy</button>\r
              </div>\r
<pre><span class="cmt">(* Fibonacci using iter with a pair accumulator *)</span>\r
<span class="kw">let</span> <span class="fn">fib</span> n =\r
  <span class="kw">let</span> <span class="fn">step</span> (a, b) = (b, a + b) <span class="kw">in</span>\r
  <span class="kw">let</span> <span class="kw">rec</span> <span class="fn">loop</span> acc k =\r
    <span class="kw">if</span> k < <span class="num">1</span> <span class="kw">then</span> <span class="fn">fst</span> acc\r
    <span class="kw">else</span> <span class="fn">loop</span> (<span class="fn">step</span> acc) (k - <span class="num">1</span>)\r
  <span class="kw">in</span>\r
  <span class="fn">loop</span> (<span class="num">0</span>, <span class="num">1</span>) n\r
\r
<span class="fn">fib</span> <span class="num">10</span>  <span class="cmt">(* 55 *)</span></pre>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="page-footer">\r
        <a href="/exercises/playlist">← Playlist</a>\r
        <a href="/">Back to Home</a>\r
      </div>\r
    </div>`,_o=[{path:"/",html:Bh,title:"Learn OCaml by Example | oCamlCase",description:"A practical guide to OCaml with functional patterns, type system features, and coding exercises. Written for programmers who want to understand the language."},{path:"/cheatsheet",html:Wh,title:"Cheat Sheet | oCamlCase",description:"Quick reference for OCaml syntax: bindings, types, functions, pattern matching, lists, modules, and I/O."},{path:"/concepts/currying",html:Hh,title:"Currying | oCamlCase",description:"Understand currying in OCaml: how every function takes exactly one argument, what partial application is, and how labeled arguments change the picture."},{path:"/concepts/abstractions",html:$h,title:"Abstractions | oCamlCase",description:"Learn how OCaml uses anonymous functions (abstractions) as first-class values, and how let bindings are just syntactic sugar for naming them."},{path:"/concepts/pattern-matching",html:Vh,title:"Pattern Matching | oCamlCase",description:"Learn pattern matching in OCaml: the match expression, variant types, exhaustiveness checking, guards, and nested patterns."},{path:"/concepts/higher-order",html:Qh,title:"Higher-Order Functions | oCamlCase",description:"Learn higher-order functions in OCaml: map, filter, fold, the pipe operator, and how passing functions as arguments compares to dependency injection in OOP."},{path:"/concepts/tail-recursion",html:qh,title:"Tail Recursion | oCamlCase",description:"Understand tail recursion in OCaml: what tail position means, how the compiler optimizes tail calls, the accumulator pattern, and divergence."},{path:"/concepts/iteration",html:Kh,title:"Iteration | oCamlCase",description:"Learn definite and indefinite iteration in OCaml: how to apply a function n times with iter, and how to search for the first value satisfying a predicate with first."},{path:"/exercises/bank",html:Yh,title:"Bank Account | oCamlCase",description:"Practice OCaml variant types, immutable records, and list folds by building a bank account model that derives balance from transaction history."},{path:"/exercises/playlist",html:Gh,title:"Playlist | oCamlCase",description:"Practice OCaml list operations, higher-order functions, and tuple destructuring by building a music playlist with filtering, formatting, and duration calculation."},{path:"/exercises/search",html:Xh,title:"Search | oCamlCase",description:"Practice OCaml iteration patterns: implement iter for definite repetition and first for indefinite search, then use them to solve concrete problems with partial application."}];function Jh(){return O.jsx(Lh,{children:O.jsxs(xh,{children:[O.jsx(Te,{path:"/playground",element:O.jsx(Ah,{})}),O.jsx(Te,{path:"/playground.html",element:O.jsx(rr,{to:"/playground",replace:!0})}),O.jsxs(Te,{element:O.jsx(Mh,{}),children:[_o.map(n=>O.jsx(Te,{path:n.path,element:O.jsx(Dh,{html:n.html,title:n.title,description:n.description})},n.path)),_o.filter(n=>n.path!=="/").map(n=>O.jsx(Te,{path:n.path+".html",element:O.jsx(rr,{to:n.path,replace:!0})},n.path+".html")),O.jsx(Te,{path:"/index.html",element:O.jsx(rr,{to:"/",replace:!0})})]})]})})}Du(document.getElementById("root")).render(O.jsx(x.StrictMode,{children:O.jsx(Jh,{})}));
