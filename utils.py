import pandas as pd
import numpy as np

ae = pd.read_csv('data/athlete_events.csv', dtype='str')
nr = pd.read_csv('data/noc_regions.csv')

# print(ae)

ae = ae.merge(nr, on='NOC', how='left')

# print(ae)

ae_s = ae[ae['Season'] == 'Summer']

# NaN check

check = ae[['NOC', 'region']]
check = check.drop_duplicates()
# print(check[['NOC', 'region']].isnull().T.any())

# Olympic Timeline

timeline = ae_s['Year']
timeline = timeline.drop_duplicates().sort_values()


# for row in timeline:
# 	print(str(row))

# Olympic region

def get_region():
	region_s = ae_s['region']
	region_s = region_s.drop_duplicates()
	regions_s = pd.DataFrame(index=region_s.values)
	return regions_s


def get_origin_line_list():
	df = pd.DataFrame(columns=['region', 'year'])
	region_t = nr['region'].drop_duplicates()
	time = timeline
	for row in region_t:
		for row_t in time:
			df_t = pd.DataFrame([[str(row), str(row_t)]], columns=['region', 'year'])
			# print(df, df_t)
			df = pd.concat([df, df_t])

	return df

# Medal Top List (Country)

def get_medal_top_list(year: str):
	year_record = ae_s[ae_s['Year'] == year]
	year_record = year_record[['region', 'Event', 'Medal']]
	year_record = year_record.drop_duplicates()
	year_record = year_record[['region', 'Medal']]
	medal_top_list_c = year_record.groupby('region', as_index=False).value_counts(subset='Medal')
	return medal_top_list_c


def get_medal_top_list_sum(year: str):
	medal_top_list_c = get_medal_top_list(year)
	medal_top_list_c_sum = medal_top_list_c.groupby('region', as_index=False).aggregate({'count': np.sum})
	return medal_top_list_c_sum


# Medal Top List (Athlete)

def get_medal_top_list_a():
	athlete_record = ae_s[['Name', 'Games', 'Event', 'Medal']]
	athlete_record = athlete_record.drop_duplicates()
	athlete_record = athlete_record[['Name', 'Medal']]
	medal_top_list_a = athlete_record.groupby('Name', as_index=False).value_counts(subset='Medal')
	medal_top_list_a_sum = medal_top_list_a.groupby('Name', as_index=False).aggregate({'count': np.sum})
	return medal_top_list_a_sum


# athlete sum

def get_athlete_sum(year: str):
	year_record = ae_s[ae_s['Year'] == year]
	year_record = year_record[['region', 'Name']]
	year_record = year_record.drop_duplicates()
	athlete_list_c = year_record['region'].value_counts()
	athlete_list_c = athlete_list_c.to_frame()
	athlete_list_c = athlete_list_c.rename(columns={'region': year})
	return athlete_list_c


def get_athlete_sum_sex(year: str, sex: str):
	year_record = ae_s[ae_s['Year'] == year]
	year_record = year_record[year_record['Sex'] == sex]
	year_record = year_record[['region', 'Name']]
	year_record = year_record.drop_duplicates()
	athlete_list_c_s = year_record['region'].value_counts()
	athlete_list_c_s = athlete_list_c_s.to_frame()
	athlete_list_c_s = athlete_list_c_s.rename(columns={'region': year})
	return athlete_list_c_s


def get_line_data():
	medal_record = ae_s[['region', 'Year', 'Event', 'Medal']]
	medal_record = medal_record.drop_duplicates()
	medal_record = medal_record[['region', 'Year', 'Medal']]
	medal_record = medal_record.groupby(['region', 'Year'], as_index=False).value_counts(subset='Medal')
	medal_record = medal_record.groupby(['region', 'Year'], as_index=False).aggregate({'count': np.sum})
	medal_record = medal_record.rename(columns={'count': 'Medal', 'Year': 'year'})
	# print(medal_record)

	athlete_record = ae_s[['region', 'Year', 'Name']]
	athlete_record = athlete_record.drop_duplicates()
	athlete_record = athlete_record.groupby(['region', 'Year'], as_index=False).value_counts(subset='Name')
	athlete_record = athlete_record.groupby(['region', 'Year'], as_index=False).aggregate({'count': np.sum})
	athlete_record = athlete_record.rename(columns={'count': 'Total Sum', 'Year': 'year'})
	# print(athlete_record)

	athlete_record_m = ae_s[ae_s['Sex'] == 'M']
	athlete_record_m = athlete_record_m[['region', 'Year', 'Name']]
	athlete_record_m = athlete_record_m.drop_duplicates()
	athlete_record_m = athlete_record_m.groupby(['region', 'Year'], as_index=False).value_counts(subset='Name')
	athlete_record_m = athlete_record_m.groupby(['region', 'Year'], as_index=False).aggregate({'count': np.sum})
	athlete_record_m = athlete_record_m.rename(columns={'count': 'Male', 'Year': 'year'})
	# print(athlete_record_m)

	athlete_record_f = ae_s[ae_s['Sex'] == 'F']
	athlete_record_f = athlete_record_f[['region', 'Year', 'Name']]
	athlete_record_f = athlete_record_f.drop_duplicates()
	athlete_record_f = athlete_record_f.groupby(['region', 'Year'], as_index=False).value_counts(subset='Name')
	athlete_record_f = athlete_record_f.groupby(['region', 'Year'], as_index=False).aggregate({'count': np.sum})
	athlete_record_f = athlete_record_f.rename(columns={'count': 'Female', 'Year': 'year'})
	# print(athlete_record_f)

	line_data = get_origin_line_list()
	line_data = line_data.merge(medal_record, how='left')
	line_data = line_data.merge(athlete_record, how='left')
	line_data = line_data.merge(athlete_record_m, how='left')
	line_data = line_data.merge(athlete_record_f, how='left')
	line_data = line_data.fillna(0)
	line_data = line_data.astype({'Medal': 'int64', 'Total Sum': 'int64', 'Male': 'int64', 'Female': 'int64'})
	line_data = line_data.astype('str')
	return line_data


# test

# test = get_medal_top_list_sum('1904')
# test = test[test['region'] == 'USA']
# temp_gold = test[test['Medal'] == 'Gold']
# test = get_athlete_sum('2016')
# test = get_origin_line_list()
# test = test[test['region'] == 'China']
# print(get_origin_line_list())

# print(test[test['region'] == 'USA'])

# print(ae_s['Medal'].drop_duplicates())

# print(test.index)
# print(max(test.index))

# print(ae_s)
# print(timeline)
# print(medalTopList_c_sum)
# print(test)
# print(type(test))
# print(test.index)
# print(len(test.index))
# print(medalTopList_a_sum[medalTopList_a_sum['Name']=='Michael Fred Phelps, II'])
# print(medalTopList_a[medalTopList_a['Name'] == 'Michael Fred Phelps, II'])
