window.addEventListener("load",function(){
	var navButton = document.getElementById("nav-icon1");
	var header = document.getElementById("header");
	var nav = document.getElementById("nav-container");
	var header_height_str = header.offsetHeight + "px"


	var navOpen = false; //placeholder of nav state, init as false

	navButton.addEventListener("click",function(){
		if (navOpen == false){
			nav.style.left = "-225px";
			this.classList.add('open');
			navOpen = true;
		} else {
			nav.style.left = "9999px";
			this.classList.remove('open');
			navOpen = false;			
		}

	});

});