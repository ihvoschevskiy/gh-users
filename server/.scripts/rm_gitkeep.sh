#!/bin/bash

shopt -s globstar
for f in ./src/**; do
  if [[ -d "$f" ]];then 
    count=$(ls -lA "$f" | grep -v '^total' | wc -l)
    if [[ $count -ge 2 && -f "$f/.gitkeep" ]];then
      rm "$f/.gitkeep"
    fi
  fi
done
