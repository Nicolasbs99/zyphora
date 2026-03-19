import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

const noCodeInjection = (val: string) => !val.match(/[<>{}]/);
const injectionMessage = 'Special characters (<, >, {, }) are not allowed to prevent code injection';

const contactSchema = z.object({
  name: z.string().min(2).refine(noCodeInjection, injectionMessage),
  email: z.string().email('Invalid email').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email provider or TLD.'),
  phone: z.string().optional().or(z.literal('')).refine(val => {
    if (!val) return true;
    const digits = val.replace(/\D/g, '');
    return digits.length === 10 || (digits.length === 12 && digits.startsWith('57'));
  }, 'Invalid phone number format'),
  company: z.string().optional().refine(val => !val || noCodeInjection(val), injectionMessage),
  message: z.string().min(10).refine(noCodeInjection, injectionMessage),
  bot_field: z.string().max(0).optional(),
  captchaToken: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedData = contactSchema.parse(body);

    // Verify ReCAPTCHA with Google
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY || "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";
    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${recaptchaSecret}&response=${parsedData.captchaToken}`,
    });
    
    const recaptchaData = await verifyRes.json();
    if (!recaptchaData.success) {
      return NextResponse.json({ error: 'CAPTCHA verification failed.' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      // Simulate successful sending if API key is not configured
      console.log('Skipped actual sending (no API key configured). Payload:', parsedData);
      return NextResponse.json({ success: true, simulated: true });
    }

    const { name, email, phone, company, message } = parsedData;

    await resend.emails.send({
      from: 'Zyphora Website <onboarding@resend.dev>', // Update with verified domain
      to: 'hello@zyphora.com', // Update with actual destination
      subject: `New Contact Request from ${name}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json(
      { error: 'Invalid request or failed to send email.' },
      { status: 400 }
    );
  }
}
