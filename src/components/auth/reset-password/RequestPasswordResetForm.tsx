import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputForm from "../../forms/components/Input";
import { authApi, type RequestPasswordResetPayload } from "../../../lib/api";

const schema = z.object({
    email: z.string().email({ message: "Ingresa un correo electrónico válido" }),
});

type RequestPasswordResetValues = z.infer<typeof schema>;

const RequestPasswordResetForm: React.FC = () => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<RequestPasswordResetValues>({
        resolver: zodResolver(schema),
        defaultValues: { email: "" },
    });

    const onSubmit = async (values: RequestPasswordResetPayload) => {
        setSuccessMessage(null);
        setErrorMessage(null);

        try {
            await authApi.requestPasswordReset(values);
            reset();
            setSuccessMessage("Si el correo es válido, enviaremos un enlace para restablecer la contraseña.");
        } catch (error: unknown) {
            const message =
                error instanceof Error ? error.message : "No se pudo procesar la solicitud de restablecimiento.";
            setErrorMessage(message);
        }
    };

    return (
        <section className="flex flex-col w-full items-center py-12 md:py-36">
            <div className="fixed inset-0 z-0 w-full h-full">
                <img src="/background.png" alt="Fondo" className="w-full h-full object-cover" />
            </div>

            <div className="w-sm flex flex-col items-center justify-center px-8 py-6 gap-6 md:border border-gray-200 rounded-2xl md:bg-white relative z-10">
                <h1 className="text-2xl font-montserrat text-gray-800 font-bold text-center w-[85%] py-3 border-b border-gray-200">
                    Solicitar restablecimiento de contraseña
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[85%] gap-4">
                    <InputForm
                        id="email"
                        control={control}
                        name="email"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        label="Correo electrónico"
                        error={errors.email}
                        required
                    />

                    <button
                        type="submit"
                        className="text-xs font-montserrat text-white font-medium w-full bg-[#700303] hover:bg-[#700303]/80 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Enviando..." : "Enviar enlace"}
                    </button>
                </form>

                {(successMessage || errorMessage) && (
                    <div className="w-[85%]" aria-live="polite">
                        {successMessage && (
                            <p className="text-sm text-green-600 font-montserrat text-center">{successMessage}</p>
                        )}
                        {errorMessage && (
                            <p className="text-sm text-red-600 font-montserrat text-center">{errorMessage}</p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default RequestPasswordResetForm;
