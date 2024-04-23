import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, setDoc, query, where , deleteDoc ,getDoc , doc} from "firebase/firestore";
``

export async function getTasks(userId) {
    try {
        const tasksCollectionRef = collection(db, `users/${userId}/tasks`);
        const tasksSnapshot = await getDocs(tasksCollectionRef); 
        
        const tasks = tasksSnapshot.docs.map((doc) => ({
            ...doc.data()
        }));

        console.log(tasks); // Print tasks in the console

        return tasks;
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
        const tasksCollectionRef = collection(db, `users/${userId}/tasks`);
        const q = query(tasksCollectionRef, where("id", "==", taskId)); // Change "id" to the name of the field you want to match
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            const taskDocRef = querySnapshot.docs[0].ref;
            await deleteDoc(taskDocRef);
        } else {
            console.error('No task found with the given id:', taskId);
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error; // Rethrow the error for the caller to handle
    }
}

// Updates the task with the specified ID4

export async function editTask(userId, taskId, newTaskData) {
    try {
        const tasksCollectionRef = collection(db, `users/${userId}/tasks`);
        const q = query(tasksCollectionRef, where("id", "==", taskId)); 
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            const taskDocRef = querySnapshot.docs[0].ref;
            await setDoc(taskDocRef, newTaskData, { merge: true });
        } else {
            console.error('No task found with the given id:', taskId);
        }
    } catch (error) {
        console.error('Error editing task:', error);
        throw error; // Rethrow the error for the caller to handle
    }
}





