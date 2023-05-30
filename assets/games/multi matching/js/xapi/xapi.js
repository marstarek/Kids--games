//xAPI ------------------------------------------------------------
var conf = {
    // "endpoint": "https://york-press.lrs.io/xapi/",
    // "auth": "Basic " + toBase64("yorkpress:yorkpress")
    "endpoint": "https://tarek-ahmed.lrs.io/xapi/",
    "auth": "Basic " + toBase64("tarekahmed:tarekahmed")

};

ADL.XAPIWrapper.changeConfig(conf);
// var actorName = localStorage.getItem('userName');
// var actorMbox = "mailto:" + localStorage.getItem('userEmail');
var actorName = "tarekahmed";
var actorMbox = "mailto:tarekahmedelrashidy@gmail.com";

const baseUrl = "https://yorkenglishtest.com/testing/newglobal/moodle/";

function send_statement(verbName, verbId, optionName) {

    var statement = {
        "actor": {
            "mbox": actorMbox,
            "name": actorName,
            "objectType": "Agent"
        },
        "verb": {
            "id": verbId,
            "display": {
                "en-US": verbName
            }
        },
        "object": {
            "objectType": "SubStatement",
            "actor": {
                "mbox": actorMbox,
                "name": actorName,
                "objectType": "Agent"
            },
            "verb": {
                "id": verbId,
                "display": {
                    "en-US": verbName
                }
            },
            "object": {
                "id": baseUrl + "KSAMATHDloEx/ex11ex12ex13",
                "definition": {
                    "name": {
                        "en-US": optionName
                    },
                    "description": {
                        "en-US": "مثال 11,12,13"
                    }
                },
                "objectType": "Activity"
            }
        },
    };

    var result = ADL.XAPIWrapper.sendStatement(statement);
}

function send_statement_score(verbName, verbId, optionName, success, completion, scaled) {

    var statement = {
        "actor": {
            "mbox": actorMbox,
            "name": actorName,
            "objectType": "Agent"
        },
        "verb": {
            "id": verbId,
            "display": {
                "en-US": verbName
            }
        },
        "object": {
            "id": baseUrl + "KSAMATHDloEx/ex11ex12ex13",
            "definition": {
                "name": {
                    "en-US": optionName
                },
                "description": {
                    "en-US": "مثال 11,12,13"
                }
            },
            "objectType": "Activity"
        },
        "result": {
            "completion": completion,
            "success": success,
            "score": {
                "scaled": scaled
            }
        }
    };


    var result = ADL.XAPIWrapper.sendStatement(statement);
}