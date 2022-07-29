# Introduction 
This is a Saas Application to launch powershell scripts with permissions

# Getting Started

## 1.	Software dependencies
You will need some dependencies to run this application.

Run for development and locally:
- [npm](https://www.npmjs.com/)
- [nodejs](https://nodejs.org/)
- [powershell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-windows)

Or run for production on VM:
- [docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/install/)

## 2.	Installation process
### 2.1. With docker-compose
From command line at the root:
    
``` bash
docker-compose build
docker-compose up -d
```

### 2.2. With npm
From command line at the root:
    
``` bash
# start Server
npm i ./Api && npm run start ./Api

# start Client
npm i ./WebSite && npm run start ./WebSite
```
