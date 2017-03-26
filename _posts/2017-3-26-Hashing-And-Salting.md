---
title:  "A Recipe for Encryption"
image: "/assets/hashbrowns.jpg"
---

Hashing and Salting? Sounds delicious, right? Well in the world of cracking passwords, nothing is more delicious than homemade salt.  What does this mean? Stay tuned. In tinkering with my instructors old Rails application I ran across a new term, and immediately became curious. "Salt"?  What is the significance to me as a web-developer?

![salt flats](/assets/bolivian_salt_flats.jpg){: .article_img }

Just like the _nearly infinite_ number of salt grains in these Bolivian flats, so should you consider the number of hackers trying to find security flaws in your web application when you are building it. The top article I found relating to password encryption using proper hashing and salt can be found here: 

[https://crackstation.net/hashing-security.htm](https://crackstation.net/hashing-security.htm){:.plainlink}

Crackstation covers this end to end, in great depth. Here are some important takeways for anyone starting out as web-developer:

* #### __What are Hashes and Salts? Why do they matter?__

Hashing is what it sounds.  Like the hashbrowns above, imagine our password starts as a potato.  This potato is diced _unrecognizably_ into a hash-brown.  And there is no way to turn it back into a potato, ever.  Unless you are capable of advanced potato cryptanalysis.

![mr potato](/assets/mr-potato-head.jpeg){: .article_img }

As for salting, it also fits thematically in our pototo allegory. Hashes are very difficult to turn back into password-potatoes, but hackers can index precomputed hashes of the same type and passwords to quickly crack them. __Salt__ is a little sprinkle of characters appended or prepended to the password which makes the resulting password hash completely different.  That way when two users decide to choose the ever-popular __"password"__ or, __"123456"__, the resulting password hashes will not be identical, since the salt for each user will be different!

With this information, I'll leave you with you with some final security takeaways for any web-development projects you decide to undertake:

* #### __Determine your security level needs at the beginning of the project.__

Is this just a toy-project where security will be glanced at and "played-with", but not really implemented for use? Is it a basic website that doesn't admit a user-login system?  If it uses a login system, what other information can be stored and accessed via that login path?  What universal standards exist for your security scenario that you should follow and what tools should you implement?

There are a lot of questions, but the idea is to ask them early on, to establish a clear precedent and goal for the final security implementation for your web-application

* ####  __If your application demands a high level of security, consult professionals.  Don't home-cook and burn your hash-browns.__

At every turn of web development, there may be temptations to use a home-made security algorithms such as hashing or salting.  First of all, these are _too easily flawed_, and we should always assume the "bad-guys" are going to be 10 times more clever, and faster than we can anticipate.  

Hackers can use complex,tried and tested methods to try and crack security. The most common methods are __dictionary__ or _brute force_ methods. Other methods are __lookup-tables__, __reverse tables__, and __rainbow tables__.  Brute force is a method of exhaustively trying _every_ combination of characters available.  Lookup tables are method of pre-computing passwords with hashes.  I'll leave it to the readers thirst for understanding to investigate these more, but suffice it to say, any lack of thorough security ___can and will be exploited___.

* #### __Use established methods and standards.__

This goes hand in hand with the last point.  Why should we re-invent the wheel, when there are established methods already easily included into our application?  If you do re-invent the wheel, do it on a seperate toy project, not on a feature for a paid client where security is critical.

The industry standard for salting is called CSPRNG, and the Crackstation article goes in more depth on how different frameworks can implement it. Find the one that fits your framework and your project. This ties also to the first point when you plan your project.

Lastly, the implementation of Salting and Hashing on your web project should look __exactly__ like this, according to Crackstation:

##### Storing

1. Generate Salt using CSPRNG
2. Prepend or Append Salt to password and Hash it using an _established Hashing algorithm_
3. Save the salt and the hash in the user database record.

##### Validating

1.  Retrieve user's salt and hash from the DB
2.  Prepend or Append Salt to the given password and hash using the same _established Hashing algorithm_
3. Compare the resulting hash with the DB hash you stored. If they match then the password is correct.

* #### Always use your hashing algorithm on the server side.  You can do it on both client and server sides, but if you only implement hashing on the client side, you are doomed.

<iframe src="//giphy.com/embed/l4Jz3a8jO92crUlWM" width="480" height="375" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="http://giphy.com/gifs/meme-steak-seasoning-l4Jz3a8jO92crUlWM">via GIPHY</a></p>

Congratulations! You are now a Salting/Hashing genious, just like our friend Nusret Gökçe is a master chef here.  __Just kidding, no you're not.. Go try it out!!__