Survey.StylesManager.applyTheme("modern");

var json = {
  questions: [
    {
      name: "username",
      type: "text",
      title: "Please enter your name:",
      isRequired: true,
      autoComplete: "name",
    },
    {
      name: "password",
      type: "text",
      title: "Please enter your password:",
      isRequired: true,
      autoComplete: "name",
    },
    {
      type: "checkbox",
      name: "interest",
      title: "Which of the following interest you?",
      isRequired: true,
      colCount: 1,
      choices: [
        "Arts",
        "Night-Life",
        "Casual Entertainment",
        "Athletic Activities",
        "Sight-Seeing",
      ],
    },
    {
      type: "radiogroup",
      name: "time",
      title: "How long would you prefer to spend time with roomates?",
      isRequired: true,
      colCount: 1,
      choices: ["1-2 hours", "3-4 hours", "Half/full day"],
    },
    {
      type: "radiogroup",
      name: "dist",
      title: "How far would you be willing to drive/be driven?",
      isRequired: true,
      colCount: 1,
      choices: ["1-5 miles", "5-10 miles", "As far as necessary"],
    },

    {
      type: "radiogroup",
      name: "room",
      title: "What group will you join?",
      isRequired: true,
      colCount: 1,
      choices: ["Dolphin", "Sea otter", "Daniel"],
    },
  ],
};

window.survey = new Survey.Model(json);

survey.onComplete.add(function (sender) {
  var json = JSON.stringify(sender.data, null, 3);
  const res = JSON.parse(json);

  var newSend = {
    username: res.username,
    password: res.password,
    room: res.room,
    tags: [res.interest, res.time, res.dist],
  };

  const url = "api/auth/register_login";
  // Add your code below this line
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  newSend = JSON.stringify(newSend);

  xhr.send(newSend);
});

ReactDOM.render(
  <Survey.Survey model={survey} />,
  document.getElementById("surveyElement")
);
