#!/usr/bin/env python
# coding: utf-8

# [![resume](./logo.png)](https://kind-stone-04621511e.1.azurestaticapps.net/)
# # Dental Office 🦷🪥
# > Business Analysis 📈
# 
# I'd like to say that for the last two years, I've been freelance working in a dental office. I really didn't study any similar to it. I have no practical knowledge on, notwithstanding I have taken part in `managing data`. In other words, I know we should take care of patients data and manipulate it wisely. Process, understand and interpret data is important in the `decision-making process` so we can know who is visiting us and measure the impact it generates on business profits. 
# 
# 
# ## Data source📔    
# The database that we query in this analysis is temporarily hosted on an Azure IaaS service, specifically Azure Data Base for PostgreSQL, so if you try to connect to it, you won't have access given that the information is sensitive and must be protected.

# ![img](https://i.ibb.co/7phWSrF/Recurso-2.png)

# ## Connect DataBase/Python 
# 
# `Psycopg` is the most popular PostgreSQL database adapter for python and all we need to do is `import psycopg2` instantiate `connect` and indicate server-general information easily obtained from azure.

# In[1]:


#We'll use pandas and numpy for data manipulation
import pandas as pd
import numpy as np
#We use seaborn and matplotlib to plot the data
import seaborn as sns
import matplotlib.pyplot as plt 
#Library to connect with postgresql
import psycopg2

#Establish connection with server adminsql@az-postgresql-server host on azure as IaaS
conn_sql = psycopg2.connect(user = "adminsql@az-postgresql-server",
                            password = "CEdndm1246",
                            host = "az-postgresql-server.postgres.database.azure.com",
                            port = "5432",
                            database = "postgres")


# ## Database Query
# The database is made up of eleven tables, however, only three are dependent and the remaining eight are independent, which means that it is a low-complexity database where the patient table is connected to the treatment table through the transition table patient_treatment and that's it, as shown below the query indicates the type of `JOIN` and the aliases given to each column.## Database Query
# The database is made up of eleven tables, however, only three are dependent and the remaining eight are independent, which means that it is a low-complexity database where the patient table is connected to the treatment table through the transition table patient_treatment and that's it, as shown below the query indicates the type of `JOIN` and the aliases given to each column.

# In[2]:


query_sql = '''
SELECT date AS "appointment day", hour AS "appointment hour", 
LOWER(f_name) AS "patient name", LOWER(type_of_id) AS "type of id",
LOWER(place_of_issuance) AS "id-document-issuance",  date_of_birth AS birthday,
LOWER(genre) AS genre, LOWER(health_care_facility) AS "healthcare facility", 
LOWER(occupation) AS occupation, LOWER(oral_hygiene) AS "oral hygiene", 
brushed_per_day AS brushing , LOWER(smoke) AS smoker, dental_floss AS "floss usage", 
LOWER(alcohol) AS alcoholic, LOWER(proceed) AS "dental-procedure",
LOWER(method_of_payment) AS "payment method", cost, material_expense AS "dental-materials-cost",
LOWER(procedure_status) AS "procedure-status", extract(year from AGE(date_of_birth)) as age

-- INNER JOIN is better than LEFT JOIN given raw data is quite incomple
FROM patient
INNER JOIN type_of_id USING (type_of_id_id)
INNER JOIN genre USING (genre_id)
INNER JOIN health_care_facility USING (health_care_facility_id)
INNER JOIN occupation USING (occupation_id)
INNER JOIN neighborhood USING (neighborhood_id)
INNER JOIN patient_treatment USING (patient_id)
INNER JOIN treatment USING (treatment_id)
INNER JOIN proceed USING (proceed_id)
INNER JOIN business_reference USING (business_reference_id)
INNER JOIN method_of_payment USING (method_of_payment_id)
'''
#Using pd.read_sql we read the data and store it in dental_office_raw or raw data.
dental_office_raw = pd.read_sql(query_sql, conn_sql)
#Create a copy() in case we need to get back to it.
dental_office = dental_office_raw.copy()
#Extract a sample from it making sure it's been query properly.
dental_office.sample(10)


# In[3]:


#Identify how many columns and rows has the DataFrame 
dental_office.shape


# ## Data Exploration 👨‍💻🔍
# 
# `info () besides indicating the data type shows us null values, so here is were we can decide, whether to cast or not data to their respective types and even categorize it for further analysis.
# 
# - Identify data types and null data
# - Casting `birthday` and `appointment day` to date type.
# - Identify unique values within the next columns, `smoker`, `floss usage`, `alcoholic`, `oral hygiene`, correct semantic errors and remove blanks.

# In[4]:


#Data types and missing values
dental_office.info()


# In[5]:


#Turning object type to datetime64
dental_office['appointment day'] = pd.to_datetime(dental_office['appointment day'])
dental_office['birthday'] = pd.to_datetime(dental_office['birthday'])


# In[6]:


#Semantic errors identified in smoker column
dental_office['smoker'].unique()[1:4]


# In[7]:


dental_office['smoker'].replace({'no ': 'no', 'non ': 'no','si ':'si'}, inplace=True)
dental_office['smoker'].unique()


# In[8]:


#Semantic errors identified in floss usage column
dental_office['floss usage'].unique()


# In[9]:


dental_office['floss usage'].replace({'NO ': 'no','NO': 'no','MNO ': 'no',' NO ': 'no', 'SI ': 'si','SI':'si'}, inplace=True)
dental_office['floss usage'].unique()


# In[10]:


#Semantic errors identified in alcoholic column
dental_office['alcoholic'].unique()


# In[11]:


dental_office['alcoholic'].replace({'no ':'no','nio':'no','si ':'si'},inplace=True)
dental_office['alcoholic'].unique()


# In[12]:


#Semantic errors identified in oral hygeine column
dental_office['oral hygiene'].replace({'buena ':'buena','mala ':'mala','regular ':'regular','regualr':'regular','bueno ':'buena','buena 2':'buena','bueno':'buena'}, inplace=True)
dental_office['oral hygiene'].unique()


# In[13]:


#Below we indicate the number of missing values per column
null_values = dental_office.isnull().sum().reset_index()
null_values.rename(columns={'index':'col_name',0:'null_val'},inplace=True)
null_values = null_values[null_values['null_val']>0].reset_index(drop=True)
null_values


# There are control or follow-up dental visits, which do not have any associated cost, so we'll replace all the missing values in the `cost` column with 0. This does not happen with other columns such as `brushing`, which we will discard from the analysis given the missing values; in doing so, we'll proceed to remove duplicates based on the remaining columns.

# In[14]:


dental_office['cost'].fillna(0, inplace=True)
dental_office['dental-materials-cost'].fillna(0,inplace=True)

dental_office.dropna(how='any', subset=['patient name','birthday','smoker','floss usage','alcoholic','procedure-status','appointment day'], inplace=True)

dental_office = dental_office[['appointment day', 'appointment hour', 'patient name', 'type of id',
       'id-document-issuance', 'birthday','age', 'genre', 'healthcare facility',
       'occupation', 'oral hygiene', 'smoker', 'floss usage',
       'alcoholic', 'dental-procedure', 'payment method', 'cost','dental-materials-cost', 'procedure-status']]


# In[15]:


#Turning object type into categorical 
dental_office = dental_office.astype({"type of id":"category", "id-document-issuance":'category',"genre":'category',
                                      "healthcare facility":'category',"occupation":'category',"oral hygiene":'category',
                                      "smoker":'category',"floss usage":'category',"alcoholic":'category',
                                      "dental-procedure":'category',"payment method":'category',
                                      "procedure-status":'category',"age":'int'})


# ### Procedures performed on patients grouped by gender with the highest cost.
# 
# This information compiles the procedures in which both men and women invested more money. We create a grouped table for each gender, then we do an append.
# 
# - The most expensive procedure accessed by patients grouped by gender and most frequently used are flexible prostheses.

# In[16]:


#Set up display options for floating format
pd.options.display.float_format = '{:.0f}'.format
#Add to columns filtered by gender
dental_office['counts'] = 1
women_top_proc = dental_office[dental_office['genre']=='femenino'].groupby(['genre','dental-procedure'])['cost'].median().sort_values(ascending=False).head(5)
men_top_proc = dental_office[dental_office['genre']=='masculino'].groupby(['genre','dental-procedure'])['cost'].median().sort_values(ascending=False).head(5)
men_top_proc.append(women_top_proc).to_frame()


# ### Descriptive Income Statistics regarding gender and occupation
# 
# **Note**: Errors are evident in the male gender with respect to the occupation `housewife` which does not usually apply to this gender and was applied by mistake.
# 
# - The median is the same for self-employed and employees regardless of gender.
# - Unemployed men have the highest standard deviation, which could be due to an error when entering the type of patient. In addition, there is no agreement that the unemployed present the second highest income. Opposed to what happens with women.

# In[17]:


#Income grouped by genre and occupation
dental_office.groupby(['genre','occupation'])['cost'].describe()


# ### Analysis of essential aspects in oral care
# 
# There are bad habits that affect teeth health,  such as `smoking ',` drinking alcohol`,  or not brushing  properly. They can cause either short- or long-term problems depending on each patient.  Focusing health and prevention campaigns on populations with higher incidences of bad habits can help.
# 
# **Smokers**
# 
# - In terms of occupation, employees and self-employed have the most significant percentage or a higher tendency to smoke. It should be noted that the amount of data for categories other than employees and self-employed is not significant, which increases the bias in the given conclusion.
# 
# **Oral hygiene**
# 
# - Oral hygiene is related to the number of times we brush our teeth per day, where 3 is good, 2 is regular and 1 is bad.
# -More than 50%of patients, both men and women, have good hygiene, which makes sense in patients who are attentive to their oral health. Usually patients who have bad habits in their oral health do not usually visit the dentist.
# 
# **Dental Floss**
# 
# - Dental floss is a very important habit, but just a few 4 out of 10 people use it.
# 
# **Alcohol**
# 
# - The question, Do you consume alcoholic beverages?. Well,  patients don't know what to answer, or they associate it with people who abuse alcoholic beverages, so we should reword the question and make the patient feel more comfortable instead of being attacked with the question. 

# In[18]:


#Smokers percentage
pd.options.display.float_format = '{:.2f}%'.format
p_smoker = dental_office.groupby(['genre','smoker','occupation'])[['counts']].sum()
p_smoker = p_smoker.groupby(level=0).apply(lambda x :  x /x.sum()*100).unstack('occupation')
p_smoker.xs('si',level=1)


# In[19]:


#Oral hygeine percentage grouped by gender
p_hygiene = dental_office.groupby(['genre','oral hygiene'])[['counts']].sum()
p_hygiene.groupby(level=0).apply(lambda x : x / x.sum()*100)


# In[20]:


#Dental floss usage grouped by gender
p_floss = dental_office.groupby(['genre','floss usage'])[['counts']].sum()
p_floss.groupby(level=0).apply(lambda x : x / x.sum()*100)


# In[21]:


#Alcohol consumption grouped by gender
p_alcoholic = dental_office.groupby(['genre','alcoholic','occupation'])[['counts']].sum()
p_alcoholic = p_alcoholic.groupby(level=0).apply(lambda x : x / x.sum()*100)
p_alcoholic.unstack('occupation').xs('si',level=1)


# ###Patients Preferred Payment Methods
# 
# Payment options are increasingly diverse to make it easier for patients to access dental treatment. We could analyze payment methods with regard to different population groups. but for this analysis we will focus on relating them in regard to the occupation and the generation each patient belongs to.
# 
# **Generation/Occupation**
# 
# Despite the convenience of bank or mobile transfers, they aren't as representative as cash, or traditional payment methods. Creditcart transfers in some cases involve tax payments and have also not been adopted by all generations or age ranges. The graph `percentage by generation` shows the segment of patients that belongs to each generation.
# - Approximately 45% of patients are `Gen Z` and `Millennials` i.e., a population made up of youth and young adults whose use of EFT's is likely to be greater than older adults.
# - When we cross  generations data regarding payment methods, we observe that a higher percentage of electronic payments are in `Millennials` compared to other generations. Despite being a representative population of the total number of patients, the preferred payment method is the traditional one by far.
# - **Note**: Create a table that allows validating whether the `Millennials` generation that has access to dental treatments are actually the most active at work so they can afford them. **Answer**: The `Millennials` generation are the most active at work. Most of them are self-employed.
# - People whose occupation is self-employed are the population that uses the most electronic payment methods, with more than 20% of the total.

# In[22]:


#This func allow us to categorize patient age group by generations 
def patient_gen(x):
  if x >= 10 and x <= 25:
    return 'Gen Z'
  elif x >= 26 and x <= 41:
    return 'Millennials'
  elif x >= 42 and x <= 57:
    return 'Gen X'
  elif x >= 58 and x <= 67:
    return 'Boomers II'
  elif x >= 68 and x <= 76:
    return 'Boomers I'
  elif x >= 77 and x <= 94:
    return 'Post War Gen'
  else:
    return 'None'

dental_office['patient_gen'] = dental_office['age'].apply(patient_gen)


# In[23]:


#Patients bar chart according to the generational group to which they belong.

patient_gens = dental_office.groupby('patient_gen')[['counts']].sum()
total_patient_gen = patient_gens.reset_index().rename(columns={'counts':'total'})
percent_patient_gen = patient_gens.groupby(level=0).apply(lambda x:x/patient_gens.sum()*100).reset_index().rename(columns={'counts':'percentage'})

fig,axes = plt.subplots(1,2,figsize=(12,5))
axes[0].set_title('Total Patients per Generation')

t = sns.barplot(ax=axes[0], data=total_patient_gen, x='patient_gen',y='total',palette='magma')
plt.xticks(rotation=45)
t.set_xlabel('Generations')
t.set_ylabel('Freq Total')
t.set_xticklabels(['Boomers I', 'Boomers II', 'Gen X', 'Gen Z', 'Millennials', 'None',
       'Post War Gen'], rotation=45)

axes[1].set_title('Percentage per Generation')

p = sns.barplot(ax=axes[1], data=percent_patient_gen, x='patient_gen',y='percentage',palette='magma')
p.set_xlabel('Generations')
p.set_ylabel("Percentage")
p.set_xticklabels(['Boomers I', 'Boomers II', 'Gen X', 'Gen Z', 'Millennials', 'None',
       'Post War Gen'], rotation=45)
fig.tight_layout()
percent_patient_gen
plt.show()


# In[24]:


#Tabulate crossed data between generation and payment method

pd.options.display.float_format = '{:.2f}%'.format
non_common_methods = ['trans_bancolombia','trans_davivienda','otro']
prefer_payment = dental_office[~dental_office['payment method'].isin(non_common_methods)]
prefer_payment = prefer_payment.groupby(['patient_gen','payment method'])[['counts']].sum()
prefer_payment = prefer_payment.groupby(level=0).apply(lambda x:x/x.sum()*100)
prefer_payment.unstack('payment method').iloc[:,:4]


# In[25]:


#Tabulate crossed data between generation and occupation
pd.options.display.float_format = '{:.2f}%'.format
non_common_methods = ['trans_bancolombia','trans_davivienda','otro']
generation_payment = dental_office[~dental_office['payment method'].isin(non_common_methods)]
generation_payment = generation_payment.groupby(['patient_gen','occupation'])['counts'].sum()
generation_payment.groupby(level=0).apply(lambda x:x/x.sum()*100).unstack('occupation')


# In[26]:


#Prefered payment methods groupped by occupation 
non_common_methods = ['trans_bancolombia','trans_davivienda','otro']
p_payment = dental_office[~dental_office['payment method'].isin(non_common_methods)]
p_payment = p_payment.groupby(['occupation','payment method'])[['counts']].sum()
p_payment = p_payment.groupby(level=0).apply(lambda x : x / x.sum()*100)
p_payment.unstack('payment method').iloc[:,:4]


# ## Revenue analysis over time series
# 
# An analysis of an income statement is normally made up of sales income, administrative expenses, operational costs, among others, in order to analyze net profit. However, for this case study we will only consider sales revenue without any deductions.
# 
# -The best way to analyze income regarding series series is from the mobile sock method, as shown in the graphic `Expenditure analysis per sex` the trend is clearer to create 30 -rows windows for a daily frequency for a daily frequency. This makes it possible to avoid negative spikes on days where there was no revenue.
# - The categorization of income can be carried out with respect to different population groups. However, it will only be done with respect to gender and occupation.
# -Men are the demographic group that are carried out less dental treatments. The downward trend in the last 2 years is worrisome, so it is suggested to perform a detailed analysis regarding this deficit of men.
# - The categorization by occupation reflects that there is a greater fluctuation in the group of independent workers than in the group of employees, being the employees, the ones who have allowed the growth of the dental practice income.

# In[27]:


#Business income groupped by gender
dental_office['women_exp'] = dental_office[dental_office['genre'] == 'femenino']['cost']
dental_office['men_exp'] = dental_office[dental_office['genre'] == 'masculino']['cost']
date_analysis_D = dental_office.groupby(pd.Grouper(key='appointment day', freq='D'))[['cost','women_exp','men_exp']].sum()
sales_total = date_analysis_D.rolling(30).mean()
fig = plt.figure(figsize=(15,8))
sale_to = sns.lineplot(data=sales_total)
sale_to.set_title('Expenditure Analysis per Sex',fontsize=20)
sale_to.set_xlabel('Period of Time')
sale_to.set_ylabel('Moving Avg 30 Days(Amount)')
plt.show()


# In[28]:


#Business income groupped by patient occupation
from matplotlib.lines import Line2D
from matplotlib import rcParams, cycler
cmap = plt.cm.coolwarm
custom_lines = [Line2D([0], [0], color=cmap(1.), lw=4),
                Line2D([0], [0], color=cmap(.8), lw=4),
                Line2D([0], [0], color=cmap(0.6), lw=4),
                Line2D([0], [0], color=cmap(0.2), lw=4),
                Line2D([0], [0], color=cmap(.0), lw=4)]

rcParams['axes.prop_cycle'] = cycler(color=cmap(np.linspace(0, 1, 5)))


dental_office['student_exp'] = dental_office[dental_office['occupation'] == 'estudiante']['cost']
dental_office['employee_exp'] = dental_office[dental_office['occupation'] == 'empleado']['cost']
dental_office['hkeeper_exp'] = dental_office[dental_office['occupation'] == 'ama de casa']['cost']
dental_office['ind_exp'] = dental_office[dental_office['occupation'] == 'independiente']['cost']
dental_office['unemployee_exp'] = dental_office[dental_office['occupation'] == 'desempleado']['cost']

date_analysis_occupation = dental_office.groupby(pd.Grouper(key='appointment day', freq='D'))[['student_exp','employee_exp','hkeeper_exp','ind_exp','unemployee_exp']].sum()
sales_occupation = date_analysis_occupation.rolling(30).mean()

fig, ax = plt.subplots(figsize=(15, 8))
lines = ax.plot(sales_occupation)

sale_to.set_title('Expenditure Analysis per Occupation',fontsize=20)
sale_to.set_xlabel('Period of Time')
sale_to.set_ylabel('Moving Avg 30 Day(Amount)')
ax.legend(custom_lines, ['student_exp', 'employee_exp', 'hkeeper_exp','ind_exp','unemployee_exp']);
plt.show()


# In[29]:


#Business income groupped by gender time series per year
pd.options.display.float_format = '{:.0f}'.format
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
dental_office['year'] = dental_office['appointment day'].dt.year
dental_office['month'] = dental_office['appointment day'].dt.month
#dental_office['month'] = pd.to_datetime(dental_office['appointment day'], format='%m').dt.month_name()
revenue = dental_office.groupby(['year','month'])[['cost']].sum()
revenue_2021 = revenue.xs(2021,level=0).rename(columns={'cost':'revenue 2021'})
revenue_2022 = revenue.xs(2022,level=0).rename(columns={'cost':'revenue 2022'})
revenue_year = pd.concat([revenue_2021,revenue_2022],axis=1).reset_index()
revenue_year['month'] = pd.Categorical(revenue_year['month'].apply(str))
revenue_year.plot.bar(stacked=False,width=1.0)
plt.xticks(np.arange(12),months, rotation=45)
plt.show()


#  ## Conclusions
# 
# 1. The case of study includes real data that contains sensitive information and that compromises the safety of patients, for this reason you will not be able to access the data if you try to access the server later on.
# 2. Understanding the categorical variables as population groups, it could be interesting to make a cross-union between the largest number of groups to analyze more in detail sales in detailed cases, such as sales income given by self-employed women who belongs to generation X and use dental floss properly.
# 3. The dental office should look forward to better communication channels that allow us to increase men's interest in oral health. Identify the possible reasons why this population hardly has access or interest to dental treatments.
