---
layout: post
title:  "Perfection is Iteration"
date:   2015-12-15
description: "perfection is iteration"
categories: article
tags:
- lifestyle
---

## We are developers. We iterate.

I have a chronic roadblock: Perfection.

I strive for perfection. I desire it above all other things. I don't like looking back at previous work and thinking "ugh!".

This roadblock is bad enough when I'm pushing code to a private repository. It's significantly worse when I post to a public repository.

## Developer Psychology

> At its root, perfectionism isn’t really about a deep love of being meticulous. It’s about fear. Fear of making a mistake. Fear of disappointing others. Fear of failure. Fear of success.
>
> ― Michael Law

For me, this really is the root. Although I am meticulous and do strive for perfection, I let it jump in front of the emotional queue. At the surface this is a ridiculous emotion for a developer to feel. Over the two decades I have been coding I have hundreds of thousands of lines of code (maybe more) with my name attached.

I've often been questioned by a coworker about code and thought "ah, man, why did you have to look at *that* method". I've repsonded with a quick synopsys of the code and an apology that it was in a horrible condition that caused them to fix it. On a few occasions, it was actually really bad code and we all laughed it off as "one of those things that happens". However, more often than not, a comment block resembled "no not at all, I'm just having issues with [xyz] today".

The code block was fine as is, the bug might not have even been in that code. Yet I assumed that my code was bad and that I should feel bad for writing it.

I live in constant consternation. When will a light shine on a block of horrible code I wrote. Will a blog post get tossed on Reddit or Hacker News and I'll get raked over the coals for completely missing a fundamental rule of programming.

I've heard from friends and colleagues: "How do you release work to the public. That would scare me to death."

It does me too. But sometimes you just need to go, sometimes you just need to do.

## ADHD / OCD

In order to compound this, Darwin decided to implant into my DNA pretendency toward ADHD and OCD. One time (at least it was off the clock) I spent nearly an hour trying to decide on the best name for a variable for a block of code I was writing. Who knew a club sandwich would inspire such deep contemplation?

> Too many people spend too much time trying to perfect something before they actually do it. Instead of waiting for perfection, run with what you got, and fix it along the way…
>
> ― Paul Arden

Nothing has to be perfect out of the gate. We can always iterate something. Even after it's published, or pushed to production, we can iterate. This is the gift of modern technology.

There are a few instances in which we need to be extra careful up front, of course. For instance, this blog is published via RSS. When the code to generate these posts gets committed and pushed, the feed is regenerated. The feed subscribers get the updated post, as is, the next time they crawl the feed resource. There is no gaurantee if I update a given post that an RSS reader or feed service would ever pick up that modification.

There are, of course, ways around this. One way would be to take advantage of a feature allowing "drafts". If a draft can be presented publically, but not part of an official postings page or feed until officially published, you'd be able to present this draft to smattering of users for feedback. When satisfied, you can officially publish it with more confidence. (Traditional media has the concept of an editorial staff for this procedure.)

## Future Thoughts

We'll explore ways to minimize your risk and increase your confidence in the future. For today, I wanted to establish awareness of a potential emotional issue for knowledge workers.

As the primary function of this blog involves web development we will investigate a few options to support this workflow. Our first implementation will involve our jekyll codebase.