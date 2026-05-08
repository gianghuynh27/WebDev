import { useState } from 'react'
import StepInput from '../components/StepInput'
import FormReview from '../components/FormReview'
import type { CheckoutFormData } from '../types'

const initialFormState: CheckoutFormData = {
  name: '',
  email: '',
  address: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
}

export default function MultiStepForm() {
  const [formData, setFormData] = useState(initialFormState)
  const [step, setStep] = useState(1)

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  return (
    <section className="page">
      <h1>Multi-step Form</h1>
      <div className="panel">
        <p>Step {step} of 3</p>
        {step === 1 && (
          <>
            <StepInput label="Name" name="name" value={formData.name} onChange={handleChange} />
            <StepInput label="Email" name="email" value={formData.email} onChange={handleChange} />
            <StepInput label="Address" name="address" value={formData.address} onChange={handleChange} />
          </>
        )}
        {step === 2 && (
          <>
            <StepInput label="Card Number" name="cardNumber" value={formData.cardNumber} onChange={handleChange} />
            <StepInput label="Expiry" name="expiry" value={formData.expiry} onChange={handleChange} />
            <StepInput label="CVV" name="cvv" value={formData.cvv} onChange={handleChange} />
          </>
        )}
        {step === 3 && <FormReview data={formData} />}
        <div className="button-row">
          <button type="button" className="button" onClick={() => setStep(Math.max(step - 1, 1))}>
            Back
          </button>
          <button type="button" className="button" onClick={() => setStep(Math.min(step + 1, 3))}>
            Next
          </button>
        </div>
      </div>
    </section>
  )
}
