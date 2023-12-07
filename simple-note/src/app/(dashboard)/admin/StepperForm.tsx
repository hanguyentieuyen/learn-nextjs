'use client'

import { Fragment, useState } from "react"
import { Stepper, Step, StepLabel, Button, Box } from "@mui/material"
import AddressForm from "@/components/form/ShippingAddressForm"
import PaymentForm from "@/components/form/PaymentForm"

const steps = ['Step 1', 'Step 2']
export default function StepperForm() {
    const [activeStep, setActiveStep] = useState<number>(0)
    const handleBack = () => { setActiveStep((prev) => prev - 1) }
    const handleNext = () => setActiveStep((prev) => prev + 1)

    const renderForm = (step: number) => {
        switch (step) {
            case 0:
                return <AddressForm />
            case 1:
                return <PaymentForm />
            default:
                return null
        }
    }
    return (
        <Fragment>
            <Box>
                <Stepper activeStep={activeStep}>
                    {steps.map((step) => (
                        <Step>
                            <StepLabel>{step}</StepLabel>
                        </Step>

                    ))}

                </Stepper>
                <div className="my-8">
                    {renderForm(activeStep)}

                </div>
                <div className="flex justify-between">
                    <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                    <Button onClick={handleNext} type="submit">Next</Button>
                </div>
            </Box>
        </Fragment>
    )
}