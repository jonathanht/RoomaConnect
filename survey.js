Survey
    .StylesManager
    .applyTheme("modern");

var json = {
    questions: [
        {
            name: "name",
            type: "text",
            title: "Please enter your name:",
            isRequired: true,
            autoComplete: "name"
        },{
            
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
                "Sight-Seeing"
            ]
        },{

            type: "checkbox",
            name: "time",
            title: "How long would you prefer to spend time with roomates?",
            isRequired: true,
            colCount: 1, 
            choices: [
                "1-2 hours",
                "3-4 hours",
                "Half/full day"

            ]
        },{

            type: "checkbox",
            name: "dist",
            title: "How far would you be willing to drive/be driven?",
            isRequired: true,
            colCount: 1, 
            choices: [
                "1-5 miles",
                "5-10 miles",
                "As far as necessary"
        
            ]

        }
    ]
};

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (sender) {
        document
            .querySelector('#surveyResult')
            .textContent = "Result JSON:\n" + JSON.stringify(sender.data, null, 3);
    });


ReactDOM.render(<Survey.Survey model={survey}/>, document.getElementById("surveyElement"));
