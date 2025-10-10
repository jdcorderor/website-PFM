import { createElement, type ReactElement } from "react";
import { pdf, type DocumentProps } from "@react-pdf/renderer";

import PDF from "../pdf/pdf";
import type { RegistrationFormValues } from "../forms/registration-form";

export const formatPhone = (code?: string, phone?: string) => {
    if (code && phone) {
        return `${code}${phone}`;
    }
    return "";
};

const formatDateForPdf = (value?: string) => {
    if (!value) return "";
    const [year, month, day] = value.split("-");
    if (!year || !month || !day) return value;
    return `${day}/${month}/${year}`;
};

export interface RegistrationPdfData {
    photoURL: string;
    estudianteNombre: string;
    estudianteFechaNacimiento: string;
    estudianteEdad: string;
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
}

const buildPdfData = (values: RegistrationFormValues): RegistrationPdfData => {
    const instrumentosData = values.instrumentos.filter(Boolean).join(", ");
    const teoricasData = values.teoricas.filter(Boolean).join(", ");
    const otrosData = values.otros.filter(Boolean).join(", ");

    return {
        photoURL: values.photo64 ?? "",
        estudianteNombre: values.estudianteNombre,
        estudianteFechaNacimiento: formatDateForPdf(values.estudianteFechaNacimiento),
        estudianteEdad: values.estudianteEdad ?? "",
        estudianteGenero: values.estudianteGenero,
        estudianteCI: values.estudianteCI ?? "",
        estudianteRIF: values.estudianteRIF ?? "",
        estudianteTelefono: formatPhone(values.estudianteCodigoTelefono, values.estudianteTelefono),
        estudianteInstitucion: values.estudianteInstitucion ?? "",
        estudianteOcupacion: values.estudianteOcupacion ?? "",
        estudianteProfesion: values.estudianteProfesion ?? "",
        estudianteLugarTrabajo: values.estudianteLugarTrabajo ?? "",
        estudianteEmail: values.estudianteEmail,
        estudianteDireccion: values.estudianteDireccion,
        estudianteAlergias: values.estudianteAlergias,
        estudianteAntecedentes: values.estudianteAntecedentes,
        estudianteAlergiasEspecificadas: values.estudianteAlergiasEspecificadas ?? "",
        estudianteContactoEmergencia: values.estudianteContactoEmergencia,
        estudianteTelefonoContactoEmergencia: formatPhone(
            values.estudianteCodigoTelefonoEmergencia,
            values.estudianteTelefonoEmergencia
        ),
        representanteNombre: values.representanteNombre ?? "",
        representanteCI: values.representanteCI ?? "",
        representanteRIF: values.representanteRIF ?? "",
        representanteParentesco: values.representanteParentesco ?? "",
        representanteTelefono: formatPhone(values.representanteCodigoTelefono, values.representanteTelefono),
        representanteOcupacion: values.representanteOcupacion ?? "",
        representanteProfesion: values.representanteProfesion ?? "",
        representanteLugarTrabajo: values.representanteLugarTrabajo ?? "",
        representanteDireccion: values.representanteDireccion ?? "",
        representanteEmail: values.representanteEmail ?? "",
        instrumentos: instrumentosData,
        teoricas: teoricasData,
        otros: otrosData,
        autorizacion: values.autorizacion,
    };
};

export const downloadRegistrationPdf = async (values: RegistrationFormValues) => {
    try {
        const data = buildPdfData(values);
        const documentElement = createElement(PDF as unknown as () => ReactElement<DocumentProps>, {
            data,
        }) as ReactElement<DocumentProps>;
        const blob = await pdf(documentElement).toBlob();
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `Planilla-${Date.now()}.pdf`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error en la generación de PDF:", error);
    }
};

export const mapRegistrationValuesToPdf = buildPdfData;
