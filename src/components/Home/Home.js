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
            allStocks: [],
            smallMarket: true,
            mediumMarket: true,
            largeMarket: true,
            peText: "-100, 100",
            esgText: "-100, 100",
        };
    }


    applyChipFilter = (filters, name) => {
        let fieldName = "industry";
        if (name === "selectedSectors") {
            fieldName = "sector";
        }
        console.log("Filter length is");
        console.log(filters.length);
        if (filters.length === 0) {
            this.setState({stocks: this.state.allStocks});
            return;
        }
        let stocks = [];
        for (let i = 0; i < this.state.allStocks.length; i++) {
            if (filters.includes(this.state.allStocks[i][fieldName])) {
                stocks.push(this.state.allStocks[i]);
            }
        }
        this.setState({stocks: stocks});
    };

    componentDidMount() {
        this.readAllStocks();
    }

    clearFields = (name) => {
        if (name === "sector") {
            this.setState({selectedSectors: [], stocks: this.state.allStocks});
        } else if (name === "industry") {
            this.setState({selectedIndustries: [], stocks: this.state.allStocks});
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
                    'cRatio': Math.floor((Math.random() * 100) + 1),
                };
                stocks.push(stock);
                //console.log(docData);
                industries.add(docData['company']['industry']);
                sectors.add(docData['company']['sector']);

            });
            industries = Array.from(industries);
            sectors = Array.from(sectors);
            this.setState({stocks: stocks, industries: industries, sectors: sectors, allStocks: stocks});
        });
    };

    handleChangeChips = (name, event) => {
        this.setState({[name]: event.target.value}, () => {
            this.applyChipFilter(event.target.value, name)
        });

    };

    filterSize = () => {
        if (this.state.smallMarket && this.state.mediumMarket && this.state.largeMarket) {
            return this.state.stocks;
        }
        let stocks = [];
        for (let i = 0; i < this.state.stocks.length; i++) {
            if (this.state.smallMarket && this.state.stocks[i]['marketcap'] <= 2000000000) {
                stocks.push(this.state.stocks[i]);
                continue;
            }
            if (this.state.mediumMarket && this.state.stocks[i]['marketcap'] >= 2000000000 && this.state.stocks[i]['marketcap'] <= 10000000000) {
                stocks.push(this.state.stocks[i]);
                continue;
            }
            if (this.state.largeMarket && this.state.stocks[i]['marketcap'] >= 10000000000) {
                stocks.push(this.state.stocks[i]);
                continue;
            }

        }
        return stocks;
    };

    filterPeRatioAndESGScore = () => {
        let peText = this.state.peText.split(",");
        if (peText.length !== 2 || isNaN(peText[0]) || isNaN(peText[1])) {
            alert("Please use 0, 100 format for PE");
            this.setState({peText: "0, 100"});
        }
        let esgText = this.state.esgText.split(",");
        if (esgText.length !== 2 || isNaN(esgText[0]) || isNaN(esgText[1])) {
            alert("Please use 0, 100 format for ESG");
            this.setState({esgText: "0, 100"});
        }
        let peResult = [];
        peResult.push(parseFloat(peText[0]));
        peResult.push(parseFloat(peText[1]));
        let esgResult = [];
        esgResult.push(parseFloat(esgText[0]));
        esgResult.push(parseFloat(esgText[1]));
        let stocks = [];
        for (let i = 0; i < this.state.allStocks.length; i++) {
            if (this.state.allStocks[i]['peRatio'] >= peResult[0] && this.state.allStocks[i]['peRatio'] <= peResult[1] && this.state.allStocks[i]['esg'] >= esgResult[0] && this.state.allStocks[i]['esg'] <= esgResult[1]) {
                stocks.push(this.state.allStocks[i]);
            }
        }
        this.setState({stocks: stocks});
    };


    // Nano -  ,Micro - Less then 300M, Small -  300M to 2B, Mid - 2B to 10B, Large - 10B - 200B, Mega - 200B+

    handleChange = (name) => (event) => {
        this.setState({...this.state, [name]: event.target.checked});
    };

    handleTextChange = (name) => (event) => {
    };

    render() {
        return (
            <div className="Home">
                <Container>
                    <Grid container style={{display: "flex", justifyContent: "space-between"}}>
                        <ChipSelection title="Industries" onChange={this.handleChangeChips} name="selectedIndustries"
                                       selected={this.state.selectedIndustries} options={this.state.industries}/>
                        <ChipSelection title="Sectors" onChange={this.handleChangeChips} name="selectedSectors"
                                       selected={this.state.selectedSectors} options={this.state.sectors}/>
                    </Grid>
                    <Grid container style={{display: "flex", justifyContent: "center", margin: "20px"}}>
                        <FormGroup row>
                            <FormControlLabel
                                style={{color: "white", fontStyle: "italic"}}
                                control={
                                    <Checkbox checked={this.state.smallMarket}
                                              onChange={this.handleChange('smallMarket')}
                                              value="smallMarket"/>
                                }
                                label="Small Market Cap"
                            />
                            <FormControlLabel
                                style={{color: "white", fontStyle: "italic", fontSize: "20px"}}
                                control={
                                    <Checkbox checked={this.state.mediumMarket}
                                              onChange={this.handleChange('mediumMarket')}
                                              value="mediumMarket"/>
                                }
                                label="Medium Market Cap"
                            />
                            <FormControlLabel
                                style={{color: "white", fontStyle: "italic"}}
                                control={
                                    <Checkbox checked={this.state.largeMarket}
                                              onChange={this.handleChange('largeMarket')}
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
                            style={{width: "200px", margin: "10px",}}
                            defaultValue="0, 100"
                            margin="normal"
                            onChange={(e) => this.setState({peText: e.target.value})}
                            value={this.state.peText}
                            InputProps={{
                                style: {
                                    color: "white",
                                    fontSize: "20px",
                                    fontWeight: "bold"
                                }
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "white",
                                    fontSize: "18px",
                                    fontWeight: "bold"
                                }
                            }}
                        />
                        <Button variant="contained" style={{color: "white", background: "#1A76D2"}}
                                onClick={this.filterPeRatioAndESGScore}>
                            Calculate
                        </Button>
                        <TextField
                            label="ESG Score"
                            style={{width: "200px", margin: "10px",}}

                            defaultValue="0, 100"
                            margin="normal"
                            onChange={(e) => this.setState({esgText: e.target.value})}
                            value={this.state.esgText}
                            InputProps={{
                                style: {
                                    color: "white",
                                    fontSize: "20px",
                                    fontWeight: "bold"
                                }
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "white",
                                    fontSize: "18px",
                                    fontWeight: "bold"
                                }
                            }}
                        />
                        <Button variant="contained" style={{color: "white", background: "#1A76D2"}}
                                onClick={() => this.clearFields("sector")}>
                            Clear Sectors
                        </Button>
                    </Grid>
                    <Container style={{position: "absolute", left: "7%"}}>
                        <StocksTable data={this.filterSize(this.state.stocks)} columns={[
                            {title: 'Company Name', field: 'name'},
                            {title: 'Symbol', field: 'symbol'},
                            {title: 'CEO', field: 'ceo'},
                            {title: 'Industry', field: 'industry',},
                            {title: 'Sector', field: 'sector',},
                            {title: 'Exchange', field: 'exchange',},
                            {
                                title: 'Marketcap',
                                field: 'marketcap',
                                type: 'numeric',
                                render: rowData => <p>{this.numberWithCommas(rowData.marketcap)}</p>
                            },
                            {title: 'PE Ratio', field: 'peRatio', type: 'numeric'},
                            {title: 'ESG', field: 'esg', type: 'numeric'},
                            {title: 'C-Ratio', field: 'cRatio', type: 'numeric'},
                        ]}/>
                    </Container>
                </Container>
            </div>
        );
    }


    numberWithCommas = (x) => {
        if (x === null) {
            return null;
        }
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
}

export default Home;