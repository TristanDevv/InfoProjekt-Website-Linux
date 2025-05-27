const fs = require("fs")
const date = new Date()

//file paths
const txt_file = "Update[Payloader]/latest-updates[12h].txt"
const csv_file = "Update[Payloader]/update.csv"
const csv_total_update_count_txt = "Update[Payloader]/update_count.txt"

const read_file_to_array = (file_path) => {
    try {
        return fs.readFileSync(file_path, "utf-8").split(" ") //make the file data in arrays for example: ["hello", "how", "are", "you"]
    } catch (err) {
        console.error(`Error while reading the data and put it to an array on line ${process.argv[1]}:9`)
        return[] //if there was an error return an empty array
    }
}

//split the data into Arrays
const args_txt = read_file_to_array(txt_file)
const args_update_count = read_file_to_array(csv_total_update_count_txt)

//Date Settings
const date_args = {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(), 
    hour: date.getUTCHours(),
    minutes: date.getUTCMinutes() < 10 ? ("0").concat(date.getUTCMinutes()) : date.getUTCMinutes() //fix issue that the UTC Minutes show :9 instead of :09
}

//csv total update reader
let total_update_count_csv = parseInt(args_update_count[0])
isNaN (total_update_count_csv) ? total_update_count_csv = 0 : total_update_count_csv
total_update_count_csv += 1 //add +1 to the total update_count for the csv file

//this is for the latest update[12 hours] .txt file
let update_count_txt = parseInt(args_txt[0]) //uses the first number/string on the beginning of the txt document args[0] :number
isNaN (update_count_txt) ? update_count_txt = 0 : update_count_txt; //check if its a number
update_count_txt += 1 //add +1 to the update count


//example: date_string = 4 Total Updates in the last 12 hours between 14 - 20
let date_string = `${update_count_txt} Total Updates in the last 12 hours between ${args_txt[9]} - ${args_txt[11]}`;
console.log(`${update_count_txt} Total Updates in the last 12 hours between ${args_txt[9]} - ${args_txt[11]}`)
//date_string = `${update_count_txt} Total Updates in the last 12 hours between ${date_args.month}/${date_args.day}/${date_args.year}...${date_args.hour}:${date_args.minutes} - ${date_args.month}/${date_args.day}/${date_args.year}...${date_args.hour + 6}:${date_args.minutes}UTC`;

//the update string for the csv file
const csv_date_string = `\nUpdate on ${date_args.month}/${date_args.day}/${date_args.year}...${date_args.hour}:${date_args.minutes}UTC,${total_update_count_csv}`

fs.appendFile(csv_file, csv_date_string, "utf-8", (err) => {
    if (err) {
        console.log("Error")
    } else console.log("Success")
})

fs.writeFile(csv_total_update_count_txt, total_update_count_csv.toString(), "utf-8", (err) => {
    if (err) {
        console.log(err)
    } else console.log("Success")
})

fs.writeFile(txt_file, date_string, "utf-8", (err) => {
    if (err) {
        console.log("Error")
    } else console.log("Success")
})


