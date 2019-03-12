export const fromLocationIqResponse = (response) => ({
    number: response.address.house_number,
    street: response.address.road,
    city: response.address.city,
    country: response.address.country,
    latitude: parseFloat(response.lat),
    longitude: parseFloat(response.lon)
});

export const addressToString = (address) => {
    if (!address) return "";
    let result = "";
    if (address.number) result += address.number + " ";
    if (address.street) result += address.street + ", ";
    if (address.city) result += address.city  + ", ";
    result += address.country;
    return result;
};

export const toReadableName = address =>
    `${address.street} ${address.number}`;

export const fromAlgoliaAddress = address => {
    if(!address) return null;
    let streetNumber = "";
    let street = address.name;
    const firstDigit = address.name.match(/\d/);
    if (firstDigit !== null) {
        const indexOfFirstDigit = address.name.indexOf(firstDigit);
        const indexOfFirstSpace = address.name.indexOf(" ");
        streetNumber = address.name.substring(indexOfFirstDigit, indexOfFirstSpace);
        street = address.name.substring(indexOfFirstSpace + 1);
    }
    return {
        number: streetNumber,
        street: street,
        city: address.city,
        country: address.country,
        latitude: address.latlng.lat,
        longitude: address.latlng.lng
    };
};