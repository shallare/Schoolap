import { useEffect, useState } from 'react';

export const DB_KEY = 'schoolap_data';

export const FILIERES = {
  "Licence Design UI/UX": { price: 300000, level: "Licence (BAC+3)", desc: "Création d'interfaces web et mobile, prototypage Figma." },
  "Master Ingénierie Logicielle": { price: 450000, level: "Master (BAC+5)", desc: "Architecture cloud, DevOps, Développement Fullstack." },
  "MBA Finance d'Entreprise": { price: 550000, level: "MBA", desc: "Analyse financière, audit et gestion de risques." },
  "Master Management Stratégique": { price: 480000, level: "Master (BAC+5)", desc: "Leadership, gestion de projet et stratégie business." },
  "Bachelor Design Graphique": { price: 320000, level: "Bachelor (BAC+3)", desc: "Communication visuelle, branding et suite Adobe." },
  "Licence Développement Web": { price: 350000, level: "Licence (BAC+3)", desc: "Fondamentaux du web, Frontend et Backend." },
};

export type StudentStatus = 'NEW' | 'PENDING' | 'VALIDATED' | 'PAID';

export interface Transaction {
  date: string;
  amount: number;
  ref: string;
}

export interface StudentData {
  name: string;
  email: string;
  id: string;
  status: StudentStatus;
  filiere: string;
  tuitionTotal: number;
  paidAmount: number;
  documents: Record<string, boolean>;
  transactions: Transaction[];
}

export interface AppData {
  students: StudentData[];
  currentUserEmail: string | null;
}

export function getDBData(): AppData {
  const raw = localStorage.getItem(DB_KEY);
  if (raw) return JSON.parse(raw);
  return { students: [], currentUserEmail: null };
}

export function setDBData(data: AppData) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

export function resetDB() {
  localStorage.removeItem(DB_KEY);
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
}

export function useAppDB() {
  const [data, setData] = useState<AppData>(getDBData());

  const refresh = () => {
    setData(getDBData());
  };

  useEffect(() => {
    const handleStorage = () => refresh();
    window.addEventListener('storage', handleStorage);
    const interval = setInterval(refresh, 2000);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    }
  }, []);

  const login = (email: string) => {
    const current = getDBData();
    current.currentUserEmail = email;
    setDBData(current);
    refresh();
  };

  const logout = () => {
    const current = getDBData();
    current.currentUserEmail = null;
    setDBData(current);
    refresh();
  };

  const registerStudent = (student: StudentData) => {
    const current = getDBData();
    current.students.push(student);
    current.currentUserEmail = student.email;
    setDBData(current);
    refresh();
  };

  const updateStudentField = (field: keyof StudentData, value: any) => {
    const current = getDBData();
    if (current.currentUserEmail) {
      const idx = current.students.findIndex(s => s.email === current.currentUserEmail);
      if (idx !== -1) {
        current.students[idx] = { ...current.students[idx], [field]: value };
        setDBData(current);
        refresh();
      }
    }
  };

  const updateStudentById = (id: string, update: Partial<StudentData>) => {
    const current = getDBData();
    const idx = current.students.findIndex(s => s.id === id);
    if (idx !== -1) {
      current.students[idx] = { ...current.students[idx], ...update };
      setDBData(current);
      refresh();
    }
  };

  const updateData = (newData: AppData) => {
    setDBData(newData);
    refresh();
  };

  const currentUser = data.students.find(s => s.email === data.currentUserEmail);

  return { 
    data, 
    currentUser, 
    login, 
    logout, 
    registerStudent, 
    updateData, 
    updateStudentField, 
    updateStudentById, 
    refresh 
  };
}
