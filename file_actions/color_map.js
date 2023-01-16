function set_map_view(view_name)
{
    if(view_name == 'world')
    {
        document.querySelector('svg').viewBox.baseVal.x = 0;
        document.querySelector('svg').viewBox.baseVal.y = 0;
        document.querySelector('svg').viewBox.baseVal.width = 2754;
        document.querySelector('svg').viewBox.baseVal.height = 1398;
    }
    else if(view_name == 'europe')    
    {
        document.querySelector('svg').viewBox.baseVal.x = 1175;
        document.querySelector('svg').viewBox.baseVal.y = 100;
        document.querySelector('svg').viewBox.baseVal.width = 450;
        document.querySelector('svg').viewBox.baseVal.height = 300;
    }
    else
    {
        set_map_view('world');
    }
}

var piyg = ['#8E0152', '#940457', '#99065A', '#9F095F', '#A40B63', '#AA0E68', '#AE106B', '#B51370', '#BB1675', '#C01879', '#C51D7E', '#C72482', '#CA2F88', '#CC368B', '#CF4191', '#D24C97', '#D4539B', '#D75EA1', '#D965A4', '#DC70AA', '#DF79B0', '#E07EB3', '#E286B8', '#E48BBC', '#E692C1', '#E897C4', '#EA9FCA', '#ECA6CF', '#EEABD2', '#F0B2D7', '#F1B7DA', '#F3BCDD', '#F4BFDF', '#F5C4E1', '#F6C9E3', '#F7CCE5', '#F9D1E8', '#FAD4E9', '#FBD9EC', '#FCDDED', '#FDE1EF', '#FCE4F0', '#FCE5F1', '#FBE8F2', '#FAEAF2', '#FAEDF3', '#F9EEF4', '#F9F1F5', '#F8F4F6', '#F7F6F7', '#F6F7F5', '#F5F7F2', '#F3F6ED', '#F1F6E8', '#EFF6E5', '#EDF6E1', '#ECF6DE', '#EAF5D9', '#E9F5D6', '#E7F5D2', '#E2F3CA', '#DFF2C4', '#D9F0BC', '#D6EEB6', '#D0ECAD', '#CDEAA7', '#C7E89F', '#C2E596', '#BEE490', '#B9E187', '#B5DF82', '#AEDA7A', '#A9D874', '#A3D36C', '#9CCF64', '#98CC5F', '#91C857', '#8CC551', '#86C049', '#81BD44', '#7BB93E', '#75B43B', '#71B038', '#6BAC34', '#67A832', '#62A32E', '#5C9E2A', '#589B28', '#529624', '#4E9322', '#498D20', '#468A20', '#42841F', '#3D7F1E', '#3A7B1D', '#36761C', '#33721C', '#2E6D1B', '#2B691A', '#276419'];

var viridis = ['#440154', '#450559', '#46085C', '#470D60', '#471063', '#481467', '#481769', '#481B6D', '#481F70', '#482173', '#482576', '#482878', '#472C7A', '#472E7C', '#46327E', '#453581', '#453882', '#443B84', '#433E85', '#424186', '#404588', '#3F4788', '#3E4A89', '#3D4D8A', '#3C508B', '#3B528B', '#39558C', '#38598C', '#375B8D', '#355E8D', '#34608D', '#33638D', '#32658E', '#31688E', '#2F6B8E', '#2E6D8E', '#2D708E', '#2C718E', '#2B748E', '#2A768E', '#29798E', '#287C8E', '#277E8E', '#26818E', '#26828E', '#25858E', '#24878E', '#238A8D', '#228D8D', '#218F8D', '#20928C', '#20938C', '#1F968B', '#1F998A', '#1E9B8A', '#1F9E89', '#1FA088', '#1FA287', '#20A486', '#22A785', '#24AA83', '#25AC82', '#28AE80', '#2AB07F', '#2EB37C', '#31B57B', '#35B779', '#3ABA76', '#3DBC74', '#42BE71', '#46C06F', '#4CC26C', '#50C46A', '#56C667', '#5CC863', '#60CA60', '#67CC5C', '#6CCD5A', '#73D056', '#77D153', '#7FD34E', '#86D549', '#8BD646', '#93D741', '#98D83E', '#A0DA39', '#A8DB34', '#ADDC30', '#B5DE2B', '#BADE28', '#C2DF23', '#C8E020', '#D0E11C', '#D8E219', '#DDE318', '#E5E419', '#EAE51A', '#F1E51D', '#F6E620', '#FDE725']

function fill_from_level(n,levels,value,div=false)
{
    if(div)
    {
        if(!level_data.has(n)) level_data.set(n,[]);
        
        var level_values = level_data.get(n);
        level_values.push(value);
        
        var col_id = Math.floor( piyg.length * (n+levels-1) / (2*levels-1));
        if( col_id >= piyg.length ) col_id = piyg.length - 1;
        if( col_id < 0 ) col_id = 0;
        return piyg[col_id];
    }
    else 
    {
        if(!level_data.has(n)) level_data.set(n,[]);
        
        var level_values = level_data.get(n);
        level_values.push(value);
        
        var col_id = Math.floor( viridis.length * n / (levels-1));
        if( col_id >= viridis.length ) col_id = viridis.length - 1;
        return viridis[col_id];
    }           
}

function fill_from_desc(desc)
{
    var color_scale = document.getElementById('color_scale_select').value;
    var table_data = ui_table.getData();
    var table_values = table_data.map(x => parseFloat(x[1]));
    
    
    if (color_scale == 'linear')
    {        
        var min = Math.min(...(table_values.map(x => isNaN(x) ? Infinity : x)));
        var max = Math.max(...(table_values.map(x => isNaN(x) ? -Infinity : x)));
        
        var r = parseFloat(desc);
        var x = (r - min) / (max - min);

        if(isNaN(x)) return desc
        
        var levels = parseInt(document.getElementById('levels_select').value);
        
        n = Math.floor(x * levels);
        if(n == levels) n = levels - 1; //deal with (x == max)
        
        return fill_from_level(n,levels,r)        
    }
    
    if (color_scale == 'linear_div')
    {        
        var min = Math.min(...(table_values.map(x => isNaN(x) ? Infinity : x)));
        var max = Math.max(...(table_values.map(x => isNaN(x) ? -Infinity : x)));
        
        var r = parseFloat(desc);
        var x = r;
        if(isNaN(x)) return desc
        
        if(x > 0) x = r / max;
        else x = r / (-min);

        if(isNaN(x)) return desc
        
        var levels = parseInt(document.getElementById('levels_select').value);
        
        n = Math.floor(x * levels);
        if(n == levels)  n = levels - 1; //deal with (x == max)
        if(n == -levels) n = -levels + 1; //deal with (x == min)
        
        return fill_from_level(n,levels,r,true)
    }
    
    if (color_scale == 'log')
    {
        table_values = table_values.map(x => Math.log(x));
        var min = Math.min(...(table_values.map(x => isNaN(x) ? Infinity : x)));
        var max = Math.max(...(table_values.map(x => isNaN(x) ? -Infinity : x)));
        
        var r = parseFloat(desc);
        var x = (Math.log(r) - min) / (max - min);

        if(isNaN(x)) return desc
        
        var levels = parseInt(document.getElementById('levels_select').value);
        
        n = Math.floor(x * levels);
        if(n == levels) n = levels - 1; //deal with (x == max)
        
        return fill_from_level(n,levels,r)        
    }
    
    return desc;
}

function make_map()
{
    map_stylesheet.innerHTML = "";
    
    tmp_stylesheet = "";
    
    var table_data = ui_table.getData();
    level_data = new Map();
    
    for (let i=0; i < table_data.length; i++)
    {
        var row = table_data[i];
        if ( row[1] == "" ) continue; // no style
 
        var id ="";
        if ( name_to_id.has(row[0] ) ) id = name_to_id.get(row[0]);
        if ( three_letters_to_id.has( row[0].toUpperCase() ) ) id = three_letters_to_id.get(row[0].toUpperCase());
        if ( id_to_id.has( row[0].toUpperCase() ) ) id = row[0].toUpperCase();
        
        if (id ==  "") continue; // id not found
        
        country_style = "svg ." + id.toLowerCase() +" {fill:" + fill_from_desc(row[1]) + ";}\n";
        
        tmp_stylesheet = tmp_stylesheet + country_style;
    }
    
    map_stylesheet.innerHTML = tmp_stylesheet;
    
    map_legend_source = "Wikitext souce:";
    map_legend = "Legend:<br>";
    var legend_keys = Array.from( level_data.keys() );
    
    legend_keys = legend_keys.sort((a,b)=>a-b);
    for (let i=0;i < legend_keys.length; i++)
    {
        var ld = level_data.get(legend_keys[i]);
        var min = Math.min(...ld);
        var max = Math.max(...ld);
        
        var legend_box = ('<div class="legendchunk"><span style="background-color:'
          +fill_from_desc(min)
          +';" class="thumblegend">&nbsp;&nbsp;&nbsp;&nbsp;<\/span>'
          +min+' &mdash; '+max
          +' <\/div>'
          );
        
        map_legend = map_legend + legend_box   
        map_legend_source = map_legend_source + '{{legend|'+ fill_from_desc(min) +'|' + min +' &mdash; '+ max + '}}\n'
    }
    
    document.getElementById("map_caption").innerHTML = '<div>' + map_legend + '<\/div>' + map_legend_source;
}


