import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../data/firebaseConfig';
import { User } from '../types/authContextType';
import { Project } from '../types/KanbanTypes';

const updateData = async (project: Project, projectId: string, user: User) => {
	if (user) {
		const docRef = doc(db, `users/${user.uid}/projects/${projectId}`);
		await updateDoc(docRef, project);
	}
};

export { updateData };
