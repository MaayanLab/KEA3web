#!/bin/bash

gradle clean build --x test
gradle --refresh-dependencies
gradle clean build --x test
docker compose build kea3
docker compose push kea3