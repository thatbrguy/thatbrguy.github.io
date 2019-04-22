import os
import sys
import json
import pandas as pd
from collections import OrderedDict

if __name__ == '__main__':

    ## Achievements
    csvFile = pd.read_csv('achievements.csv')
    titles = csvFile['Title']
    places = csvFile['Place']
    dates = csvFile['Date']
    descs = csvFile['Description']
    achievements = [OrderedDict({"title":title, "place":place, "date":date, "desc": desc}) for title, place, date, desc in zip(titles, places, dates, descs)]
    achievementsJson = {"achievements": achievements}
    with open('./achievements.json', 'w') as file:
        file.write(json.dumps(achievementsJson, indent=4))

    ## Experience
    csvFile = pd.read_csv('exp.csv')
    titles = csvFile['Title']
    roles = csvFile['Role']
    times = csvFile['Duration']
    descs = csvFile['Description']
    exp = [OrderedDict({"title":title, "role":role, "duration":time, "desc": desc}) for title, role, time, desc in zip(titles, roles, times, descs)]
    expJson = {"exp": exp}
    with open('./exp.json', 'w') as file:
        file.write(json.dumps(expJson, indent=4))

    ## Portfolio    
    # tagColor = lambda x: (x == 'blog') ? 'red' : 'blue'
    # Links and LinkText have multiple links and texts separated by ;
    csvFile = pd.read_csv('portfolio.csv')
    csvFile.fillna('', inplace=True)
    tags = csvFile['Tag']
    titles = csvFile['Title']
    descs = csvFile['Desc']
    links = csvFile['Links']
    imgs = csvFile['Img']
    linkTexts = csvFile['LinkText']
    portfolio = [OrderedDict({"title":title, 
                              "tag":tag, 
                              "linkArray":link, 
                              "desc": desc, 
                              "tagPaddingClass": tag + '-padding',
                              "color": 'red' if tag == 'blog' else 'blue',
                              "linkTextArray": linkText,
                              "src": src}) 
           for title, tag, link, desc, linkText, src 
           in zip(titles, tags, links, descs, linkTexts, imgs)]

    portfolioJson = {"portfolio": portfolio}
    with open('./portfolio.json', 'w') as file:
        file.write(json.dumps(portfolioJson, indent=4))

    if sys.argv[1] == 'update' or sys.argv[1] == 'u':
        os.rename('./exp.json', '../src/exp.json')
        os.rename('./portfolio.json', '../src/portfolio.json')
        os.rename('./achievements.json', '../src/achievements.json')
