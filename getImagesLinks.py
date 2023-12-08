from bs4 import BeautifulSoup
import urllib.request
import re

html_page = urllib.request.urlopen("https://www.sapo.pt/")
soup = BeautifulSoup(html_page)
images = []
for img in soup.findAll('img'):
    images.append(img.get('src'))

print(images)