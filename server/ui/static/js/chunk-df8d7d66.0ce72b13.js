(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-df8d7d66"],{"186c":function(t,e,s){t.exports=s.p+"static/img/22.d0f31f55.jpg"},1965:function(t,e,s){t.exports=s.p+"static/img/5.d5d232c8.jpg"},"1f0f":function(t,e,s){t.exports=s.p+"static/img/39.a74fb47d.jpg"},2197:function(t,e,s){t.exports=s.p+"static/img/28.cc6d5307.jpg"},2985:function(t,e,s){t.exports=s.p+"static/img/34.61bc6bc0.jpg"},"302a":function(t,e,s){t.exports=s.p+"static/img/31.f1b961e3.jpg"},3680:function(t,e,s){t.exports=s.p+"static/img/19.3ab1b7bd.jpg"},"39c6":function(t,e,s){t.exports=s.p+"static/img/10.dcfa41ff.jpg"},"3d27":function(t,e,s){t.exports=s.p+"static/img/7.3bbaa71f.jpg"},"42c9":function(t,e,s){t.exports=s.p+"static/img/8.05eb4656.jpg"},"42ff":function(t,e,s){t.exports=s.p+"static/img/14.f51e5d4c.jpg"},"44b7":function(t,e,s){t.exports=s.p+"static/img/40.162acf61.jpg"},"52f0":function(t,e,s){t.exports=s.p+"static/img/1.d0b86e96.jpg"},5505:function(t,e,s){t.exports=s.p+"static/img/36.1aafee76.jpg"},"5da7":function(t,e,s){t.exports=s.p+"static/img/25.626cc243.jpg"},"63ec":function(t,e,s){t.exports=s.p+"static/img/20.87f25a9e.jpg"},"68dd":function(t,e,s){t.exports=s.p+"static/img/9.844c7e6b.jpg"},6929:function(t,e,s){t.exports=s.p+"static/img/26.1e25a526.jpg"},"6c1e":function(t,e,s){t.exports=s.p+"static/img/16.ef35178f.jpg"},"6c4f":function(t,e,s){},"6d6d":function(t,e,s){t.exports=s.p+"static/img/37.6bb8ab05.jpg"},"6f29":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"chat-container",style:t.chatTransition,attrs:{id:"chat"}},[e("div",{staticClass:"chat-box"},[e("div",{staticClass:"chat-cover"}),e("div",{staticClass:"chat-title"},[e("div",{staticClass:"chat-title-logo",on:{click:t.backPage}},[e("img",{attrs:{src:s("cf05"),alt:""}})]),e("div",{staticClass:"chat-title-room"},[t._v("房间号:"+t._s(t.room))])]),e("div",{ref:"record",staticClass:"chat-content"},t._l(t.chatList,(function(s){return e("div",{key:s.id,class:s.identity},[e("div",{staticClass:"avatar"},[e("img",{attrs:{src:s.avatar,alt:"",srcset:"",width:"60px",height:"60px"}})]),e("div",{staticClass:"aChat",staticStyle:{"white-space":"pre-wrap"}},[t._v(" "+t._s(s.content)+" ")])])})),0),e("div",{staticClass:"chat-footer"},[e("div",{staticClass:"send"},[e("button",{staticClass:"send-btn",class:t.sendMessage&&t.connect?"":"send-btn-disabled",on:{click:t.SendMessage}},[t._v("发送")])]),e("div",[e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.sendMessage,expression:"sendMessage"}],staticClass:"respond",attrs:{rows:"3.5",disabled:!t.connect},domProps:{value:t.sendMessage},on:{keyup:t.onKeyUp,input:function(e){e.target.composing||(t.sendMessage=e.target.value)}}})])])])])},i=[],o=(s("14d9"),s("936d")),a={name:"chat",data(){return{chatList:[],avatar:"",HLrtc:"",sendMessage:"",connect:!1,chatTransition:"",closeWindow:!1,selectValue:"",Type:"",room:"",backFlag:!1,socketIdList:[],typeOptions:{single:1,group:2,video:3,screen:4}}},created(){this.selectValue=this.$route.params.selectValue,this.Type=this.$route.params.Type,"join"==this.$route.params.selectValue&&(this.room=this.$route.query.room)},mounted(){let t=Math.floor(41*Math.random()+1);this.avatar=s("96cd")(`./${t}.jpg`);let e=()=>{alert(123),this.HLrtc&&(this.HLrtc.closeAllConnections(),this.HLrtc=null),window.removeEventListener("beforeunload",e,!1)};window.addEventListener("beforeunload",e,!1),this.init()},updated(){this.$nextTick(()=>{this.$refs.record.scrollTop=this.$refs.record.scrollHeight})},methods:{backPage(){this.$router.go(-1)},init(){let t="localhost:7880";t=window.location.host,this.HLrtc=new o["a"]({method:this.selectValue,room:this.room,server:`wss://${t}/rtc`,type:this.typeOptions[this.Type]}),this.HLrtc.on("getRoom",t=>{this.room=t}),this.HLrtc.connect(),this.DataChannelOnOpen(),this.DataChannelOnMessage(),this.DataChannelOnClose(),this.DataChannelOnError()},DataChannelOnOpen(){this.HLrtc.on("open",t=>{this.connect=!0,this.socketIdList.push(t)})},DataChannelOnMessage(){this.HLrtc.on("message",t=>{let e=JSON.parse(t);console.log(e),this.chatList.push({content:e.content,time:(new Date).getTime(),type:"text",identity:"other",id:this.chatList.length,avatar:e.avatar})})},DataChannelOnClose(){this.HLrtc.on("close",t=>{console.log("断开连接"),this.socketIdList.splice(this.socketIdList.indexOf(t),1),this.connect=!1})},DataChannelOnError(){this.HLrtc.on("error",t=>{console.log(t),this.connect=!1}),this.HLrtc.on("socket_error",t=>{this.$message.error(t.errMsg)})},SendMessage(){if(""==this.sendMessage)return;if(!this.HLrtc||!this.connect)return void alert("连接失败,无法发送消息");let t=this.sendMessage.replace(/^\s+|\s+$/g,"");for(const e of this.socketIdList)this.HLrtc.SendMessage(JSON.stringify({content:t,avatar:this.avatar}),"text",e);this.chatList.push({content:t,time:(new Date).getTime(),type:"text",identity:"self",id:this.chatList.length,avatar:this.avatar}),this.sendMessage=""},onKeyUp(t){t.ctrlKey&&13==t.keyCode&&this.SendMessage()}},destroyed(){this.HLrtc&&(this.HLrtc.closeAllConnections(),this.HLrtc=null)}},c=a,r=(s("d8c0"),s("2877")),p=Object(r["a"])(c,n,i,!1,null,"fc73b540",null);e["default"]=p.exports},"76ff":function(t,e,s){t.exports=s.p+"static/img/17.0e0f0965.jpg"},"779e":function(t,e){t.exports="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAA8ADwDASIAAhEBAxEB/8QAHAABAAICAwEAAAAAAAAAAAAAAAUGBAcBAggD/8QALBAAAQMDAwIEBgMAAAAAAAAAAQIDBAAFEQYSIRMxFEFRYSIjMnGBkQdCof/EABgBAQEBAQEAAAAAAAAAAAAAAAADAQIE/8QAGhEBAQADAQEAAAAAAAAAAAAAAAECESEDEv/aAAwDAQACEQMRAD8A3/SlKBSldHXmmAkuuJQFKCE7jjKicAD3NB3pUa/qCzRn+g/doLTucbFyEg5+2akUqStIUkgpIyCDwaDmlKUClKUCtIa61U9e70Y8ZxxuDDWpLexZHUWOCs8/cD2z61uiat1uDIWwnc8ltRQPVQBx/tedLFY7nqRxMeDjqIZ6zzznCEkpOAo+qlcfs+Vc5Kecm91iAADAAx6YqZsWqrppuS29FfccioPzIi1ktrT5gD+p9CPzkVj3DTl/s5Kp1qf6CQN0hob0D745Hp7faoppx3G51lSEDYFLI+EFWcfg4/fFTm4tdXlenY77cqM1IaO5t1AWg+oIyK+lV3Qjb7Wh7QmQVFfhwobu4SSSkfhJAqxVZ5SlKUA1qFnTyrRBuMR+3Eh9pahHlBTjKpDYwheUjdsVuPAOBx2rb1YlyjRpMNfil9NtsFzqhW0t4H1A+XGfbHfijZdKZanb2q0RVrBQ4iOx4hlsLCVrC/jS0XCCPg9OM8VBohTJPi40yCypx26FcdKIpZS4g5KEuAn5igobjnPCTk1w/wDyRaRNcYbnxpEdlPypMi2rVvVn+uwjjgc4Tnyqe0Xqiw6iuCV+MdXeQ2VBiQ10wgcbumBwfLJyVY78U+Mp2x19YrXYID1sscaI+pBdQCVBv6U5UTtT7DOB7CpKlKOClKUCqx/IKXndFT47Db61v7GSlhBUrYpaQvgAn6d1WesS5W9m6QlxX1vJbX3LThQr9jmk4PPEfTqdgD9rn9XHO6O6M89+wqR09Z5Vu1lbJrFsntoaktgFMdzBSQoOdxz8JNbkd0sw6STcrsnghPTmKRtGc4GMf7XeVpqHMeQ689KKm5QloIdxtWBgAegAz+6rl75WaZMcZepodhSlKk1//9k="},"80f2":function(t,e,s){t.exports=s.p+"static/img/3.a46a6688.jpg"},"936d":function(t,e,s){"use strict";s.d(e,"a",(function(){return m}));let n=window.mozRTCSessionDescription||window.RTCSessionDescription;function i(t,e){let{sendEventName:s,socketId:n,room:i}=t;return t=>{e.setLocalDescription(t),this.socket.send(JSON.stringify({eventName:s,data:{sdp:t,socketId:n,room:i}}))}}function o(t){console.log(t)}function a(t){let e=this.peerConnections[t.socketId].pc;e.createOffer(this.pcCreateCbGen(t,e),this.pcCreateErrorCb)}function c(t){r(t)}function r(t){let{sdp:e,socketId:s}=t,i=this.peerConnections[s].pc;i.setRemoteDescription(new n(e)),i.createAnswer(this.pcCreateCbGen(t,i),this.pcCreateErrorCb)}function p(t,e){this.peerConnections[e].pc.setRemoteDescription(new n(t))}function d(t,e,s){let n=t.createDataChannel(e);return n.onopen=()=>{this.emit("open",s)},n.onclose=t=>{n=null,this.emit("close",s)},n.onmessage=t=>{this.emit("message",t.data)},n.onerror=t=>{this.emit("error",t)},n}s("14d9");function A(){this.events={}}const g=new A;A.prototype.on=function(t,e){this.events[t]=this.events[t]||[],this.events[t].push(e)},A.prototype.emit=function(t){var e,s,n=this.events[t],i=Array.prototype.slice.call(arguments,1);if(n)for(e=0,s=n.length;e<s;e++)n[e].apply(null,i)};let l=window.PeerConnection||window.webkitPeerConnection00||window.webkitRTCPeerConnection||window.mozRTCPeerConnection,h=window.mozRTCIceCandidate||window.RTCIceCandidate;const f={iceServers:[{url:"turn:42.192.40.58:3478?transport=udp",username:"ddssingsong",credential:"123456"},{url:"turn:42.192.40.58:3478?transport=tcp",username:"ddssingsong",credential:"123456"}]},m=function(t){const e={server:"ws://192.168.6.28:7880/single",room:"123456",type:1,method:"create",audio:!0,video:!0},s={1:"single",2:"group",4:"video",3:"screenshare"};var n={...e,...t};this.socket="",this.room="",this.peerConnections=[],this.localStream="",this.initPC=t=>{let e,s=new l(f);s.onicecandidate=e=>{e.candidate&&this.socket.send(JSON.stringify({eventName:"_ice_candidate",data:{id:e.candidate.sdpMid,label:e.candidate.sdpMLineIndex,sdpMLineIndex:e.candidate.sdpMLineIndex,candidate:e.candidate.candidate,socketId:t,room:this.room}}))},s.ondatachannel=e=>{let s=e.channel;"create"===n.method?(s.onopen=()=>{console.log(123123),this.emit("open",t)},s.onclose=e=>{this.peerConnections[t].channel=null,this.emit("close",t)},s.onmessage=t=>{this.emit("message",t.data)},s.onerror=t=>{this.emit("error",t)},this.peerConnections[t].channel=s):this.peerConnections[t].channel=s},s.onaddstream=t=>{let e=t.stream;this.emit("streamAdded",e)},s.onicecandidateerror=function(t){console.log(t)},this.localStream&&s.addStream(this.localStream),1!=n.type&&2!=n.type||"join"!==n.method||(e=this.initDataChannel(s,this.room,t)),this.peerConnections[t]={pc:s,channel:e}},this.SendMessage=(t,e,s)=>{let n=e||"text";this.peerConnections[s]&&"text"==n&&this.peerConnections[s].channel.send(t)},this.connect=(t,e)=>{let i=new WebSocket(n.server);i.onopen=async()=>{if(3==n.type){let t=await navigator.mediaDevices.getDisplayMedia({video:!0});this.localStream=t,this.emit("streamAdded",t)}else if(4==n.type){let t=await navigator.mediaDevices.getUserMedia({audio:n.audio,video:n.video});this.localStream=t,this.emit("streamAdded",t)}"create"===n.method?i.send(JSON.stringify({eventName:"_create",data:{}})):(this.room=n.room,i.send(JSON.stringify({eventName:"_join",data:{room:this.room,type:s[n.type]}})))},i.onmessage=async t=>{try{let s,n,i,o,a,c=JSON.parse(t.data),r=c.eventName,p=c.data;switch(r){case"_created":this.room=p.room,this.emit("getRoom",this.room);break;case"_peer":s=p.socketId,n=p.room,this.initPC(s),i="_offer",this.pcSendOffer({sendEventName:i,socketId:s,room:n});break;case"_new_peer":s=p.socketId,n=p.room,i="_offer",this.initPC(s);break;case"_offer":s=p.socketId,n=p.room,i="_answer",o=p.sdp,a=p.name,await this.sendAnswer({sendEventName:i,socketId:s,room:n,sdp:o});break;case"_answer":o=p.sdp,s=p.socketId,a=p.name,this.receiveAnswer(o,s);break;case"_ice_candidate":var e=new h(p);this.peerConnections[p.socketId].pc.addIceCandidate(e);break;case"_error":this.emit("socket_error",p)}}catch(s){console.log(s)}},i.onerror=t=>{console.log(t)},i.onclose=t=>{this.socket=null,this.emit("close",{errMsg:"即将退出聊天室",code:1e3})},this.socket=i},this.closeAllConnections=()=>{this.socket&&(this.peerConnections=[],this.socket.send(JSON.stringify({eventName:"_offline",data:{room:this.room}})),this.socket.close())}};m.prototype=g,m.prototype.initDataChannel=d,m.prototype.pcCreateCbGen=i,m.prototype.pcCreateErrorCb=o,m.prototype.pcSendOffer=a,m.prototype.receiveOffer=c,m.prototype.sendAnswer=r,m.prototype.receiveAnswer=p},"96cd":function(t,e,s){var n={"./1.jpg":"52f0","./10.jpg":"39c6","./11.jpg":"e19b","./12.jpg":"e657","./13.jpg":"9a1e","./14.jpg":"42ff","./15.jpg":"b12a","./16.jpg":"6c1e","./17.jpg":"76ff","./18.jpg":"dda9","./19.jpg":"3680","./2.jpg":"96f2","./20.jpg":"63ec","./21.jpg":"e227","./22.jpg":"186c","./23.jpg":"a8e0","./24.jpg":"f1cb","./25.jpg":"5da7","./26.jpg":"6929","./27.jpg":"b6ad","./28.jpg":"2197","./29.jpg":"779e","./3.jpg":"80f2","./30.jpg":"cc71","./31.jpg":"302a","./32.jpg":"b503","./33.jpg":"f70d","./34.jpg":"2985","./35.jpg":"c8be","./36.jpg":"5505","./37.jpg":"6d6d","./38.jpg":"fb89","./39.jpg":"1f0f","./4.jpg":"bfdd","./40.jpg":"44b7","./41.jpg":"c285","./5.jpg":"1965","./6.jpg":"b00a","./7.jpg":"3d27","./8.jpg":"42c9","./9.jpg":"68dd"};function i(t){var e=o(t);return s(e)}function o(t){if(!s.o(n,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return n[t]}i.keys=function(){return Object.keys(n)},i.resolve=o,t.exports=i,i.id="96cd"},"96f2":function(t,e,s){t.exports=s.p+"static/img/2.88c54be2.jpg"},"9a1e":function(t,e,s){t.exports=s.p+"static/img/13.256414aa.jpg"},a8e0:function(t,e,s){t.exports=s.p+"static/img/23.aa73e2ae.jpg"},b00a:function(t,e,s){t.exports=s.p+"static/img/6.64f5b183.jpg"},b12a:function(t,e,s){t.exports=s.p+"static/img/15.8d2bb220.jpg"},b503:function(t,e,s){t.exports=s.p+"static/img/32.2afab346.jpg"},b6ad:function(t,e,s){t.exports=s.p+"static/img/27.9953f282.jpg"},bfdd:function(t,e,s){t.exports=s.p+"static/img/4.d719d329.jpg"},c285:function(t,e,s){t.exports=s.p+"static/img/41.70a21812.jpg"},c8be:function(t,e,s){t.exports=s.p+"static/img/35.fe6b93d3.jpg"},cc71:function(t,e){t.exports="data:image/jpeg;base64,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"},cf05:function(t,e,s){t.exports=s.p+"static/img/logo.90ae5ac5.png"},d8c0:function(t,e,s){"use strict";s("6c4f")},dda9:function(t,e,s){t.exports=s.p+"static/img/18.10b75c41.jpg"},e19b:function(t,e,s){t.exports=s.p+"static/img/11.63a83147.jpg"},e227:function(t,e,s){t.exports=s.p+"static/img/21.63fbcdcc.jpg"},e657:function(t,e,s){t.exports=s.p+"static/img/12.1d484818.jpg"},f1cb:function(t,e,s){t.exports=s.p+"static/img/24.9ab39f36.jpg"},f70d:function(t,e,s){t.exports=s.p+"static/img/33.c367fe19.jpg"},fb89:function(t,e,s){t.exports=s.p+"static/img/38.f29193fc.jpg"}}]);