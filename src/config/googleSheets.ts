// ============================================
// GOOGLE SHEETS CONFIGURATION
// ============================================
// Change this URL after deploying your Google Apps Script
// This is the ONLY place you need to update the URL
// ============================================

export const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxiuDFlA32dj3fnXGhg5HXJgcVX4amGnsu710a5IVaUyXdACNnWCbzl0OShLREGAnq9/exec';

// Form types for tracking lead source
export type FormType = 'contact' | 'application';

export interface LeadData {
  formType: FormType;
  timestamp: string;
  // Contact form fields
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  // Application form fields
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
  programType?: string;
  program?: string;
  qualification?: string;
  percentage?: string;
  previousInstitution?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export const submitLeadToGoogleSheet = async (data: LeadData): Promise<boolean> => {
  try {
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }),
    });
    
    // Since we use no-cors, we can't read the response
    // The request is considered successful if no error is thrown
    console.log('Lead submitted to Google Sheet');
    return true;
  } catch (error) {
    console.error('Error submitting lead:', error);
    return false;
  }
};
