import { NextResponse } from 'next/server';

interface InquiryFormData {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate: string;
  estimatedGuests: string;
  venueName?: string;
  venueAddress?: string;
  budget?: string;
  requirements?: string;
}

export async function POST(request: Request) {
  try {
    const data: InquiryFormData = await request.json();
    
    // Server-side validation
    const errors: Record<string, string> = {};
    
    // Required fields validation
    if (!data.name || data.name.trim() === '') {
      errors.name = 'Name is required';
    }
    
    if (!data.email || data.email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!data.eventType) {
      errors.eventType = 'Event type is required';
    }
    
    if (!data.eventDate) {
      errors.eventDate = 'Event date is required';
    } else {
      // Check if date is in the future
      const eventDate = new Date(data.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (eventDate < today) {
        errors.eventDate = 'Event date must be in the future';
      }
    }
    
    if (!data.estimatedGuests) {
      errors.estimatedGuests = 'Estimated number of guests is required';
    } else if (isNaN(Number(data.estimatedGuests)) || Number(data.estimatedGuests) <= 0) {
      errors.estimatedGuests = 'Please enter a valid number';
    }
    
    // Phone validation (optional but must be valid if provided)
    if (data.phone && !/^[0-9+\-() ]{10,15}$/.test(data.phone)) {
      errors.phone = 'Phone number is invalid';
    }
    
    // Return validation errors if any
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }
    
    // TODO: In production, integrate with email service (SendGrid, Mailgun, etc.)
    // For now, we'll simulate a successful submission
    
    // Log inquiry submission (would be replaced with actual sending logic)
    console.log('Event inquiry submission:', {
      name: data.name,
      email: data.email,
      phone: data.phone || 'Not provided',
      eventType: data.eventType,
      eventDate: data.eventDate,
      estimatedGuests: data.estimatedGuests,
      venueName: data.venueName || 'Not provided',
      venueAddress: data.venueAddress || 'Not provided',
      budget: data.budget || 'Not specified',
      requirements: data.requirements || 'None'
    });
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your inquiry. Our team will contact you shortly to discuss the details of your event.' 
    });
    
  } catch (error) {
    console.error('Event inquiry error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred processing your request' },
      { status: 500 }
    );
  }
} 