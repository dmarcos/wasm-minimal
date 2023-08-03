#!/bin/bash

# Compile C++ code to object code.
./bin/clang --target=wasm32 -nostdlib -O3 -I. -o hello-world.o -c hello-world.cpp
# Link object code to WASM.
./bin/wasm-ld --no-entry --export-all --lto-O3 --allow-undefined --import-memory hello-world.o -o hello-world.wasm