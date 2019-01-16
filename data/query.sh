#!/bin/bash

### exécute une requête sur twitter 
### sauvagarde en JSON 
### mongoimport
#user=$1; shift
#password=$1; shift
#host=$1; shift
#database=$1; shift

#mongo="mongoimport --authenticationDatabase admin "

cd $(dirname $0)
#pwd
#username boitaorg until 2018-03-13

collection=twits

date=`date +%s`
id="$date-$$"
output=data/$id.json

json="{\"id\":\"$id\",\"date\":\"$date\""
options=""
while [ $# -ge 1 ]; do
    key=$1; shift
    value=$1; shift
    options="$options --$key $value"
    json="$json,\"$key\":\"$value\""
done

#echo $options

json="$json,\"tweets\":"

#export http_proxy=http://proxy.unicaen.fr:3128
#export https_proxy=http://proxy.unicaen.fr:3128

#echo "http $http_proxy https $https_proxy"
#python test.py 2>/dev/stdout

python exporter.py --output $output $options


