import { useState, useEffect, createContext, useContext } from "react";
import { account } from "../appwrite/config";
import { ID } from 'appwrite';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
   
    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        try {
            const response = await checkUserStatus();
            setUser(response);
        } catch (error) {
            console.error('Initialization Error:', error.message || error);
        } finally {
            setLoading(false);
        }
    };

    const checkUserStatus = async () => {
        try {
            // Check if there's an active session
            const session = await account.getSession('current');
            if (!session) {
                throw new Error('No active session found.');
            }

            // Fetch user data if authenticated
            const userData = await account.get();
            return userData;
        } catch (error) {
            console.error('Error fetching user status:', error.message || error);
            return null;
        }
    };

    /*const registerUser = async (name, email, password) => {
        setLoading(true);
        try {
            const user = await account.create(ID.unique(), email, password);
            await account.updateName(user.$id, name);
            setUser(user);
            console.log('User registered successfully:', user);
        } catch (error) {
            console.error('Signup Error:', error.message || error);
        } finally {
            setLoading(false);
        }
    };*/

    const registerUser = async (email, password, userId = null) => {
        // Generate or use the passed userId
        userId = ID.unique(); 
        
        try {
          const response = await fetch(`${import.meta.env.VITE_ENDPOINT}/account`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: userId,     
              email: email,
              password: password,
            }),
          });
      
          const data = await response.json();
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          console.log('User registered successfully:', data);
        } catch (error) {
          console.error('Error registering user:', error);
        }
      };
      
     const loginUser = async (email, password) => {
        setLoading(true);
        try {
            await account.createEmailSession(email, password);
            const response = await checkUserStatus();
            setUser(response);
        } catch (error) {
            console.error('Login Error:', error.message || error);
        } finally {
            setLoading(false);
        }
    };

    const logoutUser = async () => {
        setLoading(true);
        try {
            await account.deleteSession('current');
            setUser(null);
        } catch (error) {
            console.error('Logout Error:', error.message || error);
        } finally {
            setLoading(false);
        }
    };

    const contextData = { user, loginUser, logoutUser, registerUser };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { useAuth };
export default AuthProvider;
