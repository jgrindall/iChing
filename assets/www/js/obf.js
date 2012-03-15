if (!Array.prototype.indexOf){
  Array.prototype.indexOf = function(elt /*, from*/){
    var len = this.length;
    var from = Number(arguments[1]) || 0;
    from = (from < 0)	? Math.ceil(from): Math.floor(from);
    if (from < 0){
		from += len;
	}
    for (; from < len; from++){
      if (from in this && this[from] === elt){
			return from;
		}
    }
    return -1;
  };
}



	var $turn = 0;
	var $totalscore = 0;
	var $vis = false;
	var $numleft = 0;
	var $numright = 0;
	var $throws = new Array();
	var $side=0;
	var $myScroll;
	var $NUM0;
	var $NUM1;
	var $changing = new Array();
	
	function loaded() {
				setTimeout(function () {
						//alert("loaded");
						$myScroll = new iScroll('wrapper');
				}, 1000);
	}
	
	
	window.addEventListener('load', loaded, false);


	
	var lookup=[63,	0,	17,	34,	23,	58,	2,	16,	55,	59,	7,	56,	61,	47,	4,	8,	25,	38,	3,	48,	41,	37,	32,	1,	57,	39,	33,	30,	18,	45,	28,	14,	60,	15,	40,	5,	53,	43,	20,	10,	35,	49,	31,	62,	24,	6,	26,	22,	29,	46,	9,	36,	52,	11,	13,	44,	54,	27,	50,	19,	51,	12,	21,	42];
	

	function closeIt(){
		$("#float").css('display','none');
		$("#container").css('display','block');
		$('#changinginfo').empty();
	}
	
	function results(){
		$("#button").attr("src","img/reset.png");
		$side = 0;
		loadBars();
		$NUM0 = getNum($numleft);
		$NUM1 = getNum($numright);
		loadText();
		setVis();
		setNum();
		loadPopup();
		
	}
	function loadBars(){
		for(var $i=0;$i<=5;$i++){
			var $t = $throws[$i];
			var $rleft = $("#rleft"+$i);
			var $rright = $("#rright"+$i);
			$rleft.attr("src","img/"+getLeftSrc($t)+".png");
			$rright.attr("src","img/"+getRightSrc($t)+".png");
		}
		
	}
	
	function loadPopup(){
		$("#float").css('display','block');
		$("#container").css('display','none');
	}
	function getNum($i){
		$L = lookup.indexOf($i);
		//alert("look up "+$i+" is "+$L);
		return $L;
	}
	function setNum(){
		$("#num0").text($NUM0+1);
		$("#num1").text($NUM1+1);
	}
	function setVis(){
		var $visstring;
		if($vis==true){
			
			$("#firstlines").css('marginLeft','0px');
			$("#num0").css('marginLeft','0px');
			$visstring = 'block';
		}
		else{
			
			$("#firstlines").css('marginLeft','130px');
			$("#num0").css('marginLeft','125px');
			$visstring = 'none';
		}
		
		$("#hide0").css('display', $visstring);
		$("#hide1").css('display', $visstring);
		$("#num1").css('display', $visstring);
		$("#buttonright").css('display', $visstring);
		
	}
	function loadText(){
		var $obj0 = getObj($NUM0+1);
		var $obj1 = getObj($NUM1+1);
		$("#title").text($obj0.title);
		$("#line").text($obj0.line);
		if($changing.length>=1){
			$("#titleright").text($obj1.title);
			$("#lineright").text($obj1.line);
		}
		else{
			$("#titleright").text("");
			$("#lineright").text("");
		}
		
		for($i=0;$i<=5;$i++){
			if($changing.indexOf($i)==-1){
				
			}
			else{
				// changing, add a paragraph.
				// alert($i +" is changing");
				$id = "pinfo"+$i
				$('#changinginfo').append('<p id="'+$id+'"></p>');
				$("#"+$id).addClass("pii");
				$("#"+$id).text($obj0.nodes[$i]);
			}
		}
		
		
		addScroll();
				
		
	}
	function addScroll(){
		try{
			$myScroll.refresh();
		}
		catch(e){
			$myScroll = new iScroll('wrapper');
		}
		setTimeout(function () {$myScroll.refresh();}, 500);
	}
	function reset(){
		$turn = 0;
		$numleft = 0;
		$numright = 0;
		$vis = false;
		$totalscore = 0;
		var $side = 0;
		updateText();
		$("#left5").attr("src","img/empty.png");
		$("#left4").attr("src","img/empty.png");
		$("#left3").attr("src","img/empty.png");
		$("#left2").attr("src","img/empty.png");
		$("#left1").attr("src","img/empty.png");
		$("#left0").attr("src","img/empty.png");
		$("#right5").attr("src","img/empty.png");
		$("#right4").attr("src","img/empty.png");
		$("#right3").attr("src","img/empty.png");
		$("#right2").attr("src","img/empty.png");
		$("#right1").attr("src","img/empty.png");
		$("#right0").attr("src","img/empty.png");
		$("#button").attr("src","img/throw.png");
		$("#coin0").attr("src","img/noside.png");
		$("#coin1").attr("src","img/noside.png");
		$("#coin2").attr("src","img/noside.png");
		
		$throws   = new Array();
		$changing = new Array();
	}
	function throwIt(){
		
		if($turn==6){
			results();
			$turn++;
			return;
		}
		else if($turn==7){
			reset();
			return;
		}
		playIt();
		$turn++;
		updateText();
		if($turn==6){
			$("#button").attr("src","img/show.png");
		}
	}
	function updateText(){
		$("#turn").text(""+(6-$turn));
	}
	function getHT($r){
		if($r<0.5){
			return "heads";
		}
		else{
			return "tails";
		}
	}
	function playIt(){
		var $c0 = Math.random();
		var $c1 = Math.random();
		var $c2 = Math.random();
		setImgs($c0,$c1,$c2);
		setBars($c0,$c1,$c2);
	}
	function getTot($c0, $c1, $c2){
		var $t = 0;
		$t += getAdd($c0);
		$t += getAdd($c1);
		$t += getAdd($c2);
		return $t;
		
	}
	function getMessage($c0, $c1, $c2){
		return ""+getHT($c0)+","+getHT($c1)+","+getHT($c2);
	}
	function getAdd($r){
		if(getHT($r)==="tails"){
			//alert("2");
			return 2;
		}
		else{
			//alert("3");
			return 3;
		}
	}
	
	function setBars($c0, $c1, $c2){
		var $tot = getTot($c0, $c1, $c2);
		$totalscore+=$tot;
		$throws[$turn]=$tot;
		setBarImg($tot);
	}
	function getLeftSrc($t){
		if($t==6){
			return "serratedch";
		}
		else if($t==7){
			return "long";
		}
		else if($t==8){
			return "serrated";
		}
		else if($t==9){
			return "longch";
		}
	}
	function getRightSrc($t){
		//alert("get right for "+$t);
		if($t==6){
			return "longch";
		}
		else if($t==7){
			return "long";
		}
		else if($t==8){
			return "serrated";
		}
		else if($t==9){
			return "serratedch";
		}
	}
	function addChangingLine(){
		$changing[$changing.length] = $turn;
	}
	function setBarImg($t){
		var $left = $("#left"+$turn);
		var $right = $("#right"+$turn);
		var $lsrc = getLeftSrc($t);
		var $rsrc = getRightSrc($t);
		if($t==6){
			$numright += Math.pow(2,$turn);
			// 6 changes to 7
			addChangingLine();
		}
		else if($t==7){
			$numleft += Math.pow(2,$turn);
			$numright += Math.pow(2,$turn);
		}
		else if($t==9){
			$numleft += Math.pow(2,$turn);
			// 9 changes to 8
			addChangingLine();
		}
		if($t==9 || $t==6){
			$vis = true;
		}
		$left.attr("src","img/"+$lsrc+".png");
		$right.attr("src","img/"+$rsrc+".png");
	}
	function setImgs($c0,$c1,$c2){
		setImg(0,  getHT($c0) );
		setImg(1,  getHT($c1) );
		setImg(2,  getHT($c2) );
		
	}
	function setImg($i, $side){
		//alert("set img "+$i+"  "+$side);
		var $id = "coin"+$i;
		var $c = $("#"+$id);
		$src = "img/"+$side+".png";
		$c.attr("src",$src);
		
	}
	
