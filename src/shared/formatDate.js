const formatDate = (date) => {
    const day = String(date[2]).padStart(2, '0');
    const month = String(date[1]).padStart(2, '0');
    const year = date[0];

    return `${day}-${month}-${year}`;
}

export default formatDate;