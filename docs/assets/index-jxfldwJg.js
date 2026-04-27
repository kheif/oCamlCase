function Yp(n,e){for(var s=0;s<e.length;s++){const t=e[s];if(typeof t!="string"&&!Array.isArray(t)){for(const a in t)if(a!=="default"&&!(a in n)){const r=Object.getOwnPropertyDescriptor(t,a);r&&Object.defineProperty(n,a,r.get?r:{enumerable:!0,get:()=>t[a]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))t(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}})();function Xp(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var _o={exports:{}},da={},Eo={exports:{}},z={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rt=Symbol.for("react.element"),Jp=Symbol.for("react.portal"),Zp=Symbol.for("react.fragment"),nu=Symbol.for("react.strict_mode"),eu=Symbol.for("react.profiler"),su=Symbol.for("react.provider"),tu=Symbol.for("react.context"),au=Symbol.for("react.forward_ref"),ru=Symbol.for("react.suspense"),lu=Symbol.for("react.memo"),iu=Symbol.for("react.lazy"),ti=Symbol.iterator;function ou(n){return n===null||typeof n!="object"?null:(n=ti&&n[ti]||n["@@iterator"],typeof n=="function"?n:null)}var To={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Po=Object.assign,bo={};function ds(n,e,s){this.props=n,this.context=e,this.refs=bo,this.updater=s||To}ds.prototype.isReactComponent={};ds.prototype.setState=function(n,e){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,n,e,"setState")};ds.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function Lo(){}Lo.prototype=ds.prototype;function sl(n,e,s){this.props=n,this.context=e,this.refs=bo,this.updater=s||To}var tl=sl.prototype=new Lo;tl.constructor=sl;Po(tl,ds.prototype);tl.isPureReactComponent=!0;var ai=Array.isArray,Oo=Object.prototype.hasOwnProperty,al={current:null},No={key:!0,ref:!0,__self:!0,__source:!0};function zo(n,e,s){var t,a={},r=null,l=null;if(e!=null)for(t in e.ref!==void 0&&(l=e.ref),e.key!==void 0&&(r=""+e.key),e)Oo.call(e,t)&&!No.hasOwnProperty(t)&&(a[t]=e[t]);var i=arguments.length-2;if(i===1)a.children=s;else if(1<i){for(var o=Array(i),c=0;c<i;c++)o[c]=arguments[c+2];a.children=o}if(n&&n.defaultProps)for(t in i=n.defaultProps,i)a[t]===void 0&&(a[t]=i[t]);return{$$typeof:rt,type:n,key:r,ref:l,props:a,_owner:al.current}}function cu(n,e){return{$$typeof:rt,type:n.type,key:e,ref:n.ref,props:n.props,_owner:n._owner}}function rl(n){return typeof n=="object"&&n!==null&&n.$$typeof===rt}function pu(n){var e={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,function(s){return e[s]})}var ri=/\/+/g;function za(n,e){return typeof n=="object"&&n!==null&&n.key!=null?pu(""+n.key):e.toString(36)}function Lt(n,e,s,t,a){var r=typeof n;(r==="undefined"||r==="boolean")&&(n=null);var l=!1;if(n===null)l=!0;else switch(r){case"string":case"number":l=!0;break;case"object":switch(n.$$typeof){case rt:case Jp:l=!0}}if(l)return l=n,a=a(l),n=t===""?"."+za(l,0):t,ai(a)?(s="",n!=null&&(s=n.replace(ri,"$&/")+"/"),Lt(a,e,s,"",function(c){return c})):a!=null&&(rl(a)&&(a=cu(a,s+(!a.key||l&&l.key===a.key?"":(""+a.key).replace(ri,"$&/")+"/")+n)),e.push(a)),1;if(l=0,t=t===""?".":t+":",ai(n))for(var i=0;i<n.length;i++){r=n[i];var o=t+za(r,i);l+=Lt(r,e,s,o,a)}else if(o=ou(n),typeof o=="function")for(n=o.call(n),i=0;!(r=n.next()).done;)r=r.value,o=t+za(r,i++),l+=Lt(r,e,s,o,a);else if(r==="object")throw e=String(n),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return l}function dt(n,e,s){if(n==null)return n;var t=[],a=0;return Lt(n,t,"","",function(r){return e.call(s,r,a++)}),t}function uu(n){if(n._status===-1){var e=n._result;e=e(),e.then(function(s){(n._status===0||n._status===-1)&&(n._status=1,n._result=s)},function(s){(n._status===0||n._status===-1)&&(n._status=2,n._result=s)}),n._status===-1&&(n._status=0,n._result=e)}if(n._status===1)return n._result.default;throw n._result}var pn={current:null},Ot={transition:null},du={ReactCurrentDispatcher:pn,ReactCurrentBatchConfig:Ot,ReactCurrentOwner:al};function Ro(){throw Error("act(...) is not supported in production builds of React.")}z.Children={map:dt,forEach:function(n,e,s){dt(n,function(){e.apply(this,arguments)},s)},count:function(n){var e=0;return dt(n,function(){e++}),e},toArray:function(n){return dt(n,function(e){return e})||[]},only:function(n){if(!rl(n))throw Error("React.Children.only expected to receive a single React element child.");return n}};z.Component=ds;z.Fragment=Zp;z.Profiler=eu;z.PureComponent=sl;z.StrictMode=nu;z.Suspense=ru;z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=du;z.act=Ro;z.cloneElement=function(n,e,s){if(n==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+n+".");var t=Po({},n.props),a=n.key,r=n.ref,l=n._owner;if(e!=null){if(e.ref!==void 0&&(r=e.ref,l=al.current),e.key!==void 0&&(a=""+e.key),n.type&&n.type.defaultProps)var i=n.type.defaultProps;for(o in e)Oo.call(e,o)&&!No.hasOwnProperty(o)&&(t[o]=e[o]===void 0&&i!==void 0?i[o]:e[o])}var o=arguments.length-2;if(o===1)t.children=s;else if(1<o){i=Array(o);for(var c=0;c<o;c++)i[c]=arguments[c+2];t.children=i}return{$$typeof:rt,type:n.type,key:a,ref:r,props:t,_owner:l}};z.createContext=function(n){return n={$$typeof:tu,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},n.Provider={$$typeof:su,_context:n},n.Consumer=n};z.createElement=zo;z.createFactory=function(n){var e=zo.bind(null,n);return e.type=n,e};z.createRef=function(){return{current:null}};z.forwardRef=function(n){return{$$typeof:au,render:n}};z.isValidElement=rl;z.lazy=function(n){return{$$typeof:iu,_payload:{_status:-1,_result:n},_init:uu}};z.memo=function(n,e){return{$$typeof:lu,type:n,compare:e===void 0?null:e}};z.startTransition=function(n){var e=Ot.transition;Ot.transition={};try{n()}finally{Ot.transition=e}};z.unstable_act=Ro;z.useCallback=function(n,e){return pn.current.useCallback(n,e)};z.useContext=function(n){return pn.current.useContext(n)};z.useDebugValue=function(){};z.useDeferredValue=function(n){return pn.current.useDeferredValue(n)};z.useEffect=function(n,e){return pn.current.useEffect(n,e)};z.useId=function(){return pn.current.useId()};z.useImperativeHandle=function(n,e,s){return pn.current.useImperativeHandle(n,e,s)};z.useInsertionEffect=function(n,e){return pn.current.useInsertionEffect(n,e)};z.useLayoutEffect=function(n,e){return pn.current.useLayoutEffect(n,e)};z.useMemo=function(n,e){return pn.current.useMemo(n,e)};z.useReducer=function(n,e,s){return pn.current.useReducer(n,e,s)};z.useRef=function(n){return pn.current.useRef(n)};z.useState=function(n){return pn.current.useState(n)};z.useSyncExternalStore=function(n,e,s){return pn.current.useSyncExternalStore(n,e,s)};z.useTransition=function(){return pn.current.useTransition()};z.version="18.3.1";Eo.exports=z;var x=Eo.exports;const fu=Xp(x),hu=Yp({__proto__:null,default:fu},[x]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mu=x,vu=Symbol.for("react.element"),yu=Symbol.for("react.fragment"),gu=Object.prototype.hasOwnProperty,wu=mu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ku={key:!0,ref:!0,__self:!0,__source:!0};function Io(n,e,s){var t,a={},r=null,l=null;s!==void 0&&(r=""+s),e.key!==void 0&&(r=""+e.key),e.ref!==void 0&&(l=e.ref);for(t in e)gu.call(e,t)&&!ku.hasOwnProperty(t)&&(a[t]=e[t]);if(n&&n.defaultProps)for(t in e=n.defaultProps,e)a[t]===void 0&&(a[t]=e[t]);return{$$typeof:vu,type:n,key:r,ref:l,props:a,_owner:wu.current}}da.Fragment=yu;da.jsx=Io;da.jsxs=Io;_o.exports=da;var L=_o.exports,jo={exports:{}},xn={},Mo={exports:{}},Do={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(n){function e(E,O){var N=E.length;E.push(O);n:for(;0<N;){var V=N-1>>>1,X=E[V];if(0<a(X,O))E[V]=O,E[N]=X,N=V;else break n}}function s(E){return E.length===0?null:E[0]}function t(E){if(E.length===0)return null;var O=E[0],N=E.pop();if(N!==O){E[0]=N;n:for(var V=0,X=E.length,pt=X>>>1;V<pt;){var Ce=2*(V+1)-1,Na=E[Ce],_e=Ce+1,ut=E[_e];if(0>a(Na,N))_e<X&&0>a(ut,Na)?(E[V]=ut,E[_e]=N,V=_e):(E[V]=Na,E[Ce]=N,V=Ce);else if(_e<X&&0>a(ut,N))E[V]=ut,E[_e]=N,V=_e;else break n}}return O}function a(E,O){var N=E.sortIndex-O.sortIndex;return N!==0?N:E.id-O.id}if(typeof performance=="object"&&typeof performance.now=="function"){var r=performance;n.unstable_now=function(){return r.now()}}else{var l=Date,i=l.now();n.unstable_now=function(){return l.now()-i}}var o=[],c=[],m=1,d=null,h=3,y=!1,w=!1,g=!1,C=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,p=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function f(E){for(var O=s(c);O!==null;){if(O.callback===null)t(c);else if(O.startTime<=E)t(c),O.sortIndex=O.expirationTime,e(o,O);else break;O=s(c)}}function v(E){if(g=!1,f(E),!w)if(s(o)!==null)w=!0,La(S);else{var O=s(c);O!==null&&Oa(v,O.startTime-E)}}function S(E,O){w=!1,g&&(g=!1,u(b),b=-1),y=!0;var N=h;try{for(f(O),d=s(o);d!==null&&(!(d.expirationTime>O)||E&&!Ln());){var V=d.callback;if(typeof V=="function"){d.callback=null,h=d.priorityLevel;var X=V(d.expirationTime<=O);O=n.unstable_now(),typeof X=="function"?d.callback=X:d===s(o)&&t(o),f(O)}else t(o);d=s(o)}if(d!==null)var pt=!0;else{var Ce=s(c);Ce!==null&&Oa(v,Ce.startTime-O),pt=!1}return pt}finally{d=null,h=N,y=!1}}var T=!1,P=null,b=-1,$=5,R=-1;function Ln(){return!(n.unstable_now()-R<$)}function ys(){if(P!==null){var E=n.unstable_now();R=E;var O=!0;try{O=P(!0,E)}finally{O?gs():(T=!1,P=null)}}else T=!1}var gs;if(typeof p=="function")gs=function(){p(ys)};else if(typeof MessageChannel<"u"){var si=new MessageChannel,Gp=si.port2;si.port1.onmessage=ys,gs=function(){Gp.postMessage(null)}}else gs=function(){C(ys,0)};function La(E){P=E,T||(T=!0,gs())}function Oa(E,O){b=C(function(){E(n.unstable_now())},O)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(E){E.callback=null},n.unstable_continueExecution=function(){w||y||(w=!0,La(S))},n.unstable_forceFrameRate=function(E){0>E||125<E?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):$=0<E?Math.floor(1e3/E):5},n.unstable_getCurrentPriorityLevel=function(){return h},n.unstable_getFirstCallbackNode=function(){return s(o)},n.unstable_next=function(E){switch(h){case 1:case 2:case 3:var O=3;break;default:O=h}var N=h;h=O;try{return E()}finally{h=N}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(E,O){switch(E){case 1:case 2:case 3:case 4:case 5:break;default:E=3}var N=h;h=E;try{return O()}finally{h=N}},n.unstable_scheduleCallback=function(E,O,N){var V=n.unstable_now();switch(typeof N=="object"&&N!==null?(N=N.delay,N=typeof N=="number"&&0<N?V+N:V):N=V,E){case 1:var X=-1;break;case 2:X=250;break;case 5:X=1073741823;break;case 4:X=1e4;break;default:X=5e3}return X=N+X,E={id:m++,callback:O,priorityLevel:E,startTime:N,expirationTime:X,sortIndex:-1},N>V?(E.sortIndex=N,e(c,E),s(o)===null&&E===s(c)&&(g?(u(b),b=-1):g=!0,Oa(v,N-V))):(E.sortIndex=X,e(o,E),w||y||(w=!0,La(S))),E},n.unstable_shouldYield=Ln,n.unstable_wrapCallback=function(E){var O=h;return function(){var N=h;h=O;try{return E.apply(this,arguments)}finally{h=N}}}})(Do);Mo.exports=Do;var xu=Mo.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Su=x,kn=xu;function k(n){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+n,s=1;s<arguments.length;s++)e+="&args[]="+encodeURIComponent(arguments[s]);return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Fo=new Set,Us={};function Fe(n,e){rs(n,e),rs(n+"Capture",e)}function rs(n,e){for(Us[n]=e,n=0;n<e.length;n++)Fo.add(e[n])}var qn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ir=Object.prototype.hasOwnProperty,Cu=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,li={},ii={};function _u(n){return ir.call(ii,n)?!0:ir.call(li,n)?!1:Cu.test(n)?ii[n]=!0:(li[n]=!0,!1)}function Eu(n,e,s,t){if(s!==null&&s.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return t?!1:s!==null?!s.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function Tu(n,e,s,t){if(e===null||typeof e>"u"||Eu(n,e,s,t))return!0;if(t)return!1;if(s!==null)switch(s.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function un(n,e,s,t,a,r,l){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=t,this.attributeNamespace=a,this.mustUseProperty=s,this.propertyName=n,this.type=e,this.sanitizeURL=r,this.removeEmptyString=l}var sn={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){sn[n]=new un(n,0,!1,n,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var e=n[0];sn[e]=new un(e,1,!1,n[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(n){sn[n]=new un(n,2,!1,n.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){sn[n]=new un(n,2,!1,n,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){sn[n]=new un(n,3,!1,n.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(n){sn[n]=new un(n,3,!0,n,null,!1,!1)});["capture","download"].forEach(function(n){sn[n]=new un(n,4,!1,n,null,!1,!1)});["cols","rows","size","span"].forEach(function(n){sn[n]=new un(n,6,!1,n,null,!1,!1)});["rowSpan","start"].forEach(function(n){sn[n]=new un(n,5,!1,n.toLowerCase(),null,!1,!1)});var ll=/[\-:]([a-z])/g;function il(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var e=n.replace(ll,il);sn[e]=new un(e,1,!1,n,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var e=n.replace(ll,il);sn[e]=new un(e,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(n){var e=n.replace(ll,il);sn[e]=new un(e,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(n){sn[n]=new un(n,1,!1,n.toLowerCase(),null,!1,!1)});sn.xlinkHref=new un("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(n){sn[n]=new un(n,1,!1,n.toLowerCase(),null,!0,!0)});function ol(n,e,s,t){var a=sn.hasOwnProperty(e)?sn[e]:null;(a!==null?a.type!==0:t||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Tu(e,s,a,t)&&(s=null),t||a===null?_u(e)&&(s===null?n.removeAttribute(e):n.setAttribute(e,""+s)):a.mustUseProperty?n[a.propertyName]=s===null?a.type===3?!1:"":s:(e=a.attributeName,t=a.attributeNamespace,s===null?n.removeAttribute(e):(a=a.type,s=a===3||a===4&&s===!0?"":""+s,t?n.setAttributeNS(t,e,s):n.setAttribute(e,s))))}var Xn=Su.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ft=Symbol.for("react.element"),Be=Symbol.for("react.portal"),We=Symbol.for("react.fragment"),cl=Symbol.for("react.strict_mode"),or=Symbol.for("react.profiler"),Ao=Symbol.for("react.provider"),Uo=Symbol.for("react.context"),pl=Symbol.for("react.forward_ref"),cr=Symbol.for("react.suspense"),pr=Symbol.for("react.suspense_list"),ul=Symbol.for("react.memo"),ne=Symbol.for("react.lazy"),Bo=Symbol.for("react.offscreen"),oi=Symbol.iterator;function ws(n){return n===null||typeof n!="object"?null:(n=oi&&n[oi]||n["@@iterator"],typeof n=="function"?n:null)}var W=Object.assign,Ra;function Ps(n){if(Ra===void 0)try{throw Error()}catch(s){var e=s.stack.trim().match(/\n( *(at )?)/);Ra=e&&e[1]||""}return`
`+Ra+n}var Ia=!1;function ja(n,e){if(!n||Ia)return"";Ia=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var t=c}Reflect.construct(n,[],e)}else{try{e.call()}catch(c){t=c}n.call(e.prototype)}else{try{throw Error()}catch(c){t=c}n()}}catch(c){if(c&&t&&typeof c.stack=="string"){for(var a=c.stack.split(`
`),r=t.stack.split(`
`),l=a.length-1,i=r.length-1;1<=l&&0<=i&&a[l]!==r[i];)i--;for(;1<=l&&0<=i;l--,i--)if(a[l]!==r[i]){if(l!==1||i!==1)do if(l--,i--,0>i||a[l]!==r[i]){var o=`
`+a[l].replace(" at new "," at ");return n.displayName&&o.includes("<anonymous>")&&(o=o.replace("<anonymous>",n.displayName)),o}while(1<=l&&0<=i);break}}}finally{Ia=!1,Error.prepareStackTrace=s}return(n=n?n.displayName||n.name:"")?Ps(n):""}function Pu(n){switch(n.tag){case 5:return Ps(n.type);case 16:return Ps("Lazy");case 13:return Ps("Suspense");case 19:return Ps("SuspenseList");case 0:case 2:case 15:return n=ja(n.type,!1),n;case 11:return n=ja(n.type.render,!1),n;case 1:return n=ja(n.type,!0),n;default:return""}}function ur(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case We:return"Fragment";case Be:return"Portal";case or:return"Profiler";case cl:return"StrictMode";case cr:return"Suspense";case pr:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case Uo:return(n.displayName||"Context")+".Consumer";case Ao:return(n._context.displayName||"Context")+".Provider";case pl:var e=n.render;return n=n.displayName,n||(n=e.displayName||e.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case ul:return e=n.displayName||null,e!==null?e:ur(n.type)||"Memo";case ne:e=n._payload,n=n._init;try{return ur(n(e))}catch{}}return null}function bu(n){var e=n.type;switch(n.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=e.render,n=n.displayName||n.name||"",e.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ur(e);case 8:return e===cl?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function ve(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function Wo(n){var e=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Lu(n){var e=Wo(n)?"checked":"value",s=Object.getOwnPropertyDescriptor(n.constructor.prototype,e),t=""+n[e];if(!n.hasOwnProperty(e)&&typeof s<"u"&&typeof s.get=="function"&&typeof s.set=="function"){var a=s.get,r=s.set;return Object.defineProperty(n,e,{configurable:!0,get:function(){return a.call(this)},set:function(l){t=""+l,r.call(this,l)}}),Object.defineProperty(n,e,{enumerable:s.enumerable}),{getValue:function(){return t},setValue:function(l){t=""+l},stopTracking:function(){n._valueTracker=null,delete n[e]}}}}function ht(n){n._valueTracker||(n._valueTracker=Lu(n))}function Ho(n){if(!n)return!1;var e=n._valueTracker;if(!e)return!0;var s=e.getValue(),t="";return n&&(t=Wo(n)?n.checked?"true":"false":n.value),n=t,n!==s?(e.setValue(n),!0):!1}function Bt(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function dr(n,e){var s=e.checked;return W({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:s??n._wrapperState.initialChecked})}function ci(n,e){var s=e.defaultValue==null?"":e.defaultValue,t=e.checked!=null?e.checked:e.defaultChecked;s=ve(e.value!=null?e.value:s),n._wrapperState={initialChecked:t,initialValue:s,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function $o(n,e){e=e.checked,e!=null&&ol(n,"checked",e,!1)}function fr(n,e){$o(n,e);var s=ve(e.value),t=e.type;if(s!=null)t==="number"?(s===0&&n.value===""||n.value!=s)&&(n.value=""+s):n.value!==""+s&&(n.value=""+s);else if(t==="submit"||t==="reset"){n.removeAttribute("value");return}e.hasOwnProperty("value")?hr(n,e.type,s):e.hasOwnProperty("defaultValue")&&hr(n,e.type,ve(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(n.defaultChecked=!!e.defaultChecked)}function pi(n,e,s){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var t=e.type;if(!(t!=="submit"&&t!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+n._wrapperState.initialValue,s||e===n.value||(n.value=e),n.defaultValue=e}s=n.name,s!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,s!==""&&(n.name=s)}function hr(n,e,s){(e!=="number"||Bt(n.ownerDocument)!==n)&&(s==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+s&&(n.defaultValue=""+s))}var bs=Array.isArray;function Ze(n,e,s,t){if(n=n.options,e){e={};for(var a=0;a<s.length;a++)e["$"+s[a]]=!0;for(s=0;s<n.length;s++)a=e.hasOwnProperty("$"+n[s].value),n[s].selected!==a&&(n[s].selected=a),a&&t&&(n[s].defaultSelected=!0)}else{for(s=""+ve(s),e=null,a=0;a<n.length;a++){if(n[a].value===s){n[a].selected=!0,t&&(n[a].defaultSelected=!0);return}e!==null||n[a].disabled||(e=n[a])}e!==null&&(e.selected=!0)}}function mr(n,e){if(e.dangerouslySetInnerHTML!=null)throw Error(k(91));return W({},e,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function ui(n,e){var s=e.value;if(s==null){if(s=e.children,e=e.defaultValue,s!=null){if(e!=null)throw Error(k(92));if(bs(s)){if(1<s.length)throw Error(k(93));s=s[0]}e=s}e==null&&(e=""),s=e}n._wrapperState={initialValue:ve(s)}}function Vo(n,e){var s=ve(e.value),t=ve(e.defaultValue);s!=null&&(s=""+s,s!==n.value&&(n.value=s),e.defaultValue==null&&n.defaultValue!==s&&(n.defaultValue=s)),t!=null&&(n.defaultValue=""+t)}function di(n){var e=n.textContent;e===n._wrapperState.initialValue&&e!==""&&e!==null&&(n.value=e)}function Qo(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function vr(n,e){return n==null||n==="http://www.w3.org/1999/xhtml"?Qo(e):n==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var mt,qo=function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,s,t,a){MSApp.execUnsafeLocalFunction(function(){return n(e,s,t,a)})}:n}(function(n,e){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=e;else{for(mt=mt||document.createElement("div"),mt.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=mt.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;e.firstChild;)n.appendChild(e.firstChild)}});function Bs(n,e){if(e){var s=n.firstChild;if(s&&s===n.lastChild&&s.nodeType===3){s.nodeValue=e;return}}n.textContent=e}var Ns={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ou=["Webkit","ms","Moz","O"];Object.keys(Ns).forEach(function(n){Ou.forEach(function(e){e=e+n.charAt(0).toUpperCase()+n.substring(1),Ns[e]=Ns[n]})});function Ko(n,e,s){return e==null||typeof e=="boolean"||e===""?"":s||typeof e!="number"||e===0||Ns.hasOwnProperty(n)&&Ns[n]?(""+e).trim():e+"px"}function Go(n,e){n=n.style;for(var s in e)if(e.hasOwnProperty(s)){var t=s.indexOf("--")===0,a=Ko(s,e[s],t);s==="float"&&(s="cssFloat"),t?n.setProperty(s,a):n[s]=a}}var Nu=W({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function yr(n,e){if(e){if(Nu[n]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(k(137,n));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(k(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(k(61))}if(e.style!=null&&typeof e.style!="object")throw Error(k(62))}}function gr(n,e){if(n.indexOf("-")===-1)return typeof e.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var wr=null;function dl(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var kr=null,ns=null,es=null;function fi(n){if(n=ot(n)){if(typeof kr!="function")throw Error(k(280));var e=n.stateNode;e&&(e=ya(e),kr(n.stateNode,n.type,e))}}function Yo(n){ns?es?es.push(n):es=[n]:ns=n}function Xo(){if(ns){var n=ns,e=es;if(es=ns=null,fi(n),e)for(n=0;n<e.length;n++)fi(e[n])}}function Jo(n,e){return n(e)}function Zo(){}var Ma=!1;function nc(n,e,s){if(Ma)return n(e,s);Ma=!0;try{return Jo(n,e,s)}finally{Ma=!1,(ns!==null||es!==null)&&(Zo(),Xo())}}function Ws(n,e){var s=n.stateNode;if(s===null)return null;var t=ya(s);if(t===null)return null;s=t[e];n:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(t=!t.disabled)||(n=n.type,t=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!t;break n;default:n=!1}if(n)return null;if(s&&typeof s!="function")throw Error(k(231,e,typeof s));return s}var xr=!1;if(qn)try{var ks={};Object.defineProperty(ks,"passive",{get:function(){xr=!0}}),window.addEventListener("test",ks,ks),window.removeEventListener("test",ks,ks)}catch{xr=!1}function zu(n,e,s,t,a,r,l,i,o){var c=Array.prototype.slice.call(arguments,3);try{e.apply(s,c)}catch(m){this.onError(m)}}var zs=!1,Wt=null,Ht=!1,Sr=null,Ru={onError:function(n){zs=!0,Wt=n}};function Iu(n,e,s,t,a,r,l,i,o){zs=!1,Wt=null,zu.apply(Ru,arguments)}function ju(n,e,s,t,a,r,l,i,o){if(Iu.apply(this,arguments),zs){if(zs){var c=Wt;zs=!1,Wt=null}else throw Error(k(198));Ht||(Ht=!0,Sr=c)}}function Ae(n){var e=n,s=n;if(n.alternate)for(;e.return;)e=e.return;else{n=e;do e=n,e.flags&4098&&(s=e.return),n=e.return;while(n)}return e.tag===3?s:null}function ec(n){if(n.tag===13){var e=n.memoizedState;if(e===null&&(n=n.alternate,n!==null&&(e=n.memoizedState)),e!==null)return e.dehydrated}return null}function hi(n){if(Ae(n)!==n)throw Error(k(188))}function Mu(n){var e=n.alternate;if(!e){if(e=Ae(n),e===null)throw Error(k(188));return e!==n?null:n}for(var s=n,t=e;;){var a=s.return;if(a===null)break;var r=a.alternate;if(r===null){if(t=a.return,t!==null){s=t;continue}break}if(a.child===r.child){for(r=a.child;r;){if(r===s)return hi(a),n;if(r===t)return hi(a),e;r=r.sibling}throw Error(k(188))}if(s.return!==t.return)s=a,t=r;else{for(var l=!1,i=a.child;i;){if(i===s){l=!0,s=a,t=r;break}if(i===t){l=!0,t=a,s=r;break}i=i.sibling}if(!l){for(i=r.child;i;){if(i===s){l=!0,s=r,t=a;break}if(i===t){l=!0,t=r,s=a;break}i=i.sibling}if(!l)throw Error(k(189))}}if(s.alternate!==t)throw Error(k(190))}if(s.tag!==3)throw Error(k(188));return s.stateNode.current===s?n:e}function sc(n){return n=Mu(n),n!==null?tc(n):null}function tc(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var e=tc(n);if(e!==null)return e;n=n.sibling}return null}var ac=kn.unstable_scheduleCallback,mi=kn.unstable_cancelCallback,Du=kn.unstable_shouldYield,Fu=kn.unstable_requestPaint,Q=kn.unstable_now,Au=kn.unstable_getCurrentPriorityLevel,fl=kn.unstable_ImmediatePriority,rc=kn.unstable_UserBlockingPriority,$t=kn.unstable_NormalPriority,Uu=kn.unstable_LowPriority,lc=kn.unstable_IdlePriority,fa=null,Un=null;function Bu(n){if(Un&&typeof Un.onCommitFiberRoot=="function")try{Un.onCommitFiberRoot(fa,n,void 0,(n.current.flags&128)===128)}catch{}}var In=Math.clz32?Math.clz32:$u,Wu=Math.log,Hu=Math.LN2;function $u(n){return n>>>=0,n===0?32:31-(Wu(n)/Hu|0)|0}var vt=64,yt=4194304;function Ls(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function Vt(n,e){var s=n.pendingLanes;if(s===0)return 0;var t=0,a=n.suspendedLanes,r=n.pingedLanes,l=s&268435455;if(l!==0){var i=l&~a;i!==0?t=Ls(i):(r&=l,r!==0&&(t=Ls(r)))}else l=s&~a,l!==0?t=Ls(l):r!==0&&(t=Ls(r));if(t===0)return 0;if(e!==0&&e!==t&&!(e&a)&&(a=t&-t,r=e&-e,a>=r||a===16&&(r&4194240)!==0))return e;if(t&4&&(t|=s&16),e=n.entangledLanes,e!==0)for(n=n.entanglements,e&=t;0<e;)s=31-In(e),a=1<<s,t|=n[s],e&=~a;return t}function Vu(n,e){switch(n){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Qu(n,e){for(var s=n.suspendedLanes,t=n.pingedLanes,a=n.expirationTimes,r=n.pendingLanes;0<r;){var l=31-In(r),i=1<<l,o=a[l];o===-1?(!(i&s)||i&t)&&(a[l]=Vu(i,e)):o<=e&&(n.expiredLanes|=i),r&=~i}}function Cr(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function ic(){var n=vt;return vt<<=1,!(vt&4194240)&&(vt=64),n}function Da(n){for(var e=[],s=0;31>s;s++)e.push(n);return e}function lt(n,e,s){n.pendingLanes|=e,e!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,e=31-In(e),n[e]=s}function qu(n,e){var s=n.pendingLanes&~e;n.pendingLanes=e,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=e,n.mutableReadLanes&=e,n.entangledLanes&=e,e=n.entanglements;var t=n.eventTimes;for(n=n.expirationTimes;0<s;){var a=31-In(s),r=1<<a;e[a]=0,t[a]=-1,n[a]=-1,s&=~r}}function hl(n,e){var s=n.entangledLanes|=e;for(n=n.entanglements;s;){var t=31-In(s),a=1<<t;a&e|n[t]&e&&(n[t]|=e),s&=~a}}var j=0;function oc(n){return n&=-n,1<n?4<n?n&268435455?16:536870912:4:1}var cc,ml,pc,uc,dc,_r=!1,gt=[],ie=null,oe=null,ce=null,Hs=new Map,$s=new Map,se=[],Ku="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function vi(n,e){switch(n){case"focusin":case"focusout":ie=null;break;case"dragenter":case"dragleave":oe=null;break;case"mouseover":case"mouseout":ce=null;break;case"pointerover":case"pointerout":Hs.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":$s.delete(e.pointerId)}}function xs(n,e,s,t,a,r){return n===null||n.nativeEvent!==r?(n={blockedOn:e,domEventName:s,eventSystemFlags:t,nativeEvent:r,targetContainers:[a]},e!==null&&(e=ot(e),e!==null&&ml(e)),n):(n.eventSystemFlags|=t,e=n.targetContainers,a!==null&&e.indexOf(a)===-1&&e.push(a),n)}function Gu(n,e,s,t,a){switch(e){case"focusin":return ie=xs(ie,n,e,s,t,a),!0;case"dragenter":return oe=xs(oe,n,e,s,t,a),!0;case"mouseover":return ce=xs(ce,n,e,s,t,a),!0;case"pointerover":var r=a.pointerId;return Hs.set(r,xs(Hs.get(r)||null,n,e,s,t,a)),!0;case"gotpointercapture":return r=a.pointerId,$s.set(r,xs($s.get(r)||null,n,e,s,t,a)),!0}return!1}function fc(n){var e=be(n.target);if(e!==null){var s=Ae(e);if(s!==null){if(e=s.tag,e===13){if(e=ec(s),e!==null){n.blockedOn=e,dc(n.priority,function(){pc(s)});return}}else if(e===3&&s.stateNode.current.memoizedState.isDehydrated){n.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Nt(n){if(n.blockedOn!==null)return!1;for(var e=n.targetContainers;0<e.length;){var s=Er(n.domEventName,n.eventSystemFlags,e[0],n.nativeEvent);if(s===null){s=n.nativeEvent;var t=new s.constructor(s.type,s);wr=t,s.target.dispatchEvent(t),wr=null}else return e=ot(s),e!==null&&ml(e),n.blockedOn=s,!1;e.shift()}return!0}function yi(n,e,s){Nt(n)&&s.delete(e)}function Yu(){_r=!1,ie!==null&&Nt(ie)&&(ie=null),oe!==null&&Nt(oe)&&(oe=null),ce!==null&&Nt(ce)&&(ce=null),Hs.forEach(yi),$s.forEach(yi)}function Ss(n,e){n.blockedOn===e&&(n.blockedOn=null,_r||(_r=!0,kn.unstable_scheduleCallback(kn.unstable_NormalPriority,Yu)))}function Vs(n){function e(a){return Ss(a,n)}if(0<gt.length){Ss(gt[0],n);for(var s=1;s<gt.length;s++){var t=gt[s];t.blockedOn===n&&(t.blockedOn=null)}}for(ie!==null&&Ss(ie,n),oe!==null&&Ss(oe,n),ce!==null&&Ss(ce,n),Hs.forEach(e),$s.forEach(e),s=0;s<se.length;s++)t=se[s],t.blockedOn===n&&(t.blockedOn=null);for(;0<se.length&&(s=se[0],s.blockedOn===null);)fc(s),s.blockedOn===null&&se.shift()}var ss=Xn.ReactCurrentBatchConfig,Qt=!0;function Xu(n,e,s,t){var a=j,r=ss.transition;ss.transition=null;try{j=1,vl(n,e,s,t)}finally{j=a,ss.transition=r}}function Ju(n,e,s,t){var a=j,r=ss.transition;ss.transition=null;try{j=4,vl(n,e,s,t)}finally{j=a,ss.transition=r}}function vl(n,e,s,t){if(Qt){var a=Er(n,e,s,t);if(a===null)qa(n,e,t,qt,s),vi(n,t);else if(Gu(a,n,e,s,t))t.stopPropagation();else if(vi(n,t),e&4&&-1<Ku.indexOf(n)){for(;a!==null;){var r=ot(a);if(r!==null&&cc(r),r=Er(n,e,s,t),r===null&&qa(n,e,t,qt,s),r===a)break;a=r}a!==null&&t.stopPropagation()}else qa(n,e,t,null,s)}}var qt=null;function Er(n,e,s,t){if(qt=null,n=dl(t),n=be(n),n!==null)if(e=Ae(n),e===null)n=null;else if(s=e.tag,s===13){if(n=ec(e),n!==null)return n;n=null}else if(s===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;n=null}else e!==n&&(n=null);return qt=n,null}function hc(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Au()){case fl:return 1;case rc:return 4;case $t:case Uu:return 16;case lc:return 536870912;default:return 16}default:return 16}}var ae=null,yl=null,zt=null;function mc(){if(zt)return zt;var n,e=yl,s=e.length,t,a="value"in ae?ae.value:ae.textContent,r=a.length;for(n=0;n<s&&e[n]===a[n];n++);var l=s-n;for(t=1;t<=l&&e[s-t]===a[r-t];t++);return zt=a.slice(n,1<t?1-t:void 0)}function Rt(n){var e=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&e===13&&(n=13)):n=e,n===10&&(n=13),32<=n||n===13?n:0}function wt(){return!0}function gi(){return!1}function Sn(n){function e(s,t,a,r,l){this._reactName=s,this._targetInst=a,this.type=t,this.nativeEvent=r,this.target=l,this.currentTarget=null;for(var i in n)n.hasOwnProperty(i)&&(s=n[i],this[i]=s?s(r):r[i]);return this.isDefaultPrevented=(r.defaultPrevented!=null?r.defaultPrevented:r.returnValue===!1)?wt:gi,this.isPropagationStopped=gi,this}return W(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=wt)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=wt)},persist:function(){},isPersistent:wt}),e}var fs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},gl=Sn(fs),it=W({},fs,{view:0,detail:0}),Zu=Sn(it),Fa,Aa,Cs,ha=W({},it,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:wl,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==Cs&&(Cs&&n.type==="mousemove"?(Fa=n.screenX-Cs.screenX,Aa=n.screenY-Cs.screenY):Aa=Fa=0,Cs=n),Fa)},movementY:function(n){return"movementY"in n?n.movementY:Aa}}),wi=Sn(ha),nd=W({},ha,{dataTransfer:0}),ed=Sn(nd),sd=W({},it,{relatedTarget:0}),Ua=Sn(sd),td=W({},fs,{animationName:0,elapsedTime:0,pseudoElement:0}),ad=Sn(td),rd=W({},fs,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),ld=Sn(rd),id=W({},fs,{data:0}),ki=Sn(id),od={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},cd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},pd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ud(n){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(n):(n=pd[n])?!!e[n]:!1}function wl(){return ud}var dd=W({},it,{key:function(n){if(n.key){var e=od[n.key]||n.key;if(e!=="Unidentified")return e}return n.type==="keypress"?(n=Rt(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?cd[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:wl,charCode:function(n){return n.type==="keypress"?Rt(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Rt(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),fd=Sn(dd),hd=W({},ha,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),xi=Sn(hd),md=W({},it,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:wl}),vd=Sn(md),yd=W({},fs,{propertyName:0,elapsedTime:0,pseudoElement:0}),gd=Sn(yd),wd=W({},ha,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),kd=Sn(wd),xd=[9,13,27,32],kl=qn&&"CompositionEvent"in window,Rs=null;qn&&"documentMode"in document&&(Rs=document.documentMode);var Sd=qn&&"TextEvent"in window&&!Rs,vc=qn&&(!kl||Rs&&8<Rs&&11>=Rs),Si=" ",Ci=!1;function yc(n,e){switch(n){case"keyup":return xd.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function gc(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var He=!1;function Cd(n,e){switch(n){case"compositionend":return gc(e);case"keypress":return e.which!==32?null:(Ci=!0,Si);case"textInput":return n=e.data,n===Si&&Ci?null:n;default:return null}}function _d(n,e){if(He)return n==="compositionend"||!kl&&yc(n,e)?(n=mc(),zt=yl=ae=null,He=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return vc&&e.locale!=="ko"?null:e.data;default:return null}}var Ed={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function _i(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e==="input"?!!Ed[n.type]:e==="textarea"}function wc(n,e,s,t){Yo(t),e=Kt(e,"onChange"),0<e.length&&(s=new gl("onChange","change",null,s,t),n.push({event:s,listeners:e}))}var Is=null,Qs=null;function Td(n){Oc(n,0)}function ma(n){var e=Qe(n);if(Ho(e))return n}function Pd(n,e){if(n==="change")return e}var kc=!1;if(qn){var Ba;if(qn){var Wa="oninput"in document;if(!Wa){var Ei=document.createElement("div");Ei.setAttribute("oninput","return;"),Wa=typeof Ei.oninput=="function"}Ba=Wa}else Ba=!1;kc=Ba&&(!document.documentMode||9<document.documentMode)}function Ti(){Is&&(Is.detachEvent("onpropertychange",xc),Qs=Is=null)}function xc(n){if(n.propertyName==="value"&&ma(Qs)){var e=[];wc(e,Qs,n,dl(n)),nc(Td,e)}}function bd(n,e,s){n==="focusin"?(Ti(),Is=e,Qs=s,Is.attachEvent("onpropertychange",xc)):n==="focusout"&&Ti()}function Ld(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return ma(Qs)}function Od(n,e){if(n==="click")return ma(e)}function Nd(n,e){if(n==="input"||n==="change")return ma(e)}function zd(n,e){return n===e&&(n!==0||1/n===1/e)||n!==n&&e!==e}var Mn=typeof Object.is=="function"?Object.is:zd;function qs(n,e){if(Mn(n,e))return!0;if(typeof n!="object"||n===null||typeof e!="object"||e===null)return!1;var s=Object.keys(n),t=Object.keys(e);if(s.length!==t.length)return!1;for(t=0;t<s.length;t++){var a=s[t];if(!ir.call(e,a)||!Mn(n[a],e[a]))return!1}return!0}function Pi(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function bi(n,e){var s=Pi(n);n=0;for(var t;s;){if(s.nodeType===3){if(t=n+s.textContent.length,n<=e&&t>=e)return{node:s,offset:e-n};n=t}n:{for(;s;){if(s.nextSibling){s=s.nextSibling;break n}s=s.parentNode}s=void 0}s=Pi(s)}}function Sc(n,e){return n&&e?n===e?!0:n&&n.nodeType===3?!1:e&&e.nodeType===3?Sc(n,e.parentNode):"contains"in n?n.contains(e):n.compareDocumentPosition?!!(n.compareDocumentPosition(e)&16):!1:!1}function Cc(){for(var n=window,e=Bt();e instanceof n.HTMLIFrameElement;){try{var s=typeof e.contentWindow.location.href=="string"}catch{s=!1}if(s)n=e.contentWindow;else break;e=Bt(n.document)}return e}function xl(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e&&(e==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||e==="textarea"||n.contentEditable==="true")}function Rd(n){var e=Cc(),s=n.focusedElem,t=n.selectionRange;if(e!==s&&s&&s.ownerDocument&&Sc(s.ownerDocument.documentElement,s)){if(t!==null&&xl(s)){if(e=t.start,n=t.end,n===void 0&&(n=e),"selectionStart"in s)s.selectionStart=e,s.selectionEnd=Math.min(n,s.value.length);else if(n=(e=s.ownerDocument||document)&&e.defaultView||window,n.getSelection){n=n.getSelection();var a=s.textContent.length,r=Math.min(t.start,a);t=t.end===void 0?r:Math.min(t.end,a),!n.extend&&r>t&&(a=t,t=r,r=a),a=bi(s,r);var l=bi(s,t);a&&l&&(n.rangeCount!==1||n.anchorNode!==a.node||n.anchorOffset!==a.offset||n.focusNode!==l.node||n.focusOffset!==l.offset)&&(e=e.createRange(),e.setStart(a.node,a.offset),n.removeAllRanges(),r>t?(n.addRange(e),n.extend(l.node,l.offset)):(e.setEnd(l.node,l.offset),n.addRange(e)))}}for(e=[],n=s;n=n.parentNode;)n.nodeType===1&&e.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof s.focus=="function"&&s.focus(),s=0;s<e.length;s++)n=e[s],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var Id=qn&&"documentMode"in document&&11>=document.documentMode,$e=null,Tr=null,js=null,Pr=!1;function Li(n,e,s){var t=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;Pr||$e==null||$e!==Bt(t)||(t=$e,"selectionStart"in t&&xl(t)?t={start:t.selectionStart,end:t.selectionEnd}:(t=(t.ownerDocument&&t.ownerDocument.defaultView||window).getSelection(),t={anchorNode:t.anchorNode,anchorOffset:t.anchorOffset,focusNode:t.focusNode,focusOffset:t.focusOffset}),js&&qs(js,t)||(js=t,t=Kt(Tr,"onSelect"),0<t.length&&(e=new gl("onSelect","select",null,e,s),n.push({event:e,listeners:t}),e.target=$e)))}function kt(n,e){var s={};return s[n.toLowerCase()]=e.toLowerCase(),s["Webkit"+n]="webkit"+e,s["Moz"+n]="moz"+e,s}var Ve={animationend:kt("Animation","AnimationEnd"),animationiteration:kt("Animation","AnimationIteration"),animationstart:kt("Animation","AnimationStart"),transitionend:kt("Transition","TransitionEnd")},Ha={},_c={};qn&&(_c=document.createElement("div").style,"AnimationEvent"in window||(delete Ve.animationend.animation,delete Ve.animationiteration.animation,delete Ve.animationstart.animation),"TransitionEvent"in window||delete Ve.transitionend.transition);function va(n){if(Ha[n])return Ha[n];if(!Ve[n])return n;var e=Ve[n],s;for(s in e)if(e.hasOwnProperty(s)&&s in _c)return Ha[n]=e[s];return n}var Ec=va("animationend"),Tc=va("animationiteration"),Pc=va("animationstart"),bc=va("transitionend"),Lc=new Map,Oi="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ge(n,e){Lc.set(n,e),Fe(e,[n])}for(var $a=0;$a<Oi.length;$a++){var Va=Oi[$a],jd=Va.toLowerCase(),Md=Va[0].toUpperCase()+Va.slice(1);ge(jd,"on"+Md)}ge(Ec,"onAnimationEnd");ge(Tc,"onAnimationIteration");ge(Pc,"onAnimationStart");ge("dblclick","onDoubleClick");ge("focusin","onFocus");ge("focusout","onBlur");ge(bc,"onTransitionEnd");rs("onMouseEnter",["mouseout","mouseover"]);rs("onMouseLeave",["mouseout","mouseover"]);rs("onPointerEnter",["pointerout","pointerover"]);rs("onPointerLeave",["pointerout","pointerover"]);Fe("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Fe("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Fe("onBeforeInput",["compositionend","keypress","textInput","paste"]);Fe("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Fe("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Fe("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Os="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Dd=new Set("cancel close invalid load scroll toggle".split(" ").concat(Os));function Ni(n,e,s){var t=n.type||"unknown-event";n.currentTarget=s,ju(t,e,void 0,n),n.currentTarget=null}function Oc(n,e){e=(e&4)!==0;for(var s=0;s<n.length;s++){var t=n[s],a=t.event;t=t.listeners;n:{var r=void 0;if(e)for(var l=t.length-1;0<=l;l--){var i=t[l],o=i.instance,c=i.currentTarget;if(i=i.listener,o!==r&&a.isPropagationStopped())break n;Ni(a,i,c),r=o}else for(l=0;l<t.length;l++){if(i=t[l],o=i.instance,c=i.currentTarget,i=i.listener,o!==r&&a.isPropagationStopped())break n;Ni(a,i,c),r=o}}}if(Ht)throw n=Sr,Ht=!1,Sr=null,n}function D(n,e){var s=e[zr];s===void 0&&(s=e[zr]=new Set);var t=n+"__bubble";s.has(t)||(Nc(e,n,2,!1),s.add(t))}function Qa(n,e,s){var t=0;e&&(t|=4),Nc(s,n,t,e)}var xt="_reactListening"+Math.random().toString(36).slice(2);function Ks(n){if(!n[xt]){n[xt]=!0,Fo.forEach(function(s){s!=="selectionchange"&&(Dd.has(s)||Qa(s,!1,n),Qa(s,!0,n))});var e=n.nodeType===9?n:n.ownerDocument;e===null||e[xt]||(e[xt]=!0,Qa("selectionchange",!1,e))}}function Nc(n,e,s,t){switch(hc(e)){case 1:var a=Xu;break;case 4:a=Ju;break;default:a=vl}s=a.bind(null,e,s,n),a=void 0,!xr||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(a=!0),t?a!==void 0?n.addEventListener(e,s,{capture:!0,passive:a}):n.addEventListener(e,s,!0):a!==void 0?n.addEventListener(e,s,{passive:a}):n.addEventListener(e,s,!1)}function qa(n,e,s,t,a){var r=t;if(!(e&1)&&!(e&2)&&t!==null)n:for(;;){if(t===null)return;var l=t.tag;if(l===3||l===4){var i=t.stateNode.containerInfo;if(i===a||i.nodeType===8&&i.parentNode===a)break;if(l===4)for(l=t.return;l!==null;){var o=l.tag;if((o===3||o===4)&&(o=l.stateNode.containerInfo,o===a||o.nodeType===8&&o.parentNode===a))return;l=l.return}for(;i!==null;){if(l=be(i),l===null)return;if(o=l.tag,o===5||o===6){t=r=l;continue n}i=i.parentNode}}t=t.return}nc(function(){var c=r,m=dl(s),d=[];n:{var h=Lc.get(n);if(h!==void 0){var y=gl,w=n;switch(n){case"keypress":if(Rt(s)===0)break n;case"keydown":case"keyup":y=fd;break;case"focusin":w="focus",y=Ua;break;case"focusout":w="blur",y=Ua;break;case"beforeblur":case"afterblur":y=Ua;break;case"click":if(s.button===2)break n;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=wi;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=ed;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=vd;break;case Ec:case Tc:case Pc:y=ad;break;case bc:y=gd;break;case"scroll":y=Zu;break;case"wheel":y=kd;break;case"copy":case"cut":case"paste":y=ld;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=xi}var g=(e&4)!==0,C=!g&&n==="scroll",u=g?h!==null?h+"Capture":null:h;g=[];for(var p=c,f;p!==null;){f=p;var v=f.stateNode;if(f.tag===5&&v!==null&&(f=v,u!==null&&(v=Ws(p,u),v!=null&&g.push(Gs(p,v,f)))),C)break;p=p.return}0<g.length&&(h=new y(h,w,null,s,m),d.push({event:h,listeners:g}))}}if(!(e&7)){n:{if(h=n==="mouseover"||n==="pointerover",y=n==="mouseout"||n==="pointerout",h&&s!==wr&&(w=s.relatedTarget||s.fromElement)&&(be(w)||w[Kn]))break n;if((y||h)&&(h=m.window===m?m:(h=m.ownerDocument)?h.defaultView||h.parentWindow:window,y?(w=s.relatedTarget||s.toElement,y=c,w=w?be(w):null,w!==null&&(C=Ae(w),w!==C||w.tag!==5&&w.tag!==6)&&(w=null)):(y=null,w=c),y!==w)){if(g=wi,v="onMouseLeave",u="onMouseEnter",p="mouse",(n==="pointerout"||n==="pointerover")&&(g=xi,v="onPointerLeave",u="onPointerEnter",p="pointer"),C=y==null?h:Qe(y),f=w==null?h:Qe(w),h=new g(v,p+"leave",y,s,m),h.target=C,h.relatedTarget=f,v=null,be(m)===c&&(g=new g(u,p+"enter",w,s,m),g.target=f,g.relatedTarget=C,v=g),C=v,y&&w)e:{for(g=y,u=w,p=0,f=g;f;f=Ue(f))p++;for(f=0,v=u;v;v=Ue(v))f++;for(;0<p-f;)g=Ue(g),p--;for(;0<f-p;)u=Ue(u),f--;for(;p--;){if(g===u||u!==null&&g===u.alternate)break e;g=Ue(g),u=Ue(u)}g=null}else g=null;y!==null&&zi(d,h,y,g,!1),w!==null&&C!==null&&zi(d,C,w,g,!0)}}n:{if(h=c?Qe(c):window,y=h.nodeName&&h.nodeName.toLowerCase(),y==="select"||y==="input"&&h.type==="file")var S=Pd;else if(_i(h))if(kc)S=Nd;else{S=Ld;var T=bd}else(y=h.nodeName)&&y.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(S=Od);if(S&&(S=S(n,c))){wc(d,S,s,m);break n}T&&T(n,h,c),n==="focusout"&&(T=h._wrapperState)&&T.controlled&&h.type==="number"&&hr(h,"number",h.value)}switch(T=c?Qe(c):window,n){case"focusin":(_i(T)||T.contentEditable==="true")&&($e=T,Tr=c,js=null);break;case"focusout":js=Tr=$e=null;break;case"mousedown":Pr=!0;break;case"contextmenu":case"mouseup":case"dragend":Pr=!1,Li(d,s,m);break;case"selectionchange":if(Id)break;case"keydown":case"keyup":Li(d,s,m)}var P;if(kl)n:{switch(n){case"compositionstart":var b="onCompositionStart";break n;case"compositionend":b="onCompositionEnd";break n;case"compositionupdate":b="onCompositionUpdate";break n}b=void 0}else He?yc(n,s)&&(b="onCompositionEnd"):n==="keydown"&&s.keyCode===229&&(b="onCompositionStart");b&&(vc&&s.locale!=="ko"&&(He||b!=="onCompositionStart"?b==="onCompositionEnd"&&He&&(P=mc()):(ae=m,yl="value"in ae?ae.value:ae.textContent,He=!0)),T=Kt(c,b),0<T.length&&(b=new ki(b,n,null,s,m),d.push({event:b,listeners:T}),P?b.data=P:(P=gc(s),P!==null&&(b.data=P)))),(P=Sd?Cd(n,s):_d(n,s))&&(c=Kt(c,"onBeforeInput"),0<c.length&&(m=new ki("onBeforeInput","beforeinput",null,s,m),d.push({event:m,listeners:c}),m.data=P))}Oc(d,e)})}function Gs(n,e,s){return{instance:n,listener:e,currentTarget:s}}function Kt(n,e){for(var s=e+"Capture",t=[];n!==null;){var a=n,r=a.stateNode;a.tag===5&&r!==null&&(a=r,r=Ws(n,s),r!=null&&t.unshift(Gs(n,r,a)),r=Ws(n,e),r!=null&&t.push(Gs(n,r,a))),n=n.return}return t}function Ue(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function zi(n,e,s,t,a){for(var r=e._reactName,l=[];s!==null&&s!==t;){var i=s,o=i.alternate,c=i.stateNode;if(o!==null&&o===t)break;i.tag===5&&c!==null&&(i=c,a?(o=Ws(s,r),o!=null&&l.unshift(Gs(s,o,i))):a||(o=Ws(s,r),o!=null&&l.push(Gs(s,o,i)))),s=s.return}l.length!==0&&n.push({event:e,listeners:l})}var Fd=/\r\n?/g,Ad=/\u0000|\uFFFD/g;function Ri(n){return(typeof n=="string"?n:""+n).replace(Fd,`
`).replace(Ad,"")}function St(n,e,s){if(e=Ri(e),Ri(n)!==e&&s)throw Error(k(425))}function Gt(){}var br=null,Lr=null;function Or(n,e){return n==="textarea"||n==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Nr=typeof setTimeout=="function"?setTimeout:void 0,Ud=typeof clearTimeout=="function"?clearTimeout:void 0,Ii=typeof Promise=="function"?Promise:void 0,Bd=typeof queueMicrotask=="function"?queueMicrotask:typeof Ii<"u"?function(n){return Ii.resolve(null).then(n).catch(Wd)}:Nr;function Wd(n){setTimeout(function(){throw n})}function Ka(n,e){var s=e,t=0;do{var a=s.nextSibling;if(n.removeChild(s),a&&a.nodeType===8)if(s=a.data,s==="/$"){if(t===0){n.removeChild(a),Vs(e);return}t--}else s!=="$"&&s!=="$?"&&s!=="$!"||t++;s=a}while(s);Vs(e)}function pe(n){for(;n!=null;n=n.nextSibling){var e=n.nodeType;if(e===1||e===3)break;if(e===8){if(e=n.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return n}function ji(n){n=n.previousSibling;for(var e=0;n;){if(n.nodeType===8){var s=n.data;if(s==="$"||s==="$!"||s==="$?"){if(e===0)return n;e--}else s==="/$"&&e++}n=n.previousSibling}return null}var hs=Math.random().toString(36).slice(2),An="__reactFiber$"+hs,Ys="__reactProps$"+hs,Kn="__reactContainer$"+hs,zr="__reactEvents$"+hs,Hd="__reactListeners$"+hs,$d="__reactHandles$"+hs;function be(n){var e=n[An];if(e)return e;for(var s=n.parentNode;s;){if(e=s[Kn]||s[An]){if(s=e.alternate,e.child!==null||s!==null&&s.child!==null)for(n=ji(n);n!==null;){if(s=n[An])return s;n=ji(n)}return e}n=s,s=n.parentNode}return null}function ot(n){return n=n[An]||n[Kn],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function Qe(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(k(33))}function ya(n){return n[Ys]||null}var Rr=[],qe=-1;function we(n){return{current:n}}function F(n){0>qe||(n.current=Rr[qe],Rr[qe]=null,qe--)}function M(n,e){qe++,Rr[qe]=n.current,n.current=e}var ye={},ln=we(ye),hn=we(!1),Re=ye;function ls(n,e){var s=n.type.contextTypes;if(!s)return ye;var t=n.stateNode;if(t&&t.__reactInternalMemoizedUnmaskedChildContext===e)return t.__reactInternalMemoizedMaskedChildContext;var a={},r;for(r in s)a[r]=e[r];return t&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=e,n.__reactInternalMemoizedMaskedChildContext=a),a}function mn(n){return n=n.childContextTypes,n!=null}function Yt(){F(hn),F(ln)}function Mi(n,e,s){if(ln.current!==ye)throw Error(k(168));M(ln,e),M(hn,s)}function zc(n,e,s){var t=n.stateNode;if(e=e.childContextTypes,typeof t.getChildContext!="function")return s;t=t.getChildContext();for(var a in t)if(!(a in e))throw Error(k(108,bu(n)||"Unknown",a));return W({},s,t)}function Xt(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||ye,Re=ln.current,M(ln,n),M(hn,hn.current),!0}function Di(n,e,s){var t=n.stateNode;if(!t)throw Error(k(169));s?(n=zc(n,e,Re),t.__reactInternalMemoizedMergedChildContext=n,F(hn),F(ln),M(ln,n)):F(hn),M(hn,s)}var Hn=null,ga=!1,Ga=!1;function Rc(n){Hn===null?Hn=[n]:Hn.push(n)}function Vd(n){ga=!0,Rc(n)}function ke(){if(!Ga&&Hn!==null){Ga=!0;var n=0,e=j;try{var s=Hn;for(j=1;n<s.length;n++){var t=s[n];do t=t(!0);while(t!==null)}Hn=null,ga=!1}catch(a){throw Hn!==null&&(Hn=Hn.slice(n+1)),ac(fl,ke),a}finally{j=e,Ga=!1}}return null}var Ke=[],Ge=0,Jt=null,Zt=0,Cn=[],_n=0,Ie=null,$n=1,Vn="";function Ee(n,e){Ke[Ge++]=Zt,Ke[Ge++]=Jt,Jt=n,Zt=e}function Ic(n,e,s){Cn[_n++]=$n,Cn[_n++]=Vn,Cn[_n++]=Ie,Ie=n;var t=$n;n=Vn;var a=32-In(t)-1;t&=~(1<<a),s+=1;var r=32-In(e)+a;if(30<r){var l=a-a%5;r=(t&(1<<l)-1).toString(32),t>>=l,a-=l,$n=1<<32-In(e)+a|s<<a|t,Vn=r+n}else $n=1<<r|s<<a|t,Vn=n}function Sl(n){n.return!==null&&(Ee(n,1),Ic(n,1,0))}function Cl(n){for(;n===Jt;)Jt=Ke[--Ge],Ke[Ge]=null,Zt=Ke[--Ge],Ke[Ge]=null;for(;n===Ie;)Ie=Cn[--_n],Cn[_n]=null,Vn=Cn[--_n],Cn[_n]=null,$n=Cn[--_n],Cn[_n]=null}var wn=null,gn=null,A=!1,Rn=null;function jc(n,e){var s=En(5,null,null,0);s.elementType="DELETED",s.stateNode=e,s.return=n,e=n.deletions,e===null?(n.deletions=[s],n.flags|=16):e.push(s)}function Fi(n,e){switch(n.tag){case 5:var s=n.type;return e=e.nodeType!==1||s.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(n.stateNode=e,wn=n,gn=pe(e.firstChild),!0):!1;case 6:return e=n.pendingProps===""||e.nodeType!==3?null:e,e!==null?(n.stateNode=e,wn=n,gn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(s=Ie!==null?{id:$n,overflow:Vn}:null,n.memoizedState={dehydrated:e,treeContext:s,retryLane:1073741824},s=En(18,null,null,0),s.stateNode=e,s.return=n,n.child=s,wn=n,gn=null,!0):!1;default:return!1}}function Ir(n){return(n.mode&1)!==0&&(n.flags&128)===0}function jr(n){if(A){var e=gn;if(e){var s=e;if(!Fi(n,e)){if(Ir(n))throw Error(k(418));e=pe(s.nextSibling);var t=wn;e&&Fi(n,e)?jc(t,s):(n.flags=n.flags&-4097|2,A=!1,wn=n)}}else{if(Ir(n))throw Error(k(418));n.flags=n.flags&-4097|2,A=!1,wn=n}}}function Ai(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;wn=n}function Ct(n){if(n!==wn)return!1;if(!A)return Ai(n),A=!0,!1;var e;if((e=n.tag!==3)&&!(e=n.tag!==5)&&(e=n.type,e=e!=="head"&&e!=="body"&&!Or(n.type,n.memoizedProps)),e&&(e=gn)){if(Ir(n))throw Mc(),Error(k(418));for(;e;)jc(n,e),e=pe(e.nextSibling)}if(Ai(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(k(317));n:{for(n=n.nextSibling,e=0;n;){if(n.nodeType===8){var s=n.data;if(s==="/$"){if(e===0){gn=pe(n.nextSibling);break n}e--}else s!=="$"&&s!=="$!"&&s!=="$?"||e++}n=n.nextSibling}gn=null}}else gn=wn?pe(n.stateNode.nextSibling):null;return!0}function Mc(){for(var n=gn;n;)n=pe(n.nextSibling)}function is(){gn=wn=null,A=!1}function _l(n){Rn===null?Rn=[n]:Rn.push(n)}var Qd=Xn.ReactCurrentBatchConfig;function _s(n,e,s){if(n=s.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(s._owner){if(s=s._owner,s){if(s.tag!==1)throw Error(k(309));var t=s.stateNode}if(!t)throw Error(k(147,n));var a=t,r=""+n;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===r?e.ref:(e=function(l){var i=a.refs;l===null?delete i[r]:i[r]=l},e._stringRef=r,e)}if(typeof n!="string")throw Error(k(284));if(!s._owner)throw Error(k(290,n))}return n}function _t(n,e){throw n=Object.prototype.toString.call(e),Error(k(31,n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n))}function Ui(n){var e=n._init;return e(n._payload)}function Dc(n){function e(u,p){if(n){var f=u.deletions;f===null?(u.deletions=[p],u.flags|=16):f.push(p)}}function s(u,p){if(!n)return null;for(;p!==null;)e(u,p),p=p.sibling;return null}function t(u,p){for(u=new Map;p!==null;)p.key!==null?u.set(p.key,p):u.set(p.index,p),p=p.sibling;return u}function a(u,p){return u=he(u,p),u.index=0,u.sibling=null,u}function r(u,p,f){return u.index=f,n?(f=u.alternate,f!==null?(f=f.index,f<p?(u.flags|=2,p):f):(u.flags|=2,p)):(u.flags|=1048576,p)}function l(u){return n&&u.alternate===null&&(u.flags|=2),u}function i(u,p,f,v){return p===null||p.tag!==6?(p=sr(f,u.mode,v),p.return=u,p):(p=a(p,f),p.return=u,p)}function o(u,p,f,v){var S=f.type;return S===We?m(u,p,f.props.children,v,f.key):p!==null&&(p.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===ne&&Ui(S)===p.type)?(v=a(p,f.props),v.ref=_s(u,p,f),v.return=u,v):(v=Ut(f.type,f.key,f.props,null,u.mode,v),v.ref=_s(u,p,f),v.return=u,v)}function c(u,p,f,v){return p===null||p.tag!==4||p.stateNode.containerInfo!==f.containerInfo||p.stateNode.implementation!==f.implementation?(p=tr(f,u.mode,v),p.return=u,p):(p=a(p,f.children||[]),p.return=u,p)}function m(u,p,f,v,S){return p===null||p.tag!==7?(p=ze(f,u.mode,v,S),p.return=u,p):(p=a(p,f),p.return=u,p)}function d(u,p,f){if(typeof p=="string"&&p!==""||typeof p=="number")return p=sr(""+p,u.mode,f),p.return=u,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case ft:return f=Ut(p.type,p.key,p.props,null,u.mode,f),f.ref=_s(u,null,p),f.return=u,f;case Be:return p=tr(p,u.mode,f),p.return=u,p;case ne:var v=p._init;return d(u,v(p._payload),f)}if(bs(p)||ws(p))return p=ze(p,u.mode,f,null),p.return=u,p;_t(u,p)}return null}function h(u,p,f,v){var S=p!==null?p.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return S!==null?null:i(u,p,""+f,v);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case ft:return f.key===S?o(u,p,f,v):null;case Be:return f.key===S?c(u,p,f,v):null;case ne:return S=f._init,h(u,p,S(f._payload),v)}if(bs(f)||ws(f))return S!==null?null:m(u,p,f,v,null);_t(u,f)}return null}function y(u,p,f,v,S){if(typeof v=="string"&&v!==""||typeof v=="number")return u=u.get(f)||null,i(p,u,""+v,S);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case ft:return u=u.get(v.key===null?f:v.key)||null,o(p,u,v,S);case Be:return u=u.get(v.key===null?f:v.key)||null,c(p,u,v,S);case ne:var T=v._init;return y(u,p,f,T(v._payload),S)}if(bs(v)||ws(v))return u=u.get(f)||null,m(p,u,v,S,null);_t(p,v)}return null}function w(u,p,f,v){for(var S=null,T=null,P=p,b=p=0,$=null;P!==null&&b<f.length;b++){P.index>b?($=P,P=null):$=P.sibling;var R=h(u,P,f[b],v);if(R===null){P===null&&(P=$);break}n&&P&&R.alternate===null&&e(u,P),p=r(R,p,b),T===null?S=R:T.sibling=R,T=R,P=$}if(b===f.length)return s(u,P),A&&Ee(u,b),S;if(P===null){for(;b<f.length;b++)P=d(u,f[b],v),P!==null&&(p=r(P,p,b),T===null?S=P:T.sibling=P,T=P);return A&&Ee(u,b),S}for(P=t(u,P);b<f.length;b++)$=y(P,u,b,f[b],v),$!==null&&(n&&$.alternate!==null&&P.delete($.key===null?b:$.key),p=r($,p,b),T===null?S=$:T.sibling=$,T=$);return n&&P.forEach(function(Ln){return e(u,Ln)}),A&&Ee(u,b),S}function g(u,p,f,v){var S=ws(f);if(typeof S!="function")throw Error(k(150));if(f=S.call(f),f==null)throw Error(k(151));for(var T=S=null,P=p,b=p=0,$=null,R=f.next();P!==null&&!R.done;b++,R=f.next()){P.index>b?($=P,P=null):$=P.sibling;var Ln=h(u,P,R.value,v);if(Ln===null){P===null&&(P=$);break}n&&P&&Ln.alternate===null&&e(u,P),p=r(Ln,p,b),T===null?S=Ln:T.sibling=Ln,T=Ln,P=$}if(R.done)return s(u,P),A&&Ee(u,b),S;if(P===null){for(;!R.done;b++,R=f.next())R=d(u,R.value,v),R!==null&&(p=r(R,p,b),T===null?S=R:T.sibling=R,T=R);return A&&Ee(u,b),S}for(P=t(u,P);!R.done;b++,R=f.next())R=y(P,u,b,R.value,v),R!==null&&(n&&R.alternate!==null&&P.delete(R.key===null?b:R.key),p=r(R,p,b),T===null?S=R:T.sibling=R,T=R);return n&&P.forEach(function(ys){return e(u,ys)}),A&&Ee(u,b),S}function C(u,p,f,v){if(typeof f=="object"&&f!==null&&f.type===We&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case ft:n:{for(var S=f.key,T=p;T!==null;){if(T.key===S){if(S=f.type,S===We){if(T.tag===7){s(u,T.sibling),p=a(T,f.props.children),p.return=u,u=p;break n}}else if(T.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===ne&&Ui(S)===T.type){s(u,T.sibling),p=a(T,f.props),p.ref=_s(u,T,f),p.return=u,u=p;break n}s(u,T);break}else e(u,T);T=T.sibling}f.type===We?(p=ze(f.props.children,u.mode,v,f.key),p.return=u,u=p):(v=Ut(f.type,f.key,f.props,null,u.mode,v),v.ref=_s(u,p,f),v.return=u,u=v)}return l(u);case Be:n:{for(T=f.key;p!==null;){if(p.key===T)if(p.tag===4&&p.stateNode.containerInfo===f.containerInfo&&p.stateNode.implementation===f.implementation){s(u,p.sibling),p=a(p,f.children||[]),p.return=u,u=p;break n}else{s(u,p);break}else e(u,p);p=p.sibling}p=tr(f,u.mode,v),p.return=u,u=p}return l(u);case ne:return T=f._init,C(u,p,T(f._payload),v)}if(bs(f))return w(u,p,f,v);if(ws(f))return g(u,p,f,v);_t(u,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,p!==null&&p.tag===6?(s(u,p.sibling),p=a(p,f),p.return=u,u=p):(s(u,p),p=sr(f,u.mode,v),p.return=u,u=p),l(u)):s(u,p)}return C}var os=Dc(!0),Fc=Dc(!1),na=we(null),ea=null,Ye=null,El=null;function Tl(){El=Ye=ea=null}function Pl(n){var e=na.current;F(na),n._currentValue=e}function Mr(n,e,s){for(;n!==null;){var t=n.alternate;if((n.childLanes&e)!==e?(n.childLanes|=e,t!==null&&(t.childLanes|=e)):t!==null&&(t.childLanes&e)!==e&&(t.childLanes|=e),n===s)break;n=n.return}}function ts(n,e){ea=n,El=Ye=null,n=n.dependencies,n!==null&&n.firstContext!==null&&(n.lanes&e&&(fn=!0),n.firstContext=null)}function Pn(n){var e=n._currentValue;if(El!==n)if(n={context:n,memoizedValue:e,next:null},Ye===null){if(ea===null)throw Error(k(308));Ye=n,ea.dependencies={lanes:0,firstContext:n}}else Ye=Ye.next=n;return e}var Le=null;function bl(n){Le===null?Le=[n]:Le.push(n)}function Ac(n,e,s,t){var a=e.interleaved;return a===null?(s.next=s,bl(e)):(s.next=a.next,a.next=s),e.interleaved=s,Gn(n,t)}function Gn(n,e){n.lanes|=e;var s=n.alternate;for(s!==null&&(s.lanes|=e),s=n,n=n.return;n!==null;)n.childLanes|=e,s=n.alternate,s!==null&&(s.childLanes|=e),s=n,n=n.return;return s.tag===3?s.stateNode:null}var ee=!1;function Ll(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Uc(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Qn(n,e){return{eventTime:n,lane:e,tag:0,payload:null,callback:null,next:null}}function ue(n,e,s){var t=n.updateQueue;if(t===null)return null;if(t=t.shared,I&2){var a=t.pending;return a===null?e.next=e:(e.next=a.next,a.next=e),t.pending=e,Gn(n,s)}return a=t.interleaved,a===null?(e.next=e,bl(t)):(e.next=a.next,a.next=e),t.interleaved=e,Gn(n,s)}function It(n,e,s){if(e=e.updateQueue,e!==null&&(e=e.shared,(s&4194240)!==0)){var t=e.lanes;t&=n.pendingLanes,s|=t,e.lanes=s,hl(n,s)}}function Bi(n,e){var s=n.updateQueue,t=n.alternate;if(t!==null&&(t=t.updateQueue,s===t)){var a=null,r=null;if(s=s.firstBaseUpdate,s!==null){do{var l={eventTime:s.eventTime,lane:s.lane,tag:s.tag,payload:s.payload,callback:s.callback,next:null};r===null?a=r=l:r=r.next=l,s=s.next}while(s!==null);r===null?a=r=e:r=r.next=e}else a=r=e;s={baseState:t.baseState,firstBaseUpdate:a,lastBaseUpdate:r,shared:t.shared,effects:t.effects},n.updateQueue=s;return}n=s.lastBaseUpdate,n===null?s.firstBaseUpdate=e:n.next=e,s.lastBaseUpdate=e}function sa(n,e,s,t){var a=n.updateQueue;ee=!1;var r=a.firstBaseUpdate,l=a.lastBaseUpdate,i=a.shared.pending;if(i!==null){a.shared.pending=null;var o=i,c=o.next;o.next=null,l===null?r=c:l.next=c,l=o;var m=n.alternate;m!==null&&(m=m.updateQueue,i=m.lastBaseUpdate,i!==l&&(i===null?m.firstBaseUpdate=c:i.next=c,m.lastBaseUpdate=o))}if(r!==null){var d=a.baseState;l=0,m=c=o=null,i=r;do{var h=i.lane,y=i.eventTime;if((t&h)===h){m!==null&&(m=m.next={eventTime:y,lane:0,tag:i.tag,payload:i.payload,callback:i.callback,next:null});n:{var w=n,g=i;switch(h=e,y=s,g.tag){case 1:if(w=g.payload,typeof w=="function"){d=w.call(y,d,h);break n}d=w;break n;case 3:w.flags=w.flags&-65537|128;case 0:if(w=g.payload,h=typeof w=="function"?w.call(y,d,h):w,h==null)break n;d=W({},d,h);break n;case 2:ee=!0}}i.callback!==null&&i.lane!==0&&(n.flags|=64,h=a.effects,h===null?a.effects=[i]:h.push(i))}else y={eventTime:y,lane:h,tag:i.tag,payload:i.payload,callback:i.callback,next:null},m===null?(c=m=y,o=d):m=m.next=y,l|=h;if(i=i.next,i===null){if(i=a.shared.pending,i===null)break;h=i,i=h.next,h.next=null,a.lastBaseUpdate=h,a.shared.pending=null}}while(!0);if(m===null&&(o=d),a.baseState=o,a.firstBaseUpdate=c,a.lastBaseUpdate=m,e=a.shared.interleaved,e!==null){a=e;do l|=a.lane,a=a.next;while(a!==e)}else r===null&&(a.shared.lanes=0);Me|=l,n.lanes=l,n.memoizedState=d}}function Wi(n,e,s){if(n=e.effects,e.effects=null,n!==null)for(e=0;e<n.length;e++){var t=n[e],a=t.callback;if(a!==null){if(t.callback=null,t=s,typeof a!="function")throw Error(k(191,a));a.call(t)}}}var ct={},Bn=we(ct),Xs=we(ct),Js=we(ct);function Oe(n){if(n===ct)throw Error(k(174));return n}function Ol(n,e){switch(M(Js,e),M(Xs,n),M(Bn,ct),n=e.nodeType,n){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:vr(null,"");break;default:n=n===8?e.parentNode:e,e=n.namespaceURI||null,n=n.tagName,e=vr(e,n)}F(Bn),M(Bn,e)}function cs(){F(Bn),F(Xs),F(Js)}function Bc(n){Oe(Js.current);var e=Oe(Bn.current),s=vr(e,n.type);e!==s&&(M(Xs,n),M(Bn,s))}function Nl(n){Xs.current===n&&(F(Bn),F(Xs))}var U=we(0);function ta(n){for(var e=n;e!==null;){if(e.tag===13){var s=e.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||s.data==="$?"||s.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Ya=[];function zl(){for(var n=0;n<Ya.length;n++)Ya[n]._workInProgressVersionPrimary=null;Ya.length=0}var jt=Xn.ReactCurrentDispatcher,Xa=Xn.ReactCurrentBatchConfig,je=0,B=null,G=null,J=null,aa=!1,Ms=!1,Zs=0,qd=0;function tn(){throw Error(k(321))}function Rl(n,e){if(e===null)return!1;for(var s=0;s<e.length&&s<n.length;s++)if(!Mn(n[s],e[s]))return!1;return!0}function Il(n,e,s,t,a,r){if(je=r,B=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,jt.current=n===null||n.memoizedState===null?Xd:Jd,n=s(t,a),Ms){r=0;do{if(Ms=!1,Zs=0,25<=r)throw Error(k(301));r+=1,J=G=null,e.updateQueue=null,jt.current=Zd,n=s(t,a)}while(Ms)}if(jt.current=ra,e=G!==null&&G.next!==null,je=0,J=G=B=null,aa=!1,e)throw Error(k(300));return n}function jl(){var n=Zs!==0;return Zs=0,n}function Fn(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return J===null?B.memoizedState=J=n:J=J.next=n,J}function bn(){if(G===null){var n=B.alternate;n=n!==null?n.memoizedState:null}else n=G.next;var e=J===null?B.memoizedState:J.next;if(e!==null)J=e,G=n;else{if(n===null)throw Error(k(310));G=n,n={memoizedState:G.memoizedState,baseState:G.baseState,baseQueue:G.baseQueue,queue:G.queue,next:null},J===null?B.memoizedState=J=n:J=J.next=n}return J}function nt(n,e){return typeof e=="function"?e(n):e}function Ja(n){var e=bn(),s=e.queue;if(s===null)throw Error(k(311));s.lastRenderedReducer=n;var t=G,a=t.baseQueue,r=s.pending;if(r!==null){if(a!==null){var l=a.next;a.next=r.next,r.next=l}t.baseQueue=a=r,s.pending=null}if(a!==null){r=a.next,t=t.baseState;var i=l=null,o=null,c=r;do{var m=c.lane;if((je&m)===m)o!==null&&(o=o.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),t=c.hasEagerState?c.eagerState:n(t,c.action);else{var d={lane:m,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};o===null?(i=o=d,l=t):o=o.next=d,B.lanes|=m,Me|=m}c=c.next}while(c!==null&&c!==r);o===null?l=t:o.next=i,Mn(t,e.memoizedState)||(fn=!0),e.memoizedState=t,e.baseState=l,e.baseQueue=o,s.lastRenderedState=t}if(n=s.interleaved,n!==null){a=n;do r=a.lane,B.lanes|=r,Me|=r,a=a.next;while(a!==n)}else a===null&&(s.lanes=0);return[e.memoizedState,s.dispatch]}function Za(n){var e=bn(),s=e.queue;if(s===null)throw Error(k(311));s.lastRenderedReducer=n;var t=s.dispatch,a=s.pending,r=e.memoizedState;if(a!==null){s.pending=null;var l=a=a.next;do r=n(r,l.action),l=l.next;while(l!==a);Mn(r,e.memoizedState)||(fn=!0),e.memoizedState=r,e.baseQueue===null&&(e.baseState=r),s.lastRenderedState=r}return[r,t]}function Wc(){}function Hc(n,e){var s=B,t=bn(),a=e(),r=!Mn(t.memoizedState,a);if(r&&(t.memoizedState=a,fn=!0),t=t.queue,Ml(Qc.bind(null,s,t,n),[n]),t.getSnapshot!==e||r||J!==null&&J.memoizedState.tag&1){if(s.flags|=2048,et(9,Vc.bind(null,s,t,a,e),void 0,null),Z===null)throw Error(k(349));je&30||$c(s,e,a)}return a}function $c(n,e,s){n.flags|=16384,n={getSnapshot:e,value:s},e=B.updateQueue,e===null?(e={lastEffect:null,stores:null},B.updateQueue=e,e.stores=[n]):(s=e.stores,s===null?e.stores=[n]:s.push(n))}function Vc(n,e,s,t){e.value=s,e.getSnapshot=t,qc(e)&&Kc(n)}function Qc(n,e,s){return s(function(){qc(e)&&Kc(n)})}function qc(n){var e=n.getSnapshot;n=n.value;try{var s=e();return!Mn(n,s)}catch{return!0}}function Kc(n){var e=Gn(n,1);e!==null&&jn(e,n,1,-1)}function Hi(n){var e=Fn();return typeof n=="function"&&(n=n()),e.memoizedState=e.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:nt,lastRenderedState:n},e.queue=n,n=n.dispatch=Yd.bind(null,B,n),[e.memoizedState,n]}function et(n,e,s,t){return n={tag:n,create:e,destroy:s,deps:t,next:null},e=B.updateQueue,e===null?(e={lastEffect:null,stores:null},B.updateQueue=e,e.lastEffect=n.next=n):(s=e.lastEffect,s===null?e.lastEffect=n.next=n:(t=s.next,s.next=n,n.next=t,e.lastEffect=n)),n}function Gc(){return bn().memoizedState}function Mt(n,e,s,t){var a=Fn();B.flags|=n,a.memoizedState=et(1|e,s,void 0,t===void 0?null:t)}function wa(n,e,s,t){var a=bn();t=t===void 0?null:t;var r=void 0;if(G!==null){var l=G.memoizedState;if(r=l.destroy,t!==null&&Rl(t,l.deps)){a.memoizedState=et(e,s,r,t);return}}B.flags|=n,a.memoizedState=et(1|e,s,r,t)}function $i(n,e){return Mt(8390656,8,n,e)}function Ml(n,e){return wa(2048,8,n,e)}function Yc(n,e){return wa(4,2,n,e)}function Xc(n,e){return wa(4,4,n,e)}function Jc(n,e){if(typeof e=="function")return n=n(),e(n),function(){e(null)};if(e!=null)return n=n(),e.current=n,function(){e.current=null}}function Zc(n,e,s){return s=s!=null?s.concat([n]):null,wa(4,4,Jc.bind(null,e,n),s)}function Dl(){}function np(n,e){var s=bn();e=e===void 0?null:e;var t=s.memoizedState;return t!==null&&e!==null&&Rl(e,t[1])?t[0]:(s.memoizedState=[n,e],n)}function ep(n,e){var s=bn();e=e===void 0?null:e;var t=s.memoizedState;return t!==null&&e!==null&&Rl(e,t[1])?t[0]:(n=n(),s.memoizedState=[n,e],n)}function sp(n,e,s){return je&21?(Mn(s,e)||(s=ic(),B.lanes|=s,Me|=s,n.baseState=!0),e):(n.baseState&&(n.baseState=!1,fn=!0),n.memoizedState=s)}function Kd(n,e){var s=j;j=s!==0&&4>s?s:4,n(!0);var t=Xa.transition;Xa.transition={};try{n(!1),e()}finally{j=s,Xa.transition=t}}function tp(){return bn().memoizedState}function Gd(n,e,s){var t=fe(n);if(s={lane:t,action:s,hasEagerState:!1,eagerState:null,next:null},ap(n))rp(e,s);else if(s=Ac(n,e,s,t),s!==null){var a=cn();jn(s,n,t,a),lp(s,e,t)}}function Yd(n,e,s){var t=fe(n),a={lane:t,action:s,hasEagerState:!1,eagerState:null,next:null};if(ap(n))rp(e,a);else{var r=n.alternate;if(n.lanes===0&&(r===null||r.lanes===0)&&(r=e.lastRenderedReducer,r!==null))try{var l=e.lastRenderedState,i=r(l,s);if(a.hasEagerState=!0,a.eagerState=i,Mn(i,l)){var o=e.interleaved;o===null?(a.next=a,bl(e)):(a.next=o.next,o.next=a),e.interleaved=a;return}}catch{}finally{}s=Ac(n,e,a,t),s!==null&&(a=cn(),jn(s,n,t,a),lp(s,e,t))}}function ap(n){var e=n.alternate;return n===B||e!==null&&e===B}function rp(n,e){Ms=aa=!0;var s=n.pending;s===null?e.next=e:(e.next=s.next,s.next=e),n.pending=e}function lp(n,e,s){if(s&4194240){var t=e.lanes;t&=n.pendingLanes,s|=t,e.lanes=s,hl(n,s)}}var ra={readContext:Pn,useCallback:tn,useContext:tn,useEffect:tn,useImperativeHandle:tn,useInsertionEffect:tn,useLayoutEffect:tn,useMemo:tn,useReducer:tn,useRef:tn,useState:tn,useDebugValue:tn,useDeferredValue:tn,useTransition:tn,useMutableSource:tn,useSyncExternalStore:tn,useId:tn,unstable_isNewReconciler:!1},Xd={readContext:Pn,useCallback:function(n,e){return Fn().memoizedState=[n,e===void 0?null:e],n},useContext:Pn,useEffect:$i,useImperativeHandle:function(n,e,s){return s=s!=null?s.concat([n]):null,Mt(4194308,4,Jc.bind(null,e,n),s)},useLayoutEffect:function(n,e){return Mt(4194308,4,n,e)},useInsertionEffect:function(n,e){return Mt(4,2,n,e)},useMemo:function(n,e){var s=Fn();return e=e===void 0?null:e,n=n(),s.memoizedState=[n,e],n},useReducer:function(n,e,s){var t=Fn();return e=s!==void 0?s(e):e,t.memoizedState=t.baseState=e,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:e},t.queue=n,n=n.dispatch=Gd.bind(null,B,n),[t.memoizedState,n]},useRef:function(n){var e=Fn();return n={current:n},e.memoizedState=n},useState:Hi,useDebugValue:Dl,useDeferredValue:function(n){return Fn().memoizedState=n},useTransition:function(){var n=Hi(!1),e=n[0];return n=Kd.bind(null,n[1]),Fn().memoizedState=n,[e,n]},useMutableSource:function(){},useSyncExternalStore:function(n,e,s){var t=B,a=Fn();if(A){if(s===void 0)throw Error(k(407));s=s()}else{if(s=e(),Z===null)throw Error(k(349));je&30||$c(t,e,s)}a.memoizedState=s;var r={value:s,getSnapshot:e};return a.queue=r,$i(Qc.bind(null,t,r,n),[n]),t.flags|=2048,et(9,Vc.bind(null,t,r,s,e),void 0,null),s},useId:function(){var n=Fn(),e=Z.identifierPrefix;if(A){var s=Vn,t=$n;s=(t&~(1<<32-In(t)-1)).toString(32)+s,e=":"+e+"R"+s,s=Zs++,0<s&&(e+="H"+s.toString(32)),e+=":"}else s=qd++,e=":"+e+"r"+s.toString(32)+":";return n.memoizedState=e},unstable_isNewReconciler:!1},Jd={readContext:Pn,useCallback:np,useContext:Pn,useEffect:Ml,useImperativeHandle:Zc,useInsertionEffect:Yc,useLayoutEffect:Xc,useMemo:ep,useReducer:Ja,useRef:Gc,useState:function(){return Ja(nt)},useDebugValue:Dl,useDeferredValue:function(n){var e=bn();return sp(e,G.memoizedState,n)},useTransition:function(){var n=Ja(nt)[0],e=bn().memoizedState;return[n,e]},useMutableSource:Wc,useSyncExternalStore:Hc,useId:tp,unstable_isNewReconciler:!1},Zd={readContext:Pn,useCallback:np,useContext:Pn,useEffect:Ml,useImperativeHandle:Zc,useInsertionEffect:Yc,useLayoutEffect:Xc,useMemo:ep,useReducer:Za,useRef:Gc,useState:function(){return Za(nt)},useDebugValue:Dl,useDeferredValue:function(n){var e=bn();return G===null?e.memoizedState=n:sp(e,G.memoizedState,n)},useTransition:function(){var n=Za(nt)[0],e=bn().memoizedState;return[n,e]},useMutableSource:Wc,useSyncExternalStore:Hc,useId:tp,unstable_isNewReconciler:!1};function Nn(n,e){if(n&&n.defaultProps){e=W({},e),n=n.defaultProps;for(var s in n)e[s]===void 0&&(e[s]=n[s]);return e}return e}function Dr(n,e,s,t){e=n.memoizedState,s=s(t,e),s=s==null?e:W({},e,s),n.memoizedState=s,n.lanes===0&&(n.updateQueue.baseState=s)}var ka={isMounted:function(n){return(n=n._reactInternals)?Ae(n)===n:!1},enqueueSetState:function(n,e,s){n=n._reactInternals;var t=cn(),a=fe(n),r=Qn(t,a);r.payload=e,s!=null&&(r.callback=s),e=ue(n,r,a),e!==null&&(jn(e,n,a,t),It(e,n,a))},enqueueReplaceState:function(n,e,s){n=n._reactInternals;var t=cn(),a=fe(n),r=Qn(t,a);r.tag=1,r.payload=e,s!=null&&(r.callback=s),e=ue(n,r,a),e!==null&&(jn(e,n,a,t),It(e,n,a))},enqueueForceUpdate:function(n,e){n=n._reactInternals;var s=cn(),t=fe(n),a=Qn(s,t);a.tag=2,e!=null&&(a.callback=e),e=ue(n,a,t),e!==null&&(jn(e,n,t,s),It(e,n,t))}};function Vi(n,e,s,t,a,r,l){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(t,r,l):e.prototype&&e.prototype.isPureReactComponent?!qs(s,t)||!qs(a,r):!0}function ip(n,e,s){var t=!1,a=ye,r=e.contextType;return typeof r=="object"&&r!==null?r=Pn(r):(a=mn(e)?Re:ln.current,t=e.contextTypes,r=(t=t!=null)?ls(n,a):ye),e=new e(s,r),n.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=ka,n.stateNode=e,e._reactInternals=n,t&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=a,n.__reactInternalMemoizedMaskedChildContext=r),e}function Qi(n,e,s,t){n=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(s,t),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(s,t),e.state!==n&&ka.enqueueReplaceState(e,e.state,null)}function Fr(n,e,s,t){var a=n.stateNode;a.props=s,a.state=n.memoizedState,a.refs={},Ll(n);var r=e.contextType;typeof r=="object"&&r!==null?a.context=Pn(r):(r=mn(e)?Re:ln.current,a.context=ls(n,r)),a.state=n.memoizedState,r=e.getDerivedStateFromProps,typeof r=="function"&&(Dr(n,e,r,s),a.state=n.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(e=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),e!==a.state&&ka.enqueueReplaceState(a,a.state,null),sa(n,s,a,t),a.state=n.memoizedState),typeof a.componentDidMount=="function"&&(n.flags|=4194308)}function ps(n,e){try{var s="",t=e;do s+=Pu(t),t=t.return;while(t);var a=s}catch(r){a=`
Error generating stack: `+r.message+`
`+r.stack}return{value:n,source:e,stack:a,digest:null}}function nr(n,e,s){return{value:n,source:null,stack:s??null,digest:e??null}}function Ar(n,e){try{console.error(e.value)}catch(s){setTimeout(function(){throw s})}}var nf=typeof WeakMap=="function"?WeakMap:Map;function op(n,e,s){s=Qn(-1,s),s.tag=3,s.payload={element:null};var t=e.value;return s.callback=function(){ia||(ia=!0,Gr=t),Ar(n,e)},s}function cp(n,e,s){s=Qn(-1,s),s.tag=3;var t=n.type.getDerivedStateFromError;if(typeof t=="function"){var a=e.value;s.payload=function(){return t(a)},s.callback=function(){Ar(n,e)}}var r=n.stateNode;return r!==null&&typeof r.componentDidCatch=="function"&&(s.callback=function(){Ar(n,e),typeof t!="function"&&(de===null?de=new Set([this]):de.add(this));var l=e.stack;this.componentDidCatch(e.value,{componentStack:l!==null?l:""})}),s}function qi(n,e,s){var t=n.pingCache;if(t===null){t=n.pingCache=new nf;var a=new Set;t.set(e,a)}else a=t.get(e),a===void 0&&(a=new Set,t.set(e,a));a.has(s)||(a.add(s),n=mf.bind(null,n,e,s),e.then(n,n))}function Ki(n){do{var e;if((e=n.tag===13)&&(e=n.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return n;n=n.return}while(n!==null);return null}function Gi(n,e,s,t,a){return n.mode&1?(n.flags|=65536,n.lanes=a,n):(n===e?n.flags|=65536:(n.flags|=128,s.flags|=131072,s.flags&=-52805,s.tag===1&&(s.alternate===null?s.tag=17:(e=Qn(-1,1),e.tag=2,ue(s,e,1))),s.lanes|=1),n)}var ef=Xn.ReactCurrentOwner,fn=!1;function on(n,e,s,t){e.child=n===null?Fc(e,null,s,t):os(e,n.child,s,t)}function Yi(n,e,s,t,a){s=s.render;var r=e.ref;return ts(e,a),t=Il(n,e,s,t,r,a),s=jl(),n!==null&&!fn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~a,Yn(n,e,a)):(A&&s&&Sl(e),e.flags|=1,on(n,e,t,a),e.child)}function Xi(n,e,s,t,a){if(n===null){var r=s.type;return typeof r=="function"&&!Vl(r)&&r.defaultProps===void 0&&s.compare===null&&s.defaultProps===void 0?(e.tag=15,e.type=r,pp(n,e,r,t,a)):(n=Ut(s.type,null,t,e,e.mode,a),n.ref=e.ref,n.return=e,e.child=n)}if(r=n.child,!(n.lanes&a)){var l=r.memoizedProps;if(s=s.compare,s=s!==null?s:qs,s(l,t)&&n.ref===e.ref)return Yn(n,e,a)}return e.flags|=1,n=he(r,t),n.ref=e.ref,n.return=e,e.child=n}function pp(n,e,s,t,a){if(n!==null){var r=n.memoizedProps;if(qs(r,t)&&n.ref===e.ref)if(fn=!1,e.pendingProps=t=r,(n.lanes&a)!==0)n.flags&131072&&(fn=!0);else return e.lanes=n.lanes,Yn(n,e,a)}return Ur(n,e,s,t,a)}function up(n,e,s){var t=e.pendingProps,a=t.children,r=n!==null?n.memoizedState:null;if(t.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},M(Je,yn),yn|=s;else{if(!(s&1073741824))return n=r!==null?r.baseLanes|s:s,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:n,cachePool:null,transitions:null},e.updateQueue=null,M(Je,yn),yn|=n,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},t=r!==null?r.baseLanes:s,M(Je,yn),yn|=t}else r!==null?(t=r.baseLanes|s,e.memoizedState=null):t=s,M(Je,yn),yn|=t;return on(n,e,a,s),e.child}function dp(n,e){var s=e.ref;(n===null&&s!==null||n!==null&&n.ref!==s)&&(e.flags|=512,e.flags|=2097152)}function Ur(n,e,s,t,a){var r=mn(s)?Re:ln.current;return r=ls(e,r),ts(e,a),s=Il(n,e,s,t,r,a),t=jl(),n!==null&&!fn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~a,Yn(n,e,a)):(A&&t&&Sl(e),e.flags|=1,on(n,e,s,a),e.child)}function Ji(n,e,s,t,a){if(mn(s)){var r=!0;Xt(e)}else r=!1;if(ts(e,a),e.stateNode===null)Dt(n,e),ip(e,s,t),Fr(e,s,t,a),t=!0;else if(n===null){var l=e.stateNode,i=e.memoizedProps;l.props=i;var o=l.context,c=s.contextType;typeof c=="object"&&c!==null?c=Pn(c):(c=mn(s)?Re:ln.current,c=ls(e,c));var m=s.getDerivedStateFromProps,d=typeof m=="function"||typeof l.getSnapshotBeforeUpdate=="function";d||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i!==t||o!==c)&&Qi(e,l,t,c),ee=!1;var h=e.memoizedState;l.state=h,sa(e,t,l,a),o=e.memoizedState,i!==t||h!==o||hn.current||ee?(typeof m=="function"&&(Dr(e,s,m,t),o=e.memoizedState),(i=ee||Vi(e,s,i,t,h,o,c))?(d||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(e.flags|=4194308)):(typeof l.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=t,e.memoizedState=o),l.props=t,l.state=o,l.context=c,t=i):(typeof l.componentDidMount=="function"&&(e.flags|=4194308),t=!1)}else{l=e.stateNode,Uc(n,e),i=e.memoizedProps,c=e.type===e.elementType?i:Nn(e.type,i),l.props=c,d=e.pendingProps,h=l.context,o=s.contextType,typeof o=="object"&&o!==null?o=Pn(o):(o=mn(s)?Re:ln.current,o=ls(e,o));var y=s.getDerivedStateFromProps;(m=typeof y=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i!==d||h!==o)&&Qi(e,l,t,o),ee=!1,h=e.memoizedState,l.state=h,sa(e,t,l,a);var w=e.memoizedState;i!==d||h!==w||hn.current||ee?(typeof y=="function"&&(Dr(e,s,y,t),w=e.memoizedState),(c=ee||Vi(e,s,c,t,h,w,o)||!1)?(m||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(t,w,o),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(t,w,o)),typeof l.componentDidUpdate=="function"&&(e.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof l.componentDidUpdate!="function"||i===n.memoizedProps&&h===n.memoizedState||(e.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===n.memoizedProps&&h===n.memoizedState||(e.flags|=1024),e.memoizedProps=t,e.memoizedState=w),l.props=t,l.state=w,l.context=o,t=c):(typeof l.componentDidUpdate!="function"||i===n.memoizedProps&&h===n.memoizedState||(e.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===n.memoizedProps&&h===n.memoizedState||(e.flags|=1024),t=!1)}return Br(n,e,s,t,r,a)}function Br(n,e,s,t,a,r){dp(n,e);var l=(e.flags&128)!==0;if(!t&&!l)return a&&Di(e,s,!1),Yn(n,e,r);t=e.stateNode,ef.current=e;var i=l&&typeof s.getDerivedStateFromError!="function"?null:t.render();return e.flags|=1,n!==null&&l?(e.child=os(e,n.child,null,r),e.child=os(e,null,i,r)):on(n,e,i,r),e.memoizedState=t.state,a&&Di(e,s,!0),e.child}function fp(n){var e=n.stateNode;e.pendingContext?Mi(n,e.pendingContext,e.pendingContext!==e.context):e.context&&Mi(n,e.context,!1),Ol(n,e.containerInfo)}function Zi(n,e,s,t,a){return is(),_l(a),e.flags|=256,on(n,e,s,t),e.child}var Wr={dehydrated:null,treeContext:null,retryLane:0};function Hr(n){return{baseLanes:n,cachePool:null,transitions:null}}function hp(n,e,s){var t=e.pendingProps,a=U.current,r=!1,l=(e.flags&128)!==0,i;if((i=l)||(i=n!==null&&n.memoizedState===null?!1:(a&2)!==0),i?(r=!0,e.flags&=-129):(n===null||n.memoizedState!==null)&&(a|=1),M(U,a&1),n===null)return jr(e),n=e.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?(e.mode&1?n.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(l=t.children,n=t.fallback,r?(t=e.mode,r=e.child,l={mode:"hidden",children:l},!(t&1)&&r!==null?(r.childLanes=0,r.pendingProps=l):r=Ca(l,t,0,null),n=ze(n,t,s,null),r.return=e,n.return=e,r.sibling=n,e.child=r,e.child.memoizedState=Hr(s),e.memoizedState=Wr,n):Fl(e,l));if(a=n.memoizedState,a!==null&&(i=a.dehydrated,i!==null))return sf(n,e,l,t,i,a,s);if(r){r=t.fallback,l=e.mode,a=n.child,i=a.sibling;var o={mode:"hidden",children:t.children};return!(l&1)&&e.child!==a?(t=e.child,t.childLanes=0,t.pendingProps=o,e.deletions=null):(t=he(a,o),t.subtreeFlags=a.subtreeFlags&14680064),i!==null?r=he(i,r):(r=ze(r,l,s,null),r.flags|=2),r.return=e,t.return=e,t.sibling=r,e.child=t,t=r,r=e.child,l=n.child.memoizedState,l=l===null?Hr(s):{baseLanes:l.baseLanes|s,cachePool:null,transitions:l.transitions},r.memoizedState=l,r.childLanes=n.childLanes&~s,e.memoizedState=Wr,t}return r=n.child,n=r.sibling,t=he(r,{mode:"visible",children:t.children}),!(e.mode&1)&&(t.lanes=s),t.return=e,t.sibling=null,n!==null&&(s=e.deletions,s===null?(e.deletions=[n],e.flags|=16):s.push(n)),e.child=t,e.memoizedState=null,t}function Fl(n,e){return e=Ca({mode:"visible",children:e},n.mode,0,null),e.return=n,n.child=e}function Et(n,e,s,t){return t!==null&&_l(t),os(e,n.child,null,s),n=Fl(e,e.pendingProps.children),n.flags|=2,e.memoizedState=null,n}function sf(n,e,s,t,a,r,l){if(s)return e.flags&256?(e.flags&=-257,t=nr(Error(k(422))),Et(n,e,l,t)):e.memoizedState!==null?(e.child=n.child,e.flags|=128,null):(r=t.fallback,a=e.mode,t=Ca({mode:"visible",children:t.children},a,0,null),r=ze(r,a,l,null),r.flags|=2,t.return=e,r.return=e,t.sibling=r,e.child=t,e.mode&1&&os(e,n.child,null,l),e.child.memoizedState=Hr(l),e.memoizedState=Wr,r);if(!(e.mode&1))return Et(n,e,l,null);if(a.data==="$!"){if(t=a.nextSibling&&a.nextSibling.dataset,t)var i=t.dgst;return t=i,r=Error(k(419)),t=nr(r,t,void 0),Et(n,e,l,t)}if(i=(l&n.childLanes)!==0,fn||i){if(t=Z,t!==null){switch(l&-l){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=a&(t.suspendedLanes|l)?0:a,a!==0&&a!==r.retryLane&&(r.retryLane=a,Gn(n,a),jn(t,n,a,-1))}return $l(),t=nr(Error(k(421))),Et(n,e,l,t)}return a.data==="$?"?(e.flags|=128,e.child=n.child,e=vf.bind(null,n),a._reactRetry=e,null):(n=r.treeContext,gn=pe(a.nextSibling),wn=e,A=!0,Rn=null,n!==null&&(Cn[_n++]=$n,Cn[_n++]=Vn,Cn[_n++]=Ie,$n=n.id,Vn=n.overflow,Ie=e),e=Fl(e,t.children),e.flags|=4096,e)}function no(n,e,s){n.lanes|=e;var t=n.alternate;t!==null&&(t.lanes|=e),Mr(n.return,e,s)}function er(n,e,s,t,a){var r=n.memoizedState;r===null?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:t,tail:s,tailMode:a}:(r.isBackwards=e,r.rendering=null,r.renderingStartTime=0,r.last=t,r.tail=s,r.tailMode=a)}function mp(n,e,s){var t=e.pendingProps,a=t.revealOrder,r=t.tail;if(on(n,e,t.children,s),t=U.current,t&2)t=t&1|2,e.flags|=128;else{if(n!==null&&n.flags&128)n:for(n=e.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&no(n,s,e);else if(n.tag===19)no(n,s,e);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break n;for(;n.sibling===null;){if(n.return===null||n.return===e)break n;n=n.return}n.sibling.return=n.return,n=n.sibling}t&=1}if(M(U,t),!(e.mode&1))e.memoizedState=null;else switch(a){case"forwards":for(s=e.child,a=null;s!==null;)n=s.alternate,n!==null&&ta(n)===null&&(a=s),s=s.sibling;s=a,s===null?(a=e.child,e.child=null):(a=s.sibling,s.sibling=null),er(e,!1,a,s,r);break;case"backwards":for(s=null,a=e.child,e.child=null;a!==null;){if(n=a.alternate,n!==null&&ta(n)===null){e.child=a;break}n=a.sibling,a.sibling=s,s=a,a=n}er(e,!0,s,null,r);break;case"together":er(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Dt(n,e){!(e.mode&1)&&n!==null&&(n.alternate=null,e.alternate=null,e.flags|=2)}function Yn(n,e,s){if(n!==null&&(e.dependencies=n.dependencies),Me|=e.lanes,!(s&e.childLanes))return null;if(n!==null&&e.child!==n.child)throw Error(k(153));if(e.child!==null){for(n=e.child,s=he(n,n.pendingProps),e.child=s,s.return=e;n.sibling!==null;)n=n.sibling,s=s.sibling=he(n,n.pendingProps),s.return=e;s.sibling=null}return e.child}function tf(n,e,s){switch(e.tag){case 3:fp(e),is();break;case 5:Bc(e);break;case 1:mn(e.type)&&Xt(e);break;case 4:Ol(e,e.stateNode.containerInfo);break;case 10:var t=e.type._context,a=e.memoizedProps.value;M(na,t._currentValue),t._currentValue=a;break;case 13:if(t=e.memoizedState,t!==null)return t.dehydrated!==null?(M(U,U.current&1),e.flags|=128,null):s&e.child.childLanes?hp(n,e,s):(M(U,U.current&1),n=Yn(n,e,s),n!==null?n.sibling:null);M(U,U.current&1);break;case 19:if(t=(s&e.childLanes)!==0,n.flags&128){if(t)return mp(n,e,s);e.flags|=128}if(a=e.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),M(U,U.current),t)break;return null;case 22:case 23:return e.lanes=0,up(n,e,s)}return Yn(n,e,s)}var vp,$r,yp,gp;vp=function(n,e){for(var s=e.child;s!==null;){if(s.tag===5||s.tag===6)n.appendChild(s.stateNode);else if(s.tag!==4&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===e)break;for(;s.sibling===null;){if(s.return===null||s.return===e)return;s=s.return}s.sibling.return=s.return,s=s.sibling}};$r=function(){};yp=function(n,e,s,t){var a=n.memoizedProps;if(a!==t){n=e.stateNode,Oe(Bn.current);var r=null;switch(s){case"input":a=dr(n,a),t=dr(n,t),r=[];break;case"select":a=W({},a,{value:void 0}),t=W({},t,{value:void 0}),r=[];break;case"textarea":a=mr(n,a),t=mr(n,t),r=[];break;default:typeof a.onClick!="function"&&typeof t.onClick=="function"&&(n.onclick=Gt)}yr(s,t);var l;s=null;for(c in a)if(!t.hasOwnProperty(c)&&a.hasOwnProperty(c)&&a[c]!=null)if(c==="style"){var i=a[c];for(l in i)i.hasOwnProperty(l)&&(s||(s={}),s[l]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Us.hasOwnProperty(c)?r||(r=[]):(r=r||[]).push(c,null));for(c in t){var o=t[c];if(i=a!=null?a[c]:void 0,t.hasOwnProperty(c)&&o!==i&&(o!=null||i!=null))if(c==="style")if(i){for(l in i)!i.hasOwnProperty(l)||o&&o.hasOwnProperty(l)||(s||(s={}),s[l]="");for(l in o)o.hasOwnProperty(l)&&i[l]!==o[l]&&(s||(s={}),s[l]=o[l])}else s||(r||(r=[]),r.push(c,s)),s=o;else c==="dangerouslySetInnerHTML"?(o=o?o.__html:void 0,i=i?i.__html:void 0,o!=null&&i!==o&&(r=r||[]).push(c,o)):c==="children"?typeof o!="string"&&typeof o!="number"||(r=r||[]).push(c,""+o):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Us.hasOwnProperty(c)?(o!=null&&c==="onScroll"&&D("scroll",n),r||i===o||(r=[])):(r=r||[]).push(c,o))}s&&(r=r||[]).push("style",s);var c=r;(e.updateQueue=c)&&(e.flags|=4)}};gp=function(n,e,s,t){s!==t&&(e.flags|=4)};function Es(n,e){if(!A)switch(n.tailMode){case"hidden":e=n.tail;for(var s=null;e!==null;)e.alternate!==null&&(s=e),e=e.sibling;s===null?n.tail=null:s.sibling=null;break;case"collapsed":s=n.tail;for(var t=null;s!==null;)s.alternate!==null&&(t=s),s=s.sibling;t===null?e||n.tail===null?n.tail=null:n.tail.sibling=null:t.sibling=null}}function an(n){var e=n.alternate!==null&&n.alternate.child===n.child,s=0,t=0;if(e)for(var a=n.child;a!==null;)s|=a.lanes|a.childLanes,t|=a.subtreeFlags&14680064,t|=a.flags&14680064,a.return=n,a=a.sibling;else for(a=n.child;a!==null;)s|=a.lanes|a.childLanes,t|=a.subtreeFlags,t|=a.flags,a.return=n,a=a.sibling;return n.subtreeFlags|=t,n.childLanes=s,e}function af(n,e,s){var t=e.pendingProps;switch(Cl(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return an(e),null;case 1:return mn(e.type)&&Yt(),an(e),null;case 3:return t=e.stateNode,cs(),F(hn),F(ln),zl(),t.pendingContext&&(t.context=t.pendingContext,t.pendingContext=null),(n===null||n.child===null)&&(Ct(e)?e.flags|=4:n===null||n.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Rn!==null&&(Jr(Rn),Rn=null))),$r(n,e),an(e),null;case 5:Nl(e);var a=Oe(Js.current);if(s=e.type,n!==null&&e.stateNode!=null)yp(n,e,s,t,a),n.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!t){if(e.stateNode===null)throw Error(k(166));return an(e),null}if(n=Oe(Bn.current),Ct(e)){t=e.stateNode,s=e.type;var r=e.memoizedProps;switch(t[An]=e,t[Ys]=r,n=(e.mode&1)!==0,s){case"dialog":D("cancel",t),D("close",t);break;case"iframe":case"object":case"embed":D("load",t);break;case"video":case"audio":for(a=0;a<Os.length;a++)D(Os[a],t);break;case"source":D("error",t);break;case"img":case"image":case"link":D("error",t),D("load",t);break;case"details":D("toggle",t);break;case"input":ci(t,r),D("invalid",t);break;case"select":t._wrapperState={wasMultiple:!!r.multiple},D("invalid",t);break;case"textarea":ui(t,r),D("invalid",t)}yr(s,r),a=null;for(var l in r)if(r.hasOwnProperty(l)){var i=r[l];l==="children"?typeof i=="string"?t.textContent!==i&&(r.suppressHydrationWarning!==!0&&St(t.textContent,i,n),a=["children",i]):typeof i=="number"&&t.textContent!==""+i&&(r.suppressHydrationWarning!==!0&&St(t.textContent,i,n),a=["children",""+i]):Us.hasOwnProperty(l)&&i!=null&&l==="onScroll"&&D("scroll",t)}switch(s){case"input":ht(t),pi(t,r,!0);break;case"textarea":ht(t),di(t);break;case"select":case"option":break;default:typeof r.onClick=="function"&&(t.onclick=Gt)}t=a,e.updateQueue=t,t!==null&&(e.flags|=4)}else{l=a.nodeType===9?a:a.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=Qo(s)),n==="http://www.w3.org/1999/xhtml"?s==="script"?(n=l.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof t.is=="string"?n=l.createElement(s,{is:t.is}):(n=l.createElement(s),s==="select"&&(l=n,t.multiple?l.multiple=!0:t.size&&(l.size=t.size))):n=l.createElementNS(n,s),n[An]=e,n[Ys]=t,vp(n,e,!1,!1),e.stateNode=n;n:{switch(l=gr(s,t),s){case"dialog":D("cancel",n),D("close",n),a=t;break;case"iframe":case"object":case"embed":D("load",n),a=t;break;case"video":case"audio":for(a=0;a<Os.length;a++)D(Os[a],n);a=t;break;case"source":D("error",n),a=t;break;case"img":case"image":case"link":D("error",n),D("load",n),a=t;break;case"details":D("toggle",n),a=t;break;case"input":ci(n,t),a=dr(n,t),D("invalid",n);break;case"option":a=t;break;case"select":n._wrapperState={wasMultiple:!!t.multiple},a=W({},t,{value:void 0}),D("invalid",n);break;case"textarea":ui(n,t),a=mr(n,t),D("invalid",n);break;default:a=t}yr(s,a),i=a;for(r in i)if(i.hasOwnProperty(r)){var o=i[r];r==="style"?Go(n,o):r==="dangerouslySetInnerHTML"?(o=o?o.__html:void 0,o!=null&&qo(n,o)):r==="children"?typeof o=="string"?(s!=="textarea"||o!=="")&&Bs(n,o):typeof o=="number"&&Bs(n,""+o):r!=="suppressContentEditableWarning"&&r!=="suppressHydrationWarning"&&r!=="autoFocus"&&(Us.hasOwnProperty(r)?o!=null&&r==="onScroll"&&D("scroll",n):o!=null&&ol(n,r,o,l))}switch(s){case"input":ht(n),pi(n,t,!1);break;case"textarea":ht(n),di(n);break;case"option":t.value!=null&&n.setAttribute("value",""+ve(t.value));break;case"select":n.multiple=!!t.multiple,r=t.value,r!=null?Ze(n,!!t.multiple,r,!1):t.defaultValue!=null&&Ze(n,!!t.multiple,t.defaultValue,!0);break;default:typeof a.onClick=="function"&&(n.onclick=Gt)}switch(s){case"button":case"input":case"select":case"textarea":t=!!t.autoFocus;break n;case"img":t=!0;break n;default:t=!1}}t&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return an(e),null;case 6:if(n&&e.stateNode!=null)gp(n,e,n.memoizedProps,t);else{if(typeof t!="string"&&e.stateNode===null)throw Error(k(166));if(s=Oe(Js.current),Oe(Bn.current),Ct(e)){if(t=e.stateNode,s=e.memoizedProps,t[An]=e,(r=t.nodeValue!==s)&&(n=wn,n!==null))switch(n.tag){case 3:St(t.nodeValue,s,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&St(t.nodeValue,s,(n.mode&1)!==0)}r&&(e.flags|=4)}else t=(s.nodeType===9?s:s.ownerDocument).createTextNode(t),t[An]=e,e.stateNode=t}return an(e),null;case 13:if(F(U),t=e.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(A&&gn!==null&&e.mode&1&&!(e.flags&128))Mc(),is(),e.flags|=98560,r=!1;else if(r=Ct(e),t!==null&&t.dehydrated!==null){if(n===null){if(!r)throw Error(k(318));if(r=e.memoizedState,r=r!==null?r.dehydrated:null,!r)throw Error(k(317));r[An]=e}else is(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;an(e),r=!1}else Rn!==null&&(Jr(Rn),Rn=null),r=!0;if(!r)return e.flags&65536?e:null}return e.flags&128?(e.lanes=s,e):(t=t!==null,t!==(n!==null&&n.memoizedState!==null)&&t&&(e.child.flags|=8192,e.mode&1&&(n===null||U.current&1?Y===0&&(Y=3):$l())),e.updateQueue!==null&&(e.flags|=4),an(e),null);case 4:return cs(),$r(n,e),n===null&&Ks(e.stateNode.containerInfo),an(e),null;case 10:return Pl(e.type._context),an(e),null;case 17:return mn(e.type)&&Yt(),an(e),null;case 19:if(F(U),r=e.memoizedState,r===null)return an(e),null;if(t=(e.flags&128)!==0,l=r.rendering,l===null)if(t)Es(r,!1);else{if(Y!==0||n!==null&&n.flags&128)for(n=e.child;n!==null;){if(l=ta(n),l!==null){for(e.flags|=128,Es(r,!1),t=l.updateQueue,t!==null&&(e.updateQueue=t,e.flags|=4),e.subtreeFlags=0,t=s,s=e.child;s!==null;)r=s,n=t,r.flags&=14680066,l=r.alternate,l===null?(r.childLanes=0,r.lanes=n,r.child=null,r.subtreeFlags=0,r.memoizedProps=null,r.memoizedState=null,r.updateQueue=null,r.dependencies=null,r.stateNode=null):(r.childLanes=l.childLanes,r.lanes=l.lanes,r.child=l.child,r.subtreeFlags=0,r.deletions=null,r.memoizedProps=l.memoizedProps,r.memoizedState=l.memoizedState,r.updateQueue=l.updateQueue,r.type=l.type,n=l.dependencies,r.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),s=s.sibling;return M(U,U.current&1|2),e.child}n=n.sibling}r.tail!==null&&Q()>us&&(e.flags|=128,t=!0,Es(r,!1),e.lanes=4194304)}else{if(!t)if(n=ta(l),n!==null){if(e.flags|=128,t=!0,s=n.updateQueue,s!==null&&(e.updateQueue=s,e.flags|=4),Es(r,!0),r.tail===null&&r.tailMode==="hidden"&&!l.alternate&&!A)return an(e),null}else 2*Q()-r.renderingStartTime>us&&s!==1073741824&&(e.flags|=128,t=!0,Es(r,!1),e.lanes=4194304);r.isBackwards?(l.sibling=e.child,e.child=l):(s=r.last,s!==null?s.sibling=l:e.child=l,r.last=l)}return r.tail!==null?(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Q(),e.sibling=null,s=U.current,M(U,t?s&1|2:s&1),e):(an(e),null);case 22:case 23:return Hl(),t=e.memoizedState!==null,n!==null&&n.memoizedState!==null!==t&&(e.flags|=8192),t&&e.mode&1?yn&1073741824&&(an(e),e.subtreeFlags&6&&(e.flags|=8192)):an(e),null;case 24:return null;case 25:return null}throw Error(k(156,e.tag))}function rf(n,e){switch(Cl(e),e.tag){case 1:return mn(e.type)&&Yt(),n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 3:return cs(),F(hn),F(ln),zl(),n=e.flags,n&65536&&!(n&128)?(e.flags=n&-65537|128,e):null;case 5:return Nl(e),null;case 13:if(F(U),n=e.memoizedState,n!==null&&n.dehydrated!==null){if(e.alternate===null)throw Error(k(340));is()}return n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 19:return F(U),null;case 4:return cs(),null;case 10:return Pl(e.type._context),null;case 22:case 23:return Hl(),null;case 24:return null;default:return null}}var Tt=!1,rn=!1,lf=typeof WeakSet=="function"?WeakSet:Set,_=null;function Xe(n,e){var s=n.ref;if(s!==null)if(typeof s=="function")try{s(null)}catch(t){H(n,e,t)}else s.current=null}function Vr(n,e,s){try{s()}catch(t){H(n,e,t)}}var eo=!1;function of(n,e){if(br=Qt,n=Cc(),xl(n)){if("selectionStart"in n)var s={start:n.selectionStart,end:n.selectionEnd};else n:{s=(s=n.ownerDocument)&&s.defaultView||window;var t=s.getSelection&&s.getSelection();if(t&&t.rangeCount!==0){s=t.anchorNode;var a=t.anchorOffset,r=t.focusNode;t=t.focusOffset;try{s.nodeType,r.nodeType}catch{s=null;break n}var l=0,i=-1,o=-1,c=0,m=0,d=n,h=null;e:for(;;){for(var y;d!==s||a!==0&&d.nodeType!==3||(i=l+a),d!==r||t!==0&&d.nodeType!==3||(o=l+t),d.nodeType===3&&(l+=d.nodeValue.length),(y=d.firstChild)!==null;)h=d,d=y;for(;;){if(d===n)break e;if(h===s&&++c===a&&(i=l),h===r&&++m===t&&(o=l),(y=d.nextSibling)!==null)break;d=h,h=d.parentNode}d=y}s=i===-1||o===-1?null:{start:i,end:o}}else s=null}s=s||{start:0,end:0}}else s=null;for(Lr={focusedElem:n,selectionRange:s},Qt=!1,_=e;_!==null;)if(e=_,n=e.child,(e.subtreeFlags&1028)!==0&&n!==null)n.return=e,_=n;else for(;_!==null;){e=_;try{var w=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var g=w.memoizedProps,C=w.memoizedState,u=e.stateNode,p=u.getSnapshotBeforeUpdate(e.elementType===e.type?g:Nn(e.type,g),C);u.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var f=e.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(k(163))}}catch(v){H(e,e.return,v)}if(n=e.sibling,n!==null){n.return=e.return,_=n;break}_=e.return}return w=eo,eo=!1,w}function Ds(n,e,s){var t=e.updateQueue;if(t=t!==null?t.lastEffect:null,t!==null){var a=t=t.next;do{if((a.tag&n)===n){var r=a.destroy;a.destroy=void 0,r!==void 0&&Vr(e,s,r)}a=a.next}while(a!==t)}}function xa(n,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var s=e=e.next;do{if((s.tag&n)===n){var t=s.create;s.destroy=t()}s=s.next}while(s!==e)}}function Qr(n){var e=n.ref;if(e!==null){var s=n.stateNode;switch(n.tag){case 5:n=s;break;default:n=s}typeof e=="function"?e(n):e.current=n}}function wp(n){var e=n.alternate;e!==null&&(n.alternate=null,wp(e)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(e=n.stateNode,e!==null&&(delete e[An],delete e[Ys],delete e[zr],delete e[Hd],delete e[$d])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function kp(n){return n.tag===5||n.tag===3||n.tag===4}function so(n){n:for(;;){for(;n.sibling===null;){if(n.return===null||kp(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue n;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function qr(n,e,s){var t=n.tag;if(t===5||t===6)n=n.stateNode,e?s.nodeType===8?s.parentNode.insertBefore(n,e):s.insertBefore(n,e):(s.nodeType===8?(e=s.parentNode,e.insertBefore(n,s)):(e=s,e.appendChild(n)),s=s._reactRootContainer,s!=null||e.onclick!==null||(e.onclick=Gt));else if(t!==4&&(n=n.child,n!==null))for(qr(n,e,s),n=n.sibling;n!==null;)qr(n,e,s),n=n.sibling}function Kr(n,e,s){var t=n.tag;if(t===5||t===6)n=n.stateNode,e?s.insertBefore(n,e):s.appendChild(n);else if(t!==4&&(n=n.child,n!==null))for(Kr(n,e,s),n=n.sibling;n!==null;)Kr(n,e,s),n=n.sibling}var nn=null,zn=!1;function Zn(n,e,s){for(s=s.child;s!==null;)xp(n,e,s),s=s.sibling}function xp(n,e,s){if(Un&&typeof Un.onCommitFiberUnmount=="function")try{Un.onCommitFiberUnmount(fa,s)}catch{}switch(s.tag){case 5:rn||Xe(s,e);case 6:var t=nn,a=zn;nn=null,Zn(n,e,s),nn=t,zn=a,nn!==null&&(zn?(n=nn,s=s.stateNode,n.nodeType===8?n.parentNode.removeChild(s):n.removeChild(s)):nn.removeChild(s.stateNode));break;case 18:nn!==null&&(zn?(n=nn,s=s.stateNode,n.nodeType===8?Ka(n.parentNode,s):n.nodeType===1&&Ka(n,s),Vs(n)):Ka(nn,s.stateNode));break;case 4:t=nn,a=zn,nn=s.stateNode.containerInfo,zn=!0,Zn(n,e,s),nn=t,zn=a;break;case 0:case 11:case 14:case 15:if(!rn&&(t=s.updateQueue,t!==null&&(t=t.lastEffect,t!==null))){a=t=t.next;do{var r=a,l=r.destroy;r=r.tag,l!==void 0&&(r&2||r&4)&&Vr(s,e,l),a=a.next}while(a!==t)}Zn(n,e,s);break;case 1:if(!rn&&(Xe(s,e),t=s.stateNode,typeof t.componentWillUnmount=="function"))try{t.props=s.memoizedProps,t.state=s.memoizedState,t.componentWillUnmount()}catch(i){H(s,e,i)}Zn(n,e,s);break;case 21:Zn(n,e,s);break;case 22:s.mode&1?(rn=(t=rn)||s.memoizedState!==null,Zn(n,e,s),rn=t):Zn(n,e,s);break;default:Zn(n,e,s)}}function to(n){var e=n.updateQueue;if(e!==null){n.updateQueue=null;var s=n.stateNode;s===null&&(s=n.stateNode=new lf),e.forEach(function(t){var a=yf.bind(null,n,t);s.has(t)||(s.add(t),t.then(a,a))})}}function On(n,e){var s=e.deletions;if(s!==null)for(var t=0;t<s.length;t++){var a=s[t];try{var r=n,l=e,i=l;n:for(;i!==null;){switch(i.tag){case 5:nn=i.stateNode,zn=!1;break n;case 3:nn=i.stateNode.containerInfo,zn=!0;break n;case 4:nn=i.stateNode.containerInfo,zn=!0;break n}i=i.return}if(nn===null)throw Error(k(160));xp(r,l,a),nn=null,zn=!1;var o=a.alternate;o!==null&&(o.return=null),a.return=null}catch(c){H(a,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Sp(e,n),e=e.sibling}function Sp(n,e){var s=n.alternate,t=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(On(e,n),Dn(n),t&4){try{Ds(3,n,n.return),xa(3,n)}catch(g){H(n,n.return,g)}try{Ds(5,n,n.return)}catch(g){H(n,n.return,g)}}break;case 1:On(e,n),Dn(n),t&512&&s!==null&&Xe(s,s.return);break;case 5:if(On(e,n),Dn(n),t&512&&s!==null&&Xe(s,s.return),n.flags&32){var a=n.stateNode;try{Bs(a,"")}catch(g){H(n,n.return,g)}}if(t&4&&(a=n.stateNode,a!=null)){var r=n.memoizedProps,l=s!==null?s.memoizedProps:r,i=n.type,o=n.updateQueue;if(n.updateQueue=null,o!==null)try{i==="input"&&r.type==="radio"&&r.name!=null&&$o(a,r),gr(i,l);var c=gr(i,r);for(l=0;l<o.length;l+=2){var m=o[l],d=o[l+1];m==="style"?Go(a,d):m==="dangerouslySetInnerHTML"?qo(a,d):m==="children"?Bs(a,d):ol(a,m,d,c)}switch(i){case"input":fr(a,r);break;case"textarea":Vo(a,r);break;case"select":var h=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!r.multiple;var y=r.value;y!=null?Ze(a,!!r.multiple,y,!1):h!==!!r.multiple&&(r.defaultValue!=null?Ze(a,!!r.multiple,r.defaultValue,!0):Ze(a,!!r.multiple,r.multiple?[]:"",!1))}a[Ys]=r}catch(g){H(n,n.return,g)}}break;case 6:if(On(e,n),Dn(n),t&4){if(n.stateNode===null)throw Error(k(162));a=n.stateNode,r=n.memoizedProps;try{a.nodeValue=r}catch(g){H(n,n.return,g)}}break;case 3:if(On(e,n),Dn(n),t&4&&s!==null&&s.memoizedState.isDehydrated)try{Vs(e.containerInfo)}catch(g){H(n,n.return,g)}break;case 4:On(e,n),Dn(n);break;case 13:On(e,n),Dn(n),a=n.child,a.flags&8192&&(r=a.memoizedState!==null,a.stateNode.isHidden=r,!r||a.alternate!==null&&a.alternate.memoizedState!==null||(Bl=Q())),t&4&&to(n);break;case 22:if(m=s!==null&&s.memoizedState!==null,n.mode&1?(rn=(c=rn)||m,On(e,n),rn=c):On(e,n),Dn(n),t&8192){if(c=n.memoizedState!==null,(n.stateNode.isHidden=c)&&!m&&n.mode&1)for(_=n,m=n.child;m!==null;){for(d=_=m;_!==null;){switch(h=_,y=h.child,h.tag){case 0:case 11:case 14:case 15:Ds(4,h,h.return);break;case 1:Xe(h,h.return);var w=h.stateNode;if(typeof w.componentWillUnmount=="function"){t=h,s=h.return;try{e=t,w.props=e.memoizedProps,w.state=e.memoizedState,w.componentWillUnmount()}catch(g){H(t,s,g)}}break;case 5:Xe(h,h.return);break;case 22:if(h.memoizedState!==null){ro(d);continue}}y!==null?(y.return=h,_=y):ro(d)}m=m.sibling}n:for(m=null,d=n;;){if(d.tag===5){if(m===null){m=d;try{a=d.stateNode,c?(r=a.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none"):(i=d.stateNode,o=d.memoizedProps.style,l=o!=null&&o.hasOwnProperty("display")?o.display:null,i.style.display=Ko("display",l))}catch(g){H(n,n.return,g)}}}else if(d.tag===6){if(m===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(g){H(n,n.return,g)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===n)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===n)break n;for(;d.sibling===null;){if(d.return===null||d.return===n)break n;m===d&&(m=null),d=d.return}m===d&&(m=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:On(e,n),Dn(n),t&4&&to(n);break;case 21:break;default:On(e,n),Dn(n)}}function Dn(n){var e=n.flags;if(e&2){try{n:{for(var s=n.return;s!==null;){if(kp(s)){var t=s;break n}s=s.return}throw Error(k(160))}switch(t.tag){case 5:var a=t.stateNode;t.flags&32&&(Bs(a,""),t.flags&=-33);var r=so(n);Kr(n,r,a);break;case 3:case 4:var l=t.stateNode.containerInfo,i=so(n);qr(n,i,l);break;default:throw Error(k(161))}}catch(o){H(n,n.return,o)}n.flags&=-3}e&4096&&(n.flags&=-4097)}function cf(n,e,s){_=n,Cp(n)}function Cp(n,e,s){for(var t=(n.mode&1)!==0;_!==null;){var a=_,r=a.child;if(a.tag===22&&t){var l=a.memoizedState!==null||Tt;if(!l){var i=a.alternate,o=i!==null&&i.memoizedState!==null||rn;i=Tt;var c=rn;if(Tt=l,(rn=o)&&!c)for(_=a;_!==null;)l=_,o=l.child,l.tag===22&&l.memoizedState!==null?lo(a):o!==null?(o.return=l,_=o):lo(a);for(;r!==null;)_=r,Cp(r),r=r.sibling;_=a,Tt=i,rn=c}ao(n)}else a.subtreeFlags&8772&&r!==null?(r.return=a,_=r):ao(n)}}function ao(n){for(;_!==null;){var e=_;if(e.flags&8772){var s=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:rn||xa(5,e);break;case 1:var t=e.stateNode;if(e.flags&4&&!rn)if(s===null)t.componentDidMount();else{var a=e.elementType===e.type?s.memoizedProps:Nn(e.type,s.memoizedProps);t.componentDidUpdate(a,s.memoizedState,t.__reactInternalSnapshotBeforeUpdate)}var r=e.updateQueue;r!==null&&Wi(e,r,t);break;case 3:var l=e.updateQueue;if(l!==null){if(s=null,e.child!==null)switch(e.child.tag){case 5:s=e.child.stateNode;break;case 1:s=e.child.stateNode}Wi(e,l,s)}break;case 5:var i=e.stateNode;if(s===null&&e.flags&4){s=i;var o=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":o.autoFocus&&s.focus();break;case"img":o.src&&(s.src=o.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var m=c.memoizedState;if(m!==null){var d=m.dehydrated;d!==null&&Vs(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(k(163))}rn||e.flags&512&&Qr(e)}catch(h){H(e,e.return,h)}}if(e===n){_=null;break}if(s=e.sibling,s!==null){s.return=e.return,_=s;break}_=e.return}}function ro(n){for(;_!==null;){var e=_;if(e===n){_=null;break}var s=e.sibling;if(s!==null){s.return=e.return,_=s;break}_=e.return}}function lo(n){for(;_!==null;){var e=_;try{switch(e.tag){case 0:case 11:case 15:var s=e.return;try{xa(4,e)}catch(o){H(e,s,o)}break;case 1:var t=e.stateNode;if(typeof t.componentDidMount=="function"){var a=e.return;try{t.componentDidMount()}catch(o){H(e,a,o)}}var r=e.return;try{Qr(e)}catch(o){H(e,r,o)}break;case 5:var l=e.return;try{Qr(e)}catch(o){H(e,l,o)}}}catch(o){H(e,e.return,o)}if(e===n){_=null;break}var i=e.sibling;if(i!==null){i.return=e.return,_=i;break}_=e.return}}var pf=Math.ceil,la=Xn.ReactCurrentDispatcher,Al=Xn.ReactCurrentOwner,Tn=Xn.ReactCurrentBatchConfig,I=0,Z=null,K=null,en=0,yn=0,Je=we(0),Y=0,st=null,Me=0,Sa=0,Ul=0,Fs=null,dn=null,Bl=0,us=1/0,Wn=null,ia=!1,Gr=null,de=null,Pt=!1,re=null,oa=0,As=0,Yr=null,Ft=-1,At=0;function cn(){return I&6?Q():Ft!==-1?Ft:Ft=Q()}function fe(n){return n.mode&1?I&2&&en!==0?en&-en:Qd.transition!==null?(At===0&&(At=ic()),At):(n=j,n!==0||(n=window.event,n=n===void 0?16:hc(n.type)),n):1}function jn(n,e,s,t){if(50<As)throw As=0,Yr=null,Error(k(185));lt(n,s,t),(!(I&2)||n!==Z)&&(n===Z&&(!(I&2)&&(Sa|=s),Y===4&&te(n,en)),vn(n,t),s===1&&I===0&&!(e.mode&1)&&(us=Q()+500,ga&&ke()))}function vn(n,e){var s=n.callbackNode;Qu(n,e);var t=Vt(n,n===Z?en:0);if(t===0)s!==null&&mi(s),n.callbackNode=null,n.callbackPriority=0;else if(e=t&-t,n.callbackPriority!==e){if(s!=null&&mi(s),e===1)n.tag===0?Vd(io.bind(null,n)):Rc(io.bind(null,n)),Bd(function(){!(I&6)&&ke()}),s=null;else{switch(oc(t)){case 1:s=fl;break;case 4:s=rc;break;case 16:s=$t;break;case 536870912:s=lc;break;default:s=$t}s=Np(s,_p.bind(null,n))}n.callbackPriority=e,n.callbackNode=s}}function _p(n,e){if(Ft=-1,At=0,I&6)throw Error(k(327));var s=n.callbackNode;if(as()&&n.callbackNode!==s)return null;var t=Vt(n,n===Z?en:0);if(t===0)return null;if(t&30||t&n.expiredLanes||e)e=ca(n,t);else{e=t;var a=I;I|=2;var r=Tp();(Z!==n||en!==e)&&(Wn=null,us=Q()+500,Ne(n,e));do try{ff();break}catch(i){Ep(n,i)}while(!0);Tl(),la.current=r,I=a,K!==null?e=0:(Z=null,en=0,e=Y)}if(e!==0){if(e===2&&(a=Cr(n),a!==0&&(t=a,e=Xr(n,a))),e===1)throw s=st,Ne(n,0),te(n,t),vn(n,Q()),s;if(e===6)te(n,t);else{if(a=n.current.alternate,!(t&30)&&!uf(a)&&(e=ca(n,t),e===2&&(r=Cr(n),r!==0&&(t=r,e=Xr(n,r))),e===1))throw s=st,Ne(n,0),te(n,t),vn(n,Q()),s;switch(n.finishedWork=a,n.finishedLanes=t,e){case 0:case 1:throw Error(k(345));case 2:Te(n,dn,Wn);break;case 3:if(te(n,t),(t&130023424)===t&&(e=Bl+500-Q(),10<e)){if(Vt(n,0)!==0)break;if(a=n.suspendedLanes,(a&t)!==t){cn(),n.pingedLanes|=n.suspendedLanes&a;break}n.timeoutHandle=Nr(Te.bind(null,n,dn,Wn),e);break}Te(n,dn,Wn);break;case 4:if(te(n,t),(t&4194240)===t)break;for(e=n.eventTimes,a=-1;0<t;){var l=31-In(t);r=1<<l,l=e[l],l>a&&(a=l),t&=~r}if(t=a,t=Q()-t,t=(120>t?120:480>t?480:1080>t?1080:1920>t?1920:3e3>t?3e3:4320>t?4320:1960*pf(t/1960))-t,10<t){n.timeoutHandle=Nr(Te.bind(null,n,dn,Wn),t);break}Te(n,dn,Wn);break;case 5:Te(n,dn,Wn);break;default:throw Error(k(329))}}}return vn(n,Q()),n.callbackNode===s?_p.bind(null,n):null}function Xr(n,e){var s=Fs;return n.current.memoizedState.isDehydrated&&(Ne(n,e).flags|=256),n=ca(n,e),n!==2&&(e=dn,dn=s,e!==null&&Jr(e)),n}function Jr(n){dn===null?dn=n:dn.push.apply(dn,n)}function uf(n){for(var e=n;;){if(e.flags&16384){var s=e.updateQueue;if(s!==null&&(s=s.stores,s!==null))for(var t=0;t<s.length;t++){var a=s[t],r=a.getSnapshot;a=a.value;try{if(!Mn(r(),a))return!1}catch{return!1}}}if(s=e.child,e.subtreeFlags&16384&&s!==null)s.return=e,e=s;else{if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function te(n,e){for(e&=~Ul,e&=~Sa,n.suspendedLanes|=e,n.pingedLanes&=~e,n=n.expirationTimes;0<e;){var s=31-In(e),t=1<<s;n[s]=-1,e&=~t}}function io(n){if(I&6)throw Error(k(327));as();var e=Vt(n,0);if(!(e&1))return vn(n,Q()),null;var s=ca(n,e);if(n.tag!==0&&s===2){var t=Cr(n);t!==0&&(e=t,s=Xr(n,t))}if(s===1)throw s=st,Ne(n,0),te(n,e),vn(n,Q()),s;if(s===6)throw Error(k(345));return n.finishedWork=n.current.alternate,n.finishedLanes=e,Te(n,dn,Wn),vn(n,Q()),null}function Wl(n,e){var s=I;I|=1;try{return n(e)}finally{I=s,I===0&&(us=Q()+500,ga&&ke())}}function De(n){re!==null&&re.tag===0&&!(I&6)&&as();var e=I;I|=1;var s=Tn.transition,t=j;try{if(Tn.transition=null,j=1,n)return n()}finally{j=t,Tn.transition=s,I=e,!(I&6)&&ke()}}function Hl(){yn=Je.current,F(Je)}function Ne(n,e){n.finishedWork=null,n.finishedLanes=0;var s=n.timeoutHandle;if(s!==-1&&(n.timeoutHandle=-1,Ud(s)),K!==null)for(s=K.return;s!==null;){var t=s;switch(Cl(t),t.tag){case 1:t=t.type.childContextTypes,t!=null&&Yt();break;case 3:cs(),F(hn),F(ln),zl();break;case 5:Nl(t);break;case 4:cs();break;case 13:F(U);break;case 19:F(U);break;case 10:Pl(t.type._context);break;case 22:case 23:Hl()}s=s.return}if(Z=n,K=n=he(n.current,null),en=yn=e,Y=0,st=null,Ul=Sa=Me=0,dn=Fs=null,Le!==null){for(e=0;e<Le.length;e++)if(s=Le[e],t=s.interleaved,t!==null){s.interleaved=null;var a=t.next,r=s.pending;if(r!==null){var l=r.next;r.next=a,t.next=l}s.pending=t}Le=null}return n}function Ep(n,e){do{var s=K;try{if(Tl(),jt.current=ra,aa){for(var t=B.memoizedState;t!==null;){var a=t.queue;a!==null&&(a.pending=null),t=t.next}aa=!1}if(je=0,J=G=B=null,Ms=!1,Zs=0,Al.current=null,s===null||s.return===null){Y=1,st=e,K=null;break}n:{var r=n,l=s.return,i=s,o=e;if(e=en,i.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){var c=o,m=i,d=m.tag;if(!(m.mode&1)&&(d===0||d===11||d===15)){var h=m.alternate;h?(m.updateQueue=h.updateQueue,m.memoizedState=h.memoizedState,m.lanes=h.lanes):(m.updateQueue=null,m.memoizedState=null)}var y=Ki(l);if(y!==null){y.flags&=-257,Gi(y,l,i,r,e),y.mode&1&&qi(r,c,e),e=y,o=c;var w=e.updateQueue;if(w===null){var g=new Set;g.add(o),e.updateQueue=g}else w.add(o);break n}else{if(!(e&1)){qi(r,c,e),$l();break n}o=Error(k(426))}}else if(A&&i.mode&1){var C=Ki(l);if(C!==null){!(C.flags&65536)&&(C.flags|=256),Gi(C,l,i,r,e),_l(ps(o,i));break n}}r=o=ps(o,i),Y!==4&&(Y=2),Fs===null?Fs=[r]:Fs.push(r),r=l;do{switch(r.tag){case 3:r.flags|=65536,e&=-e,r.lanes|=e;var u=op(r,o,e);Bi(r,u);break n;case 1:i=o;var p=r.type,f=r.stateNode;if(!(r.flags&128)&&(typeof p.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(de===null||!de.has(f)))){r.flags|=65536,e&=-e,r.lanes|=e;var v=cp(r,i,e);Bi(r,v);break n}}r=r.return}while(r!==null)}bp(s)}catch(S){e=S,K===s&&s!==null&&(K=s=s.return);continue}break}while(!0)}function Tp(){var n=la.current;return la.current=ra,n===null?ra:n}function $l(){(Y===0||Y===3||Y===2)&&(Y=4),Z===null||!(Me&268435455)&&!(Sa&268435455)||te(Z,en)}function ca(n,e){var s=I;I|=2;var t=Tp();(Z!==n||en!==e)&&(Wn=null,Ne(n,e));do try{df();break}catch(a){Ep(n,a)}while(!0);if(Tl(),I=s,la.current=t,K!==null)throw Error(k(261));return Z=null,en=0,Y}function df(){for(;K!==null;)Pp(K)}function ff(){for(;K!==null&&!Du();)Pp(K)}function Pp(n){var e=Op(n.alternate,n,yn);n.memoizedProps=n.pendingProps,e===null?bp(n):K=e,Al.current=null}function bp(n){var e=n;do{var s=e.alternate;if(n=e.return,e.flags&32768){if(s=rf(s,e),s!==null){s.flags&=32767,K=s;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{Y=6,K=null;return}}else if(s=af(s,e,yn),s!==null){K=s;return}if(e=e.sibling,e!==null){K=e;return}K=e=n}while(e!==null);Y===0&&(Y=5)}function Te(n,e,s){var t=j,a=Tn.transition;try{Tn.transition=null,j=1,hf(n,e,s,t)}finally{Tn.transition=a,j=t}return null}function hf(n,e,s,t){do as();while(re!==null);if(I&6)throw Error(k(327));s=n.finishedWork;var a=n.finishedLanes;if(s===null)return null;if(n.finishedWork=null,n.finishedLanes=0,s===n.current)throw Error(k(177));n.callbackNode=null,n.callbackPriority=0;var r=s.lanes|s.childLanes;if(qu(n,r),n===Z&&(K=Z=null,en=0),!(s.subtreeFlags&2064)&&!(s.flags&2064)||Pt||(Pt=!0,Np($t,function(){return as(),null})),r=(s.flags&15990)!==0,s.subtreeFlags&15990||r){r=Tn.transition,Tn.transition=null;var l=j;j=1;var i=I;I|=4,Al.current=null,of(n,s),Sp(s,n),Rd(Lr),Qt=!!br,Lr=br=null,n.current=s,cf(s),Fu(),I=i,j=l,Tn.transition=r}else n.current=s;if(Pt&&(Pt=!1,re=n,oa=a),r=n.pendingLanes,r===0&&(de=null),Bu(s.stateNode),vn(n,Q()),e!==null)for(t=n.onRecoverableError,s=0;s<e.length;s++)a=e[s],t(a.value,{componentStack:a.stack,digest:a.digest});if(ia)throw ia=!1,n=Gr,Gr=null,n;return oa&1&&n.tag!==0&&as(),r=n.pendingLanes,r&1?n===Yr?As++:(As=0,Yr=n):As=0,ke(),null}function as(){if(re!==null){var n=oc(oa),e=Tn.transition,s=j;try{if(Tn.transition=null,j=16>n?16:n,re===null)var t=!1;else{if(n=re,re=null,oa=0,I&6)throw Error(k(331));var a=I;for(I|=4,_=n.current;_!==null;){var r=_,l=r.child;if(_.flags&16){var i=r.deletions;if(i!==null){for(var o=0;o<i.length;o++){var c=i[o];for(_=c;_!==null;){var m=_;switch(m.tag){case 0:case 11:case 15:Ds(8,m,r)}var d=m.child;if(d!==null)d.return=m,_=d;else for(;_!==null;){m=_;var h=m.sibling,y=m.return;if(wp(m),m===c){_=null;break}if(h!==null){h.return=y,_=h;break}_=y}}}var w=r.alternate;if(w!==null){var g=w.child;if(g!==null){w.child=null;do{var C=g.sibling;g.sibling=null,g=C}while(g!==null)}}_=r}}if(r.subtreeFlags&2064&&l!==null)l.return=r,_=l;else n:for(;_!==null;){if(r=_,r.flags&2048)switch(r.tag){case 0:case 11:case 15:Ds(9,r,r.return)}var u=r.sibling;if(u!==null){u.return=r.return,_=u;break n}_=r.return}}var p=n.current;for(_=p;_!==null;){l=_;var f=l.child;if(l.subtreeFlags&2064&&f!==null)f.return=l,_=f;else n:for(l=p;_!==null;){if(i=_,i.flags&2048)try{switch(i.tag){case 0:case 11:case 15:xa(9,i)}}catch(S){H(i,i.return,S)}if(i===l){_=null;break n}var v=i.sibling;if(v!==null){v.return=i.return,_=v;break n}_=i.return}}if(I=a,ke(),Un&&typeof Un.onPostCommitFiberRoot=="function")try{Un.onPostCommitFiberRoot(fa,n)}catch{}t=!0}return t}finally{j=s,Tn.transition=e}}return!1}function oo(n,e,s){e=ps(s,e),e=op(n,e,1),n=ue(n,e,1),e=cn(),n!==null&&(lt(n,1,e),vn(n,e))}function H(n,e,s){if(n.tag===3)oo(n,n,s);else for(;e!==null;){if(e.tag===3){oo(e,n,s);break}else if(e.tag===1){var t=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof t.componentDidCatch=="function"&&(de===null||!de.has(t))){n=ps(s,n),n=cp(e,n,1),e=ue(e,n,1),n=cn(),e!==null&&(lt(e,1,n),vn(e,n));break}}e=e.return}}function mf(n,e,s){var t=n.pingCache;t!==null&&t.delete(e),e=cn(),n.pingedLanes|=n.suspendedLanes&s,Z===n&&(en&s)===s&&(Y===4||Y===3&&(en&130023424)===en&&500>Q()-Bl?Ne(n,0):Ul|=s),vn(n,e)}function Lp(n,e){e===0&&(n.mode&1?(e=yt,yt<<=1,!(yt&130023424)&&(yt=4194304)):e=1);var s=cn();n=Gn(n,e),n!==null&&(lt(n,e,s),vn(n,s))}function vf(n){var e=n.memoizedState,s=0;e!==null&&(s=e.retryLane),Lp(n,s)}function yf(n,e){var s=0;switch(n.tag){case 13:var t=n.stateNode,a=n.memoizedState;a!==null&&(s=a.retryLane);break;case 19:t=n.stateNode;break;default:throw Error(k(314))}t!==null&&t.delete(e),Lp(n,s)}var Op;Op=function(n,e,s){if(n!==null)if(n.memoizedProps!==e.pendingProps||hn.current)fn=!0;else{if(!(n.lanes&s)&&!(e.flags&128))return fn=!1,tf(n,e,s);fn=!!(n.flags&131072)}else fn=!1,A&&e.flags&1048576&&Ic(e,Zt,e.index);switch(e.lanes=0,e.tag){case 2:var t=e.type;Dt(n,e),n=e.pendingProps;var a=ls(e,ln.current);ts(e,s),a=Il(null,e,t,n,a,s);var r=jl();return e.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,mn(t)?(r=!0,Xt(e)):r=!1,e.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,Ll(e),a.updater=ka,e.stateNode=a,a._reactInternals=e,Fr(e,t,n,s),e=Br(null,e,t,!0,r,s)):(e.tag=0,A&&r&&Sl(e),on(null,e,a,s),e=e.child),e;case 16:t=e.elementType;n:{switch(Dt(n,e),n=e.pendingProps,a=t._init,t=a(t._payload),e.type=t,a=e.tag=wf(t),n=Nn(t,n),a){case 0:e=Ur(null,e,t,n,s);break n;case 1:e=Ji(null,e,t,n,s);break n;case 11:e=Yi(null,e,t,n,s);break n;case 14:e=Xi(null,e,t,Nn(t.type,n),s);break n}throw Error(k(306,t,""))}return e;case 0:return t=e.type,a=e.pendingProps,a=e.elementType===t?a:Nn(t,a),Ur(n,e,t,a,s);case 1:return t=e.type,a=e.pendingProps,a=e.elementType===t?a:Nn(t,a),Ji(n,e,t,a,s);case 3:n:{if(fp(e),n===null)throw Error(k(387));t=e.pendingProps,r=e.memoizedState,a=r.element,Uc(n,e),sa(e,t,null,s);var l=e.memoizedState;if(t=l.element,r.isDehydrated)if(r={element:t,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},e.updateQueue.baseState=r,e.memoizedState=r,e.flags&256){a=ps(Error(k(423)),e),e=Zi(n,e,t,s,a);break n}else if(t!==a){a=ps(Error(k(424)),e),e=Zi(n,e,t,s,a);break n}else for(gn=pe(e.stateNode.containerInfo.firstChild),wn=e,A=!0,Rn=null,s=Fc(e,null,t,s),e.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling;else{if(is(),t===a){e=Yn(n,e,s);break n}on(n,e,t,s)}e=e.child}return e;case 5:return Bc(e),n===null&&jr(e),t=e.type,a=e.pendingProps,r=n!==null?n.memoizedProps:null,l=a.children,Or(t,a)?l=null:r!==null&&Or(t,r)&&(e.flags|=32),dp(n,e),on(n,e,l,s),e.child;case 6:return n===null&&jr(e),null;case 13:return hp(n,e,s);case 4:return Ol(e,e.stateNode.containerInfo),t=e.pendingProps,n===null?e.child=os(e,null,t,s):on(n,e,t,s),e.child;case 11:return t=e.type,a=e.pendingProps,a=e.elementType===t?a:Nn(t,a),Yi(n,e,t,a,s);case 7:return on(n,e,e.pendingProps,s),e.child;case 8:return on(n,e,e.pendingProps.children,s),e.child;case 12:return on(n,e,e.pendingProps.children,s),e.child;case 10:n:{if(t=e.type._context,a=e.pendingProps,r=e.memoizedProps,l=a.value,M(na,t._currentValue),t._currentValue=l,r!==null)if(Mn(r.value,l)){if(r.children===a.children&&!hn.current){e=Yn(n,e,s);break n}}else for(r=e.child,r!==null&&(r.return=e);r!==null;){var i=r.dependencies;if(i!==null){l=r.child;for(var o=i.firstContext;o!==null;){if(o.context===t){if(r.tag===1){o=Qn(-1,s&-s),o.tag=2;var c=r.updateQueue;if(c!==null){c=c.shared;var m=c.pending;m===null?o.next=o:(o.next=m.next,m.next=o),c.pending=o}}r.lanes|=s,o=r.alternate,o!==null&&(o.lanes|=s),Mr(r.return,s,e),i.lanes|=s;break}o=o.next}}else if(r.tag===10)l=r.type===e.type?null:r.child;else if(r.tag===18){if(l=r.return,l===null)throw Error(k(341));l.lanes|=s,i=l.alternate,i!==null&&(i.lanes|=s),Mr(l,s,e),l=r.sibling}else l=r.child;if(l!==null)l.return=r;else for(l=r;l!==null;){if(l===e){l=null;break}if(r=l.sibling,r!==null){r.return=l.return,l=r;break}l=l.return}r=l}on(n,e,a.children,s),e=e.child}return e;case 9:return a=e.type,t=e.pendingProps.children,ts(e,s),a=Pn(a),t=t(a),e.flags|=1,on(n,e,t,s),e.child;case 14:return t=e.type,a=Nn(t,e.pendingProps),a=Nn(t.type,a),Xi(n,e,t,a,s);case 15:return pp(n,e,e.type,e.pendingProps,s);case 17:return t=e.type,a=e.pendingProps,a=e.elementType===t?a:Nn(t,a),Dt(n,e),e.tag=1,mn(t)?(n=!0,Xt(e)):n=!1,ts(e,s),ip(e,t,a),Fr(e,t,a,s),Br(null,e,t,!0,n,s);case 19:return mp(n,e,s);case 22:return up(n,e,s)}throw Error(k(156,e.tag))};function Np(n,e){return ac(n,e)}function gf(n,e,s,t){this.tag=n,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=t,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function En(n,e,s,t){return new gf(n,e,s,t)}function Vl(n){return n=n.prototype,!(!n||!n.isReactComponent)}function wf(n){if(typeof n=="function")return Vl(n)?1:0;if(n!=null){if(n=n.$$typeof,n===pl)return 11;if(n===ul)return 14}return 2}function he(n,e){var s=n.alternate;return s===null?(s=En(n.tag,e,n.key,n.mode),s.elementType=n.elementType,s.type=n.type,s.stateNode=n.stateNode,s.alternate=n,n.alternate=s):(s.pendingProps=e,s.type=n.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=n.flags&14680064,s.childLanes=n.childLanes,s.lanes=n.lanes,s.child=n.child,s.memoizedProps=n.memoizedProps,s.memoizedState=n.memoizedState,s.updateQueue=n.updateQueue,e=n.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},s.sibling=n.sibling,s.index=n.index,s.ref=n.ref,s}function Ut(n,e,s,t,a,r){var l=2;if(t=n,typeof n=="function")Vl(n)&&(l=1);else if(typeof n=="string")l=5;else n:switch(n){case We:return ze(s.children,a,r,e);case cl:l=8,a|=8;break;case or:return n=En(12,s,e,a|2),n.elementType=or,n.lanes=r,n;case cr:return n=En(13,s,e,a),n.elementType=cr,n.lanes=r,n;case pr:return n=En(19,s,e,a),n.elementType=pr,n.lanes=r,n;case Bo:return Ca(s,a,r,e);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case Ao:l=10;break n;case Uo:l=9;break n;case pl:l=11;break n;case ul:l=14;break n;case ne:l=16,t=null;break n}throw Error(k(130,n==null?n:typeof n,""))}return e=En(l,s,e,a),e.elementType=n,e.type=t,e.lanes=r,e}function ze(n,e,s,t){return n=En(7,n,t,e),n.lanes=s,n}function Ca(n,e,s,t){return n=En(22,n,t,e),n.elementType=Bo,n.lanes=s,n.stateNode={isHidden:!1},n}function sr(n,e,s){return n=En(6,n,null,e),n.lanes=s,n}function tr(n,e,s){return e=En(4,n.children!==null?n.children:[],n.key,e),e.lanes=s,e.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},e}function kf(n,e,s,t,a){this.tag=e,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Da(0),this.expirationTimes=Da(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Da(0),this.identifierPrefix=t,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function Ql(n,e,s,t,a,r,l,i,o){return n=new kf(n,e,s,i,o),e===1?(e=1,r===!0&&(e|=8)):e=0,r=En(3,null,null,e),n.current=r,r.stateNode=n,r.memoizedState={element:t,isDehydrated:s,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ll(r),n}function xf(n,e,s){var t=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Be,key:t==null?null:""+t,children:n,containerInfo:e,implementation:s}}function zp(n){if(!n)return ye;n=n._reactInternals;n:{if(Ae(n)!==n||n.tag!==1)throw Error(k(170));var e=n;do{switch(e.tag){case 3:e=e.stateNode.context;break n;case 1:if(mn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break n}}e=e.return}while(e!==null);throw Error(k(171))}if(n.tag===1){var s=n.type;if(mn(s))return zc(n,s,e)}return e}function Rp(n,e,s,t,a,r,l,i,o){return n=Ql(s,t,!0,n,a,r,l,i,o),n.context=zp(null),s=n.current,t=cn(),a=fe(s),r=Qn(t,a),r.callback=e??null,ue(s,r,a),n.current.lanes=a,lt(n,a,t),vn(n,t),n}function _a(n,e,s,t){var a=e.current,r=cn(),l=fe(a);return s=zp(s),e.context===null?e.context=s:e.pendingContext=s,e=Qn(r,l),e.payload={element:n},t=t===void 0?null:t,t!==null&&(e.callback=t),n=ue(a,e,l),n!==null&&(jn(n,a,l,r),It(n,a,l)),l}function pa(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function co(n,e){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var s=n.retryLane;n.retryLane=s!==0&&s<e?s:e}}function ql(n,e){co(n,e),(n=n.alternate)&&co(n,e)}function Sf(){return null}var Ip=typeof reportError=="function"?reportError:function(n){console.error(n)};function Kl(n){this._internalRoot=n}Ea.prototype.render=Kl.prototype.render=function(n){var e=this._internalRoot;if(e===null)throw Error(k(409));_a(n,e,null,null)};Ea.prototype.unmount=Kl.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var e=n.containerInfo;De(function(){_a(null,n,null,null)}),e[Kn]=null}};function Ea(n){this._internalRoot=n}Ea.prototype.unstable_scheduleHydration=function(n){if(n){var e=uc();n={blockedOn:null,target:n,priority:e};for(var s=0;s<se.length&&e!==0&&e<se[s].priority;s++);se.splice(s,0,n),s===0&&fc(n)}};function Gl(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function Ta(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function po(){}function Cf(n,e,s,t,a){if(a){if(typeof t=="function"){var r=t;t=function(){var c=pa(l);r.call(c)}}var l=Rp(e,t,n,0,null,!1,!1,"",po);return n._reactRootContainer=l,n[Kn]=l.current,Ks(n.nodeType===8?n.parentNode:n),De(),l}for(;a=n.lastChild;)n.removeChild(a);if(typeof t=="function"){var i=t;t=function(){var c=pa(o);i.call(c)}}var o=Ql(n,0,!1,null,null,!1,!1,"",po);return n._reactRootContainer=o,n[Kn]=o.current,Ks(n.nodeType===8?n.parentNode:n),De(function(){_a(e,o,s,t)}),o}function Pa(n,e,s,t,a){var r=s._reactRootContainer;if(r){var l=r;if(typeof a=="function"){var i=a;a=function(){var o=pa(l);i.call(o)}}_a(e,l,n,a)}else l=Cf(s,e,n,a,t);return pa(l)}cc=function(n){switch(n.tag){case 3:var e=n.stateNode;if(e.current.memoizedState.isDehydrated){var s=Ls(e.pendingLanes);s!==0&&(hl(e,s|1),vn(e,Q()),!(I&6)&&(us=Q()+500,ke()))}break;case 13:De(function(){var t=Gn(n,1);if(t!==null){var a=cn();jn(t,n,1,a)}}),ql(n,1)}};ml=function(n){if(n.tag===13){var e=Gn(n,134217728);if(e!==null){var s=cn();jn(e,n,134217728,s)}ql(n,134217728)}};pc=function(n){if(n.tag===13){var e=fe(n),s=Gn(n,e);if(s!==null){var t=cn();jn(s,n,e,t)}ql(n,e)}};uc=function(){return j};dc=function(n,e){var s=j;try{return j=n,e()}finally{j=s}};kr=function(n,e,s){switch(e){case"input":if(fr(n,s),e=s.name,s.type==="radio"&&e!=null){for(s=n;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<s.length;e++){var t=s[e];if(t!==n&&t.form===n.form){var a=ya(t);if(!a)throw Error(k(90));Ho(t),fr(t,a)}}}break;case"textarea":Vo(n,s);break;case"select":e=s.value,e!=null&&Ze(n,!!s.multiple,e,!1)}};Jo=Wl;Zo=De;var _f={usingClientEntryPoint:!1,Events:[ot,Qe,ya,Yo,Xo,Wl]},Ts={findFiberByHostInstance:be,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Ef={bundleType:Ts.bundleType,version:Ts.version,rendererPackageName:Ts.rendererPackageName,rendererConfig:Ts.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Xn.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=sc(n),n===null?null:n.stateNode},findFiberByHostInstance:Ts.findFiberByHostInstance||Sf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var bt=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!bt.isDisabled&&bt.supportsFiber)try{fa=bt.inject(Ef),Un=bt}catch{}}xn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=_f;xn.createPortal=function(n,e){var s=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Gl(e))throw Error(k(200));return xf(n,e,null,s)};xn.createRoot=function(n,e){if(!Gl(n))throw Error(k(299));var s=!1,t="",a=Ip;return e!=null&&(e.unstable_strictMode===!0&&(s=!0),e.identifierPrefix!==void 0&&(t=e.identifierPrefix),e.onRecoverableError!==void 0&&(a=e.onRecoverableError)),e=Ql(n,1,!1,null,null,s,!1,t,a),n[Kn]=e.current,Ks(n.nodeType===8?n.parentNode:n),new Kl(e)};xn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var e=n._reactInternals;if(e===void 0)throw typeof n.render=="function"?Error(k(188)):(n=Object.keys(n).join(","),Error(k(268,n)));return n=sc(e),n=n===null?null:n.stateNode,n};xn.flushSync=function(n){return De(n)};xn.hydrate=function(n,e,s){if(!Ta(e))throw Error(k(200));return Pa(null,n,e,!0,s)};xn.hydrateRoot=function(n,e,s){if(!Gl(n))throw Error(k(405));var t=s!=null&&s.hydratedSources||null,a=!1,r="",l=Ip;if(s!=null&&(s.unstable_strictMode===!0&&(a=!0),s.identifierPrefix!==void 0&&(r=s.identifierPrefix),s.onRecoverableError!==void 0&&(l=s.onRecoverableError)),e=Rp(e,null,n,1,s??null,a,!1,r,l),n[Kn]=e.current,Ks(n),t)for(n=0;n<t.length;n++)s=t[n],a=s._getVersion,a=a(s._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[s,a]:e.mutableSourceEagerHydrationData.push(s,a);return new Ea(e)};xn.render=function(n,e,s){if(!Ta(e))throw Error(k(200));return Pa(null,n,e,!1,s)};xn.unmountComponentAtNode=function(n){if(!Ta(n))throw Error(k(40));return n._reactRootContainer?(De(function(){Pa(null,null,n,!1,function(){n._reactRootContainer=null,n[Kn]=null})}),!0):!1};xn.unstable_batchedUpdates=Wl;xn.unstable_renderSubtreeIntoContainer=function(n,e,s,t){if(!Ta(s))throw Error(k(200));if(n==null||n._reactInternals===void 0)throw Error(k(38));return Pa(n,e,s,!1,t)};xn.version="18.3.1-next-f1338f8080-20240426";function jp(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(jp)}catch(n){console.error(n)}}jp(),jo.exports=xn;var Tf=jo.exports,Mp,uo=Tf;Mp=uo.createRoot,uo.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function tt(){return tt=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var t in s)Object.prototype.hasOwnProperty.call(s,t)&&(n[t]=s[t])}return n},tt.apply(this,arguments)}var le;(function(n){n.Pop="POP",n.Push="PUSH",n.Replace="REPLACE"})(le||(le={}));const fo="popstate";function Pf(n){n===void 0&&(n={});function e(t,a){let{pathname:r,search:l,hash:i}=t.location;return Zr("",{pathname:r,search:l,hash:i},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function s(t,a){return typeof a=="string"?a:ua(a)}return Lf(e,s,null,n)}function q(n,e){if(n===!1||n===null||typeof n>"u")throw new Error(e)}function Yl(n,e){if(!n){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function bf(){return Math.random().toString(36).substr(2,8)}function ho(n,e){return{usr:n.state,key:n.key,idx:e}}function Zr(n,e,s,t){return s===void 0&&(s=null),tt({pathname:typeof n=="string"?n:n.pathname,search:"",hash:""},typeof e=="string"?ms(e):e,{state:s,key:e&&e.key||t||bf()})}function ua(n){let{pathname:e="/",search:s="",hash:t=""}=n;return s&&s!=="?"&&(e+=s.charAt(0)==="?"?s:"?"+s),t&&t!=="#"&&(e+=t.charAt(0)==="#"?t:"#"+t),e}function ms(n){let e={};if(n){let s=n.indexOf("#");s>=0&&(e.hash=n.substr(s),n=n.substr(0,s));let t=n.indexOf("?");t>=0&&(e.search=n.substr(t),n=n.substr(0,t)),n&&(e.pathname=n)}return e}function Lf(n,e,s,t){t===void 0&&(t={});let{window:a=document.defaultView,v5Compat:r=!1}=t,l=a.history,i=le.Pop,o=null,c=m();c==null&&(c=0,l.replaceState(tt({},l.state,{idx:c}),""));function m(){return(l.state||{idx:null}).idx}function d(){i=le.Pop;let C=m(),u=C==null?null:C-c;c=C,o&&o({action:i,location:g.location,delta:u})}function h(C,u){i=le.Push;let p=Zr(g.location,C,u);c=m()+1;let f=ho(p,c),v=g.createHref(p);try{l.pushState(f,"",v)}catch(S){if(S instanceof DOMException&&S.name==="DataCloneError")throw S;a.location.assign(v)}r&&o&&o({action:i,location:g.location,delta:1})}function y(C,u){i=le.Replace;let p=Zr(g.location,C,u);c=m();let f=ho(p,c),v=g.createHref(p);l.replaceState(f,"",v),r&&o&&o({action:i,location:g.location,delta:0})}function w(C){let u=a.location.origin!=="null"?a.location.origin:a.location.href,p=typeof C=="string"?C:ua(C);return p=p.replace(/ $/,"%20"),q(u,"No window.location.(origin|href) available to create URL for href: "+p),new URL(p,u)}let g={get action(){return i},get location(){return n(a,l)},listen(C){if(o)throw new Error("A history only accepts one active listener");return a.addEventListener(fo,d),o=C,()=>{a.removeEventListener(fo,d),o=null}},createHref(C){return e(a,C)},createURL:w,encodeLocation(C){let u=w(C);return{pathname:u.pathname,search:u.search,hash:u.hash}},push:h,replace:y,go(C){return l.go(C)}};return g}var mo;(function(n){n.data="data",n.deferred="deferred",n.redirect="redirect",n.error="error"})(mo||(mo={}));function Of(n,e,s){return s===void 0&&(s="/"),Nf(n,e,s)}function Nf(n,e,s,t){let a=typeof e=="string"?ms(e):e,r=Xl(a.pathname||"/",s);if(r==null)return null;let l=Dp(n);zf(l);let i=null;for(let o=0;i==null&&o<l.length;++o){let c=$f(r);i=Bf(l[o],c)}return i}function Dp(n,e,s,t){e===void 0&&(e=[]),s===void 0&&(s=[]),t===void 0&&(t="");let a=(r,l,i)=>{let o={relativePath:i===void 0?r.path||"":i,caseSensitive:r.caseSensitive===!0,childrenIndex:l,route:r};o.relativePath.startsWith("/")&&(q(o.relativePath.startsWith(t),'Absolute route path "'+o.relativePath+'" nested under path '+('"'+t+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),o.relativePath=o.relativePath.slice(t.length));let c=me([t,o.relativePath]),m=s.concat(o);r.children&&r.children.length>0&&(q(r.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),Dp(r.children,e,m,c)),!(r.path==null&&!r.index)&&e.push({path:c,score:Af(c,r.index),routesMeta:m})};return n.forEach((r,l)=>{var i;if(r.path===""||!((i=r.path)!=null&&i.includes("?")))a(r,l);else for(let o of Fp(r.path))a(r,l,o)}),e}function Fp(n){let e=n.split("/");if(e.length===0)return[];let[s,...t]=e,a=s.endsWith("?"),r=s.replace(/\?$/,"");if(t.length===0)return a?[r,""]:[r];let l=Fp(t.join("/")),i=[];return i.push(...l.map(o=>o===""?r:[r,o].join("/"))),a&&i.push(...l),i.map(o=>n.startsWith("/")&&o===""?"/":o)}function zf(n){n.sort((e,s)=>e.score!==s.score?s.score-e.score:Uf(e.routesMeta.map(t=>t.childrenIndex),s.routesMeta.map(t=>t.childrenIndex)))}const Rf=/^:[\w-]+$/,If=3,jf=2,Mf=1,Df=10,Ff=-2,vo=n=>n==="*";function Af(n,e){let s=n.split("/"),t=s.length;return s.some(vo)&&(t+=Ff),e&&(t+=jf),s.filter(a=>!vo(a)).reduce((a,r)=>a+(Rf.test(r)?If:r===""?Mf:Df),t)}function Uf(n,e){return n.length===e.length&&n.slice(0,-1).every((t,a)=>t===e[a])?n[n.length-1]-e[e.length-1]:0}function Bf(n,e,s){let{routesMeta:t}=n,a={},r="/",l=[];for(let i=0;i<t.length;++i){let o=t[i],c=i===t.length-1,m=r==="/"?e:e.slice(r.length)||"/",d=Wf({path:o.relativePath,caseSensitive:o.caseSensitive,end:c},m),h=o.route;if(!d)return null;Object.assign(a,d.params),l.push({params:a,pathname:me([r,d.pathname]),pathnameBase:Gf(me([r,d.pathnameBase])),route:h}),d.pathnameBase!=="/"&&(r=me([r,d.pathnameBase]))}return l}function Wf(n,e){typeof n=="string"&&(n={path:n,caseSensitive:!1,end:!0});let[s,t]=Hf(n.path,n.caseSensitive,n.end),a=e.match(s);if(!a)return null;let r=a[0],l=r.replace(/(.)\/+$/,"$1"),i=a.slice(1);return{params:t.reduce((c,m,d)=>{let{paramName:h,isOptional:y}=m;if(h==="*"){let g=i[d]||"";l=r.slice(0,r.length-g.length).replace(/(.)\/+$/,"$1")}const w=i[d];return y&&!w?c[h]=void 0:c[h]=(w||"").replace(/%2F/g,"/"),c},{}),pathname:r,pathnameBase:l,pattern:n}}function Hf(n,e,s){e===void 0&&(e=!1),s===void 0&&(s=!0),Yl(n==="*"||!n.endsWith("*")||n.endsWith("/*"),'Route path "'+n+'" will be treated as if it were '+('"'+n.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+n.replace(/\*$/,"/*")+'".'));let t=[],a="^"+n.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(l,i,o)=>(t.push({paramName:i,isOptional:o!=null}),o?"/?([^\\/]+)?":"/([^\\/]+)"));return n.endsWith("*")?(t.push({paramName:"*"}),a+=n==="*"||n==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):s?a+="\\/*$":n!==""&&n!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,e?void 0:"i"),t]}function $f(n){try{return n.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Yl(!1,'The URL path "'+n+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),n}}function Xl(n,e){if(e==="/")return n;if(!n.toLowerCase().startsWith(e.toLowerCase()))return null;let s=e.endsWith("/")?e.length-1:e.length,t=n.charAt(s);return t&&t!=="/"?null:n.slice(s)||"/"}const Vf=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Qf=n=>Vf.test(n);function qf(n,e){e===void 0&&(e="/");let{pathname:s,search:t="",hash:a=""}=typeof n=="string"?ms(n):n,r;if(s)if(Qf(s))r=s;else{if(s.includes("//")){let l=s;s=s.replace(/\/\/+/g,"/"),Yl(!1,"Pathnames cannot have embedded double slashes - normalizing "+(l+" -> "+s))}s.startsWith("/")?r=yo(s.substring(1),"/"):r=yo(s,e)}else r=e;return{pathname:r,search:Yf(t),hash:Xf(a)}}function yo(n,e){let s=e.replace(/\/+$/,"").split("/");return n.split("/").forEach(a=>{a===".."?s.length>1&&s.pop():a!=="."&&s.push(a)}),s.length>1?s.join("/"):"/"}function ar(n,e,s,t){return"Cannot include a '"+n+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(t)+"].  Please separate it out to the ")+("`to."+s+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Kf(n){return n.filter((e,s)=>s===0||e.route.path&&e.route.path.length>0)}function Jl(n,e){let s=Kf(n);return e?s.map((t,a)=>a===s.length-1?t.pathname:t.pathnameBase):s.map(t=>t.pathnameBase)}function Zl(n,e,s,t){t===void 0&&(t=!1);let a;typeof n=="string"?a=ms(n):(a=tt({},n),q(!a.pathname||!a.pathname.includes("?"),ar("?","pathname","search",a)),q(!a.pathname||!a.pathname.includes("#"),ar("#","pathname","hash",a)),q(!a.search||!a.search.includes("#"),ar("#","search","hash",a)));let r=n===""||a.pathname==="",l=r?"/":a.pathname,i;if(l==null)i=s;else{let d=e.length-1;if(!t&&l.startsWith("..")){let h=l.split("/");for(;h[0]==="..";)h.shift(),d-=1;a.pathname=h.join("/")}i=d>=0?e[d]:"/"}let o=qf(a,i),c=l&&l!=="/"&&l.endsWith("/"),m=(r||l===".")&&s.endsWith("/");return!o.pathname.endsWith("/")&&(c||m)&&(o.pathname+="/"),o}const me=n=>n.join("/").replace(/\/\/+/g,"/"),Gf=n=>n.replace(/\/+$/,"").replace(/^\/*/,"/"),Yf=n=>!n||n==="?"?"":n.startsWith("?")?n:"?"+n,Xf=n=>!n||n==="#"?"":n.startsWith("#")?n:"#"+n;function Jf(n){return n!=null&&typeof n.status=="number"&&typeof n.statusText=="string"&&typeof n.internal=="boolean"&&"data"in n}const Ap=["post","put","patch","delete"];new Set(Ap);const Zf=["get",...Ap];new Set(Zf);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function at(){return at=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var t in s)Object.prototype.hasOwnProperty.call(s,t)&&(n[t]=s[t])}return n},at.apply(this,arguments)}const ni=x.createContext(null),nh=x.createContext(null),xe=x.createContext(null),ba=x.createContext(null),Jn=x.createContext({outlet:null,matches:[],isDataRoute:!1}),Up=x.createContext(null);function eh(n,e){let{relative:s}=e===void 0?{}:e;vs()||q(!1);let{basename:t,navigator:a}=x.useContext(xe),{hash:r,pathname:l,search:i}=Wp(n,{relative:s}),o=l;return t!=="/"&&(o=l==="/"?t:me([t,l])),a.createHref({pathname:o,search:i,hash:r})}function vs(){return x.useContext(ba)!=null}function Se(){return vs()||q(!1),x.useContext(ba).location}function Bp(n){x.useContext(xe).static||x.useLayoutEffect(n)}function ei(){let{isDataRoute:n}=x.useContext(Jn);return n?vh():sh()}function sh(){vs()||q(!1);let n=x.useContext(ni),{basename:e,future:s,navigator:t}=x.useContext(xe),{matches:a}=x.useContext(Jn),{pathname:r}=Se(),l=JSON.stringify(Jl(a,s.v7_relativeSplatPath)),i=x.useRef(!1);return Bp(()=>{i.current=!0}),x.useCallback(function(c,m){if(m===void 0&&(m={}),!i.current)return;if(typeof c=="number"){t.go(c);return}let d=Zl(c,JSON.parse(l),r,m.relative==="path");n==null&&e!=="/"&&(d.pathname=d.pathname==="/"?e:me([e,d.pathname])),(m.replace?t.replace:t.push)(d,m.state,m)},[e,t,l,r,n])}const th=x.createContext(null);function ah(n){let e=x.useContext(Jn).outlet;return e&&x.createElement(th.Provider,{value:n},e)}function Wp(n,e){let{relative:s}=e===void 0?{}:e,{future:t}=x.useContext(xe),{matches:a}=x.useContext(Jn),{pathname:r}=Se(),l=JSON.stringify(Jl(a,t.v7_relativeSplatPath));return x.useMemo(()=>Zl(n,JSON.parse(l),r,s==="path"),[n,l,r,s])}function rh(n,e){return lh(n,e)}function lh(n,e,s,t){vs()||q(!1);let{navigator:a}=x.useContext(xe),{matches:r}=x.useContext(Jn),l=r[r.length-1],i=l?l.params:{};l&&l.pathname;let o=l?l.pathnameBase:"/";l&&l.route;let c=Se(),m;if(e){var d;let C=typeof e=="string"?ms(e):e;o==="/"||(d=C.pathname)!=null&&d.startsWith(o)||q(!1),m=C}else m=c;let h=m.pathname||"/",y=h;if(o!=="/"){let C=o.replace(/^\//,"").split("/");y="/"+h.replace(/^\//,"").split("/").slice(C.length).join("/")}let w=Of(n,{pathname:y}),g=uh(w&&w.map(C=>Object.assign({},C,{params:Object.assign({},i,C.params),pathname:me([o,a.encodeLocation?a.encodeLocation(C.pathname).pathname:C.pathname]),pathnameBase:C.pathnameBase==="/"?o:me([o,a.encodeLocation?a.encodeLocation(C.pathnameBase).pathname:C.pathnameBase])})),r,s,t);return e&&g?x.createElement(ba.Provider,{value:{location:at({pathname:"/",search:"",hash:"",state:null,key:"default"},m),navigationType:le.Pop}},g):g}function ih(){let n=mh(),e=Jf(n)?n.status+" "+n.statusText:n instanceof Error?n.message:JSON.stringify(n),s=n instanceof Error?n.stack:null,a={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return x.createElement(x.Fragment,null,x.createElement("h2",null,"Unexpected Application Error!"),x.createElement("h3",{style:{fontStyle:"italic"}},e),s?x.createElement("pre",{style:a},s):null,null)}const oh=x.createElement(ih,null);class ch extends x.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,s){return s.location!==e.location||s.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:s.error,location:s.location,revalidation:e.revalidation||s.revalidation}}componentDidCatch(e,s){console.error("React Router caught the following error during render",e,s)}render(){return this.state.error!==void 0?x.createElement(Jn.Provider,{value:this.props.routeContext},x.createElement(Up.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function ph(n){let{routeContext:e,match:s,children:t}=n,a=x.useContext(ni);return a&&a.static&&a.staticContext&&(s.route.errorElement||s.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=s.route.id),x.createElement(Jn.Provider,{value:e},t)}function uh(n,e,s,t){var a;if(e===void 0&&(e=[]),s===void 0&&(s=null),t===void 0&&(t=null),n==null){var r;if(!s)return null;if(s.errors)n=s.matches;else if((r=t)!=null&&r.v7_partialHydration&&e.length===0&&!s.initialized&&s.matches.length>0)n=s.matches;else return null}let l=n,i=(a=s)==null?void 0:a.errors;if(i!=null){let m=l.findIndex(d=>d.route.id&&(i==null?void 0:i[d.route.id])!==void 0);m>=0||q(!1),l=l.slice(0,Math.min(l.length,m+1))}let o=!1,c=-1;if(s&&t&&t.v7_partialHydration)for(let m=0;m<l.length;m++){let d=l[m];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(c=m),d.route.id){let{loaderData:h,errors:y}=s,w=d.route.loader&&h[d.route.id]===void 0&&(!y||y[d.route.id]===void 0);if(d.route.lazy||w){o=!0,c>=0?l=l.slice(0,c+1):l=[l[0]];break}}}return l.reduceRight((m,d,h)=>{let y,w=!1,g=null,C=null;s&&(y=i&&d.route.id?i[d.route.id]:void 0,g=d.route.errorElement||oh,o&&(c<0&&h===0?(yh("route-fallback"),w=!0,C=null):c===h&&(w=!0,C=d.route.hydrateFallbackElement||null)));let u=e.concat(l.slice(0,h+1)),p=()=>{let f;return y?f=g:w?f=C:d.route.Component?f=x.createElement(d.route.Component,null):d.route.element?f=d.route.element:f=m,x.createElement(ph,{match:d,routeContext:{outlet:m,matches:u,isDataRoute:s!=null},children:f})};return s&&(d.route.ErrorBoundary||d.route.errorElement||h===0)?x.createElement(ch,{location:s.location,revalidation:s.revalidation,component:g,error:y,children:p(),routeContext:{outlet:null,matches:u,isDataRoute:!0}}):p()},null)}var Hp=function(n){return n.UseBlocker="useBlocker",n.UseRevalidator="useRevalidator",n.UseNavigateStable="useNavigate",n}(Hp||{}),$p=function(n){return n.UseBlocker="useBlocker",n.UseLoaderData="useLoaderData",n.UseActionData="useActionData",n.UseRouteError="useRouteError",n.UseNavigation="useNavigation",n.UseRouteLoaderData="useRouteLoaderData",n.UseMatches="useMatches",n.UseRevalidator="useRevalidator",n.UseNavigateStable="useNavigate",n.UseRouteId="useRouteId",n}($p||{});function dh(n){let e=x.useContext(ni);return e||q(!1),e}function fh(n){let e=x.useContext(nh);return e||q(!1),e}function hh(n){let e=x.useContext(Jn);return e||q(!1),e}function Vp(n){let e=hh(),s=e.matches[e.matches.length-1];return s.route.id||q(!1),s.route.id}function mh(){var n;let e=x.useContext(Up),s=fh(),t=Vp();return e!==void 0?e:(n=s.errors)==null?void 0:n[t]}function vh(){let{router:n}=dh(Hp.UseNavigateStable),e=Vp($p.UseNavigateStable),s=x.useRef(!1);return Bp(()=>{s.current=!0}),x.useCallback(function(a,r){r===void 0&&(r={}),s.current&&(typeof a=="number"?n.navigate(a):n.navigate(a,at({fromRouteId:e},r)))},[n,e])}const go={};function yh(n,e,s){go[n]||(go[n]=!0)}function gh(n,e){n==null||n.v7_startTransition,n==null||n.v7_relativeSplatPath}function rr(n){let{to:e,replace:s,state:t,relative:a}=n;vs()||q(!1);let{future:r,static:l}=x.useContext(xe),{matches:i}=x.useContext(Jn),{pathname:o}=Se(),c=ei(),m=Zl(e,Jl(i,r.v7_relativeSplatPath),o,a==="path"),d=JSON.stringify(m);return x.useEffect(()=>c(JSON.parse(d),{replace:s,state:t,relative:a}),[c,d,a,s,t]),null}function wh(n){return ah(n.context)}function Pe(n){q(!1)}function kh(n){let{basename:e="/",children:s=null,location:t,navigationType:a=le.Pop,navigator:r,static:l=!1,future:i}=n;vs()&&q(!1);let o=e.replace(/^\/*/,"/"),c=x.useMemo(()=>({basename:o,navigator:r,static:l,future:at({v7_relativeSplatPath:!1},i)}),[o,i,r,l]);typeof t=="string"&&(t=ms(t));let{pathname:m="/",search:d="",hash:h="",state:y=null,key:w="default"}=t,g=x.useMemo(()=>{let C=Xl(m,o);return C==null?null:{location:{pathname:C,search:d,hash:h,state:y,key:w},navigationType:a}},[o,m,d,h,y,w,a]);return g==null?null:x.createElement(xe.Provider,{value:c},x.createElement(ba.Provider,{children:s,value:g}))}function xh(n){let{children:e,location:s}=n;return rh(nl(e),s)}new Promise(()=>{});function nl(n,e){e===void 0&&(e=[]);let s=[];return x.Children.forEach(n,(t,a)=>{if(!x.isValidElement(t))return;let r=[...e,a];if(t.type===x.Fragment){s.push.apply(s,nl(t.props.children,r));return}t.type!==Pe&&q(!1),!t.props.index||!t.props.children||q(!1);let l={id:t.props.id||r.join("-"),caseSensitive:t.props.caseSensitive,element:t.props.element,Component:t.props.Component,index:t.props.index,path:t.props.path,loader:t.props.loader,action:t.props.action,errorElement:t.props.errorElement,ErrorBoundary:t.props.ErrorBoundary,hasErrorBoundary:t.props.ErrorBoundary!=null||t.props.errorElement!=null,shouldRevalidate:t.props.shouldRevalidate,handle:t.props.handle,lazy:t.props.lazy};t.props.children&&(l.children=nl(t.props.children,r)),s.push(l)}),s}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function el(){return el=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var t in s)Object.prototype.hasOwnProperty.call(s,t)&&(n[t]=s[t])}return n},el.apply(this,arguments)}function Sh(n,e){if(n==null)return{};var s={},t=Object.keys(n),a,r;for(r=0;r<t.length;r++)a=t[r],!(e.indexOf(a)>=0)&&(s[a]=n[a]);return s}function Ch(n){return!!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)}function _h(n,e){return n.button===0&&(!e||e==="_self")&&!Ch(n)}const Eh=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Th="6";try{window.__reactRouterVersion=Th}catch{}const Ph="startTransition",wo=hu[Ph];function bh(n){let{basename:e,children:s,future:t,window:a}=n,r=x.useRef();r.current==null&&(r.current=Pf({window:a,v5Compat:!0}));let l=r.current,[i,o]=x.useState({action:l.action,location:l.location}),{v7_startTransition:c}=t||{},m=x.useCallback(d=>{c&&wo?wo(()=>o(d)):o(d)},[o,c]);return x.useLayoutEffect(()=>l.listen(m),[l,m]),x.useEffect(()=>gh(t),[t]),x.createElement(kh,{basename:e,children:s,location:i.location,navigationType:i.action,navigator:l,future:t})}const Lh=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Oh=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Qp=x.forwardRef(function(e,s){let{onClick:t,relative:a,reloadDocument:r,replace:l,state:i,target:o,to:c,preventScrollReset:m,viewTransition:d}=e,h=Sh(e,Eh),{basename:y}=x.useContext(xe),w,g=!1;if(typeof c=="string"&&Oh.test(c)&&(w=c,Lh))try{let f=new URL(window.location.href),v=c.startsWith("//")?new URL(f.protocol+c):new URL(c),S=Xl(v.pathname,y);v.origin===f.origin&&S!=null?c=S+v.search+v.hash:g=!0}catch{}let C=eh(c,{relative:a}),u=Nh(c,{replace:l,state:i,target:o,preventScrollReset:m,relative:a,viewTransition:d});function p(f){t&&t(f),f.defaultPrevented||u(f)}return x.createElement("a",el({},h,{href:w||C,onClick:g||r?t:p,ref:s,target:o}))});var ko;(function(n){n.UseScrollRestoration="useScrollRestoration",n.UseSubmit="useSubmit",n.UseSubmitFetcher="useSubmitFetcher",n.UseFetcher="useFetcher",n.useViewTransitionState="useViewTransitionState"})(ko||(ko={}));var xo;(function(n){n.UseFetcher="useFetcher",n.UseFetchers="useFetchers",n.UseScrollRestoration="useScrollRestoration"})(xo||(xo={}));function Nh(n,e){let{target:s,replace:t,state:a,preventScrollReset:r,relative:l,viewTransition:i}=e===void 0?{}:e,o=ei(),c=Se(),m=Wp(n,{relative:l});return x.useCallback(d=>{if(_h(d,s)){d.preventDefault();let h=t!==void 0?t:ua(c)===ua(m);o(n,{replace:h,state:a,preventScrollReset:r,relative:l,viewTransition:i})}},[c,o,m,t,a,s,n,r,l,i])}const zh=[{label:"Start here",links:[{num:"·",label:"Home",path:"/"},{num:"·",label:"Cheat Sheet",path:"/cheatsheet"}]},{label:"Concepts",links:[{num:"1.",label:"Bindings",path:"/concepts/bindings"},{num:"2.",label:"Currying",path:"/concepts/currying"},{num:"3.",label:"Abstractions",path:"/concepts/abstractions"},{num:"4.",label:"Type Inference",path:"/concepts/type-inference"},{num:"5.",label:"Polymorphism",path:"/concepts/polymorphism"},{num:"6.",label:"Pattern Matching",path:"/concepts/pattern-matching"},{num:"7.",label:"Lists",path:"/concepts/lists"},{num:"8.",label:"Higher-Order Functions",path:"/concepts/higher-order"},{num:"9.",label:"Tail Recursion",path:"/concepts/tail-recursion"},{num:"10.",label:"Iteration",path:"/concepts/iteration"}]},{label:"Exercises",links:[{num:"E1.",label:"Bank Account",path:"/exercises/bank"},{num:"E2.",label:"Playlist",path:"/exercises/playlist"},{num:"E3.",label:"Search",path:"/exercises/search"}]}],Rh=[{label:"Home",path:"/"},{label:"Cheat Sheet",path:"/cheatsheet"},{label:"Concepts",path:"/concepts/bindings",matchPrefix:"/concepts/"},{label:"Playground",path:"/playground"}];function So({to:n,active:e,fromPlayground:s,className:t,children:a}){const r=n.startsWith("/playground")||s,l=[t,e?"active":""].filter(Boolean).join(" ");return r?L.jsx("a",{href:n,className:l||void 0,children:a}):L.jsx(Qp,{to:n,className:l||void 0,children:a})}function qp({onMenuClick:n}){const{pathname:e}=Se(),s=a=>a.matchPrefix?e.startsWith(a.matchPrefix):a.path==="/"?e==="/"||e==="/index.html":e===a.path||e===a.path+".html",t=e==="/playground"||e==="/playground.html";return L.jsxs("div",{className:"topbar",children:[L.jsxs(So,{to:"/",fromPlayground:t,className:"site-name",children:[L.jsx("img",{src:"/flaticon.png",alt:"",style:{height:24,width:24,display:"inline-block",verticalAlign:"middle",marginRight:8,position:"relative",top:-1,flexShrink:0}}),"o",L.jsx("span",{children:"Caml"}),"Case"]}),L.jsx("nav",{className:"topbar-nav",children:Rh.map(a=>L.jsx(So,{to:a.path,active:s(a),fromPlayground:t,children:a.label},a.label))}),L.jsx("button",{className:"menu-btn",onClick:n,children:"☰"})]})}function Ih({open:n,onClose:e}){const{pathname:s}=Se(),t=a=>a==="/"?s==="/"||s==="/index.html":s===a||s===a+".html";return L.jsx("aside",{className:`sidebar${n?" open":""}`,id:"sidebar",children:L.jsx("nav",{children:zh.map(a=>L.jsxs("div",{className:"nav-group",children:[L.jsx("span",{className:"nav-label",children:a.label}),a.links.map(r=>L.jsxs(Qp,{to:r.path,className:`nav-link${t(r.path)?" active":""}`,onClick:e,children:[L.jsx("span",{className:"nav-num",children:r.num}),r.label]},r.path))]},a.label))})})}function jh(){const[n,e]=x.useState(!1),{pathname:s}=Se();return x.useEffect(()=>{e(!1),window.scrollTo(0,0)},[s]),L.jsxs(L.Fragment,{children:[L.jsx("div",{className:`overlay${n?" open":""}`,id:"overlay",onClick:()=>e(!1)}),L.jsx(qp,{onMenuClick:()=>e(t=>!t)}),L.jsxs("div",{className:"layout",children:[L.jsx(Ih,{open:n,onClose:()=>e(!1)}),L.jsx("div",{className:"main",children:L.jsx(wh,{})})]})]})}function Kp({title:n,description:e}){return x.useEffect(()=>{if(document.title=n,e){let s=document.querySelector('meta[name="description"]');s||(s=document.createElement("meta"),s.name="description",document.head.appendChild(s)),s.content=e}},[n,e]),null}function Mh({html:n,title:e,description:s}){const t=x.useRef(null),a=ei();return x.useEffect(()=>{const r=t.current;if(!r)return;const l=c=>{const d=c.target.closest("a");if(!d)return;const h=d.getAttribute("href");if(h&&d.target!=="_blank"&&!(/^[a-z]+:/i.test(h)||h.startsWith("//")||h.startsWith("#"))&&!(c.metaKey||c.ctrlKey||c.shiftKey||c.button!==0)){if(c.preventDefault(),h.startsWith("/playground")){window.location.assign(h);return}a(h)}},i=c=>{const d=c.target.closest(".sol-toggle");if(!d)return;d.classList.toggle("open");const h=d.nextElementSibling;h&&h.classList.contains("sol-body")&&h.classList.toggle("open")},o=c=>{var g;const d=c.target.closest(".copy-btn");if(!d)return;const h=d.closest(".code-block"),y=h==null?void 0:h.querySelector("pre");if(!y)return;const w=y.textContent??"";(g=navigator.clipboard)==null||g.writeText(w).then(()=>{const C=d.textContent;d.textContent="copied",setTimeout(()=>{d.textContent=C},1200)}).catch(()=>{})};return r.addEventListener("click",l),r.addEventListener("click",i),r.addEventListener("click",o),()=>{r.removeEventListener("click",l),r.removeEventListener("click",i),r.removeEventListener("click",o)}},[n,a]),L.jsxs(L.Fragment,{children:[L.jsx(Kp,{title:e,description:s}),L.jsx("div",{ref:t,dangerouslySetInnerHTML:{__html:n}})]})}const Dh=`<div class="pg-bar" id="pg-bar">\r
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
<canvas id="test-canvas" style="position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;display:block;"></canvas>\r`,Fh=["/playground/js/codemirror/codemirror.js","/playground/js/codemirror/closebrackets.js","/playground/js/codemirror/matchbrackets.min.js","/playground/js/codemirror/mllike.js","/playground/js/codemirror/searchcursor.js","/playground/js/codemirror/dialog.js","/playground/js/codemirror/search.js","/playground/js/codemirror/show-hint.js"],lr="/playground/js/playground-main.js";function Ah(n){return new Promise((e,s)=>{if(document.querySelector(`script[data-pg-src="${n}"]`)){e();return}const a=document.createElement("script");a.src=n,a.async=!1,a.dataset.pgSrc=n,a.onload=()=>e(),a.onerror=()=>s(new Error(`Failed to load ${n}`)),document.body.appendChild(a)})}function Uh(){const n=x.useRef(null);return x.useEffect(()=>{document.documentElement.setAttribute("data-pg-theme","light");let e=!1;return(async()=>{for(const a of Fh)if(await Ah(a),e)return;const s=document.querySelector(`script[data-pg-src="${lr}"]`);s&&s.remove();const t=document.createElement("script");t.src=lr+"?t="+Date.now(),t.async=!1,t.dataset.pgSrc=lr,document.body.appendChild(t)})().catch(s=>console.error("[playground] load error:",s)),()=>{e=!0}},[]),L.jsxs(L.Fragment,{children:[L.jsx(Kp,{title:"Playground | oCamlCase"}),L.jsx(qp,{onMenuClick:()=>{}}),L.jsx("div",{ref:n,dangerouslySetInnerHTML:{__html:Dh}})]})}const Bh=`<div class="home-hero">\r
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
          <span class="toc-section-count">10 topics</span>\r
        </div>\r
        <div class="toc-items">\r
          <a href="/concepts/bindings" class="toc-item">\r
            <span class="toc-num">1.</span>\r
            Bindings\r
            <span class="toc-desc">Naming values with let and local scope</span>\r
          </a>\r
          <a href="/concepts/currying" class="toc-item">\r
            <span class="toc-num">2.</span>\r
            Currying\r
            <span class="toc-desc">Partial application and multi-arg functions</span>\r
          </a>\r
          <a href="/concepts/abstractions" class="toc-item">\r
            <span class="toc-num">3.</span>\r
            Abstractions\r
            <span class="toc-desc">Hiding complexity behind clean interfaces</span>\r
          </a>\r
          <a href="/concepts/type-inference" class="toc-item">\r
            <span class="toc-num">4.</span>\r
            Type Inference\r
            <span class="toc-desc">How OCaml derives types without annotations</span>\r
          </a>\r
          <a href="/concepts/polymorphism" class="toc-item">\r
            <span class="toc-num">5.</span>\r
            Polymorphism\r
            <span class="toc-desc">Generic functions and type variables</span>\r
          </a>\r
          <a href="/concepts/pattern-matching" class="toc-item">\r
            <span class="toc-num">6.</span>\r
            Pattern Matching\r
            <span class="toc-desc">Destructuring values with match expressions</span>\r
          </a>\r
          <a href="/concepts/lists" class="toc-item">\r
            <span class="toc-num">7.</span>\r
            Lists\r
            <span class="toc-desc">Cons, pattern matching, and basic list operations</span>\r
          </a>\r
          <a href="/concepts/higher-order" class="toc-item">\r
            <span class="toc-num">8.</span>\r
            Higher-Order Functions\r
            <span class="toc-desc">map, filter, fold and functions as values</span>\r
          </a>\r
          <a href="/concepts/tail-recursion" class="toc-item">\r
            <span class="toc-num">9.</span>\r
            Tail Recursion\r
            <span class="toc-desc">Writing stack-safe recursive functions</span>\r
          </a>\r
          <a href="/concepts/iteration" class="toc-item">\r
            <span class="toc-num">10.</span>\r
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
    </div>`,Hh=`<div class="article">
      <div class="page-header">
        <div class="page-label">Concept 1 of 10</div>
        <h1 class="page-title">Bindings</h1>
        <p class="page-intro">A binding associates a name with a value. In OCaml, <code>let</code> is the only way to introduce a name, and the resulting binding is immutable by default.</p>
      </div>

      <h2>The let keyword</h2>
      <p>The form <code>let &lt;name&gt; = &lt;expr&gt;</code> evaluates the expression on the right and gives the result a name. The name does not refer to a memory cell: it refers directly to the value. There is no assignment, no reassignment, and no notion of a variable in the C sense.</p>

      <div class="two-col lean">
        <div>
          <p>At the top level of a file or a REPL session, a <code>let</code> introduces a name into the surrounding environment. Subsequent code can use that name. The compiler also infers and prints the type, so you immediately see what kind of value you bound.</p>
          <div class="callout callout-key">
            <div class="callout-title">Key point</div>
            <p>A binding is not a variable. It is a fixed link between a name and a value. To get a different value associated with the same name, you write a new <code>let</code>, which produces a new binding.</p>
          </div>
        </div>
        <div class="sticky">
          <div class="code-block">
            <div class="code-top">
              <span class="code-fname">basic.ml</span>
              <button class="copy-btn" onclick="copyCode(this)">copy</button>
            </div>
<pre><span class="cmt">(* Bind a name to a value *)</span>
<span class="kw">let</span> greeting = <span class="str">"hello"</span>
<span class="cmt">(* greeting : string *)</span>

<span class="kw">let</span> answer = <span class="num">42</span>
<span class="cmt">(* answer : int *)</span>

<span class="cmt">(* Function bindings work the same way *)</span>
<span class="kw">let</span> <span class="fn">square</span> x = x * x
<span class="cmt">(* square : int -> int *)</span></pre>
          </div>
        </div>
      </div>

      <h2>let ... in: local bindings</h2>
      <p>Inside an expression, <code>let &lt;name&gt; = &lt;expr1&gt; in &lt;expr2&gt;</code> introduces a name that is in scope only within <code>expr2</code>. The whole form is itself an expression and evaluates to whatever <code>expr2</code> evaluates to.</p>
      <p>This is how you give names to intermediate results inside a function body. Each <code>let ... in</code> nests inside the previous one, building up a small local environment.</p>

      <div class="two-col lean">
        <div>
          <p>Local bindings are not visible outside their <code>in</code> clause. After the function returns, the names are gone. This is normal lexical scoping, but it is worth saying out loud because OCaml has no separate <code>var</code> or <code>const</code> form.</p>
        </div>
        <div class="sticky">
          <div class="code-block">
            <div class="code-top">
              <span class="code-fname">local.ml</span>
              <button class="copy-btn" onclick="copyCode(this)">copy</button>
            </div>
<pre><span class="kw">let</span> <span class="fn">hypotenuse</span> a b =
  <span class="kw">let</span> a2 = a *. a <span class="kw">in</span>
  <span class="kw">let</span> b2 = b *. b <span class="kw">in</span>
  <span class="ty">Float</span>.<span class="fn">sqrt</span> (a2 +. b2)

<span class="cmt">(* a2 and b2 are scoped to the body.
   They do not exist outside hypotenuse. *)</span></pre>
          </div>
        </div>
      </div>

      <h2>Shadowing</h2>
      <p>Writing a second <code>let</code> with the same name does not mutate the original binding. It introduces a new binding that <em>shadows</em> the old one. Code written before the shadow still sees the original value; code after sees the new one.</p>
      <p>This is how you express "update" in a language without assignment. The old value is unchanged; you just stop referring to it.</p>

      <div class="code-block inline">
        <div class="code-top">
          <span class="code-fname">shadow.ml</span>
          <button class="copy-btn" onclick="copyCode(this)">copy</button>
        </div>
<pre><span class="kw">let</span> x = <span class="num">1</span>
<span class="kw">let</span> <span class="fn">show_first</span> () = x  <span class="cmt">(* captures the original 1 *)</span>

<span class="kw">let</span> x = <span class="num">2</span>           <span class="cmt">(* shadows: a new binding for x *)</span>

<span class="fn">show_first</span> ()        <span class="cmt">(* still 1, not 2 *)</span>
x                    <span class="cmt">(* 2 *)</span></pre>
      </div>

      <h2>Mutability is opt-in</h2>
      <p>If you genuinely need a value that changes over time, OCaml gives you <code>ref</code>. A <code>ref</code> is a small mutable cell. The binding to the cell is still immutable, but the cell's contents can be updated with <code>:=</code> and read with <code>!</code>.</p>
      <p>In practice, idiomatic OCaml leans on immutable bindings and recursion or higher-order functions for what other languages do with loops and reassignment. Reach for <code>ref</code> only when you truly need state.</p>

      <div class="code-block inline">
        <div class="code-top">
          <span class="code-fname">refs.ml</span>
          <button class="copy-btn" onclick="copyCode(this)">copy</button>
        </div>
<pre><span class="kw">let</span> counter = <span class="kw">ref</span> <span class="num">0</span>
<span class="cmt">(* counter : int ref *)</span>

counter := !counter + <span class="num">1</span>
counter := !counter + <span class="num">1</span>

!counter             <span class="cmt">(* 2 *)</span>

<span class="cmt">(* The binding \`counter\` still points to the same cell.
   What changed is the cell's contents, not the binding. *)</span></pre>
      </div>

      <div class="callout callout-tip">
        <div class="callout-title">Good practice</div>
        <p>Default to plain <code>let</code> bindings. They are easier to reason about, friendlier to the type checker, and avoid the class of bugs that come with shared mutable state.</p>
      </div>

      <div class="page-footer">
        <a href="/">← Home</a>
        <a href="/concepts/currying">Next: Currying →</a>
      </div>
    </div>`,$h=`<div class="article">\r
      <div class="page-header">\r
        <div class="page-label">Concept 2 of 10</div>\r
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
        <a href="/concepts/bindings">← Bindings</a>\r
        <a href="/concepts/abstractions">Next: Abstractions →</a>\r
      </div>\r
    </div>`,Vh=`<div class="article">\r
      <div class="page-header">\r
        <div class="page-label">Concept 3 of 10</div>\r
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
        <a href="/concepts/type-inference">Next: Type Inference →</a>\r
      </div>\r
    </div>`,Qh=`<div class="article">
      <div class="page-header">
        <div class="page-label">Concept 4 of 10</div>
        <h1 class="page-title">Type Inference</h1>
        <p class="page-intro">OCaml is statically typed but you rarely write type annotations. The compiler figures out the most general type that makes your program well-typed and uses that.</p>
      </div>

      <h2>Types without annotations</h2>
      <p>When you define a binding, OCaml inspects how the value is used and assigns it a type. The algorithm that drives this is Hindley-Milner inference: every expression collects constraints from the operators and functions applied to it, and the compiler solves them.</p>

      <div class="two-col lean">
        <div>
          <p>The expression <code>x + 1</code> tells the compiler that <code>x</code> must be an <code>int</code>, because <code>+</code> on integers has type <code>int -&gt; int -&gt; int</code>. From there the type of the whole function follows.</p>
          <div class="callout callout-key">
            <div class="callout-title">Key point</div>
            <p>Inference is not guessing. The compiler computes the unique most general type that is consistent with every use of every name. If no such type exists, you get a type error instead of a silent runtime failure.</p>
          </div>
        </div>
        <div class="sticky">
          <div class="code-block">
            <div class="code-top">
              <span class="code-fname">infer.ml</span>
              <button class="copy-btn" onclick="copyCode(this)">copy</button>
            </div>
<pre><span class="kw">let</span> <span class="fn">incr</span> x = x + <span class="num">1</span>
<span class="cmt">(* incr : int -> int *)</span>

<span class="kw">let</span> <span class="fn">greet</span> name = <span class="str">"hi, "</span> ^ name
<span class="cmt">(* greet : string -> string *)</span>

<span class="kw">let</span> <span class="fn">avg</span> a b = (a +. b) /. <span class="num">2.0</span>
<span class="cmt">(* avg : float -> float -> float *)</span></pre>
          </div>
        </div>
      </div>

      <h2>How constraints propagate</h2>
      <p>Each operator and function used in an expression contributes a constraint. <code>+</code> forces its arguments to be <code>int</code>. <code>+.</code> forces them to be <code>float</code>. <code>^</code> forces strings. The result type of one call becomes the input type of the next.</p>
      <p>This is why even small changes to a function body can change its inferred type. Swapping <code>+</code> for <code>+.</code> moves the whole signature from integers to floats without you touching any annotations.</p>

      <div class="two-col lean">
        <div>
          <p>OCaml does not silently coerce between numeric types. The arithmetic operator you choose determines the type, and the type of every variable in scope follows from there.</p>
        </div>
        <div class="sticky">
          <div class="code-block">
            <div class="code-top">
              <span class="code-fname">propagate.ml</span>
              <button class="copy-btn" onclick="copyCode(this)">copy</button>
            </div>
<pre><span class="kw">let</span> <span class="fn">double_int</span> x = x + x
<span class="cmt">(* double_int : int -> int *)</span>

<span class="kw">let</span> <span class="fn">double_float</span> x = x +. x
<span class="cmt">(* double_float : float -> float *)</span>

<span class="cmt">(* The body picks the type. Here, comparing
   to a string forces the input to be a string. *)</span>
<span class="kw">let</span> <span class="fn">is_yes</span> s = s = <span class="str">"yes"</span>
<span class="cmt">(* is_yes : string -> bool *)</span></pre>
          </div>
        </div>
      </div>

      <h2>Type variables when nothing constrains</h2>
      <p>If a function body uses an argument in a way that does not pin down its type, OCaml leaves the type open. It introduces a <em>type variable</em>, written <code>'a</code>, <code>'b</code>, and so on, to stand for "any type, chosen later".</p>
      <p>This is the foundation of polymorphism, covered next. For now, the takeaway is that the compiler does not invent a concrete type when it does not need one. It keeps the binding as general as the program allows.</p>

      <div class="code-block inline">
        <div class="code-top">
          <span class="code-fname">generic.ml</span>
          <button class="copy-btn" onclick="copyCode(this)">copy</button>
        </div>
<pre><span class="kw">let</span> <span class="fn">identity</span> x = x
<span class="cmt">(* identity : 'a -> 'a *)</span>

<span class="kw">let</span> <span class="fn">first</span> (a, _) = a
<span class="cmt">(* first : 'a * 'b -> 'a *)</span>

<span class="kw">let</span> <span class="fn">const</span> x _ = x
<span class="cmt">(* const : 'a -> 'b -> 'a *)</span></pre>
      </div>

      <h2>Annotations as a tool, not a requirement</h2>
      <p>You can write a type annotation anywhere, but you usually do not need to. Annotations are useful when you want to document intent at a module boundary, narrow an inferred type that came out more general than you wanted, or get a clearer error message in a tricky function.</p>

      <div class="code-block inline">
        <div class="code-top">
          <span class="code-fname">annotate.ml</span>
          <button class="copy-btn" onclick="copyCode(this)">copy</button>
        </div>
<pre><span class="cmt">(* On the binding *)</span>
<span class="kw">let</span> <span class="fn">incr</span> : int -> int = <span class="kw">fun</span> x -> x + <span class="num">1</span>

<span class="cmt">(* On a parameter *)</span>
<span class="kw">let</span> <span class="fn">incr</span> (x : int) = x + <span class="num">1</span>

<span class="cmt">(* On the result *)</span>
<span class="kw">let</span> <span class="fn">incr</span> x : int = x + <span class="num">1</span>

<span class="cmt">(* All three produce the same type: int -> int *)</span></pre>
      </div>

      <div class="callout callout-tip">
        <div class="callout-title">Good practice</div>
        <p>Let the compiler infer types in the small. Add annotations at module signatures and on tricky helpers. The combination keeps everyday code clean while preserving a clear contract at the boundaries.</p>
      </div>

      <div class="page-footer">
        <a href="/concepts/abstractions">← Abstractions</a>
        <a href="/concepts/polymorphism">Next: Polymorphism →</a>
      </div>
    </div>`,qh=`<div class="article">
      <div class="page-header">
        <div class="page-label">Concept 5 of 10</div>
        <h1 class="page-title">Polymorphism</h1>
        <p class="page-intro">When a function does not depend on the concrete type of an argument, OCaml gives it a polymorphic type. The same function then works for any type that fits the shape of its signature.</p>
      </div>

      <h2>Type variables</h2>
      <p>A type written with a leading apostrophe, like <code>'a</code>, is a <em>type variable</em>. It stands for "some type, the same one wherever this variable appears". When a function's inferred type contains type variables, the function is polymorphic.</p>

      <div class="two-col lean">
        <div>
          <p>The identity function uses its argument only by returning it. Nothing in the body pins the type, so the compiler infers <code>'a -&gt; 'a</code>: any type goes in, the same type comes out. The two occurrences of <code>'a</code> are linked.</p>
          <div class="callout callout-key">
            <div class="callout-title">Key point</div>
            <p>Type variables are not wildcards. <code>'a -&gt; 'a</code> means input and output have the same type. <code>'a -&gt; 'b</code> means they may differ.</p>
          </div>
        </div>
        <div class="sticky">
          <div class="code-block">
            <div class="code-top">
              <span class="code-fname">poly.ml</span>
              <button class="copy-btn" onclick="copyCode(this)">copy</button>
            </div>
<pre><span class="kw">let</span> <span class="fn">identity</span> x = x
<span class="cmt">(* identity : 'a -> 'a *)</span>

<span class="fn">identity</span> <span class="num">42</span>          <span class="cmt">(* 42, used as int *)</span>
<span class="fn">identity</span> <span class="str">"hi"</span>        <span class="cmt">(* "hi", used as string *)</span>
<span class="fn">identity</span> [<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>]   <span class="cmt">(* int list *)</span>

<span class="cmt">(* Each use picks a concrete type
   for 'a at that call site. *)</span></pre>
          </div>
        </div>
      </div>

      <h2>Parametric polymorphism</h2>
      <p>OCaml's polymorphism is <em>parametric</em>: a polymorphic function behaves the same way for every type it could be called with. It cannot inspect the type at runtime and branch on it. This makes the type variable a real promise: the compiler enforces that the body works uniformly.</p>
      <p>This is what allows so much of the standard library to be written once and used with any element type. <code>List.length</code> works on a list of integers, a list of strings, or a list of records, with no overloading and no runtime dispatch.</p>

      <div class="two-col lean">
        <div>
          <p>The signatures advertise this directly. <code>List.length</code> is <code>'a list -&gt; int</code>: it works on a list of any element type and returns an integer. <code>List.rev</code> is <code>'a list -&gt; 'a list</code>: the element type is preserved.</p>
        </div>
        <div class="sticky">
          <div class="code-block">
            <div class="code-top">
              <span class="code-fname">stdlib.ml</span>
              <button class="copy-btn" onclick="copyCode(this)">copy</button>
            </div>
<pre><span class="ty">List</span>.<span class="fn">length</span> [<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>]
<span class="cmt">(* 3; 'a is int here *)</span>

<span class="ty">List</span>.<span class="fn">length</span> [<span class="str">"a"</span>; <span class="str">"b"</span>]
<span class="cmt">(* 2; 'a is string here *)</span>

<span class="ty">List</span>.<span class="fn">rev</span> [<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>]
<span class="cmt">(* [3; 2; 1], type int list -> int list *)</span>

<span class="kw">let</span> <span class="fn">swap</span> (a, b) = (b, a)
<span class="cmt">(* swap : 'a * 'b -> 'b * 'a *)</span></pre>
          </div>
        </div>
      </div>

      <h2>Polymorphism with higher-order functions</h2>
      <p>Polymorphic types come into their own with higher-order functions. <code>List.map</code> has type <code>('a -&gt; 'b) list... </code> (more precisely, <code>('a -&gt; 'b) -&gt; 'a list -&gt; 'b list</code>). Two type variables make the relationship explicit: it takes a function from one element type to another and a list of the input type, and returns a list of the output type.</p>

      <div class="code-block inline">
        <div class="code-top">
          <span class="code-fname">map.ml</span>
          <button class="copy-btn" onclick="copyCode(this)">copy</button>
        </div>
<pre><span class="cmt">(* List.map : ('a -> 'b) -> 'a list -> 'b list *)</span>

<span class="ty">List</span>.<span class="fn">map</span> <span class="ty">String</span>.<span class="fn">length</span> [<span class="str">"hi"</span>; <span class="str">"world"</span>]
<span class="cmt">(* [2; 5] with 'a = string, 'b = int *)</span>

<span class="ty">List</span>.<span class="fn">map</span> (<span class="kw">fun</span> x -> x * x) [<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>]
<span class="cmt">(* [1; 4; 9] with 'a = int, 'b = int *)</span></pre>
      </div>

      <h2>Generalization and the value restriction</h2>
      <p>OCaml only generalizes a binding to a polymorphic type when the right-hand side is a value: a function literal, a constant, or another value-shaped expression. Bindings whose right-hand side performs computation, especially with mutable cells, get a less general type to keep the type system sound.</p>
      <p>You usually do not have to think about this: ordinary <code>let f x = ...</code> definitions are always values (they are functions) and become polymorphic without effort. The restriction shows up mainly with partial applications that involve <code>ref</code>.</p>

      <div class="code-block inline">
        <div class="code-top">
          <span class="code-fname">generalize.ml</span>
          <button class="copy-btn" onclick="copyCode(this)">copy</button>
        </div>
<pre><span class="cmt">(* Function definition: fully polymorphic *)</span>
<span class="kw">let</span> <span class="fn">id</span> x = x
<span class="cmt">(* id : 'a -> 'a *)</span>

<span class="cmt">(* Value: polymorphic *)</span>
<span class="kw">let</span> empty = []
<span class="cmt">(* empty : 'a list *)</span>

<span class="cmt">(* Computation involving a ref:
   not generalized, type variable becomes weak *)</span>
<span class="kw">let</span> store = <span class="kw">ref</span> []
<span class="cmt">(* store : '_weak1 list ref *)</span></pre>
      </div>

      <div class="callout callout-tip">
        <div class="callout-title">Good practice</div>
        <p>Let polymorphism happen on its own. Write functions in their most natural form, and the compiler will give them the most general type they support. Reach for annotations only to narrow a type, never to widen one.</p>
      </div>

      <div class="page-footer">
        <a href="/concepts/type-inference">← Type Inference</a>
        <a href="/concepts/pattern-matching">Next: Pattern Matching →</a>
      </div>
    </div>`,Kh=`<div class="article">\r
      <div class="page-header">\r
        <div class="page-label">Concept 6 of 10</div>\r
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
        <a href="/concepts/polymorphism">← Polymorphism</a>\r
        <a href="/concepts/lists">Next: Lists →</a>\r
      </div>\r
    </div>`,Gh=`<div class="article">
      <div class="page-header">
        <div class="page-label">Concept 7 of 10</div>
        <h1 class="page-title">Lists</h1>
        <p class="page-intro">A list in OCaml is an immutable, singly-linked sequence of values of the same type. Most everyday data processing in OCaml passes through lists and the small set of functions that operate on them.</p>
      </div>

      <h2>Construction</h2>
      <p>A list is either empty (<code>[]</code>) or a head element followed by a tail list (<code>head :: tail</code>). The <code>::</code> operator, called <em>cons</em>, prepends an element to an existing list. The literal syntax <code>[1; 2; 3]</code> is sugar for <code>1 :: 2 :: 3 :: []</code>.</p>

      <div class="two-col lean">
        <div>
          <p>All elements of a list have the same type. The type is written <code>'a list</code>, where <code>'a</code> is the element type. A list of integers is <code>int list</code>, a list of strings is <code>string list</code>, and an empty list is polymorphic until used.</p>
          <div class="callout callout-key">
            <div class="callout-title">Key point</div>
            <p>Lists are immutable. Cons does not modify the tail; it produces a new list that shares the tail with the old one. This sharing is what makes immutable lists cheap to build.</p>
          </div>
        </div>
        <div class="sticky">
          <div class="code-block">
            <div class="code-top">
              <span class="code-fname">build.ml</span>
              <button class="copy-btn" onclick="copyCode(this)">copy</button>
            </div>
<pre><span class="kw">let</span> empty = []
<span class="cmt">(* empty : 'a list *)</span>

<span class="kw">let</span> nums = [<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>]
<span class="cmt">(* int list *)</span>

<span class="cmt">(* The same list with cons *)</span>
<span class="kw">let</span> nums' = <span class="num">1</span> :: <span class="num">2</span> :: <span class="num">3</span> :: []

<span class="cmt">(* Prepend; original list is unchanged *)</span>
<span class="kw">let</span> more = <span class="num">0</span> :: nums
<span class="cmt">(* more = [0; 1; 2; 3]
   nums  = [1; 2; 3] still *)</span></pre>
          </div>
        </div>
      </div>

      <h2>Pattern matching on lists</h2>
      <p>Pattern matching is the natural way to take a list apart. The two cases mirror the two ways a list can be built: empty or cons. Most list-processing functions follow the same shape: handle the empty case, then handle the cons case recursively.</p>

      <div class="two-col lean">
        <div>
          <p>The empty pattern <code>[]</code> matches the empty list. The cons pattern <code>x :: xs</code> matches any non-empty list, binding the first element to <code>x</code> and the rest to <code>xs</code>. Together they cover every possible list, and the compiler will warn if you miss either.</p>
        </div>
        <div class="sticky">
          <div class="code-block">
            <div class="code-top">
              <span class="code-fname">recurse.ml</span>
              <button class="copy-btn" onclick="copyCode(this)">copy</button>
            </div>
<pre><span class="kw">let rec</span> <span class="fn">length</span> = <span class="kw">function</span>
  | [] -> <span class="num">0</span>
  | _ :: xs -> <span class="num">1</span> + <span class="fn">length</span> xs

<span class="kw">let rec</span> <span class="fn">sum</span> = <span class="kw">function</span>
  | [] -> <span class="num">0</span>
  | x :: xs -> x + <span class="fn">sum</span> xs

<span class="fn">length</span> [<span class="num">10</span>; <span class="num">20</span>; <span class="num">30</span>]   <span class="cmt">(* 3 *)</span>
<span class="fn">sum</span>    [<span class="num">10</span>; <span class="num">20</span>; <span class="num">30</span>]   <span class="cmt">(* 60 *)</span></pre>
          </div>
        </div>
      </div>

      <h2>Basic functions on lists</h2>
      <p>The standard library's <code>List</code> module covers the operations you reach for most often. A handful of these handle the bulk of everyday work.</p>

      <div class="code-block inline">
        <div class="code-top">
          <span class="code-fname">list_basics.ml</span>
          <button class="copy-btn" onclick="copyCode(this)">copy</button>
        </div>
<pre><span class="ty">List</span>.<span class="fn">length</span> [<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>]
<span class="cmt">(* 3 *)</span>

<span class="ty">List</span>.<span class="fn">rev</span> [<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>]
<span class="cmt">(* [3; 2; 1] *)</span>

<span class="ty">List</span>.<span class="fn">append</span> [<span class="num">1</span>; <span class="num">2</span>] [<span class="num">3</span>; <span class="num">4</span>]
<span class="cmt">(* [1; 2; 3; 4]. Also written [1; 2] @ [3; 4] *)</span>

<span class="ty">List</span>.<span class="fn">hd</span> [<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>]
<span class="cmt">(* 1, raises on empty lists *)</span>

<span class="ty">List</span>.<span class="fn">tl</span> [<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>]
<span class="cmt">(* [2; 3], raises on empty lists *)</span>

<span class="ty">List</span>.<span class="fn">nth</span> [<span class="num">10</span>; <span class="num">20</span>; <span class="num">30</span>] <span class="num">1</span>
<span class="cmt">(* 20, zero-indexed *)</span></pre>
      </div>

      <h2>Map, filter, and fold</h2>
      <p>Three higher-order functions cover most list transformations. <code>List.map</code> applies a function to every element. <code>List.filter</code> keeps the elements that satisfy a predicate. <code>List.fold_left</code> reduces a list to a single value by accumulating from left to right.</p>

      <div class="two-col lean">
        <div>
          <p>Together with the pipe operator, these compose into readable pipelines. Each step is one transformation, and the type of the value flowing through changes only when you map to a new element type.</p>
          <div class="callout callout-warn">
            <div class="callout-title">Watch out</div>
            <p><code>List.hd</code>, <code>List.tl</code>, and <code>List.nth</code> raise exceptions on inputs that do not fit. For total alternatives, use the <code>_opt</code> variants where they exist, or pattern match yourself.</p>
          </div>
        </div>
        <div class="sticky">
          <div class="code-block">
            <div class="code-top">
              <span class="code-fname">pipeline.ml</span>
              <button class="copy-btn" onclick="copyCode(this)">copy</button>
            </div>
<pre>[<span class="num">1</span>; <span class="num">2</span>; <span class="num">3</span>; <span class="num">4</span>; <span class="num">5</span>]
|> <span class="ty">List</span>.<span class="fn">filter</span> (<span class="kw">fun</span> x -> x <span class="kw">mod</span> <span class="num">2</span> = <span class="num">0</span>)
|> <span class="ty">List</span>.<span class="fn">map</span> (<span class="kw">fun</span> x -> x * x)
|> <span class="ty">List</span>.<span class="fn">fold_left</span> (+) <span class="num">0</span>
<span class="cmt">(* 4 + 16 = 20 *)</span>

<span class="ty">List</span>.<span class="fn">map</span> <span class="ty">String</span>.<span class="fn">length</span> [<span class="str">"hi"</span>; <span class="str">"there"</span>]
<span class="cmt">(* [2; 5] *)</span>

<span class="ty">List</span>.<span class="fn">filter</span> ((&lt;) <span class="num">0</span>) [-<span class="num">1</span>; <span class="num">2</span>; -<span class="num">3</span>; <span class="num">4</span>]
<span class="cmt">(* [2; 4] *)</span></pre>
          </div>
        </div>
      </div>

      <div class="callout callout-tip">
        <div class="callout-title">Good practice</div>
        <p>Reach for <code>map</code>, <code>filter</code>, and <code>fold_left</code> before writing an explicit recursion. They express intent more directly and are tail-recursive where it matters.</p>
      </div>

      <div class="page-footer">
        <a href="/concepts/pattern-matching">← Pattern Matching</a>
        <a href="/concepts/higher-order">Next: Higher-Order Functions →</a>
      </div>
    </div>`,Yh=`<div class="article">\r
      <div class="page-header">\r
        <div class="page-label">Concept 8 of 10</div>\r
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
        <a href="/concepts/lists">← Lists</a>\r
        <a href="/concepts/tail-recursion">Next: Tail Recursion →</a>\r
      </div>\r
    </div>`,Xh=`<div class="article">\r
      <div class="page-header">\r
        <div class="page-label">Concept 9 of 10</div>\r
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
    </div>`,Jh=`<div class="article">\r
      <div class="page-header">\r
        <div class="page-label">Concept 10 of 10</div>\r
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
    </div>`,Zh=`<div class="article">\r
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
    </div>`,nm=`<div class="article">\r
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
    </div>`,em=`<div class="article">\r
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
    </div>`,Co=[{path:"/",html:Bh,title:"Learn OCaml by Example | oCamlCase",description:"A practical guide to OCaml with functional patterns, type system features, and coding exercises. Written for programmers who want to understand the language."},{path:"/cheatsheet",html:Wh,title:"Cheat Sheet | oCamlCase",description:"Quick reference for OCaml syntax: bindings, types, functions, pattern matching, lists, modules, and I/O."},{path:"/concepts/bindings",html:Hh,title:"Bindings | oCamlCase",description:"Understand let bindings in OCaml: how names are linked to values, local let ... in scoping, shadowing as a substitute for assignment, and opt-in mutability with refs."},{path:"/concepts/currying",html:$h,title:"Currying | oCamlCase",description:"Understand currying in OCaml: how every function takes exactly one argument, what partial application is, and how labeled arguments change the picture."},{path:"/concepts/abstractions",html:Vh,title:"Abstractions | oCamlCase",description:"Learn how OCaml uses anonymous functions (abstractions) as first-class values, and how let bindings are just syntactic sugar for naming them."},{path:"/concepts/type-inference",html:Qh,title:"Type Inference | oCamlCase",description:"How OCaml infers the most general type for every binding using Hindley-Milner: how constraints propagate, when type variables appear, and when annotations help."},{path:"/concepts/polymorphism",html:qh,title:"Polymorphism | oCamlCase",description:"Parametric polymorphism in OCaml: type variables, generic functions like List.length and List.map, and the value restriction that keeps the type system sound."},{path:"/concepts/pattern-matching",html:Kh,title:"Pattern Matching | oCamlCase",description:"Learn pattern matching in OCaml: the match expression, variant types, exhaustiveness checking, guards, and nested patterns."},{path:"/concepts/lists",html:Gh,title:"Lists | oCamlCase",description:"Work with OCaml lists: cons-based construction, pattern matching on empty and non-empty lists, and the standard List functions including map, filter, and fold_left."},{path:"/concepts/higher-order",html:Yh,title:"Higher-Order Functions | oCamlCase",description:"Learn higher-order functions in OCaml: map, filter, fold, the pipe operator, and how passing functions as arguments compares to dependency injection in OOP."},{path:"/concepts/tail-recursion",html:Xh,title:"Tail Recursion | oCamlCase",description:"Understand tail recursion in OCaml: what tail position means, how the compiler optimizes tail calls, the accumulator pattern, and divergence."},{path:"/concepts/iteration",html:Jh,title:"Iteration | oCamlCase",description:"Learn definite and indefinite iteration in OCaml: how to apply a function n times with iter, and how to search for the first value satisfying a predicate with first."},{path:"/exercises/bank",html:Zh,title:"Bank Account | oCamlCase",description:"Practice OCaml variant types, immutable records, and list folds by building a bank account model that derives balance from transaction history."},{path:"/exercises/playlist",html:nm,title:"Playlist | oCamlCase",description:"Practice OCaml list operations, higher-order functions, and tuple destructuring by building a music playlist with filtering, formatting, and duration calculation."},{path:"/exercises/search",html:em,title:"Search | oCamlCase",description:"Practice OCaml iteration patterns: implement iter for definite repetition and first for indefinite search, then use them to solve concrete problems with partial application."}];function sm(){return L.jsx(bh,{children:L.jsxs(xh,{children:[L.jsx(Pe,{path:"/playground",element:L.jsx(Uh,{})}),L.jsx(Pe,{path:"/playground.html",element:L.jsx(rr,{to:"/playground",replace:!0})}),L.jsxs(Pe,{element:L.jsx(jh,{}),children:[Co.map(n=>L.jsx(Pe,{path:n.path,element:L.jsx(Mh,{html:n.html,title:n.title,description:n.description})},n.path)),Co.filter(n=>n.path!=="/").map(n=>L.jsx(Pe,{path:n.path+".html",element:L.jsx(rr,{to:n.path,replace:!0})},n.path+".html")),L.jsx(Pe,{path:"/index.html",element:L.jsx(rr,{to:"/",replace:!0})})]})]})})}Mp(document.getElementById("root")).render(L.jsx(x.StrictMode,{children:L.jsx(sm,{})}));
