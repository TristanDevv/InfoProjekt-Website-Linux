const fs = require("fs")

const date = new Date()
const txt_file = "Update[Payloader]/latest-updates[12h].txt"

//Date Settings
const date_args = {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(), 
    hour: date.getUTCHours(),
    minutes: date.getUTCMinutes() < 10 ? ("0").concat(date.getUTCMinutes()) : date.getUTCMinutes() //fix issue that the UTC Minutes show :9 instead of :09
}

const date_string = `0 Total Updates in the last 12 hours between ${date_args.month}/${date_args.day}/${date_args.year}...${date_args.hour}:${date_args.minutes} - ${date_args.month}/${date_args.day}/${date_args.year}...${date_args.hour + 6}:${date_args.minutes}UTC`;
console.log( `0 Total Updates in the last 12 hours between ${date_args.month}/${date_args.day}/${date_args.year}...${date_args.hour}:${date_args.minutes} - ${date_args.month}/${date_args.day}/${date_args.year}...${date_args.hour + 6}:${date_args.minutes}UTC`)
 

fs.writeFile(txt_file, date_string, "utf-8", (err) => {
    if (err) {
        console.error(`Error: ${err}`)
    } else {
        console.log("Success while Resetting Update[Payloader]/latest-updates[12h].txt")
    }
})