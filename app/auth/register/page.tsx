'use client';

import PageTitle from "@/app/components/pageTitle";
import { useForm } from "react-hook-form";

interface RegisterFormData {
    username: string;
    password: string;
    confirm: string;
}

export default function Register() {

    // set up react-hook-form
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }} = useForm<RegisterFormData>();

    const onSubmit = async (data: RegisterFormData) => {
        console.log(`Submitted: `, data);
        console.log("Success");
    }

    return (
        <main>
            <h1>Register</h1>
            <PageTitle title="Register" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label htmlFor="username">Username: *</label>
                    <input {...register("username", { required: "Username is required"})} />
                    {errors.username && <span className="error">{errors.username.message}</span>}
                </fieldset>

                <fieldset>
                    <label htmlFor="password">Password: *</label>
                    <input type="password" {...register("password", { required: "Password is required"})} />
                    {errors.password && <span className="error">{errors.password.message}</span>}
                </fieldset>

                <fieldset>
                    <label htmlFor="confirm">Confirm: *</label>
                    <input type="password" {...register("confirm", { required: "Confirm is required"})} />
                    {errors.confirm && <span className="error">{errors.confirm.message}</span>}
                </fieldset>

                <button>Register</button>

                {isSubmitSuccessful && <p className="success">Registration Complete</p>}
            </form>
        </main>
    )
}