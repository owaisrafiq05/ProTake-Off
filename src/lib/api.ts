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
