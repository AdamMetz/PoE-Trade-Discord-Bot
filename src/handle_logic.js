/*
Notes to Self
Looks like poe.ninja API exports all data for a given item type, at once. i.e. Search exalt orb -> API returns all currency prices.
So likely make one API call per category per day, then store the data in my own database.
*/

const fs = require('fs');

function price_from_json(command){
    let curr_datetime = new Date().toLocaleDateString();
    let currencies = require('../json_data_temp_storage/'+curr_datetime+'/Currency.json');

    for (var key in currencies['lines']){
        if (command.toLowerCase() == currencies['lines'][key]['currencyTypeName'].toLowerCase()){
            return currencies['lines'][key]['chaosEquivalent'];
        }
    }

    return 0;

    //console.log(currencies['lines'])

    console.log(command)
}

price_from_json("test")

module.exports = {price_from_json}