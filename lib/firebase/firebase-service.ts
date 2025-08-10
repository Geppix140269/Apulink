import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  getDoc,
  setDoc,
  limit,
  getDocs,
} from 'firebase/firestore';
import { db } from './config';
import { z } from 'zod';

// Type definitions
export interface Project {
  id?: string;
  name: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  region: string;
  comune: string;
  address: string;
  description: string;
  miniPiaStage: string;
  startDate: Date | Timestamp;
  endDate: Date | Timestamp;
  ownerId: string;
  totalBudget: number;
  spentBudget: number;
  progress: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Milestone {
  id?: string;
  projectId: string;
  title: string;
  description: string;
  startDate: Date | Timestamp;
  endDate: Date | Timestamp;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'delayed';
  ownerId: string;
  dependencies?: string[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface BudgetItem {
  id?: string;
  projectId: string;
  category: string;
  item: string;
  quantity: number;
  unit: string;
  unitCost: number;
  totalCost: number;
  vatRate: number;
  vatAmount: number;
  status: 'pending' | 'approved' | 'paid';
  supplierId?: string;
  notes?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Document {
  id?: string;
  projectId: string;
  name: string;
  folder: string;
  storagePath: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  tags: string[];
  uploadedBy: string;
  version: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface TeamMember {
  id?: string;
  projectId: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  category: 'professional' | 'contractor' | 'supplier' | 'authority';
  company?: string;
  specialization?: string;
  permissions: {
    view: boolean;
    edit: boolean;
    delete: boolean;
  };
  status: 'pending' | 'active' | 'inactive';
  invitedAt?: Timestamp;
  acceptedAt?: Timestamp;
}

export interface ProjectMessage {
  id?: string;
  projectId: string;
  userId: string;
  userName: string;
  message: string;
  attachments?: string[];
  createdAt?: Timestamp;
  readBy?: string[];
  replyTo?: string;
}

export interface Notification {
  id?: string;
  userId: string;
  projectId?: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  read: boolean;
  actionUrl?: string;
  createdAt?: Timestamp;
}

// Validation schemas
const budgetItemSchema = z.object({
  category: z.string().min(1, "Category is required"),
  item: z.string().min(1, "Item name is required"),
  quantity: z.number().positive("Quantity must be positive"),
  unit: z.string().min(1, "Unit is required"),
  unitCost: z.number().nonnegative("Unit cost cannot be negative"),
  vatRate: z.number().min(0).max(1, "VAT rate must be between 0 and 1"),
  status: z.enum(['pending', 'approved', 'paid']),
  notes: z.string().optional(),
  supplierId: z.string().optional(),
});

// Project Service - USING SUBCOLLECTIONS
export const projectService = {
  async createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  async updateProject(projectId: string, data: Partial<Project>): Promise<void> {
    try {
      await updateDoc(doc(db, 'projects', projectId), {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  async deleteProject(projectId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  subscribeToProjects(
    userId: string,
    callback: (projects: Project[]) => void
  ): () => void {
    const q = query(
      collection(db, 'projects'),
      where('ownerId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const projects = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Project));
      callback(projects);
    });
  },

  async getProject(projectId: string): Promise<Project | null> {
    try {
      const docSnap = await getDoc(doc(db, 'projects', projectId));
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Project;
      }
      return null;
    } catch (error) {
      console.error('Error getting project:', error);
      throw error;
    }
  },
};

// Milestone Service - USING SUBCOLLECTIONS
export const milestoneService = {
  async createMilestone(projectId: string, data: Omit<Milestone, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(
        collection(db, 'projects', projectId, 'milestones'),
        {
          ...data,
          projectId,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }
      );
      return docRef.id;
    } catch (error) {
      console.error('Error creating milestone:', error);
      throw error;
    }
  },

  async updateMilestone(projectId: string, milestoneId: string, data: Partial<Milestone>): Promise<void> {
    try {
      await updateDoc(doc(db, 'projects', projectId, 'milestones', milestoneId), {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating milestone:', error);
      throw error;
    }
  },

  async deleteMilestone(projectId: string, milestoneId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'projects', projectId, 'milestones', milestoneId));
    } catch (error) {
      console.error('Error deleting milestone:', error);
      throw error;
    }
  },

  subscribeToMilestones(
    projectId: string,
    callback: (milestones: Milestone[]) => void
  ): () => void {
    const q = query(
      collection(db, 'projects', projectId, 'milestones'),
      orderBy('startDate', 'asc')
    );

    return onSnapshot(q, (snapshot) => {
      const milestones = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Milestone));
      callback(milestones);
    });
  },
};

// Budget Service - USING SUBCOLLECTIONS
export const budgetService = {
  async createBudgetItem(projectId: string, data: Omit<BudgetItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      // Validate data
      const validationResult = budgetItemSchema.safeParse(data);
      if (!validationResult.success) {
        throw new Error(`Validation error: ${validationResult.error.errors[0].message}`);
      }

      // Calculate total cost and VAT
      const totalCost = data.quantity * data.unitCost;
      const vatAmount = totalCost * data.vatRate;

      const docRef = await addDoc(
        collection(db, 'projects', projectId, 'budgetItems'),
        {
          ...data,
          projectId,
          totalCost,
          vatAmount,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }
      );
      return docRef.id;
    } catch (error) {
      console.error('Error creating budget item:', error);
      throw error;
    }
  },

  async updateBudgetItem(projectId: string, itemId: string, data: Partial<BudgetItem>): Promise<void> {
    try {
      // If quantity or unitCost is being updated, recalculate totals
      let updates = { ...data };
      if (data.quantity !== undefined || data.unitCost !== undefined) {
        const docSnap = await getDoc(doc(db, 'projects', projectId, 'budgetItems', itemId));
        if (docSnap.exists()) {
          const current = docSnap.data() as BudgetItem;
          const quantity = data.quantity ?? current.quantity;
          const unitCost = data.unitCost ?? current.unitCost;
          const vatRate = data.vatRate ?? current.vatRate;
          
          const totalCost = quantity * unitCost;
          const vatAmount = totalCost * vatRate;
          
          updates = {
            ...updates,
            totalCost,
            vatAmount,
          };
        }
      }

      await updateDoc(doc(db, 'projects', projectId, 'budgetItems', itemId), {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating budget item:', error);
      throw error;
    }
  },

  async deleteBudgetItem(projectId: string, itemId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'projects', projectId, 'budgetItems', itemId));
    } catch (error) {
      console.error('Error deleting budget item:', error);
      throw error;
    }
  },

  subscribeToBudgetItems(
    projectId: string,
    callback: (items: BudgetItem[]) => void
  ): () => void {
    const q = query(
      collection(db, 'projects', projectId, 'budgetItems'),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as BudgetItem));
      callback(items);
    });
  },
};

// Document Service - USING SUBCOLLECTIONS
export const documentService = {
  async createDocument(projectId: string, data: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(
        collection(db, 'projects', projectId, 'documents'),
        {
          ...data,
          projectId,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }
      );
      return docRef.id;
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  },

  async updateDocument(projectId: string, documentId: string, data: Partial<Document>): Promise<void> {
    try {
      await updateDoc(doc(db, 'projects', projectId, 'documents', documentId), {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  },

  async deleteDocument(projectId: string, documentId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'projects', projectId, 'documents', documentId));
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  },

  subscribeToDocuments(
    projectId: string,
    callback: (documents: Document[]) => void
  ): () => void {
    const q = query(
      collection(db, 'projects', projectId, 'documents'),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const documents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Document));
      callback(documents);
    });
  },
};

// Team Member Service - USING SUBCOLLECTIONS
export const teamMemberService = {
  async addTeamMember(projectId: string, data: Omit<TeamMember, 'id' | 'invitedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(
        collection(db, 'projects', projectId, 'teamMembers'),
        {
          ...data,
          projectId,
          invitedAt: serverTimestamp(),
        }
      );
      return docRef.id;
    } catch (error) {
      console.error('Error adding team member:', error);
      throw error;
    }
  },

  async updateTeamMember(projectId: string, memberId: string, data: Partial<TeamMember>): Promise<void> {
    try {
      await updateDoc(doc(db, 'projects', projectId, 'teamMembers', memberId), data);
    } catch (error) {
      console.error('Error updating team member:', error);
      throw error;
    }
  },

  async removeTeamMember(projectId: string, memberId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'projects', projectId, 'teamMembers', memberId));
    } catch (error) {
      console.error('Error removing team member:', error);
      throw error;
    }
  },

  subscribeToTeamMembers(
    projectId: string,
    callback: (members: TeamMember[]) => void
  ): () => void {
    const q = query(
      collection(db, 'projects', projectId, 'teamMembers'),
      orderBy('invitedAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const members = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as TeamMember));
      callback(members);
    });
  },
};

// Message Service - USING SUBCOLLECTIONS
export const messageService = {
  async sendMessage(projectId: string, data: Omit<ProjectMessage, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(
        collection(db, 'projects', projectId, 'messages'),
        {
          ...data,
          projectId,
          createdAt: serverTimestamp(),
          readBy: [data.userId],
        }
      );
      return docRef.id;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  async markMessageAsRead(projectId: string, messageId: string, userId: string): Promise<void> {
    try {
      const messageRef = doc(db, 'projects', projectId, 'messages', messageId);
      const messageDoc = await getDoc(messageRef);
      
      if (messageDoc.exists()) {
        const currentReadBy = messageDoc.data().readBy || [];
        if (!currentReadBy.includes(userId)) {
          await updateDoc(messageRef, {
            readBy: [...currentReadBy, userId]
          });
        }
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
  },

  subscribeToMessages(
    projectId: string,
    callback: (messages: ProjectMessage[]) => void
  ): () => void {
    const q = query(
      collection(db, 'projects', projectId, 'messages'),
      orderBy('createdAt', 'asc'),
      limit(100)
    );

    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ProjectMessage));
      callback(messages);
    });
  },
};

// Notification Service - ROOT LEVEL (user-scoped)
export const notificationService = {
  async createNotification(data: Omit<Notification, 'id' | 'createdAt' | 'read'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'notifications'), {
        ...data,
        read: false,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  async markAsRead(notificationId: string): Promise<void> {
    try {
      await updateDoc(doc(db, 'notifications', notificationId), {
        read: true,
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  async deleteNotification(notificationId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'notifications', notificationId));
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  },

  subscribeToNotifications(
    userId: string,
    callback: (notifications: Notification[]) => void
  ): () => void {
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
      } as Notification));
      callback(notifications);
    });
  },
};
