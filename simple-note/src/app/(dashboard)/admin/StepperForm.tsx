'use client'

import { Fragment, useState } from "react"
import { Stepper, Step, StepLabel, Button, Box, Typography } from "@mui/material"
import AddressForm from "@/components/form/ShippingAddressForm"
import PaymentForm from "@/components/form/PaymentForm"
import { useFormContext } from "react-hook-form"

const steps = ['Step 1', 'Step 2']
const renderForm = (step: number, childForm: Object) => {
    switch (step) {
        case 0:
            return <AddressForm />
        case 1:
            return <PaymentForm />
        default:
            return 'not valid step'
    }
}

export default function StepperForm() {
    const {watch} = useFormContext()
    const [activeStep, setActiveStep] = useState<number>(0)
    const [childForm, setChildForm] = useState({})
    const formValue = watch()
    console.log(formValue)
    const handleNext = () => {
        let canContinue = true;
    
        switch (activeStep) {
          case 0:
            setChildForm({ ...childForm, one: formValue });
            canContinue = true;
            break;
          case 1:
            setChildForm({ ...childForm, two: formValue });
            handleSubmit({ ...childForm, two: formValue });
            canContinue = true;
            break;
          default:
            return "not a valid step";
        }
        if (canContinue) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      };
    
      const handleBack = () => {
        if (activeStep > 0) {
          setActiveStep((prevActiveStep) => prevActiveStep - 1);
          switch (activeStep) {
            case 1:
                setChildForm({ ...childForm, two: formValue });
              break;
            default:
              return "not a valid step";
          }
        }
      };

    const handleSubmit = (value: any) => {
        console.log(value)
    }
    return (
        <Fragment>
            <Box sx={{ my: { xs: 3 }, p: { xs: 2 } }}>
                <Typography component="h6" variant="h4" align="center">
                    Checkout
                </Typography>
                <Stepper activeStep={activeStep}>
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepLabel >{step}</StepLabel>
                        </Step>

                    ))}

                </Stepper>
                <div className="my-8">
                    {renderForm(activeStep, childForm)}

                </div>
                <div className="flex justify-between">
                    <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                    <Button disabled={steps.length === activeStep} onClick={handleNext} type="submit">Next</Button>
                </div>
            </Box>
        </Fragment>
    )
}