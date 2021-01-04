<div align="center">
  <h1>SeedFund</h1>
</div>

<br>

![seedfund-picture](https://user-images.githubusercontent.com/62177226/103574188-80a41100-4e9d-11eb-980b-9d25a0d6597d.JPG)

<br>



> A collaboration project to create a clone website based on Kickstarter



<div align="center">
  <h2>Table of Contents</h2>
</div>


- [Installation](#installation)
- [Features](#features)
- [Contributing](#contributing)
- [Team](#team)
- [FAQ](#faq)



---

<div align="center">
  <h2>Installation</h2>
</div>


### Clone

- Clone this repo to your local machine using `https://github.com/tjtaylorjr/seedfund.git`

<br>

### Setup

> install flask dependencies

 ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
 ```

> cd into the react-app directory and install npm packages

```shell
$ npm install
```

> Create database
- Create a **.env** file based on the example with proper settings for your
  development environment
- Setup your PostgreSQL user, password and database and make sure it matches your **.env** file
- Get into your pipenv, migrate your database, seed your database, and run your flask app
<br>

```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

> run the react frontend

```shell
npm start
```
> browse to http://localhost:3000
---

<div align="center">
  <h2>Features</h2>
</div>

- Currently the App allows the creation of accounts, projects, and pleding to fund projects in a basic manor.  Improvements and additional features to follow.


---

<div align="center">
  <h2>Contributing</h2>
</div>


> To get started...

### Step 1

- **Option 1**
    - 🍴 fork or clone this repo!

- **Option 2**
    - 👯 Clone this repo to your local machine using `https://github.com/tjtaylorjr/seedfund.git`

### Step 2

- **HACK AWAY!** 🔨🔨🔨

### Step 3

- 🔃 Create a new pull request using <a href="https://github.com/tjtaylorjr/seedfund/compare" target="_blank">`https://github.com/tjtaylorjr/seedfund/compare`</a>.

---

<div align="center">
  <h2>Team</h2>
</div>


| <a href="https://github.com/corbinHA" target="_blank">**Corbin Armendariz**</a> | <a href="https://github.com/JamestLee513" target="_blank">**James Lee**</a> | <a href="https://github.com/memg92" target="_blank">**Miguel Munoz**</a> | <a href="https://github.com/tjtaylorjr" target="_blank">**TJ Taylor**</a> |
|:---:|:---:|:---:|:---:|
| [![Corbin Armendariz](https://avatars2.githubusercontent.com/u/68240935?s=150&u=5e9e01a87cf8c2f8b64633cb321a9007e72b6b17&v=4)](https://github.com/corbinHA) | [![James Lee](https://avatars3.githubusercontent.com/u/19562787?s=150&u=ebac3a5c61b12ca0b72e065bc3177eecc7cb122f&v=4)](https://github.com/JamestLee513) | [![Miguel Munoz](https://avatars0.githubusercontent.com/u/68749533?s=150&u=af9fe29e52e4db280ff178749a4ef44c28268b89&v=4)](https://github.com/memg92) | [![TJ Taylor](https://avatars3.githubusercontent.com/u/62177226?s=150&u=034c0f894dd93f9eb2ed8e43e3172ed83d19a9cc&v=4)](https://github.com/tjtaylorjr) |
| <a href="http://github.com/corbinHA" target="_blank">`github.com/corbinHA`</a> | <a href="https://github.com/JamestLee513" target="_blank">`github.com/JamestLee513`</a> | <a href="http://github.com/memg92" target="_blank">`github.com/memg92`</a> | <a href="http://github.com/tjtaylorjr" target="_blank">`github.com/tjtaylorjr`</a> |


---

<div align="center">
  <h2>FAQ</h2>
</div>


- **How do I do *that*?**
    - Easy! Just do **this**.

---
