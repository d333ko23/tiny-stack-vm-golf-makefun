import{mkdirSync as A,readdirSync as R,readFileSync as F,statSync as S,writeFileSync as W}from"node:fs";
const K=new Uint8Array(256),E=new TextEncoder,B=[(x,y)=>x+y|0,(x,y)=>x-y|0,Math.imul,(x,y)=>x==-2147483648&&y==-1?x:x/y|0,(x,y)=>y==-1?0:x%y|0,(x,y)=>(x>>>0)/(y>>>0)|0,(x,y)=>(x>>>0)%(y>>>0)|0,0,(x,y)=>x&y,(x,y)=>x|y,(x,y)=>x^y,0,(x,y)=>x<<y,(x,y)=>x>>y,(x,y)=>x>>>y|0,0,(x,y)=>+(x==y),(x,y)=>+(x<y),(x,y)=>+((x>>>0)<(y>>>0))];
for(let o=0;o<84;o++)K[o]='"CF*jr\x92\x9a!!!!!!!!RRRRRRRJRRRJRRR!RRR!!!!!!!!!!!!!$,,$"!!!!!!!!!!!J2!!!!!!!!!!!!!!**B*'.charCodeAt(o)-33;
function run(p,q){
const n=p.length,D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),U=new Uint8Array(65536);
let s=0,c=0,l=0,i=0,j=0,k=0,v=0,w=0;
const e=x=>({out:U.slice(0,l),code:x});
for(;;){
if(k==1e6)return e(10);
if(j<0||j>=n)return e(9);
const y=p[j],t=K[y]+127;
if(t<128)return e(5);
const m=t&7,g=t>>3&3,h=t>>5&3;
if(j+m>=n)return e(9);
k++;
const x=j+1+m;
if(s<g)return e(2);
if(s-g+h>256)return e(3);
j=x;
switch(y){
case 0:return e(0);
case 1:D[s++]=p[x-1]<<24>>24;break;
case 2:D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:v=D[s-1];D[s-1]=D[s-2];D[s-2]=v;break;
case 6:D[s++]=D[s-3];break;
case 7:v=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=v;break;
case 23:D[s-1]=-D[s-1];break;
case 27:D[s-1]=~D[s-1];break;
case 48:case 49:case 50:if(y==48||(y==49)==(D[--s]==0))j=x+((p[x-2]|p[x-1]<<8)<<16>>16);break;
case 51:if(c==64)return e(7);C[c++]=x;j=p[x-2]|p[x-1]<<8;break;
case 52:if(!c)return e(8);j=C[--c];break;
case 64:if((v=D[s-1])<0||v>255)return e(6);D[s-1]=M[v];break;
case 65:if((v=D[s-1])<0||v>255)return e(6);s-=2;M[v]=D[s];break;
case 80:w=E.encode(D[s-1]+"");if(l+w.length>65536)return e(11);s--;U.set(w,l);l+=w.length;break;
case 81:if(l+1>65536)return e(11);U[l++]=D[--s]&255;break;
case 82:D[s++]=i<q.length?q[i++]:-1;break;
case 83:return e(D[--s]&255);
default:{const b=D[s-1],a=D[s-2];if(y>18&&y<23&&!b)return e(4);s-=2;D[s++]=B[y-16](a,b);break;}
}}}
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
for(const d of R(I).sort()){
const f=I+"/"+d;
let o=new Uint8Array(0),c=0;
try{if(S(f).isDirectory()){const r=run(new Uint8Array(F(f+"/program.bin")),new Uint8Array(F(f+"/input.bin")));o=r.out;c=r.code}}catch{}
A(O+"/"+d,{recursive:!0});
W(O+"/"+d+"/stdout.bin",o);
W(O+"/"+d+"/exit.txt",c+"\n");
}
