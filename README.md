**```This project is no longer maintained, support still available```**

# Voting System (Administrator)

My final year project is a Online Voting System focuses on security and usability of both voter and election candidate.
This is the Administrative Client of voting system,with this web application ,you can:

#### functions
<a name="features"></a>
- Create New Election
- Give permission to vote to users
- Analyze result
- Export result
- Publish result to client application

We made this project simple and secure as much as possible as my limited knowledge.
If you have any suggestion regarding the project security ,design or anything... feel free to open an Issue [here](https://github.com/DeFerence3/VotingSystemAdmin/issues/new). I'm always a learner.

## How to setup

Clone this repo by using below command

```
git clone https://github.com/DeFerence3/VotingSystemAdmin.git
```

### Setting up firebase

Go into project root folder and create a 
`.env` file.
setup your firebase config

### Installing Dependencies

```
yarn
```
### Start development server

```
yarn dev
```
go to http://localhost:5173/ in your browser

### Getting started

After setting firebase and installing dependencies,
Here we can see a Login Page ,If you have alreday created databases and documents in the firebase (with in the same application in the config) there will be 7 admin names will be shown.Login with your username and password,if not there will be 'Admin1','Admin2, . . . ,'Admin7'.

If you are creating a new election environment ,there is a link in the bottom _Create New Election Environment_ click it and create new 7 admins and it will create nessacery databases and documents in the firebase
and back to login page there will be your Admin Names

After login you can create your elections,give permission to voters and all the [features listed](#features)

After that your voters can vote through Voters Side Application
### Voters Side Android Application

Voters Side Application is built and maintained by my fellow project member,here is its repo :
[Voters Side App](https://github.com/danielpaul-123/OnlineVotingSystem)
