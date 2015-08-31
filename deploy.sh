#!/usr/bin/env bash
set -e
grunt buildcontrol:pages
codeclimate-test-reporter < ./coverage/lcov.info
