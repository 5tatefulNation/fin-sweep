import os
from quickfs import QuickFS
import pandas as pd

api_key = '3df0a1cd95b65ad7766e0e59a87921258e42996d'
print("Using API key:", api_key)
client = QuickFS(api_key)

try:
    test_data = client.get_data_range('AAPL:US', 'revenue')
    print("Test data:", test_data)
except Exception as e:
    print("Error:", str(e))

def get_stock_data(symbol, metrics):
    result = {}
    for metric in metrics:
        try:
            data = client.get_data_range(symbol, metric)
            if data:
                result[metric] = data
            else:
                print(f"No data retrieved for {symbol}, metric: {metric}")
        except Exception as e:
            print(f"Error fetching data for {symbol}, metric {metric}: {str(e)}")
    return result

def get_historical_data(symbols, metrics):
    all_data = {}
    for symbol in symbols:
        stock_data = get_stock_data(symbol, metrics)
        if stock_data:
            all_data[symbol] = stock_data
    return all_data

metrics = [
    'debt_to_equity',
    'market_cap',
    'enterprise_value',
    'earnings_yield',
    'pe_ratio',
    'price_to_fcf',
    'roe',
    'roi'
]

symbols = ['AAPL:US', 'GOOGL:US', 'MSFT:US']

historical_data = get_historical_data(symbols, metrics)

print("Raw data:", historical_data)

# Create a DataFrame with aligned indices
df_list = []
for symbol, data in historical_data.items():
    df = pd.DataFrame(data)
    df['symbol'] = symbol
    df_list.append(df)

final_df = pd.concat(df_list, ignore_index=True)

print(final_df.head())

final_df.to_csv('stock_data.csv', index=False)
print("Data saved to stock_data.csv")
