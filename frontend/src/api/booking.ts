import { api } from "./api";


class BookingAPI {

  createBooking(data: { transaction_uuid: string; total_amount: number; }) {
    return api.post("/booking", data)
      .then(response => response.data)
      .catch(error => { throw error; });
  }
}

const bookingAPI = new BookingAPI();

export default bookingAPI;
