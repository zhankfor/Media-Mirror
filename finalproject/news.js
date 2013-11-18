/***************************************************
*   © Solomon Klein 2013   
*
*   Written as a final project for CS50x Introduction to Computer Science through Harvardx University at edX.org.
*
*   "Media Mirror" Chrome Extension v1.0
*
*   Keeps track of the number of articles read on eight popular American news sites. Generates a pie chart
*   illustrating user's news reading habits. The author wrote this extension primarily as a means of self-
*   quantification for the purpose of self-awareness in media consumption habits, but hopes it will also 
*   inspire users to broaden their media consumption.
*
*   Many thanks to Prof. David Malan, the CS50(x) staff, Harvard(x) University, edX.org, canvasjs.com,
*   and my friends A.D. and S.A. for helping me through some of this class' extremely frustrating homework.
*
**************************************************************************************************************/

// read in values from localStorage as integers
var nytCount = parseInt(localStorage.getItem('nyt'));
var foxCount = parseInt(localStorage.getItem('fox'));
var huffpoCount = parseInt(localStorage.getItem('huffpo'));
var cnnCount = parseInt(localStorage.getItem('cnn'));
var nbcCount = parseInt(localStorage.getItem('nbc'));
var wapoCount = parseInt(localStorage.getItem('wapo'));
var usaCount = parseInt(localStorage.getItem('usa'));
var abcCount = parseInt(localStorage.getItem('abc'));

// button functions
/*****
* Asks to confirm, then resets all values in localStorage to zero.
*****************************************************/

function resetValues()
{
    // explain ramifications and confirm
    var confirmed = confirm("Are you sure? This will reset all counts to zero, and there is no way to recover them.");
    
    // zero all data
    if (confirmed == true)
    {
        localStorage.setItem('nyt', 0);
        localStorage.setItem('fox', 0);
        localStorage.setItem('huffpo', 0);
        localStorage.setItem('cnn', 0);
        localStorage.setItem('nbc', 0);
        localStorage.setItem('wapo', 0);
        localStorage.setItem('usa', 0);
        localStorage.setItem('abc', 0);
    }
}

function gotoHomepage()
{
    chrome.tabs.create({url: 'https://chrome.google.com/webstore/detail/media-mirror/cmfajndhebcijlkdllghfohhfbkaipmg'});
}



function main()
{
// if no values at all, say so
if (localStorage.getItem('nyt') == 0 && localStorage.getItem('fox') == 0 && localStorage.getItem('huffpo') == 0 && localStorage.getItem('cnn') == 0 && localStorage.getItem('nbc') == 0 && localStorage.getItem('wapo') == 0 && localStorage.getItem('usa') == 0 && localStorage.getItem('abc') == 0)
{
    window.document.location.href='nodata.html';
}


// prepare pie chart for rendering
window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer",
    {
      title:{
        text: "Your Media Mirror",
        fontColour: "black",
        fontFamily: "trebuchet ms"
      },
      
      legend: {
        horizontalAlign: "left",
        
      },
       data: [
      {
           type: "pie",
           showInLegend: false,
           dataPoints: [
           {  y: abcCount, color: "black", legendText:"ABCNews.go.com" , indexLabel: "ABC"},
           {  y: cnnCount, color: "#CA0002", legendText:"CNN.com" , indexLabel: "CNN"},
           {  y: huffpoCount, color: "#088A4B", legendText:"Huffingtonpost.com", indexLabel: "HuffPo" },
           {  y: foxCount, color: "#9e0b0e", legendText:"Foxnews.com", indexLabel: "Fox" },
           {  y: nbcCount, color: "#114477", legendText:"NBCNews.com", indexLabel: "NBC" },
           {  y: nytCount, color: "grey", legendText:"Nytimes.com", indexLabel: "NYTimes" },
           {  y: usaCount, color: "#00aafe", legendText:"USAToday.com" , indexLabel: "USA Today"},
           {  y: wapoCount, color: "e68220", legendText:"Washingtonpost.com" , indexLabel: "WaPo"},
       ]
     }
     ]
   });

    chart.render();
  }
}  
  
// Listeners for button clicks in popup.
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#reset').addEventListener('click', resetValues);
    document.querySelector('#homepage').addEventListener('click', gotoHomepage);
    main();
});
