import { Response } from "express";

class ApiResponse {
  statusCode: number
  data: Response
  message: string

  constructor(statusCode: number, data: any, message = "success") {
    this.statusCode = statusCode,
      this.data = data,
      this.message = message
  }
}
export default ApiResponse;