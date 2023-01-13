# Respiree Rest API Assignment

Project is written using Typescript, NodeJS, Express.

- Typescript
- NodeJS
- ExpressJS

## Available Endpoints

- http://localhost:4001/api/get-patients?fields=age,trestbps&sort=age,asc&filters=(attr=trestbps,lt=145,gt=141)(attr=sex,eq=1)
- http://localhost:4001/api/get-patients?filters=(attr=trestbps,lt=145,gt=141)(attr=sex,eq=1)
- http://localhost:4001/api/get-patients?sort=age,desc

## Query parameters

### fields

    - fields=age,trestbps

### sort

    - sort=age,asc
    - sort=age,desc

### filters

    - (attr=trestbps,lt=145,gt=141)(attr=sex,eq=1)
    - logical operators like lt, gt, gte, lte and eq can be passed for attributes

# How to run locally

## STEP1

```
npm install
```

## STEP2

```
npm run serve:local
```

Currently port is configured to use 4001.

- Visit [localhost](<http://localhost:4001/api/get-patients?fields=age,trestbps&sort=age,asc&filters=(attr=trestbps,lt=145,gt=141)(attr=sex,eq=1)>)
