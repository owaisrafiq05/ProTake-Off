const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export async function createTakeoff(data: any) {
  const formData = new FormData();
  // Append fields
  for (const key in data) {
    if (key === 'files' || key === 'images') continue;
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
  if (data.images && Array.isArray(data.images)) {
    data.images.forEach((img: File) => formData.append('images', img));
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
    if (key === 'files' || key === 'images') continue;
    if (typeof data[key] === 'object' && data[key] !== null) {
      formData.append(key, JSON.stringify(data[key]));
    } else {
      formData.append(key, data[key]);
    }
  }
  if (data.files && Array.isArray(data.files)) {
    data.files.forEach((file: File) => formData.append('files', file));
  }
  if (data.images && Array.isArray(data.images)) {
    data.images.forEach((img: File) => formData.append('images', img));
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