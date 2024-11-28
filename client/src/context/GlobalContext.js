import React, { createContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const [user, setUser] = useState(null);
    const [pets, setPets] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [todaysAppointments, setTodaysAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/me");
                if (!response.ok) throw new Error("Failed to fetch user data");

                const data = await response.json();

                // Set user
                setUser(data);

                // Extract pets and sort by name
                const sortedPets = (data.pets || []).sort((a, b) =>
                    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                );
                setPets(sortedPets);

                // Extract appointments
                const allAppointments = data.appointments || [];
                setAppointments(allAppointments);

                // Extract invoices from appointments
                const allInvoices = allAppointments.flatMap((appointment) => appointment.invoices || []);
                setInvoices(allInvoices);

                // Filter today's appointments
                const today = new Date().toISOString().slice(0, 10);
                const todays = allAppointments.filter((appointment) =>
                    isTodayOrRecurring(appointment, today)
                );
                setTodaysAppointments(todays);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const isTodayOrRecurring = (appointment, today) => {
        const dayOfWeek = new Date().getDay();

        if (appointment.canceled) {
            return false;
        }

        let noCancellationToday = true;
        if (appointment.cancellations) {
            for (const cancellation of appointment.cancellations) {
                if (new Date(cancellation.date).toISOString().slice(0, 10) === today) {
                    noCancellationToday = false;
                    break;
                }
            }
        }

        if (!appointment.recurring) {
            if (appointment.appointment_date) {
                const appointmentDate = new Date(appointment.appointment_date).toISOString().slice(0, 10);
                return appointmentDate === today && noCancellationToday;
            }
            return false;
        } else if (appointment.recurring) {
            const recurringDays = {
                0: appointment.sunday,
                1: appointment.monday,
                2: appointment.tuesday,
                3: appointment.wednesday,
                4: appointment.thursday,
                5: appointment.friday,
                6: appointment.saturday
            };
            return recurringDays[dayOfWeek] && noCancellationToday;
        }
        return false;
    };

    return (
        <GlobalContext.Provider
            value={{
                user,
                pets,
                appointments,
                invoices,
                todaysAppointments,
                setUser,
                setPets,
                setAppointments,
                setInvoices,
                setTodaysAppointments,
                loading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalContext };