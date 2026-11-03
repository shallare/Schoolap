import { useState } from 'react';
import { StudentData, FILIERES, formatMoney, useAppDB } from '../../lib/data';
import { CheckCircle2, Paperclip, Upload, GraduationCap } from 'lucide-react';

const REQUIRED_DOCS = [
  { id: 'diplome', title: 'Diplôme ou Attestation de réussite' },
  { id: 'releve',  title: 'Relevé de notes officiel' },
  { id: 'photo',   title: "Photo d'identité récente" },
  { id: 'cni',     title: 'CNI ou Passeport en cours de validité' },
];

export default function Dossier({ student }: { student: StudentData }) {
  const [filiere, setFiliere]   = useState(student.filiere || '');
  const [loading, setLoading]   = useState(false);
  const [docs, setDocs]         = useState<Record<string, boolean>>({});
  const { updateStudentById }   = useAppDB();

  const uploadDoc = (id: string) => setDocs((prev) => ({ ...prev, [id]: true }));
  const docCount  = Object.values(docs).filter(Boolean).length;

  const submit = () => {
    if (!filiere) { alert('Veuillez sélectionner une filière.'); return; }
    setLoading(true);
    setTimeout(() => {
      updateStudentById(student.id, {
        filiere,
        tuitionTotal: FILIERES[filiere as keyof typeof FILIERES]?.price || 0,
        documents: docs,
        status: 'PENDING',
      });
    }, 1500);
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800">
        <h3 className="font-display font-semibold text-white text-sm">Pièces du dossier</h3>
        <p className="text-xs text-slate-500 mt-0.5">Complétez votre dossier pour soumettre votre demande d'admission</p>
      </div>

      <div className="p-6 flex flex-col gap-6">

        {/* FILIERE SELECTOR */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Choix de la filière
          </label>
          <div className="relative">
            <select
              title="Choisir une filière"
              value={filiere}
              onChange={(e) => setFiliere(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none"
            >
              <option value="" disabled className="text-slate-600">Sélectionnez votre filière…</option>
              {Object.entries(FILIERES).map(([name, data]) => (
                <option key={name} value={name} className="text-slate-100 bg-slate-900">
                  {name} — {formatMoney(data.price)}/an
                </option>
              ))}
            </select>
            <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          </div>
        </div>

        {/* DOCUMENTS */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Pièces à fournir
            </label>
            <span className="text-xs text-slate-500">{docCount}/{REQUIRED_DOCS.length} téléversés</span>
          </div>

          <div className="flex flex-col gap-2">
            {REQUIRED_DOCS.map((doc) => {
              const uploaded = !!docs[doc.id];
              return (
                <div
                  key={doc.id}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                    uploaded
                      ? 'bg-emerald-500/5 border-emerald-500/20'
                      : 'bg-slate-800/50 border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      uploaded ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-700 text-slate-400'
                    }`}>
                      {uploaded ? <CheckCircle2 size={15} /> : <Paperclip size={15} />}
                    </div>
                    <span className={`text-sm ${uploaded ? 'text-slate-300' : 'text-slate-400'}`}>
                      {doc.title}
                    </span>
                  </div>

                  <label className="cursor-pointer">
                    <input type="file" className="hidden" onChange={() => uploadDoc(doc.id)} />
                    {uploaded ? (
                      <span className="text-xs font-semibold text-emerald-400">Ajouté</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                        <Upload size={12} /> Ajouter
                      </span>
                    )}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="button"
          onClick={submit}
          disabled={loading || !filiere}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          {loading ? 'Soumission en cours…' : 'Soumettre le dossier'}
        </button>
        <p className="text-xs text-slate-500 text-center -mt-2">
          Les pièces incomplètes peuvent retarder le traitement de votre dossier.
        </p>

      </div>
    </div>
  );
}
