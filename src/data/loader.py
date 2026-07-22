import pandas as pd

def load_phishtank_data(path:str)-> pd.DataFrame:
    df=pd.read_csv(path)
    df=df[['url']]
    df['label'] = 1
    return df

def load_legit_data(path:str)-> pd.DataFrame: 
    df = pd.read_csv(path) 
    df = df[['url']] 
    df['label'] = 0 
    return df

def combine_datasets(phish_df,legit_df):
    df=pd.concat([phish_df,legit_df],ignore_index=True)
    df = df.sample(frac=1).reset_index(drop=True)  
    return df