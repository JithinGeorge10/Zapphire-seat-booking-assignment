'use client'
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ROW_SIZE = 7;
const TOTAL_SEATS = 80;


const TicketBooking: React.FC = () => {
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);
  const [numSeatsToBook, setNumSeatsToBook] = useState<number>(0);
  const [bookedSeatsPreview, setBookedSeatsPreview] = useState<number[]>([]);

  const handleBooking = (): void => {

    if (numSeatsToBook > 7) {
      toast.error('You can only book up to 7 seats.');
      return;
    }
    if (bookedSeats.length + numSeatsToBook > TOTAL_SEATS) return;

    const isSeatBooked = (seat: number): boolean => bookedSeats.includes(seat);
    let newBookings: number[] = [];


    for (let rowStart = 1; rowStart <= TOTAL_SEATS; rowStart += ROW_SIZE) {
      const rowEnd = Math.min(rowStart + ROW_SIZE - 1, TOTAL_SEATS);

      for (let i = rowStart; i <= rowEnd - numSeatsToBook + 1; i++) {
        const block: number[] = Array.from({ length: numSeatsToBook }, (_, idx) => i + idx);

        const isBlockAvailable = block.every((seat) => !isSeatBooked(seat));
        if (isBlockAvailable) {
          newBookings = block;
          break;
        }
      }

      if (newBookings.length > 0) break;
    }

    if (newBookings.length === 0) {
      const availableSeats: number[] = Array.from({ length: TOTAL_SEATS }, (_, i) => i + 1).filter(
        (seat) => !isSeatBooked(seat)
      );
      newBookings = availableSeats.slice(0, numSeatsToBook);
    }
    setBookedSeats((prevSeats) => [...prevSeats, ...newBookings])
    setBookedSeatsPreview(newBookings)
    toast.success('Seat successfully booked', {
      style: {
        background: 'green',
        color: 'white',
      },
    });
    
  };

  const handleReset = () => {
    setBookedSeats([]);
    setBookedSeatsPreview([])
    setNumSeatsToBook(0);
  };
  const handleSeatChange = (e: any) => {
    console.log(e.target.value)
    if (e.target.value > 0) {
      setNumSeatsToBook(Number(e.target.value))
    }
  }
  console.log(bookedSeatsPreview)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 ">
      <h1 className="text-3xl text-black font-bold">Ticket Booking</h1>

      <div className="flex flex-col md:flex-row gap-100">

        <div className="grid grid-cols-7 gap-2">

          {Array.from({ length: TOTAL_SEATS }, (_, index) => {
            const seatNumber = index + 1;
            const isBooked = bookedSeats.includes(seatNumber);
            return (
              <div
                key={seatNumber}
                className={`w-10 h-10 flex items-center justify-center rounded-md font-semibold text-black ${isBooked ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
              >
                {seatNumber}
              </div>
            );
          })}
          <br />

        </div>


        <div className="flex flex-col  gap-4 justify-center">
          <div>
            <label className="text-lg text-black font-bold">Book Seats</label>
            {bookedSeatsPreview?.length > 0 && (
              <div className="p-3 rounded-md flex flex-wrap gap-2">
                {bookedSeatsPreview.map((val, ind) => (
                  <div
                    key={ind}
                    className="bg-yellow-500 text-black px-3 py-1 rounded shadow-sm font-semibold"
                  >
                    {val}
                  </div>
                ))}
              </div>
            )}


          </div>

          <div>

            <input

              className="border border-blue-600 p-2 text-blue-500 rounded-md min-w-96"
              value={numSeatsToBook}
              min={1}
              max={TOTAL_SEATS - bookedSeats.length}
              onChange={handleSeatChange}

            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              onClick={handleBooking}
            >
              Book
            </button>
          </div>

          <button
            className="bg-blue-600  text-white font-semibold py-2 px-4 rounded"
            onClick={handleReset}
          >
            Reset Booking
          </button>

        </div>

      </div>

      <div className="mt-6 flex gap-6 text-lg ">
        <span className="bg-yellow-400 text-black font-semibold px-3 py-1 rounded">Booked Seats = {bookedSeats.length}</span>
        <span className="bg-green-400 text-black font-semibold px-3 py-1 rounded">
          Available Seats = {TOTAL_SEATS - bookedSeats.length}
        </span>
      </div>
    </div>
  );
};

export default TicketBooking;
