YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "JulianDate",
        "Kollavarsham",
        "KollavarshamDate"
    ],
    "modules": [
        "date",
        "kollavarsham",
        "main"
    ],
    "allModules": [
        {
            "displayName": "date",
            "name": "date",
            "description": "Defines the KollavarshamDate and JulianDate classes"
        },
        {
            "displayName": "kollavarsham",
            "name": "kollavarsham",
            "description": "CLI app to convert Gregorian date to Kollavarsham (Malayalam Era) date and vice versa"
        },
        {
            "displayName": "main",
            "name": "main",
            "description": "This is the module that gets exported when `require('kollavarsham')` is invoked by any other\napps including this as a library. It exposes all the public classes and API in Kollavarsham"
        }
    ]
} };
});