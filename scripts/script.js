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

            // URLs for fetching different metrics
            const incomeStatementUrl = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${apiKey}`;
            const balanceSheetUrl = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=${apiKey}`;
            const overviewUrl = `https://www.alphavantage.co/query?function=OVERRVIEW&symbol=${symbol}&apikey=${apiKey}`;

            // Fetch data from the API
            $.when(
                $.ajax({ url: incomeStatementUrl, type: 'GET', dataType: 'json' }),
                $.ajax({ url: balanceSheetUrl, type: 'GET', dataType: 'json' }),
                $.ajax({ url: overviewUrl, type: 'GET', dataType: 'json' })
            ).done(function (incomeData, balanceData, overviewData) {
                const income = incomeData[0];
                const balance = balanceData[0];
                const overview = overviewData[0];

                // Create a data display object
                const displayData = {
                    symbol: symbol,
                    debtToEquity: overview['DebtToEquityRatio'],
                    marketCap: overview['MarketCapitalization'],
                    enterpriseValue: overview['EnterpriseValue'],
                    earningsYield: overview['EarningsYield'],
                    peRatio: overview['PEGRatio'],
                    priceToFreeCashFlow: overview['PriceToFreeCashFlow'],
                    roe: income['ReturnOnEquityTTM'],
                    roi: income['ReturnOnInvestmentTTM']
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
            }).fail(function (xhr, status, error) {
                console.error('There has been a problem with your AJAX operation:', error);
                $('#dataDisplay').html('<p>Error fetching data. Please try again.</p>');
            });
        } else {
            // If input is empty, show an error message
            $('#dataDisplay').html('<p>Please enter a stock symbol.</p>');
        }
    });
});
