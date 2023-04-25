import { Calendar, momentLocalizer } from "react-big-calendar";
import React, {useEffect, useState} from "react";
import moment from "moment/moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function Calendarpage() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchTrainingData(), []);

    const fetchTrainingData = () => {
        fetch('http://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(error => console.error(error))
    }

    const events = trainings.map((training) => ({
        title: training.activity,
        start: new Date(training.date),
        end: moment(training.date).add(training.duration, "minutes").toDate(),
    }));

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
}