import React, {Component} from 'react';
import './Home.css';
import ChipSelection from "../ChipSelection/ChipSelection";
import {firebase} from "../../firebase";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import {Container} from "@material-ui/core";
import StocksTable from "../StocksTable/StocksTable";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            industries: [],
            sectors: [],
            selectedIndustries: [],
            selectedSectors: [],
            stocks: [],
            smallMarket: true,
            mediumMarket: true,
            largeMarket: true,
        };
    }

    componentDidMount() {
        this.readAllStocks();
    }

    clearFields = (name) => {
        if (name === "sector") {
            this.setState({selectedSectors: []});
        } else if (name === "industry") {
            this.setState({selectedIndustries: []});
        }
    };


    readAllStocks = () => {
        let db = firebase.firestore();
        db.collection("Stocks").get().then((querySnapshot) => {
            let stocks = [];
            let industries = new Set();
            let sectors = new Set();
            querySnapshot.forEach((doc) => {
                let docData = doc.data();
                let stock = {
                    'name': docData['company']['companyName'],
                    'ceo': docData['company']['CEO'],
                    'description': docData['company']['description'],
                    'employees': docData['company']['employees'],
                    'exchange': docData['company']['exchange'],
                    'industry': docData['company']['industry'],
                    'symbol': docData['company']['symbol'],
                    'marketcap': docData['key_stats']['marketcap'],
                    'peRatio': docData['key_stats']['peRatio'],
                    'sector': docData['company']['sector'],
                    'esg': Math.floor((Math.random() * 100) + 1),
                };
                stocks.push(stock);
                //console.log(docData);
                industries.add(docData['company']['industry']);
                sectors.add(docData['company']['sector']);

            });
            industries = Array.from(industries);
            sectors = Array.from(sectors);
            this.setState({stocks: stocks, industries: industries, sectors: sectors});
        });
    };

    handleChangeChips = (name, event) => {
        this.setState({[name]: event.target.value});
    };

    // Nano -  ,Micro - Less then 300M, Small -  300M to 2B, Mid - 2B to 10B, Large - 10B - 200B, Mega - 200B+

    handleChange = (name) => (event) => {
        this.setState({...this.state, [name]: event.target.checked});
    };

    render() {
        return (
            <Container className="Home">
                <Grid container style={{display: "flex", justifyContent: "space-between"}}>
                    <ChipSelection title="Industries" onChange={this.handleChangeChips} name="selectedIndustries" selected={this.state.selectedIndustries} options={this.state.industries}/>
                    <ChipSelection title="Sectors" onChange={this.handleChangeChips} name="selectedSectors" selected={this.state.selectedSectors} options={this.state.sectors}/>
                </Grid>
                <Grid container style={{display: "flex", justifyContent: "center", margin: "20px"}}>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox checked={this.state.smallMarket} onChange={this.handleChange('smallMarket')}
                                          value="smallMarket"/>
                            }
                            label="Small Market Cap"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={this.state.mediumMarket} onChange={this.handleChange('mediumMarket')}
                                          value="mediumMarket"/>
                            }
                            label="Medium Market Cap"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={this.state.largeMarket} onChange={this.handleChange('largeMarket')}
                                          value="largeMarket"/>
                            }
                            label="Large Market Cap"
                        />
                    </FormGroup>
                </Grid>
                <Grid container
                      style={{display: "flex", justifyContent: "space-between", marginBottom: "30px"}}>
                    <Button onClick={() => this.clearFields("industry")} variant="contained"
                            style={{color: "white", background: "#1A76D2"}}>
                        Clear Industries
                    </Button>
                    <TextField
                        label="PE Ratio"
                        style={{width: "200px", margin: "10px"}}
                        defaultValue="0, 100"
                        margin="normal"
                    />
                    <TextField
                        label="ESG Score"
                        style={{width: "200px", margin: "10px"}}
                        defaultValue="0, 100"
                        margin="normal"
                    />
                    <Button variant="contained" style={{color: "white", background: "#1A76D2"}}
                            onClick={() => this.clearFields("sector")}>
                        Clear Sectors
                    </Button>
                </Grid>
                <StocksTable data={this.state.stocks} columns={[
                    {title: 'Company Name', field: 'name'},
                    {title: 'Symbol', field: 'symbol'},
                    {title: 'CEO', field: 'ceo'},
                    {title: 'Industry', field: 'industry',},
                    {title: 'Sector', field: 'sector',},
                    {title: 'Exchange', field: 'exchange',},
                    {title: 'Marketcap', field: 'marketcap', type: 'numeric'},
                    {title: 'PE Ratio', field: 'peRatio', type: 'numeric'},
                    {title: 'ESG', field: 'esg', type: 'numeric'},
                ]}/>
            </Container>
        );
    }
}

export default Home;