"use server";

import { z } from "zod";
import { Resend } from "resend";

// Initialize the Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

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

  const validatedData = contactSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      errors: validatedData.error.flatten().fieldErrors,
      message: "Please fix the errors below.",
    };
  }

  try {
    // Send the actual email
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // Resend's default testing address
      to: "alyasar.jabbarli@gmail.com", // This MUST be the email you used to sign up for Resend
      replyTo: validatedData.data.email, // This allows you to just hit "Reply" in your Gmail app
      subject: `New Portfolio Message from ${validatedData.data.name}`,
      text: `
Name: ${validatedData.data.name}
Email: ${validatedData.data.email}

Message:
${validatedData.data.message}
      `,
    });

    return {
      success: true,
      message: "Transmission successful. I'll get back to you shortly.",
      errors: null,
    };
  } catch (error) {
    console.error("Resend Error:", error);
    return {
      success: false,
      message: "Failed to send the message. Please try again or email me directly.",
      errors: null,
    };
  }
}