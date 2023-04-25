import React, { useEffect, useState } from "react";
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Addtraining from "./Addtraining";
import { Button } from "@mui/material";

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchTrainingData(), []);

    const fetchTrainingData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .then(console.log(trainings))
            .catch(error => console.error(error))
    }

    const saveTraining = (training) => {
        fetch('https://traineeapp.azurewebsites.net/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => fetchTrainingData())
        .catch(err => console.error(err))
    }

    const deleteTraining = (link) => {
        if (window.confirm('Are you sure?')){
            fetch(link, {method: 'DELETE'})
            .then(console.log(link))
            .then(response => fetchTrainingData())
            .catch(error => console.error(error))
        }
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
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'id',
            Cell: row => <Button size="small" variant="contained" color="secondary" onClick={() => deleteTraining(`https://traineeapp.azurewebsites.net/api/trainings/${row.value}`)}>Delete</Button>
        },
    ]

    return (
        <div>
            <Addtraining saveTraining={saveTraining}/>
            <ReactTable filterable={true} data={trainings} columns={columns} />
        </div>
    );
}