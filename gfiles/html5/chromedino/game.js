!function(){for(var t=0,i=["ms","moz","webkit","o"],s=0;s<i.length&&!window.requestAnimationFrame;++s)window.requestAnimationFrame=window[i[s]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[i[s]+"CancelAnimationFrame"]||window[i[s]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(i,s){var e=(new Date).getTime(),n=Math.max(0,16-(e-t)),h=window.setTimeout(function(){i(e+n)},n);return t=e+n,h}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}(),function(){"use strict";var t=window.AudioContext||window.webkitAudioContext||!1;function i(t,e){if(i.instance_)return i.instance_;i.instance_=this,this.outerContainerEl=document.querySelector(t),this.containerEl=null,this.snackbarEl=null,this.config=e||i.config,this.dimensions=i.defaultDimensions,this.canvas=null,this.canvasCtx=null,this.tRex=null,this.distanceMeter=null,this.distanceRan=0,this.highestScore=0,this.time=0,this.runningTime=0,this.msPerFrame=1e3/s,this.currentSpeed=this.config.SPEED,this.obstacles=[],this.started=!1,this.activated=!1,this.crashed=!1,this.paused=!1,this.resizeTimerId_=null,this.playCount=0,this.audioBuffer=null,this.soundFx={},this.audioContext=null,this.images={},this.imagesLoaded=0,this.loadImages(),this.gamepadPreviousKeyDown=!1}window.Runner=i;var s=60,e=window.devicePixelRatio>1,n=window.navigator.userAgent.indexOf("CriOS")>-1||"UIWebViewForStaticFileContent"==window.navigator.userAgent,h=window.navigator.userAgent.indexOf("Mobi")>-1||n;function o(t,i){return Math.floor(Math.random()*(i-t+1))+t}function a(t){for(var i=t.length/4*3,s=atob(t),e=new ArrayBuffer(i),n=new Uint8Array(e),h=0;h<i;h++)n[h]=s.charCodeAt(h);return n.buffer}function r(){return(new Date).getTime()}function c(t,i,s,e){this.canvas=t,this.canvasCtx=t.getContext("2d"),this.canvasDimensions=e,this.textImgPos=i,this.restartImgPos=s,this.draw()}function d(t,i){return new m(t.x+i.x,t.y+i.y,t.width,t.height)}function u(t,i){var s=!1,e=(t.x,t.y,i.x);return i.y,t.x<e+i.width&&t.x+t.width>e&&t.y<i.y+i.height&&t.height+t.y>i.y&&(s=!0),s}function m(t,i,s,e){this.x=t,this.y=i,this.width=s,this.height=e}function l(t,i,s,e,n,h){this.canvasCtx=t,this.spritePos=s,this.typeConfig=i,this.gapCoefficient=n,this.size=o(1,l.MAX_OBSTACLE_LENGTH),this.dimensions=e,this.remove=!1,this.xPos=0,this.yPos=0,this.width=0,this.collisionBoxes=[],this.gap=0,this.speedOffset=0,this.currentFrame=0,this.timer=0,this.init(h)}function T(t,i){this.canvas=t,this.canvasCtx=t.getContext("2d"),this.spritePos=i,this.xPos=0,this.yPos=0,this.groundYPos=0,this.currentFrame=0,this.currentAnimFrames=[],this.blinkDelay=0,this.animStartTime=0,this.timer=0,this.msPerFrame=1e3/s,this.config=T.config,this.status=T.status.WAITING,this.jumping=!1,this.ducking=!1,this.jumpVelocity=0,this.reachedMinHeight=!1,this.speedDrop=!1,this.jumpCount=0,this.jumpspotX=0,this.init()}function f(t,s,e){this.canvas=t,this.canvasCtx=t.getContext("2d"),this.image=i.imageSprite,this.spritePos=s,this.x=0,this.y=5,this.currentDistance=0,this.maxScore=0,this.highScore=0,this.container=null,this.digits=[],this.acheivement=!1,this.defaultString="",this.flashTimer=0,this.flashIterations=0,this.config=f.config,this.maxScoreUnits=this.config.MAX_DISTANCE_UNITS,this.init(e)}function p(t,i,s){this.canvas=t,this.canvasCtx=this.canvas.getContext("2d"),this.spritePos=i,this.containerWidth=s,this.xPos=s,this.yPos=0,this.remove=!1,this.cloudGap=o(p.config.MIN_CLOUD_GAP,p.config.MAX_CLOUD_GAP),this.init()}function E(t,i){this.spritePos=i,this.canvas=t,this.canvasCtx=t.getContext("2d"),this.sourceDimensions={},this.dimensions=E.dimensions,this.sourceXPos=[this.spritePos.x,this.spritePos.x+this.dimensions.WIDTH],this.xPos=[],this.yPos=0,this.bumpThreshold=.5,this.setSourceDimensions(),this.draw()}function I(t,i,s,e){this.canvas=t,this.canvasCtx=this.canvas.getContext("2d"),this.config=I.config,this.dimensions=s,this.gapCoefficient=e,this.obstacles=[],this.obstacleHistory=[],this.horizonOffsets=[0,0],this.cloudFrequency=this.config.CLOUD_FREQUENCY,this.spritePos=i,this.clouds=[],this.cloudSpeed=this.config.BG_CLOUD_SPEED,this.horizonLine=null,this.init()}i.config={ACCELERATION:.001,BG_CLOUD_SPEED:.2,BOTTOM_PAD:10,CLEAR_TIME:3e3,CLOUD_FREQUENCY:.5,_CLEAR_TIME:750,GAP_COEFFICIENT:.6,GRAVITY:.6,INITIAL_JUMP_VELOCITY:12,MAX_CLOUDS:6,MAX_OBSTACLE_LENGTH:3,MAX_OBSTACLE_DUPLICATION:2,MAX_SPEED:13,MIN_JUMP_HEIGHT:35,MOBILE_SPEED_COEFFICIENT:1.2,RESOURCE_TEMPLATE_ID:"audio-resources",SPEED:6,SPEED_DROP_COEFFICIENT:3},i.defaultDimensions={WIDTH:600,HEIGHT:150},i.classes={ARCADE_MODE:"arcade-mode",CANVAS:"runner-canvas",CONTAINER:"runner-container",CRASHED:"crashed",ICON:"icon-offline",SNACKBAR:"snackbar",SNACKBAR_SHOW:"snackbar-show",TOUCH_CONTROLLER:"controller"},i.spriteDefinition={LDPI:{CACTUS_LARGE:{x:332,y:2},CACTUS_SMALL:{x:228,y:2},CLOUD:{x:86,y:2},HORIZON:{x:2,y:54},PTERODACTYL:{x:134,y:2},RESTART:{x:2,y:2},TEXT_SPRITE:{x:484,y:2},TREX:{x:677,y:2}},HDPI:{CACTUS_LARGE:{x:652,y:2},CACTUS_SMALL:{x:446,y:2},CLOUD:{x:166,y:2},HORIZON:{x:2,y:104},PTERODACTYL:{x:260,y:2},RESTART:{x:2,y:2},TEXT_SPRITE:{x:954,y:2},TREX:{x:1338,y:2}}},i.sounds={BUTTON_PRESS:"offline-sound-press",HIT:"offline-sound-hit",SCORE:"offline-sound-reached"},i.keycodes={JUMP:{38:1,32:1},DUCK:{40:1},RESTART:{13:1}},i.events={ANIM_END:"webkitAnimationEnd",CLICK:"click",KEYDOWN:"keydown",KEYUP:"keyup",MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",RESIZE:"resize",TOUCHEND:"touchend",TOUCHSTART:"touchstart",VISIBILITY:"visibilitychange",BLUR:"blur",FOCUS:"focus",LOAD:"load",GAMEPADCONNECTED:"gamepadconnected"},i.prototype={updateConfigSetting:function(t,i){if(t in this.config&&null!=i)switch(this.config[t]=i,t){case"GRAVITY":case"MIN_JUMP_HEIGHT":case"SPEED_DROP_COEFFICIENT":this.tRex.config[t]=i;break;case"INITIAL_JUMP_VELOCITY":this.tRex.setJumpVelocity(i);break;case"SPEED":this.setSpeed(i)}},loadImages:function(){e?(i.imageSprite=document.getElementById("offline-resources-2x"),this.spriteDef=i.spriteDefinition.HDPI):(i.imageSprite=document.getElementById("offline-resources-1x"),this.spriteDef=i.spriteDefinition.LDPI),this.init()},loadSounds:function(){if(!n&&t){this.audioContext=new t;var s=document.getElementById(this.config.RESOURCE_TEMPLATE_ID).content;for(var e in i.sounds){var h=s.getElementById(i.sounds[e]).src,o=a(h=h.substr(h.indexOf(",")+1));this.audioContext.decodeAudioData(o,function(t,i){this.soundFx[t]=i}.bind(this,e))}}},setSpeed:function(t){var i=t||this.currentSpeed;if(this.dimensions.WIDTH<600){var s=i*this.dimensions.WIDTH/600*this.config.MOBILE_SPEED_COEFFICIENT;this.currentSpeed=s>i?i:s}else t&&(this.currentSpeed=t)},init:function(){var t,s,e,n,o;this.adjustDimensions(),this.setSpeed(),this.containerEl=document.createElement("div"),this.containerEl.className=i.classes.CONTAINER,this.canvas=(t=this.containerEl,s=this.dimensions.WIDTH,e=this.dimensions.HEIGHT,n=i.classes.PLAYER,(o=document.createElement("canvas")).className=n?i.classes.CANVAS+" "+n:i.classes.CANVAS,o.width=s,o.height=e,t.appendChild(o),o),this.canvasCtx=this.canvas.getContext("2d"),this.canvasCtx.fillStyle="#f7f7f7",this.canvasCtx.fill(),i.updateCanvasScaling(this.canvas),this.horizon=new I(this.canvas,this.spriteDef,this.dimensions,this.config.GAP_COEFFICIENT),this.distanceMeter=new f(this.canvas,this.spriteDef.TEXT_SPRITE,this.dimensions.WIDTH),this.tRex=new T(this.canvas,this.spriteDef.TREX),this.outerContainerEl.appendChild(this.containerEl),h&&this.createTouchController(),this.startListening(),this.update(),window.addEventListener(i.events.RESIZE,this.debounceResize.bind(this))},createTouchController:function(){this.touchController=document.createElement("div"),this.touchController.className=i.classes.TOUCH_CONTROLLER},debounceResize:function(){this.resizeTimerId_||(this.resizeTimerId_=setInterval(this.adjustDimensions.bind(this),250))},adjustDimensions:function(){clearInterval(this.resizeTimerId_),this.resizeTimerId_=null;var t=window.getComputedStyle(this.outerContainerEl),s=Number(t.paddingLeft.substr(0,t.paddingLeft.length-2));this.dimensions.WIDTH=this.outerContainerEl.offsetWidth-2*s,this.canvas&&(console.log(this.dimensions),this.canvas.width=this.dimensions.WIDTH,this.canvas.height=this.dimensions.HEIGHT,i.updateCanvasScaling(this.canvas),this.distanceMeter.calcXPos(this.dimensions.WIDTH),this.clearCanvas(),this.horizon.update(0,0,!0),this.tRex.update(0),this.activated||this.crashed||this.paused?(this.containerEl.style.width=this.dimensions.WIDTH+"px",this.containerEl.style.height=this.dimensions.HEIGHT+"px",this.distanceMeter.update(0,Math.ceil(this.distanceRan)),this.stop()):this.tRex.draw(0,0),this.crashed&&this.gameOverPanel&&(this.gameOverPanel.updateDimensions(this.dimensions.WIDTH),this.gameOverPanel.draw()))},playIntro:function(){this.started||this.crashed?this.crashed&&this.restart():(this.playingIntro=!0,this.tRex.playingIntro=!0,document.styleSheets[0].insertRule("@-webkit-keyframes intro { from { width:"+T.config.WIDTH+"px }to { width: "+this.dimensions.WIDTH+"px }}",0),this.containerEl.addEventListener(i.events.ANIM_END,this.startGame.bind(this)),this.containerEl.style.webkitAnimation="intro .4s ease-out 1 both",this.containerEl.style.width=this.dimensions.WIDTH+"px",this.touchController&&this.outerContainerEl.appendChild(this.touchController),this.activated=!0,this.started=!0)},startGame:function(){this.runningTime=0,this.playingIntro=!1,this.tRex.playingIntro=!1,this.containerEl.style.webkitAnimation="",this.playCount++,document.addEventListener(i.events.VISIBILITY,this.onVisibilityChange.bind(this)),window.addEventListener(i.events.BLUR,this.onVisibilityChange.bind(this)),window.addEventListener(i.events.FOCUS,this.onVisibilityChange.bind(this))},clearCanvas:function(){this.canvasCtx.clearRect(0,0,this.dimensions.WIDTH,this.dimensions.HEIGHT)},update:function(){this.drawPending=!1;var t=r(),s=t-(this.time||t);if(this.time=t,this.activated){this.clearCanvas(),this.tRex.jumping&&this.tRex.updateJump(s),this.runningTime+=s;var e=this.runningTime>this.config.CLEAR_TIME;1!=this.tRex.jumpCount||this.playingIntro||this.playIntro(),this.playingIntro?this.horizon.update(0,this.currentSpeed,e):(s=this.started?s:0,this.horizon.update(s,this.currentSpeed,e)),e&&function(t,s,e){i.defaultDimensions.WIDTH,t.xPos;var n=new m(s.xPos+1,s.yPos+1,s.config.WIDTH-2,s.config.HEIGHT-2),h=new m(t.xPos+1,t.yPos+1,t.typeConfig.width*t.size-2,t.typeConfig.height-2);if(u(n,h))for(var o=t.collisionBoxes,a=s.ducking?T.collisionBoxes.DUCKING:T.collisionBoxes.RUNNING,r=0;r<a.length;r++)for(var c=0;c<o.length;c++){var l=d(a[r],n),f=d(o[c],h);if(u(l,f))return[l,f]}return!1}(this.horizon.obstacles[0],this.tRex)?this.gameOver():(this.distanceRan+=this.currentSpeed*s/this.msPerFrame,this.currentSpeed<this.config.MAX_SPEED&&(this.currentSpeed+=this.config.ACCELERATION)),this.distanceMeter.update(s,Math.ceil(this.distanceRan))&&this.playSound(this.soundFx.SCORE)}this.crashed||(this.tRex.update(s),this.raq())},handleEvent:function(t){return function(i,s){switch(i){case s.KEYDOWN:case s.TOUCHSTART:case s.MOUSEDOWN:case s.GAMEPADCONNECTED:this.onKeyDown(t);break;case s.KEYUP:case s.TOUCHEND:case s.MOUSEUP:this.onKeyUp(t)}}.bind(this)(t.type,i.events)},startListening:function(){document.addEventListener(i.events.KEYDOWN,this),document.addEventListener(i.events.KEYUP,this),h?(this.touchController.addEventListener(i.events.TOUCHSTART,this),this.touchController.addEventListener(i.events.TOUCHEND,this),this.containerEl.addEventListener(i.events.TOUCHSTART,this)):(document.addEventListener(i.events.MOUSEDOWN,this),document.addEventListener(i.events.MOUSEUP,this)),window.addEventListener(i.events.GAMEPADCONNECTED,this),window.setInterval(this.pollGamepads.bind(this),10)},pollGamepads:function(){for(var t=navigator.getGamepads?navigator.getGamepads():navigator.webkitGetGamepads?navigator.webkitGetGamepads():[],i=!1,s=0;s<t.length;s++)null!=t[s]&&t[s].buttons.filter(function(t){return 1==t.pressed}).length>0&&(i=!0);if(i!=this.gamepadPreviousKeyDown){this.gamepadPreviousKeyDown=i;var e=new Event(i?"keydown":"keyup");e.keyCode=32,e.which=e.keyCode,e.altKey=!1,e.ctrlKey=!0,e.shiftKey=!1,e.metaKey=!1,document.dispatchEvent(e)}},stopListening:function(){document.removeEventListener(i.events.KEYDOWN,this),document.removeEventListener(i.events.KEYUP,this),h?(this.touchController.removeEventListener(i.events.TOUCHSTART,this),this.touchController.removeEventListener(i.events.TOUCHEND,this),this.containerEl.removeEventListener(i.events.TOUCHSTART,this)):(document.removeEventListener(i.events.MOUSEDOWN,this),document.removeEventListener(i.events.MOUSEUP,this))},onKeyDown:function(t){h&&t.preventDefault(),this.crashed||!i.keycodes.JUMP[t.keyCode]&&t.type!=i.events.TOUCHSTART&&t.type!=i.events.GAMEPADCONNECTED||(this.activated||(this.loadSounds(),this.activated=!0),this.tRex.jumping||this.tRex.ducking||(this.playSound(this.soundFx.BUTTON_PRESS),this.tRex.startJump(this.currentSpeed))),this.crashed&&t.type==i.events.TOUCHSTART&&t.currentTarget==this.containerEl&&this.restart(),this.activated&&!this.crashed&&i.keycodes.DUCK[t.keyCode]&&(t.preventDefault(),this.tRex.jumping?this.tRex.setSpeedDrop():this.tRex.jumping||this.tRex.ducking||this.tRex.setDuck(!0))},onKeyUp:function(t){var s=String(t.keyCode),e=i.keycodes.JUMP[s]||t.type==i.events.TOUCHEND||t.type==i.events.MOUSEDOWN;if(this.isRunning()&&e)this.tRex.endJump();else if(i.keycodes.DUCK[s])this.tRex.speedDrop=!1,this.tRex.setDuck(!1);else if(this.crashed){var n=r()-this.time;(i.keycodes.RESTART[s]||this.isLeftClickOnCanvas(t)||n>=this.config.GAMEOVER_CLEAR_TIME&&i.keycodes.JUMP[s])&&this.restart()}else this.paused&&e&&(this.tRex.reset(),this.play())},isLeftClickOnCanvas:function(t){return null!=t.button&&t.button<2&&t.type==i.events.MOUSEUP&&t.target==this.canvas},raq:function(){this.drawPending||(this.drawPending=!0,this.raqId=requestAnimationFrame(this.update.bind(this)))},isRunning:function(){return!!this.raqId},gameOver:function(){this.playSound(this.soundFx.HIT),h&&window.navigator.vibrate&&window.navigator.vibrate(200),this.stop(),this.crashed=!0,this.distanceMeter.acheivement=!1,this.tRex.update(100,T.status.CRASHED),this.gameOverPanel?this.gameOverPanel.draw():this.gameOverPanel=new c(this.canvas,this.spriteDef.TEXT_SPRITE,this.spriteDef.RESTART,this.dimensions),this.distanceRan>this.highestScore&&(this.highestScore=Math.ceil(this.distanceRan),this.distanceMeter.setHighScore(this.highestScore),Math.round(.025*this.highestScore),null!==document.getElementById("score-5")&&document.getElementById("score-5").innerHTML),this.time=r()},stop:function(){this.activated=!1,this.paused=!0,cancelAnimationFrame(this.raqId),this.raqId=0},play:function(){this.crashed||(this.activated=!0,this.paused=!1,this.tRex.update(0,T.status.RUNNING),this.time=r(),this.update())},restart:function(){this.raqId||(this.playCount++,this.runningTime=0,this.activated=!0,this.crashed=!1,this.distanceRan=0,this.setSpeed(this.config.SPEED),this.time=r(),this.containerEl.classList.remove(i.classes.CRASHED),this.clearCanvas(),this.distanceMeter.reset(this.highestScore),this.horizon.reset(),this.tRex.reset(),this.playSound(this.soundFx.BUTTON_PRESS),this.update())},onVisibilityChange:function(t){document.hidden||document.webkitHidden||"blur"==t.type?this.stop():this.crashed||(this.tRex.reset(),this.play())},playSound:function(t){if(t){var i=this.audioContext.createBufferSource();i.buffer=t,i.connect(this.audioContext.destination),i.start(0)}}},i.updateCanvasScaling=function(t,i,s){var e=t.getContext("2d"),n=Math.floor(window.devicePixelRatio)||1,h=Math.floor(e.webkitBackingStorePixelRatio)||1,o=n/h;if(n!==h){var a=i||t.width,r=s||t.height;return t.width=a*o,t.height=r*o,t.style.width=a+"px",t.style.height=r+"px",e.scale(o,o),!0}return 1==n&&(t.style.width=t.width+"px",t.style.height=t.height+"px"),!1},c.dimensions={TEXT_X:0,TEXT_Y:13,TEXT_WIDTH:191,TEXT_HEIGHT:11,RESTART_WIDTH:36,RESTART_HEIGHT:32},c.prototype={updateDimensions:function(t,i){this.canvasDimensions.WIDTH=t,i&&(this.canvasDimensions.HEIGHT=i)},draw:function(){var t=c.dimensions,s=this.canvasDimensions.WIDTH/2,n=t.TEXT_X,h=t.TEXT_Y,o=t.TEXT_WIDTH,a=t.TEXT_HEIGHT,r=Math.round(s-t.TEXT_WIDTH/2),d=Math.round((this.canvasDimensions.HEIGHT-25)/3),u=t.TEXT_WIDTH,m=t.TEXT_HEIGHT,l=t.RESTART_WIDTH,T=t.RESTART_HEIGHT,f=s-t.RESTART_WIDTH/2,p=this.canvasDimensions.HEIGHT/2;e&&(h*=2,n*=2,o*=2,a*=2,l*=2,T*=2),n+=this.textImgPos.x,h+=this.textImgPos.y,this.canvasCtx.drawImage(i.imageSprite,n,h,o,a,r,d,u,m),this.canvasCtx.drawImage(i.imageSprite,this.restartImgPos.x,this.restartImgPos.y,l,T,f,p,t.RESTART_WIDTH,t.RESTART_HEIGHT)}},l.MAX_GAP_COEFFICIENT=1.5,l.MAX_OBSTACLE_LENGTH=3,l.prototype={init:function(t){if(this.cloneCollisionBoxes(),this.size>1&&this.typeConfig.multipleSpeed>t&&(this.size=1),this.width=this.typeConfig.width*this.size,this.xPos=this.dimensions.WIDTH-this.width,Array.isArray(this.typeConfig.yPos)){var i=h?this.typeConfig.yPosMobile:this.typeConfig.yPos;this.yPos=i[o(0,i.length-1)]}else this.yPos=this.typeConfig.yPos;this.draw(),this.size>1&&(this.collisionBoxes[1].width=this.width-this.collisionBoxes[0].width-this.collisionBoxes[2].width,this.collisionBoxes[2].x=this.width-this.collisionBoxes[2].width),this.typeConfig.speedOffset&&(this.speedOffset=Math.random()>.5?this.typeConfig.speedOffset:-this.typeConfig.speedOffset),this.gap=this.getGap(this.gapCoefficient,t)},draw:function(){var t=this.typeConfig.width,s=this.typeConfig.height;e&&(t*=2,s*=2);var n=t*this.size*(.5*(this.size-1))+this.spritePos.x;this.currentFrame>0&&(n+=t*this.currentFrame),this.canvasCtx.drawImage(i.imageSprite,n,this.spritePos.y,t*this.size,s,this.xPos,this.yPos,this.typeConfig.width*this.size,this.typeConfig.height)},update:function(t,i){this.remove||(this.typeConfig.speedOffset&&(i+=this.speedOffset),this.xPos-=Math.floor(i*s/1e3*t),this.typeConfig.numFrames&&(this.timer+=t,this.timer>=this.typeConfig.frameRate&&(this.currentFrame=this.currentFrame==this.typeConfig.numFrames-1?0:this.currentFrame+1,this.timer=0)),this.draw(),this.isVisible()||(this.remove=!0))},getGap:function(t,i){var s=Math.round(this.width*i+this.typeConfig.minGap*t);return o(s,Math.round(s*l.MAX_GAP_COEFFICIENT))},isVisible:function(){return this.xPos+this.width>0},cloneCollisionBoxes:function(){for(var t=this.typeConfig.collisionBoxes,i=t.length-1;i>=0;i--)this.collisionBoxes[i]=new m(t[i].x,t[i].y,t[i].width,t[i].height)}},l.types=[{type:"CACTUS_SMALL",width:17,height:35,yPos:105,multipleSpeed:4,minGap:120,minSpeed:0,collisionBoxes:[new m(0,7,5,27),new m(4,0,6,34),new m(10,4,7,14)]},{type:"CACTUS_LARGE",width:25,height:50,yPos:90,multipleSpeed:7,minGap:120,minSpeed:0,collisionBoxes:[new m(0,12,7,38),new m(8,0,7,49),new m(13,10,10,38)]},{type:"PTERODACTYL",width:46,height:40,yPos:[100,75,50],yPosMobile:[100,50],multipleSpeed:999,minSpeed:8.5,minGap:150,collisionBoxes:[new m(15,15,16,5),new m(18,21,24,6),new m(2,14,4,3),new m(6,10,4,7),new m(10,8,6,9)],numFrames:2,frameRate:1e3/6,speedOffset:.8}],T.config={DROP_VELOCITY:-5,GRAVITY:.6,HEIGHT:47,HEIGHT_DUCK:25,INIITAL_JUMP_VELOCITY:-10,INTRO_DURATION:1500,MAX_JUMP_HEIGHT:30,MIN_JUMP_HEIGHT:30,SPEED_DROP_COEFFICIENT:3,SPRITE_WIDTH:262,START_X_POS:50,WIDTH:44,WIDTH_DUCK:59},T.collisionBoxes={DUCKING:[new m(1,18,55,25)],RUNNING:[new m(22,0,17,16),new m(1,18,30,9),new m(10,35,14,8),new m(1,24,29,5),new m(5,30,21,4),new m(9,34,15,4)]},T.status={CRASHED:"CRASHED",DUCKING:"DUCKING",JUMPING:"JUMPING",RUNNING:"RUNNING",WAITING:"WAITING"},T.BLINK_TIMING=7e3,T.animFrames={WAITING:{frames:[44,0],msPerFrame:1e3/3},RUNNING:{frames:[88,132],msPerFrame:1e3/12},CRASHED:{frames:[220],msPerFrame:1e3/60},JUMPING:{frames:[0],msPerFrame:1e3/60},DUCKING:{frames:[262,321],msPerFrame:125}},T.prototype={init:function(){this.blinkDelay=this.setBlinkDelay(),this.groundYPos=i.defaultDimensions.HEIGHT-this.config.HEIGHT-i.config.BOTTOM_PAD,this.yPos=this.groundYPos,this.minJumpHeight=this.groundYPos-this.config.MIN_JUMP_HEIGHT,this.draw(0,0),this.update(0,T.status.WAITING)},setJumpVelocity:function(t){this.config.INIITAL_JUMP_VELOCITY=-t,this.config.DROP_VELOCITY=-t/2},update:function(t,i){this.timer+=t,i&&(this.status=i,this.currentFrame=0,this.msPerFrame=T.animFrames[i].msPerFrame,this.currentAnimFrames=T.animFrames[i].frames,i==T.status.WAITING&&(this.animStartTime=r(),this.setBlinkDelay())),this.playingIntro&&this.xPos<this.config.START_X_POS&&(this.xPos+=Math.round(this.config.START_X_POS/this.config.INTRO_DURATION*t)),this.status==T.status.WAITING?this.blink(r()):this.draw(this.currentAnimFrames[this.currentFrame],0),this.timer>=this.msPerFrame&&(this.currentFrame=this.currentFrame==this.currentAnimFrames.length-1?0:this.currentFrame+1,this.timer=0),this.speedDrop&&this.yPos==this.groundYPos&&(this.speedDrop=!1,this.setDuck(!0))},draw:function(t,s){var n=t,h=s,o=this.ducking&&this.status!=T.status.CRASHED?this.config.WIDTH_DUCK:this.config.WIDTH,a=this.config.HEIGHT;e&&(n*=2,h*=2,o*=2,a*=2),n+=this.spritePos.x,h+=this.spritePos.y,this.ducking&&this.status!=T.status.CRASHED?this.canvasCtx.drawImage(i.imageSprite,n,h,o,a,this.xPos,this.yPos,this.config.WIDTH_DUCK,this.config.HEIGHT):(this.ducking&&this.status==T.status.CRASHED&&this.xPos++,this.canvasCtx.drawImage(i.imageSprite,n,h,o,a,this.xPos,this.yPos,this.config.WIDTH,this.config.HEIGHT))},setBlinkDelay:function(){this.blinkDelay=Math.ceil(Math.random()*T.BLINK_TIMING)},blink:function(t){t-this.animStartTime>=this.blinkDelay&&(this.draw(this.currentAnimFrames[this.currentFrame],0),1==this.currentFrame&&(this.setBlinkDelay(),this.animStartTime=t))},startJump:function(t){this.jumping||(this.update(0,T.status.JUMPING),this.jumpVelocity=this.config.INIITAL_JUMP_VELOCITY-t/10,this.jumping=!0,this.reachedMinHeight=!1,this.speedDrop=!1)},endJump:function(){this.reachedMinHeight&&this.jumpVelocity<this.config.DROP_VELOCITY&&(this.jumpVelocity=this.config.DROP_VELOCITY)},updateJump:function(t,i){var s=t/T.animFrames[this.status].msPerFrame;this.speedDrop?this.yPos+=Math.round(this.jumpVelocity*this.config.SPEED_DROP_COEFFICIENT*s):this.yPos+=Math.round(this.jumpVelocity*s),this.jumpVelocity+=this.config.GRAVITY*s,(this.yPos<this.minJumpHeight||this.speedDrop)&&(this.reachedMinHeight=!0),(this.yPos<this.config.MAX_JUMP_HEIGHT||this.speedDrop)&&this.endJump(),this.yPos>this.groundYPos&&(this.reset(),this.jumpCount++),this.update(t)},setSpeedDrop:function(){this.speedDrop=!0,this.jumpVelocity=1},setDuck:function(t){t&&this.status!=T.status.DUCKING?(this.update(0,T.status.DUCKING),this.ducking=!0):this.status==T.status.DUCKING&&(this.update(0,T.status.RUNNING),this.ducking=!1)},reset:function(){this.yPos=this.groundYPos,this.jumpVelocity=0,this.jumping=!1,this.ducking=!1,this.update(0,T.status.RUNNING),this.midair=!1,this.speedDrop=!1,this.jumpCount=0}},f.dimensions={WIDTH:10,HEIGHT:13,DEST_WIDTH:11},f.yPos=[0,13,27,40,53,67,80,93,107,120],f.config={MAX_DISTANCE_UNITS:5,ACHIEVEMENT_DISTANCE:100,COEFFICIENT:.025,FLASH_DURATION:250,FLASH_ITERATIONS:3},f.prototype={init:function(t){var i="";this.calcXPos(t),this.maxScore=this.maxScoreUnits;for(var s=0;s<this.maxScoreUnits;s++)this.draw(s,0),this.defaultString+="0",i+="9";this.maxScore=parseInt(i)},calcXPos:function(t){this.x=t-f.dimensions.DEST_WIDTH*(this.maxScoreUnits+1)},draw:function(t,i,s){var n=f.dimensions.WIDTH,h=f.dimensions.HEIGHT,o=f.dimensions.WIDTH*i,a=0,r=t*f.dimensions.DEST_WIDTH,c=this.y,d=f.dimensions.WIDTH,u=f.dimensions.HEIGHT;if(e&&(n*=2,h*=2,o*=2),o+=this.spritePos.x,a+=this.spritePos.y,this.canvasCtx.save(),s){var m=this.x-2*this.maxScoreUnits*f.dimensions.WIDTH;this.canvasCtx.translate(m,this.y)}else this.canvasCtx.translate(this.x,this.y);this.canvasCtx.drawImage(this.image,o,a,n,h,r,c,d,u),this.canvasCtx.restore()},getActualDistance:function(t){return t?Math.round(t*this.config.COEFFICIENT):0},update:function(t,i){var s=!0,e=!1;if(this.acheivement)this.flashIterations<=this.config.FLASH_ITERATIONS?(this.flashTimer+=t,this.flashTimer<this.config.FLASH_DURATION?s=!1:this.flashTimer>2*this.config.FLASH_DURATION&&(this.flashTimer=0,this.flashIterations++)):(this.acheivement=!1,this.flashIterations=0,this.flashTimer=0);else if((i=this.getActualDistance(i))>this.maxScore&&this.maxScoreUnits==this.config.MAX_DISTANCE_UNITS?(this.maxScoreUnits++,this.maxScore=parseInt(this.maxScore+"9")):this.distance=0,i>0){i%this.config.ACHIEVEMENT_DISTANCE==0&&(this.acheivement=!0,this.flashTimer=0,e=!0);var n=(this.defaultString+i).substr(-this.maxScoreUnits);this.digits=n.split("")}else this.digits=this.defaultString.split("");if(s)for(var h=this.digits.length-1;h>=0;h--)this.draw(h,parseInt(this.digits[h]));return this.drawHighScore(),e},drawHighScore:function(){this.canvasCtx.save(),this.canvasCtx.globalAlpha=.8;for(var t=this.highScore.length-1;t>=0;t--)this.draw(t,parseInt(this.highScore[t],10),!0);this.canvasCtx.restore()},setHighScore:function(t){t=this.getActualDistance(t);var i=(this.defaultString+t).substr(-this.maxScoreUnits);this.highScore=["10","11",""].concat(i.split(""))},reset:function(){this.update(0),this.acheivement=!1}},p.config={HEIGHT:14,MAX_CLOUD_GAP:400,MAX_SKY_LEVEL:30,MIN_CLOUD_GAP:100,MIN_SKY_LEVEL:71,WIDTH:46},p.prototype={init:function(){this.yPos=o(p.config.MAX_SKY_LEVEL,p.config.MIN_SKY_LEVEL),this.draw()},draw:function(){this.canvasCtx.save();var t=p.config.WIDTH,s=p.config.HEIGHT;e&&(t*=2,s*=2),this.canvasCtx.drawImage(i.imageSprite,this.spritePos.x,this.spritePos.y,t,s,this.xPos,this.yPos,p.config.WIDTH,p.config.HEIGHT),this.canvasCtx.restore()},update:function(t){this.remove||(this.xPos-=Math.ceil(t),this.draw(),this.isVisible()||(this.remove=!0))},isVisible:function(){return this.xPos+p.config.WIDTH>0}},E.dimensions={WIDTH:600,HEIGHT:12,YPOS:127},E.prototype={setSourceDimensions:function(){for(var t in E.dimensions)e?"YPOS"!=t&&(this.sourceDimensions[t]=2*E.dimensions[t]):this.sourceDimensions[t]=E.dimensions[t],this.dimensions[t]=E.dimensions[t];this.xPos=[0,E.dimensions.WIDTH],this.yPos=E.dimensions.YPOS},getRandomType:function(){return Math.random()>this.bumpThreshold?this.dimensions.WIDTH:0},draw:function(){this.canvasCtx.drawImage(i.imageSprite,this.sourceXPos[0],this.spritePos.y,this.sourceDimensions.WIDTH,this.sourceDimensions.HEIGHT,this.xPos[0],this.yPos,this.dimensions.WIDTH,this.dimensions.HEIGHT),this.canvasCtx.drawImage(i.imageSprite,this.sourceXPos[1],this.spritePos.y,this.sourceDimensions.WIDTH,this.sourceDimensions.HEIGHT,this.xPos[1],this.yPos,this.dimensions.WIDTH,this.dimensions.HEIGHT)},updateXPos:function(t,i){var s=t,e=0==t?1:0;this.xPos[s]-=i,this.xPos[e]=this.xPos[s]+this.dimensions.WIDTH,this.xPos[s]<=-this.dimensions.WIDTH&&(this.xPos[s]+=2*this.dimensions.WIDTH,this.xPos[e]=this.xPos[s]-this.dimensions.WIDTH,this.sourceXPos[s]=this.getRandomType()+this.spritePos.x)},update:function(t,i){var e=Math.floor(i*(s/1e3)*t);this.xPos[0]<=0?this.updateXPos(0,e):this.updateXPos(1,e),this.draw()},reset:function(){this.xPos[0]=0,this.xPos[1]=E.dimensions.WIDTH}},I.config={BG_CLOUD_SPEED:.2,BUMPY_THRESHOLD:.3,CLOUD_FREQUENCY:.5,HORIZON_HEIGHT:16,MAX_CLOUDS:6},I.prototype={init:function(){this.addCloud(),this.horizonLine=new E(this.canvas,this.spritePos.HORIZON)},update:function(t,i,s){this.runningTime+=t,this.horizonLine.update(t,i),this.updateClouds(t,i),s&&this.updateObstacles(t,i)},updateClouds:function(t,i){var s=this.cloudSpeed/1e3*t*i,e=this.clouds.length;if(e){for(var n=e-1;n>=0;n--)this.clouds[n].update(s);var h=this.clouds[e-1];e<this.config.MAX_CLOUDS&&this.dimensions.WIDTH-h.xPos>h.cloudGap&&this.cloudFrequency>Math.random()&&this.addCloud(),this.clouds=this.clouds.filter(function(t){return!t.remove})}},updateObstacles:function(t,i){for(var s=this.obstacles.slice(0),e=0;e<this.obstacles.length;e++){var n=this.obstacles[e];n.update(t,i),n.remove&&s.shift()}if(this.obstacles=s,this.obstacles.length>0){var h=this.obstacles[this.obstacles.length-1];h&&!h.followingObstacleCreated&&h.isVisible()&&h.xPos+h.width+h.gap<this.dimensions.WIDTH&&(this.addNewObstacle(i),h.followingObstacleCreated=!0)}else this.addNewObstacle(i)},addNewObstacle:function(t){var s=o(0,l.types.length-1),e=l.types[s];if(this.duplicateObstacleCheck(e.type)||t<e.minSpeed)this.addNewObstacle(t);else{var n=this.spritePos[e.type];this.obstacles.push(new l(this.canvasCtx,e,n,this.dimensions,this.gapCoefficient,t)),this.obstacleHistory.unshift(e.type),this.obstacleHistory.length>1&&this.obstacleHistory.splice(i.config.MAX_OBSTACLE_DUPLICATION)}},duplicateObstacleCheck:function(t){for(var s=0,e=0;e<this.obstacleHistory.length;e++)s=this.obstacleHistory[e]==t?s+1:0;return s>=i.config.MAX_OBSTACLE_DUPLICATION},reset:function(){this.obstacles=[],this.horizonLine.reset()},resize:function(t,i){this.canvas.width=t,this.canvas.height=i},addCloud:function(){this.clouds.push(new p(this.canvas,this.spritePos.CLOUD,this.dimensions.WIDTH))}}}(),new Runner(".interstitial-wrapper");