import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // check if API key is set
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not found');
      return NextResponse.json({ error: 'API key not configured. Please add RESEND_API_KEY to your environment variables.' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, subject, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <noreply@contact.rjb.rip>',
      to: ['contact@rjb.rip'],
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
} 