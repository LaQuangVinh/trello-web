import axios from 'axios'
import { API_ROOT } from '~/utils/constant'

export const fetchBoardDetails_API = async (boardId) => {
  // ở đây dùng axios nhưng chưa bắt lỗi, đọc thêm về interceptors trong axios catch lỗi tập trung
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

export const updateBoardDetails_API = async (boardId, updateData) => {
  // ở đây dùng axios nhưng chưa bắt lỗi, đọc thêm về interceptors trong axios catch lỗi tập trung
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return response.data
}

export const createNewColumn_API = async (newDataColumn) => {
  // ở đây dùng axios nhưng chưa bắt lỗi, đọc thêm về interceptors trong axios catch lỗi tập trung
  const response = await axios.post(`${API_ROOT}/v1/columns`, newDataColumn)
  return response.data
}

export const createNewCard_API = async (newDataCard) => {
  // ở đây dùng axios nhưng chưa bắt lỗi, đọc thêm về interceptors trong axios catch lỗi tập trung
  const response = await axios.post(`${API_ROOT}/v1/cards`, newDataCard)
  return response.data
}