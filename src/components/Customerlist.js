import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Addcustomer from "./Addcustomer";
import Editcustomer from "./Editcustomer";
import CsvDownloader from 'react-csv-downloader';
import DownloadIcon from '@mui/icons-material/Download';


export default function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchCustomerData(), []);

    const fetchCustomerData = () => {
        fetch('http://traineeapp.azurewebsites.net/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(error => console.error(error))
    }

    const saveCustomer = (customer) => {
        fetch('http://traineeapp.azurewebsites.net/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => fetchCustomerData())
            .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, { method: 'DELETE' })
                .then(response => fetchCustomerData())
                .catch(error => console.error(error))
        }
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => fetchCustomerData())
            .catch(err => console.error(err))
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
        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <Editcustomer updateCustomer={updateCustomer} customer={row.original} />
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'links[0].href',
            Cell: row => <Button size="small" variant="contained" color="secondary" onClick={() => deleteCustomer(row.value)}>Delete</Button>
        },
    ]

    const csvColumns = [
        {
            id: 'firstName',
            displayName: 'First Name'
        },
        {
            id: 'lastName',
            displayName: 'Last Name'
        },
        {
            id: 'email',
            displayName: 'Email'
        },
        {
            id: 'phone',
            displayName: 'Phone Number'
        },
        {
            id: 'address',
            displayName: 'Street Address'
        },
        {
            id: 'postcode',
            displayName: 'Postcode'
        },
        {
            id: 'city',
            displayName: 'City'
        }
    ]

    const csvDatas = customers.map((customer) => ({
        firstName: customer.firstname,
        lastName: customer.lastname,
        email: customer.email,
        phone: customer.phone,
        address: customer.streetaddress,
        postcode: customer.postcode,
        city: customer.city,
    }));

    return (
        <div>
            <ButtonGroup>
                <Addcustomer saveCustomer={saveCustomer} />
                <CsvDownloader
                    filename="customers"
                    extension=".csv"
                    separator=","
                    columns={csvColumns}
                    datas={csvDatas}
                >
                    <Button style={{ marginBottom: 20, backgroundColor: "green", marginLeft: 10 }} variant="contained" color="primary">
                        <DownloadIcon style={{ marginRight: 10 }}></DownloadIcon>Download Customers.csv
                    </Button>
                </CsvDownloader>
            </ButtonGroup>
            <ReactTable filterable={true} data={customers} columns={columns} />
        </div>
    );
}