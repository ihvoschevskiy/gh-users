#!/bin/bash

function create {
  if ! [[ -d "./src/$1/$2" ]];then 
    mkdir "./src/$1/$2"
  fi

  if ! [[ -f "./src/$1/$2/$2.tsx" ]]; then
cat <<EOF > "./src/$1/$2/$2.tsx"
import './$2.css'
import React, { FC } from 'react'

export const $2: FC = () => {
  return (
    <>
    </>
  )
}
EOF
  fi

  if ! [[ -f "./src/$1/$2/$2.css" ]]; then
    touch "./src/$1/$2/$2.css"
  fi

}


for((i=1;i<=$#;i++)); do
  ip="${!i}"

  if [[ $ip = "-c" ]]; then
    ((i++))
    for((j=i;j<=$#;j++)); do
      jp="${!j}"
      char=${jp::1}
      
      if [[ $char = "-" ]]; then
        ((i--))
        break
      fi

      create "components" "$jp"
    done
  fi

  if [[ $ip = "-l" ]]; then
    ((i++))
    for((j=i;j<=$#;j++)); do
      jp="${!j}"
      char=${jp::1}
      
      if [[ $char = "-" ]]; then
        ((i--))
        break
      fi

      create "layouts" "$jp"
    done
  fi

  if [[ $ip = "-p" ]]; then
    ((i++))
    for((j=i;j<=$#;j++)); do
      jp="${!j}"
      char=${jp::1}
      
      if [[ $char = "-" ]]; then
        ((i--))
        break
      fi
      create "pages" "$jp"
    done
  fi
done
