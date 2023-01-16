function clear_table()
{
    var n_rows = ui_table.getData().length;
    ui_table.deleteRow(0,n_rows-1);
    ui_table.setRowData(0,['','']);
}

function table_init()
{
    clear_table()

    for (let i=1; i < countries.length; i++)
    {
        record = countries[i];
        ui_table.insertRow([record[0],'']);
    }
    
    ui_table.deleteRow(0,1);
}

function more_rows()
{
    ui_table.insertRow(["",""]);
    ui_table.insertRow(["",""]);
    ui_table.insertRow(["",""]);
    ui_table.insertRow(["",""]);
    ui_table.insertRow(["",""]);
}

function trim_rows()
{
    var table_data = ui_table.getData();
    
    for (let i=table_data.length - 1; i > 0; i--)
    {
        if(table_data[i][0] == "") ui_table.deleteRow(i,1);
        else break;
    }
}
