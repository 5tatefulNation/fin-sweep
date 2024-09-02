import os
from quickfs import QuickFS
import pandas as pd

api_key = '3df0a1cd95b65ad7766e0e59a87921258e42996d'
print("Using API key:", api_key)
client = QuickFS(api_key)

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
    'price_to_earnings',  # This is the PE ratio
    'price_to_fcf',
    'roe',
    'roic'
]

symbols = ['AAPL:US', 'GOOGL:US', 'MSFT:US']

historical_data = get_historical_data(symbols, metrics)

print("Raw data:", historical_data)

# Create a DataFrame with aligned indices
df_list = []
for symbol, data in historical_data.items():
    df = pd.DataFrame(data)
    df['symbol'] = symbol
    
    # Calculate earnings yield as the inverse of PE ratio
    if 'price_to_earnings' in df.columns:
        df['earnings_yield'] = 1 / df['price_to_earnings']
    else:
        print(f"Warning: PE ratio not available for {symbol}, earnings yield not calculated")
    
    df_list.append(df)

final_df = pd.concat(df_list, ignore_index=True)

print(final_df.head())

final_df.to_csv('stock_data.csv', index=False)
print("Data saved to stock_data.csv")

print("Final DataFrame columns:", final_df.columns)
