import { useEffect, useMemo } from "react";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, type RegistrationFormValues } from ".";
import InputForm from "../components/Input";
import PhotoInput from "./components/PhotoInput";
import { ageFromBirthDate } from "../../../lib";

interface RegistrationFormProps {
    instrumentOptions: string[];
    theoreticalOptions: string[];
    otherOptions: string[];
    onSubmit: SubmitHandler<RegistrationFormValues>;
}

const getFilteredOptions = (options: string[], selected: string[] | undefined, currentValue: string | undefined) => {
    const chosen = (selected ?? []).filter(Boolean);
    const filtered = options.filter((option) => !chosen.includes(option));

    if (currentValue && !filtered.includes(currentValue)) {
        return [currentValue, ...filtered];
    }

    return filtered;
};

const phoneCodes = ["0412", "0422", "0414", "0424", "0416", "0426"];

const RegistrationForm = ({ instrumentOptions, theoreticalOptions, otherOptions, onSubmit }: RegistrationFormProps) => {
    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<RegistrationFormValues>({
        resolver: zodResolver(registrationSchema),
    });

    const instrumentosFieldArray = useFieldArray({
        control,
        name: "instrumentos",
    });
    const teoricasFieldArray = useFieldArray({
        control,
        name: "teoricas",
    });
    const otrosFieldArray = useFieldArray({
        control,
        name: "otros",
    });

    const fechaNacimiento = watch("estudianteFechaNacimiento");
    const isMinor = useMemo(() => {
        const age = ageFromBirthDate(fechaNacimiento);
        return age !== null && age < 18;
    }, [fechaNacimiento]);

    useEffect(() => {
        const age = ageFromBirthDate(fechaNacimiento);
        setValue("estudianteEdad", age !== null ? String(age) : "");
    }, [fechaNacimiento, setValue]);

    const selectedInstrumentos = watch("instrumentos");
    const selectedTeoricas = watch("teoricas");
    const selectedOtros = watch("otros");

    const submitHandler: SubmitHandler<RegistrationFormValues> = (values, event) => {
        onSubmit(values, event);
    };

    const confirmAppend = (message: string) => {
        if (typeof window === "undefined") return true;
        return window.confirm(message);
    };

    const handleAddInstrumento = () => {
        if (instrumentosFieldArray.fields.length > 2) {
            if (
                confirmAppend(
                    `¿Desea añadir otro instrumento? Cantidad de instrumentos seleccionados: ${instrumentosFieldArray.fields.length}`
                )
            ) {
                instrumentosFieldArray.append("");
            }
        } else {
            instrumentosFieldArray.append("");
        }
    };

    const handleAddTeorica = () => {
        if (teoricasFieldArray.fields.length > 2) {
            if (
                confirmAppend(
                    `¿Desea añadir otra cátedra teórica? Cantidad de cátedras teóricas seleccionadas: ${teoricasFieldArray.fields.length}`
                )
            ) {
                teoricasFieldArray.append("");
            }
        } else {
            teoricasFieldArray.append("");
        }
    };

    const handleAddOtro = () => {
        if (otrosFieldArray.fields.length > 2) {
            if (
                confirmAppend(
                    `¿Desea añadir otra cátedra complementaria? Cantidad de cátedras complementarias seleccionadas: ${otrosFieldArray.fields.length}`
                )
            ) {
                otrosFieldArray.append("");
            }
        } else {
            otrosFieldArray.append("");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col w-[90%] md:w-[80%] items-center justify-center gap-6 md:gap-4 mx-auto"
        >
            <h3 className="font-montserrat font-medium text-center md:text-left w-full pt-6 md:pt-8 pb-2 mt-0 md:mt-4 border-t border-gray-200">
                Datos del Estudiante
            </h3>

            <PhotoInput control={control} name="photo64" />

            <InputForm
                name="estudianteNombre"
                control={control}
                label="Nombres y Apellidos *"
                error={errors.estudianteNombre}
                wrapperClassName="w-full"
            />

            <div className="flex flex-col md:flex-row gap-6 w-full">
                <InputForm
                    name="estudianteFechaNacimiento"
                    control={control}
                    label="Fecha de Nacimiento *"
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    className={
                        typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent)
                            ? "h-9"
                            : "w-full"
                    }
                    error={errors.estudianteFechaNacimiento}
                    wrapperClassName="w-full"
                />

                <InputForm
                    name="estudianteEdad"
                    control={control}
                    label="Edad *"
                    readOnly
                    tabIndex={-1}
                    wrapperClassName="w-full"
                />
            </div>

            <div className="flex flex-col md:flex-row gap-6 w-full">
                <div className="flex flex-col gap-1 w-full">
                    <label className="font-montserrat text-sm">Género *</label>
                    <select className="h-9" {...register("estudianteGenero")}>
                        <option value="" disabled>
                            Seleccione una opción
                        </option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                    {errors.estudianteGenero && (
                        <p className="text-red-500 text-xs">{errors.estudianteGenero.message}</p>
                    )}
                </div>

                <InputForm
                    name="estudianteCI"
                    control={control}
                    label="Cédula de Identidad"
                    placeholder="eg. 12345678"
                    maxLength={8}
                    error={errors.estudianteCI}
                    wrapperClassName="w-full"
                />
            </div>

            <div className="flex flex-col md:flex-row gap-6 w-full">
                <div className="flex flex-col gap-1 w-full">
                    <label className="font-montserrat text-sm">Teléfono Celular *</label>
                    <div className="flex gap-2">
                        <select className="w-[60%]" {...register("estudianteCodigoTelefono")}>
                            <option value="" disabled>
                                Seleccione una opción
                            </option>
                            {phoneCodes.map((code) => (
                                <option key={code} value={code}>
                                    {code}
                                </option>
                            ))}
                        </select>
                        <InputForm
                            name="estudianteTelefono"
                            control={control}
                            label="Número de teléfono"
                            labelClassName="sr-only"
                            maxLength={7}
                            error={errors.estudianteTelefono}
                            wrapperClassName="w-full"
                            className="w-full"
                            inputMode="numeric"
                        />
                    </div>
                    {errors.estudianteCodigoTelefono && (
                        <p className="text-red-500 text-xs">{errors.estudianteCodigoTelefono.message}</p>
                    )}
                </div>

                <InputForm
                    name="estudianteRIF"
                    control={control}
                    label="Registro de Información Fiscal (RIF)"
                    placeholder="eg. V123456789"
                    maxLength={10}
                    error={errors.estudianteRIF}
                    wrapperClassName="w-full"
                />
            </div>

            <div className="flex flex-col md:flex-row gap-6 w-full">
                <InputForm
                    name="estudianteInstitucion"
                    control={control}
                    label="Institución Educativa"
                    wrapperClassName="w-full"
                />
                <InputForm name="estudianteOcupacion" control={control} label="Ocupación" wrapperClassName="w-full" />
            </div>

            <div className="flex flex-col md:flex-row gap-6 w-full">
                <InputForm name="estudianteProfesion" control={control} label="Profesión" wrapperClassName="w-full" />
                <InputForm
                    name="estudianteLugarTrabajo"
                    control={control}
                    label="Lugar de Trabajo"
                    wrapperClassName="w-full"
                />
            </div>

            <div className="flex flex-col md:flex-row gap-6 w-full">
                <InputForm
                    name="estudianteDireccion"
                    control={control}
                    label="Dirección Residencial *"
                    error={errors.estudianteDireccion}
                    wrapperClassName="w-full"
                />
                <InputForm
                    name="estudianteEmail"
                    control={control}
                    label="Correo Electrónico *"
                    type="email"
                    placeholder="usuario@gmail.com"
                    error={errors.estudianteEmail}
                    wrapperClassName="w-full"
                />
            </div>

            <InputForm
                name="estudianteAlergias"
                control={control}
                label="Alérgico(a) a *"
                error={errors.estudianteAlergias}
                wrapperClassName="w-full"
            />

            <div className="flex flex-col gap-2 h-12 w-full">
                <label className="font-montserrat text-sm">Antecedentes (médicos, psicológicos) *</label>
                <div className="flex flex-row gap-8">
                    <label className="flex items-center gap-[0.2rem] font-montserrat text-[0.8rem] font-semibold">
                        <input type="radio" value="Sí" {...register("estudianteAntecedentes")} />
                        <span>Sí</span>
                    </label>
                    <label className="flex items-center gap-[0.1rem] font-montserrat text-[0.8rem] font-semibold">
                        <input type="radio" value="No" {...register("estudianteAntecedentes")} />
                        <span>No</span>
                    </label>
                </div>
                {errors.estudianteAntecedentes && (
                    <p className="text-red-500 text-xs">{errors.estudianteAntecedentes.message}</p>
                )}
            </div>

            <InputForm
                name="estudianteAlergiasEspecificadas"
                control={control}
                label="Especifique (anexar informe correspondiente)"
                wrapperClassName="w-full"
            />

            <InputForm
                name="estudianteContactoEmergencia"
                control={control}
                label="En caso de emergencia contactar a *"
                error={errors.estudianteContactoEmergencia}
                wrapperClassName="w-full"
            />

            <div className="flex flex-col gap-1 w-full">
                <label className="font-montserrat text-sm">Teléfono de emergencia *</label>
                <div className="flex gap-2">
                    <select {...register("estudianteCodigoTelefonoEmergencia")}>
                        <option value="" disabled>
                            Seleccione una opción
                        </option>
                        {phoneCodes.map((code) => (
                            <option key={code} value={code}>
                                {code}
                            </option>
                        ))}
                    </select>
                    <InputForm
                        name="estudianteTelefonoEmergencia"
                        control={control}
                        label="Teléfono de emergencia"
                        labelClassName="sr-only"
                        maxLength={7}
                        error={errors.estudianteTelefonoEmergencia}
                        wrapperClassName="w-full"
                        className="w-full"
                        inputMode="numeric"
                    />
                </div>
                {errors.estudianteCodigoTelefonoEmergencia && (
                    <p className="text-red-500 text-xs">{errors.estudianteCodigoTelefonoEmergencia.message}</p>
                )}
            </div>

            <h3 className="font-montserrat font-medium text-center md:text-left w-full pt-8 pb-2 mt-4 border-t border-gray-200">
                Datos del Representante Legal
            </h3>

            <InputForm
                name="representanteNombre"
                control={control}
                label={`Nombres y Apellidos ${isMinor ? "*" : ""}`.trim()}
                error={errors.representanteNombre}
                wrapperClassName="w-full"
            />

            <div className="flex flex-col md:flex-row gap-6 w-full">
                <InputForm
                    name="representanteCI"
                    control={control}
                    label={`Cédula de Identidad ${isMinor ? "*" : ""}`.trim()}
                    placeholder="eg. 12345678"
                    maxLength={8}
                    error={errors.representanteCI}
                    wrapperClassName="w-full"
                />
                <InputForm
                    name="representanteParentesco"
                    control={control}
                    label={`Parentesco ${isMinor ? "*" : ""}`.trim()}
                    error={errors.representanteParentesco}
                    wrapperClassName="w-full"
                />
            </div>

            <div className="flex flex-col md:flex-row gap-6 w-full">
                <div className="flex flex-col gap-1 w-full">
                    <label className="font-montserrat text-sm">Teléfono Celular {isMinor ? "*" : ""}</label>
                    <div className="flex gap-2">
                        <select {...register("representanteCodigoTelefono")} className="w-[60%]">
                            <option value="" disabled>
                                Seleccione una opción
                            </option>
                            {phoneCodes.map((code) => (
                                <option key={code} value={code}>
                                    {code}
                                </option>
                            ))}
                        </select>
                        <InputForm
                            name="representanteTelefono"
                            control={control}
                            label="Teléfono del representante"
                            labelClassName="sr-only"
                            maxLength={7}
                            error={errors.representanteTelefono}
                            wrapperClassName="w-full"
                            className="w-full"
                            inputMode="numeric"
                        />
                    </div>
                    {errors.representanteCodigoTelefono && (
                        <p className="text-red-500 text-xs">{errors.representanteCodigoTelefono.message}</p>
                    )}
                </div>

                <InputForm
                    name="representanteOcupacion"
                    control={control}
                    label={`Ocupación ${isMinor ? "*" : ""}`.trim()}
                    error={errors.representanteOcupacion}
                    wrapperClassName="w-full"
                />
            </div>

            <div className="flex flex-col md:flex-row gap-6 w-full">
                <InputForm
                    name="representanteProfesion"
                    control={control}
                    label={`Profesión ${isMinor ? "*" : ""}`.trim()}
                    error={errors.representanteProfesion}
                    wrapperClassName="w-full"
                />
                <InputForm
                    name="representanteLugarTrabajo"
                    control={control}
                    label={`Lugar de Trabajo ${isMinor ? "*" : ""}`.trim()}
                    error={errors.representanteLugarTrabajo}
                    wrapperClassName="w-full"
                />
            </div>

            <InputForm
                name="representanteDireccion"
                control={control}
                label={`Dirección Residencial ${isMinor ? "*" : ""}`.trim()}
                error={errors.representanteDireccion}
                wrapperClassName="w-full"
            />

            <div className="flex flex-col md:flex-row gap-6 w-full">
                <InputForm
                    name="representanteRIF"
                    control={control}
                    label={`Registro de Información Fiscal (RIF) ${isMinor ? "*" : ""}`.trim()}
                    placeholder="eg. V123456789"
                    maxLength={10}
                    error={errors.representanteRIF}
                    wrapperClassName="w-full"
                />
                <InputForm
                    name="representanteEmail"
                    control={control}
                    label={`Correo Electrónico ${isMinor ? "*" : ""}`.trim()}
                    type="email"
                    placeholder="usuario@gmail.com"
                    error={errors.representanteEmail}
                    wrapperClassName="w-full"
                />
            </div>

            <h3 className="font-montserrat font-medium text-center md:text-left w-full pt-8 pb-2 mt-4 border-t border-gray-200">
                Cátedras a Inscribir
            </h3>

            {instrumentosFieldArray.fields.map((field, index) => {
                const currentValue = selectedInstrumentos?.[index];
                return (
                    <div key={field.id} className="flex flex-col gap-1 w-full">
                        {index === 0 && <label className="font-montserrat text-sm">Instrumento(s)</label>}
                        <div className="flex gap-2">
                            <select className="w-full" {...register(`instrumentos.${index}` as const)}>
                                <option value="" disabled>
                                    Seleccione una opción
                                </option>
                                {getFilteredOptions(instrumentOptions, selectedInstrumentos, currentValue).map(
                                    (option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    )
                                )}
                            </select>
                            <button
                                type="button"
                                title="Añadir otro instrumento"
                                onClick={handleAddInstrumento}
                                className="w-8 h-8 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-[1.2rem] font-montserrat font-semibold shadow-sm transition duration-200"
                            >
                                +
                            </button>
                            {instrumentosFieldArray.fields.length > 1 && (
                                <button
                                    type="button"
                                    title="Eliminar"
                                    onClick={() => instrumentosFieldArray.remove(index)}
                                    className="w-8 h-8 text-white bg-gray-400 hover:bg-gray-500 rounded-lg text-[1.2rem] font-montserrat font-semibold shadow-sm transition duration-200"
                                >
                                    -
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}

            {teoricasFieldArray.fields.map((field, index) => {
                const currentValue = selectedTeoricas?.[index];
                return (
                    <div key={field.id} className="flex flex-col gap-1 w-full">
                        {index === 0 && <label className="font-montserrat text-sm">Teóricas</label>}
                        <div className="flex gap-2">
                            <select className="w-full" {...register(`teoricas.${index}` as const)}>
                                <option value="" disabled>
                                    Seleccione una opción
                                </option>
                                {getFilteredOptions(theoreticalOptions, selectedTeoricas, currentValue).map(
                                    (option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    )
                                )}
                            </select>
                            <button
                                type="button"
                                title="Añadir otra teórica"
                                onClick={handleAddTeorica}
                                className="w-8 h-8 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-[1.2rem] font-montserrat font-semibold shadow-sm transition duration-200"
                            >
                                +
                            </button>
                            {teoricasFieldArray.fields.length > 1 && (
                                <button
                                    type="button"
                                    title="Eliminar"
                                    onClick={() => teoricasFieldArray.remove(index)}
                                    className="w-8 h-8 text-white bg-gray-400 hover:bg-gray-500 rounded-lg text-[1.2rem] font-montserrat font-semibold shadow-sm transition duration-200"
                                >
                                    -
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}

            {otrosFieldArray.fields.map((field, index) => {
                const currentValue = selectedOtros?.[index];
                return (
                    <div key={field.id} className="flex flex-col gap-1 w-full">
                        {index === 0 && <label className="font-montserrat text-sm">Otro(s)</label>}
                        <div className="flex gap-2">
                            <select className="w-full" {...register(`otros.${index}` as const)}>
                                <option value="" disabled>
                                    Seleccione una opción
                                </option>
                                {getFilteredOptions(otherOptions, selectedOtros, currentValue).map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                title="Añadir otro"
                                onClick={handleAddOtro}
                                className="w-8 h-8 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-[1.2rem] font-montserrat font-semibold shadow-sm transition duration-200"
                            >
                                +
                            </button>
                            {otrosFieldArray.fields.length > 1 && (
                                <button
                                    type="button"
                                    title="Eliminar"
                                    onClick={() => otrosFieldArray.remove(index)}
                                    className="w-8 h-8 text-white bg-gray-400 hover:bg-gray-500 rounded-lg text-[1.2rem] font-montserrat font-semibold shadow-sm transition duration-200"
                                >
                                    -
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}

            <h3 className="font-montserrat font-medium text-center md:text-left w-full pt-8 pb-2 mt-4 border-t border-gray-200">
                Autorización
            </h3>

            <p className="text-xs md:text-sm font-montserrat font-medium text-justify">
                Autorizo a la Fundación Orquesta Sinfónica de Carabobo a hacer uso del material fotográfico y
                audiovisual de las actividades académicas y artísticas que se lleven a cabo durante el desarrollo del
                Academia Internacional de Música. Las imágenes podrán ser usadas para la difusión en medios de
                comunicación y redes sociales. *
            </p>

            <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row gap-8">
                    <label className="flex items-center gap-[0.2rem] font-montserrat text-[0.8rem] font-semibold">
                        <input type="radio" value="Sí" {...register("autorizacion")} />
                        <span>Sí</span>
                    </label>
                    <label className="flex items-center gap-[0.1rem] font-montserrat text-[0.8rem] font-semibold">
                        <input type="radio" value="No" {...register("autorizacion")} />
                        <span>No</span>
                    </label>
                </div>
                {errors.autorizacion && <p className="text-red-500 text-xs">{errors.autorizacion.message}</p>}
            </div>

            <button
                type="submit"
                className="flex items-center justify-center bg-[#C19310] hover:bg-[#a57f0d] px-6 py-1 mt-4 rounded-full text-sm font-montserrat text-white font-medium tracking-wide transition-all duration-300 shadow-md hover:shadow-lg mx-auto"
            >
                Enviar
            </button>
        </form>
    );
};

export default RegistrationForm;
