const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require("body-parser");

const databaseUtil = require("./databaseUtil");
const { debug } = require('console');
app.use(bodyParser.json());


async function main(){

    try{



        
//Create
        app.post("/CreateDocuments",(req,res)=>{
            CreateDocuments(req.body,res);
        });

//Delete
        app.delete("/DeleteDocuments",(req,res)=>{
            DeleteDocuments(req.body,res);
        });

//Update
        app.put("/UpdateDocuments",(req,res)=>{
            UpdateDocuments(req.body,res);
        });

//Read
        app.get("/list",(req,res)=>{
            listDatabases(res);
        });

        app.get("/ReadDocuments",(req,res)=>{
            console.log("receive req:");
            console.log(req.body);
            ReadDocuments(req.body,res);
        });

        
        
        server.listen(3000, () => {
            console.log('listening on *:3000');
        });
        
    }catch(e){
        console.error(e)
    }finally{
        //await client.close();
    }
}

async function listDatabases(res){
    var rs = await databaseUtil.listDatabases();
    res.send(rs);
}

async function CreateDocuments(data,res){
    try {
        var dbName = data.dbName;
        var collectionName = data.collectionName;
        var documents = data.documents;
    
        if(dbName && collectionName && documents){
            var rs = await databaseUtil.CreateDocuments(dbName,collectionName,documents);
            res.send(rs);
        }else{
            res.sendStatus(400);
        }
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }

}

async function DeleteDocuments(data,res){
    try {
        var dbName = data.dbName;
        var collectionName = data.collectionName;
        var documentFilter = data.documentFilter;
    
        if(dbName && collectionName && documentFilter){
            var rs = await databaseUtil.DeleteDocuments(dbName,collectionName,documentFilter);
            res.send(rs);
        }else{
            res.sendStatus(400);
        }
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

async function UpdateDocuments(data,res){
    try {
        var dbName = data.dbName;
        var collectionName = data.collectionName;
        var documentFilter = data.documentFilter;
        var updateQuery = data.updateQuery;
        var updateOptions = data.updateOptions;

        if(dbName && collectionName && documentFilter && updateQuery){
            var rs = await databaseUtil.UpdateDocuments(dbName,collectionName,documentFilter,updateQuery,updateOptions);
            res.send(rs);
        }else{
            res.sendStatus(400);
        }
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

async function ReadDocuments(data,res){
    try {
        var dbName = data.dbName;
        var collectionName = data.collectionName;
        var documentFilter = data.documentFilter;
    
        if(dbName && collectionName && documentFilter){
            var rs = await databaseUtil.FindDocuments(dbName,collectionName,documentFilter);
            res.send(rs);
        }else{
            res.send(data);
        }
        
    } catch (error) {
        console.log(error);
        res.send(data);
    }
}

main();