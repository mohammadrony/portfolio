# Java Instrumentation

opentelemetry-java-instrumentation [releases](http://github.com/open-telemetry/opentelemetry-java-instrumentation/releases).

## Agent file

Linux

```bash
wget http://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v2.5.0/opentelemetry-javaagent.jar
```

Docker

```Dockerfile
# Opentelemetry
# version=2.5.0
# cp opentelemetry-javaagent.jar /
RUN curl -o /opentelemetry-javaagent.jar -L http://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v2.5.0/opentelemetry-javaagent.jar
```

Environment

```env
# OPENTELEMETRY
JAVA_TOOL_OPTIONS="-javaagent:/opentelemetry-javaagent.jar"
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<opentelemetry-collector>:4317
OTEL_EXPORTER_OTLP_ENDPOINT=http://<opentelemetry-collector>:4317
OTEL_SERVICE_NAME="<service-name>"
OTEL_TRACES_EXPORTER=otlp
OTEL_LOGS_EXPORTER=none
OTEL_METRICS_EXPORTER=none
OTEL_TRACES_SAMPLER_ARG="0.25"
OTEL_EXPORTER_OTLP_PROTOCOL=grpc
OTEL_EXPORTER_OTLP_COMPRESSION=gzip
OTEL_PROPAGATORS="tracecontext,baggage,b3"
OTEL_TRACES_SAMPLER=parentbased_traceidratio
```
