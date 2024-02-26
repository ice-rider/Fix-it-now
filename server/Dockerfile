FROM python:3.6-slim-buster

WORKDIR /server

COPY requirements.txt /server

RUN pip install -r requirements.txt

COPY . /server