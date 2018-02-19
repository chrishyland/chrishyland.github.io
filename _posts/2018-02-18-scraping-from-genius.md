---
title: Scraping lyrics from Genius API
date:   2018-02-18 09:00:00
layout: post
tag:
- Computer Science
- Data Science
category: blog
author: chrishyland
description: My own productivity tools.
---

## Introduction

Curious on analysing lyric content of your favourite artist? Well keep on reading! In this post I will show you how I went about scraping lyrics from the Genius API to get the lyrics of all the songs by the great Kanye West.

<img src="/assets/genius-api-post/yeezy.jpg" alt="Drawing" align="middle" style="width: 200px;"/>


### "If I have seen further than others, it is by standing upon the shoulders of giants."

Alot of content in this post was my compilation of many different sources which I must acknowledge.

Without further ado, let's get into it!

## Getting Started

All the code from the project can be found [here](https://github.com/ANOVAProjectUSYD/lyrics-analysis), which requires Python3. The libraries used can be found [here](https://github.com/ANOVAProjectUSYD/lyrics-analysis/blob/master/requirements.txt).

## Beginning

First, I found the id that genius assigns to Kanye West which will make later retrieval of information simpler. You can also query Genius to find out the id of any other artist you would like to use.

## Scraping Away

First, I've scraped all the ids of the Yeezy's songs. It is important to note that the Genius API uses _pagination_ when returning results. The way I personally like to think about it is that the API will give you a list of a certain number of songs (let's say 15) to prevent you from getting all the hundreds of songs Kanye has produced.

```python
def get_song_id(artist_id):
    '''Get all the song id from an artist.'''
    current_page = 1
    next_page = True
    songs = [] # to store final song ids

    while next_page:
        path = "artists/{}/songs/".format(artist_id)
        params = {'page': current_page} # the current page
        data = get_json(path=path, params=params) # get json of songs

        page_songs = data['response']['songs']
        if page_songs:
            # Add all the songs of current page
            songs += page_songs
            # Increment current_page value for next loop
            current_page += 1
            print("Page {} finished scraping".format(current_page))
            # If you don't wanna wait too long to scrape, un-comment this
            # if current_page == 2:
            #     break

        else:
            # If page_songs is empty, quit
            next_page = False
```

Note that the get_json function can be found [here](https://github.com/ANOVAProjectUSYD/lyrics-analysis/blob/master/search.py) and simply makes a request to grab the data. The data return will be of a JSON or Javascript Object Notation format. For those who has coded in any objected oriented languages such as Java, just think of objects being returned whereby you can access particular fields for pieces of information you are looking for. For example, if we were returned a Pokémon object, we can access the name field in order to grab the name of the Pokémon. From the page data returned to us, we can access the _response_ field and then access the _songs_ field. From this field, we can grab all the songs on the page by Yeezy. We can then check whether is there a subsequent page and then grab the data from that continuously until we have exhausted all the pages.

```python
    # Get all the song ids, excluding not-primary-artist songs.
    songs = [song["id"] for song in songs
            if song["primary_artist"]["id"] == artist_id]
```            

Afterwards, we can get all the songs' ids and store that for further use. We could simply scrape the lyrics from this but we thought to have a little fun taking the longer route.

## Scraping Lyrics

```python
song_lyrics = [retrieve_lyrics(song_id) for song_id in songs_ids]
```

Now we can simply store all the lyrics from the songs in a dictionary. Let's explore the retrieve_lyrics functions further.

```python
def retrieve_lyrics(song_id):
    '''Retrieves lyrics from html page.'''
    path = connect_lyrics(song_id)

    URL = "http://genius.com" + path
    page = requests.get(URL)

    # Extract the page's HTML as a string
    html = BeautifulSoup(page.text, "html.parser")

    # Scrape the song lyrics from the HTML
    lyrics = html.find("div", class_="lyrics").get_text()
    return lyrics
```

The argument passed into the function is the id of the song whose lyrics we wish to scrape. The function connect_lyrics simply creates the the URL path of the song on the Genius website.

```python
def connect_lyrics(song_id):
    '''Constructs the path of song lyrics.'''
    url = "songs/{}".format(song_id)
    data = get_json(url)

    # Gets the path of song lyrics
    path = data['response']['song']['path']

    return path
```

From that, we can simply request the URL and using the (amazing) [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/) library, we can simply access the lyrics which is in the div tag with the lyrics class. We can then apply the BS4 function to extract the raw text and then return it to be stored in the list we defined earlier.

## Conclusion

Voila! Hope that helps and this sort of methodology of scraping can be applied to many other APIs which I have had the fortunate experience to play with such as the Facebook Graph API and more!
