export default function parseAddress(address) {
  if (!address.includes(",")) {
    var firstDigit = address.match(/\d/);
    var indexOfFirstDigit = address.indexOf(firstDigit);
    var indexOfFirstSpace = address.indexOf(" ");

    var streetNo = address.substring(indexOfFirstDigit, indexOfFirstSpace);
    var streetName = address.substring(indexOfFirstSpace + 1);
    return {
      number: streetNo,
      name: streetName
    };
  } else {
    return address.split(",");
  }
}
