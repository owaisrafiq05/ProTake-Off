import Cookies from 'js-cookie';

const API_BASE = import.meta.env.VITE_API_URL || 'https://protakeoff-dev-backend.onrender.com/api';

// Fetch all users (no auth)
export async function getAllUsers() {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

// Fetch all user transactions (no auth)
export async function getAllUserTransactions() {
  const res = await fetch(`${API_BASE}/orders/transactions`);
  if (!res.ok) throw new Error('Failed to fetch user transactions');
  return res.json();
}

// Contact Management API functions
export async function getAllContacts(params: any = {}) {
  const query = new URLSearchParams(params).toString();
  
  const res = await fetch(`${API_BASE}/contact/admin/all${query ? `?${query}` : ''}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    console.error('Contact fetch error:', res.status, res.statusText);
    throw new Error('Failed to fetch contacts');
  }
  return res.json();
}

export async function getContactById(id: string) {
  const res = await fetch(`${API_BASE}/contact/admin/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch contact');
  return res.json();
}

export async function updateContactStatus(id: string, status: string) {
  const res = await fetch(`${API_BASE}/contact/admin/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update contact status');
  return res.json();
}

export async function deleteContact(id: string) {
  const res = await fetch(`${API_BASE}/contact/admin/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to delete contact');
  return res.json();
}

export async function getContactStats() {
  const res = await fetch(`${API_BASE}/contact/admin/stats`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    console.error('Stats fetch error:', res.status, res.statusText);
    throw new Error('Failed to fetch contact stats');
  }
  return res.json();
}


export async function createTakeoff(data: any) {
  const formData = new FormData();
  // Append fields
  for (const key in data) {
    if (key === 'files' || key === 'pdfPreview') continue;
    if (typeof data[key] === 'object' && data[key] !== null) {
      formData.append(key, JSON.stringify(data[key]));
    } else {
      formData.append(key, data[key]);
    }
  }
  // Append files
  if (data.files && Array.isArray(data.files)) {
    data.files.forEach((file: File) => formData.append('files', file));
  }
  if (data.pdfPreview && Array.isArray(data.pdfPreview)) {
    data.pdfPreview.forEach((pdf: File) => formData.append('pdfPreview', pdf));
  }
  const res = await fetch(`${API_BASE}/takeoffs`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    if (errData.errors) throw new Error(errData.errors.join('\n'));
    throw new Error('Failed to create takeoff');
  }
  return res.json();
}

export async function getAllTakeoffs() {
  const res = await fetch(`${API_BASE}/takeoffs`);
  if (!res.ok) throw new Error('Failed to fetch takeoffs');
  return res.json();
}

export async function getAllTakeoffsAdmin() {
  const res = await fetch(`${API_BASE}/takeoffs/admin/all`);
  if (!res.ok) throw new Error('Failed to fetch takeoffs');
  return res.json();
}

export async function getTakeoffById(id: string) {
  const res = await fetch(`${API_BASE}/takeoffs/${id}`);
  if (!res.ok) throw new Error('Failed to fetch takeoff');
  return res.json();
}

export async function updateTakeoff(id: string, data: any) {
  const formData = new FormData();
  for (const key in data) {
    if (key === 'files' || key === 'pdfPreview') continue;
    if (typeof data[key] === 'object' && data[key] !== null) {
      formData.append(key, JSON.stringify(data[key]));
    } else {
      formData.append(key, data[key]);
    }
  }
  if (data.files && Array.isArray(data.files)) {
    data.files.forEach((file: File) => formData.append('files', file));
  }
  if (data.pdfPreview && Array.isArray(data.pdfPreview)) {
    data.pdfPreview.forEach((pdf: File) => formData.append('pdfPreview', pdf));
  }
  const res = await fetch(`${API_BASE}/takeoffs/${id}`, {
    method: 'PUT',
    body: formData,
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    if (errData.errors) throw new Error(errData.errors.join('\n'));
    throw new Error('Failed to update takeoff');
  }
  return res.json();
}

export async function deleteTakeoff(id: string) {
  const res = await fetch(`${API_BASE}/takeoffs/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete takeoff');
  return res.json();
}

export async function getTakeoffs(params: any = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/takeoffs${query ? `?${query}` : ''}`);
  if (!res.ok) throw new Error('Failed to fetch takeoffs');
  return res.json();
}

export async function getPopularTakeoffs(limit = 3) {
  const res = await fetch(`${API_BASE}/takeoffs?sort=downloads_desc&limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch popular takeoffs');
  return res.json();
}

// Resend order confirmation email
export async function resendOrderEmail(orderId: string) {
  const token = Cookies.get('adminToken');
  if (!token) throw new Error('Admin authentication required');
  
  const res = await fetch(`${API_BASE}/order/resend-email/${orderId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to resend order email');
  return res.json();
}

// Promo Code API functions
export async function getAllPromoCodes() {
  const token = Cookies.get('adminToken');
  if (!token) throw new Error('Admin authentication required');
  
  const res = await fetch(`${API_BASE}/promocodes`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Admin authentication required');
    }
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to fetch promo codes');
  }
  return res.json();
}

export async function createPromoCode(data: any) {
  const token = Cookies.get('adminToken');
  if (!token) throw new Error('Admin authentication required');
  
  const res = await fetch(`${API_BASE}/promocodes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to create promo code');
  }
  return res.json();
}

export async function updatePromoCode(id: string, data: any) {
  const token = Cookies.get('adminToken');
  if (!token) throw new Error('Admin authentication required');
  
  const res = await fetch(`${API_BASE}/promocodes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to update promo code');
  }
  return res.json();
}

export async function deletePromoCode(id: string) {
  const token = Cookies.get('adminToken');
  if (!token) throw new Error('Admin authentication required');
  
  const res = await fetch(`${API_BASE}/promocodes/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to delete promo code');
  return res.json();
}

// Public promo code validation
export async function validatePromoCode(code: string, orderAmount: number) {
  const res = await fetch(`${API_BASE}/promocodes/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code, orderAmount }),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to validate promo code');
  }
  return res.json();
} 
