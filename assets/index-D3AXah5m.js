(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Aa="165",Ac=0,Xa=1,Rc=2,Ol=1,Bl=2,gn=3,Un=0,Fe=1,We=2,Ln=0,Ai=1,qa=2,Ya=3,Ka=4,Cc=5,jn=100,Pc=101,Lc=102,Ic=103,Dc=104,Uc=200,Nc=201,Fc=202,Oc=203,la=204,ca=205,Bc=206,zc=207,Hc=208,kc=209,Gc=210,Vc=211,Wc=212,Xc=213,qc=214,Yc=0,Kc=1,$c=2,js=3,jc=4,Zc=5,Jc=6,Qc=7,Ra=0,th=1,eh=2,In=0,nh=1,ih=2,sh=3,zl=4,rh=5,ah=6,oh=7,Hl=300,Li=301,Ii=302,ha=303,ua=304,ur=306,da=1e3,Jn=1001,fa=1002,Xe=1003,lh=1004,ms=1005,Je=1006,Mr=1007,Qn=1008,Nn=1009,ch=1010,hh=1011,Zs=1012,kl=1013,Di=1014,Pn=1015,dr=1016,Gl=1017,Vl=1018,Ui=1020,uh=35902,dh=1021,fh=1022,on=1023,ph=1024,mh=1025,Ri=1026,Ni=1027,_h=1028,Wl=1029,gh=1030,Xl=1031,ql=1033,Sr=33776,yr=33777,Er=33778,wr=33779,$a=35840,ja=35841,Za=35842,Ja=35843,Qa=36196,to=37492,eo=37496,no=37808,io=37809,so=37810,ro=37811,ao=37812,oo=37813,lo=37814,co=37815,ho=37816,uo=37817,fo=37818,po=37819,mo=37820,_o=37821,Tr=36492,go=36494,xo=36495,xh=36283,vo=36284,Mo=36285,So=36286,vh=3200,Mh=3201,Yl=0,Sh=1,Rn="",je="srgb",Bn="srgb-linear",Ca="display-p3",fr="display-p3-linear",Js="linear",se="srgb",Qs="rec709",tr="p3",ii=7680,yo=519,yh=512,Eh=513,wh=514,Kl=515,Th=516,bh=517,Ah=518,Rh=519,pa=35044,Eo="300 es",xn=2e3,er=2001;class Bi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}}const Te=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],br=Math.PI/180,ma=180/Math.PI;function Dn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Te[s&255]+Te[s>>8&255]+Te[s>>16&255]+Te[s>>24&255]+"-"+Te[t&255]+Te[t>>8&255]+"-"+Te[t>>16&15|64]+Te[t>>24&255]+"-"+Te[e&63|128]+Te[e>>8&255]+"-"+Te[e>>16&255]+Te[e>>24&255]+Te[n&255]+Te[n>>8&255]+Te[n>>16&255]+Te[n>>24&255]).toLowerCase()}function Ue(s,t,e){return Math.max(t,Math.min(e,s))}function Ch(s,t){return(s%t+t)%t}function Ar(s,t,e){return(1-e)*s+e*t}function an(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ne(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class Rt{constructor(t=0,e=0){Rt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ue(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Lt{constructor(t,e,n,i,r,o,a,l,c){Lt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],f=n[7],p=n[2],m=n[5],_=n[8],g=i[0],d=i[3],u=i[6],w=i[1],E=i[4],T=i[7],N=i[2],R=i[5],A=i[8];return r[0]=o*g+a*w+l*N,r[3]=o*d+a*E+l*R,r[6]=o*u+a*T+l*A,r[1]=c*g+h*w+f*N,r[4]=c*d+h*E+f*R,r[7]=c*u+h*T+f*A,r[2]=p*g+m*w+_*N,r[5]=p*d+m*E+_*R,r[8]=p*u+m*T+_*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],f=h*o-a*c,p=a*l-h*r,m=c*r-o*l,_=e*f+n*p+i*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return t[0]=f*g,t[1]=(i*c-h*n)*g,t[2]=(a*n-i*o)*g,t[3]=p*g,t[4]=(h*e-i*l)*g,t[5]=(i*r-a*e)*g,t[6]=m*g,t[7]=(n*l-c*e)*g,t[8]=(o*e-n*r)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Rr.makeScale(t,e)),this}rotate(t){return this.premultiply(Rr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Rr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Rr=new Lt;function $l(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function nr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Ph(){const s=nr("canvas");return s.style.display="block",s}const wo={};function Pa(s){s in wo||(wo[s]=!0,console.warn(s))}function Lh(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const To=new Lt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),bo=new Lt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),_s={[Bn]:{transfer:Js,primaries:Qs,toReference:s=>s,fromReference:s=>s},[je]:{transfer:se,primaries:Qs,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[fr]:{transfer:Js,primaries:tr,toReference:s=>s.applyMatrix3(bo),fromReference:s=>s.applyMatrix3(To)},[Ca]:{transfer:se,primaries:tr,toReference:s=>s.convertSRGBToLinear().applyMatrix3(bo),fromReference:s=>s.applyMatrix3(To).convertLinearToSRGB()}},Ih=new Set([Bn,fr]),Jt={enabled:!0,_workingColorSpace:Bn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Ih.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const n=_s[t].toReference,i=_s[e].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return _s[s].primaries},getTransfer:function(s){return s===Rn?Js:_s[s].transfer}};function Ci(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Cr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let si;class Dh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{si===void 0&&(si=nr("canvas")),si.width=t.width,si.height=t.height;const n=si.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=si}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=nr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Ci(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ci(e[n]/255)*255):e[n]=Ci(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Uh=0;class jl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=Dn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Pr(i[o].image)):r.push(Pr(i[o]))}else r=Pr(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function Pr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Dh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Nh=0;class De extends Bi{constructor(t=De.DEFAULT_IMAGE,e=De.DEFAULT_MAPPING,n=Jn,i=Jn,r=Je,o=Qn,a=on,l=Nn,c=De.DEFAULT_ANISOTROPY,h=Rn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Nh++}),this.uuid=Dn(),this.name="",this.source=new jl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Rt(0,0),this.repeat=new Rt(1,1),this.center=new Rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Hl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case da:t.x=t.x-Math.floor(t.x);break;case Jn:t.x=t.x<0?0:1;break;case fa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case da:t.y=t.y-Math.floor(t.y);break;case Jn:t.y=t.y<0?0:1;break;case fa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}De.DEFAULT_IMAGE=null;De.DEFAULT_MAPPING=Hl;De.DEFAULT_ANISOTROPY=1;class re{constructor(t=0,e=0,n=0,i=1){re.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],f=l[8],p=l[1],m=l[5],_=l[9],g=l[2],d=l[6],u=l[10];if(Math.abs(h-p)<.01&&Math.abs(f-g)<.01&&Math.abs(_-d)<.01){if(Math.abs(h+p)<.1&&Math.abs(f+g)<.1&&Math.abs(_+d)<.1&&Math.abs(c+m+u-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(c+1)/2,T=(m+1)/2,N=(u+1)/2,R=(h+p)/4,A=(f+g)/4,D=(_+d)/4;return E>T&&E>N?E<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(E),i=R/n,r=A/n):T>N?T<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(T),n=R/i,r=D/i):N<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(N),n=A/r,i=D/r),this.set(n,i,r,e),this}let w=Math.sqrt((d-_)*(d-_)+(f-g)*(f-g)+(p-h)*(p-h));return Math.abs(w)<.001&&(w=1),this.x=(d-_)/w,this.y=(f-g)/w,this.z=(p-h)/w,this.w=Math.acos((c+m+u-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Fh extends Bi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new re(0,0,t,e),this.scissorTest=!1,this.viewport=new re(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Je,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new De(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new jl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ei extends Fh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Zl extends De{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Oh extends De{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class cs{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],f=n[i+3];const p=r[o+0],m=r[o+1],_=r[o+2],g=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f;return}if(a===1){t[e+0]=p,t[e+1]=m,t[e+2]=_,t[e+3]=g;return}if(f!==g||l!==p||c!==m||h!==_){let d=1-a;const u=l*p+c*m+h*_+f*g,w=u>=0?1:-1,E=1-u*u;if(E>Number.EPSILON){const N=Math.sqrt(E),R=Math.atan2(N,u*w);d=Math.sin(d*R)/N,a=Math.sin(a*R)/N}const T=a*w;if(l=l*d+p*T,c=c*d+m*T,h=h*d+_*T,f=f*d+g*T,d===1-a){const N=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=N,c*=N,h*=N,f*=N}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],f=r[o],p=r[o+1],m=r[o+2],_=r[o+3];return t[e]=a*_+h*f+l*m-c*p,t[e+1]=l*_+h*p+c*f-a*m,t[e+2]=c*_+h*m+a*p-l*f,t[e+3]=h*_-a*f-l*p-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),f=a(r/2),p=l(n/2),m=l(i/2),_=l(r/2);switch(o){case"XYZ":this._x=p*h*f+c*m*_,this._y=c*m*f-p*h*_,this._z=c*h*_+p*m*f,this._w=c*h*f-p*m*_;break;case"YXZ":this._x=p*h*f+c*m*_,this._y=c*m*f-p*h*_,this._z=c*h*_-p*m*f,this._w=c*h*f+p*m*_;break;case"ZXY":this._x=p*h*f-c*m*_,this._y=c*m*f+p*h*_,this._z=c*h*_+p*m*f,this._w=c*h*f-p*m*_;break;case"ZYX":this._x=p*h*f-c*m*_,this._y=c*m*f+p*h*_,this._z=c*h*_-p*m*f,this._w=c*h*f+p*m*_;break;case"YZX":this._x=p*h*f+c*m*_,this._y=c*m*f+p*h*_,this._z=c*h*_-p*m*f,this._w=c*h*f-p*m*_;break;case"XZY":this._x=p*h*f-c*m*_,this._y=c*m*f-p*h*_,this._z=c*h*_+p*m*f,this._w=c*h*f+p*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],f=e[10],p=n+a+f;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(o-i)*m}else if(n>a&&n>f){const m=2*Math.sqrt(1+n-a-f);this._w=(h-l)/m,this._x=.25*m,this._y=(i+o)/m,this._z=(r+c)/m}else if(a>f){const m=2*Math.sqrt(1+a-n-f);this._w=(r-c)/m,this._x=(i+o)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+f-n-a);this._w=(o-i)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ue(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-e;return this._w=m*o+e*this._w,this._x=m*n+e*this._x,this._y=m*i+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),f=Math.sin((1-e)*h)/c,p=Math.sin(e*h)/c;return this._w=o*f+this._w*p,this._x=n*f+this._x*p,this._y=i*f+this._y*p,this._z=r*f+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class x{constructor(t=0,e=0,n=0){x.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ao.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ao.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-r*i),f=2*(r*n-o*e);return this.x=e+l*c+o*f-a*h,this.y=n+l*h+a*c-r*f,this.z=i+l*f+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Lr.copy(this).projectOnVector(t),this.sub(Lr)}reflect(t){return this.sub(Lr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ue(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Lr=new x,Ao=new cs;class hs{constructor(t=new x(1/0,1/0,1/0),e=new x(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ye.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ye.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ye.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Ye):Ye.fromBufferAttribute(r,o),Ye.applyMatrix4(t.matrixWorld),this.expandByPoint(Ye);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),gs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),gs.copy(n.boundingBox)),gs.applyMatrix4(t.matrixWorld),this.union(gs)}const i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Ye),Ye.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ki),xs.subVectors(this.max,ki),ri.subVectors(t.a,ki),ai.subVectors(t.b,ki),oi.subVectors(t.c,ki),Mn.subVectors(ai,ri),Sn.subVectors(oi,ai),Gn.subVectors(ri,oi);let e=[0,-Mn.z,Mn.y,0,-Sn.z,Sn.y,0,-Gn.z,Gn.y,Mn.z,0,-Mn.x,Sn.z,0,-Sn.x,Gn.z,0,-Gn.x,-Mn.y,Mn.x,0,-Sn.y,Sn.x,0,-Gn.y,Gn.x,0];return!Ir(e,ri,ai,oi,xs)||(e=[1,0,0,0,1,0,0,0,1],!Ir(e,ri,ai,oi,xs))?!1:(vs.crossVectors(Mn,Sn),e=[vs.x,vs.y,vs.z],Ir(e,ri,ai,oi,xs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ye).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ye).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(dn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const dn=[new x,new x,new x,new x,new x,new x,new x,new x],Ye=new x,gs=new hs,ri=new x,ai=new x,oi=new x,Mn=new x,Sn=new x,Gn=new x,ki=new x,xs=new x,vs=new x,Vn=new x;function Ir(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Vn.fromArray(s,r);const a=i.x*Math.abs(Vn.x)+i.y*Math.abs(Vn.y)+i.z*Math.abs(Vn.z),l=t.dot(Vn),c=e.dot(Vn),h=n.dot(Vn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Bh=new hs,Gi=new x,Dr=new x;class us{constructor(t=new x,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Bh.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Gi.subVectors(t,this.center);const e=Gi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Gi,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Dr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Gi.copy(t.center).add(Dr)),this.expandByPoint(Gi.copy(t.center).sub(Dr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fn=new x,Ur=new x,Ms=new x,yn=new x,Nr=new x,Ss=new x,Fr=new x;class pr{constructor(t=new x,e=new x(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,fn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=fn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(fn.copy(this.origin).addScaledVector(this.direction,e),fn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Ur.copy(t).add(e).multiplyScalar(.5),Ms.copy(e).sub(t).normalize(),yn.copy(this.origin).sub(Ur);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Ms),a=yn.dot(this.direction),l=-yn.dot(Ms),c=yn.lengthSq(),h=Math.abs(1-o*o);let f,p,m,_;if(h>0)if(f=o*l-a,p=o*a-l,_=r*h,f>=0)if(p>=-_)if(p<=_){const g=1/h;f*=g,p*=g,m=f*(f+o*p+2*a)+p*(o*f+p+2*l)+c}else p=r,f=Math.max(0,-(o*p+a)),m=-f*f+p*(p+2*l)+c;else p=-r,f=Math.max(0,-(o*p+a)),m=-f*f+p*(p+2*l)+c;else p<=-_?(f=Math.max(0,-(-o*r+a)),p=f>0?-r:Math.min(Math.max(-r,-l),r),m=-f*f+p*(p+2*l)+c):p<=_?(f=0,p=Math.min(Math.max(-r,-l),r),m=p*(p+2*l)+c):(f=Math.max(0,-(o*r+a)),p=f>0?r:Math.min(Math.max(-r,-l),r),m=-f*f+p*(p+2*l)+c);else p=o>0?-r:r,f=Math.max(0,-(o*p+a)),m=-f*f+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(Ur).addScaledVector(Ms,p),m}intersectSphere(t,e){fn.subVectors(t.center,this.origin);const n=fn.dot(this.direction),i=fn.dot(fn)-n*n,r=t.radius*t.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,p=this.origin;return c>=0?(n=(t.min.x-p.x)*c,i=(t.max.x-p.x)*c):(n=(t.max.x-p.x)*c,i=(t.min.x-p.x)*c),h>=0?(r=(t.min.y-p.y)*h,o=(t.max.y-p.y)*h):(r=(t.max.y-p.y)*h,o=(t.min.y-p.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),f>=0?(a=(t.min.z-p.z)*f,l=(t.max.z-p.z)*f):(a=(t.max.z-p.z)*f,l=(t.min.z-p.z)*f),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,fn)!==null}intersectTriangle(t,e,n,i,r){Nr.subVectors(e,t),Ss.subVectors(n,t),Fr.crossVectors(Nr,Ss);let o=this.direction.dot(Fr),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;yn.subVectors(this.origin,t);const l=a*this.direction.dot(Ss.crossVectors(yn,Ss));if(l<0)return null;const c=a*this.direction.dot(Nr.cross(yn));if(c<0||l+c>o)return null;const h=-a*yn.dot(Fr);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ie{constructor(t,e,n,i,r,o,a,l,c,h,f,p,m,_,g,d){ie.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,h,f,p,m,_,g,d)}set(t,e,n,i,r,o,a,l,c,h,f,p,m,_,g,d){const u=this.elements;return u[0]=t,u[4]=e,u[8]=n,u[12]=i,u[1]=r,u[5]=o,u[9]=a,u[13]=l,u[2]=c,u[6]=h,u[10]=f,u[14]=p,u[3]=m,u[7]=_,u[11]=g,u[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ie().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/li.setFromMatrixColumn(t,0).length(),r=1/li.setFromMatrixColumn(t,1).length(),o=1/li.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const p=o*h,m=o*f,_=a*h,g=a*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=m+_*c,e[5]=p-g*c,e[9]=-a*l,e[2]=g-p*c,e[6]=_+m*c,e[10]=o*l}else if(t.order==="YXZ"){const p=l*h,m=l*f,_=c*h,g=c*f;e[0]=p+g*a,e[4]=_*a-m,e[8]=o*c,e[1]=o*f,e[5]=o*h,e[9]=-a,e[2]=m*a-_,e[6]=g+p*a,e[10]=o*l}else if(t.order==="ZXY"){const p=l*h,m=l*f,_=c*h,g=c*f;e[0]=p-g*a,e[4]=-o*f,e[8]=_+m*a,e[1]=m+_*a,e[5]=o*h,e[9]=g-p*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const p=o*h,m=o*f,_=a*h,g=a*f;e[0]=l*h,e[4]=_*c-m,e[8]=p*c+g,e[1]=l*f,e[5]=g*c+p,e[9]=m*c-_,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const p=o*l,m=o*c,_=a*l,g=a*c;e[0]=l*h,e[4]=g-p*f,e[8]=_*f+m,e[1]=f,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=m*f+_,e[10]=p-g*f}else if(t.order==="XZY"){const p=o*l,m=o*c,_=a*l,g=a*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=p*f+g,e[5]=o*h,e[9]=m*f-_,e[2]=_*f-m,e[6]=a*h,e[10]=g*f+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(zh,t,Hh)}lookAt(t,e,n){const i=this.elements;return Be.subVectors(t,e),Be.lengthSq()===0&&(Be.z=1),Be.normalize(),En.crossVectors(n,Be),En.lengthSq()===0&&(Math.abs(n.z)===1?Be.x+=1e-4:Be.z+=1e-4,Be.normalize(),En.crossVectors(n,Be)),En.normalize(),ys.crossVectors(Be,En),i[0]=En.x,i[4]=ys.x,i[8]=Be.x,i[1]=En.y,i[5]=ys.y,i[9]=Be.y,i[2]=En.z,i[6]=ys.z,i[10]=Be.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],f=n[5],p=n[9],m=n[13],_=n[2],g=n[6],d=n[10],u=n[14],w=n[3],E=n[7],T=n[11],N=n[15],R=i[0],A=i[4],D=i[8],y=i[12],M=i[1],C=i[5],H=i[9],O=i[13],W=i[2],q=i[6],G=i[10],$=i[14],k=i[3],ht=i[7],ft=i[11],_t=i[15];return r[0]=o*R+a*M+l*W+c*k,r[4]=o*A+a*C+l*q+c*ht,r[8]=o*D+a*H+l*G+c*ft,r[12]=o*y+a*O+l*$+c*_t,r[1]=h*R+f*M+p*W+m*k,r[5]=h*A+f*C+p*q+m*ht,r[9]=h*D+f*H+p*G+m*ft,r[13]=h*y+f*O+p*$+m*_t,r[2]=_*R+g*M+d*W+u*k,r[6]=_*A+g*C+d*q+u*ht,r[10]=_*D+g*H+d*G+u*ft,r[14]=_*y+g*O+d*$+u*_t,r[3]=w*R+E*M+T*W+N*k,r[7]=w*A+E*C+T*q+N*ht,r[11]=w*D+E*H+T*G+N*ft,r[15]=w*y+E*O+T*$+N*_t,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],f=t[6],p=t[10],m=t[14],_=t[3],g=t[7],d=t[11],u=t[15];return _*(+r*l*f-i*c*f-r*a*p+n*c*p+i*a*m-n*l*m)+g*(+e*l*m-e*c*p+r*o*p-i*o*m+i*c*h-r*l*h)+d*(+e*c*f-e*a*m-r*o*f+n*o*m+r*a*h-n*c*h)+u*(-i*a*h-e*l*f+e*a*p+i*o*f-n*o*p+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],f=t[9],p=t[10],m=t[11],_=t[12],g=t[13],d=t[14],u=t[15],w=f*d*c-g*p*c+g*l*m-a*d*m-f*l*u+a*p*u,E=_*p*c-h*d*c-_*l*m+o*d*m+h*l*u-o*p*u,T=h*g*c-_*f*c+_*a*m-o*g*m-h*a*u+o*f*u,N=_*f*l-h*g*l-_*a*p+o*g*p+h*a*d-o*f*d,R=e*w+n*E+i*T+r*N;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/R;return t[0]=w*A,t[1]=(g*p*r-f*d*r-g*i*m+n*d*m+f*i*u-n*p*u)*A,t[2]=(a*d*r-g*l*r+g*i*c-n*d*c-a*i*u+n*l*u)*A,t[3]=(f*l*r-a*p*r-f*i*c+n*p*c+a*i*m-n*l*m)*A,t[4]=E*A,t[5]=(h*d*r-_*p*r+_*i*m-e*d*m-h*i*u+e*p*u)*A,t[6]=(_*l*r-o*d*r-_*i*c+e*d*c+o*i*u-e*l*u)*A,t[7]=(o*p*r-h*l*r+h*i*c-e*p*c-o*i*m+e*l*m)*A,t[8]=T*A,t[9]=(_*f*r-h*g*r-_*n*m+e*g*m+h*n*u-e*f*u)*A,t[10]=(o*g*r-_*a*r+_*n*c-e*g*c-o*n*u+e*a*u)*A,t[11]=(h*a*r-o*f*r-h*n*c+e*f*c+o*n*m-e*a*m)*A,t[12]=N*A,t[13]=(h*g*i-_*f*i+_*n*p-e*g*p-h*n*d+e*f*d)*A,t[14]=(_*a*i-o*g*i-_*n*l+e*g*l+o*n*d-e*a*d)*A,t[15]=(o*f*i-h*a*i+h*n*l-e*f*l-o*n*p+e*a*p)*A,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,f=a+a,p=r*c,m=r*h,_=r*f,g=o*h,d=o*f,u=a*f,w=l*c,E=l*h,T=l*f,N=n.x,R=n.y,A=n.z;return i[0]=(1-(g+u))*N,i[1]=(m+T)*N,i[2]=(_-E)*N,i[3]=0,i[4]=(m-T)*R,i[5]=(1-(p+u))*R,i[6]=(d+w)*R,i[7]=0,i[8]=(_+E)*A,i[9]=(d-w)*A,i[10]=(1-(p+g))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=li.set(i[0],i[1],i[2]).length();const o=li.set(i[4],i[5],i[6]).length(),a=li.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],Ke.copy(this);const c=1/r,h=1/o,f=1/a;return Ke.elements[0]*=c,Ke.elements[1]*=c,Ke.elements[2]*=c,Ke.elements[4]*=h,Ke.elements[5]*=h,Ke.elements[6]*=h,Ke.elements[8]*=f,Ke.elements[9]*=f,Ke.elements[10]*=f,e.setFromRotationMatrix(Ke),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=xn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-i),f=(e+t)/(e-t),p=(n+i)/(n-i);let m,_;if(a===xn)m=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===er)m=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=xn){const l=this.elements,c=1/(e-t),h=1/(n-i),f=1/(o-r),p=(e+t)*c,m=(n+i)*h;let _,g;if(a===xn)_=(o+r)*f,g=-2*f;else if(a===er)_=r*f,g=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const li=new x,Ke=new ie,zh=new x(0,0,0),Hh=new x(1,1,1),En=new x,ys=new x,Be=new x,Ro=new ie,Co=new cs;class hn{constructor(t=0,e=0,n=0,i=hn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],f=i[2],p=i[6],m=i[10];switch(e){case"XYZ":this._y=Math.asin(Ue(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ue(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ue(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ue(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ue(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Ue(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ro.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ro,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Co.setFromEuler(this),this.setFromQuaternion(Co,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hn.DEFAULT_ORDER="XYZ";class La{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let kh=0;const Po=new x,ci=new cs,pn=new ie,Es=new x,Vi=new x,Gh=new x,Vh=new cs,Lo=new x(1,0,0),Io=new x(0,1,0),Do=new x(0,0,1),Uo={type:"added"},Wh={type:"removed"},hi={type:"childadded",child:null},Or={type:"childremoved",child:null};class _e extends Bi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kh++}),this.uuid=Dn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_e.DEFAULT_UP.clone();const t=new x,e=new hn,n=new cs,i=new x(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ie},normalMatrix:{value:new Lt}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=_e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new La,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ci.setFromAxisAngle(t,e),this.quaternion.multiply(ci),this}rotateOnWorldAxis(t,e){return ci.setFromAxisAngle(t,e),this.quaternion.premultiply(ci),this}rotateX(t){return this.rotateOnAxis(Lo,t)}rotateY(t){return this.rotateOnAxis(Io,t)}rotateZ(t){return this.rotateOnAxis(Do,t)}translateOnAxis(t,e){return Po.copy(t).applyQuaternion(this.quaternion),this.position.add(Po.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Lo,t)}translateY(t){return this.translateOnAxis(Io,t)}translateZ(t){return this.translateOnAxis(Do,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Es.copy(t):Es.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Vi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(Vi,Es,this.up):pn.lookAt(Es,Vi,this.up),this.quaternion.setFromRotationMatrix(pn),i&&(pn.extractRotation(i.matrixWorld),ci.setFromRotationMatrix(pn),this.quaternion.premultiply(ci.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Uo),hi.child=t,this.dispatchEvent(hi),hi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Wh),Or.child=t,this.dispatchEvent(Or),Or.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),pn.multiply(t.parent.matrixWorld)),t.applyMatrix4(pn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Uo),hi.child=t,this.dispatchEvent(hi),hi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vi,t,Gh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vi,Vh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++){const r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++){const a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),f=o(t.shapes),p=o(t.skeletons),m=o(t.animations),_=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),_.length>0&&(n.nodes=_)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}_e.DEFAULT_UP=new x(0,1,0);_e.DEFAULT_MATRIX_AUTO_UPDATE=!0;_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const $e=new x,mn=new x,Br=new x,_n=new x,ui=new x,di=new x,No=new x,zr=new x,Hr=new x,kr=new x;class Qe{constructor(t=new x,e=new x,n=new x){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),$e.subVectors(t,e),i.cross($e);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){$e.subVectors(i,e),mn.subVectors(n,e),Br.subVectors(t,e);const o=$e.dot($e),a=$e.dot(mn),l=$e.dot(Br),c=mn.dot(mn),h=mn.dot(Br),f=o*c-a*a;if(f===0)return r.set(0,0,0),null;const p=1/f,m=(c*l-a*h)*p,_=(o*h-a*l)*p;return r.set(1-m-_,_,m)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,_n)===null?!1:_n.x>=0&&_n.y>=0&&_n.x+_n.y<=1}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,_n)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,_n.x),l.addScaledVector(o,_n.y),l.addScaledVector(a,_n.z),l)}static isFrontFacing(t,e,n,i){return $e.subVectors(n,e),mn.subVectors(t,e),$e.cross(mn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return $e.subVectors(this.c,this.b),mn.subVectors(this.a,this.b),$e.cross(mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Qe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Qe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return Qe.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return Qe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Qe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let o,a;ui.subVectors(i,n),di.subVectors(r,n),zr.subVectors(t,n);const l=ui.dot(zr),c=di.dot(zr);if(l<=0&&c<=0)return e.copy(n);Hr.subVectors(t,i);const h=ui.dot(Hr),f=di.dot(Hr);if(h>=0&&f<=h)return e.copy(i);const p=l*f-h*c;if(p<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(ui,o);kr.subVectors(t,r);const m=ui.dot(kr),_=di.dot(kr);if(_>=0&&m<=_)return e.copy(r);const g=m*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),e.copy(n).addScaledVector(di,a);const d=h*_-m*f;if(d<=0&&f-h>=0&&m-_>=0)return No.subVectors(r,i),a=(f-h)/(f-h+(m-_)),e.copy(i).addScaledVector(No,a);const u=1/(d+g+p);return o=g*u,a=p*u,e.copy(n).addScaledVector(ui,o).addScaledVector(di,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Jl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wn={h:0,s:0,l:0},ws={h:0,s:0,l:0};function Gr(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Ot{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=je){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Jt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Jt.workingColorSpace){if(t=Ch(t,1),e=Ue(e,0,1),n=Ue(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Gr(o,r,t+1/3),this.g=Gr(o,r,t),this.b=Gr(o,r,t-1/3)}return Jt.toWorkingColorSpace(this,i),this}setStyle(t,e=je){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=je){const n=Jl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ci(t.r),this.g=Ci(t.g),this.b=Ci(t.b),this}copyLinearToSRGB(t){return this.r=Cr(t.r),this.g=Cr(t.g),this.b=Cr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=je){return Jt.fromWorkingColorSpace(be.copy(this),t),Math.round(Ue(be.r*255,0,255))*65536+Math.round(Ue(be.g*255,0,255))*256+Math.round(Ue(be.b*255,0,255))}getHexString(t=je){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.fromWorkingColorSpace(be.copy(this),e);const n=be.r,i=be.g,r=be.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=h<=.5?f/(o+a):f/(2-o-a),o){case n:l=(i-r)/f+(i<r?6:0);break;case i:l=(r-n)/f+2;break;case r:l=(n-i)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.fromWorkingColorSpace(be.copy(this),e),t.r=be.r,t.g=be.g,t.b=be.b,t}getStyle(t=je){Jt.fromWorkingColorSpace(be.copy(this),t);const e=be.r,n=be.g,i=be.b;return t!==je?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(wn),this.setHSL(wn.h+t,wn.s+e,wn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(wn),t.getHSL(ws);const n=Ar(wn.h,ws.h,e),i=Ar(wn.s,ws.s,e),r=Ar(wn.l,ws.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const be=new Ot;Ot.NAMES=Jl;let Xh=0;class zn extends Bi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xh++}),this.uuid=Dn(),this.name="",this.type="Material",this.blending=Ai,this.side=Un,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=la,this.blendDst=ca,this.blendEquation=jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ot(0,0,0),this.blendAlpha=0,this.depthFunc=js,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=yo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ii,this.stencilZFail=ii,this.stencilZPass=ii,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ai&&(n.blending=this.blending),this.side!==Un&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==la&&(n.blendSrc=this.blendSrc),this.blendDst!==ca&&(n.blendDst=this.blendDst),this.blendEquation!==jn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==js&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==yo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ii&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ii&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ii&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class oe extends zn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.combine=Ra,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const fe=new x,Ts=new Rt;class qe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=pa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Pa("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ts.fromBufferAttribute(this,e),Ts.applyMatrix3(t),this.setXY(e,Ts.x,Ts.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.applyMatrix3(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.applyMatrix4(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.applyNormalMatrix(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.transformDirection(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=an(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ne(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=an(e,this.array)),e}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=an(e,this.array)),e}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=an(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=an(e,this.array)),e}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),i=ne(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),i=ne(i,this.array),r=ne(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==pa&&(t.usage=this.usage),t}}class Ql extends qe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class tc extends qe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ee extends qe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let qh=0;const Ve=new ie,Vr=new _e,fi=new x,ze=new hs,Wi=new hs,Se=new x;class we extends Bi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qh++}),this.uuid=Dn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new($l(t)?tc:Ql)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Lt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ve.makeRotationFromQuaternion(t),this.applyMatrix4(Ve),this}rotateX(t){return Ve.makeRotationX(t),this.applyMatrix4(Ve),this}rotateY(t){return Ve.makeRotationY(t),this.applyMatrix4(Ve),this}rotateZ(t){return Ve.makeRotationZ(t),this.applyMatrix4(Ve),this}translate(t,e,n){return Ve.makeTranslation(t,e,n),this.applyMatrix4(Ve),this}scale(t,e,n){return Ve.makeScale(t,e,n),this.applyMatrix4(Ve),this}lookAt(t){return Vr.lookAt(t),Vr.updateMatrix(),this.applyMatrix4(Vr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fi).negate(),this.translate(fi.x,fi.y,fi.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Ee(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new x(-1/0,-1/0,-1/0),new x(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];ze.setFromBufferAttribute(r),this.morphTargetsRelative?(Se.addVectors(this.boundingBox.min,ze.min),this.boundingBox.expandByPoint(Se),Se.addVectors(this.boundingBox.max,ze.max),this.boundingBox.expandByPoint(Se)):(this.boundingBox.expandByPoint(ze.min),this.boundingBox.expandByPoint(ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new us);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new x,1/0);return}if(t){const n=this.boundingSphere.center;if(ze.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Wi.setFromBufferAttribute(a),this.morphTargetsRelative?(Se.addVectors(ze.min,Wi.min),ze.expandByPoint(Se),Se.addVectors(ze.max,Wi.max),ze.expandByPoint(Se)):(ze.expandByPoint(Wi.min),ze.expandByPoint(Wi.max))}ze.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Se.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Se));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Se.fromBufferAttribute(a,c),l&&(fi.fromBufferAttribute(t,c),Se.add(fi)),i=Math.max(i,n.distanceToSquared(Se))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new qe(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let D=0;D<n.count;D++)a[D]=new x,l[D]=new x;const c=new x,h=new x,f=new x,p=new Rt,m=new Rt,_=new Rt,g=new x,d=new x;function u(D,y,M){c.fromBufferAttribute(n,D),h.fromBufferAttribute(n,y),f.fromBufferAttribute(n,M),p.fromBufferAttribute(r,D),m.fromBufferAttribute(r,y),_.fromBufferAttribute(r,M),h.sub(c),f.sub(c),m.sub(p),_.sub(p);const C=1/(m.x*_.y-_.x*m.y);isFinite(C)&&(g.copy(h).multiplyScalar(_.y).addScaledVector(f,-m.y).multiplyScalar(C),d.copy(f).multiplyScalar(m.x).addScaledVector(h,-_.x).multiplyScalar(C),a[D].add(g),a[y].add(g),a[M].add(g),l[D].add(d),l[y].add(d),l[M].add(d))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let D=0,y=w.length;D<y;++D){const M=w[D],C=M.start,H=M.count;for(let O=C,W=C+H;O<W;O+=3)u(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const E=new x,T=new x,N=new x,R=new x;function A(D){N.fromBufferAttribute(i,D),R.copy(N);const y=a[D];E.copy(y),E.sub(N.multiplyScalar(N.dot(y))).normalize(),T.crossVectors(R,y);const C=T.dot(l[D])<0?-1:1;o.setXYZW(D,E.x,E.y,E.z,C)}for(let D=0,y=w.length;D<y;++D){const M=w[D],C=M.start,H=M.count;for(let O=C,W=C+H;O<W;O+=3)A(t.getX(O+0)),A(t.getX(O+1)),A(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new qe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);const i=new x,r=new x,o=new x,a=new x,l=new x,c=new x,h=new x,f=new x;if(t)for(let p=0,m=t.count;p<m;p+=3){const _=t.getX(p+0),g=t.getX(p+1),d=t.getX(p+2);i.fromBufferAttribute(e,_),r.fromBufferAttribute(e,g),o.fromBufferAttribute(e,d),h.subVectors(o,r),f.subVectors(i,r),h.cross(f),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,d),a.add(h),l.add(h),c.add(h),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(d,c.x,c.y,c.z)}else for(let p=0,m=e.count;p<m;p+=3)i.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),o.fromBufferAttribute(e,p+2),h.subVectors(o,r),f.subVectors(i,r),h.cross(f),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Se.fromBufferAttribute(t,e),Se.normalize(),t.setXYZ(e,Se.x,Se.y,Se.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,f=a.normalized,p=new c.constructor(l.length*h);let m=0,_=0;for(let g=0,d=l.length;g<d;g++){a.isInterleavedBufferAttribute?m=l[g]*a.data.stride+a.offset:m=l[g]*h;for(let u=0;u<h;u++)p[_++]=c[m++]}return new qe(p,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new we,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,f=c.length;h<f;h++){const p=c[h],m=t(p,n);l.push(m)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let f=0,p=c.length;f<p;f++){const m=c[f];h.push(m.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],f=r[c];for(let p=0,m=f.length;p<m;p++)h.push(f[p].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Fo=new ie,Wn=new pr,bs=new us,Oo=new x,pi=new x,mi=new x,_i=new x,Wr=new x,As=new x,Rs=new Rt,Cs=new Rt,Ps=new Rt,Bo=new x,zo=new x,Ho=new x,Ls=new x,Is=new x;class at extends _e{constructor(t=new we,e=new oe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){As.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],f=r[l];h!==0&&(Wr.fromBufferAttribute(f,t),o?As.addScaledVector(Wr,h):As.addScaledVector(Wr.sub(e),h))}e.add(As)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),bs.copy(n.boundingSphere),bs.applyMatrix4(r),Wn.copy(t.ray).recast(t.near),!(bs.containsPoint(Wn.origin)===!1&&(Wn.intersectSphere(bs,Oo)===null||Wn.origin.distanceToSquared(Oo)>(t.far-t.near)**2))&&(Fo.copy(r).invert(),Wn.copy(t.ray).applyMatrix4(Fo),!(n.boundingBox!==null&&Wn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Wn)))}_computeIntersections(t,e,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,p=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=p.length;_<g;_++){const d=p[_],u=o[d.materialIndex],w=Math.max(d.start,m.start),E=Math.min(a.count,Math.min(d.start+d.count,m.start+m.count));for(let T=w,N=E;T<N;T+=3){const R=a.getX(T),A=a.getX(T+1),D=a.getX(T+2);i=Ds(this,u,t,n,c,h,f,R,A,D),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=d.materialIndex,e.push(i))}}else{const _=Math.max(0,m.start),g=Math.min(a.count,m.start+m.count);for(let d=_,u=g;d<u;d+=3){const w=a.getX(d),E=a.getX(d+1),T=a.getX(d+2);i=Ds(this,o,t,n,c,h,f,w,E,T),i&&(i.faceIndex=Math.floor(d/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=p.length;_<g;_++){const d=p[_],u=o[d.materialIndex],w=Math.max(d.start,m.start),E=Math.min(l.count,Math.min(d.start+d.count,m.start+m.count));for(let T=w,N=E;T<N;T+=3){const R=T,A=T+1,D=T+2;i=Ds(this,u,t,n,c,h,f,R,A,D),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=d.materialIndex,e.push(i))}}else{const _=Math.max(0,m.start),g=Math.min(l.count,m.start+m.count);for(let d=_,u=g;d<u;d+=3){const w=d,E=d+1,T=d+2;i=Ds(this,o,t,n,c,h,f,w,E,T),i&&(i.faceIndex=Math.floor(d/3),e.push(i))}}}}function Yh(s,t,e,n,i,r,o,a){let l;if(t.side===Fe?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===Un,a),l===null)return null;Is.copy(a),Is.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Is);return c<e.near||c>e.far?null:{distance:c,point:Is.clone(),object:s}}function Ds(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,pi),s.getVertexPosition(l,mi),s.getVertexPosition(c,_i);const h=Yh(s,t,e,n,pi,mi,_i,Ls);if(h){i&&(Rs.fromBufferAttribute(i,a),Cs.fromBufferAttribute(i,l),Ps.fromBufferAttribute(i,c),h.uv=Qe.getInterpolation(Ls,pi,mi,_i,Rs,Cs,Ps,new Rt)),r&&(Rs.fromBufferAttribute(r,a),Cs.fromBufferAttribute(r,l),Ps.fromBufferAttribute(r,c),h.uv1=Qe.getInterpolation(Ls,pi,mi,_i,Rs,Cs,Ps,new Rt)),o&&(Bo.fromBufferAttribute(o,a),zo.fromBufferAttribute(o,l),Ho.fromBufferAttribute(o,c),h.normal=Qe.getInterpolation(Ls,pi,mi,_i,Bo,zo,Ho,new x),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new x,materialIndex:0};Qe.getNormal(pi,mi,_i,f.normal),h.face=f}return h}class kt extends we{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],f=[];let p=0,m=0;_("z","y","x",-1,-1,n,e,t,o,r,0),_("z","y","x",1,-1,n,e,-t,o,r,1),_("x","z","y",1,1,t,n,e,i,o,2),_("x","z","y",1,-1,t,n,-e,i,o,3),_("x","y","z",1,-1,t,e,n,i,r,4),_("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Ee(c,3)),this.setAttribute("normal",new Ee(h,3)),this.setAttribute("uv",new Ee(f,2));function _(g,d,u,w,E,T,N,R,A,D,y){const M=T/A,C=N/D,H=T/2,O=N/2,W=R/2,q=A+1,G=D+1;let $=0,k=0;const ht=new x;for(let ft=0;ft<G;ft++){const _t=ft*C-O;for(let Gt=0;Gt<q;Gt++){const Qt=Gt*M-H;ht[g]=Qt*w,ht[d]=_t*E,ht[u]=W,c.push(ht.x,ht.y,ht.z),ht[g]=0,ht[d]=0,ht[u]=R>0?1:-1,h.push(ht.x,ht.y,ht.z),f.push(Gt/A),f.push(1-ft/D),$+=1}}for(let ft=0;ft<D;ft++)for(let _t=0;_t<A;_t++){const Gt=p+_t+q*ft,Qt=p+_t+q*(ft+1),X=p+(_t+1)+q*(ft+1),J=p+(_t+1)+q*ft;l.push(Gt,Qt,J),l.push(Qt,X,J),k+=6}a.addGroup(m,k,y),m+=k,p+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new kt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Fi(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Pe(s){const t={};for(let e=0;e<s.length;e++){const n=Fi(s[e]);for(const i in n)t[i]=n[i]}return t}function Kh(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function ec(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}const $h={clone:Fi,merge:Pe};var jh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Fn extends zn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jh,this.fragmentShader=Zh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Fi(t.uniforms),this.uniformsGroups=Kh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class nc extends _e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=xn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Tn=new x,ko=new Rt,Go=new Rt;class He extends nc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ma*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(br*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ma*2*Math.atan(Math.tan(br*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Tn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Tn.x,Tn.y).multiplyScalar(-t/Tn.z),Tn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Tn.x,Tn.y).multiplyScalar(-t/Tn.z)}getViewSize(t,e){return this.getViewBounds(t,ko,Go),e.subVectors(Go,ko)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(br*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const gi=-90,xi=1;class Jh extends _e{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new He(gi,xi,t,e);i.layers=this.layers,this.add(i);const r=new He(gi,xi,t,e);r.layers=this.layers,this.add(r);const o=new He(gi,xi,t,e);o.layers=this.layers,this.add(o);const a=new He(gi,xi,t,e);a.layers=this.layers,this.add(a);const l=new He(gi,xi,t,e);l.layers=this.layers,this.add(l);const c=new He(gi,xi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===xn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===er)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,f=t.getRenderTarget(),p=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(f,p,m),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class ic extends De{constructor(t,e,n,i,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Li,super(t,e,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Qh extends ei{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new ic(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Je}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new kt(5,5,5),r=new Fn({name:"CubemapFromEquirect",uniforms:Fi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Fe,blending:Ln});r.uniforms.tEquirect.value=e;const o=new at(i,r),a=e.minFilter;return e.minFilter===Qn&&(e.minFilter=Je),new Jh(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}}const Xr=new x,tu=new x,eu=new Lt;class bn{constructor(t=new x(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Xr.subVectors(n,e).cross(tu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Xr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||eu.getNormalMatrix(t),i=this.coplanarPoint(Xr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xn=new us,Us=new x;class Ia{constructor(t=new bn,e=new bn,n=new bn,i=new bn,r=new bn,o=new bn){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=xn){const n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],f=i[6],p=i[7],m=i[8],_=i[9],g=i[10],d=i[11],u=i[12],w=i[13],E=i[14],T=i[15];if(n[0].setComponents(l-r,p-c,d-m,T-u).normalize(),n[1].setComponents(l+r,p+c,d+m,T+u).normalize(),n[2].setComponents(l+o,p+h,d+_,T+w).normalize(),n[3].setComponents(l-o,p-h,d-_,T-w).normalize(),n[4].setComponents(l-a,p-f,d-g,T-E).normalize(),e===xn)n[5].setComponents(l+a,p+f,d+g,T+E).normalize();else if(e===er)n[5].setComponents(a,f,g,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Xn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Xn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Xn)}intersectsSprite(t){return Xn.center.set(0,0,0),Xn.radius=.7071067811865476,Xn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Xn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Us.x=i.normal.x>0?t.max.x:t.min.x,Us.y=i.normal.y>0?t.max.y:t.min.y,Us.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Us)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function sc(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function nu(s){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,f=c.byteLength,p=s.createBuffer();s.bindBuffer(l,p),s.bufferData(l,c,h),a.onUploadCallback();let m;if(c instanceof Float32Array)m=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?m=s.HALF_FLOAT:m=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=s.SHORT;else if(c instanceof Uint32Array)m=s.UNSIGNED_INT;else if(c instanceof Int32Array)m=s.INT;else if(c instanceof Int8Array)m=s.BYTE;else if(c instanceof Uint8Array)m=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,l,c){const h=l.array,f=l._updateRange,p=l.updateRanges;if(s.bindBuffer(c,a),f.count===-1&&p.length===0&&s.bufferSubData(c,0,h),p.length!==0){for(let m=0,_=p.length;m<_;m++){const g=p[m];s.bufferSubData(c,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}f.count!==-1&&(s.bufferSubData(c,f.offset*h.BYTES_PER_ELEMENT,h,f.offset,f.count),f.count=-1),l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}class ln extends we{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,f=t/a,p=e/l,m=[],_=[],g=[],d=[];for(let u=0;u<h;u++){const w=u*p-o;for(let E=0;E<c;E++){const T=E*f-r;_.push(T,-w,0),g.push(0,0,1),d.push(E/a),d.push(1-u/l)}}for(let u=0;u<l;u++)for(let w=0;w<a;w++){const E=w+c*u,T=w+c*(u+1),N=w+1+c*(u+1),R=w+1+c*u;m.push(E,T,R),m.push(T,N,R)}this.setIndex(m),this.setAttribute("position",new Ee(_,3)),this.setAttribute("normal",new Ee(g,3)),this.setAttribute("uv",new Ee(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ln(t.width,t.height,t.widthSegments,t.heightSegments)}}var iu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,su=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ru=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,au=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ou=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,lu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,cu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,hu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uu=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,du=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,fu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,pu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,mu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,_u=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,gu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,xu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,vu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Mu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Su=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Eu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,wu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Tu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( batchId );
	vColor.xyz *= batchingColor.xyz;
#endif`,bu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Au=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ru=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Cu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Pu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Lu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Iu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Du="gl_FragColor = linearToOutputTexel( gl_FragColor );",Uu=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Nu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Fu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ou=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Bu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Hu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ku=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Gu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Vu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Wu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Xu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Yu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ku=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,$u=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,ju=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ju=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Qu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,td=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ed=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,nd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,id=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,sd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ad=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,od=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ld=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ud=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,dd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,pd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,md=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_d=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,vd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Md=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Sd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,yd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ed=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Td=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,bd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ad=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Pd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ld=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Id=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ud=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Nd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Od=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,zd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Hd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,kd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Gd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Wd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Yd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Kd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$d=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,jd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Zd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Jd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Qd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ef=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const nf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,af=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,of=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,hf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,uf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,df=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ff=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_f=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,xf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,yf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ef=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,wf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Tf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Af=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Rf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,If=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Df=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Uf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Nf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ff=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Pt={alphahash_fragment:iu,alphahash_pars_fragment:su,alphamap_fragment:ru,alphamap_pars_fragment:au,alphatest_fragment:ou,alphatest_pars_fragment:lu,aomap_fragment:cu,aomap_pars_fragment:hu,batching_pars_vertex:uu,batching_vertex:du,begin_vertex:fu,beginnormal_vertex:pu,bsdfs:mu,iridescence_fragment:_u,bumpmap_pars_fragment:gu,clipping_planes_fragment:xu,clipping_planes_pars_fragment:vu,clipping_planes_pars_vertex:Mu,clipping_planes_vertex:Su,color_fragment:yu,color_pars_fragment:Eu,color_pars_vertex:wu,color_vertex:Tu,common:bu,cube_uv_reflection_fragment:Au,defaultnormal_vertex:Ru,displacementmap_pars_vertex:Cu,displacementmap_vertex:Pu,emissivemap_fragment:Lu,emissivemap_pars_fragment:Iu,colorspace_fragment:Du,colorspace_pars_fragment:Uu,envmap_fragment:Nu,envmap_common_pars_fragment:Fu,envmap_pars_fragment:Ou,envmap_pars_vertex:Bu,envmap_physical_pars_fragment:$u,envmap_vertex:zu,fog_vertex:Hu,fog_pars_vertex:ku,fog_fragment:Gu,fog_pars_fragment:Vu,gradientmap_pars_fragment:Wu,lightmap_pars_fragment:Xu,lights_lambert_fragment:qu,lights_lambert_pars_fragment:Yu,lights_pars_begin:Ku,lights_toon_fragment:ju,lights_toon_pars_fragment:Zu,lights_phong_fragment:Ju,lights_phong_pars_fragment:Qu,lights_physical_fragment:td,lights_physical_pars_fragment:ed,lights_fragment_begin:nd,lights_fragment_maps:id,lights_fragment_end:sd,logdepthbuf_fragment:rd,logdepthbuf_pars_fragment:ad,logdepthbuf_pars_vertex:od,logdepthbuf_vertex:ld,map_fragment:cd,map_pars_fragment:hd,map_particle_fragment:ud,map_particle_pars_fragment:dd,metalnessmap_fragment:fd,metalnessmap_pars_fragment:pd,morphinstance_vertex:md,morphcolor_vertex:_d,morphnormal_vertex:gd,morphtarget_pars_vertex:xd,morphtarget_vertex:vd,normal_fragment_begin:Md,normal_fragment_maps:Sd,normal_pars_fragment:yd,normal_pars_vertex:Ed,normal_vertex:wd,normalmap_pars_fragment:Td,clearcoat_normal_fragment_begin:bd,clearcoat_normal_fragment_maps:Ad,clearcoat_pars_fragment:Rd,iridescence_pars_fragment:Cd,opaque_fragment:Pd,packing:Ld,premultiplied_alpha_fragment:Id,project_vertex:Dd,dithering_fragment:Ud,dithering_pars_fragment:Nd,roughnessmap_fragment:Fd,roughnessmap_pars_fragment:Od,shadowmap_pars_fragment:Bd,shadowmap_pars_vertex:zd,shadowmap_vertex:Hd,shadowmask_pars_fragment:kd,skinbase_vertex:Gd,skinning_pars_vertex:Vd,skinning_vertex:Wd,skinnormal_vertex:Xd,specularmap_fragment:qd,specularmap_pars_fragment:Yd,tonemapping_fragment:Kd,tonemapping_pars_fragment:$d,transmission_fragment:jd,transmission_pars_fragment:Zd,uv_pars_fragment:Jd,uv_pars_vertex:Qd,uv_vertex:tf,worldpos_vertex:ef,background_vert:nf,background_frag:sf,backgroundCube_vert:rf,backgroundCube_frag:af,cube_vert:of,cube_frag:lf,depth_vert:cf,depth_frag:hf,distanceRGBA_vert:uf,distanceRGBA_frag:df,equirect_vert:ff,equirect_frag:pf,linedashed_vert:mf,linedashed_frag:_f,meshbasic_vert:gf,meshbasic_frag:xf,meshlambert_vert:vf,meshlambert_frag:Mf,meshmatcap_vert:Sf,meshmatcap_frag:yf,meshnormal_vert:Ef,meshnormal_frag:wf,meshphong_vert:Tf,meshphong_frag:bf,meshphysical_vert:Af,meshphysical_frag:Rf,meshtoon_vert:Cf,meshtoon_frag:Pf,points_vert:Lf,points_frag:If,shadow_vert:Df,shadow_frag:Uf,sprite_vert:Nf,sprite_frag:Ff},nt={common:{diffuse:{value:new Ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Lt}},envmap:{envMap:{value:null},envMapRotation:{value:new Lt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Lt},normalScale:{value:new Rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0},uvTransform:{value:new Lt}},sprite:{diffuse:{value:new Ot(16777215)},opacity:{value:1},center:{value:new Rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}}},rn={basic:{uniforms:Pe([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.fog]),vertexShader:Pt.meshbasic_vert,fragmentShader:Pt.meshbasic_frag},lambert:{uniforms:Pe([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Pt.meshlambert_vert,fragmentShader:Pt.meshlambert_frag},phong:{uniforms:Pe([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new Ot(0)},specular:{value:new Ot(1118481)},shininess:{value:30}}]),vertexShader:Pt.meshphong_vert,fragmentShader:Pt.meshphong_frag},standard:{uniforms:Pe([nt.common,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.roughnessmap,nt.metalnessmap,nt.fog,nt.lights,{emissive:{value:new Ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Pt.meshphysical_vert,fragmentShader:Pt.meshphysical_frag},toon:{uniforms:Pe([nt.common,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.gradientmap,nt.fog,nt.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Pt.meshtoon_vert,fragmentShader:Pt.meshtoon_frag},matcap:{uniforms:Pe([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,{matcap:{value:null}}]),vertexShader:Pt.meshmatcap_vert,fragmentShader:Pt.meshmatcap_frag},points:{uniforms:Pe([nt.points,nt.fog]),vertexShader:Pt.points_vert,fragmentShader:Pt.points_frag},dashed:{uniforms:Pe([nt.common,nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Pt.linedashed_vert,fragmentShader:Pt.linedashed_frag},depth:{uniforms:Pe([nt.common,nt.displacementmap]),vertexShader:Pt.depth_vert,fragmentShader:Pt.depth_frag},normal:{uniforms:Pe([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,{opacity:{value:1}}]),vertexShader:Pt.meshnormal_vert,fragmentShader:Pt.meshnormal_frag},sprite:{uniforms:Pe([nt.sprite,nt.fog]),vertexShader:Pt.sprite_vert,fragmentShader:Pt.sprite_frag},background:{uniforms:{uvTransform:{value:new Lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Pt.background_vert,fragmentShader:Pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Lt}},vertexShader:Pt.backgroundCube_vert,fragmentShader:Pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Pt.cube_vert,fragmentShader:Pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Pt.equirect_vert,fragmentShader:Pt.equirect_frag},distanceRGBA:{uniforms:Pe([nt.common,nt.displacementmap,{referencePosition:{value:new x},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Pt.distanceRGBA_vert,fragmentShader:Pt.distanceRGBA_frag},shadow:{uniforms:Pe([nt.lights,nt.fog,{color:{value:new Ot(0)},opacity:{value:1}}]),vertexShader:Pt.shadow_vert,fragmentShader:Pt.shadow_frag}};rn.physical={uniforms:Pe([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Lt},clearcoatNormalScale:{value:new Rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Lt},sheen:{value:0},sheenColor:{value:new Ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Lt},transmissionSamplerSize:{value:new Rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Lt},attenuationDistance:{value:0},attenuationColor:{value:new Ot(0)},specularColor:{value:new Ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Lt},anisotropyVector:{value:new Rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Lt}}]),vertexShader:Pt.meshphysical_vert,fragmentShader:Pt.meshphysical_frag};const Ns={r:0,b:0,g:0},qn=new hn,Of=new ie;function Bf(s,t,e,n,i,r,o){const a=new Ot(0);let l=r===!0?0:1,c,h,f=null,p=0,m=null;function _(w){let E=w.isScene===!0?w.background:null;return E&&E.isTexture&&(E=(w.backgroundBlurriness>0?e:t).get(E)),E}function g(w){let E=!1;const T=_(w);T===null?u(a,l):T&&T.isColor&&(u(T,1),E=!0);const N=s.xr.getEnvironmentBlendMode();N==="additive"?n.buffers.color.setClear(0,0,0,1,o):N==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function d(w,E){const T=_(E);T&&(T.isCubeTexture||T.mapping===ur)?(h===void 0&&(h=new at(new kt(1,1,1),new Fn({name:"BackgroundCubeMaterial",uniforms:Fi(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:Fe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(N,R,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),qn.copy(E.backgroundRotation),qn.x*=-1,qn.y*=-1,qn.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(qn.y*=-1,qn.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Of.makeRotationFromEuler(qn)),h.material.toneMapped=Jt.getTransfer(T.colorSpace)!==se,(f!==T||p!==T.version||m!==s.toneMapping)&&(h.material.needsUpdate=!0,f=T,p=T.version,m=s.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new at(new ln(2,2),new Fn({name:"BackgroundMaterial",uniforms:Fi(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:Un,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=Jt.getTransfer(T.colorSpace)!==se,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(f!==T||p!==T.version||m!==s.toneMapping)&&(c.material.needsUpdate=!0,f=T,p=T.version,m=s.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function u(w,E){w.getRGB(Ns,ec(s)),n.buffers.color.setClear(Ns.r,Ns.g,Ns.b,E,o)}return{getClearColor:function(){return a},setClearColor:function(w,E=1){a.set(w),l=E,u(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,u(a,l)},render:g,addToRenderList:d}}function zf(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=p(null);let r=i,o=!1;function a(M,C,H,O,W){let q=!1;const G=f(O,H,C);r!==G&&(r=G,c(r.object)),q=m(M,O,H,W),q&&_(M,O,H,W),W!==null&&t.update(W,s.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,T(M,C,H,O),W!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function l(){return s.createVertexArray()}function c(M){return s.bindVertexArray(M)}function h(M){return s.deleteVertexArray(M)}function f(M,C,H){const O=H.wireframe===!0;let W=n[M.id];W===void 0&&(W={},n[M.id]=W);let q=W[C.id];q===void 0&&(q={},W[C.id]=q);let G=q[O];return G===void 0&&(G=p(l()),q[O]=G),G}function p(M){const C=[],H=[],O=[];for(let W=0;W<e;W++)C[W]=0,H[W]=0,O[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:H,attributeDivisors:O,object:M,attributes:{},index:null}}function m(M,C,H,O){const W=r.attributes,q=C.attributes;let G=0;const $=H.getAttributes();for(const k in $)if($[k].location>=0){const ft=W[k];let _t=q[k];if(_t===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(_t=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(_t=M.instanceColor)),ft===void 0||ft.attribute!==_t||_t&&ft.data!==_t.data)return!0;G++}return r.attributesNum!==G||r.index!==O}function _(M,C,H,O){const W={},q=C.attributes;let G=0;const $=H.getAttributes();for(const k in $)if($[k].location>=0){let ft=q[k];ft===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(ft=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(ft=M.instanceColor));const _t={};_t.attribute=ft,ft&&ft.data&&(_t.data=ft.data),W[k]=_t,G++}r.attributes=W,r.attributesNum=G,r.index=O}function g(){const M=r.newAttributes;for(let C=0,H=M.length;C<H;C++)M[C]=0}function d(M){u(M,0)}function u(M,C){const H=r.newAttributes,O=r.enabledAttributes,W=r.attributeDivisors;H[M]=1,O[M]===0&&(s.enableVertexAttribArray(M),O[M]=1),W[M]!==C&&(s.vertexAttribDivisor(M,C),W[M]=C)}function w(){const M=r.newAttributes,C=r.enabledAttributes;for(let H=0,O=C.length;H<O;H++)C[H]!==M[H]&&(s.disableVertexAttribArray(H),C[H]=0)}function E(M,C,H,O,W,q,G){G===!0?s.vertexAttribIPointer(M,C,H,W,q):s.vertexAttribPointer(M,C,H,O,W,q)}function T(M,C,H,O){g();const W=O.attributes,q=H.getAttributes(),G=C.defaultAttributeValues;for(const $ in q){const k=q[$];if(k.location>=0){let ht=W[$];if(ht===void 0&&($==="instanceMatrix"&&M.instanceMatrix&&(ht=M.instanceMatrix),$==="instanceColor"&&M.instanceColor&&(ht=M.instanceColor)),ht!==void 0){const ft=ht.normalized,_t=ht.itemSize,Gt=t.get(ht);if(Gt===void 0)continue;const Qt=Gt.buffer,X=Gt.type,J=Gt.bytesPerElement,dt=X===s.INT||X===s.UNSIGNED_INT||ht.gpuType===kl;if(ht.isInterleavedBufferAttribute){const rt=ht.data,Nt=rt.stride,It=ht.offset;if(rt.isInstancedInterleavedBuffer){for(let qt=0;qt<k.locationSize;qt++)u(k.location+qt,rt.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let qt=0;qt<k.locationSize;qt++)d(k.location+qt);s.bindBuffer(s.ARRAY_BUFFER,Qt);for(let qt=0;qt<k.locationSize;qt++)E(k.location+qt,_t/k.locationSize,X,ft,Nt*J,(It+_t/k.locationSize*qt)*J,dt)}else{if(ht.isInstancedBufferAttribute){for(let rt=0;rt<k.locationSize;rt++)u(k.location+rt,ht.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let rt=0;rt<k.locationSize;rt++)d(k.location+rt);s.bindBuffer(s.ARRAY_BUFFER,Qt);for(let rt=0;rt<k.locationSize;rt++)E(k.location+rt,_t/k.locationSize,X,ft,_t*J,_t/k.locationSize*rt*J,dt)}}else if(G!==void 0){const ft=G[$];if(ft!==void 0)switch(ft.length){case 2:s.vertexAttrib2fv(k.location,ft);break;case 3:s.vertexAttrib3fv(k.location,ft);break;case 4:s.vertexAttrib4fv(k.location,ft);break;default:s.vertexAttrib1fv(k.location,ft)}}}}w()}function N(){D();for(const M in n){const C=n[M];for(const H in C){const O=C[H];for(const W in O)h(O[W].object),delete O[W];delete C[H]}delete n[M]}}function R(M){if(n[M.id]===void 0)return;const C=n[M.id];for(const H in C){const O=C[H];for(const W in O)h(O[W].object),delete O[W];delete C[H]}delete n[M.id]}function A(M){for(const C in n){const H=n[C];if(H[M.id]===void 0)continue;const O=H[M.id];for(const W in O)h(O[W].object),delete O[W];delete H[M.id]}}function D(){y(),o=!0,r!==i&&(r=i,c(r.object))}function y(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:D,resetDefaultState:y,dispose:N,releaseStatesOfGeometry:R,releaseStatesOfProgram:A,initAttributes:g,enableAttribute:d,disableUnusedAttributes:w}}function Hf(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,f){f!==0&&(s.drawArraysInstanced(n,c,h,f),e.update(h,n,f))}function a(c,h,f){if(f===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<f;m++)this.render(c[m],h[m]);else{p.multiDrawArraysWEBGL(n,c,0,h,0,f);let m=0;for(let _=0;_<f;_++)m+=h[_];e.update(m,n,1)}}function l(c,h,f,p){if(f===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<c.length;_++)o(c[_],h[_],p[_]);else{m.multiDrawArraysInstancedWEBGL(n,c,0,h,0,p,0,f);let _=0;for(let g=0;g<f;g++)_+=h[g];for(let g=0;g<p.length;g++)e.update(_,n,p[g])}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function kf(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(R){return!(R!==on&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const A=R===dr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Nn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Pn&&!A)}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const f=e.logarithmicDepthBuffer===!0,p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),d=s.getParameter(s.MAX_VERTEX_ATTRIBS),u=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),w=s.getParameter(s.MAX_VARYING_VECTORS),E=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),T=m>0,N=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:d,maxVertexUniforms:u,maxVaryings:w,maxFragmentUniforms:E,vertexTextures:T,maxSamples:N}}function Gf(s){const t=this;let e=null,n=0,i=!1,r=!1;const o=new bn,a=new Lt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,p){const m=f.length!==0||p||n!==0||i;return i=p,n=f.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,p){e=h(f,p,0)},this.setState=function(f,p,m){const _=f.clippingPlanes,g=f.clipIntersection,d=f.clipShadows,u=s.get(f);if(!i||_===null||_.length===0||r&&!d)r?h(null):c();else{const w=r?0:n,E=w*4;let T=u.clippingState||null;l.value=T,T=h(_,p,E,m);for(let N=0;N!==E;++N)T[N]=e[N];u.clippingState=T,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,p,m,_){const g=f!==null?f.length:0;let d=null;if(g!==0){if(d=l.value,_!==!0||d===null){const u=m+g*4,w=p.matrixWorldInverse;a.getNormalMatrix(w),(d===null||d.length<u)&&(d=new Float32Array(u));for(let E=0,T=m;E!==g;++E,T+=4)o.copy(f[E]).applyMatrix4(w,a),o.normal.toArray(d,T),d[T+3]=o.constant}l.value=d,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,d}}function Vf(s){let t=new WeakMap;function e(o,a){return a===ha?o.mapping=Li:a===ua&&(o.mapping=Ii),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ha||a===ua)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Qh(l.height);return c.fromEquirectangularTexture(s,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class rc extends nc{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const bi=4,Vo=[.125,.215,.35,.446,.526,.582],Zn=20,qr=new rc,Wo=new Ot;let Yr=null,Kr=0,$r=0,jr=!1;const Kn=(1+Math.sqrt(5))/2,vi=1/Kn,Xo=[new x(-Kn,vi,0),new x(Kn,vi,0),new x(-vi,0,Kn),new x(vi,0,Kn),new x(0,Kn,-vi),new x(0,Kn,vi),new x(-1,1,-1),new x(1,1,-1),new x(-1,1,1),new x(1,1,1)];class qo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Yr=this._renderer.getRenderTarget(),Kr=this._renderer.getActiveCubeFace(),$r=this._renderer.getActiveMipmapLevel(),jr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$o(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ko(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Yr,Kr,$r),this._renderer.xr.enabled=jr,t.scissorTest=!1,Fs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Li||t.mapping===Ii?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Yr=this._renderer.getRenderTarget(),Kr=this._renderer.getActiveCubeFace(),$r=this._renderer.getActiveMipmapLevel(),jr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Je,minFilter:Je,generateMipmaps:!1,type:dr,format:on,colorSpace:Bn,depthBuffer:!1},i=Yo(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yo(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Wf(r)),this._blurMaterial=Xf(r,t,e)}return i}_compileMaterial(t){const e=new at(this._lodPlanes[0],t);this._renderer.compile(e,qr)}_sceneToCubeUV(t,e,n,i){const a=new He(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,p=h.toneMapping;h.getClearColor(Wo),h.toneMapping=In,h.autoClear=!1;const m=new oe({name:"PMREM.Background",side:Fe,depthWrite:!1,depthTest:!1}),_=new at(new kt,m);let g=!1;const d=t.background;d?d.isColor&&(m.color.copy(d),t.background=null,g=!0):(m.color.copy(Wo),g=!0);for(let u=0;u<6;u++){const w=u%3;w===0?(a.up.set(0,l[u],0),a.lookAt(c[u],0,0)):w===1?(a.up.set(0,0,l[u]),a.lookAt(0,c[u],0)):(a.up.set(0,l[u],0),a.lookAt(0,0,c[u]));const E=this._cubeSize;Fs(i,w*E,u>2?E:0,E,E),h.setRenderTarget(i),g&&h.render(_,a),h.render(t,a)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=p,h.autoClear=f,t.background=d}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Li||t.mapping===Ii;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=$o()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ko());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new at(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Fs(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,qr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Xo[(i-r-1)%Xo.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new at(this._lodPlanes[i],c),p=c.uniforms,m=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Zn-1),g=r/_,d=isFinite(r)?1+Math.floor(h*g):Zn;d>Zn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${Zn}`);const u=[];let w=0;for(let A=0;A<Zn;++A){const D=A/g,y=Math.exp(-D*D/2);u.push(y),A===0?w+=y:A<d&&(w+=2*y)}for(let A=0;A<u.length;A++)u[A]=u[A]/w;p.envMap.value=t.texture,p.samples.value=d,p.weights.value=u,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);const{_lodMax:E}=this;p.dTheta.value=_,p.mipInt.value=E-n;const T=this._sizeLods[i],N=3*T*(i>E-bi?i-E+bi:0),R=4*(this._cubeSize-T);Fs(e,N,R,3*T,2*T),l.setRenderTarget(e),l.render(f,qr)}}function Wf(s){const t=[],e=[],n=[];let i=s;const r=s-bi+1+Vo.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>s-bi?l=Vo[o-s+bi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,f=1+c,p=[h,h,f,h,f,f,h,h,f,f,h,f],m=6,_=6,g=3,d=2,u=1,w=new Float32Array(g*_*m),E=new Float32Array(d*_*m),T=new Float32Array(u*_*m);for(let R=0;R<m;R++){const A=R%3*2/3-1,D=R>2?0:-1,y=[A,D,0,A+2/3,D,0,A+2/3,D+1,0,A,D,0,A+2/3,D+1,0,A,D+1,0];w.set(y,g*_*R),E.set(p,d*_*R);const M=[R,R,R,R,R,R];T.set(M,u*_*R)}const N=new we;N.setAttribute("position",new qe(w,g)),N.setAttribute("uv",new qe(E,d)),N.setAttribute("faceIndex",new qe(T,u)),t.push(N),i>bi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Yo(s,t,e){const n=new ei(s,t,e);return n.texture.mapping=ur,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Fs(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Xf(s,t,e){const n=new Float32Array(Zn),i=new x(0,1,0);return new Fn({name:"SphericalGaussianBlur",defines:{n:Zn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Da(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Ko(){return new Fn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Da(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function $o(){return new Fn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Da(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Da(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function qf(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===ha||l===ua,h=l===Li||l===Ii;if(c||h){let f=t.get(a);const p=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return e===null&&(e=new qo(s)),f=c?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{const m=a.image;return c&&m&&m.height>0||h&&m&&i(m)?(e===null&&(e=new qo(s)),f=c?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",r),f.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Yf(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Pa("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Kf(s,t,e,n){const i={},r=new WeakMap;function o(f){const p=f.target;p.index!==null&&t.remove(p.index);for(const _ in p.attributes)t.remove(p.attributes[_]);for(const _ in p.morphAttributes){const g=p.morphAttributes[_];for(let d=0,u=g.length;d<u;d++)t.remove(g[d])}p.removeEventListener("dispose",o),delete i[p.id];const m=r.get(p);m&&(t.remove(m),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function a(f,p){return i[p.id]===!0||(p.addEventListener("dispose",o),i[p.id]=!0,e.memory.geometries++),p}function l(f){const p=f.attributes;for(const _ in p)t.update(p[_],s.ARRAY_BUFFER);const m=f.morphAttributes;for(const _ in m){const g=m[_];for(let d=0,u=g.length;d<u;d++)t.update(g[d],s.ARRAY_BUFFER)}}function c(f){const p=[],m=f.index,_=f.attributes.position;let g=0;if(m!==null){const w=m.array;g=m.version;for(let E=0,T=w.length;E<T;E+=3){const N=w[E+0],R=w[E+1],A=w[E+2];p.push(N,R,R,A,A,N)}}else if(_!==void 0){const w=_.array;g=_.version;for(let E=0,T=w.length/3-1;E<T;E+=3){const N=E+0,R=E+1,A=E+2;p.push(N,R,R,A,A,N)}}else return;const d=new($l(p)?tc:Ql)(p,1);d.version=g;const u=r.get(f);u&&t.remove(u),r.set(f,d)}function h(f){const p=r.get(f);if(p){const m=f.index;m!==null&&p.version<m.version&&c(f)}else c(f);return r.get(f)}return{get:a,update:l,getWireframeAttribute:h}}function $f(s,t,e){let n;function i(p){n=p}let r,o;function a(p){r=p.type,o=p.bytesPerElement}function l(p,m){s.drawElements(n,m,r,p*o),e.update(m,n,1)}function c(p,m,_){_!==0&&(s.drawElementsInstanced(n,m,r,p*o,_),e.update(m,n,_))}function h(p,m,_){if(_===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let d=0;d<_;d++)this.render(p[d]/o,m[d]);else{g.multiDrawElementsWEBGL(n,m,0,r,p,0,_);let d=0;for(let u=0;u<_;u++)d+=m[u];e.update(d,n,1)}}function f(p,m,_,g){if(_===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let u=0;u<p.length;u++)c(p[u]/o,m[u],g[u]);else{d.multiDrawElementsInstancedWEBGL(n,m,0,r,p,0,g,0,_);let u=0;for(let w=0;w<_;w++)u+=m[w];for(let w=0;w<g.length;w++)e.update(u,n,g[w])}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function jf(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Zf(s,t,e){const n=new WeakMap,i=new re;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=h!==void 0?h.length:0;let p=n.get(a);if(p===void 0||p.count!==f){let M=function(){D.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var m=M;p!==void 0&&p.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,d=a.morphAttributes.color!==void 0,u=a.morphAttributes.position||[],w=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let T=0;_===!0&&(T=1),g===!0&&(T=2),d===!0&&(T=3);let N=a.attributes.position.count*T,R=1;N>t.maxTextureSize&&(R=Math.ceil(N/t.maxTextureSize),N=t.maxTextureSize);const A=new Float32Array(N*R*4*f),D=new Zl(A,N,R,f);D.type=Pn,D.needsUpdate=!0;const y=T*4;for(let C=0;C<f;C++){const H=u[C],O=w[C],W=E[C],q=N*R*4*C;for(let G=0;G<H.count;G++){const $=G*y;_===!0&&(i.fromBufferAttribute(H,G),A[q+$+0]=i.x,A[q+$+1]=i.y,A[q+$+2]=i.z,A[q+$+3]=0),g===!0&&(i.fromBufferAttribute(O,G),A[q+$+4]=i.x,A[q+$+5]=i.y,A[q+$+6]=i.z,A[q+$+7]=0),d===!0&&(i.fromBufferAttribute(W,G),A[q+$+8]=i.x,A[q+$+9]=i.y,A[q+$+10]=i.z,A[q+$+11]=W.itemSize===4?i.w:1)}}p={count:f,texture:D,size:new Rt(N,R)},n.set(a,p),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let _=0;for(let d=0;d<c.length;d++)_+=c[d];const g=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",p.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",p.size)}return{update:r}}function Jf(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,f=t.get(l,h);if(i.get(f)!==c&&(t.update(f),i.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;i.get(p)!==c&&(p.update(),i.set(p,c))}return f}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class ac extends De{constructor(t,e,n,i,r,o,a,l,c,h=Ri){if(h!==Ri&&h!==Ni)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ri&&(n=Di),n===void 0&&h===Ni&&(n=Ui),super(null,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Xe,this.minFilter=l!==void 0?l:Xe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const oc=new De,lc=new ac(1,1);lc.compareFunction=Kl;const cc=new Zl,hc=new Oh,uc=new ic,jo=[],Zo=[],Jo=new Float32Array(16),Qo=new Float32Array(9),tl=new Float32Array(4);function zi(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=jo[i];if(r===void 0&&(r=new Float32Array(i),jo[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function ge(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function xe(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function mr(s,t){let e=Zo[t];e===void 0&&(e=new Int32Array(t),Zo[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Qf(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function tp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;s.uniform2fv(this.addr,t),xe(e,t)}}function ep(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ge(e,t))return;s.uniform3fv(this.addr,t),xe(e,t)}}function np(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;s.uniform4fv(this.addr,t),xe(e,t)}}function ip(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),xe(e,t)}else{if(ge(e,n))return;tl.set(n),s.uniformMatrix2fv(this.addr,!1,tl),xe(e,n)}}function sp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),xe(e,t)}else{if(ge(e,n))return;Qo.set(n),s.uniformMatrix3fv(this.addr,!1,Qo),xe(e,n)}}function rp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),xe(e,t)}else{if(ge(e,n))return;Jo.set(n),s.uniformMatrix4fv(this.addr,!1,Jo),xe(e,n)}}function ap(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function op(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;s.uniform2iv(this.addr,t),xe(e,t)}}function lp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;s.uniform3iv(this.addr,t),xe(e,t)}}function cp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;s.uniform4iv(this.addr,t),xe(e,t)}}function hp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function up(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;s.uniform2uiv(this.addr,t),xe(e,t)}}function dp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;s.uniform3uiv(this.addr,t),xe(e,t)}}function fp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;s.uniform4uiv(this.addr,t),xe(e,t)}}function pp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);const r=this.type===s.SAMPLER_2D_SHADOW?lc:oc;e.setTexture2D(t||r,i)}function mp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||hc,i)}function _p(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||uc,i)}function gp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||cc,i)}function xp(s){switch(s){case 5126:return Qf;case 35664:return tp;case 35665:return ep;case 35666:return np;case 35674:return ip;case 35675:return sp;case 35676:return rp;case 5124:case 35670:return ap;case 35667:case 35671:return op;case 35668:case 35672:return lp;case 35669:case 35673:return cp;case 5125:return hp;case 36294:return up;case 36295:return dp;case 36296:return fp;case 35678:case 36198:case 36298:case 36306:case 35682:return pp;case 35679:case 36299:case 36307:return mp;case 35680:case 36300:case 36308:case 36293:return _p;case 36289:case 36303:case 36311:case 36292:return gp}}function vp(s,t){s.uniform1fv(this.addr,t)}function Mp(s,t){const e=zi(t,this.size,2);s.uniform2fv(this.addr,e)}function Sp(s,t){const e=zi(t,this.size,3);s.uniform3fv(this.addr,e)}function yp(s,t){const e=zi(t,this.size,4);s.uniform4fv(this.addr,e)}function Ep(s,t){const e=zi(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function wp(s,t){const e=zi(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Tp(s,t){const e=zi(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function bp(s,t){s.uniform1iv(this.addr,t)}function Ap(s,t){s.uniform2iv(this.addr,t)}function Rp(s,t){s.uniform3iv(this.addr,t)}function Cp(s,t){s.uniform4iv(this.addr,t)}function Pp(s,t){s.uniform1uiv(this.addr,t)}function Lp(s,t){s.uniform2uiv(this.addr,t)}function Ip(s,t){s.uniform3uiv(this.addr,t)}function Dp(s,t){s.uniform4uiv(this.addr,t)}function Up(s,t,e){const n=this.cache,i=t.length,r=mr(e,i);ge(n,r)||(s.uniform1iv(this.addr,r),xe(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||oc,r[o])}function Np(s,t,e){const n=this.cache,i=t.length,r=mr(e,i);ge(n,r)||(s.uniform1iv(this.addr,r),xe(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||hc,r[o])}function Fp(s,t,e){const n=this.cache,i=t.length,r=mr(e,i);ge(n,r)||(s.uniform1iv(this.addr,r),xe(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||uc,r[o])}function Op(s,t,e){const n=this.cache,i=t.length,r=mr(e,i);ge(n,r)||(s.uniform1iv(this.addr,r),xe(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||cc,r[o])}function Bp(s){switch(s){case 5126:return vp;case 35664:return Mp;case 35665:return Sp;case 35666:return yp;case 35674:return Ep;case 35675:return wp;case 35676:return Tp;case 5124:case 35670:return bp;case 35667:case 35671:return Ap;case 35668:case 35672:return Rp;case 35669:case 35673:return Cp;case 5125:return Pp;case 36294:return Lp;case 36295:return Ip;case 36296:return Dp;case 35678:case 36198:case 36298:case 36306:case 35682:return Up;case 35679:case 36299:case 36307:return Np;case 35680:case 36300:case 36308:case 36293:return Fp;case 36289:case 36303:case 36311:case 36292:return Op}}class zp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=xp(e.type)}}class Hp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Bp(e.type)}}class kp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const Zr=/(\w+)(\])?(\[|\.)?/g;function el(s,t){s.seq.push(t),s.map[t.id]=t}function Gp(s,t,e){const n=s.name,i=n.length;for(Zr.lastIndex=0;;){const r=Zr.exec(n),o=Zr.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){el(e,c===void 0?new zp(a,s,t):new Hp(a,s,t));break}else{let f=e.map[a];f===void 0&&(f=new kp(a),el(e,f)),e=f}}}class qs{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);Gp(r,o,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function nl(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Vp=37297;let Wp=0;function Xp(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function qp(s){const t=Jt.getPrimaries(Jt.workingColorSpace),e=Jt.getPrimaries(s);let n;switch(t===e?n="":t===tr&&e===Qs?n="LinearDisplayP3ToLinearSRGB":t===Qs&&e===tr&&(n="LinearSRGBToLinearDisplayP3"),s){case Bn:case fr:return[n,"LinearTransferOETF"];case je:case Ca:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function il(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+Xp(s.getShaderSource(t),o)}else return i}function Yp(s,t){const e=qp(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Kp(s,t){let e;switch(t){case nh:e="Linear";break;case ih:e="Reinhard";break;case sh:e="OptimizedCineon";break;case zl:e="ACESFilmic";break;case ah:e="AgX";break;case oh:e="Neutral";break;case rh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function $p(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ts).join(`
`)}function jp(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Zp(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function ts(s){return s!==""}function sl(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function rl(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Jp=/^[ \t]*#include +<([\w\d./]+)>/gm;function _a(s){return s.replace(Jp,tm)}const Qp=new Map;function tm(s,t){let e=Pt[t];if(e===void 0){const n=Qp.get(t);if(n!==void 0)e=Pt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return _a(e)}const em=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function al(s){return s.replace(em,nm)}function nm(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function ol(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function im(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Ol?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Bl?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===gn&&(t="SHADOWMAP_TYPE_VSM"),t}function sm(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Li:case Ii:t="ENVMAP_TYPE_CUBE";break;case ur:t="ENVMAP_TYPE_CUBE_UV";break}return t}function rm(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Ii:t="ENVMAP_MODE_REFRACTION";break}return t}function am(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ra:t="ENVMAP_BLENDING_MULTIPLY";break;case th:t="ENVMAP_BLENDING_MIX";break;case eh:t="ENVMAP_BLENDING_ADD";break}return t}function om(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function lm(s,t,e,n){const i=s.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=im(e),c=sm(e),h=rm(e),f=am(e),p=om(e),m=$p(e),_=jp(r),g=i.createProgram();let d,u,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ts).join(`
`),d.length>0&&(d+=`
`),u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ts).join(`
`),u.length>0&&(u+=`
`)):(d=[ol(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ts).join(`
`),u=[ol(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==In?"#define TONE_MAPPING":"",e.toneMapping!==In?Pt.tonemapping_pars_fragment:"",e.toneMapping!==In?Kp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Pt.colorspace_pars_fragment,Yp("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ts).join(`
`)),o=_a(o),o=sl(o,e),o=rl(o,e),a=_a(a),a=sl(a,e),a=rl(a,e),o=al(o),a=al(a),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,d=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,u=["#define varying in",e.glslVersion===Eo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Eo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const E=w+d+o,T=w+u+a,N=nl(i,i.VERTEX_SHADER,E),R=nl(i,i.FRAGMENT_SHADER,T);i.attachShader(g,N),i.attachShader(g,R),e.index0AttributeName!==void 0?i.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function A(C){if(s.debug.checkShaderErrors){const H=i.getProgramInfoLog(g).trim(),O=i.getShaderInfoLog(N).trim(),W=i.getShaderInfoLog(R).trim();let q=!0,G=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(q=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,g,N,R);else{const $=il(i,N,"vertex"),k=il(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+H+`
`+$+`
`+k)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(O===""||W==="")&&(G=!1);G&&(C.diagnostics={runnable:q,programLog:H,vertexShader:{log:O,prefix:d},fragmentShader:{log:W,prefix:u}})}i.deleteShader(N),i.deleteShader(R),D=new qs(i,g),y=Zp(i,g)}let D;this.getUniforms=function(){return D===void 0&&A(this),D};let y;this.getAttributes=function(){return y===void 0&&A(this),y};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(g,Vp)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Wp++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=N,this.fragmentShader=R,this}let cm=0;class hm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new um(t),e.set(t,n)),n}}class um{constructor(t){this.id=cm++,this.code=t,this.usedTimes=0}}function dm(s,t,e,n,i,r,o){const a=new La,l=new hm,c=new Set,h=[],f=i.logarithmicDepthBuffer,p=i.vertexTextures;let m=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return c.add(y),y===0?"uv":`uv${y}`}function d(y,M,C,H,O){const W=H.fog,q=O.geometry,G=y.isMeshStandardMaterial?H.environment:null,$=(y.isMeshStandardMaterial?e:t).get(y.envMap||G),k=$&&$.mapping===ur?$.image.height:null,ht=_[y.type];y.precision!==null&&(m=i.getMaxPrecision(y.precision),m!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",m,"instead."));const ft=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,_t=ft!==void 0?ft.length:0;let Gt=0;q.morphAttributes.position!==void 0&&(Gt=1),q.morphAttributes.normal!==void 0&&(Gt=2),q.morphAttributes.color!==void 0&&(Gt=3);let Qt,X,J,dt;if(ht){const te=rn[ht];Qt=te.vertexShader,X=te.fragmentShader}else Qt=y.vertexShader,X=y.fragmentShader,l.update(y),J=l.getVertexShaderID(y),dt=l.getFragmentShaderID(y);const rt=s.getRenderTarget(),Nt=O.isInstancedMesh===!0,It=O.isBatchedMesh===!0,qt=!!y.map,L=!!y.matcap,Vt=!!$,zt=!!y.aoMap,ae=!!y.lightMap,yt=!!y.bumpMap,Yt=!!y.normalMap,Ft=!!y.displacementMap,Ct=!!y.emissiveMap,de=!!y.metalnessMap,b=!!y.roughnessMap,v=y.anisotropy>0,z=y.clearcoat>0,K=y.dispersion>0,j=y.iridescence>0,Z=y.sheen>0,Mt=y.transmission>0,it=v&&!!y.anisotropyMap,st=z&&!!y.clearcoatMap,Dt=z&&!!y.clearcoatNormalMap,Q=z&&!!y.clearcoatRoughnessMap,gt=j&&!!y.iridescenceMap,Bt=j&&!!y.iridescenceThicknessMap,bt=Z&&!!y.sheenColorMap,ot=Z&&!!y.sheenRoughnessMap,Ut=!!y.specularMap,Ht=!!y.specularColorMap,he=!!y.specularIntensityMap,P=Mt&&!!y.transmissionMap,lt=Mt&&!!y.thicknessMap,V=!!y.gradientMap,Y=!!y.alphaMap,et=y.alphaTest>0,At=!!y.alphaHash,$t=!!y.extensions;let ue=In;y.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(ue=s.toneMapping);const ve={shaderID:ht,shaderType:y.type,shaderName:y.name,vertexShader:Qt,fragmentShader:X,defines:y.defines,customVertexShaderID:J,customFragmentShaderID:dt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:m,batching:It,batchingColor:It&&O._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&O.instanceColor!==null,instancingMorph:Nt&&O.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:rt===null?s.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:Bn,alphaToCoverage:!!y.alphaToCoverage,map:qt,matcap:L,envMap:Vt,envMapMode:Vt&&$.mapping,envMapCubeUVHeight:k,aoMap:zt,lightMap:ae,bumpMap:yt,normalMap:Yt,displacementMap:p&&Ft,emissiveMap:Ct,normalMapObjectSpace:Yt&&y.normalMapType===Sh,normalMapTangentSpace:Yt&&y.normalMapType===Yl,metalnessMap:de,roughnessMap:b,anisotropy:v,anisotropyMap:it,clearcoat:z,clearcoatMap:st,clearcoatNormalMap:Dt,clearcoatRoughnessMap:Q,dispersion:K,iridescence:j,iridescenceMap:gt,iridescenceThicknessMap:Bt,sheen:Z,sheenColorMap:bt,sheenRoughnessMap:ot,specularMap:Ut,specularColorMap:Ht,specularIntensityMap:he,transmission:Mt,transmissionMap:P,thicknessMap:lt,gradientMap:V,opaque:y.transparent===!1&&y.blending===Ai&&y.alphaToCoverage===!1,alphaMap:Y,alphaTest:et,alphaHash:At,combine:y.combine,mapUv:qt&&g(y.map.channel),aoMapUv:zt&&g(y.aoMap.channel),lightMapUv:ae&&g(y.lightMap.channel),bumpMapUv:yt&&g(y.bumpMap.channel),normalMapUv:Yt&&g(y.normalMap.channel),displacementMapUv:Ft&&g(y.displacementMap.channel),emissiveMapUv:Ct&&g(y.emissiveMap.channel),metalnessMapUv:de&&g(y.metalnessMap.channel),roughnessMapUv:b&&g(y.roughnessMap.channel),anisotropyMapUv:it&&g(y.anisotropyMap.channel),clearcoatMapUv:st&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:Dt&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:gt&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:Bt&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:bt&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:ot&&g(y.sheenRoughnessMap.channel),specularMapUv:Ut&&g(y.specularMap.channel),specularColorMapUv:Ht&&g(y.specularColorMap.channel),specularIntensityMapUv:he&&g(y.specularIntensityMap.channel),transmissionMapUv:P&&g(y.transmissionMap.channel),thicknessMapUv:lt&&g(y.thicknessMap.channel),alphaMapUv:Y&&g(y.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(Yt||v),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!q.attributes.uv&&(qt||Y),fog:!!W,useFog:y.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:O.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:_t,morphTextureStride:Gt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&C.length>0,shadowMapType:s.shadowMap.type,toneMapping:ue,decodeVideoTexture:qt&&y.map.isVideoTexture===!0&&Jt.getTransfer(y.map.colorSpace)===se,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===We,flipSided:y.side===Fe,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:$t&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:$t&&y.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return ve.vertexUv1s=c.has(1),ve.vertexUv2s=c.has(2),ve.vertexUv3s=c.has(3),c.clear(),ve}function u(y){const M=[];if(y.shaderID?M.push(y.shaderID):(M.push(y.customVertexShaderID),M.push(y.customFragmentShaderID)),y.defines!==void 0)for(const C in y.defines)M.push(C),M.push(y.defines[C]);return y.isRawShaderMaterial===!1&&(w(M,y),E(M,y),M.push(s.outputColorSpace)),M.push(y.customProgramCacheKey),M.join()}function w(y,M){y.push(M.precision),y.push(M.outputColorSpace),y.push(M.envMapMode),y.push(M.envMapCubeUVHeight),y.push(M.mapUv),y.push(M.alphaMapUv),y.push(M.lightMapUv),y.push(M.aoMapUv),y.push(M.bumpMapUv),y.push(M.normalMapUv),y.push(M.displacementMapUv),y.push(M.emissiveMapUv),y.push(M.metalnessMapUv),y.push(M.roughnessMapUv),y.push(M.anisotropyMapUv),y.push(M.clearcoatMapUv),y.push(M.clearcoatNormalMapUv),y.push(M.clearcoatRoughnessMapUv),y.push(M.iridescenceMapUv),y.push(M.iridescenceThicknessMapUv),y.push(M.sheenColorMapUv),y.push(M.sheenRoughnessMapUv),y.push(M.specularMapUv),y.push(M.specularColorMapUv),y.push(M.specularIntensityMapUv),y.push(M.transmissionMapUv),y.push(M.thicknessMapUv),y.push(M.combine),y.push(M.fogExp2),y.push(M.sizeAttenuation),y.push(M.morphTargetsCount),y.push(M.morphAttributeCount),y.push(M.numDirLights),y.push(M.numPointLights),y.push(M.numSpotLights),y.push(M.numSpotLightMaps),y.push(M.numHemiLights),y.push(M.numRectAreaLights),y.push(M.numDirLightShadows),y.push(M.numPointLightShadows),y.push(M.numSpotLightShadows),y.push(M.numSpotLightShadowsWithMaps),y.push(M.numLightProbes),y.push(M.shadowMapType),y.push(M.toneMapping),y.push(M.numClippingPlanes),y.push(M.numClipIntersection),y.push(M.depthPacking)}function E(y,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.skinning&&a.enable(4),M.morphTargets&&a.enable(5),M.morphNormals&&a.enable(6),M.morphColors&&a.enable(7),M.premultipliedAlpha&&a.enable(8),M.shadowMapEnabled&&a.enable(9),M.doubleSided&&a.enable(10),M.flipSided&&a.enable(11),M.useDepthPacking&&a.enable(12),M.dithering&&a.enable(13),M.transmission&&a.enable(14),M.sheen&&a.enable(15),M.opaque&&a.enable(16),M.pointsUvs&&a.enable(17),M.decodeVideoTexture&&a.enable(18),M.alphaToCoverage&&a.enable(19),y.push(a.mask)}function T(y){const M=_[y.type];let C;if(M){const H=rn[M];C=$h.clone(H.uniforms)}else C=y.uniforms;return C}function N(y,M){let C;for(let H=0,O=h.length;H<O;H++){const W=h[H];if(W.cacheKey===M){C=W,++C.usedTimes;break}}return C===void 0&&(C=new lm(s,M,y,r),h.push(C)),C}function R(y){if(--y.usedTimes===0){const M=h.indexOf(y);h[M]=h[h.length-1],h.pop(),y.destroy()}}function A(y){l.remove(y)}function D(){l.dispose()}return{getParameters:d,getProgramCacheKey:u,getUniforms:T,acquireProgram:N,releaseProgram:R,releaseShaderCache:A,programs:h,dispose:D}}function fm(){let s=new WeakMap;function t(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function e(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function pm(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function ll(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function cl(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(f,p,m,_,g,d){let u=s[t];return u===void 0?(u={id:f.id,object:f,geometry:p,material:m,groupOrder:_,renderOrder:f.renderOrder,z:g,group:d},s[t]=u):(u.id=f.id,u.object=f,u.geometry=p,u.material=m,u.groupOrder=_,u.renderOrder=f.renderOrder,u.z=g,u.group=d),t++,u}function a(f,p,m,_,g,d){const u=o(f,p,m,_,g,d);m.transmission>0?n.push(u):m.transparent===!0?i.push(u):e.push(u)}function l(f,p,m,_,g,d){const u=o(f,p,m,_,g,d);m.transmission>0?n.unshift(u):m.transparent===!0?i.unshift(u):e.unshift(u)}function c(f,p){e.length>1&&e.sort(f||pm),n.length>1&&n.sort(p||ll),i.length>1&&i.sort(p||ll)}function h(){for(let f=t,p=s.length;f<p;f++){const m=s[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function mm(){let s=new WeakMap;function t(n,i){const r=s.get(n);let o;return r===void 0?(o=new cl,s.set(n,[o])):i>=r.length?(o=new cl,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function _m(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new x,color:new Ot};break;case"SpotLight":e={position:new x,direction:new x,color:new Ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new x,color:new Ot,distance:0,decay:0};break;case"HemisphereLight":e={direction:new x,skyColor:new Ot,groundColor:new Ot};break;case"RectAreaLight":e={color:new Ot,position:new x,halfWidth:new x,halfHeight:new x};break}return s[t.id]=e,e}}}function gm(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let xm=0;function vm(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Mm(s){const t=new _m,e=gm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new x);const i=new x,r=new ie,o=new ie;function a(c){let h=0,f=0,p=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let m=0,_=0,g=0,d=0,u=0,w=0,E=0,T=0,N=0,R=0,A=0;c.sort(vm);for(let y=0,M=c.length;y<M;y++){const C=c[y],H=C.color,O=C.intensity,W=C.distance,q=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=H.r*O,f+=H.g*O,p+=H.b*O;else if(C.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(C.sh.coefficients[G],O);A++}else if(C.isDirectionalLight){const G=t.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const $=C.shadow,k=e.get(C);k.shadowBias=$.bias,k.shadowNormalBias=$.normalBias,k.shadowRadius=$.radius,k.shadowMapSize=$.mapSize,n.directionalShadow[m]=k,n.directionalShadowMap[m]=q,n.directionalShadowMatrix[m]=C.shadow.matrix,w++}n.directional[m]=G,m++}else if(C.isSpotLight){const G=t.get(C);G.position.setFromMatrixPosition(C.matrixWorld),G.color.copy(H).multiplyScalar(O),G.distance=W,G.coneCos=Math.cos(C.angle),G.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),G.decay=C.decay,n.spot[g]=G;const $=C.shadow;if(C.map&&(n.spotLightMap[N]=C.map,N++,$.updateMatrices(C),C.castShadow&&R++),n.spotLightMatrix[g]=$.matrix,C.castShadow){const k=e.get(C);k.shadowBias=$.bias,k.shadowNormalBias=$.normalBias,k.shadowRadius=$.radius,k.shadowMapSize=$.mapSize,n.spotShadow[g]=k,n.spotShadowMap[g]=q,T++}g++}else if(C.isRectAreaLight){const G=t.get(C);G.color.copy(H).multiplyScalar(O),G.halfWidth.set(C.width*.5,0,0),G.halfHeight.set(0,C.height*.5,0),n.rectArea[d]=G,d++}else if(C.isPointLight){const G=t.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),G.distance=C.distance,G.decay=C.decay,C.castShadow){const $=C.shadow,k=e.get(C);k.shadowBias=$.bias,k.shadowNormalBias=$.normalBias,k.shadowRadius=$.radius,k.shadowMapSize=$.mapSize,k.shadowCameraNear=$.camera.near,k.shadowCameraFar=$.camera.far,n.pointShadow[_]=k,n.pointShadowMap[_]=q,n.pointShadowMatrix[_]=C.shadow.matrix,E++}n.point[_]=G,_++}else if(C.isHemisphereLight){const G=t.get(C);G.skyColor.copy(C.color).multiplyScalar(O),G.groundColor.copy(C.groundColor).multiplyScalar(O),n.hemi[u]=G,u++}}d>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=nt.LTC_FLOAT_1,n.rectAreaLTC2=nt.LTC_FLOAT_2):(n.rectAreaLTC1=nt.LTC_HALF_1,n.rectAreaLTC2=nt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=p;const D=n.hash;(D.directionalLength!==m||D.pointLength!==_||D.spotLength!==g||D.rectAreaLength!==d||D.hemiLength!==u||D.numDirectionalShadows!==w||D.numPointShadows!==E||D.numSpotShadows!==T||D.numSpotMaps!==N||D.numLightProbes!==A)&&(n.directional.length=m,n.spot.length=g,n.rectArea.length=d,n.point.length=_,n.hemi.length=u,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=T,n.spotShadowMap.length=T,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=T+N-R,n.spotLightMap.length=N,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=A,D.directionalLength=m,D.pointLength=_,D.spotLength=g,D.rectAreaLength=d,D.hemiLength=u,D.numDirectionalShadows=w,D.numPointShadows=E,D.numSpotShadows=T,D.numSpotMaps=N,D.numLightProbes=A,n.version=xm++)}function l(c,h){let f=0,p=0,m=0,_=0,g=0;const d=h.matrixWorldInverse;for(let u=0,w=c.length;u<w;u++){const E=c[u];if(E.isDirectionalLight){const T=n.directional[f];T.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),T.direction.sub(i),T.direction.transformDirection(d),f++}else if(E.isSpotLight){const T=n.spot[m];T.position.setFromMatrixPosition(E.matrixWorld),T.position.applyMatrix4(d),T.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),T.direction.sub(i),T.direction.transformDirection(d),m++}else if(E.isRectAreaLight){const T=n.rectArea[_];T.position.setFromMatrixPosition(E.matrixWorld),T.position.applyMatrix4(d),o.identity(),r.copy(E.matrixWorld),r.premultiply(d),o.extractRotation(r),T.halfWidth.set(E.width*.5,0,0),T.halfHeight.set(0,E.height*.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),_++}else if(E.isPointLight){const T=n.point[p];T.position.setFromMatrixPosition(E.matrixWorld),T.position.applyMatrix4(d),p++}else if(E.isHemisphereLight){const T=n.hemi[g];T.direction.setFromMatrixPosition(E.matrixWorld),T.direction.transformDirection(d),g++}}}return{setup:a,setupView:l,state:n}}function hl(s){const t=new Mm(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Sm(s){let t=new WeakMap;function e(i,r=0){const o=t.get(i);let a;return o===void 0?(a=new hl(s),t.set(i,[a])):r>=o.length?(a=new hl(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class ym extends zn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Em extends zn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const wm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Tm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function bm(s,t,e){let n=new Ia;const i=new Rt,r=new Rt,o=new re,a=new ym({depthPacking:Mh}),l=new Em,c={},h=e.maxTextureSize,f={[Un]:Fe,[Fe]:Un,[We]:We},p=new Fn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Rt},radius:{value:4}},vertexShader:wm,fragmentShader:Tm}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const _=new we;_.setAttribute("position",new qe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new at(_,p),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ol;let u=this.type;this.render=function(R,A,D){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||R.length===0)return;const y=s.getRenderTarget(),M=s.getActiveCubeFace(),C=s.getActiveMipmapLevel(),H=s.state;H.setBlending(Ln),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const O=u!==gn&&this.type===gn,W=u===gn&&this.type!==gn;for(let q=0,G=R.length;q<G;q++){const $=R[q],k=$.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);const ht=k.getFrameExtents();if(i.multiply(ht),r.copy(k.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/ht.x),i.x=r.x*ht.x,k.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/ht.y),i.y=r.y*ht.y,k.mapSize.y=r.y)),k.map===null||O===!0||W===!0){const _t=this.type!==gn?{minFilter:Xe,magFilter:Xe}:{};k.map!==null&&k.map.dispose(),k.map=new ei(i.x,i.y,_t),k.map.texture.name=$.name+".shadowMap",k.camera.updateProjectionMatrix()}s.setRenderTarget(k.map),s.clear();const ft=k.getViewportCount();for(let _t=0;_t<ft;_t++){const Gt=k.getViewport(_t);o.set(r.x*Gt.x,r.y*Gt.y,r.x*Gt.z,r.y*Gt.w),H.viewport(o),k.updateMatrices($,_t),n=k.getFrustum(),T(A,D,k.camera,$,this.type)}k.isPointLightShadow!==!0&&this.type===gn&&w(k,D),k.needsUpdate=!1}u=this.type,d.needsUpdate=!1,s.setRenderTarget(y,M,C)};function w(R,A){const D=t.update(g);p.defines.VSM_SAMPLES!==R.blurSamples&&(p.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new ei(i.x,i.y)),p.uniforms.shadow_pass.value=R.map.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,s.setRenderTarget(R.mapPass),s.clear(),s.renderBufferDirect(A,null,D,p,g,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,s.setRenderTarget(R.map),s.clear(),s.renderBufferDirect(A,null,D,m,g,null)}function E(R,A,D,y){let M=null;const C=D.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(C!==void 0)M=C;else if(M=D.isPointLight===!0?l:a,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const H=M.uuid,O=A.uuid;let W=c[H];W===void 0&&(W={},c[H]=W);let q=W[O];q===void 0&&(q=M.clone(),W[O]=q,A.addEventListener("dispose",N)),M=q}if(M.visible=A.visible,M.wireframe=A.wireframe,y===gn?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:f[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,D.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const H=s.properties.get(M);H.light=D}return M}function T(R,A,D,y,M){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&M===gn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,R.matrixWorld);const O=t.update(R),W=R.material;if(Array.isArray(W)){const q=O.groups;for(let G=0,$=q.length;G<$;G++){const k=q[G],ht=W[k.materialIndex];if(ht&&ht.visible){const ft=E(R,ht,y,M);R.onBeforeShadow(s,R,A,D,O,ft,k),s.renderBufferDirect(D,null,O,ft,R,k),R.onAfterShadow(s,R,A,D,O,ft,k)}}}else if(W.visible){const q=E(R,W,y,M);R.onBeforeShadow(s,R,A,D,O,q,null),s.renderBufferDirect(D,null,O,q,R,null),R.onAfterShadow(s,R,A,D,O,q,null)}}const H=R.children;for(let O=0,W=H.length;O<W;O++)T(H[O],A,D,y,M)}function N(R){R.target.removeEventListener("dispose",N);for(const D in c){const y=c[D],M=R.target.uuid;M in y&&(y[M].dispose(),delete y[M])}}}function Am(s){function t(){let P=!1;const lt=new re;let V=null;const Y=new re(0,0,0,0);return{setMask:function(et){V!==et&&!P&&(s.colorMask(et,et,et,et),V=et)},setLocked:function(et){P=et},setClear:function(et,At,$t,ue,ve){ve===!0&&(et*=ue,At*=ue,$t*=ue),lt.set(et,At,$t,ue),Y.equals(lt)===!1&&(s.clearColor(et,At,$t,ue),Y.copy(lt))},reset:function(){P=!1,V=null,Y.set(-1,0,0,0)}}}function e(){let P=!1,lt=null,V=null,Y=null;return{setTest:function(et){et?dt(s.DEPTH_TEST):rt(s.DEPTH_TEST)},setMask:function(et){lt!==et&&!P&&(s.depthMask(et),lt=et)},setFunc:function(et){if(V!==et){switch(et){case Yc:s.depthFunc(s.NEVER);break;case Kc:s.depthFunc(s.ALWAYS);break;case $c:s.depthFunc(s.LESS);break;case js:s.depthFunc(s.LEQUAL);break;case jc:s.depthFunc(s.EQUAL);break;case Zc:s.depthFunc(s.GEQUAL);break;case Jc:s.depthFunc(s.GREATER);break;case Qc:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}V=et}},setLocked:function(et){P=et},setClear:function(et){Y!==et&&(s.clearDepth(et),Y=et)},reset:function(){P=!1,lt=null,V=null,Y=null}}}function n(){let P=!1,lt=null,V=null,Y=null,et=null,At=null,$t=null,ue=null,ve=null;return{setTest:function(te){P||(te?dt(s.STENCIL_TEST):rt(s.STENCIL_TEST))},setMask:function(te){lt!==te&&!P&&(s.stencilMask(te),lt=te)},setFunc:function(te,en,nn){(V!==te||Y!==en||et!==nn)&&(s.stencilFunc(te,en,nn),V=te,Y=en,et=nn)},setOp:function(te,en,nn){(At!==te||$t!==en||ue!==nn)&&(s.stencilOp(te,en,nn),At=te,$t=en,ue=nn)},setLocked:function(te){P=te},setClear:function(te){ve!==te&&(s.clearStencil(te),ve=te)},reset:function(){P=!1,lt=null,V=null,Y=null,et=null,At=null,$t=null,ue=null,ve=null}}}const i=new t,r=new e,o=new n,a=new WeakMap,l=new WeakMap;let c={},h={},f=new WeakMap,p=[],m=null,_=!1,g=null,d=null,u=null,w=null,E=null,T=null,N=null,R=new Ot(0,0,0),A=0,D=!1,y=null,M=null,C=null,H=null,O=null;const W=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,G=0;const $=s.getParameter(s.VERSION);$.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec($)[1]),q=G>=1):$.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),q=G>=2);let k=null,ht={};const ft=s.getParameter(s.SCISSOR_BOX),_t=s.getParameter(s.VIEWPORT),Gt=new re().fromArray(ft),Qt=new re().fromArray(_t);function X(P,lt,V,Y){const et=new Uint8Array(4),At=s.createTexture();s.bindTexture(P,At),s.texParameteri(P,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(P,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let $t=0;$t<V;$t++)P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY?s.texImage3D(lt,0,s.RGBA,1,1,Y,0,s.RGBA,s.UNSIGNED_BYTE,et):s.texImage2D(lt+$t,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,et);return At}const J={};J[s.TEXTURE_2D]=X(s.TEXTURE_2D,s.TEXTURE_2D,1),J[s.TEXTURE_CUBE_MAP]=X(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[s.TEXTURE_2D_ARRAY]=X(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),J[s.TEXTURE_3D]=X(s.TEXTURE_3D,s.TEXTURE_3D,1,1),i.setClear(0,0,0,1),r.setClear(1),o.setClear(0),dt(s.DEPTH_TEST),r.setFunc(js),yt(!1),Yt(Xa),dt(s.CULL_FACE),zt(Ln);function dt(P){c[P]!==!0&&(s.enable(P),c[P]=!0)}function rt(P){c[P]!==!1&&(s.disable(P),c[P]=!1)}function Nt(P,lt){return h[P]!==lt?(s.bindFramebuffer(P,lt),h[P]=lt,P===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=lt),P===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=lt),!0):!1}function It(P,lt){let V=p,Y=!1;if(P){V=f.get(lt),V===void 0&&(V=[],f.set(lt,V));const et=P.textures;if(V.length!==et.length||V[0]!==s.COLOR_ATTACHMENT0){for(let At=0,$t=et.length;At<$t;At++)V[At]=s.COLOR_ATTACHMENT0+At;V.length=et.length,Y=!0}}else V[0]!==s.BACK&&(V[0]=s.BACK,Y=!0);Y&&s.drawBuffers(V)}function qt(P){return m!==P?(s.useProgram(P),m=P,!0):!1}const L={[jn]:s.FUNC_ADD,[Pc]:s.FUNC_SUBTRACT,[Lc]:s.FUNC_REVERSE_SUBTRACT};L[Ic]=s.MIN,L[Dc]=s.MAX;const Vt={[Uc]:s.ZERO,[Nc]:s.ONE,[Fc]:s.SRC_COLOR,[la]:s.SRC_ALPHA,[Gc]:s.SRC_ALPHA_SATURATE,[Hc]:s.DST_COLOR,[Bc]:s.DST_ALPHA,[Oc]:s.ONE_MINUS_SRC_COLOR,[ca]:s.ONE_MINUS_SRC_ALPHA,[kc]:s.ONE_MINUS_DST_COLOR,[zc]:s.ONE_MINUS_DST_ALPHA,[Vc]:s.CONSTANT_COLOR,[Wc]:s.ONE_MINUS_CONSTANT_COLOR,[Xc]:s.CONSTANT_ALPHA,[qc]:s.ONE_MINUS_CONSTANT_ALPHA};function zt(P,lt,V,Y,et,At,$t,ue,ve,te){if(P===Ln){_===!0&&(rt(s.BLEND),_=!1);return}if(_===!1&&(dt(s.BLEND),_=!0),P!==Cc){if(P!==g||te!==D){if((d!==jn||E!==jn)&&(s.blendEquation(s.FUNC_ADD),d=jn,E=jn),te)switch(P){case Ai:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case qa:s.blendFunc(s.ONE,s.ONE);break;case Ya:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ka:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case Ai:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case qa:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Ya:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ka:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}u=null,w=null,T=null,N=null,R.set(0,0,0),A=0,g=P,D=te}return}et=et||lt,At=At||V,$t=$t||Y,(lt!==d||et!==E)&&(s.blendEquationSeparate(L[lt],L[et]),d=lt,E=et),(V!==u||Y!==w||At!==T||$t!==N)&&(s.blendFuncSeparate(Vt[V],Vt[Y],Vt[At],Vt[$t]),u=V,w=Y,T=At,N=$t),(ue.equals(R)===!1||ve!==A)&&(s.blendColor(ue.r,ue.g,ue.b,ve),R.copy(ue),A=ve),g=P,D=!1}function ae(P,lt){P.side===We?rt(s.CULL_FACE):dt(s.CULL_FACE);let V=P.side===Fe;lt&&(V=!V),yt(V),P.blending===Ai&&P.transparent===!1?zt(Ln):zt(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),r.setFunc(P.depthFunc),r.setTest(P.depthTest),r.setMask(P.depthWrite),i.setMask(P.colorWrite);const Y=P.stencilWrite;o.setTest(Y),Y&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),Ct(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?dt(s.SAMPLE_ALPHA_TO_COVERAGE):rt(s.SAMPLE_ALPHA_TO_COVERAGE)}function yt(P){y!==P&&(P?s.frontFace(s.CW):s.frontFace(s.CCW),y=P)}function Yt(P){P!==Ac?(dt(s.CULL_FACE),P!==M&&(P===Xa?s.cullFace(s.BACK):P===Rc?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):rt(s.CULL_FACE),M=P}function Ft(P){P!==C&&(q&&s.lineWidth(P),C=P)}function Ct(P,lt,V){P?(dt(s.POLYGON_OFFSET_FILL),(H!==lt||O!==V)&&(s.polygonOffset(lt,V),H=lt,O=V)):rt(s.POLYGON_OFFSET_FILL)}function de(P){P?dt(s.SCISSOR_TEST):rt(s.SCISSOR_TEST)}function b(P){P===void 0&&(P=s.TEXTURE0+W-1),k!==P&&(s.activeTexture(P),k=P)}function v(P,lt,V){V===void 0&&(k===null?V=s.TEXTURE0+W-1:V=k);let Y=ht[V];Y===void 0&&(Y={type:void 0,texture:void 0},ht[V]=Y),(Y.type!==P||Y.texture!==lt)&&(k!==V&&(s.activeTexture(V),k=V),s.bindTexture(P,lt||J[P]),Y.type=P,Y.texture=lt)}function z(){const P=ht[k];P!==void 0&&P.type!==void 0&&(s.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function K(){try{s.compressedTexImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function j(){try{s.compressedTexImage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Z(){try{s.texSubImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Mt(){try{s.texSubImage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function it(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function st(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Dt(){try{s.texStorage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Q(){try{s.texStorage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function gt(){try{s.texImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Bt(){try{s.texImage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function bt(P){Gt.equals(P)===!1&&(s.scissor(P.x,P.y,P.z,P.w),Gt.copy(P))}function ot(P){Qt.equals(P)===!1&&(s.viewport(P.x,P.y,P.z,P.w),Qt.copy(P))}function Ut(P,lt){let V=l.get(lt);V===void 0&&(V=new WeakMap,l.set(lt,V));let Y=V.get(P);Y===void 0&&(Y=s.getUniformBlockIndex(lt,P.name),V.set(P,Y))}function Ht(P,lt){const Y=l.get(lt).get(P);a.get(lt)!==Y&&(s.uniformBlockBinding(lt,Y,P.__bindingPointIndex),a.set(lt,Y))}function he(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),c={},k=null,ht={},h={},f=new WeakMap,p=[],m=null,_=!1,g=null,d=null,u=null,w=null,E=null,T=null,N=null,R=new Ot(0,0,0),A=0,D=!1,y=null,M=null,C=null,H=null,O=null,Gt.set(0,0,s.canvas.width,s.canvas.height),Qt.set(0,0,s.canvas.width,s.canvas.height),i.reset(),r.reset(),o.reset()}return{buffers:{color:i,depth:r,stencil:o},enable:dt,disable:rt,bindFramebuffer:Nt,drawBuffers:It,useProgram:qt,setBlending:zt,setMaterial:ae,setFlipSided:yt,setCullFace:Yt,setLineWidth:Ft,setPolygonOffset:Ct,setScissorTest:de,activeTexture:b,bindTexture:v,unbindTexture:z,compressedTexImage2D:K,compressedTexImage3D:j,texImage2D:gt,texImage3D:Bt,updateUBOMapping:Ut,uniformBlockBinding:Ht,texStorage2D:Dt,texStorage3D:Q,texSubImage2D:Z,texSubImage3D:Mt,compressedTexSubImage2D:it,compressedTexSubImage3D:st,scissor:bt,viewport:ot,reset:he}}function Rm(s,t,e,n,i,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Rt,h=new WeakMap;let f;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(b,v){return m?new OffscreenCanvas(b,v):nr("canvas")}function g(b,v,z){let K=1;const j=de(b);if((j.width>z||j.height>z)&&(K=z/Math.max(j.width,j.height)),K<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const Z=Math.floor(K*j.width),Mt=Math.floor(K*j.height);f===void 0&&(f=_(Z,Mt));const it=v?_(Z,Mt):f;return it.width=Z,it.height=Mt,it.getContext("2d").drawImage(b,0,0,Z,Mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+Z+"x"+Mt+")."),it}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),b;return b}function d(b){return b.generateMipmaps&&b.minFilter!==Xe&&b.minFilter!==Je}function u(b){s.generateMipmap(b)}function w(b,v,z,K,j=!1){if(b!==null){if(s[b]!==void 0)return s[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let Z=v;if(v===s.RED&&(z===s.FLOAT&&(Z=s.R32F),z===s.HALF_FLOAT&&(Z=s.R16F),z===s.UNSIGNED_BYTE&&(Z=s.R8)),v===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.R8UI),z===s.UNSIGNED_SHORT&&(Z=s.R16UI),z===s.UNSIGNED_INT&&(Z=s.R32UI),z===s.BYTE&&(Z=s.R8I),z===s.SHORT&&(Z=s.R16I),z===s.INT&&(Z=s.R32I)),v===s.RG&&(z===s.FLOAT&&(Z=s.RG32F),z===s.HALF_FLOAT&&(Z=s.RG16F),z===s.UNSIGNED_BYTE&&(Z=s.RG8)),v===s.RG_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.RG8UI),z===s.UNSIGNED_SHORT&&(Z=s.RG16UI),z===s.UNSIGNED_INT&&(Z=s.RG32UI),z===s.BYTE&&(Z=s.RG8I),z===s.SHORT&&(Z=s.RG16I),z===s.INT&&(Z=s.RG32I)),v===s.RGB&&z===s.UNSIGNED_INT_5_9_9_9_REV&&(Z=s.RGB9_E5),v===s.RGBA){const Mt=j?Js:Jt.getTransfer(K);z===s.FLOAT&&(Z=s.RGBA32F),z===s.HALF_FLOAT&&(Z=s.RGBA16F),z===s.UNSIGNED_BYTE&&(Z=Mt===se?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT_4_4_4_4&&(Z=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(Z=s.RGB5_A1)}return(Z===s.R16F||Z===s.R32F||Z===s.RG16F||Z===s.RG32F||Z===s.RGBA16F||Z===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function E(b,v){let z;return b?v===null||v===Di||v===Ui?z=s.DEPTH24_STENCIL8:v===Pn?z=s.DEPTH32F_STENCIL8:v===Zs&&(z=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Di||v===Ui?z=s.DEPTH_COMPONENT24:v===Pn?z=s.DEPTH_COMPONENT32F:v===Zs&&(z=s.DEPTH_COMPONENT16),z}function T(b,v){return d(b)===!0||b.isFramebufferTexture&&b.minFilter!==Xe&&b.minFilter!==Je?Math.log2(Math.max(v.width,v.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?v.mipmaps.length:1}function N(b){const v=b.target;v.removeEventListener("dispose",N),A(v),v.isVideoTexture&&h.delete(v)}function R(b){const v=b.target;v.removeEventListener("dispose",R),y(v)}function A(b){const v=n.get(b);if(v.__webglInit===void 0)return;const z=b.source,K=p.get(z);if(K){const j=K[v.__cacheKey];j.usedTimes--,j.usedTimes===0&&D(b),Object.keys(K).length===0&&p.delete(z)}n.remove(b)}function D(b){const v=n.get(b);s.deleteTexture(v.__webglTexture);const z=b.source,K=p.get(z);delete K[v.__cacheKey],o.memory.textures--}function y(b){const v=n.get(b);if(b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(v.__webglFramebuffer[K]))for(let j=0;j<v.__webglFramebuffer[K].length;j++)s.deleteFramebuffer(v.__webglFramebuffer[K][j]);else s.deleteFramebuffer(v.__webglFramebuffer[K]);v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer[K])}else{if(Array.isArray(v.__webglFramebuffer))for(let K=0;K<v.__webglFramebuffer.length;K++)s.deleteFramebuffer(v.__webglFramebuffer[K]);else s.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&s.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let K=0;K<v.__webglColorRenderbuffer.length;K++)v.__webglColorRenderbuffer[K]&&s.deleteRenderbuffer(v.__webglColorRenderbuffer[K]);v.__webglDepthRenderbuffer&&s.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const z=b.textures;for(let K=0,j=z.length;K<j;K++){const Z=n.get(z[K]);Z.__webglTexture&&(s.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(z[K])}n.remove(b)}let M=0;function C(){M=0}function H(){const b=M;return b>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+i.maxTextures),M+=1,b}function O(b){const v=[];return v.push(b.wrapS),v.push(b.wrapT),v.push(b.wrapR||0),v.push(b.magFilter),v.push(b.minFilter),v.push(b.anisotropy),v.push(b.internalFormat),v.push(b.format),v.push(b.type),v.push(b.generateMipmaps),v.push(b.premultiplyAlpha),v.push(b.flipY),v.push(b.unpackAlignment),v.push(b.colorSpace),v.join()}function W(b,v){const z=n.get(b);if(b.isVideoTexture&&Ft(b),b.isRenderTargetTexture===!1&&b.version>0&&z.__version!==b.version){const K=b.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Qt(z,b,v);return}}e.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+v)}function q(b,v){const z=n.get(b);if(b.version>0&&z.__version!==b.version){Qt(z,b,v);return}e.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+v)}function G(b,v){const z=n.get(b);if(b.version>0&&z.__version!==b.version){Qt(z,b,v);return}e.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+v)}function $(b,v){const z=n.get(b);if(b.version>0&&z.__version!==b.version){X(z,b,v);return}e.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+v)}const k={[da]:s.REPEAT,[Jn]:s.CLAMP_TO_EDGE,[fa]:s.MIRRORED_REPEAT},ht={[Xe]:s.NEAREST,[lh]:s.NEAREST_MIPMAP_NEAREST,[ms]:s.NEAREST_MIPMAP_LINEAR,[Je]:s.LINEAR,[Mr]:s.LINEAR_MIPMAP_NEAREST,[Qn]:s.LINEAR_MIPMAP_LINEAR},ft={[yh]:s.NEVER,[Rh]:s.ALWAYS,[Eh]:s.LESS,[Kl]:s.LEQUAL,[wh]:s.EQUAL,[Ah]:s.GEQUAL,[Th]:s.GREATER,[bh]:s.NOTEQUAL};function _t(b,v){if(v.type===Pn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Je||v.magFilter===Mr||v.magFilter===ms||v.magFilter===Qn||v.minFilter===Je||v.minFilter===Mr||v.minFilter===ms||v.minFilter===Qn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(b,s.TEXTURE_WRAP_S,k[v.wrapS]),s.texParameteri(b,s.TEXTURE_WRAP_T,k[v.wrapT]),(b===s.TEXTURE_3D||b===s.TEXTURE_2D_ARRAY)&&s.texParameteri(b,s.TEXTURE_WRAP_R,k[v.wrapR]),s.texParameteri(b,s.TEXTURE_MAG_FILTER,ht[v.magFilter]),s.texParameteri(b,s.TEXTURE_MIN_FILTER,ht[v.minFilter]),v.compareFunction&&(s.texParameteri(b,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(b,s.TEXTURE_COMPARE_FUNC,ft[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Xe||v.minFilter!==ms&&v.minFilter!==Qn||v.type===Pn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");s.texParameterf(b,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Gt(b,v){let z=!1;b.__webglInit===void 0&&(b.__webglInit=!0,v.addEventListener("dispose",N));const K=v.source;let j=p.get(K);j===void 0&&(j={},p.set(K,j));const Z=O(v);if(Z!==b.__cacheKey){j[Z]===void 0&&(j[Z]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,z=!0),j[Z].usedTimes++;const Mt=j[b.__cacheKey];Mt!==void 0&&(j[b.__cacheKey].usedTimes--,Mt.usedTimes===0&&D(v)),b.__cacheKey=Z,b.__webglTexture=j[Z].texture}return z}function Qt(b,v,z){let K=s.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(K=s.TEXTURE_2D_ARRAY),v.isData3DTexture&&(K=s.TEXTURE_3D);const j=Gt(b,v),Z=v.source;e.bindTexture(K,b.__webglTexture,s.TEXTURE0+z);const Mt=n.get(Z);if(Z.version!==Mt.__version||j===!0){e.activeTexture(s.TEXTURE0+z);const it=Jt.getPrimaries(Jt.workingColorSpace),st=v.colorSpace===Rn?null:Jt.getPrimaries(v.colorSpace),Dt=v.colorSpace===Rn||it===st?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);let Q=g(v.image,!1,i.maxTextureSize);Q=Ct(v,Q);const gt=r.convert(v.format,v.colorSpace),Bt=r.convert(v.type);let bt=w(v.internalFormat,gt,Bt,v.colorSpace,v.isVideoTexture);_t(K,v);let ot;const Ut=v.mipmaps,Ht=v.isVideoTexture!==!0,he=Mt.__version===void 0||j===!0,P=Z.dataReady,lt=T(v,Q);if(v.isDepthTexture)bt=E(v.format===Ni,v.type),he&&(Ht?e.texStorage2D(s.TEXTURE_2D,1,bt,Q.width,Q.height):e.texImage2D(s.TEXTURE_2D,0,bt,Q.width,Q.height,0,gt,Bt,null));else if(v.isDataTexture)if(Ut.length>0){Ht&&he&&e.texStorage2D(s.TEXTURE_2D,lt,bt,Ut[0].width,Ut[0].height);for(let V=0,Y=Ut.length;V<Y;V++)ot=Ut[V],Ht?P&&e.texSubImage2D(s.TEXTURE_2D,V,0,0,ot.width,ot.height,gt,Bt,ot.data):e.texImage2D(s.TEXTURE_2D,V,bt,ot.width,ot.height,0,gt,Bt,ot.data);v.generateMipmaps=!1}else Ht?(he&&e.texStorage2D(s.TEXTURE_2D,lt,bt,Q.width,Q.height),P&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Q.width,Q.height,gt,Bt,Q.data)):e.texImage2D(s.TEXTURE_2D,0,bt,Q.width,Q.height,0,gt,Bt,Q.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ht&&he&&e.texStorage3D(s.TEXTURE_2D_ARRAY,lt,bt,Ut[0].width,Ut[0].height,Q.depth);for(let V=0,Y=Ut.length;V<Y;V++)if(ot=Ut[V],v.format!==on)if(gt!==null)if(Ht){if(P)if(v.layerUpdates.size>0){for(const et of v.layerUpdates){const At=ot.width*ot.height;e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,V,0,0,et,ot.width,ot.height,1,gt,ot.data.slice(At*et,At*(et+1)),0,0)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,V,0,0,0,ot.width,ot.height,Q.depth,gt,ot.data,0,0)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,V,bt,ot.width,ot.height,Q.depth,0,ot.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?P&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,V,0,0,0,ot.width,ot.height,Q.depth,gt,Bt,ot.data):e.texImage3D(s.TEXTURE_2D_ARRAY,V,bt,ot.width,ot.height,Q.depth,0,gt,Bt,ot.data)}else{Ht&&he&&e.texStorage2D(s.TEXTURE_2D,lt,bt,Ut[0].width,Ut[0].height);for(let V=0,Y=Ut.length;V<Y;V++)ot=Ut[V],v.format!==on?gt!==null?Ht?P&&e.compressedTexSubImage2D(s.TEXTURE_2D,V,0,0,ot.width,ot.height,gt,ot.data):e.compressedTexImage2D(s.TEXTURE_2D,V,bt,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?P&&e.texSubImage2D(s.TEXTURE_2D,V,0,0,ot.width,ot.height,gt,Bt,ot.data):e.texImage2D(s.TEXTURE_2D,V,bt,ot.width,ot.height,0,gt,Bt,ot.data)}else if(v.isDataArrayTexture)if(Ht){if(he&&e.texStorage3D(s.TEXTURE_2D_ARRAY,lt,bt,Q.width,Q.height,Q.depth),P)if(v.layerUpdates.size>0){let V;switch(Bt){case s.UNSIGNED_BYTE:switch(gt){case s.ALPHA:V=1;break;case s.LUMINANCE:V=1;break;case s.LUMINANCE_ALPHA:V=2;break;case s.RGB:V=3;break;case s.RGBA:V=4;break;default:throw new Error(`Unknown texel size for format ${gt}.`)}break;case s.UNSIGNED_SHORT_4_4_4_4:case s.UNSIGNED_SHORT_5_5_5_1:case s.UNSIGNED_SHORT_5_6_5:V=1;break;default:throw new Error(`Unknown texel size for type ${Bt}.`)}const Y=Q.width*Q.height*V;for(const et of v.layerUpdates)e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,et,Q.width,Q.height,1,gt,Bt,Q.data.slice(Y*et,Y*(et+1)));v.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,gt,Bt,Q.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,bt,Q.width,Q.height,Q.depth,0,gt,Bt,Q.data);else if(v.isData3DTexture)Ht?(he&&e.texStorage3D(s.TEXTURE_3D,lt,bt,Q.width,Q.height,Q.depth),P&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,gt,Bt,Q.data)):e.texImage3D(s.TEXTURE_3D,0,bt,Q.width,Q.height,Q.depth,0,gt,Bt,Q.data);else if(v.isFramebufferTexture){if(he)if(Ht)e.texStorage2D(s.TEXTURE_2D,lt,bt,Q.width,Q.height);else{let V=Q.width,Y=Q.height;for(let et=0;et<lt;et++)e.texImage2D(s.TEXTURE_2D,et,bt,V,Y,0,gt,Bt,null),V>>=1,Y>>=1}}else if(Ut.length>0){if(Ht&&he){const V=de(Ut[0]);e.texStorage2D(s.TEXTURE_2D,lt,bt,V.width,V.height)}for(let V=0,Y=Ut.length;V<Y;V++)ot=Ut[V],Ht?P&&e.texSubImage2D(s.TEXTURE_2D,V,0,0,gt,Bt,ot):e.texImage2D(s.TEXTURE_2D,V,bt,gt,Bt,ot);v.generateMipmaps=!1}else if(Ht){if(he){const V=de(Q);e.texStorage2D(s.TEXTURE_2D,lt,bt,V.width,V.height)}P&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,gt,Bt,Q)}else e.texImage2D(s.TEXTURE_2D,0,bt,gt,Bt,Q);d(v)&&u(K),Mt.__version=Z.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function X(b,v,z){if(v.image.length!==6)return;const K=Gt(b,v),j=v.source;e.bindTexture(s.TEXTURE_CUBE_MAP,b.__webglTexture,s.TEXTURE0+z);const Z=n.get(j);if(j.version!==Z.__version||K===!0){e.activeTexture(s.TEXTURE0+z);const Mt=Jt.getPrimaries(Jt.workingColorSpace),it=v.colorSpace===Rn?null:Jt.getPrimaries(v.colorSpace),st=v.colorSpace===Rn||Mt===it?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,st);const Dt=v.isCompressedTexture||v.image[0].isCompressedTexture,Q=v.image[0]&&v.image[0].isDataTexture,gt=[];for(let Y=0;Y<6;Y++)!Dt&&!Q?gt[Y]=g(v.image[Y],!0,i.maxCubemapSize):gt[Y]=Q?v.image[Y].image:v.image[Y],gt[Y]=Ct(v,gt[Y]);const Bt=gt[0],bt=r.convert(v.format,v.colorSpace),ot=r.convert(v.type),Ut=w(v.internalFormat,bt,ot,v.colorSpace),Ht=v.isVideoTexture!==!0,he=Z.__version===void 0||K===!0,P=j.dataReady;let lt=T(v,Bt);_t(s.TEXTURE_CUBE_MAP,v);let V;if(Dt){Ht&&he&&e.texStorage2D(s.TEXTURE_CUBE_MAP,lt,Ut,Bt.width,Bt.height);for(let Y=0;Y<6;Y++){V=gt[Y].mipmaps;for(let et=0;et<V.length;et++){const At=V[et];v.format!==on?bt!==null?Ht?P&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,et,0,0,At.width,At.height,bt,At.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,et,Ut,At.width,At.height,0,At.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?P&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,et,0,0,At.width,At.height,bt,ot,At.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,et,Ut,At.width,At.height,0,bt,ot,At.data)}}}else{if(V=v.mipmaps,Ht&&he){V.length>0&&lt++;const Y=de(gt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,lt,Ut,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(Q){Ht?P&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,gt[Y].width,gt[Y].height,bt,ot,gt[Y].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Ut,gt[Y].width,gt[Y].height,0,bt,ot,gt[Y].data);for(let et=0;et<V.length;et++){const $t=V[et].image[Y].image;Ht?P&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,et+1,0,0,$t.width,$t.height,bt,ot,$t.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,et+1,Ut,$t.width,$t.height,0,bt,ot,$t.data)}}else{Ht?P&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,bt,ot,gt[Y]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Ut,bt,ot,gt[Y]);for(let et=0;et<V.length;et++){const At=V[et];Ht?P&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,et+1,0,0,bt,ot,At.image[Y]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,et+1,Ut,bt,ot,At.image[Y])}}}d(v)&&u(s.TEXTURE_CUBE_MAP),Z.__version=j.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function J(b,v,z,K,j,Z){const Mt=r.convert(z.format,z.colorSpace),it=r.convert(z.type),st=w(z.internalFormat,Mt,it,z.colorSpace);if(!n.get(v).__hasExternalTextures){const Q=Math.max(1,v.width>>Z),gt=Math.max(1,v.height>>Z);j===s.TEXTURE_3D||j===s.TEXTURE_2D_ARRAY?e.texImage3D(j,Z,st,Q,gt,v.depth,0,Mt,it,null):e.texImage2D(j,Z,st,Q,gt,0,Mt,it,null)}e.bindFramebuffer(s.FRAMEBUFFER,b),Yt(v)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,K,j,n.get(z).__webglTexture,0,yt(v)):(j===s.TEXTURE_2D||j>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,K,j,n.get(z).__webglTexture,Z),e.bindFramebuffer(s.FRAMEBUFFER,null)}function dt(b,v,z){if(s.bindRenderbuffer(s.RENDERBUFFER,b),v.depthBuffer){const K=v.depthTexture,j=K&&K.isDepthTexture?K.type:null,Z=E(v.stencilBuffer,j),Mt=v.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,it=yt(v);Yt(v)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,it,Z,v.width,v.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,it,Z,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,Z,v.width,v.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Mt,s.RENDERBUFFER,b)}else{const K=v.textures;for(let j=0;j<K.length;j++){const Z=K[j],Mt=r.convert(Z.format,Z.colorSpace),it=r.convert(Z.type),st=w(Z.internalFormat,Mt,it,Z.colorSpace),Dt=yt(v);z&&Yt(v)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Dt,st,v.width,v.height):Yt(v)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Dt,st,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,st,v.width,v.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function rt(b,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,b),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),W(v.depthTexture,0);const K=n.get(v.depthTexture).__webglTexture,j=yt(v);if(v.depthTexture.format===Ri)Yt(v)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,K,0,j):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,K,0);else if(v.depthTexture.format===Ni)Yt(v)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,K,0,j):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Nt(b){const v=n.get(b),z=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!v.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");rt(v.__webglFramebuffer,b)}else if(z){v.__webglDepthbuffer=[];for(let K=0;K<6;K++)e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[K]),v.__webglDepthbuffer[K]=s.createRenderbuffer(),dt(v.__webglDepthbuffer[K],b,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer=s.createRenderbuffer(),dt(v.__webglDepthbuffer,b,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function It(b,v,z){const K=n.get(b);v!==void 0&&J(K.__webglFramebuffer,b,b.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&Nt(b)}function qt(b){const v=b.texture,z=n.get(b),K=n.get(v);b.addEventListener("dispose",R);const j=b.textures,Z=b.isWebGLCubeRenderTarget===!0,Mt=j.length>1;if(Mt||(K.__webglTexture===void 0&&(K.__webglTexture=s.createTexture()),K.__version=v.version,o.memory.textures++),Z){z.__webglFramebuffer=[];for(let it=0;it<6;it++)if(v.mipmaps&&v.mipmaps.length>0){z.__webglFramebuffer[it]=[];for(let st=0;st<v.mipmaps.length;st++)z.__webglFramebuffer[it][st]=s.createFramebuffer()}else z.__webglFramebuffer[it]=s.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){z.__webglFramebuffer=[];for(let it=0;it<v.mipmaps.length;it++)z.__webglFramebuffer[it]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(Mt)for(let it=0,st=j.length;it<st;it++){const Dt=n.get(j[it]);Dt.__webglTexture===void 0&&(Dt.__webglTexture=s.createTexture(),o.memory.textures++)}if(b.samples>0&&Yt(b)===!1){z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let it=0;it<j.length;it++){const st=j[it];z.__webglColorRenderbuffer[it]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[it]);const Dt=r.convert(st.format,st.colorSpace),Q=r.convert(st.type),gt=w(st.internalFormat,Dt,Q,st.colorSpace,b.isXRRenderTarget===!0),Bt=yt(b);s.renderbufferStorageMultisample(s.RENDERBUFFER,Bt,gt,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+it,s.RENDERBUFFER,z.__webglColorRenderbuffer[it])}s.bindRenderbuffer(s.RENDERBUFFER,null),b.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),dt(z.__webglDepthRenderbuffer,b,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Z){e.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture),_t(s.TEXTURE_CUBE_MAP,v);for(let it=0;it<6;it++)if(v.mipmaps&&v.mipmaps.length>0)for(let st=0;st<v.mipmaps.length;st++)J(z.__webglFramebuffer[it][st],b,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+it,st);else J(z.__webglFramebuffer[it],b,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);d(v)&&u(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Mt){for(let it=0,st=j.length;it<st;it++){const Dt=j[it],Q=n.get(Dt);e.bindTexture(s.TEXTURE_2D,Q.__webglTexture),_t(s.TEXTURE_2D,Dt),J(z.__webglFramebuffer,b,Dt,s.COLOR_ATTACHMENT0+it,s.TEXTURE_2D,0),d(Dt)&&u(s.TEXTURE_2D)}e.unbindTexture()}else{let it=s.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(it=b.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(it,K.__webglTexture),_t(it,v),v.mipmaps&&v.mipmaps.length>0)for(let st=0;st<v.mipmaps.length;st++)J(z.__webglFramebuffer[st],b,v,s.COLOR_ATTACHMENT0,it,st);else J(z.__webglFramebuffer,b,v,s.COLOR_ATTACHMENT0,it,0);d(v)&&u(it),e.unbindTexture()}b.depthBuffer&&Nt(b)}function L(b){const v=b.textures;for(let z=0,K=v.length;z<K;z++){const j=v[z];if(d(j)){const Z=b.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Mt=n.get(j).__webglTexture;e.bindTexture(Z,Mt),u(Z),e.unbindTexture()}}}const Vt=[],zt=[];function ae(b){if(b.samples>0){if(Yt(b)===!1){const v=b.textures,z=b.width,K=b.height;let j=s.COLOR_BUFFER_BIT;const Z=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Mt=n.get(b),it=v.length>1;if(it)for(let st=0;st<v.length;st++)e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+st,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+st,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let st=0;st<v.length;st++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(j|=s.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(j|=s.STENCIL_BUFFER_BIT)),it){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Mt.__webglColorRenderbuffer[st]);const Dt=n.get(v[st]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Dt,0)}s.blitFramebuffer(0,0,z,K,0,0,z,K,j,s.NEAREST),l===!0&&(Vt.length=0,zt.length=0,Vt.push(s.COLOR_ATTACHMENT0+st),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Vt.push(Z),zt.push(Z),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,zt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Vt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),it)for(let st=0;st<v.length;st++){e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+st,s.RENDERBUFFER,Mt.__webglColorRenderbuffer[st]);const Dt=n.get(v[st]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+st,s.TEXTURE_2D,Dt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const v=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[v])}}}function yt(b){return Math.min(i.maxSamples,b.samples)}function Yt(b){const v=n.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Ft(b){const v=o.render.frame;h.get(b)!==v&&(h.set(b,v),b.update())}function Ct(b,v){const z=b.colorSpace,K=b.format,j=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||z!==Bn&&z!==Rn&&(Jt.getTransfer(z)===se?(K!==on||j!==Nn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),v}function de(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=C,this.setTexture2D=W,this.setTexture2DArray=q,this.setTexture3D=G,this.setTextureCube=$,this.rebindTextures=It,this.setupRenderTarget=qt,this.updateRenderTargetMipmap=L,this.updateMultisampleRenderTarget=ae,this.setupDepthRenderbuffer=Nt,this.setupFrameBufferTexture=J,this.useMultisampledRTT=Yt}function Cm(s,t){function e(n,i=Rn){let r;const o=Jt.getTransfer(i);if(n===Nn)return s.UNSIGNED_BYTE;if(n===Gl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Vl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===uh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===ch)return s.BYTE;if(n===hh)return s.SHORT;if(n===Zs)return s.UNSIGNED_SHORT;if(n===kl)return s.INT;if(n===Di)return s.UNSIGNED_INT;if(n===Pn)return s.FLOAT;if(n===dr)return s.HALF_FLOAT;if(n===dh)return s.ALPHA;if(n===fh)return s.RGB;if(n===on)return s.RGBA;if(n===ph)return s.LUMINANCE;if(n===mh)return s.LUMINANCE_ALPHA;if(n===Ri)return s.DEPTH_COMPONENT;if(n===Ni)return s.DEPTH_STENCIL;if(n===_h)return s.RED;if(n===Wl)return s.RED_INTEGER;if(n===gh)return s.RG;if(n===Xl)return s.RG_INTEGER;if(n===ql)return s.RGBA_INTEGER;if(n===Sr||n===yr||n===Er||n===wr)if(o===se)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Sr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Er)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Sr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Er)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===$a||n===ja||n===Za||n===Ja)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===$a)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ja)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Za)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ja)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Qa||n===to||n===eo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Qa||n===to)return o===se?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===eo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===no||n===io||n===so||n===ro||n===ao||n===oo||n===lo||n===co||n===ho||n===uo||n===fo||n===po||n===mo||n===_o)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===no)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===io)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===so)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ro)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ao)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===oo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===lo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===co)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ho)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===uo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===fo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===po)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===mo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===_o)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Tr||n===go||n===xo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Tr)return o===se?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===go)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===xo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===xh||n===vo||n===Mo||n===So)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Tr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===vo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Mo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===So)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ui?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class Pm extends He{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ti extends _e{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Lm={type:"move"};class Jr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ti,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ti,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new x,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new x),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ti,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new x,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new x),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const g of t.hand.values()){const d=e.getJointPose(g,n),u=this._getHandJoint(c,g);d!==null&&(u.matrix.fromArray(d.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=d.radius),u.visible=d!==null}const h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],p=h.position.distanceTo(f.position),m=.02,_=.005;c.inputState.pinching&&p>m+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&p<=m-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Lm)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ti;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Im=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Dm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Um{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new De,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Fn({vertexShader:Im,fragmentShader:Dm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new at(new ln(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}}class Nm extends Bi{constructor(t,e){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,f=null,p=null,m=null,_=null;const g=new Um,d=e.getContextAttributes();let u=null,w=null;const E=[],T=[],N=new Rt;let R=null;const A=new He;A.layers.enable(1),A.viewport=new re;const D=new He;D.layers.enable(2),D.viewport=new re;const y=[A,D],M=new Pm;M.layers.enable(1),M.layers.enable(2);let C=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let J=E[X];return J===void 0&&(J=new Jr,E[X]=J),J.getTargetRaySpace()},this.getControllerGrip=function(X){let J=E[X];return J===void 0&&(J=new Jr,E[X]=J),J.getGripSpace()},this.getHand=function(X){let J=E[X];return J===void 0&&(J=new Jr,E[X]=J),J.getHandSpace()};function O(X){const J=T.indexOf(X.inputSource);if(J===-1)return;const dt=E[J];dt!==void 0&&(dt.update(X.inputSource,X.frame,c||o),dt.dispatchEvent({type:X.type,data:X.inputSource}))}function W(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",W),i.removeEventListener("inputsourceschange",q);for(let X=0;X<E.length;X++){const J=T[X];J!==null&&(T[X]=null,E[X].disconnect(J))}C=null,H=null,g.reset(),t.setRenderTarget(u),m=null,p=null,f=null,i=null,w=null,Qt.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(X){if(i=X,i!==null){if(u=t.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",W),i.addEventListener("inputsourceschange",q),d.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(N),i.renderState.layers===void 0){const J={antialias:d.antialias,alpha:!0,depth:d.depth,stencil:d.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(i,e,J),i.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),w=new ei(m.framebufferWidth,m.framebufferHeight,{format:on,type:Nn,colorSpace:t.outputColorSpace,stencilBuffer:d.stencil})}else{let J=null,dt=null,rt=null;d.depth&&(rt=d.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,J=d.stencil?Ni:Ri,dt=d.stencil?Ui:Di);const Nt={colorFormat:e.RGBA8,depthFormat:rt,scaleFactor:r};f=new XRWebGLBinding(i,e),p=f.createProjectionLayer(Nt),i.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),w=new ei(p.textureWidth,p.textureHeight,{format:on,type:Nn,depthTexture:new ac(p.textureWidth,p.textureHeight,dt,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:d.stencil,colorSpace:t.outputColorSpace,samples:d.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Qt.setContext(i),Qt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function q(X){for(let J=0;J<X.removed.length;J++){const dt=X.removed[J],rt=T.indexOf(dt);rt>=0&&(T[rt]=null,E[rt].disconnect(dt))}for(let J=0;J<X.added.length;J++){const dt=X.added[J];let rt=T.indexOf(dt);if(rt===-1){for(let It=0;It<E.length;It++)if(It>=T.length){T.push(dt),rt=It;break}else if(T[It]===null){T[It]=dt,rt=It;break}if(rt===-1)break}const Nt=E[rt];Nt&&Nt.connect(dt)}}const G=new x,$=new x;function k(X,J,dt){G.setFromMatrixPosition(J.matrixWorld),$.setFromMatrixPosition(dt.matrixWorld);const rt=G.distanceTo($),Nt=J.projectionMatrix.elements,It=dt.projectionMatrix.elements,qt=Nt[14]/(Nt[10]-1),L=Nt[14]/(Nt[10]+1),Vt=(Nt[9]+1)/Nt[5],zt=(Nt[9]-1)/Nt[5],ae=(Nt[8]-1)/Nt[0],yt=(It[8]+1)/It[0],Yt=qt*ae,Ft=qt*yt,Ct=rt/(-ae+yt),de=Ct*-ae;J.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(de),X.translateZ(Ct),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();const b=qt+Ct,v=L+Ct,z=Yt-de,K=Ft+(rt-de),j=Vt*L/v*b,Z=zt*L/v*b;X.projectionMatrix.makePerspective(z,K,j,Z,b,v),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function ht(X,J){J===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(J.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(i===null)return;g.texture!==null&&(X.near=g.depthNear,X.far=g.depthFar),M.near=D.near=A.near=X.near,M.far=D.far=A.far=X.far,(C!==M.near||H!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),C=M.near,H=M.far,A.near=C,A.far=H,D.near=C,D.far=H,A.updateProjectionMatrix(),D.updateProjectionMatrix(),X.updateProjectionMatrix());const J=X.parent,dt=M.cameras;ht(M,J);for(let rt=0;rt<dt.length;rt++)ht(dt[rt],J);dt.length===2?k(M,A,D):M.projectionMatrix.copy(A.projectionMatrix),ft(X,M,J)};function ft(X,J,dt){dt===null?X.matrix.copy(J.matrixWorld):(X.matrix.copy(dt.matrixWorld),X.matrix.invert(),X.matrix.multiply(J.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(J.projectionMatrix),X.projectionMatrixInverse.copy(J.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=ma*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(p===null&&m===null))return l},this.setFoveation=function(X){l=X,p!==null&&(p.fixedFoveation=X),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=X)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(M)};let _t=null;function Gt(X,J){if(h=J.getViewerPose(c||o),_=J,h!==null){const dt=h.views;m!==null&&(t.setRenderTargetFramebuffer(w,m.framebuffer),t.setRenderTarget(w));let rt=!1;dt.length!==M.cameras.length&&(M.cameras.length=0,rt=!0);for(let It=0;It<dt.length;It++){const qt=dt[It];let L=null;if(m!==null)L=m.getViewport(qt);else{const zt=f.getViewSubImage(p,qt);L=zt.viewport,It===0&&(t.setRenderTargetTextures(w,zt.colorTexture,p.ignoreDepthValues?void 0:zt.depthStencilTexture),t.setRenderTarget(w))}let Vt=y[It];Vt===void 0&&(Vt=new He,Vt.layers.enable(It),Vt.viewport=new re,y[It]=Vt),Vt.matrix.fromArray(qt.transform.matrix),Vt.matrix.decompose(Vt.position,Vt.quaternion,Vt.scale),Vt.projectionMatrix.fromArray(qt.projectionMatrix),Vt.projectionMatrixInverse.copy(Vt.projectionMatrix).invert(),Vt.viewport.set(L.x,L.y,L.width,L.height),It===0&&(M.matrix.copy(Vt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),rt===!0&&M.cameras.push(Vt)}const Nt=i.enabledFeatures;if(Nt&&Nt.includes("depth-sensing")){const It=f.getDepthInformation(dt[0]);It&&It.isValid&&It.texture&&g.init(t,It,i.renderState)}}for(let dt=0;dt<E.length;dt++){const rt=T[dt],Nt=E[dt];rt!==null&&Nt!==void 0&&Nt.update(rt,J,c||o)}_t&&_t(X,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),_=null}const Qt=new sc;Qt.setAnimationLoop(Gt),this.setAnimationLoop=function(X){_t=X},this.dispose=function(){}}}const Yn=new hn,Fm=new ie;function Om(s,t){function e(d,u){d.matrixAutoUpdate===!0&&d.updateMatrix(),u.value.copy(d.matrix)}function n(d,u){u.color.getRGB(d.fogColor.value,ec(s)),u.isFog?(d.fogNear.value=u.near,d.fogFar.value=u.far):u.isFogExp2&&(d.fogDensity.value=u.density)}function i(d,u,w,E,T){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(d,u):u.isMeshToonMaterial?(r(d,u),f(d,u)):u.isMeshPhongMaterial?(r(d,u),h(d,u)):u.isMeshStandardMaterial?(r(d,u),p(d,u),u.isMeshPhysicalMaterial&&m(d,u,T)):u.isMeshMatcapMaterial?(r(d,u),_(d,u)):u.isMeshDepthMaterial?r(d,u):u.isMeshDistanceMaterial?(r(d,u),g(d,u)):u.isMeshNormalMaterial?r(d,u):u.isLineBasicMaterial?(o(d,u),u.isLineDashedMaterial&&a(d,u)):u.isPointsMaterial?l(d,u,w,E):u.isSpriteMaterial?c(d,u):u.isShadowMaterial?(d.color.value.copy(u.color),d.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(d,u){d.opacity.value=u.opacity,u.color&&d.diffuse.value.copy(u.color),u.emissive&&d.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(d.map.value=u.map,e(u.map,d.mapTransform)),u.alphaMap&&(d.alphaMap.value=u.alphaMap,e(u.alphaMap,d.alphaMapTransform)),u.bumpMap&&(d.bumpMap.value=u.bumpMap,e(u.bumpMap,d.bumpMapTransform),d.bumpScale.value=u.bumpScale,u.side===Fe&&(d.bumpScale.value*=-1)),u.normalMap&&(d.normalMap.value=u.normalMap,e(u.normalMap,d.normalMapTransform),d.normalScale.value.copy(u.normalScale),u.side===Fe&&d.normalScale.value.negate()),u.displacementMap&&(d.displacementMap.value=u.displacementMap,e(u.displacementMap,d.displacementMapTransform),d.displacementScale.value=u.displacementScale,d.displacementBias.value=u.displacementBias),u.emissiveMap&&(d.emissiveMap.value=u.emissiveMap,e(u.emissiveMap,d.emissiveMapTransform)),u.specularMap&&(d.specularMap.value=u.specularMap,e(u.specularMap,d.specularMapTransform)),u.alphaTest>0&&(d.alphaTest.value=u.alphaTest);const w=t.get(u),E=w.envMap,T=w.envMapRotation;E&&(d.envMap.value=E,Yn.copy(T),Yn.x*=-1,Yn.y*=-1,Yn.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Yn.y*=-1,Yn.z*=-1),d.envMapRotation.value.setFromMatrix4(Fm.makeRotationFromEuler(Yn)),d.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=u.reflectivity,d.ior.value=u.ior,d.refractionRatio.value=u.refractionRatio),u.lightMap&&(d.lightMap.value=u.lightMap,d.lightMapIntensity.value=u.lightMapIntensity,e(u.lightMap,d.lightMapTransform)),u.aoMap&&(d.aoMap.value=u.aoMap,d.aoMapIntensity.value=u.aoMapIntensity,e(u.aoMap,d.aoMapTransform))}function o(d,u){d.diffuse.value.copy(u.color),d.opacity.value=u.opacity,u.map&&(d.map.value=u.map,e(u.map,d.mapTransform))}function a(d,u){d.dashSize.value=u.dashSize,d.totalSize.value=u.dashSize+u.gapSize,d.scale.value=u.scale}function l(d,u,w,E){d.diffuse.value.copy(u.color),d.opacity.value=u.opacity,d.size.value=u.size*w,d.scale.value=E*.5,u.map&&(d.map.value=u.map,e(u.map,d.uvTransform)),u.alphaMap&&(d.alphaMap.value=u.alphaMap,e(u.alphaMap,d.alphaMapTransform)),u.alphaTest>0&&(d.alphaTest.value=u.alphaTest)}function c(d,u){d.diffuse.value.copy(u.color),d.opacity.value=u.opacity,d.rotation.value=u.rotation,u.map&&(d.map.value=u.map,e(u.map,d.mapTransform)),u.alphaMap&&(d.alphaMap.value=u.alphaMap,e(u.alphaMap,d.alphaMapTransform)),u.alphaTest>0&&(d.alphaTest.value=u.alphaTest)}function h(d,u){d.specular.value.copy(u.specular),d.shininess.value=Math.max(u.shininess,1e-4)}function f(d,u){u.gradientMap&&(d.gradientMap.value=u.gradientMap)}function p(d,u){d.metalness.value=u.metalness,u.metalnessMap&&(d.metalnessMap.value=u.metalnessMap,e(u.metalnessMap,d.metalnessMapTransform)),d.roughness.value=u.roughness,u.roughnessMap&&(d.roughnessMap.value=u.roughnessMap,e(u.roughnessMap,d.roughnessMapTransform)),u.envMap&&(d.envMapIntensity.value=u.envMapIntensity)}function m(d,u,w){d.ior.value=u.ior,u.sheen>0&&(d.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),d.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(d.sheenColorMap.value=u.sheenColorMap,e(u.sheenColorMap,d.sheenColorMapTransform)),u.sheenRoughnessMap&&(d.sheenRoughnessMap.value=u.sheenRoughnessMap,e(u.sheenRoughnessMap,d.sheenRoughnessMapTransform))),u.clearcoat>0&&(d.clearcoat.value=u.clearcoat,d.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(d.clearcoatMap.value=u.clearcoatMap,e(u.clearcoatMap,d.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,e(u.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(d.clearcoatNormalMap.value=u.clearcoatNormalMap,e(u.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Fe&&d.clearcoatNormalScale.value.negate())),u.dispersion>0&&(d.dispersion.value=u.dispersion),u.iridescence>0&&(d.iridescence.value=u.iridescence,d.iridescenceIOR.value=u.iridescenceIOR,d.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(d.iridescenceMap.value=u.iridescenceMap,e(u.iridescenceMap,d.iridescenceMapTransform)),u.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=u.iridescenceThicknessMap,e(u.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),u.transmission>0&&(d.transmission.value=u.transmission,d.transmissionSamplerMap.value=w.texture,d.transmissionSamplerSize.value.set(w.width,w.height),u.transmissionMap&&(d.transmissionMap.value=u.transmissionMap,e(u.transmissionMap,d.transmissionMapTransform)),d.thickness.value=u.thickness,u.thicknessMap&&(d.thicknessMap.value=u.thicknessMap,e(u.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=u.attenuationDistance,d.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(d.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(d.anisotropyMap.value=u.anisotropyMap,e(u.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=u.specularIntensity,d.specularColor.value.copy(u.specularColor),u.specularColorMap&&(d.specularColorMap.value=u.specularColorMap,e(u.specularColorMap,d.specularColorMapTransform)),u.specularIntensityMap&&(d.specularIntensityMap.value=u.specularIntensityMap,e(u.specularIntensityMap,d.specularIntensityMapTransform))}function _(d,u){u.matcap&&(d.matcap.value=u.matcap)}function g(d,u){const w=t.get(u).light;d.referencePosition.value.setFromMatrixPosition(w.matrixWorld),d.nearDistance.value=w.shadow.camera.near,d.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Bm(s,t,e,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,E){const T=E.program;n.uniformBlockBinding(w,T)}function c(w,E){let T=i[w.id];T===void 0&&(_(w),T=h(w),i[w.id]=T,w.addEventListener("dispose",d));const N=E.program;n.updateUBOMapping(w,N);const R=t.render.frame;r[w.id]!==R&&(p(w),r[w.id]=R)}function h(w){const E=f();w.__bindingPointIndex=E;const T=s.createBuffer(),N=w.__size,R=w.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,N,R),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,E,T),T}function f(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(w){const E=i[w.id],T=w.uniforms,N=w.__cache;s.bindBuffer(s.UNIFORM_BUFFER,E);for(let R=0,A=T.length;R<A;R++){const D=Array.isArray(T[R])?T[R]:[T[R]];for(let y=0,M=D.length;y<M;y++){const C=D[y];if(m(C,R,y,N)===!0){const H=C.__offset,O=Array.isArray(C.value)?C.value:[C.value];let W=0;for(let q=0;q<O.length;q++){const G=O[q],$=g(G);typeof G=="number"||typeof G=="boolean"?(C.__data[0]=G,s.bufferSubData(s.UNIFORM_BUFFER,H+W,C.__data)):G.isMatrix3?(C.__data[0]=G.elements[0],C.__data[1]=G.elements[1],C.__data[2]=G.elements[2],C.__data[3]=0,C.__data[4]=G.elements[3],C.__data[5]=G.elements[4],C.__data[6]=G.elements[5],C.__data[7]=0,C.__data[8]=G.elements[6],C.__data[9]=G.elements[7],C.__data[10]=G.elements[8],C.__data[11]=0):(G.toArray(C.__data,W),W+=$.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,H,C.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function m(w,E,T,N){const R=w.value,A=E+"_"+T;if(N[A]===void 0)return typeof R=="number"||typeof R=="boolean"?N[A]=R:N[A]=R.clone(),!0;{const D=N[A];if(typeof R=="number"||typeof R=="boolean"){if(D!==R)return N[A]=R,!0}else if(D.equals(R)===!1)return D.copy(R),!0}return!1}function _(w){const E=w.uniforms;let T=0;const N=16;for(let A=0,D=E.length;A<D;A++){const y=Array.isArray(E[A])?E[A]:[E[A]];for(let M=0,C=y.length;M<C;M++){const H=y[M],O=Array.isArray(H.value)?H.value:[H.value];for(let W=0,q=O.length;W<q;W++){const G=O[W],$=g(G),k=T%N;k!==0&&N-k<$.boundary&&(T+=N-k),H.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=T,T+=$.storage}}}const R=T%N;return R>0&&(T+=N-R),w.__size=T,w.__cache={},this}function g(w){const E={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(E.boundary=4,E.storage=4):w.isVector2?(E.boundary=8,E.storage=8):w.isVector3||w.isColor?(E.boundary=16,E.storage=12):w.isVector4?(E.boundary=16,E.storage=16):w.isMatrix3?(E.boundary=48,E.storage=48):w.isMatrix4?(E.boundary=64,E.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),E}function d(w){const E=w.target;E.removeEventListener("dispose",d);const T=o.indexOf(E.__bindingPointIndex);o.splice(T,1),s.deleteBuffer(i[E.id]),delete i[E.id],delete r[E.id]}function u(){for(const w in i)s.deleteBuffer(i[w]);o=[],i={},r={}}return{bind:l,update:c,dispose:u}}class zm{constructor(t={}){const{canvas:e=Ph(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,d=null;const u=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=je,this.toneMapping=In,this.toneMappingExposure=1;const E=this;let T=!1,N=0,R=0,A=null,D=-1,y=null;const M=new re,C=new re;let H=null;const O=new Ot(0);let W=0,q=e.width,G=e.height,$=1,k=null,ht=null;const ft=new re(0,0,q,G),_t=new re(0,0,q,G);let Gt=!1;const Qt=new Ia;let X=!1,J=!1;const dt=new ie,rt=new x,Nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let It=!1;function qt(){return A===null?$:1}let L=n;function Vt(S,I){return e.getContext(S,I)}try{const S={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Aa}`),e.addEventListener("webglcontextlost",lt,!1),e.addEventListener("webglcontextrestored",V,!1),e.addEventListener("webglcontextcreationerror",Y,!1),L===null){const I="webgl2";if(L=Vt(I,S),L===null)throw Vt(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let zt,ae,yt,Yt,Ft,Ct,de,b,v,z,K,j,Z,Mt,it,st,Dt,Q,gt,Bt,bt,ot,Ut,Ht;function he(){zt=new Yf(L),zt.init(),ot=new Cm(L,zt),ae=new kf(L,zt,t,ot),yt=new Am(L),Yt=new jf(L),Ft=new fm,Ct=new Rm(L,zt,yt,Ft,ae,ot,Yt),de=new Vf(E),b=new qf(E),v=new nu(L),Ut=new zf(L,v),z=new Kf(L,v,Yt,Ut),K=new Jf(L,z,v,Yt),gt=new Zf(L,ae,Ct),st=new Gf(Ft),j=new dm(E,de,b,zt,ae,Ut,st),Z=new Om(E,Ft),Mt=new mm,it=new Sm(zt),Q=new Bf(E,de,b,yt,K,p,l),Dt=new bm(E,K,ae),Ht=new Bm(L,Yt,ae,yt),Bt=new Hf(L,zt,Yt),bt=new $f(L,zt,Yt),Yt.programs=j.programs,E.capabilities=ae,E.extensions=zt,E.properties=Ft,E.renderLists=Mt,E.shadowMap=Dt,E.state=yt,E.info=Yt}he();const P=new Nm(E,L);this.xr=P,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const S=zt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=zt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(S){S!==void 0&&($=S,this.setSize(q,G,!1))},this.getSize=function(S){return S.set(q,G)},this.setSize=function(S,I,F=!0){if(P.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=S,G=I,e.width=Math.floor(S*$),e.height=Math.floor(I*$),F===!0&&(e.style.width=S+"px",e.style.height=I+"px"),this.setViewport(0,0,S,I)},this.getDrawingBufferSize=function(S){return S.set(q*$,G*$).floor()},this.setDrawingBufferSize=function(S,I,F){q=S,G=I,$=F,e.width=Math.floor(S*F),e.height=Math.floor(I*F),this.setViewport(0,0,S,I)},this.getCurrentViewport=function(S){return S.copy(M)},this.getViewport=function(S){return S.copy(ft)},this.setViewport=function(S,I,F,B){S.isVector4?ft.set(S.x,S.y,S.z,S.w):ft.set(S,I,F,B),yt.viewport(M.copy(ft).multiplyScalar($).round())},this.getScissor=function(S){return S.copy(_t)},this.setScissor=function(S,I,F,B){S.isVector4?_t.set(S.x,S.y,S.z,S.w):_t.set(S,I,F,B),yt.scissor(C.copy(_t).multiplyScalar($).round())},this.getScissorTest=function(){return Gt},this.setScissorTest=function(S){yt.setScissorTest(Gt=S)},this.setOpaqueSort=function(S){k=S},this.setTransparentSort=function(S){ht=S},this.getClearColor=function(S){return S.copy(Q.getClearColor())},this.setClearColor=function(){Q.setClearColor.apply(Q,arguments)},this.getClearAlpha=function(){return Q.getClearAlpha()},this.setClearAlpha=function(){Q.setClearAlpha.apply(Q,arguments)},this.clear=function(S=!0,I=!0,F=!0){let B=0;if(S){let U=!1;if(A!==null){const tt=A.texture.format;U=tt===ql||tt===Xl||tt===Wl}if(U){const tt=A.texture.type,ct=tt===Nn||tt===Di||tt===Zs||tt===Ui||tt===Gl||tt===Vl,ut=Q.getClearColor(),pt=Q.getClearAlpha(),Et=ut.r,wt=ut.g,St=ut.b;ct?(m[0]=Et,m[1]=wt,m[2]=St,m[3]=pt,L.clearBufferuiv(L.COLOR,0,m)):(_[0]=Et,_[1]=wt,_[2]=St,_[3]=pt,L.clearBufferiv(L.COLOR,0,_))}else B|=L.COLOR_BUFFER_BIT}I&&(B|=L.DEPTH_BUFFER_BIT),F&&(B|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",lt,!1),e.removeEventListener("webglcontextrestored",V,!1),e.removeEventListener("webglcontextcreationerror",Y,!1),Mt.dispose(),it.dispose(),Ft.dispose(),de.dispose(),b.dispose(),K.dispose(),Ut.dispose(),Ht.dispose(),j.dispose(),P.dispose(),P.removeEventListener("sessionstart",en),P.removeEventListener("sessionend",nn),Hn.stop()};function lt(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function V(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const S=Yt.autoReset,I=Dt.enabled,F=Dt.autoUpdate,B=Dt.needsUpdate,U=Dt.type;he(),Yt.autoReset=S,Dt.enabled=I,Dt.autoUpdate=F,Dt.needsUpdate=B,Dt.type=U}function Y(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function et(S){const I=S.target;I.removeEventListener("dispose",et),At(I)}function At(S){$t(S),Ft.remove(S)}function $t(S){const I=Ft.get(S).programs;I!==void 0&&(I.forEach(function(F){j.releaseProgram(F)}),S.isShaderMaterial&&j.releaseShaderCache(S))}this.renderBufferDirect=function(S,I,F,B,U,tt){I===null&&(I=Nt);const ct=U.isMesh&&U.matrixWorld.determinant()<0,ut=Ec(S,I,F,B,U);yt.setMaterial(B,ct);let pt=F.index,Et=1;if(B.wireframe===!0){if(pt=z.getWireframeAttribute(F),pt===void 0)return;Et=2}const wt=F.drawRange,St=F.attributes.position;let jt=wt.start*Et,le=(wt.start+wt.count)*Et;tt!==null&&(jt=Math.max(jt,tt.start*Et),le=Math.min(le,(tt.start+tt.count)*Et)),pt!==null?(jt=Math.max(jt,0),le=Math.min(le,pt.count)):St!=null&&(jt=Math.max(jt,0),le=Math.min(le,St.count));const ce=le-jt;if(ce<0||ce===1/0)return;Ut.setup(U,B,ut,F,pt);let Oe,Zt=Bt;if(pt!==null&&(Oe=v.get(pt),Zt=bt,Zt.setIndex(Oe)),U.isMesh)B.wireframe===!0?(yt.setLineWidth(B.wireframeLinewidth*qt()),Zt.setMode(L.LINES)):Zt.setMode(L.TRIANGLES);else if(U.isLine){let xt=B.linewidth;xt===void 0&&(xt=1),yt.setLineWidth(xt*qt()),U.isLineSegments?Zt.setMode(L.LINES):U.isLineLoop?Zt.setMode(L.LINE_LOOP):Zt.setMode(L.LINE_STRIP)}else U.isPoints?Zt.setMode(L.POINTS):U.isSprite&&Zt.setMode(L.TRIANGLES);if(U.isBatchedMesh)U._multiDrawInstances!==null?Zt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances):Zt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else if(U.isInstancedMesh)Zt.renderInstances(jt,ce,U.count);else if(F.isInstancedBufferGeometry){const xt=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,Re=Math.min(F.instanceCount,xt);Zt.renderInstances(jt,ce,Re)}else Zt.render(jt,ce)};function ue(S,I,F){S.transparent===!0&&S.side===We&&S.forceSinglePass===!1?(S.side=Fe,S.needsUpdate=!0,fs(S,I,F),S.side=Un,S.needsUpdate=!0,fs(S,I,F),S.side=We):fs(S,I,F)}this.compile=function(S,I,F=null){F===null&&(F=S),d=it.get(F),d.init(I),w.push(d),F.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(d.pushLight(U),U.castShadow&&d.pushShadow(U))}),S!==F&&S.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(d.pushLight(U),U.castShadow&&d.pushShadow(U))}),d.setupLights();const B=new Set;return S.traverse(function(U){const tt=U.material;if(tt)if(Array.isArray(tt))for(let ct=0;ct<tt.length;ct++){const ut=tt[ct];ue(ut,F,U),B.add(ut)}else ue(tt,F,U),B.add(tt)}),w.pop(),d=null,B},this.compileAsync=function(S,I,F=null){const B=this.compile(S,I,F);return new Promise(U=>{function tt(){if(B.forEach(function(ct){Ft.get(ct).currentProgram.isReady()&&B.delete(ct)}),B.size===0){U(S);return}setTimeout(tt,10)}zt.get("KHR_parallel_shader_compile")!==null?tt():setTimeout(tt,10)})};let ve=null;function te(S){ve&&ve(S)}function en(){Hn.stop()}function nn(){Hn.start()}const Hn=new sc;Hn.setAnimationLoop(te),typeof self<"u"&&Hn.setContext(self),this.setAnimationLoop=function(S){ve=S,P.setAnimationLoop(S),S===null?Hn.stop():Hn.start()},P.addEventListener("sessionstart",en),P.addEventListener("sessionend",nn),this.render=function(S,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),P.enabled===!0&&P.isPresenting===!0&&(P.cameraAutoUpdate===!0&&P.updateCamera(I),I=P.getCamera()),S.isScene===!0&&S.onBeforeRender(E,S,I,A),d=it.get(S,w.length),d.init(I),w.push(d),dt.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),Qt.setFromProjectionMatrix(dt),J=this.localClippingEnabled,X=st.init(this.clippingPlanes,J),g=Mt.get(S,u.length),g.init(),u.push(g),P.enabled===!0&&P.isPresenting===!0){const tt=E.xr.getDepthSensingMesh();tt!==null&&_r(tt,I,-1/0,E.sortObjects)}_r(S,I,0,E.sortObjects),g.finish(),E.sortObjects===!0&&g.sort(k,ht),It=P.enabled===!1||P.isPresenting===!1||P.hasDepthSensing()===!1,It&&Q.addToRenderList(g,S),this.info.render.frame++,X===!0&&st.beginShadows();const F=d.state.shadowsArray;Dt.render(F,S,I),X===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=g.opaque,U=g.transmissive;if(d.setupLights(),I.isArrayCamera){const tt=I.cameras;if(U.length>0)for(let ct=0,ut=tt.length;ct<ut;ct++){const pt=tt[ct];Ha(B,U,S,pt)}It&&Q.render(S);for(let ct=0,ut=tt.length;ct<ut;ct++){const pt=tt[ct];za(g,S,pt,pt.viewport)}}else U.length>0&&Ha(B,U,S,I),It&&Q.render(S),za(g,S,I);A!==null&&(Ct.updateMultisampleRenderTarget(A),Ct.updateRenderTargetMipmap(A)),S.isScene===!0&&S.onAfterRender(E,S,I),Ut.resetDefaultState(),D=-1,y=null,w.pop(),w.length>0?(d=w[w.length-1],X===!0&&st.setGlobalState(E.clippingPlanes,d.state.camera)):d=null,u.pop(),u.length>0?g=u[u.length-1]:g=null};function _r(S,I,F,B){if(S.visible===!1)return;if(S.layers.test(I.layers)){if(S.isGroup)F=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(I);else if(S.isLight)d.pushLight(S),S.castShadow&&d.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Qt.intersectsSprite(S)){B&&rt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(dt);const ct=K.update(S),ut=S.material;ut.visible&&g.push(S,ct,ut,F,rt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Qt.intersectsObject(S))){const ct=K.update(S),ut=S.material;if(B&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),rt.copy(S.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),rt.copy(ct.boundingSphere.center)),rt.applyMatrix4(S.matrixWorld).applyMatrix4(dt)),Array.isArray(ut)){const pt=ct.groups;for(let Et=0,wt=pt.length;Et<wt;Et++){const St=pt[Et],jt=ut[St.materialIndex];jt&&jt.visible&&g.push(S,ct,jt,F,rt.z,St)}}else ut.visible&&g.push(S,ct,ut,F,rt.z,null)}}const tt=S.children;for(let ct=0,ut=tt.length;ct<ut;ct++)_r(tt[ct],I,F,B)}function za(S,I,F,B){const U=S.opaque,tt=S.transmissive,ct=S.transparent;d.setupLightsView(F),X===!0&&st.setGlobalState(E.clippingPlanes,F),B&&yt.viewport(M.copy(B)),U.length>0&&ds(U,I,F),tt.length>0&&ds(tt,I,F),ct.length>0&&ds(ct,I,F),yt.buffers.depth.setTest(!0),yt.buffers.depth.setMask(!0),yt.buffers.color.setMask(!0),yt.setPolygonOffset(!1)}function Ha(S,I,F,B){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[B.id]===void 0&&(d.state.transmissionRenderTarget[B.id]=new ei(1,1,{generateMipmaps:!0,type:zt.has("EXT_color_buffer_half_float")||zt.has("EXT_color_buffer_float")?dr:Nn,minFilter:Qn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));const tt=d.state.transmissionRenderTarget[B.id],ct=B.viewport||M;tt.setSize(ct.z,ct.w);const ut=E.getRenderTarget();E.setRenderTarget(tt),E.getClearColor(O),W=E.getClearAlpha(),W<1&&E.setClearColor(16777215,.5),It?Q.render(F):E.clear();const pt=E.toneMapping;E.toneMapping=In;const Et=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),d.setupLightsView(B),X===!0&&st.setGlobalState(E.clippingPlanes,B),ds(S,F,B),Ct.updateMultisampleRenderTarget(tt),Ct.updateRenderTargetMipmap(tt),zt.has("WEBGL_multisampled_render_to_texture")===!1){let wt=!1;for(let St=0,jt=I.length;St<jt;St++){const le=I[St],ce=le.object,Oe=le.geometry,Zt=le.material,xt=le.group;if(Zt.side===We&&ce.layers.test(B.layers)){const Re=Zt.side;Zt.side=Fe,Zt.needsUpdate=!0,ka(ce,F,B,Oe,Zt,xt),Zt.side=Re,Zt.needsUpdate=!0,wt=!0}}wt===!0&&(Ct.updateMultisampleRenderTarget(tt),Ct.updateRenderTargetMipmap(tt))}E.setRenderTarget(ut),E.setClearColor(O,W),Et!==void 0&&(B.viewport=Et),E.toneMapping=pt}function ds(S,I,F){const B=I.isScene===!0?I.overrideMaterial:null;for(let U=0,tt=S.length;U<tt;U++){const ct=S[U],ut=ct.object,pt=ct.geometry,Et=B===null?ct.material:B,wt=ct.group;ut.layers.test(F.layers)&&ka(ut,I,F,pt,Et,wt)}}function ka(S,I,F,B,U,tt){S.onBeforeRender(E,I,F,B,U,tt),S.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),U.onBeforeRender(E,I,F,B,S,tt),U.transparent===!0&&U.side===We&&U.forceSinglePass===!1?(U.side=Fe,U.needsUpdate=!0,E.renderBufferDirect(F,I,B,U,S,tt),U.side=Un,U.needsUpdate=!0,E.renderBufferDirect(F,I,B,U,S,tt),U.side=We):E.renderBufferDirect(F,I,B,U,S,tt),S.onAfterRender(E,I,F,B,U,tt)}function fs(S,I,F){I.isScene!==!0&&(I=Nt);const B=Ft.get(S),U=d.state.lights,tt=d.state.shadowsArray,ct=U.state.version,ut=j.getParameters(S,U.state,tt,I,F),pt=j.getProgramCacheKey(ut);let Et=B.programs;B.environment=S.isMeshStandardMaterial?I.environment:null,B.fog=I.fog,B.envMap=(S.isMeshStandardMaterial?b:de).get(S.envMap||B.environment),B.envMapRotation=B.environment!==null&&S.envMap===null?I.environmentRotation:S.envMapRotation,Et===void 0&&(S.addEventListener("dispose",et),Et=new Map,B.programs=Et);let wt=Et.get(pt);if(wt!==void 0){if(B.currentProgram===wt&&B.lightsStateVersion===ct)return Va(S,ut),wt}else ut.uniforms=j.getUniforms(S),S.onBuild(F,ut,E),S.onBeforeCompile(ut,E),wt=j.acquireProgram(ut,pt),Et.set(pt,wt),B.uniforms=ut.uniforms;const St=B.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(St.clippingPlanes=st.uniform),Va(S,ut),B.needsLights=Tc(S),B.lightsStateVersion=ct,B.needsLights&&(St.ambientLightColor.value=U.state.ambient,St.lightProbe.value=U.state.probe,St.directionalLights.value=U.state.directional,St.directionalLightShadows.value=U.state.directionalShadow,St.spotLights.value=U.state.spot,St.spotLightShadows.value=U.state.spotShadow,St.rectAreaLights.value=U.state.rectArea,St.ltc_1.value=U.state.rectAreaLTC1,St.ltc_2.value=U.state.rectAreaLTC2,St.pointLights.value=U.state.point,St.pointLightShadows.value=U.state.pointShadow,St.hemisphereLights.value=U.state.hemi,St.directionalShadowMap.value=U.state.directionalShadowMap,St.directionalShadowMatrix.value=U.state.directionalShadowMatrix,St.spotShadowMap.value=U.state.spotShadowMap,St.spotLightMatrix.value=U.state.spotLightMatrix,St.spotLightMap.value=U.state.spotLightMap,St.pointShadowMap.value=U.state.pointShadowMap,St.pointShadowMatrix.value=U.state.pointShadowMatrix),B.currentProgram=wt,B.uniformsList=null,wt}function Ga(S){if(S.uniformsList===null){const I=S.currentProgram.getUniforms();S.uniformsList=qs.seqWithValue(I.seq,S.uniforms)}return S.uniformsList}function Va(S,I){const F=Ft.get(S);F.outputColorSpace=I.outputColorSpace,F.batching=I.batching,F.batchingColor=I.batchingColor,F.instancing=I.instancing,F.instancingColor=I.instancingColor,F.instancingMorph=I.instancingMorph,F.skinning=I.skinning,F.morphTargets=I.morphTargets,F.morphNormals=I.morphNormals,F.morphColors=I.morphColors,F.morphTargetsCount=I.morphTargetsCount,F.numClippingPlanes=I.numClippingPlanes,F.numIntersection=I.numClipIntersection,F.vertexAlphas=I.vertexAlphas,F.vertexTangents=I.vertexTangents,F.toneMapping=I.toneMapping}function Ec(S,I,F,B,U){I.isScene!==!0&&(I=Nt),Ct.resetTextureUnits();const tt=I.fog,ct=B.isMeshStandardMaterial?I.environment:null,ut=A===null?E.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Bn,pt=(B.isMeshStandardMaterial?b:de).get(B.envMap||ct),Et=B.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,wt=!!F.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),St=!!F.morphAttributes.position,jt=!!F.morphAttributes.normal,le=!!F.morphAttributes.color;let ce=In;B.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(ce=E.toneMapping);const Oe=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Zt=Oe!==void 0?Oe.length:0,xt=Ft.get(B),Re=d.state.lights;if(X===!0&&(J===!0||S!==y)){const Ge=S===y&&B.id===D;st.setState(B,S,Ge)}let ee=!1;B.version===xt.__version?(xt.needsLights&&xt.lightsStateVersion!==Re.state.version||xt.outputColorSpace!==ut||U.isBatchedMesh&&xt.batching===!1||!U.isBatchedMesh&&xt.batching===!0||U.isBatchedMesh&&xt.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&xt.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&xt.instancing===!1||!U.isInstancedMesh&&xt.instancing===!0||U.isSkinnedMesh&&xt.skinning===!1||!U.isSkinnedMesh&&xt.skinning===!0||U.isInstancedMesh&&xt.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&xt.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&xt.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&xt.instancingMorph===!1&&U.morphTexture!==null||xt.envMap!==pt||B.fog===!0&&xt.fog!==tt||xt.numClippingPlanes!==void 0&&(xt.numClippingPlanes!==st.numPlanes||xt.numIntersection!==st.numIntersection)||xt.vertexAlphas!==Et||xt.vertexTangents!==wt||xt.morphTargets!==St||xt.morphNormals!==jt||xt.morphColors!==le||xt.toneMapping!==ce||xt.morphTargetsCount!==Zt)&&(ee=!0):(ee=!0,xt.__version=B.version);let un=xt.currentProgram;ee===!0&&(un=fs(B,I,U));let ps=!1,kn=!1,gr=!1;const Me=un.getUniforms(),vn=xt.uniforms;if(yt.useProgram(un.program)&&(ps=!0,kn=!0,gr=!0),B.id!==D&&(D=B.id,kn=!0),ps||y!==S){Me.setValue(L,"projectionMatrix",S.projectionMatrix),Me.setValue(L,"viewMatrix",S.matrixWorldInverse);const Ge=Me.map.cameraPosition;Ge!==void 0&&Ge.setValue(L,rt.setFromMatrixPosition(S.matrixWorld)),ae.logarithmicDepthBuffer&&Me.setValue(L,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&Me.setValue(L,"isOrthographic",S.isOrthographicCamera===!0),y!==S&&(y=S,kn=!0,gr=!0)}if(U.isSkinnedMesh){Me.setOptional(L,U,"bindMatrix"),Me.setOptional(L,U,"bindMatrixInverse");const Ge=U.skeleton;Ge&&(Ge.boneTexture===null&&Ge.computeBoneTexture(),Me.setValue(L,"boneTexture",Ge.boneTexture,Ct))}U.isBatchedMesh&&(Me.setOptional(L,U,"batchingTexture"),Me.setValue(L,"batchingTexture",U._matricesTexture,Ct),Me.setOptional(L,U,"batchingColorTexture"),U._colorsTexture!==null&&Me.setValue(L,"batchingColorTexture",U._colorsTexture,Ct));const xr=F.morphAttributes;if((xr.position!==void 0||xr.normal!==void 0||xr.color!==void 0)&&gt.update(U,F,un),(kn||xt.receiveShadow!==U.receiveShadow)&&(xt.receiveShadow=U.receiveShadow,Me.setValue(L,"receiveShadow",U.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(vn.envMap.value=pt,vn.flipEnvMap.value=pt.isCubeTexture&&pt.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&I.environment!==null&&(vn.envMapIntensity.value=I.environmentIntensity),kn&&(Me.setValue(L,"toneMappingExposure",E.toneMappingExposure),xt.needsLights&&wc(vn,gr),tt&&B.fog===!0&&Z.refreshFogUniforms(vn,tt),Z.refreshMaterialUniforms(vn,B,$,G,d.state.transmissionRenderTarget[S.id]),qs.upload(L,Ga(xt),vn,Ct)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(qs.upload(L,Ga(xt),vn,Ct),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&Me.setValue(L,"center",U.center),Me.setValue(L,"modelViewMatrix",U.modelViewMatrix),Me.setValue(L,"normalMatrix",U.normalMatrix),Me.setValue(L,"modelMatrix",U.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Ge=B.uniformsGroups;for(let vr=0,bc=Ge.length;vr<bc;vr++){const Wa=Ge[vr];Ht.update(Wa,un),Ht.bind(Wa,un)}}return un}function wc(S,I){S.ambientLightColor.needsUpdate=I,S.lightProbe.needsUpdate=I,S.directionalLights.needsUpdate=I,S.directionalLightShadows.needsUpdate=I,S.pointLights.needsUpdate=I,S.pointLightShadows.needsUpdate=I,S.spotLights.needsUpdate=I,S.spotLightShadows.needsUpdate=I,S.rectAreaLights.needsUpdate=I,S.hemisphereLights.needsUpdate=I}function Tc(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(S,I,F){Ft.get(S.texture).__webglTexture=I,Ft.get(S.depthTexture).__webglTexture=F;const B=Ft.get(S);B.__hasExternalTextures=!0,B.__autoAllocateDepthBuffer=F===void 0,B.__autoAllocateDepthBuffer||zt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,I){const F=Ft.get(S);F.__webglFramebuffer=I,F.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(S,I=0,F=0){A=S,N=I,R=F;let B=!0,U=null,tt=!1,ct=!1;if(S){const pt=Ft.get(S);pt.__useDefaultFramebuffer!==void 0?(yt.bindFramebuffer(L.FRAMEBUFFER,null),B=!1):pt.__webglFramebuffer===void 0?Ct.setupRenderTarget(S):pt.__hasExternalTextures&&Ct.rebindTextures(S,Ft.get(S.texture).__webglTexture,Ft.get(S.depthTexture).__webglTexture);const Et=S.texture;(Et.isData3DTexture||Et.isDataArrayTexture||Et.isCompressedArrayTexture)&&(ct=!0);const wt=Ft.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(wt[I])?U=wt[I][F]:U=wt[I],tt=!0):S.samples>0&&Ct.useMultisampledRTT(S)===!1?U=Ft.get(S).__webglMultisampledFramebuffer:Array.isArray(wt)?U=wt[F]:U=wt,M.copy(S.viewport),C.copy(S.scissor),H=S.scissorTest}else M.copy(ft).multiplyScalar($).floor(),C.copy(_t).multiplyScalar($).floor(),H=Gt;if(yt.bindFramebuffer(L.FRAMEBUFFER,U)&&B&&yt.drawBuffers(S,U),yt.viewport(M),yt.scissor(C),yt.setScissorTest(H),tt){const pt=Ft.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+I,pt.__webglTexture,F)}else if(ct){const pt=Ft.get(S.texture),Et=I||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,pt.__webglTexture,F||0,Et)}D=-1},this.readRenderTargetPixels=function(S,I,F,B,U,tt,ct){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ut=Ft.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ct!==void 0&&(ut=ut[ct]),ut){yt.bindFramebuffer(L.FRAMEBUFFER,ut);try{const pt=S.texture,Et=pt.format,wt=pt.type;if(!ae.textureFormatReadable(Et)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ae.textureTypeReadable(wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=S.width-B&&F>=0&&F<=S.height-U&&L.readPixels(I,F,B,U,ot.convert(Et),ot.convert(wt),tt)}finally{const pt=A!==null?Ft.get(A).__webglFramebuffer:null;yt.bindFramebuffer(L.FRAMEBUFFER,pt)}}},this.readRenderTargetPixelsAsync=async function(S,I,F,B,U,tt,ct){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ut=Ft.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ct!==void 0&&(ut=ut[ct]),ut){yt.bindFramebuffer(L.FRAMEBUFFER,ut);try{const pt=S.texture,Et=pt.format,wt=pt.type;if(!ae.textureFormatReadable(Et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ae.textureTypeReadable(wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=S.width-B&&F>=0&&F<=S.height-U){const St=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,St),L.bufferData(L.PIXEL_PACK_BUFFER,tt.byteLength,L.STREAM_READ),L.readPixels(I,F,B,U,ot.convert(Et),ot.convert(wt),0),L.flush();const jt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);await Lh(L,jt,4);try{L.bindBuffer(L.PIXEL_PACK_BUFFER,St),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,tt)}finally{L.deleteBuffer(St),L.deleteSync(jt)}return tt}}finally{const pt=A!==null?Ft.get(A).__webglFramebuffer:null;yt.bindFramebuffer(L.FRAMEBUFFER,pt)}}},this.copyFramebufferToTexture=function(S,I=null,F=0){S.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,S=arguments[1]);const B=Math.pow(2,-F),U=Math.floor(S.image.width*B),tt=Math.floor(S.image.height*B),ct=I!==null?I.x:0,ut=I!==null?I.y:0;Ct.setTexture2D(S,0),L.copyTexSubImage2D(L.TEXTURE_2D,F,0,0,ct,ut,U,tt),yt.unbindTexture()},this.copyTextureToTexture=function(S,I,F=null,B=null,U=0){S.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),B=arguments[0]||null,S=arguments[1],I=arguments[2],U=arguments[3]||0,F=null);let tt,ct,ut,pt,Et,wt;F!==null?(tt=F.max.x-F.min.x,ct=F.max.y-F.min.y,ut=F.min.x,pt=F.min.y):(tt=S.image.width,ct=S.image.height,ut=0,pt=0),B!==null?(Et=B.x,wt=B.y):(Et=0,wt=0);const St=ot.convert(I.format),jt=ot.convert(I.type);Ct.setTexture2D(I,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,I.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,I.unpackAlignment);const le=L.getParameter(L.UNPACK_ROW_LENGTH),ce=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Oe=L.getParameter(L.UNPACK_SKIP_PIXELS),Zt=L.getParameter(L.UNPACK_SKIP_ROWS),xt=L.getParameter(L.UNPACK_SKIP_IMAGES),Re=S.isCompressedTexture?S.mipmaps[U]:S.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,Re.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Re.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ut),L.pixelStorei(L.UNPACK_SKIP_ROWS,pt),S.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,U,Et,wt,tt,ct,St,jt,Re.data):S.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,U,Et,wt,Re.width,Re.height,St,Re.data):L.texSubImage2D(L.TEXTURE_2D,U,Et,wt,St,jt,Re),L.pixelStorei(L.UNPACK_ROW_LENGTH,le),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ce),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Oe),L.pixelStorei(L.UNPACK_SKIP_ROWS,Zt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,xt),U===0&&I.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),yt.unbindTexture()},this.copyTextureToTexture3D=function(S,I,F=null,B=null,U=0){S.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,B=arguments[1]||null,S=arguments[2],I=arguments[3],U=arguments[4]||0);let tt,ct,ut,pt,Et,wt,St,jt,le;const ce=S.isCompressedTexture?S.mipmaps[U]:S.image;F!==null?(tt=F.max.x-F.min.x,ct=F.max.y-F.min.y,ut=F.max.z-F.min.z,pt=F.min.x,Et=F.min.y,wt=F.min.z):(tt=ce.width,ct=ce.height,ut=ce.depth,pt=0,Et=0,wt=0),B!==null?(St=B.x,jt=B.y,le=B.z):(St=0,jt=0,le=0);const Oe=ot.convert(I.format),Zt=ot.convert(I.type);let xt;if(I.isData3DTexture)Ct.setTexture3D(I,0),xt=L.TEXTURE_3D;else if(I.isDataArrayTexture||I.isCompressedArrayTexture)Ct.setTexture2DArray(I,0),xt=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,I.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,I.unpackAlignment);const Re=L.getParameter(L.UNPACK_ROW_LENGTH),ee=L.getParameter(L.UNPACK_IMAGE_HEIGHT),un=L.getParameter(L.UNPACK_SKIP_PIXELS),ps=L.getParameter(L.UNPACK_SKIP_ROWS),kn=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,ce.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ce.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,pt),L.pixelStorei(L.UNPACK_SKIP_ROWS,Et),L.pixelStorei(L.UNPACK_SKIP_IMAGES,wt),S.isDataTexture||S.isData3DTexture?L.texSubImage3D(xt,U,St,jt,le,tt,ct,ut,Oe,Zt,ce.data):I.isCompressedArrayTexture?L.compressedTexSubImage3D(xt,U,St,jt,le,tt,ct,ut,Oe,ce.data):L.texSubImage3D(xt,U,St,jt,le,tt,ct,ut,Oe,Zt,ce),L.pixelStorei(L.UNPACK_ROW_LENGTH,Re),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ee),L.pixelStorei(L.UNPACK_SKIP_PIXELS,un),L.pixelStorei(L.UNPACK_SKIP_ROWS,ps),L.pixelStorei(L.UNPACK_SKIP_IMAGES,kn),U===0&&I.generateMipmaps&&L.generateMipmap(xt),yt.unbindTexture()},this.initRenderTarget=function(S){Ft.get(S).__webglFramebuffer===void 0&&Ct.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Ct.setTextureCube(S,0):S.isData3DTexture?Ct.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Ct.setTexture2DArray(S,0):Ct.setTexture2D(S,0),yt.unbindTexture()},this.resetState=function(){N=0,R=0,A=null,yt.reset(),Ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Ca?"display-p3":"srgb",e.unpackColorSpace=Jt.workingColorSpace===fr?"display-p3":"srgb"}}class Ua{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ot(t),this.density=e}clone(){return new Ua(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Hm extends _e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hn,this.environmentIntensity=1,this.environmentRotation=new hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class km{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=pa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Dn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Pa("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ce=new x;class ir{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ce.fromBufferAttribute(this,e),Ce.applyMatrix4(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ce.fromBufferAttribute(this,e),Ce.applyNormalMatrix(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ce.fromBufferAttribute(this,e),Ce.transformDirection(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=an(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ne(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=an(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=an(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=an(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=an(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),i=ne(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),i=ne(i,this.array),r=ne(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new qe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new ir(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class dc extends zn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ot(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Mi;const Xi=new x,Si=new x,yi=new x,Ei=new Rt,qi=new Rt,fc=new ie,Os=new x,Yi=new x,Bs=new x,ul=new Rt,Qr=new Rt,dl=new Rt;class Gm extends _e{constructor(t=new dc){if(super(),this.isSprite=!0,this.type="Sprite",Mi===void 0){Mi=new we;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new km(e,5);Mi.setIndex([0,1,2,0,2,3]),Mi.setAttribute("position",new ir(n,3,0,!1)),Mi.setAttribute("uv",new ir(n,2,3,!1))}this.geometry=Mi,this.material=t,this.center=new Rt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Si.setFromMatrixScale(this.matrixWorld),fc.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),yi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Si.multiplyScalar(-yi.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;zs(Os.set(-.5,-.5,0),yi,o,Si,i,r),zs(Yi.set(.5,-.5,0),yi,o,Si,i,r),zs(Bs.set(.5,.5,0),yi,o,Si,i,r),ul.set(0,0),Qr.set(1,0),dl.set(1,1);let a=t.ray.intersectTriangle(Os,Yi,Bs,!1,Xi);if(a===null&&(zs(Yi.set(-.5,.5,0),yi,o,Si,i,r),Qr.set(0,1),a=t.ray.intersectTriangle(Os,Bs,Yi,!1,Xi),a===null))return;const l=t.ray.origin.distanceTo(Xi);l<t.near||l>t.far||e.push({distance:l,point:Xi.clone(),uv:Qe.getInterpolation(Xi,Os,Yi,Bs,ul,Qr,dl,new Rt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function zs(s,t,e,n,i,r){Ei.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(qi.x=r*Ei.x-i*Ei.y,qi.y=i*Ei.x+r*Ei.y):qi.copy(Ei),s.copy(t),s.x+=qi.x,s.y+=qi.y,s.applyMatrix4(fc)}class sr extends zn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ot(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const rr=new x,ar=new x,fl=new ie,Ki=new pr,Hs=new us,ta=new x,pl=new x;class ga extends _e{constructor(t=new we,e=new sr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)rr.fromBufferAttribute(e,i-1),ar.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=rr.distanceTo(ar);t.setAttribute("lineDistance",new Ee(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Hs.copy(n.boundingSphere),Hs.applyMatrix4(i),Hs.radius+=r,t.ray.intersectsSphere(Hs)===!1)return;fl.copy(i).invert(),Ki.copy(t.ray).applyMatrix4(fl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,p=n.attributes.position;if(h!==null){const m=Math.max(0,o.start),_=Math.min(h.count,o.start+o.count);for(let g=m,d=_-1;g<d;g+=c){const u=h.getX(g),w=h.getX(g+1),E=ks(this,t,Ki,l,u,w);E&&e.push(E)}if(this.isLineLoop){const g=h.getX(_-1),d=h.getX(m),u=ks(this,t,Ki,l,g,d);u&&e.push(u)}}else{const m=Math.max(0,o.start),_=Math.min(p.count,o.start+o.count);for(let g=m,d=_-1;g<d;g+=c){const u=ks(this,t,Ki,l,g,g+1);u&&e.push(u)}if(this.isLineLoop){const g=ks(this,t,Ki,l,_-1,m);g&&e.push(g)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ks(s,t,e,n,i,r){const o=s.geometry.attributes.position;if(rr.fromBufferAttribute(o,i),ar.fromBufferAttribute(o,r),e.distanceSqToSegment(rr,ar,ta,pl)>n)return;ta.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(ta);if(!(l<t.near||l>t.far))return{distance:l,point:pl.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,object:s}}class pc extends zn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ot(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const ml=new ie,xa=new pr,Gs=new us,Vs=new x;class Vm extends _e{constructor(t=new we,e=new pc){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Gs.copy(n.boundingSphere),Gs.applyMatrix4(i),Gs.radius+=r,t.ray.intersectsSphere(Gs)===!1)return;ml.copy(i).invert(),xa.copy(t.ray).applyMatrix4(ml);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,f=n.attributes.position;if(c!==null){const p=Math.max(0,o.start),m=Math.min(c.count,o.start+o.count);for(let _=p,g=m;_<g;_++){const d=c.getX(_);Vs.fromBufferAttribute(f,d),_l(Vs,d,l,i,t,e,this)}}else{const p=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let _=p,g=m;_<g;_++)Vs.fromBufferAttribute(f,_),_l(Vs,_,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function _l(s,t,e,n,i,r,o){const a=xa.distanceSqToPoint(s);if(a<e){const l=new x;xa.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,object:o})}}class Wm extends De{constructor(t,e,n,i,r,o,a,l,c){super(t,e,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ye extends we{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],f=[],p=[],m=[];let _=0;const g=[],d=n/2;let u=0;w(),o===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new Ee(f,3)),this.setAttribute("normal",new Ee(p,3)),this.setAttribute("uv",new Ee(m,2));function w(){const T=new x,N=new x;let R=0;const A=(e-t)/n;for(let D=0;D<=r;D++){const y=[],M=D/r,C=M*(e-t)+t;for(let H=0;H<=i;H++){const O=H/i,W=O*l+a,q=Math.sin(W),G=Math.cos(W);N.x=C*q,N.y=-M*n+d,N.z=C*G,f.push(N.x,N.y,N.z),T.set(q,A,G).normalize(),p.push(T.x,T.y,T.z),m.push(O,1-M),y.push(_++)}g.push(y)}for(let D=0;D<i;D++)for(let y=0;y<r;y++){const M=g[y][D],C=g[y+1][D],H=g[y+1][D+1],O=g[y][D+1];h.push(M,C,O),h.push(C,H,O),R+=6}c.addGroup(u,R,0),u+=R}function E(T){const N=_,R=new Rt,A=new x;let D=0;const y=T===!0?t:e,M=T===!0?1:-1;for(let H=1;H<=i;H++)f.push(0,d*M,0),p.push(0,M,0),m.push(.5,.5),_++;const C=_;for(let H=0;H<=i;H++){const W=H/i*l+a,q=Math.cos(W),G=Math.sin(W);A.x=y*G,A.y=d*M,A.z=y*q,f.push(A.x,A.y,A.z),p.push(0,M,0),R.x=q*.5+.5,R.y=G*.5*M+.5,m.push(R.x,R.y),_++}for(let H=0;H<i;H++){const O=N+H,W=C+H;T===!0?h.push(W,W+1,O):h.push(W+1,W,O),D+=3}c.addGroup(u,D,T===!0?1:2),u+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ye(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Na extends we{constructor(t=.5,e=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let f=t;const p=(e-t)/i,m=new x,_=new Rt;for(let g=0;g<=i;g++){for(let d=0;d<=n;d++){const u=r+d/n*o;m.x=f*Math.cos(u),m.y=f*Math.sin(u),l.push(m.x,m.y,m.z),c.push(0,0,1),_.x=(m.x/e+1)/2,_.y=(m.y/e+1)/2,h.push(_.x,_.y)}f+=p}for(let g=0;g<i;g++){const d=g*(n+1);for(let u=0;u<n;u++){const w=u+d,E=w,T=w+n+1,N=w+n+2,R=w+1;a.push(E,T,R),a.push(T,N,R)}}this.setIndex(a),this.setAttribute("position",new Ee(l,3)),this.setAttribute("normal",new Ee(c,3)),this.setAttribute("uv",new Ee(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Na(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Ne extends we{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],f=new x,p=new x,m=[],_=[],g=[],d=[];for(let u=0;u<=n;u++){const w=[],E=u/n;let T=0;u===0&&o===0?T=.5/e:u===n&&l===Math.PI&&(T=-.5/e);for(let N=0;N<=e;N++){const R=N/e;f.x=-t*Math.cos(i+R*r)*Math.sin(o+E*a),f.y=t*Math.cos(o+E*a),f.z=t*Math.sin(i+R*r)*Math.sin(o+E*a),_.push(f.x,f.y,f.z),p.copy(f).normalize(),g.push(p.x,p.y,p.z),d.push(R+T,1-E),w.push(c++)}h.push(w)}for(let u=0;u<n;u++)for(let w=0;w<e;w++){const E=h[u][w+1],T=h[u][w],N=h[u+1][w],R=h[u+1][w+1];(u!==0||o>0)&&m.push(E,T,R),(u!==n-1||l<Math.PI)&&m.push(T,N,R)}this.setIndex(m),this.setAttribute("position",new Ee(_,3)),this.setAttribute("normal",new Ee(g,3)),this.setAttribute("uv",new Ee(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ne(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Xt extends zn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yl,this.normalScale=new Rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.combine=Ra,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Fa extends _e{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ot(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const ea=new ie,gl=new x,xl=new x;class mc{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Rt(512,512),this.map=null,this.mapPass=null,this.matrix=new ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ia,this._frameExtents=new Rt(1,1),this._viewportCount=1,this._viewports=[new re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;gl.setFromMatrixPosition(t.matrixWorld),e.position.copy(gl),xl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(xl),e.updateMatrixWorld(),ea.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ea),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ea)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const vl=new ie,$i=new x,na=new x;class Xm extends mc{constructor(){super(new He(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Rt(4,2),this._viewportCount=6,this._viewports=[new re(2,1,1,1),new re(0,1,1,1),new re(3,1,1,1),new re(1,1,1,1),new re(3,0,1,1),new re(1,0,1,1)],this._cubeDirections=[new x(1,0,0),new x(-1,0,0),new x(0,0,1),new x(0,0,-1),new x(0,1,0),new x(0,-1,0)],this._cubeUps=[new x(0,1,0),new x(0,1,0),new x(0,1,0),new x(0,1,0),new x(0,0,1),new x(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),$i.setFromMatrixPosition(t.matrixWorld),n.position.copy($i),na.copy(n.position),na.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(na),n.updateMatrixWorld(),i.makeTranslation(-$i.x,-$i.y,-$i.z),vl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vl)}}class qm extends Fa{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Xm}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Ym extends mc{constructor(){super(new rc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ia extends Fa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.target=new _e,this.shadow=new Ym}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Km extends Fa{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const Ml=new ie;class On{constructor(t,e,n=0,i=1/0){this.ray=new pr(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new La,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Ml.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ml),this}intersectObject(t,e=!0,n=[]){return va(t,this,n,e),n.sort(Sl),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)va(t[i],this,n,e);return n.sort(Sl),n}}function Sl(s,t){return s.distance-t.distance}function va(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let o=0,a=r.length;o<a;o++)va(r[o],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Aa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Aa);class $m{constructor(t){this._renderer=new zm({antialias:!0,powerPreference:"high-performance"}),this._renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this._renderer.setSize(window.innerWidth,window.innerHeight),this._renderer.shadowMap.enabled=!0,this._renderer.shadowMap.type=Bl,this._renderer.toneMapping=zl,this._renderer.toneMappingExposure=.9,this._renderer.outputColorSpace=je,t.appendChild(this._renderer.domElement),this._resizeCallbacks=[],this._onResize=this._onResize.bind(this),window.addEventListener("resize",this._onResize)}get domElement(){return this._renderer.domElement}render(t,e){this._renderer.render(t,e)}onResize(t){this._resizeCallbacks.push(t)}destroy(){window.removeEventListener("resize",this._onResize),this._renderer.dispose()}_onResize(){const t=window.innerWidth,e=window.innerHeight;this._renderer.setSize(t,e),this._resizeCallbacks.forEach(n=>n(t,e))}}class jm{constructor(t){this._lockTarget=t,this.keys={},this._mouseDeltaX=0,this._mouseDeltaY=0,this.locked=!1,this._justPressed=new Set,this._bindEvents()}isDown(t){return!!this.keys[t]}justPressed(t){return this._justPressed.has(t)}consumeMouseDelta(){const t=this._mouseDeltaX,e=this._mouseDeltaY;return this._mouseDeltaX=0,this._mouseDeltaY=0,{x:t,y:e}}endFrame(){this._justPressed.clear()}requestLock(){this._lockTarget.requestPointerLock()}releaseLock(){document.exitPointerLock()}destroy(){document.removeEventListener("keydown",this._onKeyDown),document.removeEventListener("keyup",this._onKeyUp),document.removeEventListener("mousemove",this._onMouseMove),document.removeEventListener("pointerlockchange",this._onLockChange)}_bindEvents(){this._onKeyDown=t=>{this.keys[t.code]||this._justPressed.add(t.code),this.keys[t.code]=!0},this._onKeyUp=t=>{this.keys[t.code]=!1},this._onMouseMove=t=>{this.locked&&(this._mouseDeltaX+=t.movementX,this._mouseDeltaY+=t.movementY)},this._onLockChange=()=>{this.locked=document.pointerLockElement===this._lockTarget},document.addEventListener("keydown",this._onKeyDown),document.addEventListener("keyup",this._onKeyUp),document.addEventListener("mousemove",this._onMouseMove),document.addEventListener("pointerlockchange",this._onLockChange)}}class Zm{constructor(t,e){this._update=t,this._render=e,this._running=!1,this._lastTime=0,this._rafId=null,this.MAX_DT=1/20}start(){this._running||(this._running=!0,this._lastTime=performance.now(),this._rafId=requestAnimationFrame(t=>this._loop(t)))}stop(){this._running=!1,this._rafId!==null&&(cancelAnimationFrame(this._rafId),this._rafId=null)}_loop(t){if(!this._running)return;const e=Math.min((t-this._lastTime)/1e3,this.MAX_DT);this._lastTime=t,this._update(e),this._render(),this._rafId=requestAnimationFrame(n=>this._loop(n))}}const yl=.55,Jm=1.6,Qm=5,t_=8.5,e_=2.5,n_=[new x(1,0,0),new x(-1,0,0),new x(0,0,1),new x(0,0,-1)];class i_{constructor(t){this._scene=t,this.position=new x(2,0,2),this._velocity=new x,this._isCrouching=!1,this._isSprinting=!1,this.maxHealth=100,this.health=100,this.stamina=100,this.maxStamina=100,this.speedMultiplier=1,this.isHealing=!1,this._facingAngle=0,this.mesh=this._buildMesh(),t.add(this.mesh),this._wallRay=new On,this._wallRay.near=0,this._wallRay.far=yl+.1,this._moveDir=new x,this._wallOrigin=new x}get isAlive(){return this.health>0}get isCrouching(){return this._isCrouching}get facingAngle(){return this._facingAngle}update(t,e,n,i){this.isAlive&&(this._handleMovement(t,e),this._resolveWalls(i),this._handleAim(n),this._syncMesh())}takeDamage(t){this.health=Math.max(0,this.health-t)}heal(t){this.health=Math.min(this.maxHealth,this.health+t)}shoot(t){const e=new x(Math.sin(this._facingAngle),0,Math.cos(this._facingAngle)),n=this.position.clone();n.y=.5;const r=new On(n,e,0,60).intersectObjects(t,!0);return r.length>0?{hit:!0,point:r[0].point,object:r[0].object}:{hit:!1,point:null,object:null}}_handleMovement(t,e){this._isCrouching=e.isDown("ControlLeft")||e.isDown("ControlRight");const n=e.isDown("ShiftLeft")&&!this._isCrouching;n&&this.stamina>0?this._isSprinting=!0:this.stamina<=0?this._isSprinting=!1:n||(this._isSprinting=!1);const i=e.isDown("KeyW")||e.isDown("KeyS")||e.isDown("KeyA")||e.isDown("KeyD");this._isSprinting?this.stamina=Math.max(0,this.stamina-28*t):this._isCrouching||!i?this.stamina=Math.min(this.maxStamina,this.stamina+22*t):this.stamina=Math.min(this.maxStamina,this.stamina+14*t);const r=this._isCrouching?e_:this._isSprinting?t_:Qm,o=this.isHealing?.7:1,a=r*this.speedMultiplier*o;this._moveDir.set(0,0,0),e.isDown("KeyW")&&(this._moveDir.z-=1),e.isDown("KeyS")&&(this._moveDir.z+=1),e.isDown("KeyA")&&(this._moveDir.x-=1),e.isDown("KeyD")&&(this._moveDir.x+=1),this._moveDir.lengthSq()>0&&(this._moveDir.normalize().multiplyScalar(a*t),this.position.add(this._moveDir)),this.position.y=0}_resolveWalls(t){this._wallOrigin.set(this.position.x,.5,this.position.z);for(const e of n_){this._wallRay.set(this._wallOrigin,e);const n=this._wallRay.intersectObjects(t,!1);if(n.length>0){const i=yl-n[0].distance;i>0&&(this.position.x-=e.x*i,this.position.z-=e.z*i)}}}_handleAim(t){if(!t)return;const e=t.x-this.position.x,n=t.z-this.position.z;(Math.abs(e)>.01||Math.abs(n)>.01)&&(this._facingAngle=Math.atan2(e,n))}_syncMesh(){this.mesh.position.copy(this.position),this.mesh.position.y=Jm/2,this.mesh.rotation.y=this._facingAngle}_buildMesh(){const t=new ti,e=new Xt({color:2767402}),n=new at(new ye(.12,.14,.5,6),e);n.position.set(-.15,-.35,0),n.castShadow=!0,t.add(n);const i=new at(new ye(.12,.14,.5,6),e);i.position.set(.15,-.35,0),i.castShadow=!0,t.add(i);const r=new Xt({color:1710618}),o=new at(new kt(.16,.12,.24),r);o.position.set(-.15,-.62,.04),t.add(o);const a=new at(new kt(.16,.12,.24),r);a.position.set(.15,-.62,.04),t.add(a);const l=new kt(.52,.65,.35),c=new Xt({color:3824186}),h=new at(l,c);h.position.y=.05,h.castShadow=!0,t.add(h);const f=new Xt({color:4876874}),p=new at(new kt(.36,.4,.06),f);p.position.set(0,.08,.2),t.add(p);const m=new Xt({color:3824186}),_=new at(new ye(.08,.09,.5,6),m);_.position.set(-.34,0,.08),_.rotation.x=.3,_.castShadow=!0,t.add(_);const g=new at(new ye(.08,.09,.5,6),m);g.position.set(.34,0,.08),g.rotation.x=.3,g.castShadow=!0,t.add(g);const d=new Ne(.22,8,6),u=new Xt({color:16107642}),w=new at(d,u);w.position.y=.58,w.castShadow=!0,t.add(w);const E=new Ne(.25,8,5,0,Math.PI*2,0,Math.PI*.6),T=new Xt({color:3820090}),N=new at(E,T);N.position.y=.62,N.castShadow=!0,t.add(N);const R=new Xt({color:2763306}),A=new at(new kt(.06,.08,.55),R);A.position.set(.18,0,.42),t.add(A);const D=new Xt({color:1710618}),y=new at(new kt(.06,.2,.08),D);y.position.set(.18,-.08,.3),t.add(y);const M=new oe({color:13425988}),C=new at(new Ne(.04,4,4),M);C.position.set(.18,.04,.7),t.add(C);const H=new Xt({color:4872762}),O=new at(new kt(.36,.4,.18),H);return O.position.set(0,.05,-.26),O.castShadow=!0,t.add(O),t}}class s_{constructor(t){this._scene=t,this.collidables=[],this._buildings=[],this.extractionPoints=[],this.doorSlots=[],this.playerSpawnPoints=[new x(-62,0,-64),new x(63,0,-64),new x(-65,0,62),new x(65,0,62),new x(0,0,-68),new x(0,0,70)],this._buildLighting(),this._buildGround(),this._buildBoundaryWalls(),this._buildFactoryZone(),this._buildWarehouseZone(),this._buildCentralSquare(),this._buildApartmentZone(),this._buildParkingZone(),this._buildBasementZone(),this._buildExtractionPoints(),this._buildEnvironmentProps(),this._buildDustParticles(),t.background=new Ot(8034986),t.fog=new Ua(8034986,.004)}_buildLighting(){this._scene.add(new Km(13426152,1.6));const t=new ia(16774368,2.4);t.position.set(40,80,40),t.castShadow=!0,t.shadow.mapSize.set(4096,4096),t.shadow.camera.left=-100,t.shadow.camera.right=100,t.shadow.camera.top=100,t.shadow.camera.bottom=-100,t.shadow.camera.near=1,t.shadow.camera.far=250,t.shadow.bias=-5e-4,this._scene.add(t);const e=new ia(8956620,.9);e.position.set(-50,40,-30),this._scene.add(e);const n=new ia(14535833,.4);n.position.set(0,-1,0),this._scene.add(n)}_buildGround(){const t=new ln(160,160),e=new Xt({color:5920848}),n=new at(t,e);n.rotation.x=-Math.PI/2,n.receiveShadow=!0,n.name="Floor",this._scene.add(n),this.collidables.push(n),[{x:-35,z:-45,w:40,d:50,c:3485994},{x:40,z:-45,w:50,d:50,c:1712680},{x:0,z:0,w:40,d:40,c:4868666},{x:-40,z:45,w:50,d:50,c:3354152},{x:37,z:42,w:55,d:45,c:5921354},{x:-5,z:65,w:30,d:20,c:1973794}].forEach(({x:r,z:o,w:a,d:l,c})=>{const h=new ln(a,l),f=new Xt({color:c}),p=new at(h,f);p.rotation.x=-Math.PI/2,p.position.set(r,.005,o),p.receiveShadow=!0,this._scene.add(p)})}_buildBoundaryWalls(){this._wall(0,-76,80,.6,3,6971992,"BoundN_W"),this._wall(50,-76,40,.6,3,6971992,"BoundN_E"),this._wall(0,76,160,.6,3,6971992,"BoundS"),this._wall(-76,0,.6,160,3,6971992,"BoundW"),this._wall(76,20,.6,110,3,6971992,"BoundE_S"),this._wall(76,-40,.6,70,3,6971992,"BoundE_N")}_buildFactoryZone(){this._building(-40,-50,32,20,3,5919304,"Factory"),this._building(-20,-60,14,10,2.5,7366744,"FactoryOut"),this._box(-50,-44,2,2,8,3814704,"Chimney"),[[-28,-42],[-30,-42],[-28,-40]].forEach(([e,n],i)=>this._box(e,n,1,1,1,9137991,`FactCrate${i}`)),[[-18,-48],[-14,-48],[-10,-48]].forEach(([e,n],i)=>this._box(e,n,2.5,.9,.5,7368800,`FactBar${i}`)),this._wall(-10,-45,.5,20,3,5919304,"FactDiv1"),this._wall(-10,-22,.5,8,3,5919304,"FactDiv2")}_buildWarehouseZone(){this._building(40,-50,40,28,3.2,5132888,"Warehouse"),this._box(58,-38,14,.4,3,5132888,"DockWall"),[[24,-42],[26,-42],[24,-40],[26,-40],[25,-38]].forEach(([e,n],i)=>this._box(e,n,1.8,1.8,1.8,8020032,`WhCrate${i}`)),this._box(18,-58,3,3,2.5,5919304,"GuardPost");for(let e=0;e<5;e++)this._box(20+e*6,-70,.3,2.5,1.2,3815994,`Fence${e}`)}_buildCentralSquare(){const t=new ye(3,3.5,1.2,8),e=new Xt({color:8945776}),n=new at(t,e);n.position.set(0,.6,0),n.castShadow=!0,this._scene.add(n),this.collidables.push(n),[[8,8],[8,-8],[-8,8],[-8,-8],[0,12],[0,-12],[12,0],[-12,0]].forEach(([r,o],a)=>this._box(r,o,2.5,.8,.5,8421488,`SqBar${a}`)),this._box(5,-5,4,1.2,2,2763306,"BurntCar1"),this._box(-6,6,4,1.2,2,2763306,"BurntCar2"),this._wall(-10,-20,.4,0,0,0,""),[[-16,-16],[-16,-12],[-16,-8]].forEach(([r,o],a)=>this._box(r,o,.6,.8,2,10127978,`Sand${a}`))}_buildApartmentZone(){this._building(-48,40,28,18,3,6049856,"AptA"),this._wall(-35,56,16,.5,2.5,6049856,"AptB_N"),this._wall(-43,62,.5,12,2.5,6049856,"AptB_W"),this._wall(-27,60,.5,8,2.5,6049856,"AptB_E"),[[-55,28],[-52,30],[-48,27],[-40,35],[-32,30]].forEach(([e,n],i)=>this._box(e,n,1.5+Math.random(),.7,1.5+Math.random(),6969928,`Rubble${i}`)),[[-20,28],[-14,28],[-8,28]].forEach(([e,n],i)=>this._box(e,n,2.5,.9,.5,7368800,`AptBar${i}`)),this._box(-30,44,4,1.5,2,3813424,"AptCar")}_buildParkingZone(){[[20,30],[28,30],[36,30],[44,30],[52,30],[20,40],[36,45],[52,42],[44,55],[20,55]].forEach(([e,n],i)=>this._box(e,n,4+i%2,1.4,2,3026478,`Car${i}`)),[[24,36],[32,36],[40,36],[48,36]].forEach(([e,n],i)=>this._box(e,n,.3,.7,6,8417376,`ParkDiv${i}`)),this._building(12,25,5,5,2.2,7103064,"ParkBooth"),this._building(56,50,12,10,2.2,6185040,"ParkShed")}_buildBasementZone(){this._wall(-5,60,.5,12,2.5,3816e3,"BasN_W"),this._wall(5,60,.5,12,2.5,3816e3,"BasN_E"),this._wall(0,66,12,.5,2.5,3816e3,"BasS");const e=new kt(3,2.5,.2),n=new Xt({color:1710634}),i=new at(e,n);i.position.set(0,1.25,54.5),this._scene.add(i);const r=new kt(.3,.3,.1),o=new oe({color:16755200}),a=new at(r,o);a.position.set(.8,1.2,54.4),this._scene.add(a),this._building(-0,78,30,20,2.5,2763314,"BasMain"),this._building(-10,92,14,10,2.5,2631726,"BasStorage"),this._wall(-17,85,.5,6,2.5,3816e3,"BasCorrW"),this._wall(-3,85,.5,6,2.5,3816e3,"BasCorrE"),this._box(-8,74,4,.8,1.5,4868688,"BasTable1"),this._box(8,74,4,.8,1.5,4868688,"BasTable2"),this._box(-12,70,1.5,1.8,1.2,3820090,"BasCabinet1"),this._box(-12,73,1.5,1.8,1.2,3820090,"BasCabinet2"),this._box(12,82,2,2,2,6969914,"BasCrate1"),this._box(10,84,1.5,1.5,1.5,8022602,"BasCrate2"),this._box(-14,90,1,2.2,3,3815994,"BasWeaponRack"),this._box(-6,94,1.2,1.2,1.2,2763306,"BasSafe"),this._box(-12,96,1.5,.8,1,5925434,"BasAmmo1"),this._box(-10,96,1.5,.8,1,5925434,"BasAmmo2")}_buildExtractionPoints(){this._makeExtraction(0,-73,"NORTH出口",null),this._makeExtraction(73,0,"EAST出口",null),this._makeExtraction(-5,66,"地下室","key_basement")}_makeExtraction(t,e,n,i){const r=new ln(6,6),o=new oe({color:i?16755200:65408,transparent:!0,opacity:.28,depthWrite:!1}),a=new at(r,o);a.rotation.x=-Math.PI/2,a.position.set(t,.01,e),a.name=`Extraction_${n}`,this._scene.add(a);const l=this._makeTextSprite(n,i?"#ffaa00":"#00ff80");l.position.set(t,3,e),this._scene.add(l),this.extractionPoints.push({center:new x(t,0,e),radius:3.5,label:n,requiresKey:i})}_building(t,e,n,i,r,o,a){const l=n/2,c=i/2;this._wall(t,e-c,n,.5,r,o,`${a}_WallBack`),this._wall(t-l,e,.5,i,r,o,`${a}_WallLeft`),this._wall(t+l,e,.5,i,r,o,`${a}_WallRight`);const h=Math.min(3,n*.25),f=(n-h)/2;this._wall(t-f/2-h/2,e+c,f,.5,r,o,`${a}_WallFrontL`),this._wall(t+f/2+h/2,e+c,f,.5,r,o,`${a}_WallFrontR`),this.doorSlots.push({cx:t,cz:e+c,gapW:h,h:r,color:o,name:`${a}_Door`});const p=new ln(n-1,i-1),m=new Xt({color:1709844}),_=new at(p,m);_.rotation.x=-Math.PI/2,_.position.set(t,.01,e),_.receiveShadow=!0,_.name=`${a}_IntFloor`,this._scene.add(_);const g=new kt(n+.2,.35,i+.2),d=new Xt({color:o,transparent:!0,opacity:1}),u=new at(g,d);u.position.set(t,r+.18,e),u.castShadow=!0,u.receiveShadow=!0,u.name=`${a}_Roof`,this._scene.add(u),this._buildings.push({roof:u,minX:t-l,maxX:t+l,minZ:e-c,maxZ:e+c})}get buildingOutlines(){return this._buildings.map(t=>({minX:t.minX,maxX:t.maxX,minZ:t.minZ,maxZ:t.maxZ}))}updateRoofs(t){const e=t.x,n=t.z;for(const i of this._buildings){const o=e>i.minX&&e<i.maxX&&n>i.minZ&&n<i.maxZ?0:1,a=i.roof.material.opacity;i.roof.material.opacity=a+(o-a)*.14,i.roof.visible=i.roof.material.opacity>.02}}_wall(t,e,n,i,r,o,a){if(!a||r<=0)return;const l=new kt(n,r,i),c=new Xt({color:o}),h=new at(l,c);return h.position.set(t,r/2,e),h.castShadow=!0,h.receiveShadow=!0,h.name=a,this._scene.add(h),this.collidables.push(h),h}_box(t,e,n,i,r,o,a){const l=new kt(n,i,r),c=new Xt({color:o}),h=new at(l,c);return h.position.set(t,i/2,e),h.castShadow=!0,h.receiveShadow=!0,h.name=a,this._scene.add(h),this.collidables.push(h),h}_buildEnvironmentProps(){const t=[[-15,-15],[15,-15],[-15,15],[15,15],[0,-35],[0,35],[-35,0],[35,0]];for(const[l,c]of t){const h=new Xt({color:5592405}),f=new at(new ye(.08,.1,4.5,6),h);f.position.set(l,2.25,c),f.castShadow=!0,this._scene.add(f);const p=new oe({color:16772778}),m=new at(new kt(.4,.15,.4),p);m.position.set(l,4.5,c),this._scene.add(m);const _=new oe({color:16768409,transparent:!0,opacity:.2,depthWrite:!1}),g=new at(new Ne(.6,8,6),_);g.position.set(l,4.5,c),this._scene.add(g);const d=new qm(16764040,1.8,14);d.position.set(l,4.2,c),this._scene.add(d)}const e=[[-30,-28],[-32,-28],[22,-36],[24,-36],[-50,34],[48,28],[50,28],[-8,56],[30,52],[-20,-50],[55,-42]],n=[3824186,5913130,4868682,2771546];for(const[l,c]of e){const h=n[Math.floor(Math.random()*n.length)],f=new Xt({color:h}),p=new at(new ye(.35,.35,.9,8),f);p.position.set(l,.45,c),p.castShadow=!0,this._scene.add(p),this.collidables.push(p)}const i=[{x:-5,z:-28,w:3,d:.8},{x:5,z:-28,w:3,d:.8},{x:25,z:18,w:.8,d:3},{x:-25,z:18,w:.8,d:3}],r=new Xt({color:9075290});for(const l of i){const c=new at(new kt(l.w,.7,l.d),r);c.position.set(l.x,.35,l.z),c.castShadow=!0,this._scene.add(c),this.collidables.push(c)}const o=new Xt({color:6710886,wireframe:!0}),a=[{x:-30,z:20,w:12,h:2},{x:30,z:-20,w:8,h:2}];for(const l of a){const c=new at(new kt(l.w,l.h,.1),o);c.position.set(l.x,l.h/2,l.z),this._scene.add(c)}}_buildDustParticles(){const e=new we,n=new Float32Array(200*3);for(let r=0;r<200;r++)n[r*3]=(Math.random()-.5)*140,n[r*3+1]=Math.random()*6+.5,n[r*3+2]=(Math.random()-.5)*140;e.setAttribute("position",new qe(n,3));const i=new pc({color:13417386,size:.08,transparent:!0,opacity:.4,depthWrite:!1});this._dustParticles=new Vm(e,i),this._scene.add(this._dustParticles)}_makeTextSprite(t,e="#fff"){const n=document.createElement("canvas");n.width=256,n.height=64;const i=n.getContext("2d");i.fillStyle=e,i.font="bold 24px Courier New",i.textAlign="center",i.textBaseline="middle",i.fillText(t,128,32);const r=new Wm(n),o=new dc({map:r,transparent:!0,depthTest:!1}),a=new Gm(o);return a.scale.set(5,1.25,1),a}}class r_{constructor(){this._hud=document.getElementById("hud"),this._healthBar=document.getElementById("health-bar-inner"),this._healthValue=document.getElementById("health-value"),this._healthDanger=document.getElementById("health-danger"),this._staminaBar=document.getElementById("stamina-bar-inner"),this._staminaWrap=document.getElementById("stamina-bar-wrap"),this._ammoCurrent=document.getElementById("ammo-current"),this._ammoReserve=document.getElementById("ammo-reserve"),this._weaponName=document.getElementById("weapon-name"),this._timerEl=document.getElementById("timer-value"),this._killFeed=document.getElementById("kill-feed"),this._damageFlash=document.getElementById("damage-flash"),this._extractBar=document.getElementById("extract-bar-inner"),this._extractWrap=document.getElementById("extract-bar-wrap"),this._pickupHint=document.getElementById("pickup-hint"),this._bodyPartsEl=document.getElementById("body-parts"),this._tutorialEl=document.getElementById("tutorial-hint"),this._bleedEl=document.getElementById("bleed-indicator"),this._armorWrap=document.getElementById("armor-bar-wrap"),this._armorBar=document.getElementById("armor-bar-inner"),this._healWrap=document.getElementById("heal-channel-wrap"),this._healBar=document.getElementById("heal-channel-inner"),this._healLabel=document.getElementById("heal-channel-label"),this._raidSeconds=45*60,this._flashTimer=0,this._onTimerExpire=null,this._killCountEl=document.getElementById("kill-count"),this._lowHpVignette=document.getElementById("low-health-vignette")}show(){this._hud.style.display="block"}hide(){this._hud.style.display="none"}resetRaid(t=45*60){this._raidSeconds=t}onTimerExpire(t){this._onTimerExpire=t}setKillCount(t){this._killCountEl&&(this._killCountEl.textContent=t)}update(t){const e=this._raidSeconds>0;this._raidSeconds=Math.max(0,this._raidSeconds-t),e&&this._raidSeconds<=0&&this._onTimerExpire&&this._onTimerExpire(),this._updateTimer(),this._flashTimer>0&&(this._flashTimer-=t,this._flashTimer<=0&&this._damageFlash&&(this._damageFlash.style.opacity="0"))}setArmor(t){if(!(!this._armorWrap||!this._armorBar)){if(t<0){this._armorWrap.style.display="none";return}this._armorWrap.style.display="block",this._armorBar.style.width=`${Math.max(0,t)*100}%`,this._armorBar.style.background=t>.5?"#66bb88":t>.2?"#aaaa44":"#bb6644"}}setHealChannel(t,e="治疗中…"){if(!(!this._healWrap||!this._healBar)){if(t<0){this._healWrap.style.display="none";return}this._healWrap.style.display="block",this._healBar.style.width=`${Math.min(1,t)*100}%`,this._healLabel&&(this._healLabel.textContent=e)}}setBleedingState(t){this._bleedEl&&(this._bleedEl.style.display=t?"block":"none")}setStamina(t,e){if(!this._staminaWrap||!this._staminaBar)return;const n=Math.max(0,t/e)*100;this._staminaWrap.style.display=n>=99?"none":"block",this._staminaBar.style.width=`${n}%`,this._staminaBar.style.background=n>50?"#44aaff":n>20?"#ffaa44":"#ff4444"}setHealth(t,e){const n=Math.max(0,t/e)*100;if(this._healthBar&&(this._healthBar.style.width=`${n}%`,this._healthBar.style.background=n>50?"#4caf50":n>25?"#ff9800":"#f44336"),this._healthValue&&(this._healthValue.textContent=Math.ceil(t)),this._healthDanger&&(n<=20&&n>0?(this._healthDanger.textContent="⚠ 危险 — 按H急救",this._healthDanger.style.display="block"):this._healthDanger.style.display="none"),this._lowHpVignette){const i=n<=40?(1-n/40)*.8:0;this._lowHpVignette.style.setProperty("--vig-opacity",i),this._lowHpVignette.style.opacity=i}}setWeapon(t,e,n){this._weaponName&&(this._weaponName.textContent=t),this._ammoCurrent&&(this._ammoCurrent.textContent=e<0?"↺":e,this._ammoCurrent.style.color=e===0?"#f44336":e<=5&&e>0?"#ff9800":"#e0e0e0",this._ammoCurrent.classList.toggle("low",e>=0&&e<=5)),this._ammoReserve&&(this._ammoReserve.textContent=`/ ${n}`)}setExtractProgress(t){!this._extractWrap||!this._extractBar||(t<=0?this._extractWrap.style.display="none":(this._extractWrap.style.display="block",this._extractBar.style.width=`${Math.min(1,t)*100}%`))}setPickupHint(t){this._pickupHint&&(this._pickupHint.textContent=t||"",this._pickupHint.style.display=t?"block":"none")}setBodyParts(t){if(this._bodyPartsEl){if(!this._bpCache){this._bpCache={},this._bodyPartsEl.innerHTML="";for(const e of t){const n=document.createElement("div");n.className="bp-row";const i=document.createElement("span");i.className="bp-label",i.textContent=e.label;const r=document.createElement("div");r.className="bp-bar-outer";const o=document.createElement("div");o.className="bp-bar-inner",r.appendChild(o);const a=document.createElement("span");a.className="bp-val",n.appendChild(i),n.appendChild(r),n.appendChild(a),this._bodyPartsEl.appendChild(n),this._bpCache[e.key]={inner:o,val:a}}}for(const e of t){const n=this._bpCache[e.key];if(!n)continue;const i=Math.max(0,e.hp/e.maxHp)*100,r=i>50?"#4caf50":i>25?"#ff9800":"#f44336";n.inner.style.width=`${i}%`,n.inner.style.background=r,n.val.textContent=Math.ceil(e.hp)}}}setTutorialHint(t){this._tutorialEl&&(t?(this._tutorialEl.textContent=t,this._tutorialEl.style.display="block"):this._tutorialEl.style.display="none")}setActiveWeaponSlot(t){for(let e=0;e<5;e++){const n=document.getElementById(`wslot-${e}`);n&&n.classList.toggle("active",e===t)}}setFractureState(t,e){var o,a,l;if(!this._bodyPartsEl)return;const n=t,i=e,r={LEFT_LEG:n,RIGHT_LEG:n,LEFT_ARM:i,RIGHT_ARM:i};for(const[c,h]of Object.entries(r)){if(!((o=this._bpCache)!=null&&o[c]))continue;const f=(l=(a=this._bpCache[c].inner).closest)==null?void 0:l.call(a,".bp-row");f&&(f.style.outline=h?"1px solid #ff4444":"")}}showDamageFlash(){this._damageFlash&&(this._damageFlash.style.opacity="0.35",this._flashTimer=.25)}pushKillFeed(t){if(!this._killFeed)return;const e=document.createElement("div");e.textContent=t,e.style.opacity="1",e.style.transition="opacity 0.4s",this._killFeed.appendChild(e),setTimeout(()=>{e.style.opacity="0",setTimeout(()=>e.remove(),400)},2800)}_updateTimer(){if(!this._timerEl)return;const t=Math.floor(this._raidSeconds/60),e=Math.floor(this._raidSeconds%60);this._timerEl.textContent=`${String(t).padStart(2,"0")}:${String(e).padStart(2,"0")}`,this._timerEl.style.color=this._raidSeconds<300?"#f44336":"#c8a96e"}}const ji={rifle:{id:"rifle",name:"AK-74",slot:0,damage:28,fireRate:.09,magSize:30,reserveMax:90,range:65,spread:.006,reloadTime:2.4,pellets:1,tracerColor:16768324},pistol:{id:"pistol",name:"格洛克17",slot:1,damage:38,fireRate:.32,magSize:17,reserveMax:51,range:28,spread:.022,reloadTime:1.7,pellets:1,tracerColor:16772744},shotgun:{id:"shotgun",name:"MP-133",slot:2,damage:16,fireRate:.85,magSize:8,reserveMax:24,range:16,spread:.14,reloadTime:3.2,pellets:8,tracerColor:16746564},vss:{id:"vss",name:"VSS Vintorez",slot:3,damage:88,fireRate:.7,magSize:10,reserveMax:30,range:95,spread:.002,reloadTime:3,pellets:1,tracerColor:6750156},mp5:{id:"mp5",name:"MP5",slot:4,damage:22,fireRate:.075,magSize:30,reserveMax:90,range:38,spread:.014,reloadTime:1.9,pellets:1,tracerColor:16768392}};class Zi{constructor(t){this.def=t,this.mag=t.magSize,this.reserve=t.reserveMax,this.isReloading=!1,this._reloadTimer=0,this._cooldown=0}get reloadProgress(){return this.isReloading?1-this._reloadTimer/this.def.reloadTime:1}canFire(){return!this.isReloading&&this._cooldown<=0&&this.mag>0}isEmpty(){return this.mag===0}update(t){this._cooldown=Math.max(0,this._cooldown-t),this.isReloading&&(this._reloadTimer-=t,this._reloadTimer<=0&&this._finishReload())}consumeAmmo(){this.mag<=0||(this.mag--,this._cooldown=this.def.fireRate,this.mag===0&&this.reserve>0&&this.startReload())}startReload(){this.isReloading||this.reserve<=0||this.mag===this.def.magSize||(this.isReloading=!0,this._reloadTimer=this.def.reloadTime)}addReserve(t){this.reserve=Math.min(this.def.reserveMax,this.reserve+t)}_finishReload(){const t=this.def.magSize-this.mag,e=Math.min(t,this.reserve);this.mag+=e,this.reserve-=e,this.isReloading=!1}}class a_{constructor(){this.slots=[new Zi(ji.rifle),new Zi(ji.pistol),new Zi(ji.shotgun),new Zi(ji.vss),new Zi(ji.mp5)],this.activeSlot=0}get current(){return this.slots[this.activeSlot]}applyLoadout(t){this.activeSlot=t;for(let e=0;e<this.slots.length;e++)if(e!==t)this.slots[e].reserve=0,this.slots[e].mag=0;else{const n=this.slots[e].def;this.slots[e].mag=n.magSize,this.slots[e].reserve=n.reserveMax,this.slots[e].isReloading=!1,this.slots[e]._reloadTimer=0,this.slots[e]._cooldown=0}}update(t,e){e.justPressed("Digit1")&&(this.activeSlot=0),e.justPressed("Digit2")&&(this.activeSlot=1),e.justPressed("Digit3")&&(this.activeSlot=2),e.justPressed("Digit4")&&(this.activeSlot=3),e.justPressed("Digit5")&&(this.activeSlot=4),e.justPressed("KeyR")&&this.current.startReload();for(const n of this.slots)n.update(t)}tryFire(){return this.current.canFire()?(this.current.consumeAmmo(),!0):!1}}class o_{constructor(t){this._scene=t,this._tracers=[],this._particles=[],this._flashes=[]}spawnTracer(t,e,n=16772744){const r=[new x(t.x,.5,t.z),new x(e.x,.5,e.z)],o=new we().setFromPoints(r),a=new sr({color:n,transparent:!0,opacity:1,linewidth:2}),l=new ga(o,a);this._scene.add(l),this._tracers.push({line:l,mat:a,life:.16,maxLife:.16})}spawnMuzzleFlash(t){const e=new Ne(.35,6,6),n=new oe({color:16768324,transparent:!0,opacity:.9}),i=new at(e,n);i.position.set(t.x,.5,t.z),this._scene.add(i),this._flashes.push({mesh:i,mat:n,life:.07});const r=new Ne(.15,4,4),o=new oe({color:16777215,transparent:!0,opacity:1}),a=new at(r,o);a.position.set(t.x,.5,t.z),this._scene.add(a),this._flashes.push({mesh:a,mat:o,life:.05})}spawnHitEffect(t){for(let n=0;n<8;n++){const i=.03+Math.random()*.04,r=new Ne(i,3,3),o=Math.random()>.4?16750848:16768324,a=new oe({color:o,transparent:!0}),l=new at(r,a);l.position.set(t.x,Math.max(.05,t.y),t.z);const c=n/8*Math.PI*2+Math.random()*.8,h=3+Math.random()*2.5,f=new x(Math.cos(c)*h,2.2+Math.random()*1.8,Math.sin(c)*h);this._scene.add(l),this._particles.push({mesh:l,mat:a,vel:f,life:.3,maxLife:.3})}}spawnKillEffect(t){const e=new Na(.3,1.2,12),n=new oe({color:16737792,transparent:!0,opacity:.8,side:We}),i=new at(e,n);i.rotation.x=-Math.PI/2,i.position.set(t.x,.1,t.z),this._scene.add(i),this._flashes.push({mesh:i,mat:n,life:.25,isKillRing:!0});const r=14;for(let o=0;o<r;o++){const a=.04+Math.random()*.06,l=new Ne(a,3,3),c=[16724736,16737792,16755200,16768324],h=c[Math.floor(Math.random()*c.length)],f=new oe({color:h,transparent:!0}),p=new at(l,f);p.position.set(t.x,.3,t.z);const m=o/r*Math.PI*2+Math.random()*.5,_=4+Math.random()*3,g=new x(Math.cos(m)*_,3+Math.random()*2.5,Math.sin(m)*_);this._scene.add(p),this._particles.push({mesh:p,mat:f,vel:g,life:.4,maxLife:.4})}}spawnHitMarkerWorld(t,e){const i=new Ne(.12,4,4),r=new oe({color:16777215,transparent:!0,opacity:1}),o=new at(i,r);o.position.set(t.x+Math.sin(e)*1.5,.8,t.z+Math.cos(e)*1.5),this._scene.add(o),this._flashes.push({mesh:o,mat:r,life:.12})}update(t){this._updateTracers(t),this._updateParticles(t),this._updateFlashes(t)}_updateTracers(t){for(let e=this._tracers.length-1;e>=0;e--){const n=this._tracers[e];n.life-=t,n.mat.opacity=Math.max(0,n.life/n.maxLife),n.life<=0&&(this._scene.remove(n.line),n.line.geometry.dispose(),n.mat.dispose(),this._tracers.splice(e,1))}}_updateParticles(t){for(let n=this._particles.length-1;n>=0;n--){const i=this._particles[n];i.life-=t,i.vel.y-=14*t,i.mesh.position.addScaledVector(i.vel,t),i.mat.opacity=Math.max(0,i.life/i.maxLife);const r=Math.max(.1,i.life/i.maxLife);i.mesh.scale.setScalar(r),i.life<=0&&(this._scene.remove(i.mesh),i.mesh.geometry.dispose(),i.mat.dispose(),this._particles.splice(n,1))}}_updateFlashes(t){for(let e=this._flashes.length-1;e>=0;e--){const n=this._flashes[e];n.life-=t,n.mat&&(n.mat.opacity=Math.max(0,n.life*8)),n.isKillRing&&n.mesh.scale.setScalar(1+(1-n.life/.25)*1.5),n.life<=0&&(this._scene.remove(n.mesh),n.mesh.geometry.dispose(),n.mat&&n.mat.dispose(),this._flashes.splice(e,1))}}}const El=.5,l_=1.6,wl=1.8,Tl=3.8,c_=18,h_=Math.PI*.65,u_=12,d_=16,bl=1.3,f_=10,Al=160,Rl=.85,p_=16,m_=24,__=22,g_=[new x(1,0,0),new x(-1,0,0),new x(0,0,1),new x(0,0,-1)],Kt={PATROL:0,ALERT:1,COMBAT:2,SEARCH:3,DEAD:4},x_=[3394645,16755200,16720418,16776960,4473924];class Cl{constructor(t,e,n=[],i=!1){this._scene=t,this.position=e.clone(),this.position.y=0,this.waypoints=n,this._wpIdx=0,this.isElite=i,this.state=Kt.PATROL,this.health=i?Al:80,this.maxHealth=i?Al:80,this._shootRange=i?__:d_,this._shootInterval=i?Rl:bl,this._shootDamage=i?p_:f_,this._visionRange=i?m_:c_,this._facing=0,this._alertTimer=0,this._shootTimer=Math.random()*(i?Rl:bl),this._prevState=Kt.PATROL,this._hasAlerted=!1,this._lastKnownPos=null,this._lostSightTimer=0,this._searchTimer=0,this._searchLookTimer=0,this._wallRay=new On,this._visionRay=new On,this._v1=new x,this._v2=new x,this._origin05=new x,this.mesh=this._buildMesh(),t.add(this.mesh),this._buildPatrolVisuals()}get isAlive(){return this.state!==Kt.DEAD}update(t,e,n,i){const r=this.position.distanceTo(e),o=this._checkVision(e,n),a=i&&r<u_;o?(this._lastKnownPos=e.clone(),this._lostSightTimer=0):this.state===Kt.COMBAT&&(this._lostSightTimer+=t),this.state===Kt.PATROL?(o||a)&&(this.state=Kt.COMBAT,a&&!o&&(this._lastKnownPos=e.clone())):this.state===Kt.ALERT?(this._alertTimer-=t,o?this.state=Kt.COMBAT:this._alertTimer<=0&&(this.state=Kt.PATROL)):this.state===Kt.COMBAT?o?this._lostSightTimer=0:this._lostSightTimer>2.5&&this._lastKnownPos&&(this.state=Kt.SEARCH,this._searchTimer=5,this._searchLookTimer=0):this.state===Kt.SEARCH&&(o?this.state=Kt.COMBAT:(this._searchTimer-=t,this._searchTimer<=0&&(this.state=Kt.PATROL)));const l=this.isElite&&!this._hasAlerted&&this._prevState!==Kt.COMBAT&&this.state===Kt.COMBAT;l&&(this._hasAlerted=!0),this._prevState=this.state;let c={shot:!1};return this.state===Kt.PATROL?this._doPatrol(t,n):this.state===Kt.ALERT?this._facePos(e):this.state===Kt.COMBAT?(this._doCombat(t,e,n),c=this._tryShoot(t,e,n)):this.state===Kt.SEARCH&&this._doSearch(t,n),this._syncMesh(),{...c,eliteAlert:l}}takeDamage(t){this.isAlive&&(this.health=Math.max(0,this.health-t),(this.state===Kt.PATROL||this.state===Kt.ALERT)&&(this.state=Kt.COMBAT),this._flashHit(),this.health<=0&&this._die())}_flashHit(){this._flashing||(this._flashing=!0,this.mesh.traverse(t=>{t.isMesh&&t!==this._hpBar&&t.material.emissive&&t.material.emissive.set(16777215)}),setTimeout(()=>{this.mesh.traverse(t=>{t.isMesh&&t!==this._hpBar&&t.material.emissive&&t.material.emissive.set(0)}),this._flashing=!1},80))}_doPatrol(t,e){if(this.waypoints.length===0)return;const n=this.waypoints[this._wpIdx];if(this.position.distanceTo(n)<.6){this._wpIdx=(this._wpIdx+1)%this.waypoints.length;return}this._facePos(n),this._moveTo(n,wl,t,e)}_doSearch(t,e){if(!this._lastKnownPos)return;this.position.distanceTo(this._lastKnownPos)>1.2?(this._facePos(this._lastKnownPos),this._moveTo(this._lastKnownPos,Tl*.8,t,e)):(this._searchLookTimer-=t,this._searchLookTimer<=0&&(this._facing+=(Math.random()-.5)*Math.PI*1.2,this._searchLookTimer=1+Math.random()*.8))}_doCombat(t,e,n){const i=this.position.distanceTo(e);this._facePos(e),i>this._shootRange*.55?this._moveTo(e,Tl,t,n):i<this._shootRange*.25&&(this._v2.subVectors(this.position,e).normalize().add(this.position),this._moveTo(this._v2,wl,t,n))}_tryShoot(t,e,n){if(this._shootTimer=Math.max(0,this._shootTimer-t),this._shootTimer>0)return{shot:!1};if(this.position.distanceTo(e)>this._shootRange)return{shot:!1};this._origin05.set(this.position.x,.5,this.position.z),this._v1.set(e.x-this._origin05.x,0,e.z-this._origin05.z);const i=this._v1.length();if(this._v1.normalize(),this._visionRay.set(this._origin05,this._v1),this._visionRay.far=i-.2,this._visionRay.intersectObjects(n,!1).some(a=>a.object.name!=="Floor"))return{shot:!1};this._shootTimer=this._shootInterval+(Math.random()*.5-.25),this._v2.copy(this._v1);const o=this.isElite?.04:.08;return this._v2.x+=(Math.random()-.5)*o,this._v2.z+=(Math.random()-.5)*o,this._v2.normalize(),{shot:!0,origin:this._origin05.clone(),dir:this._v2.clone(),damage:this._shootDamage}}_checkVision(t,e){this._origin05.set(this.position.x,.5,this.position.z),this._v1.set(t.x-this._origin05.x,0,t.z-this._origin05.z);const n=this._v1.length();return n>this._visionRange||(this._v1.normalize(),this._v2.set(Math.sin(this._facing),0,Math.cos(this._facing)),this._v2.dot(this._v1)<Math.cos(h_/2))?!1:(this._visionRay.set(this._origin05,this._v1),this._visionRay.far=n-.1,this._visionRay.intersectObjects(e,!1).every(r=>r.object.name==="Floor"))}_facePos(t){const e=t.x-this.position.x,n=t.z-this.position.z;this._facing=Math.atan2(e,n)}_moveTo(t,e,n,i){this._v1.set(t.x-this.position.x,0,t.z-this.position.z),!(this._v1.length()<.01)&&(this._v1.normalize().multiplyScalar(e*n),this.position.add(this._v1),this.position.y=0,this._resolveWalls(i))}_resolveWalls(t){this._origin05.set(this.position.x,.5,this.position.z),this._wallRay.near=0,this._wallRay.far=El+.08;for(const e of g_){this._wallRay.set(this._origin05,e);const n=this._wallRay.intersectObjects(t,!1);if(n.length>0){const i=El-n[0].distance;i>0&&(this.position.x-=e.x*i,this.position.z-=e.z*i)}}}_die(){this.state=Kt.DEAD,this.mesh.rotation.z=Math.PI/2,this.mesh.position.y=.15,this.mesh.traverse(t=>{t.isMesh&&(t.material=t.material.clone(),t.material.color.set(4473924))}),this._hidePatrolVisuals()}_syncMesh(){if(!this.isAlive)return;this.mesh.position.set(this.position.x,l_/2,this.position.z),this.mesh.rotation.y=this._facing;const t=this.health/this.maxHealth;this._hpBar&&(this._hpBar.scale.x=Math.max(.001,t),this._hpBar.position.x=(t-1)*.5),this._updatePatrolVisuals()}_buildPatrolVisuals(){if(this.waypoints.length===0)return;const t=.04,e=[...this.waypoints,this.waypoints[0]].map(p=>new x(p.x,t,p.z)),n=new we().setFromPoints(e),i=new sr({color:3394645,transparent:!0,opacity:.5,depthWrite:!1});this._patrolLine=new ga(n,i),this._patrolLine.renderOrder=1,this._scene.add(this._patrolLine),this._waypointMarkers=this.waypoints.map((p,m)=>{const _=new ln(.55,.55);_.rotateZ(Math.PI/4);const g=new oe({color:m===0?65416:2271812,transparent:!0,opacity:.65,depthWrite:!1,side:We}),d=new at(_,g);return d.rotation.x=-Math.PI/2,d.position.set(p.x,t,p.z),d.renderOrder=2,this._scene.add(d),d});const r=new ln(.7,.7);r.rotateZ(Math.PI/4);const o=new oe({color:16776960,transparent:!0,opacity:.85,depthWrite:!1,side:We});this._targetMarker=new at(r,o),this._targetMarker.rotation.x=-Math.PI/2,this._targetMarker.renderOrder=3,this._scene.add(this._targetMarker);const a=36,l=1.1,c=Array.from({length:a+1},(p,m)=>{const _=m/a*Math.PI*2;return new x(Math.cos(_)*l,t,Math.sin(_)*l)}),h=new we().setFromPoints(c),f=new sr({color:3394645,transparent:!0,opacity:.8,depthWrite:!1});this._stateRing=new ga(h,f),this._stateRing.renderOrder=2,this._scene.add(this._stateRing)}_updatePatrolVisuals(){if(this._stateRing&&(this._stateRing.position.set(this.position.x,0,this.position.z),this._stateRing.material.color.setHex(x_[this.state])),this._patrolLine&&this._patrolLine.material.color.setHex(this.state===Kt.PATROL?3394645:this.state===Kt.ALERT?16755200:16720418),this._targetMarker)if(this.state===Kt.PATROL&&this.waypoints.length>0){const t=this.waypoints[this._wpIdx];this._targetMarker.position.set(t.x,.04,t.z),this._targetMarker.visible=!0;const e=.8+Math.sin(performance.now()*.004)*.2;this._targetMarker.scale.setScalar(e)}else this._targetMarker.visible=!1}_hidePatrolVisuals(){var t;this._patrolLine&&(this._patrolLine.visible=!1),this._stateRing&&(this._stateRing.visible=!1),this._targetMarker&&(this._targetMarker.visible=!1),(t=this._waypointMarkers)==null||t.forEach(e=>{e.visible=!1})}_buildMesh(){const t=new ti,e=this.isElite,n=new Xt({color:e?2759194:4864554}),i=new at(new ye(.1,.12,.45,6),n);i.position.set(-.12,-.32,0),i.castShadow=!0,t.add(i);const r=new at(new ye(.1,.12,.45,6),n);r.position.set(.12,-.32,0),r.castShadow=!0,t.add(r);const o=e?.55:.46,a=e?.7:.58,l=new Xt({color:e?3803658:8010270}),c=new at(new kt(o,a,.3),l);if(c.position.y=.05,c.castShadow=!0,t.add(c),e){const D=new Xt({color:2763306}),y=new at(new kt(.48,.45,.08),D);y.position.set(0,.08,.18),t.add(y)}const h=new Xt({color:e?3803658:8010270}),f=new at(new ye(.07,.08,.42,6),h);f.position.set(-(o/2+.06),0,.06),f.rotation.x=.4,f.castShadow=!0,t.add(f);const p=new at(new ye(.07,.08,.42,6),h);p.position.set(o/2+.06,0,.06),p.rotation.x=.4,p.castShadow=!0,t.add(p);const m=new Xt({color:2763306}),_=new at(new kt(.05,.06,e?.5:.4),m);_.position.set(o/2+.06,-.05,.35),t.add(_);const g=e?.26:.22,d=new Xt({color:e?13408580:15777888}),u=new at(new Ne(g,8,6),d);if(u.position.y=e?.68:.58,u.castShadow=!0,t.add(u),e){const D=new Xt({color:13369344}),y=new at(new Ne(.3,8,4,0,Math.PI*2,0,Math.PI*.5),D);y.position.y=.74,t.add(y);const M=new oe({color:16763904}),C=new at(new kt(.15,.15,.02),M);C.position.set(o/2+.01,.22,.16),t.add(C)}else{const D=new Xt({color:6965802}),y=new at(new ye(.23,.23,.08,8),D);y.position.y=.54,t.add(y)}if(e){const D=new oe({color:15658734}),y=new at(new kt(.06,.35,.02),D);y.position.set(0,.08,.19),t.add(y)}else{const D=new oe({color:16720418}),y=new at(new ye(.1,.1,.06,6),D);y.position.set(-(o/2+.06),.15,0),t.add(y);const M=new at(new ye(.1,.1,.06,6),D);M.position.set(o/2+.06,.15,0),t.add(M)}const w=new oe({color:e?16763904:16728096}),E=new at(new kt(.08,.08,.12),w);E.position.set(o/2+.06,-.05,e?.62:.52),t.add(E);const T=e?1.35:1.15,N=e?1.2:.9,R=new oe({color:e?1703936:2228224});t.add(new at(new kt(N,.08,.04),R)).position.set(0,T,0);const A=new oe({color:e?16755200:16724787});return this._hpBar=new at(new kt(N,.08,.05),A),this._hpBar.position.set(0,T,0),t.add(this._hpBar),t}}class v_{constructor(t){this._scene=t,this.enemies=[],this._spawnEnemies()}get aliveCount(){let t=0;for(const e of this.enemies)e.isAlive&&t++;return t}update(t,e,n,i){const r=[];let o=!1;for(const a of this.enemies){if(!a.isAlive)continue;const l=a.update(t,e,n,i);l.shot&&r.push({origin:l.origin,dir:l.dir,damage:l.damage}),l.eliteAlert&&(o=!0)}return this._respawnTimer=(this._respawnTimer??0)+t,this._respawnTimer>=90&&(this._respawnTimer=0,this._spawnWave(e)),{shots:r,eliteAlerted:o}}_spawnWave(t){const n=[new x(-60,0,-60),new x(60,0,-60),new x(-60,0,60),new x(60,0,60),new x(0,0,-70),new x(0,0,70)].filter(r=>r.distanceTo(t)>30).sort(()=>Math.random()-.5).slice(0,2+Math.floor(Math.random()*2));let i=0;for(const r of n){const o=[r.clone(),new x(r.x+8,0,r.z),new x(r.x+8,0,r.z+8),new x(r.x,0,r.z+8)],a=Math.random()<.15,l=new Cl(this._scene,r,o,a);this.enemies.push(l),i++}i>0&&(this._waveCount=(this._waveCount??0)+1)}get waveCount(){return this._waveCount??0}checkPlayerHit(t,e,n){let i=null,r=1/0;for(const o of this.enemies){if(!o.isAlive)continue;const a=this._rayHitsCapsule(t,e,o.position,.5,n);a!==null&&a<r&&(r=a,i=o)}return i}_spawnEnemies(){const t=[{pos:new x(-38,0,-38),waypoints:[new x(-38,0,-38),new x(-28,0,-38),new x(-28,0,-28),new x(-38,0,-28)]},{pos:new x(-24,0,-44),waypoints:[new x(-24,0,-44),new x(-16,0,-44),new x(-16,0,-36),new x(-24,0,-36)]},{pos:new x(28,0,-40),waypoints:[new x(28,0,-40),new x(40,0,-40),new x(40,0,-28),new x(28,0,-28)]},{pos:new x(44,0,-32),waypoints:[new x(44,0,-32),new x(44,0,-20),new x(36,0,-20),new x(36,0,-32)]},{pos:new x(-8,0,-8),waypoints:[new x(-8,0,-8),new x(8,0,-8),new x(8,0,8),new x(-8,0,8)]},{pos:new x(12,0,2),waypoints:[new x(12,0,2),new x(18,0,2),new x(18,0,12),new x(12,0,12)]},{pos:new x(-14,0,6),waypoints:[new x(-14,0,6),new x(-6,0,6),new x(-6,0,14),new x(-14,0,14)]},{pos:new x(4,0,-14),waypoints:[new x(4,0,-14),new x(14,0,-14),new x(14,0,-6),new x(4,0,-6)]},{pos:new x(-36,0,28),waypoints:[new x(-36,0,28),new x(-24,0,28),new x(-24,0,40),new x(-36,0,40)]},{pos:new x(-44,0,18),waypoints:[new x(-44,0,18),new x(-32,0,18),new x(-32,0,26),new x(-44,0,26)]},{pos:new x(30,0,26),waypoints:[new x(30,0,26),new x(44,0,26),new x(44,0,40),new x(30,0,40)]},{pos:new x(20,0,18),waypoints:[new x(20,0,18),new x(20,0,26),new x(30,0,26),new x(30,0,18)]},{pos:new x(-10,0,52),waypoints:[new x(-10,0,52),new x(4,0,52),new x(4,0,62),new x(-10,0,62)]},{pos:new x(8,0,58),waypoints:[new x(8,0,58),new x(-4,0,58),new x(-4,0,48),new x(8,0,48)]},{pos:new x(0,0,66),waypoints:[new x(0,0,66),new x(-8,0,60),new x(8,0,60)]},{pos:new x(-4,0,-30),waypoints:[new x(-4,0,-30),new x(-20,0,-30),new x(-20,0,-16),new x(0,0,-10),new x(8,0,-20)]},{pos:new x(16,0,-10),waypoints:[new x(16,0,-10),new x(22,0,-4),new x(22,0,14),new x(12,0,18)]},{isElite:!0,pos:new x(-36,0,-46),waypoints:[new x(-36,0,-46),new x(-44,0,-46),new x(-44,0,-38),new x(-36,0,-38)]},{isElite:!0,pos:new x(40,0,-46),waypoints:[new x(40,0,-46),new x(50,0,-46),new x(50,0,-38),new x(40,0,-38)]},{isElite:!0,pos:new x(-44,0,38),waypoints:[new x(-44,0,38),new x(-36,0,38),new x(-36,0,46),new x(-44,0,46)]},{isElite:!0,pos:new x(2,0,58),waypoints:[new x(2,0,58),new x(-6,0,58),new x(-6,0,64),new x(2,0,64)]}];for(const e of t)this.enemies.push(new Cl(this._scene,e.pos,e.waypoints,e.isElite??!1))}_rayHitsCapsule(t,e,n,i,r){const o=t.x-n.x,a=t.z-n.z,l=e.x,c=e.z,h=l*l+c*c,f=2*(o*l+a*c),p=o*o+a*a-i*i,m=f*f-4*h*p;if(m<0)return null;const _=(-f-Math.sqrt(m))/(2*h);return _<0||_>r?null:_}}const ss={rifle_ammo:{id:"rifle_ammo",name:"5.45mm弹药",w:1,h:2,color:"#6a7a6a",stackable:!0,maxStack:60,value:80,weight:.01},pistol_ammo:{id:"pistol_ammo",name:"9mm弹药",w:1,h:1,color:"#6a6a7a",stackable:!0,maxStack:50,value:50,weight:.008},shotgun_ammo:{id:"shotgun_ammo",name:"12号弹壳",w:1,h:1,color:"#8a6a3a",stackable:!0,maxStack:20,value:60,weight:.04},bandage:{id:"bandage",name:"绷带",w:1,h:1,color:"#c8b89a",stackable:!0,maxStack:5,value:200,weight:.1,heals:15},medkit:{id:"medkit",name:"急救包",w:2,h:2,color:"#cc4444",stackable:!1,value:900,weight:.95,heals:60},painkillers:{id:"painkillers",name:"止痛药",w:1,h:2,color:"#aaaa44",stackable:!1,value:400,weight:.15,heals:30},dogtag:{id:"dogtag",name:"狗牌",w:1,h:1,color:"#aaaaaa",stackable:!1,value:500,weight:.05},cash:{id:"cash",name:"鸭元",w:1,h:1,color:"#88aa55",stackable:!0,maxStack:999,value:1,weight:0},vss_ammo:{id:"vss_ammo",name:"SP-6弹药",w:1,h:2,color:"#5a8a7a",stackable:!0,maxStack:30,value:120,weight:.014},mp5_ammo:{id:"mp5_ammo",name:"9mm SMG弹",w:1,h:1,color:"#7a6a8a",stackable:!0,maxStack:90,value:55,weight:.009},key_basement:{id:"key_basement",name:"地下室钥匙",w:1,h:1,color:"#d4a017",stackable:!1,value:1500,weight:.08},vest_light:{id:"vest_light",name:"轻型防弹衣",w:2,h:3,color:"#4a6a5a",stackable:!1,value:1200,weight:4.5,armor:{armorHp:80,reduce:.4}},vest_heavy:{id:"vest_heavy",name:"重型防弹衣",w:2,h:3,color:"#3a5040",stackable:!1,value:2800,weight:7.5,armor:{armorHp:150,reduce:.6}},helmet:{id:"helmet",name:"防弹头盔",w:2,h:2,color:"#4a4a5a",stackable:!1,value:1800,weight:1.8,armor:{armorHp:50,reduce:.55,headOnly:!0}}},wi=8,Ti=10;class M_{constructor(){this._grid=Array.from({length:wi},()=>Array(Ti).fill(null)),this.items=new Map,this._nextId=1,this.addItem("rifle_ammo",60),this.addItem("pistol_ammo",17),this.addItem("bandage",2)}get rows(){return wi}get cols(){return Ti}get totalWeight(){let t=0;for(const e of this.items.values())t+=(e.def.weight??0)*(e.def.stackable?e.count:1);return t}reset(){this._grid=Array.from({length:wi},()=>Array(Ti).fill(null)),this.items=new Map,this._nextId=1}addItem(t,e=1){const n=ss[t];if(!n)return!1;if(n.stackable){for(const a of this.items.values())if(a.def.id===t&&a.count<n.maxStack){const l=n.maxStack-a.count,c=Math.min(l,e);if(a.count+=c,e-=c,e<=0)return!0}if(e<=0)return!0}const i=this._findSpace(n.w,n.h);if(!i)return!1;const r=this._nextId++,o={id:r,def:n,count:n.stackable?e:1,row:i.row,col:i.col};return this.items.set(r,o),this._fill(i.row,i.col,n.w,n.h,r),!0}removeItem(t){const e=this.items.get(t);e&&(this._fill(e.row,e.col,e.def.w,e.def.h,null),this.items.delete(t))}dropItem(t){const e=this.items.get(t);if(!e)return null;const n=e.def;return this._fill(e.row,e.col,n.w,n.h,null),this.items.delete(t),n}getBestHealingItem(){let t=null;for(const[e,n]of this.items.entries())n.def.heals&&(!t||n.def.heals>t.item.def.heals)&&(t={def:n.def,instanceId:e});return t}useHealing(t){const e=this.items.get(t);if(!e)return 0;const n=e.def.heals;return e.def.stackable?(e.count--,e.count<=0&&this.removeItem(e.id)):this.removeItem(e.id),n}moveItem(t,e,n){const i=this.items.get(t);if(!i)return!1;const{w:r,h:o}=i.def;return e<0||n<0||e+o>wi||n+r>Ti?!1:(this._fill(i.row,i.col,r,o,null),this._canPlace(e,n,r,o)?(this._fill(e,n,r,o,t),i.row=e,i.col=n,!0):(this._fill(i.row,i.col,r,o,t),!1))}swapItems(t,e){const n=this.items.get(t),i=this.items.get(e);if(!n||!i)return!1;this._fill(n.row,n.col,n.def.w,n.def.h,null),this._fill(i.row,i.col,i.def.w,i.def.h,null);const r=this._canPlace(i.row,i.col,n.def.w,n.def.h),o=this._canPlace(n.row,n.col,i.def.w,i.def.h);if(r&&o){const a=n.row,l=n.col;return n.row=i.row,n.col=i.col,i.row=a,i.col=l,this._fill(n.row,n.col,n.def.w,n.def.h,t),this._fill(i.row,i.col,i.def.w,i.def.h,e),!0}return this._fill(n.row,n.col,n.def.w,n.def.h,t),this._fill(i.row,i.col,i.def.w,i.def.h,e),!1}getItemAt(t,e){return t<0||t>=wi||e<0||e>=Ti?null:this._grid[t][e]}_findSpace(t,e){for(let n=0;n<=wi-e;n++)for(let i=0;i<=Ti-t;i++)if(this._canPlace(n,i,t,e))return{row:n,col:i};return null}_canPlace(t,e,n,i){for(let r=t;r<t+i;r++)for(let o=e;o<e+n;o++)if(this._grid[r][o]!==null)return!1;return!0}_fill(t,e,n,i,r){for(let o=t;o<t+i;o++)for(let a=e;a<e+n;a++)this._grid[o][a]=r}}const sa=2,Pl=2.2,Ji=(s,t)=>Math.floor(Math.random()*(t-s+1))+s;function S_(s="normal"){const t={normal:[{defId:"cash",count:()=>Ji(80,250)},{defId:"bandage",count:()=>1},{defId:"pistol_ammo",count:()=>Ji(10,17)},{defId:"rifle_ammo",count:()=>Ji(10,20)}],rich:[{defId:"cash",count:()=>Ji(300,700)},{defId:"medkit",count:()=>1},{defId:"rifle_ammo",count:()=>Ji(20,30)},{defId:"dogtag",count:()=>1},{defId:"painkillers",count:()=>1}]},e=t[s.toLowerCase()]??t.normal,n=s==="rich"?3:2,i=[...e];for(let o=i.length-1;o>0;o--){const a=Math.floor(Math.random()*(o+1));[i[o],i[a]]=[i[a],i[o]]}return i.slice(0,n).map(o=>({defId:o.defId,count:o.count()}))}class y_{constructor(t){this._scene=t,this._items=[],this._containers=[],this._spawnItems(),this._spawnContainers()}update(t,e){let n=null;for(const i of this._containers){if(i.opened)continue;if(t.distanceTo(i.pos)<Pl){const o=1+Math.sin(performance.now()*.004)*.06;i.mesh.scale.set(o,1,o),e&&!n&&(this._openContainer(i),n={defId:"__container__",drops:S_(i.tier)})}else i.mesh.scale.setScalar(1)}for(let i=this._items.length-1;i>=0;i--){const r=this._items[i],o=t.distanceTo(r.pos),a=o<sa?1+Math.sin(performance.now()*.005)*.1:1;r.mesh.scale.setScalar(a),e&&o<sa&&!n&&(n={defId:r.defId,count:r.count},this._scene.remove(r.mesh),r.mesh.geometry.dispose(),r.mesh.material.dispose(),this._items.splice(i,1))}return n}dropLoot(t,e){for(const n of e){const i=new x((Math.random()-.5)*1.2,0,(Math.random()-.5)*1.2);this._spawnItem(n.defId,n.count,t.clone().add(i))}}getNearbyItemName(t){for(const e of this._containers)if(!e.opened&&t.distanceTo(e.pos)<Pl)return"[箱子] 按E开箱";for(const e of this._items)if(t.distanceTo(e.pos)<sa){const n=ss[e.defId];return n?n.name:e.defId}return null}get containers(){return this._containers}_spawnItems(){const t=[["rifle_ammo",30,-36,-42],["rifle_ammo",20,-26,-30],["bandage",2,-32,-36],["cash",150,-40,-26],["rifle_ammo",30,32,-44],["pistol_ammo",17,42,-30],["medkit",1,36,-36],["cash",250,46,-22],["pistol_ammo",17,-6,-6],["bandage",1,8,-4],["dogtag",1,0,6],["cash",300,-4,10],["shotgun_ammo",12,-30,32],["bandage",2,-42,24],["painkillers",1,-36,44],["cash",100,-26,38],["rifle_ammo",20,34,30],["shotgun_ammo",8,44,36],["pistol_ammo",17,28,44],["cash",200,40,24],["key_basement",1,-2,60],["medkit",1,8,54],["rifle_ammo",30,-8,50],["cash",400,2,66]];for(const[e,n,i,r]of t)this._spawnItem(e,n,new x(i,0,r))}_spawnItem(t,e,n){const r={rifle_ammo:{color:8969523,size:.22,shape:"cylinder"},pistol_ammo:{color:11193412,size:.18,shape:"cylinder"},shotgun_ammo:{color:14518323,size:.2,shape:"cylinder"},vss_ammo:{color:4508842,size:.22,shape:"cylinder"},mp5_ammo:{color:12298820,size:.18,shape:"cylinder"},bandage:{color:16737860,size:.25,shape:"box"},medkit:{color:16720418,size:.45,shape:"box",glow:!0},painkillers:{color:16755268,size:.28,shape:"box"},dogtag:{color:14540253,size:.25,shape:"box",glow:!0},cash:{color:16768256,size:.2,shape:"box"},key_basement:{color:16768324,size:.3,shape:"box",glow:!0},vest_light:{color:4885082,size:.4,shape:"box",glow:!0},vest_heavy:{color:3825728,size:.45,shape:"box",glow:!0},helmet:{color:5921386,size:.35,shape:"sphere",glow:!0}}[t]??{color:16777215,size:.3,shape:"box"};let o;r.shape==="cylinder"?o=new ye(r.size*.5,r.size*.5,r.size,6):r.shape==="sphere"?o=new Ne(r.size*.5,6,5):o=new kt(r.size,r.size,r.size);const a=new Xt({color:r.color});r.glow&&(a.emissive=new Ot(r.color),a.emissiveIntensity=.3);const l=new at(o,a);if(l.position.set(n.x,r.size*.5+.05,n.z),l.castShadow=!0,this._scene.add(l),t==="medkit"){const c=new oe({color:16777215}),h=new at(new kt(.3,.06,.06),c);h.position.set(n.x,r.size*.5+.05,n.z),this._scene.add(h);const f=new at(new kt(.06,.06,.3),c);f.position.set(n.x,r.size*.5+.05,n.z),this._scene.add(f)}this._items.push({mesh:l,defId:t,count:e,pos:n.clone()})}_spawnContainers(){const t=[[-42,-48,"normal",8019002,"FactoryCrate1"],[-34,-55,"normal",8019002,"FactoryCrate2"],[38,-48,"normal",6974042,"WhCrate1"],[48,-55,"rich",5925482,"WhBox1"],[-48,38,"normal",8019002,"AptCrate1"],[56,50,"rich",5925482,"ShedBox1"],[12,25,"normal",8019002,"BoothCrate1"],[2,60,"rich",3820122,"BasementBox1"],[4,4,"normal",6969914,"CentralCrate1"]];for(const[e,n,i,r,o]of t){const a=i==="rich",l=a?.75:.9,c=a?.5:.7,h=a?.55:.7,f=a?3824234:r,p=new kt(l,c,h),m=new Xt({color:f}),_=new at(p,m);if(_.position.set(e,c/2,n),_.castShadow=!0,_.receiveShadow=!0,_.name=o,this._scene.add(_),a){const g=new oe({color:16755200}),d=new at(new kt(.12,.15,.04),g);d.position.set(e,c*.4,n+h/2+.02),this._scene.add(d)}else{const g=new Xt({color:5917242});for(let d=.15;d<c-.1;d+=.22){const u=new at(new kt(l+.02,.04,h+.02),g);u.position.set(e,d,n),this._scene.add(u)}}this._containers.push({mesh:_,pos:new x(e,0,n),opened:!1,tier:i})}}_openContainer(t){t.opened=!0,t.mesh.scale.y=.25,t.mesh.position.y*=.25,t.mesh.material.color.setHex(2761760)}}const Tt={HEAD:"HEAD",TORSO:"TORSO",LEFT_ARM:"LEFT_ARM",RIGHT_ARM:"RIGHT_ARM",LEFT_LEG:"LEFT_LEG",RIGHT_LEG:"RIGHT_LEG"},sn={[Tt.HEAD]:{label:"头部",maxHp:35},[Tt.TORSO]:{label:"躯干",maxHp:85},[Tt.LEFT_ARM]:{label:"左臂",maxHp:50},[Tt.RIGHT_ARM]:{label:"右臂",maxHp:50},[Tt.LEFT_LEG]:{label:"左腿",maxHp:60},[Tt.RIGHT_LEG]:{label:"右腿",maxHp:60}},E_=[{part:Tt.HEAD,threshold:.05},{part:Tt.TORSO,threshold:.55},{part:Tt.LEFT_ARM,threshold:.66},{part:Tt.RIGHT_ARM,threshold:.77},{part:Tt.LEFT_LEG,threshold:.88},{part:Tt.RIGHT_LEG,threshold:1}];class w_{constructor(){this._hp={},this._bleeding=!1,this._armorHp=0,this._armorMax=0,this._armorReduce=0,this._armorHeadOnly=!1,this.reset()}reset(){for(const[t,e]of Object.entries(sn))this._hp[t]=e.maxHp;this._bleeding=!1}get isAlive(){return this._hp[Tt.TORSO]>0&&this._hp[Tt.HEAD]>0}get isBleeding(){return this._bleeding}get legFractured(){return this._hp[Tt.LEFT_LEG]<=0||this._hp[Tt.RIGHT_LEG]<=0}get armFractured(){return this._hp[Tt.LEFT_ARM]<=0||this._hp[Tt.RIGHT_ARM]<=0}get armorPct(){return this._armorMax>0?this._armorHp/this._armorMax:-1}equipArmor(t){this._armorHp=t.armorHp,this._armorMax=t.armorHp,this._armorReduce=t.reduce,this._armorHeadOnly=t.headOnly??!1}get totalHp(){return Object.values(this._hp).reduce((t,e)=>t+e,0)}get totalMaxHp(){return Object.values(sn).reduce((t,e)=>t+e.maxHp,0)}get effectiveHpFraction(){const t=this.totalHp/this.totalMaxHp,e=this._hp[Tt.TORSO]/sn[Tt.TORSO].maxHp,n=this._hp[Tt.HEAD]/sn[Tt.HEAD].maxHp,i=Math.min(e,n);return Math.min(t,i)}get speedMultiplier(){let t=1;const e=this._hp[Tt.LEFT_LEG],n=this._hp[Tt.RIGHT_LEG],i=e/sn[Tt.LEFT_LEG].maxHp,r=n/sn[Tt.RIGHT_LEG].maxHp;return i<.5&&(t-=e<=0?.5:.2),r<.5&&(t-=n<=0?.5:.2),Math.max(.3,t)}get spreadMultiplier(){let t=1;const e=this._hp[Tt.LEFT_ARM]/sn[Tt.LEFT_ARM].maxHp,n=this._hp[Tt.RIGHT_ARM]/sn[Tt.RIGHT_ARM].maxHp;return e<.5&&(t+=.4),n<.5&&(t+=.4),t}getPartSnapshot(){return Object.entries(sn).map(([t,e])=>({key:t,label:e.label,hp:this._hp[t],maxHp:e.maxHp}))}takeDamage(t,e=null){const n=e??this._rollHitPart();if(this._armorHp>0&&(!this._armorHeadOnly||n===Tt.HEAD)){const i=t*this._armorReduce;this._armorHp=Math.max(0,this._armorHp-i),t=t-i}return this._hp[n]=Math.max(0,this._hp[n]-t),!this._bleeding&&Math.random()<.3&&(this._bleeding=!0),n}tickBleeding(t){if(!this._bleeding)return 0;const e=2*t,n=e*.5;this._hp[Tt.TORSO]=Math.max(0,this._hp[Tt.TORSO]-n);const r=[Tt.LEFT_ARM,Tt.RIGHT_ARM,Tt.LEFT_LEG,Tt.RIGHT_LEG].filter(o=>this._hp[o]>0);if(r.length>0){const o=e*.5/r.length;for(const a of r)this._hp[a]=Math.max(0,this._hp[a]-o)}else this._hp[Tt.TORSO]=Math.max(0,this._hp[Tt.TORSO]-e*.5);return e}stopBleeding(){this._bleeding=!1}heal(t){let e=t;const n=[Tt.TORSO,Tt.HEAD,Tt.LEFT_LEG,Tt.RIGHT_LEG,Tt.LEFT_ARM,Tt.RIGHT_ARM];for(const i of n){if(e<=0)break;const o=sn[i].maxHp-this._hp[i],a=Math.min(o,e);this._hp[i]+=a,e-=a}}_rollHitPart(){const t=Math.random();for(const{part:e,threshold:n}of E_)if(t<n)return e;return Tt.TORSO}}const Ll=[{key:"MOVE",text:"🦆 WASD 移动角色 — 探索地图"},{key:"AIM",text:"🎯 移动鼠标 瞄准方向"},{key:"SHOOT",text:"🔫 左键 射击 — 先动手者先生还"},{key:"LOOT",text:"📦 靠近物品，按 E 拾取战利品"},{key:"EXTRACT",text:"🚁 找到绿色撤离区，按住 E 撤离"}],ra="duckovTutorialDone";class T_{constructor(){this._step=0,this._done=!1,this._spawnPos=null,localStorage.getItem(ra)==="1"&&(this._done=!0)}get isActive(){return!this._done}get currentStep(){return this._step}get currentText(){var t;return this._done?null:((t=Ll[this._step])==null?void 0:t.text)??null}update(t){if(this._done)return null;switch(this._spawnPos||(this._spawnPos=t.playerPos.clone()),this._step){case 0:t.playerPos.distanceTo(this._spawnPos)>3&&this._advance();break;case 1:t.aimMoved&&this._advance();break;case 2:t.fired&&this._advance();break;case 3:t.looted&&this._advance();break;case 4:t.inExtract&&this._advance();break}return this.currentText}complete(){this._done=!0,localStorage.setItem(ra,"1")}reset(){this._done=!1,this._step=0,this._spawnPos=null,localStorage.removeItem(ra)}_advance(){this._step++,this._step>=Ll.length&&this.complete()}}class b_{constructor(){this._ctx=null,this._master=null,this._ready=!1,this._footTimer=0}init(){if(!this._ready)try{this._ctx=new(window.AudioContext||window.webkitAudioContext),this._master=this._ctx.createGain(),this._master.gain.value=.55,this._master.connect(this._ctx.destination),this._noiseBuf={.1:this._bakeNoise(.1),.2:this._bakeNoise(.2),.5:this._bakeNoise(.5)},this._clickBuf=this._bakeClick(),this._ready=!0}catch{}}resume(){this._ctx&&this._ctx.state==="suspended"&&this._ctx.resume()}playShot(t="rifle"){if(!this._ready)return;const e=this._ctx,n=e.currentTime,i={rifle:{cutoff:1800,vol:.7,decay:.18},pistol:{cutoff:2400,vol:.55,decay:.13},shotgun:{cutoff:900,vol:.95,decay:.32},vss:{cutoff:1200,vol:.4,decay:.25},mp5:{cutoff:2200,vol:.6,decay:.1}}[t]??{cutoff:1800,vol:.7,decay:.18},r=this._noiseSource(.5),o=e.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(i.cutoff*12,n),o.frequency.exponentialRampToValueAtTime(i.cutoff,n+i.decay);const a=e.createGain();a.gain.setValueAtTime(i.vol,n),a.gain.exponentialRampToValueAtTime(.001,n+i.decay*2.8),r.connect(o),o.connect(a),a.connect(this._master),r.start(n),r.stop(n+i.decay*3)}playReload(){this._ready&&(this._click(0,.28),this._click(.18,.22))}playFootstep(t=!1){if(!this._ready)return;const e=t?.28:.44,n=this._ctx.currentTime;if(n-this._footTimer<e)return;this._footTimer=n;const i=this._noiseSource(.1),r=this._ctx.createBiquadFilter();r.type="lowpass",r.frequency.value=300;const o=this._ctx.createGain();o.gain.setValueAtTime(t?.22:.16,n),o.gain.exponentialRampToValueAtTime(.001,n+.12),i.connect(r),r.connect(o),o.connect(this._master),i.start(n),i.stop(n+.15)}playHitMarker(){if(!this._ready)return;const t=this._ctx,e=t.currentTime,n=t.createOscillator();n.type="sine",n.frequency.value=1600;const i=t.createOscillator();i.type="sine",i.frequency.value=2200;const r=t.createGain();r.gain.setValueAtTime(.28,e),r.gain.exponentialRampToValueAtTime(.001,e+.1),n.connect(r),i.connect(r),r.connect(this._master),n.start(e),i.start(e),n.stop(e+.11),i.stop(e+.11)}playKillConfirm(){if(!this._ready)return;const t=this._ctx,e=t.currentTime,n=t.createOscillator();n.type="sine",n.frequency.value=1800;const i=t.createGain();i.gain.setValueAtTime(.22,e),i.gain.exponentialRampToValueAtTime(.001,e+.15),n.connect(i),i.connect(this._master),n.start(e),n.stop(e+.16);const r=t.createOscillator();r.type="sine",r.frequency.value=1200;const o=t.createGain();o.gain.setValueAtTime(.18,e+.08),o.gain.exponentialRampToValueAtTime(.001,e+.28),r.connect(o),o.connect(this._master),r.start(e+.08),r.stop(e+.3);const a=this._noiseSource(.2),l=t.createBiquadFilter();l.type="lowpass",l.frequency.value=200;const c=t.createGain();c.gain.setValueAtTime(.35,e),c.gain.exponentialRampToValueAtTime(.001,e+.2),a.connect(l),l.connect(c),c.connect(this._master),a.start(e),a.stop(e+.22)}playDamaged(){if(!this._ready)return;const t=this._ctx,e=t.currentTime,n=this._noiseSource(.2),i=t.createBiquadFilter();i.type="lowpass",i.frequency.setValueAtTime(600,e);const r=t.createGain();r.gain.setValueAtTime(.45,e),r.gain.exponentialRampToValueAtTime(.001,e+.22),n.connect(i),i.connect(r),r.connect(this._master),n.start(e),n.stop(e+.25)}playExtractBeep(){if(!this._ready)return;const t=this._ctx,e=t.currentTime,n=t.createOscillator();n.type="sine",n.frequency.value=880;const i=t.createGain();i.gain.setValueAtTime(.08,e),i.gain.exponentialRampToValueAtTime(.001,e+.14),n.connect(i),i.connect(this._master),n.start(e),n.stop(e+.15)}playDryFire(){this._ready&&this._click(0,.18)}playDoor(){if(!this._ready)return;const t=this._ctx,e=t.currentTime,n=this._noiseSource(.2),i=t.createBiquadFilter();i.type="bandpass",i.frequency.setValueAtTime(180,e),i.frequency.exponentialRampToValueAtTime(80,e+.25),i.Q.value=1.8;const r=t.createGain();r.gain.setValueAtTime(.5,e),r.gain.exponentialRampToValueAtTime(.001,e+.35),n.connect(i),i.connect(r),r.connect(this._master),n.start(e),n.stop(e+.38);const o=t.createOscillator();o.type="sawtooth",o.frequency.setValueAtTime(280+Math.random()*60,e+.02),o.frequency.exponentialRampToValueAtTime(160,e+.22);const a=t.createGain();a.gain.setValueAtTime(.08,e+.02),a.gain.exponentialRampToValueAtTime(.001,e+.22),o.connect(a),a.connect(this._master),o.start(e+.02),o.stop(e+.24)}playEliteAlert(){if(!this._ready)return;const t=this._ctx,e=t.currentTime;for(let n=0;n<2;n++){const i=t.createOscillator();i.type="square",i.frequency.setValueAtTime(400,e+n*.18),i.frequency.exponentialRampToValueAtTime(900,e+n*.18+.14);const r=t.createGain();r.gain.setValueAtTime(.12,e+n*.18),r.gain.exponentialRampToValueAtTime(.001,e+n*.18+.16),i.connect(r),r.connect(this._master),i.start(e+n*.18),i.stop(e+n*.18+.17)}}playDistantShot(){if(!this._ready)return;const t=this._ctx,e=t.currentTime,n=this._noiseSource(.5),i=t.createBiquadFilter();i.type="lowpass",i.frequency.setValueAtTime(400,e),i.frequency.exponentialRampToValueAtTime(80,e+.4);const r=t.createGain();r.gain.setValueAtTime(.1,e),r.gain.exponentialRampToValueAtTime(.001,e+.5),n.connect(i),i.connect(r),r.connect(this._master),n.start(e),n.stop(e+.55)}_bakeNoise(t){const e=this._ctx.sampleRate,n=this._ctx.createBuffer(1,Math.ceil(e*t),e),i=n.getChannelData(0);for(let r=0;r<i.length;r++)i[r]=Math.random()*2-1;return n}_noiseSource(t){var i;const e=((i=this._noiseBuf)==null?void 0:i[t])??this._bakeNoise(t),n=this._ctx.createBufferSource();return n.buffer=e,n}_bakeClick(){const t=this._ctx.sampleRate,e=Math.ceil(t*.05),n=this._ctx.createBuffer(1,e,t),i=n.getChannelData(0);for(let r=0;r<e;r++)i[r]=(Math.random()*2-1)*Math.pow(1-r/e,4);return n}_click(t=0,e=.25){const n=this._ctx,i=n.currentTime+t,r=n.createBufferSource();r.buffer=this._clickBuf;const o=n.createBiquadFilter();o.type="highpass",o.frequency.value=1800;const a=n.createGain();a.gain.value=e,r.connect(o),o.connect(a),a.connect(this._master),r.start(i)}}const A_=1.8,R_=Math.PI*2.2;class C_{constructor(t,e){this._scene=t,this._collidables=e,this._doors=[]}addDoor({cx:t,cz:e,gapW:n,h:i,color:r=9134144,name:o="Door"}){const a=new kt(n-.1,i,.14),l=new Xt({color:r}),c=new at(a,l);c.castShadow=!0,c.receiveShadow=!0,c.name=o;const h=t-n/2,f=new ti;f.position.set(h,i/2,e),c.position.set(n/2,0,0),f.add(c),this._scene.add(f);const p={mesh:c,pivot:f,pos:new x(t,0,e),isOpen:!1,hasCollision:!0,_curAngle:0,_targetAngle:0};return this._collidables.push(c),this._doors.push(p),p}update(t,e,n){for(const a of this._doors){if(Math.abs(a._curAngle-a._targetAngle)<.001)continue;const l=Math.sign(a._targetAngle-a._curAngle),c=R_*t;a._curAngle+=l*c,l>0?a._curAngle=Math.min(a._curAngle,a._targetAngle):a._curAngle=Math.max(a._curAngle,a._targetAngle),a.pivot.rotation.y=a._curAngle,a.isOpen&&a.hasCollision&&a._curAngle<=-(Math.PI/4)&&this._removeCollision(a),!a.isOpen&&!a.hasCollision&&Math.abs(a._curAngle)<.05&&this._addCollision(a)}let i=null,r=A_;for(const a of this._doors){const l=e.distanceTo(a.pos);l<r&&(r=l,i=a)}let o=!1;return n&&i&&(this._toggle(i),o=!0),{nearDoor:i,justToggled:o}}_toggle(t){t.isOpen=!t.isOpen,t._targetAngle=t.isOpen?-(Math.PI/2):0,!t.isOpen&&!t.hasCollision&&this._addCollision(t)}_removeCollision(t){if(!t.hasCollision)return;const e=this._collidables.indexOf(t.mesh);e!==-1&&this._collidables.splice(e,1),t.hasCollision=!1}_addCollision(t){t.hasCollision||(this._collidables.includes(t.mesh)||this._collidables.push(t.mesh),t.hasCollision=!0)}}class P_{constructor(t){if(this._inv=t,this._visible=!1,this._panel=document.getElementById("inventory-panel"),this._grid=document.getElementById("inventory-grid"),this._tooltip=document.getElementById("inv-tooltip"),this._dragItem=null,this._dragEl=null,this._dragOffsetX=0,this._dragOffsetY=0,this._CELL=46,this._onUseItem=null,this._onDropItem=null,!this._panel){console.warn("InventoryUI: #inventory-panel not found in DOM");return}this._setupGrid(),this._setupDragListeners(),this._grid.addEventListener("contextmenu",e=>{e.preventDefault(),this._onContextAction(e)}),this._grid.addEventListener("click",e=>{const n=e.target.closest(".inv-btn");if(!n)return;e.stopPropagation();const i=n.closest(".inv-item");if(!i)return;const r=Number(i.dataset.instanceId);n.dataset.action==="use"&&this._onUseItem?this._onUseItem(r):n.dataset.action==="drop"&&this._onDropItem&&this._onDropItem(r)})}onUse(t){this._onUseItem=t}onDrop(t){this._onDropItem=t}get isOpen(){return this._visible}toggle(){this._visible=!this._visible,this._panel.style.display=this._visible?"flex":"none",document.body.style.cursor=this._visible?"default":"none",this._visible&&this.refresh()}open(){this._visible=!0,this._panel.style.display="flex",document.body.style.cursor="default",this.refresh()}close(){this._visible=!1,this._panel.style.display="none",document.body.style.cursor="none"}refresh(){if(!this._grid)return;if(this._dragItem){if(this._dragEl&&(this._dragEl.remove(),this._dragEl=null),this._dragSourceEl){try{this._dragSourceEl.style.opacity="1"}catch{}this._dragSourceEl=null}this._dragItem=null,this._clearDropPreview()}const t=document.getElementById("inv-weight");if(t){const n=this._inv.totalWeight.toFixed(1);t.textContent=`${n} kg`,t.className=this._inv.totalWeight>35?"overloaded":this._inv.totalWeight>25?"heavy":""}this._grid.querySelectorAll(".inv-item").forEach(n=>n.remove());const e=new Set;for(const[,n]of this._inv.items){if(e.has(n.id))continue;e.add(n.id);const i=document.createElement("div");i.className="inv-item",i.dataset.instanceId=n.id,i.style.gridRow=`${n.row+1} / span ${n.def.h}`,i.style.gridColumn=`${n.col+1} / span ${n.def.w}`,i.style.background=n.def.color,i.style.cursor="grab";const r=n.def.heals?'<div class="inv-actions"><button class="inv-btn inv-btn-use" data-action="use" title="使用">✚</button><button class="inv-btn inv-btn-drop" data-action="drop" title="丢弃">✕</button></div>':'<div class="inv-actions"><button class="inv-btn inv-btn-drop" data-action="drop" title="丢弃">✕</button></div>';i.innerHTML=r+`<span class="inv-item-name">${n.def.name}</span>`+(n.def.stackable?`<span class="inv-item-count">×${n.count}</span>`:"")+(n.def.value?`<span class="inv-item-value">¥${n.def.value}</span>`:""),i.addEventListener("mouseenter",()=>{this._dragItem||this._tooltip&&(this._tooltip.textContent=n.def.name+(n.def.stackable?` ×${n.count}`:"")+(n.def.heals?`  +${n.def.heals}HP`:"")+`  ¥${n.def.value*(n.count||1)}`,this._tooltip.style.display="block")}),i.addEventListener("mouseleave",()=>{this._tooltip&&(this._tooltip.style.display="none")}),this._grid.appendChild(i)}}_setupGrid(){this._grid.style.display="grid",this._grid.style.gridTemplateColumns=`repeat(${this._inv.cols}, ${this._CELL}px)`,this._grid.style.gridTemplateRows=`repeat(${this._inv.rows}, ${this._CELL}px)`,this._grid.style.position="relative",this._grid.innerHTML="";for(let t=0;t<this._inv.rows;t++)for(let e=0;e<this._inv.cols;e++){const n=document.createElement("div");n.className="inv-cell",n.style.gridRow=`${t+1}`,n.style.gridColumn=`${e+1}`,n.dataset.row=t,n.dataset.col=e,this._grid.appendChild(n)}}_setupDragListeners(){this._grid.addEventListener("mousedown",t=>this._onDragStart(t)),document.addEventListener("mousemove",t=>this._onDragMove(t)),document.addEventListener("mouseup",t=>this._onDragEnd(t))}_onDragMove(t){!this._dragItem||!this._dragEl||(this._dragEl.style.left=`${t.clientX-this._dragOffsetX}px`,this._dragEl.style.top=`${t.clientY-this._dragOffsetY}px`,this._showDropPreview(t))}_onDragEnd(t){if(!this._dragItem)return;if(this._dragEl&&(this._dragEl.remove(),this._dragEl=null),this._clearDropPreview(),this._dragSourceEl){try{this._dragSourceEl.style.opacity="1"}catch{}this._dragSourceEl=null}const e=this._grid.getBoundingClientRect(),n=Math.floor((t.clientX-e.left)/this._CELL),i=Math.floor((t.clientY-e.top)/this._CELL),r=this._dragItem;if(this._dragItem=null,i<0||n<0||i>=this._inv.rows||n>=this._inv.cols)return;const o=this._inv.getItemAt(i,n);o!==null&&o!==r.id?this._inv.swapItems(r.id,o):this._inv.moveItem(r.id,i,n),this.refresh()}_showDropPreview(t){if(this._clearDropPreview(),!this._dragItem)return;const e=this._grid.getBoundingClientRect(),n=Math.floor((t.clientX-e.left)/this._CELL),i=Math.floor((t.clientY-e.top)/this._CELL),{w:r,h:o}=this._dragItem.def;for(let a=i;a<i+o;a++)for(let l=n;l<n+r;l++){const c=this._grid.querySelector(`.inv-cell[data-row="${a}"][data-col="${l}"]`);c&&c.classList.add("inv-drop-target")}}_clearDropPreview(){this._grid.querySelectorAll(".inv-drop-target").forEach(t=>{t.classList.remove("inv-drop-target")})}_onContextAction(t){const e=t.target.closest(".inv-item");if(!e)return;const n=Number(e.dataset.instanceId),i=this._inv.items.get(n);if(i){if(i.def.heals&&this._onUseItem){this._onUseItem(n);return}this._onDropItem&&this._onDropItem(n)}}_onDragStart(t){if(t.shiftKey){const e=t.target.closest(".inv-item");if(!e)return;t.preventDefault();const n=Number(e.dataset.instanceId);this._onDropItem&&this._onDropItem(n);return}this._startDrag(t)}_startDrag(t){if(t.target.closest(".inv-btn"))return;const e=t.target.closest(".inv-item");if(!e)return;t.preventDefault();const n=Number(e.dataset.instanceId),i=this._inv.items.get(n);if(!i)return;this._dragItem=i,e.style.opacity="0.3",this._dragSourceEl=e;const r=document.createElement("div");r.className="inv-item inv-drag-ghost",r.style.position="fixed",r.style.width=`${i.def.w*this._CELL}px`,r.style.height=`${i.def.h*this._CELL}px`,r.style.background=i.def.color,r.style.opacity="0.8",r.style.zIndex="9999",r.style.pointerEvents="none",r.style.border="2px solid #fff",r.style.boxSizing="border-box",r.innerHTML=`<span class="inv-item-name">${i.def.name}</span>`,document.body.appendChild(r),this._dragEl=r,this._dragOffsetX=i.def.w*this._CELL/2,this._dragOffsetY=i.def.h*this._CELL/2,r.style.left=`${t.clientX-this._dragOffsetX}px`,r.style.top=`${t.clientY-this._dragOffsetY}px`,this._showDropPreview(t),this._tooltip&&(this._tooltip.style.display="none")}}const L_=[{id:"assault",name:"突击手",subtitle:"AK-74 | 轻型防弹衣",description:"高伤害，射程远，配备轻甲（40%减伤）。积极进攻型。",weaponSlot:0,items:[{defId:"rifle_ammo",count:90},{defId:"bandage",count:2},{defId:"vest_light",count:1}]},{id:"medic",name:"医疗兵",subtitle:"格洛克17 | 无护甲",description:"携带急救包，机动灵活，持久战优势突出。谨慎搜刮型。",weaponSlot:1,items:[{defId:"pistol_ammo",count:51},{defId:"medkit",count:1},{defId:"bandage",count:3}]},{id:"shotgunner",name:"散弹手",subtitle:"MP-133 | 重型防弹衣",description:"近距离恐怖火力 + 重甲（60%减伤）。室内清场专用。",weaponSlot:2,items:[{defId:"shotgun_ammo",count:24},{defId:"painkillers",count:1},{defId:"bandage",count:2},{defId:"vest_heavy",count:1}]},{id:"sniper",name:"狙击手",subtitle:"VSS Vintorez | 无护甲",description:"超远射程（95m），单发高伤害（88）。远距离清场，精准压制。",weaponSlot:3,items:[{defId:"vss_ammo",count:30},{defId:"bandage",count:2},{defId:"painkillers",count:1}]},{id:"smg",name:"突击SMG",subtitle:"MP5 | 轻型防弹衣",description:"超高射速（800RPM），室内近战之王。快速压制，弹药充足。",weaponSlot:4,items:[{defId:"mp5_ammo",count:90},{defId:"bandage",count:2},{defId:"vest_light",count:1}]}];class I_{constructor(t){this._el=t,this._callback=null,this._build()}show(){this._el.style.display="flex"}hide(){this._el.style.display="none"}onSelect(t){this._callback=t}_build(){this._el.innerHTML="";const t=document.createElement("div");t.className="stash-header",t.innerHTML="<h2>选择装备包</h2><p>进入突袭前配置你的负重</p>",this._el.appendChild(t);const e=document.createElement("div");e.className="stash-grid";for(const n of L_){const i=document.createElement("div");i.className="stash-card",i.innerHTML=`
        <div class="stash-card-name">${n.name}</div>
        <div class="stash-card-sub">${n.subtitle}</div>
        <div class="stash-card-desc">${n.description}</div>
        <ul class="stash-card-items">
          ${n.items.map(r=>`<li>${r.defId.replaceAll("_"," ")} ×${r.count}</li>`).join("")}
        </ul>
        <button class="stash-select-btn">装备出发</button>
      `,i.querySelector(".stash-select-btn").addEventListener("click",()=>{this._callback&&this._callback(n)}),e.appendChild(i)}this._el.appendChild(e)}}const aa=76;class D_{constructor(t){this._canvas=t,this._ctx=t.getContext("2d"),this._size=t.width,this._scale=this._size/(aa*2)}update(t,e,n,i,r,o){const a=this._ctx,l=this._size;a.fillStyle="rgba(8, 8, 8, 0.88)",a.fillRect(0,0,l,l),a.strokeStyle="rgba(180, 160, 130, 0.35)",a.fillStyle="rgba(30, 25, 20, 0.50)",a.lineWidth=.5;for(const _ of r){const g=this._wx(_.minX),d=this._wz(_.minZ),u=(_.maxX-_.minX)*this._scale,w=(_.maxZ-_.minZ)*this._scale;a.fillRect(g,d,u,w),a.strokeRect(g,d,u,w)}for(const _ of i){const g=this._wx(_.center.x),d=this._wz(_.center.z);a.fillStyle=_.requiresKey?"#ffaa00":"#00ff80",a.strokeStyle=_.requiresKey?"#ffaa00":"#00ff80",a.lineWidth=1,a.beginPath(),a.moveTo(g,d-4),a.lineTo(g+3,d),a.lineTo(g,d+4),a.lineTo(g-3,d),a.closePath(),a.fill()}for(const _ of o){const g=this._wx(_.pos.x),d=this._wz(_.pos.z);a.fillStyle=_.opened?"#333":"#d4a017",a.fillRect(g-1.5,d-1.5,3,3)}for(const _ of n){if(!_.isAlive)continue;const g=this._wx(_.position.x),d=this._wz(_.position.z),u=_.state===Kt.COMBAT?2.5:_.state===Kt.SEARCH?2:1.5;a.fillStyle=_.state===Kt.COMBAT?"#ff3333":_.state===Kt.SEARCH?"#ffee44":_.state===Kt.ALERT?"#ffaa33":"rgba(160,60,60,0.6)",a.beginPath(),a.arc(g,d,u,0,Math.PI*2),a.fill()}const c=this._wx(t.x),h=this._wz(t.z),f=7,p=Math.sin(e)*f,m=Math.cos(e)*f;a.strokeStyle="#ffffff",a.lineWidth=1.5,a.beginPath(),a.moveTo(c,h),a.lineTo(c+p,h+m),a.stroke(),a.fillStyle="#ffffff",a.beginPath(),a.arc(c,h,3,0,Math.PI*2),a.fill(),a.strokeStyle="rgba(200,169,110,0.4)",a.lineWidth=1,a.strokeRect(.5,.5,l-1,l-1)}_wx(t){return(t+aa)*this._scale}_wz(t){return(t+aa)*this._scale}}const U_=document.getElementById("canvas-container"),Hi=new $m(U_),ni=new Hm,cn=new He(50,innerWidth/innerHeight,.1,300),Oa=new x(0,28,16);Hi.onResize((s,t)=>{cn.aspect=s/t,cn.updateProjectionMatrix()});const tn=new s_(ni),mt=new i_(ni),pe=new jm(Hi.domElement),me=new a_,An=new o_(ni),es=new v_(ni),ke=new M_,Oi=new y_(ni),Wt=new w_,Ma=new T_,vt=new r_,Ae=new b_,_c=new C_(ni,tn.collidables);for(const s of tn.doorSlots)_c.addDoor(s);const Ie=new P_(ke);Ie.onUse(s=>{const t=ke.items.get(s);if(!t||!t.def.heals||Le>0)return;if(Wt.effectiveHpFraction>=.99&&!Wt.isBleeding){vt.pushKillFeed("当前血量充足");return}const e=t.def;rs=Math.max(.1,e.id==="medkit"?3:e.id==="painkillers"?2.5:1.8),Le=rs,ns=e.heals,as=s,mt.isHealing=!0,vt.pushKillFeed(`使用 ${e.name}…`),Ie.close(),Ze&&(Ze.style.display="block")});Ie.onDrop(s=>{const t=ke.dropItem(s);t&&(vt.pushKillFeed(`丢弃: ${t.name}`),Ie.refresh())});const Sa=new I_(document.getElementById("stash-screen")),N_=new D_(document.getElementById("minimap-canvas")),F_=new bn(new x(0,1,0),0),Il=new On,Dl=new Rt;let gc=new x(0,0,-5),ya=!1;const Ul=new x;new x;new On;const Qi=new x,Ze=document.getElementById("crosshair"),O_={rifle:.22,pistol:.12,shotgun:.45,vss:.4,mp5:.1},B_={rifle:.25,pistol:.12,shotgun:.55,vss:.3,mp5:.15};Hi.domElement.addEventListener("mousemove",s=>{Ie.isOpen||(Dl.set(s.clientX/innerWidth*2-1,-(s.clientY/innerHeight)*2+1),Il.setFromCamera(Dl,cn),Il.ray.intersectPlane(F_,gc),ya=!0)});Hi.domElement.addEventListener("mousedown",s=>{s.button===0&&(pe.keys.Mouse0=!0)});Hi.domElement.addEventListener("mouseup",s=>{s.button===0&&(pe.keys.Mouse0=!1)});let Le=0,rs=0,ns=0,as=null,or=0,Ys=0,Ks=0,Cn=0,Pi=0,os=0,xc=0,lr=0;const ls={kill:50,eliteKill:200,loot:10,container:25,extract:500};let Ea=!1,wa=!1,$s=0,oa=18+Math.random()*15,is=0,Ta=0;function ba(s){Cn=Math.min(Cn+s,1.5)}function cr(s,t){lr+=s;const e=document.getElementById("xp-value");e&&(e.textContent=lr);const n=document.createElement("div");n.className="xp-popup",n.textContent=`+${s} XP`,n.style.left=`${innerWidth/2-30}px`,n.style.top=`${innerHeight/2-60}px`,document.body.appendChild(n),setTimeout(()=>n.remove(),1300)}function z_(){if(Ea=!1,Ie.isOpen||!pe.isDown("Mouse0"))return;if(!me.tryFire()){me.current.mag===0&&!me.current.isReloading&&Ae.playDryFire();return}Ea=!0,wa=!0,$s=1.5,or+=O_[me.current.def.id]??.15,ba(B_[me.current.def.id]??.2),Ae.playShot(me.current.def.id),Ze&&(Ze.classList.add("shoot"),setTimeout(()=>Ze.classList.remove("shoot"),80));const t=me.current.def,e=mt.mesh.rotation.y;Ul.set(mt.position.x+Math.sin(e)*.6,.5,mt.position.z+Math.cos(e)*.6);const n=Ul;An.spawnMuzzleFlash(n);const i=Wt.spreadMultiplier;for(let r=0;r<t.pellets;r++){const o=t.spread*i,a=new x(Math.sin(e)+(Math.random()-.5)*o,0,Math.cos(e)+(Math.random()-.5)*o).normalize(),l=es.checkPlayerHit(n,a,t.range);if(l){if(l.takeDamage(t.damage),An.spawnTracer(n,l.position,t.tracerColor),An.spawnHitEffect(l.position),Ae.playHitMarker(),Ze&&(Ze.classList.remove("shoot"),Ze.classList.add("hit"),setTimeout(()=>Ze.classList.remove("hit"),120)),!l.isAlive){Pi++;const c=l.isElite?"★精英鸭卒":"鸭卒",h=l.isElite?ls.eliteKill:ls.kill;vt.pushKillFeed(`击毙${c} [${Pi}]`),vt.setKillCount(Pi),cr(h),An.spawnKillEffect(l.position),Ae.playKillConfirm(),ba(l.isElite?.5:.3),is=l.isElite?.08:.05,Oi.dropLoot(l.position,H_(l.isElite))}}else{const h=new On(n,a,0,t.range).intersectObjects(tn.collidables,!1),f=h.length>0?h[0].point:n.clone().addScaledVector(a,t.range);An.spawnTracer(n,f,t.tracerColor),h.length>0&&An.spawnHitEffect(h[0].point)}}}function H_(s=!1){const t=[],e=Math.random();return s?(e<.25?t.push({defId:"medkit",count:1}):e<.45?t.push({defId:"vest_light",count:1}):e<.6?t.push({defId:"painkillers",count:1}):t.push({defId:"dogtag",count:1}),t.push({defId:"rifle_ammo",count:Math.ceil(Math.random()*20+15)}),t.push({defId:"cash",count:Math.ceil(Math.random()*600+300)})):(e<.15?t.push({defId:"medkit",count:1}):e<.3?t.push({defId:"bandage",count:1}):e<.6&&t.push({defId:"rifle_ammo",count:Math.ceil(Math.random()*20+5)}),t.push({defId:"cash",count:Math.ceil(Math.random()*300+50)})),t}const Ws=new On;function k_(s){for(const t of s){Ws.set(t.origin,t.dir),Ws.near=0,Ws.far=30;const e=Ws.intersectObjects(tn.collidables,!1),n=e.length>0&&e[0].object.name!=="Floor"?e[0].distance:30,i=t.origin.clone().addScaledVector(t.dir,n);An.spawnTracer(t.origin,i,16729156);const o=new x(mt.position.x-t.origin.x,0,mt.position.z-t.origin.z).dot(t.dir);if(o>0&&o<n){const a=t.origin.clone().addScaledVector(t.dir,o);a.y=0;const l=new x(mt.position.x,0,mt.position.z);if(a.distanceTo(l)<.65){const c=Wt.takeDamage(t.damage);mt.health=Wt.isAlive?Math.round(Wt.effectiveHpFraction*mt.maxHealth):0,mt.speedMultiplier=Wt.speedMultiplier,vt.showDamageFlash(),Ae.playDamaged(),ba(.6),vt.pushKillFeed(`中弹！(${G_(c)})`),Wt.isAlive||Ba()}}}}function G_(s){return{HEAD:"头部",TORSO:"躯干",LEFT_ARM:"左臂",RIGHT_ARM:"右臂",LEFT_LEG:"左腿",RIGHT_LEG:"右腿"}[s]??s}let hr=!1;function V_(s){const t=Oi.getNearbyItemName(mt.position);vt.setPickupHint(t?`[E] 拾取 ${t}`:null);const e=Oi.update(mt.position,pe.justPressed("KeyE"));if(e){if(e.defId==="__container__"){let n=[];for(const i of e.drops)if(ke.addItem(i.defId,i.count)){hr=!0;const o=ss[i.defId];o&&(os+=o.value*i.count,n.push(o.name))}n.length>0&&(Ae.playDryFire(),Ie.isOpen&&Ie.refresh(),vt.pushKillFeed(`开箱: ${n.join(" / ")}`),cr(ls.container))}else if(ke.addItem(e.defId,e.count)){hr=!0;const i=ss[e.defId];i&&(os+=i.value*e.count),i!=null&&i.armor?(Wt.equipArmor(i.armor),vt.pushKillFeed(`装备: ${i.name} (${Math.round(i.armor.reduce*100)}%减伤)`)):(vt.pushKillFeed(`拾取: ${(i==null?void 0:i.name)??e.defId}`),cr(ls.loot)),Ie.isOpen&&Ie.refresh(),Ae.playDryFire()}}}function W_(){if(Le>0&&pe.justPressed("KeyH")){Le=0,mt.isHealing=!1,vt.setHealChannel(-1),vt.pushKillFeed("治疗中断");return}if(!(Le>0)&&pe.justPressed("KeyH")){if(Wt.effectiveHpFraction>=.99&&!Wt.isBleeding){vt.pushKillFeed("当前血量充足");return}const s=ke.getBestHealingItem();if(!s){vt.pushKillFeed("背包里没有急救物品！");return}const{def:t,instanceId:e}=s;if(!ke.items.has(e))return;rs=Math.max(.1,t.id==="medkit"?3:t.id==="painkillers"?2.5:1.8),Le=rs,ns=t.heals,as=e,mt.isHealing=!0,vt.pushKillFeed(`使用 ${t.name}…`)}}function X_(s){const t=pe.justPressed("KeyF"),{nearDoor:e,justToggled:n}=_c.update(s,mt.position,t);n&&Ae.playDoor(),e&&!Oi.getNearbyItemName(mt.position)&&vt.setPickupHint(`[F] ${e.isOpen?"关门":"开门"}`)}let $n=0,Xs=0;const Nl=10;function q_(s){const t=vc();if(t){const e=t.requiresKey;if(e&&!Y_(e)){vt.setPickupHint(`需要 [${e}] 才能在此撤离`),$n=0,vt.setExtractProgress(0);return}pe.isDown("KeyE")&&!Fl()?($n+=s,Xs-=s,Xs<=0&&(Ae.playExtractBeep(),Xs=.5),vt.setExtractProgress($n/Nl),vt.setPickupHint(`撤离中… ${t.label}`),$n>=Nl&&Z_()):($n=0,Xs=0,vt.setExtractProgress(0),Fl()||vt.setPickupHint(`[E] 按住撤离 — ${t.label}`))}else $n=0,vt.setExtractProgress(0)}function vc(){for(const s of tn.extractionPoints){const t=mt.position.x-s.center.x,e=mt.position.z-s.center.z;if(Math.sqrt(t*t+e*e)<s.radius)return s}return null}function Y_(s){for(const t of ke.items.values())if(t.def.id===s)return!0;return!1}function Fl(){return Oi.getNearbyItemName(mt.position)!==null}function K_(){return Math.floor((performance.now()-xc)/1e3)}function $_(s){const t=Math.floor(s/60),e=s%60;return`${String(t).padStart(2,"0")}:${String(e).padStart(2,"0")}`}function Mc(s){Ma.complete(),yc.stop(),vt.hide();const t=document.getElementById("start-screen"),e=document.getElementById("raid-stats"),n=document.getElementById("start-controls"),i=K_();t.querySelector("h1").textContent=s?"✓ 撤离成功":"✕ 阵亡",t.querySelector("p").textContent=s?"你带着战利品活下来了！":"你的战利品已遗失在战场上",document.getElementById("start-btn").textContent="再次进入";const r=j_(s,Pi,os,i);e.innerHTML=`
    存活时间 &nbsp;<span>${$_(i)}</span>&nbsp;&nbsp;
    击杀数 &nbsp;<span>${Pi}</span>&nbsp;&nbsp;
    战利品价值 &nbsp;<span>${os} 鸭元</span>&nbsp;&nbsp;
    经验值 &nbsp;<span>${lr} XP</span><br>
    <span style="font-size:1.2rem;margin-top:.5rem;display:inline-block">${r}</span>
  `,e.style.display="block",n.style.display="none",t.style.display="flex"}function j_(s,t,e,n){if(!s)return"评级: F — 阵亡";let i=0;return i+=Math.min(t*10,60),i+=Math.min(e/50,30),i+=Math.min(n/60,10),i>=80?"评级: S — 完美突袭！":i>=60?"评级: A — 出色表现":i>=40?"评级: B — 稳扎稳打":i>=20?"评级: C — 勉强过关":"评级: D — 需要加强"}function Z_(){cr(ls.extract),Mc(!0)}function Ba(){Mc(!1)}Sa.onSelect(s=>{Ae.init(),Ae.resume(),me.applyLoadout(s.weaponSlot),ke.reset();for(const o of s.items){ke.addItem(o.defId,o.count);const a=ss[o.defId];a!=null&&a.armor&&Wt.equipArmor(a.armor)}const t=tn.playerSpawnPoints,e=t[Math.floor(Math.random()*t.length)];mt.position.copy(e),mt.position.y=0,Wt.reset(),mt.health=mt.maxHealth,mt.stamina=mt.maxStamina,mt.speedMultiplier=1,Pi=0,os=0,lr=0,xc=performance.now(),hr=!1,or=0,Ys=0,Ks=0,Cn=0,is=0,Ta=0,Le=0,as=null,$n=0;const n=document.getElementById("xp-value");n&&(n.textContent="0"),vt.setKillCount(0);const i=document.getElementById("start-controls");i&&(i.style.display="block");const r=document.getElementById("raid-stats");r&&(r.style.display="none"),cn.position.copy(e).add(Oa),cn.lookAt(e),vt.resetRaid(45*60),vt.onTimerExpire(()=>{vt.pushKillFeed("⚠ 时间耗尽！突袭失败"),Ba()}),Sa.hide(),document.getElementById("start-screen").style.display="none",vt.show(),vt.setHealth(mt.health,mt.maxHealth),vt.setBodyParts(Wt.getPartSnapshot()),vt.setWeapon(me.current.def.name,me.current.mag,me.current.reserve),Sc=!0,yc.start(),typeof window._showTipsTicker=="function"&&window._showTipsTicker()});const J_=document.getElementById("start-screen"),Q_=document.getElementById("start-btn");let Sc=!1;Q_.addEventListener("click",()=>{J_.style.display="none",Sa.show()});const yc=new Zm(s=>{if(Sc)try{if(is>0){is-=s,pe.endFrame();return}pe.justPressed("Tab")&&(Ie.toggle(),Ze&&(Ze.style.display=Ie.isOpen?"none":"block")),Ie.isOpen||(mt.update(s,pe,gc,tn.collidables),(pe.isDown("KeyW")||pe.isDown("KeyS")||pe.isDown("KeyA")||pe.isDown("KeyD"))&&Ae.playFootstep(mt._isSprinting));const t=me.current.isReloading;me.update(s,pe),!t&&me.current.isReloading&&Ae.playReload(),z_(),An.update(s),$s=Math.max(0,$s-s),wa=$s>0;const e=es.update(s,mt.position,tn.collidables,wa);if(k_(e.shots),e.eliteAlerted&&(Ae.playEliteAlert(),vt.pushKillFeed("⚠ 精英鸭卒发现你！")),es.waveCount>Ta&&(Ta=es.waveCount,vt.pushKillFeed("⚠ 新一波鸭卒增援到达！"),Ae.playEliteAlert()),V_(s),Le>0){if(Le=Math.max(0,Le-s),vt.setHealChannel(Math.max(0,Math.min(1,1-Le/rs))),pe.isDown("Mouse0"))Le=0,mt.isHealing=!1,vt.setHealChannel(-1),vt.pushKillFeed("治疗中断");else if(Le<=0){ke.items.has(as)&&ke.useHealing(as),Wt.heal(ns);const r=Wt.isBleeding;Wt.stopBleeding(),mt.health=Wt.isAlive?Math.round(Wt.effectiveHpFraction*mt.maxHealth):0,mt.speedMultiplier=Wt.speedMultiplier,mt.isHealing=!1,vt.setHealChannel(-1),Ie.isOpen&&Ie.refresh(),vt.pushKillFeed(r?`治疗完成 +${ns}HP (已止血)`:`治疗完成 +${ns}HP`)}}mt.isHealing&&Le<=0&&(mt.isHealing=!1,vt.setHealChannel(-1)),W_(),X_(s),Wt.legFractured&&mt._isSprinting&&(mt._isSprinting=!1);const n=ke.totalWeight;let i=1;if(n>35?i=.7:n>25&&(i=.85),mt.speedMultiplier=Wt.speedMultiplier*i,q_(s),oa-=s,oa<=0&&(Ae.playDistantShot(),oa=20+Math.random()*25),Ma.isActive){const r=Ma.update({playerPos:mt.position,aimMoved:ya,fired:Ea,looted:hr,inExtract:vc()!==null});vt.setTutorialHint(r),ya=!1}Wt.isBleeding&&Wt.isAlive&&(Wt.tickBleeding(s),mt.health=Wt.isAlive?Math.round(Wt.effectiveHpFraction*mt.maxHealth):0,mt.speedMultiplier=Wt.speedMultiplier,Wt.isAlive||Ba()),or*=Math.pow(.82,s*60),Cn>.01?(Ys=(Math.random()-.5)*Cn*.8,Ks=(Math.random()-.5)*Cn*.8,Cn*=Math.pow(.85,s*60)):(Ys=0,Ks=0,Cn=0),tn.updateRoofs(mt.position),N_.update(mt.position,mt.facingAngle,es.enemies,tn.extractionPoints,tn.buildingOutlines,Oi.containers),Qi.copy(mt.position).add(Oa),Qi.x+=Ys,Qi.y+=or,Qi.z+=Ks,cn.position.lerp(Qi,.12),cn.lookAt(mt.position),vt.update(s),vt.setHealth(mt.health,mt.maxHealth),vt.setStamina(mt.stamina,mt.maxStamina),vt.setArmor(Wt.armorPct),vt.setBleedingState(Wt.isBleeding),vt.setBodyParts(Wt.getPartSnapshot()),vt.setWeapon(me.current.def.name,me.current.isReloading?-1:me.current.mag,me.current.reserve),vt.setActiveWeaponSlot(me.activeSlot),vt.setFractureState(Wt.legFractured,Wt.armFractured),pe.endFrame()}catch(t){console.error("Game loop error:",t),mt.isHealing=!1,Le=0,is=0,vt.setHealChannel(-1),pe.endFrame()}},()=>Hi.render(ni,cn));cn.position.copy(mt.position).add(Oa);cn.lookAt(mt.position);
