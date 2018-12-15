import json
import pandas as pd
from collections import OrderedDict

if __name__ == '__main__':

    csvFile = pd.read_csv('exp.csv')
    titles = csvFile['Title']
    roles = csvFile['Role']
    times = csvFile['Duration']
    descs = csvFile['Description']
    exp = [OrderedDict({"title":title, "role":role, "duration":time, "desc": desc}) for title, role, time, desc in zip(titles, roles, times, descs)]
    expJson = {"exp": exp}
    with open('./exp.json', 'w') as file:
        file.write(json.dumps(expJson, indent=4))
    #print(json.dumps(teamJson, indent=4))
    
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