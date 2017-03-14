window.addEventListener("load",function(){
	var navButton = document.getElementById("nav-icon1");
	var navBar = document.getElementById("navbar");


	// navButton.addEventListener("click",function(){
	// 	this.toggleClass('open');
	// });

	// $(document).ready(function() {
	// 	$('#nav-icon1').click(function() {
	// 		$(this).toggleClass('open');
	// 	});
	// });

	var navOpen = false; //placeholder of nav state, init as false

	navButton.addEventListener("click",function(){
		if (navOpen == false){
			navBar.style.top = "89px";
			this.classList.add('open')
			navOpen = true;
		} else {
			this.classList.remove('open')
			navBar.style.top = "0px";
			navOpen = false;			
		}

	});

});

