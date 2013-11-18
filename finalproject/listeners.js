/*********************
*
* © Solomon Klein, 2013
* CS50x, Harvardx University, edX.org
* listeners.js
* 
* Contains the listeners that register and record when an article is read on the eight 
* supported news sites.
*
************************************************************************************************/


// "include" declarations for localStorage (in storage.js)
document.write('<script type="text/javascript" src="storage.js"></script>');


/***************
*
*   TITLE-BASED CHECK FOR NEW YORK TIMES.
*
***************************************************************************************/

// get title of updated tab, increment if it has "NYTimes.com" in it (crude equivalent for article)
// potentially i could work out how to make multi-page articles only count once
chrome.tabs.onUpdated.addListener(function(url, changeInfo, Tab)
{
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(array_of_Tabs) 
    {
        var tab = array_of_Tabs[0];
    
        var title = tab.title;
        
        // if it's an article and it's finished loading and it hasnt been tagged
        if (title.indexOf("NYTimes.com") != -1 && changeInfo.status == "complete" && title.indexOf("(Recorded!)") == -1)
        {   
            // append " (Recorded!)" to tab title
            chrome.tabs.executeScript(tab.id, {code: "var script = document.createElement('script');" + "script.appendChild(document.createTextNode('" +"document.title = document.title + \" (Recorded!)\";" + "'));" + "document.body.appendChild(script);"});
            
            // increment counter in localStorage
            localStorage.setItem('nyt', ++nytCount);
        }
    });
});

// since the above only works for the active tab, check if a tab has been recorded when it is selected
chrome.tabs.onActivated.addListener(function(url, changeInfo, Tab)
{
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(array_of_Tabs) 
    {
        var tab = array_of_Tabs[0]; 
        var title = tab.title;
        var status = tab.status;

        // if it's an article and it hasn't been tagged
        if (title.indexOf("NYTimes.com") != -1 && title.indexOf("(Recorded!)") == -1 && status == 'complete')
        {   
            // append " (Recorded!)" to tab title
            chrome.tabs.executeScript(tab.id, {code: "var script = document.createElement('script');" + "script.appendChild(document.createTextNode('" +"document.title = document.title + \" (Recorded!)\";" + "'));" + "document.body.appendChild(script);"});
            
            // increment counter in localStorage
            localStorage.setItem('nyt', ++nytCount);
        }
    });
});



/*****************
*
*   URL-BASED CHECKS.
*
********************************************************************************************/

// get url of updated tab, check if it conforms to RegExen for: foxnews.com, huffingtonpost.[domain],
chrome.tabs.onUpdated.addListener(function(url, changeInfo, Tab)
{
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(array_of_Tabs)
    {
        var tab = array_of_Tabs[0];
        
        var url = tab.url;
        
        // need title also to check for " (Recorded!)"
        var title = tab.title;
        
        /*************************************************************
        *       FOX NEWS CHECK
        ***************************************************************/
        // if url is foxnews article form, append title and increment counter
        if (url.match(/foxnews\.com\/\w+\/\d\d\d\d\/\d\d\/\d\d\/\w+/) != null && changeInfo.status == "complete" && title.indexOf("(Recorded!)") == -1)
        {
            // append " (Recorded!)" to tab title
            chrome.tabs.executeScript(tab.id, {code: "var script = document.createElement('script');" + "script.appendChild(document.createTextNode('" +"document.title = document.title + \" (Recorded!)\";" + "'));" + "document.body.appendChild(script);"});
            
            // increment counter in localStorage
            localStorage.setItem('fox', ++foxCount);
        }
        
        /*************************************************************
        *       HUFFINGTON POST CHECK
        ***************************************************************/
        // if url is huffington post article form (for any domain name), append title and increment counter
        if (url.match(/huffingtonpost\.\w+\/\d\d\d\d\/\d\d\/\d\d\//) != null && changeInfo.status == "complete" && title.indexOf("(Recorded!)") == -1)
        {
            // append " (Recorded!)" to tab title
            chrome.tabs.executeScript(tab.id, {code: "var script = document.createElement('script');" + "script.appendChild(document.createTextNode('" +"document.title = document.title + \" (Recorded!)\";" + "'));" + "document.body.appendChild(script);"});
            
            // increment counter in localStorage
            localStorage.setItem('huffpo', ++huffpoCount);
        }
        
        /*************************************************************
        *       CNN.COM CHECK
        ***************************************************************/
        // if url is cnn.com article form, append title and increment counter
        if (url.match(/cnn\.com\/\d\d\d\d\/\d\d\/\d\d\//) != null && changeInfo.status == "complete" && title.indexOf("(Recorded!)") == -1)
        {
            // append " (Recorded!)" to tab title
            chrome.tabs.executeScript(tab.id, {code: "var script = document.createElement('script');" + "script.appendChild(document.createTextNode('" +"document.title = document.title + \" (Recorded!)\";" + "'));" + "document.body.appendChild(script);"});
            
            // increment counter in localStorage
            localStorage.setItem('cnn', ++cnnCount);
        }
        
        /*************************************************************
        *       NBCNEWS.COM CHECK
        ***************************************************************/
        // if url is nbc news article form, append title and increment counter
        if ((url.match(/nbcsports\.com\//) != null || url.match(/nbcnews\.com\/_news\//) != null || url.match(/nbcnews\.com\/travel\//) != null || url.match(/nbcnews\.com\/business\//) != null) && changeInfo.status == "complete" && title.indexOf("(Recorded!)") == -1)
        {
            // append " (Recorded!)" to tab title
            chrome.tabs.executeScript(tab.id, {code: "var script = document.createElement('script');" + "script.appendChild(document.createTextNode('" +"document.title = document.title + \" (Recorded!)\";" + "'));" + "document.body.appendChild(script);"});
            
            // increment counter in localStorage
            localStorage.setItem('nbc', ++nbcCount);
        }
        
        /*************************************************************
        *       WAPO CHECK
        ***************************************************************/
        // if url is wsj.com article form, append title and increment counter
        if (url.match(/washingtonpost\.com/) != null && url.match(/\/\d\d\d\d\/\d\d\/\d\d/) != null && changeInfo.status == "complete" && title.indexOf("(Recorded!)") == -1)
        {
            // append " (Recorded!)" to tab title
            chrome.tabs.executeScript(tab.id, {code: "var script = document.createElement('script');" + "script.appendChild(document.createTextNode('" +"document.title = document.title + \" (Recorded!)\";" + "'));" + "document.body.appendChild(script);"});
            
            // increment counter in localStorage
            localStorage.setItem('wapo', ++wapoCount);
        }
        
        /*************************************************************
        *       USA TODAY CHECK
        ***************************************************************/
        // if url is wsj.com article form, append title and increment counter
        if (url.match(/usatoday\.com/) != null && (url.match(/\/\d\d\d\d\/\d\d\/\d\d/) != null || url.match(/\/interactives\//) != null) && changeInfo.status == "complete" && title.indexOf("(Recorded!)") == -1)
        {
            // append " (Recorded!)" to tab title
            chrome.tabs.executeScript(tab.id, {code: "var script = document.createElement('script');" + "script.appendChild(document.createTextNode('" +"document.title = document.title + \" (Recorded!)\";" + "'));" + "document.body.appendChild(script);"});
            
            // increment counter in localStorage
            localStorage.setItem('usa', ++usaCount);
        }
        
        /*************************************************************
        *       ABC NEWS CHECK
        ***************************************************************/
        // if url is wsj.com article form, append title and increment counter
        if (url.match(/abcnews\.go\.com/) != null && (url.match(/\/\d\d\d\d\/\d\d\//) != null || url.match(/\/wireStory\//) != null || url.match(/\/\d\d\d\d\/\d\d\/\d\d\//) != null || url.match(/\/story\?id\=/) != null) && changeInfo.status == "complete" && title.indexOf("(Recorded!)") == -1)
        {
            // append " (Recorded!)" to tab title
            chrome.tabs.executeScript(tab.id, {code: "var script = document.createElement('script');" + "script.appendChild(document.createTextNode('" +"document.title = document.title + \" (Recorded!)\";" + "'));" + "document.body.appendChild(script);"});
            
            // increment counter in localStorage
            localStorage.setItem('abc', ++abcCount);
        }
    })
});

// do onActivated for RegExen
chrome.tabs.onActivated.addListener(function(url, changeInfo, Tab)
{
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(array_of_Tabs) 
    {
        var tab = array_of_Tabs[0]; 
        
        var url = tab.url;
        var title = tab.title;
        var status = tab.status;
        
        /*************************************************************
        *       FOX NEWS CHECK
        ***************************************************************/
        // if url is foxnews article form, append title and increment counter
        if (url.match(/foxnews\.com\/\w+\/\d\d\d\d\/\d\d\/\d\d\/\w+/) != null && title.indexOf("(Recorded!)") == -1 && status == 'complete')
        {
            // append " (Recorded!)" to tab title
            chrome.tabs.executeScript(tab.id, {code: "var script = document.createElement('script');" + "script.appendChild(document.createTextNode('" +"document.title = document.title + \" (Recorded!)\";" + "'));" + "document.body.appendChild(script);"});
            
            // increment counter in localStorage
            localStorage.setItem('fox', ++foxCount);
        }
        
        /*************************************************************
        *       HUFFINGTON POST CHECK
        ***************************************************************/
        // if url is huffington post article form (for any domain name), append title and increment counter
        if (url.match(/huffingtonpost\.\w+\/\d\d\d\d\/\d\d\/\d\d\//) != null && title.indexOf("(Recorded!)") == -1 && status == 'complete')
        {
            // append " (Recorded!)" to tab title
            chrome.tabs.executeScript(tab.id, {code: "var script = document.createElement('script');" + "script.appendChild(document.createTextNode('" +"document.title = document.title + \" (Recorded!)\";" + "'));" + "document.body.appendChild(script);"});
            
            // increment counter in localStorage
            localStorage.setItem('huffpo', ++huffpoCount);
        }
        
        /*************************************************************
        *       CNN.COM CHECK
        ***************************************************************/
        // if url is cnn article form, append title and increment counter
        if (url.match(/cnn\.com\/\d\d\d\d\/\d\d\/\d\d\//) != null && title.indexOf("(Recorded!)") == -1 && status == 'complete')
        {
            // append " (Recorded!)" to tab title
            chrome.tabs.executeScript(tab.id, {code: "var script = document.createElement('script');" + "script.appendChild(document.createTextNode('" +"document.title = document.title + \" (Recorded!)\";" + "'));" + "document.body.appendChild(script);"});
            
            // increment counter in localStorage
            localStorage.setItem('cnn', ++cnnCount);
        }
        
        /*************************************************************
        *       NBCNEWS.COM CHECK
        ***************************************************************/
        // if url is nbc news article form, append title and increment counter
        if ((url.match(/nbcsports\.com\//) != null || url.match(/nbcnews\.com\/_news\//) != null || url.match(/nbcnews\.com\/travel\//) != null || url.match(/nbcnews\.com\/business\//) != null) && title.indexOf("(Recorded!)") == -1 && status == 'complete')
        {
            // because nbcnews.com sucks, "status == 'complete'" is only true a few milliseconds after the tab is activated. so, we wait a second before doing this.
            function wait(){};
            window.setTimeout(wait, 1500);
            
            // append " (Recorded!)" to tab title
            chrome.tabs.executeScript(tab.id, {code: "var script = document.createElement('script');" + "script.appendChild(document.createTextNode('" +"document.title = document.title + \" (Recorded!)\";" + "'));" + "document.body.appendChild(script);"});
            
            // increment counter in localStorage
            localStorage.setItem('nbc', ++nbcCount);
        }
        
        /*************************************************************
        *       WAPO CHECK
        ***************************************************************/
        // if url is wsj.com article form, append title and increment counter
        if (url.match(/washingtonpost.com/) != null && url.match(/\/\d\d\d\d\/\d\d\/\d\d/) != null && title.indexOf("(Recorded!)") == -1 && status == 'complete')
        {
            function wait(){};
            window.setTimeout(wait, 1500);
            
            // append " (Recorded!)" to tab title
            chrome.tabs.executeScript(tab.id, {code: "var script = document.createElement('script');" + "script.appendChild(document.createTextNode('" +"document.title = document.title + \" (Recorded!)\";" + "'));" + "document.body.appendChild(script);"});
            
            // increment counter in localStorage
            localStorage.setItem('wapo', ++wapoCount);
        }
        
        /*************************************************************
        *       USA TODAY CHECK
        ***************************************************************/
        // if url is wsj.com article form, append title and increment counter
        if (url.match(/usatoday\.com/) != null && (url.match(/\/\d\d\d\d\/\d\d\/\d\d/) != null || url.match(/\/interactives\//) != null) && title.indexOf("(Recorded!)") == -1 && status == 'complete')
        {  
            // append " (Recorded!)" to tab title
            chrome.tabs.executeScript(tab.id, {code: "var script = document.createElement('script');" + "script.appendChild(document.createTextNode('" +"document.title = document.title + \" (Recorded!)\";" + "'));" + "document.body.appendChild(script);"});
            
            // increment counter in localStorage
            localStorage.setItem('usa', ++usaCount);
        }
        
        /*************************************************************
        *       ABC NEWS CHECK
        ***************************************************************/
        // if url is wsj.com article form, append title and increment counter
        if (url.match(/abcnews\.go\.com/) != null && (url.match(/\/\d\d\d\d\/\d\d\//) != null || url.match(/\/wireStory\//) != null || url.match(/\/story\?id\=/) != null) && title.indexOf("(Recorded!)") == -1 && status == 'complete')
        {  
            // append " (Recorded!)" to tab title
            chrome.tabs.executeScript(tab.id, {code: "var script = document.createElement('script');" + "script.appendChild(document.createTextNode('" +"document.title = document.title + \" (Recorded!)\";" + "'));" + "document.body.appendChild(script);"});
            
            // increment counter in localStorage
            localStorage.setItem('abc', ++abcCount);
        }
    });    
});
