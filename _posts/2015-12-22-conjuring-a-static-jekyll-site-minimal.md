---
layout: post
title:  "Conjuring a Static Jekyll Site - A Minimal Buildable Product"
date:   2015-12-22
author: tricorius
description: “Conjuring a Static Website“
series: conjuring-a-static-jekyll-site
categories: article
tags:
- jekyll
- github-pages
---

In this article series we'll be utilizing the jekyll static site generation engine to conjure a typical blog-style website out of thin air. We will start with an empty shell, and slowly breathe life into it until it resembles something you might not be embarrassed to show your fellow adventurers.

Our first step is to create a directory to hold the code for the site. You may use your local machine (Windows users may have some challenges in this phase, if you do you can use a linux-based Cloud IDE like Cloud9 to ease your adventure).

I like to keep my code organized in a "code" subdirectory in my home directory. Inside code, I have subdirectories for all top-level git organizations I interact with (as an example, the code in this tutorial series is stored locally at ```~/code/knightsoftheoldcode/conjuring-a-static-jeckyll-website```). But feel free to locate yours wherever you want.

{% highlight bash %}
$ mkdir ~/code/knightsoftheoldcode/conjuring-a-static-jekyll-website
{% endhighlight %}

With a fresh new location to store our code, we want to install jekyll and ensure we can run it from within our code directory. I prefer to use a version manager to manage my Ruby installations in my workshop, but this isn't necessary. You *will* need to ensure Ruby and Bundler are installed and functional. (There are web resources to help with this.)

Once Ruby and Bundler are successfully installed, you should be able run ```bundle``` at the command line. With an empty code directory, this will return an error:

{% highlight bash %}
$ bundle
Could not locate Gemfile or .bundle/ directory
{% endhighlight %}

This simply means that we are missing a configuration file for the Bundler gem. We can easily create one tuned for jekyll (and later deployment to the free Github Pages service).

{% highlight bash %}
$ touch Gemfile
{% endhighlight %}

Fire up your favorite code editor and add the following to the new Gemfile.

{% highlight ruby %}
source 'https://rubygems.org'
gem 'github-pages'
{% endhighlight %}

Now, returning to the command line and running ```bundle``` again should download and install the proper gems.

{% highlight bash %}
$ bundle
Bundle complete! 0 Gemfile dependencies, 1 gem now installed.
Use `bundle show [gemname]` to see where a bundled gem is installed.
{% endhighlight %}

At this point, all the dependencies for jekyll (and the Github-Pages extensions which we will use in the future) have been installed and we should be able to run jekyll. There are various jekyll commands that we will investigate throughout our adventure, but we'll start with ```jekyll build```. This command will process your jekyll code directory and spit out a working static site in the ```_site``` directory.

{% highlight bash %}
$ jekyll build
Configuration file: none
            Source: /Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website
       Destination: /Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website/_site
      Generating... 
                    done.
 Auto-regeneration: disabled. Use --watch to enable.
{% endhighlight %}

The output of this command suggests that the ```_site``` directory was created, but also notes an issue: we have no configuration file. The standard jekyll config file is located in the root of the project and named ```_config.yml```.

{% highlight bash %}
$ touch _config.yml
$ jekyll build     
           WARNING: Error reading configuration. Using defaults (and options).
Configuration file: (INVALID) /Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website/_config.yml
            Source: /Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website
       Destination: /Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website/_site
      Generating... 
                    done.
 Auto-regeneration: disabled. Use --watch to enable.
{% endhighlight %}

Jekyll is (rightfully) complaining about invalid configuration settings. We haven't added any, ```touch``` just creates a blank file.

{% highlight ruby %}
# Welcome to Jekyll!
#
# This config file is meant for settings that affect your whole blog, values
# which you are expected to set up once and rarely need to edit after that.
# For technical reasons, this file is *NOT* reloaded automatically when you use
# 'jekyll serve'. If you change this file, please restart the server process.

# Site settings
title: A Conjured Jekyll Blog
email: merlin@knigdom.com
description: > # this means to ignore newlines until "baseurl:"
  This website arose from the depths of nothing, somewhat like the Lady of the Lake. Ok, nothing like that, really.
baseurl: "" # the subpath of your site, e.g. /blog
url: "http://aconjuredjekyllblog.com" # the base hostname & protocol for your site
twitter_username: merlin
github_username:  merlin

# Build settings
markdown: kramdown
{% endhighlight %}

Victory! Well, partial victory regardless. We haven't slayed any dragons yet, but the mystic forces are no longer sending us angry messages from the ether.

{% highlight bash %}
$ jekyll build
Configuration file: /Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website/_config.yml
            Source: /Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website
       Destination: /Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website/_site
      Generating... 
                    done.
 Auto-regeneration: disabled. Use --watch to enable.
{% endhighlight %}

Jekyll performed its tasks admirably. We have a ```_site``` directory with the Gemfile files in them. (These will be excluded in a future section since they don't need to be built into the static site.) Although, technically, jekyll is working, our present state doesn't give us much to look at.

![Jekyll Build...Kinda](/img/a-very-minimal-jekyll-directory-structure.png)

Almost every web server in the known planescape will render a file named ```index.html``` by default if no other file is requested.

{% highlight bash %}
$ touch index.html
$ jekyll build
Configuration file: /Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website/_config.yml
            Source: /Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website
       Destination: /Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website/_site
      Generating... 
                    done.
 Auto-regeneration: disabled. Use --watch to enable.
{% endhighlight %}

```index.html```:

{% highlight html %}
<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <!-- Place favicon.ico in the root directory -->

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.8.3.min.js"></script>
    </head>
    <body>
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
        <p>Hello world! This is HTML5 Boilerplate.</p>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.3.min.js"><\/script>')</script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='https://www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-XXXXX-X','auto');ga('send','pageview');
        </script>
    </body>
</html>
{% endhighlight %}

{% highlight bash %}
$ jekyll build
Configuration file: /Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website/_config.yml
            Source: /Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website
       Destination: /Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website/_site
      Generating... 
                    done.
 Auto-regeneration: disabled. Use --watch to enable.
{% endhighlight %}

You should now be able to double-click (or otherwise open the ```_site/index.html``` file in your browser of choice) and see a pretty basic webpage.

![A Minimal Viable Boilerplate](/img/html-boilerplate.png)

However, we still have those pesky Gemfile creatures hanging about.

```_config.yml```:

{% highlight ruby %}
# Welcome to Jekyll!
#
# This config file is meant for settings that affect your whole blog, values
# which you are expected to set up once and rarely need to edit after that.
# For technical reasons, this file is *NOT* reloaded automatically when you use
# 'jekyll serve'. If you change this file, please restart the server process.

# Site settings
title: Your awesome title
email: your-email@domain.com
description: > # this means to ignore newlines until "baseurl:"
  Write an awesome description for your new site here. You can edit this
  line in _config.yml. It will appear in your document head meta (for
  Google search results) and in your feed.xml site description.
baseurl: "" # the subpath of your site, e.g. /blog
url: "http://yourdomain.com" # the base hostname & protocol for your site
twitter_username: jekyllrb
github_username:  jekyll

# Build settings
markdown: kramdown

exclude: [Gemfile]
{% endhighlight %}

The added ```exclude:``` line indicates to jekyll that it should refrain from processing the comma-separated listing of files beetween the brackets. In this case, we are simply excluding a list of files matching the pattern Gemfile (this should remove both Gemfile and Gemfile.lock).

{% highlight bash %}
$ jekyll build
Configuration file: /Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website/_config.yml
            Source: /Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website
       Destination: /Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website/_site
      Generating... 
                    done.
 Auto-regeneration: disabled. Use --watch to enable.
{% endhighlight %}

This should give us a much more clean build.

![Jekyll Build...Kinda](/img/a-minimal-jekyll-directory-structure.png)

It's a little archaic to manually command jekyll to build after every change. We demand more excellence in our minions. Jekyll, fortunately, is built to serve.

{% highlight bash %}
$ jekyll serve            
Configuration file: /Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website/_config.yml
            Source: /Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website
       Destination: /Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website/_site
      Generating... 
                    done.
 Auto-regeneration: enabled for '/Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website'
Configuration file: /Users/tricorius/code/knightsoftheoldcode/conjuring-a-static-jekyll-website/_config.yml
    Server address: http://0.0.0.0:4000/
  Server running... press ctrl-c to stop.
{% endhighlight %}


<div class="panel panel-info">
  <div class="panel-heading">
    <h3 class="panel-title">A Wizard’s Workshop</h3>
  </div>
  <div class="panel-body">
    <p>A precautionary tale is in order. Regardless of how well you document your formulae in your spellbooks, no two wizards worth their weight in spell components build the same workshop.</p>
    <p>This article series was written locally on a MacBook Air running OS X 10.11 (El Capitan). If you are using a different operating system, the jekyll gem configuration and <code>jekyll serve …</code> commands will likely be slightly different.</p>
    <p>Common challenges include:</p>
    <ul class="list-unstyled">
    <li>Ruby Version Managers such as rbenv and RVM</li>
    <li>Firewalls which restrict available ports</li>
    <li>Command Line tools which slightly modify terminal commands</li>
    </ul>
    <p>None of these challenges are insurmountable, for a wizard wields unprecedented power over his environment. We just wanted you to be aware that in an uncontrolled environment <em>some</em> formulae may backfire and require input from the Order of Google.</p>
  </div>
</div>
