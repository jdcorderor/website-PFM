import { useEffect, useState } from "react"
import { Eye, Check, X } from "lucide-react"

import { pdf } from "@react-pdf/renderer"
import PDF from "../pdf/pdf"
import { listaEsperaApi, type ListaEsperaItem } from "../../lib/api"

// ------------------------------------------------------------------

// Function for calculating applicant's age
const calculateAge = (date?: string | null) => {
  if (!date) return 0

  const normalizedDate = date.replaceAll("/", "-")

  const birthDate = new Date(normalizedDate)

  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()

  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

// ------------------------------------------------------------------

const normalizeListString = (value?: string | null): string[] => {
  if (!value) return []

  return value
    .split(/[,\n;]+/)
    .map((item) => item.trim())
    .filter(Boolean)
}

const extractCatedraNames = (
  catedras: ListaEsperaItem["catedras"],
  typeName: string
): string[] => {
  if (!catedras || !Array.isArray(catedras)) return []

  const normalizedType = typeName.toLowerCase()

  return catedras
    .filter((catedra) =>
      catedra?.tipo?.nombre
        ? catedra.tipo.nombre.toLowerCase() === normalizedType
        : false
    )
    .map((catedra) => catedra.nombre)
    .filter(Boolean)
}

const getInstrumentSummary = (aspirante: ListaEsperaItem): string => {
  const values = [
    ...normalizeListString(aspirante.instrumento as string | undefined),
    ...normalizeListString(aspirante.instrumentos),
    ...extractCatedraNames(aspirante.catedras, "Instrumento"),
  ]

  if (values.length === 0) return "—"

  return Array.from(new Set(values)).join(", ")
}

const getTeoricasSummary = (aspirante: ListaEsperaItem): string => {
  const values = [
    ...normalizeListString(aspirante.teoricas_data ?? undefined),
    ...normalizeListString(aspirante.teoricas),
    ...extractCatedraNames(aspirante.catedras, "Teoricas"),
  ]

  if (values.length === 0) return "—"

  return Array.from(new Set(values)).join(", ")
}

const formatDate = (value?: string | null): string => {
  if (!value) return ""

  const parsedDate = new Date(value)
  if (Number.isNaN(parsedDate.getTime())) {
    return value
  }

  return parsedDate.toISOString().split("T")[0]
}

const formatBoolean = (value?: boolean | string | null): string => {
  if (typeof value === "boolean") {
    return value ? "Sí" : "No"
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase()
    if (["1", "true", "si", "sí"].includes(normalized)) return "Sí"
    if (["0", "false", "no"].includes(normalized)) return "No"
  }

  return ""
}

const getStudentPhone = (aspirante: ListaEsperaItem): string => {
  return (
    aspirante.telefono_estudiantes ??
    (aspirante.telefono as string | undefined) ??
    ""
  )
}

const getStudentEmail = (aspirante: ListaEsperaItem): string => {
  return aspirante.correo_electronico ?? aspirante.email ?? ""
}

const getRepresentativeEmail = (aspirante: ListaEsperaItem): string => {
  return (
    aspirante.representante_email ??
    (aspirante.email_representante as string | undefined) ??
    ""
  )
}

const getRepresentativeAddress = (aspirante: ListaEsperaItem): string => {
  return (
    aspirante.representante_direccion ??
    (aspirante.direccion_representante as string | undefined) ??
    ""
  )
}

const getRepresentativeRif = (aspirante: ListaEsperaItem): string => {
  return (
    aspirante.representante_rif ??
    (aspirante.rif_representante as string | undefined) ??
    ""
  )
}

const getRepresentativeProfession = (aspirante: ListaEsperaItem): string => {
  return (
    aspirante.representante_profesion ??
    (aspirante.profesion_representante as string | undefined) ??
    ""
  )
}

const getRepresentativeWorkplace = (aspirante: ListaEsperaItem): string => {
  return (
    aspirante.representante_lugar_trabajo ??
    (aspirante.lugar_trabajo_representante as string | undefined) ??
    ""
  )
}

const getStudentAlergias = (aspirante: ListaEsperaItem): string => {
  return (
    aspirante.alergias ?? (aspirante.alergico_a as string | undefined) ?? ""
  )
}

const getStudentAlergiasEspecificadas = (
  aspirante: ListaEsperaItem
): string => {
  return (
    aspirante.alergias_especificadas ??
    (aspirante.especificacion_antecedentes as string | undefined) ??
    ""
  )
}

const getOtrosSummary = (aspirante: ListaEsperaItem): string => {
  const values = [
    ...normalizeListString(aspirante.otros_data ?? undefined),
    ...normalizeListString(aspirante.otros),
    ...extractCatedraNames(aspirante.catedras, "Otros"),
  ]

  if (values.length === 0) return "—"

  return Array.from(new Set(values)).join(", ")
}

export default function Administrator() {
  // State variable for students data
  const [students, setStudents] = useState<ListaEsperaItem[]>([])

  // State variable for loading view management
  const [loading, setLoading] = useState<boolean>(true)

  // State variable for error message management
  const [error, setError] = useState<string | null>(null)

  // State variables for confirmation/rejection modals management
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false)
  const [showRejectionModal, setShowRejectionModal] = useState<boolean>(false)

  // State variables for selected student
  const [selectedStudent, setSelectedStudent] = useState<number>(0)

  // ------------------------------------------------------------------

  // Get applicants data using fetch (wait-list)
  useEffect(() => {
    const fetchWaitList = async () => {
      try {
        setLoading(true)
        const response = await listaEsperaApi.getAll()

        if (response.data) {
          // Your Laravel controller already filters by estado = 1
          setStudents(response.data)
        } else {
          setStudents([])
        }
      } catch (error) {
        console.error("Error al cargar la lista de espera:", error)
        setError("Error al cargar la lista de espera.")
      } finally {
        setLoading(false)
      }
    }

    fetchWaitList()
  }, [])

  // ------------------------------------------------------------------

  // PDF generation handler
  const handleGeneratePDF = async (e: ListaEsperaItem): Promise<void> => {
    try {
      const body = {
        photoURL: e.photo_url || "",
        estudianteNombre: e.nombre || "",
        estudianteFechaNacimiento: formatDate(e.fecha_nacimiento),
        estudianteEdad: e.fecha_nacimiento
          ? String(calculateAge(e.fecha_nacimiento))
          : "",
        estudianteGenero: e.genero || "",
        estudianteCI: e.cedula || "",
        estudianteRIF: e.rif || "",
        estudianteTelefono: getStudentPhone(e),
        estudianteInstitucion: e.institucion_educacional || "",
        estudianteOcupacion: e.ocupacion || "",
        estudianteProfesion: e.profesion || "",
        estudianteLugarTrabajo: e.lugar_trabajo || "",
        estudianteEmail: getStudentEmail(e),
        estudianteDireccion: e.direccion || "",
        estudianteAlergias: getStudentAlergias(e),
        estudianteAntecedentes: e.antecedentes || "",
        estudianteAlergiasEspecificadas: getStudentAlergiasEspecificadas(e),
        estudianteContactoEmergencia: e.nombre_emergencia || "",
        estudianteTelefonoContactoEmergencia: e.numero_emergencia || "",

        representanteNombre: e.nombre_representante || "",
        representanteCI: e.cedula_representante || "",
        representanteRIF: getRepresentativeRif(e),
        representanteParentesco: e.parentesco || "",
        representanteTelefono: e.telefono_representante || "",
        representanteOcupacion: e.ocupacion_representante || "",
        representanteProfesion: getRepresentativeProfession(e),
        representanteLugarTrabajo: getRepresentativeWorkplace(e),
        representanteDireccion: getRepresentativeAddress(e),
        representanteEmail: getRepresentativeEmail(e),

        instrumentos: getInstrumentSummary(e) || "",
        teoricas: getTeoricasSummary(e) || "",
        otros: getOtrosSummary(e) || "",
        autorizacion: formatBoolean(e.autorizacion),
      }

      const blob = await pdf(<PDF data={body} />).toBlob()
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = `Planilla-${Date.now()}.pdf`

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error en la generación de PDF:", error)
    }
  }

  // ------------------------------------------------------------------

  // Applicant acceptation handler
  const handleAcceptation = async (id: number) => {
    try {
      const student = students.find((s) => s.id === id) ?? null

      if (student) {
        const response = await listaEsperaApi.accept(id)

        if (response.message) {
          setStudents((prev) => prev.filter((s) => s.id !== id))
          alert(
            `Aplicante aceptado con éxito${
              student.nombre ? `: ${student.nombre}` : ""
            }.`
          )
        } else {
          alert("Error al aceptar al aplicante.")
        }
      } else {
        alert("Error. No se ha encontrado al aplicante.")
      }
    } catch (error) {
      console.error("Acceptation error:", error)
      alert("Error al procesar la aceptación.")
    }
  }

  // ------------------------------------------------------------------

  // Applicant rejection handler
  const handleRejection = async (id: number) => {
    try {
      const student = students.find((s) => s.id === id) ?? null

      if (student) {
        const response = await listaEsperaApi.reject(id)

        if (response.message) {
          // Remove from local state
          setStudents((prev) => prev.filter((s) => s.id !== id))
          alert(
            `Aplicante rechazado con éxito${
              student.nombre ? `: ${student.nombre}` : ""
            }.`
          )
        } else {
          alert("Error al rechazar al aplicante.")
        }
      } else {
        alert("Error. No se ha encontrado al aplicante.")
      }
    } catch (error) {
      console.error("Rejection error:", error)
      alert("Error al procesar el rechazo.")
    }
  }

  return (
    <section id="administrator">
      <div className="absolute inset-0 z-0 w-full">
        <img src="/background.png" className="w-full h-full" />
      </div>

      <div className="flex flex-col w-[90vw] md:w-[80vw] items-center justify-center py-16 gap-12 mx-auto relative z-10">
        <div className="flex flex-col w-full gap-6 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-center gap-2">
            <img
              src="/logo.png"
              alt="Academia Internacional de Música - Maestro José Calabrese"
              className="w-22 md:w-22 md:h-fit justify-center"
            />
            <img
              src="/logo-fosc.png"
              alt="Fundación Orquesta Sinfónica de Carabobo"
              className="w-35 md:w-35 md:h-fit justify-center pl-2 border-l border-gray-300"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-montserrat text-gray-800 font-medium text-center">
              Academia Internacional de Música
            </h1>
            <h2 className="text-2xl font-montserrat text-gray-800 font-bold text-center">
              Maestro José Calabrese
            </h2>
          </div>
          <h3 className="text-xl font-montserrat text-gray-800 font-bold text-center">
            Lista de Espera
          </h3>
        </div>

        {loading ? (
          <p className="text-lg font-montserrat text-gray-700 font-bold text-center w-full">
            Cargando aplicantes...
          </p>
        ) : error ? (
          <p className="text-lg font-montserrat text-gray-700 font-bold text-center w-full">
            {error}
          </p>
        ) : (
          <div className="w-full overflow-auto max-h-[60vh]">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr className="hover:bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-montserrat text-gray-700 font-medium uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-montserrat text-gray-700 font-medium uppercase tracking-wider">
                    Edad
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-montserrat text-gray-700 font-medium uppercase tracking-wider">
                    Cédula
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-montserrat text-gray-700 font-medium uppercase tracking-wider">
                    Instrumento(s)
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-montserrat text-gray-700 font-medium uppercase tracking-wider">
                    Teórica(s)
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-montserrat text-gray-700 font-medium uppercase tracking-wider">
                    Otro(s)
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-montserrat text-gray-700 font-medium uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.length === 0 ? (
                  <tr className="hover:bg-gray-100">
                    <td
                      colSpan={7}
                      className="px-4 py-4 text-xs font-montserrat font-medium text-center"
                    >
                      No hay aplicantes en lista de espera
                    </td>
                  </tr>
                ) : (
                  students.map((e) => {
                    const instrumentSummary = getInstrumentSummary(e)
                    const teoricasSummary = getTeoricasSummary(e)
                    const otrosSummary = getOtrosSummary(e)

                    return (
                      <tr key={e.id} className="hover:bg-gray-100">
                        <td className="px-4 py-2 text-xs font-montserrat">
                          {e.nombre}
                        </td>
                        <td className="px-4 py-2 text-xs font-montserrat">
                          {e.fecha_nacimiento
                            ? calculateAge(e.fecha_nacimiento)
                            : "-"}
                        </td>
                        <td className="px-4 py-2 text-xs font-montserrat">
                          {e.cedula || "—"}
                        </td>
                        <td className="px-4 py-2 text-xs font-montserrat">
                          {instrumentSummary}
                        </td>
                        <td className="px-4 py-2 text-xs font-montserrat">
                          {teoricasSummary}
                        </td>
                        <td className="px-4 py-2 text-xs font-montserrat">
                          {otrosSummary}
                        </td>
                        <td className="flex flex-row items-center justify-center gap-4 py-2">
                          <button
                            onClick={() => handleGeneratePDF(e)}
                            aria-label="Ver planilla"
                          >
                            <Eye className="w-4 h-4 text-blue-500 hover:text-blue-700"></Eye>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedStudent(e.id)
                              setShowConfirmationModal(true)
                            }}
                            aria-label="Aprobar"
                          >
                            <Check className="w-4 h-4 text-green-500 hover:text-green-700"></Check>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedStudent(e.id)
                              setShowRejectionModal(true)
                            }}
                            aria-label="Rechazar"
                          >
                            <X className="w-4 h-4 text-red-500 hover:text-red-700"></X>
                          </button>
                        </td>
                      </tr>
                    )
                  })
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
              ¿Está seguro de que desea aceptar a{" "}
              <b>{students.find((e) => e.id === selectedStudent)?.nombre}</b>?
              Esta acción no se puede revertir.
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-full text-sm font-montserrat font-medium text-center"
                onClick={() => setShowConfirmationModal(false)}
              >
                Volver
              </button>
              <button
                className="bg-green-200 hover:bg-green-300 px-6 py-2 rounded-full text-sm font-montserrat font-medium text-center"
                onClick={() => {
                  setShowConfirmationModal(false)
                  handleAcceptation(selectedStudent)
                }}
              >
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
              ¿Está seguro de que desea rechazar a{" "}
              <b>{students.find((e) => e.id === selectedStudent)?.nombre}</b>?
              Esta acción no se puede revertir.
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-full text-sm font-montserrat font-medium"
                onClick={() => setShowRejectionModal(false)}
              >
                Volver
              </button>
              <button
                className="bg-red-200 hover:bg-red-300 px-6 py-2 rounded-full text-sm font-montserrat font-medium"
                onClick={() => {
                  setShowRejectionModal(false)
                  handleRejection(selectedStudent)
                }}
              >
                Rechazar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
