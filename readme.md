# From_Menu_Quiz

In this project, I focused on writing good code, not on design.
This project has three steps.
First it is a form with simple REGEX validation.
Secondly, it's a menu with a weather API and the ability to choose a quiz.
Thirdly it is a quiz but with questions and answers in random order.
 <br /> 
 <br /> 
 
# GitHub page

## [Anchor to view page](https://mazur2005.github.io/Form_Menu_Quiz/)
 <br /> 
 <br /> 


# What technology was used.

![Logo](https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/83/e258e0532611e5a5072321239ff4d4/jhep-coursera-course4.png?auto=format%2Ccompress&dpr=1)
 <br /> 
 <br /> 

# API Reference

```http
  https://openweathermap.org/api
```

| Parameter         | Type     | Description                                                                                                                                         |
| :---------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api_key, api_id` | `string` | **Path**. [Form_Menu_Quiz\src\form\js\fetch_API_weather.js](https://github.com/Mazur2005/Form_Menu_Quiz/blob/main/src/form/js/fetch_API_weather.js) |
 <br /> 
 <br /> 

# Documentation

## Form

1. Has validation using [RegEx.](https://github.com/Mazur2005/Form_Menu_Quiz/blob/main/src/form/js/RegEx.js)
2. Nick name and city will set and remember in cookie.
3. Weather API sending a question with the city selected by the user.
   - In this part, JS checks the response.
   - When bad request comes from user, commit error.
   - But when the problem comes from server or code. This API will disappear.

## Menu

1.  Dispaly:
    - Data:
      - name of day.
      - hour.
      - dd/mm/yyyy.
    - API:
      - Name city
      - The icon displays the current weather.
      - Weather.
      - Temperature.
      - Pressure.
      - **Path**. [Form_Menu_Quiz\src\menu\js\weather_API.js](https://github.com/Mazur2005/Form_Menu_Quiz/blob/main/src/menu/js/weather_API.js).
    - Welcoming user using his nickname and show rules from quiz.
    - Three options quiz:
      ![Icons](https://www.nicepng.com/png/detail/34-345908_html-css-icon-png.png)
      - Code will verify your choice and will be remember on cookie.
      - You can use as many question as you what, but every question has to has four answers.
      - **Path**. [Form_Menu_Quiz\src\menu\js\question_quiz](https://github.com/Mazur2005/Form_Menu_Quiz/tree/main/src/menu/js/question_quiz)

## Quiz

1. User has only one try to found a good answer. When user selected answer, background color will be changed for 0.2 seconds, for another color depends on answer:
   - Good --- blue
   - Bad --- red
2. The timer will be reset when you choose answer or skip the question, and will be stopped when all questions will be done.
3. For the last, user will see a result quiz, points and percentage. The user will have 2 options:
   - return --- it means return to the menu.
   - repeat --- it means to repeat this quiz again.
4. Questions and answers are random every time :).
<p align="center" width="100%">
    <img width="100%" src="https://media4.giphy.com/media/5zoxhCaYbdVHoJkmpf/200w.webp?  cid=ecf05e47ewo3rp90lmfdox1e5sp3pk9urh9yn3yoi9ogupyt&rid=200w.webp&ct=g"> 
</p>
 <br /> 
 <br /> 

# Installation

The easiest way to use this project is to install it globally as a Node command line program. Run the following command in Terminal:

```bash
  $ npm install --global
```

Or, you can install standard locally, for use in a single project:

```bash
  $ npm install --save-dev
```
 <br /> 
 <br /> 

# Optimizations

In this project It have been used compiler Vite
![Logo](https://vitejs.dev/logo-with-shadow.png)
 <br /> 
 <br /> 

# Usage

After you've installed node, you should be able to use the program. The simplest use case would be run local server:

```bash
  $ git run dev
```

You don't have to build project with Vite because this process is done, but if you want fork this project remember to run build to update yours changes.

```bash
  $ git run build
```

Or you can open live server and build project in the same time.

```bash
  $ git run preview
```
 <br /> 
 <br /> 

# Feedback

If you have any feedback, please reach out to me at mazurarkadiusz2005@gmail.com
 <br /> 
 <br /> 
 
# Authors

- [Project](https://github.com/Mazur2005)
- [Logo](https://www.coursera.org/learn/html-css-javascript-for-web-developers)
- [Icon-vite](https://codepen.io/davideast/pen/yLELbvm)
- [Icons](https://www.nicepng.com/ourpic/u2q8w7a9w7r5r5q8_html-css-icon-png/)
- [Gif](https://giphy.com/explore/random-number)
