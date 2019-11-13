// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var gqs = 1;
var qian=0;
var tj = 5;
var x1=0;
var wuqi="no";
var fanju="no";
var y1=0;
var x2=0;
var y2=0;
var hero_hp=document.getElementById("g1hp");
var hero_exp=document.getElementById("exp");
var hero_lv=document.getElementById("lv");
var hp1 = 100;
var hp2 = 100;

canvas.width = 512;
canvas.height = 480;
var srh=("花100金币回复HP");
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
if(gqs%2==0){
bgImage.src = "images/background1.png";

}else{
bgImage.src = "images/background.png";}

//主角
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";
//商人
var traderReady = false;
var traderImage = new Image();
traderImage.onload = function () {
	traderReady = true;
};
traderImage.src = "images/trader.png";

//怪物1
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
var m1 = Math.round(Math.random())
//随机输出怪物形象
if (m1 == 0) {
	monsterImage.src = "images/monster.png";

} else {
	monsterImage.src = "images/monster2.png";

}

//怪物2
var monsterReady2 = false;
var monsterImage2 = new Image();
monsterImage2.onload = function () {
	monsterReady2 = true;
};
var m1 = Math.round(Math.random())
//随机输出怪物形象
if (m1 == 0) {
	monsterImage2.src = "images/monster.png";

} else {
	monsterImage2.src = "images/monster2.png";

}
//掉金币
var goldReady = false;
var goldImage = new Image();
goldImage.onload = function () {
	goldReady = true;
};
goldImage.src = "images/gold.png";
//掉金币2
var goldReady1 = false;
var goldImage1 = new Image();
goldImage1.onload = function () {
	goldReady1 = true;
};
goldImage1.src = "images/gold.png";
//飞镖
var fbReady = false;
var fbImage = new Image();
fbImage.onload = function () {
	fbReady = true;
};
fbImage.src = "images/fb.png";

// Game objects
var hero = {
	speed: 300 // movement in pixels per second
};
//设定怪物对象
var monster = {
};
//设定怪物对象
var monster2 = {
};
//设定金币对象
var gold={};
var gold1={};
//设定商人
var trader={};
//飞镖设定
var fb={}

var monstersCaught = 0;//击杀数

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var herozhix = function () {//主角位置刷新
	hero.x = 50;
	hero.y = 50;
}
var reset = function () {//怪物1刷新

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};
var traderrest = function () {//商人刷新

	// Throw the monster somewhere on the screen randomly
	trader.x = 32 + (Math.random() * (canvas.width - 64));
	trader.y = 32 + (Math.random() * (canvas.height - 64));
};
var traderrest2 = function () {//商人刷新

	// Throw the monster somewhere on the screen randomly
	trader.x = trader.x;
	trader.y = trader.y;
};
var reset1 = function () {//怪物2刷新
	monster2.x = 32 + (Math.random() * (canvas.width - 64));
	monster2.y = 32 + (Math.random() * (canvas.height - 64));

}
var goldreset2 = function () {
	goldReady = true;//怪物2钱币刷新
	gold.x = x1+32;
	gold.y = y1+32;

}
var goldreset1 = function () {
	goldReady1 = true;//怪物2钱币刷新
	gold1.x = x2+32;
	gold1.y = y2+32;

}
// var fbreset = function () {//飞镖位置刷新
// 	fb.x = hero.x;
// 	fb.y = her0.y;
// }
var bgreset = function () {//背景
	if(gqs%2==0){
		bgImage.src = "images/background1.png";
		
		}else{
		bgImage.src = "images/background.png";}
}

// Update game objects
var update = function (modifier) {
	var hero_cx=2;
	if (38 in keysDown && hero.y >= 20) {
		hero.y -= hero.speed * modifier;
		hero_cx=1;
		heroImage.src = "images/hero_down.png";

	}
	if (40 in keysDown && hero.y <= 410) { // Player holding down
		hero.y += hero.speed * modifier;
		hero_cx=2;
		heroImage.src = "images/hero.png";
	}
	if (37 in keysDown && hero.x >= 20) { // Player holding left
		hero.x -= hero.speed * modifier;
		hero_cx=3;
		heroImage.src = "images/hero_left.png";
	}
	if (39 in keysDown && hero.x <= 468) { // Player holding right
		hero.x += hero.speed * modifier;
		hero_cx=4;
		heroImage.src = "images/hero_right.png";
	}
	// if (88 in keysDown) { // 按x丢出飞镖
	// 	fbs();
	// }


	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		var va=hero_hp.value;
		if(fanju=="yes")
		{hero_hp.value=va-5;}
		else
		{hero_hp.value=va-10;}
		x2=monster.x;
		y2=monster.y;
		if(wuqi=="yes"){
			hp1 = hp1 - 100;

		}else{hp1 = hp1 - 50;}
		
		if (hp1<=0) {
			var ex=hero_exp.value;//加经验
			hero_exp.value=ex+5;
			++monstersCaught;
			goldreset1();
			reset();
			hp1=100;
			var m1 = Math.round(Math.random())
			if (m1 == 0) {
				monsterImage.src = "images/monster.png";

			} else {
				monsterImage.src = "images/monster2.png";

			}

		} else {
			monster.x = 32 + (Math.random() * (canvas.width - 64));
			monster.y = 32 + (Math.random() * (canvas.height - 64));
		}

	}
	//怪物2击杀条件
	if (
	
		hero.x <= (monster2.x + 32)
		&& monster2.x <= (hero.x + 32)
		&& hero.y <= (monster2.y + 32)
		&& monster2.y <= (hero.y + 32)
	) {
		var va=hero_hp.value;
		if(fanju=="yes")
		{hero_hp.value=va-5;}
		else
		{hero_hp.value=va-10;}//扣血
		
		x1=monster2.x;
		y1=monster2.y;
		if(wuqi=="yes"){
			hp2 = hp2- 100;

		}else{hp2 = hp2- 50;}
		
		if (hp2<=0) {
		var ex=hero_exp.value;//加经验
		hero_exp.value=ex+5;	
		++monstersCaught;
		goldreset2();
		reset1();
		hp2=100;
		var m1 = Math.round(Math.random())
		if (m1 == 0) {
			monsterImage2.src = "images/monster.png";

		} else {
			monsterImage2.src = "images/monster2.png";

		}

		}
		else
		{
			monster2.x = 32 + (Math.random() * (canvas.width - 64));
		monster2.y = 32 + (Math.random() * (canvas.height - 64));
	}
		
	}
	//捡钱设定
	if (
	
		hero.x <= (gold.x + 32)
		&& gold.x <= (hero.x + 32)
		&& hero.y <= (gold.y + 32)
		&& gold.y <= (hero.y + 32)
	) {
		goldReady=false;
		gold.x=1000;
		gold.y=1000;
		var m1 = Math.round(Math.random()*50)
		qian=qian+m1;
	}
	if (
	
		hero.x <= (gold1.x + 32)
		&& gold1.x <= (hero.x + 32)
		&& hero.y <= (gold1.y + 32)
		&& gold1.y <= (hero.y + 32)
	) {
		goldReady1=false;
		gold1.x=1000;
		gold1.y=1000;
		var m1 = Math.round(Math.random()*50)
		qian=qian+m1;
	}
	//商人
	if (
	
		hero.x <= (trader.x + 32)
		&& trader.x <= (hero.x + 32)
		&& hero.y <= (trader.y + 32)
		&& trader.y <= (hero.y + 32)
	) {
		if(qian>=100){
			var hs=hero_hp.max;
			qian-=100;
			hero_hp.value=hs;
			srh="回复完毕";
			traderrest2();
			if(trader.y>20){
				trader.y-=50;
			}else{
				trader.y+=100;
			}
			
		}else {
			var cha=100-qian;
			srh=("穷鬼还差"+cha+"个金币");
			traderrest2();
			// srh=("花100金币回复HP");
		
		}
	}
};
function dadao(){//购买武器设定
	if(wuqi=="yes"){
		alert("你已经有武器了")

	}else{
		if(qian>=300){
			qian-=300;

			alert("购买成功")
			wuqi="yes";
	
		}if(qian<300)
		{var c=300-qian;
			alert("金币不足还需要"+c+"个金币")}
	}
	
	
}
function dun(){//购买防具设定
	if(fanju=="yes"){
		alert("你已经有防具了")

	}else{
		if(qian>=300){
			qian-=300;
			alert("购买成功")
			fanju="yes";
		}
		if(quan<300){
			var c=300-qian;
			alert("金币不足还需要"+c+"个金币")
		}

	}

}

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
		var a = document.getElementById("a");//hp条	
		ctx.font="10px Georgia";
		ctx.fillText("HP: " + hp1, monster.x-10, monster.y-50);
		a.style = "position: absolute;top:" + monster.y + "px;left:" + monster.x + 50 + "px;color:brown;width:50px;height:10px";
		a.value=hp1;
	}
	if (monsterReady2) {
		ctx.drawImage(monsterImage2, monster2.x, monster2.y);
		var a1 = document.getElementById("a1");//hp条	
		ctx.font="10px Georgia";
		ctx.fillText("HP: " + hp2,monster2.x-10, monster2.y-50);
		a1.style = "position: absolute;top:" + monster2.y + "px;left:" + monster2.x + 50 + "px;color:brown;width:50px;height:10px";
		a1.value=hp2;
	}
	if (goldReady) {
		ctx.drawImage(goldImage, gold.x, gold.y);
	}
	if (goldReady1) {
		ctx.drawImage(goldImage1, gold1.x, gold1.y);
	}
	if(traderReady){
		ctx.drawImage(traderImage, trader.x, trader.y);
	}
	if(fbReady){
		ctx.drawImage(fbImage, fb.x, fb.y);
	}
	// Score

	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("击杀数: " + monstersCaught, 32, 22);
	ctx.fillText("关卡数: " + gqs, 32, 60);
	ctx.fillText("目标是击杀: " + tj + "个小怪", 200, 22);
	ctx.fillText("金币: " + qian, 400, 430);
	ctx.font="10px Georgia";
	ctx.fillText(srh, trader.x, trader.y);
	if (monstersCaught == tj) {//通关设定
		monstersCaught = 0;
		gqs += 1;
		tj = tj + 3;
		srh=("花100金币回复HP");
		herozhix();
		traderrest();
		bgreset();
		reset();
		reset1();

	}
	var h=hero_hp.value;
	if(h==0){//死亡设定
		alert("你死了，你通过了"+gqs+"关，"+hero_lv.value+"级."+"剩下"+qian+"个金币没使用"+"你共有"+hero_hp.max+"点生命");
		if(gqs>10){
			alert("神级玩家，耐心爆表");

		}
		if(gqs>5){
			alert("高级玩家，很有耐心");

		}
		
		if(gqs>3){
			alert("一般玩家，普普通通");

		}
		if(gqs>0){
			alert("获得成就：菜鸡，菜的一批");

		}
		
	}
	//升级处理
	var ex=hero_exp.value;
	var ex_max=hero_exp.max;
	var hs=hero_hp.max;
	var dj=hero_lv.value;
	if(ex>=ex_max){
		hero_lv.value=dj++;
		hero_exp.max=ex_max+20;
		hero_hp.max=hs+10;
		hero_hp.value=hero_hp.max;
		hero_exp.value=0;
		hero_lv.value=dj++;

	}


};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
reset1();
herozhix();
traderrest();
main();
