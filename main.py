from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.responses import JSONResponse
import uvicorn
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates
import pandas as pd

import utils

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

template = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def root():
	html_file = open("templates/medal_list.html", 'r').read()
	return html_file


@app.get("/athlete", response_class=HTMLResponse)
async def root():
	html_file = open("templates/athlete_list.html", 'r').read()
	return html_file


@app.get("/data/map/medal")
async def get_medal_time_line():
	df = utils.timeline
	time = []
	options = []
	for row in df:
		time.append(str(row))
	# print(time[0])
	for colum in time:
		temp = utils.get_medal_top_list_sum(colum)
		medal_list = []

		for i in temp.index:
			medal_list.append({"name": str(temp.iat[i, 0]), "value": str(temp.iat[i, 1])})
		medal_list_d = {"data": medal_list}
		options.append({"series": [medal_list_d]})

	data = {"options": options, "timeline": time}
	return JSONResponse(content=data)


@app.get("/data/bar_medal")
async def get_medal_list_c():
	df = utils.timeline
	time = []
	option = []
	for row in df:
		time.append(str(row))

	for colum in time:
		temp = utils.get_medal_top_list(colum)
		medal_gold = []
		medal_silver = []
		medal_bronze = []
		gold_flag = 0
		silver_flag = 0
		bronze_flag = 0

		for i in temp.index:
			if str(temp.iat[i, 1]) == 'Gold':
				medal_gold.append([str(temp.loc[i, "count"]), temp.iat[i, 0]])
				gold_flag = 1
			elif str(temp.iat[i, 1]) == 'Silver':
				medal_silver.append([str(temp.loc[i, "count"]), temp.iat[i, 0]])
				silver_flag = 1
			elif str(temp.iat[i, 1]) == 'Bronze':
				medal_bronze.append([str(temp.loc[i, "count"]), temp.iat[i, 0]])
				bronze_flag = 1

			if i < max(temp.index) and str(temp.iat[i, 0]) != str(temp.iat[i+1, 0]):
				if gold_flag != 1:
					medal_gold.append([str(0), temp.iat[i, 0]])
				else:
					gold_flag = 0
				if silver_flag != 1:
					medal_silver.append([str(0), temp.iat[i, 0]])
				else:
					silver_flag = 0
				if bronze_flag != 1:
					medal_bronze.append([str(0), temp.iat[i, 0]])
				else:
					bronze_flag = 0
			elif i == max(temp.index):
				if gold_flag != 1:
					medal_gold.append([str(0), temp.iat[i, 0]])
				else:
					gold_flag = 0
				if silver_flag != 1:
					medal_silver.append([str(0), temp.iat[i, 0]])
				else:
					silver_flag = 0
				if bronze_flag != 1:
					medal_bronze.append([str(0), temp.iat[i, 0]])
				else:
					bronze_flag = 0

		option.append({"series": [{"data": medal_gold}, {"data": medal_silver}, {"data": medal_bronze}]})
	data = {"options": option, "timeline": time}
	# print(type(temp))
	return JSONResponse(content=data)


@app.get("/data/map/athlete")
async def get_athlete_time_line():
	df = utils.timeline
	time = []
	options = []
	for row in df:
		time.append(str(row))
	# print(type(time), '\n')

	for colum in time:
		temp = utils.get_athlete_sum(colum)
		athlete_list = []
		# print(temp.index, '\n')
		for i in temp.index:
			# print(str(i), '\n')
			# print(str(temp.at[i]), '\n')
			athlete_list.append({"name": str(i), "value": str(temp.at[i, colum])})
		athlete_list_d = {"data": athlete_list}
		options.append({"series": [athlete_list_d]})

	data = {"options": options, "timeline": time}
	return JSONResponse(content=data)


@app.get("/data/line_athlete")
async def get_athlete_list_c():
	df = utils.get_line_data()
	source = df.to_dict(orient='records')
	data = {"source": source}
	return JSONResponse(content=data)


@app.get("/hello/{name}")
async def say_hello(name: str):
	return {"message": f"Hello {name}"}

if __name__ == '__main__':
	uvicorn.run(app, host='127.0.0.1', port=8000, reload=True)


