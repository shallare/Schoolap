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
  const headers: HeadersInit = { 'Content-Type': 'application/json', Accept: 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new ApiError(res.status, data as Record<string, unknown>);
  return data as T;
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

  soumettreDossier: (token: string, filiere_id: number) =>
    request<StudentResponse>('POST', '/student/dossier', { filiere_id }, token),

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

  transactions: (token: string) =>
    request<PaginatedResponse<TransactionResponse>>('GET', '/admin/transactions', undefined, token),

  filieres: (token: string) =>
    request<FiliereResponse[]>('GET', '/admin/filieres', undefined, token),
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

export interface StudentResponse {
  id: number;
  matricule: string;
  prenom: string;
  nom: string;
  email: string;
  filiere_id: number | null;
  filiere?: FiliereResponse;
  statut: 'NOUVEAU' | 'EN_ATTENTE' | 'VALIDE' | 'INSCRIT';
  montant_paye: number;
  montant_restant: number;
  progression: number;
  transactions?: TransactionResponse[];
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
