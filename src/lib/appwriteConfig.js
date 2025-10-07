import { Account, Client, TablesDB } from "appwrite";

const projectId = import.meta.env.VITE_APPWRITE_PROJECTID;
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;

const client = new Client().setEndpoint(endpoint).setProject(projectId);
const tablesDB = new TablesDB(client);
const account = new Account(client);

export { client, tablesDB, account };
