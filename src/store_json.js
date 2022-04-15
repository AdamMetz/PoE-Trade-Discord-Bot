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
    let folder_list = fs.readdirSync('./json_data_temp_storage');
    let curr_datetime = new Date().toLocaleDateString();
    if (!folder_list[folder_list.length - 1] || folder_list[folder_list.length - 1] != curr_datetime) {
        fs.mkdirSync("./json_data_temp_storage/" + curr_datetime);
        fetch_each_api_category("./json_data_temp_storage/" + curr_datetime);
    }
}

check_daily_data();


/*
{
    "url": "https://poe.ninja/api/data/CurrencyOverview?league=&type=&language=en",
    "categories": {
        "Currency": [
            "Currency",
            "Fragment"
        ],
        "Item": [
            "DivinationCard",
            "Artifact",
            "Prophecy",
            "Oil",
            "Incubator",
            "UniqueWeapon",
            "UniqueArmour",
            "UniqueAccessory",
            "UniqueFlask",
            "UniqueJewel",
            "SkillGem",
            "ClusterJewel",
            "Map",
            "BlightedMap",
            "BlightRavagedMap",
            "UniqueMap",
            "DeliriumOrb",
            "Invitation",
            "Scarab",
            "Fossil",
            "Resonator",
            "Beast",
            "Essence",
            "Vial"
        ]
    },
    "current_league": "Archnemesis"
}








for (var val in api_categories["categories"][category]) {
            request(
                "https://poe.ninja/api/data/" + Object.keys(api_categories["categories"])[category_count]
                + "Overview?league=" + api_categories["current_league"]
                + "&type=" + api_categories["categories"][category][val]
                + "&language=en"
                , { json: true }, (err, res, body) => {
                    if (!err) {
                        temp_store_json(body, api_categories["categories"][category][val])
                    } else {
                        console.log("API Call Error occured on " + api_categories["categories"][category][val])
                        console.log(err)
                    }
                });
        }
*/