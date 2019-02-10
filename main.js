const express = require("express");
const app = express();
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get("/", async (req, res) => {
    throw_data = await read_yanderes();
    if(throw_data === false) res.redirect(req.baseUrl + "/error");
    res.render( __dirname + "/public/ejs/index.ejs", throw_data);
    console.log(throw_data);
});

app.get("/character", async (req, res) => {
    let search_Number = req.query["Number"];
    let search_object = await read_yanderes();
    if(search_object === false) res.redirect(req.baseUrl + "/error");
    let return_yandere = undefined;
    for(let i = 0; i < search_object.items.length; i++){
        if(search_object.items[i].Number === search_Number) return_yandere = search_object.items[i];
    }
    console.log({return_yandere})
    if(return_yandere === undefined) res.redirect(req.baseUrl + "/error");
    res.render( __dirname + "/public/ejs/character.ejs", {return_yandere});
});

app.get("/change", (req, res) => {
    res.render( __dirname + "/public/ejs/change_top.ejs" );
});

app.get("/change/add", (req, res) => {
    res.render( __dirname + "/public/ejs/change_add.ejs" );
});

app.post("/change/add", (req, res) => {

});

function read_yanderes(){
    throw_data = { items: [] };
    let data = fs.readFileSync("./csv/main.csv", "utf8")
    try{
        data = data.split("\n");
        for(let i = 0; i < data.length; i++){
            yandere_data = data[i].split(",");
            throw_data.items.push(new yandere_infomation(yandere_data));
        };
        throw_data["counts"] = data.length;
    }catch(err){
        console.error(err);
        return false;
    }
    return throw_data;
}

class yandere_infomation{
    constructor(data){
        this.Number = data[0].replace(/[^0-9]/g, '');
        this.date = data[1];
        this.name = data[2];
        this.yan = yandere_data[3];
        this.dere = yandere_data[4];
        this.wagamama = yandere_data[5];
        this.main_img_url = yandere_data[6];
        this.hitokoto = yandere_data[7];
        this.description = fs.readFileSync(`./csv/txts/${this.Number}.txt`, 'utf8');
    }
}

app.listen(process.env.PORT || 8000);
console.log("localhost:8000")