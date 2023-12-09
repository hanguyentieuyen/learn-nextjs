'use client'
import React from "react"
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import StepperForm from "./StepperForm"
export default function FormStepperProvider() {
    const methods = useForm()
    return (
        <FormProvider {...methods}>
            <StepperForm/>
        </FormProvider>
    )
}