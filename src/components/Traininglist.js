import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchTrainingData(), []);

    const fetchTrainingData = () => {
        fetch('http://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(error => console.error(error))
    }

    const columns = [
        {
            Header: 'First Name',
            accessor: 'customer.firstname'
        },
        {
            Header: 'Last Name',
            accessor: 'customer.lastname'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Date',
            accessor: 'date',
            Cell: row => new Date(row.value).toLocaleDateString('fi-FI', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
        },
    ]

    return (
        <div>
            <ReactTable filterable={true} data={trainings} columns={columns} />
        </div>
    );
}