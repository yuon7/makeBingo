(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return a(1155)}])},1155:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return _}});var n=a(5893),o=a(3707),i=a(1120),l=a.n(i),s=a(7294),r=a(8150);let c={control:e=>({...e,backgroundColor:"white",borderColor:"#ccc",boxShadow:"none",":hover":{borderColor:"lightgray"},borderRadius:20,padding:4}),option:(e,t)=>{let{isFocused:a,isSelected:n}=t;return{...e,backgroundColor:n?"lightgray":a?"white":void 0,":active":{backgroundColor:n?"lightgray":void 0},borderRadius:10}},menu:e=>({...e,borderRadius:10,boxShadow:"0 4px 10px rgba(0,0,0,0.1)",width:"300%",menuHeight:"200%"}),menuList:e=>({...e,padding:0}),singleValue:e=>({...e,color:"black",maxHeight:"180px"}),placeholder:e=>({...e,color:"lightgray"})};var d=a(2729),u=a.n(d),_=()=>{let[e,t]=(0,s.useState)([[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]),[a,i]=(0,s.useState)([]),[d,_]=(0,s.useState)("all"),[h,m]=(0,s.useState)(!1),[g,p]=(0,s.useState)([[!1,!1,!1],[!1,!1,!1],[!1,!1,!1]]),b={all:"All",vocaloid:"VIRTUAL SINGER",light_music_club:"Leo/need",idol:"MORE MORE JUMP!",street:"Vivid BAD SQUAD",theme_park:"ワンダーランズ\xd7ショウタイム",school_refusal:"25時、ナイトコードで。"},f=["all","vocaloid","light_music_club","idol","street","theme_park","school_refusal"].map(e=>({value:e,label:b[e]})),x=(0,s.useRef)(null);(0,s.useEffect)(()=>{let e=async()=>{let e=await fetch("https://sekai-world.github.io/sekai-master-db-diff/musics.json"),t=await e.json(),a=await fetch("https://sekai-world.github.io/sekai-master-db-diff/musicTags.json"),n=await a.json(),o=t.map(e=>({...e,unitNames:n.filter(t=>t.musicId===e.id).map(e=>e.musicTag)}));i(o)};e()},[]);let k=()=>a.filter(e=>"all"===d||e.unitNames.includes(d)).map(e=>e.id),w=()=>{p([[!0,!0,!0],[!0,!0,!0],[!0,!0,!0]])},N=async()=>{m(!0),w();let a=k();if(a.length>0){let n=e.map(e=>e.map(()=>a[Math.floor(Math.random()*a.length)]));t(n),n.forEach((e,t)=>{e.forEach((e,a)=>{setTimeout(()=>{p(e=>{let n=[...e];return n[t]=[...n[t]],n[t][a]=!1,n})},(t*n.length+a)*500)})})}m(!1)},v=e=>{if(-1===e)return"https://storage.sekai.best/sekai-assets/stamp/stamp0032_rip/stamp0032/stamp0032.png";let t=e.toString().padStart(3,"0");return"https://storage.sekai.best/sekai-assets/music/jacket/jacket_s_".concat(t,"_rip/jacket_s_").concat(t,".webp")},j=(e,a,n)=>{p(t=>{let n=[...t];return n[e]=[...n[e]],n[e][a]=!0,n});let o=n[Math.floor(Math.random()*n.length)];t(t=>{let n=[...t];return n[e]=[...n[e]],n[e][a]=o,n}),setTimeout(()=>{p(t=>{let n=[...t];return n[e]=[...n[e]],n[e][a]=!1,n})},500)};return(0,n.jsxs)("div",{className:u().container,children:[(0,n.jsx)(r.ZP,{styles:c,options:f,value:f.find(e=>e.value===d)||null,onChange:e=>{null!==e&&_(e.value)},isMulti:!1}),(0,n.jsx)("div",{className:u().board,ref:x,children:e.map((e,t)=>(0,n.jsx)("div",{className:u().row,children:e.map((e,a)=>(0,n.jsx)("div",{className:"".concat(u().cell," ").concat(g[t][a]?u().loading:""),children:!g[t][a]&&(0,n.jsx)("img",{src:v(e),alt:"".concat(e),onError:()=>j(t,a,k())})},a))},t))}),(0,n.jsxs)("div",{className:u().buttonContainer,children:[(0,n.jsx)("button",{className:u().buttonNeon,onClick:N,disabled:h,children:(0,n.jsx)(o.Z,{fontSize:"large"})}),(0,n.jsx)("button",{className:u().buttonNeon,onClick:()=>{setTimeout(()=>{x.current&&l()(x.current,{useCORS:!0}).then(e=>{let t=document.createElement("a");t.href=e.toDataURL("image/png"),t.download="bingo.png",t.click()})},500)},disabled:h,children:"ダウンロード！"})]})]})}},2729:function(e){e.exports={container:"index_container___q52_",board:"index_board__dNO5V",cell:"index_cell__E8qMc",loading:"index_loading__SZPjG","spin-3d":"index_spin-3d__TgS9I",buttonContainer:"index_buttonContainer__U23SP",buttonNeon:"index_buttonNeon__SJWvf",row:"index_row__UqwCN"}}},function(e){e.O(0,[443,371,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);