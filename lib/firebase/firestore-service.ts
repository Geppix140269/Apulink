import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  Timestamp,
  addDoc,
  onSnapshot
} from 'firebase/firestore';
import { db } from './config';

// Project Types
export interface Project {
  id?: string;
  name: string;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  region: string;
  comune: string;
  address: string;
  description: string;
  coverImage?: string;
  miniPiaStage: string;
  startDate: Date;
  endDate: Date;
  ownerId: string;
  totalBudget: number;
  spentBudget: number;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

// Milestone Types
export interface Milestone {
  id?: string;
  projectId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  ownerId: string;
  dependencies?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Budget Types
export interface BudgetItem {
  id?: string;
  projectId: string;
  category: 'Acquisition' | 'Design' | 'Permits' | 'Works' | 'FF&E' | 'Contingency' | 'Fees' | 'VAT';
  item: string;
  quantity: number;
  unit: string;
  unitCost: number;
  totalCost: number;
  vatRate: number;
  vatAmount: number;
  status: 'planned' | 'committed' | 'invoiced' | 'paid';
  supplierId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Document Types
export interface Document {
  id?: string;
  projectId: string;
  name: string;
  folder: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  tags: string[];
  uploadedBy: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

// Project Service
export class ProjectService {
  private collection = 'projects';

  async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, this.collection), {
      ...project,
      startDate: Timestamp.fromDate(new Date(project.startDate)),
      endDate: Timestamp.fromDate(new Date(project.endDate)),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  }

  async getProject(projectId: string): Promise<Project | null> {
    const docRef = doc(db, this.collection, projectId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      startDate: data.startDate.toDate(),
      endDate: data.endDate.toDate(),
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    } as Project;
  }

  async getUserProjects(userId: string): Promise<Project[]> {
    const q = query(
      collection(db, this.collection),
      where('ownerId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        startDate: data.startDate.toDate(),
        endDate: data.endDate.toDate(),
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as Project;
    });
  }

  subscribeToUserProjects(userId: string, callback: (projects: Project[]) => void) {
    const q = query(
      collection(db, this.collection),
      where('ownerId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const projects = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          startDate: data.startDate.toDate(),
          endDate: data.endDate.toDate(),
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        } as Project;
      });
      callback(projects);
    });
  }

  async updateProject(projectId: string, updates: Partial<Project>): Promise<void> {
    const docRef = doc(db, this.collection, projectId);
    const updateData: any = { ...updates, updatedAt: Timestamp.now() };
    
    if (updates.startDate) {
      updateData.startDate = Timestamp.fromDate(new Date(updates.startDate));
    }
    if (updates.endDate) {
      updateData.endDate = Timestamp.fromDate(new Date(updates.endDate));
    }
    
    await updateDoc(docRef, updateData);
  }

  async deleteProject(projectId: string): Promise<void> {
    const docRef = doc(db, this.collection, projectId);
    await deleteDoc(docRef);
  }
}

// Milestone Service
export class MilestoneService {
  private collection = 'milestones';

  async createMilestone(milestone: Omit<Milestone, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, this.collection), {
      ...milestone,
      startDate: Timestamp.fromDate(new Date(milestone.startDate)),
      endDate: Timestamp.fromDate(new Date(milestone.endDate)),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  }

  async getProjectMilestones(projectId: string): Promise<Milestone[]> {
    const q = query(
      collection(db, this.collection),
      where('projectId', '==', projectId),
      orderBy('startDate', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        startDate: data.startDate.toDate(),
        endDate: data.endDate.toDate(),
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as Milestone;
    });
  }

  subscribeToProjectMilestones(projectId: string, callback: (milestones: Milestone[]) => void) {
    const q = query(
      collection(db, this.collection),
      where('projectId', '==', projectId),
      orderBy('startDate', 'asc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const milestones = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          startDate: data.startDate.toDate(),
          endDate: data.endDate.toDate(),
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        } as Milestone;
      });
      callback(milestones);
    });
  }

  async updateMilestone(milestoneId: string, updates: Partial<Milestone>): Promise<void> {
    const docRef = doc(db, this.collection, milestoneId);
    const updateData: any = { ...updates, updatedAt: Timestamp.now() };
    
    if (updates.startDate) {
      updateData.startDate = Timestamp.fromDate(new Date(updates.startDate));
    }
    if (updates.endDate) {
      updateData.endDate = Timestamp.fromDate(new Date(updates.endDate));
    }
    
    await updateDoc(docRef, updateData);
  }

  async deleteMilestone(milestoneId: string): Promise<void> {
    const docRef = doc(db, this.collection, milestoneId);
    await deleteDoc(docRef);
  }
}

// Budget Service
export class BudgetService {
  private collection = 'budgetItems';

  async createBudgetItem(item: Omit<BudgetItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, this.collection), {
      ...item,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  }

  async getProjectBudget(projectId: string): Promise<BudgetItem[]> {
    const q = query(
      collection(db, this.collection),
      where('projectId', '==', projectId),
      orderBy('category', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as BudgetItem;
    });
  }

  subscribeToProjectBudget(projectId: string, callback: (items: BudgetItem[]) => void) {
    const q = query(
      collection(db, this.collection),
      where('projectId', '==', projectId),
      orderBy('category', 'asc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        } as BudgetItem;
      });
      callback(items);
    });
  }

  async updateBudgetItem(itemId: string, updates: Partial<BudgetItem>): Promise<void> {
    const docRef = doc(db, this.collection, itemId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  }

  async deleteBudgetItem(itemId: string): Promise<void> {
    const docRef = doc(db, this.collection, itemId);
    await deleteDoc(docRef);
  }

  async calculateProjectTotals(projectId: string): Promise<{
    totalBudget: number;
    totalSpent: number;
    byCategory: Record<string, number>;
  }> {
    const items = await this.getProjectBudget(projectId);
    
    let totalBudget = 0;
    let totalSpent = 0;
    const byCategory: Record<string, number> = {};
    
    items.forEach(item => {
      totalBudget += item.totalCost + item.vatAmount;
      
      if (item.status === 'paid') {
        totalSpent += item.totalCost + item.vatAmount;
      }
      
      if (!byCategory[item.category]) {
        byCategory[item.category] = 0;
      }
      byCategory[item.category] += item.totalCost + item.vatAmount;
    });
    
    return { totalBudget, totalSpent, byCategory };
  }
}

// Document Service
export class DocumentService {
  private collection = 'documents';

  async uploadDocument(document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, this.collection), {
      ...document,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  }

  async getProjectDocuments(projectId: string): Promise<Document[]> {
    const q = query(
      collection(db, this.collection),
      where('projectId', '==', projectId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as Document;
    });
  }

  subscribeToProjectDocuments(projectId: string, callback: (documents: Document[]) => void) {
    const q = query(
      collection(db, this.collection),
      where('projectId', '==', projectId),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const documents = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        } as Document;
      });
      callback(documents);
    });
  }

  async deleteDocument(documentId: string): Promise<void> {
    const docRef = doc(db, this.collection, documentId);
    await deleteDoc(docRef);
  }
}

// Export service instances
export const projectService = new ProjectService();
export const milestoneService = new MilestoneService();
export const budgetService = new BudgetService();
export const documentService = new DocumentService();
