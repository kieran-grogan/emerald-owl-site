import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../utils/test-utils';
import ContactForm from '../../../components/forms/ContactForm';

// Mock the fetch function for API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
) as jest.Mock;

describe('ContactForm Component', () => {
  beforeEach(() => {
    // Clear mock between tests
    (global.fetch as jest.Mock).mockClear();
  });

  test('renders form fields correctly', () => {
    render(<ContactForm />);
    
    // Check that all form fields are present
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty fields on submission', async () => {
    render(<ContactForm />);
    
    // Try to submit the empty form
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    
    // Check that validation errors appear
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });
    
    // Verify that the API was not called
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('shows validation error for invalid email', async () => {
    render(<ContactForm />);
    
    // Fill in fields with invalid email
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This is a test message' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    
    // Check that email validation error appears
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
    });
    
    // Verify that the API was not called
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('submits form successfully with valid data', async () => {
    render(<ContactForm />);
    
    // Fill in fields with valid data
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This is a test message' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    
    // Check for loading state
    expect(screen.getByRole('button', { name: /send/i })).toBeDisabled();
    
    // Verify that the API was called with the correct data
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          message: 'This is a test message',
        }),
      }));
    });
    
    // Check for success message
    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });
  });

  test('shows error message when API call fails', async () => {
    // Override the fetch mock to return an error
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ message: 'Server error' }),
      })
    );
    
    render(<ContactForm />);
    
    // Fill in fields with valid data
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This is a test message' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    
    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/error sending/i)).toBeInTheDocument();
    });
  });
}); 