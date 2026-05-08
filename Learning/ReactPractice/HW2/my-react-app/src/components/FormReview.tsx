import type { CheckoutFormData } from "../types";

interface FormReviewProps {
  data: CheckoutFormData;
}

export default function FormReview({ data }: FormReviewProps) {
  return (
    <div className="panel">
      <h2>Review</h2>
      <p>Placeholder: Display collected form data here.</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
