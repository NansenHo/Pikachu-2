const string = `
.skin *{padding: 0; margin: 0; box-sizing: border-box;}
.skin *::before, .skin *::after{box-sizing: border-box;}

.skin{
    background: #ffe600;
    min-height: 66vh;
    position: relation; 
}
.nose{
    border: 10px solid black;
    border-color: black transparent transparent;
    border-bottom: none;
    width: 0px;
    height: 0px;
    position: absolute;
    left: 50%;
    top: 140px; 
    margin-left: -10px;
    z-index: 10;
}
@keyframes wave{
    0%{
        transform: rotate(0deg)
    }
    33%{
        transform: rotate(5deg)
    }
    66%{
        transform: rotate(-5deg)
    }
    100%{
        transform: rotate(0deg)
    }
}
.nose:hover{
    transform-origin: 50% 100%; 
    animation: wave 300ms infinite linear;
}
.semicircle{
    position: absolute;
    width: 20px;
    height: 6px;
    top: -16px;
    left: -10px;
    border-radius: 10px 10px 0 0 ;
    background-color: black;
}
.eye{
    border: 2px solid black;
    width: 64px;
    height: 64px;
    position: absolute;
    left: 50%;
    top: 100px;
    margin-left: -32px;
    background: rgb(46, 46, 46);
    border-radius: 50%;
}
.eye::before{ 
    content: ''; 
    display: block;
    border: 3px solid black;
    width: 32px;
    height: 32px;
    background: white;
    border-radius: 50%;
    position: relative;
    left: 8px;
}
.eye.left{ 
    transform: translateX(-100px);
}
.eye.right{
    transform: translateX(100px);
}
.mouth{
    width: 200px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 164px;
    margin-left: -100px;
}
.mouth .theUpperLip{
    position: relative;
    top: -9px;
}
.mouth .theUpperLip .left{
    border: 3px solid black;
    height: 22px;
    width: 70px;
    border-top: none;
    position: absolute;
    z-index: 1;
    background: #ffe600;
    border-radius: 0 0 0 100px;
    border-right-color: transparent;
    transform: rotate(-20deg);
    left: 50%;
    margin-left: -68px;
}
.mouth .theUpperLip .right{ 
    border: 3px solid black;
    height: 22px;
    width: 70px;
    border-top: none;
    position: absolute;
    z-index: 1;
    background: #ffe600;
    border-radius: 0 0 100px 0;
    border-left-color: transparent;
    transform: rotate(20deg);
    right: 50%;
    margin-right: -68px;
}
.mouth .theLowerLip{
    /* border: 1px solid red; */
    width: 100%;
    height: 186px;
    position: absolute;
    top: 0px;
    overflow: hidden;
}
.mouth .theLowerLip .circle1{
    border: 3px solid black;
    width: 120px;
    height: 1000px;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -60px;
    border-radius: 80px / 300px;
    background: #9b000a;
    overflow: hidden;
}
.mouth .theLowerLip .circle1 .circle2{
    width: 110px;
    height: 180px;
    position: absolute;
    bottom: -20px;
    left: 50%;
    margin-left: -55px;
    border-radius: 50px 50px 0 0 ;
    background: #ff485f;
}
.face{
    position: absolute;
    left: 50%;
    border: 3px solid black;
    width: 84px;
    height: 84px;
    top: 210px;
    margin-left: -44px;
    z-index: 3;
    border-radius: 50%;
    background: #ff0000;
}
.face > img{
    position: absolute;
    top: 25%;
    left: 50%;
}
.face.left{
    transform: translateX(-150px);
}
.face.left > img{
    transform: rotateY(180deg);
    transform-origin: 0 0;
}
.face.right{
    transform: translateX(150px);
}
`

const player = {
    id: undefined,
    time: 100, // 默认等于 100ms
    ui: {
        demo: document.querySelector("#demo"),
        demo2: document.querySelector("#demo2")
    },
    events: {
        '#btnPause': 'pause', // 暂停就是取消 setInterval
        '#btnPlay': 'play', // run 后面千万不能加括号，不然就变成函数的返回值了
        '#btnSlow': 'slow', // 把原来的 setInterval 取消然后信弄一个
        '#btnNormal': 'normal', // 把原来的 setInterval 取消然后信弄一个
        '#btnFast': 'fast'  // 把原来的 setInterval 取消然后信弄一个
    },
    n: 1,
    init: () => { // 对象的初始化方法，把所有初始化的代码都可以放进来
        player.ui.demo.innerText = string.substr(0, player.n)
        player.ui.demo2.innerHTML = string.substr(0, player.n) // 同时以文本和HTML的形式展示一个标签
        player.bindEvents()
        player.play()
    },
    bindEvents: ()=>{
        for(let key in player.events){
            if(player.events.hasOwnProperty(key)) {
                const value = player.events[key]
                document.querySelector(key).onclick = player[value]
            }
        }
    },
    run: () => {
        player.n += 1
        if(player.n > string.length){ // console.log 去打，发现 n > string.length 就行
            window.clearInterval(player.id)
            return
        }
        player.ui.demo.innerText = string.substr(0,player.n)
        player.ui.demo2.innerHTML = string.substr(0,player.n)
        player.ui.demo.scrollTop = player.ui.demo.scrollHeight // 控制台里用 demo.scrollHeight 可以查看高度
    },
    play: ()=>{
        player.id = setInterval(player.run, player.time)
    },
    pause: ()=>{
        window.clearInterval(player.id)
    },
    slow: ()=>{
        player.pause()
        player.time = 300
        player.play()
    },
    normal: ()=>{
        player.pause()
        player.time = 100
        player.play()
    },
    fast: ()=>{
        player.pause()
        player.time = 0
        player.play()
    }
}

player.init()

