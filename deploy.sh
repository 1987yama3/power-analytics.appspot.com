#!/bin/sh

java -jar vendor/compiler.jar --js=views/plugin.tpl --js_output_file=views/plugin-min.tpl
appcfg.py -A power-analytics update .
