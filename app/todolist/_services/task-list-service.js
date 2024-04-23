import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, where , deleteDoc ,getDoc , doc} from "firebase/firestore";
``

export async function getTasks(userId) {
    try {
        const tasksCollectionRef = collection(db, `users/${userId}/tasks`);
        const tasksSnapshot = await getDocs(tasksCollectionRef); 
        
        return tasksSnapshot.docs.map((doc) => ({
            id: doc.id, // Use the auto-generated document ID
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error; // Rethrow the error for the caller to handle
    }
}

// Adds a new item to the shopping list for the user with the given ID
export async function addTask(userId, task) {
    const tasksCollectionRef = collection(db, `users/${userId}/tasks`);
    const taskRef = await addDoc(tasksCollectionRef, task);
    return taskRef.id;
}

// Deletes the task with the specified ID
export async function deleteTask(userId, taskId) {
    try {
        const taskDocRef = doc(db, `users/${userId}/tasks`, taskId);
        await deleteDoc(taskDocRef);
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error; // Rethrow the error for the caller to handle
    }
}




