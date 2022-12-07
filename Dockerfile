FROM python:3
WORKDIR /app
ARG POETRY_VERSION=1.2.2
RUN apt-get update &&\
    curl -sL https://deb.nodesource.com/setup_16.x | bash - &&\
    apt-get install -y nodejs &&\
    pip3 install poetry
COPY package*.json ./
COPY pyproject.toml ./
COPY poetry.lock ./
# Install dependencies
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
RUN poetry install && npm install
COPY . .
CMD ["npm", "run", "dev"]
