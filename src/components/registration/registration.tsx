import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { v4 as uuid } from "uuid";

import { pdf } from '@react-pdf/renderer';
import PDF from '../pdf/pdf';
import { catedraApi, aspiranteApi, type Catedra, type AspiranteRequest } from '../../lib/api';

// Interface for subjects selection
interface Campo {
    id: string,
    valor: string,
}

export default function Registration() {
  // State variables for error/modal's management
  const [showModal, setShowModal] = useState<boolean>(false);
  const [RIFError, setRIFError] = useState("")
  const [RIFRepresentanteError, setRIFRepresentanteError] = useState("")

  // State variable for student's form fields
  const [estudianteNombre, setEstudianteNombre] = useState<string | null>(null);
  const [estudianteFechaNacimiento, setEstudianteFechaNacimiento] = useState<string | null>(null);
  const [estudianteEdad, setEstudianteEdad] = useState<string | null>(null);
  const [estudianteGenero, setEstudianteGenero] = useState<string | null>(null); 
  const [estudianteCI, setEstudianteCI] = useState<string | null>(null);
  const [estudianteRIF, setEstudianteRIF] = useState<string | null>(null);
  const [estudianteCodigoTelefono, setEstudianteCodigoTelefono] = useState<string | null>(null);
  const [estudianteTelefono, setEstudianteTelefono] = useState<string | null>(null);
  const [estudianteInstitucion, setEstudianteInstitucion] = useState<string | null>(null);
  const [estudianteOcupacion, setEstudianteOcupacion] = useState<string | null>(null);
  const [estudianteProfesion, setEstudianteProfesion] = useState<string | null>(null);
  const [estudianteLugarTrabajo, setEstudianteLugarTrabajo] = useState<string | null>(null);
  const [estudianteDireccion, setEstudianteDireccion] = useState<string | null>(null);
  const [estudianteEmail, setEstudianteEmail] = useState<string | null>(null);
  const [estudianteAlergias, setEstudianteAlergias] = useState<string | null>(null);
  const [estudianteAlergiasEspecificadas, setEstudianteAlergiasEspecificadas] = useState<string | null>(null);
  const [estudianteAntecedentes, setEstudianteAntecedentes] = useState<string | null>(null);  
  const [estudianteContactoEmergencia, setEstudianteContactoEmergencia] = useState<string | null>(null);
  const [estudianteCodigoTelefonoEmergencia, setEstudianteCodigoTelefonoEmergencia] = useState<string | null>(null);
  const [estudianteTelefonoEmergencia, setEstudianteTelefonoEmergencia] = useState<string | null>(null);

  // State variables for legal representative's form fields
  const [representanteNombre, setRepresentanteNombre] = useState<string | null>(null);
  const [representanteCI, setRepresentanteCI] = useState<string | null>(null);
  const [representanteRIF, setRepresentanteRIF] = useState<string | null>(null);
  const [representanteParentesco, setRepresentanteParentesco] = useState<string | null>(null);
  const [representanteCodigoTelefono, setRepresentanteCodigoTelefono] = useState<string | null>(null);
  const [representanteTelefono, setRepresentanteTelefono] = useState<string | null>(null);
  const [representanteOcupacion, setRepresentanteOcupacion] = useState<string | null>(null);
  const [representanteProfesion, setRepresentanteProfesion] = useState<string | null>(null);
  const [representanteLugarTrabajo, setRepresentanteLugarTrabajo] = useState<string | null>(null);
  const [representanteDireccion, setRepresentanteDireccion] = useState<string | null>(null);
  const [representanteEmail, setRepresentanteEmail] = useState<string | null>(null);

  // State variables for additional form fields
  const [autorizacion, setAutorizacion] = useState<string | null>(null);
  const [instrumentos, setInstrumentos] = useState<Campo[]>([{ id: uuid(), valor: "" }]);
  const [teoricas, setTeoricas] = useState<Campo[]>([{ id: uuid(), valor: "" }]);
  const [otros, setOtros] = useState<Campo[]>([{ id: uuid(), valor: "" }]);

  // State variable for underage detector
  const [esMenor, setEsMenor] = useState<boolean>(true);  

  // ----------------------------------------------------------------------------------------------

  // Add subjects (instrumental)
  const handleAddInstrumentos = () => {
    const newField: Campo = { id: uuid(), valor: "" };

    if (instrumentos.length > 2) {
      if (confirm("¿Desea añadir otro instrumento? Cantidad de instrumentos seleccionados: " + (instrumentos.length))) {
        setInstrumentos([...instrumentos, newField]);
      }
    } else {
      setInstrumentos([...instrumentos, newField]);
    }
  };
  
  // Add subjects (theoretical)
  const handleAddTeoricas = () => {
    const newField: Campo = { id: uuid(), valor: "" };

    if (teoricas.length > 2) {
      if (confirm("¿Desea añadir otra cátedra teórica? Cantidad de cátedras teóricas seleccionadas: " + (teoricas.length))) {
        setTeoricas([...teoricas, newField]);
      }
    } else {
      setTeoricas([...teoricas, newField]);
    }
  };
  
  // Add subjects (others)
  const handleAddOtros = () => {
    const newField: Campo = { id: uuid(), valor: "" };

    if (otros.length > 2) {
      if (confirm("¿Desea añadir otra cátedra complementaria? Cantidad de cátedras complementarias seleccionadas: " + (otros.length))) {
        setOtros([...otros, newField]);
      }
    } else {
      setOtros([...otros, newField]);
    }
  };

  // ----------------------------------------------------------------------------------------------

  // Change subjects (instrumental)
  const handleChangeInstrumento = (id: string, newValue: string) => {
    setInstrumentos(prev => prev.map(field => field.id === id ? { ...field, valor: newValue } : field));
  };
  
  // Change subjects (theoretical)
  const handleChangeTeoricas = (id: string, newValue: string) => {
    setTeoricas(prev => prev.map(field => field.id === id ? { ...field, valor: newValue } : field));
  };
  
  // Change subjects (others)
  const handleChangeOtros = (id: string, newValue: string) => {
    setOtros(prev => prev.map(field => field.id === id ? { ...field, valor: newValue } : field));
  };

  // ----------------------------------------------------------------------------------------------
  
  // Delete subjects (instrumental)
  const handleDeleteInstrumentos = (id: string) => {
    setInstrumentos(prev => prev.filter(field => field.id !== id));
  };

  // Delete subjects (theoretical)
  const handleDeleteTeoricas = (id: string) => {
    setTeoricas(prev => prev.filter(field => field.id !== id));
  };

  // Delete subjects (others)
  const handleDeleteOtras = (id: string) => {
    setOtros(prev => prev.filter(field => field.id !== id));
  };

  // ----------------------------------------------------------------------------------------------
  
  // State variables for image management
  const [photo64, setPhoto64] = useState<String | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null)

  // Change selected image
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const objectURL = URL.createObjectURL(file);
      setPreviewURL(objectURL);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  // ----------------------------------------------------------------------------------------------
   
  // Ref
  const hasFetched = useRef(false);

  // State variables for available subjects
  const [listadoInstrumentos, setListadoInstrumentos] = useState<string[]>([]);
  const [listadoTeoricas, setListadoTeoricas] = useState<string[]>([]);
  const [listadoOtros, setListadoOtros] = useState<string[]>([]);
  
  // Get subjects using fetch
  useEffect(() => {
    if (hasFetched.current) return;
  
    const fetchSubjects = async () => {
      try {
        const response = await catedraApi.getAll();
        
        if (response.data) {
          const instrumentos: string[] = [];
          const teoricas: string[] = [];
          const otros: string[] = [];
  
          // Process catedras from 'data' field
          response.data.forEach((item: Catedra) => {
            switch (item.tipo) {
              case "instrumento":
                instrumentos.push(item.nombre);
                break;
              case "teorica":
                teoricas.push(item.nombre);
                break;
              case "grupal":
                otros.push(item.nombre);
                break;
            }
          });

          // Process grupales from 'grupales' field
          if (response.grupales) {
            response.grupales.forEach((grupal) => {
              otros.push(grupal.nombre);
            });
          }
  
          setListadoInstrumentos(instrumentos);
          setListadoTeoricas(teoricas);
          setListadoOtros(otros);
        }
      } catch (err) {
        console.error("Error al obtener cátedras:", err);
      }
    };
  
    fetchSubjects();
    hasFetched.current = true;
  }, []);
  
  // ----------------------------------------------------------------------------------------------

  // OS detector
  const isApple = typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // ----------------------------------------------------------------------------------------------
  
  // RIF validator
  const validateRIF = (rif: string) => {
    const letter = rif.trim().toUpperCase();
    const RIFRegex = /^[JV]\d{9}$/;
    return RIFRegex.test(letter);
  }

  // ----------------------------------------------------------------------------------------------
  
  // PDF generation handler
  const handleGeneratePDF = async (): Promise<void> => {
    try {
      const instrumentosData = instrumentos.map(item => item.valor).join(", ");
      const teoricasData = teoricas.map(item => item.valor).join(", ");
      const otrosData = otros.map(item => item.valor).join(", ");

      var telefonoEstudiante = "";
      var telefonoRepresentante = "";
      var telefonoEmergencia = "";

      if (estudianteCodigoTelefono && estudianteTelefono) {
        var telefonoEstudiante = estudianteCodigoTelefono + estudianteTelefono;
      }

      if (representanteCodigoTelefono && representanteTelefono) {
        var telefonoRepresentante = representanteCodigoTelefono + representanteTelefono;
      }

      if (estudianteCodigoTelefonoEmergencia && estudianteTelefonoEmergencia) {
        var telefonoEmergencia = estudianteCodigoTelefonoEmergencia + estudianteTelefonoEmergencia;
      }
      
      const body = {
        photoURL: photo64 || "",
        estudianteNombre: estudianteNombre || "",
        estudianteFechaNacimiento: `${estudianteFechaNacimiento?.split("-")[2]}/${estudianteFechaNacimiento?.split("-")[1]}/${estudianteFechaNacimiento?.split("-")[0]}` || "",
        estudianteEdad: estudianteEdad || "",
        estudianteGenero: estudianteGenero || "",
        estudianteCI: estudianteCI || "",
        estudianteRIF: estudianteRIF || "",
        estudianteTelefono: telefonoEstudiante,
        estudianteInstitucion: estudianteInstitucion || "",
        estudianteOcupacion: estudianteOcupacion || "",
        estudianteProfesion: estudianteProfesion || "",
        estudianteLugarTrabajo: estudianteLugarTrabajo || "",
        estudianteEmail: estudianteEmail || "",
        estudianteDireccion: estudianteDireccion || "",
        estudianteAlergias: estudianteAlergias || "",
        estudianteAntecedentes: estudianteAntecedentes || "",
        estudianteAlergiasEspecificadas: estudianteAlergiasEspecificadas || "",
        estudianteContactoEmergencia: estudianteContactoEmergencia || "",
        estudianteTelefonoContactoEmergencia: telefonoEmergencia,
          
        representanteNombre: representanteNombre || "",
        representanteCI: representanteCI || "",
        representanteRIF: representanteRIF || "",
        representanteParentesco: representanteParentesco || "",
        representanteTelefono: telefonoRepresentante,
        representanteOcupacion: representanteOcupacion || "",
        representanteProfesion: representanteProfesion || "",
        representanteLugarTrabajo:representanteLugarTrabajo || "",
        representanteDireccion: representanteDireccion || "",
        representanteEmail: representanteEmail || "",
          
        instrumentos: instrumentosData || "",
        teoricas: teoricasData || "",
        otros: otrosData || "",
        autorizacion: autorizacion || "",
      }

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

  // Student registration handler
  const handleRegistration = async (): Promise<void> => {
    try {
      const instrumentosData = instrumentos.map(item => item.valor).join(", ");
      const teoricasData = teoricas.map(item => item.valor).join(", ");
      const otrosData = otros.map(item => item.valor).join(", ");

      var telefonoEstudiante = "";
      var telefonoRepresentante = "";
      var telefonoEmergencia = "";

      if (estudianteCodigoTelefono && estudianteTelefono) {
        var telefonoEstudiante = estudianteCodigoTelefono + estudianteTelefono;
      }

      if (representanteCodigoTelefono && representanteTelefono) {
        var telefonoRepresentante = representanteCodigoTelefono + representanteTelefono;
      }

      if (estudianteCodigoTelefonoEmergencia && estudianteTelefonoEmergencia) {
        var telefonoEmergencia = estudianteCodigoTelefonoEmergencia + estudianteTelefonoEmergencia;
      }
      
      const aspiranteData: AspiranteRequest = {
        nombre: estudianteNombre || "",
        genero: estudianteGenero || "",
        cedula: estudianteCI || "",
        fecha_nacimiento: estudianteFechaNacimiento || "",
        correo_electronico: estudianteEmail || "",
        direccion: estudianteDireccion || "",
        telefono_estudiantes: telefonoEstudiante,
        rif: estudianteRIF || "",
        institucion_educacional: estudianteInstitucion || "",
        ocupacion: estudianteOcupacion || "",
        profesion: estudianteProfesion || "",
        lugar_trabajo: estudianteLugarTrabajo || "",
        alergico_a: estudianteAlergias || "",
        antecedentes: estudianteAntecedentes || "",
        especificacion_antecedentes: estudianteAlergiasEspecificadas || "",
        nombre_emergencia: estudianteContactoEmergencia || "",
        numero_emergencia: telefonoEmergencia,
        
        nombre_representante: representanteNombre || "",
        cedula_representante: representanteCI || "",
        parentesco: representanteParentesco || "",
        telefono_representante: telefonoRepresentante,
        ocupacion_representante: representanteOcupacion || "",
        profesion_representante: representanteProfesion || "",
        lugar_trabajo_representante: representanteLugarTrabajo || "",
        direccion_representante: representanteDireccion || "",
        rif_representante: representanteRIF || "",
        email_representante: representanteEmail || "",
        
        instrumentos: instrumentosData || "",
        teoricas: teoricasData || "",
        otros: otrosData || "",
        autorizacion: autorizacion === "Sí" || autorizacion === "Si",
      };

      const response = await aspiranteApi.create(aspiranteData);
      
      if (response.message && response.id) {
        alert("Inscripción enviada exitosamente. Será contactado pronto.");
      } else {
        alert("Ha ocurrido un error. Por favor, intente nuevamente más tarde.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Ha ocurrido un error. Por favor, intente nuevamente más tarde.");
    }
  }

  // Submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const studentRIFValidation = validateRIF(estudianteRIF || "");
    const representativeRIFValidation = validateRIF(representanteRIF || "");

    if (studentRIFValidation) {
      setRIFError("Formato de RIF inválido. Debe utilizar J o V, seguido de 9 dígitos.")
    }

    if (representativeRIFValidation) {
      setRIFRepresentanteError("Formato de RIF inválido. Debe utilizar J o V, seguido de 9 dígitos.")
    }

    if (form.checkValidity() && studentRIFValidation && representativeRIFValidation) {
      setShowModal(true);
      handleGeneratePDF();
    }
  };

  return (
    <section id="inscripción" className="w-full overflow-hidden bg-white py-12 background">
        <div className="flex flex-col w-[90%] md:w-[55%] gap-6 py-4 md:py-12 mx-auto mb-12 md:bg-white md:border border-gray-200 rounded-3xl">
            <div className="flex flex-col gap-8">
                <div className="flex w-full items-center justify-center">
                    <div className="flex items-center justify-center gap-2">
                        <img src="/logo.png" alt="Academia Internacional de Música - Maestro José Calabrese" className="w-22 md:w-22 md:h-fit justify-center" />
                        <img src="/logo-fosc.png" alt="Fundación Orquesta Sinfónica de Carabobo" className="w-35 md:w-35 md:h-fit justify-center pl-2 border-l border-gray-300" />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <h1 className="md:text-xl font-montserrat font-medium text-center">Academia Internacional de Música</h1>
                    <h2 className="text-xl md:text-3xl font-montserrat font-bold text-center">Maestro José Calabrese</h2>
                </div>
                <p className="md:text-lg font-montserrat font-semibold text-center">Planilla de Inscripción</p>
            </div>

            <form onSubmit={ handleSubmit } className="flex flex-col w-[90%] md:w-[80%] items-center justify-center gap-6 md:gap-4 mx-auto">

                {/* -------------------- Estudiante -------------------- */}

                <h3 className="font-montserrat font-medium text-center md:text-left w-full pt-6 md:pt-8 pb-2 mt-0 md:mt-4 border-t border-gray-200">Datos del Estudiante</h3>

                {/* Foto */}
                <div className="flex flex-col items-center justify-center w-[40%] gap-4 mb-4 imagen">
                    <div className="flex flex-col items-center gap-2 imagen">
                        <div className="w-[120px] h-[160px] bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden imagen">
                            {previewURL ? (
                                <img src={previewURL} alt="Vista previa" className="object-cover w-full h-full" />
                            ) : (
                                <span className="text-xs font-montserrat text-gray-500">Foto</span>
                            )}
                        </div>

                        <label htmlFor="imagen" className="cursor-pointer text-center text-[0.8rem] font-montserrat font-semibold text-blue-600 hover:underline">
                            <input
                                className="hidden"
                                id="imagen"
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                            />
                            Subir foto
                        </label>
                    </div>

                    <p className="text-[0.7rem] font-montserrat font-medium text-center text-gray-600 leading-snug">
                        La foto debe ser nítida, tipo carnet, fondo blanco, tamaño 3x4 cm. Formato JPG o PNG.
                    </p>
                </div>

                {/* Nombres y apellidos */}
                <div className="flex flex-col gap-1">
                    <label>Nombres y Apellidos *</label>
                    <input
                        type="text"
                        required
                        value={estudianteNombre || ""}
                        onChange={(e) => setEstudianteNombre(e.target.value)}
                    />
                </div>

                {/* Fecha de nacimiento y edad */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col gap-1">
                        <label>Fecha de Nacimiento *</label>
                        <input
                            type="date"
                            required
                            max={new Date().toISOString().split("T")[0]}
                            value={estudianteFechaNacimiento ?? ""}
                            onChange={(e) => {
                                const fecha = e.target.value;
                                setEstudianteFechaNacimiento(fecha);

                                if (fecha) {
                                    const nacimiento = new Date(fecha);
                                    const hoy = new Date();

                                    let edad = hoy.getFullYear() - nacimiento.getFullYear();
                                    const mes = hoy.getMonth() - nacimiento.getMonth();
                                    const dia = hoy.getDate() - nacimiento.getDate();

                                    if (mes < 0 || (mes === 0 && dia < 0)) {
                                        edad--;
                                    }

                                    setEstudianteEdad(String(edad));
                                    setEsMenor(edad < 18);
                                } else {
                                    setEstudianteEdad("");
                                    setEsMenor(false);
                                }
                            }}
                            className={`${isApple ? "h-9" : "w-full"}`}
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label>Edad *</label>
                        <input
                            type="text"
                            required
                            readOnly
                            tabIndex={-1}
                            value={estudianteEdad ?? ""}
                        />
                    </div>
                </div>

                {/* Género y cédula de identidad */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col gap-1">
                        <label>Género *</label>
                        <select
                            required
                            value={ estudianteGenero || "" }
                            onChange={(e) => setEstudianteGenero(e.target.value)}
                            className="h-9"
                        >
                            <option value="" disabled>Seleccione una opción</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label>Cédula de Identidad</label>
                        <input
                            type="text"
                            value={estudianteCI || ""}
                            onChange={(e) => setEstudianteCI(e.target.value)}
                            placeholder="eg. 12345678"
                            maxLength={8}
                            minLength={6}
                        />
                    </div>
                </div>

                {/* Teléfono y RIF */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col gap-1">
                        <label>Teléfono Celular *</label>
                        <div className="flex gap-2">
                            <select
                                className="w-[60%]"
                                value={estudianteCodigoTelefono || ""}
                                onChange={(e) => setEstudianteCodigoTelefono(e.target.value)}
                            >
                                <option value="" disabled>Seleccione una opción</option>
                                <option value="0412">0412</option>
                                <option value="0422">0422</option>
                                <option value="0414">0414</option>
                                <option value="0424">0424</option>
                                <option value="0416">0416</option>
                                <option value="0426">0426</option>
                            </select>
                        
                            <input
                                type="text"
                                maxLength={7}
                                minLength={7}
                                value={estudianteTelefono || ""}
                                onChange={(e) => setEstudianteTelefono(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label>Registro de Información Fiscal (RIF)</label>
                        <input
                            type="text"
                            placeholder="eg. V123456789"
                            value={estudianteRIF || ""}
                            onChange={(e) => {
                                setEstudianteRIF(e.target.value);
                                if (RIFError !== "") {
                                    setRIFError("");
                                }
                            }}
                            maxLength={10}
                            minLength={10}
                        />
                        <span>{RIFError}</span>
                    </div>
                </div>

                {/* Institución educativa y ocupación */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col gap-1">
                        <label>Institución Educativa</label>
                        <input
                            type="text"
                            value={estudianteInstitucion || ""}
                            onChange={(e) => setEstudianteInstitucion(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label>Ocupación</label>
                        <input
                            type="text"
                            value={estudianteOcupacion || ""}
                            onChange={(e) => setEstudianteOcupacion(e.target.value)}
                        />
                    </div>
                </div>

                {/* Profesión y lugar de trabajo */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col gap-1">
                        <label>Profesión</label>
                        <input
                            type="text"
                            value={estudianteProfesion || ""}
                            onChange={(e) => setEstudianteProfesion(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label>Lugar de Trabajo</label>
                        <input
                            type="text"
                            value={estudianteLugarTrabajo || ""}
                            onChange={(e) => setEstudianteLugarTrabajo(e.target.value)}
                        />
                    </div>
                </div>

                {/* Dirección residencial y correo electrónico */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col gap-1">
                        <label>Dirección Residencial *</label>
                        <input
                            type="text"
                            required
                            value={estudianteDireccion || ""}
                            onChange={(e) => setEstudianteDireccion(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label>Correo Electrónico *</label>
                        <input
                            type="email"
                            required
                            placeholder="usuario@gmail.com"
                            value={estudianteEmail || ""}
                            onChange={(e) => setEstudianteEmail(e.target.value)}
                        />
                    </div>
                </div>

                {/* Alergia(s) */}
                <div className="flex flex-col gap-1">
                    <label>Alérgico(a) a *</label>
                    <input
                        type="text"
                        required
                        value={estudianteAlergias || ""}
                        onChange={(e) => setEstudianteAlergias(e.target.value)}
                    />
                </div>

                {/* Antecedentes médicos/psicológicos */}
                <div className="flex flex-col gap-2 h-12">
                    <label>Antecedentes (médicos, psicológicos) *</label>

                    <div className="flex flex-row gap-8">
                        <label className="flex items-center gap-[0.2rem] font-montserrat text-[0.8rem] font-semibold">
                            <input
                                type="radio"
                                name="antecedentes"
                                value="Sí"
                                required
                                onChange={(e) => setEstudianteAntecedentes(e.target.value)}
                            />
                            <span>Sí</span>
                        </label>

                        <label className="flex items-center gap-[0.1rem] font-montserrat text-[0.8rem] font-semibold">
                            <input
                                type="radio"
                                name="antecedentes"
                                value="No"
                                required
                                onChange={(e) => setEstudianteAntecedentes(e.target.value)}
                            />
                            <span>No</span>
                        </label>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label>Especifique (anexar informe correspondiente)</label>
                    <input
                        type="text"
                        value={estudianteAlergiasEspecificadas || ""}
                        onChange={(e) => setEstudianteAlergiasEspecificadas(e.target.value)}
                    />
                </div>

                {/* Contacto de emergencia */}
                <div className="flex flex-col gap-1">
                    <label>En caso de emergencia contactar a *</label>
                    <input
                        type="text"
                        required
                        value={estudianteContactoEmergencia || ""}
                        onChange={(e) => setEstudianteContactoEmergencia(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label>Teléfono de emergencia *</label>
                    <div className="flex gap-2">
                        <select
                            required
                            value={estudianteCodigoTelefonoEmergencia || ""}
                            onChange={(e) => setEstudianteCodigoTelefonoEmergencia(e.target.value)}
                        >
                            <option value="" disabled>Seleccione una opción</option>
                            <option value="0412">0412</option>
                            <option value="0422">0422</option>
                            <option value="0414">0414</option>
                            <option value="0424">0424</option>
                            <option value="0416">0416</option>
                            <option value="0426">0426</option>
                        </select>

                        <input
                            type="text"
                            maxLength={7}
                            minLength={7}
                            required
                            value={estudianteTelefonoEmergencia || ""}
                            onChange={(e) => setEstudianteTelefonoEmergencia(e.target.value)}
                        />
                    </div>
                </div>

                {/* -------------------- Representante legal -------------------- */}

                <h3 className="font-montserrat font-medium text-center md:text-left w-full pt-8 pb-2 mt-4 border-t border-gray-200">Datos del Representante Legal</h3>

                {/* Nombres y apellidos */}
                <div className="flex flex-col gap-1">
                    <label>Nombres y Apellidos {esMenor ? "*" : ""}</label>
                    <input
                        type="text"
                        required={esMenor}
                        value={representanteNombre || ""}
                        onChange={(e) => setRepresentanteNombre(e.target.value)}
                    />
                </div>

                {/* Cédula de identidad y parentesco */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col gap-1">
                        <label>Cédula de Identidad {esMenor ? "*" : ""}</label>
                        <input
                            type="text"
                            value={representanteCI || ""}
                            onChange={(e) => setRepresentanteCI(e.target.value)}
                            placeholder="eg. 12345678"
                            maxLength={8}
                            minLength={6}
                            required={esMenor}
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label>Parentesco {esMenor ? "*" : ""}</label>
                        <input
                            type="text"
                            value={representanteParentesco || ""}
                            onChange={(e) => setRepresentanteParentesco(e.target.value)}
                            required={esMenor}
                        />
                    </div>
                </div>

                {/* Teléfono y ocupación */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col gap-1">
                        <label>Teléfono Celular {esMenor ? "*" : ""}</label>
                        <div className="flex gap-2">
                            <select
                                className="w-[60%]"
                                value={representanteCodigoTelefono || ""}
                                onChange={(e) => setRepresentanteCodigoTelefono(e.target.value)}
                                required={esMenor}
                            >
                                <option value="" disabled>Seleccione una opción</option>
                                <option value="0412">0412</option>
                                <option value="0422">0422</option>
                                <option value="0414">0414</option>
                                <option value="0424">0424</option>
                                <option value="0416">0416</option>
                                <option value="0426">0426</option>
                            </select>

                            <input
                                type="text"
                                maxLength={7}
                                minLength={7}
                                value={representanteTelefono || ""}
                                onChange={(e) => setRepresentanteTelefono(e.target.value)}
                                required={esMenor}
                            />
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label>Ocupación {esMenor ? "*" : ""}</label>
                        <input
                            type="text"
                            value={representanteOcupacion || ""}
                            onChange={(e) => setRepresentanteOcupacion(e.target.value)}
                            required={esMenor}
                        />
                    </div>    
                </div>

                {/* Profesión y lugar de trabajo */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col gap-1">
                        <label>Profesión {esMenor ? "*" : ""}</label>
                        <input
                            type="text"
                            value={representanteProfesion || ""}
                            onChange={(e) => setRepresentanteProfesion(e.target.value)}
                            required={esMenor}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label>Lugar de Trabajo {esMenor ? "*" : ""}</label>
                        <input
                            type="text"
                            value={representanteLugarTrabajo || ""}
                            onChange={(e) => setRepresentanteLugarTrabajo(e.target.value)}
                            required={esMenor}
                        />
                    </div>
                </div>

                {/* Dirección residencial */}
                <div className="flex flex-col gap-1">
                    <label>Dirección Residencial {esMenor ? "*" : ""}</label>
                    <input
                        type="text"
                        value={representanteDireccion || ""}
                        onChange={(e) => setRepresentanteDireccion(e.target.value)}
                        required={esMenor}
                    />
                </div>

                {/* RIF y correo electrónico */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col gap-1">
                        <label>Registro de Información Fiscal (RIF) {esMenor ? "*" : ""}</label>
                        <input
                            type="text"
                            placeholder="eg. V123456789"
                            value={representanteRIF || ""}
                            onChange={(e) => {
                                setRepresentanteRIF(e.target.value);
                                if (RIFRepresentanteError !== "") {
                                    setRIFRepresentanteError("");
                                }
                            }}
                            maxLength={10}
                            minLength={10}
                            required={esMenor}
                        />
                        <span>{RIFRepresentanteError}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label>Correo Electrónico {esMenor ? "*" : ""}</label>
                        <input
                            type="email"
                            placeholder="usuario@gmail.com"
                            value={representanteEmail || ""}
                            onChange={(e) => setRepresentanteEmail(e.target.value)}
                            required={esMenor}
                        />
                    </div>
                </div>

                {/* -------------------- Cátedras -------------------- */}

                <h3 className="font-montserrat font-medium text-center md:text-left w-full pt-8 pb-2 mt-4 border-t border-gray-200">Cátedras a Inscribir</h3>

                {(() => {
                    return (
                        <>
                            {/* Instrumentos */}
                            {instrumentos.map((item, idx) => (
                                <div key={item.id} className="flex flex-col gap-1">
                                    {idx === 0 && <label>Instrumento(s)</label>}
                                    <div className="flex gap-2">
                                        <select
                                            value={instrumentos.filter((i) => i.id === item.id)[0]?.valor || ""}
                                            onChange={(e) => handleChangeInstrumento(item.id, e.target.value)}
                                            className="w-full"
                                        >
                                            <option value="" disabled>Seleccione una opción</option>
                                            {(() => {
                                                const selected = instrumentos.filter((i) => i.id !== item.id).map((i) => i.valor).filter(Boolean);
                                            
                                                const filtered = listadoInstrumentos.filter((catedra) => !selected.includes(catedra));
                                            
                                                const includeCurrent = item.valor && !filtered.includes(item.valor) ? [item.valor] : [];
                                            
                                                const options = [...filtered, ...includeCurrent];

                                                return options.map((catedra, i) => (
                                                    <option key={i} value={catedra}>
                                                        {catedra}
                                                    </option>
                                                ));
                                            })()}
                                        </select>

                                        <button
                                            type="button"
                                            title="Añadir otro instrumento"
                                            onClick={handleAddInstrumentos}
                                            className="w-8 h-8 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-[1.2rem] font-montserrat font-semibold shadow-sm transition duration-200"
                                        >
                                            +
                                        </button>

                                        {instrumentos.length > 1 && (
                                            <button
                                                type="button"
                                                title="Eliminar"
                                                onClick={() => handleDeleteInstrumentos(item.id)}
                                                className="w-8 h-8 text-white bg-gray-400 hover:bg-gray-500 rounded-lg text-[1.2rem] font-montserrat font-semibold shadow-sm transition duration-200"
                                            >
                                                -
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Teóricas */}
                            {teoricas.map((item, idx) => (
                                <div key={item.id} className="flex flex-col gap-1">
                                    {idx === 0 && <label>Teóricas</label>}
                                    <div className="flex gap-2">
                                        <select
                                            value={teoricas.filter((i) => i.id === item.id)[0]?.valor || ""}
                                            onChange={(e) => handleChangeTeoricas(item.id, e.target.value)}
                                            className="w-full"
                                        >
                                            <option value="" disabled>Seleccione una opción</option>
                                            {(() => {
                                                const selected = teoricas.filter((i) => i.id !== item.id).map((i) => i.valor).filter(Boolean);

                                                const filtered = listadoTeoricas.filter((catedra) => !selected.includes(catedra));

                                                const includeCurrent = item.valor && !filtered.includes(item.valor) ? [item.valor] : [];

                                                const options = [...filtered, ...includeCurrent];

                                                return options.map((catedra, i) => (
                                                    <option key={i} value={catedra}>
                                                        {catedra}
                                                    </option>
                                                ));
                                                })()}
                                        </select>

                                        <button
                                            type="button"
                                            title="Añadir otra teórica"
                                            onClick={handleAddTeoricas}
                                            className="w-8 h-8 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-[1.2rem] font-montserrat font-semibold shadow-sm transition duration-200"
                                        >
                                            +
                                        </button>

                                        {teoricas.length > 1 && (
                                            <button
                                                type="button"
                                                title="Eliminar"
                                                onClick={() => handleDeleteTeoricas(item.id)}
                                                className="w-8 h-8 text-white bg-gray-400 hover:bg-gray-500 rounded-lg text-[1.2rem] font-montserrat font-semibold shadow-sm transition duration-200"
                                            >
                                                -
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Otros */}
                            {otros.map((item, idx) => (
                                <div key={item.id} className="flex flex-col gap-1">
                                    {idx === 0 && <label>Otro(s)</label>}
                                    <div className="flex gap-2">
                                        <select
                                            value={otros.filter((i) => i.id === item.id)[0]?.valor || ""}
                                            onChange={(e) => handleChangeOtros(item.id, e.target.value)}
                                            className="w-full"
                                        >
                                            <option value="" disabled>Seleccione una opción</option>
                                            {(() => {
                                                const selected = otros.filter((i) => i.id !== item.id).map((i) => i.valor).filter(Boolean);

                                                const filtered = listadoOtros.filter((catedra) => !selected.includes(catedra));

                                                const includeCurrent = item.valor && !filtered.includes(item.valor) ? [item.valor] : [];

                                                const options = [...filtered, ...includeCurrent];

                                                return options.map((catedra, i) => (
                                                    <option key={i} value={catedra}>
                                                        {catedra}
                                                    </option>
                                                ));
                                            })()}
                                        </select>

                                        <button
                                            type="button"
                                            title="Añadir otro"
                                            onClick={handleAddOtros}
                                            className="w-8 h-8 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-[1.2rem] font-montserrat font-semibold shadow-sm transition duration-200"
                                        >
                                            +
                                        </button>

                                        {otros.length > 1 && (
                                            <button
                                                type="button"
                                                title="Eliminar"
                                                onClick={() => handleDeleteOtras(item.id)}
                                                className="w-8 h-8 text-white bg-gray-400 hover:bg-gray-500 rounded-lg text-[1.2rem] font-montserrat font-semibold shadow-sm transition duration-200"
                                                
                                            >
                                                -
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </>
                    );
                })()}

                {/* -------------------- Autorización -------------------- */}

                <h3 className="font-montserrat font-medium text-center md:text-left w-full pt-8 pb-2 mt-4 border-t border-gray-200">Autorización</h3>

                <p className="text-xs md:text-sm font-montserrat font-medium text-justify">
                    Autorizo a la Fundación Orquesta Sinfónica de Carabobo a hacer uso del material fotográfico y audiovisual de las actividades académicas y artísticas que se lleven a cabo durante el desarrollo del Academia Internacional de Música. Las imágenes podrán ser usadas para la difusión en medios de comunicación y redes sociales. *
                </p>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-8">
                        <label className="flex items-center gap-[0.2rem] font-montserrat text-[0.8rem] font-semibold">
                        <input
                            type="radio"
                            name="autorizacion"
                            value="Sí"
                            required
                            onChange={(e) => setAutorizacion(e.target.value)}
                        />
                        <span>Sí</span>
                        </label>

                        <label className="flex items-center gap-[0.1rem] font-montserrat text-[0.8rem] font-semibold">
                        <input
                            type="radio"
                            name="autorizacion"
                            value="No"
                            required
                            onChange={(e) => setAutorizacion(e.target.value)}
                        />
                        <span>No</span>
                        </label>
                    </div>
                </div>

                <button type="submit" className="flex items-center justify-center bg-[#C19310] hover:bg-[#a57f0d] px-6 py-1 mt-4 rounded-full text-sm font-montserrat text-white font-medium tracking-wide transition-all duration-300 shadow-md hover:shadow-lg mx-auto">
                    Enviar
                </button>
            </form>

            {/* Modal de confirmación */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                        <div className="flex flex-col gap-4">
                            <p className="text-sm font-montserrat text-gray-700 text-center leading-relaxed">
                                <b className="text-base">Se ha descargado la planilla de inscripción.</b> <br /><br />
                                Por favor, realice una revisión detallada del documento.
                                Si todos los datos proporcionados son correctos, proceda a culminar su inscripción.
                                Si existe algún error, por favor, realice el proceso nuevamente.
                            </p>

                            <div className="flex justify-center gap-2 mt-2">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-sm font-montserrat font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition duration-200"
                                >
                                    Volver
                                </button>

                <button
                    onClick={() => {
                        setShowModal(false);
                        handleRegistration();
                    }}
                    className="px-4 py-2 text-sm font-montserrat font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
                >
                    Continuar
                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </section>
  );
}
