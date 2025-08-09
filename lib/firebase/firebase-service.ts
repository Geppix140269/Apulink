// PATH: lib/firebase/firebase-service.ts

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
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
  Timestamp
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdm_uzw1MCrfgKBtY74gUxDS4thCpv-G4",
  authDomain: "apulink-by-investinpuglia.firebaseapp.com",
  projectId: "apulink-by-investinpuglia",
  storageBucket: "apulink-by-investinpuglia.firebasestorage.app",
  messagingSenderId: "622525573318",
  appId: "1:622525573318:web:618bce514d9ec65c5d8fc7",
  measurementId: "G-8JX22DF6NY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics (client-side only)
let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

export const firebaseAuth = {
  // Sign up new user
  async signUp(email: string, password: string, userData: any) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return { success: true, user };
    } catch (error: any) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  },

  // Sign in existing user
  async signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      console.error('Signin error:', error);
      return { success: false, error: error.message };
    }
  },

  // Sign out
  async signOut() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error: any) {
      console.error('Signout error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get current user
  getCurrentUser() {
    return auth.currentUser;
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }
};

// ============================================
// USER PROFILE FUNCTIONS
// ============================================

export const userService = {
  // Get user profile
  async getUserProfile(userId: string) {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { success: true, data: docSnap.data() };
      } else {
        return { success: false, error: 'User not found' };
      }
    } catch (error: any) {
      console.error('Get profile error:', error);
      return { success: false, error: error.message };
    }
  },

  // Update user profile
  async updateUserProfile(userId: string, updates: any) {
    try {
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error: any) {
      console.error('Update profile error:', error);
      return { success: false, error: error.message };
    }
  }
};

// ============================================
// BUYER FUNCTIONS (Replaces Supabase buyers table)
// ============================================

export const buyerService = {
  // Create buyer profile
  async createBuyer(buyerData: any) {
    try {
      const docRef = await addDoc(collection(db, 'buyers'), {
        ...buyerData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error: any) {
      console.error('Create buyer error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get buyer by ID
  async getBuyer(buyerId: string) {
    try {
      const docRef = doc(db, 'buyers', buyerId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
      } else {
        return { success: false, error: 'Buyer not found' };
      }
    } catch (error: any) {
      console.error('Get buyer error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get all buyers for a user
  async getBuyersByUser(userId: string) {
    try {
      const q = query(
        collection(db, 'buyers'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const buyers = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, data: buyers };
    } catch (error: any) {
      console.error('Get buyers error:', error);
      return { success: false, error: error.message };
    }
  }
};

// ============================================
// INQUIRY FUNCTIONS (Replaces Supabase inquiries table)
// ============================================

export const inquiryService = {
  // Submit inquiry
  async submitInquiry(inquiryData: any) {
    try {
      const docRef = await addDoc(collection(db, 'inquiries'), {
        ...inquiryData,
        status: 'new',
        priority: 'normal',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error: any) {
      console.error('Submit inquiry error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get inquiries
  async getInquiries(filters: any = {}) {
    try {
      let q = collection(db, 'inquiries');
      
      // Apply filters if provided
      if (filters.userId) {
        q = query(q, where('userId', '==', filters.userId));
      }
      if (filters.status) {
        q = query(q, where('status', '==', filters.status));
      }
      if (filters.isSurveyRequest !== undefined) {
        q = query(q, where('isSurveyRequest', '==', filters.isSurveyRequest));
      }
      
      q = query(q, orderBy('createdAt', 'desc'));
      
      const querySnapshot = await getDocs(q);
      const inquiries = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, data: inquiries };
    } catch (error: any) {
      console.error('Get inquiries error:', error);
      return { success: false, error: error.message };
    }
  },

  // Update inquiry status
  async updateInquiryStatus(inquiryId: string, status: string) {
    try {
      const docRef = doc(db, 'inquiries', inquiryId);
      await updateDoc(docRef, {
        status,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error: any) {
      console.error('Update inquiry error:', error);
      return { success: false, error: error.message };
    }
  }
};

// ============================================
// PROFESSIONAL FUNCTIONS (Replaces Supabase professionals table)
// ============================================

export const professionalService = {
  // Register professional
  async registerProfessional(professionalData: any) {
    try {
      // Generate anonymous username if surveyor
      if (professionalData.isSurveyor && professionalData.serviceAreas?.length > 0) {
        const city = professionalData.serviceAreas[0];
        const code = city.substring(0, 2).toUpperCase();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        professionalData.anonymousUsername = `Surveyor_${code}_${random}`;
      }

      const docRef = await addDoc(collection(db, 'professionals'), {
        ...professionalData,
        isVerified: false,
        isActive: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return { success: true, id: docRef.id };
    } catch (error: any) {
      console.error('Register professional error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get professionals
  async getProfessionals(filters: any = {}) {
    try {
      let q = collection(db, 'professionals');
      
      if (filters.isSurveyor !== undefined) {
        q = query(q, where('isSurveyor', '==', filters.isSurveyor));
      }
      if (filters.profession) {
        q = query(q, where('profession', '==', filters.profession));
      }
      if (filters.isVerified !== undefined) {
        q = query(q, where('isVerified', '==', filters.isVerified));
      }
      
      q = query(q, orderBy('createdAt', 'desc'));
      
      const querySnapshot = await getDocs(q);
      const professionals = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, data: professionals };
    } catch (error: any) {
      console.error('Get professionals error:', error);
      return { success: false, error: error.message };
    }
  }
};

// ============================================
// PROJECT FUNCTIONS (Replaces Supabase projects table)
// ============================================

export const projectService = {
  // Create project
  async createProject(projectData: any) {
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        ...projectData,
        progress: 0,
        isActive: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error: any) {
      console.error('Create project error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get projects for user
  async getProjectsByUser(userId: string) {
    try {
      const q = query(
        collection(db, 'projects'),
        where('buyerId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const projects = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, data: projects };
    } catch (error: any) {
      console.error('Get projects error:', error);
      return { success: false, error: error.message };
    }
  },

  // Update project progress
  async updateProjectProgress(projectId: string, progress: number) {
    try {
      const docRef = doc(db, 'projects', projectId);
      await updateDoc(docRef, {
        progress,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error: any) {
      console.error('Update project error:', error);
      return { success: false, error: error.message };
    }
  }
};

// ============================================
// DOCUMENT FUNCTIONS (Replaces Supabase documents table)
// ============================================

export const documentService = {
  // Upload document
  async uploadDocument(file: File, projectId: string, metadata: any = {}) {
    try {
      // Upload file to Firebase Storage
      const storageRef = ref(storage, `projects/${projectId}/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // Save document metadata to Firestore
      const docRef = await addDoc(collection(db, 'documents'), {
        projectId,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        downloadURL,
        ...metadata,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return { success: true, id: docRef.id, downloadURL };
    } catch (error: any) {
      console.error('Upload document error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get documents for project
  async getProjectDocuments(projectId: string) {
    try {
      const q = query(
        collection(db, 'documents'),
        where('projectId', '==', projectId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, data: documents };
    } catch (error: any) {
      console.error('Get documents error:', error);
      return { success: false, error: error.message };
    }
  }
};

// ============================================
// NOTIFICATION FUNCTIONS (Replaces Supabase notifications table)
// ============================================

export const notificationService = {
  // Create notification
  async createNotification(notificationData: any) {
    try {
      const docRef = await addDoc(collection(db, 'notifications'), {
        ...notificationData,
        isRead: false,
        isArchived: false,
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error: any) {
      console.error('Create notification error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get user notifications
  async getUserNotifications(userId: string, unreadOnly: boolean = false) {
    try {
      let q = query(
        collection(db, 'notifications'),
        where('userId', '==', userId)
      );
      
      if (unreadOnly) {
        q = query(q, where('isRead', '==', false));
      }
      
      q = query(q, orderBy('createdAt', 'desc'));
      
      const querySnapshot = await getDocs(q);
      const notifications = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, data: notifications };
    } catch (error: any) {
      console.error('Get notifications error:', error);
      return { success: false, error: error.message };
    }
  },

  // Mark notification as read
  async markAsRead(notificationId: string) {
    try {
      const docRef = doc(db, 'notifications', notificationId);
      await updateDoc(docRef, {
        isRead: true,
        readAt: serverTimestamp()
      });
      return { success: true };
    } catch (error: any) {
      console.error('Mark as read error:', error);
      return { success: false, error: error.message };
    }
  },

  // Subscribe to real-time notifications
  subscribeToNotifications(userId: string, callback: (notifications: any[]) => void) {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('isRead', '==', false),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, (querySnapshot) => {
      const notifications = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(notifications);
    });
  }
};

// ============================================
// QUOTE FUNCTIONS (Replaces Supabase quotes table)
// ============================================

export const quoteService = {
  // Submit quote
  async submitQuote(quoteData: any) {
    try {
      const docRef = await addDoc(collection(db, 'quotes'), {
        ...quoteData,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error: any) {
      console.error('Submit quote error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get quotes for inquiry
  async getInquiryQuotes(inquiryId: string) {
    try {
      const q = query(
        collection(db, 'quotes'),
        where('inquiryId', '==', inquiryId),
        orderBy('price', 'asc')
      );
      
      const querySnapshot = await getDocs(q);
      const quotes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, data: quotes };
    } catch (error: any) {
      console.error('Get quotes error:', error);
      return { success: false, error: error.message };
    }
  }
};

// ============================================
// MESSAGE FUNCTIONS (Replaces Supabase messages table)
// ============================================

export const messageService = {
  // Send message
  async sendMessage(messageData: any) {
    try {
      // Check for contact info
      if (checkForContactInfo(messageData.content)) {
        messageData.flagged = true;
        messageData.flagReason = 'Contains contact information';
      }

      const docRef = await addDoc(collection(db, 'messages'), {
        ...messageData,
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error: any) {
      console.error('Send message error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get conversation messages
  async getConversationMessages(conversationId: string) {
    try {
      const q = query(
        collection(db, 'messages'),
        where('conversationId', '==', conversationId),
        orderBy('createdAt', 'asc')
      );
      
      const querySnapshot = await getDocs(q);
      const messages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, data: messages };
    } catch (error: any) {
      console.error('Get messages error:', error);
      return { success: false, error: error.message };
    }
  },

  // Subscribe to real-time messages
  subscribeToMessages(conversationId: string, callback: (messages: any[]) => void) {
    const q = query(
      collection(db, 'messages'),
      where('conversationId', '==', conversationId),
      orderBy('createdAt', 'asc')
    );
    
    return onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(messages);
    });
  }
};

// Helper function to check for contact info
function checkForContactInfo(message: string): boolean {
  const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const phonePatterns = [
    /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/,
    /\b\d{10}\b/,
    /\b\+\d{1,3}\s?\d{3,14}\b/,
    /\b\(\d{3}\)\s?\d{3}[-.]?\d{4}\b/
  ];
  const keywords = ['whatsapp', 'telegram', 'skype', 'email me', 'call me', 'contact me'];

  const text = message.toLowerCase();

  if (emailPattern.test(text)) return true;
  if (phonePatterns.some(p => p.test(text))) return true;
  if (keywords.some(k => text.includes(k))) return true;

  return false;
}

// Export everything
export default {
  auth: firebaseAuth,
  users: userService,
  buyers: buyerService,
  inquiries: inquiryService,
  professionals: professionalService,
  projects: projectService,
  documents: documentService,
  notifications: notificationService,
  quotes: quoteService,
  messages: messageService
};
