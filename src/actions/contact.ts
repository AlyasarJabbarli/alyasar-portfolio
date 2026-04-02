"use server";

import { z } from "zod";

// Define the strict validation rules based on your inputs
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
});

export async function sendContactMessage(prevState: any, formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  // Validate against our schema
  const validatedData = contactSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      errors: validatedData.error.flatten().fieldErrors,
      message: "Please fix the errors below.",
    };
  }

  // Simulate network request (Here you will hook up Resend, SendGrid, or Nodemailer later)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    success: true,
    message: "Transmission successful. I'll get back to you shortly.",
    errors: null,
  };
}