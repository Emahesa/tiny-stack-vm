import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';import{join}from'node:path';
let B=[(a,b)=>a+b|0,(a,b)=>a-b|0,(a,b)=>Math.imul(a,b),(a,b)=>{if(!b)throw 4;return a==-2147483648&&b==-1?a:a/b|0},(a,b)=>{if(!b)throw 4;return b==-1?0:a%b|0},(a,b)=>{if(!b)throw 4;return Math.floor((a>>>0)/(b>>>0))|0},(a,b)=>{if(!b)throw 4;return(a>>>0)%(b>>>0)|0},0,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,0,(a,b)=>a<<(b&31),(a,b)=>a>>(b&31),(a,b)=>a>>>(b&31)|0,0,(a,b)=>a==b?1:0,(a,b)=>a<b?1:0,(a,b)=>(a>>>0)<(b>>>0)?1:0];
function run(p,d){let s=new Int32Array(256),c=new Int32Array(64),m=new Int32Array(256),o=new Uint8Array(65536),S=0,C=0,O=0,I=0,P=0,T=0,n=p.length,F=x=>[o.slice(0,O),x],pop=()=>{if(!S)throw 2;return s[--S]},push=v=>{if(S>255)throw 3;s[S++]=v};
try{for(;;){if(T==1e6)return F(10);if(P<0||P>=n)return F(9);let op=p[P];
if(!(op<8||op>15&&op<31||op>31&&op<35||op>47&&op<53||op==64||op==65||op>79&&op<84))return F(5);
let im=op==1?1:op==2?4:op>47&&op<52?2:0;if(P+im>=n)return F(9);T++;let nx=P+1+im;P=nx;
if(op>15&&op<35&&op!=23&&op!=27){let b=pop(),a=pop();push(B[op-16](a,b));continue}
switch(op){
case 0:return F(0);
case 1:push(p[nx-1]<<24>>24);break;
case 2:push(p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24);break;
case 3:pop();break;
case 4:{let a=pop();push(a);push(a);break}
case 5:{let b=pop(),a=pop();push(b);push(a);break}
case 6:{let b=pop(),a=pop();push(a);push(b);push(a);break}
case 7:{let z=pop(),b=pop(),a=pop();push(b);push(z);push(a);break}
case 23:push(-pop()|0);break;
case 27:push(~pop());break;
case 48:case 49:case 50:{let rel=(p[nx-2]|p[nx-1]<<8)<<16>>16,t=op==48;if(!t){let v=pop();t=op==49?v==0:v!=0}if(t)P=nx+rel;break}
case 51:if(C>63)throw 7;c[C++]=nx;P=p[nx-2]|p[nx-1]<<8;break;
case 52:if(!C)throw 8;P=c[--C];break;
case 64:{let a=pop();if(a<0||a>255)throw 6;push(m[a]);break}
case 65:{let a=pop(),v=pop();if(a<0||a>255)throw 6;m[a]=v;break}
case 80:{let t=String(pop());if(O+t.length>65536)throw 11;for(let ch of t)o[O++]=ch.charCodeAt(0);break}
case 81:{let v=pop();if(O>65535)throw 11;o[O++]=v&255;break}
case 82:push(I<d.length?d[I++]:-1);break;
case 83:return F(pop()&255);
}}}catch(e){return F(e)}}
let I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(let id of readdirSync(I).sort()){let[by,co]=run(readFileSync(join(I,id,'program.bin')),readFileSync(join(I,id,'input.bin')));mkdirSync(join(O,id),{recursive:true});writeFileSync(join(O,id,'stdout.bin'),by);writeFileSync(join(O,id,'exit.txt'),co+'\n')}
