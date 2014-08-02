import sys
import csv
import re
import json
import pprint
import urllib2

OUTPUT = []

filename = 'hillary.csv'
rows=list(csv.reader(open('../data/'+filename, 'rU'))) #, 'rb', encoding='utf-8'
fileout = open(filename[:-4]+'.json', 'w')

geourl = "https://maps.googleapis.com/maps/api/geocode/json?address="

def uni (text):
	return unicode(text, errors='ignore')

def buildData ():
	for idx,n in enumerate(rows):
		if idx == 0:
			fields = n
		if idx != 0:
			rowobj = {}
			for i,k in enumerate(fields):
					rowobj[k.strip()] = uni(str(n[i].strip()))
			if(len(n[1])>0 and n[1]!="null" and n[1]!="N/A"):
				location = n[1].replace(" ","+")+"+"+n[2].replace(" ","+")
				data = json.load(urllib2.urlopen(geourl+location))
				coords = data["results"][0]["geometry"]["location"]
				print coords
				rowobj["coords"] = str(coords["lat"])+","+str(coords["lng"])
			OUTPUT.append(rowobj)

	#OUTPUT["FIELDS"] = fields

buildData()

pprint.pprint(OUTPUT)
json.dump(OUTPUT, fileout)
fileout.close()