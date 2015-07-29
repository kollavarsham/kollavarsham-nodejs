#!/usr/bin/env bash
set -e
grunt buildcontrol:pages
npm install -g istanbul
istanbul cover node_modules/grunt-contrib-nodeunit/node_modules/nodeunit/bin/nodeunit -- test
npm install -g codeclimate-test-reporter
codeclimate-test-reporter < coverage/lcov.info
