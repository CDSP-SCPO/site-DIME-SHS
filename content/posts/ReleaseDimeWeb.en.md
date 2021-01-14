---
title:  New important versions of the DIME-web tool
date:   2020-12-20T00:00:00
---
The imminent end of funding for DIME-SHS is an opportunity to finalize a certain number of developments. Some of the developments concerning the Dime Web instrument have been underway for many months on its main open source software, in order to perpetuate the work accomplished and stabilize  the tools  and their use  beyond the lifespan of the Equipex.


Three major new releases have been published in the last few days for Hyphe, Hyphe-Browser and Gazouilloire, and will be presented on February 6, 2021 at the FOSDEM international open source software conference in the [Open Research Tools & Technologies room](https://fosdem.org/2021/schedule/track/open_research_tools_and_technologies/).

The life of these tools does not end with Equipex, and the software will continue to be supported and improved in the future by the engineering team of the [médialab at Sciences Po](https://medialab.sciencespo.fr).

# Gazouilloire v1.0
Dime Web has developed the [Gazouilloire software](https://medialab.sciencespo.fr/outils/gazouilloire/) to allow the implementation of a longitudinal follow-up of Twitter over several months or years. Nearly 7 years after the development of its first prototype and the collection of several hundred million tweets for numerous research projects, Gazouilloire has reached its maturity with its [version 1.0](https://github.com/medialab/gazouilloire/releases)!

In addition to being very easy to use for developers with an [[installation and configuration that only takes a few minutes](https://pypi.org/project/gazouilloire/), this new version aims, above all, to sustain and stabilize the tool thanks to its upgrade to python3 (the current standard version of the language) and to simplify the handling, exploration and analysis of the large corpuses collected (thanks to the switch to the ElasticSearch data storage and indexing technology).

# Hyphe-Browser v2.0 & Hyphe v1.4
Since the release of its first full version in 2017, the web-crawling software for social sciences [Hyphe](https://hyphe.medialab.sciences-po.fr/) has continued to develop on a regular basis with numerous bug fixes reported by users, but also with the addition of new options, features and settings available with [Hyphe v1.4](https://github.com/medialab/hyphe/releases).

As announced in the DIME-SHS 2018 action plan, one of the challenges for Hyphe prior to the end of EquipEx was to facilitate its deployment in order to allow researchers to quickly access the tool, for a more or less short period of time, by making a financial contribution. This objective was achieved thanks to the implementation within Hyphe Browser of the possibility, when choosing the Hyphe server to connect to, of deploying a new server at a cloud host (OVH, CityCloud or VexxHost) at the user's expense in a few clicks, without having to call on the Dime Web team.

The Hyphe Browser complementary software allows users to browse the web while building its corpus with Hyphe; it also allows users to categorize its actors while visiting their web pages. It has been funded by [IDEFI FORCCAST](http://controverses.org/) in order to train students to use the web in social sciences as part of their controversy analysis courses. In addition to the option of deploying Hyphe instances on the cloud, its brand new [version 2.0](https://github.com/medialab/hyphe-browser/releases) has been completely redesigned, after considering the observations of users' experiences to make its use much more intuitive. Finally, this redesign has made the tool much more stable and fast, and has enriched it with many new features that will undoubtedly prove very useful for future research projects.
