# KEA3

Note: This website is built using Gradle 6.9.2.

## Running Locally 
```
gradle build -t & gradle tomcatRun
```
Go to `http://localhost:8080/kea3`

## Deployment
Update the version on the compose file and run the following
```
bash build.sh
```

## HELM
### install
```
helm install kea3web maayanlab/docker-compose -f <(docker-compose config) -n kea3web --create-namespace 
```

### update
```
helm upgrade kea3web maayanlab/docker-compose -f <(docker-compose config) -n kea3web 

helm template kea3web maayanlab/docker-compose -f <(docker-compose config) -n kea3web 

```