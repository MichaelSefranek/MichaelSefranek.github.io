---
title:  "Omaha Code School: From the Top"
image: "/assets/ocs.png"
date:   2017-03-13 10:44:01 -0600
---

Welcome to this page. I am making this as a future reference to myself, in the case I ever need to set up my own developer environment from scratch.  This is specifically for Mac OS environment, but could likely be adapted for other environments.

defaults write com.apple.Finder AppleShowAllFiles YES

The first thing we do is install Sublime Text 3.

Next thing we open Terminal to install Oh My Zsh
github.com/robbyrussell/oh-my-zsh#basic-installation

This is composed of some steps.  First ensure your system must be Unix-like (macOS or Linux)
Next Zsh must be installed.  My new MacBook Air has come with Zsh 5.2, so you can confirm this by typing in zsh —-version to confirm.  If not you can type sudo apt-get install zsh and let it crank.

github.com/robbyrussell/oh-my-zsh/wiki/Installing-ZSH

Curl or wget should be installed

Git should be installed

if you attempt to type git —-version you may get prompted by the command line to install developer tools

Trying this- I haven’t before it may produce unexpected results later. I didn’t select get Xcode, I selected install.  It may be a good idea to make sure there are no additional updates available to your computer before you do this.

Installing Xcode may not be necessary, or only necessary for Mac development.

Hitting install is sufficient, since Git is now installed.

Install Zsh via curl

Sh -c “$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)”

Interestingly at this point I tried to see what happened when I skipped this step.  I tried to create a symlink to Sublime Text 3 and there was no usr/local/bin directory.  We desperately need this to make our life more convenient, so the next step is to install

Homebrew.

htpps://homebrew.sh

This installs packages to their own directory and then symlinks their files into /usr/local

Then 
$ brew install rbenv
Then run
$rbenv init

Then add this line to the end of the ~/.zhrc file
eval “$rbenv init -)”

So to open it you can use our new handy tool
subl ~/.zshrc
And add it in there and save

Then rbenv install 2.4.0

then rbenv global 2.4.0 to set system defaul to 2.4.0 version

then rbenv rehash

rub rbenv rehash every time you install or switch to a new Ruby version
Verify by running ruby -v in Terminal

next i realized I need to set up github by setting my github username and password
This means getting your RSA key fingerprint and adding it to your github settings for your new device.

Do this basically:
https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/

https://github.com/bundler/bundler

brew install postgresql

bundle install for anything with a gemfile

otherwise install gems one by one

To install Postgres and the Ruby Postgres adapter:

brew install postgresql
gem install pg -- --with-pg-config=/usr/local/bin/pg_config

I am having trouble installing pg .
Not good.

So this was the issue, I had not run this initial command:

pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start

this manually starts the postgres server on your machine.

now I have a problem with bundler in my directory.
Nevermind, I had to run bundle install, and this solved everything now.  My directory is running.

lastly i need to setup git password to be cached

I tried this:
 git config --global credential.helper osxkeychain

Now i need git to remember my SSH password permanently:

ssh-add ~/.ssh/id_rsa &>/dev/null
trying this: 
it worked.
but apparently this adds it permanently after doing the first one
ssh-add -K ~/.ssh/id_rsa

install sublime text package control.

git config --global user.name "Your Name"
git config --global user.email you@example.com
