---
title:  "On the Subject of Floats"
image: "/assets/float.jpg"
---

Floats are one of the more curious style features that we use as developers in CSS.  Part of the mystery behind this display style may have something to do with it's name, especially if you are fairly new to developing in HTML and CSS. ___Float___ seems a little bit magical, doesn't it?

As developers we tend to try things, and stick with what works, sometimes forgetting the actual _meaning_ and mechanics behind the tools we are using. With a name like float we can be left wondering how should I plan to use this tool?

A float is a display style, specifically to create a "wrapping" effect like you see in newspaper or magazine articles.  Let's start with an example. Say I have a block of text inside p tags.

Now to experiment, let me make a new div, give it some dimensions and a background color, and give it float left. Our div looks like this:


<div style="height:30px;width:30px;background-color:blue;float:left;"></div>



 Wait how did this text get here! What's this about?



Well regardless... Our Code looks like this:


{% highlight html %}
<div class = "little blue f_left"></div>
{% endhighlight %}

And our CSS:
{% highlight css %}

.little {
	height: 30px;
	width: 30px;
}
.blue {
	background-color:blue;
}
.f_left {
	
}
{% endhighlight %}

So what exactly did float do?  _What did we expect it to do?_  Here is an interesting tool you can experiment with.  In many browsers you can access developer tools and right click on any element on a webpage. At this time feel free to __right click on the blue square__ .  In chrome, there should be a box that looks like this:

![css box](/assets/stylebox.png)


You can see all the CSS styling applied to it, and you can _check_ and _uncheck_ elements.  __Play around with it!__ 
If you check and uncheck , you can see that float is having an interesting effect.  Normally our blue div would be a ___block___ level element.  Block level elements basically take up the width of the entire container they are in.  A floated element is ___changing___ the behavior of the other elements around it.

__Let's illustrate this some more.__  

Now I want to put a small thin border around this box. So I make a new div with some border styling.
My added code looks like this: 
{% highlight html%}
<div class = "little blue f_left">
	<div class = "black_border">
	</div>
</div>
{% endhighlight%}

{% highlight css %}

.black_border {
	border: 1px solid black;
	width: 100%;
	padding: 5px;
}
	
{% endhighlight %}

<div style="border: 1px solid black;width:100%; padding:5px; margin:10px">
	<div style="height:30px;width:30px;background-color:blue;float:left;"></div>
</div>

Now what is happening? This is wacky, right?<br><br>
Normally our blue div and it's thin bordered parent is a block level element.  Block level elements take up all the space it can, stretching across the page. What float essentially does is to kill the height of it's parent element!

Kill the height? Let me be specific: __At the point a floated element is introduced, it kills the _height_ property of it's parent, or container. This allows all other items to "float" upwards and fill the space around it.__

Easy right?  Let's fix it.  We could try this by defining a height of 40px maybe?  But see the problem?

<div style="border: 1px solid black;width:100%; height:30px; padding:20px; margin:10px" >
	<div style="height:30px;width:30px;background-color:blue;float:left;">
	</div>
			<p style="font-size:8px">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
			consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
			cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
			proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</div>
<br>

As a web-developer, it is bad form to define height on elements.  If I am trying to re-use this parent container across a template, the content of one article is not equal to the content of other articles, and this situation __above__ will happen.

So this is where __clearing floats__ comes into play.  Clearing floats is essentially a hack to re-initialize the height of an element. So we add 
<code>clear:left</code>
 to our stylesheet.

<div style="border: 1px solid black;width:100%; clear:left; padding:20px; margin:10px">
	<div style="height:30px;width:30px;background-color:blue;float:left;">
	</div>
			<p style="font-size:8px">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
			consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
			cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
			proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</div>
<br>


How does this magic work?  Essentially it is ___magic___.  No really, if you insist.  Let's look at one other example.

<div style="border: 1px solid black;width:30%; clear:both; padding:20px; margin:10px">
	<div style="height:30px;width:30px;background-color:blue;float:left; margin:10px;">
	</div>
	<div style="height:30px;width:30px;background-color:blue;float:right; margin:10px;">
	</div>
	<div style="height:30px;width:30px;background-color:blue; margin:10px;">
	</div>
</div>
<br>

![css box](/assets/floatkid.jpg){: .center-image }



Not so fast.  Let's imagine we have our article with a picture, and now we want a new paragraph.

Lets do it like this: 

Now say we are creating a website, and this was an article with a related picture, and you are now ready to display new article text below it.  Well this is what happenes when we add an identical paragraph below it.

insert pic

The new text is still weaving around the picture.  The companion to floating elements that fixes this problem is called "clearing" the float.  There are different methods of clearing a float, and I will cover two of the most basic ways.

The first is to make a div element with styling like this:

<code>
	div {
    	clear: left;
	}
</code>

and place the div element below our float.  What exactly does this do? Well in our floated element, we essentially killed the height of the parent element, so all future block elements try to stack as high as they can.  Clearing the float _reinitializes_ the height of the parent element.  This allows content below the clear item to be displayed normally again.

The other example which is more complex is to create a css styling called clearfix.  It is essentially a little "hack", and we don't have to get too deep into understanding how it works, but it does.  Adding this to your CSS code :

<code>
	.clearfix::after {
    	content: "";
    	clear: both;
    	display: table;
	}
</code>

Then we add this class "clearfix" to any parent element, or any element with floated children.  This will essentially clear the floated element immediately afterwards without the need for creating extra elements.

