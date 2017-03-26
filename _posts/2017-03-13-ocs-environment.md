---
title:  "A Mac OS Environment: From the Top"
image: "/assets/ocs_star.png"
---
I don't know how unusual my perspective is, but I actually enjoy setting up and debugging my developer environment from scratch. Recently my 2010 Mac and it's carefully constructed environment kicked the bucket. As a result I am making this as a future reference to myself.

I also wanted to make some notes on how everything ties together, and any mistakes that I made along the way.

{:.note}
_This is a a tutorial very specific to MacOS, but could be adapted for other environments. It is also specific to installing __Oh My Zsh__, __Ruby via Rbenv__, and __Postgresql__.  Skim through and make sure you want these elements, because this may not be the proper tool for you personally._
{:.done}

One of the first things I do on a brand new Mac is to open a terminal window and enter:<br>
<code>$ defaults write com.apple.Finder AppleShowAllFiles YES</code> [^1]<br>
into the command line. It is helpful during this process to see where all folders and files are, even if they are hidden by default.

Somewhere along the journey you will need a text editor. Personally I have chosen [Sublime Text 3](https://www.sublimetext.com/3), I have heard that [Atom](https://atom.io/) is also good, thought slightly slower.

Next I want to install Oh My Zsh! First we need to make sure that all of these are installed: __Zsh, git, and Curl _or_  wget__.

__Zsh__ should be installed on Mac by default.  My new MacBook has come with Zsh 5.2.[^n] If you don't for some reason, you can install it [here](github.com/robbyrussell/oh-my-zsh/wiki/Installing-ZSH).

__Curl__ is another tool which should already be installed on a mac. It basically grabs or sends data to/from a server (using one of many data protocols).

__Git__ on MacOS was not installed by default on mine. If you type in <code>$ git --version</code> you may be prompted to install Xcode developer tools on Mac. I selected "install". It may be a good idea to make sure your OS doesn't have any pending updates before doing this. After this installs, you can confirm git has been installed with another <code>$ git --version</code>

{:.note}
__Note:__ _If you are ever unsure about a component of your install you can always type_ <br>
<code>$&lt;component&gt; -v</code>... _or in this specific case_ <code>$ curl --version</code>.<br>
<br>
 _If you are ever unsure about __where__ a component is installed, you can try typing_ <br>
 <code>$ which &lt;component&gt;</code>
{:.done}

[Install Oh my Zsh here](https://github.com/robbyrussell/oh-my-zsh#basic-installation).

As it states on Robby Russel's site, the next step is: <br>

<code>$ Sh -c “$ (curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)”</code>

Time to admit mistakes! At this point I tried to skip a step in my procedure. Namely: I wanted to open files with a handy shortcut that allows me to type <code>$ subl &lt;any_file&gt;</code> to open it in sublime text. The problem is that I needed to make a symbolic link between the subl executable file, and typing "subl" in the console.  Simple right?

The problem is that I was copy pasting a command that required me to make a symbolic link in usr/local/bin, and I missed an essential step, to install Homebrew, which heavily affects interaction with this directory.

Homebrew basically makes life easier for installation of packages, so that they can be installed in their own directory, and then symbolically linked into /usr/local. My previous step must have been dependant on this, because Mac threw out a complaint that I didn't have permission.  After installing Homebrew it was Easy Peazy.

Homebrew can be installed [here](https://brew.sh/).
If you are on Linux and trying to mimic this setup you will have to look at Linux brew, since Homebrew is MacOS specific, however there may be other better options for Linux.

After Homebrew is installed you should be able to make the shortcut to Sublime Text:

<code>$ ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/subl</code>

Next we get more specific, since an important part of class is learning Ruby, we use a Ruby manager called rbenv. This manages ruby versions, and gems and their interconnections, to put it very simply. <br>
Run <code>$ brew install rbenv</code><br>
Then<code>$rbenv init</code><br>

And so you don't have to do this every new Terminal session, you need to add this code to the end of your .zhrc file.  You may ask yourself where this file is, and it _is_ a little hard to spot just digging around. It is hiding in the home directory. If you have done everything previously you should be able to type <code>subl ~/.zshrc</code> and it should open.  Go to the very last line and type <code>eval "$(rbenv init -)"</code> exactly. Save and close and then close terminal.

Open a new terminal and type in:<code>$ rbenv rehash</code>. This is a command that basically rebuilds connections called shims between rbenv and everything associated with it.  It is a good idea to run rbenv rehash every time you install or switch to a new Ruby version.

Install ruby by typing <code>$ rbenv install 2.4.0</code> and let it run.

When it finishes run <code>$ rbenv global 2.4.0</code> to set the global version of ruby. So then <code>$ rbenv rehash</code> again.

This is all good and well right? But to access github repositories, there is a little more work to do. This means getting your RSA key fingerprint and adding it to your github settings for your new device.

There are good instructions on doing this [here](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)

Make sure to run these:

<code>
$ git config --global user.name "Your Name"<br>
$ git config --global user.email you@example.com
</code>

Another issue I ran into was that github would continue asking for my password repeatedly when I was cloning my repositories.  This was a minor annoyance but fixable:
These commands helped to fix this issue by caching my password:

<code>
 $ git config --global credential.helper osxkeychain <br>
 $ ssh-add -K ~/.ssh/id_rsa	
</code>


A great way to manage ruby and your projects is to use bundler.  That way when you are getting up to speed from a new device, you can do a bundle install from the directory your project is in.

Install bundler [here](https://github.com/bundler/bundler)

For my previous database setup, I had to <code>$ brew install postgresql</code>. I ran into issues later with postgres and the ruby pg gem.  The gem is installed via <code>gem install pg -- --with-pg-config=/usr/local/bin/pg_config</code>. 

It turns out I had forgotten to run this initial command: 
<code>$ pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start</code>
Which manually initializes the postgresql server, and allowed me to recreate the databases I had running from my previous projects.

{:.note}
__Other reminders:__<br>
_-If using Sublime Text, Install sublime text package control._ <br>
_-Make sure that you make Sublime Text your editor for Git, instead of the default VIM:_ <br>
<code>git config --global core.editor "subl"</code>

{:.done}

[^1]: The "$" convention will be used here, whenever you see this character, it simply indicates a command to type in Terminal, not to actually type "$" itself.

[^n]: Zsh is a command shell, which means that it is an interface set up for the user to type commands directly to the user. Zsh is a succesor to Bash, which is a successor to Sh, which has been around since 1977!
