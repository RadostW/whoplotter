function download_map()
{ 
    document.querySelectorAll('svg style#custom_colors')[0].innerHTML = map_stylesheet.innerHTML
    
    
    var svgData = document.querySelectorAll('svg')[0].outerHTML;
    var svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "changed_map.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    document.querySelectorAll('svg style#custom_colors')[0].innerHTML = '';
}
