# zoigl

A clone of Untappd for homebrewers, which gives users the ability to share their homebrews, review, create and attend events.

## Techonolgies Use:
  * Express
  * Sequelize
  * HTML
  * CSS
  * Javascript
  * Bcryptjs for authorization
  * React
  * Redux

## Features and Functionality

User Authentication - Users are able to securely sign-up, log-in, or use demo to test functionality.

Beers - A user may create, edit, or delete beers.

Reviews - A user may create, edit, or delete reviews.

Beers Feed - Displays all of the beer and their respective reviews

Reviews Feed - Displays all of the reviews 

## Backend Query to return all associated reviews for each beer
  ``` 
  const beers = await db.Beer.findAll({
      include: [
        {
          model: db.User,
          attributes: ["breweryName"],
        },
        {
          model: db.Review,
          include: [{ model: db.User }],
        },
      ],
    });
```

![demo-gif](https://github.com/jps725/zoigl/blob/main/images/app-demo.gif)

## Future Features
  * Users will be able to search and filter based on selected criteria
  * Users will be able to create, edit, and delete events
  * Users will be able to receive badges for completing various requirements of reviews/events
