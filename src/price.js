const fs = require('fs');

function price_from_json(command) {
    let curr_datetime = new Date().toLocaleDateString();
    let file_list = fs.readdirSync('./data/json_data_temp_storage/' + curr_datetime + '/')

    for (let i = 0; i < file_list.length; i++) {
        file_list[i] = file_list[i].split('.')[0]
    }

    for (var file_index in file_list) {
        if (file_list[file_index] == "ClusterJewel") { continue } //Skip pricing ClusterJewel

        let items = require('../data/json_data_temp_storage/' + curr_datetime + '/' + file_list[file_index] + '.json')

        let json_item_name = ''
        let json_value_name = ''
        if (file_list[file_index] == "Currency" || file_list[file_index] == "Fragment") { 
            json_item_name = 'currencyTypeName' 
            json_value_name = 'chaosEquivalent'
        }
        else { 
            json_item_name = 'name' 
            json_value_name = 'chaosValue'
        }

        for (var item in items['lines']) {
            if (command.toLowerCase() == items['lines'][item][json_item_name].toLowerCase()) {
                return items['lines'][item][json_value_name];
            }
        }
    }

    return -1;
}

module.exports = { price_from_json }