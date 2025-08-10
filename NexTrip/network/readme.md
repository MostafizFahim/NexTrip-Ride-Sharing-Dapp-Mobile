----------------------------GETH Private Node Setup-------------------------------------
Step 1: Create Node Folders
-> cd network
-> mkdir node1
-> mkdir node2

Step 2: Create Node Account
-> cd node1
-> geth --datadir "./data" account new
-> cd ../node2
-> geth --datadir "./data" account new

Step 3: Create genesis.json
Step 4: Init Node 1 and Node 2
-> cd ../node1
-> geth --datadir ./data init ../genesis.json
-> cd ../node2
-> geth --datadir ./data init ../genesis.json

Step 5: Create Bootnode
-> cd ..
-> mkdir bnode
-> cd bnode
-> bootnode -genkey boot.key

Step 6: Start Bootnode
-> bootnode -nodekey boot.key -verbosity 7 -addr "127.0.0.1:30301"

Step 7: Start Node 1
-> geth --datadir "./data" --port 30304 --bootnodes enode://f5f27d7bbcce0a5607f5a8264f169bc725744147db18caa748efeec79e960de2c8aa4efe042993f7af86418459c2304d6b51ecb8ae91578ea9f4c2613d9d11cb@127.0.0.1:0?discport=30301 --authrpc.port 8547 --ipcdisable --allow-insecure-unlock --http --http.corsdomain="https://remix.ethereum.org/" --http.api web3,eth,debug,personal,net --networkid 101010 --unlock 0x35Aeb61cFBAA2d0d2b146883Cab6253994D658F7 --password password.txt --mine --miner.etherbase=0x35Aeb61cFBAA2d0d2b146883Cab6253994D658F7

Step 8: Start Node 2
-> geth --datadir "./data" --port 30306 --bootnodes enode://f5f27d7bbcce0a5607f5a8264f169bc725744147db18caa748efeec79e960de2c8aa4efe042993f7af86418459c2304d6b51ecb8ae91578ea9f4c2613d9d11cb@127.0.0.1:0?discport=30301 --authrpc.port 8546 --networkid 101010 --unlock 0xE1619252C4BA039c5e9efb05065855112a6fd3Fc --password password.txt
