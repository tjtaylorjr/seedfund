<div align="center">
  <h1>SeedFund</h1>
</div>

<br>

<div align="center">
  <h2>Table of Contents</h2>
</div>


- [Description](#Description)
- [Application Architecture & Technologies](#Application-Architecture)
- [Frontend Overview](#Frontend-Overview)
- [Backend Overview](#Backend-Overview)
- [Conclusion & Next Steps](#Conclusion-And-Next-Steps)
- [Team](#Team)

<br>

---

<br>

<div align="center">
  <h2>Description</h2>
</div>

A crowdfunding site in the style of Kickstarter.  Currently, users can create projects and pledge money to ideas they like.  Improvements and additional features to follow.

<br>

<img src="https://i.gyazo.com/7f5cf3f068882affb830ff7fdc75876d.gif" width=400px>

<br>

---

<br>

<div align="center">
  <h2>Application Architecture</h2>
</div>

SeedFund is a streamlined fullstack application built with PostgreSQL and Flask at the backend, which accepts RESTful data requests from the front-end user interface powered by React.

<br>

  <img width="550" alt="AppArchetecture" src="https://user-images.githubusercontent.com/62177226/107172057-61b00780-6992-11eb-8f6b-7e0ce0e71fa5.png">

<br>

---

<br>

<div align="center">
  <h2>Frontend Overview</h2>
</div>

<br>

SeedFund was designed with simplicity in mind, allowing the frontend to focus on rendering served database records.  However, future improvements such as messaging and project campaign rewards will make fuller use of React's powerful ability to maintain state.

<br>

### React

React components simplify development and allow for the reuse of code while still keeping it dry.  This is exemplified in SeedFund through the project card component.  We have made use of this single page of code in different ways throughout the entire app.

The project card represents the benefit and disadvantages to using React all at once.  Once challenge that we had to overcome was the split second flicker that can happen with React's useEffect hook.  In this case, the app was rendering the default picture before the component could be updated with the picture from the database.  There were several ways we could have addressed this problem but ultimately applied a loading animation to reveal the rendered component underneath after the DOM had been updated.

<br>

### Framer Motion

To implement this solution, we brought in Framer Motion; It is an easy to use motion library that simplifies the work needed in CSS to achieve animation effects.  We have posted the implementation of this library below:

<br>

##### loading animation component

```jsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const spinnerAnimation = {
  repeat: 2,
  repeatType: "loop",
  duration: 1.25,
  ease: "linear"
};

const LoadingAnimation = (props) => {

  const containerRef = useRef();
  const animationRef = useRef();

  const containerStyle = `spinnerContainer--${props.size}`;
  const animationStyle = `spinner--${props.size}`

  useEffect(() => {
    containerRef.current.classList.add(containerStyle);
    animationRef.current.classList.add(animationStyle);
  }, [])

  return (
    <div className="spinnerContainer" ref={containerRef}>
      <motion.span className="spinner"
        ref={animationRef}
        animate={{ rotate: 360}}
        transition={spinnerAnimation}
        />
    </div>
  );
};

export default LoadingAnimation;

```

##### Relevant CSS for component

```css
.loadSpinner {
  position: absolute;
  transition: opacity 0.1s;
  height: 100%;
  width: 100%;
}

.loadSpinner--hide {
  opacity: 0;
}

.spinnerContainer  {
  position: relative;
  background-color: #FFFFFF;
  width: 100%;
  top: 0;
  left: 0;
  transition: opacity 0.1s;
}

.spinnerContainer--MED {
  height: 210px;
}

.spinner {
  display: block;
  border: solid #E8E8E8;
  border-top: solid #028858;
  border-radius: 50%;
  position: absolute;
  box-sizing: border-box;
}

.spinner--MED {
    top: 75px;
    left: 146px;
    width: 6rem;
    height: 6rem;
    border-width: 1rem;
}
```

##### Parent component implementation

```jsx
    <>
      <div className="projectcard">
        <div>
          <div className="projectcard__wrapper">
            <div className="projectcard__container">
              <div className="projectcard__picturebox">
                <NavLink
                  to={"/project/" + project.id}
                  className="projectcard__picturebox-navlink"
                >
                  <div ref={spinnerRef} className="loadSpinner">
                    <LoadingAnimation size={"MED"} />
                  </div>
                  <div
                    style={
                      project.image
                        ? { backgroundImage: `url(${project.image})` }
                        : { backgroundImage: `url(${default_img})`}
                    }
                    className="projectcard__picture"
                  ></div>
                </NavLink>
              </div>
              <div>
                <div className="projectcard__topdata">
                  <div className="projectcard__topdata-text-container">
                    <NavLink
                      to={"/project/" + project.id}
                      className="projectcard__topdata-name"
                    >
                      <h3 className="projectcard__topdata-header">{project.title}</h3>
                      <p className="projectcard__topdata-desc">{project.description}</p>
                    </NavLink>
                  </div>
                </div>
                <div className="projectcard__topdata-creator">
                  <div style={{ display: "inline-block" }}>
                    <NavLink
                      to={{
                        pathname: "/discover/users/" + creator,
                        state: { creator_id: project.user_id },
                      }}
                      className="projectcard__topdata-creator-link"
                    >
                      <span>{"By " + creator}</span>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="projectcard__bottomdata">
                <div className="projectcard__bottomdata-fillbar">
                  <div
                    className="projectcard__bottomdata-fillbar-progress"
                    style={fillBar(project.balance, project.funding_goal)}
                  ></div>
                </div>
                <div className="projectcard__bottomdata-campaign">
                  <div className="projectcard__bottomdata-pledged">
                    <span>{pledgeCount + " pledged"}</span>
                  </div>
                  <div className="projectcard__bottomdata-percent-funded">
                    <span>{funding}</span>
                  </div>
                  {remainingDays()}
                  <div className="projectcard__bottomdata-days">
                    <span className="projectcard__bottomdata-days-text">
                      {"End date: " + project.date_goal}
                    </span>
                  </div>
                  <div>
                    {project.category ? (
                      <NavLink
                        to={"/discover/" + project.category.toLowerCase()}
                        className="projectcard__bottomdata-category"
                      >
                        {project.category}
                      </NavLink>
                    ) : (
                        <NavLink
                          to={"#"}
                          className="projectcard__bottomdata-category"
                        >
                          Category
                        </NavLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
```





<div align="center">
  <h2>Backend Overview</h2>
</div>

SeedFund utilizes Python through the power of a Flask server with a PostgreSQL database to serve the front end.  The entire operation is very straightforward with Flask facilitating data transfer to and from the user interface, updating data records in PostgreSQL as needed.

### PostgreSQL

PostgreSQL's main draw is that it has 25 years of open source development behind it, making it one of the most stable and professional open source databases out there.  Can't beat free and PostgreSQL is not lacking in features or power.  It can handle high amounts of traffic which this app could certainly see, if it were in public use.

### Flask

Flask is a micro framework that uses Python.  This means it is light weight, easy to set up, and powerful.  Flask's barebones approach allows you to not have to worry about bloat in your app and scale up as needed.  This translates into a faster, more responsive application for your users.

A challenge that presented itself during this project was how the search route interacted with parameters passed from the front end.  In particular, clicking on a quick select bar item that had an ampersand in it was causing a bad request error.  Interestingly enough, the query parameter didn't even include an ampersand.  Instead it was converting that into a space and making a fetch request to the backend for each word.

The front end loops were inefficient and it was unclear why this particular error was only happening with the quick select bar.  If you typed the same query into the search bar, it would not produce an error.  Our solution to this was to pass our query in a single fetch request with the '+' character standing in for any spaces.  On the backend, we split the query and iterate through a list of parameters to return a dictionary of the combined results.

<br>

```python

@project_routes.route('/search/<query>')
def searchForProjects(query):

    search_terms = query.split('+')

    result = list(chain.from_iterable(
                     (Project.query.filter(or_(
                         Project.title.ilike(f"%{term}%"),
                         Project.description.ilike(f"%{term}%"),
                         Project.category.ilike(f"%{term}%")
                     )).options(joinedload(Project.user)).all())
                     for term in search_terms))

    data = [project.to_dict() for project in result]

    return {"projects": data}

```

<br>

<div align="center">
  <h2>Conclusion and Next Steps</h2>
</div>

What we have built here is just the beginning.  We have plans to add additional features to better reflect what crowdfunding applications can and should do.

Ultimately this was an enjoyable project that demonstrated just how easily and quickly the Flask/React stack can bring a job from concept to working software.

<br>

---

<br>

<div align="center">
  <h2>Team</h2>
</div>


| <a href="https://github.com/corbinHA" target="_blank">**Corbin Armendariz**</a> | <a href="https://github.com/JamestLee513" target="_blank">**James Lee**</a> | <a href="https://github.com/memg92" target="_blank">**Miguel Munoz**</a> | <a href="https://github.com/tjtaylorjr" target="_blank">**TJ Taylor**</a> |
|:---:|:---:|:---:|:---:|
| [![Corbin Armendariz](https://avatars2.githubusercontent.com/u/68240935?s=150&u=5e9e01a87cf8c2f8b64633cb321a9007e72b6b17&v=4)](https://github.com/corbinHA) | [![James Lee](https://avatars3.githubusercontent.com/u/19562787?s=150&u=ebac3a5c61b12ca0b72e065bc3177eecc7cb122f&v=4)](https://github.com/JamestLee513) | [![Miguel Munoz](https://avatars0.githubusercontent.com/u/68749533?s=150&u=af9fe29e52e4db280ff178749a4ef44c28268b89&v=4)](https://github.com/memg92) | [![TJ Taylor](https://avatars3.githubusercontent.com/u/62177226?s=150&u=034c0f894dd93f9eb2ed8e43e3172ed83d19a9cc&v=4)](https://github.com/tjtaylorjr) |
| <a href="http://github.com/corbinHA" target="_blank">`github.com/corbinHA`</a> | <a href="https://github.com/JamestLee513" target="_blank">`github.com/JamestLee513`</a> | <a href="http://github.com/memg92" target="_blank">`github.com/memg92`</a> | <a href="http://github.com/tjtaylorjr" target="_blank">`github.com/tjtaylorjr`</a> |
