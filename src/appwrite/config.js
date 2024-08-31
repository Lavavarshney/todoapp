import { Client, Databases, Account} from 'appwrite';
const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_ENDPOINT)
    .setProject(import.meta.env.VITE_PROJECT_ID);
    const databases = new Databases(client);
const account = new Account(client);
const listUsers = async () => {
    try {
      console.log('Listing documents from database:', '66cc5adc0031588c4a87', 'and collection:', '66cc5aec001c150f8cad');
      const users = await databases.listDocuments('66cc5adc0031588c4a87','66cc5aec001c150f8cad' );
      console.log('Users:', users);
    } catch (error) {
      console.error('Error listing users:', error);
    }
  };
  
  listUsers();
    export {client,databases,account}