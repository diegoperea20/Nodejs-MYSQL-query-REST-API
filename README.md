# Nodejs MYSQL query REST API

<p align="justify">
Nodejs MYSQL REST API query of a company of employee name and salary
</p>

GET
<p align="center">
  <img src="README-images/getquery.PNG" alt="StepLast">
</p>
POST
<p align="center">
  <img src="README-images/postquery.PNG" alt="StepLast">
</p>


DELETE

<p align="center">
  <img src="README-images/deletequery.PNG" alt="StepLast">
</p>


PATCH 
<p align="center">
  <img src="README-images/patchquery.PNG" alt="StepLast">
</p>



FILTER GET
<p align="center">
  <img src="README-images/filtroget.PNG" alt="StepLast">
</p>



Inspiration from [Fazt Code](https://github.com/fazt/nodejs-mysql-restapi)

## Steps to implement

1. Use Dockercompose
```
docker-compose up
```
2. For get node_modules use 

```python
npm install
#run
npm run dev
```

To enter the docker container
```
docker exec -it companydb bash
mysql -u root -p
use companydb;
```