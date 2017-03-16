---
title:  "On the Subject of Floats"
image: "/assets/float.jpg"
---

One of the more curious features of arranging elements through CSS.  Part of the mystery behind this display style may have something to do with it's name, especially if you are fairly new to developing in HTML and CSS.  

The name is cryptically general. You may begin to ask: "Should I think about a floated element as floating above the page? Is it floating to the top, or somewhere in the z-index?"  I aim to help answer these questions and more in this article.

As developers we tend to try things, and stick with what works, sometimes forgetting the actual _meaning_ and mechanics behind the tools we are using. With a name like float we can be left wondering how should I plan to use this tool?

A float is a display style, specifically to create a "wrapping" effect like you see in newspaper or magazine articles.  Let's start with an example. Say I have a block of text inside p tags.

Now to experiment, let me make a new div, give it some dimensions and a background color, and give it float left. Our html and css looks like this:

<code>
	insert code
</code>

And our screen will look like this.

Insert picture.

So what exactly did float do?  What did we expect it to do?  Well clearly this is not the way float has any effect.  Let's try putting our float div above our paragraph in our HTML:

insert picture.

Now we can see that our float clearly functions.  But the question is what exactly is the float doing?  Normally our paragraph is a block level element, which interrupts the page flow by taking up all the space it can.  Normally our div is a block level element, and these stack on each other.  What float essentially does is to kill the height of it's parent element, and allows the text to wrap around the floated element.

So we have our floated element.  Let's increase our height on our floated element so it extends below the text of the paragraph like this:

insert pic

our html and css look like this:

<code>
	insert code
</code>

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

