import React, { useEffect, useState } from "react";
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => fecthCustomerData(), []);

    const fecthCustomerData = () => {
        fetch('http://traineeapp.azurewebsites.net/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(error => console.error(error))
    }

    const columns = [
        {
            Header: 'First Name',
            accessor: 'firstname'
        },
        {
            Header: 'Last Name',
            accessor: 'lastname'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            Header: 'Address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
    ]

    return (
        <div>
            <ReactTable filterable={true} data={customers} columns={columns} />
        </div>
    );
}