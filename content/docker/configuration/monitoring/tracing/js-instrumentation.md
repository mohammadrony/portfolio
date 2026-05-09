# Java Script Library

```bash
npm install --save @opentelemetry/api
# npm install --save @opentelemetry/sdk-node
npm install --save @opentelemetry/auto-instrumentations-node
```

```env
# OPENTELEMETRY
NODE_OPTIONS="--require @opentelemetry/auto-instrumentations-node/register"
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<opentelemetry-collector>:4317
OTEL_EXPORTER_OTLP_ENDPOINT=http://<opentelemetry-collector>:4317
OTEL_SERVICE_NAME="<service-name>"
OTEL_TRACES_EXPORTER=otlp
OTEL_LOGS_EXPORTER=none
OTEL_METRICS_EXPORTER=none
OTEL_TRACES_SAMPLER_ARG="0.25"
OTEL_EXPORTER_OTLP_PROTOCOL=grpc
OTEL_EXPORTER_OTLP_COMPRESSION=gzip
OTEL_NODE_RESOURCE_DETECTORS="env,host,os"
OTEL_PROPAGATORS="tracecontext,baggage,b3"
OTEL_TRACES_SAMPLER=parentbased_traceidratio
```
