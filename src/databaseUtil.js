require("dotenv").config();

const url = process.env.MONGDB_URL||"mongodb://localhost:27017";
const {MongoClient} = require("mongodb");
const client = new MongoClient(url);
async function main(){
     

    try{
        await client.connect();
        console.log("Connected to mongo db");
    }catch(e){
        console.error(e)
    }
}

main().catch(console.error);

async function listDatabases(){
    const databasesList = await client.db().admin().listDatabases();

    // console.log("Databases:");
    // databasesList.databases.forEach(element => {
    //     console.log(`- ${element.name}`);
    // });
    return databasesList;
}


//create
// async function CreateDocument(dbName,collectionName,document)
// {
//     const result = await client.db(dbName).collection(collectionName).insertOne(document);
//     console.log(`New document created with the following id: ${result.insertedId}`);

//     return result;
// }

async function CreateDocuments(dbName,collectionName,documents)
{
    const result = await client.db(dbName).collection(collectionName).insertMany(documents);

    console.log(`${result.insertedCount} documents created with the following ids:`);
    console.log(result.insertedIds);

    return result;
}

//Read
// async function FindOneDocumentBy(dbName,collectionName,documentFilter){
//     const result = await client.db(dbName).collection(collectionName).findOne(documentFilter);

//     if(result){
//         console.log(`Found a document with filter '${JSON.stringify(documentFilter)}'`);
//         console.log(JSON.stringify(result));
//     }else{
//         console.log(`No document found with filter '${JSON.stringify(documentFilter)}'`);
//     }
// }

async function FindDocuments(dbName,collectionName,documentFilter){
    const cursor = await client.db(dbName).collection(collectionName).find(documentFilter).toArray();
    return cursor;
}

//update
// async function UpdateOneDocument(dbName,collectionName,documentFilter,newDocument){
//     const result = await client.db(dbName).collection(collectionName).updateOne(documentFilter,newDocument);
//     if(result){
//         console.log(`Found ${result.matchedCount} document with filter '${JSON.stringify(documentFilter)}'`);
//         console.log(`${result.modifiedCount} documents was updated`);
//     }
// }
async function UpdateDocuments(dbName,collectionName,documentFilter,newDocument,updateOptions){
    const result = await client.db(dbName).collection(collectionName).updateMany(documentFilter,newDocument,updateOptions);
    if(result.modifiedCount>0){
        console.log(`Found ${result.matchedCount} document with filter '${JSON.stringify(documentFilter)}'`);
        console.log(`${result.modifiedCount} documents was updated`);
    }else{
        console.log(`${JSON.stringify(newDocument)} is created`);
    }

    return result;
}

// async function UpdateOrInsetOneDocument(dbName,collectionName,documentFilter,newDocument){
//     const result = await client.db(dbName).collection(collectionName)
//     .updateOne(documentFilter,newDocument,{upsert: true});
//     if(result.modifiedCount>0){
//         console.log(`Found ${result.matchedCount} document with filter '${JSON.stringify(documentFilter)}'`);
//         console.log(`${result.modifiedCount} documents was updated`);
//     }else{
//         console.log(`${JSON.stringify(newDocument)} is created`);
//     }
// }

//delete
// async function DeleteOneDocument(dbName,collectionName,documentFilter){
//     const result = await client.db(dbName).collection(collectionName)
//     .deleteOne(documentFilter);

//     console.log(`Delete ${result.deletedCount} document with filter '${JSON.stringify(documentFilter)}'`);

// }

async function DeleteDocuments(dbName,collectionName,documentFilter){
    const result = await client.db(dbName).collection(collectionName)
    .deleteMany(documentFilter);

    console.log(`Delete ${result.deletedCount} document with filter '${JSON.stringify(documentFilter)}'`);
    return result;
}

exports.listDatabases = listDatabases;
exports.CreateDocuments = CreateDocuments;
exports.DeleteDocuments = DeleteDocuments;
exports.UpdateDocuments = UpdateDocuments;
exports.FindDocuments = FindDocuments;