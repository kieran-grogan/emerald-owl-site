import { NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  eventType?: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();
    
    // Server-side validation
    const errors: Record<string, string> = {};
    
    if (!data.name || data.name.trim() === '') {
      errors.name = 'Name is required';
    }
    
    if (!data.email || data.email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (data.phone && !/^[0-9+\-() ]{10,15}$/.test(data.phone)) {
      errors.phone = 'Phone number is invalid';
    }
    
    if (!data.message || data.message.trim() === '') {
      errors.message = 'Message is required';
    } else if (data.message.length < 10) {
      errors.message = 'Message is too short';
    }
    
    // Return validation errors if any
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }
    
    // TODO: In production, integrate with email service (SendGrid, Mailgun, etc.)
    // For now, we'll simulate a successful submission
    
    // Log form submission (would be replaced with actual sending logic)
    console.log('Contact form submission:', {
      name: data.name,
      email: data.email,
      phone: data.phone || 'Not provided',
      eventType: data.eventType || 'Not specified',
      message: data.message
    });
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message. We will get back to you shortly!' 
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred processing your request' },
      { status: 500 }
    );
  }
} 