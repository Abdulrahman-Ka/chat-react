import { Client, Databases, Query, TablesDB } from "appwrite";

const client = new Client();

export const databses = new Databases(client);

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export default client;
