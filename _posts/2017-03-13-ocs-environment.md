---
title:  "A Mac OS Environment: From the Top"
image: "/assets/ocs.png"
date:   2017-03-13 10:44:01 -0600
---
I don't know how unusual my perspective is, but I actually enjoy setting up and debugging my developer environment from scratch. Recently my 2010 Mac and it's carefully constructed environment kicked the bucket. As a result I am making this as a future reference to myself. Perhaps it may be useful to other coders or students.

I also wanted to make some notes on how everything ties together, and any mistakes that I made along the way. This is specifically for Mac OS environment, but could likely be adapted for other environments.

One of the first things I do on a brand new Mac is to open a terminal window and enter:<br>
<code>$ defaults write com.apple.Finder AppleShowAllFiles YES</code> [^1]<br>
into the command line. It is helpful during this process to see where all folders and files are, even if they are hidden by default.

Somewhere along the journey you will need a text editor. Personally I have chosen [Sublime Text 3](https://www.sublimetext.com/3), I have heard that [Atom](https://atom.io/) is also good, thought slightly slower.

Next we need to install Oh My Zsh! You need to have a Unix-like system (macOS or Linux).

[Install Oh my Zsh here](https://github.com/robbyrussell/oh-my-zsh#basic-installation).

Notice the Github page says you need all of these: Zsh, Curl or wget, and git.

Zsh should be installed on Mac by default.  My new MacBook has come with Zsh 5.2.[^n] If you don't for some reason, you can install it [here](github.com/robbyrussell/oh-my-zsh/wiki/Installing-ZSH).

I installed Oh My Zsh! using Curl; another tool which should already be installed on a mac. It basically grabs or sends data to/from a server (using one of many data protocols).

{:.note}
_Note: If you are ever unsure about a component of your install you can always type_ <br>
<code>$&lt;component&gt; -v</code>... _or in this specific case_ <code>$curl --version</code>.<br>
<br>
_Note: If you are ever unsure about __where__ a component is installed, you can try typing_ <br>
 <code>$which &lt;component&gt;</code>
{:.done}

Lastly, if you type in <code>$ git --version</code> you may be prompted to install Xcode developer tools on Mac. I selected "install". It may be a good idea to make sure your OS doesn't have any pending updates before doing this. After this isntalls, you can confirm git has been installed with another <code>$ git --version</code>

As it states on Robby Russel's site, the next step is: <br>

<code>$ Sh -c “$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)”</code>

Time to admit mistakes! At this point I tried to skip a step in my install. Namely: I wanted to open files with a handy shortcut that allows me to type <code>$ subl &lt;any_file&gt;</code> to open it in sublime text. The problem is that I needed to make a shortcut (or symbolic link) between the subl executable file, and typing "subl" in the console.  Simple right?

The problem is that this required me to make a symbolic link to usr/local/bin, and I missed an essential step, to install Homebrew.

Homebrew can be installed [here](htpps://homebrew.sh).
If you are on Linux and trying to mimic this setup you will have to look at Linux brew.

Homebrew basically makes life easier for installation of packages, so that they can be installed in their own directory, and then symbolically linked into /usr/local. My previous step was dependant on this step for sure.

After Homebrew is installed you should be able to make the shortcut to Sublime Text:

<code>$ ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/subl</code>

Next we get more specific, since an important part of class is learning Ruby, we use a Ruby manager called rbenv. This manages ruby versions, and gems and their interconnections, to put it very simply. <br>
Run <code>$ brew install rbenv</code><br>

<code>
$rbenv init
</code><br>
And so you don't have to do this every new Terminal session, you need to add this code to the end of your .zhrc file.  You may ask yourself where this file is, and it _is_ a little hard to spot. It is hiding in the home directory. If you have done everything previously you should be able to type <code>subl ~/.zshrc</code> and it should open.  Go to the very last line and type <code>eval "$(rbenv init -)"</code> exactly. Save and close and then close terminal.

Open a new terminal and type in:<code>$ rbenv rehash</code>

This is a command that basically rebuilds connections called shims between rbenv and everything associated with it.  It is a good idea to run rbenv rehash every time you install or switch to a new Ruby version.

Install ruby by typing <code>$ rbenv install 2.4.0</code> and let it run.

When it finishes run <code>$ rbenv global 2.4.0</code> to set the global version of ruby. So then <code>$ rbenv rehash</code> again.

This is all good and well right? But to access github repositories, which means doing some more configuration. This means getting your RSA key fingerprint and adding it to your github settings for your new device.

There are good instructions on doing this [here](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)

Make sure to run these:

<code>
$ git config --global user.name "Your Name"<br>
$ git config --global user.email you@example.com
</code>

Another issue I ran into was that github would continue asking for my password repeatedly when I was cloning my repositories.  This was a minor annoyance but fixable:
These commands helped to fix this issue by caching my password:

<code>
 $ git config --global credential.helper osxkeychain
 $ ssh-add -K ~/.ssh/id_rsa	
</code>


A great way to manage ruby and your projects is to use bundler.  That way when you are getting up to speed from a new device, you can do a bundle install from the directory your project is in.

Install bundler [here](https://github.com/bundler/bundler)



For me, I had to <code>$ brew install postgresql</code> to get my sequel database running again, and I ran into issues later with postgres and the ruby pg gem.  The gem is installed via <code>gem install pg -- --with-pg-config=/usr/local/bin/pg_config</code>. 

It turns out I had forgotten to run this initial command: 
<code>$ pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start</code>
Which manually initializes the postgresql server, and allowed me to recreate the databases I had running from my previous projects.


install sublime text package control.

[^1]: The "$" convention will be used here, whenever you see this character, it simply indicates a command to type in Terminal, not to actually type "$" itself.

[^n]: Zsh is a command shell, which means that it is an interface set up for the user to type commands directly to the user. Zsh is a succesor to Bash, which is a successor to Sh, which has been around since 1977!
