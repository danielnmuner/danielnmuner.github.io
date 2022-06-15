#!/usr/bin/env python
# coding: utf-8

# [![resume](./logo.png)](https://kind-stone-04621511e.1.azurestaticapps.net/)
# # Vinho Verde Analysis🚀🪜
# 
# ## Introduction 🧑‍🚀 
# 
# Here we are going to understand how wine quality is affected by the fact of changing its chemical components. The goal is to get statistical information that could lead this industry to make better decisions regarding production methods so they could invest more on certain deparments in the production line.🍷
# 
# ## Let's load and setup our DataFrames and Environment 🤖

# ## Let's get to know some Vinho Verde chemical properties🍷
# 
# > We will use two datasets focused on the quality of wines. Both are related to the white wine and red wine variants of the Portuguese wine "Vinho Verde".   
# 
# > The source of these datasets are from the UCI Machine Learning Repository. You can learn more about them [here](https://archive.ics.uci.edu/ml/datasets/wine+quality)🙃.
# 
# ### Input variables
# 
# - **🔖Fixed acidity** : Most of the acids involved with wine are either fixed or non-volatile.
# - **🔖Volatile acidity**: The amount of acetic acid in the wine, where high levels can cause an unpleasant vinegar taste.
# - **🔖Citric acid**: Citric acid can add 'freshness' and flavor to wines.
# - **🔖Residual sugar**: The amount of sugar left after fermentation stops. Wines with more than 45 grams/litre are considered sweet.
# - **🔖Chlorides**:The amount of salt in the wine.
# - **🔖Free sulfur dioxide**: The free form of SO2 exists in equilibrium between molecular SO2 (as dissolved gas) and bisulfite ion; prevents microbial growth and oxidation of wine.
# - **🔖Total sulfur dioxide**: Number of free and bound forms of S02; Above 50 ppm, SO2 becomes apparent in the nose and flavor of the wine.
# - **🔖Density**: The density change depending on the percentage of alcohol and sugar contained.
# - **🔖pH**: Describes how acidic or basic a wine is on a scale of 0 (very acidic) to 14 (very basic); most wines are between 3 and 4 on the pH scale
# - **🔖Sulphates**: A wine additive that can contribute to sulfur dioxide (S02) levels, which acts as an antimicrobial and antioxidant
# - **🔖Alcohol**: The percent alcohol content of the wine
# 
# ### Variable output
# - **🔖Quality**: Output or target variable (based on sensory data, score between 0 and 10). Indicates how good the wine is at this quality standard.

# ### ¿Which libraries do we need?🤔
# 
# Import requiered libraries to processes pandas DataFrames like pandas, numpy, matplotlib.pyplot & seaborn.🤓

# In[1]:


#Import requiered libraries to processes pandas DataFrames 

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

#Setting up display options for data precision and float format
pd.set_option('display.precision', 2)
pd.set_option('display.float_format',  '{:,.2f}'.format)


# ### Load Data 🔃
# > Load the datasets directly from their **URLs** as shown. Alternatively, we could have loaded the data as CSV files, but with URLs, we can have it more directly from the source. **Note**: Delimiter is `;`

# In[2]:


url_wine_red = 'https://archive.ics.uci.edu/ml/machine-learning-databases/wine-quality/winequality-red.csv'
url_wine_white = 'https://archive.ics.uci.edu/ml/machine-learning-databases/wine-quality/winequality-white.csv'
red = pd.read_csv(url_wine_red, delimiter=";")
white = pd.read_csv(url_wine_white, delimiter=";")


# ### Concat DataFrames 🤝
# 
# > We need to add a `category` to each DataFrame to distinguish between red and white wine by the time we concat them. This concatenation is automatically on-axis = 0.

# In[3]:


#Adding category to each DataFrame
red['category']='red'
white['category']='white'

#Concatenation on-axis 0
total_wine=pd.concat([white,red],ignore_index=True)
#Let's see what happened🫣
total_wine.sample(10)


# ### Let's explore and maybe get rid of some duplicates. 🔂
# 
# > First, ¿How big is the DataFrame?.   
# 
# > Common data types and their statistical description on the dataset. Observe the statistics in detail and identify if there are high differences between each percentile of each feature.

# In[4]:


# Size of the dataset
print(f'¿How big is the DataFrame? Well is about: {total_wine.shape[0]} rows and {total_wine.shape[1]} columns. 🤙\n')
#Allocate the right variable type
total_wine['category'] = total_wine['category'].astype('category')
#What type? and How many?
total_wine.info()


# In[5]:


#Here some measures of central tendency and we can't miss std🙃
total_wine.describe()


# In[6]:


#Let's get rid of duplicates🔂
total_wine.drop_duplicates(keep='last', inplace=True, ignore_index=True)
print(f'Now we have: {total_wine.shape[0]} rows and {total_wine.shape[1]} columns. 🤙\n')


# In[7]:


#Is quality important?,Yes! Let's see what is the percentage share for each quality category
quality_percentage = total_wine['quality'].value_counts()/total_wine['quality'].value_counts().sum()*100
quality_percentage.sort_index(ascending=True)


# ### ¿What I've observed so far? 🔍📔
# 
# > `total_wine` is made up of **float64, int64, object/category** which is expected considering we are talking about small quantities. Also, at first glance, `Residual Sugars` have the highest standard deviation of the dataset.
# 
# > Removing duplicate values reduced the dimensions of the Dataframe from (6497, 13) to (5320, 13), which help to reduce memory usage and improves processing speed. 🤙

# ### Categorization. 🎏
# 
# > In the previous section, you've seen that `quality` is categorical. Creating other quality column will help us to understand how quality behaves in wines.

# In[8]:


#This represent a frequency plot for each type of wine quality.
sns.set_theme(style="whitegrid")
sns.countplot(data=total_wine, x = 'quality', palette='pastel')
plt.show()


# > Indicate wheather quality belogs to `Poor`, `Medium` and `High` to recategorize quality on the dataset and see if we can get new insights.

# In[9]:


#This function will allow us to create a new column with categories poor, medium and high
def q_category(num):
    x = ''
    if num <=4:
        x = 'Poor'
        return x
    elif num>4 and num<=6:
        x = 'Medium'
        return x
    else:
        x = 'Hight'
        return x
#looking on the dataset.
total_wine['quality_category'] = total_wine['quality'].apply(q_category)
total_wine.tail()


# In[10]:


#Change datatype for new column quality_category from object to category
total_wine['quality_category'] = total_wine['quality_category'].astype('category') 
total_wine.info()


# In[11]:


#This is how a freq chart looks like for the quality_ccategory
total_wine['count_cat'] = 1
df_cat = total_wine.copy()
df_cat = total_wine.groupby('quality_category')['count_cat'].count().reset_index()
plt.style.use('fivethirtyeight')
plt.bar(df_cat['quality_category'],df_cat['count_cat'], width=0.8,color=['r','b','g'])
plt.show()


# In[12]:


total_wine.drop('count_cat', axis=1, inplace=True)


# ### Good, but ¿What I've observed so far? 🔍📔
# 
# A third categorization facilitates data interpretation so we can know for instance whether 5 o 6 is medium or high and by establishing new boundaries we can come up with other ideas. 
# 
# Keep in mind casting our variables to the type of data we want to process. The use of functions facilitates the regrouping of variables based on a new metric.

# 
# ### Outliers handling 👨‍💻
# Using the boxplots and IQR method, I will be able to detect and maybe processes outliers.

# In[13]:


#This func gets the min base on IQR method
def min_olier (df):
    q1 = df.quantile(0.25)
    q3 = df.quantile(0.75)
    iqr = q3-q1
    dis_min  = q1-1.5*iqr
    return round(dis_min,2)

#This func gets the max base on IQR method
def max_olier (df):
    q1 = df.quantile(0.25)
    q3 = df.quantile(0.75)
    iqr = q3-q1
    dis_max = q3+1.5*iqr
    return round(dis_max,2)

#This func answers, ¿how many outliers do we have in the upper bound? 
def count_max_out (df):
    q1 = df.quantile(0.25)
    q3 = df.quantile(0.75)
    iqr = q3-q1
    dis_max = q3+1.5*iqr
    x = df > dis_max
    x = x.sum()
    return x

#This func answers, ¿how many outliers do we have in the lower bound? 
def count_min_out (df):
    q1 = df.quantile(0.25)
    q3 = df.quantile(0.75)
    iqr = q3-q1
    dis_min  = q1-1.5*iqr
    x = df < dis_min
    x = x.sum()
    return x
total_wine_stats = total_wine[['fixed acidity', 'volatile acidity', 'citric acid', 'residual sugar',
       'chlorides', 'free sulfur dioxide', 'total sulfur dioxide', 'density',
       'pH', 'sulphates', 'alcohol']]
#total_wine.drop('count_cat', axis=1, inplace=True)
total_wine_stats.agg([min, min_olier,max,max_olier, count_max_out, count_min_out])
#total_wine.agg([min, min_olier,max,max_olier, count_max_out, count_min_out])
#Here I'm applying all func to the dataset


# In[14]:


#Let's get rid of outliers from the whole dataset the idea is get a bit cleaner data.
#This func replace outliers for each distribition independently by Nan values.
def remove_outliers (df):
    q1 = df.quantile(0.25)
    q3 = df.quantile(0.75)
    iqr = q3-q1
#min value for each dristro base on IQR method
    dis_min  = q1-1.5*iqr
#max value for each dristro base on IQR method
    dis_max = q3+1.5*iqr
#Filtering data
    for value in range(df.count()):
        if df[value] <= dis_min or df[value]>= dis_max:
            df[value] =  df[value] * np.nan
        else:
            df[value] = df[value] 
    return df

#Before to apply the func I created a copy so I can separate raw from processesed data. 
total_wine_no_outliers = total_wine.copy()
total_wine_no_outliers = total_wine_no_outliers[['fixed acidity', 'volatile acidity', 'citric acid', 'residual sugar',
       'chlorides', 'free sulfur dioxide', 'total sulfur dioxide', 'density',
       'pH', 'sulphates', 'alcohol']]
total_wine_no_outliers.apply(remove_outliers)

#This is just because remove_outliers func didn't work for str so I separeted for a moment.
#Now I added ['quality', 'category','quality_category'] columns again before doing a dropna()
#So, ¿What's the new size?
total_wine_no_outliers[['quality', 'category','quality_category']] = total_wine[['quality', 'category','quality_category']]
total_wine_no_outliers.shape


# In[15]:


#Here I just want to show you data before and after removing outliers through 
#boxplot method.

total_wine_no_outliers.dropna(inplace=True)
plt.style.use('seaborn-dark')
fig,axes = plt.subplots(4,1, sharex=True, figsize=(15,10))

sns.boxplot(ax=axes[0], x=total_wine['free sulfur dioxide'], linewidth=0.5, orient='h')
axes[0].set_title('free sulfur dioxide with outliers')

sns.boxplot(ax=axes[1], x=total_wine_no_outliers['free sulfur dioxide'], linewidth=0.5, orient='h',color='g')
axes[1].set_title('free sulfur dioxide without outliers')

sns.boxplot(ax=axes[2], x=total_wine['total sulfur dioxide'], linewidth=0.5, orient='h')
axes[2].set_title('total sulfur dioxide with outliers')

sns.boxplot(ax=axes[3], x=total_wine_no_outliers['total sulfur dioxide'], linewidth=0.5, orient='h',color='g')
axes[3].set_title('total sulfur dioxide without outliers')


plt.tight_layout()
plt.show()


# In[16]:


print(f'1. Samples before removing outliers :{total_wine.shape}😬\n2. Samples after removing outliers  :{total_wine_no_outliers.shape}🙃\n3. Now we have {total_wine.shape[0] - total_wine_no_outliers.shape[0]} less samples than before 🤔\n 4. Here some charts to look at the changes.')

fig,axes = plt.subplots(2,2,figsize=(12,8),sharey=True)
sns.set_theme(style="whitegrid")

sns.countplot(data=total_wine_no_outliers, x = 'quality', palette='pastel',ax=axes[0,0])
axes[0,0].set_title('New freq Quality')

sns.countplot(data=total_wine, x = 'quality', palette='pastel',ax=axes[0,1])
axes[0,1].set_title('old freq Quality')

sns.countplot(data=total_wine_no_outliers, x = 'quality_category', palette='pastel',ax=axes[1,0])
axes[1,0].set_title('New freq quality_category')

sns.countplot(data=total_wine, x = 'quality_category', palette='pastel',ax=axes[1,1])
axes[1,1].set_title('old freq quality_category')

fig.tight_layout()
plt.show()


# ### ¿What has been done and why? 🤔
# 
# > Although perhaps outlier removal wasn't strictly required, some chemical compounds could skew the analysis.
# 
# > Compounds such as `'fixed acidity', 'volatile acidity', 'citric acid', 'residual sugar', 'chlorides','sulphates'` have at least in each distribution has over 140 values farther than 3 standard deviations from the mean of each distribution, this statement is made from the IQR method for normal distributions, probably if we process them as non-linear I might change the answer a bit. But as we are processing them as normal then it is necessary. 

# ### Correlation analysis between variables. 🦥
# 
# Now I know the behavior of the features and the `quality` variable, it is time to learn how do they relate to each other and discover wheather or not they affect quality.

# In[17]:


#Correlation Table between all features envolved on the dataset
total_wine.corr()


# In[18]:


#Here is how a heatmap looks like.
fig = plt.figure(figsize=(12,5))
sns.heatmap(total_wine.corr())
plt.show()


# In[19]:


#Correlation between each feature against quality.
wine_corr_quality_a = total_wine.corr()[['quality']].sort_values(by='quality', ascending = False).reset_index().iloc[1:,:].rename(columns={"index": "components"})
wine_corr_quality_b = total_wine_no_outliers.corr()[['quality']].sort_values(by='quality', ascending = False).reset_index().iloc[1:,:].rename(columns={"index": "components"})
wine_corr_quality_a.merge(wine_corr_quality_b, left_on='components', right_on='components', how='inner').rename(columns={"quality_x": "quality_outliers", "quality_y": "quality_without_outliers"})


# ### So, ¿What's going on with the correlation?🕵️‍♂️
# 
# Well, here all variable with a positive correlation:
# 
# ```
# 1                alcohol
# 2            citric acid
# 3    free sulfur dioxide
# 4              sulphates
# 5                     pH
# Name: components, dtype: object
# ```
# and, here all variable with a negative correlation:
# ```
# 6     total sulfur dioxide
# 7           residual sugar
# 8            fixed acidity
# 9                chlorides
# 10        volatile acidity
# 11                 density
# Name: components, dtype: object
# ```
# 

# In[20]:


#Definitely the highest correlation is given by the alchol but is not too much. 

fig, axes = plt.subplots(nrows=1,ncols=1, figsize=(12,5))
sns.stripplot(data=total_wine, x='quality',y='alcohol')
plt.show()


# 
# - **¿Are there variables correlated with quality that are strongly correlated with each other?** 🤔
# 
#     - Most of the variables correlated with the  quality variable have a factor ρ ≅ 0, which means there isn't really a correlation but instead of a strong correlation there is a weak correlation by alcohol with ρ ≅ 0.47. and is the most representative one.
# 
# - **¿Why would it be usefull?** 🤔
#     - Well, Now I know there's no major findings presented on correlation, it would be important investigate in depth the units of each variable to identify which are more controllable in the winemaking process.

# In[21]:


#Now I have seen alcohol an density correlation against quality 
#I would like to take a look on its distro base on quality_category

fig, axes = plt.subplots(2,2, figsize=(12,8))

sns.violinplot(ax =axes[0,0],data=total_wine,x='quality_category', y='alcohol')
axes[0,0].set_title('alcohol_quality_category')

sns.barplot(ax =axes[0,1],data=total_wine,x='quality_category', y='alcohol')
axes[0,1].set_title('alcohol_quality_category')

sns.violinplot(ax =axes[1,0],data=total_wine,x='quality_category', y='density')
axes[1,0].set_title('density_quality_category')

sns.barplot(ax =axes[1,1],data=total_wine,x='quality_category', y='density')
axes[1,1].set_title('density_quality_category')

fig.tight_layout()
plt.show()


# ### As conclusions of this EDA 🧩
# 
# - **¿What are the variables that could affect the quality of the wine?**
# 
#     - Alcohol is possibly the most related to quality, unlike density which, despite having a negative and weak correlation, cannot really be related to quality since this property is not independent of the other variables. 
# 
# - **¿Is it necessary to increase or decrease the quantity of these variables to increase quality?**
# 
#     - No, in fact it is possible to find low quality wines with high amounts of alcohol and in the other way aroud. The variability in the production process is high so it is nessary  investigate its chemical componets in depth.
# 
# - **¿What is the variable that could most affect the quality of the wine?**
#     - By far, alcohol.

# <a style='text-decoration:none;line-height:16px;display:flex;color:#5B5B62;padding:10px;justify-content:end;' href='https://deepnote.com?utm_source=created-in-deepnote-cell&projectId=9967b59b-f643-46c2-bfe8-889a09ee313c' target="_blank">
# <img alt='Created in deepnote.com' style='display:inline;max-height:16px;margin:0px;margin-right:7.5px;' src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU0LjEgKDc2NDkwKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5Hcm91cCAzPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkxhbmRpbmciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyMzUuMDAwMDAwLCAtNzkuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cC0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjM1LjAwMDAwMCwgNzkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC0yMCIgZmlsbD0iIzAyNjVCNCIgcG9pbnRzPSIyLjM3NjIzNzYyIDgwIDM4LjA0NzY2NjcgODAgNTcuODIxNzgyMiA3My44MDU3NTkyIDU3LjgyMTc4MjIgMzIuNzU5MjczOSAzOS4xNDAyMjc4IDMxLjY4MzE2ODMiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zNS4wMDc3MTgsODAgQzQyLjkwNjIwMDcsNzYuNDU0OTM1OCA0Ny41NjQ5MTY3LDcxLjU0MjI2NzEgNDguOTgzODY2LDY1LjI2MTk5MzkgQzUxLjExMjI4OTksNTUuODQxNTg0MiA0MS42NzcxNzk1LDQ5LjIxMjIyODQgMjUuNjIzOTg0Niw0OS4yMTIyMjg0IEMyNS40ODQ5Mjg5LDQ5LjEyNjg0NDggMjkuODI2MTI5Niw0My4yODM4MjQ4IDM4LjY0NzU4NjksMzEuNjgzMTY4MyBMNzIuODcxMjg3MSwzMi41NTQ0MjUgTDY1LjI4MDk3Myw2Ny42NzYzNDIxIEw1MS4xMTIyODk5LDc3LjM3NjE0NCBMMzUuMDA3NzE4LDgwIFoiIGlkPSJQYXRoLTIyIiBmaWxsPSIjMDAyODY4Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMCwzNy43MzA0NDA1IEwyNy4xMTQ1MzcsMC4yNTcxMTE0MzYgQzYyLjM3MTUxMjMsLTEuOTkwNzE3MDEgODAsMTAuNTAwMzkyNyA4MCwzNy43MzA0NDA1IEM4MCw2NC45NjA0ODgyIDY0Ljc3NjUwMzgsNzkuMDUwMzQxNCAzNC4zMjk1MTEzLDgwIEM0Ny4wNTUzNDg5LDc3LjU2NzA4MDggNTMuNDE4MjY3Nyw3MC4zMTM2MTAzIDUzLjQxODI2NzcsNTguMjM5NTg4NSBDNTMuNDE4MjY3Nyw0MC4xMjg1NTU3IDM2LjMwMzk1NDQsMzcuNzMwNDQwNSAyNS4yMjc0MTcsMzcuNzMwNDQwNSBDMTcuODQzMDU4NiwzNy43MzA0NDA1IDkuNDMzOTE5NjYsMzcuNzMwNDQwNSAwLDM3LjczMDQ0MDUgWiIgaWQ9IlBhdGgtMTkiIGZpbGw9IiMzNzkzRUYiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+' > </img>
# Created in <span style='font-weight:600;margin-left:4px;'>Deepnote</span></a>
