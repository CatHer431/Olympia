# CMPE-165

## Description

OlympiaHotel is a hotel booking web app. It provides people with an easy and fast way to book hotel rooms online.

## QuickStart: Setting Up Server

To set up a server, please follow the instructions below.

1. Clone the [GitHub Repo](https://github.com/CatHer431/Olympia)
   ```
   % git clone https://github.com/CatHer431/Olympia.git
   ```
2. Install latest version of [NodeJS](https://nodejs.org/en/)
3. Go into the root folder
   ```
    % cd olympia
   ```
4. Install JavaScript dependencies
   ```
   % npm install
   ```
5. Go into `client` folder
   ```
   % cd client
   ```
6. Install dependencies for frontend
   ```
   % npm install
   ```
7. Go into `server` folder
   ```
   % cd ..
   % cd server
   ```
8. Install dependencies for backend
   ```
   % npm install
   % cd ..
   ```

## Frontend Team

9. Start React on port 3000
   ```
   % cd client
   % npm start
   ```

## Backend Team

9. Run Backend part
   ```
   % cd server
   % npm run dev
   ```
10. Open a web browser and navigate to http://localhost:3000/

## Directory Structure

```
.
├── client                          # Frontend's source code directory
├── server                          # Backend's source code directory
├── package.json                    # JavaScript Dependencies
```

## GitHub Flow

When making changes, please create a branch to work on it and file a PR to merge the changes. This really prevents your changes to conflict with others a lot, you never know if somebody else is touching the same file as you. A really good documentation for the workflow that we should follow is [Github Workflow](https://guides.github.com/introduction/flow/).

### Frontend Team

When making any changes or install any dependencies, please navigate to `client` folder before doing so.

### Backend Team

Similarly, when making any changes or install any dependencies, please navigate to `server` folder before doing so.
