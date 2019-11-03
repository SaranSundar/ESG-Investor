import React, {Component} from 'react';
import './CompanyCard.css';
import {Typography} from "@material-ui/core";

class CompanyCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="CompanyCard">
                <Typography variant="h1">APPL</Typography>
                <Typography variant="h1">Apple</Typography>
                <Typography variant="h1">$165.33</Typography>
                <Typography variant="h1">CEO: Tim Cook</Typography>
                <Typography variant="h1">Sector: Electronic Technology</Typography>
                <Typography variant="h1">Employees: Electronic Technology</Typography>
                <Typography variant="h1">Exchange: NASDAQ</Typography>
                <Typography variant="h1">ESG: 74.78</Typography>
                <Typography variant="h1">Employees: 132000</Typography>
                <Typography variant="h1">Industry: Telecommunications Equipment</Typography>
            </div>
        );
    }
}

export default CompanyCard;