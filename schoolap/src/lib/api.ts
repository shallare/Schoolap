/**
 * SCHOOLAP — Service API Laravel
 * Toutes les requêtes vers http://localhost:8000/api/v1
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/v1';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

class ApiError extends Error {
  constructor(
    public status: number,
    public data: Record<string, unknown>,
  ) {
    super(data.message as string ?? 'Erreur API');
  }
}

async function request<T>(
  method: HttpMethod,
  path: string,
  body?: unknown,
  token?: string | null,
): Promise<T> {
  const isFormData = body instanceof FormData;
  const headers: HeadersInit = { Accept: 'application/json' };
  if (!isFormData) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new ApiError(res.status, data as Record<string, unknown>);
  return data as T;
}

async function requestBlob(path: string, token: string): Promise<Blob> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: '*/*' },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new ApiError(res.status, data as Record<string, unknown>);
  }

  return res.blob();
}

/* ─── Token storage ──────────────────────────────────────────────── */
export const tokenStore = {
  get: ()       => localStorage.getItem('schoolap_token'),
  set: (t: string) => localStorage.setItem('schoolap_token', t),
  clear: ()     => localStorage.removeItem('schoolap_token'),
};

/* ─── Auth ───────────────────────────────────────────────────────── */
export const authApi = {
  registerStudent: (data: {
    prenom: string; nom: string; email: string;
    password: string; password_confirmation: string; filiere_id?: number;
  }) => request<{ student: StudentResponse; token: string }>('POST', '/auth/register', data),

  loginStudent: (email: string, password: string) =>
    request<{ student: StudentResponse; token: string }>('POST', '/auth/login', { email, password }),

  loginAdmin: (email: string, password: string) =>
    request<{ user: AdminResponse; token: string }>('POST', '/admin/auth/login', { email, password }),

  logout: (token: string) =>
    request<{ message: string }>('POST', '/student/logout', undefined, token),

  me: (token: string) =>
    request<StudentResponse>('GET', '/student/me', undefined, token),
};

/* ─── Étudiant ───────────────────────────────────────────────────── */
export const studentApi = {
  profile: (token: string) =>
    request<StudentResponse>('GET', '/student/profile', undefined, token),

  updateProfile: (token: string, data: Partial<StudentResponse>) =>
    request<StudentResponse>('PUT', '/student/profile', data, token),

  soumettreDossier: (token: string, filiere_id: number, documents?: Record<string, File>) => {
    if (!documents || Object.keys(documents).length === 0) {
      return request<StudentResponse>('POST', '/student/dossier', { filiere_id }, token);
    }

    const form = new FormData();
    form.append('filiere_id', String(filiere_id));
    Object.entries(documents).forEach(([type, file]) => {
      form.append(`documents[${type}]`, file);
    });

    return request<StudentResponse>('POST', '/student/dossier', form, token);
  },

  effectuerPaiement: (token: string, montant: number, mode_paiement: string) =>
    request<{ transaction: TransactionResponse; student: StudentResponse }>(
      'POST', '/student/paiement', { montant, mode_paiement }, token,
    ),
};

/* ─── Admin ──────────────────────────────────────────────────────── */
export const adminApi = {
  dashboard: (token: string) =>
    request<DashboardStats>('GET', '/admin/dashboard', undefined, token),

  students: (token: string, params?: { statut?: string; search?: string }) => {
    const qs = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
    return request<PaginatedResponse<StudentResponse>>('GET', `/admin/students${qs}`, undefined, token);
  },

  updateStatut: (token: string, id: number, statut: string) =>
    request<StudentResponse>('PUT', `/admin/students/${id}/statut`, { statut }, token),

  updateStudent: (token: string, id: number, data: {
    prenom: string; nom: string; email: string; filiere_id: number | null; statut: string; password?: string;
  }) => request<StudentResponse>('PUT', `/admin/students/${id}`, data, token),

  deleteStudent: (token: string, id: number) =>
    request<{ message: string }>('DELETE', `/admin/students/${id}`, undefined, token),

  studentDocuments: (token: string, id: number) =>
    request<StudentDocumentResponse[]>('GET', `/admin/students/${id}/documents`, undefined, token),

  documentBlob: (token: string, documentId: number) =>
    requestBlob(`/admin/documents/${documentId}/view`, token),

  transactions: (token: string) =>
    request<PaginatedResponse<TransactionResponse>>('GET', '/admin/transactions', undefined, token),

  filieres: (token: string) =>
    request<FiliereResponse[]>('GET', '/admin/filieres', undefined, token),

  createFiliere: (token: string, data: {
    nom: string; niveau: string; description: string; frais_annuels: number; active: boolean;
  }) => request<FiliereResponse>('POST', '/admin/filieres', data, token),
};

/* ─── Public ─────────────────────────────────────────────────────── */
export const publicApi = {
  filieres: () => request<FiliereResponse[]>('GET', '/filieres'),
};

/* ─── Types réponses ─────────────────────────────────────────────── */
export interface FiliereResponse {
  id: number;
  nom: string;
  niveau: string;
  description: string;
  frais_annuels: number;
  active: boolean;
}

export interface TransactionResponse {
  id: number;
  reference: string;
  student_id: number;
  montant: number;
  mode_paiement: string;
  statut: string;
  created_at: string;
}

export interface StudentDocumentResponse {
  id: number;
  student_id: number;
  type: string;
  title: string;
  original_name: string;
  mime_type: string | null;
  size: number;
  created_at: string;
}

export interface StudentResponse {
  id: number;
  matricule: string;
  prenom: string;
  nom: string;
  name: string;
  email: string;
  filiere_id: number | null;
  filiere?: FiliereResponse;
  statut: 'NEW' | 'PENDING' | 'VALIDATED' | 'PAID';
  montant_paye: number;
  montant_restant: number;
  progression: number;
  transactions?: TransactionResponse[];
  documents?: StudentDocumentResponse[];
}

export interface AdminResponse {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface DashboardStats {
  stats: {
    total_etudiants: number;
    dossiers_attente: number;
    inscrits: number;
    chiffre_affaires: number;
    total_attendu: number;
    filieres_actives: number;
  };
  activite_recente: StudentResponse[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}
