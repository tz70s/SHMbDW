# Smart Home Monitor Based on Distributed Web Server

### Objective
* Using distributed web server deploy on sensor nodes in smart homes
* Real-time monitoring with visualization techniques

### Pre-requisition
* Node.js
* Express Framework
* Socket.io
* Node os-util
* Nginx
* Redis
* Pm2

```BASH
Nginx : Distribute the traffic load to different web server node
Redis : Data replication
Pm2 : Running Node.js app in daemon
```

### Building Step

* Configure RPI Network Connection
* Node.js INSTALLATION
``` BASH
# INSTALL node.js and npm
sudo apt-get update
sudo apt-get install nodejs
sudo ln -s "$(which nodejs)" /usr/bin/node
sudo apt-get install npm


git clone https://github.com/tz70s/SMHbDW.git
cd IoT_FP/myapp/
npm install

# INSTALL pm2 (optional)
npm install pm2 -g
```
* Configure Nginx up_stream
```BASH
CONFIG IP_ADDRESS
Default port is 8080 as app.js listening
```
* Configure Redis
```BASH
# Install Redis
sudo apt-get upgrade
sudo apt-get install -y redis-server

# or Install via compiling source

# Config redis
# Remember pre-modify port in both configure files
# port
# slaveof

sudo redis-server redis_master.conf 
sudo redis-server redis_slave.conf

# Check if redis server started
ps aux | grep 'redis'

# OR
redis-cli -p [PORT]
>> INFO
```
* Execution
```BASH
pm2 start os_monitoring
pm2 start app
```
