/**
 * 🚂 IRCTC Train Ticket Booking - async/await
 *
 * IRCTC pe train ticket book karna India ka sabse mushkil kaam hai! Lekin
 * async/await se yeh kaam asan ho jaata hai. Simulate karo API calls ko
 * async functions se — seat check karo, ticket book karo, cancel karo,
 * aur status check karo. Sab kuch await se sequentially hoga.
 *
 * Function: checkSeatAvailability(trainNumber, date, classType)
 *   - async function, returns a Promise
 *   - Simulates API call with a small delay (~100ms)
 *   - Validates trainNumber: must be a string of exactly 5 digits (e.g., "12345")
 *   - Validates classType: must be one of "SL", "3A", "2A", "1A"
 *   - Validates date: must be a non-empty string
 *   - If invalid trainNumber: throws Error "Invalid train number! 5 digit hona chahiye."
 *   - If invalid classType: throws Error "Invalid class type!"
 *   - If invalid date: throws Error "Date required hai!"
 *   - If valid: returns {
 *       trainNumber, date, classType,
 *       available: true/false (randomly, ~70% chance true),
 *       seats: random number 0-50,
 *       waitlist: random number 0-20
 *     }
 *   - If seats > 0, available = true; if seats === 0, available = false
 *
 * Function: bookTicket(passenger, trainNumber, date, classType)
 *   - async function
 *   - passenger is { name, age, gender } object
 *   - Validates passenger has name, age, gender
 *   - Awaits checkSeatAvailability(trainNumber, date, classType)
 *   - If available: returns {
 *       pnr: "PNR" + Math.floor(Math.random() * 1000000),
 *       passenger, trainNumber, date,
 *       class: classType,
 *       status: "confirmed",
 *       fare: calculated (SL:250, 3A:800, 2A:1200, 1A:2000)
 *     }
 *   - If not available: returns with status: "waitlisted", waitlistNumber: random 1-20
 *
 * Function: cancelTicket(pnr)
 *   - async function
 *   - Simulates cancellation with small delay
 *   - Validates pnr: must be a non-empty string starting with "PNR"
 *   - If invalid: throws Error "Invalid PNR number!"
 *   - Returns { pnr, status: "cancelled", refund: random amount 100-1000 }
 *
 * Function: getBookingStatus(pnr)
 *   - async function
 *   - Simulates status check with small delay
 *   - Validates pnr: must start with "PNR"
 *   - If invalid: throws Error "Invalid PNR number!"
 *   - Returns { pnr, status: random from ["confirmed", "waitlisted", "cancelled"],
 *     lastUpdated: new Date().toISOString() }
 *
 * Function: bookMultipleTickets(passengers, trainNumber, date, classType)
 *   - async function
 *   - Takes array of passenger objects
 *   - Books for EACH passenger SEQUENTIALLY (await in loop, one by one)
 *   - Returns array of booking results (each is bookTicket result or error object)
 *   - If individual booking fails, catch error and include { passenger, error: message }
 *     in results, continue with next passenger
 *   - Agar passengers array empty, return empty array
 *
 * Function: raceBooking(trainNumbers, passenger, date, classType)
 *   - async function
 *   - Takes array of trainNumbers
 *   - Tries booking on ALL trains in PARALLEL
 *   - Returns first successful booking using Promise.any-like approach
 *   - If all fail, throws Error "Koi bhi train mein seat nahi mili!"
 *   - Hint: use Promise.any or map trainNumbers to bookTicket promises
 *
 * Rules:
 *   - ALL functions must be async
 *   - Use await for sequential operations
 *   - bookMultipleTickets must be sequential (one after another)
 *   - raceBooking must be parallel (all at once)
 *   - Proper error handling with try/catch
 *   - Train number format: exactly 5 digit string
 *   - PNR format: starts with "PNR"
 *
 * @example
 *   const availability = await checkSeatAvailability("12345", "2025-01-15", "3A");
 *   // => { trainNumber: "12345", date: "2025-01-15", classType: "3A",
 *   //      available: true, seats: 35, waitlist: 5 }
 *
 * @example
 *   const booking = await bookTicket(
 *     { name: "Rahul", age: 28, gender: "M" },
 *     "12345", "2025-01-15", "3A"
 *   );
 *   // => { pnr: "PNR483921", passenger: {...}, trainNumber: "12345",
 *   //      date: "2025-01-15", class: "3A", status: "confirmed", fare: 800 }
 *
 * @example
 *   const results = await bookMultipleTickets(
 *     [{ name: "Amit", age: 30, gender: "M" }, { name: "Priya", age: 25, gender: "F" }],
 *     "12345", "2025-01-15", "SL"
 *   );
 *   // => [{ pnr: "PNR...", ...}, { pnr: "PNR...", ...}]
 */
export async function checkSeatAvailability(trainNumber, date, classType) {
  const ValidClassSet = new Set(["SL", "3A", "2A", "1A"]);
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (typeof trainNumber !== "string" || !/^\d{5}$/.test(trainNumber)) {
        return rej(new Error("Invalid train number! 5 digit hona chahiye."));
      }
      if (!ValidClassSet.has(classType)) {
        return rej(new Error("Invalid class type!"));
      }
      if (!date ||typeof(date) !== "string" || date === "") {
        return rej(new Error("Date required hai!"));
      }
      
      return res({
        trainNumber, date, classType,
        available: Math.floor(Math.random() * 10) < 7,
        seats: Math.floor(Math.random() * 51),
        waitlist: Math.floor(Math.random() * 21),
      });
    }, 100);
  });
  }

export async function bookTicket(passenger, trainNumber, date, classType) {
  if (!Object.hasOwn(passenger, 'name')
    || !Object.hasOwn(passenger,'age')
    || !Object.hasOwn(passenger,'gender'))
  {
    return Promise.reject(new Error('Passanger Object Incomplete'));
  }

  const seatAvailability = await checkSeatAvailability(trainNumber, date, classType);
  const classPrice = { "SL": 250, "3A": 800, "2A": 1200, "1A": 2000 };
   const pnr = "PNR" + String(Math.floor(Math.random() * 1000000));
  if (seatAvailability.available)
  {
    return {
        pnr,passenger, trainNumber, date,
        class: classType,
        status: "confirmed",
        fare: classPrice[classType]
      };  
  } else {
    return {
      pnr,passenger, trainNumber, date,
      class: classType,
      status: "waitlisted",
      waitlistNumber: Math.floor(Math.random() * 21),
      fare: classPrice[classType]
    }
  }
}

export async function cancelTicket(pnr) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (!pnr || typeof (pnr) !== 'string' || !pnr.startsWith('PNR'))
      {
       return rej(new Error("Invalid PNR number!"));
      }
      
      return res({
        pnr,
        status: "cancelled",
        refund: (100 + Math.floor(Math.random() * 901))
      });
    }, 50);
  });
}

export async function getBookingStatus(pnr) {
  const possibleStatus = ["confirmed", "waitlisted", "cancelled"];
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (!pnr || typeof (pnr) !== 'string' || !pnr.startsWith('PNR'))
      {
       return rej(new Error("Invalid PNR number!"));
      }
      
      return res({
        pnr,
        status: possibleStatus[Math.floor(Math.random()*3)] ,
       lastUpdated: new Date().toISOString() });
    }, 50);
  });
}

export async function bookMultipleTickets(passengers,
  trainNumber,
  date,
  classType) {
  const replyArray = [];
 
 for(const passenger of passengers) {
    try {
      const ticket = await bookTicket(passenger, trainNumber, date, classType);
      replyArray.push(ticket);
    }
    catch (e) {
      replyArray.push({
        passenger,
        error: e.message
      });
    }
  };
  return replyArray;
}

export async function raceBooking(trainNumbers, passenger, date, classType) {
  const tryAll = trainNumbers.map((trainNumber) => {
    return bookTicket(passenger,trainNumber, date, classType);
  });
  return Promise.any(tryAll)
    .then(val=>val)
    .catch(e => {
      throw new Error("Koi bhi train mein seat nahi mili!");
    })
}
