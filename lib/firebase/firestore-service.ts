// Path: lib/firebase/firestore-service.ts
// Firebase Firestore service functions for all data operations

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  writeBatch,
  setDoc
} from 'firebase/firestore';
import { db } from './config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

// Budget Item validation guards
function validateBudgetItem(data: any): void {
  // Check quantity
  if (typeof data.quantity !== 'number' || data.quantity < 0) {
    throw new Error('Quantity must be a non-negative number');
  }
  if (data.quantity > 1e12) {
    throw new Error('Quantity exceeds maximum allowed value');
  }

  // Check unit cost
  if (typeof data.unitCost !== 'number' || data.unitCost < 0) {
    throw new Error('Unit cost must be a non-negative number');
  }
  if (data.unitCost > 1e12) {
    throw new Error('Unit cost exceeds maximum allowed value');
  }

  // Check VAT rate (as decimal: 0 to 1)
  if (typeof data.vatRate !== 'number' || data.vatRate < 0 || data.vatRate > 1) {
    throw new Error('VAT rate must be between 0 and 1');
  }

  // Check item description
  if (!data.item || typeof data.item !== 'string' || data.item.trim().length === 0) {
    throw new Error('Item description is required');
  }
}

// Project Service
export const projectService = {
  async createProject(projectData: any) {
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        ...projectData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  async getProject(projectId: string) {
    try {
      const docRef = doc(db, 'projects', projectId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting project:', error);
      throw error;
    }
  },

  async updateProject(projectId: string, updates: any) {
    try {
      const docRef = doc(db, 'projects', projectId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  async deleteProject(projectId: string) {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  async getUserProjects(userId: string) {
    try {
      const q = query(
        collection(db, 'projects'),
        where('ownerId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting user projects:', error);
      throw error;
    }
  },

  subscribeToProjects(userId: string, callback: (projects: any[]) => void) {
    const q = query(
      collection(db, 'projects'),
      where('ownerId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const projects = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(projects);
    });
  }
};

// Budget Service
export const budgetService = {
  async createBudgetItem(data: any) {
    try {
      // Add validation before creating
      validateBudgetItem(data);
      
      // Ensure calculated fields are correct
      const totalCost = Math.round(data.quantity * data.unitCost * 100) / 100;
      const vatAmount = Math.round(totalCost * data.vatRate * 100) / 100;
      
      const itemData = {
        ...data,
        totalCost,
        vatAmount,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'budgetItems'), itemData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating budget item:', error);
      throw error;
    }
  },

  async updateBudgetItem(projectId: string, itemId: string, data: any) {
    try {
      // Add validation before updating
      validateBudgetItem(data);
      
      // Ensure calculated fields are correct
      const totalCost = Math.round(data.quantity * data.unitCost * 100) / 100;
      const vatAmount = Math.round(totalCost * data.vatRate * 100) / 100;
      
      const itemData = {
        ...data,
        totalCost,
        vatAmount,
        updatedAt: serverTimestamp()
      };

      const docRef = doc(db, 'budgetItems', itemId);
      await updateDoc(docRef, itemData);
    } catch (error) {
      console.error('Error updating budget item:', error);
      throw error;
    }
  },

  async getBudgetItem(projectId: string, itemId: string) {
    try {
      const docRef = doc(db, 'budgetItems', itemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().projectId === projectId) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting budget item:', error);
      throw error;
    }
  },

  async deleteBudgetItem(itemId: string) {
    try {
      await deleteDoc(doc(db, 'budgetItems', itemId));
    } catch (error) {
      console.error('Error deleting budget item:', error);
      throw error;
    }
  },

  async getProjectBudgetItems(projectId: string) {
    try {
      const q = query(
        collection(db, 'budgetItems'),
        where('projectId', '==', projectId),
        orderBy('category', 'asc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting budget items:', error);
      throw error;
    }
  },

  subscribeToBudgetItems(projectId: string, callback: (items: any[]) => void) {
    const q = query(
      collection(db, 'budgetItems'),
      where('projectId', '==', projectId),
      orderBy('category', 'asc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(items);
    });
  }
};

// Milestone Service
export const milestoneService = {
  async createMilestone(milestoneData: any) {
    try {
      const docRef = await addDoc(collection(db, 'milestones'), {
        ...milestoneData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating milestone:', error);
      throw error;
    }
  },

  async updateMilestone(milestoneId: string, updates: any) {
    try {
      const docRef = doc(db, 'milestones', milestoneId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating milestone:', error);
      throw error;
    }
  },

  async deleteMilestone(milestoneId: string) {
    try {
      await deleteDoc(doc(db, 'milestones', milestoneId));
    } catch (error) {
      console.error('Error deleting milestone:', error);
      throw error;
    }
  },

  async getProjectMilestones(projectId: string) {
    try {
      const q = query(
        collection(db, 'milestones'),
        where('projectId', '==', projectId),
        orderBy('startDate', 'asc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting milestones:', error);
      throw error;
    }
  },

  subscribeToMilestones(projectId: string, callback: (milestones: any[]) => void) {
    const q = query(
      collection(db, 'milestones'),
      where('projectId', '==', projectId),
      orderBy('startDate', 'asc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const milestones = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(milestones);
    });
  }
};

// Document Service - Updated with new createDocument method
export const documentService = {
  async createDocument(documentData: any) {
    try {
      const docData = {
        ...documentData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, 'documents'), docData);
      return { id: docRef.id, ...docData };
    } catch (error) {
      console.error('Error creating document record:', error);
      throw error;
    }
  },

  async uploadDocument(file: File, projectId: string, folder: string, metadata: any) {
    try {
      // Create storage reference
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const storagePath = `projects/${projectId}/${folder}/${fileName}`;
      const storageRef = ref(storage, storagePath);
      
      // Upload file
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // Save metadata to Firestore
      const docData = {
        projectId,
        name: file.name,
        folder,
        storagePath,
        fileUrl: downloadURL,
        fileType: file.type,
        fileSize: file.size,
        ...metadata,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, 'documents'), docData);
      return { id: docRef.id, ...docData };
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  },

  async deleteDocument(documentId: string, storagePath: string) {
    try {
      // Delete from Storage if path provided
      if (storagePath) {
        const storageRef = ref(storage, storagePath);
        await deleteObject(storageRef).catch(err => {
          console.warn('Error deleting file from storage:', err);
        });
      }
      
      // Delete from Firestore
      await deleteDoc(doc(db, 'documents', documentId));
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  },

  async getProjectDocuments(projectId: string) {
    try {
      const q = query(
        collection(db, 'documents'),
        where('projectId', '==', projectId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting documents:', error);
      throw error;
    }
  },

  subscribeToDocuments(projectId: string, callback: (documents: any[]) => void) {
    const q = query(
      collection(db, 'documents'),
      where('projectId', '==', projectId),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const documents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(documents);
    });
  }
};

// Team Service
export const teamService = {
  async addTeamMember(memberData: any) {
    try {
      const docRef = await addDoc(collection(db, 'teamMembers'), {
        ...memberData,
        invitedAt: serverTimestamp(),
        status: 'pending'
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding team member:', error);
      throw error;
    }
  },

  async updateTeamMember(memberId: string, updates: any) {
    try {
      const docRef = doc(db, 'teamMembers', memberId);
      await updateDoc(docRef, updates);
    } catch (error) {
      console.error('Error updating team member:', error);
      throw error;
    }
  },

  async removeTeamMember(memberId: string) {
    try {
      await deleteDoc(doc(db, 'teamMembers', memberId));
    } catch (error) {
      console.error('Error removing team member:', error);
      throw error;
    }
  },

  async getProjectTeam(projectId: string) {
    try {
      const q = query(
        collection(db, 'teamMembers'),
        where('projectId', '==', projectId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting team members:', error);
      throw error;
    }
  },

  subscribeToTeam(projectId: string, callback: (team: any[]) => void) {
    const q = query(
      collection(db, 'teamMembers'),
      where('projectId', '==', projectId)
    );
    
    return onSnapshot(q, (snapshot) => {
      const team = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(team);
    });
  }
};

// Message Service
export const messageService = {
  async sendMessage(messageData: any) {
    try {
      const docRef = await addDoc(collection(db, 'projectMessages'), {
        ...messageData,
        createdAt: serverTimestamp(),
        readBy: [messageData.userId]
      });
      return docRef.id;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  async getProjectMessages(projectId: string) {
    try {
      const q = query(
        collection(db, 'projectMessages'),
        where('projectId', '==', projectId),
        orderBy('createdAt', 'asc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting messages:', error);
      throw error;
    }
  },

  subscribeToMessages(projectId: string, callback: (messages: any[]) => void) {
    const q = query(
      collection(db, 'projectMessages'),
      where('projectId', '==', projectId),
      orderBy('createdAt', 'asc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(messages);
    });
  }
};

// Notification Service
export const notificationService = {
  async createNotification(notificationData: any) {
    try {
      const docRef = await addDoc(collection(db, 'notifications'), {
        ...notificationData,
        read: false,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  async markAsRead(notificationId: string) {
    try {
      const docRef = doc(db, 'notifications', notificationId);
      await updateDoc(docRef, { read: true });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  async markAllAsRead(userId: string) {
    try {
      const q = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        where('read', '==', false)
      );
      const querySnapshot = await getDocs(q);
      
      const batch = writeBatch(db);
      querySnapshot.docs.forEach((doc) => {
        batch.update(doc.ref, { read: true });
      });
      
      await batch.commit();
    } catch (error) {
      console.error('Error marking all as read:', error);
      throw error;
    }
  },

  async getUserNotifications(userId: string) {
    try {
      const q = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting notifications:', error);
      throw error;
    }
  },

  subscribeToNotifications(userId: string, callback: (notifications: any[]) => void) {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    
    return onSnapshot(q, (snapshot) => {
      const notifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(notifications);
    });
  }
};
