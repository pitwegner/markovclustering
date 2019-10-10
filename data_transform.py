import pandas as pd
print(pd.read_csv("positions.csv").to_json(orient='records'))
print(pd.read_csv("mails.csv").to_json(orient='records'))
