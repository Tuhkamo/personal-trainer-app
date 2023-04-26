import React, { useEffect, useState } from "react";
import 'react-table-6/react-table.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { groupBy } from 'lodash';

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchTrainingData(), []);

    const fetchTrainingData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => {
                const groupedData = groupBy(data, 'activity');
                const mergedData = Object.keys(groupedData).map(activity => {
                    const duration = groupedData[activity].reduce((total, training) => total + training.duration, 0);
                    return { activity, duration };
                });
                setTrainings(mergedData);
            })
            .catch(error => console.error(error))
    }

    // This code calculates the maximum duration value from the trainings array, rounds it up to the nearest 50 using Math.ceil(), and sets it as the maximum value for the YAxis using the domain prop.
    const maxYValue = Math.ceil(Math.max(...trainings.map(t => t.duration)) / 50) * 50;

    return (
        <div>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={trainings}
                    margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="activity" />
                    <YAxis domain={[0, maxYValue]} />
                    <Tooltip />
                    <Bar type="step" dataKey="duration" fill="#1978ce" />
                    <text x="50%" y="15" textAnchor="middle" fontWeight="bold" fontSize={20}>
                        Training Durations by Activity
                    </text>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}