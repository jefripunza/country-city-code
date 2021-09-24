const fs = require("fs"),
    path = require("path")

function readCSV(path_file) {
    const row = fs.readFileSync(path_file, { encoding: "utf-8" }).split("\n").map(data => {
        return data.replace(/(\r\n|\n|\r)/gm, "")
    })
    const column = row[0];
    row.shift()
    return {
        column,
        row,
    }
}

function readJSON(path_file) {
    return JSON.parse(fs.readFileSync(path_file, { encoding: "utf-8" }))
}

function writeFile(path_file, content, callback) {
    fs.writeFile(path_file, content, function (err) {
        if (err) {
            return console.log(err);
        } else {
            callback();
        }
    });
}

function sortKey(object) {
    return Object.keys(object).sort().reduce(
        (obj, key) => {
            obj[key] = object[key];
            return obj;
        },
        {}
    )
}

const csv_target = path.join(__dirname, "country-codes.csv");
const json_target = path.join(__dirname, "city.json");

function getCountryInfo() {
    if (fs.existsSync(csv_target)) {
        const delimiter = ","
        const csv = readCSV(csv_target),
            columns = csv.column.split(delimiter),
            rows = csv.row
                .map(data => {
                    return data.split(delimiter)
                })
                .filter(data => {
                    return data !== ""
                }),
            csv_keys = rows
                .map(data => {
                    return data[data.length - 2]
                        .replace(/ - /g, '_')
                        .replace(/ /g, '_')
                        .replace(/-/g, '_')
                        .replace(/&/g, '_')
                        .replace(/__/g, '_')
                        .replace(/\(/g, '_')
                        .replace(/\)/g, '_')
                        .replace(/'/g, '')
                        .replace(/\./g, '')
                        .replace(/__/g, '_')
                        // unix
                        .replace(/’/g, '')
                        .replace(/ã/g, 'a')
                        .replace(/Å/g, 'A')
                        .replace(/ç/g, 'c')
                        .replace(/í/g, 'i')
                        .replace(/é/g, 'e')
                        .replace(/ô/g, 'o')
                })

        // result
        let countries = {}; // object
        for (let i = 0; i < csv_keys.length; i++) {
            const key = String(csv_keys[i]).toLowerCase();
            // process
            const data = {};
            for (let j = 0; j < columns.length; j++) {
                const column = columns[j]
                    .replace(/ /g, '_')
                    .replace(/-/g, '_')
                    .replace(/\(/g, '_')
                    .replace(/\)/g, '_')
                    .replace(/\//g, '_')
                    .replace(/__/g, '_')
                data[column] = rows[i][j]
            }

            countries[key] = data
        }
        countries = sortKey(countries)
        // console.log(countries.indonesia);

        if (fs.existsSync(json_target)) {
            const json = readJSON(json_target),
                json_keys = Object.keys(json),
                json_values = Object.values(json)
            json_keys.forEach((key, i) => {
                json[String(key).toLowerCase()] = json_values[i]
            });

            // moment of truth
            const find_match = json_keys.filter((jk, i) => {
                return csv_keys.some((ck, j) => {
                    return String(jk).toLowerCase() === String(ck).toLowerCase()
                })
            })
            // console.log(find_match, json_keys.length);

            let new_result = {};
            for (let i = 0; i < find_match.length; i++) {
                const match_key = find_match[i];
                const this_country = String(match_key).toLowerCase()
                const new_push = countries[this_country]
                new_push.city = json[match_key]
                new_result[this_country] = new_push
            }
            new_result = sortKey(new_result)

            return new_result;
        }
    }
}




module.exports = getCountryInfo()
