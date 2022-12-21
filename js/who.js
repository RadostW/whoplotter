init();

var indicators_list_url = 'http://ghoapi.azureedge.net/api/';

function init()
{
    document.getElementById("load_countries").addEventListener("click", load_countries);
    
    document.getElementById("indicator_select").addEventListener("change", indicator_selected);   
    
    indicators = fetch(indicators_list_url);
}

function indicator_selected()
{
    return 0;
}

function load_countries()
{
    alert("i'm here");
}
