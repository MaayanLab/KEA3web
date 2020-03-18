FROM library/tomcat:8-jre8

COPY build/libs/kea3.war /usr/local/tomcat/webapps/kea3.war

ENV JAVA_OPTS="-Xmx3G"

CMD ["catalina.sh", "run"]

EXPOSE 8080