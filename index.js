from flask import Flask, request, jsonify
from flask_cors import CORS
import asyncio
from aiohttp import ClientSession
import re
import time
import requests
import random
import string
import base64
import datetime
import time
import requests
import json
import os
from urllib.parse import urlparse, parse_qs
from bs4 import BeautifulSoup
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'DNT': '1',  # Do Not Track Request Header
    'Connection': 'close',
    'Referer': 'https://linkvertise.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x66) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
}
key_regex = r'let content = \("([^"]+)"\);'
async def fetch(session, url, referer):
    headers["Referer"] = referer
    async with session.get(url, headers=headers) as response:
        content = await response.text()
        if response.status != 200:
            return None, response.status, content
        return content, response.status, None
async def process_link(hwid):
    endpoints = [
        {
            "url": f"https://flux.li/android/external/start.php?HWID={hwid}",
