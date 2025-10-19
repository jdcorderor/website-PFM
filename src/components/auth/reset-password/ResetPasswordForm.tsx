import { useEffect, useRef } from "react";
import { authApi } from "../../../lib/api";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputForm from "../../forms/components/Input";

const schema = z
    .object({
        token: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8),
        password_confirmation: z.string().min(8),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Las contraseñas no coinciden",
        path: ["password_confirmation"],
    });

type ResetPasswordValues = z.infer<typeof schema>;

const ResetPasswordForm: React.FC = () => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting, isValid, touchedFields },
    } = useForm<ResetPasswordValues>({
        resolver: zodResolver(schema),
    });

    const redirectTimer = useRef<number | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const params = new URLSearchParams(window.location.search);
        const tokenParam = params.get("token");
        const emailParam = params.get("email");

        if (tokenParam && emailParam) {
            setValue("token", tokenParam);
            setValue("email", emailParam);
        } else {
            window.location.replace("/404");
        }

        return () => {
            if (redirectTimer.current !== null) {
                window.clearTimeout(redirectTimer.current);
            }
        };
    }, []);

    const onSubmit = async (data: ResetPasswordValues) => {
        try {
            const response = await authApi.resetPassword(data);
            alert("Contraseña restablecida con éxito.");
            redirectTimer.current = window.setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        } catch (apiError: unknown) {
            const message = apiError instanceof Error ? apiError.message : "No se pudo restablecer la contraseña.";
            alert(message);
        }
    };

    return (
        <section className="flex flex-col w-full items-center py-12 md:py-36">
            <div className="fixed inset-0 z-0 w-full h-full">
                <img src="/background.png" alt="Fondo" className="w-full h-full object-cover" />
            </div>

            <div className="w-sm flex flex-col items-center justify-center px-8 py-6 gap-6 md:border border-gray-200 rounded-2xl md:bg-white relative z-10">
                <h1 className="text-2xl font-montserrat text-gray-800 font-bold text-center w-[85%] py-3 border-b border-gray-200">
                    Restablecer contraseña
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[85%] gap-4">
                    <InputForm
                        id="password"
                        control={control}
                        name="password"
                        type="password"
                        placeholder="Ingresa tu nueva contraseña"
                        error={errors.password}
                        required
                        minLength={8}
                    />

                    <InputForm
                        id="password_confirmation"
                        control={control}
                        name="password_confirmation"
                        type="password"
                        placeholder="Repite la nueva contraseña"
                        error={errors.password_confirmation}
                        required
                        minLength={8}
                    />

                    <button
                        type="submit"
                        className="text-xs font-montserrat text-white font-medium w-full bg-[#700303] hover:bg-[#700303]/80 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Procesando..." : "Restablecer contraseña"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ResetPasswordForm;
