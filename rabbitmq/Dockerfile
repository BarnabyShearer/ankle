FROM rabbitmq:alpine
RUN rabbitmq-plugins enable --offline rabbitmq_management rabbitmq_web_stomp
HEALTHCHECK CMD ["rabbitmqctl", "node_health_check"]
