// app/my-apulink/services/firebase-db.ts
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
  limit,
  addDoc,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../../../lib/firebase/config';

// Project operations
export async function getUserProjects(userId: string) {
  try {
    const q = query(
      collection(db, 'projects'),
      where('buyer_id', '==', userId),
      where('is_active', '==', true),
      orderBy('created_at', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function createProject(projectData: any) {
  try {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      is_active: true,
      progress: 0
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

// Document operations
export async function getProjectDocuments(projectId: string) {
  try {
    const q = query(
      collection(db, 'documents'),
      where('project_id', '==', projectId),
      orderBy('created_at', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}

export async function getUserDocuments(userId: string) {
  try {
    // First get user's projects
    const projects = await getUserProjects(userId);
    const projectIds = projects.map(p => p.id);
    
    if (projectIds.length === 0) return [];
    
    // Then get documents for those projects
    const allDocs: any[] = [];
    for (const projectId of projectIds) {
      const docs = await getProjectDocuments(projectId);
      allDocs.push(...docs);
    }
    
    return allDocs.sort((a, b) => {
      const dateA = a.created_at?.toDate?.() || new Date(0);
      const dateB = b.created_at?.toDate?.() || new Date(0);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('Error fetching user documents:', error);
    return [];
  }
}

// Notification operations
export async function getUserNotifications(userId: string, unreadOnly = false) {
  try {
    let q = query(
      collection(db, 'notifications'),
      where('user_id', '==', userId)
    );
    
    if (unreadOnly) {
      q = query(
        collection(db, 'notifications'),
        where('user_id', '==', userId),
        where('is_read', '==', false),
        where('is_archived', '==', false)
      );
    }
    
    q = query(q, orderBy('created_at', 'desc'), limit(50));
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
}

export async function markNotificationRead(notificationId: string) {
  try {
    await updateDoc(doc(db, 'notifications', notificationId), {
      is_read: true,
      read_at: serverTimestamp()
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
}

export async function createNotification(data: any) {
  try {
    await addDoc(collection(db, 'notifications'), {
      ...data,
      is_read: false,
      is_archived: false,
      created_at: serverTimestamp()
    });
  } catch (error) {
    console.error('Error creating notification:', error);
  }
}

// Team operations
export async function getProjectTeam(projectId: string) {
  try {
    const q = query(
      collection(db, 'project_team'),
      where('project_id', '==', projectId),
      where('status', '==', 'active')
    );
    const snapshot = await getDocs(q);
    
    const teamMembers = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const data = docSnap.data();
        // Get professional details
        const profDoc = await getDoc(doc(db, 'professionals', data.professional_id));
        return {
          id: docSnap.id,
          ...data,
          professional: profDoc.exists() ? profDoc.data() : null
        };
      })
    );
    
    return teamMembers;
  } catch (error) {
    console.error('Error fetching team:', error);
    return [];
  }
}

// Budget operations
export async function getProjectBudget(projectId: string) {
  try {
    const q = query(
      collection(db, 'budget_items'),
      where('project_id', '==', projectId),
      orderBy('category', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching budget:', error);
    return [];
  }
}

export async function addBudgetItem(item: any) {
  try {
    await addDoc(collection(db, 'budget_items'), {
      ...item,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
  } catch (error) {
    console.error('Error adding budget item:', error);
    throw error;
  }
}

// Milestone operations
export async function getProjectMilestones(projectId: string) {
  try {
    const q = query(
      collection(db, 'project_milestones'),
      where('project_id', '==', projectId),
      orderBy('start_date', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching milestones:', error);
    return [];
  }
}

// Metrics calculation
export async function calculateDashboardMetrics(userId: string) {
  try {
    const projects = await getUserProjects(userId);
    const notifications = await getUserNotifications(userId, true);
    
    let totalBudget = 0;
    let totalProgress = 0;
    let activeProjects = 0;
    
    for (const project of projects) {
      if (project.is_active) {
        activeProjects++;
        totalBudget += project.target_budget || 0;
        totalProgress += project.progress || 0;
      }
    }
    
    const avgProgress = activeProjects > 0 ? Math.round(totalProgress / activeProjects) : 0;
    const totalGrants = totalBudget * 0.45;
    
    // Get unique team members
    const allTeamMembers = new Set();
    for (const project of projects) {
      const team = await getProjectTeam(project.id);
      team.forEach(member => allTeamMembers.add(member.professional_id));
    }
    
    return {
      totalPortfolio: totalBudget,
      totalGrants: totalGrants,
      teamExperts: allTeamMembers.size,
      avgProgress: avgProgress,
      projectCount: activeProjects,
      unreadNotifications: notifications.length
    };
  } catch (error) {
    console.error('Error calculating metrics:', error);
    return {
      totalPortfolio: 0,
      totalGrants: 0,
      teamExperts: 0,
      avgProgress: 0,
      projectCount: 0,
      unreadNotifications: 0
    };
  }
}
