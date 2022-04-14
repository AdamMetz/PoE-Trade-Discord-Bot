/*
Notes to Self
Looks like poe.ninja API exports all data for a given item type, at once. i.e. Search exalt orb -> API returns all currency prices.
So likely make one API call per category per day, then store the data in my own database.
*/

function price_from_json(json_data){
    console.log(json_data)
}

module.exports = {price_from_json}