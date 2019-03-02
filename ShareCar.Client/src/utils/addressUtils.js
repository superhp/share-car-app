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
