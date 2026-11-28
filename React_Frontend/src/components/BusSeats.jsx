import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const BusSeats = ({ token }) => {
    const [bus, setBus] = useState(null)
    const [seats, setSeats] = useState([])

    const { busId } = useParams()
    const navigate = useNavigate()

    console.log('Checking bus id number=', busId)

    useEffect(() => {
        const fetchBusDetails = async () => {
            try {
                const response = await axios(`https://travel-bus-booking-5.onrender.com/api/buses/${busId}`)
                setBus(response.data)
                setSeats(response.data.seats || [])
            } catch (error) {
                console.log('Error in fetching details', error)
            }
        }
        fetchBusDetails()
    }, [busId])

    const handleBook = async (seatId) => {
        if (!token) {
            alert("Please login for booking a seat")
            navigate('/login')
            return;
        }
        try {
            const response = await axios.post("https://travel-bus-booking-5.onrender.com/api/booking/",
                { seat: seatId },
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
            )
            console.log(response.data)
            alert("Booking Successful")
            setSeats((prevSeats) =>
                prevSeats.map((seat) =>
                    seat.id === seatId ? { ...seat, is_booked: true } : seat
                )
            );


        } catch (error) {
            alert(error.response?.data?.error || "Booking failed")
        }
    }

    return (
        <div className='bus-seats-page'>
            {/* <div className='bus-card' key={item.id}> */}

            {bus && (
                // <div className='bus-details-card'>
                //     {bus.bus_image && (
                //         <img
                //             src={bus.bus_image}
                //             alt={bus.bus_name}
                //             className="bus-details-image"
                //         />
                //     )}

                //     <div><h1>{bus.bus_name}</h1></div>
                //     <div>{bus.number}</div>
                //     <div>{bus.origin}</div>
                //     <div>{bus.destination}</div>
                //     <div>{bus.start_time}</div>
                //     <div>{bus.reach_time}</div>
                // </div>
                <div className='bus-view' key={bus.id}>
                    <img
                        src={bus.bus_image}
                        alt={bus.bus_name}
                        className="bus-image"
                    />
                    <div className='bus-detailss-card'>
                        <div>Bus Name : {bus.bus_name}</div>
                        <div>Bus Number : {bus.number}</div>
                        <div>Origin : {bus.origin}</div>
                        <div>Destination : {bus.destination}</div>
                        <div>Start Time : {bus.start_time}</div>
                        <div>Reach Time : {bus.reach_time}</div>
                        {/* <button className='primary-btn' onClick={() => handleViewSeats(item.id)}>View Seats</button> */}
                        {/* <hr /> */}
                    </div>
                </div>
            )}
            <h2 className='section-heading'>Select Your Seat</h2>
            <div className='seats-grid'>
                {seats.map((seat) => {
                    return (
                        <div key={seat.id}>
                            <button className={`seat-button ${seat.is_booked ? 'booked' : 'available'}`} onClick={() => handleBook(seat.id)}
                                // style={{color:seat.is_booked? 'red':'green'}}
                                disabled={seat.is_booked}

                            >
                                Seat Number {seat.seat_number}
                            </button>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default BusSeats
