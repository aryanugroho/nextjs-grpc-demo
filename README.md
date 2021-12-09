# GRPC WEB via Istio Sidecar

## Generating protobuf impl JS with protoc 
protoc -I. \
    --plugin="protoc-gen-ts=./node_modules/.bin/protoc-gen-ts" \
    --js_out="import_style=commonjs,binary:./grpc-web" \
    --ts_out="service=grpc-web:./grpc-web" \
    ./helloworld.proto

## GRPC web enablement
All we need is naming the port on Service definition to `grpc-web` then istio will detect the port name and adding filter support under the hood, WITHOUT addional istio filter definition deployed. That's it.