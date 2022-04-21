const fs = require('fs');
const fetch = require('node-fetch');

//Until I have a database setup, I'll manually store the data each day within a folder.
function temp_store_json(json_data, category, folder) {
    console.log(category + " Success")
    fs.writeFile(folder+"/"+category+".json", JSON.stringify(json_data), (err, result) => {
        if (err) {console.log("JSON File Write Error " + err)};
    });
}

async function fetch_each_api_category(folder) {
    let api_categories = require('./api_categories.json');

    let category_count = -1;
    for (var category in api_categories["categories"]) {
        category_count += 1;
        for (var val in api_categories["categories"][category]) {
            let api_url = "https://poe.ninja/api/data/" + Object.keys(api_categories["categories"])[category_count]
                + "Overview?league=" + api_categories["current_league"]
                + "&type=" + api_categories["categories"][category][val]
                + "&language=en";

            const response = await fetch(api_url);

            if (!response.ok) {
                console.log("API Error: " + api_categories["categories"][category][val])
            }
            const json = await response.json();
            temp_store_json(json, api_categories["categories"][category][val], folder)
        }
    }
}

function check_daily_data() {
    let folder_list = fs.readdirSync('./data/json_data_temp_storage');
    let curr_datetime = new Date().toLocaleDateString();
    if (!folder_list[folder_list.length - 1] || folder_list[folder_list.length - 1] != curr_datetime) {
        fs.mkdirSync("./data/json_data_temp_storage/" + curr_datetime);
        fetch_each_api_category("./data/json_data_temp_storage/" + curr_datetime);
    }
}

module.exports = {check_daily_data};