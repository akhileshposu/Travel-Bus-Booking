
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const UserBookings = ({ token, userId }) => {

    const [bookings, setBookings] = useState([])
    const [bookingError, setBookingError] = useState(null)

    useEffect(() => {

        const fetchBookings = async () => {

            if (!token || !userId) {
                return
            }

            try {
                const response = await axios.get(
                    `http://travel-bus-booking-6.onrender.com/api/user/${userId}/bookings/`,
                    {
                        headers: {
                            Authorization: `Token ${token}`
                        }
                    }
                )

                console.log("Booking data =", response.data)

                setBookings(response.data)

            } catch (error) {

                console.log("Fetching details failed", error)

                setBookingError(
                    error.response?.data?.error ||
                    "Unable to fetch bookings"
                )
            }
        }

        fetchBookings()

    }, [userId, token])

    return (
        <div>

            <h2 style={{ fontSize: "50px" }}>My Bookings</h2>

            {bookingError && <p>{bookingError}</p>}

            {bookings.length > 0 ? (

                bookings.map((booking) => (

                    <div
                        key={booking.id}
                        style={{
                            border: "2px solid gray",
                            width: "450px",
                            padding: "20px",
                            marginBottom: "20px"
                        }}
                    >

                        <h3>{booking.bus.bus_name}</h3>

                        <p>Bus Number: {booking.bus.number}</p>

                        <p>From: {booking.origin}</p>

                        <p>To: {booking.destination}</p>

                        <p>Price: ₹{booking.price}</p>

                        <p>Seat: {booking.seat.seat_number}</p>

                        <p>User: {booking.user}</p>

                    </div>

                ))

            ) : (

                !bookingError && <p>No bookings found</p>

            )}

        </div>
    )
}

export default UserBookings
