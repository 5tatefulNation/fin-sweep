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

            // Build the URL for fetching stock metrics
            const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;

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
                        debtToEquity: data['DebtToEquityRatioTTM'],
                        marketCap: data['MarketCapitalization'],
                        enterpriseValue: data['EnterpriseValue'],
                        earningsYield: data['EarningsYieldTTM'],
                        peRatio: data['PEGRatio'],
                        priceToFreeCashFlow: data['PriceToFreeCashFlowsTTM'],
                        roe: data['ReturnOnEquityTTM'],
                        roi: data['ReturnOnInvestmentTTM']
                    };

                    // Display the data
                    $('#dataDisplay').html(`
                        <h3>Financial Metrics for ${displayData.symbol}</h3>
                        <p>Debt to Equity Ratio: ${displayData.debtToEquity || 'N/A'}</p>
                        <p>Market Capitalization: ${displayData.marketCap || 'N/A'}</p>
                        <p>Enterprise Value: ${displayData.enterpriseValue || 'N/A'}</p>
                        <p>Earnings Yield: ${displayData.earningsYield || 'N/A'}</p>
                        <p>P/E Ratio: ${displayData.peRatio || 'N/A'}</p>
                        <p>Price to Free Cash Flow: ${displayData.priceToFreeCashFlow || 'N/A'}</p>
                        <p>ROE: ${displayData.roe || 'N/A'}</p>
                        <p>ROI: ${displayData.roi || 'N/A'}</p>
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
