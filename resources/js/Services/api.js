import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export const packageService = {
    list: () => api.get('/packages'),
    show: (slug) => api.get(`/packages/${slug}`),
    save: (payload, id = null) => (id ? api.put(`/packages/${id}`, payload) : api.post('/packages', payload)),
};

export const bookingService = {
    create: (payload) => api.post('/bookings', payload),
    list: () => api.get('/bookings'),
    updateStatus: (id, status) => api.patch(`/bookings/${id}/status`, { status }),
};

export const leadService = {
    create: (payload) => api.post('/contact-leads', payload),
};

export default api;
