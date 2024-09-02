def get_user_input():
    # Two-part questions with validation for range-based criteria
    while True:
        market_cap_low = input("Enter the lower limit for market cap (in millions): ")
        market_cap_high = input("Enter the upper limit for market cap (in millions): ")
        if float(market_cap_low) <= float(market_cap_high):
            break
        else:
            print("Invalid range. The lower limit must be less than or equal to the upper limit. Please re-enter.")

    while True:
        pe_ratio_low = input("Enter the lower limit for PE ratio: ")
        pe_ratio_high = input("Enter the upper limit for PE ratio: ")
        if float(pe_ratio_low) <= float(pe_ratio_high):
            break
        else:
            print("Invalid range. The lower limit must be less than or equal to the upper limit. Please re-enter.")

    while True:
        price_to_fcf_low = input("Enter the lower limit for Price to free cash flow: ")
        price_to_fcf_high = input("Enter the upper limit for Price to free cash flow: ")
        if float(price_to_fcf_low) <= float(price_to_fcf_high):
            break
        else:
            print("Invalid range. The lower limit must be less than or equal to the upper limit. Please re-enter.")

    roic = input("Enter the greater than 5-year average ROIC criteria: ")
    roe = input("Enter the greater than 5-year average ROE criteria: ")
    debt_to_equity = input("Enter the less than Debt to equity ratio criteria: ")
    
    # Store inputs in a dictionary
    user_input = {
        'Market Cap Lower Limit': market_cap_low,
        'Market Cap Upper Limit': market_cap_high,
        'PE Ratio Lower Limit': pe_ratio_low,
        'PE Ratio Upper Limit': pe_ratio_high,
        'Price to FCF Lower Limit': price_to_fcf_low,
        'Price to FCF Upper Limit': price_to_fcf_high,
        'ROIC': roic,
        'ROE': roe,
        'Debt to Equity': debt_to_equity
    }
    
    return user_input

def main():
    user_input = get_user_input()
    print("User Input:", user_input)

    # Here you would add code to interact with the QuickFS API using the user inputs
    # For example, you would parse these inputs and construct queries to filter stocks

if __name__ == "__main__":
    main()
