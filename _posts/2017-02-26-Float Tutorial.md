---
title:  "On the Subject of Floats"
image: "/assets/float.jpg"
---

Floats are one of the more style elements that we use as developers in CSS.  Part of the mystery behind this display style may have something to do with it's name, especially if you are fairly new to developing in HTML and CSS. ___Float___ seems ambiguous if no a little bit _magical_, doesn't it?

As developers we tend to try things, and stick with what works, sometimes forgetting the actual _meaning_ and mechanics behind the tools we are using.

A float is a display style, specifically to create a "wrapping" effect like you see in newspaper or magazine articles.  The best way is to illustrate with examples:

Lets make a new div, give it some dimensions and a background color, and give it float left. Our div looks like this:


<div style="height:30px;width:30px;background-color:blue;float:left;"></div>



 Wait how did this text get here! What's this about?



This must have something to do with our float... Our Code looks like this:


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

So what exactly did float do?  _What did we expect it to do?_  Here is an interesting tool you can experiment with.  In many browsers you can access developer tools and right click on any element on a webpage. At this time feel free to __right click on the blue square and select "inspect"__ .  In chrome, there should be a box that looks like this:

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

<div style="border: 1px solid black;width:300px; padding:5px; margin:10px">
	<div style="height:30px;width:30px;background-color:blue;float:left;"></div>
</div>

Now what is happening? This is wacky, right?<br><br>
Normally our blue div and it's thin bordered parent is a block level element.  Block level elements take up all the space it can, stretching across the page. What float essentially does is to kill the height of it's parent element!

Kill the height? Let me be specific: __At the point a floated element is introduced, it kills the _height_ property of it's parent, or container. This allows all other items to "float" upwards and fill the space around it.__

Easy right?  Let's fix it.  We could try this by defining a height of 40px maybe?  But see the problem?

<div style="border: 1px solid black;width:300px; height:30px; padding:20px; margin:10px" >
	<div style="height:30px;width:30px;background-color:blue;float:left;">
	</div>
			<p style="font-size:8px">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
			consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
			cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
			proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</div>
<br><br><br>

As a web-developer, it is bad form to define height on elements.  If I am trying to re-use this parent container across a template, the content of one article is not equal to the content of other articles, and this situation __above__ will happen.

So this is where __clearing floats__ comes into play.  Clearing floats is essentially a hack to re-initialize the height of an element. So we add 
<code>clear:left</code>
 to our stylesheet.

<div style="border: 1px solid black;width:300px; clear:left; padding:20px; margin:10px">
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


How does this magic work?  Essentially it is ___magic___.  What? Not satisfied with that answer?  Let's look at one other example.

<div style="border: 1px solid black;width:250px; padding:20px; margin:10px">
	<div style="height:50px;width:50px;background-color:red;float:left; margin:10px;">
	</div>
	<div style="height:20px;width:120px;background-color:blue;float:right; margin:10px;">
	</div>
	<p>some text some text</p>
</div>
<br>

Here we have a red div with __float:left__ and a blue dive with __float:right__ , and some text.  The text is rising up because it has not cleared the floated elements.

Applying __clear:both__ will have our "some text" start below the end of both divs, instead of wandering upwards.

<div style="border: 1px solid black;width:250px; padding:20px; margin:10px">
	<div style="height:50px;width:50px;background-color:red;float:left; margin:10px;">
	</div>
	<div style="height:20px;width:120px;background-color:blue;float:right; margin:10px;">
	</div>
	<p style= "clear:both">some text some text</p>
</div>
<br>

In closing:<br>
 __Clearing a Float re-initializes the height that was "killed" by initiating the float.  Thus all the elements after the cleared item will behave with normal height properties again.__
<br>
<br>


![css box](/assets/floatkid.jpg){: .center-image }



Hardly.  Floats, can cause unpredictable behavior when used unthinkingly.  Still, they fill a much needed gap in providing a text-wrapping effect for some really dynamic looking content. 


There is one additional common method to clearing floats:

The other method which is more complex is to create a css styling called clearfix.  We don't have to get too deep into understanding how it works, but it does.  Adding this to your CSS code :

<code>
	.clearfix::after {
    	content: "";
    	clear: both;
    	display: table;
	}
</code>

Then we add this class __"clearfix"__ to any parent element, or any element with floated children.  This will remove the need to clear for each individual child of the parent with __clearfix__ applied.  Sound confusing? I recommed researching it further and trying yourself.  Many developers in blog entries complain about CSS _clutter_, and this is many people's preferred method.  Making sure code is _legible_ and _semantic_ is one of the most important features of development, and this is one way to accomplish that.

In closing, there is nothing better than more examples for anyone with a persisting thirst for understanding.  Below I include a snippet from a great website called __CodePen__. This particular tool is an excellent demonstration. I highly recommend playing with it to understand multiple floated objects.

[CLICK HERE to try the CODEPEN FLOAT demo](https://codepen.io/sergelerner/full/jEWmbE/){:.plainlink}

Thank you, and happy coding!

