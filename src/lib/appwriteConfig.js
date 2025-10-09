import { Account, Client, TablesDB } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const API_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const client = new Client().setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);
const tablesDB = new TablesDB(client);
const account = new Account(client);

export { client, tablesDB, account, DATABASE_ID };
