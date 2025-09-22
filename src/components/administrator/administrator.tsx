import { useEffect, useState } from "react";
import { Eye, Check, X } from "lucide-react";

import { pdf } from '@react-pdf/renderer';
import PDF from '../pdf/pdf';

// Interface for applicant data (photoURL missing)
export interface Estudiante {
  id: number;
  estudianteNombre: string;
  estudianteFechaNacimiento: string;
  estudianteGenero: string;
  estudianteCI: string;
  estudianteRIF: string;
  estudianteTelefono: string;
  estudianteInstitucion: string;
  estudianteOcupacion: string;
  estudianteProfesion: string;
  estudianteLugarTrabajo: string;
  estudianteEmail: string;
  estudianteDireccion: string;
  estudianteAlergias: string;
  estudianteAntecedentes: string;
  estudianteAlergiasEspecificadas: string;
  estudianteContactoEmergencia: string;
  estudianteTelefonoContactoEmergencia: string;

  representanteNombre: string;
  representanteCI: string;
  representanteRIF: string;
  representanteParentesco: string;
  representanteTelefono: string;
  representanteOcupacion: string;
  representanteProfesion: string;
  representanteLugarTrabajo: string;
  representanteDireccion: string;
  representanteEmail: string;

  instrumentos: string;
  teoricas: string;
  otros: string;
  autorizacion: string;
  estado: number; // REVISAR
}

// ------------------------------------------------------------------

// Function for calculating applicant's age
const calculateAge = (date: string) => {
  if (!date) return 0;

  date = date.replaceAll("/", "-");
  
  const components = date.split("-");

  const birthDate = new Date(`${components[1]}-${components[0]}-${components[2]}`);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// ------------------------------------------------------------------

// Mock data
export const estudiantes: Estudiante[] = [
  {
    id: 1,
    estudianteNombre: "María Fernanda López",
    estudianteFechaNacimiento: "15/04/2005",
    estudianteGenero: "Femenino",
    estudianteCI: "31548963",
    estudianteRIF: "V315489630",
    estudianteTelefono: "0414-1234567",
    estudianteInstitucion: "U.E. Colegio San Gabriel",
    estudianteOcupacion: "Estudiante",
    estudianteProfesion: "",
    estudianteLugarTrabajo: "",
    estudianteEmail: "marialopez@gmail.com",
    estudianteDireccion: "Av. Bolívar Norte, Naguanagua",
    estudianteAlergias: "Sí",
    estudianteAntecedentes: "Asma infantil",
    estudianteAlergiasEspecificadas: "Polvo, ácaros",
    estudianteContactoEmergencia: "Ana López",
    estudianteTelefonoContactoEmergencia: "0412-7654321",

    representanteNombre: "Ana López",
    representanteCI: "15489632",
    representanteRIF: "V154896320",
    representanteParentesco: "Madre",
    representanteTelefono: "0412-7654321",
    representanteOcupacion: "Docente",
    representanteProfesion: "Educadora",
    representanteLugarTrabajo: "U.E. Colegio San Gabriel",
    representanteDireccion: "Av. Bolívar Norte, Naguanagua",
    representanteEmail: "analopez@gmail.com",

    instrumentos: "Violín",
    teoricas: "Solfeo básico",
    otros: "Participación en coral",
    autorizacion: "Sí",
    estado: 1
  },
  {
    id: 2,
    estudianteNombre: "Carlos Eduardo Márquez",
    estudianteFechaNacimiento: "22/09/2005",
    estudianteGenero: "Masculino",
    estudianteCI: "31321478",
    estudianteRIF: "V313214780",
    estudianteTelefono: "0426-9876543",
    estudianteInstitucion: "Liceo Bolivariano Carabobo",
    estudianteOcupacion: "Estudiante",
    estudianteProfesion: "",
    estudianteLugarTrabajo: "",
    estudianteEmail: "carlosmarquez@gmail.com",
    estudianteDireccion: "Sector La Entrada, Naguanagua",
    estudianteAlergias: "No",
    estudianteAntecedentes: "Ninguno",
    estudianteAlergiasEspecificadas: "",
    estudianteContactoEmergencia: "Luis Márquez",
    estudianteTelefonoContactoEmergencia: "0416-3344556",

    representanteNombre: "Luis Márquez",
    representanteCI: "12457896",
    representanteRIF: "V124578960",
    representanteParentesco: "Padre",
    representanteTelefono: "0416-3344556",
    representanteOcupacion: "Ingeniero",
    representanteProfesion: "Civil",
    representanteLugarTrabajo: "Constructora Carabobo",
    representanteDireccion: "Sector La Entrada, Naguanagua",
    representanteEmail: "luismarquez@gmail.com",

    instrumentos: "Guitarra",
    teoricas: "Armonía intermedia",
    otros: "Taller de composición",
    autorizacion: "Sí",
    estado: 1
  },
  {
    id: 3,
    estudianteNombre: "Valentina Ríos",
    estudianteFechaNacimiento: "03/12/2006",
    estudianteGenero: "Femenino",
    estudianteCI: "32965412",
    estudianteRIF: "V329654120",
    estudianteTelefono: "0412-1122334",
    estudianteInstitucion: "U.E. Nuestra Señora del Rosario",
    estudianteOcupacion: "Estudiante",
    estudianteProfesion: "",
    estudianteLugarTrabajo: "",
    estudianteEmail: "valentinarios@gmail.com",
    estudianteDireccion: "Urbanización El Trigal, Valencia",
    estudianteAlergias: "Sí",
    estudianteAntecedentes: "Dermatitis",
    estudianteAlergiasEspecificadas: "Frutos secos",
    estudianteContactoEmergencia: "Carmen Ríos",
    estudianteTelefonoContactoEmergencia: "0416-9988776",

    representanteNombre: "Carmen Ríos",
    representanteCI: "16543278",
    representanteRIF: "V165432780",
    representanteParentesco: "Madre",
    representanteTelefono: "0416-9988776",
    representanteOcupacion: "Administradora",
    representanteProfesion: "Contadora Pública",
    representanteLugarTrabajo: "Alcaldía de Valencia",
    representanteDireccion: "Urbanización El Trigal, Valencia",
    representanteEmail: "carmenrios@gmail.com",

    instrumentos: "Piano",
    teoricas: "Lectura musical avanzada",
    otros: "Participación en ensamble",
    autorizacion: "Sí",
    estado: 1
  }
];

export default function Administrator() {
  // State variable for students data
  const [students, setStudents] = useState<Estudiante[]>([]);

  // State variable for loading view management
  const [loading, setLoading] = useState<boolean>(true);

  // State variable for error message management
  const [error, setError] = useState<string | null>(null);

  // State variables for confirmation/rejection modals management
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const [showRejectionModal, setShowRejectionModal] = useState<boolean>(false);

  // State variables for selected student
  const [selectedStudent, setSelectedStudent] = useState<number>(0);

  // ------------------------------------------------------------------

  // Get applicants data using fetch (wait-list)
  useEffect(() => {
    try {
      setLoading(true);
      setTimeout(() => {
        setStudents(estudiantes.filter((e) => e.estado === 1));
        setLoading(false);
      }, 3000);
    } catch(error) {
      console.error("Error al cargar la lista de espera:", error);
      setError("Error al cargar la lista de espera.");
    }
  }, []);

  // ------------------------------------------------------------------

  // PDF generation handler
  const handleGeneratePDF = async (e: Estudiante): Promise<void> => {
    try {
      const body = {
        photoURL: "",
        estudianteNombre: e.estudianteNombre || "",
        estudianteFechaNacimiento: e.estudianteFechaNacimiento || "",
        estudianteGenero: e.estudianteGenero || "",
        estudianteCI: e.estudianteCI || "",
        estudianteRIF: e.estudianteRIF || "",
        estudianteTelefono: e.estudianteTelefono,
        estudianteInstitucion: e.estudianteInstitucion || "",
        estudianteOcupacion: e.estudianteOcupacion || "",
        estudianteProfesion: e.estudianteProfesion || "",
        estudianteLugarTrabajo: e.estudianteLugarTrabajo || "",
        estudianteEmail: e.estudianteEmail || "",
        estudianteDireccion: e.estudianteDireccion || "",
        estudianteAlergias: e.estudianteAlergias || "",
        estudianteAntecedentes: e.estudianteAntecedentes || "",
        estudianteAlergiasEspecificadas: e.estudianteAlergiasEspecificadas || "",
        estudianteContactoEmergencia: e.estudianteContactoEmergencia || "",
        estudianteTelefonoContactoEmergencia: e.estudianteTelefonoContactoEmergencia,
        
        representanteNombre: e.representanteNombre || "",
        representanteCI: e.representanteCI || "",
        representanteRIF: e.representanteRIF || "",
        representanteParentesco: e.representanteParentesco || "",
        representanteTelefono: e.representanteTelefono,
        representanteOcupacion: e.representanteOcupacion || "",
        representanteProfesion: e.representanteProfesion || "",
        representanteLugarTrabajo: e.representanteLugarTrabajo || "",
        representanteDireccion: e.representanteDireccion || "",
        representanteEmail: e.representanteEmail || "",
        
        instrumentos: e.instrumentos || "",
        teoricas: e.teoricas || "",
        otros: e.otros || "",
        autorizacion: e.autorizacion || "",
      };

      const blob = await pdf(<PDF data={body} />).toBlob();
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `Planilla-${Date.now()}.pdf`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error en la generación de PDF:", error)
    }
  }

  // ------------------------------------------------------------------

  // Student registration handler
  const handleRegistration = async (e: Estudiante): Promise<void> => {
    try {
      const res = await fetch("/api/estudiante", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estudianteNombre: e.estudianteNombre || "",
          estudianteFechaNacimiento: e.estudianteFechaNacimiento || "",
          estudianteGenero: e.estudianteGenero || "",
          estudianteCI: e.estudianteCI || "",
          estudianteRIF: e.estudianteRIF || "",
          estudianteTelefono: e.estudianteTelefono,
          estudianteInstitucion: e.estudianteInstitucion || "",
          estudianteOcupacion: e.estudianteOcupacion || "",
          estudianteProfesion: e.estudianteProfesion || "",
          estudianteLugarTrabajo: e.estudianteLugarTrabajo || "",
          estudianteEmail: e.estudianteEmail || "",
          estudianteDireccion: e.estudianteDireccion || "",
          estudianteAlergias: e.estudianteAlergias || "",
          estudianteAntecedentes: e.estudianteAntecedentes || "",
          estudianteAlergiasEspecificadas: e.estudianteAlergiasEspecificadas || "",
          estudianteContactoEmergencia: e.estudianteContactoEmergencia || "",
          estudianteTelefonoContactoEmergencia: e.estudianteTelefonoContactoEmergencia,
          
          representanteNombre: e.representanteNombre || "",
          representanteCI: e.representanteCI || "",
          representanteRIF: e.representanteRIF || "",
          representanteParentesco: e.representanteParentesco || "",
          representanteTelefono: e.representanteTelefono,
          representanteOcupacion: e.representanteOcupacion || "",
          representanteProfesion: e.representanteProfesion || "",
          representanteLugarTrabajo: e.representanteLugarTrabajo || "",
          representanteDireccion: e.representanteDireccion || "",
          representanteEmail: e.representanteEmail || "",
          
          instrumentos: e.instrumentos || "",
          teoricas: e.teoricas || "",
          otros: e.otros || "",
          autorizacion: e.autorizacion || "",
        }),
      })

      const results = await res.json();
      
      if (!res.ok) {
        console.log(`Error: ${results.message}`)
        alert("Ha ocurrido un error. Por favor, intente nuevamente más tarde.");
        return
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Applicant acceptation handler
  const handleAcceptation = async (id: number) => {
    try {
      const student = students.find((s) => s.id === id) ?? null;

      if (student) {
        const updated = students.map((s) => s.id === id ? { ...s, estado: 0 } : s);
        setStudents(updated);
      } else {
        alert("Error. No se ha encontrado al aplicante.")
      }

      window.location.reload();
      alert("Aplicante aceptado con éxito.");
    } catch (error) {
      console.error(error);
      alert("Error.");
    }
  };

  // ------------------------------------------------------------------

  // Applicant rejection handler
  const handleRejection = async (id: number) => {
    try {
      const student = students.find((s) => s.id === id) ?? null;

      if (student) {
        const updated = students.map((s) => s.id === id ? { ...s, estado: 0 } : s);
        setStudents(updated);
      } else {
        alert("Error. No se ha encontrado al aplicante.")
      }

      window.location.reload();
      alert("Aplicante rechazado con éxito.");
    } catch (error) {
      console.error(error);
      alert("Error.");
    }
  };

  return (
    <section id="administrator">
      <div className="flex flex-col w-[90vw] md:w-[80vw] items-center justify-center py-16 gap-12 mx-auto">
        <div className="flex flex-col w-full gap-6 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-center gap-2">
            <img src="/logo-original.png" alt="Programa de Formación Musical - Maestro José Calabrese" className="w-20 md:w-20 md:h-fit justify-center" />
            <img src="/logo-fosc.png" alt="Fundación Orquesta Sinfónica de Carabobo" className="w-35 md:w-35 md:h-fit justify-center pl-2 border-l border-gray-300" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-montserrat text-gray-800 font-medium text-center">Programa de Formación Musical</h1>
            <h2 className="text-2xl font-montserrat text-gray-800 font-bold text-center">Maestro José Calabrese</h2>
          </div>
          <h3 className="text-xl font-montserrat text-gray-800 font-bold text-center">Lista de Espera</h3>
        </div>
        
        {loading ? (
          <p className="text-lg font-montserrat text-gray-700 font-bold text-center w-full">Cargando aplicantes...</p>
        ) : error ? (
          <p className="text-lg font-montserrat text-gray-700 font-bold text-center w-full">{error}</p>
        ) : (
          <div className="w-full overflow-x-auto max-h-[60vh]">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr className="hover:bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-montserrat text-gray-700 font-medium uppercase tracking-wider">Nombre</th>
                  <th className="px-4 py-2 text-left text-xs font-montserrat text-gray-700 font-medium uppercase tracking-wider">Edad</th>
                  <th className="px-4 py-2 text-left text-xs font-montserrat text-gray-700 font-medium uppercase tracking-wider">Cédula</th>
                  <th className="px-4 py-2 text-left text-xs font-montserrat text-gray-700 font-medium uppercase tracking-wider">Instrumento(s)</th>
                  <th className="px-4 py-2 text-left text-xs font-montserrat text-gray-700 font-medium uppercase tracking-wider">Teórica(s)</th>
                  <th className="px-4 py-2 text-left text-xs font-montserrat text-gray-700 font-medium uppercase tracking-wider">Otro(s)</th>
                  <th className="px-4 py-2 text-left text-xs font-montserrat text-gray-700 font-medium uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.length === 0 ? (
                  <tr className="hover:bg-gray-100">
                    <td colSpan={7} className="px-4 py-4 text-xs font-montserrat font-medium text-center">
                      No hay aplicantes en lista de espera
                    </td>
                  </tr>
                ) : (
                  students.map((e) => (
                    <tr key={e.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2 text-xs font-montserrat">{e.estudianteNombre}</td>
                      <td className="px-4 py-2 text-xs font-montserrat">{e.estudianteFechaNacimiento ? calculateAge(e.estudianteFechaNacimiento) : "-"}</td>
                      <td className="px-4 py-2 text-xs font-montserrat">{e.estudianteCI || '—'}</td>
                      <td className="px-4 py-2 text-xs font-montserrat">{e.instrumentos || '—'}</td>
                      <td className="px-4 py-2 text-xs font-montserrat">{e.teoricas || '—'}</td>
                      <td className="px-4 py-2 text-xs font-montserrat">{e.otros || '—'}</td>
                      <td className="flex flex-row items-center justify-center gap-4 py-2">
                        <button onClick={() => handleGeneratePDF(e)} aria-label="Ver planilla">
                          <Eye className="w-4 h-4 text-blue-500 hover:text-blue-700"></Eye>
                        </button>
                        <button onClick={() => { setSelectedStudent(e.id); setShowConfirmationModal(true); }} aria-label="Aprobar">
                          <Check className="w-4 h-4 text-green-500 hover:text-green-700"></Check>
                        </button>
                        <button onClick={() => { setSelectedStudent(e.id); setShowRejectionModal(true); }} aria-label="Rechazar">
                          <X className="w-4 h-4 text-red-500 hover:text-red-700"></X>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de confirmación */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="flex flex-col bg-white max-w-sm w-full rounded-lg p-8 gap-6">
            <p className="font-montserrat font-medium text-center">
              ¿Está seguro de que desea aceptar a <b>{students.find(e => e.id === selectedStudent)?.estudianteNombre}</b>? Esta acción no se puede revertir.
            </p>
            <div className="flex items-center justify-center gap-2">
              <button className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-full text-sm font-montserrat font-medium text-center" onClick={() => setShowConfirmationModal(false)}>
                Volver
              </button>
              <button className="bg-green-200 hover:bg-green-300 px-6 py-2 rounded-full text-sm font-montserrat font-medium text-center" onClick={() => { setShowConfirmationModal(false); handleAcceptation(selectedStudent); }}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de rechazo */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="flex flex-col bg-white max-w-sm w-full rounded-lg p-8 gap-6">
            <p className="font-montserrat font-medium text-center">
              ¿Está seguro de que desea rechazar a <b>{students.find(e => e.id === selectedStudent)?.estudianteNombre}</b>? Esta acción no se puede revertir.
            </p>
            <div className="flex items-center justify-center gap-2">
              <button className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-full text-sm font-montserrat font-medium" onClick={() => setShowRejectionModal(false)}>
                Volver
              </button>
              <button className="bg-red-200 hover:bg-red-300 px-6 py-2 rounded-full text-sm font-montserrat font-medium" onClick={() => { setShowRejectionModal(false); handleRejection(selectedStudent); }}>
                Rechazar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}