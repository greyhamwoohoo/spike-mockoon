# Mockoon Spike
A spike using Mockoon to proxy calls to a real service based on the contents of a JSON Body property. 

When we POST to Mockoon (Port: 3001) using an orderId that starts with ```real`````` then it will be Proxied to appReal.js .ie:

```
{ "orderId": "real123" }
```

When we POST to Mockoon using an orderid that does not start with ```real``` then Mockoon will return a canned response. appReal.js will never be called. 

## Getting Started
In VsCode, open the Command Palette (SHIFT+CTRL+P) and run:

```
Devcontainers: Open Folder in Container and choose the root of this repository
```

Once the Devcontainers have started you will get a BASH into the Container. 

## Launching Both Services
There are 'two'  services that need to be launched:

| Service | To start | Port binding |
| -- | -- | -- |
| Real Service | ```npm install; node appReal.js``` | 8002 |
| Mockoon      | ```npm install -g @mockoon/cli; mockoon-cli start --data mockoon_data.json``` | 3001 |

## Scenario: Call the real service directly with a real orderId
To check everything is up and running, execute:

```
curl --request POST --header "Content-Type: application/json" --data '{"orderId":"real123"}' http://localhost:8002/getAddress
```

Observe the response from the real service:

```
Real Service: This is a response from the real service.
```

## Scenario: Call the real service directly BUT with a non-real orderId
This simulates what happens when Mockoon is not configured correctly and it receives something other than a real orderId:

```
curl --request POST --header "Content-Type: application/json" --data '{"orderId":"fake123"}' http://localhost:8002/getAddress
```

Observe the response from the real service when non-real orderIds are sent:

```
Real Service: This is a response from the real service BUT you should never see this message; anything that does not start with 'real' should be handled by Mockoon. 
```

## Scenario: Call Mockoon to get a real address
In this case, Mockoon will be called but as the orderId starts with ```real``` the entire call will be proxied to the real service:

```
curl --request POST --header "Content-Type: application/json" --data '{"orderId":"real753"}' http://localhost:3001/getAddress
```

Observe the response comes from the real service:

```
Real Service: This is a response from the real service. 
```

## Scenario: Call Mockoon to get a fake address
If we call Mockoon and the orderId starts with anything other than ```real```, then the canned Mockoon response will be returned:

```
curl --request POST --header "Content-Type: application/json" --data '{"orderId":"fake956"}' http://localhost:3001/getAddress
```

You will see the response comes from Mockoon:

```
Mockoon: This is a response from Mockoon
```

# Reference
| Link | Description |
| -- | -- |
| https://mockoon.com/ | Mockoon landing page |
