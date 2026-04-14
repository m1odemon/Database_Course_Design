import http from './http'

export const getWorkPage = (params) => http.get('/works', { params })
export const getWorkDetail = (id) => http.get(`/works/${id}`)
export const createWork = (data) => http.post('/works', data)
export const updateWork = (id, data) => http.put(`/works/${id}`, data)
export const deleteWork = (id) => http.delete(`/works/${id}`)

export const getTags = () => http.get('/tags')
export const createTag = (data) => http.post('/tags', data)
export const deleteTag = (id) => http.delete(`/tags/${id}`)

export const getReviews = (workId) => http.get(`/works/${workId}/reviews`)
export const createReview = (data) => http.post('/reviews', data)
export const updateReview = (id, data) => http.put(`/reviews/${id}`, data)
export const deleteReview = (id) => http.delete(`/reviews/${id}`)
