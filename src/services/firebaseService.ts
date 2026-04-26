import { db, auth } from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where,
  Timestamp 
} from 'firebase/firestore';

export const boutiqueService = {
  // Provisioning
  async createBoutique(data: any) {
    return await addDoc(collection(db, 'boutiques'), {
      ...data,
      createdAt: Timestamp.now(),
      status: 'Active'
    });
  },

  async getAllBoutiques() {
    const snapshot = await getDocs(collection(db, 'boutiques'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};

export const productService = {
  async addProduct(boutiqueId: string, product: any) {
    return await addDoc(collection(db, 'products'), {
      ...product,
      boutiqueId,
      createdAt: Timestamp.now()
    });
  },

  async getProducts(boutiqueId: string) {
    const q = query(collection(db, 'products'), where('boutiqueId', '==', boutiqueId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async updateProduct(productId: string, data: any) {
    const docRef = doc(db, 'products', productId);
    return await updateDoc(docRef, data);
  },

  async deleteProduct(productId: string) {
    return await deleteDoc(doc(db, 'products', productId));
  }
};
