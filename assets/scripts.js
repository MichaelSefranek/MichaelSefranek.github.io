window.addEventListener("load",function(){
	var navButton = document.getElementById("navclick");
	var navBar = document.getElementById("navbar");

	var navOpen = false; //placeholder of nav state, init as false

	navButton.addEventListener("click",function(){
		if (navOpen == false){
			navBar.style.top = "89px";
			navOpen = true;
		} else {
			navBar.style.top = "0px";
			navOpen = false;			
		}

	});

});