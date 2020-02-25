FROM tomcat:9

COPY build/libs/kea3.war /usr/local/tomcat/webapps/kea3.war

ENV JAVA_OPTS="-Xmx3G"

EXPOSE 8080