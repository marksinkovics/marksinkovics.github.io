---
layout: page
title: atlassian-cli
permalink: /projects/atlassian-cli
subtitle: "the \"missing\" command-line interface for Atlassian products :rocket:"
---
The main purpose of this project is to create a command-line interface (CLI) for Atlassian products (mainly Jira, Bitbucket and Confluence) in order to make possible other scripts (bash, python, etc.) to easily communicate and modify those products. 

This project is separated into 2 parts. The first would be a reusable pip package which would be used other python scripts, while the second part is a the actual terminal interfaces which are the followings:
 
* `jira-cli`: the CLI for Jira
* `bitbucket-cli`: the CLI for bitbucket
* `confluence-cli`: the CLI for Confluence

## Current status

* a CLI for Jira and Bitbucket are in development phase. A first version is available from GitHub
* The Jira CLI works properly in Cloud and server environment 
* The Bitbucket CLI works only in server environment
* Basic authentication is used during the communication with services

## Let's dive into the technical details

* Storing credentials :construction:
* Parsing json to objects :construction:
* Handling paging and loading :construction:
* Debug mode :construction:

__More information will be provided soon :construction:__


Source: [GitHub](https://github.com/marksinkovics/atlassian-cli)