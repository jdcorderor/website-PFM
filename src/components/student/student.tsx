import { useState, useEffect } from "react";
import { studentApi, type Estudiante, type Nota } from "../../lib/api";

// Function for grouping grades by subject
function groupBySubject(notas: Nota[]): Record<string, Nota[]> {
    return notas.reduce((acc, nota) => {
        acc[nota.materia] = acc[nota.materia] || [];
        acc[nota.materia].push(nota);
        return acc;
    }, {} as Record<string, Nota[]>);
}
  
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
        const fetchStudentData = async () => {
            try {
                setLoadingStudent(true);
                
                // Get user data from localStorage (set during login)
                const userData = localStorage.getItem('user_data');
                if (!userData) {
                    setStudentError("No se encontraron datos de usuario. Por favor, inicie sesión nuevamente.");
                    setLoadingStudent(false);
                    return;
                }

                const user = JSON.parse(userData);
                // Use the student ID from the user data (assuming it's linked via id_estudiante)
                const studentId = user.id_estudiante || user.id;
                const response = await studentApi.getProfile(studentId);
                
                if (response.data) {
                    setStudent(response.data);
                } else {
                    setStudentError("No se encontraron datos del estudiante.");
                }
            } catch (error) {
                console.error("Error al cargar los datos del estudiante:", error);
                setStudentError("Error al cargar los datos del estudiante.");
            } finally {
                setLoadingStudent(false);
            }
        };

        fetchStudentData();
    }, []);
    
    // Get student's grades using fetch
    useEffect(() => {
        const fetchGrades = async () => {
            try {
                setLoadingGrades(true);
                
                // Get user data from localStorage
                const userData = localStorage.getItem('user_data');
                if (!userData) {
                    setGradesError("No se encontraron datos de usuario.");
                    setLoadingGrades(false);
                    return;
                }

                const user = JSON.parse(userData);
                // Use the student ID from the user data
                const studentId = user.id_estudiante || user.id;
                const response = await studentApi.getGrades(studentId);
                
                if (response.data && Array.isArray(response.data)) {
                    const groupedGrades = groupBySubject(response.data);
                    setGrades(groupedGrades);
                } else {
                    setGrades({});
                }
            } catch (error) {
                console.error("Error al cargar las notas del estudiante:", error);
                setGradesError("Error al cargar las notas del estudiante.");
            } finally {
                setLoadingGrades(false);
            }
        };

        fetchGrades();
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
                            <div className="text-sm font-montserrat text-gray-700"><b>Cédula de identidad:</b> {student?.cedula || "No registrado"}</div>
                            <div className="text-sm font-montserrat text-gray-700"><b>Teléfono:</b> {student?.telefono_estudiantes || "No registrado"}</div>
                            <div className="text-sm font-montserrat text-gray-700"><b>Correo electrónico:</b> {student?.correo_electronico || "No registrado"}</div>
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
