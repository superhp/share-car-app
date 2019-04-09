import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import Autosuggest from 'react-autosuggest';
import SimpleMenu from "../../common/SimpleMenu";
import { AddressInput } from "../../common/AddressInput";
import { fromAlgoliaAddress } from "../../../utils/addressUtils";

import "./../../../styles/genericStyles.css";
const languages = [
    {
        name: 'C',
        year: 1972
    },
    {
        name: 'Elm',
        year: 2012
    },
];
// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : languages.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);

export class PassengerRouteSelection extends React.Component {

    state = {
        address: this.props.initialAddress,
        direction: this.props.direction,
        value: '',
        suggestions: []
    }

    componentDidMount() {
        var suggestions = [];

        for (var i = 0; i < this.props.users.length; i++) {
            suggestions.push(this.props.users[i].firstName + " " + this.props.users[i].lastName);
        }
        this.setState({suggestions});
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    handleFilterringChange(address, direction) {
        this.setState({ address: address, direction: direction });
        this.props.onChange(address, direction);
    }



    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Type a driver\'s name',
            value,
            onChange: this.onChange
        };
        return (
            <Grid
                className="from-to-container"
                alignItems="flex-start"
                justify="center"
                container
            >
                <Grid item xs={10}>
                    <Grid
                        container
                        alignItems="center"
                        justify="center"
                    >
                        <AddressInput
                            displayName={this.props.displayName}
                            placeholder="Type in meetup point or click on the map"
                            onChange={(suggestion) => this.props.onMeetupAddressChange(fromAlgoliaAddress(suggestion))}
                        />
                    </Grid>
                    <Card className="paper-background">
                        <Grid container justify="center">
                            <Grid
                                container
                                alignItems="center"
                                justify="center"
                                item xs={6}
                            >
                                <Grid container item xs={6} justify="center">
                                    <Typography variant="body1">From office</Typography>
                                </Grid>
                                <Grid container item xs={6} justify="center">
                                    <Radio
                                        color="primary"
                                        checked={this.props.direction === "from"}
                                        onClick={() => { this.handleFilterringChange(this.state.address, "from") }}
                                        value="to"
                                        name="radio-button-demo"
                                        aria-label="A"
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                alignItems="center"
                                justify="center"
                                item xs={6}
                            >
                                <Grid container item xs={6} justify="center">
                                    <Typography variant="body1">To office</Typography>
                                </Grid>
                                <Grid container item xs={6} justify="center">
                                    <Radio
                                        color="primary"
                                        checked={this.props.direction === "to"}
                                        onClick={() => { this.handleFilterringChange(this.state.address, "to") }}
                                        value="from"
                                        name="radio-button-demo"
                                        aria-label="A"
                                    />
                                </Grid>
                            </Grid>
                            <SimpleMenu
                                handleSelection={(address) => { this.handleFilterringChange(address, this.state.direction) }}
                            />
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                getSuggestionValue={getSuggestionValue}
                                renderSuggestion={renderSuggestion}
                                inputProps={inputProps}
                            />
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}
