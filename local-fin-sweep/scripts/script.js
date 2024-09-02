$(document).ready(function () {
    // Listen for form submission
    $('#userForm').on('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Get the stock symbol from user input
        const symbol = $('#stock_symbol').val().trim().toUpperCase();

        // Check if the input is not empty
        if (symbol) {
            // Replace 'YOUR_API_KEY' with your actual Alpha Vantage API key
            const apiKey = 'VEFSYZAYPDWN2Z88';

            // Build the URL for fetching stock data
            const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

            // Make the AJAX request
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    console.log(data); // For debugging, shows the full response

                    // Create a data display object
                    const displayData = {
                        symbol: symbol,
                        lastRefreshed: data['Meta Data']['3. Last Refreshed'],
                        interval: data['Meta Data']['4. Interval'],
                        open: data['Time Series (5min)'][Object.keys(data['Time Series (5min)'])[0]]['1. open'],
                        high: data['Time Series (5min)'][Object.keys(data['Time Series (5min)'])[0]]['2. high'],
                        low: data['Time Series (5min)'][Object.keys(data['Time Series (5min)'])[0]]['3. low'],
                        close: data['Time Series (5min)'][Object.keys(data['Time Series (5min)'])[0]]['4. close'],
                        volume: data['Time Series (5min)'][Object.keys(data['Time Series (5min)'])[0]]['5. volume']
                    };

                    // Display the data
                    $('#dataDisplay').html(`
                        <h3>Stock Data for ${displayData.symbol}</h3>
                        <p>Last Refreshed: ${displayData.lastRefreshed}</p>
                        <p>Interval: ${displayData.interval}</p>
                        <p>Open: ${displayData.open}</p>
                        <p>High: ${displayData.high}</p>
                        <p>Low: ${displayData.low}</p>
                        <p>Close: ${displayData.close}</p>
                        <p>Volume: ${displayData.volume}</p>
                    `);
                },
                error: function (xhr, status, error) {
                    console.error('There has been a problem with your AJAX operation:', error);
                    $('#dataDisplay').html('<p>Error fetching data. Please try again.</p>');
                }
            });
        } else {
            // If input is empty, show an error message
            $('#dataDisplay').html('<p>Please enter a stock symbol.</p>');
        }
    });
});
