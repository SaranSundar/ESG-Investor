import React, {Component} from 'react';
import './ChipSelection.css';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";

class ChipSelection extends Component {

    handleChange = (event) => {
        this.props.onChange(this.props.name, event);
    };

    render() {
        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                },
            },
        };
        return (
            <FormControl style={{width: "500px", display: "flex"}}>
                <InputLabel style={{color: "white"}} id="demo-mutiple-chip-label">{this.props.title}</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    onChange={this.handleChange}
                    value={this.props.selected}
                    input={<Input id="select-multiple-chip"/>}
                    renderValue={selected => (
                        <div className="ChipSelection-Chips">
                            {selected.map(value => (
                                <Chip key={value} label={value} style={{margin: "2px"}}/>
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}>
                    {this.props.options.map(name => (
                        <MenuItem key={name} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}

export default ChipSelection;