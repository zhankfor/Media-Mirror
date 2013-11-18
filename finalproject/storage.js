/*******************
*
* © Solomon Klein, 2013
* CS50x, Harvardx University, edX.org
* storage.js
*
* Declares variables in localStorage for the site counters. Remember that
* localStorage can only store strings, so anything retrieved from it must have
* parseInt() called on it in order to use it for any constructive purpose.
*
********************************************************************************************/


// new york times
if (localStorage.getItem('nyt') == undefined || localStorage.getItem('nyt') == NaN) 
{
    localStorage.setItem('nyt', 0);
}

// fox news
if (localStorage.getItem('fox') == undefined || localStorage.getItem('fox') == NaN) 
{
    localStorage.setItem('fox', 0);
}

// huffington post
if (localStorage.getItem('huffpo') == undefined || localStorage.getItem('huffpo') == NaN) 
{
    localStorage.setItem('huffpo', 0);
}

// cnn
if (localStorage.getItem('cnn') == undefined || localStorage.getItem('cnn') == NaN) 
{
    localStorage.setItem('cnn', 0);
}

// nbc
if (localStorage.getItem('nbc') == undefined || localStorage.getItem('nbc') == NaN) 
{
    localStorage.setItem('nbc', 0);
}

// wapo
if (localStorage.getItem('wapo') == undefined || localStorage.getItem('wapo') == NaN) 
{
    localStorage.setItem('wapo', 0);
}

// usa today
if (localStorage.getItem('usa') == undefined || localStorage.getItem('usa') == NaN) 
{
    localStorage.setItem('usa', 0);
}

// abc
if (localStorage.getItem('abc') == undefined || localStorage.getItem('abc') == NaN) 
{
    localStorage.setItem('abc', 0);
}







