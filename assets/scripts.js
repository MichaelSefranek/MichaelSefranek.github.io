window.addEventListener("load",function(){
	var navButton = document.getElementById("nav-icon1");
	var navBar = document.getElementById("navbar");
	var header = document.getElementById("header");
	var header_height_str = header.offsetHeight + "px"

	var navOpen = false; //placeholder of nav state, init as false

	navButton.addEventListener("click",function(){
		if (navOpen == false){
			navBar.style.top = header_height_str;
			this.classList.add('open');
			navOpen = true;
		} else {
			this.classList.remove('open');
			navBar.style.top = "0px";
			navOpen = false;			
		}

	});

});

