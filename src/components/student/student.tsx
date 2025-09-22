import { useState, useEffect } from "react";

// Interface for student data
interface Estudiante {
    id: number;
    nombre: string;
    cedula: string;
    telefono: string;
    email: string;
    instrumentos: string;
    teoricas: string;
    otros: string;
    activo: number;
}

// Interface for grades data
interface Nota {
    nota_final: number;
    nivel_inicial: string;
    siguiente_nivel: string;
    materia: string;
    periodo: string;
    fecha_periodo: string;
    profesor: string;
};

// ------------------------------------------------------

// Function for grouping grades by subject
function groupBySubject(notas: Nota[]): Record<string, Nota[]> {
    return notas.reduce((acc, nota) => {
        acc[nota.materia] = acc[nota.materia] || [];
        acc[nota.materia].push(nota);
        return acc;
    }, {} as Record<string, Nota[]>);
}

// ------------------------------------------------------

// Mock data
const estudiante = {
    id: 1,
    nombre: "Pedro Pérez",
    cedula: "32546731",
    telefono: "04241563782",
    email: "pedroperez@gmail.com",
    instrumentos: "",
    teoricas: "",
    otros: "",
    activo: 1 
}

const notas: Record<string, Nota[]> = {
    "Piano": [
      {
        nota_final: 18.7,
        nivel_inicial: "Inicial",
        siguiente_nivel: "Intermedio",
        materia: "Piano",
        periodo: "2025-1",
        fecha_periodo: "2025-03-10",
        profesor: "Prof. Valentina Romero"
      },
      {
        nota_final: 19.2,
        nivel_inicial: "Intermedio",
        siguiente_nivel: "Avanzado",
        materia: "Piano",
        periodo: "2025-2",
        fecha_periodo: "2025-07-08",
        profesor: "Prof. Valentina Romero"
      }
    ],
    "Teoría Musical": [
      {
        nota_final: 17.5,
        nivel_inicial: "Básico",
        siguiente_nivel: "Intermedio",
        materia: "Teoría Musical",
        periodo: "2025-1",
        fecha_periodo: "2025-03-12",
        profesor: "Prof. Luis Mavarez"
      }
    ],
    "Violín": [
      {
        nota_final: 16.8,
        nivel_inicial: "Intermedio",
        siguiente_nivel: "Avanzado",
        materia: "Violín",
        periodo: "2025-2",
        fecha_periodo: "2025-07-15",
        profesor: "Prof. Camila Ríos"
      },
      {
        nota_final: 18.0,
        nivel_inicial: "Avanzado",
        siguiente_nivel: "Superior",
        materia: "Violín",
        periodo: "2025-3",
        fecha_periodo: "2025-11-05",
        profesor: "Prof. Camila Ríos"
      }
    ],
    "Canto": [
      {
        nota_final: 19.5,
        nivel_inicial: "Inicial",
        siguiente_nivel: "Intermedio",
        materia: "Canto",
        periodo: "2025-1",
        fecha_periodo: "2025-03-18",
        profesor: "Prof. Sofía Román"
      }
    ]
};
  
export default function Student() {
    // State variable for student data
    const [student, setStudent] = useState<Estudiante | null>(null);

    // State variable for student's grades (grouped by subject)
    const [grades, setGrades] = useState<Record<string, Nota[]> | null>(null);

    // State variables for loading views management
    const [loadingStudent, setLoadingStudent] = useState(true);
    const [loadingGrades, setLoadingGrades] = useState(false);

    // State variables for errors management
    const [studentError, setStudentError] = useState<string | null>(null);
    const [gradesError, setGradesError] = useState<string | null>(null);

    // ------------------------------------------------------

    // Get student's data using fetch
    useEffect(() => {
        try {
            setLoadingStudent(true);
            setTimeout(() => {
                setStudent(estudiante);
                setLoadingStudent(false);
            }, 2000);
        } catch(error) {
            console.error("Error al cargar los datos del estudiante:", error);
            setStudentError("Error al cargar los datos del estudiante.");
            setStudent(null);
        }
    }, []);
    
    // Get student's grades using fetch
    useEffect(() => {
        try {
            setLoadingGrades(true);
            setTimeout(() => {
                setGrades(notas);
                setLoadingGrades(false);
            }, 4000);
        } catch(error) {
            console.error("Error al cargar las notas del estudiante:", error);
            setGradesError("Error al cargar las notas del estudiante.");
            setGrades(null);
        }
    }, []);

    // ------------------------------------------------------

    // Alternative views
    if (loadingStudent) {
        return (
            <div className="flex flex-col w-full h-120 md:h-150 items-center justify-center">
                <p className="text-lg font-montserrat text-gray-700 font-bold">Cargando...</p>
            </div>
        );
    }

    if (studentError) {
        return (
            <div className="flex flex-col w-full h-120 md:h-150 items-center justify-center">
                <p className="text-xl font-montserrat text-red-500 font-bold">Error: {studentError}</p>
            </div>
        );
    }
    
    if (!loadingStudent && !student) {
        return (
            <div className="flex flex-col w-full h-120 md:h-150 items-center justify-center">
                <p className="text-xl font-montserrat text-red-500 font-bold">Error: Estudiante no encontrado.</p>
            </div>
        );
    }

    return (
        <section id="student">
            <div className="flex flex-col md:w-[75%] py-8 md:py-16 mx-auto gap-8 md:gap-12">
                <div className="flex flex-col w-full items-center py-8 gap-6 md:border border-gray-200 rounded-lg">
                    <h2 className="text-2xl font-montserrat text-gray-800 font-bold text-center w-[85%] md:w-[80%] pb-4 border-b border-gray-200">Información personal</h2>
                    <div className="flex flex-col md:flex-row w-[85%] md:w-[80%] items-start justify-center gap-6 md:gap-16">
                        <div className="flex flex-col gap-2">
                            <div className="text-sm font-montserrat text-gray-700"><b>Nombre completo:</b> {student?.nombre}</div>
                            <div className="text-sm font-montserrat text-gray-700"><b>Cédula de identidad:</b> {student?.cedula}</div>
                            <div className="text-sm font-montserrat text-gray-700"><b>Teléfono:</b> {student?.telefono}</div>
                            <div className="text-sm font-montserrat text-gray-700"><b>Correo electrónico:</b> {student?.email}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="text-sm font-montserrat text-gray-700"><b>Instrumento principal:</b> {student?.instrumentos ? student?.instrumentos : "No registrado"}</div>
                            <div className="text-sm font-montserrat text-gray-700"><b>Teóricas:</b> {student?.teoricas ? student?.teoricas : "No registrado"} </div>
                            <div className="text-sm font-montserrat text-gray-700"><b>Otros:</b> {student?.otros ? student?.otros : "No registrado"}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="text-sm font-montserrat text-gray-700"><b>Estatus Administrativo:</b> N/A</div>
                            <div className="text-sm font-montserrat text-gray-700"><b>Estatus Académico:</b> {student?.activo === 1 ? "Activo" : "Inactivo"}</div>
                        </div>
                    </div>
                </div>

                {/* Historial académico */}
                {loadingGrades ? (
                    <p className="text-lg font-montserrat text-gray-700 font-bold text-center w-full">Cargando notas...</p>
                ) : gradesError ? (
                    <p className="text-lg font-montserrat text-red-500 font-bold text-center w-full">Error: {gradesError}</p>
                ) : grades && Object.entries(grades).length > 0 ? (
                    Object.entries(grades).map(([materia, registros]) => (
                        <div key={materia} className="flex flex-col w-[85%] md:w-full items-center justify-center py-8 px-6 md:px-12 mx-auto gap-6 border border-gray-200 rounded-lg">
                            <h3 className="text-lg md:text-xl font-montserrat text-gray-800 font-bold text-center">Historial académico: {materia}</h3>
                            <div className="w-full overflow-x-auto max-h-[60vh]">
                                <table className="w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr className="hover:bg-gray-50">
                                            <th className="px-4 py-2 text-left text-xs font-montserrat text-gray-700 font-medium uppercase tracking-wider">Periodo</th>
                                            <th className="px-4 py-2 text-left text-xs font-montserrat text-gray-700 font-medium uppercase tracking-wider">Profesor</th>
                                            <th className="px-4 py-2 text-left text-xs font-montserrat text-gray-700 font-medium uppercase tracking-wider">Nivel inicial</th>
                                            <th className="px-4 py-2 text-left text-xs font-montserrat text-gray-700 font-medium uppercase tracking-wider">Nota final</th>
                                            <th className="px-4 py-2 text-left text-xs font-montserrat text-gray-700 font-medium uppercase tracking-wider">Siguiente nivel</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {registros.map((nota, i) => (
                                            <tr key={i} className="hover:bg-gray-50">
                                                <td className="px-4 py-2 text-xs font-montserrat">{nota.periodo}</td>
                                                <td className="px-4 py-2 text-xs font-montserrat">{nota.profesor}</td>
                                                <td className="px-4 py-2 text-xs font-montserrat">{nota.nivel_inicial}</td>
                                                <td className="px-4 py-2 text-xs font-montserrat">{nota.nota_final}</td>
                                                <td className="px-4 py-2 text-xs font-montserrat">{nota.siguiente_nivel}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))
                ) : (
                    !loadingGrades && <p className="text-lg font-montserrat text-gray-700 font-bold text-center w-full">Error: No hay notas disponibles para el estudiante <b>{student?.nombre}.</b></p>
                )}
            </div>
        </section>
    );
}