import { useEffect, useRef, useState } from "react";
import { aspiranteApi, catedraApi, type AspiranteRequest, type Catedra } from "../../lib/api";
import { downloadRegistrationPdf, formatPhone } from "./pdfHandler";
import type { RegistrationFormValues } from "../forms/registration-form";
import RegistrationForm from "../forms/registration-form/RegistrationForm";

export default function Registration() {
    const [showModal, setShowModal] = useState(false);
    const [pendingValues, setPendingValues] = useState<RegistrationFormValues | null>(null);

    const hasFetched = useRef(false);
    const [listadoInstrumentos, setListadoInstrumentos] = useState<Catedra[]>([]);
    const [listadoTeoricas, setListadoTeoricas] = useState<Catedra[]>([]);
    const [listadoOtros, setListadoOtros] = useState<Catedra[]>([]);

    useEffect(() => {
        if (hasFetched.current) return;

        const fetchSubjects = async () => {
            try {
                const response = await catedraApi.getAll();

                console.log(response);

                setListadoInstrumentos(response.Instrumento || []);
                setListadoTeoricas(response.Teoricas || []);
                setListadoOtros(response.Otros || []);
            } catch (error) {
                console.error("Error al obtener cátedras:", error);
            }
        };

        fetchSubjects();
        hasFetched.current = true;
    }, []);

    const toNumericArray = (list: Array<string | number | null | undefined>) =>
        list
            .map((value) => {
                if (typeof value === "number") return value;
                if (typeof value === "string" && value.trim() !== "") {
                    const parsed = Number(value);
                    return Number.isNaN(parsed) ? null : parsed;
                }
                return null;
            })
            .filter((value): value is number => value !== null);

    const toNameArray = (ids: Array<string | number | null | undefined>, options: Catedra[]) =>
        ids
            .map((id) => options.find((option) => String(option.id) === String(id))?.nombre)
            .filter((nombre): nombre is string => Boolean(nombre));

    const handleRegistration = async (values: RegistrationFormValues) => {
        try {
            const instrumentosIds = toNumericArray(values.instrumentos);
            const teoricasIds = toNumericArray(values.teoricas);
            const otrosIds = toNumericArray(values.otros);

            const aspiranteData: AspiranteRequest = {
                nombre: values.estudianteNombre,
                genero: values.estudianteGenero,
                cedula: values.estudianteCI ?? "",
                fecha_nacimiento: values.estudianteFechaNacimiento,
                correo_electronico: values.estudianteEmail,
                direccion: values.estudianteDireccion,
                telefono_estudiantes: formatPhone(values.estudianteCodigoTelefono, values.estudianteTelefono),
                rif: values.estudianteRIF ?? "",
                institucion_educacional: values.estudianteInstitucion ?? "",
                ocupacion: values.estudianteOcupacion ?? "",
                profesion: values.estudianteProfesion ?? "",
                lugar_trabajo: values.estudianteLugarTrabajo ?? "",
                alergico_a: values.estudianteAlergias ?? "",
                antecedentes: values.estudianteAntecedentes ?? "",
                especificacion_antecedentes: values.estudianteAlergiasEspecificadas ?? "",
                nombre_emergencia: values.estudianteContactoEmergencia ?? "",
                numero_emergencia: formatPhone(
                    values.estudianteCodigoTelefonoEmergencia,
                    values.estudianteTelefonoEmergencia
                ),

                nombre_representante: values.representanteNombre ?? "",
                cedula_representante: values.representanteCI ?? "",
                parentesco: values.representanteParentesco ?? "",
                telefono_representante: formatPhone(values.representanteCodigoTelefono, values.representanteTelefono),
                ocupacion_representante: values.representanteOcupacion ?? "",
                profesion_representante: values.representanteProfesion ?? "",
                lugar_trabajo_representante: values.representanteLugarTrabajo ?? "",
                direccion_representante: values.representanteDireccion ?? "",
                rif_representante: values.representanteRIF ?? "",
                email_representante: values.representanteEmail ?? "",

                autorizacion: values.autorizacion === "Sí",
                catedra_instrumento: instrumentosIds,
                catedra_teoricas: teoricasIds,
                catedra_otros: otrosIds,
            };

            console.log(aspiranteData);

            return;

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
    };

    const handleFormSubmit = async (values: RegistrationFormValues) => {
        const instrumentosNames = toNameArray(values.instrumentos, listadoInstrumentos);
        const teoricasNames = toNameArray(values.teoricas, listadoTeoricas);
        const otrosNames = toNameArray(values.otros, listadoOtros);

        setPendingValues(values);
        setShowModal(true);
        await downloadRegistrationPdf({
            ...values,
            instrumentos: instrumentosNames,
            teoricas: teoricasNames,
            otros: otrosNames,
        });
    };

    return (
        <section id="inscripción" className="w-full overflow-hidden bg-white py-12 background">
            <div className="flex flex-col w-[90%] md:w-[55%] gap-6 py-4 md:py-12 mx-auto mb-12 md:bg-white md:border border-gray-200 rounded-3xl">
                <div className="flex flex-col gap-8">
                    <div className="flex w-full items-center justify-center">
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
                    </div>

                    <div className="flex flex-col gap-1">
                        <h1 className="md:text-xl font-montserrat font-medium text-center">
                            Academia Internacional de Música
                        </h1>
                        <h2 className="text-xl md:text-3xl font-montserrat font-bold text-center">
                            Maestro José Calabrese
                        </h2>
                    </div>
                    <p className="md:text-lg font-montserrat font-semibold text-center">Planilla de Inscripción</p>
                </div>

                <RegistrationForm
                    instrumentOptions={listadoInstrumentos}
                    theoreticalOptions={listadoTeoricas}
                    otherOptions={listadoOtros}
                    onSubmit={handleFormSubmit}
                />

                {showModal && pendingValues && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                            <div className="flex flex-col gap-4">
                                <p className="text-sm font-montserrat text-gray-700 text-center leading-relaxed">
                                    <b className="text-base">Se ha descargado la planilla de inscripción.</b>
                                    <br />
                                    <br />
                                    Por favor, realice una revisión detallada del documento. Si todos los datos
                                    proporcionados son correctos, proceda a culminar su inscripción. Si existe algún
                                    error, por favor, realice el proceso nuevamente.
                                </p>

                                <div className="flex justify-center gap-2 mt-2">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 text-sm font-montserrat font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition duration-200"
                                    >
                                        Volver
                                    </button>

                                    <button
                                        onClick={async () => {
                                            setShowModal(false);
                                            if (pendingValues) {
                                                await handleRegistration(pendingValues);
                                            }
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
