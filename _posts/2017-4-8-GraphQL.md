---
title:  "GraphQL"
image: "/assets/pics/GraphQL.png"
---

What's that? Is it SQL?  Is it a graph?  Is it ... superman? Well the short answer is that GraphQL is pretty awesome.

GraphQL is an efficient query language for your API.  It creates a very intuitive syntax to _retrieve_ or _mutate_ your existing data, and using a specific utility opensourced by Facebook called <a href="http://github.com/facebook/dataloader">__Dataloader__</a> , it sends the minimum number of requests to the server. How does it accomplish all these things?  Take a look.

#### Describe your data. Ask for what you want. Get predictable results.

It's easy to see why GraphQL is _intuitive_ if you are remotely familiar with <a href="https://www.copterlabs.com/json-what-it-is-how-it-works-how-to-use-it/">JSON</a>.

JSON data looks like this:
{% highlight javascript %}

{
  "user": {
    "name": "Mike"
    "height": "182"
    "birthday": "495777602"
  }
}
{% endhighlight %}

In a nutshell, when you are implementing GraphQL, you are able to retrieve this info by mimicking this exact structure:

{% highlight javascript %}

{
  user(id: 3) {
    name,
    height,
    birthday
  }
}

{% endhighlight %}

How does this differ from, for example, some SQL query package, or Activerecord on Rails? Well for example to get the above: in a __users__ table SQL database, you might have something like this: <br>
<br>
 <code>SELECT * FROM 'Users' WHERE UserID=3</code>.
 <br>
 <br>
Then after recieving _all_ the column data, you have to use some method to extract _name_, _height_, and _birthday_. Otherwise, you would be using a SQL package, gem, or ActiveRecord to allow me to parse this data behind the scenes. In this specific example, it might boil down to something more like <br><br>

<code>SELECT name,height,birthday FROM 'Users' WHERE UserID=3</code>, <br><br>

 or perhaps multiple queries of a different form..

#### So how is GraphQL different?

The more complex your data is, the more data _requests_ are made to your backend.  If my data schema also included Mike's _friends_, or _comments_, or _comments of comments_, the data queries could get long, complex, and contain much repetition. The data __endpoints__ I might have to define could explode: (for example: "localhost:3000/users/3/comments_of_comments_of_comments/"). <br>
<br>
In <a href="http://github.com/facebook/dataloader#using-with-graphql">this example</a>, they cite an example where up to __13 database requests are made__, whereas the same example could make at __most__ 4 database requests with a GraphQL schema implementing <a href="http://github.com/facebook/dataloader">__Dataloader__</a>.  Dataloader a _read-through cache_ which sends the minimum number or reqeusts to the server.  In other words, if you sent 13 requests, but 9 of them were repeats, it would make sure to only send the 4 necessary requests.  This means _speed_ , _efficiency_ , and _simplicity_ are at the core.

#### How do I use it?

This is where I defer to better teachers than myself. There is an absolutely fantastic tutorial by Steven Luscher on implementing GraphQL in 3 different languages (Django, Ruby, Node) __<a href="https://www.youtube.com/watch?v=UBGzsb2UkeY">here</a>__ .  This is where teams or companies get hung up on GraphQL, because you need to do some intial set up to filter the results you want out of your __endpoints__.

#### Takeaways

- GraphQL allows you to evolve your API without versions. Add new fields to types without impacting existing queries. It allows continuous flow, encourage cleaner more maintainable server code.

- GraphQL is widespread- used by Facebook, Github, Pinterest, Intuit, Coursera, Shopify, Hudl.

- GraphQL lets you modify your frontend without changing your backend. Developers on one the front end team don't have to keep asking "favors" from the back end team.

#### Some Terms

__Operation__ - There are two types, _queries_ and _mutations_. <br><br>
__Query__ - the JSON shaped query that we introduced above.<br><br>
__Mutation__ - similar to Query, but takes arguments to modify server - side data. Returns modified JSON.<br><br>
__Selection__ - the information returned by a fetch (query or mutation)<br><br>
__Fields__ - each string in the JSON shaped query would be a field..<br><br>
__Arguments__ - Fields normally return values but can take arguments e.g. height(ft) or height(cm)<br><br>
__Alias__ - you can alias the fieldname in the case a field accepts arguments, and you would like to name two results from a field.<br><br>
__Fragments__ - A way to label and specify nested information.<br><br>
__Endpoints__ - A specific point in the API that allows the user to query the database. E.g. "user/1"<br><br>

#### Helpful links

<a href="https://www.youtube.com/watch?v=UBGzsb2UkeY">_Zero to GraphQL in 30 Minutes_</a> 

<a href="https://learngraphql.com/basics/introduction">_An intro to the basics of GraphQL, using GraphIQL_</a> 

<a href="http://facebook.github.io/graphql/">_The Facebook SPEC sheets for GraphQL, containing in depth coverage of everything_</a>





