#!/usr/bin/env bash
set -e

echo "node: $(node -v)"
echo "pnpm: $(pnpm -v)"

pnpm install

pnpm preview

rm -rf output
mkdir output

cd dist
tar czf ../output/bundle.tar.gz ./
